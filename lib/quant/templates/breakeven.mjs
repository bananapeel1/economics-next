import { money, num, FIRMS } from '../format.mjs';

/**
 * Break-even output and margin of safety. Edexcel IAL Business, WBS12 (Unit 2),
 * spec 2.3.2 Financial planning, topic 3 leaves c and d (bus_spec.txt:885, :903-904).
 * Calculate carries 4 marks in Business.
 *
 * Every figure is drawn so the answers are whole: contribution and break-even output
 * are chosen first and fixed costs are derived from them, so `fixed / contribution`
 * can never produce a fraction of a unit.
 */
const template = {
  id: 'breakeven',
  subject: 'business',
  unit: 'WBS12',
  specCode: '2.3.2',
  specLeaf: '2.3.2 · 3c, 3d',
  qs: 'QS5',
  specTerm: 'margin of safety',
  title: 'Break-even and margin of safety',
  topic: 'Financial planning',
  // 15 contributions × 22 variable costs × 76 break-even points × 27 margins × 7 firms
  variants: 15 * 22 * 76 * 27 * FIRMS.length,

  draw(rng) {
    const contribution = rng.int(6, 20);
    let variable = rng.int(4, 25);
    /*
     * Never the same number as the contribution. The variable cost is printed in the stem, so
     * where the two coincide a student who typed what they could see — without subtracting
     * anything — took the mark for step one. Found by reading the card rather than the data:
     * `audit/runs/packet-13.2/leak-census.mjs`, 213 of 5,000 draws. The selling price is already
     * safe because it is a named slip and `quant-check` keeps every slip clear of the answer;
     * nothing was watching the variable cost.
     */
    while (variable === contribution) variable = rng.int(4, 25);
    const breakEven = rng.step(150, 900, 10);
    const price = variable + contribution;
    // The margin of safety is drawn, not derived from a free `output`, for the same reason the
    // variable cost is kept off the contribution: it is an answer, and at $40 a unit against a
    // margin of 40 units a student who typed the price they could see took the mark. Rare —
    // 3 draws in 5,000 — and the "printed answer" check in `npm run quant-check` fails it.
    // Only `price` can collide: the margin is a multiple of 10 from 40 up, the contribution is
    // at most 20 and the variable cost at most 25, so neither can ever equal it. Verify A round
    // 4 named the other two clauses as dead code, and a guard clause that cannot fire is worse
    // than none — it reads as protection.
    let margin = rng.step(40, 300, 10);
    while (margin === price) margin = rng.step(40, 300, 10);
    return {
      firm: rng.pick(FIRMS),
      contribution,
      variable,
      price,
      breakEven,
      fixed: contribution * breakEven,
      output: breakEven + margin,
    };
  },

  /** Checked independently by audit/scripts/quant-check.mjs on every draw. */
  invariants(d) {
    const bad = [];
    if (d.price <= d.variable) bad.push('price is not above variable cost');
    if (d.variable === d.contribution) bad.push('the variable cost printed in the stem is the answer to step one');
    if (d.fixed % d.contribution !== 0) bad.push('break-even output is not a whole number');
    if (d.output <= d.breakEven) bad.push('margin of safety is not positive');
    return bad;
  },

  build(d) {
    return {
      stem:
        `**${d.firm}** sells a single product for **$${d.price}** a unit. Variable costs are ` +
        `**$${d.variable}** a unit and fixed costs are **${money(d.fixed)}** a month. The business ` +
        `currently makes and sells **${num(d.output)}** units a month.`,
      steps: [
        {
          id: 'contribution',
          label: 'Contribution per unit',
          method: 'selling price − variable cost per unit',
          prefix: '$',
          marks: 1,
          dp: 0,
          answer: d.contribution,
          tolerance: 0.01,
          slips: [
            { value: d.price, note: 'That is the selling price. Variable cost has to come off first.' },
            { value: d.price + d.variable, note: 'You added the variable cost. Contribution is price minus variable cost.' },
          ],
        },
        {
          id: 'breakEven',
          label: 'Break-even output',
          method: 'fixed costs ÷ contribution per unit',
          suffix: 'units',
          marks: 2,
          dp: 0,
          answer: d.breakEven,
          tolerance: 0.5,
          ofr: (v) => (v.contribution > 0 ? d.fixed / v.contribution : null),
          slips: [
            { value: d.fixed / d.price, note: 'You divided fixed costs by the selling price. Break-even uses contribution, not price.' },
          ],
        },
        {
          id: 'margin',
          label: 'Margin of safety',
          method: 'current output − break-even output',
          suffix: 'units',
          marks: 1,
          dp: 0,
          answer: d.output - d.breakEven,
          tolerance: 0.5,
          ofr: (v) => (v.breakEven !== null ? d.output - v.breakEven : null),
          slips: [
            { value: d.breakEven - d.output, note: 'Right size, wrong way round. Margin of safety is how far output can fall before losses start.' },
          ],
        },
      ],
      solution: [
        `Contribution = $${d.price} − $${d.variable} = **$${d.contribution}**`,
        `Break-even = ${money(d.fixed)} ÷ $${d.contribution} = **${num(d.breakEven)} units**`,
        `Margin of safety = ${num(d.output)} − ${num(d.breakEven)} = **${num(d.output - d.breakEven)} units**`,
      ],
    };
  },
};

export default template;
