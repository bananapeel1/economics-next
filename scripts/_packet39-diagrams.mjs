/**
 * PACKET 39a — trade-global-economy: four diagrams, one per chapter this packet builds, every
 * figure sampled from `_packet39-util.mjs` rather than typed.
 *
 * ════ 400-UNIT FRAMES, 15 FOR WHAT MUST BE READ ════
 *
 * Packet 37 measured a 400-unit frame at 390×844: a 15-unit face renders 11.7 CSS px in the 313px
 * Learn Mode column and a 12-unit face renders 9.4. So every number and every axis label here is
 * 15, and only the legend, the note and the second line of a wrapped label are 12. The handoff
 * after packet 37 says to use 400 unless there is a reason not to, and there is not one.
 *
 * ════ A GRID OF FIXED SLOTS, SO A COLLISION IS UNREPRESENTABLE ════
 *
 * `accuracy-03` on packet 34 was two columns whose x-ranges overlapped, and packet 33's answer was
 * a renderer whose fixed columns make label-over-value impossible rather than detected. Same here:
 * `bars()` computes every x from the slot index, one label per slot, one value per bar, and the
 * runner re-measures the emitted text boxes anyway.
 *
 * ════ THE DIAGRAM `topFix-03` IS ABOUT ════
 *
 * The live diagram 0 shows specialisation with an ambiguous result — more of one good and less of
 * the other — which is what full specialisation on these ratios actually produces. `comparative`
 * below plots the PARTIAL specialisation from the spine: grain rises by 20 and cloth does not move,
 * so there are two bars of identical height in the middle of the chart and the gain is the only
 * thing that changed. A student cannot be asked to weigh anything, because nothing was lost.
 */
import { id, round1, MERIDA, KALTO, TRADE, SAROVA, SHARES } from './_packet39-util.mjs';

const INK = '#e8ecf5', AXIS = '#94a3b8', GRID = '#475569', MUTED = '#7a8299';
const BLUE = '#3b82f6', GREEN = '#059669', AMBER = '#f59e0b';

/** The frame, and the two faces. Nothing in this module may use a size below `FACE.small`. */
export const FRAME = { w: 400, h: 360 };
export const FACE = { read: 15, small: 12 };
export const PLOT = { x0: 40, x1: 380, top: 78, base: 250 };
export const MIN_FACE = FACE.small;

/** The same estimator the runner uses, so both agree about whether a label fits its slot. */
export const estWidth = (text, size) => String(text).length * size * (String(text).length < 4 ? 0.9 : 0.7);

const open = () => `<svg width="${FRAME.w}" height="${FRAME.h}" viewBox="0 0 ${FRAME.w} ${FRAME.h}" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',system-ui,sans-serif;background:transparent">`;
const close = '</svg>';
const t = (x, y, text, { size = FACE.read, fill = INK, anchor = 'middle', weight = 400 } = {}) =>
  `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${text}</text>`;
const line = (x1, y1, x2, y2, stroke, w = 2, extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${w}"${extra}/>`;
const rect = (x, y, w, h, fill) => `<rect x="${round1(x)}" y="${round1(y)}" width="${round1(w)}" height="${round1(h)}" rx="2" fill="${fill}"/>`;

/**
 * Wrap a label to the width of its slot. Each line after the first is emitted a hundredth of a unit
 * further right, so a wrapped label cannot be read as a grid by `diagram.table-kind` (packet 24).
 */
const wrap = (text, maxWidth, size) => {
  const out = [];
  let cur = '';
  for (const word of String(text).split(' ')) {
    const next = cur ? `${cur} ${word}` : word;
    if (cur && estWidth(next, size) > maxWidth) { out.push(cur); cur = word; } else cur = next;
  }
  if (cur) out.push(cur);
  return out;
};

/**
 * A bar chart of fixed slots. `groups` is one label per slot; `series` is one entry per bar within
 * every slot. Every x is derived from the slot index and every label is centred on its own slot, so
 * two labels can only collide if the slot count is wrong — which the runner asserts.
 */
function bars({ title, subtitle, groups, series, max, note, baseAt }) {
  const svg = [open()];
  const slotW = (PLOT.x1 - PLOT.x0) / groups.length;
  const height = PLOT.base - PLOT.top;
  const barW = Math.min(52, (slotW - 16) / series.length);
  const y = (v) => PLOT.base - (v / max) * height;

  svg.push(t(FRAME.w / 2, 30, title, { size: FACE.read, weight: 600 }));
  if (subtitle) svg.push(t(FRAME.w / 2, 50, subtitle, { size: FACE.small, fill: MUTED }));

  /* Legend, only when there is more than one bar per slot. */
  if (series.length > 1) {
    let x = PLOT.x0;
    for (const s of series) {
      svg.push(rect(x, 58, 14, 10, s.fill));
      svg.push(t(x + 19, 68, s.name, { size: FACE.small, fill: MUTED, anchor: 'start' }));
      x += 19 + estWidth(s.name, FACE.small) + 26;
    }
  }

  /*
   * THE BASE LINE CARRIES NO TEXT. A label on it sat within half a unit of the value printed above
   * the nearest bar, which the box measurement caught; the subtitle already says what the base is,
   * so the line is drawn and the words live where nothing can collide with them.
   */
  if (baseAt !== undefined) svg.push(line(PLOT.x0, y(baseAt), PLOT.x1, y(baseAt), GRID, 1, ' stroke-dasharray="4 4"'));

  svg.push(line(PLOT.x0, PLOT.base, PLOT.x1, PLOT.base, AXIS, 2));

  groups.forEach((g, gi) => {
    const centre = PLOT.x0 + slotW * (gi + 0.5);
    const span = barW * series.length + 6 * (series.length - 1);
    series.forEach((s, si) => {
      const v = s.values[gi];
      const x = centre - span / 2 + si * (barW + 6);
      svg.push(rect(x, y(v), barW, PLOT.base - y(v), s.fill));
      svg.push(t(x + barW / 2, y(v) - 7, s.format ? s.format(v) : String(v), { size: FACE.read, weight: 600 }));
    });
    wrap(g, slotW - 8, FACE.read).forEach((ln, li) => {
      svg.push(t(centre + li / 100, PLOT.base + 20 + li * 17, ln, { size: li ? FACE.small : FACE.read, fill: li ? MUTED : INK }));
    });
  });

  if (note) wrap(note, PLOT.x1 - PLOT.x0, FACE.small).forEach((ln, li) => {
    svg.push(t(PLOT.x0 + li / 100, 306 + li * 15, ln, { size: FACE.small, fill: MUTED, anchor: 'start' }));
  });

  svg.push(close);
  return svg.join('');
}

const A = MERIDA, B = KALTO, T = TRADE, S = SAROVA, H = SHARES;

/* ══ 1 · THE GAIN FROM SPECIALISING (1a, 1b) ══════════════════════════════ */

export const comparativeDiagram = {
  id: id('diagram', 'the gain from partial specialisation'),
  title: 'The Gain From Specialising',
  checklist: [
    'Output of BOTH goods, before and after — a gain is a comparison, not a single figure.',
    'Partial specialisation, not complete: the cloth bars are deliberately identical.',
    `The gain labelled on the good that moved: ${T.gain.grain} more grain.`,
    'No prices anywhere. This is a diagram about output, and the exchange rate comes later.',
  ],
  caption: `${A.name} makes ${T.meridaGrain} grain and ${T.meridaCloth} cloth, ${B.name} makes ${T.kaltoCloth} cloth. Cloth is unchanged at ${T.withTrade.cloth} and grain rises from ${T.noTrade.grain} to ${T.withTrade.grain}, so the gain needs no trade-off to justify it.`,
  svg: bars({
    title: 'Output before and after specialising',
    subtitle: `${A.name} and ${B.name} together`,
    groups: ['Grain', 'Cloth'],
    series: [
      { name: 'Without trade', fill: GRID, values: [T.noTrade.grain, T.noTrade.cloth] },
      { name: 'With trade', fill: BLUE, values: [T.withTrade.grain, T.withTrade.cloth] },
    ],
    max: 120,
    note: `Grain rises by ${T.gain.grain} and cloth does not move, so nothing was given up. Complete specialisation gives ${A.grainMax} grain and ${B.clothMax} cloth — a trade-off, not a gain.`,
  }),
};

/* ══ 2 · WHO EXPORTS, AND HOW THAT CHANGED (2a-1) ═════════════════════════ */

export const sharesDiagram = {
  id: id('diagram', 'shares of world exports'),
  title: 'Shares of World Exports',
  checklist: [
    'Shares, not values — the two bars in each pair must add to 100 with the other pair.',
    `Both directions shown: one side gains the ${H.emergingGain} points the other loses.`,
    'A time label on each series, because a share on its own says nothing about change.',
    'No claim about the level of trade; the total is not on this chart.',
  ],
  caption: `Emerging economies' share of world exports rose from ${H.emergingThen}% to ${H.emergingNow}% over ${H.years} years, so the advanced economies' share fell from ${H.advancedThen}% to ${H.advancedNow}%. The two movements are the same ${H.emergingGain} points.`,
  svg: bars({
    title: 'Share of world exports',
    subtitle: `${H.years} years apart`,
    groups: ['Emerging economies', 'Advanced economies'],
    series: [
      { name: `${H.years} years ago`, fill: GRID, values: [H.emergingThen, H.advancedThen], format: (v) => `${v}%` },
      { name: 'Now', fill: GREEN, values: [H.emergingNow, H.advancedNow], format: (v) => `${v}%` },
    ],
    max: 80,
    note: `A falling share is not a falling value: on a world total that has grown, ${H.advancedNow}% can be worth more than ${H.advancedThen}% was.`,
  }),
};

/* ══ 3 · THE TERMS OF TRADE ARE ONE DIVISION (3a) ═════════════════════════ */

export const termsDiagram = {
  id: id('diagram', 'calculating the terms of trade'),
  title: 'Calculating the Terms of Trade',
  checklist: [
    'Both price indices on the same scale, against a base of 100.',
    'The terms of trade drawn as a third bar, so it is visibly the ratio of the first two.',
    'The base year marked, because improvement and deterioration are relative to it.',
    'Prices only. No volumes and no values belong on this diagram.',
  ],
  caption: `${S.name}'s export prices are ${S.now.exportPrices} and its import prices ${S.now.importPrices}, both against a base of 100. The terms of trade are ${S.now.exportPrices} ÷ ${S.now.importPrices} × 100 = ${S.totNow}: an improvement, and both prices rose to produce it.`,
  svg: bars({
    title: 'Two indices, one ratio',
    subtitle: `${S.name}, base year = 100`,
    groups: ['Export prices', 'Import prices', 'Terms of trade'],
    series: [{ name: 'index', fill: AMBER, values: [S.now.exportPrices, S.now.importPrices, S.totNow] }],
    max: 130,
    baseAt: 100,
    note: `The ratio is above the base because exports rose faster, not because imports fell. Both indices are above 100.`,
  }),
};

/* ══ 4 · THE IMPROVEMENT THAT COST REVENUE (3c) ═══════════════════════════ */

export const revenueDiagram = {
  id: id('diagram', 'an improvement that costs revenue'),
  title: 'An Improvement That Costs Revenue',
  checklist: [
    'Price and volume as separate bars, because revenue is their product.',
    'The revenue bar drawn below the base line of 100, which is the whole point.',
    'The elasticity stated, since it is what decides the direction.',
    'No price index for imports here; this chart is about export earnings alone.',
  ],
  caption: `Export prices rose ${S.priceRisePct}% and, at a price elasticity of demand of ${S.pedExports}, volume fell ${S.volumeFallPct}%. Revenue is the product: ${S.now.exportPrices} × ${S.volumeIndex} ÷ 100 = ${S.revenueIndex}, so the terms of trade improved and export revenue fell.`,
  svg: bars({
    title: 'Price up, volume down, revenue down',
    subtitle: `${S.name}, all indices against a base of 100`,
    groups: ['Export prices', 'Export volume', 'Export revenue'],
    series: [{ name: 'index', fill: BLUE, values: [S.now.exportPrices, S.volumeIndex, S.revenueIndex] }],
    max: 130,
    baseAt: 100,
    note: `On balanced trade of ${S.baseFlow} in the base year: exports ${S.exportsNow}, imports ${S.importsNow}, a deficit of ${Math.abs(S.balance)}.`,
  }),
};

export const DIAGRAMS = [comparativeDiagram, sharesDiagram, termsDiagram, revenueDiagram];
