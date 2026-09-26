/**
 * Indirect tax on a demerit good. Edexcel IAL Economics, WEC11 (Unit 1), spec 1.3.6.
 * "Draw" carries 4 marks in Economics.
 *
 * Terminology: welfare loss, never "deadweight loss" — packet 13 strips that as off-spec
 * (audit/PLAN.md, packet 13).
 */
const spec = {
  id: 'indirect-tax',
  subject: 'economics',
  unit: 'WEC11',
  specCode: '1.3.6',
  specTerm: 'indirect taxation',
  title: 'Indirect tax on a demerit good',
  topic: 'Government intervention',
  prompt:
    'The government imposes an indirect tax of **$30 per unit** on sugary drinks. Show the effect on the market, and shade the resulting welfare loss.',

  axes: {
    x: { label: 'Quantity (000 litres per week)', max: 120 },
    y: { label: 'Price ($ per litre)', max: 140 },
  },
  curves: {
    D: { intercept: 120, slope: -1 },
    S: { intercept: 20, slope: 1 },
  },
  regions: 'taxWelfare',
  expect: { curve: 'S', direction: 'up', size: 30, regions: ['dwl'] },
  tolerance: { q: 4, p: 6 },

  feedback: {
    rightCurve: 'Supply shifts: the tax adds to the cost of every unit sold.',
    wrongCurve:
      "You shifted demand. The tax is paid by producers, so it raises their costs — willingness to buy has not changed.",
    bothMoved: 'Both curves moved. A per-unit tax on producers shifts supply only.',
    nothingMoved: 'Nothing moved. A tax changes the cost of supplying every unit, so one curve has to shift.',
    wrongDirection: 'You shifted supply down and right. That is a fall in costs — a subsidy, not a tax.',
    rightDirection: 'Up and to the left, matching the tax.',
    equilibriumAtOldQuantity:
      'You marked the price on S₂ at the original quantity. Quantity adjusts too — the new equilibrium is where S₂ meets D.',
    rightRegion:
      'The triangle between demand, the original supply curve and the new quantity — output that was worth more than it cost, and is no longer traded.',
    regions: {
      'cb+pb': 'That is the tax revenue rectangle. Revenue is transferred to the government, not destroyed — the loss is the triangle to its right.',
      cb: 'That is the consumers’ share of the tax burden. It moves to the government; nobody loses it.',
      pb: 'That is the producers’ share of the tax burden. It moves to the government; nobody loses it.',
    },
  },
};

export default spec;
