/**
 * PACKET 51 — poverty-inequality diagrams. Seven, one pinned to each block by `diagramId`, drawn from
 * `ECON`, so every figure a diagram prints is the figure the teaching states.
 *
 * The live section had three (Lorenz, absolute vs relative, Kuznets); only one was pinned (block 1,
 * the Lorenz curve, by packet 2.91) and block 2 pinned none, so the Kuznets curve never rendered in
 * Learn Mode (structure-02, topFix-04). Here the Lorenz curve is chapter 4's own diagram and the
 * Kuznets curve chapter 7's; the 2.91 choice of the Lorenz curve for the old chapter 1 is superseded
 * because that chapter no longer exists — the Lorenz curve now sits with the leaf it teaches (2b).
 *
 * Frame 400 units wide; 12-unit floor on type. Colours are keys of processSvg's palette; the runner
 * parses that file and checks the emitted SVG for extent, collisions, lines and bars under labels.
 */
import { id, ECON, usd, pct, g2, round1, round2 } from './_packet51-util.mjs';

const E = ECON;

export const FRAME = { w: 400, pad: 16 };
export const FACE = 15;
export const SMALL = 12;
export const MIN_FACE = SMALL;
export const COLLIDE_TOL = 1.2;
export const LEAD = 18;

const INK = '#e8ecf5';
const INK2 = '#e2e8f0';
const MUTED = '#7a8299';
const AXIS = '#94a3b8';
const GREEN2 = '#34d399';
const RED2 = '#f87171';
const BLUE2 = '#60a5fa';
const AMBER = '#f59e0b';
const PURPLE = '#8b5cf6';
const CYAN = '#22d3ee';

export const estWidth = (text, size = FACE) => String(text).length * size * 0.56;

const svg = (h, body) => `<svg width="${FRAME.w}" height="${h}" viewBox="0 0 ${FRAME.w} ${h}" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',system-ui,sans-serif;background:transparent">${body}</svg>`;
const t = (x, y, str, { size = SMALL, fill = INK, anchor = 'start', weight = 400 } = {}) =>
  `<text x="${round1(x)}" y="${round1(y)}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" font-weight="${weight}">${str}</text>`;
const line = (x1, y1, x2, y2, { stroke = AXIS, sw = 1.5, dash = null } = {}) =>
  `<line x1="${round1(x1)}" y1="${round1(y1)}" x2="${round1(x2)}" y2="${round1(y2)}" stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
const poly = (pts, { stroke = AXIS, sw = 2.5, dash = null } = {}) =>
  `<path d="M ${pts.map(([x, y]) => `${round1(x)} ${round1(y)}`).join(' L ')}" fill="none" stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
const area = (pts, fill) => `<path d="${pts.map(([x, y], i) => `${i ? 'L' : 'M'} ${round1(x)} ${round1(y)}`).join(' ')} Z" fill="${fill}" fill-opacity="0.18" stroke="none"/>`;
const rect = (x, y, w, h, fill) => `<rect x="${round1(x)}" y="${round1(y)}" width="${round1(Math.max(0, w))}" height="${round1(h)}" rx="3" fill="${fill}"/>`;

/* ── horizontal bar charts: label left, value right ────────────────────────── */
const BAR_X = 182, BAR_W = 160;
const bars = ({ title, rows, max, fmt, caps, top = 50 }) => {
  const rowGap = 34;
  const h = top + rows.length * rowGap + 22 + (caps || []).length * LEAD;
  const parts = [t(FRAME.w / 2, 20, title, { anchor: 'middle', weight: 600 })];
  rows.forEach((r, i) => {
    const y = top + i * rowGap;
    const w = (r.value / max) * BAR_W;
    parts.push(t(16, y + 13, r.label, { fill: r.labelFill || INK2 }));
    parts.push(rect(BAR_X, y, w, 18, r.fill));
    parts.push(t(BAR_X + w + 6, y + 13, fmt(r.value), { fill: r.fill, weight: 600 }));
  });
  const capY = top + rows.length * rowGap + 14;
  (caps || []).forEach((c, i) => parts.push(t(16, capY + i * LEAD, c.text, { fill: c.fill || MUTED, weight: i === 0 ? 600 : 400 })));
  return svg(h, parts.join(''));
};

/* ── x-y plots ─────────────────────────────────────────────────────────────── */
const L = { h: 306, title: 18, yTitle: 40, x0: 54, xR: 336, y1: 56, y0: 222, tick: 238, xTitle: 256, cap1: 278, cap2: 296 };
const plot = ({ xMin, xMax, yMin, yMax }) => {
  const sx = (x) => L.x0 + ((x - xMin) / (xMax - xMin)) * (L.xR - L.x0);
  const sy = (y) => L.y0 - ((y - yMin) / (yMax - yMin)) * (L.y0 - L.y1);
  const axes = (title, yLabel, xLabel) => [
    t(FRAME.w / 2, L.title, title, { anchor: 'middle', weight: 600 }),
    t(8, L.yTitle, yLabel, { fill: AXIS }),
    line(L.x0, L.y1 - 8, L.x0, L.y0, { stroke: AXIS }),
    line(L.x0, L.y0, L.xR + 6, L.y0, { stroke: AXIS }),
    t(392, L.xTitle, xLabel, { anchor: 'end', fill: AXIS }),
  ].join('');
  return { sx, sy, axes };
};
const captions = (a, b, colour = MUTED) => t(16, L.cap1, a, { fill: colour, weight: 600 }) + (b ? t(16, L.cap2, b, { fill: MUTED }) : '');

/* ══ 1 · Absolute and Relative Poverty (1a, 1b) ═══════════════════════════ */

/* Ten vertical bars, one per tenth. The scale stops at $10 so the two lines can be told apart; a
   bar taller than that is drawn to the top and carries its value above it, staggered. */
const DEC = { x0: 60, slot: 32, bw: 22, y1: 52, y0: 232, max: 10, tick: 248, xTitle: 266 };
const decileSvg = ({ title, incomes, relLine, caps }) => {
  const sy = (v) => DEC.y0 - (Math.min(v, DEC.max) / DEC.max) * (DEC.y0 - DEC.y1);
  const xEnd = DEC.x0 + 10 * DEC.slot;
  const parts = [
    t(FRAME.w / 2, 18, title, { anchor: 'middle', weight: 600 }),
    line(DEC.x0, DEC.y1 - 6, DEC.x0, DEC.y0, { stroke: AXIS }),
    line(DEC.x0, DEC.y0, xEnd + 4, DEC.y0, { stroke: AXIS }),
    t(DEC.x0 - 6, sy(0) + 4, '$0', { anchor: 'end', fill: AXIS }),
    t(DEC.x0 - 6, sy(5) + 4, '$5', { anchor: 'end', fill: AXIS }),
    t(DEC.x0 - 6, sy(10) + 4, '$10', { anchor: 'end', fill: AXIS }),
  ];
  let stagger = 0;
  incomes.forEach((v, i) => {
    const x = DEC.x0 + i * DEC.slot + (DEC.slot - DEC.bw) / 2;
    const below = v < E.absLine ? AMBER : v < relLine ? RED2 : BLUE2;
    parts.push(rect(x, sy(v), DEC.bw, DEC.y0 - sy(v), below));
    parts.push(t(x + DEC.bw / 2, DEC.tick, String(i + 1), { anchor: 'middle', fill: AXIS }));
    if (v > DEC.max) {
      parts.push(t(x + DEC.bw, DEC.y1 - 10 - stagger * 16, usd(v), { anchor: 'end', fill: BLUE2, weight: 600 }));
      stagger += 1;
    }
  });
  parts.push(line(DEC.x0, sy(E.absLine), xEnd, sy(E.absLine), { stroke: AMBER, sw: 2, dash: '5 3' }));
  parts.push(line(DEC.x0, sy(relLine), xEnd, sy(relLine), { stroke: RED2, sw: 2, dash: '2 3' }));
  parts.push(t(392, DEC.xTitle, 'Tenths of the population, poorest first', { anchor: 'end', fill: AXIS }));
  caps.forEach((c, i) => parts.push(t(16, 290 + i * LEAD, c.text, { fill: c.fill, weight: i === 0 ? 600 : 400 })));
  return svg(290 + caps.length * LEAD, parts.join(''));
};

export const povertyDiagram = {
  id: id('diagram', 'absolute and relative poverty lines on the income of each tenth'),
  title: 'Absolute and Relative Poverty',
  description: 'IAL 4.3.4 · 1a and 1b: the daily income of each tenth of one economy against a fixed absolute poverty line and a relative line set at 60% of median income — and what happens to each when only the richest gain.',
  checklist: [
    'Each bar is one tenth of the population, poorest on the left',
    `The absolute line is fixed at ${usd(E.absLine)} a day`,
    `The relative line is ${E.relShare}% of median income, so it moves when the median moves`,
    'When only the richest gain, the median does not move',
  ],
  scenarios: [
    { label: `${E.country} today`, svg: decileSvg({
      title: `${E.country}: daily income of each tenth`,
      incomes: E.base, relLine: E.relLine,
      caps: [
        { text: `Absolute line ${usd(E.absLine)}: ${pct(E.absRate)} of people below it`, fill: AMBER },
        { text: `Relative line ${usd(E.relLine)} (${E.relShare}% of the ${usd(E.median)} median): ${pct(E.relRate)}`, fill: RED2 },
      ],
    }) },
    { label: 'The richest fifth pulls away', svg: decileSvg({
      title: 'The richest two tenths gain',
      incomes: E.topPull, relLine: round2(E.topPullMedian * E.relShare / 100),
      caps: [
        { text: `Gini coefficient ${g2(E.gini)} → ${g2(E.topPullGini)}: more unequal`, fill: BLUE2 },
        { text: `Median still ${usd(E.topPullMedian)}: relative poverty still ${pct(E.topPullRel)}`, fill: RED2 },
      ],
    }) },
  ],
};

/* ══ 2 · Growth and benefits (1c-1 .. 1c-4) ═══════════════════════════════ */

export const growthBenefitDiagram = {
  id: id('diagram', 'growth shared evenly and a targeted benefit two routes out of poverty'),
  title: 'Growth and Benefits: Which Poverty Falls?',
  description: 'IAL 4.3.4 · 1c: the share of one economy\'s people below the absolute and relative lines, before and after growth shared evenly, and before and after a benefit to the poorest paid for by a tax on the richest.',
  checklist: [
    'Amber bars: below the fixed absolute line',
    'Red bars: below the relative line, 60% of the median',
    'Evenly shared growth raises the median with everyone else',
    'A benefit to the poorest leaves the median where it was',
  ],
  scenarios: [
    { label: `Growth of ${E.growthPct}%`, svg: bars({
      title: `Every income rises by ${E.growthPct}%`,
      rows: [
        { label: 'Absolute, before', value: E.absRate, fill: AMBER },
        { label: 'Absolute, after', value: E.evenAbs, fill: AMBER },
        { label: 'Relative, before', value: E.relRate, fill: RED2 },
        { label: 'Relative, after', value: E.evenRel, fill: RED2 },
      ],
      max: 40, fmt: pct,
      caps: [
        { text: `Median ${usd(E.median)} → ${usd(E.evenMedian)}; relative line ${usd(E.relLine)} → ${usd(E.evenRelLine)}`, fill: RED2 },
        { text: 'Absolute poverty halves; relative is unchanged.' },
      ],
    }) },
    { label: 'A targeted benefit', svg: bars({
      title: `A ${usd(E.benefit)} benefit to the poorest three tenths`,
      rows: [
        { label: 'Absolute, before', value: E.absRate, fill: AMBER },
        { label: 'Absolute, after', value: E.benefitAbs, fill: AMBER },
        { label: 'Relative, before', value: E.relRate, fill: RED2 },
        { label: 'Relative, after', value: E.benefitRel, fill: RED2 },
      ],
      max: 40, fmt: pct,
      caps: [
        { text: `Paid by ${usd(E.topTax)} a day from each of the richest tenth`, fill: AMBER },
        { text: `The median stays ${usd(E.benefitMedian)}, so both measures fall.` },
      ],
    }) },
  ],
};

/* ══ 3 · Structural change, aid and conflict (1c-5 .. 1c-7) ═══════════════ */

export const shocksDiagram = {
  id: id('diagram', 'structural change aid and conflict absolute poverty headcount'),
  title: 'Structural Change, Aid and Conflict',
  description: 'IAL 4.3.4 · 1c: the share of one economy\'s people below the absolute poverty line today, and after textile mills close, after a donor-funded cash transfer, and after a civil war.',
  checklist: [
    `Each bar is the share of people living below ${usd(E.absLine)} a day`,
    `Mills close: one tenth drops from ${usd(E.base[3])} to ${usd(E.millIncome)} in informal work`,
    `Aid: a ${usd(E.aidTransfer)} daily transfer to the second-poorest tenth`,
    `War: every income in the poorer half falls by ${E.warFall}%`,
  ],
  scenarios: [
    { label: 'Three shocks', svg: bars({
      title: `${E.country}: people below ${usd(E.absLine)} a day`,
      rows: [
        { label: 'Today', value: E.absRate, fill: AXIS, labelFill: INK },
        { label: 'Textile mills close', value: E.millsAbs, fill: RED2 },
        { label: 'Donor cash transfer', value: E.aidAbs, fill: GREEN2 },
        { label: 'Civil war', value: E.warAbs, fill: RED2 },
      ],
      max: 50, fmt: pct,
      caps: [
        { text: `War doubles absolute poverty: ${pct(E.absRate)} → ${pct(E.warAbs)}`, fill: RED2 },
        { text: `The transfer halves it: ${pct(E.absRate)} → ${pct(E.aidAbs)}` },
      ],
    }) },
  ],
};

/* ══ 4 · The Lorenz curve and the Gini coefficient (2a, 2b) ═══════════════ */

const LZ = { x0: 70, x1: 310, y0: 300, y1: 60 };
const lx = (v) => LZ.x0 + v * (LZ.x1 - LZ.x0);
const ly = (v) => LZ.y0 - v * (LZ.y0 - LZ.y1);
const curve = (cum) => [[0, 0], ...cum.map((y, i) => [(i + 1) / 10, y])];
const lorenzFrame = (title) => [
  t(FRAME.w / 2, 18, title, { anchor: 'middle', weight: 600 }),
  t(8, 40, 'Cumulative % of income', { fill: AXIS }),
  line(LZ.x0, LZ.y1, LZ.x0, LZ.y0, { stroke: AXIS }),
  line(LZ.x0, LZ.y0, LZ.x1, LZ.y0, { stroke: AXIS }),
  t(LZ.x0 - 6, ly(0.5) + 4, '50%', { anchor: 'end', fill: AXIS }),
  t(LZ.x0 - 6, ly(1) + 4, '100%', { anchor: 'end', fill: AXIS }),
  t(lx(0.5), LZ.y0 + 16, '50%', { anchor: 'middle', fill: AXIS }),
  t(lx(1), LZ.y0 + 16, '100%', { anchor: 'middle', fill: AXIS }),
  t(392, 334, 'Cumulative % of population', { anchor: 'end', fill: AXIS }),
  line(LZ.x0, LZ.y0, LZ.x1, LZ.y1, { stroke: INK2, sw: 1.5, dash: '4 3' }),
  t(lx(0.92), ly(0.99), 'Line of equality', { anchor: 'end', fill: INK2 }),
].join('');

const lorenzSvg = () => {
  const pts = curve(E.lorenz);
  const px = pts.map(([x, y]) => [lx(x), ly(y)]);
  const areaA = [...px, [lx(1), ly(1)], [lx(0), ly(0)]];
  return svg(384, [
    area(areaA, PURPLE),
    lorenzFrame(`${E.country}: the Lorenz curve for income`),
    poly(px, { stroke: GREEN2 }),
    t(lx(0.6), ly(0.455), 'A', { size: FACE, fill: PURPLE, weight: 600, anchor: 'middle' }),
    t(lx(0.55), ly(0.12), 'B', { size: FACE, fill: GREEN2, weight: 600, anchor: 'middle' }),
    t(lx(0.97), ly(0.06), 'Lorenz curve', { anchor: 'end', fill: GREEN2 }),
    t(16, 356, `Gini = A ÷ (A + B) = ${E.areaA} ÷ ${g2(0.5)} = ${g2(E.gini)}`, { fill: PURPLE, weight: 600 }),
    t(16, 374, `Poorest half: ${pct(E.lorenz[4] * 100)} of income.`, { fill: MUTED }),
  ].join(''));
};

const incomeWealthSvg = () => {
  const inc = curve(E.lorenz).map(([x, y]) => [lx(x), ly(y)]);
  const wl = curve(E.wealthLorenz).map(([x, y]) => [lx(x), ly(y)]);
  return svg(384, [
    lorenzFrame('Income and wealth: two Lorenz curves'),
    poly(inc, { stroke: GREEN2 }),
    poly(wl, { stroke: AMBER }),
    t(lx(0.97), ly(0.13), 'Income', { anchor: 'end', fill: GREEN2, weight: 600 }),
    t(lx(0.97), ly(0.06), 'Wealth', { anchor: 'end', fill: AMBER, weight: 600 }),
    t(16, 356, `Gini: income ${g2(E.gini)}, wealth ${g2(E.wealthGini)}`, { fill: AMBER, weight: 600 }),
    t(16, 374, `Richest tenth: ${pct(E.topShare)} of income, ${pct(E.wealthTop)} of wealth.`, { fill: MUTED }),
  ].join(''));
};

export const lorenzDiagram = {
  id: id('diagram', 'lorenz curve and gini coefficient income and wealth'),
  title: 'The Lorenz Curve and the Gini Coefficient',
  description: 'IAL 4.3.4 · 2a and 2b: one economy\'s Lorenz curve for income, with the areas the Gini coefficient is calculated from, and its Lorenz curves for income and for wealth compared.',
  checklist: [
    'Horizontal axis: cumulative % of population, poorest first',
    'Vertical axis: cumulative % of income (or of wealth)',
    'The diagonal is the line of equality',
    'A lies between the diagonal and the curve; B lies below the curve',
  ],
  scenarios: [
    { label: 'Income: areas A and B', svg: lorenzSvg() },
    { label: 'Income against wealth', svg: incomeWealthSvg() },
  ],
};

/* ══ 5 · Assets compound faster than wages (2c) ═══════════════════════════ */

const compoundSvg = () => {
  const g = plot({ xMin: 0, xMax: E.years, yMin: 1, yMax: 6 });
  const path = (r) => Array.from({ length: E.years + 1 }, (_, i) => [g.sx(i), g.sy((1 + r / 100) ** i)]);
  return svg(L.h, [
    g.axes('Assets compound faster than wages', 'Value (start = 1)', 'Years'),
    t(L.x0 - 6, g.sy(1) + 4, '1', { anchor: 'end', fill: AXIS }),
    t(L.x0 - 6, g.sy(4) + 4, '4', { anchor: 'end', fill: AXIS }),
    t(g.sx(10), L.tick, '10', { anchor: 'middle', fill: AXIS }),
    t(g.sx(20), L.tick, '20', { anchor: 'middle', fill: AXIS }),
    t(g.sx(30), L.tick, '30', { anchor: 'middle', fill: AXIS }),
    poly(path(E.assetReturn), { stroke: AMBER }),
    poly(path(E.wageGrowth), { stroke: BLUE2 }),
    t(L.xR + 4, g.sy(E.assetMultiple) + 4, `×${E.assetMultiple}`, { fill: AMBER, weight: 600 }),
    t(L.xR + 4, g.sy(E.wageMultiple) + 4, `×${E.wageMultiple}`, { fill: BLUE2, weight: 600 }),
    t(g.sx(1), g.sy(5), `Assets, ${E.assetReturn}% a year`, { fill: AMBER }),
    t(g.sx(18), g.sy(2.4), `Wages, ${E.wageGrowth}% a year`, { fill: BLUE2 }),
    captions(`After ${E.years} years: assets ×${E.assetMultiple}, wages ×${E.wageMultiple}`, 'Owners of wealth pull away from earners.', AMBER),
  ].join(''));
};

export const causesDiagram = {
  id: id('diagram', 'returns on assets compound faster than wage growth'),
  title: 'Why Wealth Concentrates',
  description: 'IAL 4.3.4 · 2c: an asset earning a steady return that is reinvested, against a wage rising more slowly, over the same years — the compounding behind wealth inequality within a country.',
  checklist: [
    `Assets grow ${E.assetReturn}% a year when returns are reinvested`,
    `Wages grow ${E.wageGrowth}% a year`,
    'Both start from the same value',
    'The gap widens faster every year',
  ],
  scenarios: [{ label: 'Compounding', svg: compoundSvg() }],
};

/* ══ 6 · The impact of inequality (2d) ═════════════════════════════════════ */

const FIFTHS = ['Poorest fifth', 'Second fifth', 'Middle fifth', 'Fourth fifth', 'Richest fifth'];
export const impactDiagram = {
  id: id('diagram', 'school completion and life expectancy by income fifth'),
  title: 'Inequality, Schooling and Health',
  description: 'IAL 4.3.4 · 2d: in one economy, the share of children finishing secondary school and life expectancy at birth, for each fifth of the income distribution.',
  checklist: [
    'Each bar is one fifth of households, ranked by income',
    'Schooling and life expectancy both rise with income',
    'Unequal schooling hands inequality on to the next generation',
  ],
  scenarios: [
    { label: 'Schooling', svg: bars({
      title: 'Finishing secondary school, by income',
      rows: E.schoolByFifth.map((v, i) => ({ label: FIFTHS[i], value: v, fill: i === 4 ? GREEN2 : BLUE2 })),
      max: 100, fmt: pct,
      caps: [{ text: `${E.schoolByFifth[0]}% of the poorest fifth, ${E.schoolByFifth[4]}% of the richest`, fill: BLUE2 }],
    }) },
    { label: 'Life expectancy', svg: bars({
      title: 'Life expectancy at birth, by income',
      rows: E.lifeByFifth.map((v, i) => ({ label: FIFTHS[i], value: v, fill: i === 0 ? RED2 : CYAN })),
      max: 90, fmt: (v) => `${v} yrs`,
      caps: [{ text: `A gap of ${E.lifeGap} years between poorest and richest`, fill: RED2 }],
    }) },
  ],
};

/* ══ 7 · Development and capitalism (2e, 2f) ═══════════════════════════════ */

export const KUZ = (() => {
  const f = (x) => 0.25 + 0.8 * x * (1 - x);
  return { f, peak: 0.5 };
})();
const kuznetsSvg = () => {
  const g = plot({ xMin: 0, xMax: 1, yMin: 0.2, yMax: 0.5 });
  const pts = Array.from({ length: 21 }, (_, i) => i / 20).map((x) => [g.sx(x), g.sy(KUZ.f(x))]);
  return svg(L.h, [
    g.axes('The Kuznets hypothesis', 'Inequality (Gini)', 'Income per head'),
    poly(pts, { stroke: PURPLE }),
    t(g.sx(0.12), g.sy(0.23), 'Early', { anchor: 'middle', fill: INK2 }),
    t(g.sx(0.5), g.sy(0.23), 'Middle', { anchor: 'middle', fill: INK2 }),
    t(g.sx(0.88), g.sy(0.23), 'Later', { anchor: 'middle', fill: INK2 }),
    captions('A hypothesis: inequality rises, then falls', 'Some fast growers never saw the rise.', PURPLE),
  ].join(''));
};

export const developmentDiagram = {
  id: id('diagram', 'kuznets curve development and inequality and income from assets'),
  title: 'Development, Capitalism and Inequality',
  description: 'IAL 4.3.4 · 2e and 2f: the Kuznets hypothesis that inequality rises and then falls as income per head grows, and how much of each group\'s income comes from owning assets in a market economy.',
  checklist: [
    'Early: most people farm on similar low incomes',
    'Middle: some move to better-paid industry and the gap widens',
    'Later: schooling spreads and the gap narrows',
    'In a market economy, profit, rent and interest go mostly to those who own assets',
  ],
  scenarios: [
    { label: 'The Kuznets curve', svg: kuznetsSvg() },
    { label: 'Income from assets', svg: bars({
      title: 'Share of income from owning assets',
      rows: [
        { label: 'Poorer half', value: E.assetIncome.bottomHalf, fill: BLUE2 },
        { label: 'Middle four tenths', value: E.assetIncome.middle, fill: BLUE2 },
        { label: 'Richest tenth', value: E.assetIncome.top, fill: AMBER },
      ],
      max: 60, fmt: pct,
      caps: [
        { text: 'Profit, rent and interest go mostly to the top', fill: AMBER },
        { text: 'Markets pay owners as well as workers.' },
      ],
    }) },
  ],
};

/** One diagram pinned to each block, in block order. */
export const DIAGRAMS = [
  povertyDiagram,
  growthBenefitDiagram,
  shocksDiagram,
  lorenzDiagram,
  causesDiagram,
  impactDiagram,
  developmentDiagram,
];
export const ALL_DIAGRAMS = [...DIAGRAMS];
