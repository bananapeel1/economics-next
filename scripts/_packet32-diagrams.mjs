/**
 * PACKET 32 — aggregate-demand: FIVE diagrams, one pinned to each chapter.
 *
 * `structure-01` and `diagram-01` are the same defect counted twice: **0 of 3 diagrams reach a
 * student**. Block 2 pins `diagramRef: "Aggregate Demand Curve"` and block 3 pins
 * `"Shifts in Aggregate Demand"`; the titles in the table are "The AD Curve", "The Multiplier Effect"
 * and "Circular Flow of Income with AD Components", and `LearnModeTab.jsx:97-104` matches by
 * substring in either direction, so neither pin resolves and the second names a diagram that has
 * never existed. Blocks 4 and 5 pin nothing at all. Here the pins are `diagramId` — what
 * `lib/learn-steps.js:44-55` actually carries into a check-in — and they are DERIVED by the runner
 * from the block order, so a dangling pin is unrepresentable rather than corrected.
 *
 * ════ THE PALETTE IS AN OBLIGATION, NOT A PREFERENCE (structure-09) ════
 *
 * `structure-09` is that the live SVGs hard-code `#e8ecf5` text on a transparent background and
 * vanish in light mode. It was closed on 12 September in the RENDERER:
 * `components/learn-mode/processSvg.js` maps eighteen baked literals onto `--dg-*` tokens at render
 * time, so dark mode is unchanged and light mode repaints. What that transfers to a content packet is
 * an obligation rather than a freedom — a colour the remapper does not know about stays light text on
 * a light page — so every literal below is a key of that map, and the runner asserts it by PARSING
 * `PALETTE` out of `processSvg.js` rather than re-typing the list here.
 *
 * ════ 440 UNITS, AND A 12-UNIT FLOOR (packet 30's Verify B) ════
 *
 * A Learn Mode diagram renders **313 CSS px wide** at 390x844, measured with `getBoundingClientRect`
 * — neither the 530 the validator's legibility rule assumes nor the 800 of a wide desktop. On the
 * 560-unit frame packets 20-29 used, a 10-unit face is 5.59px. 440 units with a 12-unit floor is
 * 8.54px, and a declared table at size 10 on 440 is 12.05px in the 530px column, which is what
 * `diagram.table-legible` asks for. `MIN_FACE` is exported and imported by the runner, so the thing
 * that lays out and the thing that checks share one number.
 *
 * `estWidth` is asked by `place` before a label is positioned and by the runner's extent check
 * afterwards (packet 25's fifth instance): a label that does not fit is unrepresentable rather than
 * detected. `gridColumns` THROWS when a table does not fit, naming the cell to shorten.
 */
import { id, bn, money, pct, qty, round2, AD, GOVERNMENT } from './_packet32-util.mjs';

/* Every one of these is a key of PALETTE in components/learn-mode/processSvg.js. */
const INK = '#e8ecf5', AXIS = '#94a3b8', GRID = '#475569', MUTED = '#7a8299';
const BLUE = '#3b82f6', GREEN = '#059669', RED = '#ef4444', AMBER = '#f59e0b';

export const r2 = round2;
/** The axis colour, exported so the runner can find the lines a label must not be struck through by. */
export const AXIS_HEX = AXIS;

const open = (h = 300, w = 440) => `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',system-ui,sans-serif;background:transparent">`;
const close = '</svg>';
const t = (x, y, text, { size = 12, fill = INK, anchor = 'start', weight = 400 } = {}) =>
  `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${text}</text>`;
const line = (x1, y1, x2, y2, stroke, w = 2, extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${w}"${extra}/>`;
const dot = (x, y, fill, r = 4.5) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;

export const GRD = { w: 440, x0: 20, right: 420, size: 12, gutter: 12 };
/** The smallest face any diagram in this section may emit, in viewBox units. */
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

/* Each wrapped line one hundredth of a unit further right, so a caption cannot be read as a grid. */
const wrap = (x, y, text, { size = MIN_FACE, fill = MUTED, lead = 15, maxWidth = GRD.right - GRD.x0 } = {}) =>
  wrapLines(text, { size, maxWidth }).map((l, i) => t(r2(x + i * 0.01), r2(y + i * lead), l, { size, fill })).join('');

/** A label that cannot be placed off-frame: the placement asks the same estWidth the check asks. */
const place = (x, y, text, colour, { size = MIN_FACE, gap = 8, weight = 600 } = {}) => {
  const w = estWidth(text, size);
  if (x + gap + w <= GRD.right) return t(r2(x + gap), r2(y), text, { size, fill: colour, weight });
  if (x - gap - w >= GRD.x0) return t(r2(x - gap), r2(y), text, { size, fill: colour, weight, anchor: 'end' });
  return t(r2(Math.max(GRD.x0, Math.min(x, GRD.right - w))), r2(y), text, { size, fill: colour, weight });
};

/* ══ the shared reference table: columns computed from the cells, a bad fit THROWS ══ */

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

/* ══ THE AD CURVE · 2.3.2 · 1b-2 and 1c, and the Draw (4) command word ════ */
/*
 * THE ONE DRAWN DIAGRAM, AND IT IS ON THE PAPER. `Draw (4)` — "requires students to construct an
 * accurately labelled diagram, using quantitative skills" (`econ_spec.txt:2712-2714`) — is one of
 * Economics' eight command words, and the AD curve with a movement marked on one view and a shift on
 * the other is exactly what `1c` asks a student to be able to tell apart. `practice-01` notes that
 * the live 10-mark item requires no diagram at all.
 *
 * THE GEOMETRY IS THE ARITHMETIC. The curve is anchored at the economy's own figures — price index
 * 100 against `AD.total` — and both other points are computed from the same slope, so a change to
 * the spine moves the drawing. The shift is `AD.afterFiscal.total`, which is the identity rebuilt
 * with G raised, not a second line drawn a pleasing distance away.
 */
const PLOT = { x0: 62, x1: 404, yTop: 92, yBot: 246 };
const PRICE = { lo: 88, hi: 112 };
const OUT = { lo: 920, hi: 1120 };
const px = (y) => r2(PLOT.x0 + ((y - OUT.lo) / (OUT.hi - OUT.lo)) * (PLOT.x1 - PLOT.x0));
const py = (p) => r2(PLOT.yBot - ((p - PRICE.lo) / (PRICE.hi - PRICE.lo)) * (PLOT.yBot - PLOT.yTop));

/** dY/dP along the AD curve, chosen once so both views share one slope. */
const SLOPE = -6;
const outputAt = (p, total = AD.total) => total + SLOPE * (p - 100);
/*
 * THE CURVE LABELS SIT AT THE TOP END, NOT THE BOTTOM, AND VERIFY B IS WHY. At the bottom end they
 * land among the dashed guide lines that run from each point down to the output axis, and `AD\u2081` came
 * out with the 1,040 guide drawn straight through it \u2014 packet 29's round-three finding, "a label
 * struck through by its own guide line", reproduced exactly. The top end of the curve is the one
 * corner of this chart with nothing else in it.
 */
/** The curve is drawn between these two price levels, inside the axes rather than onto them. */
const DRAW_HI = 110, DRAW_LO = 90;

const axes = () => [
  line(PLOT.x0, PLOT.yTop - 8, PLOT.x0, PLOT.yBot, AXIS, 1.5),
  line(PLOT.x0, PLOT.yBot, PLOT.x1 + 10, PLOT.yBot, AXIS, 1.5),
  t(PLOT.x0 - 4, PLOT.yTop - 18, 'Price level', { size: MIN_FACE, fill: AXIS, weight: 600 }),
  t(PLOT.x1 + 10, r2(PLOT.yBot + 20), 'Real output', { size: MIN_FACE, fill: AXIS, weight: 600, anchor: 'end' }),
].join('');

const guide = (p, y, colour) => [
  line(PLOT.x0, py(p), px(y), py(p), colour, 1, ' stroke-dasharray="3 3"'),
  line(px(y), py(p), px(y), PLOT.yBot, colour, 1, ' stroke-dasharray="3 3"'),
].join('');

const adLine = (total, colour) => line(px(outputAt(DRAW_HI, total)), py(DRAW_HI), px(outputAt(DRAW_LO, total)), py(DRAW_LO), colour, 2.5);

const movementView = () => {
  const pA = 106, pB = 94;
  const yA = outputAt(pA), yB = outputAt(pB);
  return [open(320), t(GRD.x0, 22, 'A movement ALONG the AD curve', { size: 13, weight: 600 }),
    wrap(GRD.x0, 40, 'The price level changes and nothing else does, so the economy slides down its own curve.', { size: MIN_FACE, lead: 14 }),
    axes(),
    adLine(AD.total, BLUE),
    guide(pA, yA, MUTED), guide(pB, yB, MUTED),
    dot(px(yA), py(pA), AMBER), dot(px(yB), py(pB), GREEN),
    /*
     * ABOVE-RIGHT OF THE POINT, NOT LEFT OF IT. End-anchored on the left, this label ran back past
     * `PLOT.x0` and the price-level axis was drawn straight through the first digit. Verify B saw it
     * on the phone; nothing in the runner could, because the extent check measures against the FRAME
     * and the collision check compares text with TEXT and never with a LINE. The guard that now
     * exists for it is in the runner, and it is A/B'd against this exact position.
     */
    place(px(yA), r2(py(pA) - 10), `${qty(yA)} at ${qty(pA)}`, AMBER),
    place(px(yB), r2(py(pB) - 10), `${qty(yB)} at ${qty(pB)}`, GREEN),
    place(px(outputAt(DRAW_HI)), r2(py(DRAW_HI) - 8), 'AD', BLUE, { size: 13 }),
    wrap(GRD.x0, 288, `One curve, two points: ${bn(yB - yA)} more output demanded at the lower price level.`, { size: MIN_FACE, lead: 14 }),
    close].join('');
};

const shiftView = () => {
  const p = 100;
  const y1 = outputAt(p), y2 = outputAt(p, AD.afterFiscal.total);
  return [open(320), t(GRD.x0, 22, 'A SHIFT of the AD curve', { size: 13, weight: 600 }),
    wrap(GRD.x0, 40, 'One component changes at an unchanged price level, so the whole curve moves.', { size: MIN_FACE, lead: 14 }),
    axes(),
    adLine(AD.total, BLUE), adLine(AD.afterFiscal.total, GREEN),
    guide(p, y1, MUTED), guide(p, y2, MUTED),
    dot(px(y1), py(p), BLUE), dot(px(y2), py(p), GREEN),
    /* BELOW its point, not above: above-left is where AD\u2081 itself runs, and the curve was drawn
     * through the label. Found by the struck-through check once its geometry compared the SEGMENT
     * with the glyph box rather than the two bounding boxes. */
    t(r2(px(y1) - 8), r2(py(p) + 14), qty(y1), { size: MIN_FACE, fill: BLUE, weight: 600, anchor: 'end' }),
    place(px(y2), r2(py(p) - 10), qty(y2), GREEN),
    place(px(outputAt(DRAW_HI)), r2(py(DRAW_HI) - 8), 'AD\u2081', BLUE, { size: 13 }),
    place(px(outputAt(DRAW_HI, AD.afterFiscal.total)), r2(py(DRAW_HI) - 8), 'AD\u2082', GREEN, { size: 13 }),
    wrap(GRD.x0, 288, `G rises by ${bn(AD.fiscalRise)}: at price level ${qty(p)}, ${bn(AD.afterFiscal.total - AD.total)} more is demanded. The cause is named, not drawn.`, { size: MIN_FACE, lead: 14 }),
    close].join('');
};

export const adCurveDiagram = {
  id: id('diagram', 'the ad curve and what moves it'),
  title: 'The AD Curve, and What Moves It',
  description: `IAL 2.3.2 · 1b-2 and 1c: the AD curve, and the distinction between a movement along it and a shift of it. Both views are drawn from the same identity, C + I + G + (X − M) = ${bn(AD.total)}.`,
  checklist: [
    'Real output on the horizontal axis, the price level on the vertical axis, both labelled.',
    'One downward-sloping AD curve, labelled AD.',
    'For a movement: two points on the SAME curve, with dashed lines to both axes.',
    'For a shift: a second curve labelled AD₂, and the output read at an UNCHANGED price level.',
    'The component that moved named beside the shift — a shift with no cause is half an answer.',
  ],
  scenarios: [
    { label: 'Movement along AD', svg: movementView() },
    { label: 'Shift of AD', svg: shiftView() },
  ],
};

/* ══ 2 · Consumption (2.3.2 · 2b, 2c, 2d) ═════════════════════════════════ */
/*
 * `specGap-02`, `specThin-02` and the words `savings ratio` — **0 hits in the live section**. The
 * table is the leaf: saving is the RESIDUAL of disposable income, the ratio is that residual over
 * that income, and a change in the ratio is a change in consumption with the income unchanged. Three
 * rows so the movement is visible in both directions, and the AD column is the identity recomputed.
 */
const savingView = () => gridSvg({
  title: `Disposable income splits into consumption and saving`,
  headers: ['Savings ratio', 'Yd', 'C', 'S', 'AD'],
  rows: [AD.ratioDown, AD.ratio, AD.ratioUp].map((r) => {
    const c = AD.savingCase(r);
    return [pct(r), bn(AD.Yd), bn(c.spent), bn(c.saved), bn(c.ad.total)];
  }),
  colours: [[INK, INK, GREEN, INK, GREEN], [], [INK, INK, RED, INK, RED]],
  note: `Yd is disposable income, C is consumption, S is saving. Income does not change down the table; the SPLIT does. Saving is what is left, so a savings ratio of ${pct(AD.ratioUp)} is the same statement as consumption of ${bn(AD.savingCase(AD.ratioUp).spent)} — and AD is that consumption put back into C + I + G + (X − M) with the other three unchanged.`,
});

export const consumptionDiagram = {
  id: id('diagram', 'consumption and saving'),
  kind: 'table',
  title: 'Consumption, Saving and the Savings Ratio',
  description: `IAL 2.3.2 · 2b-2d: the relationship between savings and consumption, the definition of the savings ratio, and the effect of a change in it.`,
  scenarios: [{ label: 'Income, spending and saving', svg: savingView() }],
};

/* ══ 3 · Investment (2.3.2 · 3a) ══════════════════════════════════════════ */
/*
 * `specGap-03`: gross against net investment is not taught, and the live section used the term "net
 * investment" undefined. The whole leaf is a subtraction, and the second row is why it matters — a
 * country can be investing and losing capital at the same time.
 */
const investmentView = () => gridSvg({
  title: 'Gross investment, depreciation and net investment',
  headers: ['', 'Gross I', 'Depreciation', 'Net I', 'Capital stock'],
  rows: [
    ['Now', bn(AD.I), bn(AD.depreciation), bn(AD.netInvestment(AD.I)), 'grows'],
    ['Weak year', bn(AD.grossLow), bn(AD.depreciation), bn(AD.netInvestment(AD.grossLow)), 'shrinks'],
  ],
  colours: [[INK, INK, INK, GREEN, GREEN], [INK, INK, INK, RED, RED]],
  note: `Gross investment is everything firms spend on capital goods. Depreciation is the capital used up over the same period — not a part of that spending, as the second row shows. Net investment is the difference, and it is the number that says whether the country can produce more next year than this year. In the second row the firms are still spending ${bn(AD.grossLow)} and the capital stock is falling.`,
});

export const investmentDiagram = {
  id: id('diagram', 'gross and net investment'),
  kind: 'table',
  title: 'Gross and Net Investment',
  description: `IAL 2.3.2 · 3a: the distinction between gross investment and net investment, with depreciation as the difference.`,
  scenarios: [{ label: 'Gross, depreciation, net', svg: investmentView() }],
};

/* ══ 4 · Government expenditure (2.3.2 · 4a) ══════════════════════════════ */
/*
 * FOUR INFLUENCES AND THE SPECIFICATION'S OWN WORDS FOR ALL FOUR. `specGap-06` asks for "automatic
 * stabilisers and counter-cyclical spending", which is `econ_spec.txt:1855` and Unit 4. The second
 * row is that mechanism under `4a-2`'s own name, "the level of economic activity".
 */
const governmentView = () => gridSvg({
  title: 'What moves government expenditure',
  headers: ['Influence', 'Chosen, or not'],
  rows: [
    ['Fiscal policy', 'Chosen: a budget decision'],
    ['Economic activity', 'Not chosen: G moves on its own'],
    ['Market failure', 'Chosen: fills a provision gap'],
    ['Political priorities', 'Chosen: what a government is for'],
  ],
  colours: [[], [INK, AMBER], [], []],
  note: `The second row is the one students miss, and it is the only one that moves G with nobody deciding anything: when output and employment fall, payments to households without work rise and tax receipts fall, so G rises on its own — here by ${bn(AD.benefitRise)}, taking G to ${bn(AD.afterDownturn.G)}. The other three are choices, and a choice can be reversed in a budget.`,
});

export const governmentDiagram = {
  id: id('diagram', 'what moves government expenditure'),
  kind: 'table',
  title: 'Influences on Government Expenditure',
  description: `IAL 2.3.2 · 4a: fiscal policy, the level of economic activity, correction of market failures and political priorities.`,
  scenarios: [{ label: 'The four influences', svg: governmentView() }],
};

/* ══ 5 · The net trade balance (2.3.2 · 5a) ═══════════════════════════════ */
/*
 * `specGap-07`: real income, degree of protectionism and non-price factors are all missing from the
 * live section, which covers only the exchange rate, relative inflation and foreign income. Five
 * rows, one per bullet, and the note carries the two exact pieces of arithmetic the leaf supports.
 */
const netTradeView = () => gridSvg({
  title: 'What moves the net trade balance',
  headers: ['What changes', 'X', 'M', 'X − M'],
  rows: [
    ['Real income at home rises', 'same', 'rises', 'falls'],
    ['The home currency depreciates', 'rises', 'falls', 'rises'],
    ['Partner economies slow down', 'falls', 'same', 'falls'],
    ['Tariffs rise, at home', 'same', 'falls', 'rises'],
    ['Quality and design improve', 'rises', 'falls', 'rises'],
  ],
  colours: [[INK, MUTED, RED, RED], [INK, GREEN, GREEN, GREEN], [INK, RED, MUTED, RED], [INK, MUTED, GREEN, GREEN], [INK, GREEN, GREEN, GREEN]],
  note: `Two of these are arithmetic rather than direction. Real income: an extra ${bn(AD.incomeRise)} of spending at home takes about ${bn(AD.importsFromIncome)} of it abroad, so M goes to ${bn(AD.afterIncome.M)} and X − M from ${bn(AD.netTrade)} to ${bn(AD.afterIncome.netTrade)}. Tariffs: ${pct(AD.tariff)} added to an import priced at ${money(AD.fx.importPrice)} makes it ${money(AD.tariffPrice(AD.fx.importPrice))} to a buyer at home. Tariffs abroad work the same way on X, which is why protectionism can cut both sides.`,
});

export const netTradeDiagram = {
  id: id('diagram', 'what moves the net trade balance'),
  kind: 'table',
  title: 'The Net Trade Balance',
  description: `IAL 2.3.2 · 5a: the impact on the net trade balance of changes in real income, the exchange rate, the state of the global economy, the degree of protectionism and non-price factors.`,
  scenarios: [{ label: 'The five influences', svg: netTradeView() }],
};

export const DIAGRAMS = [adCurveDiagram, consumptionDiagram, investmentDiagram, governmentDiagram, netTradeDiagram];
export { GOVERNMENT };
