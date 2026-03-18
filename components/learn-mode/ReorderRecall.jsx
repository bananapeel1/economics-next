"use client";
import { useState, useRef } from 'react';

/* ── Drag-and-Drop Reorder Recall ── */
export default function ReorderRecall({ recall, onComplete }) {
  const [items, setItems] = useState(() => recall.shuffled.map(i => recall.correctOrder[i]));
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [dragIdx, setDragIdx] = useState(null);
  const [overIdx, setOverIdx] = useState(null);
  const touchStartY = useRef(null);
  const touchItemIdx = useRef(null);

  if (dismissed) return null;

  function handleDragStart(e, idx) {
    if (checked) return;
    setDragIdx(idx);
    e.dataTransfer.effectAllowed = 'move';
  }

  function handleDragOver(e, idx) {
    e.preventDefault();
    if (dragIdx === null || dragIdx === idx) return;
    setOverIdx(idx);
  }

  function handleDrop(e, idx) {
    e.preventDefault();
    if (dragIdx === null || dragIdx === idx) return;
    const next = [...items];
    const [moved] = next.splice(dragIdx, 1);
    next.splice(idx, 0, moved);
    setItems(next);
    setDragIdx(null);
    setOverIdx(null);
  }

  function handleDragEnd() { setDragIdx(null); setOverIdx(null); }

  // Touch support for mobile
  function handleTouchStart(e, idx) {
    if (checked) return;
    touchStartY.current = e.touches[0].clientY;
    touchItemIdx.current = idx;
    setDragIdx(idx);
  }

  function handleTouchMove(e) {
    if (touchItemIdx.current === null) return;
    const y = e.touches[0].clientY;
    const diff = y - touchStartY.current;
    const threshold = 50;
    if (Math.abs(diff) > threshold) {
      const from = touchItemIdx.current;
      const to = diff > 0 ? Math.min(from + 1, items.length - 1) : Math.max(from - 1, 0);
      if (from !== to) {
        const next = [...items];
        [next[from], next[to]] = [next[to], next[from]];
        setItems(next);
        touchItemIdx.current = to;
        touchStartY.current = y;
      }
    }
  }

  function handleTouchEnd() {
    touchItemIdx.current = null;
    setDragIdx(null);
  }

  function check() {
    const correct = items.every((item, i) => item === recall.correctOrder[i]);
    setIsCorrect(correct);
    setChecked(true);
    onComplete?.(correct);
  }

  const displayItems = checked && !isCorrect ? recall.correctOrder : items;

  return (
    <div className="lm-recall-card">
      <div className="lm-recall-header">
        <div className="lm-recall-label">&#129504; Quick Recall — Reorder</div>
        <button className="lm-recall-dismiss" onClick={() => setDismissed(true)} title="Skip">&times;</button>
      </div>
      <p className="lm-recall-prompt">{recall.prompt}</p>

      <div className="lm-recall-items" onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        {displayItems.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className={`lm-recall-item ${checked ? 'correct' : ''} ${dragIdx === i ? 'dragging' : ''} ${overIdx === i ? 'drag-over' : ''}`}
            draggable={!checked}
            onDragStart={e => handleDragStart(e, i)}
            onDragOver={e => handleDragOver(e, i)}
            onDrop={e => handleDrop(e, i)}
            onDragEnd={handleDragEnd}
            onTouchStart={e => handleTouchStart(e, i)}
          >
            <span className="lm-recall-item-num">{i + 1}</span>
            <span className="lm-recall-item-text">{item}</span>
            {!checked && <span className="lm-recall-item-grip">⋮⋮</span>}
            {checked && <span className="lm-recall-item-icon" style={{ color: 'var(--rl-green)' }}>✓</span>}
          </div>
        ))}
      </div>

      {showHint && !checked && (
        <p className="lm-recall-hint">
          Hint: The first step is &ldquo;<strong>{recall.correctOrder[0].substring(0, 3)}...</strong>&rdquo;
        </p>
      )}

      {!checked ? (
        <div className="lm-recall-actions">
          {!showHint && <button className="lm-recall-hint-btn" onClick={() => setShowHint(true)}>Show hint</button>}
          <button className="lm-recall-check-btn" onClick={check}>Check order</button>
        </div>
      ) : (
        <div className={`lm-recall-result ${isCorrect ? 'correct' : 'wrong'}`}>
          {isCorrect ? '✓ Perfect order!' : '✗ Not quite — here\'s the correct order:'}
        </div>
      )}
    </div>
  );
}
