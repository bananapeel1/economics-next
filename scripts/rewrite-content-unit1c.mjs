import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://trweeckuswgkenckeqfb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);

/* ═══════════════════════════════════════════════════════════
 *  CONTENT EXPLORER REWRITE — Unit 1 Part C
 *  Market Failure + Government Intervention
 * ═══════════════════════════════════════════════════════════ */

const CONTENT = {

'market-failure': [
  {
    title: 'Types of Market Failure',
    concepts: [
      {
        title: 'What Is Market Failure?',
        points: [
          `<strong>Market failure</strong> occurs when the free market fails to allocate resources <strong>efficiently</strong> — meaning the quantity produced or consumed doesn't maximise society's welfare. In technical terms, the market fails to achieve <strong>allocative efficiency</strong>, where Price = Marginal Social Cost (P = MSC).`,
          `When markets fail, we get the wrong amount produced: <strong>overproduction</strong> of things with costs that spill over onto society (pollution, junk food), <strong>underproduction</strong> of things with benefits that spill over (education, vaccination), or <strong>non-provision</strong> entirely (national defence, street lighting).`,
          `The main types you need to know: <strong>externalities</strong> (costs or benefits hitting third parties), <strong>public goods</strong> (non-rival, non-excludable — markets won't provide them), <strong>merit and demerit goods</strong> (under/over-consumed due to externalities + information failure), <strong>information failures</strong> (buyers or sellers lacking crucial knowledge), and <strong>monopoly power</strong> (firms restricting output to raise prices).`,
          `Market failure provides the <strong>justification for government intervention</strong> — but intervention doesn't always make things better. The risk of government failure is the counterargument you'll need in every evaluation.`
        ]
      }
    ]
  },
  {
    title: 'Externalities',
    concepts: [
      {
        title: 'What Are Externalities?',
        points: [
          `An <strong>externality</strong> is a cost or benefit that falls on a <strong>third party</strong> who isn't involved in the transaction — neither the buyer nor the seller. The key equations: <strong>MSC = MPC + MEC</strong> (Marginal Social Cost = Marginal Private Cost + Marginal External Cost) and <strong>MSB = MPB + MEB</strong> (Marginal Social Benefit = Marginal Private Benefit + Marginal External Benefit).`,
          `When externalities exist, private decision-makers ignore the effects on others, so the market produces the <strong>wrong quantity</strong>. Negative externalities mean too much is produced (the social cost exceeds what the firm pays). Positive externalities mean too little is produced (the social benefit exceeds what the consumer receives).`,
          `Externalities can arise on both sides of the market — in <strong>production</strong> (affecting the supply/cost side) or in <strong>consumption</strong> (affecting the demand/benefit side). You need to know all four combinations.`
        ]
      },
      {
        title: 'Negative Externalities of Production',
        points: [
          `Here, the firm's private costs (MPC) are <strong>lower</strong> than the true cost to society (MSC) because the production process imposes costs on third parties. The gap between MSC and MPC is the <strong>Marginal External Cost (MEC)</strong> — the damage the firm doesn't pay for.`,
          `A chemical factory dumping waste into a river imposes costs on downstream fisheries, water treatment plants, and communities who lose recreational use of the river. A cement factory emitting particulates causes respiratory illness in nearby residents. The firm doesn't pay these costs, so it produces more than the socially optimal level.`,
          `On a diagram: the MSC curve lies <strong>above</strong> the MPC (supply) curve. The free market produces at Q<sub>m</sub> (where MPC = MPB), but the social optimum is Q<sub>opt</sub> (where MSC = MSB). Since Q<sub>m</sub> > Q<sub>opt</sub>, there's <strong>overproduction</strong>. The <strong>welfare loss</strong> is the triangle between MSC and MPC from Q<sub>opt</sub> to Q<sub>m</sub>.`,
          `Real-world example: carbon emissions from burning fossil fuels. Every ton of CO₂ emitted imposes costs (climate change, extreme weather, rising sea levels) that the emitting firm doesn't pay — a textbook negative externality of production.`
        ],
        examTip: `Always draw the welfare loss triangle precisely and shade it. Label Q<sub>m</sub> (market quantity), Q<sub>opt</sub> (socially optimal quantity), and the MEC gap clearly. Many students lose marks for vague diagrams.`
      },
      {
        title: 'Negative Externalities of Consumption',
        points: [
          `Here, the social benefit of consumption is <strong>less</strong> than the private benefit — or equivalently, consumption imposes <strong>external costs</strong> on third parties. The consumer enjoys the full private benefit but others suffer.`,
          `Smoking is the classic example: the smoker gets nicotine satisfaction (MPB) but imposes costs on others — passive smoking health risks, NHS treatment costs, reduced workplace productivity. Alcohol consumption imposes costs on families, the police, and the healthcare system. Driving a petrol car imposes congestion and pollution on everyone else.`,
          `On a diagram: the MSB curve lies <strong>below</strong> the MPB (demand) curve. The market produces Q<sub>m</sub> (where MPC = MPB), but the social optimum is Q<sub>opt</sub> (where MPC = MSB). Since Q<sub>m</sub> > Q<sub>opt</sub>, there's <strong>overconsumption</strong>.`,
          `The distinction between production and consumption externalities matters for policy. Production externalities are best tackled by policies aimed at firms (taxes, permits, regulation). Consumption externalities may need policies aimed at consumers (taxes on the product, information campaigns, bans).`
        ]
      },
      {
        title: 'Positive Externalities of Production',
        points: [
          `Here, society benefits more than the firm. The firm's production creates benefits that spill over to third parties — <strong>MSC < MPC</strong> (or equivalently, there's a negative MEC, which acts as an external benefit on the cost side).`,
          `A tech firm investing in R&D creates knowledge that other firms can build on — Apple's smartphone innovation benefited the entire app development ecosystem. A farmer maintaining hedgerows provides biodiversity benefits and flood prevention for the wider community. Training workers benefits other employers when those workers move jobs (skills spillovers).`,
          `On a diagram: the MSC curve lies <strong>below</strong> MPC. The market produces Q<sub>m</sub>, but the social optimum is Q<sub>opt</sub> > Q<sub>m</sub>. There's <strong>underproduction</strong> — society would benefit from more.`
        ]
      },
      {
        title: 'Positive Externalities of Consumption',
        points: [
          `Here, consuming the good generates benefits beyond what the individual consumer enjoys — <strong>MSB > MPB</strong>. The gap is the <strong>Marginal External Benefit (MEB)</strong>.`,
          `<strong>Education</strong> is the strongest example: you benefit personally (higher earnings, broader horizons), but society also benefits — more educated citizens are more productive, commit less crime, participate more in democracy, and generate innovations that benefit everyone. <strong>Vaccination</strong> protects you, but also creates <strong>herd immunity</strong> that protects those who can't be vaccinated. Exercise reduces your risk of disease but also reduces NHS costs for society.`,
          `On a diagram: MSB lies <strong>above</strong> MPB. The market produces Q<sub>m</sub> (where MPC = MPB), but the social optimum is Q<sub>opt</sub> (where MPC = MSB). Since Q<sub>m</sub> < Q<sub>opt</sub>, there's <strong>underconsumption</strong>.`,
          `This is one of the most important market failures because it justifies government provision of education and healthcare — without intervention, people would consume less than the socially optimal amount because they don't capture all the benefits.`
        ],
        examTip: `For positive externalities, always explain both the private benefit (what the consumer gets) AND the external benefit (what society gets). "Education benefits the individual through higher earnings AND society through lower crime and higher productivity." This chain of reasoning is what earns full marks.`
      }
    ]
  },
  {
    title: 'Public Goods',
    concepts: [
      {
        title: 'Characteristics of Public Goods',
        points: [
          `A <strong>public good</strong> has two defining characteristics. <strong>Non-rival</strong>: one person consuming the good doesn't reduce its availability to others — a lighthouse illuminates the sea for every ship simultaneously, and there's zero marginal cost for an additional user. <strong>Non-excludable</strong>: you can't prevent anyone from benefiting, even if they don't pay — you can't stop ships seeing the lighthouse or people benefiting from national defence.`,
          `Classic examples: national defence, street lighting, flood defences, lighthouses, public firework displays. These goods benefit everyone in a community regardless of whether they've paid for them.`,
          `<strong>Quasi-public goods</strong> have some but not all characteristics. Roads are non-excludable (mostly) but become <strong>rival when congested</strong>. Parks are non-rival at low usage but rival when overcrowded. A swimming pool is excludable (charge entry) but non-rival up to capacity. The BBC is non-rival but could be made excludable (encryption). In exams, discussing whether a good is "purely" public or quasi-public shows analytical depth.`
        ]
      },
      {
        title: 'The Free-Rider Problem',
        points: [
          `Non-excludability creates the <strong>free-rider problem</strong>: if you benefit whether you pay or not, why would you pay? If everyone thinks this way, nobody pays, no revenue is generated, and private firms can't profitably supply the good. This is <strong>complete market failure</strong> — the market produces <strong>zero</strong> of a good that society clearly values.`,
          `Think of it with national defence: if you could opt out of paying taxes for defence but still be protected (because the army defends the whole country), you'd be a free rider. If everyone free rides, there's no army. The same logic applies to street lighting, flood barriers, and public health measures.`,
          `The solution is <strong>government provision funded by taxation</strong>. Everyone pays through taxes (compulsory — no free riding) and the government provides the good. This is why libertarians who want minimal government still accept state provision of defence and law enforcement — the free-rider problem has no market solution.`
        ],
        examTip: `Don't just state "non-rival and non-excludable" — explain why each characteristic causes market failure. Non-excludability → free-rider problem → no revenue → no private provision. Non-rivalry → zero marginal cost → charging a price would be allocatively inefficient anyway.`
      }
    ]
  },
  {
    title: 'Merit Goods & Demerit Goods',
    concepts: [
      {
        title: 'Merit Goods',
        points: [
          `<strong>Merit goods</strong> are underconsumed in the free market for <strong>two</strong> reinforcing reasons: they generate <strong>positive externalities</strong> (benefits to society beyond the consumer) <em>and</em> consumers suffer from <strong>information failure</strong> (they underestimate the long-term benefits).`,
          `Education is the textbook example: a teenager might not appreciate the full value of staying in school (information failure), and society benefits from their education through higher productivity, lower crime, and better health outcomes (positive externality). Healthcare is similar — people underestimate the value of preventive care and exercise, and a healthier population benefits everyone.`,
          `Other merit goods: museums and libraries (cultural and educational externalities + people undervalue them), vaccinations (herd immunity externality + people underestimate disease risk), cycling infrastructure (health and environmental externalities + people undervalue the benefits of active transport).`,
          `Because merit goods are underconsumed, the government intervenes: subsidising them, providing them free (state education, NHS), or mandating consumption (compulsory education until 18 in England).`
        ]
      },
      {
        title: 'Demerit Goods',
        points: [
          `<strong>Demerit goods</strong> are overconsumed for the mirror reasons: they generate <strong>negative externalities</strong> <em>and</em> consumers suffer from <strong>information failure</strong> (they underestimate the harm or are too influenced by present bias to care).`,
          `Cigarettes: smokers underestimate health risks (especially young people — information failure and present bias) and impose costs on others through passive smoking and NHS burden (negative externality). Alcohol: drinkers underestimate addiction risk and impose costs on families, police, and the healthcare system. Fast food high in sugar: consumers underestimate long-term health consequences; obesity imposes costs on the NHS.`,
          `The government intervenes to reduce consumption: taxation (cigarette duty, sugar levy), regulation (smoking bans in public places, advertising restrictions), information provision (health warnings, nutritional labelling), and in extreme cases, prohibition.`,
          `The key distinction that examiners specifically test: merit/demerit goods involve <strong>both externalities AND information failure</strong>. If there were only externalities without information failure, the good would be misallocated but wouldn't be a merit/demerit good. And here's the tension: defining something as a merit or demerit good involves a <strong>value judgement</strong> by the government about what people <em>should</em> consume — which is inherently normative and paternalistic. Who decides what's "good for you"?`
        ],
        examTip: `The dual condition is crucial: merit/demerit goods = externalities + information failure. If a question asks "Is alcohol a demerit good?", you must demonstrate BOTH — the external costs on others AND the information failure (consumers underestimate harm or are addicted). Miss either and you haven't fully answered.`
      }
    ]
  },
  {
    title: 'Information Failures',
    concepts: [
      {
        title: 'Asymmetric & Imperfect Information',
        points: [
          `<strong>Imperfect information</strong> means consumers or producers lack the knowledge needed for efficient decisions. If you can't judge the quality of a used car, you might overpay for a bad one or refuse to buy at all — both outcomes are inefficient.`,
          `<strong>Asymmetric information</strong> is a specific and more dangerous type: <strong>one side knows more than the other</strong>. The seller of a used car knows its full history; the buyer doesn't. The employee knows how hard they really work; the employer can't fully monitor. An insurance applicant knows their true health; the insurer doesn't.`,
          `This creates <strong>adverse selection</strong> — a problem that occurs <em>before</em> a transaction. In health insurance: sick people are more likely to buy cover (they know they'll need it), healthy people are less likely (they'd be overpaying). This drives up premiums, pushing out more healthy people, driving up premiums further — a potential "death spiral." George Akerlof's famous "Market for Lemons" paper showed how this can destroy entire markets.`,
          `Asymmetric information in the labour market: employers can't perfectly assess worker quality before hiring. Signalling (degrees, certifications) and screening (probation periods, interviews) are market responses to this problem.`
        ]
      },
      {
        title: 'Moral Hazard',
        points: [
          `<strong>Moral hazard</strong> occurs <em>after</em> an agreement — one party takes greater risks because they don't bear the full consequences. Fully insured car owners might park in riskier areas. Fully bailed-out banks might take excessive financial risks. Workers with strong job protection might shirk.`,
          `The 2008 financial crisis is the most devastating example: banks took enormous risks with complex financial instruments partly because they expected government bailouts if things went wrong ("too big to fail"). When Lehman Brothers collapsed and others were indeed bailed out, the moral hazard was confirmed — risk-taking was privatised (profits to shareholders) while losses were socialised (taxpayers paid for bailouts).`,
          `Solutions: <strong>co-payments</strong> (making the insured share costs — if you pay the first £500 of any car repair, you'll park more carefully), <strong>no-claims bonuses</strong> (rewarding careful behaviour), <strong>excess charges</strong> and <strong>deductibles</strong>, <strong>monitoring</strong> and <strong>performance-related pay</strong>. In banking: stricter capital requirements and stress tests aim to reduce moral hazard by ensuring banks have "skin in the game."`,
          `In exams, always specify whether you're discussing adverse selection (before the transaction) or moral hazard (after the agreement) — they have different causes and different solutions.`
        ],
        examTip: `Timing is the key distinction: adverse selection = before the deal (wrong types self-select into the market). Moral hazard = after the deal (behaviour changes because risk is transferred). The 2008 financial crisis is a powerful example for both.`
      }
    ]
  },
  {
    title: 'Market Power as Market Failure',
    concepts: [
      {
        title: 'Monopoly & Market Power',
        points: [
          `A firm with <strong>monopoly power</strong> can restrict output and set price above marginal cost (<strong>P > MC</strong>), which creates <strong>allocative inefficiency</strong>. Consumers who value the good more than it costs to produce are priced out of the market, and total welfare falls.`,
          `The result: a <strong>deadweight welfare loss</strong> triangle. Consumer surplus is transferred to the firm as <strong>supernormal profit</strong>, and some surplus is destroyed entirely — trades that would have benefited both buyer and seller don't happen.`,
          `Monopolies may also suffer from <strong>X-inefficiency</strong> — without competitive pressure, costs creep up (bloated management, unnecessary spending, complacency). Why minimise costs when no rival is breathing down your neck?`,
          `But the counter-argument is powerful: monopolists may achieve <strong>economies of scale</strong> (natural monopolies like water companies operate more efficiently as one large firm than many small ones), and supernormal profits fund <strong>R&D investment</strong>, driving <strong>dynamic efficiency</strong> and innovation. Without patent protection (a legal temporary monopoly), pharmaceutical companies might not invest billions in developing new drugs.`,
          `This trade-off — <strong>static inefficiency now vs dynamic efficiency later</strong> — is central to competition policy. It's why governments regulate monopolies rather than simply banning them. In exams, never give a one-sided answer on monopoly: weigh the welfare loss against potential scale and innovation benefits.`
        ],
        examTip: `The strongest answers balance both sides: "While the monopolist creates deadweight loss through P > MC, this must be weighed against potential economies of scale and dynamic efficiency from R&D investment financed by supernormal profits." Evaluate which effect dominates in the specific context.`
      }
    ]
  },
  {
    title: 'Welfare Loss & Deadweight Loss',
    concepts: [
      {
        title: 'Identifying Welfare Loss on Diagrams',
        points: [
          `<strong>Welfare loss (deadweight loss)</strong> is the net loss to society from a market not operating at the allocatively efficient output. It appears as a <strong>triangle</strong> on diagrams between the social and private curves, from the market quantity to the socially optimal quantity.`,
          `For <strong>negative externalities</strong>: the triangle is between MSC and MPC (or MPB/MSB), from Q<sub>opt</sub> to Q<sub>m</sub>. It represents the excess social cost of overproduction. For <strong>positive externalities</strong>: the triangle is between MSB and MPB, from Q<sub>m</sub> to Q<sub>opt</sub>. It represents the lost social benefit of underproduction.`,
          `For <strong>taxes</strong>: the deadweight loss triangle represents trades that no longer occur because the tax has raised the price above what some buyers will pay and below what some sellers need. For <strong>monopoly</strong>: it represents consumers priced out of the market by P > MC.`,
          `In any intervention question, the deadweight loss triangle is your analytical anchor. Draw it precisely, shade it clearly, and explain what it represents. The purpose of government intervention is (ideally) to <strong>eliminate or reduce</strong> this triangle — corrective taxes move Q<sub>m</sub> toward Q<sub>opt</sub>, shrinking the welfare loss. But poorly designed intervention can create <em>new</em> deadweight loss (government failure).`
        ],
        examTip: `Always shade and label the welfare loss triangle. Explain what it represents in words: "The triangle represents the net welfare loss to society from overproduction — the area where MSC exceeds MSB between Q<sub>opt</sub> and Q<sub>m</sub>." Diagram + explanation = full marks.`
      }
    ]
  }
],


'government-intervention': [
  {
    title: 'Indirect Taxes to Correct Negative Externalities',
    concepts: [
      {
        title: 'Using Taxes to Internalise External Costs',
        points: [
          `The logic is elegant: if a negative externality means the polluter isn't paying the full cost to society, <strong>make them pay it</strong>. Set a tax equal to the <strong>Marginal External Cost (MEC)</strong> at the socially optimal output. This "internalises the externality" — the MPC curve shifts up to align with MSC, and the market naturally settles at Q<sub>opt</sub>.`,
          `On a diagram: the tax shifts the supply curve (MPC) upward by the amount of the tax. If the tax equals MEC at Q<sub>opt</sub>, the new market equilibrium produces exactly the socially optimal quantity. The welfare loss triangle disappears.`,
          `The UK's <strong>Landfill Tax</strong> (escalating from £7/tonne in 1996 to over £100/tonne today) dramatically reduced waste going to landfill by making dumping expensive relative to recycling. The <strong>London Congestion Charge</strong> (£15/day to drive in central London) reduced traffic volumes by 15–20%. Both are Pigouvian taxes that shift private costs closer to social costs.`
        ]
      },
      {
        title: 'Evaluation of Indirect Taxes',
        points: [
          `<strong>Advantages</strong>: market-based (firms choose whether to pay the tax, change behaviour, or invest in cleaner methods), generates <strong>revenue</strong> for the government (a "double dividend" — corrects the externality AND raises funds), creates <strong>ongoing incentives</strong> for innovation (the cheaper you can cut pollution, the less tax you pay).`,
          `<strong>Problems</strong>: calculating the exact MEC is <strong>extremely difficult</strong> — how do you put a precise pound figure on the health damage from air pollution? If the tax is too low, overproduction continues; too high, you've overcorrected and created a new distortion (government failure). Taxes on necessities like fuel can be <strong>regressive</strong> — lower-income households spend a larger share of income on these goods.`,
          `If demand is <strong>very inelastic</strong> (cigarettes, petrol), the tax raises revenue but barely changes behaviour — it becomes a revenue tool rather than a corrective one, which defeats the purpose. There's also a risk of <strong>carbon leakage</strong>: if one country taxes pollution heavily, firms may relocate to countries with lighter regulation, so global pollution doesn't fall.`
        ],
        examTip: `The best evaluation asks: "Does this tax actually reduce the externality, or does it just raise revenue?" If demand is very inelastic, the tax mostly raises revenue without much correction — and the burden falls on consumers. Always link effectiveness to PED.`
      }
    ]
  },
  {
    title: 'Subsidies to Correct Positive Externalities',
    concepts: [
      {
        title: 'Using Subsidies to Internalise External Benefits',
        points: [
          `For positive externalities, the market underproduces. A subsidy equal to the <strong>Marginal External Benefit (MEB)</strong> at Q<sub>opt</sub> shifts the supply curve right, increasing output to the socially optimal level at a lower price.`,
          `Germany's virtually free university tuition is a massive subsidy for higher education — justified by the enormous positive externalities (more productive workforce, more innovation, lower crime). China's subsidies for solar panel manufacturing helped it achieve economies of scale and become the world's largest producer, addressing the positive externality of reduced carbon emissions globally.`,
          `On a diagram: the subsidy shifts S right/down, lowering market price and increasing quantity toward Q<sub>opt</sub>. The welfare loss triangle from underproduction shrinks or disappears.`
        ]
      },
      {
        title: 'Evaluation of Subsidies',
        points: [
          `<strong>Advantages</strong>: increases consumption/production of socially beneficial goods, lowers cost for consumers, can stimulate growth in strategic industries. Unlike bans or mandates, subsidies work <em>with</em> market forces rather than against them.`,
          `<strong>Problems</strong>: significant <strong>opportunity cost</strong> — every pound of subsidy is a pound not spent on hospitals, schools, or tax cuts. It's funded by taxpayers. Calculating the precise MEB is just as hard as calculating MEC, risking over- or under-correction.`,
          `Subsidies can create <strong>dependency</strong> — firms that only survive because of subsidies are not allocating resources efficiently. They may be <strong>poorly targeted</strong>: electric car subsidies mostly benefit wealthier households who can afford electric vehicles. Agricultural subsidies often benefit large agribusinesses rather than small farmers who need them most.`,
          `There's always a risk of <strong>government failure</strong>: the subsidy overshoots (overproduction beyond Q<sub>opt</sub>), undershoots (still not enough produced), or goes to the wrong recipients. And once in place, subsidies are politically very hard to remove — beneficiaries lobby fiercely to keep them.`
        ]
      }
    ]
  },
  {
    title: 'Maximum Prices (Price Ceilings)',
    concepts: [
      {
        title: 'How Maximum Prices Work',
        points: [
          `A <strong>maximum price (price ceiling)</strong> is a legal limit set <strong>below the equilibrium</strong> — making a good more affordable. If set above equilibrium, it has no effect (the market already clears below the ceiling).`,
          `The textbook examples: <strong>rent controls</strong> (cities like New York, Berlin, and Stockholm cap rents to protect tenants), food price controls in developing countries during crises, and interest rate caps on payday loans.`,
          `On a diagram: at the maximum price, Q<sub>d</sub> > Q<sub>s</sub> — a <strong>persistent shortage</strong>. The gap between quantity demanded and quantity supplied cannot close because the price mechanism is blocked from adjusting upward.`
        ]
      },
      {
        title: 'Effects, Advantages & Disadvantages',
        points: [
          `<strong>Advantages</strong>: improves affordability for consumers, protects vulnerable groups (low-income renters, people needing essential medicines), can prevent exploitation during emergencies (price gouging after natural disasters).`,
          `<strong>Disadvantages</strong>: the shortage is the core problem. Not everyone who wants the good can get it, so <strong>rationing</strong> becomes necessary — queues, waiting lists, or arbitrary allocation. <strong>Black markets</strong> often emerge where the good is sold illegally at higher prices.`,
          `Long-run consequences can be severe. Rent controls <strong>reduce supply incentive</strong>: landlords have less incentive to build new properties, maintain existing ones, or even keep them on the rental market (some convert to owner-occupied). Stockholm's rent controls created a <strong>20-year waiting list</strong> for apartments. Quality deteriorates because there's no competitive pressure to maintain standards.`,
          `A <strong>deadweight loss</strong> is created, and total economic surplus falls. The people the policy aims to help — low-income households — may end up worse off if they can't find housing at all. In exams, always evaluate whether the equity benefit to those who <em>do</em> get the good outweighs the efficiency cost.`
        ],
        examTip: `Draw the diagram showing the shortage gap between Q<sub>d</sub> and Q<sub>s</sub> at the ceiling price, shade the deadweight loss, and evaluate: the policy helps those who get the good at the lower price but hurts those who can't find it at all. Whether it's "worth it" is a normative judgement.`
      }
    ]
  },
  {
    title: 'Minimum Prices (Price Floors)',
    concepts: [
      {
        title: 'How Minimum Prices Work',
        points: [
          `A <strong>minimum price (price floor)</strong> is set <strong>above equilibrium</strong> to guarantee producers a higher income or discourage consumption. If set below equilibrium, it has no effect.`,
          `Key examples: the <strong>EU Common Agricultural Policy</strong> (minimum prices for farm products), <strong>minimum alcohol pricing</strong> (Scotland's 50p per unit minimum, introduced 2018), and the <strong>National Minimum Wage</strong> (a price floor in the labour market).`,
          `On a diagram: at the minimum price, Q<sub>s</sub> > Q<sub>d</sub> — a <strong>persistent surplus</strong>. For agricultural goods, the government may have to buy and store the surplus to maintain the price.`
        ]
      },
      {
        title: 'Effects, Advantages & Disadvantages',
        points: [
          `<strong>Advantages</strong>: guarantees minimum income for producers (protecting farmers from volatile markets), can discourage consumption of demerit goods (higher alcohol prices reduce consumption, especially among heavy drinkers who buy cheap, high-strength products). Scotland's minimum alcohol pricing showed early evidence of reduced alcohol-related hospital admissions.`,
          `<strong>Disadvantages</strong>: creates <strong>surpluses</strong> that must be dealt with — the EU's "butter mountains" and "wine lakes" were produced at guaranteed prices and then stockpiled at enormous taxpayer expense, often eventually destroyed or dumped on developing-country markets. Consumer prices are higher. A <strong>deadweight loss</strong> is created.`,
          `In <strong>labour markets</strong>, a minimum wage above equilibrium could theoretically cause <strong>unemployment</strong> among low-skilled workers — firms can't afford to hire at the higher wage. But empirical evidence (Card and Krueger's famous US study, and UK evidence since the National Living Wage) suggests the employment effects are often small, especially when the minimum wage is set close to the market rate. This remains one of the most debated topics in economics.`,
          `Whether a minimum price is good policy depends on the specific market: for demerit goods (alcohol), raising prices reduces harmful overconsumption. For labour markets, it can reduce poverty. For agricultural commodities, it creates waste and market distortion. Context is everything.`
        ],
        examTip: `The minimum wage is a price floor — examiners love this application. Discuss the theoretical prediction (surplus = unemployment) vs the empirical evidence (effects often small). The best answers explain why theory and evidence might diverge: monopsony power, efficiency wages, and low elasticity of labour demand.`
      }
    ]
  },
  {
    title: 'Tradeable Pollution Permits',
    concepts: [
      {
        title: 'How Tradeable Pollution Permits Work',
        points: [
          `<strong>Cap and trade</strong> combines government planning with market forces. The government sets a <strong>cap</strong> on total permitted emissions, issues permits up to that limit, and lets firms <strong>trade</strong> them on a market. Each permit allows one unit of emission (e.g., one tonne of CO₂).`,
          `Firms that can cut emissions cheaply do so and sell their spare permits for profit. Firms that find it expensive to cut emissions buy permits instead. The result: the environmental target is met at the <strong>lowest possible cost</strong> to the economy, because emission reductions happen wherever they're cheapest.`,
          `The <strong>EU Emissions Trading System (EU ETS)</strong> is the world's largest, covering power stations, heavy industry, and airlines. It creates a carbon price that incentivises long-term investment in cleaner technology. By reducing the cap over time, the government ratchets down total emissions predictably.`,
          `Key advantage over a tax: cap and trade <strong>guarantees the quantity of emissions</strong> (the cap sets the total). A tax sets the <em>price</em> of emissions but can't guarantee how much pollution actually results — firms might just pay the tax and keep polluting.`
        ]
      },
      {
        title: 'Evaluation of Tradeable Pollution Permits',
        points: [
          `<strong>Advantages</strong>: achieves environmental targets cost-effectively, creates a market-driven incentive for clean technology investment, provides certainty on total emissions, and can generate revenue if permits are auctioned (as in the EU ETS).`,
          `<strong>Problems</strong>: if the cap is set <strong>too generously</strong> (as the EU initially did), the carbon price collapses to near-zero and provides no incentive to cut emissions — the scheme becomes meaningless. <strong>Price volatility</strong> makes long-term investment planning difficult for firms. Industries lobby aggressively for free permits, undermining the scheme's effectiveness.`,
          `<strong>Monitoring and enforcement</strong> are costly — you need to verify that firms actually hold permits for their emissions. There's a risk of <strong>pollution hotspots</strong> — trading permits between regions doesn't prevent concentrated pollution in one area, which can be devastating for local communities even if the national total is within the cap.`,
          `The scheme only works as well as the cap is set. Too loose and it's pointless; too tight and it drives up costs, potentially pushing firms to relocate to unregulated countries (carbon leakage). Getting the balance right is the central challenge.`
        ],
        examTip: `Compare cap and trade with a carbon tax: "A tax provides price certainty but quantity uncertainty; cap and trade provides quantity certainty but price uncertainty." This comparison shows high-level understanding of the trade-offs.`
      }
    ]
  },
  {
    title: 'State Provision & Provision of Information',
    concepts: [
      {
        title: 'State Provision of Public Goods & Merit Goods',
        points: [
          `<strong>State provision</strong> is necessary for <strong>public goods</strong> — the free-rider problem means no private firm will supply national defence, street lighting, or flood defences. The government provides them, funded by taxation (compulsory payment eliminates free riding).`,
          `For <strong>merit goods</strong>, state provision ensures consumption doesn't depend on ability to pay. The NHS provides healthcare free at the point of use. State schools provide free education up to 18. Without state provision, underconsumption would persist because of information failure (people undervalue these goods) and inability to pay (the poor would be excluded).`
        ]
      },
      {
        title: 'Evaluation of State Provision',
        points: [
          `<strong>Advantages</strong>: ensures universal access regardless of income, overcomes the free-rider problem, corrects underconsumption of merit goods, can reduce inequality.`,
          `<strong>Problems</strong>: significant <strong>opportunity cost</strong> (resources used here can't fund other priorities), potential for <strong>productive inefficiency</strong> (no profit motive to minimise costs — the NHS has been criticised for management bloat), <strong>political influence</strong> distorting allocation (spending directed to marginal constituencies rather than where need is greatest), and bureaucracy slowing decision-making and innovation.`,
          `State provision doesn't mean the state must <em>produce</em> the good — governments can fund but outsource delivery (NHS uses private contractors, state schools can be run by academy trusts). This hybrid model tries to combine universal access with competitive efficiency.`
        ]
      },
      {
        title: 'Provision of Information',
        points: [
          `<strong>Information provision</strong> is the least intrusive intervention: health warnings on cigarette packs, nutritional labelling on food, public health campaigns, financial literacy programmes, school drug education. It aims to correct information failure by giving consumers the knowledge they need to make better decisions.`,
          `It's cheap compared to other interventions, doesn't restrict freedom (you're informed, not forced), and can be effective over time: UK anti-smoking campaigns contributed to a halving of smoking rates since the 1970s. Mandatory calorie counts on restaurant menus (introduced in the UK in 2022 for large chains) aim to shift eating habits.`
        ]
      },
      {
        title: 'Evaluation of Information Provision',
        points: [
          `<strong>Advantages</strong>: low cost, preserves consumer freedom, targets the root cause (information failure), can have long-lasting cultural effects.`,
          `<strong>Problems</strong>: relies on people actually <em>acting</em> on the information, which behavioural economics tells us they often don't. <strong>Addiction</strong> overrides information (smokers know cigarettes kill — they still smoke). <strong>Present bias</strong> means people discount future harm (teenagers won't worry about lung cancer at 60). <strong>Information overload</strong> means warnings get ignored (you've stopped reading the small print on every product you buy).`,
          `Information provision works best as part of a package — combine it with taxes, regulation, or nudges for greater impact. On its own, it's often too slow and too weak to address serious demerit good problems.`
        ],
        examTip: `Information provision is often the "safe" intervention to recommend in evaluation — it's cheap and non-coercive. But always acknowledge its limitations: behavioural economics shows people don't always act on information. The best answers combine information with other policies.`
      }
    ]
  },
  {
    title: 'Regulation & Deregulation',
    concepts: [
      {
        title: 'Regulation',
        points: [
          `<strong>Regulation</strong> is command-and-control intervention: the government sets legal rules that firms must follow. Examples: emission limits on vehicles, health and safety standards, minimum food hygiene requirements, financial regulations (capital adequacy ratios for banks), smoking bans in public places, planning permission requirements.`,
          `<strong>Advantages</strong>: effective for outright bans on dangerous activities (asbestos, CFCs, lead in petrol — all eliminated through regulation), provides legal certainty, protects consumers and workers from harm, and is straightforward to understand.`
        ]
      },
      {
        title: 'Evaluation of Regulation',
        points: [
          `<strong>Problems</strong>: <strong>costly enforcement</strong> (someone needs to inspect, monitor, and prosecute — this costs taxpayer money), <strong>one-size-fits-all</strong> rules ignore that compliance costs vary hugely between firms (a regulation that's cheap for a large firm might bankrupt a small one), and <strong>regulatory capture</strong> — the industry being regulated effectively influences or controls the regulator.`,
          `The 2008 financial crisis is often attributed partly to regulatory failure — regulators either didn't understand the complex instruments banks were trading or were too cosy with the industry to challenge them. Regulation can also stifle innovation: overly strict rules may prevent new firms from entering or new products from reaching market.`
        ]
      },
      {
        title: 'Deregulation',
        points: [
          `<strong>Deregulation</strong> means removing or reducing regulations to promote competition, efficiency, and innovation. The UK deregulated bus services in the 1980s, telecoms in the 1990s, and energy markets to introduce competition. The theory: more competition drives prices down, improves quality, and stimulates innovation.`,
          `<strong>Advantages</strong>: lower prices from increased competition, greater consumer choice, reduced compliance costs for firms, dynamic efficiency (innovation driven by competitive pressure). Telecoms deregulation in the UK transformed the market — BT's monopoly ended, and competition drove massive investment in broadband and mobile networks.`,
          `<strong>Problems</strong>: deregulation of financial markets in the US and UK during the 1990s and 2000s contributed to the <strong>excessive risk-taking</strong> that caused the 2008 financial crisis. Some regulation exists for good reason — removing it without understanding what it was preventing can be catastrophic. Deregulation can also lead to reduced quality and safety standards (privatised rail services in the UK have been criticised for poor punctuality and safety issues) and may increase monopoly power if one firm dominates once barriers are removed.`
        ]
      }
    ]
  },
  {
    title: 'Government Failure',
    concepts: [
      {
        title: 'What Is Government Failure?',
        points: [
          `<strong>Government failure</strong> occurs when intervention makes things <strong>worse</strong> — either creating a <strong>net welfare loss</strong> or failing to correct the original market failure. It's the mirror image of market failure, and it's the reason we can't simply assume that intervention improves outcomes.`,
          `Government failure doesn't mean the government shouldn't intervene — it means intervention carries risks and costs that must be weighed against the market failure it's trying to fix.`
        ]
      },
      {
        title: 'Causes of Government Failure',
        points: [
          `<strong>Imperfect information</strong>: governments don't know the exact MEC, MEB, or the optimal level of output. Setting a tax too high or too low, subsidising the wrong amount, or regulating based on incomplete data leads to suboptimal outcomes.`,
          `<strong>Unintended consequences</strong>: policies create ripple effects that weren't anticipated. EU biofuel mandates (intended to reduce carbon emissions) led to tropical deforestation as farmers cleared land for biofuel crops — actually <em>increasing</em> net emissions. The UK's Help to Buy scheme (intended to help first-time buyers) inflated house prices, making affordability worse.`,
          `<strong>Administrative and compliance costs</strong>: regulation requires enforcement, monitoring, and bureaucracy — all of which consume resources that could be used elsewhere. These costs may exceed the benefits of the intervention.`,
          `<strong>Political self-interest</strong>: governments make decisions with elections in mind. Short-term vote-winning policies (tax cuts before elections, spending directed at marginal constituencies) may not align with long-term economic efficiency.`,
          `<strong>Regulatory capture</strong>: the industry being regulated gains influence over the regulator, ensuring rules serve the industry's interests rather than the public's. Revolving doors between regulators and the firms they oversee are common — a regulator who expects to work for the industry next year has weak incentives to be tough.`,
          `<strong>Moral hazard from intervention itself</strong>: if firms expect bailouts, they take more risk. If workers expect the state to provide, they may reduce personal effort. Government intervention can change incentives in counterproductive ways.`
        ]
      },
      {
        title: 'Examples of Government Failure',
        points: [
          `<strong>EU Common Agricultural Policy (CAP)</strong>: minimum prices for agricultural products created enormous surpluses ("butter mountains," "wine lakes") at huge taxpayer expense. Food was stockpiled, destroyed, or dumped on developing-country markets, undermining local farmers.`,
          `<strong>Rent controls</strong>: in cities worldwide (New York, Berlin, Stockholm), price ceilings created housing shortages, reduced investment in new housing, deteriorated quality, and created long waiting lists — often harming the very people they were meant to help.`,
          `<strong>Financial deregulation before 2008</strong>: removing regulations was supposed to boost innovation and efficiency. Instead, it enabled excessive risk-taking that caused the worst financial crisis since the 1930s, requiring massive taxpayer-funded bailouts.`,
          `<strong>Biofuel mandates</strong>: designed to reduce carbon emissions by replacing fossil fuels. In practice, they incentivised deforestation in Indonesia and Brazil (to grow palm oil and sugarcane), which released more carbon than the biofuels saved.`
        ],
        examTip: `Real examples are essential for government failure. Memorise 3-4: CAP surpluses, rent control shortages, 2008 financial deregulation, biofuel deforestation. Each illustrates a different cause (poor information, unintended consequences, regulatory capture, etc.).`
      }
    ]
  },
  {
    title: 'Evaluation of Government Intervention Methods',
    concepts: [
      {
        title: 'Comparing Intervention Methods',
        points: [
          `<strong>Market-based interventions</strong> (taxes, subsidies, tradeable permits) work <em>with</em> market forces — they change incentives and let firms/consumers decide how to respond. They're flexible and cost-effective but require accurate information about externality values.`,
          `<strong>Command-and-control interventions</strong> (regulation, bans, maximum/minimum prices) directly mandate behaviour. They're effective for absolute limits (ban asbestos) but inflexible and potentially costly. They don't provide ongoing incentives for improvement — once you meet the standard, there's no reward for going beyond it.`,
          `<strong>Information-based interventions</strong> (labelling, campaigns, education) target information failure directly. They're cheap and non-coercive but often too slow and weak on their own, especially against addiction and present bias.`,
          `<strong>State provision</strong> ensures universal access and overcomes free-rider problems but carries opportunity costs and efficiency risks. Each method has strengths and weaknesses; the best policy mix depends on the specific market failure.`
        ]
      },
      {
        title: 'Key Evaluation Framework',
        points: [
          `The ultimate question for any intervention: does the <strong>benefit of correcting the market failure</strong> outweigh the <strong>cost of the intervention</strong> (including the risk of government failure)?`,
          `Always ask: <strong>What's the counterfactual?</strong> What would happen without intervention? If the market failure is severe (toxic pollution, no national defence), even imperfect intervention is better than nothing. If the market failure is mild, the cure may be worse than the disease.`,
          `Consider <strong>unintended consequences</strong>: does the intervention create new distortions? Rent controls solve short-term affordability but create long-term shortages. Biofuel mandates reduce oil dependence but accelerate deforestation.`,
          `Evaluate <strong>distributional effects</strong>: who wins and who loses? A carbon tax is efficient but may be regressive. A subsidy helps consumers but costs taxpayers. Always consider equity alongside efficiency.`,
          `Consider the <strong>time horizon</strong>: supply-side policies take years to work; demand-side policies act faster. Short-term and long-term effects often differ — a stimulus that works well in a recession might cause inflation during a boom.`,
          `The strongest exam answers avoid one-sided conclusions. Instead: "The intervention is likely to be effective at reducing the externality because... However, the risk of government failure is significant due to... On balance, the net effect depends on..."`,
          `In practice, the best approach is usually a <strong>combination of policies</strong>: taxes + information provision for demerit goods, subsidies + state provision for merit goods, regulation + market-based instruments for pollution. No single tool is sufficient on its own.`
        ],
        examTip: `Structure your evaluation around this framework: (1) Identify the market failure and its severity, (2) Explain how the intervention aims to correct it, (3) Analyse its effectiveness (using elasticity, diagrams, examples), (4) Consider government failure risks, (5) Reach a balanced judgement. This structure guarantees you hit all the mark scheme points.`
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
    const { error } = await supabase.from('section_content').update({ data: content }).eq('section_id', id);
    if (error) console.log(`  ✗ ${id}: ${error.message}`);
    else console.log(`  ✓ ${id} — ${content.length} blocks, ${cc} concepts, ${pc} points`);
  }
  console.log('\nDone.');
}
main();
