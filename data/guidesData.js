/**
 * SEO guide pages targeting long-tail keywords from Search Console data.
 * Each guide is a comprehensive, long-form article designed to rank for
 * keywords where RevvyLearn currently appears at position 30–90.
 */

const guidesData = [
  {
    slug: 'market-failure-complete-guide',
    subject: 'economics',
    title: 'The Complete Guide to Market Failure — Edexcel IAL Economics',
    metaTitle: 'Market Failure: Complete Edexcel IAL Economics Guide — All 6 Types Explained',
    metaDescription: 'Everything you need to know about market failure for Edexcel IAL Economics. Covers all 6 types: externalities, public goods, merit goods, demerit goods, information failure and monopoly power. With diagrams and exam tips.',
    heroSubtitle: 'A comprehensive guide to market failure for Edexcel IAL Economics Unit 1 (WEC11), covering every type of market failure with real-world examples, diagrams and exam technique.',
    sections: [
      {
        heading: 'What is Market Failure?',
        content: 'Market failure occurs when the free market mechanism leads to a misallocation of resources — where the price mechanism fails to take into account all the costs and benefits involved in the production or consumption of a good or service. In a perfectly functioning market, resources would be allocated efficiently at the point where marginal social benefit (MSB) equals marginal social cost (MSC). When this condition is not met, we have market failure.',
      },
      {
        heading: 'The 6 Types of Market Failure',
        content: 'For Edexcel IAL Economics, you need to understand six distinct types of market failure: (1) Negative externalities — costs imposed on third parties not involved in the transaction, (2) Positive externalities — benefits enjoyed by third parties, (3) Public goods — goods that are non-excludable and non-rivalrous, (4) Merit goods — goods that are underconsumed because consumers underestimate their private benefits, (5) Demerit goods — goods that are overconsumed because consumers underestimate the harm, and (6) Information failure — when economic agents lack perfect information to make rational decisions.',
      },
      {
        heading: 'Externalities Explained',
        content: 'Externalities are spillover effects of production or consumption that affect third parties who are not directly involved in the economic transaction. Negative externalities of production (e.g. factory pollution) cause the social cost to exceed private cost, leading to overproduction. Negative externalities of consumption (e.g. passive smoking) cause the social benefit to fall below private benefit. Positive externalities work in reverse — vaccination provides benefits to the wider community beyond the individual, leading to underconsumption relative to the social optimum.',
      },
      {
        heading: 'Public Goods',
        content: 'Public goods have two defining characteristics: non-excludability (you cannot prevent non-payers from benefiting) and non-rivalry (one person\'s consumption does not reduce availability for others). Classic examples include street lighting, national defence and flood defences. Because of these characteristics, the free market will not provide public goods — this is known as the free rider problem. If people can benefit without paying, they have no incentive to reveal their true preferences, and private firms cannot charge a price.',
      },
      {
        heading: 'Merit and Demerit Goods',
        content: 'Merit goods (e.g. education, healthcare, museums) are underconsumed in a free market because individuals fail to appreciate the full private and external benefits. This may be due to information failure — people do not realise how much they will benefit. Demerit goods (e.g. cigarettes, alcohol, gambling) are overconsumed because individuals underestimate the private costs (health damage) and ignore external costs (NHS burden, passive smoking). Government intervention through subsidies, taxation and regulation attempts to correct these failures.',
      },
      {
        heading: 'Information Failure',
        content: 'Information failure, or asymmetric information, occurs when one party in a transaction has more or better information than the other. This can lead to adverse selection (e.g. the second-hand car market "lemons" problem) and moral hazard (e.g. taking more risks because you are insured). Information failure means consumers and producers cannot make fully rational decisions, leading to a misallocation of resources.',
      },
      {
        heading: 'Government Intervention to Correct Market Failure',
        content: 'Governments can intervene through several methods: indirect taxation (to reduce consumption of demerit goods and internalise negative externalities), subsidies (to encourage consumption of merit goods and production with positive externalities), regulation and legislation (e.g. pollution permits, minimum standards), provision of public goods (funded through taxation), and information provision (e.g. health warnings). However, government intervention can itself lead to government failure — where intervention makes the allocation of resources worse rather than better.',
      },
      {
        heading: 'Exam Technique: Market Failure Questions',
        content: 'For Edexcel IAL, market failure questions typically ask you to identify the type of failure, draw an appropriate diagram showing the welfare loss, explain why the market outcome is inefficient, and evaluate possible government interventions. Always use the MSC/MSB framework for externality questions and remember to discuss the limitations of government intervention for higher marks. Key diagrams include: negative externality (MSC above MPC), positive externality (MSB above MPB), and the public goods characteristics diagram.',
      },
    ],
    relatedTopics: [
      { title: 'Market Failure Notes', href: '/economics/market-failure' },
      { title: 'Government Intervention', href: '/?section=government-intervention' },
      { title: 'Price Determination', href: '/?section=price-determination' },
      { title: 'Market Failure Model Answers', href: '/economics/market-failure-model-answers' },
    ],
    targetKeywords: ['complete market failure', '6 types of market failure', 'market failure IAL economics', 'market failure economics a level', 'market failure edexcel IAL'],
  },
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
  {
    slug: 'macroeconomic-objectives-guide',
    subject: 'economics',
    title: 'Macroeconomic Objectives — Edexcel IAL Economics Complete Guide',
    metaTitle: 'Macroeconomic Objectives: Edexcel IAL Economics Guide — All Objectives Explained',
    metaDescription: 'Complete guide to macroeconomic objectives for Edexcel IAL Economics. Covers economic growth, low unemployment, low inflation, balance of payments stability, and policy conflicts with diagrams.',
    heroSubtitle: 'Everything you need to know about macroeconomic objectives for Edexcel IAL Economics Unit 2 (WEC12) — including how they are measured, why they conflict, and the policies used to achieve them.',
    sections: [
      {
        heading: 'What Are Macroeconomic Objectives?',
        content: 'Macroeconomic objectives are the goals that governments aim to achieve for the economy as a whole. The main objectives are: sustained economic growth (a steady increase in real GDP), low and stable inflation (typically targeting around 2%), low unemployment (full employment, allowing for some frictional unemployment), a sustainable balance of payments (avoiding persistent current account deficits), fair distribution of income, and environmental sustainability. These objectives often conflict with one another, creating policy trade-offs.',
      },
      {
        heading: 'Economic Growth',
        content: 'Economic growth is measured by the percentage change in real GDP over time. Actual growth occurs when an economy moves closer to its production possibility frontier (PPF), while potential growth shifts the PPF outward. Short-run growth is driven by increases in aggregate demand, while long-run growth requires improvements in the productive capacity of the economy through investment, education, technology and infrastructure. The costs of growth include environmental degradation, inequality, and inflation if demand grows faster than supply.',
      },
      {
        heading: 'Inflation and Price Stability',
        content: 'Inflation is a sustained increase in the general price level, measured by CPI in the UK. Demand-pull inflation occurs when aggregate demand exceeds aggregate supply at full employment. Cost-push inflation results from increases in production costs (e.g. rising oil prices, wages, raw materials). The costs of inflation include erosion of purchasing power, uncertainty for businesses, reduced international competitiveness, and fiscal drag. Most central banks target 2% inflation as a balance between price stability and avoiding deflation.',
      },
      {
        heading: 'Unemployment',
        content: 'Unemployment is measured using the claimant count (those claiming unemployment benefits) and the ILO/Labour Force Survey (those without work, actively seeking and available). Types include: cyclical unemployment (caused by insufficient aggregate demand during recessions), structural unemployment (mismatch between workers\' skills and available jobs), frictional unemployment (short-term, between jobs), and seasonal unemployment. Full employment does not mean zero unemployment — it means only voluntary and frictional unemployment remains.',
      },
      {
        heading: 'Balance of Payments',
        content: 'The balance of payments records all financial transactions between one country and the rest of the world. The current account includes trade in goods, trade in services, primary income (investment returns) and secondary income (transfers). A current account deficit means the country imports more than it exports. Persistent deficits may indicate a loss of competitiveness, over-reliance on imports, or a strong currency making exports expensive. The Marshall-Lerner condition and J-curve effect explain how exchange rate depreciation affects the trade balance over time.',
      },
      {
        heading: 'Policy Conflicts and Trade-offs',
        content: 'The key conflict in macroeconomics is between growth/unemployment and inflation — the Phillips Curve illustrates the short-run trade-off between unemployment and inflation. Expansionary fiscal or monetary policy may reduce unemployment but risk demand-pull inflation. Contractionary policy controls inflation but may cause higher unemployment. Other conflicts include: growth vs environment, growth vs current account (rising incomes increase import spending), and low inflation vs low unemployment. Governments must prioritise objectives based on the current economic situation.',
      },
    ],
    relatedTopics: [
      { title: 'Macroeconomic Objectives & Policies Notes', href: '/?section=macroeconomic-objectives-policies' },
      { title: 'Economic Growth Notes', href: '/?section=economic-growth' },
      { title: 'Aggregate Demand Notes', href: '/?section=aggregate-demand' },
      { title: 'National Income Notes', href: '/?section=national-income' },
    ],
    targetKeywords: ['macroeconomic objectives IAL economics', 'economic growth IAL economics', 'macroeconomic objectives edexcel'],
  },
  {
    slug: 'globalisation-causes-effects',
    subject: 'economics',
    title: 'Causes and Effects of Globalisation — Edexcel IAL Economics Guide',
    metaTitle: 'Globalisation: Causes & Effects — Edexcel IAL Economics Complete Guide',
    metaDescription: 'Complete guide to the causes and effects of globalisation for Edexcel IAL Economics. Covers trade liberalisation, MNCs, advantages and disadvantages of globalisation, with evaluation and exam tips.',
    heroSubtitle: 'A comprehensive guide to globalisation for Edexcel IAL Economics Unit 4 (WEC14) — covering why globalisation has accelerated, its economic impact, and how to evaluate it in exam answers.',
    sections: [
      {
        heading: 'What is Globalisation?',
        content: 'Globalisation is the increasing interdependence and integration of the world\'s economies, societies and cultures through cross-border trade, investment, migration and the spread of technology. It means that events in one part of the world increasingly affect people and businesses in other parts. Globalisation is not new, but it has accelerated dramatically since the 1980s due to several key drivers.',
      },
      {
        heading: 'Causes of Globalisation',
        content: 'The main causes include: (1) Trade liberalisation — the reduction of tariffs, quotas and other trade barriers through organisations like the WTO and regional trade agreements, (2) Advances in technology — the internet, containerisation, and cheaper transport have reduced the cost of international trade and communication, (3) Deregulation of financial markets — allowing capital to flow more freely between countries, (4) Growth of multinational corporations (MNCs) — firms operating across borders, taking advantage of lower costs and new markets, (5) Political changes — the fall of communism opened up new markets, and (6) Migration — the movement of labour across borders in search of better opportunities.',
      },
      {
        heading: 'Effects of Globalisation on Developed Countries',
        content: 'For developed economies, globalisation brings: lower consumer prices through access to cheaper imports, greater product variety and choice, increased competition driving innovation and efficiency, access to larger export markets, and inward foreign direct investment (FDI) creating jobs. However, negative effects include: deindustrialisation as manufacturing moves to lower-cost countries, structural unemployment in declining industries, downward pressure on wages for unskilled workers, environmental concerns from increased production and transport, and cultural homogenisation.',
      },
      {
        heading: 'Effects of Globalisation on Developing Countries',
        content: 'For developing countries, potential benefits include: access to foreign capital and technology through FDI, job creation in export industries, technology transfer and skills development, higher economic growth rates, and integration into global supply chains. However, challenges include: exploitation of cheap labour and poor working conditions, environmental degradation, dependency on foreign firms that may relocate, growing inequality within countries, brain drain as skilled workers emigrate, and vulnerability to global economic shocks.',
      },
      {
        heading: 'Multinational Corporations (MNCs)',
        content: 'MNCs are firms that operate in more than one country. They are a key driver of globalisation. Benefits of MNCs to host countries include: job creation, tax revenue, technology transfer, infrastructure investment and improved productivity. Costs include: profit repatriation (profits sent back to the home country), transfer pricing to minimise tax payments, exploitation of weaker environmental and labour regulations, crowding out of local businesses, and political influence. The net impact depends on the regulatory framework of the host country.',
      },
      {
        heading: 'Evaluating Globalisation in Exam Answers',
        content: 'For Edexcel IAL evaluation questions on globalisation, consider: it depends on the country\'s level of development, the strength of its institutions and regulations, the specific industries affected, the time frame (short-run disruption vs long-run gains), and the distribution of benefits (who gains and who loses). Stronger evaluation acknowledges that globalisation is not inherently good or bad — its effects depend on context, policy choices and whether the gains are redistributed. Use real-world examples (e.g. China\'s export-led growth, deindustrialisation in the UK Midlands) to support your arguments.',
      },
    ],
    relatedTopics: [
      { title: 'Globalisation Notes', href: '/?section=causes-effects-globalisation' },
      { title: 'Trade & the Global Economy', href: '/?section=trade-global-economy' },
      { title: 'Balance of Payments & Exchange Rates', href: '/?section=balance-payments-exchange-rates' },
      { title: 'Growth & Development', href: '/?section=growth-development' },
    ],
    targetKeywords: ['causes and effects of globalisation', 'globalisation IAL economics', 'globalisation edexcel IAL'],
  },
];

export default guidesData;
