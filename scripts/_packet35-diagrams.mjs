/**
 * PACKET 35 — entrepreneurs-leaders: FIVE diagrams, one pinned to each chapter, from ZERO.
 *
 * `structure-09` is the finding, and it is the mildest-sounding one in the packet: *"Zero diagrams is
 * acceptable for this topic but a one-glance 'objective vs life-cycle stage' or 'opportunity cost =
 * next best, not sum' visual would replace the passive fillins."* Both of the two it names are below,
 * and the reason to build them rather than accept the "acceptable" is that this topic's two hardest
 * ideas are each a picture:
 *
 *   - **Profit is a HILL.** Every objective in sub-topic 3 is a price on one curve, and the sentence
 *     students cannot be made to believe in prose — that charging more can earn less — is obvious the
 *     moment the curve is drawn. `profitCurveSvg` plots it from the same schedule the content teaches
 *     from, marks the four objective prices on it and shades the survival range. Nothing in it is
 *     typed: the points are `FIRM.profitAt(p)`.
 *   - **Opportunity cost is the next best and NOT the sum.** The error is arithmetic, so the picture
 *     is arithmetic: the three forgone alternatives in a column, the best of them ringed, and the sum
 *     shown beside it with what it does to the recommendation.
 *
 * NOTHING IS DRAWN BY HAND, which is packet 29's lesson — three of its five live diagrams were wrong
 * because the curve was drawn and the figures beside it were typed in. Every point on the curve here
 * is computed by the same function the content module prints from, and the runner counts the marked
 * prices back OUT of the emitted SVG and re-derives each one.
 *
 * THE MEASURING FUNCTION IS SHARED WITH THE RUNNER'S GUARD (packet 25, packet 29 rule 5): `estWidth`
 * is what `place` asks before positioning a label and what the runner's extent check asks afterwards,
 * so a label that does not fit is unrepresentable rather than detected. `gridColumns` THROWS when a
 * table does not fit, naming the cell to shorten.
 *
 * THE FRAME IS 440 UNITS AND V022 IS WHY. Measured in the browser at 390×844, a Learn Mode diagram
 * renders 313 CSS px wide, not the 530 the legibility rule assumes. At the 560-unit frame packets
 * 20-28 used, an 11-unit label renders at 6.15px. 440 units with a 12-unit minimum face gives 8.54px,
 * and a DECLARED table at size 10 clears `diagram.table-legible` at 12.05px — which is what buys the
 * student the full-screen sheet that makes a table readable on a phone at all.
 */
import { id, money, qty, pct, round2, FIRM, CHARACTERISTICS, BARRIERS, FINANCIAL_MOTIVES, NON_FINANCIAL_MOTIVES } from './_packet35-util.mjs';

const F = FIRM;

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

/*
 * `size` DEFAULTS TO THE DECLARED-TABLE FACE AND IS RAISED FOR A GRID THAT IS NOT ONE. A diagram
 * declared `kind: 'table'` offers the full-screen sheet, which is what makes 10 units readable at
 * 390px; the two grids that sit beside the profit CURVE get no sheet, so they are drawn at
 * `MIN_FACE` instead and their cells are shortened until they fit. `gridColumns` enforces that by
 * throwing rather than by overflowing.
 */
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
/* ══ THE PROFIT HILL, PLOTTED FROM THE SCHEDULE ═══════════════════════════ */

/*
 * THE CURVE IS THE ARITHMETIC. Every point is `F.profitAt(p)` at a dollar of price, so the peak is
 * where it is because the schedule puts it there and not because a shape was drawn. The four marked
 * prices come from the same module the content prints from, which is why the runner can count them
 * back out of the emitted SVG and re-derive each one.
 *
 * THE VERTICAL BUDGET, WRITTEN DOWN (packet 29): plot area 200 units tall under a title that may
 * wrap, axis labels 14 units below the axis, marker labels alternating above and below their point
 * on a 16-unit offset so two adjacent markers cannot collide, and the caption 34 units below the
 * lowest thing drawn. Nothing is placed by eye.
 */
/*
 * THE ZERO LINE IS NOT THE BOTTOM OF THE PLOT, AND LAYER 6 IS WHY. The first version clamped profit
 * at zero — `py(Math.max(v, 0))` — so the curve ran FLAT along the axis outside the surviving range
 * and appeared to break even at the frame edges rather than at $20 and $50. The Construct (4)
 * question in this same section asks a student to draw a curve that CROSSES zero at both, so the
 * diagram was teaching against the mark scheme beside it. The runner's "falls away on both sides"
 * check passed the flat version, because a flat tail does fall away from the peak.
 *
 * Now profit = 0 sits at `yZero`, three-quarters of the way down, and the loss-making tails are
 * drawn below it. The domain is clipped two dollars either side of break-even so the tails stay
 * inside the frame: at $18 and $52 the loss is $12,800, which is 28% of the peak and fits the 50
 * units left under the zero line.
 */
export const CURVE = { x0: 56, x1: 414, yTop: 74, yZero: 224, yBot: 274, pad: 2 };

const profitCurveSvg = () => {
  const lo = F.breakEvenLow - CURVE.pad;
  const hi = F.breakEvenHigh + CURVE.pad;
  const maxProfit = F.profitMax.profit;
  const px = (p) => r2(CURVE.x0 + ((p - lo) / (hi - lo)) * (CURVE.x1 - CURVE.x0));
  const py = (v) => r2(Math.min(CURVE.yBot, Math.max(CURVE.yTop, CURVE.yZero - (v / maxProfit) * (CURVE.yZero - CURVE.yTop))));

  const pts = [];
  for (let p = lo; p <= hi; p += 0.5) pts.push(`${px(p)},${py(F.profitAt(p))}`);

  /* the surviving range, shaded, so that "survival is a RANGE" is visible before it is read */
  const band = `<rect x="${px(F.breakEvenLow)}" y="${CURVE.yTop}" width="${r2(px(F.breakEvenHigh) - px(F.breakEvenLow))}" height="${CURVE.yBot - CURVE.yTop}" fill="${BLUE}" opacity="0.07"/>`;

  const marks = [
    [F.marketShare.price, 'Market share', RED, 'above'],
    [F.salesMax.price, 'Sales max', AMBER, 'above'],
    [F.profitMax.price, 'Profit max', GREEN, 'above'],
    [F.satisfice.price, 'Satisficing', PURPLE, 'below'],
  ];
  const markSvg = marks.map(([p, label, colour, side]) => {
    const x = px(p); const y = py(F.profitAt(p));
    const labelY = side === 'above' ? r2(y - 10) : r2(y + 20);
    return [
      `<circle cx="${x}" cy="${y}" r="3.5" fill="${colour}"/>`,
      line(x, y, x, CURVE.yZero, colour, 1, ' stroke-dasharray="2 3" opacity="0.55"'),
      place(x, labelY, label, colour, { size: MIN_FACE }),
    ].join('');
  }).join('');

  /* the price axis reads along the bottom, clear of the loss-making tails */
  const axisTicks = [F.breakEvenLow, F.profitMax.price, F.breakEvenHigh].map((p) =>
    t(px(p), r2(CURVE.yBot + 16), money(p), { size: MIN_FACE, fill: AXIS, anchor: 'middle' })).join('');

  const note = `Every objective in 1.3.5 · 3 is a price on this one curve. The curve CROSSES zero at ${money(F.breakEvenLow)} and again at ${money(F.breakEvenHigh)}, and makes a loss outside them; the shaded band between is SURVIVAL, the range in which the workshop covers its costs. The peak is ${money(F.profitMax.price)}, earning ${money(F.profitMax.profit)}. Read the two sides: ${money(F.salesMax.price)} and ${money(F.satisfice.price)} both earn ${money(F.salesMax.profit)}, the same profit reached by selling ${qty(F.salesMax.q)} cheaply or ${qty(F.satisfice.q)} dearly. Market share sits on the left-hand edge of the band, where the workshop sells the most it can — ${qty(F.marketShare.q)} chairs — and keeps ${money(F.marketShare.profit)} of it.`;
  const noteLines = wrapLines(note, { size: MIN_FACE, maxWidth: GRD.right - GRD.x0 }).length;
  const h = r2(CURVE.yBot + 42 + noteLines * 15);

  return [open(h, GRD.w),
    titleSvg('Profit against price: one curve, four objectives'),
    band,
    /* the ZERO line, which is the thing the curve has to cross */
    line(CURVE.x0, CURVE.yZero, CURVE.x1, CURVE.yZero, AXIS, 1.5),
    line(CURVE.x0, CURVE.yTop, CURVE.x0, CURVE.yBot, AXIS, 1.5),
    t(r2(CURVE.x0 - 6), r2(CURVE.yZero + 4), '0', { size: MIN_FACE, fill: AXIS, anchor: 'end' }),
    axisTicks,
    t(r2(CURVE.x0 - 4), r2(CURVE.yTop - 6), 'Profit', { size: MIN_FACE, fill: AXIS, weight: 600 }),
    t(CURVE.x1, r2(CURVE.yTop - 6), 'Price', { size: MIN_FACE, fill: AXIS, anchor: 'end', weight: 600 }),
    `<polyline points="${pts.join(' ')}" fill="none" stroke="${BLUE}" stroke-width="2"/>`,
    markSvg,
    wrap(GRD.x0, r2(CURVE.yBot + 34), note, { size: MIN_FACE }),
    close].join('');
};

/* ══ 1 · The role of an entrepreneur (1.3.5 · 1a, 1b, 1c) ═════════════════ */

const roleView = () => gridSvg({
  title: 'The role: two halves, and who has which',
  headers: ['', 'Initiative', 'Risk'],
  rows: [
    ['Entrepreneur', 'Yes', 'Yes: own capital'],
    ['Intrapreneur', 'Yes', 'No: the firm'],
    ['Lender', 'No', 'Yes: the loan'],
    ['Manager', 'Some', 'No: paid anyway'],
  ],
  note: `1.3.5 · 1 defines the role by what the person does, and the definition has exactly two requirements. Only the first row has both. An intrapreneur (1 · c) takes the initiative inside a firm that carries the loss, which is why the firm can give them resources no individual could raise and why a successful idea belongs to the firm. A lender carries a risk and began nothing; a salaried manager decides things and loses nothing. Nothing in the definition requires the idea to be new.`,
});

const setUpView = () => gridSvg({
  title: 'Setting up: ordered by what each step needs',
  headers: ['Step', 'Needs'],
  rows: [
    ['1 Identify', 'Something to test'],
    ['2 Test', 'An idea worth costing'],
    ['3 Cost and raise', 'A tested idea'],
    ['4 Commit', 'The money, and no way back'],
  ],
  note: `1.3.5 · 1a. The order is forced rather than recommended: each step needs the one before it. Step 4 is the one to notice — ${F.name} owes ${money(F.fixed)} a year in fixed costs from the day the lease is signed, whether it sells ${qty(F.profitMax.q)} chairs or none. Doing step 3 before step 2 is the classic failure, because money raised against an untested idea is money already committed to it.`,
});

const growthView = () => gridSvg({
  title: 'Growing and developing are different decisions',
  headers: ['', 'Growing', 'Developing'],
  rows: [
    ['Changes', 'How much', 'What it does'],
    ['Example', 'A second unit', 'A new design'],
    ['Buys', 'More output', 'A new customer'],
    ['Costs', 'Control', 'The untried'],
  ],
  note: `1.3.5 · 1b puts running and expanding together, and expanding has two halves that students merge. A firm can develop without growing at all, and a firm that does both at once — a second site making a new product for a new customer — has taken both risks in one decision and has the least ability to reverse either.`,
});

export const roleDiagram = {
  id: id('diagram', 'the role of an entrepreneur'),
  kind: 'table',
  title: 'The Role of an Entrepreneur',
  description: 'IAL 1.3.5 · 1a-c: what the role requires, the order in which a business is set up, and the difference between growing and developing.',
  scenarios: [
    { label: 'Who is an entrepreneur', svg: roleView() },
    { label: 'Setting up', svg: setUpView() },
    { label: 'Growing or developing', svg: growthView() },
  ],
};

/* ══ 2 · Risk, uncertainty and barriers (1.3.5 · 1d, 1e) ══════════════════ */

const anticipateView = () => gridSvg({
  title: 'Anticipating: two kinds, two methods',
  headers: ['', 'A risk', 'Uncertainty'],
  rows: [
    ['Has a figure', 'Yes', 'No'],
    ['Handled by', 'Pricing it in', 'Holding cash'],
    ['Lands in', 'Variable cost', 'The reserves'],
    ['Costs', 'A higher price', `${money(F.fixed / 4)} idle`],
    ['Example', '1 chair in 50 back', 'A rival opens'],
  ],
  note: `1.3.5 · 1e asks for the ANTICIPATING; the definitional difference between the two words is 1.3.1 · 1d and belongs to the market chapter. The fourth row is the one that makes this a decision rather than advice: both precautions cost, which is why no firm anticipates everything. Anticipating is part of the ROLE at 1 · e, not one of the objectives in sub-topic 3. Pricing a risk in raises the variable cost, and a higher variable cost moves the profit-maximising price up and the quantity down — the same effect the employee-welfare objective has in chapter 4.`,
});

const barrierView = () => gridSvg({
  title: 'Four barriers, derived from the role',
  headers: ['Barrier', 'Obstructs', 'Lowered by'],
  rows: [
    ['Capital', 'Setting up', 'Grants, renting'],
    ['Skills', 'Running', 'The trade first'],
    ['Risk', 'Anticipating', 'Costing it'],
    ['Opportunity cost', 'All of it', 'Starting part-time'],
  ],
  note: `1.3.5 · 1d is one line and names NO barriers, so each of these is derived from a requirement of the role in sub-topic 1 — which is how the list can be rebuilt in an exam rather than recalled. The middle two are lowered by information and are therefore the cheap ones. The last is the barrier nobody lists and the only one that cannot be removed, only made smaller: a founder who could earn ${money(F.opportunityCost)} elsewhere faces a higher barrier than one who could earn half that, from the same business.`,
});

export const riskDiagram = {
  id: id('diagram', 'risk uncertainty and barriers'),
  kind: 'table',
  title: 'Risk, Uncertainty and Barriers',
  description: 'IAL 1.3.5 · 1d-e: how a risk and an uncertainty are anticipated differently, what each precaution costs, and the four barriers read off the role.',
  scenarios: [
    { label: 'Anticipating', svg: anticipateView() },
    { label: 'Barriers', svg: barrierView() },
  ],
};

/* ══ 3 · Motives and characteristics (1.3.5 · 2a, 2b) ═════════════════════ */

const motiveView = () => gridSvg({
  title: 'Six motives, and what each predicts',
  headers: ['Motive', 'Predicts'],
  rows: [
    ['Profit maximisation', `${money(F.profitMax.price)}, ${qty(F.profitMax.q)} chairs`],
    ['Profit satisficing', `${money(F.satisfice.price)}, ${qty(F.satisfice.q)} chairs`],
    ['Ethical stance', 'A higher cost, kept'],
    ['Social entrepreneur', `${money(F.marketShare.price)}: the most it can`],
    ['Independence', 'No investor: a ceiling'],
    ['Home working', 'A ceiling: the house'],
  ],
  note: `1.3.5 · 2b names two financial motives and four non-financial ones. The second column is what separates a motive from a preference: each one predicts something checkable about the firm. The last three all predict SATISFICING rather than maximising, for three different reasons — a stance that costs money, a refusal of outside say, and a fixed premises — which is why the motives chapter has to come before the objectives chapter rather than after it.`,
});

const characterView = () => gridSvg({
  title: 'Characteristics read off the role',
  headers: ['Quality', 'Required by', 'To do what'],
  rows: [
    ['Organisation', '1 · a', 'Get the first sale out'],
    ['Determination', '1 · b', 'Open in the second year'],
    ['Innovation', '1 · c', 'Find the change'],
    ['Risk tolerance', '1 · e', 'Act while unknown'],
  ],
  note: `1.3.5 · 2a asks for characteristics and skills and names none of either, so the reliable method is to derive them: every requirement of the role in sub-topic 1 implies the quality needed to meet it. That is the half of the leaf about disposition. The other half is SKILLS — costing, selling, organising — which are learned. That is why skills is one of the TWO barriers, of the four the previous chapter derives, that information alone can lower.`,
});

export const motivesDiagram = {
  id: id('diagram', 'motives and characteristics'),
  kind: 'table',
  title: 'Motives and Characteristics',
  description: 'IAL 1.3.5 · 2a-b: the two financial and four non-financial motives the specification names, what each predicts, and the characteristics derived from the role.',
  scenarios: [
    { label: 'Six motives', svg: motiveView() },
    { label: 'Characteristics', svg: characterView() },
  ],
};

/* ══ 4 · Business objectives (1.3.5 · 3a, 3b, 3c) ═════════════════════════ */

/*
 * THIS IS THE DIAGRAM `structure-09` ASKED FOR, IN BOTH OF THE FORMS IT SUGGESTED. The finding names
 * "objective vs life-cycle stage"; the table below carries the stage as a column, and the curve
 * beside it carries the same four objectives as points on one schedule. The table can be read; the
 * curve can be seen. They are generated from the same functions, so they cannot disagree.
 */
const objectivesView = () => gridSvg({
  size: MIN_FACE,
  title: 'Four objectives on one schedule',
  headers: ['Objective', 'Price', 'Chairs', 'Profit', 'Stage'],
  rows: [
    ['Market share', money(F.marketShare.price), qty(F.marketShare.q), money(F.marketShare.profit), 'Entering'],
    ['Sales max', money(F.salesMax.price), qty(F.salesMax.q), money(F.salesMax.profit), 'Growing'],
    ['Profit max', money(F.profitMax.price), qty(F.profitMax.q), money(F.profitMax.profit), 'Mature'],
    ['Satisficing', money(F.satisfice.price), qty(F.satisfice.q), money(F.satisfice.profit), 'Settled'],
  ],
  note: `1.3.5 · 3 on one line: ${F.demand}, fixed costs ${money(F.fixed)}, ${money(F.variable)} a chair. Survival is the RANGE the four sit inside — ${money(F.breakEvenLow)} to ${money(F.breakEvenHigh)} — and is 3 · a. Read the profit column downwards and the two middle rows are equal: ${money(F.salesMax.profit)} reached by selling ${qty(F.salesMax.q)} cheaply and by selling ${qty(F.satisfice.q)} dearly, which is what makes profit a hill. The last column is a typical stage and not a rule; a firm may pursue any of these at any age, and the specification does not tie an objective to a stage.`,
});

const conflictView = () => gridSvg({
  size: MIN_FACE,
  title: 'What each objective costs in profit',
  headers: ['Objective', 'Gains', 'Costs'],
  rows: [
    ['Sales max', `${qty(F.tradeSales.units)} chairs`, money(F.tradeSales.profit)],
    ['Market share', `${qty(F.tradeShare.units)} chairs`, money(F.tradeShare.profit)],
    ['Employee welfare', 'Pay above rate', money(F.welfareCost)],
    ['Satisficing', `${qty(F.tradeSatisfice.units)} unmade`, money(F.tradeSatisfice.profit)],
    ['Cost efficiency', money(F.efficiencyGain), 'Nothing'],
  ],
  note: `"Objectives conflict" is a sentence; this is the size of the conflict. Every figure is the difference between that objective's price and the profit-maximising ${money(F.profitMax.price)}. The last row is the one to carry into an exam: five of the six other objectives at 3 · c compete with profit and cost-efficiency does not — cutting the cost of a chair from ${money(F.variable)} to ${money(F.efficientVariable)} adds ${money(F.efficiencyGain)} at the same price, and more again once the price falls to ${money(F.efficient.price)}.`,
});

export const objectivesDiagram = {
  id: id('diagram', 'business objectives on one schedule'),
  title: 'Business Objectives',
  description: 'IAL 1.3.5 · 3: survival as a range, profit as a hill, and the six other objectives priced against the profit-maximising price on one schedule.',
  checklist: [
    'Profit on the vertical axis, price on the horizontal',
    `The curve rises to a peak at ${money(F.profitMax.price)} and falls away on BOTH sides`,
    `Survival marked as the RANGE ${money(F.breakEvenLow)} to ${money(F.breakEvenHigh)}, not as a point`,
    'Each objective marked as a price on the curve, with its profit read off',
  ],
  scenarios: [
    { label: 'The profit hill', svg: profitCurveSvg() },
    { label: 'Four objectives', svg: objectivesView() },
    { label: 'What each costs', svg: conflictView() },
  ],
};

/* ══ 5 · Business choices (1.3.5 · 4a, 4b) ════════════════════════════════ */

const opportunityView = () => gridSvg({
  title: 'The next best, not the sum',
  headers: ['Use of the year', 'Worth', 'Counts?'],
  rows: [
    ['Run the workshop', money(F.profitMax.profit), 'Chosen'],
    ['Manage a workshop', money(F.alternatives[0][1]), 'THE cost'],
    ['Take an agency', money(F.alternatives[1][1]), 'No'],
    ['Back to the bench', money(F.alternatives[2][1]), 'No'],
    ['All three added', money(F.wrongSum), 'Wrong'],
  ],
  note: `1.3.5 · 4a. The three alternatives are three uses of ONE year, so they are mutually exclusive: taking the salaried post is not compatible with taking the agency. Only one could be had, so only one was given up — ${money(F.opportunityCost)}, the best of them. Adding all three gives ${money(F.wrongSum)}, a figure larger than anything ever available, and it reverses the recommendation: it makes a workshop earning ${money(F.profitMax.profit)} look like a loss of ${money(F.wrongSum - F.profitMax.profit)} when the founder is in fact ${money(F.economicGain)} better off. The test is whether the alternatives could have been held at once.`,
});

const tradeOffView = () => gridSvg({
  title: 'Opportunity cost or trade-off',
  headers: ['', 'Opportunity cost', 'Trade-off'],
  rows: [
    ['The choice', 'Whole options', 'A degree'],
    ['Give up', 'The next best', 'Some of one'],
    ['Example', 'The salaried post', 'Price for volume'],
    ['Shape', 'A switch', 'A dial'],
  ],
  note: `1.3.5 · 4a and 4b are constantly run together and are different shapes of decision: a switch and a dial. And the dial does not turn at a constant rate — moving from ${money(F.profitMax.price)} to ${money(F.salesMax.price)} costs ${money(F.tradeSales.profit)} of profit for ${qty(F.tradeSales.units)} chairs, while going on to ${money(F.marketShare.price)} costs a further ${money(F.tradeShare.profit - F.tradeSales.profit)} for ${qty(F.tradeShare.units - F.tradeSales.units)} more. A trade-off worth making in small amounts is not automatically worth making in large ones.`,
});

export const choicesDiagram = {
  id: id('diagram', 'opportunity cost and trade-offs'),
  kind: 'table',
  title: 'Business Choices',
  description: 'IAL 1.3.5 · 4a-b: opportunity cost as the next best alternative forgone rather than the sum of them, and the difference between an opportunity cost and a trade-off.',
  scenarios: [
    { label: 'Next best, not the sum', svg: opportunityView() },
    { label: 'Which is which', svg: tradeOffView() },
  ],
};

export const DIAGRAMS = [roleDiagram, riskDiagram, motivesDiagram, objectivesDiagram, choicesDiagram];
