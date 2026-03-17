import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://trweeckuswgkenckeqfb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);

/* ──────────────────────────────────────────────
   1.3.1  Introductory Concepts
   New structured-section format (sections[], takeaway[])
   ────────────────────────────────────────────── */

const CONTENT = [

  /* ═══ Block 1: The Nature of Economics ═══ */
  {
    title: "The Nature of Economics",
    sections: [
      {
        id: "economics-as-a-social-science",
        title: "Economics as a Social Science",
        keyIdea: "Economics studies messy, unpredictable human behaviour — not physical laws — so it relies on simplified models and assumptions to make sense of the world.",
        body: [
          {
            type: "paragraph",
            text: "**Economics** is classified as a **social science** because it studies how individuals, firms and governments decide what to produce, how to produce it, and who gets the output. Unlike physics or chemistry, the \"particles\" being studied — people — have opinions, biases and emotions that change over time."
          },
          {
            type: "paragraph",
            text: "Because you cannot run controlled lab experiments on an entire economy, economists build **models** — simplified representations of reality that isolate the relationship you care about. Every model rests on **assumptions**, the most important being **ceteris paribus** (\"all other things being equal\"), which lets you change one variable while holding everything else constant."
          },
          {
            type: "subheading",
            text: "Two Branches"
          },
          {
            type: "flow",
            steps: ["Microeconomics (individual markets)", "Macroeconomics (the whole economy)"],
            result: "Same underlying logic — scarcity forcing choices",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "**Microeconomics** zooms in on individual consumers, firms and markets — think demand curves and pricing. **Macroeconomics** zooms out to GDP, inflation, unemployment and government policy. Both branches start from the same root: resources are scarce, so every choice has a cost."
          }
        ],
        realExample: {
          emoji: "🔬",
          text: "When the **Bank of England** modelled the impact of Brexit on UK GDP, it assumed ceteris paribus on trade deals, migration and business investment. The model was useful but imperfect — exactly because economics cannot run a controlled experiment on a real economy."
        },
        misconception: "Students often write \"economics is not a real science because it cannot predict the future.\" That misunderstands the purpose — economics builds models to explain patterns and trade-offs, not to forecast like a weather app. Instead write: economics is a social science that uses models and ceteris paribus to study complex human behaviour.",
        examMatters: "When asked why economics is a social science, examiners want three things: it studies human behaviour (not physical laws), it uses models based on simplifying assumptions, and it relies on ceteris paribus to isolate variables. Explain *why* each matters, do not just list them."
      },
      {
        id: "positive-and-normative",
        title: "Positive and Normative Economics",
        keyIdea: "Positive statements describe \"what is\" and can be tested with data; normative statements express \"what ought to be\" and rest on value judgements no dataset can settle.",
        body: [
          {
            type: "paragraph",
            text: "\"UK unemployment rose by 2% last year\" — you can check that against ONS data. \"Unemployment is too high\" — who decides what counts as *too high*? The first is a **positive statement**, the second is a **normative statement**."
          },
          {
            type: "flow",
            steps: ["Factual claim", "Can be tested with evidence"],
            result: "Positive statement",
            resultType: "neutral"
          },
          {
            type: "flow",
            steps: ["Contains a value judgement", "Cannot be settled by data alone"],
            result: "Normative statement",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "Normative statements almost always contain giveaway language: *should*, *ought to*, *better*, *fairer*, *too much*. The tricky part is that the line blurs in practice. \"Inequality has increased\" is positive (measure the Gini coefficient). \"Inequality is a problem\" is normative — that is an opinion about what matters."
          }
        ],
        realExample: {
          emoji: "📊",
          text: "Two economists can look at identical **NHS** waiting-time data. One says \"the NHS needs more funding\" (normative — based on a belief in universal healthcare). The other says \"private provision would reduce waits\" (also normative). The data is positive; the policy recommendation is where values enter."
        },
        misconception: "Students confuse \"positive\" with \"good\" and \"normative\" with \"bad.\" Positive simply means testable — \"smoking causes cancer\" is positive, true, and testable, but nobody would call it \"good.\" Instead write: positive = can be tested with evidence; normative = involves a value judgement.",
        examMatters: "Every *evaluate* question you face involves normative judgement — two economists can recommend opposite policies from identical data. What earns marks is the quality of your reasoning and the evidence you cite, not which side you pick."
      }
    ],
    takeaway: [
      "Economics is a social science that uses models and **ceteris paribus** to study complex human behaviour.",
      "Positive statements can be tested with evidence; normative statements involve value judgements.",
      "Every policy recommendation blends positive analysis with normative values — learn to spot where the facts end and the opinions begin."
    ]
  },

  /* ═══ Block 2: Scarcity, Choice and Opportunity Cost ═══ */
  {
    title: "Scarcity, Choice and Opportunity Cost",
    sections: [
      {
        id: "the-basic-economic-problem",
        title: "The Basic Economic Problem",
        keyIdea: "Human wants are unlimited but the resources to satisfy them are finite — this mismatch is scarcity, and it forces every household, firm and government to choose.",
        body: [
          {
            type: "paragraph",
            text: "The **basic economic problem** is that **wants are unlimited** but the **resources** (land, labour, capital, enterprise) available to satisfy them are **finite**. No matter how wealthy a country becomes, it still faces scarcity — even Singapore, with a GDP per capita above $80,000, cannot give every citizen everything they want."
          },
          {
            type: "paragraph",
            text: "Scarcity forces three fundamental questions: **What** to produce? **How** to produce it? **For whom** to produce? Every economic system — whether market, command or mixed — is an attempt to answer these questions."
          },
          {
            type: "flow",
            steps: ["Unlimited wants", "Finite resources", "Scarcity"],
            result: "Choices must be made",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "Notice that scarcity is not the same as shortage. A **shortage** is temporary — it can be fixed by producing more or raising the price. **Scarcity** is permanent — it exists because human desires always outpace available resources."
          }
        ],
        realExample: {
          emoji: "🇸🇦",
          text: "**Saudi Arabia** has enormous oil wealth, yet still faces scarcity. The government must choose between investing in NEOM (a $500bn future city), funding healthcare, or diversifying away from oil. Choosing NEOM means those billions cannot simultaneously fund other projects."
        },
        misconception: "Students write \"scarcity means there is not enough of something.\" That is too vague — it confuses scarcity with shortage. Instead write: scarcity is the permanent condition where unlimited human wants exceed finite resources, forcing every agent to make choices.",
        examMatters: "Examiners test whether you understand scarcity as a *permanent* condition, not a temporary shortage. Always link scarcity → choice → opportunity cost as a chain. A 2-mark definition must include \"unlimited wants\" and \"finite resources.\""
      },
      {
        id: "opportunity-cost",
        title: "Opportunity Cost",
        keyIdea: "Every choice has a hidden price tag — opportunity cost is the value of the next-best alternative you gave up when you made your decision.",
        body: [
          {
            type: "paragraph",
            text: "**Opportunity cost** is the benefit of the **next-best alternative forgone** when a choice is made. It is not the money cost — it is what you could have had instead. If you spend Saturday revising economics, your opportunity cost might be the football match you missed."
          },
          {
            type: "paragraph",
            text: "Opportunity cost applies to every economic agent. A **consumer** choosing a holiday over a new laptop. A **firm** investing in R&D instead of marketing. A **government** spending on defence rather than education. In each case, the true cost is not just money spent — it is the benefit of the road not taken."
          },
          {
            type: "flow",
            steps: ["Make a choice", "Give up the next-best alternative"],
            result: "Opportunity cost incurred",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "Opportunity cost is only ever the *next-best* alternative, not all the alternatives combined. If you choose A over B, C and D, the opportunity cost is only B (assuming B was your second choice), not B + C + D."
          }
        ],
        realExample: {
          emoji: "🇬🇧",
          text: "When the **UK government** committed £100bn to the HS2 rail project, the opportunity cost was not just £100bn — it was the hospitals, schools or tax cuts that money could have funded instead. Critics argued the NHS would have been a better use."
        },
        misconception: "Students list every possible alternative as the opportunity cost. That is wrong — opportunity cost is only the *next-best* alternative forgone, not a list of everything you could have done. Instead write: the opportunity cost of choosing X is the single best alternative (Y) that was sacrificed.",
        examMatters: "Opportunity cost appears in almost every economics paper. Examiners award marks for: (1) stating it is the *next-best* alternative, (2) applying it to the specific context in the question, and (3) explaining why it matters for resource allocation."
      }
    ],
    takeaway: [
      "Scarcity is permanent — unlimited wants exceed finite resources, forcing every agent to choose.",
      "Opportunity cost is the next-best alternative forgone, not all alternatives or the money cost.",
      "Always link the chain: scarcity → choice → opportunity cost — examiners expect this logic in every answer."
    ]
  },

  /* ═══ Block 3: Production Possibility Frontiers ═══ */
  {
    title: "Production Possibility Frontiers",
    sections: [
      {
        id: "the-ppf-model",
        title: "The PPF Model",
        keyIdea: "A PPF shows the maximum combinations of two goods an economy can produce — points on the curve are efficient, inside means wasted resources, outside is currently impossible.",
        body: [
          {
            type: "paragraph",
            text: "The **production possibility frontier** (PPF) is a curve showing all the maximum possible combinations of two goods an economy can produce when it uses all its resources fully and efficiently. It is one of the most important models in the entire syllabus."
          },
          {
            type: "subheading",
            text: "Three Key Positions"
          },
          {
            type: "bullets",
            items: [
              "**On the curve** — productively efficient: all resources are fully employed and used in their best combination.",
              "**Inside the curve** — inefficient: resources are unemployed or misallocated. The economy could produce more of both goods.",
              "**Outside the curve** — currently unattainable with existing resources and technology."
            ]
          },
          {
            type: "paragraph",
            text: "The **slope** (gradient) of the PPF represents the **opportunity cost** of producing one more unit of Good A in terms of Good B. A straight-line PPF means constant opportunity cost; a bowed-out (concave) PPF means *increasing* opportunity cost — which is the more realistic case, because not all resources are equally suited to producing both goods."
          }
        ],
        realExample: {
          emoji: "🇨🇳",
          text: "**China** in 1990 operated well inside its PPF — millions of workers were in low-productivity agriculture. By shifting labour into manufacturing and investing in capital, China moved closer to its frontier, producing dramatically more industrial goods without sacrificing proportional farm output."
        },
        misconception: "Students say \"a point inside the PPF means the country is poor.\" That is misleading — it means resources are being wasted or left unemployed, regardless of how wealthy the country is. Instead write: a point inside the PPF indicates productive inefficiency — the economy could increase output of both goods without needing more resources.",
        examMatters: "PPF questions often ask you to *illustrate* a concept on a diagram. Practise drawing a labelled PPF and marking: a point on the curve (efficient), inside (inefficient), outside (unattainable). Examiners penalise unlabelled axes."
      },
      {
        id: "shifts-of-the-ppf",
        title: "Shifts of the PPF",
        keyIdea: "When an economy gains more or better resources the entire PPF shifts outward — this is economic growth; losing resources shifts it inward.",
        body: [
          {
            type: "paragraph",
            text: "An **outward shift** of the PPF means the economy can now produce more of *both* goods. This represents **economic growth** — caused by increases in the quantity or quality of resources: more workers, better technology, new natural resource discoveries, or more capital investment."
          },
          {
            type: "flow",
            steps: ["Investment in education/technology", "Labour productivity rises", "PPF shifts outward"],
            result: "Potential output increases (economic growth)",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "An **inward shift** means the economy's productive capacity has fallen — perhaps due to a natural disaster, war, or depletion of resources. A shift along *one axis only* (a pivoted shift) means growth in one sector but not the other — for example, a technology breakthrough in manufacturing but not agriculture."
          },
          {
            type: "paragraph",
            text: "Moving from a point *inside* the PPF *to* the frontier is **not** economic growth — it is simply better use of existing resources (reducing unemployment or improving efficiency). True growth means the frontier itself moves outward."
          }
        ],
        realExample: {
          emoji: "🇰🇷",
          text: "**South Korea** shifted its PPF dramatically outward between 1960 and 2000 through massive investment in education and technology. GDP per capita rose from under $1,000 to over $10,000 — a textbook example of long-run economic growth driven by human capital."
        },
        misconception: "Students confuse moving to the PPF with shifting the PPF. Moving from inside the curve to the curve means you are using existing resources better (reducing inefficiency). Only when the curve itself shifts outward is there true economic growth. Instead write: economic growth = an outward shift of the PPF, not merely reaching it.",
        examMatters: "Examiners frequently test the difference between a *movement along* the PPF (reallocation, showing opportunity cost) and a *shift of* the PPF (growth or decline). Always state which one you mean and explain the cause."
      }
    ],
    takeaway: [
      "The PPF shows maximum output combinations — on = efficient, inside = waste, outside = unattainable.",
      "The slope of the PPF represents opportunity cost; a bowed-out curve means increasing opportunity cost.",
      "Outward shift = economic growth (more/better resources); moving to the curve = better use of existing resources.",
      "Always label axes, mark the point, and explain whether the curve shifts or the point moves."
    ]
  },

  /* ═══ Block 4: Specialisation, Division of Labour and Exchange ═══ */
  {
    title: "Specialisation, Division of Labour and Exchange",
    sections: [
      {
        id: "specialisation-and-division-of-labour",
        title: "Specialisation and Division of Labour",
        keyIdea: "When workers, firms or countries focus on what they do best and then trade, total output rises — but over-specialisation creates vulnerability.",
        body: [
          {
            type: "paragraph",
            text: "**Specialisation** means concentrating on producing a narrow range of goods or services. It can happen at the level of the worker (a surgeon performs only surgery), the firm (Toyota makes cars), the region (Silicon Valley focuses on tech), or the country (Saudi Arabia exports oil)."
          },
          {
            type: "paragraph",
            text: "**Division of labour** — splitting a production process into separate tasks, each performed by a different worker — is how specialisation works inside a firm. Adam Smith's famous **pin factory** example showed that 10 workers specialising could produce 48,000 pins a day, versus just 10 if each worked alone."
          },
          {
            type: "subheading",
            text: "Benefits and Risks"
          },
          {
            type: "flow",
            steps: ["Workers specialise", "Skills improve + time saved", "Productivity rises"],
            result: "Higher output per worker",
            resultType: "good"
          },
          {
            type: "bullets",
            items: [
              "**Benefits**: higher productivity, economies of scale, lower unit costs, higher quality through practice.",
              "**Risks**: monotony and demotivation, structural unemployment if demand shifts, over-dependence on one product or market."
            ]
          }
        ],
        realExample: {
          emoji: "🏭",
          text: "**Foxconn** in Shenzhen, China, uses extreme division of labour to assemble iPhones — each worker performs one tiny task repeatedly. Output is enormous, but the factory has faced criticism for worker monotony and poor conditions — a textbook trade-off of specialisation."
        },
        misconception: "Students write \"specialisation is always good because it increases output.\" That ignores the risks. Instead write: specialisation raises productivity and lowers costs, but creates risks of monotony, over-dependence, and structural unemployment if demand changes.",
        examMatters: "When asked to *evaluate* specialisation, examiners want both sides. Start with the benefits (productivity, efficiency) and then counter with the risks (dependence, monotony). Use a real example to anchor each side."
      },
      {
        id: "money-and-exchange",
        title: "Money and Exchange",
        keyIdea: "Barter fails because it needs a double coincidence of wants — money solves this by acting as a medium of exchange, store of value, and unit of account.",
        body: [
          {
            type: "paragraph",
            text: "In a **barter system**, you can only trade if each person wants exactly what the other has — this is the **double coincidence of wants**. A farmer with wheat who needs shoes must find a cobbler who happens to want wheat. This is hopelessly inefficient once an economy has more than a handful of goods."
          },
          {
            type: "flow",
            steps: ["Barter requires double coincidence", "Very difficult to arrange", "Limits trade and specialisation"],
            result: "Economy stays small and inefficient",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "**Money** solves this by performing four functions: a **medium of exchange** (accepted by everyone), a **store of value** (you can save it for later), a **unit of account** (prices can be compared), and a **standard of deferred payment** (you can agree to pay in the future). Without money, large-scale specialisation and trade would be impossible."
          }
        ],
        realExample: {
          emoji: "🇿🇼",
          text: "When **Zimbabwe** experienced hyperinflation in 2008 (prices doubling every 24 hours), its currency lost all four functions. People reverted to barter or used US dollars and South African rand instead — proving that money only works when people trust it."
        },
        misconception: "Students say \"money is valuable because the government says so.\" That is only partly true — money works because people *trust* it will be accepted by others. When trust collapses (as in Zimbabwe's hyperinflation), the currency becomes worthless regardless of what the government declares. Instead write: money functions as a medium of exchange only as long as it retains public confidence.",
        examMatters: "A common short-answer question asks you to explain the four functions of money. List all four with a one-line explanation for each. Then link back to specialisation — money enables trade, which enables specialisation, which raises output."
      }
    ],
    takeaway: [
      "Specialisation raises productivity but creates risks of over-dependence and structural unemployment.",
      "Division of labour splits production into tasks — Adam Smith's pin factory is the classic example.",
      "Money replaces barter by solving the double coincidence of wants, enabling large-scale trade and specialisation."
    ]
  },

  /* ═══ Block 5: Economic Systems ═══ */
  {
    title: "Economic Systems",
    sections: [
      {
        id: "free-market-command-and-mixed",
        title: "Free Market, Command and Mixed Economies",
        keyIdea: "Every economy must answer what, how and for whom to produce — the three systems (market, command, mixed) are different ways of answering these questions.",
        body: [
          {
            type: "paragraph",
            text: "In a **free market economy**, resources are allocated by the **price mechanism** — no central authority decides what to produce. Consumers signal their wants through demand, and firms respond because they want profit. Prices rise when goods are scarce and fall when they are abundant."
          },
          {
            type: "paragraph",
            text: "In a **command (planned) economy**, the **state** decides what to produce, how to produce it, and who gets the output. Central planners set production targets and distribute goods. The advantage is that the government can pursue equality and public goods; the disadvantage is that planners lack the information prices provide, leading to inefficiency and shortages."
          },
          {
            type: "paragraph",
            text: "In practice, every real economy is a **mixed economy** — combining market forces with some government intervention. The UK, Singapore, and the UAE are all mixed economies, but the *degree* of state involvement varies significantly."
          },
          {
            type: "subheading",
            text: "Comparing Systems"
          },
          {
            type: "bullets",
            items: [
              "**Free market**: efficient allocation via prices, but can produce inequality and market failure.",
              "**Command**: can pursue equity and public goods, but suffers from information problems and inefficiency.",
              "**Mixed**: balances market efficiency with government correction, but risks government failure."
            ]
          }
        ],
        realExample: {
          emoji: "🇰🇵",
          text: "**North Korea** is the closest real example to a command economy — the state controls nearly all production. Meanwhile, **South Korea** operates as a mixed economy with strong market forces. The GDP per capita gap (South Korea ~$35,000 vs North Korea ~$1,800) illustrates the efficiency costs of central planning."
        },
        misconception: "Students write \"the UK is a free market economy.\" It is not — the UK is a mixed economy with significant government intervention (NHS, state education, regulation, taxation). Instead write: the UK is a mixed economy that relies primarily on the price mechanism but with substantial government provision and regulation.",
        examMatters: "Comparison questions ask you to weigh the strengths and weaknesses of different systems. Always use a specific country example for each system and explain *why* the system leads to that outcome, not just *that* it does."
      },
      {
        id: "the-price-mechanism",
        title: "The Role of the Price Mechanism",
        keyIdea: "Prices do three jobs simultaneously — they signal information about scarcity, incentivise producers and consumers to change behaviour, and ration limited goods to those willing to pay.",
        body: [
          {
            type: "paragraph",
            text: "The **price mechanism** is the process by which changes in price allocate scarce resources in a market economy. It works through three interconnected functions: **signalling**, **incentivising**, and **rationing**."
          },
          {
            type: "subheading",
            text: "Three Functions of Prices"
          },
          {
            type: "flow",
            steps: ["Demand rises", "Price rises (signal)", "Producers expand supply (incentive)"],
            result: "Only willing buyers get the good (ration)",
            resultType: "good"
          },
          {
            type: "bullets",
            items: [
              "**Signalling**: a rising price tells producers that consumers want more of a good; a falling price signals the opposite.",
              "**Incentivising**: higher prices attract new firms into a market (profit motive); lower prices push firms out.",
              "**Rationing**: when a good is scarce, a higher price ensures only those who value it most (and can afford it) will buy."
            ]
          },
          {
            type: "paragraph",
            text: "Adam Smith called this the **\"invisible hand\"** — the idea that individuals pursuing their own self-interest unintentionally promote the well-being of society. No central planner is needed; prices coordinate millions of decisions automatically."
          }
        ],
        realExample: {
          emoji: "⛽",
          text: "When global oil prices spiked in 2022 after Russia's invasion of Ukraine, the price mechanism worked in all three ways: high prices *signalled* scarcity, *incentivised* US shale producers to ramp up drilling, and *rationed* fuel to consumers who cut back on non-essential driving."
        },
        misconception: "Students say \"the invisible hand means the market always produces the best outcome.\" That ignores market failure — externalities, public goods and information problems mean the price mechanism can produce socially harmful results. Instead write: the invisible hand allocates resources efficiently in many cases, but market failure means government intervention is sometimes needed.",
        examMatters: "When asked about the price mechanism, always explain all three functions (signal, incentive, ration) and use a real-world example to show each in action. A 6-mark answer that names all three with examples will score full marks."
      }
    ],
    takeaway: [
      "Free market economies use prices to allocate resources; command economies use state planning; mixed economies combine both.",
      "The price mechanism works through three functions: signalling, incentivising and rationing.",
      "Adam Smith's invisible hand explains how self-interest can coordinate an economy — but market failure means it does not always work.",
      "Every real economy is mixed — the question is always *how much* government intervention, not whether to have any."
    ]
  }

];

async function run() {
  const sc = CONTENT.reduce((s, b) => s + (b.sections?.length || 0), 0);
  console.log(`Updating introductory-concepts: ${CONTENT.length} blocks, ${sc} sections\n`);

  const { error } = await supabase
    .from('section_content')
    .update({ data: CONTENT })
    .eq('section_id', 'introductory-concepts');

  if (error) console.log(`  ✗ ${error.message}`);
  else console.log(`  ✓ introductory-concepts updated successfully`);
}

run();
