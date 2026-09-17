/**
 * PACKET 26 — government-intervention: eight diagrams, one per chapter, each pinned by the BLOCK's
 * `diagramId`.
 *
 * The March section had four and a student could reach three. Block 0's `diagramRef` was the string
 * `"Indirect Tax"`, and the diagram it was meant to reach is titled `"Tax to Correct Negative
 * Externality"` — two strings neither of which contains the other, which is what
 * `resolvePinnedDiagram` requires (`structure-03`, `topFix-02`). So the one diagram the section's own
 * examMatters told students to draw was the one diagram the section never drew. Three of the eight
 * chapters — permits, state provision, regulation — had no diagram at all, and government failure,
 * the chapter that carries the 20-mark essay, had none either.
 *
 * `topFix-02` asks for the ref string to be changed to `"Tax to Correct"`. That would work and it is
 * not what is done here: `diagramRef` is the legacy string pin, and a diagram reaches a student only
 * from a BLOCK's `diagramId` at that chapter's check-in (`lib/learn-steps.js:44-55`). Every chapter
 * here carries one, pinned by id, so no string has to match anything.
 *
 * WHAT THE SPECIFICATION ASKS TO BE DRAWN. 1.3.6 names no diagram anywhere in its thirty-four lines —
 * unlike 1.3.5 · 2d, which names three. What it names instead is eight METHODS (1b) and eight
 * CONTEXTS (1c), and a method is only worth drawing when the drawing shows something a sentence
 * cannot. Four of these eight are drawings and four are tables, and the split is not a shortcut:
 *
 *   drawn   the welfare loss the intervention is aimed at (1a)          — a shape and two areas
 *           the tax, with Pc, Pp and the revenue rectangle (1b-1)       — the incidence split
 *           the two price controls, side by side (1b-3)                 — two gaps, opposite ways
 *           the subsidy (1b-2) and the permit cap (1b-4)                — a shift and a vertical
 *           the overshoot that produces a net welfare loss (2a)         — the same triangle, mirrored
 *   table   the eight methods (1b), the eight contexts (1c), the tool choice, the five causes (2b)
 *
 * EVERY CURVE IS A FUNCTION, NOT A DRAWING. All the lines come from `_packet26-util.mjs` and every
 * point is placed by `valueAt`, `meet` and `quantityAt`. The runner re-derives every plotted point and
 * every printed figure from the emitted SVG and refuses to stage on a disagreement (packet 15's
 * accuracy-01 rule), so a number that changes in the body and not in a diagram fails the build.
 *
 * The helper block below — the frame, the grid, `estWidth`, `gridColumns` — is packet 25's, carried
 * across unchanged so that the thing which LAYS OUT a table and the thing which CHECKS it cannot
 * disagree about what fits (packet 25's own defect, found by its guard firing on 56 caption lines).
 */
import { id, money, qty, round2, valueAt, meet, quantityAt, MINUS as MINUS_SIGN, COAL, CLINIC, FLATS, CITY } from './_packet26-util.mjs';

const INK = '#e8ecf5', AXIS = '#94a3b8', GRID = '#475569', MUTED = '#7a8299';
const BLUE = '#3b82f6', GREEN = '#059669', RED = '#ef4444', AMBER = '#f59e0b', PURPLE = '#8b5cf6';

export const r2 = round2;

const open = (h = 400, w = 500) => `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',system-ui,sans-serif;background:transparent"><defs><marker id="arr" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="${AXIS}"/></marker></defs>`;
const close = '</svg>';
const t = (x, y, text, { size = 10, fill = INK, anchor = 'start', weight = 400 } = {}) =>
  `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${text}</text>`;
const line = (x1, y1, x2, y2, stroke, w = 2, extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${w}"${extra}/>`;
const dot = (x, y, fill, r = 4) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;
const poly = (points, fill, opacity = 0.2) => `<polygon points="${points.map(([x, y]) => `${x},${y}`).join(' ')}" fill="${fill}" fill-opacity="${opacity}"/>`;

/*
 * SVG text does not wrap, so a caption longer than its frame runs off the side — invisible to the
 * schema, to the validator and to a reading of the source. Each wrapped line is emitted at a
 * different x by one hundredth of a unit, which is not decoration: the validator groups <text> by y
 * and reads rows sharing x positions as a grid, so a four-line caption under a drawn curve would
 * otherwise pull a drawing into `diagram.table-kind` (packet 24's note).
 */
const wrapLines = (text, { size = 10, frame = 500, x = 26 } = {}) => {
  /*
   * THE WRAPPER AND THE GUARD USE ONE BOUND. This packed at 0.65 em a character while the runner's
   * text-extent guard measures at 0.7 (`estWidth`), so 56 caption lines were laid out at a width the
   * guard then refused — two pieces of code disagreeing about what fits, which is the same defect as
   * hand-picked table columns and was found the same way, by the guard firing. The wrapper now asks
   * `estWidth` itself, so a line cannot be laid out wider than the check will accept.
   */
  const max = Math.floor((frame - 2 - x) / (size * 0.7));
  const lines = [];
  let cur = '';
  for (const word of String(text).split(' ')) {
    if (cur && (cur + ' ' + word).length > max) { lines.push(cur); cur = word; } else cur = cur ? `${cur} ${word}` : word;
  }
  if (cur) lines.push(cur);
  return lines;
};
const wrap = (x, y, text, { size = 10, fill = MUTED, frame = 500, lead = 14 } = {}) =>
  wrapLines(text, { size, frame, x }).map((l, i) => t(r2(x + i * 0.01), r2(y + i * lead), l, { size, fill })).join('');
/*
 * THE FRAME IS SIZED FROM THE CAPTION, NOT GUESSED. Written after the runner's canvas-bounds check —
 * packet 23's, carried here — refused four of this file's own scenarios on its first run: a caption
 * that wrapped to four lines put its last baseline 42 units below a frame fixed at 400, and an SVG
 * says nothing about text that overflows it. gridSvg has always done this; the drawn views did not,
 * which is why the check is worth more than the care that was supposed to make it unnecessary.
 */
const captionedHeight = (captionTop, text, { frame = 500, x = 26, lead = 14, pad = 12 } = {}) =>
  r2(captionTop + (wrapLines(text, { frame, x }).length - 1) * lead + pad);

/* ── a plot frame per market ───────────────────────────────────────────────── */
/*
 * The two markets are on different scales — cement runs to 60 tonnes at $70, courses to 30 at $120 —
 * so each gets its own frame rather than one shared one that would squash the smaller. What IS shared
 * is that a market's own three scenarios use the SAME frame, which is the only comparison that
 * matters: the welfare-loss triangle and the total-external-cost area have to be seen on one pair of
 * axes or the point of drawing both is lost.
 */
const plotFor = (qMax, pMax) => {
  const f = { x0: 70, x1: 450, yTop: 50, yBot: 300, qMax, pMax };
  f.X = (quantity) => r2(f.x0 + (quantity / qMax) * (f.x1 - f.x0));
  f.Y = (price) => r2(f.yBot - (price / pMax) * (f.yBot - f.yTop));
  return f;
};
/* One frame per market. The coal frame reaches 90 tonnes because the minimum price pushes quantity
 * supplied out to 80, and a control whose excess supply runs off the edge of the picture teaches the
 * opposite of what it is for. */
export const COAL_PLOT = plotFor(90, 120);
export const CLINIC_PLOT = plotFor(80, 105);
export const FLATS_PLOT = plotFor(300, 900);

const axes = (f, xLabel, yLabel) => [
  line(f.x0, f.yBot, f.x1 + 14, f.yBot, AXIS, 2, ' marker-end="url(#arr)"'),
  line(f.x0, f.yBot, f.x0, f.yTop - 14, AXIS, 2, ' marker-end="url(#arr)"'),
  t(f.x1 + 16, f.yBot + 16, 'Q', { size: 12, fill: AXIS, weight: 600, anchor: 'end' }),
  t(f.x0 - 6, f.yTop - 18, '$', { size: 12, fill: AXIS, weight: 600, anchor: 'end' }),
  t(f.x0, f.yBot + 32, xLabel, { size: 9, fill: MUTED }),
  /*
   * "Costs, Benefits" and not "Price" on the vertical axis (topFix-02 asks for exactly this
   * relabelling). On a marginal-analysis diagram the height of a curve is what the next unit COSTS or
   * is WORTH, and only one of the four lines is a price. Labelling the axis "Price" is what lets a
   * student read the gap between MPC and MSC as a price difference, which it is not.
   */
  t(f.x0, f.yTop - 32, yLabel, { size: 9, fill: MUTED }),
].join('');

/**
 * A marginal line drawn across the frame, clipped to it. `l` is a {at0, perUnit} pair from the util
 * module, so the line IS the function and nothing here is positioned by hand.
 */
const marginal = (f, l, colour, { label, labelAt, dash = false } = {}) => {
  const qAt = (price) => round2((price - l.at0) / l.perUnit);
  const ends = [];
  for (const quantity of [0, f.qMax]) {
    const price = valueAt(l, quantity);
    if (price >= 0 && price <= f.pMax) ends.push([quantity, price]);
  }
  for (const price of [0, f.pMax]) {
    const quantity = qAt(price);
    if (quantity > 0 && quantity < f.qMax) ends.push([quantity, price]);
  }
  ends.sort((a, b) => a[0] - b[0]);
  const [a, b] = [ends[0], ends[ends.length - 1]];
  const lq = labelAt == null ? b[0] : labelAt;
  return {
    ends: [a, b],
    svg: [
      line(f.X(a[0]), f.Y(a[1]), f.X(b[0]), f.Y(b[1]), colour, 2.5, dash ? ' stroke-dasharray="6 4"' : ''),
      label ? t(f.X(lq) + 8, f.Y(valueAt(l, lq)) + 4, label, { size: 12, fill: colour, weight: 600 }) : '',
    ].join(''),
  };
};

/** A dashed read-off from a point to both axes, with the two values printed against them. */
/*
 * `qDy` drops a quantity label onto a second line under the axis. Two read-offs on one frame put
 * their labels at the same y, and the runner's table-collision check found "Qopt 50" running into
 * "Qm 60" on the first build — ten units apart on a 90-unit axis is closer than the two strings are
 * wide. Staggering them is the fix a student sees; shortening the labels would have hidden it.
 */
const readOff = (f, quantity, price, colour, { qText, pText, qDy = 0 } = {}) => [
  line(f.x0, f.Y(price), f.X(quantity), f.Y(price), colour, 1.2, ' stroke-dasharray="4 4"'),
  line(f.X(quantity), f.Y(price), f.X(quantity), f.yBot, colour, 1.2, ' stroke-dasharray="4 4"'),
  dot(f.X(quantity), f.Y(price), colour),
  t(f.x0 - 6, f.Y(price) + 4, pText ?? money(price), { size: 10, fill: colour, anchor: 'end', weight: 600 }),
  t(f.X(quantity), f.yBot + 15 + qDy, qText ?? qty(quantity), { size: 10, fill: colour, anchor: 'middle', weight: 600 }),
].join('');

/* ── a shared grid, for the seven diagrams that are tables ─────────────────── */
/*
 * The 560-unit frame comes from packet 19, where three cells measured with getComputedTextLength() in
 * the browser collided at 500 units. `diagram.table-legible` is BLOCK and measures the smallest cell
 * in the 800px column the card gives it, so on a 560-unit frame nothing may be authored below 9 units
 * (9 × 800/560 = 12.9px). Every cell here is 11.
 */
/*
 * SIZE 13, NOT 11, AND THE COLUMN IS 530px AND NOT 800px. `diagram.table-legible` was recalibrated on
 * 17 September (packet 2.2): the Learn Mode column is 530px on a 1024-wide laptop, not the 800px of a
 * 1920 screen the first version assumed, so a cell must be at least 12.68 units on this 560-unit
 * frame to reach 12px in the column a reader actually has. At 11 units these tables rendered 10.4px.
 *
 * The commit that recalibrated it says a dense reference table "genuinely cannot be read in place at
 * 530px" and that the content "will not fit at 15" — true of the tables it measured, and NOT true of
 * these two, because they were authored short. Both fit at 13 with room to spare, which is worth
 * recording: the constraint is cell LENGTH, and a table written to be read rather than to be
 * exhaustive clears the rule today. The one cell that did not fit was "Provision of information",
 * shortened to "Information" in the comparison column only; the specification's full phrase is in
 * the teaching text, in the notes and in the flashcards.
 */
export const GRD = { w: 560, x0: 26, y0: 78, rowH: 32, right: 534, size: 13, gutter: 14 };
export const gridRowY = (i) => r2(GRD.y0 + (i + 1) * GRD.rowH);

/*
 * THE COLUMNS ARE COMPUTED FROM THE CELLS, AND A TABLE THAT DOES NOT FIT THROWS.
 *
 * Every earlier packet hand-picked its column x positions and then had a runner guard check them for
 * overlap afterwards. Written that way round, this file's first eight tables produced FORTY-EIGHT
 * collisions on the first run — not because the guard was wrong but because a hand-picked column is a
 * guess about the longest cell, and the longest cell changes every time a word does. So the layout is
 * derived here instead: each column is as wide as its own widest cell, the columns are laid left to
 * right with a gutter, and a table whose total exceeds the frame REFUSES TO BUILD and names the cell
 * to shorten. The defect is unrepresentable rather than detected.
 *
 * Every cell is start-anchored. Packet 24 centred its non-first columns, which is right for a lone
 * figure and wrong for a phrase: a centred cell's left edge moves when its text changes, so the
 * clearance between two columns depends on both of them.
 *
 * `estWidth` is packet 24's measured bound — all 92 strings in its tables read with
 * getComputedTextLength() at the 800px column, where four characters or more reach 0.601em and a lone
 * character reaches 0.874em — rounded up to 0.7 and 0.9. It is an ESTIMATE, and the runner's guard
 * shares it, so the two cannot disagree. The independent measurement is the browser one in Verify B.
 */
export const estWidth = (text, size = GRD.size) => String(text).length * size * (String(text).length < 4 ? 0.9 : 0.7);

export const gridColumns = ({ title, headers, rows }) => {
  const n = headers.length;
  const widths = headers.map((h, c) => Math.max(estWidth(h), ...rows.map((r) => estWidth(r[c] ?? ''))));
  const needed = widths.reduce((a, b) => a + b, 0) + GRD.gutter * (n - 1);
  const avail = GRD.right - GRD.x0;
  if (needed > avail) {
    const widest = rows.concat([headers]).flatMap((r) => r.map((cell, c) => ({ cell, c }))).sort((a, b) => estWidth(b.cell) - estWidth(a.cell))[0];
    throw new Error(`grid "${title}" needs ${r2(needed)} units and the frame gives ${avail}. Shorten column ${widest.c + 1}, starting with "${widest.cell}".`);
  }
  // Spread the slack between the columns rather than leaving it all on the right.
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
  const noteLines = note ? wrapLines(note, { frame: GRD.w, x: GRD.x0, size: GRD.size }).length : 0;
  const h = r2(gridRowY(rows.length - 1) + 26 + (noteLines ? 8 + noteLines * 17 : 0));
  return [open(h, GRD.w), t(GRD.x0, 34, title, { size: 13, weight: 600 }),
    line(GRD.x0, r2(GRD.y0 + 9), GRD.right, r2(GRD.y0 + 9), AXIS, 1.5), head, body,
    note ? wrap(GRD.x0, r2(gridRowY(rows.length - 1) + 34), note, { frame: GRD.w, size: GRD.size, lead: 17 }) : '',
    close].join('');
};


const C = COAL, L = CLINIC, F = FLATS;

/* ══ 1 · Why governments intervene (1.3.6 · 1a) ═════════════════════════════ */
/*
 * 1a is "the purpose of government intervention, INCLUDING REFERENCE TO MARKET FAILURE", so the first
 * thing this section draws is not a policy at all — it is the thing every policy in it is aimed at.
 * The triangle here is 1.3.5 · 2d's welfare loss, drawn in the same style packet 25 drew it, because
 * a student arriving at 1.3.6 has just left that topic and the picture should be the one they know.
 */
const whyView = () => {
  const f = COAL_PLOT;
  const d = marginal(f, C.demand, BLUE, { label: 'D = MPB', labelAt: 30 });
  const mpc = marginal(f, C.mpc, GREEN, { label: 'MPC', labelAt: 78 });
  const msc = marginal(f, C.msc, RED, { label: 'MSC', labelAt: 62 });
  const caption = `The market settles where demand meets MPC: ${qty(C.marketQ)} ${C.units} ${C.per} at ${money(C.marketP)}. The ${money(C.externalCost)} a ${C.unit} that falls on everybody else is not in MPC, so it is not in the price. Counting it gives MSC, and the quantity that is worth making falls to ${qty(C.optimumQ)}. The shaded triangle between MSC and demand over those last ${qty(C.marketQ - C.optimumQ)} ${C.units} is the welfare loss: ½ × ${money(C.externalCost)} × ${qty(C.marketQ - C.optimumQ)} = ${money(C.welfareLoss)} ${C.per}. Every one of the eight methods in this chapter is an attempt to remove it.`;
  return [open(captionedHeight(352, caption), 500), axes(f, `${C.units} ${C.per}`, 'Costs, Benefits'),
    poly([[f.X(C.optimumQ), f.Y(C.optimumP)], [f.X(C.marketQ), f.Y(C.marketP)], [f.X(C.marketQ), f.Y(valueAt(C.msc, C.marketQ))]], RED, 0.28),
    d.svg, mpc.svg, msc.svg,
    readOff(f, C.marketQ, C.marketP, BLUE, { qText: `Qm ${qty(C.marketQ)}` }),
    readOff(f, C.optimumQ, C.optimumP, AMBER, { qText: `Qopt ${qty(C.optimumQ)}`, qDy: 14 }),
    t(f.X(C.marketQ) - 6, f.Y(valueAt(C.msc, C.marketQ)) - 8, `welfare loss ${money(C.welfareLoss)}`, { size: 11, fill: RED, weight: 600, anchor: 'end' }),
    wrap(26, 336, caption, { frame: 500 }), close].join('');
};

/*
 * THE EIGHT METHODS ARE A CLOSED LIST AND THIS IS IT, in the specification's order and its words. The
 * March section had seven blocks and taught six of the eight: extension of property rights was absent
 * altogether (`specGap-08`), and the eighth block was given to DEREGULATION, which is 3.3.5 in Unit 3.
 */
export const METHODS = [
  ['Indirect taxation', 'raises the price'],
  ['Subsidies', 'lowers the price'],
  ['Maximum and minimum prices', 'fixes the price'],
  ['Tradeable pollution permits', 'fixes the quantity'],
  ['Extension of property rights', 'gives somebody a claim'],
  ['State provision', 'supplies it directly'],
  ['Regulation', 'sets a rule'],
  ['Provision of information', 'changes what buyers know'],
];

/*
 * THE SECOND VIEW IS THE OTHER DIRECTION, and it is drawn rather than tabulated. 1a is one line and
 * the whole of it is "too much or too little": a section whose opening diagram shows only the cost
 * side teaches half of it. The eight methods are a LIST, and a list belongs in the teaching text —
 * they are block 1's second subsection — not in a lookup table bolted to a drawing. A diagram that
 * is half drawing and half table gets a "what a correct diagram shows" checklist printed over a
 * lookup table, which is what `diagram.table-kind` is for.
 */
const whyGainView = () => {
  const f = CLINIC_PLOT;
  const mpb = marginal(f, L.mpb, BLUE, { label: 'D = MPB', labelAt: 26 });
  const msb = marginal(f, L.msb, PURPLE, { label: 'MSB', labelAt: 46 });
  const mpc = marginal(f, L.mpc, GREEN, { label: 'MPC = MSC', labelAt: 68 });
  const caption = `The same failure in the other direction. Each ${L.unit} in ${L.name} is worth ${money(L.externalBenefit)} more to society than to the person buying it, so MSB sits above demand and the quantity worth having is ${qty(L.optimumQ)}, not the ${qty(L.marketQ)} the market reaches. The shaded triangle between MSB and MSC over those ${qty(L.optimumQ - L.marketQ)} ${L.units} is ${money(L.welfareGain)} ${L.per} — a gain that is available and is not being taken. A missed COST means too much; a missed BENEFIT means too little.`;
  return [open(captionedHeight(352, caption), 500), axes(f, `${L.units} ${L.per}`, 'Costs, Benefits'),
    poly([[f.X(L.marketQ), f.Y(L.marketP)], [f.X(L.optimumQ), f.Y(L.optimumP)], [f.X(L.marketQ), f.Y(valueAt(L.msb, L.marketQ))]], GREEN, 0.3),
    mpb.svg, msb.svg, mpc.svg,
    readOff(f, L.marketQ, L.marketP, BLUE, { qText: `Qm ${qty(L.marketQ)}` }),
    readOff(f, L.optimumQ, L.optimumP, AMBER, { qText: `Qopt ${qty(L.optimumQ)}`, qDy: 14 }),
    t(f.X(L.marketQ) - 6, f.Y(valueAt(L.msb, L.marketQ)) - 8, `welfare gain ${money(L.welfareGain)}`, { size: 11, fill: GREEN, weight: 600, anchor: 'end' }),
    wrap(26, 336, caption, { frame: 500 }), close].join('');
};

export const whyDiagram = {
  id: id('diagram', 'why governments intervene in markets'),
  title: 'Why Governments Intervene',
  description: `IAL 1.3.6 · 1a asks for the purpose of government intervention, including reference to market failure. Both panels are what intervention is aimed at, in the two directions 1.3.5 · 1a names: a cost the price misses puts the quantity too high, and a benefit it misses puts it too low.`,
  checklist: [
    'Demand, MPC and MSC on one pair of axes, with the vertical axis labelled Costs, Benefits',
    `The market quantity where demand meets MPC (${qty(C.marketQ)}) and the social optimum where demand meets MSC (${qty(C.optimumQ)})`,
    `The welfare loss shaded as the triangle between MSC and demand over the last ${qty(C.marketQ - C.optimumQ)} ${C.units}, and measured`,
    'For the benefit side, MSB drawn ABOVE demand and the quantity too LOW rather than too high',
  ],
  scenarios: [
    { label: 'Too much: a cost the price misses', svg: whyView() },
    { label: 'Too little: a benefit the price misses', svg: whyGainView() },
  ],
};

/* ══ 2 · Indirect taxation (1.3.6 · 1b-1) ═══════════════════════════════════ */
/*
 * Pc AND Pp ARE ON THIS DIAGRAM BECAUSE `specGap-02` ASKS FOR THEM, and the incidence RULE is not
 * taught here: it is 1.3.4 · 4b and 4d (`econ_spec.txt:713`, `:716`), which packet 24 teaches in a
 * subsection and a Calculate of its own. The finding asks for "a cross-reference to 1.2.9", a number
 * that does not exist in this specification. What this chapter owes 1.3.6 is the tax as a CHOICE —
 * why set it at the external cost, and what the revenue is for — so the split is shown and named and
 * the proof is cited to where it lives.
 */
const taxView = () => {
  const f = COAL_PLOT;
  const d = marginal(f, C.demand, BLUE, { label: 'D', labelAt: 30 });
  const mpc = marginal(f, C.mpc, GREEN, { label: 'MPC', labelAt: 78 });
  const taxed = marginal(f, C.taxedSupply, AMBER, { label: 'MPC + tax', labelAt: 60 });
  const caption = `A tax of ${money(C.tax)} a ${C.unit} lifts the curve firms act on by exactly the external cost, so it becomes the same line as MSC. Quantity falls from ${qty(C.marketQ)} to ${qty(C.taxedQ)}. Buyers pay ${money(C.buyerP)} (Pc) and sellers keep ${money(C.sellerP)} (Pp): the price rose by ${money(C.consumerIncidence)} and what sellers keep fell by ${money(C.producerIncidence)}, which is the incidence split of 1.3.4 · 4b, two to one. The shaded rectangle is the revenue, ${money(C.tax)} × ${qty(C.taxedQ)} = ${money(C.revenue)} ${C.per}.`;
  return [open(captionedHeight(352, caption), 500), axes(f, `${C.units} ${C.per}`, 'Price'),
    poly([[f.X(0), f.Y(C.buyerP)], [f.X(C.taxedQ), f.Y(C.buyerP)], [f.X(C.taxedQ), f.Y(C.sellerP)], [f.X(0), f.Y(C.sellerP)]], AMBER, 0.24),
    d.svg, mpc.svg, taxed.svg,
    readOff(f, C.taxedQ, C.buyerP, AMBER, { qText: `Q ${qty(C.taxedQ)}`, pText: `Pc ${money(C.buyerP)}` }),
    line(f.x0, f.Y(C.sellerP), f.X(C.taxedQ), f.Y(C.sellerP), GREEN, 1.2, ' stroke-dasharray="4 4"'),
    dot(f.X(C.taxedQ), f.Y(C.sellerP), GREEN),
    t(f.x0 - 6, f.Y(C.sellerP) + 4, `Pp ${money(C.sellerP)}`, { size: 10, fill: GREEN, anchor: 'end', weight: 600 }),
    t(f.X(C.marketQ) + 4, f.Y(C.marketP) + 4, `was ${qty(C.marketQ)} at ${money(C.marketP)}`, { size: 9, fill: MUTED }),
    t(f.X(20), f.Y((C.buyerP + C.sellerP) / 2) + 4, `revenue ${money(C.revenue)}`, { size: 11, fill: AMBER, weight: 600 }),
    wrap(26, 336, caption, { frame: 500 }), close].join('');
};

/*
 * `specGap-03`: "specific vs ad valorem — mentioned in one sentence with no diagram". The spec names
 * both at 1b-1 and again at 1.3.3 (`:666`), so the distinction is owed a surface. What separates them
 * is the SHAPE of the shift, which is a picture and not a sentence.
 */
const shiftShapeView = () => {
  const f = COAL_PLOT;
  const mpc = marginal(f, C.mpc, GREEN, { label: 'MPC', labelAt: 84 });
  const specific = marginal(f, C.taxedSupply, AMBER, { label: 'specific', labelAt: 62 });
  const adval = marginal(f, C.adValoremSupply, PURPLE, { label: 'ad valorem', labelAt: 40 });
  const caption = `Both forms are named at 1b-1 and the specification expects both to be drawn. A SPECIFIC tax is a sum per ${C.unit}, so every point on supply rises by the same ${money(C.tax)} and the new curve is PARALLEL to the old one. An AD VALOREM tax is a percentage of the price — here ${Math.round(C.adValoremRate * 100)}% — so it is a small amount on a cheap ${C.unit} and a large one on an expensive one: the curve PIVOTS away from its foot. At the left of the frame the ad valorem gap is only ${money(C.adValoremGapAt0)}; at the right it is ${money(C.adValoremGapAt90)}. Both raise the price buyers pay and lower what sellers keep; the second does more of it where the price is already high.`;
  return [open(captionedHeight(352, caption), 500), axes(f, `${C.units} ${C.per}`, 'Price'),
    mpc.svg, specific.svg, adval.svg,
    line(f.X(0), f.Y(valueAt(C.mpc, 0)), f.X(0), f.Y(valueAt(C.adValoremSupply, 0)), PURPLE, 2),
    t(f.x0 + 8, f.Y((valueAt(C.mpc, 0) + valueAt(C.adValoremSupply, 0)) / 2) + 4, money(C.adValoremGapAt0), { size: 10, fill: PURPLE, weight: 600 }),
    line(f.X(90), f.Y(valueAt(C.mpc, 90)), f.X(90), f.Y(valueAt(C.adValoremSupply, 90)), PURPLE, 2),
    t(f.X(90) - 8, f.Y((valueAt(C.mpc, 90) + valueAt(C.adValoremSupply, 90)) / 2) + 4, money(C.adValoremGapAt90), { size: 10, fill: PURPLE, weight: 600, anchor: 'end' }),
    t(f.x0 + 8, f.yTop + 4, `specific ${money(C.tax)} everywhere; ad valorem ${Math.round(C.adValoremRate * 100)}%`, { size: 9, fill: MUTED }),
    wrap(26, 336, caption, { frame: 500 }), close].join('');
};

export const taxDiagram = {
  id: id('diagram', 'an indirect tax on a good with an external cost'),
  title: 'An Indirect Tax, and Who Pays It',
  description: `IAL 1.3.6 · 1b-1 lists indirect taxation, ad valorem and specific, as a method of intervention. The drawing sets the tax at the external cost and reads Pc, Pp and the revenue off the ${C.name} market; the table is the difference between the two forms the specification names.`,
  checklist: [
    'Demand, MPC and a supply curve shifted up by the tax, on one pair of axes',
    `Pc (${money(C.buyerP)}) and Pp (${money(C.sellerP)}) marked separately, and the quantity after the tax (${qty(C.taxedQ)})`,
    `The revenue shaded as a rectangle: the tax per ${C.unit} by the quantity traded AFTER the tax, not before it`,
    'For an ad valorem tax, a curve that PIVOTS away from its foot rather than shifting in parallel',
  ],
  scenarios: [
    { label: 'A specific tax of ' + money(C.tax), svg: taxView() },
    { label: 'Specific and ad valorem, drawn', svg: shiftShapeView() },
  ],
};

/* ══ 3 · Subsidies (1.3.6 · 1b-2) ═══════════════════════════════════════════ */

const subsidyView = () => {
  const f = CLINIC_PLOT;
  const mpb = marginal(f, L.mpb, BLUE, { label: 'D = MPB', labelAt: 26 });
  const msb = marginal(f, L.msb, PURPLE, { label: 'MSB', labelAt: 44, dash: true });
  const mpc = marginal(f, L.mpc, GREEN, { label: 'MPC = MSC', labelAt: 66 });
  const sub = marginal(f, L.subsidisedSupply, AMBER, { label: `MPC ${MINUS_SIGN} subsidy`, labelAt: 50 });
  const caption = `Every consultation carries ${money(L.externalBenefit)} of benefit to people other than the patient, so MSB sits ${money(L.externalBenefit)} above the demand curve and the quantity worth having is ${qty(L.optimumQ)}, not the ${qty(L.marketQ)} the market reaches. A subsidy of ${money(L.subsidy)} a ${L.unit} drops the curve providers act on by that amount and takes the quantity to ${qty(L.subsidisedQ)}. Buyers pay ${money(L.buyerP)}, down ${money(L.consumerGain)}; providers receive ${money(L.providerP)}, up ${money(L.producerGain)} — the same two-to-one split as the tax, for the same reason. The shaded rectangle is what it costs: ${money(L.subsidy)} × ${qty(L.subsidisedQ)} = ${money(L.cost)} ${L.per}.`;
  return [open(captionedHeight(352, caption), 500), axes(f, `${L.units} ${L.per}`, 'Price'),
    poly([[f.X(0), f.Y(L.providerP)], [f.X(L.subsidisedQ), f.Y(L.providerP)], [f.X(L.subsidisedQ), f.Y(L.buyerP)], [f.X(0), f.Y(L.buyerP)]], AMBER, 0.24),
    mpb.svg, msb.svg, mpc.svg, sub.svg,
    readOff(f, L.subsidisedQ, L.buyerP, AMBER, { qText: `Q ${qty(L.subsidisedQ)}`, pText: `Pc ${money(L.buyerP)}` }),
    line(f.x0, f.Y(L.providerP), f.X(L.subsidisedQ), f.Y(L.providerP), GREEN, 1.2, ' stroke-dasharray="4 4"'),
    dot(f.X(L.subsidisedQ), f.Y(L.providerP), GREEN),
    t(f.x0 - 6, f.Y(L.providerP) + 4, `Pp ${money(L.providerP)}`, { size: 10, fill: GREEN, anchor: 'end', weight: 600 }),
    t(f.X(L.marketQ) + 4, f.Y(L.marketP) - 6, `was ${qty(L.marketQ)} at ${money(L.marketP)}`, { size: 9, fill: MUTED }),
    t(f.X(4), f.Y((L.providerP + L.buyerP) / 2) + 4, `cost ${money(L.cost)}`, { size: 11, fill: AMBER, weight: 600 }),
    wrap(26, 336, caption, { frame: 500 }), close].join('');
};

export const subsidyDiagram = {
  id: id('diagram', 'a subsidy on a good with an external benefit'),
  title: 'A Subsidy, and What It Costs',
  description: `IAL 1.3.6 · 1b-2 lists subsidies as a method of intervention. The drawing sets the subsidy at the external benefit in the ${L.name} market and reads the two prices, the quantity and the cost off it; the table says where the money ends up.`,
  checklist: [
    'Demand (MPB), MSB above it by the external benefit, MPC, and MPC shifted down by the subsidy',
    `The price buyers pay (${money(L.buyerP)}) and the price providers receive (${money(L.providerP)}) marked separately`,
    `The cost shaded as a rectangle: the subsidy per ${L.unit} by the quantity traded AFTER the subsidy`,
  ],
  scenarios: [
    { label: 'A subsidy of ' + money(L.subsidy), svg: subsidyView() },
  ],
};

/* ══ 4 · Maximum and minimum prices (1.3.6 · 1b-3) ══════════════════════════ */
/*
 * TWO MARKETS, NOT ONE, AND THAT IS THE POINT. The specification's phrase is "maximum and minimum
 * (guaranteed) prices" — `maximum price` and `minimum price` each grep 0 because the line reads
 * "maximum and minimum (guaranteed) prices", the same shape as packet 25's `social cost`. What does
 * grep 0 outright is `price ceiling` and `price floor`, which the March section used as two of its
 * block titles.
 *
 * The maximum price is drawn in a market with NO externality in it at all. A government that caps a
 * rent is not correcting a 1.3.5 failure; the quantity was right and the price was out of reach. The
 * March section drew both controls on externality axes, which is what leaves students answering "to
 * correct market failure" to every question in this topic.
 */
const maxPriceView = () => {
  const f = FLATS_PLOT;
  const d = marginal(f, F.demand, BLUE, { label: 'D', labelAt: 120 });
  const s = marginal(f, F.supply, GREEN, { label: 'S', labelAt: 250 });
  const caption = `The market rent is ${money(F.marketP)} a month and ${qty(F.marketQ)} ${F.units} are let. A maximum price of ${money(F.maxPrice)} is set BELOW that, which is the only place a maximum price does anything. At ${money(F.maxPrice)} tenants want ${qty(F.demanded)} ${F.units} and landlords offer ${qty(F.supplied)}: excess demand of ${qty(F.excessDemand)}. The ${qty(F.supplied)} tenants who get one are ${money(F.saving)} a month better off; ${qty(F.pricedOut)} who had a flat at the market rent no longer have one, and the ${qty(F.excessDemand)} gap has to be settled some other way, because the price can no longer do it.`;
  return [open(captionedHeight(352, caption), 500), axes(f, F.units, 'Rent a month'),
    d.svg, s.svg,
    line(f.x0, f.Y(F.maxPrice), f.X(F.demanded) + 10, f.Y(F.maxPrice), RED, 2, ' stroke-dasharray="8 4"'),
    t(f.X(F.demanded) + 14, f.Y(F.maxPrice) + 4, `max ${money(F.maxPrice)}`, { size: 11, fill: RED, weight: 600 }),
    dot(f.X(F.supplied), f.Y(F.maxPrice), GREEN), dot(f.X(F.demanded), f.Y(F.maxPrice), BLUE),
    line(f.X(F.supplied), f.Y(F.maxPrice), f.X(F.supplied), f.yBot, GREEN, 1.2, ' stroke-dasharray="4 4"'),
    line(f.X(F.demanded), f.Y(F.maxPrice), f.X(F.demanded), f.yBot, BLUE, 1.2, ' stroke-dasharray="4 4"'),
    t(f.X(F.supplied), f.yBot + 15, qty(F.supplied), { size: 10, fill: GREEN, anchor: 'middle', weight: 600 }),
    t(f.X(F.demanded), f.yBot + 15, qty(F.demanded), { size: 10, fill: BLUE, anchor: 'middle', weight: 600 }),
    t(f.x0 - 6, f.Y(F.marketP) + 4, money(F.marketP), { size: 10, fill: MUTED, anchor: 'end' }),
    t(f.X((F.supplied + F.demanded) / 2), f.Y(F.maxPrice) - 12, `excess demand ${qty(F.excessDemand)}`, { size: 11, fill: RED, weight: 600, anchor: 'middle' }),
    wrap(26, 336, caption, { frame: 500 }), close].join('');
};

const minPriceView = () => {
  const f = COAL_PLOT;
  const d = marginal(f, C.demand, BLUE, { label: 'D', labelAt: 30 });
  const mpc = marginal(f, C.mpc, GREEN, { label: 'S = MPC', labelAt: 84 });
  const caption = `A minimum price of ${money(C.minPrice)} a ${C.unit} is set ABOVE the market price of ${money(C.marketP)}, which is the only place a minimum price does anything. Buyers take ${qty(C.minDemanded)} ${C.units} — the same quantity the ${money(C.tax)} tax produced, because buyers face the same ${money(C.minPrice)} either way. Sellers offer ${qty(C.minSupplied)}, so there is excess supply of ${qty(C.minExcessSupply)}. The difference from the tax is not on this picture: the extra ${money(C.tax)} a ${C.unit} goes to SELLERS, and there is no ${money(C.revenue)} ${C.per} of revenue to spend on the harm.`;
  return [open(captionedHeight(352, caption), 500), axes(f, `${C.units} ${C.per}`, 'Price'),
    d.svg, mpc.svg,
    line(f.x0, f.Y(C.minPrice), f.X(C.minSupplied) + 10, f.Y(C.minPrice), AMBER, 2, ' stroke-dasharray="8 4"'),
    t(f.X(C.minSupplied) + 14, f.Y(C.minPrice) + 4, `min ${money(C.minPrice)}`, { size: 11, fill: AMBER, weight: 600 }),
    dot(f.X(C.minDemanded), f.Y(C.minPrice), BLUE), dot(f.X(C.minSupplied), f.Y(C.minPrice), GREEN),
    line(f.X(C.minDemanded), f.Y(C.minPrice), f.X(C.minDemanded), f.yBot, BLUE, 1.2, ' stroke-dasharray="4 4"'),
    line(f.X(C.minSupplied), f.Y(C.minPrice), f.X(C.minSupplied), f.yBot, GREEN, 1.2, ' stroke-dasharray="4 4"'),
    t(f.X(C.minDemanded), f.yBot + 15, qty(C.minDemanded), { size: 10, fill: BLUE, anchor: 'middle', weight: 600 }),
    t(f.X(C.minSupplied), f.yBot + 15, qty(C.minSupplied), { size: 10, fill: GREEN, anchor: 'middle', weight: 600 }),
    t(f.x0 - 6, f.Y(C.marketP) + 4, money(C.marketP), { size: 10, fill: MUTED, anchor: 'end' }),
    t(f.X((C.minDemanded + C.minSupplied) / 2), f.Y(C.minPrice) - 12, `excess supply ${qty(C.minExcessSupply)}`, { size: 11, fill: AMBER, weight: 600, anchor: 'middle' }),
    wrap(26, 336, caption, { frame: 500 }), close].join('');
};

export const priceControlDiagram = {
  id: id('diagram', 'maximum and minimum guaranteed prices'),
  title: 'Maximum and Minimum Prices',
  description: `IAL 1.3.6 · 1b-3 lists maximum and minimum (guaranteed) prices as a method of intervention. A maximum price binds only below the market price and a minimum price only above it, so the two are drawn in the markets where each is actually used: rented flats and coal.`,
  checklist: [
    'The control drawn as a horizontal line, below the equilibrium for a maximum and above it for a minimum',
    'The quantity read off DEMAND and the quantity read off SUPPLY at the controlled price, as two different numbers',
    'The gap between them named: excess demand under a maximum price, excess supply under a minimum price',
  ],
  scenarios: [
    { label: `A maximum price of ${money(F.maxPrice)}`, svg: maxPriceView() },
    { label: `A minimum price of ${money(C.minPrice)}`, svg: minPriceView() },
  ],
};

/* ══ 5 · Permits, property rights and regulation (1b-4, 1b-5, 1b-7) ═════════ */
/*
 * THE BEST SINGLE IDEA IN THIS SECTION IS ARITHMETIC AND NOT A LIST. A tax set at the external cost
 * and a cap set at the social optimum reach the SAME quantity and the SAME buyer price from opposite
 * directions: the tax names a price and lets the quantity settle, the cap names a quantity and lets
 * the price settle. `permitPrice` is not written down anywhere — it is
 * demand(cap) − MPC(cap), and it comes out at the tax, which is why a permit is worth something and
 * who receives that something is the whole question about how permits are handed out.
 *
 * AND A PERMIT IS A PROPERTY RIGHT, which is how 1b-5 gets taught instead of being a bullet nobody
 * covers (`specGap-08`). `property rights` is ONE hit in the whole specification (`:811`) with no
 * explanation attached, so rule 2 applies: the mechanism is taught in the specification's own words,
 * and the mechanism is that somebody is given a claim they can defend or sell.
 */
const permitView = () => {
  const f = COAL_PLOT;
  const d = marginal(f, C.demand, BLUE, { label: 'D', labelAt: 30 });
  const mpc = marginal(f, C.mpc, GREEN, { label: 'MPC', labelAt: 84 });
  const caption = `Permits are issued for ${qty(C.capQ)} ${C.units} ${C.per} and no more, so supply becomes a vertical line at the cap. Buyers bid the price up to ${money(C.capBuyerP)}, which is what demand says the ${qty(C.capQ)}th ${C.unit} is worth. Making it still costs ${money(C.capCostP)}, so a permit is worth the gap: ${money(C.capBuyerP)} ${MINUS_SIGN} ${money(C.capCostP)} = ${money(C.permitPrice)}. That is the same ${money(C.tax)} the tax collected and the same quantity the tax produced — the tax names a price and lets quantity settle, the cap names a quantity and lets price settle. What differs is who ends up with the ${money(C.permitPrice)}: the government if the permits are sold, the firms if they are given away.`;
  return [open(captionedHeight(352, caption), 500), axes(f, `${C.units} ${C.per}`, 'Price'),
    d.svg, mpc.svg,
    line(f.X(C.capQ), f.yBot, f.X(C.capQ), f.yTop + 10, PURPLE, 2.5, ' stroke-dasharray="7 4"'),
    t(f.X(C.capQ) + 8, f.yTop + 22, `cap ${qty(C.capQ)}`, { size: 11, fill: PURPLE, weight: 600 }),
    line(f.X(C.capQ) - 7, f.Y(C.capBuyerP), f.X(C.capQ) + 7, f.Y(C.capBuyerP), AMBER, 2),
    line(f.X(C.capQ) - 7, f.Y(C.capCostP), f.X(C.capQ) + 7, f.Y(C.capCostP), AMBER, 2),
    line(f.X(C.capQ), f.Y(C.capBuyerP), f.X(C.capQ), f.Y(C.capCostP), AMBER, 2.5),
    dot(f.X(C.capQ), f.Y(C.capBuyerP), BLUE), dot(f.X(C.capQ), f.Y(C.capCostP), GREEN),
    t(f.x0 - 6, f.Y(C.capBuyerP) + 4, money(C.capBuyerP), { size: 10, fill: BLUE, anchor: 'end', weight: 600 }),
    t(f.x0 - 6, f.Y(C.capCostP) + 4, money(C.capCostP), { size: 10, fill: GREEN, anchor: 'end', weight: 600 }),
    line(f.x0, f.Y(C.capBuyerP), f.X(C.capQ), f.Y(C.capBuyerP), BLUE, 1.2, ' stroke-dasharray="4 4"'),
    line(f.x0, f.Y(C.capCostP), f.X(C.capQ), f.Y(C.capCostP), GREEN, 1.2, ' stroke-dasharray="4 4"'),
    t(f.X(C.capQ) + 10, f.Y((C.capBuyerP + C.capCostP) / 2) + 4, `permit ${money(C.permitPrice)}`, { size: 11, fill: AMBER, weight: 600 }),
    t(f.X(C.capQ), f.yBot + 15, qty(C.capQ), { size: 10, fill: PURPLE, anchor: 'middle', weight: 600 }),
    wrap(26, 336, caption, { frame: 500 }), close].join('');
};

export const permitDiagram = {
  id: id('diagram', 'tradeable pollution permits property rights and regulation'),
  title: 'Permits, Property Rights and Regulation',
  description: `IAL 1.3.6 · 1b-4, 1b-5 and 1b-7 list tradeable pollution permits, extension of property rights and regulation. The drawing caps the ${C.name} market at the social optimum and reads the permit price off the gap between what buyers pay and what the last ${C.unit} costs to make.`,
  checklist: [
    'Supply drawn as a vertical line at the cap, with demand and MPC still on the axes',
    `The price buyers pay read off DEMAND at the cap (${money(C.capBuyerP)}) and the cost of the last ${C.unit} read off MPC (${money(C.capCostP)})`,
    `The permit price marked as the gap between them, and equal to a tax set at the external cost`,
  ],
  scenarios: [
    { label: `A cap at ${qty(C.capQ)} ${C.units}`, svg: permitView() },
  ],
};

/* ══ 6 · State provision and provision of information (1b-6, 1b-8) ══════════ */
/*
 * INFORMATION IS DRAWN AS A SHIFT IN DEMAND, and it is the one tool on 1b's list that reaches the
 * social optimum without the government paying for anything. Buyers who can see the benefit value it
 * themselves, so MPB moves to MSB and the market does the rest. Set against the subsidy on the same
 * market, the arithmetic makes the trade-off exactly: same quantity, a higher price for buyers, and
 * nothing at all out of the budget.
 *
 * `accuracy-02`: the March subsection was called "Information Provision and NUDGE THEORY" and told
 * students nudge theory "is increasingly popular in exam questions". `nudge` is 0 in econ_spec.txt,
 * `libertarian` is 0, `choice architecture` is 0. The finding files the IAL home of that material as
 * "1.2.10", which is UK GCE numbering — the middle digit of an IAL topic is always 3. It is 1.3.2 ·
 * 1b (`:580-587`) and packet 17 already teaches it.
 */
const informationView = () => {
  const f = CLINIC_PLOT;
  const mpb = marginal(f, L.mpb, BLUE, { label: 'D = MPB', labelAt: 26 });
  const msb = marginal(f, L.msb, PURPLE, { label: 'D after = MSB', labelAt: 46 });
  const mpc = marginal(f, L.mpc, GREEN, { label: 'S', labelAt: 70 });
  const infoQ = meet(L.msb, L.mpc);
  const infoP = valueAt(L.mpc, infoQ);
  const caption = `Suppose the ${money(L.externalBenefit)} of benefit is real but unknown, and the government publishes what a check-up prevents. Buyers who can now see it value a consultation ${money(L.externalBenefit)} more highly, so demand moves from MPB to MSB and the market settles at ${qty(infoQ)} ${L.units} ${L.per} at ${money(infoP)}. That is the SAME quantity the ${money(L.subsidy)} subsidy bought — reached with buyers paying ${money(infoP)} instead of ${money(L.buyerP)}, and nothing at all out of the budget. It works only if the gap really was information; if people know and still do not go, demand does not move and the campaign has cost money for nothing.`;
  return [open(captionedHeight(352, caption), 500), axes(f, `${L.units} ${L.per}`, 'Price'),
    mpb.svg, msb.svg, mpc.svg,
    readOff(f, L.marketQ, L.marketP, MUTED, { qText: qty(L.marketQ) }),
    readOff(f, infoQ, infoP, PURPLE, { qText: qty(infoQ), qDy: 14 }),
    t(f.X(2), f.Y(100), 'demand moves; nothing is paid', { size: 9, fill: MUTED }),
    wrap(26, 336, caption, { frame: 500 }), close].join('');
};

export const provisionDiagram = {
  id: id('diagram', 'state provision and provision of information'),
  title: 'State Provision and Information',
  description: `IAL 1.3.6 · 1b-6 and 1b-8 list state provision and provision of information as methods of intervention. The drawing shows information moving demand from MPB to MSB in the ${L.name} market, reaching the social optimum with no government spending.`,
  checklist: [
    'Demand drawn twice — before and after the information — with supply unchanged',
    'The new equilibrium read off where the shifted demand meets supply',
    'The result compared with the subsidy: same quantity, higher price to buyers, no budget cost',
  ],
  scenarios: [
    { label: 'Information moves demand', svg: informationView() },
  ],
};

/* ══ 7 · Where governments intervene, and choosing between tools (1c) ═══════ */
/*
 * 1c IS EIGHT CONTEXTS AND THE MARCH SECTION TAUGHT NONE OF THEM AS A CONTEXT. Commodities were
 * absent (`specGap-09`), energy was named once and never explained (`specThin-01`), and the rest
 * appeared only as the country of an example. A context is not decoration: it is where the paper's
 * extract comes from, and 1c is a list of the eight the paper may set.
 *
 * AND THE SECOND TABLE IS `specGap-05`, which asks for "choosing between interventions for a given
 * market failure" and is the skill a 14- or 20-mark question is actually testing. It is built from
 * the one column a list of advantages and disadvantages never has: what the GOVERNMENT HAS TO KNOW
 * before it can set the policy at all. That column is what makes chapter 8 inevitable.
 */
export const CONTEXTS = [
  ['Health', 'under-consumed', 'subsidy, provision'],
  ['Housing', 'rents out of reach', 'maximum price'],
  ['Education', 'under-consumed', 'state provision'],
  ['Transport', 'congestion, fumes', 'tax, permits'],
  ['Environment', 'external costs', 'permits, rights'],
  ['Energy', 'external costs', 'tax, subsidy'],
  ['Agriculture', 'prices swing hard', 'guaranteed price'],
  ['Commodities', 'prices swing hard', 'guaranteed price'],
];

const contextsView = () => gridSvg({
  title: 'The eight contexts (1c)',
  headers: ['Context', 'What tends to fail', 'A tool from 1b'],
  rows: CONTEXTS,
  note: `These eight are the whole of 1.3.6 · 1c, in the specification's own order. The middle column is the usual reason a government is in that market and the right-hand column is a tool that fits — neither is a rule, and a paper can set any context with any tool. What the list is for is recognition: an extract about a crop price, a fuel price or a rent is an extract about one of these eight, and the first line of a good answer names which failure is in front of it before it names a policy.`,
});

export const TOOL_CHOICE = [
  ['Indirect tax', 'a price', 'the external cost'],
  ['Subsidy', 'a price', 'the external benefit'],
  ['Maximum price', 'a price', 'who is priced out'],
  ['Minimum price', 'a price', 'the price to hold'],
  ['Permits', 'a quantity', 'the right quantity'],
  ['Property rights', 'a claim', 'who owns what'],
  ['Regulation', 'a rule', 'the right limit'],
  ['Information', 'nothing', 'what buyers miss'],
];

const toolChoiceView = () => gridSvg({
  title: 'Choosing between them',
  headers: ['Tool', 'Sets', 'Government must know'],
  rows: TOOL_CHOICE,
  note: `Read the right-hand column before the left. Every tool on this list needs the government to know a number or a fact before it can be set, and a tool set from the wrong number does not fail gently — a tax of ${money(C.wrongTax)} where the external cost is ${money(C.externalCost)} takes the ${C.name} market to ${qty(C.wrongQ)} ${C.units}, as far below the optimum as the free market was above it. That is chapter 8. So the question "which tool?" is usually answered by "which fact can we actually establish?", and a judgement that says so is doing what a Discuss or an Evaluate asks for.`,
});

export const contextsDiagram = {
  id: id('diagram', 'the eight contexts and choosing between interventions'),
  title: 'Where Governments Intervene, and Which Tool',
  kind: 'table',
  description: `IAL 1.3.6 · 1c lists eight contexts in which governments may intervene. The first table is that list; the second sets the eight methods of 1b against what each one needs the government to know before it can be set.`,
  scenarios: [
    { label: 'The eight contexts', svg: contextsView() },
    { label: 'Choosing between them', svg: toolChoiceView() },
  ],
};

/* ══ 8 · Government failure (1.3.6 · 2a, 2b) ════════════════════════════════ */
/*
 * 2a IS ONE SENTENCE AND IT IS A MEASUREMENT, NOT A MOOD: "'Government failure' as intervention that
 * results in a NET WELFARE LOSS". So it is drawn, on the same axes as chapter 1, with the same
 * triangle on the other side of the optimum. A tax of twice the external cost shifts supply twice as
 * far and lands the quantity as far below the optimum as the free market was above it; because both
 * lines are straight the loss is the same ${money} either way. The intervention has MOVED the loss
 * rather than removed it, and it costs something to run — which is 2a, derived.
 *
 * `specGap-01` asks for "distortion of price signals" to be added as a spec-named cause. `price
 * signal` is 0 in econ_spec.txt and `distortion of price signals` is 0: it is UK GCE 9EC0 1.4.2. The
 * causes at 2b are a closed list of five and this table is that list. Its other half — that excessive
 * administrative costs are mentioned only in passing — is real, and the fourth row is the answer.
 */
const overshootView = () => {
  const f = COAL_PLOT;
  const d = marginal(f, C.demand, BLUE, { label: 'D', labelAt: 26 });
  const mpc = marginal(f, C.mpc, GREEN, { label: 'MPC', labelAt: 84 });
  const msc = marginal(f, C.msc, RED, { label: 'MSC', labelAt: 68 });
  const wrong = marginal(f, C.wrongSupply, PURPLE, { label: `MPC + ${money(C.wrongTax)}`, labelAt: 46 });
  const caption = `The external cost is ${money(C.externalCost)} a ${C.unit} and the tax is set at ${money(C.wrongTax)} — because the figure was guessed, or because it was right once and the ${C.good} has changed. Quantity falls to ${qty(C.wrongQ)}, which is ${qty(C.optimumQ - C.wrongQ)} ${C.units} BELOW the optimum of ${qty(C.optimumQ)}, exactly as far as the free market was above it. The shaded triangle is the welfare loss from the tonnes now NOT being made although they were worth making: ${money(C.wrongLoss)} ${C.per}, the same number the free market lost. The intervention moved the loss instead of removing it, and it costs something to run.`;
  return [open(captionedHeight(352, caption), 500), axes(f, `${C.units} ${C.per}`, 'Costs, Benefits'),
    poly([[f.X(C.optimumQ), f.Y(C.optimumP)], [f.X(C.wrongQ), f.Y(C.wrongBuyerP)], [f.X(C.wrongQ), f.Y(valueAt(C.msc, C.wrongQ))]], PURPLE, 0.3),
    d.svg, mpc.svg, msc.svg, wrong.svg,
    readOff(f, C.optimumQ, C.optimumP, AMBER, { qText: `Qopt ${qty(C.optimumQ)}`, qDy: 14 }),
    readOff(f, C.wrongQ, C.wrongBuyerP, PURPLE, { qText: `Q ${qty(C.wrongQ)}`, qDy: 14 }),
    t(f.X(C.wrongQ) - 6, f.Y(valueAt(C.msc, C.wrongQ)) - 10, `net welfare loss ${money(C.wrongLoss)}`, { size: 11, fill: PURPLE, weight: 600, anchor: 'end' }),
    wrap(26, 336, caption, { frame: 500 }), close].join('');
};

export const CAUSES = [
  ['Information gaps', 'the target is wrong'],
  ['Lack of incentives', 'costs are not controlled'],
  ['Unintended consequences', 'behaviour moves elsewhere'],
  ['Excessive administrative costs', 'the cure costs more'],
  ['Moral hazard', 'protection changes risk'],
];

export const failureDiagram = {
  id: id('diagram', 'government failure as a net welfare loss'),
  title: 'Government Failure',
  description: `IAL 1.3.6 · 2a defines government failure as intervention that results in a net welfare loss, and 2b lists five causes. The drawing sets a tax at twice the external cost in the ${C.name} market and measures what that does; the table is 2b's own list.`,
  checklist: [
    'Demand, MPC, MSC and a supply curve shifted up by MORE than the external cost',
    'The quantity landing BELOW the social optimum, with both marked',
    'The welfare loss shaded on the other side of the optimum, and measured',
  ],
  scenarios: [
    { label: `A tax of ${money(C.wrongTax)} where the cost is ${money(C.externalCost)}`, svg: overshootView() },
  ],
};

/* ── the eight, in chapter order ───────────────────────────────────────────── */
export const DIAGRAMS = [
  whyDiagram,
  taxDiagram,
  subsidyDiagram,
  priceControlDiagram,
  permitDiagram,
  provisionDiagram,
  contextsDiagram,
  failureDiagram,
];
