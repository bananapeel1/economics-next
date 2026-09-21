/**
 * PACKET 25 — market-failure: eight diagrams, one per chapter, each pinned by the BLOCK's
 * `diagramId`.
 *
 * The March section had four and a student could reach two. `diagramRef` on block 7 was the string
 * "Deadweight Loss", which matched none of the four titles, so the chapter the audit called the
 * diagram-heaviest rendered nothing (structure-03). Block 2's ref "Negative Externality" matched only
 * the first diagram by substring, so "Positive Externality of Consumption" — a diagram the
 * specification names at 2d-1 — was never shown to anybody. Block 4 had a matching diagram and no ref
 * at all. A diagram reaches a student only from a block's `diagramId`, at that chapter's check-in
 * (lib/learn-steps.js:44-55); `diagramRef` is the legacy string pin and a subsection `diagramId` is
 * never read.
 *
 * DIAGRAM 3 IS THE ONE THE SPECIFICATION ASKS FOR BY NAME. 1.3.5 · 2d is the only place in this topic
 * that requires diagrams, and it requires exactly these:
 *
 *      "The use of diagrams, using marginal analysis, to illustrate:
 *         • the external benefits from consumption
 *         • the external costs from production
 *         • the distinction between the market and social optimum positions;
 *           identification of the welfare loss or gain areas."          econ_spec.txt:744-748
 *
 * So the three scenarios of diagram 3 are: the external cost of production with the welfare LOSS
 * shaded and measured; the same market with the TOTAL EXTERNAL COST shaded, which is a different
 * shape and a different number; and the external benefit of consumption with the welfare GAIN shaded
 * and measured. The second exists because the March quiz keyed one as the other (`quiz-01`), and a
 * student who has seen the two areas on the same axes cannot make that mistake by reading.
 *
 * SEVEN OF THE EIGHT ARE TABLES and declare `kind: 'table'`, which drops the "What a correct diagram
 * shows" checklist — nobody reproduces a lookup table in an exam — and the graph width cap. That is
 * not a shortcut: five of this topic's six sub-topics are lists of contexts and distinctions
 * (`1b`, `2c`, `2e`, `4c`, `5b`, `6b`), and a list of contexts is a table. Only 2d is a drawing, and
 * only 6a has a shape worth plotting.
 *
 * EVERY CURVE IS A FUNCTION, NOT A DRAWING. All four lines come from _packet25-util.mjs and every
 * point is placed by `valueAt` and `meet`. The runner re-derives every plotted point and every
 * printed figure from the emitted SVG and refuses to stage on a disagreement (packet 15's accuracy-01
 * rule), so a number that changes in the body and not in a diagram fails the build.
 */
import { id, money, qty, round2, valueAt, KUMBE, AMARA } from './_packet25-util.mjs';

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
export const KUMBE_PLOT = plotFor(60, 70);
export const AMARA_PLOT = plotFor(30, 120);

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
const readOff = (f, quantity, price, colour, { qText, pText } = {}) => [
  line(f.x0, f.Y(price), f.X(quantity), f.Y(price), colour, 1.2, ' stroke-dasharray="4 4"'),
  line(f.X(quantity), f.Y(price), f.X(quantity), f.yBot, colour, 1.2, ' stroke-dasharray="4 4"'),
  dot(f.X(quantity), f.Y(price), colour),
  t(f.x0 - 6, f.Y(price) + 4, pText ?? money(price), { size: 10, fill: colour, anchor: 'end', weight: 600 }),
  t(f.X(quantity), f.yBot + 15, qText ?? qty(quantity), { size: 10, fill: colour, anchor: 'middle', weight: 600 }),
].join('');

/* ── a shared grid, for the seven diagrams that are tables ─────────────────── */
/*
 * The 560-unit frame comes from packet 19, where three cells measured with getComputedTextLength() in
 * the browser collided at 500 units. `diagram.table-legible` is BLOCK and measures the smallest cell
 * in the 800px column the card gives it, so on a 560-unit frame nothing may be authored below 9 units
 * (9 × 800/560 = 12.9px). Every cell here is 11.
 */
export const GRD = { w: 560, x0: 26, y0: 78, rowH: 30, right: 534, size: 11, gutter: 14 };
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
  const noteLines = note ? wrapLines(note, { frame: GRD.w, x: GRD.x0 }).length : 0;
  const h = r2(gridRowY(rows.length - 1) + 26 + (noteLines ? 8 + noteLines * 14 : 0));
  return [open(h, GRD.w), t(GRD.x0, 34, title, { size: 13, weight: 600 }),
    line(GRD.x0, r2(GRD.y0 + 9), GRD.right, r2(GRD.y0 + 9), AXIS, 1.5), head, body,
    note ? wrap(GRD.x0, r2(gridRowY(rows.length - 1) + 34), note, { frame: GRD.w }) : '',
    close].join('');
};

/* ══ 1 · Why markets fail, and the five sources (1.3.5 · 1a, 1b) ════════════ */
/*
 * The five rows ARE the five bullets of 1b, in the specification's order and its words. A student who
 * learns a sixth source has learned something the paper cannot ask about, and the March section
 * taught three of them — merit and demerit goods, market power, and a block it called "information
 * failure", none of which is a phrase in econ_spec.txt.
 */
export const SOURCES = [
  ['Externalities', 'a cost or benefit falls outside', 'a cement works and the households downwind'],
  ['The free-rider problem', 'nobody need pay to benefit', 'coastal flood defences'],
  ['Imperfect market information', 'one side knows more', 'a used car and its service history'],
  ['Moral hazard', 'cover changes behaviour', 'a driver who stops checking the tyres'],
  ['Speculation and bubbles', 'price leaves value behind', 'apartments bought to resell, not to live in'],
];

const sourcesView = () => gridSvg({
  title: 'The five sources of market failure',
  headers: ['Source', 'What goes wrong'],
  rows: SOURCES.map(([name, wrong]) => [name, wrong]),
  note: `These five are the whole of 1.3.5 · 1b, and they are listed here in the specification's own order and wording. A sixth source is not something the paper can ask about. Where you might meet each one: ${SOURCES.map(([n, , ex]) => `${n.toLowerCase()} — ${ex}`).join('; ')}.`,
});

const tooMuchTooLittleView = () => gridSvg({
  title: 'Too much or too little, against the social optimum',
  headers: ['What the price misses', 'The market makes'],
  rows: [
    ['External cost of production', 'too much'],
    ['External cost of consumption', 'too much'],
    ['External benefit of production', 'too little'],
    ['External benefit of consumption', 'too little'],
    ['Any payment at all', 'too little, or none'],
  ],
  colours: [[INK, RED], [INK, RED], [INK, AMBER], [INK, AMBER], [INK, AMBER]],
  note: `1.3.5 · 1a is one sentence and it is the test for everything that follows: market failure is too much or too little of a good produced and/or consumed compared with the socially optimal level of output. A cost the price misses means too much; a benefit it misses means too little; a good nobody can be made to pay for at all is the last row, and that is a public good.`,
});

export const sourcesDiagram = {
  id: id('diagram', 'the five sources of market failure'),
  title: 'Why Markets Fail, and the Five Sources',
  kind: 'table',
  description: `IAL 1.3.5 · 1a defines market failure as too much or too little of a good being produced and/or consumed compared with the socially optimal level of output; 1b lists exactly five sources. Both tables are the specification's own lists, in its order.`,
  scenarios: [
    { label: 'The five sources', svg: sourcesView() },
    { label: 'Too much, or too little', svg: tooMuchTooLittleView() },
  ],
};

/* ══ 2 · Private, external and social (1.3.5 · 2a, 2b, 2c) ══════════════════ */

const identitiesView = () => gridSvg({
  title: 'The two identities 2a and 2b ask for',
  headers: ['Private', '+ External', '= Social'],
  rows: [
    ['Private cost', 'external cost', 'social cost'],
    ['Private benefit', 'external benefit', 'social benefit'],
  ],
  colours: [[INK, RED, AMBER], [INK, GREEN, BLUE]],
  note: `Read each row left to right as a sum. A private cost is what the producer pays; an external cost is what falls on everybody else; the social cost is the two together. The same for benefits: private is what the buyer gains, external is what other people gain, social is both. Every diagram in the next chapter is one of these two lines drawn, so it is worth being able to write both from memory.`,
});

const fourKindsView = () => gridSvg({
  title: 'The four kinds of externality 2c distinguishes',
  headers: ['External…', 'Falls on', 'Which curve moves'],
  rows: [
    ['cost of production', 'people nearby', 'MSC above MPC'],
    ['cost of consumption', 'people nearby', 'MSB below MPB'],
    ['benefit of production', 'other producers', 'MSC below MPC'],
    ['benefit of consumption', 'other people', 'MSB above MPB'],
  ],
  colours: [[INK, MUTED, RED], [INK, MUTED, RED], [INK, MUTED, GREEN], [INK, MUTED, GREEN]],
  note: `Two questions settle which row you are in: is it a cost or a benefit, and does it come from MAKING the thing or from USING it? Answer both and the curve follows. 2d then asks you to draw two of these four — the external cost of production and the external benefit of consumption.`,
});

export const identitiesDiagram = {
  id: id('diagram', 'private external and social costs and benefits'),
  title: 'Private, External and Social',
  kind: 'table',
  description: `IAL 1.3.5 · 2a and 2b ask for the distinction between private, external and social benefits and between private, external and social costs; 2c asks for the distinction between the four kinds of externality. Both are stated here as the identities they are.`,
  scenarios: [
    { label: 'The two identities', svg: identitiesView() },
    { label: 'The four kinds', svg: fourKindsView() },
  ],
};

/* ══ 3 · Marginal analysis and the welfare areas (1.3.5 · 2d) ═══════════════ */
/*
 * The only drawn requirement in the topic, and the three views are the three bullets of 2d. Every
 * coordinate comes from valueAt() and meet() on the lines in _packet25-util.mjs.
 */

const kumbeCurves = () => {
  const f = KUMBE_PLOT;
  return {
    mpb: marginal(f, KUMBE.mpb, BLUE, { label: 'MPB = MSB', labelAt: 8 }),
    mpc: marginal(f, KUMBE.mpc, GREEN, { label: 'MPC', labelAt: 52 }),
    msc: marginal(f, KUMBE.msc, RED, { label: 'MSC', labelAt: 44, dash: true }),
  };
};

const kumbeLossView = () => {
  const f = KUMBE_PLOT, K = KUMBE, c = kumbeCurves();
  const apex = [f.X(K.optimumQ), f.Y(K.optimumP)];
  const lowerRight = [f.X(K.marketQ), f.Y(K.marketP)];
  const upperRight = [f.X(K.marketQ), f.Y(valueAt(K.msc, K.marketQ))];
  const caption = `The market settles at ${qty(K.marketQ)} ${K.units} because buyers and sellers weigh only their own benefit and their own cost. Every ${K.unit} beyond ${qty(K.optimumQ)} costs society more than it is worth to the buyer, and the shaded triangle adds up that shortfall: \u00bd \u00d7 ${money(K.externalCost)} \u00d7 ${qty(K.marketQ - K.optimumQ)} = ${money(K.welfareLoss)} ${K.per}.`;
  const capTop = f.yBot + 58;
  return [
    open(captionedHeight(capTop, caption), 500), axes(f, `Quantity (${K.units} ${K.per})`, 'Costs, Benefits ($ a ' + K.unit + ')'),
    t(26, 34, 'An external cost of production: the welfare loss', { size: 13, weight: 600 }),
    poly([apex, lowerRight, upperRight], RED, 0.3),
    c.mpb.svg, c.mpc.svg, c.msc.svg,
    readOff(f, K.marketQ, K.marketP, BLUE, { qText: `Qm ${qty(K.marketQ)}`, pText: money(K.marketP) }),
    readOff(f, K.optimumQ, K.optimumP, AMBER, { qText: `Qopt ${qty(K.optimumQ)}`, pText: money(K.optimumP) }),
    /*
     * Anchored at the RIGHT EDGE rather than beside the triangle. Written as a start-anchored label
     * at the market quantity, this one string ran to x = 514.2 in a 500-unit frame — measured with
     * getComputedTextLength() in the browser during Verify B, and visible on the phone as
     * "welfare loss $50 a d". Nothing in the repository could see it: the canvas-bounds check reads
     * a text element's ANCHOR, and an anchor inside the frame says nothing about where the text ends.
     * The runner now measures the width too; "a day" moves to the caption, which already says it.
     */
    t(496, f.Y(K.optimumP) - 6, `welfare loss ${money(K.welfareLoss)}`, { size: 11, fill: RED, weight: 600, anchor: 'end' }),
    wrap(26, capTop, caption, { frame: 500 }),
    close,
  ].join('');
};

const kumbeTotalView = () => {
  const f = KUMBE_PLOT, K = KUMBE, c = kumbeCurves();
  const band = [
    [f.X(0), f.Y(valueAt(K.mpc, 0))],
    [f.X(0), f.Y(valueAt(K.msc, 0))],
    [f.X(K.marketQ), f.Y(valueAt(K.msc, K.marketQ))],
    [f.X(K.marketQ), f.Y(valueAt(K.mpc, K.marketQ))],
  ];
  const caption = `This band is the gap between MPC and MSC over EVERY ${K.unit} produced: ${money(K.externalCost)} \u00d7 ${qty(K.marketQ)} = ${money(K.totalExternalCost)} ${K.per}. It is ten times the welfare loss and it is not the same thing. The external cost on the first ${K.unit} is real, but that ${K.unit} is still worth more to the buyer than it costs society to make \u2014 so it is not a loss. Only the ${K.units} past ${qty(K.optimumQ)} are.`;
  const capTop = f.yBot + 58;
  return [
    open(captionedHeight(capTop, caption), 500), axes(f, `Quantity (${K.units} ${K.per})`, 'Costs, Benefits ($ a ' + K.unit + ')'),
    t(26, 34, 'The same market: the TOTAL external cost', { size: 13, weight: 600 }),
    poly(band, AMBER, 0.28),
    c.mpb.svg, c.mpc.svg, c.msc.svg,
    readOff(f, K.marketQ, K.marketP, BLUE, { qText: `Qm ${qty(K.marketQ)}`, pText: money(K.marketP) }),
    t(f.X(18), f.Y(28), `total external cost ${money(K.totalExternalCost)} ${K.per}`, { size: 11, fill: AMBER, weight: 600 }),
    wrap(26, capTop, caption, { frame: 500 }),
    close,
  ].join('');
};

const amaraGainView = () => {
  const f = AMARA_PLOT, A = AMARA;
  const mpb = marginal(f, A.mpb, BLUE, { label: 'MPB', labelAt: 4 });
  const msb = marginal(f, A.msb, PURPLE, { label: 'MSB', labelAt: 9, dash: true });
  const msc = marginal(f, A.msc, GREEN, { label: 'MPC = MSC', labelAt: 25 });
  const tri = [
    [f.X(A.marketQ), f.Y(valueAt(A.msb, A.marketQ))],
    [f.X(A.marketQ), f.Y(valueAt(A.msc, A.marketQ))],
    [f.X(A.optimumQ), f.Y(A.optimumP)],
  ];
  const caption = `Each of the first ${qty(A.marketQ)} ${A.units} is worth ${money(A.externalBenefit)} more to society than to the person who buys it, because other people gain from it too. Between ${qty(A.marketQ)} and ${qty(A.optimumQ)} ${A.units} the social benefit still exceeds the cost, so those ${A.units} are worth having and are not being bought. The triangle is what society is missing: \u00bd \u00d7 ${money(A.externalBenefit)} \u00d7 ${qty(A.optimumQ - A.marketQ)} = ${money(A.welfareGain)} ${A.per}. It is a welfare GAIN available, not a loss \u2014 which is why 2d says "welfare loss or gain areas".`;
  const capTop = f.yBot + 58;
  return [
    open(captionedHeight(capTop, caption), 500), axes(f, `Quantity (${A.units} ${A.per})`, 'Costs, Benefits ($ a ' + A.unit + ')'),
    t(26, 34, 'An external benefit of consumption: the welfare gain', { size: 13, weight: 600 }),
    poly(tri, GREEN, 0.3),
    mpb.svg, msb.svg, msc.svg,
    readOff(f, A.marketQ, A.marketP, BLUE, { qText: `Qm ${qty(A.marketQ)}`, pText: money(A.marketP) }),
    readOff(f, A.optimumQ, A.optimumP, AMBER, { qText: `Qopt ${qty(A.optimumQ)}`, pText: money(A.optimumP) }),
    t(496, f.Y(84), `welfare gain ${money(A.welfareGain)}`, { size: 11, fill: GREEN, weight: 600, anchor: 'end' }),
    wrap(26, capTop, caption, { frame: 500 }),
    close,
  ].join('');
};

export const marginalDiagram = {
  id: id('diagram', 'marginal analysis welfare loss and welfare gain'),
  title: 'Marginal Analysis: the Welfare Loss and the Welfare Gain',
  description: `IAL 1.3.5 · 2d asks for diagrams using marginal analysis to illustrate the external costs from production, the external benefits from consumption, and the distinction between the market and social optimum positions with identification of the welfare loss or gain areas. All three are here, with both positions marked on every view.`,
  scenarios: [
    { label: 'External cost of production', svg: kumbeLossView() },
    { label: 'Total external cost — a different area', svg: kumbeTotalView() },
    { label: 'External benefit of consumption', svg: amaraGainView() },
  ],
};

/* ══ 4 · Externalities in five contexts (1.3.5 · 2e) ════════════════════════ */
/*
 * The five rows are the five bullets of 2e, in the specification's order: transport, health,
 * education, environment, financial. Every example is generic rather than a named firm with a year,
 * because a dated claim about a real market is what accuracy-01 and accuracy-02 were.
 */
export const CONTEXTS = [
  ['Transport', 'a car at rush hour', 'cost · consumption', 'other drivers are delayed, and people beside the road breathe the fumes'],
  ['Health', 'a vaccination', 'benefit · consumption', 'people who are not vaccinated are less likely to meet the disease'],
  ['Education', 'a year of schooling', 'benefit · consumption', 'employers, colleagues and later generations gain from what one person learned'],
  ['Environment', 'a factory on a river', 'cost · production', 'everyone downstream bears a cost the factory does not pay'],
  ['Financial', 'a bank taking on risk', 'cost · production', 'a failure spreads to depositors, to firms and to other banks'],
];

const contextsView = () => gridSvg({
  title: 'Externalities in the five contexts 2e names',
  headers: ['Context', 'Example', 'Which kind'],
  rows: CONTEXTS.map(([c, ex, kind]) => [c, ex, kind]),
  colours: CONTEXTS.map(([, , kind]) => [INK, MUTED, kind.startsWith('cost') ? RED : GREEN]),
  note: `These five contexts are 2e and the paper can ask about any of them. Who it falls on: ${CONTEXTS.map(([c, , , who]) => `${c.toLowerCase()} — ${who}`).join('; ')}. Name the context, name which of the four kinds it is, and the diagram follows.`,
});

const directionView = () => gridSvg({
  title: 'What each context does to the quantity',
  headers: ['Context', 'The market makes', 'Compared with'],
  rows: CONTEXTS.map(([c, , kind]) => [c, kind.startsWith('cost') ? 'too much' : 'too little', 'the social optimum']),
  colours: CONTEXTS.map(([, , kind]) => [INK, kind.startsWith('cost') ? RED : AMBER, MUTED]),
  note: `The direction is not five facts to memorise. It falls out of whether the thing the price misses is a cost or a benefit: a missed cost means the market makes too much, a missed benefit means it makes too little. Learn the rule and the five rows come free.`,
});

export const contextsDiagram = {
  id: id('diagram', 'externalities in five contexts'),
  title: 'Externalities in Five Contexts',
  kind: 'table',
  description: `IAL 1.3.5 · 2e asks for the impact of externalities in transport, health, education, environment and financial contexts. Each row names the externality and the direction it pushes the quantity.`,
  scenarios: [
    { label: 'The five contexts', svg: contextsView() },
    { label: 'Which way the quantity goes', svg: directionView() },
  ],
};

/* ══ 5 · Public goods and the free-rider problem (1.3.5 · 3) ════════════════ */

const goodsView = () => gridSvg({
  title: 'Private goods and public goods: the two tests 3a names',
  headers: ['', 'Rival?', 'Excludable?'],
  rows: [
    ['Private good', 'rival', 'excludable'],
    ['a seat on a bus', 'one person fills it', 'a fare keeps you off'],
    ['Public good', 'non-rival', 'non-excludable'],
    ['a sea wall', 'my shelter is no less', 'shelters non-payers'],
  ],
  colours: [[INK, GREEN, GREEN], [MUTED, MUTED, MUTED], [INK, RED, RED], [MUTED, MUTED, MUTED]],
  note: `3a is exactly two lines: private goods are rival and excludable; public goods are non-rival and non-excludable. Rival means one person's use leaves less for another. Excludable means somebody who does not pay can be kept from it. Both halves are needed: the specification asks for the distinction, and a definition of one kind of good is not a distinction between two.`,
});

const freeRiderView = () => gridSvg({
  title: 'Why a private seller may not provide a public good',
  headers: ['Because', 'It follows that'],
  rows: [
    ['the good is non-excludable', 'non-payers cannot be kept out'],
    ['free-riding is possible', 'wait, pay nothing, benefit'],
    ['few choose to pay', 'each gains by waiting'],
    ['revenue falls short', 'below what provision costs'],
    ['it MAY NOT be provided', 'which is not the same as cannot'],
  ],
  colours: [[INK, MUTED], [INK, MUTED], [INK, MUTED], [INK, MUTED], [INK, AMBER]],
  note: `Read the last row carefully. 3b's own words are "why public goods MAY NOT be provided by the private sector, making reference to the free-rider problem". Under-provision is what the specification says and what an answer should say. Claiming the private sector produces a quantity of zero is a stronger claim than the free-rider argument supports.`,
});

export const publicGoodsDiagram = {
  id: id('diagram', 'public goods and the free-rider problem'),
  title: 'Public Goods and the Free-Rider Problem',
  kind: 'table',
  description: `IAL 1.3.5 · 3a asks for the distinction between private goods (rival and excludable) and public goods (non-rival and non-excludable); 3b asks why public goods may not be provided by the private sector, making reference to the free-rider problem.`,
  scenarios: [
    { label: 'The two tests', svg: goodsView() },
    { label: 'The free-rider problem', svg: freeRiderView() },
  ],
};

/* ══ 6 · Imperfect market information (1.3.5 · 4) ═══════════════════════════ */

export const INFO_CONTEXTS = [
  ['Healthcare', 'the adviser knows more', 'treatment', 'the person recommending a treatment understands it far better than the patient choosing it, and may also be the person paid for it'],
  ['Education', 'the gain is years away', 'courses taken', 'the return on a course arrives years after the choice is made, so it is hard to weigh against a cost paid today'],
  ['Pensions', 'the cost is decades off', 'saving', 'saving too little has no visible cost for forty years, by which time the choice cannot be remade'],
  ['Insurance', 'the buyer knows the risk', 'cover and premiums', 'the buyer knows their own risk better than the insurer, so a premium set for the average fits almost nobody'],
];

const symmetryView = () => gridSvg({
  title: 'Symmetric and asymmetric information',
  headers: ['', 'Who knows what', 'What it does'],
  rows: [
    ['Symmetric', 'both know the same', 'the choice fits the facts'],
    ['Asymmetric', 'one side knows more', 'one side chooses blind'],
    ['Information gap', 'nobody knows enough', 'both may choose badly'],
  ],
  colours: [[INK, GREEN, MUTED], [INK, RED, MUTED], [INK, AMBER, MUTED]],
  note: `4a asks for a distinction, so both halves are needed. And symmetric is not the same as complete: both sides can be equally badly informed, which is the third row and what 4b calls an information gap.`,
});

const infoContextsView = () => gridSvg({
  title: 'Where imperfect information misallocates resources (4c)',
  headers: ['Context', 'The gap', 'What is misallocated'],
  rows: INFO_CONTEXTS.map(([c, gap, out]) => [c, gap, out]),
  note: `4c names these four by name. The mechanism in each: ${INFO_CONTEXTS.map(([c, , , how]) => `${c.toLowerCase()} — ${how}`).join('; ')}. Naming a context is not the same as being able to answer on it: what a question wants is the mechanism, which is why each row carries one.`,
});

export const informationDiagram = {
  id: id('diagram', 'imperfect market information'),
  title: 'Imperfect Market Information',
  kind: 'table',
  description: `IAL 1.3.5 · 4a asks for the distinction between symmetric and asymmetric information, 4b for the significance of information gaps, and 4c for how imperfect market information may lead to a misallocation of resources in healthcare, education, pensions and insurance.`,
  scenarios: [
    { label: 'Symmetric and asymmetric', svg: symmetryView() },
    { label: 'The four contexts', svg: infoContextsView() },
  ],
};

/* ══ 7 · Moral hazard (1.3.5 · 5) ══════════════════════════════════════════ */
/*
 * The one the audit told this packet to DELETE. `moral hazard` is five hits in econ_spec.txt and
 * 1.3.5 · 5 is a sub-topic of this section with three leaves; specGap-06 and topFix-04 both file it
 * under "WEC14 Unit 4". Obeying would have removed a requirement the section was already failing.
 * `adverse selection`, which the same findings name in the same breath, IS zero and is gone.
 */
export const MORAL_HAZARD_IMPACT = [
  ['Consumers', 'less care once covered', 'premiums rise'],
  ['Producers', 'more risk is taken', 'losses spread'],
  ['Workers', 'their firm is exposed', 'jobs lost'],
  ['Governments', 'a rescue is expected', 'the next one too'],
];

const howMoralHazardView = () => gridSvg({
  title: 'How moral hazard occurs (5a)',
  headers: ['Step', 'What follows'],
  rows: [
    ['Someone bears a risk', 'so they take care'],
    ['The risk becomes covered', 'by insurance or a rescue'],
    ['The cost falls elsewhere', 'so the reason to care weakens'],
    ['Behaviour changes', 'more risk is taken'],
    ['The cover cannot see it', 'so it is priced for the old care'],
  ],
  colours: [[INK, MUTED], [INK, MUTED], [INK, AMBER], [INK, RED], [INK, RED]],
  note: `The last row is what makes this a market failure rather than a preference: the change in behaviour is not observed, so it is not priced. If the insurer could see it the premium would move and there would be nothing left to fail. Note also what moral hazard is NOT — it is not dishonesty, and it is not a choice made before the cover is taken out. It is care that weakens after the cost stops falling on the person taking the risk.`,
});

const moralHazardImpactView = () => gridSvg({
  title: 'The impact in insurance and banking (5b)',
  headers: ['On', 'What changes', 'What it costs'],
  rows: MORAL_HAZARD_IMPACT.map((r) => r),
  note: `5b asks for the impact on consumers, producers, workers and governments in insurance and in banking. Those four groups are the specification's own list, and a question can ask for any of them — so an answer that reaches only "premiums go up" has answered one row of four. In insurance the cover is the policy; in banking it is the expectation that a failing bank will be rescued, which is cover nobody bought and nobody priced.`,
});

export const moralHazardDiagram = {
  id: id('diagram', 'moral hazard'),
  title: 'Moral Hazard',
  kind: 'table',
  description: `IAL 1.3.5 · 5a asks how moral hazard can occur and 5b for its impact on consumers, producers, workers and governments in insurance and banking. Moral hazard is a sub-topic of this section, not of a later unit.`,
  scenarios: [
    { label: 'How it occurs', svg: howMoralHazardView() },
    { label: 'Who it falls on', svg: moralHazardImpactView() },
  ],
};

/* ══ 8 · Speculation and market bubbles (1.3.5 · 6) ═════════════════════════ */
/*
 * Absent from the March section entirely: `speculation` and `bubble` are zero hits across all eight of
 * its tables. It is a whole spec sub-topic with three leaves and NO ledger item names it — the audit
 * could not see it, because an audit reads what is there. This is the one gap Layer 3 exists for.
 *
 * The curve is drawn rather than tabulated because the shape IS the content: 6a asks how a bubble
 * arises, and what distinguishes it from an ordinary price rise is that the rise becomes the reason
 * for the rise. The path below is a pure illustration and carries no dates and no figures, so there
 * is no year, no index and no claim about a real market anywhere in it.
 */
const BUBBLE_PLOT = { x0: 70, x1: 460, yTop: 60, yBot: 290 };
export const BUBBLE_STAGES = [
  ['A rise begins', 'something real changes: more buyers, or less of the thing'],
  ['Buyers arrive for the rise', 'people buy expecting to sell higher, not for the thing itself'],
  ['The rise becomes the reason', 'the price now moves on expectations of itself'],
  ['Doubt arrives', 'buying on the rise needs a further rise, and it stops'],
  ['The fall feeds itself', 'selling to get out pushes the price down, which prompts more selling'],
];
/* A path in arbitrary units on both axes: the shape carries the meaning, no figure does. */
const BUBBLE_PATH = [[0, 20], [14, 26], [28, 38], [42, 62], [54, 88], [62, 96], [70, 72], [78, 44], [88, 28], [100, 24]];
const bx = (u) => r2(BUBBLE_PLOT.x0 + (u / 100) * (BUBBLE_PLOT.x1 - BUBBLE_PLOT.x0));
const by = (v) => r2(BUBBLE_PLOT.yBot - (v / 100) * (BUBBLE_PLOT.yBot - BUBBLE_PLOT.yTop));

const bubbleAxes = () => [
  line(BUBBLE_PLOT.x0, BUBBLE_PLOT.yBot, BUBBLE_PLOT.x1 + 14, BUBBLE_PLOT.yBot, AXIS, 2, ' marker-end="url(#arr)"'),
  line(BUBBLE_PLOT.x0, BUBBLE_PLOT.yBot, BUBBLE_PLOT.x0, BUBBLE_PLOT.yTop - 14, AXIS, 2, ' marker-end="url(#arr)"'),
  t(BUBBLE_PLOT.x0, BUBBLE_PLOT.yBot + 30, 'Time', { size: 9, fill: MUTED }),
  t(BUBBLE_PLOT.x0, BUBBLE_PLOT.yTop - 32, 'Price', { size: 9, fill: MUTED }),
].join('');

const bubblePath = () => BUBBLE_PATH.slice(1).map((pt, i) => {
  const prev = BUBBLE_PATH[i];
  const rising = pt[1] >= prev[1];
  return line(bx(prev[0]), by(prev[1]), bx(pt[0]), by(pt[1]), rising ? AMBER : RED, 3);
}).join('');

const BUBBLE_RISE_CAPTION = `A bubble is not simply a high price. It is a price that has stopped being about what the thing is worth: people buy because it is rising, so the rise becomes its own cause. The dashed line is what the thing is worth to somebody who wants to use it \u2014 a home to live in, a share for the profits it pays. Speculation is buying in the expectation of reselling higher, and 6a asks how a price that has left that line arises.`;
const bubbleRiseView = () => [
  open(captionedHeight(BUBBLE_PLOT.yBot + 50, BUBBLE_RISE_CAPTION), 500), bubbleAxes(),
  t(26, 34, 'How a market bubble arises', { size: 13, weight: 600 }),
  bubblePath(),
  line(BUBBLE_PLOT.x0, by(24), BUBBLE_PLOT.x1, by(24), GREEN, 1.5, ' stroke-dasharray="6 4"'),
  t(BUBBLE_PLOT.x1 + 2, by(24) + 4, 'value', { size: 10, fill: GREEN, weight: 600, anchor: 'end' }),
  dot(bx(62), by(96), RED, 5),
  t(bx(62), by(96) - 10, 'the price is now far above the value', { size: 10, fill: RED, weight: 600, anchor: 'middle' }),
  wrap(26, BUBBLE_PLOT.yBot + 50, BUBBLE_RISE_CAPTION, { frame: 500 }),
  close,
].join('');

const BUBBLE_BURST_CAPTION = `The fall is not the mirror image of the rise. Anyone who bought near the top holds something worth less than they paid and may owe more than it is worth; a producer who expanded to meet the demand is left with capacity nobody wants; workers in that industry lose jobs; and a government meets the cost of the failures. 6b asks for that impact in housing and in stocks and shares, on all four groups.`;
const bubbleBurstView = () => {
  const marks = [[14, 'a real change'], [42, 'buyers arrive for the rise'], [62, 'the rise is the reason'], [78, 'selling feeds selling']];
  return [
    open(captionedHeight(BUBBLE_PLOT.yBot + 50, BUBBLE_BURST_CAPTION), 500), bubbleAxes(),
    t(26, 34, 'And what it costs when it bursts', { size: 13, weight: 600 }),
    bubblePath(),
    line(BUBBLE_PLOT.x0, by(24), BUBBLE_PLOT.x1, by(24), GREEN, 1.5, ' stroke-dasharray="6 4"'),
    t(BUBBLE_PLOT.x1 + 2, by(24) + 4, 'value', { size: 10, fill: GREEN, weight: 600, anchor: 'end' }),
    marks.map(([u, label], i) => [
      dot(bx(u), by(BUBBLE_PATH.find((p) => p[0] === u)[1]), i < 3 ? AMBER : RED, 4),
      t(bx(u), BUBBLE_PLOT.yTop - 6 + i * 13, label, { size: 10, fill: i < 3 ? AMBER : RED, anchor: 'middle' }),
    ].join('')).join(''),
    wrap(26, BUBBLE_PLOT.yBot + 50, BUBBLE_BURST_CAPTION, { frame: 500 }),
    close,
  ].join('');
};

export const bubblesDiagram = {
  id: id('diagram', 'speculation and market bubbles'),
  title: 'Speculation and Market Bubbles',
  description: `IAL 1.3.5 · 6a asks how market bubbles may arise and 6b for their impact on consumers, producers, workers and governments in housing and in stocks and shares. The path carries no dates and no figures: the shape is the content.`,
  scenarios: [
    { label: 'How a bubble arises', svg: bubbleRiseView() },
    { label: 'What the burst costs', svg: bubbleBurstView() },
  ],
};

export const DIAGRAMS = [
  sourcesDiagram, identitiesDiagram, marginalDiagram, contextsDiagram,
  publicGoodsDiagram, informationDiagram, moralHazardDiagram, bubblesDiagram,
];
