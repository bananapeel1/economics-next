/**
 * Price and coupon resolution.
 *
 * Base currency is GBP. Stripe Adaptive Pricing presents the local currency
 * to the customer at checkout while we still settle in GBP, so we do NOT need
 * per-country prices here.
 *
 * The one exception is currency lock: Stripe fixes `customer.currency` on a
 * customer's first invoice and it can never be changed. Customers who first
 * paid in EUR (everyone who signed up before the GBP switch) can only ever be
 * charged in EUR, so we keep a parallel set of EUR prices for them. Without
 * this, checkout and the cancel-save offer fail outright for those customers.
 */

const PRICES = {
  gbp: {
    monthly: process.env.STRIPE_PRICE_MONTHLY_GBP,
    lifetime: process.env.STRIPE_PRICE_LIFETIME_GBP,
    save: process.env.STRIPE_PRICE_SAVE_GBP,
    introCoupon: process.env.STRIPE_COUPON_INTRO_GBP,
  },
  eur: {
    monthly: process.env.STRIPE_PRICE_MONTHLY_EUR,
    lifetime: process.env.STRIPE_PRICE_LIFETIME_EUR,
    save: process.env.STRIPE_PRICE_SAVE_EUR,
    introCoupon: process.env.STRIPE_COUPON_INTRO_EUR,
  },
};

export const DEFAULT_CURRENCY = 'gbp';

/**
 * Which currency must we charge this customer in?
 * Honours Stripe's immutable currency lock; new customers get GBP.
 */
export function resolveCurrency(stripeCustomer) {
  const locked = stripeCustomer?.currency?.toLowerCase();
  if (locked && PRICES[locked]) return locked;
  return DEFAULT_CURRENCY;
}

/**
 * Look up a price ID. Throws with a clear message if the env var is missing,
 * so a misconfigured deploy fails loudly at checkout rather than silently
 * charging the wrong amount.
 */
export function getPriceId(currency, kind) {
  const set = PRICES[currency] || PRICES[DEFAULT_CURRENCY];
  const id = set[kind];
  if (!id) {
    throw new Error(`Price not configured: ${kind} in ${currency} (set STRIPE_PRICE_${kind.toUpperCase()}_${currency.toUpperCase()})`);
  }
  return id;
}

/** Intro coupon (first month for 1.00) for this currency, or null if unset. */
export function getIntroCoupon(currency) {
  const set = PRICES[currency] || PRICES[DEFAULT_CURRENCY];
  return set.introCoupon || null;
}

/** Display symbol for user-facing copy. */
export function currencySymbol(currency) {
  return currency === 'eur' ? '€' : '£';
}
