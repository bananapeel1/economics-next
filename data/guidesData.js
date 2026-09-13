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
    title: 'Edexcel IAL Business Revision Guide — All Four Units',
    metaTitle: 'Edexcel IAL Business Revision Guide — WBS11-WBS14 (2026)',
    metaDescription: 'Edexcel IAL Business revision for all four units: how each paper is assessed, what every command word asks for, and the accounting terms IAL uses.',
    heroSubtitle: 'How each paper is actually assessed, what every command word asks for, and the accounting terminology IAL uses that UK A-level sites get wrong.',
    published: '2026-09-11',
    updated: '2026-09-13',
    heroCta: {
      blurb: 'Notes, diagrams and practice questions across all 20 Business sections — free, no subscription.',
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
        heading: 'How Each IAL Business Paper Is Assessed',
        content: 'Every unit is a two-hour written exam worth 80 marks, sat in the January, June or October series. Units 1 and 2 each count for 50% of the IAS and 25% of the full IAL; Units 3 and 4 each count for 50% of the IA2 and 25% of the IAL. Every question in every paper is based on sources, so there is no section where you can write from memory alone — but the balance between short answers and essays changes at A2, and that is what most students get caught out by.',
        table: {
          caption: 'Paper structure, from the Edexcel IAL Business specification.',
          head: ['Unit', 'Section A', 'Section B', 'Section C'],
          rows: [
            ['[Unit 1 — Marketing and people (WBS11)](/business/unit-1)', 'Short and extended response, 30 marks', 'Same format, different sources, 30 marks', 'One 20-mark essay'],
            ['[Unit 2 — Managing business activities (WBS12)](/business/unit-2)', 'Short and extended response, 30 marks', 'Same format, different sources, 30 marks', 'One 20-mark essay'],
            ['[Unit 3 — Business decisions and strategy (WBS13)](/business/unit-3)', 'Short and extended response, 40 marks', 'One 20-mark essay', 'One 20-mark essay'],
            ['[Unit 4 — Global business (WBS14)](/business/unit-4)', 'Short and extended response, 40 marks', 'One 20-mark essay', 'One 20-mark essay'],
          ],
        },
        cta: { label: 'See all 20 Business sections', href: '/business' },
      },
      {
        heading: 'Command Words and What Each One Asks For',
        content: 'The command word tells you which assessment objective the examiner is marking, and therefore how to shape the answer. The four objectives are weighted across the full IAL as follows: AO1 knowledge and understanding 23.8%, AO2 application 23.8%, AO3 analysis 28.8%, AO4 evaluation 23.8%. One command word is routinely under-practised: quantitative skills are worth a minimum of 10% of the marks across the qualification, so "calculate" questions are guaranteed and cheap to prepare for.',
        table: {
          head: ['Command word', 'What the examiner wants'],
          rows: [
            ['Define', 'A precise, textbook statement of the term. No context, no example needed.'],
            ['Calculate', 'The working as well as the answer. Ratios, percentages, cost, revenue, profit, break-even and investment appraisal are all named in the specification.'],
            ['Explain', 'A chain of reasoning that shows cause and effect, applied to the source.'],
            ['Analyse', 'Break the issue down and connect the points — causes, costs and consequences.'],
            ['Assess / Evaluate', 'Balanced argument, then a judgement that follows from the weight of evidence, not a restatement.'],
          ],
        },
        cta: { label: 'See every command word and what it asks for', href: '/command-words' },
      },
      {
        heading: 'The Accounting Terms IAL Uses — And UK Sites Get Wrong',
        content: 'This is the single most common way revision notes written for UK A-level mislead IAL students. Edexcel IAL assessments use International Accounting Standards terminology, and the specification says so explicitly. If you learned the UK GAAP terms, the exam will not use them — and an answer built on the wrong vocabulary loses marks in [managing finance](/business/unit-2/managing-finance) questions where it matters most.',
        table: {
          caption: 'From Appendix 8 of the specification. The assessments use the right-hand column.',
          head: ['UK GAAP term', 'What IAL uses'],
          rows: [
            ['Net profit', 'Profit for the year'],
            ['Balance sheet', 'Statement of financial position'],
            ['Trading and profit and loss account', 'Statement of comprehensive income'],
            ['Sales', 'Revenue'],
            ['Stock', 'Inventory'],
            ['Fixed assets', 'Non-current assets'],
            ['Cost of goods sold', 'Cost of sales'],
            ['Interest payable', 'Finance costs'],
          ],
        },
      },
      {
        heading: 'Unit 1: Marketing and People (WBS11)',
        content: 'Unit 1 covers the foundations of business and is assessed in a two-hour paper worth 80 marks. The specification lists five areas of content:',
        list: [
          '[Meeting customer needs](/business/unit-1/meeting-customer-needs) — mass and niche markets, market mapping, competitive advantage',
          '[The market](/business/unit-1/the-market) — demand, supply, price and income elasticity, market equilibrium',
          '[Marketing mix and strategy](/business/unit-1/marketing-mix-strategy) — the 4Ps, product life cycle, Boston Matrix, pricing strategies',
          '[Managing people](/business/unit-1/managing-people) — recruitment, motivation theories, leadership styles, organisational design',
          '[Entrepreneurs and leaders](/business/unit-1/entrepreneurs-leaders) — the role of the entrepreneur, business objectives, motives for starting a business',
        ],
      },
      {
        heading: 'Unit 2: Managing Business Activities (WBS12)',
        content: 'Unit 2 is finance and operations, and carries the heaviest quantitative load of the IAS units. Five areas of content:',
        list: [
          '[Planning a business and raising finance](/business/unit-2/planning-raising-finance) — internal and external sources, short and long term',
          '[Financial planning](/business/unit-2/financial-planning) — cash flow forecasting, break-even analysis, budgeting',
          '[Managing finance](/business/unit-2/managing-finance) — profit against cash, profitability, liquidity and efficiency ratios',
          '[Resource management](/business/unit-2/resource-management) — job, batch and flow production, capacity utilisation, quality, lean production',
          '[External influences](/business/unit-2/external-influences) — interest rates, exchange rates, economic growth, legislation',
        ],
      },
      {
        heading: 'Unit 3: Business Decisions and Strategy (WBS13)',
        content: 'Unit 3 moves to A2 and the paper changes shape: Section A is worth 40 marks, then two separate 20-mark essays. The specification lists six areas of content — one more than either IAS unit:',
        list: [
          '[Business objectives and strategy](/business/unit-3/business-objectives-strategy)',
          '[Business growth](/business/unit-3/business-growth)',
          '[Decision-making techniques](/business/unit-3/decision-making-techniques)',
          '[Influences on business decisions](/business/unit-3/influences-business-decisions)',
          '[Assessing competitiveness](/business/unit-3/assessing-competitiveness)',
          '[Managing change](/business/unit-3/managing-change)',
        ],
        cta: { label: 'Start revising Unit 3', href: '/business/unit-3' },
      },
      {
        heading: 'Unit 4: Global Business (WBS14)',
        content: 'Unit 4 has the same structure as Unit 3 — a 40-mark Section A and two 20-mark essays — across four areas of content:',
        list: [
          '[Globalisation](/business/unit-4/globalisation)',
          '[Global markets and business expansion](/business/unit-4/global-markets-expansion)',
          '[Global marketing](/business/unit-4/global-marketing)',
          '[Global industries and companies — multinational corporations](/business/unit-4/global-industries-mncs)',
        ],
        cta: { label: 'Start revising Unit 4', href: '/business/unit-4' },
      },
      {
        heading: 'How to Revise Edexcel IAL Business Effectively',
        content: 'Because every question is source-based, revision that stops at recall will not get you far. You need the terms and models in memory, but the marks are in applying them to an unseen business and then judging between them. Work in that order: learn the definitions until they are automatic, then practise applying them to case studies you have never seen, then write timed plans for 20-mark essays against [past papers](/past-papers). Reading notes through is the weakest use of the time you have.',
        cta: { label: 'Start with Unit 1: Marketing and People', href: '/business/unit-1' },
      },
      {
        heading: 'Common Mistakes to Avoid',
        content: 'Most lost marks in IAL Business come from a short list of habits rather than gaps in knowledge:',
        list: [
          'Writing generic answers that would fit any business, when every paper gives you sources to use',
          'Listing points instead of developing them into chains of reasoning, which caps you at AO1',
          'Giving one-sided answers to "assess" and "evaluate" questions, which cannot reach the top bands',
          '[Confusing cash flow with profit](/business/unit-2/managing-finance) — a business can be profitable and still run out of cash',
          '[Mixing up the ratio formulas](/business/unit-2/managing-finance), or giving an answer with no working when the command word was "calculate"',
          'Using UK GAAP vocabulary in an exam that is marked against International Accounting Standards terms',
          'Spending too long on short-answer questions and leaving the 20-mark essay unfinished',
        ],
        cta: { label: 'Work through past paper questions', href: '/past-papers' },
      },
    ],
    relatedTopics: [
      { title: 'Business Unit 1 Notes', href: '/business/unit-1' },
      { title: 'Business Unit 2 Notes', href: '/business/unit-2' },
      { title: 'Business Unit 3 Notes', href: '/business/unit-3' },
      { title: 'Business Unit 4 Notes', href: '/business/unit-4' },
      { title: 'Command Words Guide', href: '/command-words' },
      { title: 'Past Papers', href: '/past-papers' },
    ],
    targetKeywords: ['edexcel IAL business revision notes', 'IAL business revision', 'WBS11 revision', 'WBS12 revision', 'WBS13 revision', 'WBS14 revision', 'edexcel IAL business command words', 'IAL business exam structure'],
  },
];

export default guidesData;
