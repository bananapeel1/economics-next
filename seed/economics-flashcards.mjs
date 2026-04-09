/**
 * Economics flashcard seed data — all 23 sections across Units 1–4.
 * Each section has 18–20 flashcards matching the quality bar of
 * the existing Business flashcard content.
 *
 * Format: { front: "question (plain text)", back: "answer (HTML with <strong>)" }
 *
 * Run: node seed/seed-economics-flashcards.mjs
 */

// ═══════════════════════════════════════════════════════════════
// UNIT 1: MARKETS IN ACTION (WEC11)
// ═══════════════════════════════════════════════════════════════

export const introductoryConcepts = [
  {
    "front": "What is scarcity?",
    "back": "The <strong>fundamental economic problem</strong> — human wants are unlimited but resources are finite. Because resources are scarce, societies must make choices about how to allocate them."
  },
  {
    "front": "What is opportunity cost?",
    "back": "The <strong>next best alternative forgone</strong> when a choice is made. E.g., if a government spends £10bn on defence, the opportunity cost is the hospitals or schools that money could have funded."
  },
  {
    "front": "What is a production possibility frontier (PPF)?",
    "back": "A curve showing the <strong>maximum output combinations</strong> of two goods an economy can produce using all available resources efficiently. Points inside the PPF indicate inefficiency; points outside are unattainable."
  },
  {
    "front": "What causes a shift outward of the PPF?",
    "back": "An increase in the economy's <strong>productive capacity</strong> — caused by investment in capital, technological progress, improved education, or discovery of new resources."
  },
  {
    "front": "What is specialisation?",
    "back": "When individuals, firms, or countries concentrate on producing a <strong>narrow range of goods</strong> in which they have an advantage, then trade for the rest. Increases efficiency and output."
  },
  {
    "front": "What is the division of labour?",
    "back": "Breaking production into <strong>separate tasks</strong>, each performed by a different worker. Increases productivity through repetition but can lead to boredom and inflexibility."
  },
  {
    "front": "What is a free market economy?",
    "back": "An economy where resources are allocated by the <strong>price mechanism</strong> with minimal government intervention. Prices are determined by supply and demand."
  },
  {
    "front": "What is a command economy?",
    "back": "An economy where the <strong>government decides</strong> what, how, and for whom to produce. Central planning replaces market forces. May reduce inequality but often leads to inefficiency."
  },
  {
    "front": "What is a mixed economy?",
    "back": "An economy with <strong>both private and public sectors</strong> — the price mechanism allocates most resources, but the government intervenes to correct market failures and provide public goods."
  },
  {
    "front": "Name the three functions of the price mechanism.",
    "back": "<strong>Signalling</strong> (prices convey information about scarcity), <strong>incentive</strong> (rising prices encourage supply, falling prices discourage it), and <strong>rationing</strong> (prices allocate scarce goods to those willing to pay)."
  },
  {
    "front": "What are the four factors of production?",
    "back": "<strong>Land</strong> (natural resources), <strong>labour</strong> (human effort), <strong>capital</strong> (machinery, equipment), and <strong>enterprise</strong> (risk-taking, organising the other factors). Each earns a factor income: rent, wages, interest, profit."
  },
  {
    "front": "What is the difference between positive and normative statements?",
    "back": "<strong>Positive statements</strong> are factual and can be tested (e.g., \"inflation is 3%\"). <strong>Normative statements</strong> are value judgements (e.g., \"the government should reduce inequality\")."
  },
  {
    "front": "What is meant by economic efficiency?",
    "back": "Resources are allocated so that <strong>maximum output</strong> is achieved from given inputs and goods go to those who <strong>value them most</strong>. Includes both productive and allocative efficiency."
  },
  {
    "front": "What is productive efficiency?",
    "back": "Producing at the <strong>lowest possible average cost</strong> — using the minimum resources to produce a given output. Achieved at the bottom of the AC curve."
  },
  {
    "front": "What is allocative efficiency?",
    "back": "Resources are distributed to produce the combination of goods that <strong>best matches consumer preferences</strong>. Achieved where <strong>P = MC</strong> (price equals marginal cost)."
  },
  {
    "front": "What does a point inside the PPF represent?",
    "back": "<strong>Inefficiency</strong> — the economy is not using all its available resources or is using them wastefully. Could be due to unemployment or underemployment."
  },
  {
    "front": "What is the economic problem?",
    "back": "How to allocate <strong>scarce resources</strong> among competing uses. Every society must answer three questions: <strong>what</strong> to produce, <strong>how</strong> to produce it, and <strong>for whom</strong> to produce."
  },
  {
    "front": "Why does specialisation lead to trade?",
    "back": "When workers or countries specialise, they produce <strong>more of one good than they need</strong> and less of others. They must trade their surplus for the goods they no longer produce themselves."
  }
];

export const consumerBehaviourDemand = [
  {
    "front": "What is effective demand?",
    "back": "The quantity of a good consumers are <strong>willing and able to buy</strong> at a given price. Willingness alone is not enough — demand must be backed by purchasing power."
  },
  {
    "front": "State the law of demand.",
    "back": "Ceteris paribus, as the <strong>price of a good rises</strong>, the <strong>quantity demanded falls</strong>, and vice versa. This creates a downward-sloping demand curve."
  },
  {
    "front": "What causes a movement along the demand curve?",
    "back": "A change in the <strong>price of the good itself</strong>. A price rise causes a contraction in demand; a price fall causes an extension in demand."
  },
  {
    "front": "Name four factors that shift the demand curve.",
    "back": "<strong>Income</strong>, <strong>prices of substitutes and complements</strong>, <strong>consumer tastes and preferences</strong>, and <strong>population size</strong>. These shift the entire curve left or right."
  },
  {
    "front": "What is price elasticity of demand (PED)?",
    "back": "A measure of the <strong>responsiveness of quantity demanded</strong> to a change in price. Calculated as: <strong>% change in Qd ÷ % change in price</strong>. Always negative (inverse relationship)."
  },
  {
    "front": "What does PED > 1 mean?",
    "back": "Demand is <strong>price elastic</strong> — a 1% change in price causes a greater than 1% change in quantity demanded. A price rise reduces total revenue."
  },
  {
    "front": "What does PED < 1 mean?",
    "back": "Demand is <strong>price inelastic</strong> — a 1% change in price causes a less than 1% change in quantity demanded. A price rise increases total revenue."
  },
  {
    "front": "Name three factors that make demand price elastic.",
    "back": "Many <strong>close substitutes</strong> available, the good is a <strong>luxury</strong> rather than a necessity, and the good takes up a <strong>large proportion of income</strong>."
  },
  {
    "front": "What is income elasticity of demand (YED)?",
    "back": "A measure of the <strong>responsiveness of demand to a change in income</strong>. Calculated as: <strong>% change in Qd ÷ % change in income</strong>. Positive for normal goods, negative for inferior goods."
  },
  {
    "front": "What is a normal good?",
    "back": "A good for which demand <strong>increases as income rises</strong> (positive YED). Most goods are normal goods — e.g., restaurant meals, holidays, branded clothing."
  },
  {
    "front": "What is an inferior good?",
    "back": "A good for which demand <strong>falls as income rises</strong> (negative YED). Consumers switch to better alternatives as they become richer — e.g., value-brand food, bus travel."
  },
  {
    "front": "What is cross elasticity of demand (XED)?",
    "back": "A measure of the <strong>responsiveness of demand for good A to a change in the price of good B</strong>. Positive XED = substitutes; negative XED = complements."
  },
  {
    "front": "What is consumer surplus?",
    "back": "The difference between the price a consumer is <strong>willing to pay</strong> and the price they <strong>actually pay</strong>. Shown as the area below the demand curve and above the market price."
  },
  {
    "front": "What is the difference between a substitute and a complement?",
    "back": "<strong>Substitutes</strong> are goods that can replace each other (e.g., Coke and Pepsi). <strong>Complements</strong> are goods used together (e.g., cars and petrol). A rise in the price of one affects demand for the other."
  },
  {
    "front": "What is diminishing marginal utility?",
    "back": "As a consumer consumes more units of a good, the <strong>additional satisfaction</strong> from each extra unit <strong>decreases</strong>. This helps explain the downward-sloping demand curve."
  },
  {
    "front": "How does PED affect a firm's pricing strategy?",
    "back": "If demand is <strong>inelastic</strong>, a firm can raise prices to increase revenue. If demand is <strong>elastic</strong>, a firm should lower prices to increase revenue. PED determines the revenue impact of price changes."
  },
  {
    "front": "What happens to total revenue when price rises and demand is elastic?",
    "back": "Total revenue <strong>falls</strong>. The percentage drop in quantity demanded is greater than the percentage rise in price, so the loss in volume outweighs the gain from higher prices."
  },
  {
    "front": "What does a YED greater than 1 indicate?",
    "back": "A <strong>luxury good</strong> — demand rises more than proportionately to income. As incomes grow, spending on these goods grows faster than income itself."
  }
];

export const supply = [
  {
    "front": "What is supply?",
    "back": "The quantity of a good that producers are <strong>willing and able to offer for sale</strong> at a given price in a given time period."
  },
  {
    "front": "State the law of supply.",
    "back": "Ceteris paribus, as the <strong>price of a good rises</strong>, the <strong>quantity supplied increases</strong>. Higher prices make production more profitable, incentivising greater output."
  },
  {
    "front": "What causes a movement along the supply curve?",
    "back": "A change in the <strong>price of the good itself</strong>. A price rise causes an extension in supply; a price fall causes a contraction in supply."
  },
  {
    "front": "Name four factors that shift the supply curve.",
    "back": "<strong>Costs of production</strong> (wages, raw materials), <strong>technology</strong>, <strong>indirect taxes and subsidies</strong>, and <strong>number of firms</strong> in the market."
  },
  {
    "front": "What is price elasticity of supply (PES)?",
    "back": "A measure of the <strong>responsiveness of quantity supplied</strong> to a change in price. Calculated as: <strong>% change in Qs ÷ % change in price</strong>. Always positive."
  },
  {
    "front": "What makes supply price inelastic?",
    "back": "Firms <strong>cannot quickly increase output</strong> — limited spare capacity, long production times, scarce raw materials, or shortage of skilled labour. Agricultural goods are often supply inelastic."
  },
  {
    "front": "What makes supply price elastic?",
    "back": "Firms can <strong>quickly increase output</strong> — spare capacity, easy access to raw materials, flexible workforce, and short production times."
  },
  {
    "front": "What is producer surplus?",
    "back": "The difference between the <strong>market price</strong> and the <strong>minimum price</strong> a producer would accept. Shown as the area above the supply curve and below the market price."
  },
  {
    "front": "How does an indirect tax affect the supply curve?",
    "back": "It shifts supply <strong>to the left</strong> (upward). The tax increases the cost of production, so at every price level, producers supply less. The vertical distance between the curves equals the tax."
  },
  {
    "front": "How does a subsidy affect the supply curve?",
    "back": "It shifts supply <strong>to the right</strong> (downward). The subsidy reduces production costs, so at every price level, producers supply more."
  },
  {
    "front": "What is the difference between short-run and long-run supply?",
    "back": "In the <strong>short run</strong>, at least one factor of production is fixed (e.g., factory size), limiting output changes. In the <strong>long run</strong>, all factors are variable, allowing full adjustment of capacity."
  },
  {
    "front": "How does technology affect supply?",
    "back": "Improved technology <strong>reduces costs of production</strong> and increases productivity. Supply shifts right — firms can produce more at every price. E.g., automation in car manufacturing."
  },
  {
    "front": "What is a specific tax?",
    "back": "A <strong>fixed amount per unit</strong> sold (e.g., £1 per litre). Shifts the supply curve vertically upward by the same amount at every quantity."
  },
  {
    "front": "What is an ad valorem tax?",
    "back": "A tax set as a <strong>percentage of the price</strong> (e.g., 20% VAT). The supply curve pivots — the gap between old and new curves widens as price increases."
  },
  {
    "front": "Why does the supply curve slope upward?",
    "back": "Higher prices provide <strong>greater profit incentive</strong> for producers. Existing firms increase output and new firms may enter the market, attracted by higher returns."
  },
  {
    "front": "What happens to supply when wages increase?",
    "back": "Supply shifts <strong>to the left</strong>. Higher wages increase production costs, reducing the quantity firms are willing to supply at each price."
  },
  {
    "front": "How does the number of firms affect market supply?",
    "back": "More firms entering a market <strong>increases market supply</strong> (shifts right). Firms leaving the market <strong>decreases supply</strong> (shifts left)."
  },
  {
    "front": "What is joint supply?",
    "back": "When the production of one good <strong>automatically leads to the production</strong> of another — e.g., beef and leather. An increase in demand for one increases the supply of the other."
  }
];

export const priceDetermination = [
  {
    "front": "What is market equilibrium?",
    "back": "The point where <strong>quantity demanded equals quantity supplied</strong>. There is no tendency for price to change — the market clears with no excess supply or demand."
  },
  {
    "front": "What happens when price is above equilibrium?",
    "back": "There is <strong>excess supply</strong> (surplus). Producers cannot sell all their output, so they reduce prices. Price falls back toward equilibrium."
  },
  {
    "front": "What happens when price is below equilibrium?",
    "back": "There is <strong>excess demand</strong> (shortage). Consumers compete for limited goods, bidding up the price. Price rises back toward equilibrium."
  },
  {
    "front": "What is the effect of an increase in demand on equilibrium?",
    "back": "The demand curve shifts right, creating temporary <strong>excess demand</strong>. Equilibrium price <strong>rises</strong> and equilibrium quantity <strong>increases</strong>."
  },
  {
    "front": "What is the effect of an increase in supply on equilibrium?",
    "back": "The supply curve shifts right, creating temporary <strong>excess supply</strong>. Equilibrium price <strong>falls</strong> and equilibrium quantity <strong>increases</strong>."
  },
  {
    "front": "What is a price ceiling (maximum price)?",
    "back": "A government-imposed <strong>upper limit</strong> on the price of a good, set below equilibrium. Aims to keep goods affordable but creates <strong>excess demand</strong> and potential shortages."
  },
  {
    "front": "What is a price floor (minimum price)?",
    "back": "A government-imposed <strong>lower limit</strong> on the price of a good, set above equilibrium. E.g., minimum wage. Creates <strong>excess supply</strong> — e.g., unemployment in labour markets."
  },
  {
    "front": "What is the incidence of a tax?",
    "back": "How the <strong>burden of an indirect tax</strong> is shared between producers and consumers. If demand is inelastic, consumers bear more of the tax. If demand is elastic, producers bear more."
  },
  {
    "front": "How does PED determine the incidence of a tax?",
    "back": "If demand is <strong>inelastic</strong>, consumers pay a larger share (they cannot easily switch). If demand is <strong>elastic</strong>, producers absorb more of the tax (they cannot pass it on without losing sales)."
  },
  {
    "front": "What is the effect of a subsidy on equilibrium?",
    "back": "Supply shifts right → equilibrium price <strong>falls</strong>, quantity <strong>increases</strong>. Both consumers (lower price) and producers (higher effective price) benefit."
  },
  {
    "front": "What is deadweight loss?",
    "back": "A <strong>loss of economic efficiency</strong> that occurs when equilibrium is not achieved — e.g., from taxes, subsidies, or price controls. Represents lost consumer and producer surplus."
  },
  {
    "front": "What is total economic welfare?",
    "back": "The sum of <strong>consumer surplus and producer surplus</strong>. Maximised at the free-market equilibrium where there is no deadweight loss."
  },
  {
    "front": "What is a shortage?",
    "back": "When <strong>quantity demanded exceeds quantity supplied</strong> at the current price. The market price is below equilibrium. Solved by price rising or supply increasing."
  },
  {
    "front": "What is a surplus?",
    "back": "When <strong>quantity supplied exceeds quantity demanded</strong> at the current price. The market price is above equilibrium. Solved by price falling or demand increasing."
  },
  {
    "front": "What happens when both demand and supply increase simultaneously?",
    "back": "Quantity <strong>definitely increases</strong>. The effect on price is <strong>ambiguous</strong> — it depends on which shift is larger. If demand increases more, price rises; if supply increases more, price falls."
  },
  {
    "front": "What is a price mechanism?",
    "back": "The system by which <strong>changes in price</strong> allocate scarce resources in a market economy. Prices adjust to eliminate shortages and surpluses, signalling to buyers and sellers."
  },
  {
    "front": "Why might a price ceiling cause a black market?",
    "back": "By creating a <strong>shortage</strong>, a price ceiling means some consumers cannot buy at the official price. They may be willing to pay <strong>above the ceiling</strong> illegally, creating an underground market."
  },
  {
    "front": "What is the effect of removing a subsidy?",
    "back": "Supply shifts <strong>left</strong> → price <strong>rises</strong> and quantity <strong>falls</strong>. Consumers pay more and producers sell less. Used as a cost-cutting measure by governments."
  }
];

export const marketFailure = [
  {
    "front": "What is market failure?",
    "back": "When the free market leads to a <strong>misallocation of resources</strong> — prices fail to reflect the true costs or benefits, so too much or too little of a good is produced relative to the social optimum."
  },
  {
    "front": "What is a negative externality?",
    "back": "A <strong>cost imposed on third parties</strong> not involved in the transaction. E.g., factory pollution harms nearby residents. Social cost exceeds private cost, leading to <strong>overproduction</strong>."
  },
  {
    "front": "What is a positive externality?",
    "back": "A <strong>benefit enjoyed by third parties</strong> not involved in the transaction. E.g., vaccination reduces disease for everyone. Social benefit exceeds private benefit, leading to <strong>underconsumption</strong>."
  },
  {
    "front": "What is a public good?",
    "back": "A good that is <strong>non-excludable</strong> (cannot prevent non-payers from using it) and <strong>non-rivalrous</strong> (one person's use does not reduce availability). E.g., street lighting, national defence."
  },
  {
    "front": "What is the free rider problem?",
    "back": "Because public goods are non-excludable, people can <strong>benefit without paying</strong>. No rational consumer will pay if they can get it free, so the market will not provide the good."
  },
  {
    "front": "What is a merit good?",
    "back": "A good that is <strong>underconsumed</strong> in a free market because individuals underestimate its private and social benefits — often due to <strong>information failure</strong>. E.g., education, healthcare."
  },
  {
    "front": "What is a demerit good?",
    "back": "A good that is <strong>overconsumed</strong> in a free market because individuals underestimate the harm — due to <strong>information failure</strong>. E.g., cigarettes, alcohol, gambling."
  },
  {
    "front": "What is information failure?",
    "back": "When economic agents lack <strong>perfect knowledge</strong> to make rational decisions. Includes <strong>asymmetric information</strong> (one side knows more) and simply not knowing the full costs or benefits."
  },
  {
    "front": "What is asymmetric information?",
    "back": "When one party in a transaction has <strong>more or better information</strong> than the other. Leads to adverse selection and moral hazard. E.g., sellers know more about a used car than buyers."
  },
  {
    "front": "What is the difference between private and social cost?",
    "back": "<strong>Private cost</strong> = cost to the producer or consumer. <strong>Social cost</strong> = private cost + external costs (third-party costs). When social cost > private cost, there is a negative externality."
  },
  {
    "front": "What is the difference between MSB and MPB?",
    "back": "<strong>MPB</strong> (marginal private benefit) = benefit to the consumer. <strong>MSB</strong> (marginal social benefit) = MPB + external benefits. When MSB > MPB, there is a positive externality."
  },
  {
    "front": "What is a welfare loss (deadweight loss) from a negative externality?",
    "back": "The area between MSC and MSB, from the social optimum to the market output. Represents the <strong>excess cost to society</strong> from overproduction — society would be better off producing less."
  },
  {
    "front": "Why does the market overproduce goods with negative externalities?",
    "back": "Producers only consider <strong>private costs</strong>, ignoring external costs. The market price is too low (does not reflect full social cost), so more is produced and consumed than the socially optimal level."
  },
  {
    "front": "Why does the market underproduce goods with positive externalities?",
    "back": "Consumers only consider <strong>private benefits</strong>, ignoring external benefits. Demand is lower than socially optimal — MSB > MPB — so the market produces less than the socially efficient level."
  },
  {
    "front": "What is moral hazard?",
    "back": "When one party takes <strong>greater risks</strong> because they know another party bears the cost. E.g., a driver with full insurance may drive less carefully. A form of information failure."
  },
  {
    "front": "What is adverse selection?",
    "back": "When asymmetric information leads to <strong>low-quality goods dominating</strong> the market. E.g., in the used car market, sellers of lemons stay while owners of good cars exit (Akerlof's model)."
  },
  {
    "front": "Give an example of a negative externality of production.",
    "back": "A factory discharging <strong>pollution into a river</strong> — the cost of environmental damage falls on local communities and fisheries, not the factory. Private cost < social cost → overproduction."
  },
  {
    "front": "Give an example of a positive externality of consumption.",
    "back": "<strong>Vaccination</strong> — the individual gains immunity (private benefit), but society also gains through herd immunity (external benefit). MSB > MPB → underconsumption in a free market."
  }
];

export const governmentIntervention = [
  {
    "front": "Why do governments intervene in markets?",
    "back": "To <strong>correct market failure</strong> — reallocate resources toward the socially efficient level, reduce inequality, and provide goods the market would not supply (e.g., public goods)."
  },
  {
    "front": "How can an indirect tax correct a negative externality?",
    "back": "A tax equal to the external cost makes producers <strong>internalise the externality</strong>. It raises the private cost to equal social cost, reducing output to the socially optimal level."
  },
  {
    "front": "How can a subsidy correct a positive externality?",
    "back": "A subsidy equal to the external benefit <strong>reduces the price</strong> and encourages greater consumption. It closes the gap between MPB and MSB, increasing output toward the social optimum."
  },
  {
    "front": "What is a tradable pollution permit?",
    "back": "A government-issued right to emit a set amount of pollution. Firms that pollute less can <strong>sell surplus permits</strong> to heavier polluters. Creates a market-based incentive to reduce emissions."
  },
  {
    "front": "What is regulation as a response to market failure?",
    "back": "Government-imposed <strong>rules and laws</strong> that restrict behaviour — e.g., minimum standards, banned substances, planning restrictions. Effective but costly to monitor and enforce."
  },
  {
    "front": "What is the difference between direct and indirect provision?",
    "back": "<strong>Direct provision</strong>: government supplies the good itself (e.g., NHS, state education). <strong>Indirect provision</strong>: government funds private firms to supply it (e.g., outsourcing waste collection)."
  },
  {
    "front": "What is government failure?",
    "back": "When government intervention <strong>makes the allocation of resources worse</strong> than it would have been without intervention. The cure is worse than the disease."
  },
  {
    "front": "Name three causes of government failure.",
    "back": "<strong>Unintended consequences</strong> (policy creates new problems), <strong>information failure</strong> (government lacks data to set optimal tax/subsidy), and <strong>regulatory capture</strong> (regulators serve industry, not public interest)."
  },
  {
    "front": "What is an information campaign?",
    "back": "Government-funded advertising to <strong>correct information failure</strong> — e.g., anti-smoking campaigns, nutritional labelling. Aims to shift demand by changing consumer behaviour."
  },
  {
    "front": "What are the disadvantages of an indirect tax?",
    "back": "May be <strong>regressive</strong> (hits low-income households harder), difficult to set the <strong>correct level</strong> (requires knowing the exact external cost), and may encourage <strong>black markets</strong> if too high."
  },
  {
    "front": "What are the advantages of tradable pollution permits?",
    "back": "Set a <strong>guaranteed limit</strong> on total pollution, create a <strong>financial incentive</strong> to cut emissions, and allow the market to find the <strong>lowest-cost reduction</strong> method."
  },
  {
    "front": "What is a minimum price in the context of demerit goods?",
    "back": "A <strong>price floor</strong> set above equilibrium to discourage consumption — e.g., minimum unit pricing for alcohol. Raises price without generating tax revenue for the government."
  },
  {
    "front": "What is a maximum price in the context of essential goods?",
    "back": "A <strong>price ceiling</strong> set below equilibrium to keep essential goods affordable — e.g., rent controls. Helps consumers but may cause shortages and reduce supply in the long run."
  },
  {
    "front": "What is regulatory capture?",
    "back": "When a regulatory body <strong>acts in the interest of the industry</strong> it is supposed to regulate, rather than the public interest. Leads to ineffective regulation and government failure."
  },
  {
    "front": "Why might subsidies lead to government failure?",
    "back": "Subsidies may <strong>distort market signals</strong>, keep inefficient firms alive, be set at the wrong level, or be <strong>costly to taxpayers</strong>. They may also create dependency rather than solving the root problem."
  },
  {
    "front": "What is a buffer stock scheme?",
    "back": "A system where an agency <strong>buys surplus when prices are low</strong> and <strong>sells stock when prices are high</strong>, stabilising prices. Often used in agricultural markets."
  },
  {
    "front": "How can property rights solve externalities?",
    "back": "Assigning clear <strong>legal ownership</strong> allows those affected by externalities to negotiate or sue for compensation. Based on the <strong>Coase theorem</strong> — if transaction costs are low, parties can reach an efficient outcome."
  },
  {
    "front": "What is the Coase theorem?",
    "back": "If <strong>property rights are well-defined</strong> and <strong>transaction costs are low</strong>, private bargaining between parties can lead to an efficient allocation of resources without government intervention."
  }
];

// ═══════════════════════════════════════════════════════════════
// UNIT 2: MACROECONOMIC PERFORMANCE & POLICY (WEC12)
// ═══════════════════════════════════════════════════════════════

export const measuresEconomicPerformance = [
  {
    "front": "What is GDP (Gross Domestic Product)?",
    "back": "The total <strong>market value of all final goods and services</strong> produced within a country's borders in a given time period. The primary measure of economic output."
  },
  {
    "front": "What is the difference between real and nominal GDP?",
    "back": "<strong>Nominal GDP</strong> is measured at current prices (not adjusted for inflation). <strong>Real GDP</strong> is adjusted for inflation, giving a more accurate measure of output changes over time."
  },
  {
    "front": "What is inflation?",
    "back": "A <strong>sustained increase in the general price level</strong> over time. Measured by CPI (Consumer Price Index) in most countries. Erodes purchasing power."
  },
  {
    "front": "What is the CPI?",
    "back": "The <strong>Consumer Price Index</strong> — measures the average change in prices of a <strong>basket of goods and services</strong> consumed by a typical household. The UK inflation target is 2%."
  },
  {
    "front": "What is demand-pull inflation?",
    "back": "Inflation caused by <strong>aggregate demand exceeding aggregate supply</strong> at or near full employment. \"Too much money chasing too few goods.\" AD shifts right faster than AS."
  },
  {
    "front": "What is cost-push inflation?",
    "back": "Inflation caused by <strong>rising production costs</strong> — e.g., higher oil prices, wages, or raw materials. SRAS shifts left, pushing the price level up and output down."
  },
  {
    "front": "What is unemployment?",
    "back": "People of working age who are <strong>without work, actively seeking employment</strong>, and available to start. Measured by the claimant count or the ILO/Labour Force Survey."
  },
  {
    "front": "Name four types of unemployment.",
    "back": "<strong>Cyclical</strong> (insufficient AD in a recession), <strong>structural</strong> (skills mismatch), <strong>frictional</strong> (between jobs), and <strong>seasonal</strong> (regular fluctuations — e.g., tourism)."
  },
  {
    "front": "What is the current account of the balance of payments?",
    "back": "A record of a country's <strong>trade in goods, trade in services, primary income</strong> (investment returns), and <strong>secondary income</strong> (transfers). A deficit means imports > exports."
  },
  {
    "front": "What is a current account deficit?",
    "back": "When a country <strong>imports more than it exports</strong> (plus net income and transfers are negative). May indicate loss of competitiveness, strong currency, or high consumer spending on imports."
  },
  {
    "front": "What is the claimant count?",
    "back": "A measure of unemployment counting the number of people <strong>claiming unemployment-related benefits</strong>. Simpler but may undercount (not everyone eligible claims)."
  },
  {
    "front": "What is the Labour Force Survey (LFS)?",
    "back": "An ILO-defined survey measuring unemployment by asking if people are <strong>without work, seeking work, and available</strong>. More comprehensive than claimant count but relies on self-reporting."
  },
  {
    "front": "What is GDP per capita?",
    "back": "GDP divided by <strong>population size</strong>. A better measure of average living standards than total GDP because it accounts for population differences between countries."
  },
  {
    "front": "Name three limitations of GDP as a measure of welfare.",
    "back": "Ignores <strong>income distribution</strong> (inequality), excludes <strong>non-market activity</strong> (housework, volunteering), and does not account for <strong>environmental degradation</strong> or quality of life."
  },
  {
    "front": "What is deflation?",
    "back": "A <strong>sustained fall in the general price level</strong>. Can be harmful if it leads to delayed spending, rising real debt burdens, and a deflationary spiral of falling output and wages."
  },
  {
    "front": "What is the Phillips Curve?",
    "back": "Shows the <strong>short-run trade-off between inflation and unemployment</strong>. Lower unemployment tends to cause higher inflation (wage pressure) and vice versa."
  },
  {
    "front": "What is purchasing power parity (PPP)?",
    "back": "An exchange rate adjustment that allows <strong>comparing living standards</strong> across countries by accounting for differences in price levels. A dollar buys more in India than in Switzerland."
  },
  {
    "front": "What is disinflation?",
    "back": "A <strong>fall in the rate of inflation</strong> — prices are still rising, but more slowly. Different from deflation (where prices actually fall)."
  }
];

export const aggregateDemand = [
  {
    "front": "What is aggregate demand (AD)?",
    "back": "The <strong>total demand for goods and services</strong> in an economy at a given price level in a given period. AD = <strong>C + I + G + (X – M)</strong>."
  },
  {
    "front": "What are the four components of AD?",
    "back": "<strong>C</strong> (consumer spending), <strong>I</strong> (investment), <strong>G</strong> (government spending), and <strong>(X – M)</strong> (net exports: exports minus imports)."
  },
  {
    "front": "Why does the AD curve slope downward?",
    "back": "Three effects: the <strong>wealth effect</strong> (higher prices reduce real wealth → less spending), the <strong>interest rate effect</strong> (higher prices → higher rates → less borrowing), and the <strong>trade effect</strong> (higher prices → less competitive exports)."
  },
  {
    "front": "What shifts the AD curve to the right?",
    "back": "An increase in any component: higher <strong>consumer confidence</strong>, lower <strong>interest rates</strong>, increased <strong>government spending</strong>, or a weaker <strong>exchange rate</strong> boosting exports."
  },
  {
    "front": "What is the multiplier effect?",
    "back": "An initial change in spending leads to a <strong>larger final change in GDP</strong>. Income is re-spent, creating further rounds of income and spending. Multiplier = <strong>1 / (1 – MPC)</strong>."
  },
  {
    "front": "What is the marginal propensity to consume (MPC)?",
    "back": "The proportion of <strong>additional income that is spent</strong> on goods and services. MPC of 0.8 means 80p of every extra £1 earned is spent. Higher MPC → larger multiplier."
  },
  {
    "front": "What is the marginal propensity to save (MPS)?",
    "back": "The proportion of <strong>additional income that is saved</strong>. MPS = 1 – MPC. Higher MPS → smaller multiplier because more income leaks out of the circular flow."
  },
  {
    "front": "Name three withdrawals (leakages) from the circular flow.",
    "back": "<strong>Savings</strong> (S), <strong>taxation</strong> (T), and <strong>imports</strong> (M). These reduce the multiplier effect because income leaks out instead of being re-spent domestically."
  },
  {
    "front": "Name three injections into the circular flow.",
    "back": "<strong>Investment</strong> (I), <strong>government spending</strong> (G), and <strong>exports</strong> (X). These add spending into the economy and increase national income."
  },
  {
    "front": "What determines consumer spending (C)?",
    "back": "<strong>Disposable income</strong> (main factor), <strong>interest rates</strong>, <strong>consumer confidence</strong>, <strong>wealth effects</strong> (house and share prices), and <strong>availability of credit</strong>."
  },
  {
    "front": "What determines investment (I)?",
    "back": "<strong>Interest rates</strong> (cost of borrowing), <strong>business confidence</strong>, <strong>expected future demand</strong>, <strong>corporation tax</strong>, and <strong>technological change</strong>."
  },
  {
    "front": "How do interest rates affect AD?",
    "back": "Higher rates → more expensive borrowing → <strong>less consumer spending and investment</strong> → AD shifts left. Lower rates have the opposite effect."
  },
  {
    "front": "How does a weaker exchange rate affect AD?",
    "back": "Exports become <strong>cheaper</strong> (more competitive) and imports become <strong>more expensive</strong>. Net exports (X – M) increase → AD shifts right."
  },
  {
    "front": "What is the accelerator effect?",
    "back": "A <strong>change in GDP</strong> leads to a proportionally <strong>larger change in investment</strong>. When output rises, firms invest heavily in new capital to meet expected future demand."
  },
  {
    "front": "What is the wealth effect?",
    "back": "When asset prices (houses, shares) rise, consumers feel <strong>wealthier</strong> and spend more, even if their income hasn't changed. Shifts AD right. Falls in asset prices have the opposite effect."
  },
  {
    "front": "What is consumer confidence?",
    "back": "How <strong>optimistic or pessimistic</strong> households feel about their future income and the economy. High confidence → more spending; low confidence → more saving. A key driver of consumption."
  },
  {
    "front": "Why might the multiplier be smaller in practice?",
    "back": "Due to <strong>leakages</strong>: high taxation, high import spending, and high savings rates all reduce the proportion of income re-spent domestically, shrinking the multiplier."
  },
  {
    "front": "What is the formula for the multiplier?",
    "back": "<strong>1 / (1 – MPC)</strong> or equivalently <strong>1 / (MPS + MPT + MPM)</strong>. E.g., if MPC = 0.8, the multiplier is 1/0.2 = 5. A £1bn injection leads to a £5bn rise in GDP."
  }
];

export const aggregateSupply = [
  {
    "front": "What is aggregate supply (AS)?",
    "back": "The <strong>total output</strong> of goods and services that firms in an economy are willing and able to supply at a given price level."
  },
  {
    "front": "What is short-run aggregate supply (SRAS)?",
    "back": "The total output firms supply when at least one factor input (usually wages) is <strong>fixed in the short run</strong>. SRAS slopes upward — higher prices increase profits, incentivising more output."
  },
  {
    "front": "What shifts SRAS to the left?",
    "back": "Increases in <strong>costs of production</strong> — higher wages, raw material prices, energy costs, indirect taxes, or a weaker exchange rate (increasing import costs)."
  },
  {
    "front": "What is long-run aggregate supply (LRAS)?",
    "back": "The total output when <strong>all factors are variable</strong> and the economy is at full employment. In the classical model, LRAS is <strong>vertical</strong> — output is determined by supply-side factors, not the price level."
  },
  {
    "front": "What shifts LRAS to the right?",
    "back": "Improvements in the economy's <strong>productive capacity</strong>: better technology, more skilled labour, increased capital stock, institutional improvements, and discovery of new resources."
  },
  {
    "front": "What is the Keynesian AS curve?",
    "back": "A curve with three sections: <strong>horizontal</strong> (spare capacity — output rises with no inflation), <strong>upward-sloping</strong> (approaching full employment — bottlenecks cause some inflation), and <strong>vertical</strong> (at full capacity)."
  },
  {
    "front": "What is the difference between classical and Keynesian views of AS?",
    "back": "<strong>Classical</strong>: LRAS is vertical — the economy self-corrects to full employment. <strong>Keynesian</strong>: the economy can get stuck below full employment — government spending needed to close the output gap."
  },
  {
    "front": "What is a negative supply shock?",
    "back": "An unexpected event that <strong>increases production costs</strong> across the economy — e.g., an oil price spike. Shifts SRAS left, causing <strong>stagflation</strong> (higher prices and lower output)."
  },
  {
    "front": "What is stagflation?",
    "back": "A combination of <strong>stagnant output</strong> (or recession), <strong>high unemployment</strong>, and <strong>high inflation</strong> occurring simultaneously. Caused by negative supply shocks — very difficult to solve."
  },
  {
    "front": "What is full employment output?",
    "back": "The level of output where <strong>all willing workers are employed</strong> (only frictional and structural unemployment remain). Shown where AD intersects LRAS."
  },
  {
    "front": "What is a positive output gap?",
    "back": "When actual GDP <strong>exceeds potential GDP</strong>. The economy is overheating — demand outstrips capacity, creating inflationary pressure."
  },
  {
    "front": "What is a negative output gap?",
    "back": "When actual GDP is <strong>below potential GDP</strong>. There is spare capacity and unemployment — the economy is underperforming. Demand-side stimulus may help."
  },
  {
    "front": "How does investment shift LRAS?",
    "back": "Investment in <strong>new capital, technology, and infrastructure</strong> increases the economy's productive capacity. LRAS shifts right → potential output increases without inflationary pressure."
  },
  {
    "front": "How does education shift LRAS?",
    "back": "Better education increases <strong>labour productivity</strong> and human capital. Workers produce more output per hour → LRAS shifts right. A long-run supply-side improvement."
  },
  {
    "front": "What causes a movement along the SRAS curve?",
    "back": "A change in the <strong>aggregate price level</strong>. Higher prices → firms supply more (as nominal revenue rises while some costs are fixed in the short run)."
  },
  {
    "front": "What is the output gap?",
    "back": "The difference between <strong>actual GDP and potential GDP</strong>. Positive gap = inflationary pressure. Negative gap = unemployment and spare capacity."
  },
  {
    "front": "How does immigration affect LRAS?",
    "back": "Increases the <strong>labour supply</strong>, expanding productive capacity. LRAS shifts right — the economy can produce more output. May also fill skills gaps and reduce cost-push inflation."
  },
  {
    "front": "What determines the position of the LRAS curve?",
    "back": "The economy's <strong>productive potential</strong>: quantity and quality of <strong>labour</strong>, <strong>capital</strong>, <strong>technology</strong>, <strong>natural resources</strong>, and <strong>institutional framework</strong> (property rights, rule of law)."
  }
];

export const nationalIncome = [
  {
    "front": "What is the circular flow of income?",
    "back": "A model showing how <strong>income flows between households and firms</strong>. Households provide factors of production → firms pay factor incomes → households spend on goods → cycle repeats."
  },
  {
    "front": "What is national income equilibrium?",
    "back": "When <strong>total injections equal total withdrawals</strong> (I + G + X = S + T + M). The economy is in equilibrium — national income is stable, with no tendency to change."
  },
  {
    "front": "What happens when injections exceed withdrawals?",
    "back": "National income <strong>rises</strong>. More money enters the circular flow than leaves, so spending and output increase. The economy expands."
  },
  {
    "front": "What happens when withdrawals exceed injections?",
    "back": "National income <strong>falls</strong>. More money leaks out of the circular flow than enters, so spending and output decrease. The economy contracts."
  },
  {
    "front": "What is the expenditure method of measuring GDP?",
    "back": "GDP = <strong>C + I + G + (X – M)</strong>. Totals all spending on final goods and services. The most commonly used method."
  },
  {
    "front": "What is the income method of measuring GDP?",
    "back": "Totals all <strong>factor incomes</strong> earned in production: wages, rent, interest, and profits. Should equal GDP by the expenditure method."
  },
  {
    "front": "What is the output method of measuring GDP?",
    "back": "Totals the <strong>value added</strong> at each stage of production across all industries. Avoids double-counting by only counting the value added, not the total value."
  },
  {
    "front": "What is GNI (Gross National Income)?",
    "back": "GDP plus <strong>net income from abroad</strong> (income earned by residents overseas minus income earned by foreigners domestically). Measures total income of a country's residents."
  },
  {
    "front": "What is the paradox of thrift?",
    "back": "If all households try to save more, total <strong>spending falls</strong>, reducing incomes and output via the multiplier. The economy shrinks, and paradoxically, total savings may not increase."
  },
  {
    "front": "What is a transfer payment?",
    "back": "Government payments that are <strong>not in exchange for goods or services</strong> — e.g., pensions, welfare benefits, student grants. Excluded from GDP but affect disposable income."
  },
  {
    "front": "Why must we subtract imports when calculating GDP?",
    "back": "Imports represent spending on <strong>foreign-produced goods</strong>. They are included in C, I, and G but do not represent domestic output, so they must be subtracted to avoid overstating GDP."
  },
  {
    "front": "What is the difference between GDP and GNP?",
    "back": "<strong>GDP</strong> measures output produced <strong>within a country's borders</strong> (territorial). <strong>GNP/GNI</strong> measures output produced by a country's <strong>residents</strong> (regardless of location)."
  },
  {
    "front": "What is net national income?",
    "back": "GNI minus <strong>depreciation</strong> (capital consumption). Accounts for the wearing out of capital goods, giving a more accurate picture of sustainable income."
  },
  {
    "front": "What are the three approaches to measuring national income?",
    "back": "<strong>Expenditure</strong> (total spending), <strong>income</strong> (total factor incomes), and <strong>output</strong> (total value added). All three should give the same GDP figure in theory."
  },
  {
    "front": "What is the informal economy?",
    "back": "Economic activity that is <strong>not recorded in official statistics</strong> — e.g., cash-in-hand work, undeclared earnings. Causes GDP to understate true output, especially in developing countries."
  },
  {
    "front": "What is the multiplier in the context of national income?",
    "back": "The ratio of the <strong>final change in national income</strong> to the <strong>initial change in spending</strong>. An injection of £1bn with a multiplier of 4 increases GDP by £4bn."
  },
  {
    "front": "What is an automatic stabiliser?",
    "back": "A fiscal mechanism that <strong>dampens economic fluctuations without policy changes</strong>. E.g., in a recession, tax revenue falls and benefits rise automatically, supporting demand."
  },
  {
    "front": "What is a recession?",
    "back": "Defined as <strong>two consecutive quarters of negative GDP growth</strong>. Characterised by falling output, rising unemployment, and declining consumer and business confidence."
  }
];

export const economicGrowth = [
  {
    "front": "What is economic growth?",
    "back": "A sustained increase in <strong>real GDP over time</strong>. Short-run growth = using spare capacity (moving toward the PPF). Long-run growth = expanding productive capacity (shifting the PPF outward)."
  },
  {
    "front": "What is the difference between actual and potential growth?",
    "back": "<strong>Actual growth</strong>: the rate at which real GDP increases (can use spare capacity). <strong>Potential growth</strong>: the rate at which the economy's productive capacity expands (LRAS shifts right)."
  },
  {
    "front": "What is the business cycle?",
    "back": "The <strong>regular fluctuations in GDP</strong> around the long-run trend. Four phases: <strong>boom</strong> (peak), <strong>recession</strong> (contraction), <strong>slump</strong> (trough), and <strong>recovery</strong> (expansion)."
  },
  {
    "front": "What happens during a boom?",
    "back": "GDP grows rapidly, unemployment falls, consumer confidence is high, and <strong>inflationary pressure builds</strong>. Asset prices often rise. The economy may overheat if AD exceeds LRAS."
  },
  {
    "front": "What happens during a recession?",
    "back": "GDP falls for <strong>two or more consecutive quarters</strong>. Unemployment rises, business profits fall, consumer spending drops, and confidence collapses. Government tax revenues decline."
  },
  {
    "front": "Name three benefits of economic growth.",
    "back": "Higher <strong>living standards</strong> (more goods and services), lower <strong>unemployment</strong>, increased <strong>tax revenue</strong> (funding public services). Also attracts investment."
  },
  {
    "front": "Name three costs of economic growth.",
    "back": "<strong>Environmental degradation</strong> (pollution, resource depletion), <strong>inequality</strong> (growth may not be evenly shared), and <strong>inflation</strong> if demand grows faster than supply."
  },
  {
    "front": "What is sustainable growth?",
    "back": "Economic growth that <strong>meets present needs without compromising</strong> future generations' ability to meet theirs. Requires balancing output with environmental and resource constraints."
  },
  {
    "front": "What causes long-run economic growth?",
    "back": "Increases in <strong>productive capacity</strong>: investment in capital, technological innovation, education and training, infrastructure, and institutional improvements (rule of law, property rights)."
  },
  {
    "front": "What causes short-run economic growth?",
    "back": "Increases in <strong>aggregate demand</strong> when there is spare capacity — e.g., lower interest rates, higher consumer confidence, fiscal stimulus. Moves the economy toward its PPF."
  },
  {
    "front": "What is the trend rate of growth?",
    "back": "The <strong>average long-run rate</strong> at which potential GDP grows over time. Determined by supply-side factors. Actual growth fluctuates above and below this trend."
  },
  {
    "front": "What is the Human Development Index (HDI)?",
    "back": "A composite measure of development combining <strong>life expectancy</strong>, <strong>education</strong> (mean and expected years of schooling), and <strong>GNI per capita</strong>. Ranges from 0 to 1."
  },
  {
    "front": "Why might GDP growth not improve living standards?",
    "back": "Growth may increase <strong>inequality</strong>, be concentrated in polluting industries, not reflect <strong>quality of life</strong> (leisure, health), or be driven by unsustainable debt."
  },
  {
    "front": "What is the output gap during a recession?",
    "back": "A <strong>negative output gap</strong> — actual GDP is below potential GDP. There is spare capacity, high unemployment, and low inflationary pressure."
  },
  {
    "front": "What role does investment play in growth?",
    "back": "Investment increases AD in the <strong>short run</strong> (component of C+I+G+(X-M)) and increases LRAS in the <strong>long run</strong> (expanding productive capacity). It drives both actual and potential growth."
  },
  {
    "front": "What is productivity?",
    "back": "Output per unit of input — most commonly measured as <strong>output per worker per hour</strong>. Higher productivity means more output from the same resources, driving long-run growth."
  },
  {
    "front": "What is the relationship between growth and the environment?",
    "back": "Growth often causes <strong>pollution, deforestation, and resource depletion</strong>. However, richer countries may invest more in green technology. The challenge is <strong>decoupling growth from emissions</strong>."
  },
  {
    "front": "What is GDP per capita growth?",
    "back": "The rate of change in <strong>GDP divided by population</strong>. A better measure of improving living standards than total GDP growth, especially if population is growing quickly."
  }
];

export const macroeconomicObjectivesPolicies = [
  {
    "front": "What are the main macroeconomic objectives?",
    "back": "<strong>Economic growth</strong>, <strong>low unemployment</strong>, <strong>low and stable inflation</strong> (typically 2%), <strong>balance of payments stability</strong>, and increasingly <strong>environmental sustainability</strong>."
  },
  {
    "front": "What is fiscal policy?",
    "back": "The use of <strong>government spending and taxation</strong> to influence the economy. Expansionary fiscal policy = higher spending or lower taxes. Contractionary = lower spending or higher taxes."
  },
  {
    "front": "What is monetary policy?",
    "back": "The use of <strong>interest rates and money supply</strong> by the central bank to influence the economy. Lower rates → more borrowing and spending → higher AD."
  },
  {
    "front": "What is supply-side policy?",
    "back": "Policies aimed at increasing the economy's <strong>productive capacity</strong> (shifting LRAS right). E.g., education, training, deregulation, infrastructure investment, tax incentives for R&D."
  },
  {
    "front": "What is expansionary fiscal policy?",
    "back": "<strong>Increasing government spending</strong> or <strong>cutting taxes</strong> to boost AD. Used during recessions to stimulate demand and reduce unemployment. Leads to a larger budget deficit."
  },
  {
    "front": "What is contractionary fiscal policy?",
    "back": "<strong>Cutting government spending</strong> or <strong>raising taxes</strong> to reduce AD. Used to cool an overheating economy and reduce inflation. Leads to a smaller budget deficit or surplus."
  },
  {
    "front": "What is the Bank of England's inflation target?",
    "back": "<strong>2% CPI inflation</strong>. The Monetary Policy Committee (MPC) sets the base interest rate to achieve this target. If inflation is above 2%, rates rise; if below, rates may fall."
  },
  {
    "front": "How do lower interest rates affect the economy?",
    "back": "Lower cost of borrowing → more <strong>consumer spending and investment</strong>. Lower mortgage payments → more disposable income. Weaker exchange rate → more competitive exports. AD shifts right."
  },
  {
    "front": "What is quantitative easing (QE)?",
    "back": "The central bank <strong>creates new money electronically</strong> to buy government bonds. This lowers long-term interest rates, increases the money supply, and encourages lending and spending."
  },
  {
    "front": "Name three supply-side policies.",
    "back": "<strong>Investment in education</strong> (improves human capital), <strong>deregulation</strong> (reduces business costs), and <strong>infrastructure spending</strong> (improves efficiency). All aim to shift LRAS right."
  },
  {
    "front": "What is the trade-off between inflation and unemployment?",
    "back": "Shown by the <strong>Phillips Curve</strong>. Reducing unemployment (via expansionary policy) may cause inflation. Reducing inflation (via contractionary policy) may cause unemployment. Short-run trade-off."
  },
  {
    "front": "What is a budget deficit?",
    "back": "When government <strong>spending exceeds tax revenue</strong> in a financial year. Must be financed by borrowing (issuing government bonds), adding to the national debt."
  },
  {
    "front": "What is the national debt?",
    "back": "The <strong>total accumulated government borrowing</strong> over time. The sum of all past budget deficits minus surpluses. Measured as a percentage of GDP."
  },
  {
    "front": "What is the difference between demand-side and supply-side policies?",
    "back": "<strong>Demand-side</strong> (fiscal, monetary) affect AD — quick impact but may cause inflation. <strong>Supply-side</strong> policies affect LRAS — slower but increase capacity without inflation."
  },
  {
    "front": "What are the time lags of fiscal policy?",
    "back": "Fiscal policy has <strong>recognition, decision, and implementation lags</strong>. It takes time to identify the problem, agree on policy, and for spending/tax changes to affect the economy."
  },
  {
    "front": "What is austerity?",
    "back": "A policy of <strong>reducing government budget deficits</strong> through spending cuts and tax rises. Aims to reduce national debt but may slow growth and increase unemployment."
  },
  {
    "front": "Why might supply-side policies conflict with equity?",
    "back": "Policies like <strong>deregulation</strong> or <strong>cutting corporation tax</strong> may benefit firms and high earners more than workers. Flexible labour markets may mean lower wages and less job security."
  },
  {
    "front": "What is the transmission mechanism of monetary policy?",
    "back": "The chain from <strong>interest rate change → borrowing costs → spending and investment → AD → output and prices</strong>. Takes 18–24 months for the full effect to be felt."
  }
];

// ═══════════════════════════════════════════════════════════════
// UNIT 3: BUSINESS BEHAVIOUR (WEC13)
// ═══════════════════════════════════════════════════════════════

export const typesSizesBusinesses = [
  {
    "front": "What is a sole trader?",
    "back": "A business owned and run by <strong>one person</strong> with unlimited liability. Easy to set up but the owner bears all risk and may struggle to raise finance."
  },
  {
    "front": "What is a partnership?",
    "back": "A business owned by <strong>2–20 partners</strong> who share responsibility and profits. Each partner has unlimited liability unless it is a limited liability partnership (LLP)."
  },
  {
    "front": "What is a private limited company (Ltd)?",
    "back": "A company with <strong>limited liability</strong> — shareholders can only lose what they invested. Shares cannot be sold to the public. Common for small and medium businesses."
  },
  {
    "front": "What is a public limited company (PLC)?",
    "back": "A company whose shares are traded on the <strong>stock exchange</strong>. Can raise large amounts of capital but faces pressure from shareholders and greater public scrutiny."
  },
  {
    "front": "What is limited liability?",
    "back": "Shareholders' personal assets are <strong>protected</strong> — they can only lose the amount they invested in the company. The business is a separate legal entity from its owners."
  },
  {
    "front": "What is unlimited liability?",
    "back": "The owner is <strong>personally responsible for all business debts</strong>. If the business fails, personal assets (house, savings) can be used to pay creditors."
  },
  {
    "front": "What is profit maximisation?",
    "back": "Producing where <strong>MC = MR</strong> (marginal cost equals marginal revenue). The output level that maximises the difference between total revenue and total cost."
  },
  {
    "front": "What is revenue maximisation?",
    "back": "Producing where <strong>MR = 0</strong> (marginal revenue is zero). The firm maximises total revenue by selling up to the point where the last unit adds nothing to revenue."
  },
  {
    "front": "What is sales maximisation?",
    "back": "Producing the <strong>maximum output</strong> while still covering costs — where <strong>AC = AR</strong> (average cost equals average revenue). The firm makes normal profit."
  },
  {
    "front": "What is satisficing?",
    "back": "Making <strong>enough profit to keep stakeholders satisfied</strong> rather than maximising profit. Common when ownership and management are separated (principal-agent problem)."
  },
  {
    "front": "What is the principal-agent problem?",
    "back": "When <strong>owners (principals) and managers (agents)</strong> have different objectives. Owners want profit maximisation; managers may pursue growth, salary, or status instead."
  },
  {
    "front": "What is horizontal integration?",
    "back": "A merger between firms at the <strong>same stage of production</strong> in the same industry — e.g., two car manufacturers merging. Increases market share and economies of scale."
  },
  {
    "front": "What is vertical integration?",
    "back": "A merger between firms at <strong>different stages of production</strong>. <strong>Backward</strong>: toward suppliers. <strong>Forward</strong>: toward customers. Secures supply chain or distribution."
  },
  {
    "front": "What is a conglomerate merger?",
    "back": "A merger between firms in <strong>unrelated industries</strong> — e.g., a food company merging with a tech firm. Aims to diversify risk and exploit financial synergies."
  },
  {
    "front": "What are economies of scale?",
    "back": "<strong>Cost advantages</strong> from increased output — average costs fall as the firm grows. Types: technical, managerial, purchasing, financial, marketing, and risk-bearing."
  },
  {
    "front": "What are diseconomies of scale?",
    "back": "When average costs <strong>rise as output increases</strong> beyond a certain point — caused by communication problems, coordination difficulties, and worker alienation in very large firms."
  },
  {
    "front": "What is organic growth?",
    "back": "Growth from the firm's <strong>own resources</strong> — increasing sales, opening new branches, developing new products. Slower but lower risk than external growth."
  },
  {
    "front": "What is external growth?",
    "back": "Growth through <strong>mergers and acquisitions</strong> — taking over or merging with other firms. Faster but riskier — integration problems, culture clashes, and high cost."
  }
];

export const revenueCostsProfits = [
  {
    "front": "What is total revenue (TR)?",
    "back": "<strong>Price × Quantity sold</strong>. The total income a firm receives from selling its output. TR increases when either price or quantity increases (depending on PED)."
  },
  {
    "front": "What is marginal revenue (MR)?",
    "back": "The <strong>additional revenue</strong> from selling one more unit. MR = change in TR / change in quantity. For a price-taker, MR = price. For a price-maker, MR < price."
  },
  {
    "front": "What is average revenue (AR)?",
    "back": "<strong>TR ÷ Quantity</strong> = revenue per unit = <strong>the price</strong>. The AR curve is the firm's demand curve. In perfect competition, AR = MR = price."
  },
  {
    "front": "What is the difference between fixed and variable costs?",
    "back": "<strong>Fixed costs</strong> do not change with output (e.g., rent, salaries). <strong>Variable costs</strong> change directly with output (e.g., raw materials, energy). TC = FC + VC."
  },
  {
    "front": "What is marginal cost (MC)?",
    "back": "The <strong>additional cost of producing one more unit</strong>. MC = change in TC / change in quantity. MC initially falls (increasing returns) then rises (diminishing returns)."
  },
  {
    "front": "What is average total cost (ATC)?",
    "back": "<strong>TC ÷ Quantity</strong>. Also called average cost (AC). U-shaped in the short run — falls initially (spreading fixed costs) then rises (diminishing returns)."
  },
  {
    "front": "What is normal profit?",
    "back": "The <strong>minimum profit needed to keep a firm in the industry</strong> — covering all costs including the opportunity cost of the entrepreneur's time and capital. Earned when AR = AC."
  },
  {
    "front": "What is supernormal (abnormal) profit?",
    "back": "Profit <strong>above normal profit</strong> — earned when AR > AC. In perfect competition, supernormal profit attracts new entrants; in monopoly, barriers to entry protect it."
  },
  {
    "front": "What is the law of diminishing returns?",
    "back": "In the short run, as more of a variable factor is added to a <strong>fixed factor</strong>, the marginal product of the variable factor eventually <strong>falls</strong>. Causes MC to rise."
  },
  {
    "front": "What are returns to scale?",
    "back": "A long-run concept. <strong>Increasing returns</strong>: output grows faster than inputs (economies of scale). <strong>Constant returns</strong>: proportional. <strong>Decreasing returns</strong>: output grows slower (diseconomies)."
  },
  {
    "front": "What is the shutdown point?",
    "back": "The price level below which a firm will <strong>stop production</strong>. In the short run: where price < <strong>AVC</strong> (can't cover variable costs). In the long run: where price < <strong>ATC</strong>."
  },
  {
    "front": "When does a firm profit maximise?",
    "back": "Where <strong>MC = MR</strong>. Below this point, making one more unit adds more to revenue than cost. Above it, making one more unit costs more than it earns."
  },
  {
    "front": "What is the relationship between MC and AC?",
    "back": "When MC < AC, average cost is <strong>falling</strong>. When MC > AC, average cost is <strong>rising</strong>. MC cuts AC at its <strong>minimum point</strong>."
  },
  {
    "front": "What are economies of scope?",
    "back": "Cost savings from producing <strong>a range of products</strong> rather than specialising in one. Shared resources, distribution networks, and brand reputation reduce average costs."
  },
  {
    "front": "What is the long-run average cost (LRAC) curve?",
    "back": "An <strong>envelope curve</strong> showing the lowest possible average cost at each output level when all factors are variable. U-shaped due to economies then diseconomies of scale."
  },
  {
    "front": "What is minimum efficient scale (MES)?",
    "back": "The <strong>lowest output level</strong> at which a firm can achieve the minimum long-run average cost. Industries with high MES tend toward fewer, larger firms."
  },
  {
    "front": "What is the difference between accounting and economic profit?",
    "back": "<strong>Accounting profit</strong> = TR – explicit costs. <strong>Economic profit</strong> = TR – explicit costs – implicit costs (opportunity costs). A firm can make accounting profit but economic loss."
  },
  {
    "front": "What is productive efficiency?",
    "back": "Producing at the <strong>lowest point on the AC curve</strong> — using the minimum resources per unit of output. Achieved in long-run equilibrium under perfect competition."
  }
];

export const marketStructuresContestability = [
  {
    "front": "What is perfect competition?",
    "back": "A market with <strong>many small firms</strong>, identical products, perfect information, and <strong>no barriers to entry or exit</strong>. Firms are price-takers — they accept the market price."
  },
  {
    "front": "What is a monopoly?",
    "back": "A market with a <strong>single dominant seller</strong> (or >25% market share in UK law). High barriers to entry protect supernormal profit. The monopolist is a price-maker."
  },
  {
    "front": "What is an oligopoly?",
    "back": "A market dominated by a <strong>few large firms</strong> with high concentration ratios. Key feature: <strong>interdependence</strong> — each firm's decisions affect and are affected by rivals' actions."
  },
  {
    "front": "What is monopolistic competition?",
    "back": "Many firms selling <strong>differentiated products</strong> with low barriers to entry. Firms have some price-setting power from differentiation but face competition from close substitutes."
  },
  {
    "front": "What are barriers to entry?",
    "back": "Obstacles that prevent new firms from entering a market — e.g., <strong>economies of scale</strong>, <strong>patents</strong>, <strong>brand loyalty</strong>, <strong>legal barriers</strong>, and <strong>high start-up costs</strong>."
  },
  {
    "front": "What is the concentration ratio?",
    "back": "The <strong>market share of the largest firms</strong> — e.g., a 5-firm concentration ratio of 80% means the top 5 firms control 80% of the market. Higher ratio = more oligopolistic."
  },
  {
    "front": "What is price discrimination?",
    "back": "Charging <strong>different prices to different consumers</strong> for the same product — based on willingness to pay. Requires market power, ability to segment, and prevention of resale."
  },
  {
    "front": "What are the three degrees of price discrimination?",
    "back": "<strong>First degree</strong>: each consumer pays maximum willingness to pay. <strong>Second degree</strong>: prices vary by quantity (bulk discounts). <strong>Third degree</strong>: prices vary by market segment (e.g., student discounts)."
  },
  {
    "front": "What is a contestable market?",
    "back": "A market where the <strong>threat of entry</strong> disciplines existing firms — even if few firms operate. Low barriers to entry and exit mean firms behave competitively to deter potential entrants."
  },
  {
    "front": "What are sunk costs?",
    "back": "Costs that <strong>cannot be recovered</strong> if a firm exits the market — e.g., advertising, specialised equipment. High sunk costs reduce contestability because exit is costly."
  },
  {
    "front": "What is collusion?",
    "back": "When firms in an oligopoly <strong>agree to restrict competition</strong> — fixing prices, output, or market shares. Illegal in most countries but tacit collusion (unspoken coordination) is hard to prove."
  },
  {
    "front": "What is a cartel?",
    "back": "A <strong>formal agreement between firms</strong> to collude — fixing prices or restricting output. Acts like a monopoly. E.g., OPEC. Illegal in most countries but persists internationally."
  },
  {
    "front": "What is the kinked demand curve model?",
    "back": "Explains <strong>price rigidity in oligopoly</strong>. If a firm raises price, rivals don't follow (elastic demand → revenue falls). If it cuts price, rivals match (inelastic → revenue falls). So prices stay stable."
  },
  {
    "front": "What is game theory?",
    "back": "The study of <strong>strategic decision-making</strong> where outcomes depend on rivals' actions. The prisoner's dilemma shows why firms may compete rather than collude, even when collusion benefits both."
  },
  {
    "front": "What is allocative efficiency?",
    "back": "Achieved when <strong>P = MC</strong>. Resources are allocated to produce the combination of goods that maximises consumer welfare. Occurs in perfect competition but not in monopoly."
  },
  {
    "front": "What is X-inefficiency?",
    "back": "When a firm operates <strong>above its lowest possible cost curve</strong> due to lack of competitive pressure. Common in monopolies — no incentive to minimise costs."
  },
  {
    "front": "What is natural monopoly?",
    "back": "An industry where the <strong>MES is so large</strong> relative to market demand that only one firm can operate efficiently. Duplication would raise costs — e.g., water supply, rail networks."
  },
  {
    "front": "What is the prisoner's dilemma?",
    "back": "A game theory model showing why two rational firms may <strong>not cooperate</strong> even when it's in their mutual interest. Each fears being undercut, so both compete — reaching a worse outcome."
  }
];

export const labourMarkets = [
  {
    "front": "What is derived demand for labour?",
    "back": "Labour is demanded not for itself but because it is <strong>needed to produce goods and services</strong>. If demand for the product rises, demand for the workers who make it rises too."
  },
  {
    "front": "What is marginal revenue product (MRP)?",
    "back": "The <strong>additional revenue</strong> a firm earns from hiring one more worker. MRP = <strong>MPP × MR</strong> (marginal physical product × marginal revenue). Firms hire until MRP = wage."
  },
  {
    "front": "What determines the demand for labour?",
    "back": "The <strong>MRP of workers</strong>, which depends on: productivity (MPP), price of the product (MR), and the state of product demand. Higher MRP → higher demand for labour."
  },
  {
    "front": "What determines the supply of labour?",
    "back": "<strong>Wages</strong> (higher wages attract more workers), <strong>non-monetary benefits</strong>, <strong>qualifications and training</strong>, <strong>geographic mobility</strong>, and the size of the working-age population."
  },
  {
    "front": "What is a perfectly competitive labour market?",
    "back": "Many employers and workers, <strong>homogeneous labour</strong>, perfect information, and no barriers to entry. The wage is set by market supply and demand — firms are wage-takers."
  },
  {
    "front": "What is a monopsony?",
    "back": "A labour market with a <strong>single dominant employer</strong> (or very few). The employer has wage-setting power and can pay below the competitive wage. E.g., the NHS for nurses."
  },
  {
    "front": "How does a monopsony affect wages?",
    "back": "The monopsonist faces an <strong>upward-sloping supply curve</strong> and hires where MCL = MRP. This results in a <strong>lower wage and fewer workers</strong> than in a competitive market."
  },
  {
    "front": "What is the national minimum wage (NMW)?",
    "back": "A <strong>legal floor on wages</strong> set by the government. Aims to reduce poverty but may cause unemployment if set above equilibrium — firms hire fewer workers."
  },
  {
    "front": "What is the effect of a trade union on wages?",
    "back": "Unions use <strong>collective bargaining</strong> to negotiate wages above the competitive level. If successful, wages rise but employment may fall — depends on the employer's market power."
  },
  {
    "front": "What is wage elasticity of demand?",
    "back": "The <strong>responsiveness of quantity of labour demanded</strong> to a change in the wage rate. Inelastic if workers are hard to replace or labour costs are a small share of total costs."
  },
  {
    "front": "What is the substitution effect of a wage increase?",
    "back": "Higher wages make <strong>leisure more expensive</strong> relative to work (the opportunity cost of not working rises). Workers substitute leisure for work → <strong>supply more labour hours</strong>."
  },
  {
    "front": "What is the income effect of a wage increase?",
    "back": "Higher wages mean workers can <strong>earn the same income in fewer hours</strong>. They may choose more leisure → <strong>supply fewer labour hours</strong>. Dominates at very high wages."
  },
  {
    "front": "What is human capital?",
    "back": "The <strong>knowledge, skills, and experience</strong> embodied in workers. Investment in education and training increases human capital, raising productivity and earning potential."
  },
  {
    "front": "What causes wage differentials between occupations?",
    "back": "<strong>Skills and qualifications</strong>, <strong>working conditions</strong> (compensating differentials), <strong>labour supply and demand</strong> imbalances, <strong>trade union power</strong>, and <strong>discrimination</strong>."
  },
  {
    "front": "What is the backward-bending supply curve of labour?",
    "back": "At low wages, higher wages increase supply (substitution effect dominates). Beyond a point, higher wages <strong>reduce supply</strong> (income effect dominates — workers value leisure more)."
  },
  {
    "front": "What is geographic immobility of labour?",
    "back": "Workers are unable or unwilling to <strong>move to where jobs are</strong> — due to housing costs, family ties, or regional attachment. Causes persistent unemployment in some areas."
  },
  {
    "front": "What is occupational immobility of labour?",
    "back": "Workers lack the <strong>skills or qualifications</strong> to switch between jobs or industries. Causes structural unemployment — e.g., coal miners cannot easily become software engineers."
  },
  {
    "front": "How does immigration affect the labour market?",
    "back": "Increases <strong>labour supply</strong>, which may lower wages in affected sectors. But also increases demand for goods (more consumers) and fills skills gaps. Net effect is debated."
  }
];

export const governmentInterventionFirms = [
  {
    "front": "What is competition policy?",
    "back": "Government regulation to promote <strong>competition and prevent abuse of market power</strong>. Includes preventing monopolies, blocking anti-competitive mergers, and banning cartels."
  },
  {
    "front": "What is the role of the CMA?",
    "back": "The <strong>Competition and Markets Authority</strong> investigates mergers, enforces competition law, and protects consumers from anti-competitive practices in the UK."
  },
  {
    "front": "What is privatisation?",
    "back": "Transferring ownership of a business or industry from the <strong>public sector to the private sector</strong>. Aims to improve efficiency through competition and profit incentives."
  },
  {
    "front": "What is nationalisation?",
    "back": "Transferring ownership from the <strong>private sector to the government</strong>. Justified when natural monopolies need regulation or essential services should not be run for profit."
  },
  {
    "front": "What is deregulation?",
    "back": "Removing or reducing <strong>government regulations</strong> to encourage competition and new market entrants. Aims to lower prices and increase efficiency but may reduce standards."
  },
  {
    "front": "What is regulation of natural monopolies?",
    "back": "Government controls on firms with <strong>natural monopoly power</strong> — e.g., price caps (RPI – X), quality standards, and investment requirements. Prevents exploitation while maintaining efficiency."
  },
  {
    "front": "What is an RPI – X price cap?",
    "back": "Limits price rises to <strong>inflation minus an efficiency factor</strong>. E.g., RPI – 3% means prices can rise 3% less than inflation. Forces firms to cut costs and improve efficiency."
  },
  {
    "front": "What are the arguments for privatisation?",
    "back": "<strong>Profit motive improves efficiency</strong>, competition drives innovation, reduces government spending, and share ownership gives public a stake. May also reduce political interference."
  },
  {
    "front": "What are the arguments against privatisation?",
    "back": "Natural monopolies may exploit consumers, <strong>short-termism</strong> (cutting investment for quick profits), potential job losses, and essential services may become unaffordable."
  },
  {
    "front": "What is a merger?",
    "back": "When two firms <strong>combine to form a new entity</strong>. May be investigated by the CMA if it could substantially lessen competition — blocked if anti-competitive effects outweigh benefits."
  },
  {
    "front": "What is predatory pricing?",
    "back": "Setting prices <strong>below cost to drive competitors out</strong>, then raising prices once rivals have exited. Anti-competitive and illegal. Requires deep pockets to sustain losses."
  },
  {
    "front": "What are restrictive practices?",
    "back": "Agreements between firms that <strong>restrict competition</strong> — e.g., price fixing, market sharing, bid rigging, exclusive dealing. Illegal under competition law."
  },
  {
    "front": "What is a subsidy to encourage competition?",
    "back": "Government payments to new entrants or smaller firms to help them <strong>compete with dominant incumbents</strong>. Lowers barriers to entry and increases contestability."
  },
  {
    "front": "What is the deadweight loss from monopoly?",
    "back": "The <strong>loss of consumer and producer surplus</strong> because a monopoly produces less and charges more than the competitive outcome. Resources are misallocated — allocative inefficiency."
  },
  {
    "front": "What is dynamic efficiency?",
    "back": "Efficiency over time — achieved when firms <strong>invest in innovation</strong> and new technology. Monopolies may be dynamically efficient if they reinvest supernormal profits in R&D."
  },
  {
    "front": "Why might monopolies be beneficial?",
    "back": "Supernormal profit funds <strong>R&D and innovation</strong> (dynamic efficiency), economies of scale reduce costs, and <strong>cross-subsidisation</strong> can maintain unprofitable but socially valuable services."
  },
  {
    "front": "What is consumer sovereignty?",
    "back": "The idea that <strong>consumers determine what is produced</strong> through their spending decisions. Works well in competitive markets but is undermined by monopoly power and advertising."
  },
  {
    "front": "What is a contestable market?",
    "back": "A market where potential entry disciplines existing firms. Even a monopolist may behave competitively if <strong>barriers to entry are low and sunk costs are minimal</strong>."
  }
];

// ═══════════════════════════════════════════════════════════════
// UNIT 4: DEVELOPMENTS IN THE GLOBAL ECONOMY (WEC14)
// ═══════════════════════════════════════════════════════════════

export const causesEffectsGlobalisation = [
  {
    "front": "What is globalisation?",
    "back": "The increasing <strong>interdependence and integration</strong> of the world's economies through cross-border trade, investment, migration, and the spread of technology."
  },
  {
    "front": "Name four causes of globalisation.",
    "back": "<strong>Trade liberalisation</strong> (WTO, reduced tariffs), <strong>technological advances</strong> (internet, containerisation), <strong>deregulation of financial markets</strong>, and the <strong>growth of multinational corporations</strong>."
  },
  {
    "front": "What is a multinational corporation (MNC)?",
    "back": "A firm that operates in <strong>more than one country</strong>, with production or service facilities outside its home country. E.g., Apple, Toyota, Unilever."
  },
  {
    "front": "Name three benefits of globalisation for developing countries.",
    "back": "<strong>FDI inflows</strong> (jobs, capital, technology transfer), <strong>access to larger export markets</strong>, and <strong>higher economic growth rates</strong> from integration into global supply chains."
  },
  {
    "front": "Name three costs of globalisation.",
    "back": "<strong>Deindustrialisation</strong> in developed countries, <strong>exploitation of cheap labour</strong> in developing countries, and <strong>environmental degradation</strong> from increased production and transport."
  },
  {
    "front": "What is foreign direct investment (FDI)?",
    "back": "Investment by a firm in <strong>productive capacity in another country</strong> — e.g., building a factory abroad. Brings capital, jobs, and technology transfer to the host country."
  },
  {
    "front": "What is deindustrialisation?",
    "back": "The <strong>decline of manufacturing</strong> as a share of GDP and employment. Often caused by globalisation as production moves to lower-cost countries."
  },
  {
    "front": "What is a trade bloc?",
    "back": "A group of countries that agree to <strong>reduce or eliminate trade barriers</strong> between members — e.g., EU, ASEAN, NAFTA/USMCA. Promotes trade within the bloc but may divert trade from non-members."
  },
  {
    "front": "What is the WTO?",
    "back": "The <strong>World Trade Organisation</strong> — promotes free trade by negotiating trade agreements, resolving disputes, and reducing tariffs. 164 member countries."
  },
  {
    "front": "What is containerisation?",
    "back": "The use of <strong>standardised shipping containers</strong> to transport goods. Dramatically reduced transport costs and time, making global trade cheaper and faster."
  },
  {
    "front": "What is transfer pricing?",
    "back": "When MNCs set <strong>internal prices for transactions between subsidiaries</strong> in different countries to shift profits to low-tax jurisdictions. Reduces tax payments but is controversial."
  },
  {
    "front": "What is the brain drain?",
    "back": "The <strong>emigration of skilled workers</strong> from developing to developed countries. Benefits the destination country but reduces human capital in the origin country."
  },
  {
    "front": "What is cultural homogenisation?",
    "back": "The spread of <strong>dominant cultures</strong> (often Western) at the expense of local traditions — through global brands, media, and consumer habits. A criticism of globalisation."
  },
  {
    "front": "What is trade liberalisation?",
    "back": "The <strong>removal or reduction of trade barriers</strong> (tariffs, quotas, regulations) to encourage free movement of goods and services between countries."
  },
  {
    "front": "How has technology driven globalisation?",
    "back": "The <strong>internet</strong> enables instant communication and e-commerce, <strong>cheaper air travel</strong> increases mobility, and <strong>automation</strong> reduces production costs — all making cross-border activity easier."
  },
  {
    "front": "What is the impact of MNCs on host country employment?",
    "back": "MNCs create <strong>direct jobs</strong> in their operations and <strong>indirect jobs</strong> through supply chains. However, they may also <strong>crowd out local firms</strong> and exploit low wages."
  },
  {
    "front": "What is offshoring?",
    "back": "Relocating <strong>business processes to another country</strong> — usually to reduce costs. Can involve the firm's own subsidiary (FDI) or outsourcing to a foreign company."
  },
  {
    "front": "What is outsourcing?",
    "back": "Contracting a <strong>business function to a third party</strong> rather than performing it in-house. Reduces costs but may reduce quality and control."
  }
];

export const tradeGlobalEconomy = [
  {
    "front": "What is comparative advantage?",
    "back": "A country has comparative advantage if it can produce a good at a <strong>lower opportunity cost</strong> than another country. Even if one country is better at everything, both benefit from specialisation and trade."
  },
  {
    "front": "What is absolute advantage?",
    "back": "A country has absolute advantage if it can produce a good using <strong>fewer resources</strong> than another country. But comparative advantage, not absolute, determines trade patterns."
  },
  {
    "front": "What is free trade?",
    "back": "Trade without <strong>government-imposed barriers</strong> (tariffs, quotas, regulations). Allows countries to specialise according to comparative advantage, increasing global output."
  },
  {
    "front": "What is a tariff?",
    "back": "A <strong>tax on imports</strong> that raises the price of foreign goods. Protects domestic firms but raises prices for consumers and may provoke retaliation."
  },
  {
    "front": "What is a quota?",
    "back": "A <strong>physical limit on the quantity of imports</strong> allowed into a country. Restricts foreign competition but reduces consumer choice and raises prices."
  },
  {
    "front": "What is protectionism?",
    "back": "Government policies that <strong>restrict international trade</strong> to protect domestic industries — through tariffs, quotas, subsidies, or regulations. Reduces competition but may harm consumers."
  },
  {
    "front": "Name three arguments for protectionism.",
    "back": "Protecting <strong>infant industries</strong>, preventing <strong>dumping</strong> (selling below cost), and maintaining <strong>national security</strong> (strategic industries like defence or food production)."
  },
  {
    "front": "Name three arguments against protectionism.",
    "back": "Raises <strong>consumer prices</strong>, reduces <strong>choice and efficiency</strong>, may provoke <strong>trade wars</strong> (retaliation), and protects inefficient firms from competition."
  },
  {
    "front": "What is dumping?",
    "back": "Selling exports at a price <strong>below the cost of production</strong> in the foreign market. Used to gain market share or dispose of surplus. Can destroy domestic industries in the importing country."
  },
  {
    "front": "What is an infant industry argument?",
    "back": "New industries in developing countries need <strong>temporary protection</strong> from established foreign competitors until they achieve economies of scale and can compete independently."
  },
  {
    "front": "What is a free trade area?",
    "back": "Countries agree to <strong>eliminate tariffs between members</strong> but maintain individual external tariffs with non-members. E.g., NAFTA/USMCA."
  },
  {
    "front": "What is a customs union?",
    "back": "A free trade area with a <strong>common external tariff</strong> applied to all non-member imports. E.g., the EU's customs union."
  },
  {
    "front": "What is trade creation?",
    "back": "When a trade bloc replaces <strong>high-cost domestic production with lower-cost imports</strong> from a member country. Increases efficiency and consumer welfare."
  },
  {
    "front": "What is trade diversion?",
    "back": "When a trade bloc diverts imports from a <strong>lower-cost non-member to a higher-cost member</strong>. Reduces efficiency — the external tariff makes non-member goods artificially expensive."
  },
  {
    "front": "What is the terms of trade?",
    "back": "The ratio of <strong>export prices to import prices</strong> (index of export prices ÷ index of import prices × 100). An improvement means exports buy more imports."
  },
  {
    "front": "What are the limitations of comparative advantage theory?",
    "back": "Assumes <strong>constant costs</strong>, <strong>no transport costs</strong>, <strong>perfect mobility</strong>, and <strong>two-country/two-good models</strong>. In reality, countries face increasing costs, trade barriers, and many trading partners."
  },
  {
    "front": "What is an export subsidy?",
    "back": "A government payment to domestic exporters to <strong>reduce their costs and make exports cheaper</strong>. A form of protectionism that distorts trade. Banned under WTO rules in most cases."
  },
  {
    "front": "What is a non-tariff barrier?",
    "back": "Any trade restriction that is <strong>not a tariff</strong> — e.g., quotas, regulations, licensing, safety standards, bureaucratic delays. Often harder to identify and challenge than tariffs."
  }
];

export const balancePaymentsExchangeRates = [
  {
    "front": "What is the balance of payments?",
    "back": "A record of all <strong>financial transactions</strong> between one country and the rest of the world. Must balance overall — current account + capital/financial account = 0."
  },
  {
    "front": "What are the components of the current account?",
    "back": "<strong>Trade in goods</strong>, <strong>trade in services</strong>, <strong>primary income</strong> (investment returns), and <strong>secondary income</strong> (transfers, e.g., foreign aid, remittances)."
  },
  {
    "front": "What causes a current account deficit?",
    "back": "<strong>Imports exceed exports</strong> — may be due to strong consumer demand, uncompetitive exports, a strong exchange rate, or a loss of manufacturing base."
  },
  {
    "front": "What is a floating exchange rate?",
    "back": "An exchange rate determined by <strong>market forces of supply and demand</strong> with no government intervention. The rate adjusts freely to economic conditions."
  },
  {
    "front": "What is a fixed exchange rate?",
    "back": "An exchange rate <strong>pegged by the government</strong> to another currency or gold. The central bank intervenes (buying/selling currency) to maintain the rate."
  },
  {
    "front": "What causes a currency to appreciate?",
    "back": "Increased demand for the currency — due to <strong>higher interest rates</strong> (attracting capital), <strong>strong export demand</strong>, <strong>FDI inflows</strong>, or <strong>speculation</strong> that the currency will rise."
  },
  {
    "front": "What causes a currency to depreciate?",
    "back": "Increased supply of the currency — due to <strong>lower interest rates</strong>, <strong>high imports</strong>, <strong>capital outflows</strong>, or <strong>speculation</strong> that the currency will fall."
  },
  {
    "front": "How does depreciation affect the current account?",
    "back": "Exports become <strong>cheaper</strong> (more competitive) and imports become <strong>more expensive</strong>. If demand is elastic, net exports improve — but there is a <strong>time lag</strong> (J-curve effect)."
  },
  {
    "front": "What is the J-curve effect?",
    "back": "After depreciation, the current account <strong>initially worsens</strong> (existing contracts at old prices, inelastic short-run demand) before <strong>improving</strong> as demand adjusts to new prices."
  },
  {
    "front": "What is the Marshall-Lerner condition?",
    "back": "A depreciation improves the current account only if the <strong>sum of PED for exports and PED for imports is greater than 1</strong>. If demand is inelastic, depreciation may worsen the deficit."
  },
  {
    "front": "What is a managed float?",
    "back": "An exchange rate that is mainly market-determined but the central bank <strong>intervenes occasionally</strong> to smooth excessive volatility or prevent misalignment."
  },
  {
    "front": "What are the advantages of a floating exchange rate?",
    "back": "<strong>Automatic adjustment</strong> to trade imbalances, <strong>monetary policy independence</strong> (can set own interest rates), and no need to hold large <strong>foreign exchange reserves</strong>."
  },
  {
    "front": "What are the advantages of a fixed exchange rate?",
    "back": "<strong>Exchange rate certainty</strong> for businesses (reduces risk), <strong>disciplines inflation</strong> (can't devalue to solve problems), and encourages foreign investment."
  },
  {
    "front": "What is international competitiveness?",
    "back": "A country's ability to <strong>sell goods and services in international markets</strong>. Depends on relative prices, exchange rates, quality, productivity, and non-price factors (brand, innovation)."
  },
  {
    "front": "What is the financial account?",
    "back": "Records <strong>flows of capital</strong> between countries — FDI, portfolio investment (shares, bonds), and other financial flows. A financial account surplus finances a current account deficit."
  },
  {
    "front": "Why does the balance of payments always balance?",
    "back": "A current account deficit is <strong>financed by a financial account surplus</strong> (capital inflows). Borrowing from abroad pays for the excess imports. The two accounts sum to zero."
  },
  {
    "front": "How do interest rate differentials affect exchange rates?",
    "back": "Higher interest rates attract <strong>hot money flows</strong> (short-term capital) → demand for the currency rises → the currency <strong>appreciates</strong>. Lower rates have the opposite effect."
  },
  {
    "front": "What is purchasing power parity (PPP)?",
    "back": "The theory that exchange rates should adjust so that identical goods cost the <strong>same in different countries</strong>. In practice, PPP rarely holds exactly due to transport costs and non-traded goods."
  }
];

export const povertyInequality = [
  {
    "front": "What is absolute poverty?",
    "back": "When individuals cannot afford <strong>basic necessities</strong> — food, shelter, clean water, healthcare. Measured against a fixed threshold, often $2.15/day (World Bank)."
  },
  {
    "front": "What is relative poverty?",
    "back": "When individuals have <strong>significantly less income</strong> than the median in their society — typically below 60% of median income. A measure of inequality within a country."
  },
  {
    "front": "What is the Gini coefficient?",
    "back": "A measure of <strong>income inequality</strong> ranging from 0 (perfect equality) to 1 (one person has all income). Higher values indicate greater inequality. Derived from the Lorenz curve."
  },
  {
    "front": "What is the Lorenz curve?",
    "back": "A graph showing the <strong>cumulative share of income</strong> received by cumulative percentages of the population. The further from the 45° line of equality, the greater the inequality."
  },
  {
    "front": "Name three causes of inequality within countries.",
    "back": "<strong>Wage differentials</strong> (skills, education), <strong>unemployment</strong>, <strong>regressive tax systems</strong>, discrimination, and ownership of assets (property, shares) concentrated among the wealthy."
  },
  {
    "front": "Name three causes of inequality between countries.",
    "back": "<strong>Colonial legacy</strong>, <strong>lack of capital and infrastructure</strong>, <strong>corruption and weak institutions</strong>, reliance on primary commodities, and limited access to education and technology."
  },
  {
    "front": "What is progressive taxation?",
    "back": "A tax where the <strong>proportion paid rises with income</strong> — higher earners pay a larger share. Reduces inequality by redistributing from rich to poor. E.g., income tax."
  },
  {
    "front": "What is regressive taxation?",
    "back": "A tax where the <strong>proportion paid falls as income rises</strong> — lower earners pay a larger share of their income. E.g., VAT on essentials takes a bigger proportion from the poor."
  },
  {
    "front": "What is a transfer payment used to reduce poverty?",
    "back": "Government payments to individuals <strong>not in exchange for goods or services</strong> — e.g., unemployment benefits, pensions, child benefit. Directly increases disposable income of the poor."
  },
  {
    "front": "What is the poverty trap?",
    "back": "When the <strong>withdrawal of benefits</strong> as income rises means people are no better off working than not working. The effective marginal tax rate is very high — reducing incentive to work."
  },
  {
    "front": "What is the Kuznets curve?",
    "back": "A hypothesis that inequality <strong>first rises then falls</strong> as a country develops — forming an inverted U shape. Initially growth benefits the rich; later, education and redistribution reduce inequality."
  },
  {
    "front": "What is the difference between equity and equality?",
    "back": "<strong>Equality</strong> means everyone gets the same. <strong>Equity</strong> means fair distribution based on need — people get what they need to achieve equal outcomes. Policy aims for equity, not necessarily equality."
  },
  {
    "front": "How does education reduce poverty?",
    "back": "Education increases <strong>human capital and productivity</strong>, leading to higher wages. It improves employment prospects, enables social mobility, and has positive externalities for the wider economy."
  },
  {
    "front": "What is the trade-off between equity and efficiency?",
    "back": "Policies to reduce inequality (high taxes, generous benefits) may <strong>reduce incentives to work and invest</strong>, lowering efficiency and growth. Finding the right balance is a key policy challenge."
  },
  {
    "front": "What is a wealth tax?",
    "back": "A tax on the <strong>stock of assets</strong> (property, investments, savings) rather than income flows. Reduces wealth inequality but may be difficult to administer and could drive capital abroad."
  },
  {
    "front": "What is a minimum wage's effect on poverty?",
    "back": "Raises incomes for low-paid workers, <strong>reducing in-work poverty</strong>. But if set too high, it may reduce employment (firms hire fewer workers) and harm those it intends to help."
  },
  {
    "front": "What is the Human Development Index (HDI)?",
    "back": "A composite index measuring <strong>life expectancy</strong>, <strong>education</strong> (mean and expected years), and <strong>GNI per capita</strong> (PPP). Ranges 0–1. Captures more than just income."
  },
  {
    "front": "What is the difference between income and wealth?",
    "back": "<strong>Income</strong> is a flow — earnings received over a period (wages, rent, dividends). <strong>Wealth</strong> is a stock — the total value of assets owned at a point in time (property, savings, shares)."
  }
];

export const roleStateMacroeconomy = [
  {
    "front": "What is the role of the state in the economy?",
    "back": "To <strong>correct market failure</strong>, provide public goods, reduce inequality, stabilise the macroeconomy, and create a legal framework that enables markets to function."
  },
  {
    "front": "What are public goods?",
    "back": "Goods that are <strong>non-excludable and non-rivalrous</strong>. The market will not provide them due to the free rider problem, so the state must — e.g., street lighting, national defence."
  },
  {
    "front": "What is a public sector?",
    "back": "The part of the economy <strong>owned and operated by the government</strong> — providing public services like healthcare, education, defence, and infrastructure."
  },
  {
    "front": "What is fiscal policy's stabilisation role?",
    "back": "The government uses spending and taxation to <strong>smooth the business cycle</strong> — expansionary policy in recessions (boost AD) and contractionary policy in booms (cool AD)."
  },
  {
    "front": "What is redistribution of income?",
    "back": "Using <strong>progressive taxes and transfer payments</strong> to reduce inequality — taking from higher earners and redistributing to lower earners through benefits and public services."
  },
  {
    "front": "What is the case for state intervention?",
    "back": "<strong>Market failure</strong> (externalities, public goods, information failure), <strong>inequality</strong>, <strong>macroeconomic instability</strong>, and the need for <strong>merit goods</strong> (education, healthcare) that markets underprovide."
  },
  {
    "front": "What is the case against state intervention?",
    "back": "<strong>Government failure</strong> (unintended consequences, bureaucracy, regulatory capture), <strong>cost to taxpayers</strong>, <strong>moral hazard</strong>, and <strong>crowding out</strong> of private sector investment."
  },
  {
    "front": "What is crowding out?",
    "back": "When increased government borrowing <strong>raises interest rates</strong>, reducing private sector investment. Government spending replaces rather than adds to total spending."
  },
  {
    "front": "What is the Laffer curve?",
    "back": "Shows the relationship between <strong>tax rates and tax revenue</strong>. Beyond a certain point, higher tax rates <strong>reduce revenue</strong> because they discourage work and investment."
  },
  {
    "front": "What is the free market view of the state?",
    "back": "Government should have a <strong>minimal role</strong> — limited to providing a legal framework, defence, and property rights. Markets self-correct. Associated with <strong>classical/supply-side</strong> economists."
  },
  {
    "front": "What is the Keynesian view of the state?",
    "back": "Government should <strong>actively manage demand</strong> — especially in recessions when markets fail to self-correct. Fiscal policy is essential to prevent prolonged unemployment."
  },
  {
    "front": "What is a merit good?",
    "back": "A good that would be <strong>underconsumed in a free market</strong> because people undervalue its benefits. The state provides or subsidises it — e.g., education, healthcare, museums."
  },
  {
    "front": "What is a demerit good?",
    "back": "A good that would be <strong>overconsumed in a free market</strong> because people underestimate the harm. The state taxes, regulates, or bans it — e.g., tobacco, alcohol, gambling."
  },
  {
    "front": "What is the principal of equity in taxation?",
    "back": "Those with <strong>greater ability to pay should pay more</strong> (vertical equity) and those in similar situations should pay similar amounts (horizontal equity). Underpins progressive taxation."
  },
  {
    "front": "What are automatic stabilisers?",
    "back": "Fiscal mechanisms that <strong>automatically offset fluctuations</strong> without policy changes — e.g., in a recession, tax revenue falls and benefit spending rises, cushioning the downturn."
  },
  {
    "front": "What is the difference between a public and a private good?",
    "back": "<strong>Public goods</strong> are non-excludable and non-rivalrous (government must provide). <strong>Private goods</strong> are excludable and rivalrous (provided efficiently by the market)."
  },
  {
    "front": "What is government debt?",
    "back": "The <strong>total accumulated borrowing</strong> of the government. Annual budget deficits add to it. High debt may constrain future spending and require austerity to service interest payments."
  },
  {
    "front": "What is moral hazard in the context of state intervention?",
    "back": "When government support (e.g., bank bailouts, generous welfare) encourages <strong>reckless behaviour</strong> because agents know they will be protected from the consequences of their actions."
  }
];

export const growthDevelopment = [
  {
    "front": "What is economic development?",
    "back": "A broader concept than growth — includes improvements in <strong>living standards, health, education, and quality of life</strong>. Measured by HDI, not just GDP."
  },
  {
    "front": "What is the difference between growth and development?",
    "back": "<strong>Growth</strong> = increase in real GDP (quantitative). <strong>Development</strong> = improvement in quality of life, education, health, and political freedoms (qualitative). Growth is necessary but not sufficient."
  },
  {
    "front": "What are the characteristics of developing countries?",
    "back": "Low <strong>GDP per capita</strong>, high <strong>poverty rates</strong>, poor <strong>infrastructure</strong>, reliance on <strong>primary commodities</strong>, low life expectancy, and weak institutions."
  },
  {
    "front": "What are the barriers to development?",
    "back": "<strong>Corruption</strong>, <strong>poor governance</strong>, <strong>debt burden</strong>, <strong>primary product dependency</strong>, <strong>lack of infrastructure</strong>, <strong>conflict</strong>, and <strong>geographical disadvantages</strong> (landlocked, prone to natural disasters)."
  },
  {
    "front": "What is primary product dependency?",
    "back": "An economy reliant on exporting <strong>raw materials or agricultural goods</strong>. Vulnerable to price volatility, declining terms of trade, and the resource curse."
  },
  {
    "front": "What is the Prebisch-Singer hypothesis?",
    "back": "The long-run <strong>terms of trade for primary products decline</strong> relative to manufactured goods. Countries exporting commodities face worsening terms of trade over time."
  },
  {
    "front": "What is foreign aid?",
    "back": "Financial or technical assistance from <strong>developed to developing countries</strong>. Can be bilateral (government-to-government) or multilateral (via organisations like the World Bank)."
  },
  {
    "front": "What are the arguments for foreign aid?",
    "back": "Fills the <strong>savings gap</strong> (provides capital for investment), funds <strong>infrastructure and education</strong>, provides <strong>emergency relief</strong>, and can support institutional development."
  },
  {
    "front": "What are the arguments against foreign aid?",
    "back": "May create <strong>dependency</strong>, be lost to <strong>corruption</strong>, distort local markets, serve <strong>donor interests</strong> (tied aid), or fail to address root causes of underdevelopment."
  },
  {
    "front": "What is microfinance?",
    "back": "Small loans provided to <strong>low-income individuals</strong> who lack access to conventional banking. Enables entrepreneurship and self-employment. Pioneered by Grameen Bank in Bangladesh."
  },
  {
    "front": "What is the Harrod-Domar growth model?",
    "back": "Growth depends on the <strong>savings ratio</strong> and the <strong>capital-output ratio</strong>. Higher savings → more investment → more growth. Developing countries may need external finance to fill the savings gap."
  },
  {
    "front": "What is the Lewis model of development?",
    "back": "A <strong>dual-sector model</strong>: surplus labour moves from low-productivity agriculture to high-productivity industry. This structural change drives economic development."
  },
  {
    "front": "What is the resource curse?",
    "back": "Countries rich in <strong>natural resources often grow slower</strong> than resource-poor countries. Caused by currency appreciation (Dutch disease), corruption, conflict over resource rents, and neglect of other sectors."
  },
  {
    "front": "What is the role of the IMF?",
    "back": "The <strong>International Monetary Fund</strong> provides financial assistance and policy advice to countries facing <strong>balance of payments crises</strong>. Often requires structural reforms as conditions."
  },
  {
    "front": "What is the role of the World Bank?",
    "back": "Provides <strong>long-term loans and grants</strong> to developing countries for projects that reduce poverty — infrastructure, education, healthcare, and institutional reform."
  },
  {
    "front": "What is import substitution industrialisation (ISI)?",
    "back": "A strategy where a country <strong>replaces imports with domestic production</strong> by protecting infant industries. Reduces dependency but may create inefficient firms shielded from competition."
  },
  {
    "front": "What is export-led growth?",
    "back": "A strategy focusing on <strong>producing goods for export</strong> rather than the domestic market. Exploits comparative advantage. Successful examples: South Korea, China, Singapore."
  },
  {
    "front": "What is the debt trap?",
    "back": "When a developing country borrows to fund development but <strong>cannot repay</strong> — interest payments divert resources from essential spending. New loans service old debt in a vicious cycle."
  }
];
