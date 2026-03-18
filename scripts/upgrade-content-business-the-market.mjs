/**
 * SECTION UPGRADE — The Market (Business 1.3.2)
 * ==========================================================
 * Edexcel IAL Business Unit 1, spec point 1.3.2
 * Run with: node scripts/upgrade-content-business-the-market.mjs
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL     || 'https://trweeckuswgkenckeqfb.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);

/* ── 1. SETTINGS ──────────────────────────────────────────────────────────── */

const SECTION_SLUG = 'the-market';
const SUBJECT_ID   = 'business';

/* ── 2. CONTENT ───────────────────────────────────────────────────────────── */

const CONTENT = [

  /* ═══ Block 1: Demand and Factors Affecting Demand ═══ */
  {
    title: "Demand and Factors Affecting Demand",
    quizIndices: [0],
    diagramRef: "demand-curve",
    sections: [
      {
        id: "what-is-demand",
        title: "What Is Demand?",
        keyIdea: "Demand is the quantity of a good consumers are willing and able to buy at each price — not just what they want, but what they can actually afford.",
        body: [
          {
            type: "paragraph",
            text: "**Demand** refers to the quantity of a product that consumers are willing and able to purchase at a given price in a given time period. The key phrase is \"willing and able\" — you might want a Ferrari, but unless you have the income to buy one, you do not represent effective demand."
          },
          {
            type: "paragraph",
            text: "The **law of demand** states that, ceteris paribus (all other things being equal), as the price of a good rises, the quantity demanded falls, and vice versa. This inverse relationship exists because higher prices reduce consumers' purchasing power and because cheaper substitutes become relatively more attractive."
          },
          {
            type: "flow",
            steps: ["Price of good rises", "Consumers' real income falls", "Some switch to substitutes"],
            result: "Quantity demanded decreases (movement along curve)",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "On a demand diagram, price is on the vertical axis and quantity on the horizontal axis. The demand curve slopes downward from left to right. A change in price causes a **movement along** the demand curve — not a shift."
          }
        ],
        realExample: {
          emoji: "🎮",
          text: "**Sony** cut the price of the PS5 in several markets to boost sales in 2024. As the price dropped, quantity demanded rose sharply — a textbook movement along the demand curve as gaming became affordable to a wider group of consumers."
        },
        misconception: "Students write \"demand falls when price rises\" without specifying quantity demanded. A change in price causes a movement along the demand curve, not a shift. Instead write: a rise in price causes a fall in the quantity demanded, shown as a movement along the demand curve.",
        examMatters: "Examiners deduct marks if you say \"demand shifts\" when you mean a price-driven change. Use the term \"quantity demanded\" for movements along the curve and reserve \"demand\" for shifts of the whole curve caused by non-price factors.",
        recall: {
          type: "fillin",
          prompt: "Complete the demand logic:",
          template: ["Demand is the quantity consumers are willing and ___ to buy", "A rise in price causes a ___ along the demand curve", "The demand curve slopes ___"],
          answers: ["able", "movement", "downward"],
          hints: ["ab__", "mov_____", "down____"]
        }
      },
      {
        id: "factors-shifting-demand",
        title: "Factors Causing a Shift in Demand",
        keyIdea: "When something other than price changes — income, tastes, substitutes, population — the entire demand curve moves left or right.",
        body: [
          {
            type: "paragraph",
            text: "A **shift in demand** means the entire demand curve moves to a new position. At every possible price, consumers now want to buy more (rightward shift) or less (leftward shift) than before. Shifts are caused by changes in **non-price factors**, not by a change in the good's own price."
          },
          {
            type: "subheading",
            text: "Key Factors That Shift Demand"
          },
          {
            type: "bullets",
            items: [
              "**Income**: if consumers' incomes rise, demand for most goods increases (rightward shift). These are called **normal goods**. For **inferior goods**, demand falls as income rises.",
              "**Price of substitutes**: if the price of a substitute rises, demand for your product increases as consumers switch across.",
              "**Price of complements**: if the price of a complementary good rises, demand for your product falls because the two are used together.",
              "**Tastes and preferences**: changes in fashion, trends or advertising can increase or decrease demand.",
              "**Population and demographics**: a growing population or a change in age structure can shift demand for particular products."
            ]
          },
          {
            type: "paragraph",
            text: "You must always identify the specific factor causing the shift and explain the direction. Saying \"demand increased\" without naming a non-price cause will cost you marks in an exam."
          }
        ],
        realExample: {
          emoji: "🥛",
          text: "**Oatly** experienced a massive rightward shift in demand for oat milk as consumer tastes moved toward plant-based diets in 2020-2023. This was not a price change — it was a shift driven by health awareness and environmental concerns, moving the whole demand curve to the right."
        },
        misconception: "Students confuse a movement along the curve with a shift. A lower price causes a movement along the curve, not a shift of demand. Instead write: only non-price factors such as income, tastes, or substitute prices cause a shift of the demand curve itself.",
        examMatters: "In diagram questions, examiners want you to label two demand curves (D1 and D2), show the direction of the shift, and state the specific non-price factor causing it. A shift without an identified cause earns partial marks at best.",
        recall: {
          type: "reorder",
          prompt: "Order these from cause to effect for a rightward demand shift:",
          correctOrder: ["Consumer incomes rise", "Consumers willing to buy more at every price", "Demand curve shifts right from D1 to D2", "Equilibrium price and quantity both increase"],
          shuffled: [2, 0, 3, 1]
        }
      }
    ],
    takeaway: [
      "Demand = willingness + ability to pay at each price.",
      "Price changes cause movements along the demand curve.",
      "Non-price factors (income, tastes, substitutes) shift the whole curve.",
      "Always specify the cause and direction of any demand shift."
    ]
  },

  /* ═══ Block 2: Supply and Factors Affecting Supply ═══ */
  {
    title: "Supply and Factors Affecting Supply",
    quizIndices: [1],
    diagramRef: "supply-curve",
    sections: [
      {
        id: "what-is-supply",
        title: "What Is Supply?",
        keyIdea: "Supply is the quantity of a good that firms are willing and able to offer for sale at each price — higher prices incentivise greater production.",
        body: [
          {
            type: "paragraph",
            text: "**Supply** refers to the quantity of a product that firms are willing and able to offer for sale at a given price in a given time period. Just as demand requires willingness and ability from consumers, supply requires that producers both want to sell and have the capacity to produce."
          },
          {
            type: "paragraph",
            text: "The **law of supply** states that, ceteris paribus, as the price of a good rises, the quantity supplied increases. This positive relationship exists because higher prices make production more profitable, encouraging existing firms to produce more and potentially attracting new firms into the market."
          },
          {
            type: "flow",
            steps: ["Price of good rises", "Profit margins increase", "Firms produce more output"],
            result: "Quantity supplied increases (movement along curve)",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "The supply curve slopes upward from left to right on a diagram. A change in the good's own price causes a **movement along** the supply curve. You should never describe a price change as \"supply shifting\" — that is a common error."
          }
        ],
        realExample: {
          emoji: "☀️",
          text: "**UK strawberry farmers** increase the quantity they supply during summer when retail prices are highest, and reduce output during off-peak months. The higher summer price makes extra labour and greenhouse costs worthwhile, showing the law of supply in action."
        },
        misconception: "Students write \"supply increases when price goes up\" without saying quantity supplied. A price change causes a movement along the supply curve, not a shift. Instead write: a rise in price leads to a rise in the quantity supplied, shown as a movement along the supply curve.",
        examMatters: "Just as with demand, examiners distinguish sharply between movements along the supply curve (price changes) and shifts (non-price factors). Precise language is essential — always specify whether you mean quantity supplied or supply itself.",
        recall: {
          type: "fillin",
          prompt: "Complete the supply logic:",
          template: ["Supply is the quantity firms are willing and ___ to sell", "The supply curve slopes ___ from left to right", "A rise in price causes a movement ___ the supply curve"],
          answers: ["able", "upward", "along"],
          hints: ["ab__", "up____", "al___"]
        }
      },
      {
        id: "factors-shifting-supply",
        title: "Factors Causing a Shift in Supply",
        keyIdea: "Changes in production costs, technology, taxes or the number of firms shift the whole supply curve — more supply means a rightward shift.",
        body: [
          {
            type: "paragraph",
            text: "A **shift in supply** occurs when the entire supply curve moves to a new position. At every price level, firms are now willing to supply more (rightward shift) or less (leftward shift). These shifts are caused by changes in conditions of supply — factors other than the good's own price."
          },
          {
            type: "subheading",
            text: "Key Factors That Shift Supply"
          },
          {
            type: "bullets",
            items: [
              "**Costs of production**: higher wages, raw material costs or rent shift supply left because producing each unit is more expensive.",
              "**Technology**: improved technology reduces unit costs, shifting supply to the right as firms can produce more at every price.",
              "**Indirect taxes and subsidies**: a tax raises costs and shifts supply left; a subsidy lowers costs and shifts supply right.",
              "**Number of firms**: more firms entering the market shifts market supply to the right.",
              "**External shocks**: natural disasters or supply-chain disruptions reduce supply capacity, shifting supply left."
            ]
          },
          {
            type: "paragraph",
            text: "You must be precise about the direction of the shift and the cause. A rightward shift means more is supplied at every price; a leftward shift means less is supplied at every price."
          }
        ],
        realExample: {
          emoji: "🔋",
          text: "**Tesla's** Gigafactory investments in battery production technology dramatically reduced the per-unit cost of lithium-ion batteries. This technological advancement shifted the supply curve for electric vehicles to the right, enabling Tesla to produce more cars at every price point."
        },
        misconception: "Students say \"supply shifts right because firms want to sell more.\" Wanting to sell more is not a supply shift — there must be a change in production conditions. Instead write: supply shifts right when production costs fall, technology improves, or subsidies are introduced, enabling firms to offer more at every price.",
        examMatters: "When drawing supply shifts, always label S1 and S2 clearly, state the specific factor causing the shift, and explain why it affects the cost or willingness to produce. Vague answers such as \"supply goes up\" without a causal factor will not score well.",
        recall: {
          type: "reorder",
          prompt: "Order these from cause to effect for a leftward supply shift:",
          correctOrder: ["Government imposes a new indirect tax", "Production costs increase for all firms", "Supply curve shifts left from S1 to S2", "Equilibrium price rises and quantity falls"],
          shuffled: [3, 1, 0, 2]
        }
      }
    ],
    takeaway: [
      "Supply = willingness + ability to sell at each price.",
      "Price changes cause movements along the supply curve.",
      "Cost changes, technology and taxes shift the whole curve.",
      "Always name the factor and direction when discussing shifts."
    ]
  },

  /* ═══ Block 3: Market Equilibrium ═══ */
  {
    title: "Market Equilibrium",
    quizIndices: [2],
    practiceIndices: [0],
    diagramRef: "equilibrium-diagram",
    sections: [
      {
        id: "equilibrium-price-and-quantity",
        title: "Equilibrium Price and Quantity",
        keyIdea: "Equilibrium is the price where quantity demanded equals quantity supplied — there is no tendency for the market to change.",
        body: [
          {
            type: "paragraph",
            text: "**Market equilibrium** occurs at the price where the quantity demanded by consumers exactly equals the quantity supplied by producers. At this point, there is no excess supply (surplus) and no excess demand (shortage), so there is no pressure for the price to change."
          },
          {
            type: "paragraph",
            text: "On a diagram, equilibrium is where the demand and supply curves intersect. The **equilibrium price** (Pe) is found on the vertical axis and the **equilibrium quantity** (Qe) on the horizontal axis. Any price above Pe creates a surplus — firms cannot sell all they produce, so they cut prices. Any price below Pe creates a shortage — consumers compete for limited stock, pushing prices up."
          },
          {
            type: "flow",
            steps: ["Price above equilibrium", "Surplus of unsold goods", "Firms lower prices to clear stock"],
            result: "Price falls back toward equilibrium",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "This self-correcting mechanism is called the **price mechanism**. Markets naturally move toward equilibrium because surpluses and shortages create incentives for buyers and sellers to adjust their behaviour."
          }
        ],
        realExample: {
          emoji: "🏠",
          text: "**UK housing markets** in areas like London show persistent excess demand because supply is constrained by planning regulations. When quantity demanded far exceeds quantity supplied at the current price, prices are pushed above the level most buyers can afford, demonstrating disequilibrium in action."
        },
        misconception: "Students write \"equilibrium means the market is fair or efficient.\" Equilibrium simply means quantity demanded equals quantity supplied — it says nothing about whether the price is affordable or the outcome is socially desirable. Instead write: equilibrium is the price where there is no surplus or shortage, but it does not guarantee a fair or efficient outcome.",
        examMatters: "Always label your equilibrium diagram with Pe and Qe at the intersection. Examiners expect you to explain what happens above and below equilibrium — describe both the surplus and shortage mechanisms to show you understand the full adjustment process.",
        recall: {
          type: "fillin",
          prompt: "Complete the equilibrium logic:",
          template: ["Equilibrium is where quantity demanded equals quantity ___", "A price above equilibrium creates a ___ of goods", "Firms then ___ their prices to clear the surplus"],
          answers: ["supplied", "surplus", "lower"],
          hints: ["sup_____", "sur____", "lo___"]
        }
      },
      {
        id: "shifts-and-new-equilibrium",
        title: "Shifts and New Equilibrium",
        keyIdea: "When demand or supply shifts, the equilibrium price and quantity both change — you must trace the cause through to the new intersection.",
        body: [
          {
            type: "paragraph",
            text: "When the demand curve or supply curve shifts, the market moves to a **new equilibrium**. You need to identify which curve has shifted, in which direction, and then read off the new equilibrium price and quantity from the diagram."
          },
          {
            type: "subheading",
            text: "Possible Shift Outcomes"
          },
          {
            type: "bullets",
            items: [
              "**Demand increases (shifts right)**: equilibrium price rises and equilibrium quantity rises.",
              "**Demand decreases (shifts left)**: equilibrium price falls and equilibrium quantity falls.",
              "**Supply increases (shifts right)**: equilibrium price falls and equilibrium quantity rises.",
              "**Supply decreases (shifts left)**: equilibrium price rises and equilibrium quantity falls."
            ]
          },
          {
            type: "paragraph",
            text: "In more complex scenarios, both curves may shift simultaneously. When that happens, you can determine the effect on one variable but the effect on the other depends on the relative size of the shifts. You should state this uncertainty clearly in exam answers."
          }
        ],
        realExample: {
          emoji: "⛽",
          text: "**Global oil prices** spiked in 2022 after Russia's invasion of Ukraine reduced supply (leftward shift of supply). At the same time, post-pandemic recovery increased demand (rightward shift). Both shifts pushed the equilibrium price sharply upward, while the net effect on quantity depended on which shift was larger."
        },
        misconception: "Students draw both curves shifting but forget to explain the ambiguous variable. When both demand and supply shift simultaneously, one variable has a clear direction but the other is indeterminate without knowing the relative magnitudes. Instead write: state which effect is certain and which depends on the size of the shifts.",
        examMatters: "Diagram questions often require you to show the old and new equilibrium clearly. Label the original curves D1/S1 and the new ones D2/S2, mark Pe1/Qe1 and Pe2/Qe2, and use arrows to show the direction of change. Half the marks come from the diagram itself.",
        recall: {
          type: "reorder",
          prompt: "Order these steps when demand shifts right:",
          correctOrder: ["Non-price factor increases demand", "Demand curve shifts from D1 to D2", "At the old price there is now excess demand", "Price rises to a new equilibrium Pe2"],
          shuffled: [1, 3, 0, 2]
        }
      }
    ],
    takeaway: [
      "Equilibrium = Qd equals Qs, no surplus or shortage.",
      "Surpluses push prices down; shortages push prices up.",
      "A shift in D or S creates a new equilibrium point.",
      "When both shift, one outcome is always indeterminate."
    ]
  },

  /* ═══ Block 4: Price Elasticity of Demand (PED) ═══ */
  {
    title: "Price Elasticity of Demand (PED)",
    quizIndices: [3],
    practiceIndices: [1],
    sections: [
      {
        id: "calculating-ped",
        title: "Calculating PED",
        keyIdea: "PED measures how sensitive quantity demanded is to a price change — the bigger the number, the more consumers react to a price change.",
        body: [
          {
            type: "paragraph",
            text: "**Price elasticity of demand (PED)** measures the responsiveness of the quantity demanded of a good to a change in its price. It is calculated using the formula: **PED = % change in quantity demanded / % change in price**. The result is always negative (because of the inverse relationship between price and demand), but we often refer to the absolute value."
          },
          {
            type: "paragraph",
            text: "If PED is greater than 1 (in absolute terms), demand is **price elastic** — a small price change causes a proportionally larger change in quantity demanded. If PED is less than 1, demand is **price inelastic** — quantity demanded is relatively unresponsive to price changes. If PED equals exactly 1, demand is **unit elastic**."
          },
          {
            type: "flow",
            steps: ["Price rises by 10%", "Quantity demanded falls by 20%", "PED = -20% / 10% = -2"],
            result: "Demand is price elastic (PED > 1)",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "You should always show your working clearly in exam calculations. State the formula, substitute the figures, and interpret the result by saying whether demand is elastic or inelastic and what this means for the business."
          }
        ],
        realExample: {
          emoji: "✈️",
          text: "**Ryanair** knows that leisure travellers have highly elastic demand — a 10% fare increase could cut bookings by more than 10%. This is why Ryanair keeps base fares extremely low and earns revenue from inelastic add-ons like seat selection and baggage, where customers are less sensitive to price."
        },
        misconception: "Students forget the negative sign and write PED as a positive number without explanation. PED is always negative due to the inverse relationship between price and demand. Instead write: PED is negative, and we refer to its absolute value to judge whether demand is elastic (greater than 1) or inelastic (less than 1).",
        examMatters: "Calculation questions award marks for the formula, correct substitution, the final answer, and your interpretation. Even if the arithmetic is wrong, you can still pick up method marks — so always show every step of your working.",
        recall: {
          type: "fillin",
          prompt: "Complete the PED calculation logic:",
          template: ["PED = % change in ___ demanded / % change in ___", "PED > 1 means demand is price ___", "PED < 1 means demand is price ___"],
          answers: ["quantity", "price", "elastic", "inelastic"],
          hints: ["qu______", "pr___", "ela____", "ine______"]
        }
      },
      {
        id: "factors-affecting-ped",
        title: "Factors Affecting PED",
        keyIdea: "The more substitutes a product has, the less essential it is, and the longer consumers have to adjust, the more elastic its demand will be.",
        body: [
          {
            type: "paragraph",
            text: "Several factors determine whether demand for a particular good is elastic or inelastic. The most important factor is the **availability of substitutes** — if there are many close alternatives, consumers can easily switch when the price rises, making demand elastic."
          },
          {
            type: "subheading",
            text: "Key Determinants of PED"
          },
          {
            type: "bullets",
            items: [
              "**Substitutes**: more substitutes = more elastic demand, because consumers can switch easily.",
              "**Necessity vs luxury**: necessities (bread, electricity) have inelastic demand; luxuries (holidays, designer goods) have elastic demand.",
              "**Proportion of income**: goods that take up a large share of income have more elastic demand because the price change is more noticeable.",
              "**Time period**: demand tends to be more elastic in the long run because consumers have time to find alternatives."
            ]
          },
          {
            type: "paragraph",
            text: "You should be able to apply these factors to any product in a case study. Identify which factors apply, explain how they affect PED, and use this to advise the business on its pricing strategy."
          }
        ],
        realExample: {
          emoji: "⚡",
          text: "**UK energy suppliers** face inelastic demand because electricity and gas are necessities with few practical substitutes in the short run. Even when British Gas raised prices by 54% in April 2022, most households had little choice but to continue buying energy, demonstrating classic inelastic demand."
        },
        misconception: "Students list the factors but fail to apply them to the specific product in the question. Knowing the theory is not enough — you must link each factor to the case study context. Instead write: always explain which factors make this specific product elastic or inelastic, using evidence from the scenario provided.",
        examMatters: "Higher-mark questions ask you to evaluate whether a product has elastic or inelastic demand. Structure your answer by considering multiple factors, reaching a judgement, and supporting it with data or context from the question. One-factor answers rarely score full marks.",
        recall: {
          type: "reorder",
          prompt: "Order these goods from most inelastic to most elastic demand:",
          correctOrder: ["Insulin (necessity, no substitutes)", "Petrol (few short-run substitutes)", "Branded cereal (some substitutes)", "Holiday flights (luxury, many alternatives)"],
          shuffled: [3, 1, 0, 2]
        }
      },
      {
        id: "ped-and-revenue",
        title: "PED and Revenue",
        keyIdea: "If demand is elastic, lowering prices raises total revenue; if demand is inelastic, raising prices raises total revenue — this is the key pricing insight.",
        body: [
          {
            type: "paragraph",
            text: "The link between PED and **total revenue** is one of the most important concepts in business. Total revenue equals **price multiplied by quantity sold** (TR = P x Q). The impact of a price change on total revenue depends entirely on whether demand is elastic or inelastic."
          },
          {
            type: "paragraph",
            text: "If demand is **price elastic** (PED > 1), a price cut increases total revenue because the percentage rise in quantity demanded is greater than the percentage fall in price. Conversely, a price rise reduces total revenue because customers desert you in large numbers."
          },
          {
            type: "flow",
            steps: ["Demand is inelastic (PED < 1)", "Firm raises price by 10%", "Quantity demanded falls by only 5%"],
            result: "Total revenue increases — the price effect outweighs the volume loss",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "This insight is crucial for pricing strategy. You should recommend price rises for inelastic products and price cuts for elastic products when the goal is to maximise revenue."
          }
        ],
        realExample: {
          emoji: "🚬",
          text: "**UK government tobacco taxation** consistently raises cigarette prices, yet tax revenue keeps rising. Because nicotine is addictive and demand is highly inelastic, the percentage fall in quantity demanded is far smaller than the percentage increase in price, so total tax revenue increases each year."
        },
        misconception: "Students assume that cutting prices always increases revenue. A price cut only increases revenue when demand is elastic. If demand is inelastic, cutting prices reduces revenue because the small increase in quantity sold does not compensate for the lower price. Instead write: the revenue effect of a price change depends on whether demand is elastic or inelastic.",
        examMatters: "This is a favourite exam topic. When advising on pricing, always state the PED value or whether demand is elastic/inelastic, then explain the revenue effect using the formula TR = P x Q. Show numerically or logically why revenue rises or falls.",
        recall: {
          type: "fillin",
          prompt: "Complete the PED-revenue link:",
          template: ["If PED > 1, a price cut will ___ total revenue", "If PED < 1, a price rise will ___ total revenue", "Total revenue = ___ multiplied by quantity sold"],
          answers: ["increase", "increase", "price"],
          hints: ["inc_____", "inc_____", "pr___"]
        }
      }
    ],
    takeaway: [
      "PED = % change in Qd / % change in price (always negative).",
      "Substitutes, necessity, income share and time all affect PED.",
      "Elastic demand: cut price to raise revenue.",
      "Inelastic demand: raise price to raise revenue."
    ]
  },

  /* ═══ Block 5: Income Elasticity of Demand (YED) ═══ */
  {
    title: "Income Elasticity of Demand (YED)",
    quizIndices: [4],
    sections: [
      {
        id: "calculating-yed",
        title: "Calculating YED",
        keyIdea: "YED measures how quantity demanded responds to income changes — its sign tells you whether the good is normal (positive) or inferior (negative).",
        body: [
          {
            type: "paragraph",
            text: "**Income elasticity of demand (YED)** measures the responsiveness of demand to a change in consumer income. The formula is: **YED = % change in quantity demanded / % change in income**. Unlike PED, the sign of YED is meaningful — it tells you the type of good."
          },
          {
            type: "paragraph",
            text: "If YED is **positive**, the good is a **normal good** — demand rises as income rises. Most goods fall into this category. If YED is **negative**, the good is an **inferior good** — demand falls as income rises because consumers trade up to better alternatives."
          },
          {
            type: "flow",
            steps: ["Consumer income rises by 10%", "Demand for luxury holidays rises by 25%", "YED = +25% / +10% = +2.5"],
            result: "Normal good with income-elastic demand (YED > 1 = luxury)",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "Normal goods with YED greater than 1 are called **luxury goods** or income-elastic goods — demand grows faster than income. Normal goods with YED between 0 and 1 are **necessities** or income-inelastic goods — demand grows but more slowly than income."
          }
        ],
        realExample: {
          emoji: "🍜",
          text: "**Aldi and Lidl** saw sales surge during the 2022-2023 cost-of-living crisis in the UK as real incomes fell. Their budget products have negative YED — when incomes fall, demand for cheaper alternatives rises, making discount supermarkets the winners during economic downturns."
        },
        misconception: "Students confuse PED and YED or forget which sign matters. With PED, the negative sign is always expected and often ignored. With YED, the sign is the crucial piece of information — positive means normal good, negative means inferior good. Instead write: always state and interpret the sign of YED because it classifies the product type.",
        examMatters: "YED calculation questions require you to show the formula, substitute correctly, state the sign, and interpret it. The most common error is giving the right number but failing to explain what it means — always classify the good as normal/inferior and luxury/necessity.",
        recall: {
          type: "fillin",
          prompt: "Complete the YED classification:",
          template: ["YED = % change in quantity demanded / % change in ___", "Positive YED means the good is a ___ good", "Negative YED means the good is an ___ good"],
          answers: ["income", "normal", "inferior"],
          hints: ["inc___", "nor___", "inf_____"]
        }
      },
      {
        id: "significance-of-yed",
        title: "Significance of YED",
        keyIdea: "YED helps businesses predict how economic booms and recessions will affect their sales, allowing them to plan product portfolios accordingly.",
        body: [
          {
            type: "paragraph",
            text: "Understanding YED is vital for **strategic planning**. During an economic boom, incomes rise and demand for luxury goods (high positive YED) increases rapidly — businesses selling these goods can expect strong growth. However, demand for inferior goods (negative YED) will fall during booms as consumers trade up."
          },
          {
            type: "paragraph",
            text: "During a **recession**, the opposite happens. Demand for luxury goods drops sharply while demand for inferior goods rises. Businesses that sell only income-elastic products are vulnerable in downturns, which is why diversification across product types with different YED values can stabilise revenue."
          },
          {
            type: "flow",
            steps: ["Economy enters recession", "Consumer incomes fall", "Demand for luxuries drops, demand for inferior goods rises"],
            result: "Firms with diversified YED portfolios are more resilient",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "Businesses also use YED to decide which markets to enter. If you expect long-term income growth in a developing economy, targeting luxury goods makes sense because demand will grow faster than income. In stagnant economies, necessities and inferior goods may be safer bets."
          }
        ],
        realExample: {
          emoji: "👜",
          text: "**LVMH** (owner of Louis Vuitton) reported record revenues of over EUR 86 billion in 2023, driven by rising incomes among wealthy consumers globally. Their luxury portfolio has a high positive YED, meaning profits soar during economic growth but could fall sharply in a global recession."
        },
        misconception: "Students assume inferior goods are low-quality or undesirable. Inferior goods are simply those whose demand falls when income rises because consumers switch to preferred alternatives. Instead write: inferior goods are not necessarily bad products — they are simply those replaced by preferred alternatives when consumers can afford to trade up.",
        examMatters: "Extended-answer questions often ask you to evaluate how economic changes affect a specific business. Use YED to structure your argument — classify the firm's products, predict the demand impact, and evaluate whether the business is well-positioned to cope with the change.",
        recall: {
          type: "reorder",
          prompt: "Order the impact of a recession on different product types:",
          correctOrder: ["Economy enters recession and incomes fall", "Demand for luxury goods (high YED) drops sharply", "Demand for inferior goods (negative YED) rises", "Diversified firms weather the downturn best"],
          shuffled: [2, 0, 3, 1]
        }
      }
    ],
    takeaway: [
      "YED sign matters: positive = normal, negative = inferior.",
      "YED > 1 = luxury (income-elastic); 0 < YED < 1 = necessity.",
      "Recessions hit luxury goods hardest but boost inferior goods.",
      "Diversifying across YED values stabilises revenue."
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
