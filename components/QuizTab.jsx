"use client";
import { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import PaywallOverlay from './PaywallOverlay';
import { Quiz as QuizIcon, CardClub } from './Icons';
import Link from 'next/link';

export default function QuizTab({ questions, sectionId, onAskTutor, previewMode = false, totalCount }) {
  const { user } = useAuth();
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [bestScore, setBestScore] = useState(null);
  const [saving, setSaving] = useState(false);

  const PREVIEW_LIMIT = 2;
  const displayQuestions = previewMode ? (questions || []).slice(0, PREVIEW_LIMIT) : (questions || []);
  // How many questions this student is actually being asked, which is what a score is out of.
  const quizLength = displayQuestions.length;

  // Reset state and load best score on section change
  useEffect(() => {
    setAnswers({});
    setSubmitted(false);
    setBestScore(null);

    // F087. This used to require `!previewMode`, so a signed-in free student — who gets the same
    // two-question preview as a stranger — had their attempt discarded and never saw a best. Being
    // signed in did nothing, which is the opposite of what an account is for. Signed in is the
    // only condition that matters here; the preview is a smaller quiz, not a different student.
    if (user && sectionId) {
      fetch(`/api/progress/quiz?sectionId=${sectionId}`)
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (!data || !data.attempts || data.attempts.length === 0) return;
          // Only compare like with like. A 2/2 preview and an 18/25 full attempt live in the same
          // table, and taking the max score across both would show "your best: 2" to somebody who
          // has answered eighteen correctly, or hide a perfect preview behind a longer attempt.
          const sameLength = data.attempts.filter(a => a.total === quizLength);
          if (!sameLength.length) return;
          setBestScore({ score: Math.max(...sameLength.map(a => a.score)), total: quizLength });
        })
        .catch(() => {});
    }
  }, [sectionId, user, previewMode, quizLength]);

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

    // Saved for any signed-in student, preview included (F087). The row already records its own
    // `total`, so a two-question attempt cannot be mistaken for a full one later.
    if (user) {
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

  // The server now sends only the preview slice, so the array length is the preview size, not the
  // bank size. The true total comes from the API's counts (F086).
  const totalQuizQuestions = totalCount ?? questions?.length ?? 0;

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
            {score}/{displayQuestions.length}
          </div>
          <div className="quiz-score-label">
            {/* F087: the preview score reads like a quiz result when it is two questions out of a
                bank of 25, so "2/2" looked like mastery and "0/2" like failure. Say which it is,
                and name the real size so the number cannot be mistaken for a section score. */}
            {previewMode
              ? `${score} of ${displayQuestions.length} in the preview. The full quiz for this section has ${totalQuizQuestions} questions.`
              : score === displayQuestions.length ? 'Perfect score!' :
                score >= displayQuestions.length * 0.8 ? 'Great work!' :
                score >= displayQuestions.length * 0.5 ? 'Good effort — review the explanations below.' :
                'Keep studying — review the explanations below.'}
          </div>
          {saving && <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Saving...</div>}
          {/* Retry works in preview too. Refusing it made a two-question sample feel like a
              one-shot test the student had already failed. */}
          <button className="quiz-reset-btn" onClick={handleReset}>Try Again</button>
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
