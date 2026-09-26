import { money, num, round } from '../format.mjs';

/**
 * Cross elasticity of demand from one good's price change and another good's quantity demanded.
 * Edexcel IAL Economics, WEC11 (Unit 1), spec 1.3.2 Consumer behaviour and demand, topic 3 leaves
 * b "How to use formulae to calculate price, income and cross-elasticities of demand"
 * (econ_spec.txt:604-605) and i "Interpretation of numerical values of cross elasticity of demand.
 * Significance for the degree to which goods are: substitutes, complements, unrelated"
 * (:643-647). QS2 and QS8 (econ_spec.txt:2767, :2785).
 *
 * The classification offers the specification's three words, "unrelated" included, although no
 * draw is unrelated: an XED of exactly zero needs a quantity that does not move at all, which turns
 * the first step into a trick. An XED of +0.08 is a real weak substitute, but a student who
 * answers "unrelated, it is nearly zero" has a defensible reading, so the draw keeps every XED at
 * 0.2 or more in size and "unrelated" is only ever wrong for a reason the note can state.
 *
 * `acceptAbs` is deliberately absent. The sign of XED is the whole of its meaning — +0.5 and −0.5
 * are a substitute and a complement — so dropping it is a named slip, never a correct answer.
 *
 * Every parameter is picked at the top of an attempt, in a fixed order, and the attempt is then
 * accepted or rejected whole, so `variants` can be counted by exhaustion
 * (audit/runs/packet-13.3/templates-economics.md).
 */

/**
 * Pairs whose relationship is not in doubt, because the stem states it only through the numbers
 * and the numbers must agree with the world. `a` is the good whose demand is measured, `b` the good
 * whose price changes, priced per `per`, with prices in whole dollars or clean cents.
 */
const PAIRS = [
  { a: 'bus journeys', measure: ' thousand', b: 'taxi rides', per: 'a ride', relation: 'substitutes', prices: [4, 5, 6, 8, 10, 12, 15, 16] },
  { a: 'tea', measure: ' tonnes', b: 'coffee', per: 'a kilogram', relation: 'substitutes', prices: [8, 10, 12, 14, 15, 16, 18, 24] },
  { a: 'chicken', measure: ' tonnes', b: 'beef', per: 'a kilogram', relation: 'substitutes', prices: [6, 7, 8, 9, 10, 11, 12, 14] },
  { a: 'rice', measure: ' tonnes', b: 'wheat flour', per: 'a sack', relation: 'substitutes', prices: [16, 18, 20, 24, 28, 30, 32, 36] },
  { a: 'new cars', measure: '', b: 'petrol', per: 'a litre', relation: 'complements', prices: [0.8, 0.9, 1, 1.2, 1.4, 1.5, 1.6, 2] },
  { a: 'printers', measure: '', b: 'ink cartridges', per: 'a cartridge', relation: 'complements', prices: [16, 18, 20, 24, 28, 30, 32, 40] },
  { a: 'games consoles', measure: '', b: 'video games', per: 'a game', relation: 'complements', prices: [30, 36, 40, 45, 48, 50, 60, 64] },
  { a: 'smartphones', measure: '', b: 'mobile data', per: 'a monthly bundle', relation: 'complements', prices: [8, 10, 12, 15, 16, 18, 20, 24] },
];

const PRICE_PCTS = [5, 8, 10, 12.5, 15, 20, 25];
// Nothing under 5 per cent. Below it, "divided by the new quantity" lands within twice the step's
// tolerance of the answer (4% against 3.85%), the draw rejects every such set, and a size that can
// never be drawn only makes the parameter space look larger than it is.
const QUANTITY_PCTS = [5, 6, 7.5, 8, 9, 10, 12, 12.5, 15, 16, 18, 20, 24, 25, 30, 36, 40];
const QUANTITIES = [200, 240, 300, 400, 480, 500, 600, 750, 800, 900, 1000, 1200, 1500, 1600, 2000, 2400, 2500, 3000];

const TOL = { pctQ: 0.1, pctP: 0.1, xed: 0.02 };

const exactTo = (x, dp) => Math.abs(x - Number(x.toFixed(dp))) < 1e-9;
/** "$12" or "$1.20" — never "$1.2", which reads as a typo on a price. */
const signed = (n, dp) => (n < 0 ? `−${Math.abs(n).toFixed(dp)}` : `+${n.toFixed(dp)}`);
const bare = (n) => (n < 0 ? `−${Math.abs(n)}` : `${n}`);
const capital = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function slipsFor(d) {
  const pctQ = [
    { value: round(((d.q2 - d.q1) / d.q2) * 100, 2), note: 'You divided by the new quantity. A percentage change is always measured against the original figure.' },
    { value: round(d.pctQ / 100, 4), note: 'That is the change as a decimal. Multiply by 100 to turn it into a percentage.' },
  ];
  if (d.pctQ < 0) {
    pctQ.push({ value: -d.pctQ, note: 'Quantity demanded fell, so the percentage change is negative. Keep the sign: it decides the sign of XED, and the sign is what XED means.' });
  }
  const pctP = [
    { value: round(((d.p2 - d.p1) / d.p2) * 100, 2), note: 'You divided by the new price. The original price is the base.' },
    { value: round(d.pctP / 100, 4), note: 'That is the change as a decimal. Multiply by 100 to turn it into a percentage.' },
  ];
  if (d.pctP < 0) {
    pctP.push({ value: -d.pctP, note: 'The price fell, so the percentage change is negative. Keep the sign: it carries straight into the sign of XED.' });
  }
  const xed = [
    { value: round(d.pctP / d.pctQ, 2), note: 'That is the price change over the quantity change. XED puts the percentage change in quantity demanded of the OTHER good on top.' },
    { value: round((d.q2 - d.q1) / (d.p2 - d.p1), 2), note: 'You divided the change in quantity by the change in price. Elasticity compares PERCENTAGE changes, so turn both into percentages first.' },
  ];
  if (d.xed < 0) {
    xed.push({ value: -d.xed, note: 'The size is right but the sign is not. For XED the sign IS the answer: negative means complements, positive means substitutes.' });
  }
  return { pctQ, pctP, xed };
}

/** The draw, as a pure function of its picks. Returns null to reject. */
function accept({ pair, priceRises, priceSize, p1, quantitySize, q1 }) {
  const pctP = priceRises ? priceSize : -priceSize;
  const p2 = round(p1 * (1 + pctP / 100), 6);
  if (!exactTo(p2, 2) || p2 <= 0) return null;
  // Substitutes: demand for A moves WITH the price of B. Complements: against it.
  const pctQ = (pair.relation === 'substitutes') === priceRises ? quantitySize : -quantitySize;
  const q2 = round(q1 * (1 + pctQ / 100), 6);
  if (!Number.isInteger(q2) || q2 <= 0) return null;
  const xed = pctQ / pctP;
  if (!exactTo(xed, 2)) return null;
  if (Math.abs(xed) < 0.2) return null; // see the header: "unrelated" must stay indefensible
  if (Math.abs(xed) > 3) return null; // a 5% dearer data bundle does not cut phone sales by a third

  const d = { pair, p1, p2: round(p2, 2), q1, q2, pctP, pctQ, xed: round(xed, 2) };

  const slips = slipsFor(d);
  const answers = { pctQ: d.pctQ, pctP: d.pctP, xed: d.xed };
  for (const [step, list] of Object.entries(slips)) {
    if (list.some((s) => !Number.isFinite(s.value) || Math.abs(s.value - answers[step]) <= TOL[step] * 2)) return null;
  }
  /*
   * No answer may be a figure printed on the card. The prices are small — a coffee price of $20
   * rising 25% to $25 prints the answer to step two, and a petrol price of $1.50 prints an XED of
   * 1.5. Compared in both signed and absolute form, and at one decimal place too, because
   * `quant-check` searches for both and a student reading the card does not care about the sign.
   */
  const printed = [d.p1, d.p2, d.q1, d.q2];
  const forms = (a) => [a, Math.abs(a), round(a, 1), Math.abs(round(a, 1))];
  if (Object.values(answers).some((a) => forms(a).some((f) => printed.includes(f)))) return null;
  return d;
}

const moves = (from, to) => (to > from ? 'rises' : 'falls');

const template = {
  id: 'xed',
  subject: 'economics',
  unit: 'WEC11',
  specCode: '1.3.2',
  specLeaf: '1.3.2 · 3b, 3i',
  qs: 'QS2, QS8',
  specTerm: 'cross elasticity of demand',
  title: 'Cross elasticity of demand',
  topic: 'Consumer behaviour and demand',
  // Distinct stems, counted by exhaustion over every pick the draw can make
  // (audit/runs/packet-13.3/templates-economics.md).
  variants: 144_085,

  draw(rng) {
    for (let attempt = 0; attempt < 400; attempt++) {
      const pair = rng.pick(PAIRS);
      const d = accept({
        pair,
        priceRises: rng.pick([true, true, false]),
        priceSize: rng.pick(PRICE_PCTS),
        p1: rng.pick(pair.prices),
        quantitySize: rng.pick(QUANTITY_PCTS),
        q1: rng.pick(QUANTITIES),
      });
      if (d) return d;
    }
    throw new Error('xed: no clean draw in 400 attempts');
  },

  /** Checked independently by audit/scripts/quant-check.mjs on every draw. */
  invariants(d) {
    const bad = [];
    if (!Number.isInteger(d.q2)) bad.push('the new quantity is not a whole number');
    if (Math.abs(((d.q2 - d.q1) / d.q1) * 100 - d.pctQ) > 1e-9) bad.push('the quantity change does not reproduce the draw');
    if (Math.abs(((d.p2 - d.p1) / d.p1) * 100 - d.pctP) > 1e-6) bad.push('the price change does not reproduce the draw');
    if (Math.abs(d.pctQ / d.pctP - d.xed) > 1e-9) bad.push('XED is not exact to two decimal places');
    if (Math.abs(d.xed) < 0.2) bad.push('XED is close enough to zero that "unrelated" is defensible');
    if (Math.abs(d.xed) > 3) bad.push('XED is larger than any market a drill should describe');
    if ((d.xed > 0) !== (d.pair.relation === 'substitutes')) bad.push('the sign of XED contradicts the pair of goods named');
    return bad;
  },

  build(d) {
    const { a, b, per, relation, measure } = d.pair;
    const substitutes = relation === 'substitutes';
    const answer = substitutes ? 'Substitutes' : 'Complements';
    const why =
      `XED is ${signed(d.xed, 2)}. ${substitutes
        ? `It is positive: when ${b} became ${d.p2 > d.p1 ? 'dearer' : 'cheaper'}, demand for ${a} moved the same way, so consumers switch between them — substitutes.`
        : `It is negative: when ${b} became ${d.p2 > d.p1 ? 'dearer' : 'cheaper'}, demand for ${a} moved the other way, so they are used together — complements.`}` +
      ' Unrelated goods would show an XED of zero.';
    return {
      stem:
        `The price of **${b}** ${moves(d.p1, d.p2)} from **${money(d.p1)}** to **${money(d.p2)}** ${per}. ` +
        `Over the same period the quantity of **${a}** demanded ${moves(d.q1, d.q2)} from **${num(d.q1)}**${measure} ` +
        `to **${num(d.q2)}**${measure} a month. Nothing else that affects demand for ${a} has changed.`,
      steps: [
        {
          id: 'pctQ',
          label: `Percentage change in quantity demanded of ${a}`,
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
          label: `Percentage change in the price of ${b}`,
          method: '(new price − original price) ÷ original price × 100',
          suffix: '%',
          marks: 1,
          dp: 1,
          answer: d.pctP,
          tolerance: TOL.pctP,
          slips: slipsFor(d).pctP,
        },
        {
          id: 'xed',
          label: 'Cross elasticity of demand (XED), to two decimal places, with its sign',
          method: `% change in quantity demanded of ${a} ÷ % change in the price of ${b}`,
          marks: 1,
          dp: 2,
          answer: d.xed,
          tolerance: TOL.xed,
          ofr: (v) => (Number.isFinite(v.pctQ) && Number.isFinite(v.pctP) && v.pctP !== 0 ? v.pctQ / v.pctP : null),
          slips: slipsFor(d).xed,
        },
        {
          id: 'verdict',
          label: `${capital(a)} and ${b} are therefore`,
          method: 'positive XED: substitutes; negative XED: complements; zero: unrelated',
          type: 'choice',
          marks: 1,
          choices: ['Substitutes', 'Complements', 'Unrelated'],
          answer,
          correctNote: why,
          wrongNote: `Not quite. ${why}`,
        },
      ],
      solution: [
        `%ΔQd (${a}) = (${num(d.q2)} − ${num(d.q1)}) ÷ ${num(d.q1)} × 100 = **${signed(d.pctQ, 1)}%**`,
        `%ΔP (${b}) = (${money(d.p2)} − ${money(d.p1)}) ÷ ${money(d.p1)} × 100 = **${signed(d.pctP, 1)}%**`,
        `XED = ${bare(d.pctQ)} ÷ ${bare(d.pctP)} = **${signed(d.xed, 2)}**`,
        `XED ${d.xed > 0 ? '> 0' : '< 0'}, so ${a} and ${b} are **${relation}**`,
      ],
    };
  },
};

export default template;
