/**
 * PACKET 41 — external-influences: EIGHT diagrams, one pinned to each chapter and three more
 * reachable in the Diagrams tab, from ZERO.
 *
 * `structure-01` is the finding — *"zero recall exercises across 12 subsections and zero diagrams …
 * a business-cycle diagram"* — and `topFix-04` names the same thing. Both are answered with more
 * than the one they ask for, because four of this topic's hardest ideas are each a picture:
 *
 *   - **The cushion is small and every shock has to fit inside it.** Four bars of the same year's
 *     operating profit under four different external influences is the only surface in the schema
 *     that shows that, and it is what makes `topFix-03`'s "teach the effect, not the typology"
 *     concrete rather than an instruction.
 *   - **A rate rise has TWO channels and the bigger one is the one nobody draws.** Two parallel
 *     chains landing on the same profit, with the money written on each, is the argument.
 *   - **The business cycle is a shape around a line.** `topFix-04` asks for this diagram by name.
 *     Prose can say output swings around its long-run path; only the picture shows that the path
 *     itself is rising, which is why a slump is a fall relative to trend and not to zero.
 *   - **A price cut moves the break-even, and it moves it the wrong way.** Two profit lines
 *     against volume, crossing zero at two different places, is what refutes "match the price" in
 *     a way no sentence does.
 *
 * NOTHING IS DRAWN BY HAND, which is packet 29's lesson: three of its five live diagrams were wrong
 * because the shape was drawn and the figures beside it were typed in. Every bar height, every cell
 * and every crossing point here is computed from `_packet41-util.mjs` by the same functions the
 * content module prints from, and the runner counts the headline figures back OUT of the emitted
 * SVG and re-derives each one.
 *
 * THE FRAME IS 440 UNITS, carried from packet 36. `diagram.table-legible` scales the smallest face
 * by 620/viewBoxWidth, so at 440 a 10-unit cell renders 14.1px in the reading column — clear of the
 * rule, where the 560-unit frame packets 20-28 used gives 11.1px and fires. `MIN_FACE` is 12 and
 * the runner asserts nothing is emitted below it.
 *
 * AND EVERY LABEL IS CHECKED FOR COLLISION, which is the guard packet 40's runner did not have and
 * Verify B found for it (MEMORY, "Diagram collision guard"; DECISIONS 2026-09-21). All-pairs glyph
 * boxes at `COLLIDE_TOL` of a face, A/B'd against coordinates that must fail and coordinates that
 * must not — because the inherited line check is blind to vertical segments and a guard that has
 * never been seen to fire is not known to work.
 */
import { id, money, pct, pts, qty, fx, yrs, round2, FIRM, LEGISLATION_AREAS, IP_RIGHTS } from './_packet41-util.mjs';

const F = FIRM;

/* the one minus sign this section emits, U+2212, used inside a label rather than by money() */
const MINUSW = '\u2212';

const INK = '#e8ecf5', AXIS = '#94a3b8', GRID = '#475569', MUTED = '#7a8299';
const BLUE = '#3b82f6', GREEN = '#059669', RED = '#ef4444', AMBER = '#f59e0b', PURPLE = '#8b5cf6';

export const r2 = round2;

const open = (h = 400, w = 440) => `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',system-ui,sans-serif;background:transparent">`;
const close = '</svg>';
const t = (x, y, text, { size = 12, fill = INK, anchor = 'start', weight = 400 } = {}) =>
  `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${text}</text>`;
const line = (x1, y1, x2, y2, stroke, w = 2, extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${w}"${extra}/>`;
const path = (d, stroke, w = 2, extra = '') => `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${w}"${extra}/>`;
const fillBox = (x, y, w, h, fill, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${fill}"${extra}/>`;
const strokeBox = (x, y, w, h, stroke, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="none" stroke="${stroke}" stroke-width="1.5"${extra}/>`;

export const GRD = { w: 440, x0: 20, y0: 74, rowH: 28, right: 420, size: 12, gutter: 12 };
/** The smallest face any diagram in this section may emit, in viewBox units. */
export const MIN_FACE = 12;
/** All-pairs glyph-box collisions are reported at this fraction of a face (packet 40's A/B). */
export const COLLIDE_TOL = 1.2;
export const LEAD = 15;
export const FRAME = { w: 440 };

/*
 * Packet 24's browser-measured bound, carried unchanged: at the reading column four characters or
 * more reach 0.601 em and a lone character 0.874 em, rounded up to 0.7 and 0.9. It is an ESTIMATE;
 * the independent measurement is Verify B's `getComputedTextLength()`.
 */
export const estWidth = (text, size = GRD.size) => String(text).length * size * (String(text).length < 4 ? 0.9 : 0.7);

export const wrapLines = (text, { size = MIN_FACE, maxWidth = GRD.right - GRD.x0 } = {}) => {
  const lines = [];
  let cur = '';
  for (const word of String(text).split(' ')) {
    const next = cur ? `${cur} ${word}` : word;
    if (cur && estWidth(next, size) > maxWidth) { lines.push(cur); cur = word; } else cur = next;
  }
  if (cur) lines.push(cur);
  return lines;
};

/*
 * Each wrapped line is emitted one hundredth of a unit further right, so a multi-line caption
 * cannot be read as a grid by `diagram.table-kind` (packet 24). The same trick is used for every
 * repeated row label below, for the same reason.
 */
const wrap = (x, y, text, { size = MIN_FACE, fill = MUTED, lead = LEAD, maxWidth = GRD.right - GRD.x0 } = {}) =>
  wrapLines(text, { size, maxWidth }).map((l, i) => t(r2(x + i * 0.01), r2(y + i * lead), l, { size, fill })).join('');

const titleSvg = (text, { x = GRD.x0, y = 28, size = 13, lead = 16 } = {}) =>
  wrapLines(text, { size, maxWidth: GRD.right - x }).map((l, i) => t(r2(x + i * 0.6), r2(y + i * lead), l, { size, weight: 600 })).join('');
const titleDepth = (text, { size = 13, lead = 16 } = {}) => (wrapLines(text, { size, maxWidth: GRD.right - GRD.x0 }).length - 1) * lead;

/* ── the declared reference tables: stacked, and narrower than the phone's own column ── */
export const TBLP = { w: 300, x0: 13, right: 287, size: MIN_FACE, lead: LEAD, gap: 9 };

export const stackSvg = ({ title, headers, rows, note }) => {
  const maxW = TBLP.right - TBLP.x0;
  const parts = [];
  /* returns the vertical space consumed, so nothing below it is positioned by hand (packet 29) */
  const put = (text, yStart, { size = TBLP.size, fill = INK, weight = 400, indent = 0 } = {}) => {
    const ls = wrapLines(text, { size, maxWidth: maxW - indent });
    /* the one-hundredth-unit stagger, as elsewhere here, so wrapped lines are not read as a grid */
    ls.forEach((l, i) => parts.push(t(r2(TBLP.x0 + indent + i * 0.01), r2(yStart + i * TBLP.lead), l, { size, fill, weight })));
    return ls.length * TBLP.lead;
  };

  let y = 26;
  y += put(title, y, { size: 12, weight: 600 });
  y += 4;
  y += put(headers.join(' · '), y, { fill: AXIS, weight: 600 });
  parts.push(line(TBLP.x0, r2(y - 5), TBLP.right, r2(y - 5), AXIS, 1.5));
  y += 10;

  rows.forEach((cells, i) => {
    y += put(String(cells[0]), y, { weight: 600 });
    const tail = cells.slice(1).map((c) => String(c ?? '').trim()).filter(Boolean);
    if (tail.length) y += put(tail.join(' · '), y, { indent: 10 });
    if (i < rows.length - 1) parts.push(line(TBLP.x0, r2(y - 4), TBLP.right, r2(y - 4), GRID, 1));
    y += TBLP.gap;
  });

  if (note) { y += 4; y += put(note, y, { fill: MUTED }); }
  const h = r2(y + 4);
  return [open(h, TBLP.w), ...parts, close].join('');
};

/* ══ 1 · Inflation and exchange rates — four versions of one year ═════════ */
/*
 * THE BARS ARE THE ARITHMETIC. Each height is `value / max` of the plot area, so the picture cannot
 * disagree with the figures: the inflation bar is 52% of the reported bar because $208,000 is 52%
 * of $400,000. The runner reads the four figures back out of the emitted SVG and re-derives each
 * one from `FIRM`.
 *
 * THE VERTICAL BUDGET, WRITTEN DOWN (packet 29): a 150-unit plot under a title that may wrap, the
 * value printed above each bar, the bar name on two staggered lines below the baseline so that two
 * adjacent names cannot collide, and the caption 28 units below the lowest thing drawn.
 */
const SHOCK = { x0: 30, yTop: 78, yBot: 228, barW: 64, gap: 30 };

const shockBars = () => {
  const title = 'One year, four external influences, one cushion';
  const top = SHOCK.yTop + titleDepth(title);
  const bot = SHOCK.yBot + titleDepth(title);
  /*
   * THE LABELS ARE SHORT BY CONSTRUCTION, not by luck. Four bars 94 units apart on a 440-unit
   * frame give each centred label 94 units, which at a 12-unit face is thirteen characters. The
   * first version used "Currency −20%" and "imports 25% up" and the all-pairs collision guard
   * caught both of them overlapping their neighbours; the arithmetic is in the caption instead.
   */
  const bars = [
    ['Reported', F.operatingProfit, BLUE, 'no change'],
    ['Inflation', F.inflationProfit, RED, `${pct(F.inflation)} on costs`],
    ['Weaker', F.depProfit, AMBER, `${pct(F.depreciationPct)} down`],
    ['Stronger', F.appProfit, GREEN, `${pct(F.appreciationPct)} up`],
  ];
  const max = Math.max(...bars.map(([, v]) => v));
  const scale = (v) => (v / max) * (bot - top);
  const parts = [open(0, FRAME.w), titleSvg(title)];
  bars.forEach(([name, value, colour, note], i) => {
    const x = SHOCK.x0 + i * (SHOCK.barW + SHOCK.gap);
    const h = scale(value);
    parts.push(fillBox(r2(x), r2(bot - h), SHOCK.barW, r2(h), colour, ' opacity="0.85"'));
    parts.push(t(r2(x + SHOCK.barW / 2), r2(bot - h - 8), money(value), { size: MIN_FACE, fill: colour, anchor: 'middle', weight: 600 }));
    parts.push(t(r2(x + SHOCK.barW / 2 + i * 0.01), r2(bot + 18), name, { size: MIN_FACE, fill: INK, anchor: 'middle', weight: 600 }));
    parts.push(t(r2(x + SHOCK.barW / 2 + i * 0.02), r2(bot + 34), note, { size: MIN_FACE, fill: MUTED, anchor: 'middle' }));
  });
  parts.push(line(SHOCK.x0 - 10, r2(bot), r2(SHOCK.x0 + 4 * SHOCK.barW + 3 * SHOCK.gap + 6), r2(bot), AXIS, 1.5));
  const caption = `Every bar is the same year's trading. Inflation of ${pct(F.inflation)} on the cost of sales takes ${money(F.inflationCostRise)}; a ${pct(F.depreciationPct)} fall in the currency raises the import bill by ${pct(F.importRisePct)} and a ${pct(F.appreciationPct)} rise lowers it by ${pct(F.importFallPct)}.`;
  const capY = bot + 58;
  parts.push(wrap(GRD.x0, r2(capY), caption, { size: MIN_FACE }));
  parts.splice(0, 1, open(r2(capY + wrapLines(caption, { size: MIN_FACE }).length * LEAD + 8), FRAME.w));
  parts.push(close);
  return parts.join('');
};

export const shockDiagram = {
  id: id('diagram', 'four external influences on one year'),
  title: 'One Year, Four Influences',
  description: `IAL 2.3.5 · 1a: the same year of trading under inflation of ${pct(F.inflation)}, a ${pct(F.depreciationPct)} depreciation and a ${pct(F.appreciationPct)} appreciation, drawn to scale against the ${money(F.operatingProfit)} of operating profit all three have to fit inside.`,
  checklist: [
    `The unchanged year at ${money(F.operatingProfit)} as the reference bar`,
    `Inflation of ${pct(F.inflation)} on the cost of sales leaving ${money(F.inflationProfit)}`,
    `A depreciation leaving ${money(F.depProfit)} once the export gain is netted off`,
    `An appreciation leaving ${money(F.appProfit)}, so the same movement cuts both ways`,
  ],
  scenarios: [
    { label: 'Four versions of one year', svg: shockBars() },
  ],
};

const influenceTable = () => stackSvg({
  title: 'Where each economic influence lands on a firm\'s own trading',
  headers: ['Influence', 'Lands on', 'Operating profit'],
  rows: [
    [`Inflation ${pct(F.inflation)}`, 'Cost of sales', money(F.inflationProfit)],
    [`Currency ${MINUSW}${pct(F.depreciationPct)}`, 'Imports and exports', money(F.depProfit)],
    [`Currency +${pct(F.appreciationPct)}`, 'Imports and exports', money(F.appProfit)],
    [`Rate +${qty(F.rateRise)} points`, 'Interest, below it', money(F.operatingProfit)],
    ['Orders fall a tenth', 'Revenue', money(F.rateDemandProfit)],
    [`Payroll charge +${qty(F.payrollRate1 - F.payrollRate)}`, 'Operating expenses', money(F.payrollProfit)],
    [`Public budget ${MINUSW}${pct(F.publicCut)}`, 'Revenue', money(F.publicCutProfit)],
    [`Downturn ${MINUSW}${pct(F.orderSwing)}`, 'Revenue', money(F.recessionProfit)],
  ],
  note: `A rise in the lending rate is the only influence here that leaves operating profit exactly where it was, because interest is taken off below that line. What it costs, ${money(F.interestExtra)}, appears one line further down.`,
});

export const influenceDiagram = {
  id: id('diagram', 'where each economic influence lands'),
  kind: 'table',
  title: 'Where Each Influence Lands',
  description: 'IAL 2.3.5 · 1a: each of the five economic influences set against the line of the statement it reaches and what it leaves of the operating profit.',
  scenarios: [
    { label: 'Influence by line', svg: influenceTable() },
  ],
};

/* ══ 2 · Interest rates — two channels, one profit ════════════════════════ */
/*
 * THE POINT OF THE PICTURE IS THE WIDTH OF THE TWO ARROWS' FIGURES, not the boxes. The channel
 * every answer names is drawn first and is worth ${money(F.interestExtra)}; the channel almost
 * nobody names is drawn beneath it and is worth ${money(F.demandChannel)}. Both land on the same
 * final box, whose figure is computed rather than typed.
 */
const channelsSvg = () => {
  const title = `${pts(F.rateRise)} on the lending rate: two channels, and the bigger one runs through the customers`;
  const top = 72 + titleDepth(title, { lead: 16 });
  const boxW = 118, boxH = 46, gapX = 26;
  const rowY = [top, top + 96];
  const rows = [
    [BLUE, [`The firm's own ${money(F.loan)} of debt`, `Interest ${money(F.interest)} to ${money(F.interestAfter)}`], `${MINUSW}${money(F.interestExtra)}`],
    [AMBER, ['Customers cannot borrow as cheaply', `Orders fall ${pct(F.rateDemandFall)}`], `${MINUSW}${money(F.demandChannel)}`],
  ];
  const parts = [open(0, FRAME.w), titleSvg(title)];
  rows.forEach(([colour, cells, cost], r) => {
    const y = rowY[r];
    cells.forEach((cell, c) => {
      const x = GRD.x0 + c * (boxW + gapX);
      parts.push(strokeBox(r2(x), r2(y), boxW, boxH, colour));
      wrapLines(cell, { size: MIN_FACE, maxWidth: boxW - 12 }).forEach((l, li) => {
        parts.push(t(r2(x + 6 + li * 0.01), r2(y + 18 + li * 14), l, { size: MIN_FACE, fill: INK }));
      });
      if (c === 0) parts.push(line(r2(x + boxW), r2(y + boxH / 2), r2(x + boxW + gapX), r2(y + boxH / 2), colour, 1.5));
    });
    const lastX = GRD.x0 + (cells.length - 1) * (boxW + gapX) + boxW;
    parts.push(line(r2(lastX), r2(y + boxH / 2), r2(lastX + gapX), r2(y + boxH / 2), colour, 1.5));
    parts.push(t(r2(lastX + gapX + 6 + r * 0.01), r2(y + boxH / 2 + 4), cost, { size: MIN_FACE, fill: colour, weight: 600 }));
  });
  const sumY = rowY[1] + boxH + 34;
  parts.push(line(GRD.x0, r2(sumY - 14), GRD.right, r2(sumY - 14), GRID, 1));
  const summary = `Together: operating profit ${money(F.rateDemandProfit)}, and ${money(F.rateBothProfit)} left after the new interest.`;
  const caption = `The channel with a date on it is the smaller one. A business with no borrowing at all still meets the second row.`;
  const sumLines = wrapLines(summary, { size: MIN_FACE });
  parts.push(sumLines.map((l, i) => t(r2(GRD.x0 + i * 0.01), r2(sumY + 4 + i * LEAD), l, { size: MIN_FACE, fill: INK, weight: 600 })).join(''));
  const capY = sumY + 8 + sumLines.length * LEAD;
  parts.push(wrap(GRD.x0, r2(capY), caption, { size: MIN_FACE }));
  parts.splice(0, 1, open(r2(capY + wrapLines(caption, { size: MIN_FACE }).length * LEAD + 8), FRAME.w));
  parts.push(close);
  return parts.join('');
};

export const rateDiagram = {
  id: id('diagram', 'two channels of an interest rate rise'),
  title: 'Two Channels of a Rate Rise',
  description: `IAL 2.3.5 · 1a: the two routes a ${pts(F.rateRise)} rise in the lending rate takes into a business, with the cost of each, and why the one that runs through customers is the larger.`,
  checklist: [
    `The firm's own borrowing, costing ${money(F.interestExtra)} below the operating profit line`,
    `The customers' borrowing, costing ${money(F.demandChannel)} of operating profit`,
    'Both arrows landing on the same final figure',
    `The two together leaving ${money(F.rateBothProfit)}`,
  ],
  scenarios: [
    { label: 'Two channels', svg: channelsSvg() },
  ],
};

/* ══ 3 · The business cycle — the diagram topFix-04 asks for by name ══════ */
/*
 * THE WAVE IS GENERATED, NOT DRAWN. Output is `trend(x) * (1 + amplitude * sin(...))`, the trend is
 * a straight rising line, and the four phase labels are placed at the sample points where the
 * derivative and the gap to trend say each phase is — so a label cannot be in the wrong place and
 * the picture cannot contradict the four-phase sequence the extras chain teaches.
 */
const CYC = { x0: 42, x1: 412, yTop: 84, yBot: 250, amp: 0.13, periods: 2 };

const cycleSvg = () => {
  const title = 'The business cycle: output swinging around a rising long-run path';
  const top = CYC.yTop + titleDepth(title);
  const bot = CYC.yBot + titleDepth(title);
  const n = 160;
  const trendAt = (u) => 0.30 + 0.40 * u;                       // 0..1 of the plot height
  const waveAt = (u) => trendAt(u) * (1 + CYC.amp * Math.sin(2 * Math.PI * CYC.periods * u - Math.PI / 2));
  const px = (u) => r2(CYC.x0 + u * (CYC.x1 - CYC.x0));
  const py = (v) => r2(bot - v * (bot - top));
  const pts2 = [];
  for (let i = 0; i <= n; i += 1) { const u = i / n; pts2.push(`${px(u)},${py(waveAt(u))}`); }
  const parts = [open(0, FRAME.w), titleSvg(title)];
  /* axes */
  parts.push(line(CYC.x0, r2(top - 10), CYC.x0, r2(bot), AXIS, 1.5));
  parts.push(line(CYC.x0, r2(bot), r2(CYC.x1 + 8), r2(bot), AXIS, 1.5));
  parts.push(t(r2(CYC.x0 - 8), r2(top - 16), 'Output', { size: MIN_FACE, fill: AXIS, weight: 600 }));
  parts.push(t(r2(CYC.x1 + 8), r2(bot + 16), 'Time', { size: MIN_FACE, fill: AXIS, anchor: 'end', weight: 600 }));
  /* the long-run path */
  parts.push(line(px(0), py(trendAt(0)), px(1), py(trendAt(1)), GRID, 1.5, ' stroke-dasharray="6 4"'));
  /*
   * THE TREND LABEL SITS AT THE LEFT, NOT AT THE RIGHT END. At the right end it collided with the
   * recovery marker, which the all-pairs collision guard found; at the left the wave is below the
   * trend for the whole first quarter of the frame, so the space above it is empty by construction.
   */
  parts.push(t(r2(px(0.03) + 4), r2(py(trendAt(0.03)) - 10), 'Long-run path', { size: MIN_FACE, fill: GRID, weight: 600 }));
  /* the wave */
  parts.push(path(`M ${pts2.join(' L ')}`, BLUE, 2.2));
  /* the four phases, placed from the wave itself */
  const phases = [
    ['Boom', 0.25, GREEN, -1],
    ['Downturn', 0.44, AMBER, 1],
    ['Slump', 0.75, RED, 1],
    ['Recovery', 0.94, PURPLE, -1],
  ];
  phases.forEach(([name, u, colour, side], i) => {
    const y = waveAt(u);
    parts.push(`<circle cx="${px(u)}" cy="${py(y)}" r="3.4" fill="${colour}"/>`);
    parts.push(t(r2(px(u) + i * 0.01), r2(py(y) + (side < 0 ? -12 : 20)), name, { size: MIN_FACE, fill: colour, anchor: 'middle', weight: 600 }));
  });
  const caption = `The path itself rises, so a slump is a fall relative to trend rather than to zero. A swing of ${pct(F.orderSwing)} in orders is ${money(F.boomProfit)} of operating profit at the top and ${money(F.recessionProfit)} at the bottom, because ${money(F.operatingExpenses)} of costs is owed at any volume.`;
  const capY = bot + 46;
  parts.push(wrap(GRD.x0, r2(capY), caption, { size: MIN_FACE }));
  parts.splice(0, 1, open(r2(capY + wrapLines(caption, { size: MIN_FACE }).length * LEAD + 8), FRAME.w));
  parts.push(close);
  return parts.join('');
};

export const cycleDiagram = {
  id: id('diagram', 'the business cycle around its long-run path'),
  title: 'The Business Cycle',
  description: 'IAL 2.3.5 · 1a: output swinging above and below a rising long-run path, with the four phases marked in the order an economy passes through them.',
  checklist: [
    'Output on the vertical axis and time on the horizontal',
    'An upward-sloping long-run path drawn through the middle of the wave',
    'The output line oscillating above and below that path',
    'Boom, downturn, slump and recovery labelled where each one occurs',
  ],
  scenarios: [
    { label: 'Four phases around a rising path', svg: cycleSvg() },
  ],
};

/* ══ 4 · Legislation — the six areas the specification names ══════════════ */

const legislationTable = () => stackSvg({
  title: 'The six areas of legislation, and what each one does to a business',
  headers: ['Area', 'What it requires', 'Cost here'],
  rows: [
    ['Consumer', 'Quality and description', money(F.consumerAnnual)],
    ['Employee', 'Wages, contracts, notice', money(F.employeeAnnual)],
    ['Safety', 'Assess, guard, train', money(F.hsAnnual)],
    ['Environment', 'Limits, permits, standards', money(F.envAnnual)],
    ['Competition', 'No fixing, no abuse', 'nil'],
    ['Property rights', 'Register and renew', 'nil'],
  ],
  note: `${money(F.compliance)} a year in all, ${pct(F.compliancePctRevenue)} of revenue and ${pct(F.compliancePctProfit)} of the operating profit. Against it: one serious accident costs ${money(F.accidentCost)} of lost output, ${qty(F.accidentMultiple)} times a whole year of prevention.`,
});

export const legislationDiagram = {
  id: id('diagram', 'six areas of legislation'),
  kind: 'table',
  title: 'The Six Areas of Legislation',
  description: `IAL 2.3.5 · 2a: ${LEGISLATION_AREAS.length} areas of legislation, what each requires of a business, and what compliance costs this one.`,
  scenarios: [
    { label: 'Area by requirement', svg: legislationTable() },
  ],
};

const ipTable = () => stackSvg({
  title: 'Three intellectual property rights, and what tells them apart',
  /*
   * THE CELLS ARE SHORT AND THE NAMES ARE ASSERTED AGAINST `IP_RIGHTS` BY THE RUNNER. A 440-unit
   * frame at a 10-unit face gives four columns about fifty characters in all, so the full wording
   * lives in the subsection and the table carries what tells the three rights apart.
   */
  headers: ['Right', 'Protects', 'Obtained', 'Lasts'],
  rows: [
    ['Patent', 'A new invention', 'Applied for', `${qty(F.patentYears)} years max`],
    ['Copyright', 'A created work', 'Automatic', 'Decades'],
    ['Trademark', 'A brand name', 'Registered', 'No limit'],
  ],
  note: `A trademark is the only one that need never expire. A patent runs up to ${yrs(F.patentYears)} from filing and copyright ends after decades, so a business that relies on a patent has a date in its diary.`,
});

export const ipDiagram = {
  id: id('diagram', 'three intellectual property rights'),
  kind: 'table',
  title: 'Patents, Copyright and Trademarks',
  description: 'IAL 2.3.5 · 2a: the three rights the specification brackets together, set against what each protects, how it is obtained and how long it lasts.',
  scenarios: [
    { label: 'Right by right', svg: ipTable() },
  ],
};

/* ══ 5 · The competitive environment — where the break-even moves ═════════ */
/*
 * TWO LINES, TWO CROSSINGS, AND THE CROSSINGS ARE COMPUTED. Profit is `q × contribution − fixed`
 * at each price, so the zero crossings are the break-even volumes rather than points chosen to
 * look right, and the runner re-derives both from `FIRM` after reading them out of the SVG.
 */
const WAR = { x0: 46, x1: 412, yTop: 82, yBot: 254, qMax: 28000 };

const warSvg = () => {
  const title = `Matching a cut to ${money(F.warPrice)} moves the break-even the wrong way`;
  const top = WAR.yTop + titleDepth(title);
  const bot = WAR.yBot + titleDepth(title);
  const pMax = WAR.qMax * F.contribution - F.operatingExpenses;
  const pMin = -F.operatingExpenses;
  const px = (q) => r2(WAR.x0 + (q / WAR.qMax) * (WAR.x1 - WAR.x0));
  const py = (p) => r2(bot - ((p - pMin) / (pMax - pMin)) * (bot - top));
  const zeroY = py(0);
  const parts = [open(0, FRAME.w), titleSvg(title)];
  parts.push(line(WAR.x0, r2(top - 8), WAR.x0, r2(bot), AXIS, 1.5));
  parts.push(line(WAR.x0, zeroY, r2(WAR.x1 + 8), zeroY, AXIS, 1.5));
  parts.push(t(r2(WAR.x0 - 10), r2(top - 14), 'Operating profit', { size: MIN_FACE, fill: AXIS, weight: 600 }));
  parts.push(t(r2(WAR.x1 + 8), r2(bot + 16), `${F.unit}s sold`, { size: MIN_FACE, fill: AXIS, anchor: 'end', weight: 600 }));
  const lineFor = (contribution, colour) => line(px(0), py(-F.operatingExpenses), px(WAR.qMax), py(WAR.qMax * contribution - F.operatingExpenses), colour, 2.2);
  parts.push(lineFor(F.contribution, GREEN));
  parts.push(lineFor(F.warContribution, RED));
  /*
   * THE LINE LABELS SIT AT THE LINE ENDS AND THE CROSSING LABELS ARE BARE VOLUMES. The first
   * version wrote "$170: break even at 24,000" centred on the crossing; at a 12-unit face that is
   * 218 units wide on a 440-unit frame and it ran off the canvas, which is what the extent check
   * is for. The prices are on the lines instead and the arithmetic is in the caption.
   */
  parts.push(t(r2(WAR.x1 - 4), r2(py(WAR.qMax * F.contribution - F.operatingExpenses) + 12), `At ${money(F.price)}`, { size: MIN_FACE, fill: GREEN, anchor: 'end', weight: 600 }));
  parts.push(t(r2(WAR.x1 - 4.01), r2(py(WAR.qMax * F.warContribution - F.operatingExpenses) + 18), `At ${money(F.warPrice)}`, { size: MIN_FACE, fill: RED, anchor: 'end', weight: 600 }));
  /* the two crossings, computed */
  [[F.breakEvenUnits, GREEN], [F.breakEvenUnitsWar, RED]].forEach(([q, colour], i) => {
    parts.push(`<circle cx="${px(q)}" cy="${zeroY}" r="3.4" fill="${colour}"/>`);
    parts.push(t(r2(px(q) + i * 0.01), r2(zeroY + 18), qty(q), { size: MIN_FACE, fill: colour, anchor: 'middle', weight: 600 }));
  });
  /* today's volume, marked once */
  parts.push(line(px(F.units0), r2(top - 4), px(F.units0), r2(bot), GRID, 1, ' stroke-dasharray="4 4"'));
  parts.push(t(r2(px(F.units0) - 6), r2(top + 8), `Sells ${qty(F.units0)} today`, { size: MIN_FACE, fill: GRID, anchor: 'end', weight: 600 }));
  parts.push(t(r2(px(F.units0) + 6), py(F.operatingProfit), money(F.operatingProfit), { size: MIN_FACE, fill: GREEN, weight: 600 }));
  const caption = `No cost falls when a price is cut, so each sale leaves ${money(F.warContribution)} instead of ${money(F.contribution)}: at today's volume matching gives ${money(F.matchProfit)}, and break-even needs ${pct(F.warVolumeNeeded)} more sales than the firm makes. Holding the price and losing ${pct(F.holdVolumeFall)} of volume leaves ${money(F.holdProfit)}.`;
  const capY = bot + 50;
  parts.push(wrap(GRD.x0, r2(capY), caption, { size: MIN_FACE }));
  parts.splice(0, 1, open(r2(capY + wrapLines(caption, { size: MIN_FACE }).length * LEAD + 8), FRAME.w));
  parts.push(close);
  return parts.join('');
};

export const warDiagram = {
  id: id('diagram', 'break-even before and after a price cut'),
  title: 'What Matching a Price Cut Costs',
  description: `IAL 2.3.5 · 3a: operating profit against volume at ${money(F.price)} and at ${money(F.warPrice)}, with the break-even moving from ${qty(F.breakEvenUnits)} to ${qty(F.breakEvenUnitsWar)} ${F.unit}s.`,
  checklist: [
    `Two profit lines starting from the same ${money(F.operatingExpenses)} of fixed costs`,
    `The steeper line crossing zero at ${qty(F.breakEvenUnits)} ${F.unit}s`,
    `The flatter line crossing zero at ${qty(F.breakEvenUnitsWar)} ${F.unit}s`,
    `Today's volume marked, giving ${money(F.operatingProfit)} at the old price and ${money(F.matchProfit)} at the new one`,
  ],
  scenarios: [
    { label: 'Break-even at two prices', svg: warSvg() },
  ],
};

const smallFirmTable = () => stackSvg({
  title: 'Ways a small business competes without matching a price',
  headers: ['Way', 'Why size cannot copy it', 'Cost'],
  rows: [
    ['Specialise', 'Segment too small', 'Narrow skills'],
    ['Be quick', 'A big firm uses a process', 'Short runs'],
    ['Be flexible', 'Scale needs one spec', 'Higher unit cost'],
    ['Stay close', 'The owner can decide', 'The owner\'s time'],
    ['Reputation', 'Not bought in bulk', 'Years to build'],
    ['Buy together', 'A group narrows the gap', 'Some independence'],
  ],
  note: `Bespoke work at ${money(F.nichePrice)} against a list price of ${money(F.price)}: ${qty(F.nicheUnits)} ${F.unit}s leave ${money(F.nicheGain)} more than the same ${F.unit}s sold as standard stock. Matching the importer's price instead gives ${money(F.matchProfit)}.`,
});

export const smallFirmDiagram = {
  id: id('diagram', 'ways a small business competes'),
  kind: 'table',
  title: 'How a Small Business Competes',
  description: 'IAL 2.3.5 · 3b: the ways a small firm can compete in a competitive market, each set against the reason a larger rival cannot simply copy it and what it costs.',
  scenarios: [
    { label: 'Way by trade-off', svg: smallFirmTable() },
  ],
};

/** One diagram pinned to each chapter, in chapter order. */
export const DIAGRAMS = [shockDiagram, rateDiagram, cycleDiagram, legislationDiagram, warDiagram];
/** Three more declared tables, shipped and reachable in the Diagrams tab but not pinned. */
export const EXTRA_DIAGRAMS = [influenceDiagram, ipDiagram, smallFirmDiagram];
export const ALL_DIAGRAMS = [...DIAGRAMS, ...EXTRA_DIAGRAMS];
