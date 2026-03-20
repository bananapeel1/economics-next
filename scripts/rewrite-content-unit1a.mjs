import { supabase } from './_db.mjs';

/* ═══════════════════════════════════════════════════════════
 *  REVVY LEARN — CONTENT EXPLORER REWRITE
 *  Unit 1, Part A: Introductory Concepts + Consumer Behaviour & Demand
 *
 *  Writing Rules Applied:
 *  1. No circular definitions — build intuition first
 *  2. Real specific examples (UK, Singapore, Nigeria, etc.)
 *  3. "So what" — connect to exam application
 *  4. Merge fragmented bullets into flowing explanations
 *  5. Contrast and tension — warn about examiner traps
 *  6. Bold key terms on first use
 *  7. Warm, direct, second-person teacher tone
 * ═══════════════════════════════════════════════════════════ */

const CONTENT = {

'introductory-concepts': [
  {
    title: 'The Nature of Economics',
    concepts: [
      {
        title: 'Economics as a Social Science',
        points: [
          `<strong>Economics</strong> is a <strong>social science</strong> — it studies how people, firms and governments make decisions about allocating <strong>scarce resources</strong> to satisfy unlimited wants. Unlike natural sciences that deal with predictable physical laws, economics studies <strong>human behaviour</strong>, which is messy, unpredictable and influenced by culture, emotion and politics.`,
          `Because the real economy is impossibly complex, economists build <strong>models</strong> — simplified versions of reality that isolate the relationships they want to study. A model of demand might assume consumers are perfectly rational, even though they're not, because the simplification helps you see the core logic. If a model's predictions consistently fail against real-world data, it gets revised or replaced.`,
          `The key assumption powering most models is <strong>ceteris paribus</strong> — Latin for "all other things being equal." When you say "a rise in price reduces quantity demanded, ceteris paribus," you're holding every other factor (income, tastes, population) constant so you can isolate the price effect. Think of it like a lab experiment: change one variable, hold the rest fixed.`,
          `Economics divides into two branches: <strong>microeconomics</strong> (individual markets, firms, consumers — the supply and demand you'll study in Unit 1) and <strong>macroeconomics</strong> (the whole economy — GDP, inflation, unemployment in Unit 2). They use different tools but the same underlying logic of scarcity and choice.`
        ],
        examTip: `When a question asks about economics as a social science, emphasise that it studies human behaviour (not physical phenomena), uses models built on assumptions, and relies on ceteris paribus to isolate variables. Don't just list these — explain why each matters.`
      },
      {
        title: 'Positive and Normative Economics',
        points: [
          `Here's a claim: "UK unemployment rose by 2% last year." You could check that — grab ONS data and verify. Now compare: "Unemployment is too high." Who decides what's "too high"? No spreadsheet can settle that. The first is a <strong>positive statement</strong> — a factual claim that can be tested against evidence, describing "what is." The second is a <strong>normative statement</strong> — a <strong>value judgement</strong> about "what ought to be."`,
          `Normative statements almost always contain giveaway words: <em>should</em>, <em>ought to</em>, <em>better</em>, <em>fairer</em>, <em>too much</em>. "Countries with higher minimum wages have lower youth employment" is positive — compare France and the US and you can test it. "France <em>should</em> raise the minimum wage" is normative — no data settles a "should."`,
          `Here's where it gets tricky: the line blurs in practice. "Inequality has increased" is positive (you can measure a Gini coefficient). "Inequality is a problem" is normative (that's an opinion). Examiners specifically test whether you can spot this distinction, so practise identifying the opinion-loaded language in any policy recommendation.`,
          `All <strong>government policy</strong> involves normative judgements — choosing between efficiency and equity, for example. This is why two economists can look at identical data and recommend opposite policies. It's also why <em>evaluate</em> questions have no single right answer — what matters is the quality of your reasoning, not which side you take.`
        ],
        examTip: `Look for opinion-laden language ('should', 'ought', 'fair', 'too much') as your normative giveaway. A common trap: statements that sound factual but contain hidden value judgements — "The NHS is underfunded" implies a judgement about what the right level of funding should be.`
      }
    ]
  },
  {
    title: 'Scarcity, Choice and Opportunity Cost',
    concepts: [
      {
        title: 'The Basic Economic Problem',
        points: [
          `Every society on earth faces the same fundamental problem: people's wants are <strong>unlimited</strong>, but the resources to satisfy them — land, labour, capital, enterprise — are <strong>finite</strong>. This is <strong>scarcity</strong>, and it's not about being poor. Even the richest countries face it: the US government can't fund unlimited healthcare <em>and</em> unlimited defence <em>and</em> unlimited education simultaneously.`,
          `Because of scarcity, individuals, firms and governments must make <strong>choices</strong> about how to allocate resources. What should we produce? How should we produce it? Who gets the output? These three questions sit at the heart of every economic system — and the way different societies answer them determines whether they lean toward markets, state planning, or a mixture.`,
          `Every choice involves a <strong>trade-off</strong> — gaining more of one thing means having less of another. A student spending an evening revising economics can't also be working a shift at a part-time job. A government building a new motorway can't use the same £5 billion for hospitals. Trade-offs are inescapable, and economics gives you the tools to analyse them.`
        ]
      },
      {
        title: 'Opportunity Cost',
        points: [
          `Whenever you choose one thing, you give up the next best alternative. That forgone option is the <strong>opportunity cost</strong>. If the UK government spends £50 billion on HS2, the opportunity cost might be 10 new hospitals, or a decade of increased education funding — whichever was the next best use of that money.`,
          `Crucially, it's the <em>next best</em> alternative, not all alternatives. If you choose economics over history and art, the opportunity cost is whichever of history or art you would have chosen — not both. Examiners penalise students who list every possible alternative instead of identifying the single best forgone option.`,
          `Opportunity cost applies at every level: <strong>individuals</strong> (spending decisions — buying a phone means not spending that money on clothes), <strong>firms</strong> (investing in new machinery means not using those funds for marketing), and <strong>governments</strong> (every budget allocation has an opportunity cost in terms of other public services forgone).`,
          `Opportunity cost is the single most important concept in economics — it underpins rational decision-making. In exams, framing your analysis in terms of opportunity cost instantly elevates the quality. Instead of saying "the government should build more hospitals," say "the opportunity cost of building hospitals is the roads, schools or tax cuts forgone."`,
        ],
        examTip: `Always state opportunity cost as the NEXT BEST alternative forgone, not just any alternative. Use specific, concrete examples. "The opportunity cost of the government spending £10bn on defence is £10bn less for the NHS" is far stronger than "there are opportunity costs involved."`
      },
      {
        title: 'Free Goods vs Economic Goods',
        points: [
          `<strong>Economic goods</strong> are scarce — they have an opportunity cost because resources are used up in producing them. Every car, textbook, and hour of healthcare requires inputs that could have been used elsewhere.`,
          `<strong>Free goods</strong> have <strong>no opportunity cost</strong> — they exist in such abundance relative to demand that nobody has to sacrifice anything to obtain them. Sunlight and (traditionally) air are classic examples.`,
          `But very few goods remain truly free in practice. Clean air now has an opportunity cost — we spend billions on pollution reduction and green technology to maintain it. Fresh water, once considered free, is increasingly scarce in parts of Africa and the Middle East. This blurring is worth noting in exams when discussing why economics focuses on scarce resources.`
        ]
      }
    ]
  },
  {
    title: 'The Production Possibility Frontier (PPF)',
    concepts: [
      {
        title: 'PPF Concept and Shape',
        points: [
          `The <strong>Production Possibility Frontier (PPF)</strong> shows all the <strong>maximum possible output</strong> combinations of two goods an economy can produce when all resources are <strong>fully and efficiently employed</strong>. It's one of the most versatile diagrams in economics — used to illustrate scarcity, opportunity cost, efficiency, and growth all on one curve.`,
          `Points <strong>on the PPF</strong> are <strong>productively efficient</strong> — every resource is being used, and you can't make more of one good without making less of the other. Points <strong>inside the PPF</strong> mean resources are being wasted (unemployment, idle factories, misallocation). Points <strong>outside the PPF</strong> are currently <strong>unattainable</strong> with existing resources and technology.`,
          `The PPF is typically drawn as a <strong>concave curve</strong> (bowed outward), reflecting <strong>increasing opportunity costs</strong>. Why? Resources aren't perfectly transferable between uses. The first workers you shift from textiles to computing might be highly adaptable, but eventually you're retraining tailors to code — each additional unit of computing costs progressively more textile output.`,
          `A straight-line PPF implies <strong>constant opportunity costs</strong> — resources are equally suited to producing both goods. This is rare in reality but sometimes used in simplified models.`
        ]
      },
      {
        title: 'Opportunity Cost on the PPF',
        points: [
          `Moving <strong>along</strong> the PPF illustrates opportunity cost directly — producing more of one good requires sacrificing some of the other. With a concave PPF, each additional unit costs more than the last (<strong>increasing marginal opportunity cost</strong>) because the resources being transferred become less and less suitable.`,
          `Think of it concretely: if Brazil shifts land from coffee to soybean farming, the first hectares converted are poor coffee land but great for soy — low opportunity cost. The last hectares converted are prime coffee-growing land — the sacrifice is enormous.`
        ],
        examTip: `When calculating opportunity cost from a PPF, express it as a ratio: "the opportunity cost of 1 more unit of Good X is Y units of Good Y forgone." Always show your working and be specific about the trade-off.`
      },
      {
        title: 'Movements Along vs Shifts of the PPF',
        points: [
          `A <strong>movement along</strong> the PPF happens when an economy <strong>reallocates existing resources</strong> between the two goods — the frontier itself doesn't change, only the position on it. This represents a change in the <em>composition</em> of output, not the <em>capacity</em>.`,
          `An <strong>outward shift</strong> of the PPF represents <strong>economic growth</strong> — the economy's productive capacity increases, so it can produce more of everything. Causes: discovery of new resources, better technology, improved education and skills, capital investment. South Korea's transformation from one of the world's poorest countries to a tech powerhouse is essentially a decades-long outward PPF shift, driven by massive investment in education and technology.`,
          `An <strong>inward shift</strong> means productive capacity has <strong>declined</strong> — war, natural disaster, resource depletion, emigration of skilled workers, or institutional collapse. Syria's economy after 2011 is a devastating real-world example.`,
          `The shift can be <strong>parallel</strong> (both goods benefit equally — e.g. population growth) or <strong>pivotal</strong> (one good benefits more — e.g. a technology breakthrough in manufacturing only).`
        ]
      },
      {
        title: 'Capital Goods vs Consumer Goods on the PPF',
        points: [
          `A classic PPF application shows the trade-off between <strong>capital goods</strong> (machinery, factories, infrastructure — used to produce other goods) and <strong>consumer goods</strong> (things for immediate use — food, clothing, entertainment).`,
          `Countries that invest more in <strong>capital goods today</strong> sacrifice some current consumption but shift their PPF outward faster — they grow more in the future. China's extraordinary growth since the 1980s was partly driven by investing over 40% of GDP in capital goods. Countries that prioritise <strong>consumer goods today</strong> enjoy higher living standards now but may see slower future growth.`,
          `This is the fundamental trade-off between <strong>present consumption and future growth</strong>. Developing countries face it starkly: invest for the future or meet pressing needs right now? There's no objectively correct answer — it's a normative choice about how to balance current welfare against future prosperity.`
        ]
      }
    ]
  },
  {
    title: 'Specialisation and the Functions of Money',
    concepts: [
      {
        title: 'Specialisation and Division of Labour',
        points: [
          `<strong>Specialisation</strong> means individuals, firms, regions or countries concentrate on producing a limited range of goods and services rather than trying to be self-sufficient. <strong>Division of labour</strong> breaks the production process into separate tasks, each performed by different workers.`,
          `<strong>Adam Smith</strong> (1776, <em>The Wealth of Nations</em>) illustrated this with a <strong>pin factory</strong>: one worker doing everything might make 20 pins a day. Ten workers, each specialising in one step (drawing wire, cutting, sharpening, attaching heads), could produce 48,000. The productivity gain comes from workers developing expertise, saving time switching between tasks, and enabling mechanisation.`,
          `<strong>Advantages</strong>: higher productivity and output, better use of individual skills and talents, economies of scale, fosters innovation (specialists notice improvements), and enables <strong>international trade</strong> when countries specialise in what they produce best.`,
          `<strong>Disadvantages</strong>: work becomes monotonous and repetitive (Henry Ford's assembly line workers famously suffered from this), <strong>structural unemployment</strong> if demand for a specialised skill disappears (think coal miners in Northern England), over-dependence on other producers (supply chain disruptions during COVID-19 exposed this), and loss of flexibility — a highly specialised worker may struggle to find alternative employment.`,
          `Specialisation between countries drives <strong>international trade</strong> — Bangladesh specialises in garment manufacturing, Switzerland in financial services, Saudi Arabia in oil. This increases global output and consumer choice, but creates dependencies that can be risky.`
        ]
      },
      {
        title: 'The Functions of Money',
        points: [
          `Without money, exchange requires <strong>barter</strong> — directly swapping goods. The problem: barter needs a <strong>double coincidence of wants</strong> (the surgeon who needs bread must find a baker who needs surgery). This is wildly impractical in a specialised economy.`,
          `Money solves this with four functions. <strong>Medium of exchange</strong>: money is universally accepted in transactions, eliminating the double coincidence problem. <strong>Store of value</strong>: you can save money and spend it later (though inflation erodes this — hyperinflation in Zimbabwe or Venezuela destroyed money's store-of-value function). <strong>Unit of account</strong>: money provides a common measure to express and compare prices — try comparing the value of a haircut to a laptop without a common unit. <strong>Standard of deferred payment</strong>: money enables loans, contracts and credit — you can agree to pay £1,000 next month because both parties trust the value of money.`,
          `Without money, complex modern economies with extensive specialisation and trade simply could not function. The development of reliable money systems was as important to economic growth as any technological invention.`
        ]
      },
      {
        title: 'The Role of Financial Markets',
        points: [
          `<strong>Financial markets</strong> channel funds from <strong>savers</strong> (households and firms with surplus income) to <strong>borrowers</strong> (firms that need funds for investment, households buying homes, governments funding spending). When you put money in a bank, it gets lent to a business expanding its factory — your saving becomes someone else's investment.`,
          `This intermediation is critical for economic growth: without financial markets, firms couldn't fund large-scale investment, and individuals couldn't borrow for homes or education. Countries with well-developed financial systems (UK, Singapore, US) consistently grow faster than those without.`,
          `Key financial institutions include <strong>banks</strong> (deposit-taking and lending), <strong>stock markets</strong> (raising equity capital by selling shares), <strong>bond markets</strong> (raising debt capital), and <strong>insurance markets</strong> (enabling risk management). Together, they promote <strong>efficient resource allocation</strong> by directing funds to their most productive uses — at least in theory. The 2008 financial crisis showed what happens when financial markets allocate funds to unproductive and excessively risky uses instead.`
        ]
      }
    ]
  },
  {
    title: 'Types of Economic Systems',
    concepts: [
      {
        title: 'Free Market Economy',
        points: [
          `In a <strong>free market economy</strong>, the <strong>price mechanism</strong> — the interaction of demand and supply — allocates resources. Private individuals and firms own the means of production and decide what to make, how to make it, and who gets it. The profit motive drives firms; <strong>consumer sovereignty</strong> guides what gets produced.`,
          `<strong>Advantages</strong>: prices signal scarcity and direct resources efficiently, the profit motive incentivises innovation and cost-cutting, consumers get wide choice and competitive prices, and there are no heavy bureaucratic costs of central planning.`,
          `<strong>Disadvantages</strong>: markets fail — they won't provide public goods (national defence, street lighting), they overproduce goods with negative externalities (pollution) and underproduce those with positive externalities (education). Free markets also generate <strong>inequality</strong>, can be unstable (boom-bust cycles), and may under-provide merit goods.`,
          `No pure free market economy exists in practice — even the US, often cited as the most market-oriented major economy, has extensive government regulation, taxation, and public spending.`
        ]
      },
      {
        title: 'Command (Planned) Economy',
        points: [
          `In a <strong>command economy</strong>, the government (a central planning authority) makes all key economic decisions. The state owns the means of production and determines what to produce, how, and for whom. Historical examples: the former Soviet Union, North Korea, Cuba.`,
          `<strong>Advantages</strong>: can prioritise equity and reduce inequality, can provide public goods and universal basic services (the Soviet Union had near-universal literacy and healthcare), can direct resources to strategic industries, and avoids wasteful competition (no duplicate advertising, for example).`,
          `<strong>Disadvantages</strong>: without <strong>price signals</strong>, planners can't know what consumers want or what things cost to produce — resources get misallocated. The USSR famously overproduced steel and tanks while citizens queued for bread. Without the <strong>profit incentive</strong>, there's little drive to innovate or cut costs. Decision-making is slow, bureaucratic, and prone to corruption. Individual economic freedom is severely restricted.`
        ]
      },
      {
        title: 'Mixed Economy',
        points: [
          `A <strong>mixed economy</strong> combines elements of both free market and command systems. The <strong>private sector</strong> operates through markets, while the <strong>public sector</strong> provides certain goods and services, regulates markets, and redistributes income through taxes and benefits.`,
          `Every real-world economy is mixed — the question is where the balance sits. The UK uses free markets for most goods but has state provision of healthcare (NHS) and education. Singapore relies heavily on markets but the government controls 80% of housing through the HDB system. Scandinavian countries have large public sectors with high taxes and generous welfare, but maintain vibrant private sectors.`,
          `The debate about the right balance between market and state is fundamentally about the trade-off between <strong>efficiency</strong> (markets tend to be more efficient allocators) and <strong>equity</strong> (state intervention can reduce inequality and provide universal access). This is a <strong>normative judgement</strong> — there's no objectively correct answer, which is exactly why evaluation questions test your ability to weigh both sides.`
        ],
        examTip: `When evaluating economic systems, avoid one-sided answers. The best responses acknowledge trade-offs: "Free markets are efficient but generate inequality; state intervention can improve equity but risks government failure." Always give real-world examples — don't just discuss theory.`
      }
    ]
  }
],


'consumer-behaviour-demand': [
  {
    title: 'Rational Decision Making and Consumer Behaviour',
    concepts: [
      {
        title: 'Rational Decision Making',
        points: [
          `Traditional economic theory assumes consumers are <strong>rational</strong> — they have clear preferences, weigh up costs and benefits, and choose whatever <strong>maximises their utility</strong> (satisfaction), given their limited income. This assumption underpins demand theory: consumers buy more of a good when the price falls because it now offers greater value for money.`,
          `A rational consumer weighs the <strong>marginal cost</strong> (what they give up) against the <strong>marginal benefit</strong> (what they gain) for each decision, choosing the option that provides the greatest net benefit. They're assumed to have <strong>perfect information</strong> and consistent, stable preferences.`,
          `This is a useful simplification — it generates clear, testable predictions about behaviour. But it's obviously incomplete. Real people buy things impulsively, stick with bad deals out of laziness, and follow the crowd. Behavioural economics (covered below) challenges this assumption systematically.`
        ]
      },
      {
        title: 'Utility and Utility Maximisation',
        points: [
          `<strong>Utility</strong> is the satisfaction or benefit you get from consuming a good. <strong>Total utility</strong> is the total satisfaction from all the units consumed. <strong>Marginal utility</strong> is the <em>additional</em> satisfaction from consuming one more unit.`,
          `The <strong>law of diminishing marginal utility</strong> says each extra unit of a good gives you <em>less</em> additional satisfaction. Your first slice of pizza is amazing; your fifth is barely enjoyable; your tenth makes you feel sick. This is why demand curves slope downward — consumers are only willing to pay less for each additional unit because each provides less satisfaction.`,
          `Consumers <strong>maximise utility</strong> when they equalise the marginal utility per pound spent across all goods: <strong>MU<sub>A</sub>/P<sub>A</sub> = MU<sub>B</sub>/P<sub>B</sub></strong>. If a pound spent on coffee gives you more marginal utility than a pound on tea, you should shift spending toward coffee until the ratios equalise. This is the <strong>equi-marginal condition</strong>.`
        ],
        formula: 'MUₐ/Pₐ = MUᵇ/Pᵇ (utility maximisation condition)'
      },
      {
        title: 'Why Consumers May Not Act Rationally',
        points: [
          `<strong>Behavioural economics</strong> identifies systematic ways people deviate from the rational model — not random mistakes, but <em>predictable</em> patterns of irrational behaviour:`,
          `<strong>Habitual behaviour</strong>: you buy the same brand of coffee every week without comparing prices or alternatives. Habit replaces calculation — the rational consumer would reassess every time.`,
          `<strong>Inertia / default bias</strong>: you stick with an expensive energy tariff or phone contract because switching feels like too much effort, even though you'd save money. This is why governments use "nudges" like auto-enrolment in pension schemes — most people never opt out of the default.`,
          `<strong>Herding / social influence</strong>: you follow the crowd rather than thinking independently. This drives fashion trends, stock market bubbles, panic buying (toilet paper during COVID-19), and cryptocurrency speculation. In each case, people buy not because of careful analysis but because "everyone else is."`,
          `<strong>Poor computational skills</strong>: humans are bad at calculating probabilities, compound interest, and comparing complex pricing structures. This is why loan companies advertise monthly payments (sounds small) rather than total costs (sounds large), and why "buy one get one free" consistently outsells "50% off."`,
          `<strong>Emotional factors / need to feel valued</strong>: people spend on luxury goods, experiences and tips not to maximise utility in the economic sense, but to boost self-esteem, signal status or express identity. A rational agent wouldn't pay 10x more for a designer handbag with an identical function to a regular one.`,
          `<strong>Framing and bias</strong>: the way choices are <em>presented</em> affects decisions. "90% fat-free" sounds more attractive than "10% fat." <strong>Loss aversion</strong> means losing £10 feels roughly twice as bad as gaining £10 feels good. <strong>Anchoring</strong> means the first number you see biases your judgement — estate agents show you an overpriced house first so the next one seems reasonable.`
        ],
        examTip: `Examiners expect you to explain at least 2-3 reasons why consumers may not maximise utility, with examples. Always link back: "This challenges the assumption of rational choice because..." and consider the policy implications (nudges, regulation, information provision).`
      }
    ]
  },
  {
    title: 'The Demand Curve',
    concepts: [
      {
        title: 'Demand and the Demand Curve',
        points: [
          `<strong>Demand</strong> means both the willingness <em>and</em> the ability to buy at a given price in a given period. Wanting a Ferrari doesn't count as demand if you can't afford one — that's just a wish. This distinction matters: when incomes fall, demand for luxury goods drops even if people's desires haven't changed.`,
          `The <strong>demand curve</strong> slopes downward from left to right, showing an <strong>inverse relationship</strong> between price and quantity demanded (ceteris paribus). It slopes down because of <strong>diminishing marginal utility</strong> (each extra unit gives less satisfaction, so you'll only buy more at a lower price) and the <strong>income and substitution effects</strong> of a price change.`,
          `An <strong>individual demand curve</strong> shows one consumer's demand. A <strong>market demand curve</strong> is the horizontal summation of all individual demand curves — at each price, add up every consumer's quantity demanded.`
        ]
      },
      {
        title: 'Movements Along vs Shifts of the Demand Curve',
        points: [
          `A <strong>movement along</strong> the demand curve is caused by a change in the <strong>good's own price</strong>. A price fall causes an <strong>extension of demand</strong> (movement down the curve — more bought). A price rise causes a <strong>contraction of demand</strong> (movement up — less bought).`,
          `A <strong>shift</strong> of the entire demand curve is caused by a change in a <strong>non-price factor</strong> — something that changes the quantity demanded at <em>every</em> price level. Rightward shift = <strong>increase in demand</strong>. Leftward shift = <strong>decrease in demand</strong>.`,
          `Terminology precision is critical: use "extension/contraction of demand" for movements along the curve, and "increase/decrease in demand" for shifts. Saying "demand fell because the price rose" is <strong>wrong</strong> — <em>quantity demanded</em> fell; demand (the whole curve) hasn't changed. This distinction trips up students every exam series, and examiners specifically mark for it.`
        ],
        examTip: `This is one of the most heavily penalised mistakes. "A rise in price causes a fall in demand" loses marks. The correct language: "A rise in price causes a contraction in demand (movement along the curve)." Save "demand increased/decreased" for curve shifts.`
      },
      {
        title: 'Factors That Shift the Demand Curve',
        points: [
          `<strong>Income</strong>: for <strong>normal goods</strong>, higher income shifts demand right (people can afford more). For <strong>inferior goods</strong>, higher income shifts demand <em>left</em> (people switch to better alternatives — instant noodles to fresh meals).`,
          `<strong>Price of substitutes</strong>: if the price of Pepsi rises, demand for Coca-Cola shifts right (consumers switch). <strong>Price of complements</strong>: if the price of printers rises, demand for ink cartridges shifts left (fewer printers sold means less ink needed).`,
          `<strong>Tastes and preferences</strong>: changes in fashion, advertising campaigns, health scares (e.g. demand for vaping products after health warnings), or social trends shift demand. <strong>Population size and structure</strong>: a growing population increases demand; an ageing population shifts demand toward healthcare, away from children's toys.`,
          `<strong>Expectations</strong>: if consumers expect prices to rise, they buy now (demand shifts right today). <strong>Interest rates</strong>: lower rates reduce the cost of borrowing, increasing demand for credit-financed goods like houses and cars. <strong>Seasonal factors</strong>: demand for heating fuel peaks in winter, ice cream in summer.`
        ]
      }
    ]
  },
  {
    title: 'Price Elasticity of Demand (PED)',
    concepts: [
      {
        title: 'PED: Definition and Formula',
        points: [
          `<strong>Price elasticity of demand (PED)</strong> measures how <strong>responsive</strong> quantity demanded is to a change in price. It answers: "If I raise (or lower) my price by 10%, how much will my sales change?"`,
          `PED is always <strong>negative</strong> (law of demand — price up, quantity down), but it's often expressed as an absolute value for convenience. The formula uses percentage changes, making it a unit-free measure you can use to compare completely different goods — petrol vs cinema tickets vs iPhones.`
        ],
        formula: 'PED = % change in quantity demanded ÷ % change in price'
      },
      {
        title: 'Interpreting PED Values',
        points: [
          `<strong>|PED| > 1 = elastic demand</strong>: quantity demanded is highly responsive to price. A 10% price rise causes more than 10% fall in quantity. Examples: luxury goods, products with many substitutes, goods you can easily do without.`,
          `<strong>|PED| < 1 = inelastic demand</strong>: quantity demanded barely responds to price changes. A 10% price rise causes less than 10% fall in quantity. Examples: petrol (you still need to drive), insulin (you need it to live), cigarettes (addictive).`,
          `<strong>|PED| = 1 = unit elastic</strong>: percentage changes are exactly equal. <strong>|PED| = 0 = perfectly inelastic</strong>: quantity doesn't change at all regardless of price (vertical demand curve). <strong>|PED| = ∞ = perfectly elastic</strong>: any price increase causes demand to drop to zero (horizontal demand curve — a firm in a perfectly competitive market).`
        ]
      },
      {
        title: 'Factors Influencing PED',
        points: [
          `<strong>Substitutes</strong>: the more substitutes available, the more elastic demand becomes. Demand for "Coca-Cola" is elastic (switch to Pepsi); demand for "soft drinks" as a whole is more inelastic (fewer alternatives).`,
          `<strong>Necessity vs luxury</strong>: necessities (bread, electricity, insulin) have inelastic demand — you buy them regardless. Luxuries (designer clothes, foreign holidays) have elastic demand — if the price rises, you'll simply skip them.`,
          `<strong>Proportion of income</strong>: a 20% rise in the price of salt barely affects your budget (inelastic). A 20% rise in rent consumes a huge extra chunk of income (more elastic). <strong>Time</strong>: demand becomes more elastic over time as consumers find alternatives — when petrol prices spiked, short-run demand was inelastic, but over years people bought electric cars.`,
          `<strong>Habit and addiction</strong>: addictive goods like cigarettes and alcohol have very inelastic demand. <strong>Brand loyalty</strong>: Apple fans keep buying iPhones even when cheaper alternatives exist. <strong>Market definition</strong>: narrowly defined markets (Waitrose organic milk) are more elastic than broadly defined ones (food).`
        ],
        examTip: `When discussing PED factors, always explain the mechanism — WHY does the factor make demand more/less elastic? Don't just state "more substitutes = more elastic." Explain: "Because consumers can easily switch to alternatives, a price rise causes a larger fall in quantity demanded."`
      },
      {
        title: 'PED and Total Revenue',
        points: [
          `This is one of the most useful relationships in economics. <strong>Total Revenue (TR) = Price × Quantity</strong>.`,
          `If demand is <strong>elastic (|PED| > 1)</strong>: a price <em>cut</em> increases TR — the gain from selling more units outweighs the loss from each unit being cheaper. A price <em>rise</em> decreases TR. This is why budget airlines like Ryanair keep cutting fares — their customers are very price-sensitive.`,
          `If demand is <strong>inelastic (|PED| < 1)</strong>: a price <em>rise</em> increases TR — customers keep buying despite the higher price. A price <em>cut</em> decreases TR. This is why petrol stations can raise prices during holidays — drivers have few alternatives and still need to fill up.`,
          `If demand is <strong>unit elastic (|PED| = 1)</strong>: TR stays the same regardless of price changes. This is the <strong>revenue-maximising point</strong>.`
        ],
        examTip: `Classic exam question: "Explain why a firm would lower its price." Answer: because demand is elastic — the revenue gain from increased sales exceeds the loss from the lower price per unit. Always link PED to the revenue consequence.`,
        formula: 'TR = P × Q'
      },
      {
        title: 'PED Along a Straight-Line Demand Curve',
        points: [
          `This catches out many students: PED <strong>varies along</strong> a straight-line demand curve, even though the gradient (slope) is constant. At the <strong>top</strong> (high price, low quantity), demand is <strong>elastic</strong>. At the <strong>midpoint</strong>, it's <strong>unit elastic</strong>. At the <strong>bottom</strong> (low price, high quantity), it's <strong>inelastic</strong>.`,
          `Why? Because PED uses <strong>percentage changes</strong>, not absolute changes. At a high price, a £1 change is a small percentage of price but a large percentage of a small quantity — so PED is high. At a low price, the same £1 change is a large percentage of price but a small percentage of a large quantity — so PED is low.`,
          `The practical implication: TR is maximised at the midpoint where PED = 1. Firms should never operate on the inelastic portion of the demand curve — they could raise prices and increase both revenue and profit (less output means lower costs too).`
        ],
        examTip: `Don't confuse gradient with elasticity. A steep demand curve does NOT necessarily mean inelastic demand — PED depends on percentage changes, not the slope. This is a favourite examiner trap.`
      }
    ]
  },
  {
    title: 'Income Elasticity of Demand (YED)',
    concepts: [
      {
        title: 'YED: Definition and Formula',
        points: [
          `<strong>Income elasticity of demand (YED)</strong> measures how quantity demanded responds to changes in consumer income. Unlike PED, the <strong>sign matters hugely</strong> — it tells you what type of good you're dealing with.`
        ],
        formula: 'YED = % change in quantity demanded ÷ % change in income'
      },
      {
        title: 'Interpreting YED Values',
        points: [
          `<strong>YED > 0 (positive)</strong>: the good is a <strong>normal good</strong> — demand rises as income rises. Within this: <strong>YED > 1</strong> makes it a <strong>luxury</strong> (demand grows faster than income — designer clothing, international travel, fine dining). <strong>0 < YED < 1</strong> makes it a <strong>necessity</strong> (demand grows, but slower than income — rice, toothpaste, basic clothing).`,
          `<strong>YED < 0 (negative)</strong>: the good is an <strong>inferior good</strong> — as income rises, demand actually <em>falls</em> because consumers switch to better alternatives. Instant noodles, budget airlines, second-hand clothing, value-brand food. During recessions, demand for inferior goods rises — Aldi and Lidl thrive during downturns because their goods have negative YED.`,
          `The business cycle connection is critical: firms selling luxuries (high positive YED) see demand soar during booms but collapse during recessions. Firms selling necessities (low positive YED) have stable demand regardless. Smart businesses diversify across income elasticities to hedge this risk.`
        ]
      },
      {
        title: 'Significance of YED',
        points: [
          `<strong>For firms</strong>: YED helps predict how your sales will change during economic growth or recession. If you sell luxury goods (high YED), prepare for volatile demand — build cash reserves for downturns and ramp up production during booms. If you sell necessities, demand is stable but growth potential is limited.`,
          `<strong>For firms</strong>: <strong>product diversification</strong> — producing a mix of normal, inferior and luxury goods hedges against income changes. Unilever sells both premium (Dove) and budget (basic range) products — whichever way the economy moves, some products gain.`,
          `<strong>For government</strong>: tax revenue from luxury goods rises faster during booms (high YED) but collapses in recessions. Revenue from necessities is more stable. This matters for fiscal planning.`,
          `<strong>For structural change</strong>: as economies grow, demand shifts from primary goods (agriculture — low YED) to services and luxuries (high YED). This is why developing countries move from farming to manufacturing to services as they get richer — the composition of output follows income elasticity patterns.`
        ]
      }
    ]
  },
  {
    title: 'Cross Elasticity of Demand (XED)',
    concepts: [
      {
        title: 'XED: Definition and Formula',
        points: [
          `<strong>Cross elasticity of demand (XED)</strong> measures how the quantity demanded of Good A responds to a change in the price of Good B. Again, the <strong>sign is key</strong> — it reveals the relationship between the goods.`
        ],
        formula: 'XED = % change in Qd of Good A ÷ % change in price of Good B'
      },
      {
        title: 'Interpreting XED Values',
        points: [
          `<strong>XED > 0 (positive)</strong>: the goods are <strong>substitutes</strong>. When the price of Pepsi rises, demand for Coca-Cola increases — consumers switch. The higher the positive value, the closer the substitutes. Coca-Cola and Pepsi have high positive XED; Coca-Cola and orange juice have lower positive XED.`,
          `<strong>XED < 0 (negative)</strong>: the goods are <strong>complements</strong>. When the price of printers rises, demand for ink cartridges falls — fewer printers sold means less ink needed. The more negative the value, the stronger the complementary relationship.`,
          `<strong>XED = 0 or close to zero</strong>: the goods are <strong>unrelated</strong> — a change in the price of one has no effect on demand for the other. The price of bananas doesn't affect demand for smartphones.`
        ]
      },
      {
        title: 'Significance of XED',
        points: [
          `<strong>For firms</strong>: XED reveals your competitive landscape. A high positive XED with a rival's product means you need to watch their pricing closely — if they cut prices, you'll lose customers fast. A high negative XED with a complement means pricing decisions on one product affect sales of the other — this is why printer companies sell printers cheaply (negative margin) and make profits on ink cartridges.`,
          `<strong>For competition authorities</strong>: XED is used to define markets. If XED between two brands is very high (close substitutes), they're in the same market. The UK's Competition and Markets Authority (CMA) uses this logic when assessing mergers — if two "competing" products actually have low XED, they're not really in the same market.`,
          `<strong>For government</strong>: predicting spillover effects of policy. A sugar tax may reduce demand for sugary drinks, but XED tells you whether consumers switch to juice (substitute — might increase demand) or whether confectionery sales also drop (complement). Good policy analysis requires understanding these cross-effects.`
        ]
      }
    ]
  },
  {
    title: 'Significance of Elasticities',
    concepts: [
      {
        title: 'Bringing It Together: Elasticities for Firms, Government and Consumers',
        points: [
          `<strong>Firms and pricing</strong>: PED is the most important tool. If demand is inelastic, raise prices to boost revenue. If elastic, cut prices (or add value) to increase sales volume. The revenue-maximising price is where PED = 1.`,
          `<strong>Firms and planning</strong>: YED tells you how the business cycle will hit your sales. Luxury retailers should build cash reserves for recessions. Necessity producers can invest steadily. XED tells you who your real competitors are and which complementary products to bundle.`,
          `<strong>Government and taxation</strong>: taxing goods with inelastic demand (cigarettes, petrol, alcohol) maximises revenue and minimises the deadweight loss, because quantity barely falls. But this can be <strong>regressive</strong> — lower-income households spend a bigger share of their income on these goods.`,
          `<strong>Government and policy impact</strong>: YED helps forecast tax revenues over the cycle. XED predicts the ripple effects of taxes and subsidies on related markets. PES (covered in the supply section) determines how much of a tax falls on consumers vs producers.`,
          `<strong>For consumers</strong>: understanding elasticities helps you anticipate how prices will change and make better purchasing decisions. If you know demand for a product is elastic, you can expect sales and discounts to be common (firms compete on price). If inelastic, prices are likely to be high and stable.`
        ],
        examTip: `Elasticity questions often ask "Discuss the significance of PED/YED/XED for..." — structure your answer around different stakeholders (firms, government, consumers) and give specific examples for each. The highest marks go to answers that explain WHY the elasticity value matters for each decision-maker.`
      }
    ]
  }
],

};


async function main() {
  const ids = Object.keys(CONTENT);
  console.log(`Updating ${ids.length} content sections...\n`);

  let success = 0;
  let failed = 0;

  for (const id of ids) {
    const content = CONTENT[id];
    const conceptCount = content.reduce((s, b) => s + (b.concepts?.length || 0), 0);
    const pointCount = content.reduce((s, b) =>
      s + (b.concepts || []).reduce((s2, c) => s2 + (c.points?.length || 0), 0), 0);

    const { error } = await supabase
      .from('section_content')
      .update({ data: content })
      .eq('section_id', id);

    if (error) {
      console.log(`  ✗ ${id}: ${error.message}`);
      failed++;
    } else {
      console.log(`  ✓ ${id} — ${content.length} blocks, ${conceptCount} concepts, ${pointCount} points`);
      success++;
    }
  }

  console.log(`\nDone: ${success} updated, ${failed} failed.`);
}

main();
