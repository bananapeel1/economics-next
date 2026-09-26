/**
 * PACKET 48 — government-intervention-firms diagrams. Six, one pinned to each block, every figure
 * drawn from the models in `_packet48-util.mjs`.
 *
 * The live section had three, and the ledger names a defect in two of them:
 *   - "Price Regulation of a Monopoly (RPI-X Price Cap)" (`accuracy-02`): a U-shaped AC where a
 *     natural monopoly's falls throughout, the regulated price BELOW AC with no word about the loss,
 *     and the MC = MR point drawn 30-odd units from where the two lines cross. Replaced by
 *     "Regulating a Natural Monopoly": AC = 20 + 1,200/Q, sampled, falls at every quantity drawn; the
 *     average-cost cap sits ON the AC curve; the marginal-cost cap is drawn below AC and its caption
 *     says it is a loss; every marked point is solved from the model, and the runner re-reads the
 *     coordinates out of the emitted SVG.
 *   - "Effects of Privatisation and Deregulation" (`accuracy-03`, `structure-03`): privatisation drawn
 *     as a rightward supply shift in a competitive market. Replaced by "Privatisation and
 *     Competition": the same monopoly before and after privatisation (MR = MC twice), then the market
 *     opened to rivals. Pinned to chapter 2 by `diagramId`, so it is reachable in Learn Mode.
 *   - "Minimum Wage in a Monopsony Labour Market": kept as ONE VIEW of "Wage Controls", now after the
 *     competitive case (rule before exception) and with the floor-kinked MCL `topFix-02` asked for.
 *
 * The frame, type sizes and layout are packet 45's (400 units, 15/12 faces, the 1.2-of-a-face
 * collision bound, packet 40). Every colour is a key of `PALETTE` in `components/learn-mode/processSvg.js`;
 * the runner parses that file and asserts it.
 */
import { id, NAT, TEL, CEM, LAB, MON, TOP, money, k, h, round1 } from './_packet48-util.mjs';

/* ── the frame, and the two type sizes ─────────────────────────────────────── */
export const FRAME = { w: 400, pad: 16 };
export const FACE = 15;
export const SMALL = 12;
export const MIN_FACE = SMALL;
export const COLLIDE_TOL = 1.2;
export const LEAD = 18;

/* ── palette, all of it in processSvg's map ────────────────────────────────── */
const INK = '#e8ecf5';
const INK2 = '#e2e8f0';
const MUTED = '#7a8299';
const AXIS = '#94a3b8';
const GREEN = '#059669';
const GREEN2 = '#34d399';
const RED2 = '#f87171';
const BLUE2 = '#60a5fa';
const AMBER = '#f59e0b';
const PURPLE = '#8b5cf6';
const CYAN = '#22d3ee';

/** A rough text width, used by the runner's overrun and collision checks. DM Sans at ~0.56em. */
export const estWidth = (text, size = FACE) => String(text).length * size * 0.56;

const svg = (hgt, body) => `<svg width="${FRAME.w}" height="${hgt}" viewBox="0 0 ${FRAME.w} ${hgt}" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',system-ui,sans-serif;background:transparent">${body}</svg>`;
const t = (x, y, str, { size = FACE, fill = INK, anchor = 'start', weight = 400 } = {}) =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" font-weight="${weight}">${str}</text>`;
const line = (x1, y1, x2, y2, { stroke = AXIS, sw = 1.5, dash = null } = {}) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
const path = (d, { stroke = AXIS, sw = 2, fill = 'none', dash = null } = {}) =>
  `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;

/* ── one layout for every diagram: title · y title · plot · ticks · x title · two captions ── */
const R = { h: 306, title: 18, yTitle: 40, x0: 54, xR: 336, y1: 56, y0: 222, tick: 238, xTitle: 256, cap1: 278, cap2: 296 };

/**
 * A plot window over (quantity, price-or-wage). Straight curves are `q = a + b·p` — the quantity as a
 * function of the price — CLIPPED to the window, so a line that leaves the box is never drawn or
 * labelled off the frame (packet 25's decision). A curve that is not straight (a natural monopoly's
 * average cost) is SAMPLED from its own function (packet 15: "a diagram whose geometry is a claim is
 * drawn by sampling the function it claims").
 */
const plot = ({ Qmin, Qmax, Pmin, Pmax }, xTitle, yTitle) => {
  const sx = (q) => round1(R.x0 + ((q - Qmin) / (Qmax - Qmin)) * (R.xR - R.x0));
  const sy = (p) => round1(R.y0 - ((p - Pmin) / (Pmax - Pmin)) * (R.y0 - R.y1));
  const clip = (a, b) => {
    const pAt = (q) => (q - a) / b;
    const ends = [pAt(Qmin), pAt(Qmax)].sort((m, n) => m - n);
    const lo = Math.max(Pmin, ends[0]), hi = Math.min(Pmax, ends[1]);
    return [{ p: lo, q: a + b * lo }, { p: hi, q: a + b * hi }];
  };
  const curve = (a, b, colour, { dash = null } = {}) => {
    const [p, r] = clip(a, b);
    return { svg: path(`M ${sx(p.q)} ${sy(p.p)} L ${sx(r.q)} ${sy(r.p)}`, { stroke: colour, sw: 2.5, dash }), ends: [p, r] };
  };
  /**
   * A curve with its label in the right margin where it leaves the right edge; otherwise a falling
   * curve is labelled at its lower end just above the floor, and a rising one above the top edge.
   */
  const labelled = (a, b, colour, name, { dash = null } = {}) => {
    const c = curve(a, b, colour, { dash });
    const right = c.ends.find((e) => Math.abs(e.q - Qmax) < 1e-6);
    const top = c.ends.find((e) => Math.abs(e.p - Pmax) < 1e-6);
    const floor = c.ends.find((e) => Math.abs(e.p - Pmin) < 1e-6);
    let label;
    if (right) label = t(R.xR + 4, round1(sy(right.p) + 4), name, { size: SMALL, fill: colour, weight: 600 });
    else if (b < 0 && floor) label = t(round1(sx(floor.q) + 6), round1(sy(floor.p) - 6), name, { size: SMALL, fill: colour, weight: 600 });
    else if (top) label = t(sx(top.q), R.y1 - 6, name, { anchor: 'middle', size: SMALL, fill: colour, weight: 600 });
    else label = t(round1(sx(c.ends[1].q) + 6), round1(sy(c.ends[1].p) - 6), name, { size: SMALL, fill: colour, weight: 600 });
    return c.svg + label;
  };
  /** A sampled curve p = f(q) over [from, to], labelled in the right margin at its right end. */
  const sampled = (f, from, to, colour, name, { dash = null, step = 2.5 } = {}) => {
    const pts = [];
    for (let q = from; q <= to + 1e-9; q += step) { const p = f(q); if (p <= Pmax && p >= Pmin) pts.push([sx(q), sy(p)]); }
    const d = `M ${pts[0][0]} ${pts[0][1]}${pts.slice(1).map(([x, y]) => ` L ${x} ${y}`).join('')}`;
    return path(d, { stroke: colour, sw: 2.5, dash }) + t(R.xR + 4, round1(sy(f(to)) + 4), name, { size: SMALL, fill: colour, weight: 600 });
  };
  /** A horizontal line across the window, labelled in the right margin. */
  const hLine = (p, colour, name, { dash = null } = {}) =>
    line(R.x0, sy(p), R.xR, sy(p), { stroke: colour, sw: 2, dash })
    + (name ? t(R.xR + 4, round1(sy(p) + 4), name, { size: SMALL, fill: colour, weight: 600 }) : '');
  /** A point with dashed guides to both axes; either tick can be suppressed when it repeats. */
  const mark = (q, p, colour, { qTick = true, pTick = true, qText = null, pText = null } = {}) => [
    line(R.x0, sy(p), sx(q), sy(p), { stroke: colour, sw: 1, dash: '3 3' }),
    line(sx(q), sy(p), sx(q), R.y0, { stroke: colour, sw: 1, dash: '3 3' }),
    `<circle cx="${sx(q)}" cy="${sy(p)}" r="4" fill="${colour}"/>`,
    pTick ? t(R.x0 - 6, round1(sy(p) + 4), pText ?? String(p), { anchor: 'end', size: SMALL, fill: colour }) : '',
    qTick ? t(sx(q), R.tick, qText ?? String(q), { anchor: 'middle', size: SMALL, fill: colour }) : '',
  ].join('');
  const dot = (q, p, colour) => `<circle cx="${sx(q)}" cy="${sy(p)}" r="3.5" fill="${colour}"/>`;
  const axes = (title) => [
    t(FRAME.w / 2, R.title, title, { anchor: 'middle', weight: 600, size: SMALL }),
    t(8, R.yTitle, yTitle, { size: SMALL, fill: AXIS }),
    line(R.x0, R.y1 - 8, R.x0, R.y0, { stroke: AXIS }),
    line(R.x0, R.y0, R.xR + 6, R.y0, { stroke: AXIS }),
    t(392, R.xTitle, xTitle, { anchor: 'end', size: SMALL, fill: AXIS }),
  ].join('');
  return { sx, sy, curve, labelled, sampled, hLine, mark, dot, axes };
};
const captions = (a, b, colour = MUTED) => t(16, R.cap1, a, { size: SMALL, fill: colour, weight: 600 }) + (b ? t(16, R.cap2, b, { size: SMALL, fill: MUTED }) : '');

/* ══ 1 · Controlling Monopolies and Mergers (3.3.5 · 1b) ═══════════════════ */

const NATW = { Qmin: 0, Qmax: 110, Pmin: 0, Pmax: 100 };
const NAT_X = 'Output (thousand units a day)';
const NAT_Y = 'Price and cost ($ a unit)';
/* demand P = 100 − Q ⇒ Q = 100 − P; marginal revenue P = 100 − 2Q ⇒ Q = 50 − P/2 */
const natD = [NAT.a / NAT.b, -1 / NAT.b];
const natMR = [NAT.a / (2 * NAT.b), -1 / (2 * NAT.b)];
const AC_FROM = 15;
const natCommon = (g, { mr = false } = {}) => [
  g.labelled(...natD, CYAN, 'D = AR'),
  mr ? g.labelled(...natMR, BLUE2, 'MR') : '',
  g.sampled((q) => NAT.ac(q), AC_FROM, NATW.Qmax, GREEN2, 'AC'),
].join('');

const natUnregulatedSvg = () => {
  const g = plot(NATW, NAT_X, NAT_Y);
  const M = NAT.mono;
  return svg(R.h, [
    g.axes('Left alone: MR = MC'),
    natCommon(g, { mr: true }),
    g.hLine(NAT.mc, AMBER, 'MC'),
    g.dot(M.Q, NAT.mr(M.Q), AMBER),
    g.mark(M.Q, M.P, RED2),
    g.mark(M.Q, M.AC, GREEN2, { qTick: false }),
    captions(`MR = MC at ${k(M.Q)} units: price ${money(M.P)}, AC ${money(M.AC)}.`, 'Price above average cost: supernormal profit.', RED2),
  ].join(''));
};

const natAvgCapSvg = () => {
  const g = plot(NATW, NAT_X, NAT_Y);
  const A = NAT.avg;
  return svg(R.h, [
    g.axes('Price capped at average cost'),
    natCommon(g),
    g.hLine(NAT.mc, MUTED, 'MC', { dash: '4 4' }),
    g.mark(A.Q, A.P, PURPLE),
    captions(`Cap ${money(A.P)} where D meets AC: ${k(A.Q)} units.`, 'Price equals average cost: normal profit.', PURPLE),
  ].join(''));
};

const natMargCapSvg = () => {
  const g = plot(NATW, NAT_X, NAT_Y);
  const Mg = NAT.marg;
  return svg(R.h, [
    g.axes('Price capped at marginal cost'),
    natCommon(g),
    g.hLine(NAT.mc, AMBER, 'MC'),
    g.mark(Mg.Q, Mg.AC, GREEN2, { qTick: false }),
    g.mark(Mg.Q, Mg.P, AMBER, { pTick: false }),
    captions(`P = MC = ${money(Mg.P)}: ${k(Mg.Q)} units, but AC is ${money(Mg.AC)}.`, 'Below average cost: a loss the state must cover.', AMBER),
  ].join(''));
};

export const natDiagram = {
  id: id('diagram', 'regulating a natural monopoly price caps'),
  title: 'Regulating a Natural Monopoly',
  description: `IAL 3.3.5 · 1b: a natural monopoly's average cost falls at every output drawn, because one network's fixed cost is spread over more units. Left alone it sets MR = MC and prices above AC. A cap at average cost raises output with normal profit; a cap at marginal cost is allocatively efficient but below AC, so it makes a loss.`,
  checklist: [
    'Average cost falling throughout: the natural monopoly case (topic 3.3.3)',
    'The unregulated output where MR meets MC, and the price read off demand above it',
    'A cap at average cost where demand meets AC: normal profit',
    'A cap at marginal cost below AC: allocatively efficient, but a loss needing a subsidy',
  ],
  scenarios: [
    { label: 'Unregulated', svg: natUnregulatedSvg() },
    { label: 'Cap at average cost', svg: natAvgCapSvg() },
    { label: 'Cap at marginal cost', svg: natMargCapSvg() },
  ],
};

/* ══ 2 · Promoting Competition and Contestability (3.3.5 · 1c) ═════════════ */

const TELW = { Qmin: 0, Qmax: 66, Pmin: 0, Pmax: 120 };
const TEL_X = 'Subscribers (millions)';
const TEL_Y = 'Price ($ a month)';
const telD = [TEL.a / TEL.b, -1 / TEL.b];
const telMR = [TEL.a / (2 * TEL.b), -1 / (2 * TEL.b)];

const telStateSvg = () => {
  const g = plot(TELW, TEL_X, TEL_Y);
  const S = TEL.state;
  return svg(R.h, [
    g.axes('A state-owned monopoly'),
    g.labelled(...telD, CYAN, 'D'),
    g.labelled(...telMR, BLUE2, 'MR'),
    g.hLine(S.mc, AMBER, `MC ${money(S.mc)}`),
    g.dot(S.Q, S.mc, AMBER),
    g.mark(S.Q, S.P, RED2),
    captions(`The only network: ${money(S.P)} a month, ${S.Q} million.`, `Its marginal cost is ${money(S.mc)}.`, RED2),
  ].join(''));
};

const telPrivateSvg = () => {
  const g = plot(TELW, TEL_X, TEL_Y);
  const S = TEL.state, P = TEL.privat;
  return svg(R.h, [
    g.axes('Privatised, still the only network'),
    g.labelled(...telD, CYAN, 'D'),
    g.labelled(...telMR, BLUE2, 'MR'),
    g.hLine(S.mc, MUTED, null, { dash: '4 4' }),
    t(R.x0 + 4, round1(g.sy(S.mc) - 5), 'old MC', { size: SMALL, fill: MUTED, weight: 600 }),
    g.hLine(P.mc, AMBER, `MC ${money(P.mc)}`),
    g.dot(P.Q, P.mc, AMBER),
    g.mark(P.Q, P.P, PURPLE),
    captions(`Costs fall, but MR = MC again: ${money(P.P)}, ${P.Q} million.`, 'A private monopoly: most of the saving is profit.', PURPLE),
  ].join(''));
};

const telOpenSvg = () => {
  const g = plot(TELW, TEL_X, TEL_Y);
  const P = TEL.privat, O = TEL.open;
  return svg(R.h, [
    g.axes('Opened to rival networks'),
    g.labelled(...telD, CYAN, 'D'),
    g.hLine(P.mc, AMBER, `MC ${money(P.mc)}`),
    g.mark(P.Q, P.P, MUTED, { qTick: false }),
    g.mark(O.Q, O.P, GREEN2, { pTick: false }),
    captions(`Rivals drive price to MC: ${money(O.P)}, ${O.Q} million.`, 'Competition, not the sale, cut the price.', GREEN2),
  ].join(''));
};

export const telDiagram = {
  id: id('diagram', 'privatisation and competition telecoms'),
  title: 'Privatisation and Competition',
  description: 'IAL 3.3.5 · 1c: a state telecoms monopoly is privatised and cuts its costs, but as the only network it still sets MR = MC, so the price barely falls. Opening the market to rival networks drives the price towards marginal cost.',
  checklist: [
    'The monopoly price read off demand above the point where MR meets MC',
    'Privatisation drawn as a fall in MC, with the firm still setting MR = MC',
    'Competition drawn as the price driven down to MC, with output read off demand',
    'Privatisation alone does not shift a supply curve: the firm is still the only seller',
  ],
  scenarios: [
    { label: 'State monopoly', svg: telStateSvg() },
    { label: 'Privatised monopoly', svg: telPrivateSvg() },
    { label: 'Opened to rivals', svg: telOpenSvg() },
  ],
};

/* ══ 3 · Protecting Suppliers and Employees (3.3.5 · 1d) ═══════════════════ */

const CEMW = { Qmin: 0, Qmax: 80, Pmin: 0, Pmax: 50 };
const CEM_X = 'Cement (thousand bags a day)';
const CEM_Y = 'Price ($ a bag)';
const cemD = [CEM.dA, -CEM.dB];
const cemHome = [CEM.hA, CEM.hB];
const cemAll = [CEM.hA, CEM.hB + CEM.fB];

const cemOpenSvg = () => {
  const g = plot(CEMW, CEM_X, CEM_Y);
  const O = CEM.open;
  return svg(R.h, [
    g.axes('Foreign suppliers allowed'),
    g.labelled(...cemD, CYAN, 'D'),
    g.labelled(...cemHome, MUTED, 'S home', { dash: '4 4' }),
    g.labelled(...cemAll, GREEN2, 'S all'),
    g.mark(O.Q, O.P, GREEN2),
    g.mark(O.home, O.P, MUTED, { pTick: false }),
    captions(`${money(O.P)} a bag: ${k(O.Q)} bought, ${k(O.home)} made at home.`, 'Foreign firms supply the rest.', GREEN2),
  ].join(''));
};

const cemShutSvg = () => {
  const g = plot(CEMW, CEM_X, CEM_Y);
  const O = CEM.open, S = CEM.shut;
  return svg(R.h, [
    g.axes('Foreign suppliers barred'),
    g.labelled(...cemD, CYAN, 'D'),
    g.labelled(...cemAll, MUTED, 'S all', { dash: '4 4' }),
    g.labelled(...cemHome, RED2, 'S home'),
    g.mark(O.Q, O.P, MUTED),
    g.mark(S.Q, S.P, RED2),
    captions(`Supply shifts left: ${money(S.P)} a bag, ${k(S.Q)} bought.`, 'Every bag now made by domestic firms.', RED2),
  ].join(''));
};

export const cemDiagram = {
  id: id('diagram', 'barriers to entry of foreign firms cement'),
  title: 'Barring Foreign Suppliers',
  description: 'IAL 3.3.5 · 1d: in a market supplied by domestic and foreign firms, barring the foreign firms shifts supply left to the domestic curve alone. Price rises and consumers buy less, while domestic firms sell more.',
  checklist: [
    'Market supply drawn as domestic plus foreign supply',
    'Barring foreign firms drawn as a leftward shift to the domestic supply curve',
    'The higher price and lower quantity read off demand',
    'Domestic output compared before and after: the protected suppliers\' gain',
  ],
  scenarios: [
    { label: 'Open market', svg: cemOpenSvg() },
    { label: 'Foreign firms barred', svg: cemShutSvg() },
  ],
};

/* ══ 4 · The Impact and Limits of Intervention (3.3.5 · 1e, 1f) ═══════════ */

const gapTrueSvg = () => {
  const g = plot(NATW, NAT_X, NAT_Y);
  const A = NAT.avg;
  return svg(R.h, [
    g.axes('A cap set on true costs'),
    g.labelled(...natD, CYAN, 'D = AR'),
    g.sampled((q) => NAT.ac(q), AC_FROM, NATW.Qmax, GREEN2, 'AC'),
    g.mark(A.Q, A.P, GREEN2),
    captions(`The regulator knows AC: cap ${money(A.P)}, ${k(A.Q)} units.`, 'Normal profit only.', GREEN2),
  ].join(''));
};

const gapClaimedSvg = () => {
  const g = plot(NATW, NAT_X, NAT_Y);
  const C = NAT.claimed;
  return svg(R.h, [
    g.axes('A cap set on claimed costs'),
    g.labelled(...natD, CYAN, 'D = AR'),
    g.sampled((q) => NAT.ac(q), AC_FROM, NATW.Qmax, GREEN2, 'AC'),
    g.sampled((q) => NAT.ac(q, NAT.padding), AC_FROM + 10, NATW.Qmax, RED2, 'AC₂', { dash: '6 4' }),
    g.mark(C.Q, C.P, RED2),
    g.mark(C.Q, C.trueAC, GREEN2, { qTick: false }),
    captions(`AC₂, the claimed cost, gives a cap of ${money(C.P)}.`, `True AC at ${k(C.Q)} units is ${money(C.trueAC)}.`, RED2),
  ].join(''));
};

export const gapDiagram = {
  id: id('diagram', 'asymmetric information price cap claimed costs'),
  title: 'An Information Gap in Regulation',
  description: 'IAL 3.3.5 · 1f: a regulator that knows the firm\'s true average cost can cap price at that cost. One that relies on the firm\'s own, overstated figures (AC₂) sets the cap where demand meets the claimed cost, and the firm keeps profit above normal.',
  checklist: [
    'The true AC curve and a claimed curve, AC₂, drawn above it',
    'Each cap placed where demand meets the cost curve the regulator believes',
    'The gap between the cap and true AC at the capped output: profit above normal',
    'The limit named: asymmetric information, which benchmarking can narrow',
  ],
  scenarios: [
    { label: 'Cap on true costs', svg: gapTrueSvg() },
    { label: 'Cap on claimed costs', svg: gapClaimedSvg() },
  ],
};

/* ══ 5 · Wage Controls in Labour Markets (3.3.5 · 2b) ══════════════════════ */

const LABW = { Qmin: 10, Qmax: 50, Pmin: 4, Pmax: 20 };
const LAB_X = 'Workers (thousands)';
const LAB_Y = 'Wage ($ an hour)';
const labD = (shift = 0) => [LAB.dA + shift, -LAB.dB];
const labS = (shift = 0) => [LAB.sA + shift, LAB.sB];

const minCompetitiveSvg = () => {
  const g = plot(LABW, LAB_X, LAB_Y);
  const L = LAB;
  return svg(R.h, [
    g.axes('A minimum wage: many employers'),
    g.labelled(...labD(), CYAN, 'D'),
    g.labelled(...labS(), GREEN2, 'S'),
    g.hLine(L.minW, RED2, `floor ${money(L.minW)}`),
    g.mark(L.eq.L, L.eq.W, MUTED),
    g.mark(L.minHired, L.minW, RED2, { pTick: false }),
    g.mark(L.minWilling, L.minW, AMBER, { pTick: false }),
    captions(`At ${money(L.minW)}: ${k(L.minHired)} hired, ${k(L.minWilling)} willing.`, `A surplus of ${k(L.minSurplus)} workers.`, RED2),
  ].join(''));
};

const MONW = { Qmin: 0, Qmax: 30, Pmin: 0, Pmax: 24 };
const monopsonySvg = () => {
  const g = plot(MONW, LAB_X, LAB_Y);
  const M = MON;
  /* supply W = s0 + s1·L ⇒ L = (W − s0)/s1; MCL W = s0 + 2·s1·L ⇒ L = (W − s0)/(2·s1); value W = v0 − v1·L ⇒ L = (v0 − W)/v1 */
  const S = [-M.s0 / M.s1, 1 / M.s1];
  const MCL = [-M.s0 / (2 * M.s1), 1 / (2 * M.s1)];
  const VAL = [M.v0 / M.v1, -1 / M.v1];
  const jumpTo = M.mclW(M.offered);
  return svg(R.h, [
    g.axes('A minimum wage: one dominant employer'),
    g.labelled(...S, GREEN2, 'S'),
    g.labelled(...MCL, MUTED, 'MCL', { dash: '4 4' }),
    g.labelled(...VAL, CYAN, 'MRP'),
    /* the MCL with the floor: flat at the floor up to what supply offers there, then back on the old MCL */
    line(g.sx(0), g.sy(M.floor), g.sx(M.offered), g.sy(M.floor), { stroke: RED2, sw: 3 }),
    line(g.sx(M.offered), g.sy(M.floor), g.sx(M.offered), g.sy(jumpTo), { stroke: RED2, sw: 1.5, dash: '3 3' }),
    t(R.x0 + 4, round1(g.sy(M.floor) - 5), `floor ${money(M.floor)}`, { size: SMALL, fill: RED2, weight: 600 }),
    /* unregulated: employment where MCL meets MRP, the wage read DOWN to the supply curve */
    line(g.sx(M.mono.L), g.sy(M.mclW(M.mono.L)), g.sx(M.mono.L), g.sy(M.mono.W), { stroke: MUTED, sw: 1, dash: '3 3' }),
    g.dot(M.mono.L, M.mclW(M.mono.L), MUTED),
    g.mark(M.mono.L, M.mono.W, MUTED),
    g.mark(M.withFloor.L, M.floor, RED2, { pTick: false }),
    captions(`Floor ${money(M.floor)}: ${k(M.withFloor.L)} hired, up from ${k(M.mono.L)} at ${money(M.mono.W)}.`, 'Pay and employment both rise.', RED2),
  ].join(''));
};

const TOPW = { Qmin: 4, Qmax: 30, Pmin: 60, Pmax: 180 };
const maxWageSvg = () => {
  const g = plot(TOPW, 'Managers (hundreds)', LAB_Y);
  const T = TOP;
  return svg(R.h, [
    g.axes('A maximum wage below equilibrium'),
    g.labelled(T.dA, -T.dB, CYAN, 'D'),
    g.labelled(T.sA, T.sB, GREEN2, 'S'),
    g.hLine(T.cap, AMBER, `cap ${money(T.cap)}`),
    g.mark(T.eq.L, T.eq.W, MUTED),
    g.mark(T.willing, T.cap, AMBER, { pTick: false }),
    g.mark(T.wanted, T.cap, CYAN, { pTick: false }),
    captions(`At ${money(T.cap)}: ${h(T.wanted)} wanted, ${h(T.willing)} willing.`, `A shortage of ${h(T.shortage)} managers.`, AMBER),
  ].join(''));
};

export const wageDiagram = {
  id: id('diagram', 'wage controls minimum and maximum wages'),
  title: 'Wage Controls',
  description: 'IAL 3.3.5 · 2b: a minimum wage above equilibrium in a competitive market leaves a surplus of labour; where one employer dominates, a floor between its wage and the competitive wage makes the marginal cost of labour flat up to the supply curve (the construction is topic 3.3.3), so pay and employment rise; a maximum wage below equilibrium leaves a shortage.',
  checklist: [
    'The competitive case first: the floor above equilibrium, hired read off demand, willing read off supply',
    'Where one employer dominates: the MCL (topic 3.3.3) flat at the floor up to the supply curve, then back on the old MCL',
    'Employment where the flat section meets supply, above the unregulated level',
    'A maximum wage drawn below equilibrium, with the shortage between demand and supply',
  ],
  scenarios: [
    { label: 'Minimum wage, many employers', svg: minCompetitiveSvg() },
    { label: 'Minimum wage, one employer', svg: monopsonySvg() },
    { label: 'Maximum wage', svg: maxWageSvg() },
  ],
};

/* ══ 6 · Taxes, Mobility and Fair Treatment (3.3.5 · 2b) ═══════════════════ */

const employerTaxSvg = () => {
  const g = plot(LABW, LAB_X, LAB_Y);
  const L = LAB;
  return svg(R.h, [
    g.axes('An employer contribution on each worker'),
    g.labelled(...labD(), MUTED, 'D', { dash: '4 4' }),
    g.labelled(...labD(-L.dB * L.tax), CYAN, 'D₁'),
    g.labelled(...labS(), GREEN2, 'S'),
    g.mark(L.eq.L, L.eq.W, MUTED, { pTick: false }),
    g.mark(L.taxed.L, L.firmPays, AMBER, { qTick: false }),
    g.mark(L.taxed.L, L.taxed.W, CYAN),
    captions(`Workers get ${money(L.taxed.W)}; firms pay ${money(L.firmPays)} in all.`, `Employment falls to ${k(L.taxed.L)}.`, CYAN),
  ].join(''));
};

const retrainingSvg = () => {
  const g = plot(LABW, LAB_X, LAB_Y);
  const L = LAB;
  return svg(R.h, [
    g.axes('Retraining into a shortage occupation'),
    g.labelled(...labD(), CYAN, 'D'),
    g.labelled(...labS(), MUTED, 'S', { dash: '4 4' }),
    g.labelled(...labS(L.train), GREEN2, 'S₁'),
    g.mark(L.eq.L, L.eq.W, MUTED, { pTick: false }),
    g.mark(L.trained.L, L.trained.W, GREEN2),
    captions(`${k(L.train)} more qualify: ${money(L.trained.W)}, ${k(L.trained.L)} employed.`, 'Vacancies fill; the wage rises more slowly.', GREEN2),
  ].join(''));
};

const discriminationSvg = () => {
  const g = plot(LABW, LAB_X, LAB_Y);
  const L = LAB;
  return svg(R.h, [
    g.axes('Discrimination against one group, removed'),
    g.labelled(...labD(L.bias), MUTED, 'D biased', { dash: '4 4' }),
    g.labelled(...labD(), PURPLE, 'D'),
    g.labelled(...labS(), GREEN2, 'S'),
    g.mark(L.biased.L, L.biased.W, MUTED),
    g.mark(L.eq.L, L.eq.W, PURPLE),
    captions(`Bias removed: ${money(L.biased.W)} to ${money(L.eq.W)}, ${k(L.biased.L)} to ${k(L.eq.L)}.`, 'The group\'s pay and jobs rise together.', PURPLE),
  ].join(''));
};

export const taxMobilityDiagram = {
  id: id('diagram', 'employment taxes retraining and discrimination'),
  title: 'Taxes, Training and Discrimination',
  description: 'IAL 3.3.5 · 2b: an employer contribution on each worker shifts demand for labour down by the tax, so the wage workers receive and employment both fall; retraining shifts supply to a shortage occupation right; removing discrimination shifts demand for the group\'s labour right.',
  checklist: [
    'The tax drawn as demand shifting down by the tax at every quantity, with the wage received and the cost to firms both marked',
    'Retraining drawn as a rightward shift of supply',
    'Discrimination drawn as demand for the group\'s labour below where it would otherwise be',
    'Each new equilibrium read off both axes',
  ],
  scenarios: [
    { label: 'Employer contribution', svg: employerTaxSvg() },
    { label: 'Retraining', svg: retrainingSvg() },
    { label: 'Discrimination removed', svg: discriminationSvg() },
  ],
};

/** One diagram pinned to each block, in block order. The runner derives `diagramId` from this. */
export const DIAGRAMS = [natDiagram, telDiagram, cemDiagram, gapDiagram, wageDiagram, taxMobilityDiagram];
export const EXTRA_DIAGRAMS = [];
export const ALL_DIAGRAMS = [...DIAGRAMS, ...EXTRA_DIAGRAMS];
