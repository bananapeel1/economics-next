import { getStripe, getSubscriptionPeriodEnd } from '@/lib/stripe';
import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

async function ensureStripeCustomer(stripe, serviceSupabase, user) {
  // Check if user already has a Stripe customer ID in our DB
  const { data: sub } = await serviceSupabase
    .from('user_subscriptions')
    .select('stripe_customer_id')
    .eq('user_id', user.id)
    .maybeSingle();

  let customerId = sub?.stripe_customer_id;

  // Validate that the customer exists and is not deleted in Stripe
  if (customerId) {
    try {
      const existing = await stripe.customers.retrieve(customerId);
      if (existing.deleted) {
        customerId = null; // Customer was deleted, need a new one
      }
    } catch {
      customerId = null; // Customer doesn't exist, need a new one
    }
  }

  // Create a new Stripe customer if we don't have a valid one
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { supabase_user_id: user.id },
    });
    customerId = customer.id;

    // Upsert subscription record with new customer ID
    await serviceSupabase
      .from('user_subscriptions')
      .upsert({
        user_id: user.id,
        stripe_customer_id: customerId,
        plan: 'free',
        status: 'inactive',
      }, { onConflict: 'user_id' });
  }

  return customerId;
}

/**
 * Best-effort check for an active/trialing subscription in Stripe.
 * Returns the subscription object if found, null otherwise.
 * Never throws — on failure falls back to caller's DB decision.
 */
async function findActiveStripeSubscription(stripe, customerId, userId) {
  try {
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('stripe-list-timeout')), 2000)
    );

    const lookup = (async () => {
      const active = await stripe.subscriptions.list({ customer: customerId, status: 'active', limit: 1 });
      if (active.data[0]) return active.data[0];
      const trialing = await stripe.subscriptions.list({ customer: customerId, status: 'trialing', limit: 1 });
      return trialing.data[0] || null;
    })();

    return await Promise.race([lookup, timeout]);
  } catch (err) {
    console.warn('[checkout] Stripe active-sub pre-check failed, falling back to DB', {
      userId, customerId, message: err.message,
    });
    return null;
  }
}

export async function POST() {
  try {
    // Get authenticated user
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const stripe = getStripe();
    const serviceSupabase = createServerClient();

    const customerId = await ensureStripeCustomer(stripe, serviceSupabase, user);

    // Read current subscription state from DB
    const { data: currentSub } = await serviceSupabase
      .from('user_subscriptions')
      .select('plan, status, current_period_end, stripe_subscription_id')
      .eq('user_id', user.id)
      .maybeSingle();

    const dbSaysActivePremium =
      currentSub?.plan === 'premium' &&
      currentSub?.status === 'active' &&
      currentSub?.current_period_end &&
      new Date(currentSub.current_period_end) > new Date();

    // Primary block: DB says active premium → already subscribed.
    if (dbSaysActivePremium) {
      return NextResponse.json(
        { error: 'You already have an active subscription' },
        { status: 400 }
      );
    }

    // Defense-in-depth: even if DB says the user is free, the webhook may
    // have failed to write. Ask Stripe directly — if there's an active or
    // trialing subscription, sync the DB and block the duplicate purchase.
    // This is the fix for the 3×-subscription bug.
    const liveSub = await findActiveStripeSubscription(stripe, customerId, user.id);
    if (liveSub) {
      const periodEnd = getSubscriptionPeriodEnd(liveSub);
      const trialEnd = liveSub.trial_end
        ? new Date(liveSub.trial_end * 1000).toISOString()
        : null;

      const { error: syncError } = await serviceSupabase
        .from('user_subscriptions')
        .upsert({
          user_id: user.id,
          stripe_customer_id: customerId,
          stripe_subscription_id: liveSub.id,
          plan: 'premium',
          status: 'active',
          current_period_end: periodEnd,
          trial_end: trialEnd,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id' });

      if (syncError) {
        console.error('[checkout] DB sync after Stripe pre-check failed', {
          userId: user.id, customerId, code: syncError.code, message: syncError.message,
        });
        // Still block the duplicate purchase — Stripe is the source of truth.
      } else {
        console.log('[checkout] synced stale DB from Stripe during pre-check', {
          userId: user.id, customerId, subscriptionId: liveSub.id,
        });
      }

      return NextResponse.json(
        {
          error: 'You already have an active subscription',
          synced: !syncError,
        },
        { status: 400 }
      );
    }

    // Verify price is configured
    const priceId = process.env.STRIPE_PRICE_ID;
    if (!priceId) {
      return NextResponse.json({ error: 'Stripe price not configured' }, { status: 500 });
    }

    // Trial abuse prevention: any prior subscription disqualifies the trial.
    const hadPreviousSubscription = !!currentSub?.stripe_subscription_id;

    const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://revvylearn.com';

    const sessionParams = {
      customer: customerId,
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      success_url: `${origin}/?upgraded=true`,
      cancel_url: `${origin}/?cancelled=true`,
      metadata: { supabase_user_id: user.id },
    };

    // Only offer trial to new users who haven't had a subscription before
    if (!hadPreviousSubscription) {
      sessionParams.payment_method_collection = 'if_required';
      sessionParams.subscription_data = { trial_period_days: 3 };
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
