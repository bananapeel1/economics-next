/**
 * SECTION UPGRADE — Macroeconomic Objectives & Policies (Economics Unit 2)
 * ========================================================================
 * Edexcel IAL Economics Unit 2
 * Run with: node scripts/upgrade-content-economics-macro-policies.mjs
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL     || 'https://trweeckuswgkenckeqfb.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);

/* -- 1. SETTINGS ----------------------------------------------------------- */

const SECTION_SLUG = 'macroeconomic-objectives-policies';
const SUBJECT_ID   = 'economics';

/* -- 2. CONTENT ------------------------------------------------------------ */

const CONTENT = [

  /* ======= Block 1: Macroeconomic Objectives ======= */
  {
    title: "Macroeconomic Objectives",
    quizIndices: [0],
    sections: [
      {
        id: "economic-growth-objective",
        title: "Economic Growth",
        keyIdea: "Governments aim for steady, sustainable GDP growth because it raises living standards, creates jobs and generates tax revenue to fund public services.",
        body: [
          {
            type: "paragraph",
            text: "**Economic growth** is the most prominent macroeconomic objective. Governments typically target a sustainable rate of real GDP growth, often around 2-3% per year for developed economies. Growth at this pace creates jobs, raises incomes and generates the tax revenue needed to fund public services without triggering runaway inflation."
          },
          {
            type: "flow",
            steps: ["Sustainable GDP growth", "Rising incomes and employment", "Higher tax revenues"],
            result: "Improved living standards and fiscal flexibility",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "You should understand that governments do not simply want the highest possible growth rate. Growth that is too rapid creates inflationary pressure, environmental damage and financial instability. The aim is growth that is sustainable over the long term, balancing speed with stability."
          }
        ],
        realExample: {
          emoji: "🇬🇧",
          text: "**The UK government** has targeted around 2% annual growth as sustainable since the early 2000s. When growth fell below this during the 2010s productivity puzzle, it constrained public spending and contributed to political pressure over austerity and stagnant real wages."
        },
        misconception: "Students write that the growth objective is simply to maximise GDP. Governments aim for sustainable growth, not maximum growth, because excessively fast expansion creates inflation and instability. Instead write: the growth objective is to achieve a steady, sustainable rate of increase in real GDP that raises living standards without overheating the economy.",
        examMatters: "When discussing the growth objective, examiners want you to specify what sustainable growth means and why it matters. Link it to employment, tax revenue and living standards rather than just stating that GDP should rise.",
        recall: {
          type: "fillin",
          prompt: "Governments typically target around _____% annual growth for a developed economy to balance expansion with _____.",
          answer: "2-3 / stability"
        }
      },
      {
        id: "low-stable-inflation",
        title: "Low and Stable Inflation",
        keyIdea: "Most central banks target inflation of around 2% to keep prices predictable, protect purchasing power and give monetary policy room to act.",
        body: [
          {
            type: "paragraph",
            text: "**Low and stable inflation** is a core macroeconomic objective because unpredictable price rises erode purchasing power, distort business planning and redistribute wealth unfairly. Most advanced economies set an inflation target of around 2% per year, measured by the Consumer Price Index (CPI)."
          },
          {
            type: "paragraph",
            text: "You might wonder why the target is 2% rather than zero. A small positive rate of inflation gives central banks room to cut real interest rates during downturns, prevents the economy from slipping into deflation, and accommodates relative price changes across the economy without forcing absolute price falls in some sectors."
          },
          {
            type: "flow",
            steps: ["Inflation held near 2%", "Expectations anchored", "Firms and households plan with confidence"],
            result: "Stable economic environment for investment and spending",
            resultType: "good"
          }
        ],
        realExample: {
          emoji: "🇹🇷",
          text: "**Turkey** allowed inflation to surge past 80% in 2022 after the central bank cut interest rates despite rising prices. The collapse in the lira's purchasing power wiped out household savings and forced businesses to reprice daily, demonstrating how failing the inflation objective destroys economic stability."
        },
        misconception: "Students claim zero inflation would be ideal because prices would be completely stable. Zero inflation risks tipping into deflation, which discourages spending and increases the real burden of debt. Instead write: a small positive inflation target of around 2% is preferred because it avoids deflation risks and gives monetary policy room to manoeuvre.",
        examMatters: "Examiners often ask why the target is 2% rather than zero. You must explain the dangers of deflation, the need for monetary policy flexibility and the role of anchored inflation expectations. Simply stating that low inflation is good is insufficient.",
        recall: {
          type: "reorder",
          prompt: "Order the reasoning for a 2% inflation target:",
          items: ["Avoid deflation risks", "Anchor inflation expectations", "Give central bank room to cut real rates", "Maintain stable planning environment"]
        }
      },
      {
        id: "low-unemployment-objective",
        title: "Low Unemployment",
        keyIdea: "Reducing unemployment minimises wasted human potential, raises national output and reduces the social costs of poverty and exclusion.",
        body: [
          {
            type: "paragraph",
            text: "Governments aim to keep **unemployment** as low as possible because joblessness wastes human resources, reduces GDP below its potential and imposes heavy social costs. Unemployment leads to lost income, skills deterioration, mental health problems and increased government spending on welfare benefits."
          },
          {
            type: "flow",
            steps: ["Unemployment rises", "Output falls below potential", "Tax revenue drops, welfare spending rises"],
            result: "Higher fiscal deficit and lower living standards",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "You should understand that some unemployment is unavoidable and even healthy. **Frictional unemployment** occurs as workers move between jobs, and **structural unemployment** results from mismatches between worker skills and employer needs. The goal is to minimise involuntary unemployment, not to reach literally zero."
          },
          {
            type: "paragraph",
            text: "Full employment does not mean zero unemployment. It means the economy has reached the **natural rate of unemployment** where only frictional and structural unemployment remain. Cyclical unemployment, caused by insufficient demand during recessions, is the type governments most actively try to eliminate."
          }
        ],
        realExample: {
          emoji: "🇪🇸",
          text: "**Spain's** unemployment rate exceeded 26% in 2013, with youth unemployment above 55%. The enormous cost in lost output, social deprivation and emigration of skilled young workers demonstrated why reducing unemployment is such a critical policy priority for any government."
        },
        misconception: "Students write that the unemployment objective is to reach 0% unemployment. Full employment means reducing cyclical unemployment to zero, not eliminating all unemployment, because frictional and structural unemployment always exist. Instead write: the unemployment objective is to reach the natural rate where only frictional and structural unemployment remain.",
        examMatters: "When discussing unemployment, examiners expect you to distinguish between types of unemployment and explain which type a given policy addresses. Always link the unemployment objective to its economic cost in terms of lost output and fiscal pressure.",
        recall: {
          type: "fillin",
          prompt: "Full employment means reaching the _____ rate of unemployment where only _____ and structural unemployment remain.",
          answer: "natural / frictional"
        }
      },
      {
        id: "balance-of-payments",
        title: "Balance of Payments Equilibrium",
        keyIdea: "A sustainable balance of payments means the country is not building up unsustainable debts to the rest of the world from persistent trade deficits.",
        body: [
          {
            type: "paragraph",
            text: "The **balance of payments** records all economic transactions between a country and the rest of the world. The objective is to avoid a persistent and unsustainable **current account deficit**, which means the country is importing far more than it exports and must borrow from abroad to finance the gap."
          },
          {
            type: "flow",
            steps: ["Imports consistently exceed exports", "Current account deficit persists", "Country borrows from abroad"],
            result: "Rising external debt and vulnerability to capital flight",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "A small current account deficit is not necessarily a problem if it is financed by productive foreign investment. However, large and persistent deficits can indicate that the economy is uncompetitive, and the borrowing needed to fund them can become unsustainable."
          },
          {
            type: "paragraph",
            text: "You should note that this objective often conflicts with others. Policies that boost growth and reduce unemployment tend to suck in imports, worsening the current account. This is one of the key trade-offs in macroeconomic policy."
          }
        ],
        realExample: {
          emoji: "🇬🇷",
          text: "**Greece** ran persistent current account deficits exceeding 10% of GDP before the 2010 debt crisis. When foreign creditors lost confidence and stopped lending, Greece was forced into a severe austerity programme that slashed public spending and pushed unemployment above 27%."
        },
        misconception: "Students state that a current account deficit is always bad for an economy. A deficit financed by productive foreign investment that raises future export capacity can be beneficial. Instead write: current account deficits are problematic only when they are persistent, large and financed by unsustainable borrowing rather than productive investment.",
        examMatters: "Examiners expect you to explain why the BoP matters and how it conflicts with other objectives. Strong answers discuss the difference between a deficit financed by investment and one financed by borrowing, and evaluate whether a given deficit is sustainable.",
        recall: {
          type: "reorder",
          prompt: "Order the consequences of a persistent current account deficit:",
          items: ["Imports consistently exceed exports", "Country borrows increasingly from abroad", "External debt accumulates", "Risk of capital flight and currency crisis"]
        }
      },
      {
        id: "conflicts-between-objectives",
        title: "Conflicts Between Objectives",
        keyIdea: "Pursuing one macroeconomic objective often makes another harder to achieve, forcing governments into difficult policy trade-offs.",
        body: [
          {
            type: "paragraph",
            text: "The fundamental challenge of macroeconomic policy is that objectives frequently **conflict**. Policies designed to achieve one target can worsen performance on another. The most famous conflict is between **low unemployment and low inflation**: stimulating demand to reduce unemployment tends to push up prices."
          },
          {
            type: "paragraph",
            text: "Similarly, policies that boost economic growth often worsen the current account because higher incomes lead to more imports. Raising interest rates to control inflation can slow growth and increase unemployment. These trade-offs mean that governments cannot achieve all objectives simultaneously."
          },
          {
            type: "flow",
            steps: ["Government pursues one objective", "Policy affects multiple variables", "Other objectives worsen"],
            result: "Trade-offs force prioritisation and compromise",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "You should understand that the severity of these conflicts depends on the state of the economy. During a recession with low inflation, expansionary policy can reduce unemployment without much inflationary cost. Near full capacity, the trade-offs become much sharper."
          }
        ],
        realExample: {
          emoji: "🇬🇧",
          text: "**The Bank of England** faced a sharp conflict in 2022 when inflation exceeded 10% while growth stalled. Raising rates to fight inflation risked deepening the slowdown and increasing unemployment, but failing to act risked letting inflation become entrenched and eroding living standards further."
        },
        misconception: "Students list objectives without acknowledging conflicts, as if all can be achieved simultaneously. In reality, pursuing low unemployment often raises inflation, and pursuing growth often worsens the trade balance. Instead write: macroeconomic objectives inherently conflict, and governments must prioritise based on the economy's current conditions.",
        examMatters: "Evaluation questions almost always require you to discuss policy conflicts and trade-offs. Examiners reward answers that identify the specific conflict, explain the mechanism, and evaluate which objective should take priority given the economy's current circumstances.",
        recall: {
          type: "fillin",
          prompt: "The most famous policy conflict is between low _____ and low _____, illustrated by the Phillips curve.",
          answer: "unemployment / inflation"
        }
      }
    ],
    takeaway: [
      "The four main objectives: growth, low inflation, low unemployment, BoP balance.",
      "Full employment means the natural rate, not zero unemployment.",
      "The 2% inflation target avoids deflation while anchoring expectations.",
      "Objectives frequently conflict, forcing difficult trade-offs."
    ]
  },

  /* ======= Block 2: Fiscal Policy ======= */
  {
    title: "Fiscal Policy",
    quizIndices: [1],
    practiceIndices: [0],
    diagramRef: "fiscal-policy-ad",
    sections: [
      {
        id: "fiscal-policy-tools",
        title: "Fiscal Policy Tools",
        keyIdea: "Fiscal policy uses government spending and taxation to influence aggregate demand, the distribution of income and the allocation of resources.",
        body: [
          {
            type: "paragraph",
            text: "**Fiscal policy** is the use of **government spending** and **taxation** to influence the economy. It is set by the government, usually in an annual budget. Changes in tax rates affect disposable income and spending, while changes in government expenditure directly add to or reduce aggregate demand."
          },
          {
            type: "flow",
            steps: ["Government changes taxes or spending", "Disposable income or AD shifts", "Output and employment are affected"],
            result: "Fiscal policy influences the level of economic activity",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "Fiscal policy has two dimensions: **demand-side** and **supply-side**. On the demand side, increased government spending or tax cuts boost AD. On the supply side, targeted spending on education, infrastructure or R&D can shift LRAS right. The most effective fiscal strategies address both."
          },
          {
            type: "paragraph",
            text: "You should know that fiscal policy involves a **budget deficit** when spending exceeds tax revenue, and a **budget surplus** when tax revenue exceeds spending. Persistent deficits add to the national debt, which can become a constraint on future policy choices."
          }
        ],
        realExample: {
          emoji: "🇺🇸",
          text: "**The US government** passed a $1.9 trillion fiscal stimulus package in March 2021, combining direct payments to households with extended unemployment benefits. This massive injection of spending power shifted AD sharply rightward, accelerating the recovery but also contributing to the inflation surge that followed."
        },
        misconception: "Students describe fiscal policy as only about changing tax rates. Fiscal policy equally involves government spending decisions on public services, infrastructure and transfer payments. Instead write: fiscal policy encompasses both taxation and government spending, and changes to either side affect aggregate demand and the economy's productive capacity.",
        examMatters: "When discussing fiscal policy tools, examiners want you to specify whether the change is to taxation or spending, and whether it is expansionary or contractionary. Always connect the tool to its impact on AD using a clear chain of reasoning.",
        recall: {
          type: "reorder",
          prompt: "Order the fiscal policy transmission mechanism:",
          items: ["Government cuts income tax", "Households have higher disposable income", "Consumer spending rises", "AD shifts right and real GDP increases"]
        }
      },
      {
        id: "expansionary-contractionary-fiscal",
        title: "Expansionary and Contractionary Fiscal Policy",
        keyIdea: "Expansionary fiscal policy boosts AD through tax cuts or spending increases; contractionary policy reduces AD through tax rises or spending cuts.",
        body: [
          {
            type: "paragraph",
            text: "**Expansionary fiscal policy** involves increasing government spending, cutting taxes, or both. It injects more spending power into the economy, shifting AD to the right. Governments use it during recessions to boost demand, reduce unemployment and accelerate recovery."
          },
          {
            type: "flow",
            steps: ["Government increases spending or cuts taxes", "Disposable incomes rise", "AD shifts right"],
            result: "Output rises and unemployment falls",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "**Contractionary fiscal policy** involves cutting government spending, raising taxes, or both. It withdraws spending power from the economy, shifting AD to the left. Governments use it to cool an overheating economy, reduce inflation or bring a budget deficit under control."
          },
          {
            type: "paragraph",
            text: "You should recognise that the **multiplier effect** amplifies fiscal policy. An initial increase in government spending creates income for workers and suppliers, who spend a proportion of that income, creating further rounds of spending. The total increase in GDP exceeds the initial injection, though the size of the multiplier is debated."
          }
        ],
        realExample: {
          emoji: "🇬🇧",
          text: "**The UK's austerity programme** from 2010 was contractionary fiscal policy, cutting government spending to reduce the budget deficit. Critics argued this slowed the recovery and increased unemployment, while supporters claimed it restored fiscal credibility and prevented a debt crisis."
        },
        misconception: "Students treat expansionary fiscal policy as automatically effective at raising GDP. If the economy is near full capacity, the stimulus may cause inflation rather than growth, and government borrowing may crowd out private investment. Instead write: expansionary fiscal policy works best when there is spare capacity, but near full employment it risks inflation and crowding out.",
        examMatters: "Examiners often ask you to evaluate whether expansionary or contractionary fiscal policy is appropriate for a given economy. Your answer must depend on context: the size of the output gap, the level of government debt and the current rate of inflation all matter.",
        recall: {
          type: "fillin",
          prompt: "Expansionary fiscal policy shifts AD _____, while contractionary fiscal policy shifts AD _____.",
          answer: "right / left"
        }
      },
      {
        id: "automatic-stabilisers",
        title: "Automatic Stabilisers",
        keyIdea: "Tax revenues and welfare spending automatically adjust to smooth the business cycle without any deliberate government decision.",
        body: [
          {
            type: "paragraph",
            text: "**Automatic stabilisers** are features of the tax and welfare system that automatically counteract fluctuations in economic activity without any deliberate government intervention. During a recession, tax revenues fall because incomes and profits decline, while welfare spending rises because more people claim unemployment benefits. This automatically injects spending power into the economy."
          },
          {
            type: "flow",
            steps: ["Economy enters recession", "Tax revenues fall automatically", "Welfare spending rises automatically"],
            result: "AD is partially cushioned without any new policy decision",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "During a boom, the reverse happens. Rising incomes push people into higher tax brackets, increasing the government's tax take. Fewer people claim welfare benefits. This automatically withdraws spending power from the economy, dampening inflationary pressure without the government needing to act."
          },
          {
            type: "paragraph",
            text: "You should appreciate that automatic stabilisers reduce the severity of economic fluctuations but cannot eliminate them entirely. They work faster than discretionary fiscal policy because there is no legislative delay, but their effect is modest compared to deliberate policy interventions."
          }
        ],
        realExample: {
          emoji: "🇩🇰",
          text: "**Denmark's** generous welfare system acts as a powerful automatic stabiliser. During the 2008 recession, unemployment benefits replaced up to 90% of previous earnings, maintaining consumer spending far better than in countries with weaker safety nets and cushioning the downturn significantly."
        },
        misconception: "Students confuse automatic stabilisers with discretionary fiscal policy. Automatic stabilisers operate without any government decision; they are built into the existing tax and welfare system. Instead write: automatic stabilisers work through the existing structure of progressive taxes and welfare payments, requiring no new legislation or deliberate policy action.",
        examMatters: "Examiners test whether you understand the difference between automatic stabilisers and discretionary policy. Explain that stabilisers work through existing systems without policy lags, and evaluate their effectiveness by considering the size of the welfare state and the progressiveness of the tax system.",
        recall: {
          type: "reorder",
          prompt: "Order how automatic stabilisers work during a recession:",
          items: ["GDP falls and unemployment rises", "Tax revenues decline automatically", "Welfare spending increases automatically", "Fall in AD is partially cushioned"]
        }
      }
    ],
    takeaway: [
      "Fiscal policy uses government spending and taxation to manage AD.",
      "Expansionary = more spending or tax cuts; contractionary = the reverse.",
      "The multiplier amplifies fiscal policy but depends on spare capacity.",
      "Automatic stabilisers smooth cycles without deliberate policy action."
    ]
  },

  /* ======= Block 3: Monetary Policy ======= */
  {
    title: "Monetary Policy",
    quizIndices: [2],
    practiceIndices: [1],
    diagramRef: "monetary-policy-transmission",
    sections: [
      {
        id: "interest-rate-policy",
        title: "Interest Rates",
        keyIdea: "Central banks raise interest rates to cool inflation and cut them to stimulate spending, making borrowing cheaper or more expensive across the economy.",
        body: [
          {
            type: "paragraph",
            text: "**Monetary policy** is primarily conducted through changes in the **base interest rate** set by the central bank. In the UK, this is the Bank of England's Bank Rate. Changes in the base rate ripple through the economy because commercial banks adjust their own lending and saving rates in response."
          },
          {
            type: "flow",
            steps: ["Central bank cuts base rate", "Borrowing becomes cheaper", "Consumption and investment rise"],
            result: "AD shifts right and economic activity increases",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "When the central bank **raises** interest rates, borrowing becomes more expensive and saving becomes more rewarding. This reduces consumer spending on credit, discourages business investment and strengthens the exchange rate, all of which reduce AD. Higher rates are used to combat inflation."
          },
          {
            type: "paragraph",
            text: "You should know that interest rate changes take time to work through the economy. The **transmission mechanism** involves multiple channels: the cost of borrowing, the incentive to save, the exchange rate effect on exports and imports, and the wealth effect through asset prices. The full impact may take 12-18 months."
          }
        ],
        realExample: {
          emoji: "🇬🇧",
          text: "**The Bank of England** raised the base rate from 0.1% to 5.25% between December 2021 and August 2023 to combat inflation that had reached 11.1%. The sharp increases cooled demand but also raised mortgage costs for millions of households, illustrating the painful trade-offs of tight monetary policy."
        },
        misconception: "Students assume interest rate changes affect the economy immediately. In reality, the transmission mechanism has long and variable lags of 12-18 months, meaning the central bank must act based on forecasts of future inflation. Instead write: interest rate changes take 12-18 months to fully affect the economy, so central banks must anticipate future conditions rather than react to current data.",
        examMatters: "When explaining how interest rates affect the economy, examiners want you to trace the full transmission mechanism through at least two channels. Simply stating that lower rates boost spending is too vague. Explain the borrowing channel, the saving channel, the exchange rate channel or the asset price channel.",
        recall: {
          type: "fillin",
          prompt: "The full impact of an interest rate change takes approximately _____ months to work through the economy via the _____ mechanism.",
          answer: "12-18 / transmission"
        }
      },
      {
        id: "quantitative-easing",
        title: "Quantitative Easing",
        keyIdea: "When interest rates hit near-zero, central banks buy government bonds to inject money into the financial system and push down long-term borrowing costs.",
        body: [
          {
            type: "paragraph",
            text: "**Quantitative easing** (QE) is an unconventional monetary policy tool used when interest rates are already at or near zero and cannot be cut further. The central bank creates new money electronically and uses it to buy government bonds (and sometimes corporate bonds) from financial institutions."
          },
          {
            type: "flow",
            steps: ["Central bank creates new money", "Buys bonds from financial institutions", "Bond prices rise, yields fall"],
            result: "Long-term borrowing costs fall and money supply increases",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "QE works through several channels. By buying bonds, the central bank pushes up bond prices and reduces yields, which lowers long-term interest rates across the economy. Financial institutions that sell their bonds receive cash, which they can lend to businesses and households. Rising asset prices also create a wealth effect that boosts spending."
          },
          {
            type: "paragraph",
            text: "You should understand that QE is controversial. Critics argue it inflates asset prices disproportionately, benefiting wealthy asset owners and worsening inequality. There is also debate about whether the extra money reaches the real economy or simply circulates within the financial system."
          }
        ],
        realExample: {
          emoji: "🇬🇧",
          text: "**The Bank of England** purchased over 875 billion pounds of government bonds through QE between 2009 and 2021. While this helped keep borrowing costs low and supported the recovery, critics pointed out that rising house and share prices widened the wealth gap between asset owners and those without property or investments."
        },
        misconception: "Students describe QE as the government printing money to spend directly. QE involves the central bank buying bonds from financial markets, not directly funding government spending. Instead write: QE is the central bank purchasing bonds from financial institutions with newly created money, which lowers yields and increases the money supply through the banking system.",
        examMatters: "Examiners expect you to explain the mechanism of QE clearly: bond purchases, rising bond prices, falling yields, lower long-term rates. Evaluation marks come from discussing whether QE reaches the real economy effectively and whether its distributional effects are desirable.",
        recall: {
          type: "reorder",
          prompt: "Order the QE transmission mechanism:",
          items: ["Central bank creates electronic money", "Purchases government bonds from banks", "Bond prices rise and yields fall", "Long-term borrowing costs decrease across the economy"]
        }
      },
      {
        id: "monetary-transmission-mechanism",
        title: "The Transmission Mechanism",
        keyIdea: "Interest rate changes travel through borrowing costs, saving incentives, the exchange rate and asset prices before finally reaching output and inflation.",
        body: [
          {
            type: "paragraph",
            text: "The **monetary transmission mechanism** describes the chain of events through which a change in the base interest rate eventually affects real GDP and inflation. It operates through four main channels, each working at a different speed and with different effects on different sectors."
          },
          {
            type: "paragraph",
            text: "The **borrowing channel** is the most direct: higher rates make loans and mortgages more expensive, reducing consumption and investment. The **saving channel** works in reverse: higher rates reward saving, so households spend less. The **exchange rate channel** affects trade: higher rates attract foreign capital, strengthening the currency and making exports dearer."
          },
          {
            type: "flow",
            steps: ["Base rate changes", "Borrowing, saving, exchange rate and asset prices adjust", "AD shifts"],
            result: "Output and inflation respond with a 12-18 month lag",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "The **asset price channel** works through wealth effects. Higher rates tend to reduce house prices and share prices, making people feel less wealthy and reducing their willingness to spend. You should understand that the strength of each channel varies across economies depending on factors like homeownership rates and openness to trade."
          }
        ],
        realExample: {
          emoji: "🇺🇸",
          text: "**The Federal Reserve's** rate hikes in 2022-2023 worked heavily through the borrowing and asset price channels. Mortgage rates doubled from 3% to over 7%, freezing the housing market, while falling tech stock valuations reduced the wealth effect, both contributing to the gradual cooling of inflation."
        },
        misconception: "Students describe only one channel of monetary transmission and ignore the others. The transmission mechanism works through multiple simultaneous channels whose relative strength depends on the economy's structure. Instead write: the transmission mechanism operates through borrowing costs, saving incentives, the exchange rate and asset prices simultaneously, and the dominance of each channel varies by economy.",
        examMatters: "Examiners reward you for explaining at least two channels of the transmission mechanism in detail. For top marks, evaluate which channel is strongest in the given economy. For example, in a country with high homeownership, the asset price channel through house prices is particularly powerful.",
        recall: {
          type: "fillin",
          prompt: "The four channels of monetary transmission are: borrowing costs, saving incentives, the _____ rate and _____ prices.",
          answer: "exchange / asset"
        }
      }
    ],
    takeaway: [
      "Central banks use interest rates as the primary monetary policy tool.",
      "QE buys bonds to lower long-term rates when base rate hits near-zero.",
      "Transmission works through borrowing, saving, exchange rate and asset channels.",
      "Monetary policy operates with long lags of 12-18 months."
    ]
  },

  /* ======= Block 4: Supply-Side Policies ======= */
  {
    title: "Supply-Side Policies",
    quizIndices: [3],
    practiceIndices: [2],
    diagramRef: "supply-side-lras",
    sections: [
      {
        id: "market-based-supply-side",
        title: "Market-Based Supply-Side Policies",
        keyIdea: "Market-based policies remove government intervention to let free markets allocate resources more efficiently, boosting productivity and output.",
        body: [
          {
            type: "paragraph",
            text: "**Market-based supply-side policies** aim to increase the economy's productive capacity by reducing government intervention and letting market forces work more freely. They are based on the belief that markets allocate resources more efficiently than governments, and that removing barriers to enterprise and competition will boost output."
          },
          {
            type: "paragraph",
            text: "Key market-based policies include **deregulation** (removing rules that restrict business activity), **privatisation** (selling state-owned enterprises to the private sector), **trade liberalisation** (reducing tariffs and quotas), **tax cuts** (improving incentives to work and invest), and **labour market reforms** (reducing trade union power and making hiring and firing easier)."
          },
          {
            type: "flow",
            steps: ["Government reduces regulation and taxes", "Firms face fewer barriers and stronger incentives", "Investment and productivity rise"],
            result: "LRAS shifts right as productive capacity expands",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "You should understand that market-based policies can have downsides. Deregulation may reduce consumer protection. Labour market flexibility can increase job insecurity. Privatisation does not always improve efficiency, especially for natural monopolies. These trade-offs must be considered in evaluation."
          }
        ],
        realExample: {
          emoji: "🇬🇧",
          text: "**The UK under Thatcher** in the 1980s pursued aggressive market-based supply-side policies including privatisation of British Telecom and British Gas, deregulation of financial markets and trade union reforms. Productivity rose sharply in the long run, but the transition caused mass unemployment in traditional industries."
        },
        misconception: "Students present market-based policies as universally beneficial without acknowledging costs. Deregulation can harm consumers, labour market flexibility can increase inequality, and privatisation can fail for natural monopolies. Instead write: market-based supply-side policies can raise efficiency and productivity but may create losers, increase inequality and reduce protections that serve important social purposes.",
        examMatters: "When evaluating market-based policies, examiners want balanced analysis. Explain the efficiency gains but also discuss the distributional consequences, the time lag before benefits appear and whether the specific market in question is likely to function well without regulation.",
        recall: {
          type: "reorder",
          prompt: "Order these market-based supply-side policies from most to least direct:",
          items: ["Deregulation of a specific industry", "Cuts to corporation tax", "Labour market flexibility reforms", "Trade liberalisation"]
        }
      },
      {
        id: "interventionist-supply-side",
        title: "Interventionist Supply-Side Policies",
        keyIdea: "Interventionist policies use government spending and regulation to fix market failures and build the productive capacity markets alone would not create.",
        body: [
          {
            type: "paragraph",
            text: "**Interventionist supply-side policies** involve the government actively spending or regulating to improve the economy's productive potential. They are based on the view that markets alone underinvest in certain areas due to market failures, particularly in education, infrastructure, healthcare and research."
          },
          {
            type: "paragraph",
            text: "Key interventionist policies include **investment in education and training** (raising human capital), **infrastructure spending** (transport, broadband, energy networks), **subsidies for R&D** (encouraging innovation), **regional development grants** (reducing geographic inequality), and **industrial strategy** (targeting specific sectors for support)."
          },
          {
            type: "flow",
            steps: ["Government invests in education, infrastructure or R&D", "Human capital and productivity improve", "LRAS shifts right over time"],
            result: "Higher potential output with positive externalities",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "You should recognise that interventionist policies are expensive and take years to deliver results. There is also a risk of **government failure**: politicians may back the wrong industries, waste money on inefficient projects or create dependency on subsidies. Evaluation requires weighing the market failure being corrected against the risk of government failure."
          }
        ],
        realExample: {
          emoji: "🇫🇮",
          text: "**Finland** invested heavily in education reform from the 1970s onward, creating one of the world's highest-performing school systems. This interventionist approach raised human capital across the population, underpinning Finland's transformation into a high-productivity, innovation-driven economy."
        },
        misconception: "Students dismiss interventionist policies as wasteful government interference. When markets underinvest in education, infrastructure or research due to positive externalities, government intervention can genuinely raise long-run productivity. Instead write: interventionist policies address market failures where private returns are lower than social returns, though they must be evaluated against the risk of government failure.",
        examMatters: "Examiners expect you to compare market-based and interventionist approaches and evaluate which is more appropriate for a given context. Strong answers consider the type of market failure, the government's track record, the time horizon and the opportunity cost of public spending.",
        recall: {
          type: "fillin",
          prompt: "Interventionist supply-side policies address _____ failures where private investment is below the socially _____ level.",
          answer: "market / optimal"
        }
      },
      {
        id: "evaluating-supply-side",
        title: "Evaluating Supply-Side Policies",
        keyIdea: "Supply-side policies raise long-run capacity but work slowly, create winners and losers, and their success depends heavily on implementation quality.",
        body: [
          {
            type: "paragraph",
            text: "All supply-side policies share a common strength: if successful, they shift LRAS right, increasing potential output without generating inflation. This makes them the only route to permanently higher living standards. However, they also share common weaknesses that you must discuss in evaluation."
          },
          {
            type: "paragraph",
            text: "The biggest weakness is the **time lag**. Education reforms take a generation to fully feed through. Infrastructure projects take years to build. Even deregulation takes time to change business behaviour. This makes supply-side policies politically difficult because voters want results before the next election."
          },
          {
            type: "flow",
            steps: ["Supply-side policy implemented", "Long time lag before effects appear", "Benefits and costs emerge gradually"],
            result: "Evaluation depends on time horizon and distribution of gains",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "You should also discuss the **distributional effects**. Market-based policies can widen inequality by benefiting capital owners and skilled workers while hurting low-skilled workers and communities dependent on protected industries. Interventionist policies can be more equitable but risk waste and government failure. The best approach depends on context."
          }
        ],
        realExample: {
          emoji: "🇳🇿",
          text: "**New Zealand** underwent dramatic supply-side reforms in the 1980s and 1990s, combining deregulation, privatisation and trade liberalisation. Productivity eventually improved, but the transition was painful: unemployment rose sharply, inequality widened and rural communities suffered, sparking debate about whether the costs were justified."
        },
        misconception: "Students evaluate supply-side policies by simply listing advantages and disadvantages without reaching a judgement. Examiners want a conclusion that weighs the evidence and depends on context. Instead write: supply-side policies should be evaluated based on the specific market failure or inefficiency they address, the time horizon, the distributional consequences and the quality of implementation.",
        examMatters: "Top evaluation marks require you to reach a judgement about whether a supply-side policy is appropriate for the given economy. Consider: is there a genuine market failure? Does the government have the capacity to intervene effectively? Are the distributional consequences acceptable? Is the time lag manageable?",
        recall: {
          type: "reorder",
          prompt: "Order these evaluation criteria for supply-side policies by importance:",
          items: ["Is there a genuine market failure to correct?", "How long before benefits materialise?", "Who gains and who loses?", "Can the government implement it effectively?"]
        }
      }
    ],
    takeaway: [
      "Market-based policies reduce intervention; interventionist policies fix market failures.",
      "Both types shift LRAS right but work slowly and create winners and losers.",
      "Evaluation must weigh efficiency gains against distributional costs.",
      "The best approach depends on the specific market failure and government capacity."
    ]
  },

  /* ======= Block 5: Policy Conflicts and Trade-Offs ======= */
  {
    title: "Policy Conflicts and Trade-Offs",
    quizIndices: [4],
    practiceIndices: [3],
    diagramRef: "phillips-curve",
    sections: [
      {
        id: "phillips-curve",
        title: "The Phillips Curve",
        keyIdea: "The Phillips curve shows an inverse relationship between unemployment and inflation in the short run, presenting policymakers with a direct trade-off.",
        body: [
          {
            type: "paragraph",
            text: "The **Phillips curve** illustrates the short-run trade-off between unemployment and inflation. When unemployment is low, firms compete for scarce workers by raising wages, which pushes up costs and prices. When unemployment is high, there is less wage pressure and inflation tends to fall."
          },
          {
            type: "flow",
            steps: ["Government stimulates AD to reduce unemployment", "Labour market tightens", "Wages and prices rise"],
            result: "Lower unemployment achieved but at the cost of higher inflation",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "The original Phillips curve, based on UK data from 1861 to 1957, suggested a stable, predictable trade-off. Policymakers believed they could choose a preferred point on the curve: accepting slightly higher inflation in exchange for lower unemployment, or vice versa."
          },
          {
            type: "paragraph",
            text: "You should know that this simple relationship broke down in the 1970s when many countries experienced **stagflation**: rising inflation and rising unemployment simultaneously. This led economists to develop the expectations-augmented Phillips curve and the concept of the long-run Phillips curve."
          }
        ],
        realExample: {
          emoji: "🇬🇧",
          text: "**The UK in the 1970s** experienced stagflation with unemployment and inflation both exceeding 10%, contradicting the stable Phillips curve trade-off. The oil price shocks of 1973 and 1979 shifted the short-run Phillips curve outward, showing that supply shocks could worsen both variables simultaneously."
        },
        misconception: "Students present the Phillips curve as a permanent, stable trade-off between inflation and unemployment. The trade-off exists only in the short run; in the long run, expectations adjust and the curve shifts. Instead write: the Phillips curve trade-off holds in the short run, but adaptive expectations mean the curve shifts over time, and the long-run Phillips curve is vertical at the natural rate.",
        examMatters: "Phillips curve questions are among the most common in macroeconomics exams. You must be able to draw and explain both the short-run and long-run curves, and explain why the trade-off breaks down over time as expectations adjust to actual inflation.",
        recall: {
          type: "fillin",
          prompt: "The Phillips curve shows an inverse relationship between _____ and _____ in the short run.",
          answer: "unemployment / inflation"
        }
      },
      {
        id: "short-run-vs-long-run",
        title: "Short-Run vs Long-Run Trade-Offs",
        keyIdea: "In the short run, governments can trade inflation for unemployment, but in the long run, expectations adjust and the economy returns to the natural rate.",
        body: [
          {
            type: "paragraph",
            text: "The distinction between **short-run** and **long-run** trade-offs is crucial for understanding macroeconomic policy. In the short run, expansionary policy can reduce unemployment below the natural rate, but only by accepting higher inflation. Workers initially do not notice that real wages have not risen as much as nominal wages suggest."
          },
          {
            type: "paragraph",
            text: "In the **long run**, workers and firms adjust their expectations to the higher inflation rate. Workers demand higher nominal wages to maintain their real purchasing power. This pushes costs up further, and unemployment returns to the natural rate but at a higher level of inflation. The economy has moved to a higher short-run Phillips curve."
          },
          {
            type: "flow",
            steps: ["Government boosts AD to cut unemployment", "Inflation rises, expectations adjust", "Unemployment returns to natural rate at higher inflation"],
            result: "No long-run trade-off: only temporarily lower unemployment",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "You should understand that this is why supply-side policies are essential for permanently reducing unemployment. Only by lowering the natural rate through education, training and labour market reforms can the government achieve lower unemployment without triggering an inflationary spiral."
          }
        ],
        realExample: {
          emoji: "🇺🇸",
          text: "**The US Federal Reserve** under Paul Volcker raised interest rates to nearly 20% in the early 1980s to break entrenched inflation expectations. Unemployment rose sharply to 10.8%, but the painful strategy succeeded in reducing inflation from 13% to 3%, resetting expectations and allowing sustained growth through the 1990s."
        },
        misconception: "Students argue that governments can permanently reduce unemployment by accepting higher inflation. The expectations-augmented Phillips curve shows this only works temporarily because expectations adjust. Instead write: demand-side policy can temporarily reduce unemployment below the natural rate, but expectations adjustment returns it to the natural rate at a permanently higher inflation level.",
        examMatters: "Examiners test whether you understand the difference between short-run and long-run outcomes. Draw both the short-run and long-run Phillips curves and show how the economy moves when expectations adjust. This is one of the most frequently examined topics in macroeconomics.",
        recall: {
          type: "reorder",
          prompt: "Order the long-run adjustment process after expansionary policy:",
          items: ["AD boosted, unemployment falls below natural rate", "Inflation rises above expectations", "Workers demand higher nominal wages", "Unemployment returns to natural rate at higher inflation"]
        }
      },
      {
        id: "policy-trade-offs-evaluation",
        title: "Evaluating Policy Trade-Offs",
        keyIdea: "Effective policy depends on correctly diagnosing the economy's position, choosing the right tools and accepting that every choice involves sacrificing something else.",
        body: [
          {
            type: "paragraph",
            text: "The key lesson of macroeconomic policy is that **there are no costless solutions**. Every policy choice involves trade-offs, and the art of good policymaking is choosing the trade-off that causes the least harm given the current circumstances. Stimulating growth risks inflation. Controlling inflation risks unemployment. Improving the current account may require contractionary demand policy."
          },
          {
            type: "paragraph",
            text: "The appropriate policy response depends on the economy's position. During a deep recession with low inflation, the unemployment-inflation trade-off is relatively painless: expansionary policy boosts output with little inflationary cost. Near full capacity with rising inflation, the trade-off is severe: reducing inflation requires accepting higher unemployment."
          },
          {
            type: "flow",
            steps: ["Diagnose the economy's position", "Choose appropriate policy tools", "Accept the inevitable trade-offs"],
            result: "Best achievable outcome given constraints",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "You should also consider the **credibility** of policymakers. If the central bank is trusted to keep inflation low, it can act more aggressively during recessions because inflation expectations remain anchored. If credibility is weak, even modest stimulus can trigger an inflationary spiral as expectations adjust rapidly."
          }
        ],
        realExample: {
          emoji: "🇪🇺",
          text: "**The European Central Bank** faced an acute policy dilemma in 2022 as energy-driven inflation surged while growth weakened. Raising rates to fight inflation risked pushing fragile economies like Italy into recession, but failing to act risked losing credibility and de-anchoring inflation expectations across the entire eurozone."
        },
        misconception: "Students recommend policies without discussing trade-offs, as if the correct answer is obvious. Every macroeconomic policy involves sacrificing one objective to pursue another, and examiners expect you to acknowledge this. Instead write: good policy analysis identifies the trade-off involved, evaluates its severity given current economic conditions, and justifies why the chosen priority is appropriate.",
        examMatters: "The highest marks in macroeconomics require explicit discussion of trade-offs and a justified conclusion. Simply describing a policy is not enough. You must explain what is gained, what is sacrificed, and why the trade-off is acceptable given the economy's current position. This is the single most important skill for top-grade answers.",
        recall: {
          type: "fillin",
          prompt: "If the central bank has strong _____, it can act more aggressively during recessions because inflation _____ remain anchored.",
          answer: "credibility / expectations"
        }
      }
    ],
    takeaway: [
      "The Phillips curve shows a short-run trade-off between inflation and unemployment.",
      "In the long run, expectations adjust and the trade-off disappears.",
      "Supply-side policies are needed to permanently lower the natural rate.",
      "Every policy choice involves trade-offs; top answers always evaluate them."
    ]
  }

];

/* -- 3. VALIDATION --------------------------------------------------------- */

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

/* -- 4. PUSH --------------------------------------------------------------- */

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
