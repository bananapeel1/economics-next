/**
 * PACKET 29 — market-structures-contestability: eight diagrams, one pinned to each chapter.
 *
 * THE LIVE SECTION HAS FIVE DIAGRAMS AND THREE OF THEM ARE WRONG IN THE SAME WAY. `accuracy-01`,
 * `-02` and `-03` are one defect described three times: the curves were drawn by hand as bezier
 * paths and the marked points were then typed in beside them, so nothing forced the two to agree.
 *
 *   - `accuracy-02`, perfect competition long run: the AR line at y=160 lies ABOVE the AC path
 *     everywhere, so a diagram captioned "tangent at minimum AC, normal profit only" shows
 *     supernormal profit. E at (270,160) is not on the AC curve, which passes through y=170 there.
 *   - `accuracy-01`, monopolistic competition long run: at the labelled tangency E (225,148) the AR
 *     line is at y≈158 and AC at y≈171 — AR sits 13px above AC, which is the opposite of a tangency
 *     and is the very thing the section's own examMatters says to avoid. Its AC path also FALLS at
 *     high output, which no average cost curve does, and the excess-capacity bracket is measured to
 *     x=295 when the AC minimum is at x≈240.
 *   - `accuracy-03`, monopoly: the MR = MC dot is 23px above the actual intersection of the two
 *     lines, Pm is drawn 14px off the AR curve, and the shaded welfare-loss triangle has an apex
 *     46 units from the AR/MC crossing it is supposed to be measured from. This is the diagram the
 *     section's own text calls the most important in the unit, and it is the one Learn Mode shows.
 *
 * SO NOTHING HERE IS DRAWN. Every curve is a function sampled at points, every marked point is the
 * solution of an equation in `_packet29-util.mjs`, and the runner re-derives all of it a second time
 * out of the emitted SVG — because a figure computed correctly and then printed into the wrong
 * `<text>` is the same defect one layer along. A tangency is tangent here because AR'(q) equals
 * AC'(q) at that q, which the runner asserts; the picture cannot disagree with the arithmetic
 * because the picture is generated FROM the arithmetic.
 *
 * `topFix-02` asks for four things and all four are below: the perfect-competition long run redrawn
 * with AR genuinely tangent to a clean U-shaped AC at its minimum; the monopolistic-competition long
 * run with the tangency to the LEFT of the minimum and the excess capacity measured to the AC
 * minimum itself; the monopoly diagram with MR = MC, Pm, Qc and the welfare-loss polygon all
 * recomputed from curve intersections; and a third-degree price-discrimination two-market diagram,
 * which the live examMatters promised and the section never had.
 *
 * ONE MEASURING FUNCTION FOR THE WHOLE SECTION. `estWidth` is packet 24's browser-measured bound and
 * `wrapLines` asks it for every candidate line rather than counting characters, so a caption cannot
 * be laid out wider than the guard will accept (packet 25 shipped 56 lines packed at 0.65 em against
 * a guard measuring at 0.7). `gridColumns` computes each column from its own widest cell and THROWS
 * when a table does not fit, so a collision is unrepresentable rather than detected afterwards.
 * `diagram.table-legible` was recalibrated on 17 September to the 530px column a laptop really
 * gives; the grids below are authored short against it and the runner reports the margin.
 */
import {
  id, money, qty, pct, elasticity, round2,
  COSTS, MWANGI, NILE, ZAHRA, NATURAL, PD, MONOPSONY, CR, GAME, PRICING,
  EFFICIENCY, BARRIERS, INTERDEPENDENCE, NON_PRICE, CONTESTABLE,
} from './_packet29-util.mjs';

const INK = '#e8ecf5', AXIS = '#94a3b8', GRID = '#475569', MUTED = '#7a8299';
const BLUE = '#3b82f6', GREEN = '#059669', RED = '#ef4444', AMBER = '#f59e0b', PURPLE = '#8b5cf6';

const M = MWANGI, NI = NILE, Z = ZAHRA, NAT = NATURAL, MS = MONOPSONY, G = GAME, PR = PRICING;
export const r2 = round2;

const open = (h = 400, w = 560) => `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',system-ui,sans-serif;background:transparent"><defs><marker id="arr" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="${AXIS}"/></marker></defs>`;
const close = '</svg>';
const t = (x, y, text, { size = 11, fill = INK, anchor = 'start', weight = 400 } = {}) =>
  `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${text}</text>`;
const line = (x1, y1, x2, y2, stroke, w = 2, extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${w}"${extra}/>`;
const rect = (x, y, w, h, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none"${extra}/>`;
const dot = (x, y, fill, r = 3.5) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;
const poly = (points, fill, extra = '') => `<polygon points="${points.map(([x, y]) => `${x} ${y}`).join(',')}" fill="${fill}"${extra}/>`;

/* ── the one bound ─────────────────────────────────────────────────────────── */
/*
 * Packet 24's measured bound: all 92 strings in its tables read with getComputedTextLength() at the
 * 800px column, where four characters or more reach 0.601 em and a lone character reaches 0.874 em,
 * rounded up to 0.7 and 0.9. It is an ESTIMATE and the runner's guard imports THIS function, so the
 * two cannot disagree. The independent measurement is the browser one in Verify B.
 */
export const GRD = { w: 560, x0: 26, y0: 78, rowH: 30, right: 534, size: 11, gutter: 14 };
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
 * Each wrapped line is emitted at an x one hundredth of a unit further right. That is not decoration:
 * the validator groups <text> by y and reads rows sharing x positions as a grid, so a four-line
 * caption under a drawn curve would otherwise pull a drawing into `diagram.table-kind` (packet 24).
 */
const wrap = (x, y, text, { size = 10, fill = MUTED, lead = 14, maxWidth = GRD.right - GRD.x0 } = {}) =>
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

export const gridSvg = ({ title, note, headers, rows, colours = [] }) => {
  const cols = gridColumns({ title, headers, rows });
  const head = headers.map((h, c) => t(cols[c], GRD.y0, h, { size: GRD.size, fill: AXIS, weight: 600 })).join('');
  const body = rows.map((cells, i) => [
    ...cells.map((cell, c) => t(cols[c], gridRowY(i), cell, { size: GRD.size, fill: c === 0 ? INK : (colours[i]?.[c] || INK), weight: c === 0 ? 600 : 400 })),
    line(GRD.x0, r2(gridRowY(i) + 9), GRD.right, r2(gridRowY(i) + 9), GRID, 1),
  ].join('')).join('');
  const noteLines = note ? wrapLines(note).length : 0;
  const h = r2(gridRowY(rows.length - 1) + 26 + (noteLines ? 8 + noteLines * 14 : 0));
  return [open(h, GRD.w), t(GRD.x0, 34, title, { size: 13, weight: 600 }),
    line(GRD.x0, r2(GRD.y0 + 9), GRD.right, r2(GRD.y0 + 9), AXIS, 1.5), head, body,
    note ? wrap(GRD.x0, r2(gridRowY(rows.length - 1) + 34), note) : '',
    close].join('');
};

/* ── the 2x2 matrix, carried from packet 27 ────────────────────────────────── */
/*
 * MTX.x0 leaves room for the row labels on the left, which are end-anchored against it. The cell
 * text is centred in its own half and must fit on ONE line: `matrixSvg` throws otherwise, naming the
 * cell, because a second line would put four labels on two x positions and cost the diagram its
 * "what a correct diagram shows" checklist under `diagram.table-kind` (packet 22 found this first).
 * 3.3.3 · 5c-1 asks for exactly this shape — a two-firm, two-outcome model — so the constraint and
 * the requirement agree.
 */
const MTX = { x0: 116, x1: 534, yTop: 92, height: 190, cellSize: 13, labelSize: 10, axisSize: 11 };

export const matrixSvg = ({ title, xAxis, yAxis, cells, note, colours = [] }) => {
  const midX = r2((MTX.x0 + MTX.x1) / 2);
  const yBot = r2(MTX.yTop + MTX.height);
  const midY = r2(MTX.yTop + MTX.height / 2);
  const cellW = r2((MTX.x1 - MTX.x0) / 2 - 16);
  const centreX = [r2((MTX.x0 + midX) / 2), r2((midX + MTX.x1) / 2)];
  const centreY = [r2((MTX.yTop + midY) / 2 + 4), r2((midY + yBot) / 2 + 4)];

  const drawn = [];
  for (let row = 0; row < 2; row += 1) {
    for (let col = 0; col < 2; col += 1) {
      const text = cells[row][col];
      if (estWidth(text, MTX.cellSize) > cellW) {
        throw new Error(`matrix "${title}" cell [${yAxis.values[row]} / ${xAxis.values[col]}] = "${text}" measures ${r2(estWidth(text, MTX.cellSize))} units and the cell gives ${cellW}. One line per cell: shorten it.`);
      }
      drawn.push(t(centreX[col], centreY[row], text, { size: MTX.cellSize, weight: 600, anchor: 'middle', fill: colours[row]?.[col] || INK }));
    }
  }
  for (const [i, label] of yAxis.values.entries()) {
    if (estWidth(label, MTX.labelSize) > MTX.x0 - GRD.x0 - 10) {
      throw new Error(`matrix "${title}" row label "${label}" does not fit the ${MTX.x0 - GRD.x0 - 10}-unit margin.`);
    }
    drawn.push(t(r2(MTX.x0 - 10), centreY[i], label, { size: MTX.labelSize, fill: AXIS, anchor: 'end', weight: 600 }));
  }
  for (const [i, label] of xAxis.values.entries()) {
    drawn.push(t(centreX[i], r2(yBot + 20), label, { size: MTX.labelSize, fill: AXIS, anchor: 'middle', weight: 600 }));
  }
  const noteLines = note ? wrapLines(note).length : 0;
  const h = r2(yBot + 40 + (noteLines ? noteLines * 14 : 0));
  return [open(h),
    t(GRD.x0, 34, title, { size: 13, weight: 600 }),
    /* Both dimension names horizontal. Packet 22 rotated one by −90 and every extent check in this
     * programme measures a rotated label as if it ran across the page, so its width is read against
     * the wrong frame. Horizontal is honest and it is also legible on a phone. */
    t(GRD.x0, 58, `${yAxis.name} ↓`, { size: MTX.axisSize, fill: AXIS, weight: 600 }),
    t(MTX.x1, 58, `${xAxis.name} →`, { size: MTX.axisSize, fill: AXIS, weight: 600, anchor: 'end' }),
    rect(MTX.x0, MTX.yTop, r2(MTX.x1 - MTX.x0), MTX.height, ` stroke="${AXIS}" stroke-width="2"`),
    line(midX, MTX.yTop, midX, yBot, GRID, 1.5),
    line(MTX.x0, midY, MTX.x1, midY, GRID, 1.5),
    drawn.join(''),
    note ? wrap(GRD.x0, r2(yBot + 40), note) : '',
    close].join('');
};

/* ── a plot frame, for the diagrams that are drawings ──────────────────────── */

const plotFor = (xMax, yMax, { x0 = 66, x1 = 470, yTop = 60, yBot = 300 } = {}) => {
  const f = { x0, x1, yTop, yBot, xMax, yMax };
  f.X = (q) => r2(f.x0 + (q / xMax) * (f.x1 - f.x0));
  f.Y = (v) => r2(f.yBot - (v / yMax) * (f.yBot - f.yTop));
  return f;
};

const axes = (f, xLabel, yLabel, { xTick = 'Q', yTick = '$' } = {}) => [
  line(f.x0, f.yBot, r2(f.x1 + 14), f.yBot, AXIS, 2, ' marker-end="url(#arr)"'),
  line(f.x0, f.yBot, f.x0, r2(f.yTop - 14), AXIS, 2, ' marker-end="url(#arr)"'),
  t(r2(f.x1 + 16), r2(f.yBot + 16), xTick, { size: 12, fill: AXIS, weight: 600, anchor: 'end' }),
  /* The currency tick sits just above the axis arrow, not 18 units up: at yTop-18 it reached y=38
   * in the one view whose plot starts high (the five-band predatory comparison) and printed into the
   * title. Four units clears the arrowhead and stays clear of the title in every view. */
  t(r2(f.x0 - 6), r2(f.yTop - 4), yTick, { size: 12, fill: AXIS, weight: 600, anchor: 'end' }),
  /*
   * THE VERTICAL BUDGET UNDER A PLOT, WRITTEN DOWN, because Verify B measured two collisions inside
   * it on eleven of nineteen scenarios. Below yBot: +15 is a read-off's quantity, +32 is this axis
   * label, and a caption may not begin above +48 — which is why `plotSvg`'s default height is 356
   * against a yBot of 300. The first version put the label at +46 and the caption at height+4 = 344,
   * so the axis label printed through the caption's first line and neither could be read.
   *
   * AND THE Y LABEL GOES UNDER THE TITLE, not beside it. At (x0, yTop-34) it sat at y=26 while the
   * title sits at y=30 with a 13-unit face, so "$ a crate" printed through "Mwangi Orchards" and the
   * two read on screen as one string. It is now end-anchored at the right edge of the plot, where
   * nothing else in this layout ever goes.
   */
  t(f.x0, r2(f.yBot + 32), xLabel, { size: 11, fill: MUTED }),
  t(f.x0, r2(f.yTop - 12), yLabel, { size: 11, fill: MUTED }),
].join('');

/*
 * A LABEL THAT CANNOT BE PLACED OFF-FRAME, because the placement asks the same `estWidth` the check
 * asks. Packet 23 shipped "welfare loss $50 a d" to a phone: its ANCHOR was comfortably inside the
 * frame and the string ran to x=514 in 500 units, because SVG text neither wraps nor clips. The
 * runner's extent check found eleven of these on the first run of this section — a curve label at a
 * demand curve's x-intercept, five band labels to the right of a plot, three titles and two axis
 * labels. Measuring afterwards is not the fix; placing it so it fits is, and this is that function.
 * It tries start-anchored to the right of the point, flips to end-anchored on the left if that
 * overruns, and gives up into the left margin rather than off the edge.
 */
const place = (x, y, text, colour, { size = 12, gap = 8, weight = 600 } = {}) => {
  const w = estWidth(text, size);
  if (x + gap + w <= GRD.right) return t(r2(x + gap), r2(y), text, { size, fill: colour, weight });
  if (x - gap - w >= GRD.x0) return t(r2(x - gap), r2(y), text, { size, fill: colour, weight, anchor: 'end' });
  return t(r2(Math.max(GRD.x0, Math.min(x, GRD.right - w))), r2(y), text, { size, fill: colour, weight });
};

/** A (q, v) pair clamped to the plot, by walking back along the segment until both are inside. */
const clamp = (f, [q0, v0], [q1, v1]) => {
  let lo = 0, hi = 1;
  const at = (s) => [q0 + (q1 - q0) * s, v0 + (v1 - v0) * s];
  const inside = ([q, v]) => q >= 0 && q <= f.xMax && v >= 0 && v <= f.yMax;
  if (inside(at(1))) return at(1);
  for (let i = 0; i < 40; i += 1) { const mid = (lo + hi) / 2; if (inside(at(mid))) lo = mid; else hi = mid; }
  return at(lo);
};

/** A curve sampled from a FUNCTION at `n` points, with its label against the last point that fits. */
const curve = (f, fn, colour, label, { from = 0.02, to = 1, n = 48, dash = false, labelAt = null, dy = 4, dx = 8 } = {}) => {
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
 * A straight line between two (q, v) pairs, with the far end CLAMPED to the plot. The first version
 * drew AR to its own x-intercept, which for P = 80 - 6.5Q is Q = 12.3 on a frame whose xMax is 9 —
 * so the line ran past the axis and its label was placed off the canvas entirely. A demand curve's
 * intercept is a property of the demand curve; whether it fits the picture is a property of the
 * picture, and the two are reconciled here rather than by choosing intercepts that happen to fit.
 */
const straight = (f, a, b, colour, label, { dash = false, dx = 8, dy = 4 } = {}) => {
  const end = clamp(f, a, b);
  return line(f.X(a[0]), f.Y(a[1]), f.X(end[0]), f.Y(end[1]), colour, 2.5, dash ? ' stroke-dasharray="6 4"' : '')
    + (label ? place(f.X(end[0]), r2(f.Y(end[1]) + dy), label, colour, { gap: dx }) : '');
};

/** A dashed read-off from a point to both axes, with the two values printed against them. */
const readOff = (f, q, v, colour, { xText, yText } = {}) => [
  line(f.x0, f.Y(v), f.X(q), f.Y(v), colour, 1.2, ' stroke-dasharray="4 4"'),
  line(f.X(q), f.Y(v), f.X(q), f.yBot, colour, 1.2, ' stroke-dasharray="4 4"'),
  dot(f.X(q), f.Y(v), colour, 4.5),
  t(r2(f.x0 - 6), r2(f.Y(v) + 4), yText ?? money(v), { size: 11, fill: colour, anchor: 'end', weight: 600 }),
  t(f.X(q), r2(f.yBot + 15), xText ?? qty(q), { size: 11, fill: colour, anchor: 'middle', weight: 600 }),
].join('');

const plotSvg = ({ title, note, body, height = 356 }) => {
  const noteLines = note ? wrapLines(note).length : 0;
  const h = r2(height + (noteLines ? noteLines * 14 + 8 : 0));
  return [open(h, GRD.w), t(GRD.x0, 30, title, { size: 13, weight: 600 }), body,
    note ? wrap(GRD.x0, r2(height + 4), note) : '', close].join('');
};

/* ══ 1 · Efficiency and concentration (3.3.3 · 1a, 2a, 2b) ═════════════════ */
/*
 * ALL FOUR CONCEPTS OF `1a` ON ONE PAIR OF CURVES, which is the point of putting the chapter first.
 * Productive efficiency is the minimum of AC, allocative efficiency is where a price line meets MC,
 * and X-inefficiency is a point ABOVE the AC curve at the same output — the one of the four that
 * cannot be a point ON the curves, which is exactly what students get wrong.
 */
/*
 * THE PRICE LINE IS DRAWN, AND LAYER 6 IS WHY. The first version marked a bare point on the MC curve
 * "allocative: P = MC = $8" without drawing any price or demand curve at all. The adversarial review
 * called it circular — marginal cost trivially equals itself — and it was worse than circular: it
 * teaches that allocative efficiency is a FIXED spot on a firm's cost curves, the way productive
 * efficiency is, when the whole point of the pair is that productive efficiency is a property of the
 * cost curves alone and allocative efficiency depends on the PRICE. So the market price of $72 from
 * chapter 2 is drawn, allocative efficiency is marked where it meets MC at 8 crates, and the two
 * markers sit at DIFFERENT outputs, which is the thing a student has to see.
 */
const efficiencyView = () => {
  const f = plotFor(10, 80);
  const qe = COSTS.atMinAc.q;
  const qa = M.shortRun.q;
  const wasteful = 32;
  return plotSvg({
    title: 'Three efficiencies and one inefficiency, on one firm',
    body: [
      axes(f, `${M.units} ${M.per}`, `$ a ${M.unit}`),
      curve(f, (q) => COSTS.ac(q), GREEN, 'AC', { from: 0.25, to: 0.98, labelAt: 9.4, dy: -8 }),
      curve(f, (q) => COSTS.mc(q), PURPLE, 'MC', { from: 0.2, to: 0.9, labelAt: 8.6, dy: 14 }),
      line(f.X(0), f.Y(M.shortRun.price), f.X(f.xMax * 0.98), f.Y(M.shortRun.price), BLUE, 2.5),
      t(r2(f.x0 + 8), r2(f.Y(M.shortRun.price) - 8), `a market price of ${money(M.shortRun.price)}`, { size: 11, fill: BLUE, weight: 600 }),
      readOff(f, qe, COSTS.minAc, AMBER, { xText: qty(qe), yText: money(COSTS.minAc) }),
      t(r2(f.X(qe) + 10), r2(f.Y(COSTS.minAc) + 20), `productive: MC = AC = ${money(COSTS.minAc)}`, { size: 11, fill: AMBER, weight: 600 }),
      /*
       * THE WASTE IS DRAWN AS A SEGMENT, NOT AS A SECOND DOT. The X-inefficient point is deliberately
       * at the SAME output as the productive one — that is the teaching point, the same output at a
       * higher cost — and on an 80-unit scale the $4 between them is twelve units, which Verify B
       * measured as a 1.4px edge gap at 390px: the two dots read as one smudge. The gap is now the
       * thing that is drawn, with the two dots as its ends.
       */
      /*
       * THE X-INEFFICIENT MARKER IS A TICK, NOT A SECOND CIRCLE. Two circles twelve units apart on an
       * 80-unit scale are 1.4 px apart at 390 px and read as one lozenge, and the connector between
       * them was painted BEFORE them so the circles covered it — Verify B could not read it as a gap.
       * A horizontal rule is distinguishable from a dot at any scale, and it says the right thing:
       * the amber circle is a POINT the firm could reach, the red rule is the cost LEVEL it is
       * actually paying. The connector is drawn last so nothing covers it.
       */
      line(r2(f.X(qe) - 9), f.Y(wasteful), r2(f.X(qe) + 9), f.Y(wasteful), RED, 3),
      line(f.X(qe), f.Y(COSTS.minAc), f.X(qe), f.Y(wasteful), RED, 2),
      t(r2(f.X(qe) + 10), r2(f.Y(wasteful) - 10), `X-inefficient: ${money(wasteful)}`, { size: 11, fill: RED, weight: 600 }),
      t(r2(f.X(qe) - 10), r2((f.Y(COSTS.minAc) + f.Y(wasteful)) / 2 + 4), `${money(r2(wasteful - COSTS.minAc))} of waste`, { size: 11, fill: RED, weight: 600, anchor: 'end' }),
      dot(f.X(qa), f.Y(COSTS.mc(qa)), BLUE, 5),
      t(r2(f.X(qa) - 10), r2(f.Y(COSTS.mc(qa)) + 18), `allocative: P = MC at ${qty(qa)}`, { size: 11, fill: BLUE, weight: 600, anchor: 'end' }),
    ].join(''),
    note: `The two static tests fall at DIFFERENT outputs, which is why they are two tests. Productive efficiency is a property of the cost curves alone: ${qty(qe)} ${M.units}, the lowest point of average cost at ${money(COSTS.minAc)}, identifiable because marginal cost cuts average cost there. Allocative efficiency depends on the PRICE — at ${money(M.shortRun.price)} it holds at ${qty(qa)} ${M.units}, where the price line meets marginal cost, and at a different price it would hold somewhere else. X-inefficiency is the only one of the four that is not a point ON either curve: at ${qty(qe)} ${M.units} this firm is paying ${money(wasteful)} rather than the ${money(COSTS.minAc)} attainable, which is ${money(r2(wasteful - COSTS.minAc))} a ${M.unit} of waste. Dynamic efficiency cannot be drawn at all, because it is this whole picture moving down over time.`,
  });
};

const concentrationView = () => gridSvg({
  title: 'Two markets, one five-firm concentration ratio',
  headers: ['Rank', 'Market A', 'Market B'],
  rows: [
    ['1st', pct(CR.firms[0][1]), pct(CR.twin.firms[0][1])],
    ['2nd', pct(CR.firms[1][1]), pct(CR.twin.firms[1][1])],
    ['3rd', pct(CR.firms[2][1]), pct(CR.twin.firms[2][1])],
    ['4th', pct(CR.firms[3][1]), pct(CR.twin.firms[3][1])],
    ['5th', pct(CR.firms[4][1]), pct(CR.twin.firms[4][1])],
    ['CR3', pct(CR.cr3), pct(CR.twin.cr3)],
    ['CR5', pct(CR.cr5), pct(CR.twin.cr5)],
  ],
  colours: [[], [], [], [], [], [INK, AMBER, AMBER], [INK, GREEN, GREEN]],
  note: `An n-firm concentration ratio adds the shares of the largest n firms, so both markets read ${pct(CR.cr5)} on CR5 and they are not the same market. Market A has a clear leader and a three-firm ratio of ${pct(CR.cr3)}; market B has five near-equals and ${pct(CR.twin.cr3)}. Which is why a ratio is meaningless without its n, and why neither figure says anything about how the firms behave or about whether a firm outside could enter.`,
});

export const efficiencyDiagram = {
  id: id('diagram', 'efficiency and concentration'),
  title: 'Efficiency and Concentration',
  description: `IAL 3.3.3 · 1a names four concepts — allocative, productive and dynamic efficiency and X-inefficiency — and asks for efficiency in different market structures; 2a asks for the calculation of n-firm concentration ratios and 2b for their significance.`,
  scenarios: [
    { label: 'The four concepts on one firm', svg: efficiencyView() },
    { label: 'Concentration ratios', svg: concentrationView() },
  ],
};

/* ══ 2 · Perfect competition (3.3.3 · 3a-3d) ═══════════════════════════════ */
/*
 * THREE PRICES, ONE COST SPINE, AND ALL THREE ARE EXACT ROOTS OF MC(q) = P. That is what makes this
 * the answer to `accuracy-02` rather than a redrawing of it: the price line is placed at a price, the
 * output is the solution of an equation, and the two cannot be inconsistent because the second is
 * computed from the first. In the long-run scenario the price line lies at ${money(COSTS.minAc)},
 * which IS the minimum of the average cost curve, so the line is tangent to the curve by
 * construction rather than by eye.
 */
const pcView = (outcome, { label, showAvc = false, annotate }) => {
  const f = plotFor(10, 80);
  const o = outcome;
  return plotSvg({
    title: `${M.name}: ${label}`,
    body: [
      axes(f, `${M.units} ${M.per}`, `$ a ${M.unit}`),
      curve(f, (q) => COSTS.ac(q), GREEN, 'AC', { from: 0.28, to: 0.98, labelAt: 9.4, dy: -8 }),
      showAvc ? curve(f, (q) => COSTS.avc(q), BLUE, 'AVC', { from: 0.2, to: 0.98, labelAt: 9.4, dy: 14 }) : '',
      curve(f, (q) => COSTS.mc(q), PURPLE, 'MC', { from: 0.2, to: 0.82, labelAt: 8, dy: 4 }),
      /* The label goes at the LEFT margin above the line rather than pulled back from its right end:
       * at dx -108 it landed on the MC curve's own label, which Verify B measured as "MC" printing
       * through the "P" of "AR = MR = P". */
      line(f.X(0), f.Y(o.price), f.X(f.xMax * 0.98), f.Y(o.price), RED, 2.5),
      t(r2(f.x0 + 8), r2(f.Y(o.price) - 8), 'AR = MR = P', { size: 12, fill: RED, weight: 600 }),
      readOff(f, o.q, o.price, AMBER, { xText: qty(o.q), yText: money(o.price) }),
      annotate(f, o),
    ].join(''),
    note: `The firm takes the price as given, so its demand curve is the horizontal line at ${money(o.price)} and it produces where marginal cost reaches that price: ${qty(o.q)} ${M.units}, the exact root of MC(q) = ${money(o.price)}. Average cost there is ${money(o.ac)}, total revenue ${money(o.revenue)} and total cost ${money(o.tc)}, so profit is ${money(o.profit)}.`,
  });
};

const pcShortRunView = () => pcView(M.shortRun, {
  label: `short run at ${money(M.shortRun.price)}`,
  annotate: (f, o) => [
    poly([[f.X(0.02), f.Y(o.price)], [f.X(o.q), f.Y(o.price)], [f.X(o.q), f.Y(o.ac)], [f.X(0.02), f.Y(o.ac)]], 'rgba(5,150,105,0.16)'),
    t(r2(f.X(o.q) / 2 + 20), r2((f.Y(o.price) + f.Y(o.ac)) / 2 + 4), `supernormal ${money(o.profit)}`, { size: 11, fill: GREEN, weight: 600, anchor: 'middle' }),
  ].join(''),
});

const pcLongRunView = () => pcView(M.longRun, {
  label: `long run at ${money(M.longRun.price)}`,
  annotate: (f, o) => t(r2(f.x0 + 10), r2(f.Y(o.price) + 22), `P = MR = MC = AC: normal profit`, { size: 11, fill: GREEN, weight: 600 }),
});

const pcShutdownView = () => pcView(M.shutdown, {
  label: `the shutdown point at ${money(M.shutdown.price)}`,
  showAvc: true,
  annotate: (f, o) => [
    poly([[f.X(0.02), f.Y(o.ac)], [f.X(o.q), f.Y(o.ac)], [f.X(o.q), f.Y(o.price)], [f.X(0.02), f.Y(o.price)]], 'rgba(239,68,68,0.16)'),
    t(r2(f.x0 + 8), r2(f.Y(o.ac) - 8), `loss ${money(o.profit)} = the fixed cost`, { size: 11, fill: RED, weight: 600 }),
  ].join(''),
});

const pcScheduleView = () => gridSvg({
  title: `${M.name}: the cost schedule, in dollars a ${M.unit}`,
  headers: [`${M.units[0].toUpperCase()}${M.units.slice(1)}`, 'AFC', 'AVC', 'AC', 'MC'],
  rows: COSTS.rows.map((r) => [qty(r.q), money(r.afc), money(r.avc), money(r.ac), money(r.mc)]),
  colours: COSTS.rows.map((r) => [INK, MUTED, r.q === COSTS.atMinAvc.q ? BLUE : INK, r.q === COSTS.atMinAc.q ? GREEN : INK, (r.q === COSTS.atMinAvc.q || r.q === COSTS.atMinAc.q) ? AMBER : INK]),
  note: `Two rows carry the whole chapter. At ${qty(COSTS.atMinAvc.q)} ${M.units} average variable cost is at its lowest, ${money(COSTS.minAvc)}, and marginal cost is the same figure — so ${money(COSTS.minAvc)} is the short-run shutdown price. At ${qty(COSTS.atMinAc.q)} ${M.units} average cost is at its lowest, ${money(COSTS.minAc)}, and marginal cost is again the same — so ${money(COSTS.minAc)} is the long-run competitive price. Marginal cost cutting each average at its own minimum is not a drawing convention; it is arithmetic, and it is why these two prices are the ones the diagrams use. ${qty(7)} ${M.units} is left off the table because the fixed cost does not divide into it exactly.`,
});

export const pcDiagram = {
  id: id('diagram', 'perfect competition equilibria'),
  title: 'Perfect Competition: Short Run, Long Run and Shutdown',
  description: `IAL 3.3.3 · 3b asks for profit-maximising equilibrium in the short run AND the long run, 3c for the short-run shutdown point, and 3d for productive and allocative efficiency in both periods. A correct diagram shows a horizontal AR = MR = P line, output where it meets MC, and the profit area measured between price and average cost at that output.`,
  scenarios: [
    { label: 'The cost schedule', svg: pcScheduleView() },
    { label: `Short run: supernormal profit`, svg: pcShortRunView() },
    { label: `Long run: normal profit`, svg: pcLongRunView() },
    { label: `The shutdown point`, svg: pcShutdownView() },
  ],
};

/* ══ 3 · Monopolistic competition (3.3.3 · 4a-4d) ══════════════════════════ */
/*
 * THE TANGENCY IS A CONSTRAINT AND NOT A DRAWING. `accuracy-01` is a diagram whose labelled tangency
 * has AR thirteen pixels above AC. Here the long-run demand curve is DERIVED from the cost curve:
 * its gradient is AC'(4) and its intercept follows, so AR touches AC at 4 ${NI.units} and lies below
 * it everywhere else as a matter of algebra. The excess-capacity bracket is measured to the AC
 * MINIMUM, which is the other half of that finding.
 */
const mcView = (state, { label, showExcess = false }) => {
  const f = plotFor(9, 90);
  const s = state;
  return plotSvg({
    title: `${NI.name}: ${label}`,
    body: [
      axes(f, `${NI.units} ${NI.per}`, `$ a ${NI.unit}`),
      curve(f, (q) => COSTS.ac(q), GREEN, 'AC', { from: 0.3, to: 0.99, labelAt: 8.4, dy: -8 }),
      curve(f, (q) => COSTS.mc(q), PURPLE, 'MC', { from: 0.2, to: 0.85, labelAt: 7.2, dy: 4 }),
      straight(f, [0, s.arFn(0)], [s.a / s.b * 0.99, s.arFn(s.a / s.b * 0.99)], RED, 'AR', { dx: 6, dy: -4 }),
      straight(f, [0, s.mrFn(0)], [s.a / (2 * s.b) * 0.99, s.mrFn(s.a / (2 * s.b) * 0.99)], AMBER, 'MR', { dx: 6, dy: 12 }),
      readOff(f, s.q, s.price, BLUE, { xText: qty(s.q), yText: money(s.price) }),
      dot(f.X(s.q), f.Y(s.mc), PURPLE, 5),
      t(r2(f.X(s.q) + 10), r2(f.Y(s.mc) + 4), `MR = MC = ${money(s.mc)}`, { size: 11, fill: PURPLE, weight: 600 }),
      s.profit > 0
        ? poly([[f.X(0.02), f.Y(s.price)], [f.X(s.q), f.Y(s.price)], [f.X(s.q), f.Y(s.ac)], [f.X(0.02), f.Y(s.ac)]], 'rgba(5,150,105,0.16)')
          + t(r2(f.X(s.q) / 2 + 20), r2((f.Y(s.price) + f.Y(s.ac)) / 2 + 4), `supernormal ${money(s.profit)}`, { size: 11, fill: GREEN, weight: 600, anchor: 'middle' })
        : t(r2(f.x0 + 8), r2(f.Y(s.price) - 10), `AR touches AC: normal profit`, { size: 11, fill: GREEN, weight: 600 }),
      showExcess
        ? [
          line(f.X(s.q), r2(f.yBot + 26), f.X(NI.productiveOutput), r2(f.yBot + 26), AMBER, 1.5),
          dot(f.X(NI.productiveOutput), f.Y(COSTS.minAc), AMBER, 4),
          t(r2((f.X(s.q) + f.X(NI.productiveOutput)) / 2), r2(f.yBot + 40), `excess capacity ${qty(NI.excessCapacity)}`, { size: 11, fill: AMBER, weight: 600, anchor: 'middle' }),
          t(r2(f.X(NI.productiveOutput) + 8), r2(f.Y(COSTS.minAc) + 16), `min AC ${money(COSTS.minAc)} at ${qty(NI.productiveOutput)}`, { size: 11, fill: AMBER, weight: 600 }),
        ].join('')
        : '',
    ].join(''),
    body_note: null,
    note: s.profit > 0
      ? `Demand slopes down because the product is differentiated, so MR lies below AR at every output above zero. MR = MC at ${qty(s.q)} ${NI.units} and the price is read off AR there: ${money(s.price)}, not the ${money(s.mr)} on the marginal revenue curve. Average cost is ${money(s.ac)}, so profit is ${money(s.profit)} — and the price already exceeds marginal cost, so the firm is not allocatively efficient even before entry begins.`
      : `Entry by close substitutes has pushed AR left and flattened it until it just TOUCHES average cost. The gradient of this demand curve is exactly AC'(${qty(s.q)}) = ${elasticity(COSTS.acSlope(s.q))}, which is what makes it a tangency and not a crossing, and at a tangency MR = MC holds as well: ${money(s.mr)} = ${money(s.mc)}. Price ${money(s.price)} equals average cost, so profit is ${money(s.profit)}. The point of contact is on the FALLING part of AC, ${qty(NI.excessCapacity)} ${NI.units} short of the lowest-cost output of ${qty(NI.productiveOutput)} — so neither productive nor allocative efficiency holds.`,
  });
};

const mcShortView = () => mcView(NI.short, { label: `short run, AR = ${NI.short.a} ${'−'} ${NI.b}Q` });
const mcLongView = () => mcView(NI.long, { label: `long run, AR = ${NI.long.a} ${'−'} ${NI.b}Q`, showExcess: true });

export const mcDiagram = {
  id: id('diagram', 'monopolistic competition equilibria'),
  title: 'Monopolistic Competition: the Long-Run Tangency',
  description: `IAL 3.3.3 · 4c asks for profit-maximising equilibrium in the short run and the long run and 4d for productive and allocative efficiency in both. A correct long-run diagram shows AR TANGENT to AC on the falling part of the curve, output where MR meets MC at that same quantity, price read off AR, and the excess capacity measured to the minimum of AC.`,
  scenarios: [
    { label: 'Short run: supernormal profit', svg: mcShortView() },
    { label: 'Long run: tangency and excess capacity', svg: mcLongView() },
  ],
};

/* ══ 4 · Barriers to entry and exit (3.3.3 · 5a, 5b) ═══════════════════════ */

const barriersView = () => gridSvg({
  title: 'The six barriers to entry and exit',
  headers: ['Barrier', 'How it works'],
  rows: BARRIERS.map(([k, short]) => [k, short]),
  note: `These are 3.3.3 · 5b, in the specification's own order, and they belong to OLIGOPOLY: monopoly (6b) is the case where the same six stand at their highest, and contestability (8) is the case where they are low. Two of the six are created by government — patents and legal restrictions — and one, limit pricing, is a decision the incumbent takes afresh every day rather than a feature of the market.`,
});

/*
 * LIMIT PRICING ON ONE PRICE AXIS, because the whole point is a comparison of three numbers and the
 * usual cost-curve treatment buries it. `specGap-05` records that limit pricing appears in the live
 * section only as the answer to a quiz item.
 */
const limitPricingView = () => {
  const f = plotFor(10, 40, { x0: 66, x1: 470, yTop: 70, yBot: 260 });
  /* The label sits just ABOVE its own line and inside the plot: to the right of x=454 in a 560-unit
   * frame there is room for about six characters, which is what put five of these off the canvas. */
  const band = (v, colour, label, dashed) => [
    line(f.x0, f.Y(v), f.X(9.6), f.Y(v), colour, 2.5, dashed ? ' stroke-dasharray="6 4"' : ''),
    t(r2(f.x0 - 6), r2(f.Y(v) + 4), money(v), { size: 11, fill: colour, anchor: 'end', weight: 600 }),
    t(r2(f.x0 + 10), r2(f.Y(v) - 6), label, { size: 11, fill: colour, weight: 600 }),
  ].join('');
  return plotSvg({
    title: 'Limit pricing: a price between two average costs',
    body: [
      axes(f, 'units a day', '$ a unit'),
      poly([[f.X(0.1), f.Y(PR.entrantAc)], [f.X(9.6), f.Y(PR.entrantAc)], [f.X(9.6), f.Y(PR.limit)], [f.X(0.1), f.Y(PR.limit)]], 'rgba(239,68,68,0.14)'),
      poly([[f.X(0.1), f.Y(PR.limit)], [f.X(9.6), f.Y(PR.limit)], [f.X(9.6), f.Y(PR.incumbentAc)], [f.X(0.1), f.Y(PR.incumbentAc)]], 'rgba(5,150,105,0.16)'),
      /* THE ANNOTATION IS FOLDED INTO ITS OWN BAND LABEL. Two centred annotations between the bands
       * shared a row with the band labels beside them, which the box-collision check found. One
       * string a band cannot collide with itself, and it reads better: the figure is beside the line
       * it belongs to rather than floating between two. */
      band(PR.entrantAc, RED, `an entrant’s AC — entry would lose ${money(Math.abs(PR.limitMarginEntrant))} a unit`, true),
      band(PR.limit, AMBER, `the limit price — it blocks entry`, false),
      band(PR.incumbentAc, GREEN, `the incumbent’s AC — it earns ${money(PR.limitMarginIncumbent)} a unit`, true),
    ].join(''),
    height: 320,
    note: `Economies of scale give the incumbent an average cost of ${money(PR.incumbentAc)} where an entrant starting small would face ${money(PR.entrantAc)}. Any price in the green band blocks entry at a profit, and ${money(PR.limit)} is one such price: the incumbent keeps ${money(PR.limitMarginIncumbent)} a unit and an entrant selling at the same price would lose ${money(Math.abs(PR.limitMarginEntrant))}. The barrier is not that entry is forbidden; it is that entry cannot pay. Compare this with predatory pricing in the next chapter, where the price goes BELOW the incumbent's own average variable cost of ${money(PR.incumbentAvc)} and the incumbent takes a loss on purpose.`,
  });
};

export const barriersDiagram = {
  id: id('diagram', 'barriers to entry and limit pricing'),
  title: 'Barriers to Entry and Exit',
  description: `IAL 3.3.3 · 5b names six barriers to entry and exit: economies of scale, limit pricing, patents, branding, sunk costs and legal. A correct limit-pricing diagram shows a price below the average cost an entrant would face and above the incumbent's own.`,
  scenarios: [
    { label: 'The six barriers', svg: barriersView() },
    { label: 'Limit pricing', svg: limitPricingView() },
  ],
};

/* ══ 5 · Interdependence and collusion (3.3.3 · 5c, 5d) ════════════════════ */
/*
 * `5c-1` ASKS FOR A TWO-FIRM, TWO-OUTCOME MODEL AND `matrixSvg` DRAWS EXACTLY THAT. Its one-line-per-
 * cell constraint and the requirement agree: four payoff pairs, one per cell, each readable at a
 * glance, which is what lets a student reason down a column the way the chapter does.
 */
const gameView = () => matrixSvg({
  title: `A two-firm, two-outcome game: profit in ${G.unit}`,
  yAxis: { name: G.firmA, values: ['Hold price', 'Cut price'] },
  xAxis: { name: G.firmB, values: ['Hold price', 'Cut price'] },
  cells: [
    [`${qty(G.holdHold[0])} , ${qty(G.holdHold[1])}`, `${qty(G.holdCut[0])} , ${qty(G.holdCut[1])}`],
    [`${qty(G.cutHold[0])} , ${qty(G.cutHold[1])}`, `${qty(G.cutCut[0])} , ${qty(G.cutCut[1])}`],
  ],
  colours: [[GREEN, MUTED], [MUTED, RED]],
  note: `${G.firmA}'s profit first in each cell. Read DOWN a column to find ${G.firmA}'s best reply: if ${G.firmB} holds, cutting pays ${qty(G.cutHold[0])} against ${qty(G.holdHold[0])}; if ${G.firmB} cuts, cutting pays ${qty(G.cutCut[0])} against ${qty(G.holdCut[0])}. Cutting is better in both columns, so it is a dominant strategy — and by symmetry it is dominant for ${G.firmB} too. Both cut, and the pair lands in the red cell at ${qty(G.cutCut[0])} each. The green cell would have paid them ${qty(G.jointLoss)} more between them, and neither can reach it alone: that is the case for collusion, and the reason it keeps failing is that breaking the agreement pays ${qty(G.temptation)} more than keeping it.`,
});

const interdependenceView = () => gridSvg({
  title: 'The five faces of interdependence',
  headers: ['Form', 'What it is'],
  rows: INTERDEPENDENCE.map(([k, short]) => [k, short]),
  note: `3.3.3 · 5c names these five, and the kinked demand curve is not among them — it is not in the specification at all. Two of the five are ways of colluding and they differ in whether anything was agreed: a cartel is overt and can be prosecuted on the evidence of the agreement, while price leadership is tacit and leaves nothing to find. 5d then asks what collusion costs and gains PRODUCERS, CONSUMERS, WORKERS and GOVERNMENTS — a different list from the one the next chapter uses.`,
});

export const gameDiagram = {
  id: id('diagram', 'game theory and interdependence'),
  title: 'Interdependence: the Two-Firm Game',
  description: `IAL 3.3.3 · 5c asks for the interdependence of firms: simple game theory in a two-firm/two-outcome model, reasons for collusive and non-collusive behaviour, cartels, price leadership and price wars. A correct payoff matrix names both firms, both choices and carries one profit pair in each of the four cells.`,
  scenarios: [
    { label: 'The payoff matrix', svg: gameView() },
    { label: 'The five forms', svg: interdependenceView() },
  ],
};

/* ══ 6 · Price and non-price competition (3.3.3 · 5e-5g) ═══════════════════ */

/*
 * FIVE BANDS NEED MORE VERTICAL ROOM THAN THREE. On a 40-unit scale across 190 units of plot, the
 * incumbent's $16 average variable cost and the $14 predatory price are nine units apart and their
 * labels are nearly nine units tall, so the two collided. The scale is cut to the range the figures
 * actually occupy and the plot is deepened, which separates them without moving anything by hand.
 */
const predatoryView = () => {
  const f = plotFor(10, 36, { x0: 66, x1: 470, yTop: 56, yBot: 288 });
  /*
   * THE LOWEST BAND'S LABEL GOES BELOW ITS OWN LINE. Five bands over a 36-unit scale put the
   * incumbent's $16 average variable cost and the $14 predatory price thirteen units apart, and a
   * label is eleven units tall — so placing the $14 label above its line leaves its top edge ON the
   * $16 line. My own estimate of the glyph box missed that by a tenth of a unit while Verify B, which
   * measures the rendered box, reported the label struck through along its whole length. Below the
   * line there are ninety units of clear space to the axis, so the fix is placement and not margin.
   */
  const band = (v, colour, label, dashed, below = false) => [
    line(f.x0, f.Y(v), f.X(9.6), f.Y(v), colour, 2.5, dashed ? ' stroke-dasharray="6 4"' : ''),
    t(r2(f.x0 - 6), r2(f.Y(v) + 4), money(v), { size: 11, fill: colour, anchor: 'end', weight: 600 }),
    t(r2(f.x0 + 10), r2(f.Y(v) + (below ? 16 : -6)), label, { size: 11, fill: colour, weight: 600 }),
  ].join('');
  return plotSvg({
    title: 'Predatory and limit pricing, one incumbent',
    body: [
      axes(f, 'units a day', '$ a unit'),
      poly([[f.X(0.1), f.Y(PR.incumbentAvc)], [f.X(9.6), f.Y(PR.incumbentAvc)], [f.X(9.6), f.Y(PR.predatory)], [f.X(0.1), f.Y(PR.predatory)]], 'rgba(239,68,68,0.18)'),
      band(PR.entrantAc, MUTED, `an entrant's AC`, true),
      band(PR.limit, GREEN, `limit price — profitable`, false),
      band(PR.incumbentAc, AMBER, `the incumbent's AC`, true),
      band(PR.incumbentAvc, BLUE, `the incumbent's AVC — the shutdown line`, true),
      band(PR.predatory, RED, `predatory price — losing ${money(Math.abs(PR.predatoryLossPerUnit))} a unit on purpose`, false, true),
    ].join(''),
    height: 348,
    note: `One axis and five figures separate the two practices students most often confuse. The limit price of ${money(PR.limit)} sits between the incumbent's ${money(PR.incumbentAc)} and an entrant's ${money(PR.entrantAc)}, so it blocks entry while earning ${money(PR.limitMarginIncumbent)} a unit. The predatory price of ${money(PR.predatory)} sits BELOW the incumbent's own average variable cost of ${money(PR.incumbentAvc)} — below the shutdown point of chapter 2 — so the firm loses ${money(Math.abs(PR.predatoryLossPerUnit))} on every unit it sells, deliberately, until the rival goes. If the price then reaches ${money(PR.afterwards)} it recovers ${money(PR.recoveredPerUnit)} a unit, and it can only rely on that where the barriers of chapter 4 keep the next entrant out.`,
  });
};

const nonPriceView = () => gridSvg({
  title: 'The five forms of non-price competition',
  headers: ['Form', 'What it does'],
  rows: NON_PRICE.map(([k, short]) => [k, short]),
  note: `3.3.3 · 5f names these five and three of them are routinely forgotten: endorsement, product placement and after-sales service. The specification names no other form, and the three above are the ones students most often leave out. Firms prefer these to a price cut because a cut is matched within days and leaves everybody with the same customers and less money, while a reputation or a service network takes rivals years to copy and makes demand less elastic. 5g then asks what price AND non-price competition cost and gain FIRMS, CONSUMERS, EMPLOYEES and SUPPLIERS.`,
});

export const competitionDiagram = {
  id: id('diagram', 'price and non-price competition'),
  title: 'Price and Non-Price Competition',
  description: `IAL 3.3.3 · 5e names three forms of price competition — price wars, predatory pricing and limit pricing — and 5f five forms of non-price competition. A correct diagram distinguishing predatory from limit pricing shows which average cost each price sits below.`,
  scenarios: [
    { label: 'Predatory against limit pricing', svg: predatoryView() },
    { label: 'The five non-price forms', svg: nonPriceView() },
  ],
};

/* ══ 7 · Monopoly (3.3.3 · 6a-6h) ══════════════════════════════════════════ */
/*
 * `accuracy-03` IS THE DIAGRAM THIS REPLACES, AND ITS DEFECT WAS ARITHMETIC RATHER THAN DRAUGHTSMAN-
 * SHIP: the MR = MC dot sat 23px off the intersection and the welfare-loss triangle's apex 46
 * units from the AR/MC crossing it claimed to measure from. Every vertex below is a solution. Qm is
 * the root of MR(q) = MC, Pm is AR(Qm), Qc is the root of AR(q) = MC, and the triangle's three
 * vertices are (Qm, Pm), (Qm, MC) and (Qc, MC) — so its area is ½ × (Qc − Qm) × (Pm − MC) by
 * construction, which is the ${money(Z.dwl)} the caption states.
 */
const monopolyView = () => {
  const f = plotFor(30, 130);
  return plotSvg({
    title: `${Z.name}: equilibrium and the welfare loss`,
    body: [
      axes(f, `${Z.units} ${Z.per}`, `$ a ${Z.unit}`),
      /* `id="dwl"` so the runner can find THIS polygon: `open()` puts an arrowhead polygon in
       * <defs>, and the first version of the vertex check matched that one and reported the
       * arrowhead's three points as the welfare triangle's. A check that finds the wrong element is
       * worse than no check, because it fires. */
      poly([[f.X(Z.qm), f.Y(Z.pm)], [f.X(Z.qm), f.Y(Z.mc)], [f.X(Z.qc), f.Y(Z.mc)]], 'rgba(239,68,68,0.22)', ' id="dwl"'),
      straight(f, [0, Z.ar(0)], [Z.a / Z.b * 0.99, Z.ar(Z.a / Z.b * 0.99)], BLUE, 'AR = D', { dx: 6, dy: -4 }),
      straight(f, [0, Z.mr(0)], [Z.a / (2 * Z.b), Z.mr(Z.a / (2 * Z.b))], AMBER, 'MR', { dx: 6, dy: 14 }),
      straight(f, [0, Z.mc], [f.xMax * 0.98, Z.mc], PURPLE, 'MC = AC', { dx: -78, dy: -8 }),
      readOff(f, Z.qm, Z.pm, GREEN, { xText: qty(Z.qm), yText: money(Z.pm) }),
      dot(f.X(Z.qm), f.Y(Z.mc), AMBER, 5),
      t(r2(f.X(Z.qm) + 10), r2(f.Y(Z.mc) - 10), `MR = MC at ${qty(Z.qm)}`, { size: 11, fill: AMBER, weight: 600 }),
      dot(f.X(Z.qc), f.Y(Z.mc), BLUE, 5),
      t(r2(f.X(Z.qc) + 8), r2(f.Y(Z.mc) + 18), `competitive ${qty(Z.qc)} at ${money(Z.mc)}`, { size: 11, fill: BLUE, weight: 600, anchor: 'end' }),
      t(r2(f.X(Z.qm) + 14), r2((f.Y(Z.pm) + f.Y(Z.mc)) / 2), `welfare loss ${money(Z.dwl)}`, { size: 11, fill: RED, weight: 600 }),
    ].join(''),
    note: `Every point here is a solution rather than a placement. MR = ${Z.a} ${'−'} ${Z.b * 2}Q, so MR = MC gives Q = ${qty(Z.qm)} ${Z.units}; the price is AR at that output, ${money(Z.pm)}, and NOT the ${money(Z.mc)} on the MR curve. Profit is ${money(Z.profit)}. A competitive industry with the same marginal cost would produce where AR = MC: ${qty(Z.qc)} ${Z.units} at ${money(Z.mc)}. The shaded triangle has vertices at (${qty(Z.qm)}, ${money(Z.pm)}), (${qty(Z.qm)}, ${money(Z.mc)}) and (${qty(Z.qc)}, ${money(Z.mc)}), so its area is ½ × ${qty(Z.withheld)} × ${money(r2(Z.pm - Z.mc))} = ${money(Z.dwl)} — the value of ${Z.units} worth more to buyers than they would have cost to supply, which nobody receives.`,
  });
};

const naturalView = () => {
  const f = plotFor(2000, 60, { x0: 78, x1: 470 });
  return plotSvg({
    title: 'Natural monopoly: an average cost that never stops falling',
    body: [
      axes(f, 'units a day', '$ a unit'),
      curve(f, (q) => NAT.lrac(q), GREEN, 'LRAC', { from: 0.07, to: 0.99, labelAt: 1900, dy: -8 }),
      readOff(f, NAT.market, NAT.one, AMBER, { xText: qty(NAT.market), yText: money(NAT.one) }),
      readOff(f, NAT.market / 2, NAT.two, RED, { xText: qty(NAT.market / 2), yText: money(NAT.two) }),
      t(r2(f.X(NAT.market) + 10), r2(f.Y(NAT.one) - 8), `one firm: ${money(NAT.one)}`, { size: 11, fill: AMBER, weight: 600 }),
      t(r2(f.X(NAT.market / 2) + 10), r2(f.Y(NAT.two) - 8), `two firms, half each: ${money(NAT.two)}`, { size: 11, fill: RED, weight: 600 }),
    ].join(''),
    note: `Average cost is ${money(NAT.perUnit)} a unit delivered plus a network of ${money(NAT.networkCost)} a day spread over output, so it falls at every quantity and never turns up. The market takes ${qty(NAT.market)} units: one firm serves them at ${money(NAT.one)} a unit, while two firms serving ${qty(NAT.market / 2)} each pay ${money(NAT.two)}, because each has duplicated the whole network for half the customers. Competition has raised the cost of supply by ${money(NAT.extraPerUnit)} a unit, ${money(NAT.extraTotal)} a day, and gained nothing. The firm will still restrict output and raise price as the previous diagram shows, so the policy answer is to allow one supplier and regulate it rather than to split it.`,
  });
};

const pdView = () => {
  const f = plotFor(24, 130);
  const mk = (m, colour, label) => [
    straight(f, [0, m.a], [m.a / m.b, 0], colour, label, { dx: 6, dy: -4 }),
    readOff(f, m.q, m.price, colour, { xText: qty(m.q), yText: money(m.price) }),
  ].join('');
  return plotSvg({
    title: 'Price discrimination: two markets, one MC',
    body: [
      axes(f, `${Z.units} ${Z.per}`, `$ a ${Z.unit}`),
      /* Both demand lines end on the x axis, so a label placed at the end of either lands on the
       * MC line and on the other's label. Each market is therefore labelled at its own READ-OFF,
       * with its elasticity on the line below it, and MC is labelled at the left margin. */
      line(f.X(0), f.Y(PD.mc), f.X(f.xMax * 0.98), f.Y(PD.mc), PURPLE, 2.5),
      t(r2(f.x0 + 8), r2(f.Y(PD.mc) - 8), `MC = ${money(PD.mc)}`, { size: 12, fill: PURPLE, weight: 600 }),
      mk(PD.less, RED, ''),
      mk(PD.more, BLUE, ''),
      t(r2(f.X(PD.less.q) + 12), r2(f.Y(PD.less.price) - 12), `${PD.less.label}: \u007cPED\u007c ${PD.less.ped.toFixed(2)}`, { size: 11, fill: RED, weight: 600 }),
      t(r2(f.X(PD.more.q) + 12), r2(f.Y(PD.more.price) - 12), `${PD.more.label}: \u007cPED\u007c ${PD.more.ped.toFixed(2)}`, { size: 11, fill: BLUE, weight: 600 }),
    ].join(''),
    note: `The same ${Z.good} at the same marginal cost of ${money(PD.mc)}, sold into two markets the firm can tell apart and between which nothing can be resold. Setting MR = MC in each gives ${qty(PD.less.q)} ${Z.units} at ${money(PD.less.price)} in ${PD.less.label} and ${qty(PD.more.q)} at ${money(PD.more.price)} in ${PD.more.label}. The elasticities at those points are ${elasticity(-PD.less.ped)} and ${elasticity(-PD.more.ped)}, so the rule is visible rather than asserted: the LESS elastic market pays the higher price, ${money(PD.gap)} more. Total profit is ${money(PD.totalProfit)}. Which consumers gain depends on which market they are in — and the elastic market may be served only because discrimination is possible at all.`,
  });
};

export const monopolyDiagram = {
  id: id('diagram', 'monopoly equilibrium and welfare'),
  title: 'Monopoly: Equilibrium, Welfare Loss and Price Discrimination',
  description: `IAL 3.3.3 · 6c asks for the profit-maximising equilibrium, 6d for costs and benefits to firms and consumers, 6e for natural monopoly and its implications, 6f for the conditions for third-degree price discrimination and 6g for its costs and benefits. A correct monopoly diagram shows output where MR cuts MC, the price vertically above it ON the AR curve, and the welfare loss as the area between AR and MC over the output withheld.`,
  scenarios: [
    { label: 'Equilibrium and the welfare loss', svg: monopolyView() },
    { label: 'Natural monopoly', svg: naturalView() },
    { label: 'Third-degree price discrimination', svg: pdView() },
  ],
};

/* ══ 8 · Monopsony and contestability (3.3.3 · 7a, 7b, 8a-8d) ══════════════ */
/*
 * `specGap-01` AND `quiz-01` BOTH SAY MONOPSONY IS TESTED AND NEVER TAUGHT, and this is the diagram
 * that has to carry it. The one property a student must be able to read off it is that the wage comes
 * from the SUPPLY curve and the employment level from the MCL = MRP intersection — two different
 * curves, which is the mirror of the monopoly error of reading a price off MR.
 */
const monopsonyView = () => {
  const f = plotFor(30, 220, { x0: 72, x1: 470 });
  return plotSvg({
    title: 'Monopsony: wage and employment',
    body: [
      axes(f, `${MS.input} employed`, '$ a worker a day', { xTick: 'L' }),
      /* The supply and MRP labels are placed at the LEFT margin on their own rows rather than against
       * the curve ends: at the right-hand end they sat on the dashed $80 and $65 read-offs, which ran
       * straight through their letterforms (Verify B measured 40 and 44 units of one and 98 of the
       * other). A read-off is horizontal, so the only safe place for a label is a row no read-off uses. */
      straight(f, [0, MS.supply(0)], [f.xMax * 0.98, MS.supply(f.xMax * 0.98)], BLUE, '', {}),
      t(r2(f.x0 + 8), r2(f.yTop + 14), 'S = AC of labour', { size: 11, fill: BLUE, weight: 600 }),
      straight(f, [0, MS.mcl(0)], [r2((f.yMax - MS.w0) / (2 * MS.slope)) * 0.98, MS.mcl(r2((f.yMax - MS.w0) / (2 * MS.slope)) * 0.98)], RED, 'MCL', { dx: 6, dy: -4 }),
      straight(f, [0, MS.mrp(0)], [MS.mrp0 / MS.mrpSlope * 0.98, MS.mrp(MS.mrp0 / MS.mrpSlope * 0.98)], GREEN, 'MRP', { dx: -42, dy: 16 }),
      readOff(f, MS.mono.l, MS.mono.wage, AMBER, { xText: qty(MS.mono.l), yText: money(MS.mono.wage) }),
      dot(f.X(MS.mono.l), f.Y(MS.mono.mrp), RED, 5),
      t(r2(f.X(MS.mono.l) + 10), r2(f.Y(MS.mono.mrp) + 4), `MCL = MRP = ${money(MS.mono.mrp)}`, { size: 11, fill: RED, weight: 600 }),
      readOff(f, MS.comp.l, MS.comp.wage, GREEN, { xText: qty(MS.comp.l), yText: money(MS.comp.wage) }),
      /* Four labels crowd the $80 read-off, and this one grazed the supply curve's own label by
       * 20x1 units — visible on screen as the tail of one running under the start of the other.
       * It moves to its own row above them all. */
      t(r2(f.x0 + 8), r2(f.yTop + 42), `competitive: ${qty(MS.comp.l)} at ${money(MS.comp.wage)}`, { size: 11, fill: GREEN, weight: 600 }),
    ].join(''),
    note: `Supply is w = ${money(MS.w0)} + ${MS.slope}L, and because there is only one buyer that curve is the AVERAGE cost of labour. Hiring one more worker means paying more to everyone already employed, so the MARGINAL cost of labour is ${money(MS.w0)} + ${MS.slope * 2}L — twice the gradient, above supply everywhere. The firm hires where MCL meets MRP: ${qty(MS.mono.l)} ${MS.input}. The wage is then read off SUPPLY at that employment, ${money(MS.mono.wage)}, and not off MCL. A competitive market would settle where supply meets MRP: ${qty(MS.comp.l)} at ${money(MS.comp.wage)} — ${qty(MS.jobGap)} more jobs at ${money(MS.wageGap)} more each. The last worker hired adds ${money(MS.mono.mrp)} and is paid ${money(MS.mono.wage)}, so a minimum wage anywhere between ${money(MS.mono.wage)} and ${money(MS.comp.wage)} would raise the wage AND employment.`,
  });
};

const contestabilityView = () => gridSvg({
  title: 'What makes a market contestable',
  headers: ['Characteristic', 'What it means'],
  rows: CONTESTABLE.map(([k, short]) => [k, short]),
  note: `3.3.3 · 8a asks for these characteristics, and the one students omit is the second: a firm that cannot LEAVE without loss hesitates to enter, which is why 8d gives the significance of sunk costs its own requirement. The consequence 8b asks for follows from all five together — profitability held near the normal level and a price set low enough that entering is not worth the trouble, however few firms are actually in the market. None of it survives if incumbents raise sunk costs deliberately, through brand spending, capacity built ahead of demand or long exclusive contracts.`,
});

export const monopsonyDiagram = {
  id: id('diagram', 'monopsony and contestability'),
  title: 'Monopsony and Contestability',
  description: `IAL 3.3.3 · 7a asks for the assumptions and conditions for a monopsony to operate and 7b for its costs and benefits to firms, consumers and employees; 8a asks for the characteristics of contestable markets. A correct monopsony diagram shows MCL above the supply curve, employment where MCL meets MRP, and the wage read off the SUPPLY curve at that employment.`,
  scenarios: [
    { label: 'Monopsony', svg: monopsonyView() },
    { label: 'Contestable markets', svg: contestabilityView() },
  ],
};

export const DIAGRAMS = [
  efficiencyDiagram, pcDiagram, mcDiagram, barriersDiagram,
  gameDiagram, competitionDiagram, monopolyDiagram, monopsonyDiagram,
];
