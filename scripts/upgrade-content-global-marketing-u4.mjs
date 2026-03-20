/**
 * UPGRADE — 4.3.3 Global Marketing
 * Rewrites section_content from old concepts[] format to new sections[] format.
 * Run: node scripts/upgrade-content-global-marketing-u4.mjs
 */
import { supabase } from './_db.mjs';

const CONTENT = [
  /* ═══════════════════════════════════════════════════
   *  Chapter 1: Standardisation vs Adaptation
   * ═══════════════════════════════════════════════════ */
  {
    title: "Standardisation vs Adaptation",
    sections: [
      {
        id: "global-standardisation",
        title: "Global Standardisation",
        keyIdea: "Selling the same product with the same marketing everywhere delivers massive economies of scale and brand consistency — but risks ignoring local tastes that determine whether consumers actually buy.",
        body: [
          { type: "paragraph", text: "**Global standardisation** means offering an identical product, brand image, and marketing mix across all markets. The logic is compelling: one product design, one advertising campaign, one supply chain — this generates enormous **economies of scale** in production, marketing, and R&D. It also creates a consistent **global brand identity** that consumers recognise from New York to Nairobi." },
          { type: "paragraph", text: "Standardisation works best for products with **universal appeal** and low cultural sensitivity — technology, luxury goods, and industrial components. A semiconductor or a Louis Vuitton handbag requires little adaptation. Consumer staples like food and personal care products, however, are deeply influenced by local tastes, religious requirements, and climate." },
          { type: "paragraph", text: "The risk of pure standardisation is **cultural blindness** — assuming that what works at home will work everywhere. Firms that ignore local preferences may find their standardised product sitting on shelves while locally adapted competitors thrive. The cost savings from standardisation are worthless if nobody buys the product." },
          { type: "flow", steps: ["Firm standardises product globally", "Economies of scale reduce unit costs", "Consistent brand image worldwide"], result: "Lower costs and strong brand — but risk of poor fit with local consumer preferences", resultType: "neutral" }
        ],
        realExample: { emoji: "🥤", text: "Coca-Cola maintains one of the most standardised global brands — the red logo, the contour bottle, and the core formula are identical worldwide. Yet even Coca-Cola adapts: it sells sweeter formulations in some Asian markets and offers local flavours like Thums Up in India and Beverly in Italy, showing that even the most global brand makes local tweaks." },
        misconception: "Students say standardisation is always cheaper than adaptation. Wrong — the cost savings from standardisation only matter if the product sells. A standardised product that fails in a market because it ignores local tastes generates zero revenue, which is more expensive than adapting. Instead write: standardisation reduces costs per unit, but only generates savings if the standardised product achieves sufficient sales volume in each market.",
        examMatters: "Examiners ask you to evaluate whether standardisation or adaptation is better for a given firm. Always consider the product type (universal vs culturally sensitive), the firm's resources (can it afford to adapt?), and the target markets (how different are consumer preferences?). The best answers recognise it is rarely pure standardisation or pure adaptation."
      },
      {
        id: "glocalisation",
        title: "Glocalisation: Think Global, Act Local",
        keyIdea: "Glocalisation combines global scale with local adaptation — firms keep a standardised core product and brand but tailor specific elements of the marketing mix to local markets.",
        body: [
          { type: "paragraph", text: "**Glocalisation** — a portmanteau of globalisation and localisation — is the strategy of maintaining a **global brand and core product** while adapting specific elements to suit local markets. The firm 'thinks global' in its brand positioning and supply chain, but 'acts local' in its product features, pricing, promotion, and distribution." },
          { type: "paragraph", text: "The **marketing mix** (4Ps) is the key tool for glocalisation. **Product**: adapt flavours, sizes, or features (McDonald's serves McArabia in the Middle East). **Price**: adjust for local purchasing power and competition. **Promotion**: translate and culturally adapt advertising, using local celebrities or cultural references. **Place**: use local distribution channels suited to how consumers actually shop in that market." },
          { type: "paragraph", text: "Glocalisation captures the best of both worlds: the **cost efficiencies** of a global supply chain and the **revenue benefits** of local relevance. However, it is operationally complex — the firm must coordinate global consistency while empowering local managers to make adaptation decisions. Getting the balance wrong results in either a bland global product or an incoherent patchwork of local variations." },
          { type: "flow", steps: ["Global core product and brand identity", "Local adaptation of marketing mix elements", "Balance between scale and relevance"], result: "Glocalisation — economies of scale plus local market fit", resultType: "good" }
        ],
        realExample: { emoji: "🍟", text: "McDonald's is the textbook glocalisation case. The golden arches, drive-through format, and fast-service model are globally standardised. But the menu adapts everywhere: McSpicy Paneer in India (where beef is culturally sensitive), Teriyaki Burger in Japan, McArabia flatbread in the Middle East, and poutine in Canada." },
        misconception: "Students treat glocalisation as a simple middle ground between standardisation and adaptation. Wrong — glocalisation is a deliberate strategic choice that requires sophisticated management systems to decide which elements to standardise and which to adapt. Instead write: glocalisation requires firms to make precise decisions about which parts of the marketing mix to standardise for scale and which to adapt for local relevance — this is harder, not easier, than choosing one extreme.",
        examMatters: "When evaluating marketing strategies, glocalisation is usually the strongest evaluative point because it acknowledges that pure standardisation and pure adaptation are both suboptimal. State which elements of the 4Ps should be standardised and which adapted, and explain why — this shows the examiner you can apply theory to the specific case."
      }
    ],
    takeaway: [
      "Standardisation: same product everywhere — economies of scale but risk of cultural blindness.",
      "Adaptation: tailored to each market — higher relevance but higher costs and complexity.",
      "Glocalisation: global core + local adaptation of specific marketing mix elements — the dominant strategy for most MNCs.",
      "Apply through the 4Ps: decide which of Product, Price, Promotion, and Place to standardise and which to adapt."
    ]
  },

  /* ═══════════════════════════════════════════════════
   *  Chapter 2: Cultural Influences on Global Marketing
   * ═══════════════════════════════════════════════════ */
  {
    title: "Cultural Influences on Global Marketing",
    sections: [
      {
        id: "hofstede-dimensions",
        title: "Hofstede's Cultural Dimensions",
        keyIdea: "Hofstede's framework quantifies how cultures differ on dimensions like individualism, power distance, and uncertainty avoidance — giving marketers a structured way to predict how consumers in different countries will respond.",
        body: [
          { type: "paragraph", text: "**Geert Hofstede** identified cultural dimensions that vary systematically across countries and directly influence consumer behaviour. **Individualism vs collectivism**: individualist cultures (US, UK) respond to personal achievement messaging; collectivist cultures (Japan, China) respond to family and group harmony. **Power distance**: high power-distance cultures (India, Malaysia) accept hierarchical marketing; low power-distance cultures (Denmark, Sweden) prefer egalitarian messaging." },
          { type: "paragraph", text: "**Uncertainty avoidance** measures tolerance for ambiguity. High uncertainty-avoidance cultures (Germany, Japan) prefer detailed product information, guarantees, and established brands. Low uncertainty-avoidance cultures (US, Singapore) are more receptive to innovation and risk-taking messaging. **Masculinity vs femininity**: masculine cultures value achievement and competition; feminine cultures value relationships and quality of life." },
          { type: "paragraph", text: "For marketers, Hofstede provides a **predictive framework** — before entering a market, a firm can assess where the target culture sits on each dimension and adjust its marketing mix accordingly. However, the framework has limitations: it treats countries as culturally homogeneous, ignores subcultures and generational shifts, and was originally based on IBM employee surveys from the 1970s." },
          { type: "flow", steps: ["Analyse target country on Hofstede's dimensions", "Identify key cultural differences from home market", "Adapt marketing message and mix accordingly"], result: "Marketing resonates with local cultural values — improving brand reception and sales", resultType: "good" }
        ],
        realExample: { emoji: "🍗", text: "KFC's famous slogan 'finger-lickin' good' was reportedly translated into Mandarin as something close to 'eat your fingers off' when KFC first entered China — a culturally inappropriate message in a high-context, collectivist culture. KFC adapted by repositioning as a family dining experience and localising its menu with congee and rice dishes, aligning with Chinese collectivist dining culture." },
        misconception: "Students treat Hofstede's dimensions as rigid rules that apply uniformly to every consumer in a country. Wrong — there is enormous variation within any culture (urban vs rural, young vs old, educated vs less educated). Instead write: Hofstede identifies cultural tendencies at the national level, but marketers must recognise that individual consumers within any culture vary widely — the dimensions are a starting point for analysis, not a deterministic formula.",
        examMatters: "Examiners reward students who apply Hofstede to a specific business scenario rather than just listing dimensions. Pick the one or two dimensions most relevant to the case (e.g., individualism for an advertising question, uncertainty avoidance for a new product launch) and explain how they affect the marketing decision."
      },
      {
        id: "cultural-mistakes-brand-impact",
        title: "Cultural Mistakes & Their Impact on Brand Building",
        keyIdea: "Language, religion, values, and social norms shape every element of the marketing mix — a single cultural mistake can destroy years of careful brand-building overnight.",
        body: [
          { type: "paragraph", text: "**Language** is the most visible cultural barrier. Translation errors, unintended meanings, and culturally inappropriate imagery can turn a global launch into a PR disaster. But cultural influence goes far deeper: **religion** affects product acceptability (halal requirements, modesty in advertising), **values** shape what consumers aspire to, and **social norms** determine how products are consumed, gifted, and displayed." },
          { type: "paragraph", text: "The marketing mix must be culturally audited at every level. **Product**: ingredients, packaging colours (white = mourning in China, celebration in the West), sizes. **Price**: attitudes to bargaining, prestige pricing, gifting price points. **Promotion**: humour, celebrity choice, gender roles in advertising, appropriate media channels. **Place**: shopping habits (street markets vs e-commerce vs malls vary enormously by culture)." },
          { type: "paragraph", text: "Cultural mistakes are disproportionately costly because they signal **disrespect** — consumers feel the brand does not care enough about them to understand their culture. Rebuilding trust after a cultural misstep requires years of investment. The most successful global brands invest heavily in **local cultural expertise** — hiring local marketing teams, conducting local consumer research, and testing campaigns with local focus groups before launch." },
          { type: "flow", steps: ["Firm launches globally without cultural audit", "Marketing clashes with local values or language", "Negative media coverage and consumer backlash"], result: "Brand reputation damaged — years of brand-building destroyed by one preventable mistake", resultType: "bad" }
        ],
        realExample: { emoji: "🧴", text: "Unilever's 'Fair & Lovely' skin-lightening cream was marketed across South Asia and Africa for decades. Growing awareness of racial justice issues led to accusations that the brand promoted colourism. In 2020, Unilever rebranded it as 'Glow & Lovely' — a costly rebrand driven by shifting cultural values around race and beauty standards, showing how cultural context evolves over time." },
        misconception: "Students think cultural mistakes only happen due to bad translations. Wrong — the deepest cultural errors involve misunderstanding values, not just language. A technically correct translation can still be culturally offensive if it violates social norms around gender, religion, or status. Instead write: cultural mistakes range from surface-level translation errors to deep misalignment with local values — the latter are harder to detect and more damaging to fix.",
        examMatters: "Examiners test whether you understand that culture affects all 4Ps, not just promotion. A strong answer explains how culture shapes product design, pricing strategy, promotional messaging, AND distribution channels — then evaluates whether the firm's marketing mix is culturally appropriate for the specific target market."
      }
    ],
    takeaway: [
      "Hofstede's dimensions (individualism, power distance, uncertainty avoidance, masculinity) provide a structured cultural analysis.",
      "Language, religion, values, and social norms influence every element of the marketing mix — not just advertising.",
      "Cultural mistakes are disproportionately damaging because they signal disrespect for local consumers.",
      "Invest in local cultural expertise: local teams, consumer research, and pre-launch testing prevent costly errors."
    ]
  }
];

async function main() {
  console.log('Upgrading 4.3.3 Global Marketing to new format...');

  const { error } = await supabase
    .from('section_content')
    .update({ data: CONTENT })
    .eq('section_id', 'global-marketing');

  if (error) {
    console.error('FAILED:', error.message);
  } else {
    console.log('SUCCESS — 2 chapters, ' + CONTENT.reduce((n, c) => n + c.sections.length, 0) + ' sections pushed.');
  }
}

main();
