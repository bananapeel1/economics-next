"use client";
import { useState } from 'react';

/* ── Reorder Recall: tap to select, tap to swap ── */
export default function ReorderRecall({ recall, onComplete }) {
  const [items, setItems] = useState(() => recall.shuffled.map(i => recall.correctOrder[i]));
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(null);

  if (dismissed) return null;

  function handleTap(idx) {
    if (checked) return;
    if (selectedIdx === null) {
      // First tap — select this item
      setSelectedIdx(idx);
    } else if (selectedIdx === idx) {
      // Tap same item — deselect
      setSelectedIdx(null);
    } else {
      // Second tap — swap the two items
      const next = [...items];
      [next[selectedIdx], next[idx]] = [next[idx], next[selectedIdx]];
      setItems(next);
      setSelectedIdx(null);
    }
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
      {!checked && (
        <p className="lm-recall-hint-text">
          {selectedIdx !== null
            ? '↑ Now tap another item to swap with the highlighted one'
            : 'Tap an item to select it, then tap another to swap their positions'}
        </p>
      )}

      <div className="lm-recall-items">
        {displayItems.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className={`lm-recall-item ${checked ? 'correct' : ''} ${selectedIdx === i ? 'selected' : ''}`}
            onClick={() => handleTap(i)}
          >
            <span className="lm-recall-item-num">{i + 1}</span>
            <span className="lm-recall-item-text">{item}</span>
            {!checked && selectedIdx === i && <span className="lm-recall-item-icon" style={{ color: '#a78bfa' }}>●</span>}
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
