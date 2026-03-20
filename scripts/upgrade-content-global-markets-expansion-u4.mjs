/**
 * UPGRADE — 4.3.2 Global Markets & Expansion
 * Rewrites section_content from old concepts[] format to new sections[] format.
 * Run: node scripts/upgrade-content-global-markets-expansion-u4.mjs
 */
import { supabase } from './_db.mjs';

const CONTENT = [
  /* ═══════════════════════════════════════════════════
   *  Chapter 1: Market Entry Methods
   * ═══════════════════════════════════════════════════ */
  {
    title: "Market Entry Methods",
    sections: [
      {
        id: "exporting-licensing-franchising",
        title: "Exporting, Licensing & Franchising",
        keyIdea: "Exporting is the simplest way to go global with low investment but low control, while licensing and franchising let firms earn income from foreign markets without running operations themselves.",
        body: [
          { type: "paragraph", text: "**Exporting** means producing domestically and selling abroad. It requires the lowest investment and risk — the firm does not need foreign premises or staff. However, it gives limited control over marketing and distribution, and the product faces tariffs, shipping costs, and exchange rate risk that squeeze margins." },
          { type: "paragraph", text: "**Licensing** grants a foreign firm the right to use intellectual property (patents, technology, brand name) in exchange for a royalty fee. **Franchising** is a specific form of licensing where the franchisee replicates the entire business format — branding, operations manual, supply chain — in return for franchise fees and ongoing royalties." },
          { type: "paragraph", text: "Both licensing and franchising allow rapid international expansion with minimal capital investment. The trade-off is control: the licensor or franchisor depends on the partner to maintain quality and brand standards. A poorly run franchise can damage the global brand overnight." },
          { type: "flow", steps: ["Firm wants international revenue", "Low capital available or risk-averse", "Licenses IP or franchises business model"], result: "Income from foreign markets with low investment — but limited control over quality and brand", resultType: "neutral" }
        ],
        realExample: { emoji: "🍔", text: "McDonald's operates over 40,000 restaurants in 100+ countries, with roughly 93% run by franchisees. The franchising model allowed McDonald's to scale globally without bearing the capital cost of building every restaurant — but it depends entirely on franchisees maintaining consistent quality, from Tokyo to Johannesburg." },
        misconception: "Students say franchising means the parent company has no control. Wrong — franchise agreements include strict operational standards, regular inspections, and the right to terminate underperforming franchisees. Instead write: franchising trades direct operational control for contractual control — the franchisor sets standards but relies on the franchisee to execute them.",
        examMatters: "Examiners ask you to recommend an entry method for a given scenario. Match the method to the firm's resources and objectives: exporting suits firms testing a market; franchising suits firms with a replicable format; neither suits firms needing tight quality control over complex products."
      },
      {
        id: "joint-ventures-fdi",
        title: "Joint Ventures & Foreign Direct Investment",
        keyIdea: "Joint ventures share risk and local knowledge with a partner, while FDI gives the firm maximum control by owning foreign operations outright — but both require significant commitment and capital.",
        body: [
          { type: "paragraph", text: "A **joint venture (JV)** is a separate business entity created by two or more firms, often one local and one foreign. The foreign firm gains the local partner's market knowledge, distribution networks, and regulatory contacts. The local firm gains capital, technology, and global brand recognition. Profits and decisions are shared." },
          { type: "paragraph", text: "**Foreign direct investment (FDI)** means establishing or acquiring production facilities in another country — building a factory, buying a local company, or setting up a wholly owned subsidiary. FDI gives the firm **maximum control** over operations, quality, and strategy, but requires the **highest capital commitment** and exposes the firm to full political and economic risk in the host country." },
          { type: "paragraph", text: "The choice between entry methods depends on three factors: **resources** (how much capital the firm can invest), **market characteristics** (regulatory requirements, cultural distance, political risk), and **speed** (how quickly the firm needs to establish a presence). There is no universally best method — it depends on the firm's context." },
          { type: "flow", steps: ["Firm assesses target market risk and opportunity", "High control needed → FDI", "Moderate risk tolerance → Joint venture", "Low capital → Exporting or franchising"], result: "Entry method chosen based on balance of control, risk, and resources", resultType: "neutral" }
        ],
        realExample: { emoji: "🚗", text: "Toyota's FDI strategy in the UK saw it build a major manufacturing plant in Derbyshire, employing over 3,000 workers. By producing inside the EU market (pre-Brexit), Toyota avoided tariffs and gained 'made in Britain' credibility — a textbook example of how FDI provides control and market proximity that exporting cannot." },
        misconception: "Students assume FDI is always the best entry method because it gives the most control. Wrong — FDI also carries the highest risk: political instability, nationalisation, currency depreciation, and cultural mismanagement can destroy the investment. Instead write: FDI maximises control but also maximises exposure; firms should only use it when the market opportunity justifies the risk and capital commitment.",
        examMatters: "A strong exam answer compares at least two entry methods, explaining why one is more suitable than another for a specific firm. Always use the framework: control vs risk vs resources vs speed. Conclude with 'it depends on' to show evaluative thinking."
      }
    ],
    takeaway: [
      "Entry methods ranked by control and risk: exporting < licensing/franchising < joint venture < FDI.",
      "Franchising allows rapid scale with low capital but depends on partner quality.",
      "FDI gives maximum control but requires the highest capital and risk exposure.",
      "The best entry method depends on the firm's resources, market characteristics, and how quickly it needs to establish a presence."
    ]
  },

  /* ═══════════════════════════════════════════════════
   *  Chapter 2: Strategic Analysis for Global Expansion
   * ═══════════════════════════════════════════════════ */
  {
    title: "Strategic Analysis for Global Expansion",
    sections: [
      {
        id: "ansoff-global-context",
        title: "Ansoff's Matrix in a Global Context",
        keyIdea: "Taking an existing product to a new country is market development on Ansoff's matrix — it carries more risk than market penetration but less than diversification, making it the most common global growth strategy.",
        body: [
          { type: "paragraph", text: "**Ansoff's matrix** maps four growth strategies based on whether the product and market are new or existing. In a global context, **market development** — selling an existing product in a new geographical market — is the most relevant quadrant. The product is proven, but the new market introduces uncertainty around consumer preferences, regulation, and competition." },
          { type: "paragraph", text: "**Market penetration** (existing product, existing market) means growing share domestically — less risky but limited by market saturation. **Product development** (new product, existing market) keeps the firm in familiar territory but requires R&D investment. **Diversification** (new product, new market) is the riskiest quadrant — a firm enters an unfamiliar market with an untested product." },
          { type: "paragraph", text: "For most firms going global, the strategic choice is market development: take what works at home and adapt it for abroad. The key risk is assuming that domestic success automatically translates overseas — cultural differences, regulatory requirements, and established local competitors can derail even strong products." },
          { type: "flow", steps: ["Firm saturates domestic market", "Seeks growth via market development", "Enters new country with existing product"], result: "Growth achieved if local adaptation succeeds — but cultural and regulatory risks remain", resultType: "neutral" }
        ],
        realExample: { emoji: "🎬", text: "Netflix's international expansion is textbook market development on Ansoff's matrix. It took its existing streaming service to 190 countries, keeping the core product (subscription streaming) but adapting content libraries to local tastes — investing in Korean dramas, Spanish thrillers, and Indian films to suit each market." },
        misconception: "Students confuse market development with diversification when a firm enters a new country. Wrong — if the product is essentially the same (even with minor local tweaks), it is market development. Diversification requires both a genuinely new product and a new market. Instead write: entering a new country with your existing product is market development; diversification means entering a new market with a fundamentally different product.",
        examMatters: "Examiners love asking which Ansoff quadrant a firm is using. Always identify the quadrant, then evaluate the level of risk. For market development: acknowledge that the product is proven but the market is uncertain — success depends on understanding local consumers and adapting appropriately."
      },
      {
        id: "pestle-bartlett-ghoshal",
        title: "PESTLE Analysis & the Bartlett-Ghoshal Framework",
        keyIdea: "PESTLE assesses the external environment of a target country across six dimensions, while Bartlett and Ghoshal's framework helps firms decide whether to standardise globally or adapt locally.",
        body: [
          { type: "paragraph", text: "**PESTLE analysis** evaluates a target market across six dimensions: **Political** (stability, corruption, trade policy), **Economic** (GDP growth, inflation, exchange rates), **Social** (culture, demographics, consumer habits), **Technological** (infrastructure, digital adoption), **Legal** (employment law, intellectual property protection), and **Environmental** (climate regulations, sustainability expectations). For global expansion, PESTLE identifies country-specific risks that domestic analysis would miss." },
          { type: "paragraph", text: "The **Bartlett and Ghoshal framework** classifies MNC strategies based on two pressures: the need for **global integration** (cost efficiency through standardisation) and the need for **local responsiveness** (adapting to local tastes and regulations). This produces four strategies: **International** (low-low, export home model), **Multi-domestic** (low integration, high responsiveness), **Global** (high integration, low responsiveness), and **Transnational** (high-high, the ideal but hardest to achieve)." },
          { type: "paragraph", text: "In practice, most successful MNCs aim for the **transnational** approach — achieving scale economies through global integration while adapting products and marketing to local markets. This is extremely difficult because it requires balancing contradictory pressures: centralised efficiency vs decentralised flexibility." },
          { type: "flow", steps: ["PESTLE identifies country-specific risks", "Bartlett-Ghoshal determines strategy type", "Firm balances global integration vs local responsiveness"], result: "Optimal strategy matches the firm's capabilities to the market's demands", resultType: "good" }
        ],
        realExample: { emoji: "🚕", text: "Uber's global expansion illustrates both tools. A PESTLE analysis would have flagged regulatory barriers (political/legal) — in London, TfL repeatedly threatened Uber's licence over safety concerns. In Germany, courts banned UberPop. Uber learned that a purely global strategy fails when local regulation demands responsiveness, pushing it toward a more transnational approach." },
        misconception: "Students list PESTLE factors without applying them to a specific business decision. Wrong — PESTLE is only useful when linked to strategic action. Instead write: identify the PESTLE factor, explain the specific risk or opportunity it creates, and state how the firm should respond — for example, 'weak IP law (Legal) means the firm should use FDI rather than licensing to protect its technology'.",
        examMatters: "Examiners reward application over description. Do not just list P-E-S-T-L-E — pick the two or three factors most relevant to the firm in the question and explain how they influence the entry method or strategy. Link PESTLE to Bartlett-Ghoshal: if Social factors demand adaptation, the firm needs a multi-domestic or transnational strategy, not a global one."
      }
    ],
    takeaway: [
      "Ansoff's market development = existing product, new country — the most common global growth route.",
      "PESTLE identifies country-specific risks across Political, Economic, Social, Technological, Legal, Environmental dimensions.",
      "Bartlett-Ghoshal: international, multi-domestic, global, or transnational — depends on integration vs responsiveness pressures.",
      "The transnational strategy (high integration + high responsiveness) is the ideal but hardest to execute."
    ]
  }
];

async function main() {
  console.log('Upgrading 4.3.2 Global Markets & Expansion to new format...');

  const { error } = await supabase
    .from('section_content')
    .update({ data: CONTENT })
    .eq('section_id', 'global-markets-expansion');

  if (error) {
    console.error('FAILED:', error.message);
  } else {
    console.log('SUCCESS — 2 chapters, ' + CONTENT.reduce((n, c) => n + c.sections.length, 0) + ' sections pushed.');
  }
}

main();
