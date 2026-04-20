/**
 * Report-only: find Stripe customers with more than one active or trialing
 * subscription. Output feeds a manual customer-service pass — this script
 * NEVER cancels or refunds anything.
 *
 * This is the script that surfaces the user who bought three subscriptions
 * because the first purchase never reflected as premium.
 *
 * Usage:
 *   node scripts/find-duplicate-subscriptions.mjs
 *
 * Requires env vars (loaded from .env.local via _db.mjs):
 *   SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL)
 *   SUPABASE_SERVICE_KEY (or SUPABASE_SERVICE_ROLE_KEY)
 *   STRIPE_SECRET_KEY
 */
import { supabase } from './_db.mjs';
import Stripe from 'stripe';

const stripeKey = process.env.STRIPE_SECRET_KEY?.trim();
if (!stripeKey) {
  console.error('STRIPE_SECRET_KEY not set. Add it to .env.local or export it.');
  process.exit(1);
}
const stripe = new Stripe(stripeKey);

function formatAmount(amount, currency) {
  if (amount == null) return '—';
  return `${(amount / 100).toFixed(2)} ${(currency || '').toUpperCase()}`;
}

async function main() {
  console.log('Scanning every user with a stripe_customer_id for multiple active/trialing subs…\n');

  const { data: rows, error } = await supabase
    .from('user_subscriptions')
    .select('user_id, stripe_customer_id')
    .not('stripe_customer_id', 'is', null);

  if (error) {
    console.error('Failed to query user_subscriptions:', error);
    process.exit(1);
  }

  const duplicates = [];

  for (const row of rows) {
    const [active, trialing] = await Promise.all([
      stripe.subscriptions.list({ customer: row.stripe_customer_id, status: 'active', limit: 10 }),
      stripe.subscriptions.list({ customer: row.stripe_customer_id, status: 'trialing', limit: 10 }),
    ]).catch(err => {
      console.error(`  [error] Stripe lookup failed for customer ${row.stripe_customer_id}:`, err.message);
      return [{ data: [] }, { data: [] }];
    });

    const subs = [...active.data, ...trialing.data];
    if (subs.length > 1) {
      duplicates.push({ row, subs });
    }
  }

  if (duplicates.length === 0) {
    console.log('No customers with multiple active/trialing subscriptions found.');
    return;
  }

  console.log(`Found ${duplicates.length} customer(s) with multiple active/trialing subs:\n`);

  for (const { row, subs } of duplicates) {
    console.log(`-- Supabase user: ${row.user_id}`);
    console.log(`   Stripe customer: ${row.stripe_customer_id}`);
    console.log(`   Subscriptions (${subs.length}):`);
    for (const s of subs) {
      const item = s.items?.data?.[0];
      const amount = item?.price?.unit_amount;
      const currency = item?.price?.currency;
      const created = new Date(s.created * 1000).toISOString();
      const periodEnd = s.current_period_end
        ? new Date(s.current_period_end * 1000).toISOString()
        : item?.current_period_end
          ? new Date(item.current_period_end * 1000).toISOString()
          : '—';
      console.log(`     • ${s.id}  status=${s.status}  created=${created}  periodEnd=${periodEnd}  amount=${formatAmount(amount, currency)}`);
    }
    console.log('');
  }

  console.log('Next steps (manual):');
  console.log('  1. Review each customer in Stripe Dashboard.');
  console.log('  2. Keep the subscription with the latest period_end (best value for the user).');
  console.log('  3. Cancel + refund the duplicates via Stripe Dashboard (not via this script).');
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
