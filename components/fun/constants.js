/*
 * The `subject_id` Blackjack saves a player's progress under in `user_fun_progress`. It is NOT
 * `subjects.id`: Business is 3 in `subjects`, but this page has always written Business progress as
 * 2, and every Business player's level lives there (7 players, the highest at level 12, on
 * 26 Sep 2026). "Correcting" it to 3 silently starts all of them again at level 1. Moving to 3 means
 * moving those rows in the same change. lib/fun-pool.test.mjs states these numbers so that a change
 * here fails a test instead of a player.
 */
export const FUN_PROGRESS_SUBJECT_ID = {
  economics: 1,
  business: 2,
};

export const ECON_TITLES = [
  'Apprentice Economist',
  'Market Observer',
  'Supply & Demand Analyst',
  'Policy Advisor',
  'Fiscal Strategist',
  'Market Analyst',
  'Chief Economist',
  'Economics Professor',
  'Nobel Laureate',
  'Grandmaster Economist',
];

export const BIZ_TITLES = [
  'Junior Intern',
  'Business Analyst',
  'Team Leader',
  'Operations Manager',
  'Strategy Consultant',
  'VP of Operations',
  'Managing Director',
  'Chief Executive',
  'Industry Titan',
  'Business Mogul',
];

export function getXpForNextLevel(level) {
  return 100 * level + 50 * (level - 1);
}

export function getCumulativeXpForLevel(level) {
  let total = 0;
  for (let i = 1; i < level; i++) {
    total += getXpForNextLevel(i);
  }
  return total;
}

export function getLevelTitle(subject, level) {
  const titles = subject === 'economics' ? ECON_TITLES : BIZ_TITLES;
  return titles[Math.min(level - 1, titles.length - 1)];
}

export function calculateXpAward(blackjackResult, quizCorrect, quizTotal, level) {
  if (blackjackResult === 'push') return 10;

  if (blackjackResult === 'win' || blackjackResult === 'blackjack') {
    if (quizCorrect === quizTotal) {
      const base = blackjackResult === 'blackjack' ? 150 : 100;
      return base + 10 * level;
    }
    return 25;
  }

  // Lost blackjack — penalty quiz (5 questions)
  if (quizCorrect >= 5) return 30;
  if (quizCorrect >= 3) return 15;
  return 5;
}
