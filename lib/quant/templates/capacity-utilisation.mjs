import { num, FIRMS } from '../format.mjs';

/**
 * Capacity utilisation, and the two ways of raising it. Edexcel IAL Business, WBS12 (Unit 2), spec
 * 2.3.4 Resource management, topic 2 "Capacity utilisation" leaves a and c: "Capacity utilisation:
 * current output (divided by) maximum possible output (× 100)" and "Ways of improving capacity
 * utilisation (under and over utilisation)" (bus_spec.txt:965, :985-989). Quantitative skill QS2,
 * percentages (bus_spec.txt:2270).
 *
 * Three steps: the utilisation now, the extra output that would lift it to a target, and the
 * utilisation if the business instead cut its maximum possible output by closing a production
 * line. The last two are the two routes leaf 2c points at — sell more, or have less capacity —
 * and the third step is the one students find counter-intuitive: shutting something down RAISES
 * capacity utilisation, because the same output is divided by a smaller maximum.
 *
 * ── Drawn backwards, from the answers ──
 *
 * Maximum possible output is a whole number of thousands, so drawing the utilisation first, in
 * tenths of a per cent, gives a whole-number current output for every value from 40.0% to 88.0%:
 * the answer is spread across 480 values rather than bunched on the few a forward draw can hit.
 * The capacity after the cut is then chosen from the whole hundreds that make the new utilisation
 * exact to one decimal place — those dividing 10 × current output — no lower than 60% of today's
 * maximum and never so low that the new utilisation passes 98%.
 *
 * The target is a multiple of 5% at least five points above today's figure, so the extra output
 * is always a real increase.
 */

const CAPACITY = { min: 5, max: 30 };               // maximum possible output, thousands a month
const UTILISATION = { min: 400, max: 880 };         // today's capacity utilisation, tenths of a %
const TOL = 0.05;

const round1 = (x) => Math.round(x * 10) / 10;
const clear = (slip, answer, tol, r) => Math.abs(slip - answer) > tol + 1e-9 && Math.abs(r(slip) - answer) > tol + 1e-9;
function allApart(slips, tol, r) {
  for (let i = 0; i < slips.length; i++) {
    for (let j = i + 1; j < slips.length; j++) {
      if (Math.abs(slips[i] - slips[j]) <= 2 * tol + 1e-9 || r(slips[i]) === r(slips[j])) return false;
    }
  }
  return true;
}

/** Capacities after the cut, in hundreds of units, that make the new utilisation exact to 0.1%. */
function cutCandidates(thousands, tenths) {
  const current = tenths * thousands;                        // = tenths ÷ 1,000 × maximum
  const lo = Math.max(6 * thousands, Math.ceil(current / 98)); // ≥ 60% of today; new CU ≤ 98%
  const hi = 10 * thousands - 5;                             // cut at least 500 units
  const out = [];
  for (let h = lo; h <= hi; h++) if ((10 * current) % h === 0) out.push(h);
  return out;
}

const targetWindow = (tenths) => ({ lo: Math.ceil((tenths + 50) / 50) * 5, hi: 95 });

function slipsFor(d) {
  return {
    cu: [(100 * d.max) / d.current, d.current / d.max, (100 * (d.max - d.current)) / d.max],
    extra: [(d.target * d.max) / 100, ((d.target - d.cu) / 100) * d.current, d.target - d.cu],
    after: [d.cu, (100 * (d.current - d.cut)) / d.max, (100 * d.current) / (d.max + d.cut)],
  };
}

/**
 * Everything the card prints and asks, or null when the draw must be refused. Used by `draw` to
 * reject and by `countVariants` to count, so `variants` cannot drift from the draw.
 */
function derive(thousands, tenths, hundreds, target) {
  const max = thousands * 1000;
  const current = tenths * thousands;
  const reduced = hundreds * 100;
  const d = {
    max,
    current,
    target,
    cut: max - reduced,
    reduced,
    cu: tenths / 10,
    extra: (target * max) / 100 - current,
    after: (1000 * current) / reduced / 10,
  };

  /*
   * No answer may be a figure printed above it. The new utilisation can be the target itself —
   * both are percentages in the same band — and the extra output is a count of units like every
   * other figure on the card. Today's utilisation is at least five points below the target and
   * under 100, so it can meet neither.
   */
  if (d.after === target) return null;
  if ([max, current, d.cut].includes(d.extra)) return null;

  const s = slipsFor(d);
  if (!s.cu.every((x) => clear(x, d.cu, TOL, round1)) || !allApart(s.cu, TOL, round1)) return null;
  if (!s.extra.every((x) => clear(x, d.extra, 0.5, Math.round)) || !allApart(s.extra, 0.5, Math.round)) return null;
  if (!s.after.every((x) => clear(x, d.after, TOL, round1)) || !allApart(s.after, TOL, round1)) return null;
  return d;
}

/**
 * Counted by exhaustion over the same grid and the same `derive`:
 * `node --input-type=module -e "import { countVariants } from
 * './lib/quant/templates/capacity-utilisation.mjs'; console.log(countVariants())"`. Re-run after any
 * change to the draw and copy the result into `variants`.
 */
export function countVariants() {
  let n = 0;
  for (let thousands = CAPACITY.min; thousands <= CAPACITY.max; thousands++)
    for (let tenths = UTILISATION.min; tenths <= UTILISATION.max; tenths++) {
      const cuts = cutCandidates(thousands, tenths);
      const { lo, hi } = targetWindow(tenths);
      for (const hundreds of cuts)
        for (let target = lo; target <= hi; target += 5)
          if (derive(thousands, tenths, hundreds, target)) n++;
    }
  return n * FIRMS.length;
}

const template = {
  id: 'capacity-utilisation',
  subject: 'business',
  unit: 'WBS12',
  specCode: '2.3.4',
  specLeaf: '2.3.4 · 2a, 2c',
  qs: 'QS2',
  specTerm: 'capacity utilisation',
  title: 'Capacity utilisation',
  topic: 'Resource management',
  // Counted, not multiplied out: 26 capacities × 481 utilisations × the cuts that keep the new
  // figure exact × the targets above it, less the refusals in `derive`, × 7 firms. See countVariants.
  variants: 1124235,

  draw(rng) {
    for (let attempt = 0; attempt < 200; attempt++) {
      const thousands = rng.int(CAPACITY.min, CAPACITY.max);
      const tenths = rng.int(UTILISATION.min, UTILISATION.max);
      const cuts = cutCandidates(thousands, tenths);
      if (!cuts.length) continue;
      const hundreds = rng.pick(cuts);
      const { lo, hi } = targetWindow(tenths);
      const d = derive(thousands, tenths, hundreds, rng.step(lo, hi, 5));
      if (d) return { firm: rng.pick(FIRMS), ...d };
    }
    throw new Error('capacity-utilisation: no clean draw in 200 attempts');
  },

  /** Checked independently by audit/scripts/quant-check.mjs on every draw. */
  invariants(d) {
    const bad = [];
    if (Math.abs((100 * d.current) / d.max - d.cu) > 1e-9) bad.push('capacity utilisation does not reproduce the draw');
    if (Math.abs((100 * d.current) / (d.max - d.cut) - d.after) > 1e-9) bad.push('the utilisation after the cut does not reproduce the draw');
    for (const [name, v] of [['utilisation', d.cu], ['utilisation after the cut', d.after]]) {
      if (Math.abs(Number(v.toFixed(1)) - v) > 1e-9) bad.push(`the ${name} is not exact to one decimal place`);
    }
    if (!Number.isInteger(d.current) || !Number.isInteger(d.extra)) bad.push('an output figure is not a whole number of units');
    if (d.target - d.cu < 5) bad.push('the target is not at least five points above today’s utilisation');
    if (d.after <= d.cu || d.after > 98) bad.push('closing the line does not raise utilisation to a figure at or below 98%');
    if (d.cut > 0.4 * d.max + 1e-9 || d.cut < 500) bad.push('the cut is not between 500 units and 40% of capacity');
    if (d.after === d.target || [d.max, d.current, d.cut].includes(d.extra)) {
      bad.push('an answer is one of the figures printed in the stem');
    }
    return bad;
  },

  build(d) {
    const s = slipsFor(d);
    return {
      stem:
        `**${d.firm}** can make at most **${num(d.max)}** units a month and currently makes ` +
        `**${num(d.current)}**. Its managers want capacity utilisation of **${d.target}%**. Another option ` +
        `is to close a production line with capacity for **${num(d.cut)}** units a month, keeping ` +
        `output the same.`,
      steps: [
        {
          id: 'cu',
          label: 'Current capacity utilisation, to one decimal place',
          method: 'current output ÷ maximum possible output × 100',
          suffix: '%',
          marks: 2,
          dp: 1,
          answer: d.cu,
          tolerance: TOL,
          slips: [
            { value: s.cu[0], note: 'That is upside down. Capacity utilisation is current output divided by maximum possible output, so it cannot pass 100%.' },
            { value: s.cu[1], note: 'That is utilisation as a decimal. Multiply by 100 to give a percentage.' },
            { value: s.cu[2], note: 'That is the share of capacity standing idle. Utilisation is the share in use: current output over maximum.' },
          ],
        },
        {
          id: 'extra',
          label: 'Extra units a month needed to reach the target without closing the line',
          method: 'target % × maximum possible output ÷ 100 − current output',
          suffix: 'units',
          marks: 2,
          dp: 0,
          answer: d.extra,
          tolerance: 0.5,
          ofr: (v) => (Number.isFinite(v.cu) ? ((d.target - v.cu) / 100) * d.max : null),
          slips: [
            { value: s.extra[0], note: 'That is the total output needed at the target. Take current output off to find the increase.' },
            { value: s.extra[1], note: 'You applied the percentage-point gap to current output. The target is a share of MAXIMUM possible output.' },
            { value: s.extra[2], note: 'That is the gap in percentage points, not units. Turn it into units using maximum possible output.' },
          ],
        },
        {
          id: 'after',
          label: 'Capacity utilisation after closing the line, to one decimal place',
          method: 'current output ÷ (maximum possible output − capacity removed) × 100',
          suffix: '%',
          marks: 2,
          dp: 1,
          answer: d.after,
          tolerance: TOL,
          slips: [
            { value: s.after[0], note: 'That is today’s figure. Closing the line lowers maximum possible output, so divide by the smaller maximum.' },
            { value: s.after[1], note: 'You took the closed line’s capacity off output. Output stays the same; it is the maximum that falls.' },
            { value: s.after[2], note: 'You added the closed line’s capacity to the maximum. Closing it takes that capacity away.' },
          ],
        },
      ],
      solution: [
        `Capacity utilisation = ${num(d.current)} ÷ ${num(d.max)} × 100 = **${d.cu.toFixed(1)}%**`,
        `Output at ${d.target}% = ${d.target}% × ${num(d.max)} = ${num((d.target * d.max) / 100)}, so the extra needed = ${num((d.target * d.max) / 100)} − ${num(d.current)} = **${num(d.extra)} units**`,
        `New maximum = ${num(d.max)} − ${num(d.cut)} = ${num(d.reduced)}; utilisation = ${num(d.current)} ÷ ${num(d.reduced)} × 100 = **${d.after.toFixed(1)}%**`,
        `Both routes raise utilisation: one by making more, the other by having less capacity to fill.`,
      ],
    };
  },
};

export default template;
