/**
 * Packet 17 helpers: the id scheme scripts/mint-item-ids.mjs uses, so hand-authored items carry ids
 * of the same shape (`<section>:<kind>:<hash8(key)>`), the validator's own word counter, and Tafari
 * Coaches — the one set of worked figures this section carries across its body, diagrams, notes and
 * assessment.
 *
 * WHY ONE LINEAR DEMAND CURVE. 1.3.2 asks for the demand curve (2), a PED calculation (3b), the five
 * PED values (3c), how PED varies along a straight line (3f), total revenue (3e) and the PED-revenue
 * relationship (3g). All six are properties of ONE schedule, so the section uses one:
 *
 *      Q = 1200 − 40P        tickets a day, fare in dollars
 *
 * Its midpoint is P = $15, Q = 600, where PED = −1 and total revenue peaks at $9,000. Every figure in
 * the section is derived from that line here, and the runner re-derives each result from its inputs
 * and refuses to stage if a printed figure disagrees with its own arithmetic (Layer 5). Nothing is
 * asserted: the diagrams are sampled from the same function (packet 15's accuracy-01 rule).
 *
 * Tafari is fictional and, like packet 16's Zuri, is deliberately given no country. Packet 14's Layer
 * 6 found an overstated figure inside a *cited* real example; packet 15's answer was to carry no
 * figures at all. An elasticity section cannot do that — the specification asks for the calculations —
 * so every figure is invented, which leaves nothing to overstate, and the real examples name real
 * products and firms without a year or a number attached (Layer 4). One currency: dollars.
 */
import { createHash } from 'node:crypto';

export const SECTION = 'consumer-behaviour-demand';

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export const hash8 = (s) => createHash('sha1').update(norm(s)).digest('hex').slice(0, 8);
export const id = (kind, key) => `${SECTION}:${kind}:${hash8(key)}`;
export const subId = (s) => `${SECTION}:sub:${s}`;

/* ── the market demand curve ───────────────────────────────────────────────── */

export const D_INTERCEPT = 1200;   // tickets a day at a fare of zero
export const D_SLOPE = 40;         // tickets lost per dollar of fare
export const qAt = (p) => D_INTERCEPT - D_SLOPE * p;
export const trAt = (p) => p * qAt(p);

/** The five fares the section works with, low to high. */
export const FARES = [10, 12, 15, 20, 22];

/** The midpoint of the line: where PED is exactly −1 and total revenue is at its maximum. */
export const MID_P = D_INTERCEPT / (2 * D_SLOPE);          // 15
export const MID_Q = qAt(MID_P);                            // 600
export const MAX_TR = trAt(MID_P);                          // 9000
/** The fare at which quantity demanded reaches zero — the top of the line. */
export const CHOKE_P = D_INTERCEPT / D_SLOPE;               // 30

const pct = (from, to) => Math.round(((to - from) / from) * 1000) / 10;
/** Percentage change in quantity when the fare moves from p1 to p2. */
export const pctQ = (p1, p2) => pct(qAt(p1), qAt(p2));
/** Percentage change in the fare itself. */
export const pctP = (p1, p2) => pct(p1, p2);
/** PED between two fares, from the percentage changes, rounded to two decimals. */
export const ped = (p1, p2) => Math.round((pctQ(p1, p2) / pctP(p1, p2)) * 100) / 100;

/** The inelastic segment the body works: $10 → $12, PED −0.5. */
export const PED_INELASTIC = [10, 12];
/** The elastic segment the body works: $20 → $22, PED −2.0. */
export const PED_ELASTIC = [20, 22];

/* ── one traveller's diminishing marginal utility ──────────────────────────── */
/*
 * What one traveller would pay for a first, second, third and fourth trip in a month, in dollars.
 * Falling marginal utility IS the individual demand curve: at a fare of $18 the second trip is still
 * worth taking and the third is not, so the traveller buys more only when the fare falls. 2c asks for
 * exactly this link and the March section never made it (specGap-01, structure-06).
 */
export const MU = [26, 18, 11, 5];
export const totalUtility = (n) => MU.slice(0, n).reduce((a, b) => a + b, 0);   // 26, 44, 55, 60
/** Trips this traveller buys at a fare: every trip whose marginal utility is at least the fare. */
export const tripsAt = (fare) => MU.filter((m) => m >= fare).length;

/* ── income and cross elasticities ─────────────────────────────────────────── */

export const INCOME_RISE = 10;     // % rise in real income across the city
export const COACH_YQ = -5;        // % change in coach tickets  → inferior good
export const AIR_YQ = 20;          // % change in air tickets    → income-elastic normal good
export const RICE_YQ = 4;          // % change in rice           → income-inelastic normal good
export const yed = (dq) => Math.round((dq / INCOME_RISE) * 100) / 100;

export const AIR_FARE_RISE = 10;   // % rise in the air fare on the same route
export const COACH_XQ = 6;         // % rise in coach tickets that follows  → substitutes
export const COACH_FARE_FALL = -10;// % fall in the coach fare
export const HOTEL_XQ = 4;         // % rise in hotel nights at the destination → complements
export const xed = (dqA, dpB) => Math.round((dqA / dpB) * 100) / 100;

export const XED_SUBSTITUTE = () => xed(COACH_XQ, AIR_FARE_RISE);      // +0.6
export const XED_COMPLEMENT = () => xed(HOTEL_XQ, COACH_FARE_FALL);    // −0.4

/* ── formatting ────────────────────────────────────────────────────────────── */
/** One money format for the whole section (packet 16's Layer 6 caught $108000 beside $108,000). */
export const money = (n) => (Number.isInteger(n) ? `$${n.toLocaleString('en-GB')}` : `$${n.toFixed(2)}`);
/** An elasticity as a student must write it: signed, two significant places where it needs them. */
export const sig = (n) => (Number.isInteger(n) ? `${n > 0 ? '+' : ''}${n}` : `${n > 0 ? '+' : ''}${n}`);

/** Words of teaching text in a subsection, exactly as lib/content-validator.mjs counts them. */
export function teachingWords(sec) {
  const normText = (s) => String(s ?? '').toLowerCase().replace(/\s+/g, ' ').trim();
  const words = (s) => normText(s).split(' ').filter(Boolean).length;
  const teaching = [sec?.keyIdea, ...(sec?.body || []).flatMap((b) => [b?.text, ...(b?.items || []), ...((b?.steps || []).map((s) => (typeof s === 'object' ? `${s.title} ${s.subtitle || ''}` : s))), b?.result]), sec?.realExample?.text, sec?.misconception, sec?.examMatters];
  return words(teaching.filter(Boolean).join(' '));
}
