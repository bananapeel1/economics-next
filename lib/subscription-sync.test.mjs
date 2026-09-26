/**
 * A subscription ending must not revoke access that another subscription is still paying for.
 *
 * Two halves: the pick itself (lib/subscription-sync.js), and a guard that every place the Stripe
 * webhook downgrades a user on a subscription lifecycle event first asks whether another live
 * subscription remains. The guard reads the route's source because the route cannot be imported
 * here (Next path aliases, a live signature check). It is what fails if a downgrade path is added
 * without the check. WEBHOOK_ROUTE_UNDER_TEST points it at another copy of the route, so it can be
 * shown to fail on the version that had the bug.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pickLiveSubscription, findLiveSubscription, LIVE_SUBSCRIPTION_STATUSES } from './subscription-sync.js';

const sub = (id, status, periodEnd, { basil = false } = {}) => (basil
  ? { id, status, items: { data: [{ current_period_end: periodEnd }] } }
  : { id, status, current_period_end: periodEnd });

// The case this was written for (4 Sep 2026): an expired trial is deleted five days after the
// customer paid on a second subscription.
test('an expired trial ending leaves the paid subscription granting access', () => {
  const trial = sub('sub_trial', 'canceled', 1756900000);
  const paid = sub('sub_paid', 'active', 1759150000);
  assert.equal(pickLiveSubscription([trial, paid], { excludeId: 'sub_trial' })?.id, 'sub_paid');
});

test('the only subscription ending leaves nothing, so the downgrade still happens', () => {
  assert.equal(pickLiveSubscription([sub('sub_only', 'canceled', 1759150000)], { excludeId: 'sub_only' }), null);
  assert.equal(pickLiveSubscription([], { excludeId: 'sub_only' }), null);
});

test('the ending subscription is dropped even while Stripe still lists it as live', () => {
  const ending = sub('sub_ending', 'active', 1760000000);
  assert.equal(pickLiveSubscription([ending], { excludeId: 'sub_ending' }), null);
  const other = sub('sub_other', 'active', 1759000000);
  assert.equal(pickLiveSubscription([ending, other], { excludeId: 'sub_ending' })?.id, 'sub_other');
});

test('past_due, unpaid, incomplete, paused and canceled subscriptions never grant access', () => {
  for (const status of ['past_due', 'unpaid', 'incomplete', 'incomplete_expired', 'paused', 'canceled']) {
    assert.equal(pickLiveSubscription([sub('s', status, 1760000000)]), null, status);
  }
  assert.deepEqual([...LIVE_SUBSCRIPTION_STATUSES], ['active', 'trialing']);
});

test('of two live subscriptions, the one paid furthest ahead wins, in either shape Stripe sends', () => {
  const sooner = sub('sub_sooner', 'active', 1759000000);
  const later = sub('sub_later', 'trialing', 1760000000, { basil: true });
  assert.equal(pickLiveSubscription([sooner, later])?.id, 'sub_later');
  assert.equal(pickLiveSubscription([later, sooner])?.id, 'sub_later');
});

function fakeStripe(subscriptions, { fail = false } = {}) {
  const calls = [];
  return {
    calls,
    subscriptions: {
      async list(params) {
        calls.push(params);
        if (fail) throw Object.assign(new Error('stripe unavailable'), { type: 'StripeConnectionError' });
        return { data: subscriptions.filter(s => s.customer === params.customer && s.status === params.status) };
      },
    },
  };
}

test("findLiveSubscription reads that customer's active and trialing subscriptions", async () => {
  const stripe = fakeStripe([
    { ...sub('sub_trial', 'canceled', 1756900000), customer: 'cus_A' },
    { ...sub('sub_paid', 'active', 1759150000), customer: 'cus_A' },
    { ...sub('sub_someone_else', 'active', 1770000000), customer: 'cus_B' },
  ]);
  assert.equal((await findLiveSubscription(stripe, 'cus_A', { excludeId: 'sub_trial' }))?.id, 'sub_paid');
  assert.deepEqual(
    stripe.calls.map(c => `${c.customer}:${c.status}`).sort(),
    ['cus_A:active', 'cus_A:trialing'],
  );
});

test('a Stripe outage rejects instead of reading as "nothing is live"', async () => {
  await assert.rejects(findLiveSubscription(fakeStripe([], { fail: true }), 'cus_A'), /stripe unavailable/);
});

// ── the webhook route ────────────────────────────────────────────────────────────────────────────

const routePath = process.env.WEBHOOK_ROUTE_UNDER_TEST
  || new URL('../app/api/stripe/webhook/route.js', import.meta.url);
const source = readFileSync(routePath, 'utf8');

// Split the switch into its case bodies: each label runs to the next label or `default:`.
function caseBodies(src) {
  const labels = [...src.matchAll(/^\s*case '([^']+)':/gm)];
  const stop = src.search(/^\s*default:/m);
  return labels.map((m, i) => ({
    label: m[1],
    body: src.slice(m.index, i + 1 < labels.length ? labels[i + 1].index : (stop > m.index ? stop : src.length)),
  }));
}

test('every subscription-event downgrade in the webhook first checks for another live subscription', () => {
  const downgrades = caseBodies(source)
    .filter(c => c.label.startsWith('customer.subscription.') && c.body.includes("plan: 'free'"));

  // Parsing must actually find the two downgrade paths, or this guard passes by finding nothing.
  assert.deepEqual(
    downgrades.map(c => c.label).sort(),
    ['customer.subscription.deleted', 'customer.subscription.updated'],
  );
  for (const { label, body } of downgrades) {
    const check = body.indexOf('keepAccessFromAnotherSubscription(');
    assert.ok(check !== -1, `${label} downgrades without checking for another live subscription`);
    assert.ok(check < body.indexOf("plan: 'free'"), `${label} checks only after downgrading`);
  }
});

test('the check asks Stripe, excluding the subscription that is ending', () => {
  const start = source.indexOf('async function keepAccessFromAnotherSubscription(');
  assert.ok(start !== -1, 'keepAccessFromAnotherSubscription is not defined in the webhook route');
  const fn = source.slice(start, source.indexOf('\n}\n', start));
  assert.match(fn, /findLiveSubscription\(stripe, customerId, \{ excludeId: ending\.id \}\)/);
  assert.match(fn, /writeActiveSubscription\(/);
});
