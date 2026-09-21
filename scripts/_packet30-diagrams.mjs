/**
 * PACKET 30 — managing-people: SIX diagrams, one pinned to each chapter, from ZERO.
 *
 * `structure-04` is the finding and it is precise about what is missing: *"Zero diagrams for a
 * section whose canonical visuals are an org chart (tall vs flat, chain of command, span of control),
 * a matrix grid, and Maslow's pyramid/Herzberg's two-scale diagram."* All four are below, and the
 * first three are the same diagram — because tall and flat are one firm reorganised, not two firms.
 *
 * NOTHING IS DRAWN BY HAND. `orgChartSvg` takes a SHAPE from `_packet30-util.mjs` — a span, a level
 * count and the people at each level, all computed from `(span**levels − 1)/(span − 1)` — and lays
 * out the boxes from it. So the tall chart has 31 people because the arithmetic says 31, the flat
 * chart has 31 for the same reason, and the two cannot disagree. A student who counts the boxes gets
 * the number in the caption. Packet 29's lesson in the other direction: three of its five live
 * diagrams were wrong because the curve was drawn and the point beside it was typed in.
 *
 * AND THIS IS THE SECTION WHERE A DRAWN DIAGRAM IS ON THE PAPER. `Construct (4)` — "requires
 * students to draw an accurately labelled diagram" — is one of Business's eight command words, this
 * programme had never used it before packet 18 found it, and an org chart with the chain of command
 * and a span of control marked is exactly what it asks for. So chapters 3 and 4 carry checklists and
 * the three reference tables do not (`diagram.table-checklist`: "what a correct diagram shows" reads
 * as an instruction to reproduce a lookup table nobody draws in an exam).
 *
 * THE MEASURING FUNCTION IS SHARED WITH THE RUNNER'S GUARD, which is packet 25's fifth instance and
 * packet 29's rule 5: `estWidth` here is what `place` asks before positioning a label and what the
 * runner's extent check asks afterwards, so the layout and the check cannot drift apart. A label that
 * does not fit is unrepresentable rather than detected. `gridColumns` THROWS when a table does not
 * fit its frame, naming the cell to shorten.
 *
 * VERTICAL BUDGET, WRITTEN DOWN (packet 29): a box row is 34 units tall on a 46-unit pitch, a row
 * label sits on the row's own centre line, and a caption starts 34 units below the last row. Nothing
 * is placed by eye, so the collision check has something to be vacuous against.
 */
import {
  id, money, qty, pct, round2,
  ORG, RECRUIT, PAY, FLEXIBLE, TRAINING, STRUCTURE_TERMS, NON_FINANCIAL, STYLES, MASLOW, HERZBERG,
} from './_packet30-util.mjs';

const INK = '#e8ecf5', AXIS = '#94a3b8', GRID = '#475569', MUTED = '#7a8299';
const BLUE = '#3b82f6', GREEN = '#059669', RED = '#ef4444', AMBER = '#f59e0b', PURPLE = '#8b5cf6';

export const r2 = round2;

const open = (h = 400, w = 560) => `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',system-ui,sans-serif;background:transparent">`;
const close = '</svg>';
const t = (x, y, text, { size = 11, fill = INK, anchor = 'start', weight = 400 } = {}) =>
  `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${text}</text>`;
const line = (x1, y1, x2, y2, stroke, w = 2, extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${w}"${extra}/>`;
const box = (x, y, w, h, stroke, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="none" stroke="${stroke}" stroke-width="1.5"${extra}/>`;
const fillBox = (x, y, w, h, fill, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${fill}"${extra}/>`;
const poly = (points, fill, extra = '') => `<polygon points="${points.map(([x, y]) => `${x} ${y}`).join(',')}" fill="${fill}"${extra}/>`;

/* ── the one bound, shared with the runner's guard ─────────────────────────── */
/*
 * Packet 24's browser-measured bound, carried unchanged through packets 25-29: at the reading column
 * four characters or more reach 0.601 em and a lone character 0.874 em, rounded up to 0.7 and 0.9.
 * It is an ESTIMATE; the independent measurement is Verify B's `getComputedTextLength()`.
 */
/*
 * THE DRAWN DIAGRAMS ARE ON A 440-UNIT FRAME TOO, AND VERIFY B IS WHY. Measured in the browser at
 * 390x844, a Learn Mode diagram renders **313 CSS px wide** — not the 530 the validator's legibility
 * rule assumes and not the 800 of a wide desktop. On the 560-unit frame every packet since 20 has
 * used, the org chart's row labels came out at 10 units, which is `10 x 313/560` = **5.59px**: about
 * a third of body text, and the labels are the part of the chart that says how many people are on
 * each level. That is V022's number, met again on a diagram the legibility rule cannot see because
 * `diagram.table-legible` only reads a DECLARED table.
 *
 * 440 units with a 12-unit minimum face gives `12 x 313/440` = **8.54px**, a 53% gain, and the
 * charts still fit: the widest row is sixteen boxes across 304 units of chart area, which is 19
 * units a box. `MIN_FACE` is the floor and the runner asserts nothing is emitted below it.
 */
export const GRD = { w: 440, x0: 20, y0: 74, rowH: 28, right: 420, size: 11, gutter: 12 };
/** The smallest face any diagram in this section may emit, in viewBox units. */
export const MIN_FACE = 12;
/*
 * A DECLARED TABLE GETS A NARROWER FRAME, AND THE REASON IS A LEGIBILITY RULE RATHER THAN A LAYOUT
 * PREFERENCE. `diagram.table-legible` measures the smallest face against the 530px column a
 * 1024-wide laptop really gives — `size × 530 ÷ viewBoxWidth` — and refuses below 12px. At the 560
 * frame every other diagram uses, an 11-unit cell renders at 10.4px and a 10-unit caption at 9.5px,
 * so all four of this section's reference tables failed it on the first run.
 *
 * Packets 20-29 authored 32 tables into that rule and every one of them fires; packet 29 avoided it
 * only by leaving its grids UNDECLARED, which costs the student the full-screen sheet that
 * `kind: 'table'` always offers — the one thing that makes a table readable at 390px. So the frame
 * is narrowed instead: 440 units at size 10 is 12.05px and at size 11 is 13.25px. The text renders
 * LARGER on screen and less of it fits per row, which is the honest trade and the one the rule is
 * asking for. `gridColumns` enforces the smaller budget by throwing.
 */
export const TBL = { w: 440, x0: 20, y0: 74, rowH: 28, right: 420, size: 10, gutter: 12, note: 10 };
export const estWidth = (text, size = GRD.size) => String(text).length * size * (String(text).length < 4 ? 0.9 : 0.7);
export const gridRowY = (i) => r2(GRD.y0 + (i + 1) * GRD.rowH);

export const wrapLines = (text, { size = MIN_FACE, maxWidth = GRD.right - GRD.x0 } = {}) => {
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
 * Each wrapped line is emitted one hundredth of a unit further right, so a multi-line caption cannot
 * be read as a grid by `diagram.table-kind` (packet 24). The same trick is used for every repeated
 * row label below, for the same reason.
 */
const wrap = (x, y, text, { size = MIN_FACE, fill = MUTED, lead = 15, maxWidth = GRD.right - GRD.x0 } = {}) =>
  wrapLines(text, { size, maxWidth }).map((l, i) => t(r2(x + i * 0.01), r2(y + i * lead), l, { size, fill })).join('');

/*
 * A LABEL THAT CANNOT BE PLACED OFF-FRAME (packet 29 rule 5): the placement asks the same `estWidth`
 * the check asks. Start-anchored to the right of the point; end-anchored on the left if that
 * overruns; into the margin rather than off the edge.
 */
/** The diagram title, wrapped to the frame and staggered so it cannot be read as a grid row. */
const titleSvg = (text, { x = GRD.x0, y = 28, size = 13, lead = 16 } = {}) =>
  wrapLines(text, { size, maxWidth: GRD.right - x }).map((l, i) => t(r2(x + i * 0.6), r2(y + i * lead), l, { size, weight: 600 })).join('');
/** How far down the title pushes the rest of the drawing. */
const titleDepth = (text, { size = 13, lead = 16 } = {}) => (wrapLines(text, { size, maxWidth: GRD.right - GRD.x0 }).length - 1) * lead;

const place = (x, y, text, colour, { size = 11, gap = 8, weight = 600 } = {}) => {
  const w = estWidth(text, size);
  if (x + gap + w <= GRD.right) return t(r2(x + gap), r2(y), text, { size, fill: colour, weight });
  if (x - gap - w >= GRD.x0) return t(r2(x - gap), r2(y), text, { size, fill: colour, weight, anchor: 'end' });
  return t(r2(Math.max(GRD.x0, Math.min(x, GRD.right - w))), r2(y), text, { size, fill: colour, weight });
};

/* ── the shared reference table: columns computed from the cells, and a bad fit THROWS ── */
export const gridColumns = ({ title, headers, rows }) => {
  const n = headers.length;
  const widths = headers.map((h, c) => Math.max(estWidth(h, TBL.size), ...rows.map((r) => estWidth(r[c] ?? '', TBL.size))));
  const needed = widths.reduce((a, b) => a + b, 0) + TBL.gutter * (n - 1);
  const avail = TBL.right - TBL.x0;
  if (needed > avail) {
    const widest = rows.concat([headers]).flatMap((r) => r.map((cell, c) => ({ cell, c }))).sort((a, b) => estWidth(b.cell, TBL.size) - estWidth(a.cell, TBL.size))[0];
    throw new Error(`grid "${title}" needs ${r2(needed)} units and the frame gives ${avail}. Shorten column ${widest.c + 1}, starting with "${widest.cell}".`);
  }
  const slack = n > 1 ? (avail - needed) / (n - 1) : 0;
  const lefts = [];
  let x = TBL.x0;
  for (let c = 0; c < n; c += 1) { lefts.push(r2(x)); x += widths[c] + TBL.gutter + slack; }
  return lefts;
};

const tblRowY = (i) => r2(TBL.y0 + (i + 1) * TBL.rowH);

export const gridSvg = ({ title, note, headers, rows, colours = [] }) => {
  const cols = gridColumns({ title, headers, rows });
  const noteOpts = { size: TBL.note, maxWidth: TBL.right - TBL.x0 };
  const titleLines = wrapLines(title, { size: 12, maxWidth: TBL.right - TBL.x0 });
  const head = headers.map((h, c) => t(cols[c], TBL.y0, h, { size: TBL.size, fill: AXIS, weight: 600 })).join('');
  const body = rows.map((cells, i) => [
    ...cells.map((cell, c) => t(cols[c], tblRowY(i), cell, { size: TBL.size, fill: c === 0 ? INK : (colours[i]?.[c] || INK), weight: c === 0 ? 600 : 400 })),
    line(TBL.x0, r2(tblRowY(i) + 8), TBL.right, r2(tblRowY(i) + 8), GRID, 1),
  ].join('')).join('');
  const noteLines = note ? wrapLines(note, noteOpts).length : 0;
  const lastRow = tblRowY(rows.length - 1);
  const h = r2(lastRow + 24 + (noteLines ? 8 + noteLines * 14 : 0));
  return [open(h, TBL.w),
    titleLines.map((l, i) => t(r2(TBL.x0 + i * 0.01), r2(28 + i * 15), l, { size: 12, weight: 600 })).join(''),
    line(TBL.x0, r2(TBL.y0 + 8), TBL.right, r2(TBL.y0 + 8), AXIS, 1.5), head, body,
    note ? wrap(TBL.x0, r2(lastRow + 32), note, noteOpts) : '',
    close].join('');
};

/* ══ THE ORG CHART, GENERATED FROM THE SHAPE ══════════════════════════════ */

/*
 * THE LAYOUT IS THE ARITHMETIC. `shape.perLevel` is `[1,2,4,8,16]` or `[1,5,25]` and every box below
 * is placed by dividing the chart width by the count on its row — so the widest row decides the box
 * width and the chart cannot be drawn with a span other than the one that produced the headcount.
 *
 * SIXTEEN BOXES ON A 434-UNIT ROW IS 27 UNITS EACH, and no label fits in 27 units. That is a real
 * constraint and not a reason to fudge the chart: the boxes on a crowded row carry no text, and the
 * ROW carries a label to its left saying how many people are on it and who they are. An org chart of
 * 31 people with 31 names on a phone is the illegible-table defect of packet 20 in another costume.
 */
const CHART = { labelW: 96, pitch: 46, boxH: 34, top: 66, gapMin: 5 };

export const orgChartSvg = ({ shape, title, roles, note, highlight = true }) => {
  const x0 = GRD.x0 + CHART.labelW;
  const width = GRD.right - x0;
  const rowY = (i) => r2(CHART.top + i * CHART.pitch);
  /* One box width for the whole chart: the widest row's slot, so every level lines up. */
  const widest = Math.max(...shape.perLevel);
  const slot = width / widest;
  const centres = shape.perLevel.map((n) => {
    const step = width / n;
    return Array.from({ length: n }, (_, k) => r2(x0 + step * (k + 0.5)));
  });
  const boxW = r2(Math.min(slot - CHART.gapMin, 120));
  const labelled = (n) => estWidth(roles[0] || '', MIN_FACE) <= boxW - 8 && n <= 5;

  const rows = shape.perLevel.map((n, i) => {
    const y = rowY(i);
    const colour = i === shape.levels - 1 ? GREEN : BLUE;
    const boxes = centres[i].map((cx) => {
      const bx = r2(cx - boxW / 2);
      const inner = labelled(n) && roles[i] ? t(r2(cx), r2(y + CHART.boxH / 2 + 3.5), roles[i], { size: MIN_FACE, fill: colour, anchor: 'middle', weight: 600 }) : '';
      return box(bx, y, boxW, CHART.boxH, colour) + inner;
    }).join('');
    /* The row label, offset a hundredth of a unit a row so the labels are not read as a column. */
    const who = roles[i] || 'staff';
    const label = t(r2(GRD.x0 + i), r2(y + CHART.boxH / 2 + 4), `${qty(n)} × ${who}`, { size: MIN_FACE, fill: MUTED });
    return label + boxes;
  }).join('');

  /* The connectors: each level's boxes joined to the one above by a spine and a stub. */
  const links = shape.perLevel.slice(1).map((n, idx) => {
    const i = idx + 1;
    const yTop = r2(rowY(i - 1) + CHART.boxH);
    const yMid = r2(rowY(i) - (CHART.pitch - CHART.boxH) / 2);
    const yBot = rowY(i);
    const parents = centres[i - 1];
    const perParent = n / parents.length;
    return parents.map((px, p) => {
      const kids = centres[i].slice(p * perParent, (p + 1) * perParent);
      const spine = line(px, yTop, px, yMid, GRID, 1.2);
      const bar = kids.length > 1 ? line(kids[0], yMid, kids[kids.length - 1], yMid, GRID, 1.2) : '';
      const stubs = kids.map((kx) => line(kx, yMid, kx, yBot, GRID, 1.2)).join('');
      return spine + bar + stubs;
    }).join('');
  }).join('');

  /*
   * THE CHAIN OF COMMAND IS THE LEFTMOST ROUTE, HIGHLIGHTED, AND IT IS COUNTED IN LINKS NOT LEVELS.
   * `3a-2` is the route an instruction travels; the number a student is asked for is the number of
   * steps, which is `levels − 1`. Drawing it removes the commonest error in the topic.
   */
  const chainRoute = highlight ? shape.perLevel.slice(1).map((n, idx) => {
    const i = idx + 1;
    return line(centres[i - 1][0], r2(rowY(i - 1) + CHART.boxH), centres[i][0], rowY(i), AMBER, 2.5);
  }).join('') : '';
  const chainLabel = highlight ? place(centres[shape.levels - 1][0], r2(rowY(shape.levels - 1) + CHART.boxH + 17), `chain of command: ${qty(shape.chain)} links`, AMBER, { size: MIN_FACE }) : '';

  /* The span of control, marked on the top box's own row. */
  const spanLabel = place(centres[0][0], r2(rowY(0) + 14), `span of control ${qty(shape.span)}`, PURPLE, { size: MIN_FACE });

  const lastY = r2(rowY(shape.levels - 1) + CHART.boxH + (highlight ? 32 : 14));
  const noteLines = note ? wrapLines(note).length : 0;
  const h = r2(lastY + 18 + noteLines * 15);
  return [open(h, GRD.w),
    titleSvg(title),
    links, chainRoute, rows, chainLabel, spanLabel,
    note ? wrap(GRD.x0, r2(lastY + 14), note) : '',
    close].join('');
};

/* ══ THE MATRIX GRID (3b-3) ════════════════════════════════════════════════ */

/*
 * A MATRIX IS THE ONE STRUCTURE A TREE CANNOT DRAW, which is why it gets its own picture rather than
 * a third org chart. The grid is functions across and the project down, so the cell at the crossing
 * is a person with TWO managers — the defining property, and the one the misconception is about.
 */
export const matrixSvg = () => {
  const fns = ORG.matrixFunctions;
  const x0 = GRD.x0 + 84, width = GRD.right - x0;
  const colW = r2(width / fns.length);
  const yHead = 84, yProj = 132, rowH = 40;
  const heads = fns.map((f, i) => [
    box(r2(x0 + i * colW + 3), yHead, r2(colW - 6), 30, BLUE),
    t(r2(x0 + i * colW + colW / 2), r2(yHead + 20), f, { size: MIN_FACE, fill: BLUE, anchor: 'middle', weight: 600 }),
  ].join('')).join('');
  const cells = fns.map((f, i) => [
    box(r2(x0 + i * colW + 3), yProj, r2(colW - 6), rowH, AMBER),
    t(r2(x0 + i * colW + colW / 2), r2(yProj + 25), '1', { size: MIN_FACE, fill: AMBER, anchor: 'middle', weight: 600 }),
  ].join('')).join('');
  const verticals = fns.map((f, i) => line(r2(x0 + i * colW + colW / 2), r2(yHead + 30), r2(x0 + i * colW + colW / 2), yProj, GRID, 1.2)).join('');
  const note = `The ${ORG.matrixFunctions.length} functions across the top are the permanent structure and each still has its own manager. The row is ${ORG.matrixProject}: one person drawn from each function, reporting to the project manager for the project AND to their function head for everything else. That double line is the definition of a matrix and the source of its one real cost — two managers can ask for the same hours.`;
  const noteLines = wrapLines(note).length;
  const h = r2(yProj + rowH + 44 + noteLines * 15);
  return [open(h, GRD.w),
    titleSvg('Matrix structure: functions across, the project down'),
    t(GRD.x0, r2(yHead + 20), 'Functions', { size: MIN_FACE, fill: MUTED }),
    t(r2(GRD.x0 + 1), r2(yProj + 25), 'Project', { size: MIN_FACE, fill: MUTED }),
    line(GRD.x0, r2(yProj - 10), GRD.right, r2(yProj - 10), GRID, 1),
    heads, verticals, cells,
    t(GRD.x0, r2(yProj + rowH + 20), 'Each one answers to two managers', { size: MIN_FACE, fill: AMBER }),
    wrap(GRD.x0, r2(yProj + rowH + 40), note),
    close].join('');
};

/* ══ MASLOW'S FIVE LEVELS (4b-3) ═══════════════════════════════════════════ */

/*
 * A PYRAMID AND NOT A TABLE, because the SHAPE is the argument: a level cannot motivate until the
 * one below it is met, and the width of each tier says how many people are still working on it. The
 * five tiers are generated from `MASLOW`, bottom-first, so the order cannot be typed in wrongly.
 */
export const maslowSvg = () => {
  const tiers = [...MASLOW].reverse();          /* physiological at the base */
  const n = tiers.length;
  const yTop = 60, tierH = 42, apexW = 130, baseW = 348;
  const cx = r2(GRD.x0 + 44 + baseW / 2);
  const titleY = 28, depth = titleDepth("Maslow's hierarchy of needs: five levels, bottom-first");
  const rows = tiers.map(([name, what], i) => {
    const y = r2(yTop + depth + (n - 1 - i) * tierH);
    const w = r2(apexW + ((baseW - apexW) * i) / (n - 1));
    const hue = [RED, AMBER, GREEN, BLUE, PURPLE][i];
    return [
      poly([[r2(cx - w / 2), y], [r2(cx + w / 2), y], [r2(cx + w / 2 - 8), r2(y + tierH - 4)], [r2(cx - w / 2 + 8), r2(y + tierH - 4)]], 'none', ` stroke="${hue}" stroke-width="1.5"`),
      t(cx, r2(y + tierH / 2 + 4), name, { size: MIN_FACE, fill: hue, anchor: 'middle', weight: 600 }),
      /*
       * THE TIER NUMBER IS STAGGERED BY A WHOLE UNIT A ROW, NOT A HUNDREDTH. `diagram.table-kind`
       * groups `<text>` by ROUNDED x, so packet 24's hundredth-of-a-unit trick collapses back to one
       * column and five staggered tiers were reported as a five-row grid. A one-unit stagger is
       * invisible on screen and gives the five rows five distinct columns, which is what the measure
       * actually reads. INFO either way, but a census a reviewer has to discount is worth less.
       */
      t(r2(GRD.x0 + i), r2(y + tierH / 2 + 4), `${i + 1}`, { size: MIN_FACE, fill: MUTED }),
    ].join('');
  }).join('');
  const note = `The order is the theory. A level only motivates once the one below it is met, which is why ${PAY.basic === 360 ? 'a pay rise' : 'a pay rise'} moves nobody who is worried about next month's contract — safety sits below esteem. Sabari's five tiers, bottom to top: ${tiers.map(([k]) => k.toLowerCase()).join(', ')}. The width says how many of the ${qty(ORG.headcount)} are still working on that level; the apex says how few reach the top.`;
  const noteLines = wrapLines(note).length;
  const h = r2(yTop + depth + n * tierH + 28 + noteLines * 15);
  return [open(h, GRD.w),
    titleSvg("Maslow's hierarchy of needs: five levels, bottom-first", { y: titleY }),
    rows,
    wrap(GRD.x0, r2(yTop + depth + n * tierH + 24), note),
    close].join('');
};

/* ══ HERZBERG'S TWO SCALES (4b-4) ══════════════════════════════════════════ */

/*
 * TWO SCALES AND NOT ONE, which is the whole of the two-factor theory and the thing the section's
 * misconception is about. Hygiene runs from dissatisfied to NOT dissatisfied; motivators run from
 * not satisfied to SATISFIED. The gap between the two zeros is drawn, because a student who draws one
 * axis has drawn Maslow's fourth level instead.
 */
export const herzbergSvg = () => {
  const x0 = GRD.x0 + 20, x1 = GRD.right - 20, mid = r2((x0 + x1) / 2);
  /*
   * THE VERTICAL BUDGET, WRITTEN DOWN, BECAUSE THE FIRST VERSION COLLIDED. A scale occupies its
   * heading at −22, the axis at 0, the end labels at +18 and its item list wrapped from +36 at a
   * 14-unit lead. The motivator list is 74 characters and wraps to two lines at size 10, so the
   * second scale's last line is at +50 — and the caption was placed at a constant 216, six units
   * ABOVE it. `scaleBottom` is now computed from the wrap rather than assumed, which is packet 29's
   * rule: a diagram fix belongs in the layout and not in the guard.
   */
  const ITEM_SIZE = MIN_FACE, LEAD = 15;
  const scale = (y, colour, leftLabel, rightLabel, heading, items) => {
    const text = items.join(' · ');
    return {
      svg: [
        t(GRD.x0, r2(y - 24), heading, { size: MIN_FACE, fill: colour, weight: 600 }),
        line(x0, y, x1, y, colour, 2.5),
        line(mid, r2(y - 7), mid, r2(y + 7), colour, 1.5, ' stroke-dasharray="3 3"'),
        t(x0, r2(y + 19), leftLabel, { size: MIN_FACE, fill: colour }),
        t(x1, r2(y + 19), rightLabel, { size: MIN_FACE, fill: colour, anchor: 'end' }),
        /*
         * `neutral` SITS ON THE END-LABEL ROW AND NOT ABOVE THE AXIS. Above it, its glyph box
         * overlapped the heading of its own scale by 24.6 x 0.75 units — the collision check found
         * it on the first run, and the fix belongs in the layout: on the +18 row it shares a
         * baseline with `dissatisfied` and `NOT dissatisfied` and cannot reach either.
         */
        t(mid, r2(y + 19), 'neutral', { size: MIN_FACE, fill: MUTED, anchor: 'middle' }),
        wrap(GRD.x0, r2(y + 36), text, { size: ITEM_SIZE, lead: LEAD }),
      ].join(''),
      bottom: r2(y + 36 + (wrapLines(text, { size: ITEM_SIZE }).length - 1) * LEAD),
    };
  };
  const depth = titleDepth("Herzberg's two-factor theory: two scales, not one");
  const hygiene = scale(r2(90 + depth), AMBER, 'dissatisfied', 'NOT dissatisfied', 'Hygiene factors — the first scale', HERZBERG.hygiene);
  const motivators = scale(r2(hygiene.bottom + 54), GREEN, 'not satisfied', 'SATISFIED', 'Motivators — the second scale', HERZBERG.motivators);
  const note = `Hygiene factors cannot make anybody satisfied — at best they stop the dissatisfaction, which is the left half of the top scale and nothing more. Motivators are the only things on the second scale. So a pay rise, which is a hygiene factor, moves a worker from unhappy to not unhappy and no further, and that is why Sabari's ${money(PAY.prpGain)} a week changed nothing about how the job felt.`;
  const noteY = r2(motivators.bottom + 26);
  const h = r2(noteY + wrapLines(note).length * 15 + 8);
  return [open(h, GRD.w),
    titleSvg("Herzberg's two-factor theory: two scales, not one"),
    hygiene.svg, motivators.svg,
    wrap(GRD.x0, noteY, note),
    close].join('');
};

/* ══ The six diagrams ══════════════════════════════════════════════════════ */

/* ── 1 · Approaches to staffing (1.3.4 · 1ad) ──────────────────────────── */

const flexibleView = () => gridSvg({
  title: 'Flexible workforce: the five forms the specification names',
  headers: ['Form', 'What it is'],
  rows: [
    ['Multi-skilling', 'Several jobs, one worker'],
    ['Part-time, temporary', 'Fewer or fixed-term hours'],
    ['Zero-hour contracts', 'No hours guaranteed'],
    ['Flexible hours, home work', 'Same hours, when or where'],
    ['Outsourcing', 'Another firm does the work'],
  ],
  note: `1.3.4 · 1b names these five and no others — and the fourth bullet's own words are "flexible hours and home working", not flexi-time. Note that FLEXIBLE WORKING appears again in this topic as a non-financial method of improving performance (1.3.4 · 4d): the same practice asked about for a different reason, staffing the firm against demand there and motivating the worker here.`,
});

const dismissalView = () => gridSvg({
  title: 'Dismissal and redundancy are not the same event',
  headers: ['', 'Dismissal', 'Redundancy'],
  rows: [
    ['Cause', 'The worker', 'The job'],
    ['Reason', 'Conduct, capability', 'The post has gone'],
    ['Post after', 'Usually refilled', 'Ceases to exist'],
    ['Payment', 'Notice only', 'Redundancy pay'],
  ],
  note: `1.3.4 · 1c asks for the distinction and this is the whole of it: a dismissal is about the PERSON and a redundancy is about the POST. A firm that dismisses a machinist advertises the job again the same week; a firm that makes one redundant does not, because the work has gone. Confusing the two is the single most common error in this sub-topic and the reason the section's own misconception list names it.`,
});

const relationsView = () => gridSvg({
  title: 'Two ways to agree pay and conditions',
  headers: ['', 'Individual approach', 'Collective bargaining'],
  rows: [
    ['Negotiates', 'One worker', 'A union, for all'],
    ['Agreement', 'One contract', 'One, covering many'],
    ['Suits when', 'Skills differ', 'Jobs are alike'],
    ['Risk', 'No weight alone', 'Own case lost'],
  ],
  note: `1.3.4 · 1d names both, and the choice between them is not a matter of taste: it follows from how alike the jobs are. Where ${qty(ORG.tall.workers)} machinists do the same work on the same machines, one agreement is cheaper for the firm to reach and stronger for the worker to hold; where a designer's skills are rare, an individual contract pays more than any collective rate would.`,
});

export const staffingDiagram = {
  id: id('diagram', 'approaches to staffing'),
  kind: 'table',
  title: 'Approaches to Staffing',
  description: `IAL 1.3.4 · 1ad: staff as an asset and as a cost, the five forms of flexible workforce, the distinction between dismissal and redundancy, and the individual and collective approaches to employer/employee relationships.`,
  scenarios: [
    { label: 'Flexible workforce', svg: flexibleView() },
    { label: 'Dismissal or redundancy', svg: dismissalView() },
    { label: 'Individual or collective', svg: relationsView() },
  ],
};

/* ── 2 · Recruitment, selection and training (1.3.4 · 2ac) ─────────────── */

const costView = () => gridSvg({
  title: `Recruiting one supervisor: ${money(RECRUIT.total)}`,
  headers: ['Cost', 'Workings', 'Amount'],
  rows: [
    ...RECRUIT.items.map((i) => [i.short, i.shortWorkings, money(i.amount)]),
    ['TOTAL', `${pct(RECRUIT.share)} of salary`, money(RECRUIT.total)],
  ],
  note: `1.3.4 · 2b is one line — "costs of recruitment, selection and training" — and it is a sum. Every figure comes from two day rates: a supervisor on ${money(RECRUIT.salary)} across ${qty(ORG.workingDays)} working days is ${money(RECRUIT.day)} a day, and a manager on ${money(ORG.managerSalary)} is ${money(ORG.managerHour)} an hour. Split by stage: recruitment ${money(RECRUIT.stages[0][1])}, selection ${money(RECRUIT.stages[1][1])}, training ${money(RECRUIT.stages[2][1])}. This total is what chapter 5 spends: ${qty(RECRUIT.leaversBefore)} leavers a year cost ${money(RECRUIT.annualBefore)}, and ${qty(RECRUIT.leaversBefore - RECRUIT.leaversAfter)} fewer saves ${money(RECRUIT.retentionSaving)}.`,
});

const sourceView = () => gridSvg({
  title: 'Internal or external recruitment',
  headers: ['', 'Internal', 'External'],
  rows: [
    ['Where from', 'Already here', 'Labour market'],
    ['Agency fee', money(0), money(RECRUIT.items[1].amount)],
    ['Induction', 'Short: knows us', money(RECRUIT.items[3].amount)],
    ['New thinking', 'None arrives', 'Arrives with them'],
    ['Side effect', 'A post one level down', 'Nobody promoted'],
  ],
  note: `1.3.4 · 2a is the only bullet under the recruitment and selection process and it is this comparison. The last row is the one students leave out: filling a supervisor's post internally does not fill a post, it MOVES one, so the firm recruits anyway — one level further down and more cheaply. Whether that is worth the ${money(RECRUIT.items[1].amount)} saved depends on whether the firm needs somebody who does not yet know how it does things.`,
});

const trainingView = () => gridSvg({
  title: 'Three types of training',
  headers: ['Type', 'What it is', 'Cost here'],
  rows: [
    ['Induction', 'On arrival: job, place, rules', money(RECRUIT.items[3].amount)],
    ['On-the-job', 'Learning while working', money(RECRUIT.items[5].amount)],
    ['Off-the-job', 'Learning away, on a course', money(RECRUIT.items[4].amount)],
  ],
  note: `1.3.4 · 2c names exactly three. The third column is Sabari's own bill, and it shows why firms reach for on-the-job training first: it appears as lost output rather than as an invoice, which makes it look free when it is the largest of the three. Induction is ${money(RECRUIT.items[3].amount)} of paid time before anything is produced; the course is ${money(RECRUIT.items[4].amount)}; the ${money(RECRUIT.items[5].amount)} of output lost while the new supervisor learns on the job never appears in anybody's budget.`,
});

export const recruitmentDiagram = {
  id: id('diagram', 'recruitment selection and training'),
  kind: 'table',
  title: 'Recruitment, Selection and Training',
  description: `IAL 1.3.4 · 2ac: internal versus external recruitment, the costs of recruitment, selection and training, and the three types of training — induction, on-the-job and off-the-job.`,
  scenarios: [
    { label: `The ${money(RECRUIT.total)} bill`, svg: costView() },
    { label: 'Internal or external', svg: sourceView() },
    { label: 'Three types of training', svg: trainingView() },
  ],
};

/* ── 3 · Organisational design (1.3.4 · 3ac) ───────────────────────────── */

const ROLES_TALL = ['Managing Director', 'Director', 'Manager', 'Supervisor', 'machinists'];
const ROLES_FLAT = ['Managing Director', 'Supervisor', 'machinists'];

const tallView = () => orgChartSvg({
  shape: ORG.tall,
  roles: ROLES_TALL,
  title: `Tall: span of control ${qty(ORG.tall.span)}, ${qty(ORG.tall.levels)} levels, ${qty(ORG.tall.headcount)} people`,
  note: `${ORG.tall.sum} = ${qty(ORG.tall.headcount)}, which is ${ORG.tall.formula}. Count the highlighted route: ${qty(ORG.tall.chain)} links from the Managing Director to a machinist, so an instruction is passed on ${qty(ORG.tall.chain)} times and can be changed ${qty(ORG.tall.chain)} times on the way. The first ${qty(ORG.tall.levels - 1)} levels are ${qty(ORG.tall.managers)} managers and the last is ${qty(ORG.tall.workers)} machinists.`,
});

const flatView = () => orgChartSvg({
  shape: ORG.flat,
  roles: ROLES_FLAT,
  title: `Flat: span of control ${qty(ORG.flat.span)}, ${qty(ORG.flat.levels)} levels, ${qty(ORG.flat.headcount)} people`,
  note: `${ORG.flat.sum} = ${qty(ORG.flat.headcount)}: the SAME ${qty(ORG.headcount)} people as the tall chart, reorganised. ${qty(ORG.flat.chain)} links instead of ${qty(ORG.tall.chain)}, and ${qty(ORG.flat.managers)} managers instead of ${qty(ORG.tall.managers)} — so ${qty(ORG.postsMoved)} posts move from supervising to making, at unchanged headcount, and the wage bill falls from ${money(ORG.tall.wageBill)} to ${money(ORG.flat.wageBill)}. Removing levels does not remove people; it WIDENS every remaining span.`,
});

export const structureDiagram = {
  id: id('diagram', 'tall flat and matrix structures'),
  title: 'One Firm, Two Structures',
  description: `IAL 1.3.4 · 3ab: hierarchy, chain of command, span of control, centralised and decentralised, and the tall, flat and matrix types of structure. Construct (4) asks for an accurately labelled diagram, and an org chart with the chain of command and a span of control marked is what it means here.`,
  checklist: [
    'Boxes in levels, one box for the top, joined by lines to the level below',
    'The span of control marked on a manager: how many report DIRECTLY to them',
    'The chain of command marked as a route, counted in LINKS not levels',
    'The headcount consistent with the span: a span of s over L levels is (s^L − 1)/(s − 1)',
  ],
  scenarios: [
    { label: `Tall — span ${qty(ORG.tall.span)}`, svg: tallView() },
    { label: `Flat — span ${qty(ORG.flat.span)}`, svg: flatView() },
    { label: 'Matrix', svg: matrixSvg() },
  ],
};

/* ── 4 · Motivation in theory (1.3.4 · 4ab) ────────────────────────────── */

export const theoryDiagram = {
  id: id('diagram', 'maslow and herzberg'),
  title: 'Maslow and Herzberg',
  description: `IAL 1.3.4 · 4b names four theorists. Two of them have a canonical diagram: Maslow's five levels, which only motivate upwards from the bottom, and Herzberg's TWO scales, which is the whole of the two-factor theory.`,
  checklist: [
    'Maslow: five tiers, physiological at the BASE and self-actualisation at the apex',
    'Maslow: the order matters — a level motivates only once the one below it is met',
    'Herzberg: TWO separate scales, not one axis with satisfied at each end',
    'Herzberg: hygiene runs to NOT dissatisfied; only motivators reach satisfied',
  ],
  scenarios: [
    { label: "Maslow's five levels", svg: maslowSvg() },
    { label: "Herzberg's two scales", svg: herzbergSvg() },
  ],
};

/* ── 5 · Motivation in practice (1.3.4 · 4cd) ──────────────────────────── */

const financialView = () => gridSvg({
  title: `Five financial methods against a ${money(PAY.basic)} basic week`,
  headers: ['Method', 'How it is worked out', 'A standard week'],
  rows: [
    ['Piecework', `${qty(PAY.pieceUnits)} at ${money(PAY.pieceRate)}`, `${money(PAY.basic)} instead`],
    ['Commission', `${pct(PAY.commissionRate)} of sales`, `${money(PAY.basic)} instead`],
    ['Bonus', `${pct(PAY.bonusRate)} of a quarter`, `${money(PAY.bonusPerWeek)} on top`],
    ['Profit share', `${pct(PAY.shareRate)} of profit ÷ ${qty(ORG.headcount)}`, `${money(PAY.perHead)} on top`],
    ['Performance pay', `${pct(PAY.prpUplift)} on ${money(PAY.rate)}/hour`, `${money(PAY.prpGain)} on top`],
  ],
  note: `1.3.4 · 4c names these five, and the third column is not one quantity but two. Piecework and commission REPLACE the basic wage and are set to equal it exactly at ${money(PAY.basic)}, so the comparison between those two is about risk rather than generosity. The other three ADD to a basic wage that is still paid: the bonus is ${money(PAY.bonus)} a quarter, which is ${money(PAY.bonusPerWeek)} a week; the profit share is ${money(PAY.pool)} split ${qty(ORG.headcount)} ways, settled once a year; and performance pay raises the rate itself from ${money(PAY.rate)} to ${money(PAY.prpRate)}, making the week ${money(PAY.prpWeek)}.`,
});

const riskView = () => gridSvg({
  title: 'What happens when the week is not standard',
  headers: ['Method', 'Slow week', 'Standard', 'Good week'],
  rows: [
    ['Basic wage', money(PAY.basic), money(PAY.basic), money(PAY.basic)],
    ['Piecework', money(PAY.piece(PAY.slowWeek)), money(PAY.basic), money(PAY.piece(PAY.fastWeek))],
    ['Commission', money(PAY.commission(PAY.slowSales)), money(PAY.basic), money(PAY.commission(PAY.fastSales))],
    ['Profit share', money(PAY.perHead), money(PAY.perHead), money(PAY.perHead)],
  ],
  note: `The slow week is ${qty(PAY.slowWeek)} units or ${money(PAY.slowSales)} sold; the good week is ${qty(PAY.fastWeek)} units or ${money(PAY.fastSales)}. Piecework and commission move with the work and the other methods do not, which is the only difference that matters: the worker carries the risk under the first two and the firm carries it under a basic wage. The profit share is flat here because it is settled once a year on ${money(PAY.profit)} of profit, so it rewards nothing a machinist does this week — which is the standing objection to it.`,
});

const nonFinancialView = () => gridSvg({
  title: 'Eight non-financial methods',
  headers: ['Method', 'What it changes'],
  rows: NON_FINANCIAL.map(([k, short]) => [k, short]),
  colours: [],
  note: `1.3.4 · 4d names all eight, and the last three are the ones students most often run together. Job ENRICHMENT makes the work harder and adds responsibility, which is a Herzberg motivator; job ROTATION and job ENLARGEMENT both keep the difficulty the same — rotation moves the worker between jobs, enlargement adds tasks to one — so neither reaches a motivator, and both can be received as more work for the same pay.`,
});

export const practiceDiagram = {
  id: id('diagram', 'financial and non-financial methods'),
  kind: 'table',
  title: 'Financial and Non-Financial Methods',
  description: `IAL 1.3.4 · 4c names five financial methods to improve employee performance and 4d names eight non-financial ones. All thirteen are here, with one worker's pay worked out under each of the five.`,
  scenarios: [
    { label: 'Five financial methods', svg: financialView() },
    { label: 'Who carries the risk', svg: riskView() },
    { label: 'Eight non-financial methods', svg: nonFinancialView() },
  ],
};

/* ── 6 · Leadership (1.3.4 · 5ac) ─────────────────────────────────────── */

const stylesView = () => gridSvg({
  title: 'Four leadership styles: who takes the decision',
  headers: ['Style', 'Who decides', 'Works when'],
  /* The `who decides` column is shortened from STYLES' own gloss to fit the legible frame; the full
   * wording is in the caption below and in the subsection that teaches each style. */
  rows: [
    ['Autocratic', 'The leader alone', 'Speed; staff new'],
    ['Paternalistic', 'The leader, explaining', 'Loyalty, trust'],
    ['Democratic', 'With the staff', 'Staff know best'],
    ['Laissez-faire', 'The staff, in a goal', 'Staff are expert'],
  ],
  note: `1.3.4 · 5b names exactly these four. The middle column is the whole taxonomy: the styles differ in WHO TAKES THE DECISION and in nothing else, and they run in that order from the leader alone to the staff alone. Paternalistic is the one most often mistaken for a softer word for autocratic — the leader still decides, as an autocrat does, but explains the decision and weighs what it does to the staff, which is what makes it a style of its own.`,
});

const leadershipView = () => gridSvg({
  title: 'Management and leadership are different jobs',
  headers: ['', 'Management', 'Leadership'],
  rows: [
    ['Concerned with', 'Work getting done', 'Where the firm goes'],
    ['Authority from', 'The post', 'The person'],
    ['Horizon', 'This week', 'Next year'],
    ['Asks', 'How?', 'Why, and next?'],
  ],
  note: `1.3.4 · 5a asks for exactly this distinction and it is the section's opening idea, not an aside. The same person usually does both, which is what makes the distinction hard to see and worth drawing: a supervisor who allocates ${qty(ORG.flat.span)} machinists to ${qty(ORG.flat.span)} machines all week is managing, and the same supervisor persuading them to work a new shift pattern is leading. 5c then asks why the move from entrepreneur to leader is difficult, and the answer starts here — the founder's authority came from the person and the firm now needs it to come from the post.`,
});

export const leadershipDiagram = {
  id: id('diagram', 'leadership and styles'),
  kind: 'table',
  title: 'Leadership and Leadership Styles',
  description: `IAL 1.3.4 · 5ac: the distinction between management and leadership, the four types of leadership style — autocratic, paternalistic, democratic and laissez-faire — and the difficulty of moving from entrepreneur to leader.`,
  scenarios: [
    { label: 'Four styles', svg: stylesView() },
    { label: 'Management or leadership', svg: leadershipView() },
  ],
};

export const DIAGRAMS = [
  staffingDiagram, recruitmentDiagram, structureDiagram,
  theoryDiagram, practiceDiagram, leadershipDiagram,
];
