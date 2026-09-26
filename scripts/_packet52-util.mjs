/**
 * PACKET 52 — role-state-macroeconomy helpers: the id scheme, the formatters, the specification's
 * own lists, and the ONE ECONOMY every figure in the section is read off.
 *
 * IAL Economics 4.3.5 "The role of the state in the macroeconomy", Unit 4 (WEC14),
 * `audit/raw/econ_spec.txt:1824-1893`. Four numbered sub-topics — 1 Public expenditure · 2 Taxation
 * · 3 Public sector borrowing and public sector debt · 4 Macroeconomic policies — and **38
 * substantive leaves** under 47 oracle rows (`audit/raw/spec-items.json`, topic "4.3.5": 38 `leaf`
 * rows and nine `requirement` rows that only group the bullets beneath them). The runner re-reads
 * the oracle and asserts both counts.
 *
 * ════ WHAT THE LIVE SECTION TAUGHT THAT 4.3.5 DOES NOT CONTAIN ═══════════════
 *
 * Measured, not remembered — the runner re-greps each of these over the whole document:
 *
 *   - public goods and the free-rider problem: 1.3.5 · 1b (`econ_spec.txt:732`), market-failure.
 *     The live block 1 ("Market Failure and the State") taught them (topFix-01, accuracy-01).
 *   - "merit good" / "demerit good": 0 hits in the whole Economics specification (accuracy-01;
 *     `terms.off-spec` already refuses it).
 *   - moral hazard: 1.3.5 · 5 (`:781`), market-failure. A live flashcard taught it (structure-08).
 *   - the incidence of an indirect tax: 1.3.4 · 4b (`:713-716`), price-determination. topFix-02
 *     asked for a "Tax Incidence" diagram on block 1; the live section had one (`diagrams[4]`) and a
 *     quiz item on it (`quiz[10]`). Refused on the document and removed.
 *   - universal basic income: 0 hits (topFix-05, structure-06, structure-07).
 *   - the loanable funds market: 0 hits (specGap-12). Crowding out (1c) is taught through
 *     interest rates and private investment and drawn on AD/AS, which the item itself preferred.
 *   - credit ratings and "inflation risk": 0 hits (specGap-08 named both as 3c significances; 3c
 *     names exactly three: interest rates, debt servicing, intergenerational equity).
 *
 * `specGap-03`'s "living standards" and "equality" are not 1c bullets (1c names productivity and
 * growth, crowding out and levels of taxation). Poverty and inequality ARE this topic's words — at
 * 4a, as an aim of policy — and are taught there; their MEASURES are 4.3.4's and only pointed at.
 *
 * ════ THE NEIGHBOURS ═════════════════════════════════════════════════════
 *
 *   - 2.3.6 (`:1132-1196`) owns the demand-side and supply-side INSTRUMENTS: what fiscal and
 *     monetary policy are, quantitative easing, the list of supply-side policies. 4.3.5 · 4a is how
 *     governments USE them for four named aims, and that is what is taught here.
 *   - 4.3.3 · 2 (`:1720-1727`) owns exchange rate SYSTEMS and how a government intervenes in a
 *     currency market. 4a's "exchange-rate policy" is taught as a use, with a pointer.
 *   - 4.3.4 (`:1788-1822`) owns poverty and inequality measures (Lorenz, Gini).
 *   - 4.3.2 · 5 (`:1683-1706`) owns how tariffs and quotas work.
 *   - 2.3.4 · 4 (`:1078-1086`) owns the multiplier.
 *
 * ════ THE SPINE · one economy, Solmara ═══════════════════════════════════
 *
 * Every figure the section prints is computed here and re-derived by the runner:
 *
 *     public expenditure = capital + current + transfer payments               (1a)
 *     fiscal deficit     = public expenditure − tax revenue                     (3a-1)
 *     debt next year     = debt this year + this year's deficit                 (3a-3)
 *     actual deficit     = structural + cyclical                                (3a-4)
 *     debt interest      = debt × average interest rate                         (3c-2)
 *     average tax rate   = tax paid ÷ income                                    (2b)
 *     Laffer revenue     = t × (100 − t) ÷ 25, $bn, peak at 50%                 (2c-2)
 *
 * Money is in US dollars: billions for the economy, dollars for households, millions for the TNC.
 * One minus sign, U+2212. No year appears anywhere except 2008, which is the specification's own
 * (4b, `:1880`); the runner bans every other.
 */
import { createHash } from 'node:crypto';

export const SECTION = 'role-state-macroeconomy';

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
/** A money amount in dollars, with thousands separators. Integers print plain. */
export const money = (n) => `${n < 0 ? MINUS : ''}$${Number.isInteger(abs(n)) ? abs(n).toLocaleString('en-GB') : abs(round2(n)).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
/** Billions of dollars. One decimal when needed. */
export const bn = (n) => `$${Number.isInteger(round1(n)) ? round1(n) : round1(n).toFixed(1)}bn`;
/** Millions of dollars. One decimal when needed. */
export const mnd = (n) => `$${Number.isInteger(round2(n)) ? round2(n) : round2(n).toFixed(2).replace(/0$/, '')}m`;
export const pct = (n) => `${Number.isInteger(round2(n)) ? round2(n) : round1(n)}%`;

/* ══ THE ECONOMY ══════════════════════════════════════════════════════════ */

export const ECON = (() => {
  const country = 'Solmara';            // no real country, no year
  const gdp = 400;                      // $bn a year

  /* ── 1a · public expenditure, split three ways ─────────────────────────── */
  const capital = 24;                   // roads, schools, hospitals built: assets that last
  const current = 84;                   // salaries of teachers and nurses, medicines, running costs
  const transfer = 52;                  // pensions, unemployment benefits, child grants: no output bought
  const spending = capital + current + transfer;                               // 160
  const spendingShare = round1((spending / gdp) * 100);                        // 40%

  /* ── 3a-1 · the fiscal deficit ──────────────────────────────────────────── */
  const revenue = 144;
  const deficit = spending - revenue;                                           // 16
  const deficitShare = round1((deficit / gdp) * 100);                           // 4%

  /* ── 3a-3 · the national debt: a stock the deficits add to ─────────────── */
  const debt = 240;
  const debtShare = round1((debt / gdp) * 100);                                 // 60%
  const debtNext = debt + deficit;                                              // 256
  /* a surplus year repays: the debt falls only when the budget is in surplus */
  const surplus = 6;
  const debtAfterSurplus = debtNext - surplus;                                  // 250

  /* ── 3a-2, 3a-4 · a recession: automatic stabilisers and the cyclical deficit ── */
  const recessionRevenueFall = 8;       // $bn less tax, with no decision taken
  const recessionTransferRise = 4;      // $bn more benefits, with no decision taken
  const stabiliserSwing = recessionRevenueFall + recessionTransferRise;        // 12
  const recessionDeficit = deficit + stabiliserSwing;                           // 28
  const structural = deficit;           // the deficit at full capacity: 16
  const cyclical = recessionDeficit - structural;                               // 12
  const recessionDeficitShare = round1((recessionDeficit / gdp) * 100);         // 7%
  const structuralShare = round1((structural / gdp) * 100);                     // 4%
  const cyclicalShare = round1((cyclical / gdp) * 100);                         // 3%

  /* ── 3c-2 · debt servicing ─────────────────────────────────────────────── */
  const rate = 5;                       // % average interest on the debt
  const interest = round1(debt * rate / 100);                                   // 12
  const interestOfRevenue = round1((interest / revenue) * 100);                 // 8.3%
  const rateHigh = 7;
  const interestHigh = round1(debt * rateHigh / 100);                           // 16.8
  const interestHighOfRevenue = round1((interestHigh / revenue) * 100);         // 11.7%

  /* ── 1c-2 · crowding out ───────────────────────────────────────────────── */
  const stimulus = 20;                  // extra public spending, all of it borrowed
  const rateBefore = 4, rateAfter = 5;  // % the government's borrowing bids interest rates up
  const investmentLost = 8;             // private investment postponed at the higher rate
  const netAddition = stimulus - investmentLost;                                // 12
  const crowdedShare = round0((investmentLost / stimulus) * 100);               // 40%

  /* ── 2b · three tax structures, three households ─────────────────────── */
  /* a progressive income tax: 0% up to $5,000, 10% from $5,000 to $25,000, 30% above $25,000 */
  const bands = [[0, 5000, 0], [5000, 25000, 10], [25000, Infinity, 30]];
  const incomeTax = (y) => bands.reduce((t, [lo, hi, r]) => t + Math.max(0, Math.min(y, hi) - lo) * r / 100, 0);
  const incomes = [10000, 50000, 100000];
  const progTax = incomes.map(incomeTax);                                       // 500, 9500, 24500
  const progAvg = incomes.map((y, i) => round2((progTax[i] / y) * 100));        // 5, 19, 24.5
  const flat = 15;                                                               // a proportional tax
  const propTax = incomes.map((y) => y * flat / 100);
  /* a regressive tax: a 10% sales tax on spending, and the poor spend more of their income */
  const salesRate = 10;
  const spendShare = [90, 60, 40];                                               // % of income spent
  const salesTax = incomes.map((y, i) => y * spendShare[i] / 100 * salesRate / 100);   // 900, 3000, 4000
  const salesAvg = incomes.map((y, i) => round2((salesTax[i] / y) * 100));      // 9, 6, 4
  /* 2c-3 · the sales tax rises from 10% to 15% */
  const salesRateHigh = 15;
  const salesExtra = incomes.map((y, i) => y * spendShare[i] / 100 * (salesRateHigh - salesRate) / 100);   // 450, 1500, 2000
  const salesExtraShare = incomes.map((y, i) => round2((salesExtra[i] / y) * 100));   // 4.5, 3, 2

  /* ── 2c-1 · the marginal rate and the reward for extra work ────────────── */
  const extraEarned = 1000;
  const mrBefore = 30, mrAfter = 40;
  const keptBefore = extraEarned * (100 - mrBefore) / 100;                     // 700
  const keptAfter = extraEarned * (100 - mrAfter) / 100;                       // 600

  /* ── 2c-2 · the Laffer curve: R = t(100 − t) ÷ 25, peak at 50% ──────────── */
  const laffer = (t) => round1(t * (100 - t) / 25);
  const lafferPeak = 50;
  const lafferMax = laffer(lafferPeak);                                         // 100
  const lowCut = [30, 15], highCut = [85, 70];
  const lowCutRevenue = lowCut.map(laffer);                                     // 84 → 51
  const highCutRevenue = highCut.map(laffer);                                   // 51 → 84

  /* ── 2c-6 · an income tax cut and the trade balance ────────────────────── */
  const taxCut = 10;                    // $bn more disposable income
  const mpm = 0.3;                      // marginal propensity to import
  const importsUp = round1(taxCut * mpm);                                       // 3

  /* ── 2c-7 · corporation tax and the return on a foreign investment ─────── */
  const fdiProject = 100;               // $m invested
  const fdiProfit = 20;                 // $m profit a year before tax
  const corpBefore = 25, corpAfter = 15;
  const fdiReturnBefore = round1((fdiProfit * (100 - corpBefore) / 100) / fdiProject * 100);   // 15%
  const fdiReturnAfter = round1((fdiProfit * (100 - corpAfter) / 100) / fdiProject * 100);     // 17%

  /* ── 4c-2 · transfer pricing: a copper TNC, two subsidiaries ───────────── */
  const tpCost = 60;                    // $m cost of mining in Country H
  const tpWorld = 100;                  // $m the copper sells for on the world market
  const taxH = 30, taxL = 5;            // % corporate tax in H (where it is mined) and L (the trading arm)
  const armsLength = tpWorld;           // price the trading arm pays at arm's length
  const rigged = 65;                    // price it pays when the TNC sets it
  const profitH = (p) => p - tpCost;
  const profitL = (p) => tpWorld - p;
  const taxPaid = (p) => round2(profitH(p) * taxH / 100 + profitL(p) * taxL / 100);
  const taxArms = taxPaid(armsLength);                                          // 12
  const taxRigged = taxPaid(rigged);                                            // 1.5 + 1.75 = 3.25
  const taxLostH = round2(profitH(armsLength) * taxH / 100 - profitH(rigged) * taxH / 100);   // 10.5

  return {
    country, gdp,
    capital, current, transfer, spending, spendingShare,
    revenue, deficit, deficitShare,
    debt, debtShare, debtNext, surplus, debtAfterSurplus,
    recessionRevenueFall, recessionTransferRise, stabiliserSwing, recessionDeficit, structural, cyclical,
    recessionDeficitShare, structuralShare, cyclicalShare,
    rate, interest, interestOfRevenue, rateHigh, interestHigh, interestHighOfRevenue,
    stimulus, rateBefore, rateAfter, investmentLost, netAddition, crowdedShare,
    bands, incomeTax, incomes, progTax, progAvg, flat, propTax, salesRate, spendShare, salesTax, salesAvg,
    salesRateHigh, salesExtra, salesExtraShare,
    extraEarned, mrBefore, mrAfter, keptBefore, keptAfter,
    laffer, lafferPeak, lafferMax, lowCut, highCut, lowCutRevenue, highCutRevenue,
    taxCut, mpm, importsUp,
    fdiProject, fdiProfit, corpBefore, corpAfter, fdiReturnBefore, fdiReturnAfter,
    tpCost, tpWorld, taxH, taxL, armsLength, rigged, profitH, profitL, taxPaid, taxArms, taxRigged, taxLostH,
  };
})();

/* ══ The specification's own lists, in its own words ══════════════════════ */

/** 1b (`:1830-1833`). */
export const SPENDING_REASONS = ['changing incomes', 'changing age distributions', 'changing expectations'];
/** 1c (`:1834-1838`). */
export const SPENDING_SIGNIFICANCE = ['productivity and growth', 'crowding out', 'levels of taxation'];
/** 2c (`:1843-1850`). */
export const TAX_EFFECTS = ['incentives to work', 'tax revenues: Laffer curve analysis', 'income distribution', 'real output and employment', 'the price level', 'the trade balance', 'FDI flows'];
/** 3c (`:1860-1863`). */
export const DEBT_SIGNIFICANCE = ['impact on interest rates', 'debt servicing', 'intergenerational equity'];
/** 4a (`:1873-1879`): the five tools and the four aims. */
/* The spec's two-column layout splits "exchange-rate" across lines 1873-1874, with the row label "policies" between the halves, so its second half is matched on its own. */
export const POLICY_TOOLS = ['fiscal policy', 'monetary policy', 'rate policy', 'supply-side policies', 'direct controls'];
export const POLICY_AIMS = ['reduce fiscal deficits and national debts', 'control the rate of inflation', 'respond to external shocks in the global economy', 'reduce poverty and inequality'];
/** 4e (`:1890-1893`). */
export const POLICY_PROBLEMS = ['inaccurate information', 'risks and uncertainties', 'inability to control external shocks'];

/*
 * BANNED, BECAUSE THE SPECIFICATION DOES NOT CONTAIN IT OR BECAUSE ANOTHER TOPIC OWNS IT. Each
 * entry says why. The runner A/Bs every one against a string it must catch and one it must not.
 */
export const BANNED_ELSEWHERE = [
  [/\bpublic goods?\b|\bfree[- ]rider\b|\bnon-?rival\w*|\bnon-?excludab\w*/i, 'public goods and the free-rider problem — 1.3.5 · 1b (econ_spec.txt:732), market-failure. The live block 1 taught them (topFix-01, accuracy-01)'],
  [/\b(?:de)?merit goods?\b/i, '"merit good" / "demerit good" — 0 hits in econ_spec.txt (accuracy-01, structure-08)'],
  [/\bmoral hazard\b/i, 'moral hazard — 1.3.5 · 5 (econ_spec.txt:781), market-failure. A live flashcard taught it (structure-08)'],
  [/\bincidence\b/i, 'the incidence of an indirect tax — 1.3.4 · 4b (econ_spec.txt:713-716), price-determination. topFix-02\'s "Tax Incidence" diagram is refused on the document'],
  [/\buniversal basic income\b|\bUBI\b/i, 'universal basic income — 0 hits in econ_spec.txt (topFix-05, structure-06, structure-07)'],
  [/\bloanable[- ]funds?\b/i, 'the loanable funds market — 0 hits in econ_spec.txt (specGap-12). Crowding out is taught through interest rates and investment'],
  [/\bcredit ratings?\b|\binflation risk\b/i, '"credit ratings" and "inflation risk" — 0 hits in econ_spec.txt (specGap-08). 3c names interest rates, debt servicing and intergenerational equity'],
  [/\bpoverty trap\b|\bWagner\b|\bRicardian\b|\bliquidity trap\b/i, 'poverty trap, Wagner\'s law, Ricardian equivalence, liquidity trap — 0 hits in econ_spec.txt'],
  [/\bMarshall-Lerner\b|\bJ-curve\b|\bpurchasing power parity theory\b/i, 'exchange-rate mechanics — 4.3.3 · 2 (econ_spec.txt:1733-1745), balance-payments-exchange-rates'],
  [/\bPhillips curve\b/i, 'the Phillips curve — 2.3.6 · 2a (econ_spec.txt:1143), macroeconomic-objectives-policies'],
  [/\bAssess\b|\bOutline\b|\bDistinguish between\b/, 'command words IAL Economics does not have. Appendix 6 (econ_spec.txt:2696-2745): Define 2, Calculate 2 or 4, Draw 4, Explain 4, Analyse 6, Examine 8, Discuss 14, Evaluate 20. The live set carried "Assess (10)" and "Outline (4)"; topFix-04 proposed "Distinguish between", which Appendix 6 does not list'],
];

/*
 * THE NEIGHBOURS THAT MAY BE POINTED AT AND MAY NOT BE TAUGHT. Each carries the number of mentions
 * it is allowed; every mention must name the topic number, so a pointer can never read as teaching.
 */
export const POINTER_ONLY = [
  { re: /\bGini\b|\bLorenz\b|\babsolute poverty\b|\brelative poverty\b/i, why: 'poverty and inequality measures are 4.3.4 (econ_spec.txt:1788-1822), poverty-inequality', max: 2, mustCite: /4\.3\.4/ },
  { re: /\btariffs?\b|\bquotas?\b/i, why: 'how tariffs and quotas work is 4.3.2 · 5 (econ_spec.txt:1683-1706), trade-global-economy', max: 2, mustCite: /4\.3\.2/ },
  { re: /\bfixed exchange rates?\b|\brevaluation\b|\bdevaluation\b|\bmanaged exchange rates?\b/i, why: 'exchange rate systems, revaluation and devaluation are 4.3.3 · 2 (econ_spec.txt:1720-1747), balance-payments-exchange-rates', max: 2, mustCite: /4\.3\.3/ },
  { re: /\bquantitative easing\b/i, why: 'quantitative easing as an instrument is 2.3.6 · 4c (econ_spec.txt:1185), macroeconomic-objectives-policies', max: 2, mustCite: /2\.3\.6/ },
  { re: /\bmultiplier\b/i, why: 'the multiplier is 2.3.4 · 4 (econ_spec.txt:1078-1086), national-income', max: 2, mustCite: /2\.3\.4/ },
  { re: /\bminimum wages?\b/i, why: 'the minimum wage is 3.3.5 · 2b (econ_spec.txt:1530), government-intervention-firms', max: 1, mustCite: /3\.3\.5/ },
];

/*
 * TEACHING TERMS: the vocabulary each subsection must teach with at least one of.
 */
export const TEACHING_TERMS = [
  'public expenditure', 'public spending', 'capital expenditure', 'current expenditure', 'transfer payment',
  'income', 'age', 'pension', 'expectation', 'productivity', 'growth', 'crowding out', 'interest rate',
  'tax', 'direct tax', 'indirect tax', 'progressive', 'proportional', 'regressive', 'incentive', 'laffer',
  'distribution', 'output', 'employment', 'price level', 'trade balance', 'fdi', 'deficit', 'surplus',
  'debt', 'automatic stabiliser', 'discretionary', 'structural', 'cyclical', 'debt servicing',
  'intergenerational', 'fiscal policy', 'monetary policy', 'exchange rate', 'supply-side', 'direct control',
  'inflation', 'external shock', 'poverty', 'inequality', 'financial crisis', 'tnc', 'tax avoidance',
  'transfer pricing', 'local', 'global', 'information', 'uncertain',
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
