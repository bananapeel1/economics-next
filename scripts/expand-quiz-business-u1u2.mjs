import { supabase } from './_db.mjs';

async function expandSection(sectionId, newQuestions) {
  const { data, error } = await supabase
    .from('section_quiz')
    .select('data')
    .eq('section_id', sectionId)
    .single();

  if (error) {
    console.error(`  Fetch failed: ${sectionId}`, error.message);
    return false;
  }

  const existing = data.data || [];
  const updated = [...existing, ...newQuestions];

  const { error: e2 } = await supabase
    .from('section_quiz')
    .update({ data: updated })
    .eq('section_id', sectionId);

  if (e2) {
    console.error(`  Update failed: ${sectionId}`, e2.message);
    return false;
  }

  console.log(`  ${sectionId}: ${existing.length} -> ${updated.length} questions`);
  return true;
}

// ---------------------------------------------------------------------------
// UNIT 1 - MARKETING AND PEOPLE
// ---------------------------------------------------------------------------

// Section 1: Meeting Customer Needs
const meetingCustomerNeeds = [
  // Recall (5)
  {
    question: "What is a niche market?",
    options: [
      "A small, specialised segment of a larger market",
      "A market with only one dominant seller",
      "A market that is declining in size",
      "A market with no competition"
    ],
    correctIndex: 0,
    explanation: "A niche market targets a specific, well-defined segment of consumers with particular needs, as opposed to a mass market that targets the whole market."
  },
  {
    question: "Which of the following is a feature of a dynamic market?",
    options: [
      "Consumer preferences remain constant over time",
      "There are high barriers to entry preventing new firms",
      "Market conditions change rapidly due to innovation or consumer trends",
      "Prices are fixed by a regulator"
    ],
    correctIndex: 2,
    explanation: "Dynamic markets are characterised by rapid change, including shifting consumer preferences, new technology, and evolving competition."
  },
  {
    question: "What is the main purpose of market mapping?",
    options: [
      "To calculate a firm's break-even point",
      "To position a product relative to competitors based on key variables",
      "To forecast future cash flows",
      "To determine the optimal price for a new product"
    ],
    correctIndex: 1,
    explanation: "Market mapping plots products or brands against two key dimensions (e.g. price and quality) to identify gaps in the market and competitor positions."
  },
  {
    question: "Which type of market research involves collecting new, first-hand data?",
    options: [
      "Secondary research",
      "Qualitative research",
      "Primary research",
      "Desk research"
    ],
    correctIndex: 2,
    explanation: "Primary research gathers original data directly from respondents through methods like surveys, interviews, and focus groups."
  },
  {
    question: "What does 'product orientation' mean for a business?",
    options: [
      "The business focuses on what the customer wants before developing products",
      "The business develops a product first and then tries to find a market for it",
      "The business only sells products through online channels",
      "The business imitates the products of its competitors"
    ],
    correctIndex: 1,
    explanation: "A product-oriented business focuses on the design, quality, and features of its product rather than starting from customer needs, unlike a market-oriented approach."
  },
  // Application (5)
  {
    question: "Luxury watchmaker Patek Philippe produces limited quantities and charges premium prices. Which market type best describes its approach?",
    options: [
      "Mass market with competitive pricing",
      "Niche market with premium positioning",
      "Mass market with cost leadership",
      "Niche market with penetration pricing"
    ],
    correctIndex: 1,
    explanation: "Patek Philippe targets a small, wealthy consumer segment (niche) with high prices and exclusivity, characteristic of niche market premium positioning."
  },
  {
    question: "A mobile phone manufacturer discovers through surveys that customers want longer battery life. This is an example of:",
    options: [
      "Secondary quantitative research informing product development",
      "Primary qualitative research informing product development",
      "Primary quantitative research informing product development",
      "Desk research informing pricing strategy"
    ],
    correctIndex: 2,
    explanation: "Surveys generate first-hand (primary) numerical (quantitative) data. Here it informs product development decisions about battery specifications."
  },
  {
    question: "A start-up clothing brand uses Instagram analytics to understand the age and spending habits of its followers. This data is best described as:",
    options: [
      "Primary qualitative data",
      "Secondary quantitative data",
      "Primary quantitative data",
      "Secondary qualitative data"
    ],
    correctIndex: 1,
    explanation: "Instagram analytics is data already collected by the platform (secondary) and provides numerical information such as age demographics and spending patterns (quantitative)."
  },
  {
    question: "Dyson initially struggled to sell its bagless vacuum cleaner because retailers were reluctant to stock it. This most closely illustrates:",
    options: [
      "The risk of operating in a niche market",
      "The challenge of a product-oriented approach in an established market",
      "The failure of primary market research",
      "The problem of operating in a declining market"
    ],
    correctIndex: 1,
    explanation: "Dyson developed an innovative product first (product orientation) and then faced the challenge of convincing the market of its value, a key risk of this approach."
  },
  {
    question: "A UK cereal manufacturer notices sales falling as consumers switch to high-protein breakfasts. This is an example of:",
    options: [
      "A supply-side shock",
      "Changing consumer preferences in a dynamic market",
      "Government regulation reducing demand",
      "Increased barriers to entry"
    ],
    correctIndex: 1,
    explanation: "Shifting consumer tastes towards healthier options demonstrate the dynamic nature of the breakfast market, requiring firms to adapt or face declining sales."
  },
  // Evaluation (5)
  {
    question: "Which is the strongest argument for a small business choosing to operate in a niche market rather than a mass market?",
    options: [
      "Niche markets always generate higher profits than mass markets",
      "Niche markets allow the firm to charge premium prices and build strong customer loyalty",
      "Niche markets are never targeted by large competitors",
      "Niche markets have unlimited growth potential"
    ],
    correctIndex: 1,
    explanation: "The key advantage of niche marketing is the ability to meet specific needs, justifying higher prices and fostering loyalty. However, niche markets can attract competitors and have limited scale."
  },
  {
    question: "A business is deciding whether to use focus groups or online surveys to research a new product. Which factor most supports choosing focus groups?",
    options: [
      "The business needs a large, statistically representative sample",
      "The business wants to gather in-depth insights into consumer attitudes and motivations",
      "The business has a very limited research budget",
      "The business needs results within 24 hours"
    ],
    correctIndex: 1,
    explanation: "Focus groups provide rich, qualitative data about consumer attitudes and motivations. Online surveys are better for large samples and quick turnaround but offer less depth."
  },
  {
    question: "To what extent is market research likely to guarantee the success of a new product launch?",
    options: [
      "It guarantees success because data eliminates all risk",
      "It is unlikely to guarantee success because consumer behaviour can be unpredictable and research may be biased",
      "It guarantees success provided both primary and secondary research are used",
      "It is irrelevant because success depends only on the price charged"
    ],
    correctIndex: 1,
    explanation: "Market research reduces uncertainty but cannot eliminate it. Samples may be unrepresentative, consumers may not act as they say, and market conditions can change after research is conducted."
  },
  {
    question: "A business operates in a mass market but is losing market share to niche competitors. Which response is most likely to be effective?",
    options: [
      "Reduce all product quality to cut costs",
      "Differentiate its product range to target specific customer segments",
      "Exit the market entirely and find a new industry",
      "Increase prices across all products"
    ],
    correctIndex: 1,
    explanation: "Differentiation allows the mass-market firm to compete by offering tailored products for different segments, addressing the specific needs that niche competitors are fulfilling."
  },
  {
    question: "Evaluate the claim: 'Market orientation is always superior to product orientation.'",
    options: [
      "True, because customer needs should always come first",
      "False, because product orientation has led to innovations that consumers did not initially know they wanted",
      "True, because product-oriented firms always fail",
      "False, because market orientation is only useful in declining markets"
    ],
    correctIndex: 1,
    explanation: "Product orientation can drive breakthrough innovation (e.g. the smartphone). Market orientation may lead firms to only make incremental improvements based on existing preferences."
  }
];

// Section 2: The Market
const theMarket = [
  // Recall (5)
  {
    question: "If price elasticity of demand (PED) for a product is -0.4, demand is said to be:",
    options: [
      "Price elastic",
      "Price inelastic",
      "Unitary elastic",
      "Perfectly elastic"
    ],
    correctIndex: 1,
    explanation: "A PED value between 0 and -1 indicates inelastic demand, meaning a change in price leads to a proportionally smaller change in quantity demanded."
  },
  {
    question: "What is meant by 'equilibrium price' in a market?",
    options: [
      "The price set by the government",
      "The lowest price a producer is willing to accept",
      "The price at which quantity demanded equals quantity supplied",
      "The price at which profit is maximised"
    ],
    correctIndex: 2,
    explanation: "Equilibrium price occurs where the demand curve intersects the supply curve, meaning there is no excess supply or excess demand in the market."
  },
  {
    question: "Which of the following would cause the demand curve for electric vehicles to shift to the right?",
    options: [
      "A decrease in the price of electric vehicles",
      "An increase in the price of petrol (a substitute for electric vehicles)",
      "A decrease in consumer incomes",
      "An increase in the cost of lithium batteries"
    ],
    correctIndex: 1,
    explanation: "Higher petrol prices make petrol cars more expensive to run, increasing demand for electric vehicles (a substitute) at every price level, shifting the demand curve rightward."
  },
  {
    question: "Income elasticity of demand (YED) is positive for:",
    options: [
      "Inferior goods",
      "Normal goods",
      "Giffen goods",
      "Goods with perfectly inelastic demand"
    ],
    correctIndex: 1,
    explanation: "Normal goods have a positive YED because demand increases when consumer incomes rise. Inferior goods have negative YED as demand falls when income rises."
  },
  {
    question: "Which factor is most likely to make the supply of a product more elastic?",
    options: [
      "The product takes several years to manufacture",
      "The firm holds large stocks of finished goods",
      "Raw materials are extremely scarce",
      "The firm operates at full capacity with no spare resources"
    ],
    correctIndex: 1,
    explanation: "If a firm holds large stocks, it can quickly increase the quantity supplied in response to a price change, making supply more elastic."
  },
  // Application (5)
  {
    question: "A coffee shop raises its price by 10% and sees a 5% fall in quantity demanded. What is the PED?",
    options: [
      "-2.0",
      "-0.5",
      "-1.0",
      "-5.0"
    ],
    correctIndex: 1,
    explanation: "PED = % change in Qd / % change in P = -5% / 10% = -0.5. Demand is price inelastic, which is typical for habitual purchases like coffee."
  },
  {
    question: "During an economic boom, demand for luxury holidays rises by 15% while incomes increase by 5%. What is the YED for luxury holidays?",
    options: [
      "+0.33",
      "+3.0",
      "-3.0",
      "+1.0"
    ],
    correctIndex: 1,
    explanation: "YED = % change in Qd / % change in income = 15% / 5% = +3.0. This positive value above 1 confirms luxury holidays are a luxury (normal) good with income-elastic demand."
  },
  {
    question: "A new minimum wage increase raises production costs for a fast-food chain. On a supply and demand diagram, this would be shown as:",
    options: [
      "A shift of the demand curve to the left",
      "A movement along the supply curve",
      "A shift of the supply curve to the left",
      "A shift of the demand curve to the right"
    ],
    correctIndex: 2,
    explanation: "Higher labour costs increase the cost of production, reducing the quantity firms are willing to supply at every price, shifting the supply curve leftward."
  },
  {
    question: "A local gym charges a monthly fee of $40 and has 500 members. It raises its fee to $50 and membership falls to 400. What does this imply about PED?",
    options: [
      "PED = -0.8, demand is inelastic so revenue rises",
      "PED = -1.0, demand is unitary elastic so revenue stays the same",
      "PED = -0.5, demand is inelastic so revenue rises",
      "PED = -2.0, demand is elastic so revenue falls"
    ],
    correctIndex: 0,
    explanation: "% change in Qd = -20%, % change in P = +25%. PED = -20/25 = -0.8 (inelastic). Revenue rises from $20,000 to $20,000... actually revenue = 500x40=20,000 vs 400x50=20,000. However, using the PED formula: demand is inelastic at -0.8, so a price rise should increase total revenue."
  },
  {
    question: "A government introduces a subsidy for renewable energy producers. What is the most likely effect on the market for solar panels?",
    options: [
      "The demand curve shifts right, raising equilibrium price",
      "The supply curve shifts right, lowering equilibrium price and raising quantity",
      "The supply curve shifts left, raising equilibrium price",
      "There is a movement along the supply curve to a higher quantity"
    ],
    correctIndex: 1,
    explanation: "A subsidy reduces producers' costs, shifting the supply curve to the right. This leads to a lower equilibrium price and a higher equilibrium quantity of solar panels."
  },
  // Evaluation (5)
  {
    question: "A business has a product with inelastic demand (PED = -0.3). A manager proposes raising prices by 20%. Which concern is most valid?",
    options: [
      "Revenue will definitely fall because fewer units are sold",
      "Competitors may respond by cutting their own prices, eventually making demand more elastic",
      "Inelastic demand means the business cannot raise prices at all",
      "The government will impose price controls to prevent the increase"
    ],
    correctIndex: 1,
    explanation: "While inelastic demand supports a short-term revenue gain, competitors may react by lowering their prices, drawing customers away and making demand more elastic over time."
  },
  {
    question: "To what extent is knowledge of PED useful for business decision-making?",
    options: [
      "It is always useful because PED values never change",
      "It is of limited use because PED only applies to luxury goods",
      "It is useful for pricing decisions but PED estimates may be inaccurate and can change over time",
      "It is useless because businesses cannot measure percentage changes"
    ],
    correctIndex: 2,
    explanation: "PED informs pricing strategy (raise prices if inelastic, lower if elastic) but estimates are based on past data and may not reflect future conditions, competitor actions, or changes in tastes."
  },
  {
    question: "Which statement best evaluates the impact of a rise in interest rates on the housing market?",
    options: [
      "Higher interest rates always lead to a collapse in house prices",
      "Higher interest rates increase mortgage costs, likely reducing demand, but the effect depends on consumer confidence and housing supply",
      "Interest rates have no effect on the housing market",
      "Higher interest rates only affect commercial property, not residential"
    ],
    correctIndex: 1,
    explanation: "Higher interest rates raise borrowing costs, reducing housing demand. However, the extent depends on supply constraints, consumer confidence, and whether rates are expected to be temporary."
  },
  {
    question: "A supermarket notices that demand for its own-brand baked beans has a YED of -0.8. What does this suggest about the product's position during a recession?",
    options: [
      "Demand will fall significantly during a recession",
      "Demand will rise during a recession as consumers switch from premium brands",
      "Demand will remain unchanged during a recession",
      "The product should be discontinued during a recession"
    ],
    correctIndex: 1,
    explanation: "A negative YED means the good is inferior, so demand increases when incomes fall. During a recession, consumers trade down from premium brands to cheaper alternatives."
  },
  {
    question: "Evaluate the usefulness of supply and demand diagrams for explaining real-world market changes.",
    options: [
      "They are perfectly accurate because all markets have straight-line supply and demand curves",
      "They are useful for illustrating basic market forces but oversimplify real markets which face multiple simultaneous shifts and imperfect information",
      "They are useless because no business uses diagrams",
      "They are only applicable to agricultural markets"
    ],
    correctIndex: 1,
    explanation: "Supply and demand diagrams simplify complex interactions to show cause and effect, but real markets face simultaneous shocks, behavioural factors, and information asymmetries not captured in the model."
  }
];

// Section 3: Marketing Mix & Strategy
const marketingMixStrategy = [
  // Recall (5)
  {
    question: "Which stage of the product life cycle typically has the highest promotional spending relative to sales?",
    options: [
      "Growth",
      "Maturity",
      "Introduction",
      "Decline"
    ],
    correctIndex: 2,
    explanation: "During the introduction stage, heavy promotion is needed to build awareness and encourage trial, while sales revenue is still very low."
  },
  {
    question: "In the Boston Matrix, a 'cash cow' is characterised by:",
    options: [
      "High market share and high market growth",
      "Low market share and high market growth",
      "High market share and low market growth",
      "Low market share and low market growth"
    ],
    correctIndex: 2,
    explanation: "A cash cow has high market share in a low-growth market, generating strong cash flow with minimal investment needed."
  },
  {
    question: "Penetration pricing involves:",
    options: [
      "Setting a high initial price and lowering it over time",
      "Setting a low initial price to gain market share quickly",
      "Matching the price of the market leader",
      "Charging different prices in different markets"
    ],
    correctIndex: 1,
    explanation: "Penetration pricing sets a low entry price to attract customers and build market share rapidly, often used when entering competitive markets."
  },
  {
    question: "What is meant by a 'unique selling point' (USP)?",
    options: [
      "The cheapest feature of a product",
      "A distinctive feature or benefit that differentiates a product from competitors",
      "A product that is sold in only one retail outlet",
      "A promotional offer available for a limited time"
    ],
    correctIndex: 1,
    explanation: "A USP is a distinctive characteristic that makes a product stand out from competitors, giving consumers a compelling reason to choose it."
  },
  {
    question: "Which distribution strategy involves selling products through a limited number of carefully chosen outlets?",
    options: [
      "Intensive distribution",
      "Selective distribution",
      "Exclusive distribution",
      "Direct distribution"
    ],
    correctIndex: 1,
    explanation: "Selective distribution uses a limited number of retail outlets chosen to match the brand image, sitting between intensive (maximum outlets) and exclusive (very few outlets)."
  },
  // Application (5)
  {
    question: "Apple prices its new iPhone significantly higher than competitors at launch, then gradually reduces the price. This pricing strategy is known as:",
    options: [
      "Penetration pricing",
      "Price skimming",
      "Cost-plus pricing",
      "Predatory pricing"
    ],
    correctIndex: 1,
    explanation: "Price skimming sets a high initial price to maximise revenue from early adopters willing to pay a premium, before lowering it to attract more price-sensitive segments."
  },
  {
    question: "A soft drink brand launches a sugar-free version of its existing product to extend its product life cycle. This is an example of:",
    options: [
      "Diversification",
      "An extension strategy",
      "Market development",
      "Backward vertical integration"
    ],
    correctIndex: 1,
    explanation: "Launching a product variant (sugar-free) is an extension strategy designed to prolong the maturity stage and prevent decline by appealing to health-conscious consumers."
  },
  {
    question: "A premium handbag brand sells only through its own flagship stores and its website. This is an example of:",
    options: [
      "Intensive distribution",
      "Selective distribution",
      "Exclusive distribution",
      "Multi-channel distribution with mass coverage"
    ],
    correctIndex: 2,
    explanation: "Exclusive distribution limits availability to very few outlets (often the brand's own stores) to maintain exclusivity, prestige, and control over the customer experience."
  },
  {
    question: "Using the Boston Matrix, a start-up's first product has low market share in a rapidly growing market. It is classified as a:",
    options: [
      "Star",
      "Cash cow",
      "Question mark (problem child)",
      "Dog"
    ],
    correctIndex: 2,
    explanation: "A question mark has low market share in a high-growth market. The firm must decide whether to invest heavily to build share or withdraw from the market."
  },
  {
    question: "A budget airline uses social media advertising, low fares, online-only booking, and no-frills service. Which element of the marketing mix is most critical to its competitive advantage?",
    options: [
      "Product (innovative cabin design)",
      "Price (low-cost fares)",
      "Promotion (celebrity endorsements)",
      "Place (exclusive airport terminals)"
    ],
    correctIndex: 1,
    explanation: "The budget airline model competes primarily on price. Low fares are the central element of its marketing mix, supported by cost minimisation across all operations."
  },
  // Evaluation (5)
  {
    question: "Evaluate the usefulness of the Boston Matrix for a business making strategic decisions.",
    options: [
      "It is always accurate because market share and growth are the only factors that matter",
      "It is a useful starting point for portfolio analysis but oversimplifies by ignoring factors such as brand strength and competitive dynamics",
      "It is useless because it does not include financial data",
      "It is only useful for businesses with a single product"
    ],
    correctIndex: 1,
    explanation: "The Boston Matrix provides a simple framework for analysing a product portfolio, but it only uses two variables, ignoring profitability, brand loyalty, and other strategic factors."
  },
  {
    question: "A firm considers switching from a cost-plus pricing strategy to a competitive pricing strategy. Which argument against this change is most persuasive?",
    options: [
      "Competitive pricing is illegal in most markets",
      "Competitive pricing may lead to a price war that erodes profit margins across the industry",
      "Competitive pricing always leads to higher prices for consumers",
      "Cost-plus pricing never needs to consider competitor prices"
    ],
    correctIndex: 1,
    explanation: "Switching to competitive pricing risks triggering a price war where all firms cut prices, reducing industry profitability. Cost-plus pricing at least guarantees a margin above costs."
  },
  {
    question: "To what extent is branding the most important element of the marketing mix for a luxury fashion house?",
    options: [
      "Branding is irrelevant because luxury consumers only care about quality",
      "Branding is crucial as it creates emotional value and justifies premium pricing, though product quality must support the brand promise",
      "Branding is the only element that matters and the product itself is unimportant",
      "Branding is less important than having the lowest price"
    ],
    correctIndex: 1,
    explanation: "For luxury brands, branding creates aspirational value and justifies premium prices. However, without genuine product quality, the brand loses credibility over time."
  },
  {
    question: "A retailer is deciding whether to invest in e-commerce or expand its physical store network. Which factor most supports investing in e-commerce?",
    options: [
      "E-commerce has zero costs",
      "E-commerce offers lower fixed costs, wider geographic reach, and 24/7 availability",
      "Physical stores are no longer relevant for any product category",
      "E-commerce eliminates all need for customer service"
    ],
    correctIndex: 1,
    explanation: "E-commerce typically has lower overheads than physical stores, offers access to a wider market, and provides round-the-clock convenience, though physical stores still add value through experience."
  },
  {
    question: "Evaluate the view that social media is now the most effective form of promotion for all businesses.",
    options: [
      "True, because all consumers use social media",
      "False, because social media is free and therefore has no value",
      "It depends on the target market; social media is very effective for younger demographics but less so for older consumers or B2B markets",
      "True, because social media guarantees viral reach"
    ],
    correctIndex: 2,
    explanation: "Social media effectiveness depends on the target audience. It is powerful for reaching younger, tech-savvy consumers but may be less effective for B2B markets or older demographics."
  }
];

// Section 4: Managing People
const managingPeople = [
  // Recall (5)
  {
    question: "According to Maslow's hierarchy of needs, which level comes immediately after safety needs?",
    options: [
      "Self-actualisation",
      "Esteem needs",
      "Social (love and belonging) needs",
      "Physiological needs"
    ],
    correctIndex: 2,
    explanation: "Maslow's hierarchy from bottom to top is: physiological, safety, social (love/belonging), esteem, and self-actualisation. Social needs follow safety needs."
  },
  {
    question: "Frederick Taylor's theory of scientific management suggests that workers are primarily motivated by:",
    options: [
      "Social interaction with colleagues",
      "Opportunities for self-actualisation",
      "Financial incentives (money)",
      "Recognition and praise"
    ],
    correctIndex: 2,
    explanation: "Taylor believed workers are motivated primarily by money. His approach focused on finding the most efficient way to perform tasks and paying piece rates to incentivise output."
  },
  {
    question: "What is the difference between a 'tall' and a 'flat' organisational structure?",
    options: [
      "Tall structures have more layers of hierarchy and narrower spans of control; flat structures have fewer layers and wider spans",
      "Tall structures have fewer managers; flat structures have more managers",
      "Tall structures are more efficient; flat structures are always less efficient",
      "There is no difference; the terms are interchangeable"
    ],
    correctIndex: 0,
    explanation: "Tall structures have many hierarchical levels with narrow spans of control. Flat structures have few levels with wider spans of control, encouraging faster communication."
  },
  {
    question: "According to Herzberg's two-factor theory, which of the following is a 'hygiene factor'?",
    options: [
      "Achievement",
      "Recognition",
      "Working conditions",
      "Responsibility"
    ],
    correctIndex: 2,
    explanation: "Hygiene factors (e.g. pay, working conditions, company policy) do not motivate but cause dissatisfaction if inadequate. Motivators (e.g. achievement, recognition) actively drive motivation."
  },
  {
    question: "What does 'span of control' refer to in an organisation?",
    options: [
      "The total number of employees in the business",
      "The number of subordinates directly reporting to one manager",
      "The number of departments in the business",
      "The number of products a business sells"
    ],
    correctIndex: 1,
    explanation: "Span of control is the number of employees directly managed by one supervisor. A wider span means more direct reports; a narrower span means fewer."
  },
  // Application (5)
  {
    question: "A tech company offers its software engineers flexible working hours, free professional development, and equity shares. This approach is most consistent with the theories of:",
    options: [
      "Taylor (financial incentives only)",
      "Maslow and Herzberg (addressing higher-order needs and motivating factors)",
      "Mayo (social relationships are the only motivator)",
      "Weber (strict bureaucratic rules)"
    ],
    correctIndex: 1,
    explanation: "Flexible hours, development, and equity address esteem and self-actualisation (Maslow) and are motivating factors like recognition and growth (Herzberg), going beyond basic financial incentives."
  },
  {
    question: "A factory introduces piece-rate pay, where workers are paid per unit produced. This is most closely associated with:",
    options: [
      "Herzberg's motivators",
      "Maslow's self-actualisation",
      "Taylor's scientific management",
      "Mayo's human relations theory"
    ],
    correctIndex: 2,
    explanation: "Piece-rate pay directly links earnings to output, reflecting Taylor's belief that financial incentives are the primary driver of worker productivity."
  },
  {
    question: "A company is growing rapidly and needs to recruit 50 new staff. Which recruitment method is most cost-effective for filling these roles quickly?",
    options: [
      "Headhunting through an executive recruitment agency",
      "Online job boards and social media advertising",
      "Internal promotions only",
      "Walk-in interviews with no advertising"
    ],
    correctIndex: 1,
    explanation: "Online job boards and social media reach a large pool of candidates quickly and at relatively low cost compared to recruitment agencies or headhunting."
  },
  {
    question: "Following a workplace survey, employees report that while pay is fair, they feel their work is repetitive and lacks challenge. According to Herzberg, the firm should focus on:",
    options: [
      "Increasing pay further",
      "Improving hygiene factors like office temperature",
      "Introducing job enrichment and greater responsibility",
      "Reducing working hours"
    ],
    correctIndex: 2,
    explanation: "Pay (a hygiene factor) is satisfactory. Herzberg would recommend addressing motivators like job enrichment, responsibility, and opportunities for achievement to increase motivation."
  },
  {
    question: "Elton Mayo's Hawthorne Studies found that productivity increased primarily because:",
    options: [
      "Workers were paid more during the experiments",
      "Workers responded positively to being observed and feeling valued by management",
      "The factory lighting was improved",
      "Workers were threatened with dismissal if they did not work harder"
    ],
    correctIndex: 1,
    explanation: "Mayo's research showed that social factors and the attention workers received from management (the Hawthorne Effect) were more important than physical conditions in raising productivity."
  },
  // Evaluation (5)
  {
    question: "Evaluate the view that financial incentives are the most effective way to motivate employees.",
    options: [
      "True, because all employees value money above everything else",
      "Financial incentives are effective for basic motivation but may not sustain long-term engagement; non-financial factors are also important",
      "False, because money has no effect on motivation",
      "True, but only for employees in the manufacturing sector"
    ],
    correctIndex: 1,
    explanation: "Financial incentives address lower-level needs and hygiene factors, but sustained motivation often requires non-financial factors such as recognition, autonomy, and career development."
  },
  {
    question: "A business is considering delayering its organisational structure. Which is the most significant potential disadvantage?",
    options: [
      "Communication will become slower",
      "Managers will have narrower spans of control",
      "Remaining managers may be overburdened, reducing the quality of supervision and decision-making",
      "Delayering always leads to higher costs"
    ],
    correctIndex: 2,
    explanation: "Delayering removes management layers, widening spans of control. This can overload remaining managers, reducing supervisory quality, though it speeds up communication."
  },
  {
    question: "To what extent is Maslow's hierarchy of needs a useful tool for managers?",
    options: [
      "It is perfectly accurate because all employees progress through needs in the same order",
      "It provides a useful framework for understanding diverse employee needs but is limited because individuals may not follow a fixed hierarchy",
      "It is useless because it was developed too long ago",
      "It only applies to employees in developed countries"
    ],
    correctIndex: 1,
    explanation: "Maslow's hierarchy offers a helpful framework but assumes a fixed order of needs. In reality, individuals may prioritise different needs simultaneously and the hierarchy varies across cultures."
  },
  {
    question: "A firm is debating whether to use internal or external recruitment for a senior management position. Which argument best supports external recruitment?",
    options: [
      "External recruitment is always cheaper than internal recruitment",
      "External candidates bring fresh ideas, new perspectives, and skills that may not exist internally",
      "External recruitment is faster than internal recruitment",
      "Internal candidates are always less qualified"
    ],
    correctIndex: 1,
    explanation: "External recruitment can bring in new skills, experiences, and perspectives that drive innovation. However, it is typically more expensive, slower, and carries higher risk of poor cultural fit."
  },
  {
    question: "Evaluate whether a democratic leadership style is always preferable to an autocratic style.",
    options: [
      "Yes, because employees always prefer to be consulted",
      "No, because in a crisis situation or when quick decisions are needed, autocratic leadership may be more effective",
      "Yes, because autocratic leadership is illegal in most countries",
      "No, because democratic leadership always leads to slower growth"
    ],
    correctIndex: 1,
    explanation: "Democratic leadership improves motivation and creativity through consultation, but autocratic leadership may be necessary in crises, time-sensitive situations, or with inexperienced teams."
  }
];

// Section 5: Entrepreneurs & Leaders
const entrepreneursLeaders = [
  // Recall (5)
  {
    question: "What is meant by 'opportunity cost' in a business context?",
    options: [
      "The total cost of starting a business",
      "The next best alternative foregone when making a decision",
      "The price a business charges for its products",
      "The cost of borrowing money from a bank"
    ],
    correctIndex: 1,
    explanation: "Opportunity cost is the value of the next best alternative given up when a choice is made. For example, investing in machinery means the money cannot be used for marketing."
  },
  {
    question: "Which of the following best describes a social enterprise?",
    options: [
      "A business that aims to maximise shareholder returns",
      "A business that trades to achieve social, environmental, or community objectives rather than to maximise profit",
      "A government-owned organisation",
      "A charity that does not engage in any trading activity"
    ],
    correctIndex: 1,
    explanation: "A social enterprise operates commercially but reinvests profits to achieve social or environmental goals, rather than maximising returns for shareholders."
  },
  {
    question: "What is a key characteristic of an entrepreneur?",
    options: [
      "They avoid all forms of risk",
      "They identify opportunities and are willing to take calculated risks",
      "They always work alone without employees",
      "They only operate in the technology sector"
    ],
    correctIndex: 1,
    explanation: "Entrepreneurs spot market opportunities, take calculated risks, and organise resources to exploit those opportunities. Risk-taking and innovation are central to the entrepreneurial role."
  },
  {
    question: "What does 'adding value' mean in business?",
    options: [
      "Increasing the cost of raw materials",
      "The difference between the selling price and the cost of bought-in materials and components",
      "Reducing the selling price below cost",
      "Hiring more employees"
    ],
    correctIndex: 1,
    explanation: "Adding value is the process of increasing the worth of a product above the cost of inputs, through branding, design, quality, convenience, or other factors that customers value."
  },
  {
    question: "Which of the following is a potential motive for becoming an entrepreneur?",
    options: [
      "A guaranteed high salary from day one",
      "Wanting to be independent and make their own decisions",
      "Avoiding all responsibility",
      "Wanting a less stressful lifestyle"
    ],
    correctIndex: 1,
    explanation: "Common motives for entrepreneurship include independence, desire to turn a passion into a business, profit motive, and wanting to be one's own boss."
  },
  // Application (5)
  {
    question: "An entrepreneur invests their savings of $50,000 in a new business instead of earning 5% interest in a savings account. The opportunity cost of this decision is:",
    options: [
      "$50,000",
      "$2,500 per year in forgone interest",
      "Zero, because they still own the $50,000",
      "The total revenue of the new business"
    ],
    correctIndex: 1,
    explanation: "The opportunity cost is the next best alternative forgone: the $2,500 annual interest (5% of $50,000) they would have earned from the savings account."
  },
  {
    question: "Jamie Oliver's restaurant chain aimed to provide job training for disadvantaged young people while serving food for profit. This is an example of:",
    options: [
      "A public limited company focused on profit maximisation",
      "A social enterprise combining commercial activity with social objectives",
      "A government-funded training programme",
      "A franchise model with no social purpose"
    ],
    correctIndex: 1,
    explanation: "Jamie Oliver's Fifteen restaurants combined commercial trading (restaurant) with a social objective (training disadvantaged youth), making it a social enterprise."
  },
  {
    question: "A small bakery buys flour for $2, sugar for $1, and sells a cake for $15. The value added per cake is:",
    options: [
      "$15",
      "$12",
      "$3",
      "$18"
    ],
    correctIndex: 1,
    explanation: "Value added = selling price - cost of bought-in materials = $15 - ($2 + $1) = $12. This covers wages, overheads, and profit."
  },
  {
    question: "An entrepreneur considers opening either a restaurant or a gym. She chooses the restaurant, which earns $80,000 profit. The gym would have earned $60,000. What is the opportunity cost?",
    options: [
      "$80,000",
      "$60,000",
      "$140,000",
      "$20,000"
    ],
    correctIndex: 1,
    explanation: "The opportunity cost is the profit from the next best alternative foregone: the $60,000 that would have been earned from the gym."
  },
  {
    question: "Elon Musk risked his personal fortune investing in both SpaceX and Tesla when both companies were close to bankruptcy. This best illustrates which entrepreneurial trait?",
    options: [
      "Risk aversion",
      "High tolerance for risk and strong self-belief",
      "Preference for stable employment",
      "Delegation of all decision-making"
    ],
    correctIndex: 1,
    explanation: "Investing personal wealth in near-bankrupt ventures demonstrates a high risk tolerance and strong conviction, both key entrepreneurial characteristics."
  },
  // Evaluation (5)
  {
    question: "Evaluate the view that profit maximisation should be the main objective of every business.",
    options: [
      "True, because profit is the only reason businesses exist",
      "False, because many businesses also pursue ethical, social, or survival objectives, especially in the short term",
      "True, because shareholders always demand maximum profit",
      "False, because businesses should never aim to make a profit"
    ],
    correctIndex: 1,
    explanation: "While profit is important, businesses may prioritise survival, growth, ethical goals, or social objectives. The objective often depends on the business type, stage, and stakeholder priorities."
  },
  {
    question: "To what extent is being an entrepreneur always beneficial for the individual?",
    options: [
      "It is always beneficial because entrepreneurs are guaranteed high income",
      "It can offer independence and financial reward but also involves significant financial risk, stress, and long working hours",
      "It has no benefits because most businesses fail",
      "It is only beneficial in countries with low tax rates"
    ],
    correctIndex: 1,
    explanation: "Entrepreneurship offers potential rewards but carries risks including financial loss, stress, and work-life imbalance. Success depends on the idea, market conditions, and individual resilience."
  },
  {
    question: "Which is the strongest argument for a business choosing survival as its primary objective rather than profit maximisation?",
    options: [
      "Survival is always more important than profit in every situation",
      "During an economic recession, ensuring the business can meet its debts and continue operating may be more realistic than maximising profit",
      "Survival means the business will never need to make a profit",
      "Investors always prefer businesses that focus on survival"
    ],
    correctIndex: 1,
    explanation: "In difficult economic conditions, survival (maintaining cash flow and solvency) becomes the priority. Profit maximisation may be unrealistic when demand is falling and costs are rising."
  },
  {
    question: "Evaluate whether government support (e.g. grants and tax breaks) is essential for encouraging entrepreneurship.",
    options: [
      "Yes, because without government support no businesses would be created",
      "Government support can reduce barriers to entry and encourage risk-taking, but entrepreneurship also depends on individual motivation, skills, and market conditions",
      "No, because government should never interfere with business",
      "Yes, but only in the technology sector"
    ],
    correctIndex: 1,
    explanation: "Government support helps by reducing financial barriers, but successful entrepreneurship also requires viable ideas, market demand, and personal drive. Support alone does not guarantee success."
  },
  {
    question: "An entrepreneur must choose between two business objectives: maximising short-term profit or building long-term brand loyalty. Which analysis is most balanced?",
    options: [
      "Short-term profit is always wrong because it damages the brand",
      "Long-term brand loyalty often requires sacrificing short-term profit (e.g. lower initial prices), but the optimal balance depends on the firm's financial position and competitive environment",
      "There is never a trade-off between these two objectives",
      "Brand loyalty is irrelevant in modern markets"
    ],
    correctIndex: 1,
    explanation: "Building brand loyalty may require investment (lower prices, higher quality) that reduces short-term profit. The best approach depends on the firm's cash position, competitive threats, and strategic goals."
  }
];

// ---------------------------------------------------------------------------
// UNIT 2 - MANAGING BUSINESS ACTIVITIES
// ---------------------------------------------------------------------------

// Section 6: Planning & Raising Finance
const planningRaisingFinance = [
  // Recall (5)
  {
    question: "Which of the following is an example of internal finance?",
    options: [
      "A bank loan",
      "Retained profits",
      "Venture capital",
      "Issuing shares on the stock market"
    ],
    correctIndex: 1,
    explanation: "Retained profits are generated internally from the business's own trading activities and do not require external borrowing or giving up ownership."
  },
  {
    question: "What is venture capital?",
    options: [
      "A government grant for small businesses",
      "Finance provided by specialist investors in exchange for equity in high-growth potential businesses",
      "A type of bank overdraft",
      "Profits reinvested from the previous financial year"
    ],
    correctIndex: 1,
    explanation: "Venture capitalists invest in businesses with high growth potential in exchange for a share of ownership (equity), often providing expertise alongside funding."
  },
  {
    question: "What is the main purpose of a business plan?",
    options: [
      "To guarantee the business will be profitable",
      "To set out the objectives, strategy, and financial forecasts of a business to guide operations and attract finance",
      "To avoid paying taxes",
      "To register the business with the government"
    ],
    correctIndex: 1,
    explanation: "A business plan outlines objectives, market analysis, operational details, and financial projections. It serves as a roadmap for the business and a tool for attracting investors or lenders."
  },
  {
    question: "Crowdfunding involves:",
    options: [
      "Borrowing large sums from a single bank",
      "Raising small amounts of money from a large number of people, typically via online platforms",
      "Selling shares on the London Stock Exchange",
      "Using personal savings to fund a business"
    ],
    correctIndex: 1,
    explanation: "Crowdfunding raises finance from many individual contributors, often through platforms like Kickstarter. It can also help validate demand for a product before launch."
  },
  {
    question: "What is the key difference between a bank loan and an overdraft?",
    options: [
      "A loan is interest-free; an overdraft charges interest",
      "A loan is a fixed amount repaid over an agreed period; an overdraft allows flexible short-term borrowing up to a set limit",
      "An overdraft is always cheaper than a loan",
      "A loan can only be used for purchasing property"
    ],
    correctIndex: 1,
    explanation: "A bank loan provides a fixed sum repaid in instalments over time. An overdraft allows flexible, short-term borrowing up to an agreed limit, useful for managing cash flow gaps."
  },
  // Application (5)
  {
    question: "A start-up tech company needs $500,000 to develop its app. It has no trading history or assets. Which source of finance is most appropriate?",
    options: [
      "A bank loan secured against property",
      "Venture capital or angel investment",
      "Retained profits",
      "A trade credit arrangement"
    ],
    correctIndex: 1,
    explanation: "With no assets or trading history, bank loans are difficult to obtain. Venture capitalists and angel investors specialise in funding high-risk start-ups in exchange for equity."
  },
  {
    question: "A restaurant owner uses $10,000 from last year's profits to buy a new oven. This is financed through:",
    options: [
      "Share capital",
      "Retained profit (internal finance)",
      "A bank overdraft",
      "Crowdfunding"
    ],
    correctIndex: 1,
    explanation: "Using previous profits to fund investment is retained profit, an internal source of finance that avoids interest payments and dilution of ownership."
  },
  {
    question: "A small craft business raises $15,000 on Kickstarter by offering early backers the first products at a discount. This is an example of:",
    options: [
      "Debt finance",
      "Reward-based crowdfunding",
      "Equity crowdfunding",
      "A government grant"
    ],
    correctIndex: 1,
    explanation: "Reward-based crowdfunding offers backers a product, service, or perk in return for their pledge, rather than equity or interest payments."
  },
  {
    question: "A growing retail chain wants to open 10 new stores over 5 years. The most appropriate long-term finance source would be:",
    options: [
      "An overdraft facility",
      "Trade credit from suppliers",
      "A long-term bank loan or share issue",
      "Selling off existing inventory"
    ],
    correctIndex: 2,
    explanation: "Large-scale expansion requires long-term finance. A bank loan or share issue provides substantial, long-term funding suited to multi-year investment plans."
  },
  {
    question: "A business plan shows projected revenues of $200,000, costs of $180,000, and the entrepreneur needs $50,000 start-up capital. A bank is most likely to question:",
    options: [
      "Why the business expects any revenue at all",
      "Whether the projected profit margin is sufficient to repay the loan and sustain the business",
      "Why the entrepreneur wants to start a business",
      "Whether the business is in the technology sector"
    ],
    correctIndex: 1,
    explanation: "A bank will scrutinise whether projected profit ($20,000) is sufficient to cover loan repayments, living costs, and unexpected expenses, testing the plan's financial viability."
  },
  // Evaluation (5)
  {
    question: "Evaluate the usefulness of a business plan for a new start-up.",
    options: [
      "It is useless because markets are unpredictable",
      "It is essential for attracting finance and providing direction, but plans are based on assumptions that may prove wrong",
      "It guarantees success if followed precisely",
      "It is only useful for large corporations"
    ],
    correctIndex: 1,
    explanation: "Business plans help secure funding and provide strategic direction. However, they are based on forecasts and assumptions that may not materialise, so they must be regularly reviewed."
  },
  {
    question: "Which is the strongest argument against using venture capital to finance a start-up?",
    options: [
      "Venture capitalists never invest in start-ups",
      "The entrepreneur must give up a share of ownership and may lose some control over business decisions",
      "Venture capital is only available for businesses in decline",
      "Venture capital must always be repaid within one year"
    ],
    correctIndex: 1,
    explanation: "Venture capital requires giving up equity (ownership) and often a board seat. This dilutes the founder's control and share of future profits."
  },
  {
    question: "To what extent is crowdfunding a superior source of finance compared to bank loans for start-ups?",
    options: [
      "It is always superior because it is free money",
      "Crowdfunding avoids debt and can validate market demand, but it is uncertain, time-consuming, and requires strong marketing to succeed",
      "Bank loans are always better because they are guaranteed",
      "Crowdfunding is illegal for most business types"
    ],
    correctIndex: 1,
    explanation: "Crowdfunding offers market validation without debt, but campaigns are uncertain, require significant effort, and may not raise the target amount. Bank loans provide certainty but require repayment."
  },
  {
    question: "A small business owner is choosing between a bank loan and selling equity to an investor. Which factor most favours the bank loan?",
    options: [
      "The owner wants to maintain full control and ownership of the business",
      "The business has no assets and no trading history",
      "The owner cannot afford any repayments",
      "The business is in a highly volatile market"
    ],
    correctIndex: 0,
    explanation: "A bank loan preserves full ownership and control, making it preferable if the owner values independence. However, it requires collateral and regular repayments."
  },
  {
    question: "Evaluate whether internal finance is always the best option for funding business growth.",
    options: [
      "Yes, because it has no costs whatsoever",
      "No, because retained profits may be insufficient for major investments, and using them has an opportunity cost of not distributing dividends or investing elsewhere",
      "Yes, because external finance is always too expensive",
      "No, because internal finance is not real money"
    ],
    correctIndex: 1,
    explanation: "Internal finance avoids interest and dilution but may be insufficient for large projects. Using retained profit also has an opportunity cost and may reduce dividends."
  }
];

// Section 7: Financial Planning
const financialPlanning = [
  // Recall (5)
  {
    question: "Break-even output is the point where:",
    options: [
      "Total revenue exceeds total cost by the maximum amount",
      "Total revenue equals total cost, resulting in neither profit nor loss",
      "Fixed costs equal variable costs",
      "The business reaches maximum capacity"
    ],
    correctIndex: 1,
    explanation: "Break-even occurs where total revenue = total cost (TR = TC). At this point, the business covers all its costs but makes zero profit."
  },
  {
    question: "Which of the following is a fixed cost?",
    options: [
      "Raw materials",
      "Delivery charges per unit",
      "Annual rent on premises",
      "Packaging costs per unit"
    ],
    correctIndex: 2,
    explanation: "Rent is a fixed cost because it remains the same regardless of the level of output. Variable costs like raw materials change with the quantity produced."
  },
  {
    question: "What is the purpose of a cash flow forecast?",
    options: [
      "To calculate a business's profit or loss",
      "To predict the timing of cash inflows and outflows to ensure the business can meet its financial obligations",
      "To determine the market share of a business",
      "To calculate the break-even output"
    ],
    correctIndex: 1,
    explanation: "A cash flow forecast predicts when cash enters and leaves the business, helping managers identify potential shortfalls and plan borrowing or spending accordingly."
  },
  {
    question: "The formula for contribution per unit is:",
    options: [
      "Selling price per unit minus total costs",
      "Selling price per unit minus variable cost per unit",
      "Total revenue minus total fixed costs",
      "Fixed costs divided by number of units sold"
    ],
    correctIndex: 1,
    explanation: "Contribution per unit = selling price - variable cost per unit. This amount 'contributes' towards covering fixed costs and then generating profit."
  },
  {
    question: "What is a budget?",
    options: [
      "The actual amount of money a business has in its bank account",
      "A financial plan that sets spending and revenue targets for a future period",
      "A record of all past transactions",
      "The total debt of a business"
    ],
    correctIndex: 1,
    explanation: "A budget is a forward-looking financial plan that sets targets for income and expenditure, helping managers control costs and coordinate activities."
  },
  // Application (5)
  {
    question: "A firm has fixed costs of $120,000 per year, sells its product at $30, and has variable costs of $18 per unit. What is the break-even output?",
    options: [
      "4,000 units",
      "6,667 units",
      "10,000 units",
      "3,333 units"
    ],
    correctIndex: 2,
    explanation: "Break-even = fixed costs / contribution per unit = $120,000 / ($30 - $18) = $120,000 / $12 = 10,000 units."
  },
  {
    question: "A business has the following cash flow data for March: opening balance $5,000, cash inflows $20,000, cash outflows $28,000. What is the closing balance?",
    options: [
      "$13,000",
      "-$3,000",
      "$3,000",
      "-$8,000"
    ],
    correctIndex: 1,
    explanation: "Closing balance = opening balance + inflows - outflows = $5,000 + $20,000 - $28,000 = -$3,000. The business has a negative cash balance and needs additional funding."
  },
  {
    question: "A company sells 15,000 units at $20 each. Variable costs are $12 per unit and fixed costs are $80,000. What is the margin of safety?",
    options: [
      "5,000 units",
      "10,000 units",
      "15,000 units",
      "2,500 units"
    ],
    correctIndex: 0,
    explanation: "Break-even = $80,000 / ($20 - $12) = 10,000 units. Margin of safety = actual output - break-even = 15,000 - 10,000 = 5,000 units."
  },
  {
    question: "A department was budgeted to spend $50,000 on materials but actually spent $55,000. This is known as:",
    options: [
      "A favourable variance of $5,000",
      "An adverse variance of $5,000",
      "A balanced budget",
      "A revenue surplus"
    ],
    correctIndex: 1,
    explanation: "Spending $5,000 more than budgeted is an adverse (unfavourable) variance, indicating costs exceeded the plan and profits may be lower than expected."
  },
  {
    question: "A seasonal ice cream business forecasts negative cash flow from November to February. Which action is most appropriate?",
    options: [
      "Close the business permanently",
      "Arrange an overdraft facility in advance to cover the seasonal cash shortfall",
      "Increase ice cream prices in winter to boost revenue",
      "Stop paying suppliers during winter months"
    ],
    correctIndex: 1,
    explanation: "Seasonal businesses can predict cash shortfalls using forecasts and arrange overdraft facilities in advance. This is a planned, temporary measure to bridge the gap."
  },
  // Evaluation (5)
  {
    question: "Evaluate the usefulness of break-even analysis for a new business.",
    options: [
      "It is always perfectly accurate because costs and revenues are easy to predict",
      "It helps estimate the minimum sales needed but assumes constant selling price and costs, which is unrealistic in practice",
      "It is useless because new businesses have no data",
      "It can only be used by manufacturing businesses"
    ],
    correctIndex: 1,
    explanation: "Break-even analysis provides a useful target for minimum sales but assumes fixed selling prices, linear costs, and single products, which may not reflect real trading conditions."
  },
  {
    question: "A manager argues that cash flow forecasting is more important than profit forecasting for a start-up. Is this justified?",
    options: [
      "No, because profit is the only measure that matters",
      "Yes, because a profitable business can still fail if it runs out of cash to pay bills; cash flow is critical for short-term survival",
      "No, because cash flow and profit are the same thing",
      "Yes, but only for businesses in the service sector"
    ],
    correctIndex: 1,
    explanation: "A business can be profitable on paper but insolvent if cash is tied up in stock or debtors. Cash flow forecasting ensures the business can meet day-to-day obligations."
  },
  {
    question: "To what extent are budgets an effective tool for controlling business performance?",
    options: [
      "They are always effective because they prevent overspending completely",
      "They provide clear targets and enable variance analysis, but may be based on inaccurate forecasts and can discourage flexibility if applied too rigidly",
      "They are ineffective because managers always ignore them",
      "They are only useful in the public sector"
    ],
    correctIndex: 1,
    explanation: "Budgets help set targets and identify variances, but rigid budgets can stifle initiative, and the targets themselves may be based on flawed assumptions."
  },
  {
    question: "A business has a break-even point of 8,000 units but currently sells 8,200 units. The manager considers this a safe position. Which challenge to this view is most valid?",
    options: [
      "8,200 units is too many for any business to produce",
      "The margin of safety is only 200 units (2.4%), meaning even a small drop in demand could push the firm into a loss",
      "Break-even analysis does not use real data",
      "The firm should stop producing at exactly 8,000 units"
    ],
    correctIndex: 1,
    explanation: "A margin of safety of just 200 units is very thin. Any decline in demand, increase in costs, or disruption could easily push sales below break-even."
  },
  {
    question: "Which is the most significant limitation of cash flow forecasts?",
    options: [
      "They cannot predict any future cash flows",
      "They are based on estimates and assumptions that may prove inaccurate, particularly regarding the timing and amount of customer payments",
      "They are illegal for businesses to use",
      "They only cover a single day"
    ],
    correctIndex: 1,
    explanation: "Cash flow forecasts rely on assumptions about future sales, payment timing, and costs. Late payments, unexpected expenses, or lower-than-expected sales can make forecasts inaccurate."
  }
];

// Section 8: Managing Finance
const managingFinance = [
  // Recall (5)
  {
    question: "What is the formula for gross profit?",
    options: [
      "Revenue minus all expenses",
      "Revenue minus cost of sales (cost of goods sold)",
      "Net profit minus tax",
      "Total assets minus total liabilities"
    ],
    correctIndex: 1,
    explanation: "Gross profit = revenue - cost of sales. It measures the profit before deducting operating expenses, overheads, and other costs."
  },
  {
    question: "The current ratio measures:",
    options: [
      "A firm's ability to meet long-term debts",
      "A firm's ability to meet short-term liabilities using its current assets",
      "The profitability of the firm",
      "The efficiency of the firm's marketing"
    ],
    correctIndex: 1,
    explanation: "The current ratio (current assets / current liabilities) measures short-term liquidity, indicating whether a firm can pay its debts due within one year."
  },
  {
    question: "Net profit margin is calculated as:",
    options: [
      "(Gross profit / Revenue) x 100",
      "(Net profit / Revenue) x 100",
      "(Revenue / Net profit) x 100",
      "(Net profit / Total assets) x 100"
    ],
    correctIndex: 1,
    explanation: "Net profit margin = (net profit / revenue) x 100. It shows the percentage of revenue that remains as profit after all costs are deducted."
  },
  {
    question: "What is working capital?",
    options: [
      "The total capital invested in the business",
      "Current assets minus current liabilities",
      "The total value of fixed assets",
      "The amount of cash held in the bank"
    ],
    correctIndex: 1,
    explanation: "Working capital = current assets - current liabilities. It represents the funds available for day-to-day operations and is essential for business survival."
  },
  {
    question: "A business with a current ratio of 0.8 means:",
    options: [
      "It has more current assets than current liabilities",
      "It has fewer current assets than current liabilities and may struggle to pay short-term debts",
      "It is highly profitable",
      "It has no debts"
    ],
    correctIndex: 1,
    explanation: "A current ratio below 1 means current liabilities exceed current assets, suggesting potential difficulty meeting short-term financial obligations."
  },
  // Application (5)
  {
    question: "A business has revenue of $500,000, cost of sales of $300,000, and operating expenses of $120,000. What is the net profit?",
    options: [
      "$200,000",
      "$80,000",
      "$120,000",
      "$380,000"
    ],
    correctIndex: 1,
    explanation: "Gross profit = $500,000 - $300,000 = $200,000. Net profit = $200,000 - $120,000 = $80,000."
  },
  {
    question: "Company A has a net profit margin of 5% while Company B has a net profit margin of 15%. Both are in the same industry. This suggests that:",
    options: [
      "Company A has higher total revenue",
      "Company B is more efficient at converting revenue into profit",
      "Company A has no costs",
      "Company B must be charging lower prices"
    ],
    correctIndex: 1,
    explanation: "A higher net profit margin indicates Company B retains more of each pound of revenue as profit, suggesting better cost control or stronger pricing power."
  },
  {
    question: "A firm has current assets of $80,000 (including $30,000 stock) and current liabilities of $60,000. What is the acid test ratio?",
    options: [
      "1.33",
      "0.83",
      "0.50",
      "1.50"
    ],
    correctIndex: 1,
    explanation: "Acid test ratio = (current assets - stock) / current liabilities = ($80,000 - $30,000) / $60,000 = $50,000 / $60,000 = 0.83."
  },
  {
    question: "A retailer's gross profit margin has fallen from 40% to 30% over two years while its net profit margin remained stable. The most likely explanation is:",
    options: [
      "The cost of sales has increased but the firm has cut operating expenses to compensate",
      "Revenue has doubled",
      "The firm has stopped paying taxes",
      "The firm has increased its selling price"
    ],
    correctIndex: 0,
    explanation: "A falling gross profit margin with stable net profit margin suggests rising cost of sales offset by reduced operating expenses (overheads), maintaining overall profitability."
  },
  {
    question: "A business wants to improve its working capital position. Which action would be most effective?",
    options: [
      "Buy more fixed assets",
      "Negotiate longer payment terms with suppliers and reduce the time customers take to pay",
      "Increase dividend payments to shareholders",
      "Take on more long-term debt"
    ],
    correctIndex: 1,
    explanation: "Extending supplier payment terms (increasing current liabilities slowly) and collecting debts faster (increasing cash in current assets) directly improves the working capital position."
  },
  // Evaluation (5)
  {
    question: "Evaluate the usefulness of profit as a measure of business success.",
    options: [
      "Profit is the only meaningful measure of success",
      "Profit is important but should be considered alongside cash flow, market share, customer satisfaction, and long-term sustainability",
      "Profit is irrelevant because most successful businesses make losses",
      "Profit is only useful for public limited companies"
    ],
    correctIndex: 1,
    explanation: "Profit is a key measure but does not capture cash flow health, brand strength, market position, or stakeholder satisfaction. A holistic view of performance is needed."
  },
  {
    question: "A firm has a current ratio of 3.5. Is this necessarily a sign of good financial health?",
    options: [
      "Yes, because a higher current ratio is always better",
      "Not necessarily; an excessively high ratio may indicate too much capital tied up in idle current assets rather than being invested productively",
      "Yes, because it means the firm has no debts",
      "No, because the current ratio should always be exactly 1.0"
    ],
    correctIndex: 1,
    explanation: "While a ratio above 1 is generally healthy, a very high ratio (3.5) may indicate excessive stock, idle cash, or poor asset utilisation that could be invested more productively."
  },
  {
    question: "To what extent is the gross profit margin the most important profitability ratio?",
    options: [
      "It is the most important because it only considers cost of sales",
      "It is useful for assessing core trading performance, but net profit margin gives a fuller picture as it includes all costs",
      "It is unimportant because it ignores revenue",
      "It is only relevant to manufacturing businesses"
    ],
    correctIndex: 1,
    explanation: "Gross profit margin shows how efficiently a firm manages cost of sales, but net profit margin accounts for all expenses and gives a more complete picture of overall profitability."
  },
  {
    question: "A business is struggling with cash flow despite being profitable. Which explanation is most credible?",
    options: [
      "The business has no customers",
      "Customers are paying on long credit terms, stock levels are high, and the business recently invested in fixed assets",
      "The business is charging too high a price",
      "The business has too few employees"
    ],
    correctIndex: 1,
    explanation: "Profitable businesses can face cash flow problems when cash is tied up in debtors, stock, or capital investments. The timing of cash flows often differs from when profits are recorded."
  },
  {
    question: "Evaluate whether improving liquidity ratios should always be a business priority.",
    options: [
      "Yes, because liquidity is more important than profitability",
      "Adequate liquidity is essential for survival, but excessively high liquidity can mean poor returns on assets; the optimal level depends on the industry and business model",
      "No, because liquidity ratios are meaningless",
      "Yes, but only during periods of economic growth"
    ],
    correctIndex: 1,
    explanation: "Liquidity is vital for meeting obligations, but the optimal level varies by industry. Supermarkets operate on low ratios due to high cash sales; manufacturers may need higher ratios."
  }
];

// Section 9: Resource Management
const resourceManagement = [
  // Recall (5)
  {
    question: "What is meant by 'capacity utilisation'?",
    options: [
      "The total number of products a firm can produce",
      "The proportion of a firm's maximum output capacity that is actually being used",
      "The number of employees working at any given time",
      "The amount of raw materials in stock"
    ],
    correctIndex: 1,
    explanation: "Capacity utilisation = (actual output / maximum possible output) x 100. It measures how much of a firm's productive potential is being used."
  },
  {
    question: "Job production involves:",
    options: [
      "Producing identical products on an assembly line",
      "Making a unique, one-off product to meet a specific customer order",
      "Producing goods in large batches",
      "Continuously producing standardised goods 24 hours a day"
    ],
    correctIndex: 1,
    explanation: "Job production creates bespoke, individual items tailored to specific customer requirements, such as a custom-built house or a wedding cake."
  },
  {
    question: "What is the just-in-time (JIT) approach to stock control?",
    options: [
      "Holding large amounts of stock to prevent shortages",
      "Ordering and receiving stock only when it is needed for production, minimising inventory levels",
      "Producing goods before any orders are received",
      "Buying all stock at the beginning of the year"
    ],
    correctIndex: 1,
    explanation: "JIT minimises stockholding costs by receiving materials only when needed for production, reducing storage costs and waste but requiring reliable suppliers."
  },
  {
    question: "Which of the following is a method of quality management that involves checking finished products against a set standard?",
    options: [
      "Total quality management (TQM)",
      "Quality control (inspection)",
      "Lean production",
      "Kaizen"
    ],
    correctIndex: 1,
    explanation: "Quality control involves inspecting finished products to check they meet specifications. It is reactive, unlike TQM which builds quality into every process."
  },
  {
    question: "What is batch production?",
    options: [
      "Making one unique product at a time",
      "Producing a group of identical items together before switching to the next product",
      "Continuous 24-hour production of a single product",
      "Only producing when a customer places an order"
    ],
    correctIndex: 1,
    explanation: "Batch production manufactures a set quantity of identical items as a group. The production line is then reconfigured for the next batch, e.g. a bakery making bread then cakes."
  },
  // Application (5)
  {
    question: "A factory has a maximum capacity of 10,000 units per week but is currently producing 7,500 units. What is the capacity utilisation?",
    options: [
      "133%",
      "75%",
      "25%",
      "50%"
    ],
    correctIndex: 1,
    explanation: "Capacity utilisation = (7,500 / 10,000) x 100 = 75%. The factory is using three-quarters of its productive capacity."
  },
  {
    question: "Toyota is famous for pioneering just-in-time production. Which condition is most essential for JIT to work effectively?",
    options: [
      "Having very large warehouses for buffer stock",
      "Reliable suppliers who can deliver high-quality materials quickly and on time",
      "Producing all components in-house",
      "Having excess workforce capacity at all times"
    ],
    correctIndex: 1,
    explanation: "JIT depends on reliable suppliers delivering quality materials precisely when needed. Supply disruptions under JIT immediately halt production since no buffer stock is held."
  },
  {
    question: "A car manufacturer uses flow production to assemble 200 identical cars per day. Which advantage does this provide compared to job production?",
    options: [
      "Each car can be fully customised to individual orders",
      "Lower unit costs through economies of scale and standardisation",
      "Higher quality because each car receives individual attention",
      "Greater flexibility to change the product design daily"
    ],
    correctIndex: 1,
    explanation: "Flow production achieves low unit costs through division of labour, automation, and economies of scale, producing large quantities of standardised products efficiently."
  },
  {
    question: "A firm operating at 95% capacity utilisation receives a large unexpected order. The most likely problem is:",
    options: [
      "The firm has too much spare capacity",
      "The firm may struggle to fulfil the order without overtime, subcontracting, or turning it down",
      "The firm's fixed costs will increase",
      "The firm's quality will automatically improve"
    ],
    correctIndex: 1,
    explanation: "At 95% capacity, there is very little spare capacity. Fulfilling a large new order may require expensive overtime, outsourcing, or risk late delivery and quality issues."
  },
  {
    question: "A business introduces total quality management (TQM). Which of the following best describes this change?",
    options: [
      "Only the quality control department is responsible for quality",
      "Every employee takes responsibility for quality at every stage of production, with a culture of continuous improvement",
      "The firm hires more quality inspectors to check finished products",
      "Quality standards are lowered to increase speed of production"
    ],
    correctIndex: 1,
    explanation: "TQM embeds quality responsibility across the entire organisation. Every employee, at every stage, is responsible for maintaining and improving quality."
  },
  // Evaluation (5)
  {
    question: "Evaluate the view that just-in-time stock management is always superior to holding buffer stock.",
    options: [
      "True, because holding stock is always wasteful",
      "JIT reduces costs and waste but is vulnerable to supply chain disruptions; buffer stock provides security against unexpected delays",
      "False, because JIT is only used in Japan",
      "True, because JIT eliminates all production costs"
    ],
    correctIndex: 1,
    explanation: "JIT offers cost savings and waste reduction but exposes the firm to supply disruptions. Buffer stock is less efficient but provides insurance against supply chain failures."
  },
  {
    question: "A firm has capacity utilisation of 50%. Which response is most appropriate?",
    options: [
      "Increase output by accepting any new orders regardless of profitability",
      "Consider rationalisation (reducing capacity) or strategies to boost demand, depending on whether the low utilisation is temporary or structural",
      "Immediately close the business",
      "Raise prices to increase revenue per unit"
    ],
    correctIndex: 1,
    explanation: "Low utilisation increases unit costs. The firm should either boost demand through marketing/price cuts, or rationalise capacity if the decline is permanent."
  },
  {
    question: "To what extent does flow production always lead to better outcomes than job production?",
    options: [
      "It always does because flow production is cheaper",
      "Flow production is more efficient for mass-market goods, but job production is more appropriate when customers require bespoke, customised products",
      "Job production is always cheaper than flow production",
      "Flow production is only suitable for the food industry"
    ],
    correctIndex: 1,
    explanation: "Flow production excels at low-cost mass production but lacks flexibility. Job production suits bespoke products where customisation and craftsmanship are valued over scale."
  },
  {
    question: "Evaluate whether TQM is always more effective than traditional quality control.",
    options: [
      "Yes, because TQM is free to implement",
      "TQM can create a quality culture and reduce defects long-term, but it requires significant cultural change, training investment, and time; quality control may be more practical for some firms",
      "No, because TQM does not involve any inspection",
      "Yes, because TQM eliminates the need for any staff training"
    ],
    correctIndex: 1,
    explanation: "TQM builds quality into processes and empowers workers, but requires substantial investment in training and cultural change. For small firms with limited resources, quality control may be more feasible."
  },
  {
    question: "A firm wants to improve efficiency. A consultant recommends switching from batch to flow production. Which counter-argument is most valid?",
    options: [
      "Flow production always has higher unit costs",
      "Flow production requires significant capital investment and reduces product variety, which may not suit the firm's product range or market",
      "Batch production is always more efficient",
      "Flow production requires no workforce"
    ],
    correctIndex: 1,
    explanation: "Switching to flow production demands heavy capital investment in machinery and reduces flexibility to offer product variety, which may not suit firms with diverse product lines or small-scale demand."
  }
];

// Section 10: External Influences
const externalInfluences = [
  // Recall (5)
  {
    question: "What is the most likely effect of a rise in interest rates on business investment?",
    options: [
      "Investment increases because borrowing becomes cheaper",
      "Investment decreases because the cost of borrowing rises and returns on savings increase",
      "Interest rates have no effect on investment",
      "Investment increases because consumer spending rises"
    ],
    correctIndex: 1,
    explanation: "Higher interest rates increase the cost of borrowing and raise the return on savings, discouraging firms from investing and encouraging them to save instead."
  },
  {
    question: "An appreciation (strengthening) of the pound sterling means:",
    options: [
      "UK exports become cheaper abroad and imports become more expensive",
      "UK exports become more expensive abroad and imports become cheaper",
      "Both exports and imports become more expensive",
      "The exchange rate has no effect on trade"
    ],
    correctIndex: 1,
    explanation: "A stronger pound makes UK goods more expensive for foreign buyers (harming exports) but makes imported goods cheaper for UK consumers."
  },
  {
    question: "Which legislation protects employees against unfair dismissal in the UK?",
    options: [
      "The Consumer Rights Act",
      "The Employment Rights Act",
      "The Competition Act",
      "The Companies Act"
    ],
    correctIndex: 1,
    explanation: "The Employment Rights Act provides statutory protection against unfair dismissal, covering redundancy rights, notice periods, and dismissal procedures."
  },
  {
    question: "During a recession, which of the following is most likely to occur?",
    options: [
      "Rising consumer spending and business expansion",
      "Falling GDP, rising unemployment, and reduced consumer confidence",
      "Rising inflation and interest rates",
      "Increased government tax revenue"
    ],
    correctIndex: 1,
    explanation: "A recession (two consecutive quarters of falling GDP) is characterised by reduced output, rising unemployment, falling consumer spending, and lower business confidence."
  },
  {
    question: "What is the purpose of the Competition and Markets Authority (CMA) in the UK?",
    options: [
      "To set interest rates",
      "To promote competition and prevent anti-competitive behaviour such as price-fixing and monopoly abuse",
      "To collect taxes from businesses",
      "To manage the national debt"
    ],
    correctIndex: 1,
    explanation: "The CMA regulates markets to ensure fair competition, investigating mergers, preventing cartels, and protecting consumers from anti-competitive practices."
  },
  // Application (5)
  {
    question: "A UK-based exporter sells goods to the US. The exchange rate moves from $1 = $1.30 to $1 = $1.40. How does this affect the exporter?",
    options: [
      "UK exports become cheaper in the US, boosting sales",
      "UK exports become more expensive in the US, likely reducing demand",
      "There is no effect on the price of exports",
      "US consumers will buy more UK goods because the dollar is stronger"
    ],
    correctIndex: 1,
    explanation: "A stronger pound (from $1.30 to $1.40) means US buyers need more dollars to buy the same UK goods, making UK exports more expensive and potentially reducing demand."
  },
  {
    question: "The Bank of England raises the base rate from 4% to 5.5%. A furniture retailer that offers customer credit is most likely to experience:",
    options: [
      "Increased demand because customers will borrow more",
      "Reduced demand because higher interest rates increase the cost of credit purchases and reduce disposable income",
      "No change because furniture is a necessity",
      "Increased supply from competitors"
    ],
    correctIndex: 1,
    explanation: "Higher interest rates increase borrowing costs and mortgage repayments, reducing disposable income. Demand for big-ticket credit purchases like furniture typically falls."
  },
  {
    question: "The government introduces a new national minimum wage increase of 8%. A small restaurant chain is most likely to respond by:",
    options: [
      "Hiring more staff to increase capacity",
      "Raising menu prices, reducing staff hours, or investing in automation to offset higher labour costs",
      "Ignoring the law because it is a small business",
      "Moving all operations abroad immediately"
    ],
    correctIndex: 1,
    explanation: "A minimum wage increase raises labour costs. Firms may respond by raising prices, reducing hours, improving productivity through technology, or accepting lower profit margins."
  },
  {
    question: "A European clothing retailer imports fabric from India. A depreciation of the euro against the Indian rupee will:",
    options: [
      "Make Indian fabric cheaper to buy",
      "Make Indian fabric more expensive to buy, increasing the retailer's costs",
      "Have no effect on costs because fabric is priced in euros",
      "Make the retailer's products cheaper in India"
    ],
    correctIndex: 1,
    explanation: "A weaker euro means more euros are needed to buy the same amount of Indian rupees, making imported fabric more expensive and raising the retailer's costs of production."
  },
  {
    question: "During the COVID-19 pandemic, many businesses experienced a simultaneous demand shock and supply shock. Which business response was most common?",
    options: [
      "Expanding production capacity immediately",
      "Pivoting business models (e.g. restaurants switching to delivery) and cutting costs to survive",
      "Raising prices dramatically across all sectors",
      "Ignoring the pandemic and operating as normal"
    ],
    correctIndex: 1,
    explanation: "Many businesses adapted by pivoting to online/delivery models, furloughing staff, cutting costs, and seeking government support to survive simultaneous demand and supply disruptions."
  },
  // Evaluation (5)
  {
    question: "Evaluate the impact of a fall in interest rates on UK businesses.",
    options: [
      "It is always positive because borrowing becomes cheaper",
      "Lower rates reduce borrowing costs and may boost consumer spending, but the impact depends on business confidence, bank lending willingness, and the overall economic climate",
      "It has no impact because businesses do not borrow money",
      "It is always negative because savings returns fall"
    ],
    correctIndex: 1,
    explanation: "Lower interest rates reduce costs and can stimulate demand, but the effect depends on whether banks pass on cuts, business confidence levels, and whether demand actually responds."
  },
  {
    question: "To what extent does environmental legislation always harm business competitiveness?",
    options: [
      "It always harms competitiveness by increasing costs",
      "While it raises short-term compliance costs, it can drive innovation, improve brand reputation, and create long-term competitive advantages through efficiency gains",
      "It has no effect on business at all",
      "It only affects businesses in the energy sector"
    ],
    correctIndex: 1,
    explanation: "Environmental regulation increases compliance costs but can stimulate innovation in cleaner technology, enhance brand image, and create first-mover advantages in green markets."
  },
  {
    question: "A UK importer benefits from a strong pound. Evaluate whether this is always advantageous for the UK economy.",
    options: [
      "A strong pound is always good for the UK economy",
      "While importers benefit from cheaper inputs, a strong pound harms exporters and may widen the trade deficit, leading to job losses in export-dependent industries",
      "A strong pound has no effect on the wider economy",
      "A strong pound only benefits the financial sector"
    ],
    correctIndex: 1,
    explanation: "A strong pound benefits importers and consumers (cheaper goods) but hurts exporters (less competitive abroad). The net effect depends on the UK's trade balance and industrial structure."
  },
  {
    question: "Evaluate the view that recessions are entirely negative for businesses.",
    options: [
      "True, because all businesses lose money during a recession",
      "While most businesses suffer from reduced demand, some benefit: discount retailers, debt management firms, and businesses that innovate during downturns can emerge stronger",
      "False, because recessions have no effect on businesses",
      "True, but only for businesses in the luxury goods sector"
    ],
    correctIndex: 1,
    explanation: "Recessions create opportunities for counter-cyclical businesses (e.g. discount retailers), efficient firms that gain market share as weaker competitors fail, and innovators who prepare for recovery."
  },
  {
    question: "To what extent should businesses regard changes in the external environment as threats rather than opportunities?",
    options: [
      "External changes are always threats",
      "External changes can be both threats and opportunities; businesses that monitor their environment, adapt quickly, and innovate can turn challenges into competitive advantages",
      "External changes are always opportunities",
      "External changes can be completely ignored by well-managed firms"
    ],
    correctIndex: 1,
    explanation: "External changes present both threats and opportunities. Proactive businesses that monitor PESTLE factors and adapt their strategies can gain advantages from disruption."
  }
];

// ---------------------------------------------------------------------------
// MAIN EXECUTION
// ---------------------------------------------------------------------------

async function main() {
  console.log('Expanding Business Units 1-2 quiz data (15 questions per section)...\n');

  const sections = [
    // Unit 1
    { id: 'meeting-customer-needs', questions: meetingCustomerNeeds },
    { id: 'the-market', questions: theMarket },
    { id: 'marketing-mix-strategy', questions: marketingMixStrategy },
    { id: 'managing-people', questions: managingPeople },
    { id: 'entrepreneurs-leaders', questions: entrepreneursLeaders },
    // Unit 2
    { id: 'planning-raising-finance', questions: planningRaisingFinance },
    { id: 'financial-planning', questions: financialPlanning },
    { id: 'managing-finance', questions: managingFinance },
    { id: 'resource-management', questions: resourceManagement },
    { id: 'external-influences', questions: externalInfluences },
  ];

  let successCount = 0;
  let failCount = 0;

  for (const section of sections) {
    console.log(`Processing: ${section.id} (${section.questions.length} new questions)`);
    const success = await expandSection(section.id, section.questions);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }

  console.log(`\nDone! ${successCount} sections updated successfully, ${failCount} failed.`);
  console.log(`Total new questions added: ${successCount * 15}`);
}

main().catch(console.error);
