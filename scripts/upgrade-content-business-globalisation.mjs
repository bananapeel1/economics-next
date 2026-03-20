/**
 * UPGRADE — 4.3.1 Globalisation & Business
 * Rewrites section_content from old concepts[] format to new sections[] format.
 * Run: node scripts/upgrade-content-business-globalisation.mjs
 */
import { supabase } from './_db.mjs';

const CONTENT = [
  /* ═══════════════════════════════════════════════════
   *  Chapter 1: Globalisation & Business
   * ═══════════════════════════════════════════════════ */
  {
    title: "Globalisation & Business",
    sections: [
      {
        id: "drivers-of-globalisation",
        title: "Drivers of Globalisation",
        keyIdea: "Globalisation is driven by technology, trade liberalisation, and deregulation — together they shrink the effective distance between markets and allow firms to source, produce, and sell worldwide.",
        body: [
          { type: "paragraph", text: "**Globalisation** is the increasing integration and interdependence of the world's economies through the free flow of goods, services, capital, and labour across borders. For businesses, it means both wider opportunities and fiercer competition." },
          { type: "paragraph", text: "Three forces drive it. **Technology** — the internet, containerised shipping, and digital payments make it cheap to coordinate supply chains across continents. **Trade liberalisation** — the WTO and bilateral agreements reduce tariffs and quotas, lowering the cost of cross-border trade. **Deregulation** — governments opening financial markets and relaxing FDI restrictions invite foreign capital and competition." },
          { type: "paragraph", text: "For businesses the impact is double-edged. Globalisation opens **larger markets** and access to **cheaper inputs** (labour, raw materials, components), but it also brings **increased competition** from foreign firms and exposure to **foreign exchange risk** as revenues and costs span multiple currencies." },
          { type: "flow", steps: ["Technology lowers transaction costs", "Trade liberalisation removes tariff barriers", "Deregulation opens markets to foreign firms"], result: "Businesses access global markets but face global competition and FX risk", resultType: "neutral" }
        ],
        realExample: { emoji: "👗", text: "Zara's parent company Inditex operates a global supply chain spanning 12 countries, using advanced logistics technology to move garments from design to store in under two weeks. Cheap shipping and liberalised trade allow Zara to source fabric in Turkey, cut in Morocco, and sell in 96 markets worldwide." },
        misconception: "Students say globalisation only benefits large firms. Wrong — small firms can now sell globally through platforms like Amazon and Etsy, and source cheaply from Alibaba. Instead write: globalisation benefits firms of all sizes, though larger firms are better positioned to manage FX risk and regulatory complexity across multiple markets.",
        examMatters: "Examiners expect you to distinguish between the drivers (technology, liberalisation, deregulation) and the impacts on business (larger markets, cheaper inputs, competition, FX risk). A strong answer links a specific driver to a specific business outcome with a named example."
      },
      {
        id: "impact-globalisation-on-business",
        title: "Impact of Globalisation on Business Strategy",
        keyIdea: "Globalisation forces firms to rethink every strategic decision — from where they produce, to how they price, to how they manage currency exposure across borders.",
        body: [
          { type: "paragraph", text: "Globalisation reshapes business strategy in fundamental ways. Firms can **offshore** production to low-cost countries, **outsource** non-core functions to specialists abroad, and access a **global talent pool**. These choices lower costs but create supply chain dependencies and reputational risks." },
          { type: "paragraph", text: "Pricing becomes more complex because firms must account for **exchange rate fluctuations**, **transfer pricing** across subsidiaries, and different **price elasticities** in different markets. A strong pound makes UK exports expensive abroad; a weak pound makes imported inputs costly." },
          { type: "paragraph", text: "Risk management becomes critical. Firms use **hedging** (forward contracts to lock in exchange rates), **diversification** across markets, and **local sourcing** to reduce exposure. The most successful global firms balance efficiency (centralised production) with resilience (diversified supply chains)." },
          { type: "flow", steps: ["Firm enters global markets", "Revenue and costs in multiple currencies", "Exchange rate movements create uncertainty"], result: "Firms hedge, diversify, and localise to manage global risk", resultType: "neutral" }
        ],
        realExample: { emoji: "🛒", text: "Walmart's entry into India required adapting to local regulations that restricted FDI in multi-brand retail. Walmart initially used a joint venture with Bharti Enterprises to navigate rules, then shifted to wholesale cash-and-carry operations — showing how globalisation demands strategic flexibility, not just cost-cutting." },
        misconception: "Students assume globalisation means firms should always produce in the cheapest country. Wrong — supply chain disruption, quality control, and reputational damage from poor labour conditions can outweigh cost savings. Instead write: location decisions balance cost advantages against supply chain resilience, quality control, and ethical considerations.",
        examMatters: "A top-mark answer evaluates whether the benefits of globalisation (lower costs, larger markets) outweigh the risks (FX exposure, supply chain fragility, reputational risk) for a specific firm in a specific context. Always consider: 'It depends on the firm's size, industry, and risk appetite.'"
      }
    ],
    takeaway: [
      "Three drivers: technology, trade liberalisation, deregulation — each lowers barriers to cross-border business.",
      "Business impacts: larger markets and cheaper inputs, but more competition and FX risk.",
      "Strategy must balance efficiency (offshoring, centralisation) with resilience (diversification, hedging).",
      "Globalisation affects firms of all sizes — small firms access global platforms, large firms manage complex supply chains."
    ]
  },

  /* ═══════════════════════════════════════════════════
   *  Chapter 2: Trade Blocs
   * ═══════════════════════════════════════════════════ */
  {
    title: "Trade Blocs",
    sections: [
      {
        id: "types-of-trade-blocs",
        title: "Types of Trade Blocs: FTA, Customs Union, Single Market",
        keyIdea: "Trade blocs range from free trade areas to full single markets — each deeper level of integration removes more barriers but demands more policy surrender from member states.",
        body: [
          { type: "paragraph", text: "A **free trade area (FTA)** eliminates tariffs between members but each country keeps its own external tariffs on non-members. NAFTA (now USMCA) is a classic example — Mexico, the US, and Canada trade freely among themselves but set independent tariffs on imports from China." },
          { type: "paragraph", text: "A **customs union** goes further: members adopt a **common external tariff (CET)** against non-members, which simplifies trade rules but removes individual tariff policy. The EU began as a customs union — all members charge the same tariff on, say, Vietnamese textiles." },
          { type: "paragraph", text: "A **single market** adds the free movement of **capital and labour** alongside goods and services. The EU single market allows a Polish engineer to work in Germany without a visa and a French bank to operate in Spain without separate authorisation. For businesses inside, it creates a seamless domestic-style market of 450 million consumers." },
          { type: "flow", steps: ["FTA removes internal tariffs", "Customs union adds common external tariff", "Single market adds free movement of labour and capital"], result: "Deeper integration = more trade but less national policy independence", resultType: "neutral" }
        ],
        realExample: { emoji: "🚘", text: "BMW benefits hugely from the EU single market. It sources components from 15+ EU countries tariff-free, moves skilled engineers between plants in Germany, Austria, and the UK (pre-Brexit), and sells finished cars across 27 member states without customs paperwork or regulatory duplication." },
        misconception: "Students confuse a customs union with a single market. Wrong — a customs union only harmonises trade in goods with a common external tariff; a single market also allows free movement of services, capital, and labour. Instead write: a single market is a customs union plus the free movement of all factors of production.",
        examMatters: "Examiners test your ability to rank the levels of integration and explain the trade-offs. A strong answer explains why deeper integration benefits businesses (larger barrier-free market) but constrains governments (cannot set independent trade policy)."
      },
      {
        id: "trade-creation-vs-diversion",
        title: "Trade Creation, Trade Diversion & the Impact on Firms",
        keyIdea: "Trade blocs create trade among members by removing barriers, but they divert trade away from efficient non-members who face the CET — so not all trade effects are positive for global efficiency.",
        body: [
          { type: "paragraph", text: "**Trade creation** occurs when bloc membership replaces expensive domestic production with cheaper imports from a partner country. A Spanish wine producer gains tariff-free access to Germany, undercutting less efficient German vineyards — consumers benefit from lower prices." },
          { type: "paragraph", text: "**Trade diversion** occurs when the CET forces firms to switch from a cheaper non-member supplier to a more expensive bloc member. If the EU's CET makes Brazilian orange juice costlier than Spanish juice, UK buyers switch to Spain even though Brazil produces more cheaply — a net efficiency loss." },
          { type: "paragraph", text: "For businesses **inside** the bloc, the impact is overwhelmingly positive: barrier-free access to a huge market, simplified regulation, and larger customer bases. For businesses **outside**, the CET creates a competitive disadvantage that may force them to set up production inside the bloc (tariff-jumping FDI) to remain competitive." },
          { type: "flow", steps: ["Trade bloc formed with CET", "Internal barriers removed (trade creation)", "External barriers raised (trade diversion)"], result: "Firms inside benefit; firms outside face new barriers or relocate", resultType: "neutral" }
        ],
        realExample: { emoji: "🐟", text: "Post-Brexit, UK fisheries lost tariff-free access to the EU single market. Scottish salmon exporters now face customs checks and paperwork delays that add cost and reduce freshness — a real-world example of trade diversion as EU buyers increasingly switch to Norwegian salmon (Norway has an EEA arrangement)." },
        misconception: "Students assume trade blocs always increase total trade. Wrong — trade diversion can reduce global efficiency by redirecting purchases away from the cheapest producer. Instead write: trade blocs increase trade among members (creation) but may reduce trade with more efficient outsiders (diversion); the net effect depends on the size of each effect.",
        examMatters: "A common exam question asks you to evaluate whether joining a trade bloc benefits a country's businesses. Structure your answer: trade creation benefits (lower costs, bigger markets) vs trade diversion costs (losing efficient non-member suppliers) — then conclude with 'it depends on the relative size of creation vs diversion'."
      }
    ],
    takeaway: [
      "FTA < customs union < single market — each level integrates more but surrenders more policy autonomy.",
      "Trade creation replaces costly domestic output with cheaper partner imports — a net gain.",
      "Trade diversion replaces cheap non-member imports with costlier member imports — a net loss.",
      "Firms inside a bloc benefit from barrier-free access; firms outside may need tariff-jumping FDI to compete."
    ]
  }
];

async function main() {
  console.log('Upgrading 4.3.1 Globalisation & Business to new format...');

  const { error } = await supabase
    .from('section_content')
    .update({ data: CONTENT })
    .eq('section_id', 'globalisation');

  if (error) {
    console.error('FAILED:', error.message);
  } else {
    console.log('SUCCESS — 2 chapters, ' + CONTENT.reduce((n, c) => n + c.sections.length, 0) + ' sections pushed.');
  }
}

main();
