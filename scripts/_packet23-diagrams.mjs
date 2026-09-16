/**
 * PACKET 23 — supply: five diagrams, one per chapter, each pinned by the BLOCK's `diagramId`.
 *
 * The March section had three, and a student saw ONE of them. Only `content[0]` carried a
 * `diagramRef` (structure-02), so "PES: Visual Comparison" and "PES Over Time" — the two that carry
 * the specification's whole PES half, and both well drawn — reached no surface at all. A diagram
 * reaches a student only from a block's `diagramId`, at that chapter's check-in
 * (lib/learn-steps.js:44-55); `diagramRef` is the legacy string pin.
 *
 * Two of the five are TABLES and declare `kind: 'table'`, which drops the "What a correct diagram
 * shows" checklist (nobody reproduces a lookup table in an exam) and the graph width cap. A body
 * cannot hold a table — `schema.body-type` allows paragraph, subheading, flow and bullets only — so
 * a diagram is the only surface in the schema that can carry a grid. `diagram.table-legible` is
 * BLOCK and measures the smallest cell in the 800px column the card gives it, so on the 560-unit
 * grid frame nothing may be authored below 9 units (9 × 800/560 = 12.9px).
 *
 * EVERY CURVE HERE IS A FUNCTION, NOT A DRAWING. The two supply lines are Qs = 30P + 160 and
 * Qs = 120P − 560, derived in _packet23-util.mjs from Kavira Ceramics' own two points, and the
 * taxed and subsidised curves are those functions with the tax or subsidy substituted. The runner
 * re-derives every plotted endpoint from the emitted SVG and refuses to stage on a disagreement
 * (packet 15's accuracy-01 rule), so a figure that changes in the body and not in a diagram fails
 * the build.
 */
import { id, money, pc, qty, pesStr, round2, P0, P1, Q0, Q_SR, Q_LR, PCT_P, PCT_Q_SR, PCT_Q_LR, PES_SR, PES_LR, SR, LR, qAt, pAt, SPECIFIC_TAX, AD_VALOREM, SUBSIDY, adValoremGap } from './_packet23-util.mjs';

const INK = '#e8ecf5', AXIS = '#94a3b8', GRID = '#475569', MUTED = '#7a8299';
const BLUE = '#3b82f6', GREEN = '#059669', RED = '#ef4444', AMBER = '#f59e0b', PURPLE = '#8b5cf6';

export const r2 = (n) => Math.round(n * 100) / 100;

const open = (h = 400, w = 500) => `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',system-ui,sans-serif;background:transparent"><defs><marker id="arr" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="${AXIS}"/></marker></defs>`;
const close = '</svg>';
const t = (x, y, text, { size = 10, fill = INK, anchor = 'start', weight = 400 } = {}) =>
  `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${text}</text>`;
const line = (x1, y1, x2, y2, stroke, w = 2, extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${w}"${extra}/>`;
const dot = (x, y, fill, r = 4) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;

/*
 * SVG text does not wrap, so a caption longer than its frame simply runs off the side — invisible to
 * the schema, to the validator and to a reading of the source. `wrap` breaks one at a width measured
 * in the same 0.65em units the runner's overlap guard uses, and emits one <text> per line.
 */
const wrap = (x, y, text, { size = 10, fill = MUTED, frame = 500, lead = 14 } = {}) => {
  const max = Math.floor((frame - 2 - x) / (size * 0.65));
  const lines = [];
  let line = '';
  for (const word of String(text).split(' ')) {
    if (line && (line + ' ' + word).length > max) { lines.push(line); line = word; } else line = line ? `${line} ${word}` : word;
  }
  if (line) lines.push(line);
  return lines.map((l, i) => t(x, r2(y + i * lead), l, { size, fill })).join('');
};

/* ── one plot frame for every curve diagram ────────────────────────────────── */
/*
 * Price runs 0-20 dollars and quantity 0-800 tiles in every view, so a curve drawn in one is
 * comparable with the same curve drawn in another — the whole point of showing a shift.
 *
 * The ceiling is 20 rather than 14 because of a measurement, not a preference: the ad valorem view
 * marks its second gap at 640 tiles, where the short-run curve needs $16 and the taxed curve $19.20.
 * At pMax 14 that marker was drawn at y = -42.86 — off the top of the canvas, so the second of the
 * two measurements the panel exists to make was invisible. Layer 6 found it; the runner now has a
 * canvas-bounds check so it cannot recur silently.
 */
export const PLOT = { x0: 70, x1: 450, yTop: 50, yBot: 300, pMax: 20, qMax: 800 };
export const X = (q) => r2(PLOT.x0 + (q / PLOT.qMax) * (PLOT.x1 - PLOT.x0));
export const Y = (p) => r2(PLOT.yBot - (p / PLOT.pMax) * (PLOT.yBot - PLOT.yTop));

const axes = (qLabel = 'Quantity supplied (tiles a week)', pLabel = 'Price ($ a tile)') => [
  line(PLOT.x0, PLOT.yBot, PLOT.x1 + 14, PLOT.yBot, AXIS, 2, ' marker-end="url(#arr)"'),
  line(PLOT.x0, PLOT.yBot, PLOT.x0, PLOT.yTop - 14, AXIS, 2, ' marker-end="url(#arr)"'),
  t(PLOT.x1 + 16, PLOT.yBot + 16, 'Q', { size: 12, fill: AXIS, weight: 600, anchor: 'end' }),
  t(PLOT.x0 - 6, PLOT.yTop - 18, 'P', { size: 12, fill: AXIS, weight: 600, anchor: 'end' }),
  t(PLOT.x0, PLOT.yBot + 32, qLabel, { size: 9, fill: MUTED }),
  t(PLOT.x0, PLOT.yTop - 32, pLabel, { size: 9, fill: MUTED }),
].join('');

/**
 * A supply line drawn across the plot, clipped to the frame. `fn` maps price to quantity, so the
 * line IS the function: nothing here is positioned by hand.
 */
const supplyLine = (fn, colour, { label, labelAt = PLOT.pMax, dash = false } = {}) => {
  // the two ends: where the line leaves the bottom of the frame, and where it leaves the top
  const pLow = fn(0) >= 0 ? 0 : (() => { let p = 0; while (fn(p) < 0 && p < PLOT.pMax) p += 0.001; return round2(p); })();
  const qLow = Math.max(0, r2(fn(pLow)));
  const pHigh = (() => { let p = PLOT.pMax; while (fn(p) > PLOT.qMax && p > 0) p -= 0.001; return round2(p); })();
  const qHigh = r2(fn(pHigh));
  const lp = Math.min(labelAt, pHigh);
  return {
    svg: [line(X(qLow), Y(pLow), X(qHigh), Y(pHigh), colour, 2.5, dash ? ' stroke-dasharray="6 4"' : ''),
      label ? t(X(fn(lp)) + 8, Y(lp) + 4, label, { size: 12, fill: colour, weight: 600 }) : ''].join(''),
    ends: [[X(qLow), Y(pLow)], [X(qHigh), Y(pHigh)]],
  };
};

/** A dashed read-off from a point on a curve to both axes, with the two values printed. */
const readOff = (q, p, colour, { qText = qty(q), pText = money(p) } = {}) => [
  line(PLOT.x0, Y(p), X(q), Y(p), colour, 1.2, ' stroke-dasharray="4 4"'),
  line(X(q), Y(p), X(q), PLOT.yBot, colour, 1.2, ' stroke-dasharray="4 4"'),
  dot(X(q), Y(p), colour),
  t(PLOT.x0 - 6, Y(p) + 4, pText, { size: 10, fill: colour, anchor: 'end', weight: 600 }),
  t(X(q), PLOT.yBot + 15, qText, { size: 10, fill: colour, anchor: 'middle', weight: 600 }),
].join('');

/* ── a shared grid, for the two diagrams that are tables ───────────────────── */
/*
 * The 560-unit frame and the column spacing come from packet 19, where three cells measured with
 * getComputedTextLength() in the browser collided at 500 units. The runner keeps a width guard over
 * it, set from this packet's own browser measurement of all 139 strings in the nine views: 0.8em
 * below four characters and 0.65em at or above it. See the note on estWidth in the runner for why a
 * single figure is the wrong shape for that bound.
 */
export const GRD = { w: 560, x0: 26, y0: 74, rowH: 30, right: 534, cols: [26, 262, 442] };
export const gridRowY = (i) => r2(GRD.y0 + (i + 1) * GRD.rowH);

export const gridSvg = ({ title, headers, rows, note, colours = [] }) => {
  const head = headers.map((h, c) => t(GRD.cols[c], GRD.y0, h, { size: 11, fill: AXIS, weight: 600, anchor: c === 0 ? 'start' : 'middle' })).join('');
  const body = rows.map((cells, i) => [
    ...cells.map((cell, c) => t(GRD.cols[c], gridRowY(i), cell, { size: 11, fill: c === 0 ? INK : (colours[i]?.[c] || INK), weight: c === 0 ? 600 : 400, anchor: c === 0 ? 'start' : 'middle' })),
    line(GRD.x0, r2(gridRowY(i) + 9), GRD.right, r2(gridRowY(i) + 9), GRID, 1),
  ].join('')).join('');
  const h = Math.max(300, gridRowY(rows.length - 1) + 60);
  return [open(h, GRD.w), t(GRD.x0, 42, title, { size: 13, weight: 600 }), head,
    line(GRD.x0, r2(GRD.y0 + 9), GRD.right, r2(GRD.y0 + 9), AXIS, 2), body,
    wrap(GRD.x0, r2(gridRowY(rows.length - 1) + 36), note, { frame: GRD.w }), close].join('');
};

/* ══ 1 · The supply curve: a movement along it, and a shift of it (block 1) ══ */

const movementAlong = () => {
  const s = supplyLine((p) => qAt(SR, p), BLUE, { label: 'S' });
  return [open(), t(26, 30, 'A movement along the supply curve', { size: 13, weight: 600 }),
    axes(), s.svg,
    readOff(Q0, P0, AMBER), readOff(Q_SR, P1, GREEN),
    t(X(Q_SR) + 14, Y(P1) - 8, 'extension of supply', { size: 10, fill: GREEN, weight: 600 }),
    wrap(26, PLOT.yBot + 50, `The price of a tile ${MOVE_ARROW} from ${money(P0)} to ${money(P1)} and nothing else changes, so the firm moves UP the same curve: ${qty(Q0)} tiles a week become ${qty(Q_SR)}.`),
    close].join('');
};

const shiftOfCurve = () => {
  const s0 = supplyLine((p) => qAt(SR, p), BLUE, { label: 'S' });
  const right = supplyLine((p) => qAt(SR, p) + 120, GREEN, { label: 'S₁', labelAt: 12 });
  const left = supplyLine((p) => Math.max(0, qAt(SR, p) - 120), RED, { label: 'S₂', labelAt: 6 });
  return [open(), t(26, 30, 'A shift of the whole supply curve', { size: 13, weight: 600 }),
    axes(), left.svg, s0.svg, right.svg,
    line(X(320), Y(6), X(440), Y(6), GREEN, 1.5, ' marker-end="url(#arr)"'),
    t(X(320), Y(6) - 8, 'increase in supply', { size: 10, fill: GREEN, weight: 600 }),
    line(X(300), Y(3), X(180), Y(3), RED, 1.5, ' marker-end="url(#arr)"'),
    t(X(300) + 4, Y(3) + 14, 'decrease in supply', { size: 10, fill: RED, weight: 600 }),
    wrap(26, PLOT.yBot + 50, 'The price has not changed. Something else has: at EVERY price the firm now offers more (S₁) or less (S₂) than before.'),
    close].join('');
};

const MOVE_ARROW = 'rises';

export const supplyCurveDiagram = {
  id: id('diagram', 'supply curve movements along and shifts'),
  title: 'Supply: Movements Along the Curve and Shifts of It',
  description: `The one distinction IAL 1.3.3 · 1b asks for, drawn twice. A change in the good's own price moves the firm along the curve it is already on — ${money(P0)} to ${money(P1)} takes Kavira Ceramics from ${qty(Q0)} to ${qty(Q_SR)} tiles a week. A change in anything else moves the curve itself, so a different quantity is offered at every price.`,
  checklist: [
    'Both axes labelled: price on the vertical axis, quantity supplied on the horizontal',
    'The supply curve sloping upward from left to right',
    'A movement shown as two points ON one curve, with both prices and both quantities read off',
    'A shift shown as a SECOND curve, labelled S₁ or S₂, not as a point on the first',
    'The direction named: extension or contraction for a movement, increase or decrease in supply for a shift',
  ],
  scenarios: [
    { label: 'A movement along', svg: movementAlong() },
    { label: 'A shift of the curve', svg: shiftOfCurve() },
  ],
};

/* ══ 2 · What shifts the curve: a specific tax, an ad valorem tax, a subsidy ══ */
/*
 * 1c-3 names BOTH kinds of indirect tax, and the reason it names both is that they move the curve
 * differently: a fixed sum per unit lifts it by the same amount everywhere, and a percentage of
 * price opens a gap that grows as price rises. Drawn from the functions, the difference is visible
 * — the parallel shift keeps its gap at ${SPECIFIC_TAX} dollars, the pivot's gap runs from
 * $1.60 at the bottom of the frame to $3.20 at the top.
 */

const specificTaxView = () => {
  const s0 = supplyLine((p) => qAt(SR, p), BLUE, { label: 'S' });
  // a specific tax of $t: the producer must receive pAt(q), so the buyer pays pAt(q) + t
  const taxed = supplyLine((p) => qAt(SR, p - SPECIFIC_TAX), RED, { label: 'S + tax', labelAt: 12 });
  const gapAt = 400;
  return [open(), t(26, 30, `A specific tax of ${money(SPECIFIC_TAX)} a tile`, { size: 13, weight: 600 }),
    axes(), s0.svg, taxed.svg,
    line(X(gapAt), Y(pAt(SR, gapAt)), X(gapAt), Y(pAt(SR, gapAt) + SPECIFIC_TAX), AMBER, 2),
    t(X(gapAt) + 8, r2((Y(pAt(SR, gapAt)) + Y(pAt(SR, gapAt) + SPECIFIC_TAX)) / 2), money(SPECIFIC_TAX), { size: 11, fill: AMBER, weight: 600 }),
    wrap(26, PLOT.yBot + 50, `The same ${money(SPECIFIC_TAX)} is added at every quantity, so the curve shifts UP by ${money(SPECIFIC_TAX)} and stays parallel to the one it came from.`),
    close].join('');
};

const adValoremView = () => {
  const s0 = supplyLine((p) => qAt(SR, p), BLUE, { label: 'S' });
  // an ad valorem tax of r%: the producer keeps p/(1+r), so Qs = qAt(SR, p/(1+r))
  const taxed = supplyLine((p) => qAt(SR, p / (1 + AD_VALOREM / 100)), PURPLE, { label: `S + ${pc(AD_VALOREM)}`, labelAt: 12 });
  const lo = 400, hi = 640;
  const gap = (q) => [line(X(q), Y(pAt(SR, q)), X(q), Y(pAt(SR, q) + adValoremGap(SR, q)), AMBER, 2),
    t(X(q) + 8, r2((Y(pAt(SR, q)) + Y(pAt(SR, q) + adValoremGap(SR, q))) / 2), money(adValoremGap(SR, q)), { size: 11, fill: AMBER, weight: 600 })].join('');
  return [open(), t(26, 30, `An ad valorem tax of ${pc(AD_VALOREM)} of the price`, { size: 13, weight: 600 }),
    axes(), s0.svg, taxed.svg, gap(lo), gap(hi),
    wrap(26, PLOT.yBot + 50, `The tax is a share of the price, so the gap GROWS as price rises: ${money(adValoremGap(SR, lo))} at ${qty(lo)} tiles and ${money(adValoremGap(SR, hi))} at ${qty(hi)}. The curve pivots rather than shifting parallel.`),
    close].join('');
};

const subsidyView = () => {
  const s0 = supplyLine((p) => qAt(SR, p), BLUE, { label: 'S' });
  const subsidised = supplyLine((p) => qAt(SR, p + SUBSIDY), GREEN, { label: 'S − subsidy', labelAt: 12 });
  const gapAt = 400;
  return [open(), t(26, 30, `A subsidy of ${money(SUBSIDY)} a tile`, { size: 13, weight: 600 }),
    axes(), s0.svg, subsidised.svg,
    line(X(gapAt), Y(pAt(SR, gapAt)), X(gapAt), Y(pAt(SR, gapAt) - SUBSIDY), AMBER, 2),
    t(X(gapAt) + 8, r2((Y(pAt(SR, gapAt)) + Y(pAt(SR, gapAt) - SUBSIDY)) / 2), money(SUBSIDY), { size: 11, fill: AMBER, weight: 600 }),
    wrap(26, PLOT.yBot + 50, `A subsidy is a specific tax in reverse: the producer receives ${money(SUBSIDY)} a tile from the government, so it needs ${money(SUBSIDY)} less from the buyer and the curve shifts DOWN and to the right.`),
    close].join('');
};

export const shiftFactorsDiagram = {
  id: id('diagram', 'what shifts the supply curve tax subsidy'),
  title: 'What Shifts the Supply Curve: Taxes and Subsidies',
  description: `IAL 1.3.3 · 1c-3 names indirect taxes as "specific and ad valorem", and the reason it names both is that they move the curve differently. A specific tax of ${money(SPECIFIC_TAX)} a tile lifts the curve by ${money(SPECIFIC_TAX)} everywhere; an ad valorem tax of ${pc(AD_VALOREM)} opens a gap that grows with price, so the curve pivots. A subsidy (1c-4) does the reverse of a specific tax.`,
  checklist: [
    'The original supply curve labelled S, with the new curve labelled separately',
    'A specific tax drawn as a PARALLEL shift, with the vertical gap equal to the tax per unit',
    'An ad valorem tax drawn as a PIVOT, with the gap wider at higher prices',
    'A subsidy drawn downward and to the right, by the subsidy per unit',
    'The vertical gap measured and labelled with its money value, not just arrowed',
  ],
  scenarios: [
    { label: 'A specific tax', svg: specificTaxView() },
    { label: 'An ad valorem tax', svg: adValoremView() },
    { label: 'A subsidy', svg: subsidyView() },
  ],
};

/* ══ 3 · The five values of PES (block 3) ══════════════════════════════════ */
/*
 * 2b-1 to 2b-5 are five named values, and each has a shape. The March section drew them well and no
 * student ever saw the diagram (structure-02), so the drawing is kept and pinned.
 */

const fiveValues = () => {
  const panelW = 150, panelH = 118, cols = 3;
  const cases = [
    { name: 'Perfectly inelastic', pes: 'PES = 0', draw: 'vertical', colour: RED },
    { name: 'Inelastic', pes: 'PES < 1', draw: 'steep', colour: AMBER },
    { name: 'Unitary elastic', pes: 'PES = 1', draw: 'origin', colour: BLUE },
    { name: 'Elastic', pes: 'PES > 1', draw: 'shallow', colour: GREEN },
    { name: 'Perfectly elastic', pes: 'PES = ∞', draw: 'horizontal', colour: PURPLE },
  ];
  const panel = (c, i) => {
    const px = 26 + (i % cols) * (panelW + 12);
    const py = 60 + Math.floor(i / cols) * (panelH + 46);
    const ax = px + 26, ay = py + panelH - 24, aw = panelW - 44, ah = panelH - 44;
    const curve = {
      vertical: line(ax + aw / 2, ay, ax + aw / 2, ay - ah, c.colour, 2.5),
      steep: line(ax + aw * 0.34, ay, ax + aw * 0.66, ay - ah, c.colour, 2.5),
      origin: line(ax, ay, ax + aw, ay - ah, c.colour, 2.5),
      shallow: line(ax, ay - ah * 0.34, ax + aw, ay - ah * 0.9, c.colour, 2.5),
      horizontal: line(ax, ay - ah / 2, ax + aw, ay - ah / 2, c.colour, 2.5),
    }[c.draw];
    return [line(ax, ay, ax + aw + 6, ay, AXIS, 1.5), line(ax, ay, ax, ay - ah - 6, AXIS, 1.5),
      t(ax - 6, ay - ah - 4, 'P', { size: 9, fill: AXIS, anchor: 'end' }),
      t(ax + aw + 8, ay + 10, 'Q', { size: 9, fill: AXIS, anchor: 'end' }),
      curve,
      t(px + panelW / 2, py + panelH + 14, c.name, { size: 11, fill: INK, anchor: 'middle', weight: 600 }),
      t(px + panelW / 2, py + panelH + 28, c.pes, { size: 10, fill: c.colour, anchor: 'middle', weight: 600 })].join('');
  };
  return [open(420, 526), t(26, 30, 'The five values the specification names', { size: 13, weight: 600 }),
    cases.map(panel).join(''),
    wrap(26, 400, 'A unitary elastic supply curve is any straight line through the origin, whatever its slope.', { frame: 526 }),
    close].join('');
};

const kaviraTwoCurves = () => {
  const sr = supplyLine((p) => qAt(SR, p), AMBER, { label: 'S short run', labelAt: 12 });
  const lr = supplyLine((p) => qAt(LR, p), GREEN, { label: 'S long run', labelAt: 10.4 });
  return [open(), t(26, 30, 'The same firm, two time horizons', { size: 13, weight: 600 }),
    axes(), sr.svg, lr.svg,
    readOff(Q0, P0, AXIS),
    dot(X(Q_SR), Y(P1), AMBER), dot(X(Q_LR), Y(P1), GREEN),
    line(PLOT.x0, Y(P1), X(Q_LR), Y(P1), AXIS, 1.2, ' stroke-dasharray="4 4"'),
    t(PLOT.x0 - 6, Y(P1) + 4, money(P1), { size: 10, fill: AXIS, anchor: 'end', weight: 600 }),
    t(X(Q_SR), PLOT.yBot + 15, qty(Q_SR), { size: 10, fill: AMBER, anchor: 'middle', weight: 600 }),
    t(X(Q_LR), PLOT.yBot + 15, qty(Q_LR), { size: 10, fill: GREEN, anchor: 'middle', weight: 600 }),
    wrap(26, PLOT.yBot + 50, `Both curves pass through ${qty(Q0)} tiles at ${money(P0)}. The same rise to ${money(P1)} reaches ${qty(Q_SR)} with one kiln and ${qty(Q_LR)} once a second is running: PES ${pesStr(PES_SR())} against ${pesStr(PES_LR())}.`),
    close].join('');
};

export const pesValuesDiagram = {
  id: id('diagram', 'price elasticity of supply five values'),
  title: 'Price Elasticity of Supply: The Five Values',
  description: `The five values IAL 1.3.3 · 2b names, each with the shape it gives the curve, and then the same contrast in one firm's own figures: Kavira Ceramics' supply is inelastic with one kiln (PES ${pesStr(PES_SR())}) and elastic with two (PES ${pesStr(PES_LR())}).`,
  checklist: [
    'Price on the vertical axis and quantity supplied on the horizontal in every panel',
    'Perfectly inelastic drawn vertical, perfectly elastic drawn horizontal',
    'Unitary elastic drawn as a straight line through the origin',
    'The elastic curve flatter than the inelastic one, both sloping upward',
    'Each panel labelled with its PES value, not only its name',
  ],
  scenarios: [
    { label: 'The five values', svg: fiveValues() },
    { label: "Kavira's two curves", svg: kaviraTwoCurves() },
  ],
};

/* ══ 4 · What determines PES — a table (block 4) ═══════════════════════════ */
/*
 * The five factors of 2c, each named in the specification exactly ONCE (econ_spec.txt:679-683) and
 * explained nowhere in it. specThin-01 and specThin-02 are the two the audit caught — perishability
 * and legal constraints — but the whole list is named-and-not-explained, so the table gives each one
 * the two cases that make it a determinant rather than a word.
 */

export const pesDeterminantsDiagram = {
  id: id('diagram', 'what determines price elasticity of supply'),
  title: 'What Determines Price Elasticity of Supply',
  kind: 'table',
  description: 'The five factors IAL 1.3.3 · 2c names, each with the case that makes supply elastic and the case that makes it inelastic. The specification names all five and explains none of them.',
  scenarios: [{
    label: 'The five determinants',
    svg: gridSvg({
      title: 'The five factors, and what each does to PES',
      headers: ['Factor (2c)', 'Supply is ELASTIC when', 'Supply is INELASTIC when'],
      rows: [
        ['The time period', 'More time to respond', 'The response must be now'],
        ['Stock / perishability', 'Output stores well', 'Output perishes quickly'],
        ['Mobility of factors', 'Factors switch use easily', 'Factors are specialised'],
        ['Legal constraints', 'No permit caps output', 'A licence caps output'],
        ['Capacity', 'Spare capacity is idle', 'Already at full capacity'],
      ],
      colours: Array(5).fill([INK, GREEN, RED]),
      note: 'Every factor is a question about whether the firm CAN respond, not whether it wants to.',
    }),
  }],
};

/* ══ 5 · One price rise, two time horizons — a table (block 5) ═════════════ */
/*
 * Leaf 2d, which the March section replaced with Unit 3 costs material. The arithmetic is the whole
 * leaf: same firm, same price rise, same starting output, two answers. Every cell below is
 * generated from the figures in _packet23-util.mjs.
 */

export const shortLongRunDiagram = {
  id: id('diagram', 'one price rise two time horizons pes'),
  title: 'One Price Rise, Two Time Horizons',
  kind: 'table',
  description: `IAL 1.3.3 · 2d asks what the short run and long run mean for price elasticity of supply. Kavira Ceramics' answer: the same rise from ${money(P0)} to ${money(P1)} gives PES ${pesStr(PES_SR())} with one kiln and PES ${pesStr(PES_LR())} once a second kiln is running.`,
  scenarios: [{
    label: 'The two calculations',
    svg: gridSvg({
      title: `${money(P0)} to ${money(P1)} a tile, worked twice`,
      headers: ['', 'Short run (one kiln)', 'Long run (second kiln)'],
      rows: [
        ['Price', `${money(P0)} → ${money(P1)}`, `${money(P0)} → ${money(P1)}`],
        ['Quantity supplied', `${qty(Q0)} → ${qty(Q_SR)}`, `${qty(Q0)} → ${qty(Q_LR)}`],
        ['% change in quantity', `+${pc(PCT_Q_SR())}`, `+${pc(PCT_Q_LR())}`],
        ['% change in price', `+${pc(PCT_P())}`, `+${pc(PCT_P())}`],
        ['PES', pesStr(PES_SR()), pesStr(PES_LR())],
        ['Supply is', 'inelastic', 'elastic'],
      ],
      colours: [[INK, INK, INK], [INK, INK, INK], [INK, AMBER, GREEN], [INK, INK, INK], [INK, AMBER, GREEN], [INK, AMBER, GREEN]],
      note: 'Only the time available to respond differs. Nothing about the price change or the firm has changed.',
    }),
  }],
};

export const DIAGRAMS = [supplyCurveDiagram, shiftFactorsDiagram, pesValuesDiagram, pesDeterminantsDiagram, shortLongRunDiagram];
