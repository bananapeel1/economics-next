/**
 * Shape fixtures: one minimal spec for each diagram shape the programme still needs that has no
 * shipped spec yet. NOT CONTENT. They are not in the registry (lib/diagram/index.mjs), so no
 * student and no recall can reach them, and they carry no specCode — nobody has checked a mark
 * scheme against them. They exist so that:
 *
 *   · `npm run diagram-check` proves each region family and each point shape on real numbers —
 *     full marks for the model, disjoint and covering regions at every shift, labels clear — before
 *     anyone writes the spec that will ship;
 *   · the next spec author (13.7's remaining specs, 13.8) starts from a skeleton that is known to
 *     work, and only has to add the citation, the prompt and the feedback.
 *
 * The admin harness (app/admin/diagram-drills) shows them under their own heading.
 */

/** Minimum wage in a labour market: a wage floor raised above equilibrium. */
const minWage = {
  id: 'shape:min-wage', fixture: true,
  title: 'Minimum wage (labour market)',
  topic: 'Shape fixture',
  prompt: 'A **minimum wage of $13 an hour** is introduced. Show the effect on the labour market, mark employment, and shade the welfare loss.',
  axes: {
    x: { label: 'Employment (000 workers)', short: 'employment', max: 120 },
    y: { label: 'Wage ($ per hour)', short: 'wage', max: 20 },
  },
  curves: {
    D: { intercept: 16, slope: -0.1, label: 'DL', name: 'Demand for labour' },
    S: { intercept: 4, slope: 0.1, label: 'SL', name: 'Supply of labour' },
    Wmin: { intercept: 10, slope: 0, label: 'Wmin', name: 'Minimum wage line', role: 'policy', shiftedLabel: 'Wmin', ghost: 'none' },
  },
  nudge: 1,
  range: 5,
  regions: 'minWage',
  expect: { curve: 'Wmin', direction: 'up', size: 3, regions: ['dwl'] },
  tolerance: { q: 4, p: 0.6 },
  glyphs: { p: 'W', q: 'E' },
  steps: {
    shift: { name: 'Set the minimum wage' },
    point: { name: 'Mark employment', prompt: 'Tap the point that shows how many workers are employed. It snaps if you are close enough.' },
    shade: { name: 'Shade the welfare loss' },
  },
  distractors: [{ cross: ['Wmin', 'S'], feedback: 'That is the labour SUPPLIED at the minimum wage. Employment is set by how many workers firms will hire at that wage — labour demand. The gap is unemployment.' }],
};

/** Tariff: domestic D and S, a world price line raised by the tariff. */
const tariff = {
  id: 'shape:tariff', fixture: true,
  title: 'Tariff on imports',
  topic: 'Shape fixture',
  prompt: 'The government imposes a **tariff of $20 per tonne** on imported steel. Show the effect, mark the new level of consumption, and shade the welfare loss.',
  axes: {
    x: { label: 'Quantity (000 tonnes)', max: 120 },
    y: { label: 'Price ($ per tonne)', max: 140 },
  },
  curves: {
    D: { intercept: 120, slope: -1, label: 'Dd', name: 'Domestic demand' },
    S: { intercept: 20, slope: 1, label: 'Sd', name: 'Domestic supply' },
    Pw: { intercept: 30, slope: 0, label: 'Pw', name: 'World price line', role: 'policy', shiftedLabel: 'Pw + t', ghostLabel: 'Pw' },
  },
  range: 30, // the guard caught 35: the line left the canvas and its label sat on the x-axis ticks
  regions: 'tariff',
  expect: { curve: 'Pw', direction: 'up', size: 20, regions: ['dwlC', 'dwlP'] },
  tolerance: { q: 4, p: 6 },
  steps: {
    shift: { name: 'Add the tariff' },
    point: { name: 'Mark consumption', prompt: 'Tap the point that shows how much is now bought. It snaps if you are close enough.' },
    shade: { name: 'Shade the welfare loss', prompt: 'Tap every area that is welfare loss. Tap again to unshade.' },
  },
};

/** Break-even chart: a rise in fixed costs shifts TC up. */
const breakEven = {
  id: 'shape:break-even', fixture: true,
  subject: 'business',
  title: 'Break-even: a rise in fixed costs',
  topic: 'Shape fixture',
  prompt: 'Fixed costs rise by **$1,000 a month**. Show the effect on the break-even chart, mark the new break-even output, and shade the loss-making area.',
  axes: {
    x: { label: 'Output (units per month)', short: 'output', max: 1000 },
    y: { label: 'Costs and revenue ($)', short: 'costs and revenue', max: 10000 },
  },
  curves: {
    TR: { intercept: 0, slope: 10, label: 'TR', name: 'Total revenue line', role: 'demand' },
    TC: { intercept: 2000, slope: 5, label: 'TC', name: 'Total cost line', role: 'supply' },
  },
  nudge: 250,
  range: 2000,
  regions: 'breakEven',
  expect: { curve: 'TC', direction: 'up', size: 1000, regions: ['loss'] },
  tolerance: { q: 40, p: 400 },
  glyphs: { p1: '$', p2: '$', q1: 'BE₁', q2: 'BE₂' },
  steps: {
    shift: { name: 'Shift a line' },
    point: { name: 'Mark break-even', prompt: 'Tap the new break-even point. It snaps if you are close enough.' },
    shade: { name: 'Shade the loss', prompt: 'Tap the area where the business makes a loss. Tap again to unshade.' },
  },
};

/** Monopoly against competition: nothing moves; output where MR = MC, price read on AR. */
const monopoly = {
  id: 'shape:monopoly', fixture: true,
  title: 'Monopoly and competition compared',
  topic: 'Shape fixture',
  prompt: 'A competitive industry with constant costs of **$40 a unit** is taken over by a single profit-maximising firm. Mark the monopoly price and output, and shade the welfare loss compared with competition.',
  axes: {
    x: { label: 'Quantity (000 units)', max: 120 },
    y: { label: 'Price, costs and revenue ($)', short: 'price', max: 140 },
  },
  curves: {
    AR: { intercept: 120, slope: -1, label: 'D = AR', short: 'AR', name: 'Demand (average revenue) curve', role: 'demand' },
    MR: { intercept: 120, slope: -2, label: 'MR', name: 'Marginal revenue curve', role: 'marginal' },
    MC: { intercept: 40, slope: 0, label: 'MC = AC', short: 'MC', name: 'Marginal cost line', role: 'supply' },
  },
  regions: 'monopoly',
  expect: { regions: ['dwl'] },
  tolerance: { q: 4, p: 6 },
  glyphs: { p1: 'Pc', q1: 'Qc', p2: 'Pm', q2: 'Qm' },
  steps: {
    point: { name: 'Mark monopoly price and output', prompt: 'Tap the point that shows the monopolist’s output and the price it charges. It snaps if you are close enough.' },
    shade: { name: 'Shade the welfare loss' },
  },
  criteria: { M3: 'Monopoly price and output identified' },
  distractors: [{ cross: ['MR', 'MC'], feedback: 'That is where MR = MC, which gives the OUTPUT. The price is read up on the demand (AR) curve: what buyers will pay for that output.' }],
};

/** AD/AS: aggregate demand shifts; no area. Three marks. */
const adas = {
  id: 'shape:ad-as', fixture: true,
  title: 'A rise in aggregate demand',
  topic: 'Shape fixture',
  prompt: 'Government spending **rises**. Show the effect on the price level and real output.',
  axes: {
    x: { label: 'Real output', short: 'real output', max: 120 },
    y: { label: 'Price level', short: 'price level', max: 140 },
  },
  curves: {
    AD: { intercept: 120, slope: -1, label: 'AD', name: 'Aggregate demand curve', role: 'demand' },
    SRAS: { intercept: 20, slope: 1, label: 'SRAS', name: 'Short-run aggregate supply curve', role: 'supply' },
  },
  point: { cross: ['AD', 'SRAS'] },
  expect: { curve: 'AD', direction: 'up', size: 20 },
  tolerance: { q: 4, p: 6 },
  glyphs: { p: 'PL', q: 'Y' },
};

/** A currency market: D and S of a currency; one shifts; no area. */
const currency = {
  id: 'shape:currency', fixture: true,
  title: 'Demand for a currency rises',
  topic: 'Shape fixture',
  prompt: 'Foreign demand for the country’s exports **rises**. Show the effect on the exchange rate.',
  axes: {
    x: { label: 'Quantity of currency traded (m per day)', short: 'quantity', max: 120 },
    y: { label: 'Exchange rate (US cents per unit)', short: 'exchange rate', max: 140 },
  },
  curves: {
    D: { intercept: 120, slope: -1, name: 'Demand for the currency' },
    S: { intercept: 20, slope: 1, name: 'Supply of the currency' },
  },
  expect: { curve: 'D', direction: 'up', size: 20 },
  tolerance: { q: 4, p: 6 },
  glyphs: { p: 'ER' },
};

export const shapes = [minWage, tariff, breakEven, monopoly, adas, currency];
