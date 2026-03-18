"use client";
import { useState } from 'react';

/* ── Reorder Recall: put steps in the right sequence ── */
export default function ReorderRecall({ recall, onComplete }) {
  const [items, setItems] = useState(() => recall.shuffled.map(i => recall.correctOrder[i]));
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  function swap(from, to) {
    if (checked || to < 0 || to >= items.length) return;
    const next = [...items];
    [next[from], next[to]] = [next[to], next[from]];
    setItems(next);
  }

  function check() {
    const correct = items.every((item, i) => item === recall.correctOrder[i]);
    setIsCorrect(correct);
    setChecked(true);
    onComplete?.(correct);
  }

  // After checking, show the correct order
  const displayItems = checked && !isCorrect ? recall.correctOrder : items;

  return (
    <div className="lm-recall-card">
      <div className="lm-recall-header">
        <div className="lm-recall-label">&#129504; Quick Recall — Reorder</div>
        <button className="lm-recall-dismiss" onClick={() => setDismissed(true)} title="Skip">&times;</button>
      </div>
      <p className="lm-recall-prompt">{recall.prompt}</p>

      <div className="lm-recall-items">
        {displayItems.map((item, i) => {
          const correctHere = checked && item === recall.correctOrder[i];
          const wrongHere = checked && !isCorrect && items[i] !== recall.correctOrder[i];
          return (
            <div key={i} className={`lm-recall-item ${checked ? (correctHere ? 'correct' : '') : ''} ${wrongHere ? '' : ''}`}>
              <span className="lm-recall-item-num">{i + 1}</span>
              <span className="lm-recall-item-text">{item}</span>
              {!checked && (
                <div className="lm-recall-item-arrows">
                  <button className="lm-recall-arrow" onClick={() => swap(i, i - 1)} disabled={i === 0}>&#9650;</button>
                  <button className="lm-recall-arrow" onClick={() => swap(i, i + 1)} disabled={i === items.length - 1}>&#9660;</button>
                </div>
              )}
              {checked && <span className="lm-recall-item-icon" style={{ color: 'var(--rl-green)' }}>✓</span>}
            </div>
          );
        })}
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
