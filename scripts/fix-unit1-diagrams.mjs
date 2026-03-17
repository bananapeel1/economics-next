import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://trweeckuswgkenckeqfb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);

/* ═══════════════════════════════════════════════════════════
 * REUSABLE SVG BUILDING BLOCKS
 * ═══════════════════════════════════════════════════════════ */

const SVG_OPEN = `<svg width="500" height="360" viewBox="0 0 500 360" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',sans-serif;background:transparent">`;
const SVG_CLOSE = `</svg>`;

const MARKERS = `<defs>
  <marker id="arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#e8ecf5"/></marker>
  <marker id="arrB" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#3b82f6"/></marker>
  <marker id="arrR" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#ef4444"/></marker>
  <marker id="arrG" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#059669"/></marker>
  <marker id="arrA" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#f59e0b"/></marker>
</defs>`;

// Standard Price/Quantity axes
const PQ_AXES = `
  <line x1="70" y1="290" x2="465" y2="290" stroke="#e8ecf5" stroke-width="2" marker-end="url(#arr)"/>
  <line x1="70" y1="290" x2="70" y2="28" stroke="#e8ecf5" stroke-width="2" marker-end="url(#arr)"/>
  <text x="270" y="325" fill="#e8ecf5" font-size="14" text-anchor="middle">Quantity (Q)</text>
  <text x="28" y="160" fill="#e8ecf5" font-size="14" text-anchor="middle" transform="rotate(-90,28,160)">Price (P)</text>`;

// Standard Cost/Quantity axes (for externalities)
const CQ_AXES = `
  <line x1="70" y1="290" x2="465" y2="290" stroke="#e8ecf5" stroke-width="2" marker-end="url(#arr)"/>
  <line x1="70" y1="290" x2="70" y2="28" stroke="#e8ecf5" stroke-width="2" marker-end="url(#arr)"/>
  <text x="270" y="325" fill="#e8ecf5" font-size="14" text-anchor="middle">Quantity (Q)</text>
  <text x="28" y="160" fill="#e8ecf5" font-size="14" text-anchor="middle" transform="rotate(-90,28,160)">Costs / Benefits</text>`;

/* Helper: point on a line at parameter t (0-1) */
function lerp(x1, y1, x2, y2, t) {
  return { x: x1 + t * (x2 - x1), y: y1 + t * (y2 - y1) };
}

/* Helper: dashed line to axis */
function dashToAxes(px, py, color = '#e8ecf5') {
  return `<line x1="${px}" y1="${py}" x2="70" y2="${py}" stroke="${color}" stroke-width="1.5" stroke-dasharray="5,4" opacity="0.5"/>
  <line x1="${px}" y1="${py}" x2="${px}" y2="290" stroke="${color}" stroke-width="1.5" stroke-dasharray="5,4" opacity="0.5"/>`;
}

/* ═══════════════════════════════════════════════════════════
 * STANDARD LINES — all lines go from edge to edge of plot area
 * Plot area: x=[90,450], y=[50,275]
 * ═══════════════════════════════════════════════════════════ */

// Demand: downward slope from (90,55) to (450,275)
const D = { x1: 90, y1: 55, x2: 450, y2: 275 };
// Supply: upward slope from (90,275) to (450,55)
const S = { x1: 90, y1: 275, x2: 450, y2: 55 };

// Shifted demand (right): (140,55) to (460,275)
const D2R = { x1: 140, y1: 55, x2: 460, y2: 275 };
// Shifted supply (right = increase): (90,225) to (450,55)
const S2R = { x1: 90, y1: 225, x2: 450, y2: 5 };
// Shifted supply (left = decrease): (90,275) to (400,55)
const S2L = { x1: 140, y1: 275, x2: 460, y2: 95 };

function line(l, color, width = 3) {
  return `<line x1="${l.x1}" y1="${l.y1}" x2="${l.x2}" y2="${l.y2}" stroke="${color}" stroke-width="${width}"/>`;
}

function dashedLine(l, color, width = 2) {
  return `<line x1="${l.x1}" y1="${l.y1}" x2="${l.x2}" y2="${l.y2}" stroke="${color}" stroke-width="${width}" stroke-dasharray="6,4" opacity="0.5"/>`;
}

/* Calculate intersection of two lines */
function intersect(l1, l2) {
  const { x1: a1, y1: b1, x2: a2, y2: b2 } = l1;
  const { x1: c1, y1: d1, x2: c2, y2: d2 } = l2;
  const denom = (a1 - a2) * (d1 - d2) - (b1 - b2) * (c1 - c2);
  if (Math.abs(denom) < 0.001) return null;
  const t = ((a1 - c1) * (d1 - d2) - (b1 - d1) * (c1 - c2)) / denom;
  return { x: Math.round(a1 + t * (a2 - a1)), y: Math.round(b1 + t * (b2 - b1)) };
}

/* ═══════════════════════════════════════════════════════════
 * 1. DEMAND CURVE: MOVEMENTS AND SHIFTS
 * ═══════════════════════════════════════════════════════════ */

function demandMovementAlong() {
  // Two points on demand curve
  const pA = lerp(D.x1, D.y1, D.x2, D.y2, 0.2);  // upper portion
  const pB = lerp(D.x1, D.y1, D.x2, D.y2, 0.65);  // lower portion

  return `${SVG_OPEN}
  ${MARKERS}
  ${PQ_AXES}

  <!-- Demand curve -->
  ${line(D, '#059669')}
  <text x="440" y="${D.y2 - 10}" fill="#059669" font-size="14" font-weight="700">D</text>

  <!-- Point A (higher price, lower quantity) -->
  ${dashToAxes(Math.round(pA.x), Math.round(pA.y), '#3b82f6')}
  <circle cx="${Math.round(pA.x)}" cy="${Math.round(pA.y)}" r="5" fill="#3b82f6"/>
  <text x="${Math.round(pA.x) + 12}" y="${Math.round(pA.y) - 10}" fill="#3b82f6" font-size="12" font-weight="600">A</text>
  <text x="52" y="${Math.round(pA.y) + 4}" fill="#3b82f6" font-size="11" text-anchor="end">P\u2081</text>
  <text x="${Math.round(pA.x)}" y="306" fill="#3b82f6" font-size="11" text-anchor="middle">Q\u2081</text>

  <!-- Point B (lower price, higher quantity) -->
  ${dashToAxes(Math.round(pB.x), Math.round(pB.y), '#ef4444')}
  <circle cx="${Math.round(pB.x)}" cy="${Math.round(pB.y)}" r="5" fill="#ef4444"/>
  <text x="${Math.round(pB.x) + 12}" y="${Math.round(pB.y) - 10}" fill="#ef4444" font-size="12" font-weight="600">B</text>
  <text x="52" y="${Math.round(pB.y) + 4}" fill="#ef4444" font-size="11" text-anchor="end">P\u2082</text>
  <text x="${Math.round(pB.x)}" y="306" fill="#ef4444" font-size="11" text-anchor="middle">Q\u2082</text>

  <!-- Arrow from A to B along curve -->
  <path d="M ${Math.round(pA.x + 8)} ${Math.round(pA.y + 6)} L ${Math.round(pB.x - 8)} ${Math.round(pB.y - 6)}" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#arrA)" fill="none"/>
  <text x="${Math.round((pA.x + pB.x) / 2) + 15}" y="${Math.round((pA.y + pB.y) / 2) - 8}" fill="#f59e0b" font-size="11" font-weight="600">Movement along</text>

  <text x="270" y="350" fill="#e8ecf5" font-size="11" text-anchor="middle" opacity="0.6">A change in price causes movement along the demand curve</text>
${SVG_CLOSE}`;
}

function demandShift() {
  return `${SVG_OPEN}
  ${MARKERS}
  ${PQ_AXES}

  <!-- Original demand (D1) -->
  ${dashedLine(D, '#059669')}
  <text x="440" y="${D.y2 - 8}" fill="#059669" font-size="13" opacity="0.6">D\u2081</text>

  <!-- Shifted demand (D2 — rightward) -->
  ${line(D2R, '#059669')}
  <text x="455" y="${D2R.y2 - 8}" fill="#059669" font-size="14" font-weight="700">D\u2082</text>

  <!-- Shift arrows -->
  <line x1="220" y1="165" x2="275" y2="165" stroke="#3b82f6" stroke-width="2.5" marker-end="url(#arrB)"/>
  <line x1="330" y1="210" x2="385" y2="210" stroke="#3b82f6" stroke-width="2.5" marker-end="url(#arrB)"/>

  <text x="270" y="350" fill="#3b82f6" font-size="11" text-anchor="middle">Non-price factors shift the entire demand curve (income, tastes, substitutes)</text>
${SVG_CLOSE}`;
}

/* ═══════════════════════════════════════════════════════════
 * 2. SUPPLY CURVE: MOVEMENTS AND SHIFTS
 * ═══════════════════════════════════════════════════════════ */

function supplyBase() {
  const pA = lerp(S.x1, S.y1, S.x2, S.y2, 0.35);
  const pB = lerp(S.x1, S.y1, S.x2, S.y2, 0.7);

  return `${SVG_OPEN}
  ${MARKERS}
  ${PQ_AXES}

  <!-- Supply curve -->
  ${line(S, '#3b82f6')}
  <text x="440" y="${S.y2 + 20}" fill="#3b82f6" font-size="14" font-weight="700">S</text>

  <!-- Point A -->
  ${dashToAxes(Math.round(pA.x), Math.round(pA.y), '#059669')}
  <circle cx="${Math.round(pA.x)}" cy="${Math.round(pA.y)}" r="5" fill="#059669"/>
  <text x="${Math.round(pA.x) + 12}" y="${Math.round(pA.y) - 10}" fill="#059669" font-size="12" font-weight="600">A</text>
  <text x="52" y="${Math.round(pA.y) + 4}" fill="#059669" font-size="11" text-anchor="end">P\u2081</text>
  <text x="${Math.round(pA.x)}" y="306" fill="#059669" font-size="11" text-anchor="middle">Q\u2081</text>

  <!-- Point B -->
  ${dashToAxes(Math.round(pB.x), Math.round(pB.y), '#f59e0b')}
  <circle cx="${Math.round(pB.x)}" cy="${Math.round(pB.y)}" r="5" fill="#f59e0b"/>
  <text x="${Math.round(pB.x) + 12}" y="${Math.round(pB.y) + 18}" fill="#f59e0b" font-size="12" font-weight="600">B</text>
  <text x="52" y="${Math.round(pB.y) + 4}" fill="#f59e0b" font-size="11" text-anchor="end">P\u2082</text>
  <text x="${Math.round(pB.x)}" y="306" fill="#f59e0b" font-size="11" text-anchor="middle">Q\u2082</text>

  <!-- Arrow from A to B -->
  <path d="M ${Math.round(pA.x + 8)} ${Math.round(pA.y - 6)} L ${Math.round(pB.x - 8)} ${Math.round(pB.y + 6)}" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#arrA)" fill="none"/>
  <text x="${Math.round((pA.x + pB.x) / 2) + 15}" y="${Math.round((pA.y + pB.y) / 2) + 20}" fill="#f59e0b" font-size="11" font-weight="600">Movement along</text>
${SVG_CLOSE}`;
}

function supplyShiftRight() {
  // Supply increases → shifts right/down
  const S_orig = { x1: 140, y1: 275, x2: 460, y2: 95 };
  return `${SVG_OPEN}
  ${MARKERS}
  ${PQ_AXES}

  <!-- Original supply (S1) -->
  ${dashedLine(S_orig, '#3b82f6')}
  <text x="455" y="${S_orig.y2 + 18}" fill="#3b82f6" font-size="13" opacity="0.6">S\u2081</text>

  <!-- New supply (S2 — shifted right/down) -->
  ${line(S, '#3b82f6')}
  <text x="440" y="${S.y2 + 20}" fill="#3b82f6" font-size="14" font-weight="700">S\u2082</text>

  <!-- Shift arrows -->
  <line x1="260" y1="135" x2="210" y2="165" stroke="#059669" stroke-width="2.5" marker-end="url(#arrG)"/>
  <line x1="350" y1="170" x2="300" y2="200" stroke="#059669" stroke-width="2.5" marker-end="url(#arrG)"/>

  <text x="270" y="350" fill="#059669" font-size="11" text-anchor="middle">Lower costs of production shift supply to the right</text>
${SVG_CLOSE}`;
}

function supplyShiftLeft() {
  const S_shifted = { x1: 140, y1: 275, x2: 460, y2: 95 };
  return `${SVG_OPEN}
  ${MARKERS}
  ${PQ_AXES}

  <!-- Original supply (S1) -->
  ${dashedLine(S, '#3b82f6')}
  <text x="440" y="${S.y2 + 20}" fill="#3b82f6" font-size="13" opacity="0.6">S\u2081</text>

  <!-- New supply (S2 — shifted left/up) -->
  ${line(S_shifted, '#3b82f6')}
  <text x="455" y="${S_shifted.y2 + 18}" fill="#3b82f6" font-size="14" font-weight="700">S\u2082</text>

  <!-- Shift arrows -->
  <line x1="210" y1="180" x2="260" y2="150" stroke="#ef4444" stroke-width="2.5" marker-end="url(#arrR)"/>
  <line x1="300" y1="215" x2="350" y2="185" stroke="#ef4444" stroke-width="2.5" marker-end="url(#arrR)"/>

  <text x="270" y="350" fill="#ef4444" font-size="11" text-anchor="middle">Higher costs of production shift supply to the left</text>
${SVG_CLOSE}`;
}

/* ═══════════════════════════════════════════════════════════
 * 3. SUPPLY & DEMAND EQUILIBRIUM
 * ═══════════════════════════════════════════════════════════ */

function sdEquilibrium() {
  const eq = intersect(D, S);
  return `${SVG_OPEN}
  ${MARKERS}
  ${PQ_AXES}

  <!-- Supply and Demand -->
  ${line(S, '#3b82f6')}
  <text x="440" y="${S.y2 + 20}" fill="#3b82f6" font-size="14" font-weight="700">S</text>
  ${line(D, '#059669')}
  <text x="440" y="${D.y2 - 10}" fill="#059669" font-size="14" font-weight="700">D</text>

  <!-- Equilibrium -->
  ${dashToAxes(eq.x, eq.y)}
  <circle cx="${eq.x}" cy="${eq.y}" r="5" fill="#f59e0b"/>
  <text x="${eq.x + 10}" y="${eq.y - 12}" fill="#f59e0b" font-size="13" font-weight="700">E</text>
  <text x="52" y="${eq.y + 4}" fill="#e8ecf5" font-size="11" text-anchor="end">Pe</text>
  <text x="${eq.x}" y="306" fill="#e8ecf5" font-size="11" text-anchor="middle">Qe</text>
${SVG_CLOSE}`;
}

function sdIncreaseDemand() {
  const eq1 = intersect(D, S);
  const eq2 = intersect(D2R, S);
  return `${SVG_OPEN}
  ${MARKERS}
  ${PQ_AXES}

  <!-- Supply -->
  ${line(S, '#3b82f6')}
  <text x="440" y="${S.y2 + 20}" fill="#3b82f6" font-size="14" font-weight="700">S</text>

  <!-- Original demand (D1) dashed -->
  ${dashedLine(D, '#059669')}
  <text x="440" y="${D.y2 - 8}" fill="#059669" font-size="13" opacity="0.6">D\u2081</text>

  <!-- New demand (D2) -->
  ${line(D2R, '#059669')}
  <text x="455" y="${D2R.y2 - 8}" fill="#059669" font-size="14" font-weight="700">D\u2082</text>

  <!-- Old equilibrium -->
  ${dashToAxes(eq1.x, eq1.y, '#e8ecf5')}
  <circle cx="${eq1.x}" cy="${eq1.y}" r="4" fill="#e8ecf5" opacity="0.5"/>
  <text x="52" y="${eq1.y + 4}" fill="#e8ecf5" font-size="11" text-anchor="end" opacity="0.6">P\u2081</text>
  <text x="${eq1.x}" y="306" fill="#e8ecf5" font-size="11" text-anchor="middle" opacity="0.6">Q\u2081</text>

  <!-- New equilibrium -->
  ${dashToAxes(eq2.x, eq2.y, '#f59e0b')}
  <circle cx="${eq2.x}" cy="${eq2.y}" r="5" fill="#f59e0b"/>
  <text x="${eq2.x + 10}" y="${eq2.y - 12}" fill="#f59e0b" font-size="13" font-weight="700">E\u2082</text>
  <text x="52" y="${eq2.y + 4}" fill="#f59e0b" font-size="11" text-anchor="end">P\u2082</text>
  <text x="${eq2.x}" y="306" fill="#f59e0b" font-size="11" text-anchor="middle">Q\u2082</text>

  <!-- Shift arrow -->
  <line x1="${eq1.x + 10}" y1="${eq1.y}" x2="${eq2.x - 10}" y2="${eq2.y}" stroke="#059669" stroke-width="2.5" marker-end="url(#arrG)"/>

  <text x="270" y="350" fill="#e8ecf5" font-size="11" text-anchor="middle" opacity="0.6">Increase in demand \u2192 higher equilibrium price and quantity</text>
${SVG_CLOSE}`;
}

function sdDecreaseSupply() {
  const eq1 = intersect(D, S);
  const eq2 = intersect(D, S2L);
  return `${SVG_OPEN}
  ${MARKERS}
  ${PQ_AXES}

  <!-- Demand -->
  ${line(D, '#059669')}
  <text x="440" y="${D.y2 - 10}" fill="#059669" font-size="14" font-weight="700">D</text>

  <!-- Original supply (S1) dashed -->
  ${dashedLine(S, '#3b82f6')}
  <text x="440" y="${S.y2 + 20}" fill="#3b82f6" font-size="13" opacity="0.6">S\u2081</text>

  <!-- New supply (S2 — shifted left) -->
  ${line(S2L, '#3b82f6')}
  <text x="455" y="${S2L.y2 + 18}" fill="#3b82f6" font-size="14" font-weight="700">S\u2082</text>

  <!-- Old equilibrium -->
  ${dashToAxes(eq1.x, eq1.y, '#e8ecf5')}
  <circle cx="${eq1.x}" cy="${eq1.y}" r="4" fill="#e8ecf5" opacity="0.5"/>
  <text x="52" y="${eq1.y + 4}" fill="#e8ecf5" font-size="11" text-anchor="end" opacity="0.6">P\u2081</text>
  <text x="${eq1.x}" y="306" fill="#e8ecf5" font-size="11" text-anchor="middle" opacity="0.6">Q\u2081</text>

  <!-- New equilibrium -->
  ${dashToAxes(eq2.x, eq2.y, '#f59e0b')}
  <circle cx="${eq2.x}" cy="${eq2.y}" r="5" fill="#f59e0b"/>
  <text x="${eq2.x + 10}" y="${eq2.y - 12}" fill="#f59e0b" font-size="13" font-weight="700">E\u2082</text>
  <text x="52" y="${eq2.y + 4}" fill="#f59e0b" font-size="11" text-anchor="end">P\u2082</text>
  <text x="${eq2.x}" y="306" fill="#f59e0b" font-size="11" text-anchor="middle">Q\u2082</text>

  <text x="270" y="350" fill="#e8ecf5" font-size="11" text-anchor="middle" opacity="0.6">Decrease in supply \u2192 higher price, lower quantity</text>
${SVG_CLOSE}`;
}

function sdIndirectTax() {
  // Tax shifts supply left/up
  const S_tax = { x1: 140, y1: 275, x2: 460, y2: 95 };
  const eq1 = intersect(D, S);
  const eq2 = intersect(D, S_tax);

  // Tax wedge
  const taxTop = { x: eq2.x, y: eq2.y };
  // Point on original S at same x as eq2
  const t_on_S = (eq2.x - S.x1) / (S.x2 - S.x1);
  const taxBot = lerp(S.x1, S.y1, S.x2, S.y2, t_on_S);

  return `${SVG_OPEN}
  ${MARKERS}
  ${PQ_AXES}

  <!-- Demand -->
  ${line(D, '#059669')}
  <text x="440" y="${D.y2 - 10}" fill="#059669" font-size="14" font-weight="700">D</text>

  <!-- Original supply -->
  ${dashedLine(S, '#3b82f6')}
  <text x="440" y="${S.y2 + 20}" fill="#3b82f6" font-size="13" opacity="0.6">S</text>

  <!-- Supply + Tax -->
  ${line(S_tax, '#3b82f6')}
  <text x="455" y="${S_tax.y2 + 18}" fill="#3b82f6" font-size="14" font-weight="700">S + Tax</text>

  <!-- Old equilibrium -->
  ${dashToAxes(eq1.x, eq1.y, '#e8ecf5')}
  <circle cx="${eq1.x}" cy="${eq1.y}" r="4" fill="#e8ecf5" opacity="0.4"/>
  <text x="52" y="${eq1.y + 4}" fill="#e8ecf5" font-size="11" text-anchor="end" opacity="0.5">P\u2081</text>
  <text x="${eq1.x}" y="306" fill="#e8ecf5" font-size="11" text-anchor="middle" opacity="0.5">Q\u2081</text>

  <!-- New equilibrium -->
  ${dashToAxes(eq2.x, eq2.y, '#f59e0b')}
  <circle cx="${eq2.x}" cy="${eq2.y}" r="5" fill="#f59e0b"/>
  <text x="52" y="${eq2.y + 4}" fill="#f59e0b" font-size="11" text-anchor="end">P\u2082</text>
  <text x="${eq2.x}" y="306" fill="#f59e0b" font-size="11" text-anchor="middle">Q\u2082</text>

  <!-- Tax wedge bracket -->
  <line x1="${eq2.x + 12}" y1="${Math.round(taxTop.y)}" x2="${eq2.x + 12}" y2="${Math.round(taxBot.y)}" stroke="#ef4444" stroke-width="2.5"/>
  <line x1="${eq2.x + 7}" y1="${Math.round(taxTop.y)}" x2="${eq2.x + 17}" y2="${Math.round(taxTop.y)}" stroke="#ef4444" stroke-width="2"/>
  <line x1="${eq2.x + 7}" y1="${Math.round(taxBot.y)}" x2="${eq2.x + 17}" y2="${Math.round(taxBot.y)}" stroke="#ef4444" stroke-width="2"/>
  <text x="${eq2.x + 25}" y="${Math.round((taxTop.y + taxBot.y) / 2) + 4}" fill="#ef4444" font-size="12" font-weight="700">Tax</text>

  <text x="270" y="350" fill="#e8ecf5" font-size="11" text-anchor="middle" opacity="0.6">Indirect tax shifts supply left, raises price and reduces quantity</text>
${SVG_CLOSE}`;
}

/* ═══════════════════════════════════════════════════════════
 * 4. MARKET FAILURE — EXTERNALITIES
 * ═══════════════════════════════════════════════════════════ */

function negativeExternality() {
  // MPC (lower), MSC (higher), D = MPB = MSB
  const MPC = { x1: 90, y1: 270, x2: 440, y2: 70 };
  const MSC = { x1: 90, y1: 220, x2: 440, y2: 30 };
  const DD  = { x1: 90, y1: 55, x2: 440, y2: 270 };

  const eqMarket = intersect(MPC, DD);   // Qm (overproduction)
  const eqSocial = intersect(MSC, DD);   // Qopt

  // MSC at Qm — for welfare loss triangle top
  const t_msc_qm = (eqMarket.x - MSC.x1) / (MSC.x2 - MSC.x1);
  const mscAtQm = lerp(MSC.x1, MSC.y1, MSC.x2, MSC.y2, t_msc_qm);

  return `${SVG_OPEN}
  ${MARKERS}
  ${CQ_AXES}

  <!-- MPC (supply) -->
  ${line(MPC, '#3b82f6')}
  <text x="445" y="${MPC.y2 - 5}" fill="#3b82f6" font-size="13" font-weight="700">MPC</text>

  <!-- MSC (higher cost) -->
  ${line(MSC, '#ef4444')}
  <text x="445" y="${MSC.y2 + 18}" fill="#ef4444" font-size="13" font-weight="700">MSC</text>

  <!-- D = MPB = MSB -->
  ${line(DD, '#059669')}
  <text x="380" y="${DD.y2 - 5}" fill="#059669" font-size="12" font-weight="700">D = MPB = MSB</text>

  <!-- MEC bracket between MSC and MPC at x=180 -->
  <line x1="175" y1="222" x2="175" y2="185" stroke="#f59e0b" stroke-width="2"/>
  <line x1="170" y1="222" x2="180" y2="222" stroke="#f59e0b" stroke-width="2"/>
  <line x1="170" y1="185" x2="180" y2="185" stroke="#f59e0b" stroke-width="2"/>
  <text x="160" y="207" fill="#f59e0b" font-size="11" font-weight="600" text-anchor="end">MEC</text>

  <!-- Market equilibrium Qm -->
  <line x1="${eqMarket.x}" y1="${eqMarket.y}" x2="${eqMarket.x}" y2="290" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="5,4"/>
  <circle cx="${eqMarket.x}" cy="${eqMarket.y}" r="4" fill="#3b82f6"/>
  <text x="${eqMarket.x}" y="308" fill="#3b82f6" font-size="12" text-anchor="middle" font-weight="600">Qm</text>

  <!-- Social optimum Qopt -->
  <line x1="${eqSocial.x}" y1="${eqSocial.y}" x2="${eqSocial.x}" y2="290" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="5,4"/>
  <circle cx="${eqSocial.x}" cy="${eqSocial.y}" r="4" fill="#ef4444"/>
  <text x="${eqSocial.x}" y="308" fill="#ef4444" font-size="12" text-anchor="middle" font-weight="600">Qopt</text>

  <!-- Welfare loss triangle -->
  <polygon points="${eqSocial.x},${eqSocial.y} ${eqMarket.x},${eqMarket.y} ${eqMarket.x},${Math.round(mscAtQm.y)}" fill="#f59e0b" opacity="0.2" stroke="#f59e0b" stroke-width="2"/>
  <text x="${eqMarket.x + 15}" y="${Math.round(mscAtQm.y) + 5}" fill="#f59e0b" font-size="11" font-weight="700">Welfare</text>
  <text x="${eqMarket.x + 15}" y="${Math.round(mscAtQm.y) + 18}" fill="#f59e0b" font-size="11" font-weight="700">Loss</text>
${SVG_CLOSE}`;
}

function positiveExternality() {
  const SS   = { x1: 90, y1: 270, x2: 440, y2: 70 };  // S = MPC = MSC
  const MPB  = { x1: 90, y1: 55, x2: 440, y2: 270 };  // D = MPB
  const MSB  = { x1: 90, y1: 55, x2: 460, y2: 310 };  // MSB (higher than MPB)
  // Actually MSB is higher (more benefit) — shift demand right
  const MSB2 = { x1: 130, y1: 40, x2: 460, y2: 270 }; // MSB shifted right of MPB

  const eqMarket = intersect(SS, MPB);   // Qm (underconsumption)
  const eqSocial = intersect(SS, MSB2);  // Qopt (higher)

  // MPB at Qopt
  const t_mpb = (eqSocial.x - MPB.x1) / (MPB.x2 - MPB.x1);
  const mpbAtQopt = lerp(MPB.x1, MPB.y1, MPB.x2, MPB.y2, t_mpb);

  return `${SVG_OPEN}
  ${MARKERS}
  ${CQ_AXES}

  <!-- S = MPC = MSC -->
  ${line(SS, '#3b82f6')}
  <text x="445" y="${SS.y2 - 5}" fill="#3b82f6" font-size="12" font-weight="700">S = MPC = MSC</text>

  <!-- D = MPB -->
  ${line(MPB, '#059669')}
  <text x="440" y="${MPB.y2 - 5}" fill="#059669" font-size="13" font-weight="700">D = MPB</text>

  <!-- MSB (higher) -->
  ${line(MSB2, '#f59e0b')}
  <text x="455" y="${MSB2.y2 - 5}" fill="#f59e0b" font-size="13" font-weight="700">MSB</text>

  <!-- MEB bracket -->
  <line x1="165" y1="${Math.round(mpbAtQopt.y) - 50}" x2="165" y2="${Math.round(mpbAtQopt.y) - 10}" stroke="#f59e0b" stroke-width="2"/>
  <line x1="160" y1="${Math.round(mpbAtQopt.y) - 50}" x2="170" y2="${Math.round(mpbAtQopt.y) - 50}" stroke="#f59e0b" stroke-width="2"/>
  <line x1="160" y1="${Math.round(mpbAtQopt.y) - 10}" x2="170" y2="${Math.round(mpbAtQopt.y) - 10}" stroke="#f59e0b" stroke-width="2"/>
  <text x="150" y="${Math.round(mpbAtQopt.y) - 24}" fill="#f59e0b" font-size="11" font-weight="600" text-anchor="end">MEB</text>

  <!-- Market equilibrium Qm -->
  <line x1="${eqMarket.x}" y1="${eqMarket.y}" x2="${eqMarket.x}" y2="290" stroke="#059669" stroke-width="1.5" stroke-dasharray="5,4"/>
  <circle cx="${eqMarket.x}" cy="${eqMarket.y}" r="4" fill="#059669"/>
  <text x="${eqMarket.x}" y="308" fill="#059669" font-size="12" text-anchor="middle" font-weight="600">Qm</text>

  <!-- Social optimum Qopt -->
  <line x1="${eqSocial.x}" y1="${eqSocial.y}" x2="${eqSocial.x}" y2="290" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5,4"/>
  <circle cx="${eqSocial.x}" cy="${eqSocial.y}" r="4" fill="#f59e0b"/>
  <text x="${eqSocial.x}" y="308" fill="#f59e0b" font-size="12" text-anchor="middle" font-weight="600">Qopt</text>

  <!-- Welfare loss triangle -->
  <polygon points="${eqMarket.x},${eqMarket.y} ${eqSocial.x},${eqSocial.y} ${eqSocial.x},${Math.round(mpbAtQopt.y)}" fill="#f59e0b" opacity="0.2" stroke="#f59e0b" stroke-width="2"/>
  <text x="${eqSocial.x + 15}" y="${Math.round(eqSocial.y) + 5}" fill="#f59e0b" font-size="11" font-weight="700">Welfare</text>
  <text x="${eqSocial.x + 15}" y="${Math.round(eqSocial.y) + 18}" fill="#f59e0b" font-size="11" font-weight="700">Loss</text>
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
    console.error(`  ✗ Failed to fetch ${sectionId}:`, error);
    return false;
  }

  const diagrams = data.data;
  const diagram = diagrams[diagramIndex];

  if (updates.svg) diagram.svg = updates.svg;
  if (updates.scenarios) diagram.scenarios = updates.scenarios;

  const { error: updateError } = await supabase
    .from('section_diagrams')
    .update({ data: diagrams })
    .eq('section_id', sectionId);

  if (updateError) {
    console.error(`  ✗ Failed to update ${sectionId}[${diagramIndex}]:`, updateError);
    return false;
  }
  return true;
}

async function main() {
  console.log('Fixing Unit 1 Economics diagrams...\n');

  // 1. Demand Curve: Movements and Shifts
  let ok = await updateSection('consumer-behaviour-demand', 0, {
    scenarios: [
      { label: 'Movement Along (Price Change)', svg: demandMovementAlong() },
      { label: 'Shift of Demand (Non-Price Factor)', svg: demandShift() },
    ],
  });
  console.log(ok ? '✓' : '✗', 'Demand Curve: Movements and Shifts');

  // 2. Supply Curve: Movements and Shifts
  ok = await updateSection('supply', 0, {
    scenarios: [
      { label: 'Base Supply Curve', svg: supplyBase() },
      { label: 'Rightward Shift (Increase in Supply)', svg: supplyShiftRight() },
      { label: 'Leftward Shift (Decrease in Supply)', svg: supplyShiftLeft() },
    ],
  });
  console.log(ok ? '✓' : '✗', 'Supply Curve: Movements and Shifts');

  // 3. Supply & Demand Equilibrium
  ok = await updateSection('price-determination', 0, {
    scenarios: [
      { label: 'Base Equilibrium', svg: sdEquilibrium() },
      { label: 'Increase in Demand', svg: sdIncreaseDemand() },
      { label: 'Decrease in Supply', svg: sdDecreaseSupply() },
      { label: 'Indirect Tax Effect', svg: sdIndirectTax() },
    ],
  });
  console.log(ok ? '✓' : '✗', 'Supply & Demand Equilibrium');

  // 4. Negative Externality
  ok = await updateSection('market-failure', 0, {
    svg: negativeExternality(),
  });
  console.log(ok ? '✓' : '✗', 'Negative Externality of Production');

  // 5. Positive Externality
  ok = await updateSection('market-failure', 1, {
    svg: positiveExternality(),
  });
  console.log(ok ? '✓' : '✗', 'Positive Externality of Consumption');

  console.log('\nDone! 5 diagram sets updated (12 individual SVGs)');
}

main();
