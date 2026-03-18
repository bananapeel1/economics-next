"use client";
import { useState, useRef } from 'react';

/* Normalize string for comparison — strips whitespace, lowercases, removes punctuation */
function norm(s) {
  return (s || '').trim().toLowerCase().replace(/[''""]/g, "'").replace(/[—–]/g, '-').replace(/\s+/g, ' ');
}

/* ── Reorder Recall: tap to select, tap to swap ── */
export default function ReorderRecall({ recall, onComplete }) {
  const [items, setItems] = useState(() => recall.shuffled.map(i => recall.correctOrder[i]));
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [animating, setAnimating] = useState(false);
  const itemRefs = useRef([]);
  // Store correct order once to avoid any reference issues
  const correctOrder = useRef(recall.correctOrder.map(s => s.trim())).current;

  if (dismissed) return null;

  function moveItem(from, to) {
    if (from === to || from < 0 || to < 0 || from >= items.length || to >= items.length || animating || checked) return;
    setItems(prev => {
      const next = [...prev];
      [next[from], next[to]] = [next[to], next[from]];
      return next;
    });
  }

  function handleTap(idx) {
    if (checked || animating) return;
    if (selectedIdx === null) {
      setSelectedIdx(idx);
    } else if (selectedIdx === idx) {
      setSelectedIdx(null);
    } else {
      const fromEl = itemRefs.current[selectedIdx];
      const toEl = itemRefs.current[idx];
      if (fromEl && toEl) {
        const fromRect = fromEl.getBoundingClientRect();
        const toRect = toEl.getBoundingClientRect();
        const dy = toRect.top - fromRect.top;
        fromEl.style.setProperty('--swap-dy', `${dy}px`);
        toEl.style.setProperty('--swap-dy', `${-dy}px`);
        fromEl.classList.add('swapping');
        toEl.classList.add('swapping');
        setAnimating(true);
        const fromIdx = selectedIdx;
        setTimeout(() => {
          fromEl.classList.remove('swapping');
          toEl.classList.remove('swapping');
          fromEl.style.removeProperty('--swap-dy');
          toEl.style.removeProperty('--swap-dy');
          moveItem(fromIdx, idx);
          setSelectedIdx(null);
          setAnimating(false);
        }, 350);
      }
    }
  }

  function check() {
    if (animating) return;
    // Use normalized comparison to handle unicode/whitespace differences
    const correct = items.every((item, i) => norm(item) === norm(correctOrder[i]));
    setIsCorrect(correct);
    setChecked(true);
    onComplete?.(correct);
  }

  return (
    <div className="lm-recall-card">
      <div className="lm-recall-header">
        <div className="lm-recall-label">&#129504; Quick Recall — Reorder</div>
        <button className="lm-recall-dismiss" onClick={() => setDismissed(true)} title="Skip">&times;</button>
      </div>
      <p className="lm-recall-prompt">{recall.prompt}</p>
      {!checked && (
        <p className="lm-recall-hint-text">
          Tap an item to select it, then tap another to swap their positions
        </p>
      )}

      <div className="lm-recall-items">
        {(checked && !isCorrect ? correctOrder : items).map((item, i) => (
          <div
            key={`item-${i}`}
            ref={el => itemRefs.current[i] = el}
            className={`lm-recall-item ${checked && isCorrect ? 'correct' : ''} ${checked && !isCorrect ? 'show-answer' : ''} ${selectedIdx === i && !animating && !checked ? 'selected' : ''}`}
            onClick={() => handleTap(i)}
          >
            <span className="lm-recall-item-num">{i + 1}</span>
            <span className="lm-recall-item-text">{item}</span>
            {!checked && selectedIdx === i && !animating && (
              <span className="lm-recall-item-icon" style={{ color: '#a78bfa' }}>●</span>
            )}
            {checked && isCorrect && <span className="lm-recall-item-icon" style={{ color: 'var(--rl-green)' }}>✓</span>}
            {!checked && !animating && (
              <div className="lm-recall-arrows" onClick={e => e.stopPropagation()}>
                <button className="lm-recall-arrow-btn" disabled={i === 0} onClick={() => moveItem(i, i - 1)}>▲</button>
                <button className="lm-recall-arrow-btn" disabled={i === items.length - 1} onClick={() => moveItem(i, i + 1)}>▼</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {showHint && !checked && (
        <p className="lm-recall-hint">
          Hint: The first step is &ldquo;<strong>{correctOrder[0].substring(0, 3)}...</strong>&rdquo;
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
