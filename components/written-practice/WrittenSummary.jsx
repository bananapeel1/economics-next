'use client';

import AOProfilePanel from '@/components/written-practice/AOProfilePanel';

// Tokens, not literals. The four hues here were picked for a dark card and light mode
// inherited them unchanged; the grade bar sat at roughly 2:1 against a white surface until
// the September 2026 light-mode audit. Each token's DARK value is the literal it replaces
// (#22c55e, #4ade80, #f59e0b, #ef4444), so dark mode is untouched and only light changes.
const GRADE_LABELS = {
  excellent: { label: 'Excellent', color: 'var(--accent-green-bright)' },
  good:      { label: 'Good',      color: 'var(--accent-green-light)' },
  partial:   { label: 'Partial',   color: 'var(--accent-amber)' },
  weak:      { label: 'Needs Work', color: 'var(--accent-red)' },
};

export default function WrittenSummary({ results, aoRunning, subjectSlug, sections, onRestart, onChangeTopics }) {
  const totalMarks = results.reduce((sum, r) => sum + (r.marks || 0), 0);
  const earnedMarks = results.reduce((sum, r) => sum + (r.marksAwarded || 0), 0);
  const scorePct = totalMarks > 0 ? Math.round((earnedMarks / totalMarks) * 100) : 0;
  const uniqueTopics = new Set(results.map(r => r.sectionId)).size;

  // Grade breakdown
  const grades = { excellent: 0, good: 0, partial: 0, weak: 0 };
  results.forEach(r => {
    if (grades[r.grade] !== undefined) grades[r.grade]++;
  });

  // Ring color
  const ringColor = scorePct >= 70 ? 'var(--accent-green-bright)' : scorePct >= 40 ? 'var(--accent-amber)' : 'var(--accent-red)';

  // Motivational message
  let emoji, message;
  if (scorePct >= 80) { emoji = '🎯'; message = 'Outstanding performance!'; }
  else if (scorePct >= 60) { emoji = '✅'; message = 'Solid work — keep going!'; }
  else if (scorePct >= 40) { emoji = '📈'; message = 'Making progress — focus on the gaps.'; }
  else { emoji = '💪'; message = 'Keep practising — you\'ll get there!'; }

  return (
    <div className="spe-summary-card">
      {/* Score ring */}
      <div className="spe-summary-ring-wrap">
        <div
          className="spe-summary-ring"
          style={{
            background: `conic-gradient(${ringColor} ${scorePct * 3.6}deg, var(--border-primary) 0deg)`,
          }}
        >
          <div className="spe-summary-ring-inner">
            <span className="spe-summary-ring-pct">{scorePct}%</span>
            <span className="spe-summary-ring-label">marks earned</span>
          </div>
        </div>
      </div>

      <div className="spe-summary-emoji">{emoji}</div>
      <p className="spe-summary-msg">{message}</p>

      {/* Stat cards */}
      <div className="spe-summary-stats">
        <div className="spe-stat-card" style={{ '--stat-color': 'var(--accent-green-bright)' }}>
          <span className="spe-stat-value">{earnedMarks}</span>
          <span className="spe-stat-label">Earned</span>
        </div>
        <div className="spe-stat-card">
          <span className="spe-stat-value">{totalMarks}</span>
          <span className="spe-stat-label">Available</span>
        </div>
        <div className="spe-stat-card">
          <span className="spe-stat-value">{results.length}</span>
          <span className="spe-stat-label">Answered</span>
        </div>
      </div>

      {/* AO profile. It owns its own fetch, its own loading state and its own error state, and
          renders nothing at all in either — a failing AO query must never cost a student the
          session summary they just earned. Sits above the grade breakdown because the marks
          ring answers "how did I do"; this answers "what keeps happening". */}
      <AOProfilePanel
        variant="summary"
        results={results}
        aoRunning={aoRunning}
        subject={subjectSlug}
      />

      {/* Grade breakdown */}
      <div className="wap-grade-breakdown">
        <h4 className="wap-breakdown-title">Grade breakdown</h4>
        <div className="wap-breakdown-bar">
          {Object.entries(grades).map(([grade, count]) => {
            if (count === 0) return null;
            const pct = (count / results.length) * 100;
            return (
              <div
                key={grade}
                className="wap-breakdown-segment"
                style={{
                  width: `${pct}%`,
                  backgroundColor: GRADE_LABELS[grade]?.color || 'var(--text-muted)',
                }}
                title={`${GRADE_LABELS[grade]?.label}: ${count}`}
              />
            );
          })}
        </div>
        <div className="wap-breakdown-legend">
          {Object.entries(grades).map(([grade, count]) => {
            if (count === 0) return null;
            return (
              <span key={grade} className="wap-legend-item">
                <span className="wap-legend-dot" style={{ backgroundColor: GRADE_LABELS[grade]?.color }} />
                {GRADE_LABELS[grade]?.label} ({count})
              </span>
            );
          })}
        </div>
      </div>

      {/* Topics covered */}
      <p className="spe-summary-topics">{uniqueTopics} topic{uniqueTopics !== 1 ? 's' : ''} covered</p>

      {/* Actions */}
      <div className="spe-summary-actions">
        <button className="spe-btn spe-btn-primary" onClick={onRestart}>Practise again</button>
        <button className="spe-btn spe-btn-secondary" onClick={onChangeTopics}>Change topics</button>
      </div>
    </div>
  );
}
