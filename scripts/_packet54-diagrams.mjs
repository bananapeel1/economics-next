/**
 * PACKET 54 — assessing-competitiveness diagrams. FIVE, one pinned to each chapter by `diagramId`,
 * every figure read off `FIRM` rather than typed into the SVG.
 *
 * `structure-06` reports zero diagrams and names two candidates: a VRIO decision funnel (VRIO has 0
 * hits in the specification, so it is not drawn) and "a 'gearing amplifies returns/losses' bar
 * comparison", which is chapter 3's diagram. The other chapters draw what their own bullets are
 * about: the two statements (1a, 1b), the six ratios over two years (2a), the four workforce
 * measures over two years (3a), and what each HR response would cost (3c).
 *
 * THE CHECK-IN SHOWS THE CHAPTER'S DIAGRAM WITH ONE QUIZ ITEM (`lib/checkin-placement.js`, the
 * block's first pinned item). Each chapter's first item is written against figures or ideas this
 * module does not print, and the runner re-checks every pinned key on the emitted SVG.
 *
 * Frame 400 wide, faces 15 (titles) and 12 (everything else), stacked rows at least 20 apart, which
 * clears the collision guard's 1.2 × 15 = 18. Bars are `<rect>`s; only axes are lines, and no label
 * sits on one. Every colour is a key of `PALETTE` in `components/learn-mode/processSvg.js`.
 */
import { id, FIRM, usd, usdm, units, pct, ratio } from './_packet54-util.mjs';

const F = FIRM;
const { L, T, PL, PT } = F;

export const FRAME = { w: 400, pad: 16 };
export const FACE = 15;
export const SMALL = 12;
export const MIN_FACE = SMALL;
export const COLLIDE_TOL = 1.2;
export const LEAD = 20;

const INK = '#e8ecf5';
const MUTED = '#7a8299';
const AXIS = '#94a3b8';
const GRID = '#475569';
const GREEN = '#34d399';
const RED = '#f87171';
const BLUE = '#60a5fa';
const AMBER = '#f59e0b';
const PURPLE = '#a78bfa';

export const estWidth = (text, size = FACE) => String(text).length * size * 0.56;

const r1 = (n) => Math.round(n * 10) / 10;
const svg = (h, body) => `<svg width="${FRAME.w}" height="${h}" viewBox="0 0 ${FRAME.w} ${h}" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',system-ui,sans-serif;background:transparent">${body}</svg>`;
const t = (x, y, str, { size = SMALL, fill = INK, anchor = 'start', weight = 400 } = {}) =>
  `<text x="${r1(x)}" y="${r1(y)}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" font-weight="${weight}">${str}</text>`;
const title = (str) => t(FRAME.w / 2, 24, str, { size: FACE, anchor: 'middle', weight: 600 });
const rect = (x, y, w, h, { fill = 'none', stroke = GRID, rx = 6, sw = 1.5 } = {}) =>
  `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${r1(h)}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
const bar = (x, y, w, h, c) => rect(x, y, w, h, { fill: c, stroke: c, rx: 2, sw: 1 });
const line = (x1, y1, x2, y2, { stroke = AXIS, sw = 1.5, dash = null } = {}) =>
  `<line x1="${r1(x1)}" y1="${r1(y1)}" x2="${r1(x2)}" y2="${r1(y2)}" stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
const legend = (y, items) => {
  const out = [];
  let x = 60;
  for (const [label, c] of items) {
    out.push(bar(x, y - 9, 14, 8, c), t(x + 20, y, label, { fill: MUTED }));
    x += 20 + estWidth(label, SMALL) + 30;
  }
  return out.join('');
};

/* ══ 1 · Reading the financial statements (1a, 1b) ═══════════════════════ */

const cascadeSvg = () => {
  const x0 = 170, span = 170, s = span / T.revenue;
  const rows = [
    ['Revenue', 0, T.revenue, BLUE, usdm(T.revenue)],
    ['− Cost of sales', T.gp, T.revenue, RED, usdm(T.cos)],
    ['= Gross profit', 0, T.gp, GREEN, usdm(T.gp)],
    ['− Operating expenses', T.op, T.gp, RED, usdm(T.opex)],
    ['= Operating profit', 0, T.op, GREEN, usdm(T.op)],
    ['− Interest', T.pfy, T.op, RED, usdm(T.interest)],
    ['= Profit for the year', 0, T.pfy, GREEN, usdm(T.pfy)],
  ];
  const top = 56, gap = 28;
  return svg(290, [
    title(`${F.short}: from revenue to profit, this year`),
    ...rows.map(([label, from, to, c, v], i) => {
      const y = top + i * gap;
      const x = x0 + from * s;
      const w = Math.max(3, (to - from) * s);
      return [
        t(16, y + 4, label, { fill: i % 2 === 0 ? INK : MUTED, weight: i % 2 === 0 ? 600 : 400 }),
        bar(x, y - 8, w, 14, c),
        t(x + w + 6, y + 4, v),
      ].join('');
    }),
    t(FRAME.w / 2, 270, 'Each line takes off one kind of cost', { anchor: 'middle' }),
  ].join(''));
};

const positionSvg = () => {
  const total = PT.nca + PT.ca;
  const h = 190, y0 = 50, s = h / total;
  const lx = 16, rx = 208, w = 176;
  const seg = (x, y, amount, lines, c) => {
    const hh = amount * s;
    const cy = y + hh / 2;
    const first = cy - ((lines.length - 1) * LEAD) / 2 + 4;
    return rect(x, y, w, hh, { stroke: c, rx: 3 })
      + lines.map((str, i) => t(x + w / 2, first + i * LEAD, str, { anchor: 'middle', fill: i === 0 ? c : INK, weight: i === 0 ? 600 : 400 })).join('');
  };
  const yCA = y0 + PT.nca * s;
  const yNCL = y0 + PT.cl * s;
  const yEq = yNCL + PT.ncl * s;
  return svg(300, [
    title('What it owns, and how that is funded'),
    seg(lx, y0, PT.nca, ['Non-current assets', usdm(PT.nca)], BLUE),
    seg(lx, yCA, PT.ca, [`Current assets ${usdm(PT.ca)}`], BLUE),
    seg(rx, y0, PT.cl, [`Current liabilities ${usdm(PT.cl)}`], RED),
    seg(rx, yNCL, PT.ncl, ['Non-current liabilities', usdm(PT.ncl)], RED),
    seg(rx, yEq, PT.equity, ['Total equity', usdm(PT.equity)], GREEN),
    t(lx + w / 2, y0 + h + 22, `Assets ${usdm(total)}`, { anchor: 'middle', fill: MUTED }),
    t(rx + w / 2, y0 + h + 22, `Liabilities + equity ${usdm(total)}`, { anchor: 'middle', fill: MUTED }),
    t(FRAME.w / 2, 290, `Net assets ${usdm(PT.netAssets)} = total equity ${usdm(PT.equity)}`, { anchor: 'middle' }),
  ].join(''));
};

export const statementsDiagram = {
  id: id('diagram', 'financial statements cascade and position'),
  title: 'Reading the Two Financial Statements',
  description: `IAL 3.3.5 · 1a and 1b: the key information in ${F.short}'s statement of comprehensive income, line by line, and in its statement of financial position at the year end.`,
  checklist: [
    'Revenue, less cost of sales, less other operating expenses, less interest: three profit lines',
    'The statement of financial position is one day: what is owned against what is owed',
    'Both sides balance: net assets equal total equity',
  ],
  scenarios: [
    { label: 'From revenue to profit', svg: cascadeSvg() },
    { label: 'Owned and owed', svg: positionSvg() },
  ],
};

/* ══ 2 · Calculating the ratios (2a) ═════════════════════════════════════ */

const groupedBars = (heading, groups, max, fmt, { reference = null } = {}) => {
  const yBase = 214, hMax = 140, bw = 34, gw = 360 / groups.length, x0 = 30;
  const s = hMax / max;
  const out = [title(heading), legend(50, [['Last year', PURPLE], ['This year', AMBER]]), line(24, yBase, 380, yBase)];
  if (reference) {
    const y = yBase - reference.value * s;
    out.push(line(24, y, 380, y, { stroke: RED, dash: '5 4' }), t(380, y - 6, reference.label, { anchor: 'end', fill: RED }));
  }
  groups.forEach(([label, a, b], i) => {
    const cx = x0 + gw * i + gw / 2;
    for (const [v, c, dx] of [[a, PURPLE, -bw - 3], [b, AMBER, 3]]) {
      const hh = v * s;
      out.push(bar(cx + dx, yBase - hh, bw, hh, c), t(cx + dx + bw / 2, yBase - hh - 6, fmt(v), { anchor: 'middle' }));
    }
    label.forEach((ln, j) => out.push(t(cx, yBase + LEAD + j * 16, ln, { anchor: 'middle', fill: MUTED })));
  });
  return svg(270, out.join(''));
};

const profitabilitySvg = () => groupedBars(`${F.short}: profitability and ROCE`, [
  [['Gross profit', 'margin'], L.gpm, T.gpm],
  [['Profit for the', 'year margin'], L.pfym, T.pfym],
  [['ROCE'], PL.roce, PT.roce],
], 50, pct);

const liquiditySvg = () => groupedBars(`${F.short}: liquidity`, [
  [['Current ratio'], PL.current, PT.current],
  [['Acid test ratio'], PL.acid, PT.acid],
], 2, ratio, { reference: { value: 1, label: '1:1' } });

const gearingSvg = () => groupedBars(`${F.short}: gearing`, [
  [['Gearing ratio'], PL.gearing, PT.gearing],
], 60, pct, { reference: { value: 50, label: 'Usually called high' } });

export const ratiosDiagram = {
  id: id('diagram', 'six ratios over two years'),
  title: 'Six Ratios Over Two Years',
  description: `IAL 3.3.5 · 2a: ${F.short}'s profitability, liquidity, gearing and ROCE, last year against this year.`,
  checklist: [
    `Both margins and ROCE fell: ${pct(L.gpm)} → ${pct(T.gpm)}, ${pct(L.pfym)} → ${pct(T.pfym)}, ${pct(PL.roce)} → ${pct(PT.roce)}`,
    `The acid test fell below 1:1, to ${ratio(PT.acid)}; the current ratio to ${ratio(PT.current)}`,
    `Gearing rose from ${pct(PL.gearing)} to ${pct(PT.gearing)}, still below the usual 50% mark`,
  ],
  scenarios: [
    { label: 'Profitability', svg: profitabilitySvg() },
    { label: 'Liquidity', svg: liquiditySvg() },
    { label: 'Gearing', svg: gearingSvg() },
  ],
};

/* ══ 3 · Using ratios to make decisions (2b): gearing magnifies both ways ═══ */

export const GEAR = (() => {
  const ce = 20e6, rate = 8;
  const firms = { low: { debt: 2e6 }, high: { debt: 12e6 } };
  const years = { good: 20, bad: 4 };          // ROCE, %
  const cents = {};
  for (const [f, { debt }] of Object.entries(firms)) {
    const equity = ce - debt;
    for (const [y, roce] of Object.entries(years)) {
      const op = (ce * roce) / 100;
      cents[`${f}-${y}`] = r1(((op - (debt * rate) / 100) / equity) * 100);
    }
  }
  return { ce, rate, firms, years, cents };
})();

const magnifySvg = () => {
  const yBase = 170, s = 2.6, bw = 40;
  const fmt = (v) => `${v < 0 ? '−' : ''}${Math.abs(v)}c`;
  const out = [
    title('Gearing magnifies gains and losses'),
    legend(50, [['Low gearing, 10%', BLUE], ['High gearing, 60%', RED]]),
    line(24, yBase, 380, yBase),
  ];
  [['good', 'Good year: ROCE 20%', 110], ['bad', 'Bad year: ROCE 4%', 290]].forEach(([y, label, cx]) => {
    for (const [f, c, dx] of [['low', BLUE, -bw - 4], ['high', RED, 4]]) {
      const v = GEAR.cents[`${f}-${y}`];
      const hh = Math.abs(v) * s;
      const top = v >= 0 ? yBase - hh : yBase;
      out.push(bar(cx + dx, top, bw, Math.max(hh, 2), c));
      out.push(t(cx + dx + bw / 2, v >= 0 ? top - 6 : yBase + hh + 14, fmt(v), { anchor: 'middle' }));
    }
    out.push(t(cx, 222, label, { anchor: 'middle', fill: MUTED }));
  });
  out.push(t(FRAME.w / 2, 250, 'Profit for owners per $1 they put in', { anchor: 'middle', fill: MUTED }));
  out.push(t(FRAME.w / 2, 276, `$20m capital employed, borrowing at ${pct(GEAR.rate)}`, { anchor: 'middle' }));
  return svg(290, out.join(''));
};

export const gearingDiagram = {
  id: id('diagram', 'gearing magnifies gains and losses'),
  title: 'Gearing Magnifies Gains and Losses',
  description: 'IAL 3.3.5 · 2b: two firms with the same capital employed and the same ROCE, one lightly and one heavily geared, in a good year and a bad one.',
  checklist: [
    'In the good year the heavily geared firm makes more for each dollar its owners put in',
    'In the bad year the same firm cannot cover its interest, and its owners make a loss',
    'The interest is the same in both years; that fixed cost is what magnifies the swing',
  ],
  scenarios: [
    { label: 'Good year and bad year', svg: magnifySvg() },
  ],
};

/* ══ 4 · Measuring the workforce (3a) ══════════════════════════════════════ */

const workforceSvg = () => {
  const rows = [
    ['Loaves per baker a month', F.prodL, F.prodT, (v) => units(v), 3500],
    ['Labour turnover', F.HL.turnover, F.HT.turnover, pct, 100],
    ['Retention rate', F.HL.retention, F.HT.retention, pct, 100],
    ['Absenteeism', F.HL.absence, F.HT.absence, pct, 10],
  ];
  const x0 = 16, span = 280, top = 72, gap = 62;
  const out = [title(`${F.short}: the workforce, over two years`), legend(46, [['Last year', PURPLE], ['This year', AMBER]])];
  rows.forEach(([label, a, b, fmt, max], i) => {
    const y = top + i * gap;
    out.push(t(x0, y, label, { weight: 600 }));
    [[a, PURPLE, 18], [b, AMBER, 36]].forEach(([v, c, dy]) => {
      const w = (v / max) * span;
      out.push(bar(x0, y + dy - 8, w, 12, c), t(x0 + w + 6, y + dy + 2, fmt(v)));
    });
  });
  return svg(330, out.join(''));
};

export const workforceDiagram = {
  id: id('diagram', 'workforce measures over two years'),
  title: 'The Workforce Over Two Years',
  description: `IAL 3.3.5 · 3a: ${F.short}'s labour productivity, labour turnover, retention and absenteeism, last year against this year.`,
  checklist: [
    'Output per baker fell even though total output rose',
    'Turnover doubled while retention fell by ten points: the two measure different groups of staff',
    'Absenteeism rose alongside turnover, which suggests a shared cause',
  ],
  scenarios: [
    { label: 'Four measures', svg: workforceSvg() },
  ],
};

/* ══ 5 · HR strategies (3c): what each response would cost ══════════════════ */

export const PAYGAP = F.HT.avg * (F.rivalPay - F.shopPay) * 12;

const costSvg = () => {
  const rows = [
    ['What turnover costs now', F.turnoverCostT, RED, usd(F.turnoverCostT)],
    ['The share scheme', F.esopCost, AMBER, usd(F.esopCost)],
    ['Matching rivals\' pay', PAYGAP, AMBER, usd(PAYGAP)],
    ['Asking staff about rotas', 20_000, GREEN, 'little cash cost'],
  ];
  const x0 = 16, span = 250, s = span / Math.max(...rows.map((r) => r[1])), top = 58, gap = 52;
  const out = [title(`${F.short}: what each response costs a year`)];
  rows.forEach(([label, v, c, shown], i) => {
    const y = top + i * gap;
    const w = Math.max(4, v * s);
    out.push(t(x0, y, label, { weight: 600 }), bar(x0, y + 8, w, 14, c), t(x0 + w + 8, y + 20, shown));
  });
  out.push(t(FRAME.w / 2, 286, 'Set each cost against the cause of the problem', { anchor: 'middle' }));
  return svg(300, out.join(''));
};

export const strategiesDiagram = {
  id: id('diagram', 'cost of each hr response'),
  title: 'What Each HR Response Would Cost',
  description: `IAL 3.3.5 · 3c: the yearly cost of three responses to ${F.short}'s staff turnover, set against what the turnover itself costs.`,
  checklist: [
    `Turnover costs ${usd(F.turnoverCostT)} a year: leavers × the cost of replacing one`,
    `The share scheme and matching rivals' pay each cost about as much as the turnover`,
    `So fewer leavers alone cannot repay either; a say over rotas costs little`,
  ],
  scenarios: [
    { label: 'Cost per year', svg: costSvg() },
  ],
};

/* ── the array order IS the chapter order, and the runner derives pins from it ── */
export const DIAGRAMS = [statementsDiagram, ratiosDiagram, gearingDiagram, workforceDiagram, strategiesDiagram];
export const ALL_DIAGRAMS = DIAGRAMS;
