import { supabase } from './_db.mjs';

/* ═══════════════════════════════════════════════════════════
 *  REVVY LEARN — CONTENT EXPLORER REFORMAT
 *  Unit 2, Part A: Measures of Economic Performance + Aggregate Demand
 *
 *  Rich Visual HTML Elements Applied:
 *  - Key Idea: first point of first concept in every block
 *  - Take Away: last point of last concept in every block
 *  - Flow chains: cause-effect pill sequences
 *  - So What: one per block — exam relevance
 *  - Watch Out: sparingly — common mistakes
 *  - Section links: last point of last block only
 *  - Subheadings: where blocks benefit from structure
 *
 *  Writing Rules Preserved:
 *  1. No circular definitions — build intuition first
 *  2. Real specific examples (UK CPI, Japan deflation, Big Mac Index, 2008 crisis, etc.)
 *  3. Exam application throughout
 *  4. Flowing prose with contrast and tension
 *  5. Bold key terms on first use
 *  6. Warm, direct, second-person teacher tone
 * ═══════════════════════════════════════════════════════════ */

const CONTENT = {

'measures-economic-performance': [
  // ──────────────────────────────────────────────
  // Block 0: Gross Domestic Product (GDP)
  // ──────────────────────────────────────────────
  {
    title: 'Gross Domestic Product (GDP)',
    concepts: [
      {
        title: 'Definition of GDP',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p><strong>Gross Domestic Product (GDP)</strong> is the <strong>total market value of all final goods and services</strong> produced within a country's borders in a given time period. It captures every haircut, every car, every hospital visit — the single most widely used measure of a country's economic output.</p></div>`,
          `Notice the word <strong>final</strong> — GDP only counts finished products, not the intermediate goods used along the way. If a bakery buys flour for £1 and sells bread for £3, GDP counts the £3 loaf, not the £3 plus the £1 of flour. Counting both would be <strong>double counting</strong>, and it's one of the most common mistakes students make when explaining GDP measurement.`,
          `GDP measures output <strong>within a country's borders</strong>, regardless of who owns the factors of production. So when Nissan produces cars in Sunderland, that output counts toward UK GDP even though Nissan is a Japanese company. This territorial principle is what distinguishes GDP from <strong>GNI (Gross National Income)</strong>, which tracks the income earned by a country's residents regardless of where they produce it.`,
          `Why does GDP matter so much? Governments use it to judge whether the economy is growing or shrinking, central banks use it to set interest rates, and international organisations like the IMF use it to compare countries and allocate aid. When the UK's GDP fell by 9.7% in 2020 during COVID-19, that single number triggered massive fiscal and monetary policy responses.`,
          `<div class="watch-out"><div class="watch-out-label">Common Mistake</div><p>GDP is a measure of <strong>output</strong>, not wellbeing. A country could have soaring GDP while most of its citizens live in poverty, if income is concentrated at the top. Never equate rising GDP with rising living standards without discussing distribution.</p></div>`
        ]
      },
      {
        title: 'Real vs Nominal GDP',
        points: [
          `Suppose the UK's GDP rises from £2 trillion to £2.1 trillion in a year. Great news? Not necessarily. If prices also rose by 5%, then the economy didn't actually produce more stuff — things just got more expensive. This is why economists distinguish between <strong>nominal GDP</strong> (measured in current prices, unadjusted) and <strong>real GDP</strong> (adjusted for inflation so it reflects actual changes in output).`,
          `<strong>Real GDP</strong> strips out the illusion of price changes by measuring output using prices from a fixed <strong>base year</strong>. Think of it as asking: "If prices hadn't changed, how much more did we actually produce?" The tool used for this conversion is the <strong>GDP deflator</strong>, a price index that captures price changes across the entire economy, not just consumer goods.`,
          `The formula is straightforward: you take nominal GDP, divide by the GDP deflator, and multiply by 100. For instance, if nominal GDP is £2.1 trillion and the deflator is 105, then real GDP is £2 trillion — meaning output actually stayed flat despite the nominal increase.`,
          `In exams, always use <strong>real GDP</strong> when comparing economic performance over time. Nominal figures are misleading because they conflate genuine output growth with mere price increases. If a question gives you GDP data without specifying, and prices have clearly changed, flag this as a limitation — it's exactly the kind of evaluative point examiners reward.`,
          `<div class="watch-out"><div class="watch-out-label">Common Mistake</div><p>Don't confuse the GDP deflator with the <strong>Consumer Price Index (CPI)</strong>. The CPI tracks a fixed basket of consumer goods. The GDP deflator covers <em>everything</em> produced in the economy — investment goods, government services, exports — and updates the basket as production patterns change. They often give different inflation readings.</p></div>`
        ],
        examTip: `When given GDP data over time, always check whether it's real or nominal. If you're told GDP rose by 6% but inflation was 4%, real growth was approximately 2%. Examiners love giving nominal data and asking for analysis — students who fail to adjust for inflation lose marks on evaluation.`,
        formula: 'Real GDP = Nominal GDP / Price Deflator x 100'
      },
      {
        title: 'GDP Per Capita',
        points: [
          `China's GDP overtook Japan's in 2010 to become the world's second largest economy. Does that mean the average Chinese citizen was richer than the average Japanese citizen? Absolutely not. China had over ten times Japan's population. To compare <strong>living standards</strong> between countries, you need <strong>GDP per capita</strong> — total GDP divided by the population.`,
          `This simple calculation transforms the picture dramatically. In 2023, China's GDP per capita was roughly $12,700 while Japan's was around $33,800 and the US topped $80,000. So while China produces more <em>in total</em>, its output is spread across 1.4 billion people. GDP per capita gives you a rough sense of the average person's share of national output.`,
          `GDP per capita is the go-to metric for international comparisons of development and living standards, and it's essential for spotting whether economic growth is actually outpacing population growth. India's GDP has grown impressively in recent decades, but because its population also grew rapidly, the improvement in GDP per capita has been more modest. If output grows by 3% but population grows by 2%, living standards only improve by roughly 1%.`,
          `But here's the critical limitation: GDP per capita is an <strong>average</strong>, and averages hide inequality. Qatar has one of the world's highest GDP per capita figures, yet much of its workforce consists of low-paid migrant labourers who don't share in that average. In any exam answer comparing living standards, you should note that GDP per capita tells you nothing about <strong>income distribution</strong> within a country.`,
          `Also remember that GDP per capita doesn't capture non-market activity, leisure time, environmental quality, or other dimensions of wellbeing. Bhutan famously developed <strong>Gross National Happiness</strong> as an alternative — a reminder that no single number can capture the full picture of how well people live.`
        ],
        formula: 'GDP per capita = GDP / Population'
      },
      {
        title: 'Purchasing Power Parity (PPP)',
        points: [
          `Imagine you earn $50,000 a year in New York and your friend earns $15,000 a year in Nairobi. You earn more than three times as much — but does that mean you're three times better off? Not if a meal costs $20 in New York and $2 in Nairobi. <strong>Purchasing Power Parity (PPP)</strong> adjusts GDP figures to account for differences in the <strong>cost of living</strong> between countries, giving you a fairer comparison of what people can actually buy with their income.`,
          `Without PPP adjustment, comparing GDP across countries using market exchange rates can be deeply misleading. Exchange rates are volatile — they're driven by speculation, interest rate differentials, and capital flows, not by the price of bread and bus tickets. The pound-dollar rate might swing 10% in a year without any real change in either country's living standards. PPP strips out this noise by asking: "How much local currency do you need to buy the same basket of goods?"`,
          `The <strong>Big Mac Index</strong>, published by <em>The Economist</em>, is a fun illustration of PPP. If a Big Mac costs $5.69 in the US and £3.69 in the UK, the implied PPP exchange rate is about $1.54 per pound. If the actual exchange rate is different, one country's currency is "overvalued" or "undervalued" relative to PPP. It's a simplification, but it shows the logic: compare what money can actually buy, not what the forex market says.`,
          `PPP adjustments make a huge difference for developing countries. India's GDP measured at market exchange rates is about $3.5 trillion — but at PPP, it's over $13 trillion, making it the third largest economy in the world. That's because everyday goods and services (food, haircuts, transport) are much cheaper in India than in the US or Europe.`,
          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>For exam purposes, PPP-adjusted data is <strong>more reliable for comparing living standards</strong> across countries because it reflects the actual volume of goods and services people can afford. However, PPP calculations require accurate price data from every country, which is difficult to collect in developing nations with large informal sectors.</p></div>`,
          `<div class="take-away"><div class="take-away-label">Take Away</div><p>When answering questions about international comparisons, always discuss whether the data uses PPP or market exchange rates, and explain why it matters. This kind of critical evaluation is worth significant marks, especially in longer response questions where examiners are looking for analytical depth.</p></div>`
        ],
        examTip: `Examiners frequently ask you to evaluate the usefulness of GDP for comparing living standards between countries. Your answer should always discuss the difference between market exchange rate figures and PPP-adjusted figures. A common mistake is treating GDP at market exchange rates as a direct welfare comparison — always flag this.`
      }
    ]
  },

  // ──────────────────────────────────────────────
  // Block 1: Three Methods of Measuring GDP
  // ──────────────────────────────────────────────
  {
    title: 'Three Methods of Measuring GDP',
    concepts: [
      {
        title: 'Output Method',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>The <strong>output method</strong> measures GDP by adding up the <strong>value added</strong> at each stage of production across every industry in the economy. Value added means the difference between a firm's output and the cost of its inputs — it's each firm's unique contribution to GDP.</p></div>`,
          `Why value added rather than total output? Because if you counted total output at every stage — the iron ore, then the steel, then the car — you'd be counting the iron ore three times. <strong>Double counting</strong> would massively overstate the economy's true output. The value-added approach neatly avoids this by only counting the new value created at each step of the supply chain.`,
          `<div class="flow-chain"><span class="pill blue">Iron ore £100</span><span class="arrow">→</span><span class="pill blue">Steel £250</span><span class="arrow">→</span><span class="pill blue">Car £15,000</span><span class="arrow">→</span><span class="pill amber">GDP counts value added at each stage</span></div>`,
          `In practice, the UK's <strong>Office for National Statistics (ONS)</strong> collects output data from every sector — agriculture, manufacturing, services, construction — and sums the value added across all of them. The services sector dominates the UK, accounting for roughly 80% of GDP, which tells you a lot about the structure of the modern British economy compared to, say, 1950 when manufacturing was far more prominent.`,
          `One major practical challenge is measuring output in the <strong>public sector</strong>. How do you value a police officer's work or a free NHS consultation? There's no market price, so statisticians use the cost of providing the service as a proxy — which may understate or overstate its true value to society. This is an evaluation point worth raising whenever GDP measurement comes up.`
        ]
      },
      {
        title: 'Income Method',
        points: [
          `Think about it from the other side: every pound of value that's produced ends up as income for someone. The worker earns wages, the landlord earns rent, the lender earns interest, the business owner earns profit. The <strong>income method</strong> measures GDP by summing all the incomes earned in the production process — <strong>wages and salaries, rental income, interest income, and profits</strong>.`,
          `<div class="flow-chain"><span class="pill blue">Production £1m</span><span class="arrow">→</span><span class="pill amber">Wages</span><span class="arrow">+</span><span class="pill amber">Rent</span><span class="arrow">+</span><span class="pill amber">Interest</span><span class="arrow">+</span><span class="pill amber">Profit</span><span class="arrow">=</span><span class="pill pos">GDP £1m</span></div>`,
          `A key rule: only incomes earned from <strong>productive activity</strong> count. <strong>Transfer payments</strong> — like pensions, Jobseeker's Allowance, or student grants — are excluded because they don't correspond to any new output being created. The government is redistributing existing income, not generating new production. This is a common exam trap: students sometimes include transfer payments in income-method GDP.`,
          `The income method faces challenges with the <strong>informal economy</strong> — cash-in-hand work, undeclared earnings, and illegal activity. In developing countries, the informal sector can account for 30-60% of economic activity (the IMF estimates it at over 60% in sub-Saharan Africa). This means income-method GDP significantly understates true economic activity in many nations.`,
          `Self-employment income is particularly tricky because it blends wages and profit into a single figure — the <strong>ONS</strong> calls this "mixed income." In the UK's gig economy, with millions of self-employed workers on platforms like Deliveroo and Uber, accurately capturing this income stream has become increasingly important and increasingly difficult.`
        ]
      },
      {
        title: 'Expenditure Method',
        points: [
          `There's a third angle: instead of measuring what's produced or what's earned, you can measure what's <strong>spent</strong>. After all, every product that's made is eventually bought by someone. The <strong>expenditure method</strong> adds up all spending on final goods and services in the economy, and this gives you the famous GDP identity that you'll use constantly throughout Unit 2.`,
          `<div class="content-subhead">The Four Components</div>`,
          `The formula breaks spending into four components: <strong>Consumption (C)</strong> is household spending on goods and services — from groceries to gym memberships. <strong>Investment (I)</strong> is business spending on capital goods plus changes in inventories. <strong>Government spending (G)</strong> is public sector expenditure on goods and services like roads, schools, and defence. <strong>Net exports (X - M)</strong> is exports minus imports — because exports represent foreign spending on domestic output, while imports are domestic spending on foreign output that needs to be subtracted.`,
          `In the UK, consumption is by far the largest component — typically around 60-65% of GDP. This is why consumer confidence surveys and retail sales figures get so much attention: when households stop spending, the economy feels it immediately. Investment is smaller (around 17-18%) but far more <strong>volatile</strong>, swinging sharply with business confidence and interest rates.`,
          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>The expenditure method is the one most directly connected to the <strong>aggregate demand</strong> model you'll study next — the components of GDP by expenditure are exactly the components of AD. Understanding C, I, G, and (X - M) here sets you up for everything that follows in macroeconomics.</p></div>`
        ],
        formula: 'GDP = C + I + G + (X - M)'
      },
      {
        title: 'Why Three Methods Are Equal',
        points: [
          `In theory, all three methods — output, income, and expenditure — should give exactly the same GDP figure. This is because they're measuring the same economic activity from three different angles: what's produced, what's earned from producing it, and what's spent on buying it. Every pound of output generates a pound of income and requires a pound of expenditure. It's the <strong>circular flow of income</strong> in action.`,
          `<div class="flow-chain"><span class="pill blue">Output</span><span class="arrow">≡</span><span class="pill blue">Income</span><span class="arrow">≡</span><span class="pill blue">Expenditure</span><span class="arrow">→</span><span class="pill amber">Same GDP, three angles</span></div>`,
          `In practice, however, the three figures rarely match perfectly. Data comes from different sources — business surveys, tax returns, household spending data — each with their own sampling methods, time lags, and measurement errors. The ONS publishes a single official GDP figure by averaging and reconciling the three, and the gap between them is reported as a <strong>statistical discrepancy</strong>.`,
          `<div class="take-away"><div class="take-away-label">Take Away</div><p>The three methods are <strong>conceptually identical</strong> but <strong>practically different</strong> due to measurement difficulties. If a question asks you to explain or evaluate GDP measurement, discuss this gap between theory and practice — it shows you understand both the elegance of the circular flow model and the messy reality of data collection.</p></div>`
        ]
      }
    ]
  },

  // ──────────────────────────────────────────────
  // Block 2: Uses and Limitations of GDP Data
  // ──────────────────────────────────────────────
  {
    title: 'Uses and Limitations of GDP Data',
    concepts: [
      {
        title: 'Uses of GDP Data',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>GDP data is the backbone of economic policymaking. It provides a <strong>standardised, comparable, and regularly updated</strong> measure of economic activity that no other single indicator can match — used by central banks, governments, and international organisations alike.</p></div>`,
          `The <strong>Bank of England</strong> watches quarterly GDP figures to decide whether to raise or lower interest rates — if GDP is growing too fast and inflation is building, rates go up; if the economy is stalling, rates come down. Without reliable GDP data, central banks would be flying blind, making trillion-pound decisions based on guesswork.`,
          `Governments use GDP to assess the success of their economic policies and to plan fiscal strategy. The UK's <strong>Office for Budget Responsibility (OBR)</strong> forecasts GDP growth to estimate future tax revenues and plan public spending. If GDP growth is projected to slow, tax receipts will fall and borrowing may need to rise — every fiscal policy decision chains back to the GDP forecast.`,
          `International organisations — the <strong>IMF</strong>, <strong>World Bank</strong>, <strong>OECD</strong> — use GDP data to compare countries, allocate development aid, assess debt sustainability, and monitor global economic health. Businesses use GDP data for strategic planning: when India's GDP growth rate consistently exceeded 6-7% in the 2010s, it attracted huge foreign direct investment from firms like Amazon, Walmart, and Apple looking to tap into a fast-expanding consumer market.`,
          `For your exam, the core message is that GDP provides a snapshot of <em>output</em>, not of wellbeing, equality, or sustainability. Always pair "GDP is useful because..." with "but it fails to capture..." for a balanced answer.`
        ]
      },
      {
        title: 'Limitations of GDP as a Measure of Living Standards',
        points: [
          `GDP tells you how much an economy produces, but it says nothing about <strong>how that output is distributed</strong>. The US has one of the world's highest GDP per capita figures, yet the top 1% of Americans own more wealth than the bottom 50% combined. A country could double its GDP while all the gains flow to a tiny elite, leaving most people no better off. For living standards, you need to look at GDP alongside measures of <strong>income inequality</strong> like the Gini coefficient.`,
          `The <strong>informal economy</strong> — cash-in-hand jobs, street trading, subsistence farming — doesn't show up in official GDP figures. In countries like Nigeria, India, or Peru, the informal sector can account for 40-60% of true economic activity. This means GDP systematically understates the actual output and living standards of developing nations, making international comparisons unreliable unless adjustments are made.`,
          `GDP completely ignores <strong>unpaid work</strong> — childcare, eldercare, volunteering, household chores. The ONS estimated that unpaid household work in the UK was worth roughly £1.24 trillion in 2016 — equivalent to about 63% of official GDP. Women disproportionately perform this work, meaning GDP systematically undervalues their economic contribution.`,
          `<div class="content-subhead">What GDP Misses</div>`,
          `<strong>Environmental degradation</strong> can actually <em>boost</em> GDP in the short run. Cutting down the Amazon rainforest increases Brazil's timber output and agricultural GDP. An oil spill generates GDP through clean-up spending. GDP doesn't subtract the depletion of natural capital or the cost of pollution, so a country can appear to be "growing" while destroying the natural resources its future prosperity depends on.`,
          `GDP doesn't measure <strong>quality of life</strong> factors like leisure time, health outcomes, crime rates, political freedom, or community bonds. Japan and the US have similar GDP per capita figures, but Japan has far higher life expectancy, lower crime, and less inequality. French workers enjoy more leisure, but this shows up as <em>lower</em> GDP because fewer hours worked means less output.`,
          `<strong>Composition of output</strong> matters enormously but GDP treats all spending as equal. A country spending 30% of GDP on military hardware has a very different quality of life from one spending 30% on healthcare and education, even if the total GDP is identical.`,
          `GDP doesn't capture <strong>technological improvements in quality</strong>. Your smartphone today is incomparably more powerful than a 2005 model, but if the price is the same, GDP records no change. Free digital services — Google, Wikipedia, social media — generate enormous consumer value but contribute almost nothing to GDP because they have no market price.`,
          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>Despite all these flaws, GDP remains the world's primary economic indicator because it's <strong>standardised</strong>, <strong>frequently updated</strong>, and <strong>comparable across countries and over time</strong>. GDP must be supplemented with other data (Gini coefficient, HDI, environmental indicators) to form a complete picture of living standards.</p></div>`,
          `<div class="take-away"><div class="take-away-label">Take Away</div><p>GDP is powerful but incomplete. Alternative measures like the <strong>Human Development Index (HDI)</strong>, <strong>Genuine Progress Indicator (GPI)</strong>, and the <strong>Gini coefficient</strong> each address a specific blind spot — no single number can capture the full picture of living standards, sustainability, and wellbeing.</p></div>`
        ],
        examTip: `"Evaluate the use of GDP data to compare living standards" is a classic exam question. Structure your answer by first acknowledging GDP's usefulness (standardised, comparable, regularly produced), then systematically working through limitations. Top-mark answers don't just list limitations — they explain WHY each limitation matters and suggest specific alternative indicators that address each gap.`
      }
    ]
  },

  // ──────────────────────────────────────────────
  // Block 3: Consumer Price Index (CPI) and Inflation
  // ──────────────────────────────────────────────
  {
    title: 'Consumer Price Index (CPI) and Inflation',
    concepts: [
      {
        title: 'The CPI',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>The <strong>Consumer Price Index (CPI)</strong> measures the <strong>average change in prices</strong> of a representative basket of goods and services consumed by households. It starts with a base year set to 100 — if the CPI rises to 105, prices have risen by 5% on average.</p></div>`,
          `The <strong>inflation rate</strong> is the percentage change in the CPI from one period to the next, and it's the UK's headline measure of price stability — the one the Bank of England targets. The Bank has a <strong>2% CPI inflation target</strong>, set by the government. If inflation rises above 2%, the Bank typically raises interest rates to cool demand; if it falls below, it lowers them to stimulate spending.`,
          `When CPI inflation hit 11.1% in October 2022 — the highest in 41 years — the Bank responded with the fastest series of rate rises in decades, pushing the base rate from 0.1% to over 5%.`,
          `<div class="flow-chain"><span class="pill neg">CPI 11.1%</span><span class="arrow">→</span><span class="pill blue">Bank of England responds</span><span class="arrow">→</span><span class="pill amber">Base rate 0.1% → 5.25%</span></div>`,
          `CPI is an international standard used across the EU, US (as a variant), and most OECD countries, making it ideal for cross-country comparisons. In the UK, there's also <strong>CPIH</strong>, which includes owner-occupier housing costs — a significant addition since housing is the largest single expense for most UK households.`,
          `<div class="watch-out"><div class="watch-out-label">Common Mistake</div><p>Don't confuse the <strong>price level</strong> with the <strong>inflation rate</strong>. If CPI goes from 100 to 110 to 115, inflation <em>fell</em> from 10% to about 4.5% — but prices are still higher than before. This is <strong>disinflation</strong> (falling inflation rate, still-rising prices), not <strong>deflation</strong> (actually falling prices). Examiners test this distinction relentlessly.</p></div>`
        ],
        formula: 'Inflation rate = ((CPI this year - CPI last year) / CPI last year) x 100'
      },
      {
        title: 'How CPI Is Calculated',
        points: [
          `Each year, the <strong>ONS</strong> sends price collectors across the UK to record the prices of around <strong>730 representative items</strong> in the CPI basket, from roughly 150 locations nationwide. These aren't random items — they're chosen to mirror the spending patterns of a typical household, with new items added and outdated ones removed as consumer habits change. Streaming services replaced DVD rentals; oat milk entered as tastes shifted.`,
          `<div class="flow-chain"><span class="pill blue">730 items selected</span><span class="arrow">→</span><span class="pill blue">Prices collected at 150 locations</span><span class="arrow">→</span><span class="pill blue">Weights applied by spending share</span><span class="arrow">→</span><span class="pill amber">Single CPI index number</span></div>`,
          `Not all items carry equal importance. A 5% rise in rent matters far more to your budget than a 5% rise in the price of shoelaces. The CPI accounts for this by assigning <strong>weights</strong> to each category based on its share of average household spending. Housing, water, and fuel typically carry the heaviest weight in the UK (around 30%).`,
          `These weights are updated annually using data from the <strong>Living Costs and Food Survey</strong>, which tracks what around 5,000 households actually spend their money on. If people start spending more on eating out and less on clothing, the weights shift to reflect this.`,
          `Price collectors record prices at multiple outlets — supermarkets, independent shops, online retailers. Increasingly, the ONS also scrapes prices from websites and uses scanner data from retailers, providing millions of price observations rather than thousands collected manually. This technological shift is making the CPI more accurate and more responsive.`,
          `Here's an important subtlety: the basket represents an <em>average</em> household, but no household is truly average. A retired pensioner spending heavily on heating faces different inflation than a young professional spending on rent and takeaways. This means CPI inflation may not match your personal experience of price changes — a point worth raising in evaluation.`
        ]
      },
      {
        title: 'Limitations of CPI',
        points: [
          `The CPI basket represents the spending pattern of a <strong>typical household</strong>, but real households are enormously diverse. Pensioners, students, high-earners, and families all face different "personal inflation rates." When energy prices surge, pensioners who spend a larger share of their income on heating are hit harder than young professionals. The CPI averages over these differences, potentially misleading policymakers.`,
          `<strong>Quality improvements</strong> are difficult to capture. If a new laptop costs the same as last year's model but is twice as fast, has the price really stayed the same? Statisticians use <strong>hedonic adjustment</strong> to try to separate price changes from quality changes, but it's more art than science. Some economists argue the CPI <em>overstates</em> inflation because it doesn't fully account for how much better products have become.`,
          `The <strong>substitution bias</strong> is a well-known problem. When the price of beef rises, consumers switch to chicken — but if the CPI basket still assumes the old proportion of beef spending, it overstates the impact. While the geometric mean formula partly addresses this, the weights are only updated annually, meaning there's always a lag.`,
          `<strong>New products</strong> enter the basket with a delay. Smartphones existed for years before being included; the same happened with streaming services. During this gap, the CPI misses the price trends of products that consumers are increasingly buying.`,
          `The CPI largely excludes <strong>housing costs for owner-occupiers</strong> (mortgage payments, house prices). Since housing is typically the largest single expense for UK households, this is a significant omission. <strong>CPIH</strong> addresses this by including owner-occupiers' housing costs using an imputed rent approach.`,
          `The CPI doesn't capture the <strong>informal economy</strong> or <strong>black market prices</strong>. In countries with extensive informal sectors, official CPI figures may not reflect the prices that a large share of the population actually pays.`,
          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>Despite these limitations, the CPI remains the most practical inflation measure precisely because it's <strong>standardised</strong>, <strong>transparent</strong>, and <strong>internationally comparable</strong>. Your job isn't to dismiss CPI but to show you understand both its value and its blind spots — then suggest how CPIH, RPI, or the GDP deflator can fill the gaps.</p></div>`,
          `<div class="take-away"><div class="take-away-label">Take Away</div><p>CPI is an imperfect but indispensable tool. Its limitations — substitution bias, quality adjustment, household diversity — tend to cause it to <strong>overstate</strong> true inflation for some groups and <strong>understate</strong> it for others. Always specify <em>whose</em> inflation experience you're analysing.</p></div>`
        ],
        examTip: `A classic evaluative question asks you to assess the reliability of CPI as a measure of inflation. Strong answers go beyond listing limitations — they explain the direction of bias (does each limitation cause CPI to overstate or understate inflation?) and discuss whose inflation experience is being masked by the average. Always mention at least one alternative measure and explain why it might be better for a specific purpose.`
      }
    ]
  },

  // ──────────────────────────────────────────────
  // Block 4: Inflation: Causes and Effects
  // ──────────────────────────────────────────────
  {
    title: 'Inflation: Causes and Effects',
    concepts: [
      {
        title: 'Demand-Pull Inflation',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p><strong>Demand-pull inflation</strong> occurs when <strong>aggregate demand (AD) grows faster than the economy's ability to produce</strong>, pulling prices upward as too much money chases too few goods. Think of a packed restaurant on Saturday night — every table full, a queue out the door, and prices rising on next month's menu.</p></div>`,
          `On an AD/AS diagram, demand-pull inflation shows as a <strong>rightward shift of the AD curve</strong> along a relatively steep section of the AS curve. When the economy is already near full capacity, extra demand can't easily be met with extra output — so instead of more goods being produced, prices rise. The closer the economy is to its productive limit, the more inflationary any demand increase becomes.`,
          `<div class="flow-chain"><span class="pill blue">AD rises</span><span class="arrow">→</span><span class="pill blue">Economy near capacity</span><span class="arrow">→</span><span class="pill neg">Excess demand</span><span class="arrow">→</span><span class="pill neg">Prices pulled up</span></div>`,
          `What triggers the demand surge? It could be a consumer spending boom fuelled by rising house prices and easy credit — exactly what happened in the UK in 2006-07. Or it could be a government running large budget deficits, exports booming because the currency has weakened, or the central bank keeping interest rates too low for too long. Any component of AD — C, I, G, or (X - M) — can be the culprit.`,
          `A classic historical example: in the late 1960s, President Lyndon Johnson tried to fund both the Vietnam War and his Great Society welfare programmes simultaneously, massively expanding government spending. The US economy was already near full employment, so the extra demand produced severe demand-pull inflation that persisted into the 1970s.`,
          `The policy response to demand-pull inflation is typically <strong>contractionary</strong>: raise interest rates to discourage borrowing and spending, or cut government expenditure. The Bank of England's aggressive rate rises in 2022-23 were partly targeting demand-pull pressures from the post-COVID spending rebound. The challenge is cooling demand without tipping the economy into recession — the so-called "soft landing."`
        ]
      },
      {
        title: 'Cost-Push Inflation',
        points: [
          `Now imagine the opposite: demand hasn't changed, but the restaurant's costs have surged — ingredient prices doubled, staff demanded higher wages, and energy bills tripled. The restaurant raises its menu prices not because more customers are queuing, but because it costs more to produce each meal. This is <strong>cost-push inflation</strong>: it occurs when <strong>rising production costs</strong> force firms to increase prices, pushing the aggregate supply curve leftward.`,
          `<div class="flow-chain"><span class="pill neg">Costs rise</span><span class="arrow">→</span><span class="pill neg">SRAS shifts left</span><span class="arrow">→</span><span class="pill neg">Prices up + output down</span><span class="arrow">→</span><span class="pill neg">Stagflation</span></div>`,
          `On an AD/AS diagram, cost-push inflation shows as a <strong>leftward shift of the short-run aggregate supply (SRAS) curve</strong>. Output falls while the price level rises — a painful combination called <strong>stagflation</strong>. This is far harder to deal with than demand-pull inflation because policymakers face a dilemma: fight inflation (tighten policy, worsen the recession) or fight recession (loosen policy, worsen the inflation).`,
          `The most dramatic example is the <strong>1973 oil crisis</strong>, when OPEC quadrupled oil prices. Oil is an input in virtually everything — transport, plastics, heating, chemicals, agriculture — so the cost shock rippled through every sector. The UK, US, and Europe all experienced stagflation: inflation above 10% combined with rising unemployment and falling output.`,
          `Common causes include: <strong>rising commodity prices</strong> (oil, metals, agricultural goods), <strong>currency depreciation</strong> (after the Brexit vote in 2016, the pound fell 15%, pushing up import costs and UK inflation), <strong>higher wages</strong> exceeding productivity growth, <strong>increased taxes or regulation</strong>, and <strong>supply chain disruptions</strong> (COVID-19 caused global shipping costs to increase tenfold in 2021).`,
          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>The UK's inflation spike in 2022-23 was a textbook case of <strong>mixed inflation</strong> — both cost-push (energy price shock from the Russia-Ukraine war, supply chain disruptions) and demand-pull (post-COVID fiscal stimulus, pent-up spending). In exams, real-world inflation is rarely purely one type — explaining this combination earns top marks.</p></div>`
        ],
        examTip: `Examiners love asking "Is inflation demand-pull or cost-push?" for real-world scenarios. The best answers recognise that it's usually <em>both</em>. Always identify specific causes (energy prices, wage growth, consumer confidence) and link them to the correct type. Then explain why the policy response differs — this shows the evaluative depth examiners reward.`
      },
      {
        title: 'Effects of Inflation',
        points: [
          `Moderate, stable inflation (around the 2% target) is generally considered harmless — even helpful, because it gives firms room to adjust relative wages without nominal cuts, and it encourages spending today rather than hoarding cash. The problems emerge when inflation is <strong>high</strong>, <strong>volatile</strong>, or <strong>unexpected</strong>. It's the unpredictability that causes the real damage.`,
          `<div class="content-subhead">Winners and Losers</div>`,
          `Inflation erodes the <strong>purchasing power</strong> of money — each pound buys less. This hurts people on <strong>fixed incomes</strong> most severely: pensioners, workers whose wages lag behind prices, and savers whose bank interest doesn't keep pace. In contrast, <strong>borrowers benefit</strong> because they repay loans with money that's worth less. Inflation effectively <strong>redistributes wealth from savers and creditors to borrowers and debtors</strong>.`,
          `<div class="flow-chain"><span class="pill neg">High inflation</span><span class="arrow">→</span><span class="pill neg">Purchasing power falls</span><span class="arrow">→</span><span class="pill neg">Fixed-income losers</span><span class="arrow">+</span><span class="pill pos">Borrowers gain</span></div>`,
          `<strong>International competitiveness</strong> suffers when a country's inflation rate exceeds its trading partners'. If UK inflation runs at 10% while Germany's is at 3%, British exports become relatively more expensive. This worsens the <strong>current account balance</strong> and can trigger a currency depreciation, which in turn makes imports more expensive — potentially creating a vicious inflationary spiral.`,
          `High inflation creates <strong>uncertainty</strong> that discourages investment. If a firm can't predict its costs or revenues in two years, it's less likely to commit to building a new factory. This is why central banks obsess over price stability — predictable, low inflation gives businesses the confidence to plan long-term. The UK's volatile inflation in the 1970s coincided with prolonged underinvestment and stagnant productivity.`,
          `There's also a <strong>fiscal drag</strong> effect: if income tax thresholds aren't adjusted for inflation, people get pushed into higher tax brackets purely because their nominal income has risen. The UK government's decision to freeze income tax thresholds from 2021 to 2028 during high inflation is a textbook example of fiscal drag in action.`,
          `<div class="take-away"><div class="take-away-label">Take Away</div><p>Inflation distorts <strong>economic signals</strong>. Prices are supposed to guide resource allocation — a rising price signals scarcity. But during high inflation, it's hard to tell whether a price rose because of genuine scarcity or because everything got more expensive. This "signal extraction problem" leads to <strong>misallocation of resources</strong> across the economy.</p></div>`
        ]
      }
    ]
  },

  // ──────────────────────────────────────────────
  // Block 5: Deflation
  // ──────────────────────────────────────────────
  {
    title: 'Deflation',
    concepts: [
      {
        title: 'Definition and Types',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p><strong>Deflation</strong> is a <strong>sustained fall in the general price level</strong> — the inflation rate turns negative. Don't confuse this with <strong>disinflation</strong>, which is merely inflation slowing down (say, from 5% to 2%). With deflation, prices are actually falling: the CPI is lower this year than last year.</p></div>`,
          `Not all deflation is the same, and this is where it gets interesting. <strong>Benign (good) deflation</strong> results from improvements on the supply side — technological progress, productivity gains, or falling input costs that allow firms to produce more cheaply and pass savings on to consumers. Think about consumer electronics: the price of computing power has fallen dramatically for decades because of innovation, and nobody considers that a crisis.`,
          `<strong>Malignant (bad) deflation</strong> is the dangerous kind. It results from <strong>collapsing aggregate demand</strong> — consumers stop spending, firms cut prices to shift unsold stock, profits shrink, workers are laid off, which further reduces spending. This is a <strong>deflationary spiral</strong>, and it's what made the Great Depression so devastating. Japan experienced a milder version from the mid-1990s through the 2010s — nearly two decades of intermittent deflation that resisted every policy tool thrown at it.`,
          `<div class="watch-out"><div class="watch-out-label">Common Mistake</div><p>The key exam skill is distinguishing between benign and malignant deflation. If deflation stems from a tech breakthrough, the effects may be positive. If it stems from a demand-side collapse, the effects are almost entirely negative. A blanket statement that "deflation is harmful" will lose you marks — your analysis must depend on the cause.</p></div>`
        ]
      },
      {
        title: 'Causes and Effects',
        points: [
          `On the demand side, deflation can be triggered by a <strong>severe fall in aggregate demand</strong>: a financial crisis that crushes consumer and business confidence (as in 2008-09), a sharp fiscal contraction, or a collapse in export demand. When the Eurozone's GDP fell during the sovereign debt crisis of 2011-13, several peripheral economies — Greece, Spain, Cyprus — experienced outright deflation.`,
          `On the supply side, deflation can result from <strong>positive supply shocks</strong>: major technological breakthroughs, discovery of new resources, or a sudden fall in global commodity prices. China's integration into the world economy from the 1990s pushed down the global price of manufactured goods — this "China effect" was a form of benign deflationary pressure that raised real living standards in importing countries.`,
          `<div class="content-subhead">The Deflationary Spiral</div>`,
          `<div class="flow-chain"><span class="pill neg">Prices fall</span><span class="arrow">→</span><span class="pill neg">Consumers postpone spending</span><span class="arrow">→</span><span class="pill neg">Firms cut output &amp; jobs</span><span class="arrow">→</span><span class="pill neg">Incomes fall</span><span class="arrow">→</span><span class="pill neg">Demand drops further</span><span class="arrow">→</span><span class="pill neg">Prices fall again</span></div>`,
          `The most feared consequence is the <strong>deflationary spiral</strong>. When prices fall, consumers postpone purchases — why buy today if it's cheaper tomorrow? Firms see falling revenues and cut costs by laying off workers. This self-reinforcing cycle is extremely difficult to break. Japan's "Lost Decades" showed that even zero interest rates and massive government spending struggled to reverse entrenched deflation expectations.`,
          `Deflation increases the <strong>real burden of debt</strong>. If you owe £100,000 on a mortgage and prices fall by 10%, your debt is worth more in real terms — you need to sell more goods or work more hours to repay the same nominal amount. During the Great Depression, this "debt deflation" (identified by economist <strong>Irving Fisher</strong>) turned manageable debts into crushing burdens.`,
          `<strong>Real interest rates rise</strong> during deflation even if nominal rates are at zero. The real interest rate equals the nominal rate minus inflation; with deflation of 2%, the real rate is effectively 2% even at zero nominal rates. The central bank has hit the <strong>zero lower bound</strong> — it can't cut rates further using conventional tools.`,
          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>The policy response to demand-deficient deflation typically involves <strong>aggressive monetary easing</strong> (cutting rates to zero, then <strong>quantitative easing</strong>) and <strong>fiscal expansion</strong>. But if deflation expectations become <strong>entrenched</strong> — if people genuinely believe prices will keep falling — these tools may be insufficient, as Japan painfully demonstrated for over a decade.</p></div>`,
          `<div class="take-away"><div class="take-away-label">Take Away</div><p>Deflation's impact depends entirely on its cause. Supply-side deflation from innovation is benign; demand-side deflation from collapsing spending creates a self-reinforcing spiral of falling prices, rising real debt, and shrinking output. Always identify the cause before evaluating the consequences.</p></div>`
        ],
        examTip: `When analysing deflation, always start by identifying the CAUSE — supply-side or demand-side — because the effects and policy implications are completely different. Examiners specifically test whether you can distinguish "good" deflation (productivity-driven, raising living standards) from "bad" deflation (demand-driven, creating a deflationary spiral). A blanket statement that "deflation is harmful" will lose you marks.`
      }
    ]
  },

  // ──────────────────────────────────────────────
  // Block 6: Employment and Unemployment
  // ──────────────────────────────────────────────
  {
    title: 'Employment and Unemployment',
    concepts: [
      {
        title: 'Key Definitions',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>The <strong>labour force</strong> (or <strong>economically active population</strong>) includes everyone aged 16-64 who is either working or actively seeking work. The <strong>unemployment rate</strong> measures the percentage of this labour force that is without a job but actively searching — it's calculated as (Unemployed / Labour force) x 100.</p></div>`,
          `<strong>Employment</strong> means being in paid work for at least one hour per week (by the ILO definition). This sounds absurdly low, and it is. Someone working a single hour per week counts as "employed," which means the employment rate can paint a misleadingly rosy picture if many workers are <strong>underemployed</strong> — wanting full-time work but only finding part-time or zero-hours contracts.`,
          `<strong>Unemployment</strong>, under the <strong>International Labour Organisation (ILO)</strong> definition, means a person is without a job, has actively searched for work in the last four weeks, and is available to start work within two weeks. All three conditions must be met. If you stop looking — perhaps because you're discouraged — you drop out of the unemployment count entirely, which is why the official rate can fall even when the jobs market isn't actually improving.`,
          `In the UK, the unemployment rate was around 3.5% in late 2022 — historically very low — but this headline figure masked significant underemployment, regional disparities (unemployment in the North East was nearly double that in the South East), and a surge in economic inactivity post-COVID.`,
          `For exam purposes, always question the headline unemployment rate. How many people have left the labour force entirely? What about underemployment? What about regional and demographic disparities? The gap between the statistic and the lived reality is where the best evaluation marks live.`
        ],
        formula: 'Unemployment rate = (Unemployed / Labour force) x 100'
      },
      {
        title: 'Measuring Unemployment',
        points: [
          `The UK uses two main measures. The <strong>Labour Force Survey (LFS)</strong> is based on a quarterly survey of around 80,000 households, following the <strong>ILO definition</strong>, making it internationally comparable. If Japan, Germany, and the UK all report LFS-based unemployment rates, you can compare them meaningfully because they're using the same criteria.`,
          `The second measure is the <strong>Claimant Count</strong>, which tallies the number of people claiming <strong>unemployment-related benefits</strong> (principally Universal Credit where the claimant is required to seek work). It's simpler and cheaper to compile — administrative data rather than surveys — and available monthly rather than quarterly.`,
          `The two measures often tell different stories. The Claimant Count tends to be <strong>lower</strong> than the LFS figure because many unemployed people don't claim benefits. Conversely, it can sometimes be <strong>higher</strong> if benefit rules are loosened. Policy changes to the benefits system can shift the Claimant Count without any real change in the labour market.`,
          `<div class="content-subhead">What Both Measures Miss</div>`,
          `Neither captures the <strong>hidden unemployed</strong> — people who want work but have stopped actively searching (<strong>discouraged workers</strong>). After COVID-19, around 500,000 additional people in the UK became economically inactive, many due to long-term illness. They don't appear in either unemployment measure, yet their absence from the workforce is a real economic problem.`,
          `<strong>Underemployment</strong> is another gap: someone working 10 hours a week who wants 40 hours counts as employed in both measures. The ONS publishes a separate underemployment rate, which in 2023 was roughly double the headline unemployment rate.`,
          `<strong>Regional and demographic disparities</strong> are hidden by national averages. UK unemployment among 18-24 year olds is typically two to three times higher than the national average. Unemployment in some former industrial towns exceeds 8% while parts of the South East sit below 3%.`,
          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>When evaluating unemployment data, the strongest approach is to compare both measures, note what each misses, and bring in supplementary indicators — economic inactivity rates, underemployment, regional breakdowns. No single measure gives the full picture.</p></div>`
        ]
      },
      {
        title: 'Types of Unemployment',
        points: [
          `<strong>Frictional unemployment</strong> is short-term unemployment that occurs as workers move between jobs. It's a natural feature of a dynamic economy — people quit to find better roles, graduates search for their first position. It exists even at "full employment" because there's always someone in transition.`,
          `<strong>Structural unemployment</strong> is far more damaging. It occurs when workers' skills, location, or characteristics no longer match what employers need. The decline of coal mining in Northern England left entire communities with skills suited for industries that no longer existed. Structural unemployment is typically <strong>long-term</strong>, geographically concentrated, and resistant to demand-side fixes — you can cut interest rates all you want, but it won't retrain a coal miner as a software engineer.`,
          `<strong>Cyclical unemployment</strong> (also called <strong>demand-deficient unemployment</strong>) rises and falls with the business cycle. During recessions, aggregate demand drops, firms cut production and lay off workers. UK unemployment rose from 5.2% to 8.1% during the 2008-09 recession.`,
          `<div class="flow-chain"><span class="pill neg">Recession</span><span class="arrow">→</span><span class="pill neg">AD falls</span><span class="arrow">→</span><span class="pill neg">Firms cut output</span><span class="arrow">→</span><span class="pill neg">Workers laid off</span><span class="arrow">→</span><span class="pill amber">Cyclical unemployment</span></div>`,
          `<strong>Seasonal unemployment</strong> follows predictable annual patterns — ski instructors in summer, beach resort workers in winter. Statisticians often report <strong>seasonally adjusted</strong> figures to strip out these predictable patterns and reveal the underlying trend.`,
          `<div class="watch-out"><div class="watch-out-label">Common Mistake</div><p><strong>Frictional and structural unemployment exist even when the economy is at "full employment."</strong> The <strong>natural rate of unemployment</strong> (or <strong>NAIRU</strong>) is the unemployment rate consistent with stable inflation — it includes frictional and structural but <em>not</em> cyclical unemployment. In the UK, this is estimated at around 4-4.5%. Confusing actual unemployment with the natural rate is a common exam error.</p></div>`
        ],
        examTip: `Examiners frequently give you a scenario and ask what TYPE of unemployment is occurring. The key is the cause: if it's a recession, it's cyclical; if it's a mismatch of skills or location, it's structural; if workers are between jobs, it's frictional. The policy response must match the type — demand-side policies fix cyclical unemployment but do nothing for structural unemployment, which needs supply-side interventions like retraining and education.`
      },
      {
        title: 'Causes and Consequences',
        points: [
          `The causes of unemployment map directly onto the types. <strong>Demand-side causes</strong> include recession, falling consumer confidence, global downturns, and tight monetary or fiscal policy. The 2008 financial crisis demonstrated how a banking collapse could cascade through the entire economy: credit dried up, businesses couldn't finance operations, consumers stopped spending, and unemployment surged globally.`,
          `<strong>Supply-side causes</strong> include technological change (automation replacing routine jobs — self-checkout machines, AI in customer service), globalisation (manufacturing shifting to lower-wage countries), occupational immobility (workers lacking the skills employers need), and geographical immobility (workers unable to relocate, often because of housing costs).`,
          `<strong>Labour market rigidities</strong> — high minimum wages that price low-skilled workers out of jobs, generous unemployment benefits that reduce the incentive to search, and excessive regulation — can push unemployment above its natural rate. However, this is contested: many economists argue that reasonable minimum wages don't significantly increase unemployment.`,
          `<div class="content-subhead">Consequences for Individuals and the Economy</div>`,
          `For the individual, unemployment means <strong>lost income and reduced living standards</strong>. But the damage goes beyond money: prolonged unemployment is associated with <strong>mental health deterioration</strong>, loss of skills and employability (<strong>hysteresis</strong>), family breakdown, and increased substance abuse. Regions with persistent high unemployment experience deep social problems that persist for generations.`,
          `For the economy, unemployment represents <strong>wasted resources</strong> — the economy is operating inside its production possibility frontier. <strong>Okun's Law</strong> suggests that for every 1% unemployment rises above the natural rate, GDP falls by roughly 2-3% below potential. That's billions of pounds of lost output that can never be recovered.`,
          `The government faces <strong>fiscal consequences</strong>: spending on benefits rises while tax revenues fall, widening the budget deficit. During 2008-09, the UK's budget deficit ballooned from 2.6% to over 10% of GDP, largely due to these automatic effects.`,
          `<div class="take-away"><div class="take-away-label">Take Away</div><p>Unemployment creates <strong>negative externalities</strong> that extend beyond the individuals directly affected — higher crime, poorer health, lower educational attainment, weaker community cohesion. This is why governments intervene: unemployment isn't just a personal misfortune but a societal problem with far-reaching consequences.</p></div>`
        ]
      }
    ]
  },

  // ──────────────────────────────────────────────
  // Block 7: Balance of Payments: Current Account
  // ──────────────────────────────────────────────
  {
    title: 'Balance of Payments: Current Account',
    concepts: [
      {
        title: 'Structure',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>The <strong>balance of payments</strong> is a record of all financial transactions between a country and the rest of the world — essentially a country's international bank statement. The <strong>current account</strong> tracks the flow of goods, services, income, and transfers in and out of the country.</p></div>`,
          `<div class="content-subhead">The Four Components</div>`,
          `The <strong>trade in goods balance</strong> compares the value of physical goods exported with those imported. The UK has run a persistent goods deficit for decades — in 2023 it was around £150 billion — reflecting the UK's shift from manufacturing to services.`,
          `The <strong>trade in services balance</strong> covers invisible exports and imports — financial services, insurance, consulting, education, tourism. The UK is a global powerhouse here: the City of London's financial services, legal firms, and universities all generate massive service exports. The UK typically runs a services <strong>surplus</strong> of around £100-120 billion, partly offsetting the goods deficit.`,
          `<strong>Primary income</strong> records earnings on overseas investments flowing in, minus earnings on domestic investments flowing out to foreign owners. If a UK pension fund earns dividends from US shares, that's a credit. If Toyota repatriates profits from its UK factory to Japan, that's a debit.`,
          `<strong>Secondary income</strong> includes government transfers like overseas aid and private transfers like <strong>remittances</strong> — workers sending money home to their families. The UK is a net payer here.`,
          `<div class="flow-chain"><span class="pill neg">Goods deficit ~£150bn</span><span class="arrow">+</span><span class="pill pos">Services surplus ~£110bn</span><span class="arrow">+</span><span class="pill blue">Primary income ≈ 0</span><span class="arrow">+</span><span class="pill neg">Secondary income deficit</span><span class="arrow">=</span><span class="pill neg">UK current account deficit</span></div>`
        ]
      },
      {
        title: 'Deficit',
        points: [
          `A <strong>current account deficit</strong> means a country is spending more on imports and foreign payments than it earns from exports and foreign income. To finance this gap, it must attract capital inflows: foreign investment, borrowing from abroad, or selling domestic assets. The current account deficit must be exactly offset by a <strong>financial account surplus</strong> — the balance of payments always balances.`,
          `The causes include: <strong>high domestic demand</strong> sucking in imports, a <strong>strong exchange rate</strong> making exports expensive and imports cheap, <strong>weak competitiveness</strong> due to high relative inflation or low productivity, <strong>structural dependence on imports</strong> (the UK imports roughly half its food and most of its energy), and a <strong>declining manufacturing base</strong>.`,
          `Should you worry about a current account deficit? It depends. A deficit driven by <strong>investment imports</strong> — buying foreign machinery to boost productive capacity — can be positive. South Korea ran large deficits in the 1960s-70s while importing the capital goods that built its industrial base. But a deficit driven by <strong>excessive consumption</strong> financed by debt is more concerning.`,
          `Persistent deficits can lead to: <strong>rising external debt</strong>, <strong>currency depreciation</strong> if foreign investors lose confidence, and <strong>vulnerability to sudden stops</strong> — if capital inflows dry up abruptly, as happened to several Asian economies in 1997, the result can be a full-blown financial crisis.`,
          `The UK's chronic current account deficit — averaging 3-4% of GDP — has been sustained largely because London's financial markets attract huge foreign capital inflows. Whether this is sustainable is one of the major evaluative questions in macroeconomics.`
        ]
      },
      {
        title: 'Surplus',
        points: [
          `A <strong>current account surplus</strong> means a country earns more from the rest of the world than it spends. On the surface this looks like success — and for many countries it reflects genuine strengths: high-quality exports, strong competitiveness, and a healthy savings culture. Germany's surplus of around 6-7% of GDP in the mid-2010s reflected the global dominance of its manufacturing exports.`,
          `But a surplus isn't unambiguously positive. A large surplus can indicate <strong>weak domestic demand</strong> — consumers and businesses aren't spending enough at home. Germany has been criticised by the <strong>European Commission</strong> and the <strong>IMF</strong> for exactly this: by running persistent surpluses, it was effectively exporting its excess savings and relying on other countries to generate the demand.`,
          `There's a global dimension: one country's surplus is another country's deficit. Persistent <strong>global imbalances</strong> were one of the underlying causes of the 2008 financial crisis, as surplus countries recycled their earnings into risky financial assets in deficit countries.`,
          `A surplus country accumulates <strong>foreign assets</strong> — China holds over $3 trillion in foreign reserves; Norway invests its oil surplus in the world's largest sovereign wealth fund (worth over $1.5 trillion). These assets provide security and future income, but holding them also means the country is consuming less today than it could.`,
          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>Resist the temptation to treat a surplus as automatically "good" and a deficit as automatically "bad." The best analysis considers <strong>why</strong> the surplus exists, <strong>how large</strong> it is, and <strong>what consequences</strong> it has for trading partners. This nuanced evaluation distinguishes a top-mark answer from a superficial one.</p></div>`,
          `<div class="take-away"><div class="take-away-label">Take Away</div><p>The current account balance reflects deep structural features of an economy — its trade patterns, competitiveness, savings behaviour, and position in the global financial system. Whether a deficit or surplus is beneficial depends entirely on its cause, its size, and how it's financed.</p></div>`,
          `<div class="section-links"><span class="link">↗ 2.2 Aggregate Demand</span><span class="link">↗ 2.5 Economic Growth</span></div>`
        ],
        examTip: `A classic examiner trap is assuming that a current account surplus is always desirable. Strong answers explain that a surplus may reflect weak domestic consumption, that it creates deficits elsewhere (global imbalance), and that the desirability depends on the cause. Apply this two-sided analysis to any balance of payments question for maximum evaluation marks.`
      }
    ]
  }
],

'aggregate-demand': [
  // ──────────────────────────────────────────────
  // Block 0: Components of Aggregate Demand
  // ──────────────────────────────────────────────
  {
    title: 'Components of Aggregate Demand',
    concepts: [
      {
        title: 'What Is AD?',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p><strong>Aggregate demand (AD)</strong> is the <strong>total planned spending</strong> on goods and services in an economy at a given price level over a given time period. It's captured in the formula: <strong>AD = C + I + G + (X - M)</strong> — consumption, investment, government spending, and net exports all rolled into one.</p></div>`,
          `Why does aggregate demand matter so much? Because in the short run, changes in AD are the primary driver of economic fluctuations — recessions happen when AD falls sharply, and booms happen when AD rises rapidly. The 2008 financial crisis was fundamentally an AD collapse: consumer confidence crashed, investment dried up, and even government spending couldn't offset the plunge fast enough.`,
          `<div class="flow-chain"><span class="pill blue">C (Consumption)</span><span class="arrow">+</span><span class="pill blue">I (Investment)</span><span class="arrow">+</span><span class="pill blue">G (Govt Spending)</span><span class="arrow">+</span><span class="pill blue">(X - M) Net Exports</span><span class="arrow">=</span><span class="pill amber">Aggregate Demand</span></div>`,
          `One crucial nuance: AD measures <strong>planned</strong> (or desired) spending, not actual spending. If firms plan to invest £100 billion but can only get £80 billion in credit, actual investment falls short. The gap between planned AD and actual output is what drives the economy toward equilibrium — the foundation of Keynesian macroeconomics.`
        ],
        formula: 'AD = C + I + G + (X - M)'
      },
      {
        title: 'Consumption (C)',
        points: [
          `<strong>Consumption</strong> is household spending on goods and services — from bread and bus tickets to holidays and hairdressing. In the UK, consumption accounts for roughly <strong>60-65% of GDP</strong>, making it by far the largest component of aggregate demand. When UK consumers feel confident and spend freely, the economy grows; when they pull back — as during COVID lockdowns or the 2022 cost-of-living crisis — the impact is immediate and dramatic.`,
          `How much of any extra income you spend rather than save is captured by the <strong>marginal propensity to consume (MPC)</strong>. If you receive an extra £100 and spend £80 of it, your MPC is 0.8. The remaining £20 is saved — your <strong>marginal propensity to save (MPS)</strong> is 0.2. Together, MPC + MPS = 1. The MPC matters enormously because it determines the size of the <strong>multiplier effect</strong>.`,
          `MPC varies dramatically across the income distribution. Lower-income households tend to have a higher MPC — if a minimum-wage worker gets a £500 bonus, most of it will be spent immediately on necessities. A millionaire getting the same £500 might save nearly all of it. This is why policies targeting lower-income groups tend to have a larger impact on consumption and therefore on AD.`,
          `The relationship between income and consumption was formalised by <strong>John Maynard Keynes</strong> in his <strong>consumption function</strong>: as national income rises, consumption rises too — but by less than the rise in income, because some of the increase is saved. This implied that higher incomes wouldn't automatically generate enough demand to maintain full employment.`,
          `Don't confuse consumption with consumer spending on <em>everything</em>. The economic definition excludes the purchase of new housing (that's investment). It also distinguishes between <strong>durable goods</strong> (cars, washing machines — volatile, sensitive to confidence) and <strong>non-durables</strong> (food, fuel — stable, less sensitive). Durable goods purchases are often the first to fall when recession looms.`
        ],
        formula: 'MPC = ΔC/ΔY'
      },
      {
        title: 'Investment (I)',
        points: [
          `In macroeconomics, <strong>investment (I)</strong> has a specific meaning: spending on <strong>capital goods</strong> — machinery, equipment, factories, technology, infrastructure — that increases the economy's productive capacity. It also includes <strong>changes in inventories</strong> and <strong>residential construction</strong>. Investment is the economy's way of building for the future.`,
          `Although investment is only around <strong>17-18% of UK GDP</strong>, it's the most <strong>volatile</strong> component of aggregate demand. Business investment can swing by 20-30% in a single year — compare that to consumption, which rarely moves by more than 2-3%. The sharp fall in investment during the 2008 financial crisis (-15% in one year) was a key driver of the recession.`,
          `Why is investment so volatile? Because it depends heavily on <strong>business confidence</strong> and <strong>expectations</strong> about future demand. Keynes called this "<strong>animal spirits</strong>" — the gut feeling of entrepreneurs about whether the future looks bright or bleak. This makes investment inherently forward-looking and psychologically driven in a way that consumption is not.`,
          `<strong>Interest rates</strong> are the other critical driver. Investment projects are typically financed by borrowing. When interest rates are low, the cost of borrowing falls and more projects become profitable. When rates rise, marginal projects become unviable. The Bank of England's rate hikes from 0.1% to 5.25% in 2022-23 significantly cooled UK business investment.`,
          `For exam purposes, always distinguish between <strong>gross investment</strong> (total spending on capital goods) and <strong>net investment</strong> (gross investment minus depreciation). Net investment is what actually expands productive capacity — it's the relevant figure for assessing long-term growth potential.`
        ]
      },
      {
        title: 'Government Spending (G)',
        points: [
          `<strong>Government spending (G)</strong> in the AD formula refers to public expenditure on goods and services — building roads, funding the NHS, equipping the military, paying teachers. In the UK, it accounts for roughly <strong>20-22% of GDP</strong>. It's a powerful lever because, unlike C and I, the government can choose to increase it directly and quickly.`,
          `<div class="watch-out"><div class="watch-out-label">Common Mistake</div><p><strong>G does not include transfer payments</strong> — pensions, Jobseeker's Allowance, housing benefit, student loans. Transfers are redistributions of existing income, not new purchases of goods and services. When the government pays a pension, no new output is created at that moment; the pensioner then spends it (which shows up in C, not G). Never include transfers in G.</p></div>`,
          `Government spending can act as an <strong>automatic stabiliser</strong> or a <strong>discretionary policy tool</strong>. Automatically, spending on unemployment benefits rises during recessions and falls during booms — smoothing the business cycle. Discretionary fiscal policy means the government actively choosing to raise or cut spending — as the UK did with its £350 billion COVID-19 support package in 2020.`,
          `The impact depends on how spending is financed. If funded by taxation, the expansionary effect is partly offset. If funded by borrowing, the full spending adds to AD — but may "crowd out" private investment by pushing up interest rates. These trade-offs are at the heart of fiscal policy debates.`,
          `G is one of the more <strong>stable</strong> components of AD because governments plan budgets in advance. However, during <strong>austerity</strong> — like the UK's 2010-16 fiscal consolidation — G can be actively reduced, shifting AD leftward. Whether austerity helps or hurts is one of the great macroeconomic debates of the past decade.`
        ]
      },
      {
        title: 'Net Exports (X - M)',
        points: [
          `<strong>Net exports</strong> equal the value of a country's exports (X) minus its imports (M). If the UK exports £600 billion but imports £700 billion, net exports are <strong>-£100 billion</strong>, meaning trade is <em>subtracting</em> from aggregate demand.`,
          `The UK has run a persistent <strong>net export deficit</strong> for decades, meaning trade has been a net drag on AD. This reflects the UK's declining manufacturing sector, heavy dependence on imported energy and food, and a strong consumer culture favouring foreign goods. Germany and China, by contrast, are chronic net exporters.`,
          `The <strong>exchange rate</strong> is the single most important determinant. When the pound depreciates, UK exports become cheaper for foreign buyers and imports become more expensive — improving net exports. After the Brexit referendum in June 2016, the pound fell roughly 15% against the dollar. UK exporters initially benefited, but importers faced higher costs.`,
          `<strong>Relative inflation rates</strong> also matter. If UK inflation runs higher than its trading partners', UK goods become less price-competitive over time. Strong productivity growth can improve competitiveness by reducing unit labour costs — German manufacturing competitiveness partly reflects decades of strong productivity gains.`,
          `<div class="take-away"><div class="take-away-label">Take Away</div><p>Always consider net exports in the context of <strong>global conditions</strong>. If the Eurozone enters recession, demand for UK exports falls regardless of UK domestic conditions. No economy is an island — macroeconomics is increasingly a global discipline, and net exports are where the domestic and international economies connect.</p></div>`
        ]
      }
    ]
  },

  // ──────────────────────────────────────────────
  // Block 1: The AD Curve
  // ──────────────────────────────────────────────
  {
    title: 'The AD Curve',
    concepts: [
      {
        title: 'Shape',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>The <strong>AD curve</strong> slopes <strong>downward from left to right</strong>, showing that as the general price level falls, the total quantity of goods and services demanded rises — and vice versa. But the reasons for this slope are completely different from a microeconomic demand curve. There are no substitutes for "the entire economy's output."</p></div>`,
          `The downward slope is explained by three distinct effects: the <strong>wealth effect</strong>, the <strong>international competitiveness effect</strong>, and the <strong>interest rate effect</strong>. Each operates through a different channel, and examiners expect you to explain all three. Together, they explain why a lower price level stimulates more spending across the economy.`,
          `<div class="watch-out"><div class="watch-out-label">Common Mistake</div><p>The AD curve shows the relationship between the <strong>price level</strong> (not inflation) and <strong>real GDP demanded</strong>. A movement <em>along</em> the AD curve is caused by a change in the price level. A <em>shift</em> of the entire curve is caused by a change in any non-price factor. Confusing movements with shifts is one of the most common diagram errors in macroeconomics exams.</p></div>`
        ]
      },
      {
        title: 'Wealth Effect',
        points: [
          `Imagine you have £10,000 in savings. If the price level falls by 10%, your £10,000 can now buy 10% more — you feel wealthier even though your nominal savings haven't changed. This is the <strong>wealth effect</strong> (also called the <strong>real balances effect</strong> or <strong>Pigou effect</strong>). A lower price level increases the <strong>real value</strong> of household wealth, encouraging more consumption.`,
          `<div class="flow-chain"><span class="pill pos">Price level falls</span><span class="arrow">→</span><span class="pill pos">Real value of savings rises</span><span class="arrow">→</span><span class="pill pos">Consumers feel wealthier</span><span class="arrow">→</span><span class="pill pos">Consumption rises</span><span class="arrow">→</span><span class="pill amber">AD increases</span></div>`,
          `The mechanism works in reverse too: a higher price level erodes the real value of savings, making people feel poorer and leading them to cut spending. During the UK's high-inflation period of 2022-23, the real value of savings was being eaten away, squeezing consumer spending even for people who hadn't received pay cuts.`,
          `In practice, most economists consider the Pigou effect to be relatively weak — consumers don't immediately adjust their spending when the price level shifts. But it's still an important theoretical explanation for the AD curve's slope, and you must include it in your exam answer alongside the other two effects.`
        ]
      },
      {
        title: 'International Competitiveness Effect',
        points: [
          `If the UK's price level falls while price levels in other countries remain unchanged, UK goods become <strong>relatively cheaper</strong> on world markets. Foreign buyers find British exports more attractive, so export demand rises. At the same time, UK consumers find domestic products cheaper compared to imports, switching away from foreign goods. The result: exports rise, imports fall, <strong>net exports improve</strong>, and AD increases.`,
          `<div class="flow-chain"><span class="pill pos">UK price level falls</span><span class="arrow">→</span><span class="pill pos">UK exports cheaper abroad</span><span class="arrow">→</span><span class="pill pos">Exports rise, imports fall</span><span class="arrow">→</span><span class="pill pos">(X - M) improves</span><span class="arrow">→</span><span class="pill amber">AD increases</span></div>`,
          `This effect is stronger for economies highly open to trade. A small, trade-dependent economy like the Netherlands (exports over 80% of GDP) will see a much larger impact than the relatively closed US (exports about 12% of GDP). The UK sits somewhere in between, with exports around 30% of GDP.`,
          `A subtle point for exams: this effect assumes the <strong>nominal exchange rate doesn't change</strong> when the domestic price level changes. In reality, exchange rates often adjust to offset price differences (purchasing power parity). Over the long run, currency movements may partially neutralise this effect — but in the short run it's real and significant.`
        ]
      },
      {
        title: 'Interest Rate Effect',
        points: [
          `When the price level rises, people and firms need <strong>more money</strong> to carry out the same transactions. This increased demand for money, with a fixed money supply, pushes up <strong>interest rates</strong>. Higher interest rates discourage borrowing for consumption and investment, so spending falls and AD decreases.`,
          `<div class="flow-chain"><span class="pill neg">Price level rises</span><span class="arrow">→</span><span class="pill neg">Money demand rises</span><span class="arrow">→</span><span class="pill neg">Interest rates rise</span><span class="arrow">→</span><span class="pill neg">Borrowing falls</span><span class="arrow">→</span><span class="pill neg">C and I fall</span><span class="arrow">→</span><span class="pill amber">AD decreases</span></div>`,
          `Conversely, a lower price level means less money is needed for transactions, pushing interest rates down. Lower rates make borrowing cheaper — mortgages, car loans, business investment all become more affordable — stimulating consumption and investment. This is sometimes called the <strong>Keynes effect</strong>.`,
          `The interest rate effect is generally considered the <strong>most powerful</strong> of the three explanations. Interest rates influence both consumption (mortgage costs, credit card rates, saving incentives) and investment (cost of financing projects). A 1% change in interest rates can shift billions of pounds of spending, which is exactly why the Bank of England uses interest rates as its primary monetary policy tool.`,
          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>Notice the chain of causation: price level changes → money demand changes → interest rate changes → C and I change → AD changes. Examiners may ask you to trace the full <strong>transmission mechanism</strong>. Don't just say "lower prices mean more spending" — explain the interest rate channel through which this occurs.</p></div>`,
          `<div class="take-away"><div class="take-away-label">Take Away</div><p>The AD curve slopes downward because of three effects — wealth, international competitiveness, and interest rate — each operating through a different channel. The interest rate effect is the most powerful, but all three must be explained for full marks. Remember: movements <em>along</em> the curve come from price level changes; <em>shifts</em> come from everything else.</p></div>`
        ],
        examTip: `When explaining why the AD curve slopes downward, you MUST cover all three effects — wealth, international competitiveness, and interest rate. Many students only explain one or two. Present them as a numbered list with clear cause-and-effect chains. The interest rate effect is usually the strongest and most important to explain in detail, but all three are needed for full marks.`
      }
    ]
  },

  // ──────────────────────────────────────────────
  // Block 2: Shifts in Aggregate Demand
  // ──────────────────────────────────────────────
  {
    title: 'Shifts in Aggregate Demand',
    concepts: [
      {
        title: 'Factors',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>A <strong>shift of the AD curve</strong> means that at every price level, the total amount of goods and services demanded has changed. A <strong>rightward shift</strong> means more is demanded (AD has increased); a <strong>leftward shift</strong> means less is demanded (AD has decreased). Since AD = C + I + G + (X - M), anything that changes one of these components — other than the price level — will shift the curve.</p></div>`,
          `In practice, multiple shifts often happen simultaneously. The COVID-19 pandemic in 2020 reduced C (lockdowns prevented spending), collapsed I (business uncertainty soared), massively increased G (government stimulus), and disrupted both X and M. The net effect depended on which changes dominated — initially the collapse in C and I overwhelmed the increase in G, shifting AD sharply leftward.`,
          `<div class="flow-chain"><span class="pill neg">COVID: C falls</span><span class="arrow">+</span><span class="pill neg">I collapses</span><span class="arrow">+</span><span class="pill pos">G surges</span><span class="arrow">+</span><span class="pill neg">X-M disrupted</span><span class="arrow">=</span><span class="pill neg">AD shifts left (net)</span></div>`,
          `For your exams, every time you discuss a macroeconomic event, identify which component(s) of AD are affected, in which direction, and draw the shift on a diagram. This structured approach — event → component → direction → diagram → consequences — is the template that earns consistent high marks.`
        ]
      },
      {
        title: 'Determinants of C',
        points: [
          `<strong>Real disposable income</strong> is the most fundamental driver of consumption. When people earn more (after tax), they spend more. The UK's real disposable incomes fell sharply in 2022 as wages failed to keep pace with inflation, and retail sales volumes dropped accordingly. The MPC determines how much of each extra pound is spent.`,
          `<strong>Consumer confidence</strong> acts as a powerful psychological amplifier. When people feel optimistic about job security — as in the mid-2000s UK housing boom — they spend freely and even borrow to spend more. When confidence collapses, consumers slash spending and build precautionary savings, even if their current income hasn't changed. The <strong>GfK Consumer Confidence Index</strong> is a closely watched leading indicator in the UK.`,
          `<strong>Interest rates</strong> influence consumption through multiple channels: lower rates reduce monthly mortgage payments, make saving less attractive, and make borrowing for big purchases cheaper. When the Bank of England cut rates to 0.1% during COVID, it was directly supporting consumption through these channels.`,
          `<strong>Wealth effects</strong> from asset prices are powerful. When house prices rise, homeowners feel wealthier and spend more — this "<strong>housing wealth effect</strong>" is especially potent in the UK where roughly 65% of households own their home. Between 2000 and 2007, UK house prices roughly doubled, fuelling a consumer spending boom.`,
          `<strong>Availability of credit</strong> determines whether spending desires translate into actual purchases. Before 2008, UK banks offered 125% mortgages and credit cards with minimal checks, fuelling a debt-driven boom. After the crisis, tighter lending standards ("credit crunch") dampened consumption for years.`,
          `<strong>Taxation</strong> directly affects disposable income. The UK's temporary VAT cut from 17.5% to 15% in December 2008 was specifically designed to boost consumption during the recession. Conversely, the National Insurance increase in 2022 reduced take-home pay.`,
          `<strong>Income distribution</strong> matters because MPC varies across income groups. Policies that redistribute toward lower earners — raising the minimum wage, increasing benefits — tend to increase total consumption more than equivalent policies benefiting higher earners.`
        ]
      },
      {
        title: 'Determinants of I',
        points: [
          `<strong>Interest rates</strong> are the textbook determinant. Firms compare the expected rate of return on a project with the cost of borrowing. If a factory extension is expected to yield 8% returns and the interest rate is 5%, the project goes ahead. If rates rise to 9%, it doesn't. The Bank of England's rate hikes from 0.1% to 5.25% made many previously profitable projects unviable.`,
          `<strong>Business confidence and expectations</strong> — Keynes's "animal spirits" — are arguably even more important in practice. Post-Brexit uncertainty depressed UK business investment for years, even when interest rates were at historic lows, because firms were uncertain about future trading arrangements.`,
          `<strong>Corporate tax rates</strong> and <strong>government incentives</strong> directly affect profitability. The UK cut corporation tax from 28% to 19% between 2010 and 2017 to attract investment. The subsequent rise to 25% in 2023 risked discouraging investment. "Full expensing" (introduced 2023) allows firms to deduct 100% of qualifying investment costs immediately.`,
          `<strong>Technological change</strong> creates investment opportunities. The development of AI, robotics, and green energy technology is driving substantial investment. The UK's net-zero target has triggered significant investment in wind farms, electric vehicle infrastructure, and energy-efficient buildings.`,
          `<strong>Access to credit</strong> matters independently of interest rates. During the 2008 credit crunch, banks drastically tightened lending, and many profitable projects couldn't secure funding. SMEs were hit hardest because they rely most heavily on bank lending.`,
          `<strong>Spare capacity</strong> influences whether firms need to invest at all. If existing factories are running at 70% capacity, there's little reason to build new ones. Investment surges when capacity utilisation is high and firms struggle to meet demand. The <strong>CBI Industrial Trends Survey</strong> tracks this.`,
          `<strong>Global economic conditions</strong> matter increasingly. UK firms must weigh global demand prospects, geopolitical risks (Russia-Ukraine war, US-China tensions), and supply chain stability. The UK competes with Ireland, the Netherlands, and Singapore for mobile international investment.`
        ]
      },
      {
        title: 'Determinants of G',
        points: [
          `<strong>Fiscal policy decisions</strong> are the primary determinant — shaped by political priorities, economic conditions, and ideology. A government committed to austerity (UK Coalition, 2010-15) actively cut spending, shifting AD left. A government focused on stimulus (COVID-19 response) dramatically increased spending, shifting AD right.`,
          `<strong>Automatic stabilisers</strong> adjust G without explicit policy decisions. During recessions, spending on unemployment benefits and social services automatically rises as more people qualify. During booms, this spending falls. These stabilisers help smooth the business cycle.`,
          `<strong>Government debt and borrowing constraints</strong> limit spending. The UK's national debt exceeded 100% of GDP by 2023, prompting fierce debate about fiscal sustainability. Self-imposed <strong>fiscal rules</strong> constrain choices. Countries with weaker fiscal positions face market pressure — if investors doubt repayment ability, bond yields rise, forcing spending cuts (as Greece experienced during the Eurozone crisis).`,
          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p><strong>Demographic and structural pressures</strong> create long-term spending trends. The UK's ageing population means NHS and pension costs are rising inexorably, crowding out spending on infrastructure or education. These structural forces constrain the government's ability to use G as a discretionary counter-cyclical tool.</p></div>`
        ]
      },
      {
        title: 'Determinants of (X-M)',
        points: [
          `The <strong>exchange rate</strong> is the single most powerful short-run determinant. A <strong>depreciation</strong> makes UK exports cheaper in foreign currencies and imports more expensive — improving net exports. After the June 2016 Brexit vote, the pound fell from $1.50 to $1.20, boosting export competitiveness but raising the cost of imported goods.`,
          `<div class="flow-chain"><span class="pill blue">£ depreciates</span><span class="arrow">→</span><span class="pill pos">Exports cheaper abroad</span><span class="arrow">→</span><span class="pill neg">Imports dearer at home</span><span class="arrow">→</span><span class="pill pos">(X-M) improves</span><span class="arrow">→</span><span class="pill amber">AD shifts right</span></div>`,
          `<strong>Relative inflation rates</strong> affect competitiveness over time. If UK inflation consistently exceeds trading partners', UK goods become progressively more expensive. This is the "real exchange rate" — even if the nominal exchange rate stays constant, higher domestic inflation effectively makes the currency overvalued.`,
          `<strong>Income levels at home and abroad</strong> drive trade volume. When UK income rises, consumers buy more imports — worsening net exports. When incomes rise in the UK's export markets, demand for UK exports increases. A UK boom can actually worsen net exports by sucking in imports.`,
          `<strong>Non-price competitiveness</strong> — quality, design, branding, innovation — matters as much as price. German cars command premium prices because of engineering quality, not because they're cheap. UK financial services and higher education compete on expertise and reputation rather than cost.`,
          `<strong>Trade policies and barriers</strong> shape the trading environment. Brexit introduced customs checks, regulatory divergence, and administrative costs that didn't exist in the EU Single Market. The <strong>OBR</strong> estimated that Brexit would reduce UK trade intensity by about 15% in the long run.`,
          `<div class="take-away"><div class="take-away-label">Take Away</div><p><strong>Global economic conditions</strong> set the backdrop for all trade. A global recession reduces world trade as every country's import demand falls simultaneously. Supply chain disruptions and geopolitical fragmentation can reroute or reduce trade for reasons unrelated to price or competitiveness.</p></div>`
        ]
      }
    ]
  },

  // ──────────────────────────────────────────────
  // Block 3: The Multiplier
  // ──────────────────────────────────────────────
  {
    title: 'The Multiplier',
    concepts: [
      {
        title: 'Concept',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>The <strong>multiplier effect</strong> means that an initial change in spending generates a <strong>larger final change in GDP</strong>. If the government spends £1 billion building a railway, construction workers earn income, spend it at shops, creating income for shopkeepers, who spend it in turn — each round amplifying the original injection.</p></div>`,
          `The concept was developed by <strong>John Maynard Keynes</strong> during the Great Depression. Its radical implication: government spending doesn't just add its own value to GDP — it triggers a chain of additional spending. This was the argument for why fiscal stimulus works: even borrowed spending can pay for itself if the multiplier is large enough.`,
          `<div class="flow-chain"><span class="pill blue">Govt spends £1bn</span><span class="arrow">→</span><span class="pill blue">Workers earn income</span><span class="arrow">→</span><span class="pill blue">Workers spend (MPC)</span><span class="arrow">→</span><span class="pill blue">Others earn income</span><span class="arrow">→</span><span class="pill blue">Others spend...</span><span class="arrow">→</span><span class="pill amber">GDP rises by £1bn x multiplier</span></div>`,
          `The size depends on how much of each round is <strong>re-spent</strong> versus <strong>leaked</strong>. If people spend 80% of extra income (MPC = 0.8), each round retains most of its force and the multiplier is large. If people save, pay taxes, or buy imports, each round dissipates quickly. The leakages — savings, taxation, and imports — collectively determine the <strong>marginal propensity to withdraw (MPW)</strong>.`,
          `Think of it like ripples in a pond: the initial stone creates a big splash, then each subsequent ripple is smaller. If the first round generates £1 billion and MPC = 0.8, the second generates £800m, the third £640m, the fourth £512m — converging to a total of £5 billion.`,
          `The multiplier works in <strong>both directions</strong>. A cut in spending triggers a <strong>negative multiplier effect</strong> as reduced incomes lead to reduced spending in subsequent rounds. This is why recessions can be self-reinforcing: an initial demand shock is amplified, making the downturn deeper than the original trigger would suggest.`
        ]
      },
      {
        title: 'Formula',
        points: [
          `The simplest version is <strong>1 / (1 - MPC)</strong>. If the MPC is 0.8, the multiplier is 1 / (1 - 0.8) = 1 / 0.2 = <strong>5</strong>. Every £1 of initial spending eventually generates £5 of total GDP. The higher the MPC, the larger the multiplier.`,
          `An equivalent and often more practical formulation is <strong>1 / MPW</strong>, where MPW is the <strong>marginal propensity to withdraw</strong>. Withdrawals are the three leakages: savings (S), taxation (T), and imports (M). So MPW = MPS + MPT + MPM.`,
          `Let's work a concrete example. Suppose MPS = 0.1, the marginal tax rate (MPT) = 0.2, and the marginal propensity to import (MPM) = 0.2. Then MPW = 0.1 + 0.2 + 0.2 = 0.5, and the multiplier = 1 / 0.5 = <strong>2</strong>. Every £1 of initial spending generates £2 of GDP. Notice how taxation and imports dramatically reduce the multiplier compared to the simple model — real-world multipliers in open economies are much smaller than textbook examples.`,
          `To find the <strong>total change in GDP</strong>: multiply the initial change in AD by the multiplier. If the government increases spending by £10 billion and the multiplier is 2, GDP rises by £20 billion. The formula: <strong>Change in GDP = Multiplier x Initial Change in AD</strong>.`,
          `Real-world multiplier estimates vary enormously. During recessions with spare capacity and low rates, multipliers tend to be larger (the IMF estimated above 1.5 for Eurozone austerity). During booms near full capacity, extra spending mainly pushes up prices, so the multiplier is smaller — possibly less than 1 if crowding out is severe.`,
          `The type of spending matters too. Government spending on domestically produced goods (building roads with local labour) has a higher multiplier than tax cuts for high earners (who may save much of the windfall). Infrastructure investment tends to have among the highest multipliers because it creates jobs <em>and</em> improves future productivity.`,
          `<div class="watch-out"><div class="watch-out-label">Common Mistake</div><p>A very common exam error is confusing the multiplier value with the total change in GDP. If the multiplier is 4 and the injection is £10 billion, the answer is £40 billion total GDP change — not £4 billion. Also, when calculating MPW, remember it includes <em>all three</em> leakages (MPS + MPT + MPM), not just savings.</p></div>`
        ],
        examTip: `Calculation questions on the multiplier are almost guaranteed. Practise both forms: 1/(1-MPC) when given the MPC, and 1/MPW when given individual leakages. The most common mistake is forgetting that MPW includes all three leakages (MPS + MPT + MPM), not just savings. Always show your working and state the formula before substituting numbers.`,
        formulas: [
          'Multiplier = 1 / (1 - MPC)',
          'Multiplier = 1 / MPW',
          'MPW = MPS + MPT + MPM',
          'Change in GDP = Multiplier x Initial Change in AD'
        ]
      },
      {
        title: 'Significance and Limitations',
        points: [
          `The multiplier's greatest significance is for <strong>fiscal policy</strong>. If the multiplier is large (say, 3 or above), modest spending increases produce substantial GDP gains, making stimulus powerful for fighting recessions. This underpinned the massive fiscal responses to the 2008 crisis and COVID-19. The UK's furlough scheme was designed to inject spending and let the multiplier amplify the effect.`,
          `However, the multiplier also amplifies <strong>negative shocks</strong>. The 2008 Lehman Brothers collapse triggered a global recession precisely because the negative multiplier cascaded through interconnected economies — a manageable contraction became a severe one.`,
          `<div class="content-subhead">Key Limitations</div>`,
          `<strong>Crowding out</strong> is the most important limitation. If government spending is financed by borrowing, increased demand for loanable funds pushes up interest rates, <strong>reducing private investment</strong>. In the extreme, every pound of government spending crowds out a pound of private investment, and the net multiplier is zero. Monetarist economists used this argument to challenge Keynesian fiscal stimulus.`,
          `The multiplier assumes <strong>spare capacity</strong>. If the economy is at full employment, extra spending can't generate more output — it pushes up prices (demand-pull inflation) without increasing real GDP. This is why the multiplier is most effective during recessions and least effective during booms.`,
          `<strong>Time lags</strong> reduce practical usefulness. The spending chain takes months to filter through. By the time the full effect materialises, conditions may have changed — a stimulus designed for recession might deliver its peak impact when recovery is already underway.`,
          `In an <strong>open economy</strong> like the UK, a significant proportion of each spending round leaks as imports. If consumers spend extra income on French wine and Chinese electronics, the multiplied income is created <em>abroad</em>. The UK's high import penetration means its domestic multiplier is considerably lower than the simple formula suggests.`,
          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>The strongest approach is to argue that the multiplier is <strong>real but variable</strong>. Its size depends on the MPC, spare capacity, how open the economy is, how spending is financed, and consumer expectations (<strong>Ricardian equivalence</strong>). Blanket statements like "the multiplier will boost GDP significantly" are too vague — specify the conditions under which it's large or small.</p></div>`,
          `<div class="take-away"><div class="take-away-label">Take Away</div><p>The multiplier amplifies both positive and negative AD shocks. It's most powerful during recessions with spare capacity and least effective near full employment. In open economies like the UK, import leakages significantly reduce the domestic multiplier — always account for all three withdrawals (MPS + MPT + MPM) when calculating its size.</p></div>`
        ]
      }
    ]
  },

  // ──────────────────────────────────────────────
  // Block 4: The Accelerator Effect
  // ──────────────────────────────────────────────
  {
    title: 'The Accelerator Effect',
    concepts: [
      {
        title: 'Principle',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>The <strong>accelerator principle</strong> explains why investment is so much more volatile than consumption. The core idea: the level of <strong>net investment</strong> depends not on the level of national income, but on the <strong>rate of change</strong> of national income. When demand is growing, firms invest to expand capacity. When demand is still high but <em>growing more slowly</em>, net investment actually falls.</p></div>`,
          `Here's a concrete example. A furniture manufacturer needs one machine for every 1,000 units. Currently it has 10 machines producing 10,000 units. If demand rises to 12,000, it needs two new machines — net investment of 2. If demand then rises to 13,000, it needs only one new machine — net investment has <em>halved</em> even though demand is still rising. If demand stabilises at 13,000? Net investment drops to zero.`,
          `<div class="flow-chain"><span class="pill pos">Demand growing fast</span><span class="arrow">→</span><span class="pill pos">High net investment</span><span class="arrow">→</span><span class="pill amber">Growth slows (still positive)</span><span class="arrow">→</span><span class="pill neg">Investment falls</span><span class="arrow">→</span><span class="pill neg">Demand stabilises</span><span class="arrow">→</span><span class="pill neg">Net investment = 0</span></div>`,
          `The formula quantifies this: <strong>Net Investment = Accelerator Coefficient x Change in National Income</strong>. The accelerator coefficient (often denoted <em>v</em>) represents how much additional capital is needed per unit increase in output. If v = 3, every £1 increase in national income requires £3 of net investment. This high ratio is what makes investment so much more volatile than income changes.`,
          `There are important <strong>limitations</strong>. The simple model assumes firms can expand capacity instantly (building a factory takes years), that firms respond mechanically to demand (expectations and confidence matter hugely), and that there's no spare capacity. These limitations mean the accelerator works better as a general explanation of investment volatility than a precise forecasting tool.`,
          `The accelerator also depends on whether firms believe demand changes are <strong>temporary or permanent</strong>. If a firm thinks demand growth is a blip, it'll use overtime or temporary workers. Only when firms believe growth is sustained will they commit to expensive new capital. This is why investment tends to lag behind recovery — firms wait to be sure.`
        ],
        examTip: `The accelerator is counterintuitive and examiners exploit this. The key insight: investment falls when the RATE OF GROWTH of income slows, even if income itself is still rising. Many students wrongly assume investment falls only when income falls. Practise numerical examples to internalise this — work through a scenario where demand grows at 10%, then 5%, then 0%, and calculate net investment at each stage.`,
        formula: 'Net Investment = Accelerator Coefficient x Change in National Income'
      },
      {
        title: 'Interaction of Multiplier and Accelerator',
        points: [
          `The multiplier and accelerator don't operate in isolation — they interact to create powerful self-reinforcing cycles. When the government increases spending, the <strong>multiplier</strong> amplifies this into a larger income increase. Rising income triggers the <strong>accelerator</strong>, causing investment to surge. But investment feeds back into AD, generating further income via the multiplier, which triggers further accelerator-driven investment. The two compound each other.`,
          `<div class="flow-chain"><span class="pill blue">Initial spending</span><span class="arrow">→</span><span class="pill blue">Multiplier: income rises</span><span class="arrow">→</span><span class="pill blue">Accelerator: investment rises</span><span class="arrow">→</span><span class="pill blue">Multiplier: more income</span><span class="arrow">→</span><span class="pill amber">Virtuous (or vicious) cycle</span></div>`,
          `This <strong>multiplier-accelerator interaction</strong> is one of the leading explanations for the <strong>business cycle</strong>. During upswings, it creates a virtuous circle driving the economy into a boom. During downswings, the same interaction works in reverse — falling income reduces investment (accelerator), which reduces income further (multiplier), which reduces investment further still. This explains why economies oscillate between booms and busts rather than adjusting smoothly.`,
          `<div class="take-away"><div class="take-away-label">Take Away</div><p>The multiplier-accelerator interaction is a powerful analytical tool for evaluating government policy effectiveness and the severity of shocks. When analysing any AD change, trace through <em>both</em> effects: the multiplier chain (spending → income → more spending) and the accelerator chain (changing income → changing investment). This dual analysis demonstrates the sophisticated, interconnected thinking examiners reward.</p></div>`,
          `<div class="section-links"><span class="link">↗ 2.3 Aggregate Supply</span><span class="link">↗ 2.4 National Income</span></div>`
        ]
      }
    ]
  }
]

};

async function main() {
  const ids = Object.keys(CONTENT);
  console.log(`Updating ${ids.length} content sections...\n`);

  for (const id of ids) {
    const content = CONTENT[id];
    const cc = content.reduce((s,b) => s + (b.concepts?.length||0), 0);
    const pc = content.reduce((s,b) => s + (b.concepts||[]).reduce((s2,c) => s2 + (c.points?.length||0), 0), 0);
    const { error } = await supabase.from('section_content').update({ data: content }).eq('section_id', id);
    if (error) console.log(`  ✗ ${id}: ${error.message}`);
    else console.log(`  ✓ ${id} — ${content.length} blocks, ${cc} concepts, ${pc} points`);
  }
  console.log('\nDone.');
}

main();
