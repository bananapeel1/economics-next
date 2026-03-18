"use client";
import { useState, useRef, useCallback } from 'react';

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

  if (dismissed) return null;

  function handleTap(idx) {
    if (checked || animating) return;
    if (selectedIdx === null) {
      setSelectedIdx(idx);
    } else if (selectedIdx === idx) {
      setSelectedIdx(null);
    } else {
      // Calculate the distance between the two items for the animation
      const fromEl = itemRefs.current[selectedIdx];
      const toEl = itemRefs.current[idx];
      if (fromEl && toEl) {
        const fromRect = fromEl.getBoundingClientRect();
        const toRect = toEl.getBoundingClientRect();
        const dy = toRect.top - fromRect.top;

        // Apply CSS custom properties for the animation distance
        fromEl.style.setProperty('--swap-dy', `${dy}px`);
        toEl.style.setProperty('--swap-dy', `${-dy}px`);
        fromEl.classList.add('swapping');
        toEl.classList.add('swapping');

        setAnimating(true);

        setTimeout(() => {
          // Remove animation classes
          fromEl.classList.remove('swapping');
          toEl.classList.remove('swapping');
          fromEl.style.removeProperty('--swap-dy');
          toEl.style.removeProperty('--swap-dy');

          // Apply the actual swap
          const next = [...items];
          [next[selectedIdx], next[idx]] = [next[idx], next[selectedIdx]];
          setItems(next);
          setSelectedIdx(null);
          setAnimating(false);
        }, 350);
      }
    }
  }

  function check() {
    if (animating) return;
    const correct = items.every((item, i) => item.trim() === recall.correctOrder[i].trim());
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
      {!checked && (
        <p className="lm-recall-hint-text">
          Tap an item to select it, then tap another to swap their positions
        </p>
      )}

      <div className="lm-recall-items">
        {displayItems.map((item, i) => (
          <div
            key={`${item}-${i}`}
            ref={el => itemRefs.current[i] = el}
            className={`lm-recall-item ${checked ? 'correct' : ''} ${selectedIdx === i && !animating ? 'selected' : ''}`}
            onClick={() => handleTap(i)}
          >
            <span className="lm-recall-item-num">{i + 1}</span>
            <span className="lm-recall-item-text">{item}</span>
            {!checked && selectedIdx === i && !animating && (
              <span className="lm-recall-item-icon" style={{ color: '#a78bfa' }}>●</span>
            )}
            {checked && <span className="lm-recall-item-icon" style={{ color: 'var(--rl-green)' }}>✓</span>}
            {!checked && !animating && (
              <div className="lm-recall-arrows" onClick={e => e.stopPropagation()}>
                <button
                  className="lm-recall-arrow-btn"
                  disabled={i === 0}
                  onClick={() => {
                    if (i === 0 || animating) return;
                    const next = [...items];
                    [next[i - 1], next[i]] = [next[i], next[i - 1]];
                    setItems(next);
                  }}
                >▲</button>
                <button
                  className="lm-recall-arrow-btn"
                  disabled={i === displayItems.length - 1}
                  onClick={() => {
                    if (i >= items.length - 1 || animating) return;
                    const next = [...items];
                    [next[i], next[i + 1]] = [next[i + 1], next[i]];
                    setItems(next);
                  }}
                >▼</button>
              </div>
            )}
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
