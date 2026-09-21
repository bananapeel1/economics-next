"use client";
import { useState, useRef } from 'react';
import { reorderStartOrder, gradeReorder, moveWithLocks, nextFreeSlot, partialLine } from '@/lib/recall-widgets';
import { RecallFrame, RecallOutcome, RecallAnswer, ATTEMPTS_BEFORE_ANSWER } from './RecallFrame';

/**
 * Reorder, packet 7. `showing` is 'first' on the recall's own step and 'spaced' on a later check-in;
 * the start order is seeded from the recall id and the showing (lib/recall-widgets.js), so the stored
 * `shuffled` field is ignored (F113) and the second showing is a different puzzle (F053).
 *
 * F056: one attempt with "Correct order" and no reason was the whole feedback. Now a wrong check
 * says how near it was, offers Try again with the right items locked in place, and the answer panel
 * carries the content's `why` line per item. The score reported to the engine is the first check only.
 */
export default function ReorderRecall({ recall, onComplete, onSkip, showing = 'first' }) {
  const correctOrder = useRef((recall.correctOrder || []).map((s) => String(s).trim())).current;
  const [items, setItems] = useState(() => reorderStartOrder(recall, showing).map((i) => correctOrder[i]));
  const [locked, setLocked] = useState(() => correctOrder.map(() => false));
  const [checked, setChecked] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [grade, setGrade] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [animating, setAnimating] = useState(false);
  const itemRefs = useRef([]);

  const n = items.length;

  function move(from, to) {
    if (animating || checked) return;
    setItems((prev) => moveWithLocks(prev, locked, from, to));
  }

  function handleTap(idx) {
    if (checked || animating || locked[idx]) return;
    if (selectedIdx === null) { setSelectedIdx(idx); return; }
    if (selectedIdx === idx) { setSelectedIdx(null); return; }
    const fromEl = itemRefs.current[selectedIdx];
    const toEl = itemRefs.current[idx];
    if (fromEl && toEl) {
      // The moved item travels to the target's slot; everything between shifts by one (F059).
      const dy = toEl.getBoundingClientRect().top - fromEl.getBoundingClientRect().top;
      fromEl.style.setProperty('--swap-dy', `${dy}px`);
      fromEl.classList.add('swapping');
      setAnimating(true);
      const fromIdx = selectedIdx;
      setTimeout(() => {
        fromEl.classList.remove('swapping');
        fromEl.style.removeProperty('--swap-dy');
        setItems((prev) => moveWithLocks(prev, locked, fromIdx, idx));
        setSelectedIdx(null);
        setAnimating(false);
      }, 350);
    } else {
      move(selectedIdx, idx);
      setSelectedIdx(null);
    }
  }

  function check() {
    if (animating || checked) return;
    const g = gradeReorder(items, correctOrder);
    setGrade(g);
    setChecked(true);
    setSelectedIdx(null);
    const next = attempts + 1;
    setAttempts(next);
    if (next === 1) onComplete?.(g.allCorrect);
    if (!g.allCorrect && next >= ATTEMPTS_BEFORE_ANSWER) setShowAnswer(true);
  }

  function retry() {
    if (!grade) return;
    setLocked(grade.results.slice());
    setChecked(false);
  }

  const why = Array.isArray(recall.why) ? recall.why : [];
  const answerEntries = correctOrder.map((text, i) => ({ text, why: why[i] }));

  return (
    <RecallFrame label="Reorder" prompt={recall.prompt} showing={showing} skipped={skipped}
      onSkip={onSkip ? () => { onSkip(); setSkipped(true); } : undefined}>
      {!checked && (
        <p className="lm-recall-hint-text">
          Tap an item, then tap the position it belongs in. The arrows move it one place.
          {attempts > 0 && ' Items marked correct are locked.'}
        </p>
      )}

      <div className="lm-recall-items" role="group" aria-label="Put these in the right order. Use the arrow keys to move an item.">
        {items.map((item, i) => {
          const isRight = (checked && grade?.results[i]) || (!checked && locked[i]);
          const isWrong = checked && !grade?.results[i];
          const isLocked = locked[i] && !checked;
          const selectable = !checked && !locked[i];
          return (
            <div
              key={`item-${i}`}
              ref={(el) => { itemRefs.current[i] = el; }}
              role="button"
              tabIndex={selectable ? 0 : -1}
              aria-pressed={selectedIdx === i && !animating && selectable}
              aria-disabled={!selectable}
              aria-label={`${item}. Position ${i + 1} of ${n}.${isLocked ? ' Correct, locked.' : ''}${checked ? (isRight ? ' Correct.' : ' Wrong position.') : ''}`}
              className={`lm-recall-item ${isRight ? 'correct' : ''} ${isWrong ? 'wrong' : ''} ${isLocked ? 'locked' : ''} ${selectedIdx === i && !animating && selectable ? 'selected' : ''}`}
              onClick={() => handleTap(i)}
              onKeyDown={(e) => {
                if (!selectable || animating) return;
                if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); handleTap(i); return; }
                if (e.key === 'ArrowUp') { e.preventDefault(); const t = nextFreeSlot(locked, i, -1); if (t >= 0) move(i, t); }
                if (e.key === 'ArrowDown') { e.preventDefault(); const t = nextFreeSlot(locked, i, 1); if (t >= 0) move(i, t); }
              }}
            >
              <span className="lm-recall-item-num">{i + 1}</span>
              <span className="lm-recall-item-text">{item}</span>
              {selectable && selectedIdx === i && !animating && (
                <span className="lm-recall-item-icon" style={{ color: '#a78bfa' }}>●</span>
              )}
              {isRight && <span className="lm-recall-item-icon" style={{ color: 'var(--rl-green)' }}>✓</span>}
              {isWrong && <span className="lm-recall-item-icon" style={{ color: 'var(--rl-red)' }}>✗</span>}
              {selectable && !animating && (
                <div className="lm-recall-arrows" onClick={(e) => e.stopPropagation()}>
                  <button type="button" className="lm-recall-arrow-btn" aria-label={`Move "${item}" up`}
                    disabled={nextFreeSlot(locked, i, -1) < 0} onClick={() => move(i, nextFreeSlot(locked, i, -1))}>▲</button>
                  <button type="button" className="lm-recall-arrow-btn" aria-label={`Move "${item}" down`}
                    disabled={nextFreeSlot(locked, i, 1) < 0} onClick={() => move(i, nextFreeSlot(locked, i, 1))}>▼</button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showHint && !checked && (
        <p className="lm-recall-hint">Hint: the first is &ldquo;<strong>{correctOrder[0]}</strong>&rdquo;.</p>
      )}

      {!checked ? (
        <div className="lm-recall-actions">
          {!showHint && attempts === 0 && <button type="button" className="lm-recall-hint-btn" onClick={() => setShowHint(true)}>Show hint</button>}
          <button type="button" className="lm-recall-check-btn" onClick={check}>Check order</button>
        </div>
      ) : (
        <RecallOutcome
          allCorrect={grade.allCorrect}
          doneLine="✓ Perfect order!"
          line={`✗ ${partialLine('reorder', grade.correct, n, grade.oneOff)}`}
          canRetry={!grade.allCorrect}
          onRetry={retry}
          canShowAnswer={!grade.allCorrect && !showAnswer}
          onShowAnswer={() => setShowAnswer(true)}
        />
      )}

      {checked && !grade.allCorrect && showAnswer && (
        <RecallAnswer label="Correct order" entries={answerEntries} />
      )}
    </RecallFrame>
  );
}
