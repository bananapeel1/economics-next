/**
 * SECTION UPGRADE — Financial Planning (Business 2)
 * ==========================================================
 * Edexcel IAL Business Unit 2
 * Run with: node scripts/upgrade-content-business-financial-planning.mjs
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL     || 'https://trweeckuswgkenckeqfb.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);

/* ── 1. SETTINGS ──────────────────────────────────────────────────────────── */

const SECTION_SLUG = 'financial-planning';
const SUBJECT_ID   = 'business';

/* ── 2. CONTENT ───────────────────────────────────────────────────────────── */

const CONTENT = [

  /* ═══ Block 1: Sales/Revenue/Costs ═══ */
  {
    title: "Sales, Revenue and Costs",
    quizIndices: [0],
    sections: [
      {
        id: "revenue-calculations",
        title: "Revenue Calculations",
        keyIdea: "Total revenue is the income a business receives from selling its output, calculated as the selling price multiplied by the quantity sold.",
        body: [
          {
            type: "paragraph",
            text: "**Total revenue** (TR) is the total income a business earns from selling goods or services over a given period. It is calculated using the formula: **TR = Price x Quantity sold**. Revenue is not the same as profit — it is the top line of the income statement before any costs are deducted."
          },
          {
            type: "flow",
            steps: ["Set selling price", "Sell units to customers", "TR = Price x Quantity"],
            result: "Total revenue is the starting point for calculating profit",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "A business can increase revenue by raising the price per unit or by selling more units. However, these two levers often pull in opposite directions — raising the price typically reduces quantity demanded, so the net effect on revenue depends on **price elasticity of demand**."
          },
          {
            type: "paragraph",
            text: "You should distinguish between revenue and **turnover** — in practice these terms are used interchangeably for most businesses. Revenue can also come from multiple product lines, so total revenue is often the sum of revenues from each product the business sells."
          }
        ],
        realExample: {
          emoji: "🎵",
          text: "**Spotify** generates revenue from two streams: premium subscriptions and advertising on the free tier. In 2023 Spotify's total revenue exceeded 13 billion euros, with subscription income accounting for approximately 87% of the total, demonstrating how businesses can combine pricing models to maximise revenue."
        },
        misconception: "Students confuse revenue with profit, writing that a business with high revenue must be successful. A business can have millions in revenue and still make a loss if costs exceed income. Instead write: revenue is total income before costs are deducted, so high revenue does not guarantee profitability.",
        examMatters: "Revenue calculation questions are straightforward but examiners award marks for showing the formula and your working. Always write TR = P x Q, substitute the figures, and state the answer with correct units. Losing marks on easy calculations is avoidable.",
        recall: {
          type: "fillin",
          prompt: "Complete the revenue logic:",
          template: ["Total revenue = ___ multiplied by quantity sold", "Revenue is the ___ line of the income statement", "High revenue does not guarantee ___ if costs are too high"],
          answers: ["price", "top", "profitability"],
          hints: ["pri__", "to_", "pro___________"]
        }
      },
      {
        id: "fixed-variable-costs",
        title: "Fixed and Variable Costs",
        keyIdea: "Fixed costs stay the same regardless of output, while variable costs change directly with the number of units produced, and together they form total costs.",
        body: [
          {
            type: "paragraph",
            text: "**Fixed costs** (FC) are costs that do not change with the level of output. Rent, salaries of permanent staff, insurance and loan repayments must all be paid whether the business produces one unit or one million. They are sometimes called **overheads**."
          },
          {
            type: "paragraph",
            text: "**Variable costs** (VC) change directly in proportion to output. Raw materials, packaging and direct labour paid per unit are typical variable costs. If output doubles, total variable costs roughly double."
          },
          {
            type: "flow",
            steps: ["Total costs = Fixed costs + Variable costs", "TC = FC + (VC per unit x Quantity)"],
            result: "Understanding cost structure is essential for pricing and profit",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "The **cost structure** of a business — the ratio of fixed to variable costs — has significant implications. A business with high fixed costs needs high sales volume to spread those costs across many units. A business with mostly variable costs is more flexible but may have higher per-unit costs."
          }
        ],
        realExample: {
          emoji: "✈️",
          text: "**EasyJet** has a high fixed cost structure — aircraft leases, airport charges and crew salaries must be paid regardless of how many seats are filled. This is why EasyJet aggressively discounts unsold seats close to departure, because any revenue above the tiny variable cost per passenger contributes to covering those fixed costs."
        },
        misconception: "Students claim that fixed costs never change. Fixed costs are fixed relative to output, but they can change over time — rent may increase at renewal, or insurance premiums may rise. Instead write: fixed costs do not change with output in the short run, but they can change due to contractual renegotiation or external factors.",
        examMatters: "Examiners often provide cost data and ask you to calculate total costs or identify fixed and variable components. Classify each cost carefully — wages can be fixed (salaried staff) or variable (piece-rate workers). Show your working clearly.",
        recall: {
          type: "reorder",
          prompt: "Classify these costs from most fixed to most variable:",
          correctOrder: ["Annual factory rent", "Monthly insurance premium", "Raw materials per unit", "Packaging cost per item"],
          shuffled: [2, 0, 3, 1]
        }
      },
      {
        id: "profit-and-loss",
        title: "Profit and Loss",
        keyIdea: "Profit is the surplus remaining when total costs are subtracted from total revenue, and a loss occurs when costs exceed revenue.",
        body: [
          {
            type: "paragraph",
            text: "**Profit** is the financial reward for taking risk in business. It is calculated as **Total Revenue minus Total Costs**. If revenue exceeds costs, the business makes a profit. If costs exceed revenue, it makes a **loss**. Profit is the primary objective of most private-sector businesses."
          },
          {
            type: "flow",
            steps: ["Calculate total revenue", "Subtract total costs", "Positive = profit, Negative = loss"],
            result: "Profit is the financial measure of business success",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "You should understand the difference between **gross profit** (revenue minus cost of sales) and **net profit** (gross profit minus all other expenses including overheads, interest and tax). Net profit is the true measure of how much the business earns after everything is paid."
          },
          {
            type: "paragraph",
            text: "A business can improve profit by increasing revenue, reducing costs, or both. However, cost-cutting has limits — reducing quality or staff too aggressively may damage sales in the long run. Sustainable profit growth usually requires a balance of revenue growth and cost efficiency."
          }
        ],
        realExample: {
          emoji: "🛒",
          text: "**Ocado** reported revenues of over 2.8 billion pounds in 2023 but still recorded a net loss due to heavy investment in technology and warehouse infrastructure. This shows that a business can generate substantial revenue yet remain unprofitable when costs — particularly fixed costs from expansion — outstrip income."
        },
        misconception: "Students write that making a loss means the business is failing. Many successful businesses make losses in their early years while they invest in growth and build market share. Instead write: a loss means costs currently exceed revenue, but it may be a deliberate strategy during a period of investment rather than a sign of business failure.",
        examMatters: "Profit calculation questions require you to show the formula, substitute figures accurately and state whether the result is a profit or loss. Examiners also ask you to suggest ways to improve profit — always consider both the revenue side and the cost side.",
        recall: {
          type: "fillin",
          prompt: "Complete the profit logic:",
          template: ["Profit = Total ___ minus Total Costs", "Gross profit deducts only cost of ___", "Net profit deducts all expenses including overheads and ___"],
          answers: ["Revenue", "sales", "tax"],
          hints: ["Rev____", "sal__", "ta_"]
        }
      }
    ],
    takeaway: [
      "Total revenue = Price x Quantity; it is income before any costs.",
      "Fixed costs stay constant with output; variable costs change per unit.",
      "Profit = Revenue minus Costs; a loss is not always a sign of failure."
    ]
  },

  /* ═══ Block 2: Sales Forecasting ═══ */
  {
    title: "Sales Forecasting",
    quizIndices: [1],
    sections: [
      {
        id: "purpose-of-sales-forecasting",
        title: "Purpose of Sales Forecasting",
        keyIdea: "Sales forecasting predicts future sales based on past data and market analysis, helping businesses plan production, staffing and cash flow.",
        body: [
          {
            type: "paragraph",
            text: "A **sales forecast** is an estimate of the value or volume of sales a business expects to achieve over a future period. It forms the foundation of most business planning — production schedules, staffing levels, raw material orders and cash flow projections all depend on how many units the business expects to sell."
          },
          {
            type: "flow",
            steps: ["Analyse past sales data", "Consider market trends", "Produce sales forecast"],
            result: "Informed planning for production, staffing and finance",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "Forecasts can be based on **quantitative methods** such as extrapolation of past trends, or **qualitative methods** such as expert opinion and market research. Most businesses use a combination, adjusting historical data with judgements about future market conditions."
          },
          {
            type: "paragraph",
            text: "The accuracy of a sales forecast depends on the quality of the data, the stability of the market and the time horizon. Short-term forecasts in stable markets tend to be more accurate than long-term forecasts in dynamic or new markets where there is little historical data."
          }
        ],
        realExample: {
          emoji: "🧥",
          text: "**Zara** uses real-time sales data from its stores to forecast demand for each product line on a weekly basis. This short-cycle forecasting allows Zara to adjust production within two weeks, minimising unsold stock and ensuring popular items are replenished quickly across its global store network."
        },
        misconception: "Students treat sales forecasts as accurate predictions of the future. Forecasts are estimates based on assumptions that may prove wrong, especially in volatile markets. Instead write: a sales forecast is a best estimate that carries inherent uncertainty, and its usefulness depends on the quality of underlying data and assumptions.",
        examMatters: "When evaluating sales forecasts, examiners want you to discuss factors that affect accuracy — market stability, data quality and time horizon. Simply stating the forecast is useful without questioning its reliability will limit your marks.",
        recall: {
          type: "fillin",
          prompt: "Complete the sales forecasting logic:",
          template: ["A sales forecast estimates future sales ___ or volume", "It helps plan production, staffing and ___ flow", "Accuracy depends on data quality and market ___"],
          answers: ["value", "cash", "stability"],
          hints: ["val__", "cas_", "sta______"]
        }
      },
      {
        id: "factors-affecting-forecasts",
        title: "Factors Affecting Sales Forecasts",
        keyIdea: "Consumer trends, economic conditions, competitor actions and seasonal patterns can all cause actual sales to differ significantly from forecasts.",
        body: [
          {
            type: "paragraph",
            text: "Several external and internal factors can cause actual sales to deviate from the forecast. **Consumer trends** shift as tastes, fashions and social attitudes change. A product that was growing steadily may see demand collapse if consumer preferences move in a different direction."
          },
          {
            type: "paragraph",
            text: "**Economic conditions** such as changes in income levels, interest rates and unemployment directly affect consumer spending power. During a recession, demand for non-essential products falls sharply, making forecasts based on boom-time data unreliable."
          },
          {
            type: "flow",
            steps: ["Competitor launches rival product", "Market share is redistributed", "Original forecast becomes inaccurate"],
            result: "Actual sales fall below the forecast",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "**Seasonal variations** are more predictable — ice cream sales peak in summer, toy sales surge before Christmas. Businesses that understand seasonal patterns can adjust their forecasts accordingly, but unexpected weather or events can still disrupt even well-established seasonal trends."
          }
        ],
        realExample: {
          emoji: "📱",
          text: "**Huawei** saw its European smartphone sales forecasts become worthless after US government sanctions restricted its access to Google services in 2019. No amount of historical sales data could have predicted this political intervention, demonstrating how external shocks can render even sophisticated forecasts obsolete overnight."
        },
        misconception: "Students list factors that affect forecasts without explaining how each factor specifically impacts sales. Naming a factor is not analysis — you must explain the mechanism. Instead write: identify the specific factor, explain how it changes consumer behaviour or market conditions, and show why this makes the original forecast inaccurate.",
        examMatters: "Examiners may give you a scenario where a forecast has proven inaccurate and ask you to explain why. Link specific factors to the deviation — do not give a generic list. If the case mentions a new competitor, explain how that competitor's entry redistributed market share.",
        recall: {
          type: "reorder",
          prompt: "Order these from most to least predictable impact on forecasts:",
          correctOrder: ["Seasonal demand patterns", "Gradual changes in consumer trends", "Economic recession reducing spending power", "Sudden competitor entry or political shock"],
          shuffled: [3, 1, 0, 2]
        }
      }
    ],
    takeaway: [
      "Sales forecasts underpin production, staffing and cash flow planning.",
      "Forecasts are estimates, not facts — accuracy depends on data and stability.",
      "External shocks like competitor actions or recessions can invalidate forecasts."
    ]
  },

  /* ═══ Block 3: Break-Even Analysis ═══ */
  {
    title: "Break-Even Analysis",
    quizIndices: [2],
    practiceIndices: [0],
    sections: [
      {
        id: "break-even-calculation",
        title: "Break-Even Calculation",
        keyIdea: "The break-even point is the output level where total revenue exactly equals total costs, meaning the business makes neither a profit nor a loss.",
        body: [
          {
            type: "paragraph",
            text: "The **break-even point** (BEP) is the level of output at which total revenue equals total costs. At this point, the business covers all its fixed and variable costs but earns zero profit. The formula is: **BEP = Fixed Costs / (Selling Price per unit - Variable Cost per unit)**."
          },
          {
            type: "paragraph",
            text: "The denominator — selling price minus variable cost — is called the **contribution per unit**. Each unit sold contributes this amount toward covering fixed costs. Once enough units have been sold to cover all fixed costs, every additional unit sold generates pure profit."
          },
          {
            type: "flow",
            steps: ["Calculate contribution per unit", "Divide fixed costs by contribution", "Result is the break-even output"],
            result: "Business knows the minimum sales needed to avoid a loss",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "For example, if fixed costs are 10,000 pounds, the selling price is 20 pounds and the variable cost is 12 pounds, the contribution per unit is 8 pounds. BEP = 10,000 / 8 = 1,250 units. The business must sell at least 1,250 units to break even."
          }
        ],
        realExample: {
          emoji: "🍕",
          text: "**Domino's Pizza** franchisees calculate their break-even point before signing a franchise agreement to ensure the local market can support enough sales. With high fixed costs from rent, equipment and franchise fees, a typical outlet might need to sell 200 pizzas per day to break even, guiding location decisions."
        },
        misconception: "Students think break-even is the target for a business. Breaking even means zero profit — it is the minimum acceptable level of sales, not the goal. Instead write: break-even shows the minimum output needed to cover costs, but the business aims to sell well above this level to generate a worthwhile profit.",
        examMatters: "Break-even calculation questions are very common. Always show the formula, identify contribution per unit, and present the final answer with units. If asked to show break-even on a chart, label both axes, plot the TR and TC lines, and mark the break-even point clearly.",
        recall: {
          type: "fillin",
          prompt: "Complete the break-even formula:",
          template: ["BEP = Fixed Costs / ___ per unit", "Contribution = Selling Price minus ___ Cost per unit", "At break-even the business makes zero ___"],
          answers: ["Contribution", "Variable", "profit"],
          hints: ["Con__________", "Var_____", "pro___"]
        }
      },
      {
        id: "break-even-charts",
        title: "Break-Even Charts",
        keyIdea: "A break-even chart plots total revenue and total costs against output, visually showing the break-even point, profit zone and loss zone.",
        body: [
          {
            type: "paragraph",
            text: "A **break-even chart** is a graph with output (units) on the horizontal axis and costs/revenue (pounds) on the vertical axis. Three lines are plotted: **fixed costs** (a horizontal line), **total costs** (starting at fixed costs and rising with output), and **total revenue** (starting at zero and rising with output)."
          },
          {
            type: "paragraph",
            text: "The point where the total revenue line crosses the total cost line is the **break-even point**. To the left of this intersection, the business makes a **loss** because costs exceed revenue. To the right, it makes a **profit** because revenue exceeds costs."
          },
          {
            type: "flow",
            steps: ["Plot FC, TC and TR lines", "Identify the intersection point", "Read break-even output from x-axis"],
            result: "Visual representation of profit, loss and margin of safety",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "The **margin of safety** is the difference between the actual or forecast output and the break-even output. A large margin of safety means the business can absorb a significant fall in sales before it starts making a loss. It is calculated as: **Margin of Safety = Actual Output - Break-even Output**."
          }
        ],
        realExample: {
          emoji: "🎭",
          text: "**The National Theatre** uses break-even charts when planning new productions to determine how many seats must be sold per performance to cover production costs. A West End show with high fixed costs from set design and marketing might need 75% seat occupancy to break even, making the margin of safety critical to decision-making."
        },
        misconception: "Students draw break-even charts with the total cost line starting at zero. Total costs include fixed costs, so the TC line must start at the level of fixed costs on the y-axis, not at the origin. Instead write: the total cost line begins at the fixed cost level because these costs exist even when output is zero.",
        examMatters: "Break-even chart questions require precise drawing. Label both axes with correct units, start the TC line at fixed costs not zero, and clearly mark the break-even point with dotted lines to both axes. The margin of safety should be shown as a labelled distance on the x-axis.",
        recall: {
          type: "reorder",
          prompt: "Order the steps to draw a break-even chart:",
          correctOrder: ["Draw axes: output on x-axis, costs/revenue on y-axis", "Plot the fixed cost line as a horizontal line", "Plot total costs starting from fixed costs, rising with output", "Plot total revenue from the origin, mark the intersection as BEP"],
          shuffled: [2, 0, 3, 1]
        }
      },
      {
        id: "break-even-evaluation",
        title: "Evaluating Break-Even Analysis",
        keyIdea: "Break-even analysis is a useful planning tool, but it relies on assumptions about constant prices and costs that rarely hold in real business situations.",
        body: [
          {
            type: "paragraph",
            text: "Break-even analysis offers several clear benefits. It tells the business the **minimum output** needed to avoid a loss, helps with **pricing decisions** by showing how price changes affect the break-even point, and provides a simple visual tool that is easy for non-financial managers to understand."
          },
          {
            type: "paragraph",
            text: "However, it has significant limitations. It assumes the selling price is **constant at all output levels**, which ignores the reality that businesses often offer discounts for bulk purchases. It also assumes **variable costs per unit are constant**, ignoring economies of scale or rising input prices."
          },
          {
            type: "flow",
            steps: ["Assumes constant price and costs", "Real-world prices and costs fluctuate"],
            result: "Break-even output is an estimate, not a precise figure",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "Furthermore, break-even analysis only considers **costs and revenue** — it ignores other factors such as cash flow timing, market conditions and competitor behaviour. A business might sell above break-even but still fail if customers pay late and cash runs out before costs are due."
          }
        ],
        realExample: {
          emoji: "🏭",
          text: "**Tata Steel UK** found that its break-even analysis significantly underestimated the true break-even point when energy prices surged in 2022. The assumption of constant variable costs proved dangerously optimistic, demonstrating how external cost shocks can invalidate break-even calculations."
        },
        misconception: "Students present break-even analysis as if it gives a definitive answer. It is a model based on simplifying assumptions, not a precise prediction. Instead write: break-even analysis provides a useful estimate for planning, but its accuracy is limited by the assumptions of constant prices, costs and the exclusion of cash flow timing.",
        examMatters: "Evaluation of break-even analysis is a common higher-mark question. Examiners want you to discuss both strengths and limitations, and to explain how the assumptions limit its real-world usefulness. A one-sided answer — either entirely positive or entirely negative — will score poorly.",
        recall: {
          type: "fillin",
          prompt: "Complete the break-even evaluation:",
          template: ["Break-even assumes selling price is ___ at all output levels", "It ignores ___ of scale that reduce unit costs at high output", "It does not account for cash flow ___ issues"],
          answers: ["constant", "economies", "timing"],
          hints: ["con_____", "eco______", "tim___"]
        }
      }
    ],
    takeaway: [
      "BEP = Fixed Costs / Contribution per unit; it shows minimum viable output.",
      "Break-even charts visually show profit zones, loss zones and margin of safety.",
      "The model assumes constant prices and costs, which limits real-world accuracy."
    ]
  },

  /* ═══ Block 4: Cash-Flow Forecasting ═══ */
  {
    title: "Cash-Flow Forecasting",
    quizIndices: [3],
    practiceIndices: [1],
    sections: [
      {
        id: "cash-flow-basics",
        title: "Cash Flow Basics",
        keyIdea: "Cash flow is the movement of money into and out of a business, and running out of cash is the most common reason small businesses fail.",
        body: [
          {
            type: "paragraph",
            text: "**Cash flow** refers to the actual movement of money into (**cash inflows**) and out of (**cash outflows**) a business over a period of time. Cash inflows come from sales revenue, loans, investment and asset sales. Cash outflows include payments for raw materials, wages, rent, loan repayments and tax."
          },
          {
            type: "flow",
            steps: ["Cash inflows arrive from sales and investment", "Cash outflows leave for costs and debts", "Net cash flow = Inflows minus Outflows"],
            result: "Positive net cash flow means more came in than went out",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "The critical distinction is between **cash flow** and **profit**. A business can be profitable on paper but still run out of cash if customers pay late or if large bills are due before revenue arrives. Cash flow is about **timing** — when money actually enters and leaves the bank account."
          },
          {
            type: "paragraph",
            text: "Poor cash flow management is the number one cause of small business failure. Even growing businesses can fail if they expand faster than their cash inflows can support, a problem known as **overtrading**."
          }
        ],
        realExample: {
          emoji: "🏗️",
          text: "**Carillion**, the UK construction giant, collapsed in 2018 despite having billions in contracted revenue. The company's cash flow was devastated by late-paying government contracts and aggressive use of supplier payment terms, proving that even large, profitable-looking companies can fail when cash runs out."
        },
        misconception: "Students equate profit with cash flow, assuming a profitable business always has cash available. Profit is an accounting measure recorded when a sale is made, but cash only flows when payment is actually received. Instead write: profit records revenue when earned, but cash flow tracks when money actually moves — a business can be profitable yet cash-poor.",
        examMatters: "The distinction between profit and cash flow is a favourite exam topic. Examiners reward students who can explain with an example why a profitable business might face a cash crisis — for instance, when customers take 90 days to pay but suppliers demand payment in 30 days.",
        recall: {
          type: "fillin",
          prompt: "Complete the cash flow logic:",
          template: ["Net cash flow = Cash inflows minus Cash ___", "Cash flow is about the ___ of money movements", "A profitable business can still fail if it runs out of ___"],
          answers: ["outflows", "timing", "cash"],
          hints: ["out_____", "tim___", "cas_"]
        }
      },
      {
        id: "cash-flow-forecasts",
        title: "Cash-Flow Forecasts",
        keyIdea: "A cash-flow forecast predicts monthly inflows and outflows to identify periods when the business may need additional finance to avoid running out of cash.",
        body: [
          {
            type: "paragraph",
            text: "A **cash-flow forecast** is a financial document that estimates the expected cash inflows and outflows for each month over a future period, typically 12 months. It shows the **net cash flow** for each month and the **cumulative closing balance** — the total cash position at the end of each month."
          },
          {
            type: "paragraph",
            text: "The forecast allows managers to identify months where cash outflows are expected to exceed inflows, creating a negative net cash flow. By spotting these shortfalls in advance, the business can arrange finance — such as an overdraft — before the crisis hits."
          },
          {
            type: "flow",
            steps: ["Estimate monthly inflows and outflows", "Calculate net cash flow per month", "Identify months with negative balances"],
            result: "Arrange finance in advance to cover shortfalls",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "Like all forecasts, cash-flow predictions are only as reliable as the assumptions behind them. If sales are overestimated or costs are underestimated, the forecast may paint a misleadingly positive picture. Regular comparison of forecast versus actual figures allows the business to adjust its plans."
          }
        ],
        realExample: {
          emoji: "🌾",
          text: "**UK farming businesses** rely heavily on cash-flow forecasts because their revenue is seasonal — harvest income arrives in late summer, but costs such as seed, fertiliser and machinery run throughout the year. Without accurate forecasting, a farm could run out of cash in spring just when planting costs are highest."
        },
        misconception: "Students confuse a cash-flow forecast with an income statement. The income statement shows revenue and costs for a period, while the cash-flow forecast tracks when cash physically enters and leaves the bank account. Instead write: a cash-flow forecast focuses on the timing of actual cash movements, not on when revenue is earned or costs are incurred in accounting terms.",
        examMatters: "Cash-flow forecast questions often provide a partially completed table and ask you to fill in missing figures. Practise the structure: opening balance + net cash flow = closing balance. The closing balance of one month becomes the opening balance of the next.",
        recall: {
          type: "reorder",
          prompt: "Order the cash-flow forecast calculation steps:",
          correctOrder: ["Start with the opening cash balance for the month", "Add all expected cash inflows for the month", "Subtract all expected cash outflows for the month", "The result is the closing balance, carried forward as next month's opening"],
          shuffled: [3, 1, 0, 2]
        }
      },
      {
        id: "improving-cash-flow",
        title: "Improving Cash Flow",
        keyIdea: "Businesses can improve cash flow by speeding up inflows, delaying outflows, or securing short-term finance to bridge timing gaps.",
        body: [
          {
            type: "paragraph",
            text: "When a business identifies a potential cash flow problem, it has several strategies available. On the **inflow side**, it can offer early payment discounts to customers, chase overdue invoices more aggressively, demand deposits on large orders, or switch from credit sales to cash sales."
          },
          {
            type: "paragraph",
            text: "On the **outflow side**, the business can negotiate longer payment terms with suppliers, lease equipment instead of buying it outright, reduce stockholding to free up cash tied up in inventory, or delay non-essential spending until cash flow improves."
          },
          {
            type: "flow",
            steps: ["Speed up customer payments", "Delay supplier payments", "Reduce cash tied in stock"],
            result: "More cash available when the business needs it most",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "Each method has trade-offs. Chasing customers aggressively may damage relationships. Delaying supplier payments may lead to worse terms or loss of supply. The business must balance cash flow improvement against maintaining good stakeholder relationships."
          }
        ],
        realExample: {
          emoji: "🛒",
          text: "**Tesco** famously improved its cash flow by negotiating extended payment terms with suppliers — paying them after 30 to 90 days while receiving cash from customers at the point of sale. This created a substantial cash float that Tesco could invest, though it placed significant pressure on smaller suppliers who needed earlier payment."
        },
        misconception: "Students suggest borrowing as the first solution to cash flow problems. Borrowing adds interest costs and future outflows, potentially worsening the problem long-term. Instead write: improving cash flow should first focus on managing the timing of existing inflows and outflows before resorting to additional borrowing.",
        examMatters: "When recommending ways to improve cash flow, examiners want you to consider the impact on other stakeholders. Delaying supplier payments may damage the supply relationship. Always evaluate the trade-offs, not just the cash flow benefit.",
        recall: {
          type: "fillin",
          prompt: "Complete the cash flow improvement logic:",
          template: ["Speed up inflows by offering early payment ___ to customers", "Delay outflows by negotiating longer ___ terms with suppliers", "Reduce cash tied up in ___ by ordering smaller quantities"],
          answers: ["discounts", "payment", "stock"],
          hints: ["dis______", "pay____", "sto__"]
        }
      }
    ],
    takeaway: [
      "Cash flow is about timing, not profit — profitable firms can run out of cash.",
      "Forecasts identify months when extra finance is needed before a crisis hits.",
      "Improve cash flow by speeding inflows and delaying outflows, but mind the trade-offs."
    ]
  },

  /* ═══ Block 5: Budgets ═══ */
  {
    title: "Budgets",
    quizIndices: [4],
    sections: [
      {
        id: "purpose-of-budgets",
        title: "Purpose of Budgets",
        keyIdea: "A budget is a financial plan that sets spending limits and revenue targets for a future period, providing a benchmark against which actual performance is measured.",
        body: [
          {
            type: "paragraph",
            text: "A **budget** is a financial target or plan for a given period, setting out the expected income and expenditure for a department, project or the entire business. Budgets translate strategic objectives into concrete financial targets — they turn \"we want to grow sales\" into \"we plan to spend 50,000 pounds on marketing to generate 200,000 pounds of revenue.\""
          },
          {
            type: "flow",
            steps: ["Set financial targets for the period", "Allocate resources to departments", "Monitor actual vs budget monthly"],
            result: "Controlled spending and clear accountability",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "Budgets serve several purposes. They **control spending** by setting limits, **motivate managers** by giving them targets, **coordinate activities** across departments, and provide a basis for **performance evaluation**. A manager who delivers results within budget is clearly performing well."
          },
          {
            type: "paragraph",
            text: "However, budgets can also be restrictive. If set too tightly, they may discourage initiative and risk-taking. Managers may focus on staying within budget rather than pursuing opportunities that require additional spending but would generate higher returns."
          }
        ],
        realExample: {
          emoji: "🎓",
          text: "**UK state schools** operate under strict annual budgets set by local authorities and central government funding. Head teachers must allocate fixed budgets across staffing, resources and maintenance, making difficult trade-offs when costs rise faster than budget allocations allow."
        },
        misconception: "Students assume budgets are always accurate predictions of what will happen. A budget is a plan and a target, not a forecast of actual results. Instead write: a budget sets out what the business plans to spend and earn, but actual results will almost always differ — the value lies in comparing actual against budget to identify and respond to variances.",
        examMatters: "Examiners often ask about the benefits and drawbacks of budgeting. A balanced answer discusses how budgets aid planning and control while also noting they can be inflexible and may become outdated in rapidly changing markets. Always link your answer to the business context.",
        recall: {
          type: "fillin",
          prompt: "Complete the budgeting logic:",
          template: ["A budget sets ___ limits and revenue targets for a period", "Budgets help control spending and ___ managers with targets", "The value lies in comparing actual results against the ___"],
          answers: ["spending", "motivate", "budget"],
          hints: ["spe_____", "mot_____", "bud___"]
        }
      },
      {
        id: "variance-analysis",
        title: "Variance Analysis",
        keyIdea: "A variance is the difference between a budgeted figure and the actual figure, classified as favourable if it improves profit or adverse if it worsens it.",
        body: [
          {
            type: "paragraph",
            text: "**Variance analysis** compares actual financial performance against the budget. A **favourable variance** occurs when actual results are better than budgeted — for example, revenue higher than expected or costs lower than expected. An **adverse variance** is the opposite — lower revenue or higher costs than planned."
          },
          {
            type: "flow",
            steps: ["Compare actual figures to budget", "Identify favourable or adverse variances", "Investigate causes of significant variances"],
            result: "Management action to correct problems or replicate success",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "The real value of variance analysis is not just identifying the difference but **investigating why** it occurred. An adverse cost variance might reveal waste in production, unexpected price increases from suppliers, or poor stock management. A favourable sales variance might reflect a successful marketing campaign worth repeating."
          },
          {
            type: "paragraph",
            text: "Managers should focus on **significant variances** rather than investigating every small difference. Setting a threshold — for example, investigating any variance greater than 5% — allows managers to focus their time where it matters most."
          }
        ],
        realExample: {
          emoji: "🏥",
          text: "**NHS trusts** use variance analysis monthly to compare actual spending against departmental budgets. A hospital that discovers a 15% adverse variance in agency staffing costs can investigate whether it is caused by higher-than-expected sickness absence and take corrective action before the budget is exhausted."
        },
        misconception: "Students assume a favourable variance is always good. A favourable cost variance might mean the business underspent on essential maintenance or training, which could lead to bigger problems later. Instead write: favourable variances are not automatically positive — underspending may indicate neglected investment that harms the business in the long run.",
        examMatters: "Variance analysis questions typically provide budget and actual figures and ask you to calculate and interpret the variances. Always state whether each variance is favourable or adverse and explain a possible cause. Examiners reward students who go beyond the calculation to analyse why the variance occurred.",
        recall: {
          type: "reorder",
          prompt: "Order the variance analysis process:",
          correctOrder: ["Set the budget targets for the period", "Record actual income and expenditure as the period progresses", "Calculate the variance between budget and actual figures", "Investigate significant variances and take corrective action"],
          shuffled: [2, 0, 3, 1]
        }
      }
    ],
    takeaway: [
      "Budgets set spending limits and revenue targets for planning and control.",
      "Favourable variances improve profit; adverse variances worsen it.",
      "Investigate significant variances to find causes and take corrective action."
    ]
  }

];

/* ── 3. VALIDATION ──────────────────────────────────────────────────────────
   Run automatically before pushing. Catches common writing-rule violations.
   ─────────────────────────────────────────────────────────────────────────── */

function validate(content) {
  const errors = [];
  const ids = new Set();

  content.forEach((block, bi) => {
    const bLabel = `Block ${bi + 1} "${block.title}"`;

    if (!block.title) errors.push(`${bLabel}: missing title`);
    if (!Array.isArray(block.sections) || block.sections.length === 0)
      errors.push(`${bLabel}: sections[] must be a non-empty array`);
    if (!Array.isArray(block.takeaway) || block.takeaway.length < 3)
      errors.push(`${bLabel}: takeaway[] must have at least 3 items`);

    block.takeaway?.forEach((t, ti) => {
      if (t.length > 100) errors.push(`${bLabel} takeaway[${ti}]: ${t.length} chars (max 100)`);
    });

    block.sections?.forEach((sec, si) => {
      const sLabel = `${bLabel} > Section ${si + 1} "${sec.title}"`;

      if (!sec.id) errors.push(`${sLabel}: missing id`);
      if (ids.has(sec.id)) errors.push(`${sLabel}: duplicate id "${sec.id}"`);
      ids.add(sec.id);

      if (!sec.title) errors.push(`${sLabel}: missing title`);

      if (!sec.keyIdea) {
        errors.push(`${sLabel}: missing keyIdea`);
      } else {
        if (sec.keyIdea.length > 180)
          errors.push(`${sLabel}: keyIdea is ${sec.keyIdea.length} chars (max 180)`);
        if (sec.keyIdea.includes('**'))
          errors.push(`${sLabel}: keyIdea must not contain **bold** — it is rendered plain`);
      }

      if (!Array.isArray(sec.body) || sec.body.length === 0)
        errors.push(`${sLabel}: body[] must be a non-empty array`);

      sec.body?.forEach((b, bi2) => {
        if (!b.type) errors.push(`${sLabel} body[${bi2}]: missing type`);
        if (b.type === 'flow') {
          if (!Array.isArray(b.steps) || b.steps.length < 2)
            errors.push(`${sLabel} body[${bi2}]: flow needs at least 2 steps`);
          if (b.steps?.length > 4)
            errors.push(`${sLabel} body[${bi2}]: flow has ${b.steps.length} steps (max 4)`);
          if (!['good', 'bad', 'neutral'].includes(b.resultType))
            errors.push(`${sLabel} body[${bi2}]: flow resultType must be "good", "bad", or "neutral"`);
        }
      });

      if (!sec.realExample?.text)
        errors.push(`${sLabel}: missing realExample.text`);
      if (!sec.misconception)
        errors.push(`${sLabel}: missing misconception`);
      if (!sec.examMatters)
        errors.push(`${sLabel}: missing examMatters`);
    });
  });

  return errors;
}

/* ── 4. PUSH ─────────────────────────────────────────────────────────────── */

async function run() {
  console.log(`\nValidating content for "${SECTION_SLUG}"...`);
  const errors = validate(CONTENT);

  if (errors.length > 0) {
    console.error('\n❌ Validation failed — fix these before pushing:\n');
    errors.forEach(e => console.error(`  • ${e}`));
    process.exit(1);
  }
  console.log(`✓ Validation passed — ${CONTENT.length} blocks, ${CONTENT.reduce((n, b) => n + b.sections.length, 0)} sections\n`);

  // Find the section record (sections.id IS the slug)
  const { data: section, error: secErr } = await supabase
    .from('sections')
    .select('id')
    .eq('id', SECTION_SLUG)
    .single();

  if (secErr || !section) {
    console.error(`❌ Section "${SECTION_SLUG}" not found in ${SUBJECT_ID} sections table`);
    console.error(secErr?.message || '(no error detail)');
    process.exit(1);
  }

  // Update section_content
  const { error } = await supabase
    .from('section_content')
    .update({ data: CONTENT })
    .eq('section_id', section.id);

  if (error) {
    console.error('❌ Supabase error:', error.message);
    process.exit(1);
  }

  console.log(`✅ "${SECTION_SLUG}" updated successfully`);
  console.log(`   ${CONTENT.length} blocks · ${CONTENT.reduce((n, b) => n + b.sections.length, 0)} sections · ${CONTENT.reduce((n, b) => n + b.takeaway.length, 0)} takeaway items`);
}

run();
