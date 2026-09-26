/**
 * Which of a customer's Stripe subscriptions should grant access, if any.
 *
 * A customer can hold more than one subscription at once: a lapsed trial beside the plan they came
 * back and paid for, or the duplicates bought before checkout learned to refuse them. Every path that
 * writes user_subscriptions has to pick the same one. When the webhook didn't, a subscription ending
 * revoked access that another subscription was still paying for — on 4 Sep 2026 an expired trial's
 * deletion downgraded a customer who had paid on a second subscription five days earlier.
 *
 * The rule is the one /api/subscription already applied: of the active or trialing subscriptions,
 * the one whose period ends latest, so the customer is credited for the most time they have paid for.
 */

export const LIVE_SUBSCRIPTION_STATUSES = Object.freeze(['active', 'trialing']);

function periodEndOf(subscription) {
  return subscription.current_period_end || subscription.items?.data?.[0]?.current_period_end || 0;
}

/**
 * The subscription that should grant access, or null. `excludeId` drops the subscription an event
 * says is ending, in case Stripe still lists it as live when the event is handled.
 */
export function pickLiveSubscription(subscriptions, { excludeId = null } = {}) {
  const live = subscriptions.filter(
    s => s && s.id !== excludeId && LIVE_SUBSCRIPTION_STATUSES.includes(s.status),
  );
  if (!live.length) return null;
  return [...live].sort((a, b) => periodEndOf(b) - periodEndOf(a))[0];
}

/**
 * Ask Stripe for the customer's live subscriptions and pick one. Throws when Stripe cannot answer:
 * a caller about to revoke access must not read an outage as "nothing is live".
 */
export async function findLiveSubscription(stripe, customerId, { excludeId = null } = {}) {
  const lists = await Promise.all(
    LIVE_SUBSCRIPTION_STATUSES.map(status =>
      stripe.subscriptions.list({ customer: customerId, status, limit: 10 }),
    ),
  );
  return pickLiveSubscription(lists.flatMap(list => list.data), { excludeId });
}
