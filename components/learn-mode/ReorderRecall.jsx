"use client";
import { useState } from 'react';

/* ── Reorder Recall: put steps in the right sequence ── */
export default function ReorderRecall({ recall, onComplete }) {
  const [items, setItems] = useState(() => recall.shuffled.map(i => recall.correctOrder[i]));
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

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

  return (
    <div className="lm-recall-card">
      <div className="lm-recall-label">&#129504; Quick Recall — Reorder</div>
      <p className="lm-recall-prompt">{recall.prompt}</p>

      <div className="lm-recall-items">
        {items.map((item, i) => {
          const correctHere = checked && item === recall.correctOrder[i];
          const wrongHere = checked && item !== recall.correctOrder[i];
          return (
            <div key={i} className={`lm-recall-item ${correctHere ? 'correct' : ''} ${wrongHere ? 'wrong' : ''}`}>
              <span className="lm-recall-item-num">{i + 1}</span>
              <span className="lm-recall-item-text">{item}</span>
              {!checked && (
                <div className="lm-recall-item-arrows">
                  <button className="lm-recall-arrow" onClick={() => swap(i, i - 1)} disabled={i === 0}>&#9650;</button>
                  <button className="lm-recall-arrow" onClick={() => swap(i, i + 1)} disabled={i === items.length - 1}>&#9660;</button>
                </div>
              )}
              {checked && (
                <span className="lm-recall-item-icon">{correctHere ? '✓' : '✗'}</span>
              )}
            </div>
          );
        })}
      </div>

      {showHint && !checked && (
        <p className="lm-recall-hint">
          Hint: The first step is "<strong>{recall.correctOrder[0].substring(0, 3)}...</strong>"
        </p>
      )}

      {!checked ? (
        <div className="lm-recall-actions">
          {!showHint && <button className="lm-recall-hint-btn" onClick={() => setShowHint(true)}>Show hint</button>}
          <button className="lm-recall-check-btn" onClick={check}>Check order</button>
        </div>
      ) : (
        <div className={`lm-recall-result ${isCorrect ? 'correct' : 'wrong'}`}>
          {isCorrect ? '✓ Perfect order!' : `✗ Not quite — the correct order is shown above.`}
        </div>
      )}
    </div>
  );
}
