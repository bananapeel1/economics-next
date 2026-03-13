"use client";
import { useState } from 'react';

const MARK_COLORS = {
  4: { bg: 'var(--practice-4-bg)', border: 'var(--practice-4-border)', badge: 'var(--practice-4-badge)' },
  6: { bg: 'var(--practice-6-bg)', border: 'var(--practice-6-border)', badge: 'var(--practice-6-badge)' },
  10: { bg: 'var(--practice-10-bg)', border: 'var(--practice-10-border)', badge: 'var(--practice-10-badge)' },
  20: { bg: 'var(--practice-20-bg)', border: 'var(--practice-20-border)', badge: 'var(--practice-20-badge)' },
};

const MARK_FILTERS = [
  { value: 'all', label: 'All Questions' },
  { value: 4, label: '4 Marks' },
  { value: 6, label: '6 Marks' },
  { value: 10, label: '10 Marks' },
  { value: 20, label: '20 Marks' },
];

export default function PracticeQuestionsTab({ questions = [], onAskTutor }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedIds, setExpandedIds] = useState(new Set());

  if (!questions.length) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: 'var(--text-primary)' }}>No Practice Questions Yet</div>
        <div style={{ fontSize: 14 }}>Practice questions for this section are coming soon.</div>
      </div>
    );
  }

  const filtered = activeFilter === 'all'
    ? questions
    : questions.filter(q => q.marks === activeFilter);

  function toggleGuidance(index) {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  // Count questions by marks for the filter badges
  const counts = {};
  questions.forEach(q => {
    counts[q.marks] = (counts[q.marks] || 0) + 1;
  });

  return (
    <div className="practice-tab">
      <div className="practice-header">
        <h2 className="practice-title">Practice Questions</h2>
        <p className="practice-subtitle">
          Exam-style questions to test your understanding. Click &quot;Show Guidance&quot; to see model answer structures.
        </p>
      </div>

      <div className="practice-filters">
        {MARK_FILTERS.map(f => {
          const count = f.value === 'all' ? questions.length : (counts[f.value] || 0);
          if (f.value !== 'all' && count === 0) return null;
          return (
            <button
              key={f.value}
              className={`practice-filter-btn ${activeFilter === f.value ? 'active' : ''}`}
              onClick={() => setActiveFilter(f.value)}
            >
              {f.label}
              <span className="practice-filter-count">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="practice-questions-list">
        {filtered.map((q, i) => {
          const colors = MARK_COLORS[q.marks] || MARK_COLORS[4];
          const isExpanded = expandedIds.has(i);
          const globalIndex = questions.indexOf(q);

          return (
            <div
              key={globalIndex}
              className="practice-question-card"
              style={{ '--card-bg': colors.bg, '--card-border': colors.border }}
            >
              <div className="practice-question-top">
                <span
                  className="practice-marks-badge"
                  style={{ backgroundColor: colors.badge }}
                >
                  {q.marks} marks
                </span>
                {q.command && (
                  <span className="practice-command-badge">
                    {q.command}
                  </span>
                )}
              </div>

              <p className="practice-question-text">{q.question}</p>

              <button
                className={`practice-guidance-toggle ${isExpanded ? 'expanded' : ''}`}
                onClick={() => toggleGuidance(i)}
              >
                <span className="practice-guidance-icon">{isExpanded ? '▼' : '▶'}</span>
                {isExpanded ? 'Hide Guidance' : 'Show Guidance'}
              </button>

              {isExpanded && (
                <div className="practice-guidance">
                  <div className="practice-guidance-label">Model Answer Guidance</div>
                  <div className="practice-guidance-text">
                    {q.guidance.split('\n').map((line, li) => (
                      <p key={li}>{line}</p>
                    ))}
                  </div>
                  {onAskTutor && (
                    <button
                      className="practice-model-answer-btn"
                      onClick={() => onAskTutor(
                        `Write a full model answer for this ${q.marks}-mark exam question that would achieve full marks:\n\n**Question (${q.marks} marks):** ${q.question}${q.command ? `\n**Command word:** ${q.command}` : ''}\n\nPlease structure the answer exactly as an examiner would expect, include all key points needed for full marks, and explain how each point earns marks. Use relevant economic/business terminology and, where appropriate, include diagram references.`
                      )}
                    >
                      🤖 Get Full Model Answer from Tutor
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
