/**
 * SECTION UPGRADE — National Income (Economics 2.x)
 * ===================================================
 * Edexcel IAL Economics Unit 2 — National Income
 * Run with: node scripts/upgrade-content-economics-national-income.mjs
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL     || 'https://trweeckuswgkenckeqfb.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);

/* ── 1. SETTINGS ──────────────────────────────────────────────────────────── */

const SECTION_SLUG = 'national-income';
const SUBJECT_ID   = 'economics';

/* ── 2. CONTENT ───────────────────────────────────────────────────────────── */

const CONTENT = [

  /* ═══ Block 1: The Circular Flow of Income ═══ */
  {
    title: "The Circular Flow of Income",
    diagramRef: "Circular Flow",
    quizIndices: [0],
    practiceIndices: [0],
    sections: [
      {
        id: "two-sector-circular-flow",
        title: "The Two-Sector Model",
        keyIdea: "In the simplest economy, households supply factors to firms and receive income in return, which they spend on goods — creating a continuous circular flow.",
        body: [
          {
            type: "paragraph",
            text: "The **circular flow of income** is a model that shows how money flows between the main sectors of the economy. In the simplest **two-sector model**, there are only **households** and **firms**. Households supply factors of production (labour, land, capital, enterprise) to firms and receive factor incomes (wages, rent, interest, profit) in return."
          },
          {
            type: "paragraph",
            text: "Firms use these factors to produce goods and services, which households then buy with their income. This creates a continuous loop: income flows from firms to households as factor payments, and back from households to firms as consumer spending. In this closed model, total income always equals total expenditure and total output."
          },
          {
            type: "flow",
            steps: ["Households supply labour to firms", "Firms pay wages (factor income)", "Households spend income on goods", "Revenue returns to firms"],
            result: "Income = Expenditure = Output (the circular flow)",
            resultType: "good"
          }
        ],
        realExample: {
          emoji: "🏪",
          text: "**Tesco** employs over 300,000 workers in the UK, paying them wages that those workers then spend on groceries, rent, and other goods. A significant portion of that spending flows straight back to Tesco and other firms, illustrating the circular flow in action across the real economy."
        },
        misconception: "Students treat the circular flow as a description of reality rather than a simplified model. No real economy has only two sectors with no savings or government. Instead write: the two-sector model is a simplification that establishes the key insight — income equals expenditure equals output — before adding realistic complications like savings, taxes, and trade.",
        examMatters: "When drawing the circular flow, always label both the real flow (factors of production and goods) and the money flow (income and spending) going in opposite directions. Examiners want to see that you understand there are two flows, not just one.",
        recall: {
          type: "reorder",
          prompt: "Order the two-sector circular flow:",
          correctOrder: ["Households supply factors of production to firms", "Firms pay factor incomes to households", "Households spend income on goods and services", "Spending becomes revenue for firms"],
          shuffled: [2, 0, 3, 1]
        }
      },
      {
        id: "three-sector-model",
        title: "The Three-Sector and Open-Economy Models",
        keyIdea: "Adding the government and the foreign sector introduces injections that add to the flow and withdrawals that leak out, making the model more realistic.",
        body: [
          {
            type: "paragraph",
            text: "The **three-sector model** adds the government to the circular flow. The government **withdraws** income through taxation (T) and **injects** spending back through government expenditure (G). If G exceeds T, the government adds more to the flow than it takes out, boosting national income."
          },
          {
            type: "paragraph",
            text: "The **open-economy (four-sector) model** further adds the foreign sector. Exports (X) are an **injection** because overseas buyers add spending to the domestic economy. Imports (M) are a **withdrawal** because domestic income leaks abroad to pay for foreign goods. The complete model now has three injections (I, G, X) and three withdrawals (S, T, M)."
          },
          {
            type: "paragraph",
            text: "You should remember that the circular flow only remains stable when total injections equal total withdrawals. If injections exceed withdrawals, national income rises. If withdrawals exceed injections, national income falls. This is the foundation of macroeconomic equilibrium analysis."
          }
        ],
        realExample: {
          emoji: "🇸🇬",
          text: "**Singapore** has an extremely open economy where trade (exports plus imports) exceeds 300% of GDP. The injection from exports is massive, but so is the withdrawal from imports. Singapore's sustained growth depends on exports consistently exceeding imports, keeping net injections positive in the trade sector."
        },
        misconception: "Students list savings as an injection and investment as a withdrawal, getting them backwards. Savings leak out of the circular flow (withdrawal) because income is not spent on domestic goods. Instead write: savings, taxes, and imports are withdrawals that leak out; investment, government spending, and exports are injections that add back in.",
        examMatters: "Examiners frequently test whether you can correctly classify injections and withdrawals. A common trap is asking about transfer payments — these are government spending (injection) even though they are not payment for output. Always classify each flow before analysing its impact.",
        recall: {
          type: "fillin",
          prompt: "Complete the injections and withdrawals:",
          template: ["The three injections are investment, ___ spending, and exports", "→ The three withdrawals are ___, taxation, and imports", "→ If total injections > total withdrawals, national income ___"],
          answers: ["government", "savings", "rises"],
          hints: ["go________", "sa_____", "ri___"]
        }
      }
    ],
    takeaway: [
      "Two-sector flow: income = expenditure = output.",
      "Injections (I, G, X) add to the flow; withdrawals (S, T, M) leak out.",
      "National income rises when injections exceed withdrawals.",
      "The circular flow is a model, not a literal description."
    ]
  },

  /* ═══ Block 2: Injections and Withdrawals ═══ */
  {
    title: "Injections and Withdrawals",
    diagramRef: "Injections and Withdrawals",
    quizIndices: [1, 2],
    practiceIndices: [1],
    sections: [
      {
        id: "injections-explained",
        title: "Injections: I, G, and X",
        keyIdea: "Investment, government spending, and exports each add new spending to the circular flow from outside the household-firm loop, boosting national income.",
        body: [
          {
            type: "paragraph",
            text: "An **injection** is any addition of spending into the circular flow that does not originate from household consumption. There are three injections. **Investment (I)** is spending by firms on capital goods — machinery, factories, technology. **Government spending (G)** is expenditure on public services, infrastructure, and transfer payments."
          },
          {
            type: "paragraph",
            text: "**Exports (X)** represent spending by overseas buyers on domestically produced goods and services. Each injection adds new demand to the economy, increasing the total flow of income. When injections rise, firms produce more, hire more workers, and pay more income — the circular flow expands."
          },
          {
            type: "flow",
            steps: ["Firms invest in new machinery (I rises)", "Demand for capital goods increases", "Workers in capital-goods industries earn more income"],
            result: "National income rises beyond the initial injection",
            resultType: "good"
          }
        ],
        realExample: {
          emoji: "🚄",
          text: "**HS2**, the UK high-speed rail project, represents a government spending injection of over 100 billion pounds. This spending flows to construction firms, who pay workers, who then spend their wages in local shops — each round of spending adding to national income through the multiplier effect."
        },
        misconception: "Students confuse investment with saving or buying shares. In economics, investment means spending on new capital goods that increase productive capacity, not financial investment. Instead write: investment (I) in the circular flow refers specifically to firms' spending on physical capital — factories, machinery, and equipment — not the purchase of financial assets.",
        examMatters: "When discussing injections, always specify which component (I, G, or X) is changing and explain why. Saying \"injections increased\" is too vague. Examiners reward precise identification: \"government spending on infrastructure (G) increased by 5 billion, injecting new demand into the construction sector.\"",
        recall: {
          type: "reorder",
          prompt: "Order the injection types from private to public to foreign:",
          correctOrder: ["Investment (I) — firms spend on capital goods", "Government spending (G) — public services and infrastructure", "Exports (X) — overseas buyers purchase domestic output"],
          shuffled: [1, 2, 0]
        }
      },
      {
        id: "withdrawals-explained",
        title: "Withdrawals: S, T, and M",
        keyIdea: "Savings, taxation, and imports each remove spending from the circular flow, reducing the income available for domestic consumption.",
        body: [
          {
            type: "paragraph",
            text: "A **withdrawal** (or leakage) is any income that is not passed on as spending within the domestic circular flow. There are three withdrawals. **Savings (S)** occur when households choose not to spend part of their income. **Taxation (T)** removes income from households and firms before they can spend it."
          },
          {
            type: "paragraph",
            text: "**Imports (M)** represent spending that leaks abroad to pay for foreign goods rather than circulating domestically. Each withdrawal reduces the income available for the next round of spending. When withdrawals rise relative to injections, the circular flow contracts and national income falls."
          },
          {
            type: "flow",
            steps: ["Households save more of their income (S rises)", "Less income is spent on domestic goods", "Firms receive less revenue and cut production"],
            result: "National income contracts — the paradox of thrift",
            resultType: "bad"
          }
        ],
        realExample: {
          emoji: "🇨🇳",
          text: "**China's** household savings rate exceeds 30% of disposable income, far higher than most Western economies. This massive withdrawal through savings would contract the circular flow if not offset by equally large injections through investment and exports, which China has historically maintained through state-directed industrial policy."
        },
        misconception: "Students think withdrawals are bad for the economy. Savings fund investment, taxes fund public services, and imports provide goods consumers want. Instead write: withdrawals are not inherently harmful — they only reduce national income when they are not matched by equivalent injections back into the circular flow.",
        examMatters: "A common exam question asks you to explain what happens when one withdrawal increases. Always trace the full impact: the immediate reduction in spending, the consequent fall in firms' revenue, the reduction in factor incomes, and the further rounds of reduced spending (the negative multiplier effect).",
        recall: {
          type: "fillin",
          prompt: "Complete the withdrawals:",
          template: ["___ removes income that households choose not to spend", "→ ___ removes income through compulsory government levies", "→ ___ sends domestic income abroad to pay for foreign goods"],
          answers: ["Savings", "Taxation", "Imports"],
          hints: ["Sa_____", "Ta______", "Im_____"]
        }
      },
      {
        id: "injections-withdrawals-balance",
        title: "The Injections-Withdrawals Balance",
        keyIdea: "National income is in equilibrium when total injections equal total withdrawals — any imbalance triggers an expansion or contraction of the economy.",
        body: [
          {
            type: "paragraph",
            text: "The circular flow is in **equilibrium** when total injections (I + G + X) equal total withdrawals (S + T + M). At this point, the additions to the flow exactly offset the leakages, and national income remains stable from one period to the next."
          },
          {
            type: "paragraph",
            text: "If injections exceed withdrawals, there is more spending entering the economy than leaving it. Firms experience rising demand, increase output, and hire more workers — national income rises. This expansion continues until the resulting rise in income generates enough extra saving, tax revenue, and import spending to restore equality."
          },
          {
            type: "paragraph",
            text: "Conversely, if withdrawals exceed injections, demand falls short of output, inventories pile up, and firms cut production and employment. National income contracts until the fall in income reduces savings, tax payments, and imports enough to restore balance."
          }
        ],
        realExample: {
          emoji: "🇦🇺",
          text: "**Australia** enjoyed 28 consecutive years of economic growth (1991-2019) partly because its mining export boom kept injections consistently above withdrawals. Rising export revenues (X) from iron ore and coal to China continuously added to the circular flow, outpacing the leakages from imports and savings."
        },
        misconception: "Students write \"I = S, G = T, and X = M must each hold separately for equilibrium.\" That is incorrect. Only the totals must balance: I + G + X = S + T + M. Instead write: equilibrium requires total injections to equal total withdrawals, but the individual pairs do not need to match — a budget deficit (G > T) can coexist with equilibrium if other withdrawals compensate.",
        examMatters: "This is a key analytical framework. When the question gives you data on injections and withdrawals, calculate whether total injections exceed or fall short of total withdrawals, then predict the direction of change in national income. Always show the calculation explicitly.",
        recall: {
          type: "reorder",
          prompt: "Order the equilibrium adjustment process:",
          correctOrder: ["Injections exceed withdrawals", "Firms experience rising demand", "National income increases", "Higher income raises S, T, and M until injections equal withdrawals"],
          shuffled: [3, 1, 0, 2]
        }
      }
    ],
    takeaway: [
      "Injections (I + G + X) add spending; withdrawals (S + T + M) leak it out.",
      "Equilibrium: total injections = total withdrawals.",
      "Imbalance triggers expansion or contraction until balance restores.",
      "Individual pairs (I/S, G/T, X/M) need not balance separately."
    ]
  },

  /* ═══ Block 3: Equilibrium National Income ═══ */
  {
    title: "Equilibrium National Income",
    diagramRef: "National Income Equilibrium",
    quizIndices: [3],
    practiceIndices: [2],
    sections: [
      {
        id: "planned-vs-actual",
        title: "Planned vs Actual Expenditure",
        keyIdea: "The economy is in equilibrium only when planned spending by all sectors matches actual output — any gap triggers unplanned inventory changes that push income toward equilibrium.",
        body: [
          {
            type: "paragraph",
            text: "**Planned (or desired) expenditure** is the total amount that households, firms, the government, and overseas buyers intend to spend at a given level of national income. **Actual expenditure** is what is really spent, and in national accounting it always equals actual output because unsold goods count as inventory investment."
          },
          {
            type: "paragraph",
            text: "Equilibrium occurs when planned expenditure equals actual output. If planned spending exceeds output, inventories run down faster than expected — firms respond by increasing production. If planned spending falls short, inventories pile up unexpectedly — firms cut back production."
          },
          {
            type: "flow",
            steps: ["Planned expenditure > actual output", "Inventories fall below desired levels", "Firms increase production to rebuild stocks"],
            result: "National income rises toward equilibrium",
            resultType: "good"
          }
        ],
        realExample: {
          emoji: "🚗",
          text: "**Toyota** uses a just-in-time inventory system that makes unplanned inventory changes immediately visible. If dealer orders exceed production (planned expenditure > output), Toyota ramps up factory shifts within weeks. This micro-level adjustment is exactly the mechanism that drives the macro economy toward equilibrium."
        },
        misconception: "Students say \"the economy is always in equilibrium because actual spending equals actual output.\" This is an accounting identity, not economic equilibrium. Instead write: equilibrium requires planned expenditure to equal output — actual expenditure equals output by definition through unplanned inventory changes, but that does not mean the economy is in equilibrium.",
        examMatters: "The distinction between planned and actual expenditure is a common source of exam errors. If you are asked to explain the adjustment to equilibrium, always start with the gap between planned spending and output, then explain how unplanned inventory changes signal firms to adjust production.",
        recall: {
          type: "fillin",
          prompt: "Complete the equilibrium adjustment:",
          template: ["Equilibrium: ___ expenditure equals actual output", "→ If planned spending > output, inventories ___ unexpectedly", "→ Firms respond by ___ production until equilibrium is restored"],
          answers: ["planned", "fall", "increasing"],
          hints: ["pl_____", "fa__", "in________"]
        }
      },
      {
        id: "adjustment-to-equilibrium",
        title: "The Adjustment Process",
        keyIdea: "When the economy is out of equilibrium, the inventory signal mechanism creates a chain reaction of output and income changes that converge toward the equilibrium level.",
        body: [
          {
            type: "paragraph",
            text: "Suppose firms are currently producing more output than consumers and other sectors plan to buy. Unsold goods pile up as **unplanned inventory accumulation**. Firms interpret this as a signal to cut production. As they produce less, they need fewer workers, so incomes fall, which reduces spending further."
          },
          {
            type: "paragraph",
            text: "This contraction continues through multiple rounds until national income has fallen to the level where planned expenditure matches output. At that point, inventories stabilise, firms stop cutting production, and the economy reaches a new equilibrium."
          },
          {
            type: "flow",
            steps: ["Output exceeds planned spending", "Inventories accumulate unexpectedly", "Firms cut production and employment"],
            result: "National income contracts to equilibrium",
            resultType: "neutral"
          }
        ],
        realExample: {
          emoji: "🏠",
          text: "**US homebuilders** in 2007-2008 found themselves with massive unsold housing inventory as planned purchases collapsed. They slashed construction by over 70%, laying off millions of workers whose lost income further reduced spending — a dramatic real-world example of the inventory-driven contraction mechanism."
        },
        misconception: "Students describe the adjustment as instantaneous. In reality, it takes time for firms to observe inventory changes, decide to adjust production, and for the income effects to ripple through the economy. Instead write: the adjustment to equilibrium operates through multiple rounds of output and income changes, and the process can take several quarters or even years in a severe downturn.",
        examMatters: "When explaining the adjustment process, use a step-by-step chain of reasoning. Examiners give marks for each link: excess output leads to unplanned inventories, which leads to production cuts, which leads to falling incomes, which leads to falling spending, until equilibrium is restored.",
        recall: {
          type: "reorder",
          prompt: "Order the adjustment to equilibrium when output exceeds planned spending:",
          correctOrder: ["Output exceeds planned expenditure", "Unplanned inventory accumulation occurs", "Firms cut production and lay off workers", "Falling income reduces spending until equilibrium is restored"],
          shuffled: [2, 0, 3, 1]
        }
      }
    ],
    takeaway: [
      "Equilibrium: planned expenditure = actual output.",
      "Unplanned inventory changes signal firms to adjust production.",
      "Excess output leads to contraction; excess demand leads to expansion.",
      "Adjustment happens over multiple rounds, not instantly."
    ]
  },

  /* ═══ Block 4: The Multiplier and National Income ═══ */
  {
    title: "The Multiplier and National Income",
    diagramRef: "The Multiplier",
    quizIndices: [4, 5],
    practiceIndices: [3],
    sections: [
      {
        id: "multiplier-concept",
        title: "The Multiplier Concept",
        keyIdea: "An initial injection creates a chain of re-spending that raises national income by more than the original amount — the multiplier tells you by how much more.",
        body: [
          {
            type: "paragraph",
            text: "The **multiplier effect** describes how an initial change in spending leads to a larger final change in national income. When the government spends an extra one billion pounds on infrastructure, construction workers earn new income. They spend a proportion of it, which becomes income for shopkeepers, who spend a proportion of that, and so on."
          },
          {
            type: "paragraph",
            text: "Each successive round of spending is smaller than the last because some income leaks out as savings, taxes, and imports at every stage. The total increase in national income is the sum of all these rounds — always larger than the initial injection but not infinite, because the leakages ensure the rounds diminish toward zero."
          },
          {
            type: "flow",
            steps: ["Government injects 1bn into the economy", "Workers spend 0.8bn (save 0.2bn)", "Recipients of that 0.8bn spend 0.64bn"],
            result: "Final rise in national income = 5bn (multiplier = 5)",
            resultType: "good"
          }
        ],
        realExample: {
          emoji: "🏗️",
          text: "**The 2009 American Recovery and Reinvestment Act** injected $787 billion into the US economy through tax cuts and government spending. The Congressional Budget Office estimated a multiplier of 1.5 to 2.5, meaning the total impact on GDP was between $1.2 trillion and $2.0 trillion — significantly more than the initial injection."
        },
        misconception: "Students think the multiplier means money is created out of thin air. It does not. Instead write: the multiplier works because each person's spending becomes another person's income — the same money circulates through multiple hands, and each round adds to total income until leakages absorb the entire initial injection.",
        examMatters: "Multiplier questions appear in both calculation and essay form. For calculations, always show the formula and your working. For essays, explain the process round by round and evaluate by discussing factors that might reduce the multiplier in practice, such as a high marginal propensity to save or import.",
        recall: {
          type: "fillin",
          prompt: "Complete the multiplier process:",
          template: ["An initial ___ creates new income for recipients", "→ Recipients ___ a proportion and save the rest", "→ Each round is smaller due to ___ at every stage"],
          answers: ["injection", "spend", "leakages"],
          hints: ["in________", "sp___", "le______"]
        }
      },
      {
        id: "multiplier-formula",
        title: "The Multiplier Formula",
        keyIdea: "The multiplier equals 1 divided by the marginal propensity to withdraw — the higher the leakage rate, the smaller the multiplier effect.",
        body: [
          {
            type: "paragraph",
            text: "The simplest multiplier formula is **k = 1 / (1 - MPC)**, where MPC is the **marginal propensity to consume** — the fraction of each extra pound of income that is spent on domestic goods. If MPC = 0.8, then k = 1 / (1 - 0.8) = 1 / 0.2 = 5. A one-pound injection raises national income by five pounds."
          },
          {
            type: "paragraph",
            text: "An equivalent formula uses the **marginal propensity to withdraw (MPW)**: **k = 1 / MPW**, where MPW = MPS + MPT + MPM (the marginal propensities to save, tax, and import). The larger the total leakage rate, the smaller the multiplier. An economy with high savings, high taxes, and high imports has a small multiplier."
          },
          {
            type: "paragraph",
            text: "You should understand that the multiplier works in both directions. A withdrawal of spending (for example, a cut in government expenditure) has a negative multiplier effect, reducing national income by a multiple of the initial cut. This symmetry is why austerity during a recession can be self-defeating."
          }
        ],
        realExample: {
          emoji: "🇬🇧",
          text: "**The UK** has an estimated MPW of around 0.65 (MPS 0.10 + MPT 0.30 + MPM 0.25), giving a multiplier of roughly 1.5. This relatively small multiplier explains why UK fiscal stimulus has a more modest impact on GDP than in more closed economies with lower tax rates and import propensities."
        },
        misconception: "Students use 1/(1-MPC) and forget that MPC must exclude the portions lost to tax and imports. If someone earns a pound and pays 30p in tax, saves 10p, and spends 25p on imports, MPC for the domestic multiplier is only 0.35. Instead write: when calculating the multiplier, account for all three leakages — savings, taxation, and imports — not just savings alone.",
        examMatters: "In calculation questions, examiners often give you the MPC or the individual marginal propensities and ask you to calculate the multiplier and the final change in income. Show every step: state the formula, calculate MPW or (1 - MPC), compute k, then multiply k by the initial injection.",
        recall: {
          type: "reorder",
          prompt: "Order the multiplier calculation steps:",
          correctOrder: ["Identify MPC or the individual MPW components (MPS, MPT, MPM)", "Calculate MPW = MPS + MPT + MPM (or 1 - MPC)", "Compute multiplier: k = 1 / MPW", "Final change in income = k x initial injection"],
          shuffled: [2, 0, 3, 1]
        }
      },
      {
        id: "multiplier-evaluation",
        title: "Evaluating the Multiplier",
        keyIdea: "In reality, the multiplier is smaller and slower than the simple formula suggests because of time lags, crowding out, and the economy's position relative to capacity.",
        body: [
          {
            type: "paragraph",
            text: "The simple multiplier formula assumes that the economy has spare capacity, that MPC is constant, and that there are no offsetting effects. In practice, several factors reduce the real-world multiplier. **Time lags** mean the full effect takes months or years to materialise. **Crowding out** occurs if government borrowing raises interest rates, reducing private investment."
          },
          {
            type: "paragraph",
            text: "The **position of the economy** matters enormously. When the economy has significant spare capacity (on the flat part of the Keynesian AS curve), the multiplier is larger because extra demand translates into real output. Near full capacity, extra demand mainly pushes up prices rather than output, reducing the real multiplier."
          },
          {
            type: "paragraph",
            text: "You should also consider **consumer and business confidence**. If people expect a recession, they may save their extra income rather than spend it, reducing MPC and shrinking the multiplier. This is why fiscal stimulus sometimes fails to generate the expected boost — the multiplier depends on psychology as well as arithmetic."
          }
        ],
        realExample: {
          emoji: "🇬🇷",
          text: "**Greece's** austerity programme after 2010 demonstrated the multiplier in reverse. The IMF initially estimated a fiscal multiplier of 0.5, but the actual contraction was far worse because the negative multiplier was closer to 1.5. Spending cuts reduced income, which reduced tax revenues, which required further cuts — a vicious deflationary spiral."
        },
        misconception: "Students present the multiplier as a fixed number for a country. The multiplier varies depending on the state of the economy, consumer confidence, and the type of spending. Instead write: the multiplier is not a fixed value — it is larger during recessions with spare capacity and smaller near full employment, and it varies with the type of injection and the prevailing level of confidence.",
        examMatters: "Top-band answers always evaluate the multiplier by discussing the factors that might make it larger or smaller in the specific context of the question. Simply calculating k = 5 and stating income rises by 5 billion is not enough — you must discuss whether the real-world multiplier is likely to be that large and why.",
        recall: {
          type: "fillin",
          prompt: "Complete the multiplier evaluation:",
          template: ["___ lags mean the multiplier effect takes time to materialise", "→ ___ out occurs when government borrowing raises interest rates", "→ Near full capacity, extra demand raises ___ rather than output"],
          answers: ["Time", "Crowding", "prices"],
          hints: ["Ti__", "Cr______", "pr____"]
        }
      }
    ],
    takeaway: [
      "Multiplier: k = 1/(1-MPC) or k = 1/MPW.",
      "Higher leakages (S, T, M) mean a smaller multiplier.",
      "The multiplier works in reverse for spending cuts.",
      "Real-world multipliers are smaller due to lags and crowding out."
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
