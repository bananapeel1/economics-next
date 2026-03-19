"use client";
import { useState, useEffect } from 'react';

/* ── Question Card — Smart Practice Engine ── */
export default function QuestionCard({ question, sectionTitle, questionNumber, totalQuestions, onAnswer, onNext, onSkip }) {
  const [selected, setSelected] = useState(null);
  const [phase, setPhase] = useState(0); // 0=picking, 1=selected, 2=revealed

  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  const isCorrect = selected === question.correctIndex;

  // Reset state when question changes
  useEffect(() => {
    setSelected(null);
    setPhase(0);
  }, [question]);

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
    onAnswer?.({ correct: isCorrect });
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
          {!isCorrect && <p className="spe-qcard-result-hint">{'\u21BB'} This question will come back — spaced repetition.</p>}
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
          <button className="spe-qcard-next" onClick={handleNext}>
            Next question &rarr;
          </button>
        )}
        <button className="spe-qcard-skip" onClick={onSkip}>Skip</button>
      </div>
    </div>
  );
}
