"use client";
import { useState, useEffect, useCallback } from 'react';

/* ── Question Card — Smart Practice Engine ── */
export default function QuestionCard({ question, sectionTitle, questionNumber, totalQuestions, onAnswer, onNext, onSkip }) {
  // F076: confidence is collected AFTER the reveal and is what advances the card, so it is never
  // a prompt whose answer is thrown away. computeNextReview already accepts 'guessed' | 'certain'.
  const [confidence, setConfidence] = useState(null);
  const [selected, setSelected] = useState(null);
  const [phase, setPhase] = useState(0); // 0=picking, 1=selected, 2=revealed

  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  const isCorrect = selected === question.correctIndex;

  // Reset state when question changes
  useEffect(() => {
    setSelected(null);
    setPhase(0);
  }, [question]);

  // Keyboard support: Enter to submit/advance, 1-4/A-D to select
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      const optCount = question.options?.length || 4;

      // Number keys 1-4 or letter keys A-D to select option.
      // F075: the range comparisons below are string comparisons, so "ArrowDown", "Control",
      // "Alt", "Backspace" and "CapsLock" all sort between "a" and "d" and used to pick an
      // answer. A single printable character is the only thing that may select one, and never
      // while a modifier is held.
      const isPrintable = e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
      if (phase < 2 && isPrintable) {
        let idx = null;
        if (e.key >= '1' && e.key <= String(optCount)) idx = parseInt(e.key) - 1;
        else if (e.key.toLowerCase() >= 'a' && e.key.toLowerCase() <= String.fromCharCode(96 + optCount)) idx = e.key.toLowerCase().charCodeAt(0) - 97;
        if (idx !== null && idx < optCount) {
          e.preventDefault();
          setSelected(idx);
          setPhase(1);
          return;
        }
      }

      // Enter key
      if (e.key === 'Enter') {
        e.preventDefault();
        if (phase === 1 && selected !== null) {
          setPhase(2);
        } else if (phase === 2 && confidence) {
          onAnswer?.({ correct: selected === question.correctIndex, confidence });
          onNext?.();
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, selected, question, confidence, onAnswer, onNext]);

  function handleSelect(index) {
    if (phase >= 2) return;
    setSelected(index);
    setPhase(1);
  }

  function handleCheck() {
    if (phase !== 1 || selected === null) return;
    setPhase(2);
  }

  function handleNext() {
    // Confidence is required to advance, so the answer and the confidence that schedules it are
    // recorded together in one call. Skip records nothing, which is the point of Skip.
    if (!confidence) return;
    onAnswer?.({ correct: isCorrect, confidence });
    onNext?.();
  }

  function getOptionClass(index) {
    if (phase === 0) return '';
    if (phase === 1) return index === selected ? 'selected' : '';
    // phase 2: revealed
    if (index === question.correctIndex) return index === selected ? 'correct' : 'correct-reveal';
    if (index === selected) return 'incorrect';
    return 'dimmed';
  }

  function getOptionIcon(index) {
    if (phase < 2) return null;
    if (index === question.correctIndex) return '\u2713';
    if (index === selected && index !== question.correctIndex) return '\u2717';
    return null;
  }

  return (
    <div className="spe-qcard spe-question-animate">
      <div className="spe-qcard-top">
        <span className="spe-qcard-badge">{sectionTitle}</span>
        <span className="spe-qcard-counter">{questionNumber} / {totalQuestions}</span>
      </div>

      <p className="spe-qcard-question">{question.question}</p>

      <div className="spe-qcard-options">
        {question.options?.map((option, i) => (
          <button
            key={i}
            className={`spe-qcard-option ${getOptionClass(i)}`}
            onClick={() => handleSelect(i)}
            disabled={phase >= 2}
          >
            <span className="spe-qcard-letter">
              {getOptionIcon(i) || letters[i]}
            </span>
            <span className="spe-qcard-option-text">{option}</span>
          </button>
        ))}
      </div>

      {/* Result card */}
      {phase >= 2 && (
        <div className={`spe-qcard-result ${isCorrect ? 'spe-qcard-result--correct' : 'spe-qcard-result--incorrect'}`}>
          <div className="spe-qcard-result-header">
            {isCorrect ? '\u2713 Correct!' : `\u2717 Incorrect \u2014 the answer was ${letters[question.correctIndex]}`}
          </div>
          {question.explanation && <p className="spe-qcard-result-explanation">{question.explanation}</p>}
          {!isCorrect && <p className="spe-qcard-result-hint">{'\u21BB'} You will see this one again before the session ends.</p>}
        </div>
      )}

      {/* Confidence, after the reveal. This is what schedules the card, so it is asked before
          the student can move on rather than offered and ignored (F076). */}
      {phase >= 2 && (
        <div className="spe-qcard-confidence">
          <span className="spe-qcard-confidence-label">How sure were you?</span>
          <div className="spe-qcard-confidence-row">
            {[
              { key: 'guessed', label: 'Guessed' },
              { key: 'unsure', label: 'Unsure' },
              { key: 'certain', label: 'Certain' },
            ].map((c) => (
              <button
                key={c.key}
                className={`spe-qcard-conf-btn ${confidence === c.key ? 'active' : ''}`}
                aria-pressed={confidence === c.key}
                onClick={() => setConfidence(c.key)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action row */}
      <div className="spe-qcard-actions">
        {phase < 2 && (
          <button className={`spe-qcard-check ${phase === 1 ? 'active' : ''}`} onClick={handleCheck} disabled={phase === 0}>
            Check answer
          </button>
        )}
        {phase >= 2 && (
          <button className="spe-qcard-next" onClick={handleNext} disabled={!confidence}>
            {confidence ? 'Next question \u2192' : 'Pick how sure you were'}
          </button>
        )}
        <button className="spe-qcard-skip" onClick={onSkip}>Skip</button>
      </div>
    </div>
  );
}
