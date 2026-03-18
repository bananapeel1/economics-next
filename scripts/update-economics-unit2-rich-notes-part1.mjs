/**
 * RICH NOTES — Economics Unit 2, Part 1 (2.3.1, 2.3.2, 2.3.3)
 * =============================================================
 * Edexcel IAL Economics Unit 2, spec points 2.3.1 – 2.3.3
 * Pushes rich-format notes to Supabase section_notes table.
 *
 * Sections:
 *   2.3.1 Measures of Economic Performance  (measures-economic-performance)
 *   2.3.2 Aggregate Demand                  (aggregate-demand)
 *   2.3.3 Aggregate Supply                  (aggregate-supply)
 *
 * Run with: node scripts/update-economics-unit2-rich-notes-part1.mjs
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL || 'https://trweeckuswgkenckeqfb.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);


/* ═══════════════════════════════════════════════════════════════
 *  2.3.1 — MEASURES OF ECONOMIC PERFORMANCE
 *
 *  8 chapters: GDP, Three Methods, Uses & Limitations, CPI &
 *  Inflation, Inflation Causes & Effects, Deflation, Employment
 *  & Unemployment, Balance of Payments Current Account
 * ═══════════════════════════════════════════════════════════════ */

const NOTES_231 = [

  /* ─────────────────────────────────────────────────
   *  Chapter 1: Gross Domestic Product (GDP)
   * ───────────────────────────────────────────────── */
  {
    title: "Gross Domestic Product (GDP)",
    meta: "5 concepts",
    keyIdea: "GDP is the headline number for economic performance, but the raw figure hides crucial differences between price-inflated growth and genuine improvements in living standards.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Gross Domestic Product (GDP)</strong> — the total monetary value of all final goods and services produced within an economy's borders in a given time period."
          },
          {
            type: "def",
            text: "<strong>Nominal GDP</strong> — GDP measured at current market prices, which includes the effects of inflation and therefore overstates real growth when prices are rising.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Real GDP</strong> — GDP adjusted for inflation using a base year's prices, giving a more accurate measure of actual changes in output over time."
          },
          {
            type: "def",
            text: "<strong>GDP per capita</strong> — real GDP divided by the total population, providing a rough measure of average living standards and allowing comparison between countries of different sizes."
          }
        ]
      },
      {
        title: "WHY REAL GDP MATTERS",
        items: [
          {
            type: "mech",
            text: "Nominal GDP can rise simply because <strong>prices have increased</strong>, not because the economy produced more; stripping out inflation reveals whether genuine output growth occurred."
          },
          {
            type: "mech",
            text: "GDP per capita adjusts for population size, so a country whose GDP grows by 3% but whose population grows by 4% actually sees <strong>falling average living standards</strong>."
          },
          {
            type: "imp",
            text: "Examiners expect you to use <strong>real GDP per capita</strong> when comparing living standards over time or between countries, not just raw GDP figures.",
            tag: "exam"
          },
          {
            type: "link",
            text: "GDP growth links directly to the PPF from Unit 1; an outward shift of the PPF represents an increase in the economy's potential GDP."
          }
        ]
      }
    ],
    formula: {
      label: "REAL GDP",
      text: "Real GDP = Nominal GDP ÷ GDP deflator × 100"
    },
    flow: {
      steps: ["Measure nominal GDP", "Adjust for inflation using GDP deflator", "Divide by population"],
      result: "Real GDP per capita — the best single indicator of average living standards",
      resultType: "good"
    },
    examMatters: "Examiners test whether you understand the difference between nominal and real GDP. Always specify 'real GDP' in your answers and explain why adjusting for inflation matters. When comparing countries, use GDP per capita and acknowledge its limitations.",
    misconception: "Students say rising GDP always means people are better off. Wrong because GDP can rise due to inflation, population growth, or increased output of goods that do not improve welfare (e.g. defence spending after conflict). Instead write: rising real GDP per capita is a better indicator, but it still ignores inequality, leisure time, and environmental costs.",
    takeaway: [
      "GDP measures total output; real GDP strips out inflation for meaningful comparison.",
      "GDP per capita adjusts for population and is better for comparing living standards.",
      "Always state 'real GDP per capita' in exam answers to show precise understanding."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 2: Three Methods of Measuring GDP
   * ───────────────────────────────────────────────── */
  {
    title: "Three Methods of Measuring GDP",
    meta: "4 concepts",
    keyIdea: "Output, income, and expenditure are three windows into the same economy, and in theory they give identical answers because every pound spent is a pound earned and a pound of output produced.",
    blocks: [
      {
        title: "THE THREE APPROACHES",
        items: [
          {
            type: "def",
            text: "<strong>Output method</strong> — measures GDP by adding up the value added at each stage of production across all industries, avoiding double counting by excluding intermediate goods.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Income method</strong> — measures GDP by summing all incomes earned by factors of production (wages, profits, rents, interest) within the economy."
          },
          {
            type: "def",
            text: "<strong>Expenditure method</strong> — measures GDP by totalling all spending on final goods and services: C + I + G + (X – M)."
          }
        ]
      },
      {
        title: "HOW THEY CONNECT",
        items: [
          {
            type: "mech",
            text: "The <strong>circular flow of income</strong> explains why the three methods are equivalent: every firm's output generates income for households, who spend it back on goods and services."
          },
          {
            type: "mech",
            text: "The output method uses <strong>value added</strong> to avoid double counting; if a baker buys flour for £1 and sells bread for £3, only £2 of value added is counted."
          },
          {
            type: "imp",
            text: "In practice the three methods give slightly different results due to <strong>data collection difficulties</strong>, the informal economy, and time lags in reporting.",
            tag: "exam"
          },
          {
            type: "link",
            text: "The expenditure method (C + I + G + (X – M)) links directly to aggregate demand; understanding the components here prepares you for the AD framework in section 2.3.2."
          }
        ]
      }
    ],
    formula: {
      label: "EXPENDITURE METHOD",
      text: "GDP = C + I + G + (X – M)"
    },
    flow: {
      steps: ["Firms produce output (output method)", "Generate incomes for workers and owners (income method)", "Incomes are spent on goods (expenditure method)"],
      result: "All three methods measure the same circular flow and should give the same GDP",
      resultType: "good"
    },
    examMatters: "Examiners may ask you to explain why the three methods should give the same result. Link your answer to the circular flow model and explain that each method captures a different point in the same cycle of production, income, and spending.",
    takeaway: [
      "Output, income, and expenditure methods all measure GDP from different angles.",
      "The output method avoids double counting by using value added at each stage.",
      "In theory the three methods give identical results; in practice they differ slightly due to data limitations."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 3: Uses and Limitations of GDP Data
   * ───────────────────────────────────────────────── */
  {
    title: "Uses and Limitations of GDP Data",
    meta: "5 concepts",
    keyIdea: "GDP is the best single measure of economic activity we have, but it was never designed to capture happiness, health, or environmental sustainability, so relying on it alone paints an incomplete picture.",
    blocks: [
      {
        title: "USES OF GDP DATA",
        items: [
          {
            type: "mech",
            text: "Governments use GDP data to <strong>track the business cycle</strong>, identify recessions (two consecutive quarters of negative growth), and decide when to apply fiscal or monetary stimulus."
          },
          {
            type: "mech",
            text: "International organisations use GDP per capita in <strong>purchasing power parity (PPP)</strong> terms to compare living standards across countries with different price levels."
          },
          {
            type: "imp",
            text: "GDP data informs <strong>policy decisions</strong> on taxation, spending, and interest rates; inaccurate data could lead to poorly timed interventions.",
            tag: "exam"
          }
        ]
      },
      {
        title: "LIMITATIONS OF GDP",
        items: [
          {
            type: "mech",
            text: "GDP ignores <strong>income distribution</strong>; a country's GDP per capita may rise while most of the gains flow to the richest, leaving average citizens no better off."
          },
          {
            type: "mech",
            text: "The <strong>informal economy</strong> (cash-in-hand work, subsistence farming) is excluded from GDP figures, particularly significant in developing countries where it can account for 30–60% of activity."
          },
          {
            type: "imp",
            text: "GDP counts <strong>negative externalities</strong> as positive contributions; cleaning up an oil spill increases GDP even though the spill reduced welfare.",
            tag: "exam"
          },
          {
            type: "imp",
            text: "GDP ignores leisure time, quality of life, and environmental degradation; a country working its population 80-hour weeks may have high GDP but low wellbeing."
          },
          {
            type: "link",
            text: "The <strong>Human Development Index (HDI)</strong> combines GDP per capita with life expectancy and education to give a broader measure of development, addressing some of GDP's blind spots."
          }
        ]
      }
    ],
    flow: {
      steps: ["GDP rises", "Check: real or nominal?", "Check: per capita?", "Check: distribution, environment, informal economy"],
      result: "Only after adjusting for all factors can we judge if living standards truly improved",
      resultType: "good"
    },
    examMatters: "Examiners love asking you to evaluate whether GDP is a good measure of living standards. Always acknowledge it is useful, then list at least three specific limitations with examples. Mention HDI or other alternative measures for top marks.",
    misconception: "Students say GDP is useless as a measure of living standards. Wrong because GDP per capita in PPP terms is still the best single indicator of material prosperity available. Instead write: GDP is valuable but incomplete; it should be used alongside indicators like HDI, Gini coefficient, and environmental measures for a fuller picture.",
    takeaway: [
      "GDP is essential for tracking output, recessions, and international comparisons.",
      "Key limitations: ignores distribution, informal economy, externalities, and quality of life.",
      "HDI complements GDP by incorporating health and education alongside income."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 4: Consumer Price Index (CPI) and Inflation
   * ───────────────────────────────────────────────── */
  {
    title: "Consumer Price Index (CPI) and Inflation",
    meta: "5 concepts",
    keyIdea: "The CPI translates millions of price changes into one number by tracking a weighted basket of goods, but the basket is always slightly out of date and misses the spending patterns of many households.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Inflation</strong> — a sustained increase in the general price level of goods and services in an economy over a period of time, reducing the purchasing power of money."
          },
          {
            type: "def",
            text: "<strong>Consumer Price Index (CPI)</strong> — a weighted index that measures the average change in prices of a representative basket of goods and services purchased by a typical household.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Retail Price Index (RPI)</strong> — an older measure of inflation that includes mortgage interest payments and uses a different averaging method (arithmetic mean vs CPI's geometric mean)."
          }
        ]
      },
      {
        title: "HOW CPI IS CONSTRUCTED",
        items: [
          {
            type: "mech",
            text: "A <strong>basket of goods</strong> is selected based on the Living Costs and Food Survey, representing typical household spending; the basket is updated annually to reflect changing consumption patterns."
          },
          {
            type: "mech",
            text: "Each item receives a <strong>weight</strong> proportional to its share of average household spending; housing and transport carry heavy weights, while items like postage carry small ones."
          },
          {
            type: "mech",
            text: "Prices are collected from multiple outlets each month, and the <strong>weighted average change</strong> is calculated to produce the CPI figure."
          },
          {
            type: "imp",
            text: "CPI may not reflect individual experience because the basket represents the <strong>average household</strong>; pensioners, students, and high earners all face different inflation rates.",
            tag: "exam"
          },
          {
            type: "link",
            text: "CPI is used by the Bank of England to target inflation at 2%; if CPI diverges from target, it triggers monetary policy adjustments through interest rate changes."
          }
        ]
      }
    ],
    flow: {
      steps: ["Survey household spending", "Select basket and assign weights", "Collect prices monthly", "Calculate weighted price change"],
      result: "CPI inflation rate published — guides monetary policy",
      resultType: "good"
    },
    examMatters: "Examiners often ask you to explain how CPI is constructed and evaluate its accuracy. Walk through the basket, weighting, and collection process, then discuss at least two limitations such as substitution bias and the unrepresentative basket problem.",
    misconception: "Students say CPI measures the cost of living. Wrong because CPI measures price changes for a fixed basket, not changes in the actual cost of maintaining a particular standard of living. Instead write: CPI is a price index that approximates cost of living changes but does not account for substitution between goods or quality improvements.",
    takeaway: [
      "CPI tracks weighted price changes in a representative basket updated annually.",
      "RPI includes mortgage costs and uses arithmetic averaging; CPI uses geometric.",
      "CPI may not reflect your personal inflation rate if your spending differs from the average household."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 5: Inflation — Causes and Effects
   * ───────────────────────────────────────────────── */
  {
    title: "Inflation: Causes and Effects",
    meta: "6 concepts",
    keyIdea: "Demand-pull inflation signals an overheating economy while cost-push inflation punishes it from the supply side, and both erode purchasing power in ways that hit some groups far harder than others.",
    blocks: [
      {
        title: "CAUSES OF INFLATION",
        items: [
          {
            type: "def",
            text: "<strong>Demand-pull inflation</strong> — inflation caused by aggregate demand growing faster than aggregate supply, pulling prices up as too much money chases too few goods.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Cost-push inflation</strong> — inflation caused by rising costs of production (wages, raw materials, energy) being passed on to consumers as higher prices."
          },
          {
            type: "mech",
            text: "Demand-pull inflation typically occurs when the economy is near <strong>full capacity</strong>; firms cannot increase output to meet extra demand, so they raise prices instead."
          },
          {
            type: "mech",
            text: "Cost-push inflation can be triggered by <strong>external shocks</strong> such as oil price spikes, supply chain disruptions, or depreciation of the exchange rate raising import costs."
          }
        ]
      },
      {
        title: "EFFECTS ON STAKEHOLDERS",
        items: [
          {
            type: "imp",
            text: "Inflation <strong>erodes purchasing power</strong> of those on fixed incomes (pensioners, workers with fixed-wage contracts), as their nominal income buys fewer goods.",
            tag: "exam"
          },
          {
            type: "imp",
            text: "Borrowers benefit from unexpected inflation because the <strong>real value of debt falls</strong>, while savers and lenders lose if the interest rate is below the inflation rate."
          },
          {
            type: "mech",
            text: "High inflation creates <strong>uncertainty</strong> for businesses, discouraging long-term investment because firms cannot predict future costs or revenues accurately."
          },
          {
            type: "imp",
            text: "Inflation reduces <strong>international competitiveness</strong> if domestic prices rise faster than those of trading partners, increasing imports and reducing exports.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Demand-pull inflation links to AD/AS analysis; it appears on the diagram as a rightward shift of AD along an upward-sloping AS curve, raising both price level and output."
          }
        ]
      }
    ],
    flow: {
      steps: ["AD rises faster than AS (demand-pull)", "Firms hit capacity constraints", "Prices are bid upward", "Purchasing power falls"],
      result: "Inflation redistributes income from savers to borrowers and erodes competitiveness",
      resultType: "bad"
    },
    examMatters: "Examiners expect you to distinguish clearly between demand-pull and cost-push inflation, identify the cause in context, and then evaluate who wins and who loses. Always consider borrowers vs savers, fixed vs flexible incomes, and domestic vs international competitiveness.",
    misconception: "Students say inflation is always bad for the economy. Wrong because moderate inflation (around 2%) is considered healthy; it encourages spending over hoarding, allows real wages to adjust downward without nominal cuts, and gives central banks room to cut real interest rates. Instead write: high or volatile inflation is damaging, but moderate, stable inflation supports economic activity.",
    takeaway: [
      "Demand-pull: too much spending; cost-push: rising production costs pushing prices up.",
      "Inflation hurts fixed-income earners and savers but benefits borrowers.",
      "High inflation reduces competitiveness and discourages business investment."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 6: Deflation
   * ───────────────────────────────────────────────── */
  {
    title: "Deflation",
    meta: "4 concepts",
    keyIdea: "Falling prices sound good for consumers, but sustained deflation can trap an economy in a vicious cycle where postponed spending, rising real debt, and falling profits feed on each other.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Deflation</strong> — a sustained decrease in the general price level, where the inflation rate falls below zero; the opposite of inflation."
          },
          {
            type: "def",
            text: "<strong>Disinflation</strong> — a fall in the rate of inflation (prices still rising, but more slowly); not the same as deflation where prices actually fall.",
            tag: "exam"
          }
        ]
      },
      {
        title: "THE DEFLATIONARY SPIRAL",
        items: [
          {
            type: "mech",
            text: "When prices fall, consumers <strong>delay purchases</strong> expecting further price drops, reducing aggregate demand and forcing firms to cut prices even further."
          },
          {
            type: "mech",
            text: "Deflation increases the <strong>real value of debt</strong>, making it harder for households and firms to service their loans, reducing spending and investment further."
          },
          {
            type: "imp",
            text: "Firms facing falling revenues may cut wages or lay off workers, reducing incomes and creating a <strong>self-reinforcing downward spiral</strong> of falling demand and output.",
            tag: "exam"
          },
          {
            type: "mech",
            text: "Not all deflation is harmful: <strong>benign deflation</strong> from technological improvements or productivity gains increases supply and lowers prices without damaging output."
          },
          {
            type: "link",
            text: "Japan's 'Lost Decade' of the 1990s–2000s is the classic case study of a deflationary trap where conventional monetary policy (cutting interest rates to zero) failed to stimulate demand."
          }
        ]
      }
    ],
    flow: {
      steps: ["Prices begin to fall", "Consumers delay spending", "Firms cut output and jobs", "Incomes fall, spending drops further"],
      result: "Deflationary spiral — difficult to escape once established",
      resultType: "bad"
    },
    examMatters: "Examiners want you to distinguish between deflation and disinflation, and between 'good' deflation (productivity-driven) and 'bad' deflation (demand-driven). Always explain the deflationary spiral mechanism and why it is so difficult for policymakers to reverse.",
    misconception: "Students say falling prices are always good for consumers. Wrong because malignant deflation from falling demand leads to unemployment, wage cuts, and rising real debt burdens that outweigh any price benefit. Instead write: benign deflation from improved productivity is beneficial, but demand-deficient deflation triggers a destructive spiral.",
    takeaway: [
      "Deflation is a sustained fall in the price level; disinflation is just a slowdown in price rises.",
      "The deflationary spiral links falling prices, delayed spending, rising real debt, and job losses.",
      "Benign deflation from productivity gains is positive; malignant deflation from weak demand is dangerous."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 7: Employment and Unemployment
   * ───────────────────────────────────────────────── */
  {
    title: "Employment and Unemployment",
    meta: "6 concepts",
    keyIdea: "The headline unemployment rate is just the tip of the iceberg — beneath it lie different types of unemployment, each with its own cause and its own policy solution.",
    blocks: [
      {
        title: "MEASURING UNEMPLOYMENT",
        items: [
          {
            type: "def",
            text: "<strong>Unemployment</strong> — occurs when people who are willing and able to work at the prevailing wage rate cannot find employment."
          },
          {
            type: "def",
            text: "<strong>Claimant count</strong> — measures unemployment by counting the number of people claiming Jobseeker's Allowance or the unemployment element of Universal Credit.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Labour Force Survey (LFS)</strong> — uses the ILO definition to measure unemployment through a quarterly sample survey of 40,000 households, capturing those actively seeking work in the last four weeks."
          },
          {
            type: "imp",
            text: "The LFS is considered more accurate because it captures those who are <strong>unemployed but not claiming</strong> benefits, though it may still miss discouraged workers who have stopped looking.",
            tag: "exam"
          }
        ]
      },
      {
        title: "TYPES AND CAUSES",
        items: [
          {
            type: "def",
            text: "<strong>Frictional unemployment</strong> — short-term unemployment arising as workers move between jobs; it exists even in a healthy economy and is generally voluntary."
          },
          {
            type: "def",
            text: "<strong>Structural unemployment</strong> — long-term unemployment caused by a mismatch between workers' skills and the skills demanded by available jobs, often due to deindustrialisation or technological change."
          },
          {
            type: "def",
            text: "<strong>Cyclical (demand-deficient) unemployment</strong> — unemployment caused by a fall in aggregate demand during a recession; firms lay off workers because they cannot sell enough output."
          },
          {
            type: "mech",
            text: "<strong>Seasonal unemployment</strong> occurs in industries with predictable demand fluctuations (tourism, agriculture), while <strong>real wage unemployment</strong> occurs when wages are held above the market-clearing level by minimum wages or union power."
          },
          {
            type: "link",
            text: "Different types require different policies: cyclical unemployment calls for demand-side stimulus, while structural unemployment requires supply-side measures like retraining and education."
          }
        ]
      }
    ],
    formulas: [
      {
        label: "UNEMPLOYMENT RATE",
        text: "Unemployment rate = (Unemployed ÷ Labour force) × 100"
      }
    ],
    flow: {
      steps: ["Identify the type of unemployment", "Match the cause", "Select appropriate policy"],
      result: "Cyclical → demand-side; Structural → supply-side; Frictional → information improvements",
      resultType: "good"
    },
    examMatters: "Examiners frequently ask you to compare the claimant count and LFS measures and evaluate which is better. They also expect you to identify the type of unemployment from context and recommend an appropriate policy response. Always link the type to the cause.",
    misconception: "Students say all unemployment is caused by recessions. Wrong because structural, frictional, and seasonal unemployment exist even when the economy is growing. Instead write: cyclical unemployment is caused by recessions, but other forms exist due to skills mismatches, job transitions, and seasonal patterns, each requiring different policy responses.",
    takeaway: [
      "The LFS is more comprehensive than the claimant count but both measures have limitations.",
      "Cyclical unemployment needs demand-side fixes; structural needs supply-side interventions.",
      "Frictional unemployment is normal and even healthy; it shows labour market flexibility.",
      "Always identify the type of unemployment before recommending a policy in exam answers."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 8: Balance of Payments — Current Account
   * ───────────────────────────────────────────────── */
  {
    title: "Balance of Payments: Current Account",
    meta: "5 concepts",
    keyIdea: "The current account reveals whether a country is living within its means or borrowing from the rest of the world, and persistent deficits signal deep structural issues beyond just trade in goods.",
    blocks: [
      {
        title: "COMPONENTS",
        items: [
          {
            type: "def",
            text: "<strong>Balance of payments</strong> — a record of all financial transactions between residents of one country and the rest of the world over a given period; it must always balance overall."
          },
          {
            type: "def",
            text: "<strong>Current account</strong> — the section of the balance of payments that records trade in goods, trade in services, primary income (investment returns), and secondary income (transfers).",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Trade balance</strong> — the difference between the value of exports and imports of goods and services; a deficit means imports exceed exports."
          },
          {
            type: "mech",
            text: "<strong>Primary income</strong> includes wages earned abroad and investment income (dividends, interest); <strong>secondary income</strong> includes government transfers, overseas aid, and remittances."
          }
        ]
      },
      {
        title: "CAUSES AND SIGNIFICANCE",
        items: [
          {
            type: "mech",
            text: "A current account deficit can be caused by <strong>high consumer spending on imports</strong>, an overvalued exchange rate making exports expensive, or low productivity reducing competitiveness."
          },
          {
            type: "mech",
            text: "A strong exchange rate makes imports cheaper and exports more expensive, <strong>worsening the trade balance</strong> and pushing the current account toward deficit."
          },
          {
            type: "imp",
            text: "A persistent deficit must be financed by capital inflows (foreign investment or borrowing), creating <strong>future obligations</strong> that may constrain economic policy.",
            tag: "exam"
          },
          {
            type: "imp",
            text: "A current account surplus is not always desirable either; it may reflect <strong>weak domestic demand</strong> or excessive saving rather than strong competitiveness."
          },
          {
            type: "link",
            text: "The current account links to aggregate demand through the (X – M) component; a deteriorating current account reduces net exports and shifts AD to the left."
          }
        ]
      }
    ],
    formula: {
      label: "CURRENT ACCOUNT",
      text: "Current Account = Trade in Goods + Trade in Services + Primary Income + Secondary Income"
    },
    flow: {
      steps: ["Exchange rate appreciates", "Exports become more expensive", "Imports become cheaper", "Trade balance worsens"],
      result: "Current account deficit widens — must be financed by capital inflows",
      resultType: "bad"
    },
    examMatters: "Examiners want you to know all four components of the current account, not just the trade balance. They also expect you to evaluate whether a deficit is a problem — consider its size, persistence, and how it is financed. A small deficit financed by FDI is very different from a large deficit financed by short-term borrowing.",
    misconception: "Students say a current account deficit always means the economy is performing badly. Wrong because a deficit can reflect strong domestic growth attracting imports and foreign investment. Instead write: the significance of a deficit depends on its size, duration, and how it is financed; a temporary deficit during an investment boom may be healthy.",
    takeaway: [
      "The current account has four components: goods, services, primary income, and secondary income.",
      "Deficits must be financed by capital inflows, creating future obligations.",
      "Whether a deficit is a problem depends on its size, persistence, and financing method.",
      "Exchange rate movements are a key driver of the trade balance and current account position."
    ]
  }

];


/* ═══════════════════════════════════════════════════════════════
 *  2.3.2 — AGGREGATE DEMAND
 *
 *  5 chapters: Components of AD, The AD Curve, Shifts in AD,
 *  The Multiplier, The Accelerator Effect
 * ═══════════════════════════════════════════════════════════════ */

const NOTES_232 = [

  /* ─────────────────────────────────────────────────
   *  Chapter 1: Components of Aggregate Demand
   * ───────────────────────────────────────────────── */
  {
    title: "Components of Aggregate Demand",
    meta: "6 concepts",
    keyIdea: "AD is built from four pillars — consumer spending, investment, government spending, and net exports — and understanding what drives each one is the key to predicting where the whole economy is heading.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Aggregate demand (AD)</strong> — the total planned spending on goods and services produced in an economy at a given price level in a given time period.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Consumption (C)</strong> — total household spending on goods and services; it is the largest component of AD, typically accounting for 60–65% of GDP."
          },
          {
            type: "def",
            text: "<strong>Investment (I)</strong> — spending by firms on capital goods (machinery, equipment, technology) and changes in inventories; it is the most volatile component of AD."
          },
          {
            type: "def",
            text: "<strong>Net exports (X – M)</strong> — the value of exports minus the value of imports; positive net exports add to AD, negative net exports subtract from it."
          }
        ]
      },
      {
        title: "DETERMINANTS OF EACH COMPONENT",
        items: [
          {
            type: "mech",
            text: "Consumption is driven by <strong>disposable income</strong>, consumer confidence, interest rates, wealth effects (house and share prices), and the availability of credit."
          },
          {
            type: "mech",
            text: "Investment depends on <strong>interest rates</strong> (the cost of borrowing), business confidence and expectations, corporate tax rates, technological change, and the level of spare capacity."
          },
          {
            type: "mech",
            text: "Government spending (G) is a <strong>policy variable</strong> determined by fiscal decisions; it includes current spending (wages, services) and capital spending (infrastructure, schools)."
          },
          {
            type: "mech",
            text: "Net exports are influenced by the <strong>exchange rate</strong>, relative inflation rates, income levels at home and abroad, and non-price competitiveness (quality, design, reliability)."
          },
          {
            type: "link",
            text: "Each component of AD links to a policy lever: consumption responds to monetary policy (interest rates), investment to both monetary and supply-side policy, and G directly to fiscal policy."
          }
        ]
      }
    ],
    formula: {
      label: "AGGREGATE DEMAND",
      text: "AD = C + I + G + (X – M)"
    },
    flow: {
      steps: ["Interest rates fall", "Borrowing cheaper for households and firms", "C and I both rise", "AD shifts right"],
      result: "Lower interest rates boost multiple AD components simultaneously",
      resultType: "good"
    },
    examMatters: "Examiners expect you to know the AD formula and identify which component is affected in any given scenario. When analysing a policy or event, always state which component of AD changes and explain the transmission mechanism from cause to effect.",
    misconception: "Students forget that AD has four components and focus only on consumption. Wrong because investment, though smaller, is the most volatile component and often the main driver of economic fluctuations. Instead write: consumption is the largest component, but investment volatility is typically the main trigger for changes in AD and the business cycle.",
    takeaway: [
      "AD = C + I + G + (X – M); always identify which component is changing.",
      "Consumption is largest but investment is most volatile and drives business cycles.",
      "Interest rates affect multiple components: C (mortgages, credit) and I (cost of borrowing).",
      "Net exports depend on exchange rates, relative prices, and trading partner incomes."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 2: The AD Curve
   * ───────────────────────────────────────────────── */
  {
    title: "The AD Curve",
    meta: "4 concepts",
    keyIdea: "The AD curve slopes downward not because of individual demand logic but because of three macroeconomic effects — wealth, trade, and interest rates — that link the price level to total spending.",
    blocks: [
      {
        title: "SHAPE AND SLOPE",
        items: [
          {
            type: "def",
            text: "<strong>AD curve</strong> — a downward-sloping curve showing the inverse relationship between the general price level and the total quantity of real output demanded in an economy."
          },
          {
            type: "mech",
            text: "The <strong>wealth effect</strong>: a higher price level reduces the real value of household wealth (savings, assets), making consumers feel poorer and reducing consumption.",
            tag: "exam"
          },
          {
            type: "mech",
            text: "The <strong>trade effect</strong>: a higher domestic price level makes exports more expensive and imports relatively cheaper, reducing net exports (X – M)."
          },
          {
            type: "mech",
            text: "The <strong>interest rate effect</strong>: a higher price level increases demand for money, pushing up interest rates, which reduces both consumption and investment spending."
          }
        ]
      },
      {
        title: "MOVEMENTS VS SHIFTS",
        items: [
          {
            type: "mech",
            text: "A <strong>movement along</strong> the AD curve is caused only by a change in the general price level, working through the three effects above."
          },
          {
            type: "imp",
            text: "A <strong>shift</strong> of the AD curve is caused by a change in any factor affecting C, I, G, or (X – M) other than the price level; the entire curve moves left or right.",
            tag: "exam"
          },
          {
            type: "imp",
            text: "Do not confuse the AD curve with a microeconomic demand curve; the AD curve slopes downward for <strong>entirely different reasons</strong> (wealth, trade, and interest rate effects, not substitution and income effects)."
          },
          {
            type: "link",
            text: "Understanding the three effects is essential for AD/AS analysis in section 2.3.3; they explain why equilibrium adjusts when AS shifts and the price level changes."
          }
        ]
      }
    ],
    flow: {
      steps: ["Price level rises", "Wealth effect reduces C", "Trade effect reduces (X–M)", "Interest rate effect reduces C and I"],
      result: "Total real output demanded falls — movement up along the AD curve",
      resultType: "bad"
    },
    examMatters: "Examiners frequently test whether you can explain why the AD curve slopes downward. You must name and explain at least two of the three effects (wealth, trade, interest rate). Never use microeconomic reasoning (substitution effect) to explain the AD curve's slope.",
    misconception: "Students explain the downward slope of AD using substitution and income effects from microeconomics. Wrong because AD relates the general price level to total output, not the price of one good to its quantity demanded. Instead write: the AD curve slopes downward due to the wealth effect, trade effect, and interest rate effect operating at the macroeconomic level.",
    takeaway: [
      "The AD curve slopes down due to wealth, trade, and interest rate effects — not micro reasoning.",
      "A change in the price level causes a movement along AD; other factors shift AD.",
      "Never confuse the macro AD curve with a micro demand curve; the logic is completely different."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 3: Shifts in Aggregate Demand
   * ───────────────────────────────────────────────── */
  {
    title: "Shifts in Aggregate Demand",
    meta: "5 concepts",
    keyIdea: "Anything that changes planned spending at every price level shifts the AD curve, and tracing the shift back to a specific component (C, I, G, or X–M) is the hallmark of strong macro analysis.",
    blocks: [
      {
        title: "FACTORS SHIFTING AD RIGHT",
        items: [
          {
            type: "mech",
            text: "A <strong>cut in interest rates</strong> reduces the cost of borrowing, boosting consumption (mortgages, credit cards) and investment (capital projects), shifting AD right."
          },
          {
            type: "mech",
            text: "A rise in <strong>consumer or business confidence</strong> increases willingness to spend and invest, shifting AD right even if objective conditions have not changed."
          },
          {
            type: "mech",
            text: "An <strong>increase in government spending</strong> (fiscal stimulus) directly raises the G component, shifting AD to the right; tax cuts increase disposable income, raising C."
          },
          {
            type: "mech",
            text: "A <strong>depreciation of the exchange rate</strong> makes exports cheaper and imports more expensive, improving net exports (X – M) and shifting AD right."
          }
        ]
      },
      {
        title: "FACTORS SHIFTING AD LEFT",
        items: [
          {
            type: "mech",
            text: "A <strong>rise in interest rates</strong> increases the cost of borrowing and the incentive to save, reducing C and I and shifting AD left."
          },
          {
            type: "imp",
            text: "A fall in <strong>house or share prices</strong> reduces household wealth, triggering a negative wealth effect that depresses consumption and shifts AD left.",
            tag: "exam"
          },
          {
            type: "mech",
            text: "<strong>Fiscal austerity</strong> (cuts to government spending or tax rises) directly reduces G and indirectly reduces C through lower disposable incomes, shifting AD left."
          },
          {
            type: "imp",
            text: "A <strong>recession in a major trading partner</strong> reduces demand for exports, worsening net exports and shifting AD left.",
            tag: "exam"
          },
          {
            type: "link",
            text: "AD shifts are the starting point for analysing changes in equilibrium price level and output on the AD/AS diagram; always state the direction of the shift and which component drives it."
          }
        ]
      }
    ],
    flow: {
      steps: ["Government cuts taxes", "Disposable income rises", "Consumption increases", "AD shifts right"],
      result: "Higher equilibrium output and price level (shown on AD/AS diagram)",
      resultType: "good"
    },
    examMatters: "Examiners reward students who trace a shift back to a specific AD component. Do not just say 'AD shifts right'; say 'AD shifts right because consumption rises due to higher disposable income from the tax cut'. This shows you understand the transmission mechanism.",
    takeaway: [
      "Always identify which AD component (C, I, G, X–M) is affected and why.",
      "Interest rate changes affect both C and I; exchange rate changes mainly affect (X–M).",
      "Confidence and expectations can shift AD even without any change in policy or fundamentals.",
      "Every AD shift question is really asking about the transmission mechanism from cause to spending."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 4: The Multiplier
   * ───────────────────────────────────────────────── */
  {
    title: "The Multiplier",
    meta: "5 concepts",
    keyIdea: "An initial injection of spending ripples through the economy as each person's spending becomes someone else's income, but leakages into saving, tax, and imports shrink each successive round.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Multiplier effect</strong> — the process by which an initial change in spending leads to a larger final change in national income, as the injection circulates through successive rounds of spending.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Marginal propensity to consume (MPC)</strong> — the proportion of each additional pound of income that households spend on domestically produced goods and services."
          },
          {
            type: "def",
            text: "<strong>Marginal propensity to withdraw (MPW)</strong> — the proportion of each additional pound of income that leaks out of the circular flow through saving (MPS), taxation (MPT), and imports (MPM)."
          }
        ]
      },
      {
        title: "HOW THE MULTIPLIER WORKS",
        items: [
          {
            type: "mech",
            text: "If the government spends £1bn on infrastructure, construction workers earn income, spend a fraction (MPC), which becomes income for shopkeepers, who spend a fraction, and so on through <strong>successive rounds</strong>."
          },
          {
            type: "mech",
            text: "The multiplier is larger when MPC is <strong>high</strong> (people spend most of extra income) and smaller when leakages through saving, tax, and imports are large."
          },
          {
            type: "imp",
            text: "The multiplier also works in <strong>reverse</strong>: a withdrawal of spending (e.g. government austerity) causes a larger fall in national income through the negative multiplier effect.",
            tag: "exam"
          },
          {
            type: "imp",
            text: "In open economies with high tax rates and high import propensities, the multiplier is <strong>relatively small</strong> because leakages at each round are substantial."
          },
          {
            type: "link",
            text: "The multiplier explains why fiscal policy can have a larger impact than the initial spending change; it amplifies both expansionary and contractionary fiscal decisions."
          }
        ]
      }
    ],
    formulas: [
      {
        label: "MULTIPLIER",
        text: "Multiplier = 1 ÷ (1 – MPC) = 1 ÷ MPW"
      },
      {
        label: "MPW",
        text: "MPW = MPS + MPT + MPM"
      }
    ],
    flow: {
      steps: ["Initial injection of £100m", "Workers spend (MPC × £100m)", "Their spending becomes others' income", "Process repeats with diminishing amounts"],
      result: "Final increase in national income = Injection × Multiplier",
      resultType: "good"
    },
    examMatters: "Examiners expect you to calculate the multiplier from MPC or MPW data, explain the process of successive rounds of spending, and evaluate its real-world size. Common calculation: if MPC = 0.8, multiplier = 1/(1-0.8) = 5, so £10m injection creates £50m rise in GDP.",
    misconception: "Students think the multiplier works instantly. Wrong because the multiplier process takes time as spending circulates through many rounds, and leakages at each stage mean the full effect may take months or years to materialise. Instead write: the multiplier is a process over time, not an instant result; real-world multipliers are smaller than theoretical ones due to time lags and variable MPC.",
    takeaway: [
      "The multiplier amplifies initial spending changes through successive rounds of income and spending.",
      "Multiplier = 1/(1–MPC) = 1/MPW; larger MPC means a bigger multiplier.",
      "Leakages (saving, tax, imports) reduce the multiplier at every round.",
      "The multiplier works in reverse too — spending cuts cause magnified falls in national income."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 5: The Accelerator Effect
   * ───────────────────────────────────────────────── */
  {
    title: "The Accelerator Effect",
    meta: "4 concepts",
    keyIdea: "Investment does not just respond to the level of demand but to the rate of change in demand, which is why small swings in consumer spending can trigger wild fluctuations in capital investment.",
    blocks: [
      {
        title: "THE PRINCIPLE",
        items: [
          {
            type: "def",
            text: "<strong>Accelerator effect</strong> — the theory that the level of net investment depends on the rate of change of national income (or output); when growth accelerates, investment rises more than proportionally.",
            tag: "exam"
          },
          {
            type: "mech",
            text: "If demand is growing at a <strong>steady rate</strong>, firms need a constant level of replacement investment; but if the rate of growth increases, firms must invest in additional capacity, causing net investment to surge."
          },
          {
            type: "mech",
            text: "Crucially, investment can fall even when demand is still <strong>rising</strong>, as long as the rate of increase slows down; this explains why investment is so much more volatile than consumption."
          },
          {
            type: "imp",
            text: "The accelerator means a small <strong>deceleration in GDP growth</strong> can trigger a significant drop in investment, potentially pushing the economy toward recession.",
            tag: "exam"
          }
        ]
      },
      {
        title: "LIMITATIONS AND LINKS",
        items: [
          {
            type: "mech",
            text: "The accelerator assumes firms are operating at <strong>full capacity</strong>; if there is spare capacity, rising demand can be met without new investment, weakening the accelerator effect."
          },
          {
            type: "mech",
            text: "Business <strong>confidence and expectations</strong> may override the mechanical accelerator relationship; firms may delay investment despite rising demand if they expect a downturn."
          },
          {
            type: "imp",
            text: "The accelerator and multiplier interact to create <strong>business cycles</strong>: rising investment (accelerator) boosts income (multiplier), which raises demand further (accelerator again), creating booms that eventually overshoot."
          },
          {
            type: "link",
            text: "The multiplier-accelerator interaction explains the cyclical nature of economies; examiners may ask you to explain how the two mechanisms reinforce each other in both upswings and downturns."
          }
        ]
      }
    ],
    flow: {
      steps: ["GDP growth rate increases", "Firms invest in new capacity (accelerator)", "Investment boosts incomes (multiplier)", "Incomes raise demand further"],
      result: "Multiplier-accelerator interaction amplifies the business cycle",
      resultType: "good"
    },
    examMatters: "Examiners expect you to explain why investment is so volatile by referencing the accelerator. The key insight is that investment depends on the rate of change of demand, not its level. Also evaluate limitations: spare capacity, confidence, and time lags all weaken the real-world accelerator.",
    misconception: "Students confuse the multiplier and accelerator. Wrong because the multiplier shows how spending changes amplify income, while the accelerator shows how income changes amplify investment. Instead write: the multiplier links spending to income; the accelerator links income growth to investment; together they explain business cycle amplification.",
    takeaway: [
      "The accelerator: investment depends on the rate of change of demand, not the level.",
      "Even slowing growth (not decline) can cause investment to fall, triggering volatility.",
      "The multiplier-accelerator interaction explains why economies experience boom-bust cycles.",
      "Spare capacity and low confidence weaken the accelerator in practice."
    ]
  }

];


/* ═══════════════════════════════════════════════════════════════
 *  2.3.3 — AGGREGATE SUPPLY
 *
 *  5 chapters: SRAS, LRAS, Macroeconomic Equilibrium,
 *  AD/AS Analysis of Events, Short-Run vs Long-Run Adjustment
 * ═══════════════════════════════════════════════════════════════ */

const NOTES_233 = [

  /* ─────────────────────────────────────────────────
   *  Chapter 1: Short-Run Aggregate Supply (SRAS)
   * ───────────────────────────────────────────────── */
  {
    title: "Short-Run Aggregate Supply (SRAS)",
    meta: "4 concepts",
    keyIdea: "In the short run, firms can adjust output but face rising costs as they push beyond normal capacity, which is why the SRAS curve slopes upward and why supply-side shocks hurt so much.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Short-run aggregate supply (SRAS)</strong> — the total output that all firms in an economy are willing and able to supply at each price level in the short run, when at least one factor of production (typically wages) is fixed.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Short run</strong> — the period in which at least one factor price (usually wages) is fixed by contract, so firms respond to price level changes by adjusting output rather than renegotiating input costs."
          }
        ]
      },
      {
        title: "SHAPE AND SHIFTS",
        items: [
          {
            type: "mech",
            text: "The SRAS curve slopes <strong>upward</strong> because higher price levels increase revenue relative to fixed costs (especially wages), making it profitable for firms to expand output in the short run."
          },
          {
            type: "mech",
            text: "SRAS shifts <strong>left</strong> (decreases) when costs of production rise: higher oil prices, rising wages, increased raw material costs, higher indirect taxes, or supply chain disruptions.",
            tag: "exam"
          },
          {
            type: "mech",
            text: "SRAS shifts <strong>right</strong> (increases) when costs fall: lower commodity prices, improved productivity, reduced regulation, subsidies to firms, or technological advances that cut unit costs."
          },
          {
            type: "imp",
            text: "A leftward shift of SRAS is particularly damaging because it simultaneously <strong>raises the price level and reduces output</strong>, a combination known as stagflation.",
            tag: "exam"
          },
          {
            type: "link",
            text: "SRAS shifts link to cost-push inflation from section 2.3.1; rising production costs shift SRAS left, raising prices and reducing output in the AD/AS model."
          }
        ]
      }
    ],
    flow: {
      steps: ["Oil prices spike", "Firms' costs of production rise", "SRAS shifts left", "Price level rises, output falls"],
      result: "Stagflation — the worst of both worlds for policymakers",
      resultType: "bad"
    },
    examMatters: "Examiners test whether you can explain why SRAS slopes upward (wages fixed in short run) and correctly identify factors that shift it. Always distinguish between movements along SRAS (caused by price level changes) and shifts of SRAS (caused by changes in production costs).",
    misconception: "Students say the SRAS slopes upward because firms want to charge higher prices. Wrong because the upward slope reflects the fact that higher price levels make production more profitable when wage costs are temporarily fixed, encouraging firms to supply more. Instead write: the SRAS slopes upward because rising prices increase profit margins when input costs are sticky, incentivising greater output.",
    takeaway: [
      "SRAS slopes upward because wages are fixed in the short run, so higher prices boost profit margins.",
      "Cost increases shift SRAS left (stagflation); cost decreases shift it right.",
      "Movements along SRAS are caused by price level changes; shifts are caused by cost changes.",
      "A leftward shift of SRAS causes stagflation — higher prices and lower output simultaneously."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 2: Long-Run Aggregate Supply (LRAS)
   * ───────────────────────────────────────────────── */
  {
    title: "Long-Run Aggregate Supply (LRAS)",
    meta: "5 concepts",
    keyIdea: "The battle between Classical and Keynesian economists over the shape of LRAS is really a battle over whether the economy self-corrects or needs government intervention to reach full employment.",
    blocks: [
      {
        title: "CLASSICAL VIEW",
        items: [
          {
            type: "def",
            text: "<strong>Long-run aggregate supply (LRAS) — Classical view</strong> — a vertical line at the full employment level of output (Yfe), reflecting the idea that in the long run, output is determined solely by supply-side factors, not the price level.",
            tag: "exam"
          },
          {
            type: "mech",
            text: "The Classical LRAS is vertical because in the long run, all factor prices (including wages) adjust fully to price level changes, so there is <strong>no money illusion</strong> and output returns to its natural rate."
          },
          {
            type: "mech",
            text: "The LRAS shifts right when the economy's <strong>productive capacity</strong> increases: more or better labour, capital, technology, or natural resources; improved education and infrastructure."
          },
          {
            type: "imp",
            text: "In the Classical model, demand-side policies can only change the <strong>price level</strong>, not long-run output; only supply-side policies shift LRAS and deliver sustained growth.",
            tag: "exam"
          }
        ]
      },
      {
        title: "KEYNESIAN VIEW",
        items: [
          {
            type: "def",
            text: "<strong>LRAS — Keynesian view</strong> — a curve with three distinct sections: perfectly elastic at low output (spare capacity), upward-sloping as the economy nears capacity, and vertical at full employment."
          },
          {
            type: "mech",
            text: "In the <strong>horizontal section</strong>, output can increase without any rise in prices because there are unemployed resources; demand-side stimulus works without causing inflation."
          },
          {
            type: "mech",
            text: "In the <strong>upward-sloping section</strong>, the economy approaches capacity; further increases in AD cause both output and prices to rise as bottlenecks emerge."
          },
          {
            type: "imp",
            text: "The Keynesian model justifies <strong>government intervention</strong> during recessions: if the economy is in the horizontal section, fiscal stimulus increases output with minimal inflation.",
            tag: "exam"
          },
          {
            type: "link",
            text: "The debate between Classical and Keynesian LRAS shapes the entire macro policy debate: Classical economists favour supply-side reforms; Keynesians argue demand management is also necessary."
          }
        ]
      }
    ],
    flow: {
      steps: ["Education and training improve", "Labour productivity rises", "Economy can produce more at every price level", "LRAS shifts right"],
      result: "Potential output increases — sustainable non-inflationary growth",
      resultType: "good"
    },
    examMatters: "Examiners expect you to draw both the Classical (vertical) and Keynesian (three-section) LRAS curves and explain the implications of each. Always state which model you are using and explain the policy implications: Classical = supply-side only; Keynesian = demand-side can work when there is spare capacity.",
    misconception: "Students think the Classical and Keynesian models contradict each other entirely. Wrong because both agree that LRAS is vertical at full employment; the disagreement is about whether the economy can get stuck below full employment for extended periods. Instead write: both models agree output is supply-determined at full employment; Keynesians argue the economy can remain below Yfe without intervention.",
    takeaway: [
      "Classical LRAS is vertical at Yfe; only supply-side factors determine long-run output.",
      "Keynesian LRAS has three sections: flat (spare capacity), upward (near capacity), vertical (full).",
      "LRAS shifts right through better education, technology, infrastructure, and labour supply.",
      "The model you choose determines whether demand-side policy can raise output or only prices."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 3: Macroeconomic Equilibrium
   * ───────────────────────────────────────────────── */
  {
    title: "Macroeconomic Equilibrium",
    meta: "4 concepts",
    keyIdea: "Where AD meets AS determines the price level and output of the entire economy, and every macroeconomic event can be analysed as a shift of one or both curves disrupting this equilibrium.",
    blocks: [
      {
        title: "EQUILIBRIUM",
        items: [
          {
            type: "def",
            text: "<strong>Macroeconomic equilibrium</strong> — the point where aggregate demand equals aggregate supply; the price level and real output are both determined simultaneously at this intersection.",
            tag: "exam"
          },
          {
            type: "mech",
            text: "Short-run equilibrium occurs where <strong>AD intersects SRAS</strong>; this determines the current price level and output, which may be above or below the full employment level."
          },
          {
            type: "mech",
            text: "Long-run equilibrium in the Classical model occurs where <strong>AD intersects both SRAS and LRAS</strong>; the economy is at full employment and there is no tendency for change."
          },
          {
            type: "imp",
            text: "If the economy is in short-run equilibrium but <strong>below full employment</strong>, there is a negative output gap with spare capacity and unemployment above the natural rate.",
            tag: "exam"
          }
        ]
      },
      {
        title: "CHANGES IN EQUILIBRIUM",
        items: [
          {
            type: "mech",
            text: "A rightward shift of AD (e.g. from a tax cut) moves equilibrium to <strong>higher output and a higher price level</strong> along the SRAS curve."
          },
          {
            type: "mech",
            text: "A leftward shift of SRAS (e.g. from an oil price shock) moves equilibrium to <strong>lower output and a higher price level</strong> — the stagflation outcome."
          },
          {
            type: "imp",
            text: "The extent to which an AD shift affects prices versus output depends on the <strong>slope of SRAS</strong>: flat = mostly output; steep = mostly prices.",
            tag: "exam"
          },
          {
            type: "link",
            text: "All macroeconomic policy analysis in Unit 2 uses the AD/AS framework; mastering how shifts create new equilibria is the single most important skill for macro exam questions."
          }
        ]
      }
    ],
    flow: {
      steps: ["AD shifts right (e.g. fiscal stimulus)", "Excess demand at old price level", "Firms raise prices and expand output", "New equilibrium: higher P, higher Y"],
      result: "Economy moves to a new short-run equilibrium with higher output and higher prices",
      resultType: "good"
    },
    examMatters: "Examiners expect you to draw a clear AD/AS diagram, label the original and new equilibrium, and explain the direction and cause of the shift. Always state whether the change affects the price level, real output, or both, and by how much depends on the slope of AS.",
    takeaway: [
      "Macroeconomic equilibrium is where AD = AS; it determines both price level and real output.",
      "AD shifts change output and prices; the split depends on the slope of SRAS.",
      "SRAS shifts cause stagflation (left shift) or non-inflationary growth (right shift).",
      "Every macro analysis question requires you to identify which curve shifts and in which direction."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 4: AD/AS Analysis of Macroeconomic Events
   * ───────────────────────────────────────────────── */
  {
    title: "AD/AS Analysis of Macroeconomic Events",
    meta: "5 concepts",
    keyIdea: "Real-world events like financial crises, oil shocks, and pandemics are not random chaos — they are demand-side or supply-side shocks that can be precisely mapped onto the AD/AS framework.",
    blocks: [
      {
        title: "DEMAND-SIDE SHOCKS",
        items: [
          {
            type: "def",
            text: "<strong>Demand-side shock</strong> — an unexpected event that causes a sudden shift in aggregate demand, either positive (rightward) or negative (leftward)."
          },
          {
            type: "mech",
            text: "A <strong>positive demand shock</strong> (e.g. a housing boom, consumer credit expansion, or fiscal stimulus) shifts AD right, raising output and the price level."
          },
          {
            type: "mech",
            text: "A <strong>negative demand shock</strong> (e.g. the 2008 financial crisis, a collapse in consumer confidence, or a major trading partner entering recession) shifts AD left, reducing output and potentially the price level."
          },
          {
            type: "imp",
            text: "Demand shocks affect output and employment first; the policy response is typically <strong>monetary or fiscal</strong> action to stabilise AD.",
            tag: "exam"
          }
        ]
      },
      {
        title: "SUPPLY-SIDE SHOCKS",
        items: [
          {
            type: "def",
            text: "<strong>Supply-side shock</strong> — an unexpected event that causes a sudden shift in aggregate supply, either positive (rightward) or negative (leftward)."
          },
          {
            type: "mech",
            text: "A <strong>negative supply shock</strong> (e.g. oil price spike, pandemic disrupting supply chains, natural disaster) shifts SRAS left, causing stagflation: higher prices with lower output."
          },
          {
            type: "mech",
            text: "A <strong>positive supply shock</strong> (e.g. discovery of new energy resources, breakthrough technology, sharp fall in commodity prices) shifts SRAS right, lowering prices while raising output."
          },
          {
            type: "imp",
            text: "Supply shocks are harder for policymakers to address because <strong>demand-side tools create trade-offs</strong>: stimulating AD to restore output worsens inflation from a supply shock.",
            tag: "exam"
          },
          {
            type: "link",
            text: "The 1970s oil crises are classic supply-side shocks; the 2008 financial crisis is a classic demand-side shock. Examiners expect you to classify real events correctly and analyse them using AD/AS."
          }
        ]
      }
    ],
    flow: {
      steps: ["Identify the shock (demand or supply)", "Determine direction (positive or negative)", "Shift the correct curve", "Analyse new equilibrium"],
      result: "Demand shocks: output and prices move together; Supply shocks: they move in opposite directions",
      resultType: "good"
    },
    examMatters: "Examiners give real-world scenarios and expect you to identify whether it is a demand or supply shock, shift the correct curve, draw the new equilibrium, and analyse the impact on output, employment, and the price level. Always state which AD component or cost factor is affected.",
    misconception: "Students treat all economic downturns as demand shocks. Wrong because supply-side shocks (like an oil crisis or pandemic) shift SRAS left, causing both rising prices and falling output simultaneously. Instead write: check whether prices and output move in the same direction (demand shock) or opposite directions (supply shock) to correctly diagnose the event.",
    takeaway: [
      "Demand shocks shift AD; prices and output move in the same direction.",
      "Supply shocks shift SRAS; prices and output move in opposite directions (stagflation risk).",
      "Always classify the shock type first, then shift the correct curve on your diagram.",
      "Supply shocks are harder to manage because demand-side responses create inflation-output trade-offs."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 5: Short-Run vs Long-Run Adjustment
   * ───────────────────────────────────────────────── */
  {
    title: "Short-Run vs Long-Run Adjustment",
    meta: "5 concepts",
    keyIdea: "Whether the economy heals itself or needs government medicine depends on whether you believe wages and prices adjust quickly (Classical) or can stay stuck for years (Keynesian).",
    blocks: [
      {
        title: "OUTPUT GAPS",
        items: [
          {
            type: "def",
            text: "<strong>Positive output gap</strong> — when actual GDP exceeds potential GDP (Yfe); the economy is overheating, demand outstrips capacity, and inflationary pressures build.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Negative output gap</strong> — when actual GDP is below potential GDP; there is spare capacity, unemployment above the natural rate, and downward pressure on prices."
          },
          {
            type: "mech",
            text: "Output gaps are measured as <strong>(Actual GDP – Potential GDP) ÷ Potential GDP × 100</strong>; a positive result signals inflationary pressure, a negative result signals recessionary conditions."
          }
        ]
      },
      {
        title: "SELF-CORRECTING MECHANISM",
        items: [
          {
            type: "mech",
            text: "Classical economists argue the economy <strong>self-corrects</strong>: if actual output is below Yfe, unemployment puts downward pressure on wages, costs fall, SRAS shifts right, and output returns to the natural rate.",
            tag: "exam"
          },
          {
            type: "mech",
            text: "With a positive output gap, wages are bid up by competing firms, costs rise, <strong>SRAS shifts left</strong>, and output falls back to the full employment level with a higher price level."
          },
          {
            type: "imp",
            text: "Keynesian economists argue wages are <strong>sticky downward</strong> (workers and unions resist nominal wage cuts), so the self-correcting mechanism is slow or may not work at all, justifying active government intervention.",
            tag: "exam"
          },
          {
            type: "imp",
            text: "The Classical view favours <strong>non-intervention</strong>; the Keynesian view favours fiscal and monetary stimulus to close negative output gaps more quickly than market forces alone."
          },
          {
            type: "link",
            text: "This debate underpins all macroeconomic policy questions: do you trust markets to self-correct (supply-side approach) or do you need government to manage demand (Keynesian approach)? Examiners reward balanced discussion of both views."
          }
        ]
      }
    ],
    formulas: [
      {
        label: "OUTPUT GAP",
        text: "Output gap = ((Actual GDP – Potential GDP) ÷ Potential GDP) × 100"
      }
    ],
    flow: {
      steps: ["Negative output gap exists", "Classical: wages fall → SRAS shifts right → Y returns to Yfe", "Keynesian: wages sticky → output stays below Yfe", "Policy choice depends on which view you adopt"],
      result: "Classical: self-correction restores full employment; Keynesian: intervention needed",
      resultType: "good"
    },
    examMatters: "Examiners expect you to explain both Classical and Keynesian views of adjustment and evaluate which is more realistic. Strong answers discuss the speed of adjustment: even if markets do self-correct, it may take years, during which unemployment causes real suffering — this is the Keynesian justification for intervention.",
    misconception: "Students present only one view (usually Keynesian) without acknowledging the other. Wrong because exam mark schemes reward balanced evaluation. Instead write: Classical economists argue markets self-correct through wage flexibility, but Keynesians counter that sticky wages mean this process is too slow, causing prolonged unemployment that justifies government intervention.",
    takeaway: [
      "Positive output gap = inflationary pressure; negative output gap = spare capacity and unemployment.",
      "Classical view: flexible wages allow SRAS to shift and restore equilibrium automatically.",
      "Keynesian view: sticky wages prevent self-correction, justifying fiscal and monetary intervention.",
      "Always present both views in exam answers and evaluate which is more realistic in context."
    ]
  }

];


/* ═══════════════════════════════════════════════════════════════
 *  RUNNER — push rich notes for all three sections to Supabase
 * ═══════════════════════════════════════════════════════════════ */

const SECTIONS = [
  { id: 'measures-economic-performance', label: '2.3.1 Measures of Economic Performance', notes: NOTES_231 },
  { id: 'aggregate-demand', label: '2.3.2 Aggregate Demand', notes: NOTES_232 },
  { id: 'aggregate-supply', label: '2.3.3 Aggregate Supply', notes: NOTES_233 },
];

async function main() {
  console.log('═══════════════════════════════════════════════');
  console.log('  ECONOMICS UNIT 2 Part 1 — Rich Notes Updater');
  console.log('  Sections: 3 | Format: rich blocks + flows');
  console.log('═══════════════════════════════════════════════\n');

  let allSuccess = true;
  for (const section of SECTIONS) {
    console.log(`\n── ${section.label} ──`);
    console.log(`   Section ID: ${section.id}`);
    console.log(`   Chapters:   ${section.notes.length}`);
    const totalBlocks = section.notes.reduce((sum, ch) => sum + ch.blocks.length, 0);
    const totalItems = section.notes.reduce((sum, ch) => sum + ch.blocks.reduce((s, b) => s + b.items.length, 0), 0);
    console.log(`   Blocks:     ${totalBlocks}`);
    console.log(`   Items:      ${totalItems}`);
    const { error } = await supabase.from('section_notes').update({ data: section.notes }).eq('section_id', section.id);
    if (error) { console.error(`   FAILED: ${error.message}`); allSuccess = false; continue; }
    console.log('   SUCCESS — pushed to Supabase.');
  }
  console.log(allSuccess ? '\n✅ All 3 sections updated.' : '\n⚠ Some sections failed.');
}
main();
