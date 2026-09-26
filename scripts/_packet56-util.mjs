/**
 * PACKET 56 — global-industries-mncs helpers: the id scheme, the formatters, the specification's own
 * lists, and the ONE MNC every figure in the section is read off.
 *
 * IAL Business 4.3.4 "Global industries and companies (multinational corporations)", Unit 4 (WBS14),
 * `audit/raw/bus_spec.txt:1453-1487`. Three items — 1 The impact of MNCs (a local, b national) ·
 * 2 International business ethics (a-d) · 3 Controlling MNCs (a, seven bullets) — and **25 leaves**
 * (30 rows in `audit/raw/spec-items.json`; 1a, 1b, 2b, 2c, 2d and 3a are `requirement` parents).
 *
 * ════ RULE 1 · WHAT THE LEDGER ASKED FOR THAT THE SPECIFICATION DOES NOT CONTAIN ═══════════════
 *
 *   - **Transfer pricing is not in bus_spec.txt at all** (0 hits; it is an Economics bullet,
 *     econ_spec.txt:1617 and :1883). The live section spent two of its four subsections on it. Here it
 *     is taught ONCE, inside 1b "tax revenues", as the way an MNC's tax bill in a host country can be
 *     cut — which is what topFix-02 asks ("merge… into one") and topFix-03's fill-in drills.
 *   - **BEPS / "Pillar Two" is not in either specification**, and "implemented from 2024" is a dated
 *     claim about a real body (CONTENT-GATE Layer 4). topFix-02's last step is met by an undated,
 *     generic statement — governments agreeing a minimum rate of tax on large MNCs' profits — taught
 *     under 3a "legal control", where international cooperation belongs.
 *   - **Economics framing** (structure-08): "current account", "multiplier", "resource curse" and a
 *     "global economy" 20-marker are banned; balance of payments is taught as money into and out of
 *     the country from the business's own flows.
 *   - **Real firms and named disasters** (topFix-01's Rana Plaza / DRC cobalt, topFix-05's Amazon
 *     Luxembourg / Shell-NNPC, specGap-02's Nestlé): Layer 4 — "uncorroborated means deleted, not
 *     flagged… a generic, true example always beats a specific, invented one". Every case below is an
 *     invented MNC or a general, checkable pattern; the named cases are banned and the quiz items that
 *     tested them are retired (quiz-01, quiz-02).
 *
 * ════ THE SPINE · one sportswear MNC, and every figure derived ════════════════════════════════
 *
 *   LOCAL (1a)     FDI of $120m builds a shoe factory in Kestria; 4,000 jobs at $300 a month against a
 *                  local factory average of $240 (a 25% premium); $18m a year bought from local firms.
 *   NATIONAL (1b)  exports $200m a year; imports $80m of components; sends $30m of profit home: a net
 *                  $90m a year into Kestria from these three flows, on top of the one-off $120m.
 *   TAX (1b)       a pair costs $20 to make; unrelated firms trade similar pairs at $30 (arm's length);
 *                  the factory sells to its own trading arm in Vessia (tax 5%) at $22. Kestria (tax 25%)
 *                  taxes $2 of profit a pair, not $10: on 5m pairs it collects $2.5m, not $12.5m —
 *                  $10m a year lost; Vessia collects $2m; the group keeps $8m.
 *   ETHICS (2)     40 supplier factories, children found at 3; cleaner equipment would cost $6m.
 *   DECISION       a second factory, $80m and 2,500 jobs; Kestria weighs a five-year tax holiday.
 *
 * Money: one symbol, `$`. Korvane, Kestria and Vessia are invented, so every claim about them is true
 * by construction; no real firm, no year, no UK frame.
 */
import { createHash } from 'node:crypto';

export const SECTION = 'global-industries-mncs';

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

/** Money. The ONLY currency symbol this section emits. */
export const usd = (n) => `${n < 0 ? MINUS : ''}$${plain(Math.abs(n))}`;
/** Money in millions: $1.2m. */
export const usdm = (n) => `${n < 0 ? MINUS : ''}$${(round2(Math.abs(n) / 1e6)).toLocaleString('en-GB', { maximumFractionDigits: 2 })}m`;
/** A count of things. */
export const units = (n, noun) => `${plain(n)}${noun ? ` ${noun}` : ''}`;
/** A percentage. */
export const pct = (n) => `${plain(round2(n))}%`;

/* ══ THE MNC ════════════════════════════════════════════════════════════════ */

export const FIRM = (() => {
  const name = 'Korvane';
  const trading = 'Korvane Trading';
  const host = 'Kestria';              // invented: a lower-income host country
  const lowTax = 'Vessia';             // invented: a low-tax country
  const homeRegion = 'Europe';

  /* 1a · local */
  const fdi = 120_000_000;             // typed
  const workers = 4_000;               // typed
  const wage = 300;                    // typed: a month
  const localWage = 240;               // typed: local factory average, a month
  const premiumPct = ((wage - localWage) / localWage) * 100;   // 25
  const localPurchases = 18_000_000;   // typed: a year

  /* 1b · balance of payments */
  const exportsYr = 200_000_000;       // typed
  const importsYr = 80_000_000;        // typed
  const profitsHome = 30_000_000;      // typed
  const netFlow = exportsYr - importsYr - profitsHome;         // 90,000,000

  /* 1b · tax revenues and transfer pricing */
  const taxHost = 25;                  // typed, %
  const taxLow = 5;                    // typed, %
  const costPair = 20;                 // typed
  const armsLength = 30;               // typed
  const transferPrice = 22;            // typed
  const pairs = 5_000_000;             // typed, a year
  const profitHostPair = transferPrice - costPair;             // 2
  const profitArmsPair = armsLength - costPair;                // 10
  const shiftedPair = armsLength - transferPrice;              // 8
  const hostTaxActual = (taxHost / 100) * profitHostPair * pairs;   // 2,500,000
  const hostTaxArms = (taxHost / 100) * profitArmsPair * pairs;     // 12,500,000
  const hostTaxLost = hostTaxArms - hostTaxActual;                  // 10,000,000
  const lowTaxPaid = (taxLow / 100) * shiftedPair * pairs;          // 2,000,000
  const groupSaving = hostTaxLost - lowTaxPaid;                     // 8,000,000

  /* 2 · ethics */
  const suppliers = 40;                // typed
  const childSuppliers = 3;            // typed
  const cleanKit = 6_000_000;          // typed
  const recycledPct = 10;              // typed: share of recycled material in the "eco" range

  /* the decision */
  const secondPlant = 80_000_000;      // typed
  const secondJobs = 2_500;            // typed
  const holidayYears = 5;              // typed

  return {
    name, trading, host, lowTax, homeRegion,
    fdi, workers, wage, localWage, premiumPct, localPurchases,
    exportsYr, importsYr, profitsHome, netFlow,
    taxHost, taxLow, costPair, armsLength, transferPrice, pairs,
    profitHostPair, profitArmsPair, shiftedPair, hostTaxActual, hostTaxArms, hostTaxLost, lowTaxPaid, groupSaving,
    suppliers, childSuppliers, cleanKit, recycledPct,
    secondPlant, secondJobs, holidayYears,
  };
})();

/* ══ The specification's own words (`:1457-1487`) ═══════════════════════════ */

export const CONTROL_BULLETS = ['power of MNC', 'political influence', 'legal control', 'consumer pressure', 'pressure groups', 'social media', 'self-regulation'];
export const NATIONAL_BULLETS = ['economic growth', 'FDI flows', 'balance of payments', 'technology and skills transfer', 'consumers', 'business culture', 'tax revenues'];

/*
 * BANNED. Each entry cites why; the runner A/Bs every ban both ways and re-measures the document.
 */
export const BANNED = [
  [/\bcurrent account\b|\bmultiplier\b|\bresource curse\b|\bglobal economy\b/i, 'Economics framing in a Business section (structure-08) — current account, multiplier, resource curse, "global economy"'],
  [/\bRana Plaza\b|\bNestl|\bAmazon\b|\bLuxembourg\b|\bShell\b|\bNNPC\b|\bcobalt\b|\bDRC\b|\bCongo\b/i, 'a named real case the programme cannot corroborate (Layer 4: uncorroborated means deleted) — quiz-01, topFix-01, topFix-05, specGap-02'],
  [/\bBEPS\b|\bPillar Two\b|\bOECD\b/i, 'BEPS / Pillar Two / OECD — in neither specification, and a dated claim about a real body (topFix-02, topFix-05; Layer 4)'],
  [/net loser|in extreme cases, repatriated/i, 'the repatriation fallacy — repatriated profit exceeding the investment does not make the host a net loser (accuracy-01, topFix-05)'],
  [/\bOutline\b|\bExamine\b|\bDefine\b[^()]{0,200}\(\s*4\s*marks?\s*\)|\bAnalyse\b[^()]{0,200}\(\s*6\s*marks?\s*\)/, 'command words and tariffs this paper does not set: Outline is not IAL, Examine is Economics, Define is 2 marks, and the Unit 4 source set is 4/4/8/12/12 (topFix-04)'],
];

/* The vocabulary a subsection teaches with; every subsection must use at least one. */
export const TEACHING_TERMS = [
  'multinational', 'mnc', 'subsidiary', 'foreign direct investment', 'fdi', 'host country', 'local labour', 'wages',
  'working conditions', 'job creation', 'local businesses', 'supplier', 'community', 'environment', 'economic growth',
  'balance of payments', 'technology', 'skills', 'business culture', 'consumers', 'tax', 'transfer pric',
  'stakeholder', 'emissions', 'waste disposal', 'sustainab', 'supply chain', 'child labour', 'exploitation',
  'labelling', 'marketing', 'power', 'political influence', 'legal control', 'consumer pressure', 'pressure group',
  'social media', 'self-regulation',
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
