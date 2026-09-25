/**
 * PACKET 34 — causes-effects-globalisation helpers: the id scheme, the formatters, the
 * specification's own lists, and the ONE ECONOMY that carries every figure in the section.
 *
 * IAL Economics Unit 4 (WEC14), topic 4.3.1, `audit/raw/econ_spec.txt:1586-1625`. Three sub-topics,
 * 26 oracle rows, **22 substantive leaves** — a small, tight topic that the live section spread over
 * three chapters and six subsections, one of which belongs to another topic entirely.
 *
 * ════ THE TRADING-BLOC BLOCK IS 4.3.2 AND IT IS NOT HERE ════
 *
 * `econ_spec.txt:1657-1673` is **4.3.2 · 4, "Trade liberalisation and trading blocs"**: the types of
 * bloc, trade creation, trade diversion, and conflicts with the WTO. That is the `trade-global-economy`
 * section. 4.3.1 names blocs exactly once, as **cause 2a-2, "increased number and size of trading
 * blocs"** — a sentence about why trade grew, not a ladder of integration. So this section teaches the
 * cause and stops, and `LADDER_TERMS` below is the list the runner refuses to find anywhere.
 *
 * ════ THE VOCABULARY IS MEASURED, NOT ASSUMED (rule 2) ════
 *
 * Counted in both specifications before a word was written. `TNC` is 7 hits in `econ_spec.txt` and
 * `MNC` is **0**; `multinational` is 0 here and 3 in `bus_spec.txt`. The two specifications use
 * different words for the same firm, and a finding asked this section to teach both — so the runner
 * bans the Business one. `race to the bottom`, `tax competition`, `deindustrialisation`, `brain
 * drain`, `greenfield`, `stakeholder`, `portfolio`, `world price`, `supply chain` and `value added`
 * are each **0 hits in `econ_spec.txt`**, and four audit items are written in them.
 *
 * ── ONE ECONOMY, ONE TNC, AND EVERY FIGURE FALLS OUT OF SIX NUMBERS ──
 *
 * TAMIRA is a small open economy and NORVELL ELECTRONICS is a transnational company that invests in
 * it. Neither exists, which is the point: `accuracy-01` is a false claim about a real trade agreement
 * and Layer 4's rule is that a generic true example beats a specific invented one. What is NOT
 * invented is the arithmetic — every figure on every surface is derived here and re-derived by the
 * runner out of the emitted SVG.
 *
 *     TRADE GROWS FASTER THAN OUTPUT, WHICH IS LEAF 1a
 *     gdp(t)   = 40 × 1.04^t        output compounding at 4% a year
 *     trade(t) = 12 × 1.06^t        trade compounding at 6%
 *     openness = 100 × trade ÷ gdp  → 30.0% fifty years ago, 77.8% today
 *
 * Two growth rates two points apart are the whole of 1a: nothing in the series is typed in, and the
 * ratio rises because 1.06 > 1.04 and for no other reason. The chart in chapter 1 is sampled from
 * the same two functions.
 *
 *     ECONOMIES OF SCALE ARE WHY THE IMPORTED DEVICE IS CHEAPER, WHICH IS LEAF 3a-3
 *     ac(fixed, q) = fixed ÷ q + 30     the same technology, a different scale
 *     at home:  12,000,000 ÷ 100,000 + 30 = $150
 *     abroad:   24,000,000 ÷ 600,000 + 30 = $70
 *
 * The variable cost is the SAME $30 in both, so the price gap is scale and not cheap labour — which
 * is the misconception the chapter is built to remove.
 *
 *     THE PRICE FALL AND THE CONSUMER-SURPLUS GAIN, WHICH IS LEAF 3a-4
 *     Q = 400,000 − 2,000P      so P = 150 → Q = 100,000 and P = 70 → Q = 260,000
 *     CS = ½ × (200 − P) × Q    $2.5m before, $16.9m after, a gain of $14.4m
 *     and that gain splits exactly: 80 × 100,000 = $8.0m to the people already buying,
 *     plus ½ × 80 × 160,000 = $6.4m to the people who could not afford one before.
 *
 * `consumer surplus` is **1 hit in the whole Economics specification** and it is this leaf, so this
 * section is the only place a student meets it. `specThin-01` says it is named and never defined.
 *
 *     THE SAME PROFIT IN TWO JURISDICTIONS, WHICH IS LEAF 3b-4
 *     $30m profit taxed at 25% is $7.5m. Move $20m of it to a 5% jurisdiction as a licence fee and
 *     Tamira collects 25% of $10m = $2.5m while the group pays 5% of $20m = $1m: $3.5m instead of
 *     $7.5m, and Tamira is $5m short.
 *
 * Money is in dollars. One minus sign, U+2212, emitted by `money` itself (packet 18).
 *
 * NO REAL COMPANY, NO REAL COUNTRY, NO YEAR AND NO SOURCED FIGURE anywhere in this section. That is
 * one decision answering three findings: `accuracy-01`'s false Brexit claim, `topFix-04`'s
 * uncorroborated index numbers on diagram 0, and `locale.uk`, for an audience sitting WEC14 in Hong
 * Kong, Singapore, Malaysia, Pakistan, the Gulf, Nigeria and Kenya.
 */
import { createHash } from 'node:crypto';

export const SECTION = 'causes-effects-globalisation';

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export const hash8 = (s) => createHash('sha1').update(norm(s)).digest('hex').slice(0, 8);
export const id = (kind, key) => `${SECTION}:${kind}:${hash8(key)}`;
export const subId = (s) => `${SECTION}:sub:${s}`;

export const round2 = (n) => Math.round(n * 100) / 100;
const round1 = (n) => Math.round(n * 10) / 10;

/* ── formatting: one formatter per kind of figure (packet 18) ──────────────── */

export const MINUS = '−';
export const money = (n) => `${n < 0 ? MINUS : ''}$${Number.isInteger(Math.abs(n)) ? Math.abs(n).toLocaleString('en-GB') : Math.abs(n).toFixed(2)}`;
/** Billions, as the national accounts print them: one decimal and no more (packet 21). */
export const bn = (n) => `$${round1(n).toFixed(1)}bn`;
/** Millions, for the project and the tax. */
export const mn = (n) => `$${Number.isInteger(round1(n)) ? round1(n) : round1(n).toFixed(1)}m`;
export const qty = (n) => (Number.isInteger(n) ? n.toLocaleString('en-GB') : n.toFixed(2));
export const pct = (n) => `${Number.isInteger(n) ? n : round1(n).toFixed(1)}%`;

/* ══ TAMIRA · trade as a proportion of GDP (4.3.1 · 1a) ════════════════════ */

/*
 * THE SERIES IS NOT A TABLE OF NUMBERS, IT IS TWO GROWTH RATES. `openness` rises for exactly one
 * reason — trade compounds faster than output — and a reader who changes either rate changes the
 * chart, the calculation, the flashcard and the practice item together. Packet 17's rule, re-earned
 * by 20, 24, 28, 29 and 31.
 *
 * The decade labels are relative ("50 years ago") rather than dated, because a dated series about a
 * country that does not exist invites a reader to check it against one that does. The spec's own
 * frame is "in the last 50 years" (2a).
 */
export const TAMIRA = (() => {
  const gdp0 = 40, gGdp = 0.04;
  const trade0 = 12, gTrade = 0.06;
  const gdp = (t) => gdp0 * (1 + gGdp) ** t;
  const trade = (t) => trade0 * (1 + gTrade) ** t;
  const openness = (t) => (100 * trade(t)) / gdp(t);
  const decades = [0, 10, 20, 30, 40, 50];
  const label = (t) => (t === 50 ? 'today' : `${50 - t} years ago`);
  /*
   * THE RATIO IS COMPUTED FROM THE FIGURES THE PAGE PRINTS, NOT FROM THE UNROUNDED ONES. Layer 6
   * found this: the text gave output as $284.3bn and trade as $221.0bn and then called the ratio
   * 77.8%, which is the unrounded division (77.76%). A student dividing the two numbers in front of
   * them gets 77.7%, and is right. A derived figure has to be derivable from the figures actually on
   * the page, so `openness` divides the ROUNDED series — and the runner asserts it, because nothing
   * else in the pipeline compares a printed ratio with the printed quantities behind it.
   */
  const series = decades.map((t) => {
    const g = round1(gdp(t));
    const tr = round1(trade(t));
    return { t, label: label(t), gdp: g, trade: tr, openness: round1((100 * tr) / g) };
  });
  const first = series[0], last = series[series.length - 1];
  return {
    name: 'Tamira',
    gdp0, gGdp, trade0, gTrade, gdp, trade, openness, series, first, last,
    gdpPct: round1(100 * gGdp), tradePct: round1(100 * gTrade),
    /** How many times bigger trade is now than it was, which is the environmental leaf's figure. */
    tradeMultiple: round1(last.trade / first.trade),
    gdpMultiple: round1(last.gdp / first.gdp),
    /** Exports and imports: trade is the sum of the two, and the split is steady. */
    exportShare: 0.55,
    exportsNow: round1(last.trade * 0.55),
    importsNow: round1(last.trade * 0.45),
    population: 5,
  };
})();

/* ══ THE DEVICE · scale, price and consumer surplus (3a-3, 3a-4, 3b-1) ═════ */

/*
 * ONE MARKET CARRIES FOUR LEAVES, AND THE VARIABLE COST IS THE SAME ON BOTH SIDES OF IT. A student
 * who reads "imports are cheaper" and writes "because wages abroad are lower" has the commonest
 * wrong answer in this topic; here the wage cost per unit is identical and the whole gap is
 * `fixed ÷ q`, so the misconception is refuted by the arithmetic rather than by an assertion.
 */
export const DEVICE = (() => {
  const variable = 30;
  const homeFixed = 12_000_000, homeQ = 100_000;
  const worldFixed = 24_000_000, worldQ = 600_000;
  const ac = (fixed, q) => round2(fixed / q + variable);
  const homePrice = ac(homeFixed, homeQ);        /* $150 */
  const openPrice = ac(worldFixed, worldQ);      /* $70 */

  /* Domestic demand: Q = intercept − slope·P, solved so that P = homePrice gives homeQ exactly. */
  const slope = 2000;
  const intercept = homeQ + slope * homePrice;   /* 400,000 */
  const choke = intercept / slope;               /* $200 */
  const qAt = (p) => intercept - slope * p;
  const cs = (p) => round2(0.5 * (choke - p) * qAt(p));

  const qBefore = qAt(homePrice), qAfter = qAt(openPrice);
  const csBefore = cs(homePrice), csAfter = cs(openPrice);
  const fall = round2(homePrice - openPrice);
  const toExisting = round2(fall * qBefore);
  const toNew = round2(0.5 * fall * (qAfter - qBefore));

  return {
    variable, homeFixed, homeQ, worldFixed, worldQ, ac,
    homePrice, openPrice, fall,
    homeFixedPerUnit: round2(homeFixed / homeQ),
    worldFixedPerUnit: round2(worldFixed / worldQ),
    slope, intercept, choke, qAt, cs,
    qBefore, qAfter, csBefore, csAfter,
    csGain: round2(csAfter - csBefore),
    toExisting, toNew,
    /** The domestic maker that charged the higher price, and the people in it. */
    homeWorkers: 500, homeWage: 5000,
    /** What a displaced worker finds instead, which is the inequality leaf. */
    reWage: 3000,
  };
})();

/* ══ NORVELL ELECTRONICS · FDI by a TNC (2b-1, 2b-2, 3a-2, 3b-4, 3b-5, 3b-6) ═ */

export const NORVELL = (() => {
  const capital = 120_000_000;
  const jobs = 1500, wage = 6000;
  const wageBill = jobs * wage;
  const suppliers = 18_000_000;
  const profit = 30_000_000;
  const taxRate = 25, incomeTaxRate = 10;
  const profitTax = round2((taxRate / 100) * profit);
  const incomeTax = round2((incomeTaxRate / 100) * wageBill);
  const revenue = profitTax + incomeTax;

  /* Transfer pricing: the same profit, declared in two places. */
  const licence = 20_000_000;
  const lowRate = 5;
  const shiftedHome = profit - licence;
  const taxHome = round2((taxRate / 100) * shiftedHome);
  const taxAway = round2((lowRate / 100) * licence);
  const groupTax = round2(taxHome + taxAway);
  const revenueLost = round2(profitTax - taxHome);

  /* 3b-6: a proposed rise in the rate, and what the firm's departure would cost. */
  const proposedRate = 30;
  const riseGain = round2(((proposedRate - taxRate) / 100) * profit);
  const departureCost = revenue;

  return {
    name: 'Norvell Electronics', capital, jobs, wage, wageBill, suppliers,
    profit, taxRate, incomeTaxRate, profitTax, incomeTax, revenue,
    licence, lowRate, shiftedHome, taxHome, taxAway, groupTax, revenueLost,
    proposedRate, riseGain, departureCost,
    /*
     * THE BREAK-EVEN PROBABILITY, WRITTEN OUT SO IT CANNOT BE THE OTHER ONE. Relative to today the
     * government gains `riseGain` if the plant stays and loses `departureCost` if it goes, so the
     * expected value is `riseGain − (riseGain + departureCost)·p` and it is zero at
     * `riseGain ÷ (riseGain + departureCost)`. The ratio `riseGain ÷ departureCost` is a different
     * number (17.9 against 15.2) and answers a question nobody asked.
     */
    breakEvenOdds: round1((100 * riseGain) / (riseGain + departureCost)),
    /** 2a-5: one device, value added in two countries, counted at every border. */
    componentValue: 25, deliveredValue: 70,
    grossTrade: 95,
    /** 2a-4: freight per unit, before and after, and the good it changes. */
    freightBefore: 12, freightAfter: 3,
    cheapGoodFactory: 8,
  };
})();

/* ══ The specification's own lists, in the specification's own words ════════ */

/*
 * TRANSCRIBED FROM THE SPEC SPAN AND THE ONLY SOURCE FOR THE LISTS ON THE PAGE. Each row carries a
 * SHORT form as well, because `gridColumns` throws when a table does not fit its 440-unit frame and
 * the full sentence belongs in prose, which wraps.
 */

/** 1 · Characteristics of globalisation — three leaves, :1587-1594. */
export const CHARACTERISTICS = [
  ['Trade as a proportion of GDP', 'Trade rising against output', 'Trade rises as a proportion of GDP: countries buy and sell more of what they produce'],
  ['TNCs and FDI', 'Firms and their money crossing borders', 'Transnational companies and foreign direct investment grow in importance'],
  ['Migration', 'People crossing borders to work', 'People move between countries in greater numbers'],
];

/** 2a · Factors contributing to increased globalisation in the last 50 years — five bullets, :1595-1600. */
export const CAUSES = [
  ['Trade liberalisation', 'Barriers to trade come down', 'Barriers to trade between countries are reduced or removed'],
  ['Trading blocs', 'More of them, and larger', 'The number and size of trading blocs increased'],
  ['Political change', 'Closed economies opened', 'The breakdown of the Soviet system and the opening up of China'],
  ['Transport and communications', 'Both got cheaper', 'The cost of moving goods and of communicating fell'],
  ['TNCs', 'Firms that produce in several countries', 'Transnational companies became more significant'],
];

/** 3a · Possible benefits of globalisation — six bullets, :1608-1613. */
export const BENEFITS = [
  ['Increased economic growth', 'Output rises'],
  ['Increased tax revenue', 'Governments collect more'],
  ['Economies of scale', 'A bigger market, a lower unit cost'],
  ['Lower prices and higher consumer surplus', 'Buyers pay less than they would have'],
  ['More choice', 'More kinds of the same good'],
  ['Higher living standards', 'More goods per person'],
];

/** 3b · Possible costs of globalisation — six bullets, :1614-1620. */
export const COSTS = [
  ['Displaced workers', 'Jobs lost where imports win'],
  ['Exploitation of workers', 'Conditions driven down'],
  ['Environmental impact of increased trade', 'More output, and all of it moves'],
  ['Loss of tax revenue from transfer pricing', 'Profit declared somewhere else'],
  ['Increased income inequality within countries', 'The gap inside a country widens'],
  ['The influence of TNCs on domestic economic policy', 'Policy shaped by the threat of leaving'],
];

/*
 * THE LADDER THIS SECTION DOES NOT TEACH. Every term below is 4.3.2 · 4 (`econ_spec.txt:1657-1673`)
 * and belongs to `trade-global-economy`. The runner refuses to find any of them in any surface,
 * including inside an SVG, so the five findings that ask for them cannot be satisfied by accident.
 */
export const LADDER_TERMS = [
  'trade creation', 'trade diversion', 'customs union', 'free-trade area', 'free trade area',
  'common market', 'economic and monetary union', 'monetary union', 'common external tariff', 'single market',
];

/*
 * THE WORDS THAT BELONG TO ANOTHER SPECIFICATION OR TO NO SPECIFICATION AT ALL, each measured.
 * `MNC` and `multinational` are the Business spec's; the rest are the audit's own vocabulary.
 */
export const OFF_SPEC_TERMS = [
  'MNC', 'multinational', 'race to the bottom', 'tax competition', 'deindustrialisation',
  'deindustrialization', 'brain drain', 'greenfield', 'stakeholder', 'portfolio investment',
  'world price', 'supply chain', 'value added', 'Brexit', 'tariff-free',
];

/** The words this section does teach, for the runner's "quizzed but not taught" check. */
export const TEACHING_TERMS = [
  ...CHARACTERISTICS.map(([k]) => k), ...CAUSES.map(([k]) => k),
  ...BENEFITS.map(([k]) => k), ...COSTS.map(([k]) => k),
  'globalisation', 'transnational', 'TNC', 'foreign direct investment', 'FDI',
  'consumer surplus', 'transfer pricing', 'trade liberalisation', 'economies of scale',
].map((s) => s.toLowerCase());

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
