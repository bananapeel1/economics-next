import { money, num, round, exactly, ECONOMIES } from '../format.mjs';

/**
 * Index numbers, the inflation rate between two of them, and a money wage converted to
 * real terms. Edexcel IAL Economics, WEC12 (Unit 2), spec 2.3.1 Measures of economic
 * performance — topic 1c "real and nominal" (econ_spec.txt:884, :893) and topic 2b
 * "calculating inflation using a consumer price index (CPI)" (econ_spec.txt:911).
 *
 * Quantitative skills QS5 "calculate and interpret index numbers" and QS7 "make
 * calculations to convert from money to real terms" (econ_spec.txt:2770, :2781). QS7 is
 * IA2 only, which is why the real-wage step is the third one rather than the first: an
 * IAS student meets the index and the inflation rate here and the deflating later.
 *
 * ── The one number this template will not draw ──
 *
 * A CPI of 100 in the later year. Every wrong method in the set — dividing the wrong way,
 * subtracting the indices, forgetting the ×100 — agrees with the right one at 100, so a
 * draw that lands there marks three wrong methods correct at once. `npm run quant-check`
 * would catch it on the draw it happened on; the base year is fixed at 100 and the later
 * index is drawn strictly above it, so it cannot happen at all.
 *
 * Generated backwards, like the rest: the inflation rate is drawn first and the later
 * index follows from it, because drawing two indices and hoping the rate between them is
 * exact to one decimal place fails four times in five.
 */

/** Inflation rates that divide cleanly into an index built on 100. */
const RATES = [2.5, 3, 3.2, 3.5, 4, 4.5, 5, 6, 6.4, 7.5, 8, 10, 12.5];

/** Money-wage rises, in per cent. Never equal to the inflation rate in the same draw:
 *  at equality the real wage is unchanged and the "did it rise?" step has no teeth. */
const WAGE_RISES = [1, 2, 2.5, 3, 4, 5, 6, 7.5, 8, 10];

const template = {
  id: 'index-numbers',
  subject: 'economics',
  unit: 'WEC12',
  specCode: '2.3.1',
  specLeaf: '2.3.1 · 1c, 2b',
  qs: 'QS5, QS7',
  specTerm: 'consumer price index',
  title: 'Index numbers, inflation and real values',
  topic: 'Measures of economic performance',
  // 26 basket costs × inflation rate × wage rise × 25 money wages × economy. A floor:
  // rejection only removes sets, and `quant-check` reads this number when it works out how
  // much variety random sampling could reach, so it has to be counted rather than guessed.
  variants: 26 * RATES.length * WAGE_RISES.length * 25 * ECONOMIES.length,

  draw(rng) {
    for (let attempt = 0; attempt < 200; attempt++) {
      // The basket's cost in the base year. A multiple of 100, and that is arithmetic
      // rather than taste: the later cost is the base times an index carrying one decimal
      // place, and only a multiple of 100 keeps that product exact to the cent for every
      // rate in the set. At multiples of 25 a 12.5% rate lands on a third decimal.
      const baseCost = rng.step(500, 3000, 100);
      const rate = rng.pick(RATES);
      const laterIndex = round(100 + rate, 1);
      const laterCost = (baseCost * laterIndex) / 100;
      if (Math.abs(laterCost - round(laterCost, 2)) > 1e-9) continue;
      // The rise in the cost of the basket is a named slip on BOTH of the first two steps.
      // Where it lands on the index itself ($900 at 12.5% gives 112.5 either way) the slip
      // marks the wrong method correct.
      if (Math.abs(laterCost - baseCost - laterIndex) < 0.1) continue;
      if (Math.abs(laterCost - baseCost - rate) < 0.1) continue;

      const wageRise = rng.pick(WAGE_RISES);
      if (Math.abs(wageRise - rate) < 0.5) continue;      // see WAGE_RISES
      const moneyWage = rng.step(1200, 3600, 100);
      const newMoneyWage = round(moneyWage * (1 + wageRise / 100), 2);
      const realWage = round((newMoneyWage * 100) / laterIndex, 2);
      // The real wage must be far enough from the money wage that "forgot to deflate" is
      // not inside the tolerance, and far enough from the base wage to have a direction.
      if (Math.abs(realWage - newMoneyWage) < 5) continue;
      if (Math.abs(realWage - moneyWage) < 5) continue;

      return {
        economy: rng.pick(ECONOMIES).name,
        baseCost,
        laterCost: round(laterCost, 2),
        rate,
        laterIndex,
        moneyWage,
        wageRise,
        newMoneyWage,
        realWage,
        roseInReal: realWage > moneyWage,
      };
    }
    throw new Error('index-numbers: no clean draw in 200 attempts');
  },

  /** Checked independently by audit/scripts/quant-check.mjs on every draw. */
  invariants(d) {
    const bad = [];
    if (d.laterIndex <= 100) bad.push('the later index is not above the base year, where every wrong method agrees with the right one');
    if (Math.abs((d.laterCost / d.baseCost) * 100 - d.laterIndex) > 1e-9) bad.push('the later index does not reproduce the draw');
    if (Math.abs(d.laterIndex - 100 - d.rate) > 1e-9) bad.push('the inflation rate is not the index less the base year');
    if (Math.abs(d.wageRise - d.rate) < 0.5) bad.push('the money wage rose at the inflation rate, so the real wage is flat');
    if (Math.abs(d.realWage - d.newMoneyWage) < 5) bad.push('the real wage is within tolerance of the money wage');
    return bad;
  },

  build(d) {
    const direction = d.roseInReal ? 'risen' : 'fallen';
    return {
      stem:
        `In **${d.economy}**, a basket of goods and services cost **${money(d.baseCost)}** in the base ` +
        `year and **${money(d.laterCost)}** this year. A worker’s money wage rose by ` +
        `**${d.wageRise}%** over the same period, from **${money(d.moneyWage)}** to ` +
        `**${money(d.newMoneyWage)}** a month.`,
      steps: [
        {
          id: 'index',
          label: 'Consumer price index this year, base year = 100',
          method: 'this year’s basket cost ÷ the base year’s × 100',
          marks: 2,
          dp: 1,
          answer: d.laterIndex,
          tolerance: 0.05,
          slips: [
            {
              value: round((d.baseCost / d.laterCost) * 100, 1),
              note: 'You divided the base year by this year. The base year is what everything is measured against, so it goes on the bottom.',
            },
            {
              value: round(d.laterCost - d.baseCost, 1),
              note: 'That is the rise in the cost of the basket. An index expresses it as a proportion of the base year, then multiplies by 100.',
            },
          ],
        },
        {
          id: 'inflation',
          label: 'Rate of inflation since the base year',
          method: 'the index, less the base year’s 100',
          suffix: '%',
          marks: 2,
          dp: 1,
          answer: d.rate,
          tolerance: 0.05,
          ofr: (v) => (Number.isFinite(v.index) ? v.index - 100 : null),
          slips: [
            {
              value: d.laterIndex,
              note: 'That is the index itself. The base year is 100, so the inflation since then is what the index sits above it.',
            },
            {
              value: round(d.laterCost - d.baseCost, 1),
              note: 'That is the rise in the cost of the basket in currency, not the percentage rise.',
            },
          ],
        },
        {
          id: 'real',
          label: 'The new money wage at base-year prices',
          method: 'money wage ÷ the price index × 100',
          prefix: '$',
          marks: 2,
          dp: 2,
          answer: d.realWage,
          tolerance: 0.5,
          ofr: (v) => (Number.isFinite(v.index) && v.index > 0 ? (d.newMoneyWage * 100) / v.index : null),
          slips: [
            {
              value: d.newMoneyWage,
              note: 'That is the money wage as paid. Dividing by the index and multiplying by 100 is what puts it in base-year prices.',
            },
            {
              value: round((d.newMoneyWage * d.laterIndex) / 100, 2),
              note: 'You multiplied by the index instead of dividing. Prices have risen, so a wage is worth less in real terms, not more.',
            },
          ],
        },
        {
          id: 'verdict',
          label: 'In real terms, the wage has',
          method: 'compare the real wage with what was earned in the base year',
          type: 'choice',
          marks: 1,
          answer: direction,
          choices: ['risen', 'fallen'],
          correctNote:
            `Money wages rose ${d.wageRise}% while prices rose ${d.rate}%, so in real terms the wage has ` +
            `${direction}: ${money(d.realWage)} at base-year prices against ${money(d.moneyWage)}.`,
          wrongNote:
            `Compare the rises, not the amounts: wages ${d.wageRise}% against prices ${d.rate}%. Wages rising ` +
            `more slowly than prices is a fall in real terms even though the number on the payslip is bigger.`,
        },
      ],
      solution: [
        `Index = ${money(d.laterCost)} ÷ ${money(d.baseCost)} × 100 = **${d.laterIndex}**`,
        `Inflation = ${d.laterIndex} − 100 = **${d.rate}%**`,
        `Real wage = ${money(d.newMoneyWage)} ÷ ${d.laterIndex} × 100 ${exactly((d.newMoneyWage * 100) / d.laterIndex, 2)} **${money(d.realWage)}** at base-year prices`,
        `Money wages rose ${d.wageRise}%, prices rose ${d.rate}% — so in real terms the wage has **${direction}**`,
      ],
    };
  },
};

export default template;
