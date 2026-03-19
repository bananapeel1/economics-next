import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://trweeckuswgkenckeqfb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);

// ─────────────────────────────────────────────────────────
// Helper: append new chain cards to existing flashcard data
// ─────────────────────────────────────────────────────────

async function addChains(sectionId, newCards) {
  const { data, error } = await supabase
    .from('section_flashcards')
    .select('data')
    .eq('section_id', sectionId)
    .single();

  if (error) {
    console.error(`  Fetch failed: ${sectionId}`, error.message);
    return false;
  }

  const existing = data.data || [];
  const updated = [...existing, ...newCards];

  const { error: e2 } = await supabase
    .from('section_flashcards')
    .update({ data: updated })
    .eq('section_id', sectionId);

  if (e2) {
    console.error(`  Update failed: ${sectionId}`, e2.message);
    return false;
  }

  console.log(`  ${sectionId}: ${existing.length} → ${updated.length} cards (+${newCards.length} chains)`);
  return true;
}

// ═══════════════════════════════════════════════════════════
//  ECONOMICS UNIT 1 — Markets in Action
// ═══════════════════════════════════════════════════════════

// 1. Introductory Concepts (3 chains)
const introductoryConceptsChains = [
  {
    front: "Trace the chain of reasoning from scarcity to opportunity cost.",
    back: "Resources are scarce and have multiple uses → Wants are unlimited → Choices must be made about how to allocate resources → Choosing one option means forgoing the next best alternative → This forgone alternative is the opportunity cost",
    type: "chain"
  },
  {
    front: "Trace the effect of an increase in a country's capital goods production on the PPF.",
    back: "Country allocates more resources to capital goods → Investment in capital stock increases → Productive capacity of the economy grows over time → PPF shifts outward → The economy can now produce more of both goods in the future",
    type: "chain"
  },
  {
    front: "What happens when an economy moves from a point inside the PPF to a point on the PPF?",
    back: "Economy starts with unemployed or inefficiently allocated resources → Resources are reallocated or re-employed → Previously idle factors of production are put to use → Output increases without needing new resources → Economy achieves productive efficiency on the PPF",
    type: "chain"
  },
];

// 2. Consumer Behaviour & Demand (3 chains)
const consumerBehaviourDemandChains = [
  {
    front: "Trace the effect of a rise in consumer incomes on the market for a normal good.",
    back: "Consumer incomes rise → Consumers have greater purchasing power → Demand for normal goods increases at every price level → Demand curve shifts right → At the original price there is excess demand → Price is bid up → A new higher equilibrium price and quantity are established",
    type: "chain"
  },
  {
    front: "Trace the effect of a rise in the price of a good on quantity demanded (movement along the demand curve).",
    back: "Price of the good rises → The good becomes relatively more expensive compared to substitutes → Substitution effect: consumers switch to cheaper alternatives → Income effect: consumers' real income falls, reducing purchasing power → Quantity demanded falls → Movement along the demand curve (contraction)",
    type: "chain"
  },
  {
    front: "Trace the chain from a successful advertising campaign to a new market equilibrium.",
    back: "Firm launches a successful advertising campaign → Consumer preferences shift in favour of the good → Demand increases at every price level → Demand curve shifts right → Excess demand at the original price → Price rises and firms expand output → New equilibrium with higher price and higher quantity",
    type: "chain"
  },
];

// 3. Supply (3 chains)
const supplyChains = [
  {
    front: "Trace the effect of an improvement in technology on the market for a good.",
    back: "New technology is adopted by firms → Cost of production per unit falls → Firms are willing and able to supply more at every price → Supply curve shifts right → At the original price there is excess supply → Price falls and quantity traded increases → New equilibrium with lower price and higher quantity",
    type: "chain"
  },
  {
    front: "Trace the effect of a rise in the cost of raw materials on the supply of a good.",
    back: "Raw material costs increase → Cost of production per unit rises → Firms are less willing to supply at the existing price → Supply curve shifts left → At the original price there is excess demand → Price rises and quantity traded falls → New equilibrium with higher price and lower quantity",
    type: "chain"
  },
  {
    front: "Trace the effect of a government subsidy on the supply of a good.",
    back: "Government grants a per-unit subsidy to producers → Effective cost of production falls by the subsidy amount → Firms can supply more at every price level → Supply curve shifts right (downward) by the subsidy amount → Equilibrium price falls and quantity traded rises → Consumer surplus and producer surplus both increase",
    type: "chain"
  },
];

// 4. Price Determination (3 chains)
const priceDeterminationChains = [
  {
    front: "Trace the effect of an indirect tax imposed on a good.",
    back: "Government imposes a per-unit indirect tax → Firms' costs of production rise by the tax amount → Supply curve shifts left (upward) by the tax per unit → At the original price there is excess demand → Equilibrium price rises but by less than the full tax → Quantity traded falls → Tax burden is shared between consumers (higher price) and producers (lower revenue net of tax)",
    type: "chain"
  },
  {
    front: "Trace the effect of a simultaneous increase in demand and decrease in supply.",
    back: "Demand curve shifts right (e.g. rising incomes) → Supply curve shifts left (e.g. rising costs) → Both shifts put upward pressure on price → Equilibrium price rises unambiguously → Effect on equilibrium quantity is indeterminate — depends on relative magnitude of shifts → If demand shift is larger, quantity rises; if supply shift is larger, quantity falls",
    type: "chain"
  },
  {
    front: "Explain how the price mechanism allocates resources when demand for a good increases.",
    back: "Consumer demand for the good rises → Excess demand at the current price → Price is bid up (signalling function) → Higher price incentivises firms to increase output (incentive function) → Resources (labour, capital) are attracted from less profitable uses → Supply expands → Resources are reallocated toward the good in greater demand (rationing function restores equilibrium)",
    type: "chain"
  },
];

// 5. Market Failure (4 chains)
const marketFailureChains = [
  {
    front: "Trace the chain of reasoning for a negative externality in production (e.g. pollution from a factory).",
    back: "Firm produces a good and generates pollution → Social cost of production exceeds private cost → External cost is imposed on third parties (e.g. health damage, environmental degradation) → Firm ignores external costs in its decisions → Output is higher than the socially optimal level → Market overproduces → Welfare loss (deadweight loss) arises between the market quantity and the socially optimal quantity",
    type: "chain"
  },
  {
    front: "Trace the chain of reasoning for a positive externality in consumption (e.g. education).",
    back: "Individual consumes education → Private benefit gained (higher skills, higher wages) → Additional social benefits arise for third parties (lower crime, higher tax revenues, greater innovation) → Social benefit exceeds private benefit → Individuals consider only private benefit in decisions → Quantity consumed is below the socially optimal level → Market underprovides → Welfare loss arises",
    type: "chain"
  },
  {
    front: "Explain why public goods lead to market failure.",
    back: "Public goods are non-excludable and non-rivalrous → Consumers can benefit without paying → Rational individuals choose to free-ride → Firms cannot charge a price and earn revenue → No private firm has an incentive to produce the good → The market fails to provide public goods → Government must intervene to provide them (funded by taxation)",
    type: "chain"
  },
  {
    front: "Explain why merit goods are underprovided by the free market.",
    back: "Merit goods generate positive externalities and/or consumers have imperfect information → Individuals underestimate the private benefits of consumption → Demand curve reflects only perceived private benefit, which is below true social benefit → Quantity consumed is less than the socially optimal quantity → Market underprovides merit goods → Government intervention needed (e.g. subsidies, provision, regulation) to increase consumption to the optimal level",
    type: "chain"
  },
];

// 6. Government Intervention (4 chains)
const governmentInterventionChains = [
  {
    front: "Trace the effects of an indirect tax on a market with a negative externality.",
    back: "Government identifies a negative externality (e.g. pollution) → Imposes a per-unit indirect tax equal to the external cost → Supply curve shifts left by the tax amount → Price paid by consumers rises → Quantity demanded and produced falls → Output moves closer to the socially optimal level → Tax internalises the externality and reduces welfare loss",
    type: "chain"
  },
  {
    front: "Trace the effects of a subsidy on a market with a positive externality.",
    back: "Government identifies a positive externality (e.g. vaccination) → Grants a per-unit subsidy to producers or consumers → Supply curve shifts right (or demand curve shifts right for consumer subsidy) → Price to consumers falls → Quantity consumed increases → Output moves closer to the socially optimal level → Subsidy internalises the externality and reduces welfare loss",
    type: "chain"
  },
  {
    front: "Trace the effects of a maximum price (price ceiling) set below the equilibrium price.",
    back: "Government sets a maximum price below the market equilibrium → Consumers demand more at the lower price → Producers supply less at the lower price (reduced profitability) → Excess demand (shortage) is created → Rationing or queuing may develop → Black markets may emerge where goods are sold illegally above the maximum price → Allocative inefficiency results",
    type: "chain"
  },
  {
    front: "Trace the effects of a minimum price (price floor) set above the equilibrium price.",
    back: "Government sets a minimum price above the market equilibrium (e.g. minimum wage, agricultural price floor) → Producers supply more at the higher guaranteed price → Consumers demand less at the higher price → Excess supply (surplus) is created → Government may need to buy up the surplus to maintain the floor → Cost to taxpayers increases → Potential for government failure if intervention is costly or creates distortions",
    type: "chain"
  },
];

// ═══════════════════════════════════════════════════════════
//  ECONOMICS UNIT 2 — Macroeconomic Performance & Policy
// ═══════════════════════════════════════════════════════════

// 7. Measures of Economic Performance (3 chains)
const measuresEconomicPerformanceChains = [
  {
    front: "Trace the chain of effects caused by demand-pull inflation.",
    back: "Aggregate demand increases (e.g. rising consumer confidence, fiscal expansion) → Economy approaches or exceeds full capacity → Firms face rising costs as they compete for scarce resources → General price level rises (demand-pull inflation) → Real value of money falls → Workers demand higher wages to maintain real incomes → Cost-push pressures may compound the inflation (wage-price spiral)",
    type: "chain"
  },
  {
    front: "Trace the effects of rising unemployment on the economy.",
    back: "Unemployment rises (e.g. due to recession) → Household incomes fall → Consumer spending decreases → Aggregate demand falls further (negative multiplier effect) → Tax revenues decrease (less income tax and VAT collected) → Government welfare spending increases (transfer payments) → Budget deficit widens → Potential for hysteresis as long-term unemployed lose skills",
    type: "chain"
  },
  {
    front: "Trace the chain from a current account deficit to its potential consequences.",
    back: "Country imports more goods and services than it exports → Current account deficit widens → Outflow of currency to pay for imports → Downward pressure on the exchange rate → If deficit is persistent, country may need to borrow from abroad → External debt increases → Debt servicing costs rise → Potential loss of investor confidence",
    type: "chain"
  },
];

// 8. Aggregate Demand (4 chains)
const aggregateDemandChains = [
  {
    front: "Trace the multiplier effect from an initial increase in government spending.",
    back: "Government increases spending (e.g. infrastructure investment) → Firms receive contracts and income rises → Workers are hired and earn wages → Increased household income leads to higher consumer spending → Additional rounds of spending generate further income → Total rise in GDP is greater than the initial injection → The multiplier = 1 / (1 − MPC) or 1 / MPW",
    type: "chain"
  },
  {
    front: "Trace the accelerator effect from a rise in national income.",
    back: "National income (GDP) grows → Consumer demand for goods increases → Firms experience rising sales → Existing capital stock becomes insufficient → Firms increase investment spending to expand capacity → Investment rises more than proportionally to the rise in income → This is the accelerator effect → AD shifts further right, reinforcing growth",
    type: "chain"
  },
  {
    front: "Trace the effect of a fall in consumer confidence on aggregate demand.",
    back: "Consumer confidence falls (e.g. fears of recession or job losses) → Households reduce consumption spending and increase precautionary saving → Fall in consumption (C) reduces a component of AD → AD curve shifts left → Firms experience falling demand → Firms cut production and may lay off workers → Unemployment rises → Negative multiplier compounds the initial fall in demand",
    type: "chain"
  },
  {
    front: "Trace the effect of a fall in interest rates on aggregate demand.",
    back: "Central bank reduces interest rates → Cost of borrowing decreases → Consumers increase spending on credit (especially on big-ticket items) → Firms increase investment as the expected return exceeds the lower cost of borrowing → Mortgage costs fall, increasing disposable income for homeowners → Exchange rate may fall (lower returns attract less hot money) → Net exports may rise → AD shifts right",
    type: "chain"
  },
];

// 9. Aggregate Supply (3 chains)
const aggregateSupplyChains = [
  {
    front: "Trace the effect of a rise in oil prices on short-run aggregate supply.",
    back: "Global oil prices rise → Energy and transport costs increase for firms → Cost of production per unit rises across the economy → Firms reduce output at every price level → SRAS curve shifts left → Price level rises and real GDP falls → Economy experiences cost-push inflation → Stagflation may occur (rising prices with falling output)",
    type: "chain"
  },
  {
    front: "Trace the effect of improved education and training on long-run aggregate supply.",
    back: "Government invests in education and training → Human capital quality improves over time → Labour productivity increases → Firms can produce more output from the same inputs → Productive capacity of the economy expands → LRAS curve shifts right → Potential GDP increases → Economy can sustain higher output at a stable price level (non-inflationary growth)",
    type: "chain"
  },
  {
    front: "Trace the effect of a positive demand-side shock on the macroeconomy using the AD/AS model.",
    back: "Positive demand shock occurs (e.g. surge in exports) → AD curve shifts right → Real GDP increases and price level rises → Economy moves along the SRAS curve toward or beyond full capacity → If output exceeds potential GDP, a positive output gap forms → Inflationary pressures build → Wages and input costs may rise → SRAS may shift left in response, partially offsetting GDP gains",
    type: "chain"
  },
];

// 10. National Income (3 chains)
const nationalIncomeChains = [
  {
    front: "Trace the effect of an increase in injections on national income equilibrium.",
    back: "Injections rise (e.g. government spending increases) → Total injections now exceed total withdrawals → Firms receive additional revenue → Firms expand output and hire more workers → Household incomes rise → Consumption increases (inducing further rounds of spending via the multiplier) → National income rises until a new equilibrium is reached where S + T + M = I + G + X",
    type: "chain"
  },
  {
    front: "Trace the effect of an increase in the savings ratio on national income.",
    back: "Households increase their savings rate → Marginal propensity to consume falls → Withdrawals from the circular flow increase → Spending in the economy decreases → Firms experience falling demand → Output and employment fall → National income contracts via the negative multiplier → New equilibrium at a lower level of national income (paradox of thrift)",
    type: "chain"
  },
  {
    front: "Trace the effect of a rise in imports on the circular flow of income.",
    back: "Consumer spending shifts toward imported goods → Import expenditure (M) rises → Withdrawals from the circular flow increase → Less income is re-spent within the domestic economy → Domestic firms receive less revenue → Output and employment fall → National income falls via the negative multiplier → Current account may move toward deficit",
    type: "chain"
  },
];

// 11. Economic Growth (3 chains)
const economicGrowthChains = [
  {
    front: "Trace the chain from actual economic growth to improved living standards.",
    back: "AD increases (e.g. consumer spending rises) → Real GDP grows → Firms expand output to meet higher demand → Employment increases → Household incomes rise → Tax revenues rise and welfare spending falls → Government can invest in public services → If growth exceeds population growth, GDP per capita rises → Material living standards improve",
    type: "chain"
  },
  {
    front: "Trace how supply-side improvements lead to potential (long-run) economic growth.",
    back: "Investment in capital, technology, or human capital increases → Productive capacity of the economy expands → LRAS shifts right → Potential output rises → Economy can produce more without generating inflation → Sustainable long-run growth occurs → PPF shifts outward → Both current and future output possibilities increase",
    type: "chain"
  },
  {
    front: "Trace the boom phase of the economic (trade) cycle and its consequences.",
    back: "AD grows rapidly → Real GDP rises above trend output → Positive output gap forms → Labour market tightens, unemployment falls below the natural rate → Wages rise due to labour shortages → Firms face rising costs → Inflationary pressures build (demand-pull inflation) → Central bank may raise interest rates to cool the economy → Risk of a subsequent downturn as demand is dampened",
    type: "chain"
  },
];

// 12. Macroeconomic Objectives & Policies (4 chains)
const macroeconomicObjectivesPoliciesChains = [
  {
    front: "Trace the effects of an expansionary fiscal policy on the macroeconomy.",
    back: "Government increases spending and/or cuts taxes → Households have higher disposable income → Consumer spending rises → AD shifts right → Real GDP increases via the multiplier → Unemployment falls → Price level may rise (demand-pull inflation) → Budget deficit widens → If the economy is near full capacity, crowding out may limit effectiveness",
    type: "chain"
  },
  {
    front: "Trace the effects of a contractionary monetary policy (interest rate rise).",
    back: "Central bank raises the base interest rate → Cost of borrowing increases for households and firms → Consumer spending on credit falls → Business investment decreases (fewer projects exceed the higher cost of capital) → AD shifts left → Real GDP growth slows or falls → Inflationary pressure is reduced → Exchange rate may appreciate (attracting hot money) → Net exports may fall",
    type: "chain"
  },
  {
    front: "Trace the effects of a supply-side policy (e.g. deregulation) on the economy.",
    back: "Government reduces regulations and barriers to entry → Firms face lower costs of compliance → Competition in markets increases → Firms become more efficient (productive efficiency improves) → Costs of production fall → LRAS shifts right → Potential output increases → Non-inflationary growth is achieved → International competitiveness may improve",
    type: "chain"
  },
  {
    front: "Trace the Phillips Curve trade-off and explain how it may break down.",
    back: "Government uses expansionary policy to reduce unemployment → AD increases and firms hire more workers → Labour market tightens → Workers gain bargaining power and negotiate higher wages → Firms pass on higher costs as higher prices → Inflation rises as unemployment falls (short-run Phillips Curve trade-off) → If workers adjust inflation expectations upward, they demand even higher wages → The short-run Phillips Curve may shift outward, worsening the trade-off",
    type: "chain"
  },
];

// ═══════════════════════════════════════════════════════════
//  BUSINESS UNIT 1 — Marketing and People
// ═══════════════════════════════════════════════════════════

// 13. Meeting Customer Needs (3 chains)
const meetingCustomerNeedsChains = [
  {
    front: "Trace the chain from identifying a market opportunity to satisfying customer needs.",
    back: "Entrepreneur identifies a gap in the market → Market research is conducted (primary and secondary) → Customer needs and preferences are identified → Product or service is developed to meet those needs → Appropriate price, promotion, and distribution are planned → Product is launched → Customer needs are satisfied, generating repeat purchases and brand loyalty",
    type: "chain"
  },
  {
    front: "Trace the effect of a business failing to adapt to changing customer needs.",
    back: "Customer tastes and preferences change (e.g. shift to online shopping) → Business fails to update its product or service offering → Sales revenue falls as customers switch to competitors → Market share declines → Cash flow deteriorates → Business may need to cut costs or restructure → If no adaptation occurs, the business risks failure or closure",
    type: "chain"
  },
  {
    front: "Trace the chain from effective market research to competitive advantage.",
    back: "Business conducts thorough market research → Key customer segments and unmet needs are identified → Product is designed to match target market preferences → Marketing mix is tailored to the segment → Product-market fit is achieved → Customer satisfaction and loyalty increase → Business gains a competitive advantage over rivals with less market insight",
    type: "chain"
  },
];

// 14. The Market (3 chains)
const theMarketChains = [
  {
    front: "Trace the effect of a price reduction on total revenue when demand is price elastic (PED > 1).",
    back: "Firm reduces the price of its product → PED is greater than 1 (elastic demand) → Percentage increase in quantity demanded is greater than the percentage fall in price → Total revenue increases → Firm gains market share as consumers switch from rivals → Profit may increase if the rise in revenue exceeds any rise in total costs",
    type: "chain"
  },
  {
    front: "Trace the effect of a rise in income on the demand for an inferior good.",
    back: "Consumer incomes rise → For inferior goods, YED is negative → Consumers switch away from the inferior good to higher-quality substitutes (normal goods) → Demand for the inferior good falls → Demand curve shifts left → Firms selling inferior goods experience falling sales and revenue → They may need to reposition their product or reduce prices",
    type: "chain"
  },
  {
    front: "Trace how high competition in a market affects businesses and consumers.",
    back: "Many firms compete in the market → Each firm has limited market power → Firms must keep prices competitive to attract customers → Businesses innovate and improve quality to differentiate → Costs are driven down through efficiency improvements → Consumers benefit from lower prices, greater choice, and better quality → Firms with weak competitive positions may be forced to exit the market",
    type: "chain"
  },
];

// 15. Marketing Mix and Strategy (3 chains)
const marketingMixStrategyChains = [
  {
    front: "Trace the product through the stages of the product life cycle and its impact on cash flow.",
    back: "Development stage: high R&D costs, no revenue, negative cash flow → Introduction: launch costs high, sales low, cash flow still negative → Growth: sales rise rapidly, unit costs fall due to economies of scale, cash flow turns positive → Maturity: sales peak, competition intensifies, cash flow is at its highest → Decline: sales and revenue fall, cash flow decreases → Extension strategies may be used to prolong the maturity phase",
    type: "chain"
  },
  {
    front: "Trace the effect of a penetration pricing strategy on market entry.",
    back: "Firm enters a new market and sets a low initial price → Low price attracts price-sensitive consumers → Sales volume increases rapidly → Firm builds market share quickly → Economies of scale reduce unit costs → Competitors may be deterred by low margins → Once market position is established, the firm may gradually raise prices",
    type: "chain"
  },
  {
    front: "Trace the effect of choosing an appropriate distribution channel on business success.",
    back: "Business selects a distribution channel suited to its target market (e.g. online for tech-savvy consumers) → Products are accessible where and when customers want them → Convenience increases customer satisfaction → Sales volume grows → Distribution costs are managed effectively → Brand image is reinforced through the right retail environment → Revenue and profit improve",
    type: "chain"
  },
];

// 16. Managing People (3 chains)
const managingPeopleChains = [
  {
    front: "Trace the effect of applying Maslow's hierarchy to improve worker motivation.",
    back: "Managers identify which level of need is unmet for employees → Lower-level needs (physiological, safety) are addressed through fair pay and job security → Social needs are met through teamwork and a positive work culture → Esteem needs are addressed through recognition and responsibility → Self-actualisation is supported through challenging roles and development opportunities → Motivation increases → Labour productivity and retention improve",
    type: "chain"
  },
  {
    front: "Trace the effect of high labour turnover on a business.",
    back: "Employees leave the business frequently → Recruitment and training costs rise → Experienced workers are lost → Remaining staff face increased workloads → Productivity falls during transition periods → Customer service quality may decline → Business reputation as an employer may suffer → Further difficulty attracting quality candidates, worsening the problem",
    type: "chain"
  },
  {
    front: "Trace the chain from effective training to improved business performance.",
    back: "Business invests in employee training programmes → Workers develop new skills and knowledge → Labour productivity increases → Quality of output improves → Fewer errors and less waste reduce costs → Employees feel valued, improving motivation and retention → Customer satisfaction rises due to better products and service → Sales revenue and profitability increase",
    type: "chain"
  },
];

// 17. Entrepreneurs and Leaders (2 chains)
const entrepreneursLeadersChains = [
  {
    front: "Trace the chain from an entrepreneur identifying an opportunity to establishing a business.",
    back: "Entrepreneur identifies a gap in the market or an innovative product idea → Business plan is developed (objectives, target market, financial forecasts) → Sources of finance are secured (personal savings, loans, investors) → Legal structure is chosen (sole trader, partnership, or limited company) → Resources are acquired (premises, equipment, labour) → Product or service is launched → Entrepreneur manages risk and uncertainty to grow the business",
    type: "chain"
  },
  {
    front: "Trace the impact of different leadership styles on business performance during a crisis.",
    back: "A crisis occurs (e.g. sudden fall in demand) → An autocratic leadership style may be adopted for quick decision-making → Decisions are made rapidly without extensive consultation → Employees carry out instructions immediately → Short-term survival is prioritised → However, lack of consultation may reduce morale and overlook valuable ideas → Once the crisis passes, a shift to a more democratic style may improve long-term engagement and innovation",
    type: "chain"
  },
];

// ═══════════════════════════════════════════════════════════
//  BUSINESS UNIT 2 — Managing Business Activities
// ═══════════════════════════════════════════════════════════

// 18. Planning a Business and Raising Finance (3 chains)
const planningRaisingFinanceChains = [
  {
    front: "Trace the chain from writing a business plan to securing finance for growth.",
    back: "Entrepreneur prepares a detailed business plan (market analysis, financial projections, strategy) → Plan demonstrates viability and potential returns → Business plan is presented to potential investors or lenders → Credibility and confidence in the business increase → Finance is secured (e.g. bank loan, venture capital, angel investment) → Capital is invested in assets, stock, or marketing → Business is funded to launch or expand",
    type: "chain"
  },
  {
    front: "Trace the effect of choosing debt finance over equity finance for a growing business.",
    back: "Business takes on debt finance (e.g. bank loan) → Ownership and control are retained by existing shareholders → Interest payments create a fixed financial obligation → Cash flow must be sufficient to cover repayments → Gearing ratio increases → Financial risk rises (especially if revenue is volatile) → However, profits are not shared with external investors → If the business succeeds, returns are concentrated with existing owners",
    type: "chain"
  },
  {
    front: "Trace why a start-up may struggle to raise finance.",
    back: "Start-up has no trading history or track record → Limited financial data makes risk assessment difficult for lenders → Lack of assets means little collateral for secured loans → Banks perceive high risk of failure → Interest rates offered are high, or loan applications are rejected → Entrepreneur may rely on personal savings, family, or crowdfunding → Limited finance constrains growth and competitiveness in early stages",
    type: "chain"
  },
];

// 19. Financial Planning (3 chains)
const financialPlanningChains = [
  {
    front: "Trace the consequences of a cash flow crisis for a business.",
    back: "Business experiences a cash flow shortfall (cash outflows exceed inflows) → Unable to pay suppliers on time → Suppliers may refuse to deliver or demand cash on delivery → Production may be disrupted due to lack of materials → Unable to pay wages, leading to staff dissatisfaction → Creditors may take legal action → Even a profitable business can become insolvent if it cannot meet short-term obligations → Business may be forced into administration or closure",
    type: "chain"
  },
  {
    front: "Trace the effect of reaching the break-even point and then exceeding it.",
    back: "Business calculates break-even output: FC / (selling price − variable cost per unit) → At break-even, total revenue equals total costs → No profit or loss is made → Each additional unit sold above break-even contributes directly to profit (contribution per unit) → Profit increases as output exceeds break-even → Margin of safety widens → Business becomes more financially resilient to falls in demand",
    type: "chain"
  },
  {
    front: "Trace the effects of using budgets to improve business performance.",
    back: "Management sets budgets for revenue, costs, and profit → Spending targets provide financial discipline → Actual performance is compared to budgeted figures (variance analysis) → Adverse variances are identified (e.g. overspending) → Corrective action is taken (e.g. cost-cutting, renegotiating supplier contracts) → Financial control improves → Resources are allocated more efficiently → Profitability is enhanced",
    type: "chain"
  },
];

// 20. Managing Finance (3 chains)
const managingFinanceChains = [
  {
    front: "Trace the steps a business can take to improve its profit margins.",
    back: "Business identifies low profit margins → Analyses cost structure to find areas of waste → Reduces variable costs (e.g. sourcing cheaper suppliers, reducing wastage) → Reduces fixed costs (e.g. renegotiating rent, streamlining operations) → Alternatively, increases revenue through price rises (if PED is inelastic) or increasing sales volume → Gross and net profit margins improve → Retained profit increases, funding future growth",
    type: "chain"
  },
  {
    front: "Trace the effect of poor liquidity management on a business.",
    back: "Business holds too little working capital → Current ratio falls below acceptable levels → Difficulty paying short-term liabilities (trade payables, wages, tax) → Suppliers demand upfront payment or stop supplying → Production may halt → Customers lose confidence → Reputation is damaged → Bank may recall overdraft facilities → Business faces insolvency risk even if underlying profitability is sound",
    type: "chain"
  },
  {
    front: "Trace the working capital cycle and how its management affects business health.",
    back: "Business purchases raw materials (cash outflow) → Materials are converted into finished goods (production period) → Finished goods are held as inventory before sale → Goods are sold to customers (often on trade credit) → Receivables period: business waits for customers to pay → Cash is finally received (cash inflow) → The shorter the working capital cycle, the less cash is tied up → Efficient management improves liquidity and reduces the need for external finance",
    type: "chain"
  },
];

// 21. Resource Management (3 chains)
const resourceManagementChains = [
  {
    front: "Trace the effect of switching from job production to flow production.",
    back: "Business switches from job production (one-off, customised) to flow production (continuous, standardised) → Division of labour and specialisation increase → Economies of scale are achieved → Average unit cost falls → Output volume increases significantly → However, products become less customised → Workers may experience lower motivation due to repetitive tasks → Quality control systems become essential to maintain standards",
    type: "chain"
  },
  {
    front: "Trace the effects of operating below full capacity utilisation.",
    back: "Business operates below full capacity → Fixed costs are spread over fewer units of output → Average fixed cost per unit is high → Unit costs rise → Profit margins are squeezed → Business becomes less price competitive compared to rivals operating at higher capacity → Options include: increasing demand through marketing, reducing capacity, or diversifying product range → Rationalisation (e.g. closing a production line) may be needed to improve efficiency",
    type: "chain"
  },
  {
    front: "Trace the effect of implementing a total quality management (TQM) system.",
    back: "Business adopts TQM — quality becomes every employee's responsibility → Employees are trained and empowered to identify and resolve quality issues → Defects and waste are reduced at every stage of production → Rework and returns fall, reducing costs → Customer satisfaction and brand reputation improve → Customer loyalty increases, boosting repeat sales → Long-run costs fall and revenues rise → Competitive advantage is strengthened",
    type: "chain"
  },
];

// 22. External Influences (3 chains)
const externalInfluencesChains = [
  {
    front: "Trace the effect of a rise in interest rates on a business.",
    back: "Central bank raises interest rates → Cost of existing variable-rate borrowing increases → Firms face higher loan repayment costs → Investment in new projects becomes less attractive (higher cost of capital) → Consumer spending falls (higher mortgage/credit costs) → Demand for the firm's products may fall → Revenue declines → Profit margins are squeezed → Firms may delay expansion plans or cut costs",
    type: "chain"
  },
  {
    front: "Trace the effect of a fall in the exchange rate on an exporting business.",
    back: "Exchange rate depreciates (e.g. pound falls against the dollar) → Price of exports in foreign currency falls (exports become cheaper abroad) → Quantity demanded by foreign buyers increases → Export revenue rises (in domestic currency) → However, cost of imported raw materials rises → Cost of production may increase → Overall impact on profit depends on the balance between higher revenue and higher input costs",
    type: "chain"
  },
  {
    front: "Trace the effect of new employment legislation (e.g. a rise in the minimum wage) on a business.",
    back: "Government introduces a higher national minimum wage → Labour costs rise for businesses employing low-wage workers → Total costs of production increase → Profit margins may be squeezed → Firms may raise prices (passing costs to consumers) → Alternatively, firms may seek to reduce staff numbers or invest in automation → However, higher wages may improve worker motivation and reduce labour turnover → Net effect depends on the size of the wage increase and the firm's ability to absorb or offset higher costs",
    type: "chain"
  },
];

// ═══════════════════════════════════════════════════════════
//  MAIN — Run all updates
// ═══════════════════════════════════════════════════════════

async function main() {
  console.log('Adding chain-of-analysis flashcards to all sections...\n');

  let totalAdded = 0;
  let successCount = 0;
  let failCount = 0;

  const sections = [
    // Economics Unit 1
    { id: 'introductory-concepts', chains: introductoryConceptsChains },
    { id: 'consumer-behaviour-demand', chains: consumerBehaviourDemandChains },
    { id: 'supply', chains: supplyChains },
    { id: 'price-determination', chains: priceDeterminationChains },
    { id: 'market-failure', chains: marketFailureChains },
    { id: 'government-intervention', chains: governmentInterventionChains },
    // Economics Unit 2
    { id: 'measures-economic-performance', chains: measuresEconomicPerformanceChains },
    { id: 'aggregate-demand', chains: aggregateDemandChains },
    { id: 'aggregate-supply', chains: aggregateSupplyChains },
    { id: 'national-income', chains: nationalIncomeChains },
    { id: 'economic-growth', chains: economicGrowthChains },
    { id: 'macroeconomic-objectives-policies', chains: macroeconomicObjectivesPoliciesChains },
    // Business Unit 1
    { id: 'meeting-customer-needs', chains: meetingCustomerNeedsChains },
    { id: 'the-market', chains: theMarketChains },
    { id: 'marketing-mix-strategy', chains: marketingMixStrategyChains },
    { id: 'managing-people', chains: managingPeopleChains },
    { id: 'entrepreneurs-leaders', chains: entrepreneursLeadersChains },
    // Business Unit 2
    { id: 'planning-raising-finance', chains: planningRaisingFinanceChains },
    { id: 'financial-planning', chains: financialPlanningChains },
    { id: 'managing-finance', chains: managingFinanceChains },
    { id: 'resource-management', chains: resourceManagementChains },
    { id: 'external-influences', chains: externalInfluencesChains },
  ];

  // Count total chains
  const totalChains = sections.reduce((sum, s) => sum + s.chains.length, 0);
  console.log(`Total chain flashcards to add: ${totalChains}\n`);

  for (const section of sections) {
    const ok = await addChains(section.id, section.chains);
    if (ok) {
      successCount++;
      totalAdded += section.chains.length;
    } else {
      failCount++;
    }
  }

  console.log(`\nDone! ${successCount}/${sections.length} sections updated successfully.`);
  console.log(`Total chain flashcards added: ${totalAdded}`);
  if (failCount > 0) {
    console.log(`Failed sections: ${failCount}`);
  }
}

main().catch(console.error);
