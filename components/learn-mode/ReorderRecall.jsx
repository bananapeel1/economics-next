"use client";
import { useState, useRef } from 'react';

function norm(s) {
  return (s || '').trim().toLowerCase().replace(/[''""]/g, "'").replace(/[—–]/g, '-').replace(/\s+/g, ' ');
}

export default function ReorderRecall({ recall, onComplete }) {
  const [items, setItems] = useState(() => recall.shuffled.map(i => recall.correctOrder[i]));
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [itemResults, setItemResults] = useState([]);
  const itemRefs = useRef([]);
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
        const dy = toEl.getBoundingClientRect().top - fromEl.getBoundingClientRect().top;
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
    const results = items.map((item, i) => norm(item) === norm(correctOrder[i]));
    setItemResults(results);
    const allCorrect = results.every(Boolean);
    setIsCorrect(allCorrect);
    setChecked(true);
    onComplete?.(allCorrect);
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

      {/* User's answer — shown always */}
      <div className="lm-recall-items">
        {items.map((item, i) => {
          const isRight = checked && itemResults[i];
          const isWrong = checked && !itemResults[i];
          return (
            <div
              key={`item-${i}`}
              ref={el => itemRefs.current[i] = el}
              className={`lm-recall-item ${isRight ? 'correct' : ''} ${isWrong ? 'wrong' : ''} ${selectedIdx === i && !animating && !checked ? 'selected' : ''}`}
              onClick={() => handleTap(i)}
            >
              <span className="lm-recall-item-num">{i + 1}</span>
              <span className="lm-recall-item-text">{item}</span>
              {!checked && selectedIdx === i && !animating && (
                <span className="lm-recall-item-icon" style={{ color: '#a78bfa' }}>●</span>
              )}
              {isRight && <span className="lm-recall-item-icon" style={{ color: 'var(--rl-green)' }}>✓</span>}
              {isWrong && <span className="lm-recall-item-icon" style={{ color: 'var(--rl-red)' }}>✗</span>}
              {!checked && !animating && (
                <div className="lm-recall-arrows" onClick={e => e.stopPropagation()}>
                  <button className="lm-recall-arrow-btn" disabled={i === 0} onClick={() => moveItem(i, i - 1)}>▲</button>
                  <button className="lm-recall-arrow-btn" disabled={i === items.length - 1} onClick={() => moveItem(i, i + 1)}>▼</button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Correct order — shown only when wrong */}
      {checked && !isCorrect && (
        <div className="lm-recall-correct-order">
          <span className="lm-recall-correct-label">Correct order:</span>
          <div className="lm-recall-correct-list">
            {correctOrder.map((item, i) => (
              <span key={i} className="lm-recall-correct-item">{i + 1}. {item}</span>
            ))}
          </div>
        </div>
      )}

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
          {isCorrect
            ? '✓ Perfect order!'
            : `✗ ${itemResults.filter(Boolean).length} of ${itemResults.length} in the right position`}
        </div>
      )}
    </div>
  );
}
