/**
 * SECTION UPGRADE — Economic Growth (Economics Unit 2)
 * =====================================================
 * Edexcel IAL Economics Unit 2
 * Run with: node scripts/upgrade-content-economics-growth.mjs
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL     || 'https://trweeckuswgkenckeqfb.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);

/* -- 1. SETTINGS ----------------------------------------------------------- */

const SECTION_SLUG = 'economic-growth';
const SUBJECT_ID   = 'economics';

/* -- 2. CONTENT ------------------------------------------------------------ */

const CONTENT = [

  /* ======= Block 1: Actual vs Potential Economic Growth ======= */
  {
    title: "Actual vs Potential Economic Growth",
    quizIndices: [0],
    diagramRef: "ad-as-growth",
    sections: [
      {
        id: "actual-economic-growth",
        title: "Actual Economic Growth",
        keyIdea: "Actual growth is the measured increase in real GDP over time, showing how much more the economy actually produced this year compared to last.",
        body: [
          {
            type: "paragraph",
            text: "**Actual economic growth** is the percentage increase in real GDP over a given period, usually a year. When you hear that \"the UK economy grew by 1.5% last year,\" that is actual growth. It measures the increase in the total output of goods and services that the economy genuinely produced."
          },
          {
            type: "flow",
            steps: ["Spare capacity exists", "AD increases", "Real GDP rises"],
            result: "Actual growth occurs as unused resources are put to work",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "Actual growth happens when the economy uses more of its existing resources. If there are unemployed workers or idle factories, an increase in aggregate demand can put these to work, raising output without needing the economy's capacity to expand."
          },
          {
            type: "paragraph",
            text: "You should understand that actual growth can happen without any change in the economy's productive potential. It simply means the economy is moving closer to its existing capacity."
          }
        ],
        realExample: {
          emoji: "🇬🇧",
          text: "**The UK economy** grew by 7.4% in 2021 after contracting sharply during the pandemic. This was largely actual growth as businesses reopened and workers returned to jobs that already existed, using capacity that had been idled by lockdowns."
        },
        misconception: "Students write that actual growth requires investment in new capital or technology. Actual growth simply means real GDP has risen, which can happen by employing spare capacity that already exists. Instead write: actual growth occurs when more of the economy's existing resources are utilised, often driven by rising aggregate demand.",
        examMatters: "Examiners expect you to distinguish actual from potential growth and link actual growth to a movement along the PPF or a shift of AD within existing LRAS. Drawing a clear AD/AS diagram with the shift labelled will strengthen your answer significantly.",
        recall: {
          type: "fillin",
          prompt: "Actual economic growth is the percentage increase in _____ over a given period.",
          answer: "real GDP"
        }
      },
      {
        id: "potential-economic-growth",
        title: "Potential Economic Growth",
        keyIdea: "Potential growth is an expansion of the economy's maximum productive capacity, meaning it could produce more even if it is not doing so right now.",
        body: [
          {
            type: "paragraph",
            text: "**Potential economic growth** is an increase in the productive capacity of the economy. It represents a rise in the maximum output the economy could achieve if all resources were fully employed. On an AD/AS diagram, potential growth is shown by a rightward shift of the LRAS curve."
          },
          {
            type: "flow",
            steps: ["Investment in capital or skills", "Technology improves", "LRAS shifts right"],
            result: "Economy can now produce more at every price level",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "Potential growth comes from improvements in the quantity or quality of factors of production. More workers entering the labour force, better education and training, advances in technology, and increases in the capital stock all expand the economy's productive potential."
          },
          {
            type: "paragraph",
            text: "You should note that potential growth does not guarantee actual growth. The economy's capacity may expand while actual output stays the same if demand is insufficient. Think of it as building a bigger factory but not yet filling orders to use it."
          }
        ],
        realExample: {
          emoji: "🇨🇳",
          text: "**China** invested heavily in infrastructure, education and technology between 2000 and 2020, expanding its productive capacity enormously. This potential growth underpinned decades of rapid actual GDP growth, taking hundreds of millions of people out of poverty."
        },
        misconception: "Students claim potential growth automatically raises living standards. Potential growth only raises capacity; living standards improve only when that capacity is actually used to produce more goods and services. Instead write: potential growth increases what the economy could produce, but actual living standards depend on whether that capacity is utilised.",
        examMatters: "When drawing diagrams for potential growth, always shift LRAS to the right and explain why. Examiners reward you for identifying the specific supply-side factor that caused the shift, whether that is investment, education, migration or technological change.",
        recall: {
          type: "reorder",
          prompt: "Put these in the correct order for potential economic growth:",
          items: ["Investment in capital or education", "Quality of factors of production improves", "LRAS shifts right", "Economy's maximum output increases"]
        }
      },
      {
        id: "relationship-actual-potential",
        title: "Linking Actual and Potential Growth",
        keyIdea: "Sustained long-run growth requires both types: demand-side stimulus for actual growth and supply-side improvement for potential growth.",
        body: [
          {
            type: "paragraph",
            text: "You need to understand how actual and potential growth work together. Actual growth on its own eventually hits a ceiling when spare capacity runs out. At that point, further increases in AD cause inflation rather than higher output. Potential growth raises that ceiling, making room for future actual growth."
          },
          {
            type: "flow",
            steps: ["Potential growth raises LRAS", "AD rises to fill new capacity", "Real GDP increases sustainably"],
            result: "Long-run growth without inflationary pressure",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "On a PPF diagram, actual growth is a movement from a point inside the curve toward the boundary. Potential growth is an outward shift of the entire curve. The ideal scenario for any economy is both happening together: expanding capacity while simultaneously using it."
          },
          {
            type: "paragraph",
            text: "Most exam questions require you to explain which type of growth a particular policy promotes. A tax cut that boosts consumer spending drives actual growth. A government programme that funds apprenticeships drives potential growth. The best policies target both."
          }
        ],
        realExample: {
          emoji: "🇰🇷",
          text: "**South Korea** combined heavy investment in education and technology with export-driven demand over several decades. This dual approach ensured potential capacity kept expanding while actual output grew to fill it, transforming Korea from one of the poorest nations to a high-income economy."
        },
        misconception: "Students treat actual and potential growth as separate topics that never interact. In reality, actual growth can fund potential growth through tax revenues and profits that finance investment. Instead write: actual and potential growth reinforce each other since higher output today generates the revenue to invest in tomorrow's capacity.",
        examMatters: "High-mark questions often ask you to evaluate whether demand-side or supply-side policies are more effective for growth. You must discuss both types of growth and explain that sustainable growth requires supply-side capacity expansion alongside demand-side stimulus.",
        recall: {
          type: "fillin",
          prompt: "On a PPF diagram, actual growth is a movement _____ the curve, while potential growth is an outward _____ of the curve.",
          answer: "toward / shift"
        }
      }
    ],
    takeaway: [
      "Actual growth is a rise in real GDP; potential growth is a rise in capacity.",
      "Actual growth uses spare capacity; potential growth creates new capacity.",
      "Sustainable long-run growth needs both demand-side and supply-side drivers.",
      "PPF: actual = move to boundary; potential = outward shift."
    ]
  },

  /* ======= Block 2: Output Gaps ======= */
  {
    title: "Output Gaps",
    quizIndices: [1],
    diagramRef: "output-gap-diagram",
    sections: [
      {
        id: "positive-output-gap",
        title: "Positive Output Gap",
        keyIdea: "A positive output gap means the economy is producing beyond its sustainable capacity, which puts upward pressure on prices.",
        body: [
          {
            type: "paragraph",
            text: "A **positive output gap** occurs when actual GDP exceeds potential GDP. The economy is producing more than its long-run sustainable level, which means resources are being overutilised. Workers are doing overtime, factories are running extra shifts, and labour markets are very tight."
          },
          {
            type: "flow",
            steps: ["AD exceeds LRAS", "Firms overuse capacity", "Wages and costs rise"],
            result: "Demand-pull inflation accelerates",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "You should recognise that a positive output gap is not necessarily a good thing despite the name. While unemployment is low and output is high, the overheating economy generates inflationary pressure. Firms compete for scarce workers by bidding up wages, and those higher costs are passed on to consumers."
          }
        ],
        realExample: {
          emoji: "🇺🇸",
          text: "**The US economy** in 2022 experienced a positive output gap as massive pandemic stimulus spending collided with supply constraints. Unemployment fell to 3.4% but inflation surged past 9%, forcing the Federal Reserve to raise interest rates aggressively."
        },
        misconception: "Students assume a positive output gap means the economy is performing well. Although output is high, the economy is unsustainably overheating and inflation is rising. Instead write: a positive output gap signals overheating where actual GDP exceeds potential GDP, creating inflationary pressure that requires corrective action.",
        examMatters: "When identifying a positive output gap, examiners want you to explain the consequences clearly: rising inflation, falling real wages, potential current account deterioration. Always link the gap to a specific policy response such as contractionary fiscal or monetary policy.",
        recall: {
          type: "fillin",
          prompt: "A positive output gap occurs when actual GDP _____ potential GDP, causing _____ pressure.",
          answer: "exceeds / inflationary"
        }
      },
      {
        id: "negative-output-gap",
        title: "Negative Output Gap",
        keyIdea: "A negative output gap means the economy is producing below its capacity, leaving workers unemployed and resources idle.",
        body: [
          {
            type: "paragraph",
            text: "A **negative output gap** occurs when actual GDP is below potential GDP. The economy has spare capacity: workers who want jobs cannot find them, factories sit partly empty, and businesses operate below their optimal output level."
          },
          {
            type: "flow",
            steps: ["AD falls below LRAS", "Spare capacity emerges", "Unemployment rises"],
            result: "Lost output and lower living standards",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "During a negative output gap, you see rising unemployment, falling consumer confidence and weak business investment. Firms may cut prices to attract scarce customers, which puts downward pressure on inflation. In severe cases, this can lead to deflation."
          },
          {
            type: "paragraph",
            text: "The policy response to a negative output gap typically involves expansionary measures. Governments may increase spending or cut taxes to boost AD, while central banks may lower interest rates or use quantitative easing to stimulate demand."
          }
        ],
        realExample: {
          emoji: "🇪🇺",
          text: "**The Eurozone** experienced a significant negative output gap during 2012-2013 following the sovereign debt crisis. Unemployment across the bloc exceeded 12%, and countries like Spain and Greece saw youth unemployment above 50%, representing enormous wasted productive potential."
        },
        misconception: "Students write that a negative output gap only affects unemployment. It also reduces government tax revenue, increases welfare spending, discourages investment and can trigger a deflationary spiral. Instead write: a negative output gap damages the economy through unemployment, lower tax revenue, higher welfare costs and the risk of deflation.",
        examMatters: "Examiners frequently present data showing an economy with spare capacity and ask you to recommend policies. You must identify the negative output gap, explain its consequences, and evaluate whether demand-side or supply-side policies would be most appropriate to close it.",
        recall: {
          type: "reorder",
          prompt: "Put these consequences of a negative output gap in logical order:",
          items: ["AD falls below potential output", "Spare capacity and unemployment rise", "Consumer spending falls further", "Government tax revenue declines"]
        }
      },
      {
        id: "output-gap-implications",
        title: "Implications for Policy",
        keyIdea: "The size and direction of the output gap tells policymakers whether they should stimulate the economy or cool it down.",
        body: [
          {
            type: "paragraph",
            text: "The output gap is a key indicator for policymakers because it signals whether the economy needs stimulating or restraining. A negative gap calls for expansionary policy to boost demand. A positive gap calls for contractionary policy to reduce inflationary pressure."
          },
          {
            type: "paragraph",
            text: "You should understand that measuring the output gap is difficult in practice because potential GDP cannot be directly observed. Economists must estimate it using statistical methods, and different estimates can lead to very different policy recommendations. This uncertainty makes policy decisions challenging."
          },
          {
            type: "flow",
            steps: ["Estimate the output gap", "Choose expansionary or contractionary policy", "Implement with appropriate time lag"],
            result: "Economy moves closer to potential output",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "There is always a trade-off in closing the gap. Closing a negative gap too aggressively risks overshooting into a positive gap and triggering inflation. Closing a positive gap too harshly risks plunging the economy into recession. Policymakers aim for a gradual return to potential output."
          }
        ],
        realExample: {
          emoji: "🇬🇧",
          text: "**The Bank of England** misjudged the output gap in 2021, initially believing inflation was transitory because spare capacity remained from the pandemic. When inflation proved persistent, the Bank had to raise rates more sharply than planned, illustrating how output gap miscalculation leads to policy errors."
        },
        misconception: "Students assume the output gap can be measured precisely and policies can close it exactly. In reality, potential GDP is estimated with significant uncertainty, and policy operates with time lags. Instead write: output gap estimates are uncertain, which means policy responses may overshoot or undershoot the intended target.",
        examMatters: "Evaluation marks come from discussing the difficulty of measuring the output gap and the risk of policy errors. Examiners reward you for noting that time lags, estimation uncertainty and political constraints all complicate the policy response to output gaps.",
        recall: {
          type: "fillin",
          prompt: "A negative output gap calls for _____ policy, while a positive output gap calls for _____ policy.",
          answer: "expansionary / contractionary"
        }
      }
    ],
    takeaway: [
      "Positive gap: actual GDP above potential, causing inflation.",
      "Negative gap: actual GDP below potential, causing unemployment.",
      "Policy aims to close the gap but estimation errors cause risk.",
      "Time lags and uncertainty make output gap policy imprecise."
    ]
  },

  /* ======= Block 3: The Business (Trade) Cycle ======= */
  {
    title: "The Business (Trade) Cycle",
    quizIndices: [2],
    practiceIndices: [0],
    diagramRef: "trade-cycle-diagram",
    sections: [
      {
        id: "boom-phase",
        title: "Boom",
        keyIdea: "A boom is the peak of the cycle where GDP growth is strong, unemployment is low and confidence is high, but inflation starts to build.",
        body: [
          {
            type: "paragraph",
            text: "A **boom** is a period of rapid economic growth where real GDP is rising significantly. During a boom, consumer spending is strong, business profits are high and unemployment falls to very low levels. Confidence is high across the economy, and firms invest heavily to meet rising demand."
          },
          {
            type: "flow",
            steps: ["High consumer confidence", "Strong spending and investment", "Labour market tightens"],
            result: "Wages rise and demand-pull inflation accelerates",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "However, you should recognise that booms carry risks. As the economy approaches full capacity, a positive output gap opens. Firms bid up wages to attract scarce workers, costs rise, and inflation accelerates. Asset prices like housing and shares may become inflated beyond their fundamental value."
          },
          {
            type: "paragraph",
            text: "Booms are not sustainable indefinitely. The inflationary pressure eventually forces central banks to raise interest rates, which chokes off demand and often triggers the next downturn."
          }
        ],
        realExample: {
          emoji: "🇮🇪",
          text: "**Ireland** experienced a dramatic boom between 2000 and 2007, with GDP growth averaging over 6% and unemployment falling to 4%. However, the boom was fuelled by a housing bubble and excessive bank lending, and when it burst, Ireland suffered one of the deepest recessions in Europe."
        },
        misconception: "Students describe booms as entirely positive because GDP is growing and unemployment is low. A boom creates inflationary pressure, asset bubbles and unsustainable borrowing that often lead to a painful bust. Instead write: booms raise output and employment in the short run but create inflationary and financial risks that can trigger a severe downturn.",
        examMatters: "When analysing a boom, examiners want you to discuss both the benefits and the risks. Strong answers explain how the positive output gap creates inflation and why central banks typically respond by raising interest rates, linking the boom to the next phase of the cycle.",
        recall: {
          type: "reorder",
          prompt: "Order the events during a boom phase:",
          items: ["Consumer confidence rises", "Spending and investment increase rapidly", "Unemployment falls and wages rise", "Inflation accelerates as output gap turns positive"]
        }
      },
      {
        id: "recession-phase",
        title: "Recession",
        keyIdea: "A recession is two consecutive quarters of negative GDP growth, bringing rising unemployment, falling confidence and business failures.",
        body: [
          {
            type: "paragraph",
            text: "A **recession** is technically defined as two consecutive quarters of falling real GDP. During a recession, output declines, businesses see falling revenues and many are forced to lay off workers or close entirely. Consumer confidence collapses, and spending falls further in a self-reinforcing downward spiral."
          },
          {
            type: "flow",
            steps: ["AD falls sharply", "Firms cut output and jobs", "Incomes fall, spending drops more"],
            result: "Negative multiplier deepens the downturn",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "Recessions cause significant economic and social harm. Unemployment rises, government tax revenues fall while welfare spending increases, and inequality often worsens as the most vulnerable workers lose their jobs first. Business investment collapses because firms see no reason to expand capacity when demand is shrinking."
          },
          {
            type: "paragraph",
            text: "You should understand that recessions can vary enormously in severity and duration. A mild recession might last six months with GDP falling by 1%, while a deep recession like 2008-2009 can see GDP fall by 5% or more and take years to recover from."
          }
        ],
        realExample: {
          emoji: "🌍",
          text: "**The Global Financial Crisis** of 2008-2009 triggered the deepest worldwide recession since the 1930s. The UK economy contracted by 6%, unemployment rose above 8%, and government debt roughly doubled as tax revenues collapsed and bailout costs soared."
        },
        misconception: "Students write that recessions are always caused by demand falling. Some recessions are triggered by supply-side shocks such as oil price spikes or pandemics that reduce productive capacity. Instead write: recessions can be demand-driven or supply-driven, and the cause determines the appropriate policy response.",
        examMatters: "When discussing recessions, examiners expect you to explain the multiplier effect that deepens the downturn and to evaluate appropriate policy responses. Always consider whether fiscal or monetary policy is more suitable given the specific circumstances of the recession.",
        recall: {
          type: "fillin",
          prompt: "A recession is technically defined as _____ consecutive quarters of _____ real GDP.",
          answer: "two / falling"
        }
      },
      {
        id: "recovery-phase",
        title: "Recovery and Stages of the Cycle",
        keyIdea: "Recovery is when GDP starts growing again after a recession, and the full cycle repeats as the economy moves through boom, downturn, recession and recovery.",
        body: [
          {
            type: "paragraph",
            text: "**Recovery** is the phase where real GDP begins to grow again after a recession. Consumer confidence gradually returns, spending increases and businesses start hiring again. The recovery phase typically begins slowly because it takes time for confidence to rebuild after a downturn."
          },
          {
            type: "flow",
            steps: ["Policy stimulus boosts AD", "Confidence returns gradually", "Output and employment rise"],
            result: "Economy moves back toward potential output",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "The full business cycle has four phases: **boom** (peak output, low unemployment, rising inflation), **downturn** (growth slows, confidence falls), **recession** (output contracts, unemployment rises), and **recovery** (growth resumes, spare capacity absorbed). The cycle then repeats, though each cycle differs in length and severity."
          },
          {
            type: "paragraph",
            text: "You should know that governments and central banks try to smooth the cycle by using counter-cyclical policies. They stimulate the economy during recessions and cool it during booms. However, time lags and political pressures mean that policy intervention is often imperfect, sometimes even destabilising."
          }
        ],
        realExample: {
          emoji: "🇺🇸",
          text: "**The US recovery** after the 2008 financial crisis was the longest in recorded history, lasting over a decade until the pandemic hit in 2020. However, it was unusually slow, with GDP growth averaging only 2.3% compared to 3.6% in previous recoveries, partly because consumer caution and tight bank lending held back spending."
        },
        misconception: "Students assume recovery means the economy is back to normal. Recovery simply means GDP is growing again; it may take years before output returns to its pre-recession level and unemployment falls back to normal. Instead write: recovery is the phase of renewed growth, but the economy may still be operating well below its pre-recession peak for an extended period.",
        examMatters: "Examiners test whether you can identify which phase of the cycle an economy is in from data and recommend appropriate policies. You should link each phase to its key characteristics: output growth rate, unemployment trend, inflation pressure and confidence indicators.",
        recall: {
          type: "reorder",
          prompt: "Put the four phases of the business cycle in order:",
          items: ["Boom", "Downturn", "Recession", "Recovery"]
        }
      }
    ],
    takeaway: [
      "Boom: high growth but inflation risks; recession: falling GDP and rising unemployment.",
      "Recovery begins slowly as confidence rebuilds after a downturn.",
      "Counter-cyclical policy aims to smooth the cycle but faces time lags.",
      "Each cycle differs in length, severity and underlying causes."
    ]
  },

  /* ======= Block 4: Causes of Economic Growth ======= */
  {
    title: "Causes of Economic Growth",
    quizIndices: [3],
    practiceIndices: [1],
    diagramRef: "ad-as-shifts",
    sections: [
      {
        id: "demand-side-causes",
        title: "Demand-Side Causes",
        keyIdea: "Growth driven by rising aggregate demand uses up spare capacity quickly but cannot sustain growth once the economy reaches full employment.",
        body: [
          {
            type: "paragraph",
            text: "**Demand-side causes** of economic growth involve increases in the components of aggregate demand: consumption (C), investment (I), government spending (G) and net exports (X-M). When any of these rise, AD shifts right, and if the economy has spare capacity, real GDP increases."
          },
          {
            type: "flow",
            steps: ["C, I, G or (X-M) rises", "AD shifts right", "Firms increase output to meet demand"],
            result: "Real GDP rises and unemployment falls",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "Common demand-side drivers include rising consumer confidence, lower interest rates that encourage borrowing, expansionary fiscal policy, a weaker exchange rate that boosts exports, and rising house prices that create a wealth effect. Each works by putting more spending power into the economy."
          },
          {
            type: "paragraph",
            text: "You should understand the key limitation: demand-side growth has a ceiling. Once the economy reaches full capacity, further AD increases cause inflation rather than higher output. This is why demand-side growth alone cannot sustain long-run economic expansion."
          }
        ],
        realExample: {
          emoji: "🇦🇺",
          text: "**Australia** went 28 years without a recession from 1991 to 2019, partly because strong demand from China for Australian commodities kept export revenue high. This demand-side boost sustained growth, but it left Australia vulnerable when Chinese demand eventually slowed."
        },
        misconception: "Students claim demand-side growth is always inflationary. If the economy has significant spare capacity, rising AD increases output without pushing up prices. Instead write: demand-side growth only becomes inflationary when the economy is operating at or near full capacity, so the impact depends on the starting point.",
        examMatters: "When explaining demand-side growth, examiners want you to specify which component of AD has changed and why. Vague statements like 'AD increased' score poorly. You should identify whether it was consumption, investment, government spending or net exports, and explain the underlying cause.",
        recall: {
          type: "fillin",
          prompt: "The components of aggregate demand are C (consumption), I (investment), G (government spending) and _____ (net exports).",
          answer: "X-M"
        }
      },
      {
        id: "supply-side-causes",
        title: "Supply-Side Causes",
        keyIdea: "Growth driven by expanding productive capacity shifts LRAS right, allowing the economy to produce more without generating inflation.",
        body: [
          {
            type: "paragraph",
            text: "**Supply-side causes** of growth increase the economy's productive potential by improving the quantity or quality of factors of production. These include investment in physical capital, improvements in human capital through education and training, technological innovation and institutional reforms that improve efficiency."
          },
          {
            type: "flow",
            steps: ["Investment in capital, education or technology", "Productivity rises", "LRAS shifts right"],
            result: "Higher potential output at every price level",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "Supply-side growth is crucial for long-run prosperity because it raises the speed limit of the economy. Without it, any attempt to grow faster through demand-side stimulus eventually runs into inflationary bottlenecks. Countries with strong supply-side fundamentals can sustain higher growth rates over decades."
          },
          {
            type: "paragraph",
            text: "You should recognise that supply-side improvements take time. Building infrastructure, educating workers and developing new technologies are slow processes. The benefits may not appear for years, which makes supply-side policies politically difficult to pursue when voters want immediate results."
          }
        ],
        realExample: {
          emoji: "🇸🇬",
          text: "**Singapore** transformed from a low-income port city to one of the world's richest countries by investing relentlessly in education, infrastructure and technology. Its productivity-focused supply-side strategy raised LRAS continuously, allowing sustained growth without persistent inflationary pressure."
        },
        misconception: "Students list supply-side causes without distinguishing between quantity and quality of resources. An economy can grow by adding more workers or by making existing workers more productive, and the implications are very different. Instead write: supply-side growth comes from increasing either the quantity of resources or their quality through productivity improvements, with the latter being more sustainable.",
        examMatters: "Examiners often ask you to compare demand-side and supply-side causes of growth. You score highly by explaining that demand-side growth is quicker but limited by capacity, while supply-side growth is slower but raises the economy's long-run potential without inflation.",
        recall: {
          type: "reorder",
          prompt: "Order these supply-side causes from quickest to slowest effect:",
          items: ["Deregulation of labour markets", "Investment in new machinery", "Education and skills reform", "Major infrastructure projects"]
        }
      }
    ],
    takeaway: [
      "Demand-side growth shifts AD right but hits capacity limits.",
      "Supply-side growth shifts LRAS right, raising potential output.",
      "Sustainable growth requires both demand and supply-side drivers.",
      "Supply-side policies are slow but raise the economy's speed limit."
    ]
  },

  /* ======= Block 5: Costs and Benefits of Economic Growth ======= */
  {
    title: "Costs and Benefits of Economic Growth",
    quizIndices: [4],
    practiceIndices: [2],
    sections: [
      {
        id: "benefits-growth",
        title: "Benefits of Economic Growth",
        keyIdea: "Growth raises living standards by increasing real incomes, funding public services and creating employment opportunities across the economy.",
        body: [
          {
            type: "paragraph",
            text: "The primary benefit of economic growth is higher **real incomes** and improved **living standards**. When GDP rises, there are more goods and services available for the population. Higher incomes allow people to consume more, save more and enjoy a better quality of life."
          },
          {
            type: "flow",
            steps: ["Real GDP rises", "Incomes and tax revenues increase", "Government funds better services"],
            result: "Higher living standards and reduced poverty",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "Growth also generates higher **tax revenues** without raising tax rates, allowing governments to spend more on healthcare, education and infrastructure. Faster growth reduces **unemployment** because firms need more workers to produce rising output, which reduces poverty and social deprivation."
          },
          {
            type: "paragraph",
            text: "You should note that growth also boosts **business confidence** and encourages investment. When firms expect rising demand, they invest in new capacity, which creates a virtuous cycle of growth, investment and further growth."
          }
        ],
        realExample: {
          emoji: "🇮🇳",
          text: "**India's** economic growth averaging over 6% annually since 2000 has lifted an estimated 270 million people out of extreme poverty. Rising GDP funded massive expansions in electrification, road building and digital infrastructure that transformed daily life for hundreds of millions."
        },
        misconception: "Students assume economic growth automatically benefits everyone equally. Growth can widen inequality if the gains are concentrated among the wealthy, skilled workers or specific regions. Instead write: growth raises overall living standards but the distribution of gains depends on government policy, labour market structure and access to education.",
        examMatters: "When discussing benefits of growth, examiners expect you to go beyond simply stating that GDP rises. Explain the mechanism through which growth improves welfare: higher incomes, more employment, better public services funded by rising tax revenues.",
        recall: {
          type: "fillin",
          prompt: "Economic growth raises tax revenues without raising tax _____, allowing more spending on public _____.",
          answer: "rates / services"
        }
      },
      {
        id: "costs-growth-environment",
        title: "Environmental and Social Costs",
        keyIdea: "Growth often degrades the environment through pollution and resource depletion, and can worsen inequality if gains are not shared fairly.",
        body: [
          {
            type: "paragraph",
            text: "Economic growth frequently comes at a significant **environmental cost**. Increased production means more energy consumption, more industrial emissions and more natural resource depletion. Climate change, air pollution and deforestation are all linked to rapid industrialisation and GDP growth."
          },
          {
            type: "flow",
            steps: ["Output rises rapidly", "Resource use and emissions increase", "Environmental degradation worsens"],
            result: "Long-run sustainability is threatened",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "Growth can also worsen **income inequality**. If the benefits flow mainly to capital owners, highly skilled workers or certain regions, the gap between rich and poor widens. This can create social tension, reduce social mobility and undermine the wellbeing gains that GDP growth is supposed to deliver."
          },
          {
            type: "paragraph",
            text: "You should understand the distinction between GDP growth and genuine improvements in **welfare**. GDP does not account for environmental damage, unpaid caring work, mental health or leisure time. A country can have rising GDP while its citizens feel no happier or more secure."
          }
        ],
        realExample: {
          emoji: "🇨🇳",
          text: "**China's** rapid growth lifted incomes dramatically but made it the world's largest carbon emitter and left many cities with dangerously polluted air. The government now spends billions on environmental remediation, illustrating how the costs of growth can accumulate and require expensive correction."
        },
        misconception: "Students claim growth is always bad for the environment. Green technologies, renewable energy and efficiency improvements allow economies to grow while reducing environmental impact. Instead write: growth can be environmentally damaging, but sustainable growth is possible when combined with green investment, regulation and technological innovation.",
        examMatters: "Evaluation marks require you to discuss whether growth is sustainable. Examiners reward you for distinguishing between growth that depletes resources and growth that invests in clean technology. Always consider whether the country has policies in place to manage the environmental costs.",
        recall: {
          type: "reorder",
          prompt: "Order these costs of growth from most immediate to most long-term:",
          items: ["Rising pollution levels", "Resource depletion", "Widening income inequality", "Climate change impacts"]
        }
      },
      {
        id: "growth-living-standards",
        title: "Growth and Living Standards",
        keyIdea: "GDP per capita is a useful but incomplete measure of living standards because it ignores distribution, quality of life and sustainability.",
        body: [
          {
            type: "paragraph",
            text: "Economists typically use **real GDP per capita** as a proxy for living standards. By dividing total output by population, you get a rough measure of how much output is available per person. Rising real GDP per capita generally indicates improving material living standards."
          },
          {
            type: "paragraph",
            text: "However, GDP per capita has significant limitations. It says nothing about the **distribution** of income, so a high average can mask extreme poverty alongside extreme wealth. It does not capture **non-material** aspects of wellbeing such as health, education quality, environmental cleanliness or personal safety."
          },
          {
            type: "flow",
            steps: ["GDP per capita rises", "Average material standard improves", "But distribution and quality of life may not"],
            result: "GDP is a necessary but insufficient measure of welfare",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "Alternative indicators such as the **Human Development Index** (HDI), which combines income, education and life expectancy, or the **Inequality-adjusted HDI** give a more rounded picture. You should be prepared to discuss why GDP alone can be misleading when evaluating whether growth has genuinely improved people's lives."
          }
        ],
        realExample: {
          emoji: "🇧🇹",
          text: "**Bhutan** deliberately prioritises Gross National Happiness over GDP growth, measuring progress through psychological wellbeing, health, education and environmental quality. Despite modest GDP per capita, Bhutan scores well on life satisfaction, challenging the assumption that GDP growth is the only path to welfare."
        },
        misconception: "Students equate rising GDP with rising living standards without qualification. GDP per capita can rise while inequality worsens, the environment degrades and mental health declines. Instead write: GDP per capita is a useful starting point but must be supplemented with measures of distribution, sustainability and non-material wellbeing.",
        examMatters: "Examiners frequently ask whether economic growth necessarily improves living standards. Top answers evaluate both sides: growth provides resources but its benefits depend on distribution, sustainability and whether non-material welfare is also improving. Always mention at least one alternative indicator.",
        recall: {
          type: "fillin",
          prompt: "The HDI combines three measures: income, _____ and _____.",
          answer: "education / life expectancy"
        }
      }
    ],
    takeaway: [
      "Growth raises incomes, employment and tax revenues.",
      "Environmental damage and rising inequality are key costs.",
      "GDP per capita is useful but ignores distribution and wellbeing.",
      "Sustainable growth balances output gains with environmental care."
    ]
  },

  /* ======= Block 6: Economic Growth and AD/AS Analysis ======= */
  {
    title: "Economic Growth and AD/AS Analysis",
    quizIndices: [5],
    diagramRef: "ad-as-growth-analysis",
    sections: [
      {
        id: "ad-shifts-growth",
        title: "AD Shifts and Short-Run Growth",
        keyIdea: "A rightward shift of AD increases real output in the short run, but the effect on prices depends on how close the economy is to full capacity.",
        body: [
          {
            type: "paragraph",
            text: "On an AD/AS diagram, short-run economic growth is shown by a rightward shift of the AD curve. This could result from a rise in consumer spending, increased government expenditure, higher investment or improved net exports. The new equilibrium shows higher real GDP."
          },
          {
            type: "flow",
            steps: ["Component of AD increases", "AD shifts right", "New equilibrium at higher real GDP"],
            result: "Short-run growth achieved through demand stimulus",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "The crucial insight is that the impact on the price level depends on the economy's starting position. If there is significant spare capacity, the AD shift mostly raises output with little inflation. If the economy is near full capacity, the same AD shift mostly raises prices with little output gain."
          },
          {
            type: "paragraph",
            text: "You should practise drawing this diagram clearly. Label the original and new AD curves, mark the original and new equilibrium points, and show clearly whether the price level has risen, fallen or stayed the same. Diagram quality directly affects your mark."
          }
        ],
        realExample: {
          emoji: "🇯🇵",
          text: "**Japan's** government launched massive fiscal stimulus packages totalling over 100 trillion yen after 2012 under Abenomics. The rightward AD shift increased real GDP modestly, but because Japan had persistent spare capacity, inflation remained stubbornly below the 2% target."
        },
        misconception: "Students draw AD shifting right and assume both output and prices always rise equally. The split between output and price effects depends entirely on how much spare capacity exists. Instead write: when AD shifts right with significant spare capacity, most of the effect falls on output; near full capacity, most falls on the price level.",
        examMatters: "Diagram-based questions on AD shifts are extremely common. Examiners reward correctly drawn and fully labelled diagrams that show the starting point, the shift, and the new equilibrium. Always write a sentence explaining what caused the shift and what happened to both real GDP and the price level.",
        recall: {
          type: "fillin",
          prompt: "When AD shifts right and the economy has spare capacity, the effect falls mostly on _____ rather than _____.",
          answer: "output / prices"
        }
      },
      {
        id: "lras-shifts-growth",
        title: "LRAS Shifts and Long-Run Growth",
        keyIdea: "A rightward shift of LRAS represents an increase in productive capacity, allowing higher output at a lower or stable price level.",
        body: [
          {
            type: "paragraph",
            text: "Long-run economic growth is shown on an AD/AS diagram by a rightward shift of the **LRAS curve**. This represents an increase in the economy's productive potential. It could result from investment in new technology, improved education, infrastructure development or institutional reforms that raise efficiency."
          },
          {
            type: "flow",
            steps: ["Supply-side improvement occurs", "LRAS shifts right", "Potential output increases"],
            result: "Economy can produce more without inflationary pressure",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "The key advantage of LRAS-driven growth is that it increases output while reducing or stabilising the price level. This is the holy grail of macroeconomic policy: more output, more jobs and lower inflation simultaneously. It is the only sustainable path to permanently higher living standards."
          },
          {
            type: "paragraph",
            text: "You should be able to explain what caused the LRAS shift in any given scenario. If the question mentions new technology, link it to higher productivity. If it mentions immigration, link it to a larger labour force. The examiner wants you to connect the real-world cause to the diagram."
          }
        ],
        realExample: {
          emoji: "🇩🇪",
          text: "**Germany's** Hartz labour market reforms between 2003 and 2005 increased labour market flexibility and workforce participation. This supply-side improvement shifted LRAS right, helping Germany reduce unemployment from 11% to under 5% while maintaining low inflation and strong export performance."
        },
        misconception: "Students draw LRAS shifting right and forget to explain the cause. An LRAS shift must be linked to a specific improvement in productive capacity such as technology, education or capital investment. Instead write: always identify the specific supply-side factor that caused the LRAS shift, because examiners award marks for the causal explanation, not just the diagram.",
        examMatters: "High-mark questions require you to draw a clearly labelled AD/AS diagram showing the LRAS shift and explain both the cause and the consequences. The best answers then evaluate whether the supply-side improvement will be sustained or whether it is a one-off shift.",
        recall: {
          type: "reorder",
          prompt: "Order the steps for LRAS-driven growth:",
          items: ["Supply-side policy implemented", "Productivity or capacity improves", "LRAS shifts right", "Potential output rises at stable prices"]
        }
      },
      {
        id: "combined-ad-as-analysis",
        title: "Combined AD and LRAS Shifts",
        keyIdea: "The best growth outcome is when AD and LRAS shift together, so the economy grows without opening an output gap or generating inflation.",
        body: [
          {
            type: "paragraph",
            text: "The most favourable macroeconomic outcome occurs when **AD and LRAS shift rightward together**. In this scenario, the economy grows without opening a significant output gap in either direction. Output rises, employment increases, and the price level remains stable."
          },
          {
            type: "flow",
            steps: ["LRAS shifts right (capacity grows)", "AD shifts right (demand grows)", "Both shifts are proportionate"],
            result: "Balanced growth with stable prices",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "If AD grows faster than LRAS, a positive output gap opens and inflation results. If LRAS grows faster than AD, a negative output gap opens and there is spare capacity. The policy challenge is to ensure that demand growth broadly matches the expansion of supply-side capacity."
          },
          {
            type: "paragraph",
            text: "You should use this combined framework in essay questions where examiners ask you to evaluate growth strategies. Arguing that a country needs both demand-side and supply-side policies working together demonstrates sophisticated understanding and earns evaluation marks."
          }
        ],
        realExample: {
          emoji: "🇺🇸",
          text: "**The United States** in the late 1990s achieved a rare combination of strong growth, low unemployment and low inflation. The technology boom shifted LRAS right through productivity gains while consumer confidence and investment shifted AD right in tandem, producing balanced non-inflationary growth."
        },
        misconception: "Students discuss demand-side and supply-side growth as separate alternatives and never combine them. In reality, the best economic outcomes occur when both work together, with supply creating capacity and demand filling it. Instead write: sustainable growth requires AD and LRAS to shift together so that rising capacity is matched by rising demand without inflationary or deflationary gaps.",
        examMatters: "The highest-level answers combine AD and LRAS shifts on a single diagram and explain the macroeconomic outcome. Examiners particularly reward you for evaluating whether a country's current policy mix achieves this balance or whether one side is growing faster than the other.",
        recall: {
          type: "fillin",
          prompt: "If AD grows faster than LRAS, a _____ output gap opens and _____ results.",
          answer: "positive / inflation"
        }
      }
    ],
    takeaway: [
      "AD shifts right for short-run growth; LRAS shifts right for long-run growth.",
      "Spare capacity determines whether AD shifts raise output or prices.",
      "Balanced AD and LRAS shifts produce non-inflationary sustained growth.",
      "Always label diagrams fully and explain the cause of each shift."
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
