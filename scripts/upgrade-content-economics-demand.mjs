/**
 * SECTION UPGRADE — Consumer Behaviour & Demand (Economics 1.3.2)
 * ================================================================
 * Edexcel IAL Economics Unit 1, spec point 1.3.2
 * Run with: node scripts/upgrade-content-economics-demand.mjs
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL     || 'https://trweeckuswgkenckeqfb.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);

/* ── 1. SETTINGS ──────────────────────────────────────────────────────────── */

const SECTION_SLUG = 'consumer-behaviour-demand';
const SUBJECT_ID   = 'economics';

/* ── 2. CONTENT ───────────────────────────────────────────────────────────── */

const CONTENT = [

  /* ═══ Block 1: Rational Decision Making and Consumer Behaviour ═══ */
  {
    title: "Rational Decision Making and Consumer Behaviour",
    quizIndices: [0],
    sections: [
      {
        id: "rational-decision-making",
        title: "Rational Decision Making",
        keyIdea: "Traditional economics assumes consumers weigh up costs and benefits at the margin and choose the option that maximises their satisfaction.",
        body: [
          {
            type: "paragraph",
            text: "A **rational** economic agent is one who considers all available information and chooses the option that gives the greatest net benefit. For consumers this means maximising **utility** (satisfaction); for firms it means maximising profit. Every decision is made **at the margin** — you compare the extra benefit of one more unit against its extra cost."
          },
          {
            type: "flow",
            steps: ["Identify options", "Compare marginal benefit vs marginal cost", "Choose the option with greatest net benefit"],
            result: "Utility is maximised",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "Rational decision-making requires that you have complete information, can process it instantly, and are not swayed by emotion or habit. In reality, those conditions rarely hold — but the assumption is useful because it gives economists a benchmark to predict how people *tend* to behave in competitive markets."
          }
        ],
        realExample: {
          emoji: "🛒",
          text: "When **Aldi** entered the UK grocery market with rock-bottom prices, the rational-consumer model predicted shoppers would switch from Tesco and Sainsbury's to save money. That is broadly what happened — Aldi's UK market share rose from 2% in 2010 to over 10% by 2023."
        },
        misconception: "Students write \"rational means people always make the best decision.\" That overstates the claim — rational means they *try* to maximise net benefit given the information available, not that they succeed perfectly. Instead write: rationality is an assumption that consumers aim to maximise utility by weighing marginal costs against marginal benefits.",
        examMatters: "Examiners often open a paper with a short question on rational decision-making. Define it as maximising utility by comparing marginal benefit to marginal cost, then note it is an assumption, not a description of how everyone actually behaves."
      },
      {
        id: "utility-and-utility-maximisation",
        title: "Utility and Utility Maximisation",
        keyIdea: "Utility is the satisfaction a consumer gains from consuming a good — you maximise it when the last pound spent on every good gives equal marginal utility.",
        body: [
          {
            type: "paragraph",
            text: "**Utility** is the economist's word for satisfaction or benefit. **Total utility** is the overall satisfaction from all units consumed. **Marginal utility** is the extra satisfaction from consuming one more unit. As you keep consuming the same good, marginal utility typically falls — this is the **law of diminishing marginal utility**."
          },
          {
            type: "flow",
            steps: ["Consume more of Good A", "Marginal utility of A falls", "Switch spending to Good B where MU is higher"],
            result: "MU per pound equalised across goods",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "A consumer maximises total utility when the **marginal utility per pound** spent is equal across all goods: MU_A / P_A = MU_B / P_B. If a pound spent on coffee gives you more satisfaction than a pound spent on tea, you should buy more coffee and less tea until the two ratios equalise."
          }
        ],
        realExample: {
          emoji: "🍕",
          text: "**Domino's** \"Two for Tuesday\" deal exploits diminishing marginal utility. Your first pizza delivers high satisfaction, but a second is worth much less to you. Domino's prices the bundle cheaply enough that even the lower marginal utility of pizza two still exceeds the marginal cost you pay."
        },
        misconception: "Students confuse total utility with marginal utility and write \"utility falls as you consume more.\" Total utility keeps rising as long as marginal utility is positive — it is marginal utility that falls. Instead write: total utility increases at a decreasing rate because marginal utility diminishes with each additional unit consumed.",
        examMatters: "If a question says \"explain how a consumer maximises utility,\" the examiner wants the equi-marginal condition: MU_A/P_A = MU_B/P_B. Show that if the ratios are unequal, the consumer can increase total utility by reallocating spending."
      },
      {
        id: "why-consumers-may-not-act-rationally",
        title: "Why Consumers May Not Act Rationally",
        keyIdea: "Real people use mental shortcuts, are swayed by emotions and habits, and lack perfect information — behavioural economics explains these systematic departures from rationality.",
        body: [
          {
            type: "paragraph",
            text: "**Behavioural economics** shows that consumers systematically deviate from the rational model. People rely on **heuristics** (mental shortcuts), are influenced by **anchoring** (fixating on the first number they see), and exhibit **loss aversion** (losses hurt roughly twice as much as equivalent gains feel good)."
          },
          {
            type: "paragraph",
            text: "You also face **bounded rationality** — your brain cannot process all available information, so you settle for a \"good enough\" choice rather than the optimal one. Habits, peer pressure, advertising, and addiction all push behaviour away from the rational ideal."
          },
          {
            type: "bullets",
            items: [
              "**Habitual behaviour**: buying the same brand without comparing prices.",
              "**Imperfect information**: not knowing a cheaper substitute exists.",
              "**Influence of others**: following trends or social proof.",
              "**Addiction and emotion**: continuing to smoke despite knowing the health costs."
            ]
          }
        ],
        realExample: {
          emoji: "🧠",
          text: "**Apple** exploits anchoring by showing the most expensive iPhone first on its website. When you then see the mid-range model, it feels like a bargain by comparison — even though it is still expensive in absolute terms. This is a systematic departure from rational price comparison."
        },
        misconception: "Students write \"behavioural economics proves the rational model is wrong.\" That is too strong — the rational model is a useful simplification that predicts well in many competitive markets. Instead write: behavioural economics enriches the rational model by identifying systematic biases, but does not replace the assumption entirely.",
        examMatters: "Evaluation questions love this topic. If you argue consumers are rational, counter-argue with behavioural biases and vice versa. Name specific biases (anchoring, loss aversion, bounded rationality) rather than vaguely saying \"people are irrational.\""
      }
    ],
    takeaway: [
      "Rational agents maximise utility by equating marginal benefit to marginal cost.",
      "Diminishing marginal utility means each extra unit adds less satisfaction.",
      "Behavioural economics identifies systematic biases like anchoring and loss aversion."
    ]
  },

  /* ═══ Block 2: The Demand Curve ═══ */
  {
    title: "The Demand Curve",
    diagramRef: "Demand Curve",
    quizIndices: [1, 2],
    practiceIndices: [0],
    sections: [
      {
        id: "demand-and-the-demand-curve",
        title: "Demand and the Demand Curve",
        keyIdea: "Demand is the quantity consumers are willing and able to buy at each price — the curve slopes downward because higher prices make you buy less.",
        body: [
          {
            type: "paragraph",
            text: "**Demand** is not just wanting something — it is the quantity of a good or service that consumers are **willing and able** to purchase at each given price in a given time period. If you want a Porsche but cannot afford one, that is desire, not demand. Demand requires both willingness *and* ability to pay."
          },
          {
            type: "paragraph",
            text: "The **demand curve** slopes downward from left to right, showing a **negative (inverse) relationship** between price and quantity demanded. There are two explanations. The **income effect**: when price falls, your real income rises so you can buy more. The **substitution effect**: when price falls, the good becomes cheaper relative to alternatives so you switch towards it."
          },
          {
            type: "flow",
            steps: ["Price of Good A falls", "Income effect: you feel richer", "Substitution effect: A is now cheaper than B"],
            result: "Quantity demanded of A rises",
            resultType: "good"
          }
        ],
        realExample: {
          emoji: "📱",
          text: "When **Samsung** cut the price of its Galaxy A-series phones by 20%, sales volumes jumped significantly in emerging markets. Consumers who previously bought cheaper brands substituted towards Samsung (substitution effect), while existing Samsung users upgraded sooner (income effect)."
        },
        misconception: "Students write \"demand fell\" when they mean quantity demanded fell. A fall in demand means the whole curve shifts left; a fall in quantity demanded is a movement along the curve caused by a price rise. Instead write: a rise in price causes a contraction in quantity demanded (movement along), not a fall in demand (shift).",
        examMatters: "The distinction between a movement along the demand curve and a shift of the curve is tested relentlessly. If the question mentions a price change of the good itself, it is a movement along. If it mentions any other factor, it is a shift. Always state which one clearly."
      },
      {
        id: "movements-along-vs-shifts",
        title: "Movements Along vs Shifts",
        keyIdea: "A change in the good's own price causes a movement along the demand curve; a change in any other factor shifts the whole curve left or right.",
        body: [
          {
            type: "paragraph",
            text: "A **movement along** the demand curve is caused by a change in the good's own price — nothing else. A price rise causes a **contraction** (movement up and left). A price fall causes an **extension** (movement down and right). The curve itself does not move."
          },
          {
            type: "paragraph",
            text: "A **shift of** the demand curve means that at *every* price, consumers want to buy a different quantity. The entire curve moves left (decrease in demand) or right (increase in demand). This is caused by changes in factors other than the good's own price."
          },
          {
            type: "subheading",
            text: "Key Terminology"
          },
          {
            type: "bullets",
            items: [
              "**Extension**: movement down the curve (price falls, Qd rises).",
              "**Contraction**: movement up the curve (price rises, Qd falls).",
              "**Increase in demand**: whole curve shifts right.",
              "**Decrease in demand**: whole curve shifts left."
            ]
          }
        ],
        realExample: {
          emoji: "☕",
          text: "When **Starbucks** raises the price of a latte from £3.50 to £4.00, fewer lattes are sold — a contraction along the demand curve. But when a viral social-media health scare about coffee emerged, demand for lattes fell at every price — the whole curve shifted left."
        },
        misconception: "Students draw a shift when the question describes a price change of the good itself. A price change only ever causes a movement along the existing curve. Instead write: only non-price factors (income, tastes, substitutes, complements, population) shift the demand curve; the good's own price causes a movement along it.",
        examMatters: "Diagram questions almost always test this distinction. Label your diagram clearly: if you show a movement, mark the old and new points on the same curve. If you show a shift, draw two separate curves (D1 and D2) and label both."
      },
      {
        id: "factors-that-shift-demand",
        title: "Factors That Shift Demand",
        keyIdea: "Income, tastes, prices of related goods, population size and expectations about the future all shift the demand curve — use the mnemonic ITPSE.",
        body: [
          {
            type: "paragraph",
            text: "Several non-price factors shift the demand curve. **Income**: if incomes rise, demand for normal goods increases (shifts right) while demand for inferior goods decreases (shifts left). **Tastes and preferences**: advertising, trends and health awareness all change what consumers want."
          },
          {
            type: "paragraph",
            text: "**Prices of related goods** matter too. If the price of a **substitute** rises, demand for your good shifts right (consumers switch). If the price of a **complement** rises, demand for your good shifts left (the pair is bought together). **Population** growth shifts demand right simply because there are more buyers."
          },
          {
            type: "paragraph",
            text: "**Expectations** can also shift demand. If consumers expect prices to rise in the future, they buy more now (demand shifts right). If they expect a recession, they may cut spending today (demand shifts left). These factors together explain why demand curves are constantly moving in real markets."
          }
        ],
        realExample: {
          emoji: "🚗",
          text: "When **Tesla** slashed the price of the Model 3 in 2023, demand for rival EVs from Volkswagen and Hyundai fell — their demand curves shifted left. Tesla is a close substitute, so its price cut diverted buyers away from competitors at every price point."
        },
        misconception: "Students list \"price\" as a factor that shifts demand. Price of the good itself causes a movement along, not a shift. Instead write: demand shifters are non-price factors — income, tastes, prices of substitutes or complements, population, and expectations.",
        examMatters: "When you explain a demand shift, always name the specific factor, state the direction of the shift, and show it on a diagram. Generic answers like \"demand increased because more people wanted it\" score poorly — say *why* more people wanted it."
      }
    ],
    takeaway: [
      "Demand = willingness and ability to pay at each price.",
      "Own-price change = movement along; any other factor = shift.",
      "Use income and substitution effects to explain the downward slope.",
      "Always name the specific factor causing a demand shift."
    ]
  },

  /* ═══ Block 3: Price Elasticity of Demand (PED) ═══ */
  {
    title: "Price Elasticity of Demand (PED)",
    diagramRef: "PED",
    quizIndices: [3, 4],
    practiceIndices: [1],
    sections: [
      {
        id: "ped-definition-and-formula",
        title: "PED Definition and Formula",
        keyIdea: "PED measures how sensitive quantity demanded is to a price change — it is the percentage change in quantity demanded divided by the percentage change in price.",
        body: [
          {
            type: "paragraph",
            text: "**Price elasticity of demand (PED)** measures the responsiveness of quantity demanded to a change in the good's own price. The formula is: PED = % change in quantity demanded / % change in price. Because the demand curve slopes downward, PED is almost always **negative** — a price rise leads to a fall in quantity demanded."
          },
          {
            type: "flow",
            steps: ["Price rises by 10%", "Quantity demanded falls by 20%", "PED = -20% / 10% = -2"],
            result: "Demand is price elastic (PED > 1 in absolute terms)",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "Some examiners ignore the negative sign and work with absolute values — check your exam board's convention. What matters is the **magnitude**: a PED of -0.5 tells you quantity demanded is relatively unresponsive to price, while a PED of -3 tells you it is highly responsive."
          }
        ],
        realExample: {
          emoji: "⛽",
          text: "Studies of **UK petrol** demand consistently find a short-run PED of around -0.2. When prices spike, most drivers still need fuel to commute, so quantity demanded barely falls. This makes petrol a textbook example of price-inelastic demand."
        },
        misconception: "Students forget that PED uses percentage changes and instead plug in absolute numbers. A rise from 100 to 120 units is a 20% change, not 20. Instead write: always convert to percentage changes before dividing — PED = (% change in Qd) / (% change in P).",
        examMatters: "Calculation questions on PED appear frequently. Show your working clearly: state the formula, plug in the percentage changes, and interpret the result. Examiners give method marks even if the final number is wrong."
      },
      {
        id: "interpreting-ped-values",
        title: "Interpreting PED Values",
        keyIdea: "If the absolute value of PED exceeds 1, demand is elastic and a price rise cuts revenue; below 1, demand is inelastic and a price rise raises revenue.",
        body: [
          {
            type: "paragraph",
            text: "**Elastic demand** (|PED| > 1) means quantity demanded is highly responsive to price. A small price rise causes a proportionally larger fall in sales. **Inelastic demand** (|PED| < 1) means quantity demanded is relatively unresponsive — even a big price change barely moves sales."
          },
          {
            type: "subheading",
            text: "Special Cases"
          },
          {
            type: "bullets",
            items: [
              "**Perfectly inelastic** (PED = 0): quantity demanded does not change at all when price changes — a vertical demand curve.",
              "**Unit elastic** (|PED| = 1): percentage change in Qd exactly equals percentage change in price — total revenue stays constant.",
              "**Perfectly elastic** (PED = infinity): any price rise above the going price causes demand to drop to zero — a horizontal demand curve."
            ]
          },
          {
            type: "paragraph",
            text: "Most real-world goods fall somewhere between perfectly elastic and perfectly inelastic. Necessities with few substitutes (insulin, water) tend to be inelastic. Luxuries with many substitutes (a specific brand of trainers) tend to be elastic."
          }
        ],
        realExample: {
          emoji: "💊",
          text: "**Novo Nordisk** can raise the price of its diabetes drug Ozempic with relatively little drop in sales because patients have few alternatives — demand is highly inelastic. In contrast, if one brand of bottled water raises its price, consumers simply switch to another brand."
        },
        misconception: "Students write \"necessities are always inelastic.\" While broadly true, it depends on how narrowly you define the good — water as a category is very inelastic, but a specific brand of bottled water is elastic because substitutes abound. Instead write: the elasticity of a good depends on the availability of substitutes, not just whether it is a necessity.",
        examMatters: "When interpreting PED, always state three things: the value, whether demand is elastic or inelastic, and what that means for the firm or consumer. A bare number without interpretation will not earn full marks."
      },
      {
        id: "factors-influencing-ped",
        title: "Factors Influencing PED",
        keyIdea: "Substitutes are the single biggest driver of PED — the more alternatives a consumer has, the more elastic demand becomes.",
        body: [
          {
            type: "paragraph",
            text: "The **number and closeness of substitutes** is the most important determinant of PED. If many alternatives exist, consumers can easily switch when the price rises, making demand elastic. If there are few or no substitutes (insulin, petrol), consumers are trapped and demand is inelastic."
          },
          {
            type: "paragraph",
            text: "The **proportion of income** spent on the good also matters. A 10% rise in the price of a newspaper barely affects your budget, so demand is inelastic. A 10% rise in rent is a huge hit, so you are more likely to change behaviour — demand is more elastic."
          },
          {
            type: "bullets",
            items: [
              "**Time**: demand becomes more elastic over time as consumers find alternatives.",
              "**Habit and addiction**: habitual or addictive goods (cigarettes, coffee) have inelastic demand.",
              "**Breadth of definition**: \"food\" is inelastic; \"organic avocados\" is elastic.",
              "**Brand loyalty**: strong brands (Apple, Nike) face less elastic demand."
            ]
          }
        ],
        realExample: {
          emoji: "🚬",
          text: "**Philip Morris** can raise cigarette prices more than most firms because nicotine addiction makes demand highly inelastic in the short run. However, over the long run, PED rises as smokers gradually quit or switch to vapes — illustrating how time increases elasticity."
        },
        misconception: "Students list factors without explaining *why* they affect PED. Saying \"time affects elasticity\" earns no marks — you must explain that over time consumers discover substitutes and adjust habits, which is why long-run PED is higher than short-run. Instead write: always link each factor to substitutability, which is the underlying mechanism.",
        examMatters: "A common 8-mark question asks you to explain the factors that determine PED. Structure your answer around substitutes as the core driver, then layer on time, proportion of income, and habit as supporting factors. Always use a specific product example."
      },
      {
        id: "ped-and-total-revenue",
        title: "PED and Total Revenue",
        keyIdea: "If demand is inelastic, raise the price to increase revenue; if demand is elastic, cut the price to increase revenue — this is the key business application of PED.",
        body: [
          {
            type: "paragraph",
            text: "**Total revenue** (TR) = price x quantity. When a firm raises its price, two things happen: each unit sold earns more (pushing TR up), but fewer units are sold (pushing TR down). Which effect wins depends entirely on PED."
          },
          {
            type: "flow",
            steps: ["Demand is inelastic (|PED| < 1)", "Price rises 10%, Qd falls only 5%", "Revenue gain from higher P > revenue loss from lower Q"],
            result: "Total revenue increases",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "If demand is **elastic**, a price rise causes a proportionally larger fall in quantity, so total revenue *falls*. The smart move is to cut the price — you lose a little per unit but gain many more sales. This explains why budget airlines like Ryanair keep fares low; their customers are highly price-sensitive."
          }
        ],
        realExample: {
          emoji: "✈️",
          text: "**Ryanair** deliberately prices flights as low as possible because leisure travellers have elastic demand — they will switch to another airline or cancel the trip if fares rise. By cutting prices, Ryanair fills more seats and earns higher total revenue than it would at a higher fare."
        },
        misconception: "Students assume that raising prices always increases revenue. That is only true when demand is inelastic. If demand is elastic, a price rise causes such a large drop in quantity that total revenue actually falls. Instead write: the effect of a price change on revenue depends on PED — inelastic means price and revenue move together; elastic means they move in opposite directions.",
        examMatters: "PED-revenue questions appear on almost every paper. Draw a quick table showing elastic vs inelastic outcomes, then apply it to the specific product in the question. Examiners reward candidates who link PED to the firm's pricing strategy."
      }
    ],
    takeaway: [
      "PED = % change in Qd / % change in price (always negative).",
      "Elastic (|PED| > 1): price up = revenue down. Inelastic (|PED| < 1): price up = revenue up.",
      "Substitutes are the key driver; time, income share, and habit also matter.",
      "Always link PED to a pricing decision in your analysis."
    ]
  },

  /* ═══ Block 4: Income Elasticity of Demand (YED) ═══ */
  {
    title: "Income Elasticity of Demand (YED)",
    quizIndices: [5],
    practiceIndices: [2],
    sections: [
      {
        id: "yed-definition-and-formula",
        title: "YED Definition and Formula",
        keyIdea: "YED measures how demand responds to a change in consumer income — the sign tells you whether the good is normal (positive) or inferior (negative).",
        body: [
          {
            type: "paragraph",
            text: "**Income elasticity of demand (YED)** measures the responsiveness of demand to a change in real income. The formula is: YED = % change in quantity demanded / % change in real income. Unlike PED, the sign of YED carries crucial information — it tells you whether the good is **normal** or **inferior**."
          },
          {
            type: "flow",
            steps: ["Income rises by 5%", "Demand for organic food rises by 15%", "YED = +15% / +5% = +3"],
            result: "Normal good with income-elastic demand",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "A **positive** YED means the good is a **normal good** — demand rises when income rises. A **negative** YED means the good is **inferior** — demand falls when income rises because consumers switch to something they perceive as better."
          }
        ],
        realExample: {
          emoji: "🍔",
          text: "As UK average incomes rose through the 2010s, demand for **McDonald's** value-menu items stagnated while spending in mid-range restaurants grew. Value-menu items behaved as inferior goods (negative YED) — when people could afford more, they traded up."
        },
        misconception: "Students forget that the sign matters for YED and always report a positive number. The sign is the whole point: positive = normal good, negative = inferior good. Instead write: always state whether YED is positive or negative and classify the good accordingly — this is what distinguishes YED from PED.",
        examMatters: "YED calculation questions test whether you can interpret the sign. State the formula, calculate the value with its sign, then classify the good as normal or inferior. A final sentence explaining what this means for the firm as incomes change earns full marks."
      },
      {
        id: "interpreting-yed-values",
        title: "Interpreting YED Values",
        keyIdea: "Luxuries have a YED greater than +1 so their demand surges as incomes rise, while necessities have a YED between 0 and +1 so demand grows slowly.",
        body: [
          {
            type: "paragraph",
            text: "Within normal goods there is an important split. **Necessities** (food, basic clothing, utilities) have a YED between 0 and +1 — demand rises with income but less than proportionally. **Luxuries** (designer clothes, holidays abroad, fine dining) have a YED greater than +1 — demand rises more than proportionally as incomes grow."
          },
          {
            type: "bullets",
            items: [
              "**YED > +1**: luxury / income-elastic normal good (demand grows faster than income).",
              "**0 < YED < +1**: necessity / income-inelastic normal good (demand grows slower than income).",
              "**YED < 0**: inferior good (demand falls as income rises)."
            ]
          },
          {
            type: "paragraph",
            text: "Classifying goods this way helps you predict what happens during economic booms and recessions. In a boom, luxury firms thrive while inferior goods lose sales. In a recession, the reverse happens — budget supermarkets and own-brand products see demand rise."
          }
        ],
        realExample: {
          emoji: "🛍️",
          text: "During the 2008 recession, demand for **Aldi** and **Lidl** own-brand groceries surged as household incomes fell — a classic inferior-good response. Meanwhile, premium retailer Waitrose saw sales dip, confirming that its products had a high positive YED."
        },
        misconception: "Students assume inferior goods are low-quality goods. Inferiority is about income response, not quality — bus travel is inferior not because buses are bad, but because when people earn more they switch to cars. Instead write: an inferior good is one whose demand falls as income rises, regardless of its objective quality.",
        examMatters: "Context questions often describe an economic boom or recession and ask you to analyse the impact on different firms. Use YED to explain why luxury retailers suffer in recessions and why budget brands thrive. Always state the YED classification."
      },
      {
        id: "significance-of-yed",
        title: "Significance of YED",
        keyIdea: "Firms use YED to plan product ranges and target growing markets — producing income-elastic goods is risky in recessions but highly rewarding in booms.",
        body: [
          {
            type: "paragraph",
            text: "For **businesses**, YED helps with long-term planning. A firm selling luxury goods (high positive YED) should expect rapid demand growth in an expanding economy but painful drops in a recession. Diversifying into necessities (low positive YED) provides a safety net when the economy turns."
          },
          {
            type: "paragraph",
            text: "For **developing countries**, YED explains structural change. As national income rises, demand shifts from basic agricultural goods (low YED) towards manufactured goods and services (higher YED). Governments can use this knowledge to invest in sectors that will grow fastest as the economy develops."
          },
          {
            type: "flow",
            steps: ["Economy enters recession", "Incomes fall", "Demand for luxuries (YED > 1) drops sharply"],
            result: "Luxury firms face revenue decline",
            resultType: "bad"
          }
        ],
        realExample: {
          emoji: "🏨",
          text: "**Marriott International** expanded aggressively into budget hotel brands (Fairfield Inn, Moxy) alongside its luxury Ritz-Carlton line. This diversification hedges against YED risk — budget brands hold up in recessions while luxury brands capture boom-time spending."
        },
        misconception: "Students write \"firms should only sell necessities because demand is stable.\" That ignores the upside of luxuries — when incomes rise, high-YED goods see demand surge, offering far higher growth potential. Instead write: the optimal strategy depends on the economic cycle — diversifying across YED ranges reduces risk.",
        examMatters: "Application questions ask you to advise a firm on its product strategy using YED. Link the YED value to the economic context (boom or recession), recommend a specific action, and explain the trade-off between stability and growth potential."
      }
    ],
    takeaway: [
      "YED = % change in Qd / % change in income; the sign classifies the good.",
      "Positive YED = normal good; negative YED = inferior good.",
      "Luxuries (YED > 1) boom in growth but crash in recessions.",
      "Firms diversify across YED ranges to hedge against the economic cycle."
    ]
  },

  /* ═══ Block 5: Cross Elasticity of Demand (XED) ═══ */
  {
    title: "Cross Elasticity of Demand (XED)",
    quizIndices: [6],
    sections: [
      {
        id: "xed-definition-and-formula",
        title: "XED Definition and Formula",
        keyIdea: "XED measures how the demand for one good responds to a price change in another good — the sign tells you whether the goods are substitutes or complements.",
        body: [
          {
            type: "paragraph",
            text: "**Cross elasticity of demand (XED)** measures the responsiveness of demand for Good A to a change in the price of Good B. The formula is: XED = % change in quantity demanded of A / % change in price of B. Just like YED, the **sign** is critical — it reveals the relationship between the two goods."
          },
          {
            type: "flow",
            steps: ["Price of Coca-Cola rises by 10%", "Demand for Pepsi rises by 8%", "XED = +8% / +10% = +0.8"],
            result: "Positive XED: Coke and Pepsi are substitutes",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "A **positive** XED means the goods are **substitutes** — when one becomes more expensive, demand for the other rises. A **negative** XED means the goods are **complements** — when one becomes more expensive, demand for the other falls because they are consumed together."
          }
        ],
        realExample: {
          emoji: "🎮",
          text: "When **Sony** cut the price of the PlayStation 5, demand for PS5 game titles rose sharply — a negative XED confirming they are complements. At the same time, demand for Xbox consoles dipped — a positive XED confirming PlayStation and Xbox are substitutes."
        },
        misconception: "Students mix up which good goes in the numerator and which in the denominator. The numerator is always the change in quantity demanded of Good A; the denominator is always the change in price of Good B. Instead write: XED = (% change Qd of A) / (% change P of B) — keep A on top and B on the bottom.",
        examMatters: "Calculation questions on XED always test whether you can interpret the sign. After calculating, state whether the goods are substitutes (positive) or complements (negative), and explain what this means for the firms involved."
      },
      {
        id: "interpreting-xed-values",
        title: "Interpreting XED Values",
        keyIdea: "The closer XED is to zero, the weaker the relationship between the two goods; high positive values mean close substitutes and high negative values mean strong complements.",
        body: [
          {
            type: "paragraph",
            text: "The **magnitude** of XED matters as well as the sign. A XED of +0.1 between two goods means they are weak substitutes — a price change in one barely affects demand for the other. A XED of +2.5 means they are very close substitutes — consumers switch readily between them."
          },
          {
            type: "bullets",
            items: [
              "**XED close to 0**: the goods are unrelated (bread and laptops).",
              "**XED strongly positive**: close substitutes (Coke and Pepsi).",
              "**XED strongly negative**: strong complements (printers and ink cartridges)."
            ]
          },
          {
            type: "paragraph",
            text: "Understanding the magnitude helps firms assess their competitive landscape. If your product has a high positive XED with a rival, you are in direct competition and must differentiate or compete on price. If XED is close to zero, you operate in a separate market."
          }
        ],
        realExample: {
          emoji: "🖨️",
          text: "**HP** prices its printers cheaply but charges high prices for ink cartridges because the two are strong complements (XED is highly negative). A cheap printer locks you into buying expensive ink — a strategy only possible when XED confirms a strong complementary relationship."
        },
        misconception: "Students forget about the magnitude and only focus on the sign. A XED of +0.01 and +3.0 are both positive (substitutes), but the practical implications are completely different. Instead write: always comment on the size of XED — weak substitutes barely affect each other, while close substitutes are in direct competition.",
        examMatters: "Higher-mark questions ask you to discuss the significance of XED for business strategy. Go beyond the sign: explain whether the relationship is strong or weak and what that means for pricing, marketing and competitive positioning."
      },
      {
        id: "significance-of-xed",
        title: "Significance of XED",
        keyIdea: "Firms use XED to identify competitors and complementary partners, set prices strategically, and decide which markets to enter or avoid.",
        body: [
          {
            type: "paragraph",
            text: "For **pricing strategy**, XED is invaluable. If your product has a high positive XED with a rival, you know that undercutting their price will attract many of their customers. If your product is a strong complement to another, you can price one cheaply to drive sales of the profitable partner (the razor-and-blades model)."
          },
          {
            type: "paragraph",
            text: "For **market analysis**, XED helps define market boundaries. Competition regulators like the **CMA** use XED to determine whether two firms are in the same market — a high positive XED between their products suggests they are, which matters for merger approvals and anti-trust decisions."
          },
          {
            type: "flow",
            steps: ["Firm finds high positive XED with rival", "Launches price-match guarantee", "Rival's customers switch"],
            result: "Market share increases",
            resultType: "good"
          }
        ],
        realExample: {
          emoji: "📺",
          text: "When **Netflix** launched in the UK, it had a high positive XED with **Sky TV** subscriptions. Sky responded by cutting prices and launching its own streaming service, Now TV. The high XED forced both firms into a price war that ultimately benefited consumers."
        },
        misconception: "Students say \"XED only matters for substitutes.\" Complementary goods are equally important — printer makers, games console makers and razor companies all rely on the complementary relationship to generate profits. Instead write: XED matters for both substitutes (competitive strategy) and complements (bundling and cross-selling strategy).",
        examMatters: "Evaluate questions on XED want you to link the concept to real business or government decisions. For businesses, discuss pricing and product strategy. For governments, discuss how regulators use XED to define markets and assess competition."
      }
    ],
    takeaway: [
      "XED = % change Qd of A / % change P of B; sign reveals the relationship.",
      "Positive XED = substitutes; negative XED = complements; near zero = unrelated.",
      "Magnitude matters: close substitutes compete fiercely; strong complements enable bundling."
    ]
  },

  /* ═══ Block 6: Significance of Elasticities ═══ */
  {
    title: "Significance of Elasticities",
    quizIndices: [7],
    practiceIndices: [3],
    sections: [
      {
        id: "using-elasticities-for-business-decisions",
        title: "Using Elasticities for Business Decisions",
        keyIdea: "Elasticities give firms the data they need to set prices, plan product ranges and forecast revenue — they turn economic theory into actionable business strategy.",
        body: [
          {
            type: "paragraph",
            text: "**PED** tells a firm whether to raise or lower its price. If demand is inelastic, a price increase raises total revenue. If demand is elastic, a price cut attracts enough extra sales to more than compensate for the lower price per unit. This is why supermarkets run frequent promotions on elastic goods like branded biscuits but rarely discount inelastic staples like milk."
          },
          {
            type: "paragraph",
            text: "**YED** helps firms plan for the economic cycle. A luxury car manufacturer with a high positive YED should build cash reserves to survive recessions, while investing in capacity for boom periods. A firm selling inferior goods should plan for *declining* demand as economies grow long-term."
          },
          {
            type: "paragraph",
            text: "**XED** guides competitive and complementary strategy. A firm facing close substitutes must differentiate or compete on price. A firm selling complements can use loss-leader pricing on one product to drive profitable sales of the other — the classic razor-and-blades approach."
          }
        ],
        realExample: {
          emoji: "🏪",
          text: "**Tesco** uses Clubcard data to estimate PED for thousands of products, then prices elastic goods aggressively low to attract shoppers and inelastic goods slightly higher to protect margins. This data-driven approach to elasticity is now standard across all major UK supermarkets."
        },
        misconception: "Students treat elasticities as purely theoretical concepts with no practical use. In reality, firms spend millions estimating PED, YED and XED to set prices and plan strategy. Instead write: elasticities are among the most practically useful tools in economics — every major pricing decision implicitly or explicitly uses them.",
        examMatters: "Synoptic questions ask you to apply all three elasticities to a single business context. Structure your answer by covering PED (pricing), YED (product range), and XED (competitive positioning) in turn, then evaluate which is most useful for the specific scenario."
      },
      {
        id: "using-elasticities-for-government-policy",
        title: "Using Elasticities for Government Policy",
        keyIdea: "Governments use PED to design effective taxes, YED to plan public services as incomes grow, and XED to regulate competition — elasticity shapes policy.",
        body: [
          {
            type: "paragraph",
            text: "**PED and taxation**: governments place indirect taxes on goods with inelastic demand (cigarettes, alcohol, petrol) because consumers cannot easily reduce consumption, so the tax raises significant revenue. Taxing elastic goods raises less revenue because consumers simply stop buying."
          },
          {
            type: "flow",
            steps: ["Government taxes cigarettes (inelastic demand)", "Consumers barely cut quantity", "Tax revenue is high"],
            result: "Effective revenue collection + reduced consumption at the margin",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "**YED and public services**: as a country's income grows, demand for healthcare and education (high YED services) rises faster than demand for basic food. Governments must plan for this structural shift by expanding service-sector capacity. In developing nations, this insight shapes long-term infrastructure investment."
          },
          {
            type: "paragraph",
            text: "**XED and competition policy**: regulators use XED to define relevant markets. If two products have a high positive XED, they are in the same market, so a merger between their producers may reduce competition. The **CMA** in the UK and the **European Commission** both use XED evidence in merger investigations."
          }
        ],
        realExample: {
          emoji: "🇬🇧",
          text: "The **UK government** raises tobacco duty every year precisely because PED for cigarettes is around -0.4 — highly inelastic. Each price rise generates substantial tax revenue while only modestly reducing the quantity smoked, achieving both a fiscal and a public-health objective."
        },
        misconception: "Students write \"taxes on inelastic goods are unfair because consumers cannot avoid them.\" While this may be true from an equity standpoint, the question is usually about effectiveness, not fairness. Instead write: governments tax inelastic goods because it maximises revenue and reduces consumption at the margin, but acknowledge the regressive equity concern as an evaluation point.",
        examMatters: "Policy-evaluation questions ask whether a tax or subsidy will achieve its objective. Always start with PED: if demand is inelastic, the tax raises revenue but barely changes behaviour. If demand is elastic, the tax changes behaviour but raises little revenue. State this trade-off explicitly."
      }
    ],
    takeaway: [
      "PED guides pricing: raise price if inelastic, cut if elastic.",
      "YED helps plan for booms and recessions across product ranges.",
      "XED informs competitive strategy and helps regulators define markets.",
      "Governments tax inelastic goods for revenue; elastic goods for behaviour change."
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
