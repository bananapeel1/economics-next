/**
 * Maximum price below equilibrium. Edexcel IAL Economics, WEC11 (Unit 1), spec 1.3.6.
 * "Draw" carries 4 marks in Economics.
 *
 * Terminology: welfare loss, never "deadweight loss" — packet 13 strips that as off-spec
 * (audit/PLAN.md, packet 13).
 *
 * WHY 1.3.6, so nobody moves it. The specification names maximum prices in exactly one place:
 * 1.3.6 topic 1b, "Methods of intervention", which lists "maximum and minimum (guaranteed) prices"
 * (econ_spec.txt:809). 1.3.4 is the tempting alternative — it holds equilibrium, excess demand
 * (:701) and consumer and producer surplus (:703) — but no price control appears under it, and
 * `checkSpecCitation` refuses 1.3.4 with this specTerm. The tax and subsidy drills sit in 1.3.4
 * because 1.3.4 names them (:711-716); this one sits in 1.3.6 for the same reason.
 *
 * WHAT THE DIAGRAM ASSUMES. A plain competitive market with no externality, so the loss is the
 * triangle between D and S from the quantity supplied out to Q₁. The consumer-surplus split assumes
 * the rice that is sold reaches the buyers who value it most; with queues or random rationing the
 * consumer side loses more, so the triangle is the smallest the loss can be. The price line starts
 * AT the equilibrium price, where a maximum price does nothing yet; the student has to decide which
 * way it goes and how far.
 *
 * WHAT IS DRILLED. Three decisions students get wrong: moving D or S instead of the price line;
 * reading the quantity off DEMAND (what buyers want) instead of SUPPLY (what is actually sold —
 * the short side); and shading the transfer rectangle, which changes hands but is not lost.
 */
const spec = {
  id: 'max-price',
  subject: 'economics',
  unit: 'WEC11',
  specCode: '1.3.6',
  specTerm: 'maximum and minimum (guaranteed) prices',
  title: 'Maximum price below equilibrium',
  topic: 'Government intervention',
  prompt:
    'The government sets a **maximum price of $50** per bag of rice, below the free-market price. Show the effect on the market, mark the quantity actually bought and sold, and shade the resulting welfare loss.',

  axes: {
    x: { label: 'Quantity (000 bags per week)', max: 120 },
    y: { label: 'Price ($ per bag)', max: 160 },
  },
  curves: {
    D: { intercept: 140, slope: -1 },
    S: { intercept: 20, slope: 1 },
    Pmax: {
      intercept: 80, slope: 0,
      label: 'Pmax', name: 'Maximum price line', role: 'policy',
      shiftedLabel: 'Pmax', ghost: 'none',
    },
  },
  regions: 'maxPrice',
  expect: { curve: 'Pmax', direction: 'down', size: 30, regions: ['dwl'] },
  tolerance: { q: 4, p: 6 },
  glyphs: { q2: 'Qs', p2: 'Pmax' },

  steps: {
    shift: {
      name: 'Set the maximum price',
      prompt: 'Move the line the government controls to where it sets it. On a phone, tap it, use the arrows below, then Next.',
    },
    point: {
      name: 'Mark the quantity traded',
      prompt: 'Tap the point that shows how much is actually bought and sold. It snaps if you are close enough.',
    },
    shade: { name: 'Shade the welfare loss', prompt: 'Tap the area that is the welfare loss. Tap again to unshade.' },
  },
  criteria: { M1: 'Correct line moved', M2: 'Set below equilibrium', M3: 'Quantity traded identified' },

  // Where the price line meets DEMAND: the quantity buyers want and cannot get.
  distractors: [
    {
      cross: ['Pmax', 'D'],
      feedback:
        'That is the quantity DEMANDED at the maximum price. Buyers want that many, but producers will only supply Qs; the gap between the two is the excess demand. The quantity traded is set by the short side of the market — supply.',
    },
  ],

  feedback: {
    rightCurve:
      'The price line moves. A maximum price limits what sellers may charge; it does not change what buyers want or what it costs to produce, so D and S stay where they are.',
    wrongCurve:
      'You moved a demand or supply curve. A maximum price is a legal limit on the price, not a change in demand or in costs — move the price line and leave D and S alone.',
    bothMoved: 'More than one line moved. Only the price line moves: a price control leaves D and S unchanged.',
    nothingMoved: 'Nothing moved. The maximum price is the horizontal line; set it where the government does.',
    wrongDirection:
      'You raised the price line above the equilibrium. A maximum price set above the market price does not bind — the market still clears at P₁. It only has an effect below equilibrium.',
    rightDirection: 'Down, below the equilibrium price: a maximum price only bites when it is set below the market price.',
    noPoint: 'No point marked. Mark the quantity actually bought and sold at the maximum price.',
    equilibriumAtOldQuantity:
      'That is the original quantity, Q₁. At the lower price producers supply less, so fewer bags are traded than before.',
    equilibriumWrong:
      'Not where the maximum price line meets supply. With the price held below equilibrium, the quantity traded is what producers are willing to supply at that price.',
    rightRegion:
      'The triangle between demand and supply from Qs out to Q₁ — bags that buyers valued at more than they cost to produce, and which are no longer traded.',
    regions: {
      transfer:
        'That rectangle is surplus moved from producers to the consumers who still buy, because they now pay less. It changes hands; it is not lost.',
      cs: 'That is consumer surplus the buyers who still get rice had before the control and still have. It is not lost.',
      ps: 'That is the producer surplus left at the maximum price. Producers keep it; it is not lost.',
      'dwl+transfer': 'The triangle is right, but the rectangle is a transfer from producers to consumers, not a loss.',
    },
  },
};

export default spec;
