import { getStripe } from '@/lib/stripe';
import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function POST() {
  // Get authenticated user
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const serviceSupabase = createServerClient();

  // Check if user already has a Stripe customer ID
  const { data: sub } = await serviceSupabase
    .from('user_subscriptions')
    .select('stripe_customer_id')
    .eq('user_id', user.id)
    .single();

  let customerId = sub?.stripe_customer_id;

  // Create Stripe customer if needed
  if (!customerId) {
    const customer = await getStripe().customers.create({
      email: user.email,
      metadata: { supabase_user_id: user.id },
    });
    customerId = customer.id;

    // Upsert subscription record with customer ID
    await serviceSupabase
      .from('user_subscriptions')
      .upsert({
        user_id: user.id,
        stripe_customer_id: customerId,
        plan: 'free',
        status: 'inactive',
      }, { onConflict: 'user_id' });
  }

  // Create Checkout session
  const priceId = process.env.STRIPE_PRICE_ID;
  if (!priceId) {
    return NextResponse.json({ error: 'Stripe price not configured' }, { status: 500 });
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://revvylearn.com';

  const session = await getStripe().checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    allow_promotion_codes: true,
    success_url: `${origin}/?upgraded=true`,
    cancel_url: `${origin}/?cancelled=true`,
    metadata: { supabase_user_id: user.id },
  });

  return NextResponse.json({ url: session.url });
}
