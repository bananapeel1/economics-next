"use client";
import { useState } from 'react';

/* ── Drag-and-Drop Label Recall: drag words into blanks ── */
export default function FillInRecall({ recall, onComplete }) {
  const [placed, setPlaced] = useState(() => recall.answers.map(() => null));
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [dragWord, setDragWord] = useState(null);
  const [shuffledWords] = useState(() => [...recall.answers].sort(() => Math.random() - 0.5));

  if (dismissed) return null;

  const availableWords = shuffledWords.filter(w => !placed.includes(w));

  function handleDragStartWord(e, word) {
    if (checked) return;
    setDragWord(word);
    e.dataTransfer.effectAllowed = 'move';
  }

  function handleDropOnBlank(e, blankIdx) {
    e.preventDefault();
    if (!dragWord || checked) return;
    const next = [...placed];
    next[blankIdx] = dragWord;
    setPlaced(next);
    setDragWord(null);
  }

  function handleTapWord(word) {
    if (checked) return;
    const nextEmpty = placed.indexOf(null);
    if (nextEmpty >= 0) {
      const next = [...placed];
      next[nextEmpty] = word;
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
    const res = placed.map((word, i) =>
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
        <div className="lm-recall-label">&#129504; Quick Recall — Drag the Labels</div>
        <button className="lm-recall-dismiss" onClick={() => setDismissed(true)} title="Skip">&times;</button>
      </div>
      <p className="lm-recall-prompt">{recall.prompt}</p>

      <div className="lm-fillin-chain">
        {recall.template.map((part, i) => {
          const blankIdx = part.includes('___') ? recall.template.slice(0, i + 1).filter(p => p.includes('___')).length - 1 : -1;
          if (blankIdx < 0) {
            return <div key={i} className="lm-fillin-step">{part}</div>;
          }
          const word = placed[blankIdx];
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
              <span
                className={`lm-fillin-blank ${word ? 'filled' : ''} ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
                onClick={() => handleTapBlank(blankIdx)}
              >
                {checked && isWrong ? recall.answers[blankIdx] : word || (showHint ? recall.hints?.[blankIdx] : '___')}
              </span>
              {after && <span>{after}</span>}
            </div>
          );
        })}
      </div>

      {!checked && availableWords.length > 0 && (
        <div className="lm-word-bank">
          {availableWords.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="lm-word-chip"
              onClick={() => handleTapWord(word)}
            >
              {word}
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
