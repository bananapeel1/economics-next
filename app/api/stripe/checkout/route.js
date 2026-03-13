import { getStripe } from '@/lib/stripe';
import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

async function ensureStripeCustomer(stripe, serviceSupabase, user) {
  // Check if user already has a Stripe customer ID in our DB
  const { data: sub } = await serviceSupabase
    .from('user_subscriptions')
    .select('stripe_customer_id')
    .eq('user_id', user.id)
    .single();

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

    // Verify price is configured
    const priceId = process.env.STRIPE_PRICE_ID;
    if (!priceId) {
      return NextResponse.json({ error: 'Stripe price not configured' }, { status: 500 });
    }

    // Check if user has had a previous subscription (prevent trial abuse)
    const { data: existingSub } = await serviceSupabase
      .from('user_subscriptions')
      .select('stripe_subscription_id')
      .eq('user_id', user.id)
      .single();

    const hadPreviousSubscription = !!existingSub?.stripe_subscription_id;

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
      sessionParams.subscription_data = { trial_period_days: 5 };
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
