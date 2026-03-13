import { getStripe, getSubscriptionPeriodEnd } from '@/lib/stripe';
import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

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
      .select('plan, status, current_period_end, stripe_customer_id, trial_end')
      .eq('user_id', user.id)
      .single();

    if (!sub) {
      return NextResponse.json({ plan: 'free', status: 'inactive' });
    }

    // If our DB says the user is NOT premium but they have a Stripe customer,
    // check Stripe directly in case the webhook was missed
    if (sub.plan !== 'premium' && sub.stripe_customer_id) {
      try {
        const stripe = getStripe();

        // Check for both active AND trialing subscriptions
        let activeSub = null;
        const activeList = await stripe.subscriptions.list({
          customer: sub.stripe_customer_id,
          status: 'active',
          limit: 1,
        });
        activeSub = activeList.data[0];

        if (!activeSub) {
          const trialingList = await stripe.subscriptions.list({
            customer: sub.stripe_customer_id,
            status: 'trialing',
            limit: 1,
          });
          activeSub = trialingList.data[0];
        }

        if (activeSub) {
          const periodEnd = getSubscriptionPeriodEnd(activeSub);
          const trialEnd = activeSub.trial_end
            ? new Date(activeSub.trial_end * 1000).toISOString()
            : null;

          // Sync the DB with Stripe's truth
          await serviceSupabase
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

          return NextResponse.json({
            plan: 'premium',
            status: 'active',
            currentPeriodEnd: periodEnd,
            trialEnd,
          });
        }
      } catch (e) {
        // If Stripe check fails, fall through to DB-based response
        console.error('Stripe sync check failed:', e.message);
      }
    }

    // Check if subscription has expired
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
