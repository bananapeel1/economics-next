/**
 * SECTION UPGRADE — Aggregate Demand (Economics 2.2)
 * ====================================================
 * Edexcel IAL Economics Unit 2, spec point 2.2
 * Run with: node scripts/upgrade-content-economics-aggregate-demand.mjs
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL     || 'https://trweeckuswgkenckeqfb.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);

/* ── 1. SETTINGS ──────────────────────────────────────────────────────────── */

const SECTION_SLUG = 'aggregate-demand';
const SUBJECT_ID   = 'economics';

/* ── 2. CONTENT ───────────────────────────────────────────────────────────── */

const CONTENT = [

  /* ═══ Block 1: Components of Aggregate Demand ═══ */
  {
    title: "Components of Aggregate Demand",
    quizIndices: [0],
    sections: [
      {
        id: "ad-formula-and-components",
        title: "The AD Formula",
        keyIdea: "Aggregate demand is total planned spending in an economy and is calculated as AD = C + I + G + (X - M), where each component is driven by different factors.",
        body: [
          {
            type: "paragraph",
            text: "**Aggregate demand (AD)** is the total planned expenditure on goods and services in an economy at a given price level over a given time period. It is calculated using the formula: **AD = C + I + G + (X - M)**. This is the same as the expenditure method of measuring GDP, but viewed from the demand side."
          },
          {
            type: "bullets",
            items: [
              "**C (Consumption)** -- household spending on goods and services; typically the largest component (60-70% of AD).",
              "**I (Investment)** -- spending by firms on capital goods (machinery, factories, technology).",
              "**G (Government spending)** -- government expenditure on public services and infrastructure (excludes transfer payments).",
              "**(X - M) (Net exports)** -- the value of exports minus imports; positive if exports exceed imports."
            ]
          },
          {
            type: "paragraph",
            text: "Understanding what drives each component is essential because any change in C, I, G or (X - M) will shift the AD curve. A rise in any component increases AD; a fall decreases it. The relative importance of each component varies between countries."
          }
        ],
        realExample: {
          emoji: "🇬🇧",
          text: "**In the UK economy**, consumption accounts for roughly 63% of AD, government spending about 20%, investment around 17%, and net exports are typically negative at about -2%. This composition means changes in consumer confidence have the largest impact on UK aggregate demand."
        },
        misconception: "Students include transfer payments like pensions in G. Government spending in the AD formula only includes spending on goods and services (teachers' salaries, road building), not transfer payments. Instead write: G in the AD formula counts government purchases of goods and services, not transfers like benefits which are counted when recipients spend them as part of C.",
        examMatters: "Examiners expect you to state the AD formula and define each component precisely. When analysing a change in AD, identify which component is changing and explain why. Simply stating \"AD increases\" without linking to a specific component earns minimal marks.",
        recall: {
          type: "fillin",
          prompt: "Complete the AD formula and components:",
          template: ["AD = C + I + G + (X - ___)", "→ C is household ___ on goods and services", "→ G excludes ___ payments like pensions and benefits"],
          answers: ["M", "consumption", "transfer"],
          hints: ["_", "co_________", "tr_______"]
        }
      },
      {
        id: "determinants-of-consumption",
        title: "Determinants of Consumption (C)",
        keyIdea: "Consumption depends on disposable income, interest rates, consumer confidence, wealth effects and the availability of credit -- it is the largest and most volatile component of AD.",
        body: [
          {
            type: "paragraph",
            text: "**Consumption (C)** is household spending on goods and services. It is the largest component of AD in most economies. The main determinant is **disposable income** -- the income left after taxes and benefits. As disposable income rises, consumption rises, but not by as much because some is saved."
          },
          {
            type: "flow",
            steps: ["Disposable income rises", "Households spend more (but also save more)", "Consumption increases"],
            result: "AD shifts right -- economic activity expands",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "Other determinants include **interest rates** (lower rates reduce saving and borrowing costs, boosting consumption), **consumer confidence** (optimistic households spend more), **wealth effects** (rising house or share prices make people feel richer), and **availability of credit** (easier access to loans increases spending). Tax changes also affect disposable income directly."
          }
        ],
        realExample: {
          emoji: "🏠",
          text: "**UK house prices** rose by over 25% between 2020 and 2022, creating a massive positive wealth effect. Homeowners felt richer and increased their spending, boosting consumption and AD. When house prices later stalled and interest rates rose sharply in 2023, the wealth effect reversed and consumption growth slowed significantly."
        },
        misconception: "Students write \"a rise in income means consumption rises by the same amount.\" The marginal propensity to consume is less than 1 -- households save a portion of any extra income. Instead write: consumption rises with income, but by less than the full increase because households also save a proportion, determined by the marginal propensity to save.",
        examMatters: "When explaining a change in consumption, examiners want you to identify the specific factor (income, interest rates, confidence, wealth, credit) and trace the chain to AD. A vague statement like \"people spend more\" without identifying the driver is insufficient.",
        recall: {
          type: "reorder",
          prompt: "Put the interest rate effect on consumption in order:",
          correctOrder: ["Central bank cuts interest rates", "Saving becomes less attractive; borrowing becomes cheaper", "Households increase spending on credit-financed goods", "Consumption rises, shifting AD to the right"],
          shuffled: [2, 0, 3, 1]
        }
      },
      {
        id: "determinants-of-investment",
        title: "Determinants of Investment (I)",
        keyIdea: "Investment depends on interest rates, business confidence, expected profits, technological change and the availability of finance -- it is the most volatile component of AD.",
        body: [
          {
            type: "paragraph",
            text: "**Investment (I)** is spending by firms on **capital goods** -- machinery, equipment, factories, technology and new buildings. It does not include financial investments like buying shares. Investment is the most **volatile** component of AD because it depends heavily on expectations about the future, which can change rapidly."
          },
          {
            type: "paragraph",
            text: "The main determinants are **interest rates** (lower rates reduce the cost of borrowing for investment), **business confidence** (firms invest more when they expect strong future demand), **expected profitability** (higher expected returns make projects worthwhile), and **technological change** (new technology creates investment opportunities)."
          },
          {
            type: "flow",
            steps: ["Interest rates fall", "Cost of borrowing decreases", "More investment projects become profitable"],
            result: "Investment rises, shifting AD to the right",
            resultType: "good"
          }
        ],
        realExample: {
          emoji: "📱",
          text: "**Apple** invested over $20 billion in R&D in 2023, driven by expected profitability from AI and augmented reality products rather than current interest rates. When business confidence is high and firms expect technological breakthroughs, investment can surge even when borrowing costs are elevated. This shows that expectations matter as much as interest rates."
        },
        misconception: "Students assume investment only depends on interest rates. Business confidence and expected future demand are often more important, especially for large firms that fund investment from retained profits. Instead write: while interest rates affect the cost of borrowing, business confidence and expected profitability are often the primary drivers of investment decisions.",
        examMatters: "Questions on investment frequently ask you to evaluate the relative importance of different determinants. A strong answer discusses interest rates but also argues that animal spirits (business confidence) and expected demand may matter more. Use real examples to support your argument.",
        recall: {
          type: "fillin",
          prompt: "Complete the determinants of investment:",
          template: ["Investment is spending by firms on ___ goods", "→ Lower interest rates reduce the cost of ___", "→ Business ___ is often more important than interest rates"],
          answers: ["capital", "borrowing", "confidence"],
          hints: ["ca_____", "bo________", "co________"]
        }
      },
      {
        id: "determinants-of-gov-spending-net-exports",
        title: "Government Spending (G) and Net Exports (X-M)",
        keyIdea: "Government spending is a policy choice influenced by fiscal priorities, while net exports depend on exchange rates, relative competitiveness and trading partner incomes.",
        body: [
          {
            type: "paragraph",
            text: "**Government spending (G)** on goods and services is determined by fiscal policy decisions. Governments may increase G to stimulate the economy during a recession (expansionary fiscal policy) or cut G to reduce a budget deficit (austerity). G includes spending on healthcare, education, defence and infrastructure but excludes transfer payments."
          },
          {
            type: "paragraph",
            text: "**Net exports (X - M)** depend on several factors. A **weaker exchange rate** makes exports cheaper and imports more expensive, improving net exports. **Higher incomes in trading partner countries** boost demand for your exports. **Relative inflation rates** affect competitiveness -- if your prices rise faster than competitors', exports become less attractive."
          },
          {
            type: "flow",
            steps: ["Exchange rate depreciates", "Exports become cheaper abroad", "Imports become more expensive domestically"],
            result: "Net exports improve, shifting AD to the right",
            resultType: "good"
          }
        ],
        realExample: {
          emoji: "💷",
          text: "**After the Brexit referendum** in June 2016, the pound fell by approximately 15% against the dollar. This depreciation made British exports cheaper for foreign buyers and imports more expensive for UK consumers. The UK's net export position temporarily improved, partially offsetting the negative confidence shock to consumption and investment."
        },
        misconception: "Students forget that government transfer payments are excluded from G. Unemployment benefits and pensions are transfers, not government purchases of goods and services. Instead write: G in the AD formula only counts government purchases of goods and services; transfer payments affect AD indirectly when recipients spend them, which is captured in C.",
        examMatters: "When analysing net exports, examiners expect you to consider the exchange rate, relative inflation, and foreign income levels. If given data on exchange rate changes, trace the effect through to exports, imports and then AD. Remember that exchange rate effects take time -- the J-curve effect means net exports may initially worsen before improving.",
        recall: {
          type: "reorder",
          prompt: "Put the exchange rate effect on net exports in order:",
          correctOrder: ["Exchange rate depreciates (currency weakens)", "Export prices fall in foreign currency terms", "Import prices rise in domestic currency terms", "Net exports improve, increasing AD"],
          shuffled: [3, 1, 0, 2]
        }
      }
    ],
    takeaway: [
      "AD = C + I + G + (X - M); consumption is the largest component.",
      "Investment is the most volatile, driven by confidence and interest rates.",
      "G excludes transfer payments; only goods and services count.",
      "Net exports depend on exchange rates, competitiveness and foreign incomes."
    ]
  },

  /* ═══ Block 2: The AD Curve ═══ */
  {
    title: "The AD Curve",
    diagramRef: "Aggregate Demand Curve",
    quizIndices: [1],
    sections: [
      {
        id: "shape-of-ad-curve",
        title: "Shape of the AD Curve",
        keyIdea: "The AD curve slopes downward because a lower price level increases real wealth, reduces interest rates and makes exports cheaper, all of which boost total spending.",
        body: [
          {
            type: "paragraph",
            text: "The **AD curve** shows the relationship between the **general price level** and the **total quantity of real output demanded** in the economy. It slopes **downward from left to right**, meaning that as the price level falls, the total quantity of goods and services demanded rises. This is not the same as a microeconomic demand curve -- it applies to the whole economy."
          },
          {
            type: "paragraph",
            text: "Three effects explain the downward slope. The **wealth effect (Pigou effect)**: a lower price level increases the real value of people's savings, making them feel wealthier and spend more. The **interest rate effect (Keynes effect)**: lower prices reduce the demand for money, pushing interest rates down and boosting consumption and investment. The **trade effect**: lower domestic prices make exports more competitive and imports relatively expensive, improving net exports."
          },
          {
            type: "flow",
            steps: ["General price level falls", "Real wealth rises, interest rates fall, exports become cheaper", "C, I and (X-M) all increase"],
            result: "Total real output demanded rises -- movement along AD",
            resultType: "good"
          }
        ],
        realExample: {
          emoji: "📊",
          text: "**During the 2008-2009 global financial crisis**, many economies saw price levels stabilise or fall slightly. The wealth effect should have boosted spending, but confidence collapsed so severely that the theoretical effects were overwhelmed. This shows that the AD curve's slope assumes other factors remain constant (ceteris paribus)."
        },
        misconception: "Students explain the AD curve's downward slope using microeconomic reasoning like substitution between goods. The AD curve slopes down because of the wealth, interest rate and trade effects at the macroeconomic level. Instead write: the AD curve slopes downward due to the wealth effect, the interest rate effect and the trade effect -- not because consumers substitute between goods.",
        examMatters: "Examiners frequently ask why the AD curve slopes downward. You must explain at least two of the three macro effects (wealth, interest rate, trade) to access full marks. Simply saying \"lower prices mean people buy more\" without explaining the transmission mechanism is not sufficient.",
        recall: {
          type: "fillin",
          prompt: "Complete the three effects explaining the AD curve's slope:",
          template: ["The ___ effect: lower prices increase real value of savings", "→ The interest rate effect: lower prices reduce demand for ___, cutting interest rates", "→ The ___ effect: lower domestic prices make exports more competitive"],
          answers: ["wealth", "money", "trade"],
          hints: ["we____", "mo___", "tr___"]
        }
      },
      {
        id: "movements-along-ad",
        title: "Movements Along the AD Curve",
        keyIdea: "A change in the general price level causes a movement along the AD curve -- not a shift -- because the price level is on the vertical axis.",
        body: [
          {
            type: "paragraph",
            text: "A **movement along the AD curve** occurs when the **general price level** changes and nothing else. If the price level rises, you move up and to the left along the AD curve -- the total quantity of real output demanded falls. If the price level falls, you move down and to the right -- the total quantity demanded rises."
          },
          {
            type: "paragraph",
            text: "This is directly analogous to the micro distinction between movements along and shifts of a demand curve. The price level is on the vertical axis, so any change in the price level is represented by a movement along the existing AD curve. Changes in anything else (C, I, G, X or M determinants) cause a shift."
          },
          {
            type: "flow",
            steps: ["General price level rises", "Wealth, interest rate and trade effects reduce spending"],
            result: "Movement up-left along AD: less real output demanded",
            resultType: "neutral"
          }
        ],
        realExample: {
          emoji: "⬆️",
          text: "**When UK inflation surged** above 10% in 2022, the rising price level caused a movement along the AD curve. Higher prices eroded real wealth (wealth effect), pushed the Bank of England to raise interest rates (interest rate effect), and made UK exports less competitive (trade effect). All three effects reduced the quantity of real output demanded."
        },
        misconception: "Students say a rise in the price level \"shifts AD to the left.\" A price-level change causes a movement along the AD curve, not a shift. Instead write: the price level is on the vertical axis, so changes in the price level cause movements along AD; only changes in the underlying determinants of C, I, G or (X-M) shift the curve.",
        examMatters: "This is the single most common mistake in macroeconomics diagrams. If you show a price-level change as a shift rather than a movement, you will lose marks on any AD/AS diagram question. Always check: is the change in the price level (movement) or in something else (shift)?",
        recall: {
          type: "reorder",
          prompt: "Put the movement along AD in the correct order:",
          correctOrder: ["General price level changes", "Wealth, interest rate and trade effects activate", "Total quantity of real output demanded changes", "This is shown as a movement along the existing AD curve"],
          shuffled: [3, 1, 0, 2]
        }
      }
    ],
    takeaway: [
      "AD slopes down due to wealth, interest rate and trade effects.",
      "A price-level change causes a movement along AD, not a shift.",
      "Do not use micro reasoning (substitution) for the macro AD curve."
    ]
  },

  /* ═══ Block 3: Shifts in Aggregate Demand ═══ */
  {
    title: "Shifts in Aggregate Demand",
    diagramRef: "Shifts in Aggregate Demand",
    quizIndices: [2],
    practiceIndices: [0],
    sections: [
      {
        id: "factors-shifting-ad-right",
        title: "Factors That Shift AD to the Right",
        keyIdea: "AD shifts right when any component (C, I, G or net exports) increases due to a factor other than the price level, meaning more output is demanded at every price level.",
        body: [
          {
            type: "paragraph",
            text: "A **rightward shift of the AD curve** means that at every price level, the total quantity of real output demanded is higher. This occurs when any of the four components of AD increases for reasons other than a change in the general price level. You must identify which component is changing and explain the mechanism."
          },
          {
            type: "bullets",
            items: [
              "**Rise in consumer confidence or wealth** -- boosts C, shifting AD right.",
              "**Cut in interest rates** -- encourages borrowing and spending (C and I rise).",
              "**Tax cuts or higher government spending** -- directly increases C or G.",
              "**Depreciation of the exchange rate** -- improves net exports (X-M).",
              "**Rise in trading partner incomes** -- increases demand for exports (X rises)."
            ]
          },
          {
            type: "flow",
            steps: ["Central bank cuts interest rates", "Borrowing costs fall for households and firms", "Consumption and investment increase"],
            result: "AD shifts right at every price level",
            resultType: "good"
          }
        ],
        realExample: {
          emoji: "💰",
          text: "**The UK government's** 2020 furlough scheme injected over $70 billion into the economy, maintaining household incomes and consumption when the private sector had shut down. This massive fiscal expansion shifted AD sharply to the right, preventing a deeper collapse in output. GDP still fell 11% that year, but without the scheme the fall would have been far worse."
        },
        misconception: "Students draw AD shifting right and say \"because demand increased\" without explaining which component changed or why. A shift must be linked to a specific factor affecting C, I, G or (X-M). Instead write: identify the specific factor (e.g. tax cut increases disposable income), explain which AD component it affects (C rises), and then state that AD shifts right.",
        examMatters: "When drawing and explaining an AD shift, examiners want three things: the cause (name the specific factor), the transmission mechanism (explain how it affects a component of AD), and the consequence (show the shift on a diagram and explain the effect on price level and real output). Missing any step costs marks.",
        recall: {
          type: "fillin",
          prompt: "Complete the AD rightward shift chain:",
          template: ["A cut in income tax increases household ___ income", "→ Consumption (C) ___", "→ AD shifts to the ___ at every price level"],
          answers: ["disposable", "rises", "right"],
          hints: ["di_________", "ri___", "ri___"]
        }
      },
      {
        id: "factors-shifting-ad-left",
        title: "Factors That Shift AD to the Left",
        keyIdea: "AD shifts left when spending falls at every price level, caused by factors like rising interest rates, falling confidence, austerity, or a currency appreciation.",
        body: [
          {
            type: "paragraph",
            text: "A **leftward shift of the AD curve** means that at every price level, less real output is demanded. This happens when any component of AD falls. Common causes include **rising interest rates** (which reduce C and I), **falling consumer or business confidence** (which cuts spending), and **government austerity** (cuts to G)."
          },
          {
            type: "bullets",
            items: [
              "**Rise in interest rates** -- discourages borrowing, reduces C and I.",
              "**Fall in consumer confidence** -- households save more and spend less (C falls).",
              "**Appreciation of the exchange rate** -- makes exports expensive and imports cheap (X-M worsens).",
              "**Government spending cuts or tax rises** -- austerity directly reduces G or C.",
              "**Recession in trading partner economies** -- demand for exports falls (X drops)."
            ]
          },
          {
            type: "flow",
            steps: ["Central bank raises interest rates", "Borrowing becomes more expensive", "Consumption and investment both fall"],
            result: "AD shifts left -- output and employment decline",
            resultType: "bad"
          }
        ],
        realExample: {
          emoji: "🏦",
          text: "**The Bank of England** raised interest rates from 0.1% to 5.25% between December 2021 and August 2023 to combat inflation. Higher mortgage payments and borrowing costs reduced household consumption and business investment, shifting AD to the left. The economy narrowly avoided a recession, with GDP growth stalling near zero."
        },
        misconception: "Students write \"AD falls\" when they mean AD shifts left. AD is a curve, not a number -- it shifts position. Instead write: when a non-price-level factor reduces planned spending, the AD curve shifts to the left, meaning less real output is demanded at every price level.",
        examMatters: "Examiners penalise imprecise language. Say \"AD shifts left\" not \"AD falls\" or \"AD decreases.\" On your diagram, show two clearly labelled AD curves (AD1 and AD2) with an arrow indicating the direction of the shift. Always link the shift to a specific cause and explain the effect on equilibrium.",
        recall: {
          type: "reorder",
          prompt: "Put the interest rate rise effect on AD in order:",
          correctOrder: ["Central bank raises the base interest rate", "Cost of borrowing rises for households and firms", "Consumption and investment both decline", "AD curve shifts to the left"],
          shuffled: [2, 0, 3, 1]
        }
      }
    ],
    takeaway: [
      "AD shifts right when C, I, G or (X-M) increase for non-price reasons.",
      "AD shifts left when spending components fall (higher rates, lower confidence).",
      "Always name the specific factor, the component affected, and the direction.",
      "Say \"AD shifts left/right\" not \"AD falls/rises\" -- AD is a curve."
    ]
  },

  /* ═══ Block 4: The Multiplier ═══ */
  {
    title: "The Multiplier",
    quizIndices: [3],
    practiceIndices: [1],
    sections: [
      {
        id: "multiplier-definition",
        title: "The Multiplier Concept",
        keyIdea: "The multiplier means that an initial injection of spending into the economy creates a larger final increase in GDP because each round of spending becomes someone else's income.",
        body: [
          {
            type: "paragraph",
            text: "The **multiplier effect** describes how an initial change in a component of AD (such as government spending or investment) leads to a **larger final change in real GDP**. This happens because one person's spending becomes another person's income, who then spends a proportion of it, creating further income for others."
          },
          {
            type: "flow",
            steps: ["Government spends $100m on infrastructure", "Construction workers earn income and spend $80m", "Shopkeepers earn $80m and spend $64m", "Process continues with diminishing rounds"],
            result: "Final GDP increase is much larger than the initial $100m",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "The multiplier works because each injection of spending circulates through the economy multiple times. However, at each round some income **leaks out** through saving, taxation and imports. These **withdrawals** reduce the amount passed on at each stage, which is why the process eventually fizzles out rather than continuing indefinitely."
          }
        ],
        realExample: {
          emoji: "🏗️",
          text: "**The London 2012 Olympics** cost approximately $9 billion in direct government investment, but the total economic impact was estimated at $17-20 billion due to the multiplier effect. Spending on construction, catering and transport generated multiple rounds of income and consumption throughout the UK economy."
        },
        misconception: "Students think the multiplier means the government gets back more than it spends. The multiplier measures the total increase in GDP, not government revenue. Instead write: the multiplier shows that an initial injection creates a larger increase in national income because spending recirculates, but leakages mean the final effect is finite and the government does not recoup all its spending.",
        examMatters: "Examiners expect you to explain the multiplier process step by step, showing how spending becomes income which generates further spending. You must mention leakages (saving, tax, imports) as the reason the process has a finite outcome. Vague references to \"money going round the economy\" are insufficient.",
        recall: {
          type: "reorder",
          prompt: "Put the multiplier process in order:",
          correctOrder: ["Initial injection of spending (e.g. government investment)", "Recipients earn income and spend a proportion", "Their spending becomes income for others", "Process continues but diminishes due to leakages"],
          shuffled: [2, 0, 3, 1]
        }
      },
      {
        id: "multiplier-formula",
        title: "The Multiplier Formula",
        keyIdea: "The multiplier equals 1 divided by the marginal propensity to withdraw, or equivalently 1 divided by (1 minus the marginal propensity to consume).",
        body: [
          {
            type: "paragraph",
            text: "The **multiplier (k)** can be calculated using the formula: **k = 1 / (1 - MPC)** where MPC is the **marginal propensity to consume** -- the proportion of each extra pound of income that is spent on domestic goods and services. Equivalently, **k = 1 / MPW** where MPW is the **marginal propensity to withdraw** (save + tax + import)."
          },
          {
            type: "paragraph",
            text: "If the MPC is 0.8 (households spend 80p of every extra $1 earned), then k = 1 / (1 - 0.8) = 1 / 0.2 = **5**. This means an initial injection of $10 million would eventually increase GDP by $50 million. The higher the MPC, the larger the multiplier because less leaks out at each round."
          },
          {
            type: "flow",
            steps: ["MPC = 0.8, so MPW = 0.2", "k = 1 / 0.2 = 5", "Initial injection of $10m"],
            result: "Final change in GDP = $10m x 5 = $50m",
            resultType: "neutral"
          }
        ],
        realExample: {
          emoji: "🔢",
          text: "**The UK's Office for Budget Responsibility** estimates fiscal multipliers of around 0.5 to 1.0 for most government spending changes, well below the theoretical maximum. This is because the UK has high marginal tax rates and a large import share, which increase leakages and shrink the multiplier in practice."
        },
        misconception: "Students calculate the multiplier but forget that leakages include taxes and imports, not just saving. The MPW equals the marginal propensity to save plus the marginal rate of tax plus the marginal propensity to import. Instead write: the multiplier is 1/MPW where MPW = MPS + MPT + MPM, covering all three leakages from the circular flow.",
        examMatters: "Calculation questions require you to show the formula, substitute values and interpret the result. If given the MPC, first calculate MPW as (1 - MPC) and then find k. If given individual leakages (MPS, MPT, MPM), add them to find MPW. Always show your working clearly.",
        recall: {
          type: "fillin",
          prompt: "Complete the multiplier formula:",
          template: ["Multiplier (k) = 1 / (1 - ___)", "→ If MPC = 0.8, then k = 1 / 0.2 = ___", "→ The three leakages are saving, taxation and ___"],
          answers: ["MPC", "5", "imports"],
          hints: ["M__", "_", "im_____"]
        }
      },
      {
        id: "multiplier-size-determinants",
        title: "What Determines the Size of the Multiplier?",
        keyIdea: "The multiplier is larger when leakages are small -- low tax rates, low saving rates and low import spending all mean more income recirculates domestically.",
        body: [
          {
            type: "paragraph",
            text: "The size of the multiplier depends on the **marginal propensity to withdraw (MPW)**. A smaller MPW means less leaks out at each round, so more income is passed on and the multiplier is larger. Three factors determine MPW: the **marginal propensity to save (MPS)**, the **marginal rate of tax (MPT)**, and the **marginal propensity to import (MPM)**."
          },
          {
            type: "bullets",
            items: [
              "**Low MPS** -- if households save less, more income is spent, enlarging the multiplier.",
              "**Low tax rates** -- less income is withdrawn through taxation at each round.",
              "**Low MPM** -- if the economy is relatively closed, less spending leaks abroad on imports.",
              "**High consumer confidence** -- willing to spend rather than save, increasing MPC."
            ]
          },
          {
            type: "paragraph",
            text: "In practice, open economies with high tax rates (like the UK) tend to have smaller multipliers than closed economies with low taxes. The multiplier is also larger during recessions, because spare capacity means injections create real output rather than just higher prices."
          }
        ],
        realExample: {
          emoji: "🇸🇬",
          text: "**Singapore** has a small multiplier despite low tax rates because its marginal propensity to import is extremely high -- the small city-state imports nearly everything it consumes. An injection of government spending quickly leaks abroad through imports, limiting the domestic multiplier effect. This is why Singapore relies more on trade policy than fiscal stimulus."
        },
        misconception: "Students assume the multiplier always works at full strength. Near full employment, extra spending may push up prices rather than real output, reducing the real multiplier to near zero. Instead write: the multiplier is strongest when the economy has significant spare capacity; near full employment, injections cause inflation rather than output growth, reducing the effective multiplier.",
        examMatters: "Evaluation questions on the multiplier expect you to discuss why it may be larger or smaller in different contexts. Mention the size of leakages, the state of the economy (spare capacity or near full employment) and the time lag before the full effect materialises. This is where strong candidates distinguish themselves.",
        recall: {
          type: "reorder",
          prompt: "Put the factors affecting multiplier size in order of logic:",
          correctOrder: ["Identify the three leakages: saving, tax, imports", "Higher leakages mean a larger MPW", "A larger MPW gives a smaller multiplier", "Near full capacity, the multiplier effect is mostly inflationary"],
          shuffled: [3, 1, 0, 2]
        }
      }
    ],
    takeaway: [
      "The multiplier: initial spending creates a larger final GDP change.",
      "k = 1 / (1 - MPC) = 1 / MPW; higher MPC means a bigger multiplier.",
      "Leakages (saving, tax, imports) reduce the multiplier's size.",
      "Near full capacity, the multiplier mainly causes inflation, not growth."
    ]
  },

  /* ═══ Block 5: The Accelerator Effect ═══ */
  {
    title: "The Accelerator Effect",
    quizIndices: [4],
    sections: [
      {
        id: "accelerator-definition",
        title: "The Accelerator Principle",
        keyIdea: "The accelerator says that investment depends on the rate of change of GDP -- when growth speeds up, investment surges; when growth slows, investment can collapse.",
        body: [
          {
            type: "paragraph",
            text: "The **accelerator effect** (or accelerator principle) states that the level of **net investment** depends on the **rate of change of national income (GDP)**. When GDP is growing rapidly, firms need to invest heavily in new capital to expand capacity and meet rising demand. When GDP growth merely slows (even if still positive), investment can fall sharply."
          },
          {
            type: "flow",
            steps: ["GDP growth rate increases", "Firms need more capital to meet rising demand", "Net investment surges"],
            result: "Investment is highly sensitive to changes in the growth rate",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "The key insight is that investment responds to the **change in the change** -- not the level of GDP but its rate of growth. If GDP grows at 3% this year and 2% next year, the economy is still growing but the growth rate has slowed. According to the accelerator, investment may fall even though GDP is still rising. This makes investment inherently volatile."
          }
        ],
        realExample: {
          emoji: "🚗",
          text: "**UK car manufacturers** invested heavily in new production lines during 2014-2016 when demand was growing rapidly. When demand growth slowed in 2017-2018 (partly due to Brexit uncertainty), investment fell sharply even though car sales were still at historically high levels. The accelerator explains why a slowdown in growth, not an actual decline, triggered the investment collapse."
        },
        misconception: "Students write \"investment falls because GDP falls.\" The accelerator shows investment can fall even when GDP is still rising, as long as the growth rate slows. Instead write: the accelerator predicts that investment depends on the rate of change of GDP, so a slowdown in growth (not necessarily a decline) can cause investment to fall.",
        examMatters: "The accelerator is a favourite evaluation point in essay questions about investment or the business cycle. Examiners want you to explain why investment is so volatile by linking it to changes in the rate of GDP growth. A strong answer contrasts the accelerator with the interest-rate theory of investment.",
        recall: {
          type: "fillin",
          prompt: "Complete the accelerator principle:",
          template: ["Net investment depends on the rate of ___ of GDP", "→ Faster growth causes investment to ___", "→ Even a ___ in the growth rate can cause investment to fall"],
          answers: ["change", "surge", "slowdown"],
          hints: ["ch____", "su___", "sl_______"]
        }
      },
      {
        id: "accelerator-and-business-cycle",
        title: "The Accelerator and the Business Cycle",
        keyIdea: "The accelerator amplifies economic cycles: investment surges when growth accelerates during booms, and collapses when growth slows during downturns.",
        body: [
          {
            type: "paragraph",
            text: "The accelerator interacts with the **multiplier** to amplify economic fluctuations. During a boom, rising consumer spending (via the multiplier) accelerates GDP growth, which triggers a surge in investment (via the accelerator). This extra investment spending then feeds back through the multiplier, creating further income and spending -- a **virtuous cycle**."
          },
          {
            type: "flow",
            steps: ["GDP growth accelerates (boom)", "Accelerator: investment surges", "Multiplier: investment creates further income", "GDP grows even faster -- cycle reinforces itself"],
            result: "The multiplier-accelerator interaction amplifies the boom",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "The reverse happens in a downturn. When GDP growth slows, the accelerator causes investment to fall. Falling investment reduces income through the reverse multiplier, slowing growth further. The economy can spiral downward rapidly. This **multiplier-accelerator interaction** explains why business cycles can be so pronounced and why investment is the most volatile component of AD."
          }
        ],
        realExample: {
          emoji: "📉",
          text: "**During the 2008 financial crisis**, UK business investment fell by 22% in a single year -- far more than the 6% fall in GDP. The accelerator explains this disproportionate collapse: as GDP growth turned sharply negative, firms slashed investment plans dramatically. The resulting fall in investment then deepened the recession through the reverse multiplier."
        },
        misconception: "Students treat the accelerator and multiplier as the same thing. The multiplier shows how spending creates income; the accelerator shows how changes in income drive investment. Instead write: the multiplier converts an initial injection into a larger GDP change, while the accelerator shows that the rate of GDP change determines the level of investment -- together they amplify economic cycles.",
        examMatters: "For top marks in business cycle essays, explain the multiplier-accelerator interaction as a self-reinforcing mechanism. Show how the accelerator makes investment the key amplifier of booms and recessions. This demonstrates synoptic thinking that links multiple concepts, which examiners reward highly.",
        recall: {
          type: "reorder",
          prompt: "Put the multiplier-accelerator boom cycle in order:",
          correctOrder: ["Consumer spending rises (multiplier creates income)", "GDP growth rate accelerates", "Accelerator triggers a surge in investment", "Investment spending feeds back through the multiplier"],
          shuffled: [2, 0, 3, 1]
        }
      },
      {
        id: "limitations-of-accelerator",
        title: "Limitations of the Accelerator",
        keyIdea: "The accelerator assumes firms respond mechanically to demand changes, but in reality spare capacity, business confidence and access to finance all influence investment decisions.",
        body: [
          {
            type: "paragraph",
            text: "The simple accelerator model has several limitations. It assumes firms have **no spare capacity** -- in reality, firms can often meet rising demand by using existing equipment more intensively before investing in new capital. If there is significant spare capacity, the accelerator effect will be weak or absent."
          },
          {
            type: "paragraph",
            text: "The model also ignores **business confidence**. Firms may not invest even when demand is rising if they expect the growth to be temporary or if economic uncertainty is high. **Access to finance** also matters -- during credit crunches, firms cannot borrow to invest even if demand warrants it."
          },
          {
            type: "bullets",
            items: [
              "**Spare capacity** -- firms with unused equipment do not need to invest when demand rises.",
              "**Confidence and expectations** -- uncertain firms delay investment regardless of current demand.",
              "**Access to finance** -- credit restrictions can prevent investment even when it would be profitable.",
              "**Time lags** -- investment decisions take time to plan, approve and implement."
            ]
          }
        ],
        realExample: {
          emoji: "🏭",
          text: "**After the 2020 lockdowns**, many UK firms had significant spare capacity because demand had collapsed. As demand recovered in 2021, firms initially met it by reactivating existing capacity rather than investing in new capital. The accelerator effect was muted in the short term because spare capacity absorbed the demand increase."
        },
        misconception: "Students apply the accelerator rigidly as if investment always mirrors GDP changes. In practice, spare capacity, uncertainty and credit conditions can break the link between GDP growth and investment. Instead write: the accelerator is a useful theoretical model, but its predictions are weakened by spare capacity, low business confidence and restricted access to finance.",
        examMatters: "When using the accelerator in an essay, always evaluate its limitations. Examiners reward candidates who explain why the accelerator might not work as predicted in the real world. Discussing spare capacity and confidence as limiting factors demonstrates evaluative sophistication.",
        recall: {
          type: "fillin",
          prompt: "Complete the accelerator limitations:",
          template: ["Firms with ___ capacity do not need to invest when demand rises", "→ Low business ___ can delay investment even when demand is growing", "→ Credit restrictions limit firms' ___ to finance for new investment"],
          answers: ["spare", "confidence", "access"],
          hints: ["sp___", "co________", "ac____"]
        }
      }
    ],
    takeaway: [
      "The accelerator: investment depends on the rate of change of GDP.",
      "Multiplier-accelerator interaction amplifies booms and recessions.",
      "Spare capacity, confidence and credit conditions limit the accelerator.",
      "Investment is the most volatile AD component because of the accelerator."
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
