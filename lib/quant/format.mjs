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

/**
 * Economies used in macro stems, chosen on the same reasoning as FIRMS: an IAL cohort
 * sits these papers outside the UK, and a growth-rate question about Sri Lanka is the
 * same arithmetic with the student's own context under it.
 *
 * Each carries the window its real GDP is drawn from, in US$ billion. The windows are
 * order-of-magnitude plausible for the economy named — a drill must not tell a student
 * that Kenya produces half a trillion dollars — but they are not published figures, and
 * the stems say "last year" and "this year" rather than naming a year, so no stem makes
 * a claim about a particular statistic. The Maldives is absent: at $6bn no whole-dollar
 * draw in the window survives the clean-arithmetic filter in percentage-change.mjs.
 */
export const ECONOMIES = [
  { name: 'Cyprus', low: 24, high: 36 },
  { name: 'Jordan', low: 42, high: 58 },
  { name: 'Ghana', low: 62, high: 88 },
  { name: 'Sri Lanka', low: 72, high: 96 },
  { name: 'Oman', low: 74, high: 98 },
  { name: 'Kenya', low: 100, high: 128 },
  { name: 'Qatar', low: 196, high: 244 },
  { name: 'Malaysia', low: 370, high: 440 },
  { name: 'Bangladesh', low: 416, high: 472 },
  { name: 'the United Arab Emirates', low: 476, high: 544 },
];

/**
 * `=` or `\u2248` for a worked-solution line. A template whose whole claim is that its arithmetic
 * is true must not write `=` over a rounding: `index-numbers` did it in 4,779 draws of 5,000 and
 * `percentage-change` in about three of four, both found by Verify A round 4.
 */
export const exactly = (value, dp) => (
  Math.abs(value - Number(Number(value).toFixed(dp))) < 1e-9 ? '=' : '\u2248'
);
