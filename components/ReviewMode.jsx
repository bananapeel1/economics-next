"use client";
import { useState, useMemo } from 'react';
import { shuffleAllOptions } from '@/lib/shuffle-options';
import { recordReview } from '@/lib/strength';

/**
 * Get all review schedule entries from localStorage.
 *
 * F074. A schedule entry stores whole question objects, copied at the moment the student finished
 * the section. Entries written from today carry already-shuffled options and are marked
 * `optionsShuffled`; entries written before that hold the original order, where the correct answer
 * is option B 64% of the time. Those are shuffled here on read, so a student who finished a topic
 * last week does not keep meeting the pattern in every review of it.
 *
 * The flag is what stops a new entry being shuffled twice, which would be harmless but would show
 * the same question in a different order from the Quiz tab.
 */
export function getReviewSchedule() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = JSON.parse(localStorage.getItem('revvy_review_schedule') || '[]');
    if (!Array.isArray(raw)) return [];
    // Stamped as it is shuffled. Without the stamp the next read shuffles the already-shuffled
    // copy again, and the order drifts a little further from the Quiz tab at every review.
    return raw.map((entry) =>
      entry && !entry.optionsShuffled && Array.isArray(entry.questions)
        ? { ...entry, questions: shuffleAllOptions(entry.questions), optionsShuffled: true }
        : entry,
    );
  } catch {
    return [];
  }
}

/**
 * Count how many reviews are currently due.
 */
/**
 * Is this entry due?
 *
 * F008. There were two due filters: this one, and the one `getDueReviews` used. I added the
 * retirement rule to only one of them, so the banner counted retired topics and offered a "Review
 * now" button that opened nothing — a dead control, which is worse than the growing number it was
 * meant to fix. One predicate now, used by both.
 */
function isDue(entry, now) {
  return !!entry && !entry.retired && entry.nextDue <= now;
}

export function countDueReviews() {
  const now = Date.now();
  return getReviewSchedule().filter((r) => isDue(r, now)).length;
}

/**
 * Get all due review entries.
 */
export function getDueReviews() {
  // A retired topic is one answered well at every rung of the ladder. It stays in the schedule so
  // its history survives, but it stops counting as due — otherwise the number a student sees only
  // ever grows and stops meaning "these need attention".
  const now = Date.now();
  return getReviewSchedule().filter((r) => isDue(r, now));
}

/**
 * Advance a review entry after completion.
 * >=60% correct: move to next interval. <40%: move back one interval.
 */
function advanceReview(entry, score) {
  // F008: older entries were written with a four-rung ladder that stopped at 14 days. They get the
  // longer one on their next review rather than being stuck at a fortnight for good.
  const intervals = (entry.intervals && entry.intervals.length >= 6) ? entry.intervals : [1, 3, 7, 14, 30, 60];
  let nextIdx = entry.currentInterval;

  if (score >= 0.6) {
    nextIdx = Math.min(nextIdx + 1, intervals.length - 1);
  } else if (score < 0.4) {
    nextIdx = Math.max(nextIdx - 1, 0);
  }
  // 40-60%: stay at same interval

  const nextDays = intervals[nextIdx] || 60;

  /*
   * F008, retirement. Without this, a topic never leaves the schedule: a student who has answered
   * it correctly at every rung is still asked about it every 60 days for as long as they use the
   * product, and the due count they see never reflects what actually needs attention.
   *
   * A topic retires when it reaches the top of the ladder and is still answered well. It comes
   * straight back if a later mixed review goes badly, because `retired` is cleared on any score
   * below the threshold.
   */
  const atTop = nextIdx === intervals.length - 1;
  const retired = atTop && score >= 0.8;

  return {
    ...entry,
    currentInterval: nextIdx,
    /*
     * F008. The question window used to move on `currentInterval`, which is capped at the last
     * interval — so with 15 stored the windows ran 0, 5, 10, then 0 again, and an entry that
     * reached the last interval replayed the same five every fortnight for good. `reviewsDone`
     * only ever counts up, so the window keeps walking whatever the schedule does.
     */
    reviewsDone: (entry.reviewsDone || 0) + 1,
    intervals,
    retired,
    // Written back shuffled, so the next read does not shuffle it a second time.
    optionsShuffled: true,
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
  /*
   * F008. A review used to ask the identical five questions at every interval, frozen at the
   * moment the student finished the section — so a month of spaced repetition rehearsed five of
   * the section's twenty-five and never touched the rest. The window moves along the stored list
   * at each interval, so the second review is not the first one again.
   */
  const questions = useMemo(() => {
    const all = reviewEntry?.questions || [];
    if (all.length <= 5) return all;
    const start = ((reviewEntry?.reviewsDone || 0) * 5) % all.length;
    return [...all.slice(start), ...all.slice(0, start)].slice(0, 5);
  }, [reviewEntry]);
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
        {/*
          * Skip, and it records nothing. Scoring happens only when a review is COMPLETED (the
          * schedule advance and recordReview above), so leaving here does not count as a review:
          * the topic stays due and its strength does not move. The founder, 25 Sep: "i want a
          * clear skip button if i dont want to" — met a review between them and a new topic.
          */}
        <button type="button" className="lm-review-skip" onClick={onFinish} aria-label="Skip this review and go back">
          Skip review
        </button>
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

    /*
     * F008. This fed the strength meter and stopped, so the schedule never learned anything from a
     * mixed review — and that made retirement a one-way door. A retired topic is excluded from the
     * due list, the due list is the only route into the spaced review, and the spaced review was
     * the only thing that could ever clear the flag. Once retired, gone for good, however badly
     * the student went on to do on it.
     *
     * Mixed review already pulls retired topics into its pool. It now writes the result back, so a
     * topic the student has started getting wrong comes back into the schedule on its own.
     * Deliberately only ever brings a topic BACK: a good mixed-review score does not advance the
     * ladder, because ten interleaved questions across several topics is a weaker signal than a
     * focused review of one, and advancing on it would space topics out on thin evidence.
     */
    const schedule = getReviewSchedule();
    let changed = false;
    Object.values(sectionScores).forEach((sec) => {
      const score = sec.total > 0 ? sec.correct / sec.total : 0;
      recordReview(sec.subjectId, sec.sectionId, score);

      const idx = schedule.findIndex(
        (r) => r.sectionId === sec.sectionId && r.subjectId === sec.subjectId,
      );
      if (idx < 0) return;
      const entry = schedule[idx];
      if (score >= 0.6 || !entry.retired) return;

      const intervals = entry.intervals || [1, 3, 7, 14, 30, 60];
      const back = Math.max((entry.currentInterval || 0) - 1, 0);
      schedule[idx] = {
        ...entry,
        retired: false,
        currentInterval: back,
        nextDue: Date.now() + (intervals[back] || 1) * 24 * 60 * 60 * 1000,
        lastScore: score,
      };
      changed = true;
    });
    if (changed) saveSchedule(schedule);
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
        {/*
          * Skip, and it records nothing. Scoring happens only when a review is COMPLETED (the
          * schedule advance and recordReview above), so leaving here does not count as a review:
          * the topic stays due and its strength does not move. The founder, 25 Sep: "i want a
          * clear skip button if i dont want to" — met a review between them and a new topic.
          */}
        <button type="button" className="lm-review-skip" onClick={onFinish} aria-label="Skip this mixed review and go back">
          Skip review
        </button>
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
