"use client";
import { useState, useMemo } from 'react';

/**
 * Post-session assessment — re-shows pre-test questions after completing the section.
 * Compares pre-test vs post-test scores to show learning progress.
 */
export default function PostTest({ subjectId, sectionId, onClose }) {
  const [phase, setPhase] = useState('intro'); // 'intro' | 'quiz' | 'result'
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  // Load pre-test data from localStorage
  const pretestData = useMemo(() => {
    if (typeof window === 'undefined') return null;
    try {
      const raw = localStorage.getItem(`revvy_pretest_${subjectId}_${sectionId}`);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }, [subjectId, sectionId]);

  const questions = pretestData?.questions || [];
  const pretestScore = pretestData?.score ?? 0;
  const pretestTotal = pretestData?.total ?? 0;

  if (!questions.length) return null;

  function handleSelect(qIdx, optIdx) {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  }

  function handleSubmit() {
    if (Object.keys(answers).length < questions.length) return;
    setSubmitted(true);
    setPhase('result');
  }

  const postScore = questions.reduce((c, q, i) => c + (answers[i] === q.correctIndex ? 1 : 0), 0);
  const improved = postScore > pretestScore;
  const same = postScore === pretestScore;
  const perfect = postScore === questions.length;

  if (phase === 'intro') {
    return (
      <div className="lm-posttest-container">
        <div className="lm-posttest-intro">
          <div className="lm-posttest-intro-icon">&#128200;</div>
          <h3 className="lm-posttest-intro-title">Test your improvement</h3>
          <p className="lm-posttest-intro-desc">
            Answer the same {questions.length} questions from your pre-test to see how much you&apos;ve learned.
          </p>
          <div className="lm-posttest-intro-pretest">
            Pre-test score: <strong>{pretestScore} / {pretestTotal}</strong>
          </div>
          <button className="lm-posttest-start-btn" onClick={() => setPhase('quiz')}>
            Start post-test &rarr;
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'result') {
    return (
      <div className="lm-posttest-container">
        <div className="lm-posttest-result">
          <div className="lm-posttest-comparison">
            <div className="lm-posttest-score-card lm-posttest-pre">
              <div className="lm-posttest-score-label">Pre-test</div>
              <div className="lm-posttest-score-value">{pretestScore} / {pretestTotal}</div>
            </div>
            <div className="lm-posttest-arrow">&rarr;</div>
            <div className="lm-posttest-score-card lm-posttest-post">
              <div className="lm-posttest-score-label">Post-test</div>
              <div className="lm-posttest-score-value">{postScore} / {questions.length}</div>
            </div>
          </div>
          <p className="lm-posttest-message">
            {perfect
              ? 'Perfect score! You\'ve mastered this topic.'
              : improved
                ? 'Great improvement! Your studying paid off.'
                : same
                  ? 'Same score \u2014 review the areas you found tricky.'
                  : 'Keep practising \u2014 revision is a marathon, not a sprint.'}
          </p>
          <button className="lm-posttest-close-btn" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    );
  }

  // Quiz phase
  return (
    <div className="lm-posttest-container">
      <div className="lm-posttest-header">
        <h3 className="lm-posttest-title">Post-test</h3>
        <p className="lm-posttest-subtitle">Same questions, let&apos;s see how you do now.</p>
      </div>

      {questions.map((q, qIdx) => (
        <div className="lm-pretest-question" key={qIdx}>
          <p className="lm-pretest-q-text">{qIdx + 1}. {q.question}</p>
          <div className="lm-quiz-options">
            {q.options?.map((option, i) => {
              let cls = '';
              if (submitted) {
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

      <button
        className="lm-pretest-submit"
        onClick={handleSubmit}
        disabled={Object.keys(answers).length < questions.length}
      >
        Check my answers
      </button>
    </div>
  );
}
