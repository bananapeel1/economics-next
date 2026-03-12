import { getStripe, getSubscriptionPeriodEnd } from '@/lib/stripe';
import { createServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = createServerClient();

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      const userId = session.metadata?.supabase_user_id;
      const subscriptionId = session.subscription;

      if (userId && subscriptionId) {
        // Fetch subscription details from Stripe
        const subscription = await getStripe().subscriptions.retrieve(subscriptionId);
        const periodEnd = getSubscriptionPeriodEnd(subscription);

        await supabase
          .from('user_subscriptions')
          .upsert({
            user_id: userId,
            stripe_customer_id: session.customer,
            stripe_subscription_id: subscriptionId,
            plan: 'premium',
            status: 'active',
            current_period_end: periodEnd,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'user_id' });
      }
      break;
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object;
      const customerId = subscription.customer;
      const periodEnd = getSubscriptionPeriodEnd(subscription);

      // Find user by Stripe customer ID
      const { data: sub } = await supabase
        .from('user_subscriptions')
        .select('user_id')
        .eq('stripe_customer_id', customerId)
        .single();

      if (sub) {
        const isActive = ['active', 'trialing'].includes(subscription.status);
        await supabase
          .from('user_subscriptions')
          .update({
            status: isActive ? 'active' : 'cancelled',
            plan: isActive ? 'premium' : 'free',
            current_period_end: periodEnd,
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', sub.user_id);
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object;
      const customerId = subscription.customer;

      const { data: sub } = await supabase
        .from('user_subscriptions')
        .select('user_id')
        .eq('stripe_customer_id', customerId)
        .single();

      if (sub) {
        await supabase
          .from('user_subscriptions')
          .update({
            status: 'cancelled',
            plan: 'free',
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', sub.user_id);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
