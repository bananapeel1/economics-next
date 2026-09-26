/**
 * PACKET 56 — global-industries-mncs diagrams. FOUR, one pinned to each chapter by `diagramId`, every
 * figure read off `FIRM` rather than typed into the SVG.
 *
 * `topFix-03` asks for "one diagram (stakeholder map host vs home, or a two-subsidiary transfer-pricing
 * flow)". The transfer-pricing flow is chapter 2's (1b tax revenues). The other chapters draw what
 * their own leaves are about: pay at the factory against local work (1a), the four ethical questions
 * of item 2, and what limits an MNC against what protects it (3a).
 *
 * THE CHECK-IN SHOWS THE CHAPTER'S DIAGRAM, ITS LEADING QUIZ ITEM AND ITS LEADING PRACTICE ITEM
 * (`lib/checkin-placement.js`). Each leading quiz item is written against figures and wording this
 * module does not print, and the runner re-checks it on the emitted SVG; each leading practice item
 * asks about something its chapter's diagram does not draw (B1 local businesses against a pay
 * chart; B2 the balance of payments against the transfer-pricing flow).
 *
 * Frame 400 wide, faces 15 (titles) and 12 (everything else), stacked rows 20 apart. Every colour is
 * a key of `PALETTE` in `components/learn-mode/processSvg.js` (the runner parses it).
 */
import { id, FIRM, usd, units, pct } from './_packet56-util.mjs';

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

export const estWidth = (text, size = FACE) => String(text).length * size * 0.56;

const svg = (h, body) => `<svg width="${FRAME.w}" height="${h}" viewBox="0 0 ${FRAME.w} ${h}" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',system-ui,sans-serif;background:transparent">${body}</svg>`;
const t = (x, y, str, { size = SMALL, fill = INK, anchor = 'start', weight = 400 } = {}) =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" font-weight="${weight}">${str}</text>`;
const title = (str) => t(FRAME.w / 2, 24, str, { size: FACE, anchor: 'middle', weight: 600 });
const rect = (x, y, w, h, { fill = 'none', stroke = GRID, rx = 6, sw = 1.5 } = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
const line = (x1, y1, x2, y2, { stroke = AXIS, sw = 1.5, marker = null } = {}) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}"${marker ? ` marker-end="url(#${marker})"` : ''}/>`;
const arrowDefs = (colours) => `<defs>${colours.map(([name, c]) => `<marker id="${name}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${c}"/></marker>`).join('')}</defs>`;
/** A labelled box: a rect with up to three centred lines of text, 20 apart. */
const box = (x, y, w, h, lines, { stroke = GRID, fill = 'none', colour = INK } = {}) => {
  const cx = x + w / 2;
  const first = y + h / 2 - ((lines.length - 1) * LEAD) / 2 + 4;
  return rect(x, y, w, h, { stroke, fill }) + lines.map((s, i) => t(cx, first + i * LEAD, s, { anchor: 'middle', fill: i === 0 ? colour : MUTED, weight: i === 0 ? 600 : 400 })).join('');
};

/* ══ 1 · MNCs and the local economy (1a) ════════════════════════════════════ */

export const PAY_SCALE = 0.5;      // SVG units per dollar of monthly pay

const paySvg = () => {
  const yBase = 210, bw = 90;
  const bars = [
    ['Local factories', F.localWage, MUTED, 90],
    [`${F.name}`, F.wage, BLUE, 220],
  ];
  return svg(290, [
    title('Monthly pay: the factory against local work'),
    line(40, yBase, 360, yBase),
    ...bars.map(([label, v, colour, x]) => {
      const h = v * PAY_SCALE;
      return rect(x, yBase - h, bw, h, { fill: colour, stroke: colour, rx: 3, sw: 1 })
        + t(x + bw / 2, yBase - h - 8, usd(v), { anchor: 'middle' })
        + t(x + bw / 2, yBase + LEAD, label, { anchor: 'middle', fill: MUTED });
    }),
    t(FRAME.w / 2, yBase + LEAD * 2 + 10, `${units(F.workers)} jobs at the factory`, { anchor: 'middle', weight: 600 }),
    t(FRAME.w / 2, yBase + LEAD * 3 + 10, 'Pay is one part of the impact on labour', { anchor: 'middle', fill: MUTED }),
  ].join(''));
};

export const localDiagram = {
  id: id('diagram', 'mnc pay against local work jobs'),
  title: 'Pay at an MNC Factory Against Local Work',
  description: `IAL 4.3.4 · 1a: monthly pay at ${F.name}'s factory in ${F.host} against the local factory average, and the jobs it created.`,
  checklist: [
    `${F.name} pays ${usd(F.wage)} a month where local factories pay ${usd(F.localWage)}`,
    'Higher pay helps an MNC attract and keep trained workers',
    'Hours, safety and job security matter as well as pay',
    'Routine jobs can go if a cheaper location appears',
  ],
  scenarios: [
    { label: 'Pay and jobs', svg: paySvg() },
  ],
};

/* ══ 2 · MNCs and the national economy (1b, tax revenues) ═══════════════════ */

const transferSvg = () => {
  const x = 100, w = 200, h = 64;
  return svg(300, [
    arrowDefs([['tp', AXIS]]),
    title('Where the profit on each pair is reported'),
    box(x, 44, w, h, [`Factory in ${F.host}`, `cost ${usd(F.costPair)} a pair · tax ${pct(F.taxHost)}`], { stroke: BLUE, colour: BLUE }),
    line(200, 110, 200, 140, { marker: 'tp' }),
    t(212, 130, `sold at ${usd(F.transferPrice)}`, { fill: MUTED }),
    box(x, 144, w, h, [`${F.trading}, ${F.lowTax}`, `sells at ${usd(F.armsLength)} · tax ${pct(F.taxLow)}`], { stroke: AMBER, colour: AMBER }),
    t(FRAME.w / 2, 236, 'Profit reported on each pair', { anchor: 'middle', fill: MUTED }),
    t(110, 258, `${F.host}: ${usd(F.profitHostPair)}`, { anchor: 'middle', fill: BLUE, weight: 600 }),
    t(290, 258, `${F.lowTax}: ${usd(F.shiftedPair)}`, { anchor: 'middle', fill: AMBER, weight: 600 }),
    t(FRAME.w / 2, 286, `At ${usd(F.armsLength)}, ${F.host} would tax ${usd(F.profitArmsPair)} a pair`, { anchor: 'middle' }),
  ].join(''));
};

export const transferDiagram = {
  id: id('diagram', 'transfer pricing two subsidiaries profit reported'),
  title: 'Transfer Pricing Between Two Subsidiaries',
  description: `IAL 4.3.4 · 1b (tax revenues): ${F.name}'s factory sells to its own trading company in a low-tax country below the arm's length price, moving profit out of ${F.host}.`,
  checklist: [
    `The internal price (${usd(F.transferPrice)}) is set below the arm's length price (${usd(F.armsLength)})`,
    `So ${usd(F.shiftedPair)} of each pair's profit is reported in ${F.lowTax}, taxed at ${pct(F.taxLow)}`,
    `${F.host} taxes ${usd(F.profitHostPair)} a pair at ${pct(F.taxHost)} instead of ${usd(F.profitArmsPair)}`,
    'Tax authorities can test an internal price against the arm\'s length price',
  ],
  scenarios: [
    { label: 'Two subsidiaries', svg: transferSvg() },
  ],
};

/* ══ 3 · International business ethics (2a-2d) ═════════════════════════════ */

const ethicsSvg = () => {
  const w = 180, h = 76, x1 = 16, x2 = 204, y1 = 50, y2 = 138;
  return svg(260, [
    title('Four ethical questions for an MNC'),
    box(x1, y1, w, h, ['Stakeholders', 'Who gains, who loses?'], { stroke: PURPLE, colour: PURPLE }),
    box(x2, y1, w, h, ['Environment', 'Air, water, land, future?'], { stroke: GREEN, colour: GREEN }),
    box(x1, y2, w, h, ['Supply chain', 'Who made it, and how?'], { stroke: RED, colour: RED }),
    box(x2, y2, w, h, ['Marketing', 'Is the message fair?'], { stroke: AMBER, colour: AMBER }),
    t(FRAME.w / 2, 240, 'Legal is not the same as ethical', { anchor: 'middle' }),
  ].join(''));
};

export const ethicsDiagram = {
  id: id('diagram', 'four ethical questions mnc'),
  title: 'Four Ethical Questions for an MNC',
  description: 'IAL 4.3.4 · 2a-2d: the four areas of international business ethics, each as a question to ask of an MNC\'s decision.',
  checklist: [
    'Stakeholders: whose interest does the decision serve, and at whose cost?',
    'Environment: what goes into the air, water and land, and can it continue?',
    'Supply chain: how are the people who make the goods paid and treated?',
    'Marketing: is the way the product is sold fair to buyers?',
  ],
  scenarios: [
    { label: 'The four questions', svg: ethicsSvg() },
  ],
};

/* ══ 4 · Controlling MNCs (3a) ═════════════════════════════════════════════ */

const controlSvg = () => {
  const lx = 16, rx = 216, w = 168, rowH = 30, top = 76;
  const limits = ['Legal control', 'Consumer pressure', 'Pressure groups', 'Social media', 'Self-regulation'];
  const shields = ['Size', 'Mobility', 'Political influence'];
  return svg(300, [
    title('What limits an MNC, and what protects it'),
    t(lx + w / 2, 58, 'Limits', { anchor: 'middle', fill: GREEN, weight: 600 }),
    t(rx + w / 2, 58, 'Protects', { anchor: 'middle', fill: RED, weight: 600 }),
    ...limits.map((s, i) => box(lx, top + i * (rowH + 4), w, rowH, [s], { stroke: GREEN, colour: INK })),
    ...shields.map((s, i) => box(rx, top + i * (rowH + 4), w, rowH, [s], { stroke: RED, colour: INK })),
    t(rx + w / 2, 208, 'The more a host relies', { anchor: 'middle', fill: MUTED }),
    t(rx + w / 2, 228, 'on it, the weaker', { anchor: 'middle', fill: MUTED }),
    t(rx + w / 2, 248, 'the limits', { anchor: 'middle', fill: MUTED }),
    t(FRAME.w / 2, 286, 'Each limit is as strong as its enforcement', { anchor: 'middle' }),
  ].join(''));
};

export const controlDiagram = {
  id: id('diagram', 'what limits an mnc what protects it'),
  title: 'What Limits an MNC, and What Protects It',
  description: 'IAL 4.3.4 · 3a: the seven factors in controlling MNCs, sorted into those that limit an MNC and those that protect it.',
  checklist: [
    'Limits: legal control, buyers, campaign groups, social media and self-regulation',
    'Protection: the MNC\'s size, its ability to move, and its influence over governments',
    'The more a host relies on the MNC, the weaker its controls',
    'Every limit is only as strong as its enforcement',
  ],
  scenarios: [
    { label: 'Limits and protection', svg: controlSvg() },
  ],
};

/* ── the array order IS the chapter order, and the runner derives pins from it ── */
export const DIAGRAMS = [localDiagram, transferDiagram, ethicsDiagram, controlDiagram];
export const ALL_DIAGRAMS = DIAGRAMS;
