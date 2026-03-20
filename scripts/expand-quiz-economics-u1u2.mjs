import { supabase } from './_db.mjs';

// ─────────────────────────────────────────────
// UNIT 1 — Markets in Action
// ─────────────────────────────────────────────

const introductoryConcepts = [
  {
    question: "Which of the following best illustrates the concept of opportunity cost?",
    options: [
      "A government choosing to build a hospital instead of a school",
      "A firm increasing the price of its product",
      "A consumer buying two goods at the same time",
      "A worker receiving a pay rise"
    ],
    correctIndex: 0,
    explanation: "Opportunity cost is the next best alternative forgone. When the government builds a hospital, the school it could have built is the opportunity cost. The other options do not clearly show a trade-off between alternatives."
  },
  {
    question: "A movement from a point inside the production possibility frontier (PPF) to a point on the frontier represents:",
    options: [
      "Economic growth",
      "A more efficient use of existing resources",
      "An increase in the quantity of resources available",
      "A reallocation of resources between two goods"
    ],
    correctIndex: 1,
    explanation: "A point inside the PPF indicates unemployed or inefficiently allocated resources. Moving to the frontier means using existing resources more efficiently, not growth (which would shift the PPF outward)."
  },
  {
    question: "Which statement about positive and normative economics is correct?",
    options: [
      "Positive statements can be tested with evidence; normative statements involve value judgements",
      "Normative statements are always true; positive statements are opinions",
      "Positive economics deals with what should be; normative economics deals with what is",
      "Both positive and normative statements can be proven with data"
    ],
    correctIndex: 0,
    explanation: "Positive statements are objective and testable (e.g., 'inflation is 3%'), while normative statements contain value judgements about what ought to be (e.g., 'the government should reduce inflation')."
  },
  {
    question: "An outward shift of the PPF could be caused by:",
    options: [
      "A fall in unemployment from 8% to 4%",
      "An improvement in technology used in production",
      "A reallocation of resources from consumer goods to capital goods",
      "A movement along the PPF from one combination to another"
    ],
    correctIndex: 1,
    explanation: "An outward shift of the PPF represents economic growth caused by an increase in the quantity or quality of resources. Technological improvement increases productive capacity. Reducing unemployment moves towards the frontier, not beyond it."
  },
  {
    question: "The basic economic problem exists because:",
    options: [
      "Governments do not allocate resources efficiently",
      "Resources are scarce relative to unlimited wants",
      "Firms aim to maximise profits rather than social welfare",
      "International trade creates imbalances between countries"
    ],
    correctIndex: 1,
    explanation: "The fundamental economic problem is scarcity: human wants are infinite but the resources available to satisfy them are finite. This forces societies to make choices about how to allocate resources."
  },
  {
    question: "Which of the following is a factor of production classified as 'capital'?",
    options: [
      "Money held in a bank account",
      "A delivery van used by a business",
      "Shares purchased on the stock market",
      "The wages paid to factory workers"
    ],
    correctIndex: 1,
    explanation: "In economics, capital refers to man-made aids to production (machinery, equipment, vehicles), not financial capital. A delivery van is a physical asset used in the production process."
  },
  {
    question: "A PPF that is concave to the origin (bowed outward) indicates:",
    options: [
      "Constant opportunity costs of production",
      "Increasing opportunity costs of production",
      "Decreasing opportunity costs of production",
      "That the economy is in recession"
    ],
    correctIndex: 1,
    explanation: "A concave PPF shows increasing opportunity costs: as more of one good is produced, progressively larger amounts of the other good must be sacrificed because resources are not perfectly substitutable between uses."
  },
  {
    question: "Which of the following is an example of a normative economic statement?",
    options: [
      "The UK's inflation rate rose to 4.2% in December",
      "Higher interest rates tend to reduce consumer spending",
      "The government ought to spend more on the NHS",
      "Unemployment in the eurozone is currently 6.5%"
    ],
    correctIndex: 2,
    explanation: "The word 'ought' signals a value judgement, making this a normative statement. The other options are positive statements that can be verified with data."
  },
  {
    question: "Which question does the economic problem of 'how to produce' address?",
    options: [
      "Whether to produce luxury goods or necessities",
      "Whether to use labour-intensive or capital-intensive methods",
      "Whether output should be distributed equally among citizens",
      "Whether to produce more consumer goods or capital goods"
    ],
    correctIndex: 1,
    explanation: "The 'how to produce' question concerns the combination of resources and techniques used in production, such as choosing between labour-intensive and capital-intensive methods."
  },
  {
    question: "The concept of ceteris paribus in economics means:",
    options: [
      "In the long run all factors are variable",
      "Resources are scarce relative to wants",
      "All other things being held equal",
      "The economy is in a state of equilibrium"
    ],
    correctIndex: 2,
    explanation: "Ceteris paribus means 'all other things being equal'. Economists use this assumption to isolate the effect of one variable on another while holding all other factors constant."
  },
  {
    question: "If an economy is producing on its PPF and decides to produce more capital goods, what is the most likely long-run effect?",
    options: [
      "The PPF will shift inward",
      "The PPF will shift outward in the future",
      "There will be no change to the PPF",
      "The economy will move inside the PPF"
    ],
    correctIndex: 1,
    explanation: "Producing more capital goods (investment) increases the economy's productive capacity over time, leading to an outward shift of the PPF in the future, though it means fewer consumer goods in the short run."
  },
  {
    question: "In a free market economy, the allocation of resources is primarily determined by:",
    options: [
      "Government central planning committees",
      "The price mechanism through supply and demand",
      "Trade unions negotiating with employers",
      "International organisations setting quotas"
    ],
    correctIndex: 1,
    explanation: "In a free market economy, the price mechanism (market forces of supply and demand) determines what is produced, how it is produced, and for whom, without significant government intervention."
  },
  {
    question: "Specialisation and the division of labour are most likely to lead to:",
    options: [
      "Greater self-sufficiency for individual workers",
      "Higher productivity but potential monotony for workers",
      "A reduction in the need for international trade",
      "Lower output per worker due to repetitive tasks"
    ],
    correctIndex: 1,
    explanation: "Specialisation increases productivity through greater skill development and efficiency, but can lead to monotony and boredom for workers performing repetitive tasks, which is a key drawback."
  },
  {
    question: "Which of the following would cause a pivoted (asymmetric) outward shift of the PPF for good X only?",
    options: [
      "A general increase in the labour force",
      "A technological advance specific to the production of good X",
      "An increase in government spending on education",
      "Discovery of new natural resources used in both goods"
    ],
    correctIndex: 1,
    explanation: "A technological advance specific to good X increases the maximum output of X only, causing the PPF to pivot outward along the X axis while the maximum output of the other good remains unchanged."
  },
  {
    question: "The entrepreneur is rewarded with profit because they:",
    options: [
      "Provide manual labour in the production process",
      "Bear the risk of organising factors of production",
      "Supply raw materials to the production process",
      "Lend financial capital to businesses at interest"
    ],
    correctIndex: 1,
    explanation: "The entrepreneur's role is to organise the other factors of production and bear the risk of business failure. Profit is the reward for this risk-taking and organisational function."
  }
];

const consumerBehaviourDemand = [
  {
    question: "The price elasticity of demand for a good is calculated to be -0.4. This means the good has:",
    options: [
      "Price elastic demand",
      "Price inelastic demand",
      "Unitary elastic demand",
      "Perfectly elastic demand"
    ],
    correctIndex: 1,
    explanation: "A PED value between 0 and -1 (ignoring the sign, less than 1 in absolute value) indicates inelastic demand, meaning a change in price leads to a proportionally smaller change in quantity demanded."
  },
  {
    question: "If the cross elasticity of demand (XED) between goods A and B is +2.5, the goods are:",
    options: [
      "Complements with strong relationship",
      "Substitutes with strong relationship",
      "Unrelated goods",
      "Complements with weak relationship"
    ],
    correctIndex: 1,
    explanation: "A positive XED indicates substitute goods. The magnitude of 2.5 (greater than 1) shows a strong relationship: a price rise in good A leads to a proportionally larger increase in demand for good B."
  },
  {
    question: "A leftward shift of the demand curve for a normal good could be caused by:",
    options: [
      "An increase in consumer incomes",
      "A fall in the price of a complementary good",
      "A decrease in consumer incomes",
      "A rise in the price of the good itself"
    ],
    correctIndex: 2,
    explanation: "For a normal good, demand has a positive relationship with income. A decrease in consumer incomes reduces demand at every price level, shifting the demand curve to the left. A price change causes a movement along the curve, not a shift."
  },
  {
    question: "The income elasticity of demand (YED) for a good is -0.6. This good is classified as:",
    options: [
      "A normal good",
      "A luxury good",
      "An inferior good",
      "A Giffen good"
    ],
    correctIndex: 2,
    explanation: "A negative YED means that as income rises, demand for the good falls. This is the defining characteristic of an inferior good, such as budget supermarket brands."
  },
  {
    question: "A business finds that when it raises the price of its product by 10%, total revenue increases. This suggests demand is:",
    options: [
      "Price elastic",
      "Price inelastic",
      "Unitary elastic",
      "Perfectly elastic"
    ],
    correctIndex: 1,
    explanation: "When demand is price inelastic, a price increase leads to a proportionally smaller fall in quantity demanded, so total revenue rises. With elastic demand, a price rise would reduce total revenue."
  },
  {
    question: "Which of the following would make demand for a product more price elastic?",
    options: [
      "The product becomes addictive to consumers",
      "More close substitutes become available in the market",
      "Consumers spend a smaller proportion of their income on it",
      "The time period under consideration is shortened"
    ],
    correctIndex: 1,
    explanation: "The availability of close substitutes is the most important determinant of PED. More substitutes mean consumers can easily switch when price rises, making demand more elastic."
  },
  {
    question: "If the price of coffee rises by 15% and the quantity demanded of tea increases by 9%, the XED of tea with respect to coffee is:",
    options: [
      "-0.6",
      "+0.6",
      "+1.67",
      "-1.67"
    ],
    correctIndex: 1,
    explanation: "XED = % change in Qd of tea / % change in price of coffee = +9% / +15% = +0.6. The positive value confirms coffee and tea are substitutes."
  },
  {
    question: "According to the law of demand, an increase in the price of a good leads to a fall in quantity demanded because of:",
    options: [
      "The income effect and the substitution effect",
      "A shift in the demand curve to the left",
      "A decrease in consumer confidence",
      "An increase in the cost of production"
    ],
    correctIndex: 0,
    explanation: "The law of demand is explained by the income effect (higher price reduces real income, so less is bought) and the substitution effect (higher price makes alternatives relatively cheaper, so consumers switch)."
  },
  {
    question: "A firm sells 200 units at a price of $10. After reducing the price to $8, it sells 280 units. The PED is approximately:",
    options: [
      "-0.5",
      "-1.0",
      "-2.0",
      "-1.5"
    ],
    correctIndex: 2,
    explanation: "% change in Qd = (280-200)/200 x 100 = +40%. % change in price = (8-10)/10 x 100 = -20%. PED = +40% / -20% = -2.0. Demand is price elastic."
  },
  {
    question: "Which factor is most likely to result in a rightward shift of the demand curve for electric vehicles?",
    options: [
      "A fall in the price of electric vehicles",
      "An increase in government subsidies for electric vehicle purchases",
      "A decrease in the price of petrol",
      "A rise in interest rates on car loans"
    ],
    correctIndex: 1,
    explanation: "Government subsidies effectively reduce the cost to consumers, increasing demand at every price level and shifting the demand curve right. A fall in the vehicle's own price causes a movement along the curve, not a shift."
  },
  {
    question: "The YED for organic food is estimated at +2.3. This suggests organic food is:",
    options: [
      "An inferior good",
      "A necessity with income inelastic demand",
      "A luxury good with income elastic demand",
      "A Giffen good"
    ],
    correctIndex: 2,
    explanation: "A positive YED greater than 1 indicates a luxury (or superior) good with income elastic demand. As income rises, demand for organic food increases more than proportionally."
  },
  {
    question: "Consumer surplus is defined as:",
    options: [
      "The total amount consumers spend on a good",
      "The difference between what consumers are willing to pay and what they actually pay",
      "The profit that producers earn from selling a good",
      "The excess supply of a good at a given price"
    ],
    correctIndex: 1,
    explanation: "Consumer surplus measures the extra satisfaction consumers receive by paying less than the maximum they would have been willing to pay. It is shown graphically as the area between the demand curve and the market price."
  },
  {
    question: "If the PED for a good is -1.0 (unitary elastic), a 5% increase in price will:",
    options: [
      "Leave total revenue unchanged",
      "Increase total revenue by 5%",
      "Decrease total revenue by 5%",
      "Increase total revenue by 10%"
    ],
    correctIndex: 0,
    explanation: "With unitary elasticity (PED = -1), the percentage change in quantity demanded exactly offsets the percentage change in price, so total revenue remains unchanged."
  },
  {
    question: "Which of the following best explains why demand for salt is price inelastic?",
    options: [
      "Salt is a luxury good with many substitutes",
      "Salt takes up a very small proportion of consumer income and has few substitutes",
      "Consumers are very sensitive to changes in the price of salt",
      "Salt is an inferior good whose demand falls as income rises"
    ],
    correctIndex: 1,
    explanation: "Salt has very inelastic demand because it accounts for a tiny proportion of income (so price changes have minimal impact on budgets) and there are few direct substitutes."
  },
  {
    question: "A decrease in the price of smartphones is most likely to cause:",
    options: [
      "A leftward shift in the demand for phone cases",
      "A rightward shift in the demand for phone cases",
      "A movement along the demand curve for phone cases",
      "No change in the demand for phone cases"
    ],
    correctIndex: 1,
    explanation: "Smartphones and phone cases are complementary goods. A fall in the price of smartphones increases their quantity demanded, which increases demand for phone cases at every price, shifting the demand curve rightward."
  }
];

const supply = [
  {
    question: "Which of the following would cause a leftward shift of the supply curve for wheat?",
    options: [
      "A fall in the price of wheat",
      "A severe drought reducing crop yields",
      "An increase in demand for bread",
      "A reduction in the price of barley (a substitute in production)"
    ],
    correctIndex: 1,
    explanation: "A drought reduces the ability of farmers to produce wheat, decreasing supply at every price level and shifting the supply curve leftward. A fall in the wheat price causes a movement along the curve, not a shift."
  },
  {
    question: "The price elasticity of supply (PES) for a good is +0.3. This means:",
    options: [
      "Supply is price elastic",
      "Supply is price inelastic",
      "Supply is unitary elastic",
      "Supply is perfectly inelastic"
    ],
    correctIndex: 1,
    explanation: "A PES between 0 and 1 indicates price inelastic supply: a change in price leads to a proportionally smaller change in quantity supplied. Producers find it difficult to respond quickly to price changes."
  },
  {
    question: "Which of the following would make the supply of a product more price elastic?",
    options: [
      "The production process requires highly specialised, scarce inputs",
      "Firms hold large stocks of finished goods and have spare capacity",
      "The time period under consideration is very short",
      "The product takes a long time to produce"
    ],
    correctIndex: 1,
    explanation: "Supply is more elastic when firms can respond quickly to price changes. Large stocks and spare capacity allow firms to increase output rapidly without significant cost increases."
  },
  {
    question: "A technological improvement in car manufacturing would:",
    options: [
      "Shift the supply curve for cars to the left",
      "Shift the supply curve for cars to the right",
      "Cause a movement along the supply curve for cars",
      "Shift the demand curve for cars to the right"
    ],
    correctIndex: 1,
    explanation: "Technological improvement reduces production costs, enabling firms to supply more at every price level. This shifts the supply curve to the right (an increase in supply)."
  },
  {
    question: "Producer surplus is the area:",
    options: [
      "Above the supply curve and below the market price",
      "Below the demand curve and above the market price",
      "Between the supply and demand curves",
      "Above the market price and below the demand curve"
    ],
    correctIndex: 0,
    explanation: "Producer surplus is the difference between the market price producers receive and the minimum price they would have been willing to accept. Graphically, it is the area above the supply curve and below the price line."
  },
  {
    question: "If the price of leather increases, the supply curve for leather shoes will:",
    options: [
      "Shift to the right",
      "Shift to the left",
      "Not change, but there will be a movement along the curve",
      "Become more elastic"
    ],
    correctIndex: 1,
    explanation: "Leather is a raw material (input cost) in shoe production. An increase in input costs raises production costs, reducing the quantity firms are willing to supply at each price, shifting the supply curve leftward."
  },
  {
    question: "Which of the following is most likely to have a perfectly inelastic supply in the short run?",
    options: [
      "Mass-produced clothing",
      "Tickets for a football match at a fixed-capacity stadium",
      "Digital music downloads",
      "Fast food meals"
    ],
    correctIndex: 1,
    explanation: "A stadium has a fixed number of seats that cannot be increased in the short run regardless of price. The supply of tickets is therefore perfectly inelastic (PES = 0) in the short run."
  },
  {
    question: "If the government imposes a new environmental regulation that increases production costs for steel manufacturers, this would:",
    options: [
      "Increase the supply of steel",
      "Decrease the supply of steel",
      "Increase the demand for steel",
      "Have no effect on the steel market"
    ],
    correctIndex: 1,
    explanation: "Environmental regulations raise production costs for steel firms. Higher costs reduce profitability at each price level, causing firms to supply less, which shifts the supply curve to the left."
  },
  {
    question: "The supply of fresh fish is likely to be more price elastic in the long run than the short run because:",
    options: [
      "Consumer preferences change over time",
      "Firms have more time to adjust capacity, build new boats, and train workers",
      "The government will impose quotas in the long run",
      "Fish stocks are unlimited in the long run"
    ],
    correctIndex: 1,
    explanation: "In the long run, firms can adjust all factors of production: invest in new fishing vessels, expand fleets, and train crew. This greater flexibility makes supply more responsive to price changes."
  },
  {
    question: "An increase in labour productivity in the clothing industry would:",
    options: [
      "Decrease the supply of clothing",
      "Increase the supply of clothing",
      "Increase the demand for clothing",
      "Decrease the demand for clothing"
    ],
    correctIndex: 1,
    explanation: "Higher labour productivity means more output per worker, effectively reducing the cost per unit. This enables firms to supply more at every price, shifting the supply curve to the right."
  },
  {
    question: "If good X and good Y are joint products (produced together), an increase in the price of good X will:",
    options: [
      "Decrease the supply of good Y",
      "Increase the supply of good Y",
      "Decrease the demand for good Y",
      "Have no effect on the supply of good Y"
    ],
    correctIndex: 1,
    explanation: "Joint products are produced together (e.g., beef and leather). A higher price for X encourages more production of X, which automatically increases the supply of Y as a by-product."
  },
  {
    question: "A profit-maximising firm would continue to supply output as long as:",
    options: [
      "The market price exceeds its average total costs",
      "The market price is at least equal to its marginal cost of production",
      "Total revenue is greater than total fixed costs",
      "The market price exceeds the minimum point on the supply curve"
    ],
    correctIndex: 0,
    explanation: "A firm supplies output when the market price covers its average total costs, ensuring at least normal profit. If price falls below average total costs in the long run, the firm will exit the market."
  },
  {
    question: "Which of the following best explains why agricultural supply tends to be price inelastic in the short run?",
    options: [
      "Farmers receive government subsidies",
      "Growing seasons are fixed and output cannot be quickly changed once planted",
      "Demand for food is price inelastic",
      "Agricultural goods are exported to other countries"
    ],
    correctIndex: 1,
    explanation: "Agricultural products have long production periods determined by growing seasons. Once crops are planted, farmers cannot quickly increase or decrease output in response to price changes, making short-run supply inelastic."
  },
  {
    question: "If wages for factory workers increase, what happens to the supply of manufactured goods, ceteris paribus?",
    options: [
      "Supply increases as workers are more motivated",
      "Supply decreases as production costs have risen",
      "Supply is unchanged because wages do not affect supply",
      "Supply increases because firms pass costs to consumers"
    ],
    correctIndex: 1,
    explanation: "Wages are a major component of production costs. Higher wages increase the cost of production, making it less profitable to supply at any given price, so the supply curve shifts to the left."
  },
  {
    question: "Digital goods such as e-books tend to have a very high PES because:",
    options: [
      "They are expensive to produce initially",
      "Once created, additional copies can be produced at near-zero marginal cost",
      "Demand for e-books is very high",
      "There are many publishers competing in the market"
    ],
    correctIndex: 1,
    explanation: "Digital goods have near-zero marginal costs of reproduction. Once the content is created, extra copies can be supplied almost instantly and at negligible cost, making supply highly elastic."
  }
];

const priceDetermination = [
  {
    question: "In a free market, if the current price is above the equilibrium price, there will be:",
    options: [
      "Excess demand, putting upward pressure on price",
      "Excess supply, putting downward pressure on price",
      "Equilibrium, with no tendency for price to change",
      "Excess demand, putting downward pressure on price"
    ],
    correctIndex: 1,
    explanation: "Above equilibrium, quantity supplied exceeds quantity demanded, creating excess supply (surplus). Producers will lower prices to sell unsold stock, moving the market back toward equilibrium."
  },
  {
    question: "The government imposes a specific tax of $3 per unit on a good. If the supply curve is perfectly elastic, the burden of the tax falls:",
    options: [
      "Entirely on the producer",
      "Entirely on the consumer",
      "Equally on the consumer and producer",
      "Mainly on the producer"
    ],
    correctIndex: 1,
    explanation: "With perfectly elastic supply, producers pass the entire tax on to consumers because they will not accept a lower price. The consumer price rises by the full $3, and the producer price is unchanged."
  },
  {
    question: "An increase in both demand and supply for a good will definitely cause:",
    options: [
      "An increase in equilibrium price",
      "A decrease in equilibrium price",
      "An increase in equilibrium quantity",
      "A decrease in equilibrium quantity"
    ],
    correctIndex: 2,
    explanation: "When both demand and supply increase, equilibrium quantity definitely rises. However, the effect on price is ambiguous: it depends on the relative magnitudes of the shifts."
  },
  {
    question: "A subsidy granted to producers of solar panels would:",
    options: [
      "Shift the demand curve for solar panels to the right",
      "Shift the supply curve for solar panels to the right, reducing price",
      "Shift the supply curve for solar panels to the left, increasing price",
      "Have no effect on the market for solar panels"
    ],
    correctIndex: 1,
    explanation: "A subsidy reduces production costs for firms, enabling them to supply more at every price. This shifts the supply curve to the right, leading to a lower equilibrium price and higher quantity."
  },
  {
    question: "If the demand for a good increases while supply remains constant, what happens to consumer surplus?",
    options: [
      "Consumer surplus definitely increases",
      "Consumer surplus definitely decreases",
      "The effect on consumer surplus is ambiguous",
      "Consumer surplus remains unchanged"
    ],
    correctIndex: 2,
    explanation: "An increase in demand raises the equilibrium price (reducing surplus per unit) but also increases the number of consumers in the market. The net effect on total consumer surplus is ambiguous without knowing the exact curves."
  },
  {
    question: "A specific tax of $5 is imposed on a good. The price rises from $20 to $23. The incidence of the tax on the consumer is:",
    options: [
      "$5 per unit",
      "$3 per unit",
      "$2 per unit",
      "$0 per unit"
    ],
    correctIndex: 1,
    explanation: "The consumer pays $3 more ($23 - $20), so the consumer incidence is $3. The remaining $2 of the $5 tax is borne by the producer, who now receives $18 ($23 - $5) instead of $20."
  },
  {
    question: "Which of the following will result in a decrease in the equilibrium price and an increase in the equilibrium quantity?",
    options: [
      "An increase in demand",
      "A decrease in demand",
      "An increase in supply",
      "A decrease in supply"
    ],
    correctIndex: 2,
    explanation: "An increase in supply (rightward shift) leads to a lower equilibrium price and a higher equilibrium quantity. This is because more is available at every price level, driving down the market price."
  },
  {
    question: "The deadweight loss from an indirect tax arises because:",
    options: [
      "The government collects revenue from the tax",
      "Some mutually beneficial transactions no longer take place",
      "Producers earn higher profits after the tax",
      "Consumer surplus increases after the tax"
    ],
    correctIndex: 1,
    explanation: "An indirect tax raises the price and reduces the quantity traded. Some transactions that would have benefited both buyers and sellers no longer occur, creating a loss of economic welfare (deadweight loss)."
  },
  {
    question: "If demand is perfectly price inelastic and a tax is imposed, the tax burden falls:",
    options: [
      "Entirely on the producer",
      "Entirely on the consumer",
      "Equally on consumer and producer",
      "Mainly on the producer"
    ],
    correctIndex: 1,
    explanation: "With perfectly inelastic demand (vertical demand curve), consumers have no alternatives and will buy the same quantity regardless of price. The entire tax is passed on to consumers through higher prices."
  },
  {
    question: "A simultaneous decrease in demand and increase in supply will:",
    options: [
      "Definitely decrease price and definitely decrease quantity",
      "Definitely decrease price, with an ambiguous effect on quantity",
      "Definitely increase quantity, with an ambiguous effect on price",
      "Have ambiguous effects on both price and quantity"
    ],
    correctIndex: 1,
    explanation: "Both a decrease in demand and increase in supply put downward pressure on price, so price definitely falls. However, decreased demand reduces quantity while increased supply raises it, making the net effect on quantity ambiguous."
  },
  {
    question: "A government provides a subsidy of $4 per unit. The price to consumers falls by $2.50. The benefit to producers per unit is:",
    options: [
      "$4.00",
      "$2.50",
      "$1.50",
      "$6.50"
    ],
    correctIndex: 2,
    explanation: "The $4 subsidy is shared: consumers benefit by $2.50 (through lower prices) and producers benefit by $1.50 ($4.00 - $2.50) through receiving a higher effective price."
  },
  {
    question: "In a competitive market, the equilibrium price acts as a rationing mechanism because it:",
    options: [
      "Ensures all consumers can afford the good",
      "Eliminates both excess demand and excess supply",
      "Guarantees that producers make a profit",
      "Prevents the government from intervening in the market"
    ],
    correctIndex: 1,
    explanation: "The equilibrium price rations scarce goods by ensuring quantity demanded equals quantity supplied. Consumers willing to pay at least the equilibrium price obtain the good; those who are not are rationed out."
  },
  {
    question: "If the supply of a good is perfectly inelastic, an increase in demand will:",
    options: [
      "Increase both price and quantity",
      "Increase price but have no effect on quantity",
      "Increase quantity but have no effect on price",
      "Decrease price and increase quantity"
    ],
    correctIndex: 1,
    explanation: "Perfectly inelastic supply means quantity supplied is fixed regardless of price (vertical supply curve). An increase in demand can only push the price up; quantity cannot change."
  },
  {
    question: "Which diagram best represents the effect of an indirect tax on a market?",
    options: [
      "The demand curve shifts left by the amount of the tax",
      "The supply curve shifts up/left by the amount of the tax",
      "Both curves shift to the left equally",
      "The supply curve shifts to the right by the amount of the tax"
    ],
    correctIndex: 1,
    explanation: "An indirect tax on producers increases their costs, shifting the supply curve upward (or leftward) by the amount of the tax per unit. This results in a higher consumer price and lower quantity traded."
  },
  {
    question: "Market equilibrium is described as stable if:",
    options: [
      "The government does not intervene in the market",
      "Any deviation from equilibrium triggers market forces that return the price to equilibrium",
      "Supply and demand curves are both perfectly elastic",
      "There are no external shocks to the market"
    ],
    correctIndex: 1,
    explanation: "Stable equilibrium exists when market forces automatically correct any disequilibrium. Excess supply pushes prices down; excess demand pushes prices up, naturally restoring equilibrium."
  }
];

const marketFailure = [
  {
    question: "Which of the following is the best example of a negative externality of consumption?",
    options: [
      "A factory emitting pollution into a river",
      "Passive smoking from a person smoking in a public area",
      "A beekeeper's bees pollinating neighbouring farms",
      "Traffic congestion caused by road construction"
    ],
    correctIndex: 1,
    explanation: "Passive smoking is a negative externality of consumption: the act of consuming cigarettes imposes health costs on third parties (non-smokers). Factory pollution is a negative externality of production."
  },
  {
    question: "A public good is characterised by:",
    options: [
      "Being provided by the government and funded through taxation",
      "Being non-rivalrous and non-excludable",
      "Having positive externalities when consumed",
      "Being available to everyone at zero cost"
    ],
    correctIndex: 1,
    explanation: "The economic definition of a public good rests on two key characteristics: non-rivalry (one person's consumption does not reduce availability to others) and non-excludability (it is impossible to prevent non-payers from consuming)."
  },
  {
    question: "The free rider problem arises because:",
    options: [
      "Consumers do not pay for goods in a free market",
      "Individuals can benefit from a public good without paying for it",
      "Firms produce more than the socially optimal level of output",
      "The government provides subsidies to certain industries"
    ],
    correctIndex: 1,
    explanation: "Because public goods are non-excludable, individuals can enjoy their benefits without contributing to their cost. This makes it unprofitable for private firms to supply them, leading to market failure."
  },
  {
    question: "When a good generates positive externalities of consumption, the free market will:",
    options: [
      "Produce at the socially optimal level",
      "Overproduce relative to the socially optimal level",
      "Underproduce relative to the socially optimal level",
      "Not produce the good at all"
    ],
    correctIndex: 2,
    explanation: "With positive externalities, the social benefit exceeds the private benefit. The free market only considers private benefits when making decisions, so it produces less than the socially optimal quantity."
  },
  {
    question: "Which of the following is a merit good?",
    options: [
      "Designer handbags",
      "Healthcare and education",
      "National defence",
      "Street lighting"
    ],
    correctIndex: 1,
    explanation: "Merit goods such as healthcare and education generate positive externalities and are underconsumed in a free market because consumers undervalue their benefits. National defence and street lighting are public goods."
  },
  {
    question: "Asymmetric information in the used car market (the 'lemons' problem) leads to:",
    options: [
      "Overproduction of cars",
      "Adverse selection where good quality cars are driven out of the market",
      "An increase in car prices above their true value",
      "The government banning the sale of used cars"
    ],
    correctIndex: 1,
    explanation: "Sellers know more about car quality than buyers. Buyers offer low prices expecting poor quality, causing owners of good cars to withdraw from the market. This adverse selection means mostly 'lemons' remain."
  },
  {
    question: "The social cost of production is equal to:",
    options: [
      "Private cost minus external cost",
      "Private cost plus external cost",
      "External cost minus private cost",
      "Private cost multiplied by external cost"
    ],
    correctIndex: 1,
    explanation: "Social cost includes all costs to society: the private costs borne by the producer plus any external costs imposed on third parties. Social cost = private cost + external cost."
  },
  {
    question: "A demerit good is one that is:",
    options: [
      "Non-rivalrous and non-excludable",
      "Overconsumed because consumers underestimate the private and social costs",
      "Only consumed by high-income groups",
      "Underproduced by the free market"
    ],
    correctIndex: 1,
    explanation: "Demerit goods (e.g., cigarettes, alcohol) generate negative externalities and are overconsumed because consumers underestimate or ignore the full costs, including harm to themselves and others."
  },
  {
    question: "The welfare loss (deadweight loss) from a negative externality of production is represented on a diagram by:",
    options: [
      "The area between the MSC and MPC curves, up to the free market quantity",
      "The entire area under the MSC curve",
      "The area between the MSB and MPB curves",
      "The total revenue earned by the producer"
    ],
    correctIndex: 0,
    explanation: "The welfare loss is the area between MSC and MPC (or MSB, since MSB = MPB when there are no consumption externalities) from the socially optimal quantity to the free market quantity, representing the excess social cost."
  },
  {
    question: "Which of the following is an example of moral hazard?",
    options: [
      "A consumer choosing a cheaper but lower quality product",
      "A person with car insurance driving more recklessly because they are covered",
      "A firm reducing its price to attract more customers",
      "A worker accepting a job that pays below the minimum wage"
    ],
    correctIndex: 1,
    explanation: "Moral hazard occurs when having insurance (or other protection) changes behaviour, making the insured event more likely. A driver with insurance may take more risks because they will not bear the full cost of an accident."
  },
  {
    question: "Common resources (such as ocean fish stocks) are prone to market failure because they are:",
    options: [
      "Non-rivalrous and non-excludable",
      "Rivalrous but non-excludable",
      "Non-rivalrous but excludable",
      "Rivalrous and excludable"
    ],
    correctIndex: 1,
    explanation: "Common resources are rivalrous (one person's use reduces availability for others) but non-excludable (difficult to prevent access). This leads to overexploitation as no one has an incentive to conserve — the 'tragedy of the commons'."
  },
  {
    question: "If the marginal social benefit (MSB) of a good exceeds the marginal social cost (MSC), then:",
    options: [
      "Too much of the good is being produced",
      "The market is at the socially optimal equilibrium",
      "Too little of the good is being produced and welfare could be improved by producing more",
      "The good should not be produced at all"
    ],
    correctIndex: 2,
    explanation: "When MSB > MSC, the benefit to society of producing an additional unit exceeds the cost. Society would gain net welfare by increasing output until MSB = MSC (the allocatively efficient point)."
  },
  {
    question: "Information failure in the market for pensions means that:",
    options: [
      "Consumers save too much for retirement",
      "Consumers may undervalue future benefits and under-save for retirement",
      "The government provides too many pension options",
      "Pension providers always make profits"
    ],
    correctIndex: 1,
    explanation: "Consumers may lack information about how much they need for retirement, or exhibit present bias (underweighting future needs). This information failure leads to under-saving, which is why governments often mandate or incentivise pension contributions."
  },
  {
    question: "A negative externality of production causes the market to produce at a level where:",
    options: [
      "MSC > MSB, meaning there is overproduction",
      "MSB > MSC, meaning there is underproduction",
      "MSC = MSB, meaning the market is allocatively efficient",
      "MPC > MSC, meaning producers bear all costs"
    ],
    correctIndex: 0,
    explanation: "With negative production externalities, MSC exceeds MPC. The free market equilibrium (where MPC = MSB) produces more than the social optimum (where MSC = MSB), resulting in overproduction and welfare loss."
  },
  {
    question: "Which of the following is least likely to be a cause of market failure?",
    options: [
      "Externalities",
      "Public goods",
      "Perfect competition",
      "Information asymmetry"
    ],
    correctIndex: 2,
    explanation: "Perfect competition leads to allocative efficiency where P = MC, which is an optimal market outcome. Externalities, public goods, and information asymmetry are all sources of market failure."
  }
];

const governmentIntervention = [
  {
    question: "A maximum price (price ceiling) set below the equilibrium price will lead to:",
    options: [
      "Excess supply in the market",
      "Excess demand in the market",
      "An increase in the equilibrium price",
      "No effect on the market"
    ],
    correctIndex: 1,
    explanation: "A maximum price below equilibrium means the price is held artificially low. At this lower price, quantity demanded exceeds quantity supplied, creating a shortage (excess demand)."
  },
  {
    question: "Which of the following is the most likely reason for a government imposing a minimum price on agricultural products?",
    options: [
      "To reduce consumer surplus",
      "To guarantee farmers a stable and sufficient income",
      "To create excess demand for food products",
      "To encourage consumers to buy more food"
    ],
    correctIndex: 1,
    explanation: "Governments set minimum prices (price floors) above equilibrium in agriculture to protect farmers from volatile and low prices, ensuring they receive enough income to remain viable."
  },
  {
    question: "A Pigouvian tax on a good with negative externalities aims to:",
    options: [
      "Increase production to the socially optimal level",
      "Internalise the external cost so that the market price reflects social cost",
      "Generate government revenue to fund public services",
      "Eliminate all production of the polluting good"
    ],
    correctIndex: 1,
    explanation: "A Pigouvian tax is set equal to the external cost at the socially optimal output level. By internalising the externality, it ensures producers and consumers face the true social cost, reducing output to the efficient level."
  },
  {
    question: "Government failure occurs when:",
    options: [
      "The government fails to win an election",
      "Government intervention leads to a net welfare loss or makes the situation worse than the free market",
      "The market reaches equilibrium without government help",
      "Government spending falls below tax revenue"
    ],
    correctIndex: 1,
    explanation: "Government failure occurs when intervention creates a worse outcome than the market failure it sought to correct, often due to unintended consequences, poor information, or political self-interest."
  },
  {
    question: "Which of the following is an argument against the use of indirect taxes to correct negative externalities?",
    options: [
      "Taxes always eliminate the externality completely",
      "It is difficult to accurately measure the external cost, so the tax may be set at the wrong level",
      "Indirect taxes always reduce government revenue",
      "Consumers always reduce consumption to zero when a tax is imposed"
    ],
    correctIndex: 1,
    explanation: "A key problem with Pigouvian taxes is the difficulty of measuring external costs precisely. If the tax is set too high or too low, the market outcome will not reach the socially optimal level."
  },
  {
    question: "A subsidy granted to producers of a merit good is intended to:",
    options: [
      "Decrease supply and increase price",
      "Increase supply, reduce price, and encourage consumption closer to the socially optimal level",
      "Increase the external costs of production",
      "Reduce the quality of the merit good"
    ],
    correctIndex: 1,
    explanation: "Subsidies reduce production costs, shifting supply right. The lower price encourages greater consumption, moving output closer to the social optimum where MSB = MSC, helping correct the market's underprovision of merit goods."
  },
  {
    question: "Tradable pollution permits work by:",
    options: [
      "Banning all pollution from firms",
      "Setting a total pollution cap and allowing firms to buy and sell permits to pollute",
      "Taxing firms based on their output level",
      "Subsidising firms that pollute the least"
    ],
    correctIndex: 1,
    explanation: "Tradable permits set an overall cap on pollution and allocate permits to firms. Firms that can reduce pollution cheaply sell excess permits; those facing high abatement costs buy them, achieving the target efficiently."
  },
  {
    question: "The introduction of a national minimum wage above the equilibrium wage in a competitive labour market would be expected to:",
    options: [
      "Reduce unemployment",
      "Create unemployment as quantity of labour supplied exceeds quantity demanded",
      "Have no effect on the labour market",
      "Increase both wages and employment simultaneously"
    ],
    correctIndex: 1,
    explanation: "A minimum wage above equilibrium increases the wage (attracting more workers) but reduces the quantity of labour demanded by firms. The result is excess supply of labour, i.e., unemployment."
  },
  {
    question: "Which of the following is an example of government failure?",
    options: [
      "A carbon tax successfully reducing emissions to the target level",
      "The prohibition of alcohol in the 1920s USA, which led to a thriving black market",
      "A subsidy increasing the consumption of merit goods",
      "Regulation improving food safety standards"
    ],
    correctIndex: 1,
    explanation: "Prohibition aimed to eliminate alcohol consumption but instead created extensive black markets, organised crime, and loss of tax revenue. The intervention produced worse outcomes than the problem it aimed to solve."
  },
  {
    question: "Regulation as a form of government intervention is often criticised because:",
    options: [
      "It always leads to lower prices for consumers",
      "It can be costly to enforce and may be avoided through regulatory capture",
      "It always increases production efficiency",
      "It eliminates all forms of market failure"
    ],
    correctIndex: 1,
    explanation: "Regulation faces enforcement costs and the risk of regulatory capture, where regulated industries influence regulators to act in the industry's interest rather than the public interest, undermining the policy's effectiveness."
  },
  {
    question: "Provision of information (e.g., health warnings on cigarettes) is a government policy that aims to:",
    options: [
      "Increase the supply of cigarettes",
      "Correct information failure by ensuring consumers are aware of the true costs of consumption",
      "Create a monopoly in the cigarette market",
      "Increase tax revenue from cigarette sales"
    ],
    correctIndex: 1,
    explanation: "Health warnings address information failure by ensuring consumers understand the true risks of smoking. Better-informed consumers are expected to reduce consumption of demerit goods closer to the socially optimal level."
  },
  {
    question: "A buffer stock scheme to stabilise agricultural prices involves:",
    options: [
      "Taxing farmers when prices are high and subsidising them when prices are low",
      "Buying surplus output when prices are low and selling from stocks when prices are high",
      "Setting a fixed price for all agricultural goods permanently",
      "Allowing free market forces to determine agricultural prices"
    ],
    correctIndex: 1,
    explanation: "Buffer stock schemes stabilise prices by purchasing and storing surplus output in times of low prices (supporting the price) and releasing stocks when prices are high (reducing the price), keeping prices within a target range."
  },
  {
    question: "The law of unintended consequences in the context of government intervention means:",
    options: [
      "All government policies work as planned",
      "Government policies may produce unexpected and often undesirable outcomes",
      "The private sector always responds positively to government intervention",
      "Market forces can always correct government failure"
    ],
    correctIndex: 1,
    explanation: "The law of unintended consequences recognises that policies can have unforeseen effects. For example, rent controls may reduce housing quality and supply, worsening the housing shortage they aimed to fix."
  },
  {
    question: "Which of the following best describes the effect of a specific tax on a market with price elastic demand?",
    options: [
      "Consumers bear most of the tax burden and quantity falls significantly",
      "Producers bear most of the tax burden and quantity falls significantly",
      "Consumers bear most of the tax burden and quantity hardly changes",
      "Producers bear most of the tax burden and quantity hardly changes"
    ],
    correctIndex: 1,
    explanation: "With elastic demand, consumers are price-sensitive and will significantly reduce purchases if the price rises. Producers cannot pass much of the tax on, so they bear most of the burden, and the quantity traded falls substantially."
  },
  {
    question: "State provision of public goods is justified because:",
    options: [
      "Public goods are always produced more efficiently by the government",
      "The free rider problem means private firms cannot charge for public goods, leading to non-provision",
      "Public goods have no opportunity cost when provided by the state",
      "Consumers always prefer government-provided goods"
    ],
    correctIndex: 1,
    explanation: "Because public goods are non-excludable, people can benefit without paying. This means private firms cannot profit from providing them, so without government provision, public goods would not be supplied at all."
  }
];

// ─────────────────────────────────────────────
// UNIT 2 — Macroeconomic Performance & Policy
// ─────────────────────────────────────────────

const measuresEconomicPerformance = [
  {
    question: "If nominal GDP is $500 billion and the GDP deflator is 125, real GDP is:",
    options: [
      "$400 billion",
      "$500 billion",
      "$625 billion",
      "$375 billion"
    ],
    correctIndex: 0,
    explanation: "Real GDP = (Nominal GDP / GDP deflator) x 100 = ($500bn / 125) x 100 = $400 billion. The GDP deflator adjusts for price level changes to give GDP in constant prices."
  },
  {
    question: "The Consumer Price Index (CPI) measures:",
    options: [
      "The total output of goods and services in an economy",
      "The average change in prices of a representative basket of goods and services over time",
      "The level of unemployment in the economy",
      "The balance of payments on the current account"
    ],
    correctIndex: 1,
    explanation: "The CPI tracks the cost of a fixed basket of goods and services purchased by a typical household over time, providing a measure of inflation experienced by consumers."
  },
  {
    question: "Which of the following is NOT included in the measurement of GDP?",
    options: [
      "Government spending on public services",
      "Investment by firms in new machinery",
      "Unpaid housework and childcare within the home",
      "Consumer spending on goods and services"
    ],
    correctIndex: 2,
    explanation: "GDP only measures economic activity that passes through markets. Unpaid housework and voluntary work are excluded because they have no market transaction, leading GDP to underestimate total economic activity."
  },
  {
    question: "Demand-pull inflation is most likely caused by:",
    options: [
      "An increase in oil prices raising production costs",
      "An increase in aggregate demand when the economy is near full capacity",
      "A decrease in consumer confidence reducing spending",
      "An increase in labour productivity"
    ],
    correctIndex: 1,
    explanation: "Demand-pull inflation occurs when aggregate demand grows faster than the economy's productive capacity, pulling prices up. It is particularly strong when the economy operates near or at full employment."
  },
  {
    question: "The claimant count measure of unemployment counts:",
    options: [
      "All people aged 16-64 who are not working",
      "The number of people claiming unemployment-related benefits",
      "All people who have been made redundant in the past year",
      "The number of part-time workers seeking full-time employment"
    ],
    correctIndex: 1,
    explanation: "The claimant count measures unemployment by counting those claiming Jobseeker's Allowance or Universal Credit. It tends to underestimate true unemployment as not all unemployed people are eligible for or claim benefits."
  },
  {
    question: "A current account deficit on the balance of payments means:",
    options: [
      "The value of exports exceeds the value of imports",
      "The value of imports of goods, services, and transfers exceeds the value of exports",
      "The government is spending more than it receives in tax revenue",
      "The country is lending more to other countries than it borrows"
    ],
    correctIndex: 1,
    explanation: "A current account deficit occurs when total debits (imports of goods and services, plus net income and transfer payments abroad) exceed total credits (exports plus income and transfers from abroad)."
  },
  {
    question: "Which type of unemployment is caused by workers being between jobs?",
    options: [
      "Structural unemployment",
      "Cyclical unemployment",
      "Frictional unemployment",
      "Seasonal unemployment"
    ],
    correctIndex: 2,
    explanation: "Frictional unemployment occurs when workers are temporarily between jobs, searching for better positions or transitioning. It exists even in a healthy economy and is usually short-term."
  },
  {
    question: "Cost-push inflation is most likely to result from:",
    options: [
      "An increase in consumer spending due to tax cuts",
      "A significant rise in global oil and commodity prices",
      "An increase in government borrowing",
      "A reduction in interest rates stimulating borrowing"
    ],
    correctIndex: 1,
    explanation: "Cost-push inflation occurs when rising production costs (such as oil prices, wages, or raw materials) push up the general price level. This shifts the SRAS curve to the left, raising prices and reducing output."
  },
  {
    question: "GDP per capita is a better measure of living standards than total GDP because it:",
    options: [
      "Accounts for income distribution within a country",
      "Adjusts total output for the size of the population",
      "Includes the value of leisure time",
      "Measures the quality of goods and services produced"
    ],
    correctIndex: 1,
    explanation: "GDP per capita divides total GDP by the population, giving output per person. A country can have high total GDP but low living standards if its population is very large. However, it still does not account for income inequality."
  },
  {
    question: "Structural unemployment is best described as unemployment caused by:",
    options: [
      "A general downturn in economic activity",
      "Seasonal fluctuations in demand for labour",
      "A mismatch between the skills of workers and the requirements of available jobs",
      "Workers voluntarily leaving jobs to search for better ones"
    ],
    correctIndex: 2,
    explanation: "Structural unemployment arises from long-term changes in the economy (e.g., deindustrialisation, technological change) that create a mismatch between workers' skills and the skills demanded by employers."
  },
  {
    question: "The ILO (International Labour Organisation) measure of unemployment includes:",
    options: [
      "Only those registered as unemployed with the government",
      "Those without a job, actively seeking work, and available to start within two weeks",
      "All people of working age who are not in full-time employment",
      "Those who are underemployed or in part-time work"
    ],
    correctIndex: 1,
    explanation: "The ILO definition uses three criteria: the person must be without work, actively seeking employment, and available to start within two weeks. It is based on the Labour Force Survey and is internationally comparable."
  },
  {
    question: "Which of the following is a limitation of using GDP as a measure of economic welfare?",
    options: [
      "GDP includes government spending on public services",
      "GDP does not account for environmental degradation caused by production",
      "GDP measures output in market prices",
      "GDP can be measured using the expenditure, income, or output method"
    ],
    correctIndex: 1,
    explanation: "GDP does not deduct environmental costs such as pollution, resource depletion, or habitat destruction. A country could have high GDP growth while significantly damaging its natural environment, reducing actual welfare."
  },
  {
    question: "If the inflation rate falls from 5% to 2%, this is known as:",
    options: [
      "Deflation",
      "Disinflation",
      "Stagflation",
      "Hyperinflation"
    ],
    correctIndex: 1,
    explanation: "Disinflation is a fall in the rate of inflation (prices still rising, but more slowly). Deflation would be a negative inflation rate where the general price level is falling."
  },
  {
    question: "The 'hidden economy' (shadow economy) causes GDP to:",
    options: [
      "Overestimate the true level of economic activity",
      "Underestimate the true level of economic activity",
      "Accurately reflect the true level of economic activity",
      "Have no relationship with economic activity"
    ],
    correctIndex: 1,
    explanation: "The hidden economy includes unreported cash-in-hand work, tax evasion, and illegal activities. Since these transactions are not recorded, official GDP figures underestimate the true level of economic activity."
  },
  {
    question: "A country's current account balance worsens. Which of the following is the most likely cause?",
    options: [
      "An appreciation of the domestic currency making exports cheaper",
      "An appreciation of the domestic currency making imports cheaper and exports more expensive",
      "A depreciation of the domestic currency",
      "A fall in domestic income levels reducing import demand"
    ],
    correctIndex: 1,
    explanation: "Currency appreciation makes exports more expensive for foreign buyers (reducing export revenue) and imports cheaper for domestic consumers (increasing import spending), worsening the current account balance."
  }
];

const aggregateDemand = [
  {
    question: "Aggregate demand is composed of:",
    options: [
      "AD = C + I + G + (X - M)",
      "AD = C + S + T + M",
      "AD = GDP + Inflation",
      "AD = C + I + G + X + M"
    ],
    correctIndex: 0,
    explanation: "Aggregate demand (AD) = Consumer spending (C) + Investment (I) + Government spending (G) + Net exports (X - M). This represents total planned expenditure on goods and services at each price level."
  },
  {
    question: "If the marginal propensity to consume (MPC) is 0.8, the value of the multiplier is:",
    options: [
      "4",
      "5",
      "0.8",
      "1.25"
    ],
    correctIndex: 1,
    explanation: "The multiplier = 1 / (1 - MPC) = 1 / (1 - 0.8) = 1 / 0.2 = 5. This means an initial increase in spending generates a final increase in national income five times larger."
  },
  {
    question: "Which of the following would cause a leftward shift of the aggregate demand curve?",
    options: [
      "A cut in income tax rates",
      "An increase in government spending on infrastructure",
      "A rise in interest rates by the central bank",
      "A depreciation of the exchange rate"
    ],
    correctIndex: 2,
    explanation: "Higher interest rates increase the cost of borrowing and the return on saving. This reduces consumer spending (C) and investment (I), shifting the AD curve to the left."
  },
  {
    question: "The wealth effect explains why the AD curve slopes downward because:",
    options: [
      "Higher prices reduce the real value of wealth, reducing consumer spending",
      "Higher prices increase exports, reducing domestic demand",
      "Higher prices lead to government spending cuts",
      "Higher prices encourage firms to invest more"
    ],
    correctIndex: 0,
    explanation: "When the price level rises, the real value of household wealth (savings, assets) falls. Consumers feel poorer and reduce spending, contributing to the downward slope of the AD curve."
  },
  {
    question: "The marginal propensity to save (MPS) plus the marginal propensity to consume (MPC) equals:",
    options: [
      "0",
      "0.5",
      "1",
      "The multiplier"
    ],
    correctIndex: 2,
    explanation: "In a simple two-sector model, all additional income is either consumed or saved. Therefore MPC + MPS = 1. If MPC is 0.75, then MPS is 0.25."
  },
  {
    question: "The accelerator theory suggests that investment is primarily determined by:",
    options: [
      "The level of interest rates",
      "The rate of change of national income (output)",
      "Government subsidies for businesses",
      "The current level of profits"
    ],
    correctIndex: 1,
    explanation: "The accelerator theory states that investment spending depends on the rate of change of output/income. When output is growing, firms invest in new capital to expand capacity; when growth slows, investment falls sharply."
  },
  {
    question: "A depreciation of the pound sterling would most likely shift the AD curve to the right because:",
    options: [
      "It makes UK exports cheaper and imports more expensive, improving net exports",
      "It increases the purchasing power of UK consumers",
      "It reduces the cost of imported raw materials",
      "It causes the Bank of England to cut interest rates"
    ],
    correctIndex: 0,
    explanation: "A weaker pound makes UK exports cheaper for foreign buyers (boosting X) and imports more expensive for UK consumers (reducing M). The improvement in net exports (X - M) shifts AD to the right."
  },
  {
    question: "If the government increases spending by $10 billion and the multiplier is 2.5, the final increase in national income will be:",
    options: [
      "$10 billion",
      "$12.5 billion",
      "$25 billion",
      "$4 billion"
    ],
    correctIndex: 2,
    explanation: "Final change in income = initial injection x multiplier = $10bn x 2.5 = $25 billion. The multiplier process amplifies the initial spending through successive rounds of consumption."
  },
  {
    question: "Which of the following is a withdrawal (leakage) from the circular flow of income?",
    options: [
      "Investment",
      "Government spending",
      "Exports",
      "Taxation"
    ],
    correctIndex: 3,
    explanation: "Withdrawals (leakages) reduce spending in the circular flow. They are saving (S), taxation (T), and imports (M). Investment, government spending, and exports are injections."
  },
  {
    question: "Consumer confidence is most likely to increase consumption spending because:",
    options: [
      "Confident consumers save a larger proportion of their income",
      "Optimistic consumers spend more and borrow more, anticipating future income growth",
      "Consumer confidence reduces interest rates",
      "Confident consumers pay less tax"
    ],
    correctIndex: 1,
    explanation: "When consumer confidence is high, households are optimistic about future income and employment prospects. They spend more of their current income and are more willing to borrow, increasing consumption (C)."
  },
  {
    question: "The international trade effect explains the downward slope of AD because:",
    options: [
      "A rise in the domestic price level makes exports less competitive and imports relatively cheaper",
      "A rise in the price level encourages more government spending",
      "A rise in the price level increases investment",
      "A rise in the price level reduces the money supply"
    ],
    correctIndex: 0,
    explanation: "When the domestic price level rises, exports become more expensive for foreign buyers (reducing X) and imports become relatively cheaper (increasing M). The fall in net exports reduces AD, contributing to the downward slope."
  },
  {
    question: "In an open economy with government, the multiplier formula is:",
    options: [
      "1 / MPS",
      "1 / (MPS + MPT + MPM)",
      "1 / (1 - MPC)",
      "MPC / (1 - MPC)"
    ],
    correctIndex: 1,
    explanation: "In an open economy with government, the multiplier = 1 / (MPS + MPT + MPM), where MPT is the marginal propensity to tax and MPM is the marginal propensity to import. More leakages reduce the multiplier."
  },
  {
    question: "An increase in interest rates is likely to reduce investment because:",
    options: [
      "It increases the cost of borrowing, making fewer investment projects profitable",
      "It encourages firms to expand production immediately",
      "It reduces the cost of raw materials",
      "It increases consumer spending on durable goods"
    ],
    correctIndex: 0,
    explanation: "Higher interest rates raise the cost of borrowing for firms. Investment projects must generate a return exceeding the interest rate to be worthwhile, so higher rates make fewer projects viable, reducing total investment."
  },
  {
    question: "The paradox of thrift states that:",
    options: [
      "Higher saving always leads to higher investment and growth",
      "If everyone tries to save more simultaneously, national income falls, potentially reducing total saving",
      "Thrifty consumers always benefit the economy",
      "Saving is always bad for economic growth"
    ],
    correctIndex: 1,
    explanation: "The paradox of thrift (Keynes) argues that if all households increase saving simultaneously, consumption falls, reducing AD and national income. The resulting fall in income may actually reduce total saving."
  },
  {
    question: "Which of the following would increase the size of the multiplier?",
    options: [
      "An increase in the marginal rate of income tax",
      "A decrease in the marginal propensity to consume",
      "A decrease in the marginal propensity to import",
      "An increase in the marginal propensity to save"
    ],
    correctIndex: 2,
    explanation: "The multiplier is larger when leakages (MPS, MPT, MPM) are smaller. A decrease in the marginal propensity to import means more spending stays in the domestic economy, amplifying the multiplier effect."
  }
];

const aggregateSupply = [
  {
    question: "In the Keynesian model, the aggregate supply curve is horizontal at low levels of output because:",
    options: [
      "Firms are operating at full capacity",
      "There is significant spare capacity and unemployed resources, so output can increase without rising prices",
      "The government is controlling prices",
      "Inflation is always zero in the short run"
    ],
    correctIndex: 1,
    explanation: "In the Keynesian view, when the economy has high unemployment and spare capacity, firms can increase output by employing idle resources without bidding up wages or prices, making the AS curve horizontal."
  },
  {
    question: "A leftward shift of the short-run aggregate supply (SRAS) curve could be caused by:",
    options: [
      "A fall in oil prices",
      "An improvement in technology",
      "An increase in wage costs across the economy",
      "An increase in labour productivity"
    ],
    correctIndex: 2,
    explanation: "Higher wage costs increase production costs for firms across the economy. This reduces the amount firms are willing to supply at each price level, shifting the SRAS curve to the left, causing cost-push inflation."
  },
  {
    question: "In the Classical model, the long-run aggregate supply (LRAS) curve is vertical because:",
    options: [
      "The government controls all production decisions",
      "In the long run, output is determined by the quantity and quality of resources, not the price level",
      "Prices are fixed in the long run",
      "Aggregate demand has no effect on the economy"
    ],
    correctIndex: 1,
    explanation: "Classical economists argue that in the long run, output is determined by supply-side factors (labour, capital, technology, institutions), not the price level. Changes in AD only affect prices, not real output."
  },
  {
    question: "Which of the following would cause the LRAS curve to shift to the right?",
    options: [
      "An increase in consumer spending",
      "A cut in interest rates by the central bank",
      "Investment in education and training improving human capital",
      "A depreciation of the exchange rate"
    ],
    correctIndex: 2,
    explanation: "The LRAS curve shifts right when the economy's productive capacity increases. Investment in education improves human capital (worker skills and productivity), increasing the potential output of the economy."
  },
  {
    question: "Stagflation refers to a situation where:",
    options: [
      "Economic growth is high and inflation is low",
      "There is simultaneously high inflation and high unemployment/stagnant growth",
      "Deflation and rapid economic growth occur together",
      "The economy reaches full employment with stable prices"
    ],
    correctIndex: 1,
    explanation: "Stagflation combines stagnation (low/negative growth, high unemployment) with inflation. It is typically caused by a negative supply shock (e.g., oil price spike) shifting SRAS left, raising prices while reducing output."
  },
  {
    question: "The difference between the Classical and Keynesian views on the long-run aggregate supply curve is that:",
    options: [
      "Classical economists believe LRAS is vertical; Keynesians believe it has a horizontal section at low output levels",
      "Both agree the LRAS is always horizontal",
      "Classical economists believe LRAS is horizontal; Keynesians believe it is vertical",
      "There is no difference between the two views"
    ],
    correctIndex: 0,
    explanation: "Classical economists argue LRAS is vertical at full employment output. Keynesians argue the AS curve has three sections: horizontal (spare capacity), upward-sloping (approaching capacity), and vertical (full capacity)."
  },
  {
    question: "If aggregate demand increases when the economy is operating on the vertical section of the AS curve, the result is:",
    options: [
      "An increase in real output with no change in the price level",
      "An increase in the price level with no change in real output",
      "An equal increase in both real output and the price level",
      "A decrease in the price level and increase in output"
    ],
    correctIndex: 1,
    explanation: "On the vertical section of AS, the economy is at full capacity. Any increase in AD cannot increase real output (all resources are employed), so it only causes the price level to rise (demand-pull inflation)."
  },
  {
    question: "An improvement in technology across the economy would:",
    options: [
      "Shift SRAS left and LRAS right",
      "Shift both SRAS and LRAS to the right",
      "Shift SRAS right and LRAS left",
      "Only shift the AD curve to the right"
    ],
    correctIndex: 1,
    explanation: "Technological improvement reduces production costs (shifting SRAS right) and increases the economy's productive capacity (shifting LRAS right), enabling more output at every price level in both the short and long run."
  },
  {
    question: "A negative output gap occurs when:",
    options: [
      "Actual GDP exceeds potential GDP",
      "Actual GDP is below potential GDP, indicating spare capacity",
      "The economy is experiencing inflation above target",
      "Government spending exceeds tax revenue"
    ],
    correctIndex: 1,
    explanation: "A negative output gap means actual GDP is below the economy's potential (full capacity) GDP. This indicates spare capacity, unemployment of resources, and likely downward pressure on inflation."
  },
  {
    question: "Supply-side improvements that shift LRAS to the right tend to:",
    options: [
      "Increase the price level and reduce output",
      "Reduce the price level and increase potential output (non-inflationary growth)",
      "Increase the price level and increase output",
      "Have no effect on either prices or output"
    ],
    correctIndex: 1,
    explanation: "A rightward shift of LRAS increases the economy's productive capacity. This allows higher output without inflationary pressure, potentially reducing the price level while increasing real GDP."
  },
  {
    question: "In the short run, an increase in aggregate demand when the economy has significant spare capacity will primarily lead to:",
    options: [
      "A large increase in the price level with little change in output",
      "A large increase in real output with little change in the price level",
      "A decrease in both output and the price level",
      "No change in either output or the price level"
    ],
    correctIndex: 1,
    explanation: "With significant spare capacity (on the horizontal/flat section of AS), firms can increase output by employing idle resources without significant cost increases. AD increases lead mainly to output growth, not inflation."
  },
  {
    question: "Which of the following is NOT a factor that determines the position of the LRAS curve?",
    options: [
      "The size and quality of the labour force",
      "The level of aggregate demand in the economy",
      "The quantity and quality of capital stock",
      "The level of technology and innovation"
    ],
    correctIndex: 1,
    explanation: "LRAS is determined by supply-side factors: labour, capital, technology, and institutional factors. Aggregate demand affects the actual level of output in the short run but does not determine the economy's productive capacity."
  },
  {
    question: "A positive supply shock (such as discovery of a major new energy source) would:",
    options: [
      "Shift SRAS to the left, causing inflation",
      "Shift SRAS to the right, reducing the price level and increasing output",
      "Shift the AD curve to the left",
      "Have no effect on aggregate supply"
    ],
    correctIndex: 1,
    explanation: "A positive supply shock reduces production costs across the economy (e.g., cheaper energy). This shifts SRAS to the right, leading to lower prices and higher output — the opposite of stagflation."
  },
  {
    question: "According to Keynesian economics, the economy can settle at an equilibrium below full employment because:",
    options: [
      "Prices and wages are perfectly flexible",
      "Prices and wages are sticky downward, preventing automatic adjustment to full employment",
      "The government always intervenes to prevent full employment",
      "Workers always demand wages above the equilibrium level"
    ],
    correctIndex: 1,
    explanation: "Keynesians argue that wage and price rigidities (stickiness) prevent the self-correcting mechanism that Classical economists rely on. The economy can therefore remain in a state of deficient demand and unemployment."
  },
  {
    question: "If an economy is at macroeconomic equilibrium where AD intersects SRAS to the left of LRAS, this indicates:",
    options: [
      "A positive output gap with inflationary pressure",
      "A negative output gap with deflationary pressure and spare capacity",
      "The economy is at full employment equilibrium",
      "The economy is experiencing hyperinflation"
    ],
    correctIndex: 1,
    explanation: "When equilibrium output is below LRAS (potential output), there is a negative output gap. The economy has spare capacity and unemployment, with downward pressure on prices and wages."
  }
];

const nationalIncome = [
  {
    question: "In the circular flow model, which of the following represents an injection into the economy?",
    options: [
      "Saving",
      "Taxation",
      "Investment",
      "Imports"
    ],
    correctIndex: 2,
    explanation: "Injections add spending to the circular flow: Investment (I), Government spending (G), and Exports (X). Saving, taxation, and imports are withdrawals (leakages) that remove spending from the flow."
  },
  {
    question: "National income is in equilibrium when:",
    options: [
      "Aggregate demand equals aggregate supply, or equivalently injections equal withdrawals",
      "Government spending equals taxation",
      "Exports equal imports",
      "Consumption equals investment"
    ],
    correctIndex: 0,
    explanation: "Equilibrium national income occurs where AD = AS, which in the circular flow corresponds to total injections (I + G + X) equalling total withdrawals (S + T + M). There is no tendency for income to change."
  },
  {
    question: "If withdrawals exceed injections in the circular flow, the level of national income will:",
    options: [
      "Increase",
      "Decrease",
      "Remain unchanged",
      "Become negative"
    ],
    correctIndex: 1,
    explanation: "When withdrawals (S + T + M) exceed injections (I + G + X), more is leaking from the circular flow than is being added. Total spending falls, causing national income to contract until a new equilibrium is reached."
  },
  {
    question: "GDP measured using the expenditure method is calculated as:",
    options: [
      "Wages + Profits + Rent + Interest",
      "C + I + G + (X - M)",
      "Total output of all industries",
      "Total tax revenue minus government spending"
    ],
    correctIndex: 1,
    explanation: "The expenditure method sums all spending on final goods and services: Consumer spending (C) + Investment (I) + Government spending (G) + Net exports (X - M). All three methods (expenditure, income, output) should give the same GDP."
  },
  {
    question: "Transfer payments (such as state pensions and unemployment benefits) are:",
    options: [
      "Included in the government spending component of GDP",
      "Excluded from GDP because they do not represent payment for current production",
      "Included in the investment component of GDP",
      "Counted as exports in the GDP calculation"
    ],
    correctIndex: 1,
    explanation: "Transfer payments are redistribution of income, not payments for goods or services produced. They are excluded from GDP to avoid double counting, since the income will be counted when recipients spend it."
  },
  {
    question: "The difference between GDP and GNI (Gross National Income) is that:",
    options: [
      "GDP includes depreciation of capital; GNI does not",
      "GNI includes net income from abroad (earnings of citizens overseas minus foreign earnings repatriated)",
      "GDP measures output per capita; GNI measures total output",
      "There is no meaningful difference between the two"
    ],
    correctIndex: 1,
    explanation: "GNI = GDP + net income from abroad. GNI includes income earned by domestic residents overseas and subtracts income earned by foreign residents domestically, measuring the total income of a country's citizens."
  },
  {
    question: "In the income method of calculating GDP, which of the following is included?",
    options: [
      "Transfer payments to households",
      "Wages, salaries, profits, rent, and interest earned in production",
      "The value of second-hand goods sold",
      "Financial transactions on the stock market"
    ],
    correctIndex: 1,
    explanation: "The income method sums all factor incomes earned in production: wages and salaries (labour), profits (enterprise), rent (land), and interest (capital). Transfer payments and financial transactions are excluded."
  },
  {
    question: "Net national income is calculated as:",
    options: [
      "GDP plus net income from abroad",
      "GNI minus depreciation (capital consumption)",
      "GDP minus government spending",
      "GNI plus depreciation"
    ],
    correctIndex: 1,
    explanation: "Net national income = GNI minus depreciation (also called capital consumption). Depreciation represents the wear and tear of capital goods, so deducting it gives a better measure of sustainable income."
  },
  {
    question: "Which of the following would increase the level of national income through the multiplier process?",
    options: [
      "An increase in saving by households",
      "An increase in imports of foreign goods",
      "An increase in government infrastructure spending",
      "An increase in income tax rates"
    ],
    correctIndex: 2,
    explanation: "Government infrastructure spending is an injection into the circular flow. Through the multiplier, the initial spending generates successive rounds of income and consumption, increasing national income by a multiple of the original injection."
  },
  {
    question: "Purchasing Power Parity (PPP) exchange rates are used when comparing GDP between countries because:",
    options: [
      "They reflect current market exchange rates",
      "They adjust for differences in price levels between countries, giving a more accurate comparison of living standards",
      "They are easier to calculate than market exchange rates",
      "They always favour developing countries"
    ],
    correctIndex: 1,
    explanation: "PPP rates adjust for the fact that the same goods cost different amounts in different countries. A dollar buys more in India than in Switzerland, so PPP adjustments give a more realistic comparison of purchasing power and living standards."
  },
  {
    question: "In a simple two-sector (households and firms) circular flow model, the equilibrium condition is:",
    options: [
      "Consumption equals investment",
      "Saving equals investment",
      "Income equals expenditure plus saving",
      "Saving equals government spending"
    ],
    correctIndex: 1,
    explanation: "In a two-sector model, saving is the only withdrawal and investment is the only injection. Equilibrium requires S = I, meaning the amount households save equals the amount firms invest."
  },
  {
    question: "Which of the following is an example of a stock variable rather than a flow variable?",
    options: [
      "National income per year",
      "Consumer spending per quarter",
      "The national debt at a point in time",
      "Government tax revenue per year"
    ],
    correctIndex: 2,
    explanation: "Stock variables are measured at a point in time (e.g., national debt, wealth, capital stock). Flow variables are measured over a period of time (e.g., income, spending, investment per year)."
  },
  {
    question: "Real GDP differs from nominal GDP because real GDP:",
    options: [
      "Includes the value of imports and exports",
      "Has been adjusted for inflation using a base year price level",
      "Is always larger than nominal GDP",
      "Measures output in current market prices"
    ],
    correctIndex: 1,
    explanation: "Real GDP adjusts nominal GDP for changes in the price level, using a base year's prices. This removes the effect of inflation and shows whether the actual volume of output has increased or decreased."
  },
  {
    question: "The output (production) method of measuring GDP:",
    options: [
      "Sums all consumer spending in the economy",
      "Sums the value added at each stage of production across all industries",
      "Sums all income earned by factors of production",
      "Sums all government spending and transfer payments"
    ],
    correctIndex: 1,
    explanation: "The output method calculates GDP by summing the value added (output minus intermediate inputs) at each stage of production across all sectors. Using value added avoids double counting of intermediate goods."
  },
  {
    question: "If a country's GDP grows by 3% but its population grows by 4%, then GDP per capita has:",
    options: [
      "Increased",
      "Decreased",
      "Remained the same",
      "Cannot be determined from this information"
    ],
    correctIndex: 1,
    explanation: "GDP per capita = GDP / population. If population grows faster than GDP, GDP per capita falls, meaning average output and likely average living standards have declined despite total output growth."
  }
];

const economicGrowth = [
  {
    question: "The difference between actual economic growth and potential economic growth is that:",
    options: [
      "Actual growth measures the increase in GDP; potential growth measures the increase in productive capacity",
      "Actual growth is always higher than potential growth",
      "Potential growth can only be achieved through government intervention",
      "There is no meaningful difference between the two"
    ],
    correctIndex: 0,
    explanation: "Actual growth is the annual percentage increase in real GDP. Potential growth is the increase in the economy's capacity to produce (shown by an outward shift of the PPF or LRAS). Actual growth can occur by using spare capacity."
  },
  {
    question: "An economy experiencing a positive output gap is likely to face:",
    options: [
      "Rising unemployment and falling inflation",
      "Rising inflation as demand exceeds the economy's sustainable capacity",
      "Falling GDP and rising saving",
      "A recession caused by supply-side factors"
    ],
    correctIndex: 1,
    explanation: "A positive output gap means actual GDP exceeds potential GDP. The economy is overheating, with demand outstripping capacity, putting upward pressure on wages and prices, causing demand-pull inflation."
  },
  {
    question: "Which of the following is a cost of economic growth?",
    options: [
      "Higher employment and lower unemployment",
      "Increased government tax revenue",
      "Environmental degradation and resource depletion",
      "Improved living standards for most of the population"
    ],
    correctIndex: 2,
    explanation: "Economic growth often involves increased production which can lead to pollution, deforestation, and resource depletion. These environmental costs reduce the sustainability of growth and may reduce welfare for future generations."
  },
  {
    question: "The business (trade) cycle refers to:",
    options: [
      "The pattern of long-run economic growth over centuries",
      "Short-term fluctuations in real GDP around the long-run trend",
      "The process of buying and selling goods in international markets",
      "The cycle of inflation followed by deflation"
    ],
    correctIndex: 1,
    explanation: "The business cycle describes regular short-term fluctuations in economic activity (boom, slowdown, recession, recovery) around the long-run growth trend. GDP rises above and falls below the trend in a cyclical pattern."
  },
  {
    question: "During the recession phase of the business cycle, which of the following is most likely?",
    options: [
      "Rising GDP, falling unemployment, rising inflation",
      "Falling GDP for two or more consecutive quarters, rising unemployment",
      "Stable GDP with rising investment and consumer confidence",
      "GDP at its peak with full employment"
    ],
    correctIndex: 1,
    explanation: "A recession is technically defined as two or more consecutive quarters of falling real GDP. It is characterised by rising unemployment, falling consumer and business confidence, and declining investment and spending."
  },
  {
    question: "Export-led growth is a strategy where a country:",
    options: [
      "Restricts imports to protect domestic industries",
      "Focuses on increasing exports as the main driver of GDP growth",
      "Relies primarily on government spending to drive growth",
      "Encourages domestic consumption as the main source of growth"
    ],
    correctIndex: 1,
    explanation: "Export-led growth focuses on expanding the export sector as the main engine of economic growth. Countries like China and South Korea used this strategy, benefiting from increased AD through rising net exports."
  },
  {
    question: "Which of the following would contribute to long-run (potential) economic growth?",
    options: [
      "An increase in consumer spending financed by borrowing",
      "A cut in interest rates stimulating aggregate demand",
      "Investment in research and development leading to new technologies",
      "A temporary government spending boost during a recession"
    ],
    correctIndex: 2,
    explanation: "Long-run growth requires an increase in productive capacity. R&D investment leads to technological innovation, improving productivity and shifting the LRAS curve to the right, enabling sustained growth."
  },
  {
    question: "The concept of sustainable economic growth refers to growth that:",
    options: [
      "Occurs at the fastest possible rate",
      "Can be maintained over time without depleting resources or causing excessive environmental damage",
      "Is driven entirely by government spending",
      "Leads to zero inflation"
    ],
    correctIndex: 1,
    explanation: "Sustainable growth meets present needs without compromising the ability of future generations to meet theirs. It involves balancing economic expansion with environmental protection and resource conservation."
  },
  {
    question: "An increase in net immigration of working-age people would most likely lead to:",
    options: [
      "A leftward shift of the LRAS curve only",
      "A rightward shift of both AD and LRAS, potentially increasing growth",
      "A leftward shift of the AD curve",
      "No change in either AD or LRAS"
    ],
    correctIndex: 1,
    explanation: "Working-age immigrants expand the labour force (shifting LRAS right by increasing productive capacity) and also increase consumer spending (shifting AD right). This can boost both actual and potential growth."
  },
  {
    question: "Which of the following best describes the recovery phase of the business cycle?",
    options: [
      "GDP is at its highest point and unemployment is at its lowest",
      "GDP is falling and unemployment is rising rapidly",
      "GDP begins to rise again after a trough, with gradually falling unemployment",
      "GDP growth slows from its peak as the economy begins to overheat"
    ],
    correctIndex: 2,
    explanation: "The recovery (expansion) phase follows the trough of a recession. GDP begins to rise, unemployment gradually falls, consumer and business confidence improve, and spending and investment increase."
  },
  {
    question: "One reason why economic growth might not lead to improved living standards for all citizens is:",
    options: [
      "GDP per capita always rises with economic growth",
      "The benefits of growth may be unevenly distributed, increasing income inequality",
      "Economic growth always reduces pollution",
      "All citizens benefit equally from higher GDP"
    ],
    correctIndex: 1,
    explanation: "Economic growth can increase income inequality if the gains go primarily to the wealthy. Without redistribution, many citizens may see little improvement in their living standards despite rising GDP."
  },
  {
    question: "Actual economic growth can occur without an increase in potential output if:",
    options: [
      "The economy moves from a point inside the PPF to a point on the PPF",
      "The PPF shifts outward",
      "The LRAS curve shifts to the right",
      "New natural resources are discovered"
    ],
    correctIndex: 0,
    explanation: "Actual growth can occur by reducing unemployment and using spare capacity (moving from inside to on the PPF). This increases actual GDP without increasing the economy's maximum potential output."
  },
  {
    question: "The 'boom' phase of the business cycle is typically characterised by:",
    options: [
      "High unemployment and low inflation",
      "Rapid GDP growth, low unemployment, and rising inflationary pressures",
      "Falling GDP and rising government borrowing",
      "Stable prices and moderate economic growth"
    ],
    correctIndex: 1,
    explanation: "During a boom, the economy grows rapidly, unemployment falls to very low levels, consumer and business confidence is high, but demand pressures lead to rising inflation as the economy approaches or exceeds capacity."
  },
  {
    question: "Inclusive growth refers to economic growth that:",
    options: [
      "Maximises GDP regardless of distribution",
      "Benefits all sections of society, particularly the poorest, and reduces inequality",
      "Is driven entirely by the private sector",
      "Occurs only in developed economies"
    ],
    correctIndex: 1,
    explanation: "Inclusive growth ensures that the benefits of economic expansion are shared broadly across society, reducing poverty and inequality. It focuses on equal opportunities and ensuring marginalised groups benefit from growth."
  },
  {
    question: "A negative output gap is most likely to lead to which combination?",
    options: [
      "Rising inflation and falling unemployment",
      "Falling inflation and rising unemployment",
      "Rising inflation and rising unemployment",
      "Falling inflation and falling unemployment"
    ],
    correctIndex: 1,
    explanation: "A negative output gap means actual output is below potential. There is spare capacity in the economy, which puts downward pressure on prices (lower inflation) and means many resources, including labour, are unemployed."
  }
];

const macroeconomicObjectivesPolicies = [
  {
    question: "Expansionary fiscal policy involves:",
    options: [
      "Increasing interest rates and reducing the money supply",
      "Increasing government spending and/or cutting taxes to boost aggregate demand",
      "Reducing government spending to balance the budget",
      "Increasing the exchange rate to reduce import prices"
    ],
    correctIndex: 1,
    explanation: "Expansionary fiscal policy aims to increase AD by raising government spending (G) and/or cutting taxes (increasing disposable income and thus C). It is used to stimulate growth and reduce unemployment."
  },
  {
    question: "The main instrument of monetary policy in the UK is:",
    options: [
      "Changes in government spending",
      "Changes in the Bank Rate (base interest rate) set by the Bank of England",
      "Changes in income tax rates",
      "Changes in the exchange rate"
    ],
    correctIndex: 1,
    explanation: "The Bank of England's Monetary Policy Committee sets the Bank Rate to achieve the 2% inflation target. Changes in interest rates affect borrowing, saving, spending, and investment, influencing AD and inflation."
  },
  {
    question: "Supply-side policies aim to:",
    options: [
      "Increase aggregate demand in the short run",
      "Increase the productive capacity of the economy and shift LRAS to the right",
      "Reduce government spending to balance the budget",
      "Increase the exchange rate to reduce import costs"
    ],
    correctIndex: 1,
    explanation: "Supply-side policies aim to increase the quantity and quality of factors of production, improving productivity and shifting LRAS right. Examples include education investment, deregulation, and labour market reforms."
  },
  {
    question: "The Phillips Curve suggests a trade-off between:",
    options: [
      "Economic growth and the balance of payments",
      "Inflation and unemployment",
      "Interest rates and exchange rates",
      "Government spending and tax revenue"
    ],
    correctIndex: 1,
    explanation: "The original Phillips Curve showed an inverse relationship between unemployment and wage inflation (and by extension, price inflation). Lower unemployment tends to be associated with higher inflation, and vice versa."
  },
  {
    question: "Quantitative easing (QE) is a monetary policy tool that involves:",
    options: [
      "Raising interest rates to reduce inflation",
      "The central bank creating money to buy financial assets (e.g., government bonds) to increase the money supply",
      "The government printing money to finance public spending",
      "Reducing the amount of money in circulation"
    ],
    correctIndex: 1,
    explanation: "QE involves the central bank electronically creating money to purchase assets (mainly government bonds). This increases bank reserves, lowers long-term interest rates, and aims to boost lending, spending, and AD when rates are already near zero."
  },
  {
    question: "A potential conflict between macroeconomic objectives is that policies to reduce unemployment may:",
    options: [
      "Also reduce inflation",
      "Lead to higher inflation (demand-pull) if the economy is near full capacity",
      "Always improve the current account balance",
      "Have no effect on the price level"
    ],
    correctIndex: 1,
    explanation: "Expansionary policies to reduce unemployment increase AD, which may cause demand-pull inflation if the economy is already near capacity. This illustrates the inflation-unemployment trade-off shown by the Phillips Curve."
  },
  {
    question: "Which of the following is an example of a market-based supply-side policy?",
    options: [
      "Increasing government spending on healthcare",
      "Reducing corporation tax to incentivise business investment",
      "Imposing a national minimum wage",
      "Increasing welfare benefits"
    ],
    correctIndex: 1,
    explanation: "Market-based supply-side policies work through the market mechanism. Cutting corporation tax increases post-tax profits, incentivising firms to invest more, expand capacity, and improve productivity."
  },
  {
    question: "A contractionary monetary policy (higher interest rates) reduces inflation by:",
    options: [
      "Increasing aggregate supply",
      "Reducing aggregate demand through lower consumption and investment spending",
      "Increasing government spending",
      "Encouraging a depreciation of the exchange rate"
    ],
    correctIndex: 1,
    explanation: "Higher interest rates increase borrowing costs (reducing C and I), increase the return on saving (reducing C), and may appreciate the exchange rate (reducing net exports). All these reduce AD, dampening inflationary pressure."
  },
  {
    question: "The government's budget deficit is defined as:",
    options: [
      "Total government spending minus total tax revenue when spending exceeds revenue",
      "Total tax revenue minus total government spending",
      "The total accumulated national debt",
      "Government spending on public services only"
    ],
    correctIndex: 0,
    explanation: "A budget deficit occurs when government expenditure exceeds tax revenue in a given year. The deficit must be financed by borrowing, which adds to the national debt."
  },
  {
    question: "The long-run Phillips Curve (LRPC) in the monetarist/Classical view is:",
    options: [
      "Downward sloping, showing a permanent trade-off between inflation and unemployment",
      "Vertical at the natural rate of unemployment, meaning there is no long-run trade-off",
      "Horizontal, showing that inflation is constant regardless of unemployment",
      "Upward sloping, showing inflation and unemployment rise together"
    ],
    correctIndex: 1,
    explanation: "Monetarists argue the LRPC is vertical at the natural rate of unemployment (NAIRU). In the long run, there is no trade-off: expansionary policy only causes higher inflation without permanently reducing unemployment below the natural rate."
  },
  {
    question: "Which supply-side policy is most likely to reduce structural unemployment?",
    options: [
      "Cutting interest rates",
      "Investment in education and retraining programmes",
      "Increasing government spending on defence",
      "Reducing VAT on luxury goods"
    ],
    correctIndex: 1,
    explanation: "Structural unemployment results from skills mismatches. Education and retraining help workers acquire skills demanded by growing industries, reducing the mismatch and lowering structural unemployment."
  },
  {
    question: "An automatic stabiliser is a mechanism that:",
    options: [
      "Requires parliamentary approval before it can take effect",
      "Automatically dampens fluctuations in the business cycle without deliberate policy changes",
      "Is implemented by the central bank to control inflation",
      "Only operates during periods of economic boom"
    ],
    correctIndex: 1,
    explanation: "Automatic stabilisers (e.g., progressive taxation, unemployment benefits) automatically offset economic fluctuations. In recessions, tax receipts fall and benefit spending rises, boosting AD without new policy decisions."
  },
  {
    question: "Deregulation as a supply-side policy involves:",
    options: [
      "Increasing government regulation of industries",
      "Removing or reducing regulations to lower business costs and encourage competition",
      "Nationalising key industries",
      "Increasing tariffs on imported goods"
    ],
    correctIndex: 1,
    explanation: "Deregulation reduces bureaucratic barriers and compliance costs for businesses, encouraging new entrants, increasing competition, and improving efficiency. This can shift LRAS to the right by boosting productivity."
  },
  {
    question: "A country with a persistent current account deficit might use which policy to improve its trade balance?",
    options: [
      "Expansionary fiscal policy to boost domestic demand",
      "Expenditure-switching policies such as currency depreciation to make exports cheaper",
      "Cutting interest rates to encourage more consumer spending",
      "Increasing government spending on imports"
    ],
    correctIndex: 1,
    explanation: "Expenditure-switching policies redirect spending from imports to domestically produced goods. Currency depreciation makes exports cheaper and imports more expensive, improving competitiveness and the trade balance."
  },
  {
    question: "A limitation of using fiscal policy to manage the economy is:",
    options: [
      "It takes effect immediately with no time lags",
      "Time lags in implementation and effect may mean the policy is poorly timed relative to the business cycle",
      "It has no impact on aggregate demand",
      "It cannot be used during a recession"
    ],
    correctIndex: 1,
    explanation: "Fiscal policy suffers from recognition, decision, and implementation lags. By the time a policy is enacted and takes effect, economic conditions may have changed, potentially making the intervention pro-cyclical rather than counter-cyclical."
  }
];


// ─────────────────────────────────────────────
// SCRIPT LOGIC
// ─────────────────────────────────────────────

async function expandSection(sectionId, newQuestions) {
  const { data, error } = await supabase
    .from('section_quiz')
    .select('data')
    .eq('section_id', sectionId)
    .single();

  if (error) {
    console.error(`  FETCH FAILED: ${sectionId}`, error.message);
    return false;
  }

  const existing = data.data || [];
  const updated = [...existing, ...newQuestions];

  const { error: e2 } = await supabase
    .from('section_quiz')
    .update({ data: updated })
    .eq('section_id', sectionId);

  if (e2) {
    console.error(`  UPDATE FAILED: ${sectionId}`, e2.message);
    return false;
  }

  console.log(`  ${sectionId}: ${existing.length} → ${updated.length} questions (+${newQuestions.length})`);
  return true;
}

async function main() {
  console.log('=== Expanding Economics Units 1-2 Quiz Data ===\n');

  const sections = [
    // Unit 1
    { id: 'introductory-concepts', questions: introductoryConcepts },
    { id: 'consumer-behaviour-demand', questions: consumerBehaviourDemand },
    { id: 'supply', questions: supply },
    { id: 'price-determination', questions: priceDetermination },
    { id: 'market-failure', questions: marketFailure },
    { id: 'government-intervention', questions: governmentIntervention },
    // Unit 2
    { id: 'measures-economic-performance', questions: measuresEconomicPerformance },
    { id: 'aggregate-demand', questions: aggregateDemand },
    { id: 'aggregate-supply', questions: aggregateSupply },
    { id: 'national-income', questions: nationalIncome },
    { id: 'economic-growth', questions: economicGrowth },
    { id: 'macroeconomic-objectives-policies', questions: macroeconomicObjectivesPolicies },
  ];

  // Validate question counts
  console.log('Validating question counts...');
  let totalQuestions = 0;
  for (const s of sections) {
    if (s.questions.length !== 15) {
      console.error(`  ERROR: ${s.id} has ${s.questions.length} questions (expected 15)`);
      process.exit(1);
    }
    totalQuestions += s.questions.length;
  }
  console.log(`  All sections validated: ${sections.length} sections, ${totalQuestions} total new questions\n`);

  // Validate question format
  console.log('Validating question format...');
  for (const s of sections) {
    for (let i = 0; i < s.questions.length; i++) {
      const q = s.questions[i];
      if (!q.question || !q.options || q.correctIndex === undefined || !q.explanation) {
        console.error(`  ERROR: ${s.id} question ${i + 1} missing required fields`);
        process.exit(1);
      }
      if (q.options.length !== 4) {
        console.error(`  ERROR: ${s.id} question ${i + 1} has ${q.options.length} options (expected 4)`);
        process.exit(1);
      }
      if (q.correctIndex < 0 || q.correctIndex > 3) {
        console.error(`  ERROR: ${s.id} question ${i + 1} has invalid correctIndex ${q.correctIndex}`);
        process.exit(1);
      }
    }
  }
  console.log('  All questions valid\n');

  // Run updates
  console.log('Updating Supabase...');
  let successCount = 0;
  let failCount = 0;

  for (const s of sections) {
    const ok = await expandSection(s.id, s.questions);
    if (ok) successCount++;
    else failCount++;
  }

  console.log(`\n=== Done ===`);
  console.log(`  Succeeded: ${successCount}/${sections.length}`);
  if (failCount > 0) {
    console.log(`  Failed: ${failCount}/${sections.length}`);
  }
}

main().catch(console.error);
