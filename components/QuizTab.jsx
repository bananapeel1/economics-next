"use client";
import { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import PaywallOverlay from './PaywallOverlay';
import { Quiz as QuizIcon, CardClub } from './Icons';
import Link from 'next/link';

export default function QuizTab({ questions, sectionId, onAskTutor, previewMode = false }) {
  const { user } = useAuth();
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [bestScore, setBestScore] = useState(null);
  const [saving, setSaving] = useState(false);

  const PREVIEW_LIMIT = 2;
  const displayQuestions = previewMode ? (questions || []).slice(0, PREVIEW_LIMIT) : (questions || []);

  // Reset state and load best score on section change
  useEffect(() => {
    setAnswers({});
    setSubmitted(false);
    setBestScore(null);

    if (user && sectionId && !previewMode) {
      fetch(`/api/progress/quiz?sectionId=${sectionId}`)
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (!data || !data.attempts || data.attempts.length === 0) return;
          const best = Math.max(...data.attempts.map(a => a.score));
          setBestScore({ score: best, total: data.attempts[0].total });
        })
        .catch(() => {});
    }
  }, [sectionId, user, previewMode]);

  if (!questions || !questions.length) {
    return <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 40 }}>No quiz available.</div>;
  }

  function selectAnswer(qIndex, optIndex) {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qIndex]: optIndex }));
  }

  function handleSubmit() {
    setSubmitted(true);

    const finalScore = displayQuestions.reduce((acc, q, i) => acc + (answers[i] === q.correctIndex ? 1 : 0), 0);

    // Save to database if logged in (skip in preview mode)
    if (user && !previewMode) {
      setSaving(true);
      fetch('/api/progress/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sectionId,
          score: finalScore,
          total: displayQuestions.length,
          answers,
        }),
      })
        .then(() => {
          if (!bestScore || finalScore > bestScore.score) {
            setBestScore({ score: finalScore, total: displayQuestions.length });
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
    ? displayQuestions.reduce((acc, q, i) => acc + (answers[i] === q.correctIndex ? 1 : 0), 0)
    : 0;

  const allAnswered = Object.keys(answers).length === displayQuestions.length;
  const scoreColor = submitted
    ? score >= displayQuestions.length * 0.8 ? 'var(--accent-green-light)'
    : score >= displayQuestions.length * 0.5 ? 'var(--accent-amber)'
    : 'var(--accent-red)'
    : 'var(--accent-green)';

  const totalQuizQuestions = questions?.length || 0;

  return (
    <div>
      {bestScore && !submitted && !previewMode && (
        <div className="quiz-best-score">
          Your best: {bestScore.score}/{bestScore.total}
        </div>
      )}

      {submitted && (
        <div className="quiz-score">
          <div className="quiz-score-number" style={{ color: scoreColor }}>
            {score}/{displayQuestions.length}
          </div>
          <div className="quiz-score-label">
            {previewMode
              ? `You answered ${score} of ${displayQuestions.length} questions correctly.`
              : score === displayQuestions.length ? 'Perfect score!' :
                score >= displayQuestions.length * 0.8 ? 'Great work!' :
                score >= displayQuestions.length * 0.5 ? 'Good effort — review the explanations below.' :
                'Keep studying — review the explanations below.'}
          </div>
          {saving && <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Saving...</div>}
          {!previewMode && <button className="quiz-reset-btn" onClick={handleReset}>Try Again</button>}
        </div>
      )}

      {displayQuestions.map((q, qIndex) => (
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
          {submitted && answers[qIndex] !== q.correctIndex && onAskTutor && !previewMode && (
            <button
              className="quiz-ask-tutor-btn"
              onClick={() => onAskTutor(
                `I got this quiz question wrong and need help understanding it:\n\n**Question:** ${q.question}\n**My answer:** ${q.options[answers[qIndex]]}\n**Correct answer:** ${q.options[q.correctIndex]}\n\nPlease explain why the correct answer is right and why my answer was wrong. Help me understand the underlying concept so I don't make this mistake again.`
              )}
            >
              🤖 Ask Tutor to Explain
            </button>
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

      {/* Upgrade CTA after preview questions */}
      {previewMode && submitted && (
        <PaywallOverlay feature="Quiz" previewText={`You've previewed ${PREVIEW_LIMIT} of ${totalQuizQuestions} questions`} />
      )}

      {/* Post-quiz break prompt */}
      {submitted && !previewMode && (
        <div className="quiz-break-prompt">
          <div className="quiz-break-emoji">&#127881;</div>
          <div className="quiz-break-text">Nice work! Want a break?</div>
          <Link href="/fun" className="quiz-break-cta">
            <CardClub size={16} />
            Play Blackjack
          </Link>
        </div>
      )}
    </div>
  );
}
