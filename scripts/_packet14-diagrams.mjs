/**
 * PACKET 14 — decision-making-techniques: the five diagrams, one per chapter, pinned by id.
 *
 * Conventions from the live census (14 September): a 500-unit-wide viewBox, labels authored at 9-13
 * units (the phone sheet draws the diagram at 220vw, so 9 units is 15px at 390px), colours taken
 * from the palette components/learn-mode/processSvg.js remaps onto theme tokens, strokes ≥ 2. Text
 * is placed from the geometry of the lines it names; nothing sits on a line.
 *
 * Every figure drawn here is the figure the body text works: the six-month series and its moving
 * averages, the 2.8-year payback, the cold-brew tree ($340,000 / $200,000 EMVs, $140,000 / $180,000
 * net gains), the six-activity network (A-B-D-F, 10 days, float 2 on C and E) and the $6 cold brew
 * with its $3.50 contribution. A student who reads one and then the other meets the same numbers.
 */
import { id } from './_packet14-util.mjs';

const INK = '#e8ecf5', AXIS = '#94a3b8', GRID = '#475569', MUTED = '#7a8299';
const BLUE = '#3b82f6', GREEN = '#059669', RED = '#ef4444', AMBER = '#f59e0b', PURPLE = '#8b5cf6', ORANGE = '#fb923c';
const FONT = "font-family=\"'DM Sans',system-ui,sans-serif\"";
const open = (h = 350) => `<svg width="500" height="${h}" viewBox="0 0 500 ${h}" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',system-ui,sans-serif;background:transparent"><defs><marker id="arr" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="${AXIS}"/></marker><marker id="arrRed" markerWidth="9" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="${RED}"/></marker><marker id="arrBlue" markerWidth="9" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="${BLUE}"/></marker></defs>`;
const close = '</svg>';
const t = (x, y, text, { size = 10, fill = INK, anchor = 'start', weight = 400, cls = '', rotate = null } = {}) =>
  `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}"${cls ? ` class="${cls}"` : ''}${rotate ? ` transform="rotate(${rotate},${x},${y})"` : ''}>${text}</text>`;
const line = (x1, y1, x2, y2, stroke, w = 2, extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${w}"${extra}/>`;
const dash = ' stroke-dasharray="6,4"';
const r2 = (n) => Math.round(n * 10) / 10;

/* ── 1a. Time series with a three-period moving average and an extrapolated trend ── */
function timeSeriesSvg() {
  const sales = [40, 46, 43, 48, 54, 50, 56, 62, 58, 64, 70, 66];
  const X = (m) => r2(70 + (m - 1) * (400 / 13));       // months 1..14 across 70..470
  const Y = (v) => r2(300 - (v - 30) * 5.2);            // 30..80 up 300..40
  const ma = sales.slice(1, -1).map((_, i) => (sales[i] + sales[i + 1] + sales[i + 2]) / 3); // months 2..11
  const salesPts = sales.map((v, i) => `${X(i + 1)},${Y(v)}`).join(' ');
  const maPts = ma.map((v, i) => `${X(i + 2)},${Y(v)}`).join(' ');
  // trend through the first and last moving averages, extended to month 14
  const x0 = X(2), y0 = Y(ma[0]), x1 = X(11), y1 = Y(ma[ma.length - 1]);
  const slope = (y1 - y0) / (x1 - x0);
  const xe = X(14), ye = r2(y1 + slope * (xe - x1));
  const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D', 'J', 'F'];
  let s = open();
  s += `<rect x="${X(12) + 15}" y="40" width="${480 - X(12) - 15}" height="260" fill="${GRID}" opacity="0.18"/>`;
  s += t(r2((X(12) + 15 + 480) / 2), 54, 'Forecast', { size: 9, fill: MUTED, anchor: 'middle' });
  s += line(70, 300, 480, 300, AXIS, 2.5, ' marker-end="url(#arr)"') + line(70, 300, 70, 30, AXIS, 2.5, ' marker-end="url(#arr)"');
  for (const v of [40, 50, 60, 70, 80]) s += line(70, Y(v), 480, Y(v), GRID, 1, ' stroke-dasharray="2,4" opacity="0.6"') + t(62, Y(v) + 4, String(v), { size: 9, fill: AXIS, anchor: 'end' });
  months.forEach((m, i) => { s += t(X(i + 1), 314, m, { size: 9, fill: AXIS, anchor: 'middle' }); });
  s += t(275, 336, 'Month', { size: 11, fill: AXIS, anchor: 'middle', weight: 700 });
  s += t(26, 170, 'Sales (000 cups)', { size: 11, fill: AXIS, anchor: 'middle', weight: 700, rotate: -90 });
  s += `<polyline points="${salesPts}" fill="none" stroke="${BLUE}" stroke-width="2.5"/>`;
  sales.forEach((v, i) => { s += `<circle cx="${X(i + 1)}" cy="${Y(v)}" r="3.5" fill="${BLUE}"/>`; });
  s += `<polyline points="${maPts}" fill="none" stroke="${AMBER}" stroke-width="3"/>`;
  s += line(x1, y1, xe, ye, RED, 2.5, dash);
  // legend, top-left, where the lines sit low
  s += line(84, 52, 108, 52, BLUE, 2.5) + t(114, 56, 'Actual monthly sales', { size: 10 });
  s += line(84, 70, 108, 70, AMBER, 3) + t(114, 74, 'Three-period moving average', { size: 10 });
  s += line(84, 88, 108, 88, RED, 2.5, dash) + t(114, 92, 'Trend, extended into the future', { size: 10 });
  s += t(114, 108, 'February = (40 + 46 + 43) ÷ 3 = 43.0', { size: 9, fill: MUTED });
  return s + close;
}

/* ── 1b. Scatter graph with a line of best fit and an extrapolation ── */
function scatterSvg() {
  // residuals against the drawn line (110 + 4.4x): −8, +12, −10, +8, −12, +10, −6, +14, −8 — they sum to zero and
  // split four above / five below, so the picture shows the rule the text states. Least squares on these nine
  // points gives 108.7 + 4.45x, the drawn line to within a unit at every x.
  const pts = [[5, 124], [10, 166], [15, 166], [20, 206], [25, 208], [30, 252], [35, 258], [40, 300], [45, 300]];
  const X = (x) => r2(70 + 8 * x);                       // spend 0..50 across 70..470
  const Y = (v) => r2(300 - (v - 100) * (260 / 300));    // sales 100..400 up 300..40
  const fit = (x) => 110 + 4.4 * x;
  let s = open();
  s += line(70, 300, 480, 300, AXIS, 2.5, ' marker-end="url(#arr)"') + line(70, 300, 70, 30, AXIS, 2.5, ' marker-end="url(#arr)"');
  for (const x of [0, 10, 20, 30, 40, 50]) s += t(X(x), 314, `$${x}k`, { size: 9, fill: AXIS, anchor: 'middle' });
  for (const v of [100, 200, 300, 400]) s += line(70, Y(v), 480, Y(v), GRID, 1, ' stroke-dasharray="2,4" opacity="0.6"') + t(62, Y(v) + 4, `$${v}k`, { size: 9, fill: AXIS, anchor: 'end' });
  s += t(275, 336, 'Advertising spend per month', { size: 11, fill: AXIS, anchor: 'middle', weight: 700 });
  s += t(26, 170, 'Sales per month', { size: 11, fill: AXIS, anchor: 'middle', weight: 700, rotate: -90 });
  // reading a forecast at $50k
  s += line(X(50), 300, X(50), Y(fit(50)), MUTED, 1.5, dash) + line(X(50), Y(fit(50)), 70, Y(fit(50)), MUTED, 1.5, dash);
  s += line(70, Y(fit(0)), X(45), Y(fit(45)), GREEN, 3) + line(X(45), Y(fit(45)), X(50), Y(fit(50)), RED, 2.5, dash);
  pts.forEach(([x, v]) => { s += `<circle cx="${X(x)}" cy="${Y(v)}" r="4" fill="${BLUE}"/>`; });
  s += t(76, Y(fit(50)) + 14, 'Forecast: about $330k of sales at $50k of spend', { size: 9, fill: RED, weight: 700 });
  s += t(330, 62, 'Positive correlation', { size: 11, weight: 700 });
  s += `<circle cx="96" cy="52" r="4" fill="${BLUE}"/>` + t(106, 56, 'One dot per month', { size: 10 });
  s += line(84, 70, 108, 70, GREEN, 3) + t(114, 74, 'Line of best fit', { size: 10 });
  s += line(84, 88, 108, 88, RED, 2.5, dash) + t(114, 92, 'Extrapolation beyond the data', { size: 10 });
  return s + close;
}

/* ── 2. Cumulative cash flow and the payback point ── */
function paybackSvg() {
  const cum = [-120, -80, -40, 10, 60];
  const X = (yr) => 90 + yr * 90;
  const Y = (v) => r2(300 - (v + 140) * (240 / 220));
  const pts = cum.map((v, i) => `${X(i)},${Y(v)}`).join(' ');
  const xPay = X(2) + 0.8 * 90;
  let s = open();
  s += t(250, 44, 'Oven: cost $120,000; net cash inflows $40k, $40k, $50k, $50k', { size: 10, fill: MUTED, anchor: 'middle' });
  for (const v of [-120, -80, -40, 0, 40, 80]) s += line(70, Y(v), 470, Y(v), v === 0 ? AXIS : GRID, v === 0 ? 2 : 1, v === 0 ? '' : ' stroke-dasharray="2,4" opacity="0.6"') + t(62, Y(v) + 4, `${v < 0 ? '−' : v > 0 ? '+' : ''}$${Math.abs(v)}k`, { size: 9, fill: AXIS, anchor: 'end' });
  s += line(70, 300, 470, 300, AXIS, 2) + line(70, 300, 70, 30, AXIS, 2.5, ' marker-end="url(#arr)"');
  for (let yr = 0; yr <= 4; yr++) s += t(X(yr), 316, String(yr), { size: 10, fill: AXIS, anchor: 'middle' });
  s += t(470, 336, 'Year', { size: 11, fill: AXIS, anchor: 'end', weight: 700 });
  s += t(26, 165, 'Cumulative net cash flow', { size: 11, fill: AXIS, anchor: 'middle', weight: 700, rotate: -90 });
  s += `<polyline points="${pts}" fill="none" stroke="${BLUE}" stroke-width="3"/>`;
  cum.forEach((v, i) => { s += `<circle cx="${X(i)}" cy="${Y(v)}" r="4.5" fill="${BLUE}"/>` + t(X(i) + (i === 0 ? 8 : 0), Y(v) + (v < 0 ? 18 : -10), `${v < 0 ? '−' : '+'}$${Math.abs(v)}k`, { size: 10, anchor: i === 0 ? 'start' : 'middle', weight: 700 }); });
  s += `<circle cx="${r2(xPay)}" cy="${Y(0)}" r="6" fill="${RED}"/>` + line(r2(xPay), Y(0), r2(xPay), 300, RED, 2, dash);
  s += t(r2(xPay) - 8, 336, 'Payback = 2 + 40 ÷ 50 = 2.8 years', { size: 11, fill: RED, anchor: 'end', weight: 700 });
  s += t(r2(xPay) + 12, Y(0) + 34, 'The line crosses zero here:', { size: 9, fill: MUTED }) + t(r2(xPay) + 12, Y(0) + 46, 'the cost is recovered', { size: 9, fill: MUTED });
  return s + close;
}

/* ── 3. The cold-brew decision tree, rolled back ── */
function treeSvg() {
  let s = open();
  const sq = { x: 55, y: 170 };
  const A = { x: 220, y: 100 }, B = { x: 220, y: 240 };
  s += `<rect x="${sq.x - 11}" y="${sq.y - 11}" width="22" height="22" fill="${PURPLE}"/>`;
  s += line(sq.x + 11, sq.y, A.x - 13, A.y, AXIS, 2.5) + line(sq.x + 11, sq.y, B.x - 13, B.y, AXIS, 2.5);
  s += `<circle cx="${A.x}" cy="${A.y}" r="13" fill="${AMBER}"/>` + `<circle cx="${B.x}" cy="${B.y}" r="13" fill="${AMBER}"/>`;
  const ends = [[400, 58], [400, 142], [400, 198], [400, 282]];
  s += line(A.x + 13, A.y, ends[0][0], ends[0][1], GREEN, 2.5) + line(A.x + 13, A.y, ends[1][0], ends[1][1], GREEN, 2.5);
  s += line(B.x + 13, B.y, ends[2][0], ends[2][1], GREEN, 2.5) + line(B.x + 13, B.y, ends[3][0], ends[3][1], GREEN, 2.5);
  ends.forEach(([x, y]) => { s += `<circle cx="${x}" cy="${y}" r="4" fill="${GREEN}"/>`; });
  // option branches
  s += t(120, 168, 'Launch cold brew', { size: 10, weight: 700 }) + t(120, 180, 'cost $200,000', { size: 10, fill: MUTED });
  s += t(72, 232, 'Licence the recipe', { size: 10, weight: 700 }) + t(72, 244, 'cost $20,000', { size: 10, fill: MUTED });
  // chance branches
  s += t(300, 68, 'High demand 0.6', { size: 10 }) + t(300, 138, 'Low demand 0.4', { size: 10 });
  s += t(300, 208, 'Strong uptake 0.5', { size: 10 }) + t(300, 278, 'Weak uptake 0.5', { size: 10 });
  // payoffs
  s += t(410, 62, '$500,000', { size: 11, weight: 700 }) + t(410, 146, '$100,000', { size: 11, weight: 700 });
  s += t(410, 202, '$250,000', { size: 11, weight: 700 }) + t(410, 286, '$150,000', { size: 11, weight: 700 });
  // EMV and net gain
  s += t(220, 140, 'EMV $340,000', { size: 10, fill: AMBER, anchor: 'middle', weight: 700 }) + t(220, 153, 'net gain $140,000', { size: 10, anchor: 'middle' });
  s += t(220, 284, 'EMV $200,000', { size: 10, fill: AMBER, anchor: 'middle', weight: 700 }) + t(220, 297, 'net gain $180,000 ✓', { size: 10, fill: GREEN, anchor: 'middle', weight: 700 });
  // the three labels the drill can ask for
  s += t(55, 204, 'Decision node', { size: 10, fill: PURPLE, anchor: 'middle', weight: 700, cls: 'draggable' });
  s += t(220, 78, 'Chance node', { size: 10, fill: AMBER, anchor: 'middle', weight: 700, cls: 'draggable' });
  s += t(445, 40, 'Payoffs', { size: 10, fill: GREEN, anchor: 'middle', weight: 700, cls: 'draggable' });
  s += t(250, 330, 'Roll back from the right: EMV at each circle, net gain = EMV − cost, choose at the square', { size: 9, fill: MUTED, anchor: 'middle' });
  return s + close;
}

/* ── 4. The fit-out network, completed ── */
function networkSvg() {
  let s = open();
  const N = { 1: [55, 175], 2: [165, 175], 3: [275, 95], 4: [275, 255], 5: [385, 175], 6: [465, 175] };
  const vals = { 1: [0, 0], 2: [2, 2], 3: [5, 5], 4: [4, 6], 5: [9, 9], 6: [10, 10] };
  const R = 22;
  const arrow = (a, b, critical) => {
    const [x1, y1] = N[a], [x2, y2] = N[b];
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy);
    const ux = dx / len, uy = dy / len;
    return line(r2(x1 + R * ux), r2(y1 + R * uy), r2(x2 - R * ux), r2(y2 - R * uy), critical ? RED : BLUE, critical ? 3.5 : 2.5, critical ? ' marker-end="url(#arrRed)"' : ' marker-end="url(#arrBlue)"');
  };
  s += arrow(1, 2, true) + arrow(2, 3, true) + arrow(2, 4, false) + arrow(3, 5, true) + arrow(4, 5, false) + arrow(5, 6, true);
  for (const [n, [cx, cy]] of Object.entries(N)) {
    s += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${AXIS}" stroke-width="2"/>`;
    s += line(cx - R, cy, cx + R, cy, AXIS, 1.5) + line(cx, cy, cx, cy + R, AXIS, 1.5);
    s += t(cx, cy - 6, n, { size: 11, anchor: 'middle', weight: 700 });
    s += t(cx - 10, cy + 15, String(vals[n][0]), { size: 10, anchor: 'middle', weight: 700, fill: GREEN }) + t(cx + 10, cy + 15, String(vals[n][1]), { size: 10, anchor: 'middle', weight: 700, fill: ORANGE });
  }
  s += t(110, 164, 'A (2)', { size: 10, anchor: 'middle', weight: 700, fill: RED });
  s += t(200, 122, 'B (3)', { size: 10, anchor: 'middle', weight: 700, fill: RED });
  s += t(200, 236, 'C (2)', { size: 10, anchor: 'middle', weight: 700, fill: BLUE }) + t(200, 248, 'float 2', { size: 9, anchor: 'middle', fill: MUTED });
  s += t(350, 122, 'D (4)', { size: 10, anchor: 'middle', weight: 700, fill: RED });
  s += t(350, 236, 'E (3)', { size: 10, anchor: 'middle', weight: 700, fill: BLUE }) + t(350, 248, 'float 2', { size: 9, anchor: 'middle', fill: MUTED });
  s += t(425, 164, 'F (1)', { size: 10, anchor: 'middle', weight: 700, fill: RED });
  // key
  s += t(40, 40, 'Node: number on top, EST bottom-left, LFT bottom-right', { size: 10 });
  s += t(40, 56, 'Activity (duration in days). Red arrows: the critical path, zero float', { size: 9, fill: MUTED });
  s += t(250, 330, 'Critical path A–B–D–F = 2 + 3 + 4 + 1 = 10 days; float = LFT − duration − EST', { size: 10, fill: RED, anchor: 'middle', weight: 700 });
  return s + close;
}

/* ── 5. Contribution: where the price goes ── */
function contributionSvg() {
  let s = open();
  const base = 280;
  const unitY = (d) => r2(base - d * 30);        // $1 = 30 units, per-cup bar
  const totY = (d) => r2(base - d * (180 / 70)); // $70,000 = 180 units, monthly bar
  s += line(60, base, 440, base, AXIS, 2);
  // per cup
  s += `<rect x="90" y="${unitY(2.5)}" width="80" height="${r2(2.5 * 30)}" fill="${RED}"/>`;
  s += `<rect x="90" y="${unitY(6)}" width="80" height="${r2(3.5 * 30)}" fill="${GREEN}"/>`;
  s += t(130, unitY(6) - 10, 'Selling price $6.00', { size: 11, anchor: 'middle', weight: 700 });
  s += t(130, 250, 'Variable cost', { size: 10, anchor: 'middle', fill: '#ffffff', weight: 700 }) + t(130, 263, '$2.50', { size: 10, anchor: 'middle', fill: '#ffffff', weight: 700 });
  s += t(130, 148, 'Contribution', { size: 10, anchor: 'middle', fill: '#ffffff', weight: 700 }) + t(130, 161, '$3.50', { size: 10, anchor: 'middle', fill: '#ffffff', weight: 700 });
  s += t(130, 300, 'Per cup', { size: 11, anchor: 'middle', fill: AXIS, weight: 700 });
  // monthly
  s += `<rect x="300" y="${totY(45)}" width="80" height="${r2(45 * 180 / 70)}" fill="${AMBER}"/>`;
  s += `<rect x="300" y="${totY(70)}" width="80" height="${r2(25 * 180 / 70)}" fill="${BLUE}"/>`;
  s += t(340, totY(70) - 10, 'Total contribution $70,000', { size: 11, anchor: 'middle', weight: 700 });
  s += t(340, 218, 'Fixed costs', { size: 10, anchor: 'middle', fill: '#ffffff', weight: 700 }) + t(340, 231, '$45,000', { size: 10, anchor: 'middle', fill: '#ffffff', weight: 700 });
  s += t(340, 128, 'Profit', { size: 10, anchor: 'middle', fill: '#ffffff', weight: 700 }) + t(340, 141, '$25,000', { size: 10, anchor: 'middle', fill: '#ffffff', weight: 700 });
  s += t(340, 300, '20,000 cups a month', { size: 11, anchor: 'middle', fill: AXIS, weight: 700 });
  s += line(172, 150, 296, 150, AXIS, 2, ' marker-end="url(#arr)"') + t(234, 142, '× 20,000 cups', { size: 10, anchor: 'middle', fill: MUTED });
  s += t(250, 330, 'Contribution pays the fixed costs first; whatever is left is profit', { size: 10, fill: MUTED, anchor: 'middle' });
  return s + close;
}

const diagram = (title, description, checklist, svgOrScenarios) => ({
  id: id('diagram', title), title, description, checklist,
  ...(Array.isArray(svgOrScenarios) ? { scenarios: svgOrScenarios, svg: svgOrScenarios[0].svg } : { svg: svgOrScenarios }),
});

export const DIAGRAMS = [
  diagram('Sales Forecasting: Moving Average and Trend',
    'Kopi Kita\'s monthly sales (blue), the three-period moving average that smooths them (amber) and the trend extended two months into the future (red). The second view plots sales against advertising spend, with the line of best fit and an extrapolated forecast.',
    ['Axes labelled with the variable and its units', 'Each moving average plotted against the middle period of the three it averages', 'The trend line drawn through the smoothed figures, then extended as a dashed line', 'On the scatter graph, the line of best fit balances the dots above and below it', 'Extrapolation shown as a dashed extension beyond the last data point'],
    [{ label: 'Moving average and trend', svg: timeSeriesSvg() }, { label: 'Scatter graph and line of best fit', svg: scatterSvg() }]),
  diagram('Investment Appraisal: Cumulative Cash Flow and Payback',
    'The oven costs $120,000 and returns $40,000, $40,000, $50,000 and $50,000. The line tracks the cumulative net cash flow; where it crosses zero, 0.8 of the way through year 3, the cost has been recovered: payback is 2.8 years.',
    ['Year 0 starts at minus the initial cost', 'Each year adds that year\'s net cash inflow to the running total', 'The payback point is where the cumulative line crosses zero', 'The part-year is the amount still to recover divided by that year\'s inflow'],
    paybackSvg()),
  diagram('Decision Trees: Launch or Licence',
    'Kopi Kita\'s cold-brew decision. Squares are decisions, circles are chance events. Rolling back from the payoffs on the right: launching has the higher EMV ($340,000) but the higher cost, so licensing wins on net gain ($180,000 against $140,000).',
    ['Square for the decision node, circles for the chance nodes', 'Probabilities on the chance branches, adding up to 1 at each circle', 'The cost of each option on its branch from the square', 'Payoffs at the end of every outcome branch', 'EMV at each chance node and net gain (EMV minus cost) for each option, with the choice stated'],
    treeSvg()),
  diagram('Critical Path Analysis: The Fit-Out Network',
    'Six activities for fitting out a new branch, drawn activity-on-arrow. Each node shows its number, the earliest start time (bottom left, from the forward pass) and the latest finish time (bottom right, from the backward pass). The red route, A–B–D–F, is the critical path: 10 days, zero float. C and E each have two days of float.',
    ['Nodes numbered in order, each split into number, EST and LFT', 'Every activity drawn as an arrow with its letter and duration', 'Forward pass: EST is the highest of the routes arriving at a node', 'Backward pass: LFT is the lowest of the routes leaving a node', 'Critical path marked, with its length stated and every activity on it at zero float'],
    networkSvg()),
  diagram('Contribution: Where the Selling Price Goes',
    'One cold brew sells for $6.00; its variable cost is $2.50, so each cup contributes $3.50. At 20,000 cups a month the total contribution of $70,000 covers the $45,000 of fixed costs, and the $25,000 that remains is profit.',
    ['Contribution per unit = selling price − variable cost per unit', 'Total contribution = contribution per unit × units sold', 'Fixed costs are paid out of total contribution before any profit exists', 'Profit = total contribution − fixed costs'],
    contributionSvg()),
];
