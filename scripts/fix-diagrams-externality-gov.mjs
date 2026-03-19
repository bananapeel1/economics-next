import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://trweeckuswgkenckeqfb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);

/* ===================================================================
 *  Fix diagrams for:
 *    - market-failure       (index 0: Negative Externality)
 *    - market-failure       (index 1: Positive Externality)
 *    - government-intervention (index 0: Maximum Price / Price Ceiling)
 *    - government-intervention (index 1: Minimum Price / Price Floor)
 *    - government-intervention (index 2: Tax to Correct Negative Ext.)
 *    - government-intervention (index 3: Subsidy to Correct Positive Ext.)
 *
 *  SVG Standard:
 *    viewBox 0 0 500 360
 *    font-family: 'DM Sans', sans-serif
 *    Axis color: #e8ecf5, 2px solid, with arrowheads
 *    Plot area: x=[80,450], y=[50,280]
 *    Y-axis label: rotated at x=28
 *    X-axis label: centered at y=325
 *    Dashed lines: 0.5 opacity
 *    Welfare loss triangles: 0.15 fill opacity, 1.5px stroke
 *    Colors: Blue=#3b82f6, Red=#ef4444, Green=#059669,
 *            Orange=#f59e0b, Purple=#8b5cf6
 * =================================================================== */

// -- Constants --
const BLUE   = '#3b82f6';
const RED    = '#ef4444';
const GREEN  = '#059669';
const ORANGE = '#f59e0b';
const PURPLE = '#8b5cf6';
const AXIS_COLOR = '#e8ecf5';
const FONT = "'DM Sans',sans-serif";

// Plot boundaries
const PX_LEFT   = 80;
const PX_RIGHT  = 450;
const PY_TOP    = 50;
const PY_BOTTOM = 280;

// -- Helpers --

/** Linear interpolation: map a value from [a,b] data-space to [c,d] pixel-space */
function lerp(val, a, b, c, d) {
  return c + ((val - a) / (b - a)) * (d - c);
}

/** Find intersection of two lines given as (x1,y1)-(x2,y2) each */
function intersect(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
  const dAx = ax2 - ax1, dAy = ay2 - ay1;
  const dBx = bx2 - bx1, dBy = by2 - by1;
  const denom = dAx * dBy - dAy * dBx;
  if (Math.abs(denom) < 1e-10) return null;
  const t = ((bx1 - ax1) * dBy - (by1 - ay1) * dBx) / denom;
  return { x: ax1 + t * dAx, y: ay1 + t * dAy };
}

/** Evaluate y on a line at given x */
function yOnLine(x, x1, y1, x2, y2) {
  const t = (x - x1) / (x2 - x1);
  return y1 + t * (y2 - y1);
}

/** Standard SVG open tag */
function svgOpen() {
  return `<svg viewBox="0 0 500 360" xmlns="http://www.w3.org/2000/svg" style="font-family:${FONT}">`;
}

/** Arrow marker defs */
function defs() {
  return `<defs>
  <marker id="ah" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
    <polygon points="0 0,10 3.5,0 7" fill="${AXIS_COLOR}"/>
  </marker>
</defs>`;
}

/** Standard axes with arrowheads */
function axes(xLabel, yLabel) {
  return `<!-- Axes -->
<line x1="${PX_LEFT}" y1="${PY_BOTTOM}" x2="${PX_RIGHT + 10}" y2="${PY_BOTTOM}" stroke="${AXIS_COLOR}" stroke-width="2" marker-end="url(#ah)"/>
<line x1="${PX_LEFT}" y1="${PY_BOTTOM}" x2="${PX_LEFT}" y2="${PY_TOP - 15}" stroke="${AXIS_COLOR}" stroke-width="2" marker-end="url(#ah)"/>
<text x="28" y="${(PY_TOP + PY_BOTTOM) / 2}" fill="${AXIS_COLOR}" font-size="13" font-weight="600" text-anchor="middle" transform="rotate(-90,28,${(PY_TOP + PY_BOTTOM) / 2})">${yLabel}</text>
<text x="${(PX_LEFT + PX_RIGHT) / 2}" y="325" fill="${AXIS_COLOR}" font-size="13" font-weight="600" text-anchor="middle">${xLabel}</text>`;
}

/** Dashed reference line from point to y-axis */
function dashToY(px, py) {
  return `<line x1="${r(px)}" y1="${r(py)}" x2="${PX_LEFT}" y2="${r(py)}" stroke="${AXIS_COLOR}" stroke-width="1" stroke-dasharray="6,4" opacity="0.5"/>`;
}

/** Dashed reference line from point to x-axis */
function dashToX(px, py) {
  return `<line x1="${r(px)}" y1="${r(py)}" x2="${r(px)}" y2="${PY_BOTTOM}" stroke="${AXIS_COLOR}" stroke-width="1" stroke-dasharray="6,4" opacity="0.5"/>`;
}

/** Both dashed lines */
function dashBoth(px, py) {
  return `${dashToY(px, py)}\n${dashToX(px, py)}`;
}

/** Y-axis tick label (left of axis) */
function yLabel(py, text) {
  return `<text x="${PX_LEFT - 8}" y="${r(py) + 4}" fill="${AXIS_COLOR}" font-size="11" font-weight="600" text-anchor="end">${text}</text>`;
}

/** X-axis tick label (below axis) */
function xLabel(px, text) {
  return `<text x="${r(px)}" y="${PY_BOTTOM + 16}" fill="${AXIS_COLOR}" font-size="11" font-weight="600" text-anchor="middle">${text}</text>`;
}

/** Round to 1 decimal for cleaner SVG */
function r(v) { return Math.round(v * 10) / 10; }

/** Equilibrium dot */
function dot(px, py, color, radius = 4) {
  return `<circle cx="${r(px)}" cy="${r(py)}" r="${radius}" fill="${color}"/>`;
}


/* ===================================================================
 *  DIAGRAM 1: Negative Externality  (market-failure, index 0)
 * =================================================================== */
function negativeExternality() {
  // Define lines in pixel space (within plot area)
  // MPC: upward sloping from (90,260) to (440,80)
  const mpc = { x1: 90, y1: 260, x2: 440, y2: 80 };
  // MSC: upward sloping from (90,210) to (440,40) -- above MPC
  const msc = { x1: 90, y1: 210, x2: 440, y2: 40 };
  // D = MPB = MSB: downward sloping from (90,60) to (440,260)
  const dem = { x1: 90, y1: 60, x2: 440, y2: 260 };

  // Market equilibrium: MPC intersect D
  const eqMarket = intersect(mpc.x1, mpc.y1, mpc.x2, mpc.y2, dem.x1, dem.y1, dem.x2, dem.y2);
  // Social optimum: MSC intersect D
  const eqSocial = intersect(msc.x1, msc.y1, msc.x2, msc.y2, dem.x1, dem.y1, dem.x2, dem.y2);

  // MSC at Qe (x = eqMarket.x)
  const mscAtQe = yOnLine(eqMarket.x, msc.x1, msc.y1, msc.x2, msc.y2);
  // MPC at Qe
  const mpcAtQe = eqMarket.y; // on the MPC line

  // Welfare loss triangle: vertices are
  //   eqSocial (MSC=D intersection)
  //   (eqMarket.x, eqMarket.y) = D at Qe
  //   (eqMarket.x, mscAtQe) = MSC at Qe
  const triPoints = `${r(eqSocial.x)},${r(eqSocial.y)} ${r(eqMarket.x)},${r(eqMarket.y)} ${r(eqMarket.x)},${r(mscAtQe)}`;

  // Midpoint of welfare loss triangle for label
  const triCx = (eqSocial.x + eqMarket.x + eqMarket.x) / 3;
  const triCy = (eqSocial.y + eqMarket.y + mscAtQe) / 3;

  // Externality bracket: gap between MSC and MPC at Qe
  const bracketX = eqMarket.x + 12;

  return `${svgOpen()}
${defs()}
${axes('Quantity', 'Price / Cost')}

<!-- MPC line -->
<line x1="${mpc.x1}" y1="${mpc.y1}" x2="${mpc.x2}" y2="${mpc.y2}" stroke="${BLUE}" stroke-width="2.5" fill="none"/>
<text x="${mpc.x2 + 4}" y="${mpc.y2 + 4}" fill="${BLUE}" font-size="11" font-weight="700" font-family="${FONT}">MPC</text>

<!-- MSC line -->
<line x1="${msc.x1}" y1="${msc.y1}" x2="${msc.x2}" y2="${msc.y2}" stroke="${RED}" stroke-width="2.5" fill="none"/>
<text x="${msc.x2 + 4}" y="${msc.y2 - 2}" fill="${RED}" font-size="11" font-weight="700" font-family="${FONT}">MSC</text>

<!-- D = MPB = MSB line -->
<line x1="${dem.x1}" y1="${dem.y1}" x2="${dem.x2}" y2="${dem.y2}" stroke="${GREEN}" stroke-width="2.5" fill="none"/>
<text x="${dem.x2 - 90}" y="${dem.y2 + 16}" fill="${GREEN}" font-size="11" font-weight="700" font-family="${FONT}">D = MPB = MSB</text>

<!-- Welfare loss triangle -->
<polygon points="${triPoints}" fill="${ORANGE}" fill-opacity="0.15" stroke="${ORANGE}" stroke-width="1.5"/>
<text x="${r(triCx - 8)}" y="${r(triCy + 2)}" fill="${ORANGE}" font-size="9" font-weight="700" font-family="${FONT}">Welfare</text>
<text x="${r(triCx - 4)}" y="${r(triCy + 12)}" fill="${ORANGE}" font-size="9" font-weight="700" font-family="${FONT}">Loss</text>

<!-- Dashed lines from social optimum -->
${dashBoth(eqSocial.x, eqSocial.y)}
${yLabel(eqSocial.y, 'Popt')}
${xLabel(eqSocial.x, 'Qopt')}

<!-- Dashed lines from market equilibrium -->
${dashBoth(eqMarket.x, eqMarket.y)}
${yLabel(eqMarket.y, 'Pe')}
${xLabel(eqMarket.x, 'Qe')}

<!-- Equilibrium dots -->
${dot(eqSocial.x, eqSocial.y, RED, 4)}
${dot(eqMarket.x, eqMarket.y, BLUE, 4)}

<!-- Externality bracket at Qe: gap between MSC and MPC -->
<line x1="${r(bracketX)}" y1="${r(mscAtQe)}" x2="${r(bracketX)}" y2="${r(mpcAtQe)}" stroke="${AXIS_COLOR}" stroke-width="1.5"/>
<line x1="${r(bracketX - 4)}" y1="${r(mscAtQe)}" x2="${r(bracketX + 4)}" y2="${r(mscAtQe)}" stroke="${AXIS_COLOR}" stroke-width="1.5"/>
<line x1="${r(bracketX - 4)}" y1="${r(mpcAtQe)}" x2="${r(bracketX + 4)}" y2="${r(mpcAtQe)}" stroke="${AXIS_COLOR}" stroke-width="1.5"/>
<text x="${r(bracketX + 8)}" y="${r((mscAtQe + mpcAtQe) / 2 + 4)}" fill="${AXIS_COLOR}" font-size="10" font-weight="600" font-family="${FONT}">Externality</text>

</svg>`;
}


/* ===================================================================
 *  DIAGRAM 2: Positive Externality  (market-failure, index 1)
 * =================================================================== */
function positiveExternality() {
  // S = MPC = MSC: upward sloping from (90,260) to (440,80)
  const sup = { x1: 90, y1: 260, x2: 440, y2: 80 };
  // D = MPB: downward sloping from (90,60) to (440,260)
  const mpb = { x1: 90, y1: 60, x2: 440, y2: 260 };
  // MSB: shifted right of MPB -> from (140,50) to (460,260)
  // Clamp the MSB line's right end to stay within plot area
  // MSB goes from (140,50) toward (460,260) but we clip at x=450
  const msbFullX2 = 460, msbFullY2 = 260;
  // Parametric clip at x=450:
  const tClip = (450 - 140) / (msbFullX2 - 140);
  const msbClipY = 50 + tClip * (msbFullY2 - 50);
  const msb = { x1: 140, y1: 50, x2: 450, y2: r(msbClipY) };

  // Market equilibrium: S intersect MPB
  const eqMarket = intersect(sup.x1, sup.y1, sup.x2, sup.y2, mpb.x1, mpb.y1, mpb.x2, mpb.y2);
  // Social optimum: S intersect MSB (use the full unclipped MSB for intersection)
  const eqSocial = intersect(sup.x1, sup.y1, sup.x2, sup.y2, 140, 50, msbFullX2, msbFullY2);

  // MPB at Qopt
  const mpbAtQopt = yOnLine(eqSocial.x, mpb.x1, mpb.y1, mpb.x2, mpb.y2);

  // Welfare loss triangle: between Qe and Qopt, bounded by MSB above and S below
  // Actually for positive externality: the triangle is bounded by MSB above and MPB below
  // between Qe and Qopt. Or equivalently the three vertices are:
  //   eqMarket (S=MPB intersection)
  //   eqSocial (S=MSB intersection)
  //   (eqSocial.x, mpbAtQopt) = MPB at Qopt
  const triPoints = `${r(eqMarket.x)},${r(eqMarket.y)} ${r(eqSocial.x)},${r(eqSocial.y)} ${r(eqSocial.x)},${r(mpbAtQopt)}`;

  const triCx = (eqMarket.x + eqSocial.x + eqSocial.x) / 3;
  const triCy = (eqMarket.y + eqSocial.y + mpbAtQopt) / 3;

  return `${svgOpen()}
${defs()}
${axes('Quantity', 'Price / Cost')}

<!-- S = MPC = MSC line -->
<line x1="${sup.x1}" y1="${sup.y1}" x2="${sup.x2}" y2="${sup.y2}" stroke="${BLUE}" stroke-width="2.5"/>
<text x="${sup.x2 - 95}" y="${sup.y2 - 8}" fill="${BLUE}" font-size="11" font-weight="700" font-family="${FONT}">S = MPC = MSC</text>

<!-- D = MPB line -->
<line x1="${mpb.x1}" y1="${mpb.y1}" x2="${mpb.x2}" y2="${mpb.y2}" stroke="${GREEN}" stroke-width="2.5"/>
<text x="${mpb.x2 - 55}" y="${mpb.y2 + 16}" fill="${GREEN}" font-size="11" font-weight="700" font-family="${FONT}">D = MPB</text>

<!-- MSB line -->
<line x1="${msb.x1}" y1="${msb.y1}" x2="${msb.x2}" y2="${msb.y2}" stroke="${ORANGE}" stroke-width="2.5"/>
<text x="${msb.x2 - 24}" y="${msb.y2 + 16}" fill="${ORANGE}" font-size="11" font-weight="700" font-family="${FONT}">MSB</text>

<!-- Welfare loss triangle -->
<polygon points="${triPoints}" fill="${ORANGE}" fill-opacity="0.15" stroke="${ORANGE}" stroke-width="1.5"/>
<text x="${r(triCx - 8)}" y="${r(triCy)}" fill="${ORANGE}" font-size="9" font-weight="700" font-family="${FONT}">Welfare</text>
<text x="${r(triCx - 4)}" y="${r(triCy + 10)}" fill="${ORANGE}" font-size="9" font-weight="700" font-family="${FONT}">Loss</text>

<!-- Dashed lines from market equilibrium -->
${dashBoth(eqMarket.x, eqMarket.y)}
${yLabel(eqMarket.y, 'Pe')}
${xLabel(eqMarket.x, 'Qe')}

<!-- Dashed lines from social optimum -->
${dashBoth(eqSocial.x, eqSocial.y)}
${yLabel(eqSocial.y, 'Popt')}
${xLabel(eqSocial.x, 'Qopt')}

<!-- Equilibrium dots -->
${dot(eqMarket.x, eqMarket.y, GREEN, 4)}
${dot(eqSocial.x, eqSocial.y, ORANGE, 4)}

</svg>`;
}


/* ===================================================================
 *  DIAGRAM 3: Maximum Price / Price Ceiling  (gov-intervention, index 0)
 * =================================================================== */
function priceCeiling() {
  // S: upward from (90,260) to (440,80)
  const sup = { x1: 90, y1: 260, x2: 440, y2: 80 };
  // D: downward from (90,60) to (440,260)
  const dem = { x1: 90, y1: 60, x2: 440, y2: 260 };

  // Equilibrium
  const eq = intersect(sup.x1, sup.y1, sup.x2, sup.y2, dem.x1, dem.y1, dem.x2, dem.y2);

  // Pmax is BELOW Pe. In SVG, below Pe means higher y value.
  // Pe is at eq.y. Let's set Pmax about 30% below Pe in price terms
  // (i.e., higher y by ~40px)
  const pmaxY = eq.y + 40;

  // At Pmax: find Qs (on supply) and Qd (on demand)
  // Supply: what x gives y = pmaxY?
  const qsX = lerp(pmaxY, sup.y1, sup.y2, sup.x1, sup.x2);
  // Demand: what x gives y = pmaxY?
  const qdX = lerp(pmaxY, dem.y1, dem.y2, dem.x1, dem.x2);

  // Welfare loss triangle: between Qs and Qe, bounded by supply below and demand above
  // Actually: the DWL for a price ceiling is the triangle with vertices:
  //   eq point, (qsX, pmaxY) on S, and a point where we lose.
  // Standard: triangle between Qs and Qe, with S curve on one side and D on the other meeting at eq.
  // Vertices: eq, (qsX, pmaxY), (qsX, yOnDemandAtQs)
  const dAtQs = yOnLine(qsX, dem.x1, dem.y1, dem.x2, dem.y2);
  const wlTriPoints = `${r(eq.x)},${r(eq.y)} ${r(qsX)},${r(pmaxY)} ${r(qsX)},${r(dAtQs)}`;

  // Excess demand shading: horizontal band at Pmax from Qs to Qd
  const excessMidX = (qsX + qdX) / 2;

  return `${svgOpen()}
${defs()}
${axes('Quantity', 'Price')}

<!-- Supply -->
<line x1="${sup.x1}" y1="${sup.y1}" x2="${sup.x2}" y2="${sup.y2}" stroke="${BLUE}" stroke-width="2.5"/>
<text x="${sup.x2 + 4}" y="${sup.y2 + 4}" fill="${BLUE}" font-size="12" font-weight="700" font-family="${FONT}">S</text>

<!-- Demand -->
<line x1="${dem.x1}" y1="${dem.y1}" x2="${dem.x2}" y2="${dem.y2}" stroke="${GREEN}" stroke-width="2.5"/>
<text x="${dem.x2 + 4}" y="${dem.y2 + 4}" fill="${GREEN}" font-size="12" font-weight="700" font-family="${FONT}">D</text>

<!-- Equilibrium dashed lines -->
${dashBoth(eq.x, eq.y)}
${yLabel(eq.y, 'Pe')}
${xLabel(eq.x, 'Qe')}
${dot(eq.x, eq.y, AXIS_COLOR, 3.5)}

<!-- Price ceiling line (Pmax) -->
<line x1="${PX_LEFT}" y1="${r(pmaxY)}" x2="${PX_RIGHT}" y2="${r(pmaxY)}" stroke="${RED}" stroke-width="2" stroke-dasharray="8,5"/>
${yLabel(pmaxY, 'Pmax')}

<!-- Dashed lines from Qs and Qd to x-axis -->
${dashToX(qsX, pmaxY)}
${dashToX(qdX, pmaxY)}
${xLabel(qsX, 'Qs')}
${xLabel(qdX, 'Qd')}

<!-- Excess demand shading -->
<rect x="${r(qsX)}" y="${r(pmaxY - 8)}" width="${r(qdX - qsX)}" height="16" fill="${RED}" fill-opacity="0.1" rx="2"/>
<line x1="${r(qsX)}" y1="${r(pmaxY)}" x2="${r(qdX)}" y2="${r(pmaxY)}" stroke="${RED}" stroke-width="2.5"/>
<!-- Arrows showing excess demand -->
<text x="${r(excessMidX)}" y="${r(pmaxY + 30)}" fill="${RED}" font-size="10" font-weight="700" text-anchor="middle" font-family="${FONT}">Excess Demand</text>
<line x1="${r(qsX + 8)}" y1="${r(pmaxY + 22)}" x2="${r(qdX - 8)}" y2="${r(pmaxY + 22)}" stroke="${RED}" stroke-width="1" marker-end="url(#ah)"/>

<!-- Welfare loss triangle -->
<polygon points="${wlTriPoints}" fill="${ORANGE}" fill-opacity="0.15" stroke="${ORANGE}" stroke-width="1.5"/>
<text x="${r(qsX + 6)}" y="${r((eq.y + pmaxY) / 2 + 2)}" fill="${ORANGE}" font-size="9" font-weight="700" font-family="${FONT}">DWL</text>

<!-- Dots on Pmax line -->
${dot(qsX, pmaxY, BLUE, 3.5)}
${dot(qdX, pmaxY, GREEN, 3.5)}

</svg>`;
}


/* ===================================================================
 *  DIAGRAM 4: Minimum Price / Price Floor  (gov-intervention, index 1)
 * =================================================================== */
function priceFloor() {
  // S: upward from (90,260) to (440,80)
  const sup = { x1: 90, y1: 260, x2: 440, y2: 80 };
  // D: downward from (90,60) to (440,260)
  const dem = { x1: 90, y1: 60, x2: 440, y2: 260 };

  // Equilibrium
  const eq = intersect(sup.x1, sup.y1, sup.x2, sup.y2, dem.x1, dem.y1, dem.x2, dem.y2);

  // Pmin is ABOVE Pe. In SVG, above Pe means lower y value.
  const pminY = eq.y - 40;

  // At Pmin: find Qs (on supply, higher quantity) and Qd (on demand, lower quantity)
  const qsX = lerp(pminY, sup.y1, sup.y2, sup.x1, sup.x2);
  const qdX = lerp(pminY, dem.y1, dem.y2, dem.x1, dem.x2);

  // Welfare loss triangle: between Qd and Qe
  const sAtQd = yOnLine(qdX, sup.x1, sup.y1, sup.x2, sup.y2);
  const wlTriPoints = `${r(eq.x)},${r(eq.y)} ${r(qdX)},${r(pminY)} ${r(qdX)},${r(sAtQd)}`;

  const excessMidX = (qdX + qsX) / 2;

  return `${svgOpen()}
${defs()}
${axes('Quantity', 'Price')}

<!-- Supply -->
<line x1="${sup.x1}" y1="${sup.y1}" x2="${sup.x2}" y2="${sup.y2}" stroke="${BLUE}" stroke-width="2.5"/>
<text x="${sup.x2 + 4}" y="${sup.y2 + 4}" fill="${BLUE}" font-size="12" font-weight="700" font-family="${FONT}">S</text>

<!-- Demand -->
<line x1="${dem.x1}" y1="${dem.y1}" x2="${dem.x2}" y2="${dem.y2}" stroke="${GREEN}" stroke-width="2.5"/>
<text x="${dem.x2 + 4}" y="${dem.y2 + 4}" fill="${GREEN}" font-size="12" font-weight="700" font-family="${FONT}">D</text>

<!-- Equilibrium dashed lines -->
${dashBoth(eq.x, eq.y)}
${yLabel(eq.y, 'Pe')}
${xLabel(eq.x, 'Qe')}
${dot(eq.x, eq.y, AXIS_COLOR, 3.5)}

<!-- Price floor line (Pmin) -->
<line x1="${PX_LEFT}" y1="${r(pminY)}" x2="${PX_RIGHT}" y2="${r(pminY)}" stroke="${RED}" stroke-width="2" stroke-dasharray="8,5"/>
${yLabel(pminY, 'Pmin')}

<!-- Dashed lines from Qd and Qs to x-axis -->
${dashToX(qdX, pminY)}
${dashToX(qsX, pminY)}
${xLabel(qdX, 'Qd')}
${xLabel(qsX, 'Qs')}

<!-- Excess supply shading -->
<rect x="${r(qdX)}" y="${r(pminY - 8)}" width="${r(qsX - qdX)}" height="16" fill="${RED}" fill-opacity="0.1" rx="2"/>
<line x1="${r(qdX)}" y1="${r(pminY)}" x2="${r(qsX)}" y2="${r(pminY)}" stroke="${RED}" stroke-width="2.5"/>
<!-- Excess supply label -->
<text x="${r(excessMidX)}" y="${r(pminY - 14)}" fill="${RED}" font-size="10" font-weight="700" text-anchor="middle" font-family="${FONT}">Excess Supply</text>
<line x1="${r(qdX + 8)}" y1="${r(pminY - 8)}" x2="${r(qsX - 8)}" y2="${r(pminY - 8)}" stroke="${RED}" stroke-width="1" marker-end="url(#ah)"/>

<!-- Welfare loss triangle -->
<polygon points="${wlTriPoints}" fill="${ORANGE}" fill-opacity="0.15" stroke="${ORANGE}" stroke-width="1.5"/>
<text x="${r(qdX + 6)}" y="${r((eq.y + pminY) / 2 + 2)}" fill="${ORANGE}" font-size="9" font-weight="700" font-family="${FONT}">DWL</text>

<!-- Dots on Pmin line -->
${dot(qdX, pminY, GREEN, 3.5)}
${dot(qsX, pminY, BLUE, 3.5)}

</svg>`;
}


/* ===================================================================
 *  DIAGRAM 5: Tax to Correct Negative Externality  (gov-intervention, index 2)
 * =================================================================== */
function taxNegativeExternality() {
  // MPC: upward from (90,260) to (440,80)
  const mpc = { x1: 90, y1: 260, x2: 440, y2: 80 };
  // MSC: upward from (90,210) to (440,40) -- above MPC (= MPC + Tax)
  const msc = { x1: 90, y1: 210, x2: 440, y2: 40 };
  // D = MPB = MSB: downward from (90,60) to (440,260)
  const dem = { x1: 90, y1: 60, x2: 440, y2: 260 };

  // Market eq: MPC intersect D
  const eqMarket = intersect(mpc.x1, mpc.y1, mpc.x2, mpc.y2, dem.x1, dem.y1, dem.x2, dem.y2);
  // Social optimum: MSC intersect D
  const eqSocial = intersect(msc.x1, msc.y1, msc.x2, msc.y2, dem.x1, dem.y1, dem.x2, dem.y2);

  // At Qopt, what does MPC give? (what producers receive)
  const mpcAtQopt = yOnLine(eqSocial.x, mpc.x1, mpc.y1, mpc.x2, mpc.y2);
  // At Qopt, MSC gives the consumer price = eqSocial.y

  // Tax wedge at Qopt: from MPC(Qopt) to MSC(Qopt) = eqSocial.y
  const taxTop = eqSocial.y;
  const taxBottom = mpcAtQopt;
  const taxBracketX = eqSocial.x - 14;

  return `${svgOpen()}
${defs()}
${axes('Quantity', 'Price / Cost')}

<!-- MPC line -->
<line x1="${mpc.x1}" y1="${mpc.y1}" x2="${mpc.x2}" y2="${mpc.y2}" stroke="${BLUE}" stroke-width="2.5"/>
<text x="${mpc.x2 + 4}" y="${mpc.y2 + 4}" fill="${BLUE}" font-size="11" font-weight="700" font-family="${FONT}">MPC</text>

<!-- MSC line -->
<line x1="${msc.x1}" y1="${msc.y1}" x2="${msc.x2}" y2="${msc.y2}" stroke="${RED}" stroke-width="2.5"/>
<text x="${msc.x2 + 4}" y="${msc.y2 - 2}" fill="${RED}" font-size="11" font-weight="700" font-family="${FONT}">MSC</text>

<!-- MPC + Tax dashed line (overlapping MSC) -->
<line x1="${msc.x1}" y1="${msc.y1}" x2="${msc.x2}" y2="${msc.y2}" stroke="${PURPLE}" stroke-width="2" stroke-dasharray="6,4"/>
<text x="${msc.x1 - 2}" y="${msc.y1 - 8}" fill="${PURPLE}" font-size="10" font-weight="700" font-family="${FONT}">MPC + Tax</text>

<!-- D = MPB = MSB line -->
<line x1="${dem.x1}" y1="${dem.y1}" x2="${dem.x2}" y2="${dem.y2}" stroke="${GREEN}" stroke-width="2.5"/>
<text x="${dem.x2 - 90}" y="${dem.y2 + 16}" fill="${GREEN}" font-size="11" font-weight="700" font-family="${FONT}">D = MPB = MSB</text>

<!-- Dashed lines: market eq -->
${dashBoth(eqMarket.x, eqMarket.y)}
${yLabel(eqMarket.y, 'Pe')}
${xLabel(eqMarket.x, 'Qe')}
${dot(eqMarket.x, eqMarket.y, BLUE, 3.5)}

<!-- Dashed lines: social optimum -->
${dashBoth(eqSocial.x, eqSocial.y)}
${yLabel(eqSocial.y, 'Pc')}
${xLabel(eqSocial.x, 'Qopt')}
${dot(eqSocial.x, eqSocial.y, RED, 3.5)}

<!-- Dashed line from producer price to y-axis -->
${dashToY(eqSocial.x, mpcAtQopt)}
${yLabel(mpcAtQopt, 'Pp')}

<!-- Tax wedge bracket -->
<line x1="${r(taxBracketX)}" y1="${r(taxTop)}" x2="${r(taxBracketX)}" y2="${r(taxBottom)}" stroke="${PURPLE}" stroke-width="2"/>
<line x1="${r(taxBracketX - 4)}" y1="${r(taxTop)}" x2="${r(taxBracketX + 4)}" y2="${r(taxTop)}" stroke="${PURPLE}" stroke-width="2"/>
<line x1="${r(taxBracketX - 4)}" y1="${r(taxBottom)}" x2="${r(taxBracketX + 4)}" y2="${r(taxBottom)}" stroke="${PURPLE}" stroke-width="2"/>
<text x="${r(taxBracketX - 8)}" y="${r((taxTop + taxBottom) / 2 + 4)}" fill="${PURPLE}" font-size="10" font-weight="700" text-anchor="end" font-family="${FONT}">Tax</text>

<!-- Arrow showing shift from Qe to Qopt -->
<line x1="${r(eqMarket.x - 5)}" y1="${PY_BOTTOM + 30}" x2="${r(eqSocial.x + 5)}" y2="${PY_BOTTOM + 30}" stroke="${PURPLE}" stroke-width="1.5" marker-end="url(#ah)"/>

</svg>`;
}


/* ===================================================================
 *  DIAGRAM 6: Subsidy to Correct Positive Externality  (gov-intervention, index 3)
 * =================================================================== */
function subsidyPositiveExternality() {
  // S = MPC: upward from (90,260) to (440,80)
  const sup = { x1: 90, y1: 260, x2: 440, y2: 80 };
  // D = MPB: downward from (90,60) to (440,260)
  const mpb = { x1: 90, y1: 60, x2: 440, y2: 260 };
  // MSB: shifted right from (140,50) to (460,260), clip at x=450
  const msbFullX2 = 460, msbFullY2 = 260;
  const tClip = (450 - 140) / (msbFullX2 - 140);
  const msbClipY = 50 + tClip * (msbFullY2 - 50);
  const msb = { x1: 140, y1: 50, x2: 450, y2: r(msbClipY) };

  // Market eq: S intersect MPB
  const eqMarket = intersect(sup.x1, sup.y1, sup.x2, sup.y2, mpb.x1, mpb.y1, mpb.x2, mpb.y2);
  // Social optimum: S intersect MSB
  const eqSocial = intersect(sup.x1, sup.y1, sup.x2, sup.y2, 140, 50, msbFullX2, msbFullY2);

  // S + Subsidy: shift supply right so it passes through eqSocial when intersecting MPB
  // The subsidy shifts S right. The new supply (S+Subsidy) intersects MPB at Qopt.
  // At Qopt on MPB: price = yOnLine(eqSocial.x, mpb)
  const mpbAtQopt = yOnLine(eqSocial.x, mpb.x1, mpb.y1, mpb.x2, mpb.y2);
  // The S+Subsidy line should pass through (eqSocial.x, mpbAtQopt) and be parallel to S
  // S slope in pixel space: (80-260)/(440-90) = -180/350
  const sSlope = (sup.y2 - sup.y1) / (sup.x2 - sup.x1); // negative (upward in SVG is lower y)
  // S + Subsidy: y - mpbAtQopt = sSlope * (x - eqSocial.x)
  // At x=90: y = mpbAtQopt + sSlope * (90 - eqSocial.x)
  const subSupY1 = mpbAtQopt + sSlope * (90 - eqSocial.x);
  // At x=440: y = mpbAtQopt + sSlope * (440 - eqSocial.x)
  const subSupY2 = mpbAtQopt + sSlope * (440 - eqSocial.x);
  const subSup = { x1: 90, y1: r(subSupY1), x2: 440, y2: r(subSupY2) };

  // At Qopt on original S: producer price
  const sAtQopt = yOnLine(eqSocial.x, sup.x1, sup.y1, sup.x2, sup.y2);

  // Subsidy bracket at Qopt: from S(Qopt) to MPB(Qopt)
  const subBracketX = eqSocial.x + 14;
  const subTop = sAtQopt;       // higher price on S (lower y in SVG)
  const subBottom = mpbAtQopt;   // lower price on MPB (higher y in SVG)

  return `${svgOpen()}
${defs()}
${axes('Quantity', 'Price / Cost')}

<!-- S = MPC -->
<line x1="${sup.x1}" y1="${sup.y1}" x2="${sup.x2}" y2="${sup.y2}" stroke="${BLUE}" stroke-width="2.5"/>
<text x="${sup.x2 + 4}" y="${sup.y2 + 4}" fill="${BLUE}" font-size="11" font-weight="700" font-family="${FONT}">S = MPC</text>

<!-- D = MPB -->
<line x1="${mpb.x1}" y1="${mpb.y1}" x2="${mpb.x2}" y2="${mpb.y2}" stroke="${GREEN}" stroke-width="2.5"/>
<text x="${mpb.x2 - 55}" y="${mpb.y2 + 16}" fill="${GREEN}" font-size="11" font-weight="700" font-family="${FONT}">D = MPB</text>

<!-- MSB -->
<line x1="${msb.x1}" y1="${msb.y1}" x2="${msb.x2}" y2="${msb.y2}" stroke="${ORANGE}" stroke-width="2.5"/>
<text x="${msb.x2 - 24}" y="${msb.y2 + 16}" fill="${ORANGE}" font-size="11" font-weight="700" font-family="${FONT}">MSB</text>

<!-- S + Subsidy (dashed purple, shifted right) -->
<line x1="${subSup.x1}" y1="${subSup.y1}" x2="${subSup.x2}" y2="${subSup.y2}" stroke="${PURPLE}" stroke-width="2" stroke-dasharray="6,4"/>
<text x="${subSup.x2 + 4}" y="${subSup.y2 + 4}" fill="${PURPLE}" font-size="10" font-weight="700" font-family="${FONT}">S + Sub</text>

<!-- Dashed lines: market eq -->
${dashBoth(eqMarket.x, eqMarket.y)}
${yLabel(eqMarket.y, 'Pe')}
${xLabel(eqMarket.x, 'Qe')}
${dot(eqMarket.x, eqMarket.y, GREEN, 3.5)}

<!-- Dashed lines: social optimum (S+Sub intersect MPB) -->
${dashBoth(eqSocial.x, mpbAtQopt)}
${yLabel(mpbAtQopt, 'Pc')}
${xLabel(eqSocial.x, 'Qopt')}
${dot(eqSocial.x, mpbAtQopt, PURPLE, 3.5)}

<!-- Dashed line from producer receives price -->
${dashToY(eqSocial.x, sAtQopt)}
${yLabel(sAtQopt, 'Pp')}

<!-- Subsidy bracket -->
<line x1="${r(subBracketX)}" y1="${r(subTop)}" x2="${r(subBracketX)}" y2="${r(subBottom)}" stroke="${PURPLE}" stroke-width="2"/>
<line x1="${r(subBracketX - 4)}" y1="${r(subTop)}" x2="${r(subBracketX + 4)}" y2="${r(subTop)}" stroke="${PURPLE}" stroke-width="2"/>
<line x1="${r(subBracketX - 4)}" y1="${r(subBottom)}" x2="${r(subBracketX + 4)}" y2="${r(subBottom)}" stroke="${PURPLE}" stroke-width="2"/>
<text x="${r(subBracketX + 8)}" y="${r((subTop + subBottom) / 2 + 4)}" fill="${PURPLE}" font-size="10" font-weight="700" font-family="${FONT}">Subsidy</text>

</svg>`;
}


/* ===================================================================
 *  Update helper
 * =================================================================== */
async function updateDiagram(sectionId, diagramIndex, newSvg) {
  const { data, error } = await supabase
    .from('section_diagrams')
    .select('data')
    .eq('section_id', sectionId)
    .single();

  if (error) {
    console.error(`Fetch failed for ${sectionId}:`, error.message);
    return false;
  }

  const diagrams = data.data;

  if (!diagrams[diagramIndex]) {
    console.error(`No diagram at index ${diagramIndex} for ${sectionId}`);
    return false;
  }

  diagrams[diagramIndex].svg = newSvg;

  const { error: e2 } = await supabase
    .from('section_diagrams')
    .update({ data: diagrams })
    .eq('section_id', sectionId);

  if (e2) {
    console.error(`Update failed for ${sectionId}[${diagramIndex}]:`, e2.message);
    return false;
  }

  return true;
}


/* ===================================================================
 *  Main runner
 * =================================================================== */
async function main() {
  console.log('=== Fixing externality & government intervention diagrams ===\n');

  const tasks = [
    {
      section: 'market-failure',
      index: 0,
      name: 'Negative Externality',
      svg: negativeExternality(),
    },
    {
      section: 'market-failure',
      index: 1,
      name: 'Positive Externality',
      svg: positiveExternality(),
    },
    {
      section: 'government-intervention',
      index: 0,
      name: 'Maximum Price (Price Ceiling)',
      svg: priceCeiling(),
    },
    {
      section: 'government-intervention',
      index: 1,
      name: 'Minimum Price (Price Floor)',
      svg: priceFloor(),
    },
    {
      section: 'government-intervention',
      index: 2,
      name: 'Tax to Correct Negative Externality',
      svg: taxNegativeExternality(),
    },
    {
      section: 'government-intervention',
      index: 3,
      name: 'Subsidy to Correct Positive Externality',
      svg: subsidyPositiveExternality(),
    },
  ];

  let successCount = 0;
  let failCount = 0;

  for (const task of tasks) {
    const ok = await updateDiagram(task.section, task.index, task.svg);
    if (ok) {
      console.log(`  OK  ${task.section}[${task.index}] - ${task.name}`);
      successCount++;
    } else {
      console.log(`  FAIL  ${task.section}[${task.index}] - ${task.name}`);
      failCount++;
    }
  }

  console.log(`\n=== Done: ${successCount} succeeded, ${failCount} failed ===`);
}

main();
