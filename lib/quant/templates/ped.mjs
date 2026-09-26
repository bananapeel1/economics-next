import { num, round, GOODS } from '../format.mjs';

/** A price as a till prints it: `$50`, `$62.50` — never `$62.5` (packet 13.3, seen at 390px). */
const price = (n) => (Number.isInteger(n) ? `$${n}` : `$${n.toFixed(2)}`);

/**
 * Price elasticity of demand from a pair of price/quantity observations.
 * Edexcel IAL Economics, WEC11 (Unit 1), spec 1.3.2 Consumer behaviour and demand,
 * topic 3 leaves b and c (econ_spec.txt:576, :604-609). Calculate carries 2 or 4 marks
 * in Economics — never 10, and never "Assess" (see audit/DECISIONS.md, 2026-09-11).
 *
 * A set is rejected unless four things hold: the price rise lands on a clean half
 * dollar, the new quantity is a whole number, PED is exact to two decimal places, and
 * PED is not 1 — at exactly 1 the classification step has no defensible answer.
 */
const PRICES = [20, 25, 40, 50, 80];
const QUANTITIES = [200, 400, 500, 800, 1000];
const QUANTITY_CHANGES = [5, 10, 12.5, 15, 20, 25, 30, 40];

/*
 * The price change is drawn FIRST, evenly, and the rest of the set is redrawn around it.
 *
 * It used to be one of 10, 20 and 25 drawn together with everything else, with the whole set
 * thrown away on any rejection. 10% survives the rejections most often, so the price change was
 * 10% in 39% of draws, and a student who typed 10 without reading the stem took that mark two
 * times in five (`quant-check` check 8, packet 13.3). Three values could never go below a third
 * each anyway. Seven now, each a seventh of draws: every one makes a clean half-dollar rise from
 * enough of the prices above, and none puts PED outside the 0.1-4 a stem about everyday goods
 * should show. 12.5 and 25 joined the quantity changes for the same reason, one step down: with
 * the price change spread, a 10% fall in quantity became the commonest answer at 21.5%.
 */
const PRICE_CHANGES = [5, 10, 12.5, 20, 25, 40, 50];

/** The set this (price, % price change, % quantity change, quantity) makes, or null if rejected. */
function clean(p1, pctP, pctQ, q1) {
  if (pctQ === pctP) return null;

  const rise = (p1 * pctP) / 100;
  if (Math.round(rise * 2) !== rise * 2) return null; // clean half dollar

  const q2 = q1 * (1 - pctQ / 100);
  if (!Number.isInteger(q2)) return null;

  const ped = -pctQ / pctP;
  if (Math.abs(round(ped, 2) - ped) > 1e-9) return null; // exact to 2 dp
  if (Math.abs(ped) === 1) return null;
  if (Math.abs(ped) > 4) return null; // the widest the three-value draw ever reached (40 ÷ 10)

  /*
   * No answer may be one of the figures printed above it. At $20 → $25 the price has risen
   * 25%, and 25 is also the new price on the page: a student who copied it took the mark
   * for a percentage change they never worked out. The quantities are checked for the same
   * reason. `quant-check`'s "printed answer" check fails the draw; this stops it arising.
   * Packet 13.2, from a probe that read the card rather than the data.
   */
  const printed = [p1, p1 + rise, q1, q2];
  if ([pctP, pctQ, ped].some((answer) => printed.includes(Math.abs(answer)))) return null;

  return { p1, p2: p1 + rise, pctP, pctQ, q1, q2, ped };
}

/*
 * 4,284, counted by exhaustion: 714 of the 7 × 5 × 8 × 5 = 1,400 (price change, price, quantity
 * change, quantity) sets survive `clean`, times six goods. The stem prints the good, both prices
 * and both quantities, and those five fix the set, so each is a distinct question. `quant-check`
 * reads this number to work out how much variety sampling could reach, so an over-declaration
 * fails the variety floor rather than dodging it.
 */
const CLEAN_SETS = PRICE_CHANGES.flatMap((pctP) => PRICES.flatMap((p1) => QUANTITY_CHANGES.flatMap((pctQ) =>
  QUANTITIES.map((q1) => clean(p1, pctP, pctQ, q1)).filter(Boolean))));

const template = {
  id: 'ped',
  subject: 'economics',
  unit: 'WEC11',
  specCode: '1.3.2',
  specLeaf: '1.3.2 · 3b, 3c',
  qs: 'QS8',
  specTerm: 'price elasticity of demand',
  title: 'Price elasticity of demand',
  topic: 'Consumer behaviour and demand',
  variants: CLEAN_SETS.length * GOODS.length,

  draw(rng) {
    const pctP = rng.pick(PRICE_CHANGES);
    for (let attempt = 0; attempt < 200; attempt++) {
      const set = clean(rng.pick(PRICES), pctP, rng.pick(QUANTITY_CHANGES), rng.pick(QUANTITIES));
      if (set) return { good: rng.pick(GOODS), ...set };
    }
    throw new Error('ped: no clean draw in 200 attempts');
  },

  invariants(d) {
    const bad = [];
    if (!Number.isInteger(d.q2)) bad.push('new quantity is not a whole number');
    if (Math.abs(d.ped) === 1) bad.push('PED is exactly 1, so the classification step is ambiguous');
    if (d.p2 <= d.p1) bad.push('price did not rise');
    if (!PRICE_CHANGES.includes(d.pctP)) bad.push('the price change is not one of the evenly drawn values');
    if (Math.abs(d.ped) > 4) bad.push('PED is outside the range a stem about everyday goods should show');
    if ([d.pctP, d.pctQ, Math.abs(d.ped)].some((a) => [d.p1, d.p2, d.q1, d.q2].includes(a))) {
      bad.push('an answer is one of the figures printed in the stem');
    }
    return bad;
  },

  build(d) {
    const elastic = Math.abs(d.ped) > 1;
    return {
      stem:
        `The price of **${d.good}** rises from **${price(d.p1)}** to **${price(d.p2)}**. Weekly quantity ` +
        `demanded falls from **${num(d.q1)}** units to **${num(d.q2)}** units.`,
      steps: [
        {
          id: 'pctQ',
          label: 'Percentage change in quantity demanded',
          method: '(change in quantity ÷ original quantity) × 100',
          suffix: '%',
          marks: 1,
          dp: 1,
          answer: -d.pctQ,
          tolerance: 0.1,
          acceptAbs: true,
          slips: [
            { value: round((d.q1 - d.q2) / d.q2 * 100, 2), note: 'You divided by the new quantity. A percentage change always uses the original figure.' },
          ],
        },
        {
          id: 'pctP',
          label: 'Percentage change in price',
          method: '(change in price ÷ original price) × 100',
          suffix: '%',
          marks: 1,
          dp: 1,
          answer: d.pctP,
          tolerance: 0.1,
          slips: [
            { value: round((d.p2 - d.p1) / d.p2 * 100, 2), note: 'You divided by the new price. The original price is the base.' },
          ],
        },
        {
          id: 'ped',
          label: 'PED, to two decimal places',
          method: '% change in quantity demanded ÷ % change in price',
          marks: 1,
          dp: 2,
          answer: d.ped,
          tolerance: 0.02,
          acceptAbs: true,
          ofr: (v) => (v.pctQ !== null && v.pctP !== null && v.pctP !== 0 ? v.pctQ / v.pctP : null),
          slips: [
            { value: round(d.pctP / d.pctQ, 2), note: 'That is the price change over the quantity change. PED puts quantity on top.' },
          ],
        },
        {
          id: 'verdict',
          label: 'Demand is therefore',
          method: 'compare the size of PED with 1, ignoring the sign',
          type: 'choice',
          marks: 1,
          choices: ['Price elastic', 'Price inelastic'],
          answer: elastic ? 'Price elastic' : 'Price inelastic',
          correctNote: `|${Math.abs(d.ped)}| is ${elastic ? 'greater' : 'less'} than 1, so demand is ${elastic ? 'elastic' : 'inelastic'}.`,
          wrongNote: `Not quite. |${Math.abs(d.ped)}| is ${elastic ? 'greater' : 'less'} than 1, so demand is ${elastic ? 'elastic' : 'inelastic'}.`,
        },
      ],
      solution: [
        `%ΔQd = (${num(d.q2)} − ${num(d.q1)}) ÷ ${num(d.q1)} × 100 = **−${d.pctQ}%**`,
        `%ΔP = (${price(d.p2)} − ${price(d.p1)}) ÷ ${price(d.p1)} × 100 = **+${d.pctP}%**`,
        `PED = −${d.pctQ} ÷ ${d.pctP} = **${d.ped.toFixed(2)}**`,
        `|${Math.abs(d.ped).toFixed(2)}| ${elastic ? '>' : '<'} 1, so demand is **price ${elastic ? 'elastic' : 'inelastic'}**`,
      ],
    };
  },
};

export default template;
