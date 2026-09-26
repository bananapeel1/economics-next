/**
 * PACKET 49 — business-growth helpers: the id scheme, the formatters, the bans and pointers, and the
 * ONE FIRM every figure is read off.
 *
 * IAL Business 3.3.2 "Business growth", Unit 3 (WBS13), `audit/raw/bus_spec.txt:1117-1142` (next
 * heading, 3.3.3, at `:1146`). Four sub-topics — 1 Growth (1a-1b) · 2 Organic growth (2a-2b) ·
 * 3 Inorganic growth (3a-3b) · 4 Problems arising from growth (4a-4c) — and **16 leaves** (18 rows in
 * `audit/raw/spec-items.json`; 1a and 3a are `requirement` parents). The runner asserts the count.
 *
 * ════ RULE 1 · THE LEDGER'S NUMBERING IS UK GCE ═══════════════════════════════════════
 *
 * Six of the twenty-seven open ids cite `3.2.1`-`3.2.4` or `3.1.3`. In `bus_spec.txt` the business
 * heading `3.3.2 Business growth` sits at `:1117`, and neither `3.2.<n>` nor `3.1.3` occurs anywhere
 * in the file (the runner re-measures this). Every claim was read by its WORDING at `:1117-1142`.
 *
 * ════ WHAT THE LIVE SECTION TAUGHT THAT 3.3.2 DOES NOT CONTAIN ══════════════════════════
 *
 *   - **Demergers** (accuracy-01/02, specGap-06, topFix-02). "demerg" is 0 hits in `bus_spec.txt`; the
 *     topic is Economics 3.3.1 · 2g, owned by `types-sizes-businesses` (`audit/SPEC-OWNERSHIP.md:21`),
 *     and the duplicate subsection here was removed on 14 Sep by packet 13. The t=0 snapshot of the live
 *     row (`2026-09-26-pre-packet-49__…`) carries 0 hits. Banned, so it cannot return.
 *   - **Reasons for staying small** (specGap-05; the whole of the live "Growth Decisions" block).
 *     "staying small" is 0 hits in `bus_spec.txt`; the only "small business" wording is 2.3.5 · 3b,
 *     "Ways for a small business to compete in a competitive market" (`:1032`), owned by
 *     `external-influences`. So the live subsection goes, and the section may POINT at 2.3.5 at most
 *     once (`POINTER_ONLY`). specGap-05 asked to GROW that subsection; it is wont-fix here.
 *   - **Ansoff's Matrix** (practice-01): in the spec, but at 3.3.1 · 2a (`:1098`), owned by
 *     `business-objectives-strategy`. **Barriers to entry** (practice-02): 0 hits (only "Barriers to
 *     entrepreneurship", 1.3.5 · 1d, `:768`). Both banned; their practice items are replaced.
 *   - **The CMA / "MegaRetail" / "southern England"** (topFix-05): a UK frame. The takeover process is
 *     taught with "the competition authority", which is what every IAL centre's country has.
 *
 * ════ VOCABULARY CALLS (DECISIONS: "teach the mechanism in the spec's words") ═══════════
 *
 *   - "vertical integration" is the spec's term; **backward** and **forward** are its two directions,
 *     taught as the meaning of the spec term, not in place of it, so they are assessed.
 *   - The five internal economies (purchasing, technical, managerial, financial, marketing) are the
 *     content of the spec's "economies of scale (internal and external)"; taught and assessed.
 *   - **"synergy"** is 0 hits in the spec and names nothing the spec's "reasons for mergers and
 *     takeovers" does not already say as "cost savings from combining". It is an ASIDE: named once in
 *     teaching text, never on an assessed surface. The runner counts it.
 *   - **Franchising** is 2.3.1 · 4b (`:872`), a form of business owned by `planning-raising-finance`.
 *     specGap-04 asks for it as a way to grow; it is named once as a method with a pointer to 2.3.1,
 *     never assessed here.
 *
 * ════ THE SPINE · one Singapore bakery-café chain, every figure derived ═════════════════
 *
 *   NOW          Tanjong Bakes: 40 cafés, 900 staff, sales S$60m, profit S$6m, 8% of the market.
 *   ORGANIC (2)  Open 15 more cafés at S$0.4m each = S$6m, from retained profit, over two years.
 *   SCALE (1a)   A new central bakery oven line: 20,000 loaves a day at S$0.80 → 50,000 at S$0.62,
 *                a 22.5% fall. (The Calculate item's figures; printed only on the source.)
 *   TAKEOVER (3) Golden Crust, a rival with 30 cafés and 6% of the market: price S$36m, net assets
 *                S$20m (premium S$16m), profit S$3m a year, cost savings S$1.5m a year; S$24m borrowed
 *                at 6% = S$1.44m interest a year.
 *   OVERTRADING  Supermarkets buying frozen dough pay after 60 days; flour is paid for within 30.
 *
 * Money: one currency, the Singapore dollar, written `S$`. No year, no real company.
 */
import { createHash } from 'node:crypto';

export const SECTION = 'business-growth';

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export const hash8 = (s) => createHash('sha1').update(norm(s)).digest('hex').slice(0, 8);
export const id = (kind, key) => `${SECTION}:${kind}:${hash8(key)}`;
export const subId = (s) => `${SECTION}:sub:${s}`;

export const round2 = (n) => Math.round(n * 100) / 100;

/* ── formatting: one formatter a kind of figure (packet 18) ────────────────── */
export const MINUS = '−';
const plain = (n) => (Number.isInteger(n)
  ? n.toLocaleString('en-GB')
  : round2(n).toLocaleString('en-GB', { minimumFractionDigits: 1, maximumFractionDigits: 2 }));

/** Singapore dollars, the ONLY currency this section emits: S$400,000. */
export const sgd = (n) => `${n < 0 ? MINUS : ''}S$${plain(Math.abs(n))}`;
/** Dollars and cents, for a unit cost: S$0.62. */
export const cents = (n) => `${n < 0 ? MINUS : ''}S$${Math.abs(n).toFixed(2)}`;
/** Millions: S$1.44m. */
export const sgdm = (n) => `${n < 0 ? MINUS : ''}S$${(round2(Math.abs(n) / 1e6)).toLocaleString('en-GB', { maximumFractionDigits: 2 })}m`;
/** A count. */
export const units = (n, noun) => `${plain(n)}${noun ? ` ${noun}` : ''}`;
/** A percentage. */
export const pct = (n) => `${plain(round2(n))}%`;

/* ══ THE FIRM ═══════════════════════════════════════════════════════════════ */

export const FIRM = (() => {
  const name = 'Tanjong Bakes';
  const home = 'Singapore';
  const cafes = 40;                    // typed
  const staff = 900;                   // typed
  const sales = 60_000_000;            // typed: yearly sales revenue
  const profit = 6_000_000;            // typed: yearly profit
  const share = 8;                     // typed: % of Singapore's bakery-café market

  /* 2 · organic plan */
  const newCafes = 15;                 // typed
  const fitOut = 400_000;              // typed: cost to open one café
  const organicCost = newCafes * fitOut;                      // 6m
  const cafesAfterOrganic = cafes + newCafes;                 // 55

  /* 1a · the central bakery (the Calculate item: printed on the source only) */
  const loavesNow = 20_000;            // typed: a day
  const loavesAfter = 50_000;          // typed: a day
  const unitCostNow = 0.80;            // typed
  const unitCostAfter = 0.62;          // typed
  const unitCostFallPct = ((unitCostNow - unitCostAfter) / unitCostNow) * 100;   // 22.5

  /* 3 · the takeover of Golden Crust */
  const rival = 'Golden Crust';
  const rivalCafes = 30;               // typed
  const rivalShare = 6;                // typed: %
  const price = 36_000_000;            // typed
  const netAssets = 20_000_000;        // typed
  const premium = price - netAssets;                          // 16m
  const rivalProfit = 3_000_000;       // typed: a year
  const savings = 1_500_000;           // typed: yearly cost savings from combining
  const borrowed = 24_000_000;         // typed
  const rate = 6;                      // typed: % a year
  const interest = borrowed * (rate / 100);                   // 1.44m
  const yearlyGain = rivalProfit + savings - interest;        // 3.06m
  const cafesAfterTakeover = cafes + rivalCafes;              // 70
  const shareAfter = share + rivalShare;                      // 14
  const returnOnPricePct = ((rivalProfit + savings) / price) * 100;   // 12.5

  /* 3 · the flour mill (backward vertical) */
  const mill = 'Straits Flour Mill';
  const flourBill = 4_000_000;         // typed: a year

  /* 4 · problems */
  const staffAfter = 1_500;            // typed: after the takeover
  const layersNow = 3;                 // typed: management layers
  const layersAfter = 5;               // typed
  const customerDays = 60;             // typed: supermarkets pay after
  const supplierDays = 30;             // typed: flour paid within

  return {
    name, home, cafes, staff, sales, profit, share, newCafes, fitOut, organicCost, cafesAfterOrganic,
    loavesNow, loavesAfter, unitCostNow, unitCostAfter, unitCostFallPct,
    rival, rivalCafes, rivalShare, price, netAssets, premium, rivalProfit, savings, borrowed, rate, interest,
    yearlyGain, cafesAfterTakeover, shareAfter, returnOnPricePct, mill, flourBill,
    staffAfter, layersNow, layersAfter, customerDays, supplierDays,
  };
})();

/* ══ The specification's own words (`bus_spec.txt:1121-1142`) ═════════════════ */

export const INTERNAL_ECONOMIES = ['purchasing', 'technical', 'managerial', 'financial', 'marketing'];

/*
 * BANNED OUTRIGHT: the off-specification topics the live section and the ledger carry. Each ban rests on
 * a measurement of bus_spec.txt that the runner re-takes, and each is A/B'd both ways.
 */
export const BANNED = [
  [/\bdemerg\w*/i, 'demergers — 0 hits in bus_spec.txt; Economics 3.3.1 · 2g, owned by types-sizes-businesses (accuracy-01/02, specGap-06)'],
  [/\beBay\b|\bSkype\b|\bMicrosoft\b|\bDisney\b|21st Century Fox/, 'a named real firm from the live section (the eBay/Skype stake sale was mislabelled a demerger, accuracy-01; Disney/Fox was a dated quiz item)'],
  [/\bAnsoff\b/i, 'Ansoff\'s Matrix — 3.3.1 · 2a, owned by business-objectives-strategy (practice-01)'],
  [/\bbarriers? to entry\b/i, 'barriers to entry — 0 hits in bus_spec.txt (practice-02)'],
  [/\bstay(?:ing|s)? small\b|\breasons? for staying\b/i, 'reasons for staying small — 0 hits in bus_spec.txt; the spec\'s small-business leaf is 2.3.5 · 3b (specGap-05)'],
  [/\bCMA\b|Competition and Markets Authority|MegaRetail|southern England/, 'a UK frame from the live practice set (topFix-05)'],
  [/\bOutline\b|\bExamine\b|\bDefine\b[^()]{0,200}\(\s*4\s*marks?\s*\)|\bAnalyse\b[^()]{0,200}\(\s*6\s*marks?\s*\)|\(\s*10\s*marks?\s*\)/, 'command words or tariffs the Units 3-4 paper does not set: Outline is not IAL, Examine is Economics, Define is 2, the source set has no Analyse 6, and Assess is 12 in Units 3/4'],
];

/*
 * POINTERS: allowed only as a reference to the owning section, carrying its topic number in the same
 * string, and never on an assessed surface.
 */
export const POINTER_ONLY = [
  { re: /\bsmall business/i, cite: '2.3.5', max: 1, why: 'how a small business competes — 2.3.5 · 3b (external-influences)' },
  { re: /\bfranchis\w*/i, cite: '2.3.1', max: 1, why: 'franchising — 2.3.1 · 4b (planning-raising-finance)' },
];

/* THE ASIDES: at most `max` mentions, all in teaching text, none on an assessed surface. */
export const ASIDES = [
  { re: /\bsynerg\w*/i, why: 'synergy — 0 hits in bus_spec.txt; the spec says "reasons for mergers and takeovers"', max: 1 },
];

/* The vocabulary a subsection teaches with; every subsection must use at least one. */
export const TEACHING_TERMS = [
  'growth', 'economies of scale', 'diseconomies', 'market power', 'market share', 'brand', 'profit',
  'organic', 'inorganic', 'merger', 'takeover', 'integration', 'conglomerate', 'risk', 'communication',
  'overtrading', 'cash',
];

/** The word budget, counted the way `lib/content-validator.mjs` counts it (packet 44). */
export function teachingWords(sec) {
  const normText = (s) => String(s ?? '').toLowerCase().replace(/\s+/g, ' ').trim();
  const words = (s) => normText(s).split(' ').filter(Boolean).length;
  const teaching = [sec?.keyIdea, ...(sec?.body || []).flatMap((b) => [b?.text, ...(b?.items || []), ...((b?.steps || []).map((x) => (typeof x === 'object' ? `${x.title} ${x.subtitle || ''}` : x))), b?.result]), sec?.realExample?.text, sec?.misconception, sec?.examMatters];
  return words(teaching.filter(Boolean).join(' '));
}

/** The terms a subsection actually teaches with. */
export function teachingVocabulary(sec) {
  const hay = [sec.title, sec.keyIdea, ...(sec.body || []).flatMap((b) => [b.text, ...(b.items || []), ...(b.steps || []).map((x) => (typeof x === 'object' ? `${x.title} ${x.subtitle || ''}` : x))])].join(' ').toLowerCase();
  return TEACHING_TERMS.filter((t) => hay.includes(t));
}
