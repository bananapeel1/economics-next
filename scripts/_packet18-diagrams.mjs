/**
 * PACKET 18 — the-market: five diagrams, each pinned to a chapter by `diagramId`.
 *
 * The March section had NONE. Blocks 0, 1 and 2 carried `diagramRef` strings — "demand-curve",
 * "supply-curve", "equilibrium-diagram" — and no diagram of any name existed, so all three rendered
 * nothing (structure-01, diagram-01 to diagram-03, and three live `pins.diagram` BLOCKs). That is a
 * section whose specification asks in as many words for "the drawing and interpretation of demand and
 * supply diagrams" (3b) and which showed a student no diagram at all.
 *
 * `diagramRef` is the legacy string pin. Since packet 5 a diagram reaches a student only from a
 * block's `diagramId`, at that chapter's check-in (lib/learn-steps.js:44-55), so every one of these is
 * pinned by id and every chapter has one.
 *
 * Conventions from the live census: a 500-unit-wide viewBox, labels at 9-13 units (the phone sheet
 * draws at 220vw, so 9 units is 15px at 390px), palette colours that components/learn-mode/processSvg.js
 * remaps onto theme tokens, strokes >= 2, and text placed from the geometry of the line it names.
 *
 * EVERY QUANTITY HERE IS GENERATED, NOT DRAWN (packet 15's accuracy-01 rule). Both lines are sampled
 * from Qd = 900 − 30P and Qs = 100 + 20P, the shifted lines from the same functions with one constant
 * moved, and the tables from the schedule itself. The runner re-derives every coordinate and every
 * printed figure from the emitted SVG and refuses to stage on a disagreement.
 *
 * NO DIAGRAM USES THE WORD "EQUILIBRIUM", because the Business specification does not (0 occurrences
 * in bus_spec.txt). The point where the lines cross is labelled with its price and quantity, which is
 * what 3b asks a student to read off.
 */
import { id, money, qdAt, qsAt, trAt, ped, pctQ, pctP, MEET_P, MEET_Q, PEAK_P, PEAK_Q, MAX_TR, PRICES, PED_INELASTIC, PED_ELASTIC, PED_UNIT, INCOME_RISE, PRESSE_Q, WATER_Q, MIX_Q, pctOf, sig, minus, pedS, pc, YED_PRESSE, YED_WATER, YED_MIX } from './_packet18-util.mjs';

const INK = '#e8ecf5', AXIS = '#94a3b8', GRID = '#475569', MUTED = '#7a8299';
const BLUE = '#3b82f6', GREEN = '#059669', RED = '#ef4444', AMBER = '#f59e0b', PURPLE = '#8b5cf6';

const open = (h = 330) => `<svg width="500" height="${h}" viewBox="0 0 500 ${h}" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',system-ui,sans-serif;background:transparent"><defs><marker id="arr" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="${AXIS}"/></marker><marker id="arrAmber" markerWidth="9" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="${AMBER}"/></marker></defs>`;
const close = '</svg>';
const t = (x, y, text, { size = 10, fill = INK, anchor = 'start', weight = 400, rotate = null } = {}) =>
  `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}"${rotate ? ` transform="rotate(${rotate},${x},${y})"` : ''}>${text}</text>`;
const line = (x1, y1, x2, y2, stroke, w = 2, extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${w}"${extra}/>`;
const dot = (x, y, fill, r = 5) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;
const dash = ' stroke-dasharray="6,4"';
export const r2 = (n) => Math.round(n * 100) / 100;

/* ── the shared price/quantity frame ───────────────────────────────────────── */
/*
 * One scale for every diagram in this section, so the same price is at the same height in all of
 * them and a student can put two chapters side by side. qMax is 1050 because the shifted demand line
 * reaches 1050 cases at a price of zero and a clipped line would misrepresent it.
 */
export const PQ = { x0: 78, x1: 448, y0: 262, yTop: 54, qMax: 1050, pMax: 30 };
export const DX = (q) => r2(PQ.x0 + (q / PQ.qMax) * (PQ.x1 - PQ.x0));
export const DY = (p) => r2(PQ.y0 - (p / PQ.pMax) * (PQ.y0 - PQ.yTop));

/** The shifted lines, each one constant away from the originals. */
export const D_SHIFT = 150;     // an increase in demand: +150 cases at every price
export const S_SHIFT = -100;    // a decrease in supply: −100 cases at every price
export const qd2At = (p) => qdAt(p) + D_SHIFT;
export const qs2At = (p) => qsAt(p) + S_SHIFT;
/** Where each shifted line meets the unchanged one. Solved, not asserted. */
const meetOf = (f, g) => { for (let p = 0; p <= PQ.pMax * 2; p += 0.25) if (Math.abs(f(p) - g(p)) < 1e-9) return [p, r2(f(p))]; return null; };
export const MEET_D2 = meetOf(qd2At, qsAt);    // [19, 480]
export const MEET_S2 = meetOf(qdAt, qs2At);    // [18, 360]

const frame = (xLabel = 'Quantity (cases a week)', yLabel = 'Price ($ a case)') => [
  line(PQ.x0, PQ.y0, PQ.x1 + 12, PQ.y0, AXIS, 2, ' marker-end="url(#arr)"'),
  line(PQ.x0, PQ.y0, PQ.x0, PQ.yTop - 12, AXIS, 2, ' marker-end="url(#arr)"'),
  t((PQ.x0 + PQ.x1) / 2, PQ.y0 + 26, xLabel, { size: 10, fill: AXIS, anchor: 'middle' }),
  t(PQ.x0 - 24, (PQ.y0 + PQ.yTop) / 2, yLabel, { size: 10, fill: AXIS, anchor: 'middle', rotate: -90 }),
].join('');

/** A line through the price range, sampled from a quantity function rather than drawn by eye. */
const curve = (qFn, colour, { from = 0, to = PQ.pMax } = {}) => {
  const pts = [];
  for (let p = from; p <= to + 1e-9; p += 0.5) {
    const q = qFn(p);
    if (q < 0 || q > PQ.qMax) continue;
    pts.push(`${DX(q)},${DY(p)}`);
  }
  return `<polyline points="${pts.join(' ')}" fill="none" stroke="${colour}" stroke-width="2.5" stroke-linecap="round"/>`;
};

/** Dashed guides from a point to both axes, with the two values labelled on them. */
const readOff = (p, q, colour) => [
  line(PQ.x0, DY(p), DX(q), DY(p), colour, 1.5, dash),
  line(DX(q), DY(p), DX(q), PQ.y0, colour, 1.5, dash),
  dot(DX(q), DY(p), colour),
  t(PQ.x0 - 6, DY(p) + 3.5, money(p), { size: 10, fill: colour, anchor: 'end', weight: 600 }),
  t(DX(q), PQ.y0 + 13, String(q), { size: 10, fill: colour, anchor: 'middle', weight: 600 }),
].join('');

/* ── 1 · Demand (block 1) ──────────────────────────────────────────────────── */

const demandCurveSvg = () => [
  open(),
  frame(),
  curve(qdAt, BLUE),
  t(DX(qdAt(4)) + 8, DY(4), 'D', { size: 13, fill: BLUE, weight: 700 }),
  readOff(20, qdAt(20), AMBER),
  readOff(10, qdAt(10), GREEN),
  t(PQ.x0 + 8, PQ.yTop - 2, 'One schedule, two rows of it', { size: 10, fill: MUTED }),
  t(PQ.x0 + 8, PQ.yTop + 12, `The price fell from ${money(20)} to ${money(10)} and the quantity demanded rose`, { size: 9, fill: MUTED }),
  t(PQ.x0 + 8, PQ.yTop + 24, `from ${qdAt(20)} to ${qdAt(10)} cases. Demand itself did not change.`, { size: 9, fill: MUTED }),
  close,
].join('');

const demandShiftSvg = () => [
  open(),
  frame(),
  curve(qdAt, BLUE),
  curve(qd2At, PURPLE),
  t(DX(qdAt(4)) + 8, DY(4), 'D₁', { size: 13, fill: BLUE, weight: 700 }),
  t(DX(qd2At(4)) + 8, DY(4), 'D₂', { size: 13, fill: PURPLE, weight: 700 }),
  line(DX(qdAt(16)) + 6, DY(16), DX(qd2At(16)) - 6, DY(16), AMBER, 2, ' marker-end="url(#arrAmber)"'),
  readOff(16, qdAt(16), BLUE),
  dot(DX(qd2At(16)), DY(16), PURPLE),
  t(DX(qd2At(16)) + 6, DY(16) + 3.5, String(qd2At(16)), { size: 10, fill: PURPLE, weight: 600 }),
  t(PQ.x0 + 8, PQ.yTop - 2, 'A change in demand', { size: 10, fill: MUTED }),
  t(PQ.x0 + 8, PQ.yTop + 12, `Incomes rose, so buyers want ${D_SHIFT} more cases at EVERY price —`, { size: 9, fill: MUTED }),
  t(PQ.x0 + 8, PQ.yTop + 24, `at ${money(16)}, ${qdAt(16)} becomes ${qd2At(16)}. The whole curve moved.`, { size: 9, fill: MUTED }),
  close,
].join('');

const demandDiagram = {
  id: id('diagram', 'demand curve and a change in demand'),
  title: 'The Demand Curve, and What Moves It',
  description: `Maji's market demand, drawn from Qd = 900 − 30P. The first view shows the good's own price moving the quantity demanded between two rows of one schedule; the second shows one of the seven factors moving the whole curve, so that ${D_SHIFT} more cases are wanted at every price.`,
  checklist: [
    'Price on the vertical axis, quantity on the horizontal, both labelled with units',
    'The demand curve slopes downward from left to right',
    'A price change: one curve, with the old and the new point marked on it',
    'A change in demand: two curves labelled D₁ and D₂, with the direction arrowed',
    'The new quantity read off at the unchanged price, which is what makes it a shift',
  ],
  scenarios: [
    { label: 'The price changed', svg: demandCurveSvg() },
    { label: 'Demand changed', svg: demandShiftSvg() },
  ],
};

/* ── 2 · Supply (block 2) ──────────────────────────────────────────────────── */

const supplyCurveSvg = () => [
  open(),
  frame(),
  curve(qsAt, GREEN),
  t(DX(qsAt(27)) + 8, DY(27), 'S', { size: 13, fill: GREEN, weight: 700 }),
  readOff(10, qsAt(10), AMBER),
  readOff(20, qsAt(20), BLUE),
  t(PQ.x0 + 8, PQ.yTop - 2, 'Supply slopes upward', { size: 10, fill: MUTED }),
  t(PQ.x0 + 8, PQ.yTop + 12, `At ${money(10)} producers offer ${qsAt(10)} cases; at ${money(20)}, ${qsAt(20)}.`, { size: 9, fill: MUTED }),
  t(PQ.x0 + 8, PQ.yTop + 24, 'A higher price covers the cost of making more.', { size: 9, fill: MUTED }),
  close,
].join('');

const supplyShiftSvg = () => [
  open(),
  frame(),
  curve(qsAt, GREEN),
  curve(qs2At, RED),
  t(DX(qsAt(27)) + 8, DY(27), 'S₁', { size: 13, fill: GREEN, weight: 700 }),
  t(DX(qs2At(27)) - 20, DY(27), 'S₂', { size: 13, fill: RED, weight: 700 }),
  line(DX(qsAt(16)) - 6, DY(16), DX(qs2At(16)) + 6, DY(16), AMBER, 2, ' marker-end="url(#arrAmber)"'),
  readOff(16, qsAt(16), GREEN),
  dot(DX(qs2At(16)), DY(16), RED),
  t(DX(qs2At(16)) - 6, DY(16) + 3.5, String(qs2At(16)), { size: 10, fill: RED, anchor: 'end', weight: 600 }),
  t(PQ.x0 + 8, PQ.yTop - 2, 'A change in supply', { size: 10, fill: MUTED }),
  t(PQ.x0 + 8, PQ.yTop + 12, `A raw material became dearer, so ${Math.abs(S_SHIFT)} fewer cases are worth`, { size: 9, fill: MUTED }),
  t(PQ.x0 + 8, PQ.yTop + 24, `supplying at EVERY price — at ${money(16)}, ${qsAt(16)} becomes ${qs2At(16)}.`, { size: 9, fill: MUTED }),
  close,
].join('');

const supplyDiagram = {
  id: id('diagram', 'supply curve and a change in supply'),
  title: 'The Supply Curve, and What Moves It',
  description: `Maji's supply, drawn from Qs = 100 + 20P. The first view shows why the curve slopes upward; the second shows one of the five supply factors moving the whole curve, so that ${Math.abs(S_SHIFT)} fewer cases are offered at every price.`,
  checklist: [
    'Price on the vertical axis, quantity on the horizontal, both labelled with units',
    'The supply curve slopes upward from left to right',
    'A change in supply: two curves labelled S₁ and S₂, with the direction arrowed',
    'A leftward shift means less is offered at every price, including the current one',
    'The new quantity read off at the unchanged price',
  ],
  scenarios: [
    { label: 'Why supply slopes up', svg: supplyCurveSvg() },
    { label: 'Supply changed', svg: supplyShiftSvg() },
  ],
};

/* ── 3 · Demand and supply together (block 3) — this is 3b ─────────────────── */

const bothSvg = () => [
  open(),
  frame(),
  curve(qdAt, BLUE),
  curve(qsAt, GREEN),
  t(DX(qdAt(4)) + 8, DY(4), 'D', { size: 13, fill: BLUE, weight: 700 }),
  t(DX(qsAt(27)) + 8, DY(27), 'S', { size: 13, fill: GREEN, weight: 700 }),
  readOff(MEET_P, MEET_Q, AMBER),
  t(PQ.x0 + 8, PQ.yTop - 2, 'Where the two schedules give the same quantity', { size: 10, fill: MUTED }),
  t(PQ.x0 + 8, PQ.yTop + 12, `At ${money(12)} buyers want ${qdAt(12)} and producers offer ${qsAt(12)}.`, { size: 9, fill: MUTED }),
  t(PQ.x0 + 8, PQ.yTop + 24, `At ${money(20)} producers offer ${qsAt(20)} and buyers want ${qdAt(20)}.`, { size: 9, fill: MUTED }),
  t(PQ.x0 + 8, PQ.yTop + 36, `Only at ${money(MEET_P)} are the two the same: ${MEET_Q} cases.`, { size: 9, fill: AMBER, weight: 600 }),
  close,
].join('');

const demandRiseSvg = () => [
  open(),
  frame(),
  curve(qdAt, BLUE),
  curve(qd2At, PURPLE),
  curve(qsAt, GREEN),
  t(DX(qdAt(4)) + 8, DY(4), 'D₁', { size: 13, fill: BLUE, weight: 700 }),
  t(DX(qd2At(4)) + 8, DY(4), 'D₂', { size: 13, fill: PURPLE, weight: 700 }),
  t(DX(qsAt(27)) + 8, DY(27), 'S', { size: 13, fill: GREEN, weight: 700 }),
  readOff(MEET_P, MEET_Q, MUTED),
  readOff(MEET_D2[0], MEET_D2[1], AMBER),
  t(PQ.x0 + 8, PQ.yTop - 2, 'An increase in demand', { size: 10, fill: MUTED }),
  t(PQ.x0 + 8, PQ.yTop + 12, `Demand moved right; supply did not move at all.`, { size: 9, fill: MUTED }),
  t(PQ.x0 + 8, PQ.yTop + 24, `Price ${money(MEET_P)} → ${money(MEET_D2[0])} and quantity ${MEET_Q} → ${MEET_D2[1]}:`, { size: 9, fill: MUTED }),
  t(PQ.x0 + 8, PQ.yTop + 36, 'both rise, which is how you know demand was the cause.', { size: 9, fill: AMBER, weight: 600 }),
  close,
].join('');

const supplyFallSvg = () => [
  open(),
  frame(),
  curve(qdAt, BLUE),
  curve(qsAt, GREEN),
  curve(qs2At, RED),
  t(DX(qdAt(4)) + 8, DY(4), 'D', { size: 13, fill: BLUE, weight: 700 }),
  t(DX(qsAt(27)) + 8, DY(27), 'S₁', { size: 13, fill: GREEN, weight: 700 }),
  t(DX(qs2At(27)) - 20, DY(27), 'S₂', { size: 13, fill: RED, weight: 700 }),
  readOff(MEET_P, MEET_Q, MUTED),
  readOff(MEET_S2[0], MEET_S2[1], AMBER),
  t(PQ.x0 + 8, PQ.yTop - 2, 'A decrease in supply', { size: 10, fill: MUTED }),
  t(PQ.x0 + 8, PQ.yTop + 12, 'Supply moved left; demand did not move at all.', { size: 9, fill: MUTED }),
  t(PQ.x0 + 8, PQ.yTop + 24, `Price ${money(MEET_P)} → ${money(MEET_S2[0])} and quantity ${MEET_Q} → ${MEET_S2[1]}:`, { size: 9, fill: MUTED }),
  t(PQ.x0 + 8, PQ.yTop + 36, 'opposite directions, which names supply as the cause.', { size: 9, fill: AMBER, weight: 600 }),
  close,
].join('');

const marketDiagram = {
  id: id('diagram', 'demand and supply together and changes in them'),
  title: 'Demand and Supply Together',
  description: `The drawing and interpretation of demand and supply diagrams to show the causes and consequences of changes in demand and supply. Both of Maji's schedules on one pair of axes, meeting at ${money(MEET_P)} and ${MEET_Q} cases, then an increase in demand and a decrease in supply drawn against them.`,
  checklist: [
    'Both axes labelled with their units, price on the vertical',
    'Demand sloping down and supply sloping up, each labelled at the end of the line',
    'The price and quantity where the two meet read off with dashed guides',
    'A shift drawn beside the original curve, never instead of it, and labelled D₂ or S₂',
    'A demand change: price and quantity both move the same way',
    'A supply change: price and quantity move in opposite directions',
  ],
  scenarios: [
    { label: 'The two schedules together', svg: bothSvg() },
    { label: 'Demand increases', svg: demandRiseSvg() },
    { label: 'Supply decreases', svg: supplyFallSvg() },
  ],
};

/* ── 4 · The schedule as a table (block 4) ─────────────────────────────────── */
/*
 * A body cannot hold a table — `schema.body-type` allows paragraph, subheading, flow and bullets only
 * — and a practice question renders into a <p>, where newlines collapse. A diagram is the only
 * surface in the schema that can carry a grid, so the schedule a PED calculation is read off is drawn
 * as one (packet 17's rule, and the same reason its demand schedule is a diagram).
 */
export const TBL = { x0: 52, top: 70, rowH: 26, cols: [52, 152, 258, 372] };

const grid = (headers, rows, { title, note, highlight = -1, colXs = TBL.cols, h = 330 } = {}) => {
  const out = [open(h)];
  if (title) out.push(t(TBL.x0, 34, title, { size: 12, fill: INK, weight: 700 }));
  const y0 = TBL.top;
  headers.forEach((head, c) => out.push(t(colXs[c], y0, head, { size: 10, fill: AXIS, weight: 600 })));
  out.push(line(TBL.x0 - 4, y0 + 8, 460, y0 + 8, GRID, 1.5));
  rows.forEach((row, r) => {
    const y = y0 + TBL.rowH * (r + 1) + 4;
    const on = r === highlight;
    if (on) out.push(`<rect x="${TBL.x0 - 6}" y="${y - 15}" width="${466 - TBL.x0}" height="22" fill="${AMBER}" fill-opacity="0.16" rx="3"/>`);
    row.forEach((cell, c) => out.push(t(colXs[c], y, cell, { size: 11, fill: on ? AMBER : INK, weight: on ? 700 : 400 })));
    out.push(line(TBL.x0 - 4, y + 7, 460, y + 7, GRID, 0.75));
  });
  if (note) out.push(t(TBL.x0, y0 + TBL.rowH * (rows.length + 1) + 22, note, { size: 9, fill: MUTED }));
  out.push(close);
  return out.join('');
};

const scheduleSvg = () => grid(
  ['Price', 'Quantity demanded', 'Total revenue', ''],
  PRICES.map((p) => [money(p), `${qdAt(p)} cases`, money(trAt(p)), p === PEAK_P ? 'highest' : '']),
  {
    title: 'Maji: the demand schedule and total revenue',
    note: `Total revenue is price × quantity. It is highest at ${money(PEAK_P)} — ${money(MAX_TR)} — and falls away on both sides of it.`,
    highlight: PRICES.indexOf(PEAK_P),
    h: 300,
  },
);

const pedWorkedSvg = () => grid(
  ['Price change', '% change in Q', '% change in P', 'PED'],
  [PED_INELASTIC, PED_UNIT, PED_ELASTIC].map(([a, b]) => [
    `${money(a)} → ${money(b)}`,
    pc(pctQ(a, b)),
    pc(pctP(a, b)),
    pedS(a, b),
  ]),
  {
    title: 'Three price changes, three PED values',
    note: 'Same product, same curve. PED depends on the price you start from, because a dollar is a bigger share of a low price than a high one.',
    colXs: [52, 180, 288, 396],
    h: 240,
  },
);

const pedRevenueSvg = () => grid(
  ['Price change', 'PED', 'Demand is', 'Total revenue'],
  [
    [`${money(PED_INELASTIC[0])} → ${money(PED_INELASTIC[1])}`, pedS(...PED_INELASTIC), 'price inelastic', `${money(trAt(PED_INELASTIC[0]))} → ${money(trAt(PED_INELASTIC[1]))} ▲`],
    [`${money(PED_UNIT[0])} → ${money(PED_UNIT[1])}`, pedS(...PED_UNIT), 'unitary at the start', `${money(trAt(PED_UNIT[0]))} is the peak → ${money(trAt(PED_UNIT[1]))}`],
    [`${money(PED_ELASTIC[0])} → ${money(PED_ELASTIC[1])}`, pedS(...PED_ELASTIC), 'price elastic', `${money(trAt(PED_ELASTIC[0]))} → ${money(trAt(PED_ELASTIC[1]))} ▼`],
  ],
  {
    title: 'What each PED value does to total revenue',
    note: `Price inelastic: price and revenue move together. Price elastic: they move apart. Revenue peaks at ${money(PEAK_P)}, where PED is ${pedS(...PED_UNIT)}.`,
    colXs: [52, 168, 232, 348],
    h: 240,
  },
);

const pedDiagram = {
  id: id('diagram', 'ped schedule worked values and revenue'),
  title: 'PED: the Schedule, the Values and the Revenue',
  description: 'The demand schedule a PED calculation is read off, three worked price changes with their percentage changes shown, and what each value of price elasticity of demand does to total revenue.',
  checklist: [
    'Both percentage changes taken from the ORIGINAL value, not the new one',
    'Quantity on top of the fraction and price underneath',
    'The sign kept, because price and quantity move in opposite directions',
    'The size compared with 1 to classify the demand as elastic, unitary or inelastic',
    `Total revenue at its highest where PED is ${pedS(...PED_UNIT)}`,
  ],
  scenarios: [
    { label: 'The schedule and revenue', svg: scheduleSvg() },
    { label: 'Three worked PED values', svg: pedWorkedSvg() },
    { label: 'PED and total revenue', svg: pedRevenueSvg() },
  ],
};

/* ── 5 · Income elasticity (block 5) ───────────────────────────────────────── */

const yedSvg = () => grid(
  ['Product', 'Cases before → after', '% change in Q', 'YED'],
  [
    ['Sparkling pressé', `${PRESSE_Q[0]} → ${PRESSE_Q[1]}`, pc(pctOf(PRESSE_Q)), sig(YED_PRESSE())],
    ['Still water', `${WATER_Q[0]} → ${WATER_Q[1]}`, pc(pctOf(WATER_Q)), sig(YED_WATER())],
    ['Powdered mix', `${MIX_Q[0]} → ${MIX_Q[1]}`, pc(pctOf(MIX_Q)), sig(YED_MIX())],
  ],
  {
    title: `Incomes rose ${pc(INCOME_RISE)}: three of Maji's products`,
    note: `Each YED is the quantity percentage divided by ${INCOME_RISE}. Read the sign first, then the size.`,
    colXs: [52, 176, 300, 396],
    h: 220,
  },
);

const yedLineSvg = () => {
  const X = (v) => r2(90 + ((v + 1) / 4) * 330);   // −1 at the left, +3 at the right
  const y = 150;
  const mark = (v, label, colour) => [
    line(X(v), y - 9, X(v), y + 9, colour, 2.5),
    dot(X(v), y, colour, 4),
    t(X(v), y - 16, sig(v), { size: 11, fill: colour, anchor: 'middle', weight: 700 }),
    t(X(v), y + 28, label, { size: 9, fill: colour, anchor: 'middle' }),
  ].join('');
  return [
    open(230),
    t(52, 34, 'Where the three values sit', { size: 12, fill: INK, weight: 700 }),
    line(80, y, 440, y, AXIS, 2, ' marker-end="url(#arr)"'),
    line(X(0), y - 22, X(0), y + 40, GRID, 1.5, dash),
    t(X(0), y + 54, '0 — the sign changes here', { size: 9, fill: MUTED, anchor: 'middle' }),
    line(X(1), y - 22, X(1), y + 40, GRID, 1.5, dash),
    t(X(1), y + 54, '1 — the size changes meaning here', { size: 9, fill: MUTED, anchor: 'middle' }),
    mark(YED_MIX(), 'inferior', RED),
    mark(YED_WATER(), 'normal, income inelastic', GREEN),
    mark(YED_PRESSE(), 'normal, income elastic', PURPLE),
    t(52, 200, 'Left of 0: buyers leave as incomes rise. Right of 1: demand swings more than income does.', { size: 9, fill: MUTED }),
    close,
  ].join('');
};

const yedDiagram = {
  id: id('diagram', 'yed three products and the number line'),
  title: 'Income Elasticity: Three Products',
  description: `One income rise of ${pc(INCOME_RISE)} across Maji's region, and what it did to three of its products. The table carries the calculation; the number line shows where each value sits against the two thresholds that matter — zero, which separates normal from inferior, and one, which separates income elastic from income inelastic.`,
  checklist: [
    'Quantity demanded on top of the fraction and income underneath',
    'Both percentage changes taken from the original value',
    'The sign read first: positive is a normal good, negative an inferior one',
    'The size read second, against 1, for income elastic or income inelastic',
    'Every one of these values comes from the same income change',
  ],
  scenarios: [
    { label: 'The calculation', svg: yedSvg() },
    { label: 'Where the values sit', svg: yedLineSvg() },
  ],
};

export const DIAGRAMS = [demandDiagram, supplyDiagram, marketDiagram, pedDiagram, yedDiagram];
