/**
 * PACKET 52 — role-state-macroeconomy diagrams. Seven, one pinned to each block, drawn from `ECON`.
 *
 * The live section had five, and only one was pinned: "AD/AS: Macroeconomic Policy Effects" on the
 * policy block. Chapter 1 had been given "Crowding Out in the Loanable Funds Market" by the title
 * matcher (DECISIONS 2026-09-25, packet 2.91). Two of the five are refused here on the document:
 * the loanable funds diagram (0 hits in the specification — specGap-12) and "Tax Incidence:
 * Indirect Tax on a Market" (incidence is 1.3.4 · 4b, `econ_spec.txt:713-716`; topFix-02 proposed
 * pinning it, and that half of the item is refused). Each block pins its OWN diagram by id,
 * derived by the runner from this array's order.
 *
 * ── THE FRAME IS 400 UNITS, WITH A 12-UNIT FLOOR ─────────────────────────────
 *
 * Packet 37's convention: 15 for anything a student must read, 12 for secondary text. The runner
 * checks the emitted SVG for extent, glyph-box collisions, lines through labels and bars under
 * labels, not this comment. Every colour is a key of `PALETTE` in
 * `components/learn-mode/processSvg.js`; the runner parses that file and asserts it.
 */
import { id, ECON, bn, pct, mnd, round1 } from './_packet52-util.mjs';

const E = ECON;

/* ── the frame, and the two type sizes ─────────────────────────────────────── */
export const FRAME = { w: 400, pad: 16 };
export const FACE = 15;
export const SMALL = 12;
export const MIN_FACE = SMALL;
export const COLLIDE_TOL = 1.2;
export const LEAD = 18;

/* ── palette, all of it in processSvg's map ────────────────────────────────── */
const INK = '#e8ecf5';
const INK2 = '#e2e8f0';
const MUTED = '#7a8299';
const AXIS = '#94a3b8';
const GREEN2 = '#34d399';
const RED2 = '#f87171';
const BLUE2 = '#60a5fa';
const AMBER = '#f59e0b';
const PURPLE = '#8b5cf6';
const CYAN = '#22d3ee';

/** A rough text width, used by the runner's overrun and collision checks. DM Sans at ~0.56em. */
export const estWidth = (text, size = FACE) => String(text).length * size * 0.56;

const svg = (h, body) => `<svg width="${FRAME.w}" height="${h}" viewBox="0 0 ${FRAME.w} ${h}" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',system-ui,sans-serif;background:transparent">${body}</svg>`;
const t = (x, y, str, { size = SMALL, fill = INK, anchor = 'start', weight = 400 } = {}) =>
  `<text x="${round1(x)}" y="${round1(y)}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" font-weight="${weight}">${str}</text>`;
const line = (x1, y1, x2, y2, { stroke = AXIS, sw = 1.5, dash = null } = {}) =>
  `<line x1="${round1(x1)}" y1="${round1(y1)}" x2="${round1(x2)}" y2="${round1(y2)}" stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
const poly = (pts, { stroke = AXIS, sw = 2.5, dash = null } = {}) =>
  `<path d="M ${pts.map(([x, y]) => `${round1(x)} ${round1(y)}`).join(' L ')}" fill="none" stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
const rect = (x, y, w, h, fill) => `<rect x="${round1(x)}" y="${round1(y)}" width="${round1(Math.max(0, w))}" height="${round1(h)}" rx="3" fill="${fill}"/>`;
const circle = (x, y, fill) => `<circle cx="${round1(x)}" cy="${round1(y)}" r="4" fill="${fill}"/>`;

/* ── bar charts: one row per bar, label left, value right (packet 46's layout) ── */
const BAR_X = 182, BAR_W = 160;
const bars = ({ title, rows, max, fmt, caps, top = 50 }) => {
  const rowGap = 34;
  const h = top + rows.length * rowGap + 58;
  const parts = [t(FRAME.w / 2, 20, title, { anchor: 'middle', weight: 600 })];
  rows.forEach((r, i) => {
    const y = top + i * rowGap;
    const w = (r.value / max) * BAR_W;
    parts.push(t(16, y + 13, r.label, { fill: r.labelFill || INK2 }));
    parts.push(rect(BAR_X, y, w, 18, r.fill));
    parts.push(t(BAR_X + w + 6, y + 13, fmt(r.value), { fill: r.fill, weight: 600 }));
  });
  const capY = top + rows.length * rowGap + 14;
  (caps || []).forEach((c, i) => parts.push(t(16, capY + i * LEAD, c.text, { fill: c.fill || MUTED, weight: i === 0 ? 600 : 400 })));
  return svg(h, parts.join(''));
};

/* ── one layout for every x-y plot ─────────────────────────────────────────── */
/* Rows, top to bottom: title 18 · y-axis title 40 · plot 56-222 · x ticks 238 · x-axis title 256 · captions 278 and 296. */
const L = { h: 306, title: 18, yTitle: 40, x0: 54, xR: 336, y1: 56, y0: 222, tick: 238, xTitle: 256, cap1: 278, cap2: 296 };
const plot = ({ xMin, xMax, yMin, yMax }) => {
  const sx = (x) => L.x0 + ((x - xMin) / (xMax - xMin)) * (L.xR - L.x0);
  const sy = (y) => L.y0 - ((y - yMin) / (yMax - yMin)) * (L.y0 - L.y1);
  const axes = (title, yLabel, xLabel) => [
    t(FRAME.w / 2, L.title, title, { anchor: 'middle', weight: 600 }),
    t(8, L.yTitle, yLabel, { fill: AXIS }),
    line(L.x0, L.y1 - 8, L.x0, L.y0, { stroke: AXIS }),
    line(L.x0, L.y0, L.xR + 6, L.y0, { stroke: AXIS }),
    t(392, L.xTitle, xLabel, { anchor: 'end', fill: AXIS }),
  ].join('');
  return { sx, sy, axes };
};
const captions = (a, b, colour = MUTED) => t(16, L.cap1, a, { fill: colour, weight: 600 }) + (b ? t(16, L.cap2, b, { fill: MUTED }) : '');

/* ══ AD/AS, as straight lines so every point is derived ════════════════════ */
/*
 * SRAS: P = 15 + k + 0.7Y.  AD: P = 85 − 0.7(Y − s).  An AD shift of s moves equilibrium output by
 * s ÷ 2; an SRAS shift of k moves it by −k ÷ 1.4. The diagrams carry no dollar figures — Y and P
 * are labelled symbolically — so the only claims they make are directions, and the runner checks
 * each labelled equilibrium lies on both of its curves.
 */
export const ADAS = (() => {
  const sras = (k) => (y) => 15 + k + 0.7 * y;
  const ad = (s) => (y) => 85 - 0.7 * (y - s);
  const eq = (s, k) => { const y = (70 - k + 0.7 * s) / 1.4; return { y, p: sras(k)(y) }; };
  return { sras, ad, eq };
})();

/**
 * One AD/AS panel. `ads` are AD shifts, `srass` SRAS shifts; `points` are [s, k, label] triples
 * marking equilibria, labelled on the output axis (and the price axis when `prices`).
 */
const adasSvg = ({ title, ads, srass, points, prices = false, cap }) => {
  const xMax = 120;
  const g = plot({ xMin: 0, xMax, yMin: 0, yMax: 100 });
  const parts = [g.axes(title, 'Price level', 'Real output')];
  const top = 81.5;
  ads.forEach(({ s, label, colour, dash }) => {
    const xStart = s + (85 - top) / 0.7;
    const xEnd = Math.min(xMax, s + (85 - 8) / 0.7);
    parts.push(poly([[g.sx(xStart), g.sy(ADAS.ad(s)(xStart))], [g.sx(xEnd), g.sy(ADAS.ad(s)(xEnd))]], { stroke: colour, dash }));
    parts.push(t(g.sx(xStart), g.sy(top) - 8, label, { anchor: 'middle', fill: colour, weight: 600 }));
  });
  srass.forEach(({ k, label, colour, dash, xEnd }) => {
    const xStart = 4;
    parts.push(poly([[g.sx(xStart), g.sy(ADAS.sras(k)(xStart))], [g.sx(xEnd), g.sy(ADAS.sras(k)(xEnd))]], { stroke: colour, dash }));
    parts.push(t(g.sx(xEnd) + 4, g.sy(ADAS.sras(k)(xEnd)) + 4, label, { fill: colour, weight: 600 }));
  });
  points.forEach(([s, k, yLabel, pLabel]) => {
    const e = ADAS.eq(s, k);
    parts.push(line(g.sx(e.y), g.sy(e.p), g.sx(e.y), L.y0, { stroke: MUTED, sw: 1, dash: '3 3' }));
    parts.push(line(L.x0, g.sy(e.p), g.sx(e.y), g.sy(e.p), { stroke: MUTED, sw: 1, dash: '3 3' }));
    parts.push(circle(g.sx(e.y), g.sy(e.p), INK));
    parts.push(t(g.sx(e.y), L.tick, yLabel, { anchor: 'middle', fill: INK }));
    if (prices && pLabel) parts.push(t(L.x0 - 6, g.sy(e.p) + 4, pLabel, { anchor: 'end', fill: INK }));
  });
  parts.push(captions(cap[0], cap[1], cap[2] || MUTED));
  return svg(L.h, parts.join(''));
};

/* ══ 1 · Public Expenditure (4.3.5 · 1a) ════════════════════════════════════ */

export const spendingDiagram = {
  id: id('diagram', 'public expenditure capital current and transfer payments'),
  title: 'Public Expenditure: Three Kinds',
  description: 'IAL 4.3.5 · 1a: one economy\'s public expenditure split into capital expenditure, current expenditure and transfer payments, in dollars and as a share of GDP.',
  checklist: [
    'Capital expenditure: assets that last, such as roads and hospitals',
    'Current expenditure: salaries, medicines and running costs used up within the year',
    'Transfer payments: pensions and benefits, with nothing produced in return',
    'The three together are public expenditure, often shown as a share of GDP',
  ],
  scenarios: [
    { label: 'In dollars', svg: bars({
      title: `${E.country}: public expenditure`,
      rows: [
        { label: 'Capital expenditure', value: E.capital, fill: BLUE2 },
        { label: 'Current expenditure', value: E.current, fill: GREEN2 },
        { label: 'Transfer payments', value: E.transfer, fill: AMBER },
        { label: 'Total', value: E.spending, fill: PURPLE, labelFill: INK },
      ],
      max: 160, fmt: bn,
      caps: [
        { text: `${bn(E.capital)} + ${bn(E.current)} + ${bn(E.transfer)} = ${bn(E.spending)}`, fill: PURPLE },
        { text: 'Transfers buy no output: the recipients spend them.' },
      ],
    }) },
    { label: 'As a share of GDP', svg: bars({
      title: `${E.country}: spending as a share of GDP`,
      rows: [
        { label: 'Capital expenditure', value: E.capital / E.gdp * 100, fill: BLUE2 },
        { label: 'Current expenditure', value: E.current / E.gdp * 100, fill: GREEN2 },
        { label: 'Transfer payments', value: E.transfer / E.gdp * 100, fill: AMBER },
        { label: 'Total', value: E.spendingShare, fill: PURPLE, labelFill: INK },
      ],
      max: 40, fmt: pct,
      caps: [
        { text: `${bn(E.spending)} of a ${bn(E.gdp)} GDP`, fill: PURPLE },
        { text: 'The usual measure of the size of the state.' },
      ],
    }) },
  ],
};

/* ══ 2 · Public Spending as a Share of GDP (4.3.5 · 1c) ═══════════════════ */

/* the crowding-out shifts: AD₁ carries the whole stimulus, AD₂ what is left after 40% is crowded out */
export const CROWD = { full: 50, net: 50 * (1 - E.crowdedShare / 100) };

export const crowdingDiagram = {
  id: id('diagram', 'crowding out ad as and private investment'),
  title: 'Crowding Out',
  description: 'IAL 4.3.5 · 1c: extra public spending shifts aggregate demand right; higher interest rates then cut private investment, so AD shifts back part of the way. The same process in figures.',
  checklist: [
    'AD₀ to AD₁: the extra public spending',
    'AD₁ back to AD₂: private investment lost to higher interest rates',
    'Output rises from Y₀ to Y₂, not all the way to Y₁',
    'The rise in total spending is smaller than the rise in public spending',
  ],
  scenarios: [
    { label: 'On AD/AS', svg: adasSvg({
      title: 'Crowding out on AD/AS',
      ads: [
        { s: 0, label: 'AD₀', colour: CYAN },
        { s: CROWD.net, label: 'AD₂', colour: AMBER, dash: '6 4' },
        { s: CROWD.full, label: 'AD₁', colour: BLUE2 },
      ],
      srass: [{ k: 0, label: 'SRAS', colour: GREEN2, xEnd: 105 }],
      points: [[0, 0, 'Y₀'], [CROWD.net, 0, 'Y₂'], [CROWD.full, 0, 'Y₁']],
      cap: ['Public spending shifts AD to AD₁.', 'Lost private investment pulls it back to AD₂.', AMBER],
    }) },
    { label: 'In figures', svg: bars({
      title: 'Crowding out in figures',
      rows: [
        { label: 'Extra public spending', value: E.stimulus, fill: BLUE2 },
        { label: 'Private investment lost', value: E.investmentLost, fill: RED2 },
        { label: 'Net rise in spending', value: E.netAddition, fill: GREEN2 },
      ],
      max: 20, fmt: bn,
      caps: [
        { text: `Interest rates rise from ${pct(E.rateBefore)} to ${pct(E.rateAfter)}.`, fill: RED2 },
        { text: `${bn(E.stimulus)} − ${bn(E.investmentLost)} = ${bn(E.netAddition)}` },
      ],
    }) },
  ],
};

/* ══ 3 · Taxes: Types, Incentives and Revenue (4.3.5 · 2b, 2c-2) ═══════════ */

const lafferSvg = ({ from, to, title, cap }) => {
  const g = plot({ xMin: 0, xMax: 100, yMin: 0, yMax: 110 });
  const pts = Array.from({ length: 21 }, (_, i) => i * 5).map((r) => [g.sx(r), g.sy(E.laffer(r))]);
  const parts = [
    g.axes(title, 'Revenue ($bn)', 'Tax rate'),
    poly(pts, { stroke: PURPLE }),
    t(g.sx(0), L.tick, '0%', { anchor: 'middle', fill: AXIS }),
    t(g.sx(E.lafferPeak), L.tick, `${E.lafferPeak}%`, { anchor: 'middle', fill: PURPLE }),
    t(g.sx(100), L.tick, '100%', { anchor: 'middle', fill: AXIS }),
    t(g.sx(E.lafferPeak), g.sy(E.lafferMax) - 10, 'Peak', { anchor: 'middle', fill: PURPLE, weight: 600 }),
  ];
  for (const [r, colour] of [[from, AMBER], [to, GREEN2]]) {
    const rev = E.laffer(r);
    parts.push(line(g.sx(r), g.sy(rev), g.sx(r), L.y0, { stroke: MUTED, sw: 1, dash: '3 3' }));
    parts.push(line(L.x0, g.sy(rev), g.sx(r), g.sy(rev), { stroke: MUTED, sw: 1, dash: '3 3' }));
    parts.push(circle(g.sx(r), g.sy(rev), colour));
    parts.push(t(g.sx(r), L.tick, `${r}%`, { anchor: 'middle', fill: colour, weight: 600 }));
    parts.push(t(L.x0 - 6, g.sy(rev) + 4, `$${rev}bn`, { anchor: 'end', fill: colour, weight: 600, size: SMALL }));
  }
  parts.push(captions(cap[0], cap[1], cap[2]));
  return svg(L.h, parts.join(''));
};

export const taxDiagram = {
  id: id('diagram', 'laffer curve and progressive proportional regressive taxes'),
  title: 'The Laffer Curve and Tax Structures',
  description: 'IAL 4.3.5 · 2b and 2c: the Laffer curve, with a tax cut below the revenue-maximising rate and one above it, and the share of income taken at three incomes by a progressive income tax and a regressive sales tax.',
  checklist: [
    'Laffer curve: tax rate on the horizontal axis, revenue on the vertical',
    'Revenue is zero at 0% and close to zero at 100%, with a peak between',
    'A cut below the peak loses revenue; a cut above it raises revenue',
    'Tax structure is judged by the share of income taken as income rises',
  ],
  scenarios: [
    { label: 'Below the peak', svg: lafferSvg({
      from: E.lowCut[0], to: E.lowCut[1], title: 'A cut below the peak',
      cap: [`${E.lowCut[0]}% → ${E.lowCut[1]}%: revenue falls.`, `From $${E.lowCutRevenue[0]}bn to $${E.lowCutRevenue[1]}bn.`, AMBER],
    }) },
    { label: 'Above the peak', svg: lafferSvg({
      from: E.highCut[0], to: E.highCut[1], title: 'A cut above the peak',
      cap: [`${E.highCut[0]}% → ${E.highCut[1]}%: revenue rises.`, `From $${E.highCutRevenue[0]}bn to $${E.highCutRevenue[1]}bn.`, GREEN2],
    }) },
    { label: 'Tax structures', svg: bars({
      title: 'Share of income taken in tax',
      rows: [
        { label: 'Income tax, $10,000', value: E.progAvg[0], fill: BLUE2 },
        { label: 'Income tax, $50,000', value: E.progAvg[1], fill: BLUE2 },
        { label: 'Income tax, $100,000', value: E.progAvg[2], fill: BLUE2 },
        { label: 'Sales tax, $10,000', value: E.salesAvg[0], fill: AMBER },
        { label: 'Sales tax, $50,000', value: E.salesAvg[1], fill: AMBER },
        { label: 'Sales tax, $100,000', value: E.salesAvg[2], fill: AMBER },
      ],
      max: 30, fmt: pct,
      caps: [
        { text: 'Income tax: the share rises with income.', fill: BLUE2 },
        { text: 'Sales tax: the share falls as income rises.' },
      ],
    }) },
  ],
};

/* ══ 4 · Tax Changes and the Macroeconomy (4.3.5 · 2c-4, 2c-5) ═════════════ */

export const TAXSHIFT = { cut: 32, vat: 22.4 };

export const taxMacroDiagram = {
  id: id('diagram', 'income tax cut and indirect tax rise on ad as'),
  title: 'Tax Changes on AD/AS',
  description: 'IAL 4.3.5 · 2c: a cut in income tax shifts aggregate demand right, raising real output and the price level; a rise in indirect tax shifts short-run aggregate supply left, raising the price level and cutting output.',
  checklist: [
    'Income tax cut: AD shifts right; output and the price level rise',
    'Indirect tax rise: SRAS shifts left; the price level rises, output falls',
    'Label both equilibria on both axes',
    'Whether output or prices rise more depends on spare capacity',
  ],
  scenarios: [
    { label: 'An income tax cut', svg: adasSvg({
      title: 'An income tax cut',
      ads: [{ s: 0, label: 'AD₀', colour: CYAN }, { s: TAXSHIFT.cut, label: 'AD₁', colour: BLUE2 }],
      srass: [{ k: 0, label: 'SRAS', colour: GREEN2, xEnd: 105 }],
      points: [[0, 0, 'Y₀', 'P₀'], [TAXSHIFT.cut, 0, 'Y₁', 'P₁']],
      prices: true,
      cap: ['More disposable income: AD shifts right.', 'Output and the price level both rise.', BLUE2],
    }) },
    { label: 'An indirect tax rise', svg: adasSvg({
      title: 'A rise in indirect tax',
      ads: [{ s: 0, label: 'AD', colour: CYAN }],
      srass: [{ k: 0, label: 'SRAS₀', colour: GREEN2, xEnd: 105 }, { k: TAXSHIFT.vat, label: 'SRAS₁', colour: RED2, dash: '6 4', xEnd: 80 }],
      points: [[0, 0, 'Y₀', 'P₀'], [0, TAXSHIFT.vat, 'Y₁', 'P₁']],
      prices: true,
      cap: ['Higher costs passed on: SRAS shifts left.', 'The price level rises; real output falls.', RED2],
    }) },
  ],
};

/* ══ 5 · Fiscal Deficits and the National Debt (4.3.5 · 3a) ═══════════════ */

export const deficitDiagram = {
  id: id('diagram', 'fiscal deficit national debt structural and cyclical'),
  title: 'Deficits, the Debt and the Cycle',
  description: 'IAL 4.3.5 · 3a: a year\'s deficit added to the stock of national debt and a surplus repaying it; and a recession deficit split into its structural and cyclical parts.',
  checklist: [
    'The deficit is a flow; the national debt is a stock',
    'Each deficit adds to the debt; only a surplus reduces it',
    'Actual deficit = structural deficit + cyclical deficit',
    'The cyclical part is created by the automatic stabilisers',
  ],
  scenarios: [
    { label: 'Deficit and debt', svg: bars({
      title: 'The deficit adds to the debt',
      rows: [
        { label: 'Debt at the start', value: E.debt, fill: BLUE2 },
        { label: 'This year\'s deficit', value: E.deficit, fill: RED2 },
        { label: 'Debt a year later', value: E.debtNext, fill: BLUE2 },
        { label: 'After a surplus year', value: E.debtAfterSurplus, fill: GREEN2 },
      ],
      max: 260, fmt: bn,
      caps: [
        { text: `${bn(E.debt)} + ${bn(E.deficit)} = ${bn(E.debtNext)}`, fill: RED2 },
        { text: `A surplus of ${bn(E.surplus)} brings it to ${bn(E.debtAfterSurplus)}.` },
      ],
    }) },
    { label: 'Structural and cyclical', svg: bars({
      title: 'A deficit in recession',
      rows: [
        { label: 'Structural deficit', value: E.structural, fill: PURPLE },
        { label: 'Cyclical deficit', value: E.cyclical, fill: AMBER },
        { label: 'Actual deficit', value: E.recessionDeficit, fill: RED2 },
      ],
      max: 30, fmt: bn,
      caps: [
        { text: `${bn(E.structural)} + ${bn(E.cyclical)} = ${bn(E.recessionDeficit)}`, fill: RED2 },
        { text: 'The cyclical part shrinks as the economy recovers.' },
      ],
    }) },
  ],
};

/* ══ 6 · Macroeconomic Policies in Use (4.3.5 · 4a) ════════════════════════ */

export const POLICY = { base: 32, oilBase: 16, oil: 24 };

export const policyDiagram = {
  id: id('diagram', 'contractionary policy and an oil price shock on ad as'),
  title: 'Inflation Control and Supply Shocks',
  description: 'IAL 4.3.5 · 4a: tighter fiscal or monetary policy shifting aggregate demand left to control inflation; and an external oil price shock shifting short-run aggregate supply left, raising prices and cutting output at once.',
  checklist: [
    'Contractionary policy: AD shifts left; the price level and output fall',
    'An oil price shock: SRAS shifts left; prices rise and output falls',
    'After a supply shock, fighting inflation costs output and jobs',
    'Name the tool that shifts each curve',
  ],
  scenarios: [
    { label: 'Controlling inflation', svg: adasSvg({
      title: 'Tighter policy to control inflation',
      ads: [{ s: 0, label: 'AD₁', colour: BLUE2, dash: '6 4' }, { s: POLICY.base, label: 'AD₀', colour: CYAN }],
      srass: [{ k: 0, label: 'SRAS', colour: GREEN2, xEnd: 105 }],
      points: [[POLICY.base, 0, 'Y₀', 'P₀'], [0, 0, 'Y₁', 'P₁']],
      prices: true,
      cap: ['Higher interest rates or taxes: AD shifts left.', 'The price level falls back; so does output.', BLUE2],
    }) },
    { label: 'An oil price shock', svg: adasSvg({
      title: 'An external oil price shock',
      ads: [{ s: POLICY.oilBase, label: 'AD', colour: CYAN }],
      srass: [{ k: 0, label: 'SRAS₀', colour: GREEN2, xEnd: 105 }, { k: POLICY.oil, label: 'SRAS₁', colour: RED2, dash: '6 4', xEnd: 80 }],
      points: [[POLICY.oilBase, 0, 'Y₀', 'P₀'], [POLICY.oilBase, POLICY.oil, 'Y₁', 'P₁']],
      prices: true,
      cap: ['Dearer oil raises costs: SRAS shifts left.', 'Higher prices and lower output at the same time.', RED2],
    }) },
  ],
};

/* ══ 7 · TNCs and the Limits of Policy (4.3.5 · 4c) ════════════════════════ */

export const transferDiagram = {
  id: id('diagram', 'transfer pricing profit and tax in two countries'),
  title: 'Transfer Pricing',
  description: 'IAL 4.3.5 · 4c: a TNC\'s profit and tax in the high-tax country where it mines and the low-tax country where its trading arm sits, at the arm\'s-length price and at an artificially low transfer price.',
  checklist: [
    'A transfer price is charged between two parts of one TNC',
    'Set below the market price, it moves profit to the low-tax country',
    'The arm\'s-length price is what independent firms would agree',
    'Compare tax paid in each country at the two prices',
  ],
  scenarios: [
    { label: 'At the arm\'s-length price', svg: bars({
      title: `Transfer price ${mnd(E.armsLength)}: arm's length`,
      rows: [
        { label: 'Profit in Country H', value: E.profitH(E.armsLength), fill: BLUE2 },
        { label: 'Profit in Country L', value: E.profitL(E.armsLength), fill: AMBER },
        { label: 'Total tax paid', value: E.taxPaid(E.armsLength), fill: GREEN2 },
      ],
      max: 40, fmt: mnd,
      caps: [
        { text: `All the profit is taxed in H at ${pct(E.taxH)}.`, fill: GREEN2 },
        { text: 'H is where the copper is mined.' },
      ],
    }) },
    { label: 'At a transfer price set low', svg: bars({
      title: `Transfer price ${mnd(E.rigged)}: set low`,
      rows: [
        { label: 'Profit in Country H', value: E.profitH(E.rigged), fill: BLUE2 },
        { label: 'Profit in Country L', value: E.profitL(E.rigged), fill: AMBER },
        { label: 'Total tax paid', value: E.taxPaid(E.rigged), fill: RED2 },
      ],
      max: 40, fmt: mnd,
      caps: [
        { text: `Most profit is taxed in L at ${pct(E.taxL)}.`, fill: RED2 },
        { text: `Country H loses ${mnd(E.taxLostH)} of tax.` },
      ],
    }) },
  ],
};

/** One diagram pinned to each block, in block order. The runner derives `diagramId` from this. */
export const DIAGRAMS = [
  spendingDiagram,
  crowdingDiagram,
  taxDiagram,
  taxMacroDiagram,
  deficitDiagram,
  policyDiagram,
  transferDiagram,
];
export const ALL_DIAGRAMS = [...DIAGRAMS];
