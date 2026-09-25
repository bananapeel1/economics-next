/**
 * Packet 22 helpers: the id scheme scripts/mint-item-ids.mjs uses, so hand-authored items carry ids
 * of the same shape (`<section>:<kind>:<hash8(key)>`), the validator's own word counter, and Zola —
 * the one firm this section carries across its body, diagrams, notes and assessment.
 *
 * WHY ONE FIRM. Business 1.3.3 asks for marketing objectives (1a), the product life cycle (1b), the
 * Boston Matrix (1c), the marketing mix (1d), strategies by market type (1e), customer loyalty (1f),
 * the design mix (2a-b), promotion and branding (3a-e), pricing strategies and the factors behind
 * them (4a-c) and distribution channels (5a-b). Three of those — the objectives, the benefits of a
 * strong brand, and the choice of a pricing strategy — are the SAME arithmetic seen from different
 * sides, so the section carries one firm and derives all three from it.
 *
 *      unbranded   Q = 160,000 − 5,000P          branded   Q = 120,000 − 3,000P
 *
 * Bottles a year, price in dollars, unit cost $8. BOTH LINES PASS THROUGH ($20, 60,000): building a
 * brand is drawn as a PIVOT about today's price, not a shift, so the section can say what a brand
 * changes (how much volume a price rise costs) without pretending it changes today's sales.
 *
 * THE PROPERTY THE WHOLE SECTION RESTS ON, re-used deliberately from packet 18. With the standard
 * percentage method — the change divided by the ORIGINAL value — PED on a straight line depends only
 * on the price you start from and not at all on where you finish:
 *
 *      unbranded  PED from P  =  −5,000P / (160,000 − 5,000P)  =  −P / (32 − P)
 *      branded    PED from P  =  −3,000P / (120,000 − 3,000P)  =  −P / (40 − P)
 *
 * So it is exactly −1.00 at $16 unbranded (which is also where revenue peaks), exactly −3.00 at $24,
 * and exactly −1.00 at $20 on the branded line. No worked value can be contradicted by a reader who
 * picks a different second price, and nothing needs rounding to be presented.
 *
 * Zola is fictional and, like packet 18's Maji, packet 17's Tafari and packet 16's Zuri, is
 * deliberately given no country. The March section put its examples in the UK and the US and attached
 * a $3 billion valuation to one of them with no date (accuracy-01); the named real examples here are
 * international and carry no year and no figure, so there is nothing to overstate. One currency:
 * dollars.
 */
import { createHash } from 'node:crypto';

export const SECTION = 'marketing-mix-strategy';

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export const hash8 = (s) => createHash('sha1').update(norm(s)).digest('hex').slice(0, 8);
export const id = (kind, key) => `${SECTION}:${kind}:${hash8(key)}`;
export const subId = (s) => `${SECTION}:sub:${s}`;

/* ── Zola ──────────────────────────────────────────────────────────────────── */

export const UNIT_COST = 8;            // what one bottle costs Zola to make
export const MARKET = 500000;          // bottles a year bought in the region, all makers together

export const U_INTERCEPT = 160000;     // unbranded: bottles a year at a price of zero
export const U_SLOPE = 5000;           // bottles lost per dollar of price
export const B_INTERCEPT = 120000;     // branded: flatter intercept, steeper line
export const B_SLOPE = 3000;

export const qU = (p) => U_INTERCEPT - U_SLOPE * p;
export const qB = (p) => B_INTERCEPT - B_SLOPE * p;

/** The price both lines are drawn through, and the price Zola charges today. */
export const TODAY_P = 20;
export const TODAY_Q = qU(TODAY_P);                       // 60,000, and qB(20) is the same

export const revU = (p) => p * qU(p);
export const revB = (p) => p * qB(p);
export const profitU = (p) => (p - UNIT_COST) * qU(p);
export const profitB = (p) => (p - UNIT_COST) * qB(p);
/** Market share as a percentage of every bottle bought in the region. */
export const shareU = (p) => Math.round((qU(p) / MARKET) * 1000) / 10;
export const shareB = (p) => Math.round((qB(p) / MARKET) * 1000) / 10;

/** The prices the section works with, low to high. */
export const PRICES = [12, 16, 20, 24];

/** Where each line reaches zero bottles, and where each maximises revenue and profit. */
export const U_CHOKE = U_INTERCEPT / U_SLOPE;             // 32
export const B_CHOKE = B_INTERCEPT / B_SLOPE;             // 40
export const U_REV_PEAK = U_INTERCEPT / (2 * U_SLOPE);    // 16
export const B_REV_PEAK = B_INTERCEPT / (2 * B_SLOPE);    // 20
export const U_PROFIT_PEAK = (UNIT_COST + U_CHOKE) / 2;   // 20
export const B_PROFIT_PEAK = (UNIT_COST + B_CHOKE) / 2;   // 24

/** PED at a price, by the percentage method, on each line. Exact at every price in PRICES. */
export const pedU = (p) => Math.round((-p / (U_CHOKE - p)) * 100) / 100;
export const pedB = (p) => Math.round((-p / (B_CHOKE - p)) * 100) / 100;

/** Added value on one bottle: what the buyer pays less what Zola bought in to make it. */
export const addedValue = (p) => p - UNIT_COST;

/* ── cost plus: the same $8, three mark-ups, the three prices already in the table ── */
export const MARKUPS = [50, 100, 150];
export const costPlus = (pct) => UNIT_COST * (1 + pct / 100);     // $12, $16, $20

/** Psychological pricing: the price just under the round one Zola charges today. */
export const PSYCH_P = TODAY_P - 0.01;                     // 19.99

/* ── the three channels, from the same unit cost ───────────────────────────── */
/*
 * Each channel is a chain of mark-ups on what the stage before it paid. The three-stage and
 * four-stage chains deliberately land the CONSUMER at the same $19.20, because the lesson is not
 * that a longer channel costs the shopper more — it is how little of that $19.20 reaches Zola.
 */
export const CHANNELS = [
  { stages: 4, name: 'four stage', path: 'producer to wholesaler to retailer to consumer',
    steps: [{ who: 'Zola', markup: 25 }, { who: 'the wholesaler', markup: 20 }, { who: 'the retailer', markup: 60 }] },
  { stages: 3, name: 'three stage', path: 'producer to retailer to consumer',
    steps: [{ who: 'Zola', markup: 50 }, { who: 'the retailer', markup: 60 }] },
  { stages: 2, name: 'two stage', path: 'producer to consumer',
    steps: [{ who: 'Zola', markup: 150 }] },
];

/** Every price along a channel, starting from the unit cost: [what Zola receives, …, shelf price]. */
export const chainOf = (ch) => ch.steps.reduce((acc, s) => [...acc, Math.round(acc[acc.length - 1] * (1 + s.markup / 100) * 100) / 100], [UNIT_COST]).slice(1);
/** What the consumer pays at the end of a channel. */
export const shelfOf = (ch) => chainOf(ch)[chainOf(ch).length - 1];
/** What Zola keeps on one bottle: the first price in the chain, less the unit cost. */
export const zolaKeeps = (ch) => Math.round((chainOf(ch)[0] - UNIT_COST) * 100) / 100;

/* ── formatting ────────────────────────────────────────────────────────────── */
/** One money format for the whole section (packet 16's Layer 6 caught $108000 beside $108,000). */
export const money = (n) => (Number.isInteger(n) ? `$${n.toLocaleString('en-GB')}` : `$${n.toFixed(2)}`);
/** Bottles, always with a thousands separator, so 60000 and 60,000 never sit on one page. */
export const units = (n) => n.toLocaleString('en-GB');
/*
 * ONE MINUS SIGN, packet 18's rule. JavaScript renders a negative with an ASCII hyphen and a typed
 * sentence carries U+2212, and this section prints elasticities beside typed prose in four places.
 */
export const minus = (s) => String(s).replace(/-/g, '−');
/** An elasticity as a student must write it: signed, never bare, always two decimals. */
export const el = (n) => minus(n.toFixed(2));
/** A percentage as the body prints it, sign kept. */
export const pc = (n) => (n > 0 ? `+${n}%` : `${minus(n)}%`);
/** A market share, which is never negative and always one decimal. */
export const share = (n) => `${n}%`;

/** Words of teaching text in a subsection, exactly as lib/content-validator.mjs counts them. */
export function teachingWords(sec) {
  const normText = (s) => String(s ?? '').toLowerCase().replace(/\s+/g, ' ').trim();
  const words = (s) => normText(s).split(' ').filter(Boolean).length;
  const teaching = [sec?.keyIdea, ...(sec?.body || []).flatMap((b) => [b?.text, ...(b?.items || []), ...((b?.steps || []).map((s) => (typeof s === 'object' ? `${s.title} ${s.subtitle || ''}` : s))), b?.result]), sec?.realExample?.text, sec?.misconception, sec?.examMatters];
  return words(teaching.filter(Boolean).join(' '));
}
