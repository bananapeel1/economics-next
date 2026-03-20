/**
 * UPGRADE — 4.3.2 Trade and the Global Economy
 * Rewrites section_content from old concepts[] format to new sections[] format.
 * Run: node scripts/upgrade-content-trade.mjs
 */
import { supabase } from './_db.mjs';

const CONTENT = [
  /* ═══════════════════════════════════════════════════
   *  Chapter 1: The Case for Free Trade
   * ═══════════════════════════════════════════════════ */
  {
    title: "The Case for Free Trade",
    sections: [
      {
        id: "comparative-advantage",
        title: "Comparative Advantage",
        keyIdea: "A country has a comparative advantage when it can produce a good at a lower opportunity cost than another — and both countries gain from trade if terms of trade fall between their opportunity cost ratios.",
        body: [
          { type: "paragraph", text: "**Comparative advantage** is the foundation of the economic case for free trade. A country has a comparative advantage in a good if it can produce that good at a **lower opportunity cost** than another country. Crucially, even a country that is less efficient at producing everything (absolute disadvantage in all goods) still benefits from trade by specialising in its least-worst product." },
          { type: "paragraph", text: "The logic is precise. Calculate the opportunity cost of each good in each country. Each country should **specialise** in the good where its opportunity cost is lower. If the **terms of trade** (the exchange ratio) fall between the two countries' opportunity cost ratios, both countries can consume beyond their production possibility frontier. Trade is not zero-sum — it expands the total pie." },
          { type: "paragraph", text: "The model rests on assumptions: constant costs, perfect factor mobility within countries, zero transport costs, and no trade barriers. In reality, these rarely hold — but the core insight remains powerful. Countries that trade according to comparative advantage achieve higher output and consumption than those that try to produce everything domestically." },
          { type: "flow", steps: ["Calculate opportunity costs for each good in each country", "Each country specialises in the lower opportunity cost good", "Trade at terms between the two OC ratios", "Both consume beyond their PPF"], result: "Mutual gains from trade — total world output rises through specialisation", resultType: "good" }
        ],
        realExample: { emoji: "🇧🇩", text: "Bangladesh has a comparative advantage in textiles due to low labour costs, while Germany has a comparative advantage in precision machinery due to its skilled workforce and capital stock. Both gain when Bangladesh exports garments and imports German engineering — each focusing on what it does relatively best." },
        misconception: "Students confuse comparative and absolute advantage. Wrong — a country can have an absolute disadvantage in everything and still gain from trade. Instead write: comparative advantage is about relative efficiency (opportunity cost), not absolute efficiency. Even if one country is better at producing everything, both gain by specialising in their lowest opportunity cost good.",
        examMatters: "Examiners frequently set numerical questions asking you to identify comparative advantage from a table. Practise: calculate opportunity costs for both goods in both countries, identify who has the lower OC in each good, then state the range of mutually beneficial terms of trade."
      },
      {
        id: "benefits-free-trade",
        title: "Benefits of Free Trade",
        keyIdea: "Free trade delivers allocative efficiency, lower prices, economies of scale, and dynamic gains from competition — though real-world frictions like immobility and exchange rate distortions limit these benefits.",
        body: [
          { type: "paragraph", text: "Free trade generates several categories of benefit. **Allocative efficiency** improves because resources flow to where they are most productive globally — countries specialise according to comparative advantage. **Consumer prices fall** as competition from imports forces domestic firms to cut costs. **Economies of scale** become achievable when firms can sell to global markets rather than just domestic ones." },
          { type: "paragraph", text: "The **dynamic gains** may matter even more than the static ones. Exposure to international competition drives **innovation** — firms that cannot compete with imports must improve or exit. Access to foreign technology and ideas accelerates productivity growth. Over time, these dynamic effects compound, raising the economy's long-run growth rate." },
          { type: "paragraph", text: "However, the textbook gains assume frictionless adjustment. In practice, **factor immobility** means workers displaced by imports cannot easily retrain or relocate. **Transport costs** reduce the gains, especially for heavy or perishable goods. **Exchange rate distortions** — such as a currency held artificially low — can undermine comparative advantage and create unfair competition." }
        ],
        realExample: { emoji: "🇪🇺", text: "The EU single market removed trade barriers between member states and intra-EU trade grew by an estimated 60%. Firms like Airbus could spread development costs across a continent-wide market, achieving economies of scale that would be impossible in any single European country." },
        misconception: "Students list benefits of trade without considering limitations. Wrong — the gains from free trade assume perfect factor mobility and no market distortions. Instead write: while free trade raises total welfare, the gains depend on the ability of displaced workers to move between sectors and on the absence of exchange rate manipulation or large transport costs.",
        examMatters: "A strong evaluation distinguishes static gains (allocative efficiency, lower prices) from dynamic gains (innovation, productivity growth). Examiners reward answers that acknowledge the theoretical case is strong but identify real-world frictions that limit the gains — particularly factor immobility and structural unemployment."
      }
    ],
    takeaway: [
      "Comparative advantage: specialise where opportunity cost is lowest — both countries gain if terms of trade fall between OC ratios.",
      "Static gains: allocative efficiency, lower prices, economies of scale. Dynamic gains: innovation and productivity growth.",
      "Real-world frictions — factor immobility, transport costs, exchange rate distortions — limit but do not eliminate the case for free trade."
    ]
  },

  /* ═══════════════════════════════════════════════════
   *  Chapter 2: Protectionism and the WTO
   * ═══════════════════════════════════════════════════ */
  {
    title: "Protectionism and the WTO",
    sections: [
      {
        id: "methods-of-protectionism",
        title: "Methods of Protectionism",
        keyIdea: "Tariffs, quotas, subsidies, and non-tariff barriers all restrict imports — each raises domestic prices and creates deadweight loss, though governments argue they protect jobs, infant industries, and national security.",
        body: [
          { type: "paragraph", text: "**Protectionism** means government intervention to restrict imports and shield domestic producers from foreign competition. The main tools are: **tariffs** (taxes on imports that raise the price to consumers), **quotas** (physical limits on the quantity of imports), **subsidies** to domestic producers (lowering their costs to compete with imports), and **non-tariff barriers (NTBs)** such as excessive regulation, bureaucratic customs procedures, or discriminatory standards." },
          { type: "paragraph", text: "The **arguments for** protectionism include: protecting **infant industries** that need time to achieve economies of scale, safeguarding **national security** in strategic sectors like defence and food, preventing **dumping** (selling below cost to destroy competitors), and protecting **jobs** in politically sensitive regions. Each argument has some theoretical validity but is routinely abused to protect inefficient firms with political connections." },
          { type: "paragraph", text: "The **arguments against** are powerful: protectionism raises prices for consumers, creates **deadweight loss**, reduces competitive pressure (so firms become less efficient over time), and invites **retaliation** from trading partners. History shows that trade wars escalate — the Smoot-Hawley tariffs of 1930 deepened the Great Depression by collapsing world trade." },
          { type: "flow", steps: ["Government imposes tariff on imports", "Import price rises above world price", "Domestic producers gain, consumers lose", "Deadweight loss created"], result: "Net welfare loss — producer gains are smaller than consumer losses plus government revenue", resultType: "bad" }
        ],
        realExample: { emoji: "🇺🇸", text: "The US-China tariff war of 2018-2020 saw the US impose tariffs on over $360 billion of Chinese goods. China retaliated with tariffs on US agriculture. Studies showed American consumers bore most of the cost through higher prices, while US farmers lost export markets — illustrating the costs of protectionism and retaliation." },
        misconception: "Students say tariffs protect domestic jobs. Partially true in the short run, but wrong in the long run — tariffs raise input costs for other industries, invite retaliation, and reduce competitiveness. Instead write: tariffs may save jobs in the protected sector but destroy jobs elsewhere through higher costs and retaliatory tariffs from trading partners.",
        examMatters: "Examiners love tariff diagrams. You must be able to draw one showing: world price, tariff-inclusive price, domestic production expanding, imports contracting, consumer surplus lost, producer surplus gained, government revenue, and deadweight loss triangles. Practise until this is automatic."
      },
      {
        id: "the-wto",
        title: "The World Trade Organisation (WTO)",
        keyIdea: "The WTO promotes free trade through the most-favoured-nation principle and dispute resolution, but the Doha Round's failure has shifted momentum toward bilateral and regional deals.",
        body: [
          { type: "paragraph", text: "The **World Trade Organisation (WTO)**, established in 1995, provides the rules-based framework for international trade. Its core principles are: **most-favoured-nation (MFN)** — any tariff concession given to one member must be extended to all; **national treatment** — imported goods must be treated no less favourably than domestic ones once inside the border; and **reciprocity** — trade concessions should be mutual." },
          { type: "paragraph", text: "The WTO's **dispute settlement mechanism** is often called the 'jewel in the crown' of the trading system. It provides a binding legal process for resolving trade disputes, preventing countries from unilaterally imposing protectionist measures without consequence. Over 600 disputes have been brought since 1995." },
          { type: "paragraph", text: "However, the WTO faces serious challenges. The **Doha Development Round**, launched in 2001 to address developing countries' concerns, has effectively stalled due to disagreements between rich and poor nations over agriculture subsidies and market access. The rise of **bilateral and regional trade deals** — such as the CPTPP and RCEP — threatens to fragment the multilateral system. Critics argue the WTO is too slow and too consensus-dependent to handle modern trade challenges like digital trade and climate-related border measures." }
        ],
        realExample: { emoji: "✈️", text: "The 16-year WTO dispute between the EU and US over subsidies to Airbus and Boeing is a landmark case. Both sides were found to have provided illegal subsidies, and retaliatory tariffs were authorised. It demonstrated the WTO's power to adjudicate but also its limitations — the dispute took so long that billions in distortionary subsidies were paid before any resolution." },
        misconception: "Students assume the WTO enforces free trade. Wrong — the WTO is a negotiating forum and dispute-resolution body; it cannot force countries to liberalise. Instead write: the WTO provides rules and a mechanism for settling disputes, but its power depends on members' willingness to comply. It facilitates trade liberalisation rather than imposing it.",
        examMatters: "A common question asks you to evaluate the effectiveness of the WTO. Structure: successes (MFN principle, dispute resolution, reduced average tariffs) vs failures (Doha stalled, slow decision-making, rise of bilateralism). Conclude with a judgement: the WTO remains essential but needs reform to stay relevant."
      }
    ],
    takeaway: [
      "Protectionism (tariffs, quotas, subsidies, NTBs) raises prices and creates deadweight loss — arguments for it are often abused.",
      "The WTO promotes trade through MFN, national treatment, and dispute resolution — but the Doha Round has stalled.",
      "Bilateral and regional deals are increasingly replacing multilateral WTO negotiations."
    ]
  }
];

async function main() {
  console.log('Upgrading 4.3.2 Trade and the Global Economy to new format...');

  const { error } = await supabase
    .from('section_content')
    .update({ data: CONTENT })
    .eq('section_id', 'trade-global-economy');

  if (error) {
    console.error('FAILED:', error.message);
  } else {
    console.log('SUCCESS — 2 chapters, ' + CONTENT.reduce((n, c) => n + c.sections.length, 0) + ' sections pushed.');
  }
}

main();
