/**
 * SECTION UPGRADE — Government Intervention (Economics 1.3.6)
 * ============================================================
 * Edexcel IAL Economics Unit 1, spec point 1.3.6
 * Run with: node scripts/upgrade-content-economics-gov-intervention.mjs
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL     || 'https://trweeckuswgkenckeqfb.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);

/* -- 1. SETTINGS ----------------------------------------------------------- */

const SECTION_SLUG = 'government-intervention';
const SUBJECT_ID   = 'economics';

/* -- 2. CONTENT ------------------------------------------------------------ */

const CONTENT = [

  /* === Block 1: Indirect Taxes to Correct Negative Externalities === */
  {
    title: "Indirect Taxes to Correct Negative Externalities",
    diagramRef: "Indirect Tax",
    quizIndices: [0],
    sections: [
      {
        id: "how-indirect-taxes-correct-market-failure",
        title: "How Indirect Taxes Correct Market Failure",
        keyIdea: "Governments tax goods that create negative externalities, raising the private cost to reflect the true social cost and reducing consumption toward the socially optimal level.",
        body: [
          {
            type: "paragraph",
            text: "An **indirect tax** is a tax placed on the production or sale of a good rather than on income. When a good generates **negative externalities** — such as pollution from petrol or health costs from cigarettes — the market price is too low because it ignores the external costs imposed on third parties. The market overproduces relative to the socially optimal quantity."
          },
          {
            type: "flow",
            steps: ["Tax imposed on demerit good", "Supply curve shifts left (upward)", "Price rises, quantity falls"],
            result: "Output moves closer to socially optimal level",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "There are two types of indirect tax. A **specific tax** adds a fixed amount per unit (e.g. 50p per litre), creating a parallel shift of the supply curve. An **ad valorem tax** is a percentage of the price (e.g. VAT at 20%), causing a pivotal shift. Both raise the price consumers pay and reduce the quantity consumed."
          },
          {
            type: "paragraph",
            text: "If the tax is set equal to the **marginal external cost** at the socially optimal output, it perfectly internalises the externality. You should think of the tax as forcing producers and consumers to face the full social cost of their decisions."
          }
        ],
        realExample: {
          emoji: "🚬",
          text: "**The UK government** levies tobacco duty of over 16 per cent of the retail price plus a fixed amount per pack, making cigarettes among the most heavily taxed goods in Britain. This has contributed to a fall in adult smoking rates from 27% in 2000 to around 13% by 2023, though critics note that poorer households bear a disproportionate burden."
        },
        misconception: "Students write that indirect taxes always eliminate the externality completely. In practice, the government rarely knows the exact marginal external cost, so the tax may over- or under-correct the market failure. Instead write: indirect taxes reduce the externality but may not achieve the precise socially optimal output due to imperfect information.",
        examMatters: "Examiners expect you to draw the tax as a leftward shift of supply and identify the new equilibrium price and quantity. Always evaluate by discussing whether the tax is set at the correct level and who bears the burden, linking this to price elasticity of demand."
      },
      {
        id: "evaluating-indirect-taxes",
        title: "Evaluating Indirect Taxes",
        keyIdea: "Indirect taxes generate revenue and discourage harmful consumption, but they can be regressive, hard to calibrate, and may simply shift activity to untaxed alternatives.",
        body: [
          {
            type: "paragraph",
            text: "The main strength of indirect taxes is that they use the **price mechanism** to reduce consumption — you do not need to ban the good, just make it more expensive. They also generate **tax revenue** that can fund solutions to the externality, such as spending tobacco tax revenue on the NHS."
          },
          {
            type: "paragraph",
            text: "However, indirect taxes are often **regressive** — they take a larger proportion of income from poorer households. If demand for the good is **price inelastic** (as with cigarettes or petrol), the tax raises revenue but does little to reduce consumption. The externality may persist even after the tax is imposed."
          },
          {
            type: "paragraph",
            text: "There are also practical problems. Governments face **information failure** when setting the tax rate because the exact marginal external cost is difficult to measure. High taxes can encourage **smuggling** or **black market** activity, and firms may relocate production to countries with lower taxes, creating **carbon leakage**."
          }
        ],
        realExample: {
          emoji: "🥤",
          text: "**The UK Soft Drinks Industry Levy** (sugar tax), introduced in 2018, prompted manufacturers like Lucozade Ribena Suntory to reformulate drinks below the sugar threshold before the tax even took effect. This shows how the announcement of a tax can change producer behaviour, though critics argue consumers simply switched to other sugary products not covered by the levy."
        },
        misconception: "Students claim that indirect taxes are unfair and should never be used because they are regressive. While the distributional impact is a valid concern, the health and environmental benefits may outweigh the regressivity, especially if revenue is recycled to support low-income households. Instead write: the regressive nature of indirect taxes is a limitation that must be weighed against their effectiveness in reducing harmful externalities.",
        examMatters: "In evaluation, examiners want you to discuss elasticity of demand when assessing how effective the tax will be at reducing consumption. A tax on an inelastic good raises lots of revenue but changes behaviour very little, while a tax on an elastic good changes behaviour but raises less revenue."
      }
    ],
    takeaway: [
      "Indirect taxes shift supply left, raising price and cutting output",
      "A tax equal to the marginal external cost internalises the externality",
      "Effectiveness depends on price elasticity of demand for the good",
      "Taxes are regressive and may encourage black-market substitution"
    ]
  },

  /* === Block 2: Subsidies to Correct Positive Externalities === */
  {
    title: "Subsidies to Correct Positive Externalities",
    diagramRef: "Subsidy",
    quizIndices: [1],
    practiceIndices: [0],
    sections: [
      {
        id: "how-subsidies-correct-market-failure",
        title: "How Subsidies Correct Market Failure",
        keyIdea: "A subsidy is a payment from the government to producers or consumers that lowers the cost of a merit good, increasing consumption toward the socially optimal level.",
        body: [
          {
            type: "paragraph",
            text: "A **subsidy** is a grant given by the government to producers (or sometimes consumers) to lower the cost of providing a good or service. Subsidies are used when a good generates **positive externalities** — benefits to third parties that are not reflected in the market price. Because these external benefits are ignored, the free market **under-produces** merit goods relative to the socially optimal quantity."
          },
          {
            type: "flow",
            steps: ["Government pays subsidy to producer", "Supply curve shifts right (downward)", "Price falls, quantity rises"],
            result: "Output moves closer to socially optimal level",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "When the subsidy is set equal to the **marginal external benefit** at the socially optimal output, it closes the gap between private and social benefit. You should see the subsidy as making merit goods cheaper so that more people consume them, capturing the wider benefits for society."
          },
          {
            type: "paragraph",
            text: "Common examples include subsidies on education, healthcare, public transport and renewable energy. In each case, the individual consumer does not capture all the benefits of their consumption, so the government steps in to encourage more of it."
          }
        ],
        realExample: {
          emoji: "🔋",
          text: "**The UK Plug-in Car Grant** subsidised the purchase of electric vehicles by up to 1,500 pounds per car before it was withdrawn in 2022. During its lifetime the scheme helped increase EV registrations from under 4,000 in 2013 to over 267,000 in 2022, demonstrating how subsidies can accelerate adoption of goods with positive externalities."
        },
        misconception: "Students write that subsidies guarantee the socially optimal output will be reached. In reality, the government faces the same information problem as with taxes — it rarely knows the exact marginal external benefit, so the subsidy may be set too high or too low. Instead write: subsidies move output toward the social optimum but imperfect information means the exact optimal level is rarely achieved.",
        examMatters: "When drawing a subsidy diagram, examiners want you to show the supply curve shifting right by the amount of the subsidy and to clearly label the new lower price consumers pay versus the higher effective price producers receive. Always evaluate by considering the opportunity cost of the government spending."
      },
      {
        id: "evaluating-subsidies",
        title: "Evaluating Subsidies",
        keyIdea: "Subsidies increase consumption of merit goods and can be targeted, but they carry an opportunity cost, may distort markets, and can be difficult to remove once established.",
        body: [
          {
            type: "paragraph",
            text: "The strength of subsidies is that they work with the market rather than against it — you keep consumer choice while nudging behaviour toward the socially optimal outcome. They can be precisely **targeted** at specific goods, regions or income groups, making them a flexible policy tool."
          },
          {
            type: "paragraph",
            text: "The main weakness is the **opportunity cost**. Every pound spent on subsidies is a pound not spent on hospitals, schools or debt reduction. Subsidies must be funded through taxation or borrowing, which creates its own distortions. If set too high, subsidies can lead to **overproduction** and waste."
          },
          {
            type: "paragraph",
            text: "Subsidies can also be **difficult to remove** once interest groups become dependent on them. Farmers, energy companies or transport operators may lobby fiercely to keep subsidies in place long after the original market failure has been addressed. This creates **government failure** where the intervention itself becomes a problem."
          }
        ],
        realExample: {
          emoji: "🌾",
          text: "**The EU Common Agricultural Policy** has subsidised European farmers for decades, originally to ensure food security. However, the subsidies have been criticised for encouraging overproduction, distorting global trade, and disproportionately benefiting large agribusinesses rather than small farmers who need support most."
        },
        misconception: "Students claim subsidies are always better than taxes because they do not raise prices for consumers. This ignores the fact that subsidies must be funded through taxes elsewhere, so the cost is still borne by society. Instead write: subsidies lower prices for the subsidised good but create an opportunity cost because the funding must come from taxation or reduced spending elsewhere.",
        examMatters: "Strong evaluation of subsidies always addresses the opportunity cost. Examiners reward you for asking what else the government could have done with the money and whether the subsidy is the most cost-effective way to correct the externality compared to alternatives like regulation or information provision."
      }
    ],
    takeaway: [
      "Subsidies shift supply right, lowering price and raising output",
      "Set equal to marginal external benefit, they correct under-consumption",
      "Every subsidy has an opportunity cost funded by taxation",
      "Subsidies can become entrenched and hard to remove politically"
    ]
  },

  /* === Block 3: Maximum Prices (Price Ceilings) === */
  {
    title: "Maximum Prices (Price Ceilings)",
    diagramRef: "Maximum Price",
    quizIndices: [2],
    sections: [
      {
        id: "how-maximum-prices-work",
        title: "How Maximum Prices Work",
        keyIdea: "A maximum price is a legal ceiling set below the equilibrium, making a good more affordable but creating a shortage because quantity demanded exceeds quantity supplied.",
        body: [
          {
            type: "paragraph",
            text: "A **maximum price** (or **price ceiling**) is a legally imposed upper limit on the price that can be charged for a good or service. For it to have any effect, it must be set **below the free-market equilibrium price**. If set above equilibrium, the market would simply clear at the lower equilibrium price and the ceiling would be irrelevant."
          },
          {
            type: "flow",
            steps: ["Government sets price below equilibrium", "Quantity demanded rises, quantity supplied falls", "Excess demand creates a shortage"],
            result: "Good is cheaper but not everyone can get it",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "Governments impose maximum prices to make essential goods **affordable** for consumers, particularly those on low incomes. Common examples include **rent controls** on housing and **price caps** on basic foodstuffs during emergencies. The aim is to protect consumers from exploitation or ensure access to necessities."
          },
          {
            type: "paragraph",
            text: "The inevitable consequence is a **shortage** — at the lower price, more people want to buy the good but fewer producers are willing or able to supply it. This shortage must be managed somehow, usually through queuing, rationing, or allocation by sellers."
          }
        ],
        realExample: {
          emoji: "🏠",
          text: "**New York City** has maintained rent control and rent stabilisation policies since the 1940s, keeping rents below market rates for millions of tenants. While this makes existing apartments more affordable, critics point to a chronic housing shortage, deteriorating building conditions, and a thriving black market for rent-controlled units."
        },
        misconception: "Students write that maximum prices solve the affordability problem because consumers pay less. The lower price creates a shortage, so many consumers cannot buy the good at all, and black markets often emerge where prices are even higher than the original equilibrium. Instead write: maximum prices reduce the price for those who can obtain the good but create shortages and potential black-market activity.",
        examMatters: "Examiners expect you to draw the diagram showing the maximum price below equilibrium, clearly labelling the shortage as the gap between quantity demanded and quantity supplied. Always evaluate by discussing the consequences of the shortage, including rationing, black markets and reduced quality."
      },
      {
        id: "effects-and-evaluation-of-price-ceilings",
        title: "Effects and Evaluation of Price Ceilings",
        keyIdea: "Price ceilings protect some consumers in the short run but can reduce supply, quality and investment in the long run, often hurting the people they aim to help.",
        body: [
          {
            type: "paragraph",
            text: "In the **short run**, a maximum price benefits consumers who manage to purchase the good at the lower price. However, because supply falls, a system of **rationing** or allocation is needed. This can take the form of queues, waiting lists, or informal favouritism by sellers."
          },
          {
            type: "paragraph",
            text: "In the **long run**, the effects are more damaging. Producers earn lower returns, so they **reduce investment** in the product. With rent controls, landlords spend less on maintenance, leading to deteriorating housing quality. New supply is discouraged because the controlled price does not cover the cost of new construction."
          },
          {
            type: "paragraph",
            text: "**Black markets** are a common consequence — some consumers are willing to pay above the ceiling, and some suppliers are willing to sell illegally at higher prices. The very people the policy was designed to protect may end up paying more on the black market than they would have at the free-market equilibrium."
          }
        ],
        realExample: {
          emoji: "🇻🇪",
          text: "**Venezuela** imposed price ceilings on basic goods including food and medicine during its economic crisis. Rather than making goods affordable, the controls caused severe shortages as producers could not cover their costs, leading to empty supermarket shelves and a booming black market where prices were many times the official ceiling."
        },
        misconception: "Students assume that if a maximum price causes problems, the government should simply set it closer to the equilibrium. A maximum price only affects the market if it is below equilibrium, and the closer it gets to equilibrium, the less impact it has on affordability. Instead write: there is an inherent trade-off between making a good affordable and avoiding the shortage that a binding price ceiling creates.",
        examMatters: "In longer-answer questions, examiners reward you for distinguishing between short-run and long-run effects of price ceilings. Always discuss the impact on both consumers and producers, and consider whether alternative policies like subsidies might achieve the affordability goal without creating a shortage."
      }
    ],
    takeaway: [
      "Maximum prices must be set below equilibrium to be effective",
      "They create shortages because Qd exceeds Qs at the lower price",
      "Black markets and reduced quality are common long-run effects",
      "Subsidies may achieve affordability without creating shortages"
    ]
  },

  /* === Block 4: Minimum Prices (Price Floors) === */
  {
    title: "Minimum Prices (Price Floors)",
    diagramRef: "Minimum Price",
    quizIndices: [3],
    practiceIndices: [1],
    sections: [
      {
        id: "how-minimum-prices-work",
        title: "How Minimum Prices Work",
        keyIdea: "A minimum price is a legal floor set above the equilibrium, guaranteeing producers a higher income but creating a surplus because quantity supplied exceeds quantity demanded.",
        body: [
          {
            type: "paragraph",
            text: "A **minimum price** (or **price floor**) is a legally imposed lower limit on the price of a good or service. For it to have any effect, it must be set **above the free-market equilibrium price**. If set below equilibrium, the market would simply clear at the higher equilibrium price and the floor would be irrelevant."
          },
          {
            type: "flow",
            steps: ["Government sets price above equilibrium", "Quantity supplied rises, quantity demanded falls", "Excess supply creates a surplus"],
            result: "Producers get a higher price but face unsold stock",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "Governments use minimum prices to **protect producers** by guaranteeing them a higher income, or to **discourage consumption** of demerit goods by keeping the price high. The **National Minimum Wage** is a price floor in the labour market, and **minimum unit pricing** for alcohol aims to reduce harmful drinking."
          },
          {
            type: "paragraph",
            text: "The direct consequence is a **surplus** — at the higher price, producers want to sell more but consumers want to buy less. The government may need to purchase the surplus itself, store it, or destroy it to maintain the minimum price."
          }
        ],
        realExample: {
          emoji: "🍺",
          text: "**Scotland** introduced minimum unit pricing for alcohol at 50p per unit in 2018, the first country in the world to do so. Research published by Public Health Scotland in 2023 found that alcohol-specific deaths fell by 13% in the first year compared to what would have been expected, suggesting the price floor was effective at reducing harmful consumption."
        },
        misconception: "Students write that minimum prices always lead to unemployment in the labour market context. Whether the National Minimum Wage causes unemployment depends on where it is set relative to the equilibrium wage and the elasticity of demand for labour. Instead write: a minimum wage above the equilibrium wage may cause some unemployment, but if set close to equilibrium or in a monopsony labour market, the effect may be minimal.",
        examMatters: "Examiners expect you to draw the diagram with the minimum price above equilibrium, clearly labelling the surplus. For labour market questions, identify the surplus as unemployment. Always evaluate by discussing who benefits, who loses, and whether the government must intervene to buy up the surplus."
      },
      {
        id: "effects-and-evaluation-of-price-floors",
        title: "Effects and Evaluation of Price Floors",
        keyIdea: "Price floors guarantee producer income and can reduce harmful consumption, but surpluses are costly and the policy may hurt the consumers or workers it was designed to protect.",
        body: [
          {
            type: "paragraph",
            text: "The main benefit of a minimum price is **income protection** for producers. Farmers guaranteed a floor price can plan investment with greater certainty, and workers on a minimum wage earn enough to cover basic living costs. Minimum prices on demerit goods like alcohol reduce consumption of harmful products."
          },
          {
            type: "paragraph",
            text: "However, the **surplus** created by a minimum price is a significant problem. In agricultural markets, governments may have to buy and store or destroy surplus produce, which is expensive and wasteful. In the labour market, a minimum wage set too high could price low-skilled workers out of employment entirely."
          },
          {
            type: "paragraph",
            text: "There is also an **equity concern**. Minimum prices on goods like alcohol are regressive — they disproportionately affect low-income consumers who spend a larger share of their budget on these items. Meanwhile, producers of premium goods are largely unaffected because their prices already exceed the floor."
          }
        ],
        realExample: {
          emoji: "🧈",
          text: "**The EU butter mountain** of the 1980s was a direct result of minimum prices under the Common Agricultural Policy. Guaranteed floor prices encouraged European farmers to overproduce dairy products, creating surplus stocks of over 1.2 million tonnes of butter that the EU had to buy, store in refrigerated warehouses, and eventually sell at a loss or give away as food aid."
        },
        misconception: "Students claim minimum prices are ineffective because consumers will simply stop buying the product. For necessities with inelastic demand, consumers continue buying even at the higher price, so the surplus is smaller than expected. Instead write: the size of the surplus depends on the price elasticity of both demand and supply for the good in question.",
        examMatters: "Strong answers evaluate minimum prices by considering the elasticity of demand and supply. If demand is inelastic, the price floor reduces quantity demanded only slightly, creating a small surplus but effectively raising producer income. Examiners reward this nuanced analysis over a generic description of surpluses."
      }
    ],
    takeaway: [
      "Minimum prices must be set above equilibrium to be effective",
      "They create surpluses that the government may need to buy up",
      "Effectiveness at reducing consumption depends on elasticity",
      "The National Minimum Wage is a price floor in the labour market"
    ]
  },

  /* === Block 5: Tradeable Pollution Permits === */
  {
    title: "Tradeable Pollution Permits",
    quizIndices: [4],
    sections: [
      {
        id: "how-permit-systems-work",
        title: "How Permit Systems Work",
        keyIdea: "The government caps total pollution and issues tradeable permits, so firms that cut emissions cheaply sell spare permits to firms where reductions cost more.",
        body: [
          {
            type: "paragraph",
            text: "A **tradeable pollution permit** (also called **cap and trade**) is a market-based approach to reducing pollution. The government sets an overall **cap** on the total quantity of a pollutant that can be emitted, then distributes or auctions **permits** that give firms the right to emit a certain amount. Each permit allows a fixed quantity of pollution."
          },
          {
            type: "flow",
            steps: ["Government sets a total emissions cap", "Permits are allocated to firms", "Firms trade permits on an open market"],
            result: "Emissions fall to the cap at lowest overall cost",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "The key innovation is that permits are **tradeable**. Firms that can reduce their emissions cheaply do so and sell their spare permits for profit. Firms that find it expensive to cut emissions buy extra permits instead. This means pollution reductions happen where they are cheapest, minimising the total cost to the economy."
          },
          {
            type: "paragraph",
            text: "Over time, the government can **tighten the cap** by reducing the total number of permits issued, gradually lowering the overall level of pollution. As permits become scarcer, their price rises, giving firms an increasing financial incentive to invest in cleaner technology."
          }
        ],
        realExample: {
          emoji: "🏭",
          text: "**The EU Emissions Trading System** (EU ETS), launched in 2005, is the world's largest carbon market covering over 10,000 power stations and industrial plants across Europe. After initial problems with oversupply of permits that kept prices too low, reforms since 2019 have pushed carbon prices above 80 euros per tonne, significantly accelerating investment in renewable energy."
        },
        misconception: "Students write that permit systems allow rich firms to pollute as much as they want by simply buying more permits. The total cap on emissions is fixed regardless of who holds the permits, so buying permits does not increase total pollution. Instead write: the cap guarantees the total pollution level while the trading mechanism ensures reductions happen at the lowest cost.",
        examMatters: "Examiners want you to explain how the trading mechanism ensures cost-efficiency by channelling reductions to firms with the lowest abatement costs. Always evaluate by discussing whether the cap is set at the right level and the risk of excess permits keeping prices too low to incentivise change."
      },
      {
        id: "evaluating-permit-systems",
        title: "Evaluating Permit Systems",
        keyIdea: "Cap and trade achieves a guaranteed emissions reduction at low cost, but effectiveness depends on the cap being tight enough and the market being well-regulated.",
        body: [
          {
            type: "paragraph",
            text: "The main advantage of tradeable permits is that they combine **environmental certainty** with **economic efficiency**. The cap guarantees the maximum level of pollution, and the market ensures reductions happen where they are cheapest. Unlike a tax, you know exactly how much pollution will occur."
          },
          {
            type: "paragraph",
            text: "However, permit systems face serious practical challenges. If too many permits are issued, the price collapses and firms have no incentive to invest in cleaner technology. **Monitoring and enforcement** are expensive — you need to verify that firms are not emitting more than their permits allow. There is also a risk of **fraud** in permit trading."
          },
          {
            type: "paragraph",
            text: "Compared to a carbon tax, permits fix the **quantity** of pollution but let the **price** fluctuate, which creates uncertainty for firms planning long-term investment. A carbon tax does the opposite — it fixes the price but lets the quantity vary. Neither instrument is clearly superior; the best choice depends on whether quantity or price certainty matters more."
          }
        ],
        realExample: {
          emoji: "🇺🇸",
          text: "**The US Acid Rain Program**, launched in 1990, used tradeable permits for sulphur dioxide emissions from power plants. It achieved a 50% reduction in SO2 emissions at roughly half the projected cost, and is widely regarded as one of the most successful environmental policies ever implemented."
        },
        misconception: "Students claim that tradeable permits and carbon taxes are essentially the same thing because both put a price on pollution. The critical difference is that permits fix the quantity of emissions and let the price vary, while a tax fixes the price and lets the quantity vary. Instead write: permits guarantee the pollution level but create price uncertainty, while taxes guarantee the price but create quantity uncertainty.",
        examMatters: "A common exam question asks you to compare tradeable permits with indirect taxes as methods for reducing pollution. Structure your answer around the key trade-off: permits give quantity certainty, taxes give price certainty. Evaluate which matters more in the given context and always consider information requirements."
      }
    ],
    takeaway: [
      "Cap and trade sets a pollution limit and lets firms trade permits",
      "Reductions occur where abatement costs are lowest",
      "Permits fix quantity of pollution; taxes fix the price",
      "Oversupply of permits can collapse the price and weaken incentives"
    ]
  },

  /* === Block 6: State Provision & Provision of Information === */
  {
    title: "State Provision & Provision of Information",
    quizIndices: [5],
    practiceIndices: [2],
    sections: [
      {
        id: "direct-state-provision",
        title: "Direct State Provision",
        keyIdea: "When the free market under-provides public goods or merit goods, the government can step in and provide them directly, funded through general taxation.",
        body: [
          {
            type: "paragraph",
            text: "**Direct state provision** means the government itself produces and supplies a good or service, typically funded through **taxation**. This is the standard approach for **public goods** like national defence and street lighting, which the market will not provide because of the **free-rider problem** — you cannot exclude non-payers from benefiting."
          },
          {
            type: "flow",
            steps: ["Market fails to provide the good", "Government funds provision through taxation", "Good is available free at point of use"],
            result: "Everyone can access the good regardless of ability to pay",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "The government also directly provides many **merit goods** like state education and NHS healthcare. These could be provided by the market, but would be **under-consumed** if left to private provision because consumers undervalue the external benefits or cannot afford the market price."
          },
          {
            type: "paragraph",
            text: "The trade-off is that state provision requires **tax revenue**, which has an opportunity cost. Publicly provided services may also suffer from **productive inefficiency** because they lack the competitive pressure that drives private firms to minimise costs and innovate."
          }
        ],
        realExample: {
          emoji: "🏥",
          text: "**The UK National Health Service** provides healthcare free at the point of use, funded through general taxation and National Insurance contributions. While the NHS ensures universal access regardless of income, it faces persistent waiting lists and funding pressures, illustrating the tension between equity of access and productive efficiency."
        },
        misconception: "Students write that the government must provide all merit goods because the private sector will not produce them. In reality, the private sector does provide merit goods like private schools and hospitals, but at a price that excludes many consumers. Instead write: the government provides merit goods to ensure universal access, not because the private sector is incapable of producing them.",
        examMatters: "Examiners want you to evaluate state provision by weighing the benefit of universal access and equity against the costs of taxation, potential inefficiency, and the opportunity cost of public spending. Never just describe what state provision is — always assess whether it is the best way to correct the specific market failure."
      },
      {
        id: "information-provision-and-nudge-theory",
        title: "Information Provision and Nudge Theory",
        keyIdea: "When consumers make poor choices because they lack information, the government can correct this by providing facts or designing choices that nudge people toward better decisions.",
        body: [
          {
            type: "paragraph",
            text: "**Information provision** addresses market failure caused by **information asymmetry** or **imperfect information**. When consumers do not fully understand the costs or benefits of their choices — such as the health risks of smoking or the long-term returns to education — they make decisions that reduce their own welfare and society's welfare."
          },
          {
            type: "paragraph",
            text: "Government responses include **mandatory labelling** (calorie counts on food), **public health campaigns** (anti-smoking advertisements), and **compulsory disclosure** (firms must publish ingredients or safety ratings). The goal is to help consumers make better-informed decisions without restricting their freedom of choice."
          },
          {
            type: "flow",
            steps: ["Consumers lack key information", "Government provides facts or changes choice architecture", "Better-informed decisions are made"],
            result: "Consumption moves closer to socially optimal level",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "**Nudge theory** takes this further by designing the choice environment to steer people toward better decisions without removing options. Examples include making pension auto-enrolment the default (you must opt out rather than opt in) and placing healthier foods at eye level in canteens. Nudges are cheap and preserve freedom of choice, but they may be seen as paternalistic."
          }
        ],
        realExample: {
          emoji: "💰",
          text: "**The UK auto-enrolment pension scheme**, introduced in 2012, nudges employees into saving for retirement by making pension contributions the default. By 2023, over 10 million additional workers were saving into a workplace pension, demonstrating how changing the default option can dramatically shift behaviour without banning any choices."
        },
        misconception: "Students claim that providing information always corrects the market failure because rational consumers will change their behaviour once informed. In practice, behavioural biases like present bias and habit mean consumers often ignore information even when it is clearly presented. Instead write: information provision helps consumers make better choices but is limited by behavioural biases that prevent people from acting on the information they receive.",
        examMatters: "Nudge theory is increasingly popular in exam questions. Examiners reward you for explaining how nudges preserve freedom of choice (they are libertarian paternalism) while evaluating their limitations, particularly that they rely on predictable biases and may not work for all consumers or all types of market failure."
      }
    ],
    takeaway: [
      "State provision ensures access to public and merit goods for all",
      "Information campaigns correct failures from imperfect knowledge",
      "Nudges steer behaviour without removing freedom of choice",
      "All state provision carries an opportunity cost funded by taxation"
    ]
  },

  /* === Block 7: Regulation & Deregulation === */
  {
    title: "Regulation & Deregulation",
    quizIndices: [6],
    sections: [
      {
        id: "types-of-regulation",
        title: "Types of Regulation",
        keyIdea: "Regulation uses legal rules to directly control market behaviour, setting limits on pollution, prices, or business practices that firms must obey or face penalties.",
        body: [
          {
            type: "paragraph",
            text: "**Regulation** is the use of laws and rules imposed by the government to control the behaviour of firms and individuals. Unlike taxes and subsidies, which use financial incentives to change behaviour, regulation **directly prohibits or mandates** certain actions. You must comply or face fines, closure, or criminal prosecution."
          },
          {
            type: "paragraph",
            text: "There are several types of regulation relevant to correcting market failure. **Environmental regulation** sets maximum pollution limits (e.g. emissions standards for cars). **Consumer protection regulation** ensures product safety and honest advertising. **Competition regulation** prevents monopoly abuse and protects consumers from anti-competitive behaviour."
          },
          {
            type: "flow",
            steps: ["Government identifies market failure", "Legal standard or limit is imposed", "Firms must comply or face penalties"],
            result: "Behaviour changes directly through legal force",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "The advantage of regulation is **certainty** — a ban on dumping toxic waste is absolute, unlike a tax which a firm might simply absorb. However, regulation can be **costly to enforce**, may stifle innovation by removing flexibility, and is vulnerable to **regulatory capture** where industries influence the rules in their own favour."
          }
        ],
        realExample: {
          emoji: "🚗",
          text: "**The EU Euro 6 emissions standards** set strict limits on nitrogen oxide and particulate emissions from new vehicles sold in Europe. These regulations directly forced manufacturers like Volkswagen and BMW to invest billions in cleaner engine technology, though the Volkswagen dieselgate scandal revealed that some firms cheated compliance tests rather than genuinely reducing emissions."
        },
        misconception: "Students write that regulation is the most effective form of government intervention because it forces compliance. Regulation is only as effective as enforcement allows, and firms may find ways to evade rules or lobby for weaker standards. Instead write: regulation provides direct control over behaviour but its effectiveness depends entirely on the quality of monitoring and enforcement.",
        examMatters: "Examiners often ask you to compare regulation with market-based approaches like taxes or permits. Structure your comparison around flexibility (market instruments allow firms to choose how to respond), cost-effectiveness (regulation treats all firms the same regardless of abatement costs), and certainty of outcome."
      },
      {
        id: "deregulation-and-its-effects",
        title: "Deregulation and Its Effects",
        keyIdea: "Deregulation removes government rules to boost competition and efficiency, but risks instability when the original regulations were correcting genuine market failures.",
        body: [
          {
            type: "paragraph",
            text: "**Deregulation** is the removal or reduction of government rules and restrictions on business activity. The aim is to **increase competition**, **reduce costs** for firms, and allow market forces to allocate resources more efficiently. It was a major policy trend in the UK from the 1980s onward, affecting industries like telecoms, energy, airlines and financial services."
          },
          {
            type: "paragraph",
            text: "When deregulation works well, it can deliver significant benefits. The deregulation of UK bus services and airlines brought new entrants, lower prices and greater consumer choice. Removing unnecessary **red tape** reduces costs for businesses and can encourage entrepreneurship and innovation."
          },
          {
            type: "paragraph",
            text: "However, deregulation can go wrong if the regulations being removed existed for good reason. The deregulation of financial markets has been linked to increased risk-taking and financial instability. Without rules, firms may cut corners on safety, exploit workers, or damage the environment. You should always ask whether the regulation being removed was addressing a genuine market failure."
          }
        ],
        realExample: {
          emoji: "✈️",
          text: "**UK airline deregulation** in the 1980s and 1990s allowed new budget carriers like easyJet and Ryanair to enter the market and compete with established airlines. Average air fares fell significantly and passenger numbers soared, but critics point to reduced service quality, crowded airports, and environmental costs from the surge in flights."
        },
        misconception: "Students claim that deregulation always improves efficiency because free markets are superior to government control. Some markets require regulation to function properly, particularly where there are externalities, natural monopolies, or information asymmetries. Instead write: deregulation improves efficiency in competitive markets but may worsen outcomes where regulation was correcting genuine market failures.",
        examMatters: "When evaluating deregulation, examiners want you to consider why the regulation existed in the first place. If it was correcting a genuine market failure, removing it may recreate that failure. If it was simply creating unnecessary bureaucracy, removing it may improve efficiency. Context is everything in your evaluation."
      }
    ],
    takeaway: [
      "Regulation directly controls behaviour through legal rules",
      "It provides certainty but can be costly to enforce",
      "Deregulation increases competition but risks market instability",
      "Always assess whether removed regulations served a genuine purpose"
    ]
  },

  /* === Block 8: Government Failure === */
  {
    title: "Government Failure",
    quizIndices: [7],
    practiceIndices: [3],
    sections: [
      {
        id: "what-is-government-failure",
        title: "What Is Government Failure",
        keyIdea: "Government failure occurs when intervention to correct a market failure actually makes the allocation of resources worse than it would have been without the intervention.",
        body: [
          {
            type: "paragraph",
            text: "**Government failure** occurs when government intervention in the economy leads to a **net welfare loss** — the intervention makes the situation worse rather than better, or creates new inefficiencies that outweigh the benefits of correcting the original market failure. It is the government equivalent of market failure."
          },
          {
            type: "flow",
            steps: ["Market failure identified", "Government intervenes", "Intervention creates worse outcome"],
            result: "Resources are misallocated more than before",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "Government failure does not mean the government made a bad decision on purpose. It can result from **unintended consequences**, **imperfect information**, **political pressures**, or simply the sheer difficulty of designing policies that work as intended in complex economies."
          },
          {
            type: "paragraph",
            text: "You should recognise that the existence of market failure does not automatically justify government intervention. If the cure is worse than the disease — that is, if the costs of intervention exceed the costs of the market failure — then doing nothing may actually be the better option."
          }
        ],
        realExample: {
          emoji: "🌽",
          text: "**US ethanol subsidies** were introduced to reduce dependence on fossil fuels by encouraging corn-based biofuel production. However, the policy diverted so much farmland to corn that food prices rose globally, rainforests were cleared for new cropland, and the net environmental benefit was negligible — a textbook case of government failure."
        },
        misconception: "Students write that government failure means the government should never intervene in markets. Government failure is a risk of intervention, not an argument against all intervention. Instead write: government failure means the specific intervention worsened the outcome, which should make governments design policies more carefully rather than abandon intervention altogether.",
        examMatters: "Examiners frequently ask you to evaluate government intervention by considering the possibility of government failure. This is your opportunity to show high-level analysis by explaining why a well-intentioned policy might produce unintended consequences that leave society worse off than the original market failure."
      },
      {
        id: "causes-of-government-failure",
        title: "Causes of Government Failure",
        keyIdea: "Government failure is caused by imperfect information, political short-termism, unintended consequences, and the influence of special interest groups on policy design.",
        body: [
          {
            type: "paragraph",
            text: "The most fundamental cause of government failure is **imperfect information**. To set the correct tax rate or subsidy level, the government needs to know the exact marginal external cost or benefit — information it rarely has. If a carbon tax is set too low, pollution continues; if set too high, firms relocate and jobs are lost."
          },
          {
            type: "paragraph",
            text: "**Political short-termism** is another major cause. Politicians face elections every few years, so they may favour policies that deliver visible short-term benefits over those that address long-term problems. Subsidies to declining industries may win votes today but delay necessary economic adjustment and waste resources."
          },
          {
            type: "paragraph",
            text: "**Regulatory capture** occurs when the industries being regulated gain influence over the regulator, shaping rules to benefit themselves rather than the public interest. **Unintended consequences** are inevitable in complex economies — banning plastic bags may increase demand for thicker, more resource-intensive reusable bags."
          }
        ],
        realExample: {
          emoji: "🏦",
          text: "**The 2008 financial crisis** was partly caused by government failure through inadequate regulation of complex financial products. Regulators lacked the information and expertise to understand the risks of mortgage-backed securities, and political pressure to expand home ownership discouraged stricter oversight of lending standards."
        },
        misconception: "Students claim that government failure is always caused by corrupt or incompetent politicians. Most government failure results from the genuine difficulty of designing effective policy with incomplete information in a complex economy. Instead write: government failure typically stems from information gaps and unintended consequences rather than deliberate policy errors.",
        examMatters: "When explaining causes of government failure, examiners want you to link each cause to a specific policy example rather than listing causes in the abstract. Saying the government has imperfect information is not enough — explain how this imperfect information leads to a specific policy being set at the wrong level."
      },
      {
        id: "examples-and-evaluation-of-government-failure",
        title: "Examples and Evaluation",
        keyIdea: "Evaluating intervention requires weighing the cost of the market failure against the cost of the policy itself, including any unintended consequences that arise.",
        body: [
          {
            type: "paragraph",
            text: "When you evaluate any government intervention, you should apply a simple test: is the outcome **better or worse** than it would have been without the intervention? If the costs of the policy — including administration costs, distortions, and unintended consequences — exceed the welfare gain from correcting the market failure, then government failure has occurred."
          },
          {
            type: "flow",
            steps: ["Measure the cost of market failure", "Measure the cost of intervention", "Compare the two outcomes"],
            result: "If intervention costs exceed market failure costs, government failure exists",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "Common examples include agricultural subsidies that lead to overproduction and environmental damage, rent controls that reduce housing supply and quality, and minimum wages set so high that they create significant unemployment. In each case, the intervention was well-intentioned but the outcome was worse than the problem it aimed to solve."
          },
          {
            type: "paragraph",
            text: "The policy implication is not that governments should stop intervening, but that they should intervene **more carefully**. Pilot schemes, sunset clauses, cost-benefit analysis and independent evaluation can all help reduce the risk of government failure. The best policies are those that correct the market failure with the fewest unintended side effects."
          }
        ],
        realExample: {
          emoji: "🚕",
          text: "**London taxi licensing** restricted the number of black cabs through strict regulation, keeping fares high and limiting supply. When ride-sharing services like Uber entered the market, they exposed how the licensing system had created an artificial shortage, though deregulation brought its own concerns about driver pay, passenger safety and congestion."
        },
        misconception: "Students argue that government failure proves free markets are always superior to government intervention. Every economy has both market failures and government failures, and the goal is to find the right balance of intervention. Instead write: the existence of government failure means intervention should be carefully designed and evaluated, not that it should be avoided entirely.",
        examMatters: "In any evaluation question on government intervention, bringing in the concept of government failure demonstrates the highest level of analysis. Examiners reward you for explaining that even well-designed policies can fail, and for suggesting how the policy could be improved rather than simply arguing for or against intervention."
      }
    ],
    takeaway: [
      "Government failure means intervention worsens resource allocation",
      "Imperfect information and political short-termism are key causes",
      "Always compare the cost of intervention with the market failure",
      "Good policy design reduces but cannot eliminate the risk"
    ]
  }

];

/* -- 3. VALIDATION ---------------------------------------------------------
   Run automatically before pushing. Catches common writing-rule violations.
   -------------------------------------------------------------------------- */

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
          errors.push(`${sLabel}: keyIdea must not contain **bold** -- it is rendered plain`);
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

/* -- 4. PUSH --------------------------------------------------------------- */

async function run() {
  console.log(`\nValidating content for "${SECTION_SLUG}"...`);
  const errors = validate(CONTENT);

  if (errors.length > 0) {
    console.error('\n Validation failed -- fix these before pushing:\n');
    errors.forEach(e => console.error(`  - ${e}`));
    process.exit(1);
  }
  console.log(`Validation passed -- ${CONTENT.length} blocks, ${CONTENT.reduce((n, b) => n + b.sections.length, 0)} sections\n`);

  // Find the section record (sections.id IS the slug)
  const { data: section, error: secErr } = await supabase
    .from('sections')
    .select('id')
    .eq('id', SECTION_SLUG)
    .single();

  if (secErr || !section) {
    console.error(`Section "${SECTION_SLUG}" not found in ${SUBJECT_ID} sections table`);
    console.error(secErr?.message || '(no error detail)');
    process.exit(1);
  }

  // Update section_content
  const { error } = await supabase
    .from('section_content')
    .update({ data: CONTENT })
    .eq('section_id', section.id);

  if (error) {
    console.error('Supabase error:', error.message);
    process.exit(1);
  }

  console.log(`"${SECTION_SLUG}" updated successfully`);
  console.log(`   ${CONTENT.length} blocks - ${CONTENT.reduce((n, b) => n + b.sections.length, 0)} sections - ${CONTENT.reduce((n, b) => n + b.takeaway.length, 0)} takeaway items`);
}

run();
