/**
 * PACKET 37 — national-income diagrams. Six, one pinned to each block, drawn from `ECON`.
 *
 * The live section had two, and neither reached the blocks that pinned them: `structure-03`,
 * `diagram-01` and `diagram-02` are that `content[2].diagramRef` said "National Income Equilibrium"
 * and `content[3].diagramRef` said "The Multiplier", and no diagram of either title exists — so
 * blocks 3 and 4 rendered nothing at all while the injections/withdrawals diagram was shown at
 * block 2, two chapters before the multiplier it illustrates. `topFix-03` asks for the two refs to
 * be repointed, one of them at a diagram another block already claims. **Sharing a pin is how
 * `structure-03` happened.** Every block gets its own, and the runner derives `diagramId` per block
 * from this array's order, so a dangling pin is unrepresentable rather than fixed.
 *
 * ── THE FRAME IS 400 UNITS WIDE, NOT 440 ───────────────────────────────────
 *
 * Packet 36's Verify B measured its labels at 7-9 CSS px on a 390px phone, and the founder ruled it
 * a programme-wide convention rather than that packet's defect (ledger V037, packet 11). The
 * measured Learn Mode column is ~313 CSS px, so a 440-unit frame scales by 0.711 and a 13-unit
 * label lands at 9.2px. **This packet authors on 400 units** — scale 0.783 — with 15 for anything a
 * student must read and 12 for secondary text, which lands them at 11.7 and 9.4. It is not a fix
 * for V037 and does not claim to be; it is the better end of the convention while V037 is open.
 *
 * ── `accuracy-02` IS TWO CLAIMS AND ONLY ONE OF THEM IS RIGHT ──────────────
 *
 * Right: the live circular flow draws the factor-services and factor-income arrows and nothing
 * else, so the section's own examMatters ("label both the real flow and the money flow") cannot be
 * satisfied from it, and the open-economy scenario collapses two opposite flows onto one arrow.
 * Both are fixed here — four arrows, two flows, opposite directions.
 *
 * Wrong: its third clause wants the checklist to say "identify factor markets and product markets
 * correctly". **`factor market` is 0 hits in `econ_spec.txt`** and `product market`'s one hit
 * (`:1492`) is a 3.3.x labour-market bullet. The checklist uses the specification's own words.
 *
 * Every colour below is a key of `PALETTE` in `components/learn-mode/processSvg.js`; the runner
 * parses that file and asserts it rather than trusting this comment (packet 32).
 */
import {
  id, ECON, bn, prop, mult, idx, round1,
} from './_packet37-util.mjs';

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
const INK2 = '#e2e8f0';
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
/** One arrowhead definition per colour used with `marker`. */
const arrowDefs = (colours) => `<defs>${colours.map(([name, c]) => `<marker id="${name}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${c}"/></marker>`).join('')}</defs>`;

/* ══ 1 · The Circular Flow of Income (2.3.4 · 1a) ════════════════════════ */
/*
 * FOUR ARROWS, WHICH IS THE WHOLE OF `accuracy-02`'s FIRST CLAIM. The real flow is the outer pair
 * and the money flow is the inner pair, each pair running opposite ways, so a student can read
 * both off one picture — which the live diagram, with its two arrows, could not support.
 */
const circularFlowSvg = () => {
  const h = 300;
  const hx = 24, fx = 236, bw = 140, by = 54, bh = 72;
  return svg(h, [
    arrowDefs([['cf-green', GREEN2], ['cf-blue', BLUE2]]),
    t(FRAME.w / 2, 24, 'The circular flow of income', { anchor: 'middle', weight: 600 }),
    box(hx, by, bw, bh, { stroke: AXIS }),
    t(hx + bw / 2, by + 32, 'HOUSEHOLDS', { anchor: 'middle', weight: 600, size: FACE }),
    t(hx + bw / 2, by + 52, 'own the factors', { anchor: 'middle', size: SMALL, fill: MUTED }),
    box(fx, by, bw, bh, { stroke: AXIS }),
    t(fx + bw / 2, by + 32, 'FIRMS', { anchor: 'middle', weight: 600, size: FACE }),
    t(fx + bw / 2, by + 52, 'use them to produce', { anchor: 'middle', size: SMALL, fill: MUTED }),

    /* the real flow: factors across the top, goods back along the third band */
    line(hx + bw + 6, by + 18, fx - 6, by + 18, { stroke: GREEN2, sw: 2, marker: 'cf-green' }),
    t(FRAME.w / 2, by - 6, 'factors of production →', { anchor: 'middle', size: SMALL, fill: GREEN2 }),
    line(fx - 6, by + 56, hx + bw + 6, by + 56, { stroke: GREEN2, sw: 2, marker: 'cf-green' }),
    t(FRAME.w / 2, by + 74, '← goods and services', { anchor: 'middle', size: SMALL, fill: GREEN2 }),

    /* the money flow: factor incomes and consumer spending, each opposite its real twin */
    line(fx - 6, 172, hx + bw + 6, 172, { stroke: BLUE2, sw: 2, marker: 'cf-blue' }),
    t(FRAME.w / 2, 164, '← factor incomes: wages, rent,', { anchor: 'middle', size: SMALL, fill: BLUE2 }),
    t(FRAME.w / 2, 188, 'interest and profit', { anchor: 'middle', size: SMALL, fill: BLUE2 }),
    line(hx + bw + 6, 222, fx - 6, 222, { stroke: BLUE2, sw: 2, marker: 'cf-blue' }),
    t(FRAME.w / 2, 242, 'consumer spending →', { anchor: 'middle', size: SMALL, fill: BLUE2 }),

    line(20, 146, 380, 146, { stroke: GRID, sw: 1, dash: '3 4' }),
    t(20, 140, 'THE REAL FLOW — the things themselves', { size: SMALL, fill: GREEN, weight: 600 }),
    t(20, 274, 'THE MONEY FLOW — the payments for them', { size: SMALL, fill: BLUE, weight: 600 }),
    t(20, 292, `National income: ${bn(E.Y)} a year`, { size: SMALL, fill: MUTED }),
  ].join(''));
};

export const circularFlowDiagram = {
  id: id('diagram', 'the circular flow of income two sector'),
  title: 'The Circular Flow of Income',
  description: 'IAL 2.3.4 · 1a: households and firms joined by a real flow and a money flow, each pair of arrows running opposite to the other.',
  checklist: [
    'Four arrows, not two: the real flow and the money flow both drawn',
    'Factors of production going to firms, goods and services coming back',
    'Factor incomes going to households, consumer spending coming back',
    'Each money arrow running opposite to the real arrow it pays for',
  ],
  scenarios: [{ label: 'Two flows, opposite ways', svg: circularFlowSvg() }],
};

/* ══ 2 · Injections into the Flow (2.3.4 · 2a, 2b) ═══════════════════════ */

const injectionsSvg = () => {
  const h = 286;
  const cx = FRAME.w / 2, cy = 150, r = 62;
  const col = [GREEN2, GREEN2, GREEN2];
  const inj = [
    ['Investment', bn(E.I), 40],
    ['Government', bn(E.G), 200],
    ['Exports', bn(E.X), 340],
  ];
  return svg(h, [
    arrowDefs([['inj-green', GREEN2]]),
    t(FRAME.w / 2, 24, 'The three injections', { anchor: 'middle', weight: 600 }),
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${AXIS}" stroke-width="2"/>`,
    t(cx, cy - 6, 'THE', { anchor: 'middle', size: SMALL, fill: MUTED }),
    t(cx, cy + 12, 'CIRCUIT', { anchor: 'middle', size: FACE, weight: 600 }),
    t(cx, cy + 32, bn(E.Y), { anchor: 'middle', size: SMALL, fill: MUTED }),
    ...inj.flatMap(([name, amt, x], i) => {
      const bx = x - 52, by = 48;
      const tx = cx + (i - 1) * 34, ty = cy - r - 4;
      return [
        box(bx, by, 104, 44, { stroke: col[i] }),
        t(bx + 52, by + 20, name, { anchor: 'middle', size: SMALL, weight: 600, fill: GREEN2 }),
        t(bx + 52, by + 37, amt, { anchor: 'middle', size: SMALL, fill: INK2 }),
        line(x, by + 50, tx, ty, { stroke: GREEN2, sw: 2, marker: 'inj-green' }),
      ];
    }),
    t(cx, 248, `${bn(E.I)} + ${bn(E.G)} + ${bn(E.X)} = ${bn(E.J)}`, { anchor: 'middle', size: FACE, weight: 600, fill: GREEN2 }),
    t(cx, 268, 'Spending on domestic output that did', { anchor: 'middle', size: SMALL, fill: MUTED }),
    t(cx, 284, 'not come from household income', { anchor: 'middle', size: SMALL, fill: MUTED }),
  ].join(''));
};

export const injectionsDiagram = {
  id: id('diagram', 'the three injections into the circular flow'),
  title: 'Injections into the Flow',
  description: 'IAL 2.3.4 · 2a and 2b: investment, government expenditure and exports entering the circuit, with the figures that total this economy\'s injections.',
  checklist: [
    'All three injections named: investment, government expenditure, exports',
    'Every arrow pointing into the circuit, not out of it',
    `The three figures totalling ${bn(E.J)}`,
    'The test stated: spending that did not come from domestic household income',
  ],
  scenarios: [{ label: 'I, G and X', svg: injectionsSvg() }],
};

/* ══ 3 · Withdrawals and the Net Position (2.3.4 · 2c, 2d) ═══════════════ */
/*
 * THE NET POSITION IS THE POINT OF THE CHAPTER AND SO IT IS THE DIAGRAM. Three pairs of bars, the
 * middle one being this economy, so a student can see that the two totals — not the six arrows —
 * are what decides whether the flow grows.
 */
const netPositionSvg = () => {
  const h = 300;
  const cases = [
    ['Net injection', 220, 180, 'flow grows', GREEN2],
    [`${E.country} today`, E.J, E.W, 'no change', BLUE2],
    ['Net withdrawal', 180, 220, 'flow shrinks', RED2],
  ];
  const maxV = 240, base = 216, scale = 130 / maxV, colW = 26, groupW = 112;
  return svg(h, [
    t(FRAME.w / 2, 24, 'Only the gap between the totals moves the flow', { anchor: 'middle', weight: 600, size: SMALL }),
    line(16, base, 384, base, { stroke: AXIS, sw: 1.5 }),
    ...cases.flatMap(([label, j, w, effect, colour], i) => {
      const gx = 30 + i * groupW;
      const jh = Math.round(j * scale), wh = Math.round(w * scale);
      return [
        `<rect x="${gx}" y="${base - jh}" width="${colW}" height="${jh}" rx="3" fill="${GREEN}" opacity="0.85"/>`,
        `<rect x="${gx + colW + 8}" y="${base - wh}" width="${colW}" height="${wh}" rx="3" fill="${RED}" opacity="0.85"/>`,
        t(gx + colW / 2, base - jh - 8, 'J', { anchor: 'middle', size: SMALL, fill: GREEN2, weight: 600 }),
        t(gx + colW + 8 + colW / 2, base - wh - 8, 'W', { anchor: 'middle', size: SMALL, fill: RED2, weight: 600 }),
        t(gx + colW + 4, base + 20, label, { anchor: 'middle', size: SMALL, fill: INK2 }),
        t(gx + colW + 4, base + 40, effect, { anchor: 'middle', size: SMALL, fill: colour, weight: 600 }),
      ];
    }),
    t(16, 274, `Withdrawals here: ${bn(E.S)} + ${bn(E.T)} + ${bn(E.M)} = ${bn(E.W)}`, { size: SMALL, fill: RED2 }),
    t(16, 292, `Injections here: ${bn(E.I)} + ${bn(E.G)} + ${bn(E.X)} = ${bn(E.J)}`, { size: SMALL, fill: GREEN2 }),
  ].join(''));
};

export const netPositionDiagram = {
  id: id('diagram', 'net injections and net withdrawals'),
  title: 'The Net Position',
  description: 'IAL 2.3.4 · 2c and 2d: the two totals side by side in the three cases — a net injection, a balance and a net withdrawal — with this economy in the middle.',
  checklist: [
    'Injections and withdrawals shown as two totals, not six arrows',
    'The three cases: J above W, J equal to W, J below W',
    `This economy\'s ${bn(E.J)} against ${bn(E.W)}, with nothing pushing`,
    'The effect on the flow named under each case',
  ],
  scenarios: [{ label: 'Three net positions', svg: netPositionSvg() }],
};

/* ══ 4 · Equilibrium on AD and AS (2.3.4 · 3a, 3b) ═══════════════════════ */
/*
 * `specGap-02`, `structure-09`, `specThin-01` and `specThin-02` are one gap: the section has never
 * had a price-level / real-output diagram, so 3a and 3b could only be half-answered. Three
 * scenarios off one pair of axes — the base, an AD shift and an AS shift — because the whole
 * teaching point is the SIGN: same direction for AD, opposite directions for AS.
 */
const adAsSvg = ({ label, shift = null }) => {
  const h = 300;
  const x0 = 54, y0 = 246, x1 = 378, y1 = 46;
  /*
   * THE PLOT WINDOW IS CHOSEN SO EVERY POINT THE SECTION QUOTES FITS INSIDE IT, and both curves are
   * CLIPPED to it rather than drawn to a fixed pair of price levels. Packet 25's decision is the
   * reason: a bounds check that reads an anchor cannot see a string that runs off the frame, and
   * the first draft of this diagram put the AS label at x 464 on a 400-unit frame because the line
   * it labelled had left the box 60 units earlier.
   */
  const Ymin = 460, Ymax = 640, Pmin = 90, Pmax = 130;
  const sx = (y) => round1(x0 + ((y - Ymin) / (Ymax - Ymin)) * (x1 - x0));
  const sy = (p) => round1(y0 - ((p - Pmin) / (Pmax - Pmin)) * (y0 - y1));
  /** Clip Y = intercept + slope·P to the window, and return its two visible endpoints. */
  const clip = (intercept, slope) => {
    const pAt = (y) => (y - intercept) / slope;
    const ends = [pAt(Ymin), pAt(Ymax)].sort((a, b) => a - b);
    const lo = Math.max(Pmin, ends[0]), hi = Math.min(Pmax, ends[1]);
    return [{ p: lo, y: intercept + slope * lo }, { p: hi, y: intercept + slope * hi }];
  };
  const curve = (intercept, slope, colour, dash = null) => {
    const [a, b] = clip(intercept, slope);
    return { d: path(`M ${sx(a.y)} ${sy(a.p)} L ${sx(b.y)} ${sy(b.p)}`, { stroke: colour, sw: 2.5, dash }), a, b };
  };
  /* AD: Y = 900 − 4P passes through (500, 100). AS: Y = 6P − 100 does too. */
  const adIntercept = E.Y + E.adSlope * E.P0;            // 900
  const asIntercept = E.Y - E.srasSlope * E.P0;          // −100
  const ad = curve(adIntercept, -E.adSlope, BLUE2);
  const as = curve(asIntercept, E.srasSlope, GREEN2);
  const pieces = [
    t(FRAME.w / 2, 22, label, { anchor: 'middle', weight: 600, size: SMALL }),
    line(x0, y1 - 8, x0, y0, { stroke: AXIS }),
    line(x0, y0, x1 + 6, y0, { stroke: AXIS }),
    t(x0 - 6, y1 - 12, 'Price level', { anchor: 'start', size: SMALL, fill: AXIS }),
    t(x1 + 6, y0 + 34, 'Real output ($bn)', { anchor: 'end', size: SMALL, fill: AXIS }),
    ad.d,
    t(sx(ad.b.y) + 16, sy(ad.b.p) + 4, 'AD', { anchor: 'middle', size: SMALL, fill: BLUE2, weight: 600 }),
    as.d,
    t(sx(as.b.y) - 16, sy(as.b.p) + 4, 'AS', { anchor: 'middle', size: SMALL, fill: GREEN2, weight: 600 }),
  ];
  const mark = (y, p, colour, tag) => [
    line(x0, sy(p), sx(y), sy(p), { stroke: colour, sw: 1, dash: '3 3' }),
    line(sx(y), sy(p), sx(y), y0, { stroke: colour, sw: 1, dash: '3 3' }),
    `<circle cx="${sx(y)}" cy="${sy(p)}" r="4" fill="${colour}"/>`,
    t(x0 - 6, sy(p) + 5, idx(p), { anchor: 'end', size: SMALL, fill: colour }),
    t(sx(y), y0 + 16, String(y), { anchor: 'middle', size: SMALL, fill: colour }),
    tag ? t(sx(y) - 6, sy(p) - 10, tag, { anchor: 'end', size: SMALL, fill: colour, weight: 600 }) : '',
  ];
  pieces.push(...mark(E.Y, E.P0, INK2, null));
  if (shift === 'ad') {
    const ad1 = curve(adIntercept + E.adShift, -E.adSlope, AMBER, '6 4');
    pieces.push(ad1.d);
    pieces.push(t(sx(ad1.b.y) + 18, sy(ad1.b.p) + 4, 'AD₁', { anchor: 'middle', size: SMALL, fill: AMBER, weight: 600 }));
    pieces.push(...mark(E.Yad, E.Pad, AMBER, 'both up'));
    pieces.push(t(16, 272, `AD shifts right ${bn(E.adShift)}.`, { size: SMALL, fill: AMBER, weight: 600 }));
    pieces.push(t(16, 290, 'Output and the price level BOTH rise.', { size: SMALL, fill: AMBER }));
  } else if (shift === 'as') {
    const as1 = curve(asIntercept + E.asShift, E.srasSlope, PURPLE, '6 4');
    pieces.push(as1.d);
    pieces.push(t(sx(as1.b.y) - 18, sy(as1.b.p) + 4, 'AS₁', { anchor: 'middle', size: SMALL, fill: PURPLE, weight: 600 }));
    pieces.push(...mark(E.Yas, E.Pas, PURPLE, 'opposite'));
    pieces.push(t(16, 272, `AS shifts right ${bn(E.asShift)}.`, { size: SMALL, fill: PURPLE, weight: 600 }));
    pieces.push(t(16, 290, 'Output rises, the price level FALLS.', { size: SMALL, fill: PURPLE }));
  } else {
    pieces.push(t(16, 272, `Equilibrium: real output ${bn(E.Y)}`, { size: SMALL, fill: MUTED }));
    pieces.push(t(16, 290, `at a price level of ${idx(E.P0)}.`, { size: SMALL, fill: MUTED }));
  }
  return svg(h, pieces.join(''));
};

export const equilibriumDiagram = {
  id: id('diagram', 'equilibrium real national output on ad and as'),
  title: 'Equilibrium Real National Output',
  description: 'IAL 2.3.4 · 3a and 3b: the equilibrium on price-level and real-output axes, then what a shift in each curve does to both of them.',
  checklist: [
    'Price level on the vertical axis, real national output on the horizontal',
    'Both curves named and the equilibrium marked where they cross',
    `A rightward AD shift raising output to ${bn(E.Yad)} AND the price level to ${idx(E.Pad)}`,
    `A rightward AS shift raising output to ${bn(E.Yas)} while the price level FALLS to ${idx(E.Pas)}`,
  ],
  scenarios: [
    { label: 'Equilibrium', svg: adAsSvg({ label: `Equilibrium: AD crosses AS at ${bn(E.Y)}` }) },
    { label: 'A shift in AD', svg: adAsSvg({ label: 'A rightward shift in AD', shift: 'ad' }) },
    { label: 'A shift in AS', svg: adAsSvg({ label: 'A rightward shift in AS', shift: 'as' }) },
  ],
};

/* ══ 5 · The Multiplier Process (2.3.4 · 4a, 4c) ═════════════════════════ */

const multiplierSvg = () => {
  const h = 300;
  const base = 214, x0 = 30, colW = 44, gap = 14;
  const maxV = E.ROUNDS[0];
  const scale = 132 / maxV;
  return svg(h, [
    t(FRAME.w / 2, 22, `Each round is ${prop(E.mpc)} of the one before it`, { anchor: 'middle', weight: 600, size: SMALL }),
    line(16, base, 384, base, { stroke: AXIS, sw: 1.5 }),
    ...E.ROUNDS.slice(0, 6).flatMap((v, i) => {
      const x = x0 + i * (colW + gap);
      const bh = Math.max(3, Math.round(v * scale));
      const colour = i === 0 ? AMBER : BLUE;
      return [
        `<rect x="${x}" y="${base - bh}" width="${colW}" height="${bh}" rx="3" fill="${colour}" opacity="0.85"/>`,
        t(x + colW / 2, base - bh - 8, String(v), { anchor: 'middle', size: SMALL, fill: i === 0 ? AMBER : BLUE2 }),
        t(x + colW / 2, base + 20, String(i + 1), { anchor: 'middle', size: SMALL, fill: MUTED }),
      ];
    }),
    t(FRAME.w / 2, base + 42, 'round', { anchor: 'middle', size: SMALL, fill: MUTED }),
    line(16, 244, 384, 244, { stroke: GRID, sw: 1, dash: '3 4' }),
    t(16, 266, `${bn(E.shock)}  ×  ${mult(E.k)}  =  ${bn(E.deltaY)} of extra income`, { size: FACE, weight: 600, fill: GREEN2 }),
    t(16, 288, `The first five rounds deliver ${round1(E.fiveRoundShare)}% of it`, { size: SMALL, fill: MUTED }),
  ].join(''));
};

export const multiplierDiagram = {
  id: id('diagram', 'the multiplier process in rounds'),
  title: 'The Multiplier Process',
  description: 'IAL 2.3.4 · 4a and 4c: the rounds of extra spending, each one the marginal propensity to consume times the last, converging on a finite total.',
  checklist: [
    'Each bar shorter than the one before it, by the same fraction every time',
    `The first round equal to the injection itself, ${bn(E.shock)}`,
    `The total ${bn(E.deltaY)}, which is the injection times ${mult(E.k)}`,
    'The rounds shrinking towards nothing rather than stopping at a chosen round',
  ],
  scenarios: [{ label: 'Six rounds', svg: multiplierSvg() }],
};

/* ══ 6 · The Multiplied Shift and the Three AS Shapes (2.3.4 · 4d) ═══════ */
/*
 * `specGap-03` is that the multiplied horizontal shift of AD is "only implied by quiz[8]" and never
 * taught. It is drawn here with the injection alongside it, so the gap between the two is visible,
 * and then the same shift is met by three AS shapes so that a student can see that the shift and
 * the output are different quantities. That second half is the evaluation point of 4d.
 */
const threeShapesSvg = () => {
  const h = 300;
  const panelW = 118, gap = 12, y0 = 196, top = 62;
  const shapes = [
    ['Below capacity', 'AS flat', E.Ykeynes, E.Pkeynes, GREEN2],
    ['Upward-sloping', 'AS rising', E.Yad, E.Pad, AMBER],
    ['At capacity', 'AS vertical', E.Yclassical, E.Pclassical, RED2],
  ];
  const parts = [
    t(FRAME.w / 2, 20, `One shift of ${bn(E.adShift)}, three AS shapes`, { anchor: 'middle', weight: 600, size: SMALL }),
    t(FRAME.w / 2, 40, `from an injection of only ${bn(E.shock)}`, { anchor: 'middle', size: SMALL, fill: MUTED }),
  ];
  shapes.forEach(([name, shape, y, p, colour], i) => {
    const px = 14 + i * (panelW + gap);
    parts.push(box(px, top, panelW, y0 - top, { stroke: GRID, rx: 6 }));
    /* a miniature AD/AS: AD falling left-to-right, AS in the shape named */
    const ix = px + 18, iy = y0 - 18, iw = panelW - 34, ih = y0 - top - 40;
    parts.push(line(ix, iy - ih, ix, iy, { stroke: AXIS, sw: 1 }));
    parts.push(line(ix, iy, ix + iw, iy, { stroke: AXIS, sw: 1 }));
    parts.push(path(`M ${ix + 2} ${iy - ih + 6} L ${ix + iw - 2} ${iy - 8}`, { stroke: BLUE2, sw: 1.5 }));
    parts.push(path(`M ${ix + 16} ${iy - ih + 6} L ${ix + iw} ${iy - 8}`, { stroke: BLUE2, sw: 1.5, dash: '4 3' }));
    if (i === 0) parts.push(path(`M ${ix + 2} ${iy - ih / 2} L ${ix + iw} ${iy - ih / 2}`, { stroke: GREEN2, sw: 2 }));
    if (i === 1) parts.push(path(`M ${ix + 2} ${iy - 4} L ${ix + iw} ${iy - ih + 4}`, { stroke: GREEN2, sw: 2 }));
    if (i === 2) parts.push(path(`M ${ix + iw / 2} ${iy - 2} L ${ix + iw / 2} ${iy - ih}`, { stroke: GREEN2, sw: 2 }));
    parts.push(t(px + panelW / 2, y0 + 20, name, { anchor: 'middle', size: SMALL, fill: INK2 }));
    parts.push(t(px + panelW / 2, y0 + 38, shape, { anchor: 'middle', size: SMALL, fill: MUTED }));
    parts.push(t(px + panelW / 2, y0 + 60, `output ${y}`, { anchor: 'middle', size: SMALL, fill: colour, weight: 600 }));
    parts.push(t(px + panelW / 2, y0 + 78, `price ${idx(p)}`, { anchor: 'middle', size: SMALL, fill: colour }));
  });
  parts.push(t(FRAME.w / 2, 294, 'Same multiplier, same shift, three different economies', { anchor: 'middle', size: SMALL, fill: CYAN }));
  return svg(h, parts.join(''));
};

export const multipliedShiftDiagram = {
  id: id('diagram', 'the multiplied shift of ad against three as shapes'),
  title: 'The Multiplied Shift of AD',
  description: 'IAL 2.3.4 · 4d: the injection and the shift it causes are different sizes, and how much of the shift becomes real output depends on the AS curve it meets.',
  checklist: [
    `The shift ${bn(E.adShift)} against the injection ${bn(E.shock)} that caused it`,
    'Three AS shapes: flat below capacity, upward-sloping, vertical at capacity',
    `Real output ${E.Ykeynes}, ${E.Yad} and ${E.Yclassical} from one identical shift`,
    'The price level rising further the closer the economy is to capacity',
  ],
  scenarios: [{ label: 'Three AS shapes', svg: threeShapesSvg() }],
};

/** One diagram pinned to each block, in block order. The runner derives `diagramId` from this. */
export const DIAGRAMS = [
  circularFlowDiagram,
  injectionsDiagram,
  netPositionDiagram,
  equilibriumDiagram,
  multiplierDiagram,
  multipliedShiftDiagram,
];
export const EXTRA_DIAGRAMS = [];
export const ALL_DIAGRAMS = [...DIAGRAMS, ...EXTRA_DIAGRAMS];
