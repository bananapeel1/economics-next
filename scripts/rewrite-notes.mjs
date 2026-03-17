import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://trweeckuswgkenckeqfb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);

/* ═══════════════════════════════════════════════════════════
 *  REVVY LEARN — CONTENT REWRITE
 *  Scope: Edexcel IAL Economics Units 1 & 2
 *
 *  Follows the 7 Writing Rules:
 *  1. No circular definitions — build intuition first
 *  2. Real specific examples (countries, companies, events)
 *  3. "So what" — connect to exam application
 *  4. Merge fragmented bullets into flowing explanations
 *  5. Contrast and tension — warn about examiner traps
 *  6. Bold key terms on first use
 *  7. Warm, direct, second-person teacher tone
 * ═══════════════════════════════════════════════════════════ */

const SECTIONS = {

/* ─────────────────────────────────────────────────
 *  1. INTRODUCTORY CONCEPTS (1.3.1)
 * ───────────────────────────────────────────────── */
'introductory-concepts': [
  {
    title: 'Economics as a Social Science',
    points: [
      `At its core, <strong>economics</strong> asks one question: how do societies decide what to produce, how to produce it, and who gets it — when there will never be enough resources for everything people want? Every economic debate, from minimum wages in the UK to carbon taxes in the EU, traces back to this tension between unlimited wants and limited resources.`,
      `Because the real economy is impossibly complex, economists build simplified <strong>models</strong>. A model strips away everything except the relationship you're studying and holds the rest constant — that's what <strong>ceteris paribus</strong> ("all else equal") means. Think of it like a lab experiment: you change one variable and keep everything else fixed. If a model's predictions don't match real-world data, economists revise it — so models are tools for thinking, not claims of truth.`,
      `A <strong>positive statement</strong> is a factual claim you could test with data — it might be right or wrong, but evidence can settle it. "UK unemployment rose by 2% last year" is positive. A <strong>normative statement</strong> is a value judgement — "unemployment is too high" depends on what you think is acceptable, so no data can resolve it. Watch for words like <em>should</em>, <em>ought</em>, <em>fair</em>, <em>too much</em> — these are normative giveaways.`,
      `Here's where exams get tricky: the line blurs in practice. "Inequality has increased" is positive (you can measure a Gini coefficient). "Inequality is a problem" is normative (that's an opinion). This is exactly why two economists can look at the same data and recommend opposite policies — and why <em>evaluate</em> questions never have a single right answer. Practise spotting the opinion-loaded language in any policy recommendation.`
    ]
  },
  {
    title: 'Scarcity and Opportunity Cost',
    points: [
      `Every society faces the same fundamental problem: people's wants are unlimited, but the resources to satisfy them — land, labour, capital, enterprise — are not. This is <strong>scarcity</strong>, and it's not about being poor. Even the richest countries face it: the US government can't fund unlimited healthcare <em>and</em> unlimited defence <em>and</em> unlimited education. Choices must be made.`,
      `Whenever you choose one thing, you give up the next best alternative. That's the <strong>opportunity cost</strong> — and it applies to individuals, firms, and governments alike. If the UK government spends £50 billion on HS2, the opportunity cost might be 10 new hospitals. Crucially, it's the <em>next best</em> alternative, not all alternatives — examiners penalise students who list every possible alternative instead of identifying the single best forgone option.`,
      `<strong>Economic goods</strong> have an opportunity cost — producing more of one means producing less of another. <strong>Free goods</strong>, in theory, do not (sunlight, for example). But very few goods are truly free in practice: clean air now has an opportunity cost because we spend resources reducing pollution. In exams, always frame choices in terms of opportunity cost — it shows you're thinking like an economist.`
    ]
  },
  {
    title: 'PPF Key Points',
    points: [
      `The <strong>production possibility frontier (PPF)</strong> shows all the maximum combinations of two goods an economy can produce when using all its resources efficiently. Any point <em>on</em> the curve is <strong>productively efficient</strong> — you can't produce more of one good without sacrificing some of the other. Points <em>inside</em> the curve mean wasted resources (unemployment, inefficiency). Points <em>outside</em> are currently unattainable.`,
      `Most PPFs are drawn concave (bowed outward), and there's a good reason: as you shift resources from one industry to another, you hit <strong>increasing opportunity costs</strong>. Farmland converted to build factories is increasingly less suitable — the first fields you give up are poor quality, but eventually you're paving over your most fertile soil. That's why each extra unit of the second good costs progressively more of the first.`,
      `An <strong>outward shift</strong> of the PPF represents <strong>economic growth</strong> — the economy can now produce more of everything. This could come from discovering new resources, investing in better technology, or improving education. For example, South Korea's massive investment in education and technology shifted its PPF dramatically outward over 50 years. An <strong>inward shift</strong> means productive capacity has fallen — perhaps from war, natural disaster, or resource depletion.`,
      `Here's a classic exam point: a country that invests more in <strong>capital goods</strong> today (machines, infrastructure) sacrifices some consumer goods now, but shifts its PPF outward faster in the future. This trade-off between present consumption and future growth is central to development economics. When drawing PPF diagrams, always label your axes clearly and mark the specific points you're discussing — examiners want precision, not vague curves.`
    ]
  },
  {
    title: 'Specialisation & Money',
    points: [
      `Adam Smith's famous pin factory example shows why <strong>specialisation</strong> and the <strong>division of labour</strong> are so powerful. One worker making pins alone might produce 20 a day. Ten workers, each specialising in one step, could produce 48,000. Specialisation increases productivity because workers develop expertise, save time switching tasks, and allow mechanisation. But it comes with trade-offs: monotonous work, structural unemployment if that skill becomes obsolete, and interdependence — if one part of the supply chain breaks (as happened globally during COVID-19), everything stalls.`,
      `Specialisation only works with trade, and trade requires <strong>money</strong>. Money serves four functions: a <strong>medium of exchange</strong> (you don't need to barter), a <strong>store of value</strong> (you can save purchasing power), a <strong>unit of account</strong> (everything priced in the same terms), and a <strong>standard of deferred payment</strong> (contracts and loans become possible). Without money, a surgeon who needs bread would have to find a baker who needs surgery — the "double coincidence of wants" problem.`,
      `<strong>Financial markets</strong> channel savings from households into investment by firms. When you deposit money in a bank, that money gets lent to a business expanding its factory. This link between saving and investment is critical for economic growth — countries with well-developed financial systems (like the UK and Singapore) tend to grow faster than those without.`
    ]
  },
  {
    title: 'Economic Systems',
    points: [
      `In a <strong>free market economy</strong>, the <strong>price mechanism</strong> allocates resources — prices signal scarcity, incentivise production, and ration goods to those willing and able to pay. The US leans heavily toward markets. The advantage is efficiency and innovation; the drawback is that markets fail (pollution, inequality, public goods not provided).`,
      `In a <strong>command economy</strong>, the state decides what to produce, how, and for whom. The Soviet Union tried this for decades. It can address equity and provide universal services, but without price signals, resources get misallocated — the USSR famously overproduced steel and underproduced consumer goods. There's also no profit incentive, so productivity tends to stagnate.`,
      `In reality, every economy is a <strong>mixed economy</strong> — the question is where the balance sits. The UK has free markets for most goods but state provision of healthcare (NHS) and education. Singapore relies heavily on markets but the government controls housing. The choice between more market or more state intervention always involves a normative judgement about the trade-off between <strong>efficiency</strong> and <strong>equity</strong> — and that's exactly what evaluation questions are testing you on.`
    ]
  }
],

/* ─────────────────────────────────────────────────
 *  2. CONSUMER BEHAVIOUR & DEMAND (1.3.2a)
 * ───────────────────────────────────────────────── */
'consumer-behaviour-demand': [
  {
    title: 'Rational Consumer & Behavioural Economics',
    points: [
      `Traditional economic theory assumes consumers are <strong>rational</strong> — they weigh up costs and benefits and choose whatever maximises their <strong>utility</strong> (satisfaction). The equi-marginal condition says a rational consumer balances spending so that the last pound spent on every good gives the same marginal utility: <strong>MU<sub>a</sub>/P<sub>a</sub> = MU<sub>b</sub>/P<sub>b</sub></strong>. The law of <strong>diminishing marginal utility</strong> — each extra unit of a good gives you less additional satisfaction — is exactly why demand curves slope downward: you'll only buy more if the price falls to match your falling marginal benefit.`,
      `But people don't always behave rationally. <strong>Behavioural economics</strong> shows that real humans use mental shortcuts, get swayed by emotions, and make predictable errors. We stick with defaults (<strong>inertia</strong>), follow the crowd (<strong>herding</strong> — think crypto bubbles), misjudge probabilities (<strong>poor computation</strong>), and are heavily influenced by how choices are presented (<strong>framing</strong>). Someone might choose a gym membership in January out of optimism and never go — a rational agent wouldn't do that.`,
      `This matters for policy: if people aren't fully rational, the free market doesn't maximise welfare the way theory predicts. It also opens the door to <strong>nudge theory</strong> — designing choices to steer people toward better decisions without removing freedom. Auto-enrolment into UK workplace pensions is a nudge: people can opt out, but most don't. In exams, always consider whether a question assumes rational behaviour or asks you to evaluate that assumption.`
    ]
  },
  {
    title: 'Demand Curve Essentials',
    points: [
      `<strong>Demand</strong> means both the willingness <em>and</em> the ability to buy at a given price — wanting a Lamborghini doesn't count as demand if you can't afford one. The demand curve slopes downward because of diminishing marginal utility and the income/substitution effects of a price change.`,
      `A <strong>movement along</strong> the demand curve happens when the good's own price changes — an increase in price causes a <strong>contraction</strong> of demand (less bought), a decrease causes an <strong>extension</strong> (more bought). A <strong>shift</strong> of the entire curve happens when a non-price factor changes: income, prices of substitutes or complements, tastes, population size, expectations, or interest rates.`,
      `Terminology precision matters in exams: use "extension/contraction" for movements along the curve, and "increase/decrease in demand" for shifts. Saying "demand fell because the price rose" is wrong — <em>quantity demanded</em> fell; demand (the whole relationship) hasn't changed. This distinction trips up students every exam series, and examiners specifically look for it.`
    ]
  },
  {
    title: 'Price Elasticity of Demand (PED)',
    points: [
      `<strong>PED</strong> measures how responsive quantity demanded is to a change in price: <strong>PED = %ΔQd ÷ %ΔP</strong>. It's always negative (law of demand), but we often use the absolute value. If |PED| > 1, demand is <strong>elastic</strong> (quantity changes proportionally more than price). If |PED| < 1, it's <strong>inelastic</strong> (quantity barely responds). At exactly 1, it's <strong>unit elastic</strong>.`,
      `The crucial link to revenue: if demand is <strong>elastic</strong>, cutting the price raises total revenue (the extra quantity more than compensates). If demand is <strong>inelastic</strong>, raising the price raises revenue (customers keep buying). This is why luxury brands like Louis Vuitton can raise prices (elastic demand for their competitors' goods means customers don't switch), while petrol stations can raise prices too (inelastic demand — you still need to drive).`,
      `PED depends on: the number of <strong>substitutes</strong> (more substitutes → more elastic), whether the good is a <strong>necessity or luxury</strong>, the <strong>proportion of income</strong> spent on it, <strong>time</strong> (demand becomes more elastic over time as consumers find alternatives), <strong>habit and addiction</strong> (cigarettes are very inelastic), and how <strong>broadly the market is defined</strong> (demand for "food" is inelastic; demand for "Waitrose organic milk" is elastic).`,
      `A subtle but important point: PED varies along a straight-line demand curve. At the top (high price, low quantity), demand is elastic. At the bottom (low price, high quantity), it's inelastic. Revenue is maximised at the midpoint where PED = 1. Examiners love testing this — don't assume a linear curve has constant elasticity.`
    ]
  },
  {
    title: 'Income Elasticity of Demand (YED)',
    points: [
      `<strong>YED</strong> measures how demand responds to income changes: <strong>YED = %ΔQd ÷ %ΔIncome</strong>. Unlike PED, the sign tells you something important. A <strong>positive</strong> YED means the good is <strong>normal</strong> — demand rises with income. If YED > 1, it's a <strong>luxury</strong> (demand grows faster than income — think designer clothing, international holidays). If 0 < YED < 1, it's a <strong>necessity</strong> (demand grows, but slower than income — rice, basic toiletries).`,
      `A <strong>negative</strong> YED means the good is <strong>inferior</strong> — as income rises, people switch to better alternatives. Instant noodles, budget airlines, second-hand clothing. During recessions, demand for inferior goods actually rises. This matters for firms: supermarkets like Aldi and Lidl thrive in recessions because their goods have negative YED, while luxury retailers suffer. In your exam, always state what the sign means — don't just calculate a number.`
    ]
  },
  {
    title: 'Cross Elasticity of Demand (XED)',
    points: [
      `<strong>XED</strong> measures how demand for good A responds to a price change in good B: <strong>XED = %ΔQd of A ÷ %ΔP of B</strong>. Again, the sign is key. A <strong>positive</strong> XED means the goods are <strong>substitutes</strong> — when Pepsi's price rises, Coca-Cola's demand increases. A <strong>negative</strong> XED means <strong>complements</strong> — when the price of printers rises, demand for ink cartridges falls. XED close to zero means the goods are <strong>unrelated</strong>.`,
      `The absolute value tells you the strength of the relationship. A high positive XED between two products suggests they compete closely — this is exactly how competition authorities (like the UK's CMA) define markets. If XED between two brands is very high, they're in the same market. Firms also use XED for pricing: if your product has a high XED with a competitor's, you need to watch their pricing closely. A strong negative XED with a complement means a price cut on the complement could boost your sales significantly.`
    ]
  }
],

/* ─────────────────────────────────────────────────
 *  3. SUPPLY (1.3.2b)
 * ───────────────────────────────────────────────── */
'supply': [
  {
    title: 'Supply Curve Essentials',
    points: [
      `<strong>Supply</strong> means the willingness <em>and</em> ability of firms to sell at a given price. Just like demand, both conditions must hold — a firm might want to sell at a high price but lack the capacity. The supply curve typically slopes upward: higher prices mean higher profit margins and cover the rising <strong>marginal costs</strong> of production (as firms push output beyond efficient levels, each extra unit costs more to produce).`,
      `A <strong>movement along</strong> the supply curve happens when the good's own price changes — a price rise causes an <strong>extension</strong> of supply, a price fall causes a <strong>contraction</strong>. A <strong>shift</strong> of the whole supply curve happens when a non-price factor changes. Use the same terminology discipline as demand: "extension/contraction" for movements, "increase/decrease in supply" for shifts. Examiners mark this consistently.`
    ]
  },
  {
    title: 'Factors Shifting Supply',
    points: [
      `Anything that changes the <strong>cost of production</strong> shifts supply. Higher wages, energy prices, or raw material costs shift supply <strong>left</strong> (less supplied at every price). Lower costs — from cheaper imports, productivity gains, or falling commodity prices — shift it <strong>right</strong>. When oil prices spiked in 2022 after Russia's invasion of Ukraine, supply curves shifted left across almost every industry because energy is an input to everything.`,
      `<strong>Technology</strong> improvements shift supply right by reducing production costs — think about how automation in car manufacturing (Tesla's Gigafactories) has increased output per worker. <strong>Indirect taxes</strong> shift supply left by adding to costs (the curve shifts up by the tax amount). <strong>Subsidies</strong> shift supply right by reducing costs (the curve shifts down by the subsidy amount). Other factors include the number of firms in the market, weather (critical for agriculture), regulations, and expectations about future prices.`
    ]
  },
  {
    title: 'Price Elasticity of Supply (PES)',
    points: [
      `<strong>PES</strong> measures how responsive quantity supplied is to a price change: <strong>PES = %ΔQs ÷ %ΔP</strong>. It's usually positive (higher price → more supplied). If PES > 1, supply is <strong>elastic</strong> (firms can easily ramp up output). If PES < 1, supply is <strong>inelastic</strong> (firms struggle to respond quickly).`,
      `The key factors are: <strong>spare capacity</strong> (a factory running at 60% can quickly increase output — elastic), <strong>stock levels</strong> (warehoused goods can be released immediately), <strong>factor mobility</strong> (how easily workers and capital can switch industries), <strong>time period</strong> (supply is almost always more elastic in the long run), and the <strong>production cycle</strong> (agricultural goods take months to grow — supply is very inelastic in the short run, which is why food prices are so volatile).`,
      `<strong>Time</strong> is the most important factor. In the <strong>very short run</strong>, all factors are fixed and supply is perfectly inelastic — a concert can't add seats on the night. In the <strong>short run</strong>, at least one factor (usually capital) is fixed, so firms can adjust variable factors only. In the <strong>long run</strong>, all factors are variable — firms can build new factories, enter or exit the market, and supply becomes much more elastic.`
    ]
  },
  {
    title: 'Short Run vs Long Run',
    points: [
      `The distinction between short run and long run is about <strong>factor fixity</strong>, not calendar time. The <strong>short run</strong> is any period where at least one factor of production is fixed (typically capital — you can hire more workers but can't build a new factory overnight). The <strong>long run</strong> is when all factors are variable — firms can expand, shrink, or exit entirely.`,
      `This matters because costs behave differently. In the short run, firms face <strong>diminishing marginal returns</strong> — adding workers to a fixed factory eventually produces less additional output per worker, so marginal costs rise. In the long run, firms can adjust everything and may achieve <strong>economies of scale</strong>. A restaurant's short run might be a few months (can hire chefs, can't expand the kitchen); for a nuclear power plant, the short run could be a decade.`
    ]
  },
  {
    title: 'PES and Its Significance',
    points: [
      `PES matters for everyone in the economy. For <strong>consumers</strong>: when demand rises but supply is inelastic, prices spike sharply. Housing in London has very inelastic supply (limited land, slow construction, planning regulations) — so when demand rises, prices soar instead of new supply appearing. This is why UK house prices have risen far faster than incomes.`,
      `For <strong>governments</strong>: PES affects <strong>tax incidence</strong>. When supply is inelastic, producers bear more of a tax because they can't easily reduce output — they absorb the cost rather than losing sales. Subsidies are more effective at increasing output when supply is elastic — otherwise the subsidy mostly reduces price without much extra production.`,
      `For <strong>price volatility</strong>: goods with inelastic supply (agricultural products, oil, housing) experience much larger price swings when demand changes. This explains why oil prices can double in a year but laptop prices stay stable — one has inelastic supply, the other elastic. In exams, always connect PES to real consequences rather than just defining the formula.`
    ]
  }
],

/* ─────────────────────────────────────────────────
 *  4. PRICE DETERMINATION (1.3.2c)
 * ───────────────────────────────────────────────── */
'price-determination': [
  {
    title: 'Equilibrium',
    points: [
      `<strong>Equilibrium</strong> is where the demand and supply curves intersect — the price at which the quantity buyers want to purchase exactly equals the quantity sellers want to sell (<strong>Qd = Qs</strong>). At this <strong>market-clearing price</strong>, there's no tendency for the price to change. No unsold stock piling up, no frustrated buyers going home empty-handed.`,
      `When <strong>demand increases</strong> (curve shifts right), both equilibrium price and quantity rise — more people want the good, so competition among buyers pushes the price up, which also incentivises more production. When <strong>supply increases</strong> (curve shifts right), price falls but quantity rises — more available at every price, so competition among sellers drives the price down. The magnitude of these changes depends on the <strong>elasticities</strong> of both demand and supply — inelastic curves mean bigger price changes and smaller quantity changes.`,
      `When both curves shift simultaneously, you can predict the direction of one variable but not the other without knowing which shift is larger. For example, if demand and supply both increase, quantity definitely rises — but price could go either way depending on which shift dominates. Examiners love simultaneous shifts because they test whether you understand this ambiguity.`
    ]
  },
  {
    title: 'Excess Demand & Supply',
    points: [
      `If the price is <strong>below equilibrium</strong>, quantity demanded exceeds quantity supplied — there's a <strong>shortage</strong> (excess demand). Buyers compete for the scarce goods, bidding the price up. Sellers see the opportunity and increase output. The price rises until equilibrium is restored. Think of concert ticket resale: when face-value prices are set below the market-clearing level, touts buy up tickets and resell at higher prices.`,
      `If the price is <strong>above equilibrium</strong>, quantity supplied exceeds quantity demanded — there's a <strong>surplus</strong> (excess supply). Unsold stock piles up, so sellers cut prices to shift it. Output falls. The price drops until equilibrium is restored. This is exactly what happens in end-of-season sales — retailers sitting on unsold stock slash prices.`,
      `This self-correcting process is the <strong>price mechanism</strong> at work. Markets tend toward equilibrium without anyone directing them — Adam Smith's "invisible hand." But this only works when prices are free to adjust. Government price controls (maximum or minimum prices) prevent this adjustment, which is precisely why they create persistent shortages or surpluses.`
    ]
  },
  {
    title: 'Consumer & Producer Surplus',
    points: [
      `<strong>Consumer surplus</strong> is the difference between what you're willing to pay and what you actually pay — it's the "bargain" you get. On a diagram, it's the area below the demand curve and above the market price. <strong>Producer surplus</strong> is the difference between the price received and the minimum price a firm would accept — the area above the supply curve and below the market price.`,
      `Together, consumer surplus + producer surplus = <strong>total economic surplus</strong>, which is maximised at the free-market equilibrium. Any intervention that moves the market away from equilibrium — taxes, price controls, quotas — reduces total surplus and creates a <strong>deadweight loss</strong> (a triangle of lost welfare that goes to nobody). This is the core argument for free markets: they maximise total surplus.`,
      `But here's the evaluation point: total surplus being maximised doesn't mean the outcome is <em>fair</em>. A market might be efficient but leave some people unable to afford essentials. That's a normative judgement, and it's exactly the tension you need to discuss in evaluate questions about government intervention.`
    ]
  },
  {
    title: 'Price Mechanism Functions',
    points: [
      `The <strong>price mechanism</strong> performs three crucial functions in a market economy. <strong>Rationing</strong>: when a good is scarce, its price rises, allocating it to those willing and able to pay the most. <strong>Signalling</strong>: prices convey information — a rising price tells producers that demand is strong or supply is short, even if they don't know why. <strong>Incentivising</strong>: price changes motivate behaviour — higher prices incentivise firms to enter a market and consumers to look for substitutes.`,
      `For example, when a drought hits wheat harvests, the price of bread rises. This simultaneously rations bread to those who value it most, signals to farmers worldwide that wheat is scarce, and incentivises increased planting next season. No government committee directed any of this. The limitation, of course, is that "willing and able to pay" excludes the poor — the price mechanism is efficient but not equitable.`
    ]
  },
  {
    title: 'Indirect Taxes & Subsidies',
    points: [
      `A <strong>specific tax</strong> is a fixed amount per unit (e.g., 58p per litre on petrol) — it shifts the supply curve upward by a parallel amount. An <strong>ad valorem tax</strong> is a percentage of the price (e.g., 20% VAT) — the supply curve pivots upward, with the gap widening at higher prices. In both cases, the market price rises by <em>less</em> than the full tax, quantity falls, and a <strong>deadweight loss</strong> triangle appears.`,
      `Who bears the burden? That depends on elasticities. The more <strong>inelastic</strong> side of the market bears the greater share of the tax. If demand is perfectly inelastic (vertical), the consumer pays the entire tax. If supply is perfectly inelastic, the producer absorbs it all. Cigarette taxes fall mostly on consumers (inelastic demand from addiction) — which is why they're effective at raising revenue but less effective at reducing consumption.`,
      `A <strong>subsidy</strong> shifts supply right/down — price falls and quantity rises. The benefit is shared according to elasticities: inelastic demand means producers capture more of the subsidy as higher revenue, elastic demand means consumers benefit more through lower prices. The government cost equals the subsidy per unit × the new quantity, funded by taxpayers. Subsidies can correct positive externalities but risk causing <strong>allocative inefficiency</strong> (overproduction) if there's no genuine market failure to address.`
    ]
  },
  {
    title: 'Alternative Behaviour Views',
    points: [
      `Standard theory assumes consumers maximise utility and firms maximise profit, but reality is more nuanced. Consumers display <strong>bounded rationality</strong> — they use rules of thumb (<strong>heuristics</strong>), overweight losses relative to gains (<strong>loss aversion</strong>), and prefer instant gratification (<strong>present bias</strong>). This is why gym memberships spike in January and lapse by March, and why people consistently under-save for retirement.`,
      `Firms may not maximise profit either. Managers might <strong>satisfice</strong> (aim for "good enough" profit rather than maximum), pursue <strong>revenue maximisation</strong> or <strong>sales maximisation</strong>, or prioritise <strong>corporate social responsibility</strong>. The <strong>principal–agent problem</strong> explains why: shareholders (principals) want maximum profit, but managers (agents) have their own incentives — empire-building, bonuses tied to revenue, or a quiet life. This gap between ownership and control is especially relevant in large PLCs.`,
      `<strong>Nudge theory</strong> (Thaler and Sunstein) suggests governments can "nudge" better decisions by changing the default option or framing choices differently — like putting healthy food at eye level in school canteens. It's less intrusive than regulation but raises questions about whether the government should be steering private choices at all.`
    ]
  }
],

/* ─────────────────────────────────────────────────
 *  5. MARKET FAILURE (1.3.3)
 * ───────────────────────────────────────────────── */
'market-failure': [
  {
    title: 'Market Failure Overview',
    points: [
      `<strong>Market failure</strong> occurs when the free market fails to allocate resources efficiently — meaning the price doesn't reflect the true cost or benefit to society, so we get the wrong quantity produced. In technical terms, the market fails to achieve <strong>allocative efficiency</strong> (where Price = Marginal Social Cost). The result is either overproduction (too much of a harmful thing), underproduction (too little of a beneficial thing), or non-provision entirely.`,
      `The main types of market failure you need to know: <strong>externalities</strong> (costs or benefits spilling over onto third parties), <strong>public goods</strong> (non-rival and non-excludable, so the market won't provide them), <strong>merit and demerit goods</strong> (under- or over-consumed due to externalities combined with information failure), <strong>information failures</strong> (buyers or sellers lacking crucial knowledge), and <strong>monopoly power</strong> (firms restricting output to push up prices).`
    ]
  },
  {
    title: 'Externalities',
    points: [
      `An <strong>externality</strong> is a cost or benefit that falls on a third party who isn't involved in the transaction. The key equations: <strong>MSC = MPC + MEC</strong> (Marginal Social Cost = Marginal Private Cost + Marginal External Cost) and <strong>MSB = MPB + MEB</strong> (Marginal Social Benefit = Marginal Private Benefit + Marginal External Benefit). When there are externalities, private costs/benefits diverge from social costs/benefits, and the market produces the wrong quantity.`,
      `<strong>Negative externalities of production</strong>: the firm's costs (MPC) are lower than the costs to society (MSC) because pollution, noise, or congestion affects third parties. A chemical factory dumping waste into a river imposes costs on downstream fisheries. The market overproduces because the firm doesn't pay the full cost. <strong>Negative externalities of consumption</strong>: the private benefit (MPB) exceeds the social benefit (MSB) — or equivalently, there are external costs from consuming. Alcohol consumption imposes costs on the NHS, police, and families. The market overconsumes.`,
      `<strong>Positive externalities of production</strong>: society benefits more than the firm. A tech firm's R&D creates knowledge that other firms use — Apple's smartphone innovation benefited the entire app economy. <strong>Positive externalities of consumption</strong>: society benefits more than the individual consumer. Getting vaccinated protects not just you but everyone around you (herd immunity). Education benefits wider society through higher productivity, lower crime, and better civic participation. In both cases, the market underprovides.`,
      `The <strong>welfare loss</strong> from an externality is shown on a diagram as the triangle between the social and private curves, from the market quantity (Q<sub>m</sub>) to the socially optimal quantity (Q<sub>opt</sub>). In exams, always draw this triangle precisely and shade it — it's the core of any externality diagram. Be careful with the direction: for negative externalities, Q<sub>m</sub> > Q<sub>opt</sub> (overproduction). For positive externalities, Q<sub>m</sub> < Q<sub>opt</sub> (underproduction).`
    ]
  },
  {
    title: 'Public Goods',
    points: [
      `A <strong>public good</strong> has two defining characteristics. It's <strong>non-rival</strong> — one person using it doesn't reduce availability for others (a street light illuminates the road for everyone simultaneously; there's zero marginal cost for an extra user). And it's <strong>non-excludable</strong> — you can't prevent anyone from benefiting, even if they don't pay (you can't stop someone benefiting from national defence).`,
      `Non-excludability creates the <strong>free-rider problem</strong>: why would anyone pay if they can benefit for free? If everyone thinks this way, no revenue is generated, and private firms won't supply the good. This is <strong>complete market failure</strong> — the market produces zero. The solution is <strong>government provision</strong> funded by taxation. National defence, street lighting, and flood defences are classic examples.`,
      `<strong>Quasi-public goods</strong> have some but not all characteristics. Roads are non-excludable (mostly) but become rival when congested. Parks are non-rival at low usage but rival when crowded. A swimming pool is excludable (you can charge entry) but non-rival up to capacity. These goods may be under-provided by markets but aren't complete market failures. In exams, don't just state "it's a public good" — explain <em>which</em> characteristics it has and whether the free-rider problem actually applies.`
    ]
  },
  {
    title: 'Merit & Demerit Goods',
    points: [
      `<strong>Merit goods</strong> are under-consumed in the free market for two reasons: they generate <strong>positive externalities</strong> (education benefits society, not just the student) <em>and</em> consumers suffer from <strong>information failure</strong> (people underestimate the long-term benefits — a teenager might not value education until decades later). Examples: education, healthcare, museums, vaccinations.`,
      `<strong>Demerit goods</strong> are over-consumed for the mirror reasons: they generate <strong>negative externalities</strong> (smoking harms those around you) <em>and</em> consumers suffer from <strong>information failure</strong> (smokers underestimate health risks, or present bias makes them discount future harm). Examples: cigarettes, alcohol, gambling, fast food high in sugar.`,
      `The key distinction — and examiners test this specifically — is that merit/demerit goods involve <strong>both externalities AND information failure</strong>. If there were only externalities without information failure, the good would still be misallocated but wouldn't be a merit/demerit good. And here's the tension: defining something as a merit or demerit good involves a <strong>value judgement</strong> by the government about what people <em>should</em> consume — which is normative. Who decides what's "good for you"? This is why some people oppose paternalistic policies.`
    ]
  },
  {
    title: 'Information Failures & Moral Hazard',
    points: [
      `<strong>Imperfect information</strong> means consumers or producers lack the knowledge needed to make efficient decisions. If you can't judge the quality of a used car, you might pay too much for a lemon or avoid buying altogether — both outcomes are inefficient. <strong>Asymmetric information</strong> is a specific type: one side of the transaction knows more than the other. The seller of a used car knows its history; the buyer doesn't.`,
      `This creates two problems. <strong>Adverse selection</strong> happens <em>before</em> a transaction: the wrong types self-select into the market. In health insurance, sick people are more likely to buy insurance (they know they'll need it), driving up premiums and pushing healthy people out. <strong>Moral hazard</strong> happens <em>after</em> an agreement: people take greater risks because they don't bear the full consequences. If your car is fully insured, you might park it in a dodgy area because the insurer pays if it's stolen. During the 2008 financial crisis, banks took enormous risks partly because they expected government bailouts — a textbook case of moral hazard.`,
      `Solutions include <strong>regulation</strong> (mandatory product labelling, financial disclosure requirements), <strong>co-payments</strong> (making the insured person share costs to reduce moral hazard), <strong>monitoring</strong> (no-claims bonuses in car insurance reward careful behaviour), and <strong>screening/signalling</strong> (universities signal ability to employers). In exams, always specify whether you're discussing adverse selection or moral hazard — they have different causes and different solutions.`
    ]
  },
  {
    title: 'Monopoly as Market Failure',
    points: [
      `A <strong>monopolist</strong> can restrict output and set a price above marginal cost (P > MC), which means <strong>allocative inefficiency</strong> — consumers who value the good more than it costs to produce are priced out of the market. The result is a <strong>deadweight welfare loss</strong>. Consumer surplus is transferred to the firm as supernormal profit, and some surplus is destroyed entirely.`,
      `Monopolies may also suffer from <strong>X-inefficiency</strong> — without competitive pressure, costs creep up (bloated management, complacency). There's less urgency to minimise costs when no rival is breathing down your neck. However, the counter-argument is powerful: monopolists may achieve <strong>economies of scale</strong> (lower average costs from large-scale production) and invest supernormal profits into <strong>research and development</strong>, driving <strong>dynamic efficiency</strong> and innovation. Without patent protection (a legal monopoly), pharmaceutical companies might not invest billions in drug development.`,
      `This trade-off — static inefficiency now versus dynamic efficiency later — is central to competition policy. It's why governments regulate monopolies rather than simply banning them. In exams, never give a one-sided answer on monopoly — always weigh the welfare loss against potential scale and innovation benefits.`
    ]
  }
],

/* ─────────────────────────────────────────────────
 *  6. GOVERNMENT INTERVENTION (1.3.4)
 * ───────────────────────────────────────────────── */
'government-intervention': [
  {
    title: 'Taxes to Correct Externalities',
    points: [
      `The idea is simple: if a negative externality means the polluter isn't paying the full cost, <strong>make them pay it</strong>. Set a tax equal to the <strong>Marginal External Cost (MEC)</strong> at the socially optimal output — this "internalises the externality" by shifting the MPC curve up to align with MSC. The market then naturally settles at the socially optimal quantity.`,
      `The advantages are genuine: it's <strong>market-based</strong> (firms choose how to respond — cut output, invest in cleaner technology, or pay the tax), it generates <strong>revenue</strong> the government can use (a "double dividend"), and it creates ongoing incentives to find cleaner production methods. The UK's Landfill Tax, for example, dramatically reduced waste going to landfill because firms innovated to avoid the charge.`,
      `But there are serious problems. Calculating the exact MEC is extremely difficult — how do you put a precise pound value on pollution damage? If the tax is too low, it doesn't solve the problem; too high, it creates government failure. Taxes on necessities can be <strong>regressive</strong> (carbon taxes hit poorer households who spend a larger share of income on fuel). And if demand is <strong>very inelastic</strong> (like cigarettes or petrol), the tax raises revenue but barely changes behaviour — which defeats the corrective purpose.`
    ]
  },
  {
    title: 'Subsidies to Correct Externalities',
    points: [
      `For positive externalities, the government can <strong>subsidise</strong> the good to increase consumption or production to the socially optimal level. The subsidy equals the <strong>Marginal External Benefit (MEB)</strong> at Q<sub>opt</sub>, shifting the supply curve right so the market produces the correct quantity at a lower price.`,
      `This works well for merit goods: subsidising university tuition in countries like Germany (where it's virtually free) increases participation, capturing the positive externalities of a more educated workforce. Subsidising renewable energy in China helped it become the world's largest solar panel producer, addressing the positive externality of reduced carbon emissions.`,
      `The problems mirror those of taxation. The <strong>opportunity cost</strong> is significant — every pound spent on subsidies can't be spent on hospitals, schools, or tax cuts. Calculating the precise MEB is just as hard as calculating MEC. Subsidies can create <strong>dependency</strong> (firms that wouldn't survive without them) and may be poorly targeted — subsidising electric cars mostly benefits wealthier households who can afford them. There's always a risk of <strong>government failure</strong>: the subsidy overshoots, undershoots, or goes to the wrong recipients.`
    ]
  },
  {
    title: 'Maximum Prices (Price Ceilings)',
    points: [
      `A <strong>maximum price</strong> (price ceiling) is set <em>below</em> the equilibrium to make a good more affordable. The textbook example is <strong>rent controls</strong> — cities like New York and Berlin have capped rents to protect tenants. The intention is good: low-income households can afford housing.`,
      `But the consequences are predictable: at the lower price, quantity demanded exceeds quantity supplied, creating a persistent <strong>shortage</strong>. Landlords have less incentive to maintain or build new properties. A <strong>black market</strong> may emerge where the good is sold illegally at higher prices. Over time, housing quality deteriorates and the shortage worsens — Stockholm's rent controls have created a 20-year waiting list for apartments. There's a deadweight loss, and the people the policy aims to help may end up worse off. Rationing becomes necessary (queues, waiting lists, or arbitrary allocation).`,
      `In exams, always draw the diagram showing the shortage gap between Q<sub>d</sub> and Q<sub>s</sub> at the maximum price, shade the deadweight loss, and evaluate whether the equity benefit to those who <em>do</em> get the good outweighs the efficiency cost. The answer usually depends on how well the rationing mechanism targets those in genuine need.`
    ]
  },
  {
    title: 'Minimum Prices (Price Floors)',
    points: [
      `A <strong>minimum price</strong> (price floor) is set <em>above</em> equilibrium to guarantee producers a higher income or discourage consumption of demerit goods. At the higher price, quantity supplied exceeds quantity demanded, creating a <strong>surplus</strong>. The EU's Common Agricultural Policy (CAP) famously set minimum prices for agricultural products, resulting in "butter mountains" and "wine lakes" of unsold produce that taxpayers then paid to store or destroy.`,
      `For demerit goods, minimum pricing can be more effective: Scotland introduced a <strong>minimum unit price for alcohol</strong> in 2018 (50p per unit). Early evidence suggests it reduced alcohol purchases, particularly among heavy drinkers who buy cheap, high-strength drinks. The logic is sound — higher prices reduce consumption, especially for the most price-sensitive buyers.`,
      `The trade-offs: minimum prices raise consumer costs, create waste from surpluses, and generate a deadweight loss. In labour markets, the <strong>minimum wage</strong> is a price floor — it can reduce poverty but might cause unemployment if set above the market equilibrium, particularly for low-skilled workers. Whether it does in practice depends on the elasticity of labour demand, which is an empirical question economists still debate.`
    ]
  },
  {
    title: 'Tradeable Pollution Permits',
    points: [
      `<strong>Cap and trade</strong> is an elegant hybrid: the government sets a <strong>cap</strong> (total permitted emissions), issues permits up to that cap, and lets firms trade them on a market. Firms that can cut emissions cheaply do so and sell their spare permits for profit. Firms that find it expensive to cut buy permits instead. The result: the emissions target is met at the <strong>lowest possible cost</strong> to the economy, because cuts happen where they're cheapest.`,
      `The EU Emissions Trading System (EU ETS) is the world's largest — covering power stations, factories, and airlines. It creates a carbon price that incentivises long-term investment in cleaner technology. Unlike a tax (where the government sets the price but can't guarantee the quantity reduction), cap and trade <strong>guarantees the quantity reduction</strong> but lets the market determine the price.`,
      `Problems include: setting the cap too generously (as the EU initially did, causing the carbon price to collapse to near-zero), <strong>price volatility</strong> that makes investment planning difficult, <strong>lobbying</strong> by industries for free permits, monitoring and enforcement costs, and the risk of <strong>pollution hotspots</strong> (permits don't prevent concentrated emissions in one area). The scheme only works as well as the cap is set — too loose and it's pointless.`
    ]
  },
  {
    title: 'State Provision & Information',
    points: [
      `<strong>State provision</strong> is essential for <strong>public goods</strong> (the free-rider problem means no private firm will supply them). It's also used for merit goods — the NHS provides healthcare free at point of use, and state schools provide free education, ensuring consumption doesn't depend on ability to pay. Without state provision, under-consumption would persist because of information failure and inability to pay.`,
      `The problems with state provision are familiar: significant <strong>opportunity cost</strong> (resources used here can't be used elsewhere), potential for <strong>productive inefficiency</strong> (no profit motive driving cost minimisation), and <strong>political influence</strong> distorting allocation (spending directed to marginal constituencies rather than where it's most needed). Government-run services can also be slow to innovate.`,
      `<strong>Information provision</strong> — health warnings on cigarette packs, nutritional labelling, public health campaigns — is the least intrusive intervention. It's cheap, doesn't restrict freedom, and can be effective over time: UK anti-smoking campaigns have contributed to a halving of smoking rates since the 1970s. But it relies on people actually acting on the information, which behavioural economics tells us they often don't — especially when addiction, habit, or present bias are involved.`
    ]
  },
  {
    title: 'Regulation & Deregulation',
    points: [
      `<strong>Regulation</strong> uses legal rules to control behaviour — emission limits, safety standards, planning laws, financial regulations. It's the bluntest instrument: effective for banning outright dangerous activities (asbestos, CFCs), but rigid. One-size-fits-all rules ignore that compliance costs vary hugely between firms. There's also a risk of <strong>regulatory capture</strong> — where the industry being regulated effectively controls the regulator (as arguably happened with financial regulation before 2008).`,
      `<strong>Deregulation</strong> removes rules to promote competition — the UK deregulated bus services in the 1980s, telecoms in the 1990s, and energy markets. The theory: more competition drives prices down and innovation up. But deregulation of financial markets in the US and UK contributed to the excessive risk-taking that caused the 2008 financial crisis. The lesson: some regulation exists for good reason, and removing it requires careful analysis of what the rules were actually preventing.`
    ]
  },
  {
    title: 'Government Failure',
    points: [
      `<strong>Government failure</strong> occurs when intervention makes things <em>worse</em> — either creating a net welfare loss or failing to correct the original market failure. It's the reason we can't assume intervention always improves outcomes. Causes include: <strong>imperfect information</strong> (governments don't know the exact MEC or MEB), <strong>unintended consequences</strong> (biofuel subsidies led to deforestation and higher food prices), high <strong>administrative costs</strong>, <strong>political self-interest</strong> (short-term vote-winning over long-term efficiency), and <strong>regulatory capture</strong>.`,
      `Real examples are powerful: the EU's Common Agricultural Policy created wasteful surpluses. Rent controls in many cities worsened housing shortages. Financial deregulation before 2008 enabled the crisis it was supposed to prevent. Biofuel mandates meant to reduce carbon emissions actually increased them by encouraging tropical deforestation.`,
      `This is the ultimate evaluation framework for any intervention question: weigh the cost of the market failure against the risk of government failure. Sometimes the imperfect market is better than the imperfect intervention. In exams, the strongest answers acknowledge that both market failure and government failure exist, and evaluate which is likely to be worse in the specific context.`
    ]
  }
],

/* ─────────────────────────────────────────────────
 *  7. MEASURES OF ECONOMIC PERFORMANCE (2.3.1)
 * ───────────────────────────────────────────────── */
'measures-economic-performance': [
  {
    title: 'GDP Essentials',
    points: [
      `<strong>Gross Domestic Product (GDP)</strong> is the total value of all final goods and services produced within a country's borders in a year. It's the single most-used measure of economic activity — when the news says "the economy grew 2%," they mean real GDP. <strong>Nominal GDP</strong> is measured in current prices; <strong>Real GDP</strong> adjusts for inflation using a base year, making it the correct measure for comparing output over time. Always use real GDP for growth comparisons.`,
      `<strong>GDP per capita</strong> (GDP ÷ population) is more useful than total GDP for comparing living standards. China's GDP is larger than Switzerland's, but Swiss GDP per capita is far higher — meaning the average Swiss person has much greater purchasing power. <strong>Purchasing Power Parity (PPP)</strong> goes further by adjusting for differences in the cost of living between countries. $1,000 buys a lot more in India than in Norway, so PPP gives a fairer comparison.`,
      `There are three methods to measure GDP — and in theory they give the same figure. The <strong>output method</strong> adds up the value added at each stage of production. The <strong>income method</strong> totals all factor incomes (wages, rent, interest, profit). The <strong>expenditure method</strong> sums up all spending: <strong>C + I + G + (X – M)</strong>. They should be equal because one person's spending is another person's income, which is another person's output — this is the circular flow identity.`
    ]
  },
  {
    title: 'GDP Limitations',
    points: [
      `GDP measures economic output, not wellbeing — and the gap can be enormous. It ignores <strong>income distribution</strong>: a country's GDP per capita could be $50,000 while most people live on $10,000 if a small elite captures most income (think oil-rich nations like Equatorial Guinea). It misses the <strong>informal economy</strong> — cash-in-hand work, subsistence farming, and household labour (cooking, childcare) aren't counted. In developing countries, the informal sector can be 30-60% of true economic activity.`,
      `GDP also fails to account for <strong>negative externalities</strong> — cleaning up an oil spill actually <em>increases</em> GDP (the cleanup is measured output), even though wellbeing has clearly fallen. It ignores <strong>leisure time</strong> (a country working 60-hour weeks might have higher GDP but lower quality of life than one working 35 hours). And it says nothing about <strong>sustainability</strong> — depleting natural resources or running up debt boosts GDP today at the expense of the future.`,
      `Alternative measures try to fill these gaps. The <strong>Human Development Index (HDI)</strong> combines GDP per capita (adjusted for PPP), life expectancy, and education levels. It ranks countries differently from GDP alone — Cuba has relatively low GDP but very high HDI because of its healthcare and education systems. Other alternatives include the Genuine Progress Indicator (GPI) and measures of environmental sustainability. In exams, always evaluate GDP rather than just describing it — the limitations are where the marks are.`
    ]
  },
  {
    title: 'CPI and Inflation',
    points: [
      `The <strong>Consumer Price Index (CPI)</strong> tracks price changes in a weighted basket of about 700 goods and services that represent typical household spending. Items are weighted by how much of the average budget goes to them — housing and transport carry more weight than tobacco. The <strong>inflation rate</strong> is the percentage change in CPI over 12 months. The Bank of England targets 2% CPI inflation.`,
      `CPI has well-known limitations: <strong>substitution bias</strong> (the basket assumes fixed spending patterns, but people switch to cheaper alternatives when prices rise), <strong>quality changes</strong> (a phone that costs the same but is twice as fast isn't really the same price), and it may not represent <em>your</em> spending (pensioners, students, and families face different inflation rates). It also excludes housing costs like mortgage interest payments (though CPIH includes owner-occupier costs).`,
      `<strong>Demand-pull inflation</strong> occurs when AD grows faster than AS — "too much money chasing too few goods." This typically happens during booms when consumer confidence is high and credit is easy. <strong>Cost-push inflation</strong> occurs when production costs rise, shifting SRAS left — energy price shocks, wage increases, or supply chain disruptions. Cost-push is particularly painful because it can cause <strong>stagflation</strong> (rising prices <em>and</em> falling output simultaneously), as happened during the 1970s oil crises and again in 2022.`,
      `Inflation hurts those on <strong>fixed incomes</strong> (pensioners whose income doesn't keep pace), <strong>savers</strong> (the real value of savings falls if the interest rate is below inflation), and <strong>international competitiveness</strong> (if UK inflation is higher than trading partners, exports become relatively expensive). But moderate, predictable inflation is generally considered acceptable — it's unexpected inflation and hyperinflation that cause real damage.`
    ]
  },
  {
    title: 'Deflation',
    points: [
      `<strong>Deflation</strong> is a sustained fall in the general price level — a negative inflation rate. It sounds appealing (things get cheaper!) but can be economically devastating. The danger is a <strong>deflationary spiral</strong>: if prices are falling, consumers delay purchases ("why buy today when it'll be cheaper tomorrow?"), which reduces demand, forcing firms to cut prices further, lay off workers, and reduce investment. Japan experienced exactly this during its "Lost Decade" from the 1990s.`,
      `The distinction matters: <strong>benign deflation</strong> comes from rising productivity and falling costs (technology making things cheaper — think flat-screen TVs). This is fine. <strong>Malign deflation</strong> comes from collapsing demand — this is the dangerous kind that triggers the spiral. Deflation also increases the <strong>real burden of debt</strong> (the money you owe is worth more in real terms) and raises <strong>real interest rates</strong> even when nominal rates are at zero.`,
      `Don't confuse deflation with <strong>disinflation</strong> — disinflation means the inflation rate is falling (from 5% to 2%, say), but prices are still <em>rising</em>, just more slowly. Deflation means prices are actually going down. Examiners love testing this distinction. Japan's experience is the go-to example for any essay on deflation.`
    ]
  },
  {
    title: 'Unemployment',
    points: [
      `The <strong>ILO definition</strong> counts someone as unemployed if they are without work, actively seeking employment, and available to start within two weeks. The UK uses two measures: the <strong>Labour Force Survey (LFS)</strong> — a quarterly survey using the ILO definition (internationally comparable, usually gives a higher figure) — and the <strong>claimant count</strong> (those claiming unemployment-related benefits — easy to measure but underestimates true unemployment since many jobless people don't claim).`,
      `The main types: <strong>Frictional unemployment</strong> — people between jobs, searching for the right match (short-term, generally healthy). <strong>Structural unemployment</strong> — a mismatch between workers' skills/locations and available jobs; this is the painful kind, caused by deindustrialisation or technological change (the decline of coal mining in the UK left entire communities structurally unemployed). <strong>Cyclical (demand-deficient) unemployment</strong> — caused by a fall in AD during recessions. <strong>Seasonal unemployment</strong> — predictable fluctuations (tourism workers in winter).`,
      `The costs of unemployment are substantial: <strong>lost output</strong> (the economy operates inside its PPF), reduced <strong>tax revenue</strong> and increased <strong>government spending</strong> on benefits, <strong>hysteresis</strong> (long-term unemployed lose skills and become harder to re-employ), and <strong>social costs</strong> (health problems, crime, family breakdown). In exams, always link the type of unemployment to the appropriate policy response — demand-side policies fix cyclical unemployment but won't solve structural unemployment.`
    ]
  },
  {
    title: 'Current Account',
    points: [
      `The <strong>current account</strong> of the balance of payments has four components: <strong>trade in goods</strong> (visible trade), <strong>trade in services</strong> (invisible trade — banking, insurance, consulting), <strong>primary income</strong> (returns on overseas investments, worker remittances), and <strong>secondary income</strong> (government transfers, foreign aid). The UK typically runs a deficit in goods (we import more manufactured goods than we export) but a surplus in services (London is a global financial centre).`,
      `A <strong>current account deficit</strong> means a country is spending more abroad than it earns — it must be financed by a surplus on the capital/financial account (foreign investment flowing in). Causes include: strong domestic demand sucking in imports, uncompetitive exports (low productivity, high unit labour costs), an overvalued exchange rate making exports expensive and imports cheap, or simply consumer preference for imported goods.`,
      `Whether a deficit is a "problem" depends on context. If it's caused by strong investment inflows funding productive capacity (like the US in the 1990s tech boom), it may be sustainable and benign. If it's caused by excessive borrowing to fund consumption, it's a warning sign. A deficit financed by selling off national assets (foreign buyers purchasing UK companies and property) may raise longer-term concerns about ownership and income flows. In exams, always evaluate rather than assuming a deficit is bad — the cause and financing matter more than the number itself.`
    ]
  }
],

/* ─────────────────────────────────────────────────
 *  8. AGGREGATE DEMAND (2.3.2)
 * ───────────────────────────────────────────────── */
'aggregate-demand': [
  {
    title: 'AD Components',
    points: [
      `<strong>Aggregate Demand (AD)</strong> is the total planned spending on a country's output at a given price level: <strong>AD = C + I + G + (X – M)</strong>. <strong>Consumption (C)</strong> — household spending on goods and services — is the largest component, typically 60–65% of GDP in the UK. <strong>Investment (I)</strong> — business spending on capital goods — is the most volatile component, swinging sharply with confidence and interest rates.`,
      `<strong>Government spending (G)</strong> includes spending on public services and infrastructure but <em>excludes</em> transfer payments (benefits, pensions) — these are counted when the recipient spends them, so they appear in C. <strong>Net exports (X – M)</strong>: if exports exceed imports, net exports are positive (a trade surplus adds to AD). If imports exceed exports, it's negative (a trade deficit subtracts from AD). Changes in any component shift the AD curve.`
    ]
  },
  {
    title: 'Why AD Slopes Downward',
    points: [
      `The AD curve slopes downward, but not for the same reason as a micro demand curve. Three effects explain it. The <strong>wealth effect</strong> (Pigou effect): a lower price level increases the real value of people's money holdings and assets, making them feel wealthier and spend more. The <strong>international competitiveness effect</strong>: lower domestic prices make exports cheaper for foreigners and imports relatively more expensive, boosting net exports. The <strong>interest rate effect</strong> (Keynes effect): a lower price level reduces the demand for money, lowering interest rates, which stimulates consumption and investment.`,
      `Critical distinction: a <strong>movement along</strong> the AD curve is caused by a change in the <strong>price level</strong>. A <strong>shift</strong> of the AD curve is caused by a change in one of the components (C, I, G, or X–M) at <em>every</em> price level. Never confuse the two. If the question says "a rise in consumer confidence," that's a shift right (more spending at every price level). If it says "a rise in the price level," that's a movement along.`
    ]
  },
  {
    title: 'Key Determinants of C and I',
    points: [
      `<strong>Consumption</strong> is driven by: <strong>disposable income</strong> (the single biggest factor — the relationship is described by the consumption function), <strong>interest rates</strong> (lower rates reduce the cost of borrowing and the incentive to save), <strong>consumer confidence</strong> (expectations about future income and job security), <strong>wealth</strong> (rising house prices and share values create a wealth effect), <strong>credit availability</strong> (easier access to loans boosts spending), and <strong>tax levels</strong> (lower income tax increases disposable income).`,
      `<strong>Investment</strong> is driven by: <strong>interest rates</strong> (the cost of borrowing — lower rates make more projects profitable), <strong>business confidence</strong> (Keynes called this "<strong>animal spirits</strong>" — the gut feeling of entrepreneurs about the future, which can be self-fulfilling), <strong>government policy</strong> (corporation tax, capital allowances, regulation), <strong>technological change</strong> (new technology creates investment opportunities), and <strong>spare capacity</strong> (if firms have unused capacity, they won't invest in more). Animal spirits explain why investment is so volatile — it's driven as much by psychology as by rational calculation.`,
      `The <strong>Marginal Propensity to Consume (MPC)</strong> is the fraction of each additional pound of income that gets spent. A high MPC means most extra income is spent rather than saved, which amplifies the impact of any injection through the multiplier. The MPC tends to be higher for lower-income households (they spend a larger share of any extra income on necessities) — which is why tax cuts targeted at low earners tend to boost AD more than cuts for high earners.`
    ]
  },
  {
    title: 'The Multiplier',
    points: [
      `The <strong>multiplier</strong> says that an initial injection of spending leads to a <em>larger</em> final increase in national income. When the government spends £1 billion on infrastructure, those workers spend their wages in shops, the shopkeepers spend their income on supplies, and so on — each round is smaller because some income leaks out (saving, tax, imports). The multiplier formula: <strong>k = 1 / (1 – MPC) = 1 / MPW</strong>, where MPW = MPS + MPT + MPM (the marginal propensity to withdraw).`,
      `The multiplier works in <strong>both directions</strong> — a fall in investment causes a multiplied contraction in national income. The size depends on the economy's leakages: countries with high saving rates, high tax rates, or high import propensity have smaller multipliers. The UK's multiplier is estimated at around 1.3–1.5. Developing countries with low import propensity may have higher multipliers.`,
      `But don't overstate it. <strong>Limitations</strong>: there are significant <strong>time lags</strong> (the full effect takes months or years), <strong>crowding out</strong> may occur (government borrowing pushes up interest rates, reducing private investment), at <strong>full capacity</strong> the multiplier mostly generates inflation rather than real output, and the actual MPC is hard to measure precisely. Examiners want you to explain the multiplier <em>and</em> evaluate its limitations — never present it as an exact science.`
    ]
  },
  {
    title: 'The Accelerator',
    points: [
      `The <strong>accelerator theory</strong> says that investment depends on the <em>rate of change</em> of national income, not just its level. When income is rising at an increasing rate, investment booms. When income is still rising but at a decreasing rate, investment actually <em>falls</em>. This makes investment extremely volatile — small changes in the growth rate cause large swings in investment spending.`,
      `The <strong>multiplier-accelerator interaction</strong> can create cumulative expansion or contraction: an initial injection triggers the multiplier → higher income → accelerator triggers more investment → more income → more investment. This positive feedback loop helps explain why business cycles can build momentum. But the accelerator weakens when there is significant <strong>spare capacity</strong> (firms can meet rising demand from existing resources without investing) or when business confidence is low.`,
      `In exams, the accelerator explains <em>why</em> investment is the most volatile component of AD — it amplifies the business cycle. Use it to explain both the boom (accelerating investment) and the bust (decelerating income causes investment to collapse). Combine it with the multiplier for a powerful analysis of cyclical fluctuations.`
    ]
  }
],

/* ─────────────────────────────────────────────────
 *  9. AGGREGATE SUPPLY (2.3.3)
 * ───────────────────────────────────────────────── */
'aggregate-supply': [
  {
    title: 'SRAS Essentials',
    points: [
      `The <strong>Short-Run Aggregate Supply (SRAS)</strong> curve slopes upward: when the price level rises, firms earn higher profit margins on each unit (because input costs like wages and contracts are fixed in the short run), so they're incentivised to produce more. Essentially, higher prices make production more profitable <em>while costs haven't caught up</em>.`,
      `SRAS shifts <strong>right</strong> when production costs fall: cheaper raw materials, higher productivity, lower indirect taxes, a stronger exchange rate (making imported inputs cheaper), or government subsidies. SRAS shifts <strong>left</strong> when costs rise: higher oil prices (as after Russia's invasion of Ukraine in 2022), higher wages, a weaker exchange rate, or new regulations that increase compliance costs.`,
      `An important detail: the SRAS curve becomes <strong>steeper</strong> as the economy approaches full capacity. With plenty of spare capacity, firms can easily expand output without bidding up input prices. Near full capacity, bottlenecks appear — skilled labour becomes scarce, overtime costs rise, less efficient machinery is pressed into service — so each additional unit of output requires disproportionately higher costs. This shape matters for predicting whether an AD boost mostly increases output or mostly increases prices.`
    ]
  },
  {
    title: 'LRAS: Classical vs Keynesian',
    points: [
      `The <strong>Classical LRAS</strong> curve is <strong>vertical</strong> at the full employment level of output (Y<sub>fe</sub>). The logic: in the long run, wages and prices are fully flexible, so the economy always returns to its potential output. An increase in AD raises the price level but doesn't change real output — it just causes inflation. Monetary policy is neutral in the long run (money illusion fades). Supply-side improvements shift LRAS right, enabling non-inflationary growth.`,
      `The <strong>Keynesian LRAS</strong> curve has <strong>three sections</strong>. A horizontal section where there's significant spare capacity (firms can increase output without any price rise — think of a deep recession with mass unemployment). An upward-sloping section where bottlenecks emerge (some industries hit capacity before others). And a vertical section at absolute full capacity (all resources employed — output can't rise regardless of demand).`,
      `The key disagreement: <strong>Classical economists</strong> believe the economy self-corrects — if there's a recession, wages and prices fall, restoring full employment. Government intervention is unnecessary and potentially harmful. <strong>Keynesian economists</strong> argue wages are "sticky downwards" (workers resist pay cuts, contracts are fixed) — so the economy can get stuck below full employment for years. Government demand management is necessary to close the output gap. This Classical vs Keynesian debate underpins every macroeconomic policy question you'll face.`
    ]
  },
  {
    title: 'Shifting LRAS',
    points: [
      `Both schools agree on what shifts LRAS right — it's the supply-side factors that expand an economy's productive capacity. <strong>More labour</strong>: immigration, population growth, higher female participation rates, later retirement. <strong>Better labour</strong> (human capital): education, training, healthcare investment — Singapore's transformation from a developing country to one of the richest in the world was driven largely by massive investment in education.`,
      `<strong>More capital</strong>: investment in machinery, infrastructure, and technology. China's double-digit growth for decades was fuelled by enormous capital investment. <strong>Better capital</strong>: technological innovation — AI, automation, and digital infrastructure increase output per unit of capital. <strong>Natural resources</strong>: discovery of oil (like Norway) or gas (like Qatar) shifts LRAS right.`,
      `<strong>Institutional improvements</strong> are equally important: secure <strong>property rights</strong>, the <strong>rule of law</strong>, reduced corruption, deregulation of restrictive markets, and good governance. These create the environment in which investment and enterprise can flourish. Countries with strong institutions (Nordic countries, Singapore) consistently outperform those without, regardless of natural resources.`
    ]
  },
  {
    title: 'AD/AS Scenarios',
    points: [
      `These are the four main scenarios you need to be able to draw and explain. <strong>Demand-pull inflation</strong>: AD shifts right → in the short run, both price level and real output rise. Near full capacity, the price rise dominates. <strong>Cost-push inflation</strong>: SRAS shifts left → prices rise AND output falls — the dreaded <strong>stagflation</strong>. The 1970s oil crises are the textbook example: OPEC's output restrictions shifted SRAS left globally.`,
      `<strong>Non-inflationary growth</strong>: LRAS shifts right → the economy can produce more without price pressure. This is the ideal outcome of supply-side policies. <strong>Recession</strong>: AD shifts left → output falls and unemployment rises. In the classical model, prices eventually fall to restore equilibrium. In the Keynesian model, the economy can stay depressed without intervention.`,
      `In exams, always identify what happens to <strong>both</strong> the price level and real output. Show the shift clearly on a diagram, label the new equilibrium, and explain the chain of causation. The best answers then evaluate: is the effect temporary or permanent? Does it depend on where the economy starts (spare capacity vs full capacity)? Does the policy create other problems?`
    ]
  },
  {
    title: 'Key Evaluation Points',
    points: [
      `The Classical vs Keynesian debate gives you a ready-made evaluation framework for any macro question. <strong>Classical view</strong>: the economy self-corrects if you leave it alone — wages and prices adjust, markets clear. Supply-side policies are the key to long-run prosperity. Government spending just crowds out private spending. <strong>Keynesian view</strong>: self-correction is painfully slow or may not happen at all — wages don't fall easily, and confidence can collapse into a downward spiral. Active demand management is essential, especially in deep recessions.`,
      `<strong>Cost-push inflation</strong> creates a genuine policy dilemma. Boosting AD to restore output worsens inflation. Tightening to control inflation deepens the recession. There's no clean solution — which is exactly what examiners want you to discuss. Always distinguish between <strong>short-run and long-run effects</strong>: an AD boost near full capacity is mostly inflationary, but with substantial spare capacity it mostly increases real output. Context is everything in macro.`
    ]
  }
],

/* ─────────────────────────────────────────────────
 *  10. NATIONAL INCOME (2.3.4)
 * ───────────────────────────────────────────────── */
'national-income': [
  {
    title: 'Circular Flow of Income',
    points: [
      `The <strong>circular flow model</strong> shows how money moves continuously between households and firms. In the simplest <strong>two-sector model</strong>, households supply factors of production (labour, land, capital, enterprise) to firms and receive factor incomes (wages, rent, interest, profit) in return. Firms use those factors to produce goods and services that households buy. The crucial identity: <strong>income = output = expenditure</strong> — they're three ways of measuring the same thing.`,
      `Add the government and you get the <strong>three-sector model</strong>: <strong>taxation</strong> is a withdrawal (income leaving the circular flow) and <strong>government spending</strong> is an injection (money entering). Add the foreign sector and you get the <strong>four-sector model</strong>: <strong>imports</strong> are a withdrawal (spending leaks abroad) and <strong>exports</strong> are an injection (foreign spending enters). The full model has three withdrawals (<strong>S + T + M</strong>) and three injections (<strong>I + G + X</strong>).`
    ]
  },
  {
    title: 'Injections and Withdrawals',
    points: [
      `<strong>Withdrawals (leakages)</strong> remove income from the circular flow: <strong>savings</strong> (income not spent), <strong>taxation</strong> (income taken by government), and <strong>imports</strong> (spending that goes to foreign producers). <strong>Injections</strong> add income: <strong>investment</strong> (firms spending on capital), <strong>government spending</strong> (public services and infrastructure), and <strong>exports</strong> (foreigners buying domestic goods).`,
      `The <strong>Marginal Propensity to Withdraw (MPW)</strong> = MPS + MPT + MPM — it tells you what fraction of each extra pound of income leaks out rather than being respent. This is crucial for the multiplier: a high MPW means a small multiplier (lots of leakage), a low MPW means a large multiplier (income recirculates many times).`,
      `An important distinction: <strong>actual</strong> injections always equal actual withdrawals — this is an accounting identity (what goes in must come out). But <strong>planned</strong> injections may differ from planned withdrawals — and it's this difference that causes national income to change. When planned injections exceed planned withdrawals, national income is rising. When the reverse is true, it's falling.`
    ]
  },
  {
    title: 'Equilibrium National Income',
    points: [
      `Equilibrium occurs where <strong>planned injections = planned withdrawals</strong> (I + G + X = S + T + M). At this point, there's no tendency for national income to change — the circular flow is stable.`,
      `If <strong>planned injections exceed planned withdrawals</strong>: firms find their stock levels falling unexpectedly (people are buying more than firms expected). Firms respond by increasing output and hiring more workers. National income rises until the extra leakages from higher income restore equilibrium. The reverse: if planned withdrawals exceed planned injections, unsold stock piles up, firms cut output and lay off workers, and national income falls.`,
      `Crucially, <strong>equilibrium does not mean full employment</strong>. The economy can settle at an equilibrium below full employment — this is the Keynesian concern. A <strong>deflationary (recessionary) gap</strong> means equilibrium income is below full employment output. An <strong>inflationary gap</strong> means planned spending exceeds the economy's capacity at full employment, creating upward pressure on prices. Policy-makers want to close these gaps — but doing so requires knowing where full employment output actually is, which is harder than it sounds.`
    ]
  },
  {
    title: 'The Multiplier in the Circular Flow',
    points: [
      `The <strong>multiplier (k) = 1 / MPW = 1 / (1 – MPC)</strong>. The change in national income = multiplier × change in injection. So if the government increases spending by £10 billion and the multiplier is 2, national income eventually rises by £20 billion. This works because one person's spending is another's income: the construction workers building a new road spend their wages in local shops, the shopkeepers spend their income on supplies, and each round is smaller because of leakages.`,
      `The multiplier is larger when the economy has <strong>spare capacity</strong> — extra spending translates into extra output rather than just higher prices. Near full employment, the multiplier effect is weaker because the spending mostly bids up prices instead of creating real output. This is why Keynesian stimulus works best during recessions (when there's a large negative output gap) and risks causing inflation during booms.`,
      `In exams, always explain the <em>mechanism</em> (each round of spending generates income, minus leakages) rather than just stating the formula. And always evaluate: crowding out, time lags, the risk of inflation, and the difficulty of measuring the actual multiplier mean the real-world effect is usually smaller and slower than the textbook suggests.`
    ]
  },
  {
    title: 'Circular Flow and AD',
    points: [
      `The circular flow model connects directly to the AD/AS framework. A rise in injections (more investment, government spending, or exports) shifts <strong>AD right</strong>. A rise in withdrawals (more saving, higher taxes, or more imports) shifts <strong>AD left</strong>. The AD equation <strong>AD = C + I + G + (X – M)</strong> maps directly onto the circular flow components.`,
      `The multiplier explains why AD shifts by <em>more</em> than the initial change in spending — the injection circulates through the economy, creating multiple rounds of additional spending. This is why a relatively small fiscal stimulus can have a significant impact on national income, and why a small cut in investment can trigger a disproportionate recession. Understanding the circular flow gives you the mechanism behind the AD shift — which is what examiners want to see.`
    ]
  }
],

/* ─────────────────────────────────────────────────
 *  11. ECONOMIC GROWTH (2.3.5)
 * ───────────────────────────────────────────────── */
'economic-growth': [
  {
    title: 'Actual vs Potential Growth',
    points: [
      `<strong>Actual growth</strong> is the annual percentage change in real GDP — it measures how much the economy actually produced this year compared to last. It's caused by <strong>demand-side factors</strong>: increases in consumption, investment, government spending, or net exports shifting AD right. On a PPF diagram, it's shown as a movement from inside the frontier toward it (using existing but idle resources).`,
      `<strong>Potential growth</strong> is the increase in the economy's productive capacity — how much it <em>could</em> produce at full employment. It's caused by <strong>supply-side factors</strong>: better technology, more workers, improved skills, or more capital. On a diagram, it's shown as a rightward shift of the LRAS curve or an outward shift of the PPF.`,
      `A key distinction: actual growth can occur without potential growth (simply by putting unemployed resources to work), and potential growth can occur without actual growth (capacity expands but demand doesn't). The best outcome is when both happen together — the economy expands its capacity <em>and</em> uses it. In exams, always specify which type of growth you're discussing.`
    ]
  },
  {
    title: 'Output Gaps',
    points: [
      `A <strong>positive output gap</strong> means actual GDP exceeds potential GDP — the economy is operating above its sustainable capacity. Workers are doing overtime, machines are running at full tilt, and there's upward pressure on wages and prices. This creates <strong>inflationary pressure</strong> and is unsustainable. The UK economy in 2006–07, just before the financial crisis, was running a positive output gap.`,
      `A <strong>negative output gap</strong> means actual GDP is below potential — there's spare capacity, with unemployed workers and idle factories. This puts <strong>downward pressure on inflation</strong> (or even deflation) and represents wasted resources. The UK after 2008, and globally during COVID-19 lockdowns, experienced large negative output gaps. The formula: <strong>Output gap = (Actual GDP – Potential GDP) / Potential GDP × 100</strong>.`,
      `Output gaps matter for policy: a negative gap calls for <strong>expansionary</strong> policy (stimulate AD to close the gap), while a positive gap calls for <strong>contractionary</strong> policy (dampen AD to prevent inflation). But estimating potential GDP is difficult — it's not directly observable, so there's always uncertainty about the size and even the sign of the output gap. This is a major source of policy error.`
    ]
  },
  {
    title: 'Business Cycle Phases',
    points: [
      `The <strong>business cycle</strong> describes the fluctuations in actual GDP around the long-run trend. <strong>Boom</strong>: high growth, low unemployment, rising inflation, positive output gap, rising consumer and business confidence, rising asset prices (house prices, share prices). The danger: it can't last — overheating leads to inflation, which eventually requires a correction.`,
      `<strong>Recession</strong>: technically defined as two consecutive quarters of negative real GDP growth. Rising unemployment, falling business and consumer confidence, falling investment (the accelerator effect reverses), and the potential for a negative spiral as pessimism feeds on itself. The 2008–09 global recession and the 2020 COVID recession are vivid examples.`,
      `<strong>Slump</strong>: the lowest point — high unemployment, possible deflation, large negative output gap, and deep pessimism. <strong>Recovery</strong>: growth turns positive, unemployment starts falling, confidence gradually returns, and the negative output gap closes. The transition from slump to recovery often requires a catalyst — typically expansionary fiscal or monetary policy, or an external demand boost.`
    ]
  },
  {
    title: 'Causes of Growth',
    points: [
      `<strong>Demand-side causes</strong>: rises in C, I, G, or (X – M) shift AD right, generating actual growth. Low interest rates boost consumption and investment. Government infrastructure spending creates jobs and demand. Export growth from a competitive exchange rate or strong global demand pulls the economy forward. But demand-side growth is limited near full capacity — beyond that, extra demand mostly causes inflation.`,
      `<strong>Supply-side causes</strong> shift LRAS right: <strong>capital investment</strong> (new factories, infrastructure, technology), <strong>human capital</strong> (education and training — South Korea's investment in STEM education underpinned its transformation into a high-tech economy), <strong>technological innovation</strong> (the internet revolution boosted productivity globally), and <strong>institutional improvements</strong> (property rights, trade openness, good governance). Supply-side growth is the only source of sustained, non-inflationary long-run growth.`
    ]
  },
  {
    title: 'Costs and Benefits of Growth',
    points: [
      `The benefits are substantial: higher <strong>living standards</strong> (more goods and services per person), lower <strong>unemployment</strong> (growing firms hire workers), better <strong>public services</strong> (growth generates tax revenue), <strong>poverty reduction</strong> (China lifted 800 million people out of poverty through decades of rapid growth), and a <strong>fiscal dividend</strong> (higher tax revenue without raising tax rates).`,
      `But growth has costs: <strong>inflation</strong> (if demand outpaces supply), <strong>environmental damage</strong> (carbon emissions, deforestation, pollution — China's rapid growth came with severe air quality problems), <strong>inequality</strong> (growth may disproportionately benefit the wealthy, as with the UK's rising income inequality since the 1980s), <strong>current account deterioration</strong> (growing incomes suck in imports), and <strong>structural unemployment</strong> (creative destruction — new industries replace old ones, leaving some workers behind).`,
      `<strong>Sustainable growth</strong> means meeting present needs without compromising future generations — balancing economic expansion with environmental protection and resource conservation. This concept is increasingly central to exam questions. The strongest evaluation recognises that <em>the type of growth matters as much as the rate</em>: growth built on depleting natural capital or running up unsustainable debt is not genuine progress.`
    ]
  }
],

/* ─────────────────────────────────────────────────
 *  12. MACROECONOMIC OBJECTIVES & POLICIES (2.3.6)
 * ───────────────────────────────────────────────── */
'macroeconomic-objectives-policies': [
  {
    title: 'Macroeconomic Objectives',
    points: [
      `Governments pursue four main macroeconomic objectives: <strong>sustained economic growth</strong> (steady increases in real GDP), <strong>low and stable inflation</strong> (the Bank of England targets 2% CPI), <strong>low unemployment</strong> (making full use of the labour force), and <strong>a sustainable balance of payments position</strong> (particularly the current account). Some economists add <strong>environmental sustainability</strong> and <strong>reducing inequality</strong> as additional objectives.`,
      `The challenge is that these objectives often <strong>conflict</strong>. Faster growth tends to increase inflation (demand-pull) and suck in imports (worsening the current account). Reducing unemployment below the natural rate generates inflationary pressure. Growth based on fossil fuels conflicts with environmental goals. Policy-makers must <strong>prioritise and accept trade-offs</strong> — you can't fully achieve all objectives simultaneously. In exams, identifying and analysing these conflicts is where the evaluation marks are.`
    ]
  },
  {
    title: 'Fiscal Policy',
    points: [
      `<strong>Fiscal policy</strong> uses government spending (G) and taxation (T) to influence AD. It's set by the government in the annual Budget. <strong>Expansionary</strong> fiscal policy (raising G or cutting T) shifts AD right — stimulating growth and reducing unemployment. <strong>Contractionary</strong> fiscal policy (cutting G or raising T) shifts AD left — cooling the economy and reducing inflation.`,
      `<strong>Automatic stabilisers</strong> work without any deliberate policy change: in a recession, tax revenue falls automatically (fewer people earning, fewer profits) and welfare spending rises (more unemployment benefits). This cushions the downturn. In a boom, the reverse happens, dampening overheating. <strong>Discretionary</strong> fiscal policy requires deliberate government action — like the UK's furlough scheme during COVID-19 or corporation tax changes announced in budgets.`,
      `Weaknesses include: <strong>time lags</strong> (recognising the problem, designing the response, implementing it, and waiting for effects — by which time the cycle may have moved on), <strong>crowding out</strong> (government borrowing drives up interest rates, discouraging private investment — though evidence for this during recessions is weak), <strong>political influence</strong> (governments may time spending for elections rather than economic need), <strong>rising national debt</strong> (persistent deficits accumulate), and the multiplier may be <strong>smaller than expected</strong> if leakages are high. Despite these limitations, fiscal policy was the primary tool used globally during the COVID-19 pandemic because monetary policy was already stretched.`
    ]
  },
  {
    title: 'Monetary Policy',
    points: [
      `<strong>Monetary policy</strong> involves setting interest rates and controlling the money supply. In the UK, it's set by the independent <strong>Bank of England Monetary Policy Committee (MPC)</strong>, insulated from political pressure. The main tool is the <strong>base rate</strong> — the interest rate at which the Bank of England lends to commercial banks, which then filters through to mortgage rates, saving rates, and business loan rates.`,
      `The <strong>transmission mechanism</strong> shows how an interest rate change filters through to AD: a rate cut reduces borrowing costs → consumers spend more on credit and mortgage repayments fall (boosting C) → businesses find investment projects more profitable (boosting I) → asset prices rise (wealth effect) → the exchange rate tends to fall (making exports cheaper, boosting X–M) → AD rises. The process takes <strong>12–24 months</strong> to fully work through, which is why the MPC sets rates based on future inflation forecasts.`,
      `When rates hit the <strong>zero lower bound</strong> (near 0%), conventional monetary policy can't cut further. The Bank of England turned to <strong>Quantitative Easing (QE)</strong>: buying government bonds from financial institutions with newly created money, increasing the money supply and pushing down long-term interest rates. QE was used extensively after 2008 and during COVID-19. Critics argue it inflates asset prices (benefiting the wealthy), risks future inflation, and may not reach the real economy if banks don't lend the extra reserves.`,
      `Monetary policy weaknesses: the <strong>12–24 month lag</strong> means decisions are based on forecasts that may be wrong. It's a <strong>blunt instrument</strong> (one interest rate for the whole economy — London's housing market and the North of England may need opposite policies). It's <strong>less effective in a liquidity trap</strong> (people hold cash rather than spend, even at zero rates). And it's <strong>asymmetric</strong>: raising rates to kill inflation works reliably, but cutting rates to stimulate a depressed economy may not work if confidence is shattered ("you can lead a horse to water…").`
    ]
  },
  {
    title: 'Supply-Side Policies',
    points: [
      `<strong>Supply-side policies</strong> aim to increase the economy's productive capacity — shifting LRAS right. They come in two flavours. <strong>Market-based</strong> (free-market) policies: deregulation (removing red tape), privatisation (selling state-owned firms to the private sector), income tax cuts (increasing work incentives), labour market flexibility (making it easier to hire and fire — the UK's relatively flexible labour market compared to France), and trade liberalisation (removing tariffs and quotas).`,
      `<strong>Interventionist</strong> supply-side policies: public investment in education and training (building human capital), infrastructure spending (transport, broadband, energy networks), industrial policy (targeted support for strategic industries), healthcare investment (a healthier workforce is more productive), and regional policy (addressing geographic inequality — like the UK's "levelling up" agenda).`,
      `The strengths are significant: supply-side policies can deliver growth <strong>without inflation</strong> (since they increase capacity, not just demand), and their effects are <strong>long-lasting</strong>. But the weaknesses are equally important: they take a <strong>very long time</strong> to have effect (education reforms might take a generation), market-based policies can <strong>increase inequality</strong> (deregulation and tax cuts tend to benefit the better-off), and there's no guarantee of success (privatisation sometimes reduces quality, as with UK rail). In exams, always compare the two approaches and evaluate which is more appropriate for the specific problem.`
    ]
  },
  {
    title: 'Phillips Curve and Trade-Offs',
    points: [
      `The <strong>Short-Run Phillips Curve (SRPC)</strong> shows an inverse relationship between unemployment and inflation — lower unemployment comes with higher inflation, and vice versa. The logic: when unemployment is low, workers have bargaining power, pushing up wages and costs (cost-push inflation); and strong demand in the economy creates demand-pull inflation. This creates a policy dilemma: reducing unemployment seems to require accepting more inflation.`,
      `The <strong>Long-Run Phillips Curve (LRPC)</strong> is <strong>vertical</strong> at the <strong>natural rate of unemployment</strong> (NAIRU). In the long run, there is no trade-off: attempting to push unemployment below the natural rate just causes accelerating inflation as workers' inflation expectations adjust upward. The natural rate can only be reduced by supply-side policies that improve the functioning of the labour market (better training, improved job-matching, reduced barriers to mobility).`,
      `The best policy approach combines <strong>demand-side stabilisation in the short run</strong> (using fiscal and monetary policy to smooth the business cycle and keep unemployment close to the natural rate) with <strong>supply-side reform in the long run</strong> (shifting the LRPC left by reducing the natural rate). This is why the UK uses monetary policy for short-run demand management and pursues education, infrastructure, and labour market reforms for long-run supply-side improvement. In exams, show you understand that different time horizons require different policy tools.`
    ]
  }
]

};


/* ═══════════════════════════════════════════════════════════
 *  PUSH TO SUPABASE
 * ═══════════════════════════════════════════════════════════ */
async function main() {
  const ids = Object.keys(SECTIONS);
  console.log(`Updating ${ids.length} sections...\n`);

  let success = 0;
  let failed = 0;

  for (const id of ids) {
    const notes = SECTIONS[id];
    const totalPoints = notes.reduce((s, sec) => s + sec.points.length, 0);

    const { error } = await supabase
      .from('section_notes')
      .update({ data: notes })
      .eq('section_id', id);

    if (error) {
      console.log(`  ✗ ${id}: ${error.message}`);
      failed++;
    } else {
      console.log(`  ✓ ${id} — ${notes.length} sections, ${totalPoints} points`);
      success++;
    }
  }

  console.log(`\nDone: ${success} updated, ${failed} failed.`);
}

main();
