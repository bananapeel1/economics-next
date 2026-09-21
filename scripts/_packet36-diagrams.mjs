/**
 * PACKET 36 — managing-finance: FIVE diagrams, one pinned to each chapter, from ZERO.
 *
 * `structure-06` is the finding — *"zero diagrams for a section that is naturally visual: a revenue
 * → gross profit → operating profit → profit for the year waterfall, and a working capital cycle.
 * Flashcards already contain a working-capital-cycle chain that has no counterpart in content[]"* —
 * and `topFix-05` repeats it. Both are right, and both are answered with more than the two they ask
 * for, because three of this topic's hardest ideas are each a picture:
 *
 *   - **A profit is a REMAINDER, and there are three of them.** The waterfall is the only surface in
 *     the schema that shows the same bar being cut three times, which is what a ladder of
 *     subtractions actually is. Every bar's height is `FIRM.grossProfit` and the rest; nothing is
 *     drawn to look right.
 *   - **Working capital is a CYCLE, so money is somewhere in it at all times.** Prose can say that
 *     ${days} of inventory and ${days} of receivables tie money up; only the loop shows that the
 *     firm is funding all of it simultaneously, every day it trades.
 *   - **The four ways to improve liquidity have four different SIGNATURES.** That is a grid, and a
 *     declared table is the one surface that carries a grid and offers the full-screen sheet a
 *     student needs to read it on a phone.
 *
 * NOTHING IS DRAWN BY HAND, which is packet 29's lesson: three of its five live diagrams were wrong
 * because the shape was drawn and the figures beside it were typed in. Every bar height, every cell
 * and every percentage here is computed from `_packet36-util.mjs` by the same functions the content
 * module prints from, and the runner counts the waterfall's figures back OUT of the emitted SVG and
 * re-derives each one.
 *
 * THE FRAME IS 440 UNITS. `diagram.table-legible` scales the smallest face by 620/viewBoxWidth, so
 * at 440 a 10-unit cell renders 14.1px in the reading column — comfortably clear of the rule, where
 * the 560-unit frame packets 20-28 used gives 11.1px and fires. The phone is what forced it: Verify
 * B measured an inline Learn Mode diagram at 313 CSS px, where 11 units is 6.2px. `MIN_FACE` is 12
 * and the runner asserts nothing is emitted below it.
 */
import { id, money, pct, ratio, days, round2, FIRM } from './_packet36-util.mjs';

const F = FIRM;

const INK = '#e8ecf5', AXIS = '#94a3b8', GRID = '#475569', MUTED = '#7a8299';
const BLUE = '#3b82f6', GREEN = '#059669', RED = '#ef4444', AMBER = '#f59e0b', PURPLE = '#8b5cf6';

export const r2 = round2;

const open = (h = 400, w = 440) => `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',system-ui,sans-serif;background:transparent">`;
const close = '</svg>';
const t = (x, y, text, { size = 12, fill = INK, anchor = 'start', weight = 400 } = {}) =>
  `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${text}</text>`;
const line = (x1, y1, x2, y2, stroke, w = 2, extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${w}"${extra}/>`;
const fillBox = (x, y, w, h, fill, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${fill}"${extra}/>`;
const strokeBox = (x, y, w, h, stroke, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="none" stroke="${stroke}" stroke-width="1.5"${extra}/>`;

export const GRD = { w: 440, x0: 20, y0: 74, rowH: 28, right: 420, size: 12, gutter: 12 };
/** The smallest face any diagram in this section may emit, in viewBox units. */
export const MIN_FACE = 12;
export const TBL = { w: 440, x0: 18, y0: 74, rowH: 26, right: 422, size: 10, gutter: 10, note: 10 };

/*
 * Packet 24's browser-measured bound, carried unchanged since: at the reading column four characters
 * or more reach 0.601 em and a lone character 0.874 em, rounded up to 0.7 and 0.9. It is an
 * ESTIMATE; the independent measurement is Verify B's `getComputedTextLength()`.
 */
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

/*
 * Each wrapped line is emitted one hundredth of a unit further right, so a multi-line caption cannot
 * be read as a grid by `diagram.table-kind` (packet 24). The same trick is used for every repeated
 * row label below, for the same reason.
 */
const wrap = (x, y, text, { size = MIN_FACE, fill = MUTED, lead = 15, maxWidth = GRD.right - GRD.x0 } = {}) =>
  wrapLines(text, { size, maxWidth }).map((l, i) => t(r2(x + i * 0.01), r2(y + i * lead), l, { size, fill })).join('');

const titleSvg = (text, { x = GRD.x0, y = 28, size = 13, lead = 16 } = {}) =>
  wrapLines(text, { size, maxWidth: GRD.right - x }).map((l, i) => t(r2(x + i * 0.6), r2(y + i * lead), l, { size, weight: 600 })).join('');
const titleDepth = (text, { size = 13, lead = 16 } = {}) => (wrapLines(text, { size, maxWidth: GRD.right - GRD.x0 }).length - 1) * lead;

/** A label that cannot be placed off-frame: the placement asks the same `estWidth` the check asks. */
const place = (x, y, text, colour, { size = MIN_FACE, gap = 8, weight = 600 } = {}) => {
  const w = estWidth(text, size);
  if (x + gap + w <= GRD.right) return t(r2(x + gap), r2(y), text, { size, fill: colour, weight });
  if (x - gap - w >= GRD.x0) return t(r2(x - gap), r2(y), text, { size, fill: colour, weight, anchor: 'end' });
  return t(r2(Math.max(GRD.x0, Math.min(x, GRD.right - w))), r2(y), text, { size, fill: colour, weight });
};

/* ── the shared reference table: columns computed from the cells, and a bad fit THROWS ── */
export const gridColumns = ({ title, headers, rows, size = TBL.size }) => {
  const n = headers.length;
  const widths = headers.map((h, c) => Math.max(estWidth(h, size), ...rows.map((r) => estWidth(r[c] ?? '', size))));
  const needed = widths.reduce((a, b) => a + b, 0) + TBL.gutter * (n - 1);
  const avail = TBL.right - TBL.x0;
  if (needed > avail) {
    const widest = rows.concat([headers]).flatMap((r) => r.map((cell, c) => ({ cell, c }))).sort((a, b) => estWidth(b.cell, size) - estWidth(a.cell, size))[0];
    throw new Error(`grid "${title}" needs ${r2(needed)} units and the frame gives ${avail}. Shorten column ${widest.c + 1}, starting with "${widest.cell}".`);
  }
  const slack = n > 1 ? (avail - needed) / (n - 1) : 0;
  const lefts = [];
  let x = TBL.x0;
  for (let c = 0; c < n; c += 1) { lefts.push(r2(x)); x += widths[c] + TBL.gutter + slack; }
  return lefts;
};

const tblRowY = (i) => r2(TBL.y0 + (i + 1) * TBL.rowH);

export const gridSvg = ({ title, note, headers, rows, colours = [], size = TBL.size }) => {
  const cols = gridColumns({ title, headers, rows, size });
  const noteOpts = { size: Math.max(TBL.note, size === TBL.size ? TBL.note : MIN_FACE), maxWidth: TBL.right - TBL.x0 };
  const titleLines = wrapLines(title, { size: 12, maxWidth: TBL.right - TBL.x0 });
  const head = headers.map((h, c) => t(cols[c], TBL.y0, h, { size, fill: AXIS, weight: 600 })).join('');
  const body = rows.map((cells, i) => [
    ...cells.map((cell, c) => t(cols[c], tblRowY(i), cell, { size, fill: c === 0 ? INK : (colours[i]?.[c] || INK), weight: c === 0 ? 600 : 400 })),
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

/* ══ 1 · Profit — the waterfall ═══════════════════════════════════════════ */

/*
 * THE BARS ARE THE ARITHMETIC. Each one's height is `value / revenue` of the plot area, so the
 * picture cannot disagree with the statement: gross profit is 35% of the first bar's height because
 * it is 35% of the revenue. The runner reads the four figures back out of the emitted SVG and
 * re-derives each from `FIRM`.
 *
 * THE VERTICAL BUDGET, WRITTEN DOWN (packet 29): a 168-unit plot under a title that may wrap, bar
 * labels 16 units below the baseline on two staggered lines so two adjacent labels cannot collide,
 * the deduction arrows inside the plot, and the caption 30 units below the lowest thing drawn.
 */
const WF = { x0: 26, yTop: 74, yBot: 242, barW: 62, gap: 30 };

const waterfallSvg = () => {
  const title = 'One bar, cut three times: the profit ladder';
  const top = WF.yTop + titleDepth(title);
  const bot = WF.yBot + titleDepth(title);
  const scale = (v) => ((v / F.revenue) * (bot - top));
  const bars = [
    ['Revenue', F.revenue, BLUE],
    ['Gross', F.grossProfit, GREEN],
    ['Operating', F.operatingProfit, AMBER],
    ['For the year', F.profitForYear, PURPLE],
  ];
  const cuts = [
    ['less cost of sales', F.costOfSales],
    ['less operating expenses', F.operatingExpenses],
    ['less interest', F.interest],
  ];

  const body = bars.map(([label, value, colour], i) => {
    const x = WF.x0 + i * (WF.barW + WF.gap);
    const h = scale(value);
    const y = r2(bot - h);
    return [
      fillBox(r2(x), y, WF.barW, r2(h), colour, ' opacity="0.85"'),
      t(r2(x + WF.barW / 2 + i * 0.01), r2(bot + 18), label, { size: MIN_FACE, fill: AXIS, anchor: 'middle', weight: 600 }),
      t(r2(x + WF.barW / 2 + i * 0.02), r2(bot + 34), money(value), { size: MIN_FACE, fill: colour, anchor: 'middle', weight: 600 }),
    ].join('');
  }).join('');

  /* the three deductions, each drawn as the slice removed between one bar and the next */
  const cutSvg = cuts.map(([label, value], i) => {
    const xFrom = WF.x0 + i * (WF.barW + WF.gap) + WF.barW;
    const xTo = xFrom + WF.gap;
    const yFrom = r2(bot - scale(bars[i][1]));
    const yTo = r2(bot - scale(bars[i + 1][1]));
    return [
      line(r2(xFrom), yFrom, r2(xTo), yFrom, RED, 1, ' stroke-dasharray="3 3" opacity="0.7"'),
      line(r2(xTo), yFrom, r2(xTo), yTo, RED, 1.5),
      place(r2(xTo), r2((yFrom + yTo) / 2 - 4), money(value), RED, { size: MIN_FACE }),
    ].join('');
  }).join('');

  const legend = cuts.map(([label, value], i) => t(r2(WF.x0 + i * 0.01), r2(bot + 56 + i * 15), `Step ${i + 1}: ${label}, ${money(value)}`, { size: MIN_FACE, fill: MUTED })).join('');

  const note = `Each bar is what is left after one more deduction, drawn to scale against revenue of ${money(F.revenue)}. Gross profit of ${money(F.grossProfit)} is ${pct(F.gpm)} of the first bar, operating profit ${pct(F.opm)}, profit for the year ${pct(F.npm)}. Read the gaps rather than the bars: the widest is the cost of the tiles themselves, the second is what running the business costs, and the narrowest is the ${money(F.interest)} of interest that separates the last two rungs. The specification's own statement at Appendix 9 stops there — there is no tax step.`;
  const noteLines = wrapLines(note, { size: MIN_FACE }).length;
  const h = r2(bot + 108 + noteLines * 15);

  return [open(h, GRD.w),
    titleSvg(title),
    line(WF.x0 - 6, r2(bot), r2(WF.x0 + 4 * WF.barW + 3 * WF.gap + 6), r2(bot), AXIS, 1.5),
    body, cutSvg, legend,
    wrap(GRD.x0, r2(bot + 100), note, { size: MIN_FACE }),
    close].join('');
};

const incomeStatementView = () => gridSvg({
  title: 'Statement of comprehensive income, in Appendix 9\'s order',
  headers: ['Line', 'Amount', 'What it is'],
  rows: [
    ['Revenue', money(F.revenue), 'What builders paid'],
    ['Cost of sales', money(F.costOfSales), 'The tiles sold'],
    ['Gross profit', money(F.grossProfit), pct(F.gpm) + ' of revenue'],
    ['Op. expenses', money(F.operatingExpenses), 'Running the firm'],
    ['Operating profit', money(F.operatingProfit), pct(F.opm) + ' of revenue'],
    ['Interest', money(F.interest), 'Cost of the loan'],
    ['For the year', money(F.profitForYear), pct(F.npm) + ' of revenue'],
  ],
  note: `The order is the calculation: each profit line is the one above it less the deduction above that. A data table giving no interest figure can support the operating profit and no further, which is the single most common way a Calculate question is lost. Appendix 9 prints this statement and Appendix 8 settles its vocabulary, because the paper uses International Accounting Standards terms.`,
});

export const profitDiagram = {
  id: id('diagram', 'the profit ladder waterfall'),
  title: 'The Profit Ladder',
  description: 'IAL 2.3.3 · 1a and 1c: revenue cut three times into gross profit, operating profit and profit for the year, drawn to scale and set beside the statement that produces them.',
  checklist: [
    'Revenue on the left, each later bar shorter than the one before it',
    `The three deductions labelled: cost of sales, other operating expenses, interest`,
    `Gross profit ${money(F.grossProfit)}, operating profit ${money(F.operatingProfit)}, profit for the year ${money(F.profitForYear)}`,
    'No tax step, because the specification\'s own statement has none',
  ],
  scenarios: [
    { label: 'The waterfall', svg: waterfallSvg() },
  ],
};

export const incomeStatementDiagram = {
  id: id('diagram', 'statement of comprehensive income table'),
  kind: 'table',
  title: 'The Statement Itself',
  description: 'IAL 2.3.3 · 1c: the statement of comprehensive income line by line, with each profit as a share of revenue.',
  scenarios: [
    { label: 'Line by line', svg: incomeStatementView() },
  ],
};

/* ══ 2 · Profitability — the three margins, and what a price cut does ══════ */

const marginsView = () => gridSvg({
  title: 'Three margins, and the gap each one measures',
  headers: ['Margin', 'Value', 'Gap below it'],
  rows: [
    ['Gross', pct(F.gpm), 'Overheads ' + pct(F.gpm - F.opm)],
    ['Operating', pct(F.opm), 'Interest ' + pct(F.opm - F.npm)],
    ['For the year', pct(F.npm), 'Nothing left'],
  ],
  note: `Every margin has revenue underneath it, so the three are directly comparable and the distance between them is what each set of costs takes. The first gap is the ${money(F.operatingExpenses)} of other operating expenses and the second is the ${money(F.interest)} of interest — which is why the operating margin is the fair one for comparing two firms and the last one is not. An answer that says which gap moved has said something a single profit figure cannot.`,
});

const priceCutView = () => gridSvg({
  title: `A ${pct(F.priceCut)} price cut, with the same tiles sold`,
  headers: ['Line', 'Before', 'After'],
  rows: [
    ['Revenue', money(F.revenue), money(F.competitionRevenue)],
    ['Cost of sales', money(F.costOfSales), money(F.costOfSales)],
    ['Op. expenses', money(F.operatingExpenses), money(F.operatingExpenses)],
    ['Operating profit', money(F.operatingProfit), money(F.competitionProfit)],
    ['Operating margin', pct(F.opm), pct(F.marginOn(F.competitionProfit, F.competitionRevenue))],
  ],
  colours: [[], [], [], [INK, INK, RED], [INK, INK, RED]],
  note: `Only one line moved, and the whole of the movement landed on the profit. That is the property of a price change that no other lever has: nothing the firm pays out falls alongside it. A twentieth off the price has taken half the operating profit — which is why a price war closes businesses faster than a downturn, and why "just discount to keep the customer" is the most expensive sentence in the topic.`,
});

export const profitabilityDiagram = {
  id: id('diagram', 'three margins and a price cut'),
  kind: 'table',
  title: 'Measuring Profitability',
  description: 'IAL 2.3.3 · 1c: the three margins with the gap each one measures, and what a five per cent price cut does to the operating line.',
  scenarios: [
    { label: 'The three margins', svg: marginsView() },
    { label: 'What a price cut costs', svg: priceCutView() },
  ],
};

/* ══ 3 · Cash and the statement of financial position ═════════════════════ */

/*
 * THE LABELLED STATEMENT IS WHAT `specGap-04` AND `topFix-03` ASK FOR BY NAME — "a labelled mini
 * example students can extract current assets and current liabilities from". It is drawn rather
 * than tabulated so the two totals can be RINGED, because the skill being taught is which lines to
 * take and which to leave, and a table cannot show a boundary.
 */
const SFP = { x0: 22, colW: 194, gap: 12, yTop: 74, rowH: 21 };

const sfpSvg = () => {
  const title = 'Which lines the liquidity ratios use, and which they ignore';
  const top = SFP.yTop + titleDepth(title);
  const left = SFP.x0;
  const right = SFP.x0 + SFP.colW + SFP.gap;

  const column = (x, heading, rows, total, colour, wanted) => {
    const headY = r2(top);
    const out = [t(r2(x + 0.3), headY, heading, { size: MIN_FACE, fill: colour, weight: 600 })];
    rows.forEach(([label, value], i) => {
      const y = r2(top + 20 + i * SFP.rowH);
      out.push(t(r2(x + 4 + i * 0.01), y, label, { size: MIN_FACE, fill: wanted ? INK : MUTED }));
      out.push(t(r2(x + SFP.colW - 4 + i * 0.01), y, value, { size: MIN_FACE, fill: wanted ? INK : MUTED, anchor: 'end' }));
    });
    const totalY = r2(top + 20 + rows.length * SFP.rowH + 6);
    out.push(line(r2(x), r2(totalY - 12), r2(x + SFP.colW), r2(totalY - 12), colour, 1));
    out.push(t(r2(x + 4), totalY, wanted ? 'Total' : 'Ignored here', { size: MIN_FACE, fill: colour, weight: 600 }));
    out.push(t(r2(x + SFP.colW - 4), totalY, total, { size: MIN_FACE, fill: colour, anchor: 'end', weight: 600 }));
    if (wanted) out.push(strokeBox(r2(x - 4), r2(top + 8), SFP.colW + 8, r2(totalY - top - 2), colour, ' stroke-dasharray="4 3"'));
    return { svg: out.join(''), bottom: totalY };
  };

  const ca = column(left, 'Current assets', [
    ['Inventory', money(F.inventory)],
    ['Trade receivables', money(F.receivables)],
    ['Cash', money(F.cash)],
  ], money(F.currentAssets), GREEN, true);

  const cl = column(right, 'Current liabilities', [
    ['Trade payables', money(F.payables)],
    ['Bank overdraft', money(F.overdraft)],
    ['Other payables', money(F.otherPayables)],
  ], money(F.currentLiabilities), AMBER, true);

  const nc = column(left, 'Non-current', [
    ['Assets: warehouse etc.', money(F.nonCurrentAssets)],
    ['Liabilities: bank loan', money(F.loan)],
  ], money(F.nonCurrentAssets - F.loan), MUTED, false);

  const ncTop = Math.max(ca.bottom, cl.bottom) + 26;
  const ncShift = ncTop - top;
  const ncSvg = nc.svg.replace(/y="([\d.]+)"/g, (m, y) => `y="${r2(parseFloat(y) + ncShift)}"`)
    .replace(/y1="([\d.]+)"/g, (m, y) => `y1="${r2(parseFloat(y) + ncShift)}"`)
    .replace(/y2="([\d.]+)"/g, (m, y) => `y2="${r2(parseFloat(y) + ncShift)}"`);

  /*
   * THE TWO FORMULAE ARE WRAPPED RATHER THAN SHRUNK. The acid test written out in full is 445 units
   * at the 12-unit floor on a 440-unit frame — the extent check caught it — and the answer is not a
   * smaller face, because 12 units is already 8.5px on the phone Verify B measures. It is two lines,
   * emitted a hundredth of a unit apart so the pair cannot be read as a grid row.
   */
  const ratiosY = r2(nc.bottom + ncShift + 30);
  const ratios = [
    t(r2(SFP.x0), ratiosY, `Current ratio = ${money(F.currentAssets)} ÷ ${money(F.currentLiabilities)}`, { size: MIN_FACE, fill: GREEN, weight: 600 }),
    t(r2(SFP.x0 + 0.01), r2(ratiosY + 17), `= ${ratio(F.currentRatio)}`, { size: MIN_FACE, fill: GREEN, weight: 600 }),
    t(r2(SFP.x0 + 0.02), r2(ratiosY + 40), `Acid test = (${money(F.currentAssets)} − ${money(F.inventory)}) ÷ ${money(F.currentLiabilities)}`, { size: MIN_FACE, fill: AMBER, weight: 600 }),
    t(r2(SFP.x0 + 0.03), r2(ratiosY + 57), `= ${ratio(F.acidTest)}`, { size: MIN_FACE, fill: AMBER, weight: 600 }),
  ].join('');

  const note = `Both ratios are built from the two ringed totals and from nothing else. The ${money(F.nonCurrentAssets)} warehouse and the ${money(F.loan)} loan are greyed out because neither becomes cash or falls due within the year — including them gives ${ratio((F.currentAssets + F.nonCurrentAssets) / (F.currentLiabilities + F.loan))}, which answers no question in this topic. The acid test then removes one further line, the ${money(F.inventory)} of inventory, because tiles still have to find a buyer before they settle anything.`;
  const noteLines = wrapLines(note, { size: MIN_FACE }).length;
  const h = r2(ratiosY + 90 + noteLines * 15);

  return [open(h, GRD.w), titleSvg(title), ca.svg, cl.svg, ncSvg, ratios,
    wrap(GRD.x0, r2(ratiosY + 86), note, { size: MIN_FACE }), close].join('');
};

/*
 * THE CYCLE IS A LOOP AND IT IS DRAWN AS ONE. `structure-06` notes that the flashcards already
 * carry a working-capital-cycle chain with nothing in `content[]` to match it. A loop rather than a
 * row of boxes, because the whole point is that the firm is funding every stage at once.
 */
const cycleSvg = () => {
  const title = 'The working capital cycle: where the money is, all the time';
  const top = 86 + titleDepth(title);
  const cx = 220, cy = top + 88, rx = 138, ry = 78;
  const nodes = [
    ['Cash', money(F.cash), 0, BLUE],
    ['Inventory', `${money(F.inventory)}, ${days(F.inventoryDays)}`, 1, AMBER],
    ['Trade receivables', `${money(F.receivables)}, ${days(F.receivableDays)}`, 2, GREEN],
  ];
  const at = (k) => {
    const a = -Math.PI / 2 + (k * 2 * Math.PI) / 3;
    return [r2(cx + rx * Math.cos(a)), r2(cy + ry * Math.sin(a))];
  };
  const ring = `<ellipse cx="${cx}" cy="${r2(cy)}" rx="${rx}" ry="${ry}" fill="none" stroke="${GRID}" stroke-width="1.5" stroke-dasharray="5 4"/>`;
  const arrows = [0, 1, 2].map((k) => {
    const a = -Math.PI / 2 + ((k + 0.5) * 2 * Math.PI) / 3;
    const x = r2(cx + rx * Math.cos(a)), y = r2(cy + ry * Math.sin(a));
    return `<circle cx="${x}" cy="${y}" r="3" fill="${GRID}"/>`;
  }).join('');
  const marks = nodes.map(([label, sub, k, colour], i) => {
    const [x, y] = at(k);
    return [
      `<circle cx="${x}" cy="${y}" r="5" fill="${colour}"/>`,
      t(r2(x + i * 0.01), r2(y - 14), label, { size: MIN_FACE, fill: colour, anchor: 'middle', weight: 600 }),
      t(r2(x + i * 0.02), r2(y + 22), sub, { size: MIN_FACE, fill: MUTED, anchor: 'middle' }),
    ].join('');
  }).join('');
  const centre = [
    t(cx, r2(cy - 6), `${days(F.inventoryDays + F.receivableDays)}`, { size: 15, fill: INK, anchor: 'middle', weight: 600 }),
    t(r2(cx + 0.01), r2(cy + 12), 'one full turn', { size: MIN_FACE, fill: MUTED, anchor: 'middle' }),
  ].join('');
  const note = `Cash buys tiles, tiles are sold on credit, builders pay, and the money is cash again. ${F.name} pays its own suppliers in about ${days(F.payableDays)}, so it funds the difference between that and the ${days(F.inventoryDays + F.receivableDays)} out of its own pocket on every turn — and because turns overlap, it is funding all three stages at once, every day it trades. Shorten any stage and cash is released: cutting inventory cover to ${days(F.jitDays)} frees ${money(F.jitReleased)}.`;
  const noteLines = wrapLines(note, { size: MIN_FACE }).length;
  const bottom = r2(cy + ry + 40);
  const h = r2(bottom + 12 + noteLines * 15);
  return [open(h, GRD.w), titleSvg(title), ring, arrows, marks, centre,
    wrap(GRD.x0, bottom, note, { size: MIN_FACE }), close].join('');
};

const cashBridgeView = () => gridSvg({
  title: `${money(F.profitForYear)} of profit, ${money(F.cashMovement)} of cash`,
  headers: ['What happened', 'Effect on cash'],
  rows: [
    ['Profit for the year', money(F.profitForYear)],
    ['Inventory bought, unsold', money(-F.inventoryRise)],
    ['Sold on credit', money(-F.receivableRise)],
    ['Suppliers paid later', money(F.payableRise)],
    ['Forklift bought outright', money(-F.assetBought)],
    ['Loan repaid', money(-F.loanRepaid)],
    ['Movement in the year', money(F.cashMovement)],
  ],
  note: `Nothing here is an error and nothing is hidden. Three of these six lines move cash without touching the statement of comprehensive income at all: buying an asset, repaying borrowed money, and paying suppliers later. A business can therefore report a healthy profit and end the year with ${money(F.cash)} in the bank against ${money(F.currentLiabilities)} falling due, which is the ordinary way a growing firm fails.`,
});

/*
 * DECLARED AS A TABLE, AND THE REASON IS THE PHONE RATHER THAN THE SHAPE. The first scenario is a
 * statement of financial position, which is a grid however it is drawn: eight labelled figures in
 * two columns. `diagram.table-kind` reports exactly that, and `kind: 'table'` is what answers it —
 * it also buys the student the full-screen sheet, which packet 31 measured as the only thing that
 * makes a grid of figures readable at 390px. The cycle travels with it because the two belong to
 * one chapter and one pin, and the sheet helps it too.
 */
export const cashDiagram = {
  id: id('diagram', 'statement of financial position and the cycle'),
  kind: 'table',
  title: 'What the Business Holds and Owes',
  description: 'IAL 2.3.3 · 2b and 2c: a labelled statement of financial position with the two totals the ratios are built from and the non-current lines greyed out, and the working capital cycle drawn as the loop it is.',
  scenarios: [
    { label: 'The statement, labelled', svg: sfpSvg() },
    { label: 'The working capital cycle', svg: cycleSvg() },
  ],
};

export const cashBridgeDiagram = {
  id: id('diagram', 'profit to cash reconciliation'),
  kind: 'table',
  title: 'Profit Against Cash',
  description: 'IAL 2.3.3 · 2a: the six things that stand between a year\'s profit and the movement in the bank balance.',
  scenarios: [
    { label: 'Profit to cash', svg: cashBridgeView() },
  ],
};

/* ══ 4 · Liquidity — the four ways, and their four signatures ═════════════ */

const movesView = () => gridSvg({
  title: 'Four ways to improve liquidity, four different signatures',
  headers: ['Move', 'Work. cap.', 'Current', 'Acid', 'Cash'],
  rows: [
    ['Now', money(F.workingCapital), ratio(F.currentRatio), ratio(F.acidTest), money(F.cash)],
    ['Sell asset', money(F.sellAsset.workingCapital), ratio(F.sellAsset.currentRatio), ratio(F.sellAsset.acidTest), money(F.sellAsset.cash)],
    ['Pay later', money(F.supplierCredit.workingCapital), ratio(F.supplierCredit.currentRatio), ratio(F.supplierCredit.acidTest), money(F.supplierCredit.cash)],
    ['Factoring', money(F.factoring.workingCapital), ratio(F.factoring.currentRatio), ratio(F.factoring.acidTest), money(F.factoring.cash)],
    ['Inventory JIT', money(F.jit.workingCapital), ratio(F.jit.currentRatio), ratio(F.jit.acidTest), money(F.jit.cash)],
  ],
  colours: [
    [],
    [INK, GREEN, GREEN, GREEN, GREEN],
    [INK, MUTED, RED, GREEN, GREEN],
    [INK, RED, RED, RED, GREEN],
    [INK, MUTED, MUTED, GREEN, GREEN],
  ],
  note: `Read the rows rather than the columns. Selling an asset is the only move that improves all four, and it costs capacity. Paying later moves the two ratios in OPPOSITE directions and does not touch working capital at all, because equal amounts were added to both sides of the subtraction — every ratio is dragged towards one to one. Factoring is the one that rescues the bank balance while very slightly worsening the measure of liquidity, since one quick asset became another minus the ${money(F.factorFee)} fee. Inventory JIT leaves the current ratio exactly where it was and is the largest single move on the acid test, because it shifts money from the one current asset that measure refuses to count into the one it counts first.`,
});

const ratioGapView = () => gridSvg({
  title: 'The same firm, two ratios, two verdicts',
  headers: ['Measure', 'Top line', 'Result'],
  rows: [
    ['Current ratio', money(F.currentAssets), ratio(F.currentRatio)],
    ['Acid test', money(F.currentAssets - F.inventory), ratio(F.acidTest)],
    ['The difference', money(F.inventory), days(F.inventoryDays)],
  ],
  note: `One number looks comfortable and the other does not, and the whole of the gap between them is ${money(F.inventory)} of tiles — about ${days(F.inventoryDays)} of cover. That is what the second measure exists to expose: how much of the firm's comfort depends on finding buyers. A wholesaler and a cash shop with identical current ratios can be in completely different positions, and only the acid test says so.`,
});

export const liquidityDiagram = {
  id: id('diagram', 'four ways to improve liquidity'),
  kind: 'table',
  title: 'Measuring and Improving Liquidity',
  description: 'IAL 2.3.3 · 2b: the gap between the current ratio and the acid test, and what each of the four ways the specification names does to working capital, to both ratios and to the bank balance.',
  scenarios: [
    { label: 'Two ratios, two verdicts', svg: ratioGapView() },
    { label: 'What each move does', svg: movesView() },
  ],
};

/* ══ 5 · Business failure — which line each cause lands on ════════════════ */

const causesView = () => gridSvg({
  title: 'Where each cause of failure lands on the statement',
  headers: ['Cause', 'Lands on', 'Operating profit'],
  rows: [
    ['Competition', 'Revenue', money(F.competitionProfit)],
    ['Market conditions', 'Revenue', money(F.demandProfit)],
    ['Poor marketing', 'Revenue', money(F.marketingProfit)],
    ['Supplier problems', 'Revenue', money(F.supplierProfit)],
    ['Exchange rates', 'Cost of sales', money(F.currencyProfit)],
    ['Poor quality', 'Cost of sales', money(F.qualityProfit)],
    ['Interest rates', 'Interest', money(F.operatingProfit)],
  ],
  colours: [
    [INK, INK, RED], [INK, INK, AMBER], [INK, INK, AMBER], [INK, INK, AMBER],
    [INK, INK, RED], [INK, INK, GREEN], [INK, INK, MUTED],
  ],
  note: `Every cause is a percentage applied to one line, and the last column is what the operating profit of ${money(F.operatingProfit)} becomes. Two things are worth carrying into an exam. The ${pct(F.priceCut)} price cut does more damage than the ${pct(F.demandFall)} fall in volume, twice its size, because no cost falls alongside a price. And interest rates are the only cause in the whole of 3b that leaves the operating profit untouched — the firm trades exactly as well as it did, and only the profit for the year moves, from ${money(F.profitForYear)} to ${money(F.rateProfitForYear)}.`,
});

const failureChainSvg = () => {
  const title = 'Why two identical firms meet the same shock and one closes';
  const top = 76 + titleDepth(title);
  const steps = [
    ['The shock', 'A supplier stops delivering for three weeks', GRID],
    ['The gap opens', `${money(F.supplierRevenueLost)} of revenue lost, every cost still owed`, AMBER],
    ['The cushion', `${money(F.cash)} of cash and a ${money(F.overdraft)} overdraft, decided months earlier`, BLUE],
    ['The closure', 'An invoice falls due and cannot be paid', RED],
  ];
  const boxH = 46, gap = 16;
  const body = steps.map(([head, text, colour], i) => {
    const y = r2(top + i * (boxH + gap));
    const lines = wrapLines(text, { size: MIN_FACE, maxWidth: 292 });
    return [
      strokeBox(GRD.x0, y, GRD.right - GRD.x0, boxH, colour),
      t(r2(GRD.x0 + 10 + i * 0.01), r2(y + 19), head, { size: MIN_FACE, fill: colour, weight: 600 }),
      lines.map((l, j) => t(r2(GRD.x0 + 10 + j * 0.01), r2(y + 34 + j * 13), l, { size: MIN_FACE, fill: MUTED })).join(''),
      i < steps.length - 1 ? line(r2(GRD.w / 2), r2(y + boxH), r2(GRD.w / 2), r2(y + boxH + gap), colour, 1.5) : '',
    ].join('');
  }).join('');
  const bottom = r2(top + steps.length * (boxH + gap) + 14);
  const note = `Only the third box is inside the firm's control, and it was settled long before the supplier failed. That is why every external cause at 2.3.3 · 3b is really a question about liquidity, and why an answer that stops at "the market turned" has given the half that every firm in the trade shares.`;
  const noteLines = wrapLines(note, { size: MIN_FACE }).length;
  return [open(r2(bottom + 12 + noteLines * 15), GRD.w), titleSvg(title), body,
    wrap(GRD.x0, bottom, note, { size: MIN_FACE }), close].join('');
};

export const failureDiagram = {
  id: id('diagram', 'causes of failure and the failure chain'),
  title: 'How Businesses Fail',
  description: 'IAL 2.3.3 · 3a and 3b: each cause of failure priced on the line of the statement it lands on, and the chain that turns an external shock into a closure.',
  checklist: [
    'Each cause matched to the line of the statement it hits first',
    `Interest rates leaving the operating profit of ${money(F.operatingProfit)} unchanged`,
    'The chain running shock, gap, cushion, closure, in that order',
    'The cushion shown as the only stage the business decided in advance',
  ],
  scenarios: [
    { label: 'The failure chain', svg: failureChainSvg() },
  ],
};

export const causesDiagram = {
  id: id('diagram', 'which line each cause of failure hits'),
  kind: 'table',
  title: 'Where Each Cause Lands',
  description: 'IAL 2.3.3 · 3a and 3b: the fourteen causes of failure sorted by the line of the statement of comprehensive income each one reaches first.',
  scenarios: [
    { label: 'Cause by line', svg: causesView() },
  ],
};

/** One diagram pinned to each block, in block order. */
export const DIAGRAMS = [profitDiagram, profitabilityDiagram, cashDiagram, liquidityDiagram, failureDiagram];
/** Three more declared tables, shipped and reachable in the Diagrams tab but not pinned to a chapter. */
export const EXTRA_DIAGRAMS = [incomeStatementDiagram, cashBridgeDiagram, causesDiagram];
export const ALL_DIAGRAMS = [...DIAGRAMS, ...EXTRA_DIAGRAMS];
