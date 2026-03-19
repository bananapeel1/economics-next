"use client";
import { useState, useEffect } from 'react';

/* ── Single Question Display for Smart Practice Engine ── */
export default function QuestionCard({ question, sectionTitle, questionNumber, totalQuestions, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [revealPhase, setRevealPhase] = useState(0); // 0=unanswered, 1=user choice shown, 2=full reveal
  const [confidence, setConfidence] = useState(null);
  const [confidenceTimedOut, setConfidenceTimedOut] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  const isCorrect = answered && selected === question.correctIndex;

  // Auto-dismiss confidence after 4s if not answered
  useEffect(() => {
    if (revealPhase >= 2 && !confidence && !confidenceTimedOut) {
      const timer = setTimeout(() => setConfidenceTimedOut(true), 4000);
      return () => clearTimeout(timer);
    }
  }, [revealPhase, confidence, confidenceTimedOut]);

  // Show Next button after confidence is selected or times out
  useEffect(() => {
    if (confidence || confidenceTimedOut) {
      setShowNext(true);
    }
  }, [confidence, confidenceTimedOut]);

  function handleSelect(index) {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    setRevealPhase(1);
    // After 200ms, reveal correct answer + explanation
    setTimeout(() => setRevealPhase(2), 200);
  }

  function handleConfidence(level) {
    setConfidence(level);
  }

  function handleNext() {
    onAnswer?.({ correct: isCorrect, confidence: confidence || null });
  }

  function getOptionClass(index) {
    if (!answered) return selected === index ? 'selected' : '';
    if (revealPhase === 1) {
      if (index === selected) return index === question.correctIndex ? 'correct' : 'incorrect';
      return '';
    }
    // revealPhase >= 2: full reveal
    if (index === question.correctIndex) return 'correct';
    if (index === selected && index !== question.correctIndex) return 'incorrect';
    return '';
  }

  return (
    <div className="spe-question-wrapper">
      {/* Progress bar */}
      <div className="spe-progress-bar">
        <div className="spe-progress-fill" style={{ width: `${(questionNumber / totalQuestions) * 100}%` }} />
      </div>
      <div className="spe-progress-text">Question {questionNumber} of {totalQuestions}</div>

      {/* Section badge */}
      <div className="spe-section-badge">{sectionTitle}</div>

      {/* Question card — reuse lm-quiz-* classes */}
      <div className="lm-quiz-card" style={{ margin: 0 }}>
        <div className="lm-quiz-inner">
          <p className="lm-quiz-question">{question.question}</p>
          <div className="lm-quiz-options">
            {question.options?.map((option, i) => (
              <button
                key={i}
                className={`lm-quiz-option ${getOptionClass(i)}`}
                onClick={() => handleSelect(i)}
              >
                <span className="lm-quiz-option-letter">{letters[i]}</span>
                {option}
              </button>
            ))}
          </div>

          {/* Explanation */}
          {revealPhase >= 2 && (
            <div className="lm-quiz-explanation lm-animate-slide-in">
              <strong>{isCorrect ? 'Correct!' : 'Not quite.'}</strong>{' '}
              {question.explanation}
            </div>
          )}

          {/* Confidence rating — auto-dismisses after 4s */}
          {revealPhase >= 2 && !confidence && !confidenceTimedOut && (
            <div className="lm-confidence-row lm-animate-fade-in">
              <span className="lm-confidence-prompt">How sure were you?</span>
              <div className="lm-confidence-buttons">
                <button className="lm-confidence-btn lm-conf-guessed" onClick={() => handleConfidence('guessed')}>Guessed</button>
                <button className="lm-confidence-btn lm-conf-somewhat" onClick={() => handleConfidence('somewhat')}>Somewhat sure</button>
                <button className="lm-confidence-btn lm-conf-certain" onClick={() => handleConfidence('certain')}>Certain</button>
                <button className="lm-confidence-btn lm-conf-skip" onClick={() => setConfidenceTimedOut(true)}>Skip</button>
              </div>
            </div>
          )}

          {confidence && (
            <div className="lm-confidence-done">
              {confidence === 'guessed' && 'Noted \u2014 this topic needs more practice.'}
              {confidence === 'somewhat' && 'Good awareness \u2014 keep reviewing.'}
              {confidence === 'certain' && (isCorrect ? 'Great self-knowledge!' : 'Hmm \u2014 this is a good one to revisit.')}
            </div>
          )}

          {confidenceTimedOut && !confidence && (
            <div className="lm-confidence-done" style={{ fontStyle: 'italic' }}>No worries — moving on.</div>
          )}
        </div>
      </div>

      {/* Next button */}
      {showNext && (
        <button className="spe-next-btn" onClick={handleNext}>
          Next Question &rarr;
        </button>
      )}
    </div>
  );
}
