import { getStripe, getSubscriptionPeriodEnd } from '@/lib/stripe';
import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';
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
      return NextResponse.json({ plan: 'free', status: 'inactive' });
    }

    const serviceSupabase = createServerClient();
    const { data: sub } = await serviceSupabase
      .from('user_subscriptions')
      .select('plan, status, current_period_end, stripe_customer_id, stripe_subscription_id, trial_end')
      .eq('user_id', user.id)
      .maybeSingle();

    if (!sub) {
      return NextResponse.json({ plan: 'free', status: 'inactive' });
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

          return NextResponse.json({ plan: 'free', status: 'cancelled' });
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
        return NextResponse.json({ plan: 'free', status: 'expired' });
      }
    }

    return NextResponse.json({
      plan: sub.plan,
      status: sub.status,
      currentPeriodEnd: sub.current_period_end,
      trialEnd: sub.trial_end || null,
    });
  } catch (err) {
    console.error('Subscription check error:', err);
    return NextResponse.json({ plan: 'free', status: 'inactive' });
  }
}
