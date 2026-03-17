"use client";
import { useState, useRef, useEffect, useCallback } from 'react';
import processSvg from './processSvg';

/* ── Color-role map for economics diagrams ── */
const COLOR_ROLES = {
  '#f59e0b': 'Trend / Equilibrium',
  '#3b82f6': 'Actual / Current',
  '#ef4444': 'Negative / Decrease',
  '#059669': 'Positive / Increase',
  '#10b981': 'Positive / Increase',
  '#8b5cf6': 'Government / Policy',
  '#ec4899': 'Alternative / Shift',
  '#6366f1': 'Secondary / Related',
  '#14b8a6': 'Long-run / Supply',
  '#e8ecf5': 'Axis / Label',
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

/**
 * Interactive SVG diagram with hover highlighting and tooltips.
 * Post-processes SVG for quality (text on top, min stroke widths, halos).
 * Hover is subtle — glow on active element, gentle dim on others.
 */
export default function InteractiveDiagram({ svgString }) {
  const containerRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);
  const [activeEl, setActiveEl] = useState(null);
  const textElsRef = useRef([]);
  const hoverableElsRef = useRef([]);

  // Parse, post-process, and inject SVG
  useEffect(() => {
    if (!containerRef.current || !svgString) return;
    containerRef.current.innerHTML = svgString;

    const svgEl = containerRef.current.querySelector('svg');
    if (!svgEl) return;

    // Apply quality fixes
    processSvg(svgEl);

    // Store text elements for tooltip lookup
    textElsRef.current = Array.from(svgEl.querySelectorAll('text'));

    // Identify hoverable elements (lines, curves, circles — NOT large filled areas)
    const allEls = Array.from(svgEl.querySelectorAll('line, path, circle, polyline, polygon, ellipse'));
    const hoverable = allEls.filter(el => {
      const stroke = normalizeColor(el.getAttribute('stroke') || '');
      const fill = normalizeColor(el.getAttribute('fill') || '');
      const tag = el.tagName.toLowerCase();

      // Skip elements with no visual stroke (background fills)
      if (tag === 'path' || tag === 'polygon' || tag === 'rect') {
        if ((!stroke || stroke === 'none') && fill && fill !== 'none') {
          return false; // Filled area without stroke — background/shading
        }
      }
      // Skip axis lines (#e8ecf5) and transparent elements
      if (stroke === '#e8ecf5' || fill === 'none' || fill === 'transparent') {
        if (tag !== 'circle') return false;
      }
      return true;
    });

    hoverable.forEach(el => {
      el.style.cursor = 'pointer';
      el.style.transition = 'filter 0.15s ease';
    });
    hoverableElsRef.current = hoverable;
  }, [svgString]);

  // Find nearest text label
  const findNearbyText = useCallback((el) => {
    try {
      const rect = el.getBoundingClientRect();
      if (!rect.width && !rect.height) return null;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      let closest = null;
      let closestDist = Infinity;

      textElsRef.current.forEach(t => {
        const tRect = t.getBoundingClientRect();
        if (!tRect.width) return;
        const tx = tRect.left + tRect.width / 2;
        const ty = tRect.top + tRect.height / 2;
        const dist = Math.sqrt((cx - tx) ** 2 + (cy - ty) ** 2);
        if (dist < 80 && dist < closestDist) {
          closestDist = dist;
          closest = t;
        }
      });
      return closest?.textContent?.trim() || null;
    } catch { return null; }
  }, []);

  const handleMouseMove = useCallback((e) => {
    const svgEl = containerRef.current?.querySelector('svg');
    if (!svgEl) return;

    const target = e.target;
    // Ignore background and text elements
    if (target === svgEl || target === containerRef.current ||
        target.tagName === 'text' || target.tagName === 'tspan' ||
        target.tagName === 'svg') {
      setActiveEl(null);
      setTooltip(null);
      return;
    }

    // Only interact with hoverable elements
    if (!hoverableElsRef.current.includes(target)) {
      setActiveEl(null);
      setTooltip(null);
      return;
    }

    setActiveEl(target);

    const stroke = normalizeColor(target.getAttribute('stroke') || '');
    const fill = normalizeColor(target.getAttribute('fill') || '');
    const color = stroke || fill;
    const role = getColorRole(color);
    const nearbyLabel = findNearbyText(target);

    if (!nearbyLabel && !role) {
      setTooltip(null);
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    setTooltip({
      x: Math.min(Math.max(e.clientX - containerRect.left, 70), containerRect.width - 70),
      y: Math.max(e.clientY - containerRect.top - 48, 10),
      label: nearbyLabel,
      role,
      color,
    });
  }, [findNearbyText]);

  const handleMouseLeave = useCallback(() => {
    setActiveEl(null);
    setTooltip(null);
  }, []);

  // Apply hover glow — only on the active element, gentle fade on rest
  useEffect(() => {
    const hoverable = hoverableElsRef.current;
    if (!activeEl) {
      // Reset all
      hoverable.forEach(el => { el.style.filter = ''; });
      return;
    }

    const activeColor = normalizeColor(activeEl.getAttribute('stroke') || activeEl.getAttribute('fill') || '');

    hoverable.forEach(el => {
      const elColor = normalizeColor(el.getAttribute('stroke') || el.getAttribute('fill') || '');
      if (elColor === activeColor) {
        el.style.filter = `drop-shadow(0 0 5px ${activeColor}) brightness(1.15)`;
      } else {
        el.style.filter = '';
      }
    });
  }, [activeEl]);

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
            borderLeftColor: tooltip.color || 'var(--border-primary)',
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
