"use client";
import { useState, useRef, useEffect, useCallback } from 'react';
import processSvg from './processSvg';

const TOLERANCE = 35; // px radius for correct drop placement

/**
 * Drag-and-drop label exercise for SVG diagrams.
 * Only extracts <text class="draggable"> elements — keeps axes, values,
 * and structural text in place. Shows pulsing drop indicators where
 * labels should be placed.
 */
export default function DiagramLabelDrill({ svgString, onClose }) {
  const svgContainerRef = useRef(null);
  const drillAreaRef = useRef(null);
  const [labels, setLabels] = useState([]);
  const [shuffledLabels, setShuffledLabels] = useState([]);
  const [dragging, setDragging] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [strippedSvg, setStrippedSvg] = useState('');

  // Parse SVG and extract only draggable text elements
  useEffect(() => {
    if (!svgString) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, 'image/svg+xml');
    const svgEl = doc.querySelector('svg');
    if (!svgEl) return;

    // Apply quality fixes (min strokes, text on top, etc.)
    processSvg(svgEl);

    // Find only text elements with class="draggable"
    const draggableEls = Array.from(svgEl.querySelectorAll('text.draggable'));

    // If no .draggable class found, fall back to extracting curve/point labels
    // (for older SVGs without the class)
    const textEls = draggableEls.length > 0
      ? draggableEls
      : Array.from(svgEl.querySelectorAll('text')).filter(t => {
          const text = t.textContent.trim();
          // Skip axis labels, values, and very short text
          if (!text || text.length < 2) return false;
          // Skip numerical values and axis titles
          if (/^\d+$/.test(text)) return false;
          if (/^(Price|Quantity|Cost|Output|Consumer|Capital|Q\)|P\))/i.test(text)) return false;
          return true;
        });

    const extracted = [];
    let idCounter = 0;

    textEls.forEach(textEl => {
      const text = textEl.textContent.trim();
      if (!text) return;

      const x = parseFloat(textEl.getAttribute('x') || 0);
      const y = parseFloat(textEl.getAttribute('y') || 0);
      const fill = textEl.getAttribute('fill') || '#e2e8f0';

      extracted.push({
        id: idCounter++,
        text,
        correctX: x,
        correctY: y,
        color: fill,
        correct: false,
        shaking: false,
      });

      // Replace text with a pulsing drop zone indicator
      const indicator = doc.createElementNS('http://www.w3.org/2000/svg', 'g');

      // Dashed rectangle as drop zone
      const rect = doc.createElementNS('http://www.w3.org/2000/svg', 'rect');
      const approxWidth = Math.max(text.length * 8, 40);
      rect.setAttribute('x', x - 4);
      rect.setAttribute('y', y - 14);
      rect.setAttribute('width', approxWidth);
      rect.setAttribute('height', 20);
      rect.setAttribute('rx', '4');
      rect.setAttribute('fill', 'none');
      rect.setAttribute('stroke', fill);
      rect.setAttribute('stroke-width', '1.5');
      rect.setAttribute('stroke-dasharray', '4 3');
      rect.setAttribute('opacity', '0.4');

      // Question mark placeholder
      const qmark = doc.createElementNS('http://www.w3.org/2000/svg', 'text');
      qmark.setAttribute('x', String(x + approxWidth / 2 - 4));
      qmark.setAttribute('y', String(y));
      qmark.setAttribute('fill', fill);
      qmark.setAttribute('font-size', '13');
      qmark.setAttribute('font-weight', '600');
      qmark.setAttribute('opacity', '0.35');
      qmark.textContent = '?';

      indicator.appendChild(rect);
      indicator.appendChild(qmark);

      // Remove original text, add indicator
      textEl.parentNode.replaceChild(indicator, textEl);
    });

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

  const handlePointerDown = useCallback((e, label) => {
    if (label.correct) return;
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
    setDragging(prev => ({ ...prev, x: e.clientX, y: e.clientY }));
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
        setLabels(prev => prev.map(l =>
          l.id === id ? { ...l, correct: true } : l
        ));
      } else {
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

  // Global pointer events during drag
  useEffect(() => {
    if (!dragging) return;
    const move = (e) => handlePointerMove(e);
    const up = (e) => handlePointerUp(e);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
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
          {placedCount} / {totalCount}
        </div>
        <button className="lm-label-drill-close" onClick={onClose}>&times;</button>
      </div>

      {/* SVG with drop zone indicators */}
      <div
        className="lm-label-drill-svg"
        ref={svgContainerRef}
        dangerouslySetInnerHTML={{ __html: strippedSvg }}
      />

      {/* Correctly placed labels overlay */}
      {labels.filter(l => l.correct).map(label => {
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
              color: label.color,
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
              borderColor: label.color,
              color: label.color,
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

      {/* Completion */}
      {completed && (
        <div className="lm-label-drill-complete">
          <span>{'\u{2705}'} All labels placed correctly!</span>
          <button className="lm-label-drill-done-btn" onClick={onClose}>Done</button>
        </div>
      )}
    </div>
  );
}
