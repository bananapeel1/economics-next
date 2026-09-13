import { getStripe, getSubscriptionPeriodEnd } from '@/lib/stripe';
import { isTrialEligible } from '@/lib/trial-eligibility';
import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';
import { isLifetime, PLAN_LIFETIME } from '@/lib/entitlements';
import { NextResponse } from 'next/server';

/**
 * Pick the best active Stripe subscription for a customer. Used to reconcile
 * users who have multiple active subscriptions (the 3×-purchase bug) — we
 * return the one with the latest current_period_end so they at least get
 * credit for what they've paid. Duplicates are flagged for ops review via
 * console.warn; refunds are a manual customer-service decision.
 */
async function findBestStripeSubscription(stripe, customerId, logCtx) {
  const [active, trialing] = await Promise.all([
    stripe.subscriptions.list({ customer: customerId, status: 'active', limit: 10 }),
    stripe.subscriptions.list({ customer: customerId, status: 'trialing', limit: 10 }),
  ]);

  const all = [...active.data, ...trialing.data];
  if (all.length === 0) return null;

  if (all.length > 1) {
    console.warn('[subscription] multiple active Stripe subs for customer — needs ops review', {
      ...logCtx,
      customerId,
      subscriptionIds: all.map(s => s.id),
    });
  }

  // Pick the one ending latest (most remaining value for the user).
  all.sort((a, b) => {
    const aEnd = a.current_period_end || a.items?.data?.[0]?.current_period_end || 0;
    const bEnd = b.current_period_end || b.items?.data?.[0]?.current_period_end || 0;
    return bEnd - aEnd;
  });
  return all[0];
}

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ plan: 'free', status: 'inactive', trialEligible: true });
    }

    const serviceSupabase = createServerClient();
    const { data: sub } = await serviceSupabase
      .from('user_subscriptions')
      .select('plan, status, current_period_end, stripe_customer_id, stripe_subscription_id, trial_end')
      .eq('user_id', user.id)
      .maybeSingle();

    if (!sub) {
      return NextResponse.json({ plan: 'free', status: 'inactive', trialEligible: true });
    }

    // Lifetime access is permanent and backed by a one-time payment, so there
    // is no Stripe subscription to reconcile against. Return before the sync
    // below, which downgrades users it can't find an active subscription for.
    if (isLifetime(sub)) {
      return NextResponse.json({
        plan: PLAN_LIFETIME,
        status: 'active',
        currentPeriodEnd: null,
        trialEnd: null,
        // A lifetime buyer has paid more than anyone and their stripe_subscription_id is nulled
        // by the one-time-payment webhook, so an absence test would call them a new customer.
        trialEligible: false,
      });
    }

    const logCtx = { userId: user.id };

    // Cases where we should reconcile against Stripe:
    //  (a) DB says free/inactive but user has a stripe_customer_id — webhook may have missed.
    //  (b) DB says active premium — verify against Stripe (catch drift if the sub was cancelled
    //      externally and the cancellation webhook was missed).
    if (sub.stripe_customer_id) {
      try {
        const stripe = getStripe();
        const activeSub = await findBestStripeSubscription(stripe, sub.stripe_customer_id, logCtx);

        if (activeSub) {
          // Stripe has an active/trialing sub. Sync DB to match if it's diverged.
          const periodEnd = getSubscriptionPeriodEnd(activeSub);
          const trialEnd = activeSub.trial_end
            ? new Date(activeSub.trial_end * 1000).toISOString()
            : null;

          const needsWrite =
            sub.plan !== 'premium' ||
            sub.status !== 'active' ||
            sub.stripe_subscription_id !== activeSub.id ||
            sub.current_period_end !== periodEnd;

          if (needsWrite) {
            const { error } = await serviceSupabase
              .from('user_subscriptions')
              .update({
                stripe_subscription_id: activeSub.id,
                plan: 'premium',
                status: 'active',
                current_period_end: periodEnd,
                trial_end: trialEnd,
                updated_at: new Date().toISOString(),
              })
              .eq('user_id', user.id);

            if (error) {
              console.error('[subscription] sync-from-stripe (active) failed', {
                ...logCtx, customerId: sub.stripe_customer_id, code: error.code, message: error.message,
              });
            } else {
              console.log('[subscription] synced DB from Stripe (active)', {
                ...logCtx, customerId: sub.stripe_customer_id, subscriptionId: activeSub.id,
              });
            }
          }

          return NextResponse.json({
            plan: 'premium',
            status: 'active',
            currentPeriodEnd: periodEnd,
            trialEnd,
            trialEligible: false,
          });
        }

        // No active Stripe sub. If DB says premium+active, that's drift — downgrade.
        if (sub.plan === 'premium' && sub.status === 'active') {
          const { error } = await serviceSupabase
            .from('user_subscriptions')
            .update({
              plan: 'free',
              status: 'cancelled',
              updated_at: new Date().toISOString(),
            })
            .eq('user_id', user.id);

          if (error) {
            console.error('[subscription] sync-from-stripe (downgrade) failed', {
              ...logCtx, customerId: sub.stripe_customer_id, code: error.code, message: error.message,
            });
          } else {
            console.log('[subscription] synced DB from Stripe (downgrade — no active sub)', {
              ...logCtx, customerId: sub.stripe_customer_id,
            });
          }

          // Free again, but NOT a new customer: this is the 43-account case the finding is about.
          return NextResponse.json({ plan: 'free', status: 'cancelled', trialEligible: false });
        }
      } catch (e) {
        // If Stripe check fails, fall through to DB-based response.
        console.error('[subscription] Stripe sync check failed, falling back to DB', {
          ...logCtx, message: e.message,
        });
      }
    }

    // Check if subscription has expired (local-clock-based safety net)
    if (sub.status === 'active' && sub.current_period_end) {
      const endDate = new Date(sub.current_period_end);
      if (endDate < new Date()) {
        return NextResponse.json({ plan: 'free', status: 'expired', trialEligible: isTrialEligible(sub) });
      }
    }

    return NextResponse.json({
      plan: sub.plan,
      status: sub.status,
      currentPeriodEnd: sub.current_period_end,
      trialEnd: sub.trial_end || null,
      // F031: the interface advertised "£1 first month" to everyone while checkout withheld the
      // coupon from anyone who had subscribed before. 43 accounts carry a cancelled row.
      trialEligible: isTrialEligible(sub),
    });
  } catch (err) {
    console.error('Subscription check error:', err);
    // F031: this returned `trialEligible: true`, which fails OPEN against the rule's own doctrine
    // — when we cannot tell, we quote the price we know we will honour. An unknown error is
    // exactly the case where we cannot tell.
    return NextResponse.json({ plan: 'free', status: 'inactive', trialEligible: false });
  }
}
