/**
 * PACKET 38 — macroeconomic-objectives-policies diagrams. Seven, one pinned to each block, every
 * curve position computed from `ECON` rather than drawn by eye.
 *
 * ── `structure-01` IS THE WHOLE REASON THIS MODULE EXISTS ──────────────────
 *
 * The live section has four good diagrams with checklists and **not one of them renders**. The
 * blocks name them by `diagramRefs` — `fiscal-policy-ad`, `monetary-policy-transmission`,
 * `supply-side-lras`, `phillips-curve` — and the diagrams are titled "Fiscal Policy: AD/AS
 * Impact", "Monetary Policy Transmission Mechanism", "Supply-Side Policy: LRAS Shift" and "The
 * Phillips Curve". `LearnModeTab.jsx:97-104` matches with `t.includes(ref) || ref.includes(t)`,
 * so a hyphen against a space fails silently, four times. The Phillips-curve block tells a student
 * to "draw both curves" over an empty space.
 *
 * `topFix-01` asks for the MATCHING to be made hyphen-insensitive. That fixes this instance and
 * leaves the next one representable. **Every block gets its own diagram and the runner derives
 * `diagramId` per block from this array's order**, so a pin that resolves to nothing cannot be
 * written — which is `pins.diagram`, BLOCK, and 1 of the 45 the live section carries.
 *
 * ── THE FRAME IS 400 UNITS (packet 37, ledger V037 still open) ─────────────
 *
 * The measured Learn Mode column is ~313 CSS px, so a 400-unit frame scales by 0.783 and a
 * 15-unit label lands at 11.7px, a 12-unit one at 9.4. That is the better end of a convention the
 * founder ruled programme-wide, not a fix for it.
 *
 * **AND THE ENLARGE VIEW MUST FIT 390px.** Packet 37's Verify B blocked on exactly this: its
 * AD/AS diagram opened at 858 CSS px inside a 390px phone and needed horizontal scroll to reach
 * its own labels. Every SVG here declares `width="400"` with a matching `viewBox`, and the runner
 * asserts that no diagram declares a width above the frame — the property that was violated.
 *
 * ── NOT DECLARED AS TABLES, DELIBERATELY ──────────────────────────────────
 *
 * Diagrams 1, 3 and 4 lay text out on a grid and `diagram.table-kind` will report them. It is
 * INFO and its own rule text says it is right about 8 of 26 and that a human decides: these are
 * concept panels a student could reproduce in an exam, not reference tables to look values up in,
 * so they keep their checklists and are not declared `kind: 'table'`. Declaring them would strip
 * the checklist (`diagram.table-checklist`) from three diagrams that genuinely have one.
 *
 * Every colour below is a key of `PALETTE` in `components/learn-mode/processSvg.js`; the runner
 * parses that file and asserts it rather than trusting this comment (packet 32).
 */
import { id, ECON, bn, pct, idx, round1 } from './_packet38-util.mjs';

const E = ECON;

/* ── the frame, and the two type sizes ─────────────────────────────────────── */
export const FRAME = { w: 400, pad: 16 };
/** Anything a student must read to answer a question. */
export const FACE = 15;
/** Secondary text: axis ticks, notes, the units line. */
export const SMALL = 12;
/** The floor the runner enforces on every `font-size` this module emits. */
export const MIN_FACE = SMALL;

/* ── palette, all of it in processSvg's map ────────────────────────────────── */
const INK = '#e8ecf5';
const MUTED = '#7a8299';
const AXIS = '#94a3b8';
const GRID = '#475569';
const GREEN = '#059669';
const GREEN2 = '#34d399';
const RED = '#ef4444';
const RED2 = '#f87171';
const BLUE = '#3b82f6';
const BLUE2 = '#60a5fa';
const AMBER = '#f59e0b';
const PURPLE = '#8b5cf6';
const CYAN = '#22d3ee';

/** A rough text width, used by the runner's overrun check. DM Sans at ~0.56em average. */
export const estWidth = (text, size = FACE) => String(text).length * size * 0.56;

const svg = (h, body) => `<svg width="${FRAME.w}" height="${h}" viewBox="0 0 ${FRAME.w} ${h}" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',system-ui,sans-serif;background:transparent">${body}</svg>`;
const t = (x, y, str, { size = FACE, fill = INK, anchor = 'start', weight = 400 } = {}) =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" font-weight="${weight}">${str}</text>`;
const box = (x, y, w, h, { fill = 'none', stroke = GRID, rx = 8, sw = 1.5 } = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
const line = (x1, y1, x2, y2, { stroke = AXIS, sw = 1.5, dash = null, marker = null } = {}) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ''}${marker ? ` marker-end="url(#${marker})"` : ''}/>`;
const path = (d, { stroke = AXIS, sw = 2, fill = 'none', dash = null, marker = null } = {}) =>
  `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ''}${marker ? ` marker-end="url(#${marker})"` : ''}/>`;
const dot = (x, y, colour, r = 4) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${colour}"/>`;
const arrowDefs = (colours) => `<defs>${colours.map(([name, c]) => `<marker id="${name}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${c}"/></marker>`).join('')}</defs>`;

/* ══ 1 · The Six Objectives (2.3.6 · 1a-1f) ══════════════════════════════ */
/*
 * SIX BOXES, BECAUSE THE LIVE SECTION TEACHES FOUR. The two on the bottom row are `1e` and `1f`,
 * which is `specGap-01`'s real content once "protection of the environment" is removed from it —
 * that is `2b`, a conflict, and it appears on diagram 7 instead.
 */
const objectivesSvg = () => {
  const h = 300;
  const cols = [20, 208], bw = 172, bh = 62, rows = [52, 132, 212];
  const cells = [
    ['Economic growth', `${pct(E.growth)} now, ${pct(E.growthTarget)} aimed at`, GREEN2],
    ['Low, stable inflation', `${pct(E.inflation)} now, target ${pct(E.inflationTarget)}`, BLUE2],
    ['Low unemployment', `${pct(E.unemployment)} of the labour force`, AMBER],
    ['Current account', `deficit ${pct(Math.abs(E.currentAccountPctGdp))} of GDP`, CYAN],
    ['Balanced budget', `deficit ${pct(Math.abs(E.budgetPctGdp))} of GDP`, PURPLE],
    ['Greater equality', `top fifth ${pct(E.topFifthShare)}, bottom ${pct(E.bottomFifthShare)}`, RED2],
  ];
  return svg(h, [
    t(FRAME.w / 2, 24, `The six objectives, read off ${E.country}`, { anchor: 'middle', weight: 600 }),
    ...cells.flatMap(([name, reading, colour], i) => {
      const x = cols[i % 2], y = rows[Math.floor(i / 2)];
      return [
        box(x, y, bw, bh, { stroke: colour }),
        t(x + 12, y + 26, name, { size: FACE, fill: INK, weight: 600 }),
        t(x + 12, y + 46, reading, { size: SMALL, fill: MUTED }),
      ];
    }),
    t(20, 288, 'All six at once is not available — chapter 7 is why', { size: SMALL, fill: MUTED }),
  ].join(''));
};

/* ══ 2 · Fiscal Policy on AD/AS (2.3.6 · 4b) ═════════════════════════════ */
/*
 * THE PLOT WINDOW IS CHOSEN SO EVERY POINT THE SECTION QUOTES FITS INSIDE IT, and every curve is
 * CLIPPED to it rather than drawn to a fixed pair of price levels (packet 25: a bounds check that
 * reads an anchor cannot see a string that has run off the frame).
 */
const WINDOW = { Ymin: 740, Ymax: 880, Pmin: 85, Pmax: 115 };
const plot = ({ x0 = 56, y0 = 250, x1 = 374, y1 = 50, win = WINDOW }) => {
  const sx = (y) => round1(x0 + ((y - win.Ymin) / (win.Ymax - win.Ymin)) * (x1 - x0));
  const sy = (p) => round1(y0 - ((p - win.Pmin) / (win.Pmax - win.Pmin)) * (y0 - y1));
  /** Clip Y = intercept + slope·P to the window and return its two visible endpoints. */
  const clip = (intercept, slope) => {
    const pAt = (y) => (y - intercept) / slope;
    const ends = [pAt(win.Ymin), pAt(win.Ymax)].sort((a, b) => a - b);
    const lo = Math.max(win.Pmin, ends[0]), hi = Math.min(win.Pmax, ends[1]);
    return [{ p: lo, y: intercept + slope * lo }, { p: hi, y: intercept + slope * hi }];
  };
  const curve = (intercept, slope, colour, dash = null) => {
    const [a, b] = clip(intercept, slope);
    return { d: path(`M ${sx(a.y)} ${sy(a.p)} L ${sx(b.y)} ${sy(b.p)}`, { stroke: colour, sw: 2.5, dash }), a, b };
  };
  const axes = [
    line(x0, y1 - 8, x0, y0, { stroke: AXIS }),
    line(x0, y0, x1 + 6, y0, { stroke: AXIS }),
    t(x0 - 8, y1 - 14, 'Price level', { anchor: 'start', size: SMALL, fill: AXIS }),
    t(x1 + 6, y0 + 34, 'Real output ($bn)', { anchor: 'end', size: SMALL, fill: AXIS }),
  ];
  const mark = (y, p, colour) => [
    line(x0, sy(p), sx(y), sy(p), { stroke: colour, sw: 1, dash: '3 3' }),
    line(sx(y), sy(p), sx(y), y0, { stroke: colour, sw: 1, dash: '3 3' }),
    dot(sx(y), sy(p), colour),
    t(x0 - 6, sy(p) + 5, idx(p), { anchor: 'end', size: SMALL, fill: colour }),
    t(sx(y), y0 + 17, String(y), { anchor: 'middle', size: SMALL, fill: colour }),
  ];
  return { sx, sy, curve, axes, mark, x0, y0, x1, y1 };
};

const fiscalAdAsSvg = () => {
  const h = 300;
  const p = plot({});
  const asIntercept = E.gdp - E.srasSlope * E.P0;                    // 200
  const ad = p.curve(E.adIntercept, -E.adSlope, BLUE2);
  const ad2 = p.curve(E.adIntercept + E.adShift, -E.adSlope, BLUE);
  const as = p.curve(asIntercept, E.srasSlope, GREEN2);
  return svg(h, [
    arrowDefs([['fis-blue', BLUE]]),
    t(FRAME.w / 2, 24, `A ${bn(E.fiscalInjection)} rise in government spending`, { anchor: 'middle', weight: 600, size: FACE }),
    ...p.axes,
    as.d,
    t(p.sx(as.b.y) - 18, p.sy(as.b.p) + 4, 'SRAS', { anchor: 'middle', size: SMALL, fill: GREEN2, weight: 600 }),
    ad.d,
    t(p.sx(ad.b.y) + 16, p.sy(ad.b.p) + 4, 'AD', { anchor: 'middle', size: SMALL, fill: BLUE2, weight: 600 }),
    ad2.d,
    t(p.sx(ad2.b.y) + 18, p.sy(ad2.b.p) + 4, 'AD₂', { anchor: 'middle', size: SMALL, fill: BLUE, weight: 600 }),
    ...p.mark(E.gdp, E.P0, MUTED),
    ...p.mark(E.Yfiscal, E.Pfiscal, RED2),
    t(20, 282, `AD shifts right by ${bn(E.adShift)}: output +${bn(E.Yfiscal - E.gdp)}, price level +${idx(E.Pfiscal - E.P0)}`, { size: SMALL, fill: MUTED }),
  ].join(''));
};

/* ══ 3 · The Four Monetary Instruments (2.3.6 · 4c) ══════════════════════ */
/*
 * SPLIT BY WHAT THEY CHANGE, NOT LISTED. Two change the PRICE of credit and two change its
 * QUANTITY, and that is the distinction `4c-3` and `4c-4` are for — the two instruments the live
 * section does not teach at all.
 */
const monetaryInstrumentsSvg = () => {
  const h = 290;
  const colX = [20, 208], bw = 172;
  const groups = [
    { head: 'THE PRICE OF CREDIT', colour: BLUE2, items: [
      ['Interest rates', `policy rate ${pct(E.policyRate)}`],
      ['Asset purchases', 'bond prices up, long rates down'],
    ] },
    { head: 'THE QUANTITY OF CREDIT', colour: AMBER, items: [
      ['Lending criteria', 'who may borrow'],
      ['Reserve requirements', 'what a bank must hold back'],
    ] },
  ];
  return svg(h, [
    t(FRAME.w / 2, 24, 'Four instruments, two kinds', { anchor: 'middle', weight: 600 }),
    ...groups.flatMap((g, gi) => {
      const x = colX[gi];
      return [
        t(x, 52, g.head, { size: SMALL, fill: g.colour, weight: 600 }),
        ...g.items.flatMap(([name, note], i) => {
          const y = 66 + i * 86;
          return [
            box(x, y, bw, 70, { stroke: g.colour }),
            t(x + 12, y + 28, name, { size: FACE, weight: 600 }),
            t(x + 12, y + 50, note, { size: SMALL, fill: MUTED }),
          ];
        }),
      ];
    }),
    line(20, 252, 380, 252, { stroke: GRID, sw: 1, dash: '3 4' }),
    t(20, 274, 'A rate reaches everyone; a lending rule can be aimed', { size: SMALL, fill: MUTED }),
  ].join(''));
};

/* ══ 4 · Who Decides What (2.3.6 · 4d) ═══════════════════════════════════ */
/*
 * `specGap-03` reports the central bank's role as "only implicit". `4d` is four leaves and the
 * live section evidences none of them. The diagram is the split the chapter turns on: the goal
 * comes from one building and the instrument from the other.
 */
const centralBankSvg = () => {
  const h = 310;
  const bw = 168;
  return svg(h, [
    arrowDefs([['cb-amber', AMBER]]),
    t(FRAME.w / 2, 24, 'Who decides what', { anchor: 'middle', weight: 600 }),

    box(20, 44, bw, 76, { stroke: PURPLE }),
    t(104, 68, 'GOVERNMENT', { anchor: 'middle', size: SMALL, fill: PURPLE, weight: 600 }),
    t(104, 90, 'sets the target', { anchor: 'middle', size: FACE, weight: 600 }),
    t(104, 110, `${pct(E.inflationTarget)} ± ${pct(E.inflationBand)}`, { anchor: 'middle', size: SMALL, fill: MUTED }),

    line(192, 82, 208, 82, { stroke: AMBER, sw: 2, marker: 'cb-amber' }),

    box(212, 44, bw, 76, { stroke: CYAN }),
    t(296, 68, 'CENTRAL BANK', { anchor: 'middle', size: SMALL, fill: CYAN, weight: 600 }),
    t(296, 90, 'picks the instrument', { anchor: 'middle', size: FACE, weight: 600 }),
    t(296, 110, 'rates, purchases, rules', { anchor: 'middle', size: SMALL, fill: MUTED }),

    t(20, 150, 'AND THE OTHER THREE ROLES', { size: SMALL, fill: AXIS, weight: 600 }),
    ...[
      ['Implements the policy it chose', CYAN],
      ['Banker to the government', GREEN2],
      ['Banker to the banks: lender of last resort', RED2],
    ].flatMap(([label, colour], i) => {
      const y = 164 + i * 44;
      return [
        box(20, y, 360, 34, { stroke: colour }),
        t(34, y + 23, label, { size: SMALL }),
      ];
    }),
    t(20, 300, 'Independence is over the instrument, never over the goal', { size: SMALL, fill: MUTED }),
  ].join(''));
};

/* ══ 5 · A Supply-Side Policy on AD/LRAS (2.3.6 · 3a) ════════════════════ */
/*
 * THE SIGN PROPERTY, AND IT IS THE OPPOSITE OF DIAGRAM 2's. Output rises and the price level
 * FALLS. The runner asserts both diagrams' figures against `ECON` and asserts that the two move
 * in opposite directions, because that contrast is the single most examinable claim in chapters
 * 5 and 6 and it is the one a student reproduces wrongly by shifting AD.
 */
const supplySideSvg = () => {
  const h = 300;
  const win = { Ymin: 770, Ymax: 860, Pmin: 80, Pmax: 115 };
  const p = plot({ win });
  const ad = p.curve(E.adIntercept, -E.adSlope, BLUE2);
  const vline = (y, colour, dash = null) => path(`M ${p.sx(y)} ${p.y1 - 8} L ${p.sx(y)} ${p.y0}`, { stroke: colour, sw: 2.5, dash });
  return svg(h, [
    t(FRAME.w / 2, 24, `Capacity rises by ${bn(E.lrasShift)}`, { anchor: 'middle', weight: 600, size: FACE }),
    ...p.axes,
    vline(E.gdp, GREEN2),
    t(p.sx(E.gdp) - 8, p.y1 - 12, 'LRAS', { anchor: 'end', size: SMALL, fill: GREEN2, weight: 600 }),
    vline(E.Ysupply, GREEN),
    t(p.sx(E.Ysupply) + 8, p.y1 - 12, 'LRAS₂', { anchor: 'start', size: SMALL, fill: GREEN, weight: 600 }),
    ad.d,
    t(p.sx(ad.b.y) + 14, p.sy(ad.b.p) + 4, 'AD', { anchor: 'middle', size: SMALL, fill: BLUE2, weight: 600 }),
    ...p.mark(E.gdp, E.P0, MUTED),
    ...p.mark(E.Ysupply, E.Psupply, GREEN),
    t(20, 282, `Output +${bn(E.lrasShift)}, price level DOWN to ${idx(E.Psupply)}`, { size: SMALL, fill: MUTED }),
  ].join(''));
};

/* ══ 6 · Two Routes, Opposite Costs (2.3.6 · 3b, 3c, 3d) ════════════════ */

const twoRoutesSvg = () => {
  const h = 300;
  const bw = 172;
  return svg(h, [
    arrowDefs([['tr-green', GREEN2]]),
    t(FRAME.w / 2, 24, 'Two routes to the same shift', { anchor: 'middle', weight: 600 }),
    box(20, 42, bw, 128, { stroke: BLUE2 }),
    t(106, 64, 'FREE MARKET', { anchor: 'middle', size: SMALL, fill: BLUE2, weight: 600 }),
    ...['Deregulation', 'Privatisation', 'Lower tax rates', 'Welfare withdrawal', 'Less bureaucracy']
      .map((s, i) => t(32, 86 + i * 18, `· ${s}`, { size: SMALL })),
    box(208, 42, bw, 128, { stroke: AMBER }),
    t(294, 64, 'INTERVENTIONIST', { anchor: 'middle', size: SMALL, fill: AMBER, weight: 600 }),
    ...['Education and skills', 'Investment incentives', 'Infrastructure', 'Start-up finance', 'Regional policy']
      .map((s, i) => t(220, 86 + i * 18, `· ${s}`, { size: SMALL })),
    line(106, 176, 106, 198, { stroke: GREEN2, sw: 2, marker: 'tr-green' }),
    line(294, 176, 294, 198, { stroke: GREEN2, sw: 2, marker: 'tr-green' }),
    box(20, 202, 360, 42, { stroke: GREEN2 }),
    t(200, 228, `Long-run supply right: output ${bn(E.Ysupply)}`, { anchor: 'middle', size: FACE, weight: 600 }),
    t(20, 268, 'Free-market route risks the income gap', { size: SMALL, fill: BLUE2 }),
    t(20, 288, 'Interventionist route risks the budget', { size: SMALL, fill: AMBER }),
  ].join(''));
};

/* ══ 7 · The Short-Run Phillips Curve (2.3.6 · 2a) ═══════════════════════ */
/*
 * THE CURVE IS SAMPLED FROM THE FUNCTION IT CLAIMS (packet 15's decision), not drawn by hand, and
 * there is NO long-run curve on it. `2a` reads "including the short-run Phillips curve" and stops;
 * `long-run Phillips`, `expectations-augmented`, `NAIRU` and `natural rate` are each 0 hits in
 * the specification, which is `specGap-09` and the finding's doubt was correct.
 */
const phillipsSvg = () => {
  const h = 300;
  const x0 = 56, y0 = 250, x1 = 374, y1 = 50;
  const uMin = 3, uMax = 11, piMin = 0, piMax = 7;
  const sx = (u) => round1(x0 + ((u - uMin) / (uMax - uMin)) * (x1 - x0));
  const sy = (pi) => round1(y0 - ((pi - piMin) / (piMax - piMin)) * (y0 - y1));
  const samples = [];
  for (let u = 3.6; u <= 11.001; u += 0.2) {
    const pi = E.phillips(u);
    if (pi >= piMin && pi <= piMax) samples.push(`${sx(u)} ${sy(pi)}`);
  }
  return svg(h, [
    arrowDefs([['ph-red', RED2]]),
    t(FRAME.w / 2, 24, 'The short-run Phillips curve', { anchor: 'middle', weight: 600 }),
    line(x0, y1 - 8, x0, y0, { stroke: AXIS }),
    line(x0, y0, x1 + 6, y0, { stroke: AXIS }),
    t(x0 - 8, y1 - 14, 'Inflation (%)', { anchor: 'start', size: SMALL, fill: AXIS }),
    t(x1 + 6, y0 + 34, 'Unemployment (%)', { anchor: 'end', size: SMALL, fill: AXIS }),
    path(`M ${samples.join(' L ')}`, { stroke: PURPLE, sw: 2.5 }),
    t(sx(9.6) , sy(E.phillips(9.6)) - 12, 'SRPC', { anchor: 'middle', size: SMALL, fill: PURPLE, weight: 600 }),
    /* the economy's own point, and the point a reflationary policy would move it to */
    ...[[E.unemployment, E.phillipsHere, MUTED], [E.uTarget, E.piAtTarget, RED2]].flatMap(([u, pi, colour]) => [
      line(x0, sy(pi), sx(u), sy(pi), { stroke: colour, sw: 1, dash: '3 3' }),
      line(sx(u), sy(pi), sx(u), y0, { stroke: colour, sw: 1, dash: '3 3' }),
      dot(sx(u), sy(pi), colour),
      t(x0 - 6, sy(pi) + 5, pct(pi), { anchor: 'end', size: SMALL, fill: colour }),
      t(sx(u), y0 + 17, pct(u), { anchor: 'middle', size: SMALL, fill: colour }),
    ]),
    path(`M ${sx(E.unemployment) - 6} ${sy(E.phillipsHere) - 6} L ${sx(E.uTarget) + 8} ${sy(E.piAtTarget) + 8}`, { stroke: RED2, sw: 2, marker: 'ph-red' }),
    t(20, 282, `${E.unemploymentBought} points of unemployment for ${E.inflationPaid} of inflation`, { size: SMALL, fill: MUTED }),
  ].join(''));
};

/* ══ The seven, in block order ═══════════════════════════════════════════ */

const mk = (title, description, checklist, svgs) => ({
  id: id('diagram', title),
  title,
  description,
  checklist,
  scenarios: svgs,
});

export const DIAGRAMS = [
  mk('The Six Macroeconomic Objectives',
    `The six objectives of sub-topic 1, each with ${E.country}'s current reading against it.`,
    [
      'All six named, not four — the budget and income equality included',
      'Growth stated as REAL output, and as a rate that can be sustained',
      'The inflation objective stated as low AND stable, not zero',
      'Each objective paired with the figure that measures it',
    ],
    [{ label: 'The six objectives', svg: objectivesSvg() }]),

  mk('Fiscal Policy on AD/AS',
    `A ${bn(E.fiscalInjection)} rise in government spending shifting AD right along an upward-sloping short-run supply curve.`,
    [
      'Price level on the vertical axis, real output on the horizontal',
      'AD shifting RIGHT, and the shift labelled with its size',
      `Both new readings marked: output ${bn(E.Yfiscal)} and price level ${idx(E.Pfiscal)}`,
      'Output and the price level moving the SAME way',
    ],
    [{ label: 'A fiscal expansion', svg: fiscalAdAsSvg() }]),

  mk('The Four Monetary Instruments',
    'The four instruments of sub-topic 4c, split by whether they change the price of credit or its quantity.',
    [
      'All four named: rates, asset purchases, lending criteria, reserve requirements',
      'The split stated: two change the price of credit, two change the quantity',
      'The aiming point: a rate reaches every borrower, a lending rule can be aimed',
    ],
    [{ label: 'Price and quantity', svg: monetaryInstrumentsSvg() }]),

  mk('Who Decides What in Monetary Policy',
    'The split between the government, which sets the target, and the central bank, which chooses the instrument — plus the bank\'s other three roles.',
    [
      'The target set by the government, with its figure and band',
      'The instrument chosen by the central bank, not by the government',
      'All four roles from sub-topic 4d present',
      'Independence shown as being over the instrument, never over the goal',
    ],
    [{ label: 'Goal and instrument', svg: centralBankSvg() }]),

  mk('A Supply-Side Policy on AD and LRAS',
    `A rise in capacity of ${bn(E.lrasShift)} shifting the long-run supply curve right against an unchanged AD.`,
    [
      'The LONG-RUN supply curve moving, drawn vertical — not AD',
      `Output rising to ${bn(E.Ysupply)}`,
      `The price level FALLING, to ${idx(E.Psupply)}`,
      'Output and the price level moving in OPPOSITE directions',
    ],
    [{ label: 'A rise in capacity', svg: supplySideSvg() }]),

  mk('Two Supply-Side Routes to the Same Shift',
    'The five free-market policies and the five interventionist ones of sub-topic 3, reaching the same rightward shift by opposite means and at opposite costs.',
    [
      'Five policies on each side, as the specification lists them',
      'Both routes arriving at the same rightward shift of long-run supply',
      'The free-market cost named: a wider income gap',
      'The interventionist cost named: the budget',
    ],
    [{ label: 'Free market and interventionist', svg: twoRoutesSvg() }]),

  mk('The Short-Run Phillips Curve',
    `The short-run trade-off between inflation and unemployment, with ${E.country}'s position and the point a reflationary policy would move it to.`,
    [
      'Unemployment on the horizontal axis and inflation on the vertical',
      'A single curve sloping downwards — the SHORT-RUN curve only',
      `Both points marked: ${pct(E.unemployment)} at ${pct(E.phillipsHere)}, and ${pct(E.uTarget)} at ${pct(E.piAtTarget)}`,
      'The movement shown ALONG the curve, not as a new curve',
    ],
    [{ label: 'The trade-off', svg: phillipsSvg() }]),
];

export const ALL_DIAGRAMS = DIAGRAMS;
