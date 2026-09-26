import { money, round, exactly } from '../format.mjs';

/**
 * Marginal revenue, marginal cost, average cost and the profit-maximising output, from a firm's
 * total revenue and total cost at four outputs.
 *
 * Edexcel IAL Economics, WEC13 (Unit 3). The arithmetic is spec 3.3.2 Revenue, costs and profits:
 * topic 1a "Formulae to calculate and understand the relationship between: total revenue, average
 * revenue, marginal revenue" (econ_spec.txt:1298-1301), topic 2c the same for "total cost …
 * average (total) cost … marginal cost" (:1307-1314), and topic 4a "The distinction between normal
 * profit, supernormal profit and losses" (:1350-1351). The profit-maximising rule is NOT in 3.3.2:
 * "profit maximisation" sits under 3.3.1 Types and sizes of businesses, topic 3 leaves a and c
 * "Formulae for different business objectives: profit maximisation" (:1277-1278, :1284-1285).
 * The template cites 3.3.2, where four of its five steps live, and names 3.3.1 · 3c in `specLeaf`
 * for the fifth.
 * QS6 "Calculate cost, revenue and profit (marginal, average, totals)" and QS9 "… tabular and
 * numerical forms" (econ_spec.txt:2779-2781, :2788-2789).
 *
 * ── Why four outputs, and why the crossing is never AT a unit ──
 *
 * With whole units, "MC = MR" names a unit only when the two happen to be equal there, and when they
 * are, profit is the same one unit either side of it — two right answers to a one-answer step. So
 * the draw builds the crossing BETWEEN units: the k-th unit's MR exceeds its MC and the (k+1)-th's
 * falls short of it. Profit (TR − TC) is then greatest at exactly one output, the MC = MR rule and
 * the "largest profit" reading agree, and there is one answer. The crossing is always inside the
 * four outputs shown, never at an end, so the data show both sides of it.
 *
 * The demand curve slopes down (the firm is a price maker): P = a − bQ, so TR = aQ − bQ² and MR falls
 * by 2b a unit. Under a flat demand curve MR IS average revenue, and step one's named slip — giving
 * the price instead of MR — would be the right answer.
 *
 * Every parameter is picked at the top of an attempt, in a fixed order, and the attempt is then
 * accepted or rejected whole, so `variants` can be counted by exhaustion
 * (audit/runs/packet-13.3/templates-economics.md).
 */

const CONTEXTS = [
  { firm: 'Kandy Cycle Works, Sri Lanka', product: 'custom bicycles', per: 'a week' },
  { firm: 'Nicosia Print Co, Cyprus', product: 'print jobs', per: 'a day' },
  { firm: 'Malé Water Sports, Maldives', product: 'diving trips', per: 'a day' },
  { firm: 'Dhaka Denim Ltd, Bangladesh', product: 'tailored denim jackets', per: 'a day' },
  { firm: 'Nairobi Fresh Juice Ltd', product: 'juice catering orders', per: 'a day' },
  { firm: 'Doha Sports Nutrition', product: 'nutrition consultations', per: 'a day' },
  { firm: 'Zahrat Cafés, Dubai', product: 'catering orders', per: 'a day' },
];

const FIRST_OUTPUTS = [2, 3, 4, 5, 6, 7];      // the four outputs shown are q0 … q0 + 3
const DEMAND_SLOPES = [2, 3, 4, 5, 6, 8];      // b in P = a − bQ
const COST_CURVATURES = [1, 2, 3, 4, 5];       // d in TC = F + cQ + dQ²
const COST_LINEAR = [10, 15, 20, 25, 30, 40, 50, 60];
// Weighted towards supernormal profit and a loss: normal profit needs TR to equal TC exactly, which
// is a special case, and every normal-profit pick survives the draw where many of the others do not.
const OUTCOMES = ['supernormal', 'supernormal', 'supernormal', 'normal', 'loss', 'loss'];
const PROFIT_SIZES = [20, 30, 40, 50, 60, 80, 100, 120];

const TOL = { mr: 0.5, mc: 0.5, output: 0.4, ac: 0.05 };

const ordinal = (n) => `${n}${n % 10 === 1 && n !== 11 ? 'st' : n % 10 === 2 && n !== 12 ? 'nd' : n % 10 === 3 && n !== 13 ? 'rd' : 'th'}`;
const list = (xs) => `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`;
const listOr = (xs) => `${xs.slice(0, -1).join(', ')} or ${xs[xs.length - 1]}`;

/**
 * Named wrong answers for the output step. Two wrong methods often land on the same output — with a
 * large fixed cost, average cost is still falling at the last output shown, which is also where
 * revenue peaks — and the marker returns the first slip that matches, so a second note on the same
 * value would never be read. Reasons are therefore collected per output and written as one note.
 */
function outputSlips(d) {
  const reasons = new Map();
  const add = (value, reason) => {
    if (value === null || value === d.k) return;
    reasons.set(value, [...(reasons.get(value) || []), reason]);
  };
  add(d.k + 1, 'the last unit’s marginal cost is above its marginal revenue, so producing it lowers profit');
  add(d.revenueMax, 'total revenue is highest — revenue maximisation, which carries on as long as MR is positive');
  add(d.minAc, 'average cost is lowest — productive efficiency');
  return [...reasons].map(([value, why]) => ({
    value,
    note: `At ${value} units ${why.join(', and ')}. ${value === d.k + 1
      ? 'Stop at the last unit whose MR is at least its MC: that is where MC = MR.'
      : 'Profit maximisation is where MC = MR, which is a different output here.'}`,
  }));
}

function slipsFor(d) {
  return {
    mr: [
      { value: d.arN, note: `That is average revenue — the price, total revenue ÷ output. Marginal revenue is what the ${ordinal(d.n)} unit ADDS to total revenue.` },
    ],
    mc: [
      { value: round(d.tc[d.n - d.q0] / d.n, 2), note: `That is average cost at ${d.n} units. Marginal cost is what the ${ordinal(d.n)} unit ADDS to total cost.` },
    ],
    output: outputSlips(d),
    ac: [
      { value: d.mcK, note: 'That is the marginal cost of the last unit. Average cost is total cost divided by the number of units.' },
      { value: d.tcK, note: 'That is total cost. Divide it by output to get the cost per unit.' },
    ],
  };
}

/** The draw, as a pure function of its picks. Returns null to reject. */
function accept({ context, q0, kOffset, nOffset, b, d: curve, delta, c, outcome, profitSize }) {
  const s = b + curve;
  const k = q0 + kOffset;
  // MR − MC for unit n is (a − c) − s(2n − 1). Setting a − c = 2ks + delta with |delta| < s puts
  // the sign change strictly between unit k (positive) and unit k + 1 (negative).
  const a = c + 2 * k * s + delta;
  const outputs = [q0, q0 + 1, q0 + 2, q0 + 3];
  const mr = (n) => a - b * (2 * n - 1);
  const mc = (n) => c + curve * (2 * n - 1);
  if (mr(q0 + 3) <= 0) return null; // MR stays positive, so revenue peaks at the last output shown

  const trOf = (q) => a * q - b * q * q;
  const profit = outcome === 'supernormal' ? profitSize : outcome === 'loss' ? -profitSize : 0;
  const fixed = trOf(k) - (c * k + curve * k * k) - profit;
  if (fixed < 20) return null; // a firm with next to no fixed cost is not a firm
  const tcOf = (q) => fixed + c * q + curve * q * q;

  const tr = outputs.map(trOf);
  const tc = outputs.map(tcOf);
  const n = q0 + nOffset;
  // Average cost is asked to the cent and rounded there, not required to divide exactly: a whole-
  // dollar total cost divides into cents only by 4, 5 and (half the time) 8 units, and requiring it
  // made "8 units" the right profit-maximising output in 27% of draws — a figure a student could
  // learn to type without looking.
  const acK = tcOf(k) / k;

  // Lowest average cost among the outputs shown, when it is a single output.
  const acs = outputs.map((q) => tcOf(q) / q);
  const lowest = Math.min(...acs);
  const minAc = acs.filter((x) => Math.abs(x - lowest) < 1e-9).length === 1 ? outputs[acs.indexOf(lowest)] : null;

  const d = {
    context, q0, k, n, outputs, tr, tc, outcome,
    mrN: mr(n), mcN: mc(n), arN: round(trOf(n) / n, 2),
    mcK: mc(k), tcK: tcOf(k), trK: trOf(k), acK: round(acK, 2), arK: a - b * k,
    revenueMax: q0 + 3, minAc,
  };

  // Money answers stay above 12: the check for a printed answer exempts a bare small integer, and
  // an MC of $5 beside an output of 5 is a coincidence nobody should have to reason about.
  if ([d.mrN, d.mcN, d.acK].some((x) => x <= 12)) return null;

  const slips = slipsFor(d);
  const answers = { mr: d.mrN, mc: d.mcN, output: d.k, ac: d.acK };
  for (const [step, xs] of Object.entries(slips)) {
    if (xs.some((x) => !Number.isFinite(x.value) || Math.abs(x.value - answers[step]) <= TOL[step] * 2)) return null;
  }
  // No money answer may be a figure printed on the card — the eight totals and the four outputs.
  const printed = [...outputs, ...tr, ...tc];
  if ([d.mrN, d.mcN, d.acK].some((x) => printed.includes(x) || printed.includes(round(x, 1)))) return null;
  return d;
}

const template = {
  id: 'revenue-costs',
  subject: 'economics',
  unit: 'WEC13',
  specCode: '3.3.2',
  specLeaf: '3.3.2 · 1a, 2c, 4a; 3.3.1 · 3c',
  qs: 'QS6, QS9',
  specTerm: 'marginal revenue',
  title: 'Marginal revenue, marginal cost and profit maximisation',
  topic: 'Revenue, costs and profits',
  // Distinct stems, counted by exhaustion over every pick the draw can make: 671,302 for each of the
  // seven firms, whose names make every stem distinct (audit/runs/packet-13.3/templates-economics.md).
  variants: 4_699_114,

  draw(rng) {
    for (let attempt = 0; attempt < 400; attempt++) {
      const context = rng.pick(CONTEXTS);
      const q0 = rng.pick(FIRST_OUTPUTS);
      const kOffset = rng.pick([1, 2]);
      const nOffset = rng.pick([1, 2, 3]);
      const b = rng.pick(DEMAND_SLOPES);
      const d = rng.pick(COST_CURVATURES);
      const delta = rng.int(-(b + d) + 1, b + d - 1);
      const found = accept({
        context, q0, kOffset, nOffset, b, d, delta,
        c: rng.pick(COST_LINEAR),
        outcome: rng.pick(OUTCOMES),
        profitSize: rng.pick(PROFIT_SIZES),
      });
      if (found) return found;
    }
    throw new Error('revenue-costs: no clean draw in 400 attempts');
  },

  /** Checked independently by audit/scripts/quant-check.mjs on every draw. Recomputes from the
   *  printed totals, not from the draw's own parameters. */
  invariants(d) {
    const bad = [];
    const i = (q) => q - d.q0;
    const mr = (q) => d.tr[i(q)] - d.tr[i(q) - 1];
    const mc = (q) => d.tc[i(q)] - d.tc[i(q) - 1];
    if (mr(d.n) !== d.mrN) bad.push('MR of the unit asked about does not match the printed totals');
    if (mc(d.n) !== d.mcN) bad.push('MC of the unit asked about does not match the printed totals');
    const profits = d.outputs.map((q) => d.tr[i(q)] - d.tc[i(q)]);
    const best = Math.max(...profits);
    if (profits.filter((p) => p === best).length !== 1) bad.push('profit is greatest at more than one output');
    if (d.outputs[profits.indexOf(best)] !== d.k) bad.push('the profit-maximising output is not the one where profit is greatest');
    if (d.k === d.q0 || d.k === d.q0 + 3) bad.push('the MC = MR crossing is at the edge of the data');
    if (!(mr(d.k) > mc(d.k) && mr(d.k + 1) < mc(d.k + 1))) bad.push('MR and MC do not cross between the profit-maximising unit and the next');
    for (let q = d.q0 + 1; q <= d.q0 + 3; q++) if (mr(q) <= 0) bad.push('MR is not positive across the outputs shown');
    const sign = Math.sign(d.tr[i(d.k)] - d.tc[i(d.k)]);
    if ({ supernormal: 1, normal: 0, loss: -1 }[d.outcome] !== sign) bad.push('the profit verdict does not match the totals');
    if (Math.abs(d.tc[i(d.k)] / d.k - d.acK) > 0.005 + 1e-9) bad.push('average cost is not total cost ÷ output, to the cent');
    return bad;
  },

  build(d) {
    const { firm, product, per } = d.context;
    const i = (q) => q - d.q0;
    const verdict = { supernormal: 'Supernormal profit', normal: 'Normal profit', loss: 'A loss' }[d.outcome];
    const profitK = d.trK - d.tcK;
    const why = d.outcome === 'supernormal'
      ? `At ${d.k} units total revenue (${money(d.trK)}) is above total cost (${money(d.tcK)}) — the price, ${money(d.arK)}, is above average cost. Total cost already includes normal profit, so the ${money(profitK)} left over is supernormal profit.`
      : d.outcome === 'normal'
        ? `At ${d.k} units total revenue equals total cost (${money(d.trK)}) — the price equals average cost. Total cost includes normal profit, so the firm earns exactly normal profit.`
        : `At ${d.k} units total revenue (${money(d.trK)}) is below total cost (${money(d.tcK)}) — the price, ${money(d.arK)}, is below average cost. Even the best output makes a loss of ${money(-profitK)}; MC = MR here minimises it.`;

    return {
      stem:
        `**${firm}** can make ${listOr(d.outputs.map((q) => `**${q}**`))} ${product} ${per}. At those outputs its total ` +
        `revenue would be ${list(d.tr.map((x) => `**${money(x)}**`))}, and its total cost ` +
        `${list(d.tc.map((x) => `**${money(x)}**`))}. Total cost includes normal profit.`,
      steps: [
        {
          id: 'mr',
          label: `Marginal revenue of the ${ordinal(d.n)} unit`,
          method: 'total revenue at this output − total revenue at one unit fewer',
          prefix: '$',
          marks: 1,
          dp: 0,
          answer: d.mrN,
          tolerance: TOL.mr,
          slips: slipsFor(d).mr,
        },
        {
          id: 'mc',
          label: `Marginal cost of the ${ordinal(d.n)} unit`,
          method: 'total cost at this output − total cost at one unit fewer',
          prefix: '$',
          marks: 1,
          dp: 0,
          answer: d.mcN,
          tolerance: TOL.mc,
          slips: slipsFor(d).mc,
        },
        {
          id: 'output',
          label: 'Profit-maximising output',
          method: 'MC = MR: produce each unit whose marginal revenue is above its marginal cost, and stop before the first unit where marginal cost is higher',
          suffix: 'units',
          marks: 2,
          dp: 0,
          answer: d.k,
          tolerance: TOL.output,
          slips: slipsFor(d).output,
        },
        {
          id: 'ac',
          label: 'Average cost at the profit-maximising output',
          method: 'total cost ÷ output',
          prefix: '$',
          marks: 1,
          dp: 2,
          answer: d.acK,
          tolerance: TOL.ac,
          // Own figure rule: the student's own output, if it is one of the four shown.
          ofr: (v) => (Number.isInteger(v.output) && d.outputs.includes(v.output) ? d.tc[i(v.output)] / v.output : null),
          slips: slipsFor(d).ac,
        },
        {
          id: 'verdict',
          label: 'At the profit-maximising output the firm makes',
          method: 'compare total revenue with total cost there (or the price with average cost)',
          type: 'choice',
          marks: 1,
          choices: ['Supernormal profit', 'Normal profit', 'A loss'],
          answer: verdict,
          correctNote: why,
          wrongNote: `Not quite. ${why}`,
        },
      ],
      solution: [
        `MR of the ${ordinal(d.n)} unit = ${money(d.tr[i(d.n)])} − ${money(d.tr[i(d.n) - 1])} = **${money(d.mrN)}**`,
        `MC of the ${ordinal(d.n)} unit = ${money(d.tc[i(d.n)])} − ${money(d.tc[i(d.n) - 1])} = **${money(d.mcN)}**`,
        `Units ${d.q0 + 1}–${d.q0 + 3}: MR ${list(d.outputs.slice(1).map((q) => money(d.tr[i(q)] - d.tr[i(q) - 1])))}; ` +
          `MC ${list(d.outputs.slice(1).map((q) => money(d.tc[i(q)] - d.tc[i(q) - 1])))}. MR > MC up to the ${ordinal(d.k)} unit ` +
          `and MR < MC for the ${ordinal(d.k + 1)}, so profit is maximised at **${d.k} units**`,
        `AC = ${money(d.tcK)} ÷ ${d.k} ${exactly(d.tcK / d.k, 2)} **${money(d.acK)}**`,
        `TR ${money(d.trK)} ${profitK > 0 ? '>' : profitK < 0 ? '<' : '='} TC ${money(d.tcK)}, so the firm makes **${verdict.toLowerCase()}**`,
      ],
    };
  },
};

export default template;
