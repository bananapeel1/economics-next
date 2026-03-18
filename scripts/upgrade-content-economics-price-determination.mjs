/**
 * SECTION UPGRADE — Price Determination (Economics 1.3.4)
 * =======================================================
 * Edexcel IAL Economics Unit 1, spec point 1.3.4
 * Run with: node scripts/upgrade-content-economics-price-determination.mjs
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL     || 'https://trweeckuswgkenckeqfb.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);

/* ── 1. SETTINGS ──────────────────────────────────────────────────────────── */

const SECTION_SLUG = 'price-determination';
const SUBJECT_ID   = 'economics';

/* ── 2. CONTENT ───────────────────────────────────────────────────────────── */

const CONTENT = [

  /* ═══ Block 1: Equilibrium Price & Quantity ═══ */
  {
    title: "Equilibrium Price & Quantity",
    diagramRef: "Equilibrium",
    quizIndices: [0],
    practiceIndices: [0],
    sections: [
      {
        id: "how-markets-reach-equilibrium",
        title: "How Markets Reach Equilibrium",
        keyIdea: "Equilibrium is the price where the quantity buyers want to purchase exactly matches the quantity sellers want to offer, so there is no pressure for the price to change.",
        body: [
          {
            type: "paragraph",
            text: "When you draw a demand curve and a supply curve on the same diagram, they cross at one point. That intersection is **equilibrium** — the price at which quantity demanded equals quantity supplied. At this price every unit consumers want to buy is matched by a unit producers want to sell, so the market clears."
          },
          {
            type: "flow",
            steps: ["Demand curve slopes downward", "Supply curve slopes upward", "Curves intersect"],
            result: "Equilibrium price (Pe) and equilibrium quantity (Qe)",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "You should think of equilibrium as a resting point, not a permanent state. If nothing else changes the market stays there, but any shift in demand or supply will move you to a new equilibrium. The word itself comes from the Latin for \"equal balance.\""
          }
        ],
        realExample: {
          emoji: "🎫",
          text: "**Glastonbury Festival** tickets sell out in minutes because the face-value price is set below equilibrium. The result is massive excess demand, with resale sites listing tickets at several times the original price."
        },
        misconception: "Students often write \"the market is always at equilibrium.\" In reality, markets are constantly adjusting because demand and supply shift frequently. Instead write: equilibrium is the point the market tends toward, but real-world prices fluctuate around it as conditions change.",
        examMatters: "Examiners expect you to define equilibrium precisely as the price where Qd equals Qs with no tendency to change. Always support your answer with a clearly labelled diagram showing Pe and Qe at the intersection of demand and supply.",
        recall: {
          type: "reorder",
          prompt: "Put these in the right order:",
          correctOrder: ["Demand curve slopes downward", "Supply curve slopes upward", "Curves intersect at one point", "Market clears at equilibrium price"],
          shuffled: [3, 0, 2, 1]
        }
      },
      {
        id: "excess-demand-and-excess-supply",
        title: "Excess Demand and Excess Supply",
        keyIdea: "When price is away from equilibrium, either buyers queue up because there is not enough supply, or sellers pile up unsold stock because there are not enough buyers.",
        body: [
          {
            type: "paragraph",
            text: "If the price is **below equilibrium**, quantity demanded exceeds quantity supplied. You get **excess demand** — shoppers want more than sellers can offer at that price. This shortage puts upward pressure on the price as buyers compete for the limited stock."
          },
          {
            type: "flow",
            steps: ["Price below Pe", "Qd > Qs", "Shortage pushes price up"],
            result: "Market moves back toward equilibrium",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "If the price is **above equilibrium**, quantity supplied exceeds quantity demanded. You get **excess supply** — producers have unsold inventory piling up. Sellers respond by cutting prices, which attracts more buyers and discourages some production until the surplus disappears."
          },
          {
            type: "paragraph",
            text: "This self-correcting mechanism is central to how free markets work. You do not need a planner to fix the imbalance — the price signal does the job automatically."
          }
        ],
        realExample: {
          emoji: "🏠",
          text: "**UK rental markets** in cities like London show persistent excess demand because rent controls and planning restrictions keep supply below equilibrium. Prospective tenants queue for viewings, and many are outbid, illustrating how below-equilibrium pricing creates shortages."
        },
        misconception: "Students confuse a shift in demand with a movement along the demand curve when explaining excess demand. Excess demand occurs at a given price, not because the curve moved. Instead write: excess demand arises when price is set below equilibrium, causing quantity demanded to exceed quantity supplied at that price.",
        examMatters: "When explaining how a market returns to equilibrium, examiners want a step-by-step price adjustment story. Show the disequilibrium on a diagram, label the excess, and explain the direction of price change that restores equilibrium.",
        recall: {
          type: "fillin",
          prompt: "Complete the chain:",
          template: ["Price below Pe → ___ exceeds Qs", "→ ___ pushes price up", "→ Market returns to ___"],
          answers: ["Qd", "shortage", "equilibrium"],
          hints: ["Q_", "sh______", "eq_________"]
        }
      },
      {
        id: "changes-in-equilibrium",
        title: "Changes in Equilibrium",
        keyIdea: "A shift in the demand or supply curve moves the equilibrium point, changing both the market price and the quantity traded.",
        body: [
          {
            type: "paragraph",
            text: "When a non-price factor changes — rising incomes, new technology, higher input costs — it shifts the demand or supply curve. You then get a **new equilibrium** with a different price and quantity. The old equilibrium is no longer relevant."
          },
          {
            type: "flow",
            steps: ["Non-price factor changes", "Curve shifts left or right", "New intersection point"],
            result: "New equilibrium price and quantity",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "You need to be precise about the direction. An increase in demand shifts the curve right, raising both price and quantity. An increase in supply also shifts right, but raises quantity while lowering price. Getting this wrong in an exam is one of the most common errors."
          },
          {
            type: "paragraph",
            text: "When both curves shift simultaneously, you can predict the direction of one variable but not the other without knowing the relative size of each shift. This is a favourite examiner trick — always state what is indeterminate."
          }
        ],
        realExample: {
          emoji: "⛽",
          text: "**OPEC** production cuts in 2022 shifted global oil supply to the left while post-pandemic demand shifted right. Both forces pushed oil prices sharply upward, illustrating how simultaneous shifts can reinforce each other on price."
        },
        misconception: "Students draw a shift in demand and then also move along the demand curve in the same answer. A shift changes the position of the curve; a movement along happens on the other curve in response. Instead write: when demand shifts right, there is a movement along the supply curve to a higher quantity supplied at the new, higher price.",
        examMatters: "Diagram accuracy is critical here. Label old and new equilibrium points clearly, use arrows to show the shift, and state the effect on both price and quantity. If both curves shift, explicitly say which variable is indeterminate.",
        recall: {
          type: "reorder",
          prompt: "Put these in the right order:",
          correctOrder: ["Non-price factor changes", "Demand or supply curve shifts", "New intersection point forms", "New equilibrium price and quantity"],
          shuffled: [2, 3, 0, 1]
        }
      }
    ],
    takeaway: [
      "Equilibrium: Qd = Qs, no tendency to change.",
      "Below Pe causes shortage; above Pe causes surplus.",
      "Shifts in D or S create a new equilibrium.",
      "Simultaneous shifts leave one variable indeterminate."
    ]
  },

  /* ═══ Block 2: Consumer Surplus & Producer Surplus ═══ */
  {
    title: "Consumer Surplus & Producer Surplus",
    diagramRef: "Consumer Surplus",
    quizIndices: [1],
    sections: [
      {
        id: "consumer-surplus",
        title: "Consumer Surplus",
        keyIdea: "Consumer surplus is the extra satisfaction you get because you paid less than the maximum you were willing to pay for a good.",
        body: [
          {
            type: "paragraph",
            text: "Imagine you would pay up to $5 for a coffee but the market price is $3. That $2 gap is your **consumer surplus** — the difference between your willingness to pay and what you actually pay. On a diagram it is the triangle below the demand curve and above the market price."
          },
          {
            type: "flow",
            steps: ["Willingness to pay", "Minus market price"],
            result: "Consumer surplus for each unit",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "Total consumer surplus for the whole market is the area of that triangle. When the price falls, the triangle gets bigger because more consumers can now buy and existing buyers save more. When the price rises, consumer surplus shrinks."
          }
        ],
        realExample: {
          emoji: "✈️",
          text: "**Ryanair** sells some seats for as little as $10 on routes where many passengers would pay $100 or more. Those passengers enjoy huge consumer surplus, which is exactly why budget airlines generate such high passenger volumes."
        },
        misconception: "Students sometimes say consumer surplus means the consumer \"saves money.\" Surplus is not a saving — it is the gap between the maximum you would have paid and the price you did pay. Instead write: consumer surplus measures the extra welfare consumers receive by paying less than their valuation.",
        examMatters: "Examiners frequently ask you to show consumer surplus on a diagram. Make sure you shade the correct triangle — below the demand curve, above the price line, and to the left of equilibrium quantity. Label it clearly.",
        recall: {
          type: "fillin",
          prompt: "Complete the chain:",
          template: ["Willingness to pay minus ___ price", "→ Equals consumer ___", "→ Area below ___ curve, above price"],
          answers: ["market", "surplus", "demand"],
          hints: ["ma____", "su_____", "de____"]
        }
      },
      {
        id: "producer-surplus",
        title: "Producer Surplus",
        keyIdea: "Producer surplus is the extra benefit sellers receive because the market price is higher than the minimum they would have accepted to supply the good.",
        body: [
          {
            type: "paragraph",
            text: "A farmer might be willing to sell wheat for $150 per tonne, but the market price is $200. That $50 difference is the farmer's **producer surplus**. On a diagram it is the triangle above the supply curve and below the market price."
          },
          {
            type: "flow",
            steps: ["Market price received", "Minus minimum acceptable price"],
            result: "Producer surplus for each unit",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "Total producer surplus for the whole market is the area of that triangle. When the price rises, producer surplus increases because sellers receive more above their cost. When the price falls, the triangle shrinks and some high-cost producers may exit."
          }
        ],
        realExample: {
          emoji: "🛢️",
          text: "**Saudi Aramco** can extract oil at roughly $3 per barrel while the world price often exceeds $70. The enormous gap gives Saudi Arabia one of the largest producer surpluses of any commodity producer on the planet."
        },
        misconception: "Students confuse producer surplus with profit. Producer surplus is measured against the minimum supply price on the supply curve, not against total costs of production. Instead write: producer surplus is the area above the supply curve and below the price, which is related to but not identical to accounting profit.",
        examMatters: "When comparing consumer and producer surplus, examiners want you to shade both triangles on the same diagram. Use different shading or labelling so it is clear which area is which. Always reference the equilibrium price line.",
        recall: {
          type: "reorder",
          prompt: "Put these in the right order:",
          correctOrder: ["Farmer willing to sell at $150", "Market price is $200", "Difference is $50 producer surplus", "Area above supply curve, below price"],
          shuffled: [1, 3, 0, 2]
        }
      },
      {
        id: "total-welfare-and-efficiency",
        title: "Total Welfare and Efficiency",
        keyIdea: "Total welfare is consumer surplus plus producer surplus, and it is maximised at the free-market equilibrium where no deadweight loss exists.",
        body: [
          {
            type: "paragraph",
            text: "Add consumer surplus and producer surplus together and you get **total economic welfare** — the combined benefit the market creates for society. At the free-market equilibrium, this total is as large as it can be. No reallocation of resources could make one group better off without making another worse off."
          },
          {
            type: "paragraph",
            text: "This is the concept of **allocative efficiency** — the market produces exactly the quantity where the value to the last consumer equals the cost to the last producer. Any quantity above or below this creates a **deadweight loss**, a triangle of welfare that nobody receives."
          },
          {
            type: "flow",
            steps: ["CS + PS = total welfare", "Maximised at free-market equilibrium"],
            result: "Allocative efficiency — no deadweight loss",
            resultType: "good"
          }
        ],
        realExample: {
          emoji: "📊",
          text: "**The US Congressional Budget Office** estimates deadweight loss when scoring tax proposals. A proposed sugar tax, for example, would reduce total welfare by shrinking the quantity traded below the free-market level, creating a measurable triangle of lost surplus."
        },
        misconception: "Students assume that any government intervention automatically reduces total welfare. Some interventions correct market failures and can actually increase welfare by moving output closer to the socially optimal level. Instead write: intervention reduces welfare only when the market was already efficient; if a market failure exists, intervention may improve total welfare.",
        examMatters: "Examiners love asking you to compare welfare before and after a policy change. Always calculate or shade consumer surplus, producer surplus and any deadweight loss. State clearly whether total welfare has risen or fallen and explain why.",
        recall: {
          type: "fillin",
          prompt: "Complete the chain:",
          template: ["CS + PS = total ___", "→ Maximised at free-market ___", "→ Any deviation creates ___ loss"],
          answers: ["welfare", "equilibrium", "deadweight"],
          hints: ["we_____", "eq_________", "de________"]
        }
      }
    ],
    takeaway: [
      "Consumer surplus: area below D, above price.",
      "Producer surplus: area above S, below price.",
      "Total welfare = CS + PS, maximised at equilibrium.",
      "Deadweight loss appears when output deviates from Qe."
    ]
  },

  /* ═══ Block 3: Functions of the Price Mechanism ═══ */
  {
    title: "Functions of the Price Mechanism",
    quizIndices: [2],
    practiceIndices: [1],
    sections: [
      {
        id: "signalling-incentive-rationing",
        title: "Signalling, Incentive, and Rationing Functions",
        keyIdea: "Prices carry information, motivate responses and allocate scarce goods — three functions that allow markets to coordinate millions of decisions without central control.",
        body: [
          {
            type: "paragraph",
            text: "The **signalling function** means prices act as information carriers. A rising price signals to producers that consumers want more of a good, while a falling price signals that demand has weakened. You do not need a government planner to broadcast this information — the price does it automatically."
          },
          {
            type: "flow",
            steps: ["Price rises", "Signals higher demand", "Producers increase supply", "Consumers reduce purchases"],
            result: "Resources reallocated toward higher-value uses",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "The **incentive function** means price changes motivate action. Higher prices give producers an incentive to supply more because profits are greater, and they give consumers an incentive to buy less or switch to substitutes. The stronger the price change, the stronger the behavioural response."
          },
          {
            type: "paragraph",
            text: "The **rationing function** means prices allocate scarce goods to those who value them most. When supply is limited, a higher price rations the good by excluding consumers whose willingness to pay is below the market price. This is how markets decide \"who gets what\" without queuing or government allocation."
          }
        ],
        realExample: {
          emoji: "💎",
          text: "**De Beers** historically controlled diamond supply to keep prices high, which rationed diamonds to wealthy buyers and signalled scarcity. When lab-grown diamonds entered the market at lower prices, the price mechanism incentivised consumers to switch, pressuring natural diamond prices downward."
        },
        misconception: "Students list the three functions but fail to explain how they work through price changes. Simply naming them earns very few marks. Instead write: explain the mechanism — a price rise signals scarcity, incentivises greater supply, and rations the good to those with the highest willingness to pay.",
        examMatters: "Examiners often give a scenario and ask you to explain how the price mechanism operates. You must identify all three functions — signalling, incentive and rationing — and apply each specifically to the context. Generic answers without application score poorly.",
        recall: {
          type: "reorder",
          prompt: "Put these in the right order:",
          correctOrder: ["Price rises in the market", "Signal of higher demand sent", "Producers incentivised to supply more", "Scarce goods rationed to highest-value buyers"],
          shuffled: [2, 0, 3, 1]
        }
      },
      {
        id: "the-invisible-hand",
        title: "The Invisible Hand",
        keyIdea: "Adam Smith argued that individuals pursuing their own self-interest unintentionally promote the well-being of society through the price mechanism.",
        body: [
          {
            type: "paragraph",
            text: "The **invisible hand** is Adam Smith's metaphor for how free markets coordinate activity without central direction. When you buy the cheapest loaf of bread, you reward the most efficient baker. When a firm chases higher profits, it moves resources toward the goods society values most. Neither you nor the firm is trying to help society — yet the outcome benefits everyone."
          },
          {
            type: "flow",
            steps: ["Individuals pursue self-interest", "Prices guide their decisions", "Resources flow to highest-valued uses"],
            result: "Socially beneficial allocation without planning",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "The invisible hand only works well when markets are competitive and there are no significant market failures. When externalities, monopoly power or information asymmetries exist, self-interested behaviour can lead to outcomes that are bad for society. This is why economists study market failure alongside the price mechanism."
          }
        ],
        realExample: {
          emoji: "🍞",
          text: "**Supermarket supply chains** illustrate the invisible hand daily. No central planner tells farmers, millers and bakers how much bread London needs tomorrow, yet shelves are stocked because each firm responds to price signals and profit incentives along the chain."
        },
        misconception: "Students claim the invisible hand means markets always produce the best outcome for society. Smith himself acknowledged situations where self-interest leads to harmful results, particularly when competition is absent. Instead write: the invisible hand works best under competitive conditions and can fail when externalities or market power distort price signals.",
        examMatters: "When discussing the invisible hand, examiners expect you to link it to the three functions of the price mechanism and then evaluate its limitations. Always mention at least one reason why the invisible hand may fail, such as externalities or monopoly power.",
        recall: {
          type: "fillin",
          prompt: "Complete the chain:",
          template: ["Individuals pursue ___", "→ Prices guide their ___", "→ Resources flow to highest-valued ___"],
          answers: ["self-interest", "decisions", "uses"],
          hints: ["se__________", "de_______", "us__"]
        }
      }
    ],
    takeaway: [
      "Signalling: prices transmit information to buyers and sellers.",
      "Incentive: price changes motivate behavioural responses.",
      "Rationing: prices allocate scarce goods by willingness to pay.",
      "The invisible hand relies on competitive markets to work."
    ]
  },

  /* ═══ Block 4: Indirect Taxes ═══ */
  {
    title: "Indirect Taxes",
    diagramRef: "Indirect Tax",
    quizIndices: [3],
    practiceIndices: [2],
    sections: [
      {
        id: "specific-and-ad-valorem-taxes",
        title: "Specific and Ad Valorem Taxes",
        keyIdea: "A specific tax adds a fixed amount per unit sold, shifting supply up in parallel, while an ad valorem tax adds a percentage, causing the supply curve to pivot upward.",
        body: [
          {
            type: "paragraph",
            text: "An **indirect tax** is levied on the sale of a good or service rather than directly on income. The two main types are **specific taxes** (a fixed amount per unit, like 59p per litre on petrol) and **ad valorem taxes** (a percentage of the selling price, like 20% VAT)."
          },
          {
            type: "flow",
            steps: ["Government imposes tax", "Supply curve shifts upward by tax amount", "New equilibrium: higher price, lower quantity"],
            result: "Tax revenue collected, but output falls",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "On a diagram, a specific tax shifts the supply curve upward by the same vertical distance at every quantity — the curves stay parallel. An ad valorem tax shifts the supply curve upward by an increasing amount as quantity rises, so the new curve diverges from the old one."
          },
          {
            type: "paragraph",
            text: "You should remember that the tax is paid to the government by the producer, but part of the burden is passed on to the consumer through a higher price. How much is passed on depends on elasticity."
          }
        ],
        realExample: {
          emoji: "🍺",
          text: "**UK alcohol duty** charges a fixed amount per unit of pure alcohol — a classic specific tax. Meanwhile **VAT at 20%** is added as a percentage of the pre-tax price, making it an ad valorem tax applied on top of the specific duty."
        },
        misconception: "Students draw ad valorem taxes as a parallel shift of the supply curve, identical to a specific tax. Because ad valorem is a percentage, the absolute tax amount rises with price, so the shift increases at higher quantities. Instead write: an ad valorem tax pivots the supply curve upward, with the gap widening as price increases.",
        examMatters: "Examiners regularly ask you to compare specific and ad valorem taxes on a diagram. You must show a parallel shift for specific and a pivoting shift for ad valorem. Label the tax per unit clearly and shade the tax revenue rectangle.",
        recall: {
          type: "reorder",
          prompt: "Put these in the right order:",
          correctOrder: ["Government imposes indirect tax", "Supply curve shifts upward", "New equilibrium at higher price", "Output falls and tax revenue collected"],
          shuffled: [3, 1, 0, 2]
        }
      },
      {
        id: "tax-incidence-and-elasticity",
        title: "Tax Incidence and Elasticity",
        keyIdea: "The burden of an indirect tax falls more heavily on whichever side of the market is less elastic — if demand is inelastic, consumers bear most of the tax.",
        body: [
          {
            type: "paragraph",
            text: "**Tax incidence** describes how the burden of a tax is split between consumers and producers. The consumer burden is the rise in the price they pay; the producer burden is the fall in the price they effectively receive after remitting the tax. Together they add up to the total tax per unit."
          },
          {
            type: "flow",
            steps: ["Tax imposed", "Check elasticity of demand and supply", "Less elastic side bears more of the tax"],
            result: "Tax incidence determined by relative elasticities",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "When demand is perfectly inelastic, consumers bear the entire tax because they cannot reduce their purchases. When demand is perfectly elastic, producers bear all of it because any price rise would destroy demand completely. Most real markets sit between these extremes."
          },
          {
            type: "paragraph",
            text: "You should practise drawing diagrams with different elasticities to see how the consumer and producer shares change. This is one of the most diagram-heavy topics in the specification."
          }
        ],
        realExample: {
          emoji: "🚬",
          text: "**Tobacco taxes** in the UK generate large revenue because demand is highly inelastic — smokers are addicted and cannot easily cut back. The government knows consumers will absorb most of the price increase, making cigarettes an effective revenue-raising target."
        },
        misconception: "Students state that producers always pass the full tax on to consumers. This only happens when demand is perfectly inelastic. Instead write: the proportion passed on depends on relative elasticities — the more inelastic demand is relative to supply, the greater the share consumers bear.",
        examMatters: "Tax incidence questions almost always require a diagram showing the old and new equilibrium, the consumer and producer share of the tax, and the tax revenue rectangle. Examiners award marks for correctly identifying which side bears the larger burden and explaining why using elasticity.",
        recall: {
          type: "fillin",
          prompt: "Complete the chain:",
          template: ["Tax ___ splits between consumers and producers", "→ Less ___ side bears more of the tax", "→ ___ demand means consumers pay most"],
          answers: ["incidence", "elastic", "inelastic"],
          hints: ["in_______", "el_____", "in_______"]
        }
      },
      {
        id: "welfare-effects-of-taxation",
        title: "Welfare Effects of Taxation",
        keyIdea: "An indirect tax reduces consumer and producer surplus while generating government revenue, but it also creates a deadweight loss triangle of welfare that nobody receives.",
        body: [
          {
            type: "paragraph",
            text: "When a tax is imposed, the market price rises and quantity falls. Consumer surplus shrinks because buyers pay more for fewer units. Producer surplus shrinks because sellers receive a lower effective price. Part of the lost surplus becomes **government tax revenue**, but part is lost entirely — this is the **deadweight loss**."
          },
          {
            type: "flow",
            steps: ["Tax raises price, lowers quantity", "CS and PS both fall", "Government gains tax revenue rectangle"],
            result: "Deadweight loss triangle — welfare lost to nobody",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "The size of the deadweight loss depends on elasticity. The more elastic demand and supply are, the greater the fall in quantity and the larger the deadweight loss. This is why economists prefer taxing goods with inelastic demand — revenue is high and deadweight loss is small."
          }
        ],
        realExample: {
          emoji: "📉",
          text: "**Hungary's 27% VAT** is the highest standard rate in the EU. Studies estimate it creates significant deadweight loss in elastic markets like luxury goods, where consumers sharply reduce purchases, while generating steady revenue from inelastic necessities like food and energy."
        },
        misconception: "Students forget to include government revenue when analysing welfare. Tax revenue is not a loss to society — it is a transfer from consumers and producers to the government. Instead write: total welfare loss is only the deadweight loss triangle, because tax revenue is redistributed by the government, not destroyed.",
        examMatters: "Welfare analysis of taxation is a very common exam question. You must show consumer surplus, producer surplus, government revenue and deadweight loss all on one diagram. Shade each area differently and state clearly which areas have increased, decreased or been created.",
        recall: {
          type: "reorder",
          prompt: "Put these in the right order:",
          correctOrder: ["Tax raises price and lowers quantity", "Consumer and producer surplus both fall", "Government gains tax revenue rectangle", "Deadweight loss triangle remains unclaimed"],
          shuffled: [1, 3, 0, 2]
        }
      }
    ],
    takeaway: [
      "Specific tax: parallel shift; ad valorem: pivot.",
      "Tax incidence falls on the less elastic side.",
      "Tax revenue = tax per unit x quantity sold.",
      "Deadweight loss is the welfare nobody receives."
    ]
  },

  /* ═══ Block 5: Subsidies ═══ */
  {
    title: "Subsidies",
    diagramRef: "Subsidy",
    quizIndices: [4],
    sections: [
      {
        id: "how-subsidies-work",
        title: "How Subsidies Work",
        keyIdea: "A subsidy is a payment from the government to producers that shifts the supply curve downward, lowering the market price and increasing the quantity traded.",
        body: [
          {
            type: "paragraph",
            text: "A **subsidy** is a per-unit payment from the government to producers, designed to encourage production or consumption of a good. On a diagram, the supply curve shifts **downward** (or rightward) by the amount of the subsidy per unit, because the effective cost of production has fallen."
          },
          {
            type: "flow",
            steps: ["Government pays subsidy to producers", "Supply shifts down by subsidy amount", "Price falls, quantity rises"],
            result: "More output at a lower price for consumers",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "The benefit of the subsidy is shared between consumers and producers. Consumers gain because the market price falls. Producers gain because the price they effectively receive (market price plus subsidy) is higher than before. The split again depends on the relative elasticities of demand and supply."
          },
          {
            type: "paragraph",
            text: "You should note that the government must fund the subsidy from tax revenue, so there is always an opportunity cost. The total cost to the government is the subsidy per unit multiplied by the new quantity traded."
          }
        ],
        realExample: {
          emoji: "🌾",
          text: "**The EU Common Agricultural Policy** pays subsidies to European farmers to keep food production high and prices affordable. Critics argue it leads to overproduction and distorts international trade, with developing-country farmers unable to compete against subsidised European exports."
        },
        misconception: "Students draw the supply curve shifting upward when a subsidy is applied. A subsidy reduces costs, so the supply curve shifts downward — producers are willing to supply the same quantity at a lower price. Instead write: a subsidy shifts the supply curve down by the subsidy per unit, reflecting the lower effective cost of production.",
        examMatters: "Subsidy diagrams must clearly show the old and new supply curves, the subsidy per unit as the vertical distance between them, and the government cost as the shaded rectangle. Examiners penalise diagrams where the shift direction is wrong or the subsidy amount is not labelled.",
        recall: {
          type: "fillin",
          prompt: "Complete the chain:",
          template: ["Government pays ___ to producers", "→ Supply curve shifts ___", "→ Price falls, ___ rises"],
          answers: ["subsidy", "downward", "quantity"],
          hints: ["su_____", "do______", "qu______"]
        }
      },
      {
        id: "effects-and-evaluation-of-subsidies",
        title: "Effects and Evaluation of Subsidies",
        keyIdea: "Subsidies increase output and lower prices but they cost taxpayers money, can create deadweight loss, and may prop up inefficient producers.",
        body: [
          {
            type: "paragraph",
            text: "The positive effects of a subsidy include lower prices for consumers, higher output, and support for industries the government considers important — such as renewable energy or public transport. Subsidies can also correct **positive externalities** by encouraging consumption or production closer to the socially optimal level."
          },
          {
            type: "paragraph",
            text: "However, subsidies have significant drawbacks. They carry an **opportunity cost** because the money could be spent on healthcare or education instead. They can lead to **allocative inefficiency** if output is pushed beyond the socially optimal level, creating a deadweight loss. They may also keep **inefficient firms** in business, reducing competitive pressure to innovate."
          },
          {
            type: "flow",
            steps: ["Subsidy corrects market failure", "But costs taxpayers money", "May cause overproduction"],
            result: "Net benefit depends on size of the externality",
            resultType: "neutral"
          }
        ],
        realExample: {
          emoji: "⚡",
          text: "**Germany's Energiewende** subsidised renewable energy through feed-in tariffs, making the country a world leader in solar and wind capacity. However, the programme cost German households over 25 billion euros annually through surcharges on electricity bills, sparking debate about cost-effectiveness."
        },
        misconception: "Students assume subsidies are always beneficial because they lower prices. Subsidies funded by taxation transfer costs to taxpayers, and if the market had no failure, the subsidy creates a deadweight loss by pushing output beyond the efficient level. Instead write: subsidies improve welfare only when they correct a genuine market failure such as a positive externality.",
        examMatters: "Evaluation is essential for top marks on subsidy questions. You should weigh the benefits of lower prices and higher output against the opportunity cost, possible overproduction and the risk of government failure in choosing which industries to subsidise.",
        recall: {
          type: "reorder",
          prompt: "Put these in the right order:",
          correctOrder: ["Subsidy corrects a positive externality", "Output rises toward socially optimal level", "But costs taxpayers money via taxation", "Net benefit depends on size of externality"],
          shuffled: [2, 0, 3, 1]
        }
      }
    ],
    takeaway: [
      "Subsidy shifts supply down, lowering price and raising output.",
      "Benefit split depends on elasticity of D and S.",
      "Government cost = subsidy per unit x new quantity.",
      "Only justified if correcting a genuine market failure."
    ]
  },

  /* ═══ Block 6: Alternative Views of Consumer & Producer Behaviour ═══ */
  {
    title: "Alternative Views of Consumer & Producer Behaviour",
    sections: [
      {
        id: "behavioural-economics",
        title: "Behavioural Economics",
        keyIdea: "Behavioural economics challenges the assumption that people are rational by showing how cognitive biases systematically distort real-world decision-making.",
        body: [
          {
            type: "paragraph",
            text: "Traditional economics assumes consumers maximise utility and firms maximise profit through perfectly rational calculation. **Behavioural economics** draws on psychology to show that real decisions are full of predictable errors. People use mental shortcuts — **heuristics** — that are fast but often inaccurate."
          },
          {
            type: "paragraph",
            text: "Key biases include **anchoring** (relying too heavily on the first piece of information you see), **loss aversion** (losses hurt roughly twice as much as equivalent gains feel good), and the **availability heuristic** (judging probability by how easily examples come to mind). These are not random mistakes — they are systematic patterns."
          },
          {
            type: "flow",
            steps: ["Traditional model assumes rationality", "Behavioural research finds systematic biases", "Policy uses nudges to improve outcomes"],
            result: "Better decisions without removing freedom of choice",
            resultType: "good"
          }
        ],
        realExample: {
          emoji: "🧠",
          text: "**Richard Thaler** won the Nobel Prize in Economics for showing that people make predictable irrational choices. His work led the UK government to create the Behavioural Insights Team, which uses nudges like automatic pension enrolment to improve financial outcomes."
        },
        misconception: "Students write that behavioural economics proves people are irrational and traditional models are useless. Behavioural economics shows people are predictably biased in specific situations, not that all economic models should be discarded. Instead write: behavioural economics supplements traditional theory by identifying systematic deviations from rational behaviour.",
        examMatters: "Examiners expect you to name specific biases with examples, not just say \"people are irrational.\" Link each bias to a real-world consequence and explain how a nudge could address it. This shows application, which is where the higher marks sit.",
        recall: {
          type: "fillin",
          prompt: "Complete the chain:",
          template: ["___ means relying on first info seen", "→ Loss ___ means losses hurt twice as much", "→ ___ improve choices without removing freedom"],
          answers: ["anchoring", "aversion", "nudges"],
          hints: ["an_______", "av______", "nu____"]
        }
      },
      {
        id: "bounded-rationality",
        title: "Bounded Rationality",
        keyIdea: "People do not optimise perfectly because they face limited information, limited time and limited mental processing power, so they settle for good-enough decisions.",
        body: [
          {
            type: "paragraph",
            text: "**Bounded rationality**, a concept developed by Herbert Simon, argues that humans cannot process all available information perfectly. You face three constraints: **limited information** (you do not know everything), **limited cognitive ability** (your brain cannot crunch every number), and **limited time** (decisions must be made quickly)."
          },
          {
            type: "flow",
            steps: ["Limited info, time and brainpower", "Cannot calculate optimal choice", "Settle for satisfactory option"],
            result: "Satisficing rather than maximising",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "Instead of maximising, people **satisfice** — they search until they find an option that meets a minimum acceptable threshold and then stop. You do not compare every phone on the market before buying one; you compare a few and pick one that seems good enough. Firms do the same when setting prices or choosing suppliers."
          }
        ],
        realExample: {
          emoji: "📱",
          text: "**Amazon's recommendation algorithm** exists because bounded rationality means you cannot evaluate millions of products yourself. By narrowing your options to a curated list, Amazon helps you satisfice faster, which increases purchase rates and average order value."
        },
        misconception: "Students equate bounded rationality with irrationality. Satisficing is actually a rational response to the costs of gathering and processing information. Instead write: bounded rationality means people are rational within their constraints — they make the best decisions they can given limited information, time and cognitive resources.",
        examMatters: "When discussing bounded rationality, examiners want you to contrast it with the traditional rational agent model. Explain why satisficing occurs, give a real-world example, and evaluate whether it leads to worse outcomes or is simply a pragmatic adaptation to real-world complexity.",
        recall: {
          type: "reorder",
          prompt: "Put these in the right order:",
          correctOrder: ["Consumer faces limited info and time", "Cannot calculate the optimal choice", "Searches until good-enough option found", "Satisfices rather than maximises"],
          shuffled: [3, 1, 0, 2]
        }
      }
    ],
    takeaway: [
      "Behavioural economics identifies systematic cognitive biases.",
      "Nudges improve choices without restricting freedom.",
      "Bounded rationality: people satisfice, not optimise.",
      "Traditional models are useful but incomplete."
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
