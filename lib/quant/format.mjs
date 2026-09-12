/** Shared formatting for quantitative drill stems and worked solutions. */

export const money = (n) =>
  '$' + Number(n).toLocaleString('en-US', { maximumFractionDigits: 2 });

export const num = (n) => Number(n).toLocaleString('en-US');

/** Round to `dp` and drop floating-point dust: 0.25000000000000006 → 0.25 */
export const round = (n, dp = 2) => Number(Number(n).toFixed(dp));

/**
 * Businesses and goods used in stems. IAL students sit these papers outside the UK —
 * core markets are the UAE, Sri Lanka, Cyprus, Bangladesh, the Maldives, Qatar, Kenya —
 * so the contexts are international rather than British high street.
 */
export const FIRMS = [
  'Zahrat Cafés, Dubai',
  'Kandy Cycle Works, Sri Lanka',
  'Nicosia Print Co, Cyprus',
  'Dhaka Denim Ltd, Bangladesh',
  'Malé Water Sports, Maldives',
  'Nairobi Fresh Juice Ltd',
  'Doha Sports Nutrition',
];

export const GOODS = [
  'bottled water',
  'taxi rides',
  'imported rice',
  'cinema tickets',
  'bus fares',
  'domestic flights',
];
