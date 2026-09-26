/**
 * Negative externality in production. Edexcel IAL Economics, WEC11 (Unit 1), spec 1.3.5.
 * "Draw" carries 4 marks in Economics.
 *
 * Terminology: welfare loss, never "deadweight loss" — packet 13 strips that as off-spec
 * (audit/PLAN.md, packet 13).
 *
 * WHY 1.3.5 AND NOT 1.3.6, so nobody moves it. 1.3.5 topic 2d asks for "the use of diagrams, using
 * marginal analysis, to illustrate ... the external costs from production ... the distinction
 * between the market and social optimum positions; identification of the welfare loss or gain
 * areas" (econ_spec.txt:746-750). That is this drill exactly: the market failure itself, before
 * anyone intervenes. 1.3.6 is the intervention — a tax that lifts MPC to MSC, permits, regulation —
 * and a drill filed there would have to draw the correction, which this one does not.
 *
 * WHY PRODUCTION, AND SO MSC AGAINST MPC. The specification asks for diagrams of the external costs
 * FROM PRODUCTION and the external benefits FROM CONSUMPTION (:747-748). Production puts the social
 * curve on the cost side, MSC above MPC; consumption puts it on the benefit side, MSB against MPB.
 * Merit and demerit goods are consumption cases (schema.md, "Frame the prompt"), so the prompt is
 * a producer polluting, not a demerit good. Demand is MPB and, with no external benefit, MSB too.
 *
 * THE TRIANGLE IS NOT THE TAX TRIANGLE. The tax drill's loss points at the old equilibrium; this
 * one has its apex at the social optimum and its base on the MARKET output, between MSC and D. The
 * region family (regions.mjs, `negativeExternality`) offers the tax-shaped triangle just below it
 * as a named wrong answer, because it is the one students shade.
 */
const spec = {
  id: 'negative-externality',
  subject: 'economics',
  unit: 'WEC11',
  specCode: '1.3.5',
  specTerm: 'external costs from production',
  title: 'Negative externality in production',
  topic: 'Market failure',
  // lib/diagram-pool.js places a derived drill after the chapter that teaches it, matched by title
  // words. Learn Mode teaches this diagram under "Marginal Analysis and the Welfare Areas", which
  // shares no word with the title; without this the drill lands a chapter later, on "Externalities
  // in Five Contexts" (checked against the market-failure bundle snapshot, 26 Sep).
  placeWith: ['Marginal analysis and the welfare areas'],
  prompt:
    'Cement production releases dust that imposes an external cost of **$40 per tonne** on people living nearby. The supply curve shows only the producers’ private costs. Draw the marginal social cost curve, mark the socially optimal output, and shade the welfare loss at the market equilibrium.',

  axes: {
    x: { label: 'Quantity of cement (000 tonnes per year)', max: 120 },
    y: { label: 'Costs and benefits ($ per tonne)', max: 140 },
  },
  curves: {
    D: {
      intercept: 130, slope: -1,
      label: 'D = MPB = MSB', short: 'MSB', name: 'Demand curve (marginal private and social benefit)',
    },
    S: {
      intercept: 10, slope: 1,
      label: 'S = MPC', short: 'MPC', name: 'Supply curve (marginal private cost)',
      // The student moves a COPY: the original stays as a full curve, because the market still
      // produces where MPC meets demand.
      shiftedLabel: 'MSC', ghostLabel: 'S = MPC', ghost: 'solid',
    },
  },
  regions: 'negativeExternality',
  expect: { curve: 'S', direction: 'up', size: 40, regions: ['dwl'] },
  tolerance: { q: 4, p: 6 },
  glyphs: { p1: 'Pm', q1: 'Qm', p2: 'P*', q2: 'Q*' },

  steps: {
    shift: {
      name: 'Draw MSC',
      prompt: 'Drag the curve that has a social version here: a copy moves and the original stays as the private curve. On a phone, tap it, use the arrows below, then Next.',
    },
    point: { name: 'Mark the social optimum', prompt: 'Tap the output at which society is best off. It snaps if you are close enough.' },
    shade: { name: 'Shade the welfare loss', prompt: 'Tap the area that is the welfare loss at the market output. Tap again to unshade.' },
  },
  criteria: { M1: 'Social curve drawn from the right curve', M2: 'MSC above MPC', M3: 'Social optimum identified' },

  // Where MPC meets demand: the market equilibrium, which the question does not ask for.
  distractors: [
    {
      cross: ['D', 'S'], from: 'base',
      feedback:
        'That is the market equilibrium, where MPC meets demand. Producers ignore the external cost, so the market produces more than is socially optimal. The social optimum is where MSC meets demand.',
    },
  ],

  feedback: {
    rightCurve:
      'Supply it is. The external cost arises when cement is PRODUCED, so it belongs on the cost side: MSC is private cost plus external cost, drawn above MPC, and MPC stays where it was.',
    wrongCurve:
      'You moved demand. The dust is a cost of PRODUCING cement, not a benefit of using it, so it goes on the cost side: MSC above MPC. Demand is MPB — and, with no external benefit, MSB too.',
    bothMoved: 'Both curves moved. Only the cost side has a social curve here: draw MSC from supply and leave demand alone.',
    nothingMoved: 'Nothing moved. Draw MSC by moving a copy of the supply curve by the external cost; the original stays behind as MPC.',
    wrongDirection:
      'You drew the social curve below MPC. That would mean producing cement gives third parties a BENEFIT. An external cost puts MSC above MPC, by the $40 cost per tonne.',
    rightDirection: 'Above MPC, by the external cost per tonne.',
    noPoint: 'No point marked. Mark the output at which society is best off.',
    equilibriumAtOldQuantity:
      'That is the market output, Qm. The market ignores the external cost and produces too much; the social optimum is where MSC meets demand, at a lower output.',
    equilibriumWrong:
      'Not where MSC meets demand. The social optimum is the output at which marginal social cost equals marginal social benefit.',
    rightRegion:
      'The triangle between MSC and demand, from Q* out to the market output Qm — tonnes whose social cost is greater than their social benefit, which the market produces anyway.',
    regions: {
      pvt: 'That triangle has the shape of the tax diagram, pointing at the market equilibrium. Here it is the private surplus buyers and sellers get from the extra tonnes — real to them. The loss is the triangle above it, between MSC and demand, pointing back to Q*.',
      ext: 'That is the external cost of the output society SHOULD produce. Even at the social optimum there is some dust, but its cost is outweighed by the benefit of the cement, so it is not a welfare loss.',
      'dwl+pvt':
        'That is the whole external cost of the extra tonnes. Part of it is offset by the private surplus those tonnes create (the lower triangle); only the upper triangle, between MSC and demand, is the welfare loss.',
      'dwl+ext+pvt':
        'That is the total external cost at the market output. The welfare loss is only the part the extra tonnes cost beyond everything they are worth: the triangle between MSC and demand, from Q* to Qm.',
    },
  },
};

export default spec;
