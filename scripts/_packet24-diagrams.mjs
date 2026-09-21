/**
 * PACKET 24 — price-determination: six diagrams, one per chapter, each pinned by the BLOCK's
 * `diagramId`.
 *
 * The March section had two, and a student saw neither where it was needed. `diagramRef` strings
 * "Indirect Tax" and "Subsidy" were matched by substring against the titles of the only two diagrams
 * that existed — "Supply & Demand Equilibrium" and "Consumer & Producer Surplus" — so blocks 4 and 5
 * rendered nothing at all (structure-01, diagram-01, diagram-02), while three `examMatters` told the
 * student a tax or subsidy diagram was compulsory. A diagram reaches a student only from a block's
 * `diagramId`, at that chapter's check-in (lib/learn-steps.js:44-55).
 *
 * TWO OF THE SIX ARE TABLES and declare `kind: 'table'`, which drops the "What a correct diagram
 * shows" checklist (nobody reproduces a lookup table in an exam) and the graph width cap. The rule
 * that decides which is which is the validator's own and it reads every scenario of a diagram as one
 * string, so a grid bolted beside a drawn curve makes the WHOLE diagram a table: the schedule and the
 * market-type comparison are therefore diagrams in their own right rather than panels on a drawing.
 *
 * EVERY CURVE HERE IS A FUNCTION, NOT A DRAWING. Both lines come from _packet24-util.mjs —
 * Qd = 1100 − 50P and Qs = 100P − 400 — and every shifted, taxed and subsidised curve is one of those
 * two functions with the shift substituted. The runner re-derives every plotted point and every
 * printed figure from the emitted SVG and refuses to stage on a disagreement (packet 15's accuracy-01
 * rule), so a number that changes in the body and not in a diagram fails the build.
 */
import {
  id, money, pc, qty, round2,
  DEMAND, SUPPLY, q, p, CHOKE, FOOT, P_EQ, Q_EQ, CS, PS,
  P_LOW, P_HIGH, EXCESS_DEMAND, EXCESS_SUPPLY,
  DEMAND_RISE, DEMAND_FALL, SUPPLY_RISE, SUPPLY_FALL, SUPPLY_SHIFT,
  TAX, SUBSIDY, AD_VALOREM, TAXED, SUBSIDISED, adValoremGap, AV_LOW_Q, AV_HIGH_Q, AV_GAP_LOW, AV_GAP_HIGH,
} from './_packet24-util.mjs';

const INK = '#e8ecf5', AXIS = '#94a3b8', GRID = '#475569', MUTED = '#7a8299';
const BLUE = '#3b82f6', GREEN = '#059669', RED = '#ef4444', AMBER = '#f59e0b', PURPLE = '#8b5cf6';

export const r2 = round2;

const open = (h = 400, w = 500) => `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',system-ui,sans-serif;background:transparent"><defs><marker id="arr" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="${AXIS}"/></marker></defs>`;
const close = '</svg>';
const t = (x, y, text, { size = 10, fill = INK, anchor = 'start', weight = 400 } = {}) =>
  `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${text}</text>`;
const line = (x1, y1, x2, y2, stroke, w = 2, extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${w}"${extra}/>`;
const dot = (x, y, fill, r = 4) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;
const poly = (points, fill, opacity = 0.18) => `<polygon points="${points.map(([x, y]) => `${x},${y}`).join(' ')}" fill="${fill}" fill-opacity="${opacity}"/>`;
const rect = (x1, y1, x2, y2, fill, opacity = 0.22) => `<rect x="${Math.min(x1, x2)}" y="${Math.min(y1, y2)}" width="${Math.abs(x2 - x1)}" height="${Math.abs(y2 - y1)}" fill="${fill}" fill-opacity="${opacity}"/>`;

/*
 * SVG text does not wrap, so a caption longer than its frame simply runs off the side — invisible to
 * the schema, to the validator and to a reading of the source. `wrap` breaks one at a width measured
 * in the same 0.65em units the runner's overlap guard uses, and emits one <text> per line.
 *
 * Each wrapped line is emitted at a DIFFERENT x offset by one unit per line, which is not decoration:
 * the validator groups <text> by y and counts rows that share the same x positions, and a four-line
 * caption sitting under a drawn curve would otherwise read as a four-row grid and pull a drawing into
 * `diagram.table-kind`. A caption is not a table, and this keeps the measure honest rather than
 * silencing it.
 */
const wrapLines = (text, { size = 10, frame = 500, x = 26 } = {}) => {
  const max = Math.floor((frame - 2 - x) / (size * 0.65));
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

/* ── one plot frame for every curve diagram ────────────────────────────────── */
/*
 * Price runs 0-24 dollars and quantity 0-1200 cylinders in EVERY drawn view, so a curve in one panel
 * is comparable with the same curve in another — which is the whole point of showing a shift. The
 * ceiling is 24 rather than 14 because the demand curve's choke price is $22: a frame that cut it off
 * would hide the top vertex of the consumer surplus triangle, which is the one thing chapter 3 asks
 * the student to see.
 */
export const PLOT = { x0: 70, x1: 450, yTop: 50, yBot: 300, pMax: 24, qMax: 1200 };
export const X = (quantity) => r2(PLOT.x0 + (quantity / PLOT.qMax) * (PLOT.x1 - PLOT.x0));
export const Y = (price) => r2(PLOT.yBot - (price / PLOT.pMax) * (PLOT.yBot - PLOT.yTop));

const axes = () => [
  line(PLOT.x0, PLOT.yBot, PLOT.x1 + 14, PLOT.yBot, AXIS, 2, ' marker-end="url(#arr)"'),
  line(PLOT.x0, PLOT.yBot, PLOT.x0, PLOT.yTop - 14, AXIS, 2, ' marker-end="url(#arr)"'),
  t(PLOT.x1 + 16, PLOT.yBot + 16, 'Q', { size: 12, fill: AXIS, weight: 600, anchor: 'end' }),
  t(PLOT.x0 - 6, PLOT.yTop - 18, 'P', { size: 12, fill: AXIS, weight: 600, anchor: 'end' }),
  t(PLOT.x0, PLOT.yBot + 32, 'Quantity (cylinders a day)', { size: 9, fill: MUTED }),
  t(PLOT.x0, PLOT.yTop - 32, 'Price ($ a cylinder)', { size: 9, fill: MUTED }),
].join('');

/**
 * A straight line drawn across the plot and clipped to the frame. `fn` maps price to quantity, so the
 * line IS the function: nothing here is positioned by hand. Returns its two endpoints as well as its
 * markup, which is what lets the runner re-derive the geometry from the emitted SVG.
 */
const curve = (fn, colour, { label, labelAt, dash = false } = {}) => {
  const inFrame = (price) => { const quantity = fn(price); return quantity >= 0 && quantity <= PLOT.qMax; };
  const edge = (from, to) => { // walk to the frame boundary in cent-of-a-dollar steps
    let a = from, b = to;
    for (let i = 0; i < 60; i += 1) { const m = (a + b) / 2; if (inFrame(m)) a = m; else b = m; }
    return round2(a);
  };
  const lo = inFrame(0) ? 0 : edge(PLOT.pMax, 0);
  const hi = inFrame(PLOT.pMax) ? PLOT.pMax : edge(lo, PLOT.pMax);
  const [pA, pB] = [Math.min(lo, hi), Math.max(lo, hi)];
  const lp = labelAt == null ? pB : Math.min(labelAt, pB);
  const ends = [[X(round2(fn(pA))), Y(pA)], [X(round2(fn(pB))), Y(pB)]];
  return {
    svg: [line(ends[0][0], ends[0][1], ends[1][0], ends[1][1], colour, 2.5, dash ? ' stroke-dasharray="6 4"' : ''),
      label ? t(X(round2(fn(lp))) + 8, Y(lp) + 4, label, { size: 12, fill: colour, weight: 600 }) : ''].join(''),
    ends,
  };
};

const demandAt = (shift = 0) => (price) => q(DEMAND, price) + shift;
const supplyAt = (lift = 0) => (price) => q(SUPPLY, price - lift);

/** A dashed read-off from a point to both axes, with the two values printed against them. */
const readOff = (quantity, price, colour, { qText, pText } = {}) => [
  line(PLOT.x0, Y(price), X(quantity), Y(price), colour, 1.2, ' stroke-dasharray="4 4"'),
  line(X(quantity), Y(price), X(quantity), PLOT.yBot, colour, 1.2, ' stroke-dasharray="4 4"'),
  dot(X(quantity), Y(price), colour),
  t(PLOT.x0 - 6, Y(price) + 4, pText ?? money(price), { size: 10, fill: colour, anchor: 'end', weight: 600 }),
  t(X(quantity), PLOT.yBot + 15, qText ?? qty(quantity), { size: 10, fill: colour, anchor: 'middle', weight: 600 }),
].join('');

/* ── a shared grid, for the two diagrams that are tables ───────────────────── */
/*
 * The 560-unit frame comes from packet 19, where three cells measured with getComputedTextLength() in
 * the browser collided at 500 units. `diagram.table-legible` is BLOCK and measures the smallest cell
 * in the 800px column the card gives it, so on a 560-unit frame nothing may be authored below 9 units
 * (9 × 800/560 = 12.9px). Every cell here is 11.
 */
export const GRD = { w: 560, x0: 26, y0: 78, rowH: 30, right: 534 };
export const gridRowY = (i) => r2(GRD.y0 + (i + 1) * GRD.rowH);

export const gridSvg = ({ title, note, headers, rows, cols, colours = [] }) => {
  const head = headers.map((h, c) => t(cols[c], GRD.y0, h, { size: 11, fill: AXIS, weight: 600, anchor: c === 0 ? 'start' : 'middle' })).join('');
  const body = rows.map((cells, i) => [
    ...cells.map((cell, c) => t(cols[c], gridRowY(i), cell, { size: 11, fill: c === 0 ? INK : (colours[i]?.[c] || INK), weight: c === 0 ? 600 : 400, anchor: c === 0 ? 'start' : 'middle' })),
    line(GRD.x0, r2(gridRowY(i) + 9), GRD.right, r2(gridRowY(i) + 9), GRID, 1),
  ].join('')).join('');
  // Sized from the note's ACTUAL wrapped height, not a guess: a three-line note under a table was
  // drawn 14 units below the bottom of the frame, and an SVG says nothing about text that overflows it.
  const noteLines = note ? wrapLines(note, { frame: GRD.w, x: GRD.x0 }).length : 0;
  const h = r2(gridRowY(rows.length - 1) + 26 + (noteLines ? 8 + noteLines * 14 : 0));
  return [open(h, GRD.w), t(GRD.x0, 34, title, { size: 13, weight: 600 }),
    line(GRD.x0, r2(GRD.y0 + 9), GRD.right, r2(GRD.y0 + 9), AXIS, 1.5), head, body,
    note ? wrap(GRD.x0, r2(gridRowY(rows.length - 1) + 34), note, { frame: GRD.w }) : '',
    close].join('');
};

/* ══ 1 · Finding the equilibrium: the schedule, and the four cases ══════════ */
/*
 * Leaf 1a asks how equilibrium price and quantity "are determined", and a schedule answers that in a
 * way a drawing cannot: the student reads two columns, finds the one row where they agree, and sees
 * that every other row has a gap. The pressure column is 1c arriving early — the gap has a sign, and
 * the sign is what moves the price.
 */
const PRICES = [4, 7, 10, 13, 16];

const scheduleView = () => gridSvg({
  title: 'The Sabaya cylinder market, one day',
  headers: ['Price', 'Buyers want', 'Sellers offer', 'Gap', 'Pressure on price'],
  cols: [26, 176, 286, 386, 476],
  rows: PRICES.map((price) => {
    const qd = q(DEMAND, price), qs = q(SUPPLY, price);
    const gap = round2(qd - qs);
    return [money(price), qty(qd), qty(qs), gap === 0 ? '—' : qty(Math.abs(gap)), gap > 0 ? 'upward' : gap < 0 ? 'downward' : 'none'];
  }),
  colours: PRICES.map((price) => {
    const gap = round2(q(DEMAND, price) - q(SUPPLY, price));
    const c = gap > 0 ? RED : gap < 0 ? BLUE : GREEN;
    return [INK, c, c, c, c];
  }),
  note: `One row has no gap: at ${money(P_EQ)} buyers want exactly the ${qty(Q_EQ)} cylinders sellers offer. That is the equilibrium, and it is the only price at which nobody is left disappointed on either side.`,
});

const fourCasesView = () => gridSvg({
  title: 'What a shift does to the equilibrium',
  headers: ['What shifts', 'Price', 'Quantity', 'New equilibrium'],
  cols: [26, 236, 336, 456],
  rows: [DEMAND_RISE, DEMAND_FALL, SUPPLY_RISE, SUPPLY_FALL].map((c) => [
    c.label,
    c.price > P_EQ ? 'rises' : 'falls',
    c.quantity > Q_EQ ? 'rises' : 'falls',
    `${money(c.price)} · ${qty(c.quantity)}`,
  ]),
  colours: [DEMAND_RISE, DEMAND_FALL, SUPPLY_RISE, SUPPLY_FALL].map((c) => [INK, c.price > P_EQ ? RED : BLUE, c.quantity > Q_EQ ? GREEN : RED, INK]),
  note: `A demand shift moves price and quantity the SAME way; a supply shift moves them OPPOSITE ways. That is the whole of 1.3.4 · 1b, and it is why naming which curve moved is the first thing an answer has to do.`,
});

export const equilibriumTableDiagram = {
  id: id('diagram', 'equilibrium schedule and the four shift cases'),
  title: 'Finding the Equilibrium: the Schedule and the Four Cases',
  kind: 'table',
  description: `IAL 1.3.4 · 1a asks how equilibrium price and quantity are determined. Read down the two quantity columns: at ${money(P_EQ)} they agree at ${qty(Q_EQ)} cylinders, and at every other price they do not. The second table is 1.3.4 · 1b — which way price and quantity move when one curve shifts, worked from the same two schedules.`,
  scenarios: [
    { label: 'The schedule', svg: scheduleView() },
    { label: 'The four shift cases', svg: fourCasesView() },
  ],
};

/* ══ 2 · The market out of equilibrium, and moved out of it ═════════════════ */

const baseCurves = ({ dShift = 0, sLift = 0, dLabel = 'D', sLabel = 'S', faded = false } = {}) => {
  const d0 = curve(demandAt(0), BLUE, { label: faded ? 'D₁' : dLabel, labelAt: 3, dash: false });
  const s0 = curve(supplyAt(0), GREEN, { label: faded ? 'S₁' : sLabel, labelAt: PLOT.pMax - 2 });
  const parts = [d0, s0];
  if (dShift) parts.push(curve(demandAt(dShift), PURPLE, { label: 'D₂', labelAt: 3 }));
  if (sLift) parts.push(curve(supplyAt(sLift), AMBER, { label: 'S₂', labelAt: PLOT.pMax - 2 }));
  return parts;
};

const equilibriumView = () => {
  const [d0, s0] = baseCurves();
  return [open(), t(26, 30, 'Where the two curves cross', { size: 13, weight: 600 }),
    axes(), d0.svg, s0.svg,
    readOff(Q_EQ, P_EQ, INK),
    t(X(Q_EQ) + 10, Y(P_EQ) - 8, `${money(P_EQ)} · ${qty(Q_EQ)}`, { size: 11, fill: INK, weight: 600 }),
    wrap(26, PLOT.yBot + 50, `At ${money(P_EQ)} the quantity demanded and the quantity supplied are both ${qty(Q_EQ)} cylinders a day. Nothing is pushing the price either way, which is what "equilibrium" means.`),
    close].join('');
};

const excessDemandView = () => {
  const [d0, s0] = baseCurves();
  const qd = q(DEMAND, P_LOW), qs = q(SUPPLY, P_LOW);
  return [open(), t(26, 30, `A price BELOW the equilibrium: ${money(P_LOW)}`, { size: 13, weight: 600 }),
    axes(), d0.svg, s0.svg,
    line(PLOT.x0, Y(P_LOW), X(qd), Y(P_LOW), RED, 1.5, ' stroke-dasharray="4 4"'),
    dot(X(qs), Y(P_LOW), RED), dot(X(qd), Y(P_LOW), RED),
    line(X(qs), Y(P_LOW), X(qd), Y(P_LOW), RED, 4),
    t(PLOT.x0 - 6, Y(P_LOW) + 4, money(P_LOW), { size: 10, fill: RED, anchor: 'end', weight: 600 }),
    t(X(qs), PLOT.yBot + 15, qty(qs), { size: 10, fill: RED, anchor: 'middle', weight: 600 }),
    t(X(qd), PLOT.yBot + 15, qty(qd), { size: 10, fill: RED, anchor: 'middle', weight: 600 }),
    t(r2((X(qs) + X(qd)) / 2), Y(P_LOW) - 10, `excess demand ${qty(EXCESS_DEMAND)}`, { size: 11, fill: RED, weight: 600, anchor: 'middle' }),
    wrap(26, PLOT.yBot + 50, `Buyers want ${qty(qd)} cylinders and sellers offer ${qty(qs)}. The ${qty(EXCESS_DEMAND)}-cylinder gap is measured ACROSS at the price, not down to the axis, and unsatisfied buyers bid the price up towards ${money(P_EQ)}.`),
    close].join('');
};

const excessSupplyView = () => {
  const [d0, s0] = baseCurves();
  const qd = q(DEMAND, P_HIGH), qs = q(SUPPLY, P_HIGH);
  return [open(), t(26, 30, `A price ABOVE the equilibrium: ${money(P_HIGH)}`, { size: 13, weight: 600 }),
    axes(), d0.svg, s0.svg,
    line(PLOT.x0, Y(P_HIGH), X(qs), Y(P_HIGH), BLUE, 1.5, ' stroke-dasharray="4 4"'),
    dot(X(qd), Y(P_HIGH), BLUE), dot(X(qs), Y(P_HIGH), BLUE),
    line(X(qd), Y(P_HIGH), X(qs), Y(P_HIGH), BLUE, 4),
    t(PLOT.x0 - 6, Y(P_HIGH) + 4, money(P_HIGH), { size: 10, fill: BLUE, anchor: 'end', weight: 600 }),
    t(X(qd), PLOT.yBot + 15, qty(qd), { size: 10, fill: BLUE, anchor: 'middle', weight: 600 }),
    t(X(qs), PLOT.yBot + 15, qty(qs), { size: 10, fill: BLUE, anchor: 'middle', weight: 600 }),
    t(r2((X(qd) + X(qs)) / 2), Y(P_HIGH) - 10, `excess supply ${qty(EXCESS_SUPPLY)}`, { size: 11, fill: BLUE, weight: 600, anchor: 'middle' }),
    wrap(26, PLOT.yBot + 50, `Sellers offer ${qty(qs)} and buyers want ${qty(qd)}. Unsold stock builds up, so sellers cut the price towards ${money(P_EQ)} — the same distance from equilibrium as the previous panel, and the same size of gap.`),
    close].join('');
};

const demandShiftView = () => {
  const [d0, s0, d2] = baseCurves({ dShift: DEMAND_RISE.demand.intercept - DEMAND.intercept, faded: true });
  return [open(), t(26, 30, 'An increase in demand', { size: 13, weight: 600 }),
    axes(), d0.svg, s0.svg, d2.svg,
    readOff(Q_EQ, P_EQ, MUTED),
    readOff(DEMAND_RISE.quantity, DEMAND_RISE.price, PURPLE),
    wrap(26, PLOT.yBot + 50, `The demand curve moves right: at every price buyers now want more. The market clears where the NEW demand curve meets the unchanged supply curve — ${money(DEMAND_RISE.price)} and ${qty(DEMAND_RISE.quantity)} cylinders. Price and quantity both rise.`),
    close].join('');
};

const supplyShiftView = () => {
  const [d0, s0, s2] = baseCurves({ sLift: -SUPPLY_SHIFT, faded: true });
  return [open(), t(26, 30, 'An increase in supply', { size: 13, weight: 600 }),
    axes(), d0.svg, s0.svg, s2.svg,
    readOff(Q_EQ, P_EQ, MUTED),
    readOff(SUPPLY_RISE.quantity, SUPPLY_RISE.price, AMBER),
    wrap(26, PLOT.yBot + 50, `The supply curve moves right and down by ${money(SUPPLY_SHIFT)} a cylinder: at every quantity sellers now need less to be willing to supply. Price falls to ${money(SUPPLY_RISE.price)} and quantity rises to ${qty(SUPPLY_RISE.quantity)} — opposite directions, which a demand shift never gives.`),
    close].join('');
};

export const equilibriumDiagram = {
  id: id('diagram', 'excess demand excess supply and shifts'),
  title: 'Excess Demand, Excess Supply and Shifts of the Curves',
  description: `IAL 1.3.4 · 1c drawn twice and 1.3.4 · 1b drawn twice. At ${money(P_LOW)} the gap is excess demand of ${qty(EXCESS_DEMAND)} cylinders; at ${money(P_HIGH)} it is excess supply of ${qty(EXCESS_SUPPLY)}; both are measured horizontally at the price, which is the reading a student most often gets wrong. The shift panels keep the original curves on the page so the movement of the equilibrium can be traced.`,
  checklist: [
    'Both axes labelled: price on the vertical axis, quantity on the horizontal',
    'A downward-sloping demand curve and an upward-sloping supply curve, each labelled',
    'The equilibrium marked where they cross, with the price AND the quantity read off to the axes',
    'Excess demand or excess supply measured HORIZONTALLY between the two curves at the stated price',
    'A shift drawn as a second curve labelled D₂ or S₂, with the original left on the diagram',
    'The new equilibrium marked and both its values read off, not just the arrow of movement',
  ],
  scenarios: [
    { label: 'The equilibrium', svg: equilibriumView() },
    { label: 'Excess demand', svg: excessDemandView() },
    { label: 'Excess supply', svg: excessSupplyView() },
    { label: 'Demand shifts', svg: demandShiftView() },
    { label: 'Supply shifts', svg: supplyShiftView() },
  ],
};

/* ══ 3 · Consumer and producer surplus ═════════════════════════════════════ */
/*
 * 2a is the distinction and 2b is what a shift does to it. Both triangles are drawn from the same
 * three points every time — the curve's own intercept, the price line and the quantity traded — so
 * the areas in the caption are the areas on the page.
 */
const surplusView = ({ title, dShift = 0, sLift = 0, caption }) => {
  const d = (price) => q(DEMAND, price) + dShift;
  const s = (price) => q(SUPPLY, price - sLift);
  const price = (() => { // where the two functions agree
    let lo = 0, hi = PLOT.pMax;
    for (let i = 0; i < 60; i += 1) { const m = (lo + hi) / 2; if (d(m) > s(m)) lo = m; else hi = m; }
    return round2(lo);
  })();
  const quantity = round2(d(price));
  const choke = round2(p(DEMAND, -dShift));           // where the (shifted) demand curve meets the price axis
  const foot = round2(p(SUPPLY, 0) + sLift);          // where the (shifted) supply curve meets it
  const cs = round2(0.5 * (choke - price) * quantity);
  const ps = round2(0.5 * (price - foot) * quantity);
  const dCurve = curve(d, BLUE, { label: dShift ? 'D₂' : 'D', labelAt: 3 });
  const sCurve = curve(s, GREEN, { label: sLift ? 'S₂' : 'S', labelAt: PLOT.pMax - 2 });
  return {
    price, quantity, cs, ps,
    svg: [open(), t(26, 30, title, { size: 13, weight: 600 }),
      axes(),
      poly([[X(0), Y(choke)], [X(0), Y(price)], [X(quantity), Y(price)]], BLUE, 0.22),
      poly([[X(0), Y(foot)], [X(0), Y(price)], [X(quantity), Y(price)]], GREEN, 0.22),
      dCurve.svg, sCurve.svg,
      line(PLOT.x0, Y(price), X(quantity), Y(price), INK, 1.2, ' stroke-dasharray="4 4"'),
      line(X(quantity), Y(price), X(quantity), PLOT.yBot, INK, 1.2, ' stroke-dasharray="4 4"'),
      dot(X(quantity), Y(price), INK),
      t(PLOT.x0 - 6, Y(price) + 4, money(price), { size: 10, fill: INK, anchor: 'end', weight: 600 }),
      t(X(quantity), PLOT.yBot + 15, qty(quantity), { size: 10, fill: INK, anchor: 'middle', weight: 600 }),
      t(r2(X(quantity) * 0.42 + PLOT.x0 * 0.2), r2(Y(price) - (Y(price) - Y(choke)) * 0.42), `CS ${money(cs)}`, { size: 11, fill: BLUE, weight: 600 }),
      t(r2(X(quantity) * 0.42 + PLOT.x0 * 0.2), r2(Y(price) + (Y(foot) - Y(price)) * 0.45), `PS ${money(ps)}`, { size: 11, fill: GREEN, weight: 600 }),
      wrap(26, PLOT.yBot + 50, caption),
      close].join(''),
  };
};

export const SURPLUS_BASE = surplusView({
  title: 'The two triangles at the equilibrium',
  caption: `Consumer surplus is the area below the demand curve and ABOVE the price: ${money(CS)}. Producer surplus is the area above the supply curve and BELOW the price: ${money(PS)}. Both are ½ × ${qty(Q_EQ)} cylinders × the vertical distance to the curve's intercept.`,
});
export const SURPLUS_DEMAND = surplusView({
  title: 'After an increase in demand',
  dShift: DEMAND_RISE.demand.intercept - DEMAND.intercept,
  caption: `More is bought and the price is higher. Consumer surplus rises to ${money(DEMAND_RISE.cs)} and producer surplus to ${money(DEMAND_RISE.ps)}: the higher price costs buyers on each cylinder, but the extra cylinders and the higher value they place on them more than make up for it.`,
});
export const SURPLUS_SUPPLY = surplusView({
  title: 'After an increase in supply',
  sLift: -SUPPLY_SHIFT,
  caption: `The price falls and more is traded. Consumer surplus rises to ${money(SUPPLY_RISE.cs)}; producer surplus rises to ${money(SUPPLY_RISE.ps)} as well, because the extra volume outweighs the lower price on each unit. A shift does not have to make one side worse off.`,
});

export const surplusDiagram = {
  id: id('diagram', 'consumer and producer surplus and what shifts do to them'),
  title: 'Consumer and Producer Surplus',
  description: `IAL 1.3.4 · 2a is the distinction between the two areas and 2b is what a shift does to them. The first panel measures both at the equilibrium — ${money(CS)} and ${money(PS)}. The other two recompute them after a demand shift and a supply shift, which is the question 2b actually asks.`,
  checklist: [
    'Consumer surplus shaded BELOW the demand curve and ABOVE the price line',
    'Producer surplus shaded ABOVE the supply curve and BELOW the price line',
    'Both triangles bounded on the right by the quantity actually traded',
    'The price line drawn across to the quantity, not just marked on the axis',
    'After a shift, the new curve and the new equilibrium drawn before either area is re-shaded',
  ],
  scenarios: [
    { label: 'At the equilibrium', svg: SURPLUS_BASE.svg },
    { label: 'After a demand rise', svg: SURPLUS_DEMAND.svg },
    { label: 'After a supply rise', svg: SURPLUS_SUPPLY.svg },
  ],
};

/* ══ 4 · The price mechanism ═══════════════════════════════════════════════ */
/*
 * 3a names three functions and 3b asks for them "in the context of different types of markets,
 * including local, national and global". Neither is a drawing, and the March section had no diagram
 * on this block at all. Both are comparisons, so both are tables.
 */
const functionsView = () => gridSvg({
  title: 'The three functions of the price mechanism',
  headers: ['Function', 'What the price does', 'In the Sabaya market'],
  cols: [26, 230, 430],
  rows: [
    ['Rationing', 'Shares out what is scarce', `${money(P_EQ)}: only ${qty(Q_EQ)} bought`],
    ['Incentive', 'Rewards a change', `${money(DEMAND_RISE.price)} draws out ${qty(DEMAND_RISE.quantity)}`],
    ['Signalling', 'Carries information', 'A rise: buyers want more'],
  ],
  colours: [[INK, MUTED, AMBER], [INK, MUTED, GREEN], [INK, MUTED, BLUE]],
  note: `The three are one movement seen from three angles, not three separate events. When demand rises the price moves from ${money(P_EQ)} to ${money(DEMAND_RISE.price)}: that single movement signals the change, gives producers the incentive to supply ${qty(DEMAND_RISE.quantity - Q_EQ)} more, and rations the ${qty(DEMAND_RISE.quantity)} that exist to the buyers willing to pay for them.`,
});

const marketTypesView = () => gridSvg({
  title: 'The price mechanism in local, national and global markets',
  headers: ['Market', 'Who trades in it', 'What a price change reaches'],
  cols: [26, 210, 430],
  rows: [
    ['Local', 'One town', 'Traders in that town'],
    ['National', 'One country', 'Every region of it'],
    ['Global', 'Many countries', 'Buyers and sellers worldwide'],
  ],
  colours: [[INK, MUTED, AMBER], [INK, MUTED, GREEN], [INK, MUTED, BLUE]],
  note: 'The mechanism is the same at all three scales; what changes is how far the signal travels and how wide the pool of sellers who can answer it. A single seller sets no price in a global market, because the price is decided by supply and demand across every country trading in it.',
});

export const priceMechanismDiagram = {
  id: id('diagram', 'functions of the price mechanism and market types'),
  title: 'The Price Mechanism: Three Functions, Three Scales',
  kind: 'table',
  description: `IAL 1.3.4 · 3a names the rationing, incentive and signalling functions, and 3b asks for the mechanism "in the context of different types of markets, including local, national and global markets". The first table separates the three functions of a single price movement; the second sets the same mechanism at three scales.`,
  scenarios: [
    { label: 'The three functions', svg: functionsView() },
    { label: 'Local, national, global', svg: marketTypesView() },
  ],
};

/* ══ 5 · Indirect taxes ════════════════════════════════════════════════════ */
/*
 * The block the March section pinned to a diagram that does not exist. 4a is the impact on all three
 * parties, which means the government's rectangle has to be DRAWN and not merely asserted (specGap-04),
 * and 4b is the incidence, which is the split of the vertical wedge between the two prices.
 */
const specificTaxView = () => {
  const s0 = curve(supplyAt(0), GREEN, { label: 'S', labelAt: PLOT.pMax - 2 });
  const s1 = curve(supplyAt(TAX), RED, { label: 'S + tax', labelAt: PLOT.pMax - 5 });
  const d0 = curve(demandAt(0), BLUE, { label: 'D', labelAt: 3 });
  return [open(), t(26, 30, `A specific tax of ${money(TAX)} a cylinder`, { size: 13, weight: 600 }),
    axes(), d0.svg, s0.svg, s1.svg,
    readOff(Q_EQ, P_EQ, MUTED),
    line(PLOT.x0, Y(TAXED.buyer), X(TAXED.quantity), Y(TAXED.buyer), RED, 1.2, ' stroke-dasharray="4 4"'),
    line(PLOT.x0, Y(TAXED.seller), X(TAXED.quantity), Y(TAXED.seller), GREEN, 1.2, ' stroke-dasharray="4 4"'),
    line(X(TAXED.quantity), Y(TAXED.buyer), X(TAXED.quantity), PLOT.yBot, INK, 1.2, ' stroke-dasharray="4 4"'),
    dot(X(TAXED.quantity), Y(TAXED.buyer), RED), dot(X(TAXED.quantity), Y(TAXED.seller), GREEN),
    t(PLOT.x0 - 6, Y(TAXED.buyer) + 4, money(TAXED.buyer), { size: 10, fill: RED, anchor: 'end', weight: 600 }),
    t(PLOT.x0 - 6, Y(TAXED.seller) + 4, money(TAXED.seller), { size: 10, fill: GREEN, anchor: 'end', weight: 600 }),
    t(X(TAXED.quantity), PLOT.yBot + 15, qty(TAXED.quantity), { size: 10, fill: INK, anchor: 'middle', weight: 600 }),
    line(X(TAXED.quantity) + 18, Y(TAXED.buyer), X(TAXED.quantity) + 18, Y(TAXED.seller), AMBER, 2.5),
    t(X(TAXED.quantity) + 24, r2((Y(TAXED.buyer) + Y(TAXED.seller)) / 2 + 4), `tax ${money(TAX)}`, { size: 11, fill: AMBER, weight: 600 }),
    wrap(26, PLOT.yBot + 50, `The buyer pays ${money(TAXED.buyer)}, ${money(TAXED.buyerShare)} more than before. The seller keeps ${money(TAXED.seller)}, ${money(TAXED.sellerShare)} less. The two add to the ${money(TAX)} tax, and the quantity traded falls from ${qty(Q_EQ)} to ${qty(TAXED.quantity)}.`),
    close].join('');
};

const taxRevenueView = () => {
  const s0 = curve(supplyAt(0), GREEN, { label: 'S', labelAt: PLOT.pMax - 2 });
  const s1 = curve(supplyAt(TAX), RED, { label: 'S + tax', labelAt: PLOT.pMax - 5 });
  const d0 = curve(demandAt(0), BLUE, { label: 'D', labelAt: 3 });
  return [open(), t(26, 30, "The government's revenue", { size: 13, weight: 600 }),
    axes(),
    rect(X(0), Y(TAXED.buyer), X(TAXED.quantity), Y(TAXED.seller), AMBER, 0.28),
    d0.svg, s0.svg, s1.svg,
    line(PLOT.x0, Y(TAXED.buyer), X(TAXED.quantity), Y(TAXED.buyer), RED, 1.2, ' stroke-dasharray="4 4"'),
    line(PLOT.x0, Y(TAXED.seller), X(TAXED.quantity), Y(TAXED.seller), GREEN, 1.2, ' stroke-dasharray="4 4"'),
    line(X(TAXED.quantity), Y(TAXED.buyer), X(TAXED.quantity), PLOT.yBot, INK, 1.2, ' stroke-dasharray="4 4"'),
    t(PLOT.x0 - 6, Y(TAXED.buyer) + 4, money(TAXED.buyer), { size: 10, fill: RED, anchor: 'end', weight: 600 }),
    t(PLOT.x0 - 6, Y(TAXED.seller) + 4, money(TAXED.seller), { size: 10, fill: GREEN, anchor: 'end', weight: 600 }),
    t(X(TAXED.quantity), PLOT.yBot + 15, qty(TAXED.quantity), { size: 10, fill: INK, anchor: 'middle', weight: 600 }),
    t(r2(X(TAXED.quantity) / 2 + 20), r2((Y(TAXED.buyer) + Y(TAXED.seller)) / 2 + 4), `${money(TAX)} × ${qty(TAXED.quantity)} = ${money(TAXED.government)}`, { size: 11, fill: AMBER, weight: 600, anchor: 'middle' }),
    wrap(26, PLOT.yBot + 50, `The shaded rectangle is what the government collects: the tax per unit ${money(TAX)} multiplied by the quantity actually traded AFTER the tax, ${qty(TAXED.quantity)} — not the ${qty(Q_EQ)} traded before it.`),
    close].join('');
};

const adValoremView = () => {
  const s0 = curve(supplyAt(0), GREEN, { label: 'S', labelAt: PLOT.pMax - 2 });
  // an ad valorem tax of r%: the seller keeps price/(1+r), so the taxed curve is Qs at that net price
  const s1 = curve((price) => q(SUPPLY, price / (1 + AD_VALOREM / 100)), PURPLE, { label: `S + ${pc(AD_VALOREM)}`, labelAt: PLOT.pMax - 5 });
  const gap = (quantity) => {
    const net = p(SUPPLY, quantity);
    return [line(X(quantity), Y(net), X(quantity), Y(round2(net + adValoremGap(net))), AMBER, 2.5),
      t(X(quantity) + 7, r2((Y(net) + Y(round2(net + adValoremGap(net)))) / 2 + 4), money(adValoremGap(net)), { size: 11, fill: AMBER, weight: 600 })].join('');
  };
  return [open(), t(26, 30, `An ad valorem tax of ${pc(AD_VALOREM)} of the price`, { size: 13, weight: 600 }),
    axes(), s0.svg, s1.svg, gap(AV_LOW_Q), gap(AV_HIGH_Q),
    wrap(26, PLOT.yBot + 50, `The tax is a share of the price, so the gap GROWS as price rises: ${money(AV_GAP_LOW)} at ${qty(AV_LOW_Q)} cylinders and ${money(AV_GAP_HIGH)} at ${qty(AV_HIGH_Q)}. The curve pivots rather than shifting parallel — and at ${qty(AV_HIGH_Q)} it happens to be worth exactly the ${money(TAX)} specific tax, which it is at no other quantity.`),
    close].join('');
};

const incidenceView = () => {
  /*
   * The same $3 tax on two demand curves through the SAME point: one steeper than the supply curve
   * and one flatter. Nothing is asserted — each panel's split is computed from its own curves, and
   * the runner checks that the steep case gives the buyer more of the wedge than the flat one.
   */
  const panel = (perDollar, x0) => {
    const d = { intercept: Q_EQ - perDollar * P_EQ, perDollar };
    const before = (() => { let lo = 0, hi = PLOT.pMax; for (let i = 0; i < 60; i += 1) { const m = (lo + hi) / 2; if (q(d, m) > q(SUPPLY, m)) lo = m; else hi = m; } return round2(lo); })();
    const after = (() => { let lo = 0, hi = PLOT.pMax; for (let i = 0; i < 60; i += 1) { const m = (lo + hi) / 2; if (q(d, m) > q(SUPPLY, m - TAX)) lo = m; else hi = m; } return round2(lo); })();
    return { d, before, after, buyerShare: round2(after - before), sellerShare: round2(TAX - (after - before)), x0 };
  };
  const steep = panel(-25, 0);     // demand less responsive than supply
  const flat = panel(-200, 0);     // demand more responsive than supply
  const draw = ({ d, after, buyerShare }, dx, label, colour) => {
    const shift = (fn) => (price) => fn(price);
    const dc = curve(shift((price) => q(d, price)), colour, { label: 'D', labelAt: 3 });
    const s0 = curve(supplyAt(0), GREEN, { label: 'S', labelAt: PLOT.pMax - 2 });
    const s1 = curve(supplyAt(TAX), RED, { label: '', labelAt: PLOT.pMax - 5 });
    const qAfter = round2(q(d, after));
    return `<g transform="translate(${dx},0)">${[
      dc.svg, s0.svg, s1.svg,
      line(PLOT.x0, Y(after), X(qAfter), Y(after), colour, 1.2, ' stroke-dasharray="4 4"'),
      line(PLOT.x0, Y(round2(after - TAX)), X(qAfter), Y(round2(after - TAX)), GREEN, 1.2, ' stroke-dasharray="4 4"'),
      dot(X(qAfter), Y(after), colour),
      t(PLOT.x0 - 6, Y(after) + 4, money(after), { size: 9, fill: colour, anchor: 'end', weight: 600 }),
      t(PLOT.x0 + 4, PLOT.yTop - 6, label, { size: 11, fill: colour, weight: 600 }),
      t(PLOT.x0 + 4, PLOT.yTop + 10, `buyer bears ${money(buyerShare)} of ${money(TAX)}`, { size: 10, fill: AMBER, weight: 600 }),
    ].join('')}</g>`;
  };
  return [open(760, 1010), t(26, 30, 'The same tax, two demand curves', { size: 13, weight: 600 }),
    `<g transform="translate(0,0)">${axes()}</g>`, `<g transform="translate(500,0)">${axes()}</g>`,
    draw(steep, 0, 'Demand less responsive', PURPLE),
    draw(flat, 500, 'Demand more responsive', BLUE),
    wrap(26, PLOT.yBot + 60, `A tax of ${money(TAX)} is a wedge of ${money(TAX)} in both panels. Where demand responds LESS than supply, the buyer bears ${money(steep.buyerShare)} of it; where demand responds MORE, the buyer bears ${money(flat.buyerShare)}. The side that can change its behaviour less is the side that ends up carrying more of the tax — and that is the incidence rule of 1.3.4 · 4b, with nothing memorised.`, { frame: 1010 }),
    close].join('');
};

export const INCIDENCE_PANELS = (() => {
  const panel = (perDollar) => {
    const d = { intercept: Q_EQ - perDollar * P_EQ, perDollar };
    const after = (() => { let lo = 0, hi = PLOT.pMax; for (let i = 0; i < 60; i += 1) { const m = (lo + hi) / 2; if (q(d, m) > q(SUPPLY, m - TAX)) lo = m; else hi = m; } return round2(lo); })();
    return { buyerShare: round2(after - P_EQ), sellerShare: round2(TAX - (after - P_EQ)) };
  };
  return { steep: panel(-25), flat: panel(-200) };
})();

export const indirectTaxDiagram = {
  id: id('diagram', 'indirect tax incidence revenue and ad valorem'),
  title: 'Indirect Taxes: the Wedge, the Split and the Revenue',
  description: `IAL 1.3.4 · 4a and · 4b, drawn. A specific tax of ${money(TAX)} lifts the supply curve by ${money(TAX)}: the buyer pays ${money(TAXED.buyer)} and the seller keeps ${money(TAXED.seller)}, so the ${money(TAX)} splits ${money(TAXED.buyerShare)} to ${money(TAXED.sellerShare)} (1.3.4 · 4b). The revenue panel draws the government's ${money(TAXED.government)} as a rectangle over the post-tax quantity, and the ad valorem panel shows why the specification names two kinds of indirect tax.`,
  checklist: [
    'The original supply curve labelled S and the taxed curve labelled separately, both on the diagram',
    'A specific tax drawn as a PARALLEL shift, the vertical gap equal to the tax per unit',
    'The price the buyer pays and the price the seller keeps both marked on the price axis',
    'The new quantity read off, and the government\'s revenue drawn as tax per unit × that quantity',
    'An ad valorem tax drawn as a PIVOT, with the gap wider at higher prices',
  ],
  scenarios: [
    { label: 'A specific tax', svg: specificTaxView() },
    { label: "The government's revenue", svg: taxRevenueView() },
    { label: 'An ad valorem tax', svg: adValoremView() },
    { label: 'What decides the split', svg: incidenceView() },
  ],
};

/* ══ 6 · Subsidies ═════════════════════════════════════════════════════════ */

const subsidyView = () => {
  const s0 = curve(supplyAt(0), GREEN, { label: 'S', labelAt: PLOT.pMax - 2 });
  const s1 = curve(supplyAt(-SUBSIDY), AMBER, { label: 'S − subsidy', labelAt: PLOT.pMax - 8 });
  const d0 = curve(demandAt(0), BLUE, { label: 'D', labelAt: 3 });
  return [open(), t(26, 30, `A subsidy of ${money(SUBSIDY)} a cylinder`, { size: 13, weight: 600 }),
    axes(), d0.svg, s0.svg, s1.svg,
    readOff(Q_EQ, P_EQ, MUTED),
    line(PLOT.x0, Y(SUBSIDISED.seller), X(SUBSIDISED.quantity), Y(SUBSIDISED.seller), GREEN, 1.2, ' stroke-dasharray="4 4"'),
    line(PLOT.x0, Y(SUBSIDISED.buyer), X(SUBSIDISED.quantity), Y(SUBSIDISED.buyer), BLUE, 1.2, ' stroke-dasharray="4 4"'),
    line(X(SUBSIDISED.quantity), Y(SUBSIDISED.seller), X(SUBSIDISED.quantity), PLOT.yBot, INK, 1.2, ' stroke-dasharray="4 4"'),
    dot(X(SUBSIDISED.quantity), Y(SUBSIDISED.buyer), BLUE), dot(X(SUBSIDISED.quantity), Y(SUBSIDISED.seller), GREEN),
    t(PLOT.x0 - 6, Y(SUBSIDISED.seller) + 4, money(SUBSIDISED.seller), { size: 10, fill: GREEN, anchor: 'end', weight: 600 }),
    t(PLOT.x0 - 6, Y(SUBSIDISED.buyer) + 4, money(SUBSIDISED.buyer), { size: 10, fill: BLUE, anchor: 'end', weight: 600 }),
    t(X(SUBSIDISED.quantity), PLOT.yBot + 15, qty(SUBSIDISED.quantity), { size: 10, fill: INK, anchor: 'middle', weight: 600 }),
    line(X(SUBSIDISED.quantity) + 18, Y(SUBSIDISED.seller), X(SUBSIDISED.quantity) + 18, Y(SUBSIDISED.buyer), AMBER, 2.5),
    t(X(SUBSIDISED.quantity) + 24, r2((Y(SUBSIDISED.buyer) + Y(SUBSIDISED.seller)) / 2 + 4), `subsidy ${money(SUBSIDY)}`, { size: 11, fill: AMBER, weight: 600 }),
    wrap(26, PLOT.yBot + 50, `The buyer pays ${money(SUBSIDISED.buyer)}, ${money(Math.abs(SUBSIDISED.buyerShare))} less than before. The seller keeps ${money(SUBSIDISED.seller)}, ${money(Math.abs(SUBSIDISED.sellerShare))} more. The two gains add to the ${money(SUBSIDY)} subsidy, and the quantity traded rises to ${qty(SUBSIDISED.quantity)}.`),
    close].join('');
};

const subsidyCostView = () => {
  const s0 = curve(supplyAt(0), GREEN, { label: 'S', labelAt: PLOT.pMax - 2 });
  const s1 = curve(supplyAt(-SUBSIDY), AMBER, { label: 'S − subsidy', labelAt: PLOT.pMax - 8 });
  const d0 = curve(demandAt(0), BLUE, { label: 'D', labelAt: 3 });
  return [open(), t(26, 30, 'What the subsidy costs the government', { size: 13, weight: 600 }),
    axes(),
    rect(X(0), Y(SUBSIDISED.seller), X(SUBSIDISED.quantity), Y(SUBSIDISED.buyer), AMBER, 0.28),
    d0.svg, s0.svg, s1.svg,
    line(PLOT.x0, Y(SUBSIDISED.seller), X(SUBSIDISED.quantity), Y(SUBSIDISED.seller), GREEN, 1.2, ' stroke-dasharray="4 4"'),
    line(PLOT.x0, Y(SUBSIDISED.buyer), X(SUBSIDISED.quantity), Y(SUBSIDISED.buyer), BLUE, 1.2, ' stroke-dasharray="4 4"'),
    line(X(SUBSIDISED.quantity), Y(SUBSIDISED.seller), X(SUBSIDISED.quantity), PLOT.yBot, INK, 1.2, ' stroke-dasharray="4 4"'),
    t(PLOT.x0 - 6, Y(SUBSIDISED.seller) + 4, money(SUBSIDISED.seller), { size: 10, fill: GREEN, anchor: 'end', weight: 600 }),
    t(PLOT.x0 - 6, Y(SUBSIDISED.buyer) + 4, money(SUBSIDISED.buyer), { size: 10, fill: BLUE, anchor: 'end', weight: 600 }),
    t(X(SUBSIDISED.quantity), PLOT.yBot + 15, qty(SUBSIDISED.quantity), { size: 10, fill: INK, anchor: 'middle', weight: 600 }),
    t(r2(X(SUBSIDISED.quantity) / 2 + 20), r2((Y(SUBSIDISED.buyer) + Y(SUBSIDISED.seller)) / 2 + 4), `${money(SUBSIDY)} × ${qty(SUBSIDISED.quantity)} = ${money(SUBSIDISED.government)}`, { size: 11, fill: AMBER, weight: 600, anchor: 'middle' }),
    wrap(26, PLOT.yBot + 50, `The rectangle runs from what the seller receives down to what the buyer pays, across the quantity traded after the subsidy: ${money(SUBSIDY)} × ${qty(SUBSIDISED.quantity)} = ${money(SUBSIDISED.government)} a day. It is larger than the ${money(TAXED.government)} the same-sized tax raised, because a subsidy RAISES the quantity it is paid on.`),
    close].join('');
};

export const subsidyDiagram = {
  id: id('diagram', 'subsidy incidence and cost to government'),
  title: 'Subsidies: the Wedge in Reverse',
  description: `IAL 1.3.4 · 4c and · 4d. A subsidy of ${money(SUBSIDY)} is a specific tax with its sign changed: the supply curve moves DOWN by ${money(SUBSIDY)}, the buyer pays ${money(SUBSIDISED.buyer)} and the seller receives ${money(SUBSIDISED.seller)} (1.3.4 · 4d). The cost panel draws the government's ${money(SUBSIDISED.government)} as a rectangle over the quantity traded AFTER the subsidy (1.3.4 · 4c), which is where the most common arithmetic slip happens.`,
  checklist: [
    'The supply curve shifted DOWN and to the right by the subsidy per unit',
    'The price the buyer pays and the higher price the seller receives both marked',
    'The vertical gap between them equal to the subsidy per unit',
    'The new, higher quantity read off to the horizontal axis',
    'The cost to the government drawn as subsidy per unit × the quantity traded after the subsidy',
  ],
  scenarios: [
    { label: 'A subsidy', svg: subsidyView() },
    { label: 'The cost to government', svg: subsidyCostView() },
  ],
};

export const DIAGRAMS = [equilibriumTableDiagram, equilibriumDiagram, surplusDiagram, priceMechanismDiagram, indirectTaxDiagram, subsidyDiagram];
