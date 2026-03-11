"use client";
import { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';

export default function QuizTab({ questions, sectionId }) {
  const { user } = useAuth();
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [bestScore, setBestScore] = useState(null);
  const [saving, setSaving] = useState(false);

  // Reset state and load best score on section change
  useEffect(() => {
    setAnswers({});
    setSubmitted(false);
    setBestScore(null);

    if (user && sectionId) {
      fetch(`/api/progress/quiz?sectionId=${sectionId}`)
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (!data || !data.attempts || data.attempts.length === 0) return;
          const best = Math.max(...data.attempts.map(a => a.score));
          setBestScore({ score: best, total: data.attempts[0].total });
        })
        .catch(() => {});
    }
  }, [sectionId, user]);

  if (!questions || !questions.length) {
    return <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 40 }}>No quiz available.</div>;
  }

  function selectAnswer(qIndex, optIndex) {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qIndex]: optIndex }));
  }

  function handleSubmit() {
    setSubmitted(true);

    const finalScore = questions.reduce((acc, q, i) => acc + (answers[i] === q.correctIndex ? 1 : 0), 0);

    // Save to database if logged in
    if (user) {
      setSaving(true);
      fetch('/api/progress/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sectionId,
          score: finalScore,
          total: questions.length,
          answers,
        }),
      })
        .then(() => {
          // Update best score if this attempt is better
          if (!bestScore || finalScore > bestScore.score) {
            setBestScore({ score: finalScore, total: questions.length });
          }
        })
        .catch(() => {})
        .finally(() => setSaving(false));
    }
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
    ? score >= questions.length * 0.8 ? 'var(--accent-green-light)'
    : score >= questions.length * 0.5 ? 'var(--accent-amber)'
    : 'var(--accent-red)'
    : 'var(--accent-green)';

  return (
    <div>
      {bestScore && !submitted && (
        <div className="quiz-best-score">
          Your best: {bestScore.score}/{bestScore.total}
        </div>
      )}

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
          {saving && <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Saving...</div>}
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
