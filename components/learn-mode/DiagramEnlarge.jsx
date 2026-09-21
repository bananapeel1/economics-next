"use client";
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { readWidthFromGeometry, enlargeWidthPx } from '@/lib/diagram-enlarge';

/*
 * The one enlarge sheet, shared by Learn Mode (InlineDiagram) and the Diagrams tab (DiagramsTab).
 *
 * V037. It used to live inside InlineDiagram, which is why only Learn Mode had it: measured at
 * 375x812 on 21 September, DiagramsTab rendered its SVG at 291px with labels of 6.98-8.73px, no
 * click handler, no modal, no hint and `cursor: auto`. The tab whose entire purpose is diagrams was
 * the one surface with no way to read them.
 *
 * WHAT THIS DOES NOT DO: raise any font size. F088 tried two font floors and both were a relayout —
 * 1/28 of the viewBox raised 1,419 of 1,420 labels, 1/36 still raised 1,281 of 1,377 and put 18
 * overlapping pairs on a diagram that had none, because a label's size and its neighbours' positions
 * were authored together. Everything here is a UNIFORM SCALE of the whole drawing, which cannot
 * overlap anything: the same picture, larger or smaller.
 */

export function readWidthFor(svgEl, availableWidth = 0) {
  if (!svgEl) return null;
  const vb = (svgEl.getAttribute('viewBox') || '').trim().split(/\s+/);
  const vbW = Number(vb[2]);
  // Every one of the 6,747 <text> elements in the corpus carries an explicit font-size, so the
  // attribute is a complete census and not a sample. Where it is missing, this returns null for
  // that diagram alone and the CSS fallback (220vw) takes over for it.
  const faces = [...svgEl.querySelectorAll('text')]
    .map((t) => Number(t.getAttribute('font-size')))
    .filter((n) => Number.isFinite(n) && n > 0);
  if (!faces.length) return null;
  return readWidthFromGeometry(vbW, Math.min(...faces), availableWidth);
}

export default function DiagramEnlarge({ svgRef, imageUrl, title, onClose }) {
  const paneRef = useRef(null);
  const contentRef = useRef(null);
  const [visible, setVisible] = useState(false);
  /* 'read' is the default: the student already saw the whole shape inline and tapped because they
     want the words. 'fit' is the state that did not exist before — see the zoom bar below. */
  const [zoom, setZoom] = useState('read');
  const [pane, setPane] = useState({ w: 0, h: 0 });
  const [svgEl, setSvgEl] = useState(null);
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  // Clone the already-processed SVG out of the card, so the sheet shows exactly what the card shows
  // (same palette remap, same halos) at a different size.
  useEffect(() => {
    if (!contentRef.current || imageUrl) return;
    const source = svgRef?.current?.querySelector('svg');
    if (!source) return;
    const clone = source.cloneNode(true);
    /* processSvg gave the inline copy `style="width:100%"`, and an inline style beats the sheet's
       width rule, so the "enlarged" diagram once measured 0.9x the viewport. The clone is sized by
       the stylesheet alone. Caught by the packet 5 verifier. */
    clone.style.removeProperty('width');
    clone.style.removeProperty('height');
    clone.style.removeProperty('max-width');
    clone.removeAttribute('width');
    clone.removeAttribute('height');
    contentRef.current.innerHTML = '';
    contentRef.current.appendChild(clone);
    setSvgEl(clone);
  }, [svgRef, imageUrl]);

  // The pane is the space the drawing has: what Fit fits INTO (both axes — a diagram that needed a
  // vertical scroll would not be "the whole diagram on screen") and what Read is floored at.
  //
  // CONTENT box, not `clientWidth`: clientWidth includes the pane's 12px of padding each side, and
  // a Fit computed from it came out 375px inside a 351px content box — scrollWidth 399 against a
  // clientWidth of 375, a "Fit" button that left the drawing overflowing by exactly its own padding.
  // Caught at 375x812 before this shipped; it is the one arithmetic slip this component can make
  // twice, so the measurement subtracts padding at the source rather than at each use.
  useEffect(() => {
    const el = paneRef.current;
    if (!el) return;
    const measure = () => {
      const cs = getComputedStyle(el);
      const padX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
      const padY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
      setPane({ w: Math.max(0, el.clientWidth - padX), h: Math.max(0, el.clientHeight - padY) });
    };
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    ro?.observe(el);
    window.addEventListener('resize', measure);
    return () => { ro?.disconnect(); window.removeEventListener('resize', measure); };
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 200);
  }, [onClose]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') handleClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleClose]);

  const readWidth = useMemo(
    () => (svgEl && pane.w ? readWidthFor(svgEl, pane.w) : null),
    [svgEl, pane.w]
  );

  /* Fit is bounded by the SHORTER side. A 500x420 frame is wider than it is tall and fits on width;
     a portrait frame does not, and fitting it on width alone would leave a vertical scroll and a
     "Fit" button that does not fit. */
  const fitWidth = useMemo(() => {
    if (!svgEl || !pane.w || !pane.h) return null;
    const vb = (svgEl.getAttribute('viewBox') || '').trim().split(/\s+/);
    const vbW = Number(vb[2]); const vbH = Number(vb[3]);
    if (!vbW || !vbH) return pane.w;
    return Math.min(pane.w, pane.h * (vbW / vbH));
  }, [svgEl, pane.w, pane.h]);

  /* The custom property is read by the sheet's `width: var(--lm-enlarge-w, ...)` rules, so a diagram
     we could not measure (no viewBox, or no sized text) keeps the old behaviour on its own. */
  const paneStyle = useMemo(() => {
    if (imageUrl || !svgEl || !readWidth) return undefined;
    const vb = (svgEl.getAttribute('viewBox') || '').trim().split(/\s+/);
    const faces = [...svgEl.querySelectorAll('text')]
      .map((t) => Number(t.getAttribute('font-size')))
      .filter((n) => Number.isFinite(n) && n > 0);
    const w = enlargeWidthPx(zoom, {
      vbW: Number(vb[2]), minFace: Math.min(...faces), paneWidth: pane.w, fitWidth,
    });
    return w == null ? undefined : { '--lm-enlarge-w': `${w}px` };
  }, [zoom, svgEl, readWidth, fitWidth, pane.w, imageUrl]);

  /* V037/E5: the hint used to read "Pinch or scroll to zoom". Scrolling PANS — it has never zoomed
     anything — and the page's visual viewport is pinned at scale 1, so pinching cannot zoom out
     either. The cue now says which way there is more diagram, and only when there is. */
  useEffect(() => {
    const el = paneRef.current;
    if (!el) return;
    // After the width variable has been applied and laid out.
    const id = requestAnimationFrame(() => {
      setOverflows(el.scrollWidth > el.clientWidth + 1);
      // Re-centre when the student changes stop, so zooming does not dump them at the left edge of
      // a drawing whose subject is in the middle.
      el.scrollLeft = Math.max(0, (el.scrollWidth - el.clientWidth) / 2);
    });
    return () => cancelAnimationFrame(id);
  }, [zoom, readWidth, fitWidth, pane.w]);

  const stops = [
    ['fit', 'Fit', 'Fit the whole diagram on screen'],
    ['read', 'Read', 'Enlarge until the labels are readable'],
    ['closer', 'Closer', 'Enlarge further'],
  ];

  return createPortal(
    <div
      className={`lm-diagram-modal-backdrop ${visible ? 'lm-diagram-modal-visible' : ''}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={title ? `${title}, enlarged` : 'Enlarged diagram'}
    >
      <div className="lm-diagram-modal" onClick={(e) => e.stopPropagation()}>
        <div className="lm-diagram-modal-bar">
          <span className="lm-diagram-modal-title">{title || 'Diagram'}</span>
          <button className="lm-diagram-modal-close" onClick={handleClose} aria-label="Close enlarged diagram">
            &times;
          </button>
        </div>

        {/* V047. Before this bar the sheet had one control, Close. It opened at a fixed 220vw —
            43.5% of the drawing visible at 375px, 480px of it hidden — and because the page's
            visual viewport is pinned at scale 1, pinching could not zoom out. The whole diagram was
            unreachable from inside the sheet: on `Supply Curve: Movements and Shifts` the two
            shifted curves, which are the comparison the diagram exists to make, were off-screen.
            Fit is that missing state. Which stop a diagram wants depends on what it is — a table
            reads fine a cell at a time, a matrix or a pair of curves means nothing unless you can
            see it at once — and the student is the one who knows which they are looking at. */}
        {/* Gated on readWidth, not just on !imageUrl: a diagram we could not measure falls back to
            the CSS width and the stops have nothing to set, so the row would render three buttons
            that do nothing. No live diagram is in that state — every one of the corpus SVGs has a
            viewBox and an explicit font-size on every <text> — but the fallback exists precisely
            for the day one is not, and a dead control is worse than an absent one. */}
        {!imageUrl && readWidth != null && (
          <div className="lm-diagram-zoom" role="group" aria-label="Diagram size">
            {stops.map(([id, label, hint]) => (
              <button
                key={id}
                type="button"
                className={`lm-diagram-zoom-btn${zoom === id ? ' active' : ''}`}
                aria-pressed={zoom === id}
                title={hint}
                onClick={() => setZoom(id)}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        <div className="lm-diagram-modal-pane" ref={paneRef} style={paneStyle}>
          {imageUrl ? (
            <img src={imageUrl} alt={title || 'Diagram'} />
          ) : (
            <div ref={contentRef} className="lm-diagram-modal-svg" />
          )}
        </div>

        <div className="lm-diagram-modal-hint">
          {imageUrl
            ? 'Pinch to zoom'
            : overflows
              ? 'Drag sideways to see the rest — or tap Fit'
              : 'The whole diagram is on screen'}
        </div>
      </div>
    </div>,
    document.body
  );
}
