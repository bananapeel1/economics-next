/**
 * SECTION UPGRADE — Supply (Economics 1.3.3)
 * ===========================================
 * Edexcel IAL Economics Unit 1, spec point 1.3.3
 * Run with: node scripts/upgrade-content-economics-supply.mjs
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL     || 'https://trweeckuswgkenckeqfb.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);

/* -- 1. SETTINGS ---------------------------------------------------------- */

const SECTION_SLUG = 'supply';
const SUBJECT_ID   = 'economics';

/* -- 2. CONTENT ----------------------------------------------------------- */

const CONTENT = [

  /* === Block 1: The Supply Curve === */
  {
    title: "The Supply Curve",
    diagramRef: "Supply Curve",
    quizIndices: [0],
    sections: [
      {
        id: "supply-and-the-supply-curve",
        title: "Supply and the Supply Curve",
        keyIdea: "Supply is the quantity producers are willing and able to sell at each price, and it normally rises as price rises because higher prices mean higher profit per unit.",
        body: [
          {
            type: "paragraph",
            text: "**Supply** is the quantity of a good or service that producers are willing and able to offer for sale at a given price in a given time period. Notice the phrase \"willing and able\" -- a firm must both want to sell and have the capacity to produce. The **law of supply** states that, ceteris paribus, as the price of a good rises, the quantity supplied rises."
          },
          {
            type: "flow",
            steps: ["Price of the good rises", "Revenue per unit increases", "Production becomes more profitable"],
            result: "Firms expand output and new firms enter the market",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "The **supply curve** is an upward-sloping line on a price-quantity diagram. Each point on the curve shows the quantity producers will offer at that specific price. You read it the same way as a demand curve -- price on the vertical axis, quantity on the horizontal axis."
          },
          {
            type: "paragraph",
            text: "The upward slope reflects increasing **marginal costs** of production. As firms produce more, they use less efficient resources or pay overtime wages, pushing up the cost of each additional unit. A higher price is therefore needed to cover those rising costs."
          }
        ],
        realExample: {
          emoji: "🛢️",
          text: "**Saudi Arabia** increases its oil output when crude prices surge above $80 per barrel because expensive extraction methods become profitable at higher prices. When prices fell below $30 in early 2016, Saudi Aramco cut investment in costlier fields and reduced drilling activity. This real-world response demonstrates the law of supply operating in a global commodity market."
        },
        misconception: "Students write \"supply is the amount of a product that exists.\" That confuses stock with supply, which refers only to what producers are willing and able to sell at each price. Instead write: supply is the quantity offered for sale at each price level in a given time period.",
        examMatters: "Examiners expect you to define supply precisely using the terms \"willing and able\" and \"at each price in a given time period.\" When drawing a supply curve, always label both axes and show the upward slope clearly. Marks are consistently lost for unlabelled or incorrectly sloped diagrams.",
        recall: {
          type: "reorder",
          prompt: "Put the law of supply chain in the right order:",
          correctOrder: ["Price of the good rises", "Revenue per unit increases", "Production becomes more profitable", "Firms expand output and new firms enter"],
          shuffled: [2, 0, 3, 1]
        }
      },
      {
        id: "movements-along-vs-shifts-of-supply",
        title: "Movements Along vs Shifts of Supply",
        keyIdea: "A change in the good's own price causes a movement along the supply curve, while a change in any other factor shifts the entire curve left or right.",
        body: [
          {
            type: "paragraph",
            text: "A **movement along the supply curve** (also called a change in quantity supplied) happens when the price of the good itself changes. If price rises, you move up the curve to a higher quantity supplied -- this is called an **extension** of supply. If price falls, you move down the curve -- a **contraction** of supply."
          },
          {
            type: "paragraph",
            text: "A **shift of the supply curve** (also called a change in supply) happens when a non-price factor changes. The entire curve moves to the right (an increase in supply, meaning more is offered at every price) or to the left (a decrease in supply, meaning less is offered at every price)."
          },
          {
            type: "flow",
            steps: ["Non-price factor changes", "Cost of production falls", "Supply curve shifts right"],
            result: "More quantity supplied at every price level",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "You must be precise about this distinction in exams. If you write \"supply increases\" when you mean quantity supplied increases due to a price change, you will lose marks. The language matters because each describes a fundamentally different economic event."
          }
        ],
        realExample: {
          emoji: "🚜",
          text: "**John Deere** introduced GPS-guided tractors that reduced fuel costs and seed waste for American wheat farmers. This technological advance lowered production costs across the industry, shifting the supply curve for wheat to the right. More wheat was offered at every price, not because wheat prices changed, but because technology reduced costs."
        },
        misconception: "Students say \"a rise in price shifts the supply curve to the right.\" A change in the good's own price causes a movement along the existing curve, not a shift of the whole curve. Instead write: only non-price factors such as costs, technology or the number of firms shift the supply curve.",
        examMatters: "This distinction is tested in almost every supply-related question. Examiners want you to use the correct terminology: \"extension\" or \"contraction\" for movements, and \"increase\" or \"decrease\" in supply for shifts. Labelling your diagram with arrows showing the direction of change earns additional marks.",
        recall: {
          type: "fillin",
          prompt: "Complete the supply curve movements vs shifts:",
          template: ["A change in the good's own price causes a ___ along the curve", "→ A price rise causes an ___ of supply (movement up)", "→ A change in a non-price factor causes a ___ of the supply curve"],
          answers: ["movement", "extension", "shift"],
          hints: ["mo______", "ex________", "sh___"]
        }
      },
      {
        id: "factors-that-shift-supply",
        title: "Factors That Shift Supply",
        keyIdea: "Costs of production, technology, taxes, subsidies, the number of firms, and external shocks all shift the supply curve because they change how much firms can offer at each price.",
        body: [
          {
            type: "paragraph",
            text: "Several factors shift the supply curve. A fall in **costs of production** (wages, raw materials, rent) means firms can produce more cheaply, shifting supply right. An improvement in **technology** has the same effect -- it raises productivity and lowers unit costs."
          },
          {
            type: "subheading",
            text: "Key Determinants of Supply"
          },
          {
            type: "bullets",
            items: [
              "**Costs of production** -- higher input costs shift supply left; lower costs shift it right.",
              "**Technology** -- better technology reduces costs and shifts supply right.",
              "**Indirect taxes** -- a new or higher tax raises costs and shifts supply left.",
              "**Subsidies** -- a government payment to producers lowers costs and shifts supply right.",
              "**Number of firms** -- more firms entering the market shifts supply right.",
              "**External shocks** -- natural disasters, wars or pandemics can destroy capacity and shift supply left."
            ]
          },
          {
            type: "paragraph",
            text: "You should remember that anything which changes the cost or ability to produce will shift the supply curve. Think of it as: if the price stays the same but firms can now produce more (or less), the curve has shifted."
          }
        ],
        realExample: {
          emoji: "🔋",
          text: "**The Chinese government** subsidised solar panel manufacturers by over $50 billion between 2010 and 2020. These subsidies dramatically lowered production costs, shifting the global supply curve for solar panels to the right. World prices fell by more than 90%, making solar energy cost-competitive with fossil fuels."
        },
        misconception: "Students list factors that shift supply but forget to explain the direction. Stating \"technology shifts supply\" earns no marks without specifying which direction and why. Instead write: improved technology lowers unit costs of production, which shifts the supply curve to the right because firms can offer more at every given price.",
        examMatters: "When asked to explain a shift in supply, examiners want a clear chain of reasoning: identify the factor, explain how it affects costs or capacity, and state the direction of the shift. You must then show the effect on equilibrium price and quantity using a correctly labelled diagram. Simply naming the factor without tracing through the mechanism is not enough for full marks.",
        recall: {
          type: "reorder",
          prompt: "Put these supply shift factors in order of explanation:",
          correctOrder: ["Identify the factor (e.g. new technology)", "Explain how it affects costs of production", "State the direction of the supply curve shift", "Show the effect on equilibrium price and quantity"],
          shuffled: [3, 1, 0, 2]
        }
      }
    ],
    takeaway: [
      "Supply slopes upward: higher prices make production more profitable.",
      "A price change moves along the curve; other factors shift it.",
      "Costs, technology, taxes, subsidies and firm numbers all shift supply.",
      "Always specify the direction of a shift and explain the mechanism."
    ]
  },

  /* === Block 2: Price Elasticity of Supply (PES) === */
  {
    title: "Price Elasticity of Supply (PES)",
    quizIndices: [1],
    practiceIndices: [0],
    sections: [
      {
        id: "pes-definition-and-formula",
        title: "PES Definition and Formula",
        keyIdea: "PES measures how responsive quantity supplied is to a change in price, calculated as the percentage change in quantity supplied divided by the percentage change in price.",
        body: [
          {
            type: "paragraph",
            text: "**Price elasticity of supply (PES)** measures the responsiveness of quantity supplied to a change in the price of a good. It tells you how quickly and easily producers can increase or decrease output when the market price changes. The formula is:"
          },
          {
            type: "paragraph",
            text: "**PES = % change in quantity supplied / % change in price**. Because the supply curve normally slopes upward, PES is almost always a **positive** value. A PES of 2.0 means that a 10% rise in price leads to a 20% rise in quantity supplied."
          },
          {
            type: "flow",
            steps: ["Price rises by 10%", "Quantity supplied rises by 20%", "PES = 20% / 10% = 2.0"],
            result: "Supply is price elastic -- producers respond strongly to price changes",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "You need to understand PES because it determines how market equilibrium adjusts when demand shifts. If supply is elastic, a surge in demand leads to a large output increase with a small price rise. If supply is inelastic, the same demand shift causes a large price spike with little extra output."
          }
        ],
        realExample: {
          emoji: "💻",
          text: "**Taiwan Semiconductor (TSMC)** cannot quickly expand chip production because building a new fabrication plant takes three to five years and costs over $20 billion. When global chip demand surged in 2021, TSMC's inelastic supply meant prices rose sharply while output barely increased. This illustrates how low PES causes price volatility when demand shifts."
        },
        misconception: "Students confuse PES with PED and write about consumer responsiveness. PES is about producers, not consumers -- it measures how the quantity supplied responds to a price change. Instead write: PES measures how much the quantity that producers offer for sale changes when the market price changes.",
        examMatters: "When calculating PES, examiners check that you use the correct formula and show your working clearly. Always state the formula first, substitute the numbers, and then interpret the result. State whether supply is elastic or inelastic and explain what that means for price stability in the market.",
        recall: {
          type: "fillin",
          prompt: "Complete the PES fundamentals:",
          template: ["PES = % change in quantity ___ / % change in price", "→ PES is almost always a ___ value", "→ PES > 1 means supply is price ___"],
          answers: ["supplied", "positive", "elastic"],
          hints: ["su______", "po______", "el_____"]
        }
      },
      {
        id: "interpreting-pes-values",
        title: "Interpreting PES Values",
        keyIdea: "If PES is greater than 1 supply is elastic and producers can respond quickly; if PES is less than 1 supply is inelastic and output adjusts slowly.",
        body: [
          {
            type: "paragraph",
            text: "When **PES > 1**, supply is **price elastic** -- quantity supplied changes by a greater percentage than the price change. Producers can adjust output relatively quickly and easily. When **PES < 1**, supply is **price inelastic** -- quantity supplied changes by a smaller percentage than the price change."
          },
          {
            type: "paragraph",
            text: "There are three special cases you should know. **PES = 0** means supply is **perfectly inelastic** -- quantity supplied does not change at all regardless of price (a vertical supply curve). **PES = infinity** means supply is **perfectly elastic** -- any quantity can be supplied at the going price (a horizontal supply curve). **PES = 1** means supply is **unit elastic** -- the percentage changes are exactly equal."
          },
          {
            type: "flow",
            steps: ["Demand for housing surges", "Supply is inelastic (PES < 1)", "Builders cannot quickly construct new homes"],
            result: "House prices rise sharply with little increase in quantity",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "You will find that most real-world supply decisions involve inelastic supply in the short run, because expanding production takes time and resources. Over time, as firms build capacity and new firms enter, supply becomes more elastic."
          }
        ],
        realExample: {
          emoji: "🏠",
          text: "**The UK housing market** has a PES estimated at just 0.4, meaning a 10% price rise leads to only a 4% increase in new homes built. Planning restrictions, land shortages and long construction times make housing supply deeply inelastic. This is a key reason UK house prices have risen faster than incomes for decades."
        },
        misconception: "Students write \"inelastic supply means supply does not change at all.\" Inelastic does not mean zero response -- it means quantity supplied changes by a smaller proportion than the price change. Instead write: inelastic supply means producers do respond to price changes, but the percentage change in quantity supplied is smaller than the percentage change in price.",
        examMatters: "Examiners often give you data and ask you to calculate and interpret PES. After calculating, always link your answer to the real-world implications for price stability and output adjustment. Context-specific interpretation that connects the PES value to market outcomes earns the highest marks.",
        recall: {
          type: "reorder",
          prompt: "Put these PES scenarios in order from least to most elastic:",
          correctOrder: ["PES = 0: perfectly inelastic (vertical curve)", "PES < 1: supply is price inelastic", "PES = 1: unit elastic supply", "PES > 1: supply is price elastic"],
          shuffled: [3, 0, 2, 1]
        }
      },
      {
        id: "factors-influencing-pes",
        title: "Factors Influencing PES",
        keyIdea: "Spare capacity, the availability of stocks, the ease of switching production, and time all determine how elastic supply is in a given market.",
        body: [
          {
            type: "paragraph",
            text: "Several factors determine whether supply is elastic or inelastic. **Spare capacity** is the most immediate -- if a firm has unused machines and workers, it can raise output quickly without large cost increases. If the firm is already at full capacity, expanding output is slow and expensive."
          },
          {
            type: "subheading",
            text: "Key Determinants of PES"
          },
          {
            type: "bullets",
            items: [
              "**Spare capacity** -- unused resources allow rapid output expansion, making supply elastic.",
              "**Stocks of finished goods** -- firms holding inventory can supply the market instantly.",
              "**Ease of factor substitution** -- if firms can easily switch inputs or production lines, supply is more elastic.",
              "**Time period** -- supply is more elastic in the long run because firms can build new capacity."
            ]
          },
          {
            type: "paragraph",
            text: "You should understand that time is the single most important factor. In the **momentary period**, supply is perfectly inelastic because output is fixed. In the **short run**, firms can vary some inputs and supply becomes more elastic. In the **long run**, all factors of production can be adjusted and supply is most elastic."
          }
        ],
        realExample: {
          emoji: "🚗",
          text: "**Toyota** uses its famous just-in-time production system with minimal spare capacity and almost no stock of finished vehicles. This makes Toyota's short-run supply relatively inelastic when demand suddenly spikes. However, its flexible production lines allow quick model switches, improving elasticity compared to rivals with rigid assembly lines."
        },
        misconception: "Students claim \"agricultural supply is always inelastic.\" While crops do take months to grow, farmers can adjust planting decisions for the next season and release stored grain as buffer stock. Instead write: agricultural supply is inelastic in the short run due to growing seasons, but it becomes more elastic over time as farmers adjust planting.",
        examMatters: "When discussing factors influencing PES, examiners want you to link each factor to a specific market rather than listing them in the abstract. Explain why supply of the particular good in the question is elastic or inelastic, using the determinants to support your reasoning. This applied approach scores far higher than generic factor lists.",
        recall: {
          type: "fillin",
          prompt: "Complete the PES determinants:",
          template: ["___ capacity allows rapid output expansion", "→ Stocks of ___ goods let firms supply instantly", "→ Supply is most elastic in the ___ run"],
          answers: ["Spare", "finished", "long"],
          hints: ["Sp___", "fi______", "lo__"]
        }
      }
    ],
    takeaway: [
      "PES = % change in Qs / % change in price; always positive.",
      "PES > 1 is elastic; PES < 1 is inelastic; PES = 0 is perfectly inelastic.",
      "Spare capacity, stocks, factor mobility and time determine PES.",
      "Supply is almost always more elastic in the long run than the short run."
    ]
  },

  /* === Block 3: Short Run vs Long Run === */
  {
    title: "Short Run vs Long Run",
    quizIndices: [2],
    practiceIndices: [1],
    sections: [
      {
        id: "short-run-production",
        title: "Short Run Production",
        keyIdea: "In the short run at least one factor of production is fixed, so output can only expand by adding more of the variable factor, eventually hitting diminishing returns.",
        body: [
          {
            type: "paragraph",
            text: "The **short run** in economics is not a specific length of time -- it is the period during which **at least one factor of production is fixed**. Typically, capital (factories, machinery) is fixed while labour is variable. You can hire more workers, but you cannot instantly build a new factory."
          },
          {
            type: "paragraph",
            text: "In the short run, the **law of diminishing marginal returns** applies. As you add more units of a variable factor (labour) to a fixed factor (capital), the **marginal product** of each additional worker eventually falls. The first few extra workers increase output significantly, but eventually the factory becomes overcrowded and each new worker adds less."
          },
          {
            type: "flow",
            steps: ["Fixed factory, add more workers", "Initially output rises quickly", "Marginal returns begin to diminish"],
            result: "Each extra worker adds less output than the one before",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "Diminishing returns explain why the short-run supply curve slopes upward. As marginal productivity falls, the **marginal cost** of producing each extra unit rises. Firms need a higher price to cover those rising marginal costs, so they supply more only when price increases."
          }
        ],
        realExample: {
          emoji: "🍕",
          text: "**Domino's Pizza** outlets have a fixed number of ovens. During Friday evening peak demand, adding a fifth or sixth worker to the kitchen raises output only slightly because workers queue to use the same ovens. Domino's experiences clear diminishing marginal returns once its fixed capital is fully utilised."
        },
        misconception: "Students write \"diminishing returns means total output falls.\" Total output continues to rise; it is the extra output added by each additional worker that falls. Instead write: diminishing marginal returns means each additional unit of the variable factor adds less to total output than the previous one.",
        examMatters: "Examiners test whether you understand that diminishing returns is a short-run concept that requires at least one fixed factor. If you apply diminishing returns to a long-run scenario where all factors are variable, you will lose marks. Always state clearly which factor is fixed and which is variable.",
        recall: {
          type: "reorder",
          prompt: "Put the diminishing returns process in the right order:",
          correctOrder: ["At least one factor of production is fixed", "More units of the variable factor are added", "Marginal product of each extra worker eventually falls", "Marginal cost of production rises"],
          shuffled: [2, 0, 3, 1]
        }
      },
      {
        id: "long-run-production-and-returns-to-scale",
        title: "Long Run Production and Returns to Scale",
        keyIdea: "In the long run all factors are variable, so firms can scale up everything, and whether costs rise, fall or stay constant per unit depends on returns to scale.",
        body: [
          {
            type: "paragraph",
            text: "The **long run** is the period during which **all factors of production are variable**. Firms can build new factories, install new technology, and enter or exit the market entirely. There are no fixed factors constraining output, so the concept of diminishing returns does not apply."
          },
          {
            type: "paragraph",
            text: "Instead, in the long run you analyse **returns to scale**. If a firm doubles all its inputs and output more than doubles, it enjoys **increasing returns to scale** (also called **economies of scale**). If output exactly doubles, there are **constant returns to scale**. If output less than doubles, the firm faces **decreasing returns to scale** (diseconomies of scale)."
          },
          {
            type: "flow",
            steps: ["Firm doubles all inputs", "Output more than doubles", "Average cost per unit falls"],
            result: "Increasing returns to scale -- the firm benefits from growing larger",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "You should understand the difference between diminishing returns (short run, one fixed factor) and decreasing returns to scale (long run, all factors variable). They sound similar but are fundamentally different concepts operating in different time frames. Confusing them is one of the most common exam errors in this topic."
          }
        ],
        realExample: {
          emoji: "✈️",
          text: "**Airbus** invested over $25 billion developing the A350 aircraft, but once production lines were established, doubling the workforce and materials more than doubled the number of planes completed per year. Specialist teams, dedicated tooling and supplier contracts all became more efficient at higher volumes. This is a textbook case of increasing returns to scale in long-run production."
        },
        misconception: "Students confuse diminishing returns with decreasing returns to scale. Diminishing returns is a short-run concept where at least one factor is fixed; decreasing returns to scale is a long-run concept where all factors increase proportionally. Instead write: diminishing returns occurs in the short run with a fixed factor, while decreasing returns to scale occurs in the long run when all inputs are increased together.",
        examMatters: "Examiners frequently set trap questions that test whether you can distinguish short-run diminishing returns from long-run returns to scale. When writing about the long run, never mention diminishing returns -- use returns to scale terminology instead. Explain whether average costs rise, fall or stay constant as the firm expands all its inputs.",
        recall: {
          type: "fillin",
          prompt: "Complete the long-run production concepts:",
          template: ["In the long run all factors of production are ___", "→ Firm doubles inputs and output more than doubles = ___ returns to scale", "→ Increasing returns to scale means average cost per unit ___"],
          answers: ["variable", "increasing", "falls"],
          hints: ["va______", "in________", "fa___"]
        }
      }
    ],
    takeaway: [
      "Short run: at least one factor fixed; diminishing returns applies.",
      "Long run: all factors variable; analyse returns to scale instead.",
      "Diminishing returns and decreasing returns to scale are different concepts.",
      "Increasing returns to scale lower long-run average costs as firms grow."
    ]
  }

];

/* -- 3. VALIDATION --------------------------------------------------------
   Run automatically before pushing. Catches common writing-rule violations.
   ------------------------------------------------------------------------- */

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
          errors.push(`${sLabel}: keyIdea must not contain **bold** -- it is rendered plain`);
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

/* -- 4. PUSH -------------------------------------------------------------- */

async function run() {
  console.log(`\nValidating content for "${SECTION_SLUG}"...`);
  const errors = validate(CONTENT);

  if (errors.length > 0) {
    console.error('\n--- Validation failed --- fix these before pushing:\n');
    errors.forEach(e => console.error(`  - ${e}`));
    process.exit(1);
  }
  console.log(`Validation passed -- ${CONTENT.length} blocks, ${CONTENT.reduce((n, b) => n + b.sections.length, 0)} sections\n`);

  // Find the section record (sections.id IS the slug)
  const { data: section, error: secErr } = await supabase
    .from('sections')
    .select('id')
    .eq('id', SECTION_SLUG)
    .single();

  if (secErr || !section) {
    console.error(`Section "${SECTION_SLUG}" not found in ${SUBJECT_ID} sections table`);
    console.error(secErr?.message || '(no error detail)');
    process.exit(1);
  }

  // Update section_content
  const { error } = await supabase
    .from('section_content')
    .update({ data: CONTENT })
    .eq('section_id', section.id);

  if (error) {
    console.error('Supabase error:', error.message);
    process.exit(1);
  }

  console.log(`"${SECTION_SLUG}" updated successfully`);
  console.log(`   ${CONTENT.length} blocks -- ${CONTENT.reduce((n, b) => n + b.sections.length, 0)} sections -- ${CONTENT.reduce((n, b) => n + b.takeaway.length, 0)} takeaway items`);
}

run();
