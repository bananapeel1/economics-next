"use client";
import { useState } from 'react';
import StrengthMeter from '../StrengthMeter';
import PostTest from './PostTest';
import QuickFireDrill from './QuickFireDrill';

function ScoreRow({ label, emoji, score, weight }) {
  const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
  return (
    <div className="lm-score-row">
      <div className="lm-score-row-header">
        <span className="lm-score-row-emoji">{emoji}</span>
        <span className="lm-score-row-label">{label}</span>
        <span className="lm-score-row-value">{score.correct}/{score.total}</span>
        <span className="lm-score-row-weight">{weight}</span>
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

  // Count completed sections for mixed review eligibility
  let completedCount = 0;
  if (typeof window !== 'undefined') {
    try {
      const schedule = JSON.parse(localStorage.getItem('revvy_review_schedule') || '[]');
      completedCount = schedule.length;
    } catch {}
  }

  // Check if pre-test data exists for post-test
  const hasPretestData = typeof window !== 'undefined' &&
    (() => { try { const d = JSON.parse(localStorage.getItem(`revvy_pretest_${subjectId}_${sectionId}`) || '{}'); return d.questions?.length > 0; } catch { return false; } })();

  // Post-test sub-view
  if (completeView === 'posttest') {
    return (
      <div className="lm-complete-screen">
        <PostTest
          subjectId={subjectId}
          sectionId={sectionId}
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
          quizData={quizData}
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
      {scores && (scores.quiz.total > 0 || scores.recall.total > 0) && (
        <div className="lm-score-breakdown">
          <h3 className="lm-score-breakdown-title">Score Breakdown</h3>
          <ScoreRow label="Quiz" emoji="&#128161;" score={scores.quiz} weight="50%" />
          <ScoreRow label="Recall" emoji="&#129504;" score={scores.recall} weight="30%" />
          <ScoreRow label="Explain It Back" emoji="&#128172;" score={{ correct: scores.explain.attempts, total: scores.explain.total || 1 }} weight="20%" />

          {/* Weakest area callout */}
          {scores.quiz.total > 0 && scores.quiz.correct < scores.quiz.total && (
            <div className="lm-weakest-area">
              <span className="lm-weakest-icon">&#9888;</span>
              <span>Quiz questions need attention — try the quiz tab for more practice</span>
            </div>
          )}
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
      {hasPretestData && (
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
