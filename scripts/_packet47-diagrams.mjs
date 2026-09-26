/**
 * PACKET 47 — global-markets-expansion diagrams. FIVE, one pinned to each chapter by `diagramId`,
 * every figure read off `FIRM` rather than typed into the SVG.
 *
 * `structure-05` reports zero diagrams and names two candidate pictures: an entry-mode control/risk
 * ladder and Ansoff's 2×2. Neither is a 4.3.2 requirement (entry modes are not a bullet; Ansoff's
 * global use is 4.3.3 · 1d), so neither is drawn. `topFix-05` offers the alternative this packet
 * does draw — "the country-assessment factor comparison" — as the second view of chapter 2, beside
 * the five forces applied to that country (2b). The other chapters draw what their own bullets are
 * about: the life cycle extended abroad and the where/who grid (1c, 1d), delivered cost at two sites
 * (3a), the three ways firms combine (4), and one appreciation read both ways (5a).
 *
 * THE CHECK-IN SHOWS THE CHAPTER'S DIAGRAM ABOVE ONE QUIZ ITEM (`lib/checkin-placement.js:46-49`,
 * the block's first pinned item). Packet 44 shipped check-in keys printed in the caption above them,
 * so each chapter's FIRST quiz item is written against figures this module does not print, and the
 * runner re-checks it on the emitted SVG.
 *
 * Frame 400 wide, faces 15 (titles) and 12 (everything else), stacked rows 20 apart, which clears the
 * collision guard's 1.2 × 15 = 18. Bars and boxes are `<rect>`s; only axes and arrows are lines, and
 * no label sits on one. Every colour is a key of `PALETTE` in `components/learn-mode/processSvg.js`.
 */
import { id, FIRM, usd, usdm, units, fxu, rate, pct } from './_packet47-util.mjs';

const F = FIRM;

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
const CYAN = '#22d3ee';

export const estWidth = (text, size = FACE) => String(text).length * size * 0.56;

const svg = (h, body) => `<svg width="${FRAME.w}" height="${h}" viewBox="0 0 ${FRAME.w} ${h}" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',system-ui,sans-serif;background:transparent">${body}</svg>`;
const t = (x, y, str, { size = SMALL, fill = INK, anchor = 'start', weight = 400 } = {}) =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" font-weight="${weight}">${str}</text>`;
const title = (str) => t(FRAME.w / 2, 24, str, { size: FACE, anchor: 'middle', weight: 600 });
const rect = (x, y, w, h, { fill = 'none', stroke = GRID, rx = 6, sw = 1.5 } = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
const line = (x1, y1, x2, y2, { stroke = AXIS, sw = 1.5, dash = null, marker = null } = {}) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ''}${marker ? ` marker-end="url(#${marker})"` : ''}/>`;
const path = (pts, { stroke = AXIS, sw = 2.5 } = {}) =>
  `<path d="M ${pts.map(([x, y]) => `${x} ${y}`).join(' L ')}" fill="none" stroke="${stroke}" stroke-width="${sw}"/>`;
const arrowDefs = (colours) => `<defs>${colours.map(([name, c]) => `<marker id="${name}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${c}"/></marker>`).join('')}</defs>`;
/** A labelled box: a rect with up to two centred lines of text, 20 apart. */
const box = (x, y, w, h, lines, { stroke = GRID, fill = 'none', colour = INK } = {}) => {
  const cx = x + w / 2;
  const first = y + h / 2 - ((lines.length - 1) * LEAD) / 2 + 4;
  return rect(x, y, w, h, { stroke, fill }) + lines.map((s, i) => t(cx, first + i * LEAD, s, { anchor: 'middle', fill: i === 0 ? colour : MUTED, weight: i === 0 ? 600 : 400 })).join('');
};

/* ══ 1 · Conditions that prompt trade (1c, 1d) ════════════════════════════ */

const lifeCycleSvg = () => {
  const x0 = 50, x1 = 370, yTop = 50, yBase = 200;
  const home = [[50, 190], [110, 120], [170, 72], [230, 80], [290, 130], [350, 176], [370, 184]];
  const abroad = [[230, 196], [270, 170], [310, 128], [350, 92], [370, 80]];
  return svg(300, [
    title('One model, two life cycles'),
    line(x0, yTop - 12, x0, yBase),
    line(x0, yBase, x1, yBase),
    t(58, 46, 'Sales', { fill: MUTED }),
    t(x1, yBase + LEAD, 'Time', { anchor: 'end', fill: MUTED }),
    path(home, { stroke: AMBER }),
    path(abroad, { stroke: GREEN }),
    rect(58, 232, 14, 6, { fill: AMBER, stroke: AMBER, rx: 2, sw: 1 }),
    t(80, 240, 'At home: maturity, then decline'),
    rect(58, 252, 14, 6, { fill: GREEN, stroke: GREEN, rx: 2, sw: 1 }),
    t(80, 260, 'Abroad: the same model, in growth'),
    t(FRAME.w / 2, 288, 'Growth abroad offsets the decline at home', { anchor: 'middle' }),
  ].join(''));
};

const whereWhoSvg = () => {
  const cw = 124, c1 = 136, c2 = 266, r1 = 76, r2 = 152, rh = 70;
  return svg(270, [
    title('Off-shoring is where, outsourcing is who'),
    t(c1 + cw / 2, 62, 'At home', { anchor: 'middle', fill: MUTED, weight: 600 }),
    t(c2 + cw / 2, 62, 'Abroad', { anchor: 'middle', fill: MUTED, weight: 600 }),
    t(16, r1 + 39, 'The firm itself', { fill: MUTED, weight: 600 }),
    t(16, r2 + 29, 'Another firm', { fill: MUTED, weight: 600 }),
    t(16, r2 + 49, 'does the work', { fill: MUTED }),
    box(c1, r1, cw, rh, ['In-house']),
    box(c2, r1, cw, rh, ['Off-shoring'], { stroke: BLUE, colour: BLUE }),
    box(c1, r2, cw, rh, ['Outsourcing'], { stroke: PURPLE, colour: PURPLE }),
    box(c2, r2, cw, rh, ['Both at once'], { stroke: CYAN, colour: CYAN }),
    t(FRAME.w / 2, 252, 'A firm can move work abroad and still own it', { anchor: 'middle' }),
  ].join(''));
};

export const tradeDiagram = {
  id: id('diagram', 'conditions that prompt trade life cycle and where who'),
  title: 'Why Firms Sell and Produce Abroad',
  description: 'IAL 4.3.2 · 1c and 1d: a product\'s life cycle extended in a second market, and off-shoring and outsourcing told apart by where and by whom.',
  checklist: [
    'The home curve rises, peaks at maturity and falls; the curve abroad starts later and is still rising',
    'Total sales last longer because growth abroad offsets decline at home',
    'Off-shoring changes WHERE the work is done; outsourcing changes WHO does it',
    'A firm paying a foreign company to do the work has done both',
  ],
  scenarios: [
    { label: 'Extending the life cycle', svg: lifeCycleSvg() },
    { label: 'Where and who', svg: whereWhoSvg() },
  ],
};

/* ══ 2 · Assessing a country as a market (2a, 2b) ═════════════════════════ */

const fiveForcesSvg = () => {
  const w = 120, h = 56;
  const lx = 8, cx = 140, rx = 272;
  const top = 46, mid = 128, bot = 210;
  return svg(300, [
    arrowDefs([['ff', AXIS]]),
    title('Porter\'s five forces, applied to Belmar'),
    box(cx, top, w, h, ['New entrants', 'High: low duty'], { stroke: RED, colour: RED }),
    box(lx, mid, w, h, ['Suppliers', 'Low: own parts'], { stroke: GREEN, colour: GREEN }),
    box(cx, mid, w, h, ['Rivalry', 'Medium: 2 brands'], { stroke: AMBER, colour: AMBER }),
    box(rx, mid, w, h, ['Buyers', 'High: 3 chains'], { stroke: RED, colour: RED }),
    box(cx, bot, w, h, ['Substitutes', 'Medium: pots'], { stroke: AMBER, colour: AMBER }),
    line(cx + w / 2, top + h + 2, cx + w / 2, mid - 4, { marker: 'ff' }),
    line(lx + w + 2, mid + h / 2, cx - 4, mid + h / 2, { marker: 'ff' }),
    line(rx - 2, mid + h / 2, cx + w + 4, mid + h / 2, { marker: 'ff' }),
    line(cx + w / 2, bot - 2, cx + w / 2, mid + h + 4, { marker: 'ff' }),
    t(FRAME.w / 2, 290, 'Growing demand, but strong forces keep margins thin', { anchor: 'middle' }),
  ].join(''));
};

const incomeSvg = () => {
  const yBase = 210, scale = 150 / 10_000;
  const bars = [
    [60, F.tarsia.income, BLUE], [120, F.tarsia10, BLUE],
    [230, F.belmar.income, GREEN], [290, F.belmar10, GREEN],
  ];
  return svg(300, [
    title('Household disposable income'),
    line(40, yBase, 370, yBase),
    ...bars.map(([x, v, c]) => rect(x, round(yBase - v * scale), 44, round(v * scale), { fill: c, stroke: c, rx: 3, sw: 1 })),
    ...bars.map(([x, v]) => t(x + 22, round(yBase - v * scale) - 8, usd(v), { anchor: 'middle' })),
    t(82, yBase + LEAD, 'Now', { anchor: 'middle', fill: MUTED }),
    t(142, yBase + LEAD, `In ${F.years} years`, { anchor: 'middle', fill: MUTED }),
    t(252, yBase + LEAD, 'Now', { anchor: 'middle', fill: MUTED }),
    t(312, yBase + LEAD, `In ${F.years} years`, { anchor: 'middle', fill: MUTED }),
    t(112, yBase + LEAD * 2, `Tarsia: +${pct(F.tarsia.growth)} a year`, { anchor: 'middle', fill: BLUE, weight: 600 }),
    t(282, yBase + LEAD * 2, `Belmar: +${pct(F.belmar.growth)} a year`, { anchor: 'middle', fill: GREEN, weight: 600 }),
    t(FRAME.w / 2, yBase + LEAD * 3 + 6, 'Richer now is not the same as growing fastest', { anchor: 'middle' }),
  ].join(''));
};
const round = (n) => Math.round(n * 10) / 10;

export const marketDiagram = {
  id: id('diagram', 'assessing a country as a market five forces income'),
  title: 'Assessing Belmar as a Market',
  description: 'IAL 4.3.2 · 2a and 2b: two markets compared on the level and growth of disposable income, and Porter\'s five forces applied to the one that is growing.',
  checklist: [
    'Each force is RATED for this market, not just named',
    'Strong buyer power and easy entry point to thin margins',
    `Tarsia is richer now; Belmar\'s income grows ${pct(F.belmar.growth)} a year against ${pct(F.tarsia.growth)}`,
    'The level of income says who can buy now; the growth says who can buy soon',
  ],
  scenarios: [
    { label: 'Five forces', svg: fiveForcesSvg() },
    { label: 'Income now and later', svg: incomeSvg() },
  ],
};

/* ══ 3 · Assessing a country as a production location (3a) ═════════════════ */

const deliveredCostSvg = () => {
  const x0 = 100, scale = 15;   // 1 dollar = 15 units: $17.40 = 261 units wide
  const rows = [
    { y: 76, label: 'Inside bloc', parts: [[F.siteIn.labour, AMBER], [F.siteIn.other, BLUE], [F.siteIn.freight, GREEN]], total: F.landedIn },
    { y: 146, label: 'Outside bloc', parts: [[F.siteOut.labour, AMBER], [F.siteOut.other, BLUE], [F.tariffOut, RED], [F.siteOut.freight, GREEN]], total: F.landedOut },
  ];
  const segs = rows.flatMap((r) => { let x = x0; return r.parts.map(([v, c]) => { const s = rect(round(x), r.y, round(v * scale), 30, { fill: c, stroke: c, rx: 0, sw: 1 }); x += v * scale; return s; }); });
  const legend = [['Labour', AMBER, 58, 214], ['Other costs', BLUE, 200, 214], ['Tariff', RED, 58, 234], ['Freight', GREEN, 200, 234]];
  return svg(280, [
    title('Delivered cost of one cooker'),
    ...rows.map((r) => t(12, r.y + 20, r.label, { fill: MUTED, weight: 600 })),
    ...segs,
    ...rows.map((r) => t(round(x0 + r.total * scale), r.y - 8, `${usd(r.total)} delivered`, { anchor: 'end', weight: 600 })),
    ...legend.map(([s, c, x, y]) => rect(x, y - 8, 14, 8, { fill: c, stroke: c, rx: 2, sw: 1 }) + t(x + 22, y, s)),
    t(FRAME.w / 2, 266, 'The lower wage loses once the tariff is added', { anchor: 'middle' }),
  ].join(''));
};

export const locationDiagram = {
  id: id('diagram', 'assessing a production location delivered cost'),
  title: 'Delivered Cost at Two Sites',
  description: 'IAL 4.3.2 · 3a: costs of production and location in a trade bloc — the site with the lower wage delivers the dearer product once the tariff is paid.',
  checklist: [
    `Inside the bloc: ${usd(F.siteIn.labour)} + ${usd(F.siteIn.other)} + ${usd(F.siteIn.freight)} = ${usd(F.landedIn)}`,
    `Outside it: ${usd(F.siteOut.labour)} + ${usd(F.siteOut.other)} + a ${usd(F.tariffOut)} tariff + ${usd(F.siteOut.freight)} = ${usd(F.landedOut)}`,
    'Compare delivered cost per unit, never the wage alone',
  ],
  scenarios: [
    { label: 'Delivered cost', svg: deliveredCostSvg() },
  ],
};

/* ══ 4 · Mergers, takeovers and joint ventures (4) ═════════════════════════ */

const combineSvg = () => {
  const rows = [
    { y: 50, name: 'Merger', a: 'Firm one', b: 'Firm two', out: 'One firm', c: BLUE },
    { y: 140, name: 'Takeover', a: 'Buyer', b: 'Target', out: 'Buyer controls', c: AMBER },
    { y: 230, name: 'Joint venture', a: 'Partner one', b: 'Partner two', out: 'New shared firm', c: GREEN },
  ];
  return svg(330, [
    arrowDefs([['cb', AXIS]]),
    title('Three ways to combine across borders'),
    ...rows.map((r) => [
      t(16, r.y, r.name, { fill: r.c, weight: 600 }),
      box(16, r.y + 10, 104, 44, [r.a]),
      box(132, r.y + 10, 104, 44, [r.b]),
      line(242, r.y + 32, 262, r.y + 32, { marker: 'cb' }),
      box(268, r.y + 10, 124, 44, [r.out], { stroke: r.c, colour: r.c }),
    ].join('')),
    t(FRAME.w / 2, 318, 'Only a joint venture leaves both parents trading', { anchor: 'middle' }),
  ].join(''));
};

export const combineDiagram = {
  id: id('diagram', 'mergers takeovers joint ventures structures'),
  title: 'Mergers, Takeovers and Joint Ventures',
  description: 'IAL 4.3.2 · 4: what exists after each of the three ways firms combine across borders.',
  checklist: [
    'A merger combines two firms into one',
    'A takeover puts the target under the buyer\'s control',
    'A joint venture creates a new business; both parents carry on',
  ],
  scenarios: [
    { label: 'Three structures', svg: combineSvg() },
  ],
};

/* ══ 5 · Exchange rate movements (5a) ════════════════════════════════════ */

const appreciationSvg = () => {
  const yBase = 200, s1 = 0.5, s2 = 8;
  const bars = [
    [50, F.foreignPrice0, s1, BLUE, fxu(F.foreignPrice0)],
    [110, F.foreignPrice1, s1, RED, fxu(F.foreignPrice1)],
    [230, F.componentCost0, s2, BLUE, usd(F.componentCost0)],
    [290, F.componentCost1, s2, GREEN, usd(F.componentCost1)],
  ];
  return svg(310, [
    title(`The dollar rises ${pct(F.appreciationPct)}`),
    t(FRAME.w / 2, 48, `${rate(F.e0)} becomes ${rate(F.e1)}`, { anchor: 'middle', fill: MUTED }),
    line(40, yBase, 370, yBase),
    ...bars.map(([x, v, s, c]) => rect(x, round(yBase - v * s), 50, round(v * s), { fill: c, stroke: c, rx: 3, sw: 1 })),
    ...bars.map(([x, v, s, , lab]) => t(x + 25, round(yBase - v * s) - 8, lab, { anchor: 'middle' })),
    t(75, yBase + LEAD, 'Before', { anchor: 'middle', fill: MUTED }),
    t(135, yBase + LEAD, 'After', { anchor: 'middle', fill: MUTED }),
    t(255, yBase + LEAD, 'Before', { anchor: 'middle', fill: MUTED }),
    t(315, yBase + LEAD, 'After', { anchor: 'middle', fill: MUTED }),
    t(105, yBase + LEAD * 2, `A ${usd(F.price)} cooker abroad`, { anchor: 'middle', fill: RED, weight: 600 }),
    t(285, yBase + LEAD * 2, 'An imported part', { anchor: 'middle', fill: GREEN, weight: 600 }),
    t(105, yBase + LEAD * 3, 'dearer for buyers', { anchor: 'middle', fill: MUTED }),
    t(285, yBase + LEAD * 3, 'cheaper for the firm', { anchor: 'middle', fill: MUTED }),
    t(FRAME.w / 2, yBase + LEAD * 4 + 8, 'One movement: exports lose, imports gain', { anchor: 'middle' }),
  ].join(''));
};

export const exchangeDiagram = {
  id: id('diagram', 'appreciation exporter importer'),
  title: 'One Appreciation, Two Effects',
  description: 'IAL 4.3.2 · 5a: the impact on a business of a movement in the exchange rate, on the price of its exports and the cost of its imports.',
  checklist: [
    `At an unchanged dollar price, the cooker rises from ${fxu(F.foreignPrice0)} to ${fxu(F.foreignPrice1)} abroad`,
    `A part invoiced at ${fxu(F.componentUnits)} falls from ${usd(F.componentCost0)} to ${usd(F.componentCost1)}`,
    'Net the export effect against the import effect before judging',
  ],
  scenarios: [
    { label: 'Exports and imports', svg: appreciationSvg() },
  ],
};

/* ── the array order IS the chapter order, and the runner derives pins from it ── */
export const DIAGRAMS = [tradeDiagram, marketDiagram, locationDiagram, combineDiagram, exchangeDiagram];
export const ALL_DIAGRAMS = DIAGRAMS;
