"use client";

/* ── Flashcard Summary — Smart Flashcards Engine ── */
export default function FlashcardSummary({ results, sections, totalCards, onRestart, onChangeTopics }) {
  const totalReviewed = results.length;
  const totalKnown = results.filter(r => r.correct).length;
  const totalLearning = results.filter(r => !r.correct).length;
  const knownPct = totalReviewed > 0 ? Math.round((totalKnown / totalReviewed) * 100) : 0;
  const uniqueTopics = new Set(results.map(r => r.sectionId)).size;

  // Emoji + message based on known percentage
  let emoji, message;
  if (knownPct >= 90) { emoji = '\uD83C\uDFAF'; message = 'Amazing!'; }
  else if (knownPct >= 70) { emoji = '\uD83D\uDD25'; message = 'Great work'; }
  else if (knownPct >= 50) { emoji = '\uD83D\uDCAA'; message = 'Keep going'; }
  else { emoji = '\uD83D\uDCDA'; message = 'Keep practising'; }

  // Score ring: CSS conic-gradient for the arc
  const ringColor = knownPct >= 70 ? 'var(--accent-green)' : knownPct >= 40 ? '#f59e0b' : '#ef4444';
  const ringStyle = {
    background: `conic-gradient(${ringColor} ${knownPct * 3.6}deg, var(--border-primary) ${knownPct * 3.6}deg)`,
  };

  const cardLabel = totalReviewed === 1 ? 'card' : 'cards';
  const topicLabel = uniqueTopics === 1 ? 'topic' : 'topics';

  return (
    <div className="spe-summary-card">
      <div className="spe-summary-emoji">{emoji}</div>
      <h2 className="spe-summary-heading">{message}</h2>
      <p className="spe-summary-subtitle">{totalReviewed} {cardLabel} reviewed across {uniqueTopics} {topicLabel}</p>

      {/* Score ring */}
      <div className="spe-summary-ring" style={ringStyle}>
        <div className="spe-summary-ring-mask">
          <span className="spe-summary-ring-pct">{knownPct}%</span>
          <span className="spe-summary-ring-label">known</span>
        </div>
      </div>

      {/* Stat cards */}
      <div className="spe-summary-stats">
        <div className="spe-stat-card">
          <span className="spe-stat-num spe-stat-green">{totalKnown}</span>
          <span className="spe-stat-label">KNOWN</span>
        </div>
        <div className="spe-stat-card">
          <span className="spe-stat-num spe-stat-amber">{totalLearning}</span>
          <span className="spe-stat-label">LEARNING</span>
        </div>
        <div className="spe-stat-card">
          <span className="spe-stat-num spe-stat-gray">{totalReviewed}</span>
          <span className="spe-stat-label">REVIEWED</span>
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
