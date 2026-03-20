/**
 * RICH NOTES — Business Unit 2 (All 5 sections)
 * ===============================================
 * Edexcel IAL Business Unit 2, spec points 2.3.1 – 2.3.5
 * Pushes rich-format notes to Supabase section_notes table.
 *
 * Run with: node scripts/update-business-unit2-rich-notes.mjs
 */

import { supabase } from './_db.mjs';

/* ═══════════════════════════════════════════════════════════
 *  2.3.1 — Planning & Raising Finance
 * ═══════════════════════════════════════════════════════════ */

const NOTES_231 = [

  /* ─────────────────────────────────────────────────
   *  Chapter 1: Business Planning
   * ───────────────────────────────────────────────── */
  {
    title: "Business Planning",
    meta: "4 concepts",
    keyIdea: "A business plan is the roadmap that turns an entrepreneur's vision into a structured strategy; without one, securing finance and managing early growth is far harder.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Business plan</strong> — a formal written document setting out a business's objectives, strategies, market analysis, financial forecasts and operational details, used to guide decision-making and attract investors."
          },
          {
            type: "def",
            text: "<strong>Executive summary</strong> — a concise overview at the start of the plan covering the business idea, target market, competitive advantage and financial projections."
          }
        ]
      },
      {
        title: "PURPOSE & EVALUATION",
        items: [
          {
            type: "mech",
            text: "A plan forces entrepreneurs to <strong>test assumptions</strong> about costs, revenue and market demand before committing resources, reducing the risk of costly surprises."
          },
          {
            type: "mech",
            text: "Banks and investors use the plan to <strong>assess viability</strong>; without credible financial forecasts, most external finance is unavailable to start-ups."
          },
          {
            type: "imp",
            text: "Plans can become outdated quickly in dynamic markets, so firms must treat them as <strong>living documents</strong> that are regularly revised rather than fixed blueprints.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Business planning links directly to cash-flow forecasting and budgeting in 2.3.2; the plan provides the assumptions that drive those financial tools."
          }
        ]
      }
    ],
    flow: {
      steps: ["Research market & costs", "Write financial forecasts", "Present plan to lenders/investors"],
      result: "Finance secured and risk reduced",
      resultType: "good"
    },
    examMatters: "Examiners want you to evaluate whether a business plan guarantees success. It does not, because forecasts rely on assumptions that may prove wrong, but it significantly improves the chances by forcing structured thinking and attracting finance.",
    takeaway: [
      "A business plan reduces risk by forcing entrepreneurs to research and quantify their assumptions before launch.",
      "The primary audience for a plan is often external financiers, so credibility of the numbers matters most.",
      "Plans are living documents; a plan written once and never updated loses its value in a changing market."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 2: Internal Finance
   * ───────────────────────────────────────────────── */
  {
    title: "Internal Finance",
    meta: "3 concepts",
    keyIdea: "Internal sources of finance come from within the business itself, meaning no interest payments or loss of ownership, but availability depends entirely on the firm's existing wealth.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Retained profit</strong> — profit kept in the business after tax and dividends have been paid, reinvested to fund growth or build reserves; it is the most common source of finance for established firms.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Sale of assets</strong> — raising cash by selling items the business owns, such as property, vehicles or equipment that are no longer needed or can be leased back."
          }
        ]
      },
      {
        title: "EVALUATION",
        items: [
          {
            type: "mech",
            text: "Retained profit carries <strong>no repayment obligation</strong> and no dilution of ownership, making it the cheapest long-term source of finance available."
          },
          {
            type: "mech",
            text: "However, relying on retained profit <strong>limits growth speed</strong> because the firm can only invest what it has already earned, which may be too slow in fast-moving markets."
          },
          {
            type: "imp",
            text: "Sale of assets provides a one-off cash injection but <strong>reduces productive capacity</strong> unless the asset was genuinely surplus; selling core machinery to pay bills signals financial distress.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Internal finance links to profit management in 2.3.3; a firm that maximises operating efficiency generates more retained profit to reinvest."
          }
        ]
      }
    ],
    flow: {
      steps: ["Firm earns profit", "Retains portion after dividends", "Reinvests in growth"],
      result: "Growth funded without debt or ownership dilution",
      resultType: "good"
    },
    misconception: "Students say retained profit is free. Wrong because it has an opportunity cost; shareholders forgo dividends, so they expect reinvested profit to generate returns at least as good as alternative investments. Instead write: retained profit avoids interest costs but carries an opportunity cost to shareholders who receive lower dividends.",
    takeaway: [
      "Retained profit is the cheapest source of finance but limits growth to the pace of past earnings.",
      "Sale of assets works as a one-off measure but should not involve selling resources the firm still needs.",
      "Internal finance preserves ownership and control, which matters most to sole traders and partnerships."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 3: External Finance
   * ───────────────────────────────────────────────── */
  {
    title: "External Finance",
    meta: "5 concepts",
    keyIdea: "External finance unlocks growth beyond what retained profits can fund, but every source carries a trade-off between cost, control, and repayment pressure.",
    blocks: [
      {
        title: "DEBT FINANCE",
        items: [
          {
            type: "def",
            text: "<strong>Bank loan</strong> — a fixed sum borrowed from a bank and repaid with interest over an agreed period; it gives certainty on repayment amounts but requires collateral and creates a legal obligation to repay."
          },
          {
            type: "mech",
            text: "Loans suit <strong>long-term capital expenditure</strong> like buying premises because repayments are spread over years, matching the useful life of the asset purchased."
          },
          {
            type: "imp",
            text: "High interest rates or poor credit history can make bank loans <strong>expensive or inaccessible</strong>, pushing firms toward alternative sources.",
            tag: "exam"
          }
        ]
      },
      {
        title: "EQUITY & ALTERNATIVE FINANCE",
        items: [
          {
            type: "def",
            text: "<strong>Venture capital</strong> — investment from specialist firms or individuals who provide large sums in exchange for an equity stake and often a say in management; suited to high-growth start-ups."
          },
          {
            type: "def",
            text: "<strong>Crowd-funding</strong> — raising small amounts from a large number of people, typically via online platforms; it also tests market demand before launch but offers less capital than venture funding."
          },
          {
            type: "mech",
            text: "Venture capitalists bring <strong>expertise and networks</strong> alongside money, accelerating growth, but founders sacrifice equity and some strategic control."
          },
          {
            type: "imp",
            text: "Crowd-funding doubles as <strong>free market research</strong>; if the campaign fails to attract backers, it signals weak demand before significant resources are committed.",
            tag: "exam"
          }
        ]
      }
    ],
    flow: {
      steps: ["Identify funding gap", "Choose debt or equity source", "Accept cost/control trade-off"],
      result: "Growth financed beyond internal means",
      resultType: "good"
    },
    examMatters: "Examiners reward answers that match the source of finance to the business context. A sole trader cannot issue shares; a high-risk start-up may not qualify for bank loans. Always justify your recommendation by linking the source to the firm's size, risk profile and objectives.",
    takeaway: [
      "Bank loans preserve ownership but create fixed repayment obligations that pressure cash flow.",
      "Venture capital suits high-growth firms willing to trade equity for expertise and large-scale funding.",
      "Crowd-funding tests demand and raises capital simultaneously, making it uniquely useful for innovative products."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 4: Forms of Business
   * ───────────────────────────────────────────────── */
  {
    title: "Forms of Business",
    meta: "5 concepts",
    keyIdea: "The legal structure a business chooses determines how it raises finance, who controls decisions, and how profits and risks are shared among owners.",
    blocks: [
      {
        title: "UNINCORPORATED BUSINESSES",
        items: [
          {
            type: "def",
            text: "<strong>Sole trader</strong> — a business owned and controlled by one person who keeps all profits but bears unlimited liability; the simplest and cheapest structure to set up."
          },
          {
            type: "def",
            text: "<strong>Partnership</strong> — a business owned by two or more people who share profits, responsibilities and unlimited liability according to a deed of partnership."
          },
          {
            type: "mech",
            text: "Unincorporated businesses have <strong>no separate legal identity</strong> from their owners, meaning personal assets are at risk if the business cannot pay its debts."
          }
        ]
      },
      {
        title: "INCORPORATED BUSINESSES",
        items: [
          {
            type: "def",
            text: "<strong>Private limited company (Ltd)</strong> — an incorporated business whose shares are sold privately to invited investors; it offers limited liability but cannot sell shares on the stock exchange.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Public limited company (PLC)</strong> — an incorporated business whose shares are traded on the stock exchange, giving access to large-scale equity finance but exposing the firm to hostile takeovers and short-term shareholder pressure."
          },
          {
            type: "mech",
            text: "Incorporation creates a <strong>separate legal entity</strong>, so the company can own assets, enter contracts and sue in its own name, independent of its shareholders."
          },
          {
            type: "imp",
            text: "PLCs face pressure to deliver <strong>short-term dividends</strong> to satisfy stock market investors, which can conflict with long-term strategic investment.",
            tag: "exam"
          }
        ]
      }
    ],
    flow: {
      steps: ["Sole trader starts up", "Growth demands more capital", "Incorporates as Ltd or PLC"],
      result: "Access to equity finance and limited liability",
      resultType: "good"
    },
    examMatters: "Examiners expect you to recommend a business structure by linking it to the firm's size, growth ambitions and risk appetite. Do not simply list advantages and disadvantages; explain why a particular structure suits the scenario given.",
    takeaway: [
      "Sole traders and partnerships are simple but expose owners to unlimited personal liability.",
      "Incorporation as an Ltd protects personal assets while keeping ownership private and controlled.",
      "PLCs can raise vast sums on the stock exchange but must manage shareholder expectations and takeover risk."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 5: Liability
   * ───────────────────────────────────────────────── */
  {
    title: "Liability",
    meta: "3 concepts",
    keyIdea: "The distinction between limited and unlimited liability is one of the most important concepts in business; it determines how much personal wealth an owner risks when things go wrong.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Unlimited liability</strong> — the owner is personally responsible for all business debts; if the business fails, personal assets such as a house or car can be seized to repay creditors.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Limited liability</strong> — the owners' financial responsibility is restricted to the amount they invested in the business; personal assets are protected if the business fails."
          }
        ]
      },
      {
        title: "IMPLICATIONS",
        items: [
          {
            type: "mech",
            text: "Limited liability <strong>encourages investment</strong> because shareholders know the maximum they can lose, making people more willing to buy shares in risky ventures."
          },
          {
            type: "mech",
            text: "Unlimited liability <strong>discourages risk-taking</strong> and makes it harder for sole traders and partnerships to attract external investors who fear losing personal wealth."
          },
          {
            type: "imp",
            text: "The shift from unlimited to limited liability through incorporation is often the <strong>critical turning point</strong> that allows a small business to scale up and attract serious external finance.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Liability links directly to forms of business; the choice of legal structure automatically determines whether owners face limited or unlimited liability."
          }
        ]
      }
    ],
    flow: {
      steps: ["Business debts exceed assets", "Unlimited: personal assets seized", "Limited: loss capped at investment"],
      result: "Limited liability protects personal wealth",
      resultType: "good"
    },
    misconception: "Students say limited liability means the business cannot go bankrupt. Wrong because limited liability only protects the owners' personal assets; the business itself can still fail and all invested capital can be lost. Instead write: limited liability caps the owner's loss at their investment but does not prevent the business from failing.",
    takeaway: [
      "Unlimited liability puts personal assets at risk; limited liability caps losses at the amount invested.",
      "Limited liability is the main reason entrepreneurs incorporate, as it encourages both investment and risk-taking.",
      "Moving from sole trader to Ltd is often the single most important structural decision a growing business makes."
    ]
  }
];

/* ═══════════════════════════════════════════════════════════
 *  2.3.2 — Financial Planning
 * ═══════════════════════════════════════════════════════════ */

const NOTES_232 = [

  /* ─────────────────────────────────────────────────
   *  Chapter 1: Sales, Revenue & Costs
   * ───────────────────────────────────────────────── */
  {
    title: "Sales, Revenue & Costs",
    meta: "6 concepts + formulas",
    keyIdea: "Revenue flows in from sales, costs flow out to produce those sales, and the difference is profit; understanding the behaviour of fixed and variable costs is essential to predicting profitability at any level of output.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Fixed costs</strong> — costs that do not change with the level of output in the short run, such as rent, salaries of permanent staff and insurance premiums."
          },
          {
            type: "def",
            text: "<strong>Variable costs</strong> — costs that change in direct proportion to the level of output, such as raw materials, packaging and hourly wages.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Total costs</strong> — the sum of all fixed and variable costs at a given level of output; the baseline figure a firm must cover to avoid making a loss."
          },
          {
            type: "def",
            text: "<strong>Revenue (turnover)</strong> — the total income a business receives from selling its goods or services over a given period, calculated as price multiplied by quantity sold."
          }
        ]
      },
      {
        title: "HOW COSTS BEHAVE",
        items: [
          {
            type: "mech",
            text: "As output rises, <strong>fixed costs per unit fall</strong> because the same overhead is spread across more products, creating internal economies of scale."
          },
          {
            type: "mech",
            text: "Variable costs per unit tend to stay constant in the short run, so <strong>total variable costs rise linearly</strong> with each additional unit produced."
          },
          {
            type: "imp",
            text: "Firms with high fixed costs and low variable costs benefit most from increasing sales volume, because each extra sale makes a <strong>large contribution to covering overheads</strong>.",
            tag: "exam"
          }
        ]
      }
    ],
    formulas: [
      {
        label: "TOTAL COSTS",
        text: "Total Costs = Fixed Costs + Variable Costs"
      },
      {
        label: "REVENUE",
        text: "Revenue = Price x Quantity Sold"
      }
    ],
    flow: {
      steps: ["Calculate fixed + variable costs", "Compare total costs to revenue", "Identify profit or loss"],
      result: "Clear picture of financial viability",
      resultType: "good"
    },
    takeaway: [
      "Fixed costs stay constant regardless of output; variable costs rise with each unit produced.",
      "Revenue must exceed total costs for the firm to make a profit; the gap between them is the margin.",
      "High fixed-cost businesses need volume to spread overheads; high variable-cost businesses need tight cost control per unit."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 2: Sales Forecasting
   * ───────────────────────────────────────────────── */
  {
    title: "Sales Forecasting",
    meta: "4 concepts",
    keyIdea: "Forecasting future sales helps firms plan production, staffing and cash flow, but every forecast is an educated guess that becomes less reliable the further ahead it looks.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Sales forecast</strong> — a prediction of future sales revenue or volume over a specific period, based on past data, market research and assumptions about future conditions."
          },
          {
            type: "def",
            text: "<strong>Extrapolation</strong> — extending a past trend into the future by assuming the pattern will continue; simple to use but unreliable if market conditions change."
          }
        ]
      },
      {
        title: "METHODS & EVALUATION",
        items: [
          {
            type: "mech",
            text: "<strong>Time-series analysis</strong> identifies trends, seasonal patterns and cycles in historical data, giving a quantitative basis for forecasts that can be tested against actual results."
          },
          {
            type: "mech",
            text: "<strong>Market research-based forecasting</strong> uses surveys and test marketing to predict demand for new products where no historical data exists."
          },
          {
            type: "imp",
            text: "Forecasts are only as good as their assumptions; an <strong>unexpected recession, competitor action or technological shift</strong> can make even sophisticated models inaccurate.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Sales forecasts feed directly into cash-flow forecasts and budgets; if the sales figure is wrong, every dependent number is wrong too."
          }
        ]
      }
    ],
    flow: {
      steps: ["Gather historical data", "Apply trend and seasonal adjustments", "Produce forecast range"],
      result: "Informed planning for production and cash flow",
      resultType: "good"
    },
    examMatters: "Examiners expect you to evaluate forecasts by discussing their reliability. Always mention that accuracy depends on the stability of the market, the quality of the data, and the time horizon. In a dynamic market, forecasts are less reliable.",
    takeaway: [
      "Extrapolation is quick but assumes the past will repeat; it fails when markets change suddenly.",
      "New products with no sales history require qualitative forecasting methods like market research.",
      "Every downstream financial plan depends on the sales forecast, so getting it wrong has cascading effects."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 3: Break-Even Analysis
   * ───────────────────────────────────────────────── */
  {
    title: "Break-Even Analysis",
    meta: "5 concepts + formulas",
    keyIdea: "Break-even analysis tells a firm exactly how many units it must sell to cover all costs; below that point it makes a loss, above it every extra sale generates pure profit.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Contribution per unit</strong> — the selling price minus the variable cost per unit; each unit sold contributes this amount toward covering fixed costs and then generating profit.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Break-even point (BEP)</strong> — the level of output where total revenue exactly equals total costs, meaning the firm makes neither a profit nor a loss."
          },
          {
            type: "def",
            text: "<strong>Margin of safety</strong> — the difference between current or forecast output and the break-even point; it shows how far sales can fall before the firm starts making a loss."
          }
        ]
      },
      {
        title: "APPLICATION",
        items: [
          {
            type: "mech",
            text: "A <strong>break-even chart</strong> plots total revenue and total costs against output, making it easy to see profit and loss zones at any sales level."
          },
          {
            type: "mech",
            text: "If fixed costs rise the break-even point <strong>shifts right</strong>, meaning the firm needs higher sales to cover its overheads."
          },
          {
            type: "imp",
            text: "Break-even assumes all output is sold and costs behave linearly, which <strong>oversimplifies reality</strong>; in practice, variable costs per unit may change at high output and not all stock sells.",
            tag: "exam"
          }
        ]
      }
    ],
    formulas: [
      {
        label: "CONTRIBUTION PER UNIT",
        text: "Contribution per Unit = Selling Price - Variable Cost per Unit"
      },
      {
        label: "BREAK-EVEN POINT",
        text: "BEP (units) = Fixed Costs / Contribution per Unit"
      },
      {
        label: "MARGIN OF SAFETY",
        text: "Margin of Safety = Actual Output - Break-Even Output"
      }
    ],
    flow: {
      steps: ["Calculate contribution per unit", "Divide fixed costs by contribution", "Compare BEP to forecast sales"],
      result: "Know the minimum sales needed for profit",
      resultType: "good"
    },
    misconception: "Students say break-even is the target output for a business. Wrong because break-even means zero profit; it is the minimum, not the goal. Instead write: break-even is the survival threshold; the real target is to sell well above this point to generate a healthy margin of safety and profit.",
    takeaway: [
      "Contribution per unit is the building block; each unit sold chips away at fixed costs until break-even is reached.",
      "Margin of safety measures the buffer between current sales and the danger zone of losses.",
      "Break-even is a useful planning tool but oversimplifies by assuming constant prices and linear cost behaviour."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 4: Cash-Flow Forecasts
   * ───────────────────────────────────────────────── */
  {
    title: "Cash-Flow Forecasts",
    meta: "4 concepts",
    keyIdea: "Cash is the lifeblood of a business; a firm can be profitable on paper but still collapse if it runs out of cash to pay day-to-day bills, which is why forecasting cash flow is critical.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Cash-flow forecast</strong> — a month-by-month prediction of all cash inflows and outflows, showing the expected closing bank balance at the end of each period."
          },
          {
            type: "def",
            text: "<strong>Net cash flow</strong> — the difference between total cash inflows and total cash outflows in a given period; a negative figure means more cash left the business than entered it.",
            tag: "exam"
          }
        ]
      },
      {
        title: "APPLICATION & EVALUATION",
        items: [
          {
            type: "mech",
            text: "Forecasts allow managers to <strong>anticipate cash shortfalls</strong> in advance and arrange overdrafts or delay payments before a crisis hits."
          },
          {
            type: "mech",
            text: "Start-ups typically show <strong>negative net cash flow</strong> in early months because set-up costs and stock purchases occur before significant revenue arrives."
          },
          {
            type: "imp",
            text: "A profitable business can still fail if cash is tied up in <strong>unpaid invoices or excess stock</strong>; profit and cash are not the same thing.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Cash-flow forecasts depend on the accuracy of sales forecasts; overestimating sales creates dangerously optimistic cash projections."
          }
        ]
      }
    ],
    flow: {
      steps: ["Forecast monthly inflows & outflows", "Calculate net cash flow", "Plan for shortfall months"],
      result: "Business avoids running out of cash",
      resultType: "good"
    },
    examMatters: "Examiners love the distinction between profit and cash. Always state that profit is an accounting measure over a period, while cash is what is physically available to pay bills today. A firm can be profitable but cash-poor, and vice versa.",
    takeaway: [
      "Cash flow is about timing; profit measures the surplus over a period, but cash must be available day by day.",
      "Start-ups are especially vulnerable because costs are front-loaded while revenue builds slowly.",
      "Forecasting cash flow in advance gives managers time to arrange finance and avoid insolvency."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 5: Budgets
   * ───────────────────────────────────────────────── */
  {
    title: "Budgets",
    meta: "4 concepts",
    keyIdea: "A budget translates a business plan into numbers by setting financial targets for income and expenditure; variance analysis then reveals whether reality is meeting expectations.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Budget</strong> — a financial plan that sets out expected income and expenditure for a department, project or the whole business over a future period."
          },
          {
            type: "def",
            text: "<strong>Variance</strong> — the difference between the budgeted figure and the actual figure; a favourable variance means the outcome was better than expected, an adverse variance means it was worse.",
            tag: "exam"
          }
        ]
      },
      {
        title: "VARIANCE ANALYSIS",
        items: [
          {
            type: "mech",
            text: "<strong>Favourable variance</strong> on costs means actual spending was below budget, improving profit; on revenue it means actual sales exceeded the target."
          },
          {
            type: "mech",
            text: "<strong>Adverse variance</strong> on costs means overspending; managers must investigate whether it was a one-off event or a systemic problem requiring corrective action."
          },
          {
            type: "imp",
            text: "Budgets can become <strong>demotivating</strong> if targets are set unrealistically high, or encourage wasteful spending if departments rush to use up remaining budget before the period ends.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Budgets connect to cash-flow forecasts; the budget sets the plan, the cash-flow forecast checks whether the business can physically afford it month by month."
          }
        ]
      }
    ],
    flow: {
      steps: ["Set income & expenditure targets", "Track actuals against budget", "Analyse variances and act"],
      result: "Financial control and early problem detection",
      resultType: "good"
    },
    misconception: "Students say a favourable variance is always good. Wrong because a favourable cost variance might mean the firm under-invested in marketing or training, which could hurt long-term performance. Instead write: favourable variances need investigating just as much as adverse ones, because underspending can signal missed opportunities.",
    takeaway: [
      "Budgets turn strategy into measurable financial targets that managers can be held accountable for.",
      "Variance analysis is only useful if managers investigate the causes and take corrective action.",
      "Both favourable and adverse variances require investigation; underspending can be just as damaging as overspending."
    ]
  }
];

/* ═══════════════════════════════════════════════════════════
 *  2.3.3 — Managing Finance
 * ═══════════════════════════════════════════════════════════ */

const NOTES_233 = [

  /* ─────────────────────────────────────────────────
   *  Chapter 1: Profit
   * ───────────────────────────────────────────────── */
  {
    title: "Profit",
    meta: "4 concepts + formulas",
    keyIdea: "Profit is not a single number; gross, operating and net profit each strip away a different layer of costs, revealing where the business is efficient and where money is leaking.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Gross profit</strong> — revenue minus cost of sales; it measures how efficiently the firm converts raw materials and direct labour into sales income."
          },
          {
            type: "def",
            text: "<strong>Operating profit</strong> — gross profit minus operating expenses such as rent, marketing and administrative costs; it shows the profit generated from normal trading activities.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Net profit</strong> — operating profit minus interest and tax; it is the final bottom-line profit available to the owners or shareholders."
          }
        ]
      },
      {
        title: "APPLICATION",
        items: [
          {
            type: "mech",
            text: "If gross profit is healthy but operating profit is weak, the problem lies in <strong>high overheads</strong> rather than production efficiency."
          },
          {
            type: "mech",
            text: "If gross profit margin is falling, either selling prices are being cut or <strong>cost of sales is rising</strong>; managers must diagnose which."
          },
          {
            type: "imp",
            text: "Comparing profit margins over time and against competitors is more useful than looking at absolute profit figures, because margins <strong>control for differences in business size</strong>.",
            tag: "exam"
          }
        ]
      }
    ],
    formulas: [
      {
        label: "GROSS PROFIT",
        text: "Gross Profit = Revenue - Cost of Sales"
      },
      {
        label: "OPERATING PROFIT",
        text: "Operating Profit = Gross Profit - Operating Expenses"
      },
      {
        label: "NET PROFIT",
        text: "Net Profit = Operating Profit - Interest - Tax"
      },
      {
        label: "PROFIT MARGIN",
        text: "Profit Margin (%) = (Profit / Revenue) x 100"
      }
    ],
    flow: {
      steps: ["Revenue earned", "Subtract cost of sales = Gross profit", "Subtract overheads, interest, tax = Net profit"],
      result: "Clear diagnosis of where profit is made or lost",
      resultType: "good"
    },
    examMatters: "Examiners expect you to calculate the relevant profit margin, then use it to diagnose where the problem lies. If gross margin is fine but net margin is low, focus your analysis on overheads, interest or tax, not on production costs.",
    takeaway: [
      "Gross profit isolates production efficiency; operating profit reveals overhead control; net profit is the final return.",
      "Profit margins are more informative than absolute profit because they allow comparison across firms of different sizes.",
      "Diagnosing which layer of profit is weak tells managers exactly where to focus cost reduction or revenue growth."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 2: Income Statement
   * ───────────────────────────────────────────────── */
  {
    title: "Income Statement",
    meta: "4 concepts",
    keyIdea: "The income statement is a financial film, not a photograph; it shows how well the business performed over a period by recording all revenue, costs and profit in a standardised format.",
    blocks: [
      {
        title: "STRUCTURE",
        items: [
          {
            type: "def",
            text: "<strong>Income statement (profit & loss account)</strong> — a financial document summarising a firm's revenue, costs and profit over a trading period, typically one year."
          },
          {
            type: "mech",
            text: "The statement follows a <strong>layered structure</strong>: revenue at the top, then cost of sales, then operating expenses, then interest and tax, producing gross profit, operating profit and net profit in sequence."
          },
          {
            type: "mech",
            text: "Stakeholders use the income statement differently: <strong>managers</strong> diagnose cost problems, <strong>investors</strong> assess profitability trends, and <strong>lenders</strong> check whether the firm can service its debts."
          }
        ]
      },
      {
        title: "EVALUATION",
        items: [
          {
            type: "imp",
            text: "The income statement is backward-looking; it shows <strong>past performance</strong> and cannot guarantee future profitability, so it must be used alongside forecasts and market analysis.",
            tag: "exam"
          },
          {
            type: "imp",
            text: "Figures can be manipulated through <strong>creative accounting</strong>, such as timing when expenses are recognised, which makes it important to compare statements across multiple years."
          },
          {
            type: "link",
            text: "The income statement links to the balance sheet; net profit either flows into retained earnings (strengthening the balance sheet) or is paid out as dividends."
          }
        ]
      }
    ],
    examMatters: "Examiners may give you an income statement extract and ask you to calculate margins or identify trends. Always show your working, state the formula, and then interpret what the number means in context.",
    takeaway: [
      "The income statement shows financial performance over time, not the financial position at a single moment.",
      "Reading the statement layer by layer reveals whether problems originate in production, overheads or financing.",
      "Always compare across years or competitors to identify meaningful trends rather than relying on a single period."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 3: Liquidity
   * ───────────────────────────────────────────────── */
  {
    title: "Liquidity",
    meta: "4 concepts + formulas",
    keyIdea: "Liquidity measures whether a business can pay its short-term debts as they fall due; even highly profitable firms can fail if they cannot convert assets into cash quickly enough.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Liquidity</strong> — the ability of a business to meet its short-term financial obligations using assets that can be quickly converted into cash."
          },
          {
            type: "def",
            text: "<strong>Current ratio</strong> — current assets divided by current liabilities; a ratio around 1.5:1 to 2:1 is generally considered healthy, meaning the firm has enough short-term assets to cover its debts.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Acid test ratio</strong> — current assets minus stock, divided by current liabilities; it is a stricter test because stock is the least liquid current asset and may not sell quickly."
          }
        ]
      },
      {
        title: "APPLICATION",
        items: [
          {
            type: "mech",
            text: "A current ratio <strong>below 1:1</strong> means current liabilities exceed current assets, signalling potential difficulty paying suppliers, wages or short-term loans."
          },
          {
            type: "mech",
            text: "A very high current ratio, such as 4:1, may indicate <strong>idle assets</strong> that are not being invested productively, reducing the firm's overall return."
          },
          {
            type: "imp",
            text: "Improving liquidity often involves <strong>chasing debtors faster, negotiating longer creditor terms, or reducing stockholding</strong>, each of which has trade-offs.",
            tag: "exam"
          }
        ]
      }
    ],
    formulas: [
      {
        label: "CURRENT RATIO",
        text: "Current Ratio = Current Assets / Current Liabilities"
      },
      {
        label: "ACID TEST RATIO",
        text: "Acid Test = (Current Assets - Stock) / Current Liabilities"
      }
    ],
    flow: {
      steps: ["Calculate current & acid test ratios", "Compare to benchmarks", "Identify and fix weak areas"],
      result: "Short-term solvency assured",
      resultType: "good"
    },
    misconception: "Students say a high current ratio is always good. Wrong because too much cash or stock sitting idle means the firm is not using its resources productively. Instead write: a healthy liquidity position balances having enough to pay bills with investing surplus assets to generate returns.",
    takeaway: [
      "Liquidity is about timing; a firm needs cash when bills arrive, not just profit at year-end.",
      "The acid test is stricter than the current ratio because it removes stock, which may be slow to sell.",
      "Both too-low and too-high ratios signal problems; the goal is a balanced, efficient use of working capital."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 4: Causes of Business Failure
   * ───────────────────────────────────────────────── */
  {
    title: "Causes of Business Failure",
    meta: "5 concepts",
    keyIdea: "Most businesses fail not because of one catastrophic event but because of a combination of poor cash-flow management, inadequate planning and inability to adapt to changing conditions.",
    blocks: [
      {
        title: "INTERNAL CAUSES",
        items: [
          {
            type: "def",
            text: "<strong>Cash-flow crisis</strong> — the most common immediate cause of failure; the business cannot pay its bills even if it is technically profitable, leading to insolvency.",
            tag: "exam"
          },
          {
            type: "mech",
            text: "Poor <strong>financial management</strong>, including lack of budgeting, no cash-flow forecasts and failure to chase debtors, accelerates the path toward failure."
          },
          {
            type: "mech",
            text: "<strong>Over-expansion</strong> occurs when a firm grows faster than its finances allow, stretching cash reserves and management capacity beyond breaking point."
          }
        ]
      },
      {
        title: "EXTERNAL CAUSES",
        items: [
          {
            type: "mech",
            text: "A sudden <strong>economic downturn</strong> reduces consumer spending, cutting revenue while many fixed costs remain, squeezing profits and cash flow simultaneously."
          },
          {
            type: "mech",
            text: "<strong>New competition or disruptive technology</strong> can erode market share rapidly, especially if the firm has been slow to innovate or adapt."
          },
          {
            type: "imp",
            text: "Business failure rarely has a single cause; it is usually a <strong>chain of factors</strong> where internal weaknesses are exposed by external pressures.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Causes of failure link to every topic in this unit; poor planning (2.3.1), inaccurate forecasting (2.3.2) and weak liquidity management all contribute."
          }
        ]
      }
    ],
    flow: {
      steps: ["Internal weakness develops", "External shock hits", "Cash runs out"],
      result: "Business becomes insolvent",
      resultType: "bad"
    },
    examMatters: "Examiners want multi-causal analysis. Never attribute failure to a single factor. Show how internal weaknesses such as poor cash-flow management made the firm vulnerable, and how an external shock such as a recession then triggered the actual collapse.",
    takeaway: [
      "Cash-flow failure, not lack of profit, is the most common immediate cause of business collapse.",
      "Over-expansion is a dangerous trap; growing faster than cash flow allows can destroy otherwise successful firms.",
      "Failure is almost always multi-causal; internal weaknesses are exposed and amplified by external shocks."
    ]
  }
];

/* ═══════════════════════════════════════════════════════════
 *  2.3.4 — Resource Management
 * ═══════════════════════════════════════════════════════════ */

const NOTES_234 = [

  /* ─────────────────────────────────────────────────
   *  Chapter 1: Production Methods
   * ───────────────────────────────────────────────── */
  {
    title: "Production Methods",
    meta: "4 concepts",
    keyIdea: "The production method a firm chooses depends on the volume of demand, the degree of customisation required and the balance between labour and capital costs.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Job production</strong> — making one unique product at a time to a customer's exact specification; it produces high-quality, bespoke output but is slow and expensive per unit."
          },
          {
            type: "def",
            text: "<strong>Batch production</strong> — producing a group of identical items together before switching to the next batch; it offers flexibility and moderate efficiency but involves downtime between batches.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Flow (mass) production</strong> — continuous production on an assembly line where each item passes through the same sequence of stages; it achieves the lowest unit cost but requires high capital investment and produces standardised output."
          }
        ]
      },
      {
        title: "EVALUATION",
        items: [
          {
            type: "mech",
            text: "Job production commands <strong>premium prices</strong> but cannot achieve economies of scale, so it suits luxury or specialist markets where customers value uniqueness."
          },
          {
            type: "mech",
            text: "Flow production delivers <strong>low unit costs</strong> through economies of scale, but the high set-up investment creates risk if demand falls or product specifications change."
          },
          {
            type: "imp",
            text: "Many firms use a <strong>combination of methods</strong>; for example, a car manufacturer uses flow production for standard components and batch production for different models.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Production methods link to capacity utilisation; flow production only achieves low unit costs when operating near full capacity."
          }
        ]
      }
    ],
    flow: {
      steps: ["Assess demand volume", "Choose job/batch/flow", "Match method to market needs"],
      result: "Efficient production aligned with demand",
      resultType: "good"
    },
    takeaway: [
      "Job production suits bespoke, high-value output; flow production suits high-volume, standardised goods.",
      "Batch production offers a middle ground with flexibility but introduces downtime between batches.",
      "The best method depends on the market; there is no universally correct production approach."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 2: Capacity Utilisation
   * ───────────────────────────────────────────────── */
  {
    title: "Capacity Utilisation",
    meta: "3 concepts + formula",
    keyIdea: "Capacity utilisation measures how much of a firm's maximum possible output is actually being used; too low wastes resources, too high creates inflexibility and quality risks.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Capacity utilisation</strong> — the percentage of a firm's total possible output that is currently being achieved; 100% means the firm is producing at its absolute maximum.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Excess capacity (under-utilisation)</strong> — when a firm is producing significantly below its maximum output, meaning fixed costs are spread over fewer units, raising the cost per unit."
          }
        ]
      },
      {
        title: "IMPLICATIONS",
        items: [
          {
            type: "mech",
            text: "Low capacity utilisation means <strong>higher fixed costs per unit</strong>, reducing competitiveness because the firm's average costs are unnecessarily high."
          },
          {
            type: "mech",
            text: "Operating at or near 100% leaves <strong>no room to accept rush orders</strong> or cope with unexpected demand spikes, and increases the risk of equipment breakdowns."
          },
          {
            type: "imp",
            text: "Firms can raise utilisation by <strong>increasing demand</strong> (marketing, price cuts) or <strong>reducing capacity</strong> (selling assets, outsourcing), each with different strategic implications.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Capacity utilisation links to production methods; flow production requires consistently high utilisation to justify the heavy capital investment."
          }
        ]
      }
    ],
    formulas: [
      {
        label: "CAPACITY UTILISATION",
        text: "Capacity Utilisation (%) = (Current Output / Maximum Output) x 100"
      }
    ],
    flow: {
      steps: ["Measure current vs maximum output", "Identify under- or over-utilisation", "Adjust demand or capacity"],
      result: "Optimal cost efficiency achieved",
      resultType: "good"
    },
    misconception: "Students say 100% capacity utilisation is the ideal target. Wrong because operating at full capacity leaves no flexibility to handle unexpected orders, maintenance or quality issues. Instead write: most firms aim for around 80-90% utilisation, balancing cost efficiency with operational flexibility.",
    takeaway: [
      "Low utilisation wastes fixed costs; high utilisation risks inflexibility and quality problems.",
      "The optimal rate is typically 80-90%, giving efficiency with room to respond to demand changes.",
      "Firms can improve utilisation by boosting demand or by rationalising excess capacity."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 3: Inventory Management
   * ───────────────────────────────────────────────── */
  {
    title: "Inventory Management",
    meta: "4 concepts",
    keyIdea: "Holding too much stock ties up cash and risks waste; holding too little risks running out and losing sales; effective inventory management finds the balance.",
    blocks: [
      {
        title: "APPROACHES",
        items: [
          {
            type: "def",
            text: "<strong>Just-in-time (JIT)</strong> — a system where materials arrive exactly when needed in the production process, minimising stockholding costs but requiring highly reliable suppliers.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Buffer stock</strong> — the minimum level of inventory a firm keeps as a safety net to avoid running out if demand spikes or deliveries are delayed."
          }
        ]
      },
      {
        title: "EVALUATION",
        items: [
          {
            type: "mech",
            text: "JIT <strong>frees up cash</strong> that would otherwise be locked in warehouses full of stock, and eliminates waste from expired, damaged or obsolete inventory."
          },
          {
            type: "mech",
            text: "However, JIT is <strong>vulnerable to supply chain disruption</strong>; a single delayed delivery can halt the entire production line."
          },
          {
            type: "imp",
            text: "The optimal approach depends on the <strong>reliability of suppliers and predictability of demand</strong>; JIT suits stable, well-coordinated supply chains, while buffer stock suits volatile markets.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Inventory management links to cash flow; reducing stockholding improves liquidity by freeing cash that was tied up in unsold goods."
          }
        ]
      }
    ],
    flow: {
      steps: ["Assess demand predictability", "Choose JIT or buffer stock", "Balance cost savings vs risk"],
      result: "Efficient stock levels with minimal waste",
      resultType: "good"
    },
    examMatters: "Examiners expect you to evaluate JIT by discussing both the cost savings and the risks. Always link your answer to the firm's context: a manufacturer with reliable suppliers benefits from JIT, while a retailer facing unpredictable demand may need buffer stock.",
    takeaway: [
      "JIT eliminates waste and frees cash but depends entirely on supply chain reliability.",
      "Buffer stock provides insurance against disruption but ties up working capital and warehouse space.",
      "The best approach depends on supplier reliability, demand predictability and the cost of a stockout."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 4: Quality
   * ───────────────────────────────────────────────── */
  {
    title: "Quality",
    meta: "5 concepts",
    keyIdea: "Quality is not just about the finished product; it is a philosophy embedded throughout the production process that reduces waste, builds loyalty and justifies premium pricing.",
    blocks: [
      {
        title: "APPROACHES",
        items: [
          {
            type: "def",
            text: "<strong>Quality control (QC)</strong> — inspecting finished products at the end of the production process to identify and remove defective items before they reach the customer."
          },
          {
            type: "def",
            text: "<strong>Quality assurance (QA)</strong> — a system of procedures and standards applied throughout production to prevent defects from occurring in the first place, rather than catching them afterwards.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Total quality management (TQM)</strong> — a whole-organisation philosophy where every employee takes responsibility for quality at every stage, aiming for zero defects."
          },
          {
            type: "def",
            text: "<strong>Kaizen</strong> — a Japanese approach of continuous small improvements made by all employees, building a culture where quality gradually improves every day."
          }
        ]
      },
      {
        title: "EVALUATION",
        items: [
          {
            type: "mech",
            text: "QC is the simplest approach but catches defects <strong>after resources have been wasted</strong> producing them; QA and TQM prevent waste by building quality into the process."
          },
          {
            type: "mech",
            text: "TQM requires <strong>cultural change</strong> across the entire organisation, which takes time, training investment and genuine commitment from senior management."
          },
          {
            type: "imp",
            text: "High quality <strong>reduces long-term costs</strong> by cutting returns, warranty claims and reputation damage, even though implementing quality systems increases short-term expenditure.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Quality links to branding and customer loyalty; consistently high quality is the foundation of a strong brand and repeat purchases."
          }
        ]
      }
    ],
    flow: {
      steps: ["QC catches defects after production", "QA prevents defects during production", "TQM/Kaizen embed quality in culture"],
      result: "Zero-defect culture that reduces costs and builds loyalty",
      resultType: "good"
    },
    misconception: "Students say improving quality always increases costs. Wrong because while initial investment rises, long-term costs fall due to fewer defects, less waste, fewer returns and stronger customer loyalty. Instead write: quality investment increases short-term costs but reduces long-term costs by eliminating waste and building a reputation that supports premium pricing.",
    takeaway: [
      "Quality control catches defects; quality assurance and TQM prevent them from happening in the first place.",
      "TQM and Kaizen require cultural transformation, not just procedural change, to succeed.",
      "Investing in quality raises short-term costs but lowers long-term costs through less waste and stronger loyalty."
    ]
  }
];

/* ═══════════════════════════════════════════════════════════
 *  2.3.5 — External Influences
 * ═══════════════════════════════════════════════════════════ */

const NOTES_235 = [

  /* ─────────────────────────────────────────────────
   *  Chapter 1: Inflation
   * ───────────────────────────────────────────────── */
  {
    title: "Inflation",
    meta: "4 concepts",
    keyIdea: "Inflation erodes the real value of money, raising input costs for businesses and squeezing consumers' purchasing power; firms that cannot pass on higher costs see their profit margins shrink.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Inflation</strong> — a sustained increase in the general price level of goods and services over time, reducing the purchasing power of each unit of currency.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Cost-push inflation</strong> — inflation caused by rising production costs, such as wages or raw materials, which firms pass on to consumers through higher prices."
          },
          {
            type: "def",
            text: "<strong>Demand-pull inflation</strong> — inflation caused by aggregate demand growing faster than aggregate supply, pulling prices upward as firms struggle to meet excess demand."
          }
        ]
      },
      {
        title: "IMPACT ON BUSINESS",
        items: [
          {
            type: "mech",
            text: "Rising costs force firms to choose between <strong>absorbing the increase</strong> (reducing margins) or <strong>raising prices</strong> (risking lost sales to cheaper competitors)."
          },
          {
            type: "mech",
            text: "Inflation makes <strong>financial planning harder</strong> because budgets and forecasts become less reliable when costs are moving unpredictably."
          },
          {
            type: "imp",
            text: "Firms selling essential goods with <strong>price-inelastic demand</strong> can pass on cost increases more easily than those in highly competitive markets with elastic demand.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Inflation links to interest rates; central banks typically raise interest rates to control inflation, which increases borrowing costs for businesses."
          }
        ]
      }
    ],
    flow: {
      steps: ["Input costs rise with inflation", "Firm absorbs or passes on costs", "Margins squeezed or sales fall"],
      result: "Profitability pressured from both sides",
      resultType: "bad"
    },
    examMatters: "Examiners want you to analyse the impact of inflation by linking it to the specific business context. A luxury brand with loyal customers can raise prices; a budget retailer in a competitive market cannot. Always consider price elasticity of demand in your answer.",
    takeaway: [
      "Inflation raises input costs and forces firms to choose between lower margins or higher prices.",
      "Cost-push inflation squeezes supply; demand-pull inflation signals an overheating economy.",
      "The ability to pass on price increases depends on the price elasticity of demand for the firm's products."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 2: Exchange Rates & Interest Rates
   * ───────────────────────────────────────────────── */
  {
    title: "Exchange Rates & Interest Rates",
    meta: "5 concepts",
    keyIdea: "Exchange rates determine the price of a country's exports and imports, while interest rates determine the cost of borrowing; both directly affect business costs, revenues and investment decisions.",
    blocks: [
      {
        title: "EXCHANGE RATES",
        items: [
          {
            type: "def",
            text: "<strong>Exchange rate</strong> — the price of one currency expressed in terms of another; it determines how much foreign currency a business receives when it exports and how much it pays when it imports."
          },
          {
            type: "mech",
            text: "A <strong>strong (appreciated) currency</strong> makes exports more expensive abroad and imports cheaper at home, squeezing exporters but benefiting importers.",
            tag: "exam"
          },
          {
            type: "mech",
            text: "A <strong>weak (depreciated) currency</strong> makes exports cheaper abroad and imports more expensive, boosting exporters but raising input costs for firms relying on imported materials."
          }
        ]
      },
      {
        title: "INTEREST RATES",
        items: [
          {
            type: "def",
            text: "<strong>Interest rate</strong> — the cost of borrowing money or the reward for saving, expressed as a percentage; set by the central bank and passed on by commercial banks."
          },
          {
            type: "mech",
            text: "Higher interest rates <strong>increase the cost of loans and mortgages</strong>, reducing consumer spending and discouraging business investment in expansion."
          },
          {
            type: "imp",
            text: "Firms with high levels of variable-rate debt are most <strong>vulnerable to rate rises</strong>, as their repayment costs increase immediately, squeezing cash flow.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Interest rates and exchange rates are linked; higher domestic interest rates attract foreign capital, increasing demand for the currency and causing it to appreciate."
          }
        ]
      }
    ],
    flow: {
      steps: ["Central bank changes interest rate", "Borrowing costs and exchange rate shift", "Business costs, sales and investment respond"],
      result: "Firms must adapt pricing and investment plans",
      resultType: "bad"
    },
    examMatters: "Examiners expect you to use SPICED (Strong Pound Imports Cheaper Exports Dearer) or WPIDEC (Weak Pound Imports Dearer Exports Cheaper) to structure exchange rate analysis. Always link the rate change to the specific business, explaining whether it mainly exports, imports, or both.",
    takeaway: [
      "A strong currency helps importers but hurts exporters; a weak currency does the reverse.",
      "Higher interest rates raise borrowing costs and reduce consumer spending, dampening demand.",
      "Firms with high debt exposure are most vulnerable to interest rate increases."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 3: Business Cycle
   * ───────────────────────────────────────────────── */
  {
    title: "Business Cycle",
    meta: "5 concepts",
    keyIdea: "Economies move through recurring phases of boom, recession, slump and recovery; each phase creates different opportunities and threats for businesses depending on what they sell.",
    blocks: [
      {
        title: "PHASES",
        items: [
          {
            type: "def",
            text: "<strong>Boom</strong> — a period of rapid economic growth with rising GDP, high consumer spending, low unemployment and often rising inflation."
          },
          {
            type: "def",
            text: "<strong>Recession</strong> — two or more consecutive quarters of negative GDP growth, characterised by falling demand, rising unemployment and declining business confidence.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Slump</strong> — a prolonged and deep recession where output and confidence reach their lowest point before recovery begins."
          },
          {
            type: "def",
            text: "<strong>Recovery</strong> — the phase where GDP begins to grow again after a slump, with spending and confidence gradually returning."
          }
        ]
      },
      {
        title: "IMPACT ON BUSINESS",
        items: [
          {
            type: "mech",
            text: "In a boom, firms face <strong>rising demand but also rising costs</strong> as competition for labour and materials intensifies, potentially triggering inflation."
          },
          {
            type: "mech",
            text: "In a recession, firms selling <strong>luxury goods (income-elastic)</strong> suffer most as consumers cut discretionary spending; firms selling necessities are more resilient."
          },
          {
            type: "imp",
            text: "Smart firms use recessions to <strong>invest counter-cyclically</strong>, buying assets cheaply and positioning for growth when recovery arrives.",
            tag: "exam"
          },
          {
            type: "link",
            text: "The business cycle links to inflation and interest rates; central banks adjust rates to smooth the cycle, raising them in booms and cutting them in recessions."
          }
        ]
      }
    ],
    flow: {
      steps: ["Boom: high demand, rising costs", "Recession: falling demand, rising unemployment", "Recovery: confidence and spending return"],
      result: "Firms must adapt strategy to each phase",
      resultType: "good"
    },
    takeaway: [
      "Booms bring opportunity but also inflationary pressure and competition for resources.",
      "Recessions hit income-elastic goods hardest; necessities and inferior goods may actually see rising demand.",
      "Counter-cyclical investment during downturns can create competitive advantage when the economy recovers."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 4: Legislation
   * ───────────────────────────────────────────────── */
  {
    title: "Legislation",
    meta: "4 concepts",
    keyIdea: "Laws constrain how businesses operate to protect consumers, employees and competition; compliance costs money, but it also creates a level playing field and builds public trust.",
    blocks: [
      {
        title: "KEY AREAS",
        items: [
          {
            type: "def",
            text: "<strong>Consumer protection law</strong> — legislation that ensures products are safe, fit for purpose and as described, giving buyers legal rights to refunds, repairs or replacements.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Employment law</strong> — legislation covering minimum wages, working hours, discrimination, health and safety, and unfair dismissal, protecting workers' rights in the workplace."
          },
          {
            type: "def",
            text: "<strong>Competition law</strong> — legislation preventing anti-competitive practices such as price-fixing, market-sharing agreements and abuse of dominant market position."
          }
        ]
      },
      {
        title: "IMPACT ON BUSINESS",
        items: [
          {
            type: "mech",
            text: "Compliance <strong>raises operational costs</strong> through training, record-keeping, safety equipment and legal advice, which can disproportionately burden small businesses."
          },
          {
            type: "mech",
            text: "Consumer protection builds <strong>customer confidence</strong> and trust, which can actually increase demand because buyers feel safe purchasing."
          },
          {
            type: "imp",
            text: "Businesses that view legislation as an <strong>opportunity to build reputation</strong> rather than just a cost can gain competitive advantage through stronger brand trust.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Employment legislation links to HR management; minimum wage and working-time rules directly affect staffing costs and workforce planning."
          }
        ]
      }
    ],
    flow: {
      steps: ["Government introduces regulation", "Firms invest in compliance", "Costs rise but trust and fairness improve"],
      result: "Level playing field with higher standards",
      resultType: "good"
    },
    examMatters: "Examiners want you to evaluate legislation by discussing both the costs and benefits. Do not simply say regulation is bad for business; show that compliance costs are real but that regulation also protects the firm from unfair competition and builds consumer confidence.",
    takeaway: [
      "Consumer law protects buyers and builds market confidence; employment law protects workers and raises labour costs.",
      "Competition law prevents dominant firms from abusing their power, keeping markets fair for smaller competitors.",
      "Legislation raises compliance costs but also creates trust, fairness and a level competitive environment."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 5: Competitive Environment
   * ───────────────────────────────────────────────── */
  {
    title: "Competitive Environment",
    meta: "4 concepts",
    keyIdea: "The competitive structure of a market shapes every strategic decision a firm makes; the number of rivals, their size and the barriers to entry determine pricing power and profit potential.",
    blocks: [
      {
        title: "MARKET STRUCTURES",
        items: [
          {
            type: "def",
            text: "<strong>Competitive market</strong> — a market with many firms selling similar products where no single firm can influence the market price; firms compete mainly on cost efficiency."
          },
          {
            type: "def",
            text: "<strong>Oligopoly</strong> — a market dominated by a few large firms whose actions are interdependent; each firm must consider how rivals will respond before changing price or strategy.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Monopoly power</strong> — when a single firm or small group controls a significant share of the market, enabling it to set higher prices and restrict output."
          }
        ]
      },
      {
        title: "STRATEGIC IMPLICATIONS",
        items: [
          {
            type: "mech",
            text: "In highly competitive markets, firms must achieve <strong>low costs</strong> to survive because price is set by the market and individual firms are price takers."
          },
          {
            type: "mech",
            text: "In oligopolies, firms often avoid price competition and instead compete through <strong>branding, product differentiation and non-price strategies</strong> to maintain margins."
          },
          {
            type: "imp",
            text: "High <strong>barriers to entry</strong> such as capital requirements, brand loyalty and legal restrictions protect established firms from new competition, sustaining their profitability.",
            tag: "exam"
          },
          {
            type: "link",
            text: "The competitive environment links to pricing strategy and branding; a firm's pricing power depends entirely on how competitive its market is."
          }
        ]
      }
    ],
    flow: {
      steps: ["Assess number of rivals and barriers", "Determine firm's pricing power", "Choose cost or differentiation strategy"],
      result: "Strategy aligned with competitive reality",
      resultType: "good"
    },
    misconception: "Students say competition is always bad for businesses. Wrong because competition drives innovation, efficiency and customer focus, which can make the firm stronger long-term. Instead write: while competition reduces short-term pricing power, it forces firms to innovate and become more efficient, strengthening those that adapt successfully.",
    takeaway: [
      "Competitive markets demand cost efficiency; oligopolies reward branding and differentiation.",
      "Barriers to entry protect incumbents; firms should invest in building and maintaining these barriers.",
      "The competitive environment determines pricing power, which in turn determines profit potential."
    ]
  }
];

/* ═══════════════════════════════════════════════════════════
 *  RUNNER — push all 5 sections to Supabase
 * ═══════════════════════════════════════════════════════════ */

const SECTIONS = [
  { id: 'planning-raising-finance', label: '2.3.1 Planning & Raising Finance', notes: NOTES_231 },
  { id: 'financial-planning',       label: '2.3.2 Financial Planning',        notes: NOTES_232 },
  { id: 'managing-finance',         label: '2.3.3 Managing Finance',          notes: NOTES_233 },
  { id: 'resource-management',      label: '2.3.4 Resource Management',       notes: NOTES_234 },
  { id: 'external-influences',      label: '2.3.5 External Influences',       notes: NOTES_235 },
];

async function main() {
  console.log('═══════════════════════════════════════════════');
  console.log('  BUSINESS UNIT 2 — Rich Notes Updater');
  console.log('  Sections: 5 | Format: rich blocks + flows');
  console.log('═══════════════════════════════════════════════\n');

  let allSuccess = true;

  for (const section of SECTIONS) {
    console.log(`\n── ${section.label} ──`);
    console.log(`   Section ID: ${section.id}`);
    console.log(`   Chapters:   ${section.notes.length}`);

    const totalBlocks = section.notes.reduce((sum, ch) => sum + ch.blocks.length, 0);
    const totalItems = section.notes.reduce((sum, ch) =>
      sum + ch.blocks.reduce((s, b) => s + b.items.length, 0), 0);

    console.log(`   Blocks:     ${totalBlocks}`);
    console.log(`   Items:      ${totalItems}`);

    const { error } = await supabase
      .from('section_notes')
      .update({ data: section.notes })
      .eq('section_id', section.id);

    if (error) {
      console.error(`   FAILED: ${error.message}`);
      allSuccess = false;
      continue;
    }

    console.log('   SUCCESS — pushed to Supabase.');

    /* Verify */
    const { data, error: readErr } = await supabase
      .from('section_notes')
      .select('section_id, data')
      .eq('section_id', section.id)
      .single();

    if (readErr) {
      console.warn(`   Could not verify: ${readErr.message}`);
    } else if (data?.data?.length === section.notes.length) {
      console.log(`   VERIFIED — ${data.data.length} chapters stored.`);
    } else {
      console.warn(`   Verification mismatch: expected ${section.notes.length}, got ${data?.data?.length ?? 0}.`);
    }
  }

  console.log('\n═══════════════════════════════════════════════');
  if (allSuccess) {
    console.log('  ALL 5 SECTIONS UPDATED SUCCESSFULLY');
  } else {
    console.log('  SOME SECTIONS FAILED — check logs above');
    process.exit(1);
  }
  console.log('═══════════════════════════════════════════════\n');
}

main();
