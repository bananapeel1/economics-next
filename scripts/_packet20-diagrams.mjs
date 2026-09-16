/**
 * PACKET 20 — types-sizes-businesses: five diagrams, each pinned to a chapter by `diagramId`.
 *
 * The March section had three and only one of them ever rendered. `matchDiagramsToBlocks` found no
 * title-word overlap for the objectives diagram or the principal-agent diagram, and scored the
 * integration diagram higher against "Types of Business Organisation" than against "Growth of Firms",
 * so the one diagram a student saw was on the wrong chapter (structure-01). `diagramRef` is the legacy
 * string pin; since packet 5 a diagram reaches a student only from a block's `diagramId`, at that
 * chapter's check-in (lib/learn-steps.js:44-55), so every one of these is pinned by id.
 *
 * Block 4 has none on purpose: constraints on growth and the impact of growth are an argument, and a
 * drawing of an argument is decoration (packet 17's B6 rule).
 *
 * Conventions from the live census: a 500-unit-wide viewBox, labels at 9-13 units, palette colours
 * that components/learn-mode/processSvg.js remaps onto theme tokens, strokes >= 2, and text placed
 * from the geometry of the thing it names.
 *
 * THE OBJECTIVES DIAGRAM IS SAMPLED, NOT DRAWN. Every curve on it comes from the four functions in
 * _packet20-util.mjs and every marked point from the three solved outputs; the runner re-derives them
 * from the emitted SVG and refuses to stage on a disagreement (packet 15's accuracy-01 rule).
 */
import { id, price, total, units, FIRM, arAt, mrAt, acAt, trAt, profitAt, A, B, MC, FIXED, Q_PROFIT, Q_REVENUE, Q_VOLUME, SIZE_FIRMS } from './_packet20-util.mjs';

const INK = '#e8ecf5', AXIS = '#94a3b8', GRID = '#475569', MUTED = '#7a8299';
const BLUE = '#3b82f6', GREEN = '#059669', RED = '#ef4444', AMBER = '#f59e0b', PURPLE = '#8b5cf6';
const open = (h = 330) => `<svg width="500" height="${h}" viewBox="0 0 500 ${h}" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',system-ui,sans-serif;background:transparent"><defs><marker id="arr" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="${AXIS}"/></marker><marker id="arrBlue" markerWidth="9" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="${BLUE}"/></marker><marker id="arrAmber" markerWidth="9" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="${AMBER}"/></marker><marker id="arrGreen" markerWidth="9" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="${GREEN}"/></marker></defs>`;
const close = '</svg>';
const t = (x, y, text, { size = 10, fill = INK, anchor = 'start', weight = 400, rotate = null } = {}) =>
  `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}"${rotate ? ` transform="rotate(${rotate},${x},${y})"` : ''}>${text}</text>`;
const line = (x1, y1, x2, y2, stroke, w = 2, extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${w}"${extra}/>`;
const rect = (x, y, w, h, fill, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"${extra}/>`;
const dot = (x, y, fill, r = 5) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;
const dash = ' stroke-dasharray="6,4"';
export const r2 = (n) => Math.round(n * 100) / 100;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* ── 1 · The five types of business, as a table (block 1) ──────────────────── */
/*
 * specGap-02, specGap-03 and the joint-ventures leaf the audit never named. A body cannot hold a
 * table — `schema.body-type` allows paragraph, subheading, flow and bullets only — so a diagram is
 * the only surface in the schema that can carry a grid (packet 17's specGap-05).
 */
export const TYPES_TBL = { x0: 18, y0: 56, rowH: 36, colOwner: 168, colSurplus: 292, colControl: 408, w: 466 };
export const TYPE_ROWS = [
  ['Private sector organisation', 'Private individuals or firms', 'To the owners', 'The owners'],
  ['State-owned enterprise (public sector)', 'The government', 'To the state, or reinvested', 'Set politically'],
  ['For-profit organisation', 'Whoever supplied the capital', 'Distributed to the owners', 'The owners'],
  ['Not-for-profit organisation', 'No private owners', 'Retained for its purpose', 'Trustees or members'],
  ['Co-operative', 'Its members, who use it', 'Shared among members by use', 'One member, one vote'],
  ['Joint venture', 'Two or more parent firms', 'Shared between the parents', 'The parents jointly'],
];

const typesTable = [
  open(344),
  t(TYPES_TBL.x0, 30, 'Who owns it, where the surplus goes, and who controls it', { size: 12, weight: 600 }),
  t(TYPES_TBL.x0, 50, 'Type', { size: 9, fill: AXIS, weight: 600 }),
  t(TYPES_TBL.colOwner, 50, 'Owner', { size: 9, fill: AXIS, weight: 600 }),
  t(TYPES_TBL.colSurplus, 50, 'Surplus', { size: 9, fill: AXIS, weight: 600 }),
  t(TYPES_TBL.colControl, 50, 'Control', { size: 9, fill: AXIS, weight: 600 }),
  line(TYPES_TBL.x0, 56, TYPES_TBL.x0 + TYPES_TBL.w, 56, AXIS, 2),
  ...TYPE_ROWS.map(([type, owner, surplus, control], i) => {
    const y = r2(TYPES_TBL.y0 + (i + 1) * TYPES_TBL.rowH);
    return [
      i % 2 ? rect(TYPES_TBL.x0, r2(y - 26), TYPES_TBL.w, TYPES_TBL.rowH - 6, GRID, ' opacity="0.18"') : '',
      t(TYPES_TBL.x0 + 4, y, esc(type), { size: 9.5, weight: 600 }),
      t(TYPES_TBL.colOwner, y, esc(owner), { size: 9 }),
      t(TYPES_TBL.colSurplus, y, esc(surplus), { size: 9 }),
      t(TYPES_TBL.colControl, y, esc(control), { size: 9 }),
    ].join('');
  }),
  t(TYPES_TBL.x0, 296, 'The first two rows divide by OWNERSHIP, the next two by PURPOSE — so they overlap:', { size: 9.5, fill: MUTED }),
  t(TYPES_TBL.x0, 310, 'most not-for-profits are private sector. A co-operative is the only row where control', { size: 9.5, fill: MUTED }),
  t(TYPES_TBL.x0, 324, 'does not follow capital.', { size: 9.5, fill: MUTED }),
  close,
].join('');

const typesDiagram = {
  id: id('diagram', 'five types of business ownership surplus control'),
  title: 'The Five Types of Business',
  description: 'The five types of business organisation the specification lists at 1a, set against who owns each one, where any surplus may go, and who controls it. The three columns are what separate them from one another.',
  checklist: [
    'All five bullets covered: private sector, state-owned, for-profit and not-for-profit, co-operative, joint venture',
    'Each row states who owns the organisation',
    'Each row states where the surplus may go',
    'The co-operative row shows one member, one vote',
    'The joint venture row shows ownership shared between parent firms that remain separate',
    'It is stated that ownership and purpose are different questions, so the categories overlap',
  ],
  svg: typesTable,
};

/* ── 2 · Two firms the measures of size rank differently (block 2) ─────────── */
/*
 * The one point about measuring size that prose cannot make: the same two firms come out in the
 * OPPOSITE order on employees and on capital employed. Both bar lengths are computed from SIZE_FIRMS,
 * so a change to the figures redraws the chart.
 */
export const SBAR = { x0: 150, top: 78, barH: 26, gap: 42, groupGap: 96, maxW: 300 };
const maxOf = (k) => Math.max(...SIZE_FIRMS.map((f) => f[k]));
export const sizeBarW = (k, v) => r2((v / maxOf(k)) * SBAR.maxW);
export const sizeBarY = (gi, fi) => r2(SBAR.top + gi * SBAR.groupGap + fi * SBAR.gap);

const sizeChart = [
  open(300),
  t(18, 30, 'The same two firms, measured two ways', { size: 12, weight: 600 }),
  t(18, 48, 'Each measure is scaled against the larger firm on that measure.', { size: 9.5, fill: MUTED }),
  ...[['employees', 'Number of employees', BLUE, ''], ['capital', 'Capital employed ($m)', AMBER, 'm']].flatMap(([k, label, colour, unit], gi) => [
    t(18, r2(sizeBarY(gi, 0) - 12), label, { size: 10, fill: AXIS, weight: 600 }),
    ...SIZE_FIRMS.map((f, fi) => [
      t(SBAR.x0 - 8, r2(sizeBarY(gi, fi) + 17), esc(f.name), { size: 9, anchor: 'end' }),
      rect(SBAR.x0, sizeBarY(gi, fi), sizeBarW(k, f[k]), SBAR.barH, colour),
      t(r2(SBAR.x0 + sizeBarW(k, f[k]) + 6), r2(sizeBarY(gi, fi) + 17), `${f[k]}${unit ? ` $${unit}` : ''}`, { size: 9.5, weight: 600 }),
    ].join('')),
  ]),
  t(18, 276, 'Ranked by employees the contractor is larger; by capital employed the refinery is.', { size: 9.5, fill: MUTED }),
  close,
].join('');

const sizeDiagram = {
  id: id('diagram', 'measures of business size employees capital'),
  title: 'How Size Is Measured',
  description: 'Two firms measured by number of employees and by capital employed. The two measures rank them in opposite orders, which is why an answer has to name the measure it is using rather than call a firm large.',
  checklist: [
    'Both measures named, each with its unit: number of employees, capital employed in $m',
    'The same two firms appear on both measures',
    'The two measures put the firms in opposite orders',
    'Each bar is labelled with its own figure',
    'The point stated: name the measure before calling a firm large',
  ],
  svg: sizeChart,
};

/* ── 3 · The integration map (block 3) ─────────────────────────────────────── */
/*
 * One supply chain with all four directions drawn on it, from the roastery's point of view. The
 * March diagram existed but landed on the sole-trader chapter, because the legacy matcher scored its
 * title against the wrong block (structure-01).
 */
export const CHAIN = { y: 132, boxW: 118, boxH: 52, gap: 30, x0: 24 };
export const chainX = (i) => r2(CHAIN.x0 + i * (CHAIN.boxW + CHAIN.gap));
const chainBox = (i, label, colour, sub) => [
  rect(chainX(i), CHAIN.y, CHAIN.boxW, CHAIN.boxH, colour, ' rx="6" opacity="0.28"'),
  rect(chainX(i), CHAIN.y, CHAIN.boxW, CHAIN.boxH, 'none', ` rx="6" stroke="${colour}" stroke-width="2"`),
  t(r2(chainX(i) + CHAIN.boxW / 2), r2(CHAIN.y + 24), label, { size: 10.5, anchor: 'middle', weight: 600 }),
  t(r2(chainX(i) + CHAIN.boxW / 2), r2(CHAIN.y + 40), sub, { size: 8.5, anchor: 'middle', fill: MUTED }),
].join('');

const integrationMap = [
  open(330),
  t(18, 28, 'Four directions, from the roastery\'s point of view', { size: 12, weight: 600 }),
  t(18, 46, 'The supply chain runs left to right, from the input to the final customer.', { size: 9.5, fill: MUTED }),
  chainBox(0, 'Coffee farms', GREEN, 'the supplier'),
  chainBox(1, 'Roastery', BLUE, 'this firm'),
  chainBox(2, 'Cafés', AMBER, 'the customer'),
  line(r2(chainX(0) + CHAIN.boxW), r2(CHAIN.y + 26), r2(chainX(1) - 6), r2(CHAIN.y + 26), AXIS, 2, ' marker-end="url(#arr)"'),
  line(r2(chainX(1) + CHAIN.boxW), r2(CHAIN.y + 26), r2(chainX(2) - 6), r2(CHAIN.y + 26), AXIS, 2, ' marker-end="url(#arr)"'),
  // backward: roastery reaches left to the farms
  line(r2(chainX(1) + 20), r2(CHAIN.y - 10), r2(chainX(0) + CHAIN.boxW - 20), r2(CHAIN.y - 10), GREEN, 2, ' marker-end="url(#arrGreen)"'),
  t(r2(chainX(0) + CHAIN.boxW), r2(CHAIN.y - 18), 'Backward vertical', { size: 9.5, fill: GREEN, anchor: 'middle', weight: 600 }),
  // forward: roastery reaches right to the cafés
  line(r2(chainX(2) - 20), r2(CHAIN.y - 10), r2(chainX(2) + 20), r2(CHAIN.y - 10), AMBER, 2, ' marker-end="url(#arrAmber)"'),
  t(r2(chainX(2) + CHAIN.boxW / 2), r2(CHAIN.y - 18), 'Forward vertical', { size: 9.5, fill: AMBER, anchor: 'middle', weight: 600 }),
  // horizontal: another roastery at the same stage, directly below
  rect(chainX(1), r2(CHAIN.y + 92), CHAIN.boxW, CHAIN.boxH, BLUE, ' rx="6" opacity="0.14"'),
  rect(chainX(1), r2(CHAIN.y + 92), CHAIN.boxW, CHAIN.boxH, 'none', ` rx="6" stroke="${BLUE}" stroke-width="2"${dash}`),
  t(r2(chainX(1) + CHAIN.boxW / 2), r2(CHAIN.y + 116), 'Another roastery', { size: 10, anchor: 'middle', weight: 600 }),
  t(r2(chainX(1) + CHAIN.boxW / 2), r2(CHAIN.y + 131), 'the same stage', { size: 8.5, anchor: 'middle', fill: MUTED }),
  line(r2(chainX(1) + CHAIN.boxW / 2), r2(CHAIN.y + CHAIN.boxH), r2(chainX(1) + CHAIN.boxW / 2), r2(CHAIN.y + 86), BLUE, 2, ' marker-end="url(#arrBlue)"'),
  t(r2(chainX(1) + CHAIN.boxW / 2 + 8), r2(CHAIN.y + 76), 'Horizontal', { size: 9.5, fill: BLUE, weight: 600 }),
  // conglomerate: off the chain entirely
  rect(chainX(2), r2(CHAIN.y + 92), CHAIN.boxW, CHAIN.boxH, PURPLE, ' rx="6" opacity="0.14"'),
  rect(chainX(2), r2(CHAIN.y + 92), CHAIN.boxW, CHAIN.boxH, 'none', ` rx="6" stroke="${PURPLE}" stroke-width="2"${dash}`),
  t(r2(chainX(2) + CHAIN.boxW / 2), r2(CHAIN.y + 116), 'An insurer', { size: 10, anchor: 'middle', weight: 600 }),
  t(r2(chainX(2) + CHAIN.boxW / 2), r2(CHAIN.y + 131), 'no shared chain', { size: 8.5, anchor: 'middle', fill: MUTED }),
  t(r2(chainX(2) + CHAIN.boxW / 2), r2(CHAIN.y + 164), 'Conglomerate', { size: 9.5, fill: PURPLE, anchor: 'middle', weight: 600 }),
  t(18, 322, 'Backward goes towards the supplier, forward towards the customer.', { size: 9.5, fill: MUTED }),
  close,
].join('');

const integrationDiagram = {
  id: id('diagram', 'integration map supply chain four directions'),
  title: 'The Four Directions of Integration',
  description: 'One supply chain — coffee farms, roastery, cafés — with the four directions of merger or takeover drawn on it from the roastery\'s position: backward towards the supplier, forward towards the customer, horizontal at the same stage, and conglomerate outside the chain altogether.',
  checklist: [
    'A supply chain drawn from input to final customer',
    'Backward vertical arrow pointing towards the supplier',
    'Forward vertical arrow pointing towards the customer',
    'Horizontal shown as a firm at the SAME stage',
    'Conglomerate shown outside the supply chain, with nothing shared',
  ],
  svg: integrationMap,
};

/* ── 4 · A demerger against a divestment (block 5) ─────────────────────────── */
/*
 * accuracy-01 was closed by packet 0 in prose. This is the same distinction as a picture: in a
 * demerger the OWNERS end up holding two companies and no money changes hands; in a divestment the
 * division changes owner and cash comes back.
 */
export const SPLIT = { boxW: 96, boxH: 42, leftX: 24, midX: 208, rightX: 372 };
const smallBox = (x, y, w, label, colour, opacity = '0.28') => [
  rect(x, y, w, SPLIT.boxH, colour, ` rx="5" opacity="${opacity}"`),
  rect(x, y, w, SPLIT.boxH, 'none', ` rx="5" stroke="${colour}" stroke-width="2"`),
  t(r2(x + w / 2), r2(y + 26), label, { size: 9.5, anchor: 'middle', weight: 600 }),
].join('');

const demergerPanel = [
  open(340),
  t(18, 28, 'Same split, different transaction', { size: 12, weight: 600 }),
  // demerger row
  t(18, 56, 'DEMERGER — nobody buys it', { size: 10, fill: GREEN, weight: 600 }),
  smallBox(SPLIT.leftX, 68, 150, 'Group: A + B', BLUE),
  line(180, 89, 236, 89, AXIS, 2, ' marker-end="url(#arr)"'),
  smallBox(SPLIT.midX, 68, SPLIT.boxW, 'Company A', GREEN),
  smallBox(r2(SPLIT.midX + SPLIT.boxW + 14), 68, SPLIT.boxW, 'Company B', GREEN),
  t(SPLIT.leftX, 130, 'The same owners now hold shares in both companies.', { size: 9.5, fill: MUTED }),
  t(SPLIT.leftX, 146, 'No buyer appears and no payment is received.', { size: 9.5, fill: GREEN, weight: 600 }),
  line(18, 166, 482, 166, GRID, 2),
  // divestment row
  t(18, 194, 'DIVESTMENT — somebody buys it', { size: 10, fill: RED, weight: 600 }),
  smallBox(SPLIT.leftX, 206, 150, 'Group: A + B', BLUE),
  line(180, 227, 236, 227, AXIS, 2, ' marker-end="url(#arr)"'),
  smallBox(SPLIT.midX, 206, SPLIT.boxW, 'Company A', GREEN),
  smallBox(r2(SPLIT.midX + SPLIT.boxW + 14), 206, SPLIT.boxW, 'B, sold', RED),
  t(SPLIT.leftX, 268, 'B now belongs to another firm, and cash comes back to the group.', { size: 9.5, fill: MUTED }),
  t(SPLIT.leftX, 284, 'The division changed owner, which is what a demerger does not do.', { size: 9.5, fill: RED, weight: 600 }),
  t(18, 322, 'The test is whether anyone bought it.', { size: 9.5, fill: MUTED }),
  close,
].join('');

const demergerDiagram = {
  id: id('diagram', 'demerger against divestment ownership'),
  title: 'A Demerger Against a Divestment',
  description: 'The same business split two ways. In a demerger the group divides into two companies held by the same owners and no payment is made. In a divestment the division is sold to another firm and cash comes back to the group.',
  checklist: [
    'Both routes start from the same combined group',
    'Demerger: two companies, held by the same owners',
    'Demerger: no buyer and no payment',
    'Divestment: the division changes owner',
    'Divestment: cash comes back to the seller',
  ],
  svg: demergerPanel,
};

/* ── 5 · The three objectives on one firm (block 6) ────────────────────────── */
/*
 * EVERY POINT HERE IS SAMPLED FROM THE FUNCTIONS, NOT DRAWN. AR and MR are straight lines from the
 * demand curve, MC is the constant, AC is sampled from MC + FIXED/Q, and the three marked outputs are
 * the solved values of MC = MR, MR = 0 and AR = AC. The runner re-derives all of them from this SVG.
 */
export const OQ = { x0: 60, x1: 452, y0: 268, yTop: 48, qMax: 25, pMax: 60 };
export const OX = (q) => r2(OQ.x0 + (q / OQ.qMax) * (OQ.x1 - OQ.x0));
export const OY = (p) => r2(OQ.y0 - (p / OQ.pMax) * (OQ.y0 - OQ.yTop));
/** Where AC is sampled: from the low break-even output up to the right-hand edge. */
export const AC_SAMPLES = Array.from({ length: 24 }, (_, i) => r2(2 + (i * (OQ.qMax - 2)) / 23));

const objectivesDiagram = [
  open(340),
  t(18, 26, `${FIRM}: three objectives, three outputs`, { size: 12, weight: 600 }),
  line(OQ.x0, OQ.y0, OQ.x1 + 12, OQ.y0, AXIS, 2, ' marker-end="url(#arr)"'),
  line(OQ.x0, OQ.y0, OQ.x0, OQ.yTop - 12, AXIS, 2, ' marker-end="url(#arr)"'),
  t(r2((OQ.x0 + OQ.x1) / 2), r2(OQ.y0 + 26), 'Output (thousands of units a month)', { size: 10, fill: AXIS, anchor: 'middle' }),
  t(r2(OQ.x0 - 26), r2((OQ.y0 + OQ.yTop) / 2), 'Price and cost ($ a unit)', { size: 10, fill: AXIS, anchor: 'middle', rotate: -90 }),
  // AR = the demand curve
  line(OX(0), OY(arAt(0)), OX(OQ.qMax), OY(arAt(OQ.qMax)), BLUE, 2.5),
  t(r2(OX(OQ.qMax) - 4), r2(OY(arAt(OQ.qMax)) + 16), 'AR (demand)', { size: 10, fill: BLUE, anchor: 'end', weight: 600 }),
  // MR, drawn only where it is positive
  line(OX(0), OY(mrAt(0)), OX(Q_REVENUE), OY(0), GREEN, 2.5),
  // at 390px the old position put this label on the axis line, touching the "15" tick (Verify B).
  // It now sits in the empty pocket left of the line's foot, below AC and MC and clear of both.
  t(r2(OX(Q_REVENUE) - 30), r2(OY(0) - 16), 'MR', { size: 10, fill: GREEN, anchor: 'end', weight: 600 }),
  // MC, constant — and its value on the axis, because the Calculate practice reads it from here
  line(OX(0), OY(MC), OX(OQ.qMax), OY(MC), RED, 2.5),
  t(r2(OX(OQ.qMax)), r2(OY(MC) + 16), 'MC', { size: 10, fill: RED, anchor: 'end', weight: 600 }),
  t(r2(OQ.x0 - 6), r2(OY(MC) + 4), price(MC), { size: 9.5, fill: RED, anchor: 'end', weight: 600 }),
  // AC, sampled from MC + FIXED/Q
  `<polyline points="${AC_SAMPLES.map((q) => `${OX(q)},${OY(acAt(q))}`).join(' ')}" fill="none" stroke="${AMBER}" stroke-width="2.5"/>`,
  t(r2(OX(OQ.qMax)), r2(OY(acAt(OQ.qMax)) - 10), 'AC', { size: 10, fill: AMBER, anchor: 'end', weight: 600 }),
  // the three outputs
  ...[[Q_PROFIT, 'MC = MR', RED], [Q_REVENUE, 'MR = 0', GREEN], [Q_VOLUME, 'AR = AC', AMBER]].map(([q, label, colour]) => [
    line(OX(q), OQ.y0, OX(q), OY(arAt(q)), colour, 2, dash),
    line(OQ.x0, OY(arAt(q)), OX(q), OY(arAt(q)), colour, 2, dash),
    dot(OX(q), OY(arAt(q)), colour),
    t(OX(q), r2(OQ.y0 + 14), String(q), { size: 9.5, fill: colour, anchor: 'middle', weight: 600 }),
    t(r2(OQ.x0 - 6), r2(OY(arAt(q)) + 4), price(arAt(q)), { size: 9.5, fill: colour, anchor: 'end', weight: 600 }),
    t(r2(OX(q) + 6), r2(OY(arAt(q)) - 8), label, { size: 9, fill: colour, weight: 600 }),
  ].join('')),
  t(18, 314, `Profit ${total(profitAt(Q_PROFIT))} · ${total(profitAt(Q_REVENUE))} · ${total(profitAt(Q_VOLUME))} — the price falls as the objective moves down the list.`, { size: 9.5, fill: MUTED }),
  close,
].join('');

const objectivesDiagramObj = {
  id: id('diagram', 'three business objectives ar mr mc ac'),
  title: 'The Three Business Objectives',
  description: `${FIRM}'s average revenue, marginal revenue, marginal cost and average cost, with the output each objective chooses marked on the demand curve: MC = MR at ${units(Q_PROFIT)}, MR = 0 at ${units(Q_REVENUE)} and AR = AC at ${units(Q_VOLUME)}.`,
  checklist: [
    'Four curves labelled: AR, MR, MC and AC',
    'MR drawn twice as steep as AR, and reaching zero at the revenue-maximising output',
    `Profit maximisation marked where MC = MR, at ${units(Q_PROFIT)} and ${price(arAt(Q_PROFIT))}`,
    `Revenue maximisation marked where MR = 0, at ${units(Q_REVENUE)} and ${price(arAt(Q_REVENUE))}`,
    `Sales volume maximisation marked where AR = AC, at ${units(Q_VOLUME)} and ${price(arAt(Q_VOLUME))}`,
  ],
  svg: objectivesDiagram,
};

export const DIAGRAMS = [typesDiagram, sizeDiagram, integrationDiagram, demergerDiagram, objectivesDiagramObj];
