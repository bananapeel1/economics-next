/**
 * PACKET 50 — managing-change diagrams. FIVE, one pinned to each chapter by `diagramId`, every
 * figure read off `FIRM` rather than typed into the SVG.
 *
 * `structure-03` reports zero diagrams while an examMatters line told students to "draw Lewin's
 * force field diagram". Both halves are dealt with: the instruction is gone (Lewin is 0 hits in
 * bus_spec.txt, and the runner bans the name), and chapter 3 DRAWS the forces for and against
 * Harbourline's change, without a model name, so "weaken the forces against" is a picture and not an
 * instruction to draw something the section never shows (`topFix-04`'s diagram clause). The other
 * chapters draw what their own bullets are about: costs before gains and the two sizes of change
 * (chapter 1), the layers a message passes through and what a transformative leader does (1b, 1e),
 * the likelihood × impact grid (2a), and the cost of an outage with and without a standby system (2b).
 *
 * THE CHECK-IN SHOWS THE CHAPTER'S DIAGRAM ABOVE ONE QUIZ ITEM (`lib/checkin-placement.js`, the
 * block's first pinned item). Each chapter's first quiz item is written about something this module
 * does not show, and the runner re-checks every pinned key on the emitted SVG.
 *
 * Frame 400 wide, faces 15 (titles) and 12 (everything else), stacked rows at least 20 apart, which
 * clears the collision guard's 1.2 × 15 = 18. Every colour is a key of `PALETTE` in
 * `components/learn-mode/processSvg.js`.
 */
import { id, FIRM, usd, usdm, units } from './_packet50-util.mjs';

const F = FIRM;

export const FRAME = { w: 400, pad: 16 };
export const FACE = 15;
export const SMALL = 12;
export const MIN_FACE = SMALL;
export const COLLIDE_TOL = 1.2;
export const LEAD = 20;

const INK = '#e8ecf5';
const MUTED = '#7a8299';
const AXIS = '#94a3b8';
const GRID = '#475569';
const GREEN = '#34d399';
const RED = '#f87171';
const BLUE = '#60a5fa';
const AMBER = '#f59e0b';
const PURPLE = '#a78bfa';

export const estWidth = (text, size = FACE) => String(text).length * size * 0.56;

const svg = (h, body) => `<svg width="${FRAME.w}" height="${h}" viewBox="0 0 ${FRAME.w} ${h}" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',system-ui,sans-serif;background:transparent">${body}</svg>`;
const t = (x, y, str, { size = SMALL, fill = INK, anchor = 'start', weight = 400 } = {}) =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" font-weight="${weight}">${str}</text>`;
const title = (str) => t(FRAME.w / 2, 24, str, { size: FACE, anchor: 'middle', weight: 600 });
const rect = (x, y, w, h, { fill = 'none', stroke = GRID, rx = 6, sw = 1.5 } = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
const line = (x1, y1, x2, y2, { stroke = AXIS, sw = 1.5, marker = null } = {}) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}"${marker ? ` marker-end="url(#${marker})"` : ''}/>`;
const path = (pts, { stroke = AXIS, sw = 2.5 } = {}) =>
  `<path d="M ${pts.map(([x, y]) => `${x} ${y}`).join(' L ')}" fill="none" stroke="${stroke}" stroke-width="${sw}"/>`;
const arrowDefs = (colours) => `<defs>${colours.map(([name, c]) => `<marker id="${name}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${c}"/></marker>`).join('')}</defs>`;
/** A labelled box: a rect with up to two centred lines of text, 20 apart. */
const box = (x, y, w, h, lines, { stroke = GRID, fill = 'none', colour = INK } = {}) => {
  const cx = x + w / 2;
  const first = y + h / 2 - ((lines.length - 1) * LEAD) / 2 + 4;
  return rect(x, y, w, h, { stroke, fill }) + lines.map((s, i) => t(cx, first + i * LEAD, s, { anchor: 'middle', fill: i === 0 ? colour : MUTED, weight: i === 0 ? 600 : 400 })).join('');
};
const swatch = (x, y, c) => rect(x, y - 8, 14, 8, { fill: c, stroke: c, rx: 2, sw: 1 });

/* ══ 1 · Why change happens and how fast ═══════════════════════════════════ */

const overTimeSvg = () => svg(270, [
  title('Costs first, gains later'),
  line(50, 40, 50, 200),
  line(50, 200, 370, 200),
  t(58, 46, 'Output per worker', { fill: MUTED }),
  t(370, 220, 'Time', { anchor: 'end', fill: MUTED }),
  path([[50, 110], [130, 110], [160, 150], [200, 160], [240, 130], [300, 80], [370, 60]], { stroke: AMBER }),
  t(120, 96, 'Change starts', { anchor: 'middle' }),
  t(200, 184, 'Learning dip', { anchor: 'middle', fill: RED }),
  t(290, 64, 'Gains, if it works', { anchor: 'end', fill: GREEN }),
  t(FRAME.w / 2, 252, 'Judge a change over time, not in its first months', { anchor: 'middle' }),
].join(''));

const twoSizesSvg = () => svg(300, [
  title('Incremental change and step change'),
  line(50, 40, 50, 200),
  line(50, 200, 370, 200),
  t(58, 46, 'How far the business has moved', { fill: MUTED }),
  t(370, 220, 'Time', { anchor: 'end', fill: MUTED }),
  path([[50, 180], [100, 180], [100, 165], [150, 165], [150, 150], [200, 150], [200, 135], [250, 135], [250, 120], [300, 120], [300, 105], [370, 105]], { stroke: GREEN }),
  path([[50, 186], [230, 186], [230, 80], [370, 80]], { stroke: BLUE }),
  swatch(58, 244, GREEN),
  t(80, 244, 'Incremental: small steps that build'),
  swatch(58, 264, BLUE),
  t(80, 264, 'Step change: one large, sudden shift'),
  t(FRAME.w / 2, 290, 'Bigger and faster costs more and meets more resistance', { anchor: 'middle' }),
].join(''));

export const changeDiagram = {
  id: id('diagram', 'change over time incremental and step'),
  title: 'How Change Pays Off Over Time',
  description: 'The unit description\'s effects of change and 3.3.6 · 1c: output per worker dips while staff learn before any gain arrives, and incremental change moves in small steps where step change makes one large jump.',
  checklist: [
    'The line dips after the change starts: costs and learning come before gains',
    'The gain is shown as conditional: it arrives only if the change works',
    'Incremental change climbs in small steps; step change stays flat, then jumps',
  ],
  scenarios: [
    { label: 'Costs first, gains later', svg: overTimeSvg() },
    { label: 'Two sizes of change', svg: twoSizesSvg() },
  ],
};

/* ══ 2 · Culture, size and leadership (1b, 1e) ═════════════════════════════ */

export const LAYER_NAMES = ['Board', 'Chief executive', 'Directors', 'Regional heads', 'Branch managers', 'Team leaders', 'Claims handlers'];

const layersSvg = () => {
  const x = 200, w = 160, h = 22, gap = 4, top = 64;
  return svg(290, [
    arrowDefs([['ly', AXIS]]),
    title('How far a message has to travel'),
    t(90, 52, 'Small firm', { anchor: 'middle', fill: MUTED, weight: 600 }),
    t(x + w / 2, 52, F.name, { anchor: 'middle', fill: MUTED, weight: 600 }),
    box(40, top, 100, 40, ['Owner'], { stroke: GREEN, colour: GREEN }),
    line(90, top + 42, 90, top + 70, { marker: 'ly' }),
    box(40, top + 74, 100, 40, ['Six staff']),
    ...LAYER_NAMES.map((name, i) => box(x, top + i * (h + gap), w, h, [name], { stroke: i === LAYER_NAMES.length - 1 ? AMBER : GRID, colour: i === LAYER_NAMES.length - 1 ? AMBER : INK })),
    line(376, top, 376, top + LAYER_NAMES.length * (h + gap) - gap, { marker: 'ly' }),
    t(FRAME.w / 2, 272, `One step against ${LAYER_NAMES.length - 1}: every layer can delay or reword it`, { anchor: 'middle' }),
  ].join(''));
};

const leaderSvg = () => {
  const x = 100, w = 200, h = 50, step = 64, top = 46;
  const rows = [
    ['Set out a vision', 'where the business is going', BLUE],
    ['Explain the need', 'honestly, including losses', PURPLE],
    ['Inspire', 'by example and energy', AMBER],
    ['Empower', 'staff choose the route', GREEN],
  ];
  return svg(330, [
    arrowDefs([['ld', AXIS]]),
    title('What a transformative leader does'),
    ...rows.map(([a, b, c], i) => box(x, top + i * step, w, h, [a, b], { stroke: c, colour: c })),
    ...rows.slice(1).map((_, i) => line(x + w / 2, top + i * step + h + 2, x + w / 2, top + (i + 1) * step - 3, { marker: 'ld' })),
    t(FRAME.w / 2, 316, 'People follow a leader they trust through uncertainty', { anchor: 'middle' }),
  ].join(''));
};

export const factorsDiagram = {
  id: id('diagram', 'size layers and transformative leadership'),
  title: 'Size and Leadership in a Change',
  description: '3.3.6 · 1b and 1e: the layers a message about a change passes through in a small firm and in Harbourline, and what a transformative leader does to carry people through the change.',
  checklist: [
    `${F.name} has ${F.layers} layers from the board to the claims handlers; the small firm has one step`,
    'Each extra layer is another point where the message can be delayed or reworded',
    'The leader\'s four actions run from a direction to trusting staff with how to get there',
  ],
  scenarios: [
    { label: 'Layers of management', svg: layersSvg() },
    { label: 'Transformative leadership', svg: leaderSvg() },
  ],
};

/* ══ 3 · Managing resistance to change (1d) ════════════════════════════════ */

const forcesSvg = () => {
  const w = 150, h = 50, lx = 8, rx = 242, rows = [66, 136, 206];
  const pushes = [['Customers leaving', 'for an app insurer'], ['Lower cost', 'per claim'], ['A new chief', 'executive\'s vision']];
  const holds = [[`${units(F.postsLost)} posts`, 'going'], ['Pride in', 'face-to-face checks'], ['Rumours and', 'uncertainty']];
  return svg(310, [
    arrowDefs([['fg', GREEN], ['fr', RED]]),
    title('Forces for and against the change'),
    t(lx, 52, 'For the change', { fill: GREEN, weight: 600 }),
    t(FRAME.w / 2, 52, 'The change', { anchor: 'middle', fill: MUTED, weight: 600 }),
    t(rx, 52, 'Against it', { fill: RED, weight: 600 }),
    line(FRAME.w / 2, 62, FRAME.w / 2, 262, { stroke: AXIS, sw: 3 }),
    ...pushes.map((ls, i) => box(lx, rows[i], w, h, ls, { stroke: GREEN, colour: GREEN })),
    ...holds.map((ls, i) => box(rx, rows[i], w, h, ls, { stroke: RED, colour: RED })),
    ...rows.map((y) => line(lx + w + 2, y + h / 2, FRAME.w / 2 - 4, y + h / 2, { stroke: GREEN, marker: 'fg' })),
    ...rows.map((y) => line(rx - 2, y + h / 2, FRAME.w / 2 + 4, y + h / 2, { stroke: RED, marker: 'fr' })),
    t(FRAME.w / 2, 292, 'Weaken the forces against; do not only push harder', { anchor: 'middle' }),
  ].join(''));
};

export const forcesDiagram = {
  id: id('diagram', 'forces for and against the change'),
  title: 'Forces For and Against the Change',
  description: '3.3.6 · 1d: what pushes Harbourline\'s move to app claims forward, and what holds it back. Managing resistance means weakening what holds it back, not only pushing harder.',
  checklist: [
    'The forces for the change come from customers, costs and the new leader',
    'The forces against it come from the people the change reaches',
    'Pushing harder on one side tends to make the other push back harder',
  ],
  scenarios: [
    { label: 'For and against', svg: forcesSvg() },
  ],
};

/* ══ 4 · Identifying key risks through risk assessment (2a) ═════════════════ */

const matrixSvg = () => {
  const x0 = 70, y0 = 50, cw = 56, ch = 36, n = 5;
  const cx = (impact) => x0 + (impact - 1) * cw + cw / 2;
  const cy = (lik) => y0 + (n - lik) * ch + ch / 2 + 5;
  const colour = (score) => (score >= 15 ? RED : score >= 10 ? AMBER : BLUE);
  const cells = [];
  for (let i = 0; i < n; i += 1) for (let j = 0; j < n; j += 1) cells.push(rect(x0 + i * cw, y0 + j * ch, cw, ch, { rx: 0, sw: 1 }));
  const legendY = 290;
  return svg(360, [
    title(`${F.name}'s risk register`),
    t(8, 44, 'Likelihood', { fill: MUTED }),
    ...cells,
    ...[1, 2, 3, 4, 5].map((v) => t(x0 - 8, cy(v), String(v), { anchor: 'end', fill: MUTED })),
    ...[1, 2, 3, 4, 5].map((v) => t(cx(v), y0 + n * ch + 16, String(v), { anchor: 'middle', fill: MUTED })),
    t(x0 + (n * cw) / 2, y0 + n * ch + 36, 'Impact', { anchor: 'middle', fill: MUTED }),
    ...F.risks.map((r) => t(cx(r.impact), cy(r.likelihood), String(r.score), { size: FACE, anchor: 'middle', fill: colour(r.score), weight: 600 })),
    ...F.risks.map((r, i) => t(x0, legendY + i * LEAD, `${r.score} = ${r.likelihood} × ${r.impact}: ${r.name}`, { fill: colour(r.score) })),
  ].join(''));
};

export const riskDiagram = {
  id: id('diagram', 'risk register likelihood impact grid'),
  title: 'Scoring Risks by Likelihood and Impact',
  description: '3.3.6 · 2a: identifying key risks through risk assessment. Each risk is placed on a grid by how likely it is and how much damage it would do, and scored by multiplying the two.',
  checklist: [
    'Likelihood runs up the side and impact along the bottom, each from 1 to 5',
    'Each number in the grid is likelihood multiplied by impact',
    'The highest score is planned for first; the score still leaves things out',
  ],
  scenarios: [
    { label: 'Risk grid', svg: matrixSvg() },
  ],
};

/* ══ 5 · Planning for risk mitigation (2b) ═══════════════════════════════ */

const outageSvg = () => {
  const yBase = 240, scale = 180 / 2_000_000, w = 80;
  const hWithout = F.outageNoPlan * scale;
  const hOutage = F.outageWithPlan * scale;
  const hStandby = F.standbyCost * scale;
  const withTotal = F.outageWithPlan + F.standbyCost;
  return svg(350, [
    title('One outage, with and without a standby system'),
    line(40, yBase, 370, yBase),
    rect(80, round(yBase - hWithout), w, round(hWithout), { fill: RED, stroke: RED, rx: 3, sw: 1 }),
    rect(240, round(yBase - hOutage), w, round(hOutage), { fill: RED, stroke: RED, rx: 3, sw: 1 }),
    rect(240, round(yBase - hOutage - hStandby), w, round(hStandby), { fill: BLUE, stroke: BLUE, rx: 3, sw: 1 }),
    t(120, round(yBase - hWithout) - 8, usdm(F.outageNoPlan), { anchor: 'middle', weight: 600 }),
    t(280, round(yBase - hOutage - hStandby) - 8, usd(withTotal), { anchor: 'middle', weight: 600 }),
    t(120, yBase + LEAD, `No standby: ${F.daysNoPlan} days`, { anchor: 'middle', fill: MUTED }),
    t(280, yBase + LEAD, `Standby: ${F.daysWithPlan} day`, { anchor: 'middle', fill: MUTED }),
    swatch(58, 290, RED),
    t(80, 290, `Cost of the outage, ${usd(F.costPerDay)} a day`),
    swatch(58, 310, BLUE),
    t(80, 310, 'Standby system, a year'),
    t(FRAME.w / 2, 338, 'In a year with one outage, the standby pays for itself', { anchor: 'middle' }),
  ].join(''));
};
const round = (n) => Math.round(n * 10) / 10;

export const continuityDiagram = {
  id: id('diagram', 'outage cost with and without standby system'),
  title: 'Is the Standby System Worth It?',
  description: '3.3.6 · 2b: business continuity. The cost of one claims-system outage without a standby system, against the shorter outage plus a year of the standby system\'s cost.',
  checklist: [
    `Without a standby system the outage lasts ${F.daysNoPlan} days: ${F.daysNoPlan} × ${usd(F.costPerDay)} = ${usdm(F.outageNoPlan)}`,
    `With it, ${F.daysWithPlan} day of outage plus ${usd(F.standbyCost)} for the system`,
    'In a year with no outage, the standby system is a cost with nothing to show for it',
  ],
  scenarios: [
    { label: 'Cost of an outage', svg: outageSvg() },
  ],
};

/* ── the array order IS the chapter order, and the runner derives pins from it ── */
export const DIAGRAMS = [changeDiagram, factorsDiagram, forcesDiagram, riskDiagram, continuityDiagram];
export const ALL_DIAGRAMS = DIAGRAMS;
