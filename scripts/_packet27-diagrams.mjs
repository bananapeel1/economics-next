/**
 * PACKET 27 — business-objectives-strategy: seven diagrams, one per chapter, each pinned by the
 * BLOCK's `diagramId`.
 *
 * The March section had NONE — `structure-03`, and the sharpest finding in the packet, because the
 * three tools this topic is built on are all grids and a student is asked to draw them. `topFix-02`
 * asks for Ansoff's matrix, Porter's Strategic Matrix and the SWOT grid, "ideally interactive 'drag
 * this example into the right cell' rather than static images". The platform already has that: a
 * `classify` recall IS drag-into-the-right-cell, so each matrix chapter carries the diagram AND the
 * classify, and neither has to pretend to be the other.
 *
 * THE RENDERER THIS PROGRAMME DID NOT HAVE. `gridSvg` draws a lookup table — headers across the top
 * and rows down the side. A 2x2 matrix is a different object: two named dimensions, four cells, and
 * the position of a cell IS its meaning. `matrixSvg` below draws one, and like packet 25's
 * `gridColumns` it COMPUTES its layout from the text and THROWS when the text does not fit, rather
 * than laying out a collision for a guard to find afterwards.
 *
 * ONE TEXT PER CELL, which is a constraint and not a limitation. Packet 22 drew the Boston Matrix
 * with a name over a note and found it had put four pairs of labels on the same two x positions —
 * `diagram.table-kind`'s definition of a grid, which would have cost the matrix its "What a correct
 * diagram shows" checklist. It resolved that by dropping the second line, and this file does the same
 * by construction: `matrixSvg` throws on a cell that does not fit one line. What each cell MEANS is
 * taught in the body and drilled by the classify recall on the same step. The checklist is worth
 * more than the second line, because these are three of the few diagrams in Business that a student
 * is actually asked to construct (Appendix 6: Construct, 4 marks, "an accurately labelled diagram").
 *
 * THE WRAPPER AND THE GUARD SHARE ONE BOUND, and here they share one FUNCTION. Packet 25 found its
 * caption wrapper packing at 0.65 em while its extent guard measured at 0.7, so 56 lines were laid
 * out at a width the guard then refused. `wrapLines` below asks `estWidth` for every candidate line
 * instead of counting characters, so a line cannot be laid out wider than the check will accept and
 * the two cannot drift apart again.
 */
import { id, money, pc, round2, ADISA, DECISIONS, CAPITAL_SHARE } from './_packet27-util.mjs';

const INK = '#e8ecf5', AXIS = '#94a3b8', GRID = '#475569', MUTED = '#7a8299';
const BLUE = '#3b82f6', GREEN = '#059669', RED = '#ef4444', AMBER = '#f59e0b', PURPLE = '#8b5cf6';

export const r2 = round2;

const open = (h = 400, w = 560) => `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',system-ui,sans-serif;background:transparent">`;
const close = '</svg>';
const t = (x, y, text, { size = 11, fill = INK, anchor = 'start', weight = 400 } = {}) =>
  `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${text}</text>`;
const line = (x1, y1, x2, y2, stroke, w = 1) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${w}"/>`;
const rect = (x, y, w, h, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none"${extra}/>`;

/* ── the one bound ─────────────────────────────────────────────────────────── */
/*
 * `estWidth` is packet 24's measured bound — all 92 strings in its tables read with
 * getComputedTextLength() at the 800px column, where four characters or more reach 0.601 em and a
 * lone character reaches 0.874 em — rounded up to 0.7 and 0.9. It is an ESTIMATE and the runner's
 * guard imports THIS function, so the two cannot disagree. The independent measurement is the
 * browser one in Verify B.
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
const wrap = (x, y, text, { size = 10, fill = MUTED, maxWidth = GRD.right - GRD.x0, lead = 14 } = {}) =>
  wrapLines(text, { size, maxWidth }).map((l, i) => t(x, r2(y + i * lead), l, { size, fill })).join('');

/* ── tables ────────────────────────────────────────────────────────────────── */
/*
 * Packet 25's `gridColumns`, carried unchanged in substance: every column is as wide as its widest
 * cell, the slack is spread between the columns, every cell is start-anchored, and a table that does
 * not fit THROWS with the cell to shorten named in the message.
 */
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
  const noteLines = note ? wrapLines(note, { size: 10 }).length : 0;
  const h = r2(gridRowY(rows.length - 1) + 26 + (noteLines ? 8 + noteLines * 14 : 0));
  return [open(h), t(GRD.x0, 34, title, { size: 13, weight: 600 }),
    line(GRD.x0, r2(GRD.y0 + 9), GRD.right, r2(GRD.y0 + 9), AXIS, 1.5), head, body,
    note ? wrap(GRD.x0, r2(gridRowY(rows.length - 1) + 34), note) : '',
    close].join('');
};

/* ── the 2x2 matrix ────────────────────────────────────────────────────────── */
/*
 * MTX.x0 leaves room for the row labels on the left, which are end-anchored against it. The cell
 * text is centred in its own half and must fit on ONE line: `matrixSvg` throws otherwise, naming the
 * cell, because a second line would put four labels on two x positions and cost the diagram its
 * checklist (see the header). Cell text is 13 units on a 560-unit frame — 18.6px in the 800px column
 * the card gives it, comfortably above `diagram.table-legible`'s floor of 12.
 */
const MTX = { x0: 96, x1: 534, yTop: 92, height: 190, cellSize: 13, labelSize: 10, axisSize: 11 };

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
  /* The row labels sit to the LEFT of the grid, end-anchored, so a longer label grows away from the
   * frame edge and into the margin that MTX.x0 reserves. A label wider than that margin is refused
   * here rather than drawn over the title. */
  for (const [i, label] of yAxis.values.entries()) {
    if (estWidth(label, MTX.labelSize) > MTX.x0 - GRD.x0 - 10) {
      throw new Error(`matrix "${title}" row label "${label}" does not fit the ${MTX.x0 - GRD.x0 - 10}-unit margin.`);
    }
    drawn.push(t(r2(MTX.x0 - 10), centreY[i], label, { size: MTX.labelSize, fill: AXIS, anchor: 'end', weight: 600 }));
  }
  for (const [i, label] of xAxis.values.entries()) {
    drawn.push(t(centreX[i], r2(yBot + 20), label, { size: MTX.labelSize, fill: AXIS, anchor: 'middle', weight: 600 }));
  }
  const noteLines = note ? wrapLines(note, { size: 10 }).length : 0;
  const h = r2(yBot + 40 + (noteLines ? noteLines * 14 : 0));
  return [open(h),
    t(GRD.x0, 34, title, { size: 13, weight: 600 }),
    /* The two dimension names, both horizontal. Packet 22 rotated one of them by −90 and a rotated
     * label is measured by every extent check in this programme as if it ran across the page, so its
     * width is read against the wrong frame. Horizontal is honest and it is also legible on a phone. */
    t(GRD.x0, 58, `${yAxis.name} ↓`, { size: MTX.axisSize, fill: AXIS, weight: 600 }),
    t(MTX.x1, 58, `${xAxis.name} →`, { size: MTX.axisSize, fill: AXIS, weight: 600, anchor: 'end' }),
    rect(MTX.x0, MTX.yTop, r2(MTX.x1 - MTX.x0), MTX.height, ` stroke="${AXIS}" stroke-width="2"`),
    line(midX, MTX.yTop, midX, yBot, GRID, 1.5),
    line(MTX.x0, midY, MTX.x1, midY, GRID, 1.5),
    drawn.join(''),
    note ? wrap(GRD.x0, r2(yBot + 40), note) : '',
    close].join('');
};

const A = ADISA;

/* ══ 1 · Mission, corporate aims and corporate objectives (3.3.1 · 1a, 1b) ══ */

const chainView = () => gridSvg({
  title: 'From a mission statement to a corporate objective',
  headers: ['Level', 'What it is', 'How long'],
  rows: [
    ['Mission statement', 'why the business exists', 'rarely changed'],
    ['Corporate aims', 'the broad direction', 'several years'],
    ['Corporate objectives', 'a measurable target', 'one to three years'],
  ],
  colours: [[INK, MUTED, MUTED], [INK, MUTED, MUTED], [INK, GREEN, MUTED]],
  note: `3.3.1 · 1a asks for the DEVELOPMENT of corporate objectives from the mission statement and corporate aims, so the arrow matters as much as the three rows: each level narrows the one above it until something is specific enough to be measured. Read upwards as a test — if you cannot trace an objective back to the mission, one of the two is doing no work.`,
});

const appraisalView = () => gridSvg({
  title: 'Critically appraising a mission statement',
  headers: ['The case for one', 'The case against'],
  rows: [
    ['One direction for every objective', 'Costs nothing, binds nobody'],
    ['Tells outsiders what it is for', 'Too vague to rule anything out'],
    ['A test an objective must pass', 'Written for outsiders to read'],
    ['Staff see why the work matters', 'Ignored if pay says otherwise'],
  ],
  colours: [[GREEN, RED], [GREEN, RED], [GREEN, RED], [GREEN, RED]],
  note: `1b asks for CRITICAL appraisal, which means both columns and then a judgement — not a list of benefits. The judgement usually turns on one question: does anything inside the business actually change when the mission statement changes? Where the answer is no, the statement is a public document rather than a management tool.`,
});

export const objectivesDiagram = {
  id: id('diagram', 'from mission statement to corporate objectives'),
  title: 'Mission, Corporate Aims and Corporate Objectives',
  kind: 'table',
  description: `IAL 3.3.1 · 1a asks how corporate objectives are developed from the mission statement and corporate aims; 1b asks for a critical appraisal of mission statements. The first table is the chain, the second is both sides of the appraisal.`,
  scenarios: [
    { label: 'The chain', svg: chainView() },
    { label: 'The critical appraisal', svg: appraisalView() },
  ],
};

/* ══ 2 · Ansoff's Matrix (3.3.1 · 2a) ══════════════════════════════════════ */

export const ANSOFF_CELLS = [
  ['Market penetration', 'Market development'],
  ['Product development', 'Diversification'],
];

const ansoffView = () => matrixSvg({
  title: "Ansoff's Matrix",
  xAxis: { name: 'Markets', values: ['Existing markets', 'New markets'] },
  yAxis: { name: 'Products', values: ['Existing', 'New'] },
  cells: ANSOFF_CELLS,
  colours: [[GREEN, AMBER], [AMBER, RED]],
  note: `Two questions, asked one after the other: is the product one the business already sells, and is the market one it already sells to? Answer both and the cell follows. The specification names the matrix at 3.3.1 · 2a and does not list the cells, because the cells ARE the matrix.`,
});

const ansoffAdisaView = () => matrixSvg({
  title: `The same four cells, for ${A.name}`,
  xAxis: { name: 'Markets', values: ['Existing markets', 'New markets'] },
  yAxis: { name: 'Products', values: ['Existing', 'New'] },
  cells: [
    ['Sell more heaters', 'Heaters, new countries'],
    ['A solar water heater', 'Solar services abroad'],
  ],
  colours: [[GREEN, AMBER], [AMBER, RED]],
  note: `One firm, four options, and they are not equally risky. Selling more of a known product to known customers asks nothing new of ${A.name}; installing solar systems in countries it has never sold in asks it to learn a product AND a market at once. What the matrix will not tell you is which of the two middle cells is safer — that depends on whether this firm knows its customers or its engineering better.`,
});

export const ansoffDiagram = {
  id: id('diagram', 'ansoff matrix'),
  title: "Ansoff's Matrix",
  description: `IAL 3.3.1 · 2a names Ansoff's Matrix as a theory of corporate strategy. Products against markets, existing against new, and the four cells that produces — drawn empty first, then filled for one firm.`,
  checklist: [
    'Both dimensions labelled: products up the side, markets across the bottom',
    'Existing and new marked on both dimensions',
    'All four cells named, each in the right position',
    'Market development in the existing-product, new-market cell — not swapped with product development',
    'Diversification in the new-product, new-market cell',
  ],
  scenarios: [
    { label: 'The four cells', svg: ansoffView() },
    { label: `${A.name}'s four options`, svg: ansoffAdisaView() },
  ],
};

/* ══ 3 · Porter's Strategic Matrix (3.3.1 · 2a) ════════════════════════════ */

export const PORTER_CELLS = [
  ['Cost leadership', 'Differentiation'],
  ['Cost focus', 'Differentiation focus'],
];

const porterView = () => matrixSvg({
  title: "Porter's Strategic Matrix",
  xAxis: { name: 'Source of advantage', values: ['Lower cost', 'Being different'] },
  yAxis: { name: 'Target', values: ['Broad', 'Narrow'] },
  cells: PORTER_CELLS,
  colours: [[BLUE, PURPLE], [BLUE, PURPLE]],
  note: `The specification's own name for this is Porter's Strategic Matrix, and a matrix has cells: two questions — where does the advantage come from, and how wide is the target — give four of them. Cost leadership and cost focus are the same source of advantage aimed at different widths of market, and so are the two on the right.`,
});

const porterAdisaView = () => matrixSvg({
  title: `Four positions ${A.name} could hold`,
  xAxis: { name: 'Source of advantage', values: ['Lower cost', 'Being different'] },
  yAxis: { name: 'Target', values: ['Broad', 'Narrow'] },
  cells: [
    ['Cheapest heaters', 'Best-built heaters'],
    ['Cheapest farm pumps', 'Off-grid farm pumps'],
  ],
  colours: [[BLUE, PURPLE], [BLUE, PURPLE]],
  note: `Each cell is a different business, not a different slogan: the cheapest broad position needs scale and tight costs, and the narrow differentiated one needs engineering and a sales team that knows farms. ${A.name} cannot be in two of these cells at once with one factory and one brand, which is what makes this a strategic choice rather than a description.`,
});

export const porterDiagram = {
  id: id('diagram', 'porters strategic matrix'),
  title: "Porter's Strategic Matrix",
  description: `IAL 3.3.1 · 2a names Porter's Strategic Matrix. The source of advantage against the breadth of the target, and the four cells those two dimensions produce.`,
  checklist: [
    'Both dimensions labelled: the source of advantage and the breadth of the target',
    'Four cells, not three',
    'Cost leadership and differentiation across the broad row',
    'Cost focus and differentiation focus across the narrow row',
    'Each cell named in full — "focus" alone does not say which kind',
  ],
  scenarios: [
    { label: 'The four cells', svg: porterView() },
    { label: `Four positions for ${A.name}`, svg: porterAdisaView() },
  ],
};

/* ══ 4 · The aim of portfolio analysis (3.3.1 · 2b) ════════════════════════ */

const portfolioView = () => gridSvg({
  title: `${A.name}'s four product lines`,
  headers: ['Line', 'Revenue', 'Of total', 'Market growth', "Adisa's share"],
  rows: A.lines.map((l) => [l.name, money(l.revenue), pc(l.revenueShare), pc(l.growth), pc(l.share)]),
  colours: A.lines.map((l) => [INK, INK, INK, l.fast ? GREEN : MUTED, l.fast ? RED : GREEN]),
  note: `Read the last two columns together and the portfolio's problem appears: ${pc(A.slowRevenueShare)} of the revenue comes from the two markets growing slowest, where ${A.name} is strongest, and ${pc(A.fastRevenueShare)} from the two growing fastest, where it is weakest. No single line is in trouble. The SET is, and that is only visible with all four side by side.`,
});

const portfolioAimView = () => gridSvg({
  title: 'What portfolio analysis is for',
  headers: ['The question it answers', 'What it changes'],
  rows: [
    ['Is the set balanced?', 'can today fund tomorrow'],
    ['Which lines fund which?', 'where cash moves'],
    ['Where is growth coming from?', 'which line is invested in'],
    ['What can be let go?', 'which line is released'],
  ],
  colours: [[INK, MUTED], [INK, MUTED], [INK, MUTED], [INK, MUTED]],
  note: `3.3.1 · 2b asks for the AIM of portfolio analysis, and the aim is a decision about resources rather than a picture: every row here ends in something moving. The tool most often used to draw it is the Boston Matrix, which belongs to Unit 1's marketing topic (1.3.3) — at Unit 3 what is wanted is what the analysis is FOR.`,
});

export const portfolioDiagram = {
  id: id('diagram', 'the aim of portfolio analysis'),
  title: 'The Aim of Portfolio Analysis',
  kind: 'table',
  description: `IAL 3.3.1 · 2b asks for the aim of portfolio analysis. One firm's four lines with their growth and share side by side, and the four questions the analysis exists to answer.`,
  scenarios: [
    { label: `${A.name}'s portfolio`, svg: portfolioView() },
    { label: 'What it is for', svg: portfolioAimView() },
  ],
};

/* ══ 5 · Strategic and tactical decisions (3.3.1 · 2c) ═════════════════════ */

const strategicTacticalView = () => gridSvg({
  title: 'Four tests that tell the two apart',
  headers: ['Test', 'Strategic decision', 'Tactical decision'],
  rows: [
    ['Time horizon', 'years', 'weeks or months'],
    ['Scope', 'the whole business', 'one function'],
    ['Reversible?', 'slow and costly to undo', 'undone easily'],
    ['Decided by', 'the board', 'a department manager'],
  ],
  colours: [[INK, BLUE, AMBER], [INK, BLUE, AMBER], [INK, BLUE, AMBER], [INK, BLUE, AMBER]],
  note: `All four tests usually agree, and when they disagree the reversibility test is the one to trust: a decision that can be undone next month is tactical however senior the person who took it. The specification pairs the two words at 3.3.1 · 2c and then asks what each does to three kinds of resource, which is the next table.`,
});

const resourcesView = () => gridSvg({
  title: 'What each decision does to three kinds of resource',
  headers: ['Resource', 'Strategic: a second line', 'Tactical: a discount'],
  rows: [
    ['Human', `hire and train ${DECISIONS.strategic.hires}`, 'sales team re-plans a month'],
    ['Physical', 'a second production line', 'warehouse space clears'],
    ['Financial', `${money(DECISIONS.strategic.capital)}, over ${DECISIONS.strategic.years} years`, `${pc(DECISIONS.tactical.discount)} of margin, ${DECISIONS.tactical.weeks} weeks`],
  ],
  colours: [[INK, BLUE, AMBER], [INK, BLUE, AMBER], [INK, BLUE, AMBER]],
  note: `3.3.1 · 2c names these three resources and no others, so an answer that reaches for "brand" or "reputation" is answering a different question. The contrast in the last row is the one to carry into an exam: ${money(DECISIONS.strategic.capital)} is ${pc(CAPITAL_SHARE)} of a year's revenue and cannot be recovered if the line is wrong, while a month of margin can be stopped on a Monday.`,
});

export const decisionsDiagram = {
  id: id('diagram', 'strategic and tactical decisions and resources'),
  title: 'Strategic and Tactical Decisions, and the Resources They Move',
  kind: 'table',
  description: `IAL 3.3.1 · 2c asks for the effect of strategic and tactical decisions on human, physical and financial resources. The four tests that separate the two kinds of decision, and then what each does to each of the three resources.`,
  scenarios: [
    { label: 'Telling them apart', svg: strategicTacticalView() },
    { label: 'The three resources', svg: resourcesView() },
  ],
};

/* ══ 6 · SWOT analysis (3.3.1 · 3a) ════════════════════════════════════════ */

export const SWOT_CELLS = [
  ['Strengths', 'Weaknesses'],
  ['Opportunities', 'Threats'],
];

const swotView = () => matrixSvg({
  title: 'The SWOT grid',
  xAxis: { name: 'Effect', values: ['Helps', 'Holds back'] },
  yAxis: { name: 'Origin', values: ['Internal', 'External'] },
  cells: SWOT_CELLS,
  colours: [[GREEN, RED], [GREEN, RED]],
  note: `The specification splits SWOT by ORIGIN first: 3a's two bullets are "internal considerations: strengths and weaknesses" and "external considerations: opportunities and threats". So the first question about any item is never whether it is good or bad — it is whether it comes from inside the business or from outside it.`,
});

const swotAdisaView = () => matrixSvg({
  title: `${A.name}'s SWOT`,
  xAxis: { name: 'Effect', values: ['Helps', 'Holds back'] },
  yAxis: { name: 'Origin', values: ['Internal', 'External'] },
  cells: [
    ['A big heater share', 'One factory only'],
    ['Cooling demand rising', 'Low-cost imports'],
  ],
  colours: [[GREEN, RED], [GREEN, RED]],
  note: `Each of the four is in its cell for a reason that can be stated: ${A.name} owns its heater share and can act on it; the single factory is its own choice; rising demand for cooling and the arrival of imports would both be true if ${A.name} did nothing at all. That last test — would this still be true if the firm did nothing? — is what puts an item on the external row.`,
});

export const swotDiagram = {
  id: id('diagram', 'swot grid'),
  title: 'The SWOT Grid',
  description: `IAL 3.3.1 · 3a asks for SWOT analysis with internal considerations (strengths and weaknesses) and external considerations (opportunities and threats). The empty grid, then one firm's filled in.`,
  checklist: [
    'Four cells with both dimensions labelled: where it comes from, and what it does',
    'Strengths and weaknesses on the internal row',
    'Opportunities and threats on the external row',
    'Each item placed by origin first, not by whether it is good or bad',
    'Items specific to the business, not statements true of any firm',
  ],
  scenarios: [
    { label: 'The grid', svg: swotView() },
    { label: `${A.name}'s SWOT`, svg: swotAdisaView() },
  ],
};

/* ══ 7 · External influences (3.3.1 · 4a, 4b, 4c) ══════════════════════════ */

export const PESTLE_ROWS = [
  ['Political', 'government decisions', 'an import tariff'],
  ['Economic', 'incomes, rates, prices', 'borrowing costs'],
  ['Social', 'how people live', 'more homes cooling'],
  ['Technological', 'what can be made or sold', 'cheaper solar panels'],
  ['Legal', 'rules a firm must obey', 'an efficiency standard'],
  ['Environmental', 'the physical world', 'hotter, drier summers'],
];

const pestleView = () => gridSvg({
  title: 'PESTLE: six kinds of external influence',
  headers: ['Letter', 'What it covers', 'Reaching Adisa'],
  rows: PESTLE_ROWS,
  colours: PESTLE_ROWS.map(() => [INK, MUTED, BLUE]),
  note: `4a names all six, so all six are learnable and none of them is optional. The letters are a prompt, not a filing system: a national minimum wage is a Legal rule, an Economic cost and a Political choice all at once, and an answer that argues for one letter has missed the point of the tool, which is to make sure nothing outside the business is overlooked.`,
});

export const FORCES_ROWS = [
  ['Rivalry', 'how hard rivals compete', 'many similar makers'],
  ['New entrants', 'how easily others start', 'importers need no factory'],
  ['Substitutes', 'what else meets it', 'gas heating, not electric'],
  ['Buyer power', 'how far buyers press', 'a few large retail chains'],
  ['Supplier power', 'how far suppliers press', 'one compressor supplier'],
];

const forcesView = () => gridSvg({
  title: "Porter's five forces",
  headers: ['Force', 'The question it asks', 'For Adisa'],
  rows: FORCES_ROWS,
  colours: FORCES_ROWS.map(() => [INK, MUTED, AMBER]),
  note: `4c asks for the five forces, and 4b — the changing competitive environment — is what happens when one of them MOVES. The five together answer one question that PESTLE cannot: how much of the value created in this industry can a firm in it keep? A market can be growing fast and still be a poor one to be in, if four of these five forces are strong.`,
});

export const externalDiagram = {
  id: id('diagram', 'pestle and five forces'),
  title: 'PESTLE, and Porter\'s Five Forces',
  kind: 'table',
  description: `IAL 3.3.1 · 4a asks for PESTLE in full, 4b for the changing competitive environment and 4c for Porter's five forces. Both frameworks are listed here with the question each element asks and one firm's answer to it.`,
  scenarios: [
    { label: 'PESTLE', svg: pestleView() },
    { label: 'The five forces', svg: forcesView() },
  ],
};

export const DIAGRAMS = [objectivesDiagram, ansoffDiagram, porterDiagram, portfolioDiagram, decisionsDiagram, swotDiagram, externalDiagram];
