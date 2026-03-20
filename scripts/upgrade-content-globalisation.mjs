/**
 * UPGRADE — 4.3.1 Causes and Effects of Globalisation
 * Rewrites section_content from old concepts[] format to new sections[] format.
 * Run: node scripts/upgrade-content-globalisation.mjs
 */
import { supabase } from './_db.mjs';

const CONTENT = [
  /* ═══════════════════════════════════════════════════
   *  Chapter 1: What is Globalisation?
   * ═══════════════════════════════════════════════════ */
  {
    title: "What is Globalisation?",
    sections: [
      {
        id: "causes-of-globalisation",
        title: "Causes of Globalisation",
        keyIdea: "Globalisation is driven by trade liberalisation, technological advances, capital deregulation, and political change — each reinforcing the others to integrate national economies.",
        body: [
          { type: "paragraph", text: "**Globalisation** is the increasing integration and interdependence of the world's economies through the growth of international trade, capital flows, and the spread of technology. It is not a single event but a process accelerated by several reinforcing drivers." },
          { type: "paragraph", text: "**Trade liberalisation** — the removal of tariffs, quotas, and non-tariff barriers — has dramatically reduced the cost of moving goods across borders. The WTO, regional trade blocs, and bilateral agreements have all contributed. **Technology** has slashed communication and transport costs: the internet enables instant coordination across continents, while containerisation cut shipping costs by over 90% in the second half of the twentieth century." },
          { type: "paragraph", text: "**Capital account deregulation** allows money to flow freely between countries, enabling firms to invest abroad and savers to diversify globally. **Political changes** — the collapse of the Soviet Union, China's market reforms, and the expansion of the EU — opened up billions of new workers and consumers to the global economy." },
          { type: "flow", steps: ["Trade barriers fall", "Transport and communication costs drop", "Capital flows freely across borders", "Economies become deeply integrated"], result: "Globalisation — a self-reinforcing process of economic integration", resultType: "good" }
        ],
        realExample: { emoji: "🇨🇳", text: "China joining the WTO in 2001 is a landmark case. It committed to lowering tariffs and opening markets, which turbocharged its exports and attracted massive FDI. Within a decade China became the world's largest exporter, lifting hundreds of millions out of poverty." },
        misconception: "Students treat globalisation as purely about trade. Wrong — it also involves capital flows, migration, and technology transfer. Instead write: globalisation is the integration of goods, services, capital, and labour markets across national borders, driven by trade, technology, and policy changes working together.",
        examMatters: "Examiners want you to identify and explain specific causes — not just list them. Link each cause to a mechanism: trade liberalisation lowers costs, technology shrinks distance, deregulation frees capital. Always show how these causes reinforce each other."
      },
      {
        id: "benefits-costs-globalisation",
        title: "Benefits and Costs of Globalisation",
        keyIdea: "Globalisation delivers consumer gains and poverty reduction through specialisation, but creates losers through structural unemployment, rising inequality, and environmental damage.",
        body: [
          { type: "paragraph", text: "The **benefits** of globalisation are substantial. Consumers gain access to a wider variety of goods at lower prices. Countries specialise according to comparative advantage, raising **allocative efficiency** globally. Developing nations attract FDI, which brings jobs, technology transfer, and tax revenue. The World Bank estimates that globalisation helped lift over one billion people out of extreme poverty between 1990 and 2015." },
          { type: "paragraph", text: "The **costs** fall unevenly. Workers in industries exposed to cheaper imports face **structural unemployment** — their skills may not transfer to growing sectors. Within-country **inequality** often rises as capital owners and skilled workers gain while low-skilled workers lose bargaining power. **Environmental damage** accelerates as production shifts to countries with weaker regulation, a process called the 'pollution haven' effect." },
          { type: "paragraph", text: "The net impact depends critically on domestic policy. Countries with strong education systems, safety nets, and effective regulation can capture the gains while cushioning the losers. Those without these institutions often see the costs concentrated on the most vulnerable." }
        ],
        realExample: { emoji: "🇧🇩", text: "Bangladesh's garment industry employs over four million workers, mostly women, and accounts for over 80% of export earnings. Globalisation created these jobs and raised incomes, but working conditions remain poor and wages low — illustrating both the gains and the costs." },
        misconception: "Students claim globalisation is either entirely good or entirely bad. Wrong — it creates both winners and losers simultaneously. Instead write: the net effect of globalisation depends on domestic policies — education, retraining, safety nets, and environmental regulation determine whether gains are shared or concentrated.",
        examMatters: "Evaluation is everything here. A strong answer acknowledges that globalisation raises total welfare but distributes gains unevenly. Use the phrase 'it depends on' and specify: it depends on the strength of domestic institutions, the mobility of labour, and the effectiveness of redistribution policy."
      }
    ],
    takeaway: [
      "Globalisation is driven by trade liberalisation, technology, capital deregulation, and political change — all reinforcing each other.",
      "Benefits: lower prices, greater variety, poverty reduction through specialisation and FDI.",
      "Costs: structural unemployment, rising inequality, environmental damage in weakly regulated economies.",
      "The net impact depends on domestic policy — education, safety nets, and regulation are decisive."
    ]
  },

  /* ═══════════════════════════════════════════════════
   *  Chapter 2: Multinational Corporations
   * ═══════════════════════════════════════════════════ */
  {
    title: "Multinational Corporations",
    sections: [
      {
        id: "why-mncs-invest-abroad",
        title: "Why MNCs Invest Abroad",
        keyIdea: "MNCs invest overseas to access lower costs, new markets, and economies of scale — bringing FDI that creates jobs, transfers technology, and generates tax revenue for host countries.",
        body: [
          { type: "paragraph", text: "A **multinational corporation (MNC)** is a firm that produces in two or more countries. MNCs invest abroad through **foreign direct investment (FDI)** — building factories, acquiring firms, or establishing subsidiaries. The motives are clear: access to **lower labour costs**, proximity to **growing consumer markets**, and the ability to achieve greater **economies of scale** by spreading fixed costs across global output." },
          { type: "paragraph", text: "For the **host country**, FDI brings significant benefits. New factories create **employment**, often in regions with limited opportunities. MNCs transfer **technology and management expertise** that spills over to local firms. Tax revenue from corporate profits funds public services. Over time, the host economy may develop its own industrial capacity — a process called 'industrial upgrading'." },
          { type: "flow", steps: ["MNC seeks lower costs or market access", "FDI flows into host country", "Jobs, technology, and tax revenue created"], result: "Host economy gains productive capacity and integrates into global supply chains", resultType: "good" }
        ],
        realExample: { emoji: "🚗", text: "Toyota opened its Burnaston factory in Derbyshire, UK, in 1992. It created over 3,000 direct jobs and thousands more in the supply chain. Local firms adopted Toyota's lean manufacturing techniques, raising productivity across the region." },
        misconception: "Students assume MNCs invest abroad only for cheap labour. Wrong — market access, avoiding trade barriers, and economies of scale are equally important motives. Instead write: MNCs choose locations based on a combination of cost, market size, infrastructure, skills, and regulatory environment.",
        examMatters: "When evaluating FDI, distinguish between short-run and long-run effects. In the short run, jobs and tax revenue dominate. In the long run, technology transfer and supply chain development may matter more for the host country's growth trajectory."
      },
      {
        id: "costs-of-mncs",
        title: "Costs of MNCs to Host Countries",
        keyIdea: "MNCs can repatriate profits, exploit transfer pricing, suppress wages, and damage the environment — the net impact on the host country depends on the strength of its governance.",
        body: [
          { type: "paragraph", text: "The costs of hosting MNCs can be severe. **Profit repatriation** means that much of the value created flows back to shareholders in the home country rather than being reinvested locally. **Transfer pricing** — setting artificial prices on intra-firm transactions — allows MNCs to shift profits to low-tax jurisdictions, eroding the host country's tax base." },
          { type: "paragraph", text: "MNCs may also **exploit weak labour standards**, paying low wages and resisting unionisation. Environmental regulation in developing countries is often poorly enforced, leading to **pollution and resource depletion**. Local competitors can be crowded out if the MNC's scale advantages are insurmountable, creating **dependency** on foreign capital." },
          { type: "paragraph", text: "The net impact depends heavily on **host country governance**. Countries with strong institutions — transparent tax systems, enforceable labour laws, and environmental standards — capture more of the benefits. Those with weak governance may find that MNCs extract more value than they create." }
        ],
        realExample: { emoji: "☕", text: "Starbucks faced a UK public backlash in 2012 when it emerged the company had paid almost no corporation tax on billions in UK sales, using transfer pricing to shift profits to subsidiaries in the Netherlands and Switzerland." },
        misconception: "Students say MNCs are always bad for developing countries. Wrong — the evidence shows FDI is strongly associated with faster growth when governance is adequate. Instead write: MNCs bring both benefits and costs; the net effect depends on the host country's ability to regulate, tax, and channel FDI into productive uses.",
        examMatters: "Examiners reward balanced evaluation. Structure your answer: benefits (jobs, tech transfer, tax) vs costs (profit repatriation, transfer pricing, exploitation). Then evaluate: the net impact depends on the host country's institutional capacity — this is the key judgement."
      }
    ],
    takeaway: [
      "MNCs invest abroad for lower costs, market access, and economies of scale — FDI brings jobs and technology.",
      "Costs include profit repatriation, transfer pricing, labour exploitation, and environmental damage.",
      "The net impact on the host country depends critically on the quality of governance and regulation."
    ]
  },

  /* ═══════════════════════════════════════════════════
   *  Chapter 3: Trade Blocs
   * ═══════════════════════════════════════════════════ */
  {
    title: "Trade Blocs",
    sections: [
      {
        id: "types-of-trade-bloc",
        title: "Types of Trade Bloc",
        keyIdea: "Trade blocs range from free trade areas to monetary unions — each level of integration removes more barriers but requires surrendering more national sovereignty.",
        body: [
          { type: "paragraph", text: "A **trade bloc** is a group of countries that agree to reduce or eliminate trade barriers between themselves. The degree of integration varies enormously, and each step involves a trade-off between the economic benefits of deeper integration and the loss of national policy autonomy." },
          { type: "paragraph", text: "A **free trade area (FTA)** removes tariffs between members but each country keeps its own external tariffs — like NAFTA (now USMCA). A **customs union** adds a common external tariff (CET), so all members charge the same rate on imports from outside — like the EU customs union. A **single market** goes further, allowing free movement of goods, services, capital, and labour — the EU single market is the most advanced example." },
          { type: "paragraph", text: "A **monetary union** adopts a single currency and central bank, eliminating exchange rate risk and transaction costs between members — like the Eurozone. Each step up the integration ladder brings greater efficiency gains but demands more coordination and less national sovereignty over trade, fiscal, and monetary policy." }
        ],
        realExample: { emoji: "🇪🇺", text: "The EU single market allows 450 million people to trade, work, and invest across 27 countries without border checks. It has boosted intra-EU trade by an estimated 60%, demonstrating the power of deep integration — though it required members to accept common regulations and free movement." },
        misconception: "Students confuse free trade areas with customs unions. Wrong — the critical difference is the common external tariff. Instead write: in a free trade area each country sets its own external tariffs, but in a customs union all members apply the same tariff to non-members, which requires giving up independent trade policy.",
        examMatters: "Examiners expect you to sequence the types from least to most integrated (FTA, customs union, single market, monetary union) and explain what is added at each stage. Always link deeper integration to the sovereignty trade-off — more efficiency but less national policy freedom."
      },
      {
        id: "trade-creation-diversion",
        title: "Trade Creation and Trade Diversion",
        keyIdea: "Trade blocs create trade when members switch to cheaper partners inside the bloc, but divert trade when the common external tariff forces a switch away from the cheapest global supplier.",
        body: [
          { type: "paragraph", text: "**Trade creation** occurs when a country switches from a higher-cost domestic producer to a lower-cost member of the trade bloc. Tariffs between members fall to zero, so the cheaper partner's goods become accessible. This improves allocative efficiency — resources shift to where they are most productive." },
          { type: "paragraph", text: "**Trade diversion** occurs when the common external tariff (CET) forces a country to switch imports from the cheapest global supplier (outside the bloc) to a more expensive member. The tariff makes the external supplier artificially expensive, even though they are the most efficient producer. This reduces allocative efficiency." },
          { type: "paragraph", text: "The **net benefit** of a trade bloc depends on whether trade creation exceeds trade diversion. This is more likely when the CET is low, the bloc is large and diverse, and pre-existing tariffs were high. If the CET is set high to protect inefficient member industries, diversion dominates and the bloc makes its members worse off." },
          { type: "flow", steps: ["Countries form customs union", "Internal tariffs removed (creation)", "CET applied to non-members (diversion)"], result: "Net benefit depends on whether creation outweighs diversion — lower CET makes this more likely", resultType: "neutral" }
        ],
        realExample: { emoji: "🇬🇧", text: "After Brexit, the UK lost tariff-free access to EU markets and faced new trade barriers. Some UK importers switched from EU suppliers to more expensive domestic or non-EU sources — a form of trade diversion in reverse, illustrating how leaving a bloc can redirect trade flows." },
        misconception: "Students assume trade blocs always increase trade. Wrong — while they create trade between members, they can divert trade away from more efficient non-members. Instead write: trade blocs have ambiguous welfare effects; the net impact depends on the balance between trade creation (efficiency-improving) and trade diversion (efficiency-reducing).",
        examMatters: "This is a favourite evaluation topic. Show trade creation and diversion on a diagram. Then evaluate: if the CET is low and the bloc covers many diverse economies, creation is likely to dominate. If the CET is high to protect specific industries, diversion may outweigh creation."
      }
    ],
    takeaway: [
      "Trade blocs range from FTAs (least integrated) to monetary unions (most integrated) — each step trades sovereignty for efficiency.",
      "Trade creation shifts sourcing to cheaper bloc members; trade diversion shifts away from the cheapest global supplier.",
      "Net benefit depends on the level of the common external tariff and the diversity of the bloc's economies."
    ]
  }
];

async function main() {
  console.log('Upgrading 4.3.1 Causes and Effects of Globalisation to new format...');

  const { error } = await supabase
    .from('section_content')
    .update({ data: CONTENT })
    .eq('section_id', 'causes-effects-globalisation');

  if (error) {
    console.error('FAILED:', error.message);
  } else {
    console.log('SUCCESS — 3 chapters, ' + CONTENT.reduce((n, c) => n + c.sections.length, 0) + ' sections pushed.');
  }
}

main();
