/**
 * RICH NOTES — Economics Unit 1: 1.3.4, 1.3.5, 1.3.6
 * ====================================================
 * Edexcel IAL Economics Unit 1, spec points 1.3.4–1.3.6
 * Pushes rich-format notes to Supabase section_notes table.
 *
 * Sections:
 *   1.3.4  Price Determination       (section_id: price-determination)
 *   1.3.5  Market Failure            (section_id: market-failure)
 *   1.3.6  Government Intervention   (section_id: government-intervention)
 *
 * Run with: node scripts/update-economics-unit1-rich-notes-part2.mjs
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL || 'https://trweeckuswgkenckeqfb.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);

/* ═══════════════════════════════════════════════════════════
 *  1.3.4  PRICE DETERMINATION
 *
 *  6 chapters: Equilibrium, Consumer/Producer Surplus,
 *  Price Mechanism, Indirect Taxes, Subsidies,
 *  Behavioural Economics
 * ═══════════════════════════════════════════════════════════ */

const PRICE_DETERMINATION = [

  /* ─────────────────────────────────────────────────
   *  Chapter 1: Equilibrium
   * ───────────────────────────────────────────────── */
  {
    title: "Equilibrium",
    meta: "4 concepts",
    keyIdea: "When the plans of buyers and sellers align at a single price and quantity, the market clears with no pressure for change; any other price creates a surplus or shortage that pushes the market back toward balance.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Equilibrium price</strong> — the price at which quantity demanded equals quantity supplied, so the market clears with no excess demand or supply."
          },
          {
            type: "def",
            text: "<strong>Equilibrium quantity</strong> — the amount bought and sold at the equilibrium price, where demand and supply intersect."
          },
          {
            type: "def",
            text: "<strong>Excess demand</strong> — occurs when price is below equilibrium, so quantity demanded exceeds quantity supplied, creating a shortage that pushes price upward.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Excess supply</strong> — occurs when price is above equilibrium, so quantity supplied exceeds quantity demanded, creating a surplus that pushes price downward."
          }
        ]
      },
      {
        title: "HOW EQUILIBRIUM ADJUSTS",
        items: [
          {
            type: "mech",
            text: "When demand shifts right, the original price creates a shortage; <strong>competition among buyers</strong> bids the price up until a new, higher equilibrium is reached."
          },
          {
            type: "mech",
            text: "When supply shifts right, the original price creates a surplus; <strong>firms cut prices</strong> to sell excess stock until a new, lower equilibrium is reached."
          },
          {
            type: "imp",
            text: "Equilibrium is not necessarily desirable; it simply means there is <strong>no tendency to change</strong>, even if the outcome is inefficient or unfair.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Shifts in supply and demand from 1.3.2 and 1.3.3 are the mechanism that moves equilibrium; always identify which curve shifts and why before drawing the new equilibrium."
          }
        ]
      }
    ],
    flow: {
      steps: ["Demand or supply shifts", "Excess demand or supply at old price", "Price adjusts to clear the market"],
      result: "New equilibrium price and quantity",
      resultType: "good"
    },
    examMatters: "Examiners expect you to draw the diagram first, label the old and new equilibrium clearly, then explain the adjustment process step by step. Never jump straight to the new equilibrium without explaining how excess demand or supply drives the change.",
    misconception: "Students say equilibrium means the market is working well. Wrong because equilibrium only means there is no pressure for price to change; the market can be in equilibrium while producing harmful goods or excluding the poor. Instead write: equilibrium is a stable position, not necessarily a fair or efficient one.",
    takeaway: [
      "Equilibrium is where quantity demanded equals quantity supplied; any other price triggers automatic adjustment.",
      "Always identify the curve shift first, then trace the adjustment through excess demand or supply.",
      "Equilibrium is stable, but it is not automatically socially desirable."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 2: Consumer & Producer Surplus
   * ───────────────────────────────────────────────── */
  {
    title: "Consumer & Producer Surplus",
    meta: "4 concepts",
    keyIdea: "Every voluntary transaction creates a bonus for both sides: buyers pay less than they would have been willing to, and sellers receive more than they needed to; these surpluses measure the welfare gains from trade.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Consumer surplus</strong> — the difference between what a consumer is willing to pay and the price they actually pay, shown as the area below the demand curve and above the market price.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Producer surplus</strong> — the difference between the price a producer receives and the minimum price they would have accepted, shown as the area above the supply curve and below the market price."
          }
        ]
      },
      {
        title: "HOW SURPLUS CHANGES",
        items: [
          {
            type: "mech",
            text: "When price falls, consumer surplus <strong>expands</strong> because buyers capture more of the gap between willingness to pay and the lower market price."
          },
          {
            type: "mech",
            text: "When price rises, producer surplus <strong>expands</strong> because sellers capture more of the gap between the higher market price and their minimum acceptable price."
          },
          {
            type: "imp",
            text: "Total economic welfare equals <strong>consumer surplus plus producer surplus</strong>; any policy that reduces total surplus creates a deadweight loss.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Surplus analysis is central to evaluating taxes, subsidies, and price controls later in this section because each policy redistributes or destroys surplus."
          }
        ]
      }
    ],
    flow: {
      steps: ["Buyers willing to pay more than price", "Sellers willing to accept less than price", "Both sides gain from trade"],
      result: "Total welfare maximised at equilibrium",
      resultType: "good"
    },
    examMatters: "Examiners award marks for correctly shading surplus areas on a diagram. Always shade consumer surplus between the demand curve and the price line, and producer surplus between the price line and the supply curve.",
    takeaway: [
      "Consumer surplus is the area below demand and above price; producer surplus is the area above supply and below price.",
      "Total welfare is maximised at the free-market equilibrium where the combined surplus is greatest.",
      "Any intervention that moves price away from equilibrium redistributes surplus and can create deadweight loss."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 3: The Price Mechanism
   * ───────────────────────────────────────────────── */
  {
    title: "The Price Mechanism",
    meta: "3 concepts",
    keyIdea: "Prices are the invisible language of a market economy: they signal where resources are scarce, give producers incentives to respond, and ration goods to those willing and able to pay.",
    blocks: [
      {
        title: "THREE FUNCTIONS OF PRICE",
        items: [
          {
            type: "def",
            text: "<strong>Signalling function</strong> — price changes carry information to buyers and sellers about the relative scarcity or abundance of a good, guiding their decisions without any central authority.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Incentive function</strong> — higher prices reward producers with greater profit, encouraging them to shift resources toward the goods consumers value most."
          },
          {
            type: "def",
            text: "<strong>Rationing function</strong> — price allocates scarce goods to those consumers with the highest willingness and ability to pay, preventing excess demand from persisting."
          }
        ]
      },
      {
        title: "HOW THE FUNCTIONS CONNECT",
        items: [
          {
            type: "mech",
            text: "Rising prices <strong>signal</strong> scarcity, <strong>incentivise</strong> producers to supply more, and <strong>ration</strong> the good to fewer buyers, all working together to restore equilibrium."
          },
          {
            type: "imp",
            text: "The price mechanism allocates resources efficiently only when markets are competitive; <strong>market failures</strong> break one or more of these functions.",
            tag: "exam"
          },
          {
            type: "link",
            text: "The price mechanism is the core argument for free markets; sections 1.3.5 and 1.3.6 examine when it fails and how governments try to fix it."
          }
        ]
      }
    ],
    flow: {
      steps: ["Price rises due to scarcity", "Signal reaches producers", "Producers supply more, buyers buy less"],
      result: "Resources reallocated efficiently",
      resultType: "good"
    },
    examMatters: "Examiners want all three functions named and applied. A common mistake is describing only one. For full marks, explain how signalling triggers the incentive, and how the incentive leads to rationing, forming a chain.",
    misconception: "Students describe the price mechanism as only about rationing. Wrong because rationing is just one of three interconnected functions. Instead write: the price mechanism works through signalling, incentivising, and rationing, and all three operate simultaneously to allocate resources.",
    takeaway: [
      "Signalling conveys information, incentives motivate a response, and rationing distributes the good.",
      "The three functions work as a chain: signal triggers incentive, which achieves rationing.",
      "The price mechanism fails when externalities, public goods, or monopoly power distort the signals."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 4: Indirect Taxes
   * ───────────────────────────────────────────────── */
  {
    title: "Indirect Taxes",
    meta: "5 concepts",
    keyIdea: "Governments place taxes on goods rather than income to raise revenue and discourage harmful consumption, but the burden falls on whichever side of the market is less able to escape the tax.",
    blocks: [
      {
        title: "TYPES OF TAX",
        items: [
          {
            type: "def",
            text: "<strong>Specific tax</strong> — a fixed amount per unit sold, such as 50p per litre of fuel, which shifts the supply curve upward by a constant vertical distance.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Ad valorem tax</strong> — a percentage of the selling price, such as 20% VAT, which shifts the supply curve upward by an increasing amount as price rises, creating a widening gap."
          }
        ]
      },
      {
        title: "TAX INCIDENCE",
        items: [
          {
            type: "def",
            text: "<strong>Tax incidence</strong> — the division of the tax burden between consumers and producers, determined by the relative elasticities of demand and supply."
          },
          {
            type: "mech",
            text: "When demand is <strong>price inelastic</strong>, consumers bear most of the tax because they cannot easily reduce purchases, so producers pass on a large share of the tax as higher prices."
          },
          {
            type: "mech",
            text: "When supply is <strong>price inelastic</strong>, producers bear most of the tax because they cannot easily reduce output, so they absorb the tax through lower revenue per unit."
          },
          {
            type: "imp",
            text: "Indirect taxes reduce both consumer and producer surplus and create a <strong>deadweight loss</strong> triangle, representing welfare destroyed by the tax.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Elasticity from 1.3.2 and 1.3.3 directly determines tax incidence; always link PED and PES to who bears the burden."
          }
        ]
      }
    ],
    flow: {
      steps: ["Tax imposed on producers", "Supply curve shifts up", "Price rises, quantity falls"],
      result: "Burden split by elasticity; deadweight loss created",
      resultType: "bad"
    },
    formulas: [
      {
        label: "TAX REVENUE",
        text: "Tax Revenue = Tax per Unit x Quantity Sold after Tax"
      }
    ],
    examMatters: "Examiners expect you to distinguish specific from ad valorem on a diagram. For specific tax, draw a parallel upward shift; for ad valorem, draw a pivoting shift that widens as price increases. Always shade the deadweight loss triangle and label who bears the greater burden.",
    misconception: "Students say the producer always pays the tax because the government collects it from them. Wrong because the economic burden depends on elasticity, not who writes the cheque. Instead write: the legal incidence falls on the producer, but the economic incidence is shared according to relative elasticities of demand and supply.",
    takeaway: [
      "Specific taxes shift supply up by a fixed amount; ad valorem taxes shift supply by an increasing percentage.",
      "Tax incidence depends on elasticity: the more inelastic side bears the greater share of the burden.",
      "Every indirect tax creates deadweight loss by reducing the quantity traded below the free-market level."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 5: Subsidies
   * ───────────────────────────────────────────────── */
  {
    title: "Subsidies",
    meta: "4 concepts",
    keyIdea: "A subsidy is a tax in reverse: the government pays producers to lower the price and boost consumption, but just like taxes, who benefits most depends on elasticity.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Subsidy</strong> — a payment from the government to producers that reduces their costs of production, shifting the supply curve downward and to the right."
          }
        ]
      },
      {
        title: "HOW SUBSIDIES WORK",
        items: [
          {
            type: "mech",
            text: "The subsidy shifts supply right, lowering the <strong>equilibrium price</strong> and increasing the equilibrium quantity, making the good more affordable and more widely consumed.",
            tag: "exam"
          },
          {
            type: "mech",
            text: "When demand is price inelastic, consumers gain <strong>less of the subsidy</strong> as a price reduction because they would have bought nearly the same amount anyway; producers capture most of the benefit."
          },
          {
            type: "mech",
            text: "When demand is price elastic, consumers gain <strong>more of the subsidy</strong> as a price reduction because lower prices significantly increase their purchases."
          },
          {
            type: "imp",
            text: "Subsidies have an <strong>opportunity cost</strong>; the money spent on the subsidy could have funded healthcare, education, or other public services.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Subsidies are the mirror image of indirect taxes; the incidence analysis in the previous chapter applies in reverse."
          }
        ]
      }
    ],
    flow: {
      steps: ["Government pays subsidy to producers", "Supply shifts right, price falls", "Quantity consumed increases"],
      result: "Greater consumption but at a fiscal cost",
      resultType: "good"
    },
    formulas: [
      {
        label: "TOTAL SUBSIDY COST",
        text: "Total Subsidy Cost = Subsidy per Unit x Quantity Sold after Subsidy"
      }
    ],
    examMatters: "Examiners want you to shade the total cost of the subsidy on a diagram as the rectangle between the new and old supply curves, up to the new quantity. Then evaluate whether the benefit to consumers and producers justifies the government spending.",
    takeaway: [
      "A subsidy shifts supply right, lowering price and raising quantity traded.",
      "Subsidy incidence mirrors tax incidence: the more inelastic side captures the greater share of the benefit.",
      "Always evaluate subsidies against their opportunity cost and potential for government failure."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 6: Behavioural Economics
   * ───────────────────────────────────────────────── */
  {
    title: "Behavioural Economics",
    meta: "5 concepts",
    keyIdea: "Traditional economics assumes people are perfectly rational calculators, but real humans use mental shortcuts, are swayed by how choices are presented, and often act against their own long-term interests.",
    blocks: [
      {
        title: "KEY CONCEPTS",
        items: [
          {
            type: "def",
            text: "<strong>Bounded rationality</strong> — the idea that consumers have limited information, limited time, and limited ability to process data, so they satisfice rather than optimise.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Bounded self-control</strong> — the tendency for people to act on short-term impulses even when they know the long-term consequences are harmful, such as overeating or under-saving."
          },
          {
            type: "def",
            text: "<strong>Bias and heuristics</strong> — systematic mental shortcuts like anchoring, loss aversion, and the status quo bias that cause decisions to deviate predictably from the rational model."
          }
        ]
      },
      {
        title: "IMPLICATIONS FOR MARKETS",
        items: [
          {
            type: "mech",
            text: "Because consumers are not fully rational, the <strong>demand curve</strong> may not reflect true preferences; people may overconsume demerit goods or underconsume merit goods."
          },
          {
            type: "mech",
            text: "<strong>Default options</strong> and choice architecture powerfully influence behaviour; people tend to stick with whatever option is pre-selected rather than actively choosing."
          },
          {
            type: "imp",
            text: "Behavioural economics provides a justification for <strong>nudge policies</strong> where governments alter the choice environment rather than restricting freedom, such as auto-enrolling workers into pensions.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Behavioural economics challenges the assumption behind the price mechanism that consumers respond rationally to price signals, linking to market failure in 1.3.5."
          }
        ]
      }
    ],
    flow: {
      steps: ["Consumers face complex choices", "Bounded rationality leads to shortcuts", "Decisions deviate from rational model"],
      result: "Market outcomes differ from the efficient prediction",
      resultType: "bad"
    },
    examMatters: "Examiners increasingly test behavioural economics as an evaluation point. Use it to challenge the assumption that the price mechanism allocates resources efficiently; if consumers are not rational, price signals may not lead to welfare-maximising outcomes.",
    misconception: "Students say behavioural economics proves markets never work. Wrong because most market transactions still function well through the price mechanism; behavioural economics identifies specific, predictable biases that cause problems in certain contexts. Instead write: behavioural economics refines the rational model by showing where systematic biases lead to suboptimal choices, not that all choices are irrational.",
    takeaway: [
      "Bounded rationality means consumers satisfice rather than optimise, undermining the traditional demand model.",
      "Default options and choice architecture shape behaviour more than people realise.",
      "Behavioural economics justifies nudge policies as a less intrusive alternative to regulation or taxation."
    ]
  }

];

/* ═══════════════════════════════════════════════════════════
 *  1.3.5  MARKET FAILURE
 *
 *  7 chapters: Types of Market Failure, Externalities,
 *  Public Goods, Merit/Demerit Goods, Information Failures,
 *  Market Power, Welfare Loss
 * ═══════════════════════════════════════════════════════════ */

const MARKET_FAILURE = [

  /* ─────────────────────────────────────────────────
   *  Chapter 1: Types of Market Failure
   * ───────────────────────────────────────────────── */
  {
    title: "Types of Market Failure",
    meta: "3 concepts",
    keyIdea: "A market fails whenever the free market produces an outcome that does not maximise total welfare; the price mechanism misfires, and resources end up in the wrong place or in the wrong quantity.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Market failure</strong> — a situation where the free market leads to a misallocation of resources, meaning the outcome is not allocatively efficient.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Allocative efficiency</strong> — achieved when resources are distributed so that no reallocation could make someone better off without making someone else worse off, occurring where price equals marginal cost."
          },
          {
            type: "def",
            text: "<strong>Complete market failure</strong> — occurs when the market fails to provide a good at all, as with public goods where no private firm can charge a price."
          }
        ]
      },
      {
        title: "CAUSES OF FAILURE",
        items: [
          {
            type: "mech",
            text: "Market failure arises from <strong>externalities</strong>, public goods, information failures, and market power, each breaking the price mechanism in a different way."
          },
          {
            type: "imp",
            text: "Partial market failure means the good is provided but at the <strong>wrong quantity</strong>; complete market failure means the good is not provided at all.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Every type of market failure covered in this section represents a case where one or more functions of the price mechanism from 1.3.4 breaks down."
          }
        ]
      }
    ],
    flow: {
      steps: ["Price mechanism fails", "Resources misallocated", "Welfare not maximised"],
      result: "Deadweight loss to society",
      resultType: "bad"
    },
    examMatters: "Examiners want you to state the specific type of market failure before analysing it. Never write vaguely that the market fails; identify whether the failure is due to externalities, public goods, information failure, or market power, and explain why that specific cause leads to misallocation.",
    takeaway: [
      "Market failure means the free market does not achieve allocative efficiency.",
      "Partial failure means wrong quantity; complete failure means no provision at all.",
      "Always name the specific cause of failure before evaluating solutions."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 2: Externalities
   * ───────────────────────────────────────────────── */
  {
    title: "Externalities",
    meta: "8 concepts",
    keyIdea: "When a transaction spills costs or benefits onto bystanders who did not choose to be involved, the market produces too much of harmful things and too little of beneficial ones because the price ignores those third-party effects.",
    blocks: [
      {
        title: "COST AND BENEFIT CURVES",
        items: [
          {
            type: "def",
            text: "<strong>Marginal private cost (MPC)</strong> — the cost to the producer of making one more unit, represented by the supply curve in a competitive market."
          },
          {
            type: "def",
            text: "<strong>Marginal social cost (MSC)</strong> — the total cost to society of one more unit, equal to MPC plus any negative externality in production."
          },
          {
            type: "def",
            text: "<strong>Marginal private benefit (MPB)</strong> — the benefit to the consumer of consuming one more unit, represented by the demand curve."
          },
          {
            type: "def",
            text: "<strong>Marginal social benefit (MSB)</strong> — the total benefit to society of one more unit, equal to MPB plus any positive externality in consumption.",
            tag: "exam"
          }
        ]
      },
      {
        title: "FOUR TYPES OF EXTERNALITY",
        items: [
          {
            type: "mech",
            text: "<strong>Negative externality in production</strong> — MSC exceeds MPC, such as factory pollution; the market overproduces because producers do not pay the full social cost."
          },
          {
            type: "mech",
            text: "<strong>Negative externality in consumption</strong> — MSB is less than MPB, such as passive smoking; consumers overconsume because they ignore the harm to others."
          },
          {
            type: "mech",
            text: "<strong>Positive externality in production</strong> — MSC is less than MPC, such as training workers who then benefit other employers; the market underproduces."
          },
          {
            type: "mech",
            text: "<strong>Positive externality in consumption</strong> — MSB exceeds MPB, such as vaccination providing herd immunity; the market underconsumes because individuals ignore the benefit to others.",
            tag: "exam"
          }
        ]
      },
      {
        title: "WHY IT MATTERS",
        items: [
          {
            type: "imp",
            text: "The socially optimal output is where <strong>MSB equals MSC</strong>; any deviation creates a welfare loss triangle representing the cost of misallocation."
          },
          {
            type: "link",
            text: "Externalities justify government intervention in 1.3.6 through taxes, subsidies, regulation, and tradeable permits."
          }
        ]
      }
    ],
    flow: {
      steps: ["Third-party costs or benefits exist", "Price ignores external effects", "Market over- or underproduces"],
      result: "Welfare loss at free-market output",
      resultType: "bad"
    },
    formulas: [
      {
        label: "EXTERNAL COST",
        text: "External Cost = MSC - MPC"
      },
      {
        label: "EXTERNAL BENEFIT",
        text: "External Benefit = MSB - MPB"
      }
    ],
    examMatters: "Examiners require you to draw the correct pair of curves for each externality type. For a negative production externality, MSC is above MPC; for a positive consumption externality, MSB is above MPB. Label the welfare loss triangle between the free-market quantity and the socially optimal quantity.",
    misconception: "Students confuse which curve shifts for production versus consumption externalities. Wrong because production externalities affect the cost side (MPC vs MSC) while consumption externalities affect the benefit side (MPB vs MSB). Instead write: always ask whether the third party is affected by the production process or by the act of consumption, then adjust the correct curve.",
    takeaway: [
      "Negative externalities cause overproduction; positive externalities cause underproduction relative to the social optimum.",
      "The socially optimal output is where MSB equals MSC, not where MPB equals MPC.",
      "Production externalities shift the cost curve; consumption externalities shift the benefit curve."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 3: Public Goods
   * ───────────────────────────────────────────────── */
  {
    title: "Public Goods",
    meta: "4 concepts",
    keyIdea: "Some goods cannot be sold on a market because once they exist, nobody can be excluded and nobody's use reduces the amount left; this makes private provision impossible and is the clearest case of complete market failure.",
    blocks: [
      {
        title: "CHARACTERISTICS",
        items: [
          {
            type: "def",
            text: "<strong>Non-excludable</strong> — once the good is provided, it is impossible to prevent anyone from using it, so firms cannot charge a price and consumers will free ride.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Non-rival</strong> — one person's use does not reduce the amount available to others, so the marginal cost of an extra user is zero."
          }
        ]
      },
      {
        title: "THE FREE RIDER PROBLEM",
        items: [
          {
            type: "def",
            text: "<strong>Free rider</strong> — a person who benefits from a good without paying for it because non-excludability means no one can be denied access.",
            tag: "exam"
          },
          {
            type: "mech",
            text: "Because consumers expect others to pay while they free ride, <strong>no effective demand</strong> is revealed and private firms cannot earn revenue, so the good is not produced."
          },
          {
            type: "imp",
            text: "Public goods such as national defence, street lighting, and flood defences must be provided by the <strong>government and funded through taxation</strong> because the market completely fails."
          },
          {
            type: "link",
            text: "The free rider problem directly links to government provision in 1.3.6; it is the strongest justification for state spending on certain goods."
          }
        ]
      }
    ],
    flow: {
      steps: ["Good is non-rival and non-excludable", "Consumers free ride", "No private firm can charge a price"],
      result: "Complete market failure; government must provide",
      resultType: "bad"
    },
    examMatters: "Examiners expect you to explain both non-rivalry and non-excludability, then link them to the free rider problem. Many students only mention one characteristic. For top marks, show how non-excludability causes the free rider problem and why non-rivalry means the efficient price would be zero.",
    misconception: "Students call any government-provided good a public good. Wrong because public goods are defined by non-rivalry and non-excludability, not by who provides them; the NHS is a merit good, not a public good. Instead write: a public good must be non-rival and non-excludable by nature, regardless of who provides it.",
    takeaway: [
      "Public goods are non-rival and non-excludable, leading to the free rider problem.",
      "Free riding means no effective demand, so private markets completely fail to provide the good.",
      "Government provision funded by taxation is the standard solution to public goods."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 4: Merit & Demerit Goods
   * ───────────────────────────────────────────────── */
  {
    title: "Merit & Demerit Goods",
    meta: "4 concepts",
    keyIdea: "Some goods are better for people than they realise and would be underconsumed without help; others are worse than people believe and would be overconsumed without intervention; in both cases, individuals make choices they would regret with full information.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Merit good</strong> — a good that is underconsumed in a free market because consumers underestimate its private benefits or ignore its positive externalities, such as education and healthcare.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Demerit good</strong> — a good that is overconsumed in a free market because consumers underestimate its private costs or ignore its negative externalities, such as tobacco and alcohol."
          }
        ]
      },
      {
        title: "WHY MARKETS GET IT WRONG",
        items: [
          {
            type: "mech",
            text: "Merit goods generate <strong>positive externalities</strong> that consumers do not factor into their decisions, so MPB understates MSB and the free market produces below the socially optimal quantity."
          },
          {
            type: "mech",
            text: "Demerit goods generate <strong>negative externalities</strong> that consumers do not factor into their decisions, so MPB overstates MSB and the free market produces above the socially optimal quantity."
          },
          {
            type: "imp",
            text: "Merit and demerit goods involve a <strong>value judgement</strong> by the government about what is good or bad for citizens, which raises questions about paternalism and individual freedom.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Behavioural economics from 1.3.4 strengthens the case for intervention; bounded rationality and bounded self-control explain why consumers persistently underconsume merit goods and overconsume demerit goods."
          }
        ]
      }
    ],
    flow: {
      steps: ["Consumers misjudge true costs or benefits", "Positive or negative externalities ignored", "Market over- or underprovides"],
      result: "Welfare loss; government may intervene",
      resultType: "bad"
    },
    examMatters: "Examiners want you to explain merit and demerit goods using both information failure and externalities. The strongest answers show that consumers make bad choices because they lack information AND because third parties are affected. Use both arguments together.",
    misconception: "Students say merit goods are the same as public goods. Wrong because merit goods are provided by the market but in insufficient quantities, while public goods are not provided at all. Instead write: merit goods are rival and excludable but underprovided; public goods are non-rival and non-excludable so the market completely fails.",
    takeaway: [
      "Merit goods are underconsumed due to information failure and positive externalities; demerit goods are overconsumed for the opposite reasons.",
      "Merit and demerit goods involve value judgements, which means intervention is debatable.",
      "Use both the information failure and externality arguments for full marks."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 5: Information Failures
   * ───────────────────────────────────────────────── */
  {
    title: "Information Failures",
    meta: "3 concepts",
    keyIdea: "Markets assume buyers and sellers know what they are doing, but when one side knows more than the other or when neither side has enough data, the wrong quantity gets produced and the wrong people get served.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Asymmetric information</strong> — a situation where one party in a transaction has more or better information than the other, leading to market failure because the less-informed party makes poor decisions.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Moral hazard</strong> — occurs when one party takes greater risks because they know another party bears the cost, such as reckless behaviour after buying insurance."
          },
          {
            type: "def",
            text: "<strong>Adverse selection</strong> — occurs when asymmetric information causes the wrong type of participant to dominate a market, such as high-risk drivers being more likely to buy insurance."
          }
        ]
      },
      {
        title: "MARKET CONSEQUENCES",
        items: [
          {
            type: "mech",
            text: "In the used car market, sellers know the quality but buyers do not; buyers offer low prices to avoid lemons, which drives <strong>good-quality sellers</strong> out of the market."
          },
          {
            type: "mech",
            text: "In insurance markets, companies cannot distinguish high-risk from low-risk customers, so they charge average premiums that <strong>attract high-risk buyers</strong> and repel low-risk ones."
          },
          {
            type: "imp",
            text: "Information failures undermine the assumption behind the demand curve that consumers make <strong>fully informed choices</strong>, weakening the case for unregulated free markets.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Information failures reinforce the argument for merit and demerit goods: consumers who lack information cannot accurately weigh private costs against private benefits."
          }
        ]
      }
    ],
    flow: {
      steps: ["One side has better information", "Other side makes poor decisions", "Wrong quantity or quality traded"],
      result: "Market failure through misallocation",
      resultType: "bad"
    },
    examMatters: "Examiners test asymmetric information through real-world examples. Always name which side has the information advantage and explain how the other side's decisions are distorted. The best answers link to moral hazard or adverse selection as consequences.",
    takeaway: [
      "Asymmetric information means one side of the market makes decisions based on incomplete data.",
      "Moral hazard changes behaviour after a contract; adverse selection changes who enters the market before the contract.",
      "Information failures justify regulation, mandatory disclosure, and government provision of information."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 6: Market Power
   * ───────────────────────────────────────────────── */
  {
    title: "Market Power",
    meta: "3 concepts",
    keyIdea: "When a single firm or a small group dominates a market, they restrict output and raise prices above the competitive level, transferring surplus from consumers to themselves and destroying welfare in the process.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Monopoly power</strong> — the ability of a firm to set prices above the competitive level because it faces little or no competition, resulting in higher prices and lower output than a competitive market.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Price maker</strong> — a firm with monopoly power that can choose its price rather than accepting the market price, unlike firms in perfect competition."
          }
        ]
      },
      {
        title: "WELFARE EFFECTS",
        items: [
          {
            type: "mech",
            text: "A monopolist restricts output below the competitive level and charges a higher price, <strong>transferring consumer surplus</strong> to itself as extra profit."
          },
          {
            type: "mech",
            text: "The output restriction means some units that would generate more benefit than cost are <strong>never produced</strong>, creating a deadweight welfare loss."
          },
          {
            type: "imp",
            text: "Monopoly power leads to <strong>allocative inefficiency</strong> because price exceeds marginal cost, meaning resources are not directed to their highest-value use.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Market power connects to government intervention in 1.3.6 through regulation, competition policy, and potential nationalisation."
          }
        ]
      }
    ],
    flow: {
      steps: ["Firm gains monopoly power", "Output restricted, price raised", "Consumer surplus transferred to profit"],
      result: "Deadweight loss and allocative inefficiency",
      resultType: "bad"
    },
    examMatters: "Examiners want you to show the welfare loss on a diagram by comparing monopoly price and output to the competitive equilibrium. Shade the deadweight loss triangle and the area of surplus transferred from consumers to the monopolist.",
    takeaway: [
      "Monopoly power allows firms to raise prices and restrict output, creating deadweight loss.",
      "Consumer surplus is transferred to the monopolist as supernormal profit.",
      "Monopoly causes allocative inefficiency because price exceeds marginal cost."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 7: Welfare Loss
   * ───────────────────────────────────────────────── */
  {
    title: "Welfare Loss",
    meta: "3 concepts",
    keyIdea: "Whenever the market produces more or less than the socially optimal quantity, a triangle of lost welfare appears on the diagram representing transactions that should have happened but did not, or transactions that happened but should not have.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Deadweight loss</strong> — the net loss of total economic welfare when the market does not produce at the socially optimal output, shown as a triangle between the MSB and MSC curves.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Social optimum</strong> — the output level where marginal social benefit equals marginal social cost, maximising total welfare with no deadweight loss."
          }
        ]
      },
      {
        title: "SOURCES OF WELFARE LOSS",
        items: [
          {
            type: "mech",
            text: "Externalities create welfare loss because the market ignores social costs or benefits, producing at <strong>MPB = MPC</strong> instead of MSB = MSC."
          },
          {
            type: "mech",
            text: "Indirect taxes and price controls create welfare loss by moving quantity away from the <strong>free-market equilibrium</strong>, even when the aim is to correct a failure."
          },
          {
            type: "mech",
            text: "Monopoly power creates welfare loss by <strong>restricting output</strong> below the level where price equals marginal cost."
          },
          {
            type: "imp",
            text: "The size of the deadweight loss triangle depends on <strong>elasticity</strong>; more elastic curves produce larger welfare losses for any given distortion.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Welfare loss is the unifying concept across all market failures; every diagram in this section should include a clearly labelled deadweight loss triangle."
          }
        ]
      }
    ],
    flow: {
      steps: ["Market produces wrong quantity", "Some beneficial trades missed or harmful trades occur", "Net welfare destroyed"],
      result: "Deadweight loss triangle on the diagram",
      resultType: "bad"
    },
    examMatters: "Examiners award marks specifically for identifying and shading the deadweight loss on a diagram. Always draw it as a triangle between the social optimum and the market output, bounded by the MSB and MSC curves. Label it clearly as deadweight loss or welfare loss.",
    takeaway: [
      "Deadweight loss is the welfare destroyed when the market does not produce at the socially optimal level.",
      "It appears as a triangle between MSB and MSC, from the market output to the social optimum.",
      "Every source of market failure and most government interventions create some form of welfare loss."
    ]
  }

];

/* ═══════════════════════════════════════════════════════════
 *  1.3.6  GOVERNMENT INTERVENTION
 *
 *  7 chapters: Indirect Taxes, Subsidies, Max/Min Prices,
 *  Tradeable Permits, State Provision, Regulation,
 *  Government Failure
 * ═══════════════════════════════════════════════════════════ */

const GOVERNMENT_INTERVENTION = [

  /* ─────────────────────────────────────────────────
   *  Chapter 1: Indirect Taxes to Correct Externalities
   * ───────────────────────────────────────────────── */
  {
    title: "Indirect Taxes to Correct Externalities",
    meta: "4 concepts",
    keyIdea: "By making polluters pay for the damage they cause, an indirect tax forces the private cost up to the social cost, nudging output toward the level society actually wants.",
    blocks: [
      {
        title: "HOW TAXES CORRECT FAILURE",
        items: [
          {
            type: "def",
            text: "<strong>Pigouvian tax</strong> — a tax set equal to the external cost per unit so that MPC plus the tax equals MSC, internalising the externality and achieving the socially optimal output.",
            tag: "exam"
          },
          {
            type: "mech",
            text: "The tax shifts the supply curve upward by the amount of the <strong>external cost</strong>, raising the price and reducing quantity to the socially optimal level."
          },
          {
            type: "mech",
            text: "Tax revenue can be <strong>hypothecated</strong> to fund clean-up or compensate those harmed by the externality, further correcting the market failure."
          }
        ]
      },
      {
        title: "EVALUATION",
        items: [
          {
            type: "imp",
            text: "Setting the tax at exactly the right level requires <strong>accurate measurement</strong> of external costs, which is extremely difficult in practice.",
            tag: "exam"
          },
          {
            type: "imp",
            text: "If demand is highly inelastic, the tax raises revenue but <strong>barely reduces consumption</strong>, failing to correct the externality."
          },
          {
            type: "link",
            text: "This connects to indirect taxes in 1.3.4; the analysis of incidence and deadweight loss applies, but here the tax is intended to reduce a welfare loss rather than create one."
          }
        ]
      }
    ],
    flow: {
      steps: ["Identify external cost", "Set tax equal to external cost per unit", "Supply shifts up, output falls to social optimum"],
      result: "Externality internalised; welfare loss reduced",
      resultType: "good"
    },
    examMatters: "Examiners want you to show the tax on a diagram by shifting the supply curve up to MSC. Then evaluate whether the tax can be accurately set and whether demand elasticity limits its effectiveness.",
    misconception: "Students say taxes always solve externalities. Wrong because if the tax is set too high or too low, the output will still not be at the social optimum, and if demand is inelastic, the quantity change may be minimal. Instead write: a Pigouvian tax can theoretically achieve the social optimum, but information problems and inelastic demand may limit its effectiveness in practice.",
    takeaway: [
      "A Pigouvian tax internalises the externality by making the polluter pay the full social cost.",
      "Effectiveness depends on accurate measurement of external costs and the elasticity of demand.",
      "Tax revenue can be used to compensate victims or fund environmental clean-up."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 2: Subsidies to Correct Externalities
   * ───────────────────────────────────────────────── */
  {
    title: "Subsidies to Correct Externalities",
    meta: "4 concepts",
    keyIdea: "When a good generates benefits that spill over to society but the market ignores them, a subsidy closes the gap by making it cheaper to produce or consume, pulling output up to the socially optimal level.",
    blocks: [
      {
        title: "HOW SUBSIDIES CORRECT FAILURE",
        items: [
          {
            type: "mech",
            text: "A subsidy equal to the <strong>external benefit</strong> per unit shifts the supply curve right, lowering the price and increasing quantity to where MSB equals MSC.",
            tag: "exam"
          },
          {
            type: "mech",
            text: "Alternatively, the subsidy can be given directly to consumers to shift the <strong>demand curve</strong> right, achieving the same increase in quantity consumed."
          }
        ]
      },
      {
        title: "EVALUATION",
        items: [
          {
            type: "imp",
            text: "Subsidies have a significant <strong>opportunity cost</strong>; the government revenue spent on the subsidy cannot be used for other priorities like infrastructure or debt reduction.",
            tag: "exam"
          },
          {
            type: "imp",
            text: "Subsidies may create <strong>dependency</strong> if producers rely on them to stay profitable, reducing incentives to become more efficient."
          },
          {
            type: "imp",
            text: "Measuring the exact size of the external benefit is difficult, so the subsidy may be <strong>too large or too small</strong> to hit the social optimum."
          },
          {
            type: "link",
            text: "This mirrors the subsidy analysis in 1.3.4 but here the goal is correcting underconsumption of merit goods or goods with positive externalities."
          }
        ]
      }
    ],
    flow: {
      steps: ["Identify external benefit", "Set subsidy equal to external benefit per unit", "Supply shifts right, output rises to social optimum"],
      result: "Positive externality internalised; welfare gain",
      resultType: "good"
    },
    examMatters: "Examiners want you to show the subsidy on a diagram by shifting supply right so that the new equilibrium quantity equals the socially optimal quantity. Always evaluate by discussing opportunity cost and the difficulty of measuring external benefits.",
    takeaway: [
      "A subsidy equal to the external benefit per unit can achieve the socially optimal output.",
      "The opportunity cost of subsidies means the money cannot be spent on alternative public priorities.",
      "Measuring external benefits accurately is just as difficult as measuring external costs."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 3: Maximum & Minimum Prices
   * ───────────────────────────────────────────────── */
  {
    title: "Maximum & Minimum Prices",
    meta: "4 concepts",
    keyIdea: "Governments sometimes override the price mechanism by capping how high or how low a price can go, protecting consumers or producers but always creating a gap between quantity demanded and supplied.",
    blocks: [
      {
        title: "PRICE CEILINGS",
        items: [
          {
            type: "def",
            text: "<strong>Maximum price (price ceiling)</strong> — a legally imposed upper limit on price set below the equilibrium, designed to keep essential goods affordable for consumers.",
            tag: "exam"
          },
          {
            type: "mech",
            text: "At the maximum price, quantity demanded exceeds quantity supplied, creating <strong>excess demand</strong> and shortages that require rationing by methods other than price."
          },
          {
            type: "imp",
            text: "Price ceilings can lead to <strong>black markets</strong> where goods are sold illegally above the maximum price, and reduced quality as producers cut costs to survive at the lower price."
          }
        ]
      },
      {
        title: "PRICE FLOORS",
        items: [
          {
            type: "def",
            text: "<strong>Minimum price (price floor)</strong> — a legally imposed lower limit on price set above the equilibrium, designed to protect producers by guaranteeing a minimum income per unit.",
            tag: "exam"
          },
          {
            type: "mech",
            text: "At the minimum price, quantity supplied exceeds quantity demanded, creating <strong>excess supply</strong> which the government may need to buy up or store at additional cost."
          },
          {
            type: "imp",
            text: "Minimum prices on alcohol aim to reduce consumption of a demerit good; minimum wages aim to protect workers, but both create <strong>surplus in the market</strong>."
          },
          {
            type: "link",
            text: "Price controls override the rationing function of the price mechanism from 1.3.4; goods are no longer allocated by willingness to pay but by queuing, luck, or government decision."
          }
        ]
      }
    ],
    flow: {
      steps: ["Government sets price above or below equilibrium", "Quantity demanded and supplied diverge", "Excess demand or supply emerges"],
      result: "Shortages or surpluses; price mechanism overridden",
      resultType: "bad"
    },
    examMatters: "Examiners expect you to draw the diagram showing the maximum or minimum price, clearly label the excess demand or supply, and then evaluate unintended consequences such as black markets, reduced quality, or government storage costs.",
    misconception: "Students confuse which is set above and which below equilibrium. Wrong because a maximum price is set below equilibrium to keep prices low, while a minimum price is set above equilibrium to keep prices high. Instead write: a price ceiling is below equilibrium (protecting buyers); a price floor is above equilibrium (protecting sellers).",
    takeaway: [
      "Maximum prices are set below equilibrium and create shortages; minimum prices are set above equilibrium and create surpluses.",
      "Both override the price mechanism and require alternative rationing methods.",
      "Unintended consequences include black markets, quality reduction, and government storage costs."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 4: Tradeable Pollution Permits
   * ───────────────────────────────────────────────── */
  {
    title: "Tradeable Pollution Permits",
    meta: "3 concepts",
    keyIdea: "Instead of taxing pollution directly, the government sets a total limit and lets firms trade the right to pollute, so reductions happen where they are cheapest and the market discovers the true cost of emissions.",
    blocks: [
      {
        title: "HOW CAP AND TRADE WORKS",
        items: [
          {
            type: "def",
            text: "<strong>Tradeable pollution permit</strong> — a government-issued licence allowing a firm to emit a set amount of pollution; permits can be bought and sold on a market, creating a price for pollution.",
            tag: "exam"
          },
          {
            type: "mech",
            text: "The government sets an overall <strong>cap</strong> on total emissions and distributes permits; firms that can reduce pollution cheaply sell their spare permits to firms where reduction is expensive."
          },
          {
            type: "mech",
            text: "Over time the government can <strong>reduce the cap</strong>, cutting the total number of permits available, raising their price, and driving further emission reductions."
          }
        ]
      },
      {
        title: "EVALUATION",
        items: [
          {
            type: "imp",
            text: "Cap and trade uses the <strong>market mechanism</strong> to find the cheapest way to reduce pollution, making it more cost-effective than uniform regulation.",
            tag: "exam"
          },
          {
            type: "imp",
            text: "The permit price can be <strong>volatile</strong>, making it hard for firms to plan long-term investment in clean technology."
          },
          {
            type: "imp",
            text: "Wealthy firms can simply <strong>buy permits</strong> rather than reducing pollution, meaning local pollution hotspots may persist."
          },
          {
            type: "link",
            text: "Tradeable permits combine market incentives with government control, sitting between pure taxation and direct regulation as a policy tool."
          }
        ]
      }
    ],
    flow: {
      steps: ["Government sets emissions cap", "Firms trade permits on a market", "Reductions occur where cheapest"],
      result: "Total pollution falls at minimum cost",
      resultType: "good"
    },
    examMatters: "Examiners want you to explain how the market for permits works using a supply and demand diagram for permits. The supply is fixed by the cap (vertical supply curve), and demand comes from firms needing to pollute. Reducing the cap shifts supply left, raising the permit price.",
    takeaway: [
      "Cap and trade sets a quantity limit on pollution and lets the market find the cheapest reductions.",
      "Reducing the cap over time raises permit prices and drives further emission cuts.",
      "Price volatility and the ability of wealthy firms to buy permits are key evaluation points."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 5: State Provision & Nudge Theory
   * ───────────────────────────────────────────────── */
  {
    title: "State Provision & Nudge Theory",
    meta: "4 concepts",
    keyIdea: "When markets completely fail or persistently underprovide, the government can step in to supply the good directly; when the problem is irrational choices, a gentle nudge can steer behaviour without removing freedom.",
    blocks: [
      {
        title: "DIRECT PROVISION",
        items: [
          {
            type: "def",
            text: "<strong>State provision</strong> — the government directly supplies goods and services, funded by taxation, when the free market fails to provide them at all or in sufficient quantity.",
            tag: "exam"
          },
          {
            type: "mech",
            text: "Public goods like national defence require state provision because the <strong>free rider problem</strong> makes private provision impossible."
          },
          {
            type: "mech",
            text: "Merit goods like healthcare and education are provided by the state to ensure <strong>universal access</strong> regardless of ability to pay, correcting both underconsumption and inequality."
          }
        ]
      },
      {
        title: "NUDGE THEORY",
        items: [
          {
            type: "def",
            text: "<strong>Nudge theory</strong> — the idea that small changes to the choice environment can alter behaviour in predictable ways without banning options or changing financial incentives.",
            tag: "exam"
          },
          {
            type: "mech",
            text: "<strong>Default options</strong> are a powerful nudge; auto-enrolling workers into pensions dramatically increases saving rates because most people never opt out."
          },
          {
            type: "imp",
            text: "Nudges are <strong>low-cost and preserve freedom</strong> of choice, making them politically attractive compared to taxes or bans."
          },
          {
            type: "imp",
            text: "Critics argue nudges are <strong>paternalistic</strong> and may not work for deep-rooted behaviours like addiction, where stronger intervention is needed."
          },
          {
            type: "link",
            text: "Nudge theory directly applies behavioural economics from 1.3.4; bounded rationality justifies nudges because fully rational consumers would not need them."
          }
        ]
      }
    ],
    flow: {
      steps: ["Market fails or consumers choose poorly", "Government provides directly or nudges behaviour", "Consumption moves toward social optimum"],
      result: "Welfare improved without banning choices",
      resultType: "good"
    },
    examMatters: "Examiners want you to evaluate nudges by comparing them to harder interventions like taxes and bans. The strongest answers discuss when nudges are sufficient and when the severity of the market failure requires stronger measures.",
    takeaway: [
      "State provision is essential for public goods and ensures universal access to merit goods.",
      "Nudges alter behaviour through choice architecture without restricting freedom.",
      "Nudges work best for mild biases; severe market failures may require stronger intervention."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 6: Regulation & Deregulation
   * ───────────────────────────────────────────────── */
  {
    title: "Regulation & Deregulation",
    meta: "4 concepts",
    keyIdea: "Rules backed by law can force firms to behave in socially desirable ways, but too many rules stifle competition and innovation; the challenge is finding the right balance between control and freedom.",
    blocks: [
      {
        title: "TYPES OF REGULATION",
        items: [
          {
            type: "def",
            text: "<strong>Regulation</strong> — government-imposed rules and standards that firms must follow, designed to correct market failures by controlling behaviour directly rather than through price signals."
          },
          {
            type: "mech",
            text: "<strong>Environmental regulation</strong> sets emission limits, bans harmful substances, or mandates clean production methods, directly reducing negative externalities.",
            tag: "exam"
          },
          {
            type: "mech",
            text: "<strong>Competition regulation</strong> prevents mergers that reduce competition, bans anti-competitive practices, and can break up monopolies to restore allocative efficiency."
          },
          {
            type: "mech",
            text: "<strong>Information regulation</strong> requires firms to disclose ingredients, risks, or prices, correcting asymmetric information and allowing consumers to make informed choices."
          }
        ]
      },
      {
        title: "DEREGULATION",
        items: [
          {
            type: "def",
            text: "<strong>Deregulation</strong> — the removal or reduction of government rules to increase competition, lower costs, and improve efficiency in a market.",
            tag: "exam"
          },
          {
            type: "imp",
            text: "Deregulation can lower prices and increase choice through <strong>greater competition</strong>, but it may also reduce safety standards and worker protections."
          },
          {
            type: "imp",
            text: "The 2008 financial crisis is often cited as evidence that <strong>excessive deregulation</strong> of banking allowed reckless risk-taking that harmed the entire economy."
          },
          {
            type: "link",
            text: "Regulation links to government failure in the next chapter; poorly designed rules create unintended costs, distort markets, and may make the original failure worse."
          }
        ]
      }
    ],
    flow: {
      steps: ["Market failure identified", "Government imposes rules or removes them", "Firm behaviour changes"],
      result: "Outcome depends on quality of regulation",
      resultType: "good"
    },
    examMatters: "Examiners expect you to name the specific type of regulation being discussed and evaluate it in context. Never say regulation is simply good or bad; instead, analyse whether the benefits of correcting the market failure outweigh the costs of compliance and enforcement.",
    misconception: "Students say all regulation reduces efficiency. Wrong because well-designed regulation corrects market failures and can increase total welfare by moving the market closer to the social optimum. Instead write: regulation can improve efficiency when it corrects a genuine market failure, but poorly designed regulation imposes costs that may exceed the benefits.",
    takeaway: [
      "Regulation directly controls firm behaviour through environmental, competition, and information rules.",
      "Deregulation increases competition but can reduce protections, as the 2008 financial crisis showed.",
      "The net effect depends on whether the regulation is well-targeted and proportionate to the failure."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 7: Government Failure
   * ───────────────────────────────────────────────── */
  {
    title: "Government Failure",
    meta: "5 concepts",
    keyIdea: "Intervening in a market failure does not guarantee improvement; governments can make things worse through poor information, perverse incentives, unintended consequences, and the influence of special interests.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Government failure</strong> — occurs when government intervention leads to a worse allocation of resources than the free market would have achieved, or creates new inefficiencies.",
            tag: "exam"
          }
        ]
      },
      {
        title: "CAUSES OF GOVERNMENT FAILURE",
        items: [
          {
            type: "mech",
            text: "<strong>Inadequate information</strong> means the government may set taxes, subsidies, or regulations at the wrong level because it cannot accurately measure external costs and benefits."
          },
          {
            type: "mech",
            text: "<strong>Unintended consequences</strong> arise when intervention produces side effects that were not anticipated, such as rent controls reducing the supply of housing.",
            tag: "exam"
          },
          {
            type: "mech",
            text: "<strong>Administrative costs</strong> of implementing and enforcing policy may exceed the welfare gains from correcting the market failure."
          },
          {
            type: "mech",
            text: "<strong>Political self-interest</strong> means politicians may design policies to win votes rather than maximise welfare, leading to short-term populist measures that harm long-term efficiency."
          },
          {
            type: "mech",
            text: "<strong>Regulatory capture</strong> occurs when the firms being regulated influence the regulator to act in the industry's interest rather than the public interest."
          }
        ]
      },
      {
        title: "EVALUATION",
        items: [
          {
            type: "imp",
            text: "Government failure does not mean the government should never intervene; it means the <strong>net benefit</strong> of intervention must be weighed against the risk of making things worse.",
            tag: "exam"
          },
          {
            type: "imp",
            text: "The existence of market failure is a <strong>necessary but not sufficient</strong> condition for intervention; the cure must not be worse than the disease."
          },
          {
            type: "link",
            text: "Government failure is the ultimate evaluation tool for every policy in this section; use it to balance any argument for intervention with the risks of getting it wrong."
          }
        ]
      }
    ],
    flow: {
      steps: ["Government intervenes to correct failure", "Policy is poorly designed or implemented", "New inefficiency or worse misallocation results"],
      result: "Net welfare falls despite good intentions",
      resultType: "bad"
    },
    examMatters: "Examiners love government failure as an evaluation point. Whenever you argue for a policy, follow up with the risk of government failure. Name a specific cause such as inadequate information or unintended consequences rather than making a vague reference.",
    misconception: "Students say government failure means the government should never intervene. Wrong because government failure is about the quality of intervention, not the principle of it; many interventions succeed. Instead write: government failure reminds us to evaluate the costs and risks of intervention against the costs of the market failure, and to design policies carefully.",
    takeaway: [
      "Government failure means intervention makes the allocation of resources worse, not better.",
      "Key causes include poor information, unintended consequences, political self-interest, and regulatory capture.",
      "Always weigh the risk of government failure against the cost of the market failure when evaluating policy."
    ]
  }

];

/* ═══════════════════════════════════════════════════════════
 *  RUNNER — push rich notes for all three sections
 * ═══════════════════════════════════════════════════════════ */

const SECTIONS = [
  { id: 'price-determination',       label: '1.3.4 Price Determination',      notes: PRICE_DETERMINATION },
  { id: 'market-failure',            label: '1.3.5 Market Failure',           notes: MARKET_FAILURE },
  { id: 'government-intervention',   label: '1.3.6 Government Intervention', notes: GOVERNMENT_INTERVENTION },
];

async function pushSection({ id, label, notes }) {
  console.log(`\n--- ${label} ---`);
  console.log(`  Section ID: ${id}`);
  console.log(`  Chapters:   ${notes.length}`);

  const totalBlocks = notes.reduce((sum, ch) => sum + ch.blocks.length, 0);
  const totalItems = notes.reduce((sum, ch) =>
    sum + ch.blocks.reduce((s, b) => s + b.items.length, 0), 0);

  console.log(`  Blocks:     ${totalBlocks}`);
  console.log(`  Items:      ${totalItems}`);

  const { error } = await supabase
    .from('section_notes')
    .update({ data: notes })
    .eq('section_id', id);

  if (error) {
    console.error(`  FAILED: ${error.message}`);
    return false;
  }

  console.log(`  SUCCESS — pushed to Supabase.`);

  /* Verify */
  const { data, error: readErr } = await supabase
    .from('section_notes')
    .select('section_id, data')
    .eq('section_id', id)
    .single();

  if (readErr) {
    console.warn(`  Could not verify: ${readErr.message}`);
  } else if (data?.data?.length === notes.length) {
    console.log(`  VERIFIED — ${data.data.length} chapters stored.`);
  } else {
    console.warn(`  Verification mismatch: expected ${notes.length} chapters, got ${data?.data?.length ?? 0}.`);
  }

  return true;
}

async function main() {
  console.log('═══════════════════════════════════════════════════');
  console.log('  Economics Unit 1 — Rich Notes (Part 2)');
  console.log('  Sections: 1.3.4, 1.3.5, 1.3.6');
  console.log('═══════════════════════════════════════════════════');

  let allOk = true;
  for (const section of SECTIONS) {
    const ok = await pushSection(section);
    if (!ok) allOk = false;
  }

  console.log('\n═══════════════════════════════════════════════════');
  if (allOk) {
    console.log('  ALL 3 SECTIONS UPDATED SUCCESSFULLY');
  } else {
    console.log('  SOME SECTIONS FAILED — check logs above');
    process.exit(1);
  }
  console.log('═══════════════════════════════════════════════════');
}

main();
