/**
 * PACKET 15 — introductory-concepts: five diagrams, each pinned to a chapter by id.
 *
 * Conventions from the live census: a 500-unit-wide viewBox, labels at 9-13 units (the phone sheet
 * draws at 220vw, so 9 units is 15px at 390px), palette colours that components/learn-mode/processSvg.js
 * remaps onto theme tokens, strokes >= 2, and text placed from the geometry of the line it names.
 *
 * The frontier is drawn by sampling ppfK() itself, so the curve a student sees and the arithmetic the
 * body works are the same function. accuracy-01 found the March path bulging convex between C and D
 * while the checklist beside it told students a PPF is concave; a sampled strictly-concave function
 * cannot do that, and the runner re-checks the gradient of the emitted path before staging.
 */
import { id, ppfK, PPF_POINTS } from './_packet15-util.mjs';

const INK = '#e8ecf5', AXIS = '#94a3b8', GRID = '#475569', MUTED = '#7a8299';
const BLUE = '#3b82f6', GREEN = '#059669', RED = '#ef4444', AMBER = '#f59e0b', PURPLE = '#8b5cf6';
const open = (h = 330) => `<svg width="500" height="${h}" viewBox="0 0 500 ${h}" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',system-ui,sans-serif;background:transparent"><defs><marker id="arr" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="${AXIS}"/></marker><marker id="arrRed" markerWidth="9" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="${RED}"/></marker><marker id="arrGreen" markerWidth="9" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="${GREEN}"/></marker><marker id="arrBlue" markerWidth="9" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="${BLUE}"/></marker></defs>`;
const close = '</svg>';
const t = (x, y, text, { size = 10, fill = INK, anchor = 'start', weight = 400, rotate = null } = {}) =>
  `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}"${rotate ? ` transform="rotate(${rotate},${x},${y})"` : ''}>${text}</text>`;
const line = (x1, y1, x2, y2, stroke, w = 2, extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${w}"${extra}/>`;
const dot = (x, y, fill, r = 4.5) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;
const box = (x, y, w, h, stroke, fill = 'none', rx = 8) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
const dash = ' stroke-dasharray="6,4"';
const r1 = (n) => Math.round(n * 10) / 10;
// Screen coordinates for the frontier are kept to two decimals. At 101 samples the steps near the flat
// left-hand end are small enough that rounding to one decimal makes the DISCRETE gradient wobble, which
// the runner's concavity check reads — correctly — as a curve that is not concave.
const r2 = (n) => Math.round(n * 100) / 100;

/* ── the frontier's geometry, shared by the two PPF diagrams ───────────────── */
const X0 = 78, Y0 = 270, XMAX = 452, YTOP = 45;          // axes in screen units
const SX = (C, xmax = 50) => r2(X0 + (C / xmax) * (XMAX - X0));
const SY = (K, ymax = 40) => r2(Y0 - (K / ymax) * (Y0 - YTOP));
/**
 * The frontier as a polyline sampled from ppfK itself — so the drawn curve IS the function.
 * `scale` expands it homothetically: every point (C, K) becomes (kC, kK), which is what "more of every
 * resource" looks like. The domain is widened for the shift diagrams so the expanded curve still meets
 * both axes inside the plot rather than running off the end of one.
 */
const frontierPath = (scale = 1, xmax = 50, ymax = 40) => {
  const pts = [];
  for (let i = 0; i <= 100; i += 1) {
    const C = (i / 100) * 50;
    pts.push(`${SX(C * scale, xmax)},${SY(ppfK(C) * scale, ymax)}`);
  }
  return pts.join(' ');
};
const axes = (xLabel = 'Consumer goods (thousand units)', yLabel = 'Capital goods (thousand units)') => [
  line(X0, Y0, XMAX + 15, Y0, AXIS, 2, ' marker-end="url(#arr)"'),
  line(X0, Y0, X0, YTOP - 15, AXIS, 2, ' marker-end="url(#arr)"'),
  // Centred under the axis, clear of point F, and rotated about the middle of its own axis so it fits.
  t((X0 + XMAX) / 2, Y0 + 34, xLabel, { size: 10, fill: MUTED, anchor: 'middle' }),
  t(22, (YTOP + Y0) / 2, yLabel, { size: 10, fill: MUTED, rotate: -90, anchor: 'middle' }),
  t(X0 - 9, Y0 + 14, '0', { size: 9, fill: MUTED, anchor: 'middle' }),
].join('');

/* ── 1. Scarcity forces choice, and choice has a cost ──────────────────────── */
function scarcitySvg() {
  const s = [open(300)];
  const bw = 130, bh = 52;
  const cols = [30, 185, 340];
  s.push(box(cols[0], 30, bw, bh, BLUE), t(cols[0] + bw / 2, 52, 'Unlimited wants', { size: 11, weight: 600, anchor: 'middle', fill: BLUE }), t(cols[0] + bw / 2, 68, 'always more than', { size: 9, anchor: 'middle', fill: MUTED }));
  s.push(box(cols[0], 110, bw, bh, BLUE), t(cols[0] + bw / 2, 132, 'Finite resources', { size: 11, weight: 600, anchor: 'middle', fill: BLUE }), t(cols[0] + bw / 2, 148, 'land · labour · capital · enterprise', { size: 8, anchor: 'middle', fill: MUTED }));
  s.push(line(cols[0] + bw + 4, 56, cols[1] - 6, 82, AXIS, 2, ' marker-end="url(#arr)"'));
  s.push(line(cols[0] + bw + 4, 136, cols[1] - 6, 110, AXIS, 2, ' marker-end="url(#arr)"'));
  s.push(box(cols[1], 70, bw, bh, AMBER), t(cols[1] + bw / 2, 92, 'SCARCITY', { size: 12, weight: 700, anchor: 'middle', fill: AMBER }), t(cols[1] + bw / 2, 108, 'the basic economic problem', { size: 8, anchor: 'middle', fill: MUTED }));
  s.push(line(cols[1] + bw / 2, 70 + bh + 4, cols[1] + bw / 2, 158, AXIS, 2, ' marker-end="url(#arr)"'));
  s.push(box(cols[1], 162, bw, bh, PURPLE), t(cols[1] + bw / 2, 184, 'CHOICE', { size: 12, weight: 700, anchor: 'middle', fill: PURPLE }), t(cols[1] + bw / 2, 200, 'what · how · for whom', { size: 8, anchor: 'middle', fill: MUTED }));
  s.push(line(cols[1] + bw + 4, 188, cols[2] - 6, 188, AXIS, 2, ' marker-end="url(#arr)"'));
  s.push(box(cols[2], 158, bw, 62, RED), t(cols[2] + bw / 2, 182, 'OPPORTUNITY COST', { size: 10, weight: 700, anchor: 'middle', fill: RED }), t(cols[2] + bw / 2, 198, 'the next best', { size: 8, anchor: 'middle', fill: MUTED }));
  s.push(t(cols[2] + bw / 2, 211, 'alternative forgone', { size: 8, anchor: 'middle', fill: MUTED }));
  s.push(line(30, 245, 470, 245, GRID, 1, dash));
  s.push(t(30, 266, 'An economic good is scarce, so it has a positive opportunity cost.', { size: 10, fill: INK }));
  s.push(t(30, 284, 'A free good is not scarce, so producing or taking one costs nothing forgone.', { size: 10, fill: GREEN }));
  s.push(close);
  return s.join('');
}

/* ── 2. Maraya's PPF: reading it, and opportunity cost through marginal analysis ── */
function ppfBaseSvg() {
  const s = [open(360), axes()];
  s.push(`<polyline points="${frontierPath()}" fill="none" stroke="${BLUE}" stroke-width="3"/>`);
  for (const p of PPF_POINTS) {
    const x = SX(p.C), y = SY(p.K);
    s.push(dot(x, y, BLUE));
    const above = p.name === 'F';
    const dxl = p.name === 'A' ? 12 : 8;
    s.push(t(above ? x - 8 : x + dxl, above ? y - 24 : y - 8, p.name, { size: 11, weight: 700, fill: BLUE, anchor: above ? 'end' : 'start' }));
    s.push(t(above ? x - 8 : x + dxl, above ? y - 11 : y + 6, `(${p.C}, ${p.K})`, { size: 8.5, fill: MUTED, anchor: above ? 'end' : 'start' }));
  }
  // G inside the frontier, H beyond it.
  const gx = SX(20), gy = SY(20), hx = SX(40), hy = SY(32);
  s.push(dot(gx, gy, AMBER), t(gx + 9, gy + 4, 'G', { size: 11, weight: 700, fill: AMBER }));
  s.push(dot(hx, hy, RED), t(hx + 9, hy + 4, 'H', { size: 11, weight: 700, fill: RED }));
  s.push(t(30, 324, 'A–F on the frontier: every resource used, and used well — productively efficient', { size: 10, fill: BLUE }));
  s.push(t(30, 342, 'G inside: resources unemployed or misallocated · H beyond: unattainable today', { size: 10, fill: MUTED }));
  return s.join('') + close;
}

function ppfMarginalSvg() {
  const s = [open(360), axes()];
  s.push(`<polyline points="${frontierPath()}" fill="none" stroke="${BLUE}" stroke-width="3" opacity="0.55"/>`);
  const C = PPF_POINTS[2], D = PPF_POINTS[3];
  const cx = SX(C.C), cy = SY(C.K), dx = SX(D.C), dy = SY(D.K);
  s.push(dot(cx, cy, BLUE), t(cx - 10, cy + 16, 'C (20, 33)', { size: 10, weight: 600, fill: BLUE, anchor: 'end' }));
  s.push(dot(dx, dy, BLUE), t(dx + 9, dy - 6, 'D (30, 25)', { size: 10, weight: 600, fill: BLUE }));
  // the step: across then down
  s.push(line(cx, cy, dx, cy, GREEN, 2.5, ' marker-end="url(#arrGreen)"'));
  s.push(line(dx, cy, dx, dy, RED, 2.5, ' marker-end="url(#arrRed)"'));
  s.push(t((cx + dx) / 2, cy - 10, '+10 consumer goods', { size: 10, weight: 600, fill: GREEN, anchor: 'middle' }));
  s.push(t(dx + 10, (cy + dy) / 2 + 4, '−8 capital goods', { size: 10, weight: 600, fill: RED }));
  s.push(line(X0, cy, cx, cy, GRID, 1.5, dash), line(X0, dy, dx, dy, GRID, 1.5, dash));
  s.push(t(X0 - 8, cy + 4, '33', { size: 9, fill: MUTED, anchor: 'end' }), t(X0 - 8, dy + 4, '25', { size: 9, fill: MUTED, anchor: 'end' }));
  s.push(line(cx, Y0, cx, cy, GRID, 1.5, dash), line(dx, Y0, dx, dy, GRID, 1.5, dash));
  s.push(t(cx, Y0 + 15, '20', { size: 9, fill: MUTED, anchor: 'middle' }), t(dx, Y0 + 15, '30', { size: 9, fill: MUTED, anchor: 'middle' }));
  s.push(t(30, 324, 'Opportunity cost of one more consumer good, C to D  =  8 ÷ 10  =  0.8 capital goods', { size: 10.5, weight: 600, fill: INK }));
  s.push(t(30, 342, 'A to B it was 0.2, B to C 0.5, D to E 1.1, E to F 1.4 — each step costs more than the last', { size: 9.5, fill: MUTED }));
  return s.join('') + close;
}

/* ── 3. Movements along the frontier versus shifts of it ───────────────────
 * These three share a wider domain (65 x 52) than the two diagrams above, so that the outward-shifted
 * frontier meets both axes inside the plot. The base curve is the same function at the same values;
 * only the scale it is drawn at differs, and the axis labels say so.
 */
const XMAXV = 65, YMAXV = 52;
const sx = (C) => SX(C, XMAXV), sy = (K) => SY(K, YMAXV);

function ppfMovementSvg() {
  const s = [open(340), axes()];
  s.push(`<polyline points="${frontierPath(1, XMAXV, YMAXV)}" fill="none" stroke="${BLUE}" stroke-width="3"/>`);
  const gx = sx(20), gy = sy(20), dx = sx(30), dy = sy(25);
  s.push(dot(gx, gy, AMBER), t(gx - 8, gy + 4, 'G', { size: 11, weight: 700, fill: AMBER, anchor: 'end' }));
  s.push(dot(dx, dy, BLUE), t(dx + 9, dy - 6, 'D', { size: 11, weight: 700, fill: BLUE }));
  s.push(`<path d="M ${gx + 6} ${gy - 4} Q ${(gx + dx) / 2 + 14} ${(gy + dy) / 2 - 16} ${dx - 6} ${dy + 6}" fill="none" stroke="${GREEN}" stroke-width="2.5" marker-end="url(#arrGreen)"/>`);
  s.push(t(30, 328, 'Movement G \u2192 D: idle resources put to work. The frontier itself has not moved.', { size: 10, fill: GREEN }));
  return s.join('') + close;
}

function ppfShiftSvg(direction) {
  const out = direction === 'out';
  const k = out ? 1.25 : 0.75;
  const s = [open(340), axes()];
  s.push(`<polyline points="${frontierPath(1, XMAXV, YMAXV)}" fill="none" stroke="${BLUE}" stroke-width="3" opacity="${out ? 0.45 : 1}"/>`);
  s.push(`<polyline points="${frontierPath(k, XMAXV, YMAXV)}" fill="none" stroke="${out ? GREEN : RED}" stroke-width="3"/>`);
  // One arrow from a point on the original curve to the same point on the shifted one.
  const C = 30;
  const from = [sx(C), sy(ppfK(C))];
  const to = [sx(C * k), sy(ppfK(C) * k)];
  s.push(line(from[0], from[1], to[0], to[1], out ? GREEN : RED, 2.5, ` marker-end="url(#arr${out ? 'Green' : 'Red'})"`));
  s.push(t(30, 328, out
    ? 'Outward shift: more resources, better resources, or better technology \u2014 economic growth.'
    : 'Inward shift: resources lost or destroyed \u2014 war, disaster, emigration \u2014 economic decline.',
    { size: 10, fill: out ? GREEN : RED }));
  return s.join('') + close;
}

/* ── 4. Why money beats barter ─────────────────────────────────────────────── */
function barterSvg() {
  const s = [open(300)];
  s.push(t(250, 28, 'Barter: an exchange needs a double coincidence of wants', { size: 11, weight: 600, anchor: 'middle', fill: AMBER }));
  const people = [['Rice farmer', 'has rice, wants a net', 40], ['Net maker', 'has nets, wants a goat', 190], ['Goat herder', 'has goats, wants rice', 340]];
  for (const [name, wants, x] of people) {
    s.push(box(x, 52, 120, 56, AMBER), t(x + 60, 74, name, { size: 10.5, weight: 600, anchor: 'middle', fill: INK }), t(x + 60, 92, wants, { size: 8.5, anchor: 'middle', fill: MUTED }));
  }
  s.push(line(164, 80, 184, 80, RED, 2, ' marker-end="url(#arrRed)"'), line(314, 80, 334, 80, RED, 2, ' marker-end="url(#arrRed)"'));
  s.push(t(250, 128, 'No two of them want what the other holds, so nothing is traded.', { size: 10, anchor: 'middle', fill: RED }));
  s.push(line(30, 148, 470, 148, GRID, 1, dash));
  s.push(t(250, 174, 'Money: each sells for money, then buys what they want', { size: 11, weight: 600, anchor: 'middle', fill: GREEN }));
  const fns = [['Medium of exchange', 'accepted by everyone', 26], ['Measure of value', 'one scale of prices', 145], ['Store of value', 'holds worth over time', 264], ['Deferred payment', 'debts settled later', 383]];
  for (const [name, note, x] of fns) {
    s.push(box(x, 196, 108, 54, GREEN), t(x + 54, 218, name, { size: 9.5, weight: 600, anchor: 'middle', fill: INK }), t(x + 54, 236, note, { size: 8, anchor: 'middle', fill: MUTED }));
  }
  s.push(t(250, 278, 'Each function removes a barrier barter puts in the way of specialisation.', { size: 10, anchor: 'middle', fill: GREEN }));
  return s.join('') + close;
}

/* ── 5. The three economic systems, kept from March with its id ────────────── */
// The March SVG is sound — a spectrum from Hong Kong to North Korea with each system's features,
// advantages and disadvantages — and it is the one asset topFix-04 says to link rather than replace.
// Its id is kept so no progress row or pin is orphaned; only the description and checklist are rewritten
// to say what a student should check, and the price-mechanism wording that belongs to 1.3.4 is not added.
import { readFileSync } from 'node:fs';
const ECONOMIC_SYSTEMS_SVG = readFileSync(new URL('./_packet15-systems.svg', import.meta.url), 'utf8').trim();

const diagram = (title, description, checklist, svgOrScenarios, keptId) => ({
  id: keptId || id('diagram', title),
  title,
  description,
  checklist,
  ...(Array.isArray(svgOrScenarios) ? { scenarios: svgOrScenarios } : { svg: svgOrScenarios }),
});

export const DIAGRAMS = [
  diagram('Scarcity, Choice and Opportunity Cost',
    'Unlimited wants meeting finite resources is scarcity; scarcity forces a choice about what to produce, how to produce it and who receives it; and every choice costs the next best alternative forgone. A free good is the one case where nothing is forgone.',
    ['Unlimited wants and finite resources shown as the two causes of scarcity', 'Scarcity leading to choice, and choice leading to opportunity cost', 'The three questions every economy answers: what, how and for whom', 'Opportunity cost defined as the NEXT best alternative, not all of them', 'Free goods marked out as the goods with zero opportunity cost'],
    scarcitySvg()),
  diagram('Maraya\'s Production Possibility Frontier',
    'Maraya can make 40 thousand capital goods and no consumer goods (A), 50 thousand consumer goods and no capital goods (F), or any combination on the curve between them. Points on the curve are productively efficient, G inside shows unemployed or misallocated resources, and H beyond it is unattainable with today\'s resources. The second view reads the opportunity cost off the curve: moving from C to D gains 10 thousand consumer goods and costs 8 thousand capital goods, so one consumer good costs 0.8 capital goods.',
    ['Both axes labelled with the good and its units', 'The frontier drawn as a curve bowed outward from the origin, never straight and never wavy', 'A point on the frontier, a point inside it and a point beyond it, each labelled', 'The opportunity cost read as the capital goods given up divided by the consumer goods gained', 'The cost per unit rising along the curve: 0.2, 0.5, 0.8, 1.1, 1.4', 'A movement drawn between two points on the SAME curve; a shift drawn as a second curve with the original left visible', 'Outward shift labelled with its causes (more or better resources, better technology) and inward with its own (resources lost or destroyed)'],
    [
      { label: 'Reading the frontier', svg: ppfBaseSvg() },
      { label: 'Opportunity cost, C to D', svg: ppfMarginalSvg() },
      { label: 'Movement along the frontier', svg: ppfMovementSvg() },
      { label: 'Outward shift: growth', svg: ppfShiftSvg('out') },
      { label: 'Inward shift: decline', svg: ppfShiftSvg('in') },
    ],
    'introductory-concepts:diagram:682b24c2'),   // topFix-03 says redraw the Base PPF, so it keeps its identity
  diagram('Why Money Beats Barter',
    'Barter needs a double coincidence of wants: each side must hold exactly what the other wants. With three traders who each want what a third holds, nothing is traded at all. Money breaks the deadlock, and its four functions each remove one barrier that barter puts in the way of specialisation.',
    ['The double coincidence of wants shown as the barrier barter creates', 'Each trader holding one good and wanting another', 'The four functions of money named: medium of exchange, measure of value, store of value, method of deferred payment', 'Each function linked to the barrier it removes', 'The link back to specialisation: without money, specialising is not worth it'],
    barterSvg()),
  diagram('The Three Economic Systems Compared',
    'Free market, mixed and command economies placed on a spectrum by how much the state decides. Each is shown with how it allocates resources, who owns the means of production, and the advantages and disadvantages that follow from that.',
    ['The three systems placed on a spectrum, not as three unrelated boxes', 'Who owns resources and who decides, in each system', 'At least two advantages and two disadvantages for the free market and for the command economy', 'The mixed economy shown as a combination rather than a fourth type', 'Real economies placed on the spectrum, none of them purely one type'],
    ECONOMIC_SYSTEMS_SVG,
    'introductory-concepts:diagram:88569cd6'),
];
