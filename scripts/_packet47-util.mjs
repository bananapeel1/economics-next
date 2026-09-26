/**
 * PACKET 47 — global-markets-expansion helpers: the id scheme, the formatters, the specification's
 * own lists, and the ONE FIRM every figure in the section is read off.
 *
 * IAL Business 4.3.2, Unit 4 (WBS14), `audit/raw/bus_spec.txt:1372-1410`. Five sub-topics —
 * 1 Conditions that prompt trade · 2 Assessment of a country as a market · 3 Assessment of a
 * country as a production location · 4 Reasons for global mergers, takeovers or joint ventures ·
 * 5 Global expansion and uncertainty — and **33 leaves** (37 rows in `audit/raw/spec-items.json`,
 * four of which are the `requirement` parents 1a, 1b, 2a and 3a).
 *
 * ════ RULE 1 · THE LEDGER'S NUMBERING IS UK GCE AND IT DOES NOT EXIST HERE ══
 *
 * Twenty-one of the thirty-three open ids cite `4.2.1`-`4.2.5` as though those were this section's
 * sub-topics. In `bus_spec.txt` the heading `4.3.2 Global markets and business expansion` sits at
 * `:1372`; `4.2` is "Assessment information" (`:1304`) and no `4.2.1`-`4.2.5` exists in the file
 * at all (`grep -c "4\.2\.[0-9]"` returns 0). Every claim was therefore read by its
 * WORDING at `:1372-1410`. The runner asserts the headings by line rather than trusting this note.
 *
 *     `structure-06` is INVERTED: it says '4.3.2' is wrong and the topic is "4.2". The heading at
 *     `:1372` settles it the other way (4.2 is the Unit 4 assessment page); the id is wont-fix.
 *
 *     `specGap-08` ("cost competitiveness and differentiation") is not a 4.3.2 bullet as worded.
 *     Porter's Strategic Matrix — cost leadership and differentiation as GENERIC STRATEGIES — is
 *     `3.3.1 · 2a` (`:1098-1099`). What 4.3.2 does say is "cost competitiveness" (1c) and
 *     "international competitiveness" (5b). So the item's substance is built at 5b as price and
 *     non-price competitiveness, the vocabulary of the leaf, and the strategic matrix is not taught.
 *
 * ════ WHAT THIS SECTION MAY NOT TEACH, AND WHAT IT MAY ONLY POINT AT ═════════
 *
 * The live section taught entry modes (exporting, licensing, franchising, JV-as-entry-mode, FDI),
 * Ansoff's matrix, PESTLE and the Bartlett-Ghoshal typology. Measured in `bus_spec.txt`:
 *
 *     Bartlett / Ghoshal / transnational / multi-domestic   0 hits anywhere
 *     licensing                                               0 hits ("licens" appears nowhere)
 *     franchising                                             1 hit, 2.3.1 · 2b (`:872`), business types
 *     Ansoff's Matrix                                         3.3.1 · 2a (`:1098`); its GLOBAL use is 4.3.3 · 1d (`:1435`)
 *     Porter's Strategic Matrix                               3.3.1 · 2a (`:1099`)
 *     PESTLE                                                  3.3.1 · 4a (`:1106`)
 *     FDI                                                     4.3.1 · 2c (`:1342`)
 *
 * So Bartlett-Ghoshal and the entry-mode ladder are banned outright, and the Unit 3 tools and the
 * two neighbouring 4.3.x topics may each be POINTED AT a counted number of times, with the topic
 * number in the same sentence, so a pointer can never read as teaching.
 *
 * ════ THE SPINE · one appliance maker, and every figure derived ════════════
 *
 *   PUSH (1a)          home sales flat at 400,000 rice cookers a year for three years — saturated.
 *   PULL (1b)          fixed costs $4.8m, variable $26: average cost $38 at 400,000 and $34 at
 *                      600,000, so exporting 200,000 lowers the cost of every unit (economies of
 *                      scale). Profit $4.8m → $9.2m. A 20% home downturn cuts total sales by
 *                      13.33% instead of 20% once a third of sales are abroad (risk spreading).
 *   OFF-SHORING (1c)   assembly labour $12 a unit at home against $5 abroad plus $1.50 freight.
 *   MARKET (2a)        Tarsia: disposable income $9,000 a household, growing 1% a year.
 *                      Belmar: $4,000, growing 7% a year. Ten years on: $9,942 against $7,869.
 *   LOCATION (3a)      Site in the trade bloc: labour $6 + other $10 + freight $1 = $17 landed.
 *                      Site outside it: labour $4 + other $10 = $14, + 10% tariff $1.40 + freight
 *                      $2 = $17.40. Cheaper labour, dearer cooker. ROI: $3m a year on $20m = 15%;
 *                      a $5m grant takes the outlay to $15m and the return to 20%.
 *   EXCHANGE (5a)      $1 = 4 units of Belmar's currency, then 5: a 25% appreciation. A $50
 *                      cooker goes from 200 to 250 units abroad, or earns $40 if held at 200 units.
 *                      A component invoiced at 60 units falls from $15 to $12.
 *
 * Money: one symbol, `$`, for the firm's home currency. The other currency is written in "units",
 * packet 41's convention, so `locale.currency` sees one currency. No year, no real company, no UK
 * frame; the firm, both markets and both sites are invented, and the runner refuses a named real
 * firm from the live section.
 */
import { createHash } from 'node:crypto';

export const SECTION = 'global-markets-expansion';

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export const hash8 = (s) => createHash('sha1').update(norm(s)).digest('hex').slice(0, 8);
export const id = (kind, key) => `${SECTION}:${kind}:${hash8(key)}`;
export const subId = (s) => `${SECTION}:sub:${s}`;

export const round2 = (n) => Math.round(n * 100) / 100;
export const round0 = (n) => Math.round(n);

/* ── formatting: one formatter a kind of figure (packet 18) ────────────────── */
export const MINUS = '−';
const plain = (n) => (Number.isInteger(n)
  ? n.toLocaleString('en-GB')
  : round2(n).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));

/** Money in the firm's home currency. The ONLY currency symbol this section emits. */
export const usd = (n) => `${n < 0 ? MINUS : ''}$${plain(Math.abs(n))}`;
/** Money in millions: $4.8m. */
export const usdm = (n) => `${n < 0 ? MINUS : ''}$${(round2(Math.abs(n) / 1e6)).toLocaleString('en-GB', { maximumFractionDigits: 2 })}m`;
/** A count of things. */
export const units = (n, noun) => `${plain(n)}${noun ? ` ${noun}` : ''}`;
/** A sum in the foreign currency, which has no symbol. */
export const fxu = (n) => `${plain(n)} units`;
/** An exchange rate. */
export const rate = (n) => `$1 = ${plain(n)} units`;
/** A percentage. */
export const pct = (n) => `${plain(round2(n))}%`;
/** A bare number. */
export const num = (n) => plain(round2(n));

/* ══ THE FIRM ═══════════════════════════════════════════════════════════════ */

export const FIRM = (() => {
  const name = 'Lumora';
  const product = 'rice cooker';
  const products = 'rice cookers';
  const home = 'Singapore';            // a dollar economy, so "the dollar" is the firm's own currency
  const homeAdj = 'Singaporean';

  /* 1a · push: a saturated home market */
  const homeSales = 400_000;            // typed: flat for three years
  const price = 50;                     // typed: home price
  /* 1b · pull: economies of scale and profit */
  const fixed = 4_800_000;              // typed
  const variable = 26;                  // typed
  const avg = (q) => variable + fixed / q;
  const exportSales = 200_000;          // typed: the export plan
  const exportPrice = 48;               // typed: net of freight
  const totalSales = homeSales + exportSales;                 // 600,000
  const avgHome = avg(homeSales);                             // 38
  const avgTotal = avg(totalSales);                           // 34
  const profitHome = homeSales * price - (fixed + homeSales * variable);                                // 4.8m
  const profitTotal = homeSales * price + exportSales * exportPrice - (fixed + totalSales * variable);  // 9.2m
  /* 1b · pull: risk spreading */
  const downturn = 20;                  // typed: % fall in home sales
  const homeAfter = homeSales * (1 - downturn / 100);          // 320,000
  const spreadFallPct = ((totalSales - (homeAfter + exportSales)) / totalSales) * 100;  // 13.33
  /* 1c · off-shoring */
  const labourHome = 12;                // typed
  const labourAbroad = 5;               // typed
  const freightAssembly = 1.5;          // typed
  const offshoreSaving = labourHome - labourAbroad - freightAssembly;   // 5.5

  /* 2a · two markets */
  const tarsia = { name: 'Tarsia', income: 9_000, growth: 1 };
  const belmar = { name: 'Belmar', income: 4_000, growth: 7 };
  const years = 10;
  const grow = (c) => round0(c.income * (1 + c.growth / 100) ** years);
  const tarsia10 = grow(tarsia);        // 9,942
  const belmar10 = grow(belmar);        // 7,869

  /* 3a · two production sites */
  const siteIn = { labour: 6, other: 10, freight: 1, tariffPct: 0 };
  const siteOut = { labour: 4, other: 10, freight: 2, tariffPct: 10 };
  const landed = (s) => round2((s.labour + s.other) * (1 + s.tariffPct / 100) + s.freight);
  const landedIn = landed(siteIn);      // 17
  const landedOut = landed(siteOut);    // 17.4
  const tariffOut = round2(((siteOut.labour + siteOut.other) * siteOut.tariffPct) / 100);  // 1.4
  const outlay = 20_000_000;            // typed
  const annualReturn = 3_000_000;       // typed
  const grant = 5_000_000;              // typed
  const roi = (annualReturn / outlay) * 100;                  // 15
  const roiGrant = (annualReturn / (outlay - grant)) * 100;   // 20

  /* 5a · exchange rates */
  const e0 = 4;                         // typed: $1 = 4 units
  const e1 = 5;                         // typed: $1 = 5 units
  const appreciationPct = ((e1 - e0) / e0) * 100;             // 25
  const foreignPrice0 = price * e0;     // 200 units
  const foreignPrice1 = price * e1;     // 250 units
  const heldReceipt = foreignPrice0 / e1;                      // $40
  const componentUnits = 60;            // typed: invoiced in units
  const componentCost0 = componentUnits / e0;                  // $15
  const componentCost1 = componentUnits / e1;                  // $12
  const subsidiaryProfitUnits = 8_000_000;                     // typed
  const repatriated0 = subsidiaryProfitUnits / e0;             // $2m
  const repatriated1 = subsidiaryProfitUnits / e1;             // $1.6m

  /* 5b · skill shortages */
  const techWage0 = 2_000;              // typed: a technician's monthly pay
  const techWageRise = 20;              // typed: % rise when technicians are scarce
  const techWage1 = techWage0 * (1 + techWageRise / 100);     // 2,400

  return {
    name, product, products, home, homeAdj,
    homeSales, price, fixed, variable, avg, exportSales, exportPrice, totalSales, avgHome, avgTotal,
    profitHome, profitTotal, downturn, homeAfter, spreadFallPct,
    labourHome, labourAbroad, freightAssembly, offshoreSaving,
    tarsia, belmar, years, tarsia10, belmar10,
    siteIn, siteOut, landedIn, landedOut, tariffOut, outlay, annualReturn, grant, roi, roiGrant,
    e0, e1, appreciationPct, foreignPrice0, foreignPrice1, heldReceipt,
    componentUnits, componentCost0, componentCost1, subsidiaryProfitUnits, repatriated0, repatriated1,
    techWage0, techWageRise, techWage1,
  };
})();

/* ══ The specification's own lists, in its own order and words ═════════════ */

/** 2 · a (`:1384-1389`). */
export const MARKET_FACTORS = [
  'levels and growth of disposable income', 'ease of doing business', 'infrastructure',
  'political stability', 'exchange rates',
];
/** 3 · a (`:1392-1401`). */
export const LOCATION_FACTORS = [
  'costs of production', 'skills and availability of labour force', 'infrastructure',
  'location in trade bloc', 'government incentives', 'ease of doing business',
  'political stability', 'natural resources', 'likely return on investment',
];
/** 4 · a-j (`:1403-1410`). */
export const MERGER_REASONS = [
  'spreading risk and economies of scale', 'entering new markets/trade blocs',
  'acquiring national/international brand names/patents', 'securing resources/supplies',
  'maintaining/increasing global competitiveness', 'reducing competition',
  'making use of local knowledge', 'government or legal requirement',
  'accessing supply chains/distribution networks', 'sharing costs/risks',
];

/*
 * BANNED, BECAUSE THE SPECIFICATION DOES NOT CONTAIN IT OR ANOTHER TOPIC OWNS IT. Each entry cites
 * the measurement that settles it; the runner A/Bs every one both ways.
 */
export const BANNED_ELSEWHERE = [
  [/\bBartlett\b|\bGhoshal\b|\btransnational\b|\bmulti-?domestic\b/i, 'Bartlett-Ghoshal — 0 hits in bus_spec.txt; AQA material (accuracy-01, topFix-02)'],
  [/\blicens(?:e|ing|or|ee)\b|\bfranchis\w*/i, 'the entry-mode ladder — "licens" is 0 hits and franchising is 2.3.1 · 2b (a business type), not a 4.3.2 method (structure-01, structure-07, structure-09)'],
  [/\bgeneric strateg\w*|\bcost leadership\b|\bPorter['’]s (?:strategic )?matrix\b/i, 'Porter\'s Strategic Matrix — 3.3.1 · 2a (bus_spec.txt:1099). The live 20-marker told students to apply it (practice-02, topFix-04)'],
  [/\bOutline\b|\bAnalyse\b[^()]{0,200}\(\s*\d+\s*marks?\s*\)|\bExamine\b/, 'command words this paper does not set: Outline is not IAL, Examine is Economics, and the Unit 4 source set is 4/4/8/12/12 with no 6-mark Analyse (practice-01)'],
  [/\bentry (?:method|mode)s?\b|\bmethods? of entry\b|\bmarket entry\b/i, 'the live section\'s organising idea, entry methods — not a 4.3.2 bullet (structure-01, structure-05)'],
];

/*
 * THE NEIGHBOURS THAT MAY BE POINTED AT AND MAY NOT BE TAUGHT. `max` mentions, each carrying its
 * topic number in the same string.
 */
export const POINTER_ONLY = [
  { re: /\bAnsoff\b/i, why: 'Ansoff\'s matrix is 3.3.1 · 2a, and its global use is 4.3.3 · 1d (topFix-02)', max: 1, mustCite: /3\.3\.1|4\.3\.3/ },
  { re: /\bPESTLE\b/i, why: 'PESTLE is 3.3.1 · 4a (topFix-02)', max: 1, mustCite: /3\.3\.1/ },
  { re: /\bforeign direct investment\b|\bFDI\b/i, why: 'FDI is 4.3.1 · 2c (bus_spec.txt:1342)', max: 1, mustCite: /4\.3\.1/ },
];

/* The vocabulary a subsection teaches with; every subsection must use at least one. */
export const TEACHING_TERMS = [
  'push factor', 'pull factor', 'saturated', 'competition', 'sales', 'profitability', 'risk',
  'economies of scale', 'off-shoring', 'outsourcing', 'cost competitiveness', 'product life cycle',
  'disposable income', 'ease of doing business', 'infrastructure', 'political stability',
  'exchange rate', 'five forces', 'costs of production', 'labour force', 'trade bloc',
  'government incentives', 'natural resources', 'return on investment', 'merger', 'takeover',
  'joint venture', 'brand', 'patent', 'supplies', 'competitiveness', 'local knowledge',
  'legal requirement', 'distribution network', 'supply chain', 'appreciat', 'depreciat',
  'skill shortage',
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
