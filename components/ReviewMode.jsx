"use client";
import { useState, useMemo } from 'react';
import { recordReview } from '@/lib/strength';

/**
 * Get all review schedule entries from localStorage.
 */
export function getReviewSchedule() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('revvy_review_schedule') || '[]');
  } catch {
    return [];
  }
}

/**
 * Count how many reviews are currently due.
 */
export function countDueReviews() {
  const schedule = getReviewSchedule();
  const now = Date.now();
  return schedule.filter(r => r.nextDue <= now).length;
}

/**
 * Get all due review entries.
 */
export function getDueReviews() {
  const schedule = getReviewSchedule();
  const now = Date.now();
  return schedule.filter(r => r.nextDue <= now);
}

/**
 * Advance a review entry after completion.
 * >=60% correct: move to next interval. <40%: move back one interval.
 */
function advanceReview(entry, score) {
  const intervals = entry.intervals || [1, 3, 7, 14];
  let nextIdx = entry.currentInterval;

  if (score >= 0.6) {
    nextIdx = Math.min(nextIdx + 1, intervals.length - 1);
  } else if (score < 0.4) {
    nextIdx = Math.max(nextIdx - 1, 0);
  }
  // 40-60%: stay at same interval

  const nextDays = intervals[nextIdx] || 14;

  return {
    ...entry,
    currentInterval: nextIdx,
    nextDue: Date.now() + nextDays * 24 * 60 * 60 * 1000,
    lastScore: score,
  };
}

/**
 * Save updated review schedule to localStorage.
 */
function saveSchedule(schedule) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('revvy_review_schedule', JSON.stringify(schedule));
  } catch {}
}

/* ── Spaced Review Component ── */
export function SpacedReview({ reviewEntry, onFinish }) {
  const questions = reviewEntry?.questions || [];
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  function handleSelect(qIdx, optIdx) {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  }

  function handleSubmit() {
    if (Object.keys(answers).length < questions.length) return;
    setSubmitted(true);

    // Calculate score
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) correct++;
    });
    const score = questions.length > 0 ? correct / questions.length : 0;

    // Advance review schedule
    const schedule = getReviewSchedule();
    const idx = schedule.findIndex(
      r => r.sectionId === reviewEntry.sectionId && r.subjectId === reviewEntry.subjectId
    );
    if (idx >= 0) {
      schedule[idx] = advanceReview(schedule[idx], score);
      saveSchedule(schedule);
    }

    // Update strength meter
    recordReview(reviewEntry.subjectId, reviewEntry.sectionId, score);
  }

  const correctCount = questions.reduce((c, q, i) => c + (answers[i] === q.correctIndex ? 1 : 0), 0);

  return (
    <div className="lm-review-container">
      <div className="lm-review-header">
        <h2 className="lm-review-title">&#128337; Spaced Review</h2>
        <p className="lm-review-subtitle">{reviewEntry.title}</p>
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
          {submitted && q.explanation && (
            <div className="lm-quiz-explanation">
              <strong>{answers[qIdx] === q.correctIndex ? 'Correct!' : 'Not quite.'}</strong>{' '}
              {q.explanation}
            </div>
          )}
        </div>
      ))}

      {!submitted && (
        <button
          className="lm-pretest-submit"
          onClick={handleSubmit}
          disabled={Object.keys(answers).length < questions.length}
        >
          Submit answers
        </button>
      )}

      {submitted && (
        <div className="lm-pretest-result">
          <div className="lm-pretest-score">
            {correctCount} / {questions.length} correct
          </div>
          <p className="lm-pretest-encouragement">
            {correctCount === questions.length
              ? 'Perfect recall! Your memory is strong.'
              : correctCount >= Math.ceil(questions.length * 0.6)
                ? 'Good recall! Review scheduled further out.'
                : 'Keep practicing \u2014 next review coming soon.'}
          </p>
          <button className="lm-pretest-continue" onClick={onFinish}>
            Back to learning &#8594;
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Mixed (Interleaved) Review Component ── */
export function MixedReview({ onFinish }) {
  const allQuestions = useMemo(() => {
    const schedule = getReviewSchedule();
    const pool = [];
    schedule.forEach(entry => {
      (entry.questions || []).forEach(q => {
        pool.push({ ...q, sectionTitle: entry.title, sectionId: entry.sectionId, subjectId: entry.subjectId });
      });
    });
    // Shuffle and take up to 10
    const shuffled = pool.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(10, shuffled.length));
  }, []);

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  function handleSelect(qIdx, optIdx) {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  }

  function handleSubmit() {
    if (Object.keys(answers).length < allQuestions.length) return;
    setSubmitted(true);

    // Record review per section
    const sectionScores = {};
    allQuestions.forEach((q, i) => {
      const key = `${q.subjectId}_${q.sectionId}`;
      if (!sectionScores[key]) sectionScores[key] = { correct: 0, total: 0, subjectId: q.subjectId, sectionId: q.sectionId };
      sectionScores[key].total++;
      if (answers[i] === q.correctIndex) sectionScores[key].correct++;
    });

    Object.values(sectionScores).forEach(s => {
      recordReview(s.subjectId, s.sectionId, s.total > 0 ? s.correct / s.total : 0);
    });
  }

  const correctCount = allQuestions.reduce((c, q, i) => c + (answers[i] === q.correctIndex ? 1 : 0), 0);

  if (!allQuestions.length) {
    return (
      <div className="lm-review-container">
        <p style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>No questions available for mixed review yet.</p>
        <button className="lm-pretest-continue" onClick={onFinish}>Back &#8594;</button>
      </div>
    );
  }

  return (
    <div className="lm-review-container">
      <div className="lm-review-header">
        <h2 className="lm-review-title">&#128256; Mixed Review</h2>
        <p className="lm-review-subtitle">Questions from multiple topics, shuffled</p>
      </div>

      {allQuestions.map((q, qIdx) => (
        <div className="lm-pretest-question" key={qIdx}>
          <div className="lm-review-section-tag">{q.sectionTitle}</div>
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
          {submitted && q.explanation && (
            <div className="lm-quiz-explanation">
              <strong>{answers[qIdx] === q.correctIndex ? 'Correct!' : 'Not quite.'}</strong>{' '}
              {q.explanation}
            </div>
          )}
        </div>
      ))}

      {!submitted && (
        <button
          className="lm-pretest-submit"
          onClick={handleSubmit}
          disabled={Object.keys(answers).length < allQuestions.length}
        >
          Submit answers
        </button>
      )}

      {submitted && (
        <div className="lm-pretest-result">
          <div className="lm-pretest-score">
            {correctCount} / {allQuestions.length} correct
          </div>
          <p className="lm-pretest-encouragement">
            {correctCount === allQuestions.length
              ? 'Outstanding! You nailed every topic.'
              : correctCount >= Math.ceil(allQuestions.length * 0.7)
                ? 'Strong performance across topics!'
                : 'Good effort \u2014 interleaved practice builds lasting knowledge.'}
          </p>
          <button className="lm-pretest-continue" onClick={onFinish}>
            Back to learning &#8594;
          </button>
        </div>
      )}
    </div>
  );
}
