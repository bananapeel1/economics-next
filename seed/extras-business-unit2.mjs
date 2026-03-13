// ═══════════════════════════════════════════════════════════════
// EXTRAS — Edexcel International A-Level Business (IAL)
// Business Unit 2: Managing Business Activities (WBS12)
// 5 sections, 4 thematically linked chains + 3 evaluation points each
// ═══════════════════════════════════════════════════════════════

export default {

  // 1. PLANNING & RAISING FINANCE
  // Theme: Plan → Source funds → Choose debt vs equity → Manage cash flow
  'planning-raising-finance': {
    chains: [
      {
        title: "Business plans reduce risk and attract finance",
        steps: [
          "An entrepreneur prepares a business plan detailing the market opportunity, financial forecasts and competitive strategy.",
          "The plan demonstrates to lenders and investors that risks have been considered and returns are realistic.",
          "Banks offer loans on more favourable terms, or investors provide equity at a higher valuation, due to perceived lower risk.",
          "The business secures sufficient start-up or growth capital to begin operations or fund expansion."
        ],
        result: "A well-researched business plan is essential for accessing external finance — it reduces perceived risk and builds lender or investor confidence."
      },
      {
        title: "The choice of finance source depends on business needs",
        steps: [
          "Short-term needs (cash flow gaps, seasonal stock) suit overdrafts or trade credit — flexible and quick to arrange.",
          "Medium-term needs (equipment, vehicles) suit bank loans or hire purchase — matched repayment to asset life.",
          "Long-term needs (expansion, new premises) suit share capital, venture capital or long-term loans — larger sums over longer periods.",
          "Matching the finance source to the purpose ensures costs are minimised and repayment is manageable."
        ],
        result: "Choosing the right finance source depends on the purpose, amount needed and the firm's willingness to share ownership or take on debt."
      },
      {
        title: "Debt vs equity involves fundamental trade-offs",
        steps: [
          "Debt finance (loans, overdrafts) preserves ownership but creates fixed repayment obligations with interest.",
          "Equity finance (shares, venture capital) avoids repayment pressure but permanently dilutes the owner's control and profit share.",
          "In a downturn, debt becomes a burden as repayments continue regardless of revenue — increasing insolvency risk.",
          "Equity investors share the risk but may demand influence over strategy and expect high returns."
        ],
        result: "The optimal debt-equity balance depends on risk tolerance, cash flow stability and the owner's willingness to share control — there is no universally correct answer."
      },
      {
        title: "Cash flow management determines survival",
        steps: [
          "A business may be profitable on paper but still fail if cash outflows exceed inflows at critical points.",
          "Cash flow forecasts identify periods of potential shortfall, allowing managers to arrange overdrafts or chase debtors in advance.",
          "Proactive cash flow management — negotiating supplier credit, reducing debtor days, controlling stock levels — prevents liquidity crises.",
          "Maintaining positive cash flow ensures the business can pay wages, suppliers and creditors on time, avoiding insolvency."
        ],
        result: "Cash flow management is the most common determinant of business survival — profitable businesses fail when they run out of cash."
      }
    ],
    evaluation: [
      {
        title: "Business plans are based on assumptions",
        content: "Financial forecasts rely on assumptions about demand, costs and market conditions that may prove inaccurate. Overly optimistic projections mislead investors; overly cautious estimates may fail to attract funding. The value lies in the quality of thinking, not the precision of numbers."
      },
      {
        title: "Venture capital is not suitable for all businesses",
        content: "VCs seek high-growth businesses with clear exit strategies. Lifestyle businesses or slow-growth firms are unlikely to attract VC interest. Venture capital involves significant loss of control and pressure for rapid returns that may conflict with the founder's vision."
      },
      {
        title: "Internal finance limits growth speed",
        content: "Relying solely on retained profit constrains investment to the amount of profit generated. In fast-moving markets, competitors with external funding may scale more quickly and capture market share. Businesses must weigh the lower risk of internal finance against potentially slower growth."
      }
    ]
  },

  // 2. FINANCIAL PLANNING
  // Theme: Break-even → Budgets → Contribution → Cash flow forecasting
  'financial-planning': {
    chains: [
      {
        title: "Break-even analysis reveals the minimum viable output",
        steps: [
          "A business calculates its break-even point: fixed costs divided by contribution per unit (selling price minus variable cost).",
          "This reveals the minimum number of units that must be sold to cover all costs and avoid a loss.",
          "The margin of safety (actual sales minus break-even output) shows how far sales can fall before losses begin.",
          "Managers use this to evaluate pricing strategies, assess new product viability and set sales targets."
        ],
        result: "Break-even analysis provides a clear financial threshold for decision-making — it shows the minimum output needed to survive."
      },
      {
        title: "Budgets create financial discipline and accountability",
        steps: [
          "Departmental budgets allocate a fixed spending limit to each area of the business.",
          "Budget holders are responsible for managing within their allocation, creating accountability at every level.",
          "Variance analysis compares actual spending to budgeted figures, highlighting areas of over- or under-spending.",
          "Managers investigate adverse variances and take corrective action — renegotiating contracts, cutting waste or reallocating resources."
        ],
        result: "Budgeting creates a framework for cost control and accountability — it enables managers to identify inefficiencies early."
      },
      {
        title: "Contribution analysis guides product mix decisions",
        steps: [
          "Contribution per unit (selling price minus variable cost) shows how much each product contributes to covering fixed costs.",
          "Products with high contribution make a larger payment toward fixed costs and profit.",
          "Managers use contribution data to decide which products to promote, which to discontinue and how to allocate resources.",
          "Shifting resources toward high-contribution products maximises overall profitability."
        ],
        result: "Contribution analysis provides a rational basis for product decisions — it focuses resources on the products that generate the greatest surplus."
      },
      {
        title: "Cash flow forecasts prevent insolvency",
        steps: [
          "A cash flow forecast projects all expected inflows and outflows over the coming months.",
          "It identifies periods where outflows exceed inflows — potential cash shortfalls.",
          "Managers take pre-emptive action: arranging overdrafts, delaying non-essential spending or chasing late-paying debtors.",
          "By anticipating problems before they occur, the business avoids the inability to pay obligations — the most common cause of failure."
        ],
        result: "Cash flow forecasting is a critical survival tool — it enables proactive management of liquidity and reduces the risk of insolvency."
      }
    ],
    evaluation: [
      {
        title: "Break-even relies on simplistic assumptions",
        content: "It assumes all output is sold, that prices and variable costs are constant, and that costs divide neatly into fixed and variable. In reality, firms offer discounts, face stepped costs and experience semi-variable costs. Break-even is an approximation, not a precise prediction."
      },
      {
        title: "Budgets can create dysfunctional behaviour",
        content: "Budget holders may rush to spend their full allocation at year-end to avoid cuts the following year. Tight budgets may discourage innovation and risk-taking. Effective budgeting requires flexibility and a culture that rewards efficiency, not just compliance."
      },
      {
        title: "Profitability and cash flow are distinct concepts",
        content: "A business can be profitable but cash-poor if revenue is tied up in receivables or drained by capital expenditure. Conversely, a loss-making firm may have positive cash flow temporarily by delaying payments. Financial planning must address both separately."
      }
    ]
  },

  // 3. MANAGING FINANCE
  // Theme: Profitability → Liquidity → Balance sheet strength → Stakeholder confidence
  'managing-finance': {
    chains: [
      {
        title: "Profitability ratios reveal the quality of earnings",
        steps: [
          "Gross profit margin shows whether the core trading activity generates sufficient surplus after cost of sales.",
          "Operating profit margin reveals whether overheads are under control — a declining margin signals rising expenses relative to revenue.",
          "Net profit margin shows the final return after all costs including interest and tax.",
          "Tracking these ratios over time reveals trends — a business with growing revenue but falling margins has a cost problem, not a sales problem."
        ],
        result: "Profitability ratios provide essential insight into the quality of earnings — revenue growth alone means nothing if margins are eroding."
      },
      {
        title: "Liquidity ratios measure short-term survival capacity",
        steps: [
          "The current ratio (current assets ÷ current liabilities) indicates whether the business can meet its short-term obligations.",
          "The acid test ratio excludes stock, providing a stricter test of immediate liquidity.",
          "A ratio below 1.0 signals potential danger — the business may not be able to pay its bills as they fall due.",
          "Managers improve liquidity by reducing debtor collection periods, negotiating longer supplier credit or arranging short-term borrowing."
        ],
        result: "Liquidity management prevents the cash flow crises that destroy even profitable businesses — it is the most immediate measure of financial health."
      },
      {
        title: "Balance sheet strength supports long-term investment",
        steps: [
          "A strong balance sheet shows net assets significantly exceeding liabilities, with low gearing (low proportion of debt to equity).",
          "Low gearing reduces financial risk — less profit is consumed by interest payments, leaving more for reinvestment.",
          "Banks and investors view the business as lower risk, offering more favourable lending terms and cheaper capital.",
          "Access to cheaper finance enables strategic investment that higher-risk competitors cannot afford."
        ],
        result: "Balance sheet strength builds stakeholder confidence, reduces the cost of capital and provides the financial foundation for long-term growth."
      },
      {
        title: "Financial analysis must be contextual and comparative",
        steps: [
          "Individual ratios mean little in isolation — a current ratio of 1.5 may be healthy for a retailer but dangerously low for a manufacturer.",
          "Ratios must be compared against industry benchmarks, competitor performance and the firm's own historical trends.",
          "Financial statements are backward-looking — they show what happened, not what will happen.",
          "Effective analysis combines ratio analysis with qualitative assessment of brand strength, market position and management quality."
        ],
        result: "Financial analysis requires context and comparison to be meaningful — numbers alone do not tell the full story of business performance."
      }
    ],
    evaluation: [
      {
        title: "Profitability and liquidity can conflict",
        content: "Investing in machinery boosts long-term profitability but drains short-term cash. Holding excessive cash ensures liquidity but earns no productive return. Managers must balance these competing objectives rather than pursuing either in isolation."
      },
      {
        title: "Financial statements can be manipulated",
        content: "Businesses have discretion over depreciation methods, revenue recognition and asset valuation. Creative accounting — while legal — can inflate apparent profitability or disguise weakness. Stakeholders must look beyond headline figures to underlying policies."
      },
      {
        title: "Non-financial factors may matter more",
        content: "Ratios cannot capture brand strength, employee morale, innovation capability or customer loyalty. A business with declining ratios may have strong prospects due to a new product; one with excellent ratios may be heading for decline due to losing key staff. Effective analysis combines financial and non-financial assessment."
      }
    ]
  },

  // 4. RESOURCE MANAGEMENT
  // Theme: Production efficiency → Stock management → Quality → Capacity utilisation
  'resource-management': {
    chains: [
      {
        title: "Lean production eliminates waste and reduces costs",
        steps: [
          "Lean production identifies and eliminates all forms of waste — excess inventory, unnecessary movement, defective output and waiting time.",
          "Streamlined processes reduce material waste, lower storage costs and minimise non-value-adding activities.",
          "Average production costs fall as resources are used more efficiently, without requiring additional capital investment.",
          "Lower unit costs enable more competitive pricing or wider profit margins, strengthening the firm's market position."
        ],
        result: "Lean production creates a culture of continuous efficiency improvement — it reduces costs and strengthens competitiveness without compromising quality."
      },
      {
        title: "Just-in-time stock management frees working capital",
        steps: [
          "JIT receives materials only when needed in production, eliminating buffer stock.",
          "Stock holding levels fall dramatically — freeing warehouse space and reducing storage costs, insurance and obsolescence risk.",
          "Cash previously tied up in stock is released, improving working capital for other productive uses.",
          "Production becomes closely aligned with actual orders rather than forecasts, improving responsiveness to demand."
        ],
        result: "JIT improves working capital efficiency by minimising stock levels — but success depends critically on reliable suppliers and accurate demand forecasting."
      },
      {
        title: "Quality management builds reputation and reduces costs",
        steps: [
          "Total Quality Management (TQM) makes quality every employee's responsibility — defects are caught and corrected at every stage, not just final inspection.",
          "Defect rates fall, reducing waste, rework costs and customer returns.",
          "Customers receive consistently high-quality products, increasing satisfaction, repeat purchases and positive word-of-mouth.",
          "The business builds a reputation for reliability that supports premium pricing and differentiates it from competitors."
        ],
        result: "Quality management transforms quality from a cost of compliance into a source of competitive advantage — it drives customer loyalty and brand value."
      },
      {
        title: "Capacity utilisation determines unit cost efficiency",
        steps: [
          "A business operating at 60% capacity spreads its fixed costs across fewer units, resulting in high average costs per unit.",
          "Increasing utilisation through new contracts, extended hours or product diversification spreads fixed costs more widely.",
          "As output rises, average cost per unit falls significantly — improving price competitiveness and profit margins.",
          "However, operating consistently above 90% risks machine breakdowns, worker fatigue and inability to meet demand surges."
        ],
        result: "Capacity utilisation is one of the most direct routes to reducing unit costs — but the optimal level balances cost efficiency with operational flexibility."
      }
    ],
    evaluation: [
      {
        title: "JIT is vulnerable to supply chain disruption",
        content: "With no buffer stock, any supplier delay or disruption halts production entirely. Events like transport strikes or natural disasters can be catastrophic for JIT firms. Businesses must invest heavily in supplier relationships and may need contingency plans that offset cost savings."
      },
      {
        title: "Lean production requires cultural change",
        content: "Implementing lean is not just a technical process — it requires a fundamental shift in culture toward continuous improvement. Employee resistance (fear of job losses, increased workload) can undermine lean initiatives. Success depends as much on change management as on process redesign."
      },
      {
        title: "Quality systems involve significant upfront costs",
        content: "Implementing TQM requires substantial investment in training, monitoring and process re-engineering. Benefits may take considerable time to materialise in increased sales. For small businesses with limited resources, the short-term financial impact can be negative even if the long-term return is positive."
      }
    ]
  },

  // 5. EXTERNAL INFLUENCES
  // Theme: Economic environment → Legal framework → Competitive pressure → Strategic response
  'external-influences': {
    chains: [
      {
        title: "Economic conditions shape demand and business strategy",
        steps: [
          "Rising interest rates increase borrowing costs for consumers and businesses, reducing disposable income and investment.",
          "Consumer spending on income-elastic goods (luxuries, non-essentials) falls as mortgage and loan repayments absorb more income.",
          "Businesses selling discretionary products experience declining demand, leading to lower revenue and potential stock build-up.",
          "Firms respond by cutting costs, reducing prices or shifting focus to more income-inelastic product lines."
        ],
        result: "Economic conditions directly shape demand patterns — businesses must monitor interest rates, inflation and GDP growth to anticipate shifts in consumer spending."
      },
      {
        title: "Exchange rate movements create winners and losers",
        steps: [
          "A fall in the pound makes UK exports cheaper in foreign currency terms, boosting price competitiveness abroad.",
          "Exporters benefit from increased foreign demand and higher revenue when converted back to sterling.",
          "However, imported raw materials become more expensive, increasing production costs for firms reliant on foreign inputs.",
          "The net effect on profitability depends on the balance between export gains and import cost increases."
        ],
        result: "Exchange rate changes create both opportunities and threats — the impact depends on the firm's trade exposure and the price elasticity of its products."
      },
      {
        title: "Employment and consumer legislation increase costs but build trust",
        steps: [
          "Employment law (minimum wage, parental leave, dismissal procedures) raises direct labour costs and compliance costs.",
          "Consumer protection law (product quality, fair contracts, honest marketing) requires investment in quality control and staff training.",
          "Higher costs reduce short-term margins — but reputable firms benefit from a level playing field that prevents unfair competition.",
          "Consumers and employees gain greater confidence, which supports demand, loyalty and recruitment."
        ],
        result: "Legislation increases costs but creates a more trusted marketplace — businesses that exceed minimum standards can turn compliance into competitive advantage."
      },
      {
        title: "Economic cycles force strategic adaptation",
        steps: [
          "Recession (two consecutive quarters of negative GDP growth) causes widespread falls in consumer and business confidence.",
          "Demand falls across most sectors — particularly luxury goods, capital equipment and housing.",
          "Businesses implement cost-cutting: redundancies, reduced marketing, delayed investment and renegotiated contracts.",
          "Stronger firms with cash reserves survive and can acquire distressed competitors at low prices, emerging in a stronger position."
        ],
        result: "Recessions force defensive strategies but also create opportunities — well-capitalised firms can consolidate market position while weaker competitors exit."
      }
    ],
    evaluation: [
      {
        title: "Interest rate impacts vary by business type",
        content: "Firms selling necessities experience stable demand regardless of rate changes, while luxury retailers and house-builders are highly sensitive. Cash-rich firms may benefit from higher returns on savings. The impact depends on product type, customer base and financial structure."
      },
      {
        title: "Legislation can create competitive advantage",
        content: "Firms that voluntarily exceed minimum standards may attract better employees and more loyal customers. Paying above minimum wage reduces turnover and training costs. The strategic question is whether to treat legislation as a constraint to minimise or an opportunity to differentiate."
      },
      {
        title: "Economic cycles are difficult to predict",
        content: "Even professional economists struggle to predict the timing and severity of recessions. Businesses that make major decisions based on forecasts risk being wrong. A more resilient approach is maintaining financial flexibility through moderate gearing and cash reserves, enabling response to changing conditions rather than attempting prediction."
      }
    ]
  },

};
