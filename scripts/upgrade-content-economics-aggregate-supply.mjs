/**
 * SECTION UPGRADE — Aggregate Supply (Economics 2.x)
 * ====================================================
 * Edexcel IAL Economics Unit 2 — Aggregate Supply
 * Run with: node scripts/upgrade-content-economics-aggregate-supply.mjs
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL     || 'https://trweeckuswgkenckeqfb.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);

/* ── 1. SETTINGS ──────────────────────────────────────────────────────────── */

const SECTION_SLUG = 'aggregate-supply';
const SUBJECT_ID   = 'economics';

/* ── 2. CONTENT ───────────────────────────────────────────────────────────── */

const CONTENT = [

  /* ═══ Block 1: Short-Run Aggregate Supply (SRAS) ═══ */
  {
    title: "Short-Run Aggregate Supply (SRAS)",
    diagramRef: "SRAS",
    quizIndices: [0],
    practiceIndices: [0],
    sections: [
      {
        id: "sras-shape-and-slope",
        title: "The SRAS Curve",
        keyIdea: "In the short run, higher prices make it profitable for firms to produce more because some costs like wages are fixed, so the SRAS curve slopes upward.",
        body: [
          {
            type: "paragraph",
            text: "**Short-run aggregate supply (SRAS)** is the total output that all firms in the economy are willing and able to supply at each price level, given that at least one factor cost (typically wages) is fixed. Because input costs lag behind output prices, a rise in the general price level increases profit margins and incentivises firms to expand output."
          },
          {
            type: "paragraph",
            text: "The SRAS curve therefore slopes **upward from left to right**. At low levels of output there is plenty of spare capacity, so firms can increase production without much upward pressure on costs. As the economy approaches full capacity, further output gains require overtime pay, bidding up prices of scarce resources and steepening the curve."
          },
          {
            type: "flow",
            steps: ["General price level rises", "Revenue rises but wages are fixed in the short run", "Profit margins widen"],
            result: "Firms expand output — movement along SRAS",
            resultType: "good"
          }
        ],
        realExample: {
          emoji: "🏭",
          text: "**UK manufacturers** in early 2022 faced rising output prices while many workers were still on contracts set the previous year. The lag between product prices and wage costs temporarily boosted margins, encouraging firms to increase production — exactly the upward SRAS relationship."
        },
        misconception: "Students say \"SRAS slopes upward because firms want more profit.\" That is too vague. Instead write: SRAS slopes upward because some input costs, especially wages, are sticky in the short run, so higher output prices temporarily raise profit margins and incentivise more production.",
        examMatters: "When drawing SRAS, always label both axes correctly — price level on the vertical axis and real GDP on the horizontal axis. Examiners penalise diagrams where axes are labelled with \"price\" and \"quantity\" as if it were a micro diagram.",
        recall: {
          type: "fillin",
          prompt: "Complete the SRAS logic:",
          template: ["SRAS slopes upward because ___ are sticky in the short run", "→ Higher price level raises ___ margins for firms", "→ Firms respond by expanding ___"],
          answers: ["wages", "profit", "output"],
          hints: ["wa___", "pr____", "ou____"]
        }
      },
      {
        id: "sras-shifts",
        title: "Shifts of the SRAS Curve",
        keyIdea: "Any change in firms' costs of production that is not caused by a change in the price level will shift the whole SRAS curve left or right.",
        body: [
          {
            type: "paragraph",
            text: "A **shift of the SRAS curve** occurs when the costs of production change for reasons other than a change in the general price level. If costs rise, SRAS shifts left — at every price level, firms supply less because their margins are squeezed. If costs fall, SRAS shifts right."
          },
          {
            type: "subheading",
            text: "Factors That Shift SRAS"
          },
          {
            type: "bullets",
            items: [
              "**Wage costs**: a rise in the national minimum wage or union-negotiated pay increases shifts SRAS left.",
              "**Raw material costs**: higher oil or commodity prices raise production costs and shift SRAS left.",
              "**Exchange rate changes**: a depreciation makes imported inputs more expensive, shifting SRAS left.",
              "**Indirect taxes and subsidies**: higher VAT or a new green tax shifts SRAS left; subsidies shift it right."
            ]
          },
          {
            type: "paragraph",
            text: "You should distinguish between movements along SRAS (caused by a change in the price level) and shifts of SRAS (caused by changes in production costs). This distinction mirrors the demand-side rule you already know: own-variable means movement along, everything else means shift."
          }
        ],
        realExample: {
          emoji: "⛽",
          text: "**OPEC's** oil production cuts in 2023 pushed global crude prices above $90 per barrel. For energy-intensive industries worldwide, higher fuel and transport costs shifted the SRAS curve to the left, contributing to persistent cost-push inflation across advanced economies."
        },
        misconception: "Students write \"higher prices shift SRAS left\" without specifying input prices versus the general price level. A rise in the general price level is a movement along SRAS, not a shift. Instead write: only changes in costs of production (wages, raw materials, taxes) shift SRAS; a change in the overall price level causes a movement along it.",
        examMatters: "Whenever you identify an SRAS shift, name the specific cost factor, state the direction of the shift, and show it on a diagram with two clearly labelled curves (SRAS1 and SRAS2). Generic statements like \"costs went up\" without specifying which costs will not earn full marks.",
        recall: {
          type: "reorder",
          prompt: "Order these SRAS shift factors from cause to effect:",
          correctOrder: ["OPEC cuts oil production", "Raw material and transport costs rise", "SRAS shifts left at every price level", "Output falls and price level rises"],
          shuffled: [2, 0, 3, 1]
        }
      }
    ],
    takeaway: [
      "SRAS slopes up because sticky wages let margins rise with the price level.",
      "Cost changes (wages, commodities, taxes) shift the SRAS curve.",
      "Movement along SRAS = price level change; shift = cost change.",
      "Near full capacity the SRAS curve becomes steeper."
    ]
  },

  /* ═══ Block 2: Long-Run Aggregate Supply (LRAS) ═══ */
  {
    title: "Long-Run Aggregate Supply (LRAS)",
    diagramRef: "LRAS",
    quizIndices: [1],
    practiceIndices: [1],
    sections: [
      {
        id: "classical-lras",
        title: "The Classical LRAS Curve",
        keyIdea: "Classical economists argue that in the long run the economy always returns to full-employment output, so the LRAS curve is vertical.",
        body: [
          {
            type: "paragraph",
            text: "The **classical (monetarist) view** holds that in the long run all factor prices, including wages, adjust fully to changes in the price level. Because no cost remains sticky, changes in the price level have no effect on real output. The LRAS curve is therefore a **vertical line** at the full-employment level of output (Yf)."
          },
          {
            type: "paragraph",
            text: "This vertical line represents the economy's **productive potential** — the maximum output achievable when all resources are fully and efficiently employed. It is determined entirely by supply-side factors: the quantity and quality of labour, capital, land, and the level of technology."
          },
          {
            type: "flow",
            steps: ["Price level rises in the long run", "Wages and input costs adjust fully upward", "Real profit margins return to normal"],
            result: "Output stays at Yf — LRAS is vertical",
            resultType: "neutral"
          }
        ],
        realExample: {
          emoji: "🇩🇪",
          text: "**Germany** invested heavily in vocational training and automation through its Industrie 4.0 programme. These supply-side improvements expanded productive capacity and shifted the classical LRAS curve to the right, increasing potential output without putting upward pressure on the price level."
        },
        misconception: "Students say \"LRAS is vertical because the economy is always at full employment.\" In reality, actual output can be above or below Yf in the short run. Instead write: LRAS is vertical because in the long run all factor prices adjust, so changes in the price level do not alter the economy's productive potential.",
        examMatters: "When you draw a classical LRAS, it must be a perfectly vertical line at Yf. If you draw it with any slope, examiners will assume you do not understand the classical model. Label Yf clearly on the horizontal axis.",
        recall: {
          type: "fillin",
          prompt: "Complete the classical LRAS reasoning:",
          template: ["In the long run, ___ adjust fully to price-level changes", "→ Real profit margins return to ___", "→ LRAS is ___ at the full-employment level of output"],
          answers: ["wages", "normal", "vertical"],
          hints: ["wa___", "no____", "ve______"]
        }
      },
      {
        id: "keynesian-lras",
        title: "The Keynesian LRAS Curve",
        keyIdea: "Keynesians argue that the economy can get stuck below full employment, so their AS curve is flat at low output and only becomes vertical near capacity.",
        body: [
          {
            type: "paragraph",
            text: "The **Keynesian view** challenges the assumption that the economy always self-corrects to full employment. At low levels of output, large amounts of spare capacity mean firms can expand production without raising prices — the curve is **horizontal (perfectly elastic)**. Workers accept jobs at existing wages because unemployment is high."
          },
          {
            type: "paragraph",
            text: "As the economy approaches full capacity, bottlenecks appear — skilled workers become scarce, raw materials are bid up, and overtime costs rise. The curve becomes **upward-sloping**. At full capacity it becomes **vertical**, just like the classical curve, because no more output can be produced regardless of the price level."
          },
          {
            type: "paragraph",
            text: "The practical implication is significant: in a recession with spare capacity, increasing aggregate demand can raise real output without causing inflation. This justifies Keynesian demand-management policies like fiscal stimulus during downturns."
          }
        ],
        realExample: {
          emoji: "🇯🇵",
          text: "**Japan's** prolonged period of low growth and deflation from the 1990s onward is often cited as a Keynesian scenario. Despite massive monetary stimulus, the economy remained well below full capacity for decades, with firms able to expand output without generating inflation — consistent with operating on the flat portion of the Keynesian AS curve."
        },
        misconception: "Students draw the Keynesian AS as simply a horizontal line. It actually has three distinct sections: horizontal when there is high spare capacity, upward-sloping as bottlenecks emerge, and vertical at full capacity. Instead write: the Keynesian AS curve has a flat section, a rising section, and a vertical section, reflecting how the economy behaves differently at different output levels.",
        examMatters: "Examiners often ask you to compare the classical and Keynesian LRAS views. You must draw both diagrams and explain the different policy implications: classical says demand-side policy only affects prices, Keynesian says it can raise real output when there is spare capacity.",
        recall: {
          type: "reorder",
          prompt: "Order the sections of the Keynesian AS curve from left to right:",
          correctOrder: ["Horizontal section — spare capacity, output rises without inflation", "Upward-sloping section — bottlenecks cause rising costs", "Vertical section — full capacity, only price level can rise"],
          shuffled: [1, 2, 0]
        }
      },
      {
        id: "lras-determinants",
        title: "Determinants of LRAS",
        keyIdea: "Anything that increases the productive potential of the economy — better technology, more capital, a larger or more skilled workforce — shifts LRAS to the right.",
        body: [
          {
            type: "paragraph",
            text: "Since LRAS represents the economy's maximum sustainable output, it can only shift when the **productive capacity** of the economy changes. You should think about the quantity and quality of the four factors of production: land, labour, capital, and enterprise."
          },
          {
            type: "subheading",
            text: "Key Supply-Side Factors"
          },
          {
            type: "bullets",
            items: [
              "**Labour force size and skills**: immigration, education, and training increase the quantity or quality of workers.",
              "**Capital investment**: more machinery, infrastructure, and technology raises productivity.",
              "**Technological progress**: innovation allows more output from the same inputs.",
              "**Institutional factors**: rule of law, property rights, deregulation, and competition policy improve efficiency."
            ]
          },
          {
            type: "paragraph",
            text: "These factors also explain differences in economic growth between countries. Economies that invest in education, infrastructure, and technology tend to see faster rightward shifts in LRAS and therefore faster long-run growth in potential output."
          }
        ],
        realExample: {
          emoji: "🇰🇷",
          text: "**South Korea** transformed from one of the poorest countries in the 1960s to a high-income economy by investing massively in education and technology. These supply-side improvements shifted LRAS persistently to the right, increasing potential GDP more than tenfold in real terms over five decades."
        },
        misconception: "Students claim \"increasing government spending shifts LRAS right.\" Higher spending shifts AD right, not LRAS. Instead write: LRAS only shifts through changes in productive capacity — education, capital investment, technology, and institutional reform — not through changes in aggregate demand.",
        examMatters: "Questions on economic growth often require you to distinguish between short-run growth (AD shifts along a given LRAS) and long-run growth (LRAS shifts right). Make sure you specify which type of growth you are analysing and link to the relevant supply-side factors.",
        recall: {
          type: "fillin",
          prompt: "Complete the LRAS determinants:",
          template: ["More or better ___ increases the economy's labour capacity", "→ Higher ___ investment provides more machinery and infrastructure", "→ Technological ___ allows more output from the same inputs"],
          answers: ["education", "capital", "progress"],
          hints: ["ed________", "ca_____", "pr______"]
        }
      }
    ],
    takeaway: [
      "Classical LRAS is vertical at Yf — price-level changes do not alter real output.",
      "Keynesian AS has flat, rising, and vertical sections.",
      "LRAS shifts right through education, capital, technology, and institutions."
    ]
  },

  /* ═══ Block 3: Macroeconomic Equilibrium ═══ */
  {
    title: "Macroeconomic Equilibrium",
    diagramRef: "AD/AS Equilibrium",
    quizIndices: [2, 3],
    practiceIndices: [2],
    sections: [
      {
        id: "ad-as-equilibrium",
        title: "AD/AS Equilibrium",
        keyIdea: "Macroeconomic equilibrium is where aggregate demand intersects aggregate supply, determining the price level and real output for the whole economy.",
        body: [
          {
            type: "paragraph",
            text: "**Macroeconomic equilibrium** occurs at the point where the **aggregate demand (AD)** curve intersects the **aggregate supply (AS)** curve. At this point, the total output that firms are willing to supply exactly matches the total output that consumers, firms, the government, and overseas buyers wish to purchase."
          },
          {
            type: "paragraph",
            text: "The intersection determines two key variables simultaneously: the **equilibrium price level** and the **equilibrium level of real GDP**. If you can read these two values from a diagram and explain what forces brought the economy to that point, you have the foundation for analysing any macroeconomic event."
          },
          {
            type: "flow",
            steps: ["AD curve slopes downward", "SRAS curve slopes upward", "Curves intersect"],
            result: "Equilibrium price level and real GDP are determined",
            resultType: "neutral"
          }
        ],
        realExample: {
          emoji: "🇬🇧",
          text: "**The UK economy** in 2019 was operating close to macroeconomic equilibrium with inflation near the 2% target and unemployment at historic lows. The AD and SRAS curves intersected at a point close to the estimated full-employment level of output, producing stable prices and low joblessness."
        },
        misconception: "Students treat macroeconomic equilibrium as automatically desirable. Equilibrium simply means AD equals AS — the economy could settle at a point with high unemployment or high inflation. Instead write: macroeconomic equilibrium describes where the economy is, not where it should be; it can occur above or below the full-employment level.",
        examMatters: "Every AD/AS diagram must clearly show the equilibrium point labelled with the price level (P1) and real GDP (Y1). Examiners deduct marks if you draw curves that do not intersect or if you fail to read off both the price level and output at equilibrium.",
        recall: {
          type: "reorder",
          prompt: "Order the steps to finding macroeconomic equilibrium:",
          correctOrder: ["Draw the AD curve sloping downward", "Draw the SRAS curve sloping upward", "Identify the intersection point", "Read off the equilibrium price level and real GDP"],
          shuffled: [3, 1, 0, 2]
        }
      },
      {
        id: "changes-in-equilibrium",
        title: "Changes in Macroeconomic Equilibrium",
        keyIdea: "When AD or AS shifts, the equilibrium price level and real GDP both change — you trace the new intersection to find the new equilibrium.",
        body: [
          {
            type: "paragraph",
            text: "If **AD increases** (shifts right) — for example because of a tax cut or rise in consumer confidence — the new intersection is at a higher price level and a higher level of real GDP. You get both economic growth and inflationary pressure simultaneously."
          },
          {
            type: "paragraph",
            text: "If **SRAS decreases** (shifts left) — for example because of an oil price shock — the new intersection is at a higher price level but a lower level of real GDP. This combination of rising prices and falling output is called **stagflation** and is one of the most damaging macroeconomic outcomes."
          },
          {
            type: "flow",
            steps: ["SRAS shifts left (cost shock)", "New equilibrium at higher price level", "Real GDP falls"],
            result: "Stagflation — rising prices with falling output",
            resultType: "bad"
          }
        ],
        realExample: {
          emoji: "🛢️",
          text: "**The 1973 oil crisis** quadrupled oil prices almost overnight, shifting SRAS sharply to the left across all oil-importing economies. The result was textbook stagflation — the UK saw inflation exceed 25% while GDP contracted and unemployment rose, a combination that classical economics had not predicted."
        },
        misconception: "Students assume that a rise in AD always causes inflation. On the Keynesian AS curve, if there is significant spare capacity, AD can shift right and increase real output with little or no rise in the price level. Instead write: the inflationary impact of an AD increase depends on how close the economy is to full capacity.",
        examMatters: "When analysing a shift, always draw both the before and after equilibrium. Label the original equilibrium (P1, Y1) and the new equilibrium (P2, Y2). State clearly what happened to both the price level and real GDP — examiners will not infer one if you only mention the other.",
        recall: {
          type: "fillin",
          prompt: "Complete the equilibrium change analysis:",
          template: ["AD shifts right → price level ___ and real GDP ___", "→ SRAS shifts left → price level ___ and real GDP ___", "→ The combination of rising prices and falling output is called ___"],
          answers: ["rises, rises", "rises, falls", "stagflation"],
          hints: ["ri___, ri___", "ri___, fa___", "st__________"]
        }
      }
    ],
    takeaway: [
      "Equilibrium = AD intersects AS, giving price level and real GDP.",
      "AD shift right → higher prices and higher output.",
      "SRAS shift left → stagflation (higher prices, lower output).",
      "Always label both P and Y at old and new equilibrium."
    ]
  },

  /* ═══ Block 4: AD/AS Analysis of Macroeconomic Events ═══ */
  {
    title: "AD/AS Analysis of Macroeconomic Events",
    diagramRef: "AD/AS Shifts",
    quizIndices: [4],
    practiceIndices: [3],
    sections: [
      {
        id: "demand-side-shocks",
        title: "Demand-Side Shocks",
        keyIdea: "A demand-side shock is a sudden shift in AD — positive shocks boost output and prices while negative shocks reduce both.",
        body: [
          {
            type: "paragraph",
            text: "A **demand-side shock** is a sudden, unexpected change in one of the components of AD (consumption, investment, government spending, or net exports). A positive demand shock shifts AD right, raising both the price level and real output. A negative demand shock shifts AD left, reducing both."
          },
          {
            type: "paragraph",
            text: "You should think about what triggers these shocks. A collapse in consumer confidence, a stock market crash, or a sudden cut in government spending can cause a negative shock. A housing boom, a large fiscal stimulus, or a surge in export demand can cause a positive shock."
          },
          {
            type: "flow",
            steps: ["Consumer confidence collapses", "Consumption (C) falls sharply", "AD shifts left"],
            result: "Lower real GDP and lower price level — recessionary pressure",
            resultType: "bad"
          }
        ],
        realExample: {
          emoji: "🦠",
          text: "**The COVID-19 pandemic** in 2020 caused a massive negative demand shock as lockdowns shut down consumer spending and business investment simultaneously. UK GDP fell by 9.7% in a single year — the largest annual decline in over three centuries — as AD shifted dramatically to the left."
        },
        misconception: "Students analyse a demand shock by only discussing output changes and ignoring the price level. Every AD shift affects both variables. Instead write: a negative demand shock reduces real GDP and puts downward pressure on the price level; always state both effects when analysing the new equilibrium.",
        examMatters: "In data-response questions, examiners often present real-world events and ask you to use AD/AS analysis. Identify whether the event is a demand-side or supply-side shock first, then draw the correct shift and read off the impact on both the price level and real GDP.",
        recall: {
          type: "reorder",
          prompt: "Order the demand-side shock transmission mechanism:",
          correctOrder: ["External event triggers a change in C, I, G, or X-M", "AD curve shifts left or right", "New intersection with AS at different price level and output", "Economy moves to new short-run equilibrium"],
          shuffled: [2, 0, 3, 1]
        }
      },
      {
        id: "supply-side-shocks",
        title: "Supply-Side Shocks",
        keyIdea: "A supply-side shock shifts SRAS — a negative supply shock is especially damaging because it pushes prices up and output down at the same time.",
        body: [
          {
            type: "paragraph",
            text: "A **supply-side shock** is a sudden, unexpected change in the costs of production that shifts the SRAS curve. A negative supply shock (such as a spike in energy prices or a natural disaster) shifts SRAS to the left. This raises the price level while reducing real output — the worst of both worlds for policymakers."
          },
          {
            type: "paragraph",
            text: "A positive supply shock (such as a fall in commodity prices or a technological breakthrough) shifts SRAS to the right. This is the ideal scenario because it increases real output while reducing inflationary pressure — you get growth and lower prices simultaneously."
          },
          {
            type: "flow",
            steps: ["Energy prices spike unexpectedly", "Production costs rise across the economy", "SRAS shifts left"],
            result: "Stagflation — higher prices, lower output, policy dilemma",
            resultType: "bad"
          }
        ],
        realExample: {
          emoji: "🇷🇺",
          text: "**Russia's** invasion of Ukraine in 2022 caused a massive negative supply shock as European gas prices quadrupled. Energy-intensive industries across the EU faced soaring costs, shifting SRAS left and contributing to inflation exceeding 10% in many European economies while growth stalled."
        },
        misconception: "Students say the government should \"increase AD to fix a supply shock.\" Boosting AD when SRAS has shifted left would raise real output but at the cost of even higher inflation. Instead write: supply-side shocks create a policy dilemma because boosting AD fights the recession but worsens inflation, while cutting AD fights inflation but deepens the recession.",
        examMatters: "When you explain a supply-side shock, always link the real-world event to a specific cost of production (energy, wages, raw materials) before explaining the SRAS shift. Examiners want to see the transmission mechanism, not just the conclusion.",
        recall: {
          type: "fillin",
          prompt: "Complete the supply-side shock analysis:",
          template: ["A negative supply shock shifts SRAS to the ___", "→ The price level ___ while real GDP ___", "→ This creates a policy ___ for the government"],
          answers: ["left", "rises, falls", "dilemma"],
          hints: ["le__", "ri___, fa___", "di______"]
        }
      },
      {
        id: "applying-adas-to-events",
        title: "Applying AD/AS to Real Events",
        keyIdea: "To analyse any macroeconomic event, identify the initial shock, determine whether AD or AS shifts, then trace through to the new equilibrium.",
        body: [
          {
            type: "paragraph",
            text: "You can use the AD/AS framework to analyse virtually any macroeconomic event. The process is always the same: identify what happened, decide whether it affects AD or AS (or both), determine the direction of the shift, draw the diagram, and read off the impact on the price level and real GDP."
          },
          {
            type: "flow",
            steps: ["Identify the event (e.g. tax cut, oil shock)", "Determine: does it shift AD or AS?", "Draw the shift and find the new equilibrium"],
            result: "State impact on price level and real GDP",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "Some events shift both curves simultaneously. For example, a pandemic can reduce both AD (consumers stop spending) and SRAS (supply chains break down). When both curves shift, the impact on one variable may be clear while the other is ambiguous — you must state this uncertainty explicitly to earn evaluation marks."
          }
        ],
        realExample: {
          emoji: "💷",
          text: "**The UK's Brexit vote** in 2016 triggered a sterling depreciation of around 15%. This simultaneously shifted AD right (cheaper exports boosted net trade) and SRAS left (imported inputs became more expensive). The net effect was higher inflation with a modest initial impact on output — an outcome only explainable by analysing both shifts together."
        },
        misconception: "Students pick only one curve to shift when an event clearly affects both AD and AS. For complex events like a pandemic or major policy change, you must consider both sides. Instead write: always ask yourself whether the event affects spending (AD), costs (AS), or both, and analyse each shift separately before combining the effects.",
        examMatters: "The best exam answers follow a clear analytical framework: identify the shock, state which curve shifts and why, draw the diagram, read off the new equilibrium, and evaluate by considering second-round effects or uncertainty about magnitudes. This structured approach consistently earns top marks.",
        recall: {
          type: "reorder",
          prompt: "Order the AD/AS analysis framework:",
          correctOrder: ["Identify the macroeconomic event", "Determine whether it shifts AD, AS, or both", "Draw the diagram with the correct shift(s)", "Read off the new price level and real GDP and evaluate"],
          shuffled: [3, 1, 0, 2]
        }
      }
    ],
    takeaway: [
      "Demand shocks shift AD; supply shocks shift SRAS.",
      "Negative supply shocks cause stagflation — a policy dilemma.",
      "Some events shift both AD and AS simultaneously.",
      "Always follow: identify shock, shift curve, read new equilibrium."
    ]
  },

  /* ═══ Block 5: Short-Run vs Long-Run Adjustment ═══ */
  {
    title: "Short-Run vs Long-Run Adjustment",
    diagramRef: "Self-Correcting Mechanism",
    quizIndices: [5],
    practiceIndices: [4],
    sections: [
      {
        id: "output-gaps",
        title: "Output Gaps",
        keyIdea: "An output gap is the difference between actual GDP and potential GDP — positive when the economy overheats, negative when it underperforms.",
        body: [
          {
            type: "paragraph",
            text: "An **output gap** measures the difference between the economy's actual level of output and its potential (full-employment) level. A **positive (inflationary) output gap** means actual GDP exceeds potential GDP — the economy is overheating, putting upward pressure on wages and prices."
          },
          {
            type: "paragraph",
            text: "A **negative (deflationary or recessionary) output gap** means actual GDP is below potential — there is spare capacity, unemployment is above its natural rate, and there is downward pressure on wages and prices. You should think of potential GDP as where LRAS sits and actual GDP as where the AD/SRAS intersection falls."
          },
          {
            type: "flow",
            steps: ["Actual GDP > Potential GDP", "Labour market tightens, wages bid up", "Inflationary pressure builds"],
            result: "Positive output gap — economy is overheating",
            resultType: "bad"
          }
        ],
        realExample: {
          emoji: "🇺🇸",
          text: "**The US economy** in late 2021 had a significant positive output gap as massive fiscal stimulus pushed actual GDP above its pre-pandemic trend. Labour shortages emerged across sectors, wages surged, and inflation climbed to 9.1% by mid-2022 — a textbook consequence of an inflationary output gap."
        },
        misconception: "Students confuse output gaps with recessions. A negative output gap means output is below potential, but the economy could still be growing — just not fast enough to close the gap. Instead write: a negative output gap means the economy is producing below its potential, which can persist even during periods of positive but slow growth.",
        examMatters: "When identifying an output gap on a diagram, show clearly where actual GDP (AD/SRAS intersection) falls relative to potential GDP (Yf on the LRAS). Examiners want you to label both points and draw an arrow or annotation showing the gap between them.",
        recall: {
          type: "fillin",
          prompt: "Complete the output gap definitions:",
          template: ["Positive output gap: actual GDP is ___ potential GDP", "→ This creates ___ pressure on wages and prices", "→ Negative output gap: there is ___ capacity and higher unemployment"],
          answers: ["above", "inflationary", "spare"],
          hints: ["ab___", "in___________", "sp___"]
        }
      },
      {
        id: "self-correcting-mechanism",
        title: "The Self-Correcting Mechanism",
        keyIdea: "Classical economists argue that wage and price flexibility will automatically close output gaps in the long run, returning the economy to full employment without intervention.",
        body: [
          {
            type: "paragraph",
            text: "The **self-correcting mechanism** is the classical argument that the economy will automatically return to the full-employment level of output in the long run. If a negative output gap exists, unemployment puts downward pressure on wages. As wages fall, SRAS shifts right, reducing the price level and restoring output to Yf."
          },
          {
            type: "paragraph",
            text: "Conversely, if a positive output gap exists, labour shortages push wages up. Rising wages shift SRAS left, raising the price level and bringing actual output back down to Yf. In both cases, the adjustment happens through changes in wages and input costs — no government intervention is needed."
          },
          {
            type: "flow",
            steps: ["Negative output gap exists (Y < Yf)", "Unemployment pushes wages down", "SRAS shifts right as costs fall"],
            result: "Output returns to Yf — economy self-corrects",
            resultType: "good"
          }
        ],
        realExample: {
          emoji: "🇬🇧",
          text: "**The UK's recovery** from the 2008 financial crisis took roughly six years to return GDP to its pre-crisis level. Classical economists point to eventual wage adjustment as the mechanism, but critics argue the painfully slow speed of adjustment justified the government's fiscal stimulus and the Bank of England's quantitative easing programme."
        },
        misconception: "Students present the self-correcting mechanism as a fact rather than a contested theory. Keynesians argue wages are sticky downward, so the economy can remain stuck below full employment for prolonged periods. Instead write: the self-correcting mechanism assumes flexible wages, but Keynesians argue downward wage stickiness means the economy may not self-correct without policy intervention.",
        examMatters: "This is a major evaluation point in macroeconomic essays. When you discuss the self-correcting mechanism, always counter-argue with the Keynesian critique: wages may be sticky downward, adjustment may take unacceptably long, and the social costs of waiting may justify government intervention.",
        recall: {
          type: "reorder",
          prompt: "Order the self-correcting mechanism from start to finish:",
          correctOrder: ["Negative output gap — actual GDP below potential", "Unemployment puts downward pressure on wages", "Falling wages shift SRAS to the right", "Economy returns to full-employment output (Yf)"],
          shuffled: [2, 0, 3, 1]
        }
      },
      {
        id: "classical-vs-keynesian-adjustment",
        title: "Classical vs Keynesian Views on Adjustment",
        keyIdea: "The core debate is whether the economy self-corrects quickly enough to make government intervention unnecessary, or whether sticky wages demand active policy.",
        body: [
          {
            type: "paragraph",
            text: "**Classical economists** believe that markets clear efficiently and wages adjust quickly, so the economy returns to Yf relatively fast. Government intervention is therefore unnecessary and potentially harmful — fiscal stimulus just raises the price level without lasting output gains."
          },
          {
            type: "paragraph",
            text: "**Keynesian economists** argue that wages are sticky downward because workers resist nominal pay cuts, unions negotiate wage floors, and minimum wage laws prevent adjustment. If wages do not fall, SRAS does not shift right, and the economy can remain stuck in a negative output gap for years."
          },
          {
            type: "paragraph",
            text: "The policy implication is crucial: if the Keynesian view is correct, governments must use fiscal and monetary policy to shift AD and close the output gap. If the classical view is correct, such intervention merely creates inflation. This is one of the central debates in macroeconomics."
          }
        ],
        realExample: {
          emoji: "📉",
          text: "**The Great Depression** of the 1930s became the defining evidence for Keynesian economics. The US economy remained far below full employment for a decade despite significant wage falls, suggesting that self-correction had failed. It was ultimately large-scale government spending during World War II that restored full employment."
        },
        misconception: "Students write \"Keynesians say markets never work\" or \"classical economists ignore unemployment.\" Both views are more nuanced than that. Instead write: Keynesians accept that markets work in the long run but argue the adjustment is too slow and costly; classical economists accept short-run deviations but argue intervention creates worse long-run distortions.",
        examMatters: "This classical vs Keynesian debate appears in almost every macroeconomic essay. To reach the top mark bands, you must present both sides and evaluate which view is more applicable to the specific context in the question — there is no single correct answer.",
        recall: {
          type: "fillin",
          prompt: "Complete the classical vs Keynesian comparison:",
          template: ["Classical: wages are ___ so the economy self-corrects to Yf", "→ Keynesian: wages are ___ downward so output gaps persist", "→ The policy debate: is government ___ necessary or harmful?"],
          answers: ["flexible", "sticky", "intervention"],
          hints: ["fl______", "st____", "in____________"]
        }
      }
    ],
    takeaway: [
      "Output gap = actual GDP minus potential GDP.",
      "Classical self-correction relies on flexible wages shifting SRAS.",
      "Keynesians argue sticky wages prevent self-correction.",
      "This debate determines whether government intervention is needed."
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
