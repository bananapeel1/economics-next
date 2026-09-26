/**
 * PACKET 46 — growth-development helpers: the id scheme, the formatters, the specification's own
 * lists, and the ONE ECONOMY every figure in the section is read off.
 *
 * IAL Economics 4.3.6, Unit 4 (WEC14), `audit/raw/econ_spec.txt:1899-1968`. Three sub-topics —
 * Measures of economic development · Constraints on growth and development · Measures to promote
 * growth and development — and **43 substantive leaves** under 50 oracle rows
 * (`audit/raw/spec-items.json`, topic "4.3.6": 43 `leaf` rows and seven `requirement` rows — 1c,
 * 2a, 2b, 3a, 3b, 3c, 3d — which only group the bullets beneath them).
 *
 * ════ WHAT THE LEDGER ASKED FOR THAT THE SPECIFICATION DOES NOT CONTAIN ═════
 *
 * Measured, not remembered — the runner re-greps each of these over the whole document and fails
 * if any is found after all:
 *
 *   - "Fairtrade" (topFix-02, specGap-05): 0 hits. The one "fair trade" in the document is an
 *     Extended Project dissertation title (`:2615`), nothing to do with 4.3.6. NOT added.
 *   - "Dutch disease" (topFix-03): 0 hits. The live bank tested it twice (Q4, Q11); the bank is
 *     rebuilt without it. Resource dependence is taught under the spec's own words — volatility of
 *     commodity prices and primary product dependency (2a-1, 2a-2).
 *   - sustainability, the Environmental Kuznets Curve, green growth (topFix-04, accuracy-02,
 *     specGap-07): 0 hits for any of them anywhere in the Economics specification, any unit. The
 *     live Block 3 is removed and its step reused for the constraints (2a-6..10, 2b) that were
 *     Notes-only. Environmental cost survives only as one evaluation card, pointed at 2.3.5, where
 *     "environmental costs" of growth IS a leaf (`:1117`).
 *   - MPI, IHDI (specGap-01): 0 hits. 1c lists its own six indicators and those are taught.
 *     The Gini coefficient IS in the specification — at 4.3.4 · 2b (`:1805`), poverty-inequality —
 *     so it is pointed at, not taught.
 *   - "property rights" (specGap-02): 1 hit, at 1.3.5 (`:811`), not 4.3.6. Weak enforcement of
 *     contracts is taught inside "poor governance" (2b-2), which is the leaf that owns it here.
 *
 * `specGap-06`'s parenthetical says "the app's spec map puts IMF/World Bank in 4.3.5". 4.3.5
 * (`:1824-1893`) names neither; 4.3.6 · 3d (`:1965-1968`) is the only place the specification names
 * the World Bank, the IMF and NGOs, and they are taught here.
 *
 * ════ THE SPINE · one economy, Karanda ════════════════════════════════════
 *
 * Every figure the section prints is computed here and re-derived by the runner, so a figure that
 * is typed rather than derived fails the build:
 *
 *     HDI      = geometric mean of three dimension indices (health, education, income)   (1a)
 *     g        = s / k   (Harrod-Domar: growth = savings ratio ÷ capital-output ratio)     (2a-3)
 *     a price fall's effect on export earnings = the good's share × the fall             (2a-1)
 *     terms of trade = export price index ÷ import price index × 100                      (2a-2)
 *     dependency ratio = (under-15 + over-64) ÷ working-age × 100                          (2a-6)
 *
 * Money is in US dollars, billions for the economy and per kilogram for coffee. One minus sign,
 * U+2212, emitted by `money` itself (packet 18). No year appears anywhere: accuracy-01 was a dated
 * assertion (the Paris Agreement) and this programme cannot check one.
 */
import { createHash } from 'node:crypto';

export const SECTION = 'growth-development';

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export const hash8 = (s) => createHash('sha1').update(norm(s)).digest('hex').slice(0, 8);
export const id = (kind, key) => `${SECTION}:${kind}:${hash8(key)}`;
export const subId = (s) => `${SECTION}:sub:${s}`;

export const round3 = (n) => Math.round(n * 1000) / 1000;
export const round2 = (n) => Math.round(n * 100) / 100;
export const round1 = (n) => Math.round(n * 10) / 10;
export const round0 = (n) => Math.round(n);

/* ── formatting: one formatter a kind of figure (packet 18) ────────────────── */

export const MINUS = '−';
const abs = (n) => Math.abs(n);
/** A money amount in dollars. Integers print plain; anything else to two decimals. */
export const money = (n) => `${n < 0 ? MINUS : ''}$${Number.isInteger(abs(n)) ? abs(n).toLocaleString('en-GB') : abs(round2(n)).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
/** Billions of dollars. One decimal when needed. */
export const bn = (n) => `$${Number.isInteger(round1(n)) ? round1(n) : round1(n).toFixed(1)}bn`;
/** Millions of people, or thousands of tonnes, as a bare number. */
export const mn = (n) => `${round1(n)} million`;
export const pct = (n) => `${Number.isInteger(round2(n)) ? round2(n) : round1(n)}%`;
/** An index between 0 and 1, to three places — how the HDI and its dimension indices are published. */
export const ix = (n) => round3(n).toFixed(3);

/* ══ THE ECONOMY ══════════════════════════════════════════════════════════ */

export const ECON = (() => {
  const country = 'Karanda';          // no real country, no year
  const what = 'a lower-middle-income economy of 40 million people whose exports are mostly copper and coffee';
  const population = 40;              // million
  const gdp = 60;                     // $bn a year

  /* ── 1a · the HDI, by the method the UNDP publishes ─────────────────────── */
  /* health: life expectancy at birth, scaled between goalposts of 20 and 85 years */
  const lifeExp = 72, leMin = 20, leMax = 85;
  const healthIx = (lifeExp - leMin) / (leMax - leMin);                        // 0.8
  /* education: mean years of schooling (adults 25+) over 15, expected years (a child starting school) over 18, averaged */
  const meanYears = 6, meanMax = 15, expYears = 14.4, expMax = 18;
  const meanIx = meanYears / meanMax;                                          // 0.4
  const expIx = expYears / expMax;                                             // 0.8
  const eduIx = (meanIx + expIx) / 2;                                          // 0.6
  /* income: GNI per head at purchasing power parity, on a log scale between $100 and $75,000 */
  const gniPc = 5000, gniMin = 100, gniMax = 75000;
  const incomeIx = (Math.log(gniPc) - Math.log(gniMin)) / (Math.log(gniMax) - Math.log(gniMin));   // 0.591
  const hdi = Math.cbrt(healthIx * eduIx * incomeIx);                         // 0.657
  /* the practice Calculate uses its own life expectancy, so the key is not printed on the check-in */
  const lifeExpQ = 66;
  const healthIxQ = (lifeExpQ - leMin) / (leMax - leMin);                      // 0.708

  /* ── 2a-1 · commodity price volatility: share × fall ─────────────────────── */
  const exports = 12;                 // $bn of export earnings a year
  const copperShare = 0.6;            // share of export earnings from copper
  const copperFall = 25;              // % fall in the world copper price
  const exportFallPct = copperShare * copperFall;                              // 15%
  const exportFallBn = round1(exports * exportFallPct / 100);                  // $1.8bn

  /* ── 2a-2 · Prebisch-Singer: the terms of trade move against the primary exporter ── */
  const exportPriceIx = 90, importPriceIx = 120;
  const tot = round0((exportPriceIx / importPriceIx) * 100);                   // 75

  /* ── 2a-3 · Harrod-Domar: g = s / k ──────────────────────────────────────── */
  const s = 12;                       // % of GDP saved
  const k = 4;                        // capital-output ratio: $4 of capital per $1 of output a year
  const g = s / k;                    // 3% growth
  const popGrowth = 2.5;              // % a year
  const perHead = round1(g - popGrowth);                                       // ≈ 0.5% a year per head
  const gTarget = 6;
  const sNeeded = gTarget * k;                                                  // 24%
  const savingsGap = sNeeded - s;                                              // 12 points of GDP
  const savingsGapBn = round1(gdp * savingsGap / 100);                         // $7.2bn

  /* ── 2a-4 · the foreign currency gap ────────────────────────────────────── */
  const importNeeds = 14;             // $bn of imports the growth plan needs: machinery, fuel, medicines
  const fxGap = importNeeds - exports;                                         // $2bn

  /* ── 2a-5 · capital flight: savings that leave instead of being invested ── */
  const flightPct = 2;                // % of GDP leaving each year
  const flightBn = round1(gdp * flightPct / 100);                             // $1.2bn
  const flightGrowthLost = flightPct / k;                                      // 0.5 points of growth

  /* ── 2a-6 · demography: the dependency ratio ────────────────────────────── */
  const under15 = 42, working = 54, over64 = 4;                                 // % of population
  const dependency = round0(((under15 + over64) / working) * 100);             // 85 dependants per 100
  const agedUnder15 = 15, agedWorking = 63, agedOver64 = 22;                   // an ageing high-income economy
  const agedDependency = round0(((agedUnder15 + agedOver64) / agedWorking) * 100);   // 59

  /* ── 2a-7 · overseas debt service ───────────────────────────────────────── */
  const debtService = 1.8;            // $bn a year of interest and repayment on overseas debt
  const debtServiceShare = round0((debtService / exports) * 100);              // 15% of export earnings

  /* ── 3a-2 · FDI adds to investment: g = (s + fdi) / k ────────────────────── */
  const fdi = 6;                      // % of GDP a year
  const gWithFdi = (s + fdi) / k;                                              // 4.5%

  /* ── 3b-6 · a coffee buffer stock: demand P = a − Q/b, supply fixed by the harvest ── */
  /* Q in thousand tonnes, P in $ per kg. Demand: P = 4 − Q/200. */
  const dA = 4, dB = 200;
  const priceAt = (q) => round2(dA - q / dB);
  const qAt = (p) => round0((dA - p) * dB);
  const floor = 2.0, ceiling = 2.4;
  const qNormal = 400;                                                          // price 2.00, inside the band
  const qGood = 480;                                                            // a bumper harvest
  const pGood = priceAt(qGood);                                                 // 1.60 without the scheme
  const buyGood = qGood - qAt(floor);                                           // 80 thousand tonnes bought
  const qPoor = 300;                                                            // a poor harvest
  const pPoor = priceAt(qPoor);                                                 // 2.50 without the scheme
  const sellPoor = qAt(ceiling) - qPoor;                                        // 20 thousand tonnes sold

  /* ── 3c-4 · debt relief frees export earnings ───────────────────────────── */
  const debtShareAfter = 5;           // % of export earnings after relief
  const reliefFreed = round1(exports * (debtServiceShare - debtShareAfter) / 100);   // $1.2bn

  /* ── 3c-5 · aid invested: g = (s + aid) / k ─────────────────────────────── */
  const aid = 2;                      // % of GDP
  const gWithAid = (s + aid) / k;                                              // 3.5%

  /* ── 3c-1 · the Lewis model: a constant modern-sector wage until surplus labour runs out ── */
  const subsistence = 2;              // $ a day in the traditional sector
  const modernWage = 3;               // $ a day: enough above subsistence to draw workers to the towns
  const lewisJobs = [2, 3, 4];        // million employed in the modern sector as profits are reinvested
  const turningPoint = 5;             // million: surplus labour exhausted, wages start to rise

  return {
    country, what, population, gdp,
    lifeExp, leMin, leMax, healthIx, meanYears, meanMax, expYears, expMax, meanIx, expIx, eduIx,
    gniPc, gniMin, gniMax, incomeIx, hdi, lifeExpQ, healthIxQ,
    exports, copperShare, copperFall, exportFallPct, exportFallBn,
    exportPriceIx, importPriceIx, tot,
    s, k, g, popGrowth, perHead, gTarget, sNeeded, savingsGap, savingsGapBn,
    importNeeds, fxGap,
    flightPct, flightBn, flightGrowthLost,
    under15, working, over64, dependency, agedUnder15, agedWorking, agedOver64, agedDependency,
    debtService, debtServiceShare,
    fdi, gWithFdi,
    dA, dB, priceAt, qAt, floor, ceiling, qNormal, qGood, pGood, buyGood, qPoor, pPoor, sellPoor,
    debtShareAfter, reliefFreed,
    aid, gWithAid,
    subsistence, modernWage, lewisJobs, turningPoint,
  };
})();

/* ══ The specification's own lists, in its own words ══════════════════════ */

/** 1c (`:1909-1915`): the six other measures of development. */
export const OTHER_MEASURES = [
  'the percentage of adult male labour in agriculture', 'access to clean water', 'energy consumption per capita',
  'access to internet per thousand of population', 'access to mobile phones per thousand of population',
  'access to doctors per thousand of population',
];
/** 3a-3d (`:1945-1968`): the strategies and institutions, in the specification's own order. */
export const MARKET_STRATEGIES = ['trade liberalisation', 'promotion of FDI', 'removal of government subsidies', 'privatisation', 'floating exchange rate systems', 'microfinance schemes'];
export const INTERVENTIONIST_STRATEGIES = ['development of human capital', 'protectionism', 'managed exchange rates', 'infrastructure development', 'promoting joint ventures with TNCs', 'buffer stock schemes'];
export const OTHER_STRATEGIES = ['industrialisation (the Lewis structural dual-sector model)', 'development of tourism', 'development of primary industries', 'debt relief', 'aid'];
export const INSTITUTIONS = ['the World Bank', 'the International Monetary Fund (IMF)', 'non-government organisations (NGOs)'];

/*
 * BANNED, BECAUSE THE SPECIFICATION DOES NOT CONTAIN IT OR BECAUSE ANOTHER TOPIC OWNS IT. Each
 * entry says why. The runner A/Bs every one against a string it must catch and one it must not.
 */
export const BANNED_ELSEWHERE = [
  [/\bFair\s?trade\b/i, '"Fairtrade" — 0 hits in econ_spec.txt; the only "fair trade" is an Extended Project title (:2615). topFix-02 and specGap-05 asked for it; refused on the document'],
  [/\bDutch disease\b/i, '"Dutch disease" — 0 hits in econ_spec.txt. topFix-03 called it a spec item; it is not. The live bank tested it twice (Q4, Q11)'],
  [/\bsustainab\w*|\bgreen growth\b|\bKuznets\b|\bParis Agreement\b|\bnatural capital\b/i, 'sustainability, green growth, the Environmental Kuznets Curve, the Paris Agreement — 0 hits in the whole Economics specification (topFix-04, accuracy-01, accuracy-02, specGap-07). The live Block 3 is removed'],
  [/\bMPI\b|\bmultidimensional poverty\b|\bIHDI\b|\binequality-adjusted\b/i, 'MPI and IHDI — 0 hits in econ_spec.txt (specGap-01 named them). 1c lists its own six indicators'],
  [/\bstructural adjustment\b|\bSAPs?\b|\bWashington Consensus\b/i, '"structural adjustment" and "Washington Consensus" — 0 hits in econ_spec.txt. The IMF is taught by what the spec names: its role (3d-2)'],
  [/\bMarshall-Lerner\b|\bJ-curve\b|\bpurchasing power parity theory\b/i, 'exchange-rate mechanics — 4.3.3 · 2f and 2c (econ_spec.txt:1733-1745), balance-payments-exchange-rates'],
  [/\bAssess\b|\bOutline\b/, 'command words IAL Economics does not have. Appendix 6 (econ_spec.txt:2696-2745): Define 2, Calculate 2 or 4, Draw 4, Explain 4, Analyse 6, Examine 8, Discuss 14, Evaluate 20. The live set carried "Assess (10)" and "Outline (4)"'],
];

/*
 * THE NEIGHBOURS THAT MAY BE POINTED AT AND MAY NOT BE TAUGHT. Each carries the number of mentions
 * it is allowed; every mention must name the topic number, so a pointer can never read as teaching.
 */
export const POINTER_ONLY = [
  { re: /\bGini\b|\bLorenz\b|\babsolute poverty\b|\brelative poverty\b/i, why: 'poverty and inequality measures are 4.3.4 (econ_spec.txt:1788-1822), poverty-inequality', max: 2, mustCite: /4\.3\.4/ },
  { re: /\btariffs?\b|\bquotas?\b|\bdumping\b/i, why: 'the types of trade restriction and how a tariff works are 4.3.2 · 5 (econ_spec.txt:1683-1706), trade-global-economy', max: 3, mustCite: /4\.3\.2/ },
  { re: /\bfixed exchange rates?\b|\brevaluation\b|\bdevaluation\b/i, why: 'fixed, managed and floating systems as such, and revaluation/devaluation, are 4.3.3 · 2 (econ_spec.txt:1720-1727), balance-payments-exchange-rates', max: 2, mustCite: /4\.3\.3/ },
  { re: /\bcalculat\w* the terms of trade\b|\bterms of trade (?:is|are) calculated\b/i, why: 'calculating the terms of trade is 4.3.2 · 3a (econ_spec.txt:1646), trade-global-economy', max: 1, mustCite: /4\.3\.2/ },
];

/*
 * TEACHING TERMS: the vocabulary the answer-recoverable check works over, and the check that every
 * subsection teaches with at least one of them.
 */
export const TEACHING_TERMS = [
  'development', 'growth', 'hdi', 'human development index', 'life expectancy', 'schooling', 'income',
  'living standards', 'indicator', 'commodity', 'primary product', 'terms of trade', 'prebisch-singer',
  'harrod-domar', 'savings', 'investment', 'capital-output ratio', 'foreign currency', 'capital flight',
  'population', 'dependency ratio', 'migration', 'debt', 'credit', 'banking', 'infrastructure',
  'education', 'skills', 'corruption', 'governance', 'civil war', 'terrorism', 'trade liberalisation',
  'fdi', 'subsidies', 'privatisation', 'exchange rate', 'microfinance', 'human capital', 'protectionism',
  'joint venture', 'buffer stock', 'lewis', 'tourism', 'primary industries', 'aid', 'debt relief',
  'world bank', 'imf', 'ngo',
];

/**
 * The word budget, counted the way `lib/content-validator.mjs` counts it, so the runner and the
 * validator cannot disagree about whether a subsection is over 350.
 */
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
