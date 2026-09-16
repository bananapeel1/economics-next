"use client";
import { useState, useMemo } from 'react';
import { recordPretest } from '@/lib/strength';
import { trackFunnel } from '@/lib/funnel';
import { saveSectionState } from '@/lib/section-state';
import { pickPretestQuestions } from '@/lib/pretest-pool';

/* ── Pre-test Before Learning ── */
export default function PreTest({ quizData, subjectId, sectionId, onDone, reservedQuestions }) {
  /*
   * F079, and V015 which brought it back. The selection lives in lib/pretest-pool.js because
   * LearnModeTab's offer has to promise the same number this renders — it used to say "Three
   * questions" and show two. The rule it encodes: never a question a chapter check-in will ask,
   * and a short pre-test rather than a padded one.
   */
  const questions = useMemo(
    () => pickPretestQuestions(quizData, reservedQuestions),
    [quizData, reservedQuestions],
  );

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  function handleSelect(qIdx, optIdx) {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
    // Auto-scroll to next question on mobile
    if (qIdx < questions.length - 1) {
      setTimeout(() => {
        const nextQ = document.querySelector(`[data-pretest-q="${qIdx + 1}"]`);
        nextQ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 200);
    }
  }

  function handleSubmit() {
    if (Object.keys(answers).length < questions.length) return;
    setSubmitted(true);
    /*
     * F008. This used to reveal the correct answer to all three. The same questions then reappear
     * as the block's quick quiz, in the post-test and in the reviews, so revealing them here hands
     * the student the answers to their own later assessments and makes every improvement score
     * meaningless. The pre-test's job is to prime and to measure, and it can do both with a score.
     *
     * The answers are not withheld for good: the post-test shows them at the end of the section,
     * which is the point at which knowing them is learning rather than leakage.
     */

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

    /*
     * Record that the pre-test was TAKEN, in the modern section-state key and on the server.
     *
     * The legacy `revvy_pretest_*` key above holds the answers, and it was the only record of the
     * choice. `readLocalState` migrates that key only when there is no modern key yet
     * (`lib/section-state.js:27-28`), and a signed-in student always has one, written by
     * LearnModeTab's server reconcile — so to everything that asks the modern way, a student who
     * had taken the pre-test looked like one who had never been offered it. Two consequences, one
     * of them old: V011's re-derived offer put the same three questions back on screen the moment
     * the student returned to step 0, and, since F001/F027, TAKING the pre-test never reached the
     * server at all, so the cross-device promise held for skipping and not for taking. Only
     * `declinePretest` ever sent `pretestState`.
     */
    saveSectionState(subjectId, sectionId, { pretestState: 'taken' });

    // Record to strength meter
    recordPretest(subjectId, sectionId, score);
    trackFunnel('pretest_submitted', { sectionId, score: correct, total: questions.length });
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
              // Only ever the student's own choice. No correct/incorrect colouring here — see
              // handleSubmit for why the answers are not revealed until the post-test.
              const cls = answers[qIdx] === i ? 'selected' : '';
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
          <button className="lm-pretest-skip" onClick={() => {
            // Remember the skip, otherwise the test reappears on every reload of this section.
            if (typeof window !== 'undefined') {
              try {
                localStorage.setItem(`revvy_pretest_${subjectId}_${sectionId}`,
                  JSON.stringify({ completed: false, skipped: true, timestamp: Date.now() }));
              } catch {}
            }
            // Same reason as the submit path: the legacy key alone is invisible to anything that
            // reads the modern one, and this is also how the skip follows the student to another device.
            saveSectionState(subjectId, sectionId, { pretestState: 'skipped' });
            trackFunnel('pretest_skipped', { sectionId });
            onDone?.();
          }}>
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
                ? 'Nothing wrong with 0 \u2014 this is exactly what the next steps teach.'
                : 'Good start! Your brain is now primed for learning.'}
          </p>
          {/* F008: said plainly, so withholding the answers does not read as a bug. */}
          <p className="lm-pretest-note">
            Answers are held back until the end, so the same questions can still test you later.
          </p>
          <button className="lm-pretest-continue" onClick={onDone}>
            Start learning &#8594;
          </button>
        </div>
      )}
    </div>
  );
}
