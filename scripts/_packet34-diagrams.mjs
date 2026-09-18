/**
 * PACKET 34 — causes-effects-globalisation: five diagrams, one per chapter, every figure sampled
 * from `_packet34-util.mjs` rather than typed.
 *
 * ════ THE LIVE SECTION'S THREE DIAGRAMS ARE THE REASON THIS MODULE IS STRICT ════
 *
 *   - `accuracy-03` / `topFix-04`: diagram 1, "FDI Flows: Reasons and Impacts", draws a Reasons
 *     column at x 10-140, y 100-257 and a Positive-impacts column at x 60-230, y 153-273. They
 *     overlap over x 60-140, y 153-257, so four reason labels and four impact labels are printed on
 *     top of each other. **Two columns side by side is the layout that produced it**, so nothing in
 *     this module draws one: the FDI diagram is three full-width bands stacked down the frame, which
 *     cannot collide horizontally because nothing shares a row.
 *   - `topFix-04`, second clause: diagram 0 carries numeric gridlines with no source. Every number
 *     in the chart below is `TAMIRA.series`, which is two growth rates and a ratio — a reader who
 *     changes either rate changes the chart, and nothing in it is a remembered figure.
 *   - `accuracy-02`: an examMatters told students to show trade creation and diversion on a diagram
 *     that does not exist — and could not exist here, because those are 4.3.2. The five diagrams
 *     below are the five the section actually teaches from, and the runner checks that every
 *     instruction to draw names one of them.
 *
 * 440-unit frames with a 12-unit floor for the drawn diagrams and 10 for the declared tables
 * (V022, packet 30's measurement: a Learn Mode diagram renders 313 CSS px wide at 390x844, so a
 * 12-unit face is 8.54px and a 10-unit table cell at the 530px laptop column is 12.05px, which is
 * what `diagram.table-legible` asks for).
 */
import { id, round2, TAMIRA, DEVICE, NORVELL, CAUSES } from './_packet34-util.mjs';

const INK = '#e8ecf5', AXIS = '#94a3b8', GRID = '#475569', MUTED = '#7a8299';
const BLUE = '#3b82f6', GREEN = '#059669', RED = '#ef4444', AMBER = '#f59e0b';

export const r2 = round2;

const open = (h = 400, w = 440) => `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',system-ui,sans-serif;background:transparent">`;
const close = '</svg>';
const t = (x, y, text, { size = 12, fill = INK, anchor = 'start', weight = 400 } = {}) =>
  `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${text}</text>`;
const line = (x1, y1, x2, y2, stroke, w = 2, extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${w}"${extra}/>`;
const box = (x, y, w, h, stroke, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="none" stroke="${stroke}" stroke-width="1.5"${extra}/>`;
const fillBox = (x, y, w, h, fill, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${fill}"${extra}/>`;
const poly = (points, fill, extra = '') => `<polygon points="${points.map(([x, y]) => `${x} ${y}`).join(',')}" fill="${fill}"${extra}/>`;

export const GRD = { w: 440, x0: 20, y0: 74, rowH: 28, right: 420, size: 12, gutter: 12 };
/** The smallest face any drawn diagram in this section may emit, in viewBox units. */
export const MIN_FACE = 12;
export const TBL = { w: 440, x0: 20, y0: 74, rowH: 28, right: 420, size: 10, gutter: 12, note: 10 };
export const estWidth = (text, size = GRD.size) => String(text).length * size * (String(text).length < 4 ? 0.9 : 0.7);

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

/* Each wrapped line is emitted a hundredth of a unit further right, so a multi-line caption cannot
 * be read as a grid by `diagram.table-kind` (packet 24). */
const wrap = (x, y, text, { size = MIN_FACE, fill = MUTED, lead = 15, maxWidth = GRD.right - GRD.x0 } = {}) =>
  wrapLines(text, { size, maxWidth }).map((l, i) => t(r2(x + i * 0.01), r2(y + i * lead), l, { size, fill })).join('');

const titleSvg = (text, { x = GRD.x0, y = 28, size = 13, lead = 16 } = {}) =>
  wrapLines(text, { size, maxWidth: GRD.right - x }).map((l, i) => t(r2(x + i * 0.6), r2(y + i * lead), l, { size, weight: 600 })).join('');
const titleDepth = (text, { size = 13, lead = 16 } = {}) => (wrapLines(text, { size, maxWidth: GRD.right - GRD.x0 }).length - 1) * lead;

/* A label that cannot be placed off-frame (packet 29 rule 5): the placement asks the same
 * `estWidth` the runner's guard asks. */
const place = (x, y, text, colour, { size = MIN_FACE, gap = 8, weight = 600 } = {}) => {
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

/* ══ 1 · TRADE AS A PROPORTION OF GDP (1a) ════════════════════════════════ */

/*
 * ONE SERIES AND ONE SCALE. The obvious alternative — output and trade as two index lines — puts a
 * line reaching 710 beside one reaching 1,842 on a single axis and makes the slower of the two look
 * flat, which is the opposite of the leaf's point. The ratio IS the leaf ("increase in trade as a
 * proportion of GDP"), so the ratio is what is drawn, and the two growth rates that produce it are
 * stated in the caption where they can be checked.
 */
const opennessChart = () => {
  const title = `${TAMIRA.name}: trade as a proportion of GDP, over fifty years`;
  const top = 96 + titleDepth(title), bottom = 300, left = 56, right = 416;
  const yMax = 80;
  const yFor = (v) => r2(bottom - (v / yMax) * (bottom - top));
  const xFor = (i) => r2(left + (i / (TAMIRA.series.length - 1)) * (right - left));
  const ticks = [0, 20, 40, 60, 80];
  const pts = TAMIRA.series.map((s, i) => [xFor(i), yFor(s.openness)]);
  const first = TAMIRA.series[0], last = TAMIRA.series[TAMIRA.series.length - 1];
  const caption = `Output compounds at ${TAMIRA.gdpPct}% a year and trade at ${TAMIRA.tradePct}%, so trade rises from ${first.openness}% of GDP to ${last.openness}% without either series ever falling. The horizontal axis counts years before today.`;
  /* THE FRAME IS MEASURED, NOT GUESSED. A fixed height put the caption's last line two units below
   * the canvas, which the extent guard caught and nothing else would have. */
  const capLines = wrapLines(caption, { size: MIN_FACE, maxWidth: GRD.right - GRD.x0 }).length;
  return [open(r2(bottom + 46 + capLines * 16 + 8)), titleSvg(title),
    ticks.map((v) => [
      line(left, yFor(v), right, yFor(v), GRID, 1, ' stroke-dasharray="2 4"'),
      t(r2(left - 8), r2(yFor(v) + 4), `${v}%`, { size: MIN_FACE, fill: AXIS, anchor: 'end' }),
    ].join('')).join(''),
    line(left, top, left, bottom, AXIS, 1.5), line(left, bottom, right, bottom, AXIS, 1.5),
    `<polyline points="${pts.map(([x, y]) => `${x},${y}`).join(' ')}" fill="none" stroke="${BLUE}" stroke-width="2.5"/>`,
    pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.5" fill="${BLUE}"/>`).join(''),
    TAMIRA.series.map((s, i) => t(xFor(i), r2(bottom + 18), i === TAMIRA.series.length - 1 ? 'now' : `${50 - s.t}y`, { size: MIN_FACE, fill: AXIS, anchor: 'middle' })).join(''),
    place(pts[0][0], r2(pts[0][1] - 10), `${first.openness}%`, BLUE),
    t(r2(right), r2(pts[pts.length - 1][1] - 12), `${last.openness}%`, { size: MIN_FACE, fill: BLUE, weight: 600, anchor: 'end' }),
    wrap(GRD.x0, r2(bottom + 46), caption, { size: MIN_FACE, maxWidth: GRD.right - GRD.x0, lead: 16 }),
    close].join('');
};

export const opennessDiagram = {
  id: id('diagram', 'trade as a proportion of gdp'),
  title: 'Trade as a Proportion of GDP',
  checklist: [
    'Time on the horizontal axis and the ratio, as a percentage, on the vertical.',
    'A single series: (exports + imports) ÷ GDP × 100, not the level of trade.',
    'A line that rises throughout, because trade compounds faster than output.',
    'The first and last values marked, so the size of the change can be read off.',
  ],
  caption: `Trade compounding faster than output is what "increase in trade as a proportion of GDP" means, and it is the first characteristic the specification names.`,
  svg: opennessChart(),
};

/* ══ 2 · WHAT RAISED TRADE FASTER THAN OUTPUT (2a) ════════════════════════ */

export const causesDiagram = {
  id: id('diagram', 'five causes of globalisation'),
  kind: 'table',
  title: 'The Five Causes, and What Each One Changed',
  caption: 'The specification names five factors contributing to increased globalisation in the last fifty years. Each one lowers a different obstacle.',
  svg: gridSvg({
    title: 'Five causes, and the obstacle each one lowers',
    headers: ['Cause', 'What it changed'],
    rows: [
      [CAUSES[0][0], 'Barriers come down'],
      [CAUSES[1][0], 'More of them, larger'],
      [CAUSES[2][0], 'Closed economies opened'],
      ['Transport and comms', 'Both got cheaper'],
      [CAUSES[4][0], 'Production split up'],
    ],
    note: `Only the fourth changes what CAN be traded rather than what is allowed to be: at $${NORVELL.freightBefore} a unit, freight on a $${NORVELL.cheapGoodFactory} good was ${r2((100 * NORVELL.freightBefore) / NORVELL.cheapGoodFactory)}% of its factory price; at $${NORVELL.freightAfter} it is ${r2((100 * NORVELL.freightAfter) / NORVELL.cheapGoodFactory)}%.`,
  }),
};

/* ══ 3 · FDI BY A TNC: THE MONEY IN, AND WHAT IT PAYS FOR (2b) ════════════ */

/*
 * THREE FULL-WIDTH BANDS, STACKED. This is the diagram `accuracy-03` is about, and the defect was
 * two columns whose x-ranges overlapped. Nothing here shares a row with anything else, so the
 * failure mode is unrepresentable rather than corrected — and the runner's collision guard proves
 * it on the emitted SVG rather than on the intention.
 */
const fdiBands = () => {
  const title = `${NORVELL.name} builds a plant in ${TAMIRA.name}`;
  const bands = [
    { head: 'Why the firm comes', fill: 'rgba(59,130,246,0.10)', stroke: BLUE, lines: [
      'A market it can sell into, and one it can export from',
      `Costs it cannot get at home, and a plant sized for ${(NORVELL.jobs).toLocaleString('en-GB')} workers`,
    ] },
    { head: 'What it puts in', fill: 'rgba(245,158,11,0.10)', stroke: AMBER, lines: [
      `$${NORVELL.capital / 1_000_000}m of capital: the plant, the machines, the land`,
      `Ownership and control — which is what makes it DIRECT investment`,
    ] },
    { head: `What ${TAMIRA.name} gets, and what it does not`, fill: 'rgba(5,150,105,0.10)', stroke: GREEN, lines: [
      `${(NORVELL.jobs).toLocaleString('en-GB')} jobs at $${NORVELL.wage.toLocaleString('en-GB')}, so $${NORVELL.wageBill / 1_000_000}m of wages`,
      `$${NORVELL.suppliers / 1_000_000}m a year to local suppliers`,
      `$${NORVELL.revenue / 1_000_000}m of tax — before any of it is moved`,
    ] },
  ];
  const x0 = 20, w = 400, lead = 17, pad = 12;
  let y = 74 + titleDepth(title);
  const parts = [];
  for (const b of bands) {
    const wrapped = b.lines.flatMap((l) => wrapLines(l, { size: MIN_FACE, maxWidth: w - 2 * pad }));
    const h = r2(pad + 18 + wrapped.length * lead + pad - 6);
    parts.push(fillBox(x0, r2(y), w, h, b.fill), box(x0, r2(y), w, h, b.stroke));
    parts.push(t(r2(x0 + pad), r2(y + pad + 10), b.head, { size: 12.5, fill: b.stroke, weight: 600 }));
    parts.push(wrapped.map((l, i) => t(r2(x0 + pad + i * 0.01), r2(y + pad + 28 + i * lead), l, { size: MIN_FACE, fill: INK })).join(''));
    y = r2(y + h);
    if (b !== bands[bands.length - 1]) {
      parts.push(line(r2(x0 + w / 2), r2(y + 4), r2(x0 + w / 2), r2(y + 20), AXIS, 2));
      parts.push(poly([[r2(x0 + w / 2 - 5), r2(y + 18)], [r2(x0 + w / 2 + 5), r2(y + 18)], [r2(x0 + w / 2), r2(y + 26)]], AXIS));
      y = r2(y + 30);
    }
  }
  return [open(r2(y + 16)), titleSvg(title), parts.join(''), close].join('');
};

export const fdiDiagram = {
  id: id('diagram', 'fdi by a tnc'),
  title: 'FDI by a TNC: What Goes In and What Comes Out',
  checklist: [
    'Three stages in order: why the firm comes, what it puts in, what the host receives.',
    'The capital figure labelled as the investment, not as the benefit.',
    'The host\'s receipts separated into wages, supplier orders and tax.',
    'Ownership and control marked on the investment, which is what makes it direct.',
  ],
  caption: 'Foreign direct investment buys productive assets and the control of them. The impact on the recipient country is the wages, the orders and the tax — and each of the three can be smaller than it looks.',
  svg: fdiBands(),
};

/* ══ 4 · THE PRICE FALL AND THE CONSUMER-SURPLUS GAIN (3a-4) ══════════════ */

/*
 * THE ONE DIAGRAM IN THIS SECTION A STUDENT MAY BE ASKED TO DRAW. `Draw (4)` is an Economics
 * command word and this is the topic's only quantitative leaf, so the practice item that asks for
 * it is answered by reproducing this: a demand curve, two prices, and the area between them.
 * Every coordinate is `DEVICE.qAt` and nothing is placed by eye.
 */
const surplusSvg = () => {
  const D = DEVICE;
  const title = 'Consumer surplus when the price falls';
  const top = 92 + titleDepth(title), bottom = 300, left = 62, right = 400;
  const qMax = 300_000, pMax = 200;
  const xFor = (q) => r2(left + (q / qMax) * (right - left));
  const yFor = (p) => r2(bottom - (p / pMax) * (bottom - top));
  const dEnd = D.qAt(0) > qMax ? { q: qMax, p: (D.intercept - qMax) / D.slope } : { q: D.qAt(0), p: 0 };
  const xB = xFor(D.qBefore), xA = xFor(D.qAfter);
  const yHigh = yFor(D.homePrice), yLow = yFor(D.openPrice);
  const caption = `Blue: the surplus buyers already had at $${D.homePrice}, $${D.csBefore / 1_000_000}m. Green: the gain when the price falls to $${D.openPrice} — $${D.toExisting / 1_000_000}m to the ${D.qBefore / 1000}k already buying, plus $${D.toNew / 1_000_000}m to the ${(D.qAfter - D.qBefore) / 1000}k who could not afford one before. Total surplus $${D.csAfter / 1_000_000}m.`;
  const capLines = wrapLines(caption, { size: MIN_FACE, maxWidth: GRD.right - GRD.x0 }).length;
  return [open(r2(bottom + 52 + capLines * 16 + 8)), titleSvg(title),
    /* the gain: the rectangle to existing buyers plus the triangle to new ones */
    poly([[left, yHigh], [xB, yHigh], [xA, yLow], [left, yLow]], 'rgba(5,150,105,0.18)'),
    /* the surplus that already existed, above the old price */
    poly([[left, yFor(D.choke)], [left, yHigh], [xB, yHigh]], 'rgba(59,130,246,0.18)'),
    line(left, top, left, bottom, AXIS, 1.5), line(left, bottom, right, bottom, AXIS, 1.5),
    line(left, yFor(D.choke), xFor(dEnd.q), yFor(dEnd.p), RED, 2.5),
    line(left, yHigh, xB, yHigh, AXIS, 1.2, ' stroke-dasharray="3 3"'),
    line(xB, yHigh, xB, bottom, AXIS, 1.2, ' stroke-dasharray="3 3"'),
    line(left, yLow, xA, yLow, AXIS, 1.2, ' stroke-dasharray="3 3"'),
    line(xA, yLow, xA, bottom, AXIS, 1.2, ' stroke-dasharray="3 3"'),
    t(r2(left - 8), r2(yHigh + 4), `$${D.homePrice}`, { size: MIN_FACE, fill: AXIS, anchor: 'end' }),
    t(r2(left - 8), r2(yLow + 4), `$${D.openPrice}`, { size: MIN_FACE, fill: AXIS, anchor: 'end' }),
    t(xB, r2(bottom + 18), `${D.qBefore / 1000}k`, { size: MIN_FACE, fill: AXIS, anchor: 'middle' }),
    t(xA, r2(bottom + 18), `${D.qAfter / 1000}k`, { size: MIN_FACE, fill: AXIS, anchor: 'middle' }),
    place(xFor(dEnd.q), r2(yFor(dEnd.p) - 2), 'D', RED),
    t(r2(left - 8), r2(top + 4), '$', { size: MIN_FACE, fill: AXIS, anchor: 'end' }),
    /* The axis name sits a row BELOW the two quantity ticks: at 390px "260k" and "devices" were
     * 30 units into each other, which the collision guard reported and no eye would have. */
    t(r2(right), r2(bottom + 34), 'devices', { size: MIN_FACE, fill: AXIS, anchor: 'end' }),
    wrap(GRD.x0, r2(bottom + 52), caption, { size: MIN_FACE, maxWidth: GRD.right - GRD.x0, lead: 16 }),
    close].join('');
};

export const surplusDiagram = {
  id: id('diagram', 'consumer surplus when the price falls'),
  title: 'Lower Prices and Higher Consumer Surplus',
  checklist: [
    'Price on the vertical axis, quantity on the horizontal, and a downward-sloping demand curve.',
    'Both prices drawn as horizontal lines, each dropped to its own quantity.',
    'The original surplus shaded between the curve and the higher price.',
    'The gain shaded as the rectangle to existing buyers PLUS the triangle to new ones.',
  ],
  caption: 'Consumer surplus is the difference between what buyers would have paid and what they do pay. A price fall raises it twice over: everybody already buying pays less, and people who were priced out start buying.',
  svg: surplusSvg(),
};

/* ══ 5 · THE SAME PROFIT, DECLARED IN TWO PLACES (3b-4) ═══════════════════ */

/*
 * BARS ON SEPARATE ROWS, NOT TWO COLUMNS. The comparison is between two tax bills, so the drawing
 * is two bars whose lengths are the bills — and the missing $5m is the difference in length, which
 * is the only part of this leaf a student has to see rather than be told.
 */
const transferSvg = () => {
  const N = NORVELL;
  const title = 'The same profit, taxed in two places';
  const x0 = 150, maxW = 200;
  const scale = (v) => r2((v / N.profitTax) * maxW);
  const top = 86 + titleDepth(title);
  const rows = [
    { label: 'All in Tamira', value: N.profitTax, fill: GREEN, note: `${N.taxRate}% of $${N.profit / 1_000_000}m` },
    { label: 'After the fee', value: N.groupTax, fill: RED, note: `$${N.taxHome / 1_000_000}m + $${N.taxAway / 1_000_000}m` },
  ];
  const parts = [];
  rows.forEach((r, i) => {
    const y = r2(top + i * 52);
    parts.push(t(GRD.x0, r2(y + 15), r.label, { size: MIN_FACE, fill: INK, weight: 600 }));
    parts.push(fillBox(x0, y, scale(r.value), 22, r.fill));
    parts.push(t(r2(x0 + scale(r.value) + 8), r2(y + 16), `$${r.value / 1_000_000}m`, { size: MIN_FACE, fill: r.fill, weight: 600 }));
    parts.push(t(GRD.x0, r2(y + 33), r.note, { size: MIN_FACE, fill: MUTED }));
  });
  const gapY = r2(top + 2 * 52 + 14);
  parts.push(line(r2(x0 + scale(N.groupTax)), r2(top + 52), r2(x0 + scale(N.groupTax)), r2(top + 52 + 22), MUTED, 1, ' stroke-dasharray="3 3"'));
  return [open(r2(gapY + 84)), titleSvg(title), parts.join(''),
    wrap(GRD.x0, gapY, `A licence fee of $${N.licence / 1_000_000}m is charged to the Tamiran plant by another part of the same group, in a country taxing profit at ${N.lowRate}%. Tamira now taxes $${N.shiftedHome / 1_000_000}m instead of $${N.profit / 1_000_000}m. Nothing was made anywhere else and nothing moved except the paperwork; Tamira is $${N.revenueLost / 1_000_000}m short.`, { size: MIN_FACE, maxWidth: GRD.right - GRD.x0, lead: 16 }),
    close].join('');
};

export const transferDiagram = {
  id: id('diagram', 'transfer pricing'),
  title: 'Loss of Tax Revenue from Transfer Pricing',
  checklist: [
    'Two bars, one tax bill each, drawn to the same scale so the shortfall is a length.',
    'The rate and the profit it applies to written beside each bar.',
    'The fee shown as a payment between two parts of one firm, not to a third party.',
    'The difference between the two bills named as the revenue the host loses.',
  ],
  caption: 'Transfer pricing is the price one part of a firm charges another for goods or services. Set high enough, it moves the profit to wherever the tax is lowest without moving the production.',
  svg: transferSvg(),
};

export const DIAGRAMS = [opennessDiagram, causesDiagram, fdiDiagram, surplusDiagram, transferDiagram];
