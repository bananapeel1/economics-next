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
// BUSINESS GLOSSARY TERMS — Edexcel International A-Level
// ═══════════════════════════════════════════════════════════════

const glossaryTerms = [
  // ─────────────────────────────────────────────────────────────
  // UNIT 1: Marketing and People
  // ─────────────────────────────────────────────────────────────

  // 1.3.1 Meeting Customer Needs
  { term: 'Mass market', definition: 'The largest segment of a market in which products with broad appeal are targeted at the majority of consumers. Mass markets benefit from economies of scale but face intense competition.' },
  { term: 'Niche market', definition: 'A small, specialist segment of a larger market where a business targets a specific group of customers with particular needs. Niche markets tend to have less competition but a smaller customer base.' },
  { term: 'Dynamic market', definition: 'A market that is subject to rapid and continuous change due to factors such as evolving consumer tastes, new technology, or increased competition.' },
  { term: 'Market research', definition: 'The systematic gathering, recording, and analysing of data about customers, competitors, and the market. It includes primary research (original data) and secondary research (existing data).' },
  { term: 'Product orientation', definition: 'A business approach that focuses on the production process and the quality of the product itself, rather than on identifying and responding to customer needs.' },
  { term: 'Market orientation', definition: 'A business approach that prioritises identifying and meeting customer needs and wants through market research before developing or modifying products.' },

  // 1.3.2 The Market
  { term: 'Market size', definition: 'The total volume or value of sales in a market over a given period. It can be measured by the number of units sold (volume) or total revenue generated (value).' },
  { term: 'Market share', definition: 'The proportion of total market sales held by one business or brand, usually expressed as a percentage. It indicates a firm\'s competitive position within the market.' },
  { term: 'Price elasticity of demand', definition: 'A measure of the responsiveness of quantity demanded to a change in price. Calculated as the percentage change in quantity demanded divided by the percentage change in price.' },
  { term: 'Income elasticity of demand', definition: 'A measure of the responsiveness of quantity demanded to a change in consumer income. Positive values indicate normal goods; negative values indicate inferior goods.' },
  { term: 'Market mapping', definition: 'A technique that positions products or brands on a grid using two key variables (e.g. price and quality) to identify gaps in the market and understand the competitive landscape.' },

  // 1.3.3 Marketing Mix and Strategy
  { term: 'Product life cycle', definition: 'The stages a product passes through from its introduction to decline: development, introduction, growth, maturity, and decline. Each stage has different marketing and cash-flow implications.' },
  { term: 'Boston Matrix', definition: 'A model that classifies a firm\'s products into four categories based on market share and market growth: Stars, Cash Cows, Question Marks, and Dogs. It helps firms manage their product portfolio.' },
  { term: 'Branding', definition: 'The process of creating a distinctive name, logo, image, or identity for a product or business in the consumer\'s mind, used to differentiate it from competitors and build customer loyalty.' },
  { term: 'Product differentiation', definition: 'The process of making a product distinct from competitors through design, branding, quality, or features, giving consumers a reason to choose it over alternatives.' },
  { term: 'Unique selling point', definition: 'A feature or characteristic that distinguishes a product or service from its competitors and provides a clear reason for customers to buy it. Also known as a USP.' },
  { term: 'Marketing strategy', definition: 'A long-term plan that outlines how a business will use its marketing mix to achieve its marketing objectives, taking into account market conditions and competition.' },

  // 1.3.4 Managing People
  { term: 'Flexible workforce', definition: 'A labour force that can be adapted to meet changing business needs, through methods such as part-time contracts, temporary workers, multi-skilling, and outsourcing.' },
  { term: 'Maslow\'s hierarchy of needs', definition: 'A motivation theory proposing that human needs are arranged in five levels: physiological, safety, social, esteem, and self-actualisation. Lower-level needs must be met before higher-level needs motivate behaviour.' },
  { term: 'Herzberg\'s two-factor theory', definition: 'A motivation theory distinguishing between hygiene factors (e.g. pay, conditions) that prevent dissatisfaction and motivators (e.g. achievement, recognition) that actively create satisfaction and motivation.' },
  { term: 'Taylor\'s scientific management', definition: 'A management theory proposing that workers are primarily motivated by money and that productivity is maximised by breaking tasks into small, repetitive steps, closely supervising workers, and offering piece-rate pay.' },
  { term: 'Organisational structure', definition: 'The way in which a business arranges its staff and management into a hierarchy, defining roles, responsibilities, and lines of communication and authority.' },
  { term: 'Span of control', definition: 'The number of subordinates that a manager directly supervises. A wide span means more subordinates; a narrow span means fewer, allowing closer supervision.' },
  { term: 'Delegation', definition: 'The process of assigning authority and responsibility for a task to a subordinate, while the manager retains overall accountability for the outcome.' },

  // 1.3.5 Entrepreneurs and Leaders
  { term: 'Enterprise', definition: 'The willingness to take risks and show initiative in starting and running a business. It is considered the fourth factor of production alongside land, labour, and capital.' },
  { term: 'Intrapreneurship', definition: 'Entrepreneurial behaviour within an existing organisation, where employees are encouraged to develop new ideas, products, or processes, acting as innovators inside the firm.' },
  { term: 'Barriers to entry', definition: 'Obstacles that make it difficult for new firms to enter a market, such as high start-up costs, strong brand loyalty, legal regulations, or economies of scale enjoyed by existing firms.' },
  { term: 'Leadership styles', definition: 'The different approaches leaders use to direct, motivate, and manage their teams. Common styles include autocratic, democratic, paternalistic, and laissez-faire.' },
  { term: 'Stakeholder', definition: 'Any individual or group that has an interest in or is affected by the activities of a business, including employees, customers, shareholders, suppliers, the government, and the local community.' },

  // ─────────────────────────────────────────────────────────────
  // UNIT 2: Managing Business Activities
  // ─────────────────────────────────────────────────────────────

  // 2.3.1 Raising Finance
  { term: 'Venture capital', definition: 'Finance provided by specialist investors to businesses with high growth potential in exchange for an equity stake. It involves high risk but offers both funding and expertise.' },
  { term: 'Crowd-funding', definition: 'A method of raising finance by collecting small amounts of money from a large number of people, typically via online platforms, to fund a business idea or project.' },
  { term: 'Business angel', definition: 'A wealthy individual who provides capital and often mentoring to early-stage businesses in exchange for equity or convertible debt.' },
  { term: 'Trade credit', definition: 'An arrangement where a supplier allows a business to receive goods or services now and pay for them at a later date, typically 30 to 90 days, providing short-term finance.' },

  // 2.3.2 Financial Planning
  { term: 'Cash flow forecast', definition: 'A prediction of the expected cash inflows and outflows over a future period, used to anticipate cash shortages and plan borrowing or investment decisions.' },
  { term: 'Break-even analysis', definition: 'A calculation that determines the level of output at which total revenue equals total costs, resulting in neither profit nor loss. Break-even output equals fixed costs divided by contribution per unit.' },
  { term: 'Budget', definition: 'A financial plan that estimates future income and expenditure over a set period. Budgets help control spending, allocate resources, and monitor financial performance.' },
  { term: 'Variance analysis', definition: 'The process of calculating and investigating the differences between budgeted figures and actual results. Favourable variances are better than expected; adverse variances are worse.' },

  // 2.3.3 Managing Finance
  { term: 'Gross profit margin', definition: 'A profitability ratio calculated as gross profit divided by revenue, expressed as a percentage. It shows the proportion of revenue remaining after direct costs are deducted.' },
  { term: 'Net profit margin', definition: 'A profitability ratio calculated as net profit divided by revenue, expressed as a percentage. It shows the proportion of revenue remaining after all costs, including overheads, have been deducted.' },
  { term: 'Contribution', definition: 'The amount remaining after variable costs are subtracted from sales revenue. Total contribution can be used to cover fixed costs and generate profit.' },
  { term: 'Liquidity', definition: 'The ability of a business to meet its short-term financial obligations as they fall due. Common liquidity measures include the current ratio and acid test ratio.' },
  { term: 'Gearing', definition: 'A measure of the proportion of a firm\'s capital that is financed through long-term borrowing compared to equity. High gearing means greater financial risk but may offer higher returns to shareholders.' },

  // 2.3.4 Resource Management
  { term: 'Capacity utilisation', definition: 'The proportion of a firm\'s maximum output that is actually being achieved, expressed as a percentage. Low utilisation means resources are underused; high utilisation may strain resources.' },
  { term: 'Lean production', definition: 'An approach to management that aims to minimise waste and improve efficiency at every stage of the production process while maintaining quality.' },
  { term: 'Kaizen', definition: 'A Japanese philosophy of continuous improvement involving all employees in making small, incremental changes to processes, products, and systems to increase efficiency and quality over time.' },
  { term: 'Just-in-time', definition: 'A lean production method where materials and components are delivered just as they are needed in the production process, reducing the need for stockholding and associated costs.' },
  { term: 'Total quality management', definition: 'A management philosophy where quality is the responsibility of every employee in the organisation, not just the quality control department. It involves continuous improvement at all levels.' },

  // 2.3.5 External Influences
  { term: 'Interest rate', definition: 'The cost of borrowing money or the reward for saving, expressed as a percentage. Changes in interest rates affect consumer spending, business investment, and the exchange rate.' },
  { term: 'Exchange rate', definition: 'The price of one currency expressed in terms of another. Exchange rate fluctuations affect the cost of imports, the competitiveness of exports, and multinational profits.' },
  { term: 'Inflation', definition: 'A sustained increase in the general price level of goods and services in an economy over time, reducing the purchasing power of money.' },
  { term: 'Business cycle', definition: 'The regular pattern of fluctuations in economic activity over time, consisting of four phases: boom, recession, slump (trough), and recovery (expansion).' },

  // ─────────────────────────────────────────────────────────────
  // UNIT 3: Business Decisions and Strategy
  // ─────────────────────────────────────────────────────────────

  // 3.3.1 Business Objectives and Strategy
  { term: 'Mission statement', definition: 'A brief, formal statement of the core purpose and values of a business. It communicates to stakeholders why the organisation exists and what it aims to achieve.' },
  { term: 'Corporate objectives', definition: 'The specific, measurable goals set by senior management for the whole organisation, derived from the mission statement. They guide strategic decision-making.' },
  { term: 'SMART targets', definition: 'Objectives that are Specific, Measurable, Achievable, Realistic, and Time-bound. Setting SMART targets helps ensure goals are clear and progress can be tracked.' },
  { term: 'Ansoff\'s Matrix', definition: 'A strategic framework that identifies four growth strategies based on whether products and markets are new or existing: market penetration, market development, product development, and diversification.' },
  { term: 'Porter\'s Generic Strategies', definition: 'A framework identifying three main strategies for achieving competitive advantage: cost leadership (lowest cost producer), differentiation (unique product), and focus (targeting a narrow market segment).' },
  { term: 'SWOT analysis', definition: 'A strategic planning tool that evaluates a firm\'s internal Strengths and Weaknesses and external Opportunities and Threats, used to inform decision-making and strategy formulation.' },

  // 3.3.2 Business Growth
  { term: 'Organic growth', definition: 'Internal growth achieved by a business expanding its own operations, such as increasing output, opening new stores, or developing new products, rather than through mergers or takeovers.' },
  { term: 'Merger', definition: 'The joining of two or more businesses of roughly equal size to form a new, single entity. Both firms agree to combine their operations and share ownership.' },
  { term: 'Takeover', definition: 'The acquisition of one company by another, often by purchasing a controlling share of its stock. Takeovers can be friendly (agreed) or hostile (opposed by the target firm\'s board).' },
  { term: 'Franchise', definition: 'A business model where a franchisor grants a franchisee the right to operate under its brand name and sell its products or services in exchange for fees and adherence to operational standards.' },
  { term: 'Economies of scale', definition: 'The cost advantages that a business gains as it increases its scale of production, causing long-run average costs to fall. Types include purchasing, technical, managerial, and financial economies.' },
  { term: 'Diseconomies of scale', definition: 'The cost disadvantages that arise when a firm grows too large, causing long-run average costs to rise. Common causes include communication problems, coordination difficulties, and low employee motivation.' },

  // 3.3.3 Decision-Making Techniques
  { term: 'Decision tree', definition: 'A mathematical model that maps out different options, possible outcomes, and their probabilities and financial returns, helping managers make objective decisions under uncertainty.' },
  { term: 'Net present value', definition: 'An investment appraisal method that calculates the total present value of future cash flows minus the initial investment, using a discount rate to account for the time value of money. A positive NPV suggests the investment is worthwhile.' },
  { term: 'Payback period', definition: 'The length of time it takes for an investment to generate enough net cash inflows to recover its initial cost. Shorter payback periods are generally preferred as they reduce risk.' },
  { term: 'Critical path analysis', definition: 'A project management technique that identifies the sequence of dependent tasks (the critical path) that determines the minimum time needed to complete a project. Any delay on the critical path delays the whole project.' },

  // 3.3.4 Influences on Business Decisions
  { term: 'Corporate culture', definition: 'The shared values, beliefs, attitudes, and norms that shape behaviour within an organisation. Culture influences how employees interact, make decisions, and approach their work.' },
  { term: 'Corporate social responsibility', definition: 'The voluntary actions a business takes to consider and address the social, environmental, and ethical impacts of its operations beyond its legal obligations.' },
  { term: 'Stakeholder conflict', definition: 'A situation where the interests of different stakeholder groups clash, requiring the business to prioritise or compromise between competing demands.' },

  // 3.3.5 Assessing Competitiveness
  { term: 'Benchmarking', definition: 'The process of comparing a firm\'s performance, processes, or products against those of industry leaders or competitors in order to identify best practices and areas for improvement.' },
  { term: 'Core competencies', definition: 'The unique strengths, resources, and capabilities that give a business a competitive advantage and are difficult for rivals to imitate, forming the basis of its strategic position.' },

  // 3.3.6 Managing Change
  { term: 'Lewin\'s Force Field Analysis', definition: 'A change management model that identifies the driving forces (pushing for change) and restraining forces (resisting change) acting on a situation. Change occurs when driving forces outweigh restraining forces.' },
  { term: 'Scenario planning', definition: 'A strategic planning method in which managers create and analyse multiple plausible future situations to prepare the business for different outcomes and reduce the impact of uncertainty.' },

  // ─────────────────────────────────────────────────────────────
  // UNIT 4: Global Business
  // ─────────────────────────────────────────────────────────────

  // 4.3.1 Globalisation
  { term: 'Globalisation', definition: 'The increasing integration and interdependence of the world\'s economies through the growth of international trade, investment, and the spread of technology and cultural influences.' },
  { term: 'Multinational corporation', definition: 'A large company that operates in multiple countries, with production or service facilities outside its country of origin. MNCs benefit from economies of scale, access to new markets, and lower costs.' },
  { term: 'Offshoring', definition: 'The relocation of a business process or operation from one country to another, typically to take advantage of lower labour costs, favourable regulations, or proximity to new markets.' },
  { term: 'Reshoring', definition: 'The process of bringing business operations or manufacturing back to the company\'s home country, often driven by rising overseas costs, quality concerns, or a desire for shorter supply chains.' },
  { term: 'Protectionism', definition: 'Government policies that restrict or restrain international trade to protect domestic industries from foreign competition. Methods include tariffs, quotas, subsidies, and regulations.' },
  { term: 'Tariff', definition: 'A tax imposed on imported goods, raising their price to make them less competitive compared to domestically produced alternatives. Tariffs are a common form of protectionism.' },
  { term: 'Foreign direct investment', definition: 'Investment made by a firm in one country into business interests in another country, typically by establishing operations or acquiring business assets such as factories or stakes in foreign firms.' },

  // 4.3.2 Global Markets
  { term: 'Emerging market', definition: 'A country that is transitioning from a developing to a more advanced economy, characterised by rapid industrialisation, rising incomes, and growing consumer markets.' },
  { term: 'Comparative advantage', definition: 'The ability of a country to produce a good or service at a lower opportunity cost than another country, forming the basis for mutually beneficial international trade.' },

  // 4.3.3 Global Marketing
  { term: 'Glocalisation', definition: 'A business strategy that combines global standardisation with local adaptation, adjusting products, marketing, or operations to meet the specific needs and preferences of local markets.' },
  { term: 'Bartlett and Ghoshal model', definition: 'A framework classifying multinational strategies into four types based on the balance between global integration and local responsiveness: international, multidomestic, global, and transnational.' },

  // 4.3.4 Global Industries and MNCs
  { term: 'Transfer pricing', definition: 'The pricing of goods, services, or assets transferred between divisions of the same multinational corporation, often set to minimise tax liabilities across different jurisdictions.' },
  { term: 'Global supply chain', definition: 'A network of organisations, resources, and processes involved in the creation and delivery of a product across multiple countries, from raw materials to the final consumer.' },
  { term: 'Ethical trading', definition: 'Business practices that ensure products are sourced and produced in a way that respects workers\' rights, provides fair wages, and minimises environmental harm throughout the supply chain.' },
];

// ═══════════════════════════════════════════════════════════════
// SEED FUNCTION
// ═══════════════════════════════════════════════════════════════

async function seedBusinessGlossary() {
  console.log('Seeding Business glossary terms...\n');

  // 1. Look up the Business subject ID
  console.log('Looking up Business subject...');
  const { data: subject, error: subjectErr } = await supabase
    .from('subjects')
    .select('id')
    .eq('slug', 'business')
    .single();

  if (subjectErr || !subject) {
    console.error('Could not find Business subject. Make sure seed-business.mjs has been run first.');
    if (subjectErr) console.error(subjectErr.message);
    process.exit(1);
  }

  const subjectId = subject.id;
  console.log(`  Found Business subject (id: ${subjectId})\n`);

  // 2. Attach subject_id to every term
  const termsWithSubject = glossaryTerms.map(t => ({
    ...t,
    subject_id: subjectId,
  }));

  // 3. Insert glossary terms (upsert on term + subject_id to allow re-running)
  console.log(`Inserting ${termsWithSubject.length} glossary terms...`);

  // Insert in batches to avoid potential payload limits
  const BATCH_SIZE = 25;
  let inserted = 0;

  for (let i = 0; i < termsWithSubject.length; i += BATCH_SIZE) {
    const batch = termsWithSubject.slice(i, i + BATCH_SIZE);
    const { error } = await supabase
      .from('glossary_terms')
      .upsert(batch, { onConflict: 'term,subject_id' });

    if (error) {
      console.error(`  Batch ${Math.floor(i / BATCH_SIZE) + 1} error:`, error.message);
      // Fall back to individual inserts for this batch
      for (const term of batch) {
        const { error: singleErr } = await supabase
          .from('glossary_terms')
          .upsert(term, { onConflict: 'term,subject_id' });
        if (singleErr) {
          console.error(`    Failed: "${term.term}" - ${singleErr.message}`);
        } else {
          inserted++;
        }
      }
    } else {
      inserted += batch.length;
    }
  }

  console.log(`  ${inserted}/${termsWithSubject.length} glossary terms inserted/updated`);
  console.log('\nBusiness glossary seed complete!');
}

seedBusinessGlossary().catch(console.error);
