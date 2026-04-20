/**
 * Recover users who have paid Stripe but whose DB row never got upgraded
 * to premium (the webhook-failure fallout).
 *
 * Finds rows in user_subscriptions where plan='free' but stripe_customer_id
 * is set, queries Stripe for active/trialing subs on that customer, and
 * syncs the DB row to premium/active when one exists.
 *
 * Safe by default — dry run unless --apply is passed.
 *
 * Usage:
 *   node scripts/sync-stuck-subscriptions.mjs          # dry run
 *   node scripts/sync-stuck-subscriptions.mjs --apply  # actually write
 *
 * Requires env vars (loaded from .env.local via _db.mjs):
 *   SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL)
 *   SUPABASE_SERVICE_KEY (or SUPABASE_SERVICE_ROLE_KEY)
 *   STRIPE_SECRET_KEY
 */
import { supabase } from './_db.mjs';
import Stripe from 'stripe';

const APPLY = process.argv.includes('--apply');
const STRIPE_RATE_DELAY_MS = 150; // ~6 calls/sec, well under Stripe's limit

const stripeKey = process.env.STRIPE_SECRET_KEY?.trim();
if (!stripeKey) {
  console.error('STRIPE_SECRET_KEY not set. Add it to .env.local or export it.');
  process.exit(1);
}
const stripe = new Stripe(stripeKey);

function getPeriodEnd(subscription) {
  const ts = subscription.current_period_end
    || subscription.items?.data?.[0]?.current_period_end;
  return ts ? new Date(ts * 1000).toISOString() : null;
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  console.log(APPLY ? '=== APPLY MODE — writing changes ===' : '=== DRY RUN — no writes ===');

  const { data: stuck, error } = await supabase
    .from('user_subscriptions')
    .select('user_id, stripe_customer_id, plan, status')
    .eq('plan', 'free')
    .not('stripe_customer_id', 'is', null);

  if (error) {
    console.error('Failed to query user_subscriptions:', error);
    process.exit(1);
  }

  console.log(`Found ${stuck.length} candidate row(s) with plan=free + stripe_customer_id.`);

  let toFix = 0;
  let fixed = 0;
  let skipped = 0;
  let failed = 0;

  for (const row of stuck) {
    await sleep(STRIPE_RATE_DELAY_MS);

    let subscription = null;
    try {
      const active = await stripe.subscriptions.list({
        customer: row.stripe_customer_id,
        status: 'active',
        limit: 10,
      });
      if (active.data[0]) {
        subscription = active.data[0];
      } else {
        const trialing = await stripe.subscriptions.list({
          customer: row.stripe_customer_id,
          status: 'trialing',
          limit: 10,
        });
        subscription = trialing.data[0] || null;
      }
    } catch (err) {
      console.error(`  [error] Stripe lookup failed for user ${row.user_id} customer ${row.stripe_customer_id}:`, err.message);
      failed++;
      continue;
    }

    if (!subscription) {
      skipped++;
      continue;
    }

    toFix++;
    const periodEnd = getPeriodEnd(subscription);
    const trialEnd = subscription.trial_end
      ? new Date(subscription.trial_end * 1000).toISOString()
      : null;

    console.log(`  [fix] user=${row.user_id} customer=${row.stripe_customer_id} sub=${subscription.id} status=${subscription.status} periodEnd=${periodEnd}`);

    if (!APPLY) continue;

    const { error: updateError } = await supabase
      .from('user_subscriptions')
      .update({
        stripe_subscription_id: subscription.id,
        plan: 'premium',
        status: 'active',
        current_period_end: periodEnd,
        trial_end: trialEnd,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', row.user_id);

    if (updateError) {
      console.error(`  [write-fail] user=${row.user_id}`, updateError);
      failed++;
    } else {
      fixed++;
    }
  }

  console.log('\n=== Summary ===');
  console.log(`Candidates scanned:          ${stuck.length}`);
  console.log(`Had active/trialing Stripe:  ${toFix}`);
  console.log(`No active Stripe sub (skip): ${skipped}`);
  if (APPLY) {
    console.log(`Successfully upgraded:       ${fixed}`);
    console.log(`Write failures:              ${failed}`);
  } else {
    console.log('(Dry run — re-run with --apply to write these changes.)');
  }
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
