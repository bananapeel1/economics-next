/**
 * SECTION UPGRADE — External Influences (Business 2)
 * ==========================================================
 * Edexcel IAL Business Unit 2, External Influences
 * Run with: node scripts/upgrade-content-business-external-influences.mjs
 */

import { supabase } from './_db.mjs';

/* ── 1. SETTINGS ──────────────────────────────────────────────────────────── */

const SECTION_SLUG = 'external-influences';
const SUBJECT_ID   = 'business';

/* ── 2. CONTENT ───────────────────────────────────────────────────────────── */

const CONTENT = [

  /* ═══ Block 1: Inflation ═══ */
  {
    title: "Inflation",
    quizIndices: [0],
    sections: [
      {
        id: "inflation-impact-on-business",
        title: "Inflation and Its Impact on Business",
        keyIdea: "Inflation is a sustained rise in the general price level that erodes purchasing power, increases costs and creates uncertainty for business planning.",
        body: [
          {
            type: "paragraph",
            text: "**Inflation** is a sustained increase in the general price level of goods and services in an economy over time. It is measured by the **Consumer Price Index (CPI)** — when inflation is 5%, a basket of goods that cost £100 last year now costs £105. For businesses, inflation affects both the cost side and the revenue side of operations."
          },
          {
            type: "flow",
            steps: ["General price level rises", "Input costs increase for businesses", "Firms must raise prices or absorb costs"],
            result: "Squeezed margins or risk of losing price-sensitive customers",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "On the cost side, inflation pushes up the prices of **raw materials, wages, rent and energy**. Workers demand higher wages to maintain their living standards, suppliers charge more, and landlords increase rents. If a business cannot pass these costs on to customers through higher prices, its **profit margins shrink**."
          },
          {
            type: "paragraph",
            text: "On the demand side, inflation reduces consumers' **real purchasing power** — their money buys less than before. This can reduce demand for non-essential goods and services. However, businesses selling necessities or those with strong brand loyalty may be able to raise prices without losing significant sales."
          }
        ],
        realExample: {
          emoji: "🛒",
          text: "**Greggs** faced input cost inflation of over 9% in 2022 as energy, wheat and labour costs all surged simultaneously. Greggs raised its sausage roll price from £1 to £1.15, carefully balancing the need to protect margins against the risk of alienating its price-conscious customer base."
        },
        misconception: "Students write \"inflation is always bad for businesses.\" Firms with pricing power, strong brands or assets that appreciate with inflation can actually benefit. Instead write: inflation harms businesses with thin margins and price-sensitive customers, but firms with strong brands or asset-heavy balance sheets may benefit from rising prices.",
        examMatters: "When analysing inflation's impact on a business, examiners want you to consider both cost-push and demand-side effects. Always relate your answer to the specific business — a luxury brand can pass on costs more easily than a discount retailer."
      },
      {
        id: "cost-push-demand-pull-inflation",
        title: "Cost-Push and Demand-Pull Inflation",
        keyIdea: "Cost-push inflation is driven by rising production costs forcing prices up, while demand-pull inflation is caused by too much demand chasing too few goods.",
        body: [
          {
            type: "paragraph",
            text: "**Cost-push inflation** occurs when the costs of production rise, and businesses pass those increases on to consumers through higher prices. Common causes include rising oil prices, higher wages, increased import costs (due to a weaker currency) and supply chain disruptions. The business has no choice but to raise prices or accept lower margins."
          },
          {
            type: "flow",
            steps: ["Oil or raw material prices spike", "Production costs rise across industries", "Businesses raise selling prices"],
            result: "Cost-push inflation — driven by the supply side",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "**Demand-pull inflation** occurs when aggregate demand in the economy exceeds the economy's ability to supply goods and services. When consumers and businesses are spending faster than firms can produce, prices are bid upwards. This is often summarised as \"too much money chasing too few goods.\""
          },
          {
            type: "paragraph",
            text: "For businesses, understanding the type of inflation matters. Cost-push inflation squeezes margins because costs rise before you can raise prices. Demand-pull inflation can initially boost revenue as customers are willing to pay more, but it also signals that the central bank may raise interest rates to cool demand."
          }
        ],
        realExample: {
          emoji: "⛽",
          text: "**EasyJet** experienced severe cost-push inflation in 2022 when jet fuel prices doubled due to the Russia-Ukraine conflict. Fuel accounts for roughly 30% of EasyJet's operating costs, so the airline was forced to add fuel surcharges to ticket prices while competitors faced identical cost pressures."
        },
        misconception: "Students treat all inflation as having the same cause and effect on businesses. Cost-push and demand-pull inflation have different origins and different implications for business strategy. Instead write: cost-push inflation squeezes margins by raising input costs, while demand-pull inflation may temporarily boost revenues before interest rate rises cool the economy.",
        examMatters: "Examiners reward you for identifying the type of inflation in a case study and explaining its specific impact on the business. Stating that \"inflation increases costs\" without distinguishing between cost-push and demand-pull shows a lack of analytical depth."
      }
    ],
    takeaway: [
      "Inflation raises input costs and erodes consumer purchasing power.",
      "Cost-push comes from supply-side shocks; demand-pull from excess demand.",
      "Impact depends on a firm's pricing power and cost structure."
    ]
  },

  /* ═══ Block 2: Exchange Rates, Interest Rates and Taxation ═══ */
  {
    title: "Exchange Rates, Interest Rates and Taxation",
    quizIndices: [1],
    practiceIndices: [0],
    sections: [
      {
        id: "exchange-rates",
        title: "Exchange Rates",
        keyIdea: "A change in the exchange rate alters the price of imports and exports, directly affecting costs for firms that buy abroad and revenues for firms that sell abroad.",
        body: [
          {
            type: "paragraph",
            text: "The **exchange rate** is the price of one currency expressed in terms of another — for example, £1 = $1.25. When the pound **appreciates** (rises in value), imports become cheaper but exports become more expensive for foreign buyers. When the pound **depreciates** (falls in value), imports cost more but exports become cheaper and more competitive abroad."
          },
          {
            type: "flow",
            steps: ["Pound appreciates against dollar", "UK exports cost more in dollars", "Foreign demand for UK goods falls"],
            result: "Exporters lose competitiveness; importers benefit",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "For a UK business that **imports** raw materials, a strong pound is beneficial because it reduces the cost of buying foreign inputs. For a UK business that **exports** products, a strong pound is harmful because its goods become more expensive for overseas customers, potentially reducing demand."
          },
          {
            type: "paragraph",
            text: "Exchange rate volatility creates uncertainty for businesses involved in international trade. Many firms use **hedging** — financial contracts that lock in a future exchange rate — to protect against sudden currency movements that could wipe out profit margins."
          }
        ],
        realExample: {
          emoji: "🧳",
          text: "**Burberry** earns over 75% of its revenue outside the UK, so when the pound fell sharply after the 2016 Brexit referendum, its overseas earnings were worth significantly more when converted back to sterling. Burberry reported a £90 million boost to revenue purely from favourable exchange rate movements."
        },
        misconception: "Students write \"a strong pound is good for the UK economy.\" Whether a strong pound helps or hurts depends entirely on the business — it benefits importers but damages exporters. Instead write: a strong pound reduces import costs but makes exports less competitive, so its impact depends on whether the business primarily imports or exports.",
        examMatters: "Exchange rate questions require you to trace the chain of logic: currency change leads to price change leads to demand change leads to profit change. Examiners penalise students who simply state \"the exchange rate went up so it is bad\" without explaining the mechanism."
      },
      {
        id: "interest-rates",
        title: "Interest Rates",
        keyIdea: "Interest rates determine the cost of borrowing and the reward for saving, directly influencing business investment decisions and consumer spending patterns.",
        body: [
          {
            type: "paragraph",
            text: "The **interest rate** is the cost of borrowing money and the reward for saving it. In the UK, the Bank of England sets the **base rate**, which influences the rates charged by commercial banks on loans and mortgages. When interest rates rise, borrowing becomes more expensive; when they fall, borrowing becomes cheaper."
          },
          {
            type: "flow",
            steps: ["Bank of England raises base rate", "Cost of business loans increases", "Firms delay investment and expansion"],
            result: "Slower growth and reduced capital spending",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "Higher interest rates affect businesses in two ways. First, the **cost of borrowing** increases — firms with existing variable-rate loans pay more, and new investment projects become harder to justify because the required return must exceed the higher cost of capital. Second, consumer spending typically falls because mortgage payments rise and saving becomes more attractive."
          },
          {
            type: "paragraph",
            text: "Lower interest rates have the opposite effect — they encourage borrowing, stimulate investment and boost consumer spending. However, firms that rely on interest income, such as banks and pension funds, may see reduced returns when rates are low."
          }
        ],
        realExample: {
          emoji: "🏠",
          text: "**Barratt Developments**, the UK's largest housebuilder, saw reservation rates drop by 21% in 2023 after the Bank of England raised interest rates from 0.1% to 5.25%. Higher mortgage costs priced many first-time buyers out of the market, directly reducing demand for Barratt's new-build homes."
        },
        misconception: "Students claim \"higher interest rates are always bad for businesses.\" Cash-rich firms with no debt are barely affected, and banks actually earn more from lending when rates rise. Instead write: the impact of interest rate changes depends on the firm's level of debt, its reliance on consumer credit spending, and whether it is a net borrower or lender.",
        examMatters: "Interest rate questions often appear alongside data on a firm's debt levels or consumer spending patterns. Examiners expect you to link the rate change to specific consequences for the business in the case study, not just state the general theory."
      },
      {
        id: "taxation",
        title: "Taxation",
        keyIdea: "Government taxes on profits, sales and employment directly affect business costs, pricing decisions and the attractiveness of a country for investment.",
        body: [
          {
            type: "paragraph",
            text: "Businesses face several types of tax. **Corporation tax** is levied on profits — the higher the rate, the less profit the business retains after tax. **VAT** (Value Added Tax) is charged on the sale of goods and services — businesses collect it from customers and pass it to the government. **Employer National Insurance Contributions** are a tax on employing workers, adding to labour costs."
          },
          {
            type: "paragraph",
            text: "Changes in taxation directly affect business decisions. A rise in corporation tax reduces the return on investment, potentially discouraging expansion. An increase in VAT raises the final price paid by consumers, which may reduce demand. Higher employer NICs make it more expensive to hire staff, potentially slowing recruitment."
          },
          {
            type: "flow",
            steps: ["Government raises corporation tax", "Post-tax profits fall for all firms", "Investment becomes less attractive"],
            result: "Some firms relocate or reduce expansion plans",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "Tax policy also influences where multinational companies choose to locate. Countries with lower corporation tax rates, such as Ireland at 12.5%, attract foreign direct investment from firms seeking to minimise their tax burden. Governments must balance revenue needs against the risk of driving businesses abroad."
          }
        ],
        realExample: {
          emoji: "💰",
          text: "**Apple** established its European headquarters in Cork, Ireland, partly because Ireland's 12.5% corporation tax rate was significantly lower than the UK's 25% or Germany's 30%. This tax advantage allowed Apple to retain more of its European profits, though it attracted political controversy over the fairness of the arrangement."
        },
        misconception: "Students say \"businesses should pay as little tax as possible by moving abroad.\" Tax avoidance strategies can damage a firm's reputation and invite regulatory crackdowns, while also depriving the countries where they operate of revenue. Instead write: while businesses legally seek to minimise their tax burden, aggressive tax avoidance risks reputational damage and increased government scrutiny.",
        examMatters: "When discussing taxation, examiners want you to analyse the specific impact of a tax change on the business in question. Consider whether the firm can absorb the cost, pass it on to consumers, or whether it might relocate — and evaluate the likelihood and consequences of each response."
      }
    ],
    takeaway: [
      "A strong pound helps importers but hurts exporters, and vice versa.",
      "Higher interest rates raise borrowing costs and can dampen consumer demand.",
      "Tax changes affect profits, pricing and location decisions for businesses."
    ]
  },

  /* ═══ Block 3: The Business Cycle ═══ */
  {
    title: "The Business Cycle",
    quizIndices: [2],
    practiceIndices: [1],
    sections: [
      {
        id: "phases-of-the-business-cycle",
        title: "Phases of the Business Cycle",
        keyIdea: "The economy moves through recurring phases of boom, recession, slump and recovery, and each phase creates different challenges and opportunities for businesses.",
        body: [
          {
            type: "paragraph",
            text: "The **business cycle** describes the fluctuations in economic activity over time. The economy does not grow steadily — it moves through four main phases: **boom** (high growth, low unemployment, rising prices), **recession** (falling GDP for two consecutive quarters), **slump** (the lowest point of economic activity) and **recovery** (output begins to rise again)."
          },
          {
            type: "flow",
            steps: ["Boom: high spending and confidence", "Recession: demand and output fall", "Slump: lowest point of activity", "Recovery: growth resumes gradually"],
            result: "The cycle then repeats — timing is unpredictable",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "During a **boom**, businesses benefit from high consumer spending, rising profits and easy access to credit. However, booms also bring rising costs — wages increase as labour becomes scarce, raw material prices climb, and inflation accelerates. Capacity constraints may prevent firms from meeting all the demand."
          },
          {
            type: "paragraph",
            text: "During a **recession**, consumer confidence falls, spending is cut back and businesses face declining revenue. Firms may need to reduce output, cut staff or renegotiate with suppliers. However, well-prepared businesses can use recessions to acquire rivals cheaply, negotiate better deals and invest in efficiency while competitors retrench."
          }
        ],
        realExample: {
          emoji: "🍽️",
          text: "**McDonald's** has historically outperformed during recessions because consumers trade down from more expensive restaurants to affordable fast food. During the 2008-09 recession, McDonald's global sales rose 6.9% while casual dining chains like TGI Friday's saw revenue fall by double digits."
        },
        misconception: "Students write \"recessions are bad for all businesses.\" Discount retailers, debt collection agencies and repair businesses often thrive during downturns as consumers cut back and make do. Instead write: recessions reduce demand for luxury and discretionary goods, but businesses offering affordable alternatives or essential services may see demand increase.",
        examMatters: "Examiners frequently ask you to explain how a specific phase of the business cycle affects a named business. Always consider the nature of the product — income elastic goods suffer most in recessions, while income inelastic goods are relatively protected."
      },
      {
        id: "business-responses-to-the-cycle",
        title: "Business Responses to the Cycle",
        keyIdea: "Smart businesses do not just react to the business cycle — they anticipate phases and adjust their strategy in advance to minimise threats and exploit opportunities.",
        body: [
          {
            type: "paragraph",
            text: "Businesses that anticipate changes in the economic cycle can position themselves to benefit. In a **boom**, forward-thinking firms build cash reserves, lock in supplier contracts and invest in capacity while revenue is strong. In a **recession**, they can use those reserves to acquire competitors, invest in innovation or negotiate favourable terms while others are struggling."
          },
          {
            type: "subheading",
            text: "Key Strategic Responses"
          },
          {
            type: "bullets",
            items: [
              "**Diversification** — spreading products across markets reduces dependence on one economic cycle.",
              "**Flexible workforce** — using temporary or part-time workers allows staffing levels to adjust with demand.",
              "**Cost management** — lean operations help firms survive downturns with lower break-even points.",
              "**Counter-cyclical investment** — investing during recessions when assets and talent are cheaper."
            ]
          },
          {
            type: "paragraph",
            text: "The key lesson is that the business cycle is inevitable but not unpredictable. Firms that plan for downturns during good times and invest during bad times tend to emerge from recessions stronger than those that only react to current conditions."
          }
        ],
        realExample: {
          emoji: "📱",
          text: "**Apple** launched the original iPhone in 2007 just before the global financial crisis and continued investing heavily in R&D throughout the recession. While competitors cut their innovation budgets, Apple released the iPhone 3G and the App Store, cementing a market position that rivals have never been able to recapture."
        },
        misconception: "Students suggest \"businesses should just cut costs during a recession and wait for recovery.\" Pure cost-cutting can weaken a firm's competitive position when growth returns. Instead write: businesses should balance short-term cost control with strategic investment that positions them for recovery, as firms that only cut during downturns often emerge weaker.",
        examMatters: "When asked how a business should respond to the business cycle, examiners want specific strategies linked to the firm's circumstances. Generic advice like \"reduce costs\" scores poorly — explain which costs, how, and what the trade-offs are for the specific business in question."
      }
    ],
    takeaway: [
      "The cycle has four phases: boom, recession, slump and recovery.",
      "Recessions hurt luxury goods firms but can boost discount retailers.",
      "The best firms invest counter-cyclically, building strength during downturns."
    ]
  },

  /* ═══ Block 4: Business Legislation ═══ */
  {
    title: "Business Legislation",
    quizIndices: [3],
    sections: [
      {
        id: "employment-legislation",
        title: "Employment Legislation",
        keyIdea: "Employment law sets minimum standards for how businesses must treat their workers, covering wages, working hours, discrimination and dismissal procedures.",
        body: [
          {
            type: "paragraph",
            text: "**Employment legislation** provides a legal framework that protects workers' rights and sets obligations for employers. Key areas include the **national minimum wage** (a legal floor on hourly pay), **working time regulations** (limiting weekly hours and guaranteeing rest breaks), **anti-discrimination laws** (preventing unfair treatment based on age, gender, race, disability or religion) and **unfair dismissal protection**."
          },
          {
            type: "paragraph",
            text: "These laws increase costs for businesses — paying the minimum wage, providing statutory sick pay and maternity leave, and maintaining HR systems to ensure compliance all add to operating expenses. However, they also create a fairer and more motivated workforce, reduce staff turnover and protect the firm from costly legal disputes."
          },
          {
            type: "flow",
            steps: ["Government raises minimum wage", "Labour costs increase for low-wage employers", "Firms raise prices, cut hours or invest in automation"],
            result: "Higher costs but potentially lower staff turnover",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "Businesses that exceed legal minimums — offering higher wages, better benefits and genuine inclusion — often gain a competitive advantage in recruitment and retention. The law sets the floor, not the ceiling, and the best employers treat legislation as a baseline rather than a target."
          }
        ],
        realExample: {
          emoji: "🛒",
          text: "**Aldi** voluntarily pays above the national minimum wage and the Real Living Wage in all UK stores, making it one of the highest-paying supermarkets. This strategy reduces staff turnover to well below the retail industry average, saving Aldi significant recruitment and training costs."
        },
        misconception: "Students write \"employment legislation just increases costs and reduces profits.\" While compliance has direct costs, it also reduces the hidden costs of high turnover, poor morale, discrimination claims and reputational damage. Instead write: employment legislation increases direct labour costs but can reduce indirect costs such as recruitment, legal disputes and reputational harm.",
        examMatters: "When analysing the impact of employment legislation, examiners want you to consider both the costs and benefits. Evaluate whether the specific business is heavily affected — a firm employing many minimum-wage workers will be hit harder by a wage increase than a professional services firm."
      },
      {
        id: "consumer-protection-legislation",
        title: "Consumer Protection Legislation",
        keyIdea: "Consumer protection laws require businesses to sell safe products, describe them honestly and provide remedies when things go wrong, building trust in the marketplace.",
        body: [
          {
            type: "paragraph",
            text: "**Consumer protection legislation** ensures that businesses treat customers fairly. Key laws include the **Consumer Rights Act 2015** (goods must be of satisfactory quality, fit for purpose and as described), **Trade Descriptions Act** (it is illegal to mislead consumers about products) and **Consumer Contracts Regulations** (giving online buyers a 14-day cooling-off period)."
          },
          {
            type: "flow",
            steps: ["Product fails to meet legal standard", "Customer exercises statutory rights", "Business must repair, replace or refund"],
            result: "Compliance costs but maintains consumer trust",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "For businesses, compliance with consumer protection law means investing in **quality management systems**, **accurate marketing**, **clear terms and conditions** and **responsive customer service**. The cost of compliance is real, but the cost of non-compliance — fines, legal action, compensation and reputational damage — is far greater."
          },
          {
            type: "paragraph",
            text: "Strong consumer protection actually benefits responsible businesses by creating a level playing field. When all firms must meet the same standards, competitors cannot gain an unfair advantage by cutting corners on quality or misleading customers."
          }
        ],
        realExample: {
          emoji: "🚗",
          text: "**Volkswagen** paid over $30 billion in fines and settlements after the 2015 diesel emissions scandal, where it programmed cars to cheat on pollution tests. The deception violated consumer protection laws across multiple countries and destroyed consumer trust that VW had spent decades building."
        },
        misconception: "Students say \"consumer protection laws make it harder for businesses to compete.\" These laws actually protect honest businesses from being undercut by unscrupulous rivals who cut corners. Instead write: consumer protection creates a level playing field that rewards businesses investing in genuine quality while penalising those that mislead or sell unsafe products.",
        examMatters: "Examiners often present a scenario involving a customer complaint and ask you to apply the relevant legislation. You must know the key provisions — satisfactory quality, fit for purpose and as described — and explain the business's legal obligations and the consequences of non-compliance."
      }
    ],
    takeaway: [
      "Employment law sets minimum standards on wages, hours and fair treatment.",
      "Consumer protection requires safe products, honest descriptions and remedies.",
      "Compliance costs money but non-compliance costs far more in fines and reputation."
    ]
  },

  /* ═══ Block 5: The Competitive Environment ═══ */
  {
    title: "The Competitive Environment",
    quizIndices: [4],
    practiceIndices: [2],
    sections: [
      {
        id: "market-structure",
        title: "Market Structure and Competition",
        keyIdea: "The number and size of firms in a market determines how much power each one has over price, and this ranges from perfect competition to monopoly.",
        body: [
          {
            type: "paragraph",
            text: "**Market structure** describes the characteristics of a market — how many firms compete, how similar their products are, and how easy it is for new firms to enter. At one extreme, **perfect competition** features many small firms selling identical products with no barriers to entry. At the other extreme, a **monopoly** is a single firm dominating the market with high barriers preventing entry."
          },
          {
            type: "paragraph",
            text: "Between these extremes sit **monopolistic competition** (many firms selling differentiated products, like restaurants) and **oligopoly** (a few large firms dominating, like UK supermarkets or mobile networks). In an oligopoly, firms are **interdependent** — each firm's pricing and output decisions directly affect the others."
          },
          {
            type: "flow",
            steps: ["Few large firms dominate (oligopoly)", "Each firm watches rivals closely", "Price wars or tacit collusion may develop"],
            result: "Interdependence shapes strategic decision-making",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "Understanding market structure helps a business develop its competitive strategy. In a highly competitive market, differentiation and cost efficiency are essential. In an oligopoly, strategic behaviour — including branding, loyalty schemes and non-price competition — becomes the primary battlefield."
          }
        ],
        realExample: {
          emoji: "🛒",
          text: "**Tesco, Sainsbury's, Asda and Morrisons** form a classic oligopoly in UK grocery retailing, collectively holding over 65% market share. When Aldi and Lidl entered with aggressive pricing, the established firms responded with price-matching campaigns rather than ignoring the threat, demonstrating oligopolistic interdependence."
        },
        misconception: "Students assume \"more competition is always better for consumers.\" While competition generally lowers prices, excessive fragmentation can prevent firms from achieving economies of scale, and some markets naturally support only a few large firms. Instead write: competition benefits consumers through lower prices and greater choice, but some industries require large-scale operations that naturally limit the number of viable competitors.",
        examMatters: "When analysing a competitive environment, examiners want you to identify the market structure and explain how it affects the firm's behaviour. In an oligopoly, discuss interdependence and non-price competition. In a competitive market, focus on differentiation and cost control."
      },
      {
        id: "barriers-to-entry",
        title: "Barriers to Entry and Exit",
        keyIdea: "Barriers to entry protect existing firms from new competition, while barriers to exit trap firms in unprofitable markets they cannot easily leave.",
        body: [
          {
            type: "paragraph",
            text: "**Barriers to entry** are obstacles that make it difficult for new firms to enter a market and compete with established businesses. Common barriers include **high start-up costs** (building a factory or developing technology), **strong brand loyalty** (customers unwilling to switch), **economies of scale** (existing firms produce at much lower unit costs), **patents and intellectual property** and **government regulations** requiring licences or approvals."
          },
          {
            type: "flow",
            steps: ["Incumbent firms enjoy scale and brand loyalty", "New entrant faces high costs and low recognition", "Entry becomes unattractive or impossible"],
            result: "Existing firms protected from new competition",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "**Barriers to exit** are costs or factors that make it difficult for a firm to leave a market, even when it is making losses. These include **long-term lease commitments**, **specialist equipment** with no resale value, **contractual obligations** to employees or customers, and **emotional attachment** by owners. Exit barriers can trap firms in declining markets."
          },
          {
            type: "paragraph",
            text: "High barriers to entry benefit existing firms by reducing competition and allowing them to maintain higher prices and margins. However, protected markets can also become complacent, with firms failing to innovate because they face no competitive pressure to improve."
          }
        ],
        realExample: {
          emoji: "💊",
          text: "**Pfizer** benefits from enormous barriers to entry in the pharmaceutical industry — developing a new drug costs an average of $2.6 billion and takes over 10 years from discovery to market. These barriers protect Pfizer's blockbuster drugs from generic competition until patents expire, sustaining profit margins above 25%."
        },
        misconception: "Students write \"barriers to entry are always created deliberately by existing firms.\" Many barriers arise naturally from the economics of the industry — high R&D costs in pharmaceuticals or massive infrastructure needs in telecoms exist regardless of incumbent behaviour. Instead write: barriers to entry can be natural (high capital costs, economies of scale) or artificial (patents, lobbying for regulation), and both types protect existing firms from new competition.",
        examMatters: "Questions on barriers to entry often ask you to evaluate whether a new firm could successfully enter a named market. Consider the specific barriers that exist, the resources the new firm has, and whether there is a gap in the market that incumbents are not serving."
      },
      {
        id: "competitive-pressures",
        title: "Competitive Pressures and Responses",
        keyIdea: "Businesses face competitive pressure from rival firms, new entrants, substitute products and powerful buyers or suppliers, and must respond strategically to survive.",
        body: [
          {
            type: "paragraph",
            text: "Competitive pressure comes from multiple sources, not just direct rivals. **Porter's Five Forces** framework identifies five sources: the **threat of new entrants**, the **bargaining power of suppliers**, the **bargaining power of buyers**, the **threat of substitute products** and the **intensity of existing rivalry**. Together, these forces determine how profitable and attractive a market is."
          },
          {
            type: "paragraph",
            text: "Businesses respond to competitive pressures through a range of strategies. **Price competition** involves undercutting rivals, but it squeezes margins and can trigger destructive price wars. **Non-price competition** — through branding, quality, innovation, customer service and loyalty schemes — is often more sustainable because it builds differentiation that is harder for rivals to copy."
          },
          {
            type: "flow",
            steps: ["Competitor launches superior product", "Customers begin switching brands", "Firm must innovate or differentiate to retain share"],
            result: "Competitive pressure drives continuous improvement",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "The strength of each competitive force varies by industry. In grocery retailing, buyer power is high because switching costs are low. In aerospace, supplier power is high because few firms can make jet engines. Understanding which forces are strongest helps a business focus its strategy where it matters most."
          }
        ],
        realExample: {
          emoji: "📺",
          text: "**Netflix** faces competitive pressure from multiple directions — Disney+, Amazon Prime and Apple TV+ as direct rivals, TikTok and YouTube as substitutes, and powerful content studios as suppliers. Netflix responded by investing $17 billion annually in original content to reduce supplier dependence and differentiate from competitors."
        },
        misconception: "Students think competitive pressure only comes from businesses selling the same product. Substitutes, new entrants and powerful suppliers all exert competitive pressure without directly competing. Instead write: competitive pressure comes from five forces — direct rivals, new entrants, substitutes, buyer power and supplier power — and businesses must monitor and respond to all of them.",
        examMatters: "Examiners frequently use Porter's Five Forces as a framework for analysing a competitive environment. When applying it, do not just list all five forces — focus on the two or three that are most significant for the business in question and explain why they matter most."
      }
    ],
    takeaway: [
      "Market structure ranges from perfect competition to monopoly.",
      "Barriers to entry protect incumbents; barriers to exit trap struggling firms.",
      "Porter's Five Forces reveals all competitive pressures, not just direct rivalry.",
      "Non-price competition builds sustainable advantages over pure price-cutting."
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
