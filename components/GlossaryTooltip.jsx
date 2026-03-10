"use client";
import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Single tooltip that listens for hover on any .glossary-highlight element.
 * Only one tooltip is visible at a time — fixes the overlap issue with CSS ::after.
 */
export default function GlossaryTooltip() {
  const [tooltip, setTooltip] = useState(null);
  const tooltipRef = useRef(null);
  const hideTimer = useRef(null);

  const show = useCallback((e) => {
    const el = e.target.closest('.glossary-highlight');
    if (!el) return;

    clearTimeout(hideTimer.current);

    const definition = el.getAttribute('data-definition');
    if (!definition) return;

    const rect = el.getBoundingClientRect();
    const scrollContainer = el.closest('.tab-content');
    const containerRect = scrollContainer?.getBoundingClientRect() || { left: 0, top: 0 };

    setTooltip({
      text: definition,
      x: rect.left + rect.width / 2,
      y: rect.top,
      containerTop: containerRect.top,
    });
  }, []);

  const hide = useCallback(() => {
    hideTimer.current = setTimeout(() => setTooltip(null), 100);
  }, []);

  useEffect(() => {
    document.addEventListener('mouseover', show);
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest('.glossary-highlight')) hide();
    });
    // Hide on scroll
    const scrollEl = document.querySelector('.tab-content');
    if (scrollEl) scrollEl.addEventListener('scroll', () => setTooltip(null), { passive: true });

    return () => {
      document.removeEventListener('mouseover', show);
      clearTimeout(hideTimer.current);
    };
  }, [show, hide]);

  if (!tooltip) return null;

  // Position tooltip above the term, clamped within viewport
  const tooltipWidth = 280;
  let left = tooltip.x - tooltipWidth / 2;
  left = Math.max(8, Math.min(left, window.innerWidth - tooltipWidth - 8));
  const top = tooltip.y - 10; // 10px gap above the term

  return (
    <div
      ref={tooltipRef}
      className="glossary-tooltip-popup"
      style={{
        position: 'fixed',
        top: `${top}px`,
        left: `${left}px`,
        width: `${tooltipWidth}px`,
        transform: 'translateY(-100%)',
      }}
    >
      {tooltip.text}
      <div
        className="glossary-tooltip-arrow"
        style={{ left: `${tooltip.x - left}px` }}
      />
    </div>
  );
}
