import { useState, useEffect, useCallback } from 'react';
import { getXpForNextLevel, getCumulativeXpForLevel, calculateXpAward } from './constants';

export default function useFunProgress(subjectId) {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!subjectId) { setLoading(false); return; }
    setLoading(true);
    fetch(`/api/fun/progress?subjectId=${subjectId}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.progress) setProgress(data.progress); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [subjectId]);

  const processRound = useCallback((blackjackResult, quizCorrect, quizTotal) => {
    if (!progress) return { leveled: false, xpEarned: 0 };

    const xpEarned = calculateXpAward(blackjackResult, quizCorrect, quizTotal, progress.level);
    const won = blackjackResult === 'win' || blackjackResult === 'blackjack';
    const leveledUp = won && quizCorrect === quizTotal;

    const newStreak = leveledUp ? progress.current_streak + 1 : 0;
    const newXp = progress.xp + xpEarned;
    let newLevel = progress.level;

    if (leveledUp) {
      const xpNeeded = getCumulativeXpForLevel(progress.level + 1);
      if (newXp >= xpNeeded) {
        newLevel = progress.level + 1;
      }
    }

    const updated = {
      ...progress,
      level: newLevel,
      xp: newXp,
      games_played: progress.games_played + 1,
      games_won: won ? progress.games_won + 1 : progress.games_won,
      current_streak: newStreak,
      best_streak: Math.max(progress.best_streak, newStreak),
      quiz_correct: progress.quiz_correct + quizCorrect,
      quiz_total: progress.quiz_total + quizTotal,
    };

    setProgress(updated);

    // Save to DB
    fetch('/api/fun/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subjectId, ...updated }),
    }).catch(() => {});

    return { leveled: newLevel > progress.level, xpEarned, newLevel };
  }, [progress, subjectId]);

  const xpForNext = progress ? getXpForNextLevel(progress.level) : 100;
  const xpIntoLevel = progress ? progress.xp - getCumulativeXpForLevel(progress.level) : 0;
  const xpProgress = xpForNext > 0 ? Math.min(xpIntoLevel / xpForNext, 1) : 0;

  return { progress, loading, processRound, xpForNext, xpIntoLevel, xpProgress };
}
