"use client";
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';

const TOLERANCE = 30; // px radius for correct placement

/**
 * Drag-and-drop label exercise for SVG diagrams.
 * Extracts <text> elements, removes them from the SVG,
 * and lets users drag labels back to their correct positions.
 */
export default function DiagramLabelDrill({ svgString, onClose }) {
  const svgContainerRef = useRef(null);
  const drillAreaRef = useRef(null);
  const [labels, setLabels] = useState([]); // { id, text, correctX, correctY, placed, correct }
  const [shuffledLabels, setShuffledLabels] = useState([]);
  const [dragging, setDragging] = useState(null); // { id, offsetX, offsetY, x, y }
  const [completed, setCompleted] = useState(false);
  const [strippedSvg, setStrippedSvg] = useState('');

  // Parse SVG and extract text elements
  useEffect(() => {
    if (!svgString) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, 'image/svg+xml');
    const svgEl = doc.querySelector('svg');
    if (!svgEl) return;

    // Get SVG viewBox for coordinate conversion
    const viewBox = svgEl.getAttribute('viewBox');
    const vbParts = viewBox ? viewBox.split(/\s+/).map(Number) : null;

    // Extract all text elements
    const textEls = Array.from(svgEl.querySelectorAll('text'));
    const extracted = [];
    let idCounter = 0;

    textEls.forEach(textEl => {
      const text = textEl.textContent.trim();
      if (!text || text.length < 2) return; // Skip single chars like axis labels

      // Get position from attributes
      const x = parseFloat(textEl.getAttribute('x') || 0);
      const y = parseFloat(textEl.getAttribute('y') || 0);

      extracted.push({
        id: idCounter++,
        text,
        correctX: x,
        correctY: y,
        placed: false,
        placedX: null,
        placedY: null,
        correct: false,
        shaking: false,
      });

      // Remove text from SVG
      textEl.remove();
    });

    // Add drop zone circles at original positions
    extracted.forEach(label => {
      const circle = doc.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', label.correctX);
      circle.setAttribute('cy', label.correctY);
      circle.setAttribute('r', '8');
      circle.setAttribute('fill', 'var(--accent-green)');
      circle.setAttribute('fill-opacity', '0.2');
      circle.setAttribute('stroke', 'var(--accent-green)');
      circle.setAttribute('stroke-opacity', '0.4');
      circle.setAttribute('stroke-width', '1.5');
      circle.setAttribute('stroke-dasharray', '3 3');
      circle.setAttribute('data-drop-zone', label.id);
      svgEl.appendChild(circle);
    });

    // Serialize cleaned SVG
    const serializer = new XMLSerializer();
    setStrippedSvg(serializer.serializeToString(svgEl));
    setLabels(extracted);
    setShuffledLabels([...extracted].sort(() => Math.random() - 0.5));
  }, [svgString]);

  // Convert page coords to SVG coords
  const pageToSvg = useCallback((pageX, pageY) => {
    const svgEl = svgContainerRef.current?.querySelector('svg');
    if (!svgEl) return { x: 0, y: 0 };

    const pt = svgEl.createSVGPoint();
    const ctm = svgEl.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };

    pt.x = pageX;
    pt.y = pageY;
    const svgPt = pt.matrixTransform(ctm.inverse());
    return { x: svgPt.x, y: svgPt.y };
  }, []);

  // Pointer handlers (works for touch + mouse)
  const handlePointerDown = useCallback((e, label) => {
    if (label.correct) return; // Already correctly placed
    e.preventDefault();

    const rect = e.currentTarget.getBoundingClientRect();
    setDragging({
      id: label.id,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
      x: e.clientX,
      y: e.clientY,
    });
  }, []);

  const handlePointerMove = useCallback((e) => {
    if (!dragging) return;
    e.preventDefault();
    setDragging(prev => ({
      ...prev,
      x: e.clientX,
      y: e.clientY,
    }));
  }, [dragging]);

  const handlePointerUp = useCallback((e) => {
    if (!dragging) return;
    e.preventDefault();

    const { x, y, id } = dragging;
    const svgCoords = pageToSvg(x, y);
    const label = labels.find(l => l.id === id);

    if (label) {
      const dx = svgCoords.x - label.correctX;
      const dy = svgCoords.y - label.correctY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= TOLERANCE) {
        // Correct placement
        setLabels(prev => prev.map(l =>
          l.id === id ? { ...l, placed: true, correct: true, placedX: label.correctX, placedY: label.correctY } : l
        ));
      } else {
        // Wrong — shake animation
        setLabels(prev => prev.map(l =>
          l.id === id ? { ...l, shaking: true } : l
        ));
        setTimeout(() => {
          setLabels(prev => prev.map(l =>
            l.id === id ? { ...l, shaking: false } : l
          ));
        }, 500);
      }
    }

    setDragging(null);
  }, [dragging, labels, pageToSvg]);

  // Check completion
  useEffect(() => {
    if (labels.length > 0 && labels.every(l => l.correct)) {
      setCompleted(true);
    }
  }, [labels]);

  // Add global pointer events during drag
  useEffect(() => {
    if (!dragging) return;
    const handleMove = (e) => handlePointerMove(e);
    const handleUp = (e) => handlePointerUp(e);

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
  }, [dragging, handlePointerMove, handlePointerUp]);

  const placedCount = labels.filter(l => l.correct).length;
  const totalCount = labels.length;

  if (!svgString || labels.length === 0) return null;

  return (
    <div className="lm-label-drill" ref={drillAreaRef}>
      <div className="lm-label-drill-header">
        <div className="lm-label-drill-title">
          {'\u{1F3AF}'} Label this diagram
        </div>
        <div className="lm-label-drill-progress">
          {placedCount} / {totalCount} placed
        </div>
        <button className="lm-label-drill-close" onClick={onClose}>&times;</button>
      </div>

      {/* SVG with drop zones */}
      <div
        className="lm-label-drill-svg"
        ref={svgContainerRef}
        dangerouslySetInnerHTML={{ __html: strippedSvg }}
      />

      {/* Correctly placed labels (rendered as overlays on SVG) */}
      {labels.filter(l => l.correct).map(label => {
        // We need to position these over the SVG
        const svgEl = svgContainerRef.current?.querySelector('svg');
        if (!svgEl) return null;

        const ctm = svgEl.getScreenCTM();
        if (!ctm) return null;

        const containerRect = drillAreaRef.current?.getBoundingClientRect();
        if (!containerRect) return null;

        const pt = svgEl.createSVGPoint();
        pt.x = label.correctX;
        pt.y = label.correctY;
        const screenPt = pt.matrixTransform(ctm);

        return (
          <div
            key={`placed-${label.id}`}
            className="lm-label-placed"
            style={{
              left: screenPt.x - containerRect.left,
              top: screenPt.y - containerRect.top - 10,
            }}
          >
            {label.text}
          </div>
        );
      })}

      {/* Draggable label chips */}
      <div className="lm-label-chips">
        {shuffledLabels.filter(l => !l.correct).map(label => (
          <div
            key={label.id}
            className={`lm-label-chip ${label.shaking ? 'lm-label-shake' : ''}`}
            onPointerDown={(e) => handlePointerDown(e, label)}
            style={{
              touchAction: 'none',
              userSelect: 'none',
            }}
          >
            {label.text}
          </div>
        ))}
      </div>

      {/* Dragging ghost */}
      {dragging && (
        <div
          className="lm-label-ghost"
          style={{
            left: dragging.x - dragging.offsetX,
            top: dragging.y - dragging.offsetY,
            position: 'fixed',
          }}
        >
          {labels.find(l => l.id === dragging.id)?.text}
        </div>
      )}

      {/* Completion message */}
      {completed && (
        <div className="lm-label-drill-complete">
          <span>{'\u{2705}'} All labels placed correctly!</span>
          <button className="lm-label-drill-done-btn" onClick={onClose}>Done</button>
        </div>
      )}
    </div>
  );
}
