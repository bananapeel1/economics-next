import { money, num, FIRMS } from '../format.mjs';

/**
 * Break-even output and margin of safety. Edexcel IAL Business, WBS12 (Unit 2),
 * spec 2.3.1. Calculate carries 4 marks in Business.
 *
 * Every figure is drawn so the answers are whole: contribution and break-even output
 * are chosen first and fixed costs are derived from them, so `fixed / contribution`
 * can never produce a fraction of a unit.
 */
const template = {
  id: 'breakeven',
  subject: 'business',
  unit: 'WBS12',
  specCode: '2.3.1',
  title: 'Break-even and margin of safety',
  topic: 'Managing finance',
  // 15 contributions × 22 variable costs × 76 break-even points × 27 margins × 7 firms
  variants: 15 * 22 * 76 * 27 * FIRMS.length,

  draw(rng) {
    const contribution = rng.int(6, 20);
    const variable = rng.int(4, 25);
    const breakEven = rng.step(150, 900, 10);
    return {
      firm: rng.pick(FIRMS),
      contribution,
      variable,
      price: variable + contribution,
      breakEven,
      fixed: contribution * breakEven,
      output: breakEven + rng.step(40, 300, 10),
    };
  },

  /** Checked independently by audit/scripts/quant-check.mjs on every draw. */
  invariants(d) {
    const bad = [];
    if (d.price <= d.variable) bad.push('price is not above variable cost');
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
