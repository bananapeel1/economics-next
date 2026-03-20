/**
 * UPDATE NOTES — Business Unit 1 (All 5 Sections)
 * =================================================
 * Edexcel IAL Business Unit 1
 * Sections: meeting-customer-needs, the-market, marketing-mix-strategy,
 *           managing-people, entrepreneurs-leaders
 *
 * Run with: node scripts/update-business-unit1-notes.mjs
 */

import { supabase } from './_db.mjs';

/* ═══════════════════════════════════════════════════════════
 *  SECTION NOTES — Business Unit 1
 *
 *  Rules:
 *  - Every glossary term is wrapped in <strong> on first use
 *  - 5-8 subsections per section, 4-6 points each
 *  - 1-2 sentences per bullet (concise revision notes)
 *  - All key Edexcel IAL spec terms covered
 * ═══════════════════════════════════════════════════════════ */

const SECTIONS = {

/* ─────────────────────────────────────────────────
 *  1. MEETING CUSTOMER NEEDS (1.1)
 * ───────────────────────────────────────────────── */
'meeting-customer-needs': [
  {
    title: 'The Market',
    points: [
      `A <strong>mass market</strong> targets the widest possible audience with standardised products, allowing firms to benefit from high sales volumes and lower unit costs through <strong>economies of scale</strong>.`,
      `A <strong>niche market</strong> is a small, specialised segment of a larger market where firms meet specific customer needs, often charging premium prices due to less direct competition.`,
      `A <strong>dynamic market</strong> is one that is subject to rapid and continuous change, driven by shifts in technology, consumer tastes, or competition — firms must adapt or risk losing market share.`,
      `Mass markets offer high revenue potential but face intense competition, while niche markets allow small firms to build loyalty but limit growth opportunities.`,
      `Online retailing and globalisation have made many markets more dynamic, shortening product life cycles and forcing businesses to innovate constantly.`
    ]
  },
  {
    title: 'Market Research',
    points: [
      `<strong>Market research</strong> is the systematic gathering, recording and analysing of data about customers, competitors and the market to inform business decisions.`,
      `Primary research (field research) collects new, first-hand data through surveys, interviews, focus groups and observations — it is specific and up-to-date but expensive and time-consuming.`,
      `Secondary research (desk research) uses existing data such as government statistics, trade publications and competitor reports — it is cheaper and quicker but may be outdated or not tailored to the firm's needs.`,
      `Quantitative data provides numerical, measurable results (e.g. "60% of customers prefer brand A"), while qualitative data explores opinions, motivations and attitudes in depth.`,
      `Effective market research reduces the risk of product failure by helping firms understand customer needs, identify gaps in the market and anticipate changes in demand.`
    ]
  },
  {
    title: 'Market Positioning',
    points: [
      `<strong>Market mapping</strong> is a technique that plots products or brands on a grid using two key variables (e.g. price vs. quality) to identify gaps in the market and position a product against competitors.`,
      `<strong>Product orientation</strong> means a firm focuses on developing the product first and then tries to find a market for it — common in tech and pharmaceutical industries where innovation drives the business.`,
      `<strong>Market orientation</strong> means the firm identifies customer needs and wants first, then develops products to meet them — this approach reduces the risk of launching products nobody wants.`,
      `<strong>Product differentiation</strong> is the process of making a product distinct from competitors through design, features, quality, branding or customer service to gain a <strong>competitive advantage</strong>.`,
      `A <strong>unique selling point</strong> (USP) is a distinctive feature that makes a product stand out from rivals and gives customers a clear reason to choose it over alternatives.`,
      `Effective positioning combines market research insights with a clear USP to ensure the product meets an identified customer need and stands apart in a competitive market.`
    ]
  },
  {
    title: 'Market Size, Share and Growth',
    points: [
      `<strong>Market size</strong> is the total volume or value of sales in a market over a given period — it can be measured by total units sold (volume) or total revenue generated (value).`,
      `<strong>Market share</strong> is the proportion of total market sales held by one firm or product, calculated as: (firm's sales / total market sales) x 100.`,
      `<strong>Market growth</strong> is the percentage increase in the total size of a market over a given time period, calculated as: ((new size - old size) / old size) x 100.`,
      `A rising market share in a growing market is the strongest position — it means the firm is outperforming competitors in an expanding market.`,
      `Market size data helps firms forecast demand, set realistic sales targets and decide whether a market is worth entering.`
    ]
  },
  {
    title: 'Branding',
    points: [
      `<strong>Branding</strong> is the process of creating a distinctive name, logo, image and reputation that differentiates a product from its competitors in the minds of consumers.`,
      `Strong brands build customer loyalty, allow premium pricing, and create <strong>barriers to entry</strong> that make it harder for new firms to compete in the market.`,
      `Brand extension involves using an established brand name to launch products in new categories (e.g. Virgin expanding from music into airlines and gyms), reducing the cost and risk of entering new markets.`,
      `Building a brand requires consistent investment in quality, marketing and customer experience — a damaged brand reputation (e.g. through a product recall) can destroy years of brand equity.`
    ]
  }
],

/* ─────────────────────────────────────────────────
 *  2. THE MARKET (1.2)
 * ───────────────────────────────────────────────── */
'the-market': [
  {
    title: 'Demand',
    points: [
      `<strong>Demand</strong> is the quantity of a good or service that consumers are willing and able to buy at a given price in a given time period.`,
      `The demand curve slopes downward from left to right — as price falls, quantity demanded rises, and vice versa (the law of demand).`,
      `A movement along the demand curve is caused by a change in the product's own price; a shift of the entire curve is caused by non-price factors such as income, tastes, or the price of substitutes and complements.`,
      `Factors that shift demand include changes in consumer income, population size, advertising, fashion, and the price of related goods.`,
      `Businesses use demand data to set prices, plan production levels and forecast future revenue.`
    ]
  },
  {
    title: 'Supply',
    points: [
      `<strong>Supply</strong> is the quantity of a good or service that producers are willing and able to offer for sale at a given price in a given time period.`,
      `The supply curve slopes upward from left to right — as price rises, firms are incentivised to supply more because higher prices mean greater potential profit.`,
      `A movement along the supply curve is caused by a change in the product's own price; a shift of the entire curve is caused by non-price factors such as changes in costs, technology, or government policy.`,
      `Factors that shift supply include changes in raw material costs, wages, technology, taxes, subsidies, and the number of firms in the market.`,
      `Understanding supply conditions helps businesses anticipate cost pressures and plan their competitive strategy.`
    ]
  },
  {
    title: 'Market Equilibrium',
    points: [
      `Equilibrium occurs where the demand curve and supply curve intersect — at this point, the quantity consumers wish to buy equals the quantity producers wish to sell, and there is no tendency for price to change.`,
      `If price is above equilibrium, there is a surplus (excess supply) — unsold stock forces firms to lower prices until equilibrium is restored.`,
      `If price is below equilibrium, there is a shortage (excess demand) — customers competing for limited stock drive prices up until equilibrium is restored.`,
      `Shifts in demand or supply cause the equilibrium price and quantity to change — for example, an increase in demand (rightward shift) raises both equilibrium price and quantity.`,
      `In a <strong>dynamic market</strong>, equilibrium is constantly changing as consumer preferences, technology and competition evolve.`
    ]
  },
  {
    title: 'Price Elasticity of Demand (PED)',
    points: [
      `<strong>Price elasticity of demand</strong> (PED) measures how responsive the quantity demanded is to a change in price, calculated as: % change in quantity demanded / % change in price.`,
      `If PED > 1, demand is price elastic — a small change in price causes a proportionally larger change in quantity demanded (e.g. luxury goods with many substitutes).`,
      `If PED < 1, demand is price inelastic — quantity demanded changes proportionally less than price (e.g. necessities like petrol or bread).`,
      `The key determinants of PED are: availability of substitutes, whether the good is a necessity or luxury, the proportion of income spent on it, brand loyalty, and the time period considered.`,
      `PED matters for pricing decisions — if demand is inelastic, a firm can raise prices to increase total revenue; if elastic, cutting prices may boost total revenue.`,
      `<strong>Revenue</strong> is the total income a business receives from selling its goods or services, calculated as price x quantity sold — PED directly affects how price changes impact revenue.`
    ]
  },
  {
    title: 'Income Elasticity of Demand (YED)',
    points: [
      `<strong>Income elasticity of demand</strong> (YED) measures how responsive quantity demanded is to a change in consumer income, calculated as: % change in quantity demanded / % change in income.`,
      `Normal goods have a positive YED — demand rises as income rises. Luxury goods (YED > 1) are income elastic, while necessities (0 < YED < 1) are income inelastic.`,
      `Inferior goods have a negative YED — demand falls as income rises because consumers switch to higher-quality alternatives (e.g. switching from supermarket own-brand to premium products).`,
      `YED helps firms predict how changes in the economy (recession or boom) will affect demand for their products and plan their product portfolio accordingly.`,
      `Firms selling income-elastic luxury goods are more vulnerable to economic downturns, while those selling income-inelastic necessities enjoy more stable demand.`
    ]
  },
  {
    title: 'Sensitivity of Demand and Business Decisions',
    points: [
      `Understanding both PED and YED enables businesses to make better pricing, marketing and product development decisions.`,
      `Firms with price-inelastic products (e.g. strong brands, addictive goods) have greater pricing power and can increase prices without significantly losing customers.`,
      `Businesses can reduce PED by building strong <strong>branding</strong>, creating <strong>product differentiation</strong>, and developing customer loyalty to make demand less sensitive to price changes.`,
      `During economic growth, firms with income-elastic products should expand capacity; during recession, they should diversify into income-inelastic goods to stabilise revenue.`
    ]
  }
],

/* ─────────────────────────────────────────────────
 *  3. MARKETING MIX & STRATEGY (1.3)
 * ───────────────────────────────────────────────── */
'marketing-mix-strategy': [
  {
    title: 'Marketing Objectives and Strategy',
    points: [
      `<strong>Marketing strategy</strong> is the long-term plan a firm uses to achieve its marketing objectives by identifying target markets, positioning products and deploying the marketing mix.`,
      `Common marketing objectives include increasing <strong>market share</strong>, building brand awareness, entering new markets, and increasing customer loyalty.`,
      `A <strong>SWOT analysis</strong> identifies a firm's internal Strengths and Weaknesses and external Opportunities and Threats to inform strategic marketing decisions.`,
      `Marketing strategy must align with overall business objectives and be adapted as market conditions change — a strategy that ignores a <strong>dynamic market</strong> will quickly become outdated.`,
      `The marketing mix (product, price, place, promotion) must work together as an integrated strategy — an expensive product needs premium promotion and selective distribution, not a pile-them-high approach.`
    ]
  },
  {
    title: 'Product Design and the Product Life Cycle',
    points: [
      `Good product design balances three factors: function (does it work?), aesthetics (does it look appealing?), and cost (can it be manufactured economically?).`,
      `The <strong>product life cycle</strong> shows the stages a product passes through from launch to decline: development, introduction, growth, maturity, and decline — each stage requires a different marketing approach.`,
      `During introduction, sales are low and promotion costs are high; during growth, sales rise rapidly and profits increase; at maturity, sales peak but competition intensifies; in decline, sales and profits fall.`,
      `Extension strategies (e.g. new packaging, finding new markets, adding features) aim to extend the maturity phase and delay decline.`,
      `The <strong>Boston Matrix</strong> classifies products by market share and market growth into four categories: Stars (high share, high growth), Cash Cows (high share, low growth), Question Marks (low share, high growth), and Dogs (low share, low growth).`,
      `The Boston Matrix helps firms manage their product portfolio — profits from Cash Cows can fund investment in Stars and Question Marks, while Dogs may be discontinued.`
    ]
  },
  {
    title: 'Pricing Strategies',
    points: [
      `<strong>Penetration pricing</strong> sets an initially low price to attract customers and gain <strong>market share</strong> quickly, then raises the price once a customer base is established — effective in competitive mass markets.`,
      `<strong>Price skimming</strong> sets a high initial price to maximise revenue from early adopters willing to pay a premium, then gradually lowers the price to attract more price-sensitive customers — common for new technology products.`,
      `Competitive pricing sets the price in line with or just below competitors to remain attractive without starting a price war.`,
      `Cost-plus pricing adds a fixed percentage mark-up to the unit cost to ensure a profit margin — simple to calculate but ignores demand conditions and competitor pricing.`,
      `The choice of pricing strategy depends on PED, the level of competition, brand strength, product life cycle stage, and business objectives (e.g. maximising profit vs. maximising market share).`
    ]
  },
  {
    title: 'Promotion',
    points: [
      `<strong>Promotion</strong> is the range of activities used to communicate with customers, raise awareness and persuade them to buy, including advertising, sales promotion, personal selling, public relations and digital marketing.`,
      `Above-the-line promotion uses mass media (TV, radio, newspapers, billboards) to reach a wide audience — suited to <strong>mass market</strong> products but expensive.`,
      `Below-the-line promotion targets specific groups through direct mail, sponsorship, loyalty schemes and social media — more cost-effective and measurable for <strong>niche market</strong> firms.`,
      `Digital and social media marketing has transformed promotion, allowing firms to target specific demographics, measure engagement precisely, and build two-way relationships with customers at relatively low cost.`,
      `The promotional mix should be appropriate to the product, target market, budget and stage in the <strong>product life cycle</strong> — heavy promotion is needed at launch, less at maturity.`
    ]
  },
  {
    title: 'Distribution (Place)',
    points: [
      `A <strong>distribution channel</strong> is the route a product takes from producer to consumer — common channels include direct selling, retailers, wholesalers, agents, and e-commerce.`,
      `Short distribution channels (producer to consumer) give the firm more control over pricing and customer experience but limit market reach.`,
      `Long distribution channels (producer to wholesaler to retailer to consumer) extend market coverage but each intermediary takes a margin, increasing the final price.`,
      `E-commerce has revolutionised distribution by allowing firms of all sizes to sell directly to customers globally, reducing reliance on physical retailers and cutting distribution costs.`,
      `The choice of distribution channel depends on the product type, target market, business size, and whether the firm prioritises control, coverage, or cost.`
    ]
  },
  {
    title: 'Costs and Revenue',
    points: [
      `<strong>Variable costs</strong> change in direct proportion to output — examples include raw materials, packaging, and direct labour (piece-rate workers).`,
      `<strong>Fixed costs</strong> remain constant regardless of output in the short run — examples include rent, salaries, insurance, and loan repayments.`,
      `Total costs = fixed costs + variable costs. Average cost = total cost / output. Understanding cost structure is essential for pricing decisions and break-even analysis.`,
      `<strong>Revenue</strong> is total income from sales (price x quantity). Profit = total revenue minus total costs — a firm must at least cover its variable costs in the short run to continue operating.`,
      `<strong>Economies of scale</strong> are the cost advantages a firm gains as it increases output — the average unit cost falls because fixed costs are spread over more units and the firm can negotiate bulk-buying discounts.`
    ]
  }
],

/* ─────────────────────────────────────────────────
 *  4. MANAGING PEOPLE (1.4)
 * ───────────────────────────────────────────────── */
'managing-people': [
  {
    title: 'Staffing and Recruitment',
    points: [
      `<strong>Recruitment</strong> is the process of identifying the need for a new employee, defining the job role, attracting candidates and selecting the most suitable person.`,
      `Internal recruitment fills vacancies from within the existing workforce — it is cheaper, faster, and the candidate already knows the business, but limits the pool of talent and may cause resentment among those not promoted.`,
      `External recruitment sources candidates from outside the business through job adverts, agencies, and online platforms — it brings in fresh ideas and skills but is more expensive and time-consuming.`,
      `A job description outlines the duties and responsibilities of the role, while a person specification lists the skills, qualifications and experience required — together they ensure the right person is matched to the right job.`,
      `Poor recruitment decisions are costly — they lead to low productivity, high staff turnover, wasted training expenditure, and potential damage to team morale.`
    ]
  },
  {
    title: 'Training and Development',
    points: [
      `<strong>Training</strong> is the process of improving employees' skills and knowledge to help them perform their current role more effectively or prepare for future responsibilities.`,
      `Induction training introduces new employees to the business, its culture, policies and their specific role — it reduces early mistakes and helps new starters become productive faster.`,
      `On-the-job training takes place in the workplace while the employee is doing the job (e.g. shadowing, mentoring, coaching) — it is practical and relevant but can disrupt normal workflow.`,
      `Off-the-job training takes place away from the workplace (e.g. courses, conferences, workshops) — it provides specialist knowledge but is more expensive and the employee is absent from work.`,
      `Investment in training improves productivity, quality and employee motivation, but some firms underinvest because trained employees may leave for competitors (the poaching problem).`
    ]
  },
  {
    title: 'Organisational Structure',
    points: [
      `<strong>Organisational structure</strong> is the formal system of authority, roles and communication channels within a business, usually shown by an organisation chart.`,
      `<strong>Span of control</strong> is the number of subordinates directly managed by one person — a wide span means many direct reports, a narrow span means few.`,
      `A tall organisational structure has many layers of hierarchy and narrow spans of control — it allows close supervision but slows decision-making and increases costs.`,
      `A flat organisational structure has few layers and wide spans of control — it speeds up communication and empowers employees but can overload managers.`,
      `<strong>Delegation</strong> is the process of assigning authority and responsibility for specific tasks to subordinates — it frees up senior managers, develops junior staff, and can improve motivation.`,
      `Effective delegation requires trust, clear communication of expectations, and adequate training — without these, delegation can lead to mistakes and lower quality.`
    ]
  },
  {
    title: 'Motivation Theory',
    points: [
      `<strong>Taylor's scientific management</strong> assumes workers are primarily motivated by money and that productivity increases when tasks are broken into small, specialised steps with piece-rate pay — this approach increases output but leads to repetitive, dehumanising work.`,
      `<strong>Maslow's hierarchy of needs</strong> argues that people are motivated by five levels of need in order: physiological (food, shelter), safety (job security), social (belonging, teamwork), esteem (recognition, status), and self-actualisation (personal fulfilment and growth).`,
      `According to Maslow, a lower-level need must be largely satisfied before the next level becomes a motivator — a worker worried about redundancy (safety need) will not be motivated by praise (esteem need).`,
      `<strong>Herzberg's two-factor theory</strong> distinguishes between hygiene factors (e.g. pay, working conditions, company policy) that prevent dissatisfaction, and motivators (e.g. achievement, recognition, responsibility) that actively create job satisfaction.`,
      `Herzberg's key insight is that improving hygiene factors alone (e.g. raising pay) only removes dissatisfaction — it does not motivate. True motivation comes from enriching the job itself through greater responsibility, challenge and recognition.`,
      `In practice, businesses use a combination of financial incentives (bonuses, profit-sharing, piece-rate) and non-financial methods (job enrichment, teamwork, empowerment) to motivate employees.`
    ]
  },
  {
    title: 'Leadership Styles',
    points: [
      `<strong>Leadership styles</strong> describe the different approaches managers use to direct, motivate and make decisions with their teams — the main styles are autocratic, democratic and laissez-faire.`,
      `Autocratic leaders make decisions alone without consulting employees — this is fast and effective in a crisis but can demotivate skilled workers and stifle creativity.`,
      `Democratic leaders involve employees in decision-making — this improves motivation and generates better ideas but can slow down the decision-making process.`,
      `Laissez-faire leaders delegate almost all decisions to their team with minimal interference — this works well with highly skilled, self-motivated professionals but can lead to a lack of direction and coordination.`,
      `Paternalistic leaders act as a parent figure, consulting with employees but ultimately making the decision they believe is best for the workforce — it builds loyalty but can feel patronising to capable staff.`,
      `The most effective leadership style depends on the situation: the nature of the task, the skills and experience of the workforce, the time available, and the organisational culture.`
    ]
  },
  {
    title: 'Employer-Employee Relationships',
    points: [
      `Good employer-employee relationships reduce staff turnover, increase productivity and lower absenteeism — they are built on fair pay, good communication, trust and mutual respect.`,
      `Staff turnover is the percentage of employees leaving a business over a given period — high turnover increases recruitment and training costs and disrupts operations.`,
      `Employee engagement goes beyond simple job satisfaction — engaged employees are emotionally committed to the business and its goals, leading to higher productivity and better customer service.`,
      `Businesses can improve retention by offering competitive pay, clear career progression, flexible working, strong training programmes and a positive workplace culture.`
    ]
  }
],

/* ─────────────────────────────────────────────────
 *  5. ENTREPRENEURS AND LEADERS (1.5)
 * ───────────────────────────────────────────────── */
'entrepreneurs-leaders': [
  {
    title: 'The Role of the Entrepreneur',
    points: [
      `<strong>Enterprise</strong> is the ability to identify a business opportunity, take a calculated risk and organise resources to start and run a business — it is one of the four factors of production.`,
      `An entrepreneur is someone who demonstrates enterprise by creating a new business or innovating within an existing one — they bear the financial risk in return for potential profit.`,
      `Key entrepreneurial qualities include creativity, determination, risk-taking, self-confidence, and the ability to plan and organise — not every business owner displays all of these equally.`,
      `Entrepreneurs create value by spotting gaps in the market, developing new products, and meeting customer needs that existing firms have overlooked.`,
      `Intrapreneurship is when employees act entrepreneurially within a large organisation, developing new ideas and innovations — firms like Google and 3M actively encourage this.`
    ]
  },
  {
    title: 'Motives for Becoming an Entrepreneur',
    points: [
      `Financial motives include the potential for profit and wealth creation — entrepreneurs accept high risk because successful ventures can generate returns far greater than salaried employment.`,
      `Non-financial motives include independence (being your own boss), personal fulfilment, pursuing a passion, making a difference in the community, and achieving a better work-life balance.`,
      `Many entrepreneurs are motivated by a combination of financial and non-financial factors — a social entrepreneur, for example, prioritises solving a social problem while still needing the business to be financially viable.`,
      `The motives of the entrepreneur shape the objectives and culture of the business — a profit-driven founder will make different decisions from one driven by ethical or environmental values.`
    ]
  },
  {
    title: 'Business Objectives',
    points: [
      `A <strong>mission statement</strong> is a brief written statement of the core purpose and values of a business — it communicates to stakeholders what the business stands for and guides strategic decisions.`,
      `Business objectives are specific, measurable targets that a firm aims to achieve, such as increasing profit, growing market share, survival, or improving customer satisfaction.`,
      `<strong>SMART targets</strong> are objectives that are Specific, Measurable, Achievable, Relevant and Time-bound — setting SMART objectives helps a business track progress and hold people accountable.`,
      `Objectives may conflict — for example, maximising short-term profit may require cutting costs in ways that damage long-term brand reputation or employee morale.`,
      `Different <strong>stakeholder</strong>s (owners, employees, customers, suppliers, local community, government) often have different and sometimes conflicting objectives for the business.`
    ]
  },
  {
    title: 'Business Ethics and Social Responsibility',
    points: [
      `<strong>Business ethics</strong> are the moral principles that guide business behaviour and decision-making — ethical businesses consider whether their actions are right and fair, not just whether they are legal and profitable.`,
      `<strong>Corporate social responsibility</strong> (CSR) is when a business voluntarily takes actions that go beyond legal requirements to benefit society and the environment, such as reducing carbon emissions, sourcing materials ethically, or investing in the local community.`,
      `Acting ethically can improve brand reputation, attract and retain talented employees, build customer loyalty and reduce the risk of fines or boycotts.`,
      `The trade-off is that ethical behaviour may increase short-term costs (e.g. fair-trade sourcing costs more), creating a tension between social responsibility and profit maximisation.`,
      `A <strong>stakeholder</strong> is any individual or group with an interest in or affected by the activities of a business — managing stakeholder expectations is a key challenge for entrepreneurs.`
    ]
  },
  {
    title: 'Business Choices and Opportunity Cost',
    points: [
      `Every business decision involves an opportunity cost — the next best alternative foregone. Choosing to invest in a new product means those funds cannot be used for marketing or hiring.`,
      `Entrepreneurs must weigh up risk versus reward when making decisions — higher potential returns usually come with higher risk of failure.`,
      `<strong>Barriers to entry</strong> are obstacles that make it difficult for new firms to enter a market, such as high start-up costs, strong brand loyalty of incumbents, patents, or <strong>economies of scale</strong> enjoyed by existing firms.`,
      `A <strong>competitive advantage</strong> is a factor that allows a firm to outperform its rivals — this could come from lower costs, superior quality, a strong brand, innovation, or excellent customer service.`,
      `New businesses face a high failure rate, often because of poor cash flow management, insufficient market research, lack of experience, or entering a market with high barriers to entry.`
    ]
  },
  {
    title: 'Stakeholders and Decision-Making',
    points: [
      `Key stakeholders include shareholders (want profit and dividends), employees (want fair pay and job security), customers (want quality and value), suppliers (want prompt payment and long-term contracts), the local community (want jobs and minimal environmental harm), and the government (wants tax revenue and legal compliance).`,
      `Stakeholder conflict is inevitable — for example, shareholders may demand cost-cutting that leads to job losses, or customers may want lower prices that reduce supplier margins.`,
      `Effective entrepreneurs manage stakeholder relationships by communicating openly, balancing competing interests, and making decisions that consider long-term impacts not just short-term gains.`,
      `The stakeholder approach argues that businesses perform better in the long run when they consider all stakeholders, not just shareholders — this links closely to <strong>corporate social responsibility</strong>.`
    ]
  }
]

};

/* ═══════════════════════════════════════════════════════════
 *  RUNNER — push each section's notes to Supabase
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
      console.log(`  x ${id}: ${error.message}`);
      failed++;
    } else {
      console.log(`  OK ${id} — ${notes.length} subsections, ${totalPoints} points`);
      success++;
    }
  }

  console.log(`\nDone: ${success} updated, ${failed} failed.`);
}

main();
