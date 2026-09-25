/**
 * Whether this account can still get the intro offer, stated once.
 *
 * F031. `app/api/stripe/checkout/route.js` already gets this right: a prior subscription
 * disqualifies the intro coupon, so the discount is simply not applied. The interface never
 * learned. Every visitor saw "£1 first month", including the 43 accounts carrying a cancelled
 * subscription row who are not eligible for it. They click a £1 offer and are charged £1.99.
 *
 * That is the same defect as the 182 marketing claims: the page says something the product will
 * not honour. It is worse here, because it is a price, and the student finds out at the till.
 *
 * The rule must match checkout's exactly, so both read it from here.
 */

/**
 * The one rule: has this account ever had a Stripe subscription?
 *
 * Rejected twice by verification before this version, both times for failing OPEN. The first
 * version read `stripe_subscription_id` off whatever object it was handed. `/api/subscription`
 * does not put that column in its JSON, and `getSubscriptionRow` does not select it, so the
 * client was asking "is this field absent?" of a shape where it is always absent. The answer was
 * always yes, and every returning subscriber was shown the £1 they would not be charged.
 *
 * Two rules follow from that:
 *
 * 1. **A lifetime buyer is not eligible.** Their `stripe_subscription_id` is nulled when the
 *    one-time payment completes, so the absence test called them new customers. They have paid
 *    more than anyone.
 * 2. **A shape without the deciding column fails CLOSED.** Advertising £1.99 to somebody entitled
 *    to £1 costs us a discount and they can ask. Advertising £1 and charging £1.99 is the defect
 *    this whole finding is about, and the student finds out at the till. When we cannot tell, we
 *    quote the price we know we will honour, and say so in the log.
 */
export function isTrialEligible(subscriptionRow) {
  // No row at all is not a missing field — it is a positive fact. Nobody has a row until they
  // check out, so this is the genuinely new visitor, and the offer is theirs.
  if (!subscriptionRow) return true;

  // A server that already decided wins. `/api/subscription` computes this from the database row,
  // which is the only place the deciding column actually exists.
  if (typeof subscriptionRow.trialEligible === 'boolean') return subscriptionRow.trialEligible;

  if (subscriptionRow.plan === 'lifetime') return false;

  if (!('stripe_subscription_id' in subscriptionRow)) {
    console.error(
      '[trial-eligibility] asked to decide from a shape with no stripe_subscription_id. ' +
        'Quoting the full price. Pass the database row, or a payload carrying trialEligible.',
    );
    return false;
  }

  return !subscriptionRow.stripe_subscription_id;
}

/**
 * Copy for the offer, so the price a student is shown is the price they will be charged.
 * Returned as parts rather than a sentence, because the upgrade page and the button need
 * different shapes of the same truth.
 */
export function introOffer(trialEligible) {
  return trialEligible
    ? {
        headline: 'New subscribers get their first month for £1.',
        price: '£1',
        unit: 'first month',
        sub: 'new subscribers · then £1.99/month · cancel anytime',
        cta: 'Start Pro →',
      }
    : {
        headline: 'Pro is £1.99 a month. Cancel anytime.',
        price: '£1.99',
        unit: 'per month',
        // Said plainly rather than hidden: they have subscribed before, so the intro price is gone.
        sub: 'you have subscribed before, so the £1 first month does not apply · cancel anytime',
        cta: 'Resubscribe →',
      };
}
