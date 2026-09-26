/**
 * Subsidy on a merit good. Edexcel IAL Economics, WEC11 (Unit 1), spec 1.4.3.
 *
 * The mirror of the tax drill, and deliberately the second spec: it is the one students most
 * often draw by shifting the wrong curve, because "the government pays" sounds like demand.
 */
const spec = {
  id: 'subsidy',
  subject: 'economics',
  unit: 'WEC11',
  specCode: '1.3.6',
  specTerm: 'subsidies',
  title: 'Subsidy on a merit good',
  topic: 'Government intervention',
  prompt:
    'The government pays producers a subsidy of **$30 per unit** on public transport journeys. Show the effect on the market, and shade the resulting welfare loss.',

  axes: {
    x: { label: 'Quantity (000 journeys per week)', max: 120 },
    y: { label: 'Price ($ per journey)', max: 140 },
  },
  curves: {
    D: { intercept: 120, slope: -1 },
    S: { intercept: 20, slope: 1 },
  },
  regions: 'subsidyWelfare',
  expect: { curve: 'S', direction: 'down', size: 30, regions: ['dwl'] },
  tolerance: { q: 4, p: 6 },

  feedback: {
    rightCurve: 'Supply shifts: the subsidy lowers the cost of supplying every unit.',
    wrongCurve:
      'You shifted demand. The subsidy is paid to producers, so it cuts their costs — it does not change how much buyers want.',
    bothMoved: 'Both curves moved. A per-unit subsidy to producers shifts supply only.',
    nothingMoved: 'Nothing moved. A subsidy changes the cost of supplying every unit, so one curve has to shift.',
    wrongDirection: 'You shifted supply up and left. That is a rise in costs — a tax, not a subsidy.',
    rightDirection: 'Down and to the right, matching the subsidy.',
    equilibriumAtOldQuantity:
      'You marked the price on S₂ at the original quantity. Quantity adjusts too — the new equilibrium is where S₂ meets D.',
    rightRegion:
      'The triangle beyond the original quantity — journeys that only happen because of the subsidy, and cost more to provide than they are worth.',
    regions: {
      'cg+pg': 'That is the cost of the subsidy to the taxpayer. Most of it is transferred to consumers and producers, not lost.',
      cg: 'That is the consumers’ share of the subsidy. It is a transfer to them, not a loss.',
      pg: 'That is the producers’ share of the subsidy. It is a transfer to them, not a loss.',
    },
  },
};

export default spec;
