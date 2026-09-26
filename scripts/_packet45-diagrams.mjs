/**
 * PACKET 45 — labour-markets diagrams. Five, one pinned to each block, every figure drawn from `LAB`.
 *
 * The live section had three: a competitive-equilibrium diagram, the monopsony diagram whose SVGs
 * `topFix-04` says are mis-drawn (Wm off the supply curve, Qc and Qmin at the wrong intersections, a
 * "Wmin = MRP" note), and a "Wage Differentials and Labour Immobility" diagram with no scenarios.
 * Monopsony is 3.3.3 · 7 and is drawn — correctly — in `market-structures-contestability`
 * (`_packet29-diagrams.mjs:772`), so it is not redrawn here. `structure-06` / `specGap-06`'s
 * missing baseline — one firm facing a horizontal supply at the market wage — is drawn in two
 * places: the firm's own demand curve in chapter 1, and "One firm: a wage-taker" in chapter 3.
 *
 * ── THE FRAME IS 400 UNITS, WITH A 12-UNIT FLOOR ─────────────────────────────
 *
 * Packet 37's convention (V037): 15 for anything a student must read, 12 for secondary text. The
 * layout is packet 44's (title · y title · plot · ticks · x title · two caption rows), which clears
 * the collision guard's 1.2-of-a-face bound (packet 40) between every pair of rows; the runner checks
 * the emitted SVG, including every curve drawn as a `<path>`, rather than this comment.
 *
 * Every colour below is a key of `PALETTE` in `components/learn-mode/processSvg.js`; the runner
 * parses that file and asserts it.
 */
import { id, LAB, money, k, round1 } from './_packet45-util.mjs';

const L = LAB;

/* ── the frame, and the two type sizes ─────────────────────────────────────── */
export const FRAME = { w: 400, pad: 16 };
export const FACE = 15;
export const SMALL = 12;
export const MIN_FACE = SMALL;
/** The collision guard's bound, as a multiple of the larger face (packet 40's A/B'd number). */
export const COLLIDE_TOL = 1.2;
/** The vertical step between caption rows; must clear COLLIDE_TOL × FACE. */
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

const svg = (h, body) => `<svg width="${FRAME.w}" height="${h}" viewBox="0 0 ${FRAME.w} ${h}" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',system-ui,sans-serif;background:transparent">${body}</svg>`;
const t = (x, y, str, { size = FACE, fill = INK, anchor = 'start', weight = 400 } = {}) =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" font-weight="${weight}">${str}</text>`;
const line = (x1, y1, x2, y2, { stroke = AXIS, sw = 1.5, dash = null, marker = null } = {}) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ''}${marker ? ` marker-end="url(#${marker})"` : ''}/>`;
const path = (d, { stroke = AXIS, sw = 2, fill = 'none', dash = null } = {}) =>
  `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
const arrowDefs = (colours) => `<defs>${colours.map(([name, c]) => `<marker id="${name}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${c}"/></marker>`).join('')}</defs>`;

/* ── one layout for every wage / quantity-of-labour diagram ────────────────── */
/*
 * Rows, top to bottom: title 18 · y-axis title 40 · plot 56-222 · x ticks 238 · x-axis title 256 ·
 * captions 278 and 296. Each adjacent pair is at least 16 units apart, which clears 1.2 × 12 = 14.4.
 */
const R = { h: 306, title: 18, yTitle: 40, x0: 54, xR: 336, y1: 56, y0: 222, tick: 238, xTitle: 256, cap1: 278, cap2: 296 };

/**
 * A plot window over (quantity of labour, wage). Curves are `L = a + b·W` — the quantity of labour as
 * a function of the wage — CLIPPED to the window, so a line that leaves the box is never drawn or
 * labelled off the frame (packet 25's decision).
 */
const plot = ({ Lmin, Lmax, Wmin, Wmax }, xTitle) => {
  const sx = (q) => round1(R.x0 + ((q - Lmin) / (Lmax - Lmin)) * (R.xR - R.x0));
  const sy = (w) => round1(R.y0 - ((w - Wmin) / (Wmax - Wmin)) * (R.y0 - R.y1));
  const clip = (a, b) => {
    const wAt = (q) => (q - a) / b;
    const ends = [wAt(Lmin), wAt(Lmax)].sort((m, n) => m - n);
    const lo = Math.max(Wmin, ends[0]), hi = Math.min(Wmax, ends[1]);
    return [{ w: lo, q: a + b * lo }, { w: hi, q: a + b * hi }];
  };
  /** Draw a curve; return the SVG and both clipped ends so the caller can place its label. */
  const curve = (a, b, colour, { dash = null } = {}) => {
    const [p, r] = clip(a, b);
    return { svg: path(`M ${sx(p.q)} ${sy(p.w)} L ${sx(r.q)} ${sy(r.w)}`, { stroke: colour, sw: 2.5, dash }), ends: [p, r] };
  };
  /**
   * A curve with its label in the right margin where it leaves the right edge. Otherwise a DEMAND
   * curve is labelled at its lower end, just above the floor of the window, and a SUPPLY curve above
   * the top edge — never both at the top-left, where the y-axis title sits.
   */
  const labelled = (a, b, colour, name, { dash = null } = {}) => {
    const c = curve(a, b, colour, { dash });
    const right = c.ends.find((e) => Math.abs(e.q - Lmax) < 1e-6);
    const top = c.ends.find((e) => Math.abs(e.w - Wmax) < 1e-6);
    const floor = c.ends.find((e) => Math.abs(e.w - Wmin) < 1e-6);
    let label;
    if (right) label = t(R.xR + 4, round1(sy(right.w) + 4), name, { size: SMALL, fill: colour, weight: 600 });
    else if (b < 0 && floor) label = t(round1(sx(floor.q) + 6), round1(sy(floor.w) - 6), name, { size: SMALL, fill: colour, weight: 600 });
    else if (top) label = t(sx(top.q), R.y1 - 6, name, { anchor: 'middle', size: SMALL, fill: colour, weight: 600 });
    else label = t(round1(sx(c.ends[1].q) + 6), round1(sy(c.ends[1].w) - 6), name, { size: SMALL, fill: colour, weight: 600 });
    return c.svg + label;
  };
  /** A horizontal wage line across the window, labelled in the right margin. */
  const wageLine = (w, colour, name, { dash = null } = {}) =>
    line(R.x0, sy(w), R.xR, sy(w), { stroke: colour, sw: 2, dash })
    + t(R.xR + 4, round1(sy(w) + 4), name, { size: SMALL, fill: colour, weight: 600 });
  /** A point with dashed guides to both axes; either tick can be suppressed when it repeats. */
  const mark = (q, w, colour, { qTick = true, wTick = true, qText = null } = {}) => [
    line(R.x0, sy(w), sx(q), sy(w), { stroke: colour, sw: 1, dash: '3 3' }),
    line(sx(q), sy(w), sx(q), R.y0, { stroke: colour, sw: 1, dash: '3 3' }),
    `<circle cx="${sx(q)}" cy="${sy(w)}" r="4" fill="${colour}"/>`,
    wTick ? t(R.x0 - 6, round1(sy(w) + 4), String(w), { anchor: 'end', size: SMALL, fill: colour }) : '',
    qTick ? t(sx(q), R.tick, qText ?? String(q), { anchor: 'middle', size: SMALL, fill: colour }) : '',
  ].join('');
  const axes = (title) => [
    t(FRAME.w / 2, R.title, title, { anchor: 'middle', weight: 600, size: SMALL }),
    t(8, R.yTitle, 'Wage ($ an hour)', { size: SMALL, fill: AXIS }),
    line(R.x0, R.y1 - 8, R.x0, R.y0, { stroke: AXIS }),
    line(R.x0, R.y0, R.xR + 6, R.y0, { stroke: AXIS }),
    t(392, R.xTitle, xTitle, { anchor: 'end', size: SMALL, fill: AXIS }),
  ].join('');
  return { sx, sy, curve, labelled, wageLine, mark, axes };
};
const captions = (a, b, colour = MUTED) => t(16, R.cap1, a, { size: SMALL, fill: colour, weight: 600 }) + (b ? t(16, R.cap2, b, { size: SMALL, fill: MUTED }) : '');

/* the machinists' market, and the firm, share one window each across every diagram */
const MARKET = { Lmin: 20, Lmax: 56, Wmin: 6, Wmax: 18 };
const MARKET_X = 'Machinists (thousands)';
const FIRM = { Lmin: 0, Lmax: 10, Wmin: 0, Wmax: 33 };
const FIRM_X = 'Machinists at one workshop';

/* the market curves, as L = a + b·W */
const D0 = [L.dA, -L.dB];
const S0 = [L.sA, L.sB];
const shiftD = (by) => [L.dA + by, -L.dB];
const shiftS = (by) => [L.sA + by, L.sB];

/* the firm's demand for labour: the value of what the Lth worker adds, W = p·(base − L) ⇒ L = base − W/p */
const firmD = (p = L.price, base = L.mpp0) => [base, -1 / p];

/**
 * A downward-sloping firm curve and its label. `above`: to the upper right of a point near the top of
 * the curve, where the curve falls away below the text. `below`: below and to the left of a point,
 * where the curve rises away above it. Both are checked on the emitted SVG by the runner.
 */
const firmCurve = (g, p, base, colour, name, atL, { dash = null, place = 'above' } = {}) => {
  const [a, b] = firmD(p, base);
  const c = g.curve(a, b, colour, { dash });
  const w = p * (base - atL);
  const label = place === 'above'
    ? t(round1(g.sx(atL) + 8), round1(g.sy(w) - 8), name, { size: SMALL, fill: colour, weight: 600 })
    : t(round1(g.sx(atL) - 8), round1(g.sy(w) + 16), name, { anchor: 'end', size: SMALL, fill: colour, weight: 600 });
  return c.svg + label;
};

/* ══ 1 · The Demand for Labour (3.3.4 · 1a) ═════════════════════════════ */

const firmHireSvg = () => {
  const g = plot(FIRM, FIRM_X);
  return svg(R.h, [
    g.axes('One workshop: hire while output is worth the wage'),
    firmCurve(g, L.price, L.mpp0, GREEN2, 'MRP = demand', 1),
    g.wageLine(L.eq.W, CYAN, `W ${money(L.eq.W)}`),
    g.mark(L.firmL, L.eq.W, INK2, { wTick: false }),
    captions(`At ${money(L.eq.W)} it hires ${L.firmL}: the ${L.firmL}th adds ${money(L.value(L.firmL))}.`, `The next would add ${money(L.firmNext)}, less than the wage.`, GREEN2),
  ].join(''));
};

const firmWageRiseSvg = () => {
  const g = plot(FIRM, FIRM_X);
  return svg(R.h, [
    arrowDefs([['wr-amber', AMBER]]),
    g.axes('A higher wage: a movement along'),
    firmCurve(g, L.price, L.mpp0, GREEN2, 'MRP = demand', 1),
    g.wageLine(L.eq.W, MUTED, money(L.eq.W), { dash: '4 4' }),
    g.wageLine(L.W2, AMBER, money(L.W2)),
    g.mark(L.firmL, L.eq.W, INK2, { wTick: false }),
    g.mark(L.firmLW2, L.W2, AMBER, { wTick: false }),
    captions(`Wage ${money(L.eq.W)} → ${money(L.W2)}: ${L.firmL} → ${L.firmLW2} machinists.`, 'Same curve: only the wage changed.', AMBER),
  ].join(''));
};

const firmShiftSvg = () => {
  const g = plot(FIRM, FIRM_X);
  return svg(R.h, [
    g.axes('Price or productivity rises: a shift'),
    firmCurve(g, L.price, L.mpp0, GREEN2, 'MRP', 4, { place: 'below' }),
    firmCurve(g, L.price2, L.mpp0, PURPLE, 'MRP₁', 6, { dash: '6 4' }),
    g.wageLine(L.eq.W, CYAN, `W ${money(L.eq.W)}`),
    g.mark(L.firmL, L.eq.W, INK2, { wTick: false }),
    g.mark(L.firmLPrice, L.eq.W, PURPLE, { wTick: false }),
    captions(`Shirt price ${money(L.price)} → ${money(L.price2)}: ${L.firmL} → ${L.firmLPrice} at ${money(L.eq.W)}.`, 'One more shirt each an hour does the same.', PURPLE),
  ].join(''));
};

export const demandDiagram = {
  id: id('diagram', 'the demand for labour one firm hiring rule'),
  title: 'The Demand for Labour',
  description: 'IAL 3.3.4 · 1a: one workshop\'s demand for labour is the value of what each extra machinist adds (extra output × the price of the product, a price the workshop cannot change). A change in the wage moves along it; a change in the product price or in productivity shifts it.',
  checklist: [
    'The wage on the vertical axis, the number of workers on the horizontal',
    'A downward-sloping demand curve: each extra worker adds less (diminishing marginal productivity)',
    'The firm hires where the wage line meets the curve',
    'A wage change as a movement along; a price or productivity change as a new curve',
  ],
  scenarios: [
    { label: 'The hiring rule', svg: firmHireSvg() },
    { label: 'A higher wage', svg: firmWageRiseSvg() },
    { label: 'Price or productivity rises', svg: firmShiftSvg() },
  ],
};

/* ══ 2 · The Supply of Labour (3.3.4 · 2c, 2d) ══════════════════════════ */

const supplyShiftSvg = ({ title, by, colour, marker, cap1, cap2 }) => {
  const g = plot(MARKET, MARKET_X);
  const q1 = L.supply(L.eq.W, by);
  const dir = by < 0 ? -1 : 1;
  return svg(R.h, [
    arrowDefs([[marker, colour]]),
    g.axes(title),
    g.labelled(...S0, GREEN2, 'S'),
    g.labelled(...shiftS(by), colour, 'S₁', { dash: '6 4' }),
    g.mark(L.eq.L, L.eq.W, INK2),
    g.mark(q1, L.eq.W, colour, { wTick: false }),
    line(g.sx(L.eq.L) + 6 * dir, g.sy(L.eq.W) + 14, g.sx(q1) - 6 * dir, g.sy(L.eq.W) + 14, { stroke: colour, sw: 2, marker }),
    captions(cap1, cap2, colour),
  ].join(''));
};

const elasticitySvg = () => {
  const g = plot(MARKET, MARKET_X);
  const I = L.inel;
  return svg(R.h, [
    g.axes('The same rise in demand, two supply curves'),
    g.labelled(...D0, CYAN, 'D'),
    g.labelled(...shiftD(L.dUp), CYAN, 'D₁', { dash: '6 4' }),
    g.labelled(...S0, GREEN2, 'elastic S'),
    g.labelled(I.sA2, I.sB2, RED2, 'inelastic S'),
    g.mark(L.eq.L, L.eq.W, INK2),
    g.mark(L.eqD.L, L.eqD.W, GREEN2),
    g.mark(I.after.L, I.after.W, RED2),
    captions(`Elastic: ${money(L.eqD.W)}, ${k(L.eqD.L)}. Inelastic: ${money(I.after.W)}, ${k(I.after.L)}.`, 'Inelastic supply: more of the rise goes on pay.', RED2),
  ].join(''));
};

export const supplyDiagram = {
  id: id('diagram', 'the supply of labour to an occupation shifts and elasticity'),
  title: 'The Supply of Labour',
  description: 'IAL 3.3.4 · 2c and 2d: the supply of labour to one occupation, shifted right by net migration and left by a licence requirement, and the same rise in demand met by an elastic and an inelastic supply.',
  checklist: [
    'An upward-sloping supply curve, the wage on the vertical axis',
    `Net migration: S shifts right, ${k(L.sUp)} more willing at every wage`,
    'A licence, higher income tax or higher benefits: S shifts left',
    'With inelastic supply, a rise in demand raises the wage more and employment less',
  ],
  scenarios: [
    { label: 'Net migration', svg: supplyShiftSvg({ title: `A net inflow of ${k(L.sUp)} machinists`, by: L.sUp, colour: GREEN, marker: 'nm-green', cap1: `At ${money(L.eq.W)}: ${k(L.supply(L.eq.W, L.sUp))} willing instead of ${k(L.eq.L)}.`, cap2: 'A new curve: more willing at every wage.' }) },
    { label: 'A licence requirement', svg: supplyShiftSvg({ title: 'A licence some cannot meet', by: L.sReg, colour: RED2, marker: 'li-red', cap1: `At ${money(L.eq.W)}: ${k(L.supply(L.eq.W, L.sReg))} willing instead of ${k(L.eq.L)}.`, cap2: 'Tax or benefit rises shift S left in the same way.' }) },
    { label: 'Elastic and inelastic supply', svg: elasticitySvg() },
  ],
};

/* ══ 3 · Wage Determination in a Competitive Market (3.3.4 · 3a, 3b) ════ */

const equilibriumSvg = () => {
  const g = plot(MARKET, MARKET_X);
  return svg(R.h, [
    g.axes('Labour market equilibrium'),
    g.labelled(...D0, CYAN, 'D'),
    g.labelled(...S0, GREEN2, 'S'),
    g.mark(L.eq.L, L.eq.W, INK2),
    captions(`Wanted = willing at ${money(L.eq.W)}: ${k(L.eq.L)} machinists.`, 'Below it, a shortage; above it, a surplus.', INK2),
  ].join(''));
};

const wageTakerSvg = () => {
  const g = plot(FIRM, FIRM_X);
  return svg(R.h, [
    g.axes('One firm: a wage-taker'),
    firmCurve(g, L.price, L.mpp0, GREEN2, 'firm\'s demand', 1),
    g.wageLine(L.eq.W, CYAN, 'S = W'),
    g.mark(L.firmL, L.eq.W, INK2),
    captions(`The market sets ${money(L.eq.W)}; the firm faces a flat supply there.`, `It hires ${L.firmL}, where its demand meets that line.`, CYAN),
  ].join(''));
};

const marketShiftSvg = ({ title, d, s, eq, colour, cap1, cap2, which }) => {
  const g = plot(MARKET, MARKET_X);
  return svg(R.h, [
    g.axes(title),
    g.labelled(...D0, CYAN, 'D'),
    g.labelled(...S0, GREEN2, 'S'),
    which === 'd' ? g.labelled(...d, colour, 'D₁', { dash: '6 4' }) : g.labelled(...s, colour, 'S₁', { dash: '6 4' }),
    g.mark(L.eq.L, L.eq.W, INK2),
    g.mark(eq.L, eq.W, colour),
    captions(cap1, cap2, colour),
  ].join(''));
};

export const equilibriumDiagram = {
  id: id('diagram', 'labour market equilibrium and shifts'),
  title: 'Labour Market Equilibrium',
  description: 'IAL 3.3.4 · 3a and 3b: the machinists\' market clears where demand meets supply; one firm takes that wage as a horizontal supply; a shift of demand moves the wage and employment together, a shift of supply moves them apart.',
  checklist: [
    'D and S labelled, with the equilibrium wage and quantity marked on both axes',
    'One firm: a horizontal supply at the market wage, hiring where it meets the firm\'s demand',
    `Demand rises: ${money(L.eqD.W)} and ${k(L.eqD.L)} — both up`,
    `Supply rises: ${money(L.eqS.W)} and ${k(L.eqS.L)} — wage down, employment up`,
  ],
  scenarios: [
    { label: 'Equilibrium', svg: equilibriumSvg() },
    { label: 'One firm: a wage-taker', svg: wageTakerSvg() },
    { label: 'Demand rises', svg: marketShiftSvg({ title: 'Export orders rise: demand shifts right', d: shiftD(L.dUp), eq: L.eqD, colour: AMBER, which: 'd', cap1: `New equilibrium: ${money(L.eqD.W)}, ${k(L.eqD.L)} machinists.`, cap2: 'Wage and employment both rise.' }) },
    { label: 'Supply rises', svg: marketShiftSvg({ title: 'Net migration: supply shifts right', s: shiftS(L.sUp), eq: L.eqS, colour: PURPLE, which: 's', cap1: `New equilibrium: ${money(L.eqS.W)}, ${k(L.eqS.L)} machinists.`, cap2: 'The wage falls; employment rises.' }) },
  ],
};

/* ══ 4 · Trade Unions and Public-Sector Pay (3.3.4 · 2c, 3c) ════════════ */

const unionFloorSvg = () => {
  const g = plot(MARKET, MARKET_X);
  return svg(R.h, [
    g.axes('A negotiated wage above equilibrium'),
    g.labelled(...D0, CYAN, 'D'),
    g.labelled(...S0, GREEN2, 'S'),
    g.wageLine(L.unionW, RED2, `union ${money(L.unionW)}`),
    g.mark(L.eq.L, L.eq.W, MUTED),
    g.mark(L.unionJobs, L.unionW, RED2, { wTick: false }),
    g.mark(L.unionWilling, L.unionW, AMBER, { wTick: false }),
    captions(`At ${money(L.unionW)}: ${k(L.unionJobs)} hired, ${k(L.unionWilling)} willing.`, `A surplus of ${k(L.unionExcess)}; ${k(L.unionLost)} fewer jobs.`, RED2),
  ].join(''));
};

const unionEntrySvg = () => {
  const g = plot(MARKET, MARKET_X);
  return svg(R.h, [
    g.axes('The union restricts entry'),
    g.labelled(...D0, CYAN, 'D'),
    g.labelled(...S0, GREEN2, 'S'),
    g.labelled(...shiftS(L.sEntry), PURPLE, 'S₁', { dash: '6 4' }),
    g.mark(L.eq.L, L.eq.W, MUTED),
    g.mark(L.eqEntry.L, L.eqEntry.W, PURPLE),
    captions(`Supply ${k(L.sEntry).replace('-', '−')} at every wage: ${money(L.eqEntry.W)}, ${k(L.eqEntry.L)}.`, 'No queue: the others never qualified.', PURPLE),
  ].join(''));
};

const NURSE = { Lmin: 10, Lmax: 40, Wmin: 14, Wmax: 34 };

const publicPaySvg = () => {
  const N = L.nurse;
  const g = plot(NURSE, 'Nurses (thousands)');
  return svg(R.h, [
    g.axes('Public-sector pay set below equilibrium'),
    g.labelled(N.dA3, -N.dB3, CYAN, 'D'),
    g.labelled(N.sA3, N.sB3, GREEN2, 'S'),
    g.wageLine(N.set, AMBER, `set ${money(N.set)}`),
    g.mark(N.L, N.W, MUTED),
    g.mark(N.willing, N.set, AMBER, { wTick: false }),
    g.mark(N.wanted, N.set, CYAN, { wTick: false }),
    captions(`At ${money(N.set)}: ${k(N.wanted)} wanted, ${k(N.willing)} willing.`, `${k(N.vacancies)} posts stay empty; clearing pay ${money(N.W)}.`, AMBER),
  ].join(''));
};

export const unionsDiagram = {
  id: id('diagram', 'trade unions and public sector pay'),
  title: 'Trade Unions and Public-Sector Pay',
  description: 'IAL 3.3.4 · 2c and 3c: a union wage above equilibrium leaves a surplus of labour; restricting entry shifts supply left to the same wage; public-sector pay set below equilibrium leaves vacancies.',
  checklist: [
    `A negotiated wage of ${money(L.unionW)} drawn as a horizontal line above equilibrium`,
    'The quantity hired read off demand, the quantity willing read off supply, the gap between them marked',
    'Restricting entry drawn as a leftward shift of supply',
    'Public-sector pay set below equilibrium, with the vacancies it leaves',
  ],
  scenarios: [
    { label: 'A negotiated wage', svg: unionFloorSvg() },
    { label: 'Restricting entry', svg: unionEntrySvg() },
    { label: 'Public-sector pay', svg: publicPaySvg() },
  ],
};

/* ══ 5 · Market Failure in the Labour Market (3.3.4 · 4a, 4b) ═══════════ */

const regionSvg = ({ title, by, eq, colour, cap1, cap2 }) => {
  const g = plot(MARKET, MARKET_X);
  const atOld = L.demand(L.eq.W, by);
  return svg(R.h, [
    g.axes(title),
    g.labelled(...D0, MUTED, 'D', { dash: '4 4' }),
    g.labelled(...S0, GREEN2, 'S'),
    g.labelled(...shiftD(by), colour, 'D₁'),
    g.mark(L.eq.L, L.eq.W, INK2),
    g.mark(eq.L, eq.W, colour),
    g.mark(atOld, L.eq.W, colour, { wTick: false }),
    captions(cap1, cap2, colour),
  ].join(''));
};

export const immobilityDiagram = {
  id: id('diagram', 'immobility of labour two regions'),
  title: 'Immobility: Two Regions',
  description: 'IAL 3.3.4 · 4a: demand for machinists falls in one region and rises in another. If workers cannot move, the wage gap does not close, and if pay stays at the old wage in both there are jobless workers in one region and vacancies in the other.',
  checklist: [
    'Two regional labour markets with the same supply and the same starting point',
    `North: D shifts left; the wage falls to ${money(L.north.W)}, or at ${money(L.eq.W)} ${k(L.northJobless)} are jobless`,
    `South: D shifts right; the wage rises to ${money(L.south.W)}, or at ${money(L.eq.W)} ${k(L.southVacant)} posts are empty`,
    'The gap persists because workers cannot move between the two',
  ],
  scenarios: [
    { label: 'North: demand falls', svg: regionSvg({ title: 'The North: workshops close', by: -12, eq: L.north, colour: RED2, cap1: `Wage ${money(L.north.W)} if it falls; at ${money(L.eq.W)}, ${k(L.northJobless)} jobless.`, cap2: 'The workers cannot move South.' }) },
    { label: 'South: demand rises', svg: regionSvg({ title: 'The South: orders grow', by: 12, eq: L.south, colour: AMBER, cap1: `Wage ${money(L.south.W)} if it rises; at ${money(L.eq.W)}, ${k(L.southVacant)} vacancies.`, cap2: 'Idle workers in the North could fill them.' }) },
  ],
};

/** One diagram pinned to each block, in block order. The runner derives `diagramId` from this. */
export const DIAGRAMS = [
  demandDiagram,
  supplyDiagram,
  equilibriumDiagram,
  unionsDiagram,
  immobilityDiagram,
];
export const EXTRA_DIAGRAMS = [];
export const ALL_DIAGRAMS = [...DIAGRAMS, ...EXTRA_DIAGRAMS];
