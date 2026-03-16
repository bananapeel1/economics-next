"use client";
import { useState } from 'react';
import StrengthMeter from '../StrengthMeter';
import PostTest from './PostTest';
import QuickFireDrill from './QuickFireDrill';

/* ── Completion Screen ── */
export default function CompletionScreen({
  subjectId, sectionId, currentSection,
  contentData, quizData,
  onNavigateToQuiz, onNavigateToTab,
  onStartMixedReview,
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
      <button className="lm-complete-explore-btn" onClick={() => onNavigateToTab?.('content')}>
        Explore this topic
      </button>
      <p className="lm-complete-or">or choose another topic</p>
    </div>
  );
}
