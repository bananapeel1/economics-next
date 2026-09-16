/**
 * PACKET 17 — consumer-behaviour-demand: five diagrams, each pinned to a chapter by `diagramId`.
 *
 * The March section had four and only two of them ever rendered: block 2's `diagramRef` "PED"
 * first-matched "PED and Total Revenue", and blocks 3 and 4 pinned nothing at all (structure-02).
 * `diagramRef` is the legacy string pin; since packet 5 a diagram reaches a student only from a
 * block's `diagramId`, at that chapter's check-in (lib/learn-steps.js:44-55), so every one of these
 * is pinned by id and every chapter but the last has one.
 *
 * Conventions from the live census: a 500-unit-wide viewBox, labels at 9-13 units (the phone sheet
 * draws at 220vw, so 9 units is 15px at 390px), palette colours that components/learn-mode/processSvg.js
 * remaps onto theme tokens, strokes >= 2, and text placed from the geometry of the line it names.
 *
 * EVERY QUANTITY HERE IS GENERATED, NOT DRAWN (packet 15's accuracy-01 rule). The demand line is
 * sampled from Q = 1200 − 40P, the revenue curve from P × Q at the same fares, the utility bars from
 * the marginal-utility schedule, and the number-line markers from the elasticity values themselves.
 * The runner re-derives all of them from the emitted SVG and refuses to stage on a disagreement.
 */
import { id, money, qAt, trAt, MU, totalUtility, MID_P, MID_Q, MAX_TR, CHOKE_P, INCOME_RISE, yed, COACH_YQ, AIR_YQ, RICE_YQ, XED_SUBSTITUTE, XED_COMPLEMENT } from './_packet17-util.mjs';

const INK = '#e8ecf5', AXIS = '#94a3b8', GRID = '#475569', MUTED = '#7a8299';
const BLUE = '#3b82f6', GREEN = '#059669', RED = '#ef4444', AMBER = '#f59e0b', PURPLE = '#8b5cf6';
const open = (h = 330) => `<svg width="500" height="${h}" viewBox="0 0 500 ${h}" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',system-ui,sans-serif;background:transparent"><defs><marker id="arr" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="${AXIS}"/></marker><marker id="arrAmber" markerWidth="9" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="${AMBER}"/></marker></defs>`;
const close = '</svg>';
const t = (x, y, text, { size = 10, fill = INK, anchor = 'start', weight = 400, rotate = null } = {}) =>
  `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}"${rotate ? ` transform="rotate(${rotate},${x},${y})"` : ''}>${text}</text>`;
const line = (x1, y1, x2, y2, stroke, w = 2, extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${w}"${extra}/>`;
const rect = (x, y, w, h, fill, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"${extra}/>`;
const dot = (x, y, fill, r = 5) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;
const dash = ' stroke-dasharray="6,4"';
export const r2 = (n) => Math.round(n * 100) / 100;

/* ── the shared price/quantity frame ───────────────────────────────────────── */
/* One scale for every demand diagram, so the same fare is at the same height in all of them. */
export const PQ = { x0: 78, x1: 448, y0: 262, yTop: 54, qMax: 1200, pMax: 30 };
export const DX = (q) => r2(PQ.x0 + (q / PQ.qMax) * (PQ.x1 - PQ.x0));
export const DY = (p) => r2(PQ.y0 - (p / PQ.pMax) * (PQ.y0 - PQ.yTop));

const frame = (xLabel = 'Quantity demanded (tickets a day)', yLabel = 'Price (fare, $)') => [
  line(PQ.x0, PQ.y0, PQ.x1 + 12, PQ.y0, AXIS, 2, ' marker-end="url(#arr)"'),
  line(PQ.x0, PQ.y0, PQ.x0, PQ.yTop - 12, AXIS, 2, ' marker-end="url(#arr)"'),
  t((PQ.x0 + PQ.x1) / 2, PQ.y0 + 26, xLabel, { size: 10, fill: AXIS, anchor: 'middle' }),
  t(PQ.x0 - 22, (PQ.y0 + PQ.yTop) / 2, yLabel, { size: 10, fill: AXIS, anchor: 'middle', rotate: -90 }),
].join('');

/* ── 1 · Utility: the schedule behind the curve (block 1) ──────────────────── */
/*
 * Two views of the same four numbers. Marginal utility falls; total utility rises by less each time.
 * Both sets of bar heights are computed from MU, so a change to the schedule redraws both.
 */
export const UBAR = { x0: 120, y0: 244, top: 70, w: 62, gap: 82, muMax: 30, tuMax: 70 };
export const muH = (v) => r2(((UBAR.y0 - UBAR.top) * v) / UBAR.muMax);
export const tuH = (v) => r2(((UBAR.y0 - UBAR.top) * v) / UBAR.tuMax);
const barX = (i) => r2(UBAR.x0 + i * UBAR.gap);

const utilityBars = (values, hFor, colour, caption, note) => [
  open(320),
  line(84, UBAR.y0, 460, UBAR.y0, AXIS, 2),
  line(84, UBAR.y0, 84, 58, AXIS, 2, ' marker-end="url(#arr)"'),
  t(70, 156, 'Value to the traveller ($)', { size: 10, fill: AXIS, anchor: 'middle', rotate: -90 }),
  ...values.map((v, i) => [
    rect(barX(i), r2(UBAR.y0 - hFor(v)), UBAR.w, hFor(v), colour),
    t(barX(i) + UBAR.w / 2, r2(UBAR.y0 - hFor(v)) - 8, money(v), { size: 12, anchor: 'middle', weight: 600 }),
    t(barX(i) + UBAR.w / 2, UBAR.y0 + 18, `Trip ${i + 1}`, { size: 11, fill: AXIS, anchor: 'middle' }),
  ].join('')),
  t(84, 286, caption, { size: 11, fill: MUTED }),
  t(84, 304, note, { size: 10, fill: AXIS }),
  close,
].join('');

const utilityDiagram = {
  id: id('diagram', 'utility schedule marginal and total'),
  title: 'Marginal and Total Utility',
  description: 'One traveller\'s marginal utility from a first, second, third and fourth coach trip in a month, and the total utility those trips add up to. Marginal utility falls; total utility rises by a smaller amount each time.',
  checklist: [
    'Bars labelled with the value of each successive trip, in order',
    'Marginal utility falls with every extra trip',
    'Total utility still rises, but by a smaller amount each time',
    'The axis states what is being measured and in what units',
    'The link stated: willingness to pay is marginal utility in money',
  ],
  scenarios: [
    { label: 'Marginal utility falls', svg: utilityBars(MU, muH, BLUE, `Marginal utility: ${MU.map((m) => money(m)).join(' → ')}`, 'Each extra trip in the month adds less satisfaction than the one before') },
    { label: 'Total utility rises by less each time', svg: utilityBars([1, 2, 3, 4].map((n) => totalUtility(n)), tuH, GREEN, `Total utility: ${[1, 2, 3, 4].map((n) => money(totalUtility(n))).join(' → ')}`, 'Still rising, because each marginal utility is positive — but rising more slowly') },
  ],
};

/* ── 2 · The demand curve: movements and shifts (block 2) ──────────────────── */
const demandLine = (shiftQ = 0, colour = BLUE, label = 'D') => {
  /* Sampled from Q = 1200 − 40P at the two ends of the line: a straight line needs no more. */
  const top = { q: qAt(PQ.pMax) + shiftQ, p: PQ.pMax };      // at the choke price, Q = 0
  const bottom = { q: qAt(0) + shiftQ, p: 0 };
  return [
    line(DX(top.q), DY(top.p), DX(bottom.q), DY(bottom.p), colour, 3),
    t(DX(bottom.q) - 4, DY(bottom.p) - 8, label, { size: 12, fill: colour, weight: 600, anchor: 'end' }),
  ].join('');
};

const marked = (p, colour, label) => [
  line(PQ.x0, DY(p), DX(qAt(p)), DY(p), colour, 1.5, dash),
  line(DX(qAt(p)), DY(p), DX(qAt(p)), PQ.y0, colour, 1.5, dash),
  dot(DX(qAt(p)), DY(p), colour),
  t(PQ.x0 - 6, DY(p) + 4, money(p), { size: 10, fill: colour, anchor: 'end', weight: 600 }),
  t(DX(qAt(p)), PQ.y0 + 14, `${qAt(p)}`, { size: 10, fill: colour, anchor: 'middle', weight: 600 }),
  label ? t(DX(qAt(p)) + 8, DY(p) - 8, label, { size: 10, fill: colour }) : '',
].join('');

const movementSvg = () => [
  open(320), frame(), demandLine(),
  marked(20, AMBER, ''), marked(15, GREEN, ''),
  line(DX(qAt(20)) + 6, DY(20) + 6, DX(qAt(15)) - 6, DY(15) - 6, AMBER, 2, ' marker-end="url(#arrAmber)"'),
  t(300, 108, `A fare cut from ${money(20)} to ${money(15)}`, { size: 11, fill: AMBER, weight: 600 }),
  t(300, 124, `moves along the SAME curve:`, { size: 10, fill: MUTED }),
  t(300, 138, `${qAt(20)} tickets → ${qAt(15)} tickets`, { size: 10, fill: MUTED }),
  t(PQ.x0, 300, 'An extension in quantity demanded — one curve, two points on it', { size: 10, fill: AXIS }),
  close].join('');

const shiftSvg = () => [
  open(320), frame(), demandLine(0, GRID, 'D1'), demandLine(240, BLUE, 'D2'),
  line(DX(qAt(15)) + 6, DY(15), DX(qAt(15) + 240) - 6, DY(15), AMBER, 2, ' marker-end="url(#arrAmber)"'),
  dot(DX(qAt(15)), DY(15), GRID), dot(DX(qAt(15) + 240), DY(15), BLUE),
  line(PQ.x0, DY(15), DX(qAt(15) + 240), DY(15), AMBER, 1.5, dash),
  t(PQ.x0 - 6, DY(15) + 4, money(15), { size: 10, fill: AMBER, anchor: 'end', weight: 600 }),
  t(288, 100, 'Real incomes rise, or a', { size: 11, fill: BLUE, weight: 600 }),
  t(288, 115, 'substitute gets dearer', { size: 11, fill: BLUE, weight: 600 }),
  t(288, 131, `At the SAME fare of ${money(15)}:`, { size: 10, fill: MUTED }),
  t(288, 145, `${qAt(15)} → ${qAt(15) + 240} tickets`, { size: 10, fill: MUTED }),
  t(PQ.x0, 300, 'An increase in demand — a new curve, because quantity changed at every price', { size: 10, fill: AXIS }),
  close].join('');

const demandDiagram = {
  id: id('diagram', 'demand curve movements and shifts'),
  title: 'The Demand Curve: Movements and Shifts',
  description: 'The market demand curve for Tafari Coaches, drawn from Q = 1200 − 40P. The first view shows a movement along the curve caused by the fare itself; the second shows the whole curve shifting because something other than the fare changed.',
  checklist: [
    'Price on the vertical axis, quantity demanded on the horizontal, both labelled with units',
    'The demand curve slopes downward from left to right',
    'A movement: one curve, the old and the new point marked on it',
    'A shift: two curves labelled D1 and D2, with the direction arrowed',
    'The new quantity read off at the unchanged price, to show what the shift did',
  ],
  scenarios: [
    { label: 'Movement along (the fare changed)', svg: movementSvg() },
    { label: 'Shift of the curve (something else changed)', svg: shiftSvg() },
  ],
};

/* ── 3 · The five PED values, and PED along one line (block 3) ─────────────── */
const PANEL = { y0: 232, top: 76, w: 108 };
const panel = (x, draw, title, sub) => [
  line(x, PANEL.y0, x + PANEL.w, PANEL.y0, AXIS, 2),
  line(x, PANEL.y0, x, PANEL.top - 8, AXIS, 2),
  draw(x),
  t(x + PANEL.w / 2, PANEL.y0 + 20, title, { size: 11, anchor: 'middle', weight: 600 }),
  t(x + PANEL.w / 2, PANEL.y0 + 36, sub, { size: 10, fill: MUTED, anchor: 'middle' }),
].join('');

const middleValuesSvg = () => [
  open(300),
  t(30, 46, 'Compare the SIZE of PED with 1. The steeper the curve, the less quantity responds.', { size: 11, fill: MUTED }),
  panel(46, (x) => line(x + 34, PANEL.top, x + 62, PANEL.y0, RED, 3), 'Price inelastic', 'size below 1'),
  panel(194, (x) => line(x + 14, PANEL.top, x + 90, PANEL.y0, AMBER, 3), 'Unitary elastic', 'size exactly 1'),
  panel(342, (x) => line(x + 4, PANEL.top + 44, x + 104, PANEL.y0 - 14, GREEN, 3), 'Price elastic', 'size above 1'),
  close].join('');

const extremesSvg = () => [
  open(300),
  t(30, 46, 'The two limits of the scale, and the only two straight lines with one PED all the way.', { size: 11, fill: MUTED }),
  panel(90, (x) => line(x + 54, PANEL.top, x + 54, PANEL.y0, PURPLE, 3), 'Perfectly inelastic', 'PED = 0, vertical'),
  panel(300, (x) => line(x, PANEL.top + 70, x + PANEL.w, PANEL.top + 70, BLUE, 3), 'Perfectly elastic', 'PED infinite, horizontal'),
  close].join('');

const alongTheLineSvg = () => [
  open(330), frame(), demandLine(),
  dot(DX(MID_Q), DY(MID_P), AMBER, 6),
  line(PQ.x0, DY(MID_P), DX(MID_Q), DY(MID_P), AMBER, 1.5, dash),
  line(DX(MID_Q), DY(MID_P), DX(MID_Q), PQ.y0, AMBER, 1.5, dash),
  t(PQ.x0 - 6, DY(MID_P) + 4, money(MID_P), { size: 10, fill: AMBER, anchor: 'end', weight: 600 }),
  t(DX(MID_Q), PQ.y0 + 14, `${MID_Q}`, { size: 10, fill: AMBER, anchor: 'middle', weight: 600 }),
  t(DX(MID_Q) + 10, DY(MID_P) + 4, 'PED = 1 at the midpoint', { size: 11, fill: AMBER, weight: 600 }),
  t(DX(200), DY(26), 'Price ELASTIC above it', { size: 11, fill: GREEN, weight: 600 }),
  t(DX(760), DY(6), 'Price INELASTIC below it', { size: 11, fill: RED, weight: 600 }),
  t(PQ.x0, 306, `The same straight line: PED is unbounded as the fare nears ${money(CHOKE_P)} and nears zero as the fare nears zero`, { size: 10, fill: AXIS }),
  close].join('');

const pedDiagram = {
  id: id('diagram', 'ped values and along a straight line'),
  title: 'The Five PED Values, and PED Along One Line',
  description: 'The five values of price elasticity of demand named in the specification, and how PED varies along a single straight-line demand curve: elastic above the midpoint, unitary at it, inelastic below.',
  checklist: [
    'Both axes labelled, with price on the vertical axis',
    'A steeper curve means demand is less responsive to price',
    'The two extremes drawn correctly: vertical is PED = 0, horizontal is PED infinite',
    'The midpoint of the straight line marked, and PED = 1 named there',
    'The elastic range labelled above the midpoint and the inelastic range below it',
  ],
  scenarios: [
    { label: 'The three middle values', svg: middleValuesSvg() },
    { label: 'The two extremes', svg: extremesSvg() },
    { label: 'PED along one straight line', svg: alongTheLineSvg() },
  ],
};

/* ── 4 · Total revenue along the demand curve (block 4) ────────────────────── */
export const TRF = { x0: 78, x1: 448, y0: 262, yTop: 54, pMax: 30, trMax: 10000 };
export const TX = (p) => r2(TRF.x0 + (p / TRF.pMax) * (TRF.x1 - TRF.x0));
export const TY = (tr) => r2(TRF.y0 - (tr / TRF.trMax) * (TRF.y0 - TRF.yTop));
/** The revenue curve, sampled from P × Q at 61 fares rather than drawn as a guess at a parabola. */
export const trPath = () => Array.from({ length: 61 }, (_, i) => i * 0.5).map((p) => `${TX(p)},${TY(trAt(p))}`).join(' ');

const revenueCurveSvg = () => [
  open(330),
  line(TRF.x0, TRF.y0, TRF.x1 + 12, TRF.y0, AXIS, 2, ' marker-end="url(#arr)"'),
  line(TRF.x0, TRF.y0, TRF.x0, TRF.yTop - 12, AXIS, 2, ' marker-end="url(#arr)"'),
  t((TRF.x0 + TRF.x1) / 2, TRF.y0 + 26, 'Fare ($)', { size: 10, fill: AXIS, anchor: 'middle' }),
  t(TRF.x0 - 22, (TRF.y0 + TRF.yTop) / 2, 'Total revenue a day ($)', { size: 10, fill: AXIS, anchor: 'middle', rotate: -90 }),
  `<polyline points="${trPath()}" fill="none" stroke="${BLUE}" stroke-width="3"/>`,
  dot(TX(MID_P), TY(MAX_TR), AMBER, 6),
  line(TRF.x0, TY(MAX_TR), TX(MID_P), TY(MAX_TR), AMBER, 1.5, dash),
  line(TX(MID_P), TY(MAX_TR), TX(MID_P), TRF.y0, AMBER, 1.5, dash),
  t(TRF.x0 - 6, TY(MAX_TR) + 4, money(MAX_TR), { size: 10, fill: AMBER, anchor: 'end', weight: 600 }),
  t(TX(MID_P), TRF.y0 + 14, money(MID_P), { size: 10, fill: AMBER, anchor: 'middle', weight: 600 }),
  t(TX(MID_P) + 10, TY(MAX_TR) - 8, 'Revenue peaks where PED = 1', { size: 11, fill: AMBER, weight: 600 }),
  dot(TX(10), TY(trAt(10)), GREEN), t(TX(10) - 4, TY(trAt(10)) - 10, `${money(10)}: ${money(trAt(10))}`, { size: 10, fill: GREEN, anchor: 'middle' }),
  dot(TX(22), TY(trAt(22)), RED), t(TX(22) + 4, TY(trAt(22)) - 10, `${money(22)}: ${money(trAt(22))}`, { size: 10, fill: RED, anchor: 'middle' }),
  t(TRF.x0, 300, 'Inelastic below the peak: raise the fare. Elastic above it: cut the fare.', { size: 10, fill: AXIS }),
  close].join('');

const revenueRectSvg = () => [
  open(330), frame(), demandLine(),
  rect(PQ.x0, DY(12), r2(DX(qAt(12)) - PQ.x0), r2(PQ.y0 - DY(12)), 'rgba(59,130,246,0.22)'),
  dot(DX(qAt(12)), DY(12), BLUE),
  t(PQ.x0 - 6, DY(12) + 4, money(12), { size: 10, fill: BLUE, anchor: 'end', weight: 600 }),
  t(DX(qAt(12)), PQ.y0 + 14, `${qAt(12)}`, { size: 10, fill: BLUE, anchor: 'middle', weight: 600 }),
  t(r2((PQ.x0 + DX(qAt(12))) / 2), r2((DY(12) + PQ.y0) / 2), `${money(12)} × ${qAt(12)} = ${money(trAt(12))}`, { size: 12, anchor: 'middle', weight: 600 }),
  t(288, 96, 'Total revenue is the rectangle', { size: 11, fill: BLUE, weight: 600 }),
  t(288, 112, 'under the chosen point:', { size: 10, fill: MUTED }),
  t(288, 126, 'price up the side,', { size: 10, fill: MUTED }),
  t(288, 140, 'quantity along the bottom.', { size: 10, fill: MUTED }),
  t(PQ.x0, 300, 'Move to another point and the rectangle is redrawn taller and narrower, or shorter and wider', { size: 10, fill: AXIS }),
  close].join('');

const revenueDiagram = {
  id: id('diagram', 'total revenue and ped'),
  title: 'Total Revenue and PED',
  description: 'Total revenue for Tafari Coaches at every fare, computed as price times the quantity the demand curve gives. Revenue rises while demand is inelastic, peaks where PED is 1, and falls where demand is elastic.',
  checklist: [
    'Axes labelled: fare on the horizontal, total revenue on the vertical, with units',
    'The revenue curve rises, peaks and falls',
    'The peak marked, and named as the point where PED equals 1',
    'The revenue rectangle drawn under a point on the demand curve, price by quantity',
    'The conclusion stated: raise the price if inelastic, cut it if elastic',
  ],
  scenarios: [
    { label: 'Revenue at every fare', svg: revenueCurveSvg() },
    { label: 'Revenue as a rectangle', svg: revenueRectSvg() },
  ],
};

/* ── 5 · Interpreting YED and XED (block 5) ────────────────────────────────── */
export const NUM = { x0: 72, x1: 452, lo: -1, hi: 3 };
export const NX = (v) => r2(NUM.x0 + ((v - NUM.lo) / (NUM.hi - NUM.lo)) * (NUM.x1 - NUM.x0));

const numberLine = (y, marks, zones) => [
  ...zones.map(([from, to, colour]) => rect(NX(from), y - 7, r2(NX(to) - NX(from)), 14, colour)),
  line(NUM.x0, y, NUM.x1, y, AXIS, 2),
  ...[-1, 0, 1, 2, 3].map((v) => [line(NX(v), y - 6, NX(v), y + 6, AXIS, 2), t(NX(v), y + 22, `${v}`, { size: 10, fill: AXIS, anchor: 'middle' })].join('')),
  ...marks.map(({ v, label, colour, dy = -16 }) => [dot(NX(v), y, colour, 5), t(NX(v), y + dy, label, { size: 10, fill: colour, anchor: 'middle', weight: 600 })].join('')),
].join('');

const yedSvg = () => [
  open(300),
  t(30, 40, 'YED: read the sign first, then the size.', { size: 12, weight: 600 }),
  numberLine(110, [
    { v: yed(COACH_YQ), label: `Coach ${yed(COACH_YQ)}`, colour: RED, dy: -16 },
    { v: yed(RICE_YQ), label: `Rice +${yed(RICE_YQ)}`, colour: AMBER, dy: 30 },
    { v: yed(AIR_YQ), label: `Air +${yed(AIR_YQ)}`, colour: GREEN, dy: -16 },
  ], [[-1, 0, 'rgba(239,68,68,0.18)'], [0, 1, 'rgba(245,158,11,0.18)'], [1, 3, 'rgba(5,150,105,0.18)']]),
  t(NX(-0.5), 176, 'Inferior', { size: 11, fill: RED, anchor: 'middle', weight: 600 }),
  t(NX(0.5), 176, 'Necessity', { size: 11, fill: AMBER, anchor: 'middle', weight: 600 }),
  t(NX(2), 176, 'Luxury', { size: 11, fill: GREEN, anchor: 'middle', weight: 600 }),
  t(30, 212, 'Negative: demand falls as income rises. Between 0 and 1: income inelastic.', { size: 10, fill: MUTED }),
  t(30, 230, 'Above 1: income elastic, so demand grows faster than income does.', { size: 10, fill: MUTED }),
  t(30, 262, `A ${INCOME_RISE}% rise in real income moved these three goods in three different directions`, { size: 10, fill: AXIS }),
  close].join('');

const xedSvg = () => [
  open(300),
  t(30, 40, 'XED: the sign names the relationship, the size measures it.', { size: 12, weight: 600 }),
  numberLine(110, [
    { v: XED_COMPLEMENT(), label: `Hotel nights ${XED_COMPLEMENT()}`, colour: RED, dy: -16 },
    { v: 0, label: 'Rice 0.0', colour: MUTED, dy: 30 },
    { v: XED_SUBSTITUTE(), label: `Air travel +${XED_SUBSTITUTE()}`, colour: GREEN, dy: -16 },
    { v: 2.5, label: 'Near-identical +2.5', colour: BLUE, dy: 30 },
  ], [[-1, 0, 'rgba(239,68,68,0.18)'], [0, 3, 'rgba(5,150,105,0.18)']]),
  t(NX(-0.5), 176, 'Complements', { size: 11, fill: RED, anchor: 'middle', weight: 600 }),
  t(NX(1.5), 176, 'Substitutes', { size: 11, fill: GREEN, anchor: 'middle', weight: 600 }),
  t(30, 212, 'Near zero: unrelated goods, whatever they look like on a shelf.', { size: 10, fill: MUTED }),
  t(30, 230, 'The further from zero, the more strongly the two goods are linked.', { size: 10, fill: MUTED }),
  t(30, 262, 'All four values are measured against a change in the OTHER good’s price', { size: 10, fill: AXIS }),
  close].join('');

const elasticityDiagram = {
  id: id('diagram', 'yed and xed number lines'),
  title: 'Interpreting YED and XED Values',
  description: 'The income and cross elasticity scales with Tafari\'s own figures plotted on them: coach travel inferior, rice a necessity, air travel a luxury; hotel nights a complement, air travel a substitute, rice unrelated.',
  checklist: [
    'The scale runs through zero, and zero is marked',
    'The sign read before the size, for both elasticities',
    'YED: negative is inferior, 0 to 1 a necessity, above 1 a luxury',
    'XED: negative is complements, positive is substitutes, near zero unrelated',
    'Each plotted value labelled with the good it belongs to',
  ],
  scenarios: [
    { label: 'Income elasticity of demand', svg: yedSvg() },
    { label: 'Cross elasticity of demand', svg: xedSvg() },
  ],
};

export const DIAGRAMS = [utilityDiagram, demandDiagram, pedDiagram, revenueDiagram, elasticityDiagram];
