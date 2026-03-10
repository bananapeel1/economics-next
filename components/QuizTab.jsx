"use client";
import { useState, useEffect } from 'react';

export default function QuizTab({ questions, sectionId }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setAnswers({});
    setSubmitted(false);
  }, [sectionId]);

  if (!questions || !questions.length) {
    return <div style={{ color: '#6b7a99', textAlign: 'center', padding: 40 }}>No quiz available.</div>;
  }

  function selectAnswer(qIndex, optIndex) {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qIndex]: optIndex }));
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  function handleReset() {
    setAnswers({});
    setSubmitted(false);
  }

  const score = submitted
    ? questions.reduce((acc, q, i) => acc + (answers[i] === q.correctIndex ? 1 : 0), 0)
    : 0;

  const allAnswered = Object.keys(answers).length === questions.length;
  const scoreColor = submitted
    ? score >= questions.length * 0.8 ? '#10b981'
    : score >= questions.length * 0.5 ? '#f59e0b'
    : '#ef4444'
    : '#059669';

  return (
    <div>
      {submitted && (
        <div className="quiz-score">
          <div className="quiz-score-number" style={{ color: scoreColor }}>
            {score}/{questions.length}
          </div>
          <div className="quiz-score-label">
            {score === questions.length ? 'Perfect score!' :
             score >= questions.length * 0.8 ? 'Great work!' :
             score >= questions.length * 0.5 ? 'Good effort — review the explanations below.' :
             'Keep studying — review the explanations below.'}
          </div>
          <button className="quiz-reset-btn" onClick={handleReset}>Try Again</button>
        </div>
      )}

      {questions.map((q, qIndex) => (
        <div className="quiz-question" key={qIndex}>
          <div className="quiz-question-num">Question {qIndex + 1}</div>
          <div className="quiz-question-text">{q.question}</div>
          <div className="quiz-options">
            {q.options.map((opt, optIndex) => {
              let className = 'quiz-option';
              if (submitted) {
                if (optIndex === q.correctIndex) className += ' correct';
                else if (answers[qIndex] === optIndex) className += ' incorrect';
              } else if (answers[qIndex] === optIndex) {
                className += ' selected';
              }

              return (
                <button
                  key={optIndex}
                  className={className}
                  onClick={() => selectAnswer(qIndex, optIndex)}
                >
                  <div className="quiz-option-radio" />
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
          {submitted && q.explanation && (
            <div className="quiz-explanation">{q.explanation}</div>
          )}
        </div>
      ))}

      {!submitted && (
        <button
          className="quiz-submit-btn"
          disabled={!allAnswered}
          onClick={handleSubmit}
        >
          Submit Answers
        </button>
      )}
    </div>
  );
}
