import { num, FIRMS } from '../format.mjs';

/**
 * Labour productivity and its percentage change. Edexcel IAL Business, WBS13 (Unit 3), spec 3.3.5
 * Assessing competitiveness, topic 3 "Human resources" leaf a: "Calculate and interpret the
 * following to help make business decisions: labour productivity" (bus_spec.txt:1218, :1237-1239).
 * The definition is the one the specification gives for productivity in Unit 2, "output per unit
 * of input per time period" (bus_spec.txt:974-975), with the worker as the unit of input and a
 * month as the period. Quantitative skills QS1 (an average: output per worker) and QS2
 * (percentage change), bus_spec.txt:2267, :2270.
 *
 * ── What the stem is built to test ──
 *
 * Output and the workforce both change between the two months, so the percentage change in
 * OUTPUT is always a different figure from the percentage change in PRODUCTIVITY — the error this
 * item exists to catch — and sometimes output rises while productivity falls, because the
 * workforce grew faster. Both months' figures sit side by side, so dividing one month's output by
 * the other month's workforce is a real misreading, and it is named.
 *
 * ── Drawn backwards, from the answer ──
 *
 * The percentage change is drawn first, in half-percent steps from 4.0% to 25.0% either way, and
 * last month's productivity is then a multiple of whatever makes this month's a whole number of
 * units: at 7.5% a multiple of 40, at 4.5% a multiple of 200. Drawing two productivities and
 * hoping the change between them is exact to one decimal place fails most of the time; drawing
 * the change from a short list of round rates (the first sketch) makes it guessable.
 * Changes under 4% are left out: at 2.5% the "divided by the new figure" slip is 0.06 from the
 * answer and a student who rounds it would sit on the right figure.
 */

const WORKERS = { min: 20, max: 120 };               // last month's workforce
const CHANGE = 15;                                   // workforce changes by 1-15 workers, never 0
const PRODUCTIVITY = { min: 300, max: 2400, step: 20 }; // last month's units per worker
const TENTHS = [];                                   // % change in productivity × 10: ±40 … ±250 in 5s
for (let t = 40; t <= 250; t += 5) TENTHS.push(t, -t);
const TOL = 0.05;

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
const round1 = (x) => Math.round(x * 10) / 10;
const clear = (slip, answer, tol, r) => Math.abs(slip - answer) > tol + 1e-9 && Math.abs(r(slip) - answer) > tol + 1e-9;
const apart = (s, t, tol, r) => Math.abs(s - t) > 2 * tol + 1e-9 && r(s) !== r(t);

/** Last month's productivities that make this month's a whole number at this rate of change. */
function productivityGrid(tenths) {
  const need = 1000 / gcd(Math.abs(tenths), 1000);
  const step = (PRODUCTIVITY.step * need) / gcd(PRODUCTIVITY.step, need);
  return {
    step,
    lo: Math.ceil(PRODUCTIVITY.min / step) * step,
    hi: Math.floor(PRODUCTIVITY.max / step) * step,
  };
}

function slipsFor(d) {
  return {
    p1: [d.q1 / d.w2, d.w1 / d.q1],
    p2: [d.q2 / d.w1, d.w2 / d.q2],
    pct: [
      (100 * (d.q2 - d.q1)) / d.q1,
      (100 * (d.p2 - d.p1)) / d.p2,
      d.p2 - d.p1,
      (d.p2 - d.p1) / d.p1,
    ],
  };
}

/**
 * Everything the card prints and asks, or null when the draw must be refused. Used by `draw` to
 * reject and by `countVariants` to count, so `variants` cannot drift from the draw.
 */
function derive(w1, change, p1, tenths) {
  const w2 = w1 + change;
  const p2 = p1 + (p1 * tenths) / 1000;
  const d = { w1, w2, p1, p2, pct: tenths / 10, q1: w1 * p1, q2: w2 * p2 };

  /*
   * No answer may be a figure printed above it. The productivities are hundreds of units and the
   * workforces at most 135, so those never meet; but a whole-number percentage change can be a
   * workforce ("20 workers", a 20% rise), and a small month's output can equal last month's
   * productivity. The size of a fall is checked as well as its signed value: a card that prints
   * 20 beside a −20% answer is one minus sign from a free mark.
   */
  const printed = [d.w1, d.w2, d.q1, d.q2];
  if ([d.p1, d.p2, d.pct, Math.abs(d.pct)].some((answer) => printed.includes(answer))) return null;

  const s = slipsFor(d);
  const whole = Math.round;
  if (!s.p1.every((x) => clear(x, p1, 0.5, whole)) || !apart(s.p1[0], s.p1[1], 0.5, whole)) return null;
  if (!s.p2.every((x) => clear(x, p2, 0.5, whole)) || !apart(s.p2[0], s.p2[1], 0.5, whole)) return null;
  if (!s.pct.every((x) => clear(x, d.pct, TOL, round1))) return null;
  for (let i = 0; i < s.pct.length; i++) {
    for (let j = i + 1; j < s.pct.length; j++) if (!apart(s.pct[i], s.pct[j], TOL, round1)) return null;
  }
  return d;
}

/**
 * Counted by exhaustion over the same grid and the same `derive`:
 * `node --input-type=module -e "import { countVariants } from
 * './lib/quant/templates/labour-productivity.mjs'; console.log(countVariants())"`. Re-run after any
 * change to the draw and copy the result into `variants`.
 */
export function countVariants() {
  let n = 0;
  for (const tenths of TENTHS) {
    const { step, lo, hi } = productivityGrid(tenths);
    for (let p1 = lo; p1 <= hi; p1 += step)
      for (let w1 = WORKERS.min; w1 <= WORKERS.max; w1++)
        for (let change = -CHANGE; change <= CHANGE; change++)
          if (change !== 0 && derive(w1, change, p1, tenths)) n++;
  }
  return n * FIRMS.length;
}

const template = {
  id: 'labour-productivity',
  subject: 'business',
  unit: 'WBS13',
  specCode: '3.3.5',
  specLeaf: '3.3.5 · 3a',
  qs: 'QS1, QS2',
  specTerm: 'labour productivity',
  title: 'Labour productivity',
  topic: 'Assessing competitiveness',
  // Counted, not multiplied out: 86 rates of change × the productivities that suit each × 101
  // workforces × 30 changes in it, less the refusals in `derive`, × 7 firms. See countVariants.
  variants: 54626348,

  draw(rng) {
    for (let attempt = 0; attempt < 200; attempt++) {
      const tenths = rng.pick(TENTHS);
      const { step, lo, hi } = productivityGrid(tenths);
      const p1 = rng.step(lo, hi, step);
      const w1 = rng.int(WORKERS.min, WORKERS.max);
      const change = rng.pick([-1, 1]) * rng.int(1, CHANGE);
      const d = derive(w1, change, p1, tenths);
      if (d) return { firm: rng.pick(FIRMS), ...d };
    }
    throw new Error('labour-productivity: no clean draw in 200 attempts');
  },

  /** Checked independently by audit/scripts/quant-check.mjs on every draw. */
  invariants(d) {
    const bad = [];
    if (d.q1 / d.w1 !== d.p1 || d.q2 / d.w2 !== d.p2) bad.push('output ÷ workers does not reproduce the productivity');
    if (!Number.isInteger(d.p1) || !Number.isInteger(d.p2)) bad.push('a productivity is not a whole number of units');
    if (Math.abs((100 * (d.p2 - d.p1)) / d.p1 - d.pct) > 1e-9) bad.push('the percentage change does not reproduce the draw');
    if (Math.abs(Number(d.pct.toFixed(1)) - d.pct) > 1e-9) bad.push('the percentage change is not exact to one decimal place');
    if (d.w1 === d.w2) bad.push('the workforce did not change, so output growth and productivity growth are the same');
    if ([d.p1, d.p2, d.pct, Math.abs(d.pct)].some((a) => [d.w1, d.w2, d.q1, d.q2].includes(a))) {
      bad.push('an answer is one of the figures printed in the stem');
    }
    return bad;
  },

  build(d) {
    const s = slipsFor(d);
    const rose = d.pct > 0;
    const outputRose = d.q2 > d.q1;
    return {
      stem:
        `Last month **${d.firm}** produced **${num(d.q1)}** units with **${d.w1}** workers. This month ` +
        `it produced **${num(d.q2)}** units with **${d.w2}** workers.`,
      steps: [
        {
          id: 'lastMonth',
          label: 'Labour productivity last month, in units per worker',
          method: 'output ÷ number of workers',
          // One word: the marker's feedback joins a multi-word suffix to the number with no space.
          suffix: 'units',
          marks: 1,
          dp: 0,
          answer: d.p1,
          tolerance: 0.5,
          slips: [
            { value: s.p1[0], note: 'You divided last month’s output by this month’s workforce. Each month’s output goes over that month’s workers.' },
            { value: s.p1[1], note: 'That is workers per unit, upside down. Labour productivity is output per worker: output on top.' },
          ],
        },
        {
          id: 'thisMonth',
          label: 'Labour productivity this month, in units per worker',
          method: 'output ÷ number of workers',
          // One word: the marker's feedback joins a multi-word suffix to the number with no space.
          suffix: 'units',
          marks: 1,
          dp: 0,
          answer: d.p2,
          tolerance: 0.5,
          slips: [
            { value: s.p2[0], note: 'You divided this month’s output by last month’s workforce. Each month’s output goes over that month’s workers.' },
            { value: s.p2[1], note: 'That is workers per unit, upside down. Labour productivity is output per worker: output on top.' },
          ],
        },
        {
          id: 'change',
          label: 'Percentage change in labour productivity, to one decimal place',
          method: '(this month − last month) ÷ last month × 100',
          suffix: '%',
          marks: 2,
          dp: 1,
          answer: d.pct,
          tolerance: TOL,
          ofr: (v) => {
            const before = Number.isFinite(v.lastMonth) ? v.lastMonth : d.p1;
            const after = Number.isFinite(v.thisMonth) ? v.thisMonth : d.p2;
            return before !== 0 ? ((after - before) / before) * 100 : null;
          },
          slips: [
            { value: s.pct[0], note: 'That is the percentage change in output. The workforce changed too, so output per worker changed by a different amount.' },
            { value: s.pct[1], note: 'You divided by this month’s figure. A percentage change is measured against the original, last month’s.' },
            { value: s.pct[2], note: 'That is the change in units per worker. Divide it by last month’s productivity and multiply by 100 to make it a percentage.' },
            { value: s.pct[3], note: 'That is the change as a decimal. Multiply by 100 to give a percentage.' },
          ],
        },
      ],
      solution: [
        `Last month: ${num(d.q1)} ÷ ${d.w1} = **${num(d.p1)} units per worker**`,
        `This month: ${num(d.q2)} ÷ ${d.w2} = **${num(d.p2)} units per worker**`,
        `Change = (${num(d.p2)} − ${num(d.p1)}) ÷ ${num(d.p1)} × 100 = **${d.pct > 0 ? '+' : '−'}${Math.abs(d.pct).toFixed(1)}%**`,
        outputRose === rose
          ? `Output ${outputRose ? 'rose' : 'fell'} by ${Math.abs(s.pct[0]).toFixed(1)}% while labour productivity ${rose ? 'rose' : 'fell'} by ${Math.abs(d.pct).toFixed(1)}%: the difference is the change in the workforce.`
          : `Output ${outputRose ? 'rose' : 'fell'}, yet labour productivity ${rose ? 'rose' : 'fell'}: the workforce ${d.w2 > d.w1 ? 'grew' : 'shrank'} by proportionally more than output ${outputRose ? 'rose' : 'fell'}.`,
      ],
    };
  },
};

export default template;
