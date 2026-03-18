"use client";
import { useState } from 'react';

/* ── Fill-in-the-Blank Recall: type missing words into a chain ── */
export default function FillInRecall({ recall, onComplete }) {
  const [inputs, setInputs] = useState(() => recall.answers.map(() => ''));
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState([]);
  const [showHint, setShowHint] = useState(false);

  function updateInput(idx, value) {
    if (checked) return;
    const next = [...inputs];
    next[idx] = value;
    setInputs(next);
  }

  function check() {
    const res = inputs.map((input, i) =>
      input.trim().toLowerCase() === recall.answers[i].toLowerCase()
    );
    setResults(res);
    setChecked(true);
    onComplete?.(res.every(Boolean));
  }

  const allFilled = inputs.every(v => v.trim().length > 0);
  const correctCount = results.filter(Boolean).length;

  return (
    <div className="lm-recall-card">
      <div className="lm-recall-label">&#129504; Quick Recall — Fill in the Blanks</div>
      <p className="lm-recall-prompt">{recall.prompt}</p>

      <div className="lm-fillin-chain">
        {recall.template.map((part, i) => {
          const blankIdx = part.includes('___') ? recall.template.slice(0, i + 1).filter(p => p.includes('___')).length - 1 : -1;
          if (blankIdx < 0) {
            return <div key={i} className="lm-fillin-step">{part}</div>;
          }
          const isCorrect = checked && results[blankIdx];
          const isWrong = checked && !results[blankIdx];
          return (
            <div key={i} className={`lm-fillin-step ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}>
              {part.replace('___', '')}
              <input
                className={`lm-fillin-input ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
                value={checked && isWrong ? recall.answers[blankIdx] : inputs[blankIdx]}
                onChange={e => updateInput(blankIdx, e.target.value)}
                placeholder={showHint ? recall.hints?.[blankIdx] || '...' : '...'}
                disabled={checked}
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          );
        })}
      </div>

      {!checked ? (
        <div className="lm-recall-actions">
          {!showHint && recall.hints && (
            <button className="lm-recall-hint-btn" onClick={() => setShowHint(true)}>Show hints</button>
          )}
          <button className="lm-recall-check-btn" onClick={check} disabled={!allFilled}>Check answers</button>
        </div>
      ) : (
        <div className={`lm-recall-result ${correctCount === recall.answers.length ? 'correct' : 'wrong'}`}>
          {correctCount === recall.answers.length
            ? '✓ All correct!'
            : `${correctCount} of ${recall.answers.length} correct — the right answers are shown above.`}
        </div>
      )}
    </div>
  );
}
