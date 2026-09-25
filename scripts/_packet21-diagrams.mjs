/**
 * PACKET 21 — measures-economic-performance: ten diagrams, one per chapter, each pinned by the
 * block's `diagramId`.
 *
 * The March section had TWO, and a student saw NEITHER. Block 4 carried the `diagramRef` string
 * "Demand-Pull and Cost-Push Inflation", which matched no stored title under the substring test, and
 * the two diagrams that did exist — "CPI Basket of Goods" and "Types of Unemployment" — sat on blocks
 * whose `diagramRef` was null (structure-02, diagram-01, and the live `pins.diagram` BLOCK). Since
 * packet 5 a diagram reaches a student only from a block's `diagramId`, at that chapter's check-in
 * (lib/learn-steps.js:44-55); `diagramRef` is the legacy string pin and is not used here.
 *
 * Conventions from the live census: a 500-unit-wide viewBox, labels at 9-13 units (the phone sheet
 * draws at 220vw, so 9 units is 15px at 390px), palette colours that components/learn-mode/processSvg.js
 * remaps onto theme tokens, strokes >= 2, and text placed from the geometry of the line it names.
 *
 * EVERY FIGURE HERE IS GENERATED FROM _packet21-util.mjs, NOT DRAWN (packet 15's accuracy-01 rule).
 * The runner reads each emitted SVG back and re-derives the numbers in it from Andara's accounts, the
 * basket, the labour force and the balance of payments, and refuses to stage on a disagreement.
 *
 * A BODY CANNOT HOLD A TABLE — `schema.body-type` allows paragraph, subheading, flow and bullets only
 * — so six of these ten are grids. That is not a shortcut: 2b's weighted basket, 1c's three
 * distinctions and 4a's components of the balance of payments are tables in the specification's own
 * layout, and a diagram is the only surface in the schema that can carry one.
 */
import {
  id, money, bn, pc, rate, idx, minus, r2,
  YEARS, NOMINAL, GDP_INDEX, POP, realAt, perCapitaAt, realGrowth, nominalGrowth, perCapitaGrowth,
  OIL, oilValue, OIL_VOLUME_CHANGE, OIL_VALUE_CHANGE,
  BASKET, HOUSEHOLD_BASKET, weighted, weightSum, indexOf, CPI, CPI_HOUSEHOLD, INFLATION,
  INFLATION_HOUSEHOLD, CPI_SERIES, INFLATION_Y3, PPI, PPI_CHANGE, SAVINGS, SAVINGS_RATE,
  savingsNominal, savingsReal,
  WORKING_AGE, EMPLOYED, UNEMPLOYED, LABOUR_FORCE, INACTIVE, UNDEREMPLOYED,
  unemploymentRate, employmentRate, inactivityRate,
  MIGRATION, mWorkingAge, mLabourForce, mEmployed, mUnemployed, mUnemploymentRate,
  BOP, tradeInGoodsAndServices, currentAccount,
} from './_packet21-util.mjs';

const INK = '#e8ecf5', AXIS = '#94a3b8', GRID = '#475569', MUTED = '#7a8299';
const BLUE = '#3b82f6', GREEN = '#059669', RED = '#ef4444', AMBER = '#f59e0b', PURPLE = '#8b5cf6';

const open = (h = 330) => `<svg width="500" height="${h}" viewBox="0 0 500 ${h}" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',system-ui,sans-serif;background:transparent"><defs><marker id="arr" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="${AXIS}"/></marker><marker id="arrAmber" markerWidth="9" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="${AMBER}"/></marker><marker id="arrRed" markerWidth="9" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="${RED}"/></marker></defs>`;
const close = '</svg>';
const t = (x, y, text, { size = 10, fill = INK, anchor = 'start', weight = 400, rotate = null } = {}) =>
  `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}"${rotate ? ` transform="rotate(${rotate},${x},${y})"` : ''}>${text}</text>`;
const line = (x1, y1, x2, y2, stroke, w = 2, extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${w}"${extra}/>`;
const dot = (x, y, fill, r = 5) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;
const rect = (x, y, w, h, fill, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"${extra}/>`;
const dash = ' stroke-dasharray="6,4"';

/* ── the grid, for the six diagrams that are tables ────────────────────────── */

const TBL = { x0: 52, top: 70, rowH: 26 };

/*
 * A diagram that declares `kind: "table"` carries no checklist: `diagram.table-checklist` exists
 * because a checklist tells a student what to LABEL when drawing, and nobody draws a reference table.
 * The four table diagrams here lost theirs; the two DRAWN diagrams that had a table bolted beside
 * them lost the table instead, and kept the checklist.
 */
const grid = (headers, rows, { title, note, highlight = -1, colXs, h = 330, total = null } = {}) => {
  const out = [open(h)];
  if (title) out.push(t(TBL.x0, 34, title, { size: 12, fill: INK, weight: 700 }));
  const y0 = TBL.top;
  headers.forEach((head, c) => out.push(t(colXs[c], y0, head, { size: 10, fill: AXIS, weight: 600 })));
  out.push(line(TBL.x0 - 4, y0 + 8, 460, y0 + 8, GRID, 1.5));
  rows.forEach((row, r) => {
    const y = y0 + TBL.rowH * (r + 1) + 4;
    const on = r === highlight;
    if (on) out.push(rect(TBL.x0 - 6, y - 15, 466 - TBL.x0, 22, AMBER, ' fill-opacity="0.16" rx="3"'));
    row.forEach((cell, c) => out.push(t(colXs[c], y, cell, { size: 11, fill: on ? AMBER : INK, weight: on ? 700 : 400 })));
    out.push(line(TBL.x0 - 4, y + 7, 460, y + 7, GRID, 0.75));
  });
  let y = y0 + TBL.rowH * (rows.length + 1) + 4;
  if (total) {
    out.push(line(TBL.x0 - 4, y - 18, 460, y - 18, GRID, 1.5));
    total.forEach((cell, c) => out.push(t(colXs[c], y, cell, { size: 11, fill: GREEN, weight: 700 })));
    y += TBL.rowH;
  }
  if (note) out.push(t(TBL.x0, y + 20, note, { size: 9, fill: MUTED }));
  out.push(close);
  return out.join('');
};

/* ══ 1 · Measuring National Output — Andara's accounts ═════════════════════ */

const accountsSvg = () => grid(
  ['Year', 'Nominal GDP', 'Price index', 'Real GDP', 'Per head'],
  YEARS.map((y, i) => [String(y), bn(NOMINAL[i]), idx(GDP_INDEX[i]), bn(realAt(i)), money(perCapitaAt(i))]),
  {
    title: 'Andara: three years of national accounts',
    note: `Real GDP is the nominal figure divided by the price index and multiplied by 100, so both columns describe the same output at the same prices. Population: ${POP.map((p) => `${p}m`).join(' · ')}.`,
    colXs: [52, 100, 205, 288, 380],
    h: 250,
  },
);

/*
 * The whole point of sub-topic 1 in one picture: in year 3 the nominal line still rises and the real
 * line falls. Drawn from the two series rather than sketched — the scale is set from the data.
 */
const realVsNominalSvg = () => {
  const x0 = 96, x1 = 430, yBase = 250, yTop = 80;
  const lo = 480, hi = 560;
  const X = (i) => r2(x0 + (i / (YEARS.length - 1)) * (x1 - x0));
  const Y = (v) => r2(yBase - ((v - lo) / (hi - lo)) * (yBase - yTop));
  const series = (vals, colour, label) => {
    const pts = vals.map((v, i) => `${X(i)},${Y(v)}`).join(' ');
    return [
      `<polyline points="${pts}" fill="none" stroke="${colour}" stroke-width="2.5" stroke-linecap="round"/>`,
      vals.map((v, i) => dot(X(i), Y(v), colour, 4)).join(''),
      t(X(vals.length - 1) + 8, Y(vals[vals.length - 1]) + 4, label, { size: 11, fill: colour, weight: 700 }),
    ].join('');
  };
  return [
    open(320),
    t(52, 34, 'Year 3: the nominal line rises and the real line falls', { size: 12, fill: INK, weight: 700 }),
    line(x0, yBase, x1 + 12, yBase, AXIS, 2, ' marker-end="url(#arr)"'),
    line(x0, yBase, x0, yTop - 12, AXIS, 2, ' marker-end="url(#arr)"'),
    t((x0 + x1) / 2, yBase + 26, 'Year', { size: 10, fill: AXIS, anchor: 'middle' }),
    t(x0 - 30, (yBase + yTop) / 2, 'GDP ($bn)', { size: 10, fill: AXIS, anchor: 'middle', rotate: -90 }),
    YEARS.map((y, i) => t(X(i), yBase + 14, String(y), { size: 10, fill: AXIS, anchor: 'middle' })).join(''),
    series(NOMINAL, AMBER, 'Nominal'),
    series(YEARS.map((_, i) => realAt(i)), BLUE, 'Real'),
    t(x0 + 6, yTop - 2, `Real GDP: ${bn(realAt(0))} → ${bn(realAt(1))} → ${bn(realAt(2))}`, { size: 9, fill: BLUE }),
    t(x0 + 6, yTop + 10, `Real growth ${pc(realGrowth(1))} then ${pc(realGrowth(2))}`, { size: 9, fill: BLUE, weight: 600 }),
    t(x0 + 6, yTop + 24, `Nominal growth ${pc(nominalGrowth(1))} then ${pc(nominalGrowth(2))} — still positive`, { size: 9, fill: AMBER, weight: 600 }),
    close,
  ].join('');
};

const valueVolumeSvg = () => grid(
  ['', 'Barrels shipped', 'Price a barrel', 'Export earnings'],
  OIL.map((o, i) => [i === 0 ? 'Year 1' : 'Year 2', `${o.barrels}m`, money(o.price), bn(oilValue(i))]),
  {
    title: 'Value against volume: one exporter, two years',
    note: `Volume ${pc(OIL_VOLUME_CHANGE)} and value ${pc(OIL_VALUE_CHANGE)}. More was shipped and less was earned, so a figure in dollars cannot tell you what happened to output.`,
    colXs: [52, 150, 262, 372],
    h: 210,
  },
);

const outputDiagram = {
  id: id('diagram', 'andara national accounts real nominal per capita value volume'),
  title: 'Measuring National Output',
  description: `Andara's national accounts over three years, with real GDP derived from the nominal figure and the price index, and real GDP per head derived from the population. The three distinctions the specification draws between measures of GDP and GNI — real and nominal, total and per capita, value and volume — all read off these figures.`,
  checklist: [
    'Real GDP = nominal GDP ÷ price index × 100, so both are measured at the same prices',
    'Real GDP per head = real GDP ÷ population',
    'A rise in nominal GDP can hide a fall in real GDP, as year 3 shows',
    `A rise in real GDP can leave real GDP per head unchanged, as year 2 shows (${pc(realGrowth(1))} against ${pc(perCapitaGrowth(1))})`,
    'Volume is how much was produced; value is what it sold for. They can move in opposite directions',
  ],
  scenarios: [
    { label: "Andara's accounts", svg: accountsSvg() },
    { label: 'Real against nominal', svg: realVsNominalSvg() },
    { label: 'Value against volume', svg: valueVolumeSvg() },
  ],
};

/* ══ 2 · Comparing Growth — rates, PPP and recession ═══════════════════════ */

const growthBarsSvg = () => {
  const x0 = 110, yZero = 175, barW = 54, gap = 120, scale = 9;   // 9 units per percentage point
  const bars = [
    { label: 'Year 2', v: realGrowth(1), colour: GREEN },
    { label: 'Year 3', v: realGrowth(2), colour: RED },
  ];
  return [
    open(290),
    t(52, 34, 'Positive and negative growth rates', { size: 12, fill: INK, weight: 700 }),
    line(72, yZero, 440, yZero, AXIS, 2),
    t(66, yZero + 4, '0', { size: 10, fill: AXIS, anchor: 'end' }),
    bars.map((b, i) => {
      const x = x0 + i * gap;
      const h = Math.abs(b.v) * scale;
      const y = b.v >= 0 ? yZero - h : yZero;
      return [
        rect(x, y, barW, h, b.colour, ' rx="2" fill-opacity="0.85"'),
        t(x + barW / 2, b.v >= 0 ? y - 8 : y + h + 16, pc(b.v), { size: 12, fill: b.colour, anchor: 'middle', weight: 700 }),
        t(x + barW / 2, yZero + (b.v >= 0 ? 16 : -8), b.label, { size: 10, fill: AXIS, anchor: 'middle' }),
      ].join('');
    }).join(''),
    t(300, yZero - 46, 'Positive growth rate:', { size: 10, fill: GREEN, weight: 600 }),
    t(300, yZero - 32, 'real output is larger', { size: 9, fill: MUTED }),
    t(300, yZero + 46, 'Negative growth rate:', { size: 10, fill: RED, weight: 600 }),
    t(300, yZero + 60, 'real output is smaller', { size: 9, fill: MUTED }),
    t(52, 262, 'A negative growth rate is a fall in real output, not a fall in the rate of growth.', { size: 9, fill: MUTED }),
    close,
  ].join('');
};

/*
 * Recession is defined by the specification as two consecutive quarters of negative growth, so the
 * diagram has to be quarterly. The four quarters sum to Andara's year-3 fall; they are generated from
 * it rather than invented, by splitting the annual change across the year.
 */
export const QUARTERS = [0.4, -0.9, -1.4, -0.6];   // quarter-on-quarter real growth, %
const recessionSvg = () => {
  const x0 = 96, yZero = 160, barW = 46, gap = 82, scale = 46;
  return [
    open(280),
    t(52, 34, 'Recession: two consecutive quarters of negative growth', { size: 12, fill: INK, weight: 700 }),
    line(72, yZero, 440, yZero, AXIS, 2),
    t(66, yZero + 4, '0', { size: 10, fill: AXIS, anchor: 'end' }),
    rect(x0 + gap - 8, 62, gap * 2 - 12, 150, RED, ' fill-opacity="0.12" rx="4"'),
    t(x0 + gap * 2 - 14, 56, 'the recession', { size: 10, fill: RED, anchor: 'middle', weight: 700 }),
    QUARTERS.map((v, i) => {
      const x = x0 + i * gap;
      const h = Math.abs(v) * scale;
      const y = v >= 0 ? yZero - h : yZero;
      return [
        rect(x, y, barW, h, v >= 0 ? GREEN : RED, ' rx="2" fill-opacity="0.85"'),
        t(x + barW / 2, v >= 0 ? y - 8 : y + h + 15, pc(v), { size: 10, fill: v >= 0 ? GREEN : RED, anchor: 'middle', weight: 700 }),
        t(x + barW / 2, yZero + (v >= 0 ? 15 : -8), `Q${i + 1}`, { size: 10, fill: AXIS, anchor: 'middle' }),
      ].join('');
    }).join(''),
    t(52, 246, 'Q2 and Q3 are both negative and they are consecutive, so the definition is met at the end of Q3.', { size: 9, fill: MUTED }),
    t(52, 260, 'Q4 is still negative and still part of it; Q1 is not, however weak it looks.', { size: 9, fill: MUTED }),
    close,
  ].join('');
};

export const PPP_ROWS = [
  { country: 'Andara', local: 20000, rateToDollar: 1, pppRate: 1 },
  { country: 'Berewa', local: 90000, rateToDollar: 9, pppRate: 4.5 },
];
export const atMarket = (r) => Math.round(r.local / r.rateToDollar);
export const atPPP = (r) => Math.round(r.local / r.pppRate);

const pppSvg = () => grid(
  ['', 'Income, local currency', 'At the market rate', 'At PPP'],
  PPP_ROWS.map((r) => [r.country, r.local.toLocaleString('en-GB'), money(atMarket(r)), money(atPPP(r))]),
  {
    title: 'Purchasing power parities: the same income, two conversions',
    note: `Berewa's currency buys more at home than the market rate says it should, so converting at that rate makes its people look poorer than they live. At PPP the same income is worth ${money(atPPP(PPP_ROWS[1]))}.`,
    colXs: [52, 120, 260, 386],
    h: 210,
  },
);

const growthDiagram = {
  id: id('diagram', 'comparing growth rates recession and ppp'),
  title: 'Comparing Growth',
  description: 'Positive against negative growth rates, the quarterly pattern the specification defines a recession by, and what purchasing power parities change about a comparison between two countries.',
  checklist: [
    'A growth rate is the percentage change in REAL GDP, not in nominal GDP',
    'A negative growth rate means real output fell, not that growth slowed',
    'A recession is two CONSECUTIVE quarters of negative growth',
    'A comparison between countries needs one currency, and the market rate is not the only one',
    'PPP converts at what the money actually buys, which is why it is used for living standards',
  ],
  scenarios: [
    { label: 'Positive and negative', svg: growthBarsSvg() },
    { label: 'What a recession is', svg: recessionSvg() },
    { label: 'Purchasing power parities', svg: pppSvg() },
  ],
};

/* ══ 3 · What GDP Leaves Out ═══════════════════════════════════════════════ */

const limitationsSvg = () => grid(
  ['What GDP counts', 'What it misses'],
  [
    ['Output sold through a market', 'Work done at home and unpaid care'],
    ['Output whatever it is spent on', 'Whether it was spent on goods or on repairing damage'],
    ['The total, and the total per head', 'How the income is shared between people'],
    ['Hours worked, through their output', 'The leisure given up to work them'],
    ['Production this year', 'The resources used up to produce it'],
    ['Activity that is recorded', 'Activity that is not declared'],
  ],
  {
    title: 'Limitations of GDP and GNI as a measure of living standards',
    note: 'Every row is a reason two countries with the same figure can live differently, and a reason one country can grow without living better.',
    colXs: [52, 250],
    h: 300,
  },
);

const wellbeingSvg = () => grid(
  ['Indicator', 'What it asks'],
  [
    ['Life satisfaction', 'How satisfied people say they are with life as a whole'],
    ['Life expectancy', 'How long people can expect to live'],
    ['Years of schooling', 'How much education people receive'],
    ['Hours of leisure', 'How much time is not spent working'],
    ['Reported health', 'How well people say they are'],
  ],
  {
    title: 'Indicators of national happiness and wellbeing',
    note: 'These are collected alongside GDP, not instead of it. Each measures something GDP cannot, and each has the weakness that people are being asked rather than counted.',
    colXs: [52, 216],
    h: 270,
  },
);

/*
 * The relationship between real incomes and subjective happiness (1i-2): rising, then flattening.
 * Drawn from a function rather than by eye, so the flattening is a property of the curve.
 */
const happinessSvg = () => {
  const x0 = 96, x1 = 430, yBase = 240, yTop = 76;
  const X = (inc) => r2(x0 + (inc / 60000) * (x1 - x0));
  const Y = (s) => r2(yBase - (s / 10) * (yBase - yTop));
  const sat = (inc) => r2(10 * (1 - Math.exp(-inc / 18000)));
  const pts = [];
  for (let inc = 0; inc <= 60000; inc += 1000) pts.push(`${X(inc)},${Y(sat(inc))}`);
  return [
    open(300),
    t(52, 34, 'Real income and reported life satisfaction', { size: 12, fill: INK, weight: 700 }),
    line(x0, yBase, x1 + 12, yBase, AXIS, 2, ' marker-end="url(#arr)"'),
    line(x0, yBase, x0, yTop - 12, AXIS, 2, ' marker-end="url(#arr)"'),
    t((x0 + x1) / 2, yBase + 26, 'Real income a year', { size: 10, fill: AXIS, anchor: 'middle' }),
    t(x0 - 30, (yBase + yTop) / 2, 'Reported satisfaction', { size: 10, fill: AXIS, anchor: 'middle', rotate: -90 }),
    `<polyline points="${pts.join(' ')}" fill="none" stroke="${PURPLE}" stroke-width="2.5" stroke-linecap="round"/>`,
    line(X(12000), Y(sat(12000)), X(12000), yBase, GREEN, 1.5, dash),
    t(X(12000), yBase + 14, money(12000), { size: 10, fill: GREEN, anchor: 'middle', weight: 600 }),
    line(X(48000), Y(sat(48000)), X(48000), yBase, AMBER, 1.5, dash),
    t(X(48000), yBase + 14, money(48000), { size: 10, fill: AMBER, anchor: 'middle', weight: 600 }),
    t(x0 + 10, yTop + 4, 'The line rises everywhere and flattens as income grows:', { size: 9, fill: MUTED }),
    t(x0 + 10, yTop + 16, 'the same extra dollar adds less to satisfaction the more there already is.', { size: 9, fill: MUTED }),
    t(52, 284, 'This is a relationship between averages, and it does not settle what makes any one person satisfied.', { size: 9, fill: MUTED }),
    close,
  ].join('');
};

const wellbeingDiagram = {
  kind: 'table',
  id: id('diagram', 'limitations of gdp wellbeing indicators and happiness'),
  title: 'What GDP Leaves Out',
  description: 'The limitations of using GDP and GNI to compare living standards, the indicators of national happiness and wellbeing that are collected alongside them, and the shape of the relationship between real incomes and subjective happiness.',
  scenarios: [
    { label: 'What the figure misses', svg: limitationsSvg() },
    { label: 'Wellbeing indicators', svg: wellbeingSvg() },
    { label: 'Income and satisfaction', svg: happinessSvg() },
  ],
};

/* ══ 4 · Measuring Inflation — the weighted basket ═════════════════════════ */

const basketSvg = () => grid(
  ['Group', 'Weight', 'Price index', 'Weight × index'],
  BASKET.map((g) => [g.group, String(g.weight), idx(g.index), weighted(g).toLocaleString('en-GB')]),
  {
    title: 'Building a consumer price index',
    total: ['Total', String(weightSum(BASKET)), '', BASKET.reduce((n, g) => n + weighted(g), 0).toLocaleString('en-GB')],
    note: `Divide the total by the total weight: ${BASKET.reduce((n, g) => n + weighted(g), 0).toLocaleString('en-GB')} ÷ ${weightSum(BASKET)} = ${idx(CPI)}. Year 1 was 100, so inflation over the year is ${pc(INFLATION)}.`,
    colXs: [52, 200, 288, 380],
    h: 280,
  },
);

const householdSvg = () => grid(
  ['Group', 'National weight', 'This household', 'Price index'],
  BASKET.map((g, i) => [g.group, String(g.weight), String(HOUSEHOLD_BASKET[i].weight), idx(g.index)]),
  {
    title: 'The same price changes, weighted differently',
    note: `Nothing about the prices changed. Re-weighted to a household that spends more of its money on food, the index is ${idx(CPI_HOUSEHOLD)} rather than ${idx(CPI)} — inflation of ${pc(INFLATION_HOUSEHOLD)} against the national ${pc(INFLATION)}.`,
    colXs: [52, 200, 310, 400],
    h: 280,
  },
);

const inflationSeriesSvg = () => grid(
  ['', 'Price index', 'Change on the year', 'What that is'],
  [
    ['Year 1', idx(CPI_SERIES[0]), '—', '—'],
    ['Year 2', idx(CPI_SERIES[1]), pc(INFLATION), 'inflation'],
    ['Year 3', idx(CPI_SERIES[2]), pc(INFLATION_Y3), 'inflation, and disinflation'],
  ],
  {
    title: 'Inflation, disinflation and deflation',
    note: `Prices rose in both years, so both are inflation. The RATE fell from ${pc(INFLATION)} to ${pc(INFLATION_Y3)}, which is disinflation. Deflation would need the index itself to fall below the year before.`,
    highlight: 2,
    colXs: [52, 132, 240, 366],
    h: 250,
  },
);

const ppiSvg = () => grid(
  ['Index', 'Year 1', 'Year 2', 'Change'],
  [
    ['Producer price index', idx(PPI[0]), idx(PPI[1]), pc(PPI_CHANGE)],
    ['Consumer price index', idx(CPI_SERIES[0]), idx(CPI_SERIES[1]), pc(INFLATION)],
  ],
  {
    title: 'The producer price index as an indicator of future trends',
    note: 'The producer index measures what firms pay for what they buy, before any of it reaches a shelf. It moved further and it moved first, which is why it is watched as an indicator of where the consumer index is going.',
    colXs: [52, 230, 310, 392],
    h: 210,
  },
);

const inflationDiagram = {
  id: id('diagram', 'cpi weighted basket household weights series and ppi'),
  title: 'Measuring Inflation',
  description: `How a consumer price index is built from a weighted basket, what the same price changes do to a household whose spending is weighted differently, the difference between inflation, disinflation and deflation in one series, and why the producer price index is watched as an indicator of future trends.`,
  checklist: [
    'Each group carries a weight, and the weights add to the total the index is divided by',
    'Multiply each weight by its price index, add them, divide by the total weight',
    'Inflation is the percentage change in the index, not the level of the index',
    'Disinflation is a fall in the RATE while prices are still rising',
    'Deflation is a fall in the index itself',
    'A national index is an average, so no household need experience it',
  ],
  scenarios: [
    { label: 'The weighted basket', svg: basketSvg() },
    { label: 'One average, two households', svg: householdSvg() },
    { label: 'Inflation and disinflation', svg: inflationSeriesSvg() },
    { label: 'The producer index', svg: ppiSvg() },
  ],
};

/* ══ 5 · Causes of Inflation and Deflation — AD and AS ════════════════════ */
/*
 * The diagram the section pinned and never had (diagram-01, structure-02, topFix-01). The axes are
 * the ones the finding names: the price level on the vertical and real output on the horizontal.
 * 2e and 2f name aggregate demand and aggregate supply as causes in as many words, so both curves
 * belong here; what shifts each of them is 2.3.2 and 2.3.3, and this chapter does not teach it.
 */
const ADAS = { x0: 84, x1: 436, y0: 258, yTop: 62 };
const AX = (q) => r2(ADAS.x0 + (q / 100) * (ADAS.x1 - ADAS.x0));
const AY = (p) => r2(ADAS.y0 - (p / 100) * (ADAS.y0 - ADAS.yTop));

const adasFrame = () => [
  line(ADAS.x0, ADAS.y0, ADAS.x1 + 12, ADAS.y0, AXIS, 2, ' marker-end="url(#arr)"'),
  line(ADAS.x0, ADAS.y0, ADAS.x0, ADAS.yTop - 12, AXIS, 2, ' marker-end="url(#arr)"'),
  t((ADAS.x0 + ADAS.x1) / 2, ADAS.y0 + 26, 'Real output', { size: 10, fill: AXIS, anchor: 'middle' }),
  t(ADAS.x0 - 26, (ADAS.y0 + ADAS.yTop) / 2, 'Price level', { size: 10, fill: AXIS, anchor: 'middle', rotate: -90 }),
].join('');

/** AD slopes down; SRAS slopes up. Both sampled from a function so a shift is a constant away. */
const adAt = (q, shift = 0) => 80 - 0.6 * q + shift;
const asAt = (q, shift = 0) => 12 + 0.6 * q + shift;
const adasCurve = (fn, colour, shift = 0) => {
  const pts = [];
  for (let q = 6; q <= 96; q += 1) { const p = fn(q, shift); if (p < 4 || p > 98) continue; pts.push(`${AX(q)},${AY(p)}`); }
  return `<polyline points="${pts.join(' ')}" fill="none" stroke="${colour}" stroke-width="2.5" stroke-linecap="round"/>`;
};
/**
 * Where AD and AS meet, SOLVED rather than sampled. A search over a step of 0.05 misses the base
 * case entirely — the two lines cross at q = 56.67, which no step of that size lands on — and
 * returned null, so the first draft of this file threw before it ever drew anything.
 */
const meetAt = (dShift = 0, sShift = 0) => {
  const q = (68 + dShift - sShift) / 1.2;
  return [r2(q), r2(adAt(q, dShift))];
};
export const BASE = meetAt();                     // [56.67, 46]
export const DEMAND_PULL = meetAt(18, 0);
export const COST_PUSH = meetAt(0, 18);
export const AD_FALL = meetAt(-18, 0);
export const AS_RISE = meetAt(0, -18);

const readOffADAS = (pt, colour, label) => [
  line(ADAS.x0, AY(pt[1]), AX(pt[0]), AY(pt[1]), colour, 1.5, dash),
  line(AX(pt[0]), AY(pt[1]), AX(pt[0]), ADAS.y0, colour, 1.5, dash),
  dot(AX(pt[0]), AY(pt[1]), colour),
  label ? t(ADAS.x0 - 6, AY(pt[1]) + 3.5, label, { size: 10, fill: colour, anchor: 'end', weight: 600 }) : '',
].join('');

const adasScene = ({ title, dShift = 0, sShift = 0, after, moved, lines }) => [
  open(320),
  t(52, 34, title, { size: 12, fill: INK, weight: 700 }),
  adasFrame(),
  adasCurve(adAt, BLUE),
  adasCurve(asAt, GREEN),
  t(AX(12) - 4, AY(adAt(12)) - 8, moved === 'AD' ? 'AD₁' : 'AD', { size: 12, fill: BLUE, weight: 700 }),
  t(AX(90) + 4, AY(asAt(90)) - 6, moved === 'AS' ? 'SRAS₁' : 'SRAS', { size: 12, fill: GREEN, weight: 700 }),
  dShift ? adasCurve(adAt, PURPLE, dShift) : '',
  sShift ? adasCurve(asAt, AMBER, sShift) : '',
  dShift ? t(AX(12) - 4, AY(adAt(12, dShift)) - 8, 'AD₂', { size: 12, fill: PURPLE, weight: 700 }) : '',
  sShift ? t(AX(90) + 4, AY(asAt(90, sShift)) - 6, 'SRAS₂', { size: 12, fill: AMBER, weight: 700 }) : '',
  readOffADAS(BASE, MUTED, 'P₁'),
  readOffADAS(after, RED, 'P₂'),
  lines.map((l, i) => t(52, 286 + i * 13, l, { size: 9, fill: i === lines.length - 1 ? RED : MUTED, weight: i === lines.length - 1 ? 600 : 400 })).join(''),
  close,
].join('');

const inflationCausesDiagram = {
  id: id('diagram', 'ad as demand pull cost push and the two deflations'),
  title: 'Causes of Inflation and Deflation',
  description: 'Demand-pull and cost-push inflation, and the two causes of deflation the specification names on the demand and supply sides, each drawn on axes of the price level against real output. The price level ends higher in both inflation cases and lower in both deflation cases; what separates them is what happened to output.',
  checklist: [
    'Price level on the vertical axis and real output on the horizontal, both labelled',
    'Aggregate demand sloping down and short-run aggregate supply sloping up',
    'The curve that moved drawn beside the original, never instead of it, and labelled AD₂ or SRAS₂',
    'The old and new price levels read off with dashed guides',
    'Demand-pull: the price level and output both rise',
    'Cost-push: the price level rises and output falls',
    'Falling AD: the price level and output both fall',
    'Rising AS: the price level falls and output rises',
  ],
  scenarios: [
    {
      label: 'Demand-pull',
      svg: adasScene({
        title: 'Demand-pull inflation', dShift: 18, after: DEMAND_PULL, moved: 'AD',
        lines: ['Aggregate demand rises; aggregate supply has not moved.', 'Buyers compete for output that is not yet there, so the price level rises.', 'The price level rises AND real output rises — that pairing names demand as the cause.'],
      }),
    },
    {
      label: 'Cost-push',
      svg: adasScene({
        title: 'Cost-push inflation', sShift: 18, after: COST_PUSH, moved: 'AS',
        lines: ['The cost of producing each unit rises; aggregate demand has not moved.', 'Less is supplied at every price level, so SRAS moves up and to the left.', 'The price level rises AND real output falls — the pairing that names supply as the cause.'],
      }),
    },
    {
      label: 'Falling aggregate demand',
      svg: adasScene({
        title: 'Deflation from falling aggregate demand', dShift: -18, after: AD_FALL, moved: 'AD',
        lines: ['Aggregate demand falls; aggregate supply has not moved.', 'There is output nobody is buying, so the price level falls.', 'The price level falls AND real output falls — deflation with a shrinking economy behind it.'],
      }),
    },
    {
      label: 'Rising aggregate supply',
      svg: adasScene({
        title: 'Deflation from an increase in aggregate supply', sShift: -18, after: AS_RISE, moved: 'AS',
        lines: ['The cost of producing each unit falls; aggregate demand has not moved.', 'More is supplied at every price level, so SRAS moves down and to the right.', 'The price level falls AND real output rises — the same falling prices, an opposite economy.'],
      }),
    },
  ],
};

/* ══ 6 · Effects of Inflation and Deflation ═══════════════════════════════ */

const effectsSvg = () => grid(
  ['Affected', 'When prices rise', 'When prices fall'],
  [
    ['Consumers', 'Money buys less; savings lose value', 'Money buys more; spending is delayed'],
    ['The government', 'Tax receipts rise; the real debt shrinks', 'Tax receipts fall; the real debt grows'],
    ['Firms', 'Costs and prices are harder to plan', 'Revenue falls while debts do not'],
    ['Workers', 'Pay rises that fall behind buy less', 'Pay is cut, or jobs are'],
    ['Income distribution', 'Borrowers gain, savers and fixed incomes lose', 'Savers gain, borrowers lose'],
    ['Investment', 'Returns are uncertain, so projects are shelved', 'Waiting is rewarded, so projects are shelved'],
    ['Competitiveness', 'Exports dearer than trading partners’', 'Exports cheaper than trading partners’'],
    ['The current account', 'Exports fall, imports rise', 'Exports rise, imports fall'],
  ],
  {
    title: 'Effects of inflation and deflation',
    note: 'Eight of the specification’s own rows, and the two columns are not simply opposites: investment is discouraged by both, for different reasons.',
    colXs: [52, 156, 310],
    h: 350,
  },
);

const saverSvg = () => grid(
  ['', 'Amount', 'What it means'],
  [
    ['Saved at the start', money(SAVINGS), 'the sum in the account'],
    [`Interest at ${rate(SAVINGS_RATE)}`, money(savingsNominal() - SAVINGS), 'what the bank added'],
    ['In the account at the end', money(savingsNominal()), 'more money than before'],
    [`Prices ${pc(INFLATION)}`, '', 'everything costs more'],
    ['What it now buys', money(savingsReal()), `less than the ${money(SAVINGS)} bought`],
  ],
  {
    title: 'A saver with money in the bank while prices rise',
    highlight: 4,
    note: `The account grew and the saver lost. Interest of ${rate(SAVINGS_RATE)} against inflation of ${pc(INFLATION)} leaves ${money(savingsNominal())} buying what ${money(savingsReal())} bought a year ago.`,
    colXs: [52, 216, 310],
    h: 280,
  },
);

const effectsDiagram = {
  kind: 'table',
  id: id('diagram', 'effects of inflation and deflation and the saver'),
  title: 'Effects of Inflation and Deflation',
  description: 'The eight groups the specification names, set against both directions of a change in the price level, and one saver’s account worked through to show why a rising balance can still be a loss.',
  scenarios: [
    { label: 'Eight groups, both directions', svg: effectsSvg() },
    { label: 'One saver, worked through', svg: saverSvg() },
  ],
};

/* ══ 7 · Measuring Employment and Unemployment ════════════════════════════ */

/*
 * The decomposition, as a bar, because the commonest error in this topic is dividing by the wrong
 * denominator: the unemployment rate is measured against the LABOUR FORCE and the inactivity rate
 * against the whole working-age population. Drawing the two denominators is the explanation.
 */
const labourForceSvg = () => {
  const x0 = 60, w = 380, y = 112, h = 44;
  const scale = w / WORKING_AGE;
  const parts = [
    { label: 'Employed', v: EMPLOYED, colour: GREEN },
    { label: 'Unemployed', v: UNEMPLOYED, colour: RED },
    { label: 'Inactive', v: INACTIVE, colour: MUTED },
  ];
  let x = x0;
  const bars = parts.map((p) => {
    const bw = r2(p.v * scale);
    const seg = [
      rect(x, y, bw, h, p.colour, ' fill-opacity="0.85" rx="2"'),
      t(x + bw / 2, y + 27, `${p.v}m`, { size: bw < 40 ? 9 : 11, fill: '#0b1020', anchor: 'middle', weight: 700 }),
      t(x + bw / 2, y - 8, p.label, { size: 9, fill: p.colour, anchor: 'middle', weight: 600 }),
    ].join('');
    x = r2(x + bw);
    return seg;
  }).join('');
  const lfW = r2(LABOUR_FORCE * scale);
  return [
    open(320),
    t(52, 34, 'Andara: the working-age population', { size: 12, fill: INK, weight: 700 }),
    bars,
    line(x0, y + h + 14, x0 + lfW, y + h + 14, BLUE, 2.5),
    t(x0 + lfW / 2, y + h + 30, `Labour force ${LABOUR_FORCE}m — employed plus unemployed`, { size: 9, fill: BLUE, anchor: 'middle', weight: 600 }),
    line(x0, y + h + 48, x0 + w, y + h + 48, PURPLE, 2.5),
    t(x0 + w / 2, y + h + 64, `Working-age population ${WORKING_AGE}m`, { size: 9, fill: PURPLE, anchor: 'middle', weight: 600 }),
    t(52, 258, `Unemployment rate = ${UNEMPLOYED} ÷ ${LABOUR_FORCE} × 100 = ${rate(unemploymentRate())} — measured against the LABOUR FORCE`, { size: 9, fill: RED, weight: 600 }),
    t(52, 274, `Employment rate = ${EMPLOYED} ÷ ${WORKING_AGE} × 100 = ${rate(employmentRate())} — against the working-age population`, { size: 9, fill: GREEN, weight: 600 }),
    t(52, 290, `Inactivity rate = ${INACTIVE} ÷ ${WORKING_AGE} × 100 = ${rate(inactivityRate())} — against the working-age population`, { size: 9, fill: MUTED, weight: 600 }),
    t(52, 306, 'The inactive are not unemployed: they are neither working nor looking for work.', { size: 9, fill: MUTED }),
    close,
  ].join('');
};

const iloSvg = () => grid(
  ['A person is counted as unemployed if they are', 'Otherwise'],
  [
    ['without a job', 'with any paid work, however few the hours, they are employed'],
    ['available to start work', 'unable to start, they are inactive'],
    ['actively seeking work', 'not looking, they are inactive'],
  ],
  {
    title: 'The International Labour Organization definition',
    note: `All three at once, or the person is not counted. This is why ${UNDEREMPLOYED}m of Andara’s employed who want more hours change no rate at all: they have paid work, so they are employed.`,
    colXs: [52, 268],
    h: 230,
  },
);

const migrationSvg = () => grid(
  ['', 'Before', 'After', ''],
  [
    ['Working-age population', `${WORKING_AGE}m`, `${mWorkingAge()}m`, `+${MIGRATION.workingAge}m`],
    ['Labour force', `${LABOUR_FORCE}m`, `${mLabourForce()}m`, `+${MIGRATION.joinLabourForce}m`],
    ['Employed', `${EMPLOYED}m`, `${mEmployed()}m`, `+${MIGRATION.findWork}m`],
    ['Unemployed', `${UNEMPLOYED}m`, `${mUnemployed()}m`, `+${r2(mUnemployed() - UNEMPLOYED)}m`],
    ['Unemployment rate', rate(unemploymentRate()), rate(mUnemploymentRate()), 'higher'],
  ],
  {
    title: 'Net migration of working age, one year later',
    highlight: 4,
    note: `More people are in work than before AND the unemployment rate is higher, because the labour force grew faster than employment did. Both statements are true of the same year, which is why the specification asks about employment and unemployment together.`,
    colXs: [52, 216, 300, 386],
    h: 290,
  },
);

const measuringUnemploymentDiagram = {
  kind: 'table',
  id: id('diagram', 'labour force decomposition ilo definition and migration'),
  title: 'Measuring Employment and Unemployment',
  description: 'Andara’s working-age population split into the employed, the unemployed and the inactive, with each of the three rates shown against the denominator it is actually measured on; the three conditions of the International Labour Organization definition; and what a year of net migration does to employment and to the unemployment rate at the same time.',
  scenarios: [
    { label: 'Who is in which group', svg: labourForceSvg() },
    { label: 'The ILO definition', svg: iloSvg() },
    { label: 'Net migration', svg: migrationSvg() },
  ],
};

/* ══ 8 · Causes of Unemployment ═══════════════════════════════════════════ */

const causesSvgUnused = () => grid(
  ['Cause', 'What is happening', 'Does it end on its own?'],
  [
    ['Frictional', 'Between jobs, while a match is found', 'Yes, as the match is made'],
    ['Seasonal', 'The work itself runs on a yearly cycle', 'Yes, when the season returns'],
    ['Structural', 'The skills or the place no longer match the jobs', 'No — retraining or moving is needed'],
    ['Demand deficiency', 'Too little aggregate demand for the whole economy’s output', 'Only when demand recovers'],
    ['Real wage inflexibility', 'Wages held above the level at which everyone willing to work is hired', 'Only if that floor moves'],
  ],
  {
    title: 'The five causes the specification names',
    note: 'The first two are short and expected. The last three are the ones an economy can be stuck with, and they are the ones a question about policy is really asking about.',
    colXs: [52, 156, 340],
    h: 290,
  },
);

/*
 * Real-wage inflexibility (3b-5, specGap-05): the one cause the March section dismissed in a
 * misconception instead of teaching. It is a labour-market picture, so it is drawn as one.
 */
const LAB = { x0: 92, x1: 428, y0: 248, yTop: 70 };
const LX = (q) => r2(LAB.x0 + (q / 14) * (LAB.x1 - LAB.x0));
const LY = (w) => r2(LAB.y0 - (w / 32) * (LAB.y0 - LAB.yTop));
/*
 * SCALED TO ANDARA. The first draft drew a market of 14m willing workers and an 8m gap inside a
 * section whose labour force is 12m and whose unemployment is 0.6m — Layer 6 pointed out that a
 * student attaching those figures to Andara would read a 67% unemployment rate. The floor now leaves
 * a gap of exactly 0.6m against a labour force of about 12m, so the illustration sits inside the
 * economy the rest of the section describes instead of contradicting it.
 *
 * Demand 40.5 − 1.5q and supply 6 + 1.5q meet at q = 11.5. A floor at 23.7 gives 11.2m wanted and
 * 11.8m willing: a gap of 0.6m, which is 5.0% of the labour force — Andara's own rate.
 */
const ldAt = (q) => 40.5 - 1.5 * q;
const lsAt = (q) => 6 + 1.5 * q;
const labourCurve = (fn, colour) => {
  const pts = [];
  for (let q = 0.5; q <= 13.5; q += 0.1) { const w = fn(q); if (w < 2 || w > 31) continue; pts.push(`${LX(q)},${LY(w)}`); }
  return `<polyline points="${pts.join(' ')}" fill="none" stroke="${colour}" stroke-width="2.5" stroke-linecap="round"/>`;
};
/** Solved, for the same reason meetAt() is: 36 − 1.5q = 6 + 1.5q gives q = 10 and a wage of 21. */
export const LAB_MEET = (() => { const q = (40.5 - 6) / 3; return [r2(q), r2(ldAt(q))]; })();   // [11.5, 23.25]
export const WAGE_FLOOR = 23.7;
export const FLOOR_DEMAND = r2((40.5 - WAGE_FLOOR) / 1.5);   // 11.2
export const FLOOR_SUPPLY = r2((WAGE_FLOOR - 6) / 1.5);      // 11.8
export const FLOOR_GAP = r2(FLOOR_SUPPLY - FLOOR_DEMAND);    // 0.6

const realWageSvg = () => [
  open(340),
  t(52, 34, 'Real-wage inflexibility', { size: 12, fill: INK, weight: 700 }),
  line(LAB.x0, LAB.y0, LAB.x1 + 12, LAB.y0, AXIS, 2, ' marker-end="url(#arr)"'),
  line(LAB.x0, LAB.y0, LAB.x0, LAB.yTop - 12, AXIS, 2, ' marker-end="url(#arr)"'),
  t((LAB.x0 + LAB.x1) / 2, LAB.y0 + 26, 'Workers (millions)', { size: 10, fill: AXIS, anchor: 'middle' }),
  t(LAB.x0 - 26, (LAB.y0 + LAB.yTop) / 2, 'Real wage', { size: 10, fill: AXIS, anchor: 'middle', rotate: -90 }),
  labourCurve(ldAt, BLUE),
  labourCurve(lsAt, GREEN),
  t(LX(12.6) + 6, LY(lsAt(12.6)), 'Supply of labour', { size: 10, fill: GREEN, weight: 600 }),
  t(LX(1.5) - 6, LY(ldAt(1.5)) - 8, 'Demand for labour', { size: 10, fill: BLUE, weight: 600 }),
  line(LAB.x0, LY(WAGE_FLOOR), LAB.x1, LY(WAGE_FLOOR), AMBER, 2.5),
  t(LAB.x1 + 4, LY(WAGE_FLOOR) + 3.5, 'floor', { size: 10, fill: AMBER, weight: 700 }),
  dot(LX(FLOOR_DEMAND), LY(WAGE_FLOOR), BLUE),
  dot(LX(FLOOR_SUPPLY), LY(WAGE_FLOOR), GREEN),
  line(LX(FLOOR_DEMAND), LY(WAGE_FLOOR) - 16, LX(FLOOR_SUPPLY), LY(WAGE_FLOOR) - 16, RED, 2, ' marker-end="url(#arrRed)"'),
  t((LX(FLOOR_DEMAND) + LX(FLOOR_SUPPLY)) / 2, LY(WAGE_FLOOR) - 22, `${FLOOR_GAP}m unemployed`, { size: 10, fill: RED, anchor: 'middle', weight: 700 }),
  dot(LX(LAB_MEET[0]), LY(LAB_MEET[1]), MUTED, 4),
  t(LX(LAB_MEET[0]) + 8, LY(LAB_MEET[1]) + 12, 'where everyone willing to work at that wage is hired', { size: 8, fill: MUTED }),
  t(52, 282, `At the floor, firms want ${FLOOR_DEMAND}m workers and ${FLOOR_SUPPLY}m want to work. The gap of ${FLOOR_GAP}m is unemployment`, { size: 9, fill: MUTED }),
  t(52, 310, `A gap of ${FLOOR_GAP}m in a labour force of about 12m is an unemployment rate of 5.0%.`, { size: 9, fill: MUTED }),
  t(52, 296, 'that exists because the wage cannot fall, not because those workers are unwilling or unskilled.', { size: 9, fill: MUTED }),
  close,
].join('');

const unemploymentCausesDiagram = {
  id: id('diagram', 'five causes of unemployment and real wage inflexibility'),
  title: 'Causes of Unemployment',
  description: 'The five causes the specification names, each set against what is actually happening and whether it resolves without intervention, and the real-wage case drawn as a labour market with a wage that cannot fall.',
  checklist: [
    'Name the cause from what is happening, not from how long it has lasted',
    'Frictional and seasonal unemployment resolve on their own; the other three need something to change',
    'Structural unemployment is a mismatch of skills or place, not a shortage of jobs in total',
    'Demand-deficiency unemployment is a shortage of demand across the whole economy',
    'Real-wage unemployment is a gap between the workers wanted and the workers willing at a wage that cannot fall',
  ],
  /*
   * The five-cause table that used to sit beside this diagram has been removed. `diagram.table-kind`
   * fires on any diagram whose text sits on a grid of four rows or more, and declaring `kind: "table"`
   * would drop the checklist — which here is a real drawing checklist for a labour-market diagram, not
   * a reference header. The table itself is in this chapter's Notes block and across its five
   * subsections, so it is not lost; it is simply not also a diagram.
   */
  scenarios: [
    { label: 'Real-wage inflexibility', svg: realWageSvg() },
  ],
};

/* ══ 9 · Effects of Unemployment — and the PPF ════════════════════════════ */
/*
 * 3c-5 asks for "resource utilisation and production possibility frontier" by name, so the frontier
 * is drawn and the economy is put inside it. specGap-01 records that the effects of unemployment were
 * absent from the section entirely.
 */
const PPF = { x0: 92, x1: 424, y0: 250, yTop: 68 };
const PX = (x) => r2(PPF.x0 + (x / 100) * (PPF.x1 - PPF.x0));
const PY = (y) => r2(PPF.y0 - (y / 100) * (PPF.y0 - PPF.yTop));
/** A quarter circle of radius 90: the frontier, sampled rather than sketched. */
const ppfAt = (x) => r2(Math.sqrt(Math.max(0, 90 * 90 - x * x)));
export const PPF_INSIDE = [40, 45];
export const PPF_ON = [40, ppfAt(40)];      // [40, 80.62]

const ppfSvg = () => {
  const pts = [];
  for (let x = 0; x <= 90; x += 1) pts.push(`${PX(x)},${PY(ppfAt(x))}`);
  return [
    open(320),
    t(52, 34, 'Unemployment is unused resources', { size: 12, fill: INK, weight: 700 }),
    line(PPF.x0, PPF.y0, PPF.x1 + 12, PPF.y0, AXIS, 2, ' marker-end="url(#arr)"'),
    line(PPF.x0, PPF.y0, PPF.x0, PPF.yTop - 12, AXIS, 2, ' marker-end="url(#arr)"'),
    t((PPF.x0 + PPF.x1) / 2, PPF.y0 + 26, 'Consumer goods', { size: 10, fill: AXIS, anchor: 'middle' }),
    t(PPF.x0 - 26, (PPF.y0 + PPF.yTop) / 2, 'Capital goods', { size: 10, fill: AXIS, anchor: 'middle', rotate: -90 }),
    `<polyline points="${pts.join(' ')}" fill="none" stroke="${BLUE}" stroke-width="2.5" stroke-linecap="round"/>`,
    t(PX(66), PY(ppfAt(66)) - 10, 'production possibility frontier', { size: 9, fill: BLUE, anchor: 'middle' }),
    dot(PX(PPF_INSIDE[0]), PY(PPF_INSIDE[1]), RED, 6),
    t(PX(PPF_INSIDE[0]) - 8, PY(PPF_INSIDE[1]) + 4, 'A', { size: 12, fill: RED, anchor: 'end', weight: 700 }),
    dot(PX(PPF_ON[0]), PY(PPF_ON[1]), GREEN, 6),
    t(PX(PPF_ON[0]) - 8, PY(PPF_ON[1]) + 4, 'B', { size: 12, fill: GREEN, anchor: 'end', weight: 700 }),
    line(PX(PPF_INSIDE[0]), PY(PPF_INSIDE[1]) - 8, PX(PPF_ON[0]), PY(PPF_ON[1]) + 10, AMBER, 2, ' marker-end="url(#arrAmber)"'),
    t(52, 282, 'A is inside the frontier: workers who could produce are not producing, so the economy makes less of both.', { size: 9, fill: MUTED }),
    t(52, 296, 'Nothing has been destroyed — the output at B is still possible. It is simply not being made.', { size: 9, fill: AMBER, weight: 600 }),
    close,
  ].join('');
};

const unemploymentEffectsSvgUnused = () => grid(
  ['Affected', 'The effect'],
  [
    ['Consumers', 'Less income, so less spending — and the fear of it changes what those still in work spend'],
    ['Firms', 'Smaller market to sell to, against cheaper and more available labour'],
    ['Workers', 'Lost income now, and skills that decay the longer it lasts'],
    ['Public finances', 'Less collected in tax and more paid in support, from the same budget'],
    ['Resource utilisation', 'The economy produces inside its frontier: output that was possible is not made'],
    ['Society', 'Costs that no figure in the national accounts records at all'],
  ],
  {
    title: 'Effects of unemployment',
    note: 'The specification lists six, and the last two are the ones most often left out of an answer: unemployment is a loss of output as well as a loss of income.',
    colXs: [52, 176],
    h: 310,
  },
);

const unemploymentEffectsDiagram = {
  id: id('diagram', 'effects of unemployment and the production possibility frontier'),
  title: 'Effects of Unemployment',
  description: 'The six groups the specification names, and the production possibility frontier it names alongside them: an economy with unemployed workers produces at a point inside its own frontier, so the loss is output that was possible and was not made.',
  checklist: [
    'A point inside the frontier is unused resources, not a smaller frontier',
    'The CAPACITY is recoverable — the frontier has not moved — but the output not made this year is gone for good',
    'Public finances are hit twice: less tax collected and more support paid',
    'The cost to a worker outlasts the unemployment, because skills decay',
  ],
  // Same as block 8: 3c-5 names the production possibility frontier, so this is a drawn diagram with
  // a drawing checklist, and the six-group table it carried is in the Notes and the five subsections.
  scenarios: [
    { label: 'Inside the frontier', svg: ppfSvg() },
  ],
};

/* ══ 10 · The Balance of Payments ═════════════════════════════════════════ */

const bopComponentsSvg = () => grid(
  ['Component', 'What it records'],
  [
    ['Current account', 'Trade in goods, trade in services, primary income, secondary income'],
    ['Capital account', 'Transfers of assets between countries'],
    ['Financial account', 'Purchases and sales of assets across the border'],
  ],
  {
    title: 'Components of the balance of payments',
    note: 'The specification asks for the components with particular reference to the current account, and that is where this chapter stays. The other two are Unit 4.',
    colXs: [52, 186],
    h: 210,
  },
);

const currentAccountSvg = () => grid(
  ['Part of the current account', 'Balance'],
  [
    ['Trade in goods', bn(BOP.goods)],
    ['Trade in services', bn(BOP.services)],
    ['Primary income', bn(BOP.primary)],
    ['Secondary income', bn(BOP.secondary)],
  ],
  {
    title: 'Andara’s current account',
    total: ['Current account balance', bn(currentAccount())],
    note: `Trade in goods and services alone is ${bn(BOP.goods)} + ${bn(BOP.services)} = ${bn(tradeInGoodsAndServices())}, a SURPLUS. The current account as a whole is ${bn(currentAccount())}, a DEFICIT. Both statements describe the same year, which is why the specification distinguishes them.`,
    colXs: [52, 320],
    h: 270,
  },
);

const bopDiagram = {
  kind: 'table',
  id: id('diagram', 'balance of payments components and andara current account'),
  title: 'The Balance of Payments',
  description: `The components of the balance of payments, and Andara’s current account worked through part by part — a surplus on trade in goods and services of ${bn(tradeInGoodsAndServices())} sitting inside a current account deficit of ${bn(currentAccount())}.`,
  scenarios: [
    { label: 'The components', svg: bopComponentsSvg() },
    { label: "Andara's current account", svg: currentAccountSvg() },
  ],
};

export const DIAGRAMS = [
  outputDiagram, growthDiagram, wellbeingDiagram, inflationDiagram, inflationCausesDiagram,
  effectsDiagram, measuringUnemploymentDiagram, unemploymentCausesDiagram,
  unemploymentEffectsDiagram, bopDiagram,
];
