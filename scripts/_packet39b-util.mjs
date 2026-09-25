/**
 * PACKET 39b — trade-global-economy, the arithmetic spine for sub-topics 4 and 5.
 *
 * IAL Economics Unit 4 (WEC14), `audit/raw/econ_spec.txt:1657-1699` — 27 leaves. Packet 39a built
 * sub-topics 1-3 and its spine lives in `_packet39-util.mjs`; the formatters and the id scheme are
 * imported from there so the two halves of one section cannot drift apart.
 *
 * ════ THREE SPINES, AND EVERY PRINTED FIGURE DIVIDES ════
 *
 *  1. ONE MARKET, THREE TOOLS (5b-1, 5b-2, 5b-4, 5c-1..5)
 *
 *     World price $20, linear domestic curves: at $20 demand is 100 and supply 20, at $30 demand is
 *     80 and supply 40. A $10 tariff, a 40-unit quota and a $10 subsidy are then the SAME market
 *     measured three ways, which is the only honest way to teach why a government picks one.
 *
 *     Tariff:  consumers lose (100+80)/2 x 10 = 900, producers gain (20+40)/2 x 10 = 300 (area a),
 *              government takes 10 x 40 = 400 (area c), deadweight loss 200 = b 100 + d 100.
 *     Quota:   identical price and identical 900 and 300 — but the 400 is quota RENT to the licence
 *              holder, not revenue, and that is the whole difference.
 *     Subsidy: consumers still pay the world $20, so demand stays 100 and only supply moves 20->40.
 *              Government pays 400, producers gain 300, loss is 100 — HALF the tariff's, because
 *              there is no consumption distortion at all.
 *
 *     THE ADDING-UP IS THE POINT, NOT DECORATION. 300 + 100 + 400 + 100 = 900 exactly, so
 *     `accuracy-01` becomes demonstrable: the net loss exists because 900 exceeds 300 PLUS 400, not
 *     because 300 is smaller than 900. The live text states the second, which is trivially true of
 *     any tariff and teaches the wrong comparison.
 *
 *  2. TRADE CREATION AND TRADE DIVERSION (4c-1, 4c-2)
 *
 *     One cost table — Home 100, Partner 80, Outside 70 — and two tariff rates, giving opposite
 *     answers from the same three numbers.
 *
 *     At 50%: Partner 120, Outside 105, so Home supplies at 100. Join, and Partner supplies at 80:
 *             the country's real cost falls 100 -> 80. CREATION, a genuine saving of 20.
 *     At 20%: Partner 96, Outside 84, so Outside supplies. The consumer pays 84, but 14 of that is
 *             tariff the country pays ITSELF, so the real cost is 70. Join, and Partner supplies at
 *             80: the consumer price FALLS 84 -> 80 while the real cost RISES 70 -> 80. DIVERSION,
 *             a loss of 10 behind a lower price.
 *
 *     A cheaper shop window and a poorer country is the whole of 4c-2 and the thing students miss.
 *
 *  3. THE BLOC'S OTHER ARITHMETIC (4c-3, 4c-4, 4c-5)
 *
 *     Scale: 10,000 units at $50 in the home market alone, 40,000 at $40 inside the bloc.
 *     Transaction costs: 2% of a $25.0m flow is $0.5m a year, gone when the currency is shared.
 *     Costs and prices: removing a 12% tariff takes a $50 import to $44.64 — and the 5b spine's own
 *     $30 back to $20, which is the same leaf seen from the other side.
 *
 * ════ WHAT IS NOT HERE ════
 *
 * No real country, no real firm, no year, no sourced figure — with ONE deliberate exception. The
 * WTO is named by the specification itself (4a) and cannot be taught anonymously; nothing else real
 * is named. No Marshall-Lerner and no Prebisch-Singer: they are 4.3.3 and nowhere respectively, and
 * 39a removed the live items that tested them.
 */
import { SECTION, id, subId, qty, pct, money, bn, round1, round2 } from './_packet39-util.mjs';

export { SECTION, id, subId, qty, pct, money, bn, round1, round2 };

/** A thousands-formatted count of physical units, distinct from money and from an index. */
export const units = (n) => Number(n).toLocaleString('en-GB');

/* ══ 1 · ONE MARKET, THREE TOOLS ═══════════════════════════════════════════ */

/*
 * TWO POINTS DEFINE EACH LINEAR CURVE and everything else is geometry. Change a point and the
 * welfare areas, the diagram, the fill-ins, the flashcards and the quiz items all move together;
 * there is no second copy of any area anywhere in this packet.
 */
const MARKET = {
  worldPrice: 20,
  tariff: 10,
  atWorld: { demand: 100, supply: 20 },
  atProtected: { demand: 80, supply: 40 },
};

export const TARIFF = (() => {
  const { worldPrice, tariff, atWorld, atProtected } = MARKET;
  const protectedPrice = worldPrice + tariff;

  const importsBefore = atWorld.demand - atWorld.supply;
  const importsAfter = atProtected.demand - atProtected.supply;

  /* Each area is the geometry of the figure, computed, never written down. */
  const a = ((atWorld.supply + atProtected.supply) / 2) * tariff;        // producer surplus gained
  const b = (1 / 2) * (atProtected.supply - atWorld.supply) * tariff;    // production distortion
  const c = tariff * importsAfter;                                       // government revenue
  const d = (1 / 2) * (atWorld.demand - atProtected.demand) * tariff;    // consumption distortion
  const consumerLoss = ((atWorld.demand + atProtected.demand) / 2) * tariff;

  return {
    ...MARKET, protectedPrice, importsBefore, importsAfter,
    a, b, c, d, consumerLoss,
    deadweight: b + d,
    /** The identity the section is built on, asserted by the runner rather than trusted. */
    addsUp: round2(a + b + c + d) === round2(consumerLoss),
    /** What `accuracy-01` says the live text gets wrong, stated as the two comparisons. */
    rightComparison: `${money(consumerLoss)} lost by consumers against ${money(a)} gained by producers plus ${money(c)} raised by the government`,
    wrongComparison: `${money(a)} against ${money(consumerLoss)}`,
  };
})();

export const QUOTA = (() => {
  const t = TARIFF;
  /* A quota set at the tariff's import volume reproduces the tariff's price exactly. */
  const limit = t.importsAfter;
  return {
    limit,
    price: t.protectedPrice,
    consumerLoss: t.consumerLoss,
    producerGain: t.a,
    /** The tariff's area c, and the ONLY thing that differs: it is rent, not revenue. */
    rent: t.c,
    deadweight: t.deadweight,
  };
})();

export const SUBSIDY = (() => {
  const { worldPrice, tariff, atWorld, atProtected } = MARKET;
  /*
   * A per-unit subsidy of the same $10 moves the SUPPLY curve, not the price. Producers behave as
   * if the price were $30 and so supply 40; consumers still face the world $20 and so still demand
   * 100. Imports fall by exactly the extra domestic output and by nothing else.
   */
  const perUnit = tariff;
  const domesticBefore = atWorld.supply;
  const domesticAfter = atProtected.supply;
  const cost = perUnit * domesticAfter;
  const producerGain = ((domesticBefore + domesticAfter) / 2) * perUnit;
  return {
    perUnit, price: worldPrice,
    demand: atWorld.demand,
    domesticBefore, domesticAfter,
    importsBefore: atWorld.demand - domesticBefore,
    importsAfter: atWorld.demand - domesticAfter,
    cost, producerGain,
    /** Only the production distortion: area b, and no area d at all. */
    deadweight: cost - producerGain,
  };
})();

/* ══ 2 · TRADE CREATION AND TRADE DIVERSION ════════════════════════════════ */

const SOURCES = { home: 100, partner: 80, outside: 70 };

/** What a buyer pays from each source at a given external tariff, and who therefore wins. */
function marketAt(tariffPct, { blocWithPartner }) {
  const withTariff = (cost) => round2(cost * (1 + tariffPct / 100));
  const prices = {
    home: SOURCES.home,
    partner: blocWithPartner ? SOURCES.partner : withTariff(SOURCES.partner),
    outside: withTariff(SOURCES.outside),
  };
  const winner = Object.keys(prices).reduce((best, k) => (prices[k] < prices[best] ? k : best), 'home');
  /*
   * REAL COST IS NOT THE PRICE PAID. A tariff on an import is money the country hands itself, so
   * the resources it gives up are the supplier's own cost. Getting this wrong is what makes
   * diversion look like a gain.
   */
  const realCost = SOURCES[winner];
  return { tariffPct, prices, winner, pricePaid: prices[winner], realCost };
}

export const BLOC = (() => {
  const creation = {
    before: marketAt(50, { blocWithPartner: false }),
    after: marketAt(50, { blocWithPartner: true }),
  };
  const diversion = {
    before: marketAt(20, { blocWithPartner: false }),
    after: marketAt(20, { blocWithPartner: true }),
  };
  return {
    sources: SOURCES,
    creation: { ...creation, realSaving: creation.before.realCost - creation.after.realCost },
    diversion: {
      ...diversion,
      realLoss: diversion.after.realCost - diversion.before.realCost,
      priceFall: diversion.before.pricePaid - diversion.after.pricePaid,
    },
  };
})();

/* ══ 3 · THE BLOC'S OTHER ARITHMETIC ═══════════════════════════════════════ */

export const SCALE = (() => {
  const homeOnly = { output: 10000, unitCost: 50 };
  const blocWide = { output: 40000, unitCost: 40 };
  return {
    homeOnly, blocWide,
    fall: homeOnly.unitCost - blocWide.unitCost,
    fallPct: round1((100 * (homeOnly.unitCost - blocWide.unitCost)) / homeOnly.unitCost),
    timesLarger: round1(blocWide.output / homeOnly.output),
  };
})();

export const FRICTION = (() => {
  const flow = 25.0;          // $m of cross-border sales a year
  const ratePct = 2;          // conversion and paperwork, as a share of the flow
  const saving = round2((flow * ratePct) / 100);
  const tariffPct = 12;
  const importPrice = 50;
  return {
    flow, ratePct, saving,
    tariffPct, importPrice,
    /** Removing a 12% tariff from a price that INCLUDES it: 50 / 1.12, not 50 x 0.88. */
    priceAfter: round2(importPrice / (1 + tariffPct / 100)),
    naiveWrong: round2(importPrice * (1 - tariffPct / 100)),
  };
})();

/**
 * The infant industry case, as the argument actually claims it works: unit cost falls with
 * CUMULATIVE output, and the industry is uncompetitive until it has produced enough. Protection is
 * meant to cover the shaded years and stop.
 */
export const INFANT = (() => {
  const worldPrice = 50;
  const points = [[0, 90], [20, 74], [40, 62], [60, 54], [80, 50], [100, 48]];
  const crossesAt = points.find(([, c]) => c <= worldPrice)[0];
  return { worldPrice, points, crossesAt, startCost: points[0][1], endCost: points[points.length - 1][1] };
})();

/* ══ the specification's own lists, so a leaf cannot be quietly dropped ═════ */

/** 4b: the four rungs, each defined by the ONE freedom it adds to the rung below. */
export const LADDER = [
  ['free-trade area', 'Members drop tariffs on each other and each keeps its own tariff on outsiders.'],
  ['customs union', 'Members add a common external tariff, so an import faces the same rate whichever member it enters through.'],
  ['common market', 'Members add free movement of factors of production: labour and capital cross internal borders as freely as goods.'],
  ['economic and monetary union', 'Members add a shared currency and a single monetary policy, and accept common rules on their public finances.'],
];

/** 4c: the six costs and benefits, in the specification's order. */
export const MEMBERSHIP = [
  ['trade creation', 'ECON-4.3.2-4c-1'],
  ['trade diversion', 'ECON-4.3.2-4c-2'],
  ['costs and prices', 'ECON-4.3.2-4c-3'],
  ['economies of scale', 'ECON-4.3.2-4c-4'],
  ['transaction costs', 'ECON-4.3.2-4c-5'],
  ['movement of factors of production', 'ECON-4.3.2-4c-6'],
];

/** 5a: the six reasons, in the specification's order and its words. */
export const REASONS = [
  ['infant and geriatric industries', 'ECON-4.3.2-5a-1'],
  ['domestic industries and employment', 'ECON-4.3.2-5a-2'],
  ['national security', 'ECON-4.3.2-5a-3'],
  ['dumping', 'ECON-4.3.2-5a-4'],
  ['a deficit on the current account of the balance of payments', 'ECON-4.3.2-5a-5'],
  ['revenue', 'ECON-4.3.2-5a-6'],
];

/** 5b: the four tools. */
export const TOOLS = ['tariffs', 'quotas', 'non-tariff barriers', 'subsidies to domestic producers'];

/** 5c: the five groups a protectionist policy lands on. */
export const IMPACTS = ['consumers', 'producers', 'governments', 'living standards', 'equality'];

/**
 * Terms this packet must not use, because they belong to another topic or to no specification.
 * `current account` is NOT among them: 5a-5 names it as a reason for restricting trade, so this
 * half teaches it where 39a was right to keep it out.
 */
export const OFF_SPEC_39B = ['Marshall-Lerner', 'Prebisch-Singer', 'J-curve', 'optimum currency area'];
