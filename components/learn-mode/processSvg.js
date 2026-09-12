/**
 * Post-processes an SVG element to fix common quality issues:
 * - Remaps the baked dark-mode palette onto theme tokens so diagrams read in both themes
 * - Enforces minimum stroke width (2px) for bold, visible lines
 * - Enforces minimum circle radius (4px) for visible points
 * - Moves all <text> to end of SVG so they render on top of fills
 * - Adds paint-order text halos for readability over colored areas
 * - Sets shape-rendering for crisp lines
 */

/**
 * Diagram SVG markup is stored per section in the database with a dark-tuned
 * palette baked into its fill/stroke attributes — #e8ecf5 text on what the
 * author assumed was a #1e2335 card. In light mode that renders at about
 * 1.2:1. Rather than migrate every diagram in the database, remap the literals
 * onto the --dg-* tokens here, at render time.
 *
 * The remap writes an inline style rather than overwriting the attribute, so the
 * markup it came from stays inspectable and the rule always wins (inline styles
 * beat presentation attributes in the cascade). Using var() rather than a
 * resolved colour means a theme toggle repaints the diagram on its own —
 * processSvg only runs when the SVG content changes.
 *
 * Keys are lowercase 6-digit hex. Dark values of each token are the literals
 * below, so dark mode renders exactly as before.
 */
const PALETTE = {
  '#e8ecf5': '--dg-ink',
  '#e2e8f0': '--dg-ink-2',
  '#94a3b8': '--dg-axis',
  '#7a8299': '--dg-muted',
  '#475569': '--dg-grid',
  '#059669': '--dg-green',
  '#34d399': '--dg-green-2',
  '#ef4444': '--dg-red',
  '#f87171': '--dg-red-2',
  '#3b82f6': '--dg-blue',
  '#60a5fa': '--dg-blue-2',
  '#f59e0b': '--dg-amber',
  '#fbbf24': '--dg-amber-2',
  '#fb923c': '--dg-orange',
  '#8b5cf6': '--dg-purple',
  '#a78bfa': '--dg-purple-2',
  '#f472b6': '--dg-pink',
  '#22d3ee': '--dg-cyan',
};

const PAINT_ATTRS = ['fill', 'stroke', 'stop-color'];

function normalizeHex(value) {
  if (!value) return null;
  const v = value.trim().toLowerCase();
  if (!v.startsWith('#')) return null;
  if (v.length === 4) return '#' + v[1] + v[1] + v[2] + v[2] + v[3] + v[3];
  return v.length === 7 ? v : null;
}

function remapPalette(svgEl) {
  // White stays white: it is only used for letters inside filled point circles,
  // which get darker in light mode, so the contrast improves on its own.
  svgEl.querySelectorAll('*').forEach(el => {
    PAINT_ATTRS.forEach(attr => {
      const hex = normalizeHex(el.getAttribute(attr));
      if (!hex) return;
      const token = PALETTE[hex];
      if (!token) return;
      // stop-color is a presentation attribute on <stop>; its CSS property name matches
      el.style.setProperty(attr, `var(${token})`);
    });
  });
}

export default function processSvg(svgEl) {
  if (!svgEl) return;

  // 1. Remap the baked palette onto theme tokens (before anything else reads colors)
  remapPalette(svgEl);

  // 2. Enforce minimum stroke width of 2px on all stroked elements
  const strokedEls = svgEl.querySelectorAll('line, path, circle, polyline, polygon, ellipse, rect');
  strokedEls.forEach(el => {
    const stroke = el.getAttribute('stroke') || '';
    if (stroke && stroke !== 'none' && stroke !== 'transparent') {
      const sw = parseFloat(el.getAttribute('stroke-width') || '1');
      if (sw < 2) {
        el.setAttribute('stroke-width', '2');
      }
    }
  });

  // 3. Enforce minimum circle radius of 4px for visibility
  svgEl.querySelectorAll('circle').forEach(circle => {
    const r = parseFloat(circle.getAttribute('r') || '0');
    if (r > 0 && r < 4) {
      circle.setAttribute('r', '4');
    }
  });

  // 4. Move ALL <text> elements to end of SVG — ensures text renders on top of all shapes
  const textEls = Array.from(svgEl.querySelectorAll('text'));
  textEls.forEach(textEl => {
    textEl.parentNode.removeChild(textEl);
    svgEl.appendChild(textEl);
  });

  // 5. Add text readability halos using paint-order stroke
  //    Skip text inside colored point circles (white letters inside filled circles)
  textEls.forEach(textEl => {
    // Skip white text inside point labels (they have a colored circle behind them)
    const fill = textEl.getAttribute('fill') || '';
    if (fill === '#fff' || fill === '#ffffff' || fill === 'white') return;

    textEl.setAttribute('paint-order', 'stroke');
    const existingStroke = textEl.getAttribute('stroke');
    if (!existingStroke || existingStroke === 'none') {
      // The halo is the card behind the diagram, so it follows --bg-card. The
      // old #0f172a fallback was dead code: --bg-card is always defined, and
      // var() does resolve in a presentation attribute. Dropped for clarity.
      textEl.style.setProperty('stroke', 'var(--bg-card)');
      textEl.setAttribute('stroke-width', '4');
      textEl.setAttribute('stroke-linejoin', 'round');
      textEl.setAttribute('stroke-linecap', 'round');
    }
  });

  // 6. Ensure SVG is responsive (don't set maxWidth — let CSS control it)
  svgEl.style.width = '100%';
  svgEl.style.height = 'auto';
  svgEl.style.display = 'block';
}
