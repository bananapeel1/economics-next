/**
 * SECTION UPGRADE — Managing Finance (Business 2)
 * ==========================================================
 * Edexcel IAL Business Unit 2
 * Run with: node scripts/upgrade-content-business-managing-finance.mjs
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL     || 'https://trweeckuswgkenckeqfb.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);

/* ── 1. SETTINGS ──────────────────────────────────────────────────────────── */

const SECTION_SLUG = 'managing-finance';
const SUBJECT_ID   = 'business';

/* ── 2. CONTENT ───────────────────────────────────────────────────────────── */

const CONTENT = [

  /* ═══ Block 1: Understanding Profit ═══ */
  {
    title: "Understanding Profit",
    quizIndices: [0],
    sections: [
      {
        id: "gross-profit",
        title: "Gross Profit",
        keyIdea: "Gross profit measures how much a business earns from its core trading activity after deducting only the direct costs of making or buying the goods sold.",
        body: [
          {
            type: "paragraph",
            text: "**Gross profit** is the profit a business makes from its core trading activity — buying or making goods and selling them. It is calculated as: **Gross Profit = Revenue - Cost of Sales**. Cost of sales includes the direct costs of producing or purchasing the goods that were sold during the period."
          },
          {
            type: "flow",
            steps: ["Revenue from selling goods", "Minus cost of sales (direct costs)", "Equals gross profit"],
            result: "Shows profitability of the core trading activity",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "Gross profit tells you how effectively the business is managing its direct production or purchasing costs relative to its sales revenue. A rising gross profit suggests the business is either increasing prices, reducing direct costs, or selling more. A falling gross profit signals problems with pricing or cost control."
          },
          {
            type: "paragraph",
            text: "The **gross profit margin** expresses gross profit as a percentage of revenue: **GPM = (Gross Profit / Revenue) x 100**. This ratio allows meaningful comparison between businesses of different sizes or the same business over different time periods."
          }
        ],
        realExample: {
          emoji: "👟",
          text: "**Nike** consistently achieves a gross profit margin above 44%, meaning for every dollar of revenue, Nike keeps 44 cents after paying for manufacturing. This high margin reflects Nike's brand power — it can charge premium prices while outsourcing production to lower-cost manufacturers."
        },
        misconception: "Students confuse gross profit with net profit, forgetting that gross profit has not yet accounted for overheads like rent, marketing and administration. A high gross profit does not guarantee overall profitability. Instead write: gross profit only deducts cost of sales — the business must still cover all operating expenses before it can claim a net profit.",
        examMatters: "Gross profit margin calculation questions require you to show the formula, substitute correctly and express the answer as a percentage. Examiners also ask you to interpret the result — compare it to previous years or competitors and explain what it reveals about pricing and cost management.",
        recall: {
          type: "fillin",
          prompt: "Complete the gross profit logic:",
          template: ["Gross Profit = Revenue minus Cost of ___", "Cost of sales includes only ___ costs of production", "Gross profit margin = (Gross Profit / Revenue) x ___"],
          answers: ["Sales", "direct", "100"],
          hints: ["Sal__", "dir___", "10_"]
        }
      },
      {
        id: "net-profit",
        title: "Net Profit",
        keyIdea: "Net profit is the true bottom-line profit remaining after all expenses, overheads, interest and tax have been deducted from revenue.",
        body: [
          {
            type: "paragraph",
            text: "**Net profit** (also called operating profit or profit for the year, depending on the level of deduction) is what remains after all business expenses have been subtracted from revenue. The formula is: **Net Profit = Gross Profit - Expenses (overheads, interest, tax)**. This is the true measure of how much the business actually earns."
          },
          {
            type: "flow",
            steps: ["Start with gross profit", "Subtract overheads and expenses", "Subtract interest and tax"],
            result: "Net profit — the actual earnings available to owners",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "The **net profit margin** is calculated as: **NPM = (Net Profit / Revenue) x 100**. A business with high revenue but a low net profit margin is spending too much on overheads relative to its sales. Comparing the gross and net margins reveals how much of the gross profit is being consumed by operating expenses."
          },
          {
            type: "paragraph",
            text: "Improving net profit requires either increasing gross profit or reducing expenses. Common strategies include renegotiating rent, reducing energy consumption, streamlining administration, cutting non-essential marketing spend, or refinancing debt at lower interest rates."
          }
        ],
        realExample: {
          emoji: "🛒",
          text: "**Amazon** operated for years with extremely thin net profit margins — often below 3% — despite generating hundreds of billions in revenue. Amazon deliberately reinvested almost all gross profit into warehouse expansion, technology and delivery infrastructure, prioritising growth over short-term profitability."
        },
        misconception: "Students assume a business with higher revenue always has higher net profit. A business with 10 million pounds in revenue and 9.5 million in costs makes less profit than one with 1 million in revenue and 500,000 in costs. Instead write: net profit depends on the gap between revenue and total costs, not on the absolute size of revenue.",
        examMatters: "Net profit margin questions test your ability to calculate, interpret and compare. Examiners may ask why the net margin is significantly lower than the gross margin — your answer should identify specific overheads that are consuming the gross profit.",
        recall: {
          type: "reorder",
          prompt: "Order the profit calculation from top to bottom of income statement:",
          correctOrder: ["Revenue (total sales income)", "Minus cost of sales = Gross Profit", "Minus operating expenses = Operating Profit", "Minus interest and tax = Net Profit"],
          shuffled: [2, 0, 3, 1]
        }
      },
      {
        id: "ways-to-improve-profit",
        title: "Ways to Improve Profit",
        keyIdea: "Profit can be improved by increasing revenue through higher prices or sales volume, or by reducing costs through efficiency gains and better purchasing.",
        body: [
          {
            type: "paragraph",
            text: "There are two fundamental approaches to improving profit: **increasing revenue** or **reducing costs**. On the revenue side, a business can raise prices (if demand is inelastic enough to maintain volume), sell more units through better marketing, enter new markets, or develop new product lines."
          },
          {
            type: "paragraph",
            text: "On the cost side, the business can negotiate better deals with suppliers, switch to cheaper materials, improve labour productivity, adopt more efficient production technology, or reduce waste. The best approach depends on the competitive environment and the business's specific cost structure."
          },
          {
            type: "flow",
            steps: ["Identify whether the issue is revenue or costs", "Choose targeted improvement strategies", "Monitor impact on profit margin"],
            result: "Sustainable improvement in profitability",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "However, every cost-cutting measure carries risks. Switching to cheaper materials may damage product quality and brand reputation. Reducing staff may lower capacity and worsen customer service. Sustainable profit improvement usually requires a balanced approach that maintains quality while improving efficiency."
          }
        ],
        realExample: {
          emoji: "☕",
          text: "**Costa Coffee** improved its profit margins by investing in automated coffee machines that reduced labour costs per cup while maintaining consistency. Simultaneously, Costa raised prices on premium drinks where demand was inelastic, attacking both sides of the profit equation without noticeably reducing customer footfall."
        },
        misconception: "Students recommend cutting costs as the universal solution to poor profitability. Cost-cutting has diminishing returns and can harm the business if taken too far. Instead write: improving profit requires a balanced approach — reducing costs improves margins in the short term, but sustainable profitability depends on maintaining or growing revenue through product quality and customer satisfaction.",
        examMatters: "When asked how a business can improve profit, examiners expect you to consider both revenue and cost strategies and evaluate which is most appropriate for the specific case study. A one-sided answer focusing only on costs or only on revenue will limit your marks.",
        recall: {
          type: "fillin",
          prompt: "Complete the profit improvement logic:",
          template: ["Profit improves by increasing revenue or reducing ___", "Raising prices works best when demand is ___", "Cost-cutting risks damaging product ___ and brand reputation"],
          answers: ["costs", "inelastic", "quality"],
          hints: ["cos__", "ine______", "qua____"]
        }
      }
    ],
    takeaway: [
      "Gross profit deducts only cost of sales; net profit deducts everything.",
      "Net profit margin reveals true profitability relative to revenue.",
      "Improving profit requires balancing revenue growth with cost efficiency."
    ]
  },

  /* ═══ Block 2: Income Statement ═══ */
  {
    title: "Income Statement",
    quizIndices: [1],
    practiceIndices: [0],
    sections: [
      {
        id: "structure-of-income-statement",
        title: "Structure of the Income Statement",
        keyIdea: "The income statement summarises a business's revenue, costs and profit over a period, following a top-down structure from revenue to net profit.",
        body: [
          {
            type: "paragraph",
            text: "The **income statement** (also called the profit and loss account) is a financial document that shows the revenue earned and the costs incurred by a business over a specific period, typically one year. It follows a structured format, starting with revenue at the top and working down through costs to arrive at profit at the bottom."
          },
          {
            type: "subheading",
            text: "Key Lines of the Income Statement"
          },
          {
            type: "bullets",
            items: [
              "**Revenue** — the total income from sales of goods or services.",
              "**Cost of sales** — the direct costs of producing or purchasing the goods sold.",
              "**Gross profit** — revenue minus cost of sales.",
              "**Operating expenses** — indirect costs such as rent, wages, marketing and administration.",
              "**Net profit** — gross profit minus all operating expenses, interest and tax."
            ]
          },
          {
            type: "paragraph",
            text: "The income statement is an essential tool for stakeholders. Shareholders use it to assess profitability and dividend potential. Lenders check it to evaluate the business's ability to service debt. Managers use it to identify cost problems and measure performance against budgets."
          }
        ],
        realExample: {
          emoji: "🛍️",
          text: "**Marks & Spencer** publishes its income statement in its annual report, showing revenue of over 12 billion pounds and detailing how much goes to cost of sales, operating expenses and interest. Analysts scrutinise the statement to assess whether M&S is improving its profit margins year on year."
        },
        misconception: "Students treat the income statement as a snapshot of the business at one point in time. It covers a period — usually a financial year — and shows cumulative revenue and costs over that time. Instead write: the income statement summarises financial performance over a period, unlike the balance sheet which shows the financial position at a single point.",
        examMatters: "Examiners may provide an income statement and ask you to calculate gross profit, net profit or profit margins. Ensure you know the structure from top to bottom and can identify which costs are deducted at each stage. Label your calculations clearly.",
        recall: {
          type: "reorder",
          prompt: "Order the income statement lines from top to bottom:",
          correctOrder: ["Revenue", "Minus cost of sales = Gross Profit", "Minus operating expenses = Operating Profit", "Minus interest and tax = Net Profit for the year"],
          shuffled: [3, 1, 0, 2]
        }
      },
      {
        id: "interpreting-income-statements",
        title: "Interpreting Income Statements",
        keyIdea: "Analysing an income statement over time or against competitors reveals trends in revenue growth, cost control and overall profitability.",
        body: [
          {
            type: "paragraph",
            text: "A single income statement provides limited insight on its own. The real value comes from **comparing over time** (has gross profit margin improved or declined?) and **comparing with competitors** (is this business more or less profitable than its rivals?). These comparisons reveal trends and relative performance."
          },
          {
            type: "paragraph",
            text: "When interpreting, look at the gap between gross and net profit. If gross profit is healthy but net profit is low, the business has an **overhead problem** — it is spending too much on expenses like rent, administration or interest. If gross profit itself is weak, the issue lies in pricing or cost of sales."
          },
          {
            type: "flow",
            steps: ["Compare income statements over multiple periods", "Identify trends in margins and costs", "Diagnose the cause of any changes"],
            result: "Actionable insight for management decision-making",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "You should also consider external factors when interpreting results. A fall in net profit might reflect a deliberate investment in marketing for future growth, or an economic downturn affecting the entire industry. Context matters as much as the numbers themselves."
          }
        ],
        realExample: {
          emoji: "📱",
          text: "**Apple's** income statement shows a gross profit margin consistently above 43%, far higher than Samsung's hardware division at around 35%. This comparison reveals Apple's superior pricing power and brand premium, demonstrating how income statement analysis exposes competitive advantages between rival firms."
        },
        misconception: "Students look only at the bottom line net profit figure without examining the components above it. A rise in net profit could mask a falling gross margin offset by aggressive cost-cutting that may not be sustainable. Instead write: always analyse the full income statement structure — revenue trends, gross margin and expense ratios — not just the final net profit number.",
        examMatters: "Higher-mark questions often present two years of income statement data and ask you to analyse changes. Calculate the margins for both years, identify which line items changed most, and explain possible causes. Simply stating that profit went up or down without analysis will not score well.",
        recall: {
          type: "fillin",
          prompt: "Complete the income statement analysis logic:",
          template: ["Compare income statements over ___ to spot trends", "A gap between gross and net profit signals high ___", "External factors like recession affect ___ across the industry"],
          answers: ["time", "overheads", "profitability"],
          hints: ["tim_", "ove______", "pro___________"]
        }
      }
    ],
    takeaway: [
      "The income statement runs from revenue at the top to net profit at the bottom.",
      "Compare over time and against competitors for meaningful analysis.",
      "A wide gap between gross and net profit signals an overhead problem."
    ]
  },

  /* ═══ Block 3: Liquidity ═══ */
  {
    title: "Liquidity",
    quizIndices: [2],
    practiceIndices: [1],
    sections: [
      {
        id: "understanding-liquidity",
        title: "Understanding Liquidity",
        keyIdea: "Liquidity measures how easily a business can meet its short-term financial obligations using assets that can quickly be converted to cash.",
        body: [
          {
            type: "paragraph",
            text: "**Liquidity** refers to how easily a business can convert its assets into cash to pay short-term debts as they fall due. A **liquid asset** is one that can be quickly converted into cash without significant loss of value — cash itself is the most liquid asset, followed by trade receivables (money owed by customers) and stock."
          },
          {
            type: "paragraph",
            text: "A business with strong liquidity can comfortably pay its suppliers, staff wages, rent and loan repayments on time. A business with poor liquidity may have valuable assets like property or machinery but cannot access cash quickly enough to meet its immediate obligations."
          },
          {
            type: "flow",
            steps: ["Bills fall due for payment", "Business needs liquid assets to pay", "Insufficient liquidity = payment default"],
            result: "Poor liquidity can force even profitable businesses to close",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "It is entirely possible for a business to be **profitable but illiquid** — for example, if it has sold goods on credit and is waiting for customers to pay. The goods are sold, the profit is recorded, but the cash has not yet arrived to pay the business's own bills."
          }
        ],
        realExample: {
          emoji: "🏗️",
          text: "**Carillion** was profitable on paper when it collapsed in 2018, with billions in contracted revenue on its order book. However, it could not convert those future contracts into immediate cash to pay its 30,000 suppliers, demonstrating how a liquidity crisis can destroy even the largest companies."
        },
        misconception: "Students confuse liquidity with profitability, assuming a profitable business must have plenty of cash. Profit is an accounting concept that records revenue when earned, not when cash is received. Instead write: a business can be profitable but illiquid if cash from sales has not yet been collected while bills are already due for payment.",
        examMatters: "Liquidity questions often ask you to explain why a profitable business might face financial difficulties. The answer lies in the timing difference between recording profit and actually receiving cash. Always distinguish between profit (accounting) and cash (actual money in the bank).",
        recall: {
          type: "fillin",
          prompt: "Complete the liquidity logic:",
          template: ["Liquidity measures ability to meet ___ financial obligations", "The most liquid asset is ___ itself", "A business can be profitable but ___ if customers pay late"],
          answers: ["short-term", "cash", "illiquid"],
          hints: ["sho______", "cas_", "ill_____"]
        }
      },
      {
        id: "liquidity-ratios",
        title: "Liquidity Ratios",
        keyIdea: "The current ratio and acid test ratio measure whether a business has enough liquid assets to cover its short-term liabilities.",
        body: [
          {
            type: "paragraph",
            text: "The **current ratio** compares current assets to current liabilities: **Current Ratio = Current Assets / Current Liabilities**. Current assets include cash, trade receivables and stock. Current liabilities include trade payables, short-term loans and overdrafts. A ratio of around 1.5:1 to 2:1 is generally considered healthy."
          },
          {
            type: "paragraph",
            text: "The **acid test ratio** (or quick ratio) is a stricter measure that excludes stock from current assets: **Acid Test = (Current Assets - Stock) / Current Liabilities**. Stock is excluded because it may not be easily or quickly sold at full value. A ratio above 1:1 suggests the business can meet its short-term debts without relying on selling stock."
          },
          {
            type: "flow",
            steps: ["Calculate current or acid test ratio", "Compare to benchmark (1.5:1 or 1:1)", "Identify potential liquidity problems"],
            result: "Early warning of cash flow difficulties",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "A ratio that is too low indicates the business may struggle to pay its debts. However, a ratio that is too high can also be problematic — it may mean the business is holding too much idle cash or too much stock, which could be invested more productively elsewhere."
          }
        ],
        realExample: {
          emoji: "🛒",
          text: "**Tesco** typically operates with a current ratio below 1:1 because supermarkets receive cash from customers immediately but pay suppliers on extended credit terms. This would alarm most industries, but for supermarkets with daily cash inflows, a low current ratio is normal and sustainable."
        },
        misconception: "Students assume a current ratio below 2:1 automatically means the business is in trouble. The ideal ratio varies by industry — supermarkets operate safely below 1:1 because of their rapid cash cycle. Instead write: the ideal current ratio depends on the industry and the nature of the business — what matters is whether the business can reliably meet its obligations as they fall due.",
        examMatters: "Ratio calculation questions require you to show the formula, substitute correctly, and state the ratio in the correct format (e.g. 1.8:1). Then interpret the result — is it above or below the benchmark, and what does this suggest about the business's financial health?",
        recall: {
          type: "reorder",
          prompt: "Order these assets from most to least liquid:",
          correctOrder: ["Cash in the bank", "Trade receivables (money owed by customers)", "Finished goods stock ready for sale", "Raw materials stock awaiting production"],
          shuffled: [2, 0, 3, 1]
        }
      },
      {
        id: "improving-liquidity",
        title: "Improving Liquidity",
        keyIdea: "Businesses improve liquidity by converting assets into cash faster, reducing short-term liabilities, or securing additional short-term finance.",
        body: [
          {
            type: "paragraph",
            text: "If a business identifies a liquidity problem, it has several options. It can **speed up cash collection** by chasing debtors, offering early payment discounts, or requiring upfront deposits. It can **reduce stock levels** by adopting just-in-time inventory management, freeing up cash tied in unsold goods."
          },
          {
            type: "paragraph",
            text: "On the liabilities side, the business can **negotiate longer payment terms** with suppliers to delay outflows, or arrange an **overdraft facility** with the bank to provide a buffer during periods of low liquidity. Selling underused assets is another option for a one-off cash injection."
          },
          {
            type: "flow",
            steps: ["Chase debtors for faster payment", "Reduce stock levels to free cash", "Negotiate extended supplier terms"],
            result: "Improved liquidity position without additional borrowing",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "Each improvement measure has trade-offs. Pressuring debtors for faster payment may damage customer relationships. Reducing stock too aggressively risks running out of products to sell. The business must balance liquidity improvement against maintaining effective operations and good stakeholder relationships."
          }
        ],
        realExample: {
          emoji: "✈️",
          text: "**Ryanair** maintains strong liquidity by collecting customer payments immediately through online booking while delaying payments to suppliers and aircraft lessors. This deliberate cash cycle management gives Ryanair a permanent liquidity advantage that allows it to hold significant cash reserves for strategic opportunities."
        },
        misconception: "Students suggest selling fixed assets like buildings to improve liquidity. While this generates cash, it removes productive capacity the business needs to operate. Instead write: improving liquidity should focus on managing working capital — debtors, creditors and stock — rather than selling the fixed assets the business depends on for generating revenue.",
        examMatters: "When recommending ways to improve liquidity, examiners expect you to consider the practical consequences for the business. Simply listing methods is not enough — explain why each method might or might not work in the given context and what trade-offs the business faces.",
        recall: {
          type: "fillin",
          prompt: "Complete the liquidity improvement logic:",
          template: ["Speed up cash collection by chasing ___ for payment", "Reduce ___ levels to free up cash tied in inventory", "Negotiate longer payment terms with ___ to delay outflows"],
          answers: ["debtors", "stock", "suppliers"],
          hints: ["deb____", "sto__", "sup______"]
        }
      }
    ],
    takeaway: [
      "Liquidity is about having cash when bills are due, not about total profit.",
      "Current ratio includes stock; acid test excludes it for a stricter measure.",
      "Improve liquidity through working capital management, not by selling fixed assets."
    ]
  },

  /* ═══ Block 4: Causes of Business Failure ═══ */
  {
    title: "Causes of Business Failure",
    quizIndices: [3],
    sections: [
      {
        id: "internal-causes-of-failure",
        title: "Internal Causes of Failure",
        keyIdea: "Poor financial management, weak leadership and lack of planning are internal factors within the business's control that frequently lead to failure.",
        body: [
          {
            type: "paragraph",
            text: "**Internal causes** of business failure are factors within the control of the business itself. **Poor cash flow management** is the single most common cause — businesses that fail to monitor when cash comes in and goes out can run out of money even while technically profitable."
          },
          {
            type: "paragraph",
            text: "**Weak leadership and management** leads to poor decision-making, failure to adapt to market changes, and an inability to motivate and retain staff. **Lack of planning** — including inadequate market research, unrealistic financial forecasts, and failure to develop a clear business strategy — leaves the business vulnerable to predictable challenges."
          },
          {
            type: "flow",
            steps: ["Poor cash management or weak planning", "Bills cannot be paid on time", "Suppliers refuse credit, staff leave"],
            result: "Business enters a spiral of decline leading to failure",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "Other internal causes include over-reliance on a single customer or product, failure to control costs, excessive borrowing that creates unsustainable interest payments, and overtrading — where a business grows faster than its cash flow can support."
          }
        ],
        realExample: {
          emoji: "🍴",
          text: "**Jamie Oliver's restaurant chain** collapsed into administration in 2019 owing 83 million pounds, largely due to internal factors including rapid overexpansion, high property costs and failure to adapt menus to changing consumer tastes. Despite the strong personal brand, poor financial management led to the closure of 22 restaurants."
        },
        misconception: "Students blame business failure solely on external factors like recession or competition. While external factors play a role, most business failures have significant internal causes — better management could have avoided or mitigated the problems. Instead write: business failure usually results from a combination of internal weaknesses and external pressures, but internal factors like poor cash management are often the primary cause.",
        examMatters: "Examiners often present a case study of a failing business and ask you to identify and evaluate the causes. Distinguish clearly between internal and external causes, and explain how internal weaknesses made the business more vulnerable to external shocks.",
        recall: {
          type: "fillin",
          prompt: "Complete the internal failure causes logic:",
          template: ["Poor ___ flow management is the most common cause of failure", "Overtrading means growing faster than ___ can support", "Excessive borrowing creates unsustainable ___ payments"],
          answers: ["cash", "cash flow", "interest"],
          hints: ["cas_", "cas_ fl__", "int______"]
        }
      },
      {
        id: "external-causes-of-failure",
        title: "External Causes of Failure",
        keyIdea: "Economic downturns, changing consumer tastes, new competitors and legislative changes are external forces that can overwhelm even well-managed businesses.",
        body: [
          {
            type: "paragraph",
            text: "**External causes** of business failure are factors outside the business's direct control. An **economic downturn** reduces consumer spending power, hitting demand for non-essential products particularly hard. Businesses with high fixed costs and limited cash reserves are most vulnerable during recessions."
          },
          {
            type: "paragraph",
            text: "**Changes in consumer tastes** can make a business's products obsolete if it fails to adapt quickly enough. **New competitors** — especially those with disruptive business models or lower cost bases — can steal market share rapidly. **Changes in legislation** such as new taxes, minimum wage increases or environmental regulations can raise costs unexpectedly."
          },
          {
            type: "flow",
            steps: ["External shock hits the market", "Revenue falls or costs rise suddenly", "Business lacks reserves to survive"],
            result: "Closure if the business cannot adapt quickly enough",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "The businesses most resilient to external shocks are those with diversified revenue streams, strong cash reserves, low debt levels, and a culture of adaptability. External causes are not entirely unpredictable — good planning anticipates potential threats and builds contingency measures."
          }
        ],
        realExample: {
          emoji: "📀",
          text: "**Blockbuster Video** failed primarily because of the external disruption caused by Netflix's streaming model and changing consumer preferences for on-demand entertainment. Despite having 9,000 stores globally at its peak, Blockbuster could not adapt its physical retail model fast enough to survive the shift to digital distribution."
        },
        misconception: "Students describe external causes as unforeseeable events that businesses cannot prepare for. Many external threats — like technological disruption or changing tastes — develop gradually and can be anticipated through market research and strategic planning. Instead write: while external causes are outside direct control, many can be anticipated and prepared for through scenario planning, diversification and maintaining strong cash reserves.",
        examMatters: "When analysing external causes of failure, examiners want you to link specific external factors to their impact on the business in the case study. Do not list generic causes — explain how a particular change in the market environment led to falling revenue or rising costs for this specific business.",
        recall: {
          type: "reorder",
          prompt: "Order these from most gradual to most sudden external threat:",
          correctOrder: ["Gradual shift in consumer tastes over years", "New competitor entering the market over months", "Economic recession reducing demand over quarters", "Government legislation imposing new costs immediately"],
          shuffled: [3, 1, 0, 2]
        }
      },
      {
        id: "why-new-businesses-are-vulnerable",
        title: "Why New Businesses Are Vulnerable",
        keyIdea: "Start-ups face a higher failure rate because they lack trading history, have limited finance, are unproven in the market and depend heavily on the founder.",
        body: [
          {
            type: "paragraph",
            text: "New businesses face a significantly higher risk of failure than established firms. Statistics consistently show that around **60% of UK start-ups fail within the first five years**. This vulnerability stems from several structural disadvantages that established businesses have already overcome."
          },
          {
            type: "paragraph",
            text: "Start-ups typically have **limited access to finance** because they lack a trading history that lenders can assess. They have **no established customer base**, so revenue is uncertain. They may also lack the **management experience** needed to handle the complexity of running a business, from financial planning to people management."
          },
          {
            type: "flow",
            steps: ["No trading history or brand recognition", "Limited finance and cash reserves", "Over-reliance on founder's skills"],
            result: "High vulnerability to any setback in the early years",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "Cash flow is particularly dangerous for start-ups because initial costs — premises, equipment, stock, marketing — must be paid before any revenue is generated. The gap between spending and earning can exhaust limited funds quickly if sales are slower than forecast."
          }
        ],
        realExample: {
          emoji: "🚀",
          text: "**Quibi**, the short-form streaming service, launched in 2020 with nearly 2 billion dollars in funding but shut down after just six months. Despite massive investment, Quibi failed because it misjudged consumer demand, launched during a pandemic that undermined its mobile-commuter positioning, and could not build a subscriber base fast enough to sustain operations."
        },
        misconception: "Students assume that having a good idea is enough to succeed. A strong business concept is necessary but not sufficient — execution, timing, financial management and market conditions all determine whether the idea translates into a viable business. Instead write: business success depends on execution and financial management as much as the quality of the original idea.",
        examMatters: "Examiners often ask why new businesses have a high failure rate. Structure your answer around the specific disadvantages start-ups face — limited finance, no brand, cash flow gaps, inexperience — and explain why each makes the business more vulnerable. Use the case study context to illustrate your points.",
        recall: {
          type: "fillin",
          prompt: "Complete the start-up vulnerability logic:",
          template: ["Around 60% of UK start-ups fail within the first ___ years", "Start-ups lack a ___ history that lenders can assess", "Initial costs must be paid before any ___ is generated"],
          answers: ["five", "trading", "revenue"],
          hints: ["fiv_", "tra____", "rev____"]
        }
      }
    ],
    takeaway: [
      "Poor cash management is the most common internal cause of failure.",
      "External shocks hit hardest when businesses lack reserves and flexibility.",
      "Start-ups are most vulnerable due to limited finance and no track record.",
      "Good planning can anticipate many threats, even external ones."
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
