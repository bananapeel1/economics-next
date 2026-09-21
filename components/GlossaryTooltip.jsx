"use client";
import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Single tooltip for any .glossary-highlight element.
 *
 * F068: this listened for `mouseover` only. On a phone — which is most of this cohort — there is
 * no hover, so every glossary definition in the product was unreachable, and a keyboard user
 * could not reach one either. It now opens on tap and on focus, closes on a tap outside or
 * Escape, and the highlight itself is focusable with `aria-describedby` pointing at the tooltip.
 */
export default function GlossaryTooltip() {
  const [tooltip, setTooltip] = useState(null);
  const tooltipRef = useRef(null);
  const hideTimer = useRef(null);
  // The element the tooltip is describing. Kept so a scroll can move the tooltip with it instead
  // of closing it: focusing an off-screen term scrolls it into view, which fired the scroll
  // handler and dismissed the tooltip the focus had just opened (F068).
  const anchorRef = useRef(null);

  const show = useCallback((e) => {
    const el = e.target.closest('.glossary-highlight');
    if (!el) return;

    clearTimeout(hideTimer.current);

    const definition = el.getAttribute('data-definition');
    if (!definition) return;

    anchorRef.current = el;

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

  const hideNow = useCallback(() => {
    clearTimeout(hideTimer.current);
    setTooltip(null);
  }, []);

  // Tap toggles: a second tap on the same term closes it, which is what a tooltip on touch
  // should do. A tap anywhere else closes it too.
  const toggle = useCallback((e) => {
    const el = e.target.closest('.glossary-highlight');
    if (!el) { hideNow(); return; }
    e.preventDefault();
    if (el.getAttribute('aria-describedby') === 'glossary-tooltip') {
      el.removeAttribute('aria-describedby');
      hideNow();
      return;
    }
    document.querySelectorAll('.glossary-highlight[aria-describedby]')
      .forEach((n) => n.removeAttribute('aria-describedby'));
    el.setAttribute('aria-describedby', 'glossary-tooltip');
    show(e);
  }, [show, hideNow]);

  useEffect(() => {
    const onMouseOut = (e) => { if (e.target.closest('.glossary-highlight')) hide(); };
    const onFocusIn = (e) => { if (e.target.closest?.('.glossary-highlight')) show(e); };
    const onFocusOut = (e) => { if (e.target.closest?.('.glossary-highlight')) hide(); };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') { hideNow(); return; }
      // role="button" carries the obligation to respond to Enter and Space. Opening on focus
      // alone proved unreliable (a focus that scrolls the term into view races the handlers), so
      // activation is the keyboard path, which is also what a screen-reader user expects from a
      // button. F068.
      if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
      const el = e.target?.closest?.('.glossary-highlight');
      if (!el) return;
      e.preventDefault();
      toggle({ target: el, preventDefault() {} });
    };

    document.addEventListener('mouseover', show);
    document.addEventListener('mouseout', onMouseOut);
    document.addEventListener('click', toggle);
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);
    document.addEventListener('keydown', onKeyDown);
    // Hide on scroll
    const onScroll = () => {
      const el = anchorRef.current;
      if (!el || !el.isConnected) { setTooltip(null); return; }
      const rect = el.getBoundingClientRect();
      // Gone from view entirely: close. Otherwise follow it.
      if (rect.bottom < 0 || rect.top > window.innerHeight) { setTooltip(null); return; }
      setTooltip((t) => (t ? { ...t, x: rect.left + rect.width / 2, y: rect.top } : t));
    };
    const scrollEl = document.querySelector('.tab-content');
    if (scrollEl) scrollEl.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      document.removeEventListener('mouseover', show);
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('click', toggle);
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
      document.removeEventListener('keydown', onKeyDown);
      if (scrollEl) scrollEl.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', onScroll);
      clearTimeout(hideTimer.current);
    };
  }, [show, hide, hideNow, toggle]);

  if (!tooltip) return null;

  // Position tooltip above the term, clamped within viewport
  const tooltipWidth = 280;
  let left = tooltip.x - tooltipWidth / 2;
  left = Math.max(8, Math.min(left, window.innerWidth - tooltipWidth - 8));
  const top = tooltip.y - 10; // 10px gap above the term

  return (
    <div
      ref={tooltipRef}
      id="glossary-tooltip"
      role="tooltip"
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
