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

/** The one rule. A Stripe subscription id on the row means they have subscribed before. */
export function isTrialEligible(subscriptionRow) {
  return !subscriptionRow?.stripe_subscription_id;
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
