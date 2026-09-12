import { num, round } from '../format.mjs';

/**
 * The multiplier from the marginal leakages. Edexcel IAL Economics, WEC12 (Unit 2),
 * spec 2.4.2.
 *
 * Leakage sets are enumerated rather than drawn independently, for two reasons. The
 * multiplier has to come out exact (1/0.35 does not), and a total of 0.5 has to be
 * excluded: at 0.5 the MPC — the named slip on step one — is also 0.5, so a student
 * with the wrong method would be marked correct. The guard script enforces that
 * separation on every template; this is the one that tripped it.
 */
const LEAKAGES = [0.05, 0.1, 0.15, 0.2, 0.25, 0.3];

/**
 * Totals whose reciprocal is exact to two decimal places, and where 1 − total is not
 * the total itself. 0.5 is excluded on the second condition: there the MPC is also 0.5,
 * so the wrong method named in step one's slip would land on the right answer.
 */
const CLEAN_TOTALS = [0.2, 0.25, 0.4];

/** Every labelled (MPS, MRT, MPM) triple that sums to a clean total. */
const COMBINATIONS = (() => {
  const out = [];
  for (const mps of LEAKAGES)
    for (const mrt of LEAKAGES)
      for (const mpm of LEAKAGES) {
        const sum = round(mps + mrt + mpm, 2);
        if (CLEAN_TOTALS.includes(sum)) out.push({ mps, mrt, mpm, sum });
      }
  return out;
})();

const SPEND_STEPS = 19; // $100m to $1,000m in $50m steps

const template = {
  id: 'multiplier',
  subject: 'economics',
  unit: 'WEC12',
  specCode: '2.4.2',
  title: 'The multiplier',
  topic: 'Aggregate demand',
  variants: COMBINATIONS.length * SPEND_STEPS,

  draw(rng) {
    const { mps, mrt, mpm, sum } = rng.pick(COMBINATIONS);
    const spend = rng.step(100, 1000, 50);
    const k = round(1 / sum, 2);
    return { mps, mrt, mpm, sum, k, spend, change: k * spend };
  },

  invariants(d) {
    const bad = [];
    if (round(d.mps + d.mrt + d.mpm, 2) !== d.sum) bad.push('leakages do not sum to the stated total');
    if (round(1 / d.sum, 2) !== d.k) bad.push('the multiplier is not exact to two decimal places');
    if (!Number.isInteger(d.change)) bad.push('the change in GDP is not a whole number');
    if (round(1 - d.sum, 2) === d.sum) bad.push('MPC equals the leakage total, so the step-one slip is indistinguishable');
    return bad;
  },

  build(d) {
    return {
      stem:
        `In a small open economy the marginal propensity to save is **${d.mps}**, the marginal rate of ` +
        `tax is **${d.mrt}** and the marginal propensity to import is **${d.mpm}**. The government ` +
        `raises spending by **$${num(d.spend)}m**.`,
      steps: [
        {
          id: 'leakages',
          label: 'Sum of the leakages',
          method: 'MPS + MRT + MPM',
          marks: 1,
          dp: 2,
          answer: d.sum,
          tolerance: 0.005,
          slips: [
            { value: round(1 - d.sum, 2), note: 'That is the marginal propensity to consume. The multiplier is built from the leakages themselves.' },
          ],
        },
        {
          id: 'k',
          label: 'The multiplier, to two decimal places',
          method: '1 ÷ the sum of the leakages',
          marks: 2,
          dp: 2,
          answer: d.k,
          tolerance: 0.02,
          ofr: (v) => (v.leakages > 0 ? 1 / v.leakages : null),
          slips: [
            { value: d.sum, note: 'You have given the leakages back. The multiplier is their reciprocal.' },
          ],
        },
        {
          id: 'change',
          label: 'Change in real GDP',
          method: 'the multiplier × the change in government spending',
          prefix: '$',
          suffix: 'm',
          marks: 1,
          dp: 0,
          answer: d.change,
          tolerance: Math.max(2, d.change * 0.012),
          ofr: (v) => (v.k !== null ? v.k * d.spend : null),
          slips: [
            { value: d.spend, note: 'That is only the initial injection. The multiplier adds the induced rounds of spending that follow.' },
          ],
        },
      ],
      solution: [
        `Leakages = ${d.mps} + ${d.mrt} + ${d.mpm} = **${d.sum}**`,
        `Multiplier = 1 ÷ ${d.sum} = **${d.k}**`,
        `ΔGDP = ${d.k} × $${num(d.spend)}m = **$${num(d.change)}m**`,
      ],
    };
  },
};

export default template;
