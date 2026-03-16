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

  // ───────────────────────────────────────────────────────────────
  // UNIT 3 — BUSINESS ECONOMICS
  // ───────────────────────────────────────────────────────────────

  // ───────────────────────────────────────────────────────────────
  // 13. TYPES & SIZES OF BUSINESSES
  // Theme: Ownership → Growth → Control problems → Market niches
  // ───────────────────────────────────────────────────────────────
  'types-sizes-businesses': {
    chains: [
      {
        title: "Profit motive drives efficiency in private sector",
        steps: [
          "Private sector firms are owned by shareholders who seek maximum returns on their investment, creating a strong profit motive.",
          "The profit motive incentivises firms to minimise costs and innovate, as higher efficiency leads to greater profits and shareholder value.",
          "Cost minimisation drives productive efficiency — firms produce at the lowest point on their average cost curve to maximise profit margins.",
          "Competition between profit-seeking firms pushes prices down towards costs, benefiting consumers through lower prices and improved product quality."
        ],
        result: "The profit motive in the private sector acts as a powerful incentive for efficiency, innovation and consumer benefit through competitive pressure."
      },
      {
        title: "Mergers can create monopoly power harming consumers",
        steps: [
          "Horizontal mergers combine firms at the same stage of production, increasing market concentration and the merged firm's market share.",
          "Greater market share gives the merged firm increased pricing power, allowing it to raise prices above competitive levels.",
          "Higher prices transfer surplus from consumers to producers, reducing consumer welfare and creating allocative inefficiency.",
          "Reduced competitive pressure may also lead to X-inefficiency, as the dominant firm has less incentive to minimise costs or innovate."
        ],
        result: "Mergers that significantly increase market concentration can harm consumers through higher prices, reduced choice and lower efficiency."
      },
      {
        title: "Principal-agent problem leads to satisficing",
        steps: [
          "In large firms, ownership (shareholders) is separated from control (managers), creating the principal-agent problem.",
          "Managers (agents) may pursue their own objectives — such as revenue maximisation, empire building or leisure — rather than profit maximisation for shareholders (principals).",
          "Information asymmetry means shareholders cannot perfectly monitor managers' decisions, giving managers discretion to satisfice rather than maximise profits.",
          "Satisficing behaviour means managers aim for 'good enough' profits to keep shareholders content while pursuing their own goals, leading to outcomes that deviate from allocative efficiency."
        ],
        result: "The divorce of ownership from control in large firms means managers may satisfice rather than profit maximise, reducing shareholder returns and economic efficiency."
      },
      {
        title: "SMEs face constraints but fill market niches",
        steps: [
          "Small and medium enterprises face higher average costs than large firms because they cannot exploit internal economies of scale in purchasing, marketing or finance.",
          "SMEs also face greater difficulty accessing finance — banks view them as higher risk, and they cannot issue shares on stock markets as easily as PLCs.",
          "Despite these constraints, SMEs survive by serving niche markets with specialised products, offering personalised service and maintaining flexibility to adapt quickly to changing demand.",
          "SMEs are vital for the economy as they promote entrepreneurship, increase competition, create employment and drive innovation in areas large firms overlook."
        ],
        result: "SMEs overcome cost and finance disadvantages by exploiting niche markets and flexibility, playing an essential role in promoting competition and innovation."
      }
    ],
    evaluation: [
      {
        title: "Profit motive does not always lead to socially optimal outcomes",
        content: "While the profit motive drives efficiency, it can also incentivise negative externalities — firms may cut costs by polluting or exploiting workers. Firms may engage in rent-seeking behaviour rather than productive activity. The profit motive only leads to socially optimal outcomes when markets are competitive and externalities are internalised through regulation or taxation."
      },
      {
        title: "Mergers can generate genuine efficiency gains",
        content: "Not all mergers harm consumers. Horizontal mergers may deliver economies of scale that lower average costs, with savings passed on to consumers. Vertical mergers can reduce transaction costs and improve supply chain coordination. The net effect depends on whether efficiency gains outweigh the market power created — this is the core assessment for competition authorities."
      },
      {
        title: "Corporate governance can mitigate the principal-agent problem",
        content: "Share option schemes, performance-related pay and non-executive directors can align managers' incentives with shareholders' interests. Hostile takeover threats also discipline management, as poorly performing firms become takeover targets. However, these mechanisms are imperfect — excessive risk-taking to boost short-term share prices can result, as seen in the 2008 financial crisis."
      },
      {
        title: "SME survival depends on the nature of the market",
        content: "In markets with significant economies of scale (utilities, car manufacturing), SMEs cannot compete and large firms dominate. However, in fragmented markets with diverse consumer tastes (restaurants, consulting), SMEs thrive. The growth of digital platforms has also enabled SMEs to access global markets at low cost, changing the traditional relationship between firm size and competitiveness."
      }
    ]
  },

  // ───────────────────────────────────────────────────────────────
  // 14. REVENUE, COSTS & PROFITS
  // Theme: Cost structures → Economies of scale → Profit maximisation → Market entry
  // ───────────────────────────────────────────────────────────────
  'revenue-costs-profits': {
    chains: [
      {
        title: "Diminishing returns lead to rising marginal costs",
        steps: [
          "In the short run, at least one factor of production is fixed — typically capital. As more variable factors (labour) are added, output initially rises at an increasing rate.",
          "Beyond a certain point, adding more labour to fixed capital yields diminishing marginal returns — each additional worker adds less to total output than the previous one.",
          "Diminishing marginal returns cause marginal costs to rise, because each extra unit of output requires proportionally more variable input to produce.",
          "Rising marginal costs eventually pull up average variable costs and average total costs, giving the short-run cost curves their characteristic U-shape."
        ],
        result: "The law of diminishing returns explains why short-run marginal and average costs eventually rise, shaping the firm's supply decision."
      },
      {
        title: "Economies of scale create barriers to entry",
        steps: [
          "As firms increase their scale of production in the long run, they can exploit internal economies of scale — technical, managerial, financial, marketing and risk-bearing.",
          "Economies of scale reduce long-run average costs, allowing large firms to produce at lower unit costs than smaller rivals.",
          "New entrants cannot immediately match these low costs, as they start at a small scale with higher average costs — this creates a natural barrier to entry.",
          "Barriers to entry protect incumbent firms' market power and supernormal profits, reducing competitive pressure and potentially harming consumers."
        ],
        result: "Economies of scale give large incumbent firms a cost advantage that deters new entrants, sustaining market concentration and potentially reducing competition."
      },
      {
        title: "Profit maximisation occurs at MC=MR",
        steps: [
          "A profit-maximising firm produces where marginal cost equals marginal revenue (MC=MR), as this is the output level where the addition to revenue from the last unit exactly equals the addition to cost.",
          "If MR > MC, the firm can increase profit by producing more, as each extra unit adds more to revenue than to cost.",
          "If MC > MR, the firm should reduce output, as each unit produced adds more to cost than to revenue, reducing total profit.",
          "At MC=MR, total profit (TR - TC) is maximised, and this rule applies regardless of market structure — whether perfectly competitive, monopolistic or oligopolistic."
        ],
        result: "The MC=MR rule is the universal condition for profit maximisation, providing the foundation for analysing output decisions across all market structures."
      },
      {
        title: "Supernormal profits attract entry in competitive markets",
        steps: [
          "When existing firms earn supernormal profits (AR > AC), this signals to potential entrants that above-normal returns are available in the market.",
          "In markets with low barriers to entry, new firms enter attracted by the prospect of supernormal profits, increasing market supply.",
          "The increase in supply shifts the market supply curve rightward, putting downward pressure on price and reducing profit margins for all firms.",
          "Entry continues until supernormal profits are competed away and firms earn only normal profit (AR = AC), which is the long-run equilibrium in competitive markets."
        ],
        result: "Supernormal profits are temporary in competitive markets — entry erodes them until only normal profit remains, ensuring resources are efficiently allocated."
      }
    ],
    evaluation: [
      {
        title: "Firms may not profit maximise in practice",
        content: "The MC=MR rule assumes firms have perfect knowledge of their cost and revenue curves, which is unrealistic. In practice, firms often use cost-plus pricing or target a specific profit margin. Additionally, the principal-agent problem means managers may pursue sales revenue maximisation or growth rather than profit maximisation. However, competitive pressure tends to push firms towards profit-maximising behaviour in the long run."
      },
      {
        title: "Diseconomies of scale can offset growth advantages",
        content: "As firms grow beyond their optimal scale, they may experience diseconomies of scale — communication breakdowns, coordination problems and reduced worker motivation increase long-run average costs. This means continuous growth does not guarantee lower costs. The optimal firm size varies by industry, and some markets are better served by many small firms than a few large ones."
      },
      {
        title: "Barriers to entry are not permanent",
        content: "Economies of scale create significant barriers, but technological change can disrupt established cost advantages. Digital platforms, for example, have dramatically reduced minimum efficient scale in many industries, enabling start-ups to compete with incumbents. Creative destruction means that barriers which seem insurmountable can be bypassed by innovation rather than overcome by scale."
      }
    ]
  },

  // ───────────────────────────────────────────────────────────────
  // 15. MARKET STRUCTURES & CONTESTABILITY
  // Theme: Competition → Efficiency → Interdependence → Contestability
  // ───────────────────────────────────────────────────────────────
  'market-structures-contestability': {
    chains: [
      {
        title: "Perfect competition drives allocative efficiency",
        steps: [
          "In perfect competition, many firms sell homogeneous products with perfect information and no barriers to entry or exit.",
          "Individual firms are price takers — they face a perfectly elastic demand curve and cannot influence market price.",
          "In long-run equilibrium, firms produce where P = MC (allocative efficiency) and at the minimum point of the AC curve (productive efficiency).",
          "Consumers benefit from the lowest possible prices, and resources are allocated to their most valued uses, maximising total economic welfare."
        ],
        result: "Perfect competition achieves both allocative and productive efficiency in long-run equilibrium, maximising consumer welfare and resource allocation."
      },
      {
        title: "Monopoly can enable dynamic efficiency through supernormal profits",
        steps: [
          "A monopolist faces the entire market demand curve and can set price above marginal cost, earning persistent supernormal profits due to high barriers to entry.",
          "Supernormal profits provide the funds and incentive for research and development — Schumpeter argued monopoly is the engine of innovation.",
          "Innovation leads to dynamic efficiency — new products, processes and technologies that shift cost curves downward and expand consumer choice over time.",
          "If dynamic efficiency gains are large enough, they can outweigh the static welfare losses (deadweight loss) caused by monopoly pricing, resulting in net social benefit."
        ],
        result: "Monopoly creates static inefficiency but may promote dynamic efficiency through innovation funded by supernormal profits — the net effect is an empirical question."
      },
      {
        title: "Game theory explains interdependence in oligopoly",
        steps: [
          "Oligopolistic markets are characterised by a few dominant firms with high market concentration, creating strategic interdependence — each firm's decisions affect its rivals.",
          "Game theory models this interdependence: in a prisoner's dilemma, each firm has an incentive to undercut rivals' prices, but if all do so, profits fall for everyone.",
          "This creates a tendency towards collusion (tacit or explicit) to maintain high prices and joint profit maximisation, acting as a cartel.",
          "However, collusion is unstable because each firm has an incentive to cheat on the agreement to gain market share, and competition authorities actively prosecute cartels."
        ],
        result: "Oligopolistic behaviour is characterised by strategic interdependence, with tension between the incentive to collude for joint profits and the temptation to cheat for individual gain."
      },
      {
        title: "Contestability disciplines monopoly pricing",
        steps: [
          "A contestable market has low barriers to entry and exit — including low sunk costs — so potential entrants can easily enter if incumbent firms earn supernormal profits.",
          "The threat of hit-and-run entry forces incumbent firms to keep prices close to average cost, even if they hold a dominant market position.",
          "In a perfectly contestable market, even a monopolist would earn only normal profit, as any supernormal profit would immediately attract entry.",
          "Contestability theory suggests that market structure alone does not determine outcomes — the degree of potential competition matters as much as actual competition."
        ],
        result: "Contestability shows that the threat of entry can discipline incumbent firms, meaning market performance depends on barriers to entry, not just the number of existing firms."
      }
    ],
    evaluation: [
      {
        title: "Perfect competition is a theoretical benchmark, not a realistic market",
        content: "No real-world market perfectly satisfies all conditions of perfect competition — homogeneous products, perfect information and zero barriers to entry are unrealistic. However, the model remains valuable as a benchmark for evaluating the efficiency of real markets. Markets that approximate these conditions, such as agricultural commodity markets, tend to produce outcomes closer to the competitive ideal."
      },
      {
        title: "Monopoly and innovation: the evidence is mixed",
        content: "Schumpeter's argument that monopoly drives innovation is not universally supported. Many breakthrough innovations come from small, competitive firms and start-ups rather than established monopolists. Monopolists may become complacent and use profits for rent-seeking rather than R&D. The relationship between market structure and innovation is complex and depends on industry characteristics, regulatory environment and competitive dynamics."
      },
      {
        title: "Contestability is limited by sunk costs in practice",
        content: "In most industries, entry requires significant sunk costs — investment in brand building, specialised equipment or regulatory compliance that cannot be recovered on exit. These sunk costs undermine contestability by making hit-and-run entry unprofitable. However, digital markets and platform economies have reduced sunk costs in some sectors, increasing contestability and challenging traditional monopolies."
      },
      {
        title: "Collusion is difficult to detect and prove",
        content: "While competition authorities prohibit explicit collusion, tacit collusion through price leadership or parallel pricing is harder to identify and prosecute. Oligopolists may achieve collusive outcomes without direct communication, making enforcement challenging. The effectiveness of competition policy depends on the resources and legal powers of regulatory bodies, which vary significantly across countries."
      }
    ]
  },

  // ───────────────────────────────────────────────────────────────
  // 16. LABOUR MARKETS
  // Theme: Derived demand → Wage determination → Monopsony → Immobility
  // ───────────────────────────────────────────────────────────────
  'labour-markets': {
    chains: [
      {
        title: "Derived demand links product and labour markets",
        steps: [
          "The demand for labour is derived from the demand for the goods and services that labour produces — firms hire workers to meet consumer demand.",
          "When demand for a product increases, firms need more workers to increase output, shifting the demand curve for labour rightward and putting upward pressure on wages.",
          "Conversely, a fall in product demand reduces the need for workers, shifting labour demand leftward and leading to lower wages or unemployment.",
          "This link means that labour market outcomes — wages, employment levels and job creation — are fundamentally determined by conditions in product markets."
        ],
        result: "The derived nature of labour demand means that product market conditions directly determine employment and wage outcomes in labour markets."
      },
      {
        title: "MRP theory determines profit-maximising employment",
        steps: [
          "A profit-maximising firm hires workers up to the point where the marginal revenue product of labour (MRP) equals the marginal cost of labour (MCL) — i.e., MRPL = MCL.",
          "The MRP is calculated as marginal physical product (MPP) multiplied by marginal revenue (MR) — it represents the additional revenue generated by hiring one more worker.",
          "If MRPL > MCL, hiring an extra worker adds more to revenue than to cost, so the firm should expand employment to increase profit.",
          "The MRP curve is the firm's demand curve for labour — it slopes downward due to diminishing marginal returns, showing that each additional worker adds less to output and revenue."
        ],
        result: "MRP theory shows that profit-maximising firms hire where the value of a worker's output equals the cost of employing them, with the MRP curve acting as the labour demand curve."
      },
      {
        title: "Monopsony power leads to exploitation of workers",
        steps: [
          "A monopsony is a labour market with a single or dominant employer, giving the firm wage-setting power — it faces the entire upward-sloping labour supply curve.",
          "The monopsonist must raise wages to attract additional workers, but this higher wage must be paid to all existing workers, making the marginal cost of labour (MCL) exceed the wage rate.",
          "The monopsonist maximises profit by hiring where MRPL = MCL, but pays a wage read off the supply curve — which is below both the MRP and the MCL at the profit-maximising employment level.",
          "This results in workers being paid below their marginal revenue product — a form of exploitation — with lower employment and wages compared to a competitive labour market."
        ],
        result: "Monopsony power enables employers to pay wages below workers' MRP, resulting in both exploitation and a deadweight welfare loss from under-employment."
      },
      {
        title: "Immobility causes persistent wage differentials",
        steps: [
          "Occupational immobility arises when workers lack the skills, qualifications or training needed to move between different jobs or industries.",
          "Geographical immobility occurs when workers cannot easily relocate due to housing costs, family ties or regional differences in the cost of living.",
          "These immobilities prevent labour from moving from low-wage to high-wage markets, meaning wage differentials persist rather than being competed away.",
          "Persistent wage differentials lead to structural unemployment in declining sectors and labour shortages in growing ones, reducing overall economic efficiency."
        ],
        result: "Labour immobility prevents the equalisation of wages across markets, creating persistent differentials and structural unemployment that reduce economic welfare."
      }
    ],
    evaluation: [
      {
        title: "MRP theory has significant limitations in practice",
        content: "Measuring an individual worker's marginal revenue product is extremely difficult in complex production processes where output depends on teamwork. In the public sector and non-profit organisations, there is no market revenue to calculate MRP against. In practice, wages are often determined by collective bargaining, custom, minimum wage legislation and internal pay structures rather than individual productivity."
      },
      {
        title: "Monopsony can be addressed by minimum wages",
        content: "In a monopsony labour market, a minimum wage set between the monopsony wage and the competitive wage can simultaneously increase both wages and employment — a seemingly paradoxical result. This is because the minimum wage eliminates the need to raise all workers' pay when hiring, reducing the gap between MCL and the wage. This provides a strong theoretical justification for minimum wage legislation, though setting the optimal level requires accurate information about market conditions."
      },
      {
        title: "Trade unions can counterbalance monopsony power",
        content: "Trade unions can act as a monopoly seller of labour, counterbalancing employer monopsony power in a bilateral monopoly. The union can negotiate wages closer to the MRP, reducing exploitation. However, if union power exceeds employer power, wages may be pushed above the competitive equilibrium, causing unemployment. The net effect depends on the relative bargaining strength of each side and the elasticity of labour demand."
      }
    ]
  },

  // ───────────────────────────────────────────────────────────────
  // 17. GOVERNMENT INTERVENTION & FIRMS
  // Theme: Competition policy → Wage regulation → Ownership → Regulatory limits
  // ───────────────────────────────────────────────────────────────
  'government-intervention-firms': {
    chains: [
      {
        title: "Competition policy prevents monopoly exploitation",
        steps: [
          "Competition authorities (such as the CMA in the UK) investigate mergers, abuse of dominant market position and anti-competitive practices like cartels and predatory pricing.",
          "By blocking mergers that would substantially lessen competition, regulators prevent the creation of dominant firms with excessive market power.",
          "Fines and remedies for anti-competitive behaviour deter firms from colluding on prices, dividing markets or engaging in exclusionary practices.",
          "Effective competition policy protects consumer welfare by maintaining competitive markets that deliver lower prices, greater choice and stronger incentives for innovation."
        ],
        result: "Competition policy aims to preserve competitive market structures and prevent monopoly exploitation, protecting consumers from higher prices and reduced choice."
      },
      {
        title: "Minimum wage in monopsony can increase employment",
        steps: [
          "In a competitive labour market, a minimum wage above the equilibrium creates unemployment by raising the cost of labour above workers' MRP for some firms.",
          "However, in a monopsony labour market, the employer pays below the competitive wage — a minimum wage set at the competitive level can increase both wages and employment.",
          "This is because the minimum wage makes the supply of labour perfectly elastic up to the minimum rate, eliminating the monopsonist's incentive to restrict hiring to keep wages low.",
          "The result is higher wages and higher employment — the minimum wage corrects the market failure caused by monopsony power without creating unemployment."
        ],
        result: "The impact of minimum wages depends critically on market structure — harmful in competitive markets but potentially beneficial in monopsony markets."
      },
      {
        title: "Privatisation vs nationalisation involves efficiency trade-offs",
        steps: [
          "Privatisation transfers ownership from the public to the private sector, introducing the profit motive and market discipline that incentivise cost reduction and efficiency.",
          "Private firms face competitive pressure and the threat of takeover, which disciplines management and promotes productive efficiency.",
          "However, privatised natural monopolies may exploit their market power to raise prices and reduce quality if not effectively regulated.",
          "Nationalisation ensures public control over strategic industries and can prioritise social objectives (universal service, equity) over profit — but may suffer from X-inefficiency due to the absence of competitive pressure."
        ],
        result: "The choice between privatisation and nationalisation involves trading off productive efficiency gains against the risks of private monopoly exploitation and the loss of social objectives."
      },
      {
        title: "Regulatory capture limits effectiveness of intervention",
        steps: [
          "Government regulators are established to oversee industries and protect consumer interests, but they rely on information provided by the firms they regulate.",
          "Over time, regulators may develop close relationships with the industry, leading to regulatory capture — where the regulator acts in the industry's interest rather than the public interest.",
          "Captured regulators may set lenient price caps, approve anti-competitive mergers or fail to enforce standards, undermining the purpose of regulation.",
          "This weakens the effectiveness of government intervention and allows firms to maintain supernormal profits and inefficient practices at the expense of consumers."
        ],
        result: "Regulatory capture is a significant government failure that can turn regulation from a tool for consumer protection into a mechanism that protects incumbent firms from competition."
      }
    ],
    evaluation: [
      {
        title: "Competition policy faces trade-offs with dynamic efficiency",
        content: "Breaking up monopolies or blocking mergers may improve static efficiency but could reduce dynamic efficiency. Large firms with market power may have greater ability and incentive to invest in R&D, as argued by Schumpeter. Competition authorities must balance short-term consumer welfare against long-term innovation. This is particularly relevant in technology markets where network effects create natural monopolies that deliver significant consumer benefits."
      },
      {
        title: "Minimum wage effects depend on the level set",
        content: "The theoretical argument for minimum wages in monopsony markets assumes the rate is set at or near the competitive equilibrium. If set too high, even monopsony employers will reduce hiring. Empirical evidence, such as Card and Krueger's study, suggests modest minimum wage increases have little negative employment effect, but very large increases could cause significant job losses, particularly for low-skilled and young workers."
      },
      {
        title: "Privatisation outcomes depend on regulatory framework",
        content: "The success of privatisation depends heavily on whether effective regulation accompanies the transfer of ownership. The UK's privatisation of water and rail has been criticised for delivering high profits and executive pay while underinvesting in infrastructure. By contrast, telecommunications privatisation with strong regulation delivered significant innovation and price reductions. The key is not ownership per se but the competitive and regulatory environment in which firms operate."
      },
      {
        title: "Government intervention may create unintended consequences",
        content: "All forms of intervention risk unintended consequences — price controls create shortages, subsidies distort resource allocation, and regulation imposes compliance costs. These government failures must be weighed against the market failures that intervention seeks to correct. The case for intervention is strongest when market failures are severe, the intervention is well-designed and regulatory institutions are independent and well-resourced."
      }
    ]
  },

  // ───────────────────────────────────────────────────────────────
  // UNIT 4 — THE GLOBAL ECONOMY
  // ───────────────────────────────────────────────────────────────

  // ───────────────────────────────────────────────────────────────
  // 18. CAUSES & EFFECTS OF GLOBALISATION
  // Theme: Trade liberalisation → TNCs → Inequality → Technology
  // ───────────────────────────────────────────────────────────────
  'causes-effects-globalisation': {
    chains: [
      {
        title: "Trade liberalisation drives globalisation and growth",
        steps: [
          "Reductions in tariffs, quotas and other trade barriers — driven by WTO negotiations and bilateral trade agreements — have lowered the cost of international trade.",
          "Lower trade costs enable firms to access larger global markets, exploiting economies of scale and specialising according to comparative advantage.",
          "Increased trade boosts economic growth in participating countries through higher exports, greater foreign direct investment and technology transfer.",
          "Consumers benefit from lower prices, greater product variety and access to goods that cannot be produced domestically, increasing consumer welfare."
        ],
        result: "Trade liberalisation has been the primary driver of globalisation, generating growth and consumer welfare gains through specialisation and market expansion."
      },
      {
        title: "TNCs bring FDI but can exploit developing countries",
        steps: [
          "Transnational corporations (TNCs) invest in developing countries through foreign direct investment (FDI), establishing production facilities to exploit lower labour costs and access new markets.",
          "FDI brings benefits including job creation, technology transfer, management expertise and tax revenue that can fund public services and infrastructure.",
          "However, TNCs may exploit weak labour and environmental regulations in developing countries, paying low wages, creating poor working conditions and causing environmental degradation.",
          "Profits are often repatriated to the home country rather than reinvested locally, and transfer pricing strategies can reduce tax payments to host governments."
        ],
        result: "TNCs and FDI create a complex mix of benefits and costs for developing countries — the net impact depends on host country governance and bargaining power."
      },
      {
        title: "Globalisation increases inequality within countries",
        steps: [
          "Globalisation creates winners and losers — skilled workers and capital owners benefit from access to global markets, while low-skilled workers face competition from cheaper labour abroad.",
          "Offshoring and automation, both accelerated by globalisation, reduce demand for low-skilled manufacturing jobs in developed countries, depressing wages at the bottom of the distribution.",
          "At the same time, globalisation increases returns to capital, entrepreneurship and high skills, as these factors can exploit global markets — widening income inequality.",
          "Rising within-country inequality can erode social cohesion, fuel populist political movements and undermine support for further trade liberalisation."
        ],
        result: "Globalisation tends to increase inequality within countries by rewarding mobile factors (capital, skills) while displacing immobile low-skilled workers."
      },
      {
        title: "Technology reduces costs and accelerates integration",
        steps: [
          "Advances in information and communication technology (ICT) have dramatically reduced the costs of communication, coordination and information sharing across borders.",
          "Containerisation and improvements in transport infrastructure have lowered shipping costs, making it economical to fragment production across multiple countries in global supply chains.",
          "Digital platforms enable even small firms and individuals to participate in global trade, reducing the importance of physical proximity and traditional barriers to entry.",
          "These technological changes have made globalisation self-reinforcing — lower costs encourage more integration, which drives further innovation in logistics and communication."
        ],
        result: "Technological progress in communication and transport has been a fundamental enabler of globalisation, reducing costs and accelerating economic integration."
      }
    ],
    evaluation: [
      {
        title: "Globalisation's benefits are unevenly distributed",
        content: "While globalisation has raised aggregate global welfare and lifted millions out of absolute poverty, its benefits have been concentrated among skilled workers, capital owners and consumers in developed countries. The costs — job displacement, wage stagnation and environmental degradation — fall disproportionately on vulnerable groups. Effective redistribution policies are needed to ensure the gains from globalisation are shared more equitably."
      },
      {
        title: "Dependency on global supply chains creates vulnerability",
        content: "The COVID-19 pandemic exposed the fragility of globally integrated supply chains. Just-in-time production and geographic concentration of key inputs (semiconductors in East Asia, PPE in China) left countries vulnerable to disruption. This has prompted a reassessment of globalisation, with some governments pursuing reshoring and 'friend-shoring' strategies, accepting higher costs for greater supply chain resilience."
      },
      {
        title: "The race to the bottom may be overstated",
        content: "Critics argue that globalisation forces countries to compete by lowering labour, environmental and tax standards — a 'race to the bottom'. However, evidence suggests that FDI often flows to countries with stronger institutions and higher standards, as these provide greater certainty and productivity. Countries that attract FDI through deregulation may find it unsustainable as social and environmental costs mount."
      }
    ]
  },

  // ───────────────────────────────────────────────────────────────
  // 19. TRADE & THE GLOBAL ECONOMY
  // Theme: Comparative advantage → Protectionism → Trading blocs → Terms of trade
  // ───────────────────────────────────────────────────────────────
  'trade-global-economy': {
    chains: [
      {
        title: "Comparative advantage shows gains from trade",
        steps: [
          "The theory of comparative advantage states that countries should specialise in producing goods where they have the lowest opportunity cost, even if they lack an absolute advantage.",
          "By specialising according to comparative advantage and trading, both countries can consume beyond their production possibility frontiers — total world output increases.",
          "Specialisation leads to higher productivity, economies of scale and more efficient resource allocation, raising real GDP and living standards in trading nations.",
          "The gains from trade include lower prices for consumers, greater product variety, access to resources unavailable domestically and competitive pressure that drives innovation."
        ],
        result: "Comparative advantage demonstrates that free trade is mutually beneficial, enabling countries to consume beyond their domestic production capabilities."
      },
      {
        title: "Tariffs create deadweight loss and reduce welfare",
        steps: [
          "A tariff is a tax on imported goods that raises the domestic price above the world price, protecting domestic producers from foreign competition.",
          "The higher price reduces consumer surplus as consumers pay more and consume less, while domestic producers gain surplus by producing more at the higher price.",
          "The government gains tariff revenue on remaining imports, but the net welfare effect is negative — two deadweight loss triangles represent the production inefficiency and consumption loss.",
          "Tariffs also invite retaliation from trading partners, potentially triggering trade wars that reduce global trade volumes and harm all participating economies."
        ],
        result: "Tariffs create net welfare losses by raising prices above efficient levels, and risk escalating into destructive trade wars through retaliation."
      },
      {
        title: "Trading blocs create trade creation and diversion",
        steps: [
          "Trading blocs such as customs unions and free trade areas eliminate tariffs between member states, while maintaining common or individual external tariffs against non-members.",
          "Trade creation occurs when bloc membership shifts production from high-cost domestic producers to lower-cost member state producers, improving allocative efficiency.",
          "Trade diversion occurs when the common external tariff shifts imports from the lowest-cost world producer (outside the bloc) to a higher-cost member state producer.",
          "The net welfare effect depends on the balance between trade creation and trade diversion — blocs are beneficial if trade creation dominates, harmful if diversion dominates."
        ],
        result: "Trading blocs generate both trade creation (efficiency-improving) and trade diversion (efficiency-reducing), with the net effect depending on relative magnitudes."
      },
      {
        title: "Terms of trade affect real living standards",
        steps: [
          "The terms of trade measure the ratio of export prices to import prices (index of export prices / index of import prices × 100) — an improvement means export prices rise relative to import prices.",
          "An improvement in the terms of trade means a country can buy more imports for each unit of exports, increasing the purchasing power of its output and raising real living standards.",
          "However, a terms of trade improvement caused by rising export prices may reduce export competitiveness, leading to lower export volumes and potential current account deterioration.",
          "Developing countries dependent on primary commodities face volatile and deteriorating terms of trade as commodity prices fluctuate and manufactured goods prices rise over time (Prebisch-Singer hypothesis)."
        ],
        result: "Changes in the terms of trade directly affect real living standards, but improvements must be balanced against potential competitiveness effects and commodity dependency risks."
      }
    ],
    evaluation: [
      {
        title: "Comparative advantage has limitations as a guide to policy",
        content: "The theory assumes constant opportunity costs, perfect factor mobility within countries, zero transport costs and no externalities. In reality, dynamic comparative advantages can be created through industrial policy and investment in human capital. Countries that follow static comparative advantage may be locked into low-value primary production, while those that develop new industries through strategic intervention may achieve higher long-run growth."
      },
      {
        title: "Infant industry protection may be justified in some cases",
        content: "Developing countries may need temporary protection for nascent industries that cannot yet compete with established foreign rivals. Tariffs give domestic firms time to develop economies of scale, learning-by-doing and technological capabilities. However, infant industry protection is often captured by politically connected firms, and 'temporary' protection frequently becomes permanent, reducing long-run efficiency and consumer welfare."
      },
      {
        title: "Trading blocs may undermine global free trade",
        content: "While trading blocs promote free trade among members, they maintain barriers against non-members, creating a discriminatory trading system. The proliferation of overlapping bilateral and regional agreements creates a 'spaghetti bowl' of complex rules of origin and regulatory requirements. The WTO's multilateral approach to trade liberalisation may be undermined if countries pursue preferential arrangements rather than global negotiations."
      }
    ]
  },

  // ───────────────────────────────────────────────────────────────
  // 20. BALANCE OF PAYMENTS & EXCHANGE RATES
  // Theme: Current account → Depreciation → J-curve → Competitiveness
  // ───────────────────────────────────────────────────────────────
  'balance-payments-exchange-rates': {
    chains: [
      {
        title: "Current account deficits reflect structural weaknesses",
        steps: [
          "A current account deficit occurs when the value of imports of goods, services, primary income and secondary income exceeds exports — meaning the country spends more abroad than it earns.",
          "Persistent deficits may reflect structural problems such as low productivity, weak international competitiveness, over-reliance on imported energy or consumer goods, and deindustrialisation.",
          "A current account deficit must be financed by a surplus on the financial account — through foreign borrowing, inward FDI or the sale of domestic assets to foreign investors.",
          "Sustained reliance on financial inflows makes the economy vulnerable to sudden capital flight, currency crises and rising external debt, which can trigger severe economic disruption."
        ],
        result: "Persistent current account deficits can signal structural economic weaknesses and create vulnerability to financial instability if financed by unsustainable capital inflows."
      },
      {
        title: "Exchange rate depreciation and the J-curve effect",
        steps: [
          "A depreciation of the exchange rate makes exports cheaper in foreign currency and imports more expensive in domestic currency, which should improve the trade balance over time.",
          "In the short run, however, the trade balance initially worsens — import volumes are slow to adjust due to existing contracts, while the higher cost of imports raises the import bill immediately.",
          "Over time, the volume effects dominate as consumers switch from expensive imports to domestic substitutes, and foreign buyers increase purchases of now-cheaper exports.",
          "This pattern — initial deterioration followed by improvement — traces out a J-curve, with the trade balance eventually improving if the Marshall-Lerner condition is satisfied."
        ],
        result: "Exchange rate depreciation follows a J-curve pattern, with the trade balance worsening before improving as volumes adjust to the new relative prices."
      },
      {
        title: "Marshall-Lerner condition for devaluation to improve BoP",
        steps: [
          "The Marshall-Lerner condition states that a depreciation will improve the trade balance only if the sum of the price elasticities of demand for exports and imports exceeds one (PEDx + PEDm > 1).",
          "If demand for exports and imports is relatively elastic, the volume changes following depreciation will be large enough to outweigh the adverse price effect of more expensive imports.",
          "If demand is inelastic (PEDx + PEDm < 1), depreciation worsens the trade balance — export revenue rises only slightly while the import bill increases significantly.",
          "In the long run, demand tends to be more price elastic as consumers and firms have time to find alternatives, making depreciation more effective at improving the trade balance over time."
        ],
        result: "Depreciation only improves the trade balance if the Marshall-Lerner condition is met — the effectiveness depends on the price elasticity of demand for imports and exports."
      },
      {
        title: "International competitiveness drives export performance",
        steps: [
          "International competitiveness depends on both price factors (unit labour costs, exchange rate, relative inflation) and non-price factors (quality, design, reliability, after-sales service).",
          "Countries with lower unit labour costs relative to trading partners can offer goods at competitive prices, increasing export market share and improving the current account.",
          "Non-price competitiveness is increasingly important in global markets — countries like Germany and Japan maintain strong export performance despite relatively high labour costs through quality and innovation.",
          "Improving competitiveness requires long-term supply-side reforms — investment in education, infrastructure, R&D and institutions that support productivity growth."
        ],
        result: "Sustained export performance depends on both price and non-price competitiveness, which requires long-term investment in productivity-enhancing factors."
      }
    ],
    evaluation: [
      {
        title: "Current account deficits are not always problematic",
        content: "A current account deficit financed by productive FDI can reflect economic strength rather than weakness — it shows the country is an attractive destination for investment. Fast-growing developing economies often run deficits as they import capital goods to build productive capacity. The sustainability of a deficit depends on how the foreign borrowing is used — if invested productively, future export earnings can service the debt."
      },
      {
        title: "Exchange rate policy involves significant trade-offs",
        content: "A depreciation improves export competitiveness but raises import costs, contributing to cost-push inflation. For countries dependent on imported raw materials, energy or food, depreciation can significantly reduce real living standards. Fixed exchange rate regimes provide stability for trade and investment but remove the exchange rate as an adjustment mechanism, requiring alternative methods to correct imbalances."
      },
      {
        title: "Competitiveness is multidimensional and hard to measure",
        content: "Simple measures like the real effective exchange rate capture price competitiveness but miss non-price factors that often determine trade success. Global value chains complicate the picture further — a country's exports may contain a high proportion of imported components, so depreciation benefits are offset by higher input costs. Improving competitiveness requires a comprehensive strategy addressing productivity, skills, infrastructure and institutions simultaneously."
      }
    ]
  },

  // ───────────────────────────────────────────────────────────────
  // 21. POVERTY & INEQUALITY
  // Theme: Growth and poverty → Inequality effects → Measurement → Capitalism
  // ───────────────────────────────────────────────────────────────
  'poverty-inequality': {
    chains: [
      {
        title: "Economic growth can reduce absolute poverty",
        steps: [
          "Economic growth increases a country's total output and real national income, expanding the resources available to raise living standards.",
          "Growth creates employment opportunities and raises wages, enabling households to earn income above the poverty line and afford basic necessities.",
          "Higher government tax revenue from growth can fund public services — healthcare, education and social protection — that directly reduce poverty and improve capabilities.",
          "However, the extent to which growth reduces poverty depends on its distribution — growth concentrated in capital-intensive sectors or urban areas may bypass the rural poor entirely."
        ],
        result: "Economic growth is necessary but not sufficient for poverty reduction — its impact depends critically on whether growth is inclusive and broadly shared."
      },
      {
        title: "Inequality affects incentives and social cohesion",
        steps: [
          "Some inequality provides incentives for entrepreneurship, risk-taking and hard work — differential rewards motivate productive effort and innovation.",
          "However, excessive inequality can reduce social mobility as the wealthy use their resources to secure advantages for their children, while the poor lack access to education and opportunities.",
          "High inequality undermines social cohesion and trust, leading to higher crime rates, worse health outcomes and lower life expectancy — as documented by Wilkinson and Pickett.",
          "Extreme inequality can also reduce aggregate demand if the wealthy have a lower marginal propensity to consume, potentially slowing economic growth and increasing macroeconomic instability."
        ],
        result: "Moderate inequality may support growth through incentive effects, but excessive inequality undermines social cohesion, mobility and aggregate demand."
      },
      {
        title: "Gini coefficient measures inequality but has limitations",
        steps: [
          "The Gini coefficient measures income or wealth inequality on a scale from 0 (perfect equality) to 1 (perfect inequality), derived from the Lorenz curve's deviation from the line of equality.",
          "It provides a single, comparable statistic that enables cross-country comparisons and tracking changes in inequality over time within a country.",
          "However, the Gini coefficient can give the same value for very different distributions — a country with a large middle class and small extremes can have the same Gini as one with extremes and no middle.",
          "The Gini also does not capture the causes of inequality, distinguish between income and wealth inequality, or reflect absolute living standards — a country could become more equal through everyone becoming poorer."
        ],
        result: "The Gini coefficient is a useful summary measure of inequality but must be supplemented with other indicators to provide a complete picture of distributional outcomes."
      },
      {
        title: "Free market capitalism generates both growth and inequality",
        steps: [
          "Free market capitalism allocates resources through the price mechanism, rewarding productive activity with profits and wages — this drives innovation, efficiency and economic growth.",
          "However, the rewards of capitalism are distributed according to factor ownership — those with capital, land and high skills earn disproportionately more, generating income and wealth inequality.",
          "Market outcomes reflect initial endowments rather than need or merit — inherited wealth, access to education and social connections create unequal starting points that compound over time.",
          "Without government redistribution through progressive taxation and transfer payments, free market outcomes tend towards increasing concentration of wealth and widening inequality."
        ],
        result: "Free market capitalism is a powerful engine of growth but inherently generates inequality that requires government intervention to ensure socially acceptable distributional outcomes."
      }
    ],
    evaluation: [
      {
        title: "The relationship between growth and poverty is conditional",
        content: "The 'trickle-down' theory — that growth automatically benefits the poor — has been challenged by evidence showing that growth can coexist with rising poverty if gains are captured by elites. Pro-poor growth strategies that invest in rural development, small-scale agriculture, education and health tend to be more effective at reducing poverty. The quality and inclusiveness of growth matters more than its rate."
      },
      {
        title: "Redistribution involves efficiency-equity trade-offs",
        content: "Progressive taxation and welfare transfers reduce inequality but may weaken incentive effects — high marginal tax rates can discourage work effort, savings and investment. This trade-off is central to the debate about optimal tax policy. However, well-designed redistribution through investment in education, healthcare and infrastructure can enhance both equity and efficiency by improving human capital and productive potential."
      },
      {
        title: "Poverty measurement itself is contested",
        content: "Absolute poverty measures ($2.15/day PPP) capture extreme deprivation but miss the multidimensional nature of poverty — including access to education, health, clean water and political freedom. Relative poverty measures (below 60% of median income) better capture social exclusion in developed countries but shift with the income distribution. The Multidimensional Poverty Index (MPI) provides a more comprehensive but complex measure of deprivation."
      },
      {
        title: "Globalisation's impact on poverty and inequality is nuanced",
        content: "Globalisation has contributed to unprecedented reductions in absolute poverty globally, particularly in China and East Asia. However, it has also widened inequality within many countries. The net effect depends on a country's institutions, labour market flexibility, education system and social safety net. Countries that invest in skills and social protection tend to share the gains from globalisation more equitably."
      }
    ]
  },

  // ───────────────────────────────────────────────────────────────
  // 22. ROLE OF THE STATE IN THE MACROECONOMY
  // Theme: Taxation → Fiscal balance → Redistribution → TNC regulation
  // ───────────────────────────────────────────────────────────────
  'role-state-macroeconomy': {
    chains: [
      {
        title: "Laffer curve suggests optimal tax rate exists",
        steps: [
          "The Laffer curve illustrates the theoretical relationship between tax rates and tax revenue — starting at zero revenue at 0% and 100% tax rates, with a revenue-maximising rate somewhere in between.",
          "At low tax rates, increasing rates raises revenue because the tax base remains largely unaffected — people continue working and investing with relatively minor behavioural changes.",
          "Beyond the revenue-maximising rate, further increases reduce revenue as high rates discourage work, encourage tax avoidance and evasion, and drive economic activity underground or abroad.",
          "The implication is that cutting very high tax rates could simultaneously increase revenue and improve economic efficiency — though the revenue-maximising rate is unknown and context-dependent."
        ],
        result: "The Laffer curve demonstrates that there is a theoretically optimal tax rate that maximises revenue, and exceeding it is counterproductive for both growth and government finances."
      },
      {
        title: "Fiscal deficits can crowd out private investment",
        steps: [
          "When the government runs a budget deficit (G > T), it must borrow by selling bonds, increasing demand for loanable funds in financial markets.",
          "Higher demand for loanable funds pushes up interest rates, increasing the cost of borrowing for private firms and households.",
          "Higher interest rates discourage private investment and consumption, partially or fully offsetting the expansionary effect of the fiscal stimulus.",
          "This crowding out effect means that fiscal expansion may be less effective than the multiplier analysis suggests, particularly when the economy is near full capacity."
        ],
        result: "Crowding out reduces the effectiveness of fiscal expansion by raising interest rates and displacing private sector spending, weakening the multiplier effect."
      },
      {
        title: "Progressive taxation reduces inequality but may reduce incentives",
        steps: [
          "Progressive taxation applies higher marginal tax rates to higher income bands, meaning the proportion of income paid in tax rises with income.",
          "This redistributes income from higher earners to fund public services and transfer payments that benefit lower-income households, directly reducing post-tax income inequality.",
          "However, high marginal tax rates may reduce the incentive to work additional hours, take risks through entrepreneurship or invest, potentially reducing aggregate supply and long-run growth.",
          "The net impact depends on the responsiveness of labour supply and investment to tax rates — if behaviour is relatively unresponsive, progressive taxation achieves redistribution with limited efficiency costs."
        ],
        result: "Progressive taxation is an effective tool for reducing inequality, but its impact on work incentives and growth depends on the elasticity of response to tax rate changes."
      },
      {
        title: "Controlling TNCs is difficult due to international mobility",
        steps: [
          "Transnational corporations can shift profits, production and headquarters across borders to minimise their tax burden, exploiting differences in national tax systems.",
          "Transfer pricing — setting artificial prices on intra-firm transactions — allows TNCs to shift profits from high-tax to low-tax jurisdictions, reducing their effective tax rate.",
          "Tax competition between countries creates a 'race to the bottom' as governments lower corporate tax rates to attract TNC investment, eroding the tax base.",
          "Individual governments have limited power to regulate TNCs operating across multiple jurisdictions, making international coordination through bodies like the OECD essential but difficult to achieve."
        ],
        result: "The international mobility of TNCs undermines national governments' ability to tax and regulate them, requiring coordinated international action that is politically challenging."
      }
    ],
    evaluation: [
      {
        title: "The Laffer curve is theoretically appealing but practically limited",
        content: "The revenue-maximising tax rate is unknown and varies by country, tax type and time period. Claims that a country is on the 'wrong side' of the Laffer curve are often politically motivated rather than evidence-based. Most empirical estimates suggest developed countries' income tax rates are below the revenue-maximising point, meaning increases would still raise revenue. The Laffer curve is a useful conceptual tool but should not be used to justify specific tax cuts without strong empirical support."
      },
      {
        title: "Crowding out depends on economic conditions",
        content: "Crowding out is most significant when the economy is at or near full employment and financial markets are functioning normally. In a recession with spare capacity and low interest rates, fiscal expansion is less likely to crowd out private investment — this is the Keynesian case for counter-cyclical fiscal policy. Quantitative easing by central banks can also mitigate crowding out by keeping interest rates low during periods of fiscal expansion."
      },
      {
        title: "International tax cooperation has made progress but faces limits",
        content: "The OECD/G20 Base Erosion and Profit Shifting (BEPS) framework and the global minimum corporate tax rate (Pillar Two) represent significant steps towards coordinated action against TNC tax avoidance. However, implementation varies across countries, and tax havens continue to offer preferential regimes. Small countries that rely on low tax rates to attract investment resist harmonisation, and enforcement requires continuous adaptation to new avoidance strategies."
      }
    ]
  },

  // ───────────────────────────────────────────────────────────────
  // 23. GROWTH & DEVELOPMENT
  // Theme: Savings-investment → Structural change → Commodity dependency → Aid
  // ───────────────────────────────────────────────────────────────
  'growth-development': {
    chains: [
      {
        title: "Harrod-Domar model links savings to growth",
        steps: [
          "The Harrod-Domar model states that the rate of economic growth depends on the savings ratio (s) divided by the capital-output ratio (k): g = s/k.",
          "Higher domestic savings fund greater investment in physical capital — machinery, infrastructure and technology — which increases the productive capacity of the economy.",
          "If a developing country has a low savings ratio, it faces a 'savings gap' that constrains investment and growth, trapping the economy in a cycle of low income and low savings.",
          "The model suggests that foreign aid or FDI can fill the savings gap, providing the capital needed to break out of the cycle and achieve sustained economic growth."
        ],
        result: "The Harrod-Domar model identifies savings and capital accumulation as the key drivers of growth, implying that developing countries need external capital to overcome domestic savings constraints."
      },
      {
        title: "Lewis model explains structural transformation",
        steps: [
          "The Lewis dual-sector model divides the economy into a traditional agricultural sector with surplus labour and a modern industrial sector with higher productivity.",
          "Wages in the modern sector are set above subsistence, attracting surplus labour from the traditional sector — this transfer is possible without reducing agricultural output due to the labour surplus.",
          "Industrial sector profits are reinvested, expanding capacity and drawing more labour from agriculture — creating a virtuous cycle of capital accumulation and structural transformation.",
          "Development occurs as the share of the economy in the modern sector grows, raising average productivity, real wages and national income until surplus labour is fully absorbed."
        ],
        result: "The Lewis model explains development as a process of structural transformation driven by the transfer of surplus labour from low-productivity agriculture to high-productivity industry."
      },
      {
        title: "Primary product dependency constrains development",
        steps: [
          "Many developing countries rely on exports of primary commodities (agricultural products, minerals, fuels) which face volatile and often declining world prices.",
          "Price volatility makes export revenue unpredictable, complicating government budgeting, discouraging long-term investment and creating boom-bust economic cycles.",
          "The Prebisch-Singer hypothesis argues that the terms of trade for primary products decline relative to manufactured goods over time, meaning developing countries must export more to afford the same imports.",
          "Resource dependency can also cause 'Dutch disease' — commodity export revenues strengthen the exchange rate, making other exports uncompetitive and hindering industrial diversification."
        ],
        result: "Primary product dependency traps developing countries in a cycle of volatile revenue, deteriorating terms of trade and failed diversification, constraining sustainable development."
      },
      {
        title: "International institutions can help but with conditions",
        steps: [
          "International institutions such as the World Bank, IMF and regional development banks provide loans, grants and technical assistance to developing countries to fund infrastructure, education and institutional reform.",
          "IMF structural adjustment programmes (SAPs) require recipient countries to implement market-oriented reforms — trade liberalisation, privatisation, fiscal austerity and deregulation — as conditions for financial support.",
          "These conditions aim to improve economic efficiency and governance, but critics argue they impose a one-size-fits-all approach that ignores local circumstances and can worsen poverty in the short run.",
          "Aid effectiveness depends on good governance, institutional quality and policy ownership in recipient countries — without these, aid may be misallocated, fuel corruption or create dependency."
        ],
        result: "International institutions provide essential financial and technical support, but the conditions attached and the quality of governance in recipient countries determine whether aid translates into sustainable development."
      }
    ],
    evaluation: [
      {
        title: "The Harrod-Domar model oversimplifies the growth process",
        content: "The model assumes a fixed capital-output ratio and that savings automatically translate into productive investment, ignoring the role of institutions, governance, human capital and technology. In practice, many developing countries with high savings rates have not achieved sustained growth due to corruption, poor infrastructure and weak property rights. Modern growth theory emphasises total factor productivity and institutional quality rather than capital accumulation alone."
      },
      {
        title: "Structural transformation does not guarantee development",
        content: "The Lewis model assumes that the modern sector will absorb surplus labour and that industrial profits will be reinvested productively. In reality, urbanisation without industrialisation has left many developing countries with large informal sectors offering low wages and poor conditions. Premature deindustrialisation — where countries move to services before fully industrialising — further complicates the Lewis model's predictions."
      },
      {
        title: "Aid effectiveness is highly contested",
        content: "Supporters argue that aid fills financing gaps, builds infrastructure and provides essential services. Critics like Dambisa Moyo argue that aid creates dependency, undermines governance through corruption and reduces incentives for domestic resource mobilisation. The evidence suggests that aid is most effective when targeted at specific sectors (health, education), accompanied by good governance, and delivered through recipient-owned strategies rather than donor-imposed conditions."
      },
      {
        title: "Diversification is essential but difficult to achieve",
        content: "Escaping primary product dependency requires deliberate industrial policy — investment in education, infrastructure, technology and institutions that support diversification into manufacturing and services. However, this requires resources that commodity-dependent countries often lack, creating a chicken-and-egg problem. Successful diversifiers like South Korea and Botswana combined strong governance, strategic investment and selective openness to trade, but their experiences may not be easily replicable."
      }
    ]
  },

};
