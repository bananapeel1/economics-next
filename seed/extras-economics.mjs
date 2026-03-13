// ═══════════════════════════════════════════════════════════════
// EXTRAS — Edexcel International A-Level Economics (IAL)
// Chains of Analysis & Evaluation Points for all 12 sections
// Each section: 4 thematically linked chains + 3-4 evaluation points
// ═══════════════════════════════════════════════════════════════

export default {

  // ───────────────────────────────────────────────────────────────
  // 1. INTRODUCTORY CONCEPTS
  // Theme: Scarcity → Choice → Specialisation → Trade
  // ───────────────────────────────────────────────────────────────
  'introductory-concepts': {
    chains: [
      {
        title: "Scarcity forces choice and opportunity cost",
        steps: [
          "Resources (land, labour, capital, enterprise) are finite, but human wants are unlimited — this is the basic economic problem.",
          "Because resources are scarce, economic agents must make choices about how to allocate them between competing uses.",
          "Every choice involves an opportunity cost — the value of the next best alternative forgone.",
          "Rational agents compare marginal costs and marginal benefits to allocate resources to their highest-valued use."
        ],
        result: "Scarcity makes choice unavoidable, and opportunity cost is the measure of what is sacrificed with every decision."
      },
      {
        title: "The PPF illustrates scarcity, choice and growth",
        steps: [
          "The production possibility frontier shows the maximum combinations of two goods an economy can produce with its existing resources.",
          "Points on the PPF are productively efficient; points inside represent unemployed or misallocated resources.",
          "A movement along the PPF demonstrates opportunity cost — producing more of one good requires producing less of the other.",
          "An outward shift of the PPF, caused by investment in capital or improvements in technology, represents potential economic growth."
        ],
        result: "The PPF is a core diagram for illustrating the trade-off between current consumption and future growth."
      },
      {
        title: "Specialisation raises productivity and output",
        steps: [
          "When workers or countries focus on tasks where they have the lowest opportunity cost, they specialise.",
          "Specialisation increases labour productivity through repetition, skill development and reduced time switching between tasks.",
          "Higher productivity means more output from the same resources, shifting the PPF outward.",
          "Greater total output enables higher living standards measured by real GDP per capita."
        ],
        result: "Specialisation based on comparative advantage allows economies to produce beyond self-sufficiency levels."
      },
      {
        title: "Trade enables gains from specialisation",
        steps: [
          "Countries that specialise can trade their surplus output for goods produced more efficiently elsewhere.",
          "Trade gives consumers access to a wider variety of goods at lower prices, increasing consumer surplus.",
          "Lower prices and greater choice improve material living standards and economic welfare.",
          "However, trade requires a medium of exchange — money overcomes the inefficiencies of barter by acting as a store of value, unit of account and medium of exchange."
        ],
        result: "Trade turns the productivity gains from specialisation into tangible welfare improvements for consumers."
      }
    ],
    evaluation: [
      {
        title: "Rational decision-making is an oversimplification",
        content: "The assumption that agents rationally weigh marginal costs and benefits ignores behavioural factors. Consumers suffer from bounded rationality, cognitive biases (anchoring, loss aversion) and imperfect information. However, the rational model remains useful for predicting broad patterns of market behaviour, even if individual decisions often deviate."
      },
      {
        title: "Specialisation creates vulnerability",
        content: "Over-specialisation leaves workers and economies exposed to structural change. If demand shifts away from a specialised product, workers face structural unemployment due to occupational immobility. The UK's deindustrialisation showed how regions dependent on single industries can suffer lasting decline. The benefits of specialisation must be weighed against dependency risks."
      },
      {
        title: "Comparative advantage relies on unrealistic assumptions",
        content: "The theory assumes constant opportunity costs, perfect factor mobility and no transport costs. In reality, opportunity costs are increasing, factors are occupationally and geographically immobile, and transport costs can erode trade gains. It is also a static model — countries can develop new advantages through industrial policy and innovation."
      }
    ]
  },

  // ───────────────────────────────────────────────────────────────
  // 2. CONSUMER BEHAVIOUR & DEMAND
  // Theme: Price changes → Demand responses → Elasticity → Revenue
  // ───────────────────────────────────────────────────────────────
  'consumer-behaviour-demand': {
    chains: [
      {
        title: "A fall in price increases quantity demanded",
        steps: [
          "When a good's price falls, it becomes relatively cheaper compared to substitutes, so consumers switch towards it (the substitution effect).",
          "The lower price also increases consumers' real income, allowing them to buy more of all normal goods (the income effect).",
          "Combined, these effects cause an extension in quantity demanded — a movement along the demand curve.",
          "Total consumer surplus increases as both existing buyers pay less and new buyers enter the market."
        ],
        result: "The law of demand is explained by the substitution and income effects, and price falls raise consumer welfare through increased surplus."
      },
      {
        title: "Non-price factors shift the demand curve",
        steps: [
          "Changes in real disposable income shift demand — rightward for normal goods (positive YED), leftward for inferior goods (negative YED).",
          "A rise in the price of a substitute increases demand for the good (positive XED), while a rise in the price of a complement reduces it (negative XED).",
          "Changes in tastes, population size, advertising and consumer confidence also shift the demand curve independently of price.",
          "A rightward shift in demand, ceteris paribus, puts upward pressure on equilibrium price and increases equilibrium quantity."
        ],
        result: "Understanding demand shifters is essential for predicting how markets respond to changes in income, related goods and consumer preferences."
      },
      {
        title: "PED determines the responsiveness of demand to price changes",
        steps: [
          "Price elasticity of demand (PED) measures the percentage change in quantity demanded divided by the percentage change in price.",
          "Demand is elastic (PED > 1) when there are close substitutes, the good takes a large share of income, or consumers have time to adjust.",
          "Demand is inelastic (PED < 1) for necessities, addictive goods, or products with few substitutes.",
          "PED varies along a straight-line demand curve — elastic at high prices and inelastic at low prices."
        ],
        result: "PED is determined by substitutability, proportion of income, necessity and time — and it drives pricing and revenue decisions."
      },
      {
        title: "Elasticity determines the impact on total revenue",
        steps: [
          "When demand is price elastic (PED > 1), a price cut raises total revenue because the quantity effect outweighs the price effect.",
          "When demand is price inelastic (PED < 1), a price rise raises total revenue because quantity demanded falls proportionately less.",
          "Firms use PED knowledge to set revenue-maximising prices — lowering prices for elastic goods and raising them for inelastic ones.",
          "Governments also use PED when setting indirect taxes — taxes on inelastic goods (cigarettes, petrol) raise the most revenue with the least fall in quantity."
        ],
        result: "PED is the critical link between price changes and revenue outcomes for both firms and governments."
      }
    ],
    evaluation: [
      {
        title: "PED estimates are unreliable in practice",
        content: "Calculating PED requires ceteris paribus conditions, but in reality multiple factors change simultaneously. Elasticity also changes over time as consumers find substitutes. Firms may rely on outdated estimates, leading to incorrect pricing decisions. PED is a useful theoretical tool but should be used cautiously in real-world strategy."
      },
      {
        title: "Income elasticity depends on the definition of 'normal'",
        content: "Whether a good is normal or inferior depends on income levels and cultural context. A good may be inferior in a high-income country but normal in a developing one. YED also changes as incomes rise — luxury goods become necessities over time. This means YED classifications are not fixed and can mislead long-term forecasts."
      },
      {
        title: "Consumer surplus is difficult to measure",
        content: "Consumer surplus assumes we can accurately measure willingness to pay, but this varies enormously between individuals and is influenced by behavioural biases. Consumers may overvalue goods due to advertising or brand loyalty, distorting true surplus calculations. Despite this, consumer surplus remains the standard welfare measure in economics."
      }
    ]
  },

  // ───────────────────────────────────────────────────────────────
  // 3. SUPPLY
  // Theme: Costs → Supply decisions → Elasticity → Producer welfare
  // ───────────────────────────────────────────────────────────────
  'supply': {
    chains: [
      {
        title: "Rising input costs reduce supply",
        steps: [
          "An increase in the cost of raw materials, wages or energy raises firms' costs of production.",
          "At existing market prices, profit margins are squeezed, making production less profitable.",
          "Firms reduce output or exit the market, causing the supply curve to shift leftward.",
          "The leftward shift leads to higher equilibrium prices and lower equilibrium quantities, reducing consumer welfare."
        ],
        result: "Rising costs of production are a key cause of supply-side contractions, leading to higher prices and reduced output."
      },
      {
        title: "Technology improvements increase supply",
        steps: [
          "Advances in technology reduce average costs of production by increasing output per unit of input.",
          "Lower costs make production more profitable at every price level, incentivising firms to increase output.",
          "The supply curve shifts rightward, increasing equilibrium quantity and reducing equilibrium price.",
          "Consumers benefit from lower prices and greater availability, while efficient firms earn higher profits."
        ],
        result: "Technological progress is the main driver of long-run increases in supply and improvements in productive efficiency."
      },
      {
        title: "PES depends on time, spare capacity and factor mobility",
        steps: [
          "Price elasticity of supply (PES) measures how responsive quantity supplied is to a change in price.",
          "In the short run, supply is inelastic because firms cannot easily change capacity — factories take time to build.",
          "In the long run, firms can invest in new capital, hire workers and enter markets, making supply more elastic.",
          "Industries with spare capacity, mobile factors of production and storable goods have higher PES."
        ],
        result: "PES is primarily determined by the time horizon and the ease with which firms can adjust production levels."
      },
      {
        title: "Producer surplus reflects the gain from selling above cost",
        steps: [
          "Producer surplus is the difference between the market price a firm receives and the minimum price it would accept (its cost of production).",
          "When market prices rise, producer surplus increases as firms earn more above their costs.",
          "Firms with lower costs of production earn the most producer surplus — they are the most efficient producers.",
          "Total producer surplus is the area above the supply curve and below the market price, and it represents the welfare gain to producers."
        ],
        result: "Producer surplus measures how market prices reward efficient producers and is central to welfare analysis."
      }
    ],
    evaluation: [
      {
        title: "Technology does not benefit all firms equally",
        content: "Large firms can afford to invest in new technology, gaining cost advantages, while small firms may be priced out. This can increase market concentration and reduce competition. Technology can also cause structural unemployment as workers are replaced by automation, meaning the benefits of technological progress are unevenly distributed."
      },
      {
        title: "PES is difficult to measure precisely",
        content: "Estimating PES requires isolating the effect of price changes from all other factors affecting supply. In practice, supply responds to expectations, government policy and global conditions simultaneously. PES is useful as a conceptual tool but specific numerical estimates should be treated with caution."
      },
      {
        title: "Short-run supply constraints can cause persistent problems",
        content: "When supply is inelastic in the short run, sudden demand increases lead to sharp price rises rather than output increases. This can cause cost-push inflation, reduce consumer welfare and disproportionately affect low-income households. Governments may intervene with price controls, but these risk creating further distortions."
      }
    ]
  },

  // ───────────────────────────────────────────────────────────────
  // 4. PRICE DETERMINATION
  // Theme: Equilibrium → Price mechanism → Intervention → Distortion
  // ───────────────────────────────────────────────────────────────
  'price-determination': {
    chains: [
      {
        title: "Supply and demand determine equilibrium price",
        steps: [
          "The market equilibrium occurs where the quantity demanded equals quantity supplied — the point where the demand and supply curves intersect.",
          "At prices above equilibrium, there is excess supply (surplus), which puts downward pressure on price as firms compete for buyers.",
          "At prices below equilibrium, there is excess demand (shortage), which puts upward pressure on price as consumers compete for limited goods.",
          "The market self-corrects towards equilibrium through the price adjustment mechanism."
        ],
        result: "Free markets automatically move towards equilibrium through the interaction of supply and demand."
      },
      {
        title: "The price mechanism performs three key functions",
        steps: [
          "The signalling function: rising prices signal to producers that a good is in high demand, encouraging them to increase supply.",
          "The incentive function: higher prices incentivise new firms to enter the market and existing firms to expand output.",
          "The rationing function: when goods are scarce, rising prices ration the limited supply to those with the highest willingness to pay.",
          "Together, these functions allocate scarce resources without the need for central planning."
        ],
        result: "The price mechanism coordinates millions of independent decisions through signalling, incentives and rationing."
      },
      {
        title: "Demand and supply shifts change equilibrium",
        steps: [
          "An increase in demand (rightward shift) raises both equilibrium price and quantity, ceteris paribus.",
          "An increase in supply (rightward shift) raises equilibrium quantity but lowers equilibrium price.",
          "When both curves shift simultaneously, the outcome depends on the relative magnitude of each shift.",
          "Elasticity determines whether the price effect or quantity effect dominates — inelastic supply amplifies price changes."
        ],
        result: "Predicting market outcomes requires analysing both the direction and magnitude of demand and supply shifts."
      },
      {
        title: "Taxes and subsidies distort market equilibrium",
        steps: [
          "An indirect tax (e.g. VAT, excise duty) shifts the supply curve leftward by the amount of the tax, raising the price consumers pay.",
          "The tax burden is shared between consumers and producers — the split depends on the relative elasticity of demand and supply.",
          "A subsidy shifts the supply curve rightward, reducing the price consumers pay and increasing equilibrium quantity.",
          "Both taxes and subsidies create a deadweight welfare loss by moving the market away from the free-market equilibrium."
        ],
        result: "Government taxes and subsidies alter equilibrium outcomes and create welfare losses, but can be justified if they correct market failures."
      }
    ],
    evaluation: [
      {
        title: "Markets may not reach equilibrium in practice",
        content: "The equilibrium model assumes perfect information, rational behaviour and flexible prices. In reality, prices can be sticky, information is imperfect and market power can prevent adjustment. Some markets (housing, labour) may remain in persistent disequilibrium, meaning the self-correcting mechanism does not always work efficiently."
      },
      {
        title: "The price mechanism can produce inequitable outcomes",
        content: "Rationing by price means only those with sufficient purchasing power can access goods. Essential goods like healthcare and housing may be priced beyond the reach of low-income households. This raises questions about whether allocative efficiency (as defined by willingness to pay) is the same as a socially desirable allocation."
      },
      {
        title: "Tax incidence depends on elasticity, not intention",
        content: "Governments may intend for producers to bear a tax burden, but the actual incidence depends on PED and PES. When demand is inelastic (e.g. cigarettes), most of the tax is passed on to consumers. This means indirect taxes on necessities can be regressive, disproportionately affecting low-income households."
      }
    ]
  },

  // ───────────────────────────────────────────────────────────────
  // 5. MARKET FAILURE
  // Theme: Externalities → Public goods → Information failure → Welfare loss
  // ───────────────────────────────────────────────────────────────
  'market-failure': {
    chains: [
      {
        title: "Negative externalities cause overproduction",
        steps: [
          "A negative externality exists when production or consumption imposes costs on third parties that are not reflected in the market price.",
          "Because external costs are not included, the private cost to the firm is lower than the social cost to society.",
          "The market produces at the point where marginal private cost equals marginal private benefit, which exceeds the socially optimal output.",
          "The result is a welfare loss — the area between the social cost and private cost curves over the range of overproduction."
        ],
        result: "Negative externalities cause markets to overproduce, creating a divergence between private and social costs and a deadweight welfare loss."
      },
      {
        title: "Public goods are under-provided by the market",
        steps: [
          "Public goods are non-excludable (cannot prevent non-payers from consuming) and non-rivalrous (one person's consumption does not reduce availability for others).",
          "Non-excludability creates the free-rider problem — rational consumers will not pay voluntarily because they can consume without paying.",
          "Because firms cannot charge a price, there is no profit incentive to supply public goods through the market.",
          "This leads to a missing market — the good is not provided despite generating significant social benefits."
        ],
        result: "The free-rider problem means public goods like street lighting and national defence require government provision funded through taxation."
      },
      {
        title: "Information failure leads to misallocation",
        steps: [
          "Information failure occurs when consumers or producers do not have access to full, accurate information about a product's costs or benefits.",
          "Merit goods (education, healthcare) are under-consumed because consumers undervalue their long-term private and social benefits.",
          "Demerit goods (tobacco, alcohol) are over-consumed because consumers underestimate the long-term private and social costs.",
          "In both cases, the market outcome diverges from the socially optimal outcome, creating a welfare loss."
        ],
        result: "Information failure causes systematic under-consumption of merit goods and over-consumption of demerit goods."
      },
      {
        title: "Factor immobility creates persistent market failure",
        steps: [
          "Occupational immobility occurs when workers lack the skills or qualifications to move between jobs in different industries.",
          "Geographical immobility occurs when workers cannot easily relocate due to housing costs, family ties or regional differences.",
          "When industries decline, immobile workers remain unemployed rather than moving to growing sectors.",
          "This leads to structural unemployment concentrated in specific regions, wasting productive resources and reducing potential output."
        ],
        result: "Factor immobility prevents the labour market from clearing efficiently, causing persistent regional unemployment and lost output."
      }
    ],
    evaluation: [
      {
        title: "Measuring externalities is inherently difficult",
        content: "Externalities are, by definition, costs or benefits not captured by the market. Placing a monetary value on pollution damage, health costs or environmental degradation involves subjective judgements. Different valuation methods produce different estimates, making it hard to determine the 'correct' level of government intervention. Over-correction can be as harmful as under-correction."
      },
      {
        title: "The distinction between merit and demerit goods is value-laden",
        content: "Classifying goods as merit or demerit involves normative judgements about what people 'should' consume. Governments may use information failure as justification for paternalistic intervention that overrides consumer sovereignty. What counts as a merit good changes across cultures and over time, making this classification inherently subjective."
      },
      {
        title: "Market failure does not automatically justify intervention",
        content: "The existence of market failure is a necessary but not sufficient condition for government intervention. Intervention itself can create government failure through unintended consequences, bureaucratic inefficiency and imperfect information. Policymakers must weigh the costs of market failure against the potential costs of government failure before acting."
      }
    ]
  },

  // ───────────────────────────────────────────────────────────────
  // 6. GOVERNMENT INTERVENTION
  // Theme: Tax/subsidy → Regulation → Market-based → Government failure
  // ───────────────────────────────────────────────────────────────
  'government-intervention': {
    chains: [
      {
        title: "Indirect taxes correct negative externalities",
        steps: [
          "An indirect tax on a good with negative externalities raises its price, increasing the private cost to match the social cost.",
          "The higher price reduces quantity demanded, moving output closer to the socially optimal level.",
          "The tax generates revenue that can fund the clean-up of external costs or compensate affected third parties.",
          "The welfare loss from the externality is reduced, improving allocative efficiency."
        ],
        result: "Indirect taxes internalise external costs, aligning private and social costs to reduce overproduction."
      },
      {
        title: "Subsidies encourage consumption of merit goods",
        steps: [
          "A subsidy on a merit good (e.g. education, vaccination) lowers the price to consumers, making it more affordable.",
          "Lower prices increase consumption towards the socially optimal level, as more consumers can access the good.",
          "The subsidy corrects the information failure by ensuring consumption reflects the full social benefit, not just the private benefit.",
          "Society benefits from the positive externalities generated — a better-educated workforce, reduced disease transmission."
        ],
        result: "Subsidies correct under-consumption of merit goods by lowering price barriers and capturing social benefits."
      },
      {
        title: "Tradable pollution permits use market incentives",
        steps: [
          "The government sets a cap on total emissions and issues permits allowing firms to pollute up to a fixed amount.",
          "Firms that can reduce pollution cheaply sell their surplus permits to firms where abatement is more expensive.",
          "Trading creates a market price for pollution, giving firms a financial incentive to invest in cleaner technology.",
          "Total emissions fall to the capped level while the market determines the most cost-effective allocation of abatement."
        ],
        result: "Tradable permits combine the certainty of a pollution cap with the efficiency of market-based allocation."
      },
      {
        title: "Government failure can worsen outcomes",
        steps: [
          "Government intervention may fail due to imperfect information — policymakers may not know the true size of externalities or the optimal tax rate.",
          "Regulation can create unintended consequences — price ceilings cause shortages, minimum prices create surpluses.",
          "Administrative and enforcement costs may exceed the benefits of the intervention, making it net welfare-reducing.",
          "Political pressures and lobbying can distort policy away from the social optimum towards the interests of powerful groups."
        ],
        result: "Government failure means that intervention does not always improve on market outcomes — the cure can be worse than the disease."
      }
    ],
    evaluation: [
      {
        title: "Setting the correct tax rate requires perfect information",
        content: "To fully internalise an externality, the tax must equal the marginal external cost. But measuring external costs precisely is extremely difficult — pollution damage, health costs and environmental harm are uncertain and context-dependent. An incorrect tax rate leads to either continued overproduction (too low) or excessive reduction in output (too high)."
      },
      {
        title: "Subsidies can be costly and create dependency",
        content: "Subsidies require government spending funded by taxation, which has its own deadweight loss. Firms and consumers may become dependent on subsidies, making them politically difficult to remove. Subsidies can also distort competition by favouring subsidised goods over unsubsidised alternatives, potentially reducing dynamic efficiency."
      },
      {
        title: "Regulation vs market-based approaches involves trade-offs",
        content: "Direct regulation (bans, standards) provides certainty of outcome but is inflexible and may impose high compliance costs. Market-based approaches (taxes, permits) are more efficient but outcomes are less predictable. The best approach depends on the specific context — regulation works well for dangerous pollutants, while permits suit situations where cost-effective abatement varies between firms."
      }
    ]
  },

  // ───────────────────────────────────────────────────────────────
  // 7. MEASURES OF ECONOMIC PERFORMANCE
  // Theme: GDP → Inflation → Unemployment → Balance of payments
  // ───────────────────────────────────────────────────────────────
  'measures-economic-performance': {
    chains: [
      {
        title: "GDP growth indicates improving economic performance",
        steps: [
          "Real GDP measures the total value of goods and services produced in an economy, adjusted for inflation.",
          "Rising real GDP indicates that the economy is producing more output, which typically leads to higher employment and incomes.",
          "Real GDP per capita (GDP divided by population) is a better measure of average living standards as it accounts for population changes.",
          "However, GDP does not capture income distribution, environmental costs or unpaid work, so it is an incomplete measure of welfare."
        ],
        result: "GDP growth is the primary indicator of economic performance but must be supplemented with other measures for a full picture of living standards."
      },
      {
        title: "Inflation erodes purchasing power and creates uncertainty",
        steps: [
          "Inflation is a sustained increase in the general price level, measured by the Consumer Price Index (CPI).",
          "Rising prices reduce the real value of money — consumers can buy fewer goods with the same nominal income.",
          "Unexpected inflation redistributes income from savers (who lose real value) to borrowers (who repay in cheaper money).",
          "High or volatile inflation creates uncertainty for firms, discouraging investment and reducing long-run economic growth."
        ],
        result: "Inflation reduces purchasing power, distorts economic decisions and, if left unchecked, undermines macroeconomic stability."
      },
      {
        title: "Unemployment represents wasted resources and lost output",
        steps: [
          "Unemployment means workers who are willing and able to work cannot find a job, representing idle productive resources.",
          "The economy operates inside its PPF when there is unemployment, meaning actual output is below potential output.",
          "Different types of unemployment have different causes: frictional (job search), structural (skills mismatch), cyclical (insufficient AD).",
          "Unemployment imposes costs on individuals (lost income, reduced wellbeing) and on the government (lower tax revenue, higher welfare spending)."
        ],
        result: "Unemployment is a key measure of economic performance because it signals both wasted resources and human welfare costs."
      },
      {
        title: "The current account reflects international competitiveness",
        steps: [
          "The current account records trade in goods and services, primary income (investment returns) and secondary income (transfers).",
          "A current account deficit means the country is spending more on imports than it earns from exports — it is a net borrower from abroad.",
          "Persistent deficits may indicate declining competitiveness — high relative prices, poor quality goods or an overvalued exchange rate.",
          "However, deficits can also reflect strong domestic demand and investment inflows, which are not necessarily problematic."
        ],
        result: "The current account balance is an important indicator of external competitiveness, but deficits are not always a cause for concern."
      }
    ],
    evaluation: [
      {
        title: "GDP is a flawed measure of living standards",
        content: "GDP excludes the informal economy, household production, leisure time and environmental degradation. A country could have rising GDP while inequality widens and the environment deteriorates. Alternative measures like HDI, GNI per capita and the Gini coefficient provide a broader picture but each has its own limitations."
      },
      {
        title: "Low unemployment does not mean a healthy labour market",
        content: "The headline unemployment rate can be misleading. It excludes discouraged workers who have stopped looking, underemployed workers who want more hours, and those on zero-hour contracts. A low unemployment rate may mask poor-quality employment, stagnant wages and insecure work, all of which reduce living standards."
      },
      {
        title: "CPI may not reflect the true cost of living",
        content: "CPI is based on a fixed basket of goods that may not represent all households' spending patterns. It tends to overstate inflation for some groups and understate it for others. Housing costs (mortgage interest) are excluded from CPI, and quality improvements are difficult to account for. RPI includes housing costs but uses a different formula."
      }
    ]
  },

  // ───────────────────────────────────────────────────────────────
  // 8. AGGREGATE DEMAND
  // Theme: Components → Shifts → Multiplier → Policy implications
  // ───────────────────────────────────────────────────────────────
  'aggregate-demand': {
    chains: [
      {
        title: "AD is composed of four spending components",
        steps: [
          "Aggregate demand (AD) = C + I + G + (X − M), where C is consumption, I is investment, G is government spending, and (X − M) is net exports.",
          "Consumption is the largest component, determined by disposable income, interest rates, consumer confidence and wealth.",
          "Investment depends on interest rates, business confidence, expected future demand and technological change.",
          "A change in any component shifts the AD curve — rightward if total spending increases, leftward if it decreases."
        ],
        result: "AD is driven by four spending components, each influenced by different economic variables."
      },
      {
        title: "Interest rate cuts stimulate aggregate demand",
        steps: [
          "A cut in the base interest rate reduces the cost of borrowing for consumers and firms.",
          "Cheaper borrowing encourages consumer spending on credit-financed goods (cars, houses) and firm investment in capital.",
          "Lower interest rates also reduce the incentive to save, shifting income from saving towards consumption.",
          "The combined increase in C and I shifts the AD curve to the right, increasing real output and employment."
        ],
        result: "Interest rate cuts are the primary monetary policy tool for stimulating AD, working through consumption and investment channels."
      },
      {
        title: "The multiplier amplifies changes in spending",
        steps: [
          "An initial injection of spending (e.g. government investment) creates income for workers and suppliers who receive the payment.",
          "Recipients spend a proportion of their new income (determined by the marginal propensity to consume, MPC) on goods and services.",
          "This spending becomes income for another group, who spend a proportion of it, creating successive rounds of spending.",
          "The final increase in national income is a multiple of the original injection: multiplier = 1 / (1 − MPC) = 1 / MPW."
        ],
        result: "The multiplier means a small change in spending can have a much larger impact on national income and output."
      },
      {
        title: "AD shifts determine short-run economic outcomes",
        steps: [
          "A rightward shift of AD, ceteris paribus, increases real output and the price level — stimulating growth but risking demand-pull inflation.",
          "A leftward shift of AD reduces output and may lower the price level — causing recession and rising unemployment.",
          "The impact on prices versus output depends on the shape of the AS curve — near full capacity, AD increases mostly raise prices.",
          "Governments and central banks use fiscal and monetary policy to manage AD and stabilise the economy."
        ],
        result: "AD shifts are the main cause of short-run fluctuations in output, employment and the price level."
      }
    ],
    evaluation: [
      {
        title: "The multiplier effect may be small in practice",
        content: "The multiplier is reduced by withdrawals: savings, taxes and imports all leak income out of the circular flow. In an open economy with high import propensity, much of the initial spending may flow abroad. The multiplier is also smaller when the economy is near full capacity, as increased spending leads to inflation rather than output growth."
      },
      {
        title: "Interest rate cuts may not stimulate spending",
        content: "In a liquidity trap, interest rates are already near zero and further cuts have no effect. Even with lower rates, consumers may not borrow if confidence is low (paradox of thrift). Banks may also tighten lending criteria during recessions, preventing rate cuts from reaching borrowers. This limits the effectiveness of monetary policy."
      },
      {
        title: "AD management creates policy trade-offs",
        content: "Stimulating AD to reduce unemployment risks generating demand-pull inflation. Restricting AD to control inflation risks causing unemployment. This trade-off, illustrated by the Phillips Curve, means policymakers face difficult choices about which objective to prioritise. The trade-off may be worse in the short run than the long run."
      }
    ]
  },

  // ───────────────────────────────────────────────────────────────
  // 9. AGGREGATE SUPPLY
  // Theme: SRAS factors → LRAS determinants → Classical vs Keynesian → Policy
  // ───────────────────────────────────────────────────────────────
  'aggregate-supply': {
    chains: [
      {
        title: "Short-run supply shocks shift SRAS",
        steps: [
          "Short-run aggregate supply (SRAS) shows the total output firms are willing to supply at each price level, given current input costs.",
          "A rise in input costs (oil prices, wages, raw materials) increases firms' costs of production at every output level.",
          "The SRAS curve shifts leftward, reducing output and raising the price level — a combination known as stagflation.",
          "Conversely, falling input costs shift SRAS rightward, increasing output and reducing inflationary pressure."
        ],
        result: "SRAS shifts are caused by changes in costs of production and can create stagflation when costs rise unexpectedly."
      },
      {
        title: "LRAS is determined by the productive capacity of the economy",
        steps: [
          "Long-run aggregate supply (LRAS) represents the maximum output an economy can produce when all resources are fully employed.",
          "LRAS shifts rightward when the quantity or quality of factors of production increases — more labour, better capital, improved technology.",
          "Investment in education and training increases human capital, raising labour productivity and shifting LRAS outward.",
          "An outward shift of LRAS enables non-inflationary economic growth — higher output without higher prices."
        ],
        result: "LRAS growth depends on expanding productive capacity through investment in physical capital, human capital and technology."
      },
      {
        title: "Classical and Keynesian models differ on the shape of AS",
        steps: [
          "The Classical model shows LRAS as vertical at the full employment level of output — the economy always returns to full employment in the long run.",
          "In this model, increases in AD only cause inflation and do not increase real output beyond the full employment level.",
          "The Keynesian model shows AS as horizontal when there is significant spare capacity, then upward sloping, then vertical at full employment.",
          "In the Keynesian model, AD increases can raise real output without causing inflation when there is spare capacity — justifying demand management."
        ],
        result: "The debate between Classical and Keynesian AS shapes has fundamental implications for whether demand-side or supply-side policies are effective."
      },
      {
        title: "Supply-side policies shift LRAS to enable sustainable growth",
        steps: [
          "Supply-side policies aim to increase the productive capacity of the economy by improving the efficiency of markets.",
          "Market-based policies include deregulation, privatisation, trade liberalisation and labour market reforms to increase flexibility.",
          "Interventionist policies include government spending on education, infrastructure and R&D to improve factor quality.",
          "Successful supply-side policies shift LRAS rightward, enabling higher output, lower inflation and improved international competitiveness."
        ],
        result: "Supply-side policies are essential for long-run non-inflationary growth, but they take time to work and have distributional consequences."
      }
    ],
    evaluation: [
      {
        title: "Supply-side policies have significant time lags",
        content: "Education and infrastructure investment may take years or decades to increase productive capacity. In the meantime, the economy may need demand-side management to address short-run unemployment or inflation. Supply-side policies are necessary but not sufficient for managing the economy — they must be combined with appropriate fiscal and monetary policy."
      },
      {
        title: "Labour market flexibility has a social cost",
        content: "Deregulation and flexible labour markets can reduce unemployment but may lead to job insecurity, low wages and worsening inequality. Zero-hour contracts and the gig economy increase firms' flexibility but transfer risk to workers. The efficiency gains from labour market reform must be weighed against the welfare costs to vulnerable workers."
      },
      {
        title: "The Classical-Keynesian debate remains unresolved",
        content: "In practice, both models have merit depending on economic conditions. The Classical model better describes long-run trends, while the Keynesian model better explains recessions and periods of high unemployment. Most modern economists accept elements of both — flexible wages eventually restore equilibrium, but this process can be painfully slow."
      }
    ]
  },

  // ───────────────────────────────────────────────────────────────
  // 10. NATIONAL INCOME
  // Theme: Circular flow → Injections/withdrawals → Equilibrium → Multiplier
  // ───────────────────────────────────────────────────────────────
  'national-income': {
    chains: [
      {
        title: "The circular flow shows how income moves through the economy",
        steps: [
          "In a simple economy, households provide factors of production to firms and receive factor incomes (wages, rent, interest, profit).",
          "Households spend their income on goods and services, creating revenue for firms, which funds further production.",
          "In a more realistic model, income leaks out through savings (S), taxation (T) and imports (M) — these are withdrawals.",
          "Income is injected back in through investment (I), government spending (G) and exports (X) — these are injections."
        ],
        result: "The circular flow model shows how income, spending and output are interconnected, with withdrawals and injections determining equilibrium."
      },
      {
        title: "Equilibrium occurs when injections equal withdrawals",
        steps: [
          "National income is in equilibrium when total injections (I + G + X) equal total withdrawals (S + T + M).",
          "If injections exceed withdrawals, total spending rises and national income expands through the multiplier process.",
          "If withdrawals exceed injections, spending falls and national income contracts, leading to lower output and employment.",
          "The economy adjusts towards equilibrium through changes in income levels — higher income increases withdrawals until they match injections."
        ],
        result: "Equilibrium national income is determined by the balance between injections into and withdrawals from the circular flow."
      },
      {
        title: "An increase in investment raises national income via the multiplier",
        steps: [
          "An increase in investment (an injection) directly raises demand for capital goods, creating income for suppliers and their workers.",
          "Workers spend a proportion of their new income (MPC), creating demand for consumer goods and further income for others.",
          "This process repeats through successive rounds, with each round smaller than the last as income leaks out through S, T and M.",
          "The total increase in national income = initial injection × multiplier, where the multiplier = 1 / (1 − MPC) = 1 / MPW."
        ],
        result: "The multiplier process means that changes in injections have an amplified effect on national income."
      },
      {
        title: "A rise in savings can paradoxically reduce national income",
        steps: [
          "If consumers increase their savings rate, the marginal propensity to consume (MPC) falls and withdrawals from the circular flow increase.",
          "Lower consumption reduces demand for goods, leading firms to cut output and employment.",
          "Lower employment reduces incomes further, causing a further fall in consumption — the multiplier works in reverse.",
          "Paradoxically, the attempt by individuals to save more results in lower national income and potentially lower total savings — the paradox of thrift."
        ],
        result: "The paradox of thrift shows that individually rational behaviour (saving more) can be collectively harmful when it reduces aggregate demand."
      }
    ],
    evaluation: [
      {
        title: "The multiplier is a simplification of reality",
        content: "The multiplier model assumes a constant MPC, stable withdrawals and no supply-side constraints. In reality, the MPC changes with income levels and confidence, taxes are progressive (changing the withdrawal rate) and supply constraints can turn spending increases into inflation rather than output growth. The actual multiplier is usually smaller than the theoretical value."
      },
      {
        title: "The paradox of thrift depends on context",
        content: "The paradox of thrift holds when the economy has spare capacity and increased savings are not channelled into productive investment. If savings are intermediated by banks into business investment, the negative effect is reduced. In a fully employed economy, higher savings can fund investment and increase long-run growth. Context determines whether saving is beneficial or harmful."
      },
      {
        title: "National income equilibrium may not mean full employment",
        content: "Keynesian economics emphasises that the economy can reach equilibrium at a level of output below full employment. This deflationary gap means resources are wasted and living standards are lower than they could be. Government intervention through fiscal policy may be needed to close the gap, but this carries risks of crowding out private investment."
      }
    ]
  },

  // ───────────────────────────────────────────────────────────────
  // 11. ECONOMIC GROWTH
  // Theme: Actual vs potential → Business cycle → Benefits → Costs
  // ───────────────────────────────────────────────────────────────
  'economic-growth': {
    chains: [
      {
        title: "Actual growth comes from using idle resources",
        steps: [
          "Actual economic growth is an increase in real GDP — the economy produces more output over a given period.",
          "This occurs when previously unemployed resources are brought into use, moving the economy from inside the PPF towards the frontier.",
          "Actual growth is typically driven by increases in aggregate demand — higher consumer spending, investment or government expenditure.",
          "It reduces the negative output gap (the difference between actual and potential output) and lowers unemployment."
        ],
        result: "Actual growth uses up spare capacity and is driven by demand-side factors, reducing unemployment in the short run."
      },
      {
        title: "Potential growth expands the economy's productive capacity",
        steps: [
          "Potential growth is an increase in the economy's productive capacity — the maximum output it can sustainably produce.",
          "It is caused by increases in the quantity or quality of factors of production: more workers, better technology, greater capital stock.",
          "Potential growth shifts the LRAS curve rightward and the PPF outward.",
          "It enables actual growth without inflationary pressure, as the economy can produce more output at any given price level."
        ],
        result: "Potential growth is driven by supply-side improvements and is essential for sustainable, non-inflationary long-run growth."
      },
      {
        title: "The business cycle creates fluctuations around the trend",
        steps: [
          "Economies do not grow at a steady rate — they fluctuate through boom, slowdown, recession and recovery phases.",
          "In a boom, actual GDP exceeds potential GDP (positive output gap), creating demand-pull inflation and unsustainable growth.",
          "In a recession, actual GDP falls below potential (negative output gap), causing rising unemployment and falling incomes.",
          "Government policy aims to smooth these fluctuations, keeping actual growth close to potential and minimising output gaps."
        ],
        result: "The business cycle explains why growth is uneven and why stabilisation policies are needed to manage demand."
      },
      {
        title: "Economic growth has both benefits and costs",
        steps: [
          "Growth raises real incomes, improves living standards and generates tax revenue for public services.",
          "Higher employment reduces poverty and social exclusion, and business profits fund further investment.",
          "However, rapid growth can cause demand-pull inflation, environmental degradation and depletion of non-renewable resources.",
          "Growth may also widen income inequality if the gains are concentrated among capital owners and high-skilled workers."
        ],
        result: "Economic growth improves material living standards but its desirability depends on whether it is sustainable, inclusive and environmentally responsible."
      }
    ],
    evaluation: [
      {
        title: "GDP growth does not guarantee improved welfare",
        content: "Growth that comes with rising inequality, environmental damage or reduced leisure time may not improve overall welfare. If the benefits of growth accrue mainly to the wealthy, median living standards may stagnate even as GDP rises. Sustainable development requires that growth is inclusive and does not deplete natural capital for future generations."
      },
      {
        title: "Supply-side growth takes time to materialise",
        content: "Investment in education, infrastructure and technology may take years or decades to shift LRAS. In the short run, demand management is needed to address cyclical unemployment. Over-reliance on supply-side policies risks neglecting those suffering from current recessions. A balanced approach combining demand and supply-side measures is usually most effective."
      },
      {
        title: "Output gaps are difficult to measure in real time",
        content: "Estimating potential GDP requires assumptions about the natural rate of unemployment and sustainable capacity. These estimates are frequently revised, meaning policymakers may not know the true size or direction of the output gap when making decisions. Incorrect estimates lead to inappropriate policy — tightening too early in a recovery or stimulating an already overheating economy."
      }
    ]
  },

  // ───────────────────────────────────────────────────────────────
  // 12. MACROECONOMIC OBJECTIVES & POLICIES
  // Theme: Objectives → Fiscal policy → Monetary policy → Conflicts
  // ───────────────────────────────────────────────────────────────
  'macroeconomic-objectives-policies': {
    chains: [
      {
        title: "Governments pursue multiple macroeconomic objectives",
        steps: [
          "The four main macroeconomic objectives are: sustained economic growth, low and stable inflation, low unemployment and a sustainable balance of payments.",
          "These objectives are pursued because they together indicate a healthy, stable economy with rising living standards.",
          "Governments use demand-side policies (fiscal and monetary) and supply-side policies to achieve these goals.",
          "However, pursuing one objective can conflict with another — creating policy trade-offs that require difficult choices."
        ],
        result: "Macroeconomic policy involves balancing multiple objectives that may conflict, requiring careful prioritisation."
      },
      {
        title: "Fiscal policy uses government spending and taxation",
        steps: [
          "Expansionary fiscal policy (increased G or lower T) raises aggregate demand, stimulating output and reducing unemployment.",
          "Contractionary fiscal policy (reduced G or higher T) reduces aggregate demand, cooling inflation but risking higher unemployment.",
          "Fiscal policy works through the multiplier — an initial change in G or T has an amplified effect on national income.",
          "However, fiscal policy may be constrained by budget deficits, time lags and the risk of crowding out private investment."
        ],
        result: "Fiscal policy directly affects AD through the government's budget, but is limited by debt levels, political pressures and implementation lags."
      },
      {
        title: "Monetary policy uses interest rates to manage AD",
        steps: [
          "The central bank sets the base interest rate to influence borrowing, saving and spending across the economy.",
          "Lower interest rates stimulate AD by encouraging borrowing, reducing saving incentives and boosting asset prices.",
          "Higher interest rates reduce AD by discouraging borrowing, encouraging saving and strengthening the exchange rate (reducing net exports).",
          "Monetary policy has shorter implementation lags than fiscal policy but operates with transmission lags before effects are felt."
        ],
        result: "Monetary policy is the primary tool for short-run demand management, working through interest rate effects on consumption, investment and net exports."
      },
      {
        title: "Policy conflicts force trade-offs between objectives",
        steps: [
          "Expanding AD to reduce unemployment can cause demand-pull inflation — the classic inflation-unemployment trade-off (Phillips Curve).",
          "Raising interest rates to control inflation can strengthen the exchange rate, worsening the current account deficit.",
          "Fiscal expansion to boost growth increases the budget deficit, which may conflict with fiscal sustainability objectives.",
          "Supply-side policies can reduce these conflicts in the long run by shifting LRAS, but they take time and have distributional consequences."
        ],
        result: "Policy conflicts mean no single policy can achieve all objectives simultaneously — policymakers must prioritise and accept trade-offs."
      }
    ],
    evaluation: [
      {
        title: "The Phillips Curve trade-off may not hold in the long run",
        content: "The short-run Phillips Curve suggests a trade-off between inflation and unemployment, but monetarists argue this disappears in the long run as expectations adjust. If workers anticipate inflation, they demand higher wages, pushing unemployment back to the natural rate. This means demand management can only reduce unemployment temporarily, and sustained low unemployment requires supply-side reforms."
      },
      {
        title: "Fiscal policy effectiveness is debated",
        content: "Keynesians argue fiscal policy is essential during recessions when monetary policy is ineffective (liquidity trap). Classical economists argue that fiscal expansion crowds out private spending through higher interest rates and future tax expectations. The truth depends on economic conditions — fiscal policy is most effective when the economy has spare capacity and interest rates are low."
      },
      {
        title: "Policy coordination is essential but difficult",
        content: "Fiscal and monetary policy are often set by different institutions (government and central bank) with different priorities and time horizons. Conflicting signals — expansionary fiscal policy alongside contractionary monetary policy — can reduce overall effectiveness. Coordination is improved by clear mandates, transparent communication and agreement on the priority objectives for the current economic conditions."
      }
    ]
  },

};
