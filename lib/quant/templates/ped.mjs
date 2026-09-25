import { num, round, GOODS } from '../format.mjs';

/**
 * Price elasticity of demand from a pair of price/quantity observations.
 * Edexcel IAL Economics, WEC11 (Unit 1), spec 1.3.2 Consumer behaviour and demand,
 * topic 3 leaves b and c (econ_spec.txt:576, :604-609). Calculate carries 2 or 4 marks
 * in Economics — never 10, and never "Assess" (see audit/DECISIONS.md, 2026-09-11).
 *
 * The draw is rejected until four things hold: the price rise lands on a clean half
 * dollar, the new quantity is a whole number, PED is exact to two decimal places, and
 * PED is not 1 — at exactly 1 the classification step has no defensible answer.
 */
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
  // 1,740, counted rather than multiplied out: 5 prices × 3 price changes × 6 quantity changes
  // × 5 quantities × 6 goods is 2,700 before the draw rejects anything, and packet 13.2 added a
  // rejection — no answer may be a figure printed in the stem — that takes a real bite out of
  // it. `quant-check` reads this number to work out how much variety sampling could reach, so
  // an over-declaration fails the variety floor rather than dodging it.
  variants: 1740,

  draw(rng) {
    for (let attempt = 0; attempt < 200; attempt++) {
      const p1 = rng.pick([20, 25, 40, 50, 80]);
      const pctP = rng.pick([10, 20, 25]);
      const pctQ = rng.pick([5, 10, 15, 20, 30, 40]);
      if (pctQ === pctP) continue;

      const rise = (p1 * pctP) / 100;
      if (Math.round(rise * 2) !== rise * 2) continue; // clean half dollar

      const q1 = rng.pick([200, 400, 500, 800, 1000]);
      const q2 = q1 * (1 - pctQ / 100);
      if (!Number.isInteger(q2)) continue;

      const ped = -pctQ / pctP;
      if (Math.abs(round(ped, 2) - ped) > 1e-9) continue; // exact to 2 dp
      if (Math.abs(ped) === 1) continue;

      /*
       * No answer may be one of the figures printed above it. At $20 → $25 the price has risen
       * 25%, and 25 is also the new price on the page: a student who copied it took the mark
       * for a percentage change they never worked out. The quantities are checked for the same
       * reason. `quant-check`'s "printed answer" check fails the draw; this stops it arising.
       * Packet 13.2, from a probe that read the card rather than the data.
       */
      const printed = [p1, p1 + rise, q1, q2];
      if ([pctP, pctQ, ped].some((answer) => printed.includes(Math.abs(answer)))) continue;

      return { good: rng.pick(GOODS), p1, p2: p1 + rise, pctP, pctQ, q1, q2, ped };
    }
    throw new Error('ped: no clean draw in 200 attempts');
  },

  invariants(d) {
    const bad = [];
    if (!Number.isInteger(d.q2)) bad.push('new quantity is not a whole number');
    if (Math.abs(d.ped) === 1) bad.push('PED is exactly 1, so the classification step is ambiguous');
    if (d.p2 <= d.p1) bad.push('price did not rise');
    if ([d.pctP, d.pctQ, Math.abs(d.ped)].some((a) => [d.p1, d.p2, d.q1, d.q2].includes(a))) {
      bad.push('an answer is one of the figures printed in the stem');
    }
    return bad;
  },

  build(d) {
    const elastic = Math.abs(d.ped) > 1;
    return {
      stem:
        `The price of **${d.good}** rises from **$${d.p1}** to **$${d.p2}**. Weekly quantity ` +
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
        `%ΔP = ($${d.p2} − $${d.p1}) ÷ $${d.p1} × 100 = **+${d.pctP}%**`,
        `PED = −${d.pctQ} ÷ ${d.pctP} = **${d.ped.toFixed(2)}**`,
        `|${Math.abs(d.ped).toFixed(2)}| ${elastic ? '>' : '<'} 1, so demand is **price ${elastic ? 'elastic' : 'inelastic'}**`,
      ],
    };
  },
};

export default template;
