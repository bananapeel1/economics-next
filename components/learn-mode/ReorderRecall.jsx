"use client";
import { useState } from 'react';

/* ── Reorder Recall: tap to select, tap to swap with animation ── */
export default function ReorderRecall({ recall, onComplete }) {
  const [items, setItems] = useState(() => recall.shuffled.map(i => recall.correctOrder[i]));
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [swapPair, setSwapPair] = useState(null); // { from, to } during animation

  if (dismissed) return null;

  function handleTap(idx) {
    if (checked || swapPair) return;
    if (selectedIdx === null) {
      setSelectedIdx(idx);
    } else if (selectedIdx === idx) {
      setSelectedIdx(null);
    } else {
      // Animate swap, then apply
      setSwapPair({ from: selectedIdx, to: idx });
      setTimeout(() => {
        const next = [...items];
        [next[selectedIdx], next[idx]] = [next[idx], next[selectedIdx]];
        setItems(next);
        setSelectedIdx(null);
        setSwapPair(null);
      }, 300);
    }
  }

  function check() {
    if (swapPair) return; // Don't check during swap animation
    const correct = items.every((item, i) => item.trim() === recall.correctOrder[i].trim());
    setIsCorrect(correct);
    setChecked(true);
    onComplete?.(correct);
  }

  const displayItems = checked && !isCorrect ? recall.correctOrder : items;

  function getItemClass(i) {
    let cls = 'lm-recall-item';
    if (checked) cls += ' correct';
    if (selectedIdx === i && !swapPair) cls += ' selected';
    if (swapPair?.from === i) cls += ' swap-up';
    if (swapPair?.to === i) cls += ' swap-down';
    return cls;
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
          {selectedIdx !== null
            ? '↑ Now tap another item to swap with the highlighted one'
            : 'Tap an item to select it, then tap another to swap their positions'}
        </p>
      )}

      <div className="lm-recall-items">
        {displayItems.map((item, i) => (
          <div key={`${item}-${i}`} className={getItemClass(i)} onClick={() => handleTap(i)}>
            <span className="lm-recall-item-num">{i + 1}</span>
            <span className="lm-recall-item-text">{item}</span>
            {!checked && selectedIdx === i && !swapPair && <span className="lm-recall-item-icon" style={{ color: '#a78bfa' }}>●</span>}
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
