/**
 * RICH NOTES — Business Unit 4 (4.3.1, 4.3.2, 4.3.3, 4.3.4)
 * ============================================================
 * Edexcel IAL Business Unit 4 — Global Business
 *
 * Sections:
 *   4.3.1 Globalisation                (globalisation)
 *   4.3.2 Global Markets & Expansion   (global-markets-expansion)
 *   4.3.3 Global Marketing             (global-marketing)
 *   4.3.4 Global Industries & MNCs     (global-industries-mncs)
 *
 * Run with: node scripts/update-business-unit4-rich-notes.mjs
 */

import { supabase } from './_db.mjs';


const NOTES_431 = [
  {
    title: "What is Globalisation?",
    meta: "4 concepts",
    keyIdea: "Globalisation is the process by which business operations and markets become increasingly interconnected across national borders — driven by technology, trade liberalisation, and the strategies of multinational corporations.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          { type: "def", text: "<strong>Globalisation</strong> — the increasing integration of the world's economies through the free movement of goods, services, capital, labour, and ideas across national borders.", tag: "exam" },
          { type: "def", text: "<strong>MNC (multinational corporation)</strong> — a business with operations (not just sales) in two or more countries; MNCs are the primary agents of globalisation." },
          { type: "def", text: "<strong>FDI (foreign direct investment)</strong> — investment by a firm in productive assets (factories, offices, equipment) in another country." }
        ]
      },
      {
        title: "DRIVERS",
        items: [
          { type: "mech", text: "<strong>Technology</strong>: the internet, containerisation, and cheap air freight have dramatically reduced the cost of international trade and communication." },
          { type: "mech", text: "<strong>Trade liberalisation</strong>: the WTO and regional trade agreements (EU, USMCA) have reduced tariffs and non-tariff barriers." },
          { type: "mech", text: "<strong>Deregulation of capital markets</strong>: money flows freely across borders, enabling FDI and portfolio investment." },
          { type: "imp", text: "Globalisation creates both opportunities (new markets, cheaper inputs) and threats (increased competition, exchange rate risk) for businesses.", tag: "exam" }
        ]
      }
    ],
    flow: {
      steps: ["Technology reduces costs of trade", "Trade barriers fall", "Businesses expand internationally"],
      result: "Markets, supply chains, and competition become global",
      resultType: "neutral"
    },
    examMatters: "Examiners expect you to explain drivers of globalisation and evaluate its impact on specific businesses. Use the case study context: does globalisation create an opportunity (new market access) or a threat (cheaper foreign competition)?",
    misconception: "Students treat globalisation as only about trade. It also includes capital flows (FDI), migration, and the spread of technology and ideas. Instead write: globalisation is multi-dimensional — it encompasses trade, investment, labour mobility, and information flows.",
    takeaway: [
      "Globalisation = integration of economies through trade, FDI, technology, and migration.",
      "Key drivers: technology, trade liberalisation, capital market deregulation.",
      "Creates opportunities and threats — evaluate using case study context."
    ]
  },

  {
    title: "Impact of Globalisation on Business",
    meta: "4 concepts",
    keyIdea: "Globalisation gives businesses access to larger markets and cheaper inputs, but also exposes them to fiercer competition, supply chain complexity, and reputational risks from global operations.",
    blocks: [
      {
        title: "OPPORTUNITIES",
        items: [
          { type: "mech", text: "<strong>Larger markets</strong> — selling globally increases potential revenue and allows firms to achieve greater economies of scale." },
          { type: "mech", text: "<strong>Cheaper inputs</strong> — offshoring production to low-wage countries reduces costs; global sourcing finds the best-value suppliers worldwide." },
          { type: "mech", text: "<strong>Diversification</strong> — selling in multiple markets reduces dependence on any single economy.", tag: "exam" }
        ]
      },
      {
        title: "THREATS",
        items: [
          { type: "mech", text: "<strong>Increased competition</strong> — domestic firms face pressure from international rivals with lower costs or better products." },
          { type: "mech", text: "<strong>Exchange rate risk</strong> — fluctuating currencies can erode profit margins on international transactions." },
          { type: "mech", text: "<strong>Ethical and reputational risks</strong> — global supply chains may involve poor working conditions, child labour, or environmental damage that damages the brand." },
          { type: "link", text: "Impacts link to stakeholder analysis: globalisation benefits shareholders (profit) and consumers (choice/prices) but may harm domestic workers (job losses) and communities (factory closures)." }
        ]
      }
    ],
    flow: {
      steps: ["Firm enters global market", "Access to larger market and cheaper inputs", "But faces competition, FX risk, and reputational challenges"],
      result: "Net impact depends on the firm's ability to manage the complexity of global operations",
      resultType: "neutral"
    },
    examMatters: "Examiners expect you to use the case study to evaluate whether globalisation is a net positive or negative for the specific firm. Consider: its size, financial strength, brand, and ability to manage international operations.",
    misconception: "Students say globalisation is always good for businesses. Wrong because small domestic firms often suffer from increased competition from larger, lower-cost foreign rivals. Instead write: globalisation benefits firms that can exploit scale, access new markets, and manage complexity — but it can destroy smaller firms that cannot compete on cost or adapt to international competition.",
    takeaway: [
      "Opportunities: larger markets, cheaper inputs, diversification.",
      "Threats: competition, exchange rate risk, reputational risk in supply chains.",
      "Impact depends on firm size, financial strength, and management capability."
    ]
  },

  {
    title: "Trade Blocs and Their Impact",
    meta: "4 concepts",
    keyIdea: "Trade blocs create larger barrier-free markets among members, benefiting businesses that operate within them — but the common external tariff can disadvantage firms that rely on non-member suppliers.",
    blocks: [
      {
        title: "KEY CONCEPTS",
        items: [
          { type: "def", text: "<strong>Free trade area</strong> — members remove tariffs between themselves but maintain individual external tariffs (e.g. USMCA)." },
          { type: "def", text: "<strong>Customs union</strong> — members remove internal tariffs and adopt a common external tariff (e.g. EU).", tag: "exam" },
          { type: "def", text: "<strong>Single market</strong> — a customs union plus free movement of labour, capital, and services (e.g. EU single market)." }
        ]
      },
      {
        title: "BUSINESS IMPLICATIONS",
        items: [
          { type: "mech", text: "Businesses inside a trade bloc gain <strong>barrier-free access</strong> to member-country markets, increasing their potential customer base." },
          { type: "mech", text: "Businesses outside the bloc face the <strong>common external tariff</strong>, making their products less competitive — this incentivises them to set up operations inside the bloc." },
          { type: "imp", text: "Trade blocs can create trade diversion: firms may source from less efficient member-country suppliers rather than cheaper non-member suppliers, raising costs.", tag: "exam" }
        ]
      }
    ],
    flow: {
      steps: ["Countries form trade bloc", "Internal barriers removed for member firms", "External tariff may divert trade from cheaper non-member sources"],
      result: "Inside firms benefit from larger market; outside firms face barriers or relocate",
      resultType: "neutral"
    },
    examMatters: "Examiners expect you to evaluate the impact of a trade bloc on a specific business using the case study. Consider: is the firm inside or outside the bloc? Does it rely on member or non-member suppliers?",
    misconception: "Students say trade blocs only help businesses. Wrong because the common external tariff raises costs for firms that import from outside the bloc. Instead write: trade blocs benefit firms inside them but can harm those outside or those reliant on non-member suppliers — evaluate the net impact for the specific firm.",
    takeaway: [
      "FTA → customs union → single market (increasing integration).",
      "Inside firms: larger market, no tariffs. Outside firms: common external tariff.",
      "Trade diversion risk: cheaper non-member sources blocked by the CET."
    ]
  }
];


const NOTES_432 = [
  {
    title: "Methods of Entering Global Markets",
    meta: "5 concepts",
    keyIdea: "Firms can enter foreign markets in many ways — from low-risk exporting to high-commitment FDI — and the right method depends on the firm's resources, the target market's characteristics, and its risk appetite.",
    blocks: [
      {
        title: "ENTRY METHODS",
        items: [
          { type: "def", text: "<strong>Exporting</strong> — selling domestically produced goods to foreign customers; lowest risk and investment but limited control and local responsiveness.", tag: "exam" },
          { type: "def", text: "<strong>Licensing/franchising</strong> — granting a foreign firm the right to produce or sell your product; generates income with low investment but risks quality control and brand dilution." },
          { type: "def", text: "<strong>Joint venture</strong> — partnering with a local firm to share costs, risks, and local expertise; useful for navigating unfamiliar markets." },
          { type: "def", text: "<strong>Foreign direct investment (FDI)</strong> — establishing wholly owned operations abroad (factory, office); highest control but highest risk and capital commitment.", tag: "exam" }
        ]
      },
      {
        title: "CHOOSING THE RIGHT METHOD",
        items: [
          { type: "mech", text: "Risk and control increase together: exporting (low risk, low control) → licensing → joint venture → FDI (high risk, high control)." },
          { type: "imp", text: "The choice depends on: the firm's <strong>financial resources</strong>, the <strong>target market's legal and cultural environment</strong>, the need for <strong>local knowledge</strong>, and the <strong>speed of entry</strong> required.", tag: "exam" },
          { type: "link", text: "Market entry links to Ansoff's matrix: entering a new geographical market with existing products is market development; entering with a new product is diversification." }
        ]
      }
    ],
    flow: {
      steps: ["Assess resources and risk appetite", "Choose entry method (export → licensing → JV → FDI)", "Balance risk, control, and local responsiveness"],
      result: "Entry method aligned to firm's capabilities and the target market's characteristics",
      resultType: "neutral"
    },
    examMatters: "Examiners expect you to recommend and justify an entry method using case study evidence. Don't just list methods — explain why one is most appropriate given the firm's financial position, the market's characteristics, and the firm's strategic objectives.",
    misconception: "Students say FDI is always the best method because it gives the most control. Wrong because it also requires the most capital, involves the most risk, and takes the longest to set up. Instead write: FDI is appropriate for firms with deep pockets and a long-term commitment to a market, but smaller firms may be better served by exporting or licensing initially.",
    takeaway: [
      "Entry methods: export → license/franchise → JV → FDI (risk and control increase).",
      "Choice depends on resources, market characteristics, and strategic goals.",
      "Start low-risk (export), then escalate commitment as the market proves itself."
    ]
  },

  {
    title: "Ansoff's Matrix in a Global Context",
    meta: "4 concepts",
    keyIdea: "When applied globally, Ansoff's matrix reveals that international expansion is inherently a market development or diversification strategy — with additional risks from cultural, legal, and economic differences across countries.",
    blocks: [
      {
        title: "APPLYING ANSOFF GLOBALLY",
        items: [
          { type: "mech", text: "Selling existing products in a new country = <strong>market development</strong> — leverages the firm's existing product expertise while learning a new market.", tag: "exam" },
          { type: "mech", text: "Launching a new product in a new country = <strong>diversification</strong> — the riskiest strategy because the firm has no experience in either the product or the market." },
          { type: "mech", text: "Global expansion adds layers of risk beyond domestic Ansoff: <strong>cultural differences</strong>, language barriers, legal/regulatory differences, and exchange rate volatility." }
        ]
      },
      {
        title: "RISK ASSESSMENT",
        items: [
          { type: "imp", text: "Examiners expect you to assess the risk of global expansion using PESTLE analysis alongside Ansoff: political stability, economic conditions, social/cultural factors, technological infrastructure, legal environment, and environmental regulations.", tag: "exam" },
          { type: "link", text: "Ansoff's global application links to entry methods: lower-risk Ansoff strategies (market development) pair well with lower-risk entry methods (exporting); higher-risk strategies (diversification) may require FDI or joint ventures." }
        ]
      }
    ],
    flow: {
      steps: ["Existing product + new country = market development", "New product + new country = diversification", "Add PESTLE risks to Ansoff assessment"],
      result: "Global Ansoff analysis includes both product-market risk and country-specific risk",
      resultType: "neutral"
    },
    examMatters: "Examiners expect you to use Ansoff's matrix with PESTLE analysis when evaluating international expansion. State the Ansoff quadrant, then layer on country-specific risks from PESTLE.",
    misconception: "Students apply Ansoff without adjusting for international risk factors. Wrong because entering a new country adds political, legal, cultural, and exchange rate risks beyond the product-market risks in the standard matrix. Instead write: Ansoff should be combined with PESTLE analysis when used in a global context — country risk amplifies the standard Ansoff risk.",
    takeaway: [
      "Global expansion is at least market development risk + country risk.",
      "Use PESTLE alongside Ansoff to assess country-specific risks.",
      "Match Ansoff quadrant to entry method: higher risk → higher commitment."
    ]
  }
];


const NOTES_433 = [
  {
    title: "Global Marketing: Standardisation vs Adaptation",
    meta: "5 concepts",
    keyIdea: "The core global marketing question is whether to sell the same product everywhere (standardisation) or tailor it to local tastes (adaptation) — the answer depends on the product, the market, and the brand.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          { type: "def", text: "<strong>Global standardisation</strong> — selling the same product with the same marketing mix in all markets; maximises economies of scale and brand consistency.", tag: "exam" },
          { type: "def", text: "<strong>Local adaptation (localisation)</strong> — modifying the product, pricing, promotion, or distribution to suit local market conditions and consumer preferences." },
          { type: "def", text: "<strong>Glocalisation</strong> — 'think global, act local'; maintaining a global brand identity while adapting specific elements of the marketing mix to local markets." }
        ]
      },
      {
        title: "EVALUATION",
        items: [
          { type: "mech", text: "<strong>Standardisation advantages</strong>: economies of scale, consistent brand image, simpler management, lower costs." },
          { type: "mech", text: "<strong>Adaptation advantages</strong>: meets local tastes, avoids cultural mistakes, can charge premium prices for tailored products." },
          { type: "imp", text: "Most successful global firms use <strong>glocalisation</strong> — a core global brand with local adaptations (e.g. McDonald's global brand but local menus; Coca-Cola's consistent logo but different sweetness levels).", tag: "exam" },
          { type: "link", text: "This links to Porter's strategies: standardisation often supports cost leadership; adaptation supports differentiation in local markets." }
        ]
      }
    ],
    flow: {
      steps: ["Decide: same product everywhere or adapted locally?", "Standardisation = scale but risk of cultural mismatch", "Glocalisation = global brand + local tweaks"],
      result: "Glocalisation balances economies of scale with local market responsiveness",
      resultType: "good"
    },
    examMatters: "Examiners expect you to evaluate whether a firm should standardise or adapt, using evidence from the case study. Consider: the nature of the product (tech products standardise well; food often needs adaptation), the target market's cultural distance, and the firm's cost pressures.",
    misconception: "Students say standardisation always saves money. While it reduces production and marketing costs, it can fail if local tastes differ significantly. Instead write: standardisation works for products with universal appeal (tech, luxury) but fails when cultural, dietary, or regulatory differences require adaptation.",
    takeaway: [
      "Standardisation: economies of scale, brand consistency. Adaptation: local relevance.",
      "Glocalisation: the dominant strategy — global brand, local execution.",
      "Best approach depends on product type, cultural distance, and cost pressure."
    ]
  },

  {
    title: "Cultural Influences on Global Marketing",
    meta: "4 concepts",
    keyIdea: "Culture shapes everything from product design to advertising tone — firms that ignore cultural differences risk offending consumers, while those that embrace them can build deep brand loyalty.",
    blocks: [
      {
        title: "KEY DIMENSIONS",
        items: [
          { type: "mech", text: "<strong>Hofstede's cultural dimensions</strong> help analyse markets: individualism vs collectivism, power distance, uncertainty avoidance, masculinity vs femininity, long-term vs short-term orientation.", tag: "exam" },
          { type: "mech", text: "<strong>Language</strong> — translation errors can be embarrassing or offensive; brand names, slogans, and packaging must be checked for local meaning." },
          { type: "mech", text: "<strong>Religion and values</strong> — dietary restrictions (halal, kosher), dress codes, and religious holidays affect product design, marketing timing, and distribution." }
        ]
      },
      {
        title: "IMPLICATIONS FOR MARKETING MIX",
        items: [
          { type: "mech", text: "<strong>Product</strong>: may need reformulation (ingredients, sizing), redesign (colours, symbols), or entirely new products for different cultures." },
          { type: "mech", text: "<strong>Promotion</strong>: advertising appeals that work in individualist cultures (personal achievement) may alienate collectivist cultures (group harmony)." },
          { type: "imp", text: "The cost of cultural mistakes can be severe — a single offensive ad can destroy years of brand-building in a market.", tag: "exam" }
        ]
      }
    ],
    flow: {
      steps: ["Research local culture (Hofstede, local experts)", "Identify required adaptations to the marketing mix", "Test locally before full launch"],
      result: "Culturally sensitive marketing builds trust; cultural blindness destroys it",
      resultType: "neutral"
    },
    examMatters: "Examiners expect you to use Hofstede or similar cultural frameworks to justify adaptation decisions. Don't just say 'culture matters' — specify which dimension (e.g. 'Japan's high uncertainty avoidance means consumers prefer established, trusted brands').",
    misconception: "Students assume Western marketing works everywhere. Wrong because different cultures have different values, communication styles, and purchasing behaviours. Instead write: marketing strategies must be adapted to the cultural context — what works in individualist Western markets (personal achievement, celebrity endorsement) may fail in collectivist Asian markets.",
    takeaway: [
      "Hofstede's dimensions: individualism, power distance, uncertainty avoidance, etc.",
      "Language, religion, and values all affect the marketing mix.",
      "Cultural mistakes are costly — invest in local research before entering a market."
    ]
  }
];


const NOTES_434 = [
  {
    title: "Multinational Corporations: Impact and Ethics",
    meta: "5 concepts",
    keyIdea: "MNCs bring investment, jobs, and technology to host countries but also raise ethical concerns about labour exploitation, environmental damage, and tax avoidance — the net impact depends on the host country's governance.",
    blocks: [
      {
        title: "POSITIVE IMPACTS",
        items: [
          { type: "mech", text: "<strong>Job creation</strong> — MNC operations directly employ local workers and indirectly support jobs in local supply chains." },
          { type: "mech", text: "<strong>Technology and skills transfer</strong> — MNCs introduce advanced production methods, management techniques, and training programmes." },
          { type: "mech", text: "<strong>Tax revenue and exports</strong> — MNC output contributes to GDP, tax collection, and foreign exchange earnings.", tag: "exam" }
        ]
      },
      {
        title: "NEGATIVE IMPACTS AND ETHICAL ISSUES",
        items: [
          { type: "mech", text: "<strong>Profit repatriation</strong> — MNCs send profits back to their home country, reducing the economic benefit to the host economy." },
          { type: "mech", text: "<strong>Transfer pricing</strong> — MNCs shift profits to low-tax jurisdictions by manipulating prices between subsidiaries, reducing host-country tax revenue.", tag: "exam" },
          { type: "mech", text: "<strong>Labour exploitation</strong> — low wages, poor conditions, excessive hours, and weak enforcement of labour laws in developing countries." },
          { type: "mech", text: "<strong>Environmental damage</strong> — some MNCs relocate polluting operations to countries with weaker environmental regulation ('pollution havens')." }
        ]
      },
      {
        title: "EVALUATION",
        items: [
          { type: "imp", text: "The net impact of MNCs depends on the host country's <strong>governance quality</strong> — strong regulation and institutions capture more of the benefits; weak governance allows exploitation.", tag: "exam" },
          { type: "link", text: "MNC ethics links to CSR (3.3.4): firms that adopt genuine CSR practices in their global operations build brand trust; those caught exploiting workers face boycotts and reputational damage." }
        ]
      }
    ],
    flow: {
      steps: ["MNC invests in host country", "Brings jobs, technology, and tax revenue", "But may repatriate profits, avoid tax, and exploit workers"],
      result: "Net impact depends on host-country governance and MNC's ethical standards",
      resultType: "neutral"
    },
    examMatters: "Examiners expect balanced evaluation: acknowledge both the benefits (jobs, technology, exports) and the costs (profit repatriation, transfer pricing, exploitation). The strongest answers link to stakeholder analysis and CSR frameworks.",
    misconception: "Students say MNCs always exploit developing countries. Wrong because MNC wages are typically above local averages, technology transfer raises productivity, and exports boost economic growth. Instead write: MNCs create significant benefits for host countries but the distribution of those benefits depends on the strength of local governance, regulation, and the MNC's own ethical standards.",
    takeaway: [
      "Positives: jobs, technology transfer, tax revenue, exports.",
      "Negatives: profit repatriation, transfer pricing, labour/environmental exploitation.",
      "Host-country governance determines how much benefit is captured locally."
    ]
  },

  {
    title: "Transfer Pricing and Tax Avoidance",
    meta: "4 concepts",
    keyIdea: "Transfer pricing allows MNCs to shift profits to low-tax jurisdictions by manipulating prices between their own subsidiaries — it is legal but controversial, reducing tax revenue in countries where real economic activity occurs.",
    blocks: [
      {
        title: "HOW IT WORKS",
        items: [
          { type: "def", text: "<strong>Transfer pricing</strong> — the price at which goods, services, or intellectual property are traded between different subsidiaries of the same MNC across national borders.", tag: "exam" },
          { type: "mech", text: "By charging <strong>artificially high prices</strong> from a subsidiary in a low-tax country to one in a high-tax country, the MNC shifts profit to where it is taxed least." },
          { type: "mech", text: "Intellectual property (brands, patents) is particularly easy to manipulate — an MNC can park a patent in Ireland or Luxembourg and charge royalties to subsidiaries worldwide." }
        ]
      },
      {
        title: "ETHICAL AND POLICY IMPLICATIONS",
        items: [
          { type: "mech", text: "Transfer pricing is <strong>legal</strong> but ethically questionable — it deprives host countries of tax revenue that could fund public services and infrastructure." },
          { type: "mech", text: "International efforts to combat it include the OECD's <strong>BEPS (Base Erosion and Profit Shifting)</strong> framework and proposals for a global minimum corporate tax rate." },
          { type: "imp", text: "For developing countries with weak tax authorities, transfer pricing can drain billions in potential revenue, undermining development efforts.", tag: "exam" }
        ]
      }
    ],
    flow: {
      steps: ["MNC creates subsidiary in low-tax country", "Charges inflated prices to subsidiaries in high-tax countries", "Profit shifts to low-tax jurisdiction"],
      result: "MNC pays less tax overall; host countries lose revenue",
      resultType: "bad"
    },
    examMatters: "Examiners expect you to explain the mechanism and evaluate the ethics. Distinguish between legal tax avoidance (transfer pricing) and illegal tax evasion. Discuss: should governments crack down, or will that just drive MNCs to relocate elsewhere?",
    misconception: "Students confuse tax avoidance with tax evasion. Tax avoidance (including transfer pricing) is legal — it exploits loopholes in tax law. Tax evasion is illegal — it involves hiding income. Instead write: transfer pricing is a form of legal tax avoidance that exploits differences between national tax systems; it is not illegal but is increasingly viewed as ethically unacceptable.",
    takeaway: [
      "Transfer pricing shifts profit to low-tax countries via intra-company price manipulation.",
      "Legal but ethically controversial — deprives host countries of tax revenue.",
      "OECD BEPS and global minimum tax proposals aim to combat it."
    ]
  },

  {
    title: "FDI and Its Impact on Stakeholders",
    meta: "4 concepts",
    keyIdea: "Foreign direct investment is a double-edged sword — it brings capital, jobs, and technology, but the benefits and costs are distributed unevenly among different stakeholder groups in both home and host countries.",
    blocks: [
      {
        title: "IMPACT ON HOST-COUNTRY STAKEHOLDERS",
        items: [
          { type: "mech", text: "<strong>Workers</strong>: FDI creates jobs and may raise wages, but working conditions depend on the MNC's standards and local regulation." },
          { type: "mech", text: "<strong>Local businesses</strong>: may benefit from supply chain contracts, but risk being crowded out by the MNC's scale and resources." },
          { type: "mech", text: "<strong>Government</strong>: gains tax revenue and GDP growth, but may offer excessive tax breaks to attract FDI, reducing net fiscal benefit.", tag: "exam" },
          { type: "mech", text: "<strong>Community</strong>: benefits from infrastructure and employment, but may suffer environmental damage and cultural disruption." }
        ]
      },
      {
        title: "IMPACT ON HOME-COUNTRY STAKEHOLDERS",
        items: [
          { type: "mech", text: "<strong>Shareholders</strong>: benefit from access to cheaper inputs and new markets, potentially increasing profits." },
          { type: "mech", text: "<strong>Domestic workers</strong>: may lose jobs if production is offshored to lower-cost countries." },
          { type: "imp", text: "Examiners expect you to consider FDI from multiple stakeholder perspectives and evaluate whether the net impact is positive — this depends on governance, regulation, and the type of FDI (manufacturing vs extractive).", tag: "exam" }
        ]
      }
    ],
    flow: {
      steps: ["MNC makes FDI in host country", "Jobs and technology created locally", "Profits flow back to home country"],
      result: "Benefits and costs distributed unevenly — stakeholder analysis reveals the trade-offs",
      resultType: "neutral"
    },
    examMatters: "Examiners expect multi-stakeholder analysis of FDI. Don't just list pros and cons — assign them to specific stakeholder groups and evaluate the net impact. The strongest answers consider whether the host government can negotiate terms that capture local benefit.",
    misconception: "Students say FDI is always good for the host country. Wrong because the terms of FDI matter — if the government offers excessive tax holidays and the MNC repatriates all profit, the host country may gain very little. Instead write: FDI is beneficial when the host government negotiates strong terms (local content requirements, tax obligations, labour standards) — without these, the benefits may flow disproportionately to the MNC.",
    takeaway: [
      "FDI impacts: workers (jobs), local firms (contracts vs crowding out), government (tax), community.",
      "Home-country: shareholders gain but domestic workers may lose jobs.",
      "Net benefit depends on host government's bargaining power and regulatory framework."
    ]
  }
];


const SECTIONS = [
  { id: 'globalisation',           label: '4.3.1 Globalisation',              notes: NOTES_431 },
  { id: 'global-markets-expansion', label: '4.3.2 Global Markets & Expansion', notes: NOTES_432 },
  { id: 'global-marketing',         label: '4.3.3 Global Marketing',           notes: NOTES_433 },
  { id: 'global-industries-mncs',   label: '4.3.4 Global Industries & MNCs',   notes: NOTES_434 },
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
    if (error) { console.error(`   ✗ FAILED: ${error.message}`); allSuccess = false; }
    else { console.log('   ✓ SUCCESS — pushed to Supabase.'); }
  }
  console.log(allSuccess ? '\n✅ All sections updated.' : '\n⚠️  Some sections failed.');
}
main();
