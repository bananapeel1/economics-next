/**
 * PACKET 43 — economic-growth diagrams. Four, each pinned by `diagramId` to the chapter whose text
 * teaches what it draws; the benefits chapter is pinned `diagramId: null` (decided: none), because
 * nothing it teaches is a diagram and packet 2.91's rule is that a chapter shows a diagram only if
 * its text teaches what the diagram draws.
 *
 * ── `topFix-01`, `structure-01` AND `diagram-01/02/03` ARE ONE DEFECT ─────────
 *
 * The live blocks pin by `diagramRef` strings (`ad-as-growth`, `output-gap-diagram`,
 * `trade-cycle-diagram`, `ad-as-shifts`, `ad-as-growth-analysis`) and the three live diagrams carry
 * no `id` at all, so no pin resolves and no chapter shows a diagram. `topFix-01` asks for the refs to
 * be renamed to match titles or the matcher normalised. Neither: the title matcher is the legacy
 * path (`lib/checkin-fallback.js`), and `npm run attribution` now FAILS a staged section that places
 * a diagram by title (packet 2.91). Every diagram here mints a stable `id`, every chapter pins by
 * `diagramId`, and `diagram-01`'s "one drawing cannot serve three blocks" is met by drawing the AD
 * view as scenarios of ONE chapter's diagram — the three live blocks that wanted it are merged
 * (`structure-02`, `topFix-05`), so the three broken refs become one pinned diagram.
 *
 * ── A DIAGRAM WHOSE GEOMETRY IS A CLAIM IS DRAWN BY SAMPLING THE FUNCTION (packet 15) ──
 *
 * The frontier is a quarter-ellipse, concave by construction. The Keynesian long-run AS curve is
 * one function — flat, then rising, then vertical at full capacity — and every equilibrium is
 * SOLVED against it by bisection, never placed by eye. The claims the text makes about the
 * pictures (an AD shift with spare capacity raises output and not the price level; near capacity
 * it mostly raises the price level; a rightward LRAS shift raises output and LOWERS the price
 * level) are exported as numbers and asserted by the runner. `topFix-04`'s "elastic section of
 * SRAS" slip is the reason there is ONE aggregate supply model in this section, named as the
 * Keynesian long-run curve of topic 2.3.3, not a short-run curve with an elastic section.
 *
 * Every figure on the output-gap chart is read off `ECON`, and the runner counts them back out.
 */
import { id, ECON, bn, pct, round1 } from './_packet43-util.mjs';

const E = ECON;

/* ── the frame, the two type sizes, and the collision tolerance (packet 40) ── */
export const FRAME = { w: 400, pad: 16 };
export const FACE = 15;
export const SMALL = 12;
export const MIN_FACE = SMALL;
/** The runner's glyph-box guard calls two labels one cluster within this fraction of a face. */
export const COLLIDE_TOL = 1.2;
/** What this module leaves between stacked rows of text: 20 > 1.2 × 15, so a row cannot trip it. */
export const LEAD = 20;

/* ── palette, all of it keys of processSvg's PALETTE (the runner parses that file) ── */
const INK = '#e8ecf5';
const MUTED = '#7a8299';
const AXIS = '#94a3b8';
const GRID = '#475569';
const GREEN = '#34d399';
const RED = '#f87171';
const BLUE = '#60a5fa';
const AMBER = '#f59e0b';
const PURPLE = '#a78bfa';

/** A rough text width, used by the runner's overrun and collision checks. DM Sans at ~0.56em. */
export const estWidth = (text, size = FACE) => String(text).length * size * 0.56;

const r1 = (n) => Math.round(n * 10) / 10;
const svg = (h, body) => `<svg width="${FRAME.w}" height="${h}" viewBox="0 0 ${FRAME.w} ${h}" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',system-ui,sans-serif;background:transparent">${body}</svg>`;
const t = (x, y, str, { size = FACE, fill = INK, anchor = 'start', weight = 400 } = {}) =>
  `<text x="${r1(x)}" y="${r1(y)}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" font-weight="${weight}">${str}</text>`;
const line = (x1, y1, x2, y2, { stroke = AXIS, sw = 1.5, dash = null, marker = null } = {}) =>
  `<line x1="${r1(x1)}" y1="${r1(y1)}" x2="${r1(x2)}" y2="${r1(y2)}" stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ''}${marker ? ` marker-end="url(#${marker})"` : ''}/>`;
const path = (pts, { stroke = AXIS, sw = 2.5, dash = null } = {}) =>
  `<path d="${pts.map(([x, y], i) => `${i ? 'L' : 'M'} ${r1(x)} ${r1(y)}`).join(' ')}" fill="none" stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
const area = (pts, fill) =>
  `<path d="${pts.map(([x, y], i) => `${i ? 'L' : 'M'} ${r1(x)} ${r1(y)}`).join(' ')} Z" fill="${fill}" fill-opacity="0.18" stroke="none"/>`;
const dot = (x, y, fill = INK) => `<circle cx="${r1(x)}" cy="${r1(y)}" r="4" fill="${fill}"/>`;
const arrowDefs = (colours) => `<defs>${colours.map(([name, c]) => `<marker id="${name}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${c}"/></marker>`).join('')}</defs>`;

/* ══ The frontier · a quarter-ellipse, concave to the origin by construction ══ */

export const PPF = { ox: 60, oy: 270, cMax: 220, kMax: 170 };
/** A point on a frontier scaled by `s`, at angle θ from the consumer-goods axis. */
export const onFrontier = (theta, s = 1, f = PPF) => [f.ox + s * f.cMax * Math.cos(theta), f.oy - s * f.kMax * Math.sin(theta)];
/** Where a point sits against the frontier: < 1 inside, 1 on it, > 1 outside. */
export const frontierIndex = ([x, y], s = 1, f = PPF) => ((x - f.ox) / (s * f.cMax)) ** 2 + ((f.oy - y) / (s * f.kMax)) ** 2;
const frontierPts = (s, n = 41) => Array.from({ length: n }, (_, i) => onFrontier((i / (n - 1)) * (Math.PI / 2), s));
/** Sampled for the runner: the frontier's slope must steepen along it (concavity, packet 15). */
export const FRONTIER_SAMPLES = frontierPts(1, 101);

const ppfAxes = (h, { vLabel = 'Capital goods', hLabel = 'Consumer goods' } = {}) => [
  line(PPF.ox, 58, PPF.ox, PPF.oy),
  line(PPF.ox, PPF.oy, 380, PPF.oy),
  t(24, 46, vLabel, { size: SMALL, fill: MUTED }),
  t(380, PPF.oy + 30, hLabel, { size: SMALL, fill: MUTED, anchor: 'end' }),
  t(PPF.ox - 8, PPF.oy + 16, '0', { size: SMALL, fill: MUTED, anchor: 'end' }),
];

/* ══ 1 · Actual and potential growth (2.3.5 · 1a, 1b) ══════════════════════ */

/* the three points of the first view, exported so the runner can place them against the curves */
const THETA_AP = Math.PI / 4;
export const AP = {
  A: onFrontier(THETA_AP, 0.62),      // inside: idle resources
  B: onFrontier(THETA_AP, 1),         // on the frontier
  C: onFrontier(THETA_AP, 1.2),       // on the shifted frontier
  shift: 1.2,
};

const actualPotentialSvg = () => {
  const h = 356;
  const [ax, ay] = AP.A; const [bx, by] = AP.B; const [cx, cy] = AP.C;
  return svg(h, [
    arrowDefs([['g1', GREEN], ['b1', BLUE]]),
    t(FRAME.w / 2, 24, 'Actual and potential growth on the PPF', { anchor: 'middle', weight: 600 }),
    ...ppfAxes(h),
    path(frontierPts(1), { stroke: AXIS }),
    path(frontierPts(AP.shift), { stroke: BLUE, dash: '6 4' }),
    t(PPF.ox + PPF.cMax + 4, PPF.oy - 12, 'PPF₁', { size: SMALL, fill: AXIS }),
    t(PPF.ox + PPF.cMax * AP.shift + 4, PPF.oy - 12, 'PPF₂', { size: SMALL, fill: BLUE }),
    line(ax, ay, bx - 4, by + 3, { stroke: GREEN, sw: 2, marker: 'g1' }),
    line(bx, by, cx - 4, cy + 3, { stroke: BLUE, sw: 2, marker: 'b1' }),
    dot(ax, ay, GREEN), dot(bx, by, INK), dot(cx, cy, BLUE),
    t(ax - 16, ay + 18, 'A', { size: SMALL, fill: GREEN, weight: 600 }),
    t(bx + 10, by + 10, 'B', { size: SMALL, fill: INK, weight: 600 }),
    t(cx + 8, cy - 6, 'C', { size: SMALL, fill: BLUE, weight: 600 }),
    t(24, 322, 'A to B: actual growth, idle resources used', { size: SMALL, fill: GREEN }),
    t(24, 342, 'B to C: potential growth, the frontier shifts out', { size: SMALL, fill: BLUE }),
  ].join(''));
};

/* ══ The Keynesian long-run AS curve · one function, and equilibria SOLVED ═══ */

/*
 * Flat at the price level `pFlat` while output is below `x1` (plenty of spare capacity), then
 * rising ever more steeply, and vertical at full capacity `yf` — reaching the top of the plot at
 * `xTop`. Screen coordinates: a larger y is a LOWER price level.
 */
export const makeAS = ({ x1 = 210, yf = 330, xTop = 322, pFlat = 210, yTop = 60 } = {}) => {
  const k = (pFlat - yTop) / (1 / (yf - xTop) - 1 / (yf - x1));
  const at = (x) => (x <= x1 ? pFlat : pFlat - k * (1 / (yf - x) - 1 / (yf - x1)));
  return { x1, yf, xTop, pFlat, yTop, k, at };
};
/** An AD line through (x0, y0), sloping down to the right in price (so DOWN the screen). */
export const AD_SLOPE = 2;
export const makeAD = (x0, y0, slope = AD_SLOPE) => ({ x0, y0, slope, at: (x) => y0 + slope * (x - x0) });
/** Where AD meets AS, by bisection on the difference between them. */
export const solve = (ad, as) => {
  let lo = 62, hi = as.xTop;
  const f = (x) => ad.at(x) - as.at(x);
  if (f(lo) * f(hi) > 0) return null;
  for (let i = 0; i < 80; i += 1) {
    const mid = (lo + hi) / 2;
    if (f(lo) * f(mid) <= 0) hi = mid; else lo = mid;
  }
  const x = (lo + hi) / 2;
  return { x, y: as.at(x) };
};

const AS1 = makeAS();
/* spare capacity: AD₁ → AD₂ both meet the flat range */
const AD_SPARE = [makeAD(140, AS1.pFlat), makeAD(195, AS1.pFlat)];
/* near capacity: AD₃ → AD₄ meet the steep range — the SAME horizontal shift */
const NEAR_X = 292;
const AD_NEAR = [makeAD(NEAR_X, AS1.at(NEAR_X)), makeAD(NEAR_X + 55, AS1.at(NEAR_X))];
export const EQ = {
  spare: AD_SPARE.map((ad) => solve(ad, AS1)),
  near: AD_NEAR.map((ad) => solve(ad, AS1)),
  shift: 55,
  as: AS1,
};

const adAxes = () => [
  line(60, 58, 60, 270),
  line(60, 270, 380, 270),
  t(24, 46, 'Price level', { size: SMALL, fill: MUTED }),
  t(380, 308, 'Real output', { size: SMALL, fill: MUTED, anchor: 'end' }),
];
const asCurve = (as, colour = AXIS) => {
  const pts = [];
  for (let x = 64; x <= as.xTop + 1e-9; x += 2) pts.push([x, as.at(x)]);
  pts.push([as.xTop, as.yTop]);
  return path(pts, { stroke: colour });
};
const AD_TOP = 86;
const adTopX = (ad) => ad.x0 + (AD_TOP - ad.y0) / ad.slope;
const adLine = (ad, colour, dash = null) => {
  /* drawn from near the top of the plot down to the output axis */
  const xEnd = ad.x0 + (262 - ad.y0) / ad.slope;
  return path([[adTopX(ad), AD_TOP], [xEnd, 262]], { stroke: colour, sw: 2.5, dash });
};
const drops = (eq, colour) => [
  line(eq.x, eq.y, eq.x, 270, { stroke: GRID, sw: 1, dash: '3 3' }),
  line(60, eq.y, eq.x, eq.y, { stroke: GRID, sw: 1, dash: '3 3' }),
  dot(eq.x, eq.y, colour),
];

/** Y₁ / Y₂ under the axis, pushed apart so a small change still reads as two labels. */
const yLabels = (e1, e2) => [
  t(e1.x - 2, 288, 'Y₁', { size: SMALL, fill: MUTED, anchor: 'end' }),
  t(e2.x + 2, 288, 'Y₂', { size: SMALL, fill: MUTED }),
];
/** P₁ / P₂ left of the axis; one label when the price level has not moved. */
const pLabels = (e1, e2) => (Math.abs(e2.y - e1.y) >= 16
  ? [t(54, e1.y + 4, 'P₁', { size: SMALL, fill: MUTED, anchor: 'end' }), t(54, e2.y + 4, 'P₂', { size: SMALL, fill: MUTED, anchor: 'end' })]
  : [t(54, e1.y + 4, 'P', { size: SMALL, fill: MUTED, anchor: 'end' })]);

const adShiftSvg = (which) => {
  const h = 364;
  const ads = which === 'spare' ? AD_SPARE : AD_NEAR;
  const [e1, e2] = EQ[which];
  const title = which === 'spare' ? 'AD rises with spare capacity' : 'AD rises near full capacity';
  const note1 = which === 'spare'
    ? 'Output rises from Y₁ to Y₂; the price level does not'
    : 'Output rises by less; the price level rises';
  return svg(h, [
    t(FRAME.w / 2, 24, title, { anchor: 'middle', weight: 600 }),
    ...adAxes(),
    asCurve(AS1),
    t(AS1.xTop + 6, 70, 'LRAS', { size: SMALL, fill: AXIS }),
    adLine(ads[0], AMBER),
    adLine(ads[1], AMBER, '6 4'),
    ...(which === 'spare'
      ? [t(adTopX(ads[0]) + 6, AD_TOP - 2, 'AD₁', { size: SMALL, fill: AMBER }), t(adTopX(ads[1]) + 6, AD_TOP - 2, 'AD₂', { size: SMALL, fill: AMBER })]
      : [t(adTopX(ads[0]) - 6, AD_TOP + 4, 'AD₁', { size: SMALL, fill: AMBER, anchor: 'end' }), t(adTopX(ads[1]) - 6, AD_TOP + 4, 'AD₂', { size: SMALL, fill: AMBER, anchor: 'end' })]),
    ...drops(e1, INK), ...drops(e2, AMBER),
    ...yLabels(e1, e2),
    ...pLabels(e1, e2),
    t(24, 330, note1, { size: SMALL, fill: INK }),
    t(24, 350, 'Keynesian LRAS: flat, then rising, then vertical', { size: SMALL, fill: MUTED }),
  ].join(''));
};

export const actualPotentialDiagram = {
  id: id('diagram', 'actual and potential growth ppf and ad'),
  title: 'Actual and Potential Growth',
  description: 'IAL 2.3.5 · 1a, 1b: actual growth as a move from inside the PPF towards it, potential growth as an outward shift, and an increase in AD with and without spare capacity.',
  checklist: [
    'Actual growth drawn from a point INSIDE the frontier towards it, not along it',
    'Potential growth drawn as an outward shift of the whole frontier',
    'On AD/AS, the AD shift labelled AD₁ to AD₂ with both equilibria marked',
    'With spare capacity output rises and the price level does not; near capacity the price level rises',
  ],
  scenarios: [
    { label: 'On the PPF', svg: actualPotentialSvg() },
    { label: 'AD, spare capacity', svg: adShiftSvg('spare') },
    { label: 'AD, near capacity', svg: adShiftSvg('near') },
  ],
};

/* ══ 2 · Potential growth moves long-run AS (2.3.5 · 1d, 1e) ═════════════════ */

const LRAS_SHIFT = 60;
const AS2a = makeAS({ x1: 160, yf: 290, xTop: 282 });
const AS2b = makeAS({ x1: 160 + LRAS_SHIFT, yf: 290 + LRAS_SHIFT, xTop: 282 + LRAS_SHIFT });
const AD_CAP = makeAD(272, AS2a.at(272));
export const LR = { before: solve(AD_CAP, AS2a), after: solve(AD_CAP, AS2b), shift: LRAS_SHIFT, as1: AS2a, as2: AS2b };

const lrasSvg = () => {
  const h = 364;
  const { before: e1, after: e2 } = LR;
  return svg(h, [
    arrowDefs([['bl', BLUE]]),
    t(FRAME.w / 2, 24, 'Capacity rises: LRAS shifts right', { anchor: 'middle', weight: 600 }),
    ...adAxes(),
    asCurve(AS2a),
    asCurve(AS2b, BLUE),
    t(AS2a.xTop - 6, 60, 'LRAS₁', { size: SMALL, fill: AXIS, anchor: 'end' }),
    t(AS2b.xTop + 6, 70, 'LRAS₂', { size: SMALL, fill: BLUE }),
    line(AS2a.xTop + 4, 104, AS2b.xTop - 8, 104, { stroke: BLUE, sw: 2, marker: 'bl' }),
    adLine(AD_CAP, AMBER),
    t(adTopX(AD_CAP) - 6, AD_TOP + 4, 'AD', { size: SMALL, fill: AMBER, anchor: 'end' }),
    ...drops(e1, INK), ...drops(e2, BLUE),
    ...yLabels(e1, e2),
    ...pLabels(e1, e2),
    t(24, 330, 'Output rises from Y₁ to Y₂ and the price level falls', { size: SMALL, fill: INK }),
    t(24, 350, 'Causes: investment, innovation, labour, competition', { size: SMALL, fill: MUTED }),
  ].join(''));
};

export const lrasDiagram = {
  id: id('diagram', 'potential growth long run aggregate supply shift'),
  title: 'Potential Growth: Long-Run AS Shifts Right',
  description: 'IAL 2.3.5 · 1d, 1e: a cause of potential growth raises full-capacity output, so the Keynesian long-run AS curve shifts right — output rises and the price level falls.',
  checklist: [
    'The long-run AS curve shifted right, labelled LRAS₁ to LRAS₂, with AD unchanged',
    'Both equilibria marked, with real output higher at the second',
    'The price level LOWER at the second equilibrium, not higher',
    'The cause of the shift named: investment, FDI, innovation, labour force, competition or productivity',
  ],
  scenarios: [
    { label: 'Capacity rises', svg: lrasSvg() },
  ],
};

/* ══ 4 · The opportunity cost of growth (2.3.5 · 3a, first bullet) ═══════════ */

const THETA_A = (22 * Math.PI) / 180;    // mostly consumer goods
const THETA_B = (58 * Math.PI) / 180;    // more capital goods
export const OC = {
  A: onFrontier(THETA_A), B: onFrontier(THETA_B),
  shiftA: 1.08, shiftB: 1.22,
};

const opportunitySvg = (future) => {
  const h = future ? 376 : 356;
  const [ax, ay] = OC.A; const [bx, by] = OC.B;
  const body = [
    t(FRAME.w / 2, 24, future ? 'Ten years on: which frontier?' : 'Today: consumer or capital goods?', { anchor: 'middle', weight: 600 }),
    ...ppfAxes(h),
    path(frontierPts(1), { stroke: AXIS }),
    dot(ax, ay, AMBER), dot(bx, by, GREEN),
    t(ax - 10, ay + 4, 'A', { size: SMALL, fill: AMBER, weight: 600, anchor: 'end' }),
    t(bx - 10, by + 4, 'B', { size: SMALL, fill: GREEN, weight: 600, anchor: 'end' }),
  ];
  if (!future) {
    body.push(
      t(PPF.ox + PPF.cMax + 4, PPF.oy - 12, 'Today', { size: SMALL, fill: AXIS }),
      line(ax, ay, ax, PPF.oy, { stroke: GRID, sw: 1, dash: '3 3' }),
      line(bx, by, bx, PPF.oy, { stroke: GRID, sw: 1, dash: '3 3' }),
      line(bx, PPF.oy - 10, ax, PPF.oy - 10, { stroke: RED, sw: 3 }),
      t(24, 322, 'A to B: more capital goods now, and the', { size: SMALL, fill: GREEN }),
      t(24, 342, 'consumer goods given up (red) are the cost', { size: SMALL, fill: RED }),
    );
  } else {
    body.push(
      path(frontierPts(OC.shiftA), { stroke: AMBER, dash: '6 4' }),
      path(frontierPts(OC.shiftB), { stroke: GREEN, dash: '6 4' }),
      t(24, 322, 'Grey: today\'s frontier', { size: SMALL, fill: AXIS }),
      t(24, 342, 'Amber: ten years on, after choosing A', { size: SMALL, fill: AMBER }),
      t(24, 362, 'Green: ten years on, after choosing B', { size: SMALL, fill: GREEN }),
    );
  }
  return svg(h, body.join(''));
};

export const opportunityDiagram = {
  id: id('diagram', 'opportunity cost of growth capital goods consumer goods'),
  title: 'The Opportunity Cost of Growth',
  description: 'IAL 2.3.5 · 3a: producing more capital goods today means fewer consumer goods today, and a frontier further out tomorrow — current against future living standards.',
  checklist: [
    'Capital goods on one axis and consumer goods on the other, with a concave frontier',
    'Two points ON the frontier: A with more consumer goods, B with more capital goods',
    'The consumer goods given up between A and B marked as the opportunity cost',
    'The future frontier drawn further out from B than from A',
  ],
  scenarios: [
    { label: 'Today', svg: opportunitySvg(false) },
    { label: 'Ten years on', svg: opportunitySvg(true) },
  ],
};

/* ══ 5 · Actual output and the trend, and the gap between them (2.3.5 · 4a-4d) ══ */

const CH = { x0: 76, dx: 36, yBase: 262, vMin: 460, vMax: 600, yTop: 72 };
export const chartX = (year) => CH.x0 + (year - 1) * CH.dx;
export const chartY = (v) => CH.yBase - ((v - CH.vMin) / (CH.vMax - CH.vMin)) * (CH.yBase - CH.yTop);

const chartAxes = () => [
  line(CH.x0 - 16, CH.yTop - 8, CH.x0 - 16, CH.yBase),
  line(CH.x0 - 16, CH.yBase, 380, CH.yBase),
  t(24, 50, '$bn, real', { size: SMALL, fill: MUTED }),
  ...[480, 520, 560].map((v) => t(CH.x0 - 22, chartY(v) + 4, String(v), { size: SMALL, fill: MUTED, anchor: 'end' })),
  ...E.YEARS.map((y) => t(chartX(y), CH.yBase + 18, String(y), { size: SMALL, fill: MUTED, anchor: 'middle' })),
  t(380, CH.yBase + 38, 'Year', { size: SMALL, fill: MUTED, anchor: 'end' }),
];

const gapSvg = () => {
  const h = 364;
  const pot = E.YEARS.map((y, i) => [chartX(y), chartY(E.potential[i])]);
  const act = E.YEARS.map((y, i) => [chartX(y), chartY(E.actual[i])]);
  const negIdx = [0, 1, 2, 3, 4];
  const posIdx = [4, 5, 6, 7, 8];
  const band = (ix) => [...ix.map((i) => act[i]), ...[...ix].reverse().map((i) => pot[i])];
  return svg(h, [
    t(FRAME.w / 2, 24, 'Actual output around its trend', { anchor: 'middle', weight: 600 }),
    ...chartAxes(),
    area(band(negIdx), RED),
    area(band(posIdx), GREEN),
    path(pot, { stroke: BLUE, dash: '6 4' }),
    path(act, { stroke: AMBER }),
    t(chartX(E.neg.year), chartY(E.neg.actual) + 26, `${pct(E.neg.gapPct, { signed: true })}`, { size: SMALL, fill: RED, anchor: 'middle', weight: 600 }),
    t(chartX(E.pos.year), chartY(E.pos.actual) - 16, `${pct(E.pos.gapPct, { signed: true })}`, { size: SMALL, fill: GREEN, anchor: 'middle', weight: 600 }),
    t(24, 322, `Blue dashed: potential output, trend ${pct(E.trendRate)} a year`, { size: SMALL, fill: BLUE }),
    t(24, 342, 'Amber: actual output. Red gap negative, green positive', { size: SMALL, fill: AMBER }),
  ].join(''));
};

/* 4d · three estimates of the same capacity, disagreeing about the trend since Year 3 */
const estimatesSvg = () => {
  const h = 384;
  const from = E.refYear;
  const years = E.YEARS.filter((y) => y >= from);
  const act = E.YEARS.map((y, i) => [chartX(y), chartY(E.actual[i])]);
  const colours = [PURPLE, BLUE, GREEN];
  const lines = E.ESTIMATES.map((est, k) => path(years.map((y) => [chartX(y), chartY(E.potentialRef * (1 + est.rate / 100) ** (y - from))]), { stroke: colours[k], sw: 2, dash: '6 4' }));
  return svg(h, [
    t(FRAME.w / 2, 24, 'Same output, three estimates of capacity', { anchor: 'middle', weight: 600 }),
    ...chartAxes(),
    ...lines,
    path(act, { stroke: AMBER }),
    line(chartX(E.judgeYear), CH.yTop, chartX(E.judgeYear), CH.yBase, { stroke: GRID, sw: 1, dash: '2 3' }),
    dot(chartX(E.judgeYear), chartY(E.actual[E.at(E.judgeYear)]), AMBER),
    ...E.ESTIMATES.map((est, k) => t(24, 322 + k * LEAD, `Trend ${pct(est.rate)}: Year ${E.judgeYear} gap ${pct(est.gapPct, { signed: true })}`, { size: SMALL, fill: colours[k] })),
  ].join(''));
};

export const outputGapDiagram = {
  id: id('diagram', 'output gap actual output and trend'),
  title: 'Output Gaps: Actual Output and the Trend',
  description: 'IAL 2.3.5 · 4a-4d: potential output growing at its trend rate, actual output around it, negative and positive output gaps, and why the gap depends on an estimate.',
  checklist: [
    'Potential output drawn as a steady trend line and actual output around it',
    'A negative gap where actual output is BELOW potential, a positive gap where it is ABOVE',
    'The gap read as a share of potential output, with its sign',
    'The same actual output giving different gaps under different estimates of the trend',
  ],
  scenarios: [
    { label: 'The gap', svg: gapSvg() },
    { label: 'Three estimates', svg: estimatesSvg() },
  ],
};

/* ══ One diagram per chapter, in chapter order; `null` is "decided: none" ═════ */

export const DIAGRAM_FOR_BLOCK = [
  actualPotentialDiagram,   // chapter 1 · Actual and Potential Growth
  lrasDiagram,              // chapter 2 · The Causes of Potential Growth
  null,                     // chapter 3 · The Benefits of Growth — teaches no diagram
  opportunityDiagram,       // chapter 4 · The Costs of Growth
  outputGapDiagram,         // chapter 5 · Output Gaps
];
export const ALL_DIAGRAMS = DIAGRAM_FOR_BLOCK.filter(Boolean);
