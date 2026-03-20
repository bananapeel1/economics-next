import { supabase } from './_db.mjs';

/* ── Corrected PPF SVGs ──
 * Design principles:
 *   - PPF curve touches both axes (Y-axis at top, X-axis at right)
 *   - Smooth concave cubic bezier with symmetric control points
 *   - All labels clearly spaced, no overlapping
 *   - Strokes ≥ 2.5px, circle radius ≥ 5px
 *   - Consistent 500×360 viewBox for room below axes
 */

const AXES = `
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#e8ecf5"/></marker>
    <marker id="arrB" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#3b82f6"/></marker>
  </defs>
  <line x1="70" y1="290" x2="465" y2="290" stroke="#e8ecf5" stroke-width="2" marker-end="url(#arr)"/>
  <line x1="70" y1="290" x2="70" y2="28" stroke="#e8ecf5" stroke-width="2" marker-end="url(#arr)"/>
  <text x="270" y="328" fill="#e8ecf5" font-size="14" text-anchor="middle">Consumer Goods</text>
  <text x="28" y="160" fill="#e8ecf5" font-size="14" text-anchor="middle" transform="rotate(-90,28,160)">Capital Goods</text>`;

// PPF curve: starts at Y-axis (70,50), ends at X-axis (460,290)
// Cubic bezier with symmetric concave shape
const PPF_CURVE = 'M 70 50 C 170 50, 460 180, 460 290';
const PPF_FILL  = 'M 70 50 C 170 50, 460 180, 460 290 L 70 290 Z';

// Shifted PPF for economic growth: starts (70,35), ends (470,290)
const PPF2_CURVE = 'M 70 35 C 190 35, 470 165, 470 290';

// Original (smaller) PPF for growth scenario
const PPF1_CURVE = 'M 70 80 C 150 80, 410 200, 410 290';
const PPF1_FILL  = 'M 70 80 C 150 80, 410 200, 410 290 L 70 290 Z';

const scenarios = [
  {
    label: 'Base PPF',
    svg: `<svg width="500" height="360" viewBox="0 0 500 360" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',sans-serif;background:transparent">
  ${AXES}
  <!-- PPF Curve -->
  <path d="${PPF_CURVE}" stroke="#059669" stroke-width="3" fill="none"/>
  <text x="395" y="155" fill="#059669" font-size="14" font-weight="700">PPF</text>

  <!-- Point A on curve (upper-left portion) -->
  <circle cx="185" cy="78" r="5" fill="#3b82f6"/>
  <text x="200" y="72" fill="#3b82f6" font-size="12" font-weight="600">A (Efficient)</text>

  <!-- Point B on curve (lower-right portion) -->
  <circle cx="400" cy="210" r="5" fill="#3b82f6"/>
  <text x="310" y="232" fill="#3b82f6" font-size="12" font-weight="600">B (Efficient)</text>

  <!-- Point C inside curve (inefficient) -->
  <circle cx="220" cy="200" r="5" fill="#ef4444"/>
  <text x="235" y="195" fill="#ef4444" font-size="12" font-weight="600">C (Inefficient)</text>

  <!-- Point D outside curve (unattainable) -->
  <circle cx="400" cy="90" r="5" fill="#e8ecf5" opacity="0.6"/>
  <text x="318" y="85" fill="#e8ecf5" font-size="12" opacity="0.7">D (Unattainable)</text>
</svg>`,
  },
  {
    label: 'Economic Growth (Outward Shift)',
    svg: `<svg width="500" height="360" viewBox="0 0 500 360" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',sans-serif;background:transparent">
  ${AXES}
  <!-- Original PPF (dashed) -->
  <path d="${PPF1_CURVE}" stroke="#e8ecf5" stroke-width="2" fill="none" stroke-dasharray="6,4" opacity="0.5"/>
  <text x="320" y="185" fill="#e8ecf5" font-size="12" opacity="0.6">PPF\u2081</text>

  <!-- New PPF (shifted outward) -->
  <path d="${PPF2_CURVE}" stroke="#059669" stroke-width="3" fill="none"/>
  <text x="400" y="135" fill="#059669" font-size="14" font-weight="700">PPF\u2082</text>

  <!-- Shift arrows -->
  <line x1="250" y1="175" x2="300" y2="130" stroke="#3b82f6" stroke-width="2.5" marker-end="url(#arrB)"/>
  <line x1="340" y1="220" x2="400" y2="185" stroke="#3b82f6" stroke-width="2.5" marker-end="url(#arrB)"/>

  <!-- Cause label -->
  <text x="270" y="350" fill="#3b82f6" font-size="11" text-anchor="middle">Causes: more resources, better technology, improved education</text>
</svg>`,
  },
  {
    label: 'Inefficient Allocation',
    svg: `<svg width="500" height="360" viewBox="0 0 500 360" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',sans-serif;background:transparent">
  ${AXES}
  <!-- Shaded inefficient region (under curve) -->
  <path d="${PPF_FILL}" fill="#ef4444" opacity="0.06"/>

  <!-- PPF Curve -->
  <path d="${PPF_CURVE}" stroke="#059669" stroke-width="3" fill="none"/>
  <text x="395" y="155" fill="#059669" font-size="14" font-weight="700">PPF</text>

  <!-- Point X inside curve -->
  <circle cx="230" cy="200" r="6" fill="#ef4444"/>
  <text x="248" y="192" fill="#ef4444" font-size="13" font-weight="700">X (Inefficient)</text>

  <!-- Arrow: more capital goods (upward) -->
  <line x1="230" y1="190" x2="230" y2="112" stroke="#3b82f6" stroke-width="2.5" stroke-dasharray="6,4" marker-end="url(#arrB)"/>
  <text x="245" y="148" fill="#3b82f6" font-size="12" font-weight="600">More capital goods</text>

  <!-- Arrow: more consumer goods (rightward) -->
  <line x1="240" y1="200" x2="365" y2="200" stroke="#3b82f6" stroke-width="2.5" stroke-dasharray="6,4" marker-end="url(#arrB)"/>
  <text x="270" y="222" fill="#3b82f6" font-size="12" font-weight="600">More consumer goods</text>

  <!-- Note -->
  <text x="270" y="350" fill="#e8ecf5" font-size="11" text-anchor="middle" opacity="0.7">Unemployment or resource misallocation places the economy inside the PPF</text>
</svg>`,
  },
];

async function main() {
  // Get current data
  const { data, error } = await supabase
    .from('section_diagrams')
    .select('data')
    .eq('section_id', 'introductory-concepts')
    .single();

  if (error) { console.error('Fetch error:', error); return; }

  const diagrams = data.data;

  // Update PPF diagram (index 0) with corrected scenarios
  diagrams[0].scenarios = scenarios;
  // Remove top-level svg since scenarios have their own
  delete diagrams[0].svg;

  // Write back
  const { error: updateError } = await supabase
    .from('section_diagrams')
    .update({ data: diagrams })
    .eq('section_id', 'introductory-concepts');

  if (updateError) {
    console.error('Update error:', updateError);
  } else {
    console.log('✓ PPF diagram updated with 3 corrected scenarios');
    console.log('  - Base PPF: symmetric concave curve touching both axes');
    console.log('  - Economic Growth: original (dashed) + shifted PPF');
    console.log('  - Inefficient Allocation: clear labels, no text overlap');
  }
}

main();
