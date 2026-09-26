import { money, num, round } from '../format.mjs';

/**
 * Price elasticity of supply from a pair of price/quantity-supplied observations.
 * Edexcel IAL Economics, WEC11 (Unit 1), spec 1.3.3 Supply, topic 2 leaves a "The concept of
 * 'price elasticity of supply'" and b "Calculation and interpretation of numerical values of price
 * elasticity of supply", whose bullets include "elastic supply", "unitary elastic supply" and
 * "inelastic supply" (econ_spec.txt:669-677). QS2 and QS8 (econ_spec.txt:2767, :2785).
 *
 * The classification offers the specification's own two words, "elastic" and "inelastic". PES is
 * never drawn at exactly 1: the specification lists unitary elastic supply as a third case, so a
 * two-way choice at 1 has no right answer.
 *
 * No `acceptAbs`. PES is positive whenever the supply curve slopes upwards, so there is no sign
 * to drop. When the price FALLS both percentage changes are negative, and dropping either sign is a
 * named slip: the direction is data, not a convention.
 *
 * Every parameter is picked at the top of an attempt, in a fixed order, and the attempt is then
 * accepted or rejected whole, so `variants` can be counted by exhaustion
 * (audit/runs/packet-13.3/templates-economics.md).
 */

const GOODS = [
  { good: 'fresh mangoes', measure: ' tonnes', per: 'a kilogram', prices: [2, 2.4, 2.5, 3, 3.2, 4, 5, 6] },
  { good: 'cement', measure: ' bags', per: 'a bag', prices: [6, 7, 8, 9, 10, 12, 14, 16] },
  { good: 'tea', measure: ' tonnes', per: 'a kilogram', prices: [3, 3.5, 4, 4.5, 5, 6, 7, 8] },
  { good: 'plastic chairs', measure: ' chairs', per: 'a chair', prices: [8, 9, 10, 12, 14, 15, 16, 18] },
  { good: 'cut flowers', measure: ' bunches', per: 'a bunch', prices: [3, 4, 5, 6, 7, 8, 9, 10] },
  { good: 'bottled water', measure: ' crates', per: 'a crate', prices: [4, 4.5, 5, 6, 7.5, 8, 9, 10] },
];

const PRICE_PCTS = [5, 8, 10, 12.5, 15, 20, 25];
// Nothing under 5 per cent. Below it, "divided by the new quantity" lands within twice the step's
// tolerance of the answer (4% against 3.85%), the draw rejects every such set, and a size that can
// never be drawn only makes the parameter space look larger than it is.
const QUANTITY_PCTS = [5, 6, 7.5, 8, 9, 10, 12, 12.5, 15, 16, 18, 20, 24, 25, 30, 36, 40];
const QUANTITIES = [400, 500, 600, 800, 1000, 1200, 1500, 1600, 2000, 2400, 2500, 3000, 4000, 5000, 6000, 8000];

const TOL = { pctQ: 0.1, pctP: 0.1, pes: 0.02 };

const exactTo = (x, dp) => Math.abs(x - Number(x.toFixed(dp))) < 1e-9;
const signed = (n, dp) => (n < 0 ? `−${Math.abs(n).toFixed(dp)}` : `+${n.toFixed(dp)}`);
const bare = (n) => (n < 0 ? `−${Math.abs(n)}` : `${n}`);

function slipsFor(d) {
  const pctQ = [
    { value: round(((d.q2 - d.q1) / d.q2) * 100, 2), note: 'You divided by the new quantity. A percentage change is always measured against the original figure.' },
    { value: round(d.pctQ / 100, 4), note: 'That is the change as a decimal. Multiply by 100 to turn it into a percentage.' },
  ];
  if (d.pctQ < 0) {
    pctQ.push({ value: -d.pctQ, note: 'Quantity supplied fell, so the percentage change is negative. Keep the sign: the direction of the change is part of the answer.' });
  }
  const pctP = [
    { value: round(((d.p2 - d.p1) / d.p2) * 100, 2), note: 'You divided by the new price. The original price is the base.' },
    { value: round(d.pctP / 100, 4), note: 'That is the change as a decimal. Multiply by 100 to turn it into a percentage.' },
  ];
  if (d.pctP < 0) {
    pctP.push({ value: -d.pctP, note: 'The price fell, so the percentage change is negative. Keep the sign: the direction of the change is part of the answer.' });
  }
  const pes = [
    { value: round(d.pctP / d.pctQ, 2), note: 'That is the price change over the quantity change. PES puts the percentage change in quantity supplied on top.' },
    { value: round((d.q2 - d.q1) / (d.p2 - d.p1), 2), note: 'You divided the change in quantity by the change in price. Elasticity compares PERCENTAGE changes, so turn both into percentages first.' },
  ];
  return { pctQ, pctP, pes };
}

/** The draw, as a pure function of its picks. Returns null to reject. */
function accept({ context, priceRises, priceSize, p1, quantitySize, q1 }) {
  const pctP = priceRises ? priceSize : -priceSize;
  const p2 = round(p1 * (1 + pctP / 100), 6);
  if (!exactTo(p2, 2) || p2 <= 0) return null;
  // Supply slopes upwards: quantity supplied moves the same way as the price.
  const pctQ = priceRises ? quantitySize : -quantitySize;
  const q2 = round(q1 * (1 + pctQ / 100), 6);
  if (!Number.isInteger(q2) || q2 <= 0) return null;
  const pes = pctQ / pctP;
  if (!exactTo(pes, 2)) return null;
  if (pes === 1) return null; // unitary elastic: the two-way choice has no right answer
  if (pes > 4) return null; // beyond this the stem describes no real producer

  const d = { context, p1, p2: round(p2, 2), q1, q2, pctP, pctQ, pes: round(pes, 2) };

  const slips = slipsFor(d);
  const answers = { pctQ: d.pctQ, pctP: d.pctP, pes: d.pes };
  for (const [step, list] of Object.entries(slips)) {
    if (list.some((s) => !Number.isFinite(s.value) || Math.abs(s.value - answers[step]) <= TOL[step] * 2)) return null;
  }
  // No answer may be a figure printed on the card: a price of $4 and a PES of 4, a price of $20
  // and a 20% rise. Signed, absolute and to one decimal place, as `quant-check` searches.
  const printed = [d.p1, d.p2, d.q1, d.q2];
  const forms = (a) => [a, Math.abs(a), round(a, 1), Math.abs(round(a, 1))];
  if (Object.values(answers).some((a) => forms(a).some((f) => printed.includes(f)))) return null;
  return d;
}

const template = {
  id: 'pes',
  subject: 'economics',
  unit: 'WEC11',
  specCode: '1.3.3',
  specLeaf: '1.3.3 · 2a, 2b',
  qs: 'QS2, QS8',
  specTerm: 'price elasticity of supply',
  title: 'Price elasticity of supply',
  topic: 'Supply',
  // Distinct stems, counted by exhaustion over every pick the draw can make
  // (audit/runs/packet-13.3/templates-economics.md).
  variants: 106_641,

  draw(rng) {
    for (let attempt = 0; attempt < 400; attempt++) {
      const context = rng.pick(GOODS);
      const d = accept({
        context,
        priceRises: rng.pick([true, true, true, false]),
        priceSize: rng.pick(PRICE_PCTS),
        p1: rng.pick(context.prices),
        quantitySize: rng.pick(QUANTITY_PCTS),
        q1: rng.pick(QUANTITIES),
      });
      if (d) return d;
    }
    throw new Error('pes: no clean draw in 400 attempts');
  },

  /** Checked independently by audit/scripts/quant-check.mjs on every draw. */
  invariants(d) {
    const bad = [];
    if (!Number.isInteger(d.q2)) bad.push('the new quantity is not a whole number');
    if (Math.abs(((d.q2 - d.q1) / d.q1) * 100 - d.pctQ) > 1e-9) bad.push('the quantity change does not reproduce the draw');
    if (Math.abs(((d.p2 - d.p1) / d.p1) * 100 - d.pctP) > 1e-6) bad.push('the price change does not reproduce the draw');
    if (Math.abs(d.pctQ / d.pctP - d.pes) > 1e-9) bad.push('PES is not exact to two decimal places');
    if (d.pes === 1) bad.push('PES is exactly 1, so the elastic/inelastic choice has no right answer');
    if (d.pes <= 0) bad.push('PES is not positive, so the supply curve would slope the wrong way');
    if (d.pes > 4) bad.push('PES is larger than any producer a drill should describe');
    return bad;
  },

  build(d) {
    const { good, per, measure } = d.context;
    const elastic = d.pes > 1;
    const rose = d.p2 > d.p1;
    const why = `PES is ${d.pes.toFixed(2)}, which is ${elastic ? 'greater' : 'less'} than 1: quantity supplied changed by a ${elastic ? 'larger' : 'smaller'} percentage than the price, so supply is ${elastic ? 'elastic' : 'inelastic'}.`;
    return {
      stem:
        `The market price of **${good}** ${rose ? 'rises' : 'falls'} from **${money(d.p1)}** to **${money(d.p2)}** ${per}. ` +
        `Producers respond by ${rose ? 'raising' : 'cutting'} the quantity supplied from **${num(d.q1)}**${measure} to ` +
        `**${num(d.q2)}**${measure} a week.`,
      steps: [
        {
          id: 'pctQ',
          label: 'Percentage change in quantity supplied',
          method: '(new quantity − original quantity) ÷ original quantity × 100',
          suffix: '%',
          marks: 1,
          dp: 1,
          answer: d.pctQ,
          tolerance: TOL.pctQ,
          slips: slipsFor(d).pctQ,
        },
        {
          id: 'pctP',
          label: 'Percentage change in price',
          method: '(new price − original price) ÷ original price × 100',
          suffix: '%',
          marks: 1,
          dp: 1,
          answer: d.pctP,
          tolerance: TOL.pctP,
          slips: slipsFor(d).pctP,
        },
        {
          id: 'pes',
          label: 'Price elasticity of supply (PES), to two decimal places',
          method: '% change in quantity supplied ÷ % change in price',
          marks: 1,
          dp: 2,
          answer: d.pes,
          tolerance: TOL.pes,
          ofr: (v) => (Number.isFinite(v.pctQ) && Number.isFinite(v.pctP) && v.pctP !== 0 ? v.pctQ / v.pctP : null),
          slips: slipsFor(d).pes,
        },
        {
          id: 'verdict',
          label: 'Supply is therefore',
          method: 'compare PES with 1',
          type: 'choice',
          marks: 1,
          choices: ['Elastic', 'Inelastic'],
          answer: elastic ? 'Elastic' : 'Inelastic',
          correctNote: why,
          wrongNote: `Not quite. ${why}`,
        },
      ],
      solution: [
        `%ΔQs = (${num(d.q2)} − ${num(d.q1)}) ÷ ${num(d.q1)} × 100 = **${signed(d.pctQ, 1)}%**`,
        `%ΔP = (${money(d.p2)} − ${money(d.p1)}) ÷ ${money(d.p1)} × 100 = **${signed(d.pctP, 1)}%**`,
        `PES = ${bare(d.pctQ)} ÷ ${bare(d.pctP)} = **${d.pes.toFixed(2)}**`,
        `${d.pes.toFixed(2)} ${elastic ? '>' : '<'} 1, so supply is **${elastic ? 'elastic' : 'inelastic'}**`,
      ],
    };
  },
};

export default template;
