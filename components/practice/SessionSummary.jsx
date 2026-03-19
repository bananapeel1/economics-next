"use client";

/* ── Session Summary — Smart Practice Engine ── */
export default function SessionSummary({ results, sections, totalQuestions, onRestart, onChangeTopics }) {
  const totalAnswered = results.length;
  const totalCorrect = results.filter(r => r.correct).length;
  const totalRetried = results.filter(r => !r.correct).length;
  const accuracyPct = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const uniqueTopics = new Set(results.map(r => r.sectionId)).size;

  // Emoji + message based on accuracy
  let emoji, message;
  if (accuracyPct >= 90) { emoji = '\uD83C\uDFAF'; message = 'Amazing!'; }
  else if (accuracyPct >= 70) { emoji = '\uD83D\uDD25'; message = 'Great work'; }
  else if (accuracyPct >= 50) { emoji = '\uD83D\uDCAA'; message = 'Keep going'; }
  else { emoji = '\uD83D\uDCDA'; message = 'Keep practising'; }

  // Score ring: CSS conic-gradient for the arc
  const ringColor = accuracyPct >= 70 ? 'var(--accent-green)' : accuracyPct >= 40 ? '#f59e0b' : '#ef4444';
  const ringStyle = {
    background: `conic-gradient(${ringColor} ${accuracyPct * 3.6}deg, var(--border-primary) ${accuracyPct * 3.6}deg)`,
  };

  const questionLabel = totalAnswered === 1 ? 'question' : 'questions';
  const topicLabel = uniqueTopics === 1 ? 'topic' : 'topics';

  return (
    <div className="spe-summary-card">
      <div className="spe-summary-emoji">{emoji}</div>
      <h2 className="spe-summary-heading">{message}</h2>
      <p className="spe-summary-subtitle">{totalAnswered} {questionLabel} answered across {uniqueTopics} {topicLabel}</p>

      {/* Score ring */}
      <div className="spe-summary-ring" style={ringStyle}>
        <div className="spe-summary-ring-mask">
          <span className="spe-summary-ring-pct">{accuracyPct}%</span>
          <span className="spe-summary-ring-label">correct</span>
        </div>
      </div>

      {/* Stat cards */}
      <div className="spe-summary-stats">
        <div className="spe-stat-card">
          <span className="spe-stat-num spe-stat-green">{totalCorrect}</span>
          <span className="spe-stat-label">CORRECT</span>
        </div>
        <div className="spe-stat-card">
          <span className="spe-stat-num spe-stat-amber">{totalRetried}</span>
          <span className="spe-stat-label">RETRIED</span>
        </div>
        <div className="spe-stat-card">
          <span className="spe-stat-num spe-stat-gray">{totalAnswered}</span>
          <span className="spe-stat-label">ANSWERED</span>
        </div>
      </div>

      {/* Actions */}
      <div className="spe-summary-btns">
        <button className="spe-summary-btn-primary" onClick={onRestart}>Practise again</button>
        <button className="spe-summary-btn-secondary" onClick={onChangeTopics}>Change topics</button>
      </div>
    </div>
  );
}
