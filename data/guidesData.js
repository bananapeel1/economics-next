/**
 * SEO guide pages targeting long-tail keywords from Search Console data.
 * Each guide is a comprehensive, long-form article designed to rank for
 * keywords where RevvyLearn currently appears at position 30–90.
 */

// NOTE: 'market-failure-complete-guide', 'macroeconomic-objectives-guide' and
// 'globalisation-causes-effects' have been consolidated into their respective
// pillar pages under /economics/*. 308 permanent redirects are configured in
// next.config.mjs so existing backlinks pass authority to the pillars.
const guidesData = [
  {
    slug: 'business-revision-guide',
    subject: 'business',
    title: 'Edexcel IAL Business Revision Guide — Units 1 and 2',
    metaTitle: 'Edexcel IAL Business Revision Guide — Units 1 & 2 (2026)',
    metaDescription: 'Edexcel IAL Business revision for Unit 1 (WBS11) and Unit 2 (WBS12): key definitions, exam command words and the mistakes that cost marks.',
    heroSubtitle: 'Unit 1 and Unit 2 essentials — key definitions, exam technique and the mistakes that cost marks. All 20 Business sections are in the app.',
    published: '2026-09-11',
    updated: '2026-09-12',
    heroCta: {
      blurb: 'Unit 1 and Unit 2 notes and practice questions in the app — free, no subscription.',
      label: 'Start revising Unit 1',
      href: '/business/unit-1',
    },
    closingCta: {
      heading: 'Put this into practice',
      blurb: 'Notes, diagrams and practice questions across all 20 Business sections are free, with no subscription.',
      label: 'See all 20 Business sections',
      href: '/business',
    },
    sections: [
      {
        heading: 'How to Revise Edexcel IAL Business Effectively',
        content: 'Edexcel IAL Business requires a different revision approach than other subjects. You need to combine knowledge recall (definitions, theories, models) with application skills (using real business examples) and evaluation (weighing up arguments). The most effective strategy is active revision: use flashcards for definitions, practice applying theories to case studies, and write timed essay plans for 20-mark questions against [past papers](/past-papers). Passive reading of notes is the least effective method.',
        cta: { label: 'Start with Unit 1: Marketing and People', href: '/business/unit-1' },
      },
      {
        heading: 'Unit 1: Marketing and People (WBS11)',
        content: 'Unit 1 covers the foundations of business. Key topics include: [meeting customer needs](/business/unit-1/meeting-customer-needs) (mass vs niche markets, market mapping, competitive advantage), [the market](/business/unit-1/the-market) (demand, supply, PED, YED, market equilibrium), [marketing mix and strategy](/business/unit-1/marketing-mix-strategy) (4Ps, product life cycle, Boston Matrix, pricing strategies), [managing people](/business/unit-1/managing-people) (recruitment, motivation theories — Maslow, Herzberg, Taylor — leadership styles, organisational design), and [entrepreneurs and leaders](/business/unit-1/entrepreneurs-leaders) (role of the entrepreneur, business objectives, motives for starting a business).',
      },
      {
        heading: 'Unit 2: Managing Business Activities (WBS12)',
        content: 'Unit 2 focuses on finance and operations. Key topics include: [raising finance](/business/unit-2/planning-raising-finance) (sources of finance — internal vs external, short-term vs long-term), [financial planning](/business/unit-2/financial-planning) (cash flow forecasting, break-even analysis, budgeting), [managing finance](/business/unit-2/managing-finance) (profit vs cash, profitability ratios, liquidity ratios, efficiency ratios), [resource management](/business/unit-2/resource-management) (production methods — job, batch, flow — capacity utilisation, quality management, lean production), and [external influences](/business/unit-2/external-influences) (interest rates, exchange rates, economic growth, legislation, political and social change).',
      },
      {
        heading: 'Key Definitions You Must Know',
        content: 'Edexcel IAL Business exams frequently test definitions. Essential terms include: added value (the difference between the selling price and the cost of bought-in materials), [market share](/business/unit-1/the-market) (the percentage of total market sales held by one business), [cash flow](/business/unit-2/managing-finance) (the movement of money into and out of a business), [break-even point](/business/unit-2/financial-planning) (the level of output where total revenue equals total costs), [capacity utilisation](/business/unit-2/resource-management) (actual output as a percentage of maximum possible output), and [price elasticity of demand](/business/unit-1/the-market) (the responsiveness of quantity demanded to a change in price).',
      },
      {
        heading: 'Exam Technique for Edexcel Business',
        content: 'Edexcel IAL Business papers use specific [command words](/command-words) that determine how you should structure your answer. "Define" requires a precise textbook definition (2 marks). "Explain" needs a chain of reasoning showing cause and effect. "Analyse" requires you to break down a topic and show connections between points. "Evaluate" and "Assess" demand balanced arguments with a justified conclusion. For 20-mark essay questions, structure your answer with: introduction (define key terms), 2-3 developed arguments for, 2-3 developed arguments against, and a conclusion that makes a judgement based on the weight of evidence.',
        cta: { label: 'See every command word and what it asks for', href: '/command-words' },
      },
      {
        heading: 'Common Mistakes to Avoid',
        content: 'The most common mistakes in Edexcel IAL Business exams are: writing generic answers that could apply to any business (always use context from the case study), listing points without developing them into chains of reasoning, failing to evaluate (one-sided answers cannot access top bands), [confusing cash flow with profit](/business/unit-2/managing-finance), [mixing up formulas for ratios](/business/unit-2/managing-finance), and not managing time — spending too long on short-answer questions leaves insufficient time for the 20-mark essay.',
        cta: { label: 'Work through past paper questions', href: '/past-papers' },
      },
    ],
    relatedTopics: [
      { title: 'Business Unit 1 Notes', href: '/business/unit-1' },
      { title: 'Business Unit 2 Notes', href: '/business/unit-2' },
      { title: 'Command Words Guide', href: '/command-words' },
      { title: 'Past Papers', href: '/past-papers' },
    ],
    targetKeywords: ['edexcel IAL business revision notes', 'business revision', 'IAL business revision', 'business edexcel IAL revision', 'business revision notes', 'edexcel business revision'],
  },
];

export default guidesData;
