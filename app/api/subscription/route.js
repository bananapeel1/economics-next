import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ plan: 'free', status: 'inactive' });
  }

  const serviceSupabase = createServerClient();
  const { data: sub } = await serviceSupabase
    .from('user_subscriptions')
    .select('plan, status, current_period_end')
    .eq('user_id', user.id)
    .single();

  if (!sub) {
    return NextResponse.json({ plan: 'free', status: 'inactive' });
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
  });
}
