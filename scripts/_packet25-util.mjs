/**
 * PACKET 25 — market-failure helpers: the id scheme scripts/mint-item-ids.mjs uses, the validator's
 * own word counter, and the TWO markets this section carries across its body, diagrams, notes and
 * assessment.
 *
 * WHY TWO MARKETS AND NOT ONE. Packet 17's rule is that where a section's arithmetic recurs, it is
 * defined once and every surface is generated from it. IAL Economics 1.3.5 · 2d names exactly two
 * diagrams and they are not the same diagram with a sign flipped:
 *
 *      "The use of diagrams, using marginal analysis, to illustrate:
 *         • the external benefits from consumption
 *         • the external costs from production
 *         • the distinction between the market and social optimum positions;
 *           identification of the welfare loss or gain areas."          econ_spec.txt:744-748
 *
 * One is a cost on the supply side and produces a welfare LOSS; the other is a benefit on the demand
 * side and produces a welfare GAIN that is available and not being taken. specGap-04 is that the
 * March section called both of them a loss. So there are two markets here, each with its own pair of
 * lines, and the runner re-derives every figure in both from these functions.
 *
 *   KUMBE CEMENT — an external cost of PRODUCTION, $ a tonne against tonnes a day
 *      MPB (demand)  P = 60 − 0.5Q        MPC  P = 10 + 0.5Q        external cost $10 a tonne
 *      MSC = MPC + $10                    P = 20 + 0.5Q
 *      market        Q = 50 at $35        social optimum   Q = 40 at $40
 *      welfare loss  ½ × $10 × 10 = $50 a day
 *      total external cost at the market quantity            $10 × 50 = $500 a day
 *
 *   AMARA SKILLS — an external benefit of CONSUMPTION, $ a course against courses a week
 *      MPB (demand)  P = 100 − 2Q         MPC = MSC  P = 20 + 2Q     external benefit $12 a course
 *      MSB = MPB + $12                    P = 112 − 2Q
 *      market        Q = 20 at $60        social optimum   Q = 23 at $66
 *      welfare gain  ½ × $12 × 3 = $18 a week
 *      total external benefit at the market quantity         $12 × 20 = $240 a week
 *
 * THE TWO FIGURES THAT MATTER MOST ARE THE TWO A STUDENT CONFUSES. In Kumbe the welfare loss is $50
 * and the total external cost is $500 — ten times apart, in one market, on one diagram. That is the
 * confusion `quiz-01` was keyed into: the March Q18 marked "the area between MSC and MPC up to the
 * free market quantity" as the welfare loss when it is the total external cost, while Q5 in the same
 * bank keyed the opposite. Packet 0 fixed the item; this section is built so the distinction is
 * arithmetic a student can check rather than two option texts they have to tell apart.
 *
 * Both markets are fictional and given no country, as Zuri (packet 16), Tafari (17), Yusra Foods (19),
 * Kavira Ceramics (23) and Sabaya (24) were: the REAL examples carry the internationalisation. One
 * currency, dollars. No figure below appears anywhere in the section except through these functions.
 */
import { createHash } from 'node:crypto';

export const SECTION = 'market-failure';

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export const hash8 = (s) => createHash('sha1').update(norm(s)).digest('hex').slice(0, 8);
export const id = (kind, key) => `${SECTION}:${kind}:${hash8(key)}`;
export const subId = (s) => `${SECTION}:sub:${s}`;

export const round2 = (n) => Math.round(n * 100) / 100;

/* ── a line in marginal space ──────────────────────────────────────────────── */
/*
 * Every line here is a VALUE PER UNIT read against a quantity — dollars a tonne against tonnes, not
 * a total. That is what "marginal analysis" means in 2d, and it is the one thing a student has to
 * hold on to: the height of a curve at a quantity is what the NEXT unit is worth or costs, and the
 * AREA under it over a range is the total. The welfare triangle is an area; the external cost is an
 * area; the gap between two curves is a height. Storing the lines this way keeps those three things
 * separable in the code, which is the same separation the section teaches.
 */
const line = (at0, perUnit) => ({ at0, perUnit });
export const valueAt = (l, quantity) => round2(l.at0 + l.perUnit * quantity);
/** The quantity at which two lines meet: where what the next unit is worth equals what it costs. */
export const meet = (a, b) => round2((b.at0 - a.at0) / (a.perUnit - b.perUnit));
/** A line lifted or dropped by a constant per-unit amount — an external cost or benefit per unit. */
export const shifted = (l, by) => line(round2(l.at0 + by), l.perUnit);

/* ── Kumbe Cement: an external cost of production (2d-2) ───────────────────── */

export const KUMBE = (() => {
  const mpb = line(60, -0.5);
  const mpc = line(10, 0.5);
  const externalCost = 10;
  const msc = shifted(mpc, externalCost);
  const msb = mpb;                                   // no consumption externality in this market
  const marketQ = meet(mpb, mpc);
  const optimumQ = meet(mpb, msc);
  return {
    name: 'Kumbe Cement',
    good: 'cement', unit: 'tonne', units: 'tonnes', per: 'a day',
    mpb, mpc, msc, msb, externalCost,
    marketQ, marketP: valueAt(mpb, marketQ),
    optimumQ, optimumP: valueAt(msc, optimumQ),
    /* The triangle between MSC and MPB, over the units produced beyond the social optimum. */
    welfareLoss: round2(0.5 * externalCost * (marketQ - optimumQ)),
    /* The rectangle between MSC and MPC, over EVERY unit produced. A different shape and a different
     * number, and the one the March Q18 keyed as the welfare loss. */
    totalExternalCost: round2(externalCost * marketQ),
    externalCostAtOptimum: round2(externalCost * optimumQ),
  };
})();

/* ── Amara Skills: an external benefit of consumption (2d-1) ───────────────── */

export const AMARA = (() => {
  const mpb = line(100, -2);
  const mpc = line(20, 2);
  const externalBenefit = 12;
  const msb = shifted(mpb, externalBenefit);
  const msc = mpc;                                   // no production externality in this market
  const marketQ = meet(mpb, mpc);
  const optimumQ = meet(msb, msc);
  return {
    name: 'Amara Skills',
    good: 'training courses', unit: 'course', units: 'courses', per: 'a week',
    mpb, mpc, msc, msb, externalBenefit,
    marketQ, marketP: valueAt(mpb, marketQ),
    optimumQ, optimumP: valueAt(msc, optimumQ),
    /* The triangle between MSB and MSC, over the units NOT being consumed. It is a gain that is
     * available and is not being taken — which is why 2d says "welfare loss OR GAIN areas" and why
     * calling it a loss, as the March section did, loses the distinction (specGap-04). */
    welfareGain: round2(0.5 * externalBenefit * (optimumQ - marketQ)),
    totalExternalBenefit: round2(externalBenefit * marketQ),
    externalBenefitAtOptimum: round2(externalBenefit * optimumQ),
  };
})();

/* ── formatting ────────────────────────────────────────────────────────────── */

export const money = (n) => (Number.isInteger(n) ? `$${n.toLocaleString('en-GB')}` : `$${n.toFixed(2)}`);
export const qty = (n) => n.toLocaleString('en-GB');
export const pc = (n) => `${Number.isInteger(n) ? n : Number(n.toFixed(1))}%`;
/*
 * ONE MINUS SIGN for the whole section (packet 18 shipped 55 of one beside 13 of the other): a
 * negative typed by hand carries U+2212 and one printed by JavaScript carries an ASCII hyphen.
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
