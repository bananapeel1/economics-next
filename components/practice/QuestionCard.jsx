"use client";
import { useState, useEffect } from 'react';

/* ── Premium Question Card — Revvy Learn Dark Theme ── */
export default function QuestionCard({ question, sectionTitle, questionNumber, totalQuestions, onAnswer, onNext }) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [revealPhase, setRevealPhase] = useState(0); // 0=picking, 1=selected pre-submit, 2=revealed
  const [confidence, setConfidence] = useState(null);

  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  const isCorrect = answered && selected === question.correctIndex;

  // Reset state when question changes
  useEffect(() => {
    setSelected(null);
    setAnswered(false);
    setRevealPhase(0);
    setConfidence(null);
  }, [question]);

  function handleSelect(index) {
    if (revealPhase >= 2) return; // already submitted
    setSelected(index);
    setRevealPhase(1); // selected, show confidence
  }

  function handleConfidence(level) {
    setConfidence(level);
  }

  function handleSubmit() {
    if (selected === null || !confidence) return;
    setAnswered(true);
    setRevealPhase(2);
  }

  function handleNext() {
    onAnswer?.({ correct: isCorrect, confidence });
    onNext?.();
  }

  function getOptionClass(index) {
    if (revealPhase === 0) return '';
    if (revealPhase === 1) {
      // Pre-submit: only highlight selected
      return index === selected ? 'selected' : '';
    }
    // revealPhase 2: post-submit reveal
    if (index === question.correctIndex) {
      return index === selected ? 'correct' : 'correct-reveal';
    }
    if (index === selected && index !== question.correctIndex) return 'incorrect';
    return '';
  }

  function getOptionIcon(index) {
    if (revealPhase < 2) return null;
    if (index === question.correctIndex) return '\u2713';
    if (index === selected && index !== question.correctIndex) return '\u2717';
    return null;
  }

  const showConfidence = revealPhase === 1 && selected !== null;
  const showSubmit = revealPhase === 1 && selected !== null && confidence !== null;
  const showResult = revealPhase >= 2;
  const showNext = revealPhase >= 2;

  return (
    <div className="spe-qcard spe-question-animate">
      {/* Section badge */}
      <div className="spe-qcard-badge">{sectionTitle}</div>

      {/* Question text */}
      <p className="spe-qcard-question">{question.question}</p>

      {/* Options */}
      <div className="spe-qcard-options">
        {question.options?.map((option, i) => (
          <button
            key={i}
            className={`spe-qcard-option ${getOptionClass(i)}`}
            onClick={() => handleSelect(i)}
            disabled={revealPhase >= 2}
          >
            <span className="spe-qcard-letter">
              {getOptionIcon(i) || letters[i]}
            </span>
            <span>{option}</span>
          </button>
        ))}
      </div>

      {/* Confidence row */}
      {showConfidence && (
        <div className="spe-qcard-confidence">
          <div className="spe-qcard-conf-label">How confident are you?</div>
          <div className="spe-qcard-conf-btns">
            <button
              className={`spe-qcard-conf-btn ${confidence === 'guessed' ? 'active-guessed' : ''}`}
              onClick={() => handleConfidence('guessed')}
            >
              Guessed
            </button>
            <button
              className={`spe-qcard-conf-btn ${confidence === 'somewhat' ? 'active-somewhat' : ''}`}
              onClick={() => handleConfidence('somewhat')}
            >
              Somewhat Sure
            </button>
            <button
              className={`spe-qcard-conf-btn ${confidence === 'certain' ? 'active-certain' : ''}`}
              onClick={() => handleConfidence('certain')}
            >
              Certain
            </button>
          </div>
        </div>
      )}

      {/* Submit button */}
      {showSubmit && (
        <button className="spe-qcard-submit" onClick={handleSubmit}>
          Submit Answer
        </button>
      )}

      {/* Result section */}
      {showResult && (
        <div className="spe-qcard-result">
          <div className={`spe-qcard-result-banner ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? '\u2713 Correct!' : '\u2717 Not quite'}
          </div>
          {question.explanation && (
            <div className="spe-qcard-explanation">
              {question.explanation}
            </div>
          )}
        </div>
      )}

      {/* Next button */}
      {showNext && (
        <button className="spe-qcard-next" onClick={handleNext}>
          Next Question &rarr;
        </button>
      )}
    </div>
  );
}
