"use client";

/* ── Session Summary / Results Screen for Smart Practice Engine ── */
export default function SessionSummary({ results, sections, onRestart }) {
  const totalQuestions = results.length;
  const totalCorrect = results.filter(r => r.correct).length;
  const accuracyPct = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  // Build a lookup for section titles
  const sectionMap = {};
  sections.forEach(s => {
    sectionMap[s.id] = s.title || s.name || s.id;
  });

  // Breakdown by section
  const sectionGroups = {};
  results.forEach(r => {
    if (!sectionGroups[r.sectionId]) {
      sectionGroups[r.sectionId] = { correct: 0, total: 0 };
    }
    sectionGroups[r.sectionId].total += 1;
    if (r.correct) sectionGroups[r.sectionId].correct += 1;
  });

  const breakdown = Object.entries(sectionGroups).map(([sectionId, data]) => ({
    sectionId,
    name: sectionMap[sectionId] || sectionId,
    correct: data.correct,
    total: data.total,
    pct: Math.round((data.correct / data.total) * 100),
  }));

  // Sort breakdown by accuracy ascending so weakest are first for the weakest list
  const sortedByAccuracy = [...breakdown].sort((a, b) => a.pct - b.pct);

  // Weakest sections: bottom 3 by accuracy
  const weakest = sortedByAccuracy.slice(0, 3).filter(s => s.pct < 100);

  // Color logic
  function getColor(pct) {
    if (pct >= 80) return 'var(--accent-green)';
    if (pct >= 50) return 'var(--accent-amber, #f59e0b)';
    return 'var(--accent-red, #ef4444)';
  }

  // Overall message
  function getMessage(pct) {
    if (pct >= 90) return 'Outstanding! You really know your stuff.';
    if (pct >= 80) return 'Great job! Just a few areas to tighten up.';
    if (pct >= 60) return 'Solid effort! Review the topics below to improve.';
    if (pct >= 40) return 'Good start. Focus on the weaker areas and try again.';
    return 'Keep going! Review the material and practice again.';
  }

  return (
    <div className="spe-summary">
      <div className="spe-summary-header">
        <div className="spe-summary-score">{totalCorrect}/{totalQuestions}</div>
        <div className="spe-summary-pct" style={{ color: getColor(accuracyPct) }}>
          {accuracyPct}%
        </div>
        <div className="spe-summary-message">{getMessage(accuracyPct)}</div>
      </div>

      <div className="spe-summary-breakdown">
        <h3>Score by Topic</h3>
        {breakdown.map(row => (
          <div className="spe-breakdown-row" key={row.sectionId}>
            <div className="spe-breakdown-name">{row.name}</div>
            <div className="spe-breakdown-bar">
              <div
                className="spe-breakdown-fill"
                style={{ width: `${row.pct}%`, background: getColor(row.pct) }}
              />
            </div>
            <div className="spe-breakdown-score" style={{ color: getColor(row.pct) }}>
              {row.correct}/{row.total}
            </div>
          </div>
        ))}
      </div>

      {weakest.length > 0 && (
        <div className="spe-weakest">
          <h3>Areas to Review</h3>
          {weakest.map(w => (
            <div className="spe-weakest-item" key={w.sectionId}>
              {w.name} &mdash; {w.pct}%
            </div>
          ))}
        </div>
      )}

      <div className="spe-summary-actions">
        <button className="spe-restart-btn" onClick={onRestart}>Practice Again</button>
        <a href="/" className="spe-home-link">Back to App</a>
      </div>
    </div>
  );
}
