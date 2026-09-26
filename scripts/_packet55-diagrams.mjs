/**
 * PACKET 55 — global-marketing diagrams. FIVE, one pinned to each chapter by `diagramId`, every
 * figure read off `FIRM` rather than typed into the SVG.
 *
 * `topFix-04` asks for "a standardisation–adaptation spectrum or Ansoff grid diagram". Both are
 * drawn: the spectrum with the three approaches placed on it (chapter 1, 1a-1b), and Ansoff's grid
 * beside Porter's, each filled with Serana's own options (chapter 3, 1d). The other chapters draw
 * what their own leaves are about: which of the 4Ps stay global and which are adapted in Zarand
 * (1c), a niche that is small in each country and sizeable in total (2b), and the four cultural and
 * social considerations as questions to ask before launch (3a).
 *
 * THE CHECK-IN SHOWS THE CHAPTER'S DIAGRAM AND ONE QUIZ ITEM, the block's first pinned item
 * (`lib/checkin-placement.js`). Since PR #43 (origin/main) the question comes first; CONTENT-GATE
 * still has Verify A and B record leaks/clean. Each chapter's leading quiz item is written against
 * figures and wording this module does not print, and the runner re-checks it on the emitted SVG.
 *
 * Frame 400 wide, faces 15 (titles) and 12 (everything else), stacked rows 20 apart. Every colour is
 * a key of `PALETTE` in `components/learn-mode/processSvg.js` (the runner parses it).
 */
import { id, FIRM, units } from './_packet55-util.mjs';

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
/** A labelled box: a rect with up to three centred lines of text, 20 apart. */
const box = (x, y, w, h, lines, { stroke = GRID, fill = 'none', colour = INK } = {}) => {
  const cx = x + w / 2;
  const first = y + h / 2 - ((lines.length - 1) * LEAD) / 2 + 4;
  return rect(x, y, w, h, { stroke, fill }) + lines.map((s, i) => t(cx, first + i * LEAD, s, { anchor: 'middle', fill: i === 0 ? colour : MUTED, weight: i === 0 ? 600 : 400 })).join('');
};

/* ══ 1 · Global marketing strategy and approaches (1a, 1b) ═════════════════ */

const spectrumSvg = () => {
  const w = 120, gap = 4, x0 = 16, y = 118, h = 76;
  return svg(270, [
    arrowDefs([['sp', AXIS]]),
    title('From one mix to many'),
    line(40, 60, 360, 60, { marker: 'sp' }),
    line(360, 60, 40, 60, { marker: 'sp' }),
    t(24, 88, 'Same mix everywhere', { fill: MUTED }),
    t(376, 88, 'A mix per country', { fill: MUTED, anchor: 'end' }),
    box(x0, y, w, h, ['Ethnocentric', 'home mix', 'used abroad'], { stroke: BLUE, colour: BLUE }),
    box(x0 + w + gap, y, w, h, ['Geocentric', 'shared core', 'local edges'], { stroke: GREEN, colour: GREEN }),
    box(x0 + 2 * (w + gap), y, w, h, ['Polycentric', 'own mix in', 'each country'], { stroke: AMBER, colour: AMBER }),
    t(FRAME.w / 2, 226, 'Glocalisation: a global core with local changes', { anchor: 'middle' }),
    t(FRAME.w / 2, 250, 'Scale saving falls as local fit rises', { anchor: 'middle', fill: MUTED }),
  ].join(''));
};

export const approachesDiagram = {
  id: id('diagram', 'standardisation adaptation spectrum three approaches'),
  title: 'The Standardisation–Adaptation Spectrum',
  description: 'IAL 4.3.3 · 1a and 1b: the three marketing approaches placed between one mix for every country and a separate mix for each.',
  checklist: [
    'Ethnocentric sits at the standard end: the home mix is used abroad unchanged',
    'Polycentric sits at the adapted end: each country gets its own mix',
    'Geocentric shares a core and adapts the edges, which is where glocalisation sits',
    'Moving right buys local fit at the price of the scale saving',
  ],
  scenarios: [
    { label: 'The three approaches', svg: spectrumSvg() },
  ],
};

/* ══ 2 · The marketing mix in global markets (1c) ═══════════════════════════ */

const mixSvg = () => {
  const lx = 16, lw = 84, c1 = 104, c2 = 250, cw = 138, top = 70, rh = 40, step = 48;
  const rows = [
    ['Product', 'brand, formula', 'gel, no alcohol'],
    ['Price', 'premium position', 'set vs local rivals'],
    ['Place', 'own website', 'local distributor'],
    ['Promotion', 'global campaign', 'local tagline'],
  ];
  return svg(300, [
    title(`${F.name}'s mix in ${F.market}`),
    t(c1 + cw / 2, 58, 'Kept global', { anchor: 'middle', fill: BLUE, weight: 600 }),
    t(c2 + cw / 2, 58, 'Adapted', { anchor: 'middle', fill: AMBER, weight: 600 }),
    ...rows.flatMap(([p, keep, change], i) => {
      const y = top + i * step;
      return [
        t(lx, y + 25, p, { fill: MUTED, weight: 600 }),
        box(c1, y, cw, rh, [keep], { stroke: BLUE, colour: INK }),
        box(c2, y, cw, rh, [change], { stroke: AMBER, colour: INK }),
      ];
    }),
    t(FRAME.w / 2, 280, 'Each P is decided separately', { anchor: 'middle' }),
  ].join(''));
};

export const mixDiagram = {
  id: id('diagram', 'marketing mix kept global adapted zarand'),
  title: 'Standardise or Adapt, P by P',
  description: `IAL 4.3.3 · 1c: the 4Ps applied to a new global market, showing which parts of ${F.name}'s mix stay global in ${F.market} and which are adapted.`,
  checklist: [
    'The brand and core formula stay the same; the texture and ingredients are adapted',
    'Place follows how local buyers shop, so a distributor reaches the small shops',
    'Promotion keeps the global campaign and adds a local tagline',
    'Adapt a P only where the standard version would lose more than the change costs',
  ],
  scenarios: [
    { label: 'Kept or adapted', svg: mixSvg() },
  ],
};

/* ══ 3 · Ansoff and Porter applied to global marketing (1d) ═════════════════ */

const grid = (heading, cols, rows, cells) => {
  const x0 = 96, cw = 148, y0 = 66, rh = 84, gap = 4;
  return svg(290, [
    title(heading),
    ...cols.map((c, i) => t(x0 + i * (cw + gap) + cw / 2, 56, c, { anchor: 'middle', fill: MUTED, weight: 600 })),
    ...rows.flatMap((r, j) => r.map((ln, k) => t(12, y0 + j * (rh + gap) + 36 + k * LEAD, ln, { fill: MUTED, weight: 600 }))),
    ...cells.map(([ci, ri, lines, colour]) => box(x0 + ci * (cw + gap), y0 + ri * (rh + gap), cw, rh, lines, { stroke: colour, colour })),
    t(FRAME.w / 2, 278, cells.caption, { anchor: 'middle' }),
  ].join(''));
};

const ansoffSvg = () => {
  const cells = [
    [0, 0, ['Market penetration', 'more ads where sold'], BLUE],
    [1, 0, ['Product development', 'new sun range'], PURPLE],
    [0, 1, ['Market development', `moisturiser to ${F.market}`], GREEN],
    [1, 1, ['Diversification', `hair care in ${F.market}`], RED],
  ];
  cells.caption = 'Risk rises as more becomes new';
  return grid(`Ansoff: ${F.name}'s options`, ['Existing product', 'New product'], [['Existing', 'markets'], ['New', 'country']], cells);
};

const porterSvg = () => {
  const cells = [
    [0, 0, ['Cost leadership', 'lowest-cost supplier'], BLUE],
    [1, 0, ['Differentiation', 'premium global brand'], PURPLE],
    [0, 1, ['Cost focus', 'cheapest for a group'], CYAN],
    [1, 1, ['Differentiation focus', 'the halal serum'], GREEN],
  ];
  cells.caption = 'Lower cost or difference, broad or narrow';
  return grid('Porter: how to compete abroad', ['Lower cost', 'Difference'], [['Broad', 'target'], ['One', 'group']], cells);
};

export const matricesDiagram = {
  id: id('diagram', 'ansoff porter global marketing decisions'),
  title: 'Ansoff and Porter Applied Abroad',
  description: `IAL 4.3.3 · 1d: Ansoff's matrix and Porter's Strategic Matrix applied to ${F.name}'s global marketing decisions.`,
  checklist: [
    'Ansoff: find the cell by asking which is new, the product or the country',
    'An existing product taken to a new country is market development, even with a new label',
    'Porter: the advantage is lower cost or difference; the target is broad or one group',
    'Use Ansoff for where to grow and Porter for how to compete there',
  ],
  scenarios: [
    { label: 'Ansoff\'s matrix', svg: ansoffSvg() },
    { label: 'Porter\'s matrix', svg: porterSvg() },
  ],
};

/* ══ 4 · Global niche markets (2a-2c) ═══════════════════════════════════════ */

const nicheSvg = () => {
  const yBase = 200, scale = 120 / 60_000, bw = 44, x0 = 50, stepX = 64;
  const colours = [BLUE, GREEN, AMBER, PURPLE, CYAN];
  return svg(290, [
    title('One niche, five countries'),
    line(36, yBase, 370, yBase),
    ...F.nicheCountries.map((n, i) => {
      const x = x0 + i * stepX, h = Math.round(n * scale * 10) / 10;
      return rect(x, yBase - h, bw, h, { fill: colours[i], stroke: colours[i], rx: 3, sw: 1 })
        + t(x + bw / 2, yBase - h - 8, units(n), { anchor: 'middle' })
        + t(x + bw / 2, yBase + LEAD, `Country ${i + 1}`, { anchor: 'middle', fill: MUTED });
    }),
    t(FRAME.w / 2, yBase + LEAD * 2 + 10, `Small in each country; ${units(F.nicheBuyers)} buyers in total`, { anchor: 'middle', weight: 600 }),
    t(FRAME.w / 2, yBase + LEAD * 3 + 10, 'One product serves the whole group', { anchor: 'middle', fill: MUTED }),
  ].join(''));
};

export const nicheDiagram = {
  id: id('diagram', 'global niche small in each country total'),
  title: 'A Global Niche: Small Everywhere, Sizeable in Total',
  description: `IAL 4.3.3 · 2b: the likely buyers of ${F.name}'s halal-certified, alcohol-free serum in five countries.`,
  checklist: [
    'No single country holds enough buyers to justify a mass-market launch',
    `Added across borders, the group is ${units(F.nicheBuyers)} buyers`,
    'The same specialised product serves all of them',
    'Few rivals target a group this thin in any one country',
  ],
  scenarios: [
    { label: 'Buyers by country', svg: nicheSvg() },
  ],
};

/* ══ 5 · Cultural and social factors (3a) ═══════════════════════════════════ */

const checksSvg = () => {
  const w = 180, h = 76, x1 = 16, x2 = 204, y1 = 50, y2 = 138;
  return svg(260, [
    title('Four checks before a launch abroad'),
    box(x1, y1, w, h, ['Cultural differences', 'Is it acceptable?'], { stroke: RED, colour: RED }),
    box(x2, y1, w, h, ['Tastes and preferences', 'Is it wanted?'], { stroke: AMBER, colour: AMBER }),
    box(x1, y2, w, h, ['Language', 'What could it mean?'], { stroke: BLUE, colour: BLUE }),
    box(x2, y2, w, h, ['Branding and promotion', 'Could it offend?'], { stroke: PURPLE, colour: PURPLE }),
    t(FRAME.w / 2, 240, 'A condition to meet, or a trade-off to weigh', { anchor: 'middle' }),
  ].join(''));
};

export const cultureDiagram = {
  id: id('diagram', 'four cultural social considerations checks'),
  title: 'Cultural and Social Considerations',
  description: 'IAL 4.3.3 · 3a: the four cultural and social considerations for a business marketing abroad, each as a question to answer before launch.',
  checklist: [
    'Cultural differences decide whether a product or image is acceptable at all',
    'Tastes and preferences decide whether an acceptable product is wanted',
    'A name, slogan or instruction can mean something unplanned in another language',
    'Colours, symbols, images and timing can offend even when the words are right',
  ],
  scenarios: [
    { label: 'The four considerations', svg: checksSvg() },
  ],
};

/* ── the array order IS the chapter order, and the runner derives pins from it ── */
export const DIAGRAMS = [approachesDiagram, mixDiagram, matricesDiagram, nicheDiagram, cultureDiagram];
export const ALL_DIAGRAMS = DIAGRAMS;
