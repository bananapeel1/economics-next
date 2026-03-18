"use client";
import { useState, useMemo } from 'react';
import { recordPretest } from '@/lib/strength';

/* ── Pre-test Before Learning ── */
export default function PreTest({ quizData, subjectId, sectionId, onDone }) {
  const questions = useMemo(() => {
    if (!quizData?.length) return [];
    const shuffled = [...quizData].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(3, shuffled.length));
  }, [quizData]);

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [revealIndex, setRevealIndex] = useState(-1);
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  function handleSelect(qIdx, optIdx) {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
    // Auto-scroll to next question on mobile
    if (qIdx < questions.length - 1) {
      setTimeout(() => {
        const nextQ = document.querySelector(`[data-pretest-q="${qIdx + 1}"]`);
        nextQ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  }

  function handleSubmit() {
    if (Object.keys(answers).length < questions.length) return;
    setSubmitted(true);
    // Stagger reveal each question's answer
    questions.forEach((_, i) => {
      setTimeout(() => setRevealIndex(i), (i + 1) * 150);
    });

    // Calculate score
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) correct++;
    });
    const score = questions.length > 0 ? correct / questions.length : 0;

    // Save pre-test result + questions for post-test comparison
    if (typeof window !== 'undefined') {
      localStorage.setItem(`revvy_pretest_${subjectId}_${sectionId}`, JSON.stringify({
        completed: true,
        score: correct,
        total: questions.length,
        timestamp: Date.now(),
        questions: questions.map((q, i) => ({
          question: q.question,
          options: q.options,
          correctIndex: q.correctIndex,
          explanation: q.explanation,
          userAnswer: answers[i],
        })),
      }));
    }

    // Record to strength meter
    recordPretest(subjectId, sectionId, score);
  }

  const correctCount = questions.reduce((c, q, i) => c + (answers[i] === q.correctIndex ? 1 : 0), 0);
  const allCorrect = correctCount === questions.length;
  const noneCorrect = correctCount === 0;

  if (!questions.length) {
    onDone?.();
    return null;
  }

  return (
    <div className="lm-pretest-container">
      <div className="lm-pretest-header">
        <div className="lm-pretest-icon">&#129504;</div>
        <h2 className="lm-pretest-title">Quick pre-test</h2>
        <p className="lm-pretest-subtitle">Let&apos;s see what you already know. This primes your brain for learning.</p>
      </div>

      {questions.map((q, qIdx) => (
        <div className="lm-pretest-question" key={qIdx} data-pretest-q={qIdx}>
          <p className="lm-pretest-q-text">{qIdx + 1}. {q.question}</p>
          <div className="lm-quiz-options">
            {q.options?.map((option, i) => {
              let cls = '';
              if (submitted && revealIndex >= qIdx) {
                if (i === q.correctIndex) cls = 'correct';
                else if (i === answers[qIdx] && i !== q.correctIndex) cls = 'incorrect';
              } else if (answers[qIdx] === i) {
                cls = 'selected';
              }
              return (
                <button
                  key={i}
                  className={`lm-quiz-option ${cls}`}
                  onClick={() => handleSelect(qIdx, i)}
                >
                  <span className="lm-quiz-option-letter">{letters[i]}</span>
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {!submitted && (
        <div className="lm-pretest-actions">
          <button
            className="lm-pretest-submit"
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < questions.length}
          >
            Check my answers
          </button>
          <button className="lm-pretest-skip" onClick={onDone}>
            Skip pre-test &rarr;
          </button>
        </div>
      )}

      {submitted && (
        <div className="lm-pretest-result">
          <div className="lm-pretest-score">
            {correctCount} / {questions.length} correct
          </div>
          <p className="lm-pretest-encouragement">
            {allCorrect
              ? 'Impressive \u2014 you already know some of this!'
              : noneCorrect
                ? 'Perfect \u2014 your brain is now primed to learn this.'
                : 'Good start! Your brain is now primed for learning.'}
          </p>
          <button className="lm-pretest-continue" onClick={onDone}>
            Start learning &#8594;
          </button>
        </div>
      )}
    </div>
  );
}
