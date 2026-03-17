"use client";
import { useState, useRef, useEffect, useCallback } from 'react';

/* ── Color-role map for economics diagrams ── */
const COLOR_ROLES = {
  '#f59e0b': 'Trend / Equilibrium',
  '#3b82f6': 'Actual / Current',
  '#ef4444': 'Negative / Decrease',
  '#059669': 'Positive / Increase',
  '#8b5cf6': 'Government / Policy',
  '#ec4899': 'Alternative / Shift',
  '#6366f1': 'Secondary / Related',
  '#14b8a6': 'Long-run / Supply',
};

/* Normalize color strings for comparison */
function normalizeColor(c) {
  if (!c) return '';
  return c.toLowerCase().trim();
}

/* Find matching role for a color */
function getColorRole(color) {
  const norm = normalizeColor(color);
  for (const [key, role] of Object.entries(COLOR_ROLES)) {
    if (norm === key.toLowerCase()) return role;
  }
  // Try matching rgb values too
  return null;
}

/* Group SVG elements by their stroke/fill color */
function groupElementsByColor(svgEl) {
  if (!svgEl) return new Map();
  const groups = new Map();
  const interactiveEls = svgEl.querySelectorAll('line, path, circle, rect, polyline, polygon, ellipse');

  interactiveEls.forEach(el => {
    const stroke = el.getAttribute('stroke') || el.style.stroke || '';
    const fill = el.getAttribute('fill') || el.style.fill || '';
    // Use stroke as primary grouping key, fall back to fill
    const color = normalizeColor(stroke) || normalizeColor(fill);
    if (!color || color === 'none' || color === 'transparent' || color === '#fff' || color === '#ffffff' || color === 'white') return;

    if (!groups.has(color)) {
      groups.set(color, []);
    }
    groups.get(color).push(el);
  });

  return groups;
}

/* Get nearby text elements for a visual element */
function findNearbyText(el, textEls, threshold = 60) {
  const rect = el.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  let closest = null;
  let closestDist = Infinity;

  textEls.forEach(t => {
    const tRect = t.getBoundingClientRect();
    const tx = tRect.left + tRect.width / 2;
    const ty = tRect.top + tRect.height / 2;
    const dist = Math.sqrt((cx - tx) ** 2 + (cy - ty) ** 2);
    if (dist < threshold && dist < closestDist) {
      closestDist = dist;
      closest = t;
    }
  });

  return closest?.textContent || null;
}

/**
 * Interactive SVG diagram with hover highlighting and tooltips.
 * Parses raw SVG string, groups elements by color, and adds interactivity.
 */
export default function InteractiveDiagram({ svgString }) {
  const containerRef = useRef(null);
  const [tooltip, setTooltip] = useState(null); // { x, y, label, role }
  const [activeColor, setActiveColor] = useState(null);
  const colorGroupsRef = useRef(new Map());
  const textElsRef = useRef([]);

  // Parse and inject SVG
  useEffect(() => {
    if (!containerRef.current || !svgString) return;
    containerRef.current.innerHTML = svgString;

    const svgEl = containerRef.current.querySelector('svg');
    if (!svgEl) return;

    // Make SVG responsive
    svgEl.style.width = '100%';
    svgEl.style.height = 'auto';
    svgEl.style.maxWidth = '100%';

    // Store text elements for label lookup
    textElsRef.current = Array.from(svgEl.querySelectorAll('text'));

    // Group elements by color
    colorGroupsRef.current = groupElementsByColor(svgEl);

    // Add hover handlers to all interactive elements
    const interactiveEls = svgEl.querySelectorAll('line, path, circle, rect, polyline, polygon, ellipse');
    interactiveEls.forEach(el => {
      el.style.cursor = 'pointer';
      el.style.transition = 'opacity 0.2s ease, filter 0.2s ease';
    });
  }, [svgString]);

  const handleMouseMove = useCallback((e) => {
    const svgEl = containerRef.current?.querySelector('svg');
    if (!svgEl) return;

    const target = e.target;
    if (target === svgEl || target === containerRef.current) {
      // Mouse on background — clear highlights
      setActiveColor(null);
      setTooltip(null);
      return;
    }

    const stroke = normalizeColor(target.getAttribute('stroke') || target.style.stroke || '');
    const fill = normalizeColor(target.getAttribute('fill') || target.style.fill || '');
    const color = stroke || fill;

    if (!color || color === 'none' || color === 'transparent' || color === '#fff' || color === '#ffffff' || color === 'white') {
      setActiveColor(null);
      setTooltip(null);
      return;
    }

    setActiveColor(color);

    // Find tooltip info
    const role = getColorRole(color);
    const nearbyLabel = findNearbyText(target, textElsRef.current);
    const containerRect = containerRef.current.getBoundingClientRect();

    setTooltip({
      x: e.clientX - containerRect.left,
      y: e.clientY - containerRect.top - 40,
      label: nearbyLabel,
      role: role,
      color: color,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveColor(null);
    setTooltip(null);
  }, []);

  // Apply highlight/dim styles when activeColor changes
  useEffect(() => {
    const svgEl = containerRef.current?.querySelector('svg');
    if (!svgEl) return;

    const interactiveEls = svgEl.querySelectorAll('line, path, circle, rect, polyline, polygon, ellipse');

    if (!activeColor) {
      // Reset all
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
        el.style.filter = 'brightness(1.2) drop-shadow(0 0 4px ' + activeColor + ')';
      } else if (elColor && elColor !== 'none' && elColor !== 'transparent') {
        el.style.opacity = '0.3';
        el.style.filter = '';
      }
    });

    // Keep text always visible
    const textEls = svgEl.querySelectorAll('text');
    textEls.forEach(t => {
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
          {tooltip.role && <div className="lm-diagram-tooltip-role">{tooltip.role}</div>}
        </div>
      )}

      <div className="lm-diagram-interact-hint">
        Hover over elements to explore
      </div>
    </div>
  );
}
