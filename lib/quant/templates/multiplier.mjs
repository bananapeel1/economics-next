import { num, round, exactly } from '../format.mjs';

/**
 * The multiplier from the marginal leakages. Edexcel IAL Economics, WEC12 (Unit 2),
 * spec 2.3.4 National income, topic 4 leaves b and c (econ_spec.txt:1056, :1079-1085).
 *
 * Leakage sets are enumerated rather than drawn independently, and a total of 0.5 is
 * excluded: at 0.5 the MPC — the named slip on step one — is also 0.5, so a student with
 * the wrong method would be marked correct. The guard script enforces that separation on
 * every template; this is the one that tripped it.
 */
const LEAKAGES = [0.05, 0.1, 0.15, 0.2, 0.25, 0.3];

/*
 * The leakage TOTAL is drawn first, evenly, and only then a triple that sums to it.
 *
 * This used to allow only the totals whose reciprocal is exact to two decimal places — 0.2,
 * 0.25 and 0.4 — and pick a triple uniformly from all thirty that sum to one of them. 0.4 has
 * 21 of the 30, so the multiplier was 2.5 in 70% of draws and a student who typed 2.5 without
 * reading the stem was right seven times in ten (`quant-check` check 8, packet 13.3). No wider
 * set of exact totals exists on this grid, and at two decimal places there are only four at
 * all (0.16, 0.2, 0.25, 0.4 — 0.5 excluded and 0.8 no economy), which is 25% each at best.
 *
 * So the multiplier is now what step two's label has always said it is: 1 ÷ the total, TO TWO
 * DECIMAL PLACES. 1 ÷ 0.35 = 2.857… is asked for as 2.86, and a student who keeps every digit
 * is inside the 0.02 tolerance. Eight totals, 0.2 to 0.6: 0.15 has one triple (0.05 three
 * times) and the totals above 0.6 leave an MPC under 0.4, which is not an economy a stem should
 * describe. Every one is 12.5% of draws.
 *
 * The change in GDP is the ROUNDED multiplier times the spend, so the worked solution's
 * "3.33 × $300m = $999m" is true arithmetic rather than a rounding written as an equals sign;
 * a student who used the unrounded 3.333… gets $1,000m, 0.1% away, well inside the step's 1.2%.
 * Where the multiplier's last digit is odd (3.33, 1.67) the spend is kept to whole hundreds so
 * that product is a whole number of millions.
 */
const TOTALS = [0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.55, 0.6];

/** Every labelled (MPS, MRT, MPM) triple, grouped by the total it sums to. */
const TRIPLES = (() => {
  const out = new Map(TOTALS.map((t) => [t, []]));
  for (const mps of LEAKAGES)
    for (const mrt of LEAKAGES)
      for (const mpm of LEAKAGES) {
        const sum = round(mps + mrt + mpm, 2);
        if (out.has(sum)) out.get(sum).push({ mps, mrt, mpm, sum });
      }
  return out;
})();

const SPENDS = Array.from({ length: 19 }, (_, i) => 100 + i * 50); // $100m to $1,000m in $50m steps

/** The multiplier in hundredths, so the change in GDP is integer arithmetic: 286 × 150 / 100. */
const kCents = (total) => Math.round(round(1 / total, 2) * 100);

/** The spends that give this total a whole-number change in GDP. */
const spendsFor = (total) => SPENDS.filter((spend) => (kCents(total) * spend) % 100 === 0);

/*
 * 2,193, counted: the stem prints the three leakages and the spend, so a distinct question is a
 * (triple, spend) pair — 57 + 114 + 100 + 285 + 399 + 475 + 513 + 250 across the eight totals.
 * The draw is even over totals rather than over pairs, which `quant-check`'s variety floor does
 * not model; measured, it clears the floor at 200, 2,000 and 5,000 draws.
 */
const VARIANTS = TOTALS.reduce((n, t) => n + TRIPLES.get(t).length * spendsFor(t).length, 0);

const template = {
  id: 'multiplier',
  subject: 'economics',
  unit: 'WEC12',
  specCode: '2.3.4',
  specLeaf: '2.3.4 · 4b, 4c',
  qs: 'QS1',
  specTerm: 'multiplier',
  title: 'The multiplier',
  topic: 'National income',
  variants: VARIANTS,

  draw(rng) {
    const total = rng.pick(TOTALS);
    const { mps, mrt, mpm, sum } = rng.pick(TRIPLES.get(total));
    const spend = rng.pick(spendsFor(total));
    const cents = kCents(sum);
    return { mps, mrt, mpm, sum, k: cents / 100, spend, change: (cents * spend) / 100 };
  },

  invariants(d) {
    const bad = [];
    if (round(d.mps + d.mrt + d.mpm, 2) !== d.sum) bad.push('leakages do not sum to the stated total');
    if (!TOTALS.includes(d.sum)) bad.push('the leakage total is not one of the evenly drawn totals');
    if (round(1 / d.sum, 2) !== d.k) bad.push('the multiplier is not 1 ÷ the total to two decimal places');
    if (!Number.isInteger(d.change)) bad.push('the change in GDP is not a whole number');
    if (Math.abs(d.k * d.spend - d.change) > 1e-9) bad.push('the change in GDP is not the stated multiplier × the spend');
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
        // `toFixed(2)`, because the step above asks for the answer "to two decimal places" and
        // this printed 2.5 and 5 — the worked solution contradicting the instruction beside it.
        // Verify B, packet 13.2, on both draws it looked at.
        // `≈` where 1 ÷ the total does not stop at two places (packet 13.3): 1 ÷ 0.35 is not 2.86.
        `Multiplier = 1 ÷ ${d.sum} ${exactly(1 / d.sum, 2)} **${d.k.toFixed(2)}**`,
        `ΔGDP = ${d.k.toFixed(2)} × $${num(d.spend)}m = **$${num(d.change)}m**`,
      ],
    };
  },
};

export default template;
