"use client";
import { useState } from 'react';

/* ── Drag-and-Drop Label Recall: drag words into blanks ── */
export default function FillInRecall({ recall, onComplete , onSkip }) {
  /*
   * F106. Chips were tracked by their TEXT: `placed` held strings and the word bank hid any word
   * already placed. A recall whose answers repeat — "utility", "utility", "diminishes" — therefore
   * lost its second chip the moment the first was placed, the second blank could never be filled,
   * and Check stayed disabled for good. Five live recalls do this. The validator now refuses new
   * ones; this makes the existing five solvable today by tracking chips by index instead.
   */
  const [placed, setPlaced] = useState(() => recall.answers.map(() => null)); // chip index per blank
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [dragChip, setDragChip] = useState(null);
  // Deterministic order, so the server and client agree (F118) and the bank does not reshuffle mid-attempt.
  const [chips] = useState(() => recall.answers.map((word, i) => ({ id: i, word })).sort((a, b) => {
    const h = (x) => { let n = 0; for (const c of `${x.word}|${x.id}`) n = (n * 31 + c.charCodeAt(0)) >>> 0; return n; };
    return h(a) - h(b);
  }));

  if (dismissed) return null;

  const availableChips = chips.filter((c) => !placed.includes(c.id));
  const wordAt = (blankIdx) => (placed[blankIdx] == null ? null : chips.find((c) => c.id === placed[blankIdx])?.word ?? null);

  function handleDragStartWord(e, chipId) {
    if (checked) return;
    setDragChip(chipId);
    e.dataTransfer.effectAllowed = 'move';
  }

  function handleDropOnBlank(e, blankIdx) {
    e.preventDefault();
    if (dragChip == null || checked) return;
    const next = [...placed];
    next[blankIdx] = dragChip;
    setPlaced(next);
    setDragChip(null);
  }

  function handleTapWord(chipId) {
    if (checked) return;
    const nextEmpty = placed.indexOf(null);
    if (nextEmpty >= 0) {
      const next = [...placed];
      next[nextEmpty] = chipId;
      setPlaced(next);
    }
  }

  function handleTapBlank(blankIdx) {
    if (checked || placed[blankIdx] === null) return;
    const next = [...placed];
    next[blankIdx] = null;
    setPlaced(next);
  }

  function check() {
    const res = placed.map((chipId, i) => wordAt(i)).map((word, i) =>
      word && word.toLowerCase() === recall.answers[i].toLowerCase()
    );
    setResults(res);
    setChecked(true);
    onComplete?.(res.every(Boolean));
  }

  const allFilled = placed.every(w => w !== null);
  const correctCount = results.filter(Boolean).length;

  return (
    <div className="lm-recall-card">
      <div className="lm-recall-header">
        <div className="lm-recall-label">&#129504; Quick Recall — Fill in the Blanks</div>
        <button type="button" className="lm-recall-dismiss" onClick={() => { onSkip?.(); setDismissed(true); }} aria-label="Skip this check" title="Skip">&times;</button>
      </div>
      <p className="lm-recall-prompt">{recall.prompt}</p>

      <div className="lm-fillin-chain">
        {recall.template.map((part, i) => {
          const blankIdx = part.includes('___') ? recall.template.slice(0, i + 1).filter(p => p.includes('___')).length - 1 : -1;
          if (blankIdx < 0) {
            return <div key={i} className="lm-fillin-step">{part}</div>;
          }
          const word = wordAt(blankIdx);
          const isCorrect = checked && results[blankIdx];
          const isWrong = checked && !results[blankIdx];
          const [before, after] = part.split('___');
          return (
            <div
              key={i}
              className={`lm-fillin-step ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
              onDragOver={e => e.preventDefault()}
              onDrop={e => handleDropOnBlank(e, blankIdx)}
            >
              {before && <span>{before}</span>}
              {/* F070: a click-only span. No role, no keyboard path, and a screen reader read it
                  as loose text, so a blank was neither reachable nor identifiable. */}
              <span
                role="button"
                tabIndex={checked ? -1 : 0}
                aria-label={
                  checked
                    ? `Blank ${blankIdx + 1}. ${isCorrect ? 'Correct' : `Wrong, the answer is ${recall.answers[blankIdx]}`}.`
                    : word
                      ? `Blank ${blankIdx + 1}, filled with ${word}. Activate to clear it.`
                      : `Blank ${blankIdx + 1}, empty. Activate after choosing a word.`
                }
                className={`lm-fillin-blank ${word ? 'filled' : ''} ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
                onClick={() => handleTapBlank(blankIdx)}
                onKeyDown={(e) => {
                  if (checked) return;
                  if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); handleTapBlank(blankIdx); }
                }}
              >
                {checked && isWrong ? recall.answers[blankIdx] : word || (showHint ? recall.hints?.[blankIdx] : '___')}
              </span>
              {after && <span>{after}</span>}
            </div>
          );
        })}
      </div>

      {!checked && availableChips.length > 0 && (
        <div className="lm-word-bank" role="group" aria-label="Word bank. Choose a word, then choose a blank.">
          {availableChips.map((chip) => (
            <span
              key={chip.id}
              role="button"
              tabIndex={0}
              aria-label={`Use the word ${chip.word}`}
              className="lm-word-chip"
              onClick={() => handleTapWord(chip.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); handleTapWord(chip.id); }
              }}
            >
              {chip.word}
            </span>
          ))}
        </div>
      )}

      {!checked ? (
        <div className="lm-recall-actions">
          {!showHint && recall.hints && (
            <button className="lm-recall-hint-btn" onClick={() => setShowHint(true)}>Show hints</button>
          )}
          <button className="lm-recall-check-btn" onClick={check} disabled={!allFilled}>Check answers</button>
        </div>
      ) : (
        <>
          <div className={`lm-recall-result ${correctCount === recall.answers.length ? 'correct' : 'wrong'}`}>
            {correctCount === recall.answers.length
              ? '✓ All correct!'
              : `${correctCount} of ${recall.answers.length} correct`}
          </div>
          {correctCount < recall.answers.length && (
            <div className="lm-recall-correct-answers">
              <span className="lm-recall-correct-label">Correct answers:</span>
              {recall.answers.map((ans, i) => (
                <span key={i} className="lm-recall-correct-word">{ans}</span>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
