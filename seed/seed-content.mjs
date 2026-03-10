import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ═══════════════════════════════════════════════════════════════
// COMMAND WORDS — Edexcel Economics
// ═══════════════════════════════════════════════════════════════

const commandWords = [
  {
    word: 'Define',
    definition: 'Give the exact meaning of a term or concept.',
    examiner_expects: 'A precise, concise definition using correct economic terminology. Usually worth 2 marks. No explanation or examples needed unless asked.',
    example: '"Define the term price elasticity of demand." — State the formula or a clear definition linking % change in quantity demanded to % change in price.',
    sort_order: 1,
  },
  {
    word: 'State',
    definition: 'Give a brief, factual answer without explanation.',
    examiner_expects: 'A short, direct answer. No elaboration required. Often worth 1 mark per point stated.',
    example: '"State two factors that cause a shift in the demand curve." — Just name them, e.g. changes in income, changes in tastes.',
    sort_order: 2,
  },
  {
    word: 'Identify',
    definition: 'Recognise and name a feature, trend, or factor.',
    examiner_expects: 'Select the correct item from data, a diagram, or a scenario. Brief — no explanation needed.',
    example: '"Identify the equilibrium price from the diagram." — Read the value directly from where supply and demand intersect.',
    sort_order: 3,
  },
  {
    word: 'Calculate',
    definition: 'Work out a numerical answer using given data, showing your working.',
    examiner_expects: 'A clear calculation with workings shown. Include the formula, substitute values, and give the final answer with correct units.',
    example: '"Calculate the price elasticity of demand." — Show: PED = % change in Qd / % change in P = -20% / 10% = -2.',
    sort_order: 4,
  },
  {
    word: 'Draw',
    definition: 'Produce a diagram or graph to illustrate an economic concept.',
    examiner_expects: 'A clearly labelled diagram with axes, curves, and key points marked (equilibrium, shifts, areas). Labels are essential for marks.',
    example: '"Draw a diagram to show the effect of an indirect tax." — Show S shifting left/up, new equilibrium, tax wedge, and deadweight loss area.',
    sort_order: 5,
  },
  {
    word: 'Outline',
    definition: 'Describe briefly the main features or points.',
    examiner_expects: 'More than just naming — give a brief description of each point but without detailed analysis. Think of it as a summary.',
    example: '"Outline how a subsidy corrects a positive externality." — Briefly describe the shift in supply, lower price, higher output moving towards social optimum.',
    sort_order: 6,
  },
  {
    word: 'Describe',
    definition: 'Give a detailed account of features, characteristics, or processes.',
    examiner_expects: 'A clear factual account of what happens, step by step or feature by feature. More detail than "outline" but no analysis of why.',
    example: '"Describe the trend in unemployment shown in the data." — State whether it rose or fell, by how much, and identify any turning points.',
    sort_order: 7,
  },
  {
    word: 'Explain',
    definition: 'Give reasons or make relationships between things clear.',
    examiner_expects: 'Not just what happens, but WHY it happens. Use chains of reasoning (because → this leads to → therefore). Link cause and effect explicitly.',
    example: '"Explain why a rise in income increases demand for normal goods." — Higher income → more purchasing power → consumers buy more → demand curve shifts right.',
    sort_order: 8,
  },
  {
    word: 'Analyse',
    definition: 'Break down an issue into its component parts and examine each in detail.',
    examiner_expects: 'Detailed chains of reasoning showing cause and effect. Use economic theory, diagrams, and real-world context. Go beyond a simple explanation — show HOW and WHY.',
    example: '"Analyse the impact of a minimum wage above the equilibrium." — Discuss: wage floor → surplus of labour (unemployment) → which workers benefit/lose → firm responses.',
    sort_order: 9,
  },
  {
    word: 'Assess',
    definition: 'Weigh up the importance, significance, or effectiveness of something.',
    examiner_expects: 'Present evidence for and against, then make a supported judgement. Consider relative importance, short-run vs long-run, and stakeholder perspectives.',
    example: '"Assess the effectiveness of indirect taxes in reducing negative externalities." — Analyse how taxes work, then evaluate limitations (inelastic demand, smuggling, regressive).',
    sort_order: 10,
  },
  {
    word: 'Evaluate',
    definition: 'Make a judgement based on evidence, considering different perspectives.',
    examiner_expects: 'The highest-level skill. Present arguments for and against, consider assumptions, short-run vs long-run, different stakeholders, and reach a reasoned conclusion. Must include a final judgement.',
    example: '"Evaluate whether supply-side policies are the best way to reduce unemployment." — Analyse supply-side policies, compare with demand-side, consider trade-offs, conclude.',
    sort_order: 11,
  },
  {
    word: 'Discuss',
    definition: 'Present different sides of an argument or issue.',
    examiner_expects: 'Similar to evaluate — examine arguments for and against. Consider different viewpoints and contexts. A balanced response with a conclusion.',
    example: '"Discuss whether economic growth always benefits an economy." — Consider benefits (jobs, income) vs costs (inequality, environment), short vs long run.',
    sort_order: 12,
  },
  {
    word: 'Distinguish',
    definition: 'Identify the differences between two or more concepts.',
    examiner_expects: 'Clear, direct comparison highlighting the key differences. Use contrasting language: "whereas", "unlike", "on the other hand".',
    example: '"Distinguish between a movement along and a shift of the demand curve." — Movement along = price change; shift = non-price factor change.',
    sort_order: 13,
  },
  {
    word: 'Compare',
    definition: 'Identify similarities and differences between two or more items.',
    examiner_expects: 'Both similarities AND differences should be addressed. Use comparative language and make direct, paired comparisons.',
    example: '"Compare fiscal and monetary policy." — Both manage AD; fiscal uses G and T, monetary uses interest rates; different time lags and side effects.',
    sort_order: 14,
  },
  {
    word: 'Justify',
    definition: 'Give reasons to support a particular view or action.',
    examiner_expects: 'Provide strong evidence and reasoning to defend a position. Explain WHY something is the best option or WHY a conclusion is valid.',
    example: '"Justify the use of subsidies to correct a positive externality." — Because marginal social benefit > marginal private benefit, subsidy closes the gap.',
    sort_order: 15,
  },
  {
    word: 'Suggest',
    definition: 'Apply your knowledge to propose a solution or possibility.',
    examiner_expects: 'Use your understanding to make a reasonable proposal. It does not have to be definitive — "suggest" allows for possibilities.',
    example: '"Suggest a reason why demand for cigarettes is price inelastic." — Addictive nature means consumers are unresponsive to price changes.',
    sort_order: 16,
  },
  {
    word: 'To what extent',
    definition: 'Consider how far a statement or claim is true.',
    examiner_expects: 'Evaluate the degree to which something is true. Consider evidence for and against, then make a balanced judgement about the extent.',
    example: '"To what extent does free trade benefit developing countries?" — Consider gains from specialisation vs dependency, terms of trade, infant industries.',
    sort_order: 17,
  },
  {
    word: 'Consider',
    definition: 'Think carefully about something, weighing up different aspects.',
    examiner_expects: 'Similar to assess or evaluate. Review the evidence, think about implications, and present a thoughtful response.',
    example: '"Consider the impact of rising inflation on different stakeholders." — Workers (real wages fall), savers (lose), borrowers (gain), firms (uncertainty).',
    sort_order: 18,
  },
];

// ═══════════════════════════════════════════════════════════════
// GLOSSARY TERMS — Units 1 & 2
// ═══════════════════════════════════════════════════════════════

const glossaryTerms = [
  // Unit 1: Introductory Concepts
  { term: 'Scarcity', definition: 'The fundamental economic problem: unlimited wants exceed finite resources, forcing choices to be made about how to allocate resources.' },
  { term: 'Opportunity cost', definition: 'The value of the next best alternative foregone when a choice is made. It represents the real cost of any decision.' },
  { term: 'Ceteris paribus', definition: 'A Latin phrase meaning "all other things being equal". Used in economic models to isolate the effect of one variable by holding all others constant.' },
  { term: 'Positive statement', definition: 'An objective, factual statement that can be tested and verified or falsified with evidence. E.g. "Inflation is 3%."' },
  { term: 'Normative statement', definition: 'A subjective statement based on opinion or value judgements that cannot be tested. Often contains "should" or "ought". E.g. "The government should reduce taxes."' },
  { term: 'Production possibility frontier', definition: 'A curve showing the maximum possible combinations of two goods that can be produced with available resources. Points inside are inefficient; points outside are unattainable.' },
  { term: 'Factors of production', definition: 'The four inputs used to produce goods and services: land (natural resources), labour (human effort), capital (machinery/equipment), and enterprise (risk-taking).' },
  { term: 'Free good', definition: 'A good that is not scarce and has no opportunity cost, such as air. It does not require resources to produce or consume.' },
  { term: 'Economic good', definition: 'A good that is scarce and has an opportunity cost. Resources must be used to produce it.' },
  { term: 'Specialisation', definition: 'When individuals, firms, or countries concentrate on producing a limited range of goods in which they have an advantage, increasing efficiency and output.' },
  { term: 'Division of labour', definition: 'Breaking the production process into separate tasks, with each worker specialising in one task, increasing productivity and efficiency.' },
  { term: 'Free market economy', definition: 'An economic system where resource allocation is determined by market forces (supply and demand) with no government intervention.' },
  { term: 'Mixed economy', definition: 'An economic system combining elements of both free market and government intervention in the allocation of resources.' },

  // Unit 1: Consumer Behaviour & Demand
  { term: 'Demand', definition: 'The quantity of a good or service that consumers are willing and able to buy at a given price in a given time period.' },
  { term: 'Effective demand', definition: 'Demand backed by the ability to pay. A want becomes effective demand only when the consumer has sufficient purchasing power.' },
  { term: 'Law of demand', definition: 'As the price of a good rises, the quantity demanded falls, and vice versa (ceteris paribus). This gives the demand curve its downward slope.' },
  { term: 'Utility', definition: 'The satisfaction or benefit a consumer derives from consuming a good or service.' },
  { term: 'Marginal utility', definition: 'The additional satisfaction gained from consuming one more unit of a good or service. It tends to diminish as consumption increases.' },
  { term: 'Diminishing marginal utility', definition: 'The principle that as a consumer consumes more units of a good, the additional satisfaction from each extra unit decreases.' },
  { term: 'Normal good', definition: 'A good for which demand increases as consumer income rises. It has a positive income elasticity of demand (YED > 0).' },
  { term: 'Inferior good', definition: 'A good for which demand decreases as consumer income rises, as consumers switch to better alternatives. It has a negative income elasticity of demand (YED < 0).' },
  { term: 'Substitute good', definition: 'A good that can be used in place of another. A rise in the price of one leads to an increase in demand for its substitute (positive XED).' },
  { term: 'Complementary good', definition: 'A good that is consumed together with another. A rise in the price of one leads to a fall in demand for its complement (negative XED).' },
  { term: 'Price elasticity of demand', definition: 'A measure of the responsiveness of quantity demanded to a change in price. PED = % change in quantity demanded ÷ % change in price.' },
  { term: 'Income elasticity of demand', definition: 'A measure of the responsiveness of demand to a change in income. YED = % change in quantity demanded ÷ % change in income.' },
  { term: 'Cross elasticity of demand', definition: 'A measure of the responsiveness of demand for one good to a change in the price of another good. XED = % change in Qd of A ÷ % change in price of B.' },
  { term: 'Consumer surplus', definition: 'The difference between what consumers are willing to pay for a good and what they actually pay. Shown as the area below the demand curve and above the market price.' },

  // Unit 1: Supply
  { term: 'Supply', definition: 'The quantity of a good or service that producers are willing and able to offer for sale at a given price in a given time period.' },
  { term: 'Law of supply', definition: 'As the price of a good rises, the quantity supplied rises, and vice versa (ceteris paribus). This gives the supply curve its upward slope.' },
  { term: 'Price elasticity of supply', definition: 'A measure of the responsiveness of quantity supplied to a change in price. PES = % change in quantity supplied ÷ % change in price.' },
  { term: 'Producer surplus', definition: 'The difference between the price a producer receives and the minimum price they would be willing to accept. Shown as the area above the supply curve and below the market price.' },

  // Unit 1: Price Determination
  { term: 'Equilibrium price', definition: 'The price at which quantity demanded equals quantity supplied. There is no tendency for the price to change at this point.' },
  { term: 'Equilibrium quantity', definition: 'The quantity bought and sold at the equilibrium price, where demand equals supply.' },
  { term: 'Excess demand', definition: 'When quantity demanded exceeds quantity supplied at the current price, creating upward pressure on price. Occurs when price is below equilibrium.' },
  { term: 'Excess supply', definition: 'When quantity supplied exceeds quantity demanded at the current price, creating downward pressure on price. Occurs when price is above equilibrium.' },
  { term: 'Price mechanism', definition: 'The system by which changes in price allocate scarce resources through three functions: rationing, signalling, and incentivising.' },

  // Unit 1: Market Failure
  { term: 'Market failure', definition: 'When the free market fails to allocate resources efficiently, resulting in a misallocation of resources and a loss of economic welfare.' },
  { term: 'Externality', definition: 'A cost or benefit that affects a third party not directly involved in the production or consumption of a good. Can be positive or negative.' },
  { term: 'Negative externality', definition: 'A cost imposed on third parties not involved in the economic transaction. E.g. pollution from a factory affecting local residents.' },
  { term: 'Positive externality', definition: 'A benefit received by third parties not involved in the economic transaction. E.g. vaccination reducing disease spread to unvaccinated people.' },
  { term: 'Private cost', definition: 'The cost of an economic activity borne by the individual or firm directly involved in the transaction.' },
  { term: 'External cost', definition: 'The cost of an economic activity borne by third parties not directly involved in the transaction. Also called a spillover cost.' },
  { term: 'Social cost', definition: 'The total cost of an economic activity, including both private costs and external costs. Social cost = private cost + external cost.' },
  { term: 'Private benefit', definition: 'The benefit of an economic activity received by the individual or firm directly involved in the transaction.' },
  { term: 'External benefit', definition: 'The benefit of an economic activity received by third parties not directly involved in the transaction. Also called a spillover benefit.' },
  { term: 'Social benefit', definition: 'The total benefit of an economic activity, including both private benefits and external benefits. Social benefit = private benefit + external benefit.' },
  { term: 'Public good', definition: 'A good that is non-excludable (cannot prevent non-payers from using it) and non-rivalrous (one person\'s use does not reduce availability for others). E.g. street lighting, national defence.' },
  { term: 'Merit good', definition: 'A good that is under-consumed in a free market because consumers underestimate its private benefits, or it generates positive externalities. E.g. education, healthcare.' },
  { term: 'Demerit good', definition: 'A good that is over-consumed in a free market because consumers underestimate its private costs, or it generates negative externalities. E.g. cigarettes, alcohol.' },
  { term: 'Free rider problem', definition: 'When individuals benefit from a good without paying for it, as they cannot be excluded. This leads to under-provision of public goods by the market.' },
  { term: 'Information failure', definition: 'When economic agents do not have perfect knowledge, leading to a misallocation of resources. Consumers or producers may make sub-optimal decisions.' },
  { term: 'Moral hazard', definition: 'When one party takes greater risks because they know another party bears the cost. E.g. insured drivers being less careful.' },
  { term: 'Deadweight loss', definition: 'The loss of economic efficiency when equilibrium is not achieved. Represented as a triangle of lost consumer and producer surplus on a diagram.' },

  // Unit 1: Government Intervention
  { term: 'Indirect tax', definition: 'A tax placed on goods and services by the government, paid by producers but typically passed on to consumers through higher prices. E.g. VAT, excise duties.' },
  { term: 'Subsidy', definition: 'A payment by the government to producers to lower costs of production, encourage output, and reduce the market price. Shifts the supply curve to the right.' },
  { term: 'Maximum price', definition: 'A legally imposed price ceiling set below the equilibrium price. Designed to make goods affordable but may cause excess demand and shortages.' },
  { term: 'Minimum price', definition: 'A legally imposed price floor set above the equilibrium price. Designed to protect producers\' incomes but may cause excess supply.' },
  { term: 'Tradable permits', definition: 'Government-issued permits allowing firms to pollute a set amount. Firms can buy and sell permits, creating a market-based incentive to reduce pollution.' },
  { term: 'Government failure', definition: 'When government intervention leads to a worse allocation of resources than the free market would have achieved, or creates new inefficiencies.' },
  { term: 'Buffer stock', definition: 'A scheme where the government buys and stores surplus goods when supply is high and sells from stocks when supply is low, aiming to stabilise prices.' },
  { term: 'Regulation', definition: 'Government rules and laws that control the behaviour of firms and individuals. E.g. pollution limits, minimum wage, product standards.' },

  // Unit 2: Measures of Economic Performance
  { term: 'Gross Domestic Product', definition: 'The total value of all goods and services produced within a country\'s borders in a given time period. The most common measure of national output.' },
  { term: 'Gross National Income', definition: 'GDP plus net income from abroad (income earned by domestic residents overseas minus income earned by foreign residents domestically).' },
  { term: 'Real GDP', definition: 'GDP adjusted for inflation, giving a more accurate picture of actual output changes over time. Measured at constant prices.' },
  { term: 'Nominal GDP', definition: 'GDP measured at current prices without adjusting for inflation. Also called money GDP. Can overstate actual growth during inflationary periods.' },
  { term: 'GDP per capita', definition: 'GDP divided by the total population. Used as an indicator of average living standards, though it does not show distribution of income.' },
  { term: 'Inflation', definition: 'A sustained increase in the general price level of goods and services over time, reducing the purchasing power of money.' },
  { term: 'Consumer Price Index', definition: 'A measure of inflation that tracks the average price change of a weighted basket of goods and services bought by a typical household.' },
  { term: 'Deflation', definition: 'A sustained decrease in the general price level. Can lead to delayed spending, falling output, and rising real debt burdens.' },
  { term: 'Disinflation', definition: 'A reduction in the rate of inflation. Prices are still rising, but at a slower rate than before.' },
  { term: 'Unemployment', definition: 'When people who are willing and able to work at the prevailing wage rate cannot find employment.' },
  { term: 'Claimant count', definition: 'A measure of unemployment based on the number of people claiming unemployment-related benefits (e.g. Jobseeker\'s Allowance).' },
  { term: 'Labour Force Survey', definition: 'An internationally standardised survey (ILO measure) that counts those without a job who have actively sought work in the past 4 weeks and are available to start.' },
  { term: 'Balance of payments', definition: 'A record of all financial transactions between a country and the rest of the world over a given period, consisting of the current account, capital account, and financial account.' },
  { term: 'Current account', definition: 'Part of the balance of payments recording trade in goods and services, investment income, and current transfers between a country and the rest of the world.' },
  { term: 'Trade deficit', definition: 'When the value of a country\'s imports exceeds the value of its exports, resulting in a negative balance of trade.' },
  { term: 'Trade surplus', definition: 'When the value of a country\'s exports exceeds the value of its imports, resulting in a positive balance of trade.' },

  // Unit 2: Aggregate Demand
  { term: 'Aggregate demand', definition: 'The total demand for goods and services in an economy at a given price level in a given time period. AD = C + I + G + (X - M).' },
  { term: 'Consumption', definition: 'Spending by households on goods and services. The largest component of aggregate demand in most economies.' },
  { term: 'Investment', definition: 'Spending by firms on capital goods (machinery, equipment, buildings) that will be used to produce goods and services in the future.' },
  { term: 'Government spending', definition: 'Spending by the government on public services, infrastructure, and transfer payments. A component of aggregate demand (G).' },
  { term: 'Net exports', definition: 'The value of a country\'s exports minus the value of its imports (X - M). Positive net exports add to aggregate demand.' },
  { term: 'Marginal propensity to consume', definition: 'The proportion of each additional pound of income that is spent on consumption. MPC = change in consumption ÷ change in income.' },
  { term: 'Marginal propensity to save', definition: 'The proportion of each additional pound of income that is saved rather than spent. MPS = change in savings ÷ change in income. MPC + MPS = 1.' },

  // Unit 2: Aggregate Supply
  { term: 'Aggregate supply', definition: 'The total output of goods and services that producers in an economy are willing and able to supply at a given price level.' },
  { term: 'Short-run aggregate supply', definition: 'Aggregate supply in the short run, which slopes upward as firms respond to higher prices by increasing output. Shifts when input costs change.' },
  { term: 'Long-run aggregate supply', definition: 'Aggregate supply in the long run, which is vertical at the full employment level of output. Shows the economy\'s productive capacity.' },
  { term: 'Full employment', definition: 'The level of employment where all those willing and able to work at the prevailing wage rate are employed. Some frictional and structural unemployment may still exist.' },

  // Unit 2: National Income
  { term: 'Circular flow of income', definition: 'A model showing how money flows between households and firms. Income flows from firms to households (as wages/rent/profit) and back as spending on goods and services.' },
  { term: 'Injections', definition: 'Additions to the circular flow of income that increase national income: investment (I), government spending (G), and exports (X).' },
  { term: 'Withdrawals', definition: 'Leakages from the circular flow of income that reduce national income: savings (S), taxation (T), and imports (M). Also called leakages.' },
  { term: 'Multiplier effect', definition: 'When an initial injection into the economy leads to a larger final increase in national income. The multiplier = 1 / (1 - MPC) or 1 / MPW.' },
  { term: 'Output gap', definition: 'The difference between actual GDP and potential GDP. A positive gap means the economy is overheating; a negative gap means spare capacity exists.' },

  // Unit 2: Economic Growth
  { term: 'Economic growth', definition: 'An increase in the real GDP of an economy over time. Short-run growth uses spare capacity; long-run growth increases productive potential.' },
  { term: 'Recession', definition: 'Two or more consecutive quarters of negative economic growth (falling real GDP). Associated with rising unemployment and falling living standards.' },
  { term: 'Potential output', definition: 'The maximum level of output an economy can sustain without generating inflationary pressure. Determined by the quantity and quality of factors of production.' },
  { term: 'Human Development Index', definition: 'A composite measure of development combining GNI per capita, life expectancy, and mean/expected years of schooling. Ranges from 0 to 1.' },

  // Unit 2: Macroeconomic Objectives & Policies
  { term: 'Fiscal policy', definition: 'The use of government spending and taxation to influence aggregate demand and the economy. Expansionary = increase G or decrease T.' },
  { term: 'Monetary policy', definition: 'The use of interest rates, money supply, and exchange rates by the central bank to influence aggregate demand. Expansionary = lower interest rates.' },
  { term: 'Supply-side policy', definition: 'Government policies aimed at increasing the productive capacity of the economy (shifting LRAS right). E.g. education, deregulation, tax reform.' },
  { term: 'Interest rate', definition: 'The cost of borrowing money and the reward for saving. Set by the central bank as a tool of monetary policy.' },
  { term: 'Exchange rate', definition: 'The price of one currency expressed in terms of another. Affects the price of imports and exports and the current account balance.' },
  { term: 'National debt', definition: 'The total amount of money owed by the government, accumulated from past budget deficits. Different from the annual budget deficit.' },
  { term: 'Budget deficit', definition: 'When government spending exceeds government revenue (taxation) in a given year. The shortfall must be financed by borrowing.' },
  { term: 'Budget surplus', definition: 'When government revenue (taxation) exceeds government spending in a given year, allowing the government to repay debt.' },
  { term: 'Demand-pull inflation', definition: 'Inflation caused by excessive aggregate demand growing faster than aggregate supply. "Too much money chasing too few goods."' },
  { term: 'Cost-push inflation', definition: 'Inflation caused by increases in the costs of production (e.g. wages, raw materials, energy), which are passed on to consumers as higher prices.' },
  { term: 'Cyclical unemployment', definition: 'Unemployment caused by a downturn in the economic cycle (recession). Demand for labour falls as firms reduce output.' },
  { term: 'Structural unemployment', definition: 'Unemployment caused by a mismatch between workers\' skills and the skills demanded by employers, often due to changes in the structure of the economy.' },
  { term: 'Frictional unemployment', definition: 'Short-term unemployment that occurs when workers are between jobs, searching for new employment. Exists even in a healthy economy.' },
];

// ═══════════════════════════════════════════════════════════════
// COMMON MISTAKES — Per Section
// ═══════════════════════════════════════════════════════════════

const commonMistakes = {
  'introductory-concepts': [
    {
      title: 'Confusing positive and normative statements',
      mistake: 'Students often say a statement is normative simply because it contains a fact they disagree with, or label a statement as positive because it sounds "reasonable".',
      correction: 'Positive statements can be tested with evidence (true or false). Normative statements contain value judgements — look for words like "should", "ought", "fair", or "better".',
      examTip: 'If the statement can be tested with data, it is positive — even if it sounds controversial. "Unemployment is 5%" is positive; "Unemployment is too high" is normative.',
    },
    {
      title: 'Forgetting opportunity cost is the NEXT BEST alternative',
      mistake: 'Students list all the things that were given up, rather than identifying the single next best alternative that was foregone.',
      correction: 'Opportunity cost is specifically the value of the next best alternative — not all alternatives combined. If you choose A over B and C, the opportunity cost is only B (the next best).',
      examTip: 'Always specify ONE alternative when discussing opportunity cost. "The opportunity cost of building a hospital is the school that could have been built instead."',
    },
    {
      title: 'Drawing the PPF incorrectly',
      mistake: 'Students draw the PPF as a straight line when it should be concave, or forget to label the axes with specific goods.',
      correction: 'A PPF is typically concave (bowed outward) because of increasing opportunity costs — resources are not perfectly adaptable between uses. Always label both axes with the two goods.',
      examTip: 'Points ON the curve = productively efficient. Points INSIDE = inefficient (unemployed resources). Points OUTSIDE = currently unattainable.',
    },
    {
      title: 'Confusing a shift of the PPF with a movement along it',
      mistake: 'Students say any change in production shifts the PPF. A reallocation of resources is a movement along the curve, not a shift.',
      correction: 'A shift outward of the PPF requires an increase in the quantity or quality of resources (e.g. new technology, more labour). Moving from an interior point to the curve is improved efficiency, not a shift.',
    },
  ],
  'consumer-behaviour-demand': [
    {
      title: 'Confusing movement along vs shift of the demand curve',
      mistake: 'Students say "demand increases" when the price falls. A fall in price causes a movement ALONG the demand curve (extension), not a shift.',
      correction: 'A change in price → movement along the curve. A change in a non-price factor (income, tastes, prices of related goods, population) → shift of the curve. Use "quantity demanded" for movements, "demand" for shifts.',
      examTip: 'Examiners specifically look for this distinction. Say "an increase in quantity demanded" for price changes, and "an increase in demand" for shifts.',
    },
    {
      title: 'Getting the PED formula sign wrong or forgetting it is usually negative',
      mistake: 'Students forget that PED is normally negative (due to the inverse relationship between price and quantity demanded) and give a positive answer.',
      correction: 'PED = % change in Qd ÷ % change in price. The answer is usually negative. For elasticity comparisons, use the absolute value: |PED| > 1 is elastic, |PED| < 1 is inelastic.',
      examTip: 'Show your working clearly. Write the formula, substitute the values, then state whether demand is elastic or inelastic.',
    },
    {
      title: 'Confusing elastic and inelastic demand',
      mistake: 'Students mix up which is which — saying demand is "elastic" when quantity demanded barely changes, or "inelastic" when it changes a lot.',
      correction: 'Elastic demand (PED > 1): quantity demanded is highly responsive to price changes — luxuries, goods with many substitutes. Inelastic demand (PED < 1): quantity demanded barely changes — necessities, addictive goods, goods with few substitutes.',
    },
    {
      title: 'Ignoring the conditions of demand when explaining shifts',
      mistake: 'Students say demand shifted but do not explain WHY or which non-price factor changed.',
      correction: 'Always identify the specific factor: changes in income, tastes/preferences, population, price of substitutes or complements, advertising, expectations of future price changes.',
      examTip: 'Use the mnemonic PASIFIC: Population, Advertising, Substitutes/complements, Income, Fashion/tastes, Interest rates, Confidence.',
    },
  ],
  'supply': [
    {
      title: 'Confusing movement along vs shift of the supply curve',
      mistake: 'Students say "supply increases" when the price rises. A rise in price causes a movement along the supply curve (extension), not a shift.',
      correction: 'A change in price → movement along the curve. A change in costs of production, technology, taxes/subsidies, or number of firms → shift of the supply curve.',
      examTip: 'Say "quantity supplied increased" for a price change, and "supply increased" only for a shift of the whole curve.',
    },
    {
      title: 'Not knowing factors that affect PES',
      mistake: 'Students struggle to explain why some goods have elastic supply and others have inelastic supply.',
      correction: 'Key factors: spare capacity (more = elastic), time period (longer = more elastic), availability of raw materials, ease of switching production, ability to store stock.',
      examTip: 'Time is the most important factor. In the momentary period, supply is perfectly inelastic. In the long run, firms can fully adjust.',
    },
    {
      title: 'Drawing supply curve shifts in the wrong direction',
      mistake: 'Students shift the supply curve to the left when costs fall, or to the right when costs rise.',
      correction: 'Lower costs → supply shifts RIGHT (more can be produced at every price). Higher costs → supply shifts LEFT (less can be produced at every price).',
    },
  ],
  'price-determination': [
    {
      title: 'Not explaining HOW the market returns to equilibrium',
      mistake: 'Students state that "the market moves to a new equilibrium" without explaining the mechanism of excess demand/supply driving price changes.',
      correction: 'Always explain the adjustment process: excess demand → upward pressure on price → quantity supplied rises, quantity demanded falls → equilibrium. Excess supply → downward pressure on price → the opposite.',
      examTip: 'Walk through the process step by step. "At the initial price, there is excess demand of X units. This puts upward pressure on price. As price rises, Qd contracts and Qs extends until a new equilibrium is reached."',
    },
    {
      title: 'Confusing consumer surplus and producer surplus on diagrams',
      mistake: 'Students label the surplus areas the wrong way around, or cannot identify them on a non-standard diagram.',
      correction: 'Consumer surplus = area BELOW the demand curve and ABOVE the market price. Producer surplus = area ABOVE the supply curve and BELOW the market price. Both are triangles at equilibrium.',
    },
    {
      title: 'Forgetting to show the shift AND the new equilibrium on diagrams',
      mistake: 'Students shift a curve but forget to mark the new equilibrium price and quantity, losing easy marks.',
      correction: 'Always mark: the original equilibrium (P₁, Q₁), the shift of the curve, and the new equilibrium (P₂, Q₂). Use arrows to show direction of change.',
      examTip: 'Diagram marks are often awarded for: correct axes labels, correct shift direction, and clearly marked new equilibrium.',
    },
  ],
  'market-failure': [
    {
      title: 'Confusing private, external, and social costs/benefits',
      mistake: 'Students mix up the components or forget that social cost = private cost + external cost.',
      correction: 'Private = cost/benefit to the decision-maker. External = cost/benefit to third parties. Social = total (private + external). The gap between private and social is the externality.',
      examTip: 'On diagrams, the vertical distance between MSC and MPC (or MSB and MPB) at any output level represents the value of the externality.',
    },
    {
      title: 'Labelling diagrams MSC/MSB incorrectly for externalities',
      mistake: 'Students draw negative externality diagrams with MSC below MPC, or positive externality diagrams with MSB below MPB.',
      correction: 'Negative externality in production: MSC is ABOVE MPC (social cost exceeds private cost). Positive externality in consumption: MSB is ABOVE MPB (social benefit exceeds private benefit).',
    },
    {
      title: 'Saying public goods "cannot be provided" by the market',
      mistake: 'Students claim public goods are impossible for the private sector to provide. Some public goods can be privately provided (e.g. lighthouses historically).',
      correction: 'The issue is under-provision, not impossibility. Because of the free rider problem, the private sector has no incentive to provide public goods at the socially optimal level, so they are under-provided or not provided at all.',
    },
    {
      title: 'Confusing merit goods with public goods',
      mistake: 'Students say education and healthcare are public goods because the government provides them.',
      correction: 'Merit goods are rivalrous and excludable (you CAN charge for them), but they are under-consumed due to information failure or positive externalities. Public goods are non-rivalrous and non-excludable. Education is a merit good, not a public good.',
      examTip: 'Ask: can you stop someone from using it? (excludable?) Does one person using it reduce availability for others? (rivalrous?) If yes to both, it is NOT a public good.',
    },
  ],
  'government-intervention': [
    {
      title: 'Not explaining the incidence of an indirect tax correctly',
      mistake: 'Students say "consumers pay the tax" or "producers pay the tax" — when in reality the burden is shared, depending on elasticity.',
      correction: 'The tax burden is shared between consumers (higher price) and producers (lower revenue per unit). The more inelastic side bears a greater share of the tax. If demand is perfectly inelastic, consumers pay it all.',
      examTip: 'On your diagram, show the tax as a shift LEFT of supply. The consumer burden = P₂ - P₁. The producer burden = P₁ - (P₂ - tax). Always identify the deadweight loss triangle.',
    },
    {
      title: 'Forgetting to discuss government failure when evaluating intervention',
      mistake: 'Students analyse the policy but fail to consider that intervention can create its own problems — bureaucracy, unintended consequences, information gaps.',
      correction: 'Always evaluate by considering: the cost of implementation, unintended consequences, regulatory capture, lack of information, and whether the intervention creates new distortions worse than the original market failure.',
    },
    {
      title: 'Confusing maximum and minimum prices',
      mistake: 'Students set a maximum price above equilibrium or a minimum price below equilibrium, which would have no effect.',
      correction: 'A maximum price (price ceiling) must be set BELOW equilibrium to have an effect — it creates excess demand. A minimum price (price floor) must be set ABOVE equilibrium — it creates excess supply.',
      examTip: 'Remember: maximum price = below equilibrium = shortage. Minimum price = above equilibrium = surplus. Draw the diagram to make this visual.',
    },
  ],
  'measures-economic-performance': [
    {
      title: 'Using nominal GDP to compare living standards over time',
      mistake: 'Students compare GDP figures from different years without adjusting for inflation, making it seem like the economy grew more than it actually did.',
      correction: 'Always use real GDP (adjusted for inflation) when comparing over time. Nominal GDP can increase simply because prices rose, not because more goods were produced.',
      examTip: 'If the question gives nominal GDP, check if a price index is provided. Real GDP = (Nominal GDP ÷ Price Index) × 100.',
    },
    {
      title: 'Assuming GDP per capita = standard of living',
      mistake: 'Students treat GDP per capita as a definitive measure of living standards, ignoring its many limitations.',
      correction: 'GDP per capita is an average — it hides income inequality. It excludes: the informal economy, non-marketed output (household work), quality of life factors (health, environment, leisure), and differences in purchasing power.',
      examTip: 'Always mention at least 2-3 limitations of GDP as a welfare measure: inequality, externalities (pollution counted as positive), non-market activity, PPP differences.',
    },
    {
      title: 'Confusing the causes of different types of unemployment',
      mistake: 'Students muddle cyclical, structural, frictional, and seasonal unemployment, or apply the wrong policy solution.',
      correction: 'Cyclical = caused by recession (fix with demand-side policy). Structural = skills mismatch (fix with supply-side policy like retraining). Frictional = between jobs (reduce with better job information). Seasonal = predictable patterns in certain industries.',
    },
    {
      title: 'Forgetting the current account has four components',
      mistake: 'Students only discuss trade in goods when asked about the current account, forgetting the other three components.',
      correction: 'The current account consists of: (1) trade in goods, (2) trade in services, (3) primary income (investment income), and (4) secondary income (transfers). A deficit in goods can be offset by a surplus in services.',
    },
  ],
  'aggregate-demand': [
    {
      title: 'Forgetting the components of AD',
      mistake: 'Students cannot recall or explain all four components of aggregate demand when asked.',
      correction: 'AD = C + I + G + (X - M). Consumption (household spending), Investment (firm spending on capital), Government spending, and Net exports (exports minus imports). Always state all four.',
      examTip: 'Consumption is typically the largest component (60-65% of AD in the UK). Investment is the most volatile component.',
    },
    {
      title: 'Confusing a movement along AD with a shift of AD',
      mistake: 'Students say a fall in the price level "increases aggregate demand" when it actually causes a movement along the AD curve.',
      correction: 'A change in the price level → movement along AD. A change in any component (C, I, G, X-M) for reasons other than the price level → shift of AD.',
    },
    {
      title: 'Not linking factors to the correct AD component',
      mistake: 'Students explain why AD shifts but fail to specify WHICH component changes.',
      correction: 'Always identify the component: "A rise in consumer confidence increases C, shifting AD right." "A fall in interest rates increases I (and C), shifting AD right." "Depreciation increases X and decreases M, shifting AD right."',
      examTip: 'Strong answers always chain: trigger → component affected → direction of AD shift → impact on price level and output.',
    },
  ],
  'aggregate-supply': [
    {
      title: 'Confusing SRAS and LRAS shifts',
      mistake: 'Students shift LRAS when they should shift SRAS, or vice versa. E.g. claiming a rise in oil prices shifts LRAS.',
      correction: 'SRAS shifts when short-run costs change (wages, raw materials, energy prices). LRAS shifts when the productive capacity of the economy changes (technology, labour force size, education, infrastructure).',
      examTip: 'Ask yourself: does this change the economy\'s maximum potential output? If yes → LRAS shift. Does it change current production costs? If yes → SRAS shift.',
    },
    {
      title: 'Drawing the LRAS as upward sloping',
      mistake: 'Students draw LRAS with an upward slope like SRAS, when in the classical model it should be vertical.',
      correction: 'In the classical model, LRAS is vertical at the full employment level of output (Yf). This means in the long run, output is determined by supply-side factors, not the price level.',
    },
    {
      title: 'Not using AD/AS diagrams to show policy effects',
      mistake: 'Students explain policies in words only and fail to support their answer with a diagram, losing marks.',
      correction: 'Always draw the AD/AS diagram to support your explanation. Show the initial equilibrium, the shift (AD or AS), and the new equilibrium with new price level and output clearly labelled.',
      examTip: 'Diagram marks are usually 2-4 marks. A correct, fully labelled diagram can make the difference between a pass and a fail on long-answer questions.',
    },
  ],
  'national-income': [
    {
      title: 'Getting the multiplier formula wrong or applying it incorrectly',
      mistake: 'Students confuse the multiplier formula or forget that it works in both directions (a withdrawal also has a multiplied negative effect).',
      correction: 'The multiplier = 1 ÷ (1 - MPC) = 1 ÷ MPW. If MPC = 0.8, the multiplier = 1 ÷ 0.2 = 5. An initial injection of £10m leads to a final increase of £50m in national income.',
      examTip: 'Remember: a HIGHER MPC means a LARGER multiplier (more respending). A higher MPW (saving, tax, imports) means a SMALLER multiplier (more leakages).',
    },
    {
      title: 'Confusing injections and withdrawals',
      mistake: 'Students list savings, taxation, and imports as injections, or investment, government spending, and exports as withdrawals.',
      correction: 'Injections ADD to the circular flow: Investment (I), Government spending (G), Exports (X). Withdrawals LEAK from the circular flow: Savings (S), Taxation (T), Imports (M).',
    },
    {
      title: 'Not understanding why the multiplier might be smaller in practice',
      mistake: 'Students calculate the theoretical multiplier but do not explain why the actual multiplier is typically smaller.',
      correction: 'In reality the multiplier is reduced by: high marginal rates of taxation, high import spending (open economy), savings increasing at higher incomes, and time lags in the transmission mechanism.',
    },
  ],
  'economic-growth': [
    {
      title: 'Confusing short-run and long-run economic growth',
      mistake: 'Students use the terms interchangeably or fail to distinguish between them in essays.',
      correction: 'Short-run growth = actual GDP increases (using spare capacity), shown by movement towards the PPF or along the AD/AS diagram. Long-run growth = potential GDP increases (expanding productive capacity), shown by outward shift of PPF or rightward shift of LRAS.',
      examTip: 'A question about "the causes of economic growth" usually wants BOTH: demand-side factors (short-run) AND supply-side factors (long-run).',
    },
    {
      title: 'Assuming economic growth is always beneficial',
      mistake: 'Students list only the benefits of growth without considering the costs and trade-offs.',
      correction: 'Costs of growth include: environmental degradation, inequality (not everyone benefits equally), inflation if demand outstrips supply, depletion of non-renewable resources, and possible worsening of the current account.',
    },
    {
      title: 'Not linking growth to the AD/AS model',
      mistake: 'Students discuss growth in abstract terms without using economic models to support their analysis.',
      correction: 'Short-run growth: rightward shift of AD (increase in C, I, G, or X-M). Long-run growth: rightward shift of LRAS (improved technology, education, infrastructure). Always draw the diagram.',
    },
  ],
  'macroeconomic-objectives-policies': [
    {
      title: 'Not discussing policy trade-offs and conflicts',
      mistake: 'Students recommend a policy without considering its negative side effects on other macroeconomic objectives.',
      correction: 'Always consider conflicts: expansionary fiscal policy may reduce unemployment but cause inflation and worsen the budget deficit. Supply-side policies improve long-run growth but take time and may increase inequality in the short run.',
      examTip: 'Top-mark answers always discuss at least one trade-off or conflict between objectives. E.g. the Phillips curve trade-off between inflation and unemployment.',
    },
    {
      title: 'Confusing fiscal and monetary policy tools',
      mistake: 'Students say "the government should lower interest rates" (monetary, done by the central bank) or "the Bank of England should increase government spending" (fiscal, done by the government).',
      correction: 'Fiscal policy = government spending (G) and taxation (T) — controlled by the government/Treasury. Monetary policy = interest rates and money supply — controlled by the central bank (Bank of England/Fed).',
    },
    {
      title: 'Ignoring time lags when evaluating policies',
      mistake: 'Students assume policies take immediate effect, when in reality there are significant time lags.',
      correction: 'Recognition lag (time to identify the problem), implementation lag (time to put policy in place), and transmission lag (time for policy to affect the economy). Monetary policy has shorter lags than fiscal policy for implementation, but fiscal policy may have a more direct impact.',
      examTip: 'Mentioning time lags in evaluation paragraphs shows sophisticated understanding and earns higher marks.',
    },
    {
      title: 'Treating supply-side policies as a homogeneous group',
      mistake: 'Students say "supply-side policies shift LRAS right" without specifying which policy or how it works.',
      correction: 'Be specific: market-based supply-side policies (deregulation, privatisation, tax cuts) vs interventionist supply-side policies (education spending, infrastructure investment, R&D subsidies). Each works through different mechanisms.',
    },
  ],
};


// ═══════════════════════════════════════════════════════════════
// SEED FUNCTION
// ═══════════════════════════════════════════════════════════════

async function seed() {
  console.log('Seeding command words...');
  const { error: cwError } = await supabase.from('command_words').insert(commandWords);
  if (cwError) {
    console.error('Command words error:', cwError.message);
  } else {
    console.log(`  ✓ ${commandWords.length} command words inserted`);
  }

  console.log('Seeding glossary terms...');
  const { error: gtError } = await supabase.from('glossary_terms').insert(glossaryTerms);
  if (gtError) {
    console.error('Glossary terms error:', gtError.message);
  } else {
    console.log(`  ✓ ${glossaryTerms.length} glossary terms inserted`);
  }

  console.log('Seeding common mistakes...');
  for (const [sectionId, data] of Object.entries(commonMistakes)) {
    const { error } = await supabase
      .from('section_common_mistakes')
      .upsert({ section_id: sectionId, data }, { onConflict: 'section_id' });
    if (error) {
      console.error(`  ✗ ${sectionId}:`, error.message);
    } else {
      console.log(`  ✓ ${sectionId}: ${data.length} mistakes`);
    }
  }

  console.log('\nDone!');
}

seed();
