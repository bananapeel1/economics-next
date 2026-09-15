/**
 * Packet 16 helpers: the id scheme scripts/mint-item-ids.mjs uses, so hand-authored items carry ids of
 * the same shape (`<section>:<kind>:<hash8(key)>`), the validator's own word counter, and Zuri Juice —
 * the one set of worked figures this section carries across its body, diagrams, notes and assessment.
 *
 * Zuri is fictional and so is every rival on its market map. Packet 14's Layer 6 found an overstated
 * figure inside a *cited* real example; packet 15's answer was to carry no figures at all. A Business
 * section cannot do that — market share and market growth are calculations the specification asks for
 * (Appendix 7, QS2) — so the figures are all invented, which leaves nothing to overstate, and the real
 * examples name real firms without a figure or a year.
 */
import { createHash } from 'node:crypto';

export const SECTION = 'meeting-customer-needs';

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export const hash8 = (s) => createHash('sha1').update(norm(s)).digest('hex').slice(0, 8);
export const id = (kind, key) => `${SECTION}:${kind}:${hash8(key)}`;
export const subId = (s) => `${SECTION}:sub:${s}`;

/**
 * Zuri Juice's numbers. Every one of these is derived here and used everywhere, so the body, the
 * diagrams, the notes and the assessment cannot drift apart (Layer 5). The runner re-derives each
 * result from its inputs and refuses to stage if a printed figure disagrees with its own arithmetic.
 */
export const MARKET_LAST = 32;        // $ million, chilled juice, last year
export const MARKET_NOW = 40;         // $ million, this year
export const ZURI_SALES = 6;          // $ million, Zuri's sales this year
export const INPUT_COST = 0.45;       // $ per bottle: fruit, bottle, label, cap
export const PRICE = 1.20;            // $ per bottle
export const SURVEY_N = 600;          // shoppers asked
export const SURVEY_YES = 0.18;       // share who would buy weekly at PRICE
export const POPULATION = 500000;     // shoppers in the target market

export const growthPct = () => ((MARKET_NOW - MARKET_LAST) / MARKET_LAST) * 100;   // 25
export const sharePct = () => (ZURI_SALES / MARKET_NOW) * 100;                     // 15
export const valueAdded = () => Math.round((PRICE - INPUT_COST) * 100) / 100;      // 0.75
export const likelyBuyers = () => POPULATION * SURVEY_YES;                         // 90,000
export const weeklyRevenue = () => likelyBuyers() * PRICE;                         // 108,000
export const annualRevenue = () => weeklyRevenue() * 52;                           // 5,616,000

/**
 * The market map. Price on the horizontal axis in dollars, juice content on the vertical in per cent.
 * The gap is a position, not a brand: high juice content at a middle price, which is where the survey
 * above quantifies demand. A gap that no research tests is an empty space, not an opportunity — the
 * misconception this section has carried since March, now with the arithmetic to settle it.
 */
export const BRANDS = [
  { name: 'Tamu', price: 0.70, juice: 15 },
  { name: 'Mkali', price: 0.85, juice: 35 },
  { name: 'Zuri', price: 1.20, juice: 45 },
  { name: 'Safi', price: 1.60, juice: 40 },
  { name: 'Halo', price: 1.90, juice: 85 },
];
export const GAP = { price: 1.20, juice: 80 };

/** Words of teaching text in a subsection, exactly as lib/content-validator.mjs counts them. */
export function teachingWords(sec) {
  const normText = (s) => String(s ?? '').toLowerCase().replace(/\s+/g, ' ').trim();
  const words = (s) => normText(s).split(' ').filter(Boolean).length;
  const teaching = [sec?.keyIdea, ...(sec?.body || []).flatMap((b) => [b?.text, ...(b?.items || []), ...((b?.steps || []).map((s) => (typeof s === 'object' ? `${s.title} ${s.subtitle || ''}` : s))), b?.result]), sec?.realExample?.text, sec?.misconception, sec?.examMatters];
  return words(teaching.filter(Boolean).join(' '));
}
