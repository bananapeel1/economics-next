/**
 * RICH NOTES — Business Unit 1 (Sections 1.3.2 – 1.3.5)
 * =======================================================
 * Edexcel IAL Business Unit 1, spec points 1.3.2 – 1.3.5
 * Pushes rich-format notes to Supabase section_notes table.
 *
 * Run with: node scripts/update-business-unit1-rich-notes.mjs
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL || 'https://trweeckuswgkenckeqfb.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);

/* ═══════════════════════════════════════════════════════════
 *  1.3.2 — The Market
 * ═══════════════════════════════════════════════════════════ */

const NOTES_132 = [

  /* ─────────────────────────────────────────────────
   *  Chapter 1: Demand and Factors Affecting Demand
   * ───────────────────────────────────────────────── */
  {
    title: "Demand and Factors Affecting Demand",
    meta: "6 concepts",
    keyIdea: "Demand is not just about wanting a product; it requires willingness and ability to pay at a given price, and understanding what shifts demand is the first step to predicting revenue.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Demand</strong> — the quantity of a good or service that consumers are willing and able to buy at a given price in a given time period."
          },
          {
            type: "def",
            text: "<strong>Effective demand</strong> — demand backed by the ability to pay; a consumer may want a Ferrari, but only effective demand counts in the market.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Demand curve</strong> — a graphical representation showing the relationship between price and quantity demanded, normally downward-sloping from left to right."
          }
        ]
      },
      {
        title: "FACTORS SHIFTING DEMAND",
        items: [
          {
            type: "mech",
            text: "Changes in <strong>consumer income</strong> shift the demand curve; for normal goods, higher income increases demand, while for inferior goods (e.g. budget supermarket ranges) demand falls as income rises."
          },
          {
            type: "mech",
            text: "Changes in the <strong>price of substitutes and complements</strong> affect demand; a rise in Coca-Cola's price increases demand for Pepsi (substitute), while a rise in printer prices reduces demand for ink cartridges (complement)."
          },
          {
            type: "imp",
            text: "Changes in <strong>tastes, fashions and advertising</strong> shift demand; successful marketing campaigns can shift the demand curve to the right even if nothing else changes.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Demand shifts link directly to market equilibrium; any rightward shift in demand creates upward pressure on price and signals an opportunity for firms to increase output."
          }
        ]
      },
      {
        title: "APPLICATION",
        items: [
          {
            type: "mech",
            text: "A <strong>movement along</strong> the demand curve occurs when price changes; a <strong>shift of</strong> the demand curve occurs when a non-price factor changes — examiners penalise confusing these two."
          },
          {
            type: "imp",
            text: "Seasonal demand fluctuations (e.g. ice cream in summer, heating oil in winter) are predictable shifts that firms can plan for through stock management and pricing adjustments.",
            tag: "exam"
          }
        ]
      }
    ],
    flow: {
      steps: ["Non-price factor changes (e.g. income rises)", "Demand curve shifts right", "More demanded at every price level"],
      result: "Upward pressure on market price",
      resultType: "good"
    },
    misconception: "Students say a price change shifts the demand curve. Wrong because a price change causes a movement along the existing demand curve, not a shift. Instead write: only non-price factors (income, tastes, population, substitutes, complements) shift the entire demand curve to a new position.",
    takeaway: [
      "Demand requires both willingness and ability to pay; wanting is not enough.",
      "Price changes cause movements along the curve; non-price factors shift it.",
      "Firms that track demand factors can anticipate sales changes before they happen."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 2: Supply and Factors Affecting Supply
   * ───────────────────────────────────────────────── */
  {
    title: "Supply and Factors Affecting Supply",
    meta: "5 concepts",
    keyIdea: "Supply reflects the producer's side of the market; firms supply more at higher prices because it becomes more profitable, but costs, technology and external shocks constantly reshape what they can offer.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Supply</strong> — the quantity of a good or service that producers are willing and able to offer for sale at a given price in a given time period."
          },
          {
            type: "def",
            text: "<strong>Supply curve</strong> — a graphical representation showing the relationship between price and quantity supplied, normally upward-sloping because higher prices incentivise greater production."
          }
        ]
      },
      {
        title: "FACTORS SHIFTING SUPPLY",
        items: [
          {
            type: "mech",
            text: "A fall in <strong>costs of production</strong> (raw materials, wages, rent) shifts supply right because firms can profitably produce more at every price level — for example, cheaper steel increases the supply of cars."
          },
          {
            type: "mech",
            text: "Improvements in <strong>technology</strong> increase productivity and lower unit costs, shifting supply right; automation in factories has dramatically increased output per worker across manufacturing."
          },
          {
            type: "mech",
            text: "External shocks such as <strong>weather events, pandemics or government regulation</strong> can shift supply left by disrupting production or increasing compliance costs."
          },
          {
            type: "imp",
            text: "Government <strong>subsidies</strong> shift supply right (lowering production costs), while <strong>indirect taxes</strong> shift supply left (raising costs); both are deliberate policy tools.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Supply shifts connect to pricing decisions; a leftward supply shift raises costs and forces firms to choose between absorbing costs (lower margins) or passing them on (higher prices, lower demand)."
          }
        ]
      }
    ],
    flow: {
      steps: ["Production costs fall (e.g. new technology)", "Supply curve shifts right", "More supplied at every price level"],
      result: "Downward pressure on market price",
      resultType: "good"
    },
    examMatters: "Examiners expect you to distinguish clearly between a movement along the supply curve (caused by a price change) and a shift of the supply curve (caused by a non-price factor). Always label your diagrams correctly and state the direction of the shift.",
    takeaway: [
      "Supply is about willingness and ability to produce; it rises with price because profit incentives grow.",
      "Cost reductions and tech improvements shift supply right; external shocks and taxes shift it left.",
      "Like demand, price changes cause movements along the curve, not shifts."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 3: Market Equilibrium
   * ───────────────────────────────────────────────── */
  {
    title: "Market Equilibrium",
    meta: "4 concepts",
    keyIdea: "Equilibrium is the market's natural resting point where supply meets demand; when either curve shifts, the market adjusts to a new equilibrium through price and quantity changes.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Market equilibrium</strong> — the point where the quantity demanded equals the quantity supplied at a particular price; there is no tendency for the price to change.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Excess demand</strong> — occurs when the price is below equilibrium; quantity demanded exceeds quantity supplied, creating upward pressure on price."
          },
          {
            type: "def",
            text: "<strong>Excess supply</strong> — occurs when the price is above equilibrium; quantity supplied exceeds quantity demanded, creating downward pressure on price."
          }
        ]
      },
      {
        title: "HOW EQUILIBRIUM CHANGES",
        items: [
          {
            type: "mech",
            text: "An <strong>increase in demand</strong> (rightward shift) raises both the equilibrium price and quantity — for example, a health trend increasing demand for avocados pushes prices up and encourages farmers to supply more."
          },
          {
            type: "mech",
            text: "An <strong>increase in supply</strong> (rightward shift) lowers the equilibrium price but raises the equilibrium quantity — for example, a bumper wheat harvest drives down bread prices."
          },
          {
            type: "imp",
            text: "When both demand and supply shift simultaneously, the effect on price or quantity depends on which shift is larger — this is a common exam scenario requiring careful diagram analysis.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Equilibrium analysis is the foundation for understanding how business decisions (pricing, output) interact with market forces; firms that ignore equilibrium dynamics risk overproducing or underpricing."
          }
        ]
      }
    ],
    flow: {
      steps: ["Demand increases (curve shifts right)", "Excess demand at old price", "Price rises to new equilibrium"],
      result: "Higher equilibrium price and quantity",
      resultType: "good"
    },
    examMatters: "Examiners award marks for correctly drawn diagrams showing the original equilibrium, the shift, and the new equilibrium clearly labelled with P1/P2 and Q1/Q2. Always explain the adjustment process, not just the outcome.",
    takeaway: [
      "Equilibrium occurs where supply equals demand; any imbalance triggers price adjustment.",
      "A demand increase raises both price and quantity; a supply increase lowers price but raises quantity.",
      "Always draw the diagram first, then use it to structure your written analysis."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 4: Price Elasticity of Demand (PED)
   * ───────────────────────────────────────────────── */
  {
    title: "Price Elasticity of Demand (PED)",
    meta: "5 concepts + formula",
    keyIdea: "PED tells a firm how sensitive its customers are to price changes; getting this wrong means a price rise could slash revenue instead of boosting it.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Price elasticity of demand (PED)</strong> — a measure of the responsiveness of quantity demanded to a change in price; it is always negative because price and demand move in opposite directions.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Price elastic demand</strong> (PED > 1) — quantity demanded changes by a greater proportion than the price change; common for products with close substitutes like branded soft drinks."
          },
          {
            type: "def",
            text: "<strong>Price inelastic demand</strong> (PED < 1) — quantity demanded changes by a smaller proportion than the price change; common for necessities and addictive products like petrol and cigarettes."
          }
        ]
      },
      {
        title: "FACTORS & BUSINESS IMPLICATIONS",
        items: [
          {
            type: "mech",
            text: "The <strong>availability of substitutes</strong> is the most important factor; the more substitutes available, the more elastic demand becomes because consumers can easily switch."
          },
          {
            type: "mech",
            text: "<strong>Brand loyalty</strong> and <strong>habit</strong> make demand more inelastic; Apple can raise iPhone prices with less impact on sales than a generic phone brand because of its loyal customer base."
          },
          {
            type: "imp",
            text: "If demand is <strong>price inelastic</strong>, a firm should raise prices to increase total revenue because the fall in quantity sold is proportionally smaller than the price rise.",
            tag: "exam"
          },
          {
            type: "imp",
            text: "If demand is <strong>price elastic</strong>, a firm should lower prices to increase total revenue because the rise in quantity sold more than compensates for the lower price.",
            tag: "exam"
          },
          {
            type: "link",
            text: "PED links directly to pricing strategy; firms with inelastic demand have pricing power, while those with elastic demand must compete on value or differentiation."
          }
        ]
      }
    ],
    formula: {
      label: "PRICE ELASTICITY OF DEMAND",
      text: "PED = % Change in Quantity Demanded \u00f7 % Change in Price"
    },
    flow: {
      steps: ["Firm raises price by 10%", "PED is -0.5 (inelastic)", "Quantity falls only 5%"],
      result: "Total revenue increases",
      resultType: "good"
    },
    misconception: "Students say PED is always a negative number and therefore always less than 1. Wrong because we use the absolute value to classify elasticity; a PED of -2.5 has an absolute value of 2.5, making it elastic. Instead write: PED is technically negative, but we compare the absolute value to 1 to determine if demand is elastic (>1) or inelastic (<1).",
    takeaway: [
      "PED above 1 = elastic (price sensitive); below 1 = inelastic (price insensitive).",
      "Raise prices when demand is inelastic; lower prices when demand is elastic.",
      "Substitutes are the single biggest factor determining PED; more substitutes means more elastic."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 5: Income Elasticity of Demand (YED)
   * ───────────────────────────────────────────────── */
  {
    title: "Income Elasticity of Demand (YED)",
    meta: "4 concepts + formula",
    keyIdea: "YED reveals whether a product benefits or suffers when the economy grows; firms that understand YED can position their product portfolio to ride economic cycles rather than be crushed by them.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Income elasticity of demand (YED)</strong> — a measure of the responsiveness of quantity demanded to a change in consumer income; unlike PED, the sign (positive or negative) matters because it tells you the type of good.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Normal good</strong> (YED positive) — demand increases as income rises; most goods are normal goods, with luxury goods having YED greater than +1 (e.g. designer clothing, foreign holidays)."
          },
          {
            type: "def",
            text: "<strong>Inferior good</strong> (YED negative) — demand decreases as income rises because consumers trade up to better alternatives; examples include supermarket own-brand products and budget airlines on domestic routes."
          }
        ]
      },
      {
        title: "BUSINESS SIGNIFICANCE",
        items: [
          {
            type: "mech",
            text: "Firms selling <strong>luxury goods</strong> (YED > +1) enjoy rapid sales growth during economic booms but suffer sharp falls during recessions, making their revenue highly cyclical."
          },
          {
            type: "mech",
            text: "Firms selling <strong>inferior goods</strong> (YED negative) are counter-cyclical; Aldi and Lidl gained significant market share during the 2008 recession as consumers traded down from premium supermarkets."
          },
          {
            type: "imp",
            text: "A diversified product portfolio containing both luxury and necessity items helps firms <strong>smooth revenue</strong> across the economic cycle, reducing overall business risk.",
            tag: "exam"
          },
          {
            type: "link",
            text: "YED connects to the external economic environment; firms must monitor GDP growth and consumer confidence data to forecast demand shifts for their product categories."
          }
        ]
      }
    ],
    formula: {
      label: "INCOME ELASTICITY OF DEMAND",
      text: "YED = % Change in Quantity Demanded \u00f7 % Change in Income"
    },
    flow: {
      steps: ["Economy enters recession", "Consumer incomes fall", "Demand for luxury goods drops sharply (YED > +1)"],
      result: "Revenue volatility for luxury brands",
      resultType: "bad"
    },
    examMatters: "Examiners want you to use the sign of YED, not just the size. Positive YED means normal good, negative means inferior good. A common 8-mark question asks you to evaluate how a change in income would affect two different types of business — link your answer explicitly to the YED value and sign.",
    takeaway: [
      "Positive YED = normal good (demand rises with income); negative YED = inferior good (demand falls with income).",
      "Luxury goods (YED > +1) boom in growth but crash in recession; necessities (0 < YED < +1) are more stable.",
      "Smart firms diversify across product types to protect revenue through economic cycles."
    ]
  }

];

/* ═══════════════════════════════════════════════════════════
 *  1.3.3 — Marketing Mix and Strategy
 * ═══════════════════════════════════════════════════════════ */

const NOTES_133 = [

  /* ─────────────────────────────────────────────────
   *  Chapter 1: Marketing Objectives, Strategy and
   *             Product Life Cycle
   * ───────────────────────────────────────────────── */
  {
    title: "Marketing Objectives, Strategy and Product Life Cycle",
    meta: "6 concepts",
    keyIdea: "Marketing does not happen by accident; firms set measurable objectives, choose strategies to reach them, and use the product life cycle to time their decisions on pricing, promotion and product development.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Marketing objectives</strong> — specific, measurable goals for the marketing function such as increasing market share by 5%, boosting brand awareness, or entering a new market segment."
          },
          {
            type: "def",
            text: "<strong>Product life cycle (PLC)</strong> — the stages a product passes through from launch to withdrawal: development, introduction, growth, maturity, and decline.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Extension strategy</strong> — actions taken to extend the maturity phase and prevent decline, such as finding new markets, updating packaging, adding features, or repositioning the brand."
          }
        ]
      },
      {
        title: "STRATEGIC TOOLS",
        items: [
          {
            type: "mech",
            text: "The <strong>Boston Matrix</strong> classifies products by market growth and market share into four categories: Stars (high/high), Cash Cows (low growth/high share), Question Marks (high growth/low share), and Dogs (low/low)."
          },
          {
            type: "mech",
            text: "Cash Cows generate steady revenue with low investment needs, and the surplus funds <strong>Question Marks</strong> and <strong>Stars</strong> that need heavy marketing spend to grow."
          },
          {
            type: "imp",
            text: "The PLC and Boston Matrix are analytical frameworks, not prediction tools; a product labelled a 'Dog' may still be profitable in a niche, and extension strategies can revive mature products.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Marketing objectives must align with overall business objectives; a firm pursuing growth will prioritise market share, while a firm seeking survival will focus on customer retention and cash flow."
          }
        ]
      }
    ],
    flow: {
      steps: ["Product reaches maturity", "Sales plateau and competitors enter", "Firm deploys extension strategy"],
      result: "Product life extended, avoiding decline",
      resultType: "good"
    },
    misconception: "Students treat the PLC as a fixed timeline that every product follows identically. Wrong because some products skip stages, others stay in maturity for decades (e.g. Coca-Cola), and extension strategies can restart growth. Instead write: the PLC is a descriptive model, not a predictive one; its value lies in prompting firms to plan ahead, not in guaranteeing a pattern.",
    takeaway: [
      "Marketing objectives must be SMART and aligned with broader business strategy.",
      "The PLC prompts proactive planning; extension strategies can delay or prevent decline.",
      "The Boston Matrix helps firms balance their portfolio between cash generators and growth investments."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 2: Marketing Mix and Customer Loyalty
   * ───────────────────────────────────────────────── */
  {
    title: "Marketing Mix and Customer Loyalty",
    meta: "5 concepts",
    keyIdea: "The marketing mix is a toolkit of four levers — product, price, place and promotion — that must work together as an integrated strategy; changing one without adjusting the others creates inconsistency that confuses customers.",
    blocks: [
      {
        title: "THE 4Ps",
        items: [
          {
            type: "def",
            text: "<strong>Marketing mix (4Ps)</strong> — the combination of Product, Price, Place and Promotion that a firm uses to market its goods or services; all four elements must be coordinated to deliver a consistent message to the target market."
          },
          {
            type: "mech",
            text: "A premium product with budget pricing sends <strong>mixed signals</strong>; luxury goods need premium pricing, selective distribution and aspirational promotion to maintain perceived value."
          },
          {
            type: "mech",
            text: "<strong>B2B (business-to-business)</strong> marketing focuses on rational factors like cost-efficiency and reliability, while <strong>B2C (business-to-consumer)</strong> marketing often appeals to emotion, lifestyle and brand image."
          }
        ]
      },
      {
        title: "CUSTOMER LOYALTY",
        items: [
          {
            type: "def",
            text: "<strong>Customer loyalty</strong> — the likelihood that existing customers continue to purchase from the same firm rather than switching to competitors; it reduces marketing costs and stabilises revenue."
          },
          {
            type: "mech",
            text: "Loyalty schemes, excellent customer service and consistent product quality build <strong>repeat purchase behaviour</strong>; retaining an existing customer costs roughly five times less than acquiring a new one."
          },
          {
            type: "imp",
            text: "High customer loyalty makes demand more <strong>price inelastic</strong>, giving the firm greater pricing power and protecting it from competitor price wars.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Customer loyalty links to PED; loyal customers are less price-sensitive, which means the firm can raise prices with less impact on sales volume."
          }
        ]
      }
    ],
    examMatters: "Examiners want you to show how the 4Ps work together, not describe each P in isolation. A strong answer for any marketing question should explain how changing one element requires adjustments to the others to maintain a coherent strategy.",
    takeaway: [
      "The 4Ps must be integrated; a mismatch between any two undermines the whole strategy.",
      "B2B marketing is rational and relationship-driven; B2C marketing leans on emotion and brand identity.",
      "Customer loyalty reduces costs, stabilises revenue, and gives pricing power."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 3: Product/Service Design
   * ───────────────────────────────────────────────── */
  {
    title: "Product/Service Design",
    meta: "5 concepts",
    keyIdea: "Great product design balances three competing demands — function, aesthetics and cost — and increasingly must also reflect social and ethical expectations that shape modern consumer choices.",
    blocks: [
      {
        title: "THE DESIGN MIX",
        items: [
          {
            type: "def",
            text: "<strong>Design mix</strong> — the three elements of product design that firms must balance: <strong>function</strong> (does it work well?), <strong>aesthetics</strong> (does it look and feel good?), and <strong>cost</strong> (can it be manufactured economically?).",
            tag: "exam"
          },
          {
            type: "mech",
            text: "Dyson prioritises <strong>function and aesthetics</strong> over cost, charging premium prices; budget brands like Ikea prioritise <strong>cost and function</strong> over aesthetics to keep prices low."
          },
          {
            type: "mech",
            text: "The balance of the design mix depends on the <strong>target market</strong>; luxury consumers weight aesthetics heavily, while industrial buyers prioritise function and durability."
          }
        ]
      },
      {
        title: "SOCIAL & ETHICAL TRENDS",
        items: [
          {
            type: "mech",
            text: "Growing consumer awareness of <strong>environmental impact</strong> is pushing firms to design for sustainability — using recyclable materials, reducing packaging, and designing products for longer lifespans."
          },
          {
            type: "imp",
            text: "<strong>Ethical sourcing</strong> (using suppliers who treat workers fairly and minimise environmental harm) has become a design consideration, not just a PR exercise; firms like Patagonia have built their entire brand around it.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Design links to branding and competitive advantage; a product that looks better, works better, or is more ethically produced than rivals creates a USP that justifies premium pricing."
          }
        ]
      }
    ],
    flow: {
      steps: ["Identify target market priorities", "Balance function, aesthetics and cost", "Incorporate ethical/social trends"],
      result: "Product design that differentiates and attracts the target market",
      resultType: "good"
    },
    takeaway: [
      "The design mix is a trade-off; no product can maximise function, aesthetics and low cost simultaneously.",
      "Social trends are shifting the design mix; sustainability is now a competitive advantage, not a cost burden.",
      "Ethical sourcing builds brand trust and loyalty, particularly among younger consumers."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 4: Promotion and Branding
   * ───────────────────────────────────────────────── */
  {
    title: "Promotion and Branding",
    meta: "5 concepts",
    keyIdea: "Promotion is not just advertising; it is any communication designed to inform, persuade or remind customers, and the right method depends on the product, target audience and budget available.",
    blocks: [
      {
        title: "TYPES OF PROMOTION",
        items: [
          {
            type: "def",
            text: "<strong>Above-the-line promotion</strong> — paid advertising through mass media (TV, radio, newspapers, online display ads) aimed at reaching a large, broad audience."
          },
          {
            type: "def",
            text: "<strong>Below-the-line promotion</strong> — targeted promotional activities such as direct mail, loyalty schemes, sales promotions, public relations, sponsorship and point-of-sale displays."
          },
          {
            type: "mech",
            text: "<strong>Viral marketing</strong> uses social media sharing to spread brand messages rapidly at low cost; a single creative campaign can reach millions, but firms cannot control the message once it is shared.",
            tag: "exam"
          }
        ]
      },
      {
        title: "BRANDING & EVALUATION",
        items: [
          {
            type: "mech",
            text: "Strong <strong>branding</strong> differentiates the product in the customer's mind, enables premium pricing, builds loyalty and creates barriers to entry that protect long-term profitability."
          },
          {
            type: "imp",
            text: "Promotional spending must be evaluated against <strong>return on investment</strong>; a TV campaign costing millions only makes sense if the resulting sales increase exceeds the cost.",
            tag: "exam"
          },
          {
            type: "mech",
            text: "Digital promotion allows <strong>precise targeting</strong> through data analytics; firms can reach specific demographics on platforms like Instagram or TikTok at a fraction of traditional media costs."
          },
          {
            type: "link",
            text: "Promotion links to the rest of the marketing mix; a premium product needs aspirational promotion, while a budget product benefits from price-focused messaging and sales promotions."
          }
        ]
      }
    ],
    flow: {
      steps: ["Identify target audience", "Choose appropriate promotion mix", "Monitor results and adjust spend"],
      result: "Cost-effective increase in awareness and sales",
      resultType: "good"
    },
    takeaway: [
      "Above-the-line reaches mass audiences; below-the-line targets specific customer groups.",
      "Digital and viral marketing offer low-cost reach but with less control over the message.",
      "Promotion must match the product positioning; premium products need aspirational communication."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 5: Pricing Strategies
   * ───────────────────────────────────────────────── */
  {
    title: "Pricing Strategies",
    meta: "6 concepts",
    keyIdea: "Price is the only element of the marketing mix that directly generates revenue; the right pricing strategy depends on the firm's objectives, competitive position, and price elasticity of demand.",
    blocks: [
      {
        title: "KEY PRICING METHODS",
        items: [
          {
            type: "def",
            text: "<strong>Cost-plus pricing</strong> — adding a fixed percentage mark-up to the unit cost of production; simple to calculate and guarantees a margin, but ignores what customers are willing to pay."
          },
          {
            type: "def",
            text: "<strong>Price skimming</strong> — setting a high initial price for a new or innovative product, then gradually lowering it; this extracts maximum revenue from early adopters before targeting price-sensitive consumers.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Penetration pricing</strong> — setting a low initial price to attract customers and build market share quickly, then raising prices once a customer base is established.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Competitive pricing</strong> — setting prices at or near competitor levels; common in markets with many substitutes where firms are effectively price takers."
          }
        ]
      },
      {
        title: "CHOOSING A STRATEGY",
        items: [
          {
            type: "mech",
            text: "Price skimming works when demand is <strong>inelastic</strong> (few substitutes, innovative product); penetration pricing works when demand is <strong>elastic</strong> and the firm needs volume to achieve economies of scale."
          },
          {
            type: "imp",
            text: "Pricing must be consistent with the rest of the marketing mix; a luxury brand using penetration pricing <strong>undermines its image</strong>, while a budget brand using skimming alienates its target market.",
            tag: "exam"
          },
          {
            type: "mech",
            text: "<strong>Dynamic pricing</strong> uses algorithms to adjust prices in real-time based on demand; airlines and ride-hailing apps like Uber use this to maximise revenue at peak times."
          },
          {
            type: "link",
            text: "Pricing strategy links directly to PED; a firm must understand its demand elasticity before choosing a strategy, otherwise a price increase intended to boost revenue could actually reduce it."
          }
        ]
      }
    ],
    flow: {
      steps: ["Analyse PED and competition", "Select appropriate pricing method", "Align price with product, promotion and place"],
      result: "Pricing strategy that maximises revenue within the marketing mix",
      resultType: "good"
    },
    examMatters: "Examiners want you to justify a pricing strategy by linking it to the business context. Do not just describe what skimming or penetration pricing is — explain why it suits this particular firm, market and product, and evaluate whether it will achieve the stated objective.",
    takeaway: [
      "Cost-plus is simple but ignores the market; competition-based pricing sacrifices margin control.",
      "Skimming suits innovative products with inelastic demand; penetration suits elastic markets needing volume.",
      "Price must be consistent with the product, promotion and place to avoid sending mixed signals."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 6: Distribution (Place)
   * ───────────────────────────────────────────────── */
  {
    title: "Distribution (Place)",
    meta: "5 concepts",
    keyIdea: "Even the best product fails if customers cannot access it; distribution is about getting the right product to the right place at the right time, and digital channels are transforming how this works.",
    blocks: [
      {
        title: "DISTRIBUTION CHANNELS",
        items: [
          {
            type: "def",
            text: "<strong>Distribution channel</strong> — the route a product takes from the manufacturer to the final consumer; this can involve wholesalers, retailers, agents or direct selling."
          },
          {
            type: "mech",
            text: "<strong>Direct distribution</strong> (manufacturer to consumer) maximises margin and customer relationship control but requires the firm to handle all logistics, storage and delivery."
          },
          {
            type: "mech",
            text: "Using <strong>intermediaries</strong> (wholesalers and retailers) reduces logistical burden and provides wider market reach, but each intermediary takes a margin, reducing the producer's share of the final price."
          }
        ]
      },
      {
        title: "MODERN DISTRIBUTION",
        items: [
          {
            type: "mech",
            text: "<strong>E-commerce</strong> has enabled direct-to-consumer selling on a global scale; brands like Nike have shifted heavily toward their own online store to capture higher margins and customer data.",
            tag: "exam"
          },
          {
            type: "imp",
            text: "<strong>Multi-channel distribution</strong> combines physical stores, online platforms and third-party marketplaces to reach customers wherever they prefer to shop, but adds complexity and cost to manage.",
            tag: "exam"
          },
          {
            type: "mech",
            text: "Social media platforms are becoming <strong>direct sales channels</strong>; Instagram Shopping and TikTok Shop allow consumers to discover and purchase products without leaving the app."
          },
          {
            type: "link",
            text: "Distribution links to the overall marketing mix; a luxury product needs selective distribution (few high-end outlets), while a mass-market product needs intensive distribution (available everywhere)."
          }
        ]
      }
    ],
    flow: {
      steps: ["Evaluate target market and product type", "Choose direct, indirect or multi-channel", "Balance reach against margin and control"],
      result: "Distribution strategy aligned with marketing mix",
      resultType: "good"
    },
    takeaway: [
      "Direct distribution maximises margins and control; indirect distribution maximises reach.",
      "E-commerce has shifted power from retailers to manufacturers who can now sell directly to consumers.",
      "Multi-channel strategies offer maximum reach but require careful management to avoid channel conflict."
    ]
  }

];

/* ═══════════════════════════════════════════════════════════
 *  1.3.4 — Managing People
 * ═══════════════════════════════════════════════════════════ */

const NOTES_134 = [

  /* ─────────────────────────────────────────────────
   *  Chapter 1: Approaches to Staffing
   * ───────────────────────────────────────────────── */
  {
    title: "Approaches to Staffing",
    meta: "6 concepts",
    keyIdea: "How a firm views its workforce — as an asset to develop or a cost to minimise — shapes every HR decision from recruitment to redundancy and determines whether employees become a source of competitive advantage.",
    blocks: [
      {
        title: "STAFF AS ASSET vs COST",
        items: [
          {
            type: "def",
            text: "<strong>Staff as an asset</strong> — the view that employees are the most valuable resource; the firm invests in training, development and welfare to build long-term capability and loyalty."
          },
          {
            type: "def",
            text: "<strong>Staff as a cost</strong> — the view that labour is an expense to be minimised; the firm focuses on keeping wages low, using temporary contracts and outsourcing where possible.",
            tag: "exam"
          },
          {
            type: "mech",
            text: "Firms treating staff as assets tend to have <strong>lower labour turnover</strong>, higher productivity and better customer service, but face higher short-term costs from training and competitive salaries."
          }
        ]
      },
      {
        title: "FLEXIBLE WORKFORCE & EMPLOYMENT LAW",
        items: [
          {
            type: "def",
            text: "<strong>Flexible workforce</strong> — the use of part-time, temporary, freelance or zero-hours contracts to match labour supply to fluctuating demand; it reduces fixed costs but can lower commitment and morale."
          },
          {
            type: "mech",
            text: "<strong>Dismissal</strong> is the termination of employment due to the employee's conduct or capability, while <strong>redundancy</strong> occurs when the job itself ceases to exist; the legal processes and costs differ significantly."
          },
          {
            type: "imp",
            text: "Strong <strong>employer-employee relations</strong> reduce absenteeism, grievances and industrial action; firms that consult employees on changes and treat them fairly build a cooperative culture that boosts productivity.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Staffing approach links directly to motivation theory; treating staff as assets aligns with Herzberg's motivators (recognition, development), while the cost approach reflects Taylor's view of workers motivated solely by pay."
          }
        ]
      }
    ],
    flow: {
      steps: ["Firm views staff as asset", "Invests in training and development", "Employees become more productive and loyal"],
      result: "Lower turnover, higher output, competitive advantage",
      resultType: "good"
    },
    examMatters: "Examiners want you to evaluate whether treating staff as an asset or a cost is more appropriate by linking to context. A call centre with high turnover and routine tasks may rationally treat staff as a cost, while a technology firm relying on skilled knowledge workers should treat staff as assets.",
    takeaway: [
      "The asset approach builds long-term capability; the cost approach minimises short-term expenditure.",
      "Flexible workforces reduce fixed costs but risk lowering morale and productivity.",
      "Dismissal is about the employee's behaviour; redundancy is about the job disappearing."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 2: Recruitment, Selection and Training
   * ───────────────────────────────────────────────── */
  {
    title: "Recruitment, Selection and Training",
    meta: "5 concepts",
    keyIdea: "Hiring the right people and training them properly is one of the highest-return investments a firm can make; getting recruitment wrong is extremely expensive because of wasted training, low productivity and the cost of re-hiring.",
    blocks: [
      {
        title: "RECRUITMENT & SELECTION",
        items: [
          {
            type: "def",
            text: "<strong>Internal recruitment</strong> — filling a vacancy from within the existing workforce through promotion or redeployment; it is cheaper, faster and motivates existing staff, but limits the pool of candidates and may create another vacancy."
          },
          {
            type: "def",
            text: "<strong>External recruitment</strong> — attracting candidates from outside the organisation through job advertisements, agencies, social media or graduate schemes; it brings fresh ideas and skills but is more expensive and time-consuming."
          },
          {
            type: "mech",
            text: "The <strong>selection process</strong> typically includes application screening, interviews, aptitude tests and references; structured interviews and skills testing are more reliable predictors of job performance than unstructured conversations."
          }
        ]
      },
      {
        title: "TRAINING",
        items: [
          {
            type: "def",
            text: "<strong>On-the-job training</strong> — learning while doing the actual job, guided by experienced colleagues; it is practical and cheap but quality varies and can disrupt normal work.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Off-the-job training</strong> — learning away from the workplace through courses, workshops or qualifications; it develops broader skills and knowledge but is more expensive and takes employees away from productive work."
          },
          {
            type: "imp",
            text: "Training is an investment, not just a cost; well-trained staff are more productive, make fewer mistakes, require less supervision and provide better customer service.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Training links to motivation; Herzberg's theory suggests personal growth and development are key motivators, so investing in training can simultaneously improve skills and job satisfaction."
          }
        ]
      }
    ],
    flow: {
      steps: ["Identify vacancy and write job description", "Recruit internally or externally", "Select through interviews and tests", "Train new hire on-the-job or off-the-job"],
      result: "Productive employee contributing to objectives",
      resultType: "good"
    },
    takeaway: [
      "Internal recruitment is cheap and motivating but limits fresh thinking; external recruitment brings new ideas at higher cost.",
      "On-the-job training is practical; off-the-job training builds broader skills — most firms need both.",
      "Poor recruitment is expensive; getting the right person first time saves far more than any training budget."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 3: Organisational Design
   * ───────────────────────────────────────────────── */
  {
    title: "Organisational Design",
    meta: "6 concepts",
    keyIdea: "Organisational structure determines how information flows, decisions are made and accountability is assigned; the wrong structure creates bottlenecks, slow decisions and frustrated employees.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Hierarchy</strong> — the levels of authority within an organisation from the most senior (top) to the most junior (bottom); each level has power over the level below it."
          },
          {
            type: "def",
            text: "<strong>Span of control</strong> — the number of subordinates directly reporting to one manager; a wide span means many direct reports, a narrow span means few.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Chain of command</strong> — the formal line of authority from the top of the organisation to the bottom, through which instructions are passed and accountability flows upward."
          }
        ]
      },
      {
        title: "STRUCTURAL TYPES",
        items: [
          {
            type: "mech",
            text: "<strong>Tall structures</strong> have many hierarchical levels and narrow spans of control; they provide close supervision and clear promotion paths but slow decision-making and create communication barriers."
          },
          {
            type: "mech",
            text: "<strong>Flat structures</strong> have few levels and wide spans of control; they enable faster communication, quicker decisions and greater employee autonomy, but managers may become overloaded."
          },
          {
            type: "mech",
            text: "A <strong>matrix structure</strong> organises employees into project teams drawn from different functional departments; it improves flexibility and collaboration but can create confusion over who has authority.",
            tag: "exam"
          },
          {
            type: "imp",
            text: "Many firms are <strong>delayering</strong> (removing hierarchical levels) to cut costs and speed up decisions; however, this increases workload on remaining managers and can damage morale if it leads to redundancies."
          },
          {
            type: "link",
            text: "Structure links to motivation and leadership; flat structures align with democratic leadership and delegation, while tall structures suit autocratic management where close control is needed."
          }
        ]
      }
    ],
    flow: {
      steps: ["Firm delayers hierarchy", "Fewer management levels, wider spans", "Faster decisions and lower costs"],
      result: "More responsive organisation but risk of managerial overload",
      resultType: "good"
    },
    misconception: "Students say flat structures are always better than tall structures. Wrong because the right structure depends on the business; a nuclear power plant needs tight supervision (tall/narrow span) for safety, while a creative agency benefits from autonomy (flat/wide span). Instead write: the optimal structure depends on the nature of the work, the skills of employees and the degree of control required.",
    takeaway: [
      "Wide span of control gives autonomy but risks overloading managers; narrow span gives control but slows decisions.",
      "Flat structures suit dynamic, skilled workforces; tall structures suit environments requiring close supervision.",
      "Matrix structures offer flexibility but can cause confusion about authority and accountability."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 4: Motivation in Theory
   * ───────────────────────────────────────────────── */
  {
    title: "Motivation in Theory",
    meta: "6 concepts",
    keyIdea: "Four key theorists explain why people work hard: Taylor said money, Mayo said social needs, Maslow said a hierarchy of needs, and Herzberg said the work itself — each theory has different implications for how firms should manage staff.",
    blocks: [
      {
        title: "TAYLOR & MAYO",
        items: [
          {
            type: "def",
            text: "<strong>Taylor's scientific management</strong> — workers are primarily motivated by money; managers should break tasks into small, repetitive steps, find the 'one best way' to do each task, and pay workers piece-rate to maximise output.",
            tag: "exam"
          },
          {
            type: "mech",
            text: "Taylor's approach increases <strong>productivity in routine tasks</strong> but treats workers as machines, leading to boredom, high turnover and resistance to change — Henry Ford's assembly line is the classic example."
          },
          {
            type: "def",
            text: "<strong>Mayo's Human Relations theory</strong> — workers are motivated by social needs and recognition; the Hawthorne experiments showed that attention from management and good team relationships improved output more than physical conditions or pay alone."
          },
          {
            type: "mech",
            text: "Mayo proved that <strong>informal work groups</strong> and a sense of belonging significantly affect productivity; managers should foster teamwork and consult employees rather than just directing them."
          }
        ]
      },
      {
        title: "MASLOW & HERZBERG",
        items: [
          {
            type: "def",
            text: "<strong>Maslow's hierarchy of needs</strong> — five levels of human needs from basic (physiological, safety) to higher-order (social, esteem, self-actualisation); lower needs must be satisfied before higher needs motivate behaviour.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Herzberg's two-factor theory</strong> — <strong>hygiene factors</strong> (pay, conditions, job security) prevent dissatisfaction but do not motivate; true motivation comes from <strong>motivators</strong> (achievement, recognition, responsibility, personal growth).",
            tag: "exam"
          },
          {
            type: "imp",
            text: "Herzberg's key insight is that <strong>removing dissatisfaction is not the same as creating motivation</strong>; raising pay stops complaints but does not inspire extra effort — only enriching the work itself does that."
          },
          {
            type: "link",
            text: "Motivation theory links to HR practices; Taylor justifies piece-rate pay, Mayo justifies teamwork, Maslow justifies a range of rewards, and Herzberg justifies job enrichment and delegation."
          }
        ]
      }
    ],
    examMatters: "Examiners want you to apply motivation theory to specific business contexts, not just describe the theory. Explain which theory best fits the workforce in question — Taylor may suit a warehouse with routine tasks, while Herzberg suits a software company where creativity matters.",
    takeaway: [
      "Taylor = money motivates; Mayo = social needs motivate; Maslow = hierarchy of needs; Herzberg = the work itself motivates.",
      "Herzberg's distinction between hygiene factors and motivators is the most frequently tested concept.",
      "No single theory is universally correct; the best approach depends on the workforce and the nature of the work."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 5: Motivation in Practice
   * ───────────────────────────────────────────────── */
  {
    title: "Motivation in Practice",
    meta: "6 concepts",
    keyIdea: "Theory becomes useful only when translated into practice; firms must choose the right blend of financial and non-financial motivators based on the type of work, workforce expectations and budget constraints.",
    blocks: [
      {
        title: "FINANCIAL METHODS",
        items: [
          {
            type: "def",
            text: "<strong>Piece-rate pay</strong> — payment per unit of output produced; it directly incentivises higher output (Taylor's approach) but can lead to quality problems if workers rush to produce more."
          },
          {
            type: "def",
            text: "<strong>Performance-related pay (PRP)</strong> — bonuses or salary increases linked to individual targets or appraisal outcomes; it rewards high performers but can create unhealthy competition and demotivate those who miss targets."
          },
          {
            type: "mech",
            text: "<strong>Profit sharing and share ownership</strong> schemes align employee interests with company performance; when staff own shares, they think more like owners and are motivated to increase long-term value.",
            tag: "exam"
          }
        ]
      },
      {
        title: "NON-FINANCIAL METHODS",
        items: [
          {
            type: "def",
            text: "<strong>Job enrichment</strong> — redesigning a role to include more challenging, varied and meaningful tasks, giving the employee greater responsibility; this directly applies Herzberg's motivators.",
            tag: "exam"
          },
          {
            type: "mech",
            text: "<strong>Delegation</strong> involves passing authority to subordinates to make decisions; it develops their skills, shows trust, and frees managers to focus on strategic tasks."
          },
          {
            type: "mech",
            text: "<strong>Empowerment</strong> goes further than delegation by giving employees genuine control over how they do their work; empowered teams at companies like Google and 3M have driven major innovations."
          },
          {
            type: "imp",
            text: "Non-financial methods often have a <strong>longer-lasting motivational effect</strong> than pay rises; Herzberg's research showed that salary increases are quickly taken for granted, but meaningful work continues to motivate.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Motivation methods link to leadership style; autocratic leaders rely on financial incentives and control, while democratic leaders use empowerment and delegation to motivate through involvement."
          }
        ]
      }
    ],
    flow: {
      steps: ["Diagnose workforce needs (routine vs creative)", "Choose appropriate financial + non-financial mix", "Monitor productivity, morale and turnover"],
      result: "Motivated workforce delivering business objectives",
      resultType: "good"
    },
    misconception: "Students say money is the best motivator. Wrong because Herzberg's research shows that pay is a hygiene factor that prevents dissatisfaction but does not create lasting motivation. Instead write: financial rewards are necessary to attract and retain staff, but non-financial methods like job enrichment, delegation and empowerment are more effective at sustaining long-term motivation and engagement.",
    takeaway: [
      "Financial incentives attract and retain staff but rarely sustain long-term motivation.",
      "Job enrichment and empowerment address Herzberg's motivators and create lasting engagement.",
      "The best approach combines financial security with meaningful, challenging work."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 6: Leadership Styles
   * ───────────────────────────────────────────────── */
  {
    title: "Leadership Styles",
    meta: "6 concepts",
    keyIdea: "Leadership is about influencing people toward a vision, not just managing processes; the most effective leaders adapt their style to the situation rather than applying one approach to every scenario.",
    blocks: [
      {
        title: "MANAGEMENT vs LEADERSHIP",
        items: [
          {
            type: "def",
            text: "<strong>Management</strong> — the process of organising resources, setting targets and monitoring performance to achieve objectives; managers focus on systems, control and efficiency."
          },
          {
            type: "def",
            text: "<strong>Leadership</strong> — the ability to inspire, motivate and influence others to achieve a shared vision; leaders focus on direction, innovation and change.",
            tag: "exam"
          },
          {
            type: "mech",
            text: "Effective organisations need both; <strong>managers ensure the business runs smoothly today</strong>, while <strong>leaders prepare the business for tomorrow</strong>."
          }
        ]
      },
      {
        title: "LEADERSHIP STYLES",
        items: [
          {
            type: "def",
            text: "<strong>Autocratic leadership</strong> — the leader makes all decisions without consulting the workforce; it is fast and clear but can demotivate skilled employees who want input."
          },
          {
            type: "def",
            text: "<strong>Democratic leadership</strong> — the leader consults employees and considers their views before making decisions; it improves morale and idea generation but slows decision-making."
          },
          {
            type: "def",
            text: "<strong>Laissez-faire leadership</strong> — the leader sets the vision but delegates almost all decision-making to employees; it suits highly skilled, self-motivated teams but can lead to drift and inconsistency."
          },
          {
            type: "mech",
            text: "<strong>Paternalistic leadership</strong> — the leader acts in the best interests of employees like a parent, consulting and explaining decisions; it builds loyalty but can feel patronising to experienced staff.",
            tag: "exam"
          },
          {
            type: "imp",
            text: "As a business grows from a start-up to a larger organisation, the founder must often <strong>transition from entrepreneur to leader</strong>, delegating operational control and developing a management team rather than making every decision personally."
          },
          {
            type: "link",
            text: "Leadership style links to organisational structure; autocratic leadership fits tall hierarchies with narrow spans, while democratic and laissez-faire styles suit flat structures with wide spans and empowered teams."
          }
        ]
      }
    ],
    flow: {
      steps: ["Assess situation (crisis, creative project, routine task)", "Choose appropriate leadership style", "Adapt as circumstances change"],
      result: "Leadership style matched to context for maximum effectiveness",
      resultType: "good"
    },
    examMatters: "Examiners reward answers that evaluate which leadership style suits the context rather than stating one style is universally best. In a crisis (e.g. factory fire), autocratic leadership is appropriate. For a product design brainstorm, democratic or laissez-faire works better.",
    takeaway: [
      "Management is about control and efficiency; leadership is about vision and inspiration — firms need both.",
      "No single leadership style is best; effective leaders adapt to the situation and the workforce.",
      "As firms grow, founders must evolve from hands-on entrepreneurs to strategic leaders who delegate."
    ]
  }

];

/* ═══════════════════════════════════════════════════════════
 *  1.3.5 — Entrepreneurs and Leaders
 * ═══════════════════════════════════════════════════════════ */

const NOTES_135 = [

  /* ─────────────────────────────────────────────────
   *  Chapter 1: The Role of an Entrepreneur
   * ───────────────────────────────────────────────── */
  {
    title: "The Role of an Entrepreneur",
    meta: "5 concepts",
    keyIdea: "Entrepreneurs do far more than start businesses; they spot opportunities others miss, take calculated risks, organise resources and create value — and increasingly they do this from inside existing organisations too.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Entrepreneur</strong> — an individual who takes the initiative to combine land, labour and capital to create a good or service, bearing the financial risk in the hope of making a profit."
          },
          {
            type: "def",
            text: "<strong>Intrapreneurship</strong> — entrepreneurial behaviour within an existing organisation; employees identify opportunities and drive innovation from inside the firm, taking risks with the company's resources rather than their own.",
            tag: "exam"
          }
        ]
      },
      {
        title: "ROLES & BARRIERS",
        items: [
          {
            type: "mech",
            text: "Entrepreneurs perform three key functions: <strong>creating</strong> the business idea, <strong>running</strong> day-to-day operations in the early stages, and <strong>expanding</strong> the business by identifying growth opportunities and securing finance."
          },
          {
            type: "mech",
            text: "<strong>Barriers to entrepreneurship</strong> include lack of finance, lack of experience, fear of failure, regulatory hurdles and market entry barriers; these explain why many would-be entrepreneurs never start."
          },
          {
            type: "imp",
            text: "Government policies such as <strong>start-up loans, tax relief and reduced regulation</strong> can lower barriers to entry and encourage more people to become entrepreneurs, boosting economic growth and job creation.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Intrapreneurship links to motivation theory; empowered employees who are given freedom to innovate (Herzberg's motivators) can drive entrepreneurial thinking without leaving the company — Google's '20% time' policy is a famous example."
          }
        ]
      }
    ],
    flow: {
      steps: ["Entrepreneur spots market opportunity", "Takes calculated risk with resources", "Creates business and generates value"],
      result: "New product, jobs and economic growth",
      resultType: "good"
    },
    takeaway: [
      "Entrepreneurs create, run and expand businesses by combining resources and bearing risk.",
      "Intrapreneurs innovate inside existing firms, driving growth without starting from scratch.",
      "Barriers to entry are real but can be reduced by government policy and personal resilience."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 2: Entrepreneurial Motives and
   *             Characteristics
   * ───────────────────────────────────────────────── */
  {
    title: "Entrepreneurial Motives and Characteristics",
    meta: "5 concepts",
    keyIdea: "Not all entrepreneurs are motivated by profit; understanding the full range of motives — from financial independence to making a social impact — explains why different entrepreneurs build very different types of businesses.",
    blocks: [
      {
        title: "SKILLS & CHARACTERISTICS",
        items: [
          {
            type: "def",
            text: "<strong>Key entrepreneurial characteristics</strong> — creativity, risk-taking, determination, resilience, self-confidence and the ability to spot and act on opportunities that others overlook."
          },
          {
            type: "mech",
            text: "Successful entrepreneurs combine <strong>hard skills</strong> (financial literacy, marketing knowledge, operational understanding) with <strong>soft skills</strong> (leadership, communication, networking) — lacking either set significantly reduces the chance of success."
          },
          {
            type: "imp",
            text: "Entrepreneurial skills can be <strong>developed through experience and education</strong>, not just innate talent; programmes like Young Enterprise and university incubators help build these capabilities.",
            tag: "exam"
          }
        ]
      },
      {
        title: "FINANCIAL & NON-FINANCIAL MOTIVES",
        items: [
          {
            type: "mech",
            text: "<strong>Financial motives</strong> include profit maximisation, wealth accumulation and financial independence; many entrepreneurs are driven by the desire to control their own income rather than be limited by an employer's salary structure."
          },
          {
            type: "mech",
            text: "<strong>Non-financial motives</strong> include independence (being your own boss), pursuing a passion, achieving work-life balance, building something meaningful, and making a positive social or environmental impact.",
            tag: "exam"
          },
          {
            type: "imp",
            text: "Social entrepreneurs like Muhammad Yunus (Grameen Bank) prioritise <strong>social objectives</strong> over profit; they use business methods to solve social problems, blurring the line between charity and enterprise."
          },
          {
            type: "link",
            text: "Entrepreneurial motives link to business objectives; a profit-motivated founder builds a different business from one motivated by social impact, which affects every decision from pricing to reinvestment."
          }
        ]
      }
    ],
    misconception: "Students say entrepreneurs are born, not made. Wrong because while some personality traits help, skills like financial management, networking and strategic thinking can all be learned and developed. Instead write: entrepreneurial success depends on a combination of personality traits and learnable skills; determination and resilience matter as much as natural creativity.",
    takeaway: [
      "Entrepreneurs need both hard skills (finance, marketing) and soft skills (leadership, communication).",
      "Financial motives drive many entrepreneurs, but independence and social impact are equally powerful drivers.",
      "Entrepreneurial skills can be developed; education and experience matter as much as innate traits."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 3: Business Objectives
   * ───────────────────────────────────────────────── */
  {
    title: "Business Objectives",
    meta: "6 concepts",
    keyIdea: "Businesses rarely pursue a single objective; survival, profit, growth, market share and social goals often compete for priority, and the dominant objective changes as the firm evolves through its life cycle.",
    blocks: [
      {
        title: "COMMON OBJECTIVES",
        items: [
          {
            type: "def",
            text: "<strong>Survival</strong> — the primary objective for most start-ups and firms in financial difficulty; staying in business takes precedence over profit maximisation during the first year or a recession."
          },
          {
            type: "def",
            text: "<strong>Profit maximisation</strong> — achieving the highest possible profit by finding the output level where total revenue exceeds total cost by the greatest amount; this is often assumed to be the main business objective.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Growth</strong> — expanding output, revenue or market presence; growth objectives may include increasing sales volume, opening new locations, or entering new markets."
          },
          {
            type: "def",
            text: "<strong>Market share</strong> — the percentage of total market sales captured by one firm; increasing market share strengthens bargaining power with suppliers and deters new entrants."
          }
        ]
      },
      {
        title: "BROADER OBJECTIVES & CONFLICTS",
        items: [
          {
            type: "mech",
            text: "<strong>Customer satisfaction</strong> objectives focus on building loyalty and repeat business; firms like Amazon and John Lewis have built market dominance by prioritising the customer experience above short-term margins."
          },
          {
            type: "mech",
            text: "<strong>Social and ethical objectives</strong> include reducing environmental impact, supporting local communities and ensuring fair working conditions; these are increasingly important for brand reputation and customer loyalty.",
            tag: "exam"
          },
          {
            type: "imp",
            text: "<strong>Conflicts between objectives</strong> are inevitable; pursuing rapid growth may sacrifice short-term profit, maximising profit may damage customer satisfaction, and social objectives may increase costs — managers must balance competing priorities.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Business objectives link to entrepreneurial motives; a founder motivated by profit will set different objectives from one motivated by social impact, and this shapes the entire strategic direction of the firm."
          }
        ]
      }
    ],
    flow: {
      steps: ["Start-up focuses on survival", "Established firm targets profit and growth", "Objectives conflict and must be balanced"],
      result: "Strategic priorities evolve as the business matures",
      resultType: "good"
    },
    examMatters: "Examiners frequently ask whether profit is the most important business objective. A strong answer recognises that survival must come first, profit funds everything else, but customer satisfaction and social objectives increasingly determine long-term success. Always link to the business context — a start-up has different priorities from a multinational.",
    takeaway: [
      "Survival is the first priority; without it, no other objective matters.",
      "Profit maximisation funds growth and rewards risk, but it is not the only valid objective.",
      "Objective conflicts are normal; effective management means balancing competing goals, not eliminating them."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 4: Business Choices
   * ───────────────────────────────────────────────── */
  {
    title: "Business Choices",
    meta: "4 concepts",
    keyIdea: "Every business decision involves giving something up; opportunity cost forces entrepreneurs to think about what they sacrifice, not just what they gain, making it the most fundamental concept in business economics.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Opportunity cost</strong> — the value of the next best alternative forgone when a decision is made; if a firm spends \u00a3100,000 on marketing, the opportunity cost is the best alternative use of that money, such as new equipment.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Trade-off</strong> — the exchange that occurs when choosing one option means sacrificing another; businesses face trade-offs between price and quality, short-term profit and long-term investment, and growth and financial stability."
          }
        ]
      },
      {
        title: "APPLICATION IN DECISION-MAKING",
        items: [
          {
            type: "mech",
            text: "Every resource allocation decision has an opportunity cost; a sole trader who quits a \u00a340,000 salary to start a business has an opportunity cost of \u00a340,000 per year <strong>plus</strong> whatever else they could have invested that time in."
          },
          {
            type: "mech",
            text: "Firms face constant <strong>trade-offs</strong>: investing in R&D sacrifices current profit for future innovation; cutting prices boosts volume but reduces margin; expanding too fast may overstretch cash flow."
          },
          {
            type: "imp",
            text: "Good decision-making requires <strong>explicit consideration of opportunity cost</strong>; firms that focus only on the benefits of a chosen option without considering what they give up are likely to misallocate resources.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Opportunity cost links to every area of business; it underpins financial decisions (invest or distribute profit), marketing decisions (spend on TV ads or social media) and HR decisions (train existing staff or recruit new ones)."
          }
        ]
      }
    ],
    flow: {
      steps: ["Identify all feasible options", "Evaluate the benefits and costs of each", "Choose the option with the greatest net benefit"],
      result: "Resources allocated to their highest-value use",
      resultType: "good"
    },
    misconception: "Students think opportunity cost is just the money spent. Wrong because opportunity cost is the value of the best alternative not chosen, which may not be measured in money alone. Instead write: opportunity cost includes time, effort and alternative uses of resources, not just cash expenditure; a founder's time has an opportunity cost even if they do not pay themselves a salary.",
    examMatters: "Examiners want you to identify the specific opportunity cost in context, not just state the definition. If a firm chooses to spend on new premises instead of marketing, name the marketing campaign as the opportunity cost and evaluate whether the premises will generate more value.",
    takeaway: [
      "Opportunity cost is the value of the next best alternative forgone, not just the money spent.",
      "Every business decision involves trade-offs; the goal is to choose where resources create the most value.",
      "Explicitly stating the opportunity cost in exam answers shows depth of economic understanding."
    ]
  }

];

/* ═══════════════════════════════════════════════════════════
 *  RUNNER — push all 4 sections to Supabase
 * ═══════════════════════════════════════════════════════════ */

const SECTIONS = [
  { id: 'the-market',              label: '1.3.2 The Market',                notes: NOTES_132 },
  { id: 'marketing-mix-strategy',  label: '1.3.3 Marketing Mix & Strategy', notes: NOTES_133 },
  { id: 'managing-people',         label: '1.3.4 Managing People',          notes: NOTES_134 },
  { id: 'entrepreneurs-leaders',   label: '1.3.5 Entrepreneurs & Leaders',  notes: NOTES_135 },
];

async function main() {
  console.log('═══════════════════════════════════════════════');
  console.log('  BUSINESS UNIT 1 — Rich Notes Updater');
  console.log('  Sections: 4 | Format: rich blocks + flows');
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
  }

  console.log(allSuccess ? '\n✅ All 4 sections updated.' : '\n⚠ Some sections failed.');
}

main();
