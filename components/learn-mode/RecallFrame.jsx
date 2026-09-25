"use client";

/**
 * The card every recall widget sits in. One header, one visible Skip, one prompt. Packet 7.
 *
 * F055: the exit used to be an unlabelled × that removed the card and recorded nothing. It is a
 * text button now, and what it does is written where the student can read it: the check is counted
 * as skipped and comes back at the next chapter check-in.
 */
export function RecallFrame({ label, prompt, onSkip, skipped, showing = 'first', children }) {
  if (skipped) {
    return (
      <div className="lm-recall-card lm-recall-card-skipped" role="status">
        <div className="lm-recall-header">
          <div className="lm-recall-label">&#129504; Quick Recall — {label}</div>
        </div>
        <p className="lm-recall-skipped-note">
          {showing === 'first' ? 'Skipped. This check comes back at the next chapter check-in.' : 'Skipped.'}
        </p>
      </div>
    );
  }
  return (
    <div className="lm-recall-card">
      <div className="lm-recall-header">
        <div className="lm-recall-label">&#129504; Quick Recall — {label}</div>
        {onSkip && (
          <button type="button" className="lm-recall-skip" onClick={onSkip} aria-label="Skip this check">Skip</button>
        )}
      </div>
      {prompt && <p className="lm-recall-prompt">{prompt}</p>}
      {children}
    </div>
  );
}

/** The line under a check, and the retry / show-answer controls that follow a wrong one. */
export function RecallOutcome({ allCorrect, line, canRetry, onRetry, canShowAnswer, onShowAnswer, doneLine = '✓ All correct!' }) {
  return (
    <>
      <div className={`lm-recall-result ${allCorrect ? 'correct' : 'wrong'}`} role="status">
        {allCorrect ? doneLine : line}
      </div>
      {!allCorrect && (canRetry || canShowAnswer) && (
        <div className="lm-recall-actions">
          {canRetry && <button type="button" className="lm-recall-check-btn" onClick={onRetry}>Try again</button>}
          {canShowAnswer && <button type="button" className="lm-recall-hint-btn" onClick={onShowAnswer}>Show the answer</button>}
        </div>
      )}
    </>
  );
}

/** The answer panel: an ordered or plain list, each entry with its `why` line when the content has one. */
export function RecallAnswer({ label = 'The answer', entries, ordered = true }) {
  return (
    <div className="lm-recall-correct-order">
      <span className="lm-recall-correct-label">{label}</span>
      <div className="lm-recall-correct-list">
        {entries.map((e, i) => (
          <div key={i} className="lm-recall-correct-entry">
            <span className="lm-recall-correct-item">{ordered ? `${i + 1}. ` : ''}{e.text}</span>
            {e.why && <span className="lm-recall-why">{e.why}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Shared retry bookkeeping: how many checks so far, and whether the answer is on show. */
export const ATTEMPTS_BEFORE_ANSWER = 2;
