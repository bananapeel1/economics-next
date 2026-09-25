/**
 * PACKET 39a — trade-global-economy, the arithmetic spine.
 *
 * IAL Economics Unit 4 (WEC14), topic 4.3.2 `audit/raw/econ_spec.txt:1626-1699`. This packet builds
 * sub-topics 1, 2 and 3 — nineteen leaves. Sub-topics 4 and 5 are packet 39b and the live
 * "Protectionism and the WTO" block is carried forward untouched until then.
 *
 * ════ THREE SPINES, AND EVERY PRINTED FIGURE IS DERIVED FROM ONE OF THEM ════
 *
 *  1. MERIDA and KALTO · two countries, two goods, linear costs (1a, 1b)
 *
 *     Merida: 120 grain OR 60 cloth.   Kalto: 40 grain OR 40 cloth.
 *     Merida is better at BOTH — which is the only arrangement under which the distinction the
 *     specification asks for (1b-1) actually bites. The opportunity costs differ, so each has a
 *     comparative advantage: grain costs Merida half a cloth and costs Kalto a whole one.
 *
 *     FULL specialisation gives 120 grain and 40 cloth against 80 and 50 without trade — MORE
 *     grain and LESS cloth, which is exactly the ambiguity `topFix-03` reports in the live diagram
 *     and exactly why this spine specialises PARTIALLY. Merida makes 100 grain and 10 cloth, Kalto
 *     makes 40 cloth: 100 grain and 50 cloth, so grain rises by 20 and cloth does not move. There
 *     is no second number to argue about, which is the whole point of the fix.
 *
 *     At 1.5 grain per cloth — inside the 1-to-2 range the two domestic ratios define — the 20
 *     units of gain split exactly ten and ten, and each country ends with more grain and the same
 *     cloth as it had on its own. Every one of those figures divides.
 *
 *  2. SAROVA · the terms of trade as an index (3a, 3b, 3c)
 *
 *     Base year: both price indices 100, so the terms of trade are 100 by construction.
 *     Next: export prices 120, import prices 110 → 120 ÷ 110 × 100 = 109.1, an improvement.
 *
 *     THE IMPROVEMENT MAKES THE COUNTRY WORSE OFF ON TWO OF THE THREE LEAVES 3c ASKS ABOUT, and
 *     that is the section's teaching point rather than a trick. Export demand has a price
 *     elasticity of 1.5, so a fifth on the price takes 30% off the volume: revenue is 1.20 × 0.70
 *     = 0.84 of what it was. On a balanced $50.0bn of trade that is $42.0bn of exports against
 *     $55.0bn of imports — a $13.0bn deficit out of an improvement.
 *
 *  3. THE SHARES · patterns and volume of world trade (2a, 2b)
 *
 *     Emerging economies' share of world exports 24% → 44%, so the advanced share is 76% → 56%:
 *     two numbers, and the other two are what is left. **Velora's** export mix moves from 70/30 to
 *     40/60 on exports that grow from $50.0bn to $60.0bn, so ore falls from $35.0bn to $24.0bn in
 *     VALUE while the total rises — the share-against-value trap that 2b is really about.
 *
 *     VELORA AND NOT SAROVA, AND VERIFY A IS WHY. The first draft hung this spine on Sarova, which
 *     already had a terms-of-trade story in which trade is balanced at $50.0bn and exports FALL to
 *     $42.0bn. The same fictional country then had exports growing to $60.0bn in one chapter and
 *     falling to $42.0bn in another, off the same $50.0bn base, with nothing to distinguish the two
 *     periods. Each block was internally derivable and the pair was not consistent, which is a class
 *     of defect no per-figure check can see: **one spine, one country, or the figures contradict**.
 *
 * ════ WHAT IS NOT HERE ════
 *
 * No Marshall-Lerner (it is `econ_spec.txt` 4.3.3 · 2f and the live quiz item that tests it is
 * moved out, owed to packet 40) and no Prebisch-Singer (0 hits in either specification; the live
 * quiz item ASSESSES it). No ladder of integration, no trade creation and no trade diversion: they
 * are 4.3.2 · 4 and they are packet 39b's, which is the same boundary packets 33 and 34 each
 * established from the other side.
 *
 * No real country, no real firm, no year, no sourced figure. Money is in dollars and the one minus
 * sign is U+2212, emitted by `money` itself (packet 18).
 */
import { createHash } from 'node:crypto';

export const SECTION = 'trade-global-economy';

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export const hash8 = (s) => createHash('sha1').update(norm(s)).digest('hex').slice(0, 8);
export const id = (kind, key) => `${SECTION}:${kind}:${hash8(key)}`;
export const subId = (s) => `${SECTION}:sub:${s}`;

export const round2 = (n) => Math.round(n * 100) / 100;
export const round1 = (n) => Math.round(n * 10) / 10;

/* ── formatting: one formatter per kind of figure (packet 18) ──────────────── */

export const MINUS = '−';
export const money = (n) => `${n < 0 ? MINUS : ''}$${Number.isInteger(Math.abs(n)) ? Math.abs(n).toLocaleString('en-GB') : Math.abs(n).toFixed(2)}`;
/** Billions, as the national accounts print them: one decimal and no more (packet 21). */
export const bn = (n) => `$${round1(n).toFixed(1)}bn`;
export const qty = (n) => (Number.isInteger(n) ? n.toLocaleString('en-GB') : n.toFixed(2));
export const pct = (n) => `${Number.isInteger(n) ? n : round1(n).toFixed(1)}%`;
/** An index number: one decimal, because 109.09 is not what a student's calculator shows them. */
export const idx = (n) => round1(n).toFixed(1);

/* ══ MERIDA and KALTO · specialisation and comparative advantage (1a, 1b) ══ */

/*
 * A LINEAR PPF IS TWO NUMBERS, AND EVERYTHING ELSE IS DIVISION. Change `grainMax` or `clothMax` for
 * either country and the table, the diagram, the worked example, the fill-in, the flashcards and
 * the quiz items all move together — the constraint packet 17 set and packets 20, 24, 28, 29, 31
 * and 34 each re-earned.
 *
 * THE RATIOS ARE PRINTED AS THE PAGE DIVIDES THEM. `costOfGrain` is cloth given up per grain, and
 * it is computed from the two maxima rather than written down, because a reader who changes a
 * maximum must not be able to leave a stale ratio behind. Packet 34's layer 6 found a printed
 * ratio that did not divide its printed quantities; here there is no second copy of any ratio.
 */
const country = (name, grainMax, clothMax, adjective) => {
  const costOfGrain = clothMax / grainMax;   // cloth given up per unit of grain
  const costOfCloth = grainMax / clothMax;   // grain given up per unit of cloth
  return {
    name, adjective, grainMax, clothMax, costOfGrain, costOfCloth,
    /** Half the resources on each good: the no-trade comparison the gain is measured against. */
    autarky: { grain: grainMax / 2, cloth: clothMax / 2 },
    /** Grain that can still be made after `cloth` units of cloth, and the reverse. */
    grainAfterCloth: (cloth) => grainMax - cloth * costOfCloth,
    clothAfterGrain: (grain) => clothMax - grain * costOfGrain,
  };
};

export const MERIDA = country('Merida', 120, 60, 'Meridan');
export const KALTO = country('Kalto', 40, 40, 'Kaltan');

export const TRADE = (() => {
  const A = MERIDA, B = KALTO;

  /* Who should make what: the lower opportunity cost, computed, not asserted. */
  const grainSpecialist = A.costOfGrain < B.costOfGrain ? A : B;
  const clothSpecialist = A.costOfCloth < B.costOfCloth ? A : B;

  /* Without trade: half the resources on each good in each country. */
  const noTrade = {
    grain: A.autarky.grain + B.autarky.grain,
    cloth: A.autarky.cloth + B.autarky.cloth,
  };

  /*
   * PARTIAL SPECIALISATION, CHOSEN SO THAT ONE GOOD IS UNCHANGED. Kalto goes fully into cloth (40).
   * Merida then makes exactly the cloth the world is short of — `noTrade.cloth` minus Kalto's 40 —
   * and puts everything else into grain. Cloth is identical by construction, so the whole gain is
   * the grain figure and there is nothing to trade off. `topFix-03` asks for precisely this.
   */
  const kaltoCloth = B.clothMax;
  const meridaCloth = noTrade.cloth - kaltoCloth;
  const meridaGrain = A.grainAfterCloth(meridaCloth);
  const withTrade = { grain: meridaGrain, cloth: meridaCloth + kaltoCloth };
  const gain = { grain: withTrade.grain - noTrade.grain, cloth: withTrade.cloth - noTrade.cloth };

  /*
   * THE RATE AT WHICH THEY SWAP has to sit between the two domestic costs of cloth or one of them
   * refuses the deal. Merida gives up 2 grain per cloth at home, Kalto gives up 1: anything
   * strictly between 1 and 2 works, and the midpoint is 1.5.
   */
  const rateLow = Math.min(A.costOfCloth, B.costOfCloth);
  const rateHigh = Math.max(A.costOfCloth, B.costOfCloth);
  const rate = (rateLow + rateHigh) / 2;             // grain per cloth
  const clothTraded = B.clothMax - B.autarky.cloth;  // Kalto ships what it no longer consumes... 20
  const grainTraded = clothTraded * rate;            // ...and is paid in grain

  const after = {
    merida: { grain: meridaGrain - grainTraded, cloth: meridaCloth + clothTraded },
    kalto: { grain: grainTraded, cloth: kaltoCloth - clothTraded },
  };
  const gainsFor = (c, key) => ({
    grain: after[key].grain - c.autarky.grain,
    cloth: after[key].cloth - c.autarky.cloth,
  });

  return {
    grainSpecialist, clothSpecialist, noTrade, withTrade, gain,
    meridaGrain, meridaCloth, kaltoCloth,
    rate, rateLow, rateHigh, clothTraded, grainTraded, after,
    meridaGains: gainsFor(A, 'merida'),
    kaltoGains: gainsFor(B, 'kalto'),
  };
})();

/*
 * WHEN COMPARATIVE ADVANTAGE MOVES (2a-2). Kalto's grain productivity doubles: 80 grain or 40
 * cloth. Its cost of cloth becomes 2 grain — Merida's exactly — and when two countries have the
 * same opportunity costs there is no comparative advantage in either direction and no gain left to
 * split. That is a leaf the specification names and a statement a student can check by dividing.
 */
export const KALTO_LATER = country('Kalto', 80, 40, 'Kaltan');
export const ADVANTAGE_GONE = KALTO_LATER.costOfCloth === MERIDA.costOfCloth;

/* ══ SAROVA · the terms of trade (3a, 3b, 3c) ═════════════════════════════ */

/*
 * THE TERMS OF TRADE ARE ONE DIVISION, AND THE SPECIFICATION ASKS FOR THE CALCULATION (3a). The
 * formula is the subject's, not a quotation: `index of` is 0 hits in both specification documents,
 * so `specGap-01`'s wording is the finding's own and is not repeated as though it were the spec's.
 *
 * THE PRINTED RATIO DIVIDES THE PRINTED INDICES. 120 ÷ 110 × 100 is 109.0909…; the page prints
 * 109.1 and a student's calculator agrees. Packet 34's layer 6 caught the opposite case and this
 * module has no second copy of the number to go stale.
 */
const tot = (xp, mp) => round1((100 * xp) / mp);

export const SAROVA = (() => {
  const name = 'Sarova';
  const base = { exportPrices: 100, importPrices: 100 };
  const now = { exportPrices: 120, importPrices: 110 };

  const totBase = tot(base.exportPrices, base.importPrices);
  const totNow = tot(now.exportPrices, now.importPrices);

  /* Export demand is elastic, so the price rise costs more volume than it gains in price. */
  const pedExports = 1.5;
  const priceRise = now.exportPrices / base.exportPrices - 1;      // 0.20
  const volumeFall = pedExports * priceRise;                        // 0.30
  const volumeIndex = round1(100 * (1 - volumeFall));               // 70.0
  const revenueIndex = round1(100 * (now.exportPrices / 100) * (1 - volumeFall)); // 84.0

  /* Trade was balanced in the base year, which is what makes the deficit readable. */
  const baseFlow = 50;
  const exportsNow = round1(baseFlow * (revenueIndex / 100));
  const importsNow = round1(baseFlow * (now.importPrices / 100));
  const balance = round1(exportsNow - importsNow);

  /* What a unit of exports buys in imports: the living-standards leaf, 3c-2. */
  const importsPerExport = round2(now.exportPrices / now.importPrices);

  return {
    name, base, now, totBase, totNow, pedExports,
    priceRisePct: round1(100 * priceRise), volumeFallPct: round1(100 * volumeFall),
    volumeIndex, revenueIndex, baseFlow, exportsNow, importsNow, balance, importsPerExport,
    improved: totNow > totBase,
    tot,
  };
})();

/*
 * THE EXCHANGE RATE LEAF (3b-4) AND ITS ARITHMETIC. A fifth off the currency: 2.00 foreign per
 * domestic becomes 1.60. A good priced 100 at home sells abroad for 200 and then for 160; an
 * import priced 200 abroad costs 100 at home and then 125. Both divide exactly, which is the only
 * reason those four numbers were chosen.
 */
export const CURRENCY = (() => {
  const before = 2, fall = 0.2;
  const after = round2(before * (1 - fall));
  const homePrice = 100, foreignPrice = 200;
  return {
    before, after, fallPct: round1(100 * fall),
    homePrice,
    exportAbroadBefore: round1(homePrice * before),
    exportAbroadAfter: round1(homePrice * after),
    foreignPrice,
    importAtHomeBefore: round1(foreignPrice / before),
    importAtHomeAfter: round1(foreignPrice / after),
  };
})();

/* ══ THE SHARES · patterns and volume of world trade (2a, 2b) ═════════════ */

export const SHARES = (() => {
  const name = 'Velora';
  const emergingThen = 24, emergingNow = 44;
  const mix = { oreThen: 70, oreNow: 40 };
  /*
   * 80 AND 100, NOT 50 AND 60. Velora's first figures shared a $50.0bn with Sarova's balanced base
   * and a 60 with its export volume, so the two spines printed the same quantities under different
   * names — the residue of the same defect, caught by the one-spine-one-country check rather than
   * by reading. Nothing else about the leaf changes: ore still falls in VALUE while the total rises.
   */
  const exportsThen = 80, exportsNow = 100;
  const val = (total, share) => round1(total * (share / 100));
  return {
    name,
    emergingThen, emergingNow,
    advancedThen: 100 - emergingThen, advancedNow: 100 - emergingNow,
    emergingGain: emergingNow - emergingThen,
    years: 30,
    ...mix, manufacturesThen: 100 - mix.oreThen, manufacturesNow: 100 - mix.oreNow,
    exportsThen, exportsNow,
    oreValueThen: val(exportsThen, mix.oreThen),
    oreValueNow: val(exportsNow, mix.oreNow),
    manufacturesValueThen: val(exportsThen, 100 - mix.oreThen),
    manufacturesValueNow: val(exportsNow, 100 - mix.oreNow),
  };
})();

/* ══ The specification's own lists, so nothing is built from memory ═══════ */

/** 2a: the five factors influencing patterns of trade, `econ_spec.txt:1638-1643`. */
export const PATTERN_FACTORS = [
  ['impact of emerging economies', 'emerging-economies'],
  ['changes in comparative advantage', 'changes-in-comparative-advantage'],
  ['growth in trading blocs and bilateral trading agreements', 'trading-blocs-and-bilateral-agreements'],
  ['changes in relative exchange rates', 'relative-exchange-rates'],
  ['changes in protectionism between countries', 'changes-in-protectionism'],
];

/** 3b: the five factors influencing the terms of trade, `econ_spec.txt:1648-1652`. */
export const TOT_FACTORS = [
  ['relative inflation rates', 'relative-inflation-rates'],
  ['relative productivity rates', 'relative-productivity-rates'],
  ['relative labour costs', 'relative-labour-costs'],
  ['the exchange rate', 'the-exchange-rate'],
  ['the prices of imports and exports', 'the-prices-of-imports-and-exports'],
];

/** 3c: what a change in the terms of trade affects, `econ_spec.txt:1654-1656`. */
export const TOT_IMPACTS = ['export revenues', 'living standards', 'balance of trade'];

/*
 * THE LADDER IS PACKET 39b's, AND THE RUNNER ENFORCES THAT ON WHAT THIS PACKET AUTHORS. Packets 33
 * and 34 each removed this vocabulary from a section that did not own it; 39a is the section that
 * DOES own it, and still must not teach it yet, because the block that will carry it is not built.
 * Scoped to the new blocks only: the carried-forward protectionism block and the quiz items held
 * for 39b legitimately contain some of these words.
 */
export const LADDER_TERMS = [
  'trade creation', 'trade diversion', 'customs union', 'common market',
  'economic and monetary union', 'monetary union', 'common external tariff', 'single market',
];

/*
 * BANNED EVERYWHERE IN THE BUNDLE, and asserted over every string rather than trusted to the
 * removal. Both are named by the live quiz bank and both belong to another topic or to none.
 */
export const OFF_SPEC_TERMS = [
  'Marshall-Lerner', 'Marshall Lerner', 'Prebisch-Singer', 'Prebisch Singer',
  'J-curve', 'current account', 'terms-of-trade index',
];

/** The words this packet's blocks teach, for the runner's "assessed but not taught" check. */
export const TEACHING_TERMS = [
  ...PATTERN_FACTORS.map(([k]) => k), ...TOT_FACTORS.map(([k]) => k), ...TOT_IMPACTS,
  'specialisation', 'absolute advantage', 'comparative advantage', 'opportunity cost',
  'terms of trade', 'free trade', 'emerging economies', 'bilateral trading agreements',
  'trade flows', 'export revenues', 'living standards', 'balance of trade',
  'price elasticity of demand', 'index', 'protectionism', 'exchange rate',
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
