"use client";
import { getLevelTitle } from './constants';

export default function LevelUpCelebration({ level, subject, xpEarned, onContinue }) {
  const title = getLevelTitle(subject, level);

  return (
    <div className="fun-levelup-overlay">
      <div className="fun-confetti-container">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="fun-confetti-piece"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 1}s`,
              backgroundColor: ['#10b981', '#f59e0b', '#3b82f6', '#ef4444', '#8b5cf6'][i % 5],
            }}
          />
        ))}
      </div>
      <div className="fun-levelup-card">
        <div className="fun-levelup-icon">&#127942;</div>
        <h2 className="fun-levelup-heading">Level Up!</h2>
        <div className="fun-levelup-level">Level {level}</div>
        <div className="fun-levelup-title">{title}</div>
        <div className="fun-levelup-xp">+{xpEarned} XP</div>
        <button className="fun-btn fun-btn-hit" onClick={onContinue}>
          Keep Playing
        </button>
      </div>
    </div>
  );
}
