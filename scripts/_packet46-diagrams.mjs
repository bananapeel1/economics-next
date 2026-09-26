/**
 * PACKET 46 — growth-development diagrams. Seven, one pinned to each block, drawn from `ECON`.
 *
 * The live section had five, and only two were pinned (blocks 1 and 2, by the 25 Sep pin pass);
 * block 3 pinned nothing, and the Lewis, Harrod-Domar and Prebisch-Singer diagrams never rendered in
 * Learn Mode (structure-02, structure-08). Each block here pins its OWN diagram by id, derived by the
 * runner from this array's order, so a dangling or shared pin is unrepresentable.
 *
 * ── THE FRAME IS 400 UNITS, WITH A 12-UNIT FLOOR ─────────────────────────────
 *
 * Packet 37's convention: 15 for anything a student must read, 12 for secondary text. The runner
 * checks the emitted SVG for extent, glyph-box collisions and lines through labels (packet 40's
 * guard at 1.2 of a face, with the vertical-segment fix), not this comment.
 *
 * Every colour below is a key of `PALETTE` in `components/learn-mode/processSvg.js`; the runner
 * parses that file and asserts it.
 */
import { id, ECON, bn, pct, ix, round1, round2, round3 } from './_packet46-util.mjs';

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
const GREEN = '#059669';
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
const line = (x1, y1, x2, y2, { stroke = AXIS, sw = 1.5, dash = null, marker = null } = {}) =>
  `<line x1="${round1(x1)}" y1="${round1(y1)}" x2="${round1(x2)}" y2="${round1(y2)}" stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ''}${marker ? ` marker-end="url(#${marker})"` : ''}/>`;
const poly = (pts, { stroke = AXIS, sw = 2.5, dash = null } = {}) =>
  `<path d="M ${pts.map(([x, y]) => `${round1(x)} ${round1(y)}`).join(' L ')}" fill="none" stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
const rect = (x, y, w, h, fill) => `<rect x="${round1(x)}" y="${round1(y)}" width="${round1(Math.max(0, w))}" height="${round1(h)}" rx="3" fill="${fill}"/>`;
const circle = (x, y, fill) => `<circle cx="${round1(x)}" cy="${round1(y)}" r="4" fill="${fill}"/>`;
const arrowDefs = (colours) => `<defs>${colours.map(([name, c]) => `<marker id="${name}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${c}"/></marker>`).join('')}</defs>`;

/* ── bar charts: one row per bar, label left, value right ──────────────────── */
/*
 * Rows are 34 units apart. Labels start at 16 and must end before BAR_X; the value sits 6 units past
 * the bar's end, so the longest bar leaves room for a six-character value inside the frame.
 */
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

/* ══ 1 · Measuring Development (4.3.6 · 1a, 1b) ══════════════════════════ */

/* the geometric-mean comparison, derived rather than typed */
export const GEO = (() => {
  const a = [0.7, 0.7, 0.7];
  const b = [0.9, 0.9, 0.3];
  const gm = (v) => Math.cbrt(v[0] * v[1] * v[2]);
  const am = (v) => (v[0] + v[1] + v[2]) / 3;
  return { a, b, gmA: round3(gm(a)), gmB: round3(gm(b)), amA: round3(am(a)), amB: round3(am(b)) };
})();

export const hdiDiagram = {
  id: id('diagram', 'hdi three dimension indices and the geometric mean'),
  title: 'The HDI: Three Dimensions',
  description: 'IAL 4.3.6 · 1a and 1b: the three HDI dimension indices for one economy, combined by a geometric mean, and why a geometric mean lets a weak dimension pull the index down.',
  checklist: [
    `Health: life expectancy at birth, between goalposts of ${E.leMin} and ${E.leMax} years`,
    'Education: mean years (out of 15) and expected years (out of 18), averaged',
    'Income: GNI per head at purchasing power parity, on a log scale',
    'The HDI is the geometric mean of the three indices',
  ],
  scenarios: [
    { label: `${E.country}'s three indices`, svg: bars({
      title: `${E.country}: three dimension indices`,
      rows: [
        { label: 'Health', value: E.healthIx, fill: GREEN2 },
        { label: 'Education', value: E.eduIx, fill: BLUE2 },
        { label: 'Income', value: E.incomeIx, fill: AMBER },
        { label: 'HDI', value: E.hdi, fill: PURPLE, labelFill: INK },
      ],
      max: 1, fmt: ix,
      caps: [
        { text: `HDI = ∛(${ix(E.healthIx)} × ${ix(E.eduIx)} × ${ix(E.incomeIx)}) = ${ix(E.hdi)}`, fill: PURPLE },
        { text: 'Medium human development: 0.550 to 0.699.' },
      ],
    }) },
    { label: 'Why a geometric mean', svg: bars({
      title: 'Same arithmetic mean, different HDI',
      rows: [
        { label: 'Country A, each index', value: GEO.a[0], fill: GREEN2 },
        { label: 'Country A, HDI', value: GEO.gmA, fill: PURPLE, labelFill: INK },
        { label: 'Country B, weakest index', value: GEO.b[2], fill: RED2 },
        { label: 'Country B, HDI', value: GEO.gmB, fill: PURPLE, labelFill: INK },
      ],
      max: 1, fmt: ix,
      caps: [
        { text: `A: ${GEO.a.map(ix).join(', ')}. B: ${GEO.b.map(ix).join(', ')}.`, fill: PURPLE },
        { text: `Both average ${ix(GEO.amA)}; B's weak index pulls it to ${ix(GEO.gmB)}.` },
      ],
    }) },
  ],
};

/* ══ 2 · Constraints: Commodities, Savings and Currency (2a-1 .. 2a-5) ════ */

/* the terms of trade path, derived from two price indices moving in straight lines */
export const TOT_PATH = (() => {
  const n = 10;
  return Array.from({ length: n + 1 }, (_, i) => {
    const ex = 100 + ((E.exportPriceIx - 100) * i) / n;
    const im = 100 + ((E.importPriceIx - 100) * i) / n;
    return { i, ex, im, tot: (ex / im) * 100 };
  });
})();

const totSvg = () => {
  const g = plot({ xMin: 0, xMax: 10, yMin: 60, yMax: 130 });
  const P = TOT_PATH;
  const last = P[P.length - 1];
  return svg(L.h, [
    g.axes('Prebisch-Singer: the terms of trade', 'Index', 'Years'),
    t(L.x0 - 6, g.sy(100) + 4, '100', { anchor: 'end', fill: AXIS }),
    line(L.x0, g.sy(100), L.xR, g.sy(100), { stroke: MUTED, sw: 1, dash: '3 3' }),
    poly(P.map((p) => [g.sx(p.i), g.sy(p.im)]), { stroke: AMBER }),
    poly(P.map((p) => [g.sx(p.i), g.sy(p.ex)]), { stroke: GREEN2 }),
    poly(P.map((p) => [g.sx(p.i), g.sy(p.tot)]), { stroke: RED2 }),
    t(L.xR + 4, g.sy(last.im) + 4, String(round1(last.im)), { fill: AMBER, weight: 600 }),
    t(L.xR + 4, g.sy(last.ex) + 4, String(round1(last.ex)), { fill: GREEN2, weight: 600 }),
    t(L.xR + 4, g.sy(last.tot) + 4, String(Math.round(last.tot)), { fill: RED2, weight: 600 }),
    t(g.sx(0.3), g.sy(126), 'Import prices', { fill: AMBER }),
    t(g.sx(5.5), g.sy(104), 'Export prices', { fill: GREEN2 }),
    t(g.sx(3.2), g.sy(66), 'Terms of trade', { fill: RED2 }),
    captions(`Terms of trade = ${E.exportPriceIx} ÷ ${E.importPriceIx} × 100 = ${E.tot}.`, 'Each unit of exports buys a quarter less.', RED2),
  ].join(''));
};

export const constraintsDiagram = {
  id: id('diagram', 'terms of trade savings gap and foreign currency gap'),
  title: 'Commodities, Savings and Foreign Currency',
  description: 'IAL 4.3.6 · 2a: primary exporters\' terms of trade declining (Prebisch-Singer), the Harrod-Domar savings gap, and the foreign currency gap, all for one economy.',
  checklist: [
    `Terms of trade = export price index ÷ import price index × 100 = ${E.tot}`,
    `Harrod-Domar: growth = ${E.s}% ÷ ${E.k} = ${pct(E.g)}; ${pct(E.gTarget)} needs ${pct(E.sNeeded)} saving`,
    `Savings gap: ${E.savingsGap} points of GDP`,
    `Foreign currency gap: imports needed ${bn(E.importNeeds)} against exports of ${bn(E.exports)}`,
  ],
  scenarios: [
    { label: 'Terms of trade', svg: totSvg() },
    { label: 'The savings gap', svg: bars({
      title: 'Harrod-Domar: the savings gap',
      rows: [
        { label: 'Saving now', value: E.s, fill: GREEN2 },
        { label: `Needed for ${pct(E.gTarget)} growth`, value: E.sNeeded, fill: BLUE2 },
        { label: 'Savings gap', value: E.savingsGap, fill: RED2 },
      ],
      max: 30, fmt: (v) => `${v}%`,
      caps: [
        { text: `Growth = ${E.s} ÷ ${E.k} = ${pct(E.g)}; ${E.sNeeded} ÷ ${E.k} = ${pct(E.gTarget)}.`, fill: BLUE2 },
        { text: `The gap is ${bn(E.savingsGapBn)} a year, as a share of GDP.` },
      ],
    }) },
    { label: 'The foreign currency gap', svg: bars({
      title: 'The foreign currency gap',
      rows: [
        { label: 'Export earnings', value: E.exports, fill: GREEN2 },
        { label: 'Imports the plan needs', value: E.importNeeds, fill: AMBER },
        { label: 'Foreign currency gap', value: E.fxGap, fill: RED2 },
      ],
      max: 16, fmt: bn,
      caps: [
        { text: `${bn(E.importNeeds)} − ${bn(E.exports)} = ${bn(E.fxGap)} a year.`, fill: RED2 },
        { text: 'Filled by FDI, aid or borrowing, or by cutting imports.' },
      ],
    }) },
  ],
};

/* ══ 3 · Constraints: People, Debt, Credit and Infrastructure (2a-6 .. 2a-10) ═ */

export const peopleDebtDiagram = {
  id: id('diagram', 'dependency ratio and overseas debt service'),
  title: 'Population Structure and Debt',
  description: 'IAL 4.3.6 · 2a: the age distribution behind the dependency ratio in a young developing economy and in an ageing high-income one, and overseas debt service as a share of export earnings.',
  checklist: [
    'Dependency ratio = (under 15 + over 64) ÷ working age × 100',
    `A young population: ${E.dependency} dependants per hundred of working age`,
    `An ageing population: ${E.agedDependency} per hundred, most of them old`,
    `Debt service ${bn(E.debtService)}: ${pct(E.debtServiceShare)} of export earnings`,
  ],
  scenarios: [
    { label: 'A young population', svg: bars({
      title: `${E.country}: a young population`,
      rows: [
        { label: 'Under 15', value: E.under15, fill: AMBER },
        { label: 'Aged 15 to 64', value: E.working, fill: GREEN2 },
        { label: 'Over 64', value: E.over64, fill: BLUE2 },
      ],
      max: 70, fmt: (v) => `${v}%`,
      caps: [
        { text: `(${E.under15} + ${E.over64}) ÷ ${E.working} × 100 = ${E.dependency}`, fill: AMBER },
        { text: 'Almost one dependant for each worker.' },
      ],
    }) },
    { label: 'An ageing population', svg: bars({
      title: 'An ageing high-income economy',
      rows: [
        { label: 'Under 15', value: E.agedUnder15, fill: AMBER },
        { label: 'Aged 15 to 64', value: E.agedWorking, fill: GREEN2 },
        { label: 'Over 64', value: E.agedOver64, fill: BLUE2 },
      ],
      max: 70, fmt: (v) => `${v}%`,
      caps: [
        { text: `(${E.agedUnder15} + ${E.agedOver64}) ÷ ${E.agedWorking} × 100 = ${E.agedDependency}`, fill: BLUE2 },
        { text: 'Fewer dependants, but more of them retired.' },
      ],
    }) },
    { label: 'Overseas debt service', svg: bars({
      title: 'Debt service and export earnings',
      rows: [
        { label: 'Export earnings', value: E.exports, fill: GREEN2 },
        { label: 'Debt service', value: E.debtService, fill: RED2 },
        { label: 'Left for imports', value: round1(E.exports - E.debtService), fill: AMBER },
      ],
      max: 16, fmt: bn,
      caps: [
        { text: `${bn(E.debtService)} ÷ ${bn(E.exports)} = ${pct(E.debtServiceShare)} of earnings.`, fill: RED2 },
        { text: 'Paid in dollars before any import is bought.' },
      ],
    }) },
  ],
};

/* ══ 4 · Non-Economic Constraints (2b) ═══════════════════════════════════ */

/* a frontier drawn by sampling a quarter-ellipse, so the path reader sees straight segments */
const frontier = (g, a, b, n = 12) => Array.from({ length: n + 1 }, (_, i) => {
  const th = (Math.PI / 2) * (i / n);
  return [g.sx(a * Math.cos(th)), g.sy(b * Math.sin(th))];
});

const ppfSvg = ({ war }) => {
  const g = plot({ xMin: 0, xMax: 100, yMin: 0, yMax: 100 });
  const parts = [
    arrowDefs([['pp-red', RED2]]),
    g.axes(war ? 'Civil war: the frontier shifts inward' : 'Corruption: inside the frontier', 'Capital goods', 'Consumer goods'),
    poly(frontier(g, 80, 80), { stroke: BLUE2 }),
    t(g.sx(80) + 6, L.y0 - 6, 'PPF', { fill: BLUE2, weight: 600 }),
  ];
  if (war) {
    parts.push(poly(frontier(g, 55, 55), { stroke: RED2, dash: '6 4' }));
    parts.push(t(g.sx(55) + 6, L.y0 - 6, 'PPF₁', { fill: RED2, weight: 600 }));
    parts.push(line(g.sx(56.6 * 0.95), g.sy(56.6 * 0.95), g.sx(40.5), g.sy(40.5), { stroke: RED2, sw: 2, marker: 'pp-red' }));
    parts.push(captions('Capital destroyed, workers lost: less of everything.', 'A loss of capacity, which takes years to rebuild.', RED2));
  } else {
    const on = [80 * Math.cos(Math.PI / 4), 80 * Math.sin(Math.PI / 4)];
    parts.push(circle(g.sx(on[0]), g.sy(on[1]), BLUE2));
    parts.push(t(g.sx(on[0]) + 8, g.sy(on[1]) - 8, 'A', { fill: BLUE2, weight: 600 }));
    parts.push(circle(g.sx(34), g.sy(30), AMBER));
    parts.push(t(g.sx(34) - 8, g.sy(30) + 4, 'B', { anchor: 'end', fill: AMBER, weight: 600 }));
    parts.push(captions('B: resources wasted on bribes and favoured projects.', 'A: what the same resources could produce.', AMBER));
  }
  return svg(L.h, parts.join(''));
};

export const nonEconomicDiagram = {
  id: id('diagram', 'civil war and corruption on a production possibility frontier'),
  title: 'Conflict and Corruption on a PPF',
  description: 'IAL 4.3.6 · 2b: a civil war destroying capital and labour, shown as an inward shift of the production possibility frontier, and corruption wasting resources, shown as a point inside it.',
  checklist: [
    'Axes: capital goods and consumer goods',
    'Civil war: the frontier shifts inward to PPF₁',
    'Corruption and poor governance: a point inside the frontier',
    'War is a loss of capacity; corruption is waste of the capacity there is',
  ],
  scenarios: [
    { label: 'Civil war', svg: ppfSvg({ war: true }) },
    { label: 'Corruption', svg: ppfSvg({ war: false }) },
  ],
};

/* ══ 5 · Market-Orientated Strategies (3a) ═══════════════════════════════ */

/* the market for the currency: S: P = 0.2 + Q/500, D: P = 0.8 − Q/500, D₁: P = 0.6 − Q/500 */
export const FX = (() => {
  const s = (q) => 0.2 + q / 500;
  const d = (q) => 0.8 - q / 500;
  const d1 = (q) => 0.6 - q / 500;
  const q0 = (0.8 - 0.2) / (2 / 500), p0 = round2(s(q0));
  const q1 = (0.6 - 0.2) / (2 / 500), p1 = round2(s(q1));
  return { s, d, d1, q0, p0, q1, p1 };
})();

const fxSvg = () => {
  const g = plot({ xMin: 0, xMax: 250, yMin: 0.1, yMax: 0.9 });
  const seg = (f, a, b) => [[g.sx(a), g.sy(f(a))], [g.sx(b), g.sy(f(b))]];
  return svg(L.h, [
    arrowDefs([['fx-red', RED2]]),
    g.axes('A floating currency depreciates', '$ per unit', 'Quantity of the currency'),
    poly(seg(FX.s, 0, 250), { stroke: GREEN2 }),
    poly(seg(FX.d, 0, 250), { stroke: CYAN }),
    poly(seg(FX.d1, 0, 225), { stroke: RED2, dash: '6 4' }),
    t(L.xR + 4, g.sy(FX.s(250)) + 4, 'S', { fill: GREEN2, weight: 600 }),
    t(L.xR + 4, g.sy(FX.d(250)) + 4, 'D', { fill: CYAN, weight: 600 }),
    t(g.sx(225) + 6, g.sy(FX.d1(225)) + 4, 'D₁', { fill: RED2, weight: 600 }),
    line(L.x0, g.sy(FX.p0), g.sx(FX.q0), g.sy(FX.p0), { stroke: INK2, sw: 1, dash: '3 3' }),
    line(L.x0, g.sy(FX.p1), g.sx(FX.q1), g.sy(FX.p1), { stroke: RED2, sw: 1, dash: '3 3' }),
    circle(g.sx(FX.q0), g.sy(FX.p0), INK2),
    circle(g.sx(FX.q1), g.sy(FX.p1), RED2),
    t(L.x0 - 6, g.sy(FX.p0) + 4, FX.p0.toFixed(2), { anchor: 'end', fill: INK2 }),
    t(L.x0 - 6, g.sy(FX.p1) + 4, FX.p1.toFixed(2), { anchor: 'end', fill: RED2 }),
    captions(`Export earnings fall: D → D₁, $${FX.p0.toFixed(2)} → $${FX.p1.toFixed(2)}.`, 'No reserves spent; exports become cheaper abroad.', RED2),
  ].join(''));
};

export const marketStrategiesDiagram = {
  id: id('diagram', 'fdi fills the savings gap and a floating currency depreciates'),
  title: 'Market-Orientated Strategies at Work',
  description: 'IAL 4.3.6 · 3a: FDI adding foreign savings to domestic saving in the Harrod-Domar model, and a floating currency depreciating when export earnings fall.',
  checklist: [
    `Investment = saving ${pct(E.s)} + FDI ${pct(E.fdi)} = ${pct(E.s + E.fdi)} of GDP`,
    `Growth rises from ${pct(E.g)} to ${pct(E.gWithFdi)} with a capital-output ratio of ${E.k}`,
    'A fall in demand for the currency, D to D₁, lowers its price',
    'Under a floating rate no reserves are spent',
  ],
  scenarios: [
    { label: 'FDI and growth', svg: bars({
      title: 'FDI adds to investment',
      rows: [
        { label: 'Domestic saving', value: E.s, fill: GREEN2 },
        { label: 'FDI inflow', value: E.fdi, fill: BLUE2 },
        { label: 'Total investment', value: E.s + E.fdi, fill: PURPLE, labelFill: INK },
      ],
      max: 24, fmt: (v) => `${v}%`,
      caps: [
        { text: `Growth ${E.s} ÷ ${E.k} = ${pct(E.g)}; with FDI ${E.s + E.fdi} ÷ ${E.k} = ${pct(E.gWithFdi)}.`, fill: PURPLE },
        { text: 'Part of the profits later flows back abroad.' },
      ],
    }) },
    { label: 'A floating exchange rate', svg: fxSvg() },
  ],
};

/* ══ 6 · Interventionist Strategies (3b) — the buffer stock ═══════════════ */

const bufferSvg = ({ good }) => {
  const g = plot({ xMin: 250, xMax: 550, yMin: 1.2, yMax: 2.8 });
  const q = good ? E.qGood : E.qPoor;
  const pFree = good ? E.pGood : E.pPoor;
  const pHeld = good ? E.floor : E.ceiling;
  const qHeld = E.qAt(pHeld);
  const colour = good ? GREEN2 : AMBER;
  const dEnds = [[g.sx(290), g.sy(E.priceAt(290))], [g.sx(500), g.sy(E.priceAt(500))]];
  const f2 = (p) => `$${p.toFixed(2)}`;
  return svg(L.h, [
    g.axes(good ? 'A bumper harvest: the agency buys' : 'A poor harvest: the agency sells', '$ per kg', 'Coffee (thousand tonnes)'),
    line(L.x0, g.sy(E.floor), L.xR, g.sy(E.floor), { stroke: BLUE2, sw: 1.5, dash: '6 4' }),
    line(L.x0, g.sy(E.ceiling), L.xR, g.sy(E.ceiling), { stroke: PURPLE, sw: 1.5, dash: '6 4' }),
    t(L.x0 - 6, g.sy(E.floor) + 4, f2(E.floor), { anchor: 'end', fill: BLUE2 }),
    t(L.x0 - 6, g.sy(E.ceiling) + 4, f2(E.ceiling), { anchor: 'end', fill: PURPLE }),
    t(L.xR + 4, g.sy(E.floor) + 4, 'Floor', { fill: BLUE2, weight: 600 }),
    t(L.xR + 4, g.sy(E.ceiling) + 4, 'Ceiling', { fill: PURPLE, weight: 600 }),
    poly(dEnds, { stroke: CYAN }),
    t(g.sx(500) + 6, g.sy(E.priceAt(500)) + 4, 'D', { fill: CYAN, weight: 600 }),
    line(g.sx(q), L.y1, g.sx(q), L.y0, { stroke: colour, sw: 2.5 }),
    t(g.sx(q), L.y1 - 6, 'S', { anchor: 'middle', fill: colour, weight: 600 }),
    t(g.sx(q), L.tick, String(q), { anchor: 'middle', fill: colour }),
    circle(g.sx(q), g.sy(pFree), RED2),
    line(g.sx(qHeld), g.sy(pHeld), g.sx(q), g.sy(pHeld), { stroke: colour, sw: 4 }),
    t(g.sx(Math.max(q, qHeld)) + 36, g.sy(pHeld) + 16, `${good ? E.buyGood : E.sellPoor}k`, { fill: colour, weight: 600 }),
    captions(good
      ? `Free price ${f2(pFree)}; the agency buys ${E.buyGood}k tonnes at ${f2(pHeld)}.`
      : `Free price ${f2(pFree)}; the agency sells ${E.sellPoor}k tonnes at ${f2(pHeld)}.`,
    'The price stays in the band while money and stock last.', colour),
  ].join(''));
};

export const bufferStockDiagram = {
  id: id('diagram', 'coffee buffer stock scheme floor and ceiling'),
  title: 'A Buffer Stock Scheme',
  description: 'IAL 4.3.6 · 3b: a buffer stock for coffee with a floor and a ceiling price; the agency buys the surplus after a bumper harvest and sells from store after a poor one.',
  checklist: [
    'A floor and a ceiling price marked as horizontal lines',
    'Supply drawn vertical at the size of each harvest',
    `Bumper harvest: the agency buys ${E.buyGood}k tonnes, the gap between supply and demand at the floor`,
    `Poor harvest: the agency sells ${E.sellPoor}k tonnes, the gap at the ceiling`,
  ],
  scenarios: [
    { label: 'A bumper harvest', svg: bufferSvg({ good: true }) },
    { label: 'A poor harvest', svg: bufferSvg({ good: false }) },
  ],
};

/* ══ 7 · Other Strategies — the Lewis model (3c-1) ══════════════════════════ */

/* modern-sector labour demand w = c − L; supply flat at the modern wage until the turning point, then w = wage + (L − TP) */
export const LEWIS = (() => {
  const cs = E.lewisJobs.map((j) => E.modernWage + j);            // demand curves crossing the wage at 2, 3, 4 million
  const supplyAt = (l) => (l <= E.turningPoint ? E.modernWage : E.modernWage + (l - E.turningPoint));
  const cLate = 9.5;                                               // demand after the turning point
  const lLate = (cLate - E.modernWage + E.turningPoint) / 2;        // c − L = wage + L − TP
  const wLate = round2(supplyAt(lLate));
  return { cs, supplyAt, cLate, lLate: round2(lLate), wLate };
})();

const lewisSvg = ({ late }) => {
  const g = plot({ xMin: 0, xMax: 7, yMin: 0, yMax: 6 });
  const dCurve = (c, colour, name) => {
    const a = Math.max(0, c - 6), b = Math.min(7, c);
    return poly([[g.sx(a), g.sy(c - a)], [g.sx(b), g.sy(c - b)]], { stroke: colour, sw: 2 })
      + t(g.sx(Math.min(b, 7)) + (b >= 7 ? 4 : 2), g.sy(c - b) - 6, name, { fill: colour, weight: 600 });
  };
  const parts = [
    g.axes(late ? 'Past the turning point, wages rise' : 'Reinvested profits create jobs', '$ a day', 'Modern-sector workers (million)'),
    line(L.x0, g.sy(E.subsistence), L.xR, g.sy(E.subsistence), { stroke: MUTED, sw: 1, dash: '3 3' }),
    t(L.x0 + 4, g.sy(E.subsistence) + 16, `Farm income $${E.subsistence}`, { fill: MUTED }),
    poly([[g.sx(0), g.sy(E.modernWage)], [g.sx(E.turningPoint), g.sy(E.modernWage)], [g.sx(6.8), g.sy(LEWIS.supplyAt(6.8))]], { stroke: GREEN2 }),
    t(L.x0 - 6, g.sy(E.modernWage) + 4, `$${E.modernWage}`, { anchor: 'end', fill: GREEN2 }),
    t(g.sx(6.8) + 4, g.sy(LEWIS.supplyAt(6.8)) + 4, 'S', { fill: GREEN2, weight: 600 }),
    t(g.sx(E.turningPoint), L.tick, String(E.turningPoint), { anchor: 'middle', fill: RED2 }),
    circle(g.sx(E.turningPoint), g.sy(E.modernWage), RED2),
  ];
  if (!late) {
    const cols = [CYAN, BLUE2, PURPLE];
    LEWIS.cs.forEach((c, i) => {
      parts.push(dCurve(c, cols[i], `D${['₁', '₂', '₃'][i]}`));
      parts.push(t(g.sx(E.lewisJobs[i]), L.tick, String(E.lewisJobs[i]), { anchor: 'middle', fill: cols[i] }));
    });
    parts.push(captions(`Jobs ${E.lewisJobs.join(' → ')} million at $${E.modernWage} a day.`, `The wage stays flat until ${E.turningPoint} million: the turning point.`, PURPLE));
  } else {
    parts.push(dCurve(LEWIS.cLate, AMBER, 'D₄'));
    parts.push(circle(g.sx(LEWIS.lLate), g.sy(LEWIS.wLate), AMBER));
    parts.push(t(L.x0 - 6, g.sy(LEWIS.wLate) + 4, `$${LEWIS.wLate.toFixed(2)}`, { anchor: 'end', fill: AMBER }));
    parts.push(captions(`Surplus labour used up at ${E.turningPoint} million.`, `More demand now raises the wage to $${LEWIS.wLate.toFixed(2)}.`, AMBER));
  }
  return svg(L.h, parts.join(''));
};

export const lewisDiagram = {
  id: id('diagram', 'lewis dual sector model modern sector labour market'),
  title: 'The Lewis Dual-Sector Model',
  description: 'IAL 4.3.6 · 3c: the modern sector hires surplus labour at a constant wage above farm incomes; reinvested profits shift labour demand right until surplus labour runs out at the turning point, after which wages rise.',
  checklist: [
    `Labour supply flat at $${E.modernWage} a day, above farm incomes of $${E.subsistence}`,
    'Reinvested profits shift labour demand right, D₁ to D₂ to D₃',
    `The turning point at ${E.turningPoint} million, where the supply curve starts to rise`,
    'Beyond it, more demand raises the wage',
  ],
  scenarios: [
    { label: 'Reinvestment', svg: lewisSvg({ late: false }) },
    { label: 'The turning point', svg: lewisSvg({ late: true }) },
  ],
};

/** One diagram pinned to each block, in block order. The runner derives `diagramId` from this. */
export const DIAGRAMS = [
  hdiDiagram,
  constraintsDiagram,
  peopleDebtDiagram,
  nonEconomicDiagram,
  marketStrategiesDiagram,
  bufferStockDiagram,
  lewisDiagram,
];
export const ALL_DIAGRAMS = [...DIAGRAMS];
