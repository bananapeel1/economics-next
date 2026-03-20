/**
 * RICH NOTES — Economics Unit 4, Part 2 (4.3.4, 4.3.5, 4.3.6)
 * =============================================================
 * Edexcel IAL Economics Unit 4, spec points 4.3.4 – 4.3.6
 *
 * Sections:
 *   4.3.4 Poverty and Inequality             (poverty-inequality)
 *   4.3.5 The Role of the State              (role-state-macroeconomy)
 *   4.3.6 Growth and Development             (growth-development)
 *
 * Run with: node scripts/update-economics-unit4-rich-notes-part2.mjs
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL || 'https://trweeckuswgkenckeqfb.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);


/* ═══════════════════════════════════════════════════════════════
 *  4.3.4 — POVERTY AND INEQUALITY
 * ═══════════════════════════════════════════════════════════════ */

const NOTES_434 = [

  {
    title: "Absolute and Relative Poverty",
    meta: "4 concepts",
    keyIdea: "Poverty comes in two fundamentally different forms — absolute poverty is about survival, while relative poverty is about social exclusion — and tackling one does not necessarily tackle the other.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          { type: "def", text: "<strong>Absolute poverty</strong> — inability to afford the basic necessities of life (food, shelter, clean water); often defined as living on less than $2.15/day (World Bank).", tag: "exam" },
          { type: "def", text: "<strong>Relative poverty</strong> — having an income significantly below the average for that society; typically defined as below 60% of median household income." }
        ]
      },
      {
        title: "KEY DISTINCTIONS",
        items: [
          { type: "mech", text: "Economic growth can reduce <strong>absolute</strong> poverty by raising incomes, but may increase <strong>relative</strong> poverty if the rich gain more from growth than the poor." },
          { type: "mech", text: "A country can have zero absolute poverty but high relative poverty (e.g. rich Nordic countries have relative poverty because some households earn much less than the median)." },
          { type: "imp", text: "Examiners expect you to specify which type of poverty you are discussing. Policies to reduce absolute poverty (economic growth, FDI) differ from policies to reduce relative poverty (redistribution, minimum wage).", tag: "exam" },
          { type: "link", text: "Poverty links to globalisation (4.3.1): export-led growth has dramatically reduced absolute poverty in East Asia, but globalisation may increase relative poverty within developed countries." }
        ]
      }
    ],
    flow: {
      steps: ["Economic growth raises average incomes", "Absolute poverty may fall", "But if gains accrue to the rich, relative poverty may rise"],
      result: "Growth is necessary but not sufficient — distribution matters for relative poverty",
      resultType: "neutral"
    },
    examMatters: "Examiners test whether you understand the distinction. Always define both types and explain why growth reduces absolute poverty more reliably than relative poverty. Use examples: China reduced absolute poverty dramatically, but inequality (Gini coefficient) has risen.",
    misconception: "Students say growth eliminates poverty. Wrong because growth reduces absolute poverty but can worsen relative poverty if inequality rises. Instead write: growth is the most powerful tool against absolute poverty, but reducing relative poverty requires deliberate redistribution and inclusive economic policies.",
    takeaway: [
      "Absolute poverty = below survival threshold; relative = below social norm.",
      "Growth reduces absolute poverty but may worsen relative poverty.",
      "Always specify which type of poverty — exam questions test this distinction."
    ]
  },

  {
    title: "Measuring Inequality: Lorenz Curve and Gini Coefficient",
    meta: "4 concepts",
    keyIdea: "The Lorenz curve shows how income is distributed across a population, and the Gini coefficient converts this visual picture into a single number — closer to 0 means more equal, closer to 1 means more unequal.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          { type: "def", text: "<strong>Lorenz curve</strong> — a diagram plotting the cumulative percentage of income against the cumulative percentage of the population, ranked from poorest to richest.", tag: "exam" },
          { type: "def", text: "<strong>Gini coefficient</strong> — the ratio of the area between the Lorenz curve and the line of perfect equality to the total area below the line; ranges from 0 (perfect equality) to 1 (perfect inequality)." }
        ]
      },
      {
        title: "INTERPRETATION",
        items: [
          { type: "mech", text: "The <strong>line of perfect equality</strong> is the 45-degree line: the bottom 20% earn 20% of income, the bottom 50% earn 50%, etc. The further the Lorenz curve bows from this line, the more unequal the distribution." },
          { type: "mech", text: "A Gini of 0.25 (e.g. Scandinavia) indicates relatively equal distribution; a Gini of 0.60+ (e.g. South Africa) indicates extreme inequality." },
          { type: "imp", text: "The Gini coefficient has limitations: it does not show where in the distribution the inequality lies (top vs bottom) and different distributions can produce the same Gini.", tag: "exam" }
        ]
      }
    ],
    flow: {
      steps: ["Rank population by income", "Plot cumulative income share (Lorenz curve)", "Calculate Gini = A/(A+B) from the diagram"],
      result: "Single number summarising income inequality for comparison over time or between countries",
      resultType: "neutral"
    },
    examMatters: "Examiners expect you to draw a Lorenz curve, label the line of equality, shade area A (between the curves), and explain what a higher Gini means. Always mention limitations: the Gini is a summary statistic that hides detail about where inequality is concentrated.",
    misconception: "Students think a lower Gini is always better. Wrong because some inequality provides incentives for work, risk-taking, and innovation. Instead write: extreme inequality is harmful (poverty, social problems), but some inequality is economically functional — it incentivises effort, enterprise, and human capital investment.",
    takeaway: [
      "Lorenz curve: bowed further from 45° line = more inequality.",
      "Gini: 0 = perfect equality, 1 = perfect inequality.",
      "Useful for comparison but hides detail — different distributions can give same Gini."
    ]
  },

  {
    title: "Causes and Consequences of Inequality",
    meta: "5 concepts",
    keyIdea: "Inequality arises from differences in factor endowments, market power, globalisation, and government policy — and its consequences range from reduced social mobility to slower long-run growth.",
    blocks: [
      {
        title: "CAUSES",
        items: [
          { type: "mech", text: "<strong>Wage differentials</strong> — differences in human capital, MRP, and bargaining power create income gaps between skilled and unskilled workers." },
          { type: "mech", text: "<strong>Wealth concentration</strong> — inherited wealth, property ownership, and returns to capital (which grow faster than wages) widen the gap." },
          { type: "mech", text: "<strong>Globalisation</strong> — skilled workers in developed countries gain from global markets while low-skilled workers face competition from cheaper labour abroad.", tag: "exam" },
          { type: "mech", text: "<strong>Tax and benefits policy</strong> — regressive taxes widen inequality; progressive taxes and transfers narrow it." }
        ]
      },
      {
        title: "CONSEQUENCES",
        items: [
          { type: "mech", text: "High inequality can reduce <strong>social mobility</strong> — children's outcomes become determined by parental wealth rather than talent or effort." },
          { type: "mech", text: "Inequality may reduce <strong>aggregate demand</strong> — the poor have a higher marginal propensity to consume, so redistributing to them boosts spending." },
          { type: "imp", text: "Evaluation: some inequality is efficient (incentivises work and enterprise), but extreme inequality can be both unjust and economically damaging.", tag: "exam" },
          { type: "link", text: "Inequality links to poverty: policies that reduce inequality (progressive taxation, minimum wages) tend to reduce relative poverty but may affect incentives to work and invest." }
        ]
      }
    ],
    flow: {
      steps: ["Wage gaps, wealth concentration, globalisation widen inequality", "Reduced social mobility and lower aggregate demand", "Government intervention: progressive tax, transfers"],
      result: "Some inequality is functional but extreme inequality harms growth and social cohesion",
      resultType: "neutral"
    },
    examMatters: "Examiners expect balanced evaluation: acknowledge that some inequality provides incentives, but argue that extreme inequality reduces social mobility, weakens aggregate demand, and can lead to social instability. Use the Gini coefficient and real-world examples.",
    misconception: "Students say inequality is always bad. Wrong because some inequality provides incentives for entrepreneurship, human capital investment, and risk-taking. Instead write: inequality up to a point is economically functional, but beyond a threshold it becomes destructive — the challenge is identifying and maintaining that balance.",
    takeaway: [
      "Key causes: wage gaps, wealth, globalisation, tax policy.",
      "Extreme inequality harms social mobility and may reduce aggregate demand.",
      "Some inequality is necessary for incentives — the debate is about how much."
    ]
  }
];


/* ═══════════════════════════════════════════════════════════════
 *  4.3.5 — THE ROLE OF THE STATE IN THE MACROECONOMY
 * ═══════════════════════════════════════════════════════════════ */

const NOTES_435 = [

  {
    title: "Public Goods and Market Failure",
    meta: "4 concepts",
    keyIdea: "The state must provide public goods because the free market will not — non-excludability and non-rivalry mean private firms cannot charge for them, creating a 'free rider' problem that only government can solve.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          { type: "def", text: "<strong>Public good</strong> — a good that is non-excludable (cannot prevent non-payers from consuming it) and non-rivalrous (one person's consumption does not reduce availability for others).", tag: "exam" },
          { type: "def", text: "<strong>Free rider problem</strong> — individuals have no incentive to pay for a public good because they can benefit from it without paying; this means private markets under-provide or fail to provide it at all." },
          { type: "def", text: "<strong>Quasi-public good</strong> — a good that has some but not all characteristics of a pure public good (e.g. roads are non-excludable but can become rivalrous when congested)." }
        ]
      },
      {
        title: "IMPLICATIONS",
        items: [
          { type: "mech", text: "Because of the free rider problem, the market would provide zero or insufficient amounts of public goods — the state must step in to fund them through <strong>taxation</strong>." },
          { type: "mech", text: "Examples include national defence, street lighting, and flood defences — goods where exclusion is impossible and consumption is non-rivalrous." },
          { type: "link", text: "This links to market failure from Unit 1: public goods represent a complete market failure where the private market produces zero output, justifying government provision." }
        ]
      }
    ],
    flow: {
      steps: ["Good is non-excludable and non-rivalrous", "Free rider problem prevents private provision", "Government provides, funded by taxation"],
      result: "State provision corrects a complete market failure",
      resultType: "good"
    },
    examMatters: "Examiners expect you to explain both characteristics (non-excludability and non-rivalry) and the free rider problem. The best answers give specific examples and explain why the market fails completely — not partially, but completely — for pure public goods.",
    misconception: "Students confuse public goods with goods provided by the public sector. A public good is defined by non-excludability and non-rivalry, not by who provides it. Healthcare is provided by the state but is not a public good (it is excludable and rivalrous). Instead write: public goods are defined by their economic characteristics, not by who provides them.",
    takeaway: [
      "Public goods: non-excludable + non-rivalrous → free rider problem.",
      "Market provides zero — state must fund through taxation.",
      "Don't confuse 'public good' (economic concept) with 'publicly provided'."
    ]
  },

  {
    title: "Merit Goods and Redistribution",
    meta: "4 concepts",
    keyIdea: "Merit goods are under-consumed because people undervalue their long-term benefits — the state intervenes through subsidies, free provision, or regulation to correct this information failure and improve equity.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          { type: "def", text: "<strong>Merit good</strong> — a good that is under-consumed relative to the socially optimal level because consumers underestimate its private benefits or ignore its positive externalities.", tag: "exam" },
          { type: "def", text: "<strong>Information failure</strong> — consumers lack full knowledge of the benefits of merit goods (e.g. education, vaccination), leading to under-consumption." }
        ]
      },
      {
        title: "GOVERNMENT INTERVENTION",
        items: [
          { type: "mech", text: "The state can <strong>subsidise</strong> merit goods to lower the price and encourage consumption (e.g. subsidised public transport, free school meals)." },
          { type: "mech", text: "Direct <strong>provision</strong>: the state provides merit goods free at the point of use (e.g. NHS healthcare, state education) to ensure universal access." },
          { type: "mech", text: "<strong>Regulation</strong>: the state can make consumption compulsory (e.g. mandatory schooling, seatbelt laws) when information failure alone is insufficient." },
          { type: "imp", text: "Merit good intervention involves a <strong>paternalistic judgement</strong> — the government decides it knows better than individuals. This raises questions about personal freedom and government competence.", tag: "exam" }
        ]
      }
    ],
    flow: {
      steps: ["Consumers undervalue long-term benefits", "Under-consumption creates welfare loss", "State subsidises, provides, or mandates consumption"],
      result: "Consumption rises toward the socially optimal level",
      resultType: "good"
    },
    examMatters: "Examiners expect you to explain the information failure and positive externalities that justify merit good intervention, then evaluate using the paternalism criticism and government failure risks.",
    misconception: "Students confuse merit goods with public goods. Merit goods are excludable and rivalrous (like private goods) but are under-consumed due to information failure. Instead write: merit goods could be provided by the market, but would be under-consumed; public goods cannot be provided by the market at all.",
    takeaway: [
      "Merit goods: under-consumed due to information failure and positive externalities.",
      "State tools: subsidies, free provision, compulsory consumption.",
      "Criticism: paternalism — who decides what is 'good' for consumers?"
    ]
  },

  {
    title: "Government Macroeconomic Intervention",
    meta: "5 concepts",
    keyIdea: "Governments use fiscal, monetary, and supply-side policies to pursue macroeconomic objectives — but trade-offs between objectives mean that achieving all goals simultaneously is rarely possible.",
    blocks: [
      {
        title: "POLICY TOOLS",
        items: [
          { type: "mech", text: "<strong>Fiscal policy</strong> — government adjusts taxation and spending to influence AD, redistribute income, and provide public services.", tag: "exam" },
          { type: "mech", text: "<strong>Monetary policy</strong> — the central bank adjusts interest rates and money supply to control inflation and stabilise the economy." },
          { type: "mech", text: "<strong>Supply-side policies</strong> — reforms that increase the productive capacity of the economy (education, deregulation, infrastructure, labour market flexibility)." }
        ]
      },
      {
        title: "TRADE-OFFS AND EVALUATION",
        items: [
          { type: "mech", text: "Expansionary policy (boosting AD) reduces unemployment but may cause inflation — the classic <strong>Phillips curve trade-off</strong>." },
          { type: "mech", text: "Fiscal stimulus works in the short run but may lead to <strong>government debt</strong> that constrains future spending." },
          { type: "imp", text: "Supply-side policies are the only approach that can achieve growth without inflation in the long run — but they are slow to take effect and politically difficult.", tag: "exam" },
          { type: "link", text: "Policy trade-offs link to macroeconomic objectives from Unit 2: low inflation, low unemployment, economic growth, and current account balance often conflict." }
        ]
      }
    ],
    flow: {
      steps: ["Government identifies macroeconomic problem", "Chooses fiscal, monetary, or supply-side tools", "Trade-offs limit what can be achieved simultaneously"],
      result: "No single policy solves all problems — a balanced approach is needed",
      resultType: "neutral"
    },
    examMatters: "Examiners expect you to evaluate policies by considering: time lags, side effects, trade-offs, and whether the problem is demand-side or supply-side. Always conclude with which policy is most appropriate for the specific scenario given.",
    misconception: "Students treat fiscal and monetary policy as interchangeable. They target different things: fiscal policy directly changes AD through G and T; monetary policy works indirectly through interest rates affecting C and I. Instead write: fiscal and monetary policy are complementary tools with different mechanisms, time lags, and side effects.",
    takeaway: [
      "Fiscal: direct AD management through taxation and spending.",
      "Monetary: indirect AD influence through interest rates.",
      "Supply-side: long-run capacity growth but slow to take effect."
    ]
  },

  {
    title: "Income Redistribution Policies",
    meta: "4 concepts",
    keyIdea: "Governments redistribute income to reduce poverty and inequality using progressive taxation, transfer payments, and targeted spending — but redistribution creates a trade-off between equity and efficiency.",
    blocks: [
      {
        title: "TOOLS OF REDISTRIBUTION",
        items: [
          { type: "mech", text: "<strong>Progressive taxation</strong> — higher earners pay a larger proportion of their income in tax, reducing post-tax inequality." },
          { type: "mech", text: "<strong>Transfer payments</strong> — welfare benefits, pensions, and tax credits transfer income from taxpayers to low-income households." },
          { type: "mech", text: "<strong>In-kind provision</strong> — free healthcare, education, and housing directly improves the living standards of the poor without cash transfers.", tag: "exam" }
        ]
      },
      {
        title: "THE EQUITY-EFFICIENCY TRADE-OFF",
        items: [
          { type: "mech", text: "High marginal tax rates may discourage work effort and enterprise — the <strong>Laffer curve</strong> argument that higher rates can reduce total tax revenue." },
          { type: "mech", text: "Generous benefits may create a <strong>poverty trap</strong> — where taking a job means losing benefits, making work pay less than staying on welfare." },
          { type: "imp", text: "The challenge is designing redistribution that reduces poverty without destroying incentives to work, save, and invest — Universal Basic Income is one proposed solution.", tag: "exam" },
          { type: "link", text: "This links to government failure: redistribution policies can have unintended consequences (poverty traps, brain drain) that partially offset the intended equity gains." }
        ]
      }
    ],
    flow: {
      steps: ["Tax high earners progressively", "Transfer to low-income households", "Trade-off: less inequality but possible disincentive effects"],
      result: "Redistribution reduces inequality but must balance equity against efficiency",
      resultType: "neutral"
    },
    examMatters: "Examiners test the equity-efficiency trade-off. Always acknowledge both sides: redistribution improves equity and can boost AD (higher MPC for poor), but excessive redistribution may damage incentives and reduce total output.",
    misconception: "Students say redistribution is always good for the economy. Wrong because high marginal tax rates can discourage enterprise and generous benefits can create poverty traps. Instead write: redistribution improves equity and can boost aggregate demand, but must be designed carefully to avoid disincentive effects that reduce economic efficiency.",
    takeaway: [
      "Tools: progressive tax, transfers, in-kind provision.",
      "Equity-efficiency trade-off: redistribution vs incentives.",
      "Poverty traps and Laffer curve arguments limit how far redistribution can go."
    ]
  }
];


/* ═══════════════════════════════════════════════════════════════
 *  4.3.6 — GROWTH AND DEVELOPMENT
 * ═══════════════════════════════════════════════════════════════ */

const NOTES_436 = [

  {
    title: "Economic Growth vs Development",
    meta: "4 concepts",
    keyIdea: "Growth measures the increase in GDP, but development is a broader concept encompassing health, education, freedom, and sustainability — a country can have growth without development if the gains are narrowly concentrated.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          { type: "def", text: "<strong>Economic growth</strong> — a sustained increase in real GDP over time; can be measured by GDP per capita to adjust for population changes.", tag: "exam" },
          { type: "def", text: "<strong>Economic development</strong> — a broader concept including improvements in living standards, health, education, political freedom, and environmental sustainability." },
          { type: "def", text: "<strong>Human Development Index (HDI)</strong> — a composite measure combining life expectancy, education (years of schooling), and GNI per capita; used to compare development across countries." }
        ]
      },
      {
        title: "WHY GROWTH ≠ DEVELOPMENT",
        items: [
          { type: "mech", text: "Growth can bypass the poor if it is concentrated in enclave sectors (e.g. oil) that employ few workers and generate profits for foreign firms." },
          { type: "mech", text: "GDP ignores <strong>distribution</strong>, environmental degradation, unpaid work, and the informal economy — all of which affect actual well-being." },
          { type: "imp", text: "HDI is preferred to GDP per capita for measuring development because it captures health and education alongside income, though it still ignores inequality and sustainability.", tag: "exam" },
          { type: "link", text: "Growth links to Unit 2's macroeconomics: policies that boost GDP (fiscal stimulus, monetary easing) may not improve development unless they also fund health, education, and infrastructure." }
        ]
      }
    ],
    flow: {
      steps: ["GDP rises (economic growth)", "But if gains go to the rich, HDI barely improves", "True development requires inclusive growth + better health/education"],
      result: "Growth is necessary but not sufficient for development",
      resultType: "neutral"
    },
    examMatters: "Examiners frequently ask you to distinguish growth from development. Use HDI as a better measure than GDP per capita, but acknowledge its limitations. The strongest answers give examples of countries with high GDP but low HDI (e.g. oil exporters) and vice versa.",
    misconception: "Students equate growth with development. Wrong because growth measures output quantity while development measures quality of life. Instead write: growth is necessary for development (it provides the resources), but not sufficient — the benefits must be distributed through investments in health, education, and social infrastructure.",
    takeaway: [
      "Growth = rising GDP; development = broader well-being (health, education, freedom).",
      "HDI is better than GDP per capita but still has limitations.",
      "Growth is necessary but not sufficient — distribution and quality of life matter."
    ]
  },

  {
    title: "Barriers to Development",
    meta: "5 concepts",
    keyIdea: "Developing countries face a web of interconnected barriers — from savings gaps and corruption to weak institutions and dependence on primary commodities — that trap them in cycles of poverty.",
    blocks: [
      {
        title: "ECONOMIC BARRIERS",
        items: [
          { type: "mech", text: "<strong>Savings gap</strong> — low incomes mean low savings, which limits domestic investment; Harrod-Domar model shows that low savings → low investment → low growth." },
          { type: "mech", text: "<strong>Primary commodity dependence</strong> — reliance on raw materials exposes economies to volatile prices and declining terms of trade (Prebisch-Singer hypothesis).", tag: "exam" },
          { type: "mech", text: "<strong>Debt burden</strong> — servicing external debt diverts government revenue from health, education, and infrastructure." }
        ]
      },
      {
        title: "NON-ECONOMIC BARRIERS",
        items: [
          { type: "mech", text: "<strong>Weak institutions</strong> — corruption, poor rule of law, and insecure property rights deter investment and misallocate resources." },
          { type: "mech", text: "<strong>Low human capital</strong> — poor education and health systems limit productivity; disease burdens (malaria, HIV) reduce the effective labour force." },
          { type: "mech", text: "<strong>Geography and climate</strong> — landlocked countries face higher trade costs; tropical climates increase disease burden and reduce agricultural productivity." },
          { type: "imp", text: "Barriers are <strong>interconnected</strong>: poverty → low savings → low investment → low growth → poverty. Breaking this cycle requires simultaneous action on multiple fronts.", tag: "exam" }
        ]
      }
    ],
    flow: {
      steps: ["Low income → low savings → low investment", "Weak institutions deter FDI", "Primary commodity dependence creates volatility"],
      result: "Poverty trap: a self-reinforcing cycle that is difficult to escape",
      resultType: "bad"
    },
    examMatters: "Examiners expect you to identify specific barriers and explain how they interact. The best answers show cause-and-effect chains (e.g. corruption → low FDI → low growth → continued poverty) rather than listing barriers in isolation.",
    misconception: "Students list barriers without explaining how they connect. Examiners reward analysis of the poverty trap mechanism — how each barrier reinforces the others. Instead write: barriers to development are interconnected; for example, low incomes lead to low savings, which limits investment, which keeps incomes low — creating a self-reinforcing poverty trap.",
    takeaway: [
      "Economic barriers: savings gap, commodity dependence, debt burden.",
      "Non-economic barriers: weak institutions, low human capital, geography.",
      "Barriers are interconnected — the poverty trap is self-reinforcing."
    ]
  },

  {
    title: "Development Strategies: Market-Led",
    meta: "4 concepts",
    keyIdea: "Market-led strategies rely on free markets, trade openness, and FDI to drive development — they worked spectacularly in East Asia but their success depends on pre-existing institutional quality.",
    blocks: [
      {
        title: "KEY STRATEGIES",
        items: [
          { type: "mech", text: "<strong>Trade liberalisation</strong> — opening to international trade allows specialisation according to comparative advantage and access to larger markets.", tag: "exam" },
          { type: "mech", text: "<strong>FDI attraction</strong> — creating a business-friendly environment (low taxes, stable regulation) to attract multinational investment, technology, and jobs." },
          { type: "mech", text: "<strong>Structural adjustment</strong> — IMF/World Bank conditions requiring privatisation, deregulation, and fiscal discipline in exchange for loans." },
          { type: "mech", text: "<strong>Microfinance</strong> — providing small loans to the poor to fund micro-enterprises, bypassing the savings gap at the individual level." }
        ]
      },
      {
        title: "EVALUATION",
        items: [
          { type: "mech", text: "East Asian 'tigers' (South Korea, Taiwan, Singapore) used export-led growth to transform from poor to high-income within a generation." },
          { type: "imp", text: "Market-led strategies assume functioning institutions (property rights, courts, regulatory capacity) that many developing countries lack — without these, markets may produce inequality and exploitation rather than broad-based growth.", tag: "exam" },
          { type: "link", text: "Links to Washington Consensus vs post-Washington Consensus debate: pure market liberalisation has given way to a more nuanced approach that includes institutional development." }
        ]
      }
    ],
    flow: {
      steps: ["Remove trade barriers, attract FDI", "Export-led growth boosts incomes", "But requires good institutions to distribute gains"],
      result: "Market-led strategies work when institutions are strong, but fail in their absence",
      resultType: "neutral"
    },
    examMatters: "Examiners expect you to evaluate market-led strategies by considering whether the preconditions exist: stable institutions, rule of law, educated workforce. Use East Asia as a success example and Sub-Saharan Africa as a case where structural adjustment programs had mixed results.",
    misconception: "Students say free markets always work. Wrong because without strong institutions, free markets can lead to corruption, inequality, and environmental degradation. Instead write: market-led strategies are effective when complemented by strong institutions, investment in human capital, and active government support for infrastructure.",
    takeaway: [
      "Market-led: trade liberalisation, FDI, structural adjustment, microfinance.",
      "East Asian success shows export-led growth can work spectacularly.",
      "Requires functioning institutions — without them, markets generate inequality."
    ]
  },

  {
    title: "Development Strategies: Interventionist",
    meta: "4 concepts",
    keyIdea: "Interventionist strategies use the state to direct development through planning, protectionism, and targeted investment — they can overcome market failures but risk government failure and corruption.",
    blocks: [
      {
        title: "KEY STRATEGIES",
        items: [
          { type: "mech", text: "<strong>Import substitution industrialisation (ISI)</strong> — protecting domestic industries with tariffs so they can grow behind a wall of protection before facing international competition.", tag: "exam" },
          { type: "mech", text: "<strong>State-led investment</strong> — government funds infrastructure (roads, energy, telecoms) that the private sector would under-provide due to externalities and long payback periods." },
          { type: "mech", text: "<strong>Buffer stock schemes</strong> — government buys and stores commodities when prices are low and sells when prices are high, stabilising farm incomes." },
          { type: "mech", text: "<strong>Aid</strong> — bilateral and multilateral aid transfers resources from rich to poor countries to fund development projects." }
        ]
      },
      {
        title: "EVALUATION",
        items: [
          { type: "mech", text: "ISI often fails in the long run: protected firms become <strong>inefficient</strong> behind tariff walls and never achieve international competitiveness." },
          { type: "mech", text: "State investment can crowd out private investment and is vulnerable to <strong>corruption and misallocation</strong> when governance is weak." },
          { type: "imp", text: "Aid can create dependency, fund corrupt regimes, and distort local markets — its effectiveness depends on governance quality and targeting.", tag: "exam" },
          { type: "link", text: "The ISI vs export-led debate mirrors the protectionism vs free trade debate from 4.3.2 — the optimal strategy likely lies between pure intervention and pure market liberalisation." }
        ]
      }
    ],
    flow: {
      steps: ["Protect infant industries, invest in infrastructure", "Domestic firms grow behind tariff wall", "Risk: inefficiency, corruption, never becoming competitive"],
      result: "Interventionist strategies can work short-term but risk government failure long-term",
      resultType: "neutral"
    },
    examMatters: "Examiners expect balanced evaluation: acknowledge that state intervention can overcome market failures (infrastructure, coordination) but carries risks of corruption, inefficiency, and aid dependency. The best answers conclude that a mixed approach — strategic state intervention within a market framework — is most effective.",
    misconception: "Students say aid always helps. Wrong because poorly targeted aid can create dependency, fund corrupt officials, and undermine local producers. Instead write: the effectiveness of aid depends on governance quality, targeting, and whether it builds capacity rather than creating dependency.",
    takeaway: [
      "Interventionist: ISI, state investment, buffer stocks, aid.",
      "ISI risks long-run inefficiency; aid risks dependency and corruption.",
      "The best approach combines strategic state intervention with market forces."
    ]
  },

  {
    title: "Sustainability and Development",
    meta: "4 concepts",
    keyIdea: "Sustainable development meets present needs without compromising future generations — it requires balancing economic growth with environmental protection and social inclusion.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          { type: "def", text: "<strong>Sustainable development</strong> — development that meets the needs of the present without compromising the ability of future generations to meet their own needs (Brundtland definition).", tag: "exam" },
          { type: "def", text: "<strong>Natural capital</strong> — the stock of natural resources (forests, fisheries, clean air, biodiversity) that provides ecosystem services essential for human well-being." }
        ]
      },
      {
        title: "THE CHALLENGE",
        items: [
          { type: "mech", text: "Rapid industrialisation in developing countries often comes at the cost of <strong>environmental degradation</strong>: deforestation, pollution, and carbon emissions." },
          { type: "mech", text: "The <strong>Environmental Kuznets Curve</strong> hypothesis suggests that pollution rises with income initially but falls after a certain income level as societies invest in clean technology and regulation." },
          { type: "mech", text: "Climate change disproportionately affects the <strong>poorest countries</strong> (flooding, drought, crop failure), creating a cruel irony where those least responsible suffer most." },
          { type: "imp", text: "The tension between growth and sustainability is central to development policy: should developing countries be asked to sacrifice growth for environmental protection when rich countries industrialised without such constraints?", tag: "exam" }
        ]
      }
    ],
    flow: {
      steps: ["Developing country industrialises rapidly", "Environmental degradation rises", "At higher income, investment in sustainability increases"],
      result: "Sustainable development requires balancing growth with environmental and social goals",
      resultType: "neutral"
    },
    examMatters: "Examiners expect you to discuss the trade-off between growth and sustainability, using the Environmental Kuznets Curve as a framework. Evaluate whether developing countries should prioritise growth now and clean up later, or pursue sustainable development from the start.",
    misconception: "Students say developing countries should stop growing to protect the environment. Wrong because absolute poverty is an immediate threat while environmental damage is often longer-term. Instead write: the challenge is to pursue green growth — development strategies that raise living standards while minimising environmental damage, supported by technology transfer and international cooperation.",
    takeaway: [
      "Sustainable development balances present needs with future generations' needs.",
      "Environmental Kuznets Curve: pollution may fall after a certain income level.",
      "Green growth + technology transfer is the policy ideal; trade-offs are inevitable."
    ]
  }
];


/* ═══════════════════════════════════════════════════════════
 *  PUSH TO SUPABASE
 * ═══════════════════════════════════════════════════════════ */

const SECTIONS = [
  { id: 'poverty-inequality',       label: '4.3.4 Poverty and Inequality',            notes: NOTES_434 },
  { id: 'role-state-macroeconomy',   label: '4.3.5 The Role of the State',            notes: NOTES_435 },
  { id: 'growth-development',        label: '4.3.6 Growth and Development',           notes: NOTES_436 },
];

async function main() {
  let allSuccess = true;
  for (const section of SECTIONS) {
    console.log(`\n── ${section.label} ──`);
    console.log(`   Section ID : ${section.id}`);
    console.log(`   Chapters   : ${section.notes.length}`);

    const { error } = await supabase
      .from('section_notes')
      .update({ data: section.notes })
      .eq('section_id', section.id);

    if (error) {
      console.error(`   ✗ FAILED: ${error.message}`);
      allSuccess = false;
    } else {
      console.log('   ✓ SUCCESS — pushed to Supabase.');
    }
  }
  console.log(allSuccess ? '\n✅ All sections updated.' : '\n⚠️  Some sections failed.');
}

main();
