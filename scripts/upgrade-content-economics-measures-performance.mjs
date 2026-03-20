/**
 * SECTION UPGRADE — Measures of Economic Performance (Economics 2.1)
 * ==================================================================
 * Edexcel IAL Economics Unit 2, spec point 2.1
 * Run with: node scripts/upgrade-content-economics-measures-performance.mjs
 */

import { supabase } from './_db.mjs';

/* ── 1. SETTINGS ──────────────────────────────────────────────────────────── */

const SECTION_SLUG = 'measures-economic-performance';
const SUBJECT_ID   = 'economics';

/* ── 2. CONTENT ───────────────────────────────────────────────────────────── */

const CONTENT = [

  /* ═══ Block 1: Gross Domestic Product (GDP) ═══ */
  {
    title: "Gross Domestic Product (GDP)",
    quizIndices: [0],
    sections: [
      {
        id: "gdp-definition",
        title: "What Is GDP?",
        keyIdea: "GDP measures the total value of all goods and services produced within a country's borders in a given time period, making it the headline indicator of economic size.",
        body: [
          {
            type: "paragraph",
            text: "**Gross Domestic Product (GDP)** is the total monetary value of all **final** goods and services produced within a country's borders in a given time period, usually a year or a quarter. It only counts final output to avoid **double counting** -- the value of steel used to make a car is already included in the car's price, so you do not count the steel separately."
          },
          {
            type: "flow",
            steps: ["Firms produce goods and services", "Only final output is counted", "Values are summed at market prices"],
            result: "GDP figure represents the economy's total output",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "GDP is \"domestic\" because it counts production that happens inside the country regardless of who owns the factors of production. A Japanese-owned car factory in the UK adds to UK GDP, not Japanese GDP. This distinguishes GDP from **GNI** (Gross National Income), which counts income earned by a country's citizens wherever they work."
          }
        ],
        realExample: {
          emoji: "🇬🇧",
          text: "**The UK's GDP** was approximately $3.1 trillion in 2023, making it the sixth-largest economy in the world. This figure includes output from foreign-owned firms such as Nissan's Sunderland plant, because the production happens on British soil. GNI would instead count income earned by British citizens abroad."
        },
        misconception: "Students write \"GDP measures a country's wealth.\" GDP measures the flow of output produced in a year, not the stock of accumulated wealth like property, savings and infrastructure. Instead write: GDP is a flow measure of annual output, whereas wealth is a stock of accumulated assets built up over time.",
        examMatters: "Examiners expect a precise definition that includes \"total value of final goods and services,\" \"within a country's borders,\" and \"in a given time period.\" Missing any element loses marks. Always clarify the difference between GDP and GNI if the question allows.",
        recall: {
          type: "reorder",
          prompt: "Put the GDP calculation logic in the right order:",
          correctOrder: ["Count all goods and services produced domestically", "Include only final output to avoid double counting", "Value output at market prices", "Sum to get total GDP for the time period"],
          shuffled: [2, 0, 3, 1]
        }
      },
      {
        id: "real-vs-nominal-gdp",
        title: "Real vs Nominal GDP",
        keyIdea: "Nominal GDP uses current prices and can rise just from inflation, while real GDP strips out price changes so you can see whether actual output has grown.",
        body: [
          {
            type: "paragraph",
            text: "**Nominal GDP** (also called money GDP) measures output valued at the prices of the current year. The problem is that if all prices double but output stays the same, nominal GDP doubles even though the economy has not grown. This makes nominal GDP a misleading measure of living standards."
          },
          {
            type: "flow",
            steps: ["Prices rise by 5%", "Output stays the same", "Nominal GDP rises by 5%"],
            result: "Nominal GDP overstates true growth",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "**Real GDP** solves this by valuing output at the prices of a **base year**, stripping out the effect of inflation. If nominal GDP grows by 7% but inflation is 3%, real GDP growth is approximately 4%. You should always use real GDP when comparing economic performance over time, because it shows the genuine change in the volume of output."
          }
        ],
        realExample: {
          emoji: "🇹🇷",
          text: "**Turkey's** nominal GDP grew by over 100% in local currency terms between 2020 and 2023. However, inflation averaged above 50% per year over that period, so real GDP growth was far more modest. This shows why economists insist on using real GDP to judge genuine economic expansion."
        },
        misconception: "Students say \"real GDP is the accurate one and nominal GDP is useless.\" Nominal GDP is useful for measuring the current money value of an economy and comparing across countries using exchange rates. Instead write: real GDP is better for tracking growth over time, while nominal GDP reflects the current monetary size of the economy.",
        examMatters: "If a data-response question gives GDP figures, always check whether they are real or nominal. If only nominal figures are given alongside inflation data, you should adjust for inflation to discuss real growth. Examiners reward candidates who identify this distinction unprompted.",
        recall: {
          type: "fillin",
          prompt: "Complete the real vs nominal GDP chain:",
          template: ["Nominal GDP values output at ___ prices", "→ It can rise purely because of ___", "→ Real GDP uses a ___ year's prices to strip out inflation"],
          answers: ["current", "inflation", "base"],
          hints: ["cu_____", "in_______", "ba__"]
        }
      },
      {
        id: "gdp-per-capita",
        title: "GDP Per Capita",
        keyIdea: "Dividing GDP by the population gives GDP per capita, which is a better indicator of average living standards than total GDP alone.",
        body: [
          {
            type: "paragraph",
            text: "**GDP per capita** is calculated by dividing total GDP by the population: GDP per capita = GDP / Population. A country can have a very large total GDP but a low GDP per capita if its population is huge. China's total GDP is the second largest in the world, but its GDP per capita is far below that of smaller economies like Norway or Switzerland."
          },
          {
            type: "flow",
            steps: ["Total GDP rises by 3%", "Population rises by 4%"],
            result: "GDP per capita actually falls -- people are worse off on average",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "GDP per capita gives you a rough proxy for average living standards, but it hides **income inequality**. If GDP per capita rises because the richest 1% earn dramatically more while everyone else stagnates, the average figure improves but most people are no better off. You should always consider the distribution of income alongside GDP per capita."
          }
        ],
        realExample: {
          emoji: "🇮🇳",
          text: "**India** has the fifth-largest total GDP in the world at over $3.7 trillion, yet its GDP per capita is only about $2,500, ranking it well below the global average. This gap between total and per-capita GDP reflects a population of 1.4 billion people. It illustrates why total GDP alone is a poor measure of individual prosperity."
        },
        misconception: "Students assume \"rising GDP per capita means everyone is better off.\" GDP per capita is an average that hides inequality -- the gains could flow entirely to high earners while median income stagnates. Instead write: GDP per capita shows average output per person but tells you nothing about how that output is distributed across the population.",
        examMatters: "Examiners often present GDP and population data and expect you to calculate and interpret GDP per capita. Always show your working and then evaluate the figure by noting limitations such as inequality, purchasing power differences, and the exclusion of non-market activity.",
        recall: {
          type: "reorder",
          prompt: "Put the GDP per capita reasoning in order:",
          correctOrder: ["Calculate total real GDP", "Divide by population to get GDP per capita", "Compare across countries or over time", "Evaluate by considering inequality and distribution"],
          shuffled: [3, 1, 0, 2]
        }
      }
    ],
    takeaway: [
      "GDP measures total final output within a country's borders in a time period.",
      "Real GDP strips out inflation; nominal GDP uses current prices.",
      "GDP per capita divides by population but hides inequality.",
      "Always distinguish GDP (domestic) from GNI (national)."
    ]
  },

  /* ═══ Block 2: Three Methods of Measuring GDP ═══ */
  {
    title: "Three Methods of Measuring GDP",
    quizIndices: [1],
    sections: [
      {
        id: "output-method",
        title: "The Output (Production) Method",
        keyIdea: "The output method adds up the value added by every industry in the economy, avoiding double counting by only measuring each firm's contribution.",
        body: [
          {
            type: "paragraph",
            text: "The **output method** calculates GDP by summing the **value added** at each stage of production across every industry. Value added is the difference between a firm's revenue and the cost of its intermediate inputs. If a baker buys flour for $2 and sells bread for $5, the value added is $3."
          },
          {
            type: "flow",
            steps: ["Farmer grows wheat (value added $1)", "Miller makes flour (value added $1)", "Baker makes bread (value added $3)"],
            result: "Total value added = $5, which equals the final price",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "By using value added rather than total sales at each stage, you avoid **double counting**. If you simply added $1 + $2 + $5 (total sales at each stage), you would get $8 instead of the true $5. The output method is particularly useful for showing which sectors contribute most to the economy."
          }
        ],
        realExample: {
          emoji: "🏭",
          text: "**The UK's Office for National Statistics** uses the output method to show that services account for around 80% of British GDP, while manufacturing contributes roughly 10%. This breakdown would be impossible without the value-added approach, because raw sales figures would inflate the manufacturing share through double counting."
        },
        misconception: "Students add up total sales revenue at every stage of production and call it GDP. That double counts intermediate goods -- the flour's value is already included in the bread's price. Instead write: the output method uses value added at each stage, which equals revenue minus the cost of intermediate inputs, to avoid counting any output twice.",
        examMatters: "If the exam gives a production chain with values at each stage, you must calculate value added at each stage rather than summing total outputs. Show clearly that you subtract intermediate inputs. Examiners specifically test whether you can avoid double counting.",
        recall: {
          type: "fillin",
          prompt: "Complete the output method chain:",
          template: ["Value added = firm's revenue minus cost of ___ inputs", "→ Sum value added across all ___ in the economy", "→ This avoids ___ counting of intermediate goods"],
          answers: ["intermediate", "industries", "double"],
          hints: ["in___________", "in________", "do____"]
        }
      },
      {
        id: "income-method",
        title: "The Income Method",
        keyIdea: "The income method sums all factor incomes earned in production -- wages, profits, rent and interest -- because every pound of output generates a pound of income for someone.",
        body: [
          {
            type: "paragraph",
            text: "The **income method** adds up all the incomes earned by the factors of production in a given time period. When a good is produced and sold, the revenue becomes income for someone: **wages** for labour, **profits** for entrepreneurs, **rent** for land, and **interest** for capital. The total of these factor incomes should equal GDP."
          },
          {
            type: "flow",
            steps: ["Goods and services are produced", "Revenue flows to factor owners", "Wages + profits + rent + interest are summed"],
            result: "Total factor income = GDP",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "You only count incomes earned from **productive activity** -- not transfer payments like pensions or benefits, because these are redistributions of existing income, not rewards for producing output. The income method is useful for analysing how national income is distributed between wages and profits."
          }
        ],
        realExample: {
          emoji: "📊",
          text: "**The US Bureau of Economic Analysis** uses the income method to show that employee compensation accounts for roughly 53% of US GDP, while corporate profits make up about 12%. This data helps economists track whether the gains from growth are flowing to workers or to capital owners."
        },
        misconception: "Students include transfer payments like state pensions and unemployment benefits in the income method. Transfer payments are not payments for producing output -- they are redistributions. Instead write: the income method only counts factor incomes earned from productive activity, such as wages, profits, rent and interest.",
        examMatters: "Examiners test whether you can identify which incomes to include and exclude. Remember to exclude transfer payments and include only incomes earned from current production. If data is provided, separate factor incomes from non-factor incomes before calculating.",
        recall: {
          type: "reorder",
          prompt: "Put the four factor incomes in order of the factors they reward:",
          correctOrder: ["Wages reward labour", "Rent rewards land", "Interest rewards capital", "Profit rewards enterprise"],
          shuffled: [2, 0, 3, 1]
        }
      },
      {
        id: "expenditure-method",
        title: "The Expenditure Method",
        keyIdea: "The expenditure method adds up all spending on final goods and services: consumption, investment, government spending and net exports.",
        body: [
          {
            type: "paragraph",
            text: "The **expenditure method** calculates GDP by summing all spending on final output: **C** (household consumption) + **I** (investment by firms) + **G** (government spending on goods and services) + **(X - M)** (net exports, which is exports minus imports). This is the most commonly referenced formula: **GDP = C + I + G + (X - M)**."
          },
          {
            type: "flow",
            steps: ["Households consume (C)", "Firms invest (I)", "Government spends (G)", "Foreigners buy exports minus imports (X-M)"],
            result: "Total expenditure = GDP",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "Imports are subtracted because they represent spending on goods produced abroad, which does not count as domestic output. Only **final** expenditure is counted -- spending on intermediate goods is excluded to avoid double counting. The expenditure method directly links to the **aggregate demand** formula you will study later."
          }
        ],
        realExample: {
          emoji: "🇺🇸",
          text: "**In the United States**, consumption (C) accounts for roughly 68% of GDP, making it by far the largest component. Government spending (G) is about 17%, investment (I) around 18%, and net exports (X-M) are negative because the US imports more than it exports. This composition explains why consumer confidence is so closely watched."
        },
        misconception: "Students forget to subtract imports and write GDP = C + I + G + X. Imports must be subtracted because they represent spending that leaves the domestic economy. Instead write: GDP = C + I + G + (X - M), where imports are subtracted because they are goods produced in other countries, not domestic output.",
        examMatters: "The expenditure formula GDP = C + I + G + (X - M) appears repeatedly in Unit 2. Examiners expect you to know each component and explain why imports are subtracted. Be ready to calculate GDP from component data and to link each component to aggregate demand.",
        recall: {
          type: "fillin",
          prompt: "Complete the expenditure method formula:",
          template: ["GDP = C + I + G + (X - ___)", "→ C stands for household ___", "→ Imports are subtracted because they are produced ___"],
          answers: ["M", "consumption", "abroad"],
          hints: ["_", "co_________", "ab____"]
        }
      }
    ],
    takeaway: [
      "Output method sums value added; income method sums factor incomes.",
      "Expenditure method: GDP = C + I + G + (X - M).",
      "All three methods should give the same GDP figure in theory.",
      "Exclude transfer payments (income) and intermediate goods (output)."
    ]
  },

  /* ═══ Block 3: Uses and Limitations of GDP Data ═══ */
  {
    title: "Uses and Limitations of GDP Data",
    quizIndices: [2],
    sections: [
      {
        id: "uses-of-gdp-data",
        title: "Uses of GDP Data",
        keyIdea: "GDP data lets governments track growth, compare economies, set policy targets and measure progress -- but only if you understand what it does and does not capture.",
        body: [
          {
            type: "paragraph",
            text: "Governments use GDP data to measure **economic growth**, defined as an increase in real GDP over time. Positive growth usually signals rising employment, higher tax revenues and improving living standards. Negative growth for two consecutive quarters is the technical definition of a **recession**."
          },
          {
            type: "paragraph",
            text: "GDP also allows **international comparisons**. To compare countries fairly, economists convert GDP into a common currency (usually US dollars) and adjust for differences in price levels using **Purchasing Power Parity (PPP)**. Without PPP adjustment, you understate the real output of countries where prices are low."
          },
          {
            type: "flow",
            steps: ["Convert GDP to common currency", "Adjust for price differences using PPP", "Compare real GDP per capita"],
            result: "Fair cross-country comparison of living standards",
            resultType: "good"
          }
        ],
        realExample: {
          emoji: "🌍",
          text: "**China's** GDP measured at market exchange rates is about $18 trillion, but adjusted for PPP it exceeds $30 trillion because domestic prices in China are much lower than in the US. The PPP figure better reflects China's actual purchasing power. This is why the IMF publishes both measures."
        },
        misconception: "Students state \"GDP is the best measure of living standards.\" GDP only measures market output and ignores inequality, leisure, environmental quality and non-market activity. Instead write: GDP is a useful starting point for comparing living standards, but it must be supplemented with other indicators to give a complete picture.",
        examMatters: "When evaluating GDP as a measure of living standards, examiners want you to state its uses first and then systematically discuss limitations. Structuring your answer as \"useful because... but limited because...\" with specific examples earns high evaluation marks.",
        recall: {
          type: "reorder",
          prompt: "Put the international comparison steps in order:",
          correctOrder: ["Measure each country's GDP in local currency", "Convert to a common currency (e.g. US dollars)", "Adjust for price differences using PPP", "Compare real GDP per capita across countries"],
          shuffled: [2, 0, 3, 1]
        }
      },
      {
        id: "limitations-of-gdp",
        title: "Limitations of GDP",
        keyIdea: "GDP ignores the informal economy, environmental damage, income distribution and non-market activity, so it can paint a misleading picture of wellbeing.",
        body: [
          {
            type: "paragraph",
            text: "GDP misses the **informal economy** (cash-in-hand work, subsistence farming) and **non-market activity** (unpaid housework, volunteering). In developing countries, the informal sector can be 30-60% of true economic activity, meaning GDP figures significantly understate actual output."
          },
          {
            type: "bullets",
            items: [
              "**Income distribution** -- GDP per capita hides inequality between rich and poor.",
              "**Environmental costs** -- GDP rises when forests are cleared, ignoring ecological damage.",
              "**Quality of life** -- GDP does not measure leisure time, health or personal freedom.",
              "**Composition of output** -- GDP counts weapons and cigarettes the same as education and healthcare."
            ]
          },
          {
            type: "paragraph",
            text: "These limitations mean GDP should never be used as the sole indicator of a nation's wellbeing. Economists supplement GDP with alternative measures like the **Human Development Index (HDI)**, which combines GDP per capita with life expectancy and education indicators."
          }
        ],
        realExample: {
          emoji: "🇧🇹",
          text: "**Bhutan** pioneered Gross National Happiness as an alternative to GDP, arguing that environmental conservation, cultural preservation and good governance matter as much as output. Bhutan's GDP per capita is low, but its citizens report high life satisfaction. This challenges the assumption that GDP growth equals progress."
        },
        misconception: "Students write \"GDP is useless because it ignores so many things.\" Despite its flaws, GDP remains the most widely used and comparable measure of economic output across countries and over time. Instead write: GDP is imperfect but valuable as a standardised measure of output; its limitations mean it should be used alongside other indicators rather than replaced entirely.",
        examMatters: "A common 8-mark question asks you to evaluate GDP as a measure of living standards. Structure your answer by acknowledging its value, then presenting at least three specific limitations with examples. Conclude by suggesting supplementary measures like HDI for a balanced evaluation.",
        recall: {
          type: "fillin",
          prompt: "Complete the GDP limitations chain:",
          template: ["GDP misses the ___ economy (cash-in-hand, subsistence farming)", "→ It ignores ___ costs like pollution and deforestation", "→ The HDI supplements GDP with life expectancy and ___"],
          answers: ["informal", "environmental", "education"],
          hints: ["in______", "en____________", "ed_______"]
        }
      },
      {
        id: "human-development-index",
        title: "The Human Development Index (HDI)",
        keyIdea: "The HDI combines GDP per capita with health and education data, giving a broader picture of development than income alone can provide.",
        body: [
          {
            type: "paragraph",
            text: "The **Human Development Index (HDI)** was created by the United Nations to measure development using three dimensions: **income** (GNI per capita at PPP), **health** (life expectancy at birth), and **education** (mean years of schooling and expected years of schooling). Each dimension is scored from 0 to 1, and the HDI is the geometric mean of the three scores."
          },
          {
            type: "flow",
            steps: ["Measure GNI per capita (income)", "Measure life expectancy (health)", "Measure years of schooling (education)"],
            result: "HDI score between 0 and 1 captures broader development",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "The HDI reveals cases where high income does not translate into high development. Some oil-rich nations have very high GDP per capita but lower HDI scores because education and healthcare lag behind. Conversely, countries like Cuba and Sri Lanka score relatively well on HDI despite modest incomes because they invest heavily in health and education."
          }
        ],
        realExample: {
          emoji: "🇳🇴",
          text: "**Norway** consistently tops the HDI rankings with a score above 0.96, reflecting high GNI per capita, a life expectancy of 83 years, and an average of 13 years of schooling. By contrast, Qatar has higher GDP per capita than Norway but a lower HDI score. This shows that income alone does not capture development."
        },
        misconception: "Students treat HDI as a perfect measure. HDI still uses averages that hide inequality, and it only captures three dimensions -- it ignores political freedom, environmental sustainability and personal safety. Instead write: HDI is broader than GDP but still limited; it uses averages that mask inequality and excludes dimensions like freedom and environmental quality.",
        examMatters: "Examiners love comparing GDP and HDI. State what HDI adds (health, education) and then evaluate it by noting what it still misses (inequality, environment, freedom). Naming the three HDI components precisely is essential for full marks on definition questions.",
        recall: {
          type: "reorder",
          prompt: "Put the HDI components in order:",
          correctOrder: ["Measure GNI per capita at PPP (income)", "Measure life expectancy at birth (health)", "Measure mean and expected years of schooling (education)", "Calculate geometric mean for HDI score (0 to 1)"],
          shuffled: [3, 1, 0, 2]
        }
      }
    ],
    takeaway: [
      "GDP tracks growth and enables cross-country comparisons via PPP.",
      "GDP misses the informal economy, inequality and environmental damage.",
      "HDI adds health and education but still hides inequality.",
      "Always evaluate GDP alongside alternative indicators in essays."
    ]
  },

  /* ═══ Block 4: Consumer Price Index (CPI) and Inflation ═══ */
  {
    title: "Consumer Price Index (CPI) and Inflation",
    quizIndices: [3],
    sections: [
      {
        id: "cpi-construction",
        title: "How the CPI Is Constructed",
        keyIdea: "The CPI tracks the cost of a weighted basket of goods and services that a typical household buys, giving each item a weight based on its share of spending.",
        body: [
          {
            type: "paragraph",
            text: "The **Consumer Price Index (CPI)** measures changes in the average price level faced by consumers. Statisticians construct a **basket of goods and services** representing what a typical household buys -- food, housing, transport, clothing and so on. Each item is given a **weight** reflecting its share of total household spending."
          },
          {
            type: "flow",
            steps: ["Survey households to find spending patterns", "Assign weights to each category", "Track prices monthly", "Calculate the weighted average price change"],
            result: "CPI index number shows how much prices have changed",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "The basket is updated annually to reflect changing spending habits. For example, streaming services were added to the UK basket in recent years as DVD rentals were removed. A base year is set at 100, and subsequent CPI values show the percentage change in prices relative to that base."
          }
        ],
        realExample: {
          emoji: "🛒",
          text: "**The UK's ONS** added oat milk and electric vehicle charging to the CPI basket in 2024, while removing coal. These changes reflect evolving consumer behaviour -- households spend more on plant-based alternatives and less on solid fuels. This annual update keeps the CPI relevant."
        },
        misconception: "Students think the CPI measures the price of everything in the economy. The CPI only tracks a representative basket of consumer goods and services, weighted by spending patterns. Instead write: the CPI measures changes in the cost of a specific weighted basket, not the price of every good in the economy.",
        examMatters: "Examiners frequently ask how the CPI is constructed. You must mention the basket, the weights based on spending shares, the monthly price collection and the base year. Simply saying \"it measures inflation\" without explaining the process earns very few marks.",
        recall: {
          type: "fillin",
          prompt: "Complete the CPI construction process:",
          template: ["A ___ of goods represents typical household spending", "→ Each item is given a ___ based on its spending share", "→ A base year is set at ___ and subsequent values show price changes"],
          answers: ["basket", "weight", "100"],
          hints: ["ba____", "we____", "1__"]
        }
      },
      {
        id: "rpi-vs-cpi",
        title: "RPI vs CPI",
        keyIdea: "The RPI includes mortgage interest payments and uses a different averaging method, which is why it usually gives a higher inflation figure than the CPI.",
        body: [
          {
            type: "paragraph",
            text: "The UK uses two main price indices. The **CPI** is the official measure used by the Bank of England for its 2% inflation target. The **Retail Price Index (RPI)** is an older measure that includes **mortgage interest payments** and **council tax**, which the CPI excludes."
          },
          {
            type: "paragraph",
            text: "The RPI also uses a different mathematical formula (the arithmetic mean) compared to the CPI's geometric mean. This **formula effect** means the RPI tends to produce a higher inflation figure than the CPI, typically by 0.5 to 1 percentage point. The government has announced that the RPI will be reformed to align with the CPI in 2030."
          },
          {
            type: "bullets",
            items: [
              "**CPI** -- excludes housing costs, uses geometric mean, official inflation target measure.",
              "**CPIH** -- CPI plus owner-occupier housing costs, now the ONS headline measure.",
              "**RPI** -- includes mortgage payments and council tax, uses arithmetic mean, tends to be higher."
            ]
          }
        ],
        realExample: {
          emoji: "🏠",
          text: "**UK rail companies** use the RPI to set annual fare increases, which is why commuters often face rises above the CPI inflation rate. In 2023, RPI was 1.2 percentage points higher than CPI, costing the average season-ticket holder an extra $80 per year. Calls to switch to CPI have been resisted by the Treasury."
        },
        misconception: "Students treat CPI and RPI as interchangeable. They use different baskets, different mathematical formulae and produce different results. Instead write: the CPI excludes housing costs and uses the geometric mean, while the RPI includes mortgage payments and uses the arithmetic mean, producing a systematically higher figure.",
        examMatters: "When discussing inflation measurement, examiners want you to explain why different indices give different figures. Mention the basket composition difference (housing costs) and the formula effect. Knowing that CPIH is now the ONS headline measure shows up-to-date knowledge.",
        recall: {
          type: "reorder",
          prompt: "Put the differences between CPI and RPI in logical order:",
          correctOrder: ["CPI excludes mortgage interest payments", "RPI includes mortgage interest and council tax", "CPI uses geometric mean; RPI uses arithmetic mean", "RPI typically gives a higher inflation figure than CPI"],
          shuffled: [3, 1, 0, 2]
        }
      },
      {
        id: "measuring-inflation",
        title: "Measuring Inflation",
        keyIdea: "Inflation is the sustained rise in the general price level over time, measured as the annual percentage change in the CPI from one year to the next.",
        body: [
          {
            type: "paragraph",
            text: "**Inflation** is a sustained increase in the **general price level** in an economy over a period of time. It is measured as the annual percentage change in the CPI. If the CPI was 110 last year and is 112.2 this year, inflation is (112.2 - 110) / 110 x 100 = **2%**."
          },
          {
            type: "paragraph",
            text: "You must distinguish between the **price level** and the **rate of inflation**. If inflation falls from 6% to 3%, prices are still rising -- just more slowly. This is called **disinflation**, not deflation. Prices only fall when inflation becomes **negative**, which is true deflation."
          },
          {
            type: "flow",
            steps: ["Inflation falls from 6% to 3%", "Prices are still rising, just more slowly"],
            result: "This is disinflation, not deflation",
            resultType: "neutral"
          }
        ],
        realExample: {
          emoji: "📉",
          text: "**The Bank of England** targets CPI inflation of 2% per year. In late 2022, UK CPI inflation peaked at 11.1%, the highest in 41 years, driven by energy and food prices. By early 2024, it had fallen to around 4% -- this was disinflation, not deflation, because prices were still rising."
        },
        misconception: "Students confuse disinflation with deflation and write \"inflation fell to -3%.\" A fall in the rate of inflation (e.g. from 5% to 2%) is disinflation -- prices still rise, just more slowly. Instead write: deflation only occurs when the inflation rate is negative, meaning the general price level is actually falling.",
        examMatters: "Examiners test the distinction between disinflation and deflation regularly. If a question says \"the rate of inflation fell,\" do not describe it as deflation unless the rate turned negative. Precise use of these terms is essential for demonstrating strong economic literacy.",
        recall: {
          type: "fillin",
          prompt: "Complete the inflation terminology chain:",
          template: ["Inflation is a sustained rise in the general ___ level", "→ A falling inflation rate (still positive) is called ___", "→ A negative inflation rate means prices are actually ___ -- this is deflation"],
          answers: ["price", "disinflation", "falling"],
          hints: ["pr___", "di___________", "fa_____"]
        }
      }
    ],
    takeaway: [
      "CPI tracks a weighted basket of goods; weights reflect spending shares.",
      "RPI includes housing costs and uses arithmetic mean, giving higher figures.",
      "Inflation = annual % change in CPI; disinflation is not deflation.",
      "The Bank of England targets CPI inflation of 2%."
    ]
  },

  /* ═══ Block 5: Inflation: Causes and Effects ═══ */
  {
    title: "Inflation: Causes and Effects",
    diagramRef: "Demand-Pull and Cost-Push Inflation",
    quizIndices: [4],
    practiceIndices: [0],
    sections: [
      {
        id: "demand-pull-inflation",
        title: "Demand-Pull Inflation",
        keyIdea: "When aggregate demand grows faster than the economy's capacity to produce, excess demand pulls prices upward -- too much money chasing too few goods.",
        body: [
          {
            type: "paragraph",
            text: "**Demand-pull inflation** occurs when **aggregate demand (AD)** increases faster than **aggregate supply (AS)** can respond. If the economy is near full capacity and AD shifts right, firms cannot easily expand output, so they raise prices instead. This is often summarised as \"too much money chasing too few goods.\""
          },
          {
            type: "flow",
            steps: ["AD increases (e.g. tax cuts boost spending)", "Economy is near full capacity", "Firms raise prices rather than output"],
            result: "General price level rises -- demand-pull inflation",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "Demand-pull inflation is most likely when the economy is in a **boom** phase with low unemployment and high consumer confidence. Causes include excessive government spending, consumer credit expansion, tax cuts, rising asset prices and a weakening currency that boosts export demand."
          }
        ],
        realExample: {
          emoji: "💰",
          text: "**The US government** distributed over $800 billion in stimulus cheques during 2020-2021 while supply chains were still disrupted. Household spending surged but firms could not meet demand, pushing US CPI inflation to 9.1% by June 2022. This was a textbook case of demand-pull inflation."
        },
        misconception: "Students write \"demand-pull inflation is caused by a rise in one good's price.\" Inflation is a rise in the general price level, not just one product becoming more expensive. Instead write: demand-pull inflation occurs when aggregate demand outstrips the economy's productive capacity, causing a broad-based rise in the general price level.",
        examMatters: "When explaining demand-pull inflation on a diagram, shift the AD curve to the right along a steep section of the AS curve. Show that the price level rises more than real output. Examiners want you to link the cause (e.g. fiscal stimulus) to the AD shift and then to the inflationary outcome.",
        recall: {
          type: "reorder",
          prompt: "Put the demand-pull inflation process in order:",
          correctOrder: ["Aggregate demand increases (e.g. tax cuts)", "Economy is operating near full capacity", "Firms cannot easily increase output", "Firms raise prices -- general price level rises"],
          shuffled: [2, 0, 3, 1]
        }
      },
      {
        id: "cost-push-inflation",
        title: "Cost-Push Inflation",
        keyIdea: "When firms face rising production costs they pass them on as higher prices, pushing up the general price level even without any increase in demand.",
        body: [
          {
            type: "paragraph",
            text: "**Cost-push inflation** occurs when the costs of production rise, causing firms to increase their prices to maintain profit margins. This shifts the **short-run aggregate supply (SRAS) curve to the left**, reducing output while raising the price level. Unlike demand-pull inflation, cost-push inflation can occur even when the economy is below full capacity."
          },
          {
            type: "flow",
            steps: ["Oil prices spike or wages rise sharply", "Firms' production costs increase", "SRAS shifts left"],
            result: "Price level rises and output falls -- stagflation risk",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "Common causes include rising **commodity prices** (especially oil), **wage increases** that outstrip productivity growth, a **depreciation of the exchange rate** (making imports more expensive), and higher **indirect taxes**. Cost-push inflation is particularly harmful because it can create **stagflation** -- rising prices combined with falling output and rising unemployment."
          }
        ],
        realExample: {
          emoji: "⛽",
          text: "**The 1973 OPEC oil embargo** quadrupled oil prices in months, dramatically increasing production costs across every sector of Western economies. The UK experienced inflation above 20% combined with rising unemployment -- a clear case of stagflation caused by cost-push forces. This event ended the belief that inflation and unemployment could not rise simultaneously."
        },
        misconception: "Students say \"cost-push inflation only comes from oil prices.\" Rising wages, higher taxes, currency depreciation and increased raw material costs all cause cost-push inflation. Instead write: any increase in production costs that is passed on to consumers can cause cost-push inflation, including wages, taxes, import costs and commodity prices.",
        examMatters: "On a diagram, show cost-push inflation as a leftward shift of the SRAS curve. The price level rises while real GDP falls -- this simultaneous outcome is what makes cost-push inflation so problematic. Always name the specific cost increase causing the shift.",
        recall: {
          type: "fillin",
          prompt: "Complete the cost-push inflation chain:",
          template: ["Production costs rise (e.g. oil prices or ___)", "→ Firms pass on costs as higher ___", "→ SRAS shifts left, causing rising prices and falling output -- called ___"],
          answers: ["wages", "prices", "stagflation"],
          hints: ["wa___", "pr____", "st_________"]
        }
      },
      {
        id: "effects-of-inflation",
        title: "Effects of Inflation on Stakeholders",
        keyIdea: "Inflation redistributes purchasing power from savers and fixed-income earners to borrowers and asset owners, creating winners and losers throughout the economy.",
        body: [
          {
            type: "paragraph",
            text: "Inflation erodes the **purchasing power** of money -- each pound buys fewer goods and services. **Savers** lose out because the real value of their savings falls if interest rates do not keep pace with inflation. People on **fixed incomes** (such as pensioners with fixed annuities) see their real income decline as prices rise around them."
          },
          {
            type: "bullets",
            items: [
              "**Borrowers gain** -- the real value of their debt is eroded by inflation.",
              "**Savers lose** -- real returns on savings turn negative if interest rates are below inflation.",
              "**Workers** -- those with weak bargaining power see real wages fall; strong unions may keep pace.",
              "**Firms** -- face uncertainty over costs, which may reduce investment (menu and shoe-leather costs)."
            ]
          },
          {
            type: "paragraph",
            text: "High and unpredictable inflation also harms **international competitiveness**. If UK prices rise faster than those of trading partners, British exports become relatively more expensive, worsening the trade balance. Firms also face **menu costs** (reprinting price lists) and **shoe-leather costs** (time spent minimising cash holdings)."
          }
        ],
        realExample: {
          emoji: "🏦",
          text: "**UK mortgage holders** with fixed-rate deals taken out before 2022 effectively saw the real value of their debt fall as inflation surged above 10%. A mortgage of $200,000 lost significant real value in just two years. Meanwhile, savers with cash ISAs earning 1% suffered a real loss of around 9% per year."
        },
        misconception: "Students write \"inflation is always bad for the economy.\" Moderate, predictable inflation (around 2%) is considered healthy because it encourages spending and allows real wages to adjust. Instead write: high and unpredictable inflation causes serious problems, but moderate and stable inflation supports economic activity by discouraging hoarding of cash.",
        examMatters: "Questions on the effects of inflation expect you to distinguish between different stakeholders. Structure your answer around winners (borrowers, asset owners) and losers (savers, fixed-income earners, exporters). Always specify whether you are discussing high or moderate inflation, as the effects differ.",
        recall: {
          type: "reorder",
          prompt: "Put the effects of inflation on savers in order:",
          correctOrder: ["General price level rises", "Purchasing power of money falls", "Interest rate on savings is below inflation", "Real value of savings declines"],
          shuffled: [3, 1, 0, 2]
        }
      }
    ],
    takeaway: [
      "Demand-pull: AD grows faster than AS; too much money chasing too few goods.",
      "Cost-push: rising costs shift SRAS left; risk of stagflation.",
      "Inflation redistributes from savers to borrowers.",
      "Menu costs and shoe-leather costs reduce economic efficiency."
    ]
  },

  /* ═══ Block 6: Deflation ═══ */
  {
    title: "Deflation",
    quizIndices: [5],
    sections: [
      {
        id: "causes-of-deflation",
        title: "Causes of Deflation",
        keyIdea: "Deflation can be caused by falling aggregate demand (bad deflation) or by rising productivity and supply improvements (good deflation), and the distinction matters enormously.",
        body: [
          {
            type: "paragraph",
            text: "**Deflation** is a sustained fall in the general price level, meaning the inflation rate is negative. There are two distinct causes. **Demand-side deflation** (bad deflation) happens when aggregate demand collapses -- consumers stop spending, firms cut prices to clear stock, and a vicious cycle of falling output and employment begins."
          },
          {
            type: "paragraph",
            text: "**Supply-side deflation** (good deflation) happens when improvements in technology or productivity reduce costs, allowing firms to cut prices while maintaining or increasing output. This type benefits consumers without causing unemployment."
          },
          {
            type: "flow",
            steps: ["AD collapses (e.g. financial crisis)", "Firms cut prices to attract spending", "Falling revenue leads to job cuts"],
            result: "Demand-side deflation -- harmful deflationary spiral",
            resultType: "bad"
          }
        ],
        realExample: {
          emoji: "🇯🇵",
          text: "**Japan** experienced demand-side deflation for much of the 1990s and 2000s after its asset bubble burst in 1991. Consumers delayed purchases expecting lower prices, firms cut wages, and banks restricted lending. This \"Lost Decade\" demonstrated how demand-side deflation can trap an economy in stagnation."
        },
        misconception: "Students treat all deflation as equally harmful. Supply-side deflation from technological progress (like falling computer prices) benefits consumers and does not cause unemployment. Instead write: demand-side deflation is harmful because it reduces output and employment, whereas supply-side deflation from improved productivity can benefit the economy.",
        examMatters: "Examiners expect you to distinguish between demand-side and supply-side deflation. If a question asks whether deflation is harmful, your evaluation should depend on the cause. A strong answer considers both types and reaches a reasoned judgement based on context.",
        recall: {
          type: "fillin",
          prompt: "Complete the causes of deflation:",
          template: ["Demand-side deflation is caused by falling aggregate ___", "→ Supply-side deflation is caused by improved ___ reducing costs", "→ Demand-side deflation is harmful; supply-side deflation can be ___"],
          answers: ["demand", "productivity", "beneficial"],
          hints: ["de____", "pr___________", "be_________"]
        }
      },
      {
        id: "deflationary-spiral",
        title: "The Deflationary Spiral",
        keyIdea: "In a deflationary spiral, falling prices cause consumers to delay spending, which reduces demand further, causing more price falls in a self-reinforcing downward cycle.",
        body: [
          {
            type: "paragraph",
            text: "A **deflationary spiral** is the most dangerous consequence of demand-side deflation. When prices fall, consumers **delay purchases** because they expect goods to be even cheaper in the future. This reduces aggregate demand, forcing firms to cut prices further, reduce output and lay off workers."
          },
          {
            type: "flow",
            steps: ["Prices fall", "Consumers delay purchases expecting further falls", "AD drops, firms cut output and jobs", "Incomes fall, spending drops further"],
            result: "Self-reinforcing deflationary spiral deepens recession",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "The spiral is worsened by rising **real debt burdens**. If you owe $100,000 and prices are falling, the real value of your debt increases because your income falls while the debt stays fixed. Borrowers struggle to repay, banks face defaults, and credit dries up -- further reducing spending. This is why central banks fight deflation aggressively."
          }
        ],
        realExample: {
          emoji: "📉",
          text: "**The US Great Depression** of the 1930s saw prices fall by about 25% over four years. Consumers hoarded cash, businesses slashed prices and wages, and real debt burdens soared. The deflationary spiral was only broken when the government intervened with massive fiscal stimulus under the New Deal."
        },
        misconception: "Students write \"deflation is good for consumers because everything gets cheaper.\" In a demand-side deflationary spiral, falling prices are accompanied by falling wages, rising unemployment and collapsing demand. Instead write: while lower prices sound beneficial, demand-side deflation typically comes with falling incomes and rising unemployment that more than offset the price benefit.",
        examMatters: "When explaining the deflationary spiral, examiners want a clear chain of reasoning showing how each stage feeds into the next. Draw the circular process: falling prices lead to delayed spending, which leads to lower demand, which leads to further price falls. Mentioning rising real debt burdens shows advanced understanding.",
        recall: {
          type: "reorder",
          prompt: "Put the deflationary spiral stages in order:",
          correctOrder: ["General price level falls", "Consumers delay spending expecting further price falls", "Firms cut output, reduce investment and lay off workers", "Falling incomes reduce spending further -- cycle repeats"],
          shuffled: [2, 0, 3, 1]
        }
      },
      {
        id: "consequences-of-deflation",
        title: "Consequences of Deflation",
        keyIdea: "Deflation increases the real burden of debt, may render monetary policy ineffective through the liquidity trap, and reduces business confidence and investment.",
        body: [
          {
            type: "paragraph",
            text: "The most damaging consequence of deflation is the **increase in real debt**. When prices fall, the money you owe buys more goods than before, making debt relatively harder to repay. Firms and households cut spending to service their debts, further reducing aggregate demand."
          },
          {
            type: "paragraph",
            text: "Deflation can also trigger a **liquidity trap**, where central banks have already cut interest rates to near zero but cannot cut them further to stimulate borrowing and spending. Conventional monetary policy becomes ineffective. This is why central banks may resort to **quantitative easing** (QE) -- buying government bonds to inject money directly into the economy."
          },
          {
            type: "bullets",
            items: [
              "**Rising real debt** -- fixed debts become harder to repay as incomes and prices fall.",
              "**Delayed consumption** -- consumers wait for lower prices, reducing current demand.",
              "**Lower business investment** -- falling prices reduce expected returns on investment.",
              "**Monetary policy ineffectiveness** -- the liquidity trap limits central bank tools."
            ]
          }
        ],
        realExample: {
          emoji: "🏦",
          text: "**The Bank of Japan** cut interest rates to zero in 1999 and kept them there for over two decades, yet deflation persisted. Unable to cut rates further, the BOJ launched massive quantitative easing programmes, eventually buying government bonds worth over 100% of GDP. This demonstrated the limitations of monetary policy during deflation."
        },
        misconception: "Students assume central banks can always fix deflation by cutting interest rates. Once rates reach zero (the zero lower bound), conventional monetary policy is exhausted. Instead write: at the zero lower bound, central banks cannot cut rates further and must use unconventional tools like quantitative easing, which may be less effective.",
        examMatters: "Questions on deflation often require you to explain why it is difficult to escape once it begins. Link the deflationary spiral to the liquidity trap and explain why monetary policy may be ineffective. Discussing QE as a policy response demonstrates strong analytical depth.",
        recall: {
          type: "fillin",
          prompt: "Complete the deflation consequences chain:",
          template: ["Deflation increases the real burden of ___", "→ Central banks may hit the ___ lower bound on interest rates", "→ Conventional monetary policy becomes ineffective -- a ___ trap"],
          answers: ["debt", "zero", "liquidity"],
          hints: ["de__", "ze__", "li_______"]
        }
      }
    ],
    takeaway: [
      "Demand-side deflation is harmful; supply-side deflation can be beneficial.",
      "The deflationary spiral is self-reinforcing: falling prices reduce spending.",
      "Deflation raises real debt burdens and may trigger a liquidity trap.",
      "QE is a response when interest rates hit the zero lower bound."
    ]
  },

  /* ═══ Block 7: Employment and Unemployment ═══ */
  {
    title: "Employment and Unemployment",
    quizIndices: [6],
    practiceIndices: [1],
    sections: [
      {
        id: "measuring-unemployment",
        title: "Measuring Unemployment",
        keyIdea: "Unemployment is measured by the claimant count (people claiming benefits) and the Labour Force Survey (people actively seeking work), and each method has strengths and weaknesses.",
        body: [
          {
            type: "paragraph",
            text: "There are two main measures of unemployment in the UK. The **claimant count** records the number of people claiming unemployment-related benefits (mainly Jobseeker's Allowance or Universal Credit). The **Labour Force Survey (LFS)** is a quarterly survey that classifies people aged 16+ as employed, unemployed or economically inactive using ILO definitions."
          },
          {
            type: "paragraph",
            text: "Under the ILO definition, someone is unemployed if they are **without a job**, **actively seeking work**, and **available to start within two weeks**. The LFS is internationally comparable, whereas the claimant count depends on each country's benefit rules. The claimant count tends to understate true unemployment because not everyone who is jobless claims benefits."
          },
          {
            type: "bullets",
            items: [
              "**Claimant count** -- quick to publish, but excludes those who do not claim benefits.",
              "**LFS** -- internationally comparable, but is a survey with sampling errors.",
              "**Neither captures** hidden unemployment -- discouraged workers who stop looking.",
              "**Underemployment** (working fewer hours than desired) is also missed by both measures."
            ]
          }
        ],
        realExample: {
          emoji: "📋",
          text: "**During the UK's furlough scheme** in 2020-2021, the claimant count surged by 1.6 million, but many claimants were technically employed (just on reduced pay). The LFS showed a smaller unemployment rise because furloughed workers were classified as employed. This highlighted how each measure captures a different dimension of the labour market."
        },
        misconception: "Students write \"the unemployment rate measures everyone without a job.\" Retired people, full-time students and stay-at-home parents are not counted as unemployed -- they are economically inactive because they are not seeking work. Instead write: unemployment only counts people who are without work, actively seeking it and available to start.",
        examMatters: "Examiners expect you to know both measures and their limitations. A strong answer explains why the claimant count may understate or overstate true unemployment and why the LFS has sampling limitations. Mentioning hidden unemployment and underemployment demonstrates evaluative depth.",
        recall: {
          type: "reorder",
          prompt: "Put the ILO unemployment definition criteria in order:",
          correctOrder: ["Person is without a job", "Person is actively seeking work", "Person is available to start within two weeks", "Person is classified as ILO unemployed"],
          shuffled: [2, 0, 3, 1]
        }
      },
      {
        id: "types-of-unemployment",
        title: "Types of Unemployment",
        keyIdea: "Unemployment has four types by cause: frictional (between jobs), structural (skills mismatch), cyclical (demand deficiency) and seasonal — each needing different policies.",
        body: [
          {
            type: "paragraph",
            text: "**Frictional unemployment** is short-term unemployment that occurs when workers are between jobs. It exists even in a healthy economy because it takes time to search for and match with a new role. Better job market information and recruitment platforms reduce frictional unemployment."
          },
          {
            type: "paragraph",
            text: "**Structural unemployment** occurs when there is a mismatch between workers' skills and the skills employers need, or when jobs are in a different region from the workers. It often results from long-term changes like deindustrialisation or automation. Structural unemployment can last for years and requires retraining or relocation policies."
          },
          {
            type: "bullets",
            items: [
              "**Cyclical (demand-deficient)** -- caused by a fall in AD during a recession; cured by demand-side policies.",
              "**Frictional** -- short-term, between jobs; reduced by better labour market information.",
              "**Structural** -- skills or geographical mismatch; requires retraining and education policies.",
              "**Seasonal** -- predictable, linked to time of year (e.g. tourism, agriculture)."
            ]
          }
        ],
        realExample: {
          emoji: "⛏️",
          text: "**The closure of coal mines** across Northern England and Wales in the 1980s created mass structural unemployment. Former miners lacked the skills for the growing service sector jobs concentrated in London and the South East. Decades later, some former mining communities still have higher-than-average unemployment, showing how persistent structural unemployment can be."
        },
        misconception: "Students treat all unemployment as the same and suggest one policy can fix it all. Cyclical unemployment needs demand-side stimulus, while structural unemployment needs supply-side retraining. Instead write: the appropriate policy response depends on the type of unemployment -- demand management for cyclical, education and retraining for structural, information improvements for frictional.",
        examMatters: "Examiners want you to identify the type of unemployment from the context given and recommend appropriate policies. If a question describes a recession, the unemployment is cyclical. If it describes technological change making skills obsolete, it is structural. Matching the type to the correct policy is essential.",
        recall: {
          type: "fillin",
          prompt: "Complete the types of unemployment:",
          template: ["___ unemployment: short-term, between jobs", "→ ___ unemployment: skills or geographical mismatch", "→ ___ unemployment: caused by falling AD in a recession"],
          answers: ["Frictional", "Structural", "Cyclical"],
          hints: ["Fr________", "St________", "Cy______"]
        }
      },
      {
        id: "causes-and-policies",
        title: "Causes and Policies to Reduce Unemployment",
        keyIdea: "Demand-side policies like fiscal stimulus tackle cyclical unemployment, while supply-side policies like education and training address structural unemployment.",
        body: [
          {
            type: "paragraph",
            text: "**Cyclical unemployment** is caused by insufficient aggregate demand during a downturn. The government can tackle it using **demand-side policies**: expansionary fiscal policy (higher government spending or tax cuts) and expansionary monetary policy (lower interest rates or quantitative easing) to boost AD and create jobs."
          },
          {
            type: "flow",
            steps: ["Recession reduces AD", "Firms cut output and jobs", "Government boosts spending or cuts taxes"],
            result: "AD rises, firms rehire workers -- cyclical unemployment falls",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "**Structural unemployment** requires **supply-side policies**: investment in **education and retraining** to update workers' skills, improved **geographical mobility** through housing and transport policies, and better **occupational mobility** through apprenticeships and certification programmes. These policies take longer to work but address the root cause."
          }
        ],
        realExample: {
          emoji: "🏗️",
          text: "**The UK's Kickstart scheme** (2020-2022) subsidised six-month work placements for 16-24 year olds on Universal Credit. It combined demand-side stimulus (government funding) with supply-side elements (work experience and skills development). The scheme created over 160,000 placements, targeting both cyclical and structural youth unemployment."
        },
        misconception: "Students suggest cutting wages to reduce unemployment. While lower wages reduce firms' costs, they also reduce consumer spending, potentially deepening a recession. Instead write: wage flexibility may help in theory, but in practice cutting wages reduces aggregate demand, which can worsen cyclical unemployment -- the effect depends on the type of unemployment being addressed.",
        examMatters: "Essay questions on unemployment policies require you to match the policy to the type of unemployment. Examiners penalise generic answers. State the type of unemployment, explain why it exists, and then evaluate whether demand-side or supply-side policies are more appropriate given the context.",
        recall: {
          type: "reorder",
          prompt: "Put the demand-side unemployment policy chain in order:",
          correctOrder: ["Recession causes cyclical unemployment", "Government increases spending or cuts taxes", "Aggregate demand rises", "Firms increase output and rehire workers"],
          shuffled: [3, 1, 0, 2]
        }
      }
    ],
    takeaway: [
      "Claimant count is quick but narrow; LFS is comparable but survey-based.",
      "Four types: frictional, structural, cyclical, seasonal.",
      "Cyclical needs demand-side policies; structural needs supply-side.",
      "Hidden unemployment and underemployment are missed by both measures."
    ]
  },

  /* ═══ Block 8: Balance of Payments: Current Account ═══ */
  {
    title: "Balance of Payments: Current Account",
    quizIndices: [7],
    sections: [
      {
        id: "current-account-components",
        title: "Components of the Current Account",
        keyIdea: "The current account records trade in goods, trade in services, primary income (investment returns) and secondary income (transfers) between a country and the rest of the world.",
        body: [
          {
            type: "paragraph",
            text: "The **balance of payments** is a record of all financial transactions between a country and the rest of the world. The **current account** is the most closely watched section, and it has four components: **trade in goods**, **trade in services**, **primary income** and **secondary income**."
          },
          {
            type: "bullets",
            items: [
              "**Trade in goods** -- exports and imports of physical products (cars, oil, machinery).",
              "**Trade in services** -- exports and imports of services (finance, tourism, consulting).",
              "**Primary income** -- investment income flowing in and out (dividends, interest, wages of workers abroad).",
              "**Secondary income** -- transfers with no exchange of goods/services (foreign aid, remittances, EU contributions)."
            ]
          },
          {
            type: "paragraph",
            text: "The current account balance is the sum of all four components. If the total is negative, the country has a **current account deficit** -- it is spending more abroad than it earns from abroad. If positive, it has a **current account surplus**."
          }
        ],
        realExample: {
          emoji: "🇬🇧",
          text: "**The UK** runs a persistent current account deficit, driven by a large trade in goods deficit (the UK imports more manufactured goods than it exports). However, the UK runs a surplus on trade in services thanks to its strong financial and professional services sector. The net effect is still a deficit because the goods gap outweighs the services surplus."
        },
        misconception: "Students only mention trade in goods when discussing the current account. The current account has four components, and ignoring services, primary income and secondary income gives an incomplete picture. Instead write: the current account includes trade in goods, trade in services, primary income and secondary income -- all four must be considered when assessing the balance.",
        examMatters: "Examiners regularly ask you to explain the components of the current account. You must name and briefly define all four components. If data is provided, show that you can calculate the overall balance by summing the individual balances. Forgetting primary and secondary income is a common way to lose marks.",
        recall: {
          type: "fillin",
          prompt: "Complete the four components of the current account:",
          template: ["Trade in ___ (physical products like cars and oil)", "→ Trade in ___ (finance, tourism, consulting)", "→ Primary income (investment returns) and ___ income (transfers, aid, remittances)"],
          answers: ["goods", "services", "secondary"],
          hints: ["go___", "se______", "se_______"]
        }
      },
      {
        id: "current-account-deficit",
        title: "Current Account Deficit",
        keyIdea: "A current account deficit means a country spends more abroad than it earns, which must be financed by capital inflows -- attracting foreign investment or borrowing from overseas.",
        body: [
          {
            type: "paragraph",
            text: "A **current account deficit** occurs when the total outflow on the current account exceeds the total inflow. In simple terms, the country is importing more value than it is exporting (including services and investment income). The deficit must be financed through the **financial account** -- typically by attracting foreign direct investment, portfolio investment or borrowing."
          },
          {
            type: "flow",
            steps: ["Country imports more than it exports", "Current account deficit develops", "Must attract capital inflows to finance it"],
            result: "Sustainable if inflows fund productive investment; risky if funding consumption",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "Whether a deficit is a problem depends on its **cause** and **duration**. A deficit caused by importing capital goods for investment may boost future productivity. A deficit caused by excessive consumer spending on imports may be unsustainable. A persistent deficit can lead to currency depreciation, higher external debt, and reduced investor confidence."
          }
        ],
        realExample: {
          emoji: "🇺🇸",
          text: "**The United States** has run a current account deficit every year since 1982, reaching over $800 billion in 2022. This is financed by huge capital inflows -- foreign investors buy US Treasury bonds, shares and property. The US can sustain this because the dollar is the world's reserve currency, but most countries could not run such large deficits indefinitely."
        },
        misconception: "Students write \"a current account deficit is always bad for the economy.\" A deficit financed by productive foreign investment can boost growth and future exports. Instead write: the significance of a current account deficit depends on its cause, size and how it is financed -- deficits funding investment are less concerning than those funding consumption.",
        examMatters: "Evaluation is key here. Examiners want you to argue both sides: a deficit can signal strong domestic demand and productive investment, or it can signal a loss of competitiveness and unsustainable borrowing. The quality of your judgement determines your marks.",
        recall: {
          type: "reorder",
          prompt: "Put the current account deficit chain in order:",
          correctOrder: ["Imports of goods and services exceed exports", "Current account deficit develops", "Country must attract capital inflows to finance it", "Evaluate: sustainable if investment-led, risky if consumption-led"],
          shuffled: [2, 0, 3, 1]
        }
      },
      {
        id: "current-account-surplus",
        title: "Current Account Surplus",
        keyIdea: "A current account surplus means a country earns more from abroad than it spends, often reflecting strong exports but potentially signalling weak domestic demand.",
        body: [
          {
            type: "paragraph",
            text: "A **current account surplus** occurs when a country's export earnings (goods, services, income) exceed its spending on imports. The surplus funds are typically invested abroad through the financial account. Countries with persistent surpluses are net creditors to the rest of the world."
          },
          {
            type: "flow",
            steps: ["Country exports more than it imports", "Current account surplus accumulates", "Surplus funds are invested overseas"],
            result: "Country builds up foreign assets but may face trading partner resentment",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "A surplus is not automatically good. It may indicate that **domestic demand is too weak** -- consumers are not spending enough, so output is exported instead. It can also cause **upward pressure on the exchange rate**, making exports less competitive over time. Very large surpluses can create tension with trading partners who accuse the surplus country of manipulating its currency."
          }
        ],
        realExample: {
          emoji: "🇩🇪",
          text: "**Germany** has run one of the world's largest current account surpluses for over a decade, exceeding $250 billion in some years. Critics argue this reflects weak domestic consumption and an undervalued euro for Germany's productivity level. The European Commission has repeatedly urged Germany to boost domestic spending to help rebalance the eurozone economy."
        },
        misconception: "Students assume \"a surplus is always better than a deficit.\" A surplus can signal weak domestic demand and over-reliance on exports, making the economy vulnerable to global downturns. Instead write: a surplus can reflect competitive exports, but it may also indicate suppressed domestic demand; its desirability depends on the underlying cause.",
        examMatters: "Examiners often present data showing both deficit and surplus countries and ask you to evaluate. Avoid the assumption that surpluses are good and deficits are bad. The strongest answers evaluate the causes, sustainability and wider economic implications of both positions.",
        recall: {
          type: "fillin",
          prompt: "Complete the current account surplus analysis:",
          template: ["A surplus means ___ earnings exceed import spending", "→ Surplus funds are typically invested ___", "→ A large surplus may signal weak ___ demand"],
          answers: ["export", "abroad", "domestic"],
          hints: ["ex____", "ab____", "do______"]
        }
      }
    ],
    takeaway: [
      "The current account has four parts: goods, services, primary and secondary income.",
      "A deficit must be financed by capital inflows on the financial account.",
      "Deficits are not always bad; surpluses are not always good.",
      "Always evaluate by considering the cause, size and sustainability."
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
