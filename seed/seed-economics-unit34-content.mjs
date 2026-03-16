import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Read .env.local
const envPath = resolve(import.meta.dirname, '../.env.local');
const envContent = readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, ...rest] = line.split('=');
  if (key && rest.length) env[key.trim()] = rest.join('=').trim();
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

// ═══════════════════════════════════════════════════════════════
// GLOSSARY TERMS — Units 3 & 4
// ═══════════════════════════════════════════════════════════════

const glossaryTerms = [
  // Unit 3: Types and Sizes of Businesses
  { term: 'Sole trader', definition: 'A business owned and run by one person with unlimited liability. The owner keeps all profits but is personally liable for all debts.' },
  { term: 'Partnership', definition: 'A business owned by two or more people who share profits, responsibilities, and liabilities. Most partnerships have unlimited liability.' },
  { term: 'Private limited company', definition: 'A company (Ltd) with limited liability whose shares are not publicly traded. Shareholders\' personal assets are protected from business debts.' },
  { term: 'Public limited company', definition: 'A company (plc) with limited liability whose shares are traded on the stock exchange, allowing it to raise large amounts of capital from the public.' },
  { term: 'Limited liability', definition: 'The legal protection whereby shareholders can only lose the amount they invested in the business, not their personal assets.' },
  { term: 'Unlimited liability', definition: 'When a business owner is personally responsible for all business debts, meaning personal assets can be seized to pay creditors.' },
  { term: 'State-owned enterprise', definition: 'A business owned and controlled by the government, typically operating in industries considered strategically important or natural monopolies.' },
  { term: 'Co-operative', definition: 'A business owned and democratically controlled by its members (workers, consumers, or producers), with each member having one vote regardless of investment.' },
  { term: 'Joint venture', definition: 'A strategic arrangement where two or more firms collaborate on a specific project or business activity while remaining independent entities.' },
  { term: 'Organic growth', definition: 'Business expansion using the firm\'s own resources — e.g. increasing output, opening new stores, developing new products. Also called internal growth.' },
  { term: 'Horizontal integration', definition: 'A merger between firms at the same stage of production in the same industry. E.g. two car manufacturers merging.' },
  { term: 'Vertical integration', definition: 'A merger between firms at different stages of production in the same industry. Forward = towards consumer; backward = towards raw materials.' },
  { term: 'Conglomerate integration', definition: 'A merger between firms in completely different industries, primarily motivated by risk diversification.' },
  { term: 'Demerger', definition: 'The splitting of a business into two or more separate, independent companies. May occur to improve focus, efficiency, or unlock shareholder value.' },
  { term: 'Profit maximisation', definition: 'The objective of producing at the output level where marginal cost equals marginal revenue (MC = MR), maximising the difference between total revenue and total cost.' },
  { term: 'Revenue maximisation', definition: 'The objective of producing at the output level where marginal revenue equals zero (MR = 0), maximising total revenue regardless of costs.' },
  { term: 'Sales maximisation', definition: 'The objective of selling the maximum volume of output, subject to making at least normal profit. Occurs where AC = AR.' },
  { term: 'Satisficing', definition: 'A behavioural theory where managers aim for satisfactory rather than maximum profits, pursuing other objectives like leisure, prestige, or market share.' },
  { term: 'Principal-agent problem', definition: 'A conflict of interest arising from the divorce of ownership and control, where managers (agents) may pursue their own objectives rather than those of shareholders (principals).' },

  // Unit 3: Revenue, Costs and Profits
  { term: 'Total revenue', definition: 'The total income a firm receives from selling its output. TR = Price × Quantity.' },
  { term: 'Average revenue', definition: 'Revenue per unit of output sold. AR = TR ÷ Q. Since TR = P × Q, AR always equals the price, so the AR curve is the demand curve.' },
  { term: 'Marginal revenue', definition: 'The additional revenue gained from selling one more unit of output. MR = ΔTR ÷ ΔQ. For a downward-sloping demand curve, MR lies below AR.' },
  { term: 'Total cost', definition: 'The sum of all costs of production. TC = Total Fixed Costs + Total Variable Costs.' },
  { term: 'Fixed costs', definition: 'Costs that do not change with output in the short run. E.g. rent, insurance, salaries of permanent staff.' },
  { term: 'Variable costs', definition: 'Costs that change directly with the level of output. E.g. raw materials, energy, wages of hourly workers.' },
  { term: 'Average cost', definition: 'The cost per unit of output. AC = TC ÷ Q. The AC curve is U-shaped due to the spread of fixed costs and eventually diminishing returns.' },
  { term: 'Marginal cost', definition: 'The additional cost of producing one more unit of output. MC = ΔTC ÷ ΔQ. The MC curve intersects AC at its minimum point.' },
  { term: 'Law of diminishing returns', definition: 'A short-run concept: as more units of a variable factor are added to a fixed factor, the marginal product of the variable factor eventually declines.' },
  { term: 'Economies of scale', definition: 'Reductions in long-run average cost as a firm increases its scale of production. Sources include technical, managerial, financial, marketing, and purchasing economies.' },
  { term: 'Diseconomies of scale', definition: 'Increases in long-run average cost as a firm grows beyond its optimal size, caused by communication problems, coordination difficulties, and X-inefficiency.' },
  { term: 'Minimum efficient scale', definition: 'The smallest level of output at which long-run average costs are minimised. Beyond this point, no further economies of scale are available.' },
  { term: 'Internal economies of scale', definition: 'Cost advantages that arise from within the firm as it grows larger. Types: technical, managerial, financial, marketing, purchasing, risk-bearing.' },
  { term: 'External economies of scale', definition: 'Cost advantages that arise from the growth of the industry as a whole, benefiting all firms. E.g. skilled labour pool, infrastructure, knowledge sharing.' },
  { term: 'Normal profit', definition: 'The minimum profit needed to keep a firm in the industry in the long run. It is the opportunity cost of the entrepreneur\'s capital and time. Occurs where AR = AC.' },
  { term: 'Supernormal profit', definition: 'Profit above normal profit, where total revenue exceeds total cost including normal profit. Also called abnormal or economic profit. Occurs where AR > AC.' },
  { term: 'Shutdown point', definition: 'In the short run, a firm shuts down if price falls below average variable cost (P < AVC). In the long run, a firm exits if price is below average cost (P < AC).' },

  // Unit 3: Market Structures and Contestability
  { term: 'Allocative efficiency', definition: 'Achieved when resources are allocated to produce the combination of goods most valued by society. Occurs where P = MC (price equals marginal cost).' },
  { term: 'Productive efficiency', definition: 'Achieved when a firm produces at the lowest possible average cost, using the minimum resources. Occurs at the minimum point of the AC curve.' },
  { term: 'Dynamic efficiency', definition: 'Efficiency over time, achieved when firms invest supernormal profits in research, development, and innovation to improve products and processes.' },
  { term: 'X-inefficiency', definition: 'When a firm operates above its lowest possible cost curve due to lack of competitive pressure, resulting in organisational slack and waste.' },
  { term: 'Concentration ratio', definition: 'The market share of the largest n firms in an industry. A high concentration ratio indicates an oligopolistic or monopolistic market structure.' },
  { term: 'Perfect competition', definition: 'A market structure with many small firms, identical products, perfect information, and no barriers to entry or exit. Firms are price takers.' },
  { term: 'Monopolistic competition', definition: 'A market structure with many firms selling differentiated products, relatively low barriers to entry, and some degree of market power.' },
  { term: 'Oligopoly', definition: 'A market structure dominated by a few large firms, characterised by high barriers to entry, interdependence, and the potential for collusion.' },
  { term: 'Monopoly', definition: 'A market structure with a single firm or a dominant firm (25%+ market share in UK law) that is the sole supplier of a product with no close substitutes.' },
  { term: 'Natural monopoly', definition: 'A market where the minimum efficient scale is so large relative to market demand that only one firm can operate profitably. Duplication of infrastructure would be wasteful.' },
  { term: 'Price discrimination', definition: 'When a firm charges different prices to different consumers for the same product, where the price difference is not due to cost differences.' },
  { term: 'Third-degree price discrimination', definition: 'Charging different prices to different groups of consumers based on their elasticity of demand. Requires market segmentation, prevention of resale, and market power.' },
  { term: 'Collusion', definition: 'When firms in an oligopoly cooperate to set prices or output levels, reducing competition. Can be formal (cartel) or informal (tacit).' },
  { term: 'Cartel', definition: 'A formal agreement between firms in an oligopoly to fix prices, restrict output, or divide markets. Illegal in most countries but difficult to detect.' },
  { term: 'Game theory', definition: 'The study of strategic decision-making where each firm\'s optimal decision depends on the actions of rival firms. Used to analyse oligopolistic behaviour.' },
  { term: 'Prisoner\'s dilemma', definition: 'A game theory model showing that individually rational decisions can lead to collectively suboptimal outcomes, explaining why cartels tend to break down.' },
  { term: 'Predatory pricing', definition: 'Setting prices below average cost to drive competitors out of the market, with the intention of raising prices once competition is eliminated.' },
  { term: 'Limit pricing', definition: 'Setting prices low enough to deter potential new entrants from entering the market, sacrificing short-term profits to maintain long-term market power.' },
  { term: 'Contestable market', definition: 'A market with low barriers to entry and exit and low sunk costs, where the threat of potential competition disciplines incumbent firms\' behaviour.' },
  { term: 'Sunk costs', definition: 'Costs that cannot be recovered if a firm exits the market. E.g. advertising expenditure, specialised equipment. High sunk costs reduce contestability.' },
  { term: 'Monopsony', definition: 'A market structure where there is only one buyer (or a dominant buyer). In labour markets, a monopsony employer can pay wages below the competitive level.' },
  { term: 'Barriers to entry', definition: 'Factors that make it difficult or costly for new firms to enter a market. E.g. economies of scale, patents, branding, sunk costs, legal barriers.' },

  // Unit 3: Labour Markets
  { term: 'Derived demand', definition: 'The demand for labour (or any factor of production) that arises from the demand for the final product it is used to produce.' },
  { term: 'Marginal revenue product', definition: 'The additional revenue a firm earns from employing one more worker. MRP = MPP × MR. A profit-maximising firm hires where MRP = W (the wage rate).' },
  { term: 'Marginal physical product', definition: 'The additional output produced by employing one more unit of a variable factor (e.g. one more worker). Also called marginal product.' },
  { term: 'Wage rate', definition: 'The price of labour, determined by the interaction of labour demand and supply in a competitive market, or by employer/union power in non-competitive markets.' },
  { term: 'Trade union', definition: 'An organisation of workers that collectively bargains with employers for higher wages, better working conditions, and employment protection.' },
  { term: 'Monopsony employer', definition: 'An employer with significant market power as the sole or dominant buyer of labour in a market, enabling it to pay wages below the competitive equilibrium.' },
  { term: 'Geographical immobility', definition: 'When workers cannot or will not move to where jobs are available, due to housing costs, family ties, regional attachments, or information gaps.' },
  { term: 'Occupational immobility', definition: 'When workers lack the skills, qualifications, or training needed to move between different types of jobs, causing structural unemployment.' },
  { term: 'Compensating wage differential', definition: 'Higher wages paid to workers in jobs with undesirable characteristics (danger, antisocial hours, unpleasant conditions) to attract sufficient labour supply.' },
  { term: 'Elasticity of demand for labour', definition: 'The responsiveness of the quantity of labour demanded to a change in the wage rate. Depends on ease of substitution, labour cost proportion, PED for the product, and time.' },

  // Unit 3: Government Intervention
  { term: 'Competition policy', definition: 'Government policies designed to promote competition and prevent the abuse of market power. Includes merger control, anti-cartel enforcement, and market investigations.' },
  { term: 'Privatisation', definition: 'The transfer of ownership of state-owned enterprises to the private sector, intended to improve efficiency through the profit motive and competitive pressure.' },
  { term: 'Nationalisation', definition: 'The transfer of private sector businesses into public (government) ownership, often to protect jobs, ensure universal access, or control natural monopolies.' },
  { term: 'Deregulation', definition: 'The removal or reduction of government regulations and barriers to entry in a market, intended to increase competition and reduce costs.' },
  { term: 'Regulatory capture', definition: 'When a regulator acts in the interests of the industry it is supposed to regulate, rather than in the public interest, due to lobbying or revolving-door employment.' },
  { term: 'Minimum wage', definition: 'A legally imposed price floor on wages. Effective only when set above the market equilibrium wage. Can increase or decrease employment depending on market structure.' },
  { term: 'Maximum wage', definition: 'A legally imposed price ceiling on wages. Effective only when set below the market equilibrium wage. Can cause labour shortages in affected occupations.' },
  { term: 'Competitive tendering', definition: 'A process where private firms bid to provide public sector services, aiming to reduce costs and improve efficiency through competitive pressure.' },

  // Unit 4: Causes and Effects of Globalisation
  { term: 'Globalisation', definition: 'The increasing integration and interdependence of world economies through the growth of international trade, capital flows, and migration.' },
  { term: 'Transnational corporation', definition: 'A large company that operates in multiple countries, with production facilities or operations outside its home country. Also called a multinational corporation (MNC).' },
  { term: 'Foreign direct investment', definition: 'Investment by a firm in productive capacity in another country, such as building factories, offices, or acquiring foreign businesses. Distinct from portfolio investment.' },
  { term: 'Trade liberalisation', definition: 'The removal or reduction of barriers to international trade, such as tariffs, quotas, and non-tariff barriers, to promote free trade.' },
  { term: 'Transfer pricing', definition: 'The practice by TNCs of manipulating prices charged between their own subsidiaries across countries to shift profits to low-tax jurisdictions, reducing overall tax liability.' },

  // Unit 4: Trade and the Global Economy
  { term: 'Absolute advantage', definition: 'When a country can produce a good using fewer resources than another country. A necessary but not sufficient condition for beneficial trade.' },
  { term: 'Comparative advantage', definition: 'When a country can produce a good at a lower opportunity cost than another country. The basis for mutually beneficial trade even when one country has absolute advantage in all goods.' },
  { term: 'Terms of trade', definition: 'The ratio of a country\'s export prices to its import prices. Calculated as (index of export prices ÷ index of import prices) × 100. An improvement means exports buy more imports.' },
  { term: 'Tariff', definition: 'A tax imposed on imported goods, raising the domestic price of imports to protect domestic producers. Creates deadweight loss and reduces consumer surplus.' },
  { term: 'Quota', definition: 'A physical limit on the quantity of a good that can be imported. Restricts supply, raises domestic prices, and protects domestic producers from foreign competition.' },
  { term: 'Non-tariff barrier', definition: 'Restrictions on imports other than tariffs, such as administrative rules, safety standards, labelling requirements, and bureaucratic procedures.' },
  { term: 'Dumping', definition: 'When a country exports goods at prices below the cost of production or below the domestic price, often to gain market share or dispose of surplus output.' },
  { term: 'Free trade area', definition: 'A group of countries that have eliminated tariffs and quotas between member states but maintain independent trade policies towards non-members. E.g. NAFTA/USMCA.' },
  { term: 'Customs union', definition: 'A group of countries with free trade between members and a common external tariff on imports from non-members. E.g. the EU Customs Union.' },
  { term: 'Common market', definition: 'A customs union that also allows the free movement of factors of production (labour and capital) between member states.' },
  { term: 'Economic and monetary union', definition: 'A common market with a shared currency and harmonised economic policies. E.g. the Eurozone.' },
  { term: 'Trade creation', definition: 'When joining a trading bloc leads to a shift from a high-cost domestic producer to a lower-cost producer within the bloc, increasing efficiency and welfare.' },
  { term: 'Trade diversion', definition: 'When joining a trading bloc leads to a shift from a lower-cost non-member producer to a higher-cost member producer due to the common external tariff, reducing efficiency.' },
  { term: 'World Trade Organization', definition: 'An international organisation that sets rules for global trade, facilitates trade negotiations, and provides a dispute settlement mechanism. Successor to GATT.' },
  { term: 'Infant industry argument', definition: 'The argument that new industries in developing countries need temporary protection from established foreign competitors until they achieve economies of scale and become competitive.' },

  // Unit 4: Balance of Payments, Exchange Rates
  { term: 'Current account', definition: 'Part of the balance of payments recording trade in goods and services, primary income (investment income), and secondary income (transfers).' },
  { term: 'Capital and financial account', definition: 'Part of the balance of payments recording capital transfers and transactions in financial assets (FDI, portfolio investment, reserve assets).' },
  { term: 'Floating exchange rate', definition: 'An exchange rate determined by market forces of supply and demand for the currency, without government intervention.' },
  { term: 'Fixed exchange rate', definition: 'An exchange rate set and maintained by the government or central bank at a specific level, using foreign currency reserves and interest rates.' },
  { term: 'Managed exchange rate', definition: 'An exchange rate that is primarily market-determined but with occasional government intervention to prevent excessive volatility or misalignment.' },
  { term: 'Appreciation', definition: 'An increase in the value of a currency under a floating exchange rate system, caused by market forces.' },
  { term: 'Depreciation', definition: 'A decrease in the value of a currency under a floating exchange rate system, caused by market forces.' },
  { term: 'Revaluation', definition: 'A deliberate increase in the value of a currency under a fixed exchange rate system, decided by the government.' },
  { term: 'Devaluation', definition: 'A deliberate decrease in the value of a currency under a fixed exchange rate system, decided by the government.' },
  { term: 'Marshall-Lerner condition', definition: 'A devaluation/depreciation will improve the current account only if the sum of the price elasticities of demand for exports and imports is greater than one (PEDx + PEDm > 1).' },
  { term: 'J-curve effect', definition: 'Following a depreciation, the current account initially worsens (due to inelastic demand in the short run) before improving as demand adjusts, creating a J-shaped pattern.' },
  { term: 'Purchasing power parity', definition: 'The theory that exchange rates adjust so that identical goods cost the same in different countries when expressed in a common currency. Used to compare living standards.' },
  { term: 'Capital flight', definition: 'The rapid movement of large sums of financial capital out of a country, typically due to political instability, economic crisis, or unfavourable policy changes.' },
  { term: 'International competitiveness', definition: 'A country\'s ability to sell its goods and services in international markets. Measured by relative unit labour costs, productivity, and export prices.' },
  { term: 'Quantitative easing', definition: 'An unconventional monetary policy where the central bank purchases government bonds to increase the money supply, lower interest rates, and stimulate economic activity.' },

  // Unit 4: Poverty and Inequality
  { term: 'Absolute poverty', definition: 'A condition where individuals cannot afford the basic necessities of life (food, shelter, clean water, healthcare). Measured against a fixed threshold (e.g. $2.15/day).' },
  { term: 'Relative poverty', definition: 'A condition where individuals have significantly less income than the average in their society. Often defined as below 60% of median household income.' },
  { term: 'Income inequality', definition: 'The unequal distribution of income across a population. Measured by the Gini coefficient and the Lorenz curve.' },
  { term: 'Wealth inequality', definition: 'The unequal distribution of assets (property, savings, investments) across a population. Typically more unequal than income distribution.' },
  { term: 'Lorenz curve', definition: 'A graphical representation of income or wealth distribution. The further the curve bows from the 45° line of perfect equality, the greater the inequality.' },
  { term: 'Gini coefficient', definition: 'A numerical measure of inequality ranging from 0 (perfect equality) to 1 (perfect inequality). Calculated as the ratio of the area between the Lorenz curve and the line of equality to the total area below the line.' },

  // Unit 4: Role of the State in the Macroeconomy
  { term: 'Capital expenditure', definition: 'Government spending on long-term assets such as infrastructure, buildings, and equipment that will provide benefits over many years.' },
  { term: 'Current expenditure', definition: 'Government spending on day-to-day items such as wages of public sector workers, consumables, and maintenance of existing services.' },
  { term: 'Transfer payments', definition: 'Payments from the government to individuals for which no goods or services are provided in return. E.g. pensions, unemployment benefits, disability allowance.' },
  { term: 'Progressive tax', definition: 'A tax where the proportion of income paid in tax rises as income increases. E.g. income tax with increasing marginal rates.' },
  { term: 'Regressive tax', definition: 'A tax where the proportion of income paid in tax falls as income increases. E.g. VAT takes a larger share of income from lower earners.' },
  { term: 'Proportional tax', definition: 'A tax where the proportion of income paid in tax remains constant regardless of income level. Also called a flat tax.' },
  { term: 'Laffer curve', definition: 'A curve showing the theoretical relationship between tax rates and total tax revenue. Suggests that beyond an optimal rate, higher taxes reduce revenue by discouraging economic activity.' },
  { term: 'Fiscal deficit', definition: 'When government spending exceeds tax revenue in a given year. Must be financed by borrowing, adding to the national debt.' },
  { term: 'National debt', definition: 'The total accumulated stock of government borrowing over time. The sum of all past fiscal deficits minus any surpluses.' },
  { term: 'Automatic stabilisers', definition: 'Fiscal mechanisms that automatically adjust government spending and tax revenue to stabilise the economy without deliberate policy action. E.g. benefits rise in recession, tax revenue falls.' },
  { term: 'Discretionary fiscal policy', definition: 'Deliberate changes in government spending or taxation to influence aggregate demand and achieve macroeconomic objectives.' },
  { term: 'Structural deficit', definition: 'The part of the fiscal deficit that persists even when the economy is at full employment. Caused by a fundamental imbalance between spending and revenue.' },
  { term: 'Cyclical deficit', definition: 'The part of the fiscal deficit caused by the economy being below full employment during a recession. Disappears when the economy recovers.' },
  { term: 'Crowding out', definition: 'When increased government borrowing leads to higher interest rates, which reduces private sector investment and consumption, partially offsetting the fiscal stimulus.' },

  // Unit 4: Growth and Development
  { term: 'Economic development', definition: 'A broader concept than economic growth, encompassing improvements in living standards, health, education, political freedom, and environmental quality.' },
  { term: 'Human Development Index', definition: 'A composite measure of development combining three dimensions: health (life expectancy), education (mean and expected years of schooling), and income (GNI per capita PPP). Ranges from 0 to 1.' },
  { term: 'Harrod-Domar model', definition: 'A growth model stating that economic growth depends on the level of savings (which determines investment) and the capital-output ratio. Growth = s/k where s = savings ratio, k = capital-output ratio.' },
  { term: 'Lewis dual-sector model', definition: 'A development model describing the structural transformation from a traditional agricultural sector (with surplus labour) to a modern industrial sector (with higher productivity).' },
  { term: 'Prebisch-Singer hypothesis', definition: 'The theory that the terms of trade for primary commodity exporters tend to decline over time relative to manufactured goods, trapping developing countries in poverty.' },
  { term: 'Primary product dependency', definition: 'When a developing country relies heavily on exports of raw materials and agricultural products, making it vulnerable to commodity price volatility and declining terms of trade.' },
  { term: 'Savings gap', definition: 'The difference between the level of savings needed for investment-led growth (as per the Harrod-Domar model) and the actual level of domestic savings in a developing country.' },
  { term: 'Foreign currency gap', definition: 'When a developing country lacks sufficient foreign exchange to import the capital goods and technology needed for economic development.' },
  { term: 'Microfinance', definition: 'The provision of small loans, savings accounts, and insurance products to low-income individuals and small businesses who lack access to traditional banking services.' },
  { term: 'Buffer stock scheme', definition: 'A system where a central authority buys and stores a commodity when prices are low and sells from stocks when prices are high, aiming to stabilise prices and producer incomes.' },
  { term: 'Debt relief', definition: 'The partial or total cancellation of debts owed by developing countries, freeing resources for investment in health, education, and infrastructure.' },
  { term: 'Non-governmental organisation', definition: 'A non-profit organisation independent of government, often involved in development work, humanitarian aid, and advocacy. E.g. Oxfam, Médecins Sans Frontières.' },
  { term: 'International Monetary Fund', definition: 'An international institution that provides financial assistance and policy advice to countries facing balance of payments difficulties, often with conditions attached (structural adjustment).' },
  { term: 'World Bank', definition: 'An international institution that provides loans and grants to developing countries for capital projects and development programmes, aiming to reduce poverty.' },
];

// ═══════════════════════════════════════════════════════════════
// COMMON MISTAKES — Units 3 & 4
// ═══════════════════════════════════════════════════════════════

const commonMistakes = {
  'types-sizes-businesses': [
    {
      title: 'Confusing limited and unlimited liability',
      mistake: 'Students say sole traders have limited liability, or that shareholders in a plc can lose their personal assets.',
      correction: 'Sole traders and most partnerships have unlimited liability — personal assets are at risk. Shareholders in Ltd and plc companies have limited liability — they can only lose the amount they invested.',
      examTip: 'Link liability to the type of business: sole trader/partnership = unlimited; Ltd/plc = limited. This affects willingness to invest and take risks.',
    },
    {
      title: 'Not distinguishing between types of merger',
      mistake: 'Students describe a merger generically without identifying whether it is horizontal, vertical (forward or backward), or conglomerate.',
      correction: 'Always identify the type: horizontal = same stage; forward vertical = towards consumer; backward vertical = towards supplier; conglomerate = different industries. Each has different advantages and disadvantages.',
      examTip: 'In an essay about mergers, identify the type first, then analyse the specific advantages and disadvantages relevant to that type. Generic answers score poorly.',
    },
    {
      title: 'Ignoring the principal-agent problem',
      mistake: 'Students assume all firms maximise profit without considering that managers may pursue other objectives.',
      correction: 'In large companies, ownership is divorced from control. Managers (agents) may satisfice, maximise revenue, or pursue personal objectives rather than the profit-maximising output preferred by shareholders (principals).',
    },
    {
      title: 'Forgetting constraints on business growth',
      mistake: 'Students assume all firms want to and can grow indefinitely.',
      correction: 'Growth is constrained by: market size, access to finance, owner objectives (lifestyle businesses), government regulation, and diseconomies of scale. Some firms deliberately remain small.',
    },
  ],
  'revenue-costs-profits': [
    {
      title: 'Drawing MR above AR for a downward-sloping demand curve',
      mistake: 'Students draw MR above or equal to AR when the demand curve slopes downward.',
      correction: 'For a price-maker (downward-sloping demand), MR is always below AR (except at the first unit). The MR curve has twice the gradient of a linear AR curve. MR = AR only in perfect competition.',
      examTip: 'For a linear demand curve: if AR = a - bQ, then MR = a - 2bQ. MR starts at the same intercept but falls twice as fast.',
    },
    {
      title: 'Confusing short-run and long-run cost curves',
      mistake: 'Students use diminishing returns to explain the shape of the LRAC curve, or use economies of scale to explain short-run cost curves.',
      correction: 'Short-run: at least one factor is fixed → diminishing returns → U-shaped SRAC. Long-run: all factors variable → economies/diseconomies of scale → U-shaped LRAC. The LRAC is the envelope of all SRAC curves.',
    },
    {
      title: 'Forgetting that normal profit is included in costs',
      mistake: 'Students treat normal profit as something separate from or additional to total costs.',
      correction: 'Normal profit is the opportunity cost of the entrepreneur and is included in the cost curves. When AR = AC, the firm earns exactly normal profit. Supernormal profit is the additional profit above this.',
      examTip: 'When AR = AC → normal profit (zero economic profit). When AR > AC → supernormal profit. When AR < AC → losses (sub-normal profit).',
    },
    {
      title: 'Confusing the shutdown rule',
      mistake: 'Students say a firm shuts down whenever it makes a loss, regardless of the time horizon.',
      correction: 'Short-run shutdown: P < AVC (cannot cover variable costs). The firm continues if AVC < P < AC because it covers variable costs and some fixed costs. Long-run shutdown: P < AC (firm exits the industry).',
    },
  ],
  'market-structures-contestability': [
    {
      title: 'Not clearly stating the assumptions of each market structure',
      mistake: 'Students analyse market behaviour without first stating the relevant assumptions, losing definition marks.',
      correction: 'Always state assumptions: Perfect competition = many firms, homogeneous product, perfect info, free entry/exit. Monopoly = single seller, high barriers, no close substitutes. Oligopoly = few large firms, high barriers, interdependence.',
      examTip: 'Start market structure essays by listing 2-3 key assumptions. This sets up your analysis and earns easy marks.',
    },
    {
      title: 'Saying monopoly is always bad for consumers',
      mistake: 'Students give a one-sided view that monopoly always leads to higher prices and lower output without considering dynamic efficiency.',
      correction: 'Evaluate: monopolies may invest supernormal profits in R&D (dynamic efficiency), achieve economies of scale (lower costs), and cross-subsidise loss-making services. Natural monopolies can be more efficient than multiple firms.',
    },
    {
      title: 'Confusing the kinked demand curve model with game theory',
      mistake: 'Students mix up these two models of oligopoly behaviour.',
      correction: 'The kinked demand curve explains price rigidity (rivals match price cuts but not rises). Game theory (prisoner\'s dilemma) explains why firms may collude or compete. They are complementary but distinct models.',
    },
    {
      title: 'Forgetting the conditions for price discrimination',
      mistake: 'Students describe price discrimination without stating the necessary conditions.',
      correction: 'Three conditions: (1) the firm must have market power (price maker), (2) consumers must have different price elasticities of demand (market segmentation), (3) resale must be prevented (arbitrage impossible).',
    },
  ],
  'labour-markets': [
    {
      title: 'Forgetting that labour demand is a derived demand',
      mistake: 'Students analyse labour demand without linking it to the demand for the product the workers produce.',
      correction: 'Always state that labour demand is derived demand — it depends on the demand for the final product. If product demand falls, the MRP of workers falls, so fewer workers are demanded at any given wage.',
      examTip: 'Chain: product demand ↑ → product price ↑ → MRP ↑ → labour demand ↑ → wage ↑ and/or employment ↑.',
    },
    {
      title: 'Not using MRP = W for profit-maximising employment',
      mistake: 'Students say firms hire "as many workers as possible" or "until productivity stops increasing".',
      correction: 'A profit-maximising firm hires where MRP = W. If MRP > W, hiring one more worker adds more to revenue than cost. If MRP < W, the worker costs more than they generate.',
    },
    {
      title: 'Assuming minimum wage always causes unemployment',
      mistake: 'Students apply the competitive model conclusion (NMW above equilibrium = unemployment) to all situations.',
      correction: 'In a monopsony, a minimum wage set between Wm and Wc can increase both wages AND employment. The effect depends on the market structure. Always state assumptions.',
      examTip: 'This is a key evaluation point. In competitive markets, NMW causes unemployment. In monopsony, it can increase employment. The real world is usually between these extremes.',
    },
    {
      title: 'Confusing geographical and occupational immobility',
      mistake: 'Students mix up the two types of labour market failure.',
      correction: 'Geographical immobility = workers cannot move location (housing costs, family ties). Occupational immobility = workers lack skills for available jobs (skills mismatch). Different policies address each.',
    },
  ],
  'government-intervention-firms': [
    {
      title: 'Not evaluating the effectiveness of government intervention',
      mistake: 'Students describe what a policy does but fail to assess whether it works in practice.',
      correction: 'Always evaluate: regulatory capture (regulators serving industry interests), information asymmetries (government may lack information), unintended consequences, time lags, and the costs of implementation.',
      examTip: 'For every policy, give at least one reason why it might fail. This demonstrates evaluative skill and earns top marks.',
    },
    {
      title: 'Confusing privatisation and deregulation',
      mistake: 'Students use these terms interchangeably.',
      correction: 'Privatisation = transferring ownership from public to private sector. Deregulation = removing legal barriers to entry. A market can be deregulated without being privatised, and vice versa.',
    },
    {
      title: 'One-sided arguments about minimum wage',
      mistake: 'Students argue that minimum wage is either always good or always bad without considering different market structures.',
      correction: 'In a competitive market, NMW above equilibrium reduces employment. In a monopsony, NMW can increase employment. The net effect depends on the magnitude of the wage increase, the market structure, and the elasticity of labour demand.',
    },
  ],
  'causes-effects-globalisation': [
    {
      title: 'Treating globalisation as purely economic',
      mistake: 'Students only discuss trade and FDI without mentioning political, social, and technological dimensions.',
      correction: 'Globalisation has economic (trade, FDI), political (trade liberalisation, WTO), technological (internet, transport), and social (migration, cultural exchange) dimensions. A complete answer covers multiple dimensions.',
    },
    {
      title: 'Not distinguishing between different types of FDI',
      mistake: 'Students discuss FDI generically without considering whether it is greenfield investment or mergers/acquisitions.',
      correction: 'Greenfield FDI (building new facilities) tends to create more jobs and technology transfer. M&A FDI (buying existing firms) may lead to rationalisation and job cuts. The type of FDI matters for evaluating impact.',
    },
    {
      title: 'Assuming globalisation benefits all countries equally',
      mistake: 'Students say globalisation increases growth without noting the uneven distribution of gains.',
      correction: 'Globalisation tends to benefit countries with strong institutions, skilled labour, and good infrastructure more. LDCs may be exploited through unfair terms of trade, environmental degradation, and loss of tax revenue.',
    },
  ],
  'trade-global-economy': [
    {
      title: 'Confusing absolute and comparative advantage',
      mistake: 'Students say countries trade based on who can produce more (absolute advantage) rather than who has the lower opportunity cost.',
      correction: 'Trade is based on comparative advantage (lowest opportunity cost), NOT absolute advantage. Even if Country A is better at producing everything, both countries benefit if each specialises in the good with the lowest opportunity cost.',
      examTip: 'When calculating comparative advantage, always work out the opportunity cost of producing each good in each country. The country with the lower opportunity cost has comparative advantage in that good.',
    },
    {
      title: 'Not showing deadweight loss on a tariff diagram',
      mistake: 'Students draw the tariff diagram but forget to identify and shade the deadweight loss triangles.',
      correction: 'A tariff creates TWO deadweight loss triangles: one representing lost consumer surplus (production inefficiency) and one representing lost consumer surplus (consumption inefficiency). Mark both clearly.',
    },
    {
      title: 'Confusing trade creation and trade diversion',
      mistake: 'Students mix up these concepts when evaluating trading blocs.',
      correction: 'Trade creation = switching from a high-cost domestic producer to a lower-cost bloc member (good). Trade diversion = switching from a low-cost non-member to a higher-cost bloc member due to the common external tariff (bad).',
    },
  ],
  'balance-payments-exchange-rates': [
    {
      title: 'Forgetting the J-curve when discussing depreciation',
      mistake: 'Students assume depreciation immediately improves the current account.',
      correction: 'In the short run, depreciation may worsen the current account (J-curve effect) because demand is price inelastic — import prices rise but volumes take time to adjust. The current account only improves once demand becomes more elastic.',
      examTip: 'Always mention the J-curve and Marshall-Lerner condition when discussing depreciation and the current account. These are key evaluation tools.',
    },
    {
      title: 'Confusing appreciation/depreciation with revaluation/devaluation',
      mistake: 'Students use these terms interchangeably.',
      correction: 'Appreciation/depreciation = market-driven changes under a FLOATING exchange rate. Revaluation/devaluation = government decisions under a FIXED exchange rate. The mechanism is different.',
    },
    {
      title: 'Not stating the Marshall-Lerner condition precisely',
      mistake: 'Students say "depreciation improves the current account" without stating the condition.',
      correction: 'A depreciation only improves the current account if the sum of PED for exports and PED for imports is greater than 1 (PEDx + PEDm > 1). This is the Marshall-Lerner condition.',
    },
  ],
  'poverty-inequality': [
    {
      title: 'Confusing absolute and relative poverty',
      mistake: 'Students define absolute poverty as "being poor" without using the fixed threshold, or confuse relative poverty with inequality.',
      correction: 'Absolute poverty = inability to afford basic necessities, measured against a fixed threshold (e.g. $2.15/day). Relative poverty = having less than the societal norm, measured against median income (e.g. below 60% of median). A country can eliminate absolute poverty while relative poverty remains.',
      examTip: 'Economic growth tends to reduce absolute poverty but may increase relative poverty if gains are unequally distributed.',
    },
    {
      title: 'Not interpreting the Lorenz curve correctly',
      mistake: 'Students confuse which axis shows cumulative income and which shows cumulative population, or cannot identify what a shift means.',
      correction: 'X-axis = cumulative % of population (from poorest to richest). Y-axis = cumulative % of income. The 45° line = perfect equality. The further the Lorenz curve bows from the 45° line, the greater the inequality.',
    },
    {
      title: 'Treating inequality as always negative',
      mistake: 'Students assume inequality is always bad without considering potential benefits.',
      correction: 'Some inequality can incentivise enterprise, risk-taking, and hard work (reward for effort). Evaluate: excessive inequality can reduce social cohesion, limit access to education, and reduce aggregate demand, but zero inequality may reduce incentives.',
    },
  ],
  'role-state-macroeconomy': [
    {
      title: 'Confusing fiscal deficit with national debt',
      mistake: 'Students use "deficit" and "debt" interchangeably.',
      correction: 'The fiscal deficit is the annual shortfall (G > T in one year). The national debt is the total accumulated stock of borrowing over all years. A country can reduce its deficit while its debt continues to grow.',
      examTip: 'An analogy: the deficit is how much you overspend this month; the debt is the total balance on your credit card.',
    },
    {
      title: 'Not explaining the Laffer curve correctly',
      mistake: 'Students draw the Laffer curve but cannot explain why tax revenue falls at high rates.',
      correction: 'At very high tax rates, revenue falls because: workers reduce effort or emigrate, firms relocate, tax avoidance/evasion increases, and the tax base shrinks. The optimal rate maximises revenue — but its exact position is debated.',
    },
    {
      title: 'Confusing structural and cyclical deficits',
      mistake: 'Students do not distinguish between the two types of fiscal deficit.',
      correction: 'Cyclical deficit = caused by recession (automatic stabilisers increase spending, reduce tax revenue). Structural deficit = persists even at full employment, caused by a fundamental imbalance. Different policy responses are needed.',
    },
    {
      title: 'Ignoring crowding out when evaluating fiscal policy',
      mistake: 'Students say expansionary fiscal policy always increases output without considering the crowding out effect.',
      correction: 'Government borrowing may raise interest rates, reducing private sector investment (financial crowding out) and consumption. The net stimulus may be smaller than the initial injection.',
    },
  ],
  'growth-development': [
    {
      title: 'Confusing economic growth with economic development',
      mistake: 'Students use these terms interchangeably.',
      correction: 'Growth = increase in real GDP (quantitative). Development = broader improvement in living standards, health, education, political freedom, and environmental quality (qualitative). A country can have growth without development.',
      examTip: 'Growth is necessary but not sufficient for development. Always explain that development requires growth to be inclusive, sustainable, and distributed across the population.',
    },
    {
      title: 'Not stating the limitations of the HDI',
      mistake: 'Students use HDI uncritically as a perfect measure of development.',
      correction: 'HDI limitations: uses averages (hides inequality within countries), limited to three indicators (ignores environment, political freedom, safety), data quality varies between countries, and the weighting of indicators is arbitrary.',
    },
    {
      title: 'Over-relying on the Harrod-Domar model',
      mistake: 'Students present Harrod-Domar as a complete explanation of growth without noting its assumptions and limitations.',
      correction: 'Harrod-Domar assumes: savings are automatically channelled into investment (may not be true in LDCs with poor financial systems), a constant capital-output ratio (unrealistic), and does not account for institutional factors, governance, or human capital.',
    },
    {
      title: 'Not evaluating aid critically',
      mistake: 'Students say aid either always helps or always hinders development without nuance.',
      correction: 'Aid can help if: well-targeted, supports infrastructure/education, and builds capacity. Aid can harm if: it creates dependency, enables corruption, distorts markets, or comes with conditions that serve donor interests. The type and quality of aid matters.',
    },
  ],
};


// ═══════════════════════════════════════════════════════════════
// SEED FUNCTION
// ═══════════════════════════════════════════════════════════════

async function seed() {
  console.log('🌱 Seeding Units 3 & 4 glossary terms and common mistakes...\n');

  // Get the economics subject ID
  const { data: subjectData } = await supabase.from('subjects').select('id').eq('slug', 'economics').single();
  const economicsSubjectId = subjectData?.id;
  if (!economicsSubjectId) {
    console.error('  ✗ Could not find economics subject ID');
    return;
  }
  console.log(`  Found economics subject_id: ${economicsSubjectId}`);

  // Glossary terms — check for existing and insert only new ones
  console.log('Seeding glossary terms...');
  const { data: existingTerms } = await supabase
    .from('glossary_terms')
    .select('term')
    .eq('subject_id', economicsSubjectId);
  const existingSet = new Set((existingTerms || []).map(t => t.term));
  const newTerms = glossaryTerms
    .filter(t => !existingSet.has(t.term))
    .map(t => ({ ...t, subject_id: economicsSubjectId }));

  if (newTerms.length === 0) {
    console.log('  ✓ All glossary terms already exist, skipping.');
  } else {
    const { error: gtError } = await supabase
      .from('glossary_terms')
      .insert(newTerms);
    if (gtError) {
      console.error(`  ✗ Glossary insert error: ${gtError.message}`);
    } else {
      console.log(`  ✓ ${newTerms.length} new glossary terms inserted (${existingSet.size} already existed)`);
    }
  }

  // Common mistakes — upsert per section
  console.log('\nSeeding common mistakes...');
  for (const [sectionId, data] of Object.entries(commonMistakes)) {
    const { error } = await supabase
      .from('section_common_mistakes')
      .upsert({ section_id: sectionId, data }, { onConflict: 'section_id' });
    if (error) {
      console.error(`  ✗ ${sectionId}: ${error.message}`);
    } else {
      console.log(`  ✓ ${sectionId}: ${data.length} mistakes`);
    }
  }

  console.log('\n🎉 Done!');
}

seed().catch(console.error);
