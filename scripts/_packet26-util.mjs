/**
 * PACKET 26 — government-intervention helpers: the id scheme scripts/mint-item-ids.mjs uses, the
 * validator's own word counter, and the THREE markets this section carries across its body,
 * diagrams, notes and assessment.
 *
 * WHY THREE MARKETS AND NOT ONE. Packet 17's rule is that where a section's arithmetic recurs it is
 * defined once and every surface is generated from it. IAL Economics 1.3.6 · 1b is eight methods of
 * intervention, and they do not all act on the same kind of market: a tax and a permit are answers to
 * a cost the price does not carry, a subsidy is an answer to a benefit it does not carry, and a
 * maximum price is an answer to a price that carries everything and is still out of reach. One market
 * cannot show all three without lying about at least two of them.
 *
 * So there are three, all in one fictional city, OSIRA, which is what lets chapter 7 ask the question
 * the audit says the section never asks (`structure-07`): given THIS failure in THIS market, which
 * tool?
 *
 *   OSIRA COAL — an external cost of production, $ a tonne against tonnes a day
 *      demand  P = 120 − Q        MPC  P = 30 + 0.5Q      external cost $15 a tonne
 *      MSC = MPC + $15            P = 45 + 0.5Q
 *      market        Q = 60 at $60         social optimum   Q = 50 at $70
 *      welfare loss  ½ × $15 × 10 = $75 a day
 *      a $15 TAX          → Q = 50, buyers pay $70, sellers keep $55, revenue $750 a day
 *                           consumer incidence $10, producer incidence $5 — two to one
 *      a PERMIT CAP at 50 → Q = 50, buyers pay $70, and a permit trades at $15
 *      a MINIMUM PRICE of $70 → demanded 50, supplied 80, excess supply 30, and the $15 a tonne
 *                           goes to SELLERS with no $750 of revenue behind it
 *
 *   OSIRA CLINICS — an external benefit of consumption, $ a consultation against consultations a week
 *      MPB (demand)  P = 90 − Q   MPC = MSC  P = 15 + 0.5Q   external benefit $12 a consultation
 *      MSB = MPB + $12            P = 102 − Q
 *      market        Q = 50 at $40         social optimum   Q = 58 at $44
 *      welfare gain forgone  ½ × $12 × 8 = $48 a week
 *      a $12 SUBSIDY → Q = 58, buyers pay $32, providers receive $44, cost $696 a week
 *                      consumers gain $8, producers $4 — two to one, the same rule as the tax
 *
 *   OSIRA FLATS — affordability with no externality at all, $ a month against flats
 *      demand  P = 900 − 2Q       supply  P = 100 + 2Q
 *      market        Q = 200 at $500
 *      a MAXIMUM PRICE of $400 → demanded 250, supplied 150, EXCESS DEMAND 100 flats
 *                      150 renters $100 a month better off; 50 who rented before cannot now
 *
 * THE TWO FIGURES THAT DO THE MOST WORK are $15 and $70, because THREE different tools reach them.
 * A tax set at the external cost, a permit cap set at the social optimum and a minimum price set at
 * the optimum price all put the buyer's price at $70; the tax and the cap both put the quantity at
 * 50 and both put $15 a tonne between what a buyer pays and what the last tonne costs to make. What
 * differs is who receives the $15 and who has to know what in order to set the policy. That is the
 * comparison `specGap-05` asks for and `specGap-04` asks for half of, and it is arithmetic here
 * rather than a list of advantages and disadvantages.
 *
 * All three markets are fictional, as Zuri (packet 16), Tafari (17), Yusra Foods (19), Kavira
 * Ceramics (23), Sabaya (24) and Kumbe and Amara (25) were: the REAL examples carry the
 * internationalisation. One currency, dollars. No figure in this section appears anywhere except
 * through these functions.
 */
import { createHash } from 'node:crypto';

export const SECTION = 'government-intervention';
export const CITY = 'Osira';

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export const hash8 = (s) => createHash('sha1').update(norm(s)).digest('hex').slice(0, 8);
export const id = (kind, key) => `${SECTION}:${kind}:${hash8(key)}`;
export const subId = (s) => `${SECTION}:sub:${s}`;

export const round2 = (n) => Math.round(n * 100) / 100;

/* ── a line in price/quantity space ────────────────────────────────────────── */
const line = (at0, perUnit) => ({ at0, perUnit });
export const valueAt = (l, quantity) => round2(l.at0 + l.perUnit * quantity);
/** The quantity at which two lines meet. */
export const meet = (a, b) => round2((b.at0 - a.at0) / (a.perUnit - b.perUnit));
/** The quantity at which one line reaches a given price — what a price control needs. */
export const quantityAt = (l, price) => round2((price - l.at0) / l.perUnit);
/** A line lifted or dropped by a constant per-unit amount: an external cost, a tax, a subsidy. */
export const shifted = (l, by) => line(round2(l.at0 + by), l.perUnit);

/* ── Osira coal: an external cost of production (1b-1, 1b-3, 1b-4, 1b-5, 1b-7) ─ */

export const COAL = (() => {
  const demand = line(120, -1);
  const mpc = line(30, 0.5);
  const externalCost = 15;
  const msc = shifted(mpc, externalCost);
  const marketQ = meet(demand, mpc);
  const optimumQ = meet(demand, msc);
  const optimumP = valueAt(demand, optimumQ);

  /* A TAX SET AT THE EXTERNAL COST. The supply curve firms act on becomes MPC + tax, which is the
   * same line as MSC — that is the whole argument for setting the tax at the external cost, and it
   * is an identity here rather than a claim. */
  const tax = externalCost;
  const taxedSupply = shifted(mpc, tax);
  const taxedQ = meet(demand, taxedSupply);
  const buyerP = valueAt(demand, taxedQ);
  const sellerP = valueAt(mpc, taxedQ);

  /* A CAP SET AT THE SOCIAL OPTIMUM. Quantity is fixed at the optimum, so the price buyers will pay
   * is read off demand and the cost of the last tonne off MPC. The gap between them is what a permit
   * is worth: it is the difference the permit holder captures instead of the government. */
  const capQ = optimumQ;
  const capBuyerP = valueAt(demand, capQ);
  const capCostP = valueAt(mpc, capQ);

  /* AN OVERSHOOT, WHICH IS WHAT CHAPTER 8 DRAWS. A tax set at twice the external cost shifts supply
   * twice as far, so the quantity lands as far BELOW the optimum as the market was above it — and
   * because both lines are straight the welfare loss triangle is the same size on the other side.
   * The intervention has moved the loss rather than removed it, and it now also costs something to
   * run: 2a's "intervention that results in a net welfare loss", derived rather than asserted. */
  const wrongTax = round2(externalCost * 2);
  const wrongSupply = shifted(mpc, wrongTax);
  const wrongQ = meet(demand, wrongSupply);
  const wrongBuyerP = valueAt(demand, wrongQ);
  const wrongLoss = round2(0.5 * (valueAt(demand, wrongQ) - valueAt(msc, wrongQ)) * (optimumQ - wrongQ));

  /* A MINIMUM PRICE AT THE OPTIMUM PRICE. Buyers face the same $70 as under the tax, so the quantity
   * they buy is the same 50 — but sellers are now allowed to supply everything worth making at $70,
   * and the difference is excess supply. */
  const minPrice = optimumP;

  /* AN AD VALOREM RATE, so that specGap-03's "the spec expects students to draw both" can be drawn
   * rather than described. A percentage is a small amount on a cheap unit and a large one on an
   * expensive one, so the curve PIVOTS away from its foot and the gap widens as you move up it. The
   * two gaps below are exact at the ends of the frame and are the only figures the panel states:
   * an ad valorem equilibrium on these lines is not a round number and is not claimed. */
  const adValoremRate = 0.25;
  /* The slope is NOT rounded here: 0.5 × 1.25 = 0.625, and rounding it to two places would make the
   * gap at the right-hand edge of the frame disagree with the arithmetic the caption states. */
  const adValoremSupply = { at0: round2(mpc.at0 * (1 + adValoremRate)), perUnit: mpc.perUnit * (1 + adValoremRate) };

  return {
    name: `${CITY} coal`, good: 'coal', unit: 'tonne', units: 'tonnes', per: 'a day',
    adValoremRate, adValoremSupply,
    adValoremGapAt0: round2(valueAt(adValoremSupply, 0) - valueAt(mpc, 0)),
    adValoremGapAt90: round2(valueAt(adValoremSupply, 90) - valueAt(mpc, 90)),
    demand, mpc, msc, externalCost,
    marketQ, marketP: valueAt(demand, marketQ),
    optimumQ, optimumP,
    /* The triangle between MSC and demand, over the tonnes produced beyond the social optimum. */
    welfareLoss: round2(0.5 * externalCost * (marketQ - optimumQ)),
    tax, taxedSupply, taxedQ, buyerP, sellerP,
    consumerIncidence: round2(buyerP - valueAt(demand, marketQ)),
    producerIncidence: round2(valueAt(demand, marketQ) - sellerP),
    revenue: round2(tax * taxedQ),
    capQ, capBuyerP, capCostP,
    permitPrice: round2(capBuyerP - capCostP),
    minPrice,
    minDemanded: quantityAt(demand, minPrice),
    minSupplied: quantityAt(mpc, minPrice),
    minExcessSupply: round2(quantityAt(mpc, minPrice) - quantityAt(demand, minPrice)),
    /* What a seller gets per tonne under each of the two, which is the whole of specGap-04. */
    sellerUnderMinimum: minPrice,
    wrongTax, wrongSupply, wrongQ, wrongBuyerP, wrongLoss,
  };
})();

/* ── Osira clinics: an external benefit of consumption (1b-2, 1b-6, 1b-8) ──── */

export const CLINIC = (() => {
  const mpb = line(90, -1);
  const mpc = line(15, 0.5);
  const externalBenefit = 12;
  const msb = shifted(mpb, externalBenefit);
  const msc = mpc;                                 // no production externality in this market
  const marketQ = meet(mpb, mpc);
  const optimumQ = meet(msb, msc);
  const subsidy = externalBenefit;
  const subsidisedSupply = shifted(mpc, -subsidy);
  const subsidisedQ = meet(mpb, subsidisedSupply);
  const buyerP = valueAt(mpb, subsidisedQ);
  const providerP = round2(buyerP + subsidy);
  return {
    name: `${CITY} clinics`, good: 'clinic consultations', unit: 'consultation', units: 'consultations', per: 'a week',
    mpb, mpc, msb, msc, externalBenefit,
    marketQ, marketP: valueAt(mpb, marketQ),
    optimumQ, optimumP: valueAt(msc, optimumQ),
    /* A gain that is available and is not being taken — 1.3.5 · 2d's "welfare loss OR GAIN areas". */
    welfareGain: round2(0.5 * externalBenefit * (optimumQ - marketQ)),
    subsidy, subsidisedSupply, subsidisedQ, buyerP, providerP,
    consumerGain: round2(valueAt(mpb, marketQ) - buyerP),
    producerGain: round2(providerP - valueAt(mpb, marketQ)),
    cost: round2(subsidy * subsidisedQ),
  };
})();

/* ── Osira flats: affordability, and no externality anywhere in it (1b-3) ──── */
/*
 * This market has NO external cost and NO external benefit, and that is the reason it exists. Every
 * other market in the section is an answer to 1.3.5; a maximum price is the one tool on 1b's list
 * that governments reach for when nothing is failing in the 1.3.5 sense at all — the quantity is
 * right and the price is out of reach. Putting a maximum price on a market with an externality, as
 * the March section did by teaching both controls on one set of externality axes, is what makes
 * students answer "to correct market failure" to every question in this topic.
 */
export const FLATS = (() => {
  const demand = line(900, -2);
  const supply = line(100, 2);
  const marketQ = meet(demand, supply);
  const maxPrice = 400;
  const demanded = quantityAt(demand, maxPrice);
  const supplied = quantityAt(supply, maxPrice);
  return {
    name: `${CITY} flats`, good: 'rented flats', unit: 'flat', units: 'flats', per: 'a month',
    demand, supply,
    marketQ, marketP: valueAt(demand, marketQ),
    maxPrice, demanded, supplied,
    excessDemand: round2(demanded - supplied),
    saving: round2(valueAt(demand, marketQ) - maxPrice),
    /* Who is served and who is not: supply falls, so the shortfall against the old quantity is the
     * number of renters who had a flat at the market price and do not have one at the capped price. */
    pricedOut: round2(marketQ - supplied),
  };
})();

/* ── formatting ────────────────────────────────────────────────────────────── */

export const money = (n) => (Number.isInteger(n) ? `$${n.toLocaleString('en-GB')}` : `$${n.toFixed(2)}`);
export const qty = (n) => n.toLocaleString('en-GB');
export const pc = (n) => `${Number.isInteger(n) ? n : Number(n.toFixed(1))}%`;
/*
 * ONE MINUS SIGN for the whole section (packet 18 shipped 55 of one beside 13 of the other).
 */
export const MINUS = '−';
export const signedMoney = (n) => `${n < 0 ? MINUS : '+'}${money(Math.abs(n))}`;

/** The validator's own word counter, so the 350-word budget is measured the way step.words measures it. */
export function teachingWords(sec) {
  const normText = (s) => String(s ?? '').toLowerCase().replace(/\s+/g, ' ').trim();
  const words = (s) => normText(s).split(' ').filter(Boolean).length;
  const teaching = [sec?.keyIdea, ...(sec?.body || []).flatMap((b) => [b?.text, ...(b?.items || []), ...((b?.steps || []).map((s) => (typeof s === 'object' ? `${s.title} ${s.subtitle || ''}` : s))), b?.result]), sec?.realExample?.text, sec?.misconception, sec?.examMatters];
  return words(teaching.filter(Boolean).join(' '));
}
