import { supabase } from './_db.mjs';

/* ═══════════════════════════════════════════════════════════
 *  REVVY LEARN — CONTENT REFORMAT WITH RICH VISUAL ELEMENTS
 *  Unit 1, Part A: Introductory Concepts + Consumer Behaviour & Demand
 *
 *  HTML patterns used:
 *  - key-idea      → FIRST point in FIRST concept of EVERY block
 *  - take-away     → LAST point in LAST concept of EVERY block
 *  - flow-chain    → cause→effect chains where applicable
 *  - so-what       → exam relevance, 1 per block near end
 *  - watch-out     → common misconceptions, used sparingly
 *  - section-links → LAST point in LAST concept of LAST block only
 *  - content-subhead → bold label within a concept
 *
 *  Writing Rules Applied:
 *  1. No circular definitions — build intuition first
 *  2. Real specific examples (UK, Singapore, Saudi Arabia, Netherlands, etc.)
 *  3. "So what" — connect to exam application
 *  4. Flowing prose paragraphs (2-3 sentences each point)
 *  5. Contrast and tension — warn about examiner traps
 *  6. Bold key terms on first use with <strong> tags
 *  7. Warm, direct, second-person teacher tone
 * ═══════════════════════════════════════════════════════════ */

const CONTENT = {

'introductory-concepts': [
  // ── Block 0: The Nature of Economics (2 concepts) ──
  {
    title: `The Nature of Economics`,
    concepts: [
      {
        title: `Economics as a Social Science`,
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>Economics is a social science that studies how societies allocate scarce resources — and unlike physics or chemistry, its subject matter is messy, unpredictable human behaviour.</p></div>`,
          `<strong>Economics</strong> is classified as a <strong>social science</strong> because it studies people — how individuals, firms and governments decide what to produce, how to produce it, and who gets the output. Unlike the natural sciences, where you can run controlled lab experiments, economists must observe a constantly shifting world where millions of interconnected decisions happen simultaneously. That is why economists rely on <strong>models</strong>: simplified representations of reality that strip away complexity so you can isolate the relationship you care about.`,
          `Every model rests on <strong>assumptions</strong>. The most important is <strong>ceteris paribus</strong> — Latin for "all other things being equal." When you read "a rise in price reduces quantity demanded, ceteris paribus," you are holding income, tastes, population and every other factor constant so you can see the pure price effect. Think of it as a thought experiment: change one dial, keep the rest fixed. Without ceteris paribus, you could never untangle cause and effect in an economy with billions of moving parts.`,
          `Economics splits into two branches. <strong>Microeconomics</strong> zooms in on individual markets, firms and consumers — it is the supply-and-demand world you will study across Unit 1. <strong>Macroeconomics</strong> zooms out to the whole economy — GDP, inflation, unemployment — which dominates Unit 2. Different scales, same underlying logic of scarcity forcing choices.`
        ],
        examTip: `When a question asks about economics as a social science, emphasise three things: it studies human behaviour (not physical laws), it builds models based on simplifying assumptions, and it uses ceteris paribus to isolate variables. Don't just list these — explain why each is necessary for studying something as complex as a real economy.`
      },
      {
        title: `Positive and Normative Economics`,
        points: [
          `Here is a claim: "UK unemployment rose by 2% last year." You can check that — pull up ONS data and verify it. Now compare: "Unemployment is too high." Who decides what counts as "too high"? No spreadsheet can settle that debate. The first is a <strong>positive statement</strong> — a factual claim that can be tested against evidence, describing "what is." The second is a <strong>normative statement</strong> — a <strong>value judgement</strong> about "what ought to be."`,
          `<div class="flow-chain"><span class="pill blue">Factual claim</span><span class="arrow">→</span><span class="pill blue">Can be tested with data</span><span class="arrow">→</span><span class="pill amber">Positive statement</span></div>`,
          `Normative statements almost always contain giveaway language: <em>should</em>, <em>ought to</em>, <em>better</em>, <em>fairer</em>, <em>too much</em>. "Countries with higher minimum wages have lower youth employment" is positive — compare France and the US and you can test it. "France <em>should</em> raise the minimum wage" is normative — no dataset can resolve a "should." The tricky part is that the line blurs in practice. "Inequality has increased" is positive (measure the Gini coefficient). "Inequality is a problem" is normative (that is an opinion). Examiners love testing whether you can spot this distinction.`,
          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>Every <em>evaluate</em> question involves normative judgement — choosing between efficiency and equity, for instance. Two economists can look at identical data and recommend opposite policies. What earns marks is the quality of your reasoning, not which side you pick.</p></div>`,
          `<div class="take-away"><div class="take-away-label">Take Away</div><p>Economics uses models and ceteris paribus to make sense of complex human behaviour, and every policy recommendation blends positive analysis with normative values — learn to spot where the facts end and the opinions begin.</p></div>`
        ],
        examTip: `Look for opinion-laden language ("should," "ought," "fair," "too much") as your normative giveaway. A common trap: statements that sound factual but contain hidden value judgements — "The NHS is underfunded" implies a judgement about what the right level of funding should be.`
      }
    ]
  },

  // ── Block 1: Scarcity, Choice and Opportunity Cost (3 concepts) ──
  {
    title: `Scarcity, Choice and Opportunity Cost`,
    concepts: [
      {
        title: `The Basic Economic Problem`,
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>Every society faces the same fundamental tension: human wants are unlimited, but the resources available to satisfy them are finite — and that gap is what economics exists to study.</p></div>`,
          `<div class="flow-chain"><span class="pill blue">Unlimited wants</span><span class="arrow">→</span><span class="pill blue">Finite resources</span><span class="arrow">→</span><span class="pill amber">Scarcity</span><span class="arrow">→</span><span class="pill amber">Choices must be made</span></div>`,
          `<strong>Scarcity</strong> is not about being poor — it is a universal condition. Even the wealthiest nations face it. The US government cannot fund unlimited healthcare <em>and</em> unlimited defence <em>and</em> unlimited education simultaneously. The four <strong>factors of production</strong> — land, labour, capital and enterprise — are all finite, and that forces every individual, firm and government to make <strong>choices</strong> about how to allocate them. What should we produce? How should we produce it? Who receives the output? These three questions sit at the heart of every economic system.`
        ]
      },
      {
        title: `Opportunity Cost`,
        points: [
          `Whenever you choose one option, you give up the next best alternative — and that forgone option is the <strong>opportunity cost</strong>. If the UK government commits £50 billion to HS2, the opportunity cost might be 10 new hospitals or a decade of increased education spending — whichever was the <em>next best</em> use of that money. Notice: it is the next best alternative, not all alternatives combined.`,
          `<div class="watch-out"><div class="watch-out-label">Common Mistake</div><p>Students often list every possible alternative instead of identifying the single next best forgone option. Examiners specifically penalise this — opportunity cost is always ONE alternative, the best one you gave up.</p></div>`,
          `Opportunity cost applies at every level of the economy. <strong>Individuals</strong> face it when spending — buying a new phone means not spending that £800 on a holiday. <strong>Firms</strong> face it when investing — building a new warehouse means those funds cannot go toward marketing. <strong>Governments</strong> face it with every budget allocation — every pound spent on defence is a pound less for the NHS.`,
          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>Framing your analysis in terms of opportunity cost instantly elevates its quality. Instead of writing "the government should build more hospitals," write "the opportunity cost of building hospitals is the roads, schools or tax cuts forgone." Examiners reward this kind of economic reasoning.</p></div>`
        ],
        examTip: `Always state opportunity cost as the NEXT BEST alternative forgone, not just any alternative. Use specific, concrete examples: "The opportunity cost of the government spending £10bn on defence is £10bn less for the NHS" is far stronger than "there are opportunity costs involved."`
      },
      {
        title: `Free Goods vs Economic Goods`,
        points: [
          `<strong>Economic goods</strong> are scarce — they have an opportunity cost because resources are used up to produce them. Every car, textbook and hour of healthcare requires inputs that could have been deployed elsewhere. <strong>Free goods</strong>, by contrast, have <strong>no opportunity cost</strong>: they exist in such abundance relative to demand that nobody sacrifices anything to obtain them. Sunlight is the classic example.`,
          `But genuinely free goods are vanishingly rare in practice. Clean air now has an opportunity cost — governments spend billions on pollution controls and green technology to maintain it. Fresh water, once considered free, is increasingly scarce across parts of Sub-Saharan Africa and the Middle East. This blurring is worth flagging in exams when explaining why economics focuses on scarce resources.`,
          `<div class="take-away"><div class="take-away-label">Take Away</div><p>Scarcity forces choices, every choice carries an opportunity cost, and the concept of opportunity cost — always the next best alternative forgone — is the single most important idea in economics.</p></div>`
        ]
      }
    ]
  },

  // ── Block 2: The Production Possibility Frontier (PPF) (4 concepts) ──
  {
    title: `The Production Possibility Frontier (PPF)`,
    concepts: [
      {
        title: `PPF Concept and Shape`,
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>The PPF is a single diagram that illustrates scarcity, opportunity cost, efficiency and economic growth all at once — master it and you have a tool for almost any Unit 1 question.</p></div>`,
          `The <strong>Production Possibility Frontier (PPF)</strong> shows every <strong>maximum possible output</strong> combination of two goods an economy can produce when all resources are <strong>fully and efficiently employed</strong>. Points <strong>on the curve</strong> are <strong>productively efficient</strong> — you cannot make more of one good without sacrificing some of the other. Points <strong>inside the curve</strong> signal wasted resources (unemployment, idle factories, misallocation). Points <strong>outside the curve</strong> are currently <strong>unattainable</strong> with existing technology and resources.`,
          `The PPF is typically drawn as a <strong>concave curve</strong> (bowed outward from the origin), reflecting <strong>increasing opportunity costs</strong>. Why? Resources are not perfectly transferable. The first workers you shift from textiles to computing might be highly adaptable, but eventually you are retraining tailors to code — each additional unit of computing costs progressively more lost textile output. A straight-line PPF implies <strong>constant opportunity costs</strong>, which is rare in reality but sometimes used in simplified models.`,
          `<div class="flow-chain"><span class="pill blue">Resources not perfectly transferable</span><span class="arrow">→</span><span class="pill blue">Increasing marginal cost of switching</span><span class="arrow">→</span><span class="pill amber">Concave (bowed-out) PPF</span></div>`
        ]
      },
      {
        title: `Opportunity Cost on the PPF`,
        points: [
          `Moving <strong>along</strong> the PPF illustrates opportunity cost directly — producing more of one good requires sacrificing some of the other. With a concave PPF, each additional unit costs more than the last (<strong>increasing marginal opportunity cost</strong>) because the resources being transferred become progressively less suitable for the new use.`,
          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>When calculating opportunity cost from a PPF diagram, always express it as a ratio: "the opportunity cost of 1 more unit of Good X is Y units of Good Y forgone." Show your working and be specific about the trade-off — vague statements lose marks.</p></div>`
        ],
        examTip: `When calculating opportunity cost from a PPF, express it as a ratio: "the opportunity cost of 1 more unit of Good X is Y units of Good Y forgone." Always show your working and be specific about the trade-off.`
      },
      {
        title: `Movements Along vs Shifts of the PPF`,
        points: [
          `A <strong>movement along</strong> the PPF happens when an economy <strong>reallocates existing resources</strong> between the two goods — the frontier itself does not change, only the position on it. This represents a change in the <em>composition</em> of output, not the <em>capacity</em>.`,
          `An <strong>outward shift</strong> of the PPF represents <strong>economic growth</strong> — the economy's productive potential increases so it can produce more of everything. Causes include discovery of new resources, better technology, improved education and skills, and sustained capital investment. South Korea's transformation from one of the world's poorest nations to a tech powerhouse is essentially a decades-long outward PPF shift driven by massive investment in education and R&amp;D.`,
          `An <strong>inward shift</strong> means productive capacity has <strong>declined</strong> — caused by war, natural disaster, resource depletion, emigration of skilled workers, or institutional collapse. Syria's economy after 2011 is a stark real-world example.`,
          `<div class="flow-chain"><span class="pill blue">New technology / investment / education</span><span class="arrow">→</span><span class="pill pos">Outward shift of PPF</span><span class="arrow">→</span><span class="pill pos">Economic growth</span></div>`
        ]
      },
      {
        title: `Capital Goods vs Consumer Goods on the PPF`,
        points: [
          `A classic PPF application shows the trade-off between <strong>capital goods</strong> (machinery, factories, infrastructure — used to produce other goods) and <strong>consumer goods</strong> (things for immediate enjoyment — food, clothing, entertainment). Countries that invest heavily in capital goods today sacrifice current consumption but shift their PPF outward faster — they grow more in the future.`,
          `China's extraordinary growth since the 1980s was partly driven by investing over 40% of GDP in capital goods, while countries prioritising consumer goods enjoy higher living standards now but may see slower future growth. This is the fundamental trade-off between <strong>present consumption and future growth</strong>, and developing countries face it starkly: invest for the future or meet pressing needs right now?`,
          `<div class="take-away"><div class="take-away-label">Take Away</div><p>The PPF is your Swiss Army knife for Unit 1 — use it to illustrate scarcity (the boundary), opportunity cost (movement along), efficiency (on vs inside), and growth (outward shifts), and always connect the diagram to the real-world example in your answer.</p></div>`
        ]
      }
    ]
  },

  // ── Block 3: Specialisation and the Functions of Money (3 concepts) ──
  {
    title: `Specialisation and the Functions of Money`,
    concepts: [
      {
        title: `Specialisation and Division of Labour`,
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>Specialisation — where individuals, firms or countries focus on what they do best — is the engine behind rising productivity and international trade, but it creates dependencies that carry real risks.</p></div>`,
          `<strong>Specialisation</strong> means concentrating on producing a narrow range of goods and services rather than trying to be self-sufficient. <strong>Division of labour</strong> breaks the production process into separate tasks, each performed by different workers. <strong>Adam Smith</strong> (1776, <em>The Wealth of Nations</em>) illustrated this with a <strong>pin factory</strong>: one worker doing every step might make 20 pins a day, but ten workers each specialising in one task could produce 48,000.`,
          `<div class="content-subhead">Advantages of Specialisation</div>`,
          `Higher productivity and output, better use of individual skills and talents, <strong>economies of scale</strong>, innovation (specialists notice improvements others would miss), and — crucially — <strong>international trade</strong> when countries specialise in what they produce most efficiently. Bangladesh specialises in garment manufacturing, Switzerland in financial services, Saudi Arabia in oil extraction. This raises global output and widens consumer choice.`,
          `<div class="content-subhead">Disadvantages of Specialisation</div>`,
          `Work becomes monotonous and repetitive — Henry Ford's assembly line workers famously suffered from this. <strong>Structural unemployment</strong> emerges if demand for a specialised skill disappears (think coal miners in Northern England). Over-dependence on other producers creates fragility — the COVID-19 pandemic exposed how quickly global supply chains can fracture. And a highly specialised worker may struggle to find alternative employment if their niche contracts.`
        ]
      },
      {
        title: `The Functions of Money`,
        points: [
          `Without money, exchange requires <strong>barter</strong> — directly swapping goods. The fatal flaw: barter needs a <strong>double coincidence of wants</strong> (the surgeon who needs bread must find a baker who needs surgery). In a specialised economy with thousands of products, this is wildly impractical.`,
          `<div class="flow-chain"><span class="pill blue">Specialisation</span><span class="arrow">→</span><span class="pill blue">Need to trade</span><span class="arrow">→</span><span class="pill neg">Barter fails (double coincidence)</span><span class="arrow">→</span><span class="pill amber">Money solves the problem</span></div>`,
          `Money serves four functions. <strong>Medium of exchange</strong>: universally accepted in transactions, eliminating the double coincidence problem. <strong>Store of value</strong>: you can save and spend later, though inflation erodes this — hyperinflation in Zimbabwe and Venezuela destroyed money's ability to hold value. <strong>Unit of account</strong>: a common measure to express and compare prices — try comparing the value of a haircut to a laptop without one. <strong>Standard of deferred payment</strong>: enables loans, contracts and credit, because both parties trust the future value of money.`
        ]
      },
      {
        title: `The Role of Financial Markets`,
        points: [
          `<strong>Financial markets</strong> channel funds from <strong>savers</strong> (households and firms with surplus income) to <strong>borrowers</strong> (firms needing investment capital, households buying homes, governments funding spending). When you deposit money in a bank, it gets lent to a business expanding its factory — your saving becomes someone else's investment.`,
          `Key institutions include <strong>banks</strong> (deposit-taking and lending), <strong>stock markets</strong> (raising equity capital through share sales), <strong>bond markets</strong> (raising debt capital), and <strong>insurance markets</strong> (enabling risk management). Together they promote <strong>efficient resource allocation</strong> by directing funds toward their most productive uses. Countries with well-developed financial systems — the UK, Singapore, the US — consistently grow faster.`,
          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>If asked about the role of financial markets, always connect savings to investment to growth. The 2008 financial crisis is a powerful counterexample — what happens when financial markets direct funds toward unproductive, excessively risky uses instead.</p></div>`,
          `<div class="take-away"><div class="take-away-label">Take Away</div><p>Specialisation drives productivity and trade but creates dependency risks; money makes specialised exchange possible through its four functions; and financial markets channel savings into investment, fuelling economic growth.</p></div>`
        ]
      }
    ]
  },

  // ── Block 4: Types of Economic Systems (3 concepts) ──
  {
    title: `Types of Economic Systems`,
    concepts: [
      {
        title: `Free Market Economy`,
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>Every society must decide how to allocate its scarce resources, and the three main systems — free market, command, and mixed — each answer that question differently, with distinct trade-offs between efficiency and equity.</p></div>`,
          `In a <strong>free market economy</strong>, the <strong>price mechanism</strong> — the interaction of demand and supply — allocates resources without government direction. Private individuals and firms own the factors of production and decide what to produce, how to produce it, and who receives the output. The <strong>profit motive</strong> drives firms to cut costs and innovate, while <strong>consumer sovereignty</strong> ensures that what gets produced reflects what people actually want to buy.`,
          `<div class="content-subhead">Advantages of Free Markets</div>`,
          `Prices signal scarcity and direct resources efficiently, the profit motive incentivises innovation and cost reduction, consumers benefit from wide choice and competitive prices, and there are no heavy bureaucratic costs of central planning. However, markets <strong>fail</strong> — they will not provide <strong>public goods</strong> (national defence, street lighting), they overproduce goods with <strong>negative externalities</strong> (pollution) and underproduce those with <strong>positive externalities</strong> (education), and they tend to generate significant <strong>inequality</strong>. No pure free market economy exists in practice — even the US has extensive regulation, taxation and public spending.`
        ]
      },
      {
        title: `Command (Planned) Economy`,
        points: [
          `In a <strong>command economy</strong>, the government — via a central planning authority — makes all key economic decisions. The state owns the means of production and determines what to produce, how, and for whom. Historical examples include the former Soviet Union, North Korea and Cuba.`,
          `<div class="flow-chain"><span class="pill blue">Central planning authority</span><span class="arrow">→</span><span class="pill blue">State ownership of resources</span><span class="arrow">→</span><span class="pill pos">Can prioritise equity</span><span class="arrow">→</span><span class="pill neg">But no price signals → misallocation</span></div>`,
          `The system can prioritise equity, provide universal basic services (the USSR achieved near-universal literacy and healthcare), and direct resources to strategic industries. But without <strong>price signals</strong>, planners cannot know what consumers want or what production truly costs — the USSR famously overproduced steel and tanks while citizens queued for bread. Without the <strong>profit incentive</strong>, there is little drive to innovate or cut costs. Decision-making becomes slow, bureaucratic and prone to corruption.`
        ]
      },
      {
        title: `Mixed Economy`,
        points: [
          `A <strong>mixed economy</strong> combines elements of both systems. The <strong>private sector</strong> operates through markets while the <strong>public sector</strong> provides certain goods and services, regulates market failures, and redistributes income through taxes and benefits. Every real-world economy is mixed — the question is where the balance sits.`,
          `The UK uses free markets for most goods but has state provision of healthcare (the NHS) and education. Singapore relies heavily on markets yet the government controls 80% of housing through the HDB system. The Netherlands combines a vibrant private sector with one of Europe's most generous welfare states. Each represents a different answer to the same normative question: how much market, how much state?`,
          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>When evaluating economic systems, avoid one-sided answers. The best responses acknowledge trade-offs: "Free markets are efficient but generate inequality; state intervention can improve equity but risks government failure." Always ground your argument in real-world examples.</p></div>`,
          `<div class="take-away"><div class="take-away-label">Take Away</div><p>No economy is purely market or purely planned — every country balances efficiency and equity differently, and the debate about the right mix is a normative judgement with no single correct answer.</p></div>`,
          `<div class="section-links"><span class="link">↗ 1.2 Consumer Behaviour &amp; Demand</span><span class="link">↗ 1.3 Supply</span><span class="link">↗ 1.4 Price Determination</span></div>`
        ],
        examTip: `When evaluating economic systems, avoid one-sided answers. The best responses acknowledge trade-offs: "Free markets are efficient but generate inequality; state intervention can improve equity but risks government failure." Always give real-world examples — don't just discuss theory in the abstract.`
      }
    ]
  }
],


'consumer-behaviour-demand': [
  // ── Block 0: Rational Decision Making and Consumer Behaviour (3 concepts) ──
  {
    title: `Rational Decision Making and Consumer Behaviour`,
    concepts: [
      {
        title: `Rational Decision Making`,
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>Traditional economics assumes consumers are rational utility-maximisers — a powerful simplification that generates clear predictions, but one that behavioural economics increasingly challenges.</p></div>`,
          `<strong>Rational</strong> decision-making in economics means consumers have clear preferences, weigh up the <strong>marginal cost</strong> (what they give up) against the <strong>marginal benefit</strong> (what they gain), and choose whatever <strong>maximises their utility</strong> given their limited income. They are assumed to have <strong>perfect information</strong> and consistent, stable preferences. This assumption underpins demand theory: consumers buy more when prices fall because each unit now offers greater value for money.`,
          `This is a useful simplification — it generates testable predictions about behaviour. But it is obviously incomplete. Real people buy impulsively, stick with bad deals out of laziness, and follow the crowd. Behavioural economics challenges these assumptions systematically, and the exam expects you to understand both the model and its limitations.`
        ]
      },
      {
        title: `Utility and Utility Maximisation`,
        points: [
          `<strong>Utility</strong> is the satisfaction or benefit a consumer gets from consuming a good or service. <strong>Total utility</strong> is the cumulative satisfaction from all units consumed, while <strong>marginal utility</strong> is the <em>additional</em> satisfaction from consuming one more unit. The <strong>law of diminishing marginal utility</strong> says each extra unit gives you less additional satisfaction — your first slice of pizza is incredible, your fifth barely enjoyable, your tenth makes you feel sick.`,
          `<div class="flow-chain"><span class="pill blue">Consume more units</span><span class="arrow">→</span><span class="pill blue">Marginal utility falls</span><span class="arrow">→</span><span class="pill amber">Willing to pay less per unit</span><span class="arrow">→</span><span class="pill amber">Downward-sloping demand curve</span></div>`,
          `Consumers <strong>maximise utility</strong> when they equalise the marginal utility per pound spent across all goods. If a pound spent on coffee gives you more marginal utility than a pound spent on tea, shift spending toward coffee until the ratios equalise. This is the <strong>equi-marginal condition</strong> — the point where you cannot reallocate spending to make yourself better off.`
        ],
        formula: `MUₐ/Pₐ = MUᵇ/Pᵇ (utility maximisation / equi-marginal condition)`
      },
      {
        title: `Why Consumers May Not Act Rationally`,
        points: [
          `<strong>Behavioural economics</strong> identifies systematic, <em>predictable</em> ways people deviate from the rational model — not random mistakes, but consistent patterns of irrational behaviour that have real implications for policy and markets.`,
          `<div class="content-subhead">Habitual Behaviour and Inertia</div>`,
          `<strong>Habitual behaviour</strong> means you buy the same brand of coffee every week without comparing prices or alternatives — habit replaces calculation. <strong>Inertia</strong> (default bias) means you stick with an expensive energy tariff or phone contract because switching feels like too much effort, even when you would save hundreds of pounds. This is precisely why governments use <strong>nudges</strong> like auto-enrolment in pension schemes — most people never opt out of the default, so setting the right default changes behaviour without restricting freedom.`,
          `<div class="content-subhead">Herding, Emotion and Computational Limits</div>`,
          `<strong>Herding</strong> means following the crowd rather than thinking independently — it drives fashion trends, stock market bubbles, COVID-19 panic buying, and cryptocurrency speculation. <strong>Emotional factors</strong> lead people to spend on luxury goods not to maximise utility in the textbook sense but to boost self-esteem or signal status — a rational agent would not pay 10x more for a designer handbag that functions identically to a regular one. Meanwhile, <strong>poor computational skills</strong> mean humans struggle with probabilities, compound interest and complex pricing — which is why loan companies advertise monthly payments (sounds small) rather than total cost (sounds large).`,
          `<strong>Framing and cognitive bias</strong> shape decisions in powerful ways. "90% fat-free" sounds more attractive than "10% fat" even though they are identical. <strong>Loss aversion</strong> means losing £10 feels roughly twice as painful as gaining £10 feels good. <strong>Anchoring</strong> means the first number you see biases your judgement — estate agents show you an overpriced house first so the next one seems like a bargain.`,
          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>Examiners expect you to explain at least 2–3 reasons why consumers may not maximise utility, with specific examples. Always link back explicitly: "This challenges the assumption of rational choice because…" and consider the policy implications — nudges, regulation, or improved information provision.</p></div>`,
          `<div class="take-away"><div class="take-away-label">Take Away</div><p>The rational consumer model is a useful starting point, but behavioural economics reveals systematic biases — habits, herding, framing, loss aversion — that mean real-world choices often diverge sharply from textbook predictions.</p></div>`
        ],
        examTip: `Examiners expect you to explain at least 2–3 reasons why consumers may not maximise utility, with real-world examples. Always link back: "This challenges the assumption of rational choice because…" and consider policy implications such as nudges, regulation, or information provision.`
      }
    ]
  },

  // ── Block 1: The Demand Curve (3 concepts) ──
  {
    title: `The Demand Curve`,
    concepts: [
      {
        title: `Demand and the Demand Curve`,
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>Demand is not the same as desire — it requires both the willingness AND the ability to pay, which is why changes in income can reduce demand even when wants stay the same.</p></div>`,
          `<strong>Demand</strong> means both the willingness <em>and</em> the ability to buy a good at a given price in a given time period. Wanting a Ferrari does not count as demand if you cannot afford one — that is merely a wish. This distinction matters: when incomes fall during a recession, demand for luxury goods drops even though people's desires have not changed one bit.`,
          `The <strong>demand curve</strong> slopes downward from left to right, showing an <strong>inverse relationship</strong> between price and quantity demanded (ceteris paribus). It slopes down because of <strong>diminishing marginal utility</strong> (each extra unit provides less satisfaction, so consumers will only buy more at a lower price) and the <strong>income and substitution effects</strong> of a price change. An <strong>individual demand curve</strong> shows one consumer's demand; a <strong>market demand curve</strong> is the horizontal summation of all individual curves — at each price, add up every consumer's quantity demanded.`
        ]
      },
      {
        title: `Movements Along vs Shifts of the Demand Curve`,
        points: [
          `A <strong>movement along</strong> the demand curve is caused solely by a change in the <strong>good's own price</strong>. A price fall causes an <strong>extension of demand</strong> (movement down the curve — more bought). A price rise causes a <strong>contraction of demand</strong> (movement up the curve — less bought). In contrast, a <strong>shift</strong> of the entire demand curve is caused by a change in a <strong>non-price factor</strong> — something that alters the quantity demanded at <em>every</em> price level. Rightward shift = increase in demand; leftward shift = decrease in demand.`,
          `<div class="watch-out"><div class="watch-out-label">Common Mistake</div><p>"A rise in price causes a fall in demand" — this is WRONG and loses marks every exam series. The correct language: "A rise in price causes a contraction in demand (movement along the curve)." Reserve "demand increased/decreased" for shifts of the entire curve caused by non-price factors.</p></div>`,
          `<div class="flow-chain"><span class="pill blue">Own price changes</span><span class="arrow">→</span><span class="pill amber">Movement ALONG curve</span></div><div class="flow-chain"><span class="pill blue">Non-price factor changes</span><span class="arrow">→</span><span class="pill amber">SHIFT of entire curve</span></div>`
        ],
        examTip: `This is one of the most heavily penalised mistakes. "A rise in price causes a fall in demand" loses marks. The correct language: "A rise in price causes a contraction in demand (movement along the curve)." Save "demand increased/decreased" for curve shifts only.`
      },
      {
        title: `Factors That Shift the Demand Curve`,
        points: [
          `<strong>Income</strong>: for <strong>normal goods</strong>, higher income shifts demand right (people can afford more); for <strong>inferior goods</strong>, higher income shifts demand <em>left</em> (consumers switch to better alternatives — instant noodles to fresh meals, budget supermarkets to Waitrose).`,
          `<strong>Prices of related goods</strong>: if the price of Pepsi rises, demand for Coca-Cola shifts right (consumers switch between <strong>substitutes</strong>). If the price of printers rises, demand for ink cartridges shifts left (fewer printers sold means less ink needed — these are <strong>complements</strong>).`,
          `<strong>Tastes and preferences</strong> shift demand in response to fashion changes, advertising campaigns, health scares (demand for vaping products after health warnings), and social trends. <strong>Population size and structure</strong> matter too: a growing population increases total demand, while an ageing population shifts demand toward healthcare and away from children's toys.`,
          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>When explaining a demand shift, always (1) identify the specific non-price factor, (2) state the direction of the shift, and (3) explain the mechanism — WHY that factor causes more or less to be demanded at every price. Vague answers like "demand increased because of various factors" score poorly.</p></div>`,
          `<div class="take-away"><div class="take-away-label">Take Away</div><p>The demand curve shows the inverse relationship between price and quantity demanded — movements along it are caused by price changes, while shifts are caused by non-price factors like income, related goods' prices, and tastes. Precise terminology is essential.</p></div>`
        ]
      }
    ]
  },

  // ── Block 2: Price Elasticity of Demand (PED) (5 concepts) ──
  {
    title: `Price Elasticity of Demand (PED)`,
    concepts: [
      {
        title: `PED: Definition and Formula`,
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>PED measures how sensitive consumers are to a price change — and it is the single most important tool firms use when deciding whether to raise or lower their prices.</p></div>`,
          `<strong>Price elasticity of demand (PED)</strong> measures how <strong>responsive</strong> quantity demanded is to a change in price. It answers a concrete business question: "If I raise my price by 10%, how much will my sales fall?" PED is always <strong>negative</strong> (law of demand — price up, quantity down), though it is often expressed as an absolute value for convenience. Because the formula uses percentage changes, PED is a unit-free measure, meaning you can compare responsiveness across completely different goods — petrol vs cinema tickets vs iPhones.`
        ],
        formula: `PED = % change in quantity demanded ÷ % change in price`
      },
      {
        title: `Interpreting PED Values`,
        points: [
          `<strong>|PED| > 1 = elastic demand</strong>: quantity demanded is highly responsive to price changes. A 10% price rise causes <em>more than</em> a 10% fall in quantity demanded. Think luxury goods, products with many close substitutes, or things you can easily do without — foreign holidays, branded clothing, restaurant meals.`,
          `<strong>|PED| < 1 = inelastic demand</strong>: quantity demanded barely responds to price. A 10% price rise causes <em>less than</em> a 10% fall in quantity. Think necessities and addictive goods — petrol (you still need to drive to work), insulin (you need it to survive), cigarettes (addiction overrides price sensitivity).`,
          `<strong>|PED| = 1 = unit elastic</strong>: the percentage changes are exactly equal. <strong>|PED| = 0 = perfectly inelastic</strong>: quantity does not change at all regardless of price (vertical demand curve — a life-saving drug with no substitute). <strong>|PED| = ∞ = perfectly elastic</strong>: any price increase causes demand to drop to zero (horizontal demand curve — a firm in a perfectly competitive market where consumers can instantly switch to an identical rival product).`
        ]
      },
      {
        title: `Factors Influencing PED`,
        points: [
          `<strong>Availability of substitutes</strong>: the more substitutes available, the more elastic demand becomes. Demand for "Coca-Cola" specifically is elastic (switch to Pepsi), but demand for "soft drinks" as a category is more inelastic (fewer alternatives to the whole category).`,
          `<strong>Necessity vs luxury</strong>: necessities like bread, electricity and insulin have inelastic demand — you buy them regardless of price. Luxuries like designer clothes and foreign holidays have elastic demand — if the price rises, you simply skip them.`,
          `<strong>Proportion of income</strong>: a 20% rise in the price of salt barely dents your budget (inelastic), while a 20% rise in rent consumes a huge extra chunk of income (more elastic). <strong>Time horizon</strong> matters too: demand becomes more elastic over time as consumers find alternatives. When petrol prices spiked, short-run demand was inelastic, but over years people bought electric cars and moved closer to work.`,
          `<strong>Habit and addiction</strong> make demand very inelastic — cigarettes and alcohol are classic examples. <strong>Brand loyalty</strong> has the same effect: Apple fans keep buying iPhones even when cheaper alternatives exist. <strong>Market definition</strong> is crucial: narrowly defined markets (Waitrose organic milk) are more elastic than broadly defined ones (food in general).`
        ],
        examTip: `When discussing PED factors, always explain the mechanism — WHY does the factor make demand more or less elastic? Don't just state "more substitutes = more elastic." Explain: "Because consumers can easily switch to alternatives, a price rise causes a proportionally larger fall in quantity demanded."`
      },
      {
        title: `PED and Total Revenue`,
        points: [
          `This is one of the most commercially useful relationships in economics. <strong>Total Revenue (TR) = Price × Quantity</strong>. The key insight is that changing your price has two opposing effects on revenue: the price effect (higher price per unit) and the quantity effect (fewer units sold). PED tells you which effect wins.`,
          `<div class="flow-chain"><span class="pill blue">Elastic demand (|PED| > 1)</span><span class="arrow">→</span><span class="pill pos">Cut price → TR rises</span></div><div class="flow-chain"><span class="pill blue">Inelastic demand (|PED| &lt; 1)</span><span class="arrow">→</span><span class="pill pos">Raise price → TR rises</span></div>`,
          `If demand is <strong>elastic</strong>: a price <em>cut</em> increases TR because the gain from selling many more units outweighs the loss from each unit being cheaper. This is why budget airlines like Ryanair keep cutting fares — their price-sensitive customers respond strongly. If demand is <strong>inelastic</strong>: a price <em>rise</em> increases TR because customers keep buying despite the higher price. This is why petrol stations can raise prices during bank holidays — drivers have few short-run alternatives.`,
          `If demand is <strong>unit elastic (|PED| = 1)</strong>: TR stays the same regardless of price changes — this is the <strong>revenue-maximising point</strong>. A firm maximises total revenue by setting its price exactly where PED equals one.`
        ],
        examTip: `Classic exam question: "Explain why a firm would lower its price." Answer: because demand is elastic — the revenue gain from increased sales volume exceeds the revenue lost from the lower price per unit. Always link the PED value to the revenue consequence explicitly.`,
        formula: `TR = P × Q`
      },
      {
        title: `PED Along a Straight-Line Demand Curve`,
        points: [
          `This trips up many students: PED <strong>varies along</strong> a straight-line demand curve even though the gradient (slope) is constant. At the <strong>top</strong> of the curve (high price, low quantity), demand is <strong>elastic</strong>. At the <strong>midpoint</strong>, it is <strong>unit elastic</strong>. At the <strong>bottom</strong> (low price, high quantity), it is <strong>inelastic</strong>.`,
          `Why? Because PED uses <strong>percentage changes</strong>, not absolute changes. At a high price, a £1 change is a small percentage of price but a large percentage of a small quantity — so PED is high. At a low price, the same £1 change is a large percentage of price but a small percentage of a large quantity — so PED is low. The gradient is unchanged, but the base for calculating percentages shifts dramatically.`,
          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>Don't confuse gradient with elasticity — a steep demand curve does NOT necessarily mean inelastic demand. PED depends on percentage changes, not slope. This is a favourite examiner trap. Also note: firms should never operate on the inelastic portion of the curve — they could raise price and increase both revenue and profit.</p></div>`,
          `<div class="take-away"><div class="take-away-label">Take Away</div><p>PED measures responsiveness of quantity demanded to price changes, determines the revenue impact of pricing decisions, and varies along a straight-line demand curve — master the PED–total revenue link and you have the answer to almost every pricing question.</p></div>`
        ],
        examTip: `Don't confuse gradient with elasticity. A steep demand curve does NOT necessarily mean inelastic demand — PED depends on percentage changes, not slope. This is a favourite examiner trap that catches students every year.`
      }
    ]
  },

  // ── Block 3: Income Elasticity of Demand (YED) (3 concepts) ──
  {
    title: `Income Elasticity of Demand (YED)`,
    concepts: [
      {
        title: `YED: Definition and Formula`,
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>YED tells you what happens to demand when incomes change — and unlike PED, the sign of the answer reveals whether the good is normal, luxury or inferior.</p></div>`
        ],
        formula: `YED = % change in quantity demanded ÷ % change in income`
      },
      {
        title: `Interpreting YED Values`,
        points: [
          `<strong>YED > 0 (positive)</strong> means the good is a <strong>normal good</strong> — demand rises as income rises. Within this category, <strong>YED > 1</strong> makes it a <strong>luxury good</strong> (demand grows <em>faster</em> than income — designer clothing, international travel, fine dining), while <strong>0 &lt; YED &lt; 1</strong> makes it a <strong>necessity</strong> (demand grows, but <em>slower</em> than income — rice, toothpaste, basic clothing).`,
          `<strong>YED < 0 (negative)</strong> means the good is an <strong>inferior good</strong> — as income rises, demand actually <em>falls</em> because consumers upgrade to better alternatives. Think instant noodles, budget airlines, second-hand clothing, and value-brand supermarket food. During recessions the reverse happens: demand for inferior goods rises — Aldi and Lidl thrived during the 2008–09 downturn precisely because their products have negative YED.`,
          `<div class="flow-chain"><span class="pill pos">Boom (incomes rise)</span><span class="arrow">→</span><span class="pill pos">Luxury demand soars (YED > 1)</span><span class="arrow">→</span><span class="pill neg">Inferior good demand falls (YED &lt; 0)</span></div>`
        ]
      },
      {
        title: `Significance of YED`,
        points: [
          `<div class="content-subhead">For Firms</div>`,
          `YED helps predict how your sales will respond to the business cycle. If you sell luxury goods (high positive YED), prepare for volatile demand — build cash reserves for downturns and ramp up production during booms. If you sell necessities (low positive YED), demand is stable but growth potential is limited. Smart firms pursue <strong>product diversification</strong>: Unilever sells both premium (Dove) and budget (basic range) products, so whichever way the economy moves, some product lines gain.`,
          `<div class="content-subhead">For Government and Structural Change</div>`,
          `Tax revenue from luxury goods rises faster during booms (high YED) but collapses in recessions, while revenue from necessities is more stable — this matters enormously for fiscal planning. At a deeper level, YED explains <strong>structural change</strong>: as economies grow, demand shifts from primary goods (agriculture — low YED) to services and luxuries (high YED). This is why developing countries move from farming to manufacturing to services as they get richer — the composition of output follows income elasticity patterns.`,
          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>Always connect YED to the business cycle. A question about "how would a recession affect this firm" is really asking about YED. High positive YED = vulnerable to downturns. Negative YED = counter-cyclical. Structure your answer around these distinctions.</p></div>`,
          `<div class="take-away"><div class="take-away-label">Take Away</div><p>YED reveals how demand responds to income changes — positive for normal goods, negative for inferior goods — and it is the key to understanding why some firms thrive in recessions while others collapse.</p></div>`
        ]
      }
    ]
  },

  // ── Block 4: Cross Elasticity of Demand (XED) (3 concepts) ──
  {
    title: `Cross Elasticity of Demand (XED)`,
    concepts: [
      {
        title: `XED: Definition and Formula`,
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>XED measures how the demand for one good responds to a price change in another — and the sign instantly tells you whether the goods are substitutes, complements, or unrelated.</p></div>`
        ],
        formula: `XED = % change in Qd of Good A ÷ % change in price of Good B`
      },
      {
        title: `Interpreting XED Values`,
        points: [
          `<strong>XED > 0 (positive)</strong>: the goods are <strong>substitutes</strong>. When the price of Pepsi rises, demand for Coca-Cola increases — consumers switch. The higher the positive value, the closer the substitutes. Coca-Cola and Pepsi have high positive XED; Coca-Cola and orange juice have lower positive XED (more distant substitutes).`,
          `<strong>XED < 0 (negative)</strong>: the goods are <strong>complements</strong>. When the price of printers rises, demand for ink cartridges falls — fewer printers sold means less ink needed. The more negative the value, the stronger the complementary relationship. Petrol and cars, smartphones and cases, razors and blades all show negative XED.`,
          `<strong>XED = 0 or close to zero</strong>: the goods are <strong>unrelated</strong> — a change in the price of bananas has no meaningful effect on demand for smartphones. In practice, most goods have XED close to zero because most products are simply not related.`
        ]
      },
      {
        title: `Significance of XED`,
        points: [
          `<strong>For firms</strong>: XED reveals your competitive landscape. A high positive XED with a rival's product means you must watch their pricing closely — if they cut prices, you lose customers fast. A high negative XED with a complement creates bundling opportunities: printer companies sell printers cheaply (sometimes at a loss) and make their profits on ink cartridges, because the strong complementary relationship guarantees repeat purchases.`,
          `<strong>For competition authorities</strong>: XED is used to define markets. If XED between two brands is very high, they are close substitutes and therefore in the same market. The UK's <strong>Competition and Markets Authority (CMA)</strong> uses exactly this logic when assessing mergers — if two "competing" products actually have low XED, they are not truly in the same market and the merger may not reduce competition.`,
          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>A question asking "How would a tax on sugary drinks affect related markets?" is really asking about XED. The tax reduces sugary drink demand — XED tells you whether consumers switch to juice (substitute, positive XED) or whether confectionery sales also fall (complement, negative XED). Good policy analysis requires understanding cross-effects.</p></div>`,
          `<div class="take-away"><div class="take-away-label">Take Away</div><p>XED uses the sign to classify goods as substitutes (positive), complements (negative), or unrelated (zero) — and it is essential for understanding competitive dynamics, pricing strategy, and the ripple effects of government policy.</p></div>`
        ]
      }
    ]
  },

  // ── Block 5: Significance of Elasticities (1 concept) ──
  {
    title: `Significance of Elasticities`,
    concepts: [
      {
        title: `Bringing It Together`,
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>Elasticities are not abstract numbers — they are practical decision-making tools that firms use for pricing, governments use for taxation, and economists use to predict how markets respond to change.</p></div>`,
          `<div class="content-subhead">For Firms: Pricing and Planning</div>`,
          `<strong>PED</strong> is the most important pricing tool. If demand is inelastic, raise prices to boost revenue. If elastic, cut prices or add value to increase sales volume. The revenue-maximising price is where |PED| = 1. <strong>YED</strong> tells you how the business cycle will hit your sales — luxury retailers should build cash reserves for recessions, while necessity producers can invest steadily through the cycle. <strong>XED</strong> reveals who your real competitors are and which complementary products to bundle for maximum impact.`,
          `<div class="content-subhead">For Government: Taxation and Policy</div>`,
          `Taxing goods with <strong>inelastic demand</strong> (cigarettes, petrol, alcohol) maximises revenue and minimises deadweight loss, because quantity barely falls. But there is a critical equity concern: these taxes tend to be <strong>regressive</strong> — lower-income households spend a bigger share of their income on these goods, so the tax burden falls disproportionately on them. YED helps forecast how tax revenues will fluctuate over the business cycle, while XED predicts the spillover effects of taxes and subsidies on related markets.`,
          `<div class="content-subhead">For Consumers</div>`,
          `Understanding elasticities helps you anticipate market behaviour. If demand for a product is elastic, expect frequent sales and discounts (firms compete on price). If inelastic, prices are likely to be high and stable. Knowing YED helps you understand why luxury goods see the biggest price drops during recessions — and why savvy shoppers time their purchases accordingly.`,
          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>Elasticity questions often ask "Discuss the significance of PED/YED/XED for…" — structure your answer around different stakeholders (firms, government, consumers) and give specific examples for each. The highest marks go to answers that explain WHY the elasticity value matters for each decision-maker, not just what the values mean.</p></div>`,
          `<div class="take-away"><div class="take-away-label">Take Away</div><p>PED drives pricing decisions, YED predicts business-cycle vulnerability, and XED maps competitive relationships — together, the three elasticities give you a complete toolkit for analysing how any market responds to change.</p></div>`,
          `<div class="section-links"><span class="link">↗ 1.1 Introductory Concepts</span><span class="link">↗ 1.3 Supply</span><span class="link">↗ 1.4 Price Determination</span></div>`
        ],
        examTip: `Elasticity questions often ask "Discuss the significance of PED/YED/XED for…" — structure your answer around different stakeholders (firms, government, consumers) and give specific real-world examples for each. The highest marks go to answers that explain WHY the elasticity value matters for each decision-maker, not just what the values mean in theory.`
      }
    ]
  }
],

};


async function main() {
  const ids = Object.keys(CONTENT);
  console.log(`Updating ${ids.length} content sections...\n`);

  for (const id of ids) {
    const content = CONTENT[id];
    const cc = content.reduce((s, b) => s + (b.concepts?.length || 0), 0);
    const pc = content.reduce((s, b) => s + (b.concepts || []).reduce((s2, c) => s2 + (c.points?.length || 0), 0), 0);

    const { error } = await supabase
      .from('section_content')
      .update({ data: content })
      .eq('section_id', id);

    if (error) console.log(`  ✗ ${id}: ${error.message}`);
    else console.log(`  ✓ ${id} — ${content.length} blocks, ${cc} concepts, ${pc} points`);
  }

  console.log('\nDone.');
}

main();
