/**
 * UPGRADE — 3.3.1 Corporate Objectives & Strategy
 * Rewrites section_content from old concepts[] format to new sections[] format.
 * Run: node scripts/upgrade-content-business-objectives-strategy.mjs
 */
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://trweeckuswgkenckeqfb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);

const CONTENT = [
  /* ═══════════════════════════════════════════════════
   *  Chapter 1: Corporate Objectives & Strategy
   * ═══════════════════════════════════════════════════ */
  {
    title: "Corporate Objectives & Strategy",
    sections: [
      {
        id: "mission-and-objectives",
        title: "Mission Statements & SMART Objectives",
        keyIdea: "A mission statement sets the direction; SMART objectives turn that direction into measurable targets — without both, strategy is either vague dreaming or aimless box-ticking.",
        body: [
          { type: "paragraph", text: "A **mission statement** communicates the core purpose and values of a business to stakeholders. It answers the question: why does this firm exist beyond making money? A strong mission aligns employees, attracts like-minded customers, and guides long-term decision-making." },
          { type: "paragraph", text: "Objectives translate the mission into concrete goals. **SMART objectives** are Specific, Measurable, Achievable, Relevant, and Time-bound. A hierarchy exists: the corporate objective sits at the top, departmental objectives sit below, and individual targets cascade down — ensuring every employee's work connects to the firm's overall direction." },
          { type: "paragraph", text: "The hierarchy of objectives creates alignment. The corporate objective might be 'increase market share to 25% within three years', which filters down into a marketing objective of launching two new campaigns per quarter and a production objective of reducing unit costs by 8%." },
          { type: "flow", steps: ["Mission defines purpose", "Corporate objectives set measurable goals", "Departmental targets cascade down", "Individual KPIs align to departments"], result: "Whole organisation pulls in the same direction", resultType: "good" }
        ],
        realExample: { emoji: "🚗", text: "Tesla's mission is to 'accelerate the world's transition to sustainable energy'. This drives every corporate objective — from scaling EV production to expanding the Supercharger network — and filters down to engineering targets for battery range and cost reduction." },
        misconception: "Students list SMART criteria without explaining why they matter. Wrong — the point is not the acronym itself but that vague goals cannot be measured or evaluated. Instead write: SMART objectives allow a firm to track progress, hold managers accountable, and adjust strategy when targets are missed.",
        examMatters: "Examiners often ask you to evaluate whether a mission statement has real strategic value or is just PR. Strong answers distinguish between firms where the mission genuinely shapes decisions (Patagonia's environmental focus) and firms where it is a vague slogan with no operational impact."
      },
      {
        id: "swot-analysis",
        title: "SWOT Analysis",
        keyIdea: "SWOT maps a firm's internal strengths and weaknesses against external opportunities and threats — it is a starting point for strategy, not a strategy itself.",
        body: [
          { type: "paragraph", text: "**SWOT analysis** is a strategic planning tool that audits a firm's position. **Strengths** and **weaknesses** are internal factors the firm can control — brand reputation, workforce skills, financial reserves. **Opportunities** and **threats** are external factors it cannot control — market trends, competitor actions, regulatory changes." },
          { type: "paragraph", text: "The real value of SWOT is in the cross-analysis. A strength matched to an opportunity suggests an aggressive growth strategy. A weakness exposed to a threat signals a defensive priority. Without this matching, SWOT becomes a static list rather than a dynamic decision-making tool." },
          { type: "paragraph", text: "SWOT has limitations. It is subjective — two managers may categorise the same factor differently. It offers a snapshot, not a moving picture, so it dates quickly in fast-changing markets. It does not prioritise: listing twenty strengths and three threats gives no guidance on which matter most." },
          { type: "flow", steps: ["Audit internal strengths & weaknesses", "Scan external opportunities & threats", "Match strengths to opportunities", "Address weaknesses exposed to threats"], result: "Informed strategic choices — but only if the analysis is acted upon", resultType: "neutral" }
        ],
        realExample: { emoji: "🎬", text: "A SWOT of Netflix might identify strengths (global brand, data-driven content), weaknesses (high debt from original content spend), opportunities (growth in Asian markets), and threats (password-sharing crackdowns alienating users, Disney+ competition). The value is in matching: Netflix's data strength meets the Asian growth opportunity." },
        misconception: "Students present SWOT as a conclusion. Wrong — SWOT is an analytical starting point, not an answer. Instead write: SWOT identifies the strategic position; the firm must then choose a strategy (e.g. Ansoff's matrix or Porter's strategies) to act on what the SWOT reveals.",
        examMatters: "When asked to conduct a SWOT for a case study firm, examiners reward specificity. Do not write generic points like 'strong brand'. Instead write context-specific points drawn from the case data and link each factor to a strategic implication."
      }
    ],
    takeaway: [
      "Mission statements set purpose; SMART objectives make it measurable and actionable.",
      "The hierarchy of objectives ensures corporate goals cascade into every department and role.",
      "SWOT maps position but is a starting point — match strengths to opportunities to generate strategy.",
      "SWOT is subjective and static; always acknowledge these limitations in evaluation."
    ]
  },

  /* ═══════════════════════════════════════════════════
   *  Chapter 2: Strategic Direction
   * ═══════════════════════════════════════════════════ */
  {
    title: "Strategic Direction",
    sections: [
      {
        id: "ansoffs-matrix",
        title: "Ansoff's Matrix",
        keyIdea: "Ansoff's matrix organises growth options by two dimensions — existing vs new products and existing vs new markets — with risk increasing as the firm moves away from what it already knows.",
        body: [
          { type: "paragraph", text: "**Ansoff's matrix** provides four growth strategies. **Market penetration** (existing product, existing market) is lowest risk — the firm grows by increasing market share through marketing, pricing, or loyalty schemes. **Product development** (new product, existing market) uses the firm's knowledge of its customers to introduce something new." },
          { type: "paragraph", text: "**Market development** (existing product, new market) takes a proven product to new geographies or demographics. **Diversification** (new product, new market) is highest risk because the firm has no existing knowledge of either the product or the customer base." },
          { type: "paragraph", text: "The strategic choice depends on context. A saturated market pushes a firm towards product development or market development. A firm with strong R&D capability may favour product development. Diversification is rare and often driven by a desire to spread risk across unrelated industries." },
          { type: "flow", steps: ["Firm identifies growth opportunity", "Plots option on Ansoff's matrix", "Assesses risk vs reward", "Matches to internal capabilities"], result: "Strategic direction chosen with awareness of risk level", resultType: "good" }
        ],
        realExample: { emoji: "📦", text: "Amazon's history maps perfectly onto Ansoff's matrix. It began with market penetration (more book buyers), moved to product development (Kindle, AWS), pursued market development (international expansion), and achieved diversification (Whole Foods grocery acquisition, healthcare entry)." },
        misconception: "Students describe the four quadrants without linking risk to the firm's capabilities. Wrong — diversification is not always the worst choice; it depends on the firm's resources. Instead write: risk increases diagonally across the matrix, but a firm with strong capabilities and deep pockets may manage diversification better than a weaker firm handles market penetration in a declining market.",
        examMatters: "Examiners expect you to apply Ansoff's matrix to a given firm, not just describe it. For a case study, identify which quadrant the firm's strategy falls into, explain why that level of risk is appropriate given the firm's position, and evaluate whether an alternative quadrant might be better."
      },
      {
        id: "porters-generic-strategies",
        title: "Porter's Generic Strategies",
        keyIdea: "Porter argues every firm must choose: compete on cost, compete on uniqueness, or focus on a niche — trying to do everything leaves the firm 'stuck in the middle' with no clear advantage.",
        body: [
          { type: "paragraph", text: "**Cost leadership** means being the lowest-cost producer in the industry. The firm achieves this through economies of scale, efficient operations, and tight cost control, then either undercuts rivals on price or matches their price for higher margins. This requires high volume and relentless operational efficiency." },
          { type: "paragraph", text: "**Differentiation** means offering something perceived as unique — design, brand, quality, innovation, or customer service — that justifies a premium price. The firm earns above-average returns because customers are willing to pay more. This requires sustained investment in R&D, marketing, or talent." },
          { type: "paragraph", text: "**Focus** applies either cost or differentiation to a narrow market segment. A focus strategy succeeds by serving a niche better than broad competitors can. Porter warned that firms failing to commit to one strategy get **stuck in the middle** — too expensive for cost-conscious buyers, too generic for quality-seeking ones." },
          { type: "flow", steps: ["Firm analyses competitive environment", "Chooses cost, differentiation, or focus", "Aligns all operations to that choice"], result: "Clear competitive advantage — or 'stuck in the middle' if no choice is made", resultType: "neutral" }
        ],
        realExample: { emoji: "🪑", text: "IKEA challenges Porter by combining cost leadership with differentiation. Its flat-pack model and massive purchasing power deliver low costs, while Scandinavian design and the in-store experience create genuine differentiation. Some analysts argue IKEA is a focused differentiator targeting young, urban, price-conscious consumers." },
        misconception: "Students assume cost leadership means cheapest price. Wrong — cost leadership means lowest costs of production, which may be used for low pricing or for higher margins at market prices. Instead write: cost leadership is about the cost base, not the price tag; the firm decides whether to pass savings to consumers or keep them as profit.",
        examMatters: "A common evaluative question is whether Porter's 'stuck in the middle' concept is still valid. Use IKEA or Zara as evidence that some firms blend strategies successfully. Argue that advances in technology and supply-chain management may have made hybrid strategies more achievable than Porter originally believed."
      }
    ],
    takeaway: [
      "Ansoff's matrix: penetration (safe) → product dev → market dev → diversification (risky).",
      "Porter's three strategies: cost leadership, differentiation, or focus — choose one clearly.",
      "'Stuck in the middle' is Porter's warning against half-measures, though modern firms sometimes blend strategies.",
      "Always apply these frameworks to the specific firm in the case study — description alone scores poorly."
    ]
  }
];

async function main() {
  console.log('Upgrading 3.3.1 Business Objectives & Strategy to new format...');

  const { error } = await supabase
    .from('section_content')
    .update({ data: CONTENT })
    .eq('section_id', 'business-objectives-strategy');

  if (error) {
    console.error('FAILED:', error.message);
  } else {
    console.log('SUCCESS — ' + CONTENT.length + ' chapters, ' + CONTENT.reduce((n, c) => n + c.sections.length, 0) + ' sections pushed.');
  }
}

main();
