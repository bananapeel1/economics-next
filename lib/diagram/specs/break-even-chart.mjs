/**
 * Break-even chart: a rise in fixed costs. Edexcel IAL Business, WBS12 (Unit 2), spec 2.3.2.
 * Four marks are the DRILL's scheme (line, direction, point, area), not a claim about a Business
 * paper: see the notes in audit/runs/packet-13.8/specs.md on whether IAL Business sets "draw".
 *
 * WHY 2.3.2, so nobody moves it. The specification names break-even in one place: 2.3.2 Financial
 * planning (bus_spec.txt:885), topic 3 "Break-even" (:900-906), whose leaf 3e is "Interpretation of
 * break-even charts" (:905). 2.3.1 "Planning a business and raising finance" is the heading next door
 * and the one schema.md warns about — a real section, and still the wrong one — and 2.3.3 "Managing
 * finance" holds profit but no break-even. `checkSpecCitation` refuses both with this specTerm.
 *
 * WHY THIS IS NOT THE CALCULATION TWICE. The same section already carries a break-even calculation
 * (lib/quant/templates/breakeven.mjs, leaves 3c and 3d): it prints a price, a variable cost and a
 * fixed cost and asks for contribution, break-even output and margin of safety. This drill is leaf
 * 3e — reading and changing a CHART. Its prompt prints no price and no variable cost (the slopes carry
 * them), its contribution is $0.80, which the template can never draw (its contributions are whole
 * dollars from $6 to $20), and its question is what a change does to the chart, not what a figure is.
 * Placement keeps them apart too: `placeDiagramDrills` never puts a drawing on a check-in that holds a
 * calculation, and the calculation holds the "Break-Even" chapter's, so this lands one check-in later.
 *
 * WHAT THE DIAGRAM ASSUMES. The chart as the section teaches it (financial-planning, "Interpreting a
 * Break-Even Chart"): TR from the origin, TC starting at the fixed costs, both straight. A rent rise is
 * a FIXED cost, so TC moves up in parallel and TR does not move. A rise in variable cost would pivot
 * TC, which this engine cannot draw (a shift is a change of intercept only), so the drill is about
 * fixed costs and nothing else. No FC line is drawn: it would have to move with TC, and a drill that
 * marks "exactly one line moved" cannot ask for two.
 *
 * WHAT IS DRILLED. Moving TR instead of TC (a cost change read as a revenue change); moving TC the
 * wrong way; marking the OLD break-even point; and shading the profit side of the crossing.
 *
 * The numbers: TR = 2q, TC = 2,000 + 1.2q, so break-even moves from 2,500 to 3,500 loaves. The canvas
 * is 5,000 by $10,000 so TR leaves through the top-right corner and the profit triangle has an end.
 * `nudge` is $200 because the "you marked the old quantity" band is one nudge wide in QUANTITY units:
 * 200 loaves is 4% of the axis, the same proportion as the economics drills' 5 on 120.
 */
const spec = {
  id: 'break-even-chart',
  subject: 'business',
  unit: 'WBS12',
  specCode: '2.3.2',
  specTerm: 'break-even charts',
  title: 'Break-even chart: a rise in fixed costs',
  topic: 'Financial planning',
  prompt:
    'The chart shows the monthly total revenue (TR) and total costs (TC) of **Accra Bakehouse**. Its fixed costs are **$2,000 a month**, and its landlord raises the rent by **$800 a month**. Show the change on the chart, mark the new break-even point, and shade the area where the bakery makes a loss.',

  axes: {
    x: { label: 'Output (loaves per month)', short: 'output', max: 5000 },
    y: { label: 'Costs and revenue ($ per month)', short: 'costs and revenue', max: 10000 },
  },
  curves: {
    TR: { intercept: 0, slope: 2, label: 'TR', name: 'Total revenue line', role: 'demand' },
    TC: { intercept: 2000, slope: 1.2, label: 'TC', name: 'Total costs line', role: 'supply' },
  },
  nudge: 200,
  range: 1600,
  regions: 'breakEven',
  expect: { curve: 'TC', direction: 'up', size: 800, regions: ['loss'] },
  tolerance: { q: 150, p: 400 },
  glyphs: { p1: '$', p2: '$', q1: 'BE₁', q2: 'BE₂' },

  steps: {
    shift: {
      name: 'Show the rent rise',
      prompt: 'Move the line the rent rise changes, by the amount it changes. On a phone, tap it, use the arrows below, then Next.',
    },
    point: { name: 'Mark the new break-even point', prompt: 'Tap the new break-even point. It snaps if you are close enough.' },
    shade: { name: 'Shade the loss', prompt: 'Tap the area where the bakery makes a loss. Tap again to unshade.' },
  },
  criteria: {
    M1: 'Correct line moved',
    M2: 'Total costs raised',
    M3: 'New break-even point identified',
    M4: 'Loss area shaded',
  },

  feedback: {
    rightCurve:
      'Total costs move. Rent is a fixed cost: the bakery owes it whatever it sells, so the rise adds to total costs at every output. The price of a loaf has not changed, so TR stays where it was.',
    wrongCurve:
      'You moved the total revenue line. A higher rent changes what the bakery PAYS, not what it earns from each loaf: TR stays where it is, and the total costs line moves.',
    bothMoved: 'Both lines moved. Only costs have changed: move TC and leave TR alone.',
    nothingMoved: 'Nothing moved. The rent rise adds $800 a month to fixed costs; move the line that includes them.',
    wrongDirection:
      'You moved total costs down, which is what a FALL in fixed costs would do. A rent rise adds $800 at every output, so TC moves up and now starts at $2,800 on the money axis instead of $2,000.',
    rightDirection:
      'Up by $800 at every output, in parallel: TC now starts at $2,800, because fixed costs are owed even at zero output, and its slope is unchanged because the cost of each loaf is unchanged.',
    noPoint: 'No point marked. Mark the output at which total revenue now equals total costs.',
    equilibriumAtOldQuantity:
      'That is the old break-even point, 2,500 loaves. Revenue there has not changed, but costs are now higher by the rent rise, so the bakery makes a loss at that output. It has to sell more loaves before revenue catches up with the higher costs.',
    equilibriumWrong:
      'Not where TR crosses the new TC line. The break-even point is the output at which total revenue equals total costs: read it where the two lines now cross.',
    rightRegion:
      'The triangle between TC and TR, left of the new break-even point: at every output below break-even, total costs are above total revenue, and the vertical gap is the loss. Higher fixed costs push the break-even point to a higher output, so whatever the bakery actually sells, its margin of safety shrinks by as many loaves as break-even rose.',
    regions: {
      profit:
        'That is the profit area. Right of the break-even point TR is above TC and the gap is profit. The loss is on the other side of the crossing, between the lines at outputs below break-even.',
      'loss+profit':
        'Only the area left of the crossing is a loss. Right of the break-even point TR is above TC, and that gap is profit.',
    },
  },
};

export default spec;
