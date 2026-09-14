"use client";
import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import processSvg from './processSvg';

/* ── Enlarged modal overlay ── */
function DiagramModal({ svgRef, imageUrl, title, onClose }) {
  const modalContentRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Fade in on mount
  useEffect(() => {
    // Force a reflow before adding the visible class for the transition
    requestAnimationFrame(() => {
      setVisible(true);
    });
  }, []);

  // Clone SVG content into the modal
  useEffect(() => {
    if (!modalContentRef.current || imageUrl) return;
    if (svgRef?.current) {
      const svgEl = svgRef.current.querySelector('svg');
      if (svgEl) {
        const clone = svgEl.cloneNode(true);
        modalContentRef.current.innerHTML = '';
        modalContentRef.current.appendChild(clone);
      }
    }
  }, [svgRef, imageUrl]);

  const handleClose = useCallback(() => {
    setVisible(false);
    // Wait for fade-out animation to finish
    setTimeout(onClose, 200);
  }, [onClose]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleClose]);

  /* F088/F062: on a phone the modal used to be the same 270px diagram, darker, with a close
     button — it read as broken. It is a full-screen sheet now: the diagram is drawn at twice the
     viewport width inside a scrolling, pinch-zoomable pane, so labels that were 5px inline are
     readable, and the sheet says so. */
  return createPortal(
    <div
      className={`lm-diagram-modal-backdrop ${visible ? 'lm-diagram-modal-visible' : ''}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={title ? `${title}, enlarged` : 'Enlarged diagram'}
    >
      <div
        className="lm-diagram-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="lm-diagram-modal-bar">
          <span className="lm-diagram-modal-title">{title || 'Diagram'}</span>
          <button
            className="lm-diagram-modal-close"
            onClick={handleClose}
            aria-label="Close enlarged diagram"
          >
            &times;
          </button>
        </div>
        <div className="lm-diagram-modal-pane">
          {imageUrl ? (
            <img src={imageUrl} alt={title || 'Diagram'} />
          ) : (
            <div ref={modalContentRef} className="lm-diagram-modal-svg" />
          )}
        </div>
        <div className="lm-diagram-modal-hint">Pinch or scroll to zoom</div>
      </div>
    </div>,
    document.body
  );
}

/* ── Inline Diagram Card (static — no hover tooltips) ── */
export default function InlineDiagram({ diagram }) {
  const [activeScenario, setActiveScenario] = useState(0);
  const [enlarged, setEnlarged] = useState(false);
  const svgRef = useRef(null);
  const scenarios = diagram.scenarios || [{ label: 'Default', svg: diagram.svg }];
  const currentSvg = scenarios[activeScenario]?.svg || diagram.svg;
  const hasImage = !!diagram.imageUrl;

  // Inject and post-process SVG (static — no hover listeners)
  useEffect(() => {
    if (!svgRef.current || !currentSvg || hasImage) return;
    svgRef.current.innerHTML = currentSvg;
    const svgEl = svgRef.current.querySelector('svg');
    if (svgEl) processSvg(svgEl);
  }, [currentSvg, hasImage]);

  const handleDiagramClick = useCallback(() => {
    setEnlarged(true);
  }, []);

  // F062: the hint only when enlarging would actually show more. The inline card is capped at
  // 442-552px on wide screens; the sheet draws at 2× the viewport width on narrow ones.
  const [canEnlarge, setCanEnlarge] = useState(true);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const narrow = window.matchMedia('(max-width: 767px)');
    const update = () => setCanEnlarge(narrow.matches || (svgRef.current?.clientWidth || 0) < 500);
    update();
    narrow.addEventListener('change', update);
    window.addEventListener('resize', update);
    return () => { narrow.removeEventListener('change', update); window.removeEventListener('resize', update); };
  }, []);

  return (
    <div className="lm-diagram-card">
      <div className="lm-card-label">&#128202; Diagram</div>
      <div className="lm-diagram-inner">
        <h3 className="diagram-title">{diagram.title}</h3>
        {diagram.description && <p className="diagram-description">{diagram.description}</p>}
        {!hasImage && scenarios.length > 1 && (
          <div className="scenario-switcher">
            {scenarios.map((s, i) => (
              <button key={i} className={`scenario-btn ${activeScenario === i ? 'active' : ''}`} onClick={() => setActiveScenario(i)}>
                {s.label}
              </button>
            ))}
          </div>
        )}

        {hasImage ? (
          <div className="lm-interactive-svg-wrapper lm-diagram-clickable" onClick={handleDiagramClick}>
            <img src={diagram.imageUrl} alt={diagram.title} />
          </div>
        ) : (
          <div className="lm-interactive-svg-wrapper lm-diagram-clickable" ref={svgRef} onClick={handleDiagramClick} />
        )}
        {canEnlarge && <div className="lm-diagram-enlarge-hint">Tap to enlarge</div>}

        {diagram.checklist && (
          <div className="diagram-checklist">
            <div className="diagram-checklist-title">What examiners look for</div>
            <ul>{diagram.checklist.map((item, i) => <li key={i}>{item}</li>)}</ul>
          </div>
        )}
      </div>

      {enlarged && (
        <DiagramModal
          svgRef={svgRef}
          imageUrl={hasImage ? diagram.imageUrl : null}
          title={diagram.title}
          onClose={() => setEnlarged(false)}
        />
      )}
    </div>
  );
}
