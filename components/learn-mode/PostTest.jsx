"use client";
import { useState, useMemo, useRef, useEffect } from 'react';
import { readAnswerLog, orderByPriority } from '@/lib/answer-log';
import { shuffleOptions } from '@/lib/shuffle-options';

/**
 * Post-session assessment — re-shows pre-test questions after completing the section.
 * Compares pre-test vs post-test scores to show learning progress.
 */
export default function PostTest({ subjectId, sectionId, onClose, onScore, quizData }) {
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

  /*
   * F017. A student who skipped the pre-test got no post-test at all — this returned null — so
   * the section ended with nothing checking whether any of it stuck, and the questions they had
   * just got wrong in the inline quizzes were never asked again.
   *
   * The pre-test comparison is left exactly as it was when there is one: it must ask the same
   * questions or the before-and-after number means nothing. The fallback only fills the case
   * where there is nothing to compare against, and it asks what they got wrong.
   */
  const fallback = useMemo(() => {
    if (pretestData?.questions?.length) return [];
    if (!quizData?.length) return [];
    const log = readAnswerLog(subjectId, sectionId);
    if (!log.some((e) => e.correct === false)) return [];
    return orderByPriority(quizData, log).slice(0, 5);
  }, [pretestData, quizData, subjectId, sectionId]);

  /*
   * F079. The post-test replayed the pre-test verbatim: same three stems, same order, and the same
   * option order. "It was the second one" is then a perfectly good way to score full marks, and the
   * before-and-after number measures recall of a position rather than of any economics.
   *
   * Same questions, different option order. The stems have to match or the comparison is not a
   * comparison, but nothing requires the options to sit where they sat an hour ago. A different
   * salt gives each question a different arrangement from the one the pre-test showed, and it is
   * still deterministic, so re-rendering does not move the answer under the student.
   *
   * The student's own pre-test choice is carried across to wherever that option now sits, so the
   * stored record still says which option they picked rather than which slot.
   */
  const questions = useMemo(() => {
    const base = pretestData?.questions?.length ? pretestData.questions : fallback;
    return base.map((q) => {
      /*
       * The post-test's order must DIFFER from the pre-test's, not merely be shuffled again. An
       * independent shuffle lands on the same arrangement about one time in twenty-four, which
       * across a three-question pre-test is roughly a one-in-five chance that at least one question
       * looks untouched — and "it was the second one" works again for that question. Salts are
       * tried until the order actually moves.
       */
      let moved = q;
      for (let attempt = 0; attempt < 8; attempt += 1) {
        moved = shuffleOptions(q, `post-test${attempt || ''}`);
        if (moved === q) break; // declined, and a declined question is left alone on purpose
        if (JSON.stringify(moved.options) !== JSON.stringify(q.options)) break;
      }
      if (moved === q || typeof q.userAnswer !== 'number') return moved;
      const chosen = q.options?.[q.userAnswer];
      const at = moved.options?.indexOf(chosen);
      return { ...moved, userAnswer: at >= 0 ? at : q.userAnswer };
    });
  }, [pretestData, fallback]);

  const isComparison = !!pretestData?.questions?.length;
  const pretestScore = pretestData?.score ?? 0;
  const pretestTotal = pretestData?.total ?? 0;

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

  // F005: the post-test's whole purpose is to show the topic stuck, and its result was discarded.
  // Reported once, as a 0..1 proportion, so it reaches the strength meter and the schedule.
  const reportedRef = useRef(false);
  useEffect(() => {
    if (reportedRef.current || !submitted || !questions.length) return;
    reportedRef.current = true;
    onScore?.(postScore / questions.length);
  }, [submitted, postScore, questions.length, onScore]);
  /*
   * Every hook is above this line. It used to sit before the two below, and before packet 8 that
   * was safe because `questions` came from a memo on the ids alone and its length could not change
   * mid-mount. The fallback made it depend on a prop and on the answer log, so the hook count could
   * go up between renders and React would throw. Not reachable today, because the button that
   * mounts this is gated on the same data — which is exactly the kind of luck that stops being
   * true after one unrelated edit.
   */
  if (!questions.length) return null;

  const improved = postScore > pretestScore;
  const same = postScore === pretestScore;
  const perfect = postScore === questions.length;

  if (phase === 'intro') {
    return (
      <div className="lm-posttest-container">
        <div className="lm-posttest-intro">
          <div className="lm-posttest-intro-icon">&#128200;</div>
          <h3 className="lm-posttest-intro-title">
            {isComparison ? 'Test your improvement' : 'The ones you got wrong'}
          </h3>
          <p className="lm-posttest-intro-desc">
            {isComparison
              ? `Answer the same ${questions.length} questions from your pre-test to see how much you have learned.`
              : `You did not take the pre-test, so there is nothing to compare against. These are the ${questions.length} questions you got wrong on the way through.`}
          </p>
          {isComparison && (
            <div className="lm-posttest-intro-pretest">
              Pre-test score: <strong>{pretestScore} / {pretestTotal}</strong>
            </div>
          )}
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
            {isComparison && (
              <>
                <div className="lm-posttest-score-card lm-posttest-pre">
                  <div className="lm-posttest-score-label">Pre-test</div>
                  <div className="lm-posttest-score-value">{pretestScore} / {pretestTotal}</div>
                </div>
                <div className="lm-posttest-arrow">&rarr;</div>
              </>
            )}
            <div className="lm-posttest-score-card lm-posttest-post">
              <div className="lm-posttest-score-label">{isComparison ? 'Post-test' : 'Second attempt'}</div>
              <div className="lm-posttest-score-value">{postScore} / {questions.length}</div>
            </div>
          </div>
          <p className="lm-posttest-message">
            {/* Without a pre-test there is no improvement to claim, so it does not claim one. */}
            {!isComparison
              ? (perfect
                  ? 'All of them, second time round. Those are the ones you had wrong.'
                  : `You got ${postScore} of the ${questions.length} you had wrong. The rest are worth another look.`)
              : perfect
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
