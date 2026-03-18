/**
 * RICH NOTES — Economics Unit 1, Part 1 (1.3.1, 1.3.2, 1.3.3)
 * =============================================================
 * Edexcel IAL Economics Unit 1, spec points 1.3.1 – 1.3.3
 * Pushes rich-format notes to Supabase section_notes table.
 *
 * Sections:
 *   1.3.1 Introductory Concepts        (introductory-concepts)
 *   1.3.2 Consumer Behaviour & Demand   (consumer-behaviour-demand)
 *   1.3.3 Supply                        (supply)
 *
 * Run with: node scripts/update-economics-unit1-rich-notes-part1.mjs
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL || 'https://trweeckuswgkenckeqfb.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);


/* ═══════════════════════════════════════════════════════════════
 *  1.3.1 — INTRODUCTORY CONCEPTS
 *
 *  5 chapters: Nature of Economics, Scarcity/Choice/Opportunity
 *  Cost, PPFs, Specialisation & Money, Economic Systems
 * ═══════════════════════════════════════════════════════════════ */

const NOTES_131 = [

  /* ─────────────────────────────────────────────────
   *  Chapter 1: The Nature of Economics
   * ───────────────────────────────────────────────── */
  {
    title: "The Nature of Economics",
    meta: "5 concepts",
    keyIdea: "Before studying any market or policy, economists need a shared toolkit of thinking methods that strip away noise and isolate the effect of one variable at a time.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Economics</strong> — the social science that studies how societies allocate scarce resources among competing unlimited wants."
          },
          {
            type: "def",
            text: "<strong>Ceteris paribus</strong> — a Latin phrase meaning 'all other things being equal', used to isolate the effect of one variable while holding everything else constant.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Positive statement</strong> — an objective claim that can be tested against real-world data, whether it turns out to be true or false."
          },
          {
            type: "def",
            text: "<strong>Normative statement</strong> — a subjective opinion based on value judgements that cannot be proven or disproven with data alone."
          }
        ]
      },
      {
        title: "HOW ECONOMISTS THINK",
        items: [
          {
            type: "mech",
            text: "Economists build simplified <strong>models</strong> of the real world, stripping away complexity so they can predict how one change ripples through an economy."
          },
          {
            type: "mech",
            text: "Ceteris paribus allows economists to examine cause and effect by <strong>changing one variable</strong> at a time, just as a scientist controls an experiment."
          },
          {
            type: "imp",
            text: "Distinguishing positive from normative statements matters because <strong>policy debates</strong> often disguise opinions as facts, and examiners expect you to spot the difference.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Every diagram in economics relies on ceteris paribus; when you shift a demand curve, you assume income, tastes, and all other factors stay the same."
          }
        ]
      }
    ],
    flow: {
      steps: ["Observe real-world problem", "Build simplified model", "Apply ceteris paribus", "Predict outcome"],
      result: "Testable economic theory",
      resultType: "good"
    },
    examMatters: "Examiners often give a list of statements and ask you to identify which are positive and which are normative. Positive statements contain measurable claims ('inflation is 3%'); normative statements contain value words like 'should', 'better', or 'fair'.",
    misconception: "Students say positive statements must be true. Wrong because a positive statement only needs to be testable, not correct. 'Inflation is 50%' is positive because you can check the data, even though the claim is false. Instead write: positive statements are objective and testable; normative statements are subjective and based on values.",
    takeaway: [
      "Economics is a social science that uses models and ceteris paribus to simplify a complex world.",
      "Positive statements can be tested with evidence; normative statements reflect opinions and values.",
      "Every curve shift on a diagram assumes ceteris paribus, so always state what is held constant."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 2: Scarcity, Choice & Opportunity Cost
   * ───────────────────────────────────────────────── */
  {
    title: "Scarcity, Choice & Opportunity Cost",
    meta: "4 concepts",
    keyIdea: "Because resources are limited but human wants are not, every decision means giving something up, and the true cost of any choice is the best alternative you sacrificed.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Scarcity</strong> — the fundamental economic problem that arises because resources are finite while human wants are infinite, forcing societies to make choices."
          },
          {
            type: "def",
            text: "<strong>Factors of production</strong> — the four categories of scarce resources used to produce goods and services: land, labour, capital, and enterprise."
          },
          {
            type: "def",
            text: "<strong>Opportunity cost</strong> — the value of the next best alternative foregone when a choice is made; it is the real cost of every decision.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Free good</strong> — a resource that is not scarce and therefore has no opportunity cost, such as air in most situations."
          }
        ]
      },
      {
        title: "WHY IT MATTERS",
        items: [
          {
            type: "mech",
            text: "Scarcity forces three fundamental questions on every society: <strong>what</strong> to produce, <strong>how</strong> to produce it, and <strong>for whom</strong> to produce."
          },
          {
            type: "imp",
            text: "Opportunity cost applies to individuals, firms, and governments alike; a government spending more on defence has <strong>less to spend on healthcare</strong>.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Opportunity cost is the engine behind the PPF; every point on the curve represents a trade-off between two goods."
          }
        ]
      }
    ],
    flow: {
      steps: ["Resources are scarce", "Choices must be made", "Every choice has an opportunity cost"],
      result: "Trade-offs are unavoidable in all economic decisions",
      resultType: "bad"
    },
    examMatters: "Examiners expect you to identify the specific opportunity cost in context, not just say 'there is an opportunity cost'. Name the next best alternative and explain what is sacrificed.",
    misconception: "Students say opportunity cost is the total of everything you give up. Wrong because opportunity cost is only the single next best alternative foregone, not the sum of all alternatives. Instead write: opportunity cost is the value of the one best option you did not choose.",
    takeaway: [
      "Scarcity is the root of all economics; without it there would be no need to make choices.",
      "Opportunity cost is always the next best alternative, never the total of everything sacrificed.",
      "Every economic agent, from households to governments, faces trade-offs driven by scarcity."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 3: Production Possibility Frontiers
   * ───────────────────────────────────────────────── */
  {
    title: "Production Possibility Frontiers",
    meta: "5 concepts",
    keyIdea: "A single curved line captures an economy's maximum output, its trade-offs, its efficiency, and how growth or decline shifts what is possible.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Production possibility frontier (PPF)</strong> — a curve showing the maximum combinations of two goods an economy can produce when all resources are used efficiently."
          },
          {
            type: "def",
            text: "<strong>Productive efficiency</strong> — achieved at any point on the PPF where all resources are fully and efficiently employed, so producing more of one good requires producing less of another."
          },
          {
            type: "def",
            text: "<strong>Economic growth</strong> — an outward shift of the entire PPF, caused by an increase in the quantity or quality of factors of production.",
            tag: "exam"
          }
        ]
      },
      {
        title: "READING THE DIAGRAM",
        items: [
          {
            type: "mech",
            text: "Points on the PPF are <strong>productively efficient</strong>; points inside it represent unemployed or misallocated resources; points outside it are currently unattainable."
          },
          {
            type: "mech",
            text: "The PPF is concave (bowed outward) because of <strong>increasing opportunity cost</strong>; as you produce more of one good, resources less suited to it must be diverted, raising the sacrifice."
          },
          {
            type: "imp",
            text: "An outward shift means the economy can produce <strong>more of both goods</strong>, caused by better technology, more resources, or improved education.",
            tag: "exam"
          },
          {
            type: "imp",
            text: "An inward shift signals a loss of productive capacity, caused by natural disasters, war, or <strong>depletion of resources</strong>."
          },
          {
            type: "link",
            text: "The PPF is the graphical expression of scarcity and opportunity cost; moving along the curve shows exactly how much of one good must be sacrificed for more of the other."
          }
        ]
      }
    ],
    flow: {
      steps: ["Resources increase or improve", "PPF shifts outward", "Economy can produce more"],
      result: "Economic growth expands possibilities",
      resultType: "good"
    },
    examMatters: "Examiners want you to distinguish between a movement along the PPF (reallocation with no growth) and a shift of the PPF (actual growth or decline). Always label which type you are describing and state the cause.",
    misconception: "Students say a point inside the PPF means the economy is shrinking. Wrong because it simply means resources are not fully employed or are misallocated. Instead write: a point inside the PPF indicates inefficiency or unemployment, not a smaller economy.",
    takeaway: [
      "The PPF shows maximum output, trade-offs, and efficiency in one diagram.",
      "Moving along the PPF shows opportunity cost; shifting the PPF shows economic growth or decline.",
      "The concave shape reflects increasing opportunity cost as resources are transferred between uses."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 4: Specialisation & Money
   * ───────────────────────────────────────────────── */
  {
    title: "Specialisation & Money",
    meta: "5 concepts",
    keyIdea: "When people and nations focus on what they do best and then trade, total output rises for everyone, but this only works smoothly when money replaces the clumsy barter system.",
    blocks: [
      {
        title: "SPECIALISATION",
        items: [
          {
            type: "def",
            text: "<strong>Specialisation</strong> — when individuals, firms, or countries concentrate on producing the goods or services where they have the greatest efficiency advantage."
          },
          {
            type: "def",
            text: "<strong>Division of labour</strong> — breaking a production process into separate tasks, each performed by a different worker, increasing speed, skill, and output per worker.",
            tag: "exam"
          },
          {
            type: "mech",
            text: "Specialisation raises productivity because workers develop <strong>expertise</strong>, waste less time switching tasks, and allow machinery to be used more efficiently."
          },
          {
            type: "imp",
            text: "Over-specialisation creates risks: workers may suffer <strong>boredom and demotivation</strong>, and the firm becomes vulnerable if one specialist link in the chain breaks down."
          }
        ]
      },
      {
        title: "MONEY & EXCHANGE",
        items: [
          {
            type: "def",
            text: "<strong>Money</strong> — anything widely accepted as a medium of exchange that also serves as a store of value, a unit of account, and a standard of deferred payment."
          },
          {
            type: "mech",
            text: "Barter requires a <strong>double coincidence of wants</strong>; money eliminates this problem by providing a universally accepted medium, making trade far more efficient."
          },
          {
            type: "imp",
            text: "Without money, specialisation would collapse because workers could not easily <strong>exchange their output</strong> for the many different goods they need."
          },
          {
            type: "link",
            text: "Specialisation and trade link directly to the PPF; countries trading along comparative advantage lines can consume beyond their own production possibilities."
          }
        ]
      }
    ],
    flow: {
      steps: ["Workers specialise", "Output per worker rises", "Money enables easy exchange"],
      result: "Higher living standards through trade",
      resultType: "good"
    },
    examMatters: "Examiners want you to evaluate specialisation by discussing both its benefits (higher productivity, lower costs) and its drawbacks (worker boredom, structural unemployment, dependency). Always provide a two-sided argument.",
    misconception: "Students say division of labour and specialisation are the same thing. Wrong because division of labour is one specific form of specialisation applied within a production process, while specialisation also applies to firms, regions, and entire countries. Instead write: division of labour is the splitting of tasks within production; specialisation is the broader concept of focusing on what you do best.",
    takeaway: [
      "Specialisation increases output and efficiency, but over-reliance creates vulnerability.",
      "Division of labour is one form of specialisation applied within a single production process.",
      "Money's four functions make specialisation and trade practical; without it, barter's inefficiency would limit exchange."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 5: Economic Systems
   * ───────────────────────────────────────────────── */
  {
    title: "Economic Systems",
    meta: "4 concepts",
    keyIdea: "Every society must answer the three basic economic questions, but they differ radically in whether they hand that power to markets, governments, or some combination of both.",
    blocks: [
      {
        title: "TYPES OF SYSTEM",
        items: [
          {
            type: "def",
            text: "<strong>Free market economy</strong> — an economic system where resources are allocated through the price mechanism with minimal government intervention; consumers and producers make decisions based on self-interest."
          },
          {
            type: "def",
            text: "<strong>Command economy</strong> — an economic system where the government owns the factors of production and makes all decisions about what, how, and for whom to produce.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Mixed economy</strong> — an economic system combining elements of both free market and command economies, where the private sector and government share resource allocation decisions."
          }
        ]
      },
      {
        title: "HOW THEY COMPARE",
        items: [
          {
            type: "mech",
            text: "In a free market, the <strong>price mechanism</strong> acts as a signal, incentive, and rationing device, automatically directing resources to where they are most valued."
          },
          {
            type: "mech",
            text: "In a command economy, central planners decide output levels and prices, which avoids some inequality but often leads to <strong>inefficiency and shortages</strong> because planners lack perfect information."
          },
          {
            type: "imp",
            text: "Most real-world economies are mixed; the debate centres on <strong>where the boundary</strong> between market and state should lie.",
            tag: "exam"
          },
          {
            type: "imp",
            text: "Free markets can fail through externalities, public goods, and inequality, which is why even market-oriented economies use government intervention to <strong>correct market failures</strong>."
          },
          {
            type: "link",
            text: "Economic systems link to the role of government in Unit 1; understanding why markets fail explains why mixed economies exist."
          }
        ]
      }
    ],
    flow: {
      steps: ["Society faces scarcity", "Must answer what/how/for whom", "Chooses market, state, or mix"],
      result: "Resource allocation method determines efficiency and equity",
      resultType: "good"
    },
    examMatters: "Examiners want you to evaluate each system, not just describe it. Discuss the trade-off between efficiency (free markets) and equity (command economies), and explain why most countries choose a mixed approach.",
    misconception: "Students say free markets always produce the best outcome. Wrong because free markets fail when externalities, public goods, or monopoly power exist, leading to inefficient or unfair outcomes. Instead write: free markets are efficient at allocating most resources but require government intervention to correct specific failures like pollution or under-provision of public goods.",
    takeaway: [
      "Free markets use the price mechanism to allocate resources efficiently but can fail on equity and externalities.",
      "Command economies can address inequality but suffer from information problems and inefficiency.",
      "Mixed economies combine market efficiency with government intervention to correct failures; the real debate is where to draw the line."
    ]
  }

];


/* ═══════════════════════════════════════════════════════════════
 *  1.3.2 — CONSUMER BEHAVIOUR & DEMAND
 *
 *  6 chapters: Rational Decision Making, The Demand Curve,
 *  PED, YED, XED, Significance of Elasticities
 * ═══════════════════════════════════════════════════════════════ */

const NOTES_132 = [

  /* ─────────────────────────────────────────────────
   *  Chapter 1: Rational Decision Making
   * ───────────────────────────────────────────────── */
  {
    title: "Rational Decision Making",
    meta: "4 concepts",
    keyIdea: "Economists assume consumers weigh up costs and benefits to maximise their satisfaction, but real humans are not always so calculating, and understanding both sides matters.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Rational consumer</strong> — a consumer who aims to maximise utility (satisfaction) from the goods and services they purchase, given their limited income."
          },
          {
            type: "def",
            text: "<strong>Utility</strong> — the satisfaction or benefit a consumer receives from consuming a good or service; economists assume consumers seek to maximise total utility.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Diminishing marginal utility</strong> — the principle that each additional unit of a good consumed provides less extra satisfaction than the previous unit."
          }
        ]
      },
      {
        title: "HOW CONSUMERS CHOOSE",
        items: [
          {
            type: "mech",
            text: "A rational consumer compares the <strong>marginal utility per pound</strong> spent across goods and reallocates spending until the last pound spent on each good gives equal satisfaction."
          },
          {
            type: "mech",
            text: "Diminishing marginal utility explains the downward-sloping demand curve: as you consume more, each extra unit is <strong>worth less to you</strong>, so you will only buy more at a lower price."
          },
          {
            type: "imp",
            text: "In reality, consumers are influenced by habit, emotion, advertising, and imperfect information, which means <strong>rational behaviour is an assumption</strong>, not always a fact.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Behavioural economics challenges the rational consumer model by showing systematic biases like loss aversion and anchoring that lead to predictably irrational choices."
          }
        ]
      }
    ],
    flow: {
      steps: ["Consumer faces choices", "Weighs marginal utility vs price", "Allocates income to maximise utility"],
      result: "Maximum total satisfaction from limited budget",
      resultType: "good"
    },
    examMatters: "Examiners expect you to state the assumption of rationality and then evaluate it. Show you understand that the model is useful for prediction but does not perfectly describe real behaviour.",
    misconception: "Students say rational means consumers always make the correct decision. Wrong because rationality in economics means pursuing maximum utility given available information, not that every decision turns out perfectly. Instead write: a rational consumer aims to maximise utility, but imperfect information and cognitive biases mean real decisions often fall short of this ideal.",
    takeaway: [
      "Rational consumers maximise utility by equating marginal utility per pound across all goods.",
      "Diminishing marginal utility explains why demand curves slope downward.",
      "Rationality is a useful simplifying assumption, not a perfect description of real human behaviour."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 2: The Demand Curve
   * ───────────────────────────────────────────────── */
  {
    title: "The Demand Curve",
    meta: "5 concepts",
    keyIdea: "The demand curve tells the story of how much consumers want at every price, and knowing what moves along it versus what shifts it is the single most important distinction in microeconomics.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Effective demand</strong> — the quantity of a good that consumers are willing and able to buy at a given price in a given time period."
          },
          {
            type: "def",
            text: "<strong>Movement along the demand curve</strong> — caused only by a change in the good's own price; a fall in price causes an extension (more demanded), a rise causes a contraction.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Shift of the demand curve</strong> — caused by a change in any non-price factor; the entire curve moves left (decrease) or right (increase) at every price level."
          }
        ]
      },
      {
        title: "FACTORS SHIFTING DEMAND",
        items: [
          {
            type: "mech",
            text: "A rise in <strong>consumer income</strong> shifts demand right for normal goods and left for inferior goods, because consumers can now afford better alternatives."
          },
          {
            type: "mech",
            text: "Changes in the <strong>price of related goods</strong> shift demand: a rise in the price of a substitute increases demand for this good, while a rise in the price of a complement decreases it."
          },
          {
            type: "mech",
            text: "Shifts in <strong>tastes and preferences</strong>, driven by advertising, trends, or health concerns, move the entire demand curve without any change in the good's own price."
          },
          {
            type: "mech",
            text: "An increase in <strong>population size</strong> or a change in demographics shifts market demand to the right as more consumers enter the market."
          },
          {
            type: "imp",
            text: "Always state whether you are describing a movement or a shift; examiners penalise students who confuse the two because it shows a fundamental misunderstanding.",
            tag: "exam"
          }
        ]
      }
    ],
    flow: {
      steps: ["Non-price factor changes", "Demand curve shifts", "New equilibrium forms"],
      result: "Price and quantity both adjust to the new demand",
      resultType: "good"
    },
    examMatters: "Examiners will almost always test whether you know the difference between a movement along and a shift of the demand curve. Use 'extension' and 'contraction' for movements, and 'increase' and 'decrease' for shifts. Never say demand 'goes up' without specifying which type.",
    misconception: "Students say a fall in price shifts the demand curve to the right. Wrong because a change in the good's own price causes a movement along the existing curve, not a shift. Instead write: a fall in price causes an extension of demand (movement along); only non-price factors shift the curve.",
    takeaway: [
      "Demand means willingness and ability to pay; it is not just desire.",
      "Only a change in the good's own price causes a movement along the demand curve.",
      "Non-price factors (income, related goods, tastes, population) shift the entire curve."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 3: Price Elasticity of Demand (PED)
   * ───────────────────────────────────────────────── */
  {
    title: "Price Elasticity of Demand",
    meta: "5 concepts",
    keyIdea: "PED measures how dramatically consumers react to a price change, and it holds the key to whether raising prices will grow or shrink a firm's total revenue.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Price elasticity of demand (PED)</strong> — a measure of the responsiveness of quantity demanded to a change in the good's own price; it is always negative because of the inverse relationship.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Elastic demand</strong> — when |PED| > 1, meaning quantity demanded changes by a greater percentage than the price change; consumers are highly responsive."
          },
          {
            type: "def",
            text: "<strong>Inelastic demand</strong> — when |PED| < 1, meaning quantity demanded changes by a smaller percentage than the price change; consumers are relatively unresponsive."
          }
        ]
      },
      {
        title: "DETERMINANTS & REVENUE",
        items: [
          {
            type: "mech",
            text: "Demand is more elastic when there are <strong>close substitutes available</strong>, because consumers can easily switch to an alternative if the price rises."
          },
          {
            type: "mech",
            text: "Demand tends to be more inelastic for goods that take a <strong>small proportion of income</strong>, are habit-forming, or are necessities with no close alternatives."
          },
          {
            type: "mech",
            text: "Demand becomes more elastic over <strong>longer time periods</strong> because consumers have more time to find substitutes and adjust their behaviour."
          },
          {
            type: "imp",
            text: "If demand is inelastic, a price rise <strong>increases total revenue</strong> because the fall in quantity is proportionally smaller than the rise in price.",
            tag: "exam"
          },
          {
            type: "imp",
            text: "If demand is elastic, a price rise <strong>decreases total revenue</strong> because the fall in quantity is proportionally larger than the rise in price."
          },
          {
            type: "link",
            text: "PED links to taxation policy; governments place indirect taxes on price-inelastic goods like cigarettes because demand falls little, so tax revenue is high and the tax burden falls mainly on consumers."
          }
        ]
      }
    ],
    formulas: [
      {
        label: "PED",
        text: "PED = % change in quantity demanded \u00f7 % change in price"
      },
      {
        label: "TOTAL REVENUE",
        text: "Total Revenue = Price \u00d7 Quantity"
      }
    ],
    flow: {
      steps: ["Price rises", "Check PED value", "Predict revenue change"],
      result: "Inelastic: revenue rises; Elastic: revenue falls",
      resultType: "good"
    },
    examMatters: "Examiners expect you to calculate PED, state whether demand is elastic or inelastic, and then link this to the effect on total revenue. Always show the formula, substitute the numbers, and interpret the result in context.",
    misconception: "Students forget that PED is always negative and write a positive value. Wrong because the law of demand means price and quantity move in opposite directions, so the coefficient is negative. Instead write: PED is always negative due to the inverse price-quantity relationship; use the absolute value when comparing elasticity but acknowledge the negative sign.",
    takeaway: [
      "PED measures how sensitive consumers are to price changes; it is always negative.",
      "Availability of substitutes is the most important determinant of PED.",
      "Firms with inelastic demand can raise prices to boost revenue; firms with elastic demand should lower prices instead."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 4: Income Elasticity of Demand (YED)
   * ───────────────────────────────────────────────── */
  {
    title: "Income Elasticity of Demand",
    meta: "4 concepts",
    keyIdea: "When incomes rise, demand for some goods soars while demand for others actually falls, and the sign and size of YED tells firms exactly which way to bet.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Income elasticity of demand (YED)</strong> — a measure of the responsiveness of quantity demanded to a change in consumer income."
          },
          {
            type: "def",
            text: "<strong>Normal good</strong> — a good with a positive YED; demand rises as income rises because consumers can afford more of it.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Inferior good</strong> — a good with a negative YED; demand falls as income rises because consumers switch to higher-quality alternatives."
          },
          {
            type: "def",
            text: "<strong>Luxury good</strong> — a normal good with YED > 1; demand rises by a greater proportion than the income increase, making it highly income-sensitive."
          }
        ]
      },
      {
        title: "HOW TO USE YED",
        items: [
          {
            type: "mech",
            text: "The <strong>sign</strong> of YED tells you the type of good: positive means normal, negative means inferior; the <strong>size</strong> tells you the degree of sensitivity."
          },
          {
            type: "mech",
            text: "During economic growth, firms selling luxury goods (YED > 1) see demand <strong>rise more than proportionally</strong>, while firms selling inferior goods see demand fall."
          },
          {
            type: "imp",
            text: "In a recession, demand for inferior goods like budget supermarkets actually <strong>increases</strong> as consumers trade down, making them counter-cyclical businesses.",
            tag: "exam"
          },
          {
            type: "link",
            text: "YED links to business strategy; firms use YED data to decide which product lines to expand during booms and which to protect during recessions."
          }
        ]
      }
    ],
    formulas: [
      {
        label: "YED",
        text: "YED = % change in quantity demanded \u00f7 % change in income"
      }
    ],
    flow: {
      steps: ["Income rises", "Check YED sign and size", "Predict demand change"],
      result: "Normal goods: demand rises; Inferior goods: demand falls",
      resultType: "good"
    },
    examMatters: "Examiners test whether you can interpret the sign and size of YED. A positive value means normal good; a negative value means inferior good. If the positive value exceeds 1, it is a luxury. Always link YED to the economic cycle in your analysis.",
    misconception: "Students say inferior goods are low-quality goods. Wrong because inferior is an economic term meaning demand falls as income rises, not a judgement on quality. Instead write: inferior goods are those consumers buy less of as income rises, because they switch to preferred alternatives; examples include budget brands and public transport.",
    takeaway: [
      "YED sign tells you normal (+) or inferior (-); YED size tells you how sensitive demand is to income.",
      "Luxury goods (YED > 1) boom in growth and crash in recession; inferior goods do the opposite.",
      "Firms use YED to plan product portfolios that perform across the economic cycle."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 5: Cross Elasticity of Demand (XED)
   * ───────────────────────────────────────────────── */
  {
    title: "Cross Elasticity of Demand",
    meta: "4 concepts",
    keyIdea: "Products do not exist in isolation; XED reveals the invisible threads connecting goods, telling firms how a rival's price cut or a complement's price rise will drag their own sales up or down.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Cross elasticity of demand (XED)</strong> — a measure of the responsiveness of quantity demanded of good A to a change in the price of good B."
          },
          {
            type: "def",
            text: "<strong>Substitutes</strong> — goods with a positive XED; when the price of one rises, demand for the other increases as consumers switch.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Complements</strong> — goods with a negative XED; when the price of one rises, demand for the other falls because the goods are consumed together."
          }
        ]
      },
      {
        title: "INTERPRETING XED",
        items: [
          {
            type: "mech",
            text: "A <strong>high positive XED</strong> means the goods are close substitutes; consumers easily switch between them, so a rival's price change has a big impact on your sales."
          },
          {
            type: "mech",
            text: "A <strong>high negative XED</strong> means the goods are strong complements; they are consumed jointly, so a price rise in one significantly reduces demand for the other."
          },
          {
            type: "mech",
            text: "An XED close to zero means the goods are <strong>unrelated</strong>; a change in one's price has virtually no effect on demand for the other."
          },
          {
            type: "imp",
            text: "Firms use XED to identify their closest competitors and to set <strong>competitive pricing strategies</strong>; a high positive XED means intense direct competition.",
            tag: "exam"
          },
          {
            type: "link",
            text: "XED links to market structure; goods with many close substitutes (high positive XED) tend to exist in competitive markets with elastic demand."
          }
        ]
      }
    ],
    formulas: [
      {
        label: "XED",
        text: "XED = % change in quantity demanded of good A \u00f7 % change in price of good B"
      }
    ],
    flow: {
      steps: ["Price of good B changes", "Check XED sign", "Predict demand for good A"],
      result: "Positive XED: substitutes; Negative XED: complements",
      resultType: "good"
    },
    examMatters: "Examiners want you to interpret the sign and size of XED in context. State whether goods are substitutes or complements, explain the strength of the relationship, and link it to the firm's pricing or marketing strategy.",
    misconception: "Students confuse XED with PED. Wrong because PED measures responsiveness to a change in the good's own price, while XED measures responsiveness to a change in another good's price. Instead write: PED looks at how demand responds to its own price; XED looks at how demand responds to a related good's price.",
    takeaway: [
      "XED sign reveals the relationship: positive means substitutes, negative means complements, zero means unrelated.",
      "The larger the absolute XED value, the stronger the connection between the two goods.",
      "Firms monitor XED to anticipate how competitors' pricing decisions will affect their own demand."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 6: Significance of Elasticities
   * ───────────────────────────────────────────────── */
  {
    title: "Significance of Elasticities",
    meta: "4 concepts",
    keyIdea: "Elasticity is not just a classroom calculation; it is the practical tool that businesses use to set prices, governments use to design taxes, and economists use to predict market outcomes.",
    blocks: [
      {
        title: "FOR BUSINESSES",
        items: [
          {
            type: "mech",
            text: "A firm with <strong>inelastic demand</strong> can raise prices to increase total revenue, because the percentage fall in quantity demanded is smaller than the percentage rise in price."
          },
          {
            type: "mech",
            text: "A firm facing <strong>elastic demand</strong> should lower prices or add value to increase sales volume, because customers are highly sensitive to price changes."
          },
          {
            type: "imp",
            text: "YED helps firms plan for the <strong>economic cycle</strong>; luxury brands should build cash reserves during booms to survive the demand collapse during recessions.",
            tag: "exam"
          },
          {
            type: "imp",
            text: "XED helps firms predict the impact of <strong>competitor actions</strong>; if your product has a high positive XED with a rival, their price cut will significantly damage your sales."
          }
        ]
      },
      {
        title: "FOR GOVERNMENT",
        items: [
          {
            type: "mech",
            text: "Governments tax goods with <strong>inelastic demand</strong> (alcohol, tobacco, petrol) because revenue is maximised and demand falls relatively little."
          },
          {
            type: "mech",
            text: "Subsidies are most effective at boosting consumption when demand is <strong>elastic</strong>, because the price reduction leads to a proportionally larger increase in quantity."
          },
          {
            type: "imp",
            text: "The <strong>incidence of a tax</strong> depends on PED; when demand is inelastic, consumers bear most of the tax burden because they cannot easily reduce consumption.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Elasticity concepts link to government intervention policies in later units; understanding PED is essential for evaluating whether taxes, subsidies, or regulations will achieve their intended outcomes."
          }
        ]
      }
    ],
    flow: {
      steps: ["Calculate elasticity", "Identify elastic or inelastic", "Choose optimal strategy"],
      result: "Better pricing, tax, and subsidy decisions",
      resultType: "good"
    },
    examMatters: "Examiners love evaluation questions that ask you to assess the usefulness of elasticity to firms or governments. Always acknowledge that elasticity values change over time and depend on the accuracy of data, so firms should treat them as guides, not guarantees.",
    misconception: "Students treat elasticity as a fixed number that never changes. Wrong because elasticity varies with time, the availability of substitutes, and market conditions. Instead write: elasticity is a snapshot that can change as new substitutes emerge, consumer habits shift, or time passes.",
    takeaway: [
      "PED determines whether a price rise boosts or reduces total revenue; it is the foundation of pricing strategy.",
      "Governments use PED to design effective taxes and subsidies; inelastic goods generate the most tax revenue.",
      "All elasticities change over time, so firms and governments must continuously update their estimates."
    ]
  }

];


/* ═══════════════════════════════════════════════════════════════
 *  1.3.3 — SUPPLY
 *
 *  3 chapters: The Supply Curve, PES,
 *  Short Run vs Long Run
 * ═══════════════════════════════════════════════════════════════ */

const NOTES_133 = [

  /* ─────────────────────────────────────────────────
   *  Chapter 1: The Supply Curve
   * ───────────────────────────────────────────────── */
  {
    title: "The Supply Curve",
    meta: "5 concepts",
    keyIdea: "Just as demand tells the consumer's story, the supply curve tells the producer's: at higher prices, firms are willing to produce more because it becomes profitable to cover higher marginal costs.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Supply</strong> — the quantity of a good that producers are willing and able to offer for sale at a given price in a given time period."
          },
          {
            type: "def",
            text: "<strong>Law of supply</strong> — states that, ceteris paribus, as the price of a good rises, the quantity supplied rises, creating an upward-sloping supply curve.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Movement along the supply curve</strong> — caused only by a change in the good's own price; a rise in price causes an extension, a fall causes a contraction."
          },
          {
            type: "def",
            text: "<strong>Shift of the supply curve</strong> — caused by a change in any non-price factor; the entire curve moves left (decrease in supply) or right (increase in supply)."
          }
        ]
      },
      {
        title: "FACTORS SHIFTING SUPPLY",
        items: [
          {
            type: "mech",
            text: "A fall in <strong>costs of production</strong> (raw materials, wages, rent) shifts supply to the right because firms can now produce the same output more cheaply and profitably."
          },
          {
            type: "mech",
            text: "Improvements in <strong>technology</strong> shift supply to the right by allowing firms to produce more output from the same inputs, lowering the cost per unit."
          },
          {
            type: "mech",
            text: "An increase in <strong>indirect taxes</strong> (e.g., VAT) shifts supply to the left because it raises the cost of production, while a <strong>subsidy</strong> shifts supply to the right."
          },
          {
            type: "mech",
            text: "The entry of <strong>new firms</strong> into a market shifts market supply to the right, while firms leaving the market shifts it to the left."
          },
          {
            type: "imp",
            text: "Just as with demand, you must clearly distinguish between a movement along and a shift of the supply curve; examiners <strong>penalise confusion</strong> between the two.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Supply shifts interact with the demand curve to determine new equilibrium prices and quantities; a rightward shift in supply lowers the equilibrium price, ceteris paribus."
          }
        ]
      }
    ],
    flow: {
      steps: ["Production costs fall", "Supply curve shifts right", "Equilibrium price falls"],
      result: "Consumers benefit from lower prices and higher output",
      resultType: "good"
    },
    examMatters: "Examiners test whether you understand that the supply curve shifts because of non-price factors. Memorise the key shifters: costs of production, technology, taxes and subsidies, number of firms, and natural or external shocks. Always draw the diagram to support your answer.",
    misconception: "Students say a rise in price shifts the supply curve to the right. Wrong because a change in the good's own price causes a movement along the existing supply curve, not a shift. Instead write: a rise in price causes an extension of supply (movement along the curve); only non-price factors like costs, technology, or taxes shift the curve.",
    takeaway: [
      "The law of supply states that higher prices incentivise greater quantity supplied, ceteris paribus.",
      "Only a change in the good's own price causes a movement along the supply curve; everything else shifts it.",
      "Key supply shifters are production costs, technology, taxes/subsidies, and the number of firms in the market."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 2: Price Elasticity of Supply (PES)
   * ───────────────────────────────────────────────── */
  {
    title: "Price Elasticity of Supply",
    meta: "5 concepts",
    keyIdea: "PES reveals how quickly and flexibly producers can respond to a price change; the easier it is to ramp up production, the more elastic supply becomes.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Price elasticity of supply (PES)</strong> — a measure of the responsiveness of quantity supplied to a change in the good's own price; it is always positive because of the direct relationship.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Elastic supply</strong> — when PES > 1, meaning quantity supplied changes by a greater percentage than the price change; producers can respond quickly."
          },
          {
            type: "def",
            text: "<strong>Inelastic supply</strong> — when PES < 1, meaning quantity supplied changes by a smaller percentage than the price change; producers struggle to adjust output rapidly."
          }
        ]
      },
      {
        title: "DETERMINANTS OF PES",
        items: [
          {
            type: "mech",
            text: "<strong>Spare capacity</strong> is the most important factor; if a firm has unused machinery and factory space, it can increase output quickly, making supply elastic."
          },
          {
            type: "mech",
            text: "<strong>Availability of stocks</strong> allows firms to meet sudden increases in demand from existing inventory without needing to produce more immediately."
          },
          {
            type: "mech",
            text: "The <strong>time period</strong> matters greatly; supply is more inelastic in the short run when firms cannot easily expand capacity, and more elastic in the long run when they can build new factories and hire workers."
          },
          {
            type: "mech",
            text: "The <strong>mobility of factors of production</strong> affects PES; if workers and capital can be easily redeployed from one industry to another, supply becomes more elastic."
          },
          {
            type: "imp",
            text: "Agricultural goods often have highly <strong>inelastic supply</strong> because crops take months to grow; even if prices soar, farmers cannot instantly increase output.",
            tag: "exam"
          },
          {
            type: "link",
            text: "PES links to the incidence of taxation; when supply is inelastic, producers bear more of the tax burden because they cannot easily reduce output."
          }
        ]
      }
    ],
    formulas: [
      {
        label: "PES",
        text: "PES = % change in quantity supplied \u00f7 % change in price"
      }
    ],
    flow: {
      steps: ["Price rises", "Firm checks spare capacity", "Adjusts output accordingly"],
      result: "Elastic supply: large output increase; Inelastic supply: small increase",
      resultType: "good"
    },
    examMatters: "Examiners expect you to explain why PES differs between industries and time periods. Always link your answer to specific determinants: spare capacity, stocks, time, and factor mobility. Agricultural supply and manufactured goods are favourite exam examples.",
    misconception: "Students confuse PES with PED and write that PES is negative. Wrong because PES is always positive since price and quantity supplied move in the same direction. Instead write: PES is always positive due to the direct relationship between price and quantity supplied; unlike PED, it does not carry a negative sign.",
    takeaway: [
      "PES is always positive and measures how quickly producers can respond to price changes.",
      "Spare capacity and time are the two most important determinants of PES.",
      "Agricultural supply tends to be inelastic in the short run; manufactured goods are more elastic due to stockholding and flexible production."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 3: Short Run vs Long Run
   * ───────────────────────────────────────────────── */
  {
    title: "Short Run vs Long Run",
    meta: "4 concepts",
    keyIdea: "Time changes everything in economics; in the short run at least one factor is fixed and returns diminish, but in the long run all factors are variable and firms can scale up or down completely.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Short run</strong> — the time period in which at least one factor of production is fixed, typically capital; firms can only increase output by adding more variable factors like labour."
          },
          {
            type: "def",
            text: "<strong>Long run</strong> — the time period in which all factors of production are variable; firms can change the scale of production by building new factories, buying new machinery, or entering new markets.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Law of diminishing returns</strong> — in the short run, as more units of a variable factor are added to a fixed factor, the marginal product of the variable factor eventually decreases."
          }
        ]
      },
      {
        title: "DIMINISHING RETURNS",
        items: [
          {
            type: "mech",
            text: "Initially, adding workers to a fixed factory increases output rapidly due to <strong>specialisation</strong>, but eventually the workspace becomes crowded and each extra worker adds less."
          },
          {
            type: "mech",
            text: "Diminishing returns cause <strong>marginal costs to rise</strong> in the short run, which explains why the short-run supply curve slopes upward; producing more becomes progressively more expensive."
          },
          {
            type: "imp",
            text: "Diminishing returns is a <strong>short-run concept only</strong>; it disappears in the long run when the fixed factor can be increased.",
            tag: "exam"
          }
        ]
      },
      {
        title: "RETURNS TO SCALE",
        items: [
          {
            type: "mech",
            text: "<strong>Increasing returns to scale</strong> occur when a proportional increase in all inputs leads to a more than proportional increase in output, often due to economies of scale."
          },
          {
            type: "mech",
            text: "<strong>Decreasing returns to scale</strong> occur when increasing all inputs leads to a less than proportional increase in output, often due to coordination problems in very large firms."
          },
          {
            type: "mech",
            text: "<strong>Constant returns to scale</strong> occur when a proportional increase in all inputs leads to exactly the same proportional increase in output."
          },
          {
            type: "imp",
            text: "Returns to scale is a <strong>long-run concept</strong> because it requires all factors to be variable; do not confuse it with diminishing returns, which is short-run.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Returns to scale link to economies of scale; increasing returns to scale are the production-side explanation for why average costs fall as firms grow."
          }
        ]
      }
    ],
    flow: {
      steps: ["Fixed factor limits expansion", "Adding variable factor hits diminishing returns", "Costs rise in the short run"],
      result: "Long-run adjustment removes the constraint and allows full scaling",
      resultType: "good"
    },
    examMatters: "Examiners frequently test whether you can distinguish diminishing returns (short run, one fixed factor) from returns to scale (long run, all factors variable). Mixing them up is one of the most common errors and will cost you marks.",
    misconception: "Students say diminishing returns means total output falls. Wrong because diminishing returns means marginal output (the extra output from one more unit) falls, while total output can still be increasing, just at a slower rate. Instead write: diminishing returns means each additional unit of the variable factor adds less to total output than the previous unit, but total output continues to rise until marginal product becomes negative.",
    takeaway: [
      "The short run has at least one fixed factor; the long run has all factors variable.",
      "Diminishing returns is a short-run law that explains rising marginal costs; it does not mean total output falls.",
      "Returns to scale is a long-run concept describing what happens when all inputs increase proportionally."
    ]
  }

];


/* ═══════════════════════════════════════════════════════════════
 *  RUNNER — push rich notes for all three sections to Supabase
 * ═══════════════════════════════════════════════════════════════ */

async function pushSection(sectionId, notes, label) {
  console.log(`\n--- ${label} ---`);
  console.log(`  Section ID: ${sectionId}`);
  console.log(`  Chapters:   ${notes.length}`);

  const totalBlocks = notes.reduce((sum, ch) => sum + ch.blocks.length, 0);
  const totalItems = notes.reduce((sum, ch) =>
    sum + ch.blocks.reduce((s, b) => s + b.items.length, 0), 0);

  console.log(`  Blocks:     ${totalBlocks}`);
  console.log(`  Items:      ${totalItems}`);

  const { error } = await supabase
    .from('section_notes')
    .update({ data: notes })
    .eq('section_id', sectionId);

  if (error) {
    console.error(`  FAILED: ${error.message}`);
    return false;
  }

  console.log('  SUCCESS — notes pushed.');

  /* Verify */
  const { data, error: readErr } = await supabase
    .from('section_notes')
    .select('section_id, data')
    .eq('section_id', sectionId)
    .single();

  if (readErr) {
    console.warn(`  Could not verify: ${readErr.message}`);
  } else if (data?.data?.length === notes.length) {
    console.log(`  VERIFIED — ${data.data.length} chapters stored.`);
  } else {
    console.warn(`  Verification mismatch: expected ${notes.length}, got ${data?.data?.length ?? 0}.`);
  }

  return true;
}

async function main() {
  console.log('═══════════════════════════════════════════════');
  console.log('  Economics Unit 1 — Rich Notes (Part 1)');
  console.log('  Sections: 1.3.1, 1.3.2, 1.3.3');
  console.log('═══════════════════════════════════════════════');

  const results = await Promise.all([
    pushSection('introductory-concepts',      NOTES_131, '1.3.1 Introductory Concepts'),
    pushSection('consumer-behaviour-demand',   NOTES_132, '1.3.2 Consumer Behaviour & Demand'),
    pushSection('supply',                      NOTES_133, '1.3.3 Supply'),
  ]);

  const allOk = results.every(Boolean);

  console.log('\n═══════════════════════════════════════════════');
  if (allOk) {
    console.log('  ALL 3 SECTIONS UPDATED SUCCESSFULLY');
  } else {
    console.log('  SOME SECTIONS FAILED — check logs above');
    process.exit(1);
  }
  console.log('═══════════════════════════════════════════════');
}

main();
