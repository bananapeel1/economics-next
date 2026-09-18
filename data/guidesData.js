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
      href: '/business/unit-1/meeting-customer-needs',
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
        stats: [
          { value: '80', label: 'marks in every unit' },
          { value: '2hr', label: 'every paper, all four units' },
          { value: '0', label: 'multiple-choice questions' },
          { value: '3', label: 'series a year: Jan, June, Oct' },
        ],
        marksChart: {
          total: 80,
          caption: 'Every bar is one 80-mark paper. The shift at A2 is the essay half growing from 20 marks to 40.',
          legend: [
            { key: 2, name: 'Section A' },
            { key: 3, name: 'Section B' },
            { key: 4, name: 'Essays' },
          ],
          units: [
            { label: 'Unit 1 — Marketing and people (WBS11)', segments: [ { key: 2, marks: 30 }, { key: 3, marks: 30 }, { key: 4, marks: 20 } ] },
            { label: 'Unit 2 — Managing business activities (WBS12)', segments: [ { key: 2, marks: 30 }, { key: 3, marks: 30 }, { key: 4, marks: 20 } ] },
            { label: 'Unit 3 — Business decisions and strategy (WBS13)', segments: [ { key: 2, marks: 40 }, { key: 4, marks: 40 } ] },
            { label: 'Unit 4 — Global business (WBS14)', segments: [ { key: 2, marks: 40 }, { key: 4, marks: 40 } ] },
          ],
        },
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
        cta: { label: 'Start revising Unit 3', href: '/business/unit-3/business-objectives-strategy' },
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
        cta: { label: 'Start revising Unit 4', href: '/business/unit-4/globalisation' },
      },
      {
        heading: 'How to Revise Edexcel IAL Business Effectively',
        content: 'Because every question is source-based, revision that stops at recall will not get you far. You need the terms and models in memory, but the marks are in applying them to an unseen business and then judging between them. Work in that order: learn the definitions until they are automatic, then practise applying them to case studies you have never seen, then write timed plans for 20-mark essays against [past papers](/past-papers). Reading notes through is the weakest use of the time you have.',
        cta: { label: 'Start with Unit 1: Marketing and People', href: '/business/unit-1/meeting-customer-needs' },
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
  {
    slug: 'economics-revision-guide',
    subject: 'economics',
    title: 'Edexcel IAL Economics Revision Guide — All Four Units',
    metaTitle: 'Edexcel IAL Economics Revision Guide — WEC11-WEC14 (2026)',
    metaDescription: 'Edexcel IAL Economics revision for all four units: how each paper is built, the source booklet, and the 20% of marks that are quantitative.',
    heroSubtitle: 'How each paper is actually built — multiple choice, a source booklet and essays you choose between — and the fifth of every paper that is quantitative.',
    published: '2026-09-16',
    updated: '2026-09-16',
    heroCta: {
      blurb: 'Notes, diagrams and practice questions across all 23 Economics sections — free, no subscription.',
      label: 'Start revising Unit 1',
      href: '/economics/unit-1/introductory-concepts',
    },
    closingCta: {
      heading: 'Put this into practice',
      blurb: 'Notes, diagrams and practice questions across all 23 Economics sections are free, with no subscription.',
      label: 'See all 23 Economics sections',
      href: '/economics',
    },
    sections: [
      {
        heading: 'How Each IAL Economics Paper Is Built',
        content: 'IAL Economics papers are not built like Business papers, and the difference matters for how you revise. Every unit is worth 80 marks, sat in the January, June or October series. Units 1 and 2 run for 1 hour 45 minutes and each count for 50% of the IAS and 25% of the full IAL; Units 3 and 4 run for 2 hours and each count for 50% of the IA2 and 25% of the IAL. Every paper opens with multiple choice — Business has none — and every paper is built around a source booklet.',
        stats: [
          { value: '80', label: 'marks in every unit' },
          { value: '34', label: 'of them on the source booklet' },
          { value: '6', label: 'multiple-choice questions' },
          { value: '3', label: 'series a year: Jan, June, Oct' },
        ],
        marksChart: {
          total: 80,
          caption: 'Every bar is one 80-mark paper, drawn to the same scale. The source booklet outweighs the essays in all four.',
          legend: [
            { key: 1, name: 'Multiple choice' },
            { key: 2, name: 'Short answers' },
            { key: 3, name: 'Source booklet' },
            { key: 4, name: 'Essays' },
          ],
          units: [
            { label: 'Unit 1 — Markets in action (WEC11)', segments: [ { key: 1, marks: 6 }, { key: 2, marks: 20 }, { key: 3, marks: 34 }, { key: 4, marks: 20 } ] },
            { label: 'Unit 2 — Macroeconomic performance and policy (WEC12)', segments: [ { key: 1, marks: 6 }, { key: 2, marks: 20 }, { key: 3, marks: 34 }, { key: 4, marks: 20 } ] },
            { label: 'Unit 3 — Business behaviour (WEC13)', segments: [ { key: 1, marks: 6 }, { key: 3, marks: 34 }, { key: 4, marks: 40 } ] },
            { label: 'Unit 4 — Developments in the global economy (WEC14)', segments: [ { key: 1, marks: 6 }, { key: 3, marks: 34 }, { key: 4, marks: 40 } ] },
          ],
        },
        table: {
          caption: 'Paper structure, from the Edexcel IAL Economics specification.',
          head: ['Unit', 'Multiple choice', 'Short answers', 'Source booklet', 'Essays'],
          rows: [
            ['[Unit 1 — Markets in action (WEC11)](/economics/unit-1)', '6 questions, 6 marks', '5 questions, 20 marks', 'Five-part question, 34 marks', 'One 20-mark essay from a choice of two'],
            ['[Unit 2 — Macroeconomic performance and policy (WEC12)](/economics/unit-2)', '6 questions, 6 marks', '5 questions, 20 marks', 'Five-part question, 34 marks', 'One 20-mark essay from a choice of two'],
            ['[Unit 3 — Business behaviour (WEC13)](/economics/unit-3)', '6 questions, 6 marks', '—', 'Five-part question, 34 marks', 'Two 20-mark essays from a choice of three'],
            ['[Unit 4 — Developments in the global economy (WEC14)](/economics/unit-4)', '6 questions, 6 marks', '—', 'Five-part question, 34 marks', 'Two 20-mark essays from a choice of three'],
          ],
        },
        cta: { label: 'See all 23 Economics sections', href: '/economics' },
      },
      {
        heading: 'The Source Booklet Is the Biggest Thing on the Paper',
        content: 'The five-part data question is worth 34 of the 80 marks in every unit — more than the essays, and more than multiple choice and short answers combined. It is the single highest-value thing to practise, and it is the part students most often leave until last because it cannot be revised by rereading notes. The data comes in a separate booklet: extracts, tables, charts and index numbers you have never seen, and the marks are for reading them accurately and then applying theory to what they actually show.',
        list: [
          'Quote the data. A point that could have been made without the extract will not score application marks.',
          'Check the units before you calculate — the extracts mix levels, percentage changes and percentage point changes on purpose.',
          'Index numbers are not percentages. A rise from 100 to 120 is a 20% rise; a rise from 120 to 140 is not.',
          'Diagrams earn marks in data questions too, if they are labelled and the axes are right.',
        ],
        cta: { label: 'Practise data-response questions', href: '/data-response' },
      },
      {
        heading: 'A Fifth of Every Paper Is Quantitative',
        stats: [
          { value: '20%', label: 'of marks are quantitative, minimum' },
          { value: '10%', label: 'the equivalent floor in IAL Business' },
          { value: '9', label: 'named skills, QS1 to QS9' },
        ],
        content: 'The specification sets quantitative skills at a minimum of 20% of the marks across the qualification — twice the 10% required in IAL Business. That is roughly sixteen marks a paper that depend on arithmetic rather than argument, and they are the most reliably winnable marks available to you. Nine skills are named and assessed:',
        table: {
          caption: 'Quantitative skills QS1-QS9, which carry the 20%.',
          head: ['Skill', 'What it covers'],
          rows: [
            ['Ratios and fractions', 'QS1 — calculate, use and understand them'],
            ['Percentages', 'QS2 — percentages, percentage changes and percentage point changes, which are not the same thing'],
            ['Averages', 'QS3 — mean and median at IAS; quantiles are added at IA2'],
            ['Graphical forms', 'QS4 — construct and interpret a range of standard graphs'],
            ['Index numbers', 'QS5 — calculate and interpret them'],
            ['[Revenue, cost and profit](/economics/unit-3/revenue-costs-profits)', 'QS6 — total revenue at IAS; marginal, average and total cost, revenue and profit at IA2'],
            ['Real and nominal', 'QS7 — converting money values to real terms (IA2 only)'],
            ['[Elasticity](/economics/unit-1/consumer-behaviour-demand)', 'QS8 — calculate elasticities and interpret the result'],
            ['Applying data', 'QS9 — interpret and analyse written, graphical, tabular and numerical information'],
          ],
        },
      },
      {
        heading: 'Unit 1: Markets in Action (WEC11)',
        content: 'Unit 1 is microeconomics: how prices are set and why markets go wrong. Six areas of content:',
        list: [
          '[Introductory concepts](/economics/unit-1/introductory-concepts) — scarcity, opportunity cost, production possibility frontiers',
          '[Consumer behaviour and demand](/economics/unit-1/consumer-behaviour-demand) — demand, the elasticities, behavioural economics',
          '[Supply](/economics/unit-1/supply) — supply curves, elasticity of supply, costs of production',
          '[Price determination](/economics/unit-1/price-determination) — equilibrium, the price mechanism, consumer and producer surplus',
          '[Market failure](/economics/unit-1/market-failure) — externalities, public goods, information gaps',
          '[Government intervention in markets](/economics/unit-1/government-intervention) — taxes, subsidies, price controls, and government failure',
        ],
      },
      {
        heading: 'Unit 2: Macroeconomic Performance and Policy (WEC12)',
        content: 'Unit 2 is the macro half of the IAS, and shares Unit 1\'s paper structure exactly. Six areas of content:',
        list: [
          '[Measures of economic performance](/economics/unit-2/measures-economic-performance) — growth, inflation, unemployment, the balance of payments',
          '[Aggregate demand](/economics/unit-2/aggregate-demand) — the components of AD and what shifts them',
          '[Aggregate supply](/economics/unit-2/aggregate-supply) — short-run and long-run AS, and the debate between them',
          '[National income](/economics/unit-2/national-income) — the circular flow, injections and withdrawals, the multiplier',
          '[Economic growth](/economics/unit-2/economic-growth) — causes, constraints, costs and benefits',
          '[Macroeconomic objectives and policies](/economics/unit-2/macroeconomic-objectives-policies) — fiscal, monetary and supply-side policy, and the conflicts between objectives',
        ],
      },
      {
        heading: 'Unit 3: Business Behaviour (WEC13)',
        content: 'Unit 3 moves to A2 and the paper changes shape: the short-answer section disappears, and you write two essays instead of one, chosen from three. Five areas of content — one fewer than the other units:',
        list: [
          '[Types and sizes of businesses](/economics/unit-3/types-sizes-businesses)',
          '[Revenue, costs and profits](/economics/unit-3/revenue-costs-profits)',
          '[Market structures and contestability](/economics/unit-3/market-structures-contestability)',
          '[Labour markets](/economics/unit-3/labour-markets)',
          '[Government intervention](/economics/unit-3/government-intervention-firms)',
        ],
        cta: { label: 'Start revising Unit 3', href: '/economics/unit-3/types-sizes-businesses' },
      },
      {
        heading: 'Unit 4: Developments in the Global Economy (WEC14)',
        content: 'Unit 4 has the same shape as Unit 3 — multiple choice, a source booklet and two essays from three — across six areas of content:',
        list: [
          '[Causes and effects of globalisation](/economics/unit-4/causes-effects-globalisation)',
          '[Trade and the global economy](/economics/unit-4/trade-global-economy)',
          '[Balance of payments, exchange rates and international competitiveness](/economics/unit-4/balance-payments-exchange-rates)',
          '[Poverty and inequality](/economics/unit-4/poverty-inequality)',
          '[The role of the state in the macroeconomy](/economics/unit-4/role-state-macroeconomy)',
          '[Growth and development in developing, emerging and developed economies](/economics/unit-4/growth-development)',
        ],
        cta: { label: 'Start revising Unit 4', href: '/economics/unit-4/causes-effects-globalisation' },
      },
      {
        heading: 'How to Revise Edexcel IAL Economics Effectively',
        content: 'The paper structure tells you how to split your time. Multiple choice and short answers reward recall, so definitions and diagrams need to be automatic. The source booklet and the essays reward judgement, which only improves by writing. Practise diagrams until you can draw and label them from memory in under a minute, then spend the bulk of your time on data questions and timed essay plans against [past papers](/past-papers). Because the essays come from a choice, it pays to know which topics you answer well — but not to gamble on a narrow few.',
        cta: { label: 'Start with Unit 1: Markets in Action', href: '/economics/unit-1/introductory-concepts' },
      },
      {
        heading: 'Common Mistakes to Avoid',
        content: 'Most lost marks in IAL Economics come from habits rather than gaps in knowledge:',
        list: [
          'Unlabelled or half-labelled diagrams — an axis without a label is a diagram without marks',
          'Confusing a percentage change with a percentage point change, which the data extracts set up deliberately',
          'Treating index numbers as percentages, or comparing two index series with different base years',
          'Writing about the data question without quoting the data, which forfeits the application marks',
          'One-sided essays — a 20-mark answer with no counter-argument cannot reach the top bands',
          'Spending essay time on the six multiple-choice marks, or leaving the 34-mark data question until the clock has gone',
        ],
        cta: { label: 'Work through past paper questions', href: '/past-papers' },
      },
    ],
    relatedTopics: [
      { title: 'Economics Unit 1 Notes', href: '/economics/unit-1' },
      { title: 'Economics Unit 2 Notes', href: '/economics/unit-2' },
      { title: 'Economics Unit 3 Notes', href: '/economics/unit-3' },
      { title: 'Economics Unit 4 Notes', href: '/economics/unit-4' },
      { title: 'Data Response Practice', href: '/data-response' },
      { title: 'Past Papers', href: '/past-papers' },
    ],
    targetKeywords: ['edexcel IAL economics revision notes', 'IAL economics revision', 'WEC11 revision', 'WEC12 revision', 'WEC13 revision', 'WEC14 revision', 'IAL economics data response', 'edexcel IAL economics paper structure'],
  },
];

export default guidesData;
