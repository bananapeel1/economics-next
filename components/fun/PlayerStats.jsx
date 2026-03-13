"use client";
import { getLevelTitle } from './constants';

export default function PlayerStats({ progress, subject, xpForNext, xpIntoLevel, xpProgress }) {
  if (!progress) return null;

  const title = getLevelTitle(subject, progress.level);

  return (
    <div className="fun-stats">
      <div className="fun-stats-top">
        <div className="fun-level-badge">
          <span className="fun-level-number">Lv. {progress.level}</span>
          <span className="fun-level-title">{title}</span>
        </div>
        <div className="fun-streak">
          {progress.current_streak > 0 && (
            <span className="fun-streak-badge">
              {progress.current_streak} streak
            </span>
          )}
        </div>
      </div>
      <div className="fun-xp-section">
        <div className="fun-xp-bar">
          <div className="fun-xp-fill" style={{ width: `${xpProgress * 100}%` }} />
        </div>
        <div className="fun-xp-label">{xpIntoLevel} / {xpForNext} XP</div>
      </div>
      <div className="fun-stats-row">
        <span>Games: {progress.games_played}</span>
        <span>Won: {progress.games_won}</span>
        <span>Best streak: {progress.best_streak}</span>
      </div>
    </div>
  );
}
