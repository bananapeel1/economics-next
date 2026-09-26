/**
 * PACKET 51 — poverty-inequality helpers: the id scheme, the formatters, the specification's own
 * lists, the bans and pointers, and the ONE ECONOMY every figure in the section is read off.
 *
 * IAL Economics 4.3.4 "Poverty and inequality", Unit 4 (WEC14), `audit/raw/econ_spec.txt:1788-1817`.
 * Two sub-topics — 1 Poverty, 2 Inequality — and **21 substantive leaves** under 24 oracle rows
 * (`audit/raw/spec-items.json`, topic "4.3.4": 21 `leaf` rows and three `requirement` rows — 1c,
 * 2b, 2d — which only group the bullets beneath them).
 *
 * ════ WHAT THE LEDGER ASKED FOR, CHECKED AGAINST THE DOCUMENT ═══════════════
 *
 *   - specGap-03 lists causes of poverty ("unemployment, low wages, demographic change, benefit
 *     levels"). Three are not 1c bullets. 1c's own seven (`:1795-1801`) are taught instead, one
 *     subsection each, in the specification's own words; the runner asserts every one.
 *   - specGap-07 asks whether measures of inequality go beyond the Lorenz curve and the Gini
 *     coefficient. They do not: 2b is a closed two-item list (`:1803-1805`). The Palma ratio and
 *     income-share ratios are banned; the practice guidance no longer names what is never taught.
 *   - specGap-02 / topFix-01 ask for the headcount ratio, the poverty gap and the MPI. 1b is the
 *     generic "Measures of absolute and relative poverty" (`:1793`), and those ARE measures of
 *     absolute poverty, so they are taught inside 1b as its content — not as separate requirements.
 *   - topFix-04 asks for `diagramRef: 'Lorenz'` / `'Kuznets'`. `diagramRef` is the legacy string
 *     pin; every block here pins its own diagram by `diagramId` (packets 2.91 and 40-47), which is
 *     what `InlineDiagram` resolves first. The Lorenz and Kuznets diagrams are each pinned.
 *   - The Kuznets curve is not named in the specification (0 hits). It is taught as a HYPOTHESIS
 *     about 2e, "the impact of economic change and development on inequality" (`:1815`), which is
 *     the requirement it serves, and never as a spec term.
 *
 * ════ WHAT ANOTHER TOPIC OWNS (pointer only) ════════════════════════════════
 *
 *   - Progressive / regressive taxes as a distinction, the Laffer curve, and policies to reduce
 *     poverty and inequality: 4.3.5 · 2b, 2c, 4a (`:1842`, `:1847`, `:1878`), role-state-macroeconomy.
 *     structure-06's Laffer takeaway is resolved by moving the Laffer curve out, not by padding it.
 *   - Marginal revenue product and wage determination: 3.3.4 (labour-markets). Propensities to
 *     consume and save: 2.3.4 (national-income). Neither is named here.
 *   - Aid as a development strategy and civil war as a constraint on growth: 4.3.6 · 3c, 2b. Here
 *     both are taught only as causes of changes in POVERTY (1c-6, 1c-7).
 *
 * ════ THE SPINE · one economy, Marenda ═════════════════════════════════════
 *
 * Twenty million people in ten equal groups (deciles) of two million, each with a representative
 * income in US dollars a day per person at purchasing power parity. Every figure the section prints
 * is computed here and re-derived by the runner:
 *
 *     absolute poverty headcount = share of people below the international line ($3.00 a day)
 *     relative poverty line      = 60% of median income; relative headcount = share below it
 *     poverty gap                = the shortfall of the poor below the absolute line
 *     Gini coefficient           = A ÷ (A + B) = 1 − Σ (x_k − x_{k−1})(Y_k + Y_{k−1})
 *
 * The one real figure is the World Bank's international poverty line, $3.00 a day at 2021 PPP, which
 * replaced $2.15 at 2017 PPP (accuracy-01, topFix-05). It is printed with its source, and nowhere
 * else is a year printed.
 */
import { createHash } from 'node:crypto';

export const SECTION = 'poverty-inequality';

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export const hash8 = (s) => createHash('sha1').update(norm(s)).digest('hex').slice(0, 8);
export const id = (kind, key) => `${SECTION}:${kind}:${hash8(key)}`;
export const subId = (s) => `${SECTION}:sub:${s}`;

export const round3 = (n) => Math.round(n * 1000) / 1000;
export const round2 = (n) => Math.round(n * 100) / 100;
export const round1 = (n) => Math.round(n * 10) / 10;
export const round0 = (n) => Math.round(n);

/** Dollars a day, always two decimals: $3.00, $0.80. */
export const usd = (n) => `$${round2(n).toFixed(2)}`;
export const pct = (n) => `${Number.isInteger(round1(n)) ? round1(n) : round1(n).toFixed(1)}%`;
/** A Gini coefficient or a Lorenz area, to two places. */
export const g2 = (n) => round2(n).toFixed(2);

/* ══ THE ECONOMY ══════════════════════════════════════════════════════════ */

/** Gini of ten equal groups, by the trapezium rule on the Lorenz curve. */
export const giniOf = (incomes) => {
  const xs = [...incomes].sort((a, b) => a - b);
  const total = xs.reduce((a, b) => a + b, 0);
  let cum = 0; let prev = 0; let under = 0;
  for (const x of xs) { cum += x; const y = cum / total; under += (1 / xs.length) * (y + prev) / 2; prev = y; }
  return { gini: 1 - 2 * under, B: under, A: 0.5 - under, lorenz: xs.reduce((acc, x) => { acc.push((acc[acc.length - 1] ?? 0) + x / total); return acc; }, []) };
};
/** Gini of ten equal groups from their SHARES (per cent, summing to 100). */
export const giniOfShares = (shares) => giniOf(shares);
export const medianOf = (incomes) => { const s = [...incomes].sort((a, b) => a - b); const m = s.length / 2; return s.length % 2 ? s[Math.floor(m)] : (s[m - 1] + s[m]) / 2; };
export const shareBelow = (incomes, line) => (incomes.filter((x) => x < line).length / incomes.length) * 100;

export const ECON = (() => {
  const country = 'Marenda';            // no real country, no year
  const population = 20;                // million
  const perDecile = population / 10;    // 2 million people in each tenth
  const absLine = 3.0;                  // $ a day, the World Bank international poverty line (2021 PPP)
  const relShare = 60;                  // % of median income

  /* ── today: ten representative incomes, $ a day ───────────────────────── */
  const base = [1.8, 2.6, 3.2, 4.0, 5.6, 6.4, 7.6, 9.4, 12.4, 22.0];
  const total = base.reduce((a, b) => a + b, 0);                              // 75
  const mean = total / base.length;                                            // 7.5
  const median = medianOf(base);                                               // 6.0
  const relLine = round2(median * relShare / 100);                             // 3.60
  const absRate = shareBelow(base, absLine);                                   // 20%
  const relRate = shareBelow(base, relLine);                                   // 30%
  const absPeople = absRate / 100 * population;                                // 4 million
  const shortfalls = base.filter((x) => x < absLine).map((x) => round2(absLine - x));   // 1.20, 0.40
  const avgShortfall = round2(shortfalls.reduce((a, b) => a + b, 0) / shortfalls.length); // 0.80
  const totalGap = round1(shortfalls.reduce((a, b) => a + b, 0) * perDecile);  // $3.2 million a day
  const G = giniOf(base);
  const gini = round2(G.gini);                                                 // 0.39
  const areaA = round3(G.A), areaB = round3(G.B);                              // 0.195, 0.305
  const topShare = round1(base[9] / total * 100);                              // 29.3%
  const bottomHalfShare = round1(base.slice(0, 5).reduce((a, b) => a + b, 0) / total * 100);   // 22.9%

  /* ── 1a · the richest fifth pulls away: inequality up, relative poverty unchanged ── */
  const topPull = [...base.slice(0, 8), 16.4, 37.0];
  const topPullMedian = medianOf(topPull);                                     // 6.0 — unchanged
  const topPullRel = shareBelow(topPull, round2(topPullMedian * relShare / 100));   // 30%
  const topPullAbs = shareBelow(topPull, absLine);                             // 20%
  const topPullGini = round2(giniOf(topPull).gini);                           // 0.49

  /* ── 1c-1 · growth of 25%, shared evenly ─────────────────────────────── */
  const growthPct = 25;
  const even = base.map((x) => round2(x * (1 + growthPct / 100)));
  const evenMedian = medianOf(even);                                           // 7.5
  const evenRelLine = round2(evenMedian * relShare / 100);                     // 4.50
  const evenAbs = shareBelow(even, absLine);                                   // 10%
  const evenRel = shareBelow(even, evenRelLine);                               // 30%
  const evenGini = round2(giniOf(even).gini);                                  // 0.39

  /* ── 1c-3, 1c-4 · a cash benefit to the poorest three tenths, paid for by a tax on the richest tenth ── */
  const benefit = 0.9;                  // $ a day per person
  const benefitCost = round1(benefit * 3 * perDecile);                         // $5.4 million a day
  const topTax = round2(benefitCost / perDecile);                              // $2.70 a day each
  const withBenefit = [...base.slice(0, 3).map((x) => round2(x + benefit)), ...base.slice(3, 9), round2(base[9] - topTax)];
  const benefitMedian = medianOf(withBenefit);                                 // 6.0
  const benefitAbs = shareBelow(withBenefit, absLine);                         // 10%
  const benefitRel = shareBelow(withBenefit, round2(benefitMedian * relShare / 100));   // 20%
  const benefitGini = round2(giniOf(withBenefit).gini);

  /* ── 1c-5 · structural change: the mills close; the fourth tenth drops into informal work ── */
  const millIncome = 2.4;
  const mills = [...base.slice(0, 3), millIncome, ...base.slice(4)];
  const millsAbs = shareBelow(mills, absLine);                                 // 30%

  /* ── 1c-6 · aid: a donor-funded cash transfer to the second tenth ─────── */
  const aidTransfer = 0.6;
  const aided = [base[0], round2(base[1] + aidTransfer), ...base.slice(2)];
  const aidAbs = shareBelow(aided, absLine);                                   // 10%

  /* ── 1c-7 · civil war: every income in the poorer half falls by 30% ──── */
  const warFall = 30;
  const war = [...base.slice(0, 5).map((x) => round2(x * (1 - warFall / 100))), ...base.slice(5)];
  const warAbs = shareBelow(war, absLine);                                     // 40%

  /* ── 2a · wealth, by tenth, as % of all wealth ────────────────────────── */
  const wealthShares = [0, 0.5, 1, 2, 3.5, 5, 7, 11, 20, 50];
  const wealthGini = round2(giniOf(wealthShares).gini);                        // 0.65
  const wealthTop = wealthShares[9];                                           // 50%
  const wealthBottomHalf = wealthShares.slice(0, 5).reduce((a, b) => a + b, 0);   // 7%

  /* ── 2c · assets compounding faster than wages ────────────────────────── */
  const assetReturn = 6, wageGrowth = 2, years = 30;
  const assetMultiple = round2((1 + assetReturn / 100) ** years);             // 5.74
  const wageMultiple = round2((1 + wageGrowth / 100) ** years);               // 1.81

  /* ── 2d · life expectancy and school completion by income fifth ───────── */
  const lifeByFifth = [64, 67, 70, 72, 76];
  const lifeGap = lifeByFifth[4] - lifeByFifth[0];                             // 12 years
  const schoolByFifth = [35, 52, 66, 78, 91];

  /* ── 2f · where income comes from: share earned from owning assets ─────── */
  const assetIncome = { bottomHalf: 5, middle: 15, top: 45 };

  return {
    country, population, perDecile, absLine, relShare,
    base, total, mean, median, relLine, absRate, relRate, absPeople, shortfalls, avgShortfall, totalGap,
    gini, areaA, areaB, lorenz: G.lorenz, topShare, bottomHalfShare,
    topPull, topPullMedian, topPullRel, topPullAbs, topPullGini,
    growthPct, even, evenMedian, evenRelLine, evenAbs, evenRel, evenGini,
    benefit, benefitCost, topTax, withBenefit, benefitMedian, benefitAbs, benefitRel, benefitGini,
    millIncome, mills, millsAbs, aidTransfer, aided, aidAbs, warFall, war, warAbs,
    wealthShares, wealthGini, wealthTop, wealthBottomHalf, wealthLorenz: giniOf(wealthShares).lorenz,
    assetReturn, wageGrowth, years, assetMultiple, wageMultiple,
    lifeByFifth, lifeGap, schoolByFifth, assetIncome,
  };
})();

/** The source printed beside the one real figure (Layer 4). Checked 26 Sep 2026 by search. */
export const POVERTY_LINE_SOURCE = 'source: World Bank, "June 2025 Update to Global Poverty Lines" factsheet, worldbank.org';

/* ══ The specification's own lists, in its own words ══════════════════════ */

/** 1c (`:1795-1801`): causes of changes in absolute and relative poverty. */
export const POVERTY_CAUSES = ['economic growth', 'education and training', 'welfare benefits', 'changes in tax structure', 'structural changes in the economy', 'aid', 'civil wars and conflict'];
/** 2d (`:1809-1814`): what inequality has an impact on. */
export const INEQUALITY_IMPACTS = ['enterprise', 'incentives', 'savings', 'education', 'migration', 'life expectancy'];
/** 2b (`:1804-1805`): the two measurements of inequality, and only two. */
export const INEQUALITY_MEASURES = ['the Lorenz curve', 'the Gini coefficient'];

/*
 * BANNED, BECAUSE THE SPECIFICATION DOES NOT CONTAIN IT OR BECAUSE ANOTHER TOPIC OWNS IT. The
 * runner A/Bs every one against a string it must catch and one it must not.
 */
export const BANNED_ELSEWHERE = [
  [/\bPalma\b|\bincome[- ]share ratios?\b|\b90\/10\b|\bS80\/S20\b|\bTheil\b/i, 'measures of inequality beyond the Lorenz curve and the Gini coefficient — 4.3.4 · 2b is a closed two-item list (econ_spec.txt:1803-1805); specGap-07 refused'],
  [/\bLaffer\b/i, 'the Laffer curve is 4.3.5 · 2c (econ_spec.txt:1847), role-state-macroeconomy; structure-06 resolved by moving it out'],
  [/\bmarginal revenue product\b|\bMRP\b/i, 'marginal revenue product is 3.3.4 (labour-markets)'],
  [/\bmarginal propensit\w*|\bMPC\b|\bMPS\b/i, 'the propensities to consume and save are 2.3.4 (econ_spec.txt:1080-1083), national-income'],
  [/\bequity[- ]efficiency trade-?off\b/i, 'redistribution policy and its trade-offs are 4.3.5 · 4a (econ_spec.txt:1878), role-state-macroeconomy'],
  [/\b2\.15\b|\b2017 PPP\b|\b2022 PPP\b/i, 'the superseded $2.15 line and its mislabelled base year (accuracy-01, topFix-05)'],
  [/relative inequality/i, '"relative inequality" is not a term (accuracy-02)'],
  [/\bAssess\b|\bOutline\b/, 'command words IAL Economics does not have. Appendix 6: Define 2, Calculate 2 or 4, Draw 4, Explain 4, Analyse 6, Examine 8, Discuss 14, Evaluate 20'],
];

/*
 * THE NEIGHBOURS THAT MAY BE POINTED AT AND MAY NOT BE TAUGHT. Each mention must name its topic.
 */
export const POINTER_ONLY = [
  { re: /\bprogressive\b|\bregressive\b|\bproportional tax/i, why: 'the progressive / proportional / regressive distinction is 4.3.5 · 2b (econ_spec.txt:1842), role-state-macroeconomy', max: 3, mustCite: /4\.3\.5/ },
  { re: /\bpolicies to reduce\b|\bredistributive polic/i, why: 'policies to reduce poverty and inequality are 4.3.5 · 4a (econ_spec.txt:1878)', max: 2, mustCite: /4\.3\.5/ },
  { re: /\bHDI\b|\bHuman Development Index\b/i, why: 'the HDI is 4.3.6 · 1a (econ_spec.txt:1905), growth-development', max: 1, mustCite: /4\.3\.6/ },
];

/*
 * TEACHING TERMS: every subsection must teach with at least one.
 */
export const TEACHING_TERMS = [
  'poverty', 'absolute poverty', 'relative poverty', 'poverty line', 'median', 'headcount', 'poverty gap',
  'multidimensional', 'economic growth', 'education', 'training', 'welfare benefits', 'tax', 'structural change',
  'aid', 'civil war', 'conflict', 'inequality', 'wealth', 'income', 'lorenz curve', 'gini', 'enterprise',
  'incentives', 'savings', 'migration', 'life expectancy', 'development', 'kuznets', 'capitalism', 'free market',
  'technology', 'globalisation', 'inheritance', 'skills',
];

/** The word budget, counted the way `lib/content-validator.mjs` counts it. */
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
