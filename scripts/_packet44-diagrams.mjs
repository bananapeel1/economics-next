/**
 * PACKET 44 — aggregate-supply diagrams. Five, one pinned to each block, drawn from `ECON`.
 *
 * The live section had three, and two blocks pinned titles no diagram carries: `diagram-01`,
 * `diagram-02`, `structure-03` and `topFix-03` are that `content[3].diagramRef` said "AD/AS Shifts"
 * and `content[4].diagramRef` said "Self-Correcting Mechanism", so those blocks rendered nothing.
 * Every block here pins its OWN diagram by id, derived by the runner from this array's order, so a
 * dangling pin is unrepresentable. The self-correcting mechanism is drawn — as the classical
 * adjustment, AD, SRAS and a vertical LRAS on one pair of axes — because it is 3a-2's explanation of
 * the classical shape; that is `topFix-03`'s diagram and `specGap-07`'s "short run and long run on
 * one diagram".
 *
 * ── THE FRAME IS 400 UNITS, WITH A 12-UNIT FLOOR ─────────────────────────────
 *
 * Packet 37's convention (V037 is a programme-wide ruling, not this packet's to fix): 15 for anything
 * a student must read, 12 for secondary text. The plot window, the tick row, the axis title and the
 * two caption rows are laid out so the collision guard's 1.2-of-a-face bound (packet 40) clears
 * between every pair of rows; the runner checks the emitted SVG rather than this comment.
 *
 * Every colour below is a key of `PALETTE` in `components/learn-mode/processSvg.js`; the runner
 * parses that file and asserts it.
 */
import { id, ECON, bn, mn, pct, idx, money, round1 } from './_packet44-util.mjs';

const E = ECON;

/* ── the frame, and the two type sizes ─────────────────────────────────────── */
export const FRAME = { w: 400, pad: 16 };
export const FACE = 15;
export const SMALL = 12;
export const MIN_FACE = SMALL;
/** The collision guard's bound, as a multiple of the larger face (packet 40's A/B'd number). */
export const COLLIDE_TOL = 1.2;
/** The vertical step between caption rows; must clear COLLIDE_TOL × FACE. */
export const LEAD = 18;

/* ── palette, all of it in processSvg's map ────────────────────────────────── */
const INK = '#e8ecf5';
const INK2 = '#e2e8f0';
const MUTED = '#7a8299';
const AXIS = '#94a3b8';
const GRID = '#475569';
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
const t = (x, y, str, { size = FACE, fill = INK, anchor = 'start', weight = 400 } = {}) =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" font-weight="${weight}">${str}</text>`;
const line = (x1, y1, x2, y2, { stroke = AXIS, sw = 1.5, dash = null, marker = null } = {}) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ''}${marker ? ` marker-end="url(#${marker})"` : ''}/>`;
const path = (d, { stroke = AXIS, sw = 2, fill = 'none', dash = null } = {}) =>
  `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
const arrowDefs = (colours) => `<defs>${colours.map(([name, c]) => `<marker id="${name}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${c}"/></marker>`).join('')}</defs>`;

/* ── one layout for every price-level / real-output diagram ────────────────── */
/*
 * Rows, top to bottom: title 18 · y-axis title 40 · plot 56-222 · x ticks 238 · x-axis title 256 ·
 * captions 278 and 296. Each adjacent pair is at least 16 units apart, which clears 1.2 × 12 = 14.4.
 */
const L = { h: 306, title: 18, yTitle: 40, x0: 54, xR: 336, y1: 56, y0: 222, tick: 238, xTitle: 256, cap1: 278, cap2: 296 };

/**
 * A plot window. Curves are `Y = intercept + slope · P` (real output as a function of the price
 * level), CLIPPED to the window, so a line that leaves the box is never labelled off the frame
 * (packet 25's decision).
 */
const plot = ({ Ymin, Ymax, Pmin, Pmax }) => {
  const sx = (y) => round1(L.x0 + ((y - Ymin) / (Ymax - Ymin)) * (L.xR - L.x0));
  const sy = (p) => round1(L.y0 - ((p - Pmin) / (Pmax - Pmin)) * (L.y0 - L.y1));
  const clip = (intercept, slope) => {
    const pAt = (y) => (y - intercept) / slope;
    const ends = [pAt(Ymin), pAt(Ymax)].sort((a, b) => a - b);
    const lo = Math.max(Pmin, ends[0]), hi = Math.min(Pmax, ends[1]);
    return [{ p: lo, y: intercept + slope * lo }, { p: hi, y: intercept + slope * hi }];
  };
  /** Draw a sloped curve and return where to label it: at the right edge, or above the top edge. */
  const curve = (intercept, slope, colour, name, { dash = null, labelEnd = 'high' } = {}) => {
    const [a, b] = clip(intercept, slope);
    const d = path(`M ${sx(a.y)} ${sy(a.p)} L ${sx(b.y)} ${sy(b.p)}`, { stroke: colour, sw: 2.5, dash });
    /* the end to label: for an upward-sloping curve the high-price end, for AD the right-hand end */
    const end = labelEnd === 'high' ? (a.p > b.p ? a : b) : (a.y > b.y ? a : b);
    const onRight = Math.abs(end.y - Ymax) < 1e-6;
    const label = onRight
      ? t(L.xR + 4, round1(sy(end.p) + 4), name, { size: SMALL, fill: colour, weight: 600 })
      : t(sx(end.y), L.y1 - 6, name, { anchor: 'middle', size: SMALL, fill: colour, weight: 600 });
    return d + label;
  };
  const vertical = (y, colour, name, { dash = null } = {}) =>
    line(sx(y), L.y1, sx(y), L.y0, { stroke: colour, sw: 2.5, dash })
    + t(sx(y), L.y1 - 6, name, { anchor: 'middle', size: SMALL, fill: colour, weight: 600 });
  /** A point with dashed guides to both axes; either tick can be suppressed when it repeats. */
  const mark = (y, p, colour, { yTick = true, pTick = true } = {}) => [
    line(L.x0, sy(p), sx(y), sy(p), { stroke: colour, sw: 1, dash: '3 3' }),
    line(sx(y), sy(p), sx(y), L.y0, { stroke: colour, sw: 1, dash: '3 3' }),
    `<circle cx="${sx(y)}" cy="${sy(p)}" r="4" fill="${colour}"/>`,
    pTick ? t(L.x0 - 6, round1(sy(p) + 4), idx(p), { anchor: 'end', size: SMALL, fill: colour }) : '',
    yTick ? t(sx(y), L.tick, String(y), { anchor: 'middle', size: SMALL, fill: colour }) : '',
  ].join('');
  const axes = (title) => [
    t(FRAME.w / 2, L.title, title, { anchor: 'middle', weight: 600, size: SMALL }),
    t(8, L.yTitle, 'Price level', { size: SMALL, fill: AXIS }),
    line(L.x0, L.y1 - 8, L.x0, L.y0, { stroke: AXIS }),
    line(L.x0, L.y0, L.xR + 6, L.y0, { stroke: AXIS }),
    t(392, L.xTitle, 'Real national output ($bn)', { anchor: 'end', size: SMALL, fill: AXIS }),
  ].join('');
  return { sx, sy, clip, curve, vertical, mark, axes };
};
const captions = (a, b, colour = MUTED) => t(16, L.cap1, a, { size: SMALL, fill: colour, weight: 600 }) + (b ? t(16, L.cap2, b, { size: SMALL, fill: MUTED }) : '');

/* ══ 1 · The Characteristics of AS (2.3.3 · 1b, 1c) ══════════════════════ */

const SR_WINDOW = { Ymin: 750, Ymax: 830, Pmin: 92, Pmax: 112 };

const srasMovementSvg = () => {
  const g = plot(SR_WINDOW);
  return svg(L.h, [
    arrowDefs([['mv-amber', AMBER]]),
    g.axes('A movement along the SRAS curve'),
    g.curve(E.srasIntercept, E.srasSlope, GREEN2, 'SRAS'),
    g.mark(E.capacity, E.P0, INK2),
    g.mark(E.Ymove, E.P1, AMBER),
    line(g.sx(E.capacity) + 6, g.sy(E.P0) - 4, g.sx(E.Ymove) - 6, g.sy(E.P1) + 4, { stroke: AMBER, sw: 2, marker: 'mv-amber' }),
    captions(`Price level ${idx(E.P0)} → ${idx(E.P1)}: output ${bn(E.capacity)} → ${bn(E.Ymove)}.`, 'Same curve: only the price level changed.', AMBER),
  ].join(''));
};

const srasShiftSvg = () => {
  const g = plot(SR_WINDOW);
  return svg(L.h, [
    arrowDefs([['sh-red', RED2]]),
    g.axes('A shift of the SRAS curve'),
    g.curve(E.srasIntercept, E.srasSlope, GREEN2, 'SRAS'),
    g.curve(E.srasIntercept - E.energyLeft, E.srasSlope, RED2, 'SRAS₁', { dash: '6 4' }),
    g.mark(E.capacity, E.P0, INK2),
    g.mark(E.Yenergy, E.P0, RED2, { pTick: false }),
    line(g.sx(E.capacity) - 6, g.sy(E.P0) + 14, g.sx(E.Yenergy) + 6, g.sy(E.P0) + 14, { stroke: RED2, sw: 2, marker: 'sh-red' }),
    captions(`Costs up ${pct(E.energyCost)}: at ${idx(E.P0)}, ${bn(E.Yenergy)} not ${bn(E.capacity)}.`, 'A new curve: firms supply less at every price level.', RED2),
  ].join(''));
};

const LR_WINDOW = { Ymin: 760, Ymax: 860, Pmin: 92, Pmax: 112 };

const lrasMovementSvg = () => {
  const g = plot(LR_WINDOW);
  return svg(L.h, [
    g.axes('A movement along a vertical LRAS'),
    g.vertical(E.capacity, BLUE2, 'LRAS'),
    g.mark(E.capacity, E.P0, INK2),
    g.mark(E.capacity, E.P1, AMBER, { yTick: false }),
    captions(`Price level ${idx(E.P0)} → ${idx(E.P1)}: output stays ${bn(E.capacity)}.`, 'Only a shift of LRAS changes long-run output.', AMBER),
  ].join(''));
};

export const characteristicsDiagram = {
  id: id('diagram', 'aggregate supply movement along and shift of the curve'),
  title: 'Movement Along and Shift of AS',
  description: 'IAL 2.3.3 · 1b and 1c: the upward-sloping SRAS curve, a movement along it when the price level changes, a shift when costs change, and a movement along a vertical LRAS that leaves output unchanged.',
  checklist: [
    'Price level on the vertical axis, real national output on the horizontal',
    `A movement along SRAS from ${bn(E.capacity)} at ${idx(E.P0)} to ${bn(E.Ymove)} at ${idx(E.P1)}`,
    `A shift to SRAS₁, drawn as a new labelled curve, supplying ${bn(E.Yenergy)} at ${idx(E.P0)}`,
    'On a vertical LRAS, a change in the price level with output unchanged',
  ],
  scenarios: [
    { label: 'Movement along SRAS', svg: srasMovementSvg() },
    { label: 'Shift of SRAS', svg: srasShiftSvg() },
    { label: 'Along a vertical LRAS', svg: lrasMovementSvg() },
  ],
};

/* ══ 2 · What Shifts Short-Run AS (2.3.3 · 2a) ═══════════════════════════ */

const srasShifterSvg = ({ title, shiftBn, colour, cap1, cap2, marker }) => {
  const g = plot(SR_WINDOW);
  const Ynew = E.srasAt(E.P0, shiftBn);
  const dir = shiftBn < 0 ? -1 : 1;
  return svg(L.h, [
    arrowDefs([[marker, colour]]),
    g.axes(title),
    g.curve(E.srasIntercept, E.srasSlope, GREEN2, 'SRAS'),
    g.curve(E.srasIntercept + shiftBn, E.srasSlope, colour, 'SRAS₁', { dash: '6 4' }),
    g.mark(E.capacity, E.P0, INK2),
    g.mark(Ynew, E.P0, colour, { pTick: false }),
    line(g.sx(E.capacity) + 6 * dir, g.sy(E.P0) + 14, g.sx(Ynew) - 6 * dir, g.sy(E.P0) + 14, { stroke: colour, sw: 2, marker }),
    captions(cap1, cap2, colour),
  ].join(''));
};

export const srasShiftersDiagram = {
  id: id('diagram', 'the three factors that shift short run aggregate supply'),
  title: 'What Shifts SRAS',
  description: 'IAL 2.3.3 · 2a: a change in the costs of raw materials and energy, in the exchange rate and in tax rates, each moving the SRAS curve through unit costs.',
  checklist: [
    'The original SRAS and the new SRAS₁ both drawn and labelled',
    'The direction of the shift shown with an arrow at an unchanged price level',
    `Energy ${pct(E.energyShare * 100)} of costs × ${pct(E.energyRise)} = unit costs up ${pct(E.energyCost)}`,
    `A depreciation shifting SRAS left, an appreciation shifting it right`,
  ],
  scenarios: [
    { label: 'Raw materials and energy', svg: srasShifterSvg({ title: `Energy up ${pct(E.energyRise)}`, shiftBn: -E.energyLeft, colour: RED2, marker: 'en-red', cap1: `${pct(E.energyShare * 100)} of costs × ${pct(E.energyRise)} = unit costs up ${pct(E.energyCost)}.`, cap2: `At ${idx(E.P0)}: ${bn(E.Yenergy)} instead of ${bn(E.capacity)}.` }) },
    { label: 'A depreciation', svg: srasShifterSvg({ title: 'The currency depreciates', shiftBn: -E.fxLeft, colour: AMBER, marker: 'fx-amber', cap1: `Imported inputs ${pct(E.importRise)} dearer: unit costs up ${pct(E.fxCost)}.`, cap2: `At ${idx(E.P0)}: ${bn(E.Yfx)} instead of ${bn(E.capacity)}.` }) },
    { label: 'An appreciation', svg: srasShifterSvg({ title: 'The currency appreciates', shiftBn: E.fxLeft, colour: GREEN, marker: 'ap-green', cap1: `Imported inputs cheaper: unit costs down ${pct(E.fxCost)}.`, cap2: `At ${idx(E.P0)}: ${bn(E.Yappreciate)} instead of ${bn(E.capacity)}.` }) },
    { label: 'A tax rise', svg: srasShifterSvg({ title: 'A tax on production rises', shiftBn: -E.taxLeft, colour: PURPLE, marker: 'tx-purple', cap1: `Tax adds ${pct(E.taxCost)} to the cost of each unit.`, cap2: `At ${idx(E.P0)}: ${bn(E.Ytax)} instead of ${bn(E.capacity)}.` }) },
  ],
};

/* ══ 3 · The Shapes of Long-Run AS (2.3.3 · 3a) ══════════════════════════ */

const CL_WINDOW = { Ymin: 720, Ymax: 840, Pmin: 76, Pmax: 110 };

const classicalSvg = ({ adjust }) => {
  const g = plot(CL_WINDOW);
  const parts = [
    g.axes(adjust ? `AD falls ${bn(E.adFall)}: short run, then long run` : 'The classical LRAS: vertical at capacity'),
    g.vertical(E.capacity, BLUE2, 'LRAS'),
    g.curve(E.srasIntercept, E.srasSlope, GREEN2, 'SRAS'),
    g.curve(E.adIntercept, -E.adSlope, CYAN, 'AD', { labelEnd: 'right' }),
    g.mark(E.capacity, E.P0, INK2),
  ];
  if (adjust) {
    parts.push(g.curve(E.adIntercept - E.adFall, -E.adSlope, AMBER, 'AD₁', { dash: '6 4', labelEnd: 'right' }));
    parts.push(g.curve(E.srasIntercept + E.srasRecovery, E.srasSlope, PURPLE, 'SRAS₁', { dash: '6 4' }));
    parts.push(g.mark(E.Ysr, E.Psr, AMBER));
    parts.push(g.mark(E.capacity, E.Plr, PURPLE, { yTick: false }));
    parts.push(captions(`Short run: ${bn(E.Ysr)} at ${idx(E.Psr)}. Wages fall; SRAS right.`, `Long run: back to ${bn(E.Ylr)}, price level ${idx(E.Plr)}.`, PURPLE));
  } else {
    parts.push(captions(`Capacity ${bn(E.capacity)}: ${mn(E.labour)} × ${money(E.perWorker)}.`, 'Flexible wages: output returns here.', BLUE2));
  }
  return svg(L.h, parts.join(''));
};

const keynesianSvg = () => {
  const g = plot({ Ymin: 560, Ymax: 840, Pmin: 84, Pmax: 120 });
  const flatEnd = g.sx(E.kFlatUntil), capX = g.sx(E.capacity);
  const d = `M ${g.sx(560)} ${g.sy(E.kFlatP)} L ${flatEnd} ${g.sy(E.kFlatP)} Q ${capX} ${g.sy(E.kFlatP)} ${capX} ${g.sy(110)} L ${capX} ${g.sy(120)}`;
  return svg(L.h, [
    g.axes('The Keynesian LRAS: three ranges'),
    path(d, { stroke: BLUE2, sw: 2.5 }),
    t(capX, L.y1 - 6, 'LRAS', { anchor: 'middle', size: SMALL, fill: BLUE2, weight: 600 }),
    t(g.sx(600), round1(g.sy(E.kFlatP) - 10), 'flat', { anchor: 'middle', size: SMALL, fill: GREEN2 }),
    t(g.sx(730), round1(g.sy(100) - 6), 'rising', { anchor: 'end', size: SMALL, fill: AMBER }),
    t(capX - 8, g.sy(116), 'vertical', { anchor: 'end', size: SMALL, fill: RED2 }),
    t(L.x0 - 6, round1(g.sy(E.kFlatP) + 4), idx(E.kFlatP), { anchor: 'end', size: SMALL, fill: GREEN2 }),
    t(flatEnd, L.tick, String(E.kFlatUntil), { anchor: 'middle', size: SMALL, fill: GREEN2 }),
    t(capX, L.tick, String(E.capacity), { anchor: 'middle', size: SMALL, fill: RED2 }),
    captions(`Flat below ${bn(E.kFlatUntil)}: idle resources.`, `Vertical at ${bn(E.capacity)}: every resource in use.`, BLUE2),
  ].join(''));
};

export const lrasShapesDiagram = {
  id: id('diagram', 'classical and keynesian long run aggregate supply'),
  title: 'Classical and Keynesian LRAS',
  description: 'IAL 2.3.3 · 3a: the classical LRAS, vertical at capacity, with the adjustment that returns output there after AD falls — AD, SRAS and LRAS on one diagram — and the Keynesian LRAS with its three ranges.',
  checklist: [
    `A vertical classical LRAS at capacity, ${bn(E.capacity)}`,
    `After AD falls: the short-run point ${bn(E.Ysr)} at ${idx(E.Psr)}, then SRAS₁ and the long-run point at ${idx(E.Plr)}`,
    'The Keynesian curve with three named ranges: flat, rising, vertical',
    'Both curves vertical at the same capacity',
  ],
  scenarios: [
    { label: 'Classical: vertical', svg: classicalSvg({ adjust: false }) },
    { label: 'Classical adjustment', svg: classicalSvg({ adjust: true }) },
    { label: 'Keynesian: three ranges', svg: keynesianSvg() },
  ],
};

/* ══ 4 and 5 · What Shifts Long-Run AS (2.3.3 · 3b) ══════════════════════ */

const lrasShiftSvg = ({ title, Ynew, colour, marker, cap1, cap2 }) => {
  const g = plot({ Ymin: 760, Ymax: 860, Pmin: 92, Pmax: 112 });
  const y = g.sy(102);
  const dir = Ynew < E.capacity ? -1 : 1;
  return svg(L.h, [
    arrowDefs([[marker, colour]]),
    g.axes(title),
    g.vertical(E.capacity, BLUE2, 'LRAS'),
    g.vertical(Ynew, colour, 'LRAS₁', { dash: '6 4' }),
    line(g.sx(E.capacity) + 4 * dir, y, g.sx(Ynew) - 4 * dir, y, { stroke: colour, sw: 2, marker }),
    t(g.sx(E.capacity), L.tick, String(E.capacity), { anchor: 'middle', size: SMALL, fill: BLUE2 }),
    t(g.sx(Ynew), L.tick, String(Ynew), { anchor: 'middle', size: SMALL, fill: colour }),
    captions(cap1, cap2, colour),
  ].join(''));
};

export const outputPerWorkerDiagram = {
  id: id('diagram', 'lras shifts through output per worker'),
  title: 'LRAS Shifts: Output per Worker',
  description: 'IAL 2.3.3 · 3b: technology, productivity and education and skills each raise output per worker, so capacity rises and the LRAS curve shifts right.',
  checklist: [
    'The original LRAS and the new LRAS₁ both vertical and labelled',
    `Capacity = labour force × output per worker: ${mn(E.labour)} × ${money(E.perWorker)} = ${bn(E.capacity)}`,
    `Technology: ${bn(E.capTech)}; more machinery per worker: ${bn(E.capProd)}; training: ${bn(E.capSkills)}`,
  ],
  scenarios: [
    { label: 'Technology', svg: lrasShiftSvg({ title: `Better technology: output per worker +${pct(E.techRise)}`, Ynew: E.capTech, colour: GREEN2, marker: 'te-green', cap1: `${mn(E.labour)} × ${money(E.perWorkerTech)} = ${bn(E.capTech)}.`, cap2: 'Same workers, a better method.' }) },
    { label: 'Productivity', svg: lrasShiftSvg({ title: `More machinery: output per worker +${pct(E.prodRise)}`, Ynew: E.capProd, colour: AMBER, marker: 'pr-amber', cap1: `${mn(E.labour)} × ${money(E.perWorkerProd)} = ${bn(E.capProd)}.`, cap2: 'No extra workers, more from each.' }) },
    { label: 'Education and skills', svg: lrasShiftSvg({ title: `Training ${mn(E.trained)} workers`, Ynew: E.capSkills, colour: PURPLE, marker: 'sk-purple', cap1: `Each ${pct(E.skillRise)} more productive: +${bn(E.capSkills - E.capacity)}.`, cap2: 'Arrives only once the trained are at work.' }) },
  ],
};

export const labourForceDiagram = {
  id: id('diagram', 'lras shifts through the labour force'),
  title: 'LRAS Shifts: The Labour Force',
  description: 'IAL 2.3.3 · 3b: an ageing population, a rise in participation and a net inflow of migrants each change the number of workers, so capacity and the LRAS curve move.',
  checklist: [
    `Labour force = working-age population × participation: ${mn(E.workingAge)} × ${pct(E.participation * 100)} = ${mn(E.labour)}`,
    `Ageing: LRAS shifts left to ${bn(E.capAgeing)}`,
    `Higher participation: ${bn(E.capParticipation)}; a net inflow of migrants: ${bn(E.capMigration)}`,
  ],
  scenarios: [
    { label: 'Demography: ageing', svg: lrasShiftSvg({ title: `Ageing: ${mn(E.ageingLoss)} fewer of working age`, Ynew: E.capAgeing, colour: RED2, marker: 'ag-red', cap1: `Labour force ${mn(E.labourAgeing)}: capacity ${bn(E.capAgeing)}.`, cap2: 'Fewer people of working age.' }) },
    { label: 'Participation', svg: lrasShiftSvg({ title: `Participation ${pct(E.participation * 100)} → ${pct(E.participation2 * 100)}`, Ynew: E.capParticipation, colour: AMBER, marker: 'pa-amber', cap1: `Labour force ${mn(E.labourParticipation)}: capacity ${bn(E.capParticipation)}.`, cap2: 'The same population, more of it at work.' }) },
    { label: 'Net migration', svg: lrasShiftSvg({ title: `Net inflow of ${mn(E.netMigrants)} workers`, Ynew: E.capMigration, colour: GREEN2, marker: 'nm-green', cap1: `Labour force ${mn(E.labour + E.netMigrants)}: capacity ${bn(E.capMigration)}.`, cap2: 'Immigration minus emigration, all at work.' }) },
  ],
};

/** One diagram pinned to each block, in block order. The runner derives `diagramId` from this. */
export const DIAGRAMS = [
  characteristicsDiagram,
  srasShiftersDiagram,
  lrasShapesDiagram,
  outputPerWorkerDiagram,
  labourForceDiagram,
];
export const EXTRA_DIAGRAMS = [];
export const ALL_DIAGRAMS = [...DIAGRAMS, ...EXTRA_DIAGRAMS];
