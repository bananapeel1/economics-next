/**
 * A tariff on imports. Edexcel IAL Economics, WEC14 (Unit 4), spec 4.3.2.
 * "Draw" carries 4 marks in Economics.
 *
 * Terminology: welfare loss, never "deadweight loss" — packet 13 strips that as off-spec
 * (audit/PLAN.md, packet 13). The trade chapter that teaches this diagram says "welfare loss" too.
 *
 * WHY 4.3.2, so nobody moves it. The specification names tariffs in exactly one place: 4.3.2 Trade
 * and the global economy (continued, econ_spec.txt:1679), topic 5 "Restrictions on free trade", leaf
 * 5b "Types of restrictions on free trade: tariffs …" (:1691-1692), with 5c "Impact of protectionist
 * policies on: consumers, producers, governments …" (:1696-1699) — which is what the four areas of
 * this diagram ARE. 1.3.6 is the tempting alternative because it is about government intervention,
 * but its instruments correct domestic market failure and the word "tariffs" does not appear under
 * it; `checkSpecCitation` refuses any section but 4.3.2 with this specTerm. The terms-of-trade
 * calculation also sits in 4.3.2; placement keeps the two on different check-ins (see specs.md).
 *
 * WHAT THE DIAGRAM ASSUMES. A small importing country: it takes the world price as given (a
 * horizontal Pw) and the tariff raises the domestic price by the full tariff. D and S are DOMESTIC
 * demand and supply, labelled D and S as the section's own diagram labels them. The world price line
 * starts at the free-trade price, where the drill has not yet done anything, so the student decides
 * which line moves and which way. The original Pw stays dashed: it is still the world price, and the
 * gap between the two lines is the tariff.
 *
 * WHAT IS DRILLED. Moving demand or supply instead of the price line (shifting supply is the
 * diagram for a SUBSIDY to domestic producers, which the same chapter teaches next door); reading
 * domestic production, or the no-trade equilibrium, as consumption; and shading the tariff revenue
 * or the producers' gain, both transfers. The welfare loss is BOTH triangles — production and
 * consumption — as the section's "Who Gains and Who Loses" chapter teaches (areas b and d).
 *
 * The numbers are not the chapter's ($20 world price, $10 tariff): here Pw $40, tariff $20; domestic
 * production 20 → 40, consumption 90 → 70, imports 70 → 30. Revenue $600, producers' gain $600,
 * each triangle $200 (thousands). `range` 30 keeps the tariff short of prohibitive (Pw + t < $75,
 * the no-trade price), where imports stop and the diagram changes.
 */
const spec = {
  id: 'tariff',
  subject: 'economics',
  unit: 'WEC14',
  specCode: '4.3.2',
  specTerm: 'tariffs',
  title: 'A tariff on imports',
  topic: 'Trade and the global economy',
  prompt:
    'A country imports motorcycle tyres at a world price of **$40** each, buying from abroad whatever its own producers do not supply. The government imposes a **tariff of $20 per tyre** on imports. Show the effect on the market, mark the new level of consumption, and shade the welfare loss.',

  axes: {
    x: { label: 'Quantity (000 tyres per month)', max: 120 },
    y: { label: 'Price ($ per tyre)', max: 140 },
  },
  curves: {
    D: { intercept: 130, slope: -1, name: 'Domestic demand curve' },
    S: { intercept: 20, slope: 1, name: 'Domestic supply curve' },
    Pw: {
      intercept: 40, slope: 0,
      label: 'Pw', name: 'World price line', role: 'policy',
      shiftedLabel: 'Pw + t', ghostLabel: 'Pw',
    },
  },
  range: 30,
  regions: 'tariff',
  expect: { curve: 'Pw', direction: 'up', size: 20, regions: ['dwlC', 'dwlP'] },
  tolerance: { q: 4, p: 6 },

  steps: {
    shift: {
      name: 'Add the tariff',
      prompt: 'Move the line the tariff changes, by the amount it changes. On a phone, tap it, use the arrows below, then Next.',
    },
    point: {
      name: 'Mark consumption',
      prompt: 'Tap the point that shows how many tyres are now bought. It snaps if you are close enough.',
    },
    shade: { name: 'Shade the welfare loss', prompt: 'Tap the welfare loss. Tap an area again to unshade.' },
  },
  criteria: {
    M1: 'Correct line moved',
    M2: 'Price raised by the tariff',
    M3: 'New consumption identified',
    M4: 'Both welfare-loss areas shaded',
  },

  distractors: [
    {
      // Where the new price line meets domestic SUPPLY: home production, not consumption.
      cross: ['Pw', 'S'],
      feedback:
        'That is domestic PRODUCTION at the new price: how many tyres home producers now supply. Consumption is how many buyers purchase, where the price line meets demand. The gap between the two is what is still imported.',
    },
    {
      // Where domestic demand meets domestic supply: the price with no trade at all.
      cross: ['D', 'S'],
      feedback:
        'That is where domestic demand meets domestic supply — the market with no imports at all. The tariff does not stop trade: tyres still come in at the world price plus the tariff, so that is the price, and consumption is read off demand at it.',
    },
    {
      // Free-trade domestic production, on the ORIGINAL world price.
      cross: ['Pw', 'S'], from: 'base',
      feedback:
        'That is what home producers supplied BEFORE the tariff, at the world price. The question asks how much is bought AFTER it: where the new price line meets demand.',
    },
  ],

  feedback: {
    rightCurve:
      'The price line moves. A tariff is a tax on imports, so imported tyres now cost the world price plus the tariff, and home producers can charge that price too. Domestic demand and supply do not change: buyers and producers move along them to the new price.',
    wrongCurve:
      'You moved domestic demand or supply. A tariff does not change what buyers want or what home producers’ costs are; it raises the price at which imports are available. Move the world price line and leave D and S alone. (Shifting supply down is the diagram for a SUBSIDY to domestic producers — a different tool.)',
    bothMoved: 'More than one line moved. Only the price line moves: the tariff raises the price of imports, and D and S stay where they are.',
    nothingMoved: 'Nothing moved. The world price is the horizontal line; the tariff is added to it.',
    wrongDirection:
      'You lowered the price line. A tariff is a tax on imports, so it RAISES the domestic price — by the full $20, to Pw + t — rather than lowering it.',
    rightDirection: 'Up by the tariff: imports now cost Pw + t, and home producers can charge that price too.',
    noPoint: 'No point marked. Mark how many tyres buyers now purchase at the higher price.',
    equilibriumAtOldQuantity:
      'That is consumption under free trade, at the world price. At the higher price buyers move up their demand curve and buy fewer tyres.',
    equilibriumWrong:
      'Not where the new price line meets domestic demand. Consumption is how many tyres buyers purchase at Pw + t, read on the demand curve.',
    rightRegion:
      'Both triangles. The left one is tyres now made at home at a cost above the $40 they could be imported for — resources wasted on production. The right one is tyres buyers valued at more than $40 and no longer buy. Nobody receives either area: together they are the welfare loss.',
    regions: {
      rev: 'That rectangle is the tariff revenue: the tariff on each tyre still imported. It is taken from consumers and received by the government — a transfer, not a loss.',
      pg: 'That is the gain to domestic producers: they sell more, at a higher price. It is taken from consumers and received by producers — a transfer, not a loss.',
      dwlC:
        'That is half of it: the consumption loss, tyres no longer bought. The welfare loss also includes the production triangle on the left — tyres made at home at a cost above the world price.',
      dwlP:
        'That is half of it: the production loss, tyres made at home at a cost above the world price. The welfare loss also includes the consumption triangle on the right — tyres buyers no longer buy.',
      'dwlC+dwlP+rev':
        'The two triangles are right, but the rectangle between them is tariff revenue — a transfer from consumers to the government, not a loss.',
      'dwlC+dwlP+pg':
        'The two triangles are right, but the area on the left, below the new price, is the producers’ gain — a transfer from consumers, not a loss.',
      'dwlC+dwlP+pg+rev':
        'That is everything consumers lose. Part goes to domestic producers and part to the government; only the two triangles are lost to everyone.',
    },
  },
};

export default spec;
