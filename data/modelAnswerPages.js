/**
 * Every model-answer page there is — one row per page, and the only place a page is declared.
 *
 * Packet 12.3, E018/E019/E020. Before this file the same 32 pages were declared in three places
 * that could disagree: 22 hand-written route shells under `app/economics/` and `app/business/`,
 * a hand-listed block of 22 URLs in `app/sitemap.js`, and `SECTION_MODEL_ANSWERS_LINKS` in
 * `data/modelAnswersData.js` (21 entries — the three lists were already out of step by one).
 *
 * WHAT READS THIS FILE, and why there is exactly one table:
 *   - `app/economics/[unit]/page.jsx` and `app/business/[unit]/page.jsx` — `generateStaticParams`
 *     and `generateMetadata` (E018);
 *   - `app/sitemap.js` — the model-answer block, derived rather than typed (E020);
 *   - `SECTION_MODEL_ANSWERS_LINKS` in `data/modelAnswersData.js`, which the Practice tab reads —
 *     derived from this table filtered to sections that actually have model answers (E019/E022).
 * Adding a row here therefore adds the page, the sitemap entry and the Practice-tab link at once.
 *
 * THE CANONICALS OF THE 22 PRE-EXISTING PAGES ARE THE OLD ONES, CHARACTER FOR CHARACTER. `slug`,
 * `subtitle`, `description` and `ogDescription` were extracted from the deleted route shells by
 * script (`audit/runs/packet-12.3/shells-extracted.json`) rather than retyped, and the generator
 * asserted `/<subject>/<slug>` against each shell's own `alternates.canonical` and `openGraph.url`
 * before emitting a row. Titles are NOT carried over: E021 retitles every page, and the rule that
 * builds the title lives in one place (`modelAnswersPageTitle` below), not in 32 strings.
 *
 * `sectionId` is the app's own section id (`/?section=<id>`), which is also the key
 * `lib/lab-data-response.js` uses. It is not always the URL slug: IAL Economics 1.3.2 is
 * `consumer-behaviour-demand` and its page is `/economics/demand-model-answers`.
 *
 * Business 1.3.2 `the-market` HAS a row and no model answers. That is deliberate: the page exists
 * and serves the honest empty state, and it is absent from `SECTION_MODEL_ANSWERS_LINKS` because
 * that map decides whether the Practice tab offers a link. Do not "fix" either half.
 *
 * Economics 4.3.5 (The Role of the State in the Macroeconomy) and eleven Business sections have no
 * row, because no model answer examines them yet. Writing them is a content packet's job; a row
 * here without content would be a page that ranks for a question it cannot answer.
 */

export const MODEL_ANSWER_PAGES = Object.freeze([
  {
    subject: 'business',
    slug: 'meeting-customer-needs-model-answers',
    sectionNumber: '1.3.1',
    sectionId: 'meeting-customer-needs',
    unit: 1,
    unitCode: 'WBS11',
    topic: 'Meeting Customer Needs',
    backLink: { href: '/business/unit-1', label: 'Unit 1: Marketing & People' },
    subtitle: 'Section 1.3.1 — Annotated model answers for <strong>market segmentation</strong>, niche and mass markets, and primary market research.',
    description: 'Annotated model answers for Edexcel IAL Business meeting customer needs (1.3.1). Covers market segmentation, niche and mass markets, and primary market research with mark scheme breakdowns.',
    ogDescription: 'Step-by-step model answers for Edexcel IAL Business market segmentation and customer needs questions.',
  },
  {
    subject: 'business',
    slug: 'the-market-model-answers',
    sectionNumber: '1.3.2',
    sectionId: 'the-market',
    unit: 1,
    unitCode: 'WBS11',
    topic: 'The Market',
    backLink: { href: '/business/unit-1', label: 'Unit 1: Marketing & People' },
    subtitle: 'Section 1.3.2 — <strong>demand, supply and the elasticities</strong>. The market-research model answer that used to sit here is examined under 1.3.1 and has moved to Meeting Customer Needs.',
    description: 'Edexcel IAL Business The Market (1.3.2) covers demand, supply and the elasticities. Model answers for this topic are being written; every other Business topic is covered.',
    ogDescription: 'Edexcel IAL Business 1.3.2 — demand, supply and the elasticities. Model answers for this topic are in progress.',
  },
  {
    subject: 'business',
    slug: 'marketing-mix-model-answers',
    sectionNumber: '1.3.3',
    sectionId: 'marketing-mix-strategy',
    unit: 1,
    unitCode: 'WBS11',
    topic: 'Marketing Mix',
    backLink: { href: '/business/unit-1', label: 'Unit 1: Marketing and People' },
    subtitle: 'Section 1.3.3 — Annotated model answers for the <strong>4Ps</strong>, pricing strategies, and promotional methods in Edexcel IAL Business.',
    description: 'Annotated model answers for Edexcel IAL Business marketing mix and strategy (spec point 1.3.3), first answer free. Covers the 4Ps, pricing strategies, and promotional methods with mark scheme breakdowns and examiner tips.',
    ogDescription: 'Step-by-step model answers for Edexcel IAL Business marketing mix questions.',
  },
  {
    subject: 'business',
    slug: 'managing-people-model-answers',
    sectionNumber: '1.3.4',
    sectionId: 'managing-people',
    unit: 1,
    unitCode: 'WBS11',
    topic: 'Managing People',
    backLink: { href: '/business/unit-1', label: 'Unit 1: Marketing & People' },
    subtitle: 'Section 1.3.4 — Annotated model answers for <strong>Maslow\'s hierarchy</strong>, motivation theories, and recruitment approaches.',
    description: 'Annotated model answers for Edexcel IAL Business managing people (1.3.4). Covers Maslow\'s hierarchy, internal versus external recruitment, and financial incentives, with mark scheme breakdowns and examiner commentary.',
    ogDescription: 'Step-by-step model answers for Edexcel IAL Business motivation and recruitment questions.',
  },
  {
    subject: 'business',
    slug: 'entrepreneurs-leaders-model-answers',
    sectionNumber: '1.3.5',
    sectionId: 'entrepreneurs-leaders',
    unit: 1,
    unitCode: 'WBS11',
    topic: 'Entrepreneurs & Leaders',
    backLink: { href: '/business/unit-1', label: 'Unit 1: Marketing & People' },
    subtitle: 'Section 1.3.5 — Annotated model answers for the <strong>role of entrepreneurs</strong>, risk-taking, and the qualities needed to succeed.',
    description: 'Annotated model answers for Edexcel IAL Business entrepreneurs and leaders (1.3.5). Covers the role of the entrepreneur, risk-taking, and the qualities needed to succeed, with mark scheme breakdowns.',
    ogDescription: 'Step-by-step model answers for Edexcel IAL Business entrepreneur and leadership questions.',
  },
  {
    subject: 'business',
    slug: 'raising-finance-model-answers',
    sectionNumber: '2.3.1',
    sectionId: 'planning-raising-finance',
    unit: 2,
    unitCode: 'WBS12',
    topic: 'Raising Finance',
    backLink: { href: '/business/unit-2', label: 'Unit 2: Managing Business Activities' },
    subtitle: 'Section 2.3.1 — Annotated model answers for <strong>sources of finance</strong>, venture capital, and start-up funding decisions.',
    description: 'Annotated model answers for Edexcel IAL Business raising finance (2.3.1), first answer free. Covers sources of finance, venture capital, and bank loans with mark scheme breakdowns and examiner tips.',
    ogDescription: 'Step-by-step model answers for Edexcel IAL Business sources of finance questions.',
  },
  {
    subject: 'business',
    slug: 'financial-planning-model-answers',
    sectionNumber: '2.3.2',
    sectionId: 'financial-planning',
    unit: 2,
    unitCode: 'WBS12',
    topic: 'Financial Planning',
    backLink: { href: '/business/unit-2', label: 'Unit 2: Managing Business Activities' },
    subtitle: 'Section 2.3.2 — Annotated model answers for <strong>break-even analysis</strong>: calculating the break-even point, and how useful it is for a start-up.',
    description: 'Annotated model answers for Edexcel IAL Business financial planning (2.3.2). Two break-even questions: calculating the break-even point, and its usefulness for a start-up, with mark scheme breakdowns and commentary on what earns the marks.',
    ogDescription: 'Step-by-step model answers for Edexcel IAL Business financial planning questions.',
  },
  {
    subject: 'business',
    slug: 'managing-finance-model-answers',
    sectionNumber: '2.3.3',
    sectionId: 'managing-finance',
    unit: 2,
    unitCode: 'WBS12',
    topic: 'Managing Finance',
    backLink: { href: '/business/unit-2', label: 'Unit 2: Managing Business Activities' },
    subtitle: 'Section 2.3.3 — Annotated model answers for <strong>liquidity</strong>, cash flow management, and the cash flow vs. profit debate.',
    description: 'Annotated model answers for Edexcel IAL Business managing finance (2.3.3). Covers liquidity, cash flow management, and the cash flow vs. profit debate, with mark scheme breakdowns and examiner commentary.',
    ogDescription: 'Step-by-step model answers for Edexcel IAL Business cash flow and liquidity questions.',
  },
  {
    subject: 'business',
    slug: 'resource-management-model-answers',
    sectionNumber: '2.3.4',
    sectionId: 'resource-management',
    unit: 2,
    unitCode: 'WBS12',
    topic: 'Resource Management',
    backLink: { href: '/business/unit-2', label: 'Unit 2: Managing Business Activities' },
    subtitle: 'Section 2.3.4 — Annotated model answers for <strong>lean production</strong>, JIT, and capacity utilisation.',
    description: 'Annotated model answers for Edexcel IAL Business resource management (2.3.4). Covers lean production, just-in-time (JIT), and capacity utilisation with mark scheme breakdowns.',
    ogDescription: 'Step-by-step model answers for Edexcel IAL Business lean production and JIT questions.',
  },
  {
    subject: 'business',
    slug: 'external-influences-model-answers',
    sectionNumber: '2.3.5',
    sectionId: 'external-influences',
    unit: 2,
    unitCode: 'WBS12',
    topic: 'External Influences',
    backLink: { href: '/business/unit-2', label: 'Unit 2: Managing Business Activities' },
    subtitle: 'Section 2.3.5 — Annotated model answer for <strong>interest rates</strong>: a 20-mark Evaluate essay on how a rate rise affects a UK retail business.',
    description: 'Free annotated model answer for Edexcel IAL Business external influences (2.3.5): a 20-mark Evaluate essay on how an interest rate rise affects a UK retail business, with a mark scheme breakdown and examiner commentary.',
    ogDescription: 'Step-by-step model answer for an Edexcel IAL Business external influences question — a 20-mark interest rates essay.',
  },
  {
    subject: 'economics',
    slug: 'introductory-concepts-model-answers',
    sectionNumber: '1.3.1',
    sectionId: 'introductory-concepts',
    unit: 1,
    unitCode: 'WEC11',
    topic: 'Introductory Concepts',
    backLink: { href: '/economics/unit-1', label: 'Unit 1: Markets in Action' },
    subtitle: 'Section 1.3.1 — Annotated model answers for <strong>scarcity</strong>, <strong>opportunity cost</strong>, and the basic economic problem.',
    description: 'Free annotated model answers for Edexcel IAL Economics introductory concepts (1.3.1). Covers scarcity, opportunity cost, and the basic economic problem with mark scheme breakdowns and examiner tips.',
    ogDescription: 'Step-by-step model answers for Edexcel IAL Economics scarcity and opportunity cost questions.',
  },
  {
    subject: 'economics',
    slug: 'demand-model-answers',
    sectionNumber: '1.3.2',
    sectionId: 'consumer-behaviour-demand',
    unit: 1,
    unitCode: 'WEC11',
    topic: 'Consumer Demand',
    backLink: { href: '/economics/unit-1', label: 'Unit 1: Markets in Action' },
    subtitle: 'Section 1.3.2 — Annotated model answers for <strong>price elasticity of demand</strong>, consumer behaviour, and demand analysis questions.',
    description: 'Free annotated model answers for Edexcel IAL Economics consumer behaviour and demand (1.3.2). Covers PED, income elasticity, and demand analysis with mark scheme breakdowns and examiner tips.',
    ogDescription: 'Step-by-step model answers for Edexcel IAL Economics demand and elasticity questions.',
  },
  {
    subject: 'economics',
    slug: 'supply-model-answers',
    sectionNumber: '1.3.3',
    sectionId: 'supply',
    unit: 1,
    unitCode: 'WEC11',
    topic: 'Supply',
    backLink: { href: '/economics/unit-1', label: 'Unit 1: Markets in Action' },
    subtitle: 'Section 1.3.3 — Annotated model answers for <strong>price elasticity of supply</strong>, supply shifts, and production cost questions.',
    description: 'Free annotated model answers for Edexcel IAL Economics supply (1.3.3). Covers PES, supply shifts, and production costs with mark scheme breakdowns and examiner tips.',
    ogDescription: 'Step-by-step model answers for Edexcel IAL Economics supply and PES questions.',
  },
  {
    subject: 'economics',
    slug: 'price-determination-model-answers',
    sectionNumber: '1.3.4',
    sectionId: 'price-determination',
    unit: 1,
    unitCode: 'WEC11',
    topic: 'Price Determination',
    backLink: { href: '/economics/unit-1', label: 'Unit 1: Markets in Action' },
    subtitle: 'Section 1.3.4 — Annotated model answer for <strong>maximum prices</strong>, shortages, and market equilibrium questions.',
    description: 'Free annotated model answer for Edexcel IAL Economics price determination (1.3.4). Covers maximum prices (price ceilings), shortages, and market equilibrium with a full mark scheme breakdown.',
    ogDescription: 'Step-by-step model answers for Edexcel IAL Economics price determination questions.',
  },
  {
    subject: 'economics',
    slug: 'market-failure-model-answers',
    sectionNumber: '1.3.5',
    sectionId: 'market-failure',
    unit: 1,
    unitCode: 'WEC11',
    topic: 'Market Failure',
    backLink: { href: '/economics/unit-1', label: 'Unit 1: Markets in Action' },
    subtitle: 'Section 1.3.5 — Annotated model answers for <strong>negative externalities</strong>, public goods, merit goods, and market failure questions.',
    description: 'Free annotated model answers for Edexcel IAL Economics market failure (1.3.5). Covers externalities, public goods, merit goods, and information failure with mark scheme breakdowns and examiner tips.',
    ogDescription: 'Step-by-step model answers for Edexcel IAL Economics market failure questions.',
  },
  {
    subject: 'economics',
    slug: 'government-intervention-model-answers',
    sectionNumber: '1.3.6',
    sectionId: 'government-intervention',
    unit: 1,
    unitCode: 'WEC11',
    topic: 'Government Intervention',
    backLink: { href: '/economics/unit-1', label: 'Unit 1: Markets in Action' },
    subtitle: 'Section 1.3.6 — Annotated model answers for <strong>indirect taxes</strong>, subsidies, and government intervention to correct market failure.',
    description: 'Worked model answers for Edexcel IAL Economics government intervention (1.3.6). Indirect-tax questions on correcting market failure, with annotated paragraphs and full mark scheme breakdowns.',
    ogDescription: 'Step-by-step model answers for Edexcel IAL Economics government intervention questions.',
  },
  {
    subject: 'economics',
    slug: 'economic-performance-model-answers',
    sectionNumber: '2.3.1',
    sectionId: 'measures-economic-performance',
    unit: 2,
    unitCode: 'WEC12',
    topic: 'Measures of Economic Performance',
    backLink: { href: '/economics/unit-2', label: 'Unit 2: Macroeconomic Performance & Policy' },
    subtitle: 'Section 2.3.1 — Annotated model answers for <strong>CPI</strong>, <strong>inflation</strong>, <strong>unemployment</strong>, and measuring economic performance.',
    description: 'Annotated model answers for Edexcel IAL Economics measures of economic performance (2.3.1). Covers CPI, inflation, and unemployment with mark scheme breakdowns and examiner-style commentary.',
    ogDescription: 'Step-by-step model answers for Edexcel IAL Economics inflation and unemployment questions.',
  },
  {
    subject: 'economics',
    slug: 'aggregate-demand-model-answers',
    sectionNumber: '2.3.2',
    sectionId: 'aggregate-demand',
    unit: 2,
    unitCode: 'WEC12',
    topic: 'Aggregate Demand',
    backLink: { href: '/economics/unit-2', label: 'Unit 2: Macroeconomic Performance' },
    subtitle: 'Section 2.3.2 — Annotated model answers for <strong>AD components</strong>, shifts in aggregate demand, and the multiplier effect.',
    description: 'Free annotated model answers for Edexcel IAL Economics aggregate demand (2.3.2). Covers AD components, shifts in AD, and the multiplier effect with mark scheme breakdowns and examiner tips.',
    ogDescription: 'Step-by-step model answers for Edexcel IAL Economics aggregate demand questions.',
  },
  {
    subject: 'economics',
    slug: 'aggregate-supply-model-answers',
    sectionNumber: '2.3.3',
    sectionId: 'aggregate-supply',
    unit: 2,
    unitCode: 'WEC12',
    topic: 'Aggregate Supply',
    backLink: { href: '/economics/unit-2', label: 'Unit 2: Macroeconomic Performance' },
    subtitle: 'Section 2.3.3 — Annotated model answers for <strong>supply-side policies</strong>, LRAS shifts, and non-inflationary economic growth.',
    description: 'Free annotated model answers for Edexcel IAL Economics aggregate supply (2.3.3). Covers SRAS, LRAS, supply-side policies, and non-inflationary growth with mark scheme breakdowns.',
    ogDescription: 'Step-by-step model answers for Edexcel IAL Economics aggregate supply questions.',
  },
  {
    subject: 'economics',
    slug: 'national-income-model-answers',
    sectionNumber: '2.3.4',
    sectionId: 'national-income',
    unit: 2,
    unitCode: 'WEC12',
    topic: 'National Income',
    backLink: { href: '/economics/unit-2', label: 'Unit 2: Macroeconomic Performance & Policy' },
    subtitle: 'Section 2.3.4 — Annotated model answers for the <strong>circular flow of income</strong>, injections, withdrawals, and the multiplier.',
    description: 'Free annotated model answers for Edexcel IAL Economics national income (2.3.4). Covers the circular flow model, injections, withdrawals, and multiplier with mark scheme breakdowns.',
    ogDescription: 'Step-by-step model answers for Edexcel IAL Economics circular flow and national income questions.',
  },
  {
    subject: 'economics',
    slug: 'economic-growth-model-answers',
    sectionNumber: '2.3.5',
    sectionId: 'economic-growth',
    unit: 2,
    unitCode: 'WEC12',
    topic: 'Economic Growth',
    backLink: { href: '/economics/unit-2', label: 'Unit 2: Macroeconomic Performance & Policy' },
    subtitle: 'Section 2.3.5 — Annotated model answers for <strong>actual vs potential growth</strong>, supply-side policies, and long-run economic growth.',
    description: 'Free annotated model answers for Edexcel IAL Economics economic growth (2.3.5). Covers actual vs potential growth, supply-side policies, and long-run growth with mark scheme breakdowns.',
    ogDescription: 'Step-by-step model answers for Edexcel IAL Economics growth and supply-side policy questions.',
  },
  {
    subject: 'economics',
    slug: 'macroeconomic-policies-model-answers',
    sectionNumber: '2.3.6',
    sectionId: 'macroeconomic-objectives-policies',
    unit: 2,
    unitCode: 'WEC12',
    topic: 'Macroeconomic Policies',
    backLink: { href: '/economics/unit-2', label: 'Unit 2: Macroeconomic Performance' },
    subtitle: 'Section 2.3.6 — Annotated model answers for <strong>fiscal vs monetary policy</strong>, interest rates, inflation, and unemployment questions.',
    description: 'Free annotated model answers for Edexcel IAL Economics macroeconomic policies (2.3.6). Covers fiscal policy, monetary policy, interest rates, and inflation with mark scheme breakdowns and examiner commentary.',
    ogDescription: 'Step-by-step model answers for Edexcel IAL Economics macroeconomic policy questions — 8 and 20-mark essays.',
  },
  {
    subject: 'economics',
    slug: 'types-sizes-businesses-model-answers',
    sectionNumber: '3.3.1',
    sectionId: 'types-sizes-businesses',
    unit: 3,
    unitCode: 'WEC13',
    topic: 'Types and Sizes of Businesses',
    backLink: { href: '/economics/unit-3', label: 'Unit 3: Business Behaviour' },
    subtitle: 'Section 3.3.1 — worked exam questions with mark schemes, model answers and examiner commentary.',
    description: 'Free worked Edexcel IAL Economics exam questions for Types and Sizes of Businesses (3.3.1, Unit 3 WEC13). Every question carries its command word, tariff and assessment objectives, with the mark scheme, a model answer and examiner commentary.',
    ogDescription: 'Worked Edexcel IAL Economics Types and Sizes of Businesses exam questions with mark schemes and model answers.',
  },
  {
    subject: 'economics',
    slug: 'revenue-costs-profits-model-answers',
    sectionNumber: '3.3.2',
    sectionId: 'revenue-costs-profits',
    unit: 3,
    unitCode: 'WEC13',
    topic: 'Revenue, Costs and Profits',
    backLink: { href: '/economics/unit-3', label: 'Unit 3: Business Behaviour' },
    subtitle: 'Section 3.3.2 — worked exam questions with mark schemes, model answers and examiner commentary.',
    description: 'Free worked Edexcel IAL Economics exam questions for Revenue, Costs and Profits (3.3.2, Unit 3 WEC13). Every question carries its command word, tariff and assessment objectives, with the mark scheme, a model answer and examiner commentary.',
    ogDescription: 'Worked Edexcel IAL Economics Revenue, Costs and Profits exam questions with mark schemes and model answers.',
  },
  {
    subject: 'economics',
    slug: 'market-structures-contestability-model-answers',
    sectionNumber: '3.3.3',
    sectionId: 'market-structures-contestability',
    unit: 3,
    unitCode: 'WEC13',
    topic: 'Market Structures & Contestability',
    backLink: { href: '/economics/unit-3', label: 'Unit 3: Business Behaviour' },
    subtitle: 'Section 3.3.3 — worked exam questions with mark schemes, model answers and examiner commentary.',
    description: 'Free worked Edexcel IAL Economics exam questions for Market Structures & Contestability (3.3.3, Unit 3 WEC13). Every question carries its command word, tariff and assessment objectives, with the mark scheme, a model answer and examiner commentary.',
    ogDescription: 'Worked Edexcel IAL Economics Market Structures & Contestability exam questions with mark schemes and model answers.',
  },
  {
    subject: 'economics',
    slug: 'labour-markets-model-answers',
    sectionNumber: '3.3.4',
    sectionId: 'labour-markets',
    unit: 3,
    unitCode: 'WEC13',
    topic: 'Labour Markets',
    backLink: { href: '/economics/unit-3', label: 'Unit 3: Business Behaviour' },
    subtitle: 'Section 3.3.4 — worked exam questions with mark schemes, model answers and examiner commentary.',
    description: 'Free worked Edexcel IAL Economics exam questions for Labour Markets (3.3.4, Unit 3 WEC13). Every question carries its command word, tariff and assessment objectives, with the mark scheme, a model answer and examiner commentary.',
    ogDescription: 'Worked Edexcel IAL Economics Labour Markets exam questions with mark schemes and model answers.',
  },
  {
    subject: 'economics',
    slug: 'government-intervention-firms-model-answers',
    sectionNumber: '3.3.5',
    sectionId: 'government-intervention-firms',
    unit: 3,
    unitCode: 'WEC13',
    topic: 'Government Intervention',
    backLink: { href: '/economics/unit-3', label: 'Unit 3: Business Behaviour' },
    subtitle: 'Section 3.3.5 — worked exam questions with mark schemes, model answers and examiner commentary.',
    description: 'Free worked Edexcel IAL Economics exam questions for Government Intervention (3.3.5, Unit 3 WEC13). Every question carries its command word, tariff and assessment objectives, with the mark scheme, a model answer and examiner commentary.',
    ogDescription: 'Worked Edexcel IAL Economics Government Intervention exam questions with mark schemes and model answers.',
  },
  {
    subject: 'economics',
    slug: 'causes-effects-globalisation-model-answers',
    sectionNumber: '4.3.1',
    sectionId: 'causes-effects-globalisation',
    unit: 4,
    unitCode: 'WEC14',
    topic: 'Causes and Effects of Globalisation',
    backLink: { href: '/economics/unit-4', label: 'Unit 4: Developments in the Global Economy' },
    subtitle: 'Section 4.3.1 — worked exam questions with mark schemes, model answers and examiner commentary.',
    description: 'Free worked Edexcel IAL Economics exam questions for Causes and Effects of Globalisation (4.3.1, Unit 4 WEC14). Every question carries its command word, tariff and assessment objectives, with the mark scheme, a model answer and examiner commentary.',
    ogDescription: 'Worked Edexcel IAL Economics Causes and Effects of Globalisation exam questions with mark schemes and model answers.',
  },
  {
    subject: 'economics',
    slug: 'trade-global-economy-model-answers',
    sectionNumber: '4.3.2',
    sectionId: 'trade-global-economy',
    unit: 4,
    unitCode: 'WEC14',
    topic: 'Trade and the Global Economy',
    backLink: { href: '/economics/unit-4', label: 'Unit 4: Developments in the Global Economy' },
    subtitle: 'Section 4.3.2 — worked exam questions with mark schemes, model answers and examiner commentary.',
    description: 'Free worked Edexcel IAL Economics exam questions for Trade and the Global Economy (4.3.2, Unit 4 WEC14). Every question carries its command word, tariff and assessment objectives, with the mark scheme, a model answer and examiner commentary.',
    ogDescription: 'Worked Edexcel IAL Economics Trade and the Global Economy exam questions with mark schemes and model answers.',
  },
  {
    subject: 'economics',
    slug: 'balance-payments-exchange-rates-model-answers',
    sectionNumber: '4.3.3',
    sectionId: 'balance-payments-exchange-rates',
    unit: 4,
    unitCode: 'WEC14',
    topic: 'Balance of Payments & Exchange Rates',
    backLink: { href: '/economics/unit-4', label: 'Unit 4: Developments in the Global Economy' },
    subtitle: 'Section 4.3.3 — worked exam questions with mark schemes, model answers and examiner commentary.',
    description: 'Free worked Edexcel IAL Economics exam questions for Balance of Payments & Exchange Rates (4.3.3, Unit 4 WEC14). Every question carries its command word, tariff and assessment objectives, with the mark scheme, a model answer and examiner commentary.',
    ogDescription: 'Worked Edexcel IAL Economics Balance of Payments & Exchange Rates exam questions with mark schemes and model answers.',
  },
  {
    subject: 'economics',
    slug: 'poverty-inequality-model-answers',
    sectionNumber: '4.3.4',
    sectionId: 'poverty-inequality',
    unit: 4,
    unitCode: 'WEC14',
    topic: 'Poverty and Inequality',
    backLink: { href: '/economics/unit-4', label: 'Unit 4: Developments in the Global Economy' },
    subtitle: 'Section 4.3.4 — worked exam questions with mark schemes, model answers and examiner commentary.',
    description: 'Free worked Edexcel IAL Economics exam questions for Poverty and Inequality (4.3.4, Unit 4 WEC14). Every question carries its command word, tariff and assessment objectives, with the mark scheme, a model answer and examiner commentary.',
    ogDescription: 'Worked Edexcel IAL Economics Poverty and Inequality exam questions with mark schemes and model answers.',
  },
  {
    subject: 'economics',
    slug: 'growth-development-model-answers',
    sectionNumber: '4.3.6',
    sectionId: 'growth-development',
    unit: 4,
    unitCode: 'WEC14',
    topic: 'Growth and Development',
    backLink: { href: '/economics/unit-4', label: 'Unit 4: Developments in the Global Economy' },
    subtitle: 'Section 4.3.6 — worked exam questions with mark schemes, model answers and examiner commentary.',
    description: 'Free worked Edexcel IAL Economics exam questions for Growth and Development (4.3.6, Unit 4 WEC14). Every question carries its command word, tariff and assessment objectives, with the mark scheme, a model answer and examiner commentary.',
    ogDescription: 'Worked Edexcel IAL Economics Growth and Development exam questions with mark schemes and model answers.',
  },
].map(Object.freeze));

const SUBJECT_LABEL = Object.freeze({ economics: 'Economics', business: 'Business' });

/** The page's path. The canonical of every pre-existing page, unchanged. */
export function modelAnswersPath(page) {
  return `/${page.subject}/${page.slug}`;
}

/**
 * Topics that two pages of the same subject share, so the heading can say which unit it is.
 * IAL Economics has exactly one such pair today — 1.3.6 and 3.3.5 are both called "Government
 * Intervention" — and two live pages carrying one `<title>` is a duplicate-title defect. Computed
 * from the table rather than hand-qualified, so a second collision cannot ship unqualified.
 */
const AMBIGUOUS = new Set(
  MODEL_ANSWER_PAGES.map((p) => `${p.subject}|${p.topic}`).filter(
    (k, i, all) => all.indexOf(k) !== i,
  ),
);

/**
 * E021's one title rule: "<Topic> — Exam Questions & Model Answers", so the page can rank for the
 * practice-question family and not only for "model answers". The `<h1>`, the metadata title and the
 * OG title are all built from this, which is why no row carries a title of its own.
 *
 * THE SECOND FORM, packet 12.4, E027. A page with no model answers must not promise them. Business
 * 1.3.2 `the-market` is that page: it titled itself "Exam Questions & Model Answers" over "0
 * written questions · 0 marks", which is the page telling the student one thing and showing her
 * another, on the one page whose whole job is an honest empty state.
 *
 * `hasAnswers` is passed in rather than looked up, because this file cannot read the bank — the
 * bank imports it, and the cycle would be real. Every caller already holds the answer: the routes
 * compute `writtenFor(page)` before they build the metadata, and the component receives `written`.
 * The DEFAULT IS TRUE so a caller that forgets keeps the 31 existing titles character for
 * character; only a caller that actually knows the page is empty can ask for the other form.
 */
export function modelAnswersHeading(page, { hasAnswers = true } = {}) {
  const topic = AMBIGUOUS.has(`${page.subject}|${page.topic}`)
    ? `${page.topic} (Unit ${page.unit})`
    : page.topic;
  return hasAnswers
    ? `${topic} — Exam Questions & Model Answers`
    : `${topic} — Model Answers In Progress`;
}

export function modelAnswersMetaTitle(page, opts) {
  return `${modelAnswersHeading(page, opts)} | Edexcel IAL ${SUBJECT_LABEL[page.subject]} | Revvy Learn`;
}

export function modelAnswersOgTitle(page, opts) {
  return `${modelAnswersHeading(page, opts)} | Revvy Learn`;
}

/** The row for one URL segment, or null. Used by the two dynamic routes to decide `notFound()`. */
export function modelAnswerPageFor(subject, slug) {
  return MODEL_ANSWER_PAGES.find((p) => p.subject === subject && p.slug === slug) || null;
}

/** Every row for one subject, in page order. */
export function modelAnswerPagesFor(subject) {
  return MODEL_ANSWER_PAGES.filter((p) => p.subject === subject);
}
