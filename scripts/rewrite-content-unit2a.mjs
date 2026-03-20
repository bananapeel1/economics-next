import { supabase } from './_db.mjs';

/* ═══════════════════════════════════════════════════════════
 *  REVVY LEARN — CONTENT EXPLORER REWRITE
 *  Unit 2, Part A: Measures of Economic Performance + Aggregate Demand
 *
 *  Writing Rules Applied:
 *  1. No circular definitions — build intuition first
 *  2. Real specific examples (UK, Japan, Germany, USA, etc.)
 *  3. "So what" — connect to exam application
 *  4. Merge fragmented bullets into flowing explanations
 *  5. Contrast and tension — warn about examiner traps
 *  6. Bold key terms on first use
 *  7. Warm, direct, second-person teacher tone
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
          `Imagine you could add up the value of every haircut, every car, every hospital visit, every Netflix subscription — everything produced in a country over a year. That total is <strong>Gross Domestic Product (GDP)</strong>, the single most widely used measure of a country's economic output. It captures the <strong>total market value of all final goods and services</strong> produced within a country's borders in a given time period, usually a year or a quarter.`,
          `Notice the word <strong>final</strong> — GDP only counts finished products, not the intermediate goods used along the way. If a bakery buys flour for £1 and sells bread for £3, GDP counts the £3 loaf, not the £3 plus the £1 of flour. Counting both would be <strong>double counting</strong>, and it's one of the most common mistakes students make when explaining GDP measurement.`,
          `GDP measures output <strong>within a country's borders</strong>, regardless of who owns the factors of production. So when Nissan produces cars in Sunderland, that output counts toward UK GDP even though Nissan is a Japanese company. This territorial principle is what distinguishes GDP from <strong>GNI (Gross National Income)</strong>, which tracks the income earned by a country's residents regardless of where they produce it.`,
          `Why does GDP matter so much? Governments use it to judge whether the economy is growing or shrinking, central banks use it to set interest rates, and international organisations like the IMF use it to compare countries and allocate aid. When the UK's GDP fell by 9.7% in 2020 during COVID-19, that single number triggered massive fiscal and monetary policy responses.`,
          `Here's the thing though — GDP is a measure of <strong>output</strong>, not wellbeing. A country could have soaring GDP while most of its citizens live in poverty, if income is concentrated at the top. Keep this limitation in the back of your mind; it will come up repeatedly in evaluation questions.`
        ]
      },
      {
        title: 'Real vs Nominal GDP',
        points: [
          `Suppose the UK's GDP rises from £2 trillion to £2.1 trillion in a year. Great news? Not necessarily. If prices also rose by 5%, then the economy didn't actually produce more stuff — things just got more expensive. This is why economists distinguish between <strong>nominal GDP</strong> (measured in current prices, unadjusted) and <strong>real GDP</strong> (adjusted for inflation so it reflects actual changes in output).`,
          `<strong>Real GDP</strong> strips out the illusion of price changes by measuring output using prices from a fixed <strong>base year</strong>. Think of it as asking: "If prices hadn't changed, how much more did we actually produce?" The tool used for this conversion is the <strong>GDP deflator</strong>, a price index that captures price changes across the entire economy, not just consumer goods.`,
          `The formula is straightforward: you take nominal GDP, divide by the GDP deflator, and multiply by 100. For instance, if nominal GDP is £2.1 trillion and the deflator is 105, then real GDP is £2 trillion — meaning output actually stayed flat despite the nominal increase. The deflator essentially "deflates" the inflated figure back to base-year prices.`,
          `In exams, always use <strong>real GDP</strong> when comparing economic performance over time. Nominal figures are misleading because they conflate genuine output growth with mere price increases. If a question gives you GDP data without specifying, and prices have clearly changed, flag this as a limitation — it's exactly the kind of evaluative point examiners reward.`,
          `Be careful not to confuse the GDP deflator with the <strong>Consumer Price Index (CPI)</strong>. The CPI tracks a fixed basket of consumer goods and services. The GDP deflator covers <em>everything</em> produced in the economy — investment goods, government services, exports — and it updates the basket as production patterns change. They often give different inflation readings, and examiners sometimes test this distinction.`
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
          `For exam purposes, PPP-adjusted data is <strong>more reliable for comparing living standards</strong> across countries because it reflects the actual volume of goods and services people can afford. However, PPP calculations require accurate price data from every country, which is difficult to collect in developing nations with large informal sectors. The basket of goods also differs across cultures — rice dominates in Asia, wheat in Europe — making a universal comparison inherently imperfect.`,
          `When answering questions about international comparisons, always discuss whether the data uses PPP or market exchange rates, and explain why it matters. This kind of critical evaluation is worth significant marks, especially in longer response questions where examiners are looking for analytical depth.`
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
        title: 'The Output (Production) Method',
        points: [
          `The <strong>output method</strong> measures GDP by adding up the <strong>value added</strong> at each stage of production across every industry in the economy. Value added means the difference between a firm's output and the cost of its inputs. If a steel mill buys £100 of iron ore and sells £250 of steel, its value added is £150 — and that £150 is its contribution to GDP.`,
          `Why value added rather than total output? Because if you counted total output at every stage — the iron ore, then the steel, then the car — you'd be counting the iron ore three times. <strong>Double counting</strong> would massively overstate the economy's true output. The value-added approach neatly avoids this by only counting the new value created at each step of the supply chain.`,
          `In practice, the UK's <strong>Office for National Statistics (ONS)</strong> collects output data from every sector — agriculture, manufacturing, services, construction — and sums the value added across all of them. The services sector dominates the UK, accounting for roughly 80% of GDP, which tells you a lot about the structure of the modern British economy compared to, say, 1950 when manufacturing was far more prominent.`,
          `One major practical challenge is measuring output in the <strong>public sector</strong>. How do you value a police officer's work or a free NHS consultation? There's no market price, so statisticians use the cost of providing the service as a proxy — which may understate or overstate its true value to society. This is an evaluation point worth raising whenever GDP measurement comes up.`,
          `The output method is particularly useful for understanding <strong>structural change</strong> in an economy. By tracking which sectors are growing and which are shrinking, policymakers can identify whether an economy is deindustrialising, becoming more service-oriented, or developing its tech sector. China's shift from agriculture (50%+ of GDP in the 1960s) to manufacturing and now services is one of the great structural transformations in economic history.`
        ]
      },
      {
        title: 'The Income Method',
        points: [
          `Think about it from the other side: every pound of value that's produced ends up as income for someone. The worker earns wages, the landlord earns rent, the lender earns interest, the business owner earns profit. The <strong>income method</strong> measures GDP by summing all the incomes earned in the production process — <strong>wages and salaries, rental income, interest income, and profits</strong>.`,
          `This makes intuitive sense: if a factory produces £1 million of output, that £1 million is distributed as wages to workers, rent to the building owner, interest to the bank that financed the equipment, and profit to the shareholders. The value of production must equal the income generated by it — the same £1 million, just viewed from the perspective of who receives it rather than what's produced.`,
          `A key rule: only incomes earned from <strong>productive activity</strong> count. <strong>Transfer payments</strong> — like pensions, Jobseeker's Allowance, or student grants — are excluded because they don't correspond to any new output being created. The government is redistributing existing income, not generating new production. This is a common exam trap: students sometimes include transfer payments in income-method GDP.`,
          `The income method faces challenges with the <strong>informal economy</strong> — cash-in-hand work, undeclared earnings, and illegal activity. In developing countries, the informal sector can account for 30-60% of economic activity (the IMF estimates it at over 60% in sub-Saharan Africa). This means income-method GDP significantly understates true economic activity in many nations.`,
          `Self-employment income is particularly tricky because it blends wages and profit into a single figure — the <strong>ONS</strong> calls this "mixed income." In the UK's gig economy, with millions of self-employed workers on platforms like Deliveroo and Uber, accurately capturing this income stream has become increasingly important and increasingly difficult.`
        ]
      },
      {
        title: 'The Expenditure Method',
        points: [
          `There's a third angle: instead of measuring what's produced or what's earned, you can measure what's <strong>spent</strong>. After all, every product that's made is eventually bought by someone. The <strong>expenditure method</strong> adds up all spending on final goods and services in the economy, and this gives you the famous GDP identity that you'll use constantly throughout Unit 2.`,
          `The formula breaks spending into four components: <strong>Consumption (C)</strong> is household spending on goods and services — from groceries to gym memberships. <strong>Investment (I)</strong> is business spending on capital goods plus changes in inventories (and residential construction). <strong>Government spending (G)</strong> is public sector expenditure on goods and services like roads, schools, and defence. <strong>Net exports (X - M)</strong> is exports minus imports — because exports represent foreign spending on domestic output, while imports are domestic spending on foreign output that needs to be subtracted.`,
          `In the UK, consumption is by far the largest component — typically around 60-65% of GDP. This is why consumer confidence surveys and retail sales figures get so much attention: when households stop spending, the economy feels it immediately. Investment is smaller (around 17-18%) but far more <strong>volatile</strong>, swinging sharply with business confidence and interest rates.`,
          `When calculating GDP by expenditure, you must be careful to avoid double counting by only counting <strong>final expenditure</strong>. A firm buying components to build a computer is intermediate spending — only the final sale to the consumer (or export) counts. Also, note that government <strong>transfer payments</strong> (pensions, benefits) are not included in G because they don't represent the government buying goods or services; they are redistributions.`,
          `The expenditure method is the one most directly connected to the <strong>aggregate demand</strong> model you'll study next — in fact, the components of GDP by expenditure are exactly the components of AD. This is why understanding C, I, G, and (X - M) here sets you up for everything that follows in macroeconomics.`
        ],
        formula: 'GDP = C + I + G + (X - M)'
      },
      {
        title: 'Why the Three Methods Are Equal',
        points: [
          `In theory, all three methods — output, income, and expenditure — should give exactly the same GDP figure. This is because they're measuring the same economic activity from three different angles: what's produced, what's earned from producing it, and what's spent on buying it. Every pound of output generates a pound of income and requires a pound of expenditure. It's the <strong>circular flow of income</strong> in action.`,
          `In practice, however, the three figures rarely match perfectly. Data comes from different sources — business surveys, tax returns, household spending data — each with their own sampling methods, time lags, and measurement errors. The ONS publishes a single official GDP figure by averaging and reconciling the three, and the gap between them is reported as a <strong>statistical discrepancy</strong>.`,
          `This discrepancy actually matters for policy. If the output measure suggests the economy grew by 0.3% but the expenditure measure says 0.1%, the signal to the Bank of England is ambiguous. In 2014, the ONS undertook a major overhaul of how it balances the three measures, adopting a "supply-use framework" to produce more consistent estimates.`,
          `For exams, the key takeaway is that the three methods are <strong>conceptually identical</strong> but <strong>practically different</strong> due to measurement difficulties. If a question asks you to explain or evaluate GDP measurement, discuss this gap between theory and practice — it shows you understand both the elegance of the circular flow model and the messy reality of data collection.`
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
          `GDP data is the backbone of economic policymaking. The <strong>Bank of England</strong> watches quarterly GDP figures to decide whether to raise or lower interest rates — if GDP is growing too fast and inflation is building, rates go up; if the economy is stalling, rates come down. Without reliable GDP data, central banks would be flying blind, making trillion-pound decisions based on guesswork.`,
          `Governments use GDP to assess the success of their economic policies and to plan fiscal strategy. The UK's <strong>Office for Budget Responsibility (OBR)</strong> forecasts GDP growth to estimate future tax revenues and plan public spending. If GDP growth is projected to slow, tax receipts will fall and borrowing may need to rise — every fiscal policy decision chains back to the GDP forecast.`,
          `International organisations — the <strong>IMF</strong>, <strong>World Bank</strong>, <strong>OECD</strong> — use GDP data to compare countries, allocate development aid, assess debt sustainability, and monitor global economic health. When the IMF downgraded its global growth forecast in 2023, it triggered policy responses from governments worldwide. GDP per capita is also a key criterion for classifying countries as low-income, middle-income, or high-income.`,
          `Businesses use GDP data for strategic planning. A multinational deciding where to invest next will examine GDP growth trends, GDP per capita, and GDP composition. When India's GDP growth rate consistently exceeded 6-7% in the 2010s, it attracted huge foreign direct investment from firms like Amazon, Walmart, and Apple looking to tap into a fast-expanding consumer market.`,
          `For your exam, the core message is that GDP provides a <strong>standardised, comparable, and regularly updated</strong> measure of economic activity. No other single indicator gives you as comprehensive a snapshot. But — and this is crucial — it's a snapshot of <em>output</em>, not of wellbeing, equality, or sustainability. Always pair "GDP is useful because..." with "but it fails to capture..." for a balanced answer.`
        ]
      },
      {
        title: 'Limitations of GDP as a Measure of Living Standards',
        points: [
          `GDP tells you how much an economy produces, but it says nothing about <strong>how that output is distributed</strong>. The US has one of the world's highest GDP per capita figures, yet the top 1% of Americans own more wealth than the bottom 50% combined. A country could double its GDP while all the gains flow to a tiny elite, leaving most people no better off. For living standards, you need to look at GDP alongside measures of <strong>income inequality</strong> like the Gini coefficient.`,
          `The <strong>informal economy</strong> — cash-in-hand jobs, street trading, subsistence farming — doesn't show up in official GDP figures. In countries like Nigeria, India, or Peru, the informal sector can account for 40-60% of true economic activity. This means GDP systematically understates the actual output and living standards of developing nations, making international comparisons unreliable unless adjustments are made.`,
          `GDP completely ignores <strong>unpaid work</strong> — childcare, eldercare, volunteering, household chores. The ONS estimated that unpaid household work in the UK was worth roughly £1.24 trillion in 2016 — equivalent to about 63% of official GDP at the time. Women disproportionately perform this work, meaning GDP systematically undervalues their economic contribution. If a parent pays a nanny, it counts as GDP; if the same parent does the childcare themselves, it doesn't.`,
          `<strong>Environmental degradation</strong> can actually <em>boost</em> GDP in the short run. Cutting down the Amazon rainforest increases Brazil's timber output and agricultural GDP. An oil spill generates GDP through clean-up spending. GDP doesn't subtract the depletion of natural capital or the cost of pollution, so a country can appear to be "growing" while destroying the natural resources its future prosperity depends on.`,
          `GDP doesn't measure <strong>quality of life</strong> factors like leisure time, health outcomes, crime rates, political freedom, or community bonds. Japan and the US have similar GDP per capita figures, but Japan has far higher life expectancy, lower crime, and less inequality. French workers have shorter hours and longer holidays than Americans — they enjoy more leisure, but this shows up as <em>lower</em> GDP because fewer hours worked means less output.`,
          `<strong>Composition of output</strong> matters enormously but GDP treats all spending as equal. A country spending 30% of GDP on military hardware has a very different quality of life from one spending 30% on healthcare and education, even if the total GDP is identical. A rise in GDP driven by arms manufacturing doesn't improve citizens' daily lives the same way a rise driven by hospital construction does.`,
          `GDP doesn't capture <strong>technological improvements in quality</strong>. Your smartphone today is incomparably more powerful than a 2005 model, but if the price is the same, GDP records no change. Free digital services — Google, Wikipedia, social media — generate enormous consumer value but contribute almost nothing to GDP because they have no market price. Some economists argue GDP increasingly understates true living standards in the digital age.`,
          `GDP ignores <strong>sustainability</strong>. An economy that grows by 5% this year by burning through its oil reserves, running up unsustainable debt, and overworking its population may have impressive GDP figures, but it's borrowing from the future. <strong>Genuine Progress Indicator (GPI)</strong>, <strong>Human Development Index (HDI)</strong>, and other alternative measures try to account for sustainability, inequality, and non-market factors that GDP misses.`,
          `Despite all these flaws, GDP remains the world's primary economic indicator because it's <strong>standardised</strong>, <strong>frequently updated</strong>, and <strong>comparable across countries and over time</strong>. No alternative measure has achieved the same universality. The lesson for your exams is not that GDP is useless — it's that GDP must be supplemented with other data (Gini coefficient, HDI, environmental indicators) to form a complete picture of living standards.`
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
        title: 'The Consumer Price Index (CPI)',
        points: [
          `Imagine creating a giant shopping basket that represents what a typical household buys in a year — food, rent, petrol, clothing, streaming subscriptions, everything. Now track how the total cost of that basket changes from year to year. That's essentially what the <strong>Consumer Price Index (CPI)</strong> does: it measures the <strong>average change in prices</strong> of a representative basket of goods and services consumed by households.`,
          `The CPI starts with a <strong>base year</strong>, which is set to 100. If the CPI rises to 105 the following year, prices have risen by 5% on average. If it falls to 98, prices have dropped by 2%. The <strong>inflation rate</strong> is the percentage change in the CPI from one period to the next, and it's the UK's headline measure of price stability — the one the Bank of England targets.`,
          `The Bank of England has a <strong>2% CPI inflation target</strong>, set by the government. If inflation rises above 2%, the Bank typically raises interest rates to cool demand; if it falls below, it lowers them to stimulate spending. When CPI inflation hit 11.1% in October 2022 — the highest in 41 years — the Bank responded with the fastest series of rate rises in decades, pushing the base rate from 0.1% to over 5%.`,
          `CPI is an international standard used across the EU, US (as a variant), and most OECD countries, making it ideal for cross-country comparisons. In the UK, it replaced <strong>RPIX</strong> as the official inflation target in 2003. There's also <strong>CPIH</strong>, which includes owner-occupier housing costs — a significant addition since housing is the largest single expense for most UK households.`,
          `Don't confuse the <strong>price level</strong> with the <strong>inflation rate</strong>. If CPI goes from 100 to 110 to 115, inflation <em>fell</em> from 10% to about 4.5% — but prices are still higher than before. This is <strong>disinflation</strong> (falling inflation rate, still-rising prices), and students regularly confuse it with <strong>deflation</strong> (actually falling prices). Examiners test this distinction relentlessly.`,
          `For exam purposes, you should be comfortable using CPI data in calculations and able to explain what a change in CPI actually means for households' purchasing power. A rising CPI means each pound buys less — real incomes fall unless wages keep pace. This erosion of purchasing power is why inflation matters for everyday people, not just economists.`
        ],
        formula: 'Inflation rate = ((CPI this year - CPI last year) / CPI last year) x 100'
      },
      {
        title: 'How CPI Is Calculated',
        points: [
          `Each year, the <strong>ONS</strong> sends price collectors across the UK to record the prices of around <strong>730 representative items</strong> in the CPI basket, from roughly 150 locations nationwide. These aren't random items — they're chosen to mirror the spending patterns of a typical household, with new items added and outdated ones removed as consumer habits change. Streaming services replaced DVD rentals; oat milk entered as tastes shifted.`,
          `Not all items carry equal importance. A 5% rise in rent matters far more to your budget than a 5% rise in the price of shoelaces. The CPI accounts for this by assigning <strong>weights</strong> to each category based on its share of average household spending. Housing, water, and fuel typically carry the heaviest weight in the UK (around 30%), while categories like education carry a much smaller share.`,
          `These weights are updated annually using data from the <strong>Living Costs and Food Survey</strong>, which tracks what around 5,000 households actually spend their money on. If people start spending more on eating out and less on clothing, the weights shift to reflect this. This updating is crucial — without it, the CPI would gradually drift out of touch with real spending patterns.`,
          `Price collectors record prices at multiple outlets — supermarkets, independent shops, online retailers — to capture the range of prices consumers actually face. Increasingly, the ONS also scrapes prices from websites and uses scanner data from retailers, which provides millions of price observations rather than the thousands collected manually. This technological shift is making the CPI more accurate and more responsive.`,
          `The ONS calculates price changes for each item, applies the weights, and aggregates everything into a single index number. The calculation uses a specific formula called a <strong>geometric mean</strong> at the lowest level (individual items), which better captures consumers' tendency to switch away from items that become relatively more expensive — the so-called <strong>substitution effect</strong>.`,
          `Here's an important subtlety: the basket represents an <em>average</em> household, but no household is truly average. A retired pensioner spending heavily on heating and healthcare faces different inflation than a young professional spending on rent and takeaways. This means CPI inflation may not match your personal experience of price changes — a point worth raising in evaluation to show examiners you think critically about aggregate measures.`
        ]
      },
      {
        title: 'Limitations of CPI',
        points: [
          `The CPI basket represents the spending pattern of a <strong>typical household</strong>, but real households are enormously diverse. Pensioners, students, high-earners, and families all face different "personal inflation rates." When energy prices surge, pensioners who spend a larger share of their income on heating are hit harder than young professionals. The CPI averages over these differences, potentially misleading policymakers about who is actually suffering.`,
          `<strong>Quality improvements</strong> are difficult to capture. If a new laptop costs the same as last year's model but is twice as fast, has the price really stayed the same? Statisticians use <strong>hedonic adjustment</strong> to try to separate price changes from quality changes, but it's more art than science. Some economists argue the CPI <em>overstates</em> inflation because it doesn't fully account for how much better products have become, particularly in technology.`,
          `The <strong>substitution bias</strong> is a well-known problem. When the price of beef rises, consumers switch to chicken — but if the CPI basket still assumes the old proportion of beef spending, it overstates the impact on the consumer. While the geometric mean formula partly addresses this, the weights are only updated annually, meaning there's always a lag between changing behaviour and updated weights.`,
          `<strong>New products</strong> enter the basket with a delay. Smartphones existed for years before being included in the CPI basket; the same happened with streaming services. During this gap, the CPI misses the price trends of products that consumers are increasingly buying, and it also misses the consumer surplus from entirely new categories of goods and services.`,
          `The CPI largely excludes <strong>housing costs for owner-occupiers</strong> (mortgage payments, house prices). Since housing is typically the largest single expense for UK households, this is a significant omission. <strong>CPIH</strong> addresses this by including "owner-occupiers' housing costs" using an imputed rent approach, but CPIH and CPI can tell quite different stories — in 2022-23, CPIH was generally lower than CPI because imputed rents rose more slowly than other prices.`,
          `The CPI doesn't capture the <strong>informal economy</strong> or <strong>black market prices</strong>. In countries with extensive informal sectors (much of sub-Saharan Africa, parts of South Asia), official CPI figures may not reflect the prices that a large share of the population actually pays. Even in the UK, services like informal childcare or cash-in-hand tradespeople operate outside the CPI's radar.`,
          `Despite these limitations, the CPI remains the most practical and widely used measure of inflation precisely because it's <strong>standardised</strong>, <strong>transparent</strong>, <strong>regularly produced</strong>, and <strong>internationally comparable</strong>. No measure is perfect, and for exam purposes your job isn't to dismiss CPI but to show you understand both its value and its blind spots — then suggest how supplementary measures like CPIH, RPI, or the GDP deflator can fill the gaps.`
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
          `Picture a popular restaurant on a Saturday night — every table is full, there's a queue out the door, and the kitchen is working at maximum capacity. What happens to prices on the menu next month? They go up. That's the intuition behind <strong>demand-pull inflation</strong>: it occurs when <strong>aggregate demand (AD) grows faster than the economy's ability to produce</strong>, pulling prices upward as too much money chases too few goods.`,
          `On an AD/AS diagram, demand-pull inflation shows as a <strong>rightward shift of the AD curve</strong> along a relatively steep section of the AS curve. When the economy is already near full capacity, extra demand can't easily be met with extra output — so instead of more goods being produced, prices rise. The closer the economy is to its productive limit, the more inflationary any demand increase becomes.`,
          `What triggers the demand surge? It could be a consumer spending boom fuelled by rising house prices and easy credit — exactly what happened in the UK in 2006-07. Or it could be a government running large budget deficits (fiscal stimulus), or exports booming because the currency has weakened, or the central bank keeping interest rates too low for too long. Any component of AD — C, I, G, or (X - M) — can be the culprit.`,
          `A classic historical example: in the late 1960s, President Lyndon Johnson tried to fund both the Vietnam War and his Great Society welfare programmes simultaneously, massively expanding government spending. The US economy was already near full employment, so the extra demand produced severe demand-pull inflation that persisted well into the 1970s.`,
          `In your exam diagrams, always show the <strong>initial equilibrium</strong>, the shift in AD, and the resulting change in both the <strong>price level</strong> and <strong>real output</strong>. A common mistake is drawing the AD shift on a flat section of AS, which would show output rising without inflation — that only happens when there's significant spare capacity. For demand-pull inflation, the economy must be operating near or at full capacity.`,
          `The policy response to demand-pull inflation is typically <strong>contractionary</strong>: raise interest rates to discourage borrowing and spending, or cut government expenditure. The Bank of England's aggressive rate rises in 2022-23 were partly targeting demand-pull pressures from the post-COVID spending rebound and fiscal stimulus. The challenge is cooling demand without tipping the economy into recession — the so-called "soft landing" that's fiendishly difficult to achieve.`
        ]
      },
      {
        title: 'Cost-Push Inflation',
        points: [
          `Now imagine the opposite: demand hasn't changed, but the restaurant's costs have surged — ingredient prices doubled, staff demanded higher wages, and energy bills tripled. The restaurant raises its menu prices not because more customers are queuing, but because it costs more to produce each meal. This is <strong>cost-push inflation</strong>: it occurs when <strong>rising production costs</strong> force firms to increase prices, pushing the aggregate supply curve leftward.`,
          `On an AD/AS diagram, cost-push inflation shows as a <strong>leftward shift of the short-run aggregate supply (SRAS) curve</strong>. Output falls while the price level rises — a painful combination called <strong>stagflation</strong> (stagnation + inflation). This is far harder to deal with than demand-pull inflation because policymakers face a dilemma: fight inflation (tighten policy, worsen the recession) or fight recession (loosen policy, worsen the inflation).`,
          `The most dramatic example is the <strong>1973 oil crisis</strong>, when OPEC quadrupled oil prices. Oil is an input in virtually everything — transport, plastics, heating, chemicals, agriculture — so the cost shock rippled through every sector of every oil-importing economy. The UK, US, and Europe all experienced stagflation: inflation above 10% combined with rising unemployment and falling output.`,
          `Common causes of cost-push inflation include: <strong>rising commodity prices</strong> (oil, metals, agricultural goods), <strong>currency depreciation</strong> (making imports more expensive — after the Brexit vote in 2016, the pound fell 15% against the dollar, pushing up import costs and UK inflation), <strong>higher wages</strong> exceeding productivity growth, <strong>increased taxes or regulation</strong> on businesses, and <strong>supply chain disruptions</strong> (the COVID-19 pandemic caused global shipping costs to increase tenfold in 2021).`,
          `Here's a critical distinction for exams: demand-pull inflation is sometimes called "too much money chasing too few goods" — it's a <em>demand-side</em> problem. Cost-push inflation is a <em>supply-side</em> problem. The appropriate policy response differs fundamentally. Raising interest rates works well against demand-pull inflation, but it can make cost-push inflation worse by further reducing output without addressing the underlying supply problem.`,
          `The UK's inflation spike in 2022-23 was a textbook case of <strong>mixed inflation</strong> — both cost-push (energy price shock from the Russia-Ukraine war, supply chain disruptions) and demand-pull (post-COVID fiscal stimulus, pent-up consumer spending). In your exams, real-world inflation episodes are rarely purely one type, so explaining this combination and the policy dilemma it creates is exactly the kind of nuanced analysis that earns top marks.`
        ],
        examTip: `Examiners love asking "Is inflation demand-pull or cost-push?" for real-world scenarios. The best answers recognise that it's usually <em>both</em>. Always identify specific causes (energy prices, wage growth, consumer confidence) and link them to the correct type. Then explain why the policy response differs — this shows the evaluative depth examiners reward.`
      },
      {
        title: 'Effects of Inflation',
        points: [
          `Moderate, stable inflation (around the 2% target) is generally considered harmless — even helpful, because it gives firms room to adjust relative wages without nominal cuts, and it encourages spending today rather than hoarding cash. The problems emerge when inflation is <strong>high</strong>, <strong>volatile</strong>, or <strong>unexpected</strong>. It's the unpredictability that causes the real damage, because economic decisions depend on expectations about future prices.`,
          `Inflation erodes the <strong>purchasing power</strong> of money — each pound buys less. This hurts people on <strong>fixed incomes</strong> most severely: pensioners on defined-benefit pensions that aren't index-linked, workers whose wages lag behind prices, and savers whose bank interest doesn't keep pace with inflation. In contrast, <strong>borrowers benefit</strong> because they repay loans with money that's worth less than when they borrowed it. Inflation effectively <strong>redistributes wealth from savers and creditors to borrowers and debtors</strong>.`,
          `<strong>International competitiveness</strong> suffers when a country's inflation rate exceeds its trading partners'. If UK inflation runs at 10% while Germany's is at 3%, British exports become relatively more expensive and German imports relatively cheaper. This worsens the <strong>current account balance</strong> and can trigger a currency depreciation, which in turn makes imports more expensive — potentially creating a vicious inflationary spiral.`,
          `High inflation creates <strong>uncertainty</strong> that discourages investment. If a firm can't predict what its costs or revenues will be in two years, it's less likely to commit to building a new factory or hiring workers. This is why central banks obsess over price stability — predictable, low inflation gives businesses the confidence to plan long-term. The UK's volatile inflation in the 1970s coincided with a prolonged period of underinvestment and stagnant productivity.`,
          `Economists talk about <strong>menu costs</strong> — the literal and metaphorical cost of constantly changing prices. Restaurants reprint menus, retailers relabel shelves, vending machines are reprogrammed, and contracts must be renegotiated more frequently. These seem trivial individually, but across an entire economy they represent a significant waste of resources that could be used productively. During hyperinflation in Zimbabwe (2008), prices changed multiple times a day, making normal commerce nearly impossible.`,
          `There's also a <strong>fiscal drag</strong> effect: if income tax thresholds aren't adjusted for inflation, people get pushed into higher tax brackets purely because their nominal (not real) income has risen. This is a stealth tax increase that reduces real disposable income without any deliberate policy change. The UK government's decision to freeze income tax thresholds from 2021 to 2028 during a period of high inflation is a textbook example of fiscal drag in action.`,
          `Finally, inflation distorts <strong>economic signals</strong>. Prices are supposed to guide resource allocation — a rising price signals scarcity and attracts production. But during high inflation, it's hard to tell whether a price rose because that good became scarcer or because everything got more expensive. This "signal extraction problem" leads to <strong>misallocation of resources</strong>, as firms and consumers make decisions based on distorted price signals rather than genuine changes in supply and demand.`
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
        title: 'Definition and Types of Deflation',
        points: [
          `<strong>Deflation</strong> is a <strong>sustained fall in the general price level</strong> — the inflation rate turns negative. Don't confuse this with <strong>disinflation</strong>, which is merely inflation slowing down (say, from 5% to 2%). With deflation, prices are actually falling: the CPI is lower this year than last year. This distinction is an absolute examiner favourite, so make sure you're crystal clear on it.`,
          `Not all deflation is the same, and this is where it gets interesting. <strong>Benign (good) deflation</strong> results from improvements on the supply side — technological progress, productivity gains, or falling input costs that allow firms to produce more cheaply and pass savings on to consumers. Think about consumer electronics: the price of computing power has fallen dramatically for decades because of innovation, and nobody considers that a crisis.`,
          `<strong>Malignant (bad) deflation</strong> is the dangerous kind. It results from <strong>collapsing aggregate demand</strong> — consumers stop spending, firms cut prices to shift unsold stock, profits shrink, workers are laid off, which further reduces spending. This is a <strong>deflationary spiral</strong>, and it's what made the Great Depression so devastating. Japan experienced a milder version from the mid-1990s through the 2010s — nearly two decades of intermittent deflation that resisted every policy tool thrown at it.`,
          `The key exam skill is distinguishing between these two types. If a question tells you deflation is caused by a technological breakthrough or a fall in commodity prices, the effects may be largely positive — higher real incomes, improved competitiveness. If deflation stems from a demand-side collapse, the effects are almost entirely negative — falling output, rising unemployment, debt crises. Your analysis should be completely different depending on the cause, and this is exactly what earns evaluation marks.`
        ]
      },
      {
        title: 'Causes and Effects of Deflation',
        points: [
          `On the demand side, deflation can be triggered by a <strong>severe fall in aggregate demand</strong>: a financial crisis that crushes consumer and business confidence (as in 2008-09), a sharp fiscal contraction, or a collapse in export demand. When the Eurozone's GDP fell during the sovereign debt crisis of 2011-13, several peripheral economies — Greece, Spain, Cyprus — experienced outright deflation or near-deflation as demand evaporated.`,
          `On the supply side, deflation can result from <strong>positive supply shocks</strong>: major technological breakthroughs that slash production costs, discovery of new resources, or a sudden fall in global commodity prices. China's integration into the world economy from the 1990s onward pushed down the global price of manufactured goods — this "China effect" was a form of benign deflationary pressure that raised real living standards in importing countries.`,
          `The most feared consequence is the <strong>deflationary spiral</strong>. When prices fall, consumers postpone purchases (why buy today if it's cheaper tomorrow?). Firms see falling revenues and cut costs by laying off workers. Unemployment rises, incomes fall, and demand drops further — which pushes prices down even more. This self-reinforcing cycle is extremely difficult to break. Japan's "Lost Decades" showed that even zero interest rates and massive government spending struggled to reverse entrenched deflation expectations.`,
          `Deflation increases the <strong>real burden of debt</strong>. If you owe £100,000 on a mortgage and prices fall by 10%, your debt is now worth more in real terms — you need to sell more goods or work more hours to repay the same nominal amount. During the Great Depression, this "debt deflation" (identified by economist <strong>Irving Fisher</strong>) turned manageable debts into crushing burdens, causing waves of bankruptcies and bank failures.`,
          `<strong>Real interest rates rise</strong> during deflation even if nominal rates are at zero. The real interest rate equals the nominal rate minus inflation; with negative inflation (deflation), the real rate becomes <em>higher</em> than the nominal rate. If the nominal rate is 0% and deflation is 2%, the real rate is effectively 2%. This discourages borrowing and investment at exactly the wrong time, and the central bank has hit the <strong>zero lower bound</strong> — it can't cut rates further using conventional tools.`,
          `Deflation causes <strong>wage rigidity problems</strong>. Workers fiercely resist nominal wage cuts — it feels deeply unfair even when prices are also falling. If prices fall by 3% but nominal wages stay flat, real wages have effectively risen by 3%, making labour more expensive for firms. The result: firms lay off workers rather than cutting wages, pushing unemployment higher. This is why moderate inflation (2%) is actually helpful — it allows real wages to adjust downward without painful nominal cuts.`,
          `For businesses, deflation squeezes <strong>profit margins</strong> because revenues fall (lower selling prices) while some costs are sticky — rent contracts, loan repayments, and minimum wages don't automatically adjust downward. This is especially brutal for highly leveraged firms. Falling profits reduce business investment, which reduces future productive capacity, which can make the economic downturn structural rather than cyclical.`,
          `The policy response to demand-deficient deflation typically involves <strong>aggressive monetary easing</strong> (cutting rates to zero, then using <strong>quantitative easing</strong> to inject money directly) and <strong>fiscal expansion</strong> (government spending and tax cuts to boost demand). The Bank of Japan, the ECB, and the Federal Reserve all deployed these tools post-2008. But here's the sobering lesson: if deflation expectations become <strong>entrenched</strong> — if people genuinely believe prices will keep falling — these tools may be insufficient, as Japan painfully demonstrated for over a decade.`
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
          `The <strong>labour force</strong> (also called the <strong>economically active population</strong>) includes everyone aged 16-64 who is either working or actively seeking work. Notice the "actively seeking" requirement — your retired grandmother, a full-time university student who isn't looking for a job, and someone who has given up searching are all <strong>economically inactive</strong> and excluded from the labour force entirely. This distinction matters because the unemployment rate is calculated as a proportion of the labour force, not the total population.`,
          `<strong>Employment</strong> means being in paid work for at least one hour per week (by the ILO definition — the same standard used globally). This sounds absurdly low, and it is. Someone working a single hour per week counts as "employed" in the statistics, which means the employment rate can paint a misleadingly rosy picture if many workers are <strong>underemployed</strong> — wanting full-time work but only finding part-time or zero-hours contracts.`,
          `<strong>Unemployment</strong>, under the <strong>International Labour Organisation (ILO)</strong> definition, means a person is without a job, has actively searched for work in the last four weeks, and is available to start work within two weeks. All three conditions must be met simultaneously. If you stop looking — perhaps because you're discouraged after months of rejection — you drop out of the unemployment count entirely, which is why the official rate can fall even when the jobs market isn't actually improving.`,
          `The formula is straightforward: divide the number of unemployed by the total labour force and multiply by 100. In the UK, the unemployment rate was around 3.5% in late 2022 — historically very low — but this headline figure masked significant underemployment, regional disparities (unemployment in the North East was nearly double that in the South East), and a surge in economic inactivity post-COVID.`,
          `For exam purposes, always question the headline unemployment rate. How many people have left the labour force entirely? What about underemployment? What about regional and demographic disparities? The gap between the statistic and the lived reality is where the best evaluation marks live.`
        ],
        formula: 'Unemployment rate = (Unemployed / Labour force) x 100'
      },
      {
        title: 'Measuring Unemployment',
        points: [
          `The UK uses two main measures. The <strong>Labour Force Survey (LFS)</strong> is based on a quarterly survey of around 80,000 households, asking whether people are working, looking for work, or inactive. It follows the <strong>ILO definition</strong>, making it internationally comparable. If Japan, Germany, and the UK all report LFS-based unemployment rates, you can compare them meaningfully because they're using the same criteria.`,
          `The second measure is the <strong>Claimant Count</strong>, which simply tallies the number of people claiming <strong>unemployment-related benefits</strong> (principally Universal Credit where the claimant is required to seek work). It's simpler and cheaper to compile — it comes from administrative data rather than surveys — and it's available monthly rather than quarterly, making it more timely.`,
          `The two measures often tell different stories. The Claimant Count tends to be <strong>lower</strong> than the LFS figure because many unemployed people don't claim benefits — they may be ineligible, too proud, or unaware. Conversely, it can sometimes be <strong>higher</strong> if benefit rules are loosened and people who wouldn't meet the ILO definition start claiming. Policy changes to the benefits system can shift the Claimant Count without any real change in the labour market.`,
          `Both measures have significant <strong>blind spots</strong>. Neither captures the <strong>hidden unemployed</strong> — people who want work but have stopped actively searching (so-called <strong>discouraged workers</strong>). After COVID-19, around 500,000 additional people in the UK became economically inactive, many due to long-term illness. They don't appear in either unemployment measure, yet their absence from the workforce is a real economic problem.`,
          `<strong>Underemployment</strong> is another gap: someone working 10 hours a week who wants 40 hours counts as employed in both measures. The <strong>ONS</strong> publishes a separate underemployment rate, which in 2023 was roughly double the headline unemployment rate. This is especially relevant for analysing the <strong>gig economy</strong>, where millions of workers have insecure, variable-hours contracts.`,
          `<strong>Regional and demographic disparities</strong> are hidden by national averages. UK unemployment among 18-24 year olds is typically two to three times higher than the national average. Unemployment in some former industrial towns exceeds 8% while parts of the South East sit below 3%. For a full picture, you need to disaggregate the data — and in exams, mentioning this shows sophisticated understanding.`,
          `When evaluating unemployment data in your exams, the strongest approach is to compare both measures, note what each misses, and then bring in supplementary indicators — economic inactivity rates, underemployment, regional breakdowns. No single measure gives the full picture, and examiners reward students who demonstrate awareness of this rather than simply quoting a headline figure.`
        ]
      },
      {
        title: 'Types of Unemployment',
        points: [
          `<strong>Frictional unemployment</strong> is short-term unemployment that occurs as workers move between jobs. It's a natural feature of a dynamic economy — people quit to find better roles, graduates search for their first position, workers relocate. Think of it as the "job-search gap." In a healthy labour market, frictional unemployment is low and brief. It exists even at "full employment" because there's always someone in transition.`,
          `<strong>Structural unemployment</strong> is far more damaging. It occurs when workers' skills, location, or characteristics no longer match what employers need. The decline of coal mining in Northern England and South Wales left entire communities with skills suited for industries that no longer existed. Structural unemployment is typically <strong>long-term</strong>, geographically concentrated, and resistant to demand-side fixes — you can cut interest rates all you want, but it won't retrain a coal miner as a software engineer.`,
          `<strong>Cyclical unemployment</strong> (also called <strong>demand-deficient unemployment</strong>) rises and falls with the business cycle. During recessions, aggregate demand drops, firms cut production and lay off workers. UK unemployment rose from 5.2% to 8.1% during the 2008-09 recession as firms across every sector — banking, construction, retail, manufacturing — slashed workforces. This type responds to demand-side policies: fiscal stimulus and interest rate cuts can help by boosting AD and encouraging firms to hire.`,
          `<strong>Seasonal unemployment</strong> follows predictable annual patterns — ski instructors in summer, beach resort workers in winter, agricultural labourers between harvests. Tourism-dependent economies like Greece or the Maldives see pronounced seasonal fluctuations. While individually brief, seasonal unemployment can significantly inflate the annual average in these economies. Statisticians often report <strong>seasonally adjusted</strong> figures to strip out these predictable patterns and reveal the underlying trend.`,
          `Here's a crucial exam distinction: <strong>frictional and structural unemployment exist even when the economy is at "full employment."</strong> The <strong>natural rate of unemployment</strong> (also called the <strong>NAIRU</strong>) is the unemployment rate consistent with stable inflation — it includes frictional and structural but not cyclical unemployment. In the UK, this is estimated at around 4-4.5%. When actual unemployment falls below this rate, labour shortages push wages up and inflation accelerates. Understanding this distinction between actual and natural unemployment is essential for evaluating government employment targets.`
        ],
        examTip: `Examiners frequently give you a scenario and ask what TYPE of unemployment is occurring. The key is the cause: if it's a recession, it's cyclical; if it's a mismatch of skills or location, it's structural; if workers are between jobs, it's frictional. The policy response must match the type — demand-side policies fix cyclical unemployment but do nothing for structural unemployment, which needs supply-side interventions like retraining and education.`
      },
      {
        title: 'Causes and Consequences of Unemployment',
        points: [
          `The causes of unemployment map directly onto the types. <strong>Demand-side causes</strong> include recession, falling consumer confidence, global downturns, and tight monetary or fiscal policy. When aggregate demand falls, firms need fewer workers. The 2008 financial crisis demonstrated how a banking collapse could cascade through the entire economy: credit dried up, businesses couldn't finance operations, consumers stopped spending, and unemployment surged globally.`,
          `<strong>Supply-side causes</strong> include technological change (automation replacing routine jobs — self-checkout machines in supermarkets, AI in customer service), globalisation (manufacturing shifting to lower-wage countries), occupational immobility (workers lacking the skills employers need), and geographical immobility (workers unable or unwilling to relocate to where jobs are, often because of housing costs — a particular problem in the UK where house prices vary enormously between regions).`,
          `<strong>Labour market rigidities</strong> — high minimum wages that price low-skilled workers out of jobs, powerful trade unions that resist flexible working, generous unemployment benefits that reduce the incentive to search, and excessive employment regulation — can all push unemployment above its natural rate. However, this is a contested area: many economists argue that reasonable minimum wages and employment protections don't significantly increase unemployment and may even reduce turnover costs.`,
          `For the individual, unemployment means <strong>lost income and reduced living standards</strong>. But the damage goes far beyond money. Prolonged unemployment is associated with <strong>mental health deterioration</strong>, loss of skills and employability (<strong>hysteresis</strong> — the idea that being unemployed makes you less employable over time), family breakdown, and increased substance abuse. Regions with persistent high unemployment, like parts of post-industrial Northern England, often experience deep social problems that persist for generations.`,
          `For the economy, unemployment represents <strong>wasted resources</strong> — the economy is operating inside its production possibility frontier. If 5% of the labour force is idle, the country is producing less than it could. There's a direct output cost: <strong>Okun's Law</strong> suggests that for every 1% unemployment rises above the natural rate, GDP falls by roughly 2-3% below its potential. That's billions of pounds of lost output that can never be recovered.`,
          `The government faces <strong>fiscal consequences</strong>: spending on unemployment benefits rises (automatic stabiliser) while tax revenues fall (fewer people earning and spending means less income tax, less VAT, less corporation tax). This widening of the budget deficit can force painful choices — either increase borrowing, cut other public services, or raise taxes, all of which have economic costs. During the 2008-09 recession, the UK's budget deficit ballooned from 2.6% to over 10% of GDP, largely due to these automatic effects of rising unemployment.`,
          `There's also a <strong>social cost</strong> that extends beyond the individuals directly affected. Areas of high unemployment tend to experience higher crime rates, poorer health outcomes, lower educational attainment, and weaker community cohesion. The economic concept of <strong>negative externalities</strong> applies: the costs of unemployment spill over from the unemployed individuals to the wider community. This is why governments intervene — unemployment isn't just a personal misfortune but a societal problem with far-reaching consequences.`
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
        title: 'Structure of the Current Account',
        points: [
          `The <strong>balance of payments</strong> is a record of all financial transactions between a country and the rest of the world. Think of it as a country's international bank statement. The <strong>current account</strong> is the most widely discussed section — it tracks the flow of goods, services, income, and transfers in and out of the country. When news headlines say "the UK trade deficit widened," they're talking about part of the current account.`,
          `The current account has four components, and you need to know all of them. The <strong>trade in goods balance</strong> compares the value of physical goods exported with those imported. The UK has run a persistent goods deficit for decades — in 2023 it was around £150 billion — because the UK imports more manufactured goods, food, and fuel than it exports. This reflects the UK's shift from a manufacturing to a service-based economy.`,
          `The <strong>trade in services balance</strong> covers invisible exports and imports — financial services, insurance, consulting, education, tourism. Here the UK is a global powerhouse: the City of London's financial services, legal and consulting firms, and prestigious universities all generate massive service exports. The UK typically runs a services <strong>surplus</strong> of around £100-120 billion, partly offsetting the goods deficit.`,
          `<strong>Primary income</strong> (previously called "income balance") records earnings on overseas investments flowing into the country, minus earnings on domestic investments flowing out to foreign owners. If a UK pension fund earns dividends from US shares, that's a credit on primary income. If Toyota repatriates profits from its UK factory to Japan, that's a debit. The UK's large stock of overseas assets means this balance tends to fluctuate around zero or slightly positive.`,
          `<strong>Secondary income</strong> (previously called "current transfers") includes government transfers like overseas aid and contributions to international organisations (the UK's foreign aid budget), as well as private transfers like workers sending money home to their families (<strong>remittances</strong>). The UK is a net payer here — sending more in aid and transfers than it receives. For many developing countries, the picture reverses: remittances from citizens working abroad are a vital income source.`,
          `Add all four components together and you get the <strong>current account balance</strong>. If the total is positive, the country has a <strong>current account surplus</strong> — it's earning more from the rest of the world than it's paying out. If negative, it's a <strong>current account deficit</strong>. The UK has run a current account deficit almost continuously since the early 1980s, typically between 2-5% of GDP. Germany and China, by contrast, are persistently in surplus.`,
          `For your exams, understanding the structure is essential, but so is interpreting it. A current account deficit isn't automatically "bad" — it might mean the country is importing capital goods for investment that will boost future growth. Equally, a surplus isn't automatically "good" — Germany's persistent surplus has been criticised for reflecting weak domestic demand. The significance depends entirely on the cause, size, and financing of the imbalance.`
        ]
      },
      {
        title: 'Current Account Deficit',
        points: [
          `A <strong>current account deficit</strong> means a country is spending more on imports and foreign payments than it earns from exports and foreign income. In one sense, the country is living beyond its means internationally — consuming more than it produces. To finance this gap, it must attract capital inflows: foreign investment, borrowing from abroad, or selling domestic assets to foreign buyers. The current account deficit must be exactly offset by a <strong>financial account surplus</strong> — the balance of payments always balances.`,
          `The causes of a current account deficit include: <strong>high domestic demand</strong> sucking in imports (when UK consumers feel wealthy, they buy German cars, French wine, and Chinese electronics), a <strong>strong exchange rate</strong> making exports expensive and imports cheap, <strong>weak competitiveness</strong> due to high relative inflation or low productivity, <strong>structural dependence on imports</strong> (the UK imports roughly half its food and most of its energy), and a <strong>declining manufacturing base</strong> that limits export capacity.`,
          `Should you worry about a current account deficit? It depends. A deficit driven by <strong>investment imports</strong> — buying foreign machinery and technology to boost productive capacity — can be positive because it raises future output. South Korea ran large deficits in the 1960s-70s while importing the capital goods that built its industrial base. But a deficit driven by <strong>excessive consumption</strong> financed by debt is more concerning because it creates obligations that must eventually be repaid.`,
          `Persistent deficits can lead to problems: <strong>rising external debt</strong> (the country borrows more from abroad each year), <strong>currency depreciation</strong> (if foreign investors lose confidence and pull capital out, the exchange rate falls), and <strong>vulnerability to sudden stops</strong> (if capital inflows dry up abruptly, as happened to several Asian economies in 1997, the result can be a full-blown financial crisis).`,
          `The UK's chronic current account deficit — averaging around 3-4% of GDP over the past two decades — has been sustained largely because London's financial markets and property sector attract huge foreign capital inflows. Foreign investors buy UK government bonds, London real estate, and shares in UK companies. This finances the deficit, but it also means an increasing share of UK assets is foreign-owned. Whether this is sustainable is one of the major evaluative questions in macroeconomics.`
        ]
      },
      {
        title: 'Current Account Surplus',
        points: [
          `A <strong>current account surplus</strong> means a country earns more from the rest of the world than it spends — it exports more than it imports, and its overseas investments generate more income than it pays to foreign investors. On the surface this looks like success, and for many countries it reflects genuine strengths: high-quality exports, strong competitiveness, and a healthy savings culture. Germany's surplus of around 6-7% of GDP in the mid-2010s reflected the global dominance of its manufacturing exports — cars, machinery, chemicals, pharmaceuticals.`,
          `But a surplus isn't unambiguously positive. A large surplus can indicate <strong>weak domestic demand</strong> — consumers and businesses aren't spending enough at home, so the economy depends on selling to other countries. Germany has been criticised by the <strong>European Commission</strong> and the <strong>IMF</strong> for exactly this: by running persistent surpluses, it was effectively exporting its excess savings and relying on other countries to generate the demand that its own consumers wouldn't.`,
          `There's a global dimension too: one country's surplus is another country's deficit. If China and Germany run huge surpluses, the rest of the world must, by definition, run corresponding deficits. This creates international tensions — the US under both Obama and Trump accused China of deliberately undervaluing its currency to maintain an unfair export advantage. Persistent <strong>global imbalances</strong> were one of the underlying causes of the 2008 financial crisis, as surplus countries recycled their earnings into risky financial assets in deficit countries.`,
          `A surplus country accumulates <strong>foreign assets</strong> — overseas investments, foreign currency reserves, and claims on other nations. China holds over $3 trillion in foreign reserves, much of it in US government bonds. Norway invests its oil surplus in the world's largest sovereign wealth fund (worth over $1.5 trillion). These assets can provide security and future income, but holding them also means the country is consuming less today than it could.`,
          `In your exams, resist the temptation to treat a surplus as automatically "good" and a deficit as automatically "bad." The best analysis considers <strong>why</strong> the surplus exists (competitive exports vs. suppressed domestic demand), <strong>how large</strong> it is (a 1% surplus is very different from a 10% surplus), and <strong>what consequences</strong> it has for trading partners. This nuanced evaluation is exactly what distinguishes a top-mark answer from a superficial one.`
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
        title: 'What Is Aggregate Demand?',
        points: [
          `In microeconomics, you studied demand for a single product — how many coffees people buy at different prices. Now scale that up to the entire economy. <strong>Aggregate demand (AD)</strong> is the <strong>total planned spending</strong> on goods and services in an economy at a given price level over a given time period. It's the sum of everything everyone plans to buy — households, firms, the government, and overseas buyers — all rolled into one number.`,
          `The components are captured in the formula you'll use constantly: <strong>AD = C + I + G + (X - M)</strong>. <strong>Consumption (C)</strong> is household spending, <strong>Investment (I)</strong> is business spending on capital goods, <strong>Government spending (G)</strong> is public expenditure on goods and services, and <strong>Net exports (X - M)</strong> is exports minus imports. Each component is influenced by different factors, which means AD can shift for a wide variety of reasons.`,
          `Why does aggregate demand matter so much? Because in the short run, changes in AD are the primary driver of economic fluctuations — recessions happen when AD falls sharply, and booms happen when AD rises rapidly. The 2008 financial crisis was fundamentally an AD collapse: consumer confidence crashed, investment dried up, and even government spending couldn't offset the plunge fast enough. Understanding what drives AD is therefore understanding what drives the business cycle.`,
          `One crucial nuance: AD measures <strong>planned</strong> (or desired) spending, not actual spending. If firms plan to invest £100 billion but can only get £80 billion in credit, actual investment falls short of planned investment. The gap between planned AD and actual output is what drives the economy toward equilibrium — and understanding this dynamic is the foundation of Keynesian macroeconomics.`
        ],
        formula: 'AD = C + I + G + (X - M)'
      },
      {
        title: 'Consumption (C)',
        points: [
          `<strong>Consumption</strong> is household spending on goods and services — from bread and bus tickets to holidays and hairdressing. In the UK, consumption accounts for roughly <strong>60-65% of GDP</strong>, making it by far the largest component of aggregate demand. When UK consumers feel confident and spend freely, the economy grows; when they pull back — as during COVID lockdowns or the 2022 cost-of-living crisis — the impact is immediate and dramatic.`,
          `How much of any extra income you spend rather than save is captured by the <strong>marginal propensity to consume (MPC)</strong>. If you receive an extra £100 and spend £80 of it, your MPC is 0.8. The remaining £20 is saved — your <strong>marginal propensity to save (MPS)</strong> is 0.2. Together, MPC + MPS = 1 (in a simple model without taxation or imports). The MPC matters enormously because it determines the size of the <strong>multiplier effect</strong> — a concept you'll meet shortly.`,
          `MPC varies dramatically across the income distribution. Lower-income households tend to have a higher MPC — if a minimum-wage worker gets a £500 bonus, most of it will be spent immediately on necessities. A millionaire getting the same £500 might save nearly all of it. This is why policies targeting lower-income groups (raising benefits, cutting VAT on essentials) tend to have a larger impact on consumption and therefore on AD than blanket tax cuts.`,
          `The relationship between income and consumption was formalised by <strong>John Maynard Keynes</strong> in his <strong>consumption function</strong>: as national income rises, consumption rises too — but by less than the rise in income, because some of the increase is saved. This might seem obvious, but it was revolutionary in the 1930s because it implied that higher incomes wouldn't automatically generate enough demand to maintain full employment — the economy could get stuck in a low-demand, high-unemployment equilibrium.`,
          `Don't confuse consumption with consumer spending on <em>everything</em>. The economic definition of consumption excludes the purchase of new housing (that's counted as investment). It also distinguishes between <strong>durable goods</strong> (cars, washing machines — bought infrequently, sensitive to confidence and credit conditions) and <strong>non-durables</strong> (food, fuel — bought regularly, less sensitive to economic conditions). Durable goods purchases are far more volatile and are often the first to fall when recession looms.`
        ],
        formula: 'MPC = Change in Consumption / Change in Income'
      },
      {
        title: 'Investment (I)',
        points: [
          `In everyday language, "investment" might mean buying shares or putting money in a savings account. In macroeconomics, <strong>investment (I)</strong> has a specific meaning: spending on <strong>capital goods</strong> — machinery, equipment, factories, technology, infrastructure — that increases the economy's productive capacity. It also includes <strong>changes in inventories</strong> (unsold stock) and <strong>residential construction</strong>. Investment is the economy's way of building for the future.`,
          `Although investment is only around <strong>17-18% of UK GDP</strong>, it's the most <strong>volatile</strong> component of aggregate demand. Business investment can swing by 20-30% in a single year — compare that to consumption, which rarely moves by more than 2-3%. This volatility makes investment a major source of economic fluctuations: the sharp fall in investment during the 2008 financial crisis (-15% in one year) was a key driver of the recession.`,
          `Why is investment so volatile? Because it depends heavily on <strong>business confidence</strong> and <strong>expectations</strong> about future demand. Keynes called this "<strong>animal spirits</strong>" — the gut feeling of entrepreneurs about whether the future looks bright or bleak. If firms expect rising demand, they invest in new capacity. If they sense trouble ahead, they delay or cancel projects. This makes investment inherently forward-looking and psychologically driven in a way that consumption is not.`,
          `<strong>Interest rates</strong> are the other critical driver. Investment projects — a new factory, an expanded warehouse, a fleet of delivery vehicles — are typically financed by borrowing. When interest rates are low, the cost of borrowing falls and more projects become profitable. When rates rise, the cost of servicing debt increases and marginal projects become unviable. The Bank of England's rate hikes from 0.1% to 5.25% in 2022-23 significantly cooled UK business investment.`,
          `For exam purposes, always distinguish between <strong>gross investment</strong> (total spending on capital goods) and <strong>net investment</strong> (gross investment minus depreciation). An economy that invests £200 billion but loses £180 billion of capital to wear and tear has net investment of only £20 billion — its capital stock is barely growing. Net investment is what actually expands productive capacity, and it's the relevant figure for assessing an economy's long-term growth potential.`
        ]
      },
      {
        title: 'Government Spending (G)',
        points: [
          `<strong>Government spending (G)</strong> in the AD formula refers to public expenditure on goods and services — building roads, funding the NHS, equipping the military, paying teachers and civil servants. In the UK, government spending accounts for roughly <strong>20-22% of GDP</strong>, making it the third largest component of aggregate demand. It's a powerful lever for influencing the economy because, unlike C and I, the government can choose to increase it directly and quickly.`,
          `Critically, <strong>G does not include transfer payments</strong> — pensions, Jobseeker's Allowance, housing benefit, student loans. Why? Because transfers are redistributions of existing income, not new purchases of goods and services. When the government pays a pension, no new output is created at that moment; the pensioner then spends the money (which shows up in C, not G). This distinction is a frequent examiner trap — never include transfers in G.`,
          `Government spending can act as an <strong>automatic stabiliser</strong> or a <strong>discretionary policy tool</strong>. Automatically, spending on unemployment benefits rises during recessions (more people claim) and falls during booms — this smooths the business cycle without any deliberate policy decision. Discretionary fiscal policy means the government actively choosing to raise or cut spending — as the UK did with its £350 billion COVID-19 support package in 2020, including furlough payments, business loans, and direct spending on health services.`,
          `The impact of government spending on AD depends on how it's financed. If funded by taxation, the expansionary effect is partly offset (taxes reduce consumption). If funded by borrowing, the full spending adds to AD — but it may also "crowd out" private investment by pushing up interest rates. If funded by monetary expansion (the central bank effectively printing money), the risk is inflation. These trade-offs are at the heart of fiscal policy debates.`,
          `For your exam answers, remember that G is one of the more <strong>stable</strong> components of AD because governments plan budgets in advance and spending commitments (NHS, education, defence) are difficult to cut quickly. However, during periods of <strong>austerity</strong> — like the UK's 2010-16 fiscal consolidation — G can be actively reduced, shifting AD leftward. Whether austerity helps (by reducing debt and building confidence) or hurts (by reducing demand and slowing recovery) is one of the great macroeconomic debates of the past decade.`
        ]
      },
      {
        title: 'Net Exports (X - M)',
        points: [
          `<strong>Net exports</strong> equal the value of a country's exports (X) minus its imports (M). If the UK exports £600 billion of goods and services but imports £700 billion, net exports are <strong>-£100 billion</strong>, which means trade is <em>subtracting</em> from aggregate demand. Foreign spending on UK output adds to AD; UK spending on foreign output leaks out. The gap between these two flows determines the trade contribution to GDP.`,
          `The UK has run a persistent <strong>net export deficit</strong> for decades, meaning trade has been a net drag on aggregate demand. This reflects the UK's structural characteristics: a declining manufacturing sector, heavy dependence on imported energy and food, and a strong consumer culture that favours foreign goods. Germany and China, by contrast, are chronic net exporters — their trade sectors consistently add to AD.`,
          `The <strong>exchange rate</strong> is the single most important determinant of net exports. When the pound depreciates (becomes weaker), UK exports become cheaper for foreign buyers and imports become more expensive for UK consumers — improving net exports. After the Brexit referendum in June 2016, the pound fell roughly 15% against the dollar. UK exporters initially benefited, but importers faced higher costs, and the net effect on AD was contested among economists.`,
          `<strong>Relative inflation rates</strong> also matter. If UK inflation runs higher than its trading partners', UK goods become less price-competitive over time even without exchange rate changes. This "real exchange rate" effect gradually erodes export competitiveness. Conversely, strong productivity growth can improve competitiveness by reducing unit labour costs — German manufacturing competitiveness partly reflects decades of strong productivity gains relative to wage growth.`,
          `For exam analysis, always consider net exports in the context of <strong>global conditions</strong>. If the Eurozone (the UK's largest trading partner) enters recession, demand for UK exports falls regardless of UK domestic conditions. The COVID-19 pandemic simultaneously collapsed both exports (foreign demand vanished) and imports (UK demand vanished), with the net effect depending on which fell faster. This interdependence is why macroeconomics is increasingly a global discipline — no economy is an island, even if it's literally an island.`
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
        title: 'Shape of the AD Curve',
        points: [
          `The <strong>AD curve</strong> slopes <strong>downward from left to right</strong>, showing that as the general price level falls, the total quantity of goods and services demanded in the economy rises — and vice versa. This might remind you of a microeconomic demand curve, but be careful: the reasons for the downward slope are completely different. In micro, a lower price means a single good is cheaper relative to substitutes. In macro, there are no substitutes for "the entire economy's output."`,
          `The downward slope is explained by three distinct effects that link the price level to the quantity of real output demanded: the <strong>wealth effect</strong> (or real balances effect), the <strong>international competitiveness effect</strong>, and the <strong>interest rate effect</strong>. Each operates through a different channel, and examiners expect you to explain all three, not just one. Together, they explain why a lower price level stimulates more spending across the economy.`,
          `It's important to note that the AD curve shows the relationship between the <strong>price level</strong> (not inflation) and <strong>real GDP demanded</strong>. A movement <em>along</em> the AD curve is caused by a change in the price level. A <em>shift</em> of the entire AD curve is caused by a change in any non-price factor — consumer confidence, government spending, interest rates, exchange rates, and so on. Confusing movements along the curve with shifts of the curve is one of the most common diagram errors in macroeconomics exams.`
        ]
      },
      {
        title: 'The Wealth Effect (Real Balances Effect / Pigou Effect)',
        points: [
          `Imagine you have £10,000 in savings. If the price level falls by 10%, your £10,000 can now buy 10% more goods and services — you feel wealthier even though your nominal savings haven't changed. This is the <strong>wealth effect</strong>, also known as the <strong>real balances effect</strong> or <strong>Pigou effect</strong> (named after economist Arthur Pigou). A lower price level increases the <strong>real value</strong> of household wealth held in money and financial assets, which encourages more consumption.`,
          `The mechanism works in reverse too: a higher price level erodes the real value of savings, making people feel poorer and leading them to cut spending. During the UK's high-inflation period of 2022-23, the real value of household savings was being eaten away, which contributed to a squeeze on consumer spending even for people who hadn't received pay cuts — their money simply bought less.`,
          `The strength of this effect depends on how much wealth people hold in <strong>nominal assets</strong> (cash, bank deposits, bonds with fixed returns) as opposed to real assets (property, equities) that tend to rise in line with prices. In practice, most economists consider the Pigou effect to be relatively weak — consumers don't immediately adjust their spending when the price level shifts. But it's still an important theoretical explanation for the AD curve's slope.`,
          `In your exam, present the wealth effect as one of three reasons for the downward-sloping AD curve. A common mistake is conflating it with the microeconomic income effect — they're different mechanisms operating at different scales. The wealth effect is about the price <em>level</em> changing the real value of existing financial wealth, not about the price of a single good changing relative purchasing power.`
        ]
      },
      {
        title: 'The International Competitiveness Effect',
        points: [
          `If the UK's price level falls while price levels in other countries remain unchanged, UK goods and services become <strong>relatively cheaper</strong> on world markets. Foreign buyers find British exports more attractive, so export demand rises. At the same time, UK consumers find that domestic products are now cheaper compared to imports, so they switch away from foreign goods. The result: exports rise, imports fall, <strong>net exports (X - M) improve</strong>, and total AD increases.`,
          `This effect works symmetrically in reverse. If the UK price level rises relative to its trading partners, UK exports become less competitive and imports become relatively cheaper. British consumers and firms buy more from abroad, net exports deteriorate, and AD falls. This is precisely the mechanism that made the UK's high inflation in 2022-23 problematic for exporters — rising domestic costs made UK products less competitive globally.`,
          `The international competitiveness effect is stronger for economies that are highly open to trade. A small, trade-dependent economy like the Netherlands (where exports are over 80% of GDP) will see a much larger impact from price level changes than a relatively closed economy like the US (where exports are about 12% of GDP). The UK sits somewhere in between, with exports around 30% of GDP, so this effect is significant but not dominant.`,
          `A subtle point for exam purposes: this effect assumes that the <strong>nominal exchange rate doesn't change</strong> when the domestic price level changes. In reality, exchange rates often adjust to offset price level differences (this is the purchasing power parity idea from earlier). Over the long run, currency movements may partially neutralise the competitiveness effect. But in the short run, the effect is real and significant, which is what matters for the AD curve.`
        ]
      },
      {
        title: 'The Interest Rate Effect',
        points: [
          `When the price level rises, people and firms need <strong>more money</strong> to carry out the same volume of transactions — you need more cash to buy the same shopping basket. This increased demand for money, with a fixed money supply, pushes up <strong>interest rates</strong> (the "price" of borrowing money). Higher interest rates discourage borrowing for consumption and investment, so spending falls and AD decreases.`,
          `Conversely, a lower price level means people need less money for transactions, reducing the demand for money. With a fixed money supply, this pushes interest rates down. Lower interest rates make borrowing cheaper — mortgages, car loans, and business investment all become more affordable — stimulating consumption and investment, and increasing AD. This is sometimes called the <strong>Keynes effect</strong>.`,
          `The interest rate effect is generally considered the <strong>most powerful</strong> of the three explanations for the AD curve's downward slope. Interest rates influence both consumption (through mortgage costs, credit card rates, and saving incentives) and investment (through the cost of financing projects). A 1% change in interest rates can shift billions of pounds of spending, which is exactly why the Bank of England uses interest rates as its primary monetary policy tool.`,
          `Notice the chain of causation: price level changes → money demand changes → interest rate changes → consumption and investment change → AD changes. Each link in this chain matters, and examiners may ask you to trace through the full transmission mechanism. Don't just say "lower prices mean more spending" — explain the interest rate channel through which this occurs.`,
          `Here's an important caveat: the interest rate effect assumes the central bank keeps the <strong>money supply constant</strong>. In practice, central banks actively adjust the money supply and set interest rates as a policy tool, which complicates the simple theoretical story. If the Bank of England cuts rates in response to falling prices (as it would in practice), the interest rate effect is amplified by monetary policy rather than being a passive market mechanism.`
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
        title: 'Factors That Shift the AD Curve',
        points: [
          `A <strong>shift of the AD curve</strong> means that at every price level, the total amount of goods and services demanded has changed. A <strong>rightward shift</strong> means more is demanded at every price level (AD has increased); a <strong>leftward shift</strong> means less is demanded (AD has decreased). This is fundamentally different from a movement <em>along</em> the curve, which is caused by a change in the price level itself.`,
          `Since AD = C + I + G + (X - M), anything that changes one of these four components — for a reason other than a change in the price level — will shift the entire AD curve. A rise in consumer confidence boosts C, shifting AD right. A cut in government spending reduces G, shifting AD left. A fall in the exchange rate improves (X - M), shifting AD right. The beauty of the framework is that you can trace any macroeconomic event to one or more of these components.`,
          `In practice, multiple shifts often happen simultaneously. The COVID-19 pandemic in 2020 reduced C (lockdowns prevented spending), collapsed I (business uncertainty soared), massively increased G (government stimulus), and disrupted both X and M (global trade froze). The net effect on AD depended on which changes dominated — initially the collapse in C and I overwhelmed the increase in G, shifting AD sharply leftward.`,
          `For your exams, every time you discuss a macroeconomic event, policy, or scenario, identify which component(s) of AD are affected, in which direction, and draw the shift on a diagram. This structured approach — event → component → direction → diagram → consequences — is the template that earns consistent high marks in macro questions.`
        ]
      },
      {
        title: 'Determinants of Consumption (C)',
        points: [
          `<strong>Real disposable income</strong> is the most fundamental driver of consumption. When people earn more (after tax), they spend more — this is the basic Keynesian consumption function. The UK's real disposable incomes fell sharply in 2022 as wages failed to keep pace with inflation, and retail sales volumes dropped accordingly. The relationship isn't one-to-one though: the MPC determines how much of each extra pound is spent rather than saved.`,
          `<strong>Consumer confidence</strong> acts as a powerful psychological amplifier. When people feel optimistic about their job security and future income — as in the mid-2000s UK housing boom — they spend freely and even borrow to spend more. When confidence collapses — as during the 2008 financial crisis — consumers slash spending and build precautionary savings, even if their current income hasn't changed yet. The GfK Consumer Confidence Index is a closely watched leading indicator in the UK.`,
          `<strong>Interest rates</strong> influence consumption through multiple channels. Lower rates reduce monthly mortgage payments (freeing up disposable income for UK's 8 million mortgage holders), make saving less attractive (reducing the reward for deferring consumption), and make borrowing for big purchases cheaper (car loans, credit cards). When the Bank of England cut rates to 0.1% during COVID, it was directly trying to support consumption through these channels.`,
          `<strong>Wealth effects</strong> from asset prices are powerful. When house prices rise, homeowners feel wealthier and spend more — this "<strong>housing wealth effect</strong>" is especially potent in the UK where roughly 65% of households own their home. Between 2000 and 2007, UK house prices roughly doubled, and the resulting wealth effect fuelled a consumer spending boom. Stock market gains have a similar but smaller effect, since share ownership is more concentrated among higher earners with lower MPCs.`,
          `<strong>Availability of credit</strong> determines whether people can translate their spending desires into actual purchases. Easy credit conditions — low interest rates, relaxed lending criteria, financial innovation — amplify consumption. Before 2008, UK banks were offering 125% mortgages and credit cards with minimal checks, fuelling a debt-driven spending boom. After the crisis, tighter lending standards ("credit crunch") restricted borrowing and dampened consumption for years.`,
          `<strong>Taxation</strong> directly affects disposable income. A cut in income tax or VAT leaves consumers with more money to spend. The UK's temporary VAT cut from 17.5% to 15% in December 2008 was specifically designed to boost consumption during the recession. Conversely, the increase in National Insurance in 2022 reduced take-home pay and constrained consumer spending at an already difficult time.`,
          `<strong>Income distribution</strong> matters because the MPC varies across income groups. Policies that redistribute income toward lower earners — raising the minimum wage, increasing benefits, cutting basic-rate tax — tend to increase total consumption more than equivalent-cost policies benefiting higher earners. If the goal is to boost AD through consumption, targeting the groups with the highest MPC is the most effective strategy.`
        ]
      },
      {
        title: 'Determinants of Investment (I)',
        points: [
          `<strong>Interest rates</strong> are the textbook determinant of investment. Firms compare the expected rate of return on an investment project with the cost of borrowing to finance it. If a factory extension is expected to yield 8% returns and the interest rate is 5%, the project goes ahead. If rates rise to 9%, it doesn't. The Bank of England's rate hikes from 0.1% to 5.25% in 2022-23 made many investment projects that were profitable at low rates suddenly unviable, contributing to a slowdown in business investment.`,
          `<strong>Business confidence and expectations</strong> — Keynes's "animal spirits" — are arguably even more important than interest rates in practice. If firms expect strong future demand, they invest regardless of whether rates are slightly higher; if they expect recession, even rock-bottom rates won't persuade them to build new factories. Post-Brexit uncertainty in the UK depressed business investment for years, even when interest rates were at historic lows, because firms were uncertain about future trading arrangements.`,
          `<strong>Corporate tax rates</strong> and <strong>government incentives</strong> directly affect the profitability of investment. The UK cut its corporation tax rate from 28% to 19% between 2010 and 2017, partly to attract business investment and foreign direct investment. The subsequent rise to 25% in 2023 had the opposite intent — raising revenue — but risked discouraging investment at the margin. Tax allowances for capital expenditure (like "full expensing," introduced in 2023) allow firms to deduct 100% of qualifying investment costs immediately, directly incentivising capital spending.`,
          `<strong>Technological change</strong> creates investment opportunities. The development of AI, robotics, and green energy technology is currently driving substantial investment in new capital — firms invest to adopt new technologies before competitors do, or to comply with environmental regulations. The UK's net-zero target has triggered significant investment in wind farms, electric vehicle infrastructure, and energy-efficient buildings.`,
          `<strong>Access to credit</strong> determines whether firms can actually finance their investment plans. During the 2008 credit crunch, UK banks drastically tightened lending criteria, and many profitable investment projects couldn't secure funding. Small and medium-sized enterprises (SMEs) were hit hardest because they rely most heavily on bank lending. This "credit channel" means that financial market conditions can affect investment independently of the official interest rate.`,
          `<strong>Spare capacity</strong> influences whether firms need to invest at all. If existing factories are running at 70% capacity, there's little reason to build new ones — firms can simply use their existing resources more intensively. Investment tends to surge when capacity utilisation is high and firms are struggling to meet demand. The <strong>CBI Industrial Trends Survey</strong> tracks capacity utilisation in the UK and is a useful leading indicator of investment intentions.`,
          `<strong>Global economic conditions</strong> matter increasingly for investment in an interconnected world. UK firms considering investment must weigh global demand prospects, geopolitical risks (the Russia-Ukraine war, US-China tensions), and the stability of international supply chains. Multinational firms make location decisions based on comparative advantages across countries — and the UK competes with Ireland, the Netherlands, and Singapore for mobile international investment.`
        ]
      },
      {
        title: 'Determinants of Government Spending (G)',
        points: [
          `<strong>Fiscal policy decisions</strong> are the primary determinant — the government actively chooses how much to spend and on what. These decisions are shaped by political priorities, economic conditions, and ideology. A government committed to austerity (like the UK Coalition in 2010-15) actively cut real government spending to reduce the budget deficit, shifting AD leftward. A government focused on stimulus (like the response to COVID-19) dramatically increased spending, shifting AD rightward.`,
          `<strong>The state of the economy</strong> influences government spending through <strong>automatic stabilisers</strong>. During recessions, spending on unemployment benefits, income support, and social services automatically rises as more people qualify. During booms, this spending automatically falls. These stabilisers adjust G without any explicit policy decision and help smooth the business cycle — they add to AD in downturns and subtract from it during expansions.`,
          `<strong>Government debt and borrowing constraints</strong> can limit spending. The UK's national debt exceeded 100% of GDP by 2023, prompting fierce debate about fiscal sustainability. The government's self-imposed <strong>fiscal rules</strong> (such as requiring debt to fall as a share of GDP within five years) constrain spending choices. Countries with weaker fiscal positions face market pressure too — if investors doubt a government's ability to repay, bond yields rise, making further borrowing more expensive and sometimes forcing spending cuts (as Greece experienced during the Eurozone crisis).`,
          `<strong>Demographic and structural pressures</strong> create long-term spending trends. The UK's ageing population means NHS and pension costs are rising inexorably, accounting for an ever-larger share of government spending. An ageing society essentially shifts the composition of G toward healthcare and social care, which may crowd out spending on infrastructure, education, or defence. These structural forces operate independently of the business cycle and constrain the government's ability to use G as a discretionary tool.`
        ]
      },
      {
        title: 'Determinants of Net Exports (X - M)',
        points: [
          `The <strong>exchange rate</strong> is the single most powerful short-run determinant. A <strong>depreciation</strong> (weaker pound) makes UK exports cheaper in foreign currencies and imports more expensive in pounds — improving net exports. A <strong>appreciation</strong> (stronger pound) does the opposite. After the June 2016 Brexit vote, the pound fell from $1.50 to $1.20, which boosted UK export competitiveness but raised the cost of imported goods and materials.`,
          `<strong>Relative inflation rates</strong> affect competitiveness over time. If UK inflation consistently exceeds that of trading partners, UK goods become progressively more expensive relative to foreign alternatives, eroding export competitiveness and encouraging imports. This is the "real exchange rate" — even if the nominal exchange rate stays constant, higher domestic inflation effectively makes the currency overvalued in terms of purchasing power.`,
          `<strong>Income levels at home and abroad</strong> drive the volume of trade. When UK domestic income rises, consumers buy more imports (foreign holidays, electronics, cars), worsening net exports. When incomes rise in the UK's major export markets (the EU, the US), demand for UK exports increases. This asymmetry means that a UK economic boom can actually worsen net exports by sucking in imports, while a recession abroad can hurt UK exports even if the domestic economy is healthy.`,
          `<strong>Non-price competitiveness</strong> — quality, design, branding, innovation, after-sales service — matters as much as price, especially for advanced economies. German cars command premium prices globally because of their reputation for engineering quality, not because they're cheap. UK exports of financial services, higher education, and creative industries (music, film, advertising) compete on expertise and reputation rather than cost. Improving non-price competitiveness is a supply-side strategy that takes years but produces lasting export gains.`,
          `<strong>Trade policies and barriers</strong> shape the environment in which trade occurs. Tariffs, quotas, and regulatory differences increase the cost of trading and tend to reduce both exports and imports. Brexit fundamentally altered UK trade relationships — introducing customs checks, regulatory divergence, and administrative costs that didn't exist when the UK was in the EU Single Market. The <strong>Office for Budget Responsibility</strong> estimated that Brexit would reduce UK trade intensity by about 15% in the long run.`,
          `<strong>Global economic conditions</strong> set the backdrop for all trade. A global recession — like the synchronised downturn of 2008-09 — reduces world trade volumes as every country's demand for imports falls simultaneously. Global supply chain disruptions (COVID-19 shipping crises, the 2021 Suez Canal blockage) constrain trade physically. And geopolitical fragmentation — US-China tariff wars, sanctions on Russia — can reroute or reduce trade flows for reasons that have nothing to do with price or competitiveness.`
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
        title: 'The Multiplier Concept',
        points: [
          `Here's a remarkable idea: if the government spends an extra £1 billion building a railway, the total increase in GDP will be <em>more</em> than £1 billion. How? Because that initial spending creates income for construction workers, steel suppliers, and engineers. Those people then spend their extra income at shops, restaurants, and on services — creating income for a second round of workers. Those workers spend too, creating a third round, and so on. This cascading chain of spending is the <strong>multiplier effect</strong>.`,
          `The concept was developed by <strong>John Maynard Keynes</strong> (building on earlier work by Richard Kahn) during the Great Depression. Its radical implication: government spending doesn't just add its own value to GDP — it triggers a chain of additional spending that amplifies the original injection. This was Keynes's argument for why fiscal stimulus works: even borrowed government spending can pay for itself if the multiplier is large enough.`,
          `The size of the multiplier depends on how much of each round of income is <strong>re-spent</strong> versus <strong>leaked</strong> out of the circular flow. If people spend 80% of extra income (MPC = 0.8), each round retains most of its force and the multiplier is large. If people save, pay taxes, or buy imports with most of their extra income, each round dissipates quickly and the multiplier is small. The leakages — savings, taxation, and import spending — collectively determine the <strong>marginal propensity to withdraw (MPW)</strong>.`,
          `Think of it like ripples in a pond: the initial stone (injection) creates a big splash, then each subsequent ripple is smaller than the last. The total effect of all the ripples combined is the multiplied impact. If the first round generates £1 billion, the second might generate £800 million (if MPC = 0.8), the third £640 million, the fourth £512 million, and so on — each round 80% of the previous one, converging to a total of £5 billion.`,
          `The multiplier works in <strong>both directions</strong>. A cut in government spending or a fall in investment doesn't just reduce GDP by the initial amount — it triggers a <strong>negative multiplier effect</strong> as reduced incomes lead to reduced spending in subsequent rounds. This is why recessions can be self-reinforcing: an initial demand shock is amplified through the economy, making the downturn deeper than the original trigger would suggest.`,
          `For your exams, the multiplier connects everything in macroeconomics: fiscal policy effectiveness, the impact of external shocks, and why small changes in confidence can produce large swings in GDP. Whenever you analyse a change in any component of AD, consider the multiplier effect to show the full impact — examiners specifically reward students who trace through the multiplied effect rather than stopping at the initial change.`
        ]
      },
      {
        title: 'The Multiplier Formula',
        points: [
          `The simplest version of the multiplier formula is <strong>1 / (1 - MPC)</strong>. If the MPC is 0.8, the multiplier is 1 / (1 - 0.8) = 1 / 0.2 = 5. This means every £1 of initial spending eventually generates £5 of total GDP. The higher the MPC, the larger the multiplier, because more income is re-spent at each round and less leaks out.`,
          `An equivalent and often more practical formulation is <strong>1 / MPW</strong>, where MPW is the <strong>marginal propensity to withdraw</strong>. Withdrawals are the three leakages from the circular flow: savings (S), taxation (T), and imports (M). The MPW equals MPS + MPT + MPM — the marginal propensities to save, tax, and import respectively.`,
          `Let's work a concrete example. Suppose MPS = 0.1, the marginal tax rate (MPT) = 0.2, and the marginal propensity to import (MPM) = 0.2. Then MPW = 0.1 + 0.2 + 0.2 = 0.5, and the multiplier = 1 / 0.5 = 2. Every £1 of initial spending generates £2 of GDP. Notice how taxation and imports dramatically reduce the multiplier compared to the simple MPC-only model. This is why real-world multipliers in open economies with progressive tax systems are much smaller than textbook examples suggest.`,
          `To find the <strong>total change in GDP</strong>, multiply the initial change in AD by the multiplier. If the government increases spending by £10 billion and the multiplier is 2, the total GDP increase is £20 billion. If a fall in investment reduces AD by £5 billion with the same multiplier, GDP falls by £10 billion. The formula is simply: <strong>Change in GDP = Multiplier x Initial Change in AD</strong>.`,
          `Real-world multiplier estimates vary enormously depending on economic conditions. During recessions, when there's spare capacity and interest rates are low, the multiplier tends to be larger (the IMF estimated fiscal multipliers above 1.5 for Eurozone countries during the 2011-13 austerity period). During booms, when the economy is near full capacity, extra spending mainly pushes up prices rather than output, so the multiplier is smaller — possibly even less than 1 if crowding out is severe.`,
          `The type of spending also matters. Government spending on domestically produced goods and services (building roads with local labour and materials) has a higher multiplier than tax cuts for high earners (who may save much of the windfall or spend it on imports). Infrastructure investment tends to have among the highest multipliers because it creates jobs directly and improves future productivity — a double benefit.`,
          `In your exam calculations, always show your working clearly: state the MPC or MPW, calculate the multiplier, then apply it to the initial change. A very common error is to confuse the multiplier value with the total change in GDP. If the multiplier is 4 and the injection is £10 billion, the answer is £40 billion total GDP change — not £4 billion. Read questions carefully to see whether they ask for the multiplier itself or the final impact on GDP.`
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
        title: 'Significance and Limitations of the Multiplier',
        points: [
          `The multiplier's greatest significance is for <strong>fiscal policy</strong>. If the multiplier is large (say, 3 or above), modest increases in government spending can produce substantial GDP gains, making fiscal stimulus a powerful tool for fighting recessions. This was Keynes's core argument during the 1930s Depression, and it underpinned the massive fiscal responses to the 2008 crisis and the COVID-19 pandemic. The UK's furlough scheme and business support grants were designed to inject spending and let the multiplier amplify the effect.`,
          `However, the multiplier also amplifies <strong>negative shocks</strong>. When firms cut investment or consumers lose confidence, the resulting fall in spending ripples through the economy, reducing other people's incomes and spending in turn. This is why financial crises produce recessions far deeper than the initial shock would suggest — the multiplier turns a manageable contraction into a severe one. The 2008 Lehman Brothers collapse triggered a global recession precisely because the negative multiplier effect cascaded through interconnected economies.`,
          `<strong>Crowding out</strong> is the most important limitation. If government spending is financed by borrowing, increased demand for loanable funds can push up interest rates, which <strong>reduces private investment</strong>. In the extreme case, every pound of government spending crowds out a pound of private investment, and the net multiplier is zero. Monetarist economists like Milton Friedman used this argument to challenge Keynesian fiscal stimulus — they argued that the government can't increase total spending, only change its composition.`,
          `The multiplier assumes the economy has <strong>spare capacity</strong>. If the economy is already at full employment, extra spending can't generate more output — there are no idle workers to hire or unused factories to activate. Instead, the extra demand pushes up prices (demand-pull inflation) without increasing real GDP. This is why the multiplier is most effective during recessions and least effective during booms — its value is not fixed but <strong>varies with economic conditions</strong>.`,
          `<strong>Time lags</strong> reduce the practical usefulness of the multiplier. The spending chain doesn't happen instantly — it takes months for initial spending to filter through to subsequent rounds. By the time the full multiplied effect materialises, economic conditions may have changed entirely. A fiscal stimulus designed to fight recession might deliver its peak impact when the economy has already recovered, adding inflationary pressure at exactly the wrong time.`,
          `In an <strong>open economy</strong> like the UK, a significant proportion of each spending round leaks out as imports. If British consumers spend their extra income on French wine, German cars, and Chinese electronics, the multiplied income is created <em>abroad</em>, not in the UK. This is why the multiplier tends to be smaller for open economies than for relatively closed ones. The UK's high import penetration (imports are roughly 30% of GDP) means its domestic multiplier is considerably lower than the simple 1/(1-MPC) formula would suggest.`,
          `<strong>Rational expectations</strong> can undermine the multiplier. If consumers know that today's government spending will require higher taxes tomorrow (to repay the borrowing), they may save more now in anticipation — the so-called <strong>Ricardian equivalence</strong>. In this view, fiscal stimulus simply shifts the timing of spending without changing the total. Most economists consider full Ricardian equivalence unrealistic (consumers aren't that forward-looking), but partial anticipation effects can reduce the multiplier below its theoretical value.`,
          `For exam evaluation, the strongest approach is to argue that the multiplier is <strong>real but variable</strong>. Its size depends on the MPC, the degree of spare capacity, how open the economy is, how the spending is financed, and consumer expectations. Blanket statements like "the multiplier will boost GDP significantly" are too vague — specify the conditions under which the multiplier is large or small, and you'll demonstrate the analytical sophistication examiners are looking for.`
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
        title: 'The Accelerator Principle',
        points: [
          `The <strong>accelerator principle</strong> explains why investment is so much more volatile than consumption. The core idea: the level of <strong>net investment</strong> depends not on the level of national income or demand, but on the <strong>rate of change</strong> of national income. When demand is growing, firms invest to expand capacity. When demand is still high but <em>growing more slowly</em>, net investment actually falls. This is counterintuitive — things can still be good, but investment drops because they're getting better more slowly.`,
          `Here's a concrete example. Suppose a furniture manufacturer needs one machine for every 1,000 units of output. Currently it has 10 machines producing 10,000 units. If demand rises to 12,000, it needs two new machines — net investment of 2 machines. If demand then rises to 13,000, it needs only one new machine — net investment has <em>halved</em> even though demand is still rising. And if demand stabilises at 13,000? Net investment drops to zero because no new capacity is needed. The acceleration effect amplifies economic fluctuations dramatically.`,
          `The formula quantifies this: <strong>Net Investment = Accelerator Coefficient x Change in National Income</strong>. The accelerator coefficient (often denoted <em>v</em>) represents how much additional capital is needed per unit increase in output — it's essentially the capital-output ratio. If v = 3, every £1 increase in national income requires £3 of net investment. This high ratio is what makes investment so much more volatile than the income changes that trigger it.`,
          `The accelerator helps explain why business cycles overshoot in both directions. During an expansion, rising demand triggers investment that further increases demand (through the multiplier), which triggers even more investment. During a slowdown, the process reverses viciously: slowing demand causes investment to fall, which reduces income and demand further, causing more investment cuts. The accelerator turns moderate demand fluctuations into wild investment swings.`,
          `There are important <strong>limitations</strong> to the simple accelerator model. It assumes firms can expand capacity instantly (in reality, building a factory takes years), that firms respond mechanically to demand changes (in reality, expectations and confidence matter hugely), and that there's no spare capacity (firms with idle machines won't invest just because demand rises slightly). These limitations mean the accelerator works better as a general explanation of investment volatility than as a precise forecasting tool.`,
          `The accelerator also depends on business confidence about whether demand changes are <strong>temporary or permanent</strong>. If a firm thinks a demand increase is a one-off blip, it won't invest in expensive new capacity — it'll use overtime or temporary workers instead. Only when firms believe demand growth is sustained will they commit to the irreversible costs of new capital investment. This is why investment tends to lag behind economic recovery: firms wait to be sure before committing.`
        ],
        examTip: `The accelerator is counterintuitive and examiners exploit this. The key insight: investment falls when the RATE OF GROWTH of income slows, even if income itself is still rising. Many students wrongly assume investment falls only when income falls. Practise numerical examples to internalise this — work through a scenario where demand grows at 10%, then 5%, then 0%, and calculate net investment at each stage.`,
        formula: 'Net Investment = Accelerator Coefficient x Change in National Income'
      },
      {
        title: 'Interaction of Multiplier and Accelerator',
        points: [
          `The multiplier and accelerator don't operate in isolation — they interact to create powerful self-reinforcing cycles. Consider what happens when the government increases spending: the <strong>multiplier</strong> amplifies this into a larger increase in national income. That rising income then triggers the <strong>accelerator effect</strong>, causing investment to surge. But investment is itself a component of AD, so the extra investment feeds back into the multiplier, generating further income increases, which trigger further accelerator-driven investment. The two effects compound each other.`,
          `This <strong>multiplier-accelerator interaction</strong> is one of the leading explanations for the <strong>business cycle</strong>. During upswings, the interaction creates a virtuous circle of rising income and rising investment that can drive the economy into a boom. During downswings, the same interaction works in reverse as a vicious circle — falling income reduces investment (accelerator), which reduces income further (multiplier), which reduces investment further still. This helps explain why economies don't adjust smoothly but instead oscillate between booms and busts.`,
          `The interaction also explains why recessions can be <strong>deeper and more prolonged</strong> than the initial shock would suggest. A moderate fall in consumer confidence (small AD reduction) gets multiplied through the economy, then the accelerator kicks in as firms see demand growth slow and slash investment. This investment cut gets multiplied again, and so on. The 2008-09 recession exemplified this: a housing market correction triggered a cascade of falling consumption, collapsing business investment, and banking sector contraction that was far worse than the original property market problem.`,
          `For your exams, the multiplier-accelerator interaction is a powerful analytical tool for evaluating the effectiveness of government policy and the severity of economic shocks. When analysing any AD change, trace through both effects: the multiplier chain (spending → income → more spending) <em>and</em> the accelerator chain (changing income → changing investment). This dual analysis demonstrates the kind of sophisticated, interconnected thinking that examiners consistently reward in longer-answer questions.`
        ]
      }
    ]
  }
]

};

async function main() {
  const ids = Object.keys(CONTENT);
  console.log(`Updating ${ids.length} content sections...\n`);

  let success = 0;
  let failed = 0;

  for (const id of ids) {
    const content = CONTENT[id];
    const conceptCount = content.reduce((s, b) => s + (b.concepts?.length || 0), 0);
    const pointCount = content.reduce((s, b) =>
      s + (b.concepts || []).reduce((s2, c) => s2 + (c.points?.length || 0), 0), 0);

    const { error } = await supabase
      .from('section_content')
      .update({ data: content })
      .eq('section_id', id);

    if (error) {
      console.log(`  ✗ ${id}: ${error.message}`);
      failed++;
    } else {
      console.log(`  ✓ ${id} — ${content.length} blocks, ${conceptCount} concepts, ${pointCount} points`);
      success++;
    }
  }

  console.log(`\nDone: ${success} updated, ${failed} failed.`);
}

main();
