/**
 * PACKET 53 — influences-business-decisions diagrams. FOUR, one pinned to each chapter by
 * `diagramId`, every figure read off `FIRM` rather than typed into the SVG.
 *
 * `structure-04` and `topFix-03` name two pictures: Mendelow's power-interest grid and Handy's
 * typology. The typology is drawn, because its four types ARE the specification's words (1b), with
 * no name attached. The grid is not: it is not a 3.3.4 requirement, and the rule for an aside is
 * that it is named once and never made the thing learned. Chapter 3 draws what 2a asks for instead:
 * who is inside the business and who is outside it, with shareholders on the boundary (accuracy-02).
 * Chapter 2 draws how a culture forms and holds (1c, and why 1d is hard); chapter 4 draws the two
 * figures its trade-offs turn on (3a, 3b).
 *
 * THE CHECK-IN SHOWS THE CHAPTER'S DIAGRAM ABOVE ONE QUIZ ITEM (`lib/checkin-placement.js`), so
 * each chapter's pinned items are written about what its diagram does not print, and the runner
 * re-checks every pinned key against the emitted text.
 *
 * Frame 400 wide, faces 15 (titles) and 12 (everything else), stacked rows 20 apart, which clears
 * the collision guard's 1.2 × 15 = 18. Every colour is a key of `PALETTE` in
 * `components/learn-mode/processSvg.js`.
 */
import { id, FIRM, rmm, ratio } from './_packet53-util.mjs';

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
const line = (x1, y1, x2, y2, { stroke = AXIS, sw = 1.5, marker = null } = {}) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}"${marker ? ` marker-end="url(#${marker})"` : ''}/>`;
const arrowDefs = (colours) => `<defs>${colours.map(([name, c]) => `<marker id="${name}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${c}"/></marker>`).join('')}</defs>`;
/** A labelled box: a rect with up to three centred lines, 20 apart; the first in colour and bold. */
const box = (x, y, w, h, lines, { stroke = GRID, fill = 'none', colour = INK } = {}) => {
  const cx = x + w / 2;
  const first = y + h / 2 - ((lines.length - 1) * LEAD) / 2 + 4;
  return rect(x, y, w, h, { stroke, fill }) + lines.map((s, i) => t(cx, first + i * LEAD, s, { anchor: 'middle', fill: i === 0 ? colour : MUTED, weight: i === 0 ? 600 : 400 })).join('');
};
const round = (n) => Math.round(n * 10) / 10;

/* ══ 1 · Corporate culture: the four types (1b) ════════════════════════════ */

const fourTypesSvg = () => {
  const w = 180, h = 90, x1 = 14, x2 = 206, y1 = 48, y2 = 154;
  return svg(290, [
    title('Four cultures: where decisions come from'),
    box(x1, y1, w, h, ['Power', 'One person at', 'the centre'], { stroke: AMBER, colour: AMBER }),
    box(x2, y1, w, h, ['Role', 'Job titles and', 'written procedures'], { stroke: BLUE, colour: BLUE }),
    box(x1, y2, w, h, ['Task', 'Project teams,', 'led by expertise'], { stroke: GREEN, colour: GREEN }),
    box(x2, y2, w, h, ['Person', 'Independent experts', 'the firm supports'], { stroke: PURPLE, colour: PURPLE }),
    t(FRAME.w / 2, 274, 'Ask who decides, and by what authority', { anchor: 'middle' }),
  ].join(''));
};

export const cultureDiagram = {
  id: id('diagram', 'four culture types power role task person'),
  title: 'Four Types of Company Culture',
  description: 'IAL 3.3.4 · 1b: the four classifications of company culture, told apart by where decisions come from.',
  checklist: [
    'Power: decisions radiate from one central person',
    'Role: authority comes from the job title and the procedure',
    'Task: teams form around a job and are led by expertise',
    'Person: the organisation exists to support independent professionals',
  ],
  scenarios: [
    { label: 'The four types', svg: fourTypesSvg() },
  ],
};

/* ══ 2 · Forming and changing a culture (1c, 1d) ═══════════════════════════ */

const formLoopSvg = () => {
  const w = 164, h = 56;
  const L = 20, R = 216, T = 52, B = 176;
  return svg(290, [
    arrowDefs([['fl', AXIS]]),
    title('How a culture forms and holds'),
    box(L, T, w, h, ['Founder\'s values', 'what is praised'], { stroke: AMBER, colour: AMBER }),
    box(R, T, w, h, ['Hiring, promotion', 'who fits, who leads'], { stroke: BLUE, colour: BLUE }),
    box(R, B, w, h, ['Pay and bonuses', 'what is paid for'], { stroke: PURPLE, colour: PURPLE }),
    box(L, B, w, h, ['Past success', 'seems to prove it'], { stroke: GREEN, colour: GREEN }),
    line(L + w + 4, T + h / 2, R - 4, T + h / 2, { marker: 'fl' }),
    line(R + w / 2, T + h + 4, R + w / 2, B - 4, { marker: 'fl' }),
    line(R - 4, B + h / 2, L + w + 4, B + h / 2, { marker: 'fl' }),
    line(L + w / 2, B - 4, L + w / 2, T + h + 4, { marker: 'fl' }),
    t(FRAME.w / 2, 270, 'Each turn of the loop makes the culture firmer', { anchor: 'middle' }),
  ].join(''));
};

export const formingDiagram = {
  id: id('diagram', 'how a culture forms and holds loop'),
  title: 'How a Culture Forms and Holds',
  description: 'IAL 3.3.4 · 1c and 1d: the sources of a corporate culture reinforce each other, which is why an established culture resists change.',
  checklist: [
    'The founder\'s values are the first model staff copy',
    'Hiring and promotion spread those values beyond the founder',
    'Pay and bonuses show what the business really values',
    'Success seems to prove the values right, so they are defended',
  ],
  scenarios: [
    { label: 'The reinforcing loop', svg: formLoopSvg() },
  ],
};

/* ══ 3 · Internal and external stakeholders (2a) ════════════════════════════ */

const stakeholdersSvg = () => {
  const outer = { x: 14, y: 44, w: 372, h: 224 };
  const inner = { x: 110, y: 100, w: 180, h: 110 };
  return svg(330, [
    title(`${F.name}'s stakeholders`),
    rect(outer.x, outer.y, outer.w, outer.h, { stroke: GRID }),
    rect(inner.x, inner.y, inner.w, inner.h, { stroke: GREEN }),
    t(outer.x + 10, outer.y + 20, 'External', { fill: MUTED, weight: 600 }),
    t(inner.x + inner.w / 2, inner.y + 22, 'Internal', { anchor: 'middle', fill: GREEN, weight: 600 }),
    t(inner.x + inner.w / 2, inner.y + 50, 'Employees', { anchor: 'middle' }),
    t(inner.x + inner.w / 2, inner.y + 70, 'Managers', { anchor: 'middle' }),
    t(inner.x + inner.w / 2, inner.y + 96, 'Shareholders?', { anchor: 'middle', fill: AMBER, weight: 600 }),
    t(40, 84, 'Customers', { fill: BLUE }),
    t(360, 84, 'Suppliers', { anchor: 'end', fill: BLUE }),
    t(28, 160, 'Lenders', { fill: BLUE }),
    t(374, 160, 'Government', { anchor: 'end', fill: BLUE }),
    t(40, 248, 'Local community', { fill: BLUE }),
    t(360, 248, 'Pressure groups', { anchor: 'end', fill: BLUE }),
    t(FRAME.w / 2, 294, 'Shareholders own the firm: class them', { anchor: 'middle', fill: AMBER }),
    t(FRAME.w / 2, 314, 'either way, and give the reason', { anchor: 'middle', fill: AMBER }),
  ].join(''));
};

export const stakeholderDiagram = {
  id: id('diagram', 'internal and external stakeholders map'),
  title: 'Internal and External Stakeholders',
  description: 'IAL 3.3.4 · 2a: the groups inside the business and those outside it, with shareholders on the boundary.',
  checklist: [
    'Internal stakeholders work within the business: employees and managers',
    'External stakeholders are outside it: customers, suppliers, lenders, government, the community, pressure groups',
    'Shareholders own the company; textbooks class them either way, so give a reason',
  ],
  scenarios: [
    { label: 'Inside and outside', svg: stakeholdersSvg() },
  ],
};

/* ══ 4 · Business ethics: the two figures (3a, 3b) ══════════════════════════ */

const profitSvg = () => {
  const yBase = 220, scale = 2.4;   // RM1m = 2.4 units: RM60m = 144 units tall
  const bars = [[110, F.profit, BLUE, 'Standard oil'], [230, F.profitWithOil, GREEN, 'Certified oil']];
  return svg(300, [
    title('Yearly profit, by palm oil bought'),
    line(60, yBase, 350, yBase),
    ...bars.map(([x, v, c]) => rect(x, round(yBase - (v / 1e6) * scale), 60, round((v / 1e6) * scale), { fill: c, stroke: c, rx: 3, sw: 1 })),
    ...bars.map(([x, v]) => t(x + 30, round(yBase - (v / 1e6) * scale) - 8, rmm(v), { anchor: 'middle', weight: 600 })),
    ...bars.map(([x, , , lab]) => t(x + 30, yBase + LEAD, lab, { anchor: 'middle', fill: MUTED })),
    t(FRAME.w / 2, 284, `Certified oil costs ${rmm(F.oilCost)} a year more`, { anchor: 'middle' }),
  ].join(''));
};

const payRatioSvg = () => {
  const yBase = 220, scale = 1.2;   // 1 to 1 = 1.2 units: 125 to 1 = 150 units tall
  const bars = [[110, F.payRatio, BLUE, 'Now'], [230, F.payRatioAfter, RED, 'With the bonus']];
  return svg(300, [
    title('Chief executive pay ÷ median pay'),
    line(60, yBase, 350, yBase),
    ...bars.map(([x, v, c]) => rect(x, round(yBase - v * scale), 60, round(v * scale), { fill: c, stroke: c, rx: 3, sw: 1 })),
    ...bars.map(([x, v]) => t(x + 30, round(yBase - v * scale) - 8, ratio(v), { anchor: 'middle', weight: 600 })),
    ...bars.map(([x, , , lab]) => t(x + 30, yBase + LEAD, lab, { anchor: 'middle', fill: MUTED })),
    t(FRAME.w / 2, 284, `A ${rmm(F.bonus)} bonus widens the gap`, { anchor: 'middle' }),
  ].join(''));
};

export const ethicsDiagram = {
  id: id('diagram', 'profit and ethics trade off pay ratio'),
  title: 'Weighing Profit Against Ethics',
  description: `IAL 3.3.4 · 3a and 3b: what certified palm oil does to ${F.name}'s profit, and what the proposed bonus does to the gap between top and median pay.`,
  checklist: [
    `Certified oil: profit ${rmm(F.profit)} → ${rmm(F.profitWithOil)} a year`,
    `Pay: ${ratio(F.payRatio)} now, ${ratio(F.payRatioAfter)} with the ${rmm(F.bonus)} bonus`,
    'Size each trade-off before judging it',
  ],
  scenarios: [
    { label: 'Profit', svg: profitSvg() },
    { label: 'Pay ratio', svg: payRatioSvg() },
  ],
};

/* ── the array order IS the chapter order, and the runner derives pins from it ── */
export const DIAGRAMS = [cultureDiagram, formingDiagram, stakeholderDiagram, ethicsDiagram];
export const ALL_DIAGRAMS = DIAGRAMS;
