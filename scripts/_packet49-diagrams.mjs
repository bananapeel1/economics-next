/**
 * PACKET 49 — business-growth diagrams. FIVE, one pinned to each chapter by `diagramId`.
 *
 * `topFix-03` and `structure-03` name the picture the live section only described in a common mistake
 * ("draw a simple supply chain diagram in your head"): the chain from raw materials to consumer with
 * backward, forward and horizontal moves marked. That is chapter 3's diagram. Chapter 1 draws where
 * lower unit costs come from (1a), chapter 2 the routes of organic growth (2a), chapter 4 what a
 * takeover is weighed on (3a bullet 5, 3b), and chapter 5 the cost curve that economies and
 * diseconomies of scale together produce (4a), drawn by SAMPLING the function it claims (DECISIONS,
 * packet 15).
 *
 * THE CHECK-IN SHOWS THE CHAPTER'S DIAGRAM WITH ITS QUIZ ITEM (question first since PR #43), so each
 * chapter's pinned items are written about what its diagram does not print, and the runner re-checks
 * every pinned key and every first-pinned practice figure against the emitted text. Chapters 1, 2, 4
 * and 5 print no figure at all.
 *
 * Frame 400 wide, faces 15 (titles) and 12 (everything else), stacked rows 20 apart, which clears the
 * collision guard's 1.2 × 15 = 18. Every colour is a key of `PALETTE` in
 * `components/learn-mode/processSvg.js`.
 */
import { id, FIRM } from './_packet49-util.mjs';

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
const CYAN = '#22d3ee';

export const estWidth = (text, size = FACE) => String(text).length * size * 0.56;

const svg = (h, body) => `<svg width="${FRAME.w}" height="${h}" viewBox="0 0 ${FRAME.w} ${h}" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',system-ui,sans-serif;background:transparent">${body}</svg>`;
const t = (x, y, str, { size = SMALL, fill = INK, anchor = 'start', weight = 400 } = {}) =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" font-weight="${weight}">${str}</text>`;
const title = (str) => t(FRAME.w / 2, 24, str, { size: FACE, anchor: 'middle', weight: 600 });
const rect = (x, y, w, h, { fill = 'none', stroke = GRID, rx = 6, sw = 1.5 } = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
const line = (x1, y1, x2, y2, { stroke = AXIS, sw = 1.5, marker = null, dash = null } = {}) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ''}${marker ? ` marker-end="url(#${marker})"` : ''}/>`;
const arrowDefs = (colours) => `<defs>${colours.map(([name, c]) => `<marker id="${name}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${c}"/></marker>`).join('')}</defs>`;
/** A labelled box: a rect with up to three centred lines, 20 apart; the first in colour and bold. */
const box = (x, y, w, h, lines, { stroke = GRID, fill = 'none', colour = INK } = {}) => {
  const cx = x + w / 2;
  const first = y + h / 2 - ((lines.length - 1) * LEAD) / 2 + 4;
  return rect(x, y, w, h, { stroke, fill }) + lines.map((s, i) => t(cx, first + i * LEAD, s, { anchor: 'middle', fill: i === 0 ? colour : MUTED, weight: i === 0 ? 600 : 400 })).join('');
};
const r1 = (n) => Math.round(n * 10) / 10;

/* ══ 1 · Why businesses grow: where lower unit costs come from (1a) ═════════ */

const economiesSvg = () => {
  const w = 180, h = 56, x1 = 14, x2 = 206, rows = [48, 116, 184];
  return svg(300, [
    title('Where lower costs per unit come from'),
    box(x1, rows[0], w, h, ['Purchasing', 'bulk-buying discounts'], { stroke: BLUE, colour: BLUE }),
    box(x2, rows[0], w, h, ['Technical', 'bigger, faster machines'], { stroke: BLUE, colour: BLUE }),
    box(x1, rows[1], w, h, ['Managerial', 'specialist managers'], { stroke: BLUE, colour: BLUE }),
    box(x2, rows[1], w, h, ['Financial', 'cheaper borrowing'], { stroke: BLUE, colour: BLUE }),
    box(x1, rows[2], w, h, ['Marketing', 'one campaign, more sales'], { stroke: BLUE, colour: BLUE }),
    box(x2, rows[2], w, h, ['External', 'a cluster of skills'], { stroke: GREEN, colour: GREEN }),
    t(FRAME.w / 2, 266, 'Blue: internal, from the firm\'s own size', { anchor: 'middle', fill: BLUE }),
    t(FRAME.w / 2, 286, 'Green: external, from its industry nearby', { anchor: 'middle', fill: GREEN }),
  ].join(''));
};

export const economiesDiagram = {
  id: id('diagram', 'sources of economies of scale internal external'),
  title: 'Sources of Economies of Scale',
  description: 'IAL 3.3.2 · 1a: the five internal economies of scale, which come from the firm\'s own size, and the external economies that come from its industry.',
  checklist: [
    'Purchasing: larger orders win discounts',
    'Technical: bigger machines spread their cost over more units',
    'Managerial: size pays for specialists',
    'Financial: lenders charge a large firm less',
    'Marketing: one campaign is spread over more sales',
    'External: skilled workers and specialist suppliers gather where an industry is large',
  ],
  scenarios: [
    { label: 'Internal and external', svg: economiesSvg() },
  ],
};

/* ══ 2 · Organic growth: four routes (2a) ══════════════════════════════════ */

const organicSvg = () => {
  const w = 180, h = 70, x1 = 14, x2 = 206, y1 = 48, y2 = 138;
  return svg(260, [
    title('Four routes to organic growth'),
    box(x1, y1, w, h, ['More outlets', 'more cafés or', 'a bigger kitchen'], { stroke: AMBER, colour: AMBER }),
    box(x2, y1, w, h, ['New products', 'more to sell to', 'today\'s customers'], { stroke: BLUE, colour: BLUE }),
    box(x1, y2, w, h, ['New markets', 'the same products', 'for new buyers'], { stroke: GREEN, colour: GREEN }),
    box(x2, y2, w, h, ['Online sales', 'an app, a website', 'or a platform'], { stroke: PURPLE, colour: PURPLE }),
    t(FRAME.w / 2, 238, 'Four routes, all built from within', { anchor: 'middle' }),
  ].join(''));
};

export const organicDiagram = {
  id: id('diagram', 'four routes to organic growth'),
  title: 'Methods of Organic Growth',
  description: 'IAL 3.3.2 · 2a: the methods of growing organically, each built by the business itself rather than acquired.',
  checklist: [
    'More outlets or capacity: new sites, a larger kitchen or factory',
    'New products for the customers a firm already has',
    'New markets: the same products for new buyers or places',
    'Online sales: an app, a website or a delivery platform',
  ],
  scenarios: [
    { label: 'The four routes', svg: organicSvg() },
  ],
};

/* ══ 3 · Mergers and takeovers: the chain of production (3a) ═══════════════ */

const chainSvg = () => {
  const cx = 14, cw = 140, ch = 34, rows = [44, 98, 152, 206, 260];
  const names = ['Wheat farms', 'Flour mill', F.name, 'Supermarkets', 'Consumers'];
  const chain = rows.map((y, i) => box(cx, y, cw, ch, [names[i]], { stroke: i === 2 ? AMBER : GRID, colour: i === 2 ? AMBER : INK })).join('');
  const links = rows.slice(0, -1).map((y) => line(cx + cw / 2, y + ch + 2, cx + cw / 2, y + ch + 18, { marker: 'ch' })).join('');
  const midY = rows[2] + ch / 2;
  return svg(330, [
    arrowDefs([['ch', AXIS], ['hz', GREEN]]),
    title('Where each takeover sits in the chain'),
    chain,
    links,
    t(170, rows[1] + 21, 'Buy it: backward vertical', { fill: BLUE, weight: 600 }),
    t(205, rows[2] + 10, 'Horizontal', { anchor: 'middle', fill: GREEN, weight: 600 }),
    line(cx + cw + 4, midY, 254, midY, { stroke: GREEN, marker: 'hz' }),
    box(258, rows[2], 128, ch, [F.rival], { stroke: GREEN, colour: GREEN }),
    t(170, rows[3] + 21, 'Buy them: forward vertical', { fill: BLUE, weight: 600 }),
    t(322, rows[4] - 8, 'Buy it: conglomerate', { anchor: 'middle', fill: PURPLE, weight: 600 }),
    box(258, rows[4], 128, ch, ['Laundry chain'], { stroke: PURPLE, colour: PURPLE }),
    t(FRAME.w / 2, 318, 'Same stage: horizontal · different stage: vertical', { anchor: 'middle', fill: MUTED }),
  ].join(''));
};

export const chainDiagram = {
  id: id('diagram', 'chain of production horizontal vertical conglomerate'),
  title: 'Horizontal, Vertical and Conglomerate Integration',
  description: `IAL 3.3.2 · 3a: where ${F.name}'s possible takeovers sit in the chain from raw materials to consumer.`,
  checklist: [
    `Horizontal: two firms at the same stage, such as ${F.name} and ${F.rival}`,
    'Backward vertical: buying a supplier, towards the raw materials',
    'Forward vertical: buying an outlet, towards the consumer',
    'Conglomerate: a business with no link to the chain at all',
  ],
  scenarios: [
    { label: 'The chain', svg: chainSvg() },
  ],
};

/* ══ 4 · Inorganic growth: what a takeover is weighed on (3a bullet 5, 3b) ═══ */

const weighSvg = () => {
  const w = 180, x1 = 14, x2 = 206, hy = 44, hh = 34, first = 108;
  const left = ['Profit the target earns', 'Savings from combining', 'Market share gained', 'Skills and brands bought'];
  const right = ['A premium over its assets', 'The cost of financing', 'Savings that never arrive', 'Two ways of working'];
  return svg(250, [
    title('Weighing a takeover'),
    box(x1, hy, w, hh, ['Rewards'], { stroke: GREEN, colour: GREEN }),
    box(x2, hy, w, hh, ['Risks'], { stroke: RED, colour: RED }),
    ...left.map((s, i) => t(x1 + 6, first + i * LEAD, s)),
    ...right.map((s, i) => t(x2 + 6, first + i * LEAD, s)),
    t(FRAME.w / 2, 228, 'The deal pays only if the rewards outweigh the price', { anchor: 'middle', fill: MUTED }),
  ].join(''));
};

export const weighDiagram = {
  id: id('diagram', 'weighing a takeover rewards risks'),
  title: 'Weighing a Takeover',
  description: 'IAL 3.3.2 · 3a and 3b: the financial rewards of a takeover set against its risks.',
  checklist: [
    'Rewards: the target\'s profit, savings from combining, market share, skills and brands',
    'Risks: paying a premium, the cost of the finance, savings that fail to appear, combining two workforces',
    'Weigh the yearly gain against the price paid',
  ],
  scenarios: [
    { label: 'Rewards and risks', svg: weighSvg() },
  ],
};

/* ══ 5 · Problems arising from growth: the cost curve (4a) ══════════════════ */

/*
 * The curve is SAMPLED from the function it claims: cost per unit c(q) = 8/q + q/2 + 1 for output
 * q in [1, 10], which falls to a minimum at q = 4 (8/q = q/2) and rises after it. The runner re-derives
 * the minimum from the emitted points.
 */
export const COST_CURVE = { f: (q) => 8 / q + q / 2 + 1, q0: 1, q1: 10, qMin: 4 };
export const PLOT = { x0: 60, x1: 360, yBase: 250, scale: 20 };
export const toX = (q) => PLOT.x0 + ((q - COST_CURVE.q0) / (COST_CURVE.q1 - COST_CURVE.q0)) * (PLOT.x1 - PLOT.x0);
export const toY = (c) => PLOT.yBase - c * PLOT.scale;

const curveSvg = () => {
  const pts = [];
  for (let q = COST_CURVE.q0; q <= COST_CURVE.q1 + 1e-9; q += 0.25) pts.push(`${r1(toX(q))},${r1(toY(COST_CURVE.f(q)))}`);
  const xm = r1(toX(COST_CURVE.qMin));
  const ym = r1(toY(COST_CURVE.f(COST_CURVE.qMin)));
  return svg(290, [
    title('Cost per unit as a firm grows'),
    line(PLOT.x0, 44, PLOT.x0, PLOT.yBase),
    line(PLOT.x0, PLOT.yBase, 372, PLOT.yBase),
    `<polyline points="${pts.join(' ')}" fill="none" stroke="${CYAN}" stroke-width="2.5"/>`,
    line(xm, ym + 4, xm, PLOT.yBase, { stroke: GRID, dash: '4 4' }),
    t(74, 50, 'Cost per unit', { fill: MUTED }),
    t(90, 88, 'Economies of scale', { fill: GREEN, weight: 600 }),
    t(360, 88, 'Diseconomies of scale', { anchor: 'end', fill: RED, weight: 600 }),
    t(xm + 6, 240, 'Lowest cost per unit', { fill: MUTED }),
    t(215, 272, 'Output: the size of the firm', { anchor: 'middle', fill: MUTED }),
  ].join(''));
};

export const curveDiagram = {
  id: id('diagram', 'cost per unit economies diseconomies curve'),
  title: 'Economies and Diseconomies of Scale',
  description: 'IAL 3.3.2 · 4a: cost per unit falls while economies of scale outweigh the problems of size, reaches a lowest point, and rises once diseconomies of scale take over.',
  checklist: [
    'Left of the lowest point: economies of scale, cost per unit falling',
    'Right of it: diseconomies of scale, cost per unit rising',
    'Growth lowers unit costs only up to a point',
  ],
  scenarios: [
    { label: 'The cost curve', svg: curveSvg() },
  ],
};

/* ── the array order IS the chapter order, and the runner derives pins from it ── */
export const DIAGRAMS = [economiesDiagram, organicDiagram, chainDiagram, weighDiagram, curveDiagram];
export const ALL_DIAGRAMS = DIAGRAMS;
