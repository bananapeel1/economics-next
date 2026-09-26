/**
 * PACKET 55 — global-marketing helpers: the id scheme, the formatters, the specification's own
 * lists, and the ONE FIRM every figure in the section is read off.
 *
 * IAL Business 4.3.3 "Global marketing", Unit 4 (WBS14), `audit/raw/bus_spec.txt:1424-1446`. Three
 * items — 1 Marketing (a-d) · 2 Niche markets (a-c) · 3 Cultural/social factors (a, four bullets) —
 * and **13 leaves** (15 rows in `audit/raw/spec-items.json`; 1b and 3a are `requirement` parents).
 *
 * ════ RULE 1 · THE LEDGER'S NUMBERING IS ONE DIGIT SHORT, AND IT LANDS ON REAL TOPICS ══
 *
 * `specGap-01..03` cite "4.3.1 (b)/(d)/(e)" and `specGap-04/05` cite "4.3.2 (b)/(c)". In this
 * document 4.3.1 is Globalisation (`:1323`) and 4.3.2 is Global markets and business expansion
 * (`:1372`, packet 47). Every one of those ids was read by its WORDING against `:1424-1446`:
 *
 *     specGap-01  "different marketing approaches"      → 4.3.3 · 1b
 *     specGap-02  Ansoff applied to global marketing     → 4.3.3 · 1d
 *     specGap-03  Porter's matrix applied, "(e)"         → 4.3.3 · 1d. There is no 1e: item 1 stops
 *                                                          at d, and 1d names Ansoff AND Porter.
 *     specGap-04  features of global niche markets       → 4.3.3 · 2b
 *     specGap-05  4Ps adapted to suit global niches      → 4.3.3 · 2c
 *     specGap-06  "4.3.3 (g)" social media               → NO SUCH LEAF. Item 3 has one lettered
 *                                                          line, 3a, with four bullets. Social media
 *                                                          is a 1.3.x promotion bullet (`:530`,
 *                                                          `:632`, `:635`) and an MNC-control bullet
 *                                                          at 4.3.4 (`:1486`). Wont-fix.
 *     specGap-07  "4.3.3 (c)-(f)"                        → 4.3.3 · 3a's four bullets.
 *     structure-05 "4.3.1 Marketing, 4.3.2 Niche..."     → the items are unnumbered 1/2/3 INSIDE
 *                                                          4.3.3; the app's 4.3.3 is right and is
 *                                                          asserted by the runner, not changed.
 *
 * ════ WHAT THIS SECTION MAY NOT TEACH ═══════════════════════════════════════
 *
 *     Hofstede and his dimensions       0 hits in bus_spec.txt (specGap-08, accuracy-01)
 *     high-context / low-context        Edward Hall; 0 hits (accuracy-01's non-sequitur)
 *     "stuck in the middle"             not in the spec; the live flashcard taught it as Porter's
 *
 * Ansoff's matrix and Porter's Strategic Matrix ARE taught here, because 4.3.3 · 1d is "application
 * of Ansoff's matrix and Porter's matrix to global marketing decisions" (`:1435`), and
 * `audit/SPEC-OWNERSHIP.md:29` names this section as the owner of that application. Their general
 * theory is 3.3.1 · 2a (`:1098-1099`, `business-objectives-strategy`): this section APPLIES the
 * cells to global decisions and uses the same cell names as that section (market penetration,
 * market development, product development, diversification; cost leadership, differentiation,
 * cost focus, differentiation focus), rather than re-deriving them.
 *
 * Packet 47's boundary (`global-markets-expansion`, 4.3.2, published 26 Sep): its notes carry one
 * pointer, "Selling an existing product in a new country is what Ansoff's matrix calls market
 * development — a Unit 3 tool (3.3.1), applied to global marketing decisions in 4.3.3." This section
 * is that pointer's target. Its taught material — the five market factors, the nine location factors,
 * the ten merger reasons, exchange rates, Porter's FIVE FORCES — is not repeated here.
 *
 * ════ THE SPINE · one skincare firm, and every figure derived ═══════════════
 *
 *   GLOBAL STRATEGY (1a)  one campaign made once for six countries costs $1.2m; six campaigns each
 *                         made for one country cost $450,000 each, $2.7m. Standardising saves $1.5m.
 *   4Ps (1c)              a 200 ml bottle at $18 is $0.09 a ml; a 25 ml pack at $3 is $0.12 a ml.
 *                         The small pack is a PRODUCT change (size) that makes the PRICE of one
 *                         purchase affordable — a third more per ml, a sixth of the outlay.
 *   NICHE (2b, 2c)        halal-certified, alcohol-free serum. Buyers in five countries: 40,000,
 *                         25,000, 60,000, 15,000, 20,000 = 160,000. Three bottles a year at $30,
 *                         against $20 for a mass-market serum (a 50% premium): $14.4m a year.
 *
 * Money: one symbol, `$`, for the firm's home currency (Singapore is a dollar economy). The target
 * market, Zarand, and its language are invented, so every cultural claim about it is true by
 * construction; no real firm, no year, no UK frame.
 */
import { createHash } from 'node:crypto';

export const SECTION = 'global-marketing';

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export const hash8 = (s) => createHash('sha1').update(norm(s)).digest('hex').slice(0, 8);
export const id = (kind, key) => `${SECTION}:${kind}:${hash8(key)}`;
export const subId = (s) => `${SECTION}:sub:${s}`;

export const round2 = (n) => Math.round(n * 100) / 100;

/* ── formatting: one formatter a kind of figure (packet 18) ────────────────── */
export const MINUS = '−';
const plain = (n) => (Number.isInteger(n)
  ? n.toLocaleString('en-GB')
  : round2(n).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));

/** Money in the firm's home currency. The ONLY currency symbol this section emits. */
export const usd = (n) => `${n < 0 ? MINUS : ''}$${plain(Math.abs(n))}`;
/** Money in millions: $1.2m. */
export const usdm = (n) => `${n < 0 ? MINUS : ''}$${(round2(Math.abs(n) / 1e6)).toLocaleString('en-GB', { maximumFractionDigits: 2 })}m`;
/** A count of things. */
export const units = (n, noun) => `${plain(n)}${noun ? ` ${noun}` : ''}`;
/** A percentage. */
export const pct = (n) => `${plain(round2(n))}%`;

/* ══ THE FIRM ═══════════════════════════════════════════════════════════════ */

export const FIRM = (() => {
  const name = 'Serana';
  const home = 'Singapore';
  const homeAdj = 'Singaporean';
  const market = 'Zarand';            // invented: a hot, dry, mostly Muslim market with its own language

  /* 1a · one global campaign against one campaign per country */
  const countries = 6;                 // typed
  const globalCampaign = 1_200_000;    // typed
  const localCampaign = 450_000;       // typed: one country's own campaign
  const globalPerCountry = globalCampaign / countries;          // 200,000
  const localTotal = localCampaign * countries;                 // 2,700,000
  const campaignSaving = localTotal - globalCampaign;           // 1,500,000

  /* 1c · pack size (product) and price per purchase (price) */
  const bottleMl = 200;                // typed
  const bottlePrice = 18;              // typed
  const packMl = 25;                   // typed
  const packPrice = 3;                 // typed
  const perMlBottle = bottlePrice / bottleMl;                   // 0.09
  const perMlPack = packPrice / packMl;                         // 0.12

  /* 2b, 2c · the global niche */
  const nicheCountries = [40_000, 25_000, 60_000, 15_000, 20_000];   // typed
  const nicheBuyers = nicheCountries.reduce((a, b) => a + b, 0);    // 160,000
  const bottlesEach = 3;               // typed: a year
  const nichePrice = 30;               // typed
  const massPrice = 20;                // typed
  const premiumPct = ((nichePrice - massPrice) / massPrice) * 100;  // 50
  const nicheBottles = nicheBuyers * bottlesEach;                   // 480,000
  const nicheRevenue = nicheBottles * nichePrice;                   // 14,400,000
  const largestShare = (Math.max(...nicheCountries) / nicheBuyers) * 100;   // 37.5

  return {
    name, home, homeAdj, market,
    countries, globalCampaign, localCampaign, globalPerCountry, localTotal, campaignSaving,
    bottleMl, bottlePrice, packMl, packPrice, perMlBottle, perMlPack,
    nicheCountries, nicheBuyers, bottlesEach, nichePrice, massPrice, premiumPct, nicheBottles, nicheRevenue, largestShare,
  };
})();

/* ══ The specification's own words, in its own order (`:1428-1446`) ═════════ */

export const APPROACHES = ['domestic/ethnocentric', 'mixed/geocentric', 'international/polycentric'];
export const CULTURAL_BULLETS = ['cultural differences', 'different tastes and preferences', 'language and unintended meanings', 'inappropriate branding and promotion'];

/*
 * BANNED, BECAUSE THE SPECIFICATION DOES NOT CONTAIN IT. Each entry cites the measurement that
 * settles it; the runner re-measures the document and A/Bs every ban both ways.
 */
export const BANNED = [
  [/\bHofstede\b|\bpower distance\b|\buncertainty avoidance\b|\bmasculinity\b|\bindividualism\b/i, 'Hofstede and his dimensions — 0 hits in bus_spec.txt (specGap-08, topFix-02, structure-04)'],
  [/\bhigh[- ]context\b|\blow[- ]context\b|\bEdward Hall\b/i, 'Hall\'s high/low context — 0 hits in bus_spec.txt; the live realExample leaned on it (accuracy-01)'],
  [/\bstuck in the middle\b/i, '"stuck in the middle" — not in the specification; the live flashcard taught it as Porter\'s'],
  [/\bChevrolet\b|\bNova\b|\bKFC\b|eat your fingers/i, 'the live section\'s unverifiable anecdotes — the Nova myth and the KFC slogan (topFix-02, accuracy-01, structure-07; CONTENT-GATE Layer 4)'],
  [/\bOutline\b|\bAnalyse\b[^()]{0,200}\(\s*\d+\s*marks?\s*\)|\bExamine\b|\bDefine\b[^()]{0,200}\(\s*4\s*marks?\s*\)/, 'command words and tariffs this paper does not set: Outline is not IAL, Examine is Economics, Define is 2 marks, and the Unit 4 source set is 4/4/8/12/12 (topFix-05)'],
];

/* The vocabulary a subsection teaches with; every subsection must use at least one. */
export const TEACHING_TERMS = [
  'global marketing strategy', 'glocalisation', 'standardis', 'adapt', 'ethnocentric', 'polycentric',
  'geocentric', 'marketing mix', 'product', 'price', 'place', 'promotion', 'ansoff', 'market development',
  'product development', 'diversification', 'market penetration', 'porter', 'cost leadership',
  'differentiation', 'focus', 'niche', 'cultural diversity', 'values', 'interests', 'cultural difference',
  'tastes and preferences', 'language', 'unintended meaning', 'branding', 'inappropriate',
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
