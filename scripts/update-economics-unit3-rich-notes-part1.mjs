/**
 * RICH NOTES — Economics Unit 3, Part 1 (3.3.1, 3.3.2)
 * =====================================================
 * Edexcel IAL Economics Unit 3, spec points 3.3.1 – 3.3.2
 * Pushes rich-format notes to Supabase section_notes table.
 *
 * Sections:
 *   3.3.1 Types and Sizes of Businesses  (types-sizes-businesses)
 *   3.3.2 Revenue, Costs and Profits     (revenue-costs-profits)
 *
 * Run with: node scripts/update-economics-unit3-rich-notes-part1.mjs
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL || 'https://trweeckuswgkenckeqfb.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);


/* ═══════════════════════════════════════════════════════════════
 *  3.3.1 — TYPES AND SIZES OF BUSINESSES
 *
 *  7 chapters: Business Objectives, Types of Business, Growth of
 *  Firms, Mergers & Integration, Economies of Scale, Diseconomies
 *  of Scale, Demergers
 * ═══════════════════════════════════════════════════════════════ */

const NOTES_331 = [

  /* ─────────────────────────────────────────────────
   *  Chapter 1: Business Objectives
   * ───────────────────────────────────────────────── */
  {
    title: "Business Objectives",
    meta: "5 concepts",
    keyIdea: "Firms do not always maximise profit — different stakeholders push for different goals, and in practice managers often settle for a satisfactory level of performance rather than an absolute optimum.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Profit maximisation</strong> — producing where MC = MR so that the gap between total revenue and total cost is as large as possible; the traditional assumption in microeconomics."
          },
          {
            type: "def",
            text: "<strong>Revenue maximisation</strong> — producing where MR = 0 so that total revenue is at its peak, even if this means lower profit; associated with Baumol's managerial theory.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Sales maximisation</strong> — producing the highest output possible without making a loss (where AR = ATC), so the firm grows as large as it can while covering costs."
          },
          {
            type: "def",
            text: "<strong>Satisficing</strong> — managers aim for a 'good enough' level of profit that keeps shareholders quiet while pursuing their own goals such as perks, prestige, or an easy life."
          }
        ]
      },
      {
        title: "WHY OBJECTIVES DIVERGE",
        items: [
          {
            type: "mech",
            text: "The <strong>divorce of ownership and control</strong> means shareholders (principals) want maximum profit, but managers (agents) may prioritise salary, status, or empire-building instead."
          },
          {
            type: "mech",
            text: "In the short run firms may pursue <strong>predatory pricing</strong> (setting P below AVC to force rivals out) and sacrifice profit now to gain monopoly power later."
          },
          {
            type: "imp",
            text: "Examiners expect you to evaluate whether firms really profit-maximise: in practice, imperfect information means firms cannot precisely identify where MC = MR.",
            tag: "exam"
          },
          {
            type: "link",
            text: "The principal-agent problem links to government failure in Unit 1 — in both cases, the people making decisions do not bear the full consequences of their choices."
          }
        ]
      }
    ],
    flow: {
      steps: ["Shareholders want max profit", "Managers have their own goals", "Information is imperfect"],
      result: "Satisficing — a compromise between competing objectives",
      resultType: "neutral"
    },
    examMatters: "Examiners often ask you to assess which objective a firm is most likely pursuing. Use evidence from the scenario (e.g. low prices suggest sales maximisation; high dividends suggest profit maximisation) and always evaluate with the principal-agent problem.",
    misconception: "Students assume all firms profit-maximise. Wrong because the principal-agent problem and imperfect information mean many firms satisfice. Instead write: profit maximisation is a simplifying assumption — in reality, objectives depend on ownership structure, market conditions, and managerial incentives.",
    takeaway: [
      "Profit max at MC = MR, revenue max at MR = 0, sales max at AR = ATC.",
      "The divorce of ownership and control creates a principal-agent problem.",
      "Satisficing is the most realistic description of how many firms actually behave."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 2: Types of Business Organisation
   * ───────────────────────────────────────────────── */
  {
    title: "Types of Business Organisation",
    meta: "5 concepts",
    keyIdea: "Legal structure determines who bears the risk, who controls decisions, and how easily the firm can raise finance — these trade-offs explain why different businesses choose different forms.",
    blocks: [
      {
        title: "KEY STRUCTURES",
        items: [
          {
            type: "def",
            text: "<strong>Sole trader</strong> — one owner with unlimited liability who keeps all profit but risks personal assets if the business fails; simplest form with minimal regulation."
          },
          {
            type: "def",
            text: "<strong>Partnership</strong> — two or more individuals sharing ownership, profit, and unlimited liability; common in professional services like law and accounting."
          },
          {
            type: "def",
            text: "<strong>Private limited company (Ltd)</strong> — a separate legal entity whose shareholders enjoy limited liability; shares cannot be sold to the general public."
          },
          {
            type: "def",
            text: "<strong>Public limited company (plc)</strong> — a company whose shares are traded on a stock exchange, allowing access to large amounts of capital but exposing it to takeover risk.",
            tag: "exam"
          }
        ]
      },
      {
        title: "TRADE-OFFS",
        items: [
          {
            type: "mech",
            text: "<strong>Limited liability</strong> means shareholders can only lose the amount they invested, not their personal assets; this encourages investment and risk-taking."
          },
          {
            type: "mech",
            text: "Becoming a plc gives access to equity finance from millions of investors, but dilutes control and creates pressure for short-term profit to keep the share price up."
          },
          {
            type: "imp",
            text: "The choice of structure affects a firm's ability to grow: sole traders struggle to raise external finance, while plcs can issue new shares on the stock market.",
            tag: "exam"
          }
        ]
      }
    ],
    flow: {
      steps: ["Sole trader (simple, unlimited liability)", "Partnership (shared risk, unlimited liability)", "Ltd (limited liability, private shares)", "plc (stock exchange, massive capital)"],
      result: "Greater access to finance but greater separation of ownership and control",
      resultType: "neutral"
    },
    examMatters: "Examiners test whether you can link legal structure to concepts like limited liability, access to finance, and the divorce of ownership and control. A common question asks you to evaluate whether a firm should convert from Ltd to plc.",
    misconception: "Students say limited companies always make more profit. Wrong because limited liability is about risk protection, not profitability. Instead write: limited liability encourages investment by protecting personal assets, which makes it easier to raise finance and grow — but growth itself does not guarantee higher profit.",
    takeaway: [
      "Sole traders and partnerships face unlimited liability; Ltd and plc have limited liability.",
      "plcs raise the most capital but face takeover risk and short-termism.",
      "Legal structure shapes the principal-agent problem and the firm's growth potential."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 3: Growth of Firms
   * ───────────────────────────────────────────────── */
  {
    title: "Growth of Firms",
    meta: "5 concepts",
    keyIdea: "Firms grow to exploit economies of scale and increase market power, but the method they choose — organic expansion or buying other firms — carries different risks and rewards.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Organic (internal) growth</strong> — expansion from within, such as opening new branches, developing new products, or entering new markets using retained profit."
          },
          {
            type: "def",
            text: "<strong>External growth</strong> — expansion through mergers (two firms agree to join) or takeovers (one firm buys a controlling stake in another, sometimes against its will).",
            tag: "exam"
          }
        ]
      },
      {
        title: "WHY FIRMS GROW",
        items: [
          {
            type: "mech",
            text: "Growth enables firms to exploit <strong>economies of scale</strong>, driving down long-run average cost and making them more competitive on price."
          },
          {
            type: "mech",
            text: "Larger firms gain <strong>market power</strong> — the ability to influence price, negotiate better deals with suppliers, and deter new entrants."
          },
          {
            type: "mech",
            text: "Managers may pursue growth for <strong>empire-building</strong> reasons rather than shareholder value — a form of the principal-agent problem."
          },
          {
            type: "imp",
            text: "Examiners want you to evaluate whether growth always benefits consumers. Economies of scale can mean lower prices, but increased market power can lead to higher prices and reduced choice.",
            tag: "exam"
          }
        ]
      },
      {
        title: "ORGANIC vs EXTERNAL GROWTH",
        items: [
          {
            type: "mech",
            text: "Organic growth is <strong>lower risk</strong> but slower — the firm retains culture and control but may miss market opportunities that faster-moving rivals seize."
          },
          {
            type: "mech",
            text: "External growth is <strong>faster</strong> and immediately increases market share, but integration is difficult: culture clashes, redundancies, and regulatory scrutiny can erode the expected gains."
          },
          {
            type: "link",
            text: "Growth links to contestability (3.3.3): if large firms create barriers to entry, markets become less contestable and allocative efficiency may fall."
          }
        ]
      }
    ],
    flow: {
      steps: ["Firm wants to grow", "Organic: slow but low risk", "External: fast but integration risk"],
      result: "Bigger firm with potential for economies of scale and market power",
      resultType: "neutral"
    },
    examMatters: "Examiners frequently ask you to evaluate whether a merger or takeover is in the public interest. Structure your answer around: economies of scale vs market power, short-run job losses vs long-run efficiency, and the risk of diseconomies of scale.",
    misconception: "Students assume bigger is always better. Wrong because growth beyond the minimum efficient scale leads to diseconomies of scale. Instead write: growth can lower costs up to a point, but beyond MES the firm may suffer from coordination problems, communication failures, and loss of motivation.",
    takeaway: [
      "Organic growth is safer but slower; external growth is faster but riskier.",
      "Firms grow to exploit economies of scale and gain market power.",
      "Growth can harm consumers if it increases monopoly power without passing on cost savings."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 4: Mergers and Integration
   * ───────────────────────────────────────────────── */
  {
    title: "Mergers and Integration",
    meta: "5 concepts",
    keyIdea: "The type of integration a firm pursues reveals its strategic goal — cutting costs, securing supply, gaining market share, or diversifying risk — and each type creates different effects on competition and efficiency.",
    blocks: [
      {
        title: "TYPES OF INTEGRATION",
        items: [
          {
            type: "def",
            text: "<strong>Horizontal integration</strong> — merging with a firm at the same stage of production in the same industry (e.g. two car manufacturers), which increases market share and enables economies of scale.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Vertical integration (backward)</strong> — acquiring a supplier to secure raw materials, reduce costs, and gain control over quality and supply reliability."
          },
          {
            type: "def",
            text: "<strong>Vertical integration (forward)</strong> — acquiring a distributor or retailer to control how the product reaches the consumer and capture retail margins."
          },
          {
            type: "def",
            text: "<strong>Conglomerate integration</strong> — merging with a firm in an entirely different industry to diversify risk and spread revenue streams across unrelated markets."
          }
        ]
      },
      {
        title: "EVALUATION",
        items: [
          {
            type: "mech",
            text: "Horizontal mergers raise competition concerns because they <strong>increase market concentration</strong>, potentially enabling the merged firm to raise prices."
          },
          {
            type: "mech",
            text: "Vertical integration can be <strong>anti-competitive</strong> if it forecloses rivals' access to key suppliers or distribution channels."
          },
          {
            type: "imp",
            text: "Competition regulators (e.g. CMA in the UK) assess whether a merger creates a 'substantial lessening of competition'; they may block it, approve it, or require divestments.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Integration types link to market structures in 3.3.3: horizontal mergers move an industry closer to monopoly, while contestability theory asks whether new firms can still enter despite the merger."
          }
        ]
      }
    ],
    flow: {
      steps: ["Identify strategic goal (cost, supply, market share, diversification)", "Choose integration type", "Regulatory approval needed"],
      result: "Merged firm gains scale advantages but faces scrutiny from competition authorities",
      resultType: "neutral"
    },
    examMatters: "Examiners expect you to classify the type of integration and evaluate its impact on competition, efficiency, and consumers. Always consider both the potential for economies of scale (lower prices) and the risk of increased market power (higher prices).",
    misconception: "Students confuse horizontal and vertical integration. Horizontal is same stage, same industry (think of a horizontal line at one level of production). Vertical is different stages in the supply chain (think of a vertical column from raw materials to retail). Instead write: state the definition clearly and give a specific example to prove you know the difference.",
    takeaway: [
      "Horizontal = same stage (market power); vertical = different stages (supply control).",
      "Conglomerate mergers diversify risk but may lack synergy benefits.",
      "Regulators block mergers that substantially lessen competition."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 5: Economies of Scale
   * ───────────────────────────────────────────────── */
  {
    title: "Economies of Scale",
    meta: "6 concepts",
    keyIdea: "As firms expand output in the long run, average costs fall for specific, identifiable reasons — and understanding these reasons is what separates a strong exam answer from a vague one.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Economies of scale</strong> — reductions in long-run average cost as a firm increases its scale of production, moving along the downward-sloping section of the LRAC curve.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Minimum efficient scale (MES)</strong> — the smallest level of output at which LRAC is minimised; beyond this point, further expansion does not reduce costs."
          }
        ]
      },
      {
        title: "INTERNAL ECONOMIES",
        items: [
          {
            type: "mech",
            text: "<strong>Technical</strong> — large firms use bigger, more efficient machinery and benefit from the cube-square rule (doubling a container's dimensions more than doubles its volume)."
          },
          {
            type: "mech",
            text: "<strong>Purchasing (bulk buying)</strong> — large orders give bargaining power with suppliers, reducing the unit cost of raw materials."
          },
          {
            type: "mech",
            text: "<strong>Financial</strong> — banks see large firms as lower risk, so they can borrow at lower interest rates and access capital markets directly."
          },
          {
            type: "mech",
            text: "<strong>Managerial</strong> — large firms can afford specialist managers for marketing, finance, and operations, increasing productivity through division of labour."
          },
          {
            type: "mech",
            text: "<strong>Risk-bearing</strong> — diversified firms spread risk across products, markets, or geographies so that a downturn in one area does not threaten the whole business."
          }
        ]
      },
      {
        title: "EXTERNAL ECONOMIES",
        items: [
          {
            type: "mech",
            text: "<strong>External economies of scale</strong> arise from the growth of the whole industry, not just one firm — for example, a cluster of tech firms in Silicon Valley sharing a skilled labour pool and specialist suppliers."
          },
          {
            type: "link",
            text: "Economies of scale link to natural monopoly: if MES is very large relative to market demand, only one firm can produce efficiently, creating a case for regulation (3.3.5)."
          }
        ]
      }
    ],
    flow: {
      steps: ["Firm increases scale of production", "Internal economies lower unit costs", "LRAC falls until MES is reached"],
      result: "Lower average costs enable lower prices or higher profit margins",
      resultType: "good"
    },
    examMatters: "Examiners reward you for naming specific types of economy of scale with real-world examples, not just saying 'costs fall as output rises'. Explain the mechanism: why does bulk buying lower unit costs? Because the firm's bargaining power allows it to negotiate discounts.",
    misconception: "Students say economies of scale mean 'costs fall'. Imprecise — total costs still rise as output increases; it is average cost that falls. Instead write: economies of scale occur when long-run average cost falls as the firm increases its scale of production.",
    takeaway: [
      "Economies of scale lower LRAC — always say average cost, not just 'costs'.",
      "Name specific types: technical, purchasing, financial, managerial, risk-bearing.",
      "MES is where LRAC is minimised; beyond it, costs stop falling."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 6: Diseconomies of Scale
   * ───────────────────────────────────────────────── */
  {
    title: "Diseconomies of Scale",
    meta: "4 concepts",
    keyIdea: "Beyond a certain size, firms become harder to manage — communication breaks down, workers lose motivation, and coordination failures push average costs back up.",
    blocks: [
      {
        title: "DEFINITION",
        items: [
          {
            type: "def",
            text: "<strong>Diseconomies of scale</strong> — increases in long-run average cost as a firm grows beyond its optimal size, shown by the upward-sloping section of the LRAC curve."
          }
        ]
      },
      {
        title: "CAUSES",
        items: [
          {
            type: "mech",
            text: "<strong>Communication problems</strong> — in very large firms, messages pass through many layers of hierarchy, leading to delays, distortions, and mistakes."
          },
          {
            type: "mech",
            text: "<strong>Coordination difficulties</strong> — managing thousands of employees across multiple sites or countries becomes complex, with different departments pulling in different directions."
          },
          {
            type: "mech",
            text: "<strong>Loss of motivation</strong> — individual workers feel like a small cog in a huge machine, reducing effort and innovation; the firm loses the entrepreneurial energy of its smaller days."
          },
          {
            type: "imp",
            text: "Diseconomies of scale explain why some large firms <strong>demerge</strong> or <strong>outsource</strong> functions — they conclude that being smaller and more focused is actually more efficient.",
            tag: "exam"
          }
        ]
      }
    ],
    flow: {
      steps: ["Firm grows beyond MES", "Communication and coordination deteriorate", "Motivation falls"],
      result: "LRAC rises — the firm is too big to manage efficiently",
      resultType: "bad"
    },
    examMatters: "Examiners expect you to explain specific causes, not just say 'the firm gets too big'. Use the three causes (communication, coordination, motivation) and link to real-world examples of large firms that have struggled with size.",
    misconception: "Students think diseconomies of scale are inevitable for all large firms. Wrong because many firms use technology, flat structures, and decentralisation to stay efficient at huge scale. Instead write: diseconomies of scale are a risk, not a certainty — well-managed firms can delay or avoid them through organisational innovation.",
    takeaway: [
      "Diseconomies of scale cause LRAC to rise beyond the optimal scale of production.",
      "Three main causes: communication breakdowns, coordination failures, loss of motivation.",
      "Not inevitable — good management and technology can offset them."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 7: Demergers
   * ───────────────────────────────────────────────── */
  {
    title: "Demergers",
    meta: "4 concepts",
    keyIdea: "Sometimes the best way to create value is to break a large firm apart — each part can focus on what it does best, and the stock market may value the separate pieces more than the whole.",
    blocks: [
      {
        title: "DEFINITION",
        items: [
          {
            type: "def",
            text: "<strong>Demerger</strong> — the splitting of a large firm into two or more separate, independent companies, each with its own management and shareholders."
          }
        ]
      },
      {
        title: "WHY FIRMS DEMERGE",
        items: [
          {
            type: "mech",
            text: "The merged firm may be suffering <strong>diseconomies of scale</strong> — average costs have risen because the organisation is too complex to manage efficiently."
          },
          {
            type: "mech",
            text: "The conglomerate may face a <strong>conglomerate discount</strong> on its share price: investors prefer to diversify their own portfolios rather than pay for a firm that does everything poorly."
          },
          {
            type: "mech",
            text: "Regulatory pressure from <strong>competition authorities</strong> may force a demerger if the combined firm has too much market power."
          },
          {
            type: "imp",
            text: "Demergers allow each new firm to focus on its <strong>core competence</strong>, potentially increasing efficiency, innovation, and shareholder value.",
            tag: "exam"
          }
        ]
      }
    ],
    flow: {
      steps: ["Large firm faces diseconomies or conglomerate discount", "Board decides to demerge", "Separate firms focus on core competencies"],
      result: "Each firm becomes more efficient and the combined market value may increase",
      resultType: "good"
    },
    examMatters: "Examiners may ask you to evaluate whether a demerger benefits stakeholders. Consider: shareholders (higher share price), workers (possible redundancies), consumers (more focused firms may innovate more), and competition (may increase rivalry).",
    misconception: "Students assume demergers always create value. Wrong because the synergy benefits of the original merger (shared R&D, brand recognition) are lost. Instead write: a demerger creates value only if the costs of diseconomies and loss of focus outweigh the synergy benefits of being combined.",
    takeaway: [
      "Demergers reverse failed mergers by splitting a firm into focused, independent units.",
      "Common reasons: diseconomies of scale, conglomerate discount, regulatory pressure.",
      "Evaluate by weighing lost synergies against gained focus and efficiency."
    ]
  }
];


/* ═══════════════════════════════════════════════════════════════
 *  3.3.2 — REVENUE, COSTS AND PROFITS
 *
 *  8 chapters: Revenue Concepts, Cost Concepts, Short-Run Costs,
 *  Long-Run Costs, Profit, Profit Maximisation, Alternative
 *  Objectives on a Diagram, Efficiency Concepts
 * ═══════════════════════════════════════════════════════════════ */

const NOTES_332 = [

  /* ─────────────────────────────────────────────────
   *  Chapter 1: Revenue Concepts
   * ───────────────────────────────────────────────── */
  {
    title: "Revenue Concepts",
    meta: "5 concepts",
    keyIdea: "Revenue is the income a firm earns from selling its output, and the relationship between average and marginal revenue depends on whether the firm is a price taker or a price maker.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Total revenue (TR)</strong> — the total income from sales; TR = price × quantity sold."
          },
          {
            type: "def",
            text: "<strong>Average revenue (AR)</strong> — revenue per unit sold; AR = TR ÷ Q. The AR curve is the firm's demand curve.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Marginal revenue (MR)</strong> — the extra revenue gained from selling one more unit; MR = ΔTR ÷ ΔQ."
          }
        ]
      },
      {
        title: "HOW REVENUE CURVES BEHAVE",
        items: [
          {
            type: "mech",
            text: "For a <strong>perfectly competitive firm</strong>, AR = MR = price because the firm is a price taker — it can sell any quantity at the market price."
          },
          {
            type: "mech",
            text: "For a <strong>price maker</strong> (monopoly, oligopoly), the demand curve slopes downward, so the firm must lower price to sell more. MR falls faster than AR because each price cut applies to all units, not just the extra one.",
            tag: "exam"
          },
          {
            type: "imp",
            text: "The MR curve is always <strong>twice as steep</strong> as a straight-line AR curve and hits the x-axis at half the quantity where AR hits it. This geometric relationship is a frequent exam diagram."
          },
          {
            type: "link",
            text: "Revenue links to PED from Unit 1: when demand is elastic (PED > 1), cutting price raises TR; when demand is inelastic (PED < 1), cutting price lowers TR. MR is positive when demand is elastic."
          }
        ]
      }
    ],
    formulas: [
      { label: "TOTAL REVENUE", text: "TR = P × Q" },
      { label: "AVERAGE REVENUE", text: "AR = TR ÷ Q" },
      { label: "MARGINAL REVENUE", text: "MR = ΔTR ÷ ΔQ" }
    ],
    flow: {
      steps: ["Firm sets or accepts price", "TR = P × Q", "MR shows how TR changes with one more unit"],
      result: "Revenue analysis tells the firm how much income each extra unit generates",
      resultType: "good"
    },
    examMatters: "Examiners often ask you to draw and label AR and MR curves for different market structures. Remember: AR = MR (horizontal) in perfect competition; MR is twice as steep as AR in monopoly. Always label both curves clearly.",
    misconception: "Students say MR is always positive. Wrong because when demand is inelastic, lowering price to sell one more unit reduces total revenue, making MR negative. Instead write: MR is positive when demand is elastic, zero at unit elasticity (where TR is maximised), and negative when demand is inelastic.",
    takeaway: [
      "AR is the demand curve; MR shows additional revenue from one more unit.",
      "In perfect competition AR = MR; in monopoly MR is twice as steep as AR.",
      "MR is positive when demand is elastic, zero at revenue-maximising output."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 2: Cost Concepts
   * ───────────────────────────────────────────────── */
  {
    title: "Cost Concepts",
    meta: "6 concepts",
    keyIdea: "Costs are the foundation of supply decisions — a firm needs to know its fixed, variable, average, and marginal costs to decide how much to produce and whether to stay in business.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Fixed costs (FC)</strong> — costs that do not change with output in the short run, such as rent, salaries of permanent staff, and insurance."
          },
          {
            type: "def",
            text: "<strong>Variable costs (VC)</strong> — costs that change directly with output, such as raw materials, energy, and piece-rate wages."
          },
          {
            type: "def",
            text: "<strong>Total cost (TC)</strong> — the sum of fixed and variable costs at any given output level; TC = FC + VC."
          },
          {
            type: "def",
            text: "<strong>Average total cost (ATC)</strong> — cost per unit of output; ATC = TC ÷ Q. Also called average cost (AC).",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Marginal cost (MC)</strong> — the extra cost of producing one more unit; MC = ΔTC ÷ ΔQ."
          }
        ]
      },
      {
        title: "KEY RELATIONSHIPS",
        items: [
          {
            type: "mech",
            text: "AFC (average fixed cost) falls continuously as output rises because a fixed total is spread over more units — this is why ATC falls initially."
          },
          {
            type: "mech",
            text: "The MC curve always <strong>cuts through the minimum point of ATC</strong>: when MC < ATC, average cost is falling; when MC > ATC, average cost is rising.",
            tag: "exam"
          },
          {
            type: "imp",
            text: "Understanding the MC-ATC relationship is essential for diagram work: MC pulls ATC down when below it and pushes ATC up when above it, like a batting average."
          },
          {
            type: "link",
            text: "The shut-down condition depends on costs: a firm stays open in the short run as long as P ≥ AVC (it covers variable costs and contributes to fixed costs), even if it makes an overall loss."
          }
        ]
      }
    ],
    formulas: [
      { label: "TOTAL COST", text: "TC = FC + VC" },
      { label: "AVERAGE TOTAL COST", text: "ATC = TC ÷ Q" },
      { label: "MARGINAL COST", text: "MC = ΔTC ÷ ΔQ" }
    ],
    flow: {
      steps: ["Identify fixed and variable costs", "Calculate TC, ATC, MC at each output level", "MC cuts ATC at its minimum"],
      result: "Cost analysis tells the firm its optimal production level",
      resultType: "good"
    },
    examMatters: "Examiners expect you to draw U-shaped ATC and MC curves with MC cutting ATC at the minimum. Always label the axes (cost/revenue on y-axis, output on x-axis) and mark the minimum ATC point clearly.",
    misconception: "Students confuse average cost falling with total cost falling. Wrong because total cost always rises with output (you use more resources); it is average cost that may fall due to fixed costs being spread. Instead write: ATC can fall while TC rises — they measure different things.",
    takeaway: [
      "TC = FC + VC; ATC is cost per unit; MC is the cost of one more unit.",
      "MC cuts ATC at its minimum — a critical diagram relationship.",
      "Short-run shut-down: close if P < AVC; in the long run close if P < ATC."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 3: Short-Run Cost Curves
   * ───────────────────────────────────────────────── */
  {
    title: "Short-Run Cost Curves",
    meta: "4 concepts",
    keyIdea: "In the short run at least one factor is fixed, so costs behave according to the law of diminishing marginal returns — which explains the distinctive U-shape of short-run cost curves.",
    blocks: [
      {
        title: "KEY CONCEPTS",
        items: [
          {
            type: "def",
            text: "<strong>Short run</strong> — the time period in which at least one factor of production (usually capital) is fixed; the firm can change output only by varying labour and materials.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Law of diminishing marginal returns</strong> — as more units of a variable factor (e.g. labour) are added to a fixed factor (e.g. machinery), the marginal product of the variable factor eventually falls."
          }
        ]
      },
      {
        title: "WHY CURVES ARE U-SHAPED",
        items: [
          {
            type: "mech",
            text: "Initially, adding workers to fixed capital increases <strong>marginal product</strong> (specialisation benefits), so MC falls and ATC falls."
          },
          {
            type: "mech",
            text: "Beyond the optimal point, diminishing returns set in: each extra worker adds less output, so MC rises. Once MC exceeds ATC, average cost also starts to rise."
          },
          {
            type: "imp",
            text: "The U-shape is a short-run phenomenon caused by the fixed factor. In the long run, all factors are variable, so the LRAC curve has a different shape determined by returns to scale.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Diminishing returns links to the supply curve from Unit 1: rising MC explains why the supply curve slopes upward — firms need a higher price to justify producing more."
          }
        ]
      }
    ],
    flow: {
      steps: ["At least one factor fixed", "Add variable factor", "Diminishing returns set in", "MC rises, then ATC rises"],
      result: "U-shaped short-run cost curves driven by diminishing marginal returns",
      resultType: "neutral"
    },
    examMatters: "Examiners test whether you can distinguish diminishing returns (short-run, one factor fixed) from diseconomies of scale (long-run, all factors variable). This is a very common confusion that costs marks.",
    misconception: "Students confuse diminishing returns with diseconomies of scale. Wrong because diminishing returns is a short-run concept (one factor fixed), while diseconomies of scale is a long-run concept (all factors variable). Instead write: diminishing returns causes U-shaped SRAC curves; diseconomies of scale causes the LRAC curve to eventually slope upward.",
    takeaway: [
      "Short run = at least one factor fixed; U-shaped costs from diminishing returns.",
      "Diminishing returns ≠ diseconomies of scale — different time periods, different causes.",
      "MC rises because each extra worker adds less output to the fixed capital."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 4: Long-Run Cost Curves
   * ───────────────────────────────────────────────── */
  {
    title: "Long-Run Cost Curves",
    meta: "4 concepts",
    keyIdea: "In the long run all factors are variable, so the firm can choose its optimal scale of production — the LRAC curve is an envelope showing the lowest possible cost at each output level.",
    blocks: [
      {
        title: "KEY CONCEPTS",
        items: [
          {
            type: "def",
            text: "<strong>Long run</strong> — the time period in which all factors of production are variable; the firm can change its entire scale of operations.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Long-run average cost (LRAC) curve</strong> — an envelope curve tangent to a series of short-run ATC curves, each representing a different plant size."
          }
        ]
      },
      {
        title: "SHAPE OF LRAC",
        items: [
          {
            type: "mech",
            text: "The LRAC falls initially due to <strong>economies of scale</strong> (technical, purchasing, financial, managerial, risk-bearing)."
          },
          {
            type: "mech",
            text: "The LRAC may be flat over a range of output where the firm experiences <strong>constant returns to scale</strong>."
          },
          {
            type: "mech",
            text: "Eventually LRAC may rise due to <strong>diseconomies of scale</strong> (communication, coordination, motivation problems)."
          },
          {
            type: "imp",
            text: "In industries with a large MES (e.g. car manufacturing, pharmaceuticals), only a few firms can produce efficiently — this creates a <strong>natural barrier to entry</strong>.",
            tag: "exam"
          }
        ]
      }
    ],
    flow: {
      steps: ["All factors variable", "Economies of scale lower LRAC", "Constant returns at MES", "Diseconomies may raise LRAC"],
      result: "LRAC envelope curve shows the optimal plant size for each output level",
      resultType: "neutral"
    },
    examMatters: "Examiners often ask you to draw the LRAC curve and mark MES. Show it as an envelope of SRAC curves. If the question mentions a specific industry, explain whether MES is high (few large firms) or low (many small firms).",
    misconception: "Students draw the LRAC as always U-shaped. In many industries it is L-shaped — costs fall with economies of scale and then stay flat (constant returns), never rising. Instead write: the shape depends on the industry; where management is effective, diseconomies may be delayed indefinitely.",
    takeaway: [
      "LRAC is an envelope of SRAC curves showing the cheapest way to produce each output.",
      "Economies → constant returns → possible diseconomies as scale increases.",
      "MES determines market structure: high MES → few firms; low MES → many firms."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 5: Profit
   * ───────────────────────────────────────────────── */
  {
    title: "Profit",
    meta: "4 concepts",
    keyIdea: "Economists define profit differently from accountants — normal profit is a cost of production (the minimum to keep the firm in the industry), while supernormal profit is the extra that attracts new entrants.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Normal profit</strong> — the minimum level of profit needed to keep a firm in the industry in the long run; it is included in the firm's cost curves as an opportunity cost.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Supernormal (abnormal) profit</strong> — profit above normal profit; TR > TC (where TC includes normal profit). This is the incentive for new firms to enter the market."
          },
          {
            type: "def",
            text: "<strong>Subnormal profit (loss)</strong> — profit below normal profit; TR < TC. The firm is not covering its opportunity costs and may exit in the long run."
          }
        ]
      },
      {
        title: "ROLE OF PROFIT",
        items: [
          {
            type: "mech",
            text: "Supernormal profit acts as a <strong>signal</strong> to new firms to enter the market, increasing supply and driving prices down toward long-run equilibrium."
          },
          {
            type: "mech",
            text: "Subnormal profit signals that resources should <strong>exit</strong> this market and be redeployed where they earn at least normal profit."
          },
          {
            type: "imp",
            text: "Profit is a key mechanism in the <strong>price mechanism</strong>: it allocates resources to their most valued uses by rewarding efficient firms and penalising inefficient ones.",
            tag: "exam"
          },
          {
            type: "link",
            text: "In perfectly competitive markets (3.3.3), supernormal profit is competed away in the long run. In monopoly, barriers to entry allow supernormal profit to persist."
          }
        ]
      }
    ],
    flow: {
      steps: ["Supernormal profit earned", "New firms attracted to enter", "Supply increases, price falls"],
      result: "In competitive markets, profit is competed away to normal profit in the long run",
      resultType: "neutral"
    },
    examMatters: "Examiners test whether you understand that normal profit is a cost, not a surplus. On a diagram, normal profit is where AR = ATC. Supernormal profit is the shaded area between AR and ATC curves. Always shade and label this area clearly.",
    misconception: "Students treat normal profit as zero profit. Wrong because normal profit is positive — it is the opportunity cost of capital and entrepreneurship included in total cost. Instead write: when a firm earns normal profit it is covering all costs including the owner's opportunity cost; it has no reason to leave the industry.",
    takeaway: [
      "Normal profit = included in costs; supernormal = extra above all costs.",
      "On diagrams: normal profit at AR = ATC; supernormal is the gap between AR and ATC.",
      "Profit signals resource allocation: supernormal attracts entry, losses trigger exit."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 6: Profit Maximisation Rule
   * ───────────────────────────────────────────────── */
  {
    title: "Profit Maximisation Rule",
    meta: "4 concepts",
    keyIdea: "A profit-maximising firm produces where MC = MR — any output below this leaves money on the table, and any output above it costs more to produce than it earns in revenue.",
    blocks: [
      {
        title: "THE RULE",
        items: [
          {
            type: "def",
            text: "<strong>Profit maximisation</strong> — occurs at the output level where MC = MR, provided MC is rising through MR (cutting from below).",
            tag: "exam"
          }
        ]
      },
      {
        title: "WHY MC = MR WORKS",
        items: [
          {
            type: "mech",
            text: "If MR > MC, producing one more unit adds more to revenue than to cost, so profit increases — the firm should <strong>expand output</strong>."
          },
          {
            type: "mech",
            text: "If MC > MR, the last unit costs more to produce than it earns, so profit falls — the firm should <strong>reduce output</strong>."
          },
          {
            type: "mech",
            text: "At MC = MR, no reallocation of output can increase profit — this is the <strong>equilibrium condition</strong> for profit maximisation."
          },
          {
            type: "imp",
            text: "The condition MC = MR applies to all market structures — perfect competition, monopoly, and oligopoly. The difference is the shape of the MR curve.",
            tag: "exam"
          }
        ]
      }
    ],
    flow: {
      steps: ["If MR > MC, produce more", "If MC > MR, produce less", "At MC = MR, profit is maximised"],
      result: "MC = MR is the universal profit-maximising condition for all firms",
      resultType: "good"
    },
    examMatters: "Examiners expect you to identify the profit-maximising output on a diagram by finding where MC = MR, then reading up to the AR curve to find the price, and comparing AR to ATC to determine whether the firm earns supernormal or subnormal profit.",
    misconception: "Students think profit is maximised where AR is highest. Wrong because the firm must consider costs, not just revenue. Instead write: profit is maximised where the gap between TR and TC is greatest, which occurs where MC = MR.",
    takeaway: [
      "MC = MR is the profit-maximising condition for ALL market structures.",
      "If MR > MC → expand; if MC > MR → contract; at MC = MR → optimal.",
      "On diagrams: find MC = MR, read price from AR, compare AR to ATC for profit."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 7: Alternative Objectives on a Diagram
   * ───────────────────────────────────────────────── */
  {
    title: "Alternative Objectives on a Diagram",
    meta: "4 concepts",
    keyIdea: "Different business objectives produce different output-price combinations on the same diagram, and being able to show all four on one set of axes is a powerful exam skill.",
    blocks: [
      {
        title: "THE FOUR OUTPUT LEVELS",
        items: [
          {
            type: "mech",
            text: "<strong>Profit maximisation</strong> — MC = MR. Lowest output, highest price. Maximum gap between TR and TC.",
            tag: "exam"
          },
          {
            type: "mech",
            text: "<strong>Revenue maximisation</strong> — MR = 0. Higher output than profit max, lower price. TR is at its peak but profit is lower."
          },
          {
            type: "mech",
            text: "<strong>Sales maximisation</strong> — AR = ATC. Highest output without making a loss. The firm breaks even, selling as much as possible."
          },
          {
            type: "mech",
            text: "<strong>Allocative efficiency</strong> — P = MC (or AR = MC). Society's ideal output where the price consumers pay equals the cost of producing the last unit."
          }
        ]
      },
      {
        title: "COMPARING ON A DIAGRAM",
        items: [
          {
            type: "imp",
            text: "As we move from profit max to sales max, output increases and price decreases. The firm sacrifices profit for market share or consumer benefit.",
            tag: "exam"
          },
          {
            type: "link",
            text: "These objectives link to market structures (3.3.3): in perfect competition the firm is forced to produce where P = MC (allocative efficiency), while a monopolist chooses MC = MR (profit max) and produces less at a higher price."
          }
        ]
      }
    ],
    flow: {
      steps: ["Profit max: MC = MR (lowest Q)", "Revenue max: MR = 0", "Allocative efficiency: P = MC", "Sales max: AR = ATC (highest Q)"],
      result: "Each objective gives a different price-output combination on the same diagram",
      resultType: "neutral"
    },
    examMatters: "Examiners love asking you to show multiple objectives on one diagram. Draw the standard MC, ATC, AR, MR curves, then mark each objective with its output and price. Label everything clearly and explain why the output differs.",
    misconception: "Students mix up revenue maximisation and sales maximisation. Revenue max is where MR = 0 (TR peaks), while sales max is where AR = ATC (break-even, maximum quantity). Instead write: revenue maximisation focuses on maximising income; sales maximisation focuses on maximising units sold.",
    takeaway: [
      "Profit max (MC = MR) → Revenue max (MR = 0) → Sales max (AR = ATC).",
      "Output increases and price decreases as we move through these objectives.",
      "Allocative efficiency (P = MC) is the socially optimal output level."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 8: Efficiency Concepts
   * ───────────────────────────────────────────────── */
  {
    title: "Efficiency Concepts",
    meta: "5 concepts",
    keyIdea: "Efficiency is not one thing — there are four distinct types, and understanding which market structures achieve which types of efficiency is the key to evaluating competition policy.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Allocative efficiency</strong> — achieved when P = MC; resources are allocated so that the value consumers place on the last unit equals its cost of production.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Productive efficiency</strong> — achieved when the firm produces at the minimum point of its ATC curve; no resources are wasted.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Dynamic efficiency</strong> — achieved when firms invest supernormal profits into innovation, R&D, and new technology, improving products and processes over time."
          },
          {
            type: "def",
            text: "<strong>X-inefficiency</strong> — the waste that occurs when a firm is not under competitive pressure and allows costs to drift above the minimum; common in monopolies."
          }
        ]
      },
      {
        title: "WHICH STRUCTURES DELIVER WHICH EFFICIENCY",
        items: [
          {
            type: "mech",
            text: "Perfect competition achieves both allocative (P = MC) and productive efficiency (min ATC) in long-run equilibrium, but cannot achieve dynamic efficiency because firms earn only normal profit."
          },
          {
            type: "mech",
            text: "Monopoly can achieve dynamic efficiency (supernormal profits fund R&D) but typically fails on allocative and productive efficiency, and may suffer X-inefficiency."
          },
          {
            type: "imp",
            text: "There is a <strong>trade-off</strong> between static efficiency (allocative + productive, favoured by competition) and dynamic efficiency (favoured by some market power). This is central to competition policy debates.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Efficiency links to government intervention in 3.3.5: regulators try to prevent monopoly abuse while preserving enough profit incentive for innovation."
          }
        ]
      }
    ],
    flow: {
      steps: ["Allocative: P = MC", "Productive: min ATC", "Dynamic: invest profits in R&D", "X-inefficiency: complacent monopolist wastes resources"],
      result: "No single market structure delivers all four types of efficiency perfectly",
      resultType: "neutral"
    },
    examMatters: "Examiners frequently ask you to assess which market structure is 'best'. The answer is always 'it depends' — perfect competition wins on static efficiency, monopoly may win on dynamic efficiency. State the trade-off clearly and use real-world examples.",
    misconception: "Students say perfect competition is always best because it achieves allocative and productive efficiency. Wrong because firms earn only normal profit, leaving no surplus for R&D and innovation. Instead write: perfect competition achieves static efficiency but may fail on dynamic efficiency; the optimal market structure depends on which type of efficiency matters most.",
    takeaway: [
      "Allocative: P = MC; Productive: min ATC; Dynamic: R&D from supernormal profits.",
      "Perfect competition achieves static efficiency; monopoly may achieve dynamic efficiency.",
      "No market structure achieves all four — always evaluate the trade-off."
    ]
  }
];


/* ═══════════════════════════════════════════════════════════
 *  PUSH TO SUPABASE
 * ═══════════════════════════════════════════════════════════ */

const SECTIONS = [
  { id: 'types-sizes-businesses',  label: '3.3.1 Types and Sizes of Businesses', notes: NOTES_331 },
  { id: 'revenue-costs-profits',   label: '3.3.2 Revenue, Costs and Profits',    notes: NOTES_332 },
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
