export const SUBJECT_SECTIONS = {
  economics: [
    'introductory-concepts', 'consumer-behaviour-demand', 'supply',
    'price-determination', 'market-failure', 'government-intervention',
    'measures-economic-performance', 'aggregate-demand', 'aggregate-supply',
    'national-income', 'economic-growth', 'macroeconomic-objectives-policies',
  ],
  business: [
    'meeting-customer-needs', 'the-market', 'marketing-mix-strategy',
    'managing-people', 'entrepreneurs-leaders', 'planning-raising-finance',
    'financial-planning', 'managing-finance', 'resource-management',
    'external-influences',
  ],
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
