/**
 * RICH NOTES — Economics Unit 2: 2.3.4, 2.3.5, 2.3.6
 * ====================================================
 * Edexcel IAL Economics Unit 2, spec points 2.3.4–2.3.6
 * Pushes rich-format notes to Supabase section_notes table.
 *
 * Sections:
 *   2.3.4  National Income                (section_id: national-income)
 *   2.3.5  Economic Growth                (section_id: economic-growth)
 *   2.3.6  Macroeconomic Objectives &     (section_id: macroeconomic-objectives-policies)
 *          Policies
 *
 * Run with: node scripts/update-economics-unit2-rich-notes-part2.mjs
 */

import { supabase } from './_db.mjs';

/* ═══════════════════════════════════════════════════════════
 *  2.3.4  NATIONAL INCOME
 *
 *  4 chapters: Circular Flow of Income, Injections &
 *  Withdrawals, Equilibrium National Income, The Multiplier
 * ═══════════════════════════════════════════════════════════ */

const NOTES_234 = [

  /* ─────────────────────────────────────────────────
   *  Chapter 1: The Circular Flow of Income
   * ───────────────────────────────────────────────── */
  {
    title: "The Circular Flow of Income",
    meta: "5 concepts",
    keyIdea: "National income is not a fixed stock but a continuous flow: households supply factors to firms, firms pay incomes back, and spending completes the loop — the faster the flow, the greater the national income.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Circular flow of income</strong> — a model showing how money flows between households and firms through factor markets and goods markets, illustrating how national income is generated."
          },
          {
            type: "def",
            text: "<strong>National income</strong> — the total value of all goods and services produced in an economy over a given period, also equal to total expenditure and total factor incomes.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Two-sector model</strong> — a simplified circular flow with only households and firms; all income earned is spent, so there are no leakages and the flow is constant."
          },
          {
            type: "def",
            text: "<strong>Open-economy model</strong> — extends the circular flow to include the government sector (taxation and spending) and the foreign sector (exports and imports), creating multiple injection and withdrawal points."
          }
        ]
      },
      {
        title: "HOW THE MODEL WORKS",
        items: [
          {
            type: "mech",
            text: "Households supply <strong>factors of production</strong> (land, labour, capital, enterprise) to firms and receive factor incomes (rent, wages, interest, profit) in return."
          },
          {
            type: "mech",
            text: "Households spend their income on goods and services produced by firms, completing the loop; the value of output equals the value of income equals the value of expenditure."
          },
          {
            type: "imp",
            text: "The three methods of measuring GDP — <strong>output, income, and expenditure</strong> — all give the same figure because they measure different points of the same circular flow.",
            tag: "exam"
          },
          {
            type: "link",
            text: "The circular flow underpins AD = C + I + G + (X − M); each component maps to a flow or injection in the model, linking directly to aggregate demand analysis in 2.3.2."
          }
        ]
      }
    ],
    flow: {
      steps: ["Households supply factors to firms", "Firms pay wages/rent/interest/profit", "Households spend income on output"],
      result: "National income circulates continuously",
      resultType: "good"
    },
    examMatters: "Examiners expect you to draw the circular flow diagram with clearly labelled injections and withdrawals. Always show the inner flow (factor services and goods) and the outer flow (money), and indicate where S, T, M leak out and where I, G, X enter.",
    misconception: "Students say the circular flow only works when injections equal withdrawals. Wrong because the circular flow always operates; the economy simply contracts or expands if injections and withdrawals are unequal. Instead write: the circular flow shows how income moves — equilibrium is a special case where the flow is stable.",
    takeaway: [
      "The circular flow shows money flowing between households and firms through factor and goods markets.",
      "Output, income, and expenditure are three equal measures of the same flow.",
      "Adding government and trade sectors introduces injections and withdrawals that change the flow's size."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 2: Injections and Withdrawals
   * ───────────────────────────────────────────────── */
  {
    title: "Injections and Withdrawals",
    meta: "4 concepts",
    keyIdea: "The size of national income depends on the balance between money entering the flow (injections) and money leaving it (withdrawals) — when injections exceed withdrawals the economy grows, and vice versa.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Injections (J)</strong> — additions to the circular flow that do not originate from household spending: <strong>investment (I)</strong> by firms, <strong>government spending (G)</strong>, and <strong>export revenue (X)</strong>.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Withdrawals (W)</strong> — income earned by households that is not spent on domestic goods: <strong>saving (S)</strong>, <strong>taxation (T)</strong>, and <strong>import spending (M)</strong>."
          }
        ]
      },
      {
        title: "HOW INJECTIONS AND WITHDRAWALS INTERACT",
        items: [
          {
            type: "mech",
            text: "When <strong>J > W</strong>, more money enters the circular flow than leaves it, so total spending rises and national income expands."
          },
          {
            type: "mech",
            text: "When <strong>J < W</strong>, more money leaks out than enters, so total spending falls and national income contracts."
          },
          {
            type: "imp",
            text: "Individual injections do not need to equal their corresponding withdrawals (e.g., I does not need to equal S); only <strong>total injections must equal total withdrawals</strong> for equilibrium.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Changes in injections and withdrawals are the mechanism behind shifts in AD; a rise in G or X shifts AD right, while a rise in T or M shifts AD left, connecting to 2.3.2 AD analysis."
          }
        ]
      },
      {
        title: "EVALUATION",
        items: [
          {
            type: "imp",
            text: "A rise in injections only boosts national income if it does not cause an <strong>equal rise in withdrawals</strong>; for example, higher G funded by higher T may be neutral."
          },
          {
            type: "mech",
            text: "Withdrawals are partly <strong>endogenous</strong>: as income rises, saving, tax revenue, and import spending all tend to increase automatically, creating a self-correcting mechanism."
          },
          {
            type: "link",
            text: "The marginal propensity to withdraw (MPW = MPS + MPT + MPM) determines how quickly leakages rise as income grows, directly feeding into the multiplier formula in the next chapter."
          }
        ]
      }
    ],
    formula: {
      label: "EQUILIBRIUM CONDITION",
      text: "I + G + X = S + T + M  (total injections = total withdrawals)"
    },
    takeaway: [
      "Injections are I + G + X; withdrawals are S + T + M.",
      "National income rises when total injections exceed total withdrawals.",
      "Only total J = total W is needed for equilibrium, not each pair individually.",
      "Withdrawals rise automatically with income, creating self-correction."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 3: Equilibrium National Income
   * ───────────────────────────────────────────────── */
  {
    title: "Equilibrium National Income",
    meta: "4 concepts",
    keyIdea: "The economy settles where planned total expenditure equals actual output — if firms produce more than people want to buy, unsold stock piles up and they cut back; if they produce less, stocks run down and they expand.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Equilibrium national income</strong> — the level of real GDP at which planned aggregate expenditure (C + I + G + X − M) equals actual national output, so there is no tendency for income to change.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Planned expenditure</strong> — the total amount households, firms, the government, and foreigners intend to spend at each income level."
          },
          {
            type: "def",
            text: "<strong>Unplanned inventory changes</strong> — the difference between actual output and planned expenditure; positive means unsold stocks are accumulating, negative means stocks are running down."
          }
        ]
      },
      {
        title: "ADJUSTMENT PROCESS",
        items: [
          {
            type: "mech",
            text: "If actual output <strong>exceeds</strong> planned expenditure, firms accumulate unplanned inventories and respond by cutting production, reducing employment, and lowering income."
          },
          {
            type: "mech",
            text: "If actual output is <strong>below</strong> planned expenditure, firms run down inventories and respond by expanding production, hiring more workers, and raising income."
          },
          {
            type: "imp",
            text: "The Keynesian 45-degree line diagram shows equilibrium where the aggregate expenditure line crosses the 45-degree line (where AE = Y); any other point triggers inventory adjustment.",
            tag: "exam"
          },
          {
            type: "link",
            text: "This equilibrium concept links to the AD/AS model: a Keynesian cross shows income-expenditure equilibrium at a given price level, while AD/AS allows the price level to vary as well."
          }
        ]
      }
    ],
    flow: {
      steps: ["Output exceeds planned spending", "Unplanned inventory build-up", "Firms cut production and employment"],
      result: "National income falls back toward equilibrium",
      resultType: "bad"
    },
    examMatters: "Examiners expect you to explain the adjustment mechanism clearly. State whether there is unplanned inventory accumulation or decumulation, then explain how firms respond by changing output. Simply saying 'the economy moves to equilibrium' without explaining the inventory mechanism loses marks.",
    misconception: "Students confuse equilibrium national income with full-employment income. Wrong because the economy can be in equilibrium with significant unemployment if planned expenditure is too low. Instead write: equilibrium means no tendency for output to change, but the equilibrium level may be below the full-employment level, creating a deflationary gap.",
    takeaway: [
      "Equilibrium is where planned aggregate expenditure equals actual output.",
      "Unplanned inventory changes are the signal that triggers output adjustment.",
      "The economy can be in equilibrium below full employment — a deflationary gap."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 4: The Multiplier and National Income
   * ───────────────────────────────────────────────── */
  {
    title: "The Multiplier and National Income",
    meta: "5 concepts",
    keyIdea: "A pound of new spending does not just add a pound to national income — it circulates through the economy, creating further rounds of income and spending, so the final rise in GDP is a multiple of the initial injection.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>The multiplier (k)</strong> — the ratio of the final change in national income to the initial change in an injection; it shows how much GDP changes for each unit of new spending.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Marginal propensity to consume (MPC)</strong> — the fraction of each additional pound of income that households spend on domestic consumption."
          },
          {
            type: "def",
            text: "<strong>Marginal propensity to withdraw (MPW)</strong> — the fraction of each additional pound of income that leaks out as saving, taxation, or import spending; MPW = MPS + MPT + MPM."
          }
        ]
      },
      {
        title: "HOW THE MULTIPLIER WORKS",
        items: [
          {
            type: "mech",
            text: "An initial injection (e.g., government spending of $100m) becomes income for workers and suppliers, who spend a fraction (MPC) and withdraw the rest; each spending round is smaller but adds to total income."
          },
          {
            type: "mech",
            text: "The process continues through <strong>successive rounds</strong> of spending until the leakages from each round reduce the additional spending to near zero."
          },
          {
            type: "imp",
            text: "The multiplier works in <strong>both directions</strong>: a withdrawal of spending (e.g., a cut in G) causes a multiplied fall in national income, making fiscal austerity potentially contractionary.",
            tag: "exam"
          },
          {
            type: "link",
            text: "The size of the multiplier determines how effective fiscal policy is: a large multiplier means government spending changes have a powerful effect on AD, linking to 2.3.6 fiscal policy analysis."
          }
        ]
      },
      {
        title: "EVALUATION",
        items: [
          {
            type: "imp",
            text: "The multiplier is <strong>smaller in open economies</strong> with high import propensities because a large fraction of each spending round leaks abroad rather than recirculating domestically."
          },
          {
            type: "mech",
            text: "Time lags mean the full multiplier effect takes <strong>months or years</strong> to work through; the initial boost is felt quickly but later rounds diminish gradually."
          },
          {
            type: "imp",
            text: "If the economy is at full capacity, the multiplier effect may cause <strong>inflation</strong> rather than real output growth, because extra spending bids up prices rather than increasing production.",
            tag: "exam"
          },
          {
            type: "link",
            text: "The multiplier connects to the output gap concept in 2.3.5: a multiplied rise in AD closes a negative output gap, but overshooting creates a positive output gap and inflationary pressure."
          }
        ]
      }
    ],
    formulas: [
      { label: "MULTIPLIER FORMULA (MPW)", text: "k = 1 / MPW  =  1 / (MPS + MPT + MPM)" },
      { label: "MULTIPLIER FORMULA (MPC)", text: "k = 1 / (1 − MPC)" }
    ],
    flow: {
      steps: ["Initial injection of spending", "Recipients spend a fraction (MPC) and withdraw the rest", "Successive rounds of diminishing spending"],
      result: "Final rise in national income = k x initial injection",
      resultType: "good"
    },
    examMatters: "Examiners expect you to state the multiplier formula, calculate a numerical value when given MPC or MPW, and then explain the process of successive spending rounds. Marks are also awarded for evaluating the multiplier — state whether the economy has spare capacity, the size of MPW, and the time lag involved.",
    misconception: "Students say the multiplier means the economy always grows by more than the injection. Wrong because the multiplier assumes spare capacity; at full employment the extra spending becomes inflationary. Instead write: the multiplier amplifies changes in spending, but the effect is split between real output growth and inflation depending on the output gap.",
    takeaway: [
      "The multiplier shows how an initial injection creates a larger final change in national income.",
      "k = 1/MPW: a lower marginal propensity to withdraw means a larger multiplier.",
      "The multiplier works in reverse too — spending cuts cause multiplied falls in GDP.",
      "Near full capacity the multiplier effect is mostly inflationary, not growth-enhancing."
    ]
  }

];

/* ═══════════════════════════════════════════════════════════
 *  2.3.5  ECONOMIC GROWTH
 *
 *  6 chapters: Actual vs Potential Growth, Output Gaps,
 *  Business Cycle, Causes of Growth, Costs & Benefits,
 *  Growth and AD/AS Analysis
 * ═══════════════════════════════════════════════════════════ */

const NOTES_235 = [

  /* ─────────────────────────────────────────────────
   *  Chapter 1: Actual vs Potential Economic Growth
   * ───────────────────────────────────────────────── */
  {
    title: "Actual vs Potential Economic Growth",
    meta: "4 concepts",
    keyIdea: "An economy can grow by using its existing resources more fully (actual growth) or by expanding its total capacity to produce (potential growth) — confusing the two is a common exam mistake.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Actual economic growth</strong> — the annual percentage increase in real GDP, reflecting how much more output the economy actually produces from one year to the next.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Potential economic growth</strong> — an increase in the productive capacity of the economy, shown by an outward shift of the LRAS curve or the PPF."
          },
          {
            type: "def",
            text: "<strong>Trend growth rate</strong> — the long-run average rate at which the economy's potential output expands, determined by improvements in the quantity and quality of factors of production."
          }
        ]
      },
      {
        title: "HOW THEY DIFFER",
        items: [
          {
            type: "mech",
            text: "Actual growth occurs when <strong>AD increases</strong> and the economy moves closer to its full capacity, using previously unemployed resources."
          },
          {
            type: "mech",
            text: "Potential growth occurs when <strong>LRAS shifts right</strong> due to improvements in technology, education, infrastructure, or the labour force, expanding the economy's ceiling."
          },
          {
            type: "imp",
            text: "An economy can have actual growth <strong>without</strong> potential growth (using up spare capacity) or potential growth <strong>without</strong> actual growth (capacity rises but demand is weak).",
            tag: "exam"
          },
          {
            type: "link",
            text: "Actual growth links to AD shifts from 2.3.2; potential growth links to LRAS shifts from 2.3.3. Use both to explain sustainable long-run growth."
          }
        ]
      }
    ],
    flow: {
      steps: ["Actual growth: AD rises along existing LRAS", "Spare capacity is used up", "Potential growth: LRAS shifts right, raising the ceiling"],
      result: "Sustainable growth requires both AD and LRAS to expand",
      resultType: "good"
    },
    examMatters: "Examiners want you to distinguish clearly between the two types on a diagram. Actual growth is a movement along or toward the LRAS curve; potential growth is a rightward shift of the LRAS curve itself. Always state which type you mean and support it with the correct diagram.",
    takeaway: [
      "Actual growth = rise in real GDP; potential growth = rise in productive capacity.",
      "Actual growth uses spare capacity; potential growth expands the capacity ceiling.",
      "Sustainable long-run growth requires both AD growth and LRAS shifts.",
      "On a PPF diagram, actual growth moves toward the frontier; potential growth shifts it out."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 2: Output Gaps
   * ───────────────────────────────────────────────── */
  {
    title: "Output Gaps",
    meta: "4 concepts",
    keyIdea: "The output gap measures whether the economy is running above or below its potential — it tells policymakers whether the main risk is inflation (positive gap) or unemployment (negative gap).",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Output gap</strong> — the difference between actual real GDP and the potential (trend) level of GDP; it can be positive or negative.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Positive output gap</strong> — actual GDP exceeds potential GDP; the economy is overheating, with demand outstripping capacity, creating inflationary pressure."
          },
          {
            type: "def",
            text: "<strong>Negative output gap</strong> — actual GDP is below potential GDP; spare capacity exists, unemployment is above the natural rate, and there is downward pressure on inflation."
          }
        ]
      },
      {
        title: "POLICY IMPLICATIONS",
        items: [
          {
            type: "mech",
            text: "A <strong>positive output gap</strong> signals the need for contractionary policy (higher interest rates or lower government spending) to reduce AD and prevent inflation accelerating."
          },
          {
            type: "mech",
            text: "A <strong>negative output gap</strong> signals the need for expansionary policy (lower interest rates or higher government spending) to boost AD and reduce unemployment."
          },
          {
            type: "imp",
            text: "Estimating the output gap is <strong>difficult in practice</strong> because potential GDP is not directly observable; errors in estimation can lead to inappropriate policy responses.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Output gaps connect to the business cycle below — booms create positive gaps and recessions create negative gaps — and to the multiplier in 2.3.4, which determines how quickly gaps close."
          }
        ]
      }
    ],
    formula: {
      label: "OUTPUT GAP",
      text: "Output gap = Actual GDP − Potential GDP"
    },
    misconception: "Students say a negative output gap means the economy is shrinking. Wrong because a negative output gap means actual GDP is below potential, not that GDP is falling. The economy could be growing but still have a negative gap if it remains below trend. Instead write: a negative output gap shows the economy is producing below its full capacity, regardless of whether GDP is rising or falling.",
    takeaway: [
      "A positive output gap means overheating and inflationary pressure.",
      "A negative output gap means spare capacity and higher unemployment.",
      "Potential GDP is estimated, not observed — policy based on it involves uncertainty.",
      "Output gaps guide whether expansionary or contractionary policy is appropriate."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 3: The Business (Trade) Cycle
   * ───────────────────────────────────────────────── */
  {
    title: "The Business (Trade) Cycle",
    meta: "5 concepts",
    keyIdea: "Real GDP does not grow in a straight line — it fluctuates around the trend in a repeated pattern of boom, slowdown, recession, and recovery, each phase with distinct symptoms and policy challenges.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Business (trade) cycle</strong> — the short-to-medium-term fluctuations in real GDP around the long-run trend growth rate, consisting of booms, recessions, and recoveries."
          },
          {
            type: "def",
            text: "<strong>Recession</strong> — technically defined as two consecutive quarters of negative real GDP growth; characterised by rising unemployment, falling confidence, and declining investment.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Boom</strong> — a phase of rapid economic growth where actual GDP exceeds potential GDP, creating a positive output gap with rising employment, wages, and inflation."
          }
        ]
      },
      {
        title: "PHASES OF THE CYCLE",
        items: [
          {
            type: "mech",
            text: "During a <strong>boom</strong>, high consumer and business confidence drives strong AD growth, unemployment falls below the natural rate, and demand-pull inflation accelerates."
          },
          {
            type: "mech",
            text: "During a <strong>recession</strong>, falling confidence reduces consumption and investment, AD contracts, firms cut output and jobs, and the negative output gap widens."
          },
          {
            type: "mech",
            text: "During <strong>recovery</strong>, lower prices and policy stimulus boost spending, firms begin restocking and hiring, and actual GDP starts closing the negative output gap."
          },
          {
            type: "imp",
            text: "The business cycle creates a <strong>policy dilemma</strong>: booms risk inflation, recessions risk unemployment, and policy responses involve time lags that may destabilise the cycle further.",
            tag: "exam"
          }
        ]
      },
      {
        title: "ANALYSIS",
        items: [
          {
            type: "link",
            text: "Business cycle fluctuations are driven by changes in the components of AD (C, I, G, X−M), linking to the multiplier and accelerator effects covered in 2.3.4."
          },
          {
            type: "imp",
            text: "Investment is the most <strong>volatile</strong> component of AD and is the main driver of cyclical fluctuations, because firms amplify demand changes through the accelerator effect."
          },
          {
            type: "mech",
            text: "The <strong>accelerator effect</strong> means that a change in the rate of growth of output causes a proportionally larger change in investment, amplifying the boom and deepening the recession."
          }
        ]
      }
    ],
    flow: {
      steps: ["Boom: AD grows fast, positive output gap", "Slowdown: growth decelerates", "Recession: negative growth, rising unemployment", "Recovery: AD picks up, gap closes"],
      result: "Cycle repeats around the long-run trend",
      resultType: "good"
    },
    examMatters: "Examiners expect you to draw the business cycle as fluctuations around an upward-sloping trend line. Label each phase clearly and connect it to the output gap. Marks are awarded for explaining the characteristics of each phase — not just naming them.",
    takeaway: [
      "The business cycle has four phases: boom, slowdown, recession, recovery.",
      "A recession is two consecutive quarters of negative real GDP growth.",
      "Investment volatility, driven by the accelerator, is the main cyclical amplifier.",
      "Policy lags mean intervention may arrive too late and destabilise the cycle."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 4: Causes of Economic Growth
   * ───────────────────────────────────────────────── */
  {
    title: "Causes of Economic Growth",
    meta: "4 concepts",
    keyIdea: "Growth has two engines: demand-side forces that put idle resources to work in the short run, and supply-side forces that expand the economy's productive capacity in the long run.",
    blocks: [
      {
        title: "DEMAND-SIDE CAUSES",
        items: [
          {
            type: "mech",
            text: "A rise in <strong>consumer confidence</strong> increases C, boosting AD and causing actual growth as firms increase output to meet higher demand."
          },
          {
            type: "mech",
            text: "Lower <strong>interest rates</strong> reduce the cost of borrowing, encouraging higher C and I, which raises AD and stimulates short-run growth."
          },
          {
            type: "imp",
            text: "Demand-side growth is <strong>limited by capacity</strong>: once the economy reaches full employment, further AD increases cause inflation rather than real growth.",
            tag: "exam"
          }
        ]
      },
      {
        title: "SUPPLY-SIDE CAUSES",
        items: [
          {
            type: "mech",
            text: "<strong>Technological innovation</strong> raises productivity, allowing more output from the same inputs and shifting LRAS to the right."
          },
          {
            type: "mech",
            text: "Investment in <strong>human capital</strong> (education and training) improves labour productivity and quality, increasing potential output over time."
          },
          {
            type: "mech",
            text: "Growth in the <strong>labour force</strong> (through immigration, higher participation, or population growth) expands the quantity of factor inputs available."
          },
          {
            type: "imp",
            text: "Supply-side growth is <strong>non-inflationary</strong> because it expands capacity alongside output, allowing real GDP to rise without upward pressure on the price level.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Supply-side causes connect directly to supply-side policies in 2.3.6 — interventionist policies like education spending and market-based policies like deregulation both aim to shift LRAS right."
          }
        ]
      }
    ],
    examMatters: "Examiners reward candidates who distinguish between short-run demand-driven growth and long-run supply-driven growth. Always state which type a policy promotes and whether it risks inflation.",
    takeaway: [
      "Demand-side growth uses spare capacity; supply-side growth expands capacity itself.",
      "Demand-side growth is inflationary at full employment; supply-side growth is not.",
      "Key supply-side drivers: technology, human capital, physical capital, labour force growth.",
      "Sustainable growth requires both rising AD and expanding LRAS."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 5: Costs and Benefits of Economic Growth
   * ───────────────────────────────────────────────── */
  {
    title: "Costs and Benefits of Economic Growth",
    meta: "5 concepts",
    keyIdea: "Growth raises average living standards and creates jobs, but the gains are not automatic — they may come with environmental degradation, inequality, and diminishing marginal returns to material wealth.",
    blocks: [
      {
        title: "BENEFITS OF GROWTH",
        items: [
          {
            type: "mech",
            text: "Higher real GDP per capita means higher <strong>average incomes</strong>, enabling greater consumption and improved material living standards."
          },
          {
            type: "mech",
            text: "Growth generates higher <strong>tax revenue</strong> without raising tax rates, giving governments more resources for public services and poverty reduction."
          },
          {
            type: "imp",
            text: "Growth creates <strong>employment opportunities</strong>: rising output requires more labour, reducing cyclical unemployment and boosting confidence.",
            tag: "exam"
          }
        ]
      },
      {
        title: "COSTS OF GROWTH",
        items: [
          {
            type: "imp",
            text: "<strong>Environmental degradation</strong>: rapid growth increases resource depletion, pollution, and carbon emissions, creating negative externalities that GDP does not capture."
          },
          {
            type: "imp",
            text: "<strong>Income inequality</strong>: the benefits of growth may be concentrated among capital owners and skilled workers, widening the gap between rich and poor."
          },
          {
            type: "mech",
            text: "Rapid demand-side growth can cause <strong>demand-pull inflation</strong>, eroding the purchasing power of fixed incomes and distorting price signals."
          },
          {
            type: "link",
            text: "The distinction between GDP growth and welfare improvements links to 2.3.1 measures of living standards — HDI and inequality-adjusted measures capture what GDP misses."
          }
        ]
      },
      {
        title: "EVALUATION",
        items: [
          {
            type: "imp",
            text: "Whether growth improves welfare depends on its <strong>composition</strong>: growth driven by arms spending or financial speculation may raise GDP without improving lives.",
            tag: "exam"
          },
          {
            type: "mech",
            text: "<strong>Sustainable growth</strong> balances current output expansion with environmental preservation and resource conservation for future generations."
          },
          {
            type: "link",
            text: "The costs of growth provide evaluation for any question recommending expansionary policy — always consider whether the growth is sustainable, equitable, and environmentally responsible."
          }
        ]
      }
    ],
    misconception: "Students say economic growth is always desirable. Wrong because growth has opportunity costs including environmental damage, inequality, and inflation risk. Instead write: whether growth improves welfare depends on its distribution, sustainability, and the externalities it generates.",
    takeaway: [
      "Benefits: higher incomes, more tax revenue, lower unemployment.",
      "Costs: environmental damage, inequality, inflation risk, resource depletion.",
      "GDP growth does not equal welfare improvement — composition and distribution matter.",
      "Always evaluate growth policies by asking: sustainable, equitable, inflationary?"
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 6: Economic Growth and AD/AS Analysis
   * ───────────────────────────────────────────────── */
  {
    title: "Economic Growth and AD/AS Analysis",
    meta: "4 concepts",
    keyIdea: "The AD/AS model makes growth visible: a rightward AD shift shows actual growth, a rightward LRAS shift shows potential growth, and only when both move together does the economy achieve sustained, non-inflationary growth.",
    blocks: [
      {
        title: "AD SHIFTS AND ACTUAL GROWTH",
        items: [
          {
            type: "mech",
            text: "A rightward shift of AD (e.g., from higher C or G) increases real GDP along the SRAS curve, representing <strong>actual growth</strong> — but also raises the price level if the economy is near capacity."
          },
          {
            type: "imp",
            text: "If AD shifts right <strong>beyond full employment</strong>, the growth is purely inflationary: real GDP cannot sustainably exceed potential output, and the price level rises sharply.",
            tag: "exam"
          }
        ]
      },
      {
        title: "LRAS SHIFTS AND POTENTIAL GROWTH",
        items: [
          {
            type: "mech",
            text: "A rightward shift of LRAS (e.g., from technological progress or increased labour supply) increases <strong>potential output</strong>, lowering the price level and raising full-employment GDP."
          },
          {
            type: "imp",
            text: "LRAS growth is <strong>non-inflationary</strong>: the economy's capacity expands, so more output can be produced without putting upward pressure on prices."
          },
          {
            type: "link",
            text: "LRAS shifts result from supply-side improvements covered in 2.3.3 and link to supply-side policies in 2.3.6 — always identify the specific cause of the shift."
          }
        ]
      },
      {
        title: "COMBINED SHIFTS",
        items: [
          {
            type: "mech",
            text: "When AD and LRAS both shift right together, real GDP rises <strong>without inflation</strong> because the extra demand is matched by extra capacity — this is the ideal growth scenario."
          },
          {
            type: "imp",
            text: "In practice, AD and LRAS rarely shift at the same rate: if AD grows faster than LRAS, inflation results; if LRAS grows faster, there may be spare capacity and unemployment.",
            tag: "exam"
          },
          {
            type: "link",
            text: "This analysis is the basis for policy evaluation in 2.3.6: fiscal and monetary policy shift AD, while supply-side policies shift LRAS. The best strategy combines both."
          }
        ]
      }
    ],
    flow: {
      steps: ["AD shifts right: actual growth (may be inflationary)", "LRAS shifts right: potential growth (non-inflationary)", "Both shift together: sustained non-inflationary growth"],
      result: "Long-run prosperity requires demand and supply growing in balance",
      resultType: "good"
    },
    examMatters: "Examiners award top marks for diagrams that show both AD and LRAS shifting. Draw the initial equilibrium, then show the new equilibrium after both curves shift. Annotate the diagram to show that real GDP rises but the price level stays stable.",
    takeaway: [
      "AD shift right = actual growth (may cause inflation near capacity).",
      "LRAS shift right = potential growth (non-inflationary).",
      "Ideal outcome: AD and LRAS shift together for sustained, stable growth.",
      "Always ask whether growth is demand-driven, supply-driven, or both."
    ]
  }

];

/* ═══════════════════════════════════════════════════════════
 *  2.3.6  MACROECONOMIC OBJECTIVES & POLICIES
 *
 *  5 chapters: Macroeconomic Objectives, Fiscal Policy,
 *  Monetary Policy, Supply-Side Policies,
 *  Policy Conflicts and Trade-Offs
 * ═══════════════════════════════════════════════════════════ */

const NOTES_236 = [

  /* ─────────────────────────────────────────────────
   *  Chapter 1: Macroeconomic Objectives
   * ───────────────────────────────────────────────── */
  {
    title: "Macroeconomic Objectives",
    meta: "5 concepts",
    keyIdea: "Governments juggle four main targets — growth, low inflation, low unemployment, and external balance — but achieving all simultaneously is the central challenge of macroeconomics, because progress on one often comes at the expense of another.",
    blocks: [
      {
        title: "THE FOUR OBJECTIVES",
        items: [
          {
            type: "def",
            text: "<strong>Economic growth</strong> — a sustained increase in real GDP, raising living standards; the UK targets trend growth of around 2–2.5% per year.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Low and stable inflation</strong> — keeping the general price level rising gently (e.g., the Bank of England targets CPI inflation of 2%) to maintain confidence and purchasing power."
          },
          {
            type: "def",
            text: "<strong>Low unemployment</strong> — minimising involuntary joblessness to reduce wasted resources and improve social welfare; the goal is to keep unemployment near the natural rate."
          },
          {
            type: "def",
            text: "<strong>Balance of payments equilibrium</strong> — avoiding a persistently large current account deficit or surplus, which can signal structural imbalances in trade or capital flows."
          }
        ]
      },
      {
        title: "CONFLICTS BETWEEN OBJECTIVES",
        items: [
          {
            type: "imp",
            text: "Expansionary policy to boost growth and reduce unemployment often <strong>raises inflation</strong> and worsens the current account (higher imports), creating a direct conflict.",
            tag: "exam"
          },
          {
            type: "mech",
            text: "Contractionary policy to reduce inflation typically <strong>slows growth</strong> and raises unemployment in the short run, forcing painful trade-offs."
          },
          {
            type: "imp",
            text: "Rapid growth tends to <strong>suck in imports</strong>, worsening the current account deficit, so growth and external balance often conflict."
          },
          {
            type: "link",
            text: "These conflicts are explored in detail in Chapter 5 of this section (Phillips curve and policy trade-offs) and underpin evaluation of every policy recommendation in the exam."
          }
        ]
      }
    ],
    examMatters: "Examiners expect you to discuss conflicts between objectives whenever you recommend a policy. For full marks, state which objective the policy targets, then evaluate by explaining which other objective(s) may be harmed. This shows balance and avoids one-sided analysis.",
    misconception: "Students treat objectives as independent goals that can all be achieved simultaneously. Wrong because there are inherent short-run trade-offs, especially between inflation and unemployment. Instead write: policymakers must prioritise objectives and accept that improving one may temporarily worsen another.",
    takeaway: [
      "Four key objectives: growth, low inflation, low unemployment, BoP equilibrium.",
      "Expanding AD for growth often raises inflation and worsens the current account.",
      "Contracting AD to fight inflation raises unemployment in the short run.",
      "Always evaluate policies by discussing which objectives conflict."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 2: Fiscal Policy
   * ───────────────────────────────────────────────── */
  {
    title: "Fiscal Policy",
    meta: "5 concepts",
    keyIdea: "The government's taxing and spending decisions directly inject or withdraw demand from the economy — fiscal policy is powerful but slow, politically constrained, and carries the risk of rising national debt.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Fiscal policy</strong> — the use of government spending (G) and taxation (T) to influence aggregate demand, output, and employment.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Budget deficit</strong> — when government spending exceeds tax revenue (G > T) in a given year; a budget surplus occurs when T > G."
          },
          {
            type: "def",
            text: "<strong>Automatic stabilisers</strong> — tax and welfare systems that adjust automatically to dampen the business cycle: in a recession, tax revenue falls and welfare spending rises without any new legislation."
          }
        ]
      },
      {
        title: "HOW FISCAL POLICY WORKS",
        items: [
          {
            type: "mech",
            text: "<strong>Expansionary fiscal policy</strong> (higher G or lower T) increases aggregate demand directly through government spending or indirectly by raising household disposable income and thus consumption."
          },
          {
            type: "mech",
            text: "<strong>Contractionary fiscal policy</strong> (lower G or higher T) reduces aggregate demand, cooling an overheating economy and reducing inflationary pressure."
          },
          {
            type: "mech",
            text: "The <strong>multiplier effect</strong> amplifies the impact: a rise in G creates successive rounds of spending, so the final change in national income exceeds the initial policy change."
          },
          {
            type: "imp",
            text: "Automatic stabilisers work <strong>without time lags</strong>: during a downturn, falling incomes automatically reduce tax revenue and trigger higher benefit payments, partially offsetting the fall in AD.",
            tag: "exam"
          }
        ]
      },
      {
        title: "EVALUATION",
        items: [
          {
            type: "imp",
            text: "Fiscal policy involves <strong>long time lags</strong>: recognising the problem, deciding on policy, legislating, and implementing all take time, so the stimulus may arrive too late."
          },
          {
            type: "imp",
            text: "Persistent budget deficits increase the <strong>national debt</strong>, raising future interest payments and potentially crowding out private investment as government borrowing pushes up interest rates.",
            tag: "exam"
          },
          {
            type: "mech",
            text: "<strong>Crowding out</strong>: higher government borrowing can raise interest rates, reducing private-sector investment and partially offsetting the expansionary effect of fiscal policy."
          },
          {
            type: "link",
            text: "Fiscal policy shifts AD, linking to the AD/AS model in 2.3.2; its effectiveness depends on the multiplier size from 2.3.4 and the output gap from 2.3.5."
          }
        ]
      }
    ],
    flow: {
      steps: ["Government raises G or cuts T", "Disposable income rises, boosting C", "AD shifts right, multiplier amplifies effect"],
      result: "Real GDP rises (if spare capacity exists)",
      resultType: "good"
    },
    examMatters: "Examiners expect you to distinguish between discretionary fiscal policy (deliberate changes) and automatic stabilisers. Always evaluate by discussing time lags, the national debt, crowding out, and the size of the multiplier. Top answers also mention the output gap — expansionary fiscal policy is most effective when there is spare capacity.",
    takeaway: [
      "Fiscal policy uses G and T to shift AD; the multiplier amplifies the effect.",
      "Automatic stabilisers smooth the cycle without time lags or new legislation.",
      "Key limitations: time lags, rising national debt, and crowding out.",
      "Effectiveness depends on spare capacity and the size of the multiplier."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 3: Monetary Policy
   * ───────────────────────────────────────────────── */
  {
    title: "Monetary Policy",
    meta: "5 concepts",
    keyIdea: "Central banks steer the economy primarily through interest rates, which ripple through borrowing costs, asset prices, the exchange rate, and expectations — but transmission is indirect, uncertain, and subject to lags.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Monetary policy</strong> — decisions by the central bank to influence AD by changing interest rates, the money supply, or through quantitative easing.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Bank Rate</strong> — the interest rate set by the Bank of England's Monetary Policy Committee (MPC); it is the rate at which commercial banks can borrow from the central bank and influences all other rates."
          },
          {
            type: "def",
            text: "<strong>Quantitative easing (QE)</strong> — the central bank creates new money to buy government bonds, increasing bank reserves and aiming to lower long-term interest rates and stimulate lending."
          }
        ]
      },
      {
        title: "THE TRANSMISSION MECHANISM",
        items: [
          {
            type: "mech",
            text: "A <strong>cut in interest rates</strong> reduces the cost of borrowing and the return on saving, encouraging households to consume more and firms to invest more, raising AD."
          },
          {
            type: "mech",
            text: "Lower rates reduce <strong>mortgage payments</strong>, freeing disposable income for spending, and boost <strong>asset prices</strong> (houses, shares), creating a positive wealth effect on consumption."
          },
          {
            type: "mech",
            text: "Lower rates tend to weaken the <strong>exchange rate</strong> (less demand for the currency from foreign investors), making exports cheaper and imports dearer, improving net trade."
          },
          {
            type: "imp",
            text: "The transmission mechanism involves <strong>time lags of 18–24 months</strong>; the MPC must therefore act on forecasts of future inflation, not just current data.",
            tag: "exam"
          }
        ]
      },
      {
        title: "EVALUATION",
        items: [
          {
            type: "imp",
            text: "Interest rate cuts become <strong>ineffective at the zero lower bound</strong>: when rates are near zero, they cannot be cut further, limiting conventional monetary policy (the liquidity trap).",
            tag: "exam"
          },
          {
            type: "mech",
            text: "QE boosts <strong>asset prices</strong> more than real economic activity, potentially worsening wealth inequality as asset-rich households benefit most."
          },
          {
            type: "imp",
            text: "Monetary policy affects the economy <strong>asymmetrically</strong>: rate rises reliably slow the economy, but rate cuts may not stimulate if confidence is low and banks are unwilling to lend."
          },
          {
            type: "link",
            text: "Monetary policy interacts with fiscal policy: if fiscal expansion raises the deficit, the central bank may raise rates to offset inflationary pressure, partially negating the fiscal stimulus — a key conflict in 2.3.6."
          }
        ]
      }
    ],
    flow: {
      steps: ["Central bank cuts Bank Rate", "Borrowing costs fall, saving less attractive", "C and I rise, exchange rate falls", "AD shifts right after 18–24 month lag"],
      result: "Real GDP rises and unemployment falls (with time lag)",
      resultType: "good"
    },
    examMatters: "Examiners expect you to explain the transmission mechanism step by step, not just say 'lower rates boost AD'. Identify at least three channels: borrowing cost, wealth effect, and exchange rate. Always evaluate with time lags, the zero lower bound, and asymmetric effects.",
    misconception: "Students say lower interest rates always boost the economy. Wrong because if confidence is very low, firms and households may not borrow even at low rates (pushing on a string). Instead write: the effectiveness of rate cuts depends on consumer and business confidence, the willingness of banks to lend, and whether rates have already reached the zero lower bound.",
    takeaway: [
      "Monetary policy works through interest rates, the exchange rate, and asset prices.",
      "The transmission mechanism has 18–24 month lags, so the MPC acts on forecasts.",
      "At the zero lower bound, conventional rate cuts become ineffective (liquidity trap).",
      "QE is an unconventional tool but may worsen inequality through asset price inflation."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 4: Supply-Side Policies
   * ───────────────────────────────────────────────── */
  {
    title: "Supply-Side Policies",
    meta: "5 concepts",
    keyIdea: "Supply-side policies aim to shift LRAS right by making markets work better or building productive capacity — they offer non-inflationary growth but take years to deliver results and often involve political trade-offs.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Supply-side policies</strong> — government measures designed to increase the productive potential of the economy by improving the efficiency and flexibility of markets, shifting LRAS to the right.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Market-based policies</strong> — policies that reduce government intervention to allow market forces to allocate resources more efficiently, e.g., deregulation, privatisation, tax cuts, trade union reform."
          },
          {
            type: "def",
            text: "<strong>Interventionist policies</strong> — policies where the government actively invests to improve productive capacity, e.g., education and training, infrastructure spending, R&D subsidies."
          }
        ]
      },
      {
        title: "HOW THEY WORK",
        items: [
          {
            type: "mech",
            text: "<strong>Deregulation</strong> removes barriers to entry, increasing competition, lowering costs, and forcing firms to innovate and become more efficient."
          },
          {
            type: "mech",
            text: "<strong>Education and training</strong> improve human capital, raising labour productivity and enabling workers to adapt to new technologies and industries."
          },
          {
            type: "mech",
            text: "<strong>Infrastructure investment</strong> (roads, broadband, ports) reduces transport costs and improves connectivity, boosting productivity across all sectors."
          },
          {
            type: "imp",
            text: "Supply-side improvements increase potential output without raising the price level, delivering <strong>non-inflationary growth</strong> — the ideal outcome on an AD/AS diagram.",
            tag: "exam"
          }
        ]
      },
      {
        title: "EVALUATION",
        items: [
          {
            type: "imp",
            text: "Supply-side policies have <strong>very long time lags</strong>: education reform takes a generation to raise productivity; infrastructure projects take years to plan and build."
          },
          {
            type: "imp",
            text: "Market-based policies may increase <strong>inequality</strong>: deregulation can worsen working conditions, and tax cuts primarily benefit higher earners.",
            tag: "exam"
          },
          {
            type: "mech",
            text: "Interventionist policies require <strong>government spending</strong>, potentially worsening the budget deficit and raising the question of opportunity cost — money spent on education cannot be spent elsewhere."
          },
          {
            type: "link",
            text: "Supply-side policies complement fiscal and monetary policy: the latter manage AD in the short run, while supply-side policies build long-run capacity, connecting to the growth analysis in 2.3.5."
          }
        ]
      }
    ],
    examMatters: "Examiners reward candidates who compare market-based and interventionist approaches. State one specific example of each, explain how it shifts LRAS, and evaluate by discussing time lags, costs, and distributional effects. Never write vaguely about 'supply-side policies' without specifying the type.",
    misconception: "Students say supply-side policies have no drawbacks because they are non-inflationary. Wrong because they involve significant time lags, budget costs (interventionist), distributional concerns (market-based), and uncertain effectiveness. Instead write: supply-side policies offer non-inflationary potential growth but their benefits are slow to materialise and may not be equally shared.",
    takeaway: [
      "Market-based: deregulation, privatisation, tax cuts — reduce government intervention.",
      "Interventionist: education, infrastructure, R&D — active government investment.",
      "Both shift LRAS right for non-inflationary growth but with long time lags.",
      "Evaluate by comparing costs, distributional effects, and speed of impact."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 5: Policy Conflicts and Trade-Offs
   * ───────────────────────────────────────────────── */
  {
    title: "Policy Conflicts and Trade-Offs",
    meta: "5 concepts",
    keyIdea: "The Phillips curve captures the central macro dilemma: reducing unemployment may raise inflation and vice versa — policymakers cannot simply maximise all objectives, they must choose and manage trade-offs.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Phillips curve</strong> — an inverse relationship between the rate of unemployment and the rate of inflation; in the short run, lower unemployment tends to be associated with higher inflation.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Short-run Phillips curve (SRPC)</strong> — shows the trade-off between inflation and unemployment at a given level of inflation expectations; the curve shifts when expectations change."
          },
          {
            type: "def",
            text: "<strong>Long-run Phillips curve (LRPC)</strong> — a vertical line at the natural rate of unemployment, implying no long-run trade-off: in the long run, inflation and unemployment are independent."
          }
        ]
      },
      {
        title: "SHORT-RUN VS LONG-RUN TRADE-OFF",
        items: [
          {
            type: "mech",
            text: "In the short run, expansionary policy reduces unemployment by boosting AD, but the tighter labour market pushes up <strong>wages and prices</strong>, moving up along the SRPC."
          },
          {
            type: "mech",
            text: "In the long run, workers adjust their <strong>inflation expectations</strong> upward; the SRPC shifts up, and unemployment returns to the natural rate at a higher inflation level."
          },
          {
            type: "imp",
            text: "The <strong>natural rate of unemployment (NRU)</strong> can only be reduced by supply-side policies that improve labour market flexibility, not by demand management.",
            tag: "exam"
          },
          {
            type: "link",
            text: "The LRPC being vertical at the NRU links directly to the LRAS analysis in 2.3.3: both represent the economy's long-run productive capacity, which demand policy alone cannot shift."
          }
        ]
      },
      {
        title: "EVALUATING TRADE-OFFS",
        items: [
          {
            type: "imp",
            text: "Some economists argue the Phillips curve has <strong>broken down</strong> in recent decades: globalisation, technology, and anchored expectations have weakened the inflation–unemployment link.",
            tag: "exam"
          },
          {
            type: "mech",
            text: "Policy credibility matters: if the central bank is <strong>trusted</strong> to keep inflation low, expectations remain anchored and the short-run trade-off improves (flatter SRPC)."
          },
          {
            type: "imp",
            text: "Supply-side policies can improve the trade-off by shifting the LRPC left (reducing the NRU), allowing both lower unemployment and lower inflation simultaneously."
          },
          {
            type: "link",
            text: "Policy trade-offs are the ultimate evaluation tool: whenever you recommend fiscal, monetary, or supply-side policy, discuss the trade-off with other objectives for balanced analysis."
          }
        ]
      }
    ],
    flow: {
      steps: ["Expansionary policy reduces unemployment (short-run)", "Wages and prices rise as labour market tightens", "Expectations adjust upward, SRPC shifts up", "Unemployment returns to NRU at higher inflation"],
      result: "No long-run trade-off — only supply-side policies reduce the NRU",
      resultType: "bad"
    },
    examMatters: "Examiners expect you to draw and label both the SRPC and LRPC, then use the diagram to explain why demand-side policy cannot permanently reduce unemployment below the natural rate. For top marks, evaluate whether the Phillips curve still holds, and discuss how supply-side policies can shift the LRPC leftward.",
    misconception: "Students say the Phillips curve means we must choose between inflation and unemployment permanently. Wrong because the long-run Phillips curve is vertical: in the long run there is no trade-off, and demand policy only changes the inflation rate. Instead write: the short-run trade-off exists but fades as expectations adjust; only supply-side policies can permanently reduce the natural rate of unemployment.",
    takeaway: [
      "The SRPC shows a short-run trade-off: lower unemployment at the cost of higher inflation.",
      "The LRPC is vertical at the NRU: no long-run trade-off between inflation and unemployment.",
      "Supply-side policies can shift the LRPC left, permanently reducing the NRU.",
      "Always use trade-offs as evaluation when recommending any macroeconomic policy."
    ]
  }

];

/* ═══════════════════════════════════════════════════════════
 *  RUNNER — push rich notes for all three sections
 * ═══════════════════════════════════════════════════════════ */

const SECTIONS = [
  { id: 'national-income',                     label: '2.3.4 National Income',              notes: NOTES_234 },
  { id: 'economic-growth',                     label: '2.3.5 Economic Growth',              notes: NOTES_235 },
  { id: 'macroeconomic-objectives-policies',   label: '2.3.6 Macro Objectives & Policies',  notes: NOTES_236 },
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
  console.log('  ECONOMICS UNIT 2 Part 2 — Rich Notes Updater');
  console.log('  Sections: 2.3.4, 2.3.5, 2.3.6');
  console.log('  Format: rich blocks + flows');
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
