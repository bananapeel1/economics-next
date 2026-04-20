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
    title: 'Edexcel IAL Business Revision Guide — Complete Study Notes',
    metaTitle: 'Edexcel IAL Business Revision Notes — Complete Study Guide (2026)',
    metaDescription: 'Complete Edexcel IAL Business revision guide. Free study notes for Unit 1 Marketing & People and Unit 2 Managing Business Activities with exam tips, key definitions and practice questions.',
    heroSubtitle: 'Your complete revision companion for Edexcel IAL Business Studies — covering every spec point across Units 1-4 with concise notes, key definitions and exam technique tips.',
    sections: [
      {
        heading: 'How to Revise Edexcel IAL Business Effectively',
        content: 'Edexcel IAL Business requires a different revision approach than other subjects. You need to combine knowledge recall (definitions, theories, models) with application skills (using real business examples) and evaluation (weighing up arguments). The most effective strategy is active revision: use flashcards for definitions, practice applying theories to case studies, and write timed essay plans for 20-mark questions. Passive reading of notes is the least effective method.',
      },
      {
        heading: 'Unit 1: Marketing and People (WBS11)',
        content: 'Unit 1 covers the foundations of business. Key topics include: meeting customer needs (mass vs niche markets, market mapping, competitive advantage), the market (demand, supply, PED, YED, market equilibrium), marketing mix and strategy (4Ps, product life cycle, Boston Matrix, pricing strategies), managing people (recruitment, motivation theories — Maslow, Herzberg, Taylor — leadership styles, organisational design), and entrepreneurs and leaders (role of the entrepreneur, business objectives, motives for starting a business).',
      },
      {
        heading: 'Unit 2: Managing Business Activities (WBS12)',
        content: 'Unit 2 focuses on finance and operations. Key topics include: raising finance (sources of finance — internal vs external, short-term vs long-term), financial planning (cash flow forecasting, break-even analysis, budgeting), managing finance (profit vs cash, profitability ratios, liquidity ratios, efficiency ratios), resource management (production methods — job, batch, flow — capacity utilisation, quality management, lean production), and external influences (interest rates, exchange rates, economic growth, legislation, political and social change).',
      },
      {
        heading: 'Key Definitions You Must Know',
        content: 'Edexcel IAL Business exams frequently test definitions. Essential terms include: added value (the difference between the selling price and the cost of bought-in materials), market share (the percentage of total market sales held by one business), cash flow (the movement of money into and out of a business), break-even point (the level of output where total revenue equals total costs), capacity utilisation (actual output as a percentage of maximum possible output), and price elasticity of demand (the responsiveness of quantity demanded to a change in price).',
      },
      {
        heading: 'Exam Technique for Edexcel Business',
        content: 'Edexcel IAL Business papers use specific command words that determine how you should structure your answer. "Define" requires a precise textbook definition (2 marks). "Explain" needs a chain of reasoning showing cause and effect. "Analyse" requires you to break down a topic and show connections between points. "Evaluate" and "Assess" demand balanced arguments with a justified conclusion. For 20-mark essay questions, structure your answer with: introduction (define key terms), 2-3 developed arguments for, 2-3 developed arguments against, and a conclusion that makes a judgement based on the weight of evidence.',
      },
      {
        heading: 'Common Mistakes to Avoid',
        content: 'The most common mistakes in Edexcel IAL Business exams are: writing generic answers that could apply to any business (always use context from the case study), listing points without developing them into chains of reasoning, failing to evaluate (one-sided answers cannot access top bands), confusing cash flow with profit, mixing up formulas for ratios, and not managing time — spending too long on short-answer questions leaves insufficient time for the 20-mark essay.',
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
