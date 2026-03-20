import { supabase } from './_db.mjs';

/* ═══════════════════════════════════════════════════════════
 *  NEW DIAGRAM DESIGN STANDARD v2
 *
 *  Matching textbook-quality reference diagrams:
 *  ─ Bold white curves on dark background
 *  ─ Colored labeled points with circles + white letters
 *  ─ Numerical values on axes
 *  ─ Clean dashed reference lines
 *  ─ Shaded welfare/surplus areas
 *  ─ text.draggable class for interactive label drill
 * ═══════════════════════════════════════════════════════════ */

// ── Color palette for labeled points ──
const POINT = {
  pink:   '#f472b6',
  yellow: '#fbbf24',
  green:  '#34d399',
  cyan:   '#22d3ee',
  purple: '#a78bfa',
  red:    '#f87171',
  orange: '#fb923c',
  blue:   '#60a5fa',
};

// ── Standard colors ──
const AXIS   = '#94a3b8'; // Axis lines & labels
const CURVE  = '#e2e8f0'; // Main curve color (light/white)
const DASH   = '#475569'; // Dashed reference lines
const VALUE  = '#94a3b8'; // Axis values

const SVG_OPEN = (w = 500, h = 420) =>
  `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',system-ui,sans-serif;background:transparent">`;
const SVG_CLOSE = `</svg>`;

const MARKERS = `<defs>
  <marker id="arr" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="${AXIS}"/></marker>
</defs>`;

/* ── Coordinate mapping helpers ──
 * We define a "data space" for each diagram and map to SVG pixel space.
 * Plot area: x=[80, 450], y=[50, 330]
 */
const PLOT = { xMin: 80, xMax: 450, yMin: 50, yMax: 330 };

function makeMapper(dataXMin, dataXMax, dataYMin, dataYMax) {
  return {
    x: (v) => PLOT.xMin + ((v - dataXMin) / (dataXMax - dataXMin)) * (PLOT.xMax - PLOT.xMin),
    y: (v) => PLOT.yMax - ((v - dataYMin) / (dataYMax - dataYMin)) * (PLOT.yMax - PLOT.yMin),
  };
}

/* ── Standard axes ── */
function axes(xLabel, yLabel) {
  return `
  <line x1="${PLOT.xMin}" y1="${PLOT.yMax}" x2="${PLOT.xMax + 15}" y2="${PLOT.yMax}" stroke="${AXIS}" stroke-width="2.5" marker-end="url(#arr)"/>
  <line x1="${PLOT.xMin}" y1="${PLOT.yMax}" x2="${PLOT.xMin}" y2="${PLOT.yMin - 20}" stroke="${AXIS}" stroke-width="2.5" marker-end="url(#arr)"/>
  <text x="${(PLOT.xMin + PLOT.xMax) / 2}" y="${PLOT.yMax + 50}" fill="${AXIS}" font-size="14" font-weight="700" text-anchor="middle" letter-spacing="0.5">${xLabel.toUpperCase()}</text>
  <text x="${PLOT.xMin - 45}" y="${(PLOT.yMin + PLOT.yMax) / 2}" fill="${AXIS}" font-size="14" font-weight="700" text-anchor="middle" letter-spacing="0.5" transform="rotate(-90,${PLOT.xMin - 45},${(PLOT.yMin + PLOT.yMax) / 2})">${yLabel.toUpperCase()}</text>`;
}

/* ── Axis tick + value ── */
function xTick(m, dataVal, label) {
  const px = m.x(dataVal);
  label = label || String(dataVal);
  return `<line x1="${px}" y1="${PLOT.yMax}" x2="${px}" y2="${PLOT.yMax + 6}" stroke="${AXIS}" stroke-width="1.5"/>
  <text x="${px}" y="${PLOT.yMax + 22}" fill="${VALUE}" font-size="13" font-weight="600" text-anchor="middle">${label}</text>`;
}

function yTick(m, dataVal, label) {
  const py = m.y(dataVal);
  label = label || String(dataVal);
  return `<line x1="${PLOT.xMin}" y1="${py}" x2="${PLOT.xMin - 6}" y2="${py}" stroke="${AXIS}" stroke-width="1.5"/>
  <text x="${PLOT.xMin - 14}" y="${py + 5}" fill="${VALUE}" font-size="13" font-weight="600" text-anchor="end">${label}</text>`;
}

/* ── Dashed reference lines from a point to both axes ── */
function dashes(px, py) {
  return `<line x1="${px}" y1="${py}" x2="${PLOT.xMin}" y2="${py}" stroke="${DASH}" stroke-width="1.5" stroke-dasharray="6,4"/>
  <line x1="${px}" y1="${py}" x2="${px}" y2="${PLOT.yMax}" stroke="${DASH}" stroke-width="1.5" stroke-dasharray="6,4"/>`;
}

/* ── Labeled point (colored circle with white letter) ──
 * class="draggable" makes it interactive in drill mode */
function point(px, py, letter, color, draggable = true) {
  const cls = draggable ? ' class="draggable"' : '';
  return `<circle cx="${px}" cy="${py}" r="14" fill="${color}" stroke="${color}" stroke-width="2"/>
  <text x="${px}" y="${py + 5}" fill="#fff" font-size="14" font-weight="700" text-anchor="middle"${cls}>${letter}</text>`;
}

/* ── Curve label (text near a curve) ── */
function curveLabel(px, py, text, color = CURVE, draggable = true) {
  const cls = draggable ? ' class="draggable"' : '';
  return `<text x="${px}" y="${py}" fill="${color}" font-size="15" font-weight="700"${cls}>${text}</text>`;
}

/* ── Price/Quantity axis labels ── */
function pLabel(py, text, draggable = true) {
  const cls = draggable ? ' class="draggable"' : '';
  return `<text x="${PLOT.xMin - 14}" y="${py + 5}" fill="${VALUE}" font-size="13" font-weight="700" text-anchor="end"${cls}>${text}</text>`;
}

function qLabel(px, text, draggable = true) {
  const cls = draggable ? ' class="draggable"' : '';
  return `<text x="${px}" y="${PLOT.yMax + 22}" fill="${VALUE}" font-size="13" font-weight="700" text-anchor="middle"${cls}>${text}</text>`;
}

/* ═══════════════════════════════════════════════════════════
 * 1. PPF — BASE
 * Matching the reference with points B, C, D, E, F, A
 * ═══════════════════════════════════════════════════════════ */

function ppfBase() {
  // Data space: X=0..300 (consumer goods), Y=0..200 (capital goods)
  const m = makeMapper(0, 300, 0, 200);

  // PPF curve through: B(0,200), C(120,150), D(225,100), A(300,0)
  const B = { dx: 0, dy: 200 };
  const C = { dx: 120, dy: 150 };
  const D = { dx: 225, dy: 100 };
  const A = { dx: 300, dy: 0 };

  // Inefficient point E inside
  const E = { dx: 140, dy: 110 };
  // Unattainable point F outside
  const F = { dx: 200, dy: 145 };

  // SVG coords
  const bx = m.x(B.dx), by = m.y(B.dy);
  const cx = m.x(C.dx), cy = m.y(C.dy);
  const dx = m.x(D.dx), dy = m.y(D.dy);
  const ax = m.x(A.dx), ay = m.y(A.dy);
  const ex = m.x(E.dx), ey = m.y(E.dy);
  const fx = m.x(F.dx), fy = m.y(F.dy);

  // PPF curve: cubic bezier through the points
  // B(80,50) → C(228,120) → D(357,190) → A(450,330)
  const curve = `M ${bx} ${by} C ${bx + 60} ${by}, ${cx - 20} ${cy - 30}, ${cx} ${cy} S ${dx - 30} ${dy - 10}, ${dx} ${dy} S ${ax} ${ay - 40}, ${ax} ${ay}`;

  return `${SVG_OPEN(500, 420)}
  ${MARKERS}
  ${axes('Consumer Goods', 'Capital Goods')}

  <!-- Axis values -->
  ${yTick(m, 200, '200')}
  ${yTick(m, 150, '150')}
  ${yTick(m, 100, '100')}
  ${xTick(m, 120, '120')}
  ${xTick(m, 225, '225')}
  ${xTick(m, 300, '300')}

  <!-- Dashed reference lines from C and D -->
  ${dashes(cx, cy)}
  ${dashes(dx, dy)}

  <!-- PPF Curve -->
  <path d="${curve}" stroke="${CURVE}" stroke-width="3" fill="none"/>

  <!-- Points -->
  ${point(bx, by, 'B', POINT.pink)}
  ${point(cx, cy, 'C', POINT.yellow)}
  ${point(dx, dy, 'D', POINT.green)}
  ${point(ax, ay, 'A', POINT.red)}
  ${point(ex, ey, 'E', POINT.cyan)}
  ${point(fx, fy, 'F', POINT.purple)}

  <!-- Curve label -->
  ${curveLabel(380, cy - 25, 'PPF')}
${SVG_CLOSE}`;
}

/* ═══════════════════════════════════════════════════════════
 * 2. PPF — ECONOMIC GROWTH (Outward Shift)
 * ═══════════════════════════════════════════════════════════ */

function ppfGrowth() {
  const m = makeMapper(0, 350, 0, 250);

  // Original PPF (smaller)
  const origCurve = `M ${m.x(0)} ${m.y(200)} C ${m.x(60)} ${m.y(200)}, ${m.x(240)} ${m.y(100)}, ${m.x(300)} ${m.y(0)}`;
  // New PPF (shifted out)
  const newCurve  = `M ${m.x(0)} ${m.y(250)} C ${m.x(80)} ${m.y(250)}, ${m.x(290)} ${m.y(120)}, ${m.x(350)} ${m.y(0)}`;

  return `${SVG_OPEN(500, 420)}
  ${MARKERS}
  ${axes('Consumer Goods', 'Capital Goods')}

  <!-- Original PPF (dashed) -->
  <path d="${origCurve}" stroke="${DASH}" stroke-width="2" fill="none" stroke-dasharray="8,5"/>
  <text x="${m.x(260)}" y="${m.y(60) + 5}" fill="${VALUE}" font-size="12" class="draggable">PPF\u2081</text>

  <!-- New PPF -->
  <path d="${newCurve}" stroke="${CURVE}" stroke-width="3" fill="none"/>
  ${curveLabel(m.x(310), m.y(100) - 10, 'PPF\u2082')}

  <!-- Shift arrows -->
  <line x1="${m.x(160)}" y1="${m.y(140)}" x2="${m.x(200)}" y2="${m.y(175)}" stroke="${POINT.blue}" stroke-width="2.5" marker-end="url(#arr)"/>
  <line x1="${m.x(240)}" y1="${m.y(80)}" x2="${m.x(280)}" y2="${m.y(105)}" stroke="${POINT.blue}" stroke-width="2.5" marker-end="url(#arr)"/>

  <text x="${(PLOT.xMin + PLOT.xMax) / 2}" y="${PLOT.yMax + 70}" fill="${VALUE}" font-size="11" text-anchor="middle" opacity="0.7">More resources, better technology, or improved education shifts PPF outward</text>
${SVG_CLOSE}`;
}

/* ═══════════════════════════════════════════════════════════
 * 3. PPF — INEFFICIENT ALLOCATION
 * ═══════════════════════════════════════════════════════════ */

function ppfInefficient() {
  const m = makeMapper(0, 300, 0, 200);

  const curve = `M ${m.x(0)} ${m.y(200)} C ${m.x(50)} ${m.y(200)}, ${m.x(250)} ${m.y(100)}, ${m.x(300)} ${m.y(0)}`;
  const fillPath = `${curve} L ${m.x(300)} ${PLOT.yMax} L ${PLOT.xMin} ${PLOT.yMax} Z`;

  const X = { dx: 150, dy: 80 };
  const xx = m.x(X.dx), xy = m.y(X.dy);

  return `${SVG_OPEN(500, 420)}
  ${MARKERS}
  ${axes('Consumer Goods', 'Capital Goods')}

  <!-- Shaded inefficient region -->
  <path d="${fillPath}" fill="${POINT.red}" opacity="0.06"/>

  <!-- PPF Curve -->
  <path d="${curve}" stroke="${CURVE}" stroke-width="3" fill="none"/>
  ${curveLabel(m.x(260), m.y(120) - 15, 'PPF')}

  <!-- Point X (inefficient) -->
  ${point(xx, xy, 'X', POINT.red)}

  <!-- Arrows showing potential movement -->
  <line x1="${xx}" y1="${xy - 20}" x2="${xx}" y2="${m.y(140)}" stroke="${POINT.cyan}" stroke-width="2.5" stroke-dasharray="6,4" marker-end="url(#arr)"/>
  <text x="${xx + 18}" y="${(xy + m.y(140)) / 2}" fill="${POINT.cyan}" font-size="11" font-weight="600" class="draggable">More capital</text>

  <line x1="${xx + 20}" y1="${xy}" x2="${m.x(230)}" y2="${xy}" stroke="${POINT.cyan}" stroke-width="2.5" stroke-dasharray="6,4" marker-end="url(#arr)"/>
  <text x="${(xx + m.x(230)) / 2}" y="${xy + 22}" fill="${POINT.cyan}" font-size="11" font-weight="600" class="draggable">More consumer</text>

  <text x="${(PLOT.xMin + PLOT.xMax) / 2}" y="${PLOT.yMax + 70}" fill="${VALUE}" font-size="11" text-anchor="middle" opacity="0.7">Unemployment or misallocation places the economy inside the PPF</text>
${SVG_CLOSE}`;
}

/* ═══════════════════════════════════════════════════════════
 * 4. NEGATIVE EXTERNALITY — matching reference diagram
 * ═══════════════════════════════════════════════════════════ */

function negativeExternality() {
  const m = makeMapper(0, 100, 0, 100);

  // Lines in data space:
  // MPC (supply): y = 10 + 0.8x  → (0,10) to (100,90)
  // MSC: y = 30 + 0.8x           → (0,30) to (100,110) — parallel, above MPC
  // D = MPB = MSB: y = 90 - 0.7x → (0,90) to (100,20)

  // Market eq (MPC=D): 10+0.8x = 90-0.7x → 1.5x=80 → x=53.3, y=52.7
  const Qe = 53.3, Pe = 52.7;
  // Social opt (MSC=D): 30+0.8x = 90-0.7x → 1.5x=60 → x=40, y=62
  const Qopt = 40, Popt = 62;
  // MSC at Qe: 30 + 0.8*53.3 = 72.6
  const mscAtQe = 72.6;

  return `${SVG_OPEN(500, 440)}
  ${MARKERS}
  ${axes('Output (Units)', 'Costs and Benefits (\u00A3)')}

  <!-- MPC line -->
  <line x1="${m.x(0)}" y1="${m.y(10)}" x2="${m.x(95)}" y2="${m.y(86)}" stroke="${POINT.blue}" stroke-width="3"/>
  ${curveLabel(m.x(88), m.y(90) - 5, 'MPC', POINT.blue)}

  <!-- MSC line -->
  <line x1="${m.x(0)}" y1="${m.y(30)}" x2="${m.x(88)}" y2="${m.y(100)}" stroke="${POINT.red}" stroke-width="3"/>
  ${curveLabel(m.x(78), m.y(100) - 12, 'MSC', POINT.red)}

  <!-- D = MPB = MSB -->
  <line x1="${m.x(0)}" y1="${m.y(90)}" x2="${m.x(95)}" y2="${m.y(23)}" stroke="${POINT.green}" stroke-width="3"/>
  ${curveLabel(m.x(70), m.y(15), 'D = MPB = MSB', POINT.green)}

  <!-- Welfare loss triangle -->
  <polygon points="${m.x(Qopt)},${m.y(Popt)} ${m.x(Qe)},${m.y(Pe)} ${m.x(Qe)},${m.y(mscAtQe)}" fill="${POINT.orange}" opacity="0.25" stroke="${POINT.orange}" stroke-width="2"/>
  <text x="${m.x(Qe) + 20}" y="${m.y((Pe + mscAtQe) / 2) + 4}" fill="${POINT.orange}" font-size="12" font-weight="700" class="draggable">WELFARE</text>
  <text x="${m.x(Qe) + 20}" y="${m.y((Pe + mscAtQe) / 2) + 18}" fill="${POINT.orange}" font-size="12" font-weight="700" class="draggable">LOSS</text>

  <!-- Negative externality bracket -->
  <line x1="${m.x(Qopt) + 20}" y1="${m.y(Popt)}" x2="${m.x(Qopt) + 20}" y2="${m.y(Popt - 20)}" stroke="${CURVE}" stroke-width="2"/>
  <text x="${m.x(Qopt) + 30}" y="${m.y(Popt - 8)}" fill="${CURVE}" font-size="11" font-weight="700" class="draggable">NEGATIVE</text>
  <text x="${m.x(Qopt) + 30}" y="${m.y(Popt - 14)}" fill="${CURVE}" font-size="11" font-weight="700" class="draggable">EXTERNALITY</text>

  <!-- Reference lines for Qopt -->
  ${dashes(m.x(Qopt), m.y(Popt))}
  ${pLabel(m.y(Popt), 'P\u2092\u209A\u209C')}
  ${qLabel(m.x(Qopt), 'Q\u2092\u209A\u209C')}

  <!-- Reference lines for Qe -->
  ${dashes(m.x(Qe), m.y(Pe))}
  ${pLabel(m.y(Pe), 'P\u2091')}
  ${qLabel(m.x(Qe), 'Q\u2091')}

  <!-- Equilibrium points -->
  <circle cx="${m.x(Qopt)}" cy="${m.y(Popt)}" r="5" fill="${POINT.orange}"/>
  <circle cx="${m.x(Qe)}" cy="${m.y(Pe)}" r="5" fill="${POINT.blue}"/>
${SVG_CLOSE}`;
}

/* ═══════════════════════════════════════════════════════════
 * 5. POSITIVE EXTERNALITY
 * ═══════════════════════════════════════════════════════════ */

function positiveExternality() {
  const m = makeMapper(0, 100, 0, 100);

  // S = MPC = MSC: y = 10 + 0.8x
  // D = MPB: y = 85 - 0.7x     → (0,85) to (100,15)
  // MSB: y = 100 - 0.7x        → (0,100) to (100,30) — above MPB

  // Market eq (S=MPB): 10+0.8x = 85-0.7x → 1.5x=75 → x=50, y=50
  const Qm = 50, Pm = 50;
  // Social opt (S=MSB): 10+0.8x = 100-0.7x → 1.5x=90 → x=60, y=58
  const Qopt = 60, Popt = 58;
  // MPB at Qopt: 85 - 0.7*60 = 43
  const mpbAtQopt = 43;

  return `${SVG_OPEN(500, 440)}
  ${MARKERS}
  ${axes('Output (Units)', 'Costs and Benefits (\u00A3)')}

  <!-- S = MPC = MSC -->
  <line x1="${m.x(0)}" y1="${m.y(10)}" x2="${m.x(95)}" y2="${m.y(86)}" stroke="${POINT.blue}" stroke-width="3"/>
  ${curveLabel(m.x(82), m.y(82), 'S = MPC = MSC', POINT.blue)}

  <!-- D = MPB -->
  <line x1="${m.x(0)}" y1="${m.y(85)}" x2="${m.x(95)}" y2="${m.y(18)}" stroke="${POINT.green}" stroke-width="3"/>
  ${curveLabel(m.x(72), m.y(16), 'D = MPB', POINT.green)}

  <!-- MSB (higher) -->
  <line x1="${m.x(0)}" y1="${m.y(100)}" x2="${m.x(95)}" y2="${m.y(33)}" stroke="${POINT.orange}" stroke-width="3"/>
  ${curveLabel(m.x(80), m.y(30), 'MSB', POINT.orange)}

  <!-- Welfare loss triangle -->
  <polygon points="${m.x(Qm)},${m.y(Pm)} ${m.x(Qopt)},${m.y(Popt)} ${m.x(Qopt)},${m.y(mpbAtQopt)}" fill="${POINT.orange}" opacity="0.25" stroke="${POINT.orange}" stroke-width="2"/>
  <text x="${m.x(Qopt) + 15}" y="${m.y((Popt + mpbAtQopt) / 2) + 4}" fill="${POINT.orange}" font-size="12" font-weight="700" class="draggable">WELFARE</text>
  <text x="${m.x(Qopt) + 15}" y="${m.y((Popt + mpbAtQopt) / 2) + 18}" fill="${POINT.orange}" font-size="12" font-weight="700" class="draggable">LOSS</text>

  <!-- Reference lines for Qm -->
  ${dashes(m.x(Qm), m.y(Pm))}
  ${pLabel(m.y(Pm), 'P\u2091')}
  ${qLabel(m.x(Qm), 'Q\u2091')}

  <!-- Reference lines for Qopt -->
  ${dashes(m.x(Qopt), m.y(Popt))}
  ${pLabel(m.y(Popt), 'P\u2092\u209A\u209C')}
  ${qLabel(m.x(Qopt), 'Q\u2092\u209A\u209C')}

  <circle cx="${m.x(Qm)}" cy="${m.y(Pm)}" r="5" fill="${POINT.green}"/>
  <circle cx="${m.x(Qopt)}" cy="${m.y(Popt)}" r="5" fill="${POINT.orange}"/>
${SVG_CLOSE}`;
}

/* ═══════════════════════════════════════════════════════════
 * 6. S&D EQUILIBRIUM
 * ═══════════════════════════════════════════════════════════ */

function sdEquilibrium() {
  const m = makeMapper(0, 100, 0, 100);
  // D: y = 90-0.8x, S: y = 10+0.8x → eq at x=50, y=50
  const Qe = 50, Pe = 50;

  return `${SVG_OPEN(500, 420)}
  ${MARKERS}
  ${axes('Quantity (Q)', 'Price (P)')}

  <!-- Supply -->
  <line x1="${m.x(0)}" y1="${m.y(10)}" x2="${m.x(95)}" y2="${m.y(86)}" stroke="${POINT.blue}" stroke-width="3"/>
  ${curveLabel(m.x(88), m.y(90) - 5, 'S', POINT.blue)}

  <!-- Demand -->
  <line x1="${m.x(0)}" y1="${m.y(90)}" x2="${m.x(95)}" y2="${m.y(14)}" stroke="${POINT.green}" stroke-width="3"/>
  ${curveLabel(m.x(88), m.y(10), 'D', POINT.green)}

  <!-- Equilibrium -->
  ${dashes(m.x(Qe), m.y(Pe))}
  <circle cx="${m.x(Qe)}" cy="${m.y(Pe)}" r="6" fill="${POINT.orange}"/>
  ${pLabel(m.y(Pe), 'Pe')}
  ${qLabel(m.x(Qe), 'Qe')}
  <text x="${m.x(Qe) + 14}" y="${m.y(Pe) - 10}" fill="${POINT.orange}" font-size="13" font-weight="700" class="draggable">E</text>
${SVG_CLOSE}`;
}

function sdIncreaseDemand() {
  const m = makeMapper(0, 100, 0, 100);
  // D1: y = 90-0.8x, S: y = 10+0.8x → eq at (50, 50)
  // D2: y = 105-0.8x (shifted right) → S=D2: 10+0.8x = 105-0.8x → 1.6x=95 → x=59.4, y=57.5
  const Q1 = 50, P1 = 50;
  const Q2 = 59.4, P2 = 57.5;

  return `${SVG_OPEN(500, 420)}
  ${MARKERS}
  ${axes('Quantity (Q)', 'Price (P)')}

  <!-- Supply -->
  <line x1="${m.x(0)}" y1="${m.y(10)}" x2="${m.x(95)}" y2="${m.y(86)}" stroke="${POINT.blue}" stroke-width="3"/>
  ${curveLabel(m.x(88), m.y(90) - 5, 'S', POINT.blue)}

  <!-- D1 (dashed) -->
  <line x1="${m.x(0)}" y1="${m.y(90)}" x2="${m.x(95)}" y2="${m.y(14)}" stroke="${DASH}" stroke-width="2" stroke-dasharray="8,5"/>
  <text x="${m.x(90)}" y="${m.y(12)}" fill="${DASH}" font-size="12" class="draggable">D\u2081</text>

  <!-- D2 -->
  <line x1="${m.x(0)}" y1="${m.y(105)}" x2="${m.x(95)}" y2="${m.y(29)}" stroke="${POINT.green}" stroke-width="3"/>
  ${curveLabel(m.x(85), m.y(28), 'D\u2082', POINT.green)}

  <!-- Old eq (faded) -->
  ${dashes(m.x(Q1), m.y(P1))}
  <circle cx="${m.x(Q1)}" cy="${m.y(P1)}" r="4" fill="${DASH}"/>
  ${pLabel(m.y(P1), 'P\u2081')}
  ${qLabel(m.x(Q1), 'Q\u2081')}

  <!-- New eq -->
  <line x1="${m.x(Q2)}" y1="${m.y(P2)}" x2="${PLOT.xMin}" y2="${m.y(P2)}" stroke="${POINT.orange}" stroke-width="1.5" stroke-dasharray="6,4"/>
  <line x1="${m.x(Q2)}" y1="${m.y(P2)}" x2="${m.x(Q2)}" y2="${PLOT.yMax}" stroke="${POINT.orange}" stroke-width="1.5" stroke-dasharray="6,4"/>
  <circle cx="${m.x(Q2)}" cy="${m.y(P2)}" r="6" fill="${POINT.orange}"/>
  ${pLabel(m.y(P2), 'P\u2082')}
  ${qLabel(m.x(Q2), 'Q\u2082')}

  <!-- Shift arrow -->
  <line x1="${m.x(50)}" y1="${m.y(55)}" x2="${m.x(62)}" y2="${m.y(55)}" stroke="${POINT.green}" stroke-width="2.5" marker-end="url(#arr)"/>
${SVG_CLOSE}`;
}

/* ═══════════════════════════════════════════════════════════
 * 7. DEMAND CURVE — MOVEMENT & SHIFT
 * ═══════════════════════════════════════════════════════════ */

function demandMovement() {
  const m = makeMapper(0, 100, 0, 100);
  // D: y = 90 - 0.8x
  // Point A at x=25 → y=70
  // Point B at x=62.5 → y=40

  return `${SVG_OPEN(500, 420)}
  ${MARKERS}
  ${axes('Quantity (Q)', 'Price (P)')}

  <!-- Demand curve -->
  <line x1="${m.x(0)}" y1="${m.y(90)}" x2="${m.x(95)}" y2="${m.y(14)}" stroke="${CURVE}" stroke-width="3"/>
  ${curveLabel(m.x(88), m.y(10), 'D')}

  <!-- Point A (high price, low qty) -->
  ${dashes(m.x(25), m.y(70))}
  ${point(m.x(25), m.y(70), 'A', POINT.pink)}
  ${pLabel(m.y(70), 'P\u2081')}
  ${qLabel(m.x(25), 'Q\u2081')}

  <!-- Point B (low price, high qty) -->
  ${dashes(m.x(62.5), m.y(40))}
  ${point(m.x(62.5), m.y(40), 'B', POINT.yellow)}
  ${pLabel(m.y(40), 'P\u2082')}
  ${qLabel(m.x(62.5), 'Q\u2082')}

  <!-- Movement arrow -->
  <path d="M ${m.x(28)} ${m.y(68)} L ${m.x(60)} ${m.y(42)}" stroke="${POINT.orange}" stroke-width="2.5" fill="none" marker-end="url(#arr)"/>
  <text x="${m.x(48)}" y="${m.y(60)}" fill="${POINT.orange}" font-size="12" font-weight="600" class="draggable">Movement along</text>
${SVG_CLOSE}`;
}

function demandShift() {
  const m = makeMapper(0, 100, 0, 100);

  return `${SVG_OPEN(500, 420)}
  ${MARKERS}
  ${axes('Quantity (Q)', 'Price (P)')}

  <!-- D1 (original, dashed) -->
  <line x1="${m.x(0)}" y1="${m.y(75)}" x2="${m.x(85)}" y2="${m.y(7)}" stroke="${DASH}" stroke-width="2" stroke-dasharray="8,5"/>
  <text x="${m.x(78)}" y="${m.y(5)}" fill="${DASH}" font-size="12" class="draggable">D\u2081</text>

  <!-- D2 (shifted right) -->
  <line x1="${m.x(0)}" y1="${m.y(90)}" x2="${m.x(95)}" y2="${m.y(14)}" stroke="${CURVE}" stroke-width="3"/>
  ${curveLabel(m.x(88), m.y(10), 'D\u2082')}

  <!-- Shift arrows -->
  <line x1="${m.x(30)}" y1="${m.y(50)}" x2="${m.x(42)}" y2="${m.y(50)}" stroke="${POINT.green}" stroke-width="2.5" marker-end="url(#arr)"/>
  <line x1="${m.x(50)}" y1="${m.y(35)}" x2="${m.x(62)}" y2="${m.y(35)}" stroke="${POINT.green}" stroke-width="2.5" marker-end="url(#arr)"/>

  <text x="${(PLOT.xMin + PLOT.xMax) / 2}" y="${PLOT.yMax + 70}" fill="${VALUE}" font-size="11" text-anchor="middle" opacity="0.7">Non-price factors shift the entire demand curve</text>
${SVG_CLOSE}`;
}

/* ═══════════════════════════════════════════════════════════
 * 8. SUPPLY CURVE — BASE & SHIFTS
 * ═══════════════════════════════════════════════════════════ */

function supplyBase() {
  const m = makeMapper(0, 100, 0, 100);
  // S: y = 10 + 0.8x

  return `${SVG_OPEN(500, 420)}
  ${MARKERS}
  ${axes('Quantity (Q)', 'Price (P)')}

  <!-- Supply curve -->
  <line x1="${m.x(0)}" y1="${m.y(10)}" x2="${m.x(95)}" y2="${m.y(86)}" stroke="${CURVE}" stroke-width="3"/>
  ${curveLabel(m.x(88), m.y(90) - 5, 'S')}

  <!-- Point A -->
  ${dashes(m.x(30), m.y(34))}
  ${point(m.x(30), m.y(34), 'A', POINT.pink)}
  ${pLabel(m.y(34), 'P\u2081')}
  ${qLabel(m.x(30), 'Q\u2081')}

  <!-- Point B -->
  ${dashes(m.x(65), m.y(62))}
  ${point(m.x(65), m.y(62), 'B', POINT.yellow)}
  ${pLabel(m.y(62), 'P\u2082')}
  ${qLabel(m.x(65), 'Q\u2082')}

  <!-- Movement arrow -->
  <path d="M ${m.x(33)} ${m.y(36)} L ${m.x(62)} ${m.y(60)}" stroke="${POINT.orange}" stroke-width="2.5" fill="none" marker-end="url(#arr)"/>
  <text x="${m.x(52)}" y="${m.y(52) + 22}" fill="${POINT.orange}" font-size="12" font-weight="600" class="draggable">Movement along</text>
${SVG_CLOSE}`;
}

function supplyShiftRight() {
  const m = makeMapper(0, 100, 0, 100);

  return `${SVG_OPEN(500, 420)}
  ${MARKERS}
  ${axes('Quantity (Q)', 'Price (P)')}

  <!-- S1 (original, dashed) -->
  <line x1="${m.x(0)}" y1="${m.y(25)}" x2="${m.x(85)}" y2="${m.y(93)}" stroke="${DASH}" stroke-width="2" stroke-dasharray="8,5"/>
  <text x="${m.x(78)}" y="${m.y(91) - 8}" fill="${DASH}" font-size="12" class="draggable">S\u2081</text>

  <!-- S2 (shifted right/down) -->
  <line x1="${m.x(0)}" y1="${m.y(10)}" x2="${m.x(95)}" y2="${m.y(86)}" stroke="${CURVE}" stroke-width="3"/>
  ${curveLabel(m.x(88), m.y(90) - 5, 'S\u2082')}

  <!-- Shift arrows -->
  <line x1="${m.x(40)}" y1="${m.y(55)}" x2="${m.x(52)}" y2="${m.y(50)}" stroke="${POINT.green}" stroke-width="2.5" marker-end="url(#arr)"/>
  <line x1="${m.x(60)}" y1="${m.y(70)}" x2="${m.x(72)}" y2="${m.y(65)}" stroke="${POINT.green}" stroke-width="2.5" marker-end="url(#arr)"/>

  <text x="${(PLOT.xMin + PLOT.xMax) / 2}" y="${PLOT.yMax + 70}" fill="${VALUE}" font-size="11" text-anchor="middle" opacity="0.7">Lower costs of production shift supply to the right</text>
${SVG_CLOSE}`;
}

function supplyShiftLeft() {
  const m = makeMapper(0, 100, 0, 100);

  return `${SVG_OPEN(500, 420)}
  ${MARKERS}
  ${axes('Quantity (Q)', 'Price (P)')}

  <!-- S1 (original, dashed) -->
  <line x1="${m.x(0)}" y1="${m.y(10)}" x2="${m.x(95)}" y2="${m.y(86)}" stroke="${DASH}" stroke-width="2" stroke-dasharray="8,5"/>
  <text x="${m.x(88)}" y="${m.y(88) - 8}" fill="${DASH}" font-size="12" class="draggable">S\u2081</text>

  <!-- S2 (shifted left/up) -->
  <line x1="${m.x(0)}" y1="${m.y(25)}" x2="${m.x(85)}" y2="${m.y(93)}" stroke="${CURVE}" stroke-width="3"/>
  ${curveLabel(m.x(78), m.y(91) - 8, 'S\u2082')}

  <!-- Shift arrows -->
  <line x1="${m.x(52)}" y1="${m.y(50)}" x2="${m.x(40)}" y2="${m.y(55)}" stroke="${POINT.red}" stroke-width="2.5" marker-end="url(#arr)"/>
  <line x1="${m.x(72)}" y1="${m.y(65)}" x2="${m.x(60)}" y2="${m.y(70)}" stroke="${POINT.red}" stroke-width="2.5" marker-end="url(#arr)"/>

  <text x="${(PLOT.xMin + PLOT.xMax) / 2}" y="${PLOT.yMax + 70}" fill="${VALUE}" font-size="11" text-anchor="middle" opacity="0.7">Higher costs of production shift supply to the left</text>
${SVG_CLOSE}`;
}

/* ═══════════════════════════════════════════════════════════
 * UPDATE SUPABASE
 * ═══════════════════════════════════════════════════════════ */

async function updateSection(sectionId, diagramIndex, updates) {
  const { data, error } = await supabase
    .from('section_diagrams')
    .select('data')
    .eq('section_id', sectionId)
    .single();

  if (error || !data) {
    console.error(`  ✗ Failed to fetch ${sectionId}:`, error?.message);
    return false;
  }

  const diagrams = data.data;
  if (!diagrams[diagramIndex]) {
    console.error(`  ✗ No diagram at index ${diagramIndex} for ${sectionId}`);
    return false;
  }

  if (updates.svg) diagrams[diagramIndex].svg = updates.svg;
  if (updates.scenarios) diagrams[diagramIndex].scenarios = updates.scenarios;

  const { error: ue } = await supabase
    .from('section_diagrams')
    .update({ data: diagrams })
    .eq('section_id', sectionId);

  if (ue) { console.error(`  ✗ Update failed for ${sectionId}:`, ue.message); return false; }
  return true;
}

async function main() {
  console.log('═══ Diagram Standard v2: Rewriting to textbook quality ═══\n');

  let ok;

  // PPF (3 scenarios)
  ok = await updateSection('introductory-concepts', 0, {
    scenarios: [
      { label: 'Base PPF', svg: ppfBase() },
      { label: 'Economic Growth (Outward Shift)', svg: ppfGrowth() },
      { label: 'Inefficient Allocation', svg: ppfInefficient() },
    ],
  });
  console.log(ok ? '✓' : '✗', 'PPF (3 scenarios)');

  // Demand Curve (2 scenarios)
  ok = await updateSection('consumer-behaviour-demand', 0, {
    scenarios: [
      { label: 'Movement Along (Price Change)', svg: demandMovement() },
      { label: 'Shift of Demand (Non-Price Factor)', svg: demandShift() },
    ],
  });
  console.log(ok ? '✓' : '✗', 'Demand Curve (2 scenarios)');

  // Supply Curve (3 scenarios)
  ok = await updateSection('supply', 0, {
    scenarios: [
      { label: 'Base Supply Curve', svg: supplyBase() },
      { label: 'Rightward Shift (Increase in Supply)', svg: supplyShiftRight() },
      { label: 'Leftward Shift (Decrease in Supply)', svg: supplyShiftLeft() },
    ],
  });
  console.log(ok ? '✓' : '✗', 'Supply Curve (3 scenarios)');

  // S&D Equilibrium (2 key scenarios)
  ok = await updateSection('price-determination', 0, {
    scenarios: [
      { label: 'Base Equilibrium', svg: sdEquilibrium() },
      { label: 'Increase in Demand', svg: sdIncreaseDemand() },
    ],
  });
  console.log(ok ? '✓' : '✗', 'S&D Equilibrium (2 scenarios)');

  // Negative Externality
  ok = await updateSection('market-failure', 0, { svg: negativeExternality() });
  console.log(ok ? '✓' : '✗', 'Negative Externality');

  // Positive Externality
  ok = await updateSection('market-failure', 1, { svg: positiveExternality() });
  console.log(ok ? '✓' : '✗', 'Positive Externality');

  console.log('\n═══ Done! 6 diagram sets updated (15 SVGs) ═══');
  console.log('New standard features:');
  console.log('  • Colored labeled points with white letters');
  console.log('  • Numerical axis values');
  console.log('  • Clean dashed reference lines');
  console.log('  • Shaded welfare areas');
  console.log('  • class="draggable" for interactive label drill');
}

main();
