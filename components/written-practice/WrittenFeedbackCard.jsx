'use client';

const GRADE_CONFIG = {
  excellent: { icon: '🎯', label: 'Excellent', colorClass: 'wap-grade-excellent' },
  good:      { icon: '✅', label: 'Good',      colorClass: 'wap-grade-good' },
  partial:   { icon: '⚠️',  label: 'Partial',   colorClass: 'wap-grade-partial' },
  weak:      { icon: '📚', label: 'Needs Work', colorClass: 'wap-grade-weak' },
};

export default function WrittenFeedbackCard({ feedback, guidance, marks, onNext }) {
  const grade = GRADE_CONFIG[feedback.grade] || GRADE_CONFIG.partial;

  return (
    <div className="wap-feedback">
      {/* Grade header */}
      <div className={`wap-feedback-header ${grade.colorClass}`}>
        <span className="wap-grade-icon">{grade.icon}</span>
        <div className="wap-grade-info">
          <span className="wap-grade-label">{grade.label}</span>
          <span className="wap-grade-marks">{feedback.marksSuggested} / {marks} marks</span>
        </div>
      </div>

      {/* Feedback text */}
      <p className="wap-feedback-text">{feedback.feedback}</p>

      {/* Strengths */}
      {feedback.strengths?.length > 0 && (
        <div className="wap-feedback-section">
          <h4 className="wap-section-title wap-section-green">Strengths</h4>
          <ul className="wap-feedback-list">
            {feedback.strengths.map((s, i) => (
              <li key={i} className="wap-feedback-item wap-item-green">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Gaps */}
      {feedback.gaps?.length > 0 && (
        <div className="wap-feedback-section">
          <h4 className="wap-section-title wap-section-amber">Gaps to address</h4>
          <ul className="wap-feedback-list">
            {feedback.gaps.map((g, i) => (
              <li key={i} className="wap-feedback-item wap-item-amber">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {g}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Improvement tip */}
      {feedback.improvementTip && (
        <div className="wap-improvement-tip">
          <span className="wap-tip-icon">💡</span>
          <p>{feedback.improvementTip}</p>
        </div>
      )}

      {/* Model answer expandable */}
      {guidance && (
        <details className="wap-model-answer">
          <summary className="wap-model-answer-toggle">View Mark Scheme Guidance</summary>
          <div className="wap-model-answer-content">
            <p>{guidance}</p>
          </div>
        </details>
      )}

      {/* Next button */}
      <button className="wap-next-btn" onClick={onNext}>
        Next Question →
      </button>
    </div>
  );
}
