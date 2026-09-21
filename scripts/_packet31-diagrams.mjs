/**
 * PACKET 31 — financial-planning: five diagrams, one pinned to each chapter.
 *
 * THE SECTION HAS NEVER HAD ONE. `structure-01` is the finding and it is exact: `diagrams = 0`,
 * every `content[].diagramRef` null, and a subsection titled "Break-Even Charts" that describes
 * three lines and an intersection in prose, with a reorder recall asking a student to order the
 * steps to DRAW the chart and an `examMatters` demanding "precise drawing". `3e` is
 * "**Interpretation** of break-even charts" (:905) — the one leaf in this topic that cannot be
 * taught without the picture, and the one the section was missing the picture for.
 *
 * AND THE DRAWING COMMAND GOES SOMEWHERE ELSE, which is `structure-01`'s other half read against the
 * specification rather than against the live text. `3e` asks for interpretation only. `4a` (:907)
 * asks for "**Construction** and interpretation of simple cash-flow forecasts". `Construct` in IAL
 * Business is 4 marks and is defined as "requires students to draw an accurately labelled diagram"
 * (:2224-2226). So the construction task is the CASH-FLOW FORECAST and never the break-even chart,
 * and the live section has it exactly backwards.
 *
 * NOTHING IS DRAWN BY HAND. The break-even chart's lines are `PLANT.tr` and `PLANT.tc` sampled, its
 * break-even point is the solution `PLANT.bep`, and the runner re-derives every printed figure out
 * of the emitted SVG — because a figure computed correctly and then typed into the wrong `<text>` is
 * the same defect one layer along (packets 19, 23, 25, 29).
 *
 * FOUR OF THE FIVE ARE TABLES, and that is a deliberate consequence of what this topic is: `1b`,
 * `4a` and `5c` are calculations, and `schema.body-type` allows paragraph, subheading, flow and
 * bullets only — a diagram is the only surface in the schema that can carry a grid.
 *
 * AND ALL FOUR CLEAR V022, which no section in the programme has managed. `diagram.table-legible`
 * fires on all 32 tables packets 20-28 authored, and packet 27 concluded that a table cannot be
 * shrunk into legibility — measured, its four needed 11-17 per cent MORE than the frame at the 13
 * units the floor demands. That is true of a dense reference table and the finding stays open for
 * them. It is not true of a table with four or five short columns, so these are authored at 13 from
 * the start rather than at 11 and reported: the runner prints each one's margin at 13, and the
 * narrowest still has 34 units of slack. V022 remains open for the back catalogue and for the
 * phone, which no column width fixes — see `GRD` below.
 *
 * `gridColumns` computes each column from its own widest cell and THROWS when a table does not fit,
 * so a cell collision is unrepresentable here rather than detected afterwards. `estWidth` is packet
 * 24's browser-measured bound and the runner's guard imports THIS function, so the layout and the
 * check cannot drift apart.
 */
import {
  id, money, qty, pct, signed, round2,
  PLANT, CHANGES, CUT, FORECAST, CASHFLOW, BUDGET,
} from './_packet31-util.mjs';

const INK = '#e8ecf5', AXIS = '#94a3b8', GRID = '#475569', MUTED = '#7a8299';
const BLUE = '#3b82f6', GREEN = '#059669', RED = '#ef4444', AMBER = '#f59e0b', PURPLE = '#8b5cf6';

export const r2 = round2;

const open = (h = 400, w = 560) => `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',system-ui,sans-serif;background:transparent"><defs><marker id="arr" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="${AXIS}"/></marker></defs>`;
const close = '</svg>';
const t = (x, y, text, { size = 11, fill = INK, anchor = 'start', weight = 400 } = {}) =>
  `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${text}</text>`;
const line = (x1, y1, x2, y2, stroke, w = 2, extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${w}"${extra}/>`;
const dot = (x, y, fill, r = 3.5) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;
const poly = (points, fill, extra = '') => `<polygon points="${points.map(([x, y]) => `${x} ${y}`).join(',')}" fill="${fill}"${extra}/>`;

/* ── the one bound ─────────────────────────────────────────────────────────── */
/*
 * Packet 24's measured bound, read with getComputedTextLength() over 92 table strings: four
 * characters or more reach 0.601 em and a lone character 0.874 em, rounded up to 0.7 and 0.9. It is
 * an ESTIMATE, and the runner's extent and collision guards import this same function so the two
 * cannot disagree. The independent measurement is the browser one in Verify B.
 */
/*
 * `size: 13` IS THE V022 FIX, AND IT IS A MEASUREMENT RATHER THAN A PREFERENCE. `diagram.table-legible`
 * reads the SMALLEST `font-size` in the whole SVG — the note and the title included, not only the
 * cells — and scales it by 530/viewBoxWidth. At a 560-unit box that is 0.946, so every text element
 * in a declared table has to be at least 12.68 units, i.e. 13. Packets 20-28 authored at 11 (10.4px)
 * and all 32 of their tables fire the rule; packet 27 measured its four at 11-17 per cent OVER the
 * frame at the 13 units the floor demands and concluded a dense reference table cannot be shrunk
 * into legibility. That conclusion holds for a dense table and is why V022 is still open. It does
 * not hold for these four, which are short by construction: the runner prints each one's remaining
 * margin at 13 units, and all four clear it.
 */
export const GRD = { w: 560, x0: 26, y0: 78, rowH: 32, right: 534, size: 13, gutter: 14 };
export const estWidth = (text, size = GRD.size) => String(text).length * size * (String(text).length < 4 ? 0.9 : 0.7);
export const gridRowY = (i) => r2(GRD.y0 + (i + 1) * GRD.rowH);

/** Greedy wrap, measured in UNITS by `estWidth` rather than counted in characters. */
export const wrapLines = (text, { size = 10, maxWidth = GRD.right - GRD.x0 } = {}) => {
  const lines = [];
  let cur = '';
  for (const word of String(text).split(' ')) {
    const next = cur ? `${cur} ${word}` : word;
    if (cur && estWidth(next, size) > maxWidth) { lines.push(cur); cur = word; } else cur = next;
  }
  if (cur) lines.push(cur);
  return lines;
};
/*
 * Each wrapped line is emitted at an x one hundredth of a unit further right, so the validator —
 * which groups `<text>` by y and reads rows sharing x positions as a grid — cannot mistake a
 * four-line caption under a drawn curve for a table (packet 24).
 */
const wrap = (x, y, text, { size = 10, fill = MUTED, lead = size >= 13 ? 17 : 14, maxWidth = GRD.right - GRD.x0 } = {}) =>
  wrapLines(text, { size, maxWidth }).map((l, i) => t(r2(x + i * 0.01), r2(y + i * lead), l, { size, fill })).join('');

/* ── the shared grid: columns computed from the cells, and a table that does not fit THROWS ── */
export const gridColumns = ({ title, headers, rows }) => {
  const n = headers.length;
  const widths = headers.map((h, c) => Math.max(estWidth(h), ...rows.map((r) => estWidth(r[c] ?? ''))));
  const needed = widths.reduce((a, b) => a + b, 0) + GRD.gutter * (n - 1);
  const avail = GRD.right - GRD.x0;
  if (needed > avail) {
    const widest = rows.concat([headers]).flatMap((r) => r.map((cell, c) => ({ cell, c }))).sort((a, b) => estWidth(b.cell) - estWidth(a.cell))[0];
    throw new Error(`grid "${title}" needs ${r2(needed)} units and the frame gives ${avail}. Shorten column ${widest.c + 1}, starting with "${widest.cell}".`);
  }
  const slack = n > 1 ? (avail - needed) / (n - 1) : 0;
  const lefts = [];
  let x = GRD.x0;
  for (let c = 0; c < n; c += 1) { lefts.push(r2(x)); x += widths[c] + GRD.gutter + slack; }
  return lefts;
};

/** The margin a grid has left, in units — reported for V022 rather than acted on. */
export const gridMargin = ({ headers, rows }) => {
  const widths = headers.map((h, c) => Math.max(estWidth(h), ...rows.map((r) => estWidth(r[c] ?? ''))));
  const needed = widths.reduce((a, b) => a + b, 0) + GRD.gutter * (headers.length - 1);
  return r2(GRD.right - GRD.x0 - needed);
};

export const gridSvg = ({ title, note, headers, rows, colours = [] }) => {
  const cols = gridColumns({ title, headers, rows });
  const head = headers.map((h, c) => t(cols[c], GRD.y0, h, { size: GRD.size, fill: AXIS, weight: 600 })).join('');
  const body = rows.map((cells, i) => [
    ...cells.map((cell, c) => t(cols[c], gridRowY(i), cell, { size: GRD.size, fill: c === 0 ? INK : (colours[i]?.[c] || INK), weight: c === 0 ? 600 : 400 })),
    line(GRD.x0, r2(gridRowY(i) + 9), GRD.right, r2(gridRowY(i) + 9), GRID, 1),
  ].join('')).join('');
  const noteLines = note ? wrapLines(note, { size: GRD.size }).length : 0;
  const h = r2(gridRowY(rows.length - 1) + 26 + (noteLines ? 8 + noteLines * 17 : 0));
  return [open(h, GRD.w), t(GRD.x0, 34, title, { size: 14, weight: 600 }),
    line(GRD.x0, r2(GRD.y0 + 9), GRD.right, r2(GRD.y0 + 9), AXIS, 1.5), head, body,
    note ? wrap(GRD.x0, r2(gridRowY(rows.length - 1) + 34), note, { size: GRD.size }) : '',
    close].join('');
};

/* ── the plot frame, and the two functions that keep labels on it ──────────── */
const frame = (xMax, yMax, { x0 = 66, x1 = 470, yTop = 66, yBot = 300 } = {}) => {
  const f = { xMax, yMax, x0, x1, yTop, yBot };
  f.X = (q) => r2(f.x0 + (q / xMax) * (f.x1 - f.x0));
  f.Y = (v) => r2(f.yBot - (v / yMax) * (f.yBot - f.yTop));
  return f;
};

/*
 * THE VERTICAL BUDGET UNDER A PLOT, written down, because Verify B measured two collisions inside it
 * on eleven of nineteen of packet 29's scenarios. Below yBot: +15 is a read-off's quantity, +32 is
 * the axis label, and a caption may not begin above +48. The y label goes UNDER the title and
 * end-anchored at the right edge of the plot, where nothing else in this layout ever goes.
 */
const axes = (f, xLabel, yLabel, { xTick = 'Cases', yTick = '$' } = {}) => [
  line(f.x0, f.yBot, r2(f.x1 + 14), f.yBot, AXIS, 2, ' marker-end="url(#arr)"'),
  line(f.x0, f.yBot, f.x0, r2(f.yTop - 14), AXIS, 2, ' marker-end="url(#arr)"'),
  t(r2(f.x1 + 16), r2(f.yBot + 16), xTick, { size: 12, fill: AXIS, weight: 600, anchor: 'end' }),
  t(r2(f.x0 - 6), r2(f.yTop - 4), yTick, { size: 12, fill: AXIS, weight: 600, anchor: 'end' }),
  t(f.x0, r2(f.yBot + 32), xLabel, { size: 11, fill: MUTED }),
  t(f.x1, r2(f.yTop - 12), yLabel, { size: 11, fill: MUTED, anchor: 'end' }),
].join('');

/*
 * A LABEL THAT CANNOT BE PLACED OFF-FRAME, because the placement asks the same `estWidth` the check
 * asks. SVG text neither wraps nor clips, so a label whose ANCHOR is inside the frame can still run
 * past it — packet 29's extent check found eleven on its first run. Start-anchored to the right of
 * the point; flipped to end-anchored on the left if that overruns; into the left margin rather than
 * off the edge if neither fits.
 */
const place = (x, y, text, colour, { size = 12, gap = 8, weight = 600, anchor = null } = {}) => {
  const w = estWidth(text, size);
  if (anchor === 'middle') {
    const half = w / 2;
    const cx = Math.max(GRD.x0 + half, Math.min(x, GRD.right - half));
    return t(r2(cx), r2(y), text, { size, fill: colour, weight, anchor: 'middle' });
  }
  if (x + gap + w <= GRD.right) return t(r2(x + gap), r2(y), text, { size, fill: colour, weight });
  if (x - gap - w >= GRD.x0) return t(r2(x - gap), r2(y), text, { size, fill: colour, weight, anchor: 'end' });
  return t(r2(Math.max(GRD.x0, Math.min(x, GRD.right - w))), r2(y), text, { size, fill: colour, weight });
};

/*
 * A straight line between two (q, v) pairs sampled from a FUNCTION, with its label against the last
 * point that fits inside the frame. A revenue line's reach is a property of the function; whether it
 * fits the picture is a property of the picture, and the two are reconciled here.
 */
const fnLine = (f, fn, colour, label, { from = 0, to = 1, n = 40, dash = false, labelAt = null, dy = 4, dx = 8 } = {}) => {
  const pts = [];
  for (let i = 0; i <= n; i += 1) {
    const q = f.xMax * (from + (to - from) * (i / n));
    const v = fn(q);
    if (v == null || !Number.isFinite(v) || v < 0 || v > f.yMax) continue;
    pts.push([q, v]);
  }
  const path = pts.slice(1).map(([q, v], i) => line(f.X(pts[i][0]), f.Y(pts[i][1]), f.X(q), f.Y(v), colour, 2.5, dash ? ' stroke-dasharray="6 4"' : '')).join('');
  const anchor = labelAt != null ? (pts.find(([q]) => q >= labelAt) ?? pts[pts.length - 1]) : pts[pts.length - 1];
  return path + (label ? place(f.X(anchor[0]), r2(f.Y(anchor[1]) + dy), label, colour, { gap: dx }) : '');
};

/*
 * A dashed read-off from a point to both axes.
 *
 * `offset` exists because of a class Verify B found on packet 29's third round and nothing
 * mechanical could see: A LABEL STRUCK THROUGH BY ITS OWN GUIDE LINE. A horizontal read-off drawn
 * at the label's own y passes along the whole length of the string, which the extent check and the
 * collision check both pass because the line is not text. The value is therefore printed four units
 * ABOVE its guide line, never on it.
 */
const readOff = (f, q, v, colour, { xText, yText, offset = -4 } = {}) => [
  line(f.x0, f.Y(v), f.X(q), f.Y(v), colour, 1.2, ' stroke-dasharray="4 4"'),
  line(f.X(q), f.Y(v), f.X(q), f.yBot, colour, 1.2, ' stroke-dasharray="4 4"'),
  dot(f.X(q), f.Y(v), colour, 4.5),
  t(r2(f.x0 - 6), r2(f.Y(v) + offset), yText ?? money(v), { size: 11, fill: colour, anchor: 'end', weight: 600 }),
  t(f.X(q), r2(f.yBot + 15), xText ?? qty(q), { size: 11, fill: colour, anchor: 'middle', weight: 600 }),
].join('');

const plotSvg = ({ title, note, body, height = 356 }) => {
  const noteLines = note ? wrapLines(note).length : 0;
  const h = r2(height + (noteLines ? noteLines * 14 + 8 : 0));
  return [open(h, GRD.w), t(GRD.x0, 30, title, { size: 13, weight: 600 }), body,
    note ? wrap(GRD.x0, r2(height + 4), note) : '', close].join('');
};

/* ══ 1 · Costs at four outputs (2.3.2 · 1b) ════════════════════════════════ */
/*
 * `1b` is a CALCULATION — "Calculation of fixed, variable costs, total costs and average costs" —
 * and the honest surface for a calculation is the table a student would build. Four outputs, and the
 * middle one is the break-even output, so the row a student will meet again in chapter 3 is already
 * on the screen in chapter 1 with its average cost equal to the price. That identity is the whole
 * reason this table has an average cost column at all.
 *
 * Revenue is NOT on this table. It arrives with the break-even chart, where it is a line rather than
 * a column, which keeps this grid at five columns and keeps `1a` and `1b` on separate screens.
 */
const costTable = {
  title: `${PLANT.name}: costs at four outputs`,
  headers: ['Cases', 'Fixed', 'Variable', 'Total', 'Average'],
  rows: PLANT.outputs.map((q) => [
    qty(q), money(PLANT.fc), money(PLANT.tvc(q)), money(PLANT.tc(q)), money(PLANT.ac(q)),
  ]),
  note: `Fixed costs do not move with output, so the ${money(PLANT.fc)} is the same in all four rows. Average cost falls because that ${money(PLANT.fc)} is spread over more ${PLANT.units}. At ${qty(PLANT.bep)} ${PLANT.units} average cost is ${money(PLANT.ac(PLANT.bep))} — the price — which is what chapter 3 calls the break-even point.`,
};

export const costsDiagram = {
  id: id('diagram', 'costs-at-four-outputs'),
  title: costTable.title,
  kind: 'table',
  caption: `Fixed, variable, total and average cost at four monthly outputs. The ${qty(PLANT.bep)}-case row is the break-even point.`,
  svg: gridSvg(costTable),
  _table: costTable,
};

/* ══ 2 · What moves a forecast (2.3.2 · 2b) ════════════════════════════════ */
/*
 * The specification's three factors, quantified — and NOTHING ELSE. `moving average` and
 * `extrapolation` are single hits at :1150-1152, which is 3.3.3 · 1, Unit 3, packet 14's section, so
 * a trend line on this diagram would be another section's leaf drawn in this one. `structure-07`
 * asks for the forecasting chapter to stop being purely descriptive; three signed effects and a
 * revised total is what 2.3.2 · 2b itself offers for that.
 *
 * The revised forecast stays ABOVE the break-even point, which is why the note can hand the margin
 * of safety to chapter 3 rather than end on a number with nothing to compare it to.
 */
/* The effect column, written once: a signed count of cases with the section's own minus sign. */
const effect = (n) => `${n < 0 ? '−' : '+'}${qty(Math.abs(n))}`;
/* One short reason a cell, because the full sentence is in the subsection that teaches the factor.
   Authored against `FORECAST.factors[].spec` so a renamed factor cannot silently lose its reason. */
const FORECAST_SHORT = { '2b-1': 'sugar, half the range', '2b-2': 'incomes rising', '2b-3': 'a rival opens' };

const forecastTable = {
  title: `A forecast, and the three factors that move it`,
  headers: ['Line', 'Cases', 'Why'],
  rows: [
    ['Base forecast', qty(FORECAST.base), 'last month again'],
    ...FORECAST.factors.map((f) => [f.factor, effect(f.effect), FORECAST_SHORT[f.spec]]),
    ['Revised forecast', qty(FORECAST.revised), 'all three applied'],
  ],
  note: `The three factors are the specification's own, and they do not point the same way: one adds and two subtract. At ${qty(FORECAST.revised)} ${PLANT.units} the plant is still above its break-even point of ${qty(PLANT.bep)}, but the margin of safety has fallen from ${qty(PLANT.mos)} ${PLANT.units} to ${qty(FORECAST.mos)}.`,
};

export const forecastDiagram = {
  id: id('diagram', 'forecast-factors'),
  title: forecastTable.title,
  kind: 'table',
  caption: `A base forecast adjusted for consumer trends, economic variables and the actions of competitors.`,
  svg: gridSvg(forecastTable),
  _table: forecastTable,
};

/* ══ 3 · The break-even chart (2.3.2 · 3b, 3c, 3d, 3e) ═════════════════════ */
/*
 * THE DIAGRAM THIS SECTION HAS NEVER HAD. Three lines, one intersection, two zones and a bracket,
 * and every one of them is derived: the revenue line is `PLANT.tr` sampled, the total cost line is
 * `PLANT.tc` sampled, the fixed cost line is `PLANT.fc` held flat, and the break-even point is
 * `PLANT.bep` — the solution, not a place on the picture that looks about right. The two zone
 * polygons are built from the SAME two functions, so a zone cannot be shaded on the wrong side of
 * the crossing.
 *
 * `3e` is interpretation, so the chart is laid out to be READ: the crossing carries both its
 * coordinates, the margin of safety is a bracket between two outputs rather than a label, and the
 * profit at the actual output is the vertical gap between the two lines — TR − TC, which is `1a`
 * and `1b`, and not contribution × units, which is Unit 3 (see `_packet31-util.mjs`).
 */
export const breakEvenDiagram = (() => {
  const f = frame(26000, 160000);
  const bepX = f.X(PLANT.bep), bepY = f.Y(PLANT.trAtBep);
  const actX = f.X(PLANT.actual);
  const trAct = f.Y(PLANT.tr(PLANT.actual)), tcAct = f.Y(PLANT.tc(PLANT.actual));
  const zoneN = 24;
  const between = (from, to) => {
    const top = [], bot = [];
    for (let i = 0; i <= zoneN; i += 1) {
      const q = from + (to - from) * (i / zoneN);
      top.push([f.X(q), f.Y(PLANT.tr(q))]);
      bot.push([f.X(q), f.Y(PLANT.tc(q))]);
    }
    return top.concat(bot.reverse());
  };
  /*
   * THE ZONES ARE SHADED AND THE GAPS ARE LABELLED; the words "PROFIT" and "LOSS" are NOT floated
   * into the shading, and that is a layout decision rather than a nudge. The first version put them
   * at (6,500 · $24,000) and (22,500 · $38,000), and the runner's collision check caught "PROFIT"
   * overlapping the "Fixed costs" label — both sat near y=240 because $38,000 and $36,000 are three
   * pixels apart on this frame. Hunting for a free spot is the wrong fix: a word dropped into a
   * shaded region tells a student less than the gap does. So each zone carries a measured vertical
   * gap instead, which is what `3e` asks a student to read.
   *
   * AND THE TWO GAPS ARE THE SAME FIGURE, which is derived rather than arranged: 10,000 and 20,000
   * ${PLANT.units} sit an equal 5,000 either side of the break-even point, and contribution is the
   * same at every output, so the loss at one is the profit at the other. A student who notices that
   * has understood what the chart is doing.
   */
  const lossQ = PLANT.bep - PLANT.mos;
  const trLoss = f.Y(PLANT.tr(lossQ)), tcLoss = f.Y(PLANT.tc(lossQ)), lossX = f.X(lossQ);
  const body = [
    /* Loss first, so the profit polygon paints over its own edge rather than under it. */
    poly(between(0, PLANT.bep), RED, ' opacity="0.14"'),
    poly(between(PLANT.bep, 26000), GREEN, ' opacity="0.16"'),
    axes(f, `Output and sales, ${PLANT.units} ${PLANT.per}`, `$ ${PLANT.per}`),
    /*
     * THE CURVE LABELS ARE "TR", "TC" AND "FC", AT THE RIGHT-HAND END, IN THE MARGIN — and getting
     * here took three renderings, each of which taught something no measurement had.
     *
     * Labelled in full at the right end, "Total costs" and the profit gap's figure read as one
     * cluster 15 units apart, which the collision check skipped at a 0.75-face tolerance. Moved to
     * the left third, where the lines are furthest apart, "Sales revenue" was then CROSSED BY ITS
     * OWN LINE: a 109-unit label on a line rising 60 units across that span passes under it at one
     * end and over it at the other, whatever the vertical offset. That is packet 29's
     * struck-through-by-a-guide-line class on a sloping curve, and the runner now has a check for it.
     *
     * A short label in the right margin cannot be crossed, because no line goes there — the plot
     * ends at x=470 and the frame at 534. "TR", "TC" and "FC" are the conventional abbreviations and
     * all three are written out in full in the note below, which is where a student reads them.
     */
    fnLine(f, () => PLANT.fc, MUTED, 'FC', { dash: true, dy: 4 }),
    fnLine(f, (q) => PLANT.tc(q), AMBER, 'TC', { dy: 4 }),
    fnLine(f, (q) => PLANT.tr(q), BLUE, 'TR', { dy: 4 }),
    readOff(f, PLANT.bep, PLANT.trAtBep, PURPLE, { xText: qty(PLANT.bep), yText: money(PLANT.trAtBep) }),
    /* BELOW and RIGHT of the crossing, which is the one place near it that no line passes through.
       Above it was crossed by both curves — they intersect there, so any label over the crossing is
       over two lines at once; the runner's line-crossing check found it seven times. Centred on the
       crossing would be struck by the vertical read-off instead. */
    place(bepX, r2(bepY + 18), 'Break-even point', PURPLE, { size: 11 }),
    /* The margin of safety is a bracket between two OUTPUTS, drawn under the output axis where it
       lives, because it is measured in cases and not in dollars. */
    line(bepX, r2(f.yBot + 40), actX, r2(f.yBot + 40), GREEN, 1.8),
    line(bepX, r2(f.yBot + 36), bepX, r2(f.yBot + 44), GREEN, 1.8),
    line(actX, r2(f.yBot + 36), actX, r2(f.yBot + 44), GREEN, 1.8),
    place(r2((bepX + actX) / 2), r2(f.yBot + 58), `Margin of safety ${qty(PLANT.mos)} ${PLANT.units}`, GREEN, { size: 11, anchor: 'middle' }),
    /*
     * THE TWO GAPS ARE MARKED AND THEIR FIGURES ARE IN THE CAPTION, not inside the plot — and that
     * is the second thing rendering the chart taught. A $12,000 gap on a $156,000 axis is 17.5
     * units tall, and an 11-unit label centred in it has its ascenders on one boundary line and its
     * descenders on the other. That is the "struck through by its own guide line" class from packet
     * 29's third Verify B round, arriving from the other direction: not a label crossed by a
     * read-off, but a label too big for the space it describes. There is no free spot to nudge it
     * to, so the number goes where there is unlimited room. `topFix-02` asks for the profit and loss
     * ZONES, the BEP and the margin of safety; it does not ask for the gaps to be captioned inside
     * the frame, and the shading plus a marked gap plus the figure in the caption is the whole of it.
     */
    line(lossX, trLoss, lossX, tcLoss, RED, 2.5),
    dot(lossX, trLoss, BLUE, 4), dot(lossX, tcLoss, AMBER, 4),
    line(actX, trAct, actX, tcAct, GREEN, 2.5),
    dot(actX, trAct, BLUE, 4), dot(actX, tcAct, AMBER, 4),
    t(lossX, r2(f.yBot + 15), qty(lossQ), { size: 11, fill: RED, anchor: 'middle', weight: 600 }),
    t(actX, r2(f.yBot + 15), qty(PLANT.actual), { size: 11, fill: GREEN, anchor: 'middle', weight: 600 }),
  ].join('');
  return {
    id: id('diagram', 'break-even-chart'),
    title: `${PLANT.name}: the break-even chart`,
    caption: `Sales revenue, total costs and fixed costs against output, with the loss and profit gaps measured. The lines cross at ${qty(PLANT.bep)} ${PLANT.units} and ${money(PLANT.trAtBep)}.`,
    svg: plotSvg({
      title: `${PLANT.name}: the break-even chart`,
      height: 420,
      body,
      note: `TR is sales revenue, TC is total costs and FC is fixed costs. Read it in this order. The revenue line starts at the origin, because nothing sold is nothing earned. The total cost line starts at ${money(PLANT.fc)}, because the fixed costs are owed at zero output. They cross at ${qty(PLANT.bep)} ${PLANT.units}: everything shaded red to the left of the crossing is a loss, everything shaded green to the right of it is a profit, and the height of the shading at any output is the amount. The two marked gaps read ${money(Math.abs(PLANT.profit(PLANT.bep - PLANT.mos)))} each — a loss at ${qty(PLANT.bep - PLANT.mos)} ${PLANT.units} and a profit at ${qty(PLANT.actual)} — and they are equal because those two outputs are the same distance either side of the crossing and each ${PLANT.unit} contributes the same ${money(PLANT.contribution)}. The ${qty(PLANT.mos)} ${PLANT.units} under the axis is the margin of safety: how far sales can fall before the plant is back at the crossing.`,
    }),
    _checks: {
      bep: PLANT.bep, bepValue: PLANT.trAtBep, actual: PLANT.actual,
      profit: PLANT.profit(PLANT.actual), mos: PLANT.mos, fc: PLANT.fc,
    },
  };
})();

/* ══ 4 · The cash-flow forecast (2.3.2 · 4a) ═══════════════════════════════ */
/*
 * The surface `4a` names, and the one a `Construct [4]` can honestly ask for. Receipts are the
 * PREVIOUS month's sales, because the plant gives thirty days' credit — which is the single mechanic
 * that makes constructing this table an exercise rather than a copy, and the reason the closing
 * balance goes negative in a month whose trading is unremarkable.
 *
 * `C-planning-raising-finance-specGap-05` asks for "calculations based on changes in the cash-flow
 * variables". The change is the same $0.40 a case that moves the break-even point in chapter 3, so
 * one changed figure is read twice, and its row is on this table rather than in a second diagram.
 */
const cashTable = {
  title: `${PLANT.name}: cash-flow forecast, three months`,
  headers: ['', 'Month 1', 'Month 2', 'Month 3'],
  rows: [
    ['Opening balance', ...CASHFLOW.rows.map((r) => money(r.opening))],
    ['Receipts', ...CASHFLOW.rows.map((r) => money(r.receipts))],
    ['Payments', ...CASHFLOW.rows.map((r) => money(r.payments))],
    ['Net cash flow', ...CASHFLOW.rows.map((r) => money(r.net))],
    ['Closing balance', ...CASHFLOW.rows.map((r) => money(r.closing))],
    ['If costs rise $0.40', ...CASHFLOW.changed.map((r) => money(r.closing))],
  ],
  note: `Each month's receipts are the month BEFORE's sales, because customers have ${CASHFLOW.creditDays} days to pay. Closing balance is opening plus net cash flow, and it becomes the next month's opening — which is why one bad month is carried forward. The last row changes ONE figure, the ${money(0.4)} a case from chapter 3, and every closing balance after it is negative.`,
};

export const cashFlowDiagram = {
  id: id('diagram', 'cash-flow-forecast'),
  title: cashTable.title,
  kind: 'table',
  caption: `Opening balance, receipts, payments, net cash flow and closing balance over three months, with the change case on the last row.`,
  svg: gridSvg(cashTable),
  _table: cashTable,
};

/* ══ 5 · Budget, actual and variance (2.3.2 · 5c) ══════════════════════════ */
/*
 * The one table in this section that argues rather than reports. Revenue is favourable, profit is
 * adverse, and the three variances RECONCILE to the profit variance — which the runner asserts
 * against `BUDGET.reconciliation`. The section's own common mistakes already warn a student that
 * favourable does not mean good; this is that warning with the arithmetic attached, and
 * `structure-07`'s complaint that the section ends on a definition with no variance calculation.
 *
 * Every variance is a positive amount with a word, never a signed number: the sign of a favourable
 * cost variance and a favourable revenue variance point opposite ways, and the convention is set in
 * `_packet31-util.mjs` and asserted by the runner.
 */
const varianceTable = {
  title: `${PLANT.name}: ${BUDGET.month} budget against actual`,
  headers: ['Line', 'Budget', 'Actual', 'Variance'],
  rows: [
    ...BUDGET.lines.map((l) => [l.label, money(l.budget), money(l.actual), `${money(l.variance)} ${l.favourable ? 'F' : 'A'}`]),
    [BUDGET.profit.label, money(BUDGET.profit.budget), money(BUDGET.profit.actual), `${money(BUDGET.profit.variance)} ${BUDGET.profit.favourable ? 'F' : 'A'}`],
  ],
  note: `F is favourable and A is adverse. Sales revenue beat its budget by ${money(BUDGET.lines[0].variance)} and profit still missed by ${money(BUDGET.profit.variance)}, because the extra ${PLANT.units} carried variable costs with them: ${money(BUDGET.lines[0].variance)} favourable less ${money(BUDGET.lines[1].variance)} and ${money(BUDGET.lines[2].variance)} adverse is exactly the ${money(BUDGET.profit.variance)} on the bottom row. A variance is worth nothing on its own line.`,
};

export const varianceDiagram = {
  id: id('diagram', 'budget-variance'),
  title: varianceTable.title,
  kind: 'table',
  caption: `Budgeted and actual revenue, costs and profit for one month, with each variance marked favourable or adverse.`,
  svg: gridSvg(varianceTable),
  _table: varianceTable,
};

export const DIAGRAMS = [costsDiagram, forecastDiagram, breakEvenDiagram, cashFlowDiagram, varianceDiagram];

/** Every declared table's remaining margin, for the V022 report the runner prints. */
export const TABLE_MARGINS = DIAGRAMS.filter((d) => d._table).map((d) => ({ id: d.id, title: d.title, margin: gridMargin(d._table) }));
