import Stripe from 'stripe';

let _stripe = null;

export function getStripe() {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY?.trim();
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY is not configured');
    }
    _stripe = new Stripe(key);
  }
  return _stripe;
}

/**
 * Get the current_period_end from a Stripe subscription.
 * In newer API versions (2025+), this field moved to subscription items.
 */
export function getSubscriptionPeriodEnd(subscription) {
  const timestamp = subscription.current_period_end
    || subscription.items?.data?.[0]?.current_period_end;
  if (!timestamp) return null;
  return new Date(timestamp * 1000).toISOString();
}
