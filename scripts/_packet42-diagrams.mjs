/**
 * PACKET 42 — resource-management diagrams. FOUR, one pinned to each chapter, every figure read
 * off `BIZ` rather than typed into the SVG.
 *
 * ── `structure-03`, `specGap-01` AND HALF OF `topFix-02` ARE ONE DEFECT ────
 *
 * The live section has **zero** diagrams and zero pins. That is not a cosmetic gap here: leaf 3a
 * is "Interpretation of inventory control diagram" (`bus_spec.txt:990`), which is a NAMED
 * specification requirement to read a chart. A section teaching 2.3.4 with no chart is failing an
 * assessed objective, and `spec-coverage.json` lists 3a as one of only two genuinely missing
 * leaves.
 *
 * `topFix-02` asks for the fix and names the legacy mechanism — a `diagramRef` matched against the
 * diagram TITLE. `components/learn-mode/utils.js` resolves `pin.id` against each diagram's own
 * `id` field first and falls back to `pin.ref` under a comment calling that path legacy. F052/F109
 * are the programme-wide version. So every diagram below carries a stable `id` and every chapter
 * pins by `diagramId`: a title edit can no longer break a pin.
 *
 * ── RULE 2 LIVES HERE AND ONLY HERE ────────────────────────────────────────
 *
 * `Maximum level`, `Re-order level`, `Buffer inventory`, `Lead time` and `Re-order quantity` are
 * how an exam paper labels an inventory chart, and a student sitting 3a has to read them. Four of
 * those five are 0 hits in `bus_spec.txt`. The packet spec's resolution is that they are labels on
 * the drawing and nothing else, and the acceptance check is a grep over the staged bundle finding
 * them "0 outside diagram labels". So they appear inside `<text>` elements in this file, the
 * runner asserts they appear nowhere else in the bundle — not in a title, not in a description,
 * not in a checklist — and the teaching text in `_packet42-content.mjs` names each line by what it
 * does instead.
 *
 * ── THE FRAME IS 400 UNITS AND THE COLLISION GUARD IS REAL ────────────────
 *
 * Packets 37 and 40 both shipped colliding labels past every other check, and packet 40's Verify B
 * proved the tolerance matters: at 0.75 the pair a student could actually see was invisible to the
 * guard. `COLLIDE_TOL` is 1.2 here for the same reason, exported once so the thing that draws and
 * the thing that checks import the same number, and the runner A/Bs it against geometry it
 * re-derives itself rather than against anything this module reports.
 *
 * Every colour below is a key of `PALETTE` in `components/learn-mode/processSvg.js`; the runner
 * parses that file and asserts it rather than trusting this comment (packet 32).
 */
import { id, BIZ, usd, units, pct, num } from './_packet42-util.mjs';

const B = BIZ;

/* ── the frame, and the two type sizes ─────────────────────────────────────── */
export const FRAME = { w: 400, pad: 16 };
/** Anything a student must read to answer a question. */
export const FACE = 15;
/** Secondary text: axis ticks, notes, the units line. */
export const SMALL = 12;
/** The floor the runner enforces on every `font-size` this module emits. */
export const MIN_FACE = SMALL;
/**
 * THE GUARD'S TOLERANCE, AND THE LEAD THAT CLEARS IT, IN ONE PLACE. Ported from packet 40 with
 * its reason intact: at 0.75 a 12-unit pair 12 units apart reads as "not colliding" and the
 * student sees the overlap anyway. `LEAD` is what this module leaves between stacked rows of
 * text: 20 > 1.2 × 15, so a row laid out with it cannot trip the guard.
 */
export const COLLIDE_TOL = 1.2;
export const LEAD = 20;

/* ── palette, all of it in processSvg's map ────────────────────────────────── */
const INK = '#e8ecf5';
const MUTED = '#7a8299';
const AXIS = '#94a3b8';
const GRID = '#475569';
const GREEN = '#059669';
const GREEN2 = '#34d399';
const RED = '#ef4444';
const RED2 = '#f87171';
const BLUE = '#3b82f6';
const BLUE2 = '#60a5fa';
const AMBER = '#f59e0b';
const PURPLE = '#8b5cf6';

/** A rough text width, used by the runner's overrun check. DM Sans at ~0.56em average. */
export const estWidth = (text, size = FACE) => String(text).length * size * 0.56;

const svg = (h, body) => `<svg width="${FRAME.w}" height="${h}" viewBox="0 0 ${FRAME.w} ${h}" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',system-ui,sans-serif;background:transparent">${body}</svg>`;
const t = (x, y, str, { size = FACE, fill = INK, anchor = 'start', weight = 400 } = {}) =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" font-weight="${weight}">${str}</text>`;
const box = (x, y, w, h, { fill = 'none', stroke = GRID, rx = 8, sw = 1.5 } = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
const line = (x1, y1, x2, y2, { stroke = AXIS, sw = 1.5, dash = null, marker = null } = {}) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ''}${marker ? ` marker-end="url(#${marker})"` : ''}/>`;
const path = (d, { stroke = AXIS, sw = 2, fill = 'none', dash = null, marker = null } = {}) =>
  `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ''}${marker ? ` marker-end="url(#${marker})"` : ''}/>`;
const arrowDefs = (colours) => `<defs>${colours.map(([name, c]) => `<marker id="${name}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${c}"/></marker>`).join('')}</defs>`;

/* ══ 1 · Average cost against output (2.3.4 · 1c, 1d) ═════════════════════ */
/*
 * TWO VIEWS, BOTH ANSWERING A LEAF. The first is 1c-1 — efficiency IS production at minimum
 * average cost, so the point of the picture is that the curve has a lowest point and the word
 * points at it. The second is 1d, and its whole content is the CROSSING: two straight average
 * cost curves that meet at 3,750, which is the figure `_packet42-util.mjs` derives rather than
 * types.
 */
const avgCostSvg = () => {
  const x0 = 56, x1 = 372, yTop = 52, yBase = 212;
  const qMin = 1500, qMax = B.maxOutput;
  const cMax = B.averageCost(qMin), cMin = B.avgAtCapacity;
  const px = (q) => x0 + ((q - qMin) / (qMax - qMin)) * (x1 - x0);
  const py = (c) => yBase - ((c - cMin) / (cMax - cMin)) * (yBase - yTop);
  const pts = [];
  for (let q = qMin; q <= qMax; q += 100) pts.push(`${px(q).toFixed(1)},${py(B.averageCost(q)).toFixed(1)}`);
  const qOut = px(B.output), cOut = py(B.avgAtOutput);
  const qCap = px(qMax), cCap = py(cMin);
  const h = yBase + 76;
  return svg(h, [
    arrowDefs([['ac1', AMBER]]),
    t(FRAME.w / 2, 26, 'Average cost falls as output rises', { anchor: 'middle', weight: 600, size: FACE }),
    line(x0, yTop - 12, x0, yBase, { stroke: AXIS }),
    line(x0, yBase, x1 + 8, yBase, { stroke: AXIS }),
    path(`M ${pts.join(' L ')}`, { stroke: BLUE2, sw: 2.5 }),
    line(x0, cOut, qOut, cOut, { stroke: GRID, sw: 1, dash: '3 3' }),
    line(qOut, cOut, qOut, yBase, { stroke: GRID, sw: 1, dash: '3 3' }),
    line(x0, cCap, qCap, cCap, { stroke: GREEN2, sw: 1, dash: '3 3' }),
    line(qCap, cCap, qCap, yBase, { stroke: GREEN2, sw: 1, dash: '3 3' }),
    t(x0 - 8, cOut + 4, usd(B.avgAtOutput), { anchor: 'end', size: SMALL, fill: MUTED }),
    t(x0 - 8, cCap + 4, usd(cMin), { anchor: 'end', size: SMALL, fill: GREEN2 }),
    t(qOut, yBase + LEAD, units(B.output), { anchor: 'middle', size: SMALL, fill: MUTED }),
    t(qCap, yBase + LEAD, units(qMax), { anchor: 'middle', size: SMALL, fill: GREEN2 }),
    t(FRAME.w / 2, yBase + LEAD * 2, `${B.products} a month`, { anchor: 'middle', size: SMALL, fill: MUTED }),
    t(FRAME.w / 2, yBase + LEAD * 3, `Minimum average cost is at capacity: ${usd(cMin)}`, { anchor: 'middle', size: SMALL, fill: INK }),
  ].join(''));
};

const crossoverSvg = () => {
  const x0 = 56, x1 = 360, yTop = 52, yBase = 208;
  const qMin = 2000, qMax = B.maxOutput;
  const curveA = (q) => B.averageCost(q);
  const curveB = (q) => B.averageCost(q, B.autoFixed, B.autoVariableCost);
  const cMax = Math.max(curveA(qMin), curveB(qMin));
  const cMin = Math.min(curveA(qMax), curveB(qMax));
  const px = (q) => x0 + ((q - qMin) / (qMax - qMin)) * (x1 - x0);
  const py = (c) => yBase - ((c - cMin) / (cMax - cMin)) * (yBase - yTop);
  const series = (f) => { const a = []; for (let q = qMin; q <= qMax; q += 100) a.push(`${px(q).toFixed(1)},${py(f(q)).toFixed(1)}`); return `M ${a.join(' L ')}`; };
  const cx = px(B.crossoverOutput), cy = py(B.avgLabourAtCrossover);
  const h = yBase + 96;
  return svg(h, [
    t(FRAME.w / 2, 26, 'Where the two methods cost the same', { anchor: 'middle', weight: 600, size: FACE }),
    line(x0, yTop - 12, x0, yBase, { stroke: AXIS }),
    line(x0, yBase, x1 + 8, yBase, { stroke: AXIS }),
    path(series(curveA), { stroke: AMBER, sw: 2.5 }),
    path(series(curveB), { stroke: PURPLE, sw: 2.5 }),
    `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="4" fill="${INK}"/>`,
    line(cx, cy, cx, yBase - 2, { stroke: GRID, sw: 1, dash: '3 3' }),
    t(cx, yBase + LEAD, units(B.crossoverOutput), { anchor: 'middle', size: SMALL, fill: INK }),
    /* the series labels sit beside each curve's LEFT end, inside the plot and a LEAD apart, which
       is where the two curves are furthest from one another and from the axis */
    t(x0 + 10, py(curveA(qMin)) - 6, 'labour-intensive', { size: SMALL, fill: AMBER }),
    t(x0 + 10, py(curveB(qMin)) + 14, 'capital-intensive', { size: SMALL, fill: PURPLE }),
    t(FRAME.w / 2, yBase + LEAD * 2, `${B.products} a month`, { anchor: 'middle', size: SMALL, fill: MUTED }),
    t(FRAME.w / 2, yBase + LEAD * 3, `Below ${units(B.crossoverOutput)}: labour-intensive is cheaper`, { anchor: 'middle', size: SMALL, fill: AMBER }),
    t(FRAME.w / 2, yBase + LEAD * 4, `Above it: capital-intensive is`, { anchor: 'middle', size: SMALL, fill: PURPLE }),
  ].join(''));
};

export const costDiagram = {
  id: id('diagram', 'average cost output and the two methods'),
  title: 'Average Cost, Output and the Two Methods',
  description: 'IAL 2.3.4 · 1c and 1d: efficiency as production at minimum average cost, and the output at which capital-intensive production overtakes labour-intensive.',
  checklist: [
    'Average cost falls as output rises, because the fixed cost is spread further',
    `Its minimum is at capacity: ${usd(B.avgAtCapacity)} against ${usd(B.avgAtOutput)} at ${units(B.output)}`,
    `The two methods cross at ${units(B.crossoverOutput, B.products)}, where both cost ${usd(B.avgLabourAtCrossover)}`,
    'Below the crossing labour-intensive is cheaper; above it capital-intensive is',
  ],
  scenarios: [
    { label: 'Minimum average cost', svg: avgCostSvg() },
    { label: 'Labour against capital', svg: crossoverSvg() },
  ],
};

/* ══ 2 · Capacity utilisation (2.3.4 · 2a, 2b, 2c) ════════════════════════ */
/*
 * THE SECOND VIEW IS `structure-10`'s TWIST DRAWN. Two bars of identical height — the output did
 * not change — against two different maximums, so the percentage under them moves from 75 to
 * 93.75 with nothing sold. A student who has seen this picture does not write "utilisation rose,
 * so demand rose".
 */
const utilisationSvg = () => {
  const x0 = 62, w = 276, yTop = 60, hgt = 44;
  const used = (B.output / B.maxOutput) * w;
  const rows = [
    ['Used', used, GREEN2, `${units(B.output)} made`],
    ['Idle', w - used, RED2, `${units(B.maxOutput - B.output)} of capacity`],
  ];
  const barY = yTop + 24;
  const labelY = barY + hgt + LEAD;
  const noteY = labelY + LEAD;
  const costY = noteY + LEAD;
  const h = costY + 28;
  return svg(h, [
    t(FRAME.w / 2, 26, `${pct(B.utilisation)} of capacity in use`, { anchor: 'middle', weight: 600, size: FACE }),
    t(FRAME.w / 2, 46, `${units(B.output)} ÷ ${units(B.maxOutput)} × 100`, { anchor: 'middle', size: SMALL, fill: MUTED }),
    box(x0, barY, w, hgt, { fill: 'none', stroke: GRID, rx: 6 }),
    box(x0, barY, used, hgt, { fill: GREEN2, stroke: GREEN2, rx: 6, sw: 1 }),
    /* printed to the RIGHT of the bar, not inside it: the in-bar version needed a near-black that
       is not a key of processSvg's PALETTE, so light mode would have rendered it unmapped */
    t(x0 + w + 8, barY + hgt / 2 + 5, pct(B.utilisation), { size: SMALL, fill: GREEN2, weight: 600 }),
    t(x0, labelY, rows[0][3], { size: SMALL, fill: GREEN2 }),
    t(x0 + w, labelY, rows[1][3], { anchor: 'end', size: SMALL, fill: RED2 }),
    t(FRAME.w / 2, noteY, `Fixed cost a ${B.product}: ${usd(B.fixedPerUnitAtOutput)} here, ${usd(B.fixedPerUnitAtCapacity)} at full output`, { anchor: 'middle', size: SMALL, fill: INK }),
    t(FRAME.w / 2, costY, `Idle capacity costs ${usd(B.spareCapacityCostMonthly)} a month`, { anchor: 'middle', size: SMALL, fill: RED2 }),
  ].join(''));
};

const denominatorSvg = () => {
  const x0 = 70, w = 260, hgt = 34, gap = 74;
  const y1 = 76, y2 = y1 + gap;
  const scale = w / B.maxOutput;
  const outW = B.output * scale;
  const maxAfterW = B.maxAfterClosure * scale;
  const labelOffset = 22;
  const noteY = y2 + hgt + LEAD + 8;
  const h = noteY + LEAD * 2 + 12;
  return svg(h, [
    t(FRAME.w / 2, 26, 'The same output, two different maximums', { anchor: 'middle', weight: 600, size: FACE }),
    t(FRAME.w / 2, 46, 'Nothing extra was sold', { anchor: 'middle', size: SMALL, fill: MUTED }),
    box(x0, y1, w, hgt, { stroke: GRID, rx: 5 }),
    box(x0, y1, outW, hgt, { fill: BLUE2, stroke: BLUE2, rx: 5, sw: 1 }),
    t(x0 + w + 8, y1 + hgt / 2 + 4, pct(B.utilisation), { size: SMALL, fill: BLUE2 }),
    t(x0 - 8, y1 + hgt / 2 + 4, 'before', { anchor: 'end', size: SMALL, fill: MUTED }),
    t(x0, y1 + hgt + labelOffset, `maximum ${units(B.maxOutput)}`, { size: SMALL, fill: MUTED }),
    box(x0, y2, maxAfterW, hgt, { stroke: GRID, rx: 5 }),
    box(x0, y2, outW, hgt, { fill: GREEN2, stroke: GREEN2, rx: 5, sw: 1 }),
    t(x0 + maxAfterW + 8, y2 + hgt / 2 + 4, pct(B.utilisationAfterClosure), { size: SMALL, fill: GREEN2 }),
    t(x0 - 8, y2 + hgt / 2 + 4, 'after', { anchor: 'end', size: SMALL, fill: MUTED }),
    t(x0, y2 + hgt + labelOffset, `maximum ${units(B.maxAfterClosure)}`, { size: SMALL, fill: MUTED }),
    t(FRAME.w / 2, noteY + LEAD, `Output stayed at ${units(B.output)} in both`, { anchor: 'middle', size: SMALL, fill: INK }),
  ].join(''));
};

export const capacityDiagram = {
  id: id('diagram', 'capacity utilisation and its denominator'),
  title: 'Capacity Utilisation and Its Denominator',
  description: 'IAL 2.3.4 · 2a-2c: the formula drawn, what idle capacity costs, and why closing a line raises the percentage without selling anything.',
  checklist: [
    `Current output ÷ maximum possible output × 100 = ${pct(B.utilisation)}`,
    `Idle capacity carries ${usd(B.spareCapacityCostPerUnit)} a ${B.product} of fixed cost, ${usd(B.spareCapacityCostMonthly)} a month`,
    `Closing a line moves the maximum to ${units(B.maxAfterClosure)} and the figure to ${pct(B.utilisationAfterClosure)}`,
    'The output bar is the same length in both rows of the second view',
  ],
  scenarios: [
    { label: 'The formula drawn', svg: utilisationSvg() },
    { label: 'When the maximum moves', svg: denominatorSvg() },
  ],
};

/* ══ 3 · The inventory control diagram (2.3.4 · 3a) ═══════════════════════ */
/*
 * THE ONE THE SPECIFICATION NAMES. Leaf 3a is "Interpretation of inventory control diagram", and
 * the live section has nothing for it at all. Every coordinate here is derived from `BIZ`: the
 * slope is the usage rate, the sawtooth period is the order quantity over the usage rate, and the
 * height of the order line is the buffer plus the usage over the delivery delay.
 *
 * THIS IS THE ONLY PLACE IN THE PACKET WHERE `Re-order level`, `Lead time`, `Maximum level`,
 * `Buffer inventory` and `Re-order quantity` may be written. See the file header.
 */
const inventorySvg = () => {
  /* The plot stops at 262 so the three named labels have room to the right of it without any
     glyph leaving the 400-unit canvas: `Buffer inventory` is the longest at ~108 units. */
  const x0 = 56, x1 = 262, yTop = 58, yBase = 214;
  const invMax = B.maxInventory;
  const totalDays = B.cycleDays * 2;
  const px = (d) => x0 + (d / totalDays) * (x1 - x0);
  const py = (q) => yBase - (q / invMax) * (yBase - yTop);
  /* two full cycles: fall from the maximum at the usage rate, vertical refill on arrival */
  const pts = [];
  for (let c = 0; c < 2; c += 1) {
    const start = c * B.cycleDays;
    pts.push(`${px(start).toFixed(1)},${py(invMax).toFixed(1)}`);
    pts.push(`${px(start + B.cycleDays).toFixed(1)},${py(B.bufferInventory).toFixed(1)}`);
    if (c === 0) pts.push(`${px(start + B.cycleDays).toFixed(1)},${py(invMax).toFixed(1)}`);
  }
  const yOrder = py(B.orderPoint);
  const yBuffer = py(B.bufferInventory);
  const yMax = py(invMax);
  /* the day the line crosses the order level, derived from the geometry rather than assumed */
  const orderDay = (invMax - B.orderPoint) / B.tyresPerDay;
  const arriveDay = B.cycleDays;
  const daysY = yBase + LEAD;
  const noteY = yBase + LEAD * 2;
  const h = noteY + 18;
  return svg(h, [
    t(FRAME.w / 2, 26, 'Inventory control diagram', { anchor: 'middle', weight: 600, size: FACE }),
    t(FRAME.w / 2, 46, `tyres held, ${units(B.tyresPerDay)} used a day`, { anchor: 'middle', size: SMALL, fill: MUTED }),
    line(x0, yTop - 10, x0, yBase, { stroke: AXIS }),
    line(x0, yBase, x1 + 6, yBase, { stroke: AXIS }),
    line(x0, yMax, x1, yMax, { stroke: GRID, sw: 1, dash: '4 4' }),
    line(x0, yOrder, x1, yOrder, { stroke: AMBER, sw: 1, dash: '4 4' }),
    line(x0, yBuffer, x1, yBuffer, { stroke: RED2, sw: 1, dash: '4 4' }),
    path(`M ${pts.join(' L ')}`, { stroke: BLUE2, sw: 2.5 }),
    /* the three levels as numbers, left of the axis */
    t(x0 - 8, yMax + 4, units(invMax), { anchor: 'end', size: SMALL, fill: MUTED }),
    t(x0 - 8, yOrder + 4, units(B.orderPoint), { anchor: 'end', size: SMALL, fill: AMBER }),
    t(x0 - 8, yBuffer + 4, units(B.bufferInventory), { anchor: 'end', size: SMALL, fill: RED2 }),
    /* and as names, right of the plot; the three baselines are 31 units apart by construction */
    t(x1 + 8, yMax + 4, 'Maximum level', { size: SMALL, fill: MUTED }),
    t(x1 + 8, yOrder + 4, 'Re-order level', { size: SMALL, fill: AMBER }),
    t(x1 + 8, yBuffer + 4, 'Buffer inventory', { size: SMALL, fill: RED2 }),
    /* the delivery delay, bracketed between the crossing and the arrival */
    line(px(orderDay), yBase - 10, px(arriveDay), yBase - 10, { stroke: GREEN2, sw: 1.5 }),
    t((px(orderDay) + px(arriveDay)) / 2, yBase - 16, 'Lead time', { anchor: 'middle', size: SMALL, fill: GREEN2 }),
    t(FRAME.w / 2, daysY, 'days', { anchor: 'middle', size: SMALL, fill: MUTED }),
    t(FRAME.w / 2, noteY, `Re-order quantity ${units(B.orderQuantity)}, arriving every ${num(B.cycleDays)} days`, { anchor: 'middle', size: SMALL, fill: INK }),
  ].join(''));
};

const jitCompareSvg = () => {
  const x0 = 66, w = 250, hgt = 38, gap = 76;
  const y1 = 74, y2 = y1 + gap;
  const scale = w / B.maxInventory;
  const noteY = y2 + hgt + LEAD * 2 + 8;
  const h = noteY + LEAD + 12;
  return svg(h, [
    t(FRAME.w / 2, 26, 'What is held, and what it costs', { anchor: 'middle', weight: 600, size: FACE }),
    t(FRAME.w / 2, 46, 'average tyres held across the cycle', { anchor: 'middle', size: SMALL, fill: MUTED }),
    box(x0, y1, B.averageInventory * scale, hgt, { fill: BLUE2, stroke: BLUE2, rx: 5, sw: 1 }),
    t(x0 - 8, y1 + hgt / 2 + 4, 'cycle', { anchor: 'end', size: SMALL, fill: MUTED }),
    t(x0 + B.averageInventory * scale + 8, y1 + hgt / 2 + 4, units(B.averageInventory), { size: SMALL, fill: BLUE2 }),
    t(x0, y1 + hgt + LEAD, `${usd(B.holdingCostMonthly)} a month to hold`, { size: SMALL, fill: MUTED }),
    box(x0, y2, Math.max(4, B.jitAverageInventory * scale), hgt, { fill: GREEN2, stroke: GREEN2, rx: 5, sw: 1 }),
    t(x0 - 8, y2 + hgt / 2 + 4, 'JIT', { anchor: 'end', size: SMALL, fill: MUTED }),
    t(x0 + Math.max(4, B.jitAverageInventory * scale) + 8, y2 + hgt / 2 + 4, units(B.jitAverageInventory), { size: SMALL, fill: GREEN2 }),
    t(x0, y2 + hgt + LEAD, `${usd(B.jitHoldingCostMonthly)} a month to hold`, { size: SMALL, fill: MUTED }),
    t(FRAME.w / 2, noteY, `Saving ${usd(B.jitSavingMonthly)}; one stopped day costs ${usd(B.stoppageCost)}`, { anchor: 'middle', size: SMALL, fill: INK }),
  ].join(''));
};

export const inventoryDiagram = {
  id: id('diagram', 'the inventory control diagram'),
  title: 'The Inventory Control Diagram',
  description: 'IAL 2.3.4 · 3a, 3b and 3d: the standard inventory control chart to interpret, and what holding less is worth against what a stoppage costs.',
  checklist: [
    `The falling line is the usage rate: ${units(B.tyresPerDay)} tyres a day`,
    `An order goes out when the line reaches ${units(B.orderPoint)}, ${num(B.deliveryDelayDays)} days before it would reach the planned floor`,
    `Each delivery brings ${units(B.orderQuantity)} tyres and the pattern repeats every ${num(B.cycleDays)} days`,
    `Holding less saves ${usd(B.jitSavingMonthly)} a month and costs ${usd(B.stoppageCost)} the first day the line stops`,
  ],
  scenarios: [
    { label: 'Two cycles', svg: inventorySvg() },
    { label: 'Holding less', svg: jitCompareSvg() },
  ],
};

/* ══ 4 · What quality costs by the route chosen (2.3.4 · 4a, 4d) ══════════ */
const qualitySvg = () => {
  const zero = 196, bw = 72, gap = 34, x0 = 54;
  const bars = [
    ['Control', B.reworkCostMonthly, RED2],
    ['Assurance', B.assuranceCostMonthly, GREEN2],
    ['Reaching a customer', B.warrantyCostMonthly, AMBER],
  ];
  const top = Math.max(...bars.map((b2) => b2[1]));
  const scale = 118 / top;
  const geom = bars.map(([label, v, col], i) => {
    const x = x0 + i * (bw + gap);
    const hgt = Math.max(6, v * scale);
    return { label, v, col, x, y: zero - hgt, hgt, valueY: zero - hgt - 8 };
  });
  const labelY = zero + LEAD;
  const label2Y = labelY + LEAD;
  const noteY = label2Y + LEAD;
  const h = noteY + 18;
  /* the third bar's caption is two words long, so it is split across the two label rows rather
     than allowed to run into its neighbours. Every other bar prints on the first row only. */
  return svg(h, [
    t(FRAME.w / 2, 26, 'What quality costs a month', { anchor: 'middle', weight: 600, size: FACE }),
    t(FRAME.w / 2, 46, `at ${units(B.output, B.products)}`, { anchor: 'middle', size: SMALL, fill: MUTED }),
    line(x0 - 14, zero, 372, zero, { stroke: AXIS }),
    ...geom.flatMap((g, i) => [
      box(g.x, g.y, bw, g.hgt, { fill: g.col, stroke: g.col, rx: 4, sw: 1 }),
      t(g.x + bw / 2, g.valueY, usd(g.v), { anchor: 'middle', size: SMALL, fill: g.col }),
      t(g.x + bw / 2, labelY, i === 2 ? 'Reaching a' : g.label, { anchor: 'middle', size: SMALL, fill: MUTED }),
      ...(i === 2 ? [t(g.x + bw / 2, label2Y, 'customer', { anchor: 'middle', size: SMALL, fill: MUTED })] : []),
    ]),
    t(FRAME.w / 2, noteY, `Checking during instead of after saves ${usd(B.qualitySavingMonthly)}`, { anchor: 'middle', size: SMALL, fill: INK }),
  ].join(''));
};

const kaizenSvg = () => {
  const steps = ['Identify', 'Test', 'Implement', 'Standardise'];
  const bw = 80, bh = 46, gap = 24;
  const rowY = 86;
  const x0 = (FRAME.w - (bw * 2 + gap)) / 2;
  const coords = [
    [x0, rowY], [x0 + bw + gap, rowY],
    [x0 + bw + gap, rowY + bh + gap], [x0, rowY + bh + gap],
  ];
  const noteY = rowY + bh * 2 + gap + LEAD + 10;
  const h = noteY + LEAD + 12;
  return svg(h, [
    arrowDefs([['kz', BLUE2]]),
    t(FRAME.w / 2, 26, 'The kaizen cycle', { anchor: 'middle', weight: 600, size: FACE }),
    t(FRAME.w / 2, 46, 'small steps, repeated, by the people doing the work', { anchor: 'middle', size: SMALL, fill: MUTED }),
    ...coords.flatMap(([x, y], i) => [
      box(x, y, bw, bh, { fill: 'none', stroke: BLUE2, rx: 8 }),
      t(x + bw / 2, y + bh / 2 + 5, steps[i], { anchor: 'middle', size: SMALL, fill: INK }),
    ]),
    line(x0 + bw, rowY + bh / 2, x0 + bw + gap, rowY + bh / 2, { stroke: BLUE2, marker: 'kz' }),
    line(x0 + bw + gap + bw / 2, rowY + bh, x0 + bw + gap + bw / 2, rowY + bh + gap, { stroke: BLUE2, marker: 'kz' }),
    line(x0 + bw + gap, rowY + bh + gap + bh / 2, x0 + bw, rowY + bh + gap + bh / 2, { stroke: BLUE2, marker: 'kz' }),
    line(x0 + bw / 2, rowY + bh + gap, x0 + bw / 2, rowY + bh, { stroke: BLUE2, marker: 'kz' }),
    t(FRAME.w / 2, noteY, 'The fourth step is the one that makes the third permanent', { anchor: 'middle', size: SMALL, fill: INK }),
  ].join(''));
};

export const qualityDiagram = {
  id: id('diagram', 'what quality costs and the kaizen cycle'),
  title: 'What Quality Costs, and the Kaizen Cycle',
  description: 'IAL 2.3.4 · 4a, 4c and 4d: the cost of inspecting after against checking during, the cost of what still reaches a customer, and the four stages of continuous improvement.',
  checklist: [
    `Inspecting at the end: ${units(B.reworkUnits)} ${B.products} at ${usd(B.reworkCostLate)} = ${usd(B.reworkCostMonthly)}`,
    `Checking at each stage: ${units(B.assuranceUnits)} at ${usd(B.reworkCostEarly)} = ${usd(B.assuranceCostMonthly)}`,
    `What still reaches a customer costs ${usd(B.warrantyCostMonthly)}, and appears on no production report`,
    'The kaizen cycle returns to identify, and the standardise step is what stops it sliding back',
  ],
  scenarios: [
    { label: 'The cost of quality', svg: qualitySvg() },
    { label: 'The kaizen cycle', svg: kaizenSvg() },
  ],
};

/* ── the array order IS the chapter order, and the runner derives pins from it ── */
export const DIAGRAMS = [
  costDiagram,       // chapter 1 — Production, productivity and efficiency
  capacityDiagram,   // chapter 2 — Capacity utilisation
  inventoryDiagram,  // chapter 3 — Inventory control
  qualityDiagram,    // chapter 4 — Quality management
];

export const ALL_DIAGRAMS = DIAGRAMS;
