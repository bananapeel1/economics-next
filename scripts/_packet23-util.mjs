/**
 * Packet 23 helpers: the id scheme scripts/mint-item-ids.mjs uses, so hand-authored items carry ids
 * of the same shape (`<section>:<kind>:<hash8(key)>`), the validator's own word counter, and Kavira
 * Ceramics — the one firm whose figures this section carries across its body, diagrams, notes and
 * assessment.
 *
 * WHY ONE FIRM WITH ONE PRICE RISE. IAL Economics 1.3.3 is two questions, not two topics: what moves
 * supply (1a-1c) and how far it moves when price does (2a-2d). The second half turns entirely on
 * leaf 2d — "the distinction between the short run and long run in economics and its significance
 * for price elasticity of supply" — which the March section never taught, because its short-run /
 * long-run block was about diminishing returns and returns to scale, Unit 3 material that never
 * mentions elasticity at all.
 *
 * So the whole of PES is carried by ONE price rise seen twice:
 *
 *      $8 → $10 a tile, a 25% rise
 *      short run, one kiln:        400 → 460 tiles a week   (+15%)   PES 0.6, inelastic
 *      long run, a second kiln:    400 → 640 tiles a week   (+60%)   PES 2.4, elastic
 *
 * Same firm, same price change, same starting output; only the time available to respond differs.
 * That is leaf 2d stated as arithmetic a student can check, and it carries 2a, 2b, 2c-1 and 2d on
 * one pair of numbers — packet 17's rule, where 1.3.2's six leaves rode on Q = 1200 − 40P.
 *
 * Both schedules are straight lines through the same point, and both are derived here rather than
 * drawn by hand, so the curves in the diagrams ARE these functions:
 *
 *      short run   Qs = 30P + 160     (cuts the quantity axis, so PES < 1 everywhere)
 *      long run    Qs = 120P − 560    (cuts the price axis at $4.67, so PES > 1 everywhere)
 *
 * Kavira Ceramics is fictional and, like packet 16's Zuri, packet 17's Tafari and packet 19's Yusra
 * Foods, is given no country: the REAL examples carry the internationalisation. One currency:
 * dollars. Every figure below is re-derived by the runner from the emitted SVG, so a number that
 * changes in one surface and not another fails the build (packet 15's accuracy-01 rule).
 */
import { createHash } from 'node:crypto';

export const SECTION = 'supply';

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export const hash8 = (s) => createHash('sha1').update(norm(s)).digest('hex').slice(0, 8);
export const id = (kind, key) => `${SECTION}:${kind}:${hash8(key)}`;
export const subId = (s) => `${SECTION}:sub:${s}`;

/* ── the one price rise (2a, 2b, 2c-1, 2d) ─────────────────────────────────── */

export const P0 = 8;          // $ a tile before
export const P1 = 10;         // $ a tile after
export const Q0 = 400;        // tiles a week at $8, in either time horizon
export const Q_SR = 460;      // tiles a week at $10 with one kiln
export const Q_LR = 640;      // tiles a week at $10 once a second kiln is running

/** Percentage change, as a student writes it: the change over the ORIGINAL value. */
export const pctChange = (from, to) => ((to - from) / from) * 100;
export const PCT_P = () => pctChange(P0, P1);          // 25
export const PCT_Q_SR = () => pctChange(Q0, Q_SR);     // 15
export const PCT_Q_LR = () => pctChange(Q0, Q_LR);     // 60

/** PES = % change in quantity supplied / % change in price. Always positive on an upward curve. */
export const pes = (pctQ, pctP) => Math.round((pctQ / pctP) * 100) / 100;
export const PES_SR = () => pes(PCT_Q_SR(), PCT_P());  // 0.6
export const PES_LR = () => pes(PCT_Q_LR(), PCT_P());  // 2.4

/* ── the two supply functions the diagrams are drawn from ──────────────────── */
/*
 * Derived from the two points above rather than asserted, so the curves and the arithmetic cannot
 * disagree: each line is fixed by (Q0, P0) and its own second point.
 */
const lineThrough = (qAtP1) => {
  const slope = (qAtP1 - Q0) / (P1 - P0);        // tiles per dollar
  return { slope, intercept: Q0 - slope * P0 };  // Qs = slope·P + intercept
};
export const SR = lineThrough(Q_SR);             // { slope: 30,  intercept: 160 }
export const LR = lineThrough(Q_LR);             // { slope: 120, intercept: -560 }
export const qAt = (line, p) => line.slope * p + line.intercept;
export const pAt = (line, q) => (q - line.intercept) / line.slope;

/* ── what shifts the curve (1c-1 … 1c-5) ───────────────────────────────────── */
/*
 * specGap-05, confirmed against the spec against its own hedging: 1c-3 is "indirect taxes (specific
 * and ad valorem)" and 1c-4 is "government subsidies", so BOTH belong to this topic as shift
 * factors. What stays out is the INCIDENCE — who ends up bearing the tax — which is 1.3.4 · 4b.
 *
 * A specific tax is a fixed sum per unit, so it raises the price a producer needs at EVERY quantity
 * by the same amount: the curve shifts vertically by exactly the tax. An ad valorem tax is a
 * percentage of price, so the gap grows as price rises: the curve PIVOTS rather than shifting
 * parallel. That difference is the whole reason the specification names both.
 */
export const SPECIFIC_TAX = 3;      // $ a unit
export const AD_VALOREM = 20;       // % of price
export const SUBSIDY = 2;           // $ a unit paid to the producer

/** The price a producer must receive from the buyer to supply q, after a specific tax. */
export const withSpecificTax = (line, q) => pAt(line, q) + SPECIFIC_TAX;
/** The same after an ad valorem tax: the producer must keep pAt(q), so the buyer pays it grossed up. */
export const withAdValorem = (line, q) => pAt(line, q) * (1 + AD_VALOREM / 100);
/** A subsidy is the mirror image of a specific tax: the producer needs less from the buyer. */
export const withSubsidy = (line, q) => pAt(line, q) - SUBSIDY;
/** The vertical gap an ad valorem tax opens at a given quantity — the number that makes it a pivot. */
export const adValoremGap = (line, q) => round2(withAdValorem(line, q) - pAt(line, q));

/* ── formatting ────────────────────────────────────────────────────────────── */
/** One money format for the whole section (packet 16's Layer 6 caught $108000 beside $108,000). */
export const money = (n) => (Number.isInteger(n) ? `$${n.toLocaleString('en-GB')}` : `$${n.toFixed(2)}`);
/** A percentage as a student would write it, with no trailing .0 on a whole number. */
export const pc = (n) => `${Number.isInteger(n) ? n : Number(n.toFixed(1))}%`;
/** A quantity of tiles, formatted once. */
export const qty = (n) => n.toLocaleString('en-GB');
/** A PES value: two decimals only where the second is not zero, never a bare integer. */
export const pesStr = (n) => (Number.isInteger(n) ? `${n}.0` : String(n));
export const round2 = (n) => Math.round(n * 100) / 100;

/*
 * One formatter per kind of figure, and one MINUS SIGN for the whole section (packet 18's rule: JS
 * prints a negative with an ASCII hyphen and a typed sentence carries U+2212, and the first draft of
 * packet 18 had 55 of one beside 13 of the other on one page). A fall in price or quantity is
 * written with U+2212 everywhere it appears.
 */
export const MINUS = '−';
export const signedPc = (n) => `${n < 0 ? MINUS : '+'}${pc(Math.abs(n))}`;

/** Words of teaching text in a subsection, exactly as lib/content-validator.mjs counts them. */
export function teachingWords(sec) {
  const normText = (s) => String(s ?? '').toLowerCase().replace(/\s+/g, ' ').trim();
  const words = (s) => normText(s).split(' ').filter(Boolean).length;
  const teaching = [sec?.keyIdea, ...(sec?.body || []).flatMap((b) => [b?.text, ...(b?.items || []), ...((b?.steps || []).map((s) => (typeof s === 'object' ? `${s.title} ${s.subtitle || ''}` : s))), b?.result]), sec?.realExample?.text, sec?.misconception, sec?.examMatters];
  return words(teaching.filter(Boolean).join(' '));
}
