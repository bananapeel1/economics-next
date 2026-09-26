/**
 * Indirect tax in a competitive market. Edexcel IAL Economics, WEC11 (Unit 1), spec 1.3.4.
 * "Draw" carries 4 marks in Economics.
 *
 * Terminology: welfare loss, never "deadweight loss" — packet 13 strips that as off-spec
 * (audit/PLAN.md, packet 13).
 *
 * WHY 1.3.4 AND NOT 1.3.6, so nobody moves it back. 1.3.4 topic 4 is "Indirect taxes and
 * subsidies" — their impact on consumers, producers and the government, and their incidence
 * (econ_spec.txt:711-716) — which is this diagram: supply shifted by the tax or the subsidy, in a
 * plain competitive market. 1.3.6 lists the same two as METHODS OF INTERVENTION to correct market
 * failure, and drawing that needs a SOCIAL curve beside the private one — MSB against MPB for the
 * consumption cases, MSC against MPC for production (econ_spec.txt:740-748 names both). This
 * drill has neither: no externality appears in it at all.
 *
 * The first version also contradicted itself. A tax on a demerit good, or a subsidy on a merit
 * good, MOVES OUTPUT TOWARD THE SOCIAL OPTIMUM: it reduces the welfare loss rather than creating
 * the triangle the prompt asks the student to shade. The triangle only exists in the competitive
 * market picture, where there is nothing for the tax to correct. So the good is a plain one.
 */
const spec = {
  id: 'indirect-tax',
  subject: 'economics',
  unit: 'WEC11',
  specCode: '1.3.4',
  specTerm: 'indirect taxes',
  title: 'Indirect tax in a competitive market',
  topic: 'Price determination',
  prompt:
    'The government imposes an indirect tax of **$30 per unit** on cooking oil. Show the effect on the market, and shade the resulting welfare loss.',

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
