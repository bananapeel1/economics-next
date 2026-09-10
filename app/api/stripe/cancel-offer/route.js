import { getStripe } from '@/lib/stripe';
import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';
import { isLifetime } from '@/lib/entitlements';
import { resolveCurrency, getPriceId, currencySymbol } from '@/lib/pricing';
import { NextResponse } from 'next/server';

/**
 * The cancel-save offer: half-price lifetime access, shown to anyone who
 * reaches the cancellation screen.
 *
 * The economics: a paying subscriber averages 3.33 payments before churning,
 * which nets ~£4.80 after fees. A single £6 charge nets £5.61. So a taken
 * save offer is worth more than the average subscriber's entire remaining
 * life, collected immediately, with no renewal risk.
 *
 * GET  — returns the offer terms so the UI can render the right currency.
 * POST — creates the Checkout session for the offer.
 */

async function loadContext() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: NextResponse.json({ error: 'Not authenticated' }, { status: 401 }) };

  const serviceSupabase = createServerClient();
  const { data: sub } = await serviceSupabase
    .from('user_subscriptions')
    .select('plan, status, stripe_customer_id, stripe_subscription_id')
    .eq('user_id', user.id)
    .maybeSingle();

  if (!sub?.stripe_customer_id) {
    return { error: NextResponse.json({ error: 'No subscription found' }, { status: 404 }) };
  }
  if (isLifetime(sub)) {
    return { error: NextResponse.json({ error: 'You already have lifetime access' }, { status: 400 }) };
  }

  const stripe = getStripe();
  let customer = null;
  try {
    const c = await stripe.customers.retrieve(sub.stripe_customer_id);
    if (!c.deleted) customer = c;
  } catch {
    // Fall through to the default currency.
  }

  return { user, sub, stripe, customer, currency: resolveCurrency(customer) };
}

export async function GET() {
  try {
    const ctx = await loadContext();
    if (ctx.error) return ctx.error;

    const symbol = currencySymbol(ctx.currency);
    return NextResponse.json({
      available: true,
      currency: ctx.currency,
      symbol,
      amount: 6,
      display: `${symbol}6`,
      normalDisplay: `${symbol}12`,
    });
  } catch (err) {
    console.error('[cancel-offer] terms lookup failed', { message: err.message });
    return NextResponse.json({ available: false }, { status: 200 });
  }
}

export async function POST() {
  try {
    const ctx = await loadContext();
    if (ctx.error) return ctx.error;

    const { user, sub, stripe, currency } = ctx;
    const priceId = getPriceId(currency, 'save');
    const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://revvylearn.com';

    const session = await stripe.checkout.sessions.create({
      customer: sub.stripe_customer_id,
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/?upgraded=lifetime`,
      cancel_url: `${origin}/settings?offer=declined`,
      adaptive_pricing: { enabled: true },
      metadata: {
        supabase_user_id: user.id,
        plan: 'lifetime',
        source: 'cancel_save',
      },
      payment_intent_data: {
        metadata: {
          supabase_user_id: user.id,
          plan: 'lifetime',
          source: 'cancel_save',
        },
      },
    });

    console.log('[cancel-offer] session created', {
      userId: user.id, customerId: sub.stripe_customer_id, currency,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('[cancel-offer] checkout failed', { message: err.message });
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
