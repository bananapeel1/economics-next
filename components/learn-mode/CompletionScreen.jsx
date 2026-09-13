"use client";
import { useState } from 'react';
import { useClientValue } from '@/lib/use-client-storage';
import { readAnswerLog } from '@/lib/answer-log';
import StrengthMeter from '../StrengthMeter';
import PostTest from './PostTest';
import QuickFireDrill from './QuickFireDrill';
import { recordReview } from '@/lib/strength';
import { saveSectionState } from '@/lib/section-state';

function ScoreRow({ label, emoji, score }) {
  const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
  return (
    <div className="lm-score-row">
      <div className="lm-score-row-header">
        <span className="lm-score-row-emoji">{emoji}</span>
        <span className="lm-score-row-label">{label}</span>
        <span className="lm-score-row-value">{score.correct}/{score.total}</span>
      </div>
      <div className="lm-score-bar-track">
        <div className="lm-score-bar-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/* ── Completion Screen ── */
export default function CompletionScreen({
  subjectId, sectionId, currentSection,
  contentData, quizData, scores,
  onNavigateToQuiz, onNavigateToTab,
  onStartMixedReview, onRetry,
}) {
  const [completeView, setCompleteView] = useState('main'); // 'main' | 'posttest' | 'drill'

  /**
   * F005. The post-test and the Quick Fire drill both discarded their result. They are the last
   * two things a student does in a section and the strongest evidence available that the topic
   * stuck, and neither touched the strength meter or the review schedule. A student who aced the
   * drill was scheduled identically to one who skipped it.
   *
   * Score arrives as 0..1. It feeds the strength model's accuracy input, and a strong result
   * counts as a review, which is what pushes the next due date out.
   */
  function handleDrillScore(score) {
    if (typeof score !== 'number' || Number.isNaN(score)) return;
    recordReview(subjectId, sectionId, score);
    saveSectionState(subjectId, sectionId, { quizAccuracy: score, reviewed: score >= 0.6 });
  }

  // Count completed sections for mixed review eligibility
  // F118: both of these read localStorage in the render body, so they are read after hydration now.
  const [completedCount] = useClientValue(
    () => JSON.parse(localStorage.getItem('revvy_review_schedule') || '[]').length,
    0,
    [],
  );

  /*
   * Whether there is a post-test to offer.
   *
   * F017: this used to require pre-test data, so the post-test button was hidden from every
   * student who skipped the pre-test — which is most of them, and exactly the students whose
   * wrong answers had nowhere to reappear. The fallback post-test asks what they got wrong, so
   * having logged a wrong answer also earns the button.
   */
  const [hasPostTest] = useClientValue(
    () => {
      const pre = JSON.parse(localStorage.getItem(`revvy_pretest_${subjectId}_${sectionId}`) || '{}');
      if (pre.questions?.length > 0) return true;
      return quizData?.length > 0 && readAnswerLog(subjectId, sectionId).some((e) => e.correct === false);
    },
    false,
    [subjectId, sectionId, quizData],
  );

  // Post-test sub-view
  if (completeView === 'posttest') {
    return (
      <div className="lm-complete-screen">
        {/* F005: both of these threw their score away. A strong post-test is the best evidence
            in the whole session that the topic stuck, and it fed neither the strength meter nor
            the review schedule. */}
        <PostTest
          subjectId={subjectId}
          sectionId={sectionId}
          quizData={quizData}
          onScore={handleDrillScore}
          onClose={() => setCompleteView('main')}
        />
      </div>
    );
  }

  // Quick fire drill sub-view
  if (completeView === 'drill') {
    return (
      <div className="lm-complete-screen">
        <QuickFireDrill
          subjectId={subjectId}
          sectionId={sectionId}
          quizData={quizData}
          onScore={handleDrillScore}
          onClose={() => setCompleteView('main')}
        />
      </div>
    );
  }

  return (
    <div className="lm-complete-screen">
      <div className="lm-complete-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="16 8 10 16 7 13" />
        </svg>
      </div>
      <h2 className="lm-complete-title">Topic complete</h2>
      <p className="lm-complete-topic">{currentSection?.title}</p>

      {/* Strength meter */}
      <StrengthMeter subjectId={subjectId} sectionId={sectionId} size="medium" />

      {/* Score breakdown */}
      {scores && (scores.quiz.total > 0 || scores.recall.total > 0 || scores.explain.total > 0) && (
        <div className="lm-score-breakdown">
          <h3 className="lm-score-breakdown-title">Score Breakdown</h3>
          {/* No weight labels. The 50/30/20 percentages named a composite score that was never
              computed anywhere, and the Explain row used `total || 1`, so every completion screen
              read "0/1" even for a student who never opened the box. Packet 9, finding F003.
              Each row now shows only what was actually measured, and a row with nothing measured
              is not shown at all. */}
          {scores.quiz.total > 0 && (
            <ScoreRow label="Quiz" emoji="&#128161;" score={scores.quiz} />
          )}
          {scores.recall.total > 0 && (
            <ScoreRow label="Recall" emoji="&#129504;" score={scores.recall} />
          )}
          {scores.explain.total > 0 && (
            <ScoreRow label="Explain It Back" emoji="&#128172;"
              score={{ correct: scores.explain.attempts, total: scores.explain.total }} />
          )}

          {/* F006: the weakest area, only when there is enough evidence to name one.
              This fired whenever `quiz.correct < quiz.total`, so one wrong answer out of one
              produced "Quiz questions need attention" on a completion screen — a verdict on a
              single data point, delivered at the moment the student had just finished. It also
              only ever accused the quiz, even when recall was the worse of the two.
              Three answers minimum, below 70%, and it names whichever measured area is actually
              weakest. */}
          {(() => {
            const MIN_ANSWERS = 3;
            const WEAK_BELOW = 0.7;
            const areas = [
              { key: 'quiz', label: 'Quiz questions', advice: 'try the Quiz tab for more practice', s: scores.quiz },
              { key: 'recall', label: 'The recall exercises', advice: 'work back through the topic and try them again', s: scores.recall },
            ]
              .filter((a) => a.s && a.s.total >= MIN_ANSWERS && a.s.correct / a.s.total < WEAK_BELOW)
              .sort((a, b) => a.s.correct / a.s.total - b.s.correct / b.s.total);
            if (!areas.length) return null;
            const worst = areas[0];
            return (
              <div className="lm-weakest-area">
                <span className="lm-weakest-icon" aria-hidden="true">&#9888;</span>
                <span>
                  {worst.label} need attention — you got {worst.s.correct} of {worst.s.total}. {worst.advice}.
                </span>
              </div>
            );
          })()}
        </div>
      )}

      <div className="lm-complete-divider" />
      <div className="lm-complete-summary">
        <h3 className="lm-complete-summary-title">What you covered</h3>
        <ul className="lm-complete-summary-list">
          {contentData.map((block, i) => (
            <li key={i}>{block.title || `Section ${i + 1}`}</li>
          ))}
        </ul>
      </div>

      {/* Post-test: re-test pre-test questions */}
      {hasPostTest && (
        <button className="lm-complete-posttest-btn" onClick={() => setCompleteView('posttest')}>
          &#128200; Test your improvement
        </button>
      )}

      {/* Quick fire drill */}
      {quizData?.length > 0 && (
        <button className="lm-complete-drill-btn" onClick={() => setCompleteView('drill')}>
          &#9889; Quick fire drill ({quizData.length} questions)
        </button>
      )}

      <button className="lm-complete-quiz-btn" onClick={onNavigateToQuiz}>
        Try the quiz &rarr;
      </button>

      {/* Practice what you learned — links to Smart Practice / Flashcards */}
      <div className="lm-complete-practice-row">
        {/* F080: a student who finishes here has met about five of this topic's questions. The
            rest are only reachable through Smart Practice, so this arrives with the topic already
            chosen and says how many are waiting, rather than dropping them on a list of 43. */}
        <a href={`/practice?section=${encodeURIComponent(sectionId)}`} className="lm-complete-practice-btn">
          &#9889; {quizData?.length ? `Practise all ${quizData.length} questions on this topic` : 'Practice questions'}
        </a>
        <a href="/flashcards-practice" className="lm-complete-practice-btn lm-complete-flashcard-btn">
          &#127183; Review flashcards
        </a>
      </div>

      {completedCount >= 3 && onStartMixedReview && (
        <button className="lm-complete-mixed-btn" onClick={onStartMixedReview}>
          Mixed review ({completedCount} topics) &#8644;
        </button>
      )}
      {onRetry && (
        <button className="lm-complete-retry-btn" onClick={onRetry}>
          &#128260; Retry this topic
        </button>
      )}
      <button className="lm-complete-explore-btn" onClick={() => onNavigateToTab?.('content')}>
        Explore this topic
      </button>
      <p className="lm-complete-or">or choose another topic</p>
    </div>
  );
}
