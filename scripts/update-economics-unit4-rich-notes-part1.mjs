/**
 * RICH NOTES — Economics Unit 4, Part 1 (4.3.1, 4.3.2, 4.3.3)
 * =============================================================
 * Edexcel IAL Economics Unit 4, spec points 4.3.1 – 4.3.3
 *
 * Sections:
 *   4.3.1 Causes and Effects of Globalisation     (causes-effects-globalisation)
 *   4.3.2 Trade and the Global Economy            (trade-global-economy)
 *   4.3.3 BoP, Exchange Rates & Competitiveness   (balance-payments-exchange-rates)
 *
 * Run with: node scripts/update-economics-unit4-rich-notes-part1.mjs
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL || 'https://trweeckuswgkenckeqfb.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);


/* ═══════════════════════════════════════════════════════════════
 *  4.3.1 — CAUSES AND EFFECTS OF GLOBALISATION
 * ═══════════════════════════════════════════════════════════════ */

const NOTES_431 = [

  {
    title: "What is Globalisation?",
    meta: "4 concepts",
    keyIdea: "Globalisation is the increasing integration and interdependence of national economies through trade, capital flows, migration, and technology — it is a process, not an event, and its pace has accelerated dramatically since the 1980s.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          { type: "def", text: "<strong>Globalisation</strong> — the increasing economic integration of national economies through free trade, capital mobility, migration, and the spread of technology.", tag: "exam" },
          { type: "def", text: "<strong>Multinational corporation (MNC)</strong> — a firm that operates in two or more countries, typically with headquarters in one country and production or sales operations abroad." }
        ]
      },
      {
        title: "CAUSES OF GLOBALISATION",
        items: [
          { type: "mech", text: "<strong>Trade liberalisation</strong> — reductions in tariffs and quotas through WTO negotiations and regional trade agreements (e.g. EU single market)." },
          { type: "mech", text: "<strong>Technological advances</strong> — the internet, containerisation, and cheaper air freight have dramatically reduced the cost of moving goods, services, and information." },
          { type: "mech", text: "<strong>Capital liberalisation</strong> — deregulation of financial markets allows capital to flow freely across borders, enabling foreign direct investment (FDI)." },
          { type: "mech", text: "<strong>Political changes</strong> — the collapse of the Soviet Union, China's opening up, and the expansion of the EU created new markets and production locations." }
        ]
      }
    ],
    flow: {
      steps: ["Trade barriers fall", "Transport and communication costs drop", "Capital flows freely across borders"],
      result: "National economies become increasingly integrated and interdependent",
      resultType: "neutral"
    },
    examMatters: "Examiners expect you to explain causes of globalisation and evaluate whether it is beneficial. Use specific examples (WTO rounds, containerisation, internet) rather than vague generalisations.",
    misconception: "Students treat globalisation as entirely new. Wrong because trade between nations has existed for centuries. Instead write: globalisation has accelerated since the 1980s due to technology and trade liberalisation, but international trade and capital flows have a long history.",
    takeaway: [
      "Globalisation = economic integration through trade, capital, migration, and technology.",
      "Key causes: trade liberalisation, technology, capital deregulation, political openness.",
      "It is an accelerating process, not a new phenomenon."
    ]
  },

  {
    title: "Benefits and Costs of Globalisation",
    meta: "5 concepts",
    keyIdea: "Globalisation creates winners and losers — it raises average incomes through specialisation and competition, but can widen inequality within countries and leave some workers and communities behind.",
    blocks: [
      {
        title: "BENEFITS",
        items: [
          { type: "mech", text: "<strong>Consumer benefits</strong> — greater choice, lower prices, and access to goods that could not be produced domestically." },
          { type: "mech", text: "<strong>Efficiency gains</strong> — international specialisation according to comparative advantage raises global output." },
          { type: "mech", text: "<strong>Economic growth</strong> — FDI transfers capital, technology, and management skills to developing economies, raising productivity." },
          { type: "mech", text: "<strong>Poverty reduction</strong> — export-led growth in countries like China and India has lifted hundreds of millions out of absolute poverty.", tag: "exam" }
        ]
      },
      {
        title: "COSTS",
        items: [
          { type: "mech", text: "<strong>Structural unemployment</strong> — workers in industries that cannot compete with cheap imports lose jobs and may lack the skills for new sectors." },
          { type: "mech", text: "<strong>Widening inequality</strong> — skilled workers and capital owners gain more than unskilled workers, widening the income distribution within countries." },
          { type: "mech", text: "<strong>Environmental damage</strong> — increased production and transport raise carbon emissions; some firms relocate to countries with weaker environmental regulations." },
          { type: "imp", text: "Evaluation: globalisation raises average welfare but does not raise everyone's welfare — the distribution of gains matters as much as the total size.", tag: "exam" }
        ]
      }
    ],
    flow: {
      steps: ["Markets integrate", "Specialisation raises output and lowers prices", "But some workers and communities lose out"],
      result: "Net global benefit, but unevenly distributed — creating political backlash",
      resultType: "neutral"
    },
    examMatters: "Examiners want balanced evaluation. Acknowledge that globalisation raises total welfare through specialisation, but emphasise that the gains are unevenly distributed. Use specific examples and always consider short-run vs long-run effects.",
    misconception: "Students say globalisation is either all good or all bad. Wrong because it creates winners and losers simultaneously. Instead write: globalisation increases total output through specialisation and competition, but the gains accrue disproportionately to skilled workers and capital owners, while low-skilled workers in developed countries may lose out.",
    takeaway: [
      "Benefits: lower prices, greater choice, FDI, poverty reduction through export-led growth.",
      "Costs: structural unemployment, inequality, environmental damage, loss of sovereignty.",
      "Net positive on average, but distribution of gains is highly uneven."
    ]
  },

  {
    title: "Multinational Corporations (MNCs)",
    meta: "5 concepts",
    keyIdea: "MNCs are the primary vehicle of globalisation — they bring investment, jobs, and technology to host countries, but their market power raises concerns about exploitation, tax avoidance, and political influence.",
    blocks: [
      {
        title: "WHY MNCs INVEST ABROAD",
        items: [
          { type: "mech", text: "<strong>Lower costs</strong> — cheaper labour, land, and raw materials in developing countries reduce production costs." },
          { type: "mech", text: "<strong>Market access</strong> — producing locally avoids trade barriers and allows the firm to respond to local consumer preferences." },
          { type: "mech", text: "<strong>Economies of scale</strong> — spreading production across multiple countries allows the firm to operate at a larger, more efficient scale." }
        ]
      },
      {
        title: "IMPACT ON HOST COUNTRIES",
        items: [
          { type: "mech", text: "<strong>Positive</strong>: FDI creates jobs, transfers technology and skills, generates tax revenue, and boosts exports.", tag: "exam" },
          { type: "mech", text: "<strong>Negative</strong>: profits are repatriated, local firms are crowded out, working conditions may be poor, and MNCs can use <strong>transfer pricing</strong> to minimise tax." },
          { type: "imp", text: "<strong>Transfer pricing</strong> — MNCs shift profits to low-tax jurisdictions by manipulating the prices charged between subsidiaries, reducing tax paid in the host country.", tag: "exam" },
          { type: "link", text: "MNCs link to the balance of payments (4.3.3): FDI inflows improve the capital account but profit repatriation worsens the current account." }
        ]
      }
    ],
    flow: {
      steps: ["MNC invests in host country (FDI)", "Jobs, technology, and exports increase", "But profits repatriated, tax minimised"],
      result: "Net impact depends on the balance between investment benefits and profit extraction",
      resultType: "neutral"
    },
    examMatters: "Examiners expect you to evaluate MNCs using specific arguments: FDI, technology transfer, and job creation vs profit repatriation, transfer pricing, and crowding out of local firms. Always consider whether the host government can effectively regulate MNC behaviour.",
    misconception: "Students say MNCs always exploit developing countries. Wrong because FDI often raises wages above the local average, transfers technology, and creates export opportunities. Instead write: MNCs bring significant benefits to host countries, but the distribution of gains depends on the bargaining power of the host government and the regulatory framework.",
    takeaway: [
      "MNCs invest abroad for: lower costs, market access, economies of scale.",
      "Benefits: jobs, technology transfer, tax revenue. Costs: profit repatriation, transfer pricing.",
      "Net impact depends on host-country governance and regulatory strength."
    ]
  },

  {
    title: "Trade Blocs",
    meta: "5 concepts",
    keyIdea: "Trade blocs remove barriers between members but may create them against non-members — the key question is whether they promote free trade globally or fragment the world into competing trading clubs.",
    blocks: [
      {
        title: "TYPES OF TRADE BLOC",
        items: [
          { type: "def", text: "<strong>Free trade area (FTA)</strong> — member countries remove tariffs between each other but keep their own external tariffs against non-members (e.g. USMCA/NAFTA).", tag: "exam" },
          { type: "def", text: "<strong>Customs union</strong> — members remove internal tariffs and adopt a common external tariff (CET) against non-members (e.g. EU customs union)." },
          { type: "def", text: "<strong>Single/common market</strong> — a customs union plus free movement of labour, capital, and services (e.g. EU single market)." },
          { type: "def", text: "<strong>Monetary union</strong> — members share a common currency and central bank (e.g. eurozone)." }
        ]
      },
      {
        title: "TRADE CREATION AND DIVERSION",
        items: [
          { type: "def", text: "<strong>Trade creation</strong> — a trade bloc allows consumers to switch from high-cost domestic producers to lower-cost member producers, increasing welfare.", tag: "exam" },
          { type: "def", text: "<strong>Trade diversion</strong> — the CET causes consumers to switch from low-cost non-member producers to higher-cost member producers, reducing welfare." },
          { type: "imp", text: "A trade bloc increases welfare if trade creation > trade diversion. Whether this holds depends on the CET level and how competitive member producers are." },
          { type: "link", text: "Trade blocs link to comparative advantage (4.3.2): they promote specialisation among members but may prevent specialisation with the rest of the world." }
        ]
      }
    ],
    flow: {
      steps: ["Countries form trade bloc", "Internal barriers removed → trade creation", "External barriers may cause trade diversion"],
      result: "Net benefit depends on whether trade creation outweighs trade diversion",
      resultType: "neutral"
    },
    examMatters: "Examiners expect you to use the trade creation vs trade diversion framework. Always define both terms, draw a diagram if possible, and conclude with 'it depends on' the level of the CET and the competitiveness of member producers.",
    misconception: "Students assume trade blocs always promote free trade. Wrong because while they remove barriers between members, the common external tariff may raise barriers against non-members. Instead write: trade blocs promote regional free trade but may divert trade away from more efficient non-member producers.",
    takeaway: [
      "FTA → customs union → single market → monetary union (increasing integration).",
      "Trade creation = good (switch to cheaper member producer).",
      "Trade diversion = bad (switch away from cheapest global producer due to CET)."
    ]
  }
];


/* ═══════════════════════════════════════════════════════════════
 *  4.3.2 — TRADE AND THE GLOBAL ECONOMY
 * ═══════════════════════════════════════════════════════════════ */

const NOTES_432 = [

  {
    title: "Absolute and Comparative Advantage",
    meta: "5 concepts",
    keyIdea: "Trade benefits countries even when one is more efficient at producing everything — what matters is relative efficiency (comparative advantage), not absolute superiority.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          { type: "def", text: "<strong>Absolute advantage</strong> — a country can produce a good using fewer resources than another country." },
          { type: "def", text: "<strong>Comparative advantage</strong> — a country can produce a good at a lower opportunity cost than another country; the basis of the case for free trade.", tag: "exam" }
        ]
      },
      {
        title: "THE LAW OF COMPARATIVE ADVANTAGE",
        items: [
          { type: "mech", text: "Even if Country A is better at producing both goods, trade is beneficial if each country specialises in the good where its <strong>opportunity cost is lowest</strong>." },
          { type: "mech", text: "After specialisation, total world output rises and both countries can consume beyond their individual PPFs through trade.", tag: "exam" },
          { type: "imp", text: "The terms of trade must fall between the two countries' opportunity cost ratios for both to gain — if the terms of trade favour one country too heavily, the gains are unevenly distributed." },
          { type: "link", text: "Comparative advantage links to the PPF from Unit 1: specialisation and trade allow a country to consume at a point beyond its own PPF." }
        ]
      }
    ],
    flow: {
      steps: ["Calculate opportunity costs for each good in each country", "Each country specialises in its lower-opportunity-cost good", "Trade at mutually beneficial terms of trade"],
      result: "Total world output increases; both countries can consume more",
      resultType: "good"
    },
    examMatters: "Examiners frequently ask you to calculate comparative advantage from a data table. Compare opportunity cost ratios, not absolute efficiency. The country with the lower opportunity cost has the comparative advantage in that good.",
    misconception: "Students confuse absolute and comparative advantage. Absolute advantage means producing more with the same resources; comparative advantage means producing at a lower opportunity cost. Instead write: a country always has a comparative advantage in something, even if it has an absolute disadvantage in everything — what matters is relative efficiency.",
    takeaway: [
      "Comparative advantage is based on opportunity cost, not absolute output.",
      "Specialisation and trade raise total world output beyond what autarky achieves.",
      "Both countries gain if the terms of trade lie between their opportunity cost ratios."
    ]
  },

  {
    title: "The Case for Free Trade",
    meta: "4 concepts",
    keyIdea: "Free trade promotes allocative efficiency by allowing each country to specialise according to comparative advantage, generating consumer surplus, competitive pressure, and dynamic gains — but it creates losers as well as winners.",
    blocks: [
      {
        title: "BENEFITS OF FREE TRADE",
        items: [
          { type: "mech", text: "<strong>Allocative efficiency</strong> — resources are directed to their most productive use globally; countries produce what they are relatively best at." },
          { type: "mech", text: "<strong>Lower prices and greater choice</strong> — consumers access cheaper imports and a wider variety of goods." },
          { type: "mech", text: "<strong>Economies of scale</strong> — firms can sell to a larger global market, reducing unit costs." },
          { type: "mech", text: "<strong>Dynamic gains</strong> — exposure to international competition forces firms to innovate and improve productivity over time.", tag: "exam" }
        ]
      },
      {
        title: "LIMITATIONS",
        items: [
          { type: "mech", text: "Assumptions of comparative advantage may not hold: factors are <strong>not perfectly mobile</strong>, there are transport costs, and exchange rate movements can distort trade patterns." },
          { type: "imp", text: "Free trade benefits the economy as a whole but imposes concentrated costs on specific industries and workers — the political challenge is compensating losers.", tag: "exam" }
        ]
      }
    ],
    flow: {
      steps: ["Countries remove trade barriers", "Specialisation according to comparative advantage", "Prices fall, output rises, innovation increases"],
      result: "Net global welfare gain, but adjustment costs for displaced workers and industries",
      resultType: "good"
    },
    examMatters: "Examiners expect both sides. Acknowledge the efficiency gains from free trade but evaluate by considering: structural unemployment, infant industry arguments, strategic trade policy, and whether the assumptions of comparative advantage hold in practice.",
    misconception: "Students say free trade benefits everyone. Wrong because while total welfare rises, specific workers and industries lose out. Instead write: free trade increases aggregate welfare through specialisation and competition, but creates losers who need support through retraining and social safety nets.",
    takeaway: [
      "Free trade promotes specialisation, lower prices, economies of scale, and innovation.",
      "Assumptions may not hold: immobility, transport costs, exchange rate distortions.",
      "Aggregate gains but concentrated losses — requires policies to support affected workers."
    ]
  },

  {
    title: "Protectionism",
    meta: "6 concepts",
    keyIdea: "Protectionism restricts imports to support domestic industries — but the gains for protected producers come at the cost of higher prices for consumers, reduced choice, and potential retaliation from trading partners.",
    blocks: [
      {
        title: "METHODS OF PROTECTION",
        items: [
          { type: "def", text: "<strong>Tariff</strong> — a tax on imported goods that raises their price, making domestic goods more competitive.", tag: "exam" },
          { type: "def", text: "<strong>Quota</strong> — a quantitative limit on the volume of imports allowed into a country." },
          { type: "def", text: "<strong>Subsidy to domestic producers</strong> — government payment that lowers domestic costs, enabling firms to compete with cheaper imports without raising consumer prices." },
          { type: "def", text: "<strong>Non-tariff barriers</strong> — regulations, standards, bureaucratic procedures, and licensing requirements that make it harder for foreign firms to sell in the domestic market." }
        ]
      },
      {
        title: "ARGUMENTS FOR PROTECTIONISM",
        items: [
          { type: "mech", text: "<strong>Infant industry</strong> — new industries need temporary protection to achieve economies of scale before competing with established foreign rivals." },
          { type: "mech", text: "<strong>Strategic trade policy</strong> — protect industries vital for national security or future growth (e.g. semiconductors, defence)." },
          { type: "mech", text: "<strong>Anti-dumping</strong> — tariffs counter foreign firms selling below cost to destroy domestic competition.", tag: "exam" },
          { type: "imp", text: "Evaluation: infant industry protection only works if it is <strong>temporary</strong> and the industry eventually becomes competitive — in practice, protection is hard to remove once granted." }
        ]
      },
      {
        title: "ARGUMENTS AGAINST",
        items: [
          { type: "mech", text: "Tariffs raise consumer prices and reduce welfare — the deadweight loss from a tariff is similar to that from a tax in Unit 1." },
          { type: "mech", text: "Protection invites <strong>retaliation</strong> — trading partners impose their own barriers, reducing global trade and harming everyone." },
          { type: "link", text: "Protectionism links to government failure (Unit 3): once protection is granted, industries lobby to keep it, creating rent-seeking behaviour and misallocation of resources." }
        ]
      }
    ],
    flow: {
      steps: ["Government imposes tariff/quota", "Domestic producers gain, imports fall", "Consumers pay higher prices, retaliation risk"],
      result: "Short-run gain for protected industry, long-run efficiency loss for the economy",
      resultType: "bad"
    },
    examMatters: "Examiners expect you to draw a tariff diagram: world price, tariff-inclusive price, domestic supply and demand, areas of consumer surplus loss, government revenue, and deadweight loss. Then evaluate using infant industry, strategic trade, and anti-dumping arguments.",
    misconception: "Students say tariffs help the economy. Wrong because while they help specific producers, they harm consumers through higher prices and reduce overall welfare. Instead write: tariffs redistribute from consumers to domestic producers and the government, but create a deadweight welfare loss — they are only justified in specific circumstances (infant industry, national security).",
    takeaway: [
      "Main tools: tariffs, quotas, subsidies, non-tariff barriers.",
      "Case for: infant industry (temporary), national security, anti-dumping.",
      "Case against: higher prices, deadweight loss, retaliation, rent-seeking."
    ]
  },

  {
    title: "The WTO and Trade Liberalisation",
    meta: "4 concepts",
    keyIdea: "The WTO provides the institutional framework for negotiating trade liberalisation and settling disputes — but the Doha Round's stalling shows the difficulty of reaching agreement when developing and developed nations have divergent interests.",
    blocks: [
      {
        title: "KEY CONCEPTS",
        items: [
          { type: "def", text: "<strong>World Trade Organization (WTO)</strong> — an international body that sets the rules for global trade, negotiates tariff reductions, and resolves trade disputes between member nations.", tag: "exam" },
          { type: "mech", text: "The WTO's key principles: <strong>most-favoured nation</strong> (treat all members equally), <strong>national treatment</strong> (treat imports the same as domestic goods), and <strong>reciprocity</strong> (mutual concessions)." },
          { type: "mech", text: "WTO trade rounds have progressively lowered tariffs — the average tariff on manufactured goods has fallen from around 40% after WWII to under 5% today." }
        ]
      },
      {
        title: "CHALLENGES",
        items: [
          { type: "mech", text: "The <strong>Doha Round</strong> (launched 2001) aimed to help developing nations but stalled due to disagreements over agricultural subsidies and market access." },
          { type: "imp", text: "The rise of bilateral and regional trade agreements outside the WTO reflects frustration with the multilateral process, but risks fragmenting global trade rules.", tag: "exam" },
          { type: "link", text: "WTO rules link to trade blocs (4.3.1): regional agreements must comply with WTO Article XXIV, which requires them to cover 'substantially all trade' and not raise barriers against non-members." }
        ]
      }
    ],
    flow: {
      steps: ["WTO negotiates multilateral tariff reductions", "Disputes settled through binding arbitration", "Doha Round stalls on agriculture and development"],
      result: "Significant tariff reductions historically, but multilateral progress has slowed",
      resultType: "neutral"
    },
    examMatters: "Examiners expect you to explain the WTO's role and evaluate its effectiveness. Strengths: rules-based system, dispute settlement. Weaknesses: slow progress, difficulty of consensus, limited enforcement power over large economies.",
    misconception: "Students say the WTO is irrelevant because of bilateral deals. Wrong because the WTO still provides the baseline rules for global trade and a dispute resolution mechanism. Instead write: while bilateral and regional agreements have proliferated, the WTO remains the foundation of the global trading system and its most-favoured-nation principle prevents complete fragmentation.",
    takeaway: [
      "WTO: rules-based system for multilateral trade liberalisation and dispute resolution.",
      "Key principles: most-favoured nation, national treatment, reciprocity.",
      "Doha Round stalled, but the WTO remains the institutional backbone of global trade."
    ]
  }
];


/* ═══════════════════════════════════════════════════════════════
 *  4.3.3 — BALANCE OF PAYMENTS, EXCHANGE RATES & COMPETITIVENESS
 * ═══════════════════════════════════════════════════════════════ */

const NOTES_433 = [

  {
    title: "Balance of Payments",
    meta: "5 concepts",
    keyIdea: "The balance of payments records all international transactions — the current account tracks trade in goods and services, while the financial account tracks investment flows, and they must always sum to zero.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          { type: "def", text: "<strong>Balance of payments (BoP)</strong> — a record of all financial transactions between residents of a country and the rest of the world over a given period.", tag: "exam" },
          { type: "def", text: "<strong>Current account</strong> — records trade in goods (visible trade), trade in services (invisible trade), primary income (investment income), and secondary income (transfers)." },
          { type: "def", text: "<strong>Financial (capital) account</strong> — records inflows and outflows of FDI, portfolio investment, and other financial assets." }
        ]
      },
      {
        title: "CURRENT ACCOUNT DEFICIT",
        items: [
          { type: "mech", text: "A <strong>current account deficit</strong> means the country imports more than it exports (in value) — it must be financed by a surplus on the financial account (e.g. foreign borrowing or FDI inflows)." },
          { type: "mech", text: "Causes: <strong>strong exchange rate</strong> (makes exports expensive), high domestic demand (sucks in imports), low productivity (uncompetitive exports), deindustrialisation." },
          { type: "imp", text: "A current account deficit is not necessarily a problem — it may reflect strong consumer demand or FDI flowing in. It becomes a problem if financed by unsustainable borrowing.", tag: "exam" },
          { type: "link", text: "BoP links to exchange rates: a current account deficit puts downward pressure on the currency (more currency is being sold to buy imports than is being bought for exports)." }
        ]
      }
    ],
    flow: {
      steps: ["Country imports more than it exports", "Current account deficit develops", "Financed by financial account surplus (FDI, borrowing)"],
      result: "BoP always balances — a current account deficit = financial account surplus",
      resultType: "neutral"
    },
    examMatters: "Examiners test whether you can explain causes of a current account deficit, evaluate its significance, and discuss policies to correct it. Always distinguish between the structural causes (productivity, deindustrialisation) and cyclical causes (strong demand, exchange rate movements).",
    misconception: "Students say a current account deficit is always bad. Wrong because it may be financed by productive FDI that boosts future growth. Instead write: the significance of a current account deficit depends on its cause and how it is financed — FDI-financed deficits are less concerning than debt-financed ones.",
    takeaway: [
      "Current account = trade in goods/services + income + transfers.",
      "BoP always balances: current account deficit = financial account surplus.",
      "Deficit significance depends on cause (structural vs cyclical) and financing method."
    ]
  },

  {
    title: "Exchange Rate Systems",
    meta: "5 concepts",
    keyIdea: "Exchange rates can be determined by the market (floating), fixed by the government (pegged), or managed within a band — each system offers a different trade-off between stability and flexibility.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          { type: "def", text: "<strong>Floating exchange rate</strong> — determined by supply and demand for the currency in the foreign exchange market, with no government intervention.", tag: "exam" },
          { type: "def", text: "<strong>Fixed exchange rate</strong> — pegged to another currency (or gold) by the central bank, which buys or sells its own currency to maintain the rate." },
          { type: "def", text: "<strong>Managed float</strong> — primarily market-determined, but the central bank intervenes occasionally to prevent excessive volatility or misalignment." }
        ]
      },
      {
        title: "EVALUATION",
        items: [
          { type: "mech", text: "<strong>Floating</strong>: automatic adjustment (depreciation corrects deficits), monetary policy independence, but exchange rate volatility can deter trade and investment." },
          { type: "mech", text: "<strong>Fixed</strong>: stability encourages trade and investment, disciplines inflation, but requires large reserves and sacrifices monetary policy independence.", tag: "exam" },
          { type: "mech", text: "In practice most major currencies float with occasional central bank intervention — a managed float attempts to combine flexibility with stability." },
          { type: "link", text: "Exchange rate systems link to macroeconomic policy (Unit 2): under a fixed rate, monetary policy is constrained because interest rates must be used to defend the peg rather than manage domestic demand." }
        ]
      }
    ],
    flow: {
      steps: ["Floating: supply & demand set rate", "Fixed: central bank defends the peg", "Managed: market with occasional intervention"],
      result: "Trade-off between exchange rate stability and monetary policy independence",
      resultType: "neutral"
    },
    examMatters: "Examiners expect you to compare floating and fixed systems using: stability vs flexibility, automatic adjustment vs reserves requirement, and monetary policy independence. The best answers use real-world examples (e.g. eurozone as a fixed system, USD/GBP as floating).",
    misconception: "Students think floating rates are always volatile. While they fluctuate day-to-day, long-term trends reflect economic fundamentals. Instead write: floating rates adjust to reflect changes in relative productivity, inflation, and capital flows — short-term volatility can be managed with hedging, while long-term movements provide useful signals about competitiveness.",
    takeaway: [
      "Floating: auto-adjustment, monetary independence, but volatility risk.",
      "Fixed: stability, trade confidence, but sacrifices monetary policy.",
      "Most currencies use a managed float in practice."
    ]
  },

  {
    title: "Exchange Rate Determination",
    meta: "4 concepts",
    keyIdea: "Under a floating system, exchange rates are driven by the demand and supply of currency — which in turn reflect trade flows, capital flows, speculation, and central bank interest rates.",
    blocks: [
      {
        title: "DEMAND AND SUPPLY",
        items: [
          { type: "mech", text: "<strong>Demand for a currency</strong> comes from: exports (foreigners need the currency to buy goods), FDI inflows, portfolio investment, and tourism income." },
          { type: "mech", text: "<strong>Supply of a currency</strong> comes from: imports (residents sell the currency to buy foreign goods), FDI outflows, portfolio investment abroad, and tourism spending abroad." }
        ]
      },
      {
        title: "FACTORS CAUSING CHANGES",
        items: [
          { type: "mech", text: "<strong>Interest rate differentials</strong> — higher domestic interest rates attract 'hot money' inflows, increasing demand for the currency and causing appreciation.", tag: "exam" },
          { type: "mech", text: "<strong>Relative inflation</strong> — higher domestic inflation makes exports less competitive, reducing demand for the currency and causing depreciation." },
          { type: "mech", text: "<strong>Speculation</strong> — if traders expect a currency to appreciate, they buy it now, creating a self-fulfilling prophecy (and vice versa)." },
          { type: "link", text: "Exchange rate changes link to AD from Unit 2: a depreciation makes exports cheaper (increasing X) and imports more expensive (reducing M), shifting AD right." }
        ]
      }
    ],
    flow: {
      steps: ["Higher interest rates attract capital inflows", "Demand for currency rises", "Currency appreciates"],
      result: "Exchange rate reflects the balance of trade, capital flows, and speculation",
      resultType: "neutral"
    },
    examMatters: "Examiners often ask you to explain why a currency has appreciated or depreciated. Use a supply-demand diagram for the currency market and explain the shift: interest rates, inflation, growth, or speculation. Always link back to the impact on trade.",
    misconception: "Students confuse appreciation/revaluation and depreciation/devaluation. Appreciation and depreciation are market-driven (floating rate). Revaluation and devaluation are policy decisions (fixed rate). Instead write: use appreciation/depreciation for floating systems and revaluation/devaluation for fixed systems — examiners notice the difference.",
    takeaway: [
      "Currency demand: exports, FDI inflows, higher interest rates.",
      "Currency supply: imports, FDI outflows, lower interest rates.",
      "Appreciation/depreciation for floating; revaluation/devaluation for fixed."
    ]
  },

  {
    title: "Competitiveness and the Marshall-Lerner Condition",
    meta: "5 concepts",
    keyIdea: "A depreciation makes exports cheaper and imports dearer, but whether it improves the current account depends on elasticities — the Marshall-Lerner condition tells us when depreciation helps and the J-curve shows the time lag.",
    blocks: [
      {
        title: "KEY CONCEPTS",
        items: [
          { type: "def", text: "<strong>Marshall-Lerner condition</strong> — a depreciation improves the current account only if the sum of PED for exports and PED for imports is greater than 1 (|PEDx| + |PEDm| > 1).", tag: "exam" },
          { type: "def", text: "<strong>J-curve effect</strong> — in the short run, a depreciation worsens the current account (because contracts are fixed and demand is inelastic), but improves it in the long run as consumers and firms adjust." }
        ]
      },
      {
        title: "HOW IT WORKS",
        items: [
          { type: "mech", text: "A depreciation lowers the foreign-currency price of exports (boosting demand) and raises the domestic-currency price of imports (reducing demand)." },
          { type: "mech", text: "If demand for exports and imports is <strong>elastic</strong> (ML condition met), the volume effects outweigh the price effects and the trade balance improves.", tag: "exam" },
          { type: "mech", text: "In the <strong>short run</strong>, demand is inelastic (contracts locked in, slow switching) so the trade balance initially worsens — the J-curve." },
          { type: "link", text: "The J-curve links to PED from Unit 1: elasticity increases over time as consumers find substitutes and firms switch suppliers." }
        ]
      }
    ],
    formula: { label: "MARSHALL-LERNER CONDITION", text: "|PEDx| + |PEDm| > 1 → depreciation improves current account" },
    flow: {
      steps: ["Currency depreciates", "Short run: inelastic demand, trade balance worsens (J-curve)", "Long run: demand becomes elastic, trade balance improves"],
      result: "Depreciation helps the current account only if the Marshall-Lerner condition is met",
      resultType: "neutral"
    },
    examMatters: "Examiners frequently test Marshall-Lerner and the J-curve together. Draw the J-curve (x-axis = time, y-axis = current account balance). Explain that the initial worsening reflects inelastic short-run demand, while long-run improvement reflects elastic demand as contracts expire and consumers adjust.",
    misconception: "Students say depreciation always improves the trade balance. Wrong because in the short run, demand is inelastic and the trade balance may worsen. Instead write: depreciation improves the current account only if the Marshall-Lerner condition is met, and even then there is a short-run J-curve effect where the balance initially worsens before improving.",
    takeaway: [
      "Marshall-Lerner: |PEDx| + |PEDm| > 1 → depreciation improves trade balance.",
      "J-curve: short-run worsening then long-run improvement after depreciation.",
      "Demand elasticity increases over time as contracts expire and substitutes are found."
    ]
  }
];


/* ═══════════════════════════════════════════════════════════
 *  PUSH TO SUPABASE
 * ═══════════════════════════════════════════════════════════ */

const SECTIONS = [
  { id: 'causes-effects-globalisation',     label: '4.3.1 Causes and Effects of Globalisation',    notes: NOTES_431 },
  { id: 'trade-global-economy',             label: '4.3.2 Trade and the Global Economy',           notes: NOTES_432 },
  { id: 'balance-payments-exchange-rates',   label: '4.3.3 BoP, Exchange Rates & Competitiveness', notes: NOTES_433 },
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
