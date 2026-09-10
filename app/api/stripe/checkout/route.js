import { getStripe, getSubscriptionPeriodEnd } from '@/lib/stripe';
import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';
import { isLifetime } from '@/lib/entitlements';
import { resolveCurrency, getPriceId, getIntroCoupon } from '@/lib/pricing';
import { NextResponse } from 'next/server';

async function ensureStripeCustomer(stripe, serviceSupabase, user) {
  // Check if user already has a Stripe customer ID in our DB
  const { data: sub } = await serviceSupabase
    .from('user_subscriptions')
    .select('stripe_customer_id')
    .eq('user_id', user.id)
    .maybeSingle();

  let customerId = sub?.stripe_customer_id;
  let customer = null;

  // Validate that the customer exists and is not deleted in Stripe
  if (customerId) {
    try {
      const existing = await stripe.customers.retrieve(customerId);
      if (existing.deleted) {
        customerId = null; // Customer was deleted, need a new one
      } else {
        customer = existing;
      }
    } catch {
      customerId = null; // Customer doesn't exist, need a new one
    }
  }

  // Create a new Stripe customer if we don't have a valid one
  if (!customerId) {
    customer = await stripe.customers.create({
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

  return { customerId, customer };
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

export async function POST(request) {
  try {
    // Which product are they buying? 'monthly' (default) or 'lifetime'.
    let plan = 'monthly';
    try {
      const body = await request.json();
      if (body?.plan === 'lifetime') plan = 'lifetime';
    } catch {
      // No body — keep the default. Existing callers post nothing.
    }

    // Get authenticated user
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const stripe = getStripe();
    const serviceSupabase = createServerClient();

    const { customerId, customer } = await ensureStripeCustomer(stripe, serviceSupabase, user);

    // Read current subscription state from DB
    const { data: currentSub } = await serviceSupabase
      .from('user_subscriptions')
      .select('plan, status, current_period_end, stripe_subscription_id')
      .eq('user_id', user.id)
      .maybeSingle();

    // Lifetime is terminal — nothing left to sell them.
    if (isLifetime(currentSub)) {
      return NextResponse.json(
        { error: 'You already have lifetime access' },
        { status: 400 }
      );
    }

    const dbSaysActivePremium =
      currentSub?.plan === 'premium' &&
      currentSub?.status === 'active' &&
      currentSub?.current_period_end &&
      new Date(currentSub.current_period_end) > new Date();

    // An active subscriber buying lifetime is a legitimate upgrade — the
    // webhook cancels their subscription once the payment lands. Only block
    // duplicate *subscription* purchases.
    if (plan === 'monthly' && dbSaysActivePremium) {
      return NextResponse.json(
        { error: 'You already have an active subscription' },
        { status: 400 }
      );
    }

    // Defense-in-depth: even if DB says the user is free, the webhook may
    // have failed to write. Ask Stripe directly — if there's an active or
    // trialing subscription, sync the DB and block the duplicate purchase.
    // This is the fix for the 3×-subscription bug.
    if (plan === 'monthly') {
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
    }

    // Stripe locks customer.currency on the first invoice and it can never be
    // changed. Customers who first paid in EUR must keep being charged in EUR.
    const currency = resolveCurrency(customer);
    const priceId = getPriceId(currency, plan === 'lifetime' ? 'lifetime' : 'monthly');

    const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://revvylearn.com';

    const sessionParams = {
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/?upgraded=${plan}`,
      cancel_url: `${origin}/?cancelled=true`,
      metadata: { supabase_user_id: user.id, plan },
      // Present the customer's local currency while we still settle in GBP.
      // Stripe charges the 2–4% conversion fee to the customer, not to us.
      adaptive_pricing: { enabled: true },
    };

    if (plan === 'lifetime') {
      sessionParams.mode = 'payment';
      sessionParams.allow_promotion_codes = true;
      // Metadata must also live on the PaymentIntent so the webhook can
      // recover the user even if the session object is unavailable.
      sessionParams.payment_intent_data = {
        metadata: { supabase_user_id: user.id, plan: 'lifetime' },
      };
    } else {
      sessionParams.mode = 'subscription';
      // Always take a card up front. Previously this was 'if_required' with a
      // 3-day trial, which meant no card was collected at signup — only 1 of
      // 52 trials ever converted, because converting required coming back and
      // entering card details cold.
      sessionParams.payment_method_collection = 'always';
      sessionParams.subscription_data = { metadata: { supabase_user_id: user.id } };

      // First month for 1.00, then full price. Only for genuinely new
      // customers — a prior subscription disqualifies the intro offer.
      const hadPreviousSubscription = !!currentSub?.stripe_subscription_id;
      const introCoupon = getIntroCoupon(currency);

      if (!hadPreviousSubscription && introCoupon) {
        // `discounts` and `allow_promotion_codes` are mutually exclusive in
        // Checkout — applying the intro offer means no promo code box.
        sessionParams.discounts = [{ coupon: introCoupon }];
      } else {
        sessionParams.allow_promotion_codes = true;
      }
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
