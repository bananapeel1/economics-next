/**
 * PACKET 22 — marketing-mix-strategy: seven diagrams, one per chapter, each pinned by `diagramId`.
 *
 * The March section had NONE (structure-03, topFix-03), in a topic whose two named models — the
 * product life cycle and the Boston Matrix — are diagrams by definition, and whose Business command
 * word `Construct` (4 marks) is "draw an accurately labelled diagram" (bus_spec.txt:2224-2226).
 * topFix-03's instruction to "wire them via diagramRef on blocks 0 and 5" is obsolete: since packet 5
 * a diagram reaches a student only from a BLOCK's `diagramId`, at that chapter's check-in
 * (lib/learn-steps.js:44-55), and a subsection `diagramId` is never read.
 *
 * A body cannot hold a table (`schema.body-type` allows paragraph, subheading, flow and bullets only)
 * and a practice stem renders into a <p>, so a DIAGRAM is the only surface in the schema that can
 * carry a grid — packet 17's finding, used four times here.
 *
 * Conventions from the live census: a 500-unit-wide viewBox (560 for grids, packet 19's width guard),
 * labels at 9-13 units, palette colours that components/learn-mode/processSvg.js remaps onto theme
 * tokens, strokes >= 2, and text placed from the geometry it names.
 *
 * WHICH DIAGRAMS CARRY A CHECKLIST, and why the others declare `kind: 'table'`. The `checklist`
 * field renders as "What a correct diagram shows", which is an instruction to reproduce the thing —
 * so it belongs only on a diagram a student could actually be asked to draw. The IAL Business
 * Construct command (4 marks) is "draw an accurately labelled diagram", and in this topic that means
 * the product life cycle, the Boston Matrix and a demand line. Those two diagrams keep their
 * checklists. The comparison grids, the four-box mix layout and the channel ladder are reference
 * material a student READS, so they declare `kind: 'table'` — which drops that header and releases
 * them from the width cap set for graphs. Packet 20 reported the opposite case from the product:
 * "What a correct diagram shows" printed over a lookup table on 3.3.1.
 *
 * EVERY QUANTITY HERE IS GENERATED, NOT DRAWN (packet 15's accuracy-01 rule): both demand lines are
 * sampled from qU() and qB(), the objective table is computed from them, and the channel ladder is
 * the mark-up chain applied to the unit cost. The runner re-derives each figure from the emitted SVG
 * and refuses to stage on a disagreement.
 */
import { id, money, units, el, share, UNIT_COST, MARKET, TODAY_P, TODAY_Q, PRICES, qU, qB, revU, revB, profitU, profitB, shareU, pedU, pedB, addedValue, MARKUPS, costPlus, PSYCH_P, CHANNELS, chainOf, shelfOf, zolaKeeps, U_REV_PEAK, U_PROFIT_PEAK, B_REV_PEAK, B_PROFIT_PEAK, U_CHOKE, B_CHOKE, U_INTERCEPT, B_INTERCEPT } from './_packet22-util.mjs';

const INK = '#e8ecf5', AXIS = '#94a3b8', GRID = '#475569', MUTED = '#7a8299';
const BLUE = '#3b82f6', GREEN = '#059669', RED = '#ef4444', AMBER = '#f59e0b', PURPLE = '#8b5cf6';
const open = (h = 330, w = 500) => `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',system-ui,sans-serif;background:transparent"><defs><marker id="arr" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="${AXIS}"/></marker></defs>`;
const close = '</svg>';
const t = (x, y, text, { size = 10, fill = INK, anchor = 'start', weight = 400, rotate = null } = {}) =>
  `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}"${rotate ? ` transform="rotate(${rotate},${x},${y})"` : ''}>${text}</text>`;
const line = (x1, y1, x2, y2, stroke, w = 2, extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${w}"${extra}/>`;
const rect = (x, y, w, h, fill, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"${extra}/>`;
const dot = (x, y, fill, r = 4) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;
export const r2 = (n) => Math.round(n * 100) / 100;

/* ── the shared grid, packet 19's geometry and its width guard ─────────────── */
/*
 * Column positions depend on how many columns there are, because three wide cells and four narrow
 * ones do not fit the same frame. [26, 260, 440] is packet 19's geometry, measured in the browser
 * with getComputedTextLength() after three cells ran under their neighbours; the four-column set is
 * for grids whose cells are prices and percentages. The runner's collision guard checks both.
 */
export const GRD = { w: 560, x0: 26, y0: 72, rowH: 30, right: 534, cols3: [26, 260, 440], cols4: [26, 230, 380, 500] };
export const gridRowY = (i) => r2(GRD.y0 + (i + 1) * GRD.rowH);

const gridSvg = ({ title, headers, rows, note, colours = [] }) => {
  const cols = (headers.length <= 3 ? GRD.cols3 : GRD.cols4).slice(0, headers.length);
  const head = headers.map((h, c) => t(cols[c], GRD.y0, h, { size: 11, fill: AXIS, weight: 600, anchor: c === 0 ? 'start' : 'middle' })).join('');
  const body = rows.map((cells, i) => [
    ...cells.map((cell, c) => t(cols[c], gridRowY(i), cell, { size: 12, fill: c === 0 ? INK : (colours[i]?.[c] || INK), weight: c === 0 ? 600 : 400, anchor: c === 0 ? 'start' : 'middle' })),
    line(GRD.x0, r2(gridRowY(i) + 9), GRD.right, r2(gridRowY(i) + 9), GRID, 1),
  ].join('')).join('');
  const h = Math.max(300, gridRowY(rows.length - 1) + 60);
  return [open(h, GRD.w), t(GRD.x0, 40, title, { size: 13, weight: 600 }), head,
    line(GRD.x0, r2(GRD.y0 + 9), GRD.right, r2(GRD.y0 + 9), AXIS, 2), body,
    t(GRD.x0, r2(gridRowY(rows.length - 1) + 36), note, { size: 10, fill: MUTED }), close].join('');
};

/* ── the demand plot: one frame for both of Zola's lines ───────────────────── */
/*
 * Quantity across, price up, which is the convention the rest of the course uses. The frame holds
 * the wider of the two lines at a price of zero, so both are drawn to the same scale and the pivot
 * is a genuine comparison rather than two pictures.
 */
const PL = { x0: 56, x1: 470, y0: 60, y1: 280, qMax: U_INTERCEPT, pMax: B_CHOKE };
export const PX = (q) => r2(PL.x0 + (q / PL.qMax) * (PL.x1 - PL.x0));
export const PY = (p) => r2(PL.y1 - (p / PL.pMax) * (PL.y1 - PL.y0));

/* ── 1 · the marketing mix, and the three objectives (block 1) ─────────────── */

const mixSvg = () => {
  const els = [
    { name: 'Product', sub: 'What it is and does', colour: GREEN },
    { name: 'Promotion', sub: 'How buyers hear of it', colour: AMBER },
    { name: 'Price', sub: 'What is charged', colour: BLUE },
    { name: 'Place', sub: 'How it reaches them', colour: PURPLE },
  ];
  const boxW = 210, boxH = 64;
  const boxes = els.map((e, i) => {
    const x = 26 + (i % 2) * (boxW + 28), y = 70 + Math.floor(i / 2) * (boxH + 26);
    return [rect(x, y, boxW, boxH, 'none', ` stroke="${e.colour}" stroke-width="2" rx="6"`),
      t(x + 12, y + 26, e.name, { size: 13, weight: 600, fill: e.colour }),
      t(x + 12, y + 46, e.sub, { size: 10, fill: MUTED })].join('');
  }).join('');
  return [open(268), t(26, 40, 'The marketing mix: four decisions a business controls', { size: 13, weight: 600 }),
    boxes,
    t(26, 236, 'A decision in one constrains the other three — which is what makes it a mix', { size: 10, fill: MUTED }),
    close].join('');
};

/*
 * Three rows, not four. The $24 row belongs to block 5, where the branded line makes it pay; here it
 * would only add a fourth row to a grid, and `diagram.table-kind` turns DEBT at four rows sharing
 * columns — a table that is a table must say so, and this view sits beside a box diagram that is not.
 */
export const OBJECTIVE_PRICES = PRICES.filter((p) => p <= TODAY_P);
const objectivesSvg = () => gridSvg({
  title: `Zola's three objectives do not point at the same price`,
  headers: ['Price', 'Market share', 'Revenue', 'Profit'],
  rows: OBJECTIVE_PRICES.map((p) => [money(p), share(shareU(p)), money(revU(p)), money(profitU(p))]),
  colours: OBJECTIVE_PRICES.map((p) => [INK,
    p === OBJECTIVE_PRICES[0] ? GREEN : INK,
    p === U_REV_PEAK ? GREEN : INK,
    p === U_PROFIT_PEAK ? GREEN : INK]),
  note: `Share is largest at the lowest price · revenue peaks at ${money(U_REV_PEAK)} · profit peaks at ${money(U_PROFIT_PEAK)}`,
});

const mixDiagram = {
  id: id('diagram', 'the marketing mix and the three marketing objectives'),
  title: 'The Marketing Mix, and What Each Objective Costs',
  description: `The four elements of the marketing mix, and Zola's market share, revenue and profit at three prices — so that the three marketing objectives the specification names can be read against each other.`,
  kind: 'table',
  scenarios: [
    { label: 'The four elements', svg: mixSvg() },
    { label: 'The three objectives, priced', svg: objectivesSvg() },
  ],
};

/* ── 2 · the product life cycle, and the Boston Matrix (block 2) ───────────── */
/*
 * The curve is sampled, not drawn. SALES and PROFIT are the sampled series; the runner checks the
 * shape properties a life cycle must have — sales rise then fall, profit starts negative, crosses
 * once, and peaks BEFORE sales do — against the emitted points rather than against this comment.
 */
export const STAGES = ['Introduction', 'Growth', 'Maturity', 'Decline'];
export const SALES = [4, 10, 22, 40, 58, 70, 76, 78, 76, 70, 58, 44];
export const PROFIT = [-14, -10, -2, 8, 20, 30, 34, 32, 26, 18, 8, -2];
export const EXT_FROM = 9;                       // where the extension strategy is applied
export const EXT_SALES = [76, 74, 72, 71, 70];   // sales held up instead of falling away

const plcSvg = () => {
  const x0 = 56, x1 = 470, y0 = 56, yBase = 250, yMin = 290;
  const n = SALES.length - 1;
  const X = (i) => r2(x0 + (i / n) * (x1 - x0));
  const Y = (v) => r2(yBase - (v / 80) * (yBase - y0));
  const path = (series, from = 0) => series.map((v, k) => `${k ? 'L' : 'M'}${X(from + k)},${Y(v)}`).join(' ');
  const stageBands = STAGES.map((s, i) => {
    const a = X(i * 3), b = X(Math.min((i + 1) * 3, n));
    return [line(b, y0, b, yMin, GRID, 1, ' stroke-dasharray="3,3"'),
      t(r2((a + b) / 2), 44, s, { size: 11, fill: AXIS, weight: 600, anchor: 'middle' })].join('');
  }).join('');
  const ext = [`<path d="${path(EXT_SALES, EXT_FROM - 2)}" fill="none" stroke="${AMBER}" stroke-width="2" stroke-dasharray="5,3"/>`,
    t(X(n), r2(Y(EXT_SALES[EXT_SALES.length - 1]) + 16), 'with an extension strategy', { size: 10, fill: AMBER, anchor: 'end' })].join('');
  const peakSales = SALES.indexOf(Math.max(...SALES));
  const peakProfit = PROFIT.indexOf(Math.max(...PROFIT));
  return [open(320),
    t(26, 28, 'The product life cycle: sales and profit are different curves', { size: 13, weight: 600 }),
    stageBands,
    line(x0, y0, x0, yMin, AXIS, 2), line(x0, Y(0), x1, Y(0), AXIS, 2),
    t(46, y0 + 4, 'Sales / profit', { size: 10, fill: AXIS, anchor: 'end', rotate: -90 }),
    t(x1, r2(Y(0) + 16), 'Time', { size: 10, fill: AXIS, anchor: 'end' }),
    `<path d="${path(SALES)}" fill="none" stroke="${BLUE}" stroke-width="2.5"/>`,
    `<path d="${path(PROFIT)}" fill="none" stroke="${GREEN}" stroke-width="2.5"/>`,
    ext,
    dot(X(peakSales), Y(SALES[peakSales]), BLUE), dot(X(peakProfit), Y(PROFIT[peakProfit]), GREEN),
    t(r2(X(peakSales) - 10), r2(Y(SALES[peakSales]) + 16), 'sales peak', { size: 10, fill: BLUE, anchor: 'end' }),
    t(X(peakProfit), r2(Y(PROFIT[peakProfit]) - 10), 'profit peaks first', { size: 10, fill: GREEN, anchor: 'middle' }),
    t(26, 308, 'Profit starts negative, crosses zero in growth, and peaks before sales do', { size: 10, fill: MUTED }),
    close].join('');
};

export const QUADRANTS = [
  { name: 'Star', growth: 'high', shareAxis: 'high', note: 'Earns and spends' },
  { name: 'Question mark', growth: 'high', shareAxis: 'low', note: 'Needs cash to answer' },
  { name: 'Cash cow', growth: 'low', shareAxis: 'high', note: 'Funds the others' },
  { name: 'Dog', growth: 'low', shareAxis: 'low', note: 'Neither grows nor funds' },
];

const bostonSvg = () => {
  const x0 = 96, x1 = 456, y0 = 62, y1 = 278;
  const midX = r2((x0 + x1) / 2), midY = r2((y0 + y1) / 2);
  // High share is drawn on the LEFT, which is the matrix's own convention.
  const cellX = (s) => (s === 'high' ? r2((x0 + midX) / 2) : r2((midX + x1) / 2));
  const cellY = (g) => (g === 'high' ? r2((y0 + midY) / 2) : r2((midY + y1) / 2));
  /*
   * One text per cell, not a name over a note. Stacking them put four pairs of labels on the same two
   * x positions, and with the axis ticks below that is five rows on one column signature — which is
   * `diagram.table-kind`'s definition of a grid. The matrix IS a 2x2 grid, but it is a diagram a
   * student draws rather than a table a student reads, so it keeps its checklist and loses the
   * second line instead. What each quadrant is FOR is taught in the body and tested by the match
   * recall on the same step.
   */
  const cells = QUADRANTS.map((q) => t(cellX(q.shareAxis), cellY(q.growth), q.name, { size: 14, weight: 600, anchor: 'middle', fill: q.name === 'Cash cow' ? GREEN : q.name === 'Dog' ? RED : q.name === 'Star' ? AMBER : BLUE })).join('');
  /*
   * 344 units tall, not 320. The caption sat at y=308 and the "Market share" axis label at y1+36=314,
   * six units apart with eleven-unit text: at 375px they printed on top of each other. Caught by the
   * 390x844 walkthrough — the runner checks the strings an SVG contains and cannot see two of them
   * land in the same place, and Layer 6 reads the JSON rather than the rendering.
   */
  return [open(344),
    t(26, 32, 'The Boston Matrix: market growth against market share', { size: 13, weight: 600 }),
    rect(x0, y0, r2(x1 - x0), r2(y1 - y0), 'none', ` stroke="${AXIS}" stroke-width="2"`),
    line(midX, y0, midX, y1, GRID, 1.5), line(x0, midY, x1, midY, GRID, 1.5),
    cells,
    t(r2(x0 - 12), r2(y0 + 16), 'High', { size: 10, fill: AXIS, anchor: 'end' }),
    t(r2(x0 - 12), r2(y1 - 6), 'Low', { size: 10, fill: AXIS, anchor: 'end' }),
    t(r2(x0 - 44), midY, 'Market growth', { size: 11, fill: AXIS, anchor: 'middle', weight: 600, rotate: -90 }),
    t(r2((x0 + midX) / 2), r2(y1 + 18), 'High', { size: 10, fill: AXIS, anchor: 'middle' }),
    t(r2((midX + x1) / 2), r2(y1 + 18), 'Low', { size: 10, fill: AXIS, anchor: 'middle' }),
    t(midX, r2(y1 + 36), 'Market share', { size: 11, fill: AXIS, anchor: 'middle', weight: 600 }),
    t(26, 332, 'The cash cow funds the question marks; a question mark that wins share becomes a star', { size: 10, fill: MUTED }),
    close].join('');
};

const plcDiagram = {
  id: id('diagram', 'product life cycle and boston matrix'),
  title: 'The Product Life Cycle and the Boston Matrix',
  description: 'The life cycle drawn as sales and profit over time, with the four stages marked and an extension strategy holding the product in maturity; and the Boston Matrix with market growth and market share on its axes.',
  checklist: [
    'Both axes labelled on each diagram before anything is plotted',
    'All four life-cycle stages named: introduction, growth, maturity, decline',
    'Sales and profit drawn as separate curves, with profit starting below zero',
    'Profit peaking before sales, not with them',
    'An extension strategy shown holding sales up rather than starting a new curve',
    'The Boston Matrix axes right: market growth up the side, market share across the bottom',
    'All four quadrants named',
  ],
  scenarios: [
    { label: 'The life cycle and an extension', svg: plcSvg() },
    { label: 'The Boston Matrix', svg: bostonSvg() },
  ],
};

/* ── 3 · strategies for four types of market (block 3) ─────────────────────── */

const marketTypesSvg = () => gridSvg({
  title: 'Marketing strategies appropriate for different types of market',
  headers: ['', 'Mass market', 'Niche market'],
  rows: [
    ['Product', 'Standardised', 'Specialised'],
    ['Price', 'Competitive', 'Higher, accepted'],
    ['Promotion', 'Broad audience', 'One group'],
    ['Place', 'Wherever most shop', 'Where they look'],
    ['Unit cost', 'Low, from volume', 'Higher'],
    ['Main risk', 'Price competition', 'A sales ceiling'],
  ],
  note: 'The same four decisions, answered oppositely, because the buyers are different',
});

const b2bSvg = () => gridSvg({
  title: 'Business to business and business to consumer',
  headers: ['', 'B2B', 'B2C'],
  rows: [
    ['Order size', 'Large, repeated', 'One at a time'],
    ['Who decides', 'Justified to others', 'The buyer alone'],
    ['Price', 'Negotiated', 'Published'],
    ['Promotion', 'To named buyers', 'To an audience'],
    ['At stake', 'A whole account', 'One purchase'],
  ],
  note: 'A B2B purchase usually has to be justified, which is what changes the mix',
});

/* A reference table, not a diagram: no student draws a comparison grid in an exam, and the component
   printed "What a correct diagram shows" over it, which reads as an instruction to reproduce it
   (packet 20's finding on 3.3.1). `kind: 'table'` drops that header and releases the grid from the
   width cap set for graphs, which is why it carries no checklist. */
const marketTypesDiagram = {
  id: id('diagram', 'marketing strategies for four types of market'),
  title: 'Strategies for Four Types of Market',
  description: 'The four elements of the mix answered for a mass market against a niche market, and the differences between selling to a business and selling to a consumer.',
  kind: 'table',
  scenarios: [
    { label: 'Mass against niche', svg: marketTypesSvg() },
    { label: 'B2B against B2C', svg: b2bSvg() },
  ],
};

/* ── 4 · the design mix (block 4) ──────────────────────────────────────────── */

const designMixSvg = () => {
  const cx = 250, top = 74, half = 150, base = 250;
  const pts = [[cx, top], [r2(cx - half), base], [r2(cx + half), base]];
  const corners = [
    { label: 'Function', sub: 'What it must do', at: [cx, r2(top - 12)], anchor: 'middle', colour: GREEN },
    { label: 'Aesthetics', sub: 'How it looks and feels', at: [r2(cx - half), r2(base + 20)], anchor: 'middle', colour: PURPLE },
    { label: 'Cost', sub: 'Economic manufacture', at: [r2(cx + half), r2(base + 20)], anchor: 'middle', colour: AMBER },
  ];
  // Two products placed inside the triangle, each leaning towards the corner it leads on.
  const placed = [
    { name: 'Budget bottle', at: [r2(cx + 62), r2(base - 44)], colour: AMBER },
    { name: 'Premium bottle', at: [r2(cx - 58), r2(base - 52)], colour: PURPLE },
  ];
  return [open(320),
    t(26, 34, 'The design mix: three elements that trade against each other', { size: 13, weight: 600 }),
    `<polygon points="${pts.map((p) => p.join(',')).join(' ')}" fill="none" stroke="${AXIS}" stroke-width="2"/>`,
    corners.map((c) => [t(c.at[0], c.at[1], c.label, { size: 12, weight: 600, fill: c.colour, anchor: c.anchor }),
      t(c.at[0], r2(c.at[1] + 15), c.sub, { size: 10, fill: MUTED, anchor: c.anchor })].join('')).join(''),
    placed.map((p) => [dot(p.at[0], p.at[1], p.colour, 5),
      t(p.at[0], r2(p.at[1] - 10), p.name, { size: 10, fill: p.colour, anchor: 'middle' })].join('')).join(''),
    t(26, 306, `Zola's bottle costs ${money(UNIT_COST)} to make — every move towards a corner is paid for at another`, { size: 10, fill: MUTED }),
    close].join('');
};

const designTrendsSvg = () => gridSvg({
  title: 'Changes in the elements of the design mix to reflect social trends',
  headers: ['Response', 'What it changes', 'Effect on cost'],
  rows: [
    ['Waste minimisation', 'Less material used', 'Lower'],
    ['Re-use and recycling', 'Used again', 'Either way'],
    ['Ethical sourcing', 'Where it comes from', 'Higher'],
  ],
  colours: [[INK, INK, GREEN], [INK, INK, AMBER], [INK, INK, RED]],
  note: 'Waste minimisation lowers cost by definition: less material bought, less thrown away',
});

const designDiagram = {
  id: id('diagram', 'the design mix and its social trends'),
  title: 'The Design Mix and the Trends Changing It',
  description: 'The three elements of the design mix drawn as a triangle with two products placed inside it, and the responses to social trends set against what each does to cost.',
  kind: 'table',
  scenarios: [
    { label: 'The three elements', svg: designMixSvg() },
    { label: 'Social trends and cost', svg: designTrendsSvg() },
  ],
};

/* ── 5 · what a brand changes (block 5) ────────────────────────────────────── */
/*
 * The section's central diagram, and the one the March content most needed: both demand lines drawn
 * on one frame, pivoting about ($20, 60,000). Every point is sampled from qU() and qB().
 */
const brandPivotSvg = () => {
  const uPath = `M${PX(qU(0))},${PY(0)} L${PX(qU(U_CHOKE))},${PY(U_CHOKE)}`;
  const bPath = `M${PX(qB(0))},${PY(0)} L${PX(qB(B_CHOKE))},${PY(B_CHOKE)}`;
  const marks = [TODAY_P, 24].flatMap((p) => [
    dot(PX(qU(p)), PY(p), BLUE), dot(PX(qB(p)), PY(p), GREEN),
    line(PL.x0, PY(p), PX(qB(p)), PY(p), GRID, 1, ' stroke-dasharray="3,3"'),
    t(r2(PL.x0 - 8), r2(PY(p) + 4), money(p), { size: 10, fill: AXIS, anchor: 'end' }),
  ]);
  return [open(340),
    t(26, 30, 'What building a brand changes: the same point, a gentler line', { size: 13, weight: 600 }),
    line(PL.x0, PL.y0, PL.x0, PL.y1, AXIS, 2), line(PL.x0, PL.y1, PL.x1, PL.y1, AXIS, 2),
    t(r2(PL.x0 - 34), r2((PL.y0 + PL.y1) / 2), 'Price', { size: 11, fill: AXIS, anchor: 'middle', weight: 600, rotate: -90 }),
    t(PL.x1, r2(PL.y1 + 18), 'Bottles a year', { size: 10, fill: AXIS, anchor: 'end' }),
    `<path d="${uPath}" fill="none" stroke="${BLUE}" stroke-width="2.5"/>`,
    `<path d="${bPath}" fill="none" stroke="${GREEN}" stroke-width="2.5"/>`,
    marks.join(''),
    t(r2(PX(qU(24)) - 8), r2(PY(24) - 8), 'before the brand', { size: 10, fill: BLUE, anchor: 'end' }),
    t(r2(PX(qB(24)) + 8), r2(PY(24) - 8), 'after the brand', { size: 10, fill: GREEN }),
    t(PX(TODAY_Q), r2(PY(TODAY_P) + 20), `both lines meet at ${money(TODAY_P)}, ${units(TODAY_Q)}`, { size: 10, fill: MUTED, anchor: 'middle' }),
    t(26, 324, `At ${money(24)}: ${units(qU(24))} bottles before, ${units(qB(24))} after — the brand is what a price rise no longer costs`, { size: 10, fill: MUTED }),
    close].join('');
};


const brandDiagram = {
  id: id('diagram', 'what a strong brand changes'),
  title: 'What a Strong Brand Changes',
  description: `Zola's demand before and after the brand was built, drawn through the same price and the same sales so that the pivot is visible, with the three benefits the specification names read off the two lines.`,
  checklist: [
    'Both axes labelled, with price up the side',
    'Two lines crossing at today\'s price and today\'s sales, not one shifted sideways',
    'The branded line the gentler of the two',
    'All three named benefits present: added value, premium prices, reduced price elasticity of demand',
    `The profit-maximising price moving from ${money(U_PROFIT_PEAK)} to ${money(B_PROFIT_PEAK)}`,
  ],
  /* The benefits grid that used to sit here has gone: this diagram is the one a student could be
     asked to Construct, so it keeps its checklist, and a checklist and a table cannot share one
     diagram. Every figure the grid carried is in the body bullets, the Notes, three flashcards and
     an extras chain, so nothing is lost but a fourth place to read it. */
  scenarios: [
    { label: 'The pivot', svg: brandPivotSvg() },
  ],
};

/* ── 6 · pricing strategies and the six factors (block 6) ──────────────────── */

const pricingStrategiesSvg = () => gridSvg({
  title: 'Types of pricing strategy, and what each one needs',
  headers: ['Strategy', 'What it does', 'When it fits'],
  rows: [
    ['Cost plus', `${money(UNIT_COST)} + mark-up`, 'Many lines to price'],
    ['Price skimming', `Launch at ${money(24)}, fall`, 'Nothing matches it'],
    ['Penetration', `Launch at ${money(12)}, rise`, 'Early share pays'],
    ['Predatory', 'Below cost', 'Restricted by law'],
    ['Competitive', 'What rivals charge', 'Nothing separates'],
    ['Psychological', money(PSYCH_P), 'A finishing touch'],
  ],
  colours: [[INK, INK, INK], [INK, INK, INK], [INK, INK, INK], [INK, RED, RED], [INK, INK, INK], [INK, INK, INK]],
  note: 'All six the specification names. Only predatory pricing goes below cost on purpose',
});

const costPlusSvg = () => {
  const bars = MARKUPS.map((m, i) => {
    const y = 84 + i * 62, costW = 110, addW = r2(costW * (m / 100));
    return [rect(120, y, costW, 34, BLUE, ' rx="3"'),
      rect(r2(120 + costW), y, addW, 34, AMBER, ' rx="3"'),
      t(26, r2(y + 22), `${m}% mark-up`, { size: 11, weight: 600 }),
      t(r2(120 + costW / 2), r2(y + 22), money(UNIT_COST), { size: 11, anchor: 'middle', fill: '#0b1220' }),
      t(r2(120 + costW + addW + 10), r2(y + 22), `= ${money(costPlus(m))}`, { size: 12, weight: 600, fill: GREEN })].join('');
  }).join('');
  return [open(300),
    t(26, 40, `Cost plus: the same ${money(UNIT_COST)} unit cost, three mark-ups`, { size: 13, weight: 600 }),
    t(120, 70, 'unit cost', { size: 10, fill: BLUE }), t(240, 70, 'mark-up added', { size: 10, fill: AMBER }),
    bars,
    t(26, 280, 'Nothing in the arithmetic looks at the buyer — which is the method\'s strength and its weakness', { size: 10, fill: MUTED }),
    close].join('');
};

/* The six strategies are a lookup table a student reads, not a diagram a student draws, so this one
   is declared a table and carries no "what a correct diagram shows" checklist either. */
const pricingDiagram = {
  id: id('diagram', 'pricing strategies and cost plus'),
  title: 'Pricing Strategies, and Cost Plus Worked',
  description: `All six types of pricing strategy the specification names with the conditions each needs, and cost plus applied to Zola's ${money(UNIT_COST)} unit cost at three mark-ups.`,
  kind: 'table',
  scenarios: [
    { label: 'The six strategies', svg: pricingStrategiesSvg() },
    { label: 'Cost plus, worked', svg: costPlusSvg() },
  ],
};

/* ── 7 · the three distribution channels (block 7) ─────────────────────────── */

const channelLadderSvg = () => {
  const rows = CHANNELS.map((ch, i) => {
    const y = 88 + i * 74;
    const chain = chainOf(ch);
    const stops = ['Zola', ...ch.steps.slice(1).map((s) => s.who.replace('the ', '')), 'consumer'];
    const boxW = 84, gap = 30;
    const boxes = stops.map((s, k) => {
      const x = 26 + k * (boxW + gap);
      return [rect(x, y, boxW, 40, 'none', ` stroke="${k === 0 ? GREEN : k === stops.length - 1 ? PURPLE : AMBER}" stroke-width="2" rx="4"`),
        t(r2(x + boxW / 2), r2(y + 17), s, { size: 10, anchor: 'middle', fill: MUTED }),
        t(r2(x + boxW / 2), r2(y + 32), money(k === stops.length - 1 ? shelfOf(ch) : chain[k]), { size: 12, anchor: 'middle', weight: 600 }),
        k < stops.length - 1 ? line(r2(x + boxW), r2(y + 20), r2(x + boxW + gap - 4), r2(y + 20), AXIS, 1.5, ' marker-end="url(#arr)"') : '',
      ].join('');
    }).join('');
    return [t(26, r2(y - 10), `${ch.name}: ${ch.path}`, { size: 11, fill: AXIS, weight: 600 }),
      boxes,
      t(534, r2(y + 24), `Zola keeps ${money(zolaKeeps(ch))}`, { size: 11, weight: 600, anchor: 'end', fill: i === 2 ? GREEN : i === 0 ? RED : AMBER })].join('');
  }).join('');
  return [open(330, GRD.w),
    t(26, 40, `The three channels, from a unit cost of ${money(UNIT_COST)}`, { size: 13, weight: 600 }),
    rows,
    t(26, 312, `The four stage and three stage channels both reach the consumer at ${money(shelfOf(CHANNELS[1]))}`, { size: 10, fill: MUTED }),
    close].join('');
};

const channelDiagram = {
  id: id('diagram', 'the three distribution channels'),
  title: 'The Three Distribution Channels',
  description: `The four stage, three stage and two stage channels the specification names, with a mark-up applied at each stage from Zola's ${money(UNIT_COST)} unit cost, and what reaches the producer at the end of each.`,
  kind: 'table',
  scenarios: [{ label: 'The three channels', svg: channelLadderSvg() }],
};

export const DIAGRAMS = [mixDiagram, plcDiagram, marketTypesDiagram, designDiagram, brandDiagram, pricingDiagram, channelDiagram];
