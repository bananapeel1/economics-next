/**
 * PACKET 16 — meeting-customer-needs: five diagrams, each pinned to a chapter by id.
 *
 * The March section had NONE (structure-02), which is why market mapping — the canonical diagram of
 * this topic, and a Construct question in its own right — was taught in prose only.
 *
 * Conventions from the live census: a 500-unit-wide viewBox, labels at 9-13 units (the phone sheet
 * draws at 220vw, so 9 units is 15px at 390px), palette colours that components/learn-mode/processSvg.js
 * remaps onto theme tokens, strokes >= 2, and text placed from the geometry of the line it names.
 *
 * Where a diagram asserts a quantity, it is GENERATED from that quantity and the runner re-derives it
 * from the emitted SVG (packet 15's rule, after accuracy-01). Three do: the market bars are drawn from
 * $32m and $40m, the share block from 15% of the $40m bar, the value-added bar from $0.45 and $1.20,
 * and every point on the market map from its brand's own price and juice content.
 */
import { id, MARKET_LAST, MARKET_NOW, ZURI_SALES, INPUT_COST, PRICE, valueAdded, sharePct, growthPct, BRANDS, GAP } from './_packet16-util.mjs';

const INK = '#e8ecf5', AXIS = '#94a3b8', GRID = '#475569', MUTED = '#7a8299';
const BLUE = '#3b82f6', GREEN = '#059669', RED = '#ef4444', AMBER = '#f59e0b', PURPLE = '#8b5cf6';
const open = (h = 330) => `<svg width="500" height="${h}" viewBox="0 0 500 ${h}" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',system-ui,sans-serif;background:transparent"><defs><marker id="arr" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="${AXIS}"/></marker><marker id="arrAmber" markerWidth="9" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="${AMBER}"/></marker></defs>`;
const close = '</svg>';
const t = (x, y, text, { size = 10, fill = INK, anchor = 'start', weight = 400, rotate = null } = {}) =>
  `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}"${rotate ? ` transform="rotate(${rotate},${x},${y})"` : ''}>${text}</text>`;
const line = (x1, y1, x2, y2, stroke, w = 2, extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${w}"${extra}/>`;
const rect = (x, y, w, h, fill, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"${extra}/>`;
const box = (x, y, w, h, stroke, fill = 'none', rx = 8) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
const dot = (x, y, fill, r = 5) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;
const dash = ' stroke-dasharray="6,4"';
const r2 = (n) => Math.round(n * 100) / 100;
// One money format for the whole section, so $108,000 is never $108000 on one surface and
// $108,000 on another (packet 16's Layer 6 caught exactly that).
const money = (n) => (Number.isInteger(n) ? `$${n.toLocaleString('en-GB')}` : `$${n.toFixed(2)}`);

/* ── 1 · Market size, share and growth ─────────────────────────────────────── */
/*
 * Two bars whose heights are drawn from MARKET_LAST and MARKET_NOW on one linear scale, so the growth
 * a student sees is the growth the body calculates, and a shaded block inside the second bar drawn
 * from ZURI_SALES on the same scale, so the share is the share. The runner re-derives all three.
 */
export const BAR = { x0: 120, y0: 250, top: 60, w: 86, gap: 96, max: 48 };   // $48m tops the scale
const barH = (v) => r2(((BAR.y0 - BAR.top) * v) / BAR.max);
const barY = (v) => r2(BAR.y0 - barH(v));

const sizeShareSvg = () => {
  const xL = BAR.x0, xN = BAR.x0 + BAR.w + BAR.gap;
  const hL = barH(MARKET_LAST), hN = barH(MARKET_NOW), hZ = barH(ZURI_SALES);
  return [open(330),
    line(70, BAR.y0, 460, BAR.y0, AXIS, 2),
    line(70, BAR.y0, 70, 45, AXIS, 2, ' marker-end="url(#arr)"'),
    t(64, 150, 'Market value ($ million)', { size: 10, fill: AXIS, anchor: 'middle', rotate: -90 }),
    rect(xL, barY(MARKET_LAST), BAR.w, hL, GRID),
    t(xL + BAR.w / 2, barY(MARKET_LAST) - 8, `${money(MARKET_LAST)}m`, { size: 12, anchor: 'middle', weight: 600 }),
    t(xL + BAR.w / 2, BAR.y0 + 18, 'Last year', { size: 11, fill: AXIS, anchor: 'middle' }),
    rect(xN, barY(MARKET_NOW), BAR.w, hN, GRID),
    rect(xN, r2(BAR.y0 - hZ), BAR.w, hZ, BLUE),
    t(xN + BAR.w / 2, barY(MARKET_NOW) - 8, `${money(MARKET_NOW)}m`, { size: 12, anchor: 'middle', weight: 600 }),
    t(xN + BAR.w / 2, BAR.y0 + 18, 'This year', { size: 11, fill: AXIS, anchor: 'middle' }),
    t(xN + BAR.w + 12, r2(BAR.y0 - hZ / 2 + 4), `Zuri ${money(ZURI_SALES)}m`, { size: 11, fill: BLUE, weight: 600 }),
    line(xL + BAR.w + 8, barY(MARKET_LAST), xN - 8, barY(MARKET_LAST), AMBER, 2, dash),
    line(xN - 40, barY(MARKET_LAST), xN - 40, barY(MARKET_NOW), AMBER, 2, ' marker-end="url(#arrAmber)"'),
    t(xN - 46, r2((barY(MARKET_LAST) + barY(MARKET_NOW)) / 2), `growth ${growthPct()}%`, { size: 11, fill: AMBER, anchor: 'end', weight: 600 }),
    t(70, 286, `Market growth = (${MARKET_NOW} − ${MARKET_LAST}) ÷ ${MARKET_LAST} × 100 = ${growthPct()}%`, { size: 11, fill: MUTED }),
    t(70, 304, `Market share = ${ZURI_SALES} ÷ ${MARKET_NOW} × 100 = ${sharePct()}%`, { size: 11, fill: MUTED }),
    t(70, 322, 'Share is measured against the market of the SAME year', { size: 10, fill: AXIS }),
    close].join('');
};

/* ── 2 · The research grid ─────────────────────────────────────────────────── */
const gridSvg = () => {
  const x0 = 130, y0 = 70, w = 160, h = 82;
  const cell = (cx, cy, title, colour, items) => [
    box(cx, cy, w, h, colour, 'none', 10),
    t(cx + 10, cy + 22, title, { size: 11, fill: colour, weight: 700 }),
    ...items.map((s, i) => t(cx + 10, cy + 40 + i * 15, s, { size: 10, fill: INK })),
  ].join('');
  return [open(330),
    t(x0 + w / 2, 52, 'QUANTITATIVE — it measures', { size: 11, fill: AXIS, anchor: 'middle', weight: 600 }),
    t(x0 + w + 20 + w / 2, 52, 'QUALITATIVE — it explains', { size: 11, fill: AXIS, anchor: 'middle', weight: 600 }),
    t(120, y0 + h / 2, 'PRIMARY', { size: 11, fill: AXIS, anchor: 'end', weight: 600 }),
    t(120, y0 + h / 2 + 14, 'we collected it', { size: 9, fill: MUTED, anchor: 'end' }),
    t(120, y0 + h + 30 + h / 2, 'SECONDARY', { size: 11, fill: AXIS, anchor: 'end', weight: 600 }),
    t(120, y0 + h + 30 + h / 2 + 14, 'someone else did', { size: 9, fill: MUTED, anchor: 'end' }),
    cell(x0, y0, 'Primary + quantitative', BLUE, ['Our own till data', 'A survey we ran']),
    cell(x0 + w + 20, y0, 'Primary + qualitative', GREEN, ['A focus group we ran', 'Our own interviews']),
    cell(x0, y0 + h + 30, 'Secondary + quantitative', PURPLE, ['A published report', 'National statistics']),
    cell(x0 + w + 20, y0 + h + 30, 'Secondary + qualitative', AMBER, ['A magazine review', 'Comments on a rival\'s site']),
    t(x0, 300, 'Who collected it decides the row. What kind of data it is decides the column.', { size: 10, fill: MUTED }),
    t(x0, 316, 'The two questions are independent: read both out of the stem.', { size: 10, fill: MUTED }),
    close].join('');
};

/* ── 3 · The three sampling methods ────────────────────────────────────────── */
/*
 * Three panels over the SAME population, so the discriminator quiz-01 said was missing from the stem
 * is the thing the picture is about: random selects from the whole list, stratified selects AT RANDOM
 * inside each subgroup, quota fills a target with whoever is to hand.
 */
const samplingSvg = () => {
  const px = [40, 190, 340], py = 74, pw = 128, ph = 150;
  const people = (x0, y0, picked) => {
    const out = [];
    for (let i = 0; i < 24; i += 1) {
      const cx = x0 + 16 + (i % 6) * 19, cy = y0 + 22 + Math.floor(i / 6) * 22;
      out.push(dot(cx, cy, picked.includes(i) ? AMBER : GRID, picked.includes(i) ? 5.5 : 4));
    }
    return out.join('');
  };
  const panel = (i, title, subtitle, picked, note) => [
    box(px[i], py, pw, ph, AXIS, 'none', 10),
    t(px[i] + pw / 2, py - 20, title, { size: 12, anchor: 'middle', weight: 700, fill: AMBER }),
    t(px[i] + pw / 2, py - 7, subtitle, { size: 9.5, anchor: 'middle', fill: MUTED }),
    people(px[i], py, picked),
    t(px[i] + pw / 2, py + ph + 18, note, { size: 10, anchor: 'middle', fill: INK }),
  ].join('');
  // The dashed lines fall BETWEEN the rows of dots, so one row is one subgroup and the proportions
  // a student counts are the proportions the method claims. The rows are at py+22, +44, +66, +88.
  const band = (x0) => [0, 1, 2].map((r) => line(x0 + 4, py + 33 + r * 22, x0 + pw - 4, py + 33 + r * 22, GRID, 1, dash)).join('');
  const strata = band(px[1]);
  const quotaStrata = band(px[2]);
  return [open(330),
    t(250, 34, 'The same population of 24, sampled three ways', { size: 12, anchor: 'middle', weight: 700 }),
    panel(0, 'Random', 'no subgroups', [2, 7, 11, 19], 'Equal chance for'),
    // One pick from each of the four equal subgroups in both panels — proportionate either way.
    // What differs is WHERE the pick falls: scattered inside the row for stratified, always the
    // first person to hand for quota.
    panel(1, 'Stratified', 'subgroups, random inside', [2, 9, 13, 20], 'Random selection'),
    panel(2, 'Quota', 'subgroups, whoever is there', [0, 6, 12, 18], 'Targets filled by'),
    strata, quotaStrata,
    t(px[0] + pw / 2, py + ph + 32, 'every member', { size: 10, anchor: 'middle', fill: INK }),
    t(px[1] + pw / 2, py + ph + 32, 'WITHIN each subgroup', { size: 10, anchor: 'middle', fill: GREEN, weight: 600 }),
    t(px[2] + pw / 2, py + ph + 32, 'WHOEVER is available', { size: 10, anchor: 'middle', fill: RED, weight: 600 }),
    t(40, 300, 'Stratified and quota both use subgroups and both aim at proportionate numbers.', { size: 10, fill: MUTED }),
    t(40, 316, 'The discriminator is what happens inside the subgroup — and that is what an exam item turns on.', { size: 10, fill: MUTED }),
    close].join('');
};

/* ── 4 · The market map ────────────────────────────────────────────────────── */
/*
 * Every point is placed by MX/MY from its brand's own price and juice content, so the map IS the data
 * the body works and the practice question asks a student to construct. The runner re-derives each
 * coordinate from BRANDS and fails if the emitted SVG disagrees.
 */
export const MAP = { x0: 90, y0: 265, xMax: 455, yTop: 55, pMin: 0.5, pMax: 2.1, jMin: 0, jMax: 100 };
export const MX = (price) => r2(MAP.x0 + ((price - MAP.pMin) / (MAP.pMax - MAP.pMin)) * (MAP.xMax - MAP.x0));
export const MY = (juice) => r2(MAP.y0 - ((juice - MAP.jMin) / (MAP.jMax - MAP.jMin)) * (MAP.y0 - MAP.yTop));

const mapAxes = () => [
  line(MAP.x0, MAP.y0, MAP.xMax + 15, MAP.y0, AXIS, 2, ' marker-end="url(#arr)"'),
  line(MAP.x0, MAP.y0, MAP.x0, MAP.yTop - 12, AXIS, 2, ' marker-end="url(#arr)"'),
  t(r2((MAP.x0 + MAP.xMax) / 2), MAP.y0 + 30, 'Price →  low to high', { size: 11, fill: AXIS, anchor: 'middle' }),
  t(MAP.x0 - 18, r2((MAP.y0 + MAP.yTop) / 2), 'Juice content →  low to high', { size: 11, fill: AXIS, anchor: 'middle', rotate: -90 }),
  t(MAP.x0, MAP.y0 + 16, money(MAP.pMin), { size: 9, fill: MUTED, anchor: 'middle' }),
  t(MAP.xMax, MAP.y0 + 16, money(MAP.pMax), { size: 9, fill: MUTED, anchor: 'middle' }),
  t(MAP.x0 - 6, MAP.y0 + 4, '0%', { size: 9, fill: MUTED, anchor: 'end' }),
  t(MAP.x0 - 6, MAP.yTop + 4, '100%', { size: 9, fill: MUTED, anchor: 'end' }),
].join('');

const brandDots = (dim = false) => BRANDS.map((b) => {
  const x = MX(b.price), y = MY(b.juice), c = b.name === 'Zuri' ? BLUE : (dim ? GRID : AXIS);
  return dot(x, y, c) + t(x, y - 12, b.name, { size: 11, anchor: 'middle', weight: b.name === 'Zuri' ? 700 : 500, fill: c });
}).join('');

const mapPlotSvg = () => [open(330), mapAxes(), brandDots(),
  t(MAP.x0, 300, 'Two variables customers actually choose by, and every competitor plotted on them.', { size: 10, fill: MUTED }),
  t(MAP.x0, 316, 'Zuri sits in the middle of both: a mid-price bottle at mid juice content.', { size: 10, fill: MUTED }),
  close].join('');

const mapGapSvg = () => {
  const gx = MX(GAP.price), gy = MY(GAP.juice);
  return [open(330), mapAxes(), brandDots(true),
    `<circle cx="${gx}" cy="${gy}" r="26" fill="none" stroke="${AMBER}" stroke-width="2"${dash}/>`,
    t(gx, gy + 4, 'GAP', { size: 11, anchor: 'middle', weight: 700, fill: AMBER }),
    t(gx + 32, gy - 6, `about ${GAP.juice}% juice`, { size: 10, fill: AMBER }),
    t(gx + 32, gy + 8, `at about ${money(GAP.price)}`, { size: 10, fill: AMBER }),
    t(MAP.x0, 300, 'A gap is a position no competitor occupies — high juice content at a middle price.', { size: 10, fill: MUTED }),
    t(MAP.x0, 316, 'It shows where nobody is. It does not show that anybody wants to buy there.', { size: 10, fill: MUTED }),
    close].join('');
};

const mapDemandSvg = () => {
  const gx = MX(GAP.price), gy = MY(GAP.juice);
  return [open(330), mapAxes(), brandDots(true),
    `<circle cx="${gx}" cy="${gy}" r="26" fill="none" stroke="${AMBER}" stroke-width="2"${dash}/>`,
    t(gx, gy + 4, 'GAP', { size: 11, anchor: 'middle', weight: 700, fill: AMBER }),
    box(228, 78, 250, 76, GREEN, 'none', 10),
    t(240, 98, 'Does anyone want to buy here?', { size: 11, fill: GREEN, weight: 700 }),
    t(240, 116, '600 shoppers asked · 18% would buy weekly', { size: 10, fill: INK }),
    t(240, 132, '500,000 × 0.18 = 90,000 buyers a week', { size: 10, fill: INK }),
    t(240, 148, '90,000 × $1.20 = $108,000 a week — a ceiling', { size: 10, fill: INK }),
    t(MAP.x0, 300, 'Only research turns an empty position into an opportunity.', { size: 10, fill: MUTED }),
    t(MAP.x0, 316, 'And the figure it produces is an upper estimate, because people overstate what they will buy.', { size: 10, fill: MUTED }),
    close].join('');
};

/* ── 5 · Adding value ──────────────────────────────────────────────────────── */
/*
 * One bar of length PRICE, split at INPUT_COST, so the two segments are in the ratio the arithmetic
 * gives. The runner re-derives both widths from the figures and fails if either disagrees.
 */
export const VA = { x0: 80, y: 110, w: 360, h: 54 };
export const vaWidth = (amount) => r2((VA.w * amount) / PRICE);

const addingValueSvg = () => {
  const wIn = vaWidth(INPUT_COST), wAdd = vaWidth(valueAdded());
  return [open(300),
    t(VA.x0, 58, 'One bottle of Zuri Juice, by where the money goes', { size: 12, weight: 700 }),
    rect(VA.x0, VA.y, wIn, VA.h, GRID, ' rx="4"'),
    rect(r2(VA.x0 + wIn), VA.y, wAdd, VA.h, GREEN, ' rx="4"'),
    t(r2(VA.x0 + wIn / 2), VA.y + 32, money(INPUT_COST), { size: 12, anchor: 'middle', weight: 700 }),
    t(r2(VA.x0 + wIn + wAdd / 2), VA.y + 32, money(valueAdded()), { size: 12, anchor: 'middle', weight: 700 }),
    t(r2(VA.x0 + wIn / 2), VA.y - 10, 'Bought-in materials', { size: 10, anchor: 'middle', fill: AXIS }),
    t(r2(VA.x0 + wIn + wAdd / 2), VA.y - 10, 'VALUE ADDED', { size: 10, anchor: 'middle', fill: GREEN, weight: 700 }),
    line(VA.x0, VA.y + VA.h + 14, r2(VA.x0 + VA.w), VA.y + VA.h + 14, AXIS, 2),
    t(r2(VA.x0 + VA.w / 2), VA.y + VA.h + 30, `Selling price ${money(PRICE)}`, { size: 11, anchor: 'middle', fill: AXIS }),
    t(VA.x0, 220, `Value added = ${money(PRICE)} − ${money(INPUT_COST)} = ${money(valueAdded())} per bottle`, { size: 11, fill: INK, weight: 600 }),
    t(VA.x0, 244, `That ${money(valueAdded())} is NOT profit: wages, rent, energy, distribution and marketing`, { size: 10, fill: MUTED }),
    t(VA.x0, 260, 'all come out of it first. Profit is whatever is left afterwards.', { size: 10, fill: MUTED }),
    t(VA.x0, 282, 'Added by branding, design, convenience, service and customisation.', { size: 10, fill: AXIS }),
    close].join('');
};

/* ── export ────────────────────────────────────────────────────────────────── */
const diagram = (title, description, checklist, svgOrScenarios, keptId) => ({
  id: keptId || id('diagram', title),
  title,
  description,
  checklist,
  ...(Array.isArray(svgOrScenarios) ? { scenarios: svgOrScenarios } : { svg: svgOrScenarios }),
});

export const DIAGRAMS = [
  diagram('Market Size, Share and Growth',
    `The chilled-juice market grew from ${money(MARKET_LAST)} million to ${money(MARKET_NOW)} million, which is ${growthPct()}% growth, and Zuri Juice's ${money(ZURI_SALES)} million of that is a ${sharePct()}% share. The two bars are drawn to one scale, so the growth and the share a student sees are the growth and the share the body calculates.`,
    ['Both bars drawn to the same scale, with the axis labelled in dollars', 'The change between the two years marked, with the growth percentage beside it', "The firm's own sales shown as a block inside the bar for the SAME year", 'Market growth divided by the OLD market size, not the new one', 'Market share measured against the market of the same year as the sales'],
    sizeShareSvg()),
  diagram('The Research Grid: Primary, Secondary, Quantitative, Qualitative',
    'Who collected the data decides primary or secondary; what kind of data it is decides quantitative or qualitative. The two questions are independent, which is why four combinations exist and why exam items on this topic usually offer all four as options.',
    ['Two independent dimensions drawn as rows and columns, not as one list', 'Primary defined by who collected it and why, not by the method used', 'Quantitative and qualitative defined by the kind of data, not by its origin', 'A worked example in each of the four cells', "A firm's own records shown as primary even though they sit in a database"],
    gridSvg()),
  diagram('Three Ways to Sample the Same Population',
    'Random selects from the whole population with an equal chance for everyone. Stratified divides into subgroups and then selects at random within each. Quota divides into subgroups and fills a target with whoever is available — and that last difference, inside the subgroup, is the only thing separating it from stratified.',
    ['The same population shown in all three panels, so the methods are comparable', 'Random shown selecting from the whole population, with no subgroups', 'Stratified shown with subgroups AND random selection inside each', 'Quota shown with the same subgroups but selection by availability', 'The discriminator named explicitly: what happens inside the subgroup'],
    samplingSvg()),
  diagram('The Chilled-Juice Market Map',
    `Five brands plotted on price against juice content. Tamu and Mkali sit low on both, Halo high on both, Safi at ${money(BRANDS[3].price)} for ${BRANDS[3].juice}% juice, and Zuri in the middle at ${money(BRANDS[2].price)} for ${BRANDS[2].juice}%. The gap is high juice content at a middle price — and the third view is what turns that empty position into a number, or into a decision not to go there.`,
    ['Both axes labelled with the variable AND its direction', 'Every competitor plotted and named, in the position its own figures give', 'The gap marked as a position on the map, not as a brand', 'The gap presented as a question about demand rather than as an opportunity', 'The demand estimate shown as a ceiling, with the survey it came from'],
    [
      { label: 'Plotting the competitors', svg: mapPlotSvg() },
      { label: 'Finding the gap', svg: mapGapSvg() },
      { label: 'Testing the gap for demand', svg: mapDemandSvg() },
    ]),
  diagram('Where the Money Goes on One Bottle',
    `Bought-in materials cost ${money(INPUT_COST)} and the bottle sells for ${money(PRICE)}, so value added is ${money(valueAdded())}. The bar is split in that ratio. Value added is not profit: wages, rent, energy, distribution and marketing all come out of it before anything remains.`,
    ['One bar of the selling price, split at the cost of bought-in materials', 'The two segments drawn in the ratio the figures give', 'Value added labelled as the difference, with its own figure', 'Value added distinguished from profit in words on the diagram', 'The ways of adding value named: branding, design, convenience, service, customisation'],
    addingValueSvg()),
];
