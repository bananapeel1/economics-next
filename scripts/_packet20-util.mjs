/**
 * Packet 20 helpers: the id scheme scripts/mint-item-ids.mjs uses, so hand-authored items carry ids
 * of the same shape (`<section>:<kind>:<hash8(key)>`), the validator's own word counter, and Imani
 * Ceramics — the one firm this section carries across its body, diagrams, notes and assessment.
 *
 * WHY ONE FIRM. 3.3.1 · 3a asks for three business objectives, 3c asks for the FORMULA for each, and
 * 3b asks what the divorce of ownership from control does to the choice between them. All three
 * objectives are points on one firm's revenue and cost functions, so the section uses one:
 *
 *      P = 60 − 2Q        MR = 60 − 4Q        MC = 20        TC = 20Q + 72
 *
 * Q in thousands of units a month, P in dollars a unit, every total in dollars. The three objectives
 * land on whole numbers — 10, 15 and 18 thousand units — and every figure the section prints is
 * derived here rather than asserted, with the runner re-deriving each one from its inputs and from
 * the emitted SVG before it will stage (packet 15's accuracy-01 rule, packet 17's Layer 5).
 *
 * WHY THE COST CURVES ARE DELIBERATELY SIMPLE. Marginal cost is constant and average cost falls
 * smoothly, so there is no U-shape, no minimum efficient scale and no economies of scale anywhere in
 * this section. That is a scope boundary, not a simplification for its own sake: the relationship
 * between long-run cost curves and economies/diseconomies of scale is 3.3.2 sub-topic 3
 * (econ_spec.txt:1320-1345) and belongs to packet 28. The March section spent two of its eight
 * subsections there (structure-04, topFix-03).
 *
 * Imani is fictional and, like packet 16's Zuri and packet 17's Tafari, is deliberately given no
 * country. Every figure attached to her is invented, which leaves nothing to overstate; the real
 * examples name real firms and products without a year or a number attached (Layer 4). One currency:
 * dollars.
 */
import { createHash } from 'node:crypto';

export const SECTION = 'types-sizes-businesses';

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export const hash8 = (s) => createHash('sha1').update(norm(s)).digest('hex').slice(0, 8);
export const id = (kind, key) => `${SECTION}:${kind}:${hash8(key)}`;
export const subId = (s) => `${SECTION}:sub:${s}`;

/* ── Imani Ceramics: one firm, three objectives ────────────────────────────── */

export const FIRM = 'Imani Ceramics';

export const A = 60;        // choke price, $ a unit
export const B = 2;         // dollars the price must fall per extra thousand units sold
export const MC = 20;       // marginal cost, $ a unit — constant, see the note above
export const FIXED = 72;    // fixed cost, $000 a month

/** Average revenue, which for a single-price firm IS the demand curve. */
export const arAt = (q) => A - B * q;
/** Marginal revenue: twice the slope of a linear demand curve. */
export const mrAt = (q) => A - 2 * B * q;
/** Total revenue, in $000. */
export const trAt = (q) => q * arAt(q);
/** Total cost, in $000. */
export const tcAt = (q) => MC * q + FIXED;
/** Average cost: marginal cost plus the fixed cost spread over the output. */
export const acAt = (q) => MC + FIXED / q;
/** Profit, in $000. */
export const profitAt = (q) => trAt(q) - tcAt(q);

/** MC = MR. The output where the last unit adds exactly what it costs. */
export const Q_PROFIT = (A - MC) / (2 * B);        // 10
/** MR = 0. The output past which another unit takes more off the price than it adds in sales. */
export const Q_REVENUE = A / (2 * B);              // 15
/**
 * AR = AC — the LARGER root of BQ² − (A − MC)Q + FIXED = 0, because sales volume maximisation is the
 * most a firm can sell while still covering all its costs. The smaller root is the other break-even
 * point, below which fixed costs are not covered.
 */
const disc = Math.sqrt((A - MC) ** 2 - 4 * B * FIXED);
export const Q_VOLUME = ((A - MC) + disc) / (2 * B);   // 18
export const Q_BREAKEVEN_LOW = ((A - MC) - disc) / (2 * B);   // 2

/** The three objectives in the order the specification lists them (3a-1, 3a-2, 3a-3). */
export const OBJECTIVES = [
  { key: 'profit', name: 'Profit maximisation', formula: 'MC = MR', q: Q_PROFIT },
  { key: 'revenue', name: 'Revenue maximisation', formula: 'MR = 0', q: Q_REVENUE },
  { key: 'volume', name: 'Sales volume maximisation', formula: 'AR = AC', q: Q_VOLUME },
];

/* ── formatting ────────────────────────────────────────────────────────────── */
/*
 * Q is in THOUSANDS of units, so a quantity is printed at its true size and a total at its true size.
 * One money format for the whole section: packet 16's Layer 6 caught $108000 beside $108,000.
 */
const comma = (n) => Math.round(n).toLocaleString('en-GB');
/** A price per unit: $40. */
export const price = (n) => (Number.isInteger(n) ? `$${comma(n)}` : `$${n.toFixed(2)}`);
/** A total stated in $000 internally, printed at full size: 400 → $400,000. */
export const total = (n) => `$${comma(n * 1000)}`;
/** An output stated in thousands internally, printed at full size: 10 → 10,000 units. */
export const units = (q) => `${comma(q * 1000)} units`;

/** Words of teaching text in a subsection, exactly as lib/content-validator.mjs counts them. */
export function teachingWords(sec) {
  const normText = (s) => String(s ?? '').toLowerCase().replace(/\s+/g, ' ').trim();
  const words = (s) => normText(s).split(' ').filter(Boolean).length;
  const teaching = [sec?.keyIdea, ...(sec?.body || []).flatMap((b) => [b?.text, ...(b?.items || []), ...((b?.steps || []).map((s) => (typeof s === 'object' ? `${s.title} ${s.subtitle || ''}` : s))), b?.result]), sec?.realExample?.text, sec?.misconception, sec?.examMatters];
  return words(teaching.filter(Boolean).join(' '));
}

/* ── two firms the measures of size rank differently (2a) ──────────────────── */
/*
 * Invented figures, like everything else attached to a named-but-fictional business, so there is
 * nothing to overstate. Their only job is to make one point that prose cannot: employees and capital
 * employed put the SAME two firms in the OPPOSITE order, which is why an answer has to name the
 * measure it is using.
 */
export const SIZE_FIRMS = [
  { name: 'Refinery', employees: 400, capital: 900 },
  { name: 'Cleaning contractor', employees: 4000, capital: 30 },
];
/** True where the two measures disagree about which firm is larger — asserted by the runner. */
export const measuresDisagree = () => {
  const [a, b] = SIZE_FIRMS;
  return (a.employees > b.employees) !== (a.capital > b.capital);
};
