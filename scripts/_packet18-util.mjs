/**
 * Packet 18 helpers: the id scheme scripts/mint-item-ids.mjs uses, so hand-authored items carry ids
 * of the same shape (`<section>:<kind>:<hash8(key)>`), the validator's own word counter, and Maji —
 * the one market this section carries across its body, diagrams, notes and assessment.
 *
 * WHY ONE MARKET. Business 1.3.2 asks for the factors that shift demand (1a), the factors that shift
 * supply (2a), the interaction of the two (3a), the drawing and interpretation of demand and supply
 * diagrams (3b), a PED calculation (4a), the interpretation of its values (4b), the factors behind it
 * (4c), its significance for pricing (4d) and its relationship with total revenue (4e). Every one of
 * those is a property of ONE pair of lines, so the section uses one pair:
 *
 *      Qd = 900 − 30P        Qs = 100 + 20P        cases a week, price in dollars
 *
 * They meet at P = $16, Q = 420. Every figure in the section is derived from them here, and the
 * runner re-derives each result from its inputs and refuses to stage if a printed figure disagrees
 * with its own arithmetic. The diagrams are sampled from the same functions, not drawn by eye
 * (packet 15's accuracy-01 rule).
 *
 * A PROPERTY WORTH KNOWING, because the whole PED chapter rests on it. With the standard percentage
 * method — the change divided by the ORIGINAL value — PED on this line depends only on the price you
 * start from, and not at all on where you finish:
 *
 *      PED from P1 to any P2  =  −30·P1 / (900 − 30·P1)  =  −P1 / (30 − P1)
 *
 * So it is exactly −0.5 from $10, exactly −1.0 from $15 and exactly −2.0 from $20, whichever price
 * the student moves to. No worked example can be contradicted by a reader who picks a different
 * second price, and no value needs rounding to be presented. Total revenue peaks at $15 as well, so
 * 4b and 4e are one fact seen twice rather than two to memorise.
 *
 * Maji is fictional and, like packet 17's Tafari and packet 16's Zuri, is deliberately given no
 * country. The March section put 7 of its 11 real examples in the UK (structure-10); the named real
 * products here are international and carry no year and no figure, so there is nothing to overstate.
 * One currency: dollars.
 */
import { createHash } from 'node:crypto';

export const SECTION = 'the-market';

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export const hash8 = (s) => createHash('sha1').update(norm(s)).digest('hex').slice(0, 8);
export const id = (kind, key) => `${SECTION}:${kind}:${hash8(key)}`;
export const subId = (s) => `${SECTION}:sub:${s}`;

/* ── the market ────────────────────────────────────────────────────────────── */

export const D_INTERCEPT = 900;    // cases a week buyers would take at a price of zero
export const D_SLOPE = 30;         // cases lost per dollar of price
export const S_INTERCEPT = 100;    // the supply line's intercept
export const S_SLOPE = 20;         // cases gained per dollar of price

export const qdAt = (p) => D_INTERCEPT - D_SLOPE * p;
export const qsAt = (p) => S_INTERCEPT + S_SLOPE * p;
export const trAt = (p) => p * qdAt(p);

/** Where the two lines meet: the price at which the quantity demanded and supplied are the same. */
export const MEET_P = (D_INTERCEPT - S_INTERCEPT) / (D_SLOPE + S_SLOPE);   // 16
export const MEET_Q = qdAt(MEET_P);                                        // 420

/** The prices the section works with, low to high. */
export const PRICES = [10, 12, 15, 16, 20, 25];

/** The price at which quantity demanded reaches zero — the top of the demand line. */
export const CHOKE_P = D_INTERCEPT / D_SLOPE;                              // 30
/** The price at which total revenue is at its maximum, which is also where PED is exactly −1. */
export const PEAK_P = D_INTERCEPT / (2 * D_SLOPE);                         // 15
export const PEAK_Q = qdAt(PEAK_P);                                        // 450
export const MAX_TR = trAt(PEAK_P);                                        // 6750

const pct = (from, to) => Math.round(((to - from) / from) * 1000) / 10;
/** Percentage change in quantity demanded when the price moves from p1 to p2. */
export const pctQ = (p1, p2) => pct(qdAt(p1), qdAt(p2));
/** Percentage change in the price itself. */
export const pctP = (p1, p2) => pct(p1, p2);
/** PED between two prices, from the percentage changes, rounded to two decimals. */
export const ped = (p1, p2) => Math.round((pctQ(p1, p2) / pctP(p1, p2)) * 100) / 100;

/** The inelastic move the body works: $10 → $12, PED −0.5. */
export const PED_INELASTIC = [10, 12];
/** The elastic move the body works: $20 → $25, PED −2.0. */
export const PED_ELASTIC = [20, 25];
/** The unit-elastic move: $15 → $18, PED −1.0, and the price at which revenue peaks. */
export const PED_UNIT = [15, 18];

/* ── income elasticity: one income rise, three of Maji's products ──────────── */
/*
 * Real income across the region rises from $25,000 to $27,000, which is +8%. Three products respond
 * differently, and between them they carry 5b (normal and inferior), 5c (interpretation of the
 * numerical values) and 5d (the factors behind them).
 */
export const INCOME_FROM = 25000;
export const INCOME_TO = 27000;
export const INCOME_RISE = pct(INCOME_FROM, INCOME_TO);                    // 8

/** Sparkling fruit pressé: a product buyers trade UP to. Quantity 250 → 290 cases. */
export const PRESSE_Q = [250, 290];
/** Still bottled water: bought a little more of, but nothing like proportionately. 600 → 624. */
export const WATER_Q = [600, 624];
/** Powdered drink mix: a product buyers leave as soon as they can afford to. 400 → 384. */
export const MIX_Q = [400, 384];

export const pctOf = (pair) => pct(pair[0], pair[1]);
/** YED for one product, from the percentage change in its quantity and the income rise. */
export const yed = (pair) => Math.round((pctOf(pair) / INCOME_RISE) * 100) / 100;

export const YED_PRESSE = () => yed(PRESSE_Q);    // +2.0  income elastic, normal
export const YED_WATER = () => yed(WATER_Q);      // +0.5  income inelastic, normal
export const YED_MIX = () => yed(MIX_Q);          // −0.5  inferior

/* ── formatting ────────────────────────────────────────────────────────────── */
/** One money format for the whole section (packet 16's Layer 6 caught $108000 beside $108,000). */
export const money = (n) => (Number.isInteger(n) ? `$${n.toLocaleString('en-GB')}` : `$${n.toFixed(2)}`);
/*
 * ONE MINUS SIGN. JavaScript renders a negative number with an ASCII hyphen, and a sentence typed by
 * hand carries U+2212, so the first draft of this section put "-0.5" in the body beside "−2.0" in a
 * recall — 55 of one and 13 of the other, on the same page, in a section whose subject is negative
 * numbers. Every number a student reads goes through one of these, and they all use U+2212.
 */
export const minus = (s) => String(s).replace(/-/g, '\u2212');
/** An elasticity as a student must write it: signed, and never bare. */
export const sig = (n) => (n > 0 ? `+${n}` : minus(n));
/** A percentage as the body prints it, sign kept. */
export const pc = (n) => (n > 0 ? `+${n}%` : `${minus(n)}%`);
/** A PED value for display. ped() itself stays numeric, because the runner does arithmetic with it. */
export const pedS = (p1, p2) => minus(ped(p1, p2));

/** Words of teaching text in a subsection, exactly as lib/content-validator.mjs counts them. */
export function teachingWords(sec) {
  const normText = (s) => String(s ?? '').toLowerCase().replace(/\s+/g, ' ').trim();
  const words = (s) => normText(s).split(' ').filter(Boolean).length;
  const teaching = [sec?.keyIdea, ...(sec?.body || []).flatMap((b) => [b?.text, ...(b?.items || []), ...((b?.steps || []).map((s) => (typeof s === 'object' ? `${s.title} ${s.subtitle || ''}` : s))), b?.result]), sec?.realExample?.text, sec?.misconception, sec?.examMatters];
  return words(teaching.filter(Boolean).join(' '));
}
