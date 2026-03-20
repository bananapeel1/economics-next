/**
 * RICH NOTES — Business Unit 3, Part 1 (3.3.1, 3.3.2, 3.3.3)
 * ============================================================
 * Edexcel IAL Business Unit 3 — Business Decisions and Strategy
 *
 * Sections:
 *   3.3.1 Business Objectives & Strategy   (business-objectives-strategy)
 *   3.3.2 Business Growth                  (business-growth)
 *   3.3.3 Decision-Making Techniques       (decision-making-techniques)
 *
 * Run with: node scripts/update-business-unit3-rich-notes-part1.mjs
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL || 'https://trweeckuswgkenckeqfb.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);


/* ═══════════════════════════════════════════════════════════════
 *  3.3.1 — BUSINESS OBJECTIVES & STRATEGY
 * ═══════════════════════════════════════════════════════════════ */

const NOTES_331 = [
  {
    title: "Corporate Objectives and Mission",
    meta: "5 concepts",
    keyIdea: "A business mission defines its purpose and values, while corporate objectives translate that mission into measurable targets — every strategic decision should flow from this hierarchy.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          { type: "def", text: "<strong>Mission statement</strong> — a written declaration of a firm's core purpose and values; it answers 'why do we exist?' and guides strategic direction." },
          { type: "def", text: "<strong>Corporate objectives</strong> — quantifiable targets set at the top level of the business (e.g. 'achieve 15% market share by 2027'); they translate the mission into action.", tag: "exam" },
          { type: "def", text: "<strong>Functional objectives</strong> — targets set by individual departments (marketing, finance, HR, operations) that support the corporate objectives." },
          { type: "def", text: "<strong>SMART objectives</strong> — Specific, Measurable, Achievable, Relevant, Time-bound; the framework for writing effective business targets." }
        ]
      },
      {
        title: "HOW OBJECTIVES LINK",
        items: [
          { type: "mech", text: "Objectives form a <strong>hierarchy</strong>: mission → corporate aims → corporate objectives → functional objectives → individual targets." },
          { type: "mech", text: "Well-aligned objectives ensure all departments pull in the same direction; misalignment leads to <strong>conflicting priorities</strong> and wasted resources." },
          { type: "imp", text: "Examiners expect you to evaluate whether a firm's stated objectives match its actual behaviour — mission statements are often aspirational rather than operational.", tag: "exam" }
        ]
      }
    ],
    flow: {
      steps: ["Define mission and vision", "Set SMART corporate objectives", "Cascade to functional objectives"],
      result: "All departments aligned toward the same strategic goals",
      resultType: "good"
    },
    examMatters: "Examiners test whether you can link objectives to strategy. Always connect a firm's strategic decision to its stated objectives and evaluate whether the objective is actually being achieved.",
    misconception: "Students treat mission statements as operational tools. Wrong because many mission statements are vague PR exercises. Instead write: mission statements set direction and values, but it is the SMART corporate objectives beneath them that drive measurable action.",
    takeaway: [
      "Mission → corporate objectives → functional objectives → individual targets.",
      "SMART framework ensures objectives are measurable and actionable.",
      "Evaluate whether stated objectives match actual business behaviour."
    ]
  },

  {
    title: "Strategy and SWOT Analysis",
    meta: "5 concepts",
    keyIdea: "Strategy is the plan for achieving objectives — SWOT analysis provides a structured framework for evaluating where the business stands and which strategic direction makes sense.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          { type: "def", text: "<strong>Strategy</strong> — the medium-to-long-term plan that sets out how a business will achieve its corporate objectives; it involves choosing where to compete and how to win." },
          { type: "def", text: "<strong>SWOT analysis</strong> — a framework assessing internal Strengths and Weaknesses and external Opportunities and Threats to inform strategic decision-making.", tag: "exam" },
          { type: "def", text: "<strong>Tactics</strong> — short-term actions and decisions that implement the strategy; strategy is the 'what', tactics are the 'how'." }
        ]
      },
      {
        title: "USING SWOT EFFECTIVELY",
        items: [
          { type: "mech", text: "SWOT links internal capabilities (S/W) to the external environment (O/T), helping the firm identify where it has a <strong>competitive advantage</strong>." },
          { type: "mech", text: "The best strategies match <strong>strengths to opportunities</strong> (e.g. a strong brand entering a growing market) or use strengths to mitigate threats." },
          { type: "imp", text: "SWOT is a starting point, not a conclusion. Examiners reward you for using it to justify a recommendation, not just listing four quadrants.", tag: "exam" },
          { type: "link", text: "SWOT connects to Porter's competitive strategies and Ansoff's matrix — all three frameworks inform which strategic direction to take." }
        ]
      }
    ],
    flow: {
      steps: ["Audit internal strengths and weaknesses", "Scan external opportunities and threats", "Match strengths to opportunities in strategy"],
      result: "A clear strategic direction based on evidence, not guesswork",
      resultType: "good"
    },
    examMatters: "Examiners expect you to apply SWOT to the case study, not recite the framework. Identify specific S/W/O/T from the scenario, then use them to justify your strategic recommendation. A SWOT table with no analysis scores poorly.",
    misconception: "Students list SWOT factors without analysing them. Listing is not analysis. Instead write: always link SWOT to a recommendation — 'The firm's strong brand (S) combined with the growing Asian market (O) suggests it should pursue market development using Ansoff's matrix.'",
    takeaway: [
      "SWOT: internal strengths/weaknesses + external opportunities/threats.",
      "Match strengths to opportunities to form strategy.",
      "Always apply SWOT to the case study — listing alone earns low marks."
    ]
  },

  {
    title: "Strategic Direction: Ansoff's Matrix",
    meta: "5 concepts",
    keyIdea: "Ansoff's matrix maps out four strategic directions based on whether a firm is selling existing or new products in existing or new markets — each direction carries different levels of risk and reward.",
    blocks: [
      {
        title: "THE FOUR STRATEGIES",
        items: [
          { type: "def", text: "<strong>Market penetration</strong> — selling more of existing products in existing markets (lowest risk); focus on increasing market share through pricing, promotion, or loyalty.", tag: "exam" },
          { type: "def", text: "<strong>Product development</strong> — launching new products into existing markets (medium risk); leverages existing customer relationships and distribution channels." },
          { type: "def", text: "<strong>Market development</strong> — selling existing products in new markets (medium risk); involves geographical expansion or targeting new customer segments." },
          { type: "def", text: "<strong>Diversification</strong> — new products in new markets (highest risk); spreads risk but the firm operates outside its area of expertise." }
        ]
      },
      {
        title: "EVALUATION",
        items: [
          { type: "mech", text: "Risk increases as you move away from the firm's core business — diversification is riskiest because the firm lacks experience in both the product and the market." },
          { type: "imp", text: "Examiners expect you to justify which Ansoff strategy a firm should choose using evidence from the case study: financial position, market conditions, competitive environment, and risk appetite.", tag: "exam" },
          { type: "link", text: "Ansoff's matrix links to SWOT: match the firm's strengths and the market opportunities to determine which quadrant is most appropriate." }
        ]
      }
    ],
    flow: {
      steps: ["Assess existing products and markets", "Choose strategic direction using Ansoff's matrix", "Risk increases from penetration → diversification"],
      result: "Strategic direction aligned to the firm's capabilities and risk appetite",
      resultType: "good"
    },
    examMatters: "Examiners ask you to recommend and justify an Ansoff strategy. Don't just name the quadrant — explain why it fits: 'Given the firm's strong cash position (SWOT) and the saturated UK market, market development into Southeast Asia would leverage its existing product range while accessing high-growth markets.'",
    misconception: "Students say diversification is always bad because it's risky. Wrong because diversification spreads risk across multiple revenue streams and can be highly profitable if managed well (e.g. Virgin Group). Instead write: diversification is the riskiest option but may be justified when existing markets are declining or the firm has excess resources to invest.",
    takeaway: [
      "Ansoff's four strategies: penetration, product dev, market dev, diversification.",
      "Risk increases moving away from existing products and markets.",
      "Always justify your recommendation using case study evidence."
    ]
  },

  {
    title: "Competitive Strategy: Porter's Generic Strategies",
    meta: "4 concepts",
    keyIdea: "Porter argues that firms must choose between competing on cost or differentiation, across a broad or narrow market — trying to do everything leads to being 'stuck in the middle' with no competitive advantage.",
    blocks: [
      {
        title: "THE THREE STRATEGIES",
        items: [
          { type: "def", text: "<strong>Cost leadership</strong> — being the lowest-cost producer in the industry, enabling the firm to compete on price or earn higher margins at the market price.", tag: "exam" },
          { type: "def", text: "<strong>Differentiation</strong> — creating a product that is perceived as unique (quality, design, brand, service), allowing the firm to charge a premium price." },
          { type: "def", text: "<strong>Focus (niche)</strong> — targeting a narrow market segment with either a cost focus or differentiation focus strategy." }
        ]
      },
      {
        title: "EVALUATION",
        items: [
          { type: "mech", text: "Being <strong>stuck in the middle</strong> means having neither the lowest costs nor a differentiated product — the firm has no clear competitive advantage and earns below-average returns." },
          { type: "imp", text: "In practice, some firms successfully combine cost and differentiation (e.g. IKEA: stylish furniture at low cost). Porter's model may be too rigid for dynamic markets.", tag: "exam" },
          { type: "link", text: "Porter's strategies link to Ansoff's matrix: cost leadership often pairs with market penetration; differentiation pairs with product development." }
        ]
      }
    ],
    flow: {
      steps: ["Choose: compete on cost or differentiation", "Choose scope: broad market or niche", "Stuck in the middle = no competitive advantage"],
      result: "Clear competitive advantage through cost, differentiation, or focus",
      resultType: "good"
    },
    examMatters: "Examiners expect you to identify which Porter strategy a firm is using and evaluate whether it is sustainable. Use evidence: low prices suggest cost leadership; premium pricing and branding suggest differentiation.",
    misconception: "Students say a firm must choose one strategy and never change. Wrong because firms can shift strategy in response to market changes. Instead write: while Porter argues firms should commit to one strategy, in practice firms may evolve — the key is maintaining a clear competitive advantage at any given time.",
    takeaway: [
      "Cost leadership, differentiation, or focus — choose one for competitive advantage.",
      "Stuck in the middle = no clear advantage = below-average returns.",
      "Real-world firms sometimes combine strategies (IKEA model)."
    ]
  }
];


/* ═══════════════════════════════════════════════════════════════
 *  3.3.2 — BUSINESS GROWTH
 * ═══════════════════════════════════════════════════════════════ */

const NOTES_332 = [
  {
    title: "Organic Growth",
    meta: "4 concepts",
    keyIdea: "Organic growth — expanding from within using the firm's own resources — is the safest growth strategy but the slowest, making it most suitable for firms with time and a strong existing market position.",
    blocks: [
      {
        title: "KEY CONCEPTS",
        items: [
          { type: "def", text: "<strong>Organic (internal) growth</strong> — growth achieved through a firm's own activities, such as increasing sales, opening new outlets, developing new products, or entering new markets.", tag: "exam" },
          { type: "mech", text: "Organic growth is typically funded by <strong>retained profits</strong> or internal investment, avoiding the need for external debt or equity dilution." },
          { type: "mech", text: "It allows the firm to maintain <strong>corporate culture</strong> and management control, avoiding the integration challenges that come with mergers." }
        ]
      },
      {
        title: "EVALUATION",
        items: [
          { type: "mech", text: "<strong>Advantages</strong>: lower risk, maintains culture, sustainable pace, easier to manage." },
          { type: "mech", text: "<strong>Disadvantages</strong>: slow, may miss opportunities, competitors who grow externally may gain scale advantages faster." },
          { type: "imp", text: "Organic growth is best suited to firms in growing markets where speed is less critical; in mature or declining markets, external growth may be necessary to survive.", tag: "exam" }
        ]
      }
    ],
    flow: {
      steps: ["Reinvest retained profits", "Open new locations / develop new products", "Gradual increase in market share"],
      result: "Steady, low-risk growth that preserves culture and control",
      resultType: "good"
    },
    examMatters: "Examiners expect you to compare organic and external growth. Always link to the case study context: is the market growing (organic works) or mature (external may be needed)?",
    misconception: "Students say organic growth is always better because it's less risky. Wrong because in fast-moving markets, organic growth may be too slow — competitors could acquire key resources or customers first. Instead write: organic growth is lower risk but may be too slow in competitive or rapidly consolidating markets.",
    takeaway: [
      "Organic growth: expand from within using retained profits and existing capabilities.",
      "Lower risk but slower — may miss time-sensitive market opportunities.",
      "Best for growing markets where the firm has time to build incrementally."
    ]
  },

  {
    title: "External Growth: Mergers and Takeovers",
    meta: "5 concepts",
    keyIdea: "External growth through mergers and takeovers is the fastest way to gain market share, but over half of mergers fail to deliver the expected synergies due to cultural clashes and integration difficulties.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          { type: "def", text: "<strong>Merger</strong> — two firms of roughly equal size agree to combine into a single entity, sharing ownership and management." },
          { type: "def", text: "<strong>Takeover (acquisition)</strong> — one firm buys a controlling stake in another, often without the target's agreement (hostile takeover).", tag: "exam" }
        ]
      },
      {
        title: "TYPES OF INTEGRATION",
        items: [
          { type: "def", text: "<strong>Horizontal</strong> — same industry, same stage of production → increases market share and economies of scale." },
          { type: "def", text: "<strong>Vertical (forward/backward)</strong> — different stages of the supply chain → secures supply or distribution." },
          { type: "def", text: "<strong>Conglomerate</strong> — unrelated industries → diversifies risk but limited synergy." }
        ]
      },
      {
        title: "EVALUATION",
        items: [
          { type: "mech", text: "<strong>Benefits</strong>: speed, instant market share, economies of scale, access to new markets or technology." },
          { type: "mech", text: "<strong>Risks</strong>: culture clash, integration costs, redundancies, loss of key staff, paying too much (winner's curse)." },
          { type: "imp", text: "Over 50% of mergers fail to create shareholder value — the most common reason is underestimating the difficulty of integrating two different corporate cultures.", tag: "exam" }
        ]
      }
    ],
    flow: {
      steps: ["Identify target firm", "Agree terms or launch hostile bid", "Integrate operations and cultures"],
      result: "Instant scale but high risk of culture clash and value destruction",
      resultType: "neutral"
    },
    examMatters: "Examiners expect you to evaluate a specific merger using stakeholder analysis: shareholders (value), employees (redundancies), customers (prices/choice), and competition (market concentration). Always state the type of integration and its strategic rationale.",
    misconception: "Students assume mergers always achieve synergies. Wrong because integration is difficult and expensive. Instead write: synergies look attractive on paper, but culture clash, redundancies, and management distraction mean that many mergers destroy value rather than create it.",
    takeaway: [
      "External growth is fast but risky — over half of mergers fail to create value.",
      "Horizontal, vertical, and conglomerate integration serve different strategic goals.",
      "Culture clash is the number one reason mergers fail."
    ]
  },

  {
    title: "Reasons for Staying Small",
    meta: "4 concepts",
    keyIdea: "Not all firms want to grow — small firms survive and thrive by serving niche markets, maintaining flexibility, and keeping close relationships with customers that large firms cannot replicate.",
    blocks: [
      {
        title: "REASONS",
        items: [
          { type: "mech", text: "<strong>Niche markets</strong> — the market may be too small to support a large firm; small firms can serve specialist needs profitably." },
          { type: "mech", text: "<strong>Flexibility and speed</strong> — small firms can adapt quickly to changing customer demands without the bureaucracy of large organisations." },
          { type: "mech", text: "<strong>Personal service</strong> — owner-managed businesses often provide a level of customer care that large firms cannot match." },
          { type: "mech", text: "<strong>Diseconomies of scale</strong> — the owner may recognise that growing beyond a certain size would increase complexity and reduce profitability.", tag: "exam" }
        ]
      },
      {
        title: "EVALUATION",
        items: [
          { type: "imp", text: "Small firms face disadvantages: limited access to finance, inability to exploit economies of scale, and vulnerability to market changes. Their survival often depends on differentiation and customer loyalty." },
          { type: "link", text: "This links to Porter's focus strategy: small firms can thrive by dominating a niche where large firms choose not to compete." }
        ]
      }
    ],
    flow: {
      steps: ["Small market or niche product", "Flexibility and personal service", "Diseconomies of scale avoided"],
      result: "Some firms are more profitable staying small and focused",
      resultType: "good"
    },
    examMatters: "Examiners sometimes ask why firms remain small despite growth opportunities. Link to niche markets, personal service, and the owner's lifestyle choice. Don't assume all firms want or need to grow.",
    misconception: "Students assume all firms should try to grow. Wrong because growth can destroy what makes a small firm successful: personal service, flexibility, and niche expertise. Instead write: some firms deliberately choose to stay small because their competitive advantage — personal service, niche expertise, flexibility — would be lost through growth.",
    takeaway: [
      "Small firms thrive in niches through flexibility, personal service, and specialist skills.",
      "Growth is not always desirable — diseconomies of scale and loss of focus are real risks.",
      "Porter's focus strategy explains how small firms compete against larger rivals."
    ]
  }
];


/* ═══════════════════════════════════════════════════════════════
 *  3.3.3 — DECISION-MAKING TECHNIQUES
 * ═══════════════════════════════════════════════════════════════ */

const NOTES_333 = [
  {
    title: "Decision Trees",
    meta: "5 concepts",
    keyIdea: "Decision trees give managers a visual, quantitative method for comparing options under uncertainty — by calculating expected values they can identify the option that maximises the expected monetary return.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          { type: "def", text: "<strong>Decision tree</strong> — a diagram showing the choices, chance events, probabilities, and payoffs involved in a decision, allowing calculation of expected monetary values.", tag: "exam" },
          { type: "def", text: "<strong>Expected monetary value (EMV)</strong> — the weighted average of possible outcomes: EMV = Σ(probability × payoff) for each chance event." },
          { type: "def", text: "<strong>Net gain</strong> — EMV minus the cost of the option; the net gain tells you which option adds the most expected value." }
        ]
      },
      {
        title: "HOW TO USE THEM",
        items: [
          { type: "mech", text: "Decision nodes (squares) represent choices the manager controls; chance nodes (circles) represent uncertain outcomes with assigned probabilities." },
          { type: "mech", text: "Calculate EMV at each chance node by multiplying probabilities by payoffs, then subtract costs to find <strong>net gain</strong> for each option.", tag: "exam" },
          { type: "imp", text: "Decision trees look objective but rely on <strong>estimated probabilities</strong> — if these are wrong, the 'best' option may actually be the worst." }
        ]
      }
    ],
    formula: { label: "EXPECTED MONETARY VALUE", text: "EMV = Σ (probability × payoff)" },
    flow: {
      steps: ["Map out options and chance events", "Assign probabilities and payoffs", "Calculate EMV and net gain for each option"],
      result: "Choose the option with the highest net gain — but consider the limitations",
      resultType: "neutral"
    },
    examMatters: "Examiners expect you to calculate EMVs accurately, then evaluate the limitations. Always mention: probabilities are estimates, risk attitude matters (a risk-averse manager may avoid the highest EMV if it has high variance), and the tree ignores qualitative factors.",
    misconception: "Students think the highest EMV is always the right choice. Wrong because EMV ignores the firm's attitude to risk and the range of possible outcomes. Instead write: EMV identifies the statistically best option, but a risk-averse firm may prefer a lower-EMV option with less downside risk.",
    takeaway: [
      "EMV = Σ(probability × payoff); net gain = EMV − cost.",
      "Strengths: visual, quantitative, forces structured thinking.",
      "Limitations: probabilities are estimates, ignores risk attitude and qualitative factors."
    ]
  },

  {
    title: "Critical Path Analysis (CPA)",
    meta: "5 concepts",
    keyIdea: "Critical path analysis maps every task in a project, identifies which activities determine the minimum project duration, and reveals where float exists — enabling managers to allocate resources efficiently and meet deadlines.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          { type: "def", text: "<strong>Critical path</strong> — the longest sequence of dependent activities through the network; it determines the minimum time to complete the project.", tag: "exam" },
          { type: "def", text: "<strong>Float (slack)</strong> — the amount of time a non-critical activity can be delayed without extending the total project duration; float = LFT – EST – duration." },
          { type: "def", text: "<strong>EST/LFT</strong> — Earliest Start Time and Latest Finish Time for each activity, calculated by forward and backward passes through the network." }
        ]
      },
      {
        title: "HOW TO USE CPA",
        items: [
          { type: "mech", text: "<strong>Forward pass</strong>: calculate ESTs from start to finish to find the earliest each activity can begin." },
          { type: "mech", text: "<strong>Backward pass</strong>: calculate LFTs from finish to start to find the latest each activity can finish without delaying the project." },
          { type: "mech", text: "Activities with <strong>zero float</strong> are on the critical path — any delay to these delays the whole project.", tag: "exam" },
          { type: "imp", text: "CPA is only as good as the time estimates: if activity durations are inaccurate, the critical path may shift to a different sequence." }
        ]
      }
    ],
    formula: { label: "TOTAL FLOAT", text: "Float = LFT – EST – Duration" },
    flow: {
      steps: ["List all activities and dependencies", "Forward pass (ESTs) → backward pass (LFTs)", "Identify critical path (zero float activities)"],
      result: "Managers know minimum project time, where to focus resources, and where delays are tolerable",
      resultType: "good"
    },
    examMatters: "Examiners expect you to calculate ESTs, LFTs, float, and identify the critical path. Then evaluate: CPA assumes accurate time estimates, ignores resource constraints, and doesn't account for task quality.",
    misconception: "Students think CPA guarantees the project finishes on time. Wrong because it assumes time estimates are accurate and that unlimited resources are available. Instead write: CPA identifies the minimum project duration assuming accurate estimates and sufficient resources — in reality, estimates may be wrong and resource constraints may extend the project.",
    takeaway: [
      "Critical path = longest route = minimum project duration.",
      "Float = how much a non-critical activity can slip without delaying the project.",
      "Limitations: relies on accurate time estimates, ignores resource constraints."
    ]
  },

  {
    title: "Quantitative Sales Forecasting",
    meta: "4 concepts",
    keyIdea: "Sales forecasting uses past data to predict future demand — moving averages smooth out fluctuations, trend lines show direction, and extrapolation projects forward — but the past is not always a reliable guide to the future.",
    blocks: [
      {
        title: "KEY TECHNIQUES",
        items: [
          { type: "def", text: "<strong>Moving average</strong> — the mean of a fixed number of recent data points; smooths out short-term fluctuations to reveal the underlying trend.", tag: "exam" },
          { type: "def", text: "<strong>Extrapolation</strong> — extending a trend line into the future, assuming past patterns will continue." },
          { type: "mech", text: "<strong>Correlation</strong> — measuring the strength of the relationship between two variables (e.g. advertising spend and sales); correlation does not prove causation." }
        ]
      },
      {
        title: "EVALUATION",
        items: [
          { type: "mech", text: "Quantitative forecasting works best in <strong>stable markets</strong> where past trends are reliable predictors of the future." },
          { type: "imp", text: "In volatile or disrupted markets, extrapolation can be dangerously misleading — a new competitor, regulation, or technology can break any trend.", tag: "exam" },
          { type: "link", text: "Forecasting links to investment appraisal: sales forecasts feed into cash flow projections for NPV and payback calculations." }
        ]
      }
    ],
    flow: {
      steps: ["Collect historical sales data", "Calculate moving averages / identify trend", "Extrapolate trend into the future"],
      result: "Informed estimate of future sales — but subject to significant uncertainty",
      resultType: "neutral"
    },
    examMatters: "Examiners expect you to calculate a moving average from data and evaluate whether extrapolation is reliable. Always consider: how stable is the market? Are there foreseeable disruptions? Should the firm also use qualitative methods (expert opinion, market research)?",
    misconception: "Students think quantitative forecasts are reliable because they use data. Wrong because data only describes the past, and the future may be fundamentally different. Instead write: quantitative forecasts provide a useful starting point but should be combined with qualitative judgement, especially in fast-changing markets.",
    takeaway: [
      "Moving averages smooth data to reveal trends; extrapolation projects trends forward.",
      "Correlation ≠ causation — always question whether the relationship is causal.",
      "Forecasting works best in stable markets; in volatile markets, qualitative input is essential."
    ]
  }
];


/* ═══════════════════════════════════════════════════════════
 *  PUSH TO SUPABASE
 * ═══════════════════════════════════════════════════════════ */

const SECTIONS = [
  { id: 'business-objectives-strategy', label: '3.3.1 Business Objectives & Strategy',   notes: NOTES_331 },
  { id: 'business-growth',             label: '3.3.2 Business Growth',                  notes: NOTES_332 },
  { id: 'decision-making-techniques',   label: '3.3.3 Decision-Making Techniques',       notes: NOTES_333 },
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
