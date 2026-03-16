"use client";
import { useState } from 'react';

/* ── Inline Quiz Card (MCQ) with Confidence Rating ── */
export default function InlineQuiz({ question, subjectId, sectionId, stepIndex }) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [confidence, setConfidence] = useState(null); // null | 'guessed' | 'somewhat' | 'certain'
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  function handleSelect(index) {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
  }

  const isCorrect = answered && selected === question.correctIndex;

  function handleConfidence(level) {
    setConfidence(level);

    // Feedback messages
    const messages = {
      guessed: 'Noted \u2014 this topic needs more practice.',
      somewhat: 'Good awareness \u2014 keep reviewing.',
      certain: isCorrect
        ? 'Great self-knowledge!'
        : 'Hmm \u2014 this is a good one to revisit.',
    };
    setFeedbackMsg(messages[level]);

    // Save to localStorage
    if (typeof window !== 'undefined' && subjectId && sectionId) {
      try {
        const key = `revvy_confidence_${subjectId}_${sectionId}`;
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        existing.push({
          questionIndex: stepIndex,
          correct: isCorrect,
          confidence: level,
          timestamp: Date.now(),
        });
        localStorage.setItem(key, JSON.stringify(existing));
      } catch {}
    }
  }

  function getOptionClass(index) {
    if (!answered) return selected === index ? 'selected' : '';
    if (index === question.correctIndex) return 'correct';
    if (index === selected && index !== question.correctIndex) return 'incorrect';
    return '';
  }

  return (
    <div className="lm-quiz-card">
      <div className="lm-card-label">&#128161; Quick quiz</div>
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
        {answered && (
          <div className="lm-quiz-explanation">
            <strong>{isCorrect ? 'Correct!' : 'Not quite.'}</strong>{' '}
            {question.explanation}
          </div>
        )}
        {/* Confidence rating — shown after answering, before rating */}
        {answered && !confidence && (
          <div className="lm-confidence-row">
            <span className="lm-confidence-prompt">How sure were you?</span>
            <div className="lm-confidence-buttons">
              <button className="lm-confidence-btn lm-conf-guessed" onClick={() => handleConfidence('guessed')}>Guessed</button>
              <button className="lm-confidence-btn lm-conf-somewhat" onClick={() => handleConfidence('somewhat')}>Somewhat sure</button>
              <button className="lm-confidence-btn lm-conf-certain" onClick={() => handleConfidence('certain')}>Certain</button>
            </div>
          </div>
        )}
        {confidence && (
          <div className="lm-confidence-done">{feedbackMsg}</div>
        )}
      </div>
    </div>
  );
}
