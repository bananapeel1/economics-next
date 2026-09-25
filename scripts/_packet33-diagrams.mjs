/**
 * PACKET 33 — globalisation: SIX diagrams, one pinned to each chapter, from ZERO.
 *
 * `structure-02` is the finding: *"Zero diagrams: the integration ladder (FTA/CU/single market) and
 * the inside-vs-outside-the-bloc effect are natural simple visuals; InlineDiagram slot renders
 * nothing."* Half of that is built and half is refused. The integration ladder is Economics 4.3.2 · 4
 * (`econ_spec.txt:1659-1664`) and goes to packet 39, `trade-global-economy`, with the rest of it; the inside-vs-
 * outside comparison is IAL Business **5b**, *"The impact on businesses of trading blocs"*, and is
 * the sixth diagram below. A finding can be right about the SHAPE of what is missing and wrong about
 * the CONTENT, and the two halves have to be judged apart.
 *
 * NOTHING IS DRAWN BY HAND. Every bar length and every cell comes from `LUMINA` or `ECONOMIES` in
 * `_packet33-util.mjs`, so a student who divides the numbers in the caption gets the bar in the
 * picture. Packet 29's lesson in the other direction: three of its five live diagrams were wrong
 * because the curve was drawn and the point beside it was typed in.
 *
 * `Construct (4)` — "requires students to draw an accurately labelled diagram" — is one of Business's
 * eight command words. Nothing in 4.3.1 asks for a drawn curve, so the drawn figure here is a bar
 * comparison, which is QS3's "standard graphical forms", and chapter 5 carries the checklist.
 *
 * ── THE BARS CANNOT COLLIDE WITH THEIR OWN VALUES, BY CONSTRUCTION ──
 *
 * Packet 22 found two labels printed on top of each other and packet 29 found a curve drawn through
 * its own label; both were fixed by measuring afterwards. Here the layout removes the possibility:
 * the label column ends at 150, the bar TRACK is 156-330 and can never be longer, and the value is
 * right-anchored in a column at 420. A bar cannot reach its value and a value cannot reach its
 * label, whatever the arithmetic does. `barRow` throws if a label does not fit its column — the
 * packet 30 rule that a layout which cannot be drawn correctly fails the build rather than the eye.
 *
 * FRAMES ARE 440 UNITS AND THE FLOOR IS 12 (10 for a declared table), which is packet 30's
 * measurement: a Learn Mode diagram renders **313 CSS px on a phone**, so a 10-unit face on the
 * 560-unit frame every packet before 30 used is 5.59px. All four reference tables here declare
 * `kind: 'table'` — packet 29 left its grids undeclared to dodge the DEBT and cost the student the
 * full-screen sheet, which is the one thing that makes a table readable at 390px.
 */
import {
  id, money, qty, pct, bn, mn, round2,
  ECONOMIES, LUMINA, HDI, FACTORS, BARRIERS, BLOCS, PROTECTION_REASONS,
} from './_packet33-util.mjs';

const INK = '#e8ecf5', AXIS = '#94a3b8', GRID = '#475569', MUTED = '#7a8299';
const BLUE = '#3b82f6', GREEN = '#059669', RED = '#ef4444', AMBER = '#f59e0b';

export const r2 = round2;

const open = (h = 400, w = 440) => `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',system-ui,sans-serif;background:transparent">`;
const close = '</svg>';
const t = (x, y, text, { size = 12, fill = INK, anchor = 'start', weight = 400 } = {}) =>
  `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${text}</text>`;
const line = (x1, y1, x2, y2, stroke, w = 2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${w}"/>`;
const fillBox = (x, y, w, h, fill) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="${fill}"/>`;

/* ── the frames and the floor (packet 30) ──────────────────────────────────── */
export const GRD = { w: 440, x0: 20, y0: 74, rowH: 30, right: 420, size: 12, gutter: 12 };
/** The smallest face any diagram in this section may emit, in viewBox units. */
export const MIN_FACE = 12;
export const TBL = { w: 440, x0: 20, y0: 74, rowH: 28, right: 420, size: 10, gutter: 12, note: 10 };

/*
 * Packet 24's browser-measured bound, carried unchanged through packets 25-31: at the reading column
 * four characters or more reach 0.601 em and a lone character 0.874 em, rounded up to 0.7 and 0.9.
 * It is an ESTIMATE; the independent measurement is Verify B's `getComputedTextLength()`.
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
 * Each wrapped line is emitted one hundredth of a unit further right, so a multi-line caption cannot
 * be read as a grid by `diagram.table-kind` (packet 24).
 */
const wrap = (x, y, text, { size = MIN_FACE, fill = MUTED, lead = 15, maxWidth = GRD.right - GRD.x0 } = {}) =>
  wrapLines(text, { size, maxWidth }).map((l, i) => t(r2(x + i * 0.01), r2(y + i * lead), l, { size, fill })).join('');

/* ══ THE REFERENCE TABLE (packet 30, unchanged: a bad fit THROWS) ══════════ */

export const gridColumns = ({ title, headers, rows }) => {
  const n = headers.length;
  const widths = headers.map((h, c) => Math.max(estWidth(h, TBL.size), ...rows.map((r) => estWidth(r[c] ?? '', TBL.size))));
  const needed = widths.reduce((a, b) => a + b, 0) + TBL.gutter * (n - 1);
  const avail = TBL.right - TBL.x0;
  if (needed > avail) {
    const widest = rows.concat([headers]).flatMap((r) => r.map((cell, c) => ({ cell, c }))).sort((a, b) => estWidth(b.cell, TBL.size) - estWidth(a.cell, TBL.size))[0];
    throw new Error(`grid "${title}" needs ${r2(needed)} units and the frame gives ${avail}. Shorten column ${widest.c + 1}, starting with "${widest.cell}".`);
  }
  const slack = n > 1 ? (avail - needed) / (n - 1) : 0;
  const lefts = [];
  let x = TBL.x0;
  for (let c = 0; c < n; c += 1) { lefts.push(r2(x)); x += widths[c] + TBL.gutter + slack; }
  return lefts;
};

const tblRowY = (i) => r2(TBL.y0 + (i + 1) * TBL.rowH);

export const gridSvg = ({ title, note, headers, rows, colours = [] }) => {
  const cols = gridColumns({ title, headers, rows });
  const noteOpts = { size: TBL.note, maxWidth: TBL.right - TBL.x0 };
  const titleLines = wrapLines(title, { size: 12, maxWidth: TBL.right - TBL.x0 });
  const head = headers.map((h, c) => t(cols[c], TBL.y0, h, { size: TBL.size, fill: AXIS, weight: 600 })).join('');
  const body = rows.map((cells, i) => [
    ...cells.map((cell, c) => t(cols[c], tblRowY(i), cell, { size: TBL.size, fill: c === 0 ? INK : (colours[i]?.[c] || INK), weight: c === 0 ? 600 : 400 })),
    line(TBL.x0, r2(tblRowY(i) + 8), TBL.right, r2(tblRowY(i) + 8), GRID, 1),
  ].join('')).join('');
  const noteLines = note ? wrapLines(note, noteOpts).length : 0;
  const lastRow = tblRowY(rows.length - 1);
  const h = r2(lastRow + 24 + (noteLines ? 8 + noteLines * 14 : 0));
  return [open(h, TBL.w),
    titleLines.map((l, i) => t(r2(TBL.x0 + i * 0.01), r2(28 + i * 15), l, { size: 12, weight: 600 })).join(''),
    line(TBL.x0, r2(TBL.y0 + 8), TBL.right, r2(TBL.y0 + 8), AXIS, 1.5), head, body,
    note ? wrap(TBL.x0, r2(lastRow + 32), note, noteOpts) : '',
    close].join('');
};

/* ══ THE BAR COMPARISON · QS3 "standard graphical forms" ═══════════════════ */

/*
 * THREE FIXED COLUMNS, SO NOTHING CAN OVERLAP ANYTHING. Label 20-150, bar track 156-330, value
 * right-anchored at 420. The bar is scaled to the track and CLAMPED to it, so an arithmetic change
 * cannot push a bar into the value column; the value is in a column of its own, so it cannot reach
 * a label. Packet 22 and packet 29 both fixed a collision after the fact; this one cannot occur.
 */
const BAR = { labelRight: 150, trackX: 156, trackW: 174, valueX: 420, rowH: 30, top: 74, size: 12 };

const barRow = (row, i, max, title) => {
  const { label, value, display, colour } = row;
  if (estWidth(label, BAR.size) > BAR.labelRight - GRD.x0) {
    throw new Error(`bar chart "${title}": label "${label}" needs ${r2(estWidth(label, BAR.size))} units and the column gives ${BAR.labelRight - GRD.x0}. Shorten it.`);
  }
  const y = r2(BAR.top + i * BAR.rowH);
  const w = r2(Math.max(2, Math.min(BAR.trackW, value / max * BAR.trackW)));
  return [
    t(GRD.x0, r2(y + 4), label, { size: BAR.size, weight: 600 }),
    fillBox(BAR.trackX, r2(y - 9), w, 15, colour),
    t(BAR.valueX, r2(y + 4), display, { size: BAR.size, fill: colour, weight: 600, anchor: 'end' }),
  ].join('');
};

export const barsSvg = ({ title, rows, note, max }) => {
  const top = max ?? Math.max(...rows.map((r) => r.value));
  const titleLines = wrapLines(title, { size: 12, maxWidth: GRD.right - GRD.x0 });
  const body = rows.map((row, i) => barRow(row, i, top, title)).join('');
  const lastY = BAR.top + (rows.length - 1) * BAR.rowH;
  const noteOpts = { size: 10, maxWidth: GRD.right - GRD.x0 };
  const noteLines = note ? wrapLines(note, noteOpts).length : 0;
  const h = r2(lastY + 34 + (noteLines ? noteLines * 14 : 0));
  return [open(h, GRD.w),
    titleLines.map((l, i) => t(r2(GRD.x0 + i * 0.01), r2(28 + i * 15), l, { size: 12, weight: 600 })).join(''),
    line(GRD.x0, r2(BAR.top - 22), GRD.right, r2(BAR.top - 22), AXIS, 1.5),
    body,
    note ? wrap(GRD.x0, r2(lastY + 28), note, noteOpts) : '',
    close].join('');
};

/* ══ 1 · GROWING ECONOMIES (4.3.1 · 1a, 1b, 1c, 1d) ═══════════════════════ */

const economiesView = () => gridSvg({
  title: 'Three economies, and GDP per capita is a division',
  headers: ['', 'GDP now', 'People', 'GDP per capita'],
  rows: ECONOMIES.rows.map((e) => [e.label, bn(e.gdpNow), mn(e.population), money(e.perCapitaNow)]),
  note: `1a and 1d-1 in one table. Every figure in the last column is the second divided by the third — ${bn(ECONOMIES.developed.gdpNow)} across ${mn(ECONOMIES.developed.population)} people is ${money(ECONOMIES.developed.perCapitaNow)} each. That is why GDP alone cannot tell you whether a market is rich: the developed economy here has ${qty(round2(ECONOMIES.developed.gdpNow / ECONOMIES.emerging.gdpNow))} times the emerging one's GDP and ${qty(ECONOMIES.emergingGap)} times its GDP per capita, because it also has twice the people.`,
});

const growthView = () => barsSvg({
  title: 'Growth over the period, same populations',
  rows: ECONOMIES.rows.map((e) => ({
    label: e.label, value: e.growth, display: pct(e.growth),
    colour: e.key === 'emerging' ? GREEN : e.key === 'developing' ? AMBER : BLUE,
  })),
  note: `1b, "growing economic power of countries within Asia, Africa and other parts of the world", as a percentage change: the emerging economy's GDP rose from ${bn(ECONOMIES.emerging.gdpThen)} to ${bn(ECONOMIES.emerging.gdpNow)}, which is ${pct(ECONOMIES.emerging.growth)} and ${qty(ECONOMIES.growthRatio)} times the developed economy's ${pct(ECONOMIES.developed.growth)}. And it is still behind: ${money(ECONOMIES.emerging.perCapitaNow)} a head against ${money(ECONOMIES.developed.perCapitaNow)}. Both facts are true at once, and an answer that gives only one of them is half an answer.`,
});

const indicatorsView = () => gridSvg({
  title: 'What each indicator tells a business',
  headers: ['Indicator', 'What it tells a business'],
  rows: [
    ['GDP', 'The size of the whole economy'],
    ['GDP per capita', 'Output a head, so how rich'],
    ['HDI', 'Income, schooling, life span'],
  ],
  note: `1d names exactly these. HDI combines ${HDI.combines.join(', ')} into one figure ${HDI.range}, and a business reads it because ${HDI.whyBusiness}. What each one MISSES is the other half of the answer: GDP does not say how many people share it, GDP per capita does not say how evenly, and neither says which industries are growing. The gap this table is for: the developing economy here is ${money(ECONOMIES.developing.perCapitaNow)} a head against ${money(ECONOMIES.developed.perCapitaNow)}, a factor of ${qty(ECONOMIES.perCapitaGap)}, and no single number tells a firm whether to enter it.`,
});

export const economiesDiagram = {
  id: id('diagram', 'growing economies indicators'),
  kind: 'table',
  title: 'Developed, Developing and Emerging Economies',
  description: 'IAL 4.3.1 · 1a-1d: the three kinds of economy, GDP against GDP per capita, growth as a percentage change, and what each indicator of growth does and does not tell a business.',
  scenarios: [
    { label: 'The three economies', svg: economiesView() },
    { label: 'Who is growing fastest', svg: growthView() },
    { label: 'Indicators of growth', svg: indicatorsView() },
  ],
};

/* ══ 2 · INTERNATIONAL TRADE AND BUSINESS GROWTH (4.3.1 · 2a, 2b, 2c) ═════ */

const specialisationView = () => barsSvg({
  title: `Specialising saves ${money(LUMINA.specialisationSaving)} a unit`,
  rows: [
    { label: 'Makes it all', value: LUMINA.integratedCost, display: money(LUMINA.integratedCost), colour: RED },
    { label: 'Buys module in', value: LUMINA.factoryCost, display: money(LUMINA.factoryCost), colour: GREEN },
  ],
  note: `2b is one line — "implications of increasing specialisation by countries and businesses" — and it is a subtraction. ${LUMINA.name} making every part itself costs ${money(LUMINA.integratedCost)} a unit; buying the module at ${money(LUMINA.importedModule)} and assembling for ${money(LUMINA.ownAssembly)} costs ${money(LUMINA.factoryCost)}. That is ${money(LUMINA.specialisationSaving)}, or ${pct(LUMINA.specialisationSavingPct)}. The implication students leave out is the other side of the same figure: ${pct(LUMINA.importedShare)} of what it now costs to build a unit is bought from somebody else, so anything that raises the module's price or stops it arriving raises Lumina's cost or stops its line.`,
});

const tradeView = () => gridSvg({
  title: 'The same firm is an exporter and an importer',
  headers: ['', 'What crosses the border', 'Value a unit'],
  rows: [
    ['Import', 'The module it buys in', money(LUMINA.importedModule)],
    ['Own work', 'Assembly here', money(LUMINA.ownAssembly)],
    ['Export', 'The finished unit, delivered', money(LUMINA.landed)],
  ],
  note: `2a is "exports and imports" and this is why the two are one topic rather than two. ${pct(LUMINA.importedShare)} of Lumina's factory cost is an import, so a tariff its own government puts on components raises the price of its exports. A firm that sells abroad usually buys abroad, and a student who treats exporting and importing as separate activities cannot explain that.`,
});

const fdiView = () => gridSvg({
  title: 'Foreign direct investment and business growth',
  headers: ['', 'What happens', 'Here'],
  rows: [
    ['FDI', 'A firm builds or buys abroad', money(LUMINA.fdi)],
    ['Capacity', 'What the money bought', `${qty(LUMINA.plannedExports)} a year`],
    ['Per unit', 'Investment a unit of capacity', money(LUMINA.fdiPerUnit)],
  ],
  note: `2c is "foreign direct investment (FDI) and link to business growth", and the link is the third row. FDI is investment by a firm in productive assets in another country — a plant, not a parcel of shares. Lumina's parent put ${money(LUMINA.fdi)} into a plant able to make ${qty(LUMINA.plannedExports)} units a year, which is ${money(LUMINA.fdiPerUnit)} of investment behind every unit of capacity. The growth is the capacity; the FDI is how it was paid for.`,
});

export const tradeDiagram = {
  id: id('diagram', 'trade specialisation fdi'),
  kind: 'table',
  title: 'Trade, Specialisation and FDI',
  description: 'IAL 4.3.1 · 2a-2c: one firm as exporter and importer, what specialising saves and what it costs in dependence, and FDI as the money behind capacity.',
  scenarios: [
    { label: 'What specialising saves', svg: specialisationView() },
    { label: 'Exporter and importer', svg: tradeView() },
    { label: 'FDI and growth', svg: fdiView() },
  ],
};

/* ══ 3 · WHAT DRIVES GLOBALISATION, 1 (4.3.1 · 3a-3e) ═════════════════════ */

const driversOneView = () => gridSvg({
  title: 'Five of the nine factors, and what each does to a firm',
  headers: ['Factor', 'What changed', 'For a firm'],
  rows: [
    ['Liberalisation', 'Barriers came down', 'New markets open'],
    ['The WTO', 'Members agree rules', 'A disputes route'],
    ['Politics', 'Governments opened', 'May enter, or not'],
    ['Transport', 'Shipping got cheap', `Freight ${pct(LUMINA.freightShare)}`],
    ['MNCs and FDI', 'Firms build abroad', money(LUMINA.fdi)],
  ],
  note: `3a-3e of the specification's nine. Note the fourth row is priced rather than asserted: shipping a ${money(LUMINA.factoryCost)} unit costs ${money(LUMINA.freight)}, which is ${pct(LUMINA.freightShare)} of what the unit cost to make — small enough that where a thing is assembled stops being decided by where it will be sold. An MNC is a firm that owns productive operations in more than one country, and FDI is what it spends to get them.`,
});

const wtoView = () => gridSvg({
  title: 'The role of the WTO',
  headers: ['What it is', 'What it does'],
  rows: [
    ['A membership body', 'Members agree rules for trade'],
    ['A negotiating forum', 'Members bargain barriers down'],
    ['A disputes process', 'A member can challenge a barrier'],
  ],
  note: '3a names the WTO and this section is the only place a Business student meets it, so it is defined rather than mentioned. What it is NOT: it does not set any country’s tariffs for it, and it cannot make a government open a market. It gives members a rule to point at and a process to use, which is worth a great deal to an exporter and is not the same as free trade.',
});

export const driversOneDiagram = {
  id: id('diagram', 'drivers of globalisation one'),
  kind: 'table',
  title: 'What Drives Globalisation: Trade, Politics, Transport, Firms',
  description: 'IAL 4.3.1 · 3a-3e: trade liberalisation and the WTO, political change, the falling cost of transport and communication, MNCs, and FDI flows.',
  scenarios: [
    { label: 'Five factors', svg: driversOneView() },
    { label: 'The WTO', svg: wtoView() },
  ],
};

/* ══ 4 · WHAT DRIVES GLOBALISATION, 2 (4.3.1 · 3f-3i) ═════════════════════ */

const driversTwoView = () => gridSvg({
  title: 'The other four, and the one that is the answer',
  headers: ['Factor', 'What changed', 'For a firm'],
  rows: [
    ['Migration', 'People move to work', 'Who it can hire'],
    ['Labour force', 'More workers', 'More places to make'],
    ['Structure', 'Industries shift', 'Buyers and rivals'],
    ['The effect', 'All of it at once', 'Wider, and harder'],
  ],
  note: '3f-3i. Migration is people moving for work within a country and between countries, and for a firm it is a labour supply question before it is anything else. Structural change is the shift in which industries an economy’s output and jobs come from, which is why a market that bought raw materials from you last decade may be making them itself now. The last row is 3i, and it is a requirement in its own right rather than a summary: the same forces widen the market a firm sells into and widen the field it competes against.',
});

export const driversTwoDiagram = {
  id: id('diagram', 'drivers of globalisation two'),
  kind: 'table',
  title: 'Migration, Labour and Structural Change',
  description: 'IAL 4.3.1 · 3f-3i: migration within and between economies, the growth of the global labour force, structural change, and the impact on businesses of increased globalisation.',
  scenarios: [
    { label: 'Four more factors', svg: driversTwoView() },
  ],
};

/* ══ 5 · PROTECTIONISM (4.3.1 · 4a-4e) ═══════════════════════════════════ */

/*
 * FOUR BARRIERS ON ONE UNIT AND ONE AXIS. `4d-2`, the domestic subsidy, is the row students miss,
 * and the reason is visible only in a comparison like this one: it is the single barrier that does
 * not move the exporter's own cost at all. Drawing it on the same axis as the other three is the
 * whole argument.
 */
const barriersView = () => barsSvg({
  title: `What each barrier does to one ${money(LUMINA.landed)} unit`,
  rows: [
    { label: 'No barrier', value: LUMINA.landed, display: money(LUMINA.landed), colour: GREEN },
    { label: 'Tariff 20%', value: LUMINA.landedWithTariff, display: money(LUMINA.landedWithTariff), colour: RED },
    { label: 'Certification', value: round2(LUMINA.landed + LUMINA.certificationPerUnit), display: money(round2(LUMINA.landed + LUMINA.certificationPerUnit)), colour: AMBER },
    { label: 'Rival subsidy', value: LUMINA.landed, display: money(LUMINA.landed), colour: BLUE },
  ],
  note: `4b, 4d-1 and 4d-2 on the same unit. The tariff adds ${money(LUMINA.tariffPerUnit)} — ${pct(LUMINA.tariffRate)} of ${money(LUMINA.landed)}. The certification rule costs ${money(LUMINA.certificationCost)} a year to meet, which across ${qty(LUMINA.plannedExports)} units is ${money(LUMINA.certificationPerUnit)}. THE LAST BAR IS THE SAME LENGTH AS THE FIRST, and that is the point: a subsidy to the home producer does not touch Lumina's cost. It cuts the RIVAL's price from ${money(LUMINA.rivalPrice)} to ${money(LUMINA.rivalPriceSubsidised)}, and Lumina loses the sale without anything of its own having changed.`,
});

const quotaView = () => gridSvg({
  title: 'An import quota is measured in units, not dollars',
  headers: ['', 'Units', 'At the rival’s price'],
  rows: [
    ['Planned', qty(LUMINA.plannedExports), money(round2(LUMINA.plannedExports * LUMINA.rivalPrice))],
    ['Quota cap', qty(LUMINA.quotaCap), money(round2(LUMINA.quotaCap * LUMINA.rivalPrice))],
    ['Blocked', qty(LUMINA.blockedUnits), money(LUMINA.blockedRevenue)],
  ],
  note: `4c. A tariff raises the price of every unit and lets them all in; a quota lets ${qty(LUMINA.quotaCap)} in at the ordinary price and refuses the rest. ${qty(LUMINA.blockedUnits)} units is ${pct(LUMINA.blockedShare)} of what Lumina planned to sell and ${money(LUMINA.blockedRevenue)} at the price it would have fetched. Which barrier hurts more depends on the firm: a tariff is survivable if the margin can absorb it, a quota cannot be absorbed at all once the cap is reached.`,
});

const reasonsView = () => gridSvg({
  title: 'Why a government does it',
  headers: ['Reason', 'In short'],
  rows: PROTECTION_REASONS.map((r) => [r.short, r.inShort]),
  note: '4a is "reasons for protectionism" and the specification gives no list, so these are the arguments in plain terms rather than a taxonomy to memorise. Each has a cost the same government pays: a barrier that protects a producer raises what every buyer of that good pays, including firms buying it as an input, and a country that raises barriers may find its own exporters facing new ones.',
});

export const protectionismDiagram = {
  id: id('diagram', 'protectionism four barriers'),
  kind: 'table',
  title: 'Protectionism: Four Barriers on One Unit',
  description: 'IAL 4.3.1 · 4a-4e: reasons for protectionism, and a tariff, an import quota, government legislation and a domestic subsidy priced on the same unit so the fourth one’s difference is visible.',
  /*
   * NO CHECKLIST, AND THE REASON IS A RULE RATHER THAN AN OMISSION. `diagram.table-checklist` is
   * DEBT for a DECLARED table carrying one — "what a correct diagram shows" reads as an instruction
   * to reproduce a lookup table nobody draws in an exam. Packet 30's finding is that packet 29
   * dodged the opposite DEBT by leaving its grids undeclared and cost the student the full-screen
   * sheet, which is the only thing that makes a table readable at 390px. So all six diagrams here
   * declare `kind: 'table'` and keep the sheet, and the `Construct (4)` guidance — the one place
   * this topic genuinely asks a student to draw — lives on the Construct practice item, where the
   * student meets the command word.
   */
  scenarios: [
    { label: 'Four barriers, one unit', svg: barriersView() },
    { label: 'The quota in units', svg: quotaView() },
    { label: 'Reasons for protectionism', svg: reasonsView() },
  ],
};

/* ══ 6 · TRADING BLOCS (4.3.1 · 5a, 5b) ══════════════════════════════════ */

const blocsView = () => gridSvg({
  title: 'The three the specification names',
  headers: ['Bloc', 'Who is in it', 'For a business'],
  rows: [
    ['EU', 'European members', 'Sells across them'],
    ['ASEAN', 'Southeast Asian members', 'Tariffs cut between'],
    ['NAFTA', 'Canada, Mexico, the US', 'One plant, three'],
  ],
  note: '5a names exactly these three. NAFTA is the North American Free Trade Agreement, which was replaced by a successor agreement between the same three countries in 2020; the specification names NAFTA and that is the name to use in an answer. The EU’s single market is the deepest of the three in what it removes between members, and the row that matters in an exam is the third: what changes for a firm that is inside, and for one that is not.',
});

const insideOutsideView = () => barsSvg({
  title: 'The same unit, inside the bloc and outside it',
  rows: [
    { label: 'Inside, Lumina', value: LUMINA.landed, display: money(LUMINA.landed), colour: GREEN },
    { label: 'The rival', value: LUMINA.rivalPrice, display: money(LUMINA.rivalPrice), colour: MUTED },
    { label: 'Outside, Lumina', value: LUMINA.landedWithTariff, display: money(LUMINA.landedWithTariff), colour: RED },
  ],
  note: `5b, "the impact on businesses of trading blocs", and it is a subtraction rather than an opinion. Nothing about the unit changes between the first bar and the third: same module, same assembly, same freight. Inside the bloc Lumina lands at ${money(LUMINA.landed)} against a rival at ${money(LUMINA.rivalPrice)} and is ${money(LUMINA.gapInside)} under it. Outside, the ${pct(LUMINA.tariffRate)} tariff puts it at ${money(LUMINA.landedWithTariff)}, ${money(LUMINA.gapOutside)} OVER the same rival, and it loses the market. That is what membership is worth to this firm, and it is also what a firm outside a bloc faces.`,
});

export const blocsDiagram = {
  id: id('diagram', 'trading blocs inside outside'),
  kind: 'table',
  title: 'Trading Blocs and What Membership Is Worth',
  description: 'IAL 4.3.1 · 5a-5b: the EU and its single market, ASEAN and NAFTA, and the same unit costed inside a bloc and outside it.',
  scenarios: [
    { label: 'The three blocs', svg: blocsView() },
    { label: 'Inside and outside', svg: insideOutsideView() },
  ],
};

export const DIAGRAMS = [
  economiesDiagram, tradeDiagram, driversOneDiagram,
  driversTwoDiagram, protectionismDiagram, blocsDiagram,
];
