'use client';

const GRADE_LABELS = {
  excellent: { label: 'Excellent', color: '#22c55e' },
  good:      { label: 'Good',      color: '#4ade80' },
  partial:   { label: 'Partial',   color: '#f59e0b' },
  weak:      { label: 'Needs Work', color: '#ef4444' },
};

export default function WrittenSummary({ results, sections, onRestart, onChangeTopics }) {
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
  const ringColor = scorePct >= 70 ? '#22c55e' : scorePct >= 40 ? '#f59e0b' : '#ef4444';

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
        <div className="spe-stat-card" style={{ '--stat-color': '#22c55e' }}>
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
                  backgroundColor: GRADE_LABELS[grade]?.color || '#6b7280',
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
