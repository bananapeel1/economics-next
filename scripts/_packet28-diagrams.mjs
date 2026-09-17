/**
 * PACKET 28 — revenue-costs-profits: seven diagrams, one per chapter, each pinned by the BLOCK's
 * `diagramId` (lib/learn-steps.js:44-55). The March section had four and a student could reach two:
 * `structure-02` computed the consequence exactly — `matchDiagramsToBlocks` placed "Revenue Curves" on
 * block 0 and "Short-Run Cost Curves" on block 1 by a shared title word, and "Long-Run Average Cost
 * Curve" and "Short-Run and Long-Run Shutdown Points" share no word with "Profit" or "Efficiency", so
 * the two diagrams carrying sub-topics 3 and 4 were never shown to anybody. That is also why
 * `quiz-03` could say the shutdown rule "exists only in diagrams[3]" and still be describing content
 * no student had seen.
 *
 * FIVE OF THE SEVEN CARRY A TABLE AS WELL AS A DRAWING, and four of those tables are the point rather
 * than a support. 3.3.2 is fourteen formulae (1a, 2c) and four relationships between them (2d), and
 * `specGap-03` is that the section had no numeric worked example anywhere — while QS6 in the IAL
 * A-level column is "Calculate cost, revenue and profit (marginal, average, totals)"
 * (econ_spec.txt:2779) and QS9 is interpreting information in tabular and numerical forms. A schedule
 * a student can read down IS the exam skill here.
 *
 * A DIAGRAM IS THE ONLY SURFACE IN THE SCHEMA THAT CAN CARRY A GRID (`schema.body-type` allows
 * paragraph, subheading, flow and bullets, and a practice `question` renders into a `<p>` where
 * newlines collapse). So every schedule in this section is drawn as one.
 *
 * EVERY NUMBER COMES FROM _packet28-util.mjs. Nothing below is typed twice: the runner re-derives
 * every printed figure from the emitted SVG and refuses to stage on a disagreement.
 */
import { id, money, qty, elasticity, round2, NADIRA, BAHRI, LONGRUN, INTERNAL_SOURCES, EXTERNAL_SOURCES, DISECONOMY_SOURCES } from './_packet28-util.mjs';

const INK = '#e8ecf5', AXIS = '#94a3b8', GRID = '#475569', MUTED = '#7a8299';
const BLUE = '#3b82f6', GREEN = '#059669', RED = '#ef4444', AMBER = '#f59e0b', PURPLE = '#8b5cf6';

const N = NADIRA, B = BAHRI, L = LONGRUN;

const open = (h = 400, w = 500) => `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',system-ui,sans-serif;background:transparent"><defs><marker id="arr" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="${AXIS}"/></marker></defs>`;
const close = '</svg>';
const t = (x, y, text, { size = 11, fill = INK, anchor = 'start', weight = 400 } = {}) =>
  `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${text}</text>`;
const line = (x1, y1, x2, y2, stroke, w = 2, extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${w}"${extra}/>`;
const dot = (x, y, fill, r = 3.5) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;

/*
 * `estWidth` is packet 24's measured bound, carried unchanged: all 92 strings in its tables read with
 * getComputedTextLength() at the 800px column, where four characters or more reach 0.601em and a lone
 * character reaches 0.874em, rounded up to 0.7 and 0.9. It is an ESTIMATE and the runner's guard
 * shares it, so the two cannot disagree about what fits. The independent measurement is the browser
 * one in Verify B.
 */
export const GRD = { w: 560, x0: 26, y0: 78, rowH: 30, right: 534, size: 11, gutter: 14 };
export const estWidth = (text, size = GRD.size) => String(text).length * size * (String(text).length < 4 ? 0.9 : 0.7);
export const gridRowY = (i) => round2(GRD.y0 + (i + 1) * GRD.rowH);

const wrapLines = (text, { size = 11, frame = 500, x = 26 } = {}) => {
  const max = Math.floor((frame - 2 - x) / (size * 0.7));
  const lines = [];
  let cur = '';
  for (const word of String(text).split(' ')) {
    if (cur && (cur + ' ' + word).length > max) { lines.push(cur); cur = word; } else cur = cur ? `${cur} ${word}` : word;
  }
  if (cur) lines.push(cur);
  return lines;
};
/*
 * Each wrapped line is emitted at an x one hundredth of a unit further right. That is not decoration:
 * the validator groups <text> by y and reads rows sharing x positions as a grid, so a four-line
 * caption under a drawn curve would otherwise pull a drawing into `diagram.table-kind` (packet 24).
 */
const wrap = (x, y, text, { size = 11, fill = MUTED, frame = 500, lead = 15 } = {}) =>
  wrapLines(text, { size, frame, x }).map((l, i) => t(round2(x + i * 0.01), round2(y + i * lead), l, { size, fill })).join('');

/* ── the shared grid: columns computed from the cells, and a table that does not fit THROWS ── */
/*
 * Packet 25's method, carried whole. Every earlier packet hand-picked column positions and had the
 * runner check them for overlap afterwards; written that way round, packet 25's first eight tables
 * produced forty-eight collisions, because a hand-picked column is a guess about the longest cell and
 * the longest cell changes every time a word does. Here the layout is derived from the cells and the
 * defect is unrepresentable rather than detected. Every cell is start-anchored: a centred cell's left
 * edge moves when its text changes, so the clearance between two columns would depend on both.
 */
export const gridColumns = ({ title, headers, rows }) => {
  const n = headers.length;
  const widths = headers.map((h, c) => Math.max(estWidth(h), ...rows.map((r) => estWidth(r[c] ?? ''))));
  const needed = widths.reduce((a, b) => a + b, 0) + GRD.gutter * (n - 1);
  const avail = GRD.right - GRD.x0;
  if (needed > avail) {
    const widest = rows.concat([headers]).flatMap((r) => r.map((cell, c) => ({ cell, c }))).sort((a, b) => estWidth(b.cell) - estWidth(a.cell))[0];
    throw new Error(`grid "${title}" needs ${round2(needed)} units and the frame gives ${avail}. Shorten column ${widest.c + 1}, starting with "${widest.cell}".`);
  }
  const slack = n > 1 ? (avail - needed) / (n - 1) : 0;
  const lefts = [];
  let x = GRD.x0;
  for (let c = 0; c < n; c += 1) { lefts.push(round2(x)); x += widths[c] + GRD.gutter + slack; }
  return lefts;
};

export const gridSvg = ({ title, note, headers, rows, colours = [] }) => {
  const cols = gridColumns({ title, headers, rows });
  const head = headers.map((h, c) => t(cols[c], GRD.y0, h, { size: GRD.size, fill: AXIS, weight: 600 })).join('');
  const body = rows.map((cells, i) => [
    ...cells.map((cell, c) => t(cols[c], gridRowY(i), cell, { size: GRD.size, fill: c === 0 ? INK : (colours[i]?.[c] || INK), weight: c === 0 ? 600 : 400 })),
    line(GRD.x0, round2(gridRowY(i) + 9), GRD.right, round2(gridRowY(i) + 9), GRID, 1),
  ].join('')).join('');
  const noteLines = note ? wrapLines(note, { frame: GRD.w, x: GRD.x0 }).length : 0;
  const h = round2(gridRowY(rows.length - 1) + 26 + (noteLines ? 8 + noteLines * 15 : 0));
  return [open(h, GRD.w), t(GRD.x0, 34, title, { size: 13, weight: 600 }),
    line(GRD.x0, round2(GRD.y0 + 9), GRD.right, round2(GRD.y0 + 9), AXIS, 1.5), head, body,
    note ? wrap(GRD.x0, round2(gridRowY(rows.length - 1) + 34), note, { frame: GRD.w }) : '',
    close].join('');
};

/* ── a plot frame, for the four diagrams that are drawings ─────────────────── */
/*
 * The frame is sized from its caption rather than guessed. Packet 25's canvas-bounds check refused
 * four of its own scenarios on the first run because a caption that wrapped to four lines put its last
 * baseline 42 units below a height that was a constant, and an SVG says nothing about text that
 * overflows it.
 */
const plotFor = (xMax, yMax, { x0 = 66, x1 = 462, yTop = 54, yBot = 300 } = {}) => {
  const f = { x0, x1, yTop, yBot, xMax, yMax };
  f.X = (q) => round2(f.x0 + (q / xMax) * (f.x1 - f.x0));
  f.Y = (v) => round2(f.yBot - (v / yMax) * (f.yBot - f.yTop));
  return f;
};

const axes = (f, xLabel, yLabel, { xTick = 'Q', yTick = '$' } = {}) => [
  line(f.x0, f.yBot, f.x1 + 14, f.yBot, AXIS, 2, ' marker-end="url(#arr)"'),
  line(f.x0, f.yBot, f.x0, f.yTop - 14, AXIS, 2, ' marker-end="url(#arr)"'),
  t(f.x1 + 16, f.yBot + 16, xTick, { size: 12, fill: AXIS, weight: 600, anchor: 'end' }),
  t(f.x0 - 6, f.yTop - 18, yTick, { size: 12, fill: AXIS, weight: 600, anchor: 'end' }),
  /*
   * THE AXIS LABEL SITS BELOW THE ANNOTATION ROW, not on it. Three things want the space under a
   * plot — a read-off's quantity at yBot+15, an annotation at yBot+32 and this label — and the
   * runner's table-collision check found two of them sharing a rounded y on the first run.
   */
  t(f.x0, f.yBot + 46, xLabel, { size: 11, fill: MUTED }),
  t(f.x0, f.yTop - 34, yLabel, { size: 11, fill: MUTED }),
].join('');

/** A series of points joined, with a label placed against the last one that fits inside the frame. */
const series = (f, points, colour, label, { dash = false, labelAt = null, dy = 4, dx = 8 } = {}) => {
  const pts = points.filter(([x, y]) => y != null && x <= f.xMax && y <= f.yMax);
  const path = pts.slice(1).map(([x, y], i) => line(f.X(pts[i][0]), f.Y(pts[i][1]), f.X(x), f.Y(y), colour, 2.5, dash ? ' stroke-dasharray="6 4"' : '')).join('');
  const marks = pts.map(([x, y]) => dot(f.X(x), f.Y(y), colour)).join('');
  const anchorPoint = labelAt != null ? pts.find(([x]) => x === labelAt) ?? pts[pts.length - 1] : pts[pts.length - 1];
  return path + marks + (label ? t(round2(f.X(anchorPoint[0]) + dx), round2(f.Y(anchorPoint[1]) + dy), label, { size: 12, fill: colour, weight: 600 }) : '');
};

/** A dashed read-off from a point to both axes, with the two values printed against them. */
const readOff = (f, x, y, colour, { xText, yText } = {}) => [
  line(f.x0, f.Y(y), f.X(x), f.Y(y), colour, 1.2, ' stroke-dasharray="4 4"'),
  line(f.X(x), f.Y(y), f.X(x), f.yBot, colour, 1.2, ' stroke-dasharray="4 4"'),
  dot(f.X(x), f.Y(y), colour, 4.5),
  t(f.x0 - 6, round2(f.Y(y) + 4), yText ?? money(y), { size: 11, fill: colour, anchor: 'end', weight: 600 }),
  t(f.X(x), round2(f.yBot + 15), xText ?? qty(x), { size: 11, fill: colour, anchor: 'middle', weight: 600 }),
].join('');

const plotSvg = ({ title, note, body, height = 330, frame = 500 }) => {
  const noteLines = note ? wrapLines(note, { frame, x: 26 }).length : 0;
  const h = round2(height + (noteLines ? noteLines * 15 + 8 : 0));
  return [open(h, frame), t(26, 30, title, { size: 13, weight: 600 }), body,
    note ? wrap(26, round2(height + 4), note, { frame }) : '', close].join('');
};

/* ══ 1 · Total, average and marginal revenue (3.3.2 · 1a) ═══════════════════ */
/*
 * The schedule is the diagram. 1a asks for "formulae to calculate AND UNDERSTAND THE RELATIONSHIP
 * BETWEEN" the three measures, and the relationship is visible in a table and invisible in a
 * definition: average revenue falls by $2 a step while marginal revenue falls by $4, and total
 * revenue turns over at exactly the row where marginal revenue reaches zero.
 */
const revenueScheduleView = () => gridSvg({
  title: `${N.name}: the revenue schedule, ${N.units} ${N.per}`,
  headers: ['Q', 'Price = AR', 'TR = P × Q', 'MR'],
  rows: N.schedule.map((r) => [qty(r.q), money(r.ar), money(r.tr), money(r.mr)]),
  colours: N.schedule.map((r) => [INK, INK, r.q === N.trMaxQ ? GREEN : INK, r.mr === 0 ? GREEN : r.mr < 0 ? RED : INK]),
  note: `Read down the last two columns together. Average revenue falls by $${N.b * 2} every two ${N.units}; marginal revenue falls by $${N.b * 4}, twice as fast, which is the whole of the relationship 1a asks for. Total revenue is greatest at ${money(N.trMax)} where ${N.trMaxQ} ${N.units} are sold — the same row where marginal revenue is ${money(0)}. Past it MR is negative and every further ${N.unit} sold takes total revenue DOWN.`,
});

const revenueCurvesView = () => {
  const f = plotFor(16, 40);
  const arPts = N.schedule.map((r) => [r.q, r.ar]);
  const mrPts = N.schedule.filter((r) => r.mr >= 0).map((r) => [r.q, r.mr]);
  return plotSvg({
    title: `${N.name}: average and marginal revenue`,
    body: [
      axes(f, `${N.units} ${N.per}`, `$ a ${N.unit}`),
      series(f, arPts, BLUE, `AR = ${N.a} ${'−'} ${N.b}Q`, { labelAt: 8, dx: 10, dy: -8 }),
      series(f, mrPts, PURPLE, `MR = ${N.a} ${'−'} ${N.b * 2}Q`, { labelAt: 2, dx: 10, dy: -8 }),
      readOff(f, N.trMaxQ, 0, GREEN, { yText: money(0), xText: qty(N.trMaxQ) }),
      t(round2(f.X(N.trMaxQ) - 10), round2(f.Y(0) - 12), `TR greatest: ${money(N.trMax)}`, { size: 11, fill: GREEN, weight: 600, anchor: 'end' }),
    ].join(''),
    height: 356,
    note: `Both lines start at $${N.a}, because the first ${N.unit} sold brings in the price and nothing has been given up to sell it. After that MR falls twice as steeply as AR: to sell one more ${N.unit} the firm has to drop the price on EVERY ${N.unit}, so what it gains is the new price minus what it loses on the ${N.units} it was already selling.`,
  });
};

export const revenueDiagram = {
  id: id('diagram', 'the three revenue measures'),
  title: 'Total, Average and Marginal Revenue',
  kind: 'table',
  description: `IAL 3.3.2 · 1a asks for the formulae to calculate total, average and marginal revenue and to understand the relationship between them. The schedule is ${N.name}'s own demand line, P = ${N.a} ${'−'} ${N.b}Q, and every figure in this section's revenue chapters is read from it.`,
  scenarios: [
    { label: 'The schedule', svg: revenueScheduleView() },
    { label: 'AR and MR drawn', svg: revenueCurvesView() },
  ],
};

/* ══ 2 · Price elasticity of demand and revenue (3.3.2 · 1b) ════════════════ */

const pedRegionsView = () => gridSvg({
  title: 'What a price CUT does to total revenue',
  headers: ['PED', 'Demand is', 'A price cut', 'MR is'],
  rows: [
    [`below ${elasticity(-1)}`, 'elastic', 'raises TR', 'positive'],
    [elasticity(-1), 'unit elastic', 'leaves TR unchanged', 'zero'],
    [`between ${elasticity(-1)} and 0`, 'inelastic', 'lowers TR', 'negative'],
  ],
  colours: [[INK, INK, GREEN, GREEN], [INK, INK, AMBER, AMBER], [INK, INK, RED, RED]],
  note: `"Below ${elasticity(-1)}" means further from zero — ${elasticity(-3)} is below ${elasticity(-1)}. The last column is why this belongs in a revenue chapter rather than a demand one: marginal revenue and price elasticity of demand are two ways of reading the same fact about one more ${N.unit} sold. On ${N.name}'s line the three rows are three places on ONE demand curve, not three different markets.`,
});

const pedWorkedView = () => gridSvg({
  title: `Two price cuts on the same demand line, ${N.name}`,
  headers: ['', 'Elastic end', 'Inelastic end'],
  rows: [
    ['Price falls from', money(N.elastic.p0), money(N.inelastic.p0)],
    ['Price falls to', money(N.elastic.p1), money(N.inelastic.p1)],
    [`${N.units} sold rise from`, qty(N.elastic.q0), qty(N.inelastic.q0)],
    [`${N.units} sold rise to`, qty(N.elastic.q1), qty(N.inelastic.q1)],
    ['% change in quantity', `+${round2((N.elastic.q1 - N.elastic.q0) / N.elastic.q0 * 100)}%`, `+${round2((N.inelastic.q1 - N.inelastic.q0) / N.inelastic.q0 * 100)}%`],
    ['% change in price', `${elasticity(round2((N.elastic.p1 - N.elastic.p0) / N.elastic.p0 * 100))}%`, `${elasticity(round2((N.inelastic.p1 - N.inelastic.p0) / N.inelastic.p0 * 100))}%`],
    ['PED', elasticity(N.elastic.ped), elasticity(N.inelastic.ped)],
    ['Total revenue before', money(N.elastic.tr0), money(N.inelastic.tr0)],
    ['Total revenue after', money(N.elastic.tr1), money(N.inelastic.tr1)],
  ],
  colours: [[], [], [], [], [], [], [INK, GREEN, RED], [], [INK, GREEN, RED]],
  note: `Both cuts are $2. Both start from a total revenue of ${money(N.elastic.tr0)}. One ends at ${money(N.elastic.tr1)} and the other at ${money(N.inelastic.tr1)}, and the only thing that differs is where on the demand line the firm was standing. PED = % change in quantity demanded ÷ % change in price, and each percentage is measured against the value it started from.`,
});

export const pedDiagram = {
  id: id('diagram', 'price elasticity of demand and revenue'),
  title: 'Price Elasticity of Demand and Revenue',
  kind: 'table',
  description: `IAL 3.3.2 · 1b is price elasticity of demand and its relationship to revenue concepts, including calculations. Quantitative skill QS8 is making calculations of elasticity and interpreting the result; both worked cases sit on ${N.name}'s single demand line.`,
  scenarios: [
    { label: 'The three regions', svg: pedRegionsView() },
    { label: 'Two cuts, worked', svg: pedWorkedView() },
  ],
};

/* ══ 3 · Diminishing returns and the product curves (3.3.2 · 2a, 2b, 2d) ════ */

const productScheduleView = () => gridSvg({
  title: `${B.name}: adding workers to one fixed plant`,
  headers: ['Workers', 'Total product', 'Marginal product', 'Average product'],
  rows: B.rows.map((r) => [qty(r.l), qty(r.q), r.mp == null ? '—' : qty(r.mp), r.ap == null ? '—' : String(r.ap)]),
  colours: B.rows.map((r) => [INK, INK, r.mp != null && r.mp === Math.max(...B.rows.filter((x) => x.mp != null).map((x) => x.mp)) ? GREEN : (r.l >= 3 ? RED : INK), INK]),
  note: `Marginal product is the extra output one more worker adds; average product is total product divided by the number of workers. Marginal product RISES to ${Math.max(...B.rows.filter((x) => x.mp != null).map((x) => x.mp))} at the second worker and falls from the third onward — that fall is the law of diminishing returns, and it happens because the plant is fixed. Notice where marginal product and average product are equal: at the third worker both are ${B.at(15).ap}, and that is average product at its greatest.`,
});

const productCurvesView = () => {
  const f = plotFor(5, 7, { x0: 62, x1: 440 });
  const mp = B.rows.filter((r) => r.mp != null).map((r) => [r.l, r.mp]);
  const ap = B.rows.filter((r) => r.ap != null).map((r) => [r.l, r.ap]);
  return plotSvg({
    title: `${B.name}: marginal and average product`,
    body: [
      axes(f, 'workers a day', `${B.units} added`, { xTick: 'L', yTick: 'units' }),
      series(f, mp, PURPLE, 'MP', { labelAt: 5, dx: 10, dy: 4 }),
      series(f, ap, BLUE, 'AP', { labelAt: 5, dx: 10, dy: -8 }),
      readOff(f, 2, 6, GREEN, { xText: '2', yText: '6' }),
      t(f.X(2) + 10, f.Y(6) - 10, 'MP at its greatest', { size: 11, fill: GREEN, weight: 600 }),
      t(f.X(3), round2(f.yBot + 32), 'diminishing returns from here', { size: 11, fill: RED, weight: 600, anchor: 'middle' }),
    ].join(''),
    height: 356,
    note: `Marginal product crosses average product exactly where average product is at its greatest, and it crosses from above. That is not a coincidence about these numbers: while the next worker adds more than the current average, the average must rise, and once the next worker adds less, the average must fall.`,
  });
};

export const productDiagram = {
  id: id('diagram', 'diminishing returns and the product curves'),
  title: 'Diminishing Returns and the Product Curves',
  kind: 'table',
  description: `IAL 3.3.2 · 2a derives the short-run cost curves from the assumption of diminishing marginal productivity and 2b is the law of diminishing returns. ${B.name} has one fixed plant, a wage of ${money(B.wage)} a worker ${B.per} and total fixed costs of ${money(B.tfc)} ${B.per}.`,
  scenarios: [
    { label: 'The product schedule', svg: productScheduleView() },
    { label: 'MP and AP drawn', svg: productCurvesView() },
  ],
};

/* ══ 4 · The seven cost measures (3.3.2 · 2c, 2d) ═══════════════════════════ */
/*
 * 2c is seven formulae in one bullet list and `specThin-01` and `specThin-02` are that two of them —
 * average fixed cost and average variable cost — were named in the March section and never defined.
 * All seven are in one table here, against the output they belong to, because the relationship 2c
 * asks students to understand is between the columns and not inside any one of them.
 */
const costScheduleView = () => gridSvg({
  title: `${B.name}: every cost measure, ${B.units} ${B.per}`,
  headers: ['Q', 'TFC', 'TVC', 'TC', 'AFC', 'AVC', 'AC', 'MC'],
  rows: B.rows.map((r) => [qty(r.q), money(r.tfc), money(r.tvc), money(r.tc),
    r.afc == null ? '—' : money(r.afc), r.avc == null ? '—' : money(r.avc),
    r.ac == null ? '—' : money(r.ac), r.mc == null ? '—' : money(r.mc)]),
  colours: B.rows.map((r) => [INK, INK, INK, INK, INK, r.avc === B.minAvc ? GREEN : INK, r.ac === B.minAc ? GREEN : INK, r.mc === B.minAc ? GREEN : INK]),
  note: `Total fixed cost never moves — that is what fixed means. Average fixed cost falls at every row, from ${money(B.at(4).afc)} to ${money(B.at(20).afc)}, because the same ${money(B.tfc)} is spread over more ${B.units}. Check any row: AFC + AVC = AC exactly. And look at ${qty(18)} ${B.units}, where marginal cost is ${money(B.at(18).mc)} and average cost is ${money(B.at(18).ac)}: marginal cost passes through average cost at average cost's lowest point, which is ${money(B.minAc)}.`,
});

const costCurvesView = () => {
  const f = plotFor(20, 48, { x0: 66, x1: 448 });
  const rows = B.rows.filter((r) => r.ac != null);
  /*
   * MARGINAL COST IS PLOTTED AT THE MIDDLE OF ITS STEP, not at the output the step reached. Marginal
   * cost between 15 and 18 ${B.units} is the cost of those three ${B.units}, so it belongs at 16.5 and
   * not at 18. Every earlier drawing of a schedule in this repository put it at the right-hand end,
   * which is what makes an MC curve look as if it crosses AC to the right of AC's minimum.
   */
  const mc = B.rows.filter((r) => r.mc != null).map((r) => {
    const prev = B.rows[B.rows.indexOf(r) - 1];
    return [round2((prev.q + r.q) / 2), r.mc];
  });
  return plotSvg({
    title: `${B.name}: the average and marginal cost curves`,
    body: [
      axes(f, `${B.units} ${B.per}`, `$ a ${B.unit}`),
      series(f, rows.map((r) => [r.q, r.afc]), MUTED, 'AFC', { dash: true, labelAt: 20, dx: 8, dy: 4 }),
      series(f, rows.map((r) => [r.q, r.avc]), BLUE, 'AVC', { labelAt: 20, dx: 8, dy: 12 }),
      series(f, rows.map((r) => [r.q, r.ac]), GREEN, 'AC', { labelAt: 20, dx: 8, dy: -6 }),
      series(f, mc, PURPLE, 'MC', { labelAt: 19, dx: 8, dy: 4 }),
      readOff(f, 18, B.minAc, AMBER, { xText: qty(18), yText: money(B.minAc) }),
      t(round2(f.X(18) - 10), round2(f.Y(B.minAc) - 26), `MC = AC = ${money(B.minAc)}`, { size: 11, fill: AMBER, weight: 600, anchor: 'end' }),
    ].join(''),
    height: 356,
    note: `Average fixed cost falls towards the horizontal axis and never reaches it. Average variable cost falls, flattens and turns up as diminishing returns take hold. Average cost is the two added together, so it turns up later than AVC does. Marginal cost cuts average cost from below, at ${money(B.minAc)}, which is average cost's lowest point — and it cuts average variable cost at ITS lowest point, ${money(B.minAvc)}, for the same reason.`,
  });
};

export const costDiagram = {
  id: id('diagram', 'the seven cost measures'),
  title: 'The Seven Cost Measures',
  kind: 'table',
  description: `IAL 3.3.2 · 2c names seven cost measures and asks for the formulae to calculate them and to understand the relationship between them; 2d asks for the relationships between marginal product and marginal cost, average product and average cost, and total product and total cost.`,
  scenarios: [
    { label: 'The cost schedule', svg: costScheduleView() },
    { label: 'The cost curves', svg: costCurvesView() },
  ],
};

/* ══ 5 · The long run, LRAC and minimum efficient scale (2d-4, 3a, 3b) ══════ */

const longRunScheduleView = () => gridSvg({
  title: `${B.name}: long-run average cost at each plant size`,
  headers: [`${B.units} ${B.per}`, 'Long-run average cost', 'Because'],
  rows: L.schedule.map(({ q, lrac }) => [qty(q), money(lrac),
    q < L.mes ? 'economies of scale' : q <= L.flatTo ? (q === L.mes ? 'minimum efficient scale' : 'at the minimum') : 'diseconomies of scale']),
  colours: L.schedule.map(({ q }) => [INK, q === L.mes ? GREEN : INK, q < L.mes ? BLUE : q <= L.flatTo ? GREEN : RED]),
  note: `In the long run every factor can change, including the plant, so each row is a DIFFERENT plant built for that output rather than the same plant worked harder. Long-run average cost falls by ${money(L.fallToMes)} a ${B.unit} between ${qty(L.outputs[0])} and ${qty(L.mes)} ${B.units}, reaches ${money(L.floor)} and holds it, then rises. Minimum efficient scale is ${qty(L.mes)} ${B.units} ${B.per}: the LOWEST output at which long-run average cost is at its minimum.`,
});

const longRunCurveView = () => {
  const f = plotFor(95, 24, { x0: 66, x1: 448 });
  return plotSvg({
    title: `${B.name}: the long-run average cost curve`,
    body: [
      axes(f, `${B.units} ${B.per}`, `$ a ${B.unit}`),
      series(f, L.schedule.map((r) => [r.q, r.lrac]), GREEN, 'LRAC', { labelAt: 90, dx: 8, dy: -6 }),
      readOff(f, L.mes, L.floor, AMBER, { xText: qty(L.mes), yText: money(L.floor) }),
      t(f.X(L.mes), round2(f.yBot + 32), 'minimum efficient scale', { size: 11, fill: AMBER, weight: 600, anchor: 'middle' }),
      t(f.X(25), f.Y(21), 'economies of scale', { size: 11, fill: BLUE, weight: 600, anchor: 'middle' }),
      t(f.X(82), f.Y(20), 'diseconomies', { size: 11, fill: RED, weight: 600, anchor: 'middle' }),
    ].join(''),
    height: 356,
    note: `The falling stretch is economies of scale and the rising stretch is diseconomies of scale — 3a is exactly this relationship, between the shape of the long-run curve and the two. The flat stretch matters for 3b: long-run average cost is at its minimum everywhere from ${qty(L.mes)} to ${qty(L.flatTo)} ${B.units}, and minimum efficient scale is the FIRST of those outputs, ${qty(L.mes)}, not the last.`,
  });
};

export const longRunDiagram = {
  id: id('diagram', 'long run average cost and minimum efficient scale'),
  title: 'The Long Run, LRAC and Minimum Efficient Scale',
  kind: 'table',
  description: `IAL 3.3.2 · 2d-4 is the relationship between short-run and long-run costs, 3a is the relationship between long-run cost curves and economies and diseconomies of scale, and 3b is minimum efficient scale.`,
  scenarios: [
    { label: 'Plant by plant', svg: longRunScheduleView() },
    { label: 'The LRAC curve', svg: longRunCurveView() },
  ],
};

/* ══ 6 · Economies and diseconomies of scale (3c, 3d, 3e, 3f) ═══════════════ */
/*
 * Three tables, three specification lists, in the specification's own order and wording. `specGap-01`
 * asks for these and gets two of the names wrong: 3d-5 is PURCHASING (`bulk` is 0 in econ_spec.txt)
 * and the third diseconomy at :1339 is X-INEFFICIENCY, not motivation. `structure-04` and `specGap-07`
 * ask for X-inefficiency to be MOVED OUT of this section as 3.3.3 material; it is 3.3.2 · 3f-3 and it
 * is one of only three things the specification lists under that requirement.
 */
const internalView = () => gridSvg({
  title: 'Sources of INTERNAL economies of scale',
  headers: ['Source', 'What makes the unit cost fall'],
  rows: INTERNAL_SOURCES.map(([name, short]) => [name, short]),
  note: `Six, and the list is closed. Internal means the saving comes from THIS firm growing, so it arrives whether or not anything else in the industry changes. Each one is a cost that does not grow in step with output: it is paid once, or borrowed once, or hired once, and then spread.`,
});

const externalView = () => gridSvg({
  title: 'Sources of EXTERNAL economies of scale',
  headers: ['Source', 'What makes the unit cost fall'],
  rows: EXTERNAL_SOURCES.map(([name, short]) => [name, short]),
  note: `Three, and the test that separates them from the six above is WHOSE growth causes the saving. An external economy arrives because the INDUSTRY has grown near this firm, so a firm that has not grown at all can gain one — and a firm that leaves the area loses it however large it is.`,
});

const diseconomiesView = () => gridSvg({
  title: 'Sources of DISECONOMIES of scale',
  headers: ['Source', 'What makes the unit cost rise'],
  rows: DISECONOMY_SOURCES.map(([name, short]) => [name, short]),
  note: `Three, and all three are about the firm becoming harder to run rather than about anything it buys getting dearer. X-inefficiency is the third of them: it is 3.3.2 · ${'3f'} and it belongs in this chapter. Note that diseconomies of scale are a LONG-RUN effect, from a firm being too large; diminishing returns are a SHORT-RUN effect, from one factor being fixed.`,
});

export const scaleSourcesDiagram = {
  id: id('diagram', 'sources of economies and diseconomies of scale'),
  title: 'Economies and Diseconomies of Scale',
  kind: 'table',
  description: `IAL 3.3.2 · 3c is the distinction between internal and external economies of scale, 3d lists six sources of internal economies, 3e lists three sources of external economies and 3f lists three sources of diseconomies. All three tables are the specification's own lists, in its order.`,
  scenarios: [
    { label: 'Internal, six sources', svg: internalView() },
    { label: 'External, three sources', svg: externalView() },
    { label: 'Diseconomies, three sources', svg: diseconomiesView() },
  ],
};

/* ══ 7 · Profits, losses and the shutdown points (3.3.2 · 4a, 4b) ═══════════ */
/*
 * FOUR PRICES, ONE OUTPUT, ONE COLUMN OF COSTS. At 15 ${B.units} Bahri's average cost is $20 and its
 * average variable cost is $12, so a price above, at, between and below those two figures produces
 * every case 4a and 4b name. Nothing here chooses the output, which is what keeps 3.3.3's
 * profit-maximising equilibrium out of a section that does not contain it.
 */
const PRICE_CASES = [
  ['supernormal', B.supernormal, 'supernormal profit'],
  ['normal', B.normal, 'normal profit'],
  ['shortRunLoss', B.shortRunLoss, 'a loss — keep producing'],
  ['shutdown', B.shutdown, 'a loss — shut down'],
];

const profitTableView = () => gridSvg({
  title: `${B.name} at ${qty(B.ref.q)} ${B.units}: four prices`,
  headers: ['Price', 'TR', 'TC', 'Profit', 'Outcome'],
  rows: PRICE_CASES.map(([, o, label]) => [money(o.price), money(o.revenue), money(B.ref.tc),
    o.profit === 0 ? money(0) : (o.profit > 0 ? `+${money(o.profit)}` : money(o.profit)), label]),
  colours: [[INK, INK, INK, GREEN, GREEN], [INK, INK, INK, AMBER, AMBER], [INK, INK, INK, RED, AMBER], [INK, INK, INK, RED, RED]],
  note: `Costs never change down this table: ${qty(B.ref.q)} ${B.units} cost ${money(B.ref.tc)} to make, of which ${money(B.tfc)} is fixed, so average cost is ${money(B.ref.ac)} and average variable cost is ${money(B.ref.avc)}. Only the price moves. Normal profit is the middle row, where total revenue exactly covers total cost and profit is ${money(0)} — which is not the same as earning nothing, because the cost the revenue is covering already includes what the owners could have earned elsewhere.`,
});

const shutdownView = () => gridSvg({
  title: 'Produce at a loss, or shut down?',
  headers: ['Price', 'Against AVC', 'Loss producing', 'Loss if shut', 'Decision'],
  rows: [B.shortRunLoss, B.shutdown].map((o) => [money(o.price),
    `${o.coversVariable ? 'above' : 'below'} ${money(B.ref.avc)}`,
    money(Math.abs(o.profit)), money(o.lossIfShut),
    o.produce ? 'keep producing' : 'shut down']),
  colours: [[INK, GREEN, INK, INK, GREEN], [INK, RED, INK, INK, RED]],
  note: `The fixed ${money(B.tfc)} is owed either way in the short run, so shutting down is not free: it costs exactly ${money(B.tfc)}. At ${money(B.shortRunLoss.price)} each ${B.unit} covers its own variable cost of ${money(B.ref.avc)} and leaves ${money(B.shortRunLoss.price - B.ref.avc)} towards the fixed cost, so producing loses ${money(Math.abs(B.shortRunLoss.profit))} rather than ${money(B.tfc)}. At ${money(B.shutdown.price)} each ${B.unit} does NOT cover its variable cost, so every ${B.unit} made adds to the loss. SHORT RUN: shut down when price is below average variable cost. LONG RUN: there are no fixed costs left to cover, so a firm leaves when price is below average cost, ${money(B.ref.ac)}.`,
});

/*
 * THE THIRD VIEW IS THE ONE `specGap-05` ASKS FOR BY NAME: "loss-making firm diagram (AR < ATC) and
 * the profit/loss rectangles". The March section's only shaded-profit diagram was never surfaced in
 * Learn Mode at all (`structure-02`), so the finding could describe a defect no student had seen.
 *
 * It is drawn with the price as a HORIZONTAL line the firm faces, against its own average and average
 * variable cost curves, and no market structure is named — because none is needed. The rectangle is
 * (AR − AC) × Q either way: green above the cost curve and red below it, which is the whole of 4a in
 * one picture, and the AVC line underneath is the whole of 4b.
 */
const profitRectanglesView = () => {
  const f = plotFor(22, 34, { x0: 66, x1: 404, yTop: 54, yBot: 286 });
  const q = B.ref.q;
  const band = (price, colour) => {
    const [top, bottom] = price >= B.ref.ac ? [price, B.ref.ac] : [B.ref.ac, price];
    return `<polygon points="${f.X(0)},${f.Y(top)} ${f.X(q)},${f.Y(top)} ${f.X(q)},${f.Y(bottom)} ${f.X(0)},${f.Y(bottom)}" fill="${colour}" fill-opacity="0.18"/>`;
  };
  const priceLine = (price, colour, label) => [
    line(f.x0, f.Y(price), f.X(q), f.Y(price), colour, 2),
    t(round2(f.X(q) + 6), round2(f.Y(price) + 4), label, { size: 11, fill: colour, weight: 600 }),
  ].join('');
  return plotSvg({
    title: `The profit and loss rectangles at ${qty(q)} ${B.units}`,
    height: 356,
    body: [
      band(B.supernormal.price, GREEN),
      band(B.shortRunLoss.price, RED),
      axes(f, `${B.units} ${B.per}`, `$ a ${B.unit}`),
      line(f.x0, f.Y(B.ref.ac), f.X(q), f.Y(B.ref.ac), AMBER, 2.5),
      t(round2(f.X(q) + 6), round2(f.Y(B.ref.ac) + 4), `AC ${money(B.ref.ac)}`, { size: 11, fill: AMBER, weight: 600 }),
      line(f.x0, f.Y(B.ref.avc), f.X(q), f.Y(B.ref.avc), BLUE, 2.5, ' stroke-dasharray="6 4"'),
      t(round2(f.X(q) + 6), round2(f.Y(B.ref.avc) + 4), `AVC ${money(B.ref.avc)}`, { size: 11, fill: BLUE, weight: 600 }),
      priceLine(B.supernormal.price, GREEN, `P ${money(B.supernormal.price)}`),
      priceLine(B.shortRunLoss.price, RED, `P ${money(B.shortRunLoss.price)}`),
      priceLine(B.shutdown.price, MUTED, `P ${money(B.shutdown.price)}`),
      t(round2(f.X(q) / 2 + f.x0 / 2), round2(f.Y((B.supernormal.price + B.ref.ac) / 2) + 4), `profit ${money(B.supernormal.profit)}`, { size: 11, fill: GREEN, weight: 600, anchor: 'middle' }),
      t(round2(f.X(q) / 2 + f.x0 / 2), round2(f.Y((B.shortRunLoss.price + B.ref.ac) / 2) + 4), `loss ${money(Math.abs(B.shortRunLoss.profit))}`, { size: 11, fill: RED, weight: 600, anchor: 'middle' }),
      t(f.X(q), round2(f.yBot + 32), `${qty(q)} ${B.units}`, { size: 11, fill: AXIS, weight: 600, anchor: 'middle' }),
    ].join(''),
    note: `Each rectangle is the gap between the price and average cost, multiplied by the ${qty(q)} ${B.units} produced. Above ${money(B.ref.ac)} the rectangle is profit; below it, a loss. The dashed line at ${money(B.ref.avc)} decides what to do about the loss: ${money(B.shortRunLoss.price)} is above it, so the firm keeps producing; ${money(B.shutdown.price)} is below it, so it shuts down. At ${money(B.ref.ac)} exactly there is no rectangle at all, and that is normal profit.`,
  });
};

export const profitDiagram = {
  id: id('diagram', 'profits losses and the shutdown points'),
  title: 'Profits, Losses and the Shutdown Points',
  kind: 'table',
  description: `IAL 3.3.2 · 4a is the distinction between normal profit, supernormal profit and losses, and 4b is the short-run and long-run shutdown points. One output, one column of costs, four prices.`,
  scenarios: [
    { label: 'Four prices', svg: profitTableView() },
    { label: 'Produce or shut down', svg: shutdownView() },
    { label: 'The rectangles, drawn', svg: profitRectanglesView() },
  ],
};

export const DIAGRAMS = [
  revenueDiagram, pedDiagram, productDiagram, costDiagram, longRunDiagram, scaleSourcesDiagram, profitDiagram,
];
