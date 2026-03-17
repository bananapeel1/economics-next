"use client";
import { useState, useRef, useEffect, useCallback } from 'react';

/* ── Color-role map for economics diagrams ── */
const COLOR_ROLES = {
  '#f59e0b': 'Trend / Equilibrium',
  '#f59e0b80': 'Trend / Equilibrium',
  '#3b82f6': 'Actual / Current',
  '#ef4444': 'Negative / Decrease',
  '#059669': 'Positive / Increase',
  '#10b981': 'Positive / Increase',
  '#8b5cf6': 'Government / Policy',
  '#ec4899': 'Alternative / Shift',
  '#6366f1': 'Secondary / Related',
  '#14b8a6': 'Long-run / Supply',
};

function normalizeColor(c) {
  if (!c) return '';
  return c.toLowerCase().trim();
}

function getColorRole(color) {
  const norm = normalizeColor(color);
  for (const [key, role] of Object.entries(COLOR_ROLES)) {
    if (norm === key.toLowerCase()) return role;
  }
  return null;
}

/** Check if an element is a large filled area (like the PPF red fill) */
function isLargeFilledArea(el) {
  const tag = el.tagName.toLowerCase();
  // Paths and polygons with fill (not stroke-only) that look like background areas
  if (tag === 'path' || tag === 'polygon' || tag === 'rect') {
    const fill = normalizeColor(el.getAttribute('fill') || el.style.fill || '');
    const stroke = normalizeColor(el.getAttribute('stroke') || el.style.stroke || '');
    const opacity = parseFloat(el.getAttribute('opacity') || el.style.opacity || '1');
    const fillOpacity = parseFloat(el.getAttribute('fill-opacity') || el.style.fillOpacity || '1');

    // If it has a fill and no meaningful stroke, it's likely a filled area
    if (fill && fill !== 'none' && fill !== 'transparent' && (!stroke || stroke === 'none')) {
      return true;
    }
    // If fill opacity is low, it's a background area
    if (fillOpacity < 0.8 || opacity < 0.8) {
      return true;
    }

    // Check bounding box size — large filled shapes are background areas
    try {
      const bbox = el.getBBox();
      if (bbox.width > 100 && bbox.height > 100) return true;
    } catch {}
  }
  return false;
}

/** Find nearby text label for a hovered element */
function findNearbyText(el, textEls, threshold = 80) {
  try {
    const rect = el.getBoundingClientRect();
    if (!rect.width && !rect.height) return null;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    let closest = null;
    let closestDist = Infinity;

    textEls.forEach(t => {
      const tRect = t.getBoundingClientRect();
      if (!tRect.width && !tRect.height) return;
      const tx = tRect.left + tRect.width / 2;
      const ty = tRect.top + tRect.height / 2;
      const dist = Math.sqrt((cx - tx) ** 2 + (cy - ty) ** 2);
      if (dist < threshold && dist < closestDist) {
        closestDist = dist;
        closest = t;
      }
    });

    return closest?.textContent?.trim() || null;
  } catch {
    return null;
  }
}

/**
 * Interactive SVG diagram with hover highlighting and tooltips.
 * Fixes text rendering order, adds text halos, and provides subtle hover.
 */
export default function InteractiveDiagram({ svgString }) {
  const containerRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);
  const [activeColor, setActiveColor] = useState(null);
  const textElsRef = useRef([]);
  const interactiveElsRef = useRef([]);

  // Parse, fix, and inject SVG
  useEffect(() => {
    if (!containerRef.current || !svgString) return;
    containerRef.current.innerHTML = svgString;

    const svgEl = containerRef.current.querySelector('svg');
    if (!svgEl) return;

    // Make SVG responsive with proper sizing
    svgEl.style.width = '100%';
    svgEl.style.height = 'auto';
    svgEl.style.maxWidth = '100%';
    svgEl.style.display = 'block';

    // ── Fix 1: Move all <text> elements to end of SVG so they render on top ──
    const textEls = Array.from(svgEl.querySelectorAll('text'));
    textEls.forEach(textEl => {
      // Clone to preserve, remove original, append clone at end
      const parent = textEl.parentNode;
      parent.removeChild(textEl);
      svgEl.appendChild(textEl);
    });

    // ── Fix 2: Add text halo/outline for readability over filled areas ──
    textEls.forEach(textEl => {
      textEl.setAttribute('paint-order', 'stroke');
      // Use a dark background stroke for contrast
      const existingStroke = textEl.getAttribute('stroke');
      if (!existingStroke || existingStroke === 'none') {
        textEl.setAttribute('stroke', '#0f172a');
        textEl.setAttribute('stroke-width', '3');
        textEl.setAttribute('stroke-linejoin', 'round');
        textEl.setAttribute('stroke-linecap', 'round');
      }
    });

    // Store refs for hover interactions
    textElsRef.current = textEls;

    // ── Fix 3: Categorize interactive elements (exclude large fills) ──
    const allEls = Array.from(svgEl.querySelectorAll('line, path, circle, polyline, polygon, ellipse'));
    const interactiveEls = allEls.filter(el => !isLargeFilledArea(el));

    interactiveEls.forEach(el => {
      el.style.cursor = 'pointer';
      el.style.transition = 'opacity 0.2s ease, filter 0.2s ease';
    });

    interactiveElsRef.current = interactiveEls;

    // ── Fix 4: Reduce opacity of large filled areas to make diagram cleaner ──
    allEls.forEach(el => {
      if (isLargeFilledArea(el)) {
        const currentOpacity = parseFloat(el.getAttribute('opacity') || el.style.opacity || '1');
        el.style.opacity = String(Math.min(currentOpacity, 0.35));
        el.style.pointerEvents = 'none';
      }
    });

  }, [svgString]);

  const handleMouseMove = useCallback((e) => {
    const svgEl = containerRef.current?.querySelector('svg');
    if (!svgEl) return;

    const target = e.target;
    // Ignore background, container, text, and large areas
    if (target === svgEl || target === containerRef.current || target.tagName === 'text' || target.tagName === 'tspan') {
      setActiveColor(null);
      setTooltip(null);
      return;
    }

    const stroke = normalizeColor(target.getAttribute('stroke') || target.style.stroke || '');
    const fill = normalizeColor(target.getAttribute('fill') || target.style.fill || '');
    const color = stroke || fill;

    if (!color || color === 'none' || color === 'transparent' || color === '#fff' || color === '#ffffff' || color === 'white' || color === '#0f172a') {
      setActiveColor(null);
      setTooltip(null);
      return;
    }

    // Don't highlight large filled areas
    if (isLargeFilledArea(target)) {
      setActiveColor(null);
      setTooltip(null);
      return;
    }

    setActiveColor(color);

    const role = getColorRole(color);
    const nearbyLabel = findNearbyText(target, textElsRef.current);
    const containerRect = containerRef.current.getBoundingClientRect();

    setTooltip({
      x: Math.min(Math.max(e.clientX - containerRect.left, 60), containerRect.width - 60),
      y: Math.max(e.clientY - containerRect.top - 44, 10),
      label: nearbyLabel,
      role: role,
      color: color,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveColor(null);
    setTooltip(null);
  }, []);

  // Apply subtle highlight/dim when hovering
  useEffect(() => {
    const svgEl = containerRef.current?.querySelector('svg');
    if (!svgEl) return;

    const interactiveEls = interactiveElsRef.current;

    if (!activeColor) {
      interactiveEls.forEach(el => {
        el.style.opacity = '1';
        el.style.filter = '';
      });
      return;
    }

    interactiveEls.forEach(el => {
      const stroke = normalizeColor(el.getAttribute('stroke') || el.style.stroke || '');
      const fill = normalizeColor(el.getAttribute('fill') || el.style.fill || '');
      const elColor = stroke || fill;

      if (elColor === activeColor) {
        el.style.opacity = '1';
        el.style.filter = 'brightness(1.15) drop-shadow(0 0 6px ' + activeColor + ')';
      } else if (elColor && elColor !== 'none' && elColor !== 'transparent') {
        el.style.opacity = '0.55';
        el.style.filter = '';
      }
    });

    // Text always fully visible
    textElsRef.current.forEach(t => {
      t.style.opacity = '1';
      t.style.filter = '';
    });
  }, [activeColor]);

  return (
    <div
      className="lm-interactive-diagram"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={containerRef} className="lm-interactive-svg-wrapper" />

      {tooltip && (tooltip.label || tooltip.role) && (
        <div
          className="lm-diagram-tooltip"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            borderLeftColor: tooltip.color,
          }}
        >
          {tooltip.label && <div className="lm-diagram-tooltip-label">{tooltip.label}</div>}
          {tooltip.role && (
            <div className="lm-diagram-tooltip-role">
              <span className="lm-diagram-tooltip-dot" style={{ background: tooltip.color }} />
              {tooltip.role}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
