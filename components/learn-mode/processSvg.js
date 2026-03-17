/**
 * Post-processes an SVG element to fix common quality issues:
 * - Enforces minimum stroke width (2px) for bold, visible lines
 * - Enforces minimum circle radius (4px) for visible points
 * - Moves all <text> to end of SVG so they render on top of fills
 * - Adds paint-order text halos for readability over colored areas
 * - Sets shape-rendering for crisp lines
 */
export default function processSvg(svgEl) {
  if (!svgEl) return;

  // 1. Enforce minimum stroke width of 2px on all stroked elements
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

  // 2. Enforce minimum circle radius of 4px for visibility
  svgEl.querySelectorAll('circle').forEach(circle => {
    const r = parseFloat(circle.getAttribute('r') || '0');
    if (r > 0 && r < 4) {
      circle.setAttribute('r', '4');
    }
  });

  // 3. Move ALL <text> elements to end of SVG — ensures text renders on top of all shapes
  const textEls = Array.from(svgEl.querySelectorAll('text'));
  textEls.forEach(textEl => {
    textEl.parentNode.removeChild(textEl);
    svgEl.appendChild(textEl);
  });

  // 4. Add text readability halos using paint-order stroke
  textEls.forEach(textEl => {
    textEl.setAttribute('paint-order', 'stroke');
    const existingStroke = textEl.getAttribute('stroke');
    if (!existingStroke || existingStroke === 'none') {
      textEl.setAttribute('stroke', 'var(--bg-card, #0f172a)');
      textEl.setAttribute('stroke-width', '4');
      textEl.setAttribute('stroke-linejoin', 'round');
      textEl.setAttribute('stroke-linecap', 'round');
    }
  });

  // 5. Ensure SVG is responsive
  svgEl.style.width = '100%';
  svgEl.style.height = 'auto';
  svgEl.style.maxWidth = '100%';
  svgEl.style.display = 'block';
}
