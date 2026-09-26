/**
 * Subsidy in a competitive market. Edexcel IAL Economics, WEC11 (Unit 1), spec 1.3.4.
 *
 * The mirror of the tax drill, and deliberately the second spec: it is the one students most
 * often draw by shifting the wrong curve, because "the government pays" sounds like demand.
 *
 * WHY 1.3.4 AND NOT 1.3.6, so nobody moves it back. 1.3.4 topic 4 is "Indirect taxes and
 * subsidies" — their impact on consumers, producers and the government, and their incidence
 * (econ_spec.txt:711-716) — which is this diagram: supply shifted by the tax or the subsidy, in a
 * plain competitive market. 1.3.6 lists the same two as METHODS OF INTERVENTION to correct market
 * failure, and drawing that needs the externality diagram, MPC against MSC. This drill has no
 * externality in it at all.
 *
 * The first version also contradicted itself. A tax on a demerit good, or a subsidy on a merit
 * good, MOVES OUTPUT TOWARD THE SOCIAL OPTIMUM: it reduces the welfare loss rather than creating
 * the triangle the prompt asks the student to shade. The triangle only exists in the competitive
 * market picture, where there is nothing for the tax to correct. So the good is a plain one.
 */
const spec = {
  id: 'subsidy',
  subject: 'economics',
  unit: 'WEC11',
  specCode: '1.3.4',
  specTerm: 'subsidies',
  title: 'Subsidy in a competitive market',
  topic: 'Price determination',
  prompt:
    'The government pays producers a subsidy of **$30 per unit** on milk. Show the effect on the market, and shade the resulting welfare loss.',

  axes: {
    x: { label: 'Quantity (000 litres per week)', max: 120 },
    y: { label: 'Price ($ per litre)', max: 140 },
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
      'The triangle beyond the original quantity — litres that are only produced because of the subsidy, and cost more to produce than they are worth.',
    regions: {
      'cg+pg': 'That is the cost of the subsidy to the taxpayer. Most of it is transferred to consumers and producers, not lost.',
      cg: 'That is the consumers’ share of the subsidy. It is a transfer to them, not a loss.',
      pg: 'That is the producers’ share of the subsidy. It is a transfer to them, not a loss.',
    },
  },
};

export default spec;
