import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://trweeckuswgkenckeqfb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);

/* ═══════════════════════════════════════════════════════════
 *  REFORMAT — Unit 2 Part C
 *  Economic Growth + Macroeconomic Objectives & Policies
 *  Adds rich visual HTML: Key Idea, Flow Chain, So What,
 *  Watch Out, Take Away, Section Links, Subheadings
 * ═══════════════════════════════════════════════════════════ */

const CONTENT = {

'economic-growth': [
  /* ── Block 0: Actual vs Potential Economic Growth ─────── */
  {
    title: 'Actual vs Potential Economic Growth',
    concepts: [
      {
        title: 'Actual Economic Growth',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p><strong>Actual economic growth</strong> is the measured increase in <strong>real GDP</strong> over a given period — how much more the economy actually produces this year compared to last. When the UK economy grew by 4.3% in 2022 after the pandemic, it meant the total value of goods and services produced (adjusted for inflation) was 4.3% higher than the year before.</p></div>`,

          `You calculate it with a straightforward formula, but notice it must be <em>real</em> GDP — stripping out price changes — otherwise you'd confuse inflation with genuine output increases. If nominal GDP rises 5% but prices also rose 3%, the actual growth in output is closer to 2%. Using nominal figures is one of the most common traps in data-response questions.`,

          `Actual growth happens when the economy moves <strong>closer to its production possibility frontier (PPF)</strong> or, equivalently, when aggregate demand shifts right along an existing SRAS curve. Previously unemployed resources — idle workers, shuttered factories, underused land — are drawn into production. The UK's recovery from 2009–2013 is a textbook case: output was far below capacity, and gradual AD increases pulled the economy toward its potential.`,

          `Here's the thing: actual growth doesn't require any <em>new</em> capacity. It simply means the economy is using more of what it already has. If a restaurant has 50 tables but only fills 30 each evening, getting to 40 tables filled represents actual growth — no renovation needed, just more customers walking through the door.`,

          `<div class="content-subhead">Trend Growth Rate</div>You'll want to distinguish actual growth from the <strong>trend growth rate</strong> — the long-run average sustainable rate of growth. The UK's trend rate has historically been around 2–2.5% per year, though many economists argue it has slipped closer to 1.5% since the 2008 financial crisis. Actual growth fluctuates above and below this trend as the business cycle plays out.`,

          `Actual growth shows up in the data as rising GDP, falling unemployment, and increasing capacity utilisation. In the short run, it's driven by changes in any component of <strong>aggregate demand</strong>: consumer spending (C), investment (I), government spending (G), or net exports (X–M). When UK consumer confidence surged in 2013–2014, the boost to C was a major driver of actual growth.`,

          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>When a question asks about "economic growth," your first job is to determine whether they mean actual or potential. If the data shows GDP rising and unemployment falling, that's actual growth — and the explanation lies in what's happening to aggregate demand.</p></div>`
        ],
        formula: 'Actual growth rate = ((Real GDP₂ - Real GDP₁) / Real GDP₁) × 100'
      },
      {
        title: 'Potential Economic Growth',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p><strong>Potential economic growth</strong> is an increase in the economy's <strong>productive capacity</strong> — the maximum output it <em>could</em> produce if all resources were fully and efficiently employed. On a PPF diagram the entire frontier shifts outward; on an AD/AS diagram the <strong>LRAS curve shifts right</strong>.</p></div>`,

          `This kind of growth doesn't necessarily mean the economy <em>is</em> producing more right now — it means it <em>could</em>. Japan invested heavily in robotics and AI throughout the 2010s, expanding its productive potential, yet actual output growth often lagged because domestic demand was weak. You can have potential growth alongside stagnant or even falling actual GDP — the two are fundamentally different concepts.`,

          `<div class="flow-chain"><span class="pill blue">Investment in capital / education / technology</span><span class="arrow">→</span><span class="pill blue">Productive capacity rises</span><span class="arrow">→</span><span class="pill amber">LRAS shifts right</span><span class="arrow">→</span><span class="pill pos">Potential growth</span></div>`,

          `The sources of potential growth mirror the <strong>factors of production</strong>. More labour (population growth, immigration — the UK's labour force expansion from EU migration pre-Brexit), more capital (business investment in machinery, infrastructure like HS2), better technology (the digital revolution, advances in renewable energy), and improved human capital (education, training, healthcare keeping workers productive longer).`,

          `<strong>Total Factor Productivity (TFP)</strong> is the residual — the growth that can't be explained by simply adding more inputs. It captures innovation, better management, institutional improvements, and knowledge spillovers. The "productivity puzzle" in the UK since 2008, where TFP growth stalled despite technological progress, has been one of the most debated topics in British economics.`,

          `Potential growth determines the <strong>speed limit</strong> of the economy. If potential growth is 2% per year, actual growth can exceed 2% temporarily (by using up spare capacity), but sustained growth beyond potential leads to <strong>inflationary pressure</strong>. This is exactly what happened in the UK's late-1980s <strong>Lawson Boom</strong> — actual growth hit 5%, far exceeding potential, and inflation surged to nearly 10%.`,

          `<div class="take-away"><div class="take-away-label">Take Away</div><p>Government policies to boost potential growth are inherently <strong>supply-side</strong>: investing in education, funding R&amp;D, improving infrastructure, deregulating product markets, reforming the tax system. These take years or decades to pay off — there's no quick fix for potential growth. For exams, if a question shows a rightward shift in LRAS, that's potential growth; a movement along LRAS because AD increased is actual growth.</p></div>`
        ],
        examTip: `A common examiner trap: "Explain how investment leads to economic growth." The best answers explain BOTH channels. In the short run, investment is a component of AD (I rises → AD shifts right → actual growth). In the long run, investment adds to the capital stock (new factories, technology → LRAS shifts right → potential growth). This dual role of investment is a powerful analytical tool that earns top marks.`
      }
    ]
  },

  /* ── Block 1: Output Gaps ────────────────────────────── */
  {
    title: 'Output Gaps',
    concepts: [
      {
        title: 'Positive Output Gap',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>A <strong>positive output gap</strong> means the economy is producing <em>above</em> its estimated long-run potential — like a car engine running beyond its recommended maximum RPM. During the UK's <strong>Lawson Boom</strong> of 1987–1989, the positive output gap widened to an estimated 3–4% of GDP; inflation accelerated from 3% to nearly 10%.</p></div>`,

          `How can an economy produce above its potential? Because "potential" is a sustainable level, not an absolute ceiling. Workers can do overtime, machines can run extra shifts, firms can defer maintenance. But none of this is sustainable. Think of it as sprinting — you can run faster than your sustainable pace for a while, but you can't keep it up. For an economy, the costs show up as <strong>demand-pull inflation</strong>.`,

          `<div class="flow-chain"><span class="pill blue">AD rises past LRAS</span><span class="arrow">→</span><span class="pill amber">Firms compete for scarce workers</span><span class="arrow">→</span><span class="pill neg">Wages bid up faster than productivity</span><span class="arrow">→</span><span class="pill neg">Costs passed on as higher prices</span><span class="arrow">→</span><span class="pill neg">Demand-pull inflation</span></div>`,

          `On an AD/AS diagram, a positive output gap appears when actual output (determined by the intersection of AD and SRAS) lies to the <strong>right</strong> of the LRAS curve. The economy is operating beyond its sustainable capacity, and you'd expect the price level to be rising. This gap is associated with falling unemployment (often below the natural rate), strong consumer confidence, and booming asset prices.`,

          `The policy response is typically <strong>contractionary</strong>: the Bank of England raises interest rates to cool spending, or the government tightens fiscal policy. In the late 1980s, the UK government eventually raised rates from 7.5% to 15% to close the positive output gap — a dramatic correction that tipped the economy into recession by 1990. This illustrates the policy dilemma: closing a positive output gap often means deliberately slowing the economy.`,

          `In recent history, the post-COVID period (2021–2022) saw many advanced economies develop positive output gaps as pent-up consumer demand surged into an economy with constrained supply chains. The result was the highest inflation in 40 years across the US (peaking at 9.1%) and the UK (peaking at 11.1%) — exactly as output gap theory would predict.`,

          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>Always connect the positive output gap to its <strong>consequences</strong>: demand-pull inflation, potential current account deterioration (as domestic spending sucks in imports), and the risk of an unsustainable boom that ends in a painful bust. The story never ends with "the economy is doing well" — it ends with overheating and the correction that follows.</p></div>`
        ],
        formula: 'Output gap = (Actual GDP - Potential GDP) / Potential GDP × 100'
      },
      {
        title: 'Negative Output Gap',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>A <strong>negative output gap</strong> is the mirror image: actual GDP falls <em>below</em> the economy's potential, meaning idle resources could be employed but aren't. After the <strong>2008 financial crisis</strong>, the UK's negative output gap was estimated at around –4% to –6% of GDP, representing billions of pounds of lost output.</p></div>`,

          `The symptoms are painful: <strong>unemployment rises</strong> as firms lay off workers, <strong>business confidence drops</strong> as empty order books signal weak demand, <strong>investment falls</strong> as firms see no reason to expand. Shops close on high streets, graduate employment shrinks, and government tax revenues fall even as welfare spending rises — a fiscal double hit.`,

          `Unlike a positive output gap, a negative gap puts <strong>downward pressure on inflation</strong> (disinflation or even deflation). With high unemployment, workers have little bargaining power and accept lower wages. With weak demand, firms can't raise prices. <strong>Japan's "Lost Decades"</strong> from the 1990s onward shows how a persistent negative output gap can trap an economy in low-growth, near-zero-inflation stagnation for years.`,

          `<div class="flow-chain"><span class="pill neg">AD falls / remains weak</span><span class="arrow">→</span><span class="pill neg">Actual GDP &lt; Potential GDP</span><span class="arrow">→</span><span class="pill amber">Spare capacity, rising unemployment</span><span class="arrow">→</span><span class="pill blue">Downward pressure on wages &amp; prices</span><span class="arrow">→</span><span class="pill pos">Expansionary policy needed</span></div>`,

          `The key policy response is <strong>expansionary</strong>: cutting interest rates, increasing government spending, reducing taxes — anything to boost aggregate demand. The Bank of England slashed rates to 0.5% in March 2009 and launched quantitative easing (QE), eventually purchasing over £895 billion in government bonds. The goal was explicitly to close the negative output gap.`,

          `<div class="watch-out"><div class="watch-out-label">Common Mistake</div><p>A negative output gap can involve <strong>hysteresis</strong> — prolonged unemployment permanently damaging the economy's potential. Workers lose skills, firms close permanently. The gap can close "from the wrong side" as potential GDP itself shrinks. Also remember: the output gap is an <em>estimate</em>, not directly measurable. The OBR and Bank of England sometimes disagree by a full percentage point — if policymakers misjudge the gap, their response may be inappropriate.</p></div>`,

          `<div class="take-away"><div class="take-away-label">Take Away</div><p>The negative output gap is your analytical bridge between recession and deflationary pressure. When you see data showing rising unemployment and falling inflation, the explanation is almost certainly a widening negative output gap. Use the concept explicitly — it connects macro indicators to a coherent theoretical framework and earns marks for analytical precision.</p></div>`
        ],
        examTip: `Don't just define the output gap — show the examiner you understand its measurement problem. Stating that "the output gap is estimated, not directly observed, and different bodies like the OBR and Bank of England may disagree on its size" demonstrates evaluative awareness that lifts answers from Level 3 to Level 4. It also opens a great evaluation point: if policymakers misjudge the gap, their policy response may be inappropriate.`
      }
    ]
  },

  /* ── Block 2: The Business (Trade) Cycle ─────────────── */
  {
    title: 'The Business (Trade) Cycle',
    concepts: [
      {
        title: 'Phases of the Business Cycle',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>The <strong>business cycle</strong> (also called the <strong>trade cycle</strong>) describes the repeated pattern of expansion and contraction in economic activity over time. The UK has experienced clear cycles: the Barber Boom (1972–73), Lawson Boom (1987–89), the Great Recession (2008–09), and the COVID contraction (2020).</p></div>`,

          `<div class="content-subhead">The Four Phases</div>There are four distinct phases. The <strong>expansion</strong> (or recovery) is when GDP is rising, unemployment is falling, and confidence is building. The <strong>boom</strong> (or peak) is the high point — output is at or above potential and the economy may be overheating. The <strong>contraction</strong> (or recession) is when GDP is falling or growth is slowing sharply. The <strong>trough</strong> (or slump) is the low point, where output has bottomed out before recovery begins.`,

          `<div class="flow-chain"><span class="pill pos">Expansion</span><span class="arrow">→</span><span class="pill amber">Boom (peak)</span><span class="arrow">→</span><span class="pill neg">Contraction</span><span class="arrow">→</span><span class="pill blue">Trough (slump)</span><span class="arrow">→</span><span class="pill pos">Recovery</span></div>`,

          `A formal <strong>recession</strong> is technically defined as two consecutive quarters of negative real GDP growth. The UK entered recession in Q2–Q3 2008 during the financial crisis and again briefly in Q3–Q4 2023 (a very shallow technical recession). The US NBER uses a broader definition encompassing employment, industrial production, and real income.`,

          `What drives the cycle? <strong>Keynesian explanations</strong> focus on AD fluctuations — shifts in consumer confidence, investment sentiment ("animal spirits"), or external shocks. <strong>Monetarist explanations</strong> point to money supply changes. <strong>Real Business Cycle theory</strong> argues technology shocks drive fluctuations. In practice, most cycles have multiple causes — the 2008 crisis involved financial deregulation, a housing bubble, and a global credit crunch.`,

          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>The business cycle links to almost every macro concept: unemployment (rises in downturns), inflation (rises in booms), fiscal deficits (worsen in recessions via automatic stabilisers), and exchange rates (affected by relative growth rates). It gives you a narrative structure for connecting multiple indicators in data-response questions.</p></div>`
        ]
      },
      {
        title: 'Characteristics of Each Phase',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>Each phase of the business cycle has a distinct signature of macroeconomic indicators. Recognising these patterns — and the <strong>leading vs lagging indicators</strong> that signal transitions — is a core exam skill.</p></div>`,

          `During the <strong>expansion/recovery</strong>, GDP growth is positive and accelerating, unemployment is falling (often with a lag), consumer confidence is rising, and business investment picks up. Tax revenues increase and welfare spending falls, improving the fiscal position. In the UK's post-2012 recovery, consumer spending led the way, fuelled by rising house prices and improving confidence.`,

          `At the <strong>boom/peak</strong>, the economy operates at or beyond full capacity. Unemployment falls to very low levels — the UK hit 3.7% in 2022, the lowest since 1974. Inflation accelerates as demand-pull pressures build and firms compete for scarce labour. The current account may deteriorate as booming domestic demand sucks in imports. Asset prices (houses, shares) are typically elevated — the UK house price bubble of 2005–2007 was a classic boom-phase phenomenon.`,

          `The <strong>contraction/downturn</strong> begins when growth slows or turns negative. Firms see orders decline, profits shrink, and a <strong>negative multiplier effect</strong> kicks in: one person's reduced spending is another's reduced income. The 2008–09 contraction was savage: UK GDP fell by over 6%, hundreds of thousands lost their jobs, and banks like Northern Rock and RBS required state rescue.`,

          `At the <strong>trough/slump</strong>, the economy hits its lowest point. Unemployment peaks, output is well below potential. But the trough also contains the seeds of recovery: asset prices attract bargain-hunting investors, rock-bottom rates make borrowing cheap, and pent-up demand creates a base for spending. The UK's trough in mid-2009 saw GDP stop falling as aggressive stimulus gained traction.`,

          `<div class="take-away"><div class="take-away-label">Take Away</div><p><strong>Leading indicators</strong> (consumer confidence, housing starts, stock markets, new orders) turn <em>before</em> GDP changes direction; <strong>lagging indicators</strong> (unemployment, inflation) turn <em>after</em>. In the 2008 crisis the FTSE 100 bottomed out in March 2009 — months before GDP stopped contracting. The cycle is <strong>not perfectly regular or predictable</strong>: cycles vary in length, depth, and cause, and this fundamental uncertainty provides your strongest evaluation points.</p></div>`
        ],
        examTip: `In data-response questions, examiners love giving you a set of indicators and asking you to identify which phase of the cycle the economy is in. The trick is to look at the COMBINATION: rising GDP + falling unemployment + rising inflation = boom. Rising unemployment + falling GDP + falling inflation = contraction. Don't rely on a single indicator — one data point can mislead, but a pattern tells the story.`
      }
    ]
  },

  /* ── Block 3: Causes of Economic Growth ──────────────── */
  {
    title: 'Causes of Economic Growth',
    concepts: [
      {
        title: 'Demand-Side Causes',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>In the short run, economic growth is driven by increases in <strong>aggregate demand (AD = C + I + G + (X–M))</strong>. A rise in any component pulls actual output closer to the economy's potential. The UK's post-2012 recovery was heavily consumer-led: household spending grew as unemployment fell and house prices recovered, pulling the economy out of its negative output gap.</p></div>`,

          `<strong>Consumer confidence</strong> is a powerful and sometimes underestimated driver. When people feel secure in their jobs, they spend more freely and save less. The UK's GfK Consumer Confidence Index surged from –30 in late 2011 to –1 by late 2015, and spending rose in tandem. Conversely, a collapse in confidence — as during COVID lockdowns or the 2022 cost-of-living crisis — can slash spending even when incomes haven't fallen much. Keynes called this <strong>"animal spirits"</strong>.`,

          `<strong>Investment (I)</strong> is the most volatile component of AD and often the trigger for cyclical swings. UK business investment fell by 25% during the 2008–09 crisis and took nearly a decade to recover. This volatility means investment often amplifies the business cycle rather than smoothing it.`,

          `<strong>Government spending (G)</strong> can directly boost AD during downturns. The UK's fiscal stimulus in 2008–09 (the temporary VAT cut from 17.5% to 15%) added an estimated 1–2 percentage points to GDP growth. The subsequent austerity programme from 2010 arguably slowed recovery — a highly contested policy decision.`,

          `<div class="flow-chain"><span class="pill blue">Initial injection (G, I, or X)</span><span class="arrow">→</span><span class="pill blue">Creates income for workers</span><span class="arrow">→</span><span class="pill blue">Workers spend (based on MPC)</span><span class="arrow">→</span><span class="pill blue">Creates further income</span><span class="arrow">→</span><span class="pill amber">Multiplier effect: total ΔY &gt; initial injection</span></div>`,

          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>The <strong>multiplier effect</strong> amplifies demand-side causes. An initial injection creates income, which is partly spent, creating further income. The UK multiplier for government spending has been estimated at 0.5–1.5 depending on conditions. <strong>Net exports (X–M)</strong> depend on global conditions and the exchange rate — sterling's sharp depreciation after the 2016 Brexit referendum boosted export competitiveness, while Germany's export-led model shows how net exports can sustain growth.</p></div>`
        ]
      },
      {
        title: 'Supply-Side Causes',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>Long-run sustainable growth requires expanding the economy's <strong>productive capacity</strong> — shifting the LRAS curve right. This means increasing the quantity and quality of the <strong>factors of production</strong>: labour, capital, land, and enterprise. Without supply-side growth, any demand-led expansion simply generates inflation once the economy hits its capacity ceiling.</p></div>`,

          `<div class="flow-chain"><span class="pill blue">Investment / education / technology</span><span class="arrow">→</span><span class="pill blue">More or better factors of production</span><span class="arrow">→</span><span class="pill amber">Productive capacity expands</span><span class="arrow">→</span><span class="pill pos">LRAS shifts right</span><span class="arrow">→</span><span class="pill pos">Sustainable, non-inflationary growth</span></div>`,

          `<strong>Investment in physical capital</strong> is the most direct route. South Korea's transformation from extreme poverty in the 1960s to a high-income economy by the 2000s was driven by extraordinarily high capital investment — averaging over 30% of GDP for decades. The UK, by contrast, has chronically underinvested, with business investment as a share of GDP consistently below the OECD average.`,

          `<strong>Human capital</strong> — skills, knowledge, and health of the workforce — is increasingly recognised as the most important factor. Finland's world-class education system and <strong>Singapore's</strong> relentless skills focus have produced workforces far more productive per hour than their population size would suggest. The UK's Apprenticeship Levy (2017) aimed to boost human capital but has had mixed results.`,

          `<strong>Technological progress and innovation</strong> are the ultimate engines of long-run growth. Robert Solow's growth model showed that technology is the main driver — simply adding more capital and labour runs into <strong>diminishing returns</strong>, but new technology shifts the entire production function upward. The Industrial Revolution, the IT revolution, and the current AI revolution all represent step-changes in capacity.`,

          `<strong>Institutional quality</strong> — rule of law, property rights, contract enforcement, low corruption — creates the environment in which other factors flourish. Daron Acemoglu and James Robinson have argued institutions are the "fundamental cause" of long-run growth differences. Comparing North and South Korea dramatically illustrates how identical populations produce vastly different outcomes under different institutional frameworks.`,

          `<div class="take-away"><div class="take-away-label">Take Away</div><p>The strongest growth episodes — the US in the 1990s, <strong>China's</strong> 30-year transformation — involved demand and supply factors reinforcing each other. <strong>Investment</strong> plays a dual role: it boosts AD in the short run (demand-side) <em>and</em> adds to productive capacity in the long run (supply-side). Making this connection explicit separates top-tier answers from average ones. Labour supply expansions (e.g. UK immigration from the EU) raise total GDP, but whether they raise GDP <em>per capita</em> depends on productivity.</p></div>`
        ]
      }
    ]
  },

  /* ── Block 4: Costs and Benefits of Economic Growth ──── */
  {
    title: 'Costs and Benefits of Economic Growth',
    concepts: [
      {
        title: 'Benefits of Economic Growth',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>The most fundamental benefit of economic growth is <strong>higher living standards</strong>, measured by rising real GDP per capita. <strong>China's</strong> extraordinary growth — averaging nearly 10% per year from 1980 to 2010 — lifted over 800 million people out of extreme poverty. Even modest growth compounds powerfully: at 2% per year, living standards double every 35 years.</p></div>`,

          `Growth generates <strong>employment</strong>. As firms produce more, they hire more workers, reducing unemployment and its associated social costs — poverty, mental health deterioration, crime. The UK's unemployment rate fell from 8.5% in late 2011 to 3.8% by early 2020, driven by sustained economic growth. Each percentage point drop represents hundreds of thousands of people gaining the dignity of paid work.`,

          `Growth creates a <strong>fiscal dividend</strong>: higher incomes mean more income tax, more spending means more VAT, more profits mean more corporation tax, and fewer unemployed means lower welfare spending. The UK's deficit fell from 10% of GDP in 2010 to under 2% by 2018, driven substantially by growth increasing tax revenues.`,

          `Growth encourages <strong>investment and innovation</strong> through a virtuous cycle. Strong growth and large profits in the 2010s US tech sector funded massive R&amp;D spending by Apple, Google, Amazon, and Microsoft, generating innovations (cloud computing, AI, electric vehicles) that raised productivity further.`,

          `<strong>International competitiveness</strong> improves with productivity-driven growth. <strong>Germany's</strong> manufacturing prowess (cars, machinery, chemicals) has made it the world's third-largest exporter despite high wages, because productivity growth keeps unit labour costs competitive.`,

          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>Growth also provides the <strong>resources to address other problems</strong> — environmental challenges, health crises, infrastructure needs. The UK's investment in offshore wind (now over a third of its electricity) would have been unaffordable without decades of prior growth. Wealthier societies can afford cleaner technology — the Environmental Kuznets Curve hypothesis.</p></div>`
        ]
      },
      {
        title: 'Costs of Economic Growth',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>Growth can generate <strong>inflation</strong>, particularly when it's demand-driven and the economy is near full capacity. The UK experienced this during the Barber Boom (1970s), the Lawson Boom (late 1980s), and in 2021–2023 when post-COVID demand collided with supply chain disruptions to produce double-digit inflation.</p></div>`,

          `<strong>Environmental degradation</strong> is arguably the most serious long-term cost. <strong>China's</strong> growth miracle came at enormous environmental cost: severe air pollution, water contamination, and becoming the world's largest CO₂ emitter. Whether growth can be "decoupled" from environmental damage is one of the defining debates of our era.`,

          `Growth is often <strong>unequally distributed</strong>. In the UK, London's GDP per capita is more than double that of Wales or the North East. The US experience since 1980 is stark: the top 1% captured over half of all income growth while median real wages barely moved. Growth that increases inequality may not improve wellbeing for the majority.`,

          `Rapid growth can cause <strong>current account deficits</strong> as rising domestic incomes suck in imports. The UK has run a persistent current account deficit (around 3–5% of GDP), partly because its growth has been consumption-led rather than export-led.`,

          `There are <strong>social and quality-of-life costs</strong>: longer working hours, increased stress, loss of community. The <strong>Easterlin Paradox</strong> — the observation that beyond a moderate income level, additional growth doesn't reliably increase reported happiness — challenges the assumption that more GDP always means better lives.`,

          `<div class="take-away"><div class="take-away-label">Take Away</div><p>Growth driven by <strong>resource depletion</strong> is inherently unsustainable — Saudi Arabia's oil dependence illustrates this. The concept of <strong>natural capital depreciation</strong> captures the idea that we should account for forests felled, fish stocks depleted, and soil degraded. When evaluating growth, distinguish between <em>types</em>: productivity-driven clean growth is far less costly than resource depletion and consumption binges.</p></div>`
        ],
        examTip: `When evaluating "Is economic growth desirable?", the top-mark strategy is to distinguish between <em>types</em> of growth. Growth driven by productivity improvements and clean technology is far less costly than growth driven by resource depletion and consumption binges. This nuance — that the <em>quality</em> and <em>source</em> of growth matter more than the raw number — transforms a generic answer into a sophisticated evaluation.`
      },
      {
        title: 'Sustainable Economic Growth',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p><strong>Sustainable economic growth</strong> means growing in a way that meets present needs without compromising future generations' ability to meet theirs (the 1987 Brundtland Report definition). It encompasses maintaining the economy's entire productive base — physical capital, human capital, natural capital, and social capital — so growth can continue indefinitely.</p></div>`,

          `The tension is real. Developing countries like India and Nigeria argue they need rapid growth to lift billions from poverty, and that rich countries shouldn't now tell them to grow slowly after industrialising freely for 200 years. At COP26 in Glasgow (2021), India's PM Modi pushed for "net zero by 2070" rather than 2050. The equity dimension of sustainable growth is an essential evaluation point.`,

          `<div class="content-subhead">Green Growth Strategies</div><strong>Green growth</strong> attempts to square the circle. Denmark demonstrated it's possible — GDP grew ~30% between 2000 and 2020 while CO₂ emissions fell over 40%, driven by massive wind energy investment. The UK has also achieved partial decoupling: GDP grew ~75% from 1990 to 2022 while territorial CO₂ emissions fell nearly 50%.`,

          `Policy tools include <strong>carbon pricing</strong> (the EU Emissions Trading System, carbon taxes in Sweden and Canada), <strong>green investment</strong> subsidies, <strong>circular economy regulations</strong>, and <strong>natural capital accounting</strong>. The UK's Dasgupta Review (2021) argued forcefully that economics must treat nature as an asset, not a free input.`,

          `Sustainability also has a <strong>macroeconomic stability dimension</strong>. Growth fuelled by unsustainable credit booms (the US and UK pre-2008) or asset bubbles is economically unsustainable even if it's environmentally benign. Japan's 1980s bubble — where the Imperial Palace grounds were famously valued higher than all the real estate in California — showed that financial unsustainability is as destructive as environmental unsustainability.`,

          `<div class="take-away"><div class="take-away-label">Take Away</div><p>The strongest exam approach recognises the <strong>trade-off between speed and sustainability</strong>. China chose speed and now faces enormous environmental remediation costs. Extremely cautious policies might leave millions in poverty. The optimal path depends on country-specific circumstances — acknowledging this complexity, rather than offering "growth is good" or "growth is bad," earns full evaluation marks.</p></div>`
        ]
      }
    ]
  },

  /* ── Block 5: Economic Growth and AD/AS Analysis ─────── */
  {
    title: 'Economic Growth and AD/AS Analysis',
    concepts: [
      {
        title: 'Linking Growth to AD/AS',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>The AD/AS model is your primary analytical tool for illustrating economic growth. Every essay or long-answer question on growth benefits from a well-drawn AD/AS diagram — and <strong>which diagram</strong> you choose signals to the examiner which type of growth you're analysing.</p></div>`,

          `<strong>Actual growth from the demand side</strong> is shown as a rightward shift in AD (from AD₁ to AD₂) along an existing SRAS curve. Real GDP increases from Y₁ to Y₂. If the economy begins with a negative output gap, the AD shift produces growth with little inflationary pressure (the Keynesian region). If it begins near full capacity, the same AD shift produces more inflation and less real growth (the classical region). This distinction is critical for policy analysis.`,

          `<div class="flow-chain"><span class="pill blue">AD shifts right</span><span class="arrow">→</span><span class="pill pos">Real GDP rises (Y₁ to Y₂)</span><span class="arrow">→</span><span class="pill amber">Price level may rise (if near capacity)</span><span class="arrow">→</span><span class="pill pos">Actual growth</span></div>`,

          `<strong>Potential growth from the supply side</strong> is shown as a rightward shift in <strong>LRAS</strong> (from LRAS₁ to LRAS₂). The economy's maximum sustainable output increases, and if AD matches, real GDP grows <em>without</em> generating inflationary pressure. This is the "best" kind of growth — higher output, potentially lower prices, no overheating. The shift comes from technological progress, education, infrastructure, or institutional reform.`,

          `<div class="watch-out"><div class="watch-out-label">Common Mistake</div><p>When AD grows <strong>faster</strong> than LRAS, you get a positive output gap (the Lawson Boom story). When AD grows <strong>slower</strong> than LRAS, you get a negative output gap (the post-2008 story). Don't confuse "LRAS shifting right" with automatic growth — if AD doesn't keep pace, the result is wasted potential and spare capacity, not prosperity.</p></div>`,

          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>The most realistic scenario is <strong>both shifting together</strong>. In the UK's mid-2000s (2003–2007), AD and LRAS expanded roughly in tandem: steady growth around 2.5–3%, low and stable inflation near the 2% target. This balanced expansion is the ideal that policymakers aim for — and the benchmark against which you should evaluate any growth episode in data-response questions.</p></div>`,

          `<div class="take-away"><div class="take-away-label">Take Away</div><p>For your strongest answers, use <strong>multiple diagrams</strong> to compare outcomes: one showing demand-led growth with inflation, another showing supply-led growth without inflation. This comparative approach demonstrates that "economic growth" is not a single phenomenon — its causes, consequences, and policy implications depend entirely on <em>which</em> curves are shifting and <em>why</em>.</p></div>
<div class="section-links"><span class="link">↗ 2.3 Aggregate Supply</span><span class="link">↗ 2.6 Macroeconomic Policies</span></div>`
        ]
      }
    ]
  }
],

'macroeconomic-objectives-policies': [
  /* ── Block 0: Macroeconomic Objectives ───────────────── */
  {
    title: 'Macroeconomic Objectives',
    concepts: [
      {
        title: 'The Four Main Objectives',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>Every government juggles <strong>four main macroeconomic objectives</strong> — think of them as the vital signs of an economy's health. A country can have strong growth but crippling inflation (overheating), or low inflation but stagnant output (underperforming). The art of macroeconomic policy is managing all four simultaneously.</p></div>`,

          `The first objective is <strong>sustainable economic growth</strong> — a steady increase in real GDP that can be maintained over time without excessive inflation or environmental damage. The UK targets growth around the trend rate of 2–2.5% per year. Too fast (5% during the Lawson Boom) creates overheating; too slow (the 1.4% average post-2008) fails to improve living standards meaningfully.`,

          `The second is <strong>low and stable inflation</strong>: the Bank of England's <strong>CPI target of 2%</strong> (±1 percentage point tolerance). Not zero — a small amount of inflation gives firms room to adjust relative wages and prices. But high or unpredictable inflation erodes purchasing power, distorts investment, and hits the poorest hardest. The UK's 11.1% inflation in October 2022 reminded everyone why price stability matters.`,

          `The third is <strong>low unemployment</strong>, ideally at or near the <strong>natural rate (NAIRU)</strong> where the labour market is in equilibrium. The UK defines "full employment" loosely as an unemployment rate of around 4–4.5%. But headline figures can mask problems: zero-hours contracts, underemployment, and regional disparities mean the official rate understates real labour market slack.`,

          `The fourth is a <strong>sustainable balance of payments</strong>, particularly the current account. A persistent current account deficit means a country consumes more than it produces and must finance the gap through capital inflows. The UK has run a current account deficit for decades (3–5% of GDP in recent years), financed primarily by foreign investment. Whether this is sustainable depends on whether foreigners continue to find UK assets attractive.`,

          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>These four objectives form the backbone of macro essay questions. Almost every policy question boils down to: which objectives does the policy support, which does it threaten, and how should policymakers navigate the trade-offs? Train yourself to evaluate any policy against all four objectives automatically — this is the analytical framework examiners reward.</p></div>`
        ]
      },
      {
        title: 'Conflicts Between Objectives',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>The fundamental challenge of macroeconomic policy is that <strong>achieving one objective often comes at the expense of another</strong>. These conflicts are not accidental — they arise from the structure of the economy itself. Understanding them is what separates competent exam answers from outstanding ones.</p></div>`,

          `<strong>Growth vs inflation</strong> is the most common conflict. Expansionary policies that boost growth (rate cuts, fiscal stimulus) tend to increase inflationary pressure as the economy approaches capacity. The UK's post-COVID recovery perfectly illustrated this: pent-up demand drove strong growth in 2021–22, but inflation surged past 10%. You can't have rapid demand-driven growth near full capacity without accepting some inflationary cost.`,

          `<strong>Unemployment vs inflation</strong> is the <strong>Phillips Curve</strong> trade-off. Reducing unemployment typically requires stimulating AD, which raises inflation. Reducing inflation requires contractionary policy, which raises unemployment. When the Bank of England raised rates to 5.25% in 2023 to combat 10%+ inflation, it knowingly accepted that some workers would lose their jobs as a result.`,

          `<div class="flow-chain"><span class="pill pos">Expansionary policy</span><span class="arrow">→</span><span class="pill pos">AD rises</span><span class="arrow">→</span><span class="pill pos">Growth ↑, Unemployment ↓</span><span class="arrow">→</span><span class="pill neg">But: Inflation ↑, Current account may worsen</span></div>`,

          `<strong>Growth vs the current account</strong> creates tension because faster growth typically sucks in imports (consumers buy more foreign goods as incomes rise), worsening the trade balance. The UK's consumption-led growth model consistently produces current account deficits. Export-led growth models (Germany, China) avoid this conflict but create other tensions — notably, suppressed domestic consumption and reliance on foreign demand.`,

          `<strong>Growth vs the environment</strong> is the sustainability conflict. Faster growth, unless it is specifically "green growth," tends to increase resource use, pollution, and carbon emissions. The political difficulty of this trade-off explains why progress on climate commitments has been slow — no government wants to tell voters that protecting the environment requires accepting slower growth, even temporarily.`,

          `<div class="take-away"><div class="take-away-label">Take Away</div><p>The severity of these conflicts depends on the <strong>starting position</strong> of the economy. With a large negative output gap (deep recession), there's relatively little conflict — expansionary policy boosts growth and cuts unemployment with minimal inflation risk. Conflicts intensify as the economy approaches full capacity. Stating that trade-offs are <strong>state-dependent</strong>, not absolute, earns the highest marks.</p></div>`
        ],
        examTip: `When a question asks you to "evaluate" or "discuss" a policy, the examiner is specifically looking for you to identify which objectives the policy helps AND which it may harm. A one-sided answer cannot earn full evaluation marks. Structure: "This policy supports Objective A because... However, it may conflict with Objective B because..." Then resolve with a time-horizon argument or a "depends on" qualification.`
      }
    ]
  },

  /* ── Block 1: Fiscal Policy ──────────────────────────── */
  {
    title: 'Fiscal Policy',
    concepts: [
      {
        title: 'What is Fiscal Policy?',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p><strong>Fiscal policy</strong> is the use of <strong>government spending (G)</strong> and <strong>taxation (T)</strong> to influence aggregate demand, the distribution of income, and the pattern of economic activity. In the UK, fiscal policy is set by the Chancellor of the Exchequer, usually announced in the Budget and Autumn Statement, and implemented by HM Treasury.</p></div>`,

          `<strong>Expansionary fiscal policy</strong> means increasing G and/or cutting T to boost AD. This is the classic Keynesian prescription for a recession: when private spending collapses, the government steps in as "spender of last resort." The UK's 2008–09 stimulus (temporary VAT cut from 17.5% to 15%, accelerated capital projects) aimed to prevent the Great Recession from becoming a depression.`,

          `<strong>Contractionary fiscal policy</strong> means cutting G and/or raising T to reduce AD, typically used to cool an overheating economy or reduce a budget deficit. The UK's austerity programme from 2010 onward — which cut departmental spending by an average of 19% in real terms over five years — was a sustained contractionary fiscal policy aimed primarily at deficit reduction.`,

          `<div class="flow-chain"><span class="pill blue">Government cuts taxes / raises spending</span><span class="arrow">→</span><span class="pill blue">Households &amp; firms have more to spend</span><span class="arrow">→</span><span class="pill amber">AD shifts right</span><span class="arrow">→</span><span class="pill pos">Output ↑, Employment ↑</span><span class="arrow">→</span><span class="pill neg">But: possible inflation if near capacity</span></div>`,

          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>Fiscal policy differs from monetary policy in a crucial way: it's <strong>directly controlled by elected politicians</strong>, not an independent central bank. This makes it subject to political pressures — the temptation to cut taxes or boost spending before elections is real. The September 2022 mini-budget (unfunded tax cuts triggering a market crisis) showed how fiscal policy missteps can have immediate and severe consequences.</p></div>`
        ]
      },
      {
        title: 'Budget Deficits and Surpluses',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>A <strong>budget deficit</strong> occurs when government spending (G) exceeds tax revenue (T) in a given year — the government spends more than it collects and must borrow the difference. A <strong>surplus</strong> is the reverse. The UK has run a deficit in almost every year since 2001, and the deficit ballooned to nearly 15% of GDP in 2020–21 due to COVID emergency spending.</p></div>`,

          `Deficits are financed by <strong>borrowing</strong> — the government sells bonds (gilts) to investors, promising to repay with interest. Each year's deficit adds to the <strong>national debt</strong> (the accumulated stock of borrowing). UK national debt rose from about 35% of GDP in 2007 to over 100% of GDP by 2023. Interest payments on this debt (around £100 billion per year by 2023) represent a significant opportunity cost — money that could fund public services or tax cuts.`,

          `<div class="content-subhead">Structural vs Cyclical Deficit</div>Economists distinguish between the <strong>cyclical deficit</strong> (the portion caused by the economy being below potential — tax revenues fall and welfare spending rises automatically in recessions) and the <strong>structural deficit</strong> (the portion that would exist even if the economy were at full capacity). The structural deficit is the one policymakers should worry about, because it won't self-correct with recovery.`,

          `<strong>Crowding out</strong> is the key theoretical concern with persistent deficits. When the government borrows heavily, it competes with the private sector for loanable funds, potentially pushing up interest rates and discouraging private investment. However, Keynesians argue that in a recession (when private investment is already low and saving is high), crowding out is minimal — the government is borrowing money that would otherwise sit idle.`,

          `The <strong>"fiscal rules"</strong> debate centres on whether governments should bind themselves to deficit or debt targets. The UK has had various fiscal rules (the "golden rule" under Brown, the OBR's charter for fiscal responsibility), but governments have repeatedly broken or redefined them. The tension is real: too-strict rules prevent counter-cyclical stimulus; too-loose rules enable politically motivated overspending.`,

          `When analysing deficits in exams, always specify whether you're discussing <strong>cyclical or structural</strong>. A large cyclical deficit during a recession is normal and self-correcting; a large structural deficit is a genuine long-term problem. This distinction is one of the most powerful analytical tools in fiscal policy questions and signals Level 4 awareness to examiners.`
        ],
        formula: 'Budget balance = Tax revenue (T) - Government spending (G)'
      },
      {
        title: 'Automatic Stabilisers vs Discretionary Policy',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p><strong>Automatic stabilisers</strong> are features of the tax and welfare system that automatically dampen economic fluctuations without any deliberate policy action. <strong>Discretionary policy</strong> requires active decisions by politicians — new spending programmes, tax changes, or emergency measures.</p></div>`,

          `How automatic stabilisers work: in a recession, as incomes fall, people pay <strong>less income tax</strong> (especially those who drop into lower tax brackets) and more people claim <strong>welfare benefits</strong> (Jobseeker's Allowance, Universal Credit). This automatically injects spending power into the economy, partially offsetting the fall in private demand. In a boom, the reverse happens — rising incomes push people into higher tax brackets, and fewer claim benefits — automatically cooling the economy.`,

          `The UK's progressive tax system and welfare state make it a country with relatively strong automatic stabilisers. During the 2008–09 recession, automatic stabilisers added an estimated 2–3% of GDP to the deficit — cushioning the downturn significantly. Countries with flatter tax systems and weaker safety nets (like the US) have weaker automatic stabilisers and may need more discretionary action.`,

          `<div class="flow-chain"><span class="pill neg">Recession hits</span><span class="arrow">→</span><span class="pill blue">Incomes fall, unemployment rises</span><span class="arrow">→</span><span class="pill blue">Tax revenue ↓ automatically, welfare spending ↑ automatically</span><span class="arrow">→</span><span class="pill pos">Cushions fall in AD</span><span class="arrow">→</span><span class="pill amber">Deficit widens (cyclical component)</span></div>`,

          `<strong>Discretionary fiscal policy</strong> involves deliberate government decisions. Examples: the 2008 VAT cut, the 2020 furlough scheme (costing over £70 billion), the 2022 Energy Price Guarantee. Discretionary policy can be more powerful than automatic stabilisers, but suffers from <strong>time lags</strong> — recognition lag (realising there's a problem), decision lag (agreeing on the response), and implementation lag (getting money into the economy). By the time fiscal stimulus arrives, the recession may already be ending.`,

          `<div class="watch-out"><div class="watch-out-label">Common Mistake</div><p>Students often treat "fiscal policy" as synonymous with discretionary action and forget about automatic stabilisers entirely. In reality, automatic stabilisers do most of the heavy lifting in normal recessions. Also beware of the <strong>political economy</strong> problem: governments may time discretionary stimulus for electoral advantage rather than economic need. The September 2022 mini-budget showed how fiscally irresponsible discretionary decisions can backfire catastrophically.</p></div>`,

          `<div class="take-away"><div class="take-away-label">Take Away</div><p>Automatic stabilisers are politically easy (no decisions required) but may be too weak for severe downturns. Discretionary policy can be powerful but suffers from time lags and political distortion. The best fiscal frameworks combine strong automatic stabilisers with clear rules for deploying discretionary action — and the exam rewards you for explaining <em>both</em> mechanisms, not just one.</p></div>`
        ],
        examTip: `A powerful evaluation point: automatic stabilisers are politically easy (no one has to make a difficult decision) but may be too weak for severe downturns. Discretionary policy can be powerful but suffers from time lags and political distortion (governments may time stimulus for elections rather than economic need). The best fiscal frameworks combine strong automatic stabilisers with clear rules for when and how to deploy discretionary action.`
      },
      {
        title: 'Strengths and Weaknesses of Fiscal Policy',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>Fiscal policy is a powerful but imperfect tool. Its <strong>strengths</strong> — direct impact on AD, ability to target specific groups or sectors, and effectiveness when monetary policy is exhausted — must be weighed against its <strong>weaknesses</strong> — time lags, political interference, and the risk of unsustainable debt accumulation.</p></div>`,

          `<strong>Strength: direct demand impact.</strong> Government spending feeds <em>directly</em> into AD (it's the G component), unlike monetary policy which works indirectly through interest rates and must rely on households and firms to respond. Building a hospital puts money straight into construction workers' pockets. The multiplier then amplifies this: the 2020 furlough scheme kept consumer spending alive during lockdowns, preventing a much deeper recession.`,

          `<strong>Strength: targeting.</strong> Fiscal policy can be aimed precisely at vulnerable groups or sectors. Cutting taxes for low earners (who have a high MPC) generates a bigger multiplier than tax cuts for the wealthy (who save more). Regional investment can address geographic inequality. During COVID, sector-specific support (hospitality grants, self-employment income support) targeted those hardest hit.`,

          `<strong>Weakness: time lags.</strong> Fiscal policy is slow. The recognition lag (1–6 months to identify a downturn), legislative lag (months to pass a Budget), and implementation lag (months to years for infrastructure spending to hit the economy) mean fiscal stimulus often arrives too late. The UK's 2008 fiscal response was relatively fast by historical standards, but even so, the VAT cut took weeks to implement and infrastructure projects took years.`,

          `<strong>Weakness: crowding out and debt.</strong> Persistent deficits accumulate debt, and rising debt means rising interest payments that crowd out productive spending. If markets lose confidence in a government's fiscal sustainability, bond yields spike (as happened in the UK's September 2022 mini-budget), making borrowing more expensive and potentially triggering a crisis. The £100 billion+ annual interest bill constrains the UK government's ability to fund new programmes.`,

          `<div class="take-away"><div class="take-away-label">Take Away</div><p><strong>Weakness: political manipulation.</strong> Because fiscal policy is controlled by elected politicians, it's vulnerable to short-termism. Governments face strong incentives to cut taxes or boost spending before elections, regardless of economic conditions. The independence of the OBR (which provides independent forecasts) helps discipline fiscal policy, but ultimately the Chancellor decides. The strongest exam answers weigh fiscal policy's directness and targeting power against its slowness, debt risk, and political vulnerability.</p></div>`
        ]
      }
    ]
  },

  /* ── Block 2: Monetary Policy ────────────────────────── */
  {
    title: 'Monetary Policy',
    concepts: [
      {
        title: 'What is Monetary Policy?',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p><strong>Monetary policy</strong> is the use of <strong>interest rates</strong>, <strong>money supply</strong>, and related tools by the central bank to influence aggregate demand, inflation, and economic activity. In the UK, monetary policy is set by the <strong>Bank of England's Monetary Policy Committee (MPC)</strong>, which has been independent of government since 1997.</p></div>`,

          `The MPC's primary objective is to achieve the government's <strong>inflation target of 2% CPI</strong>. Subject to that, it also supports the government's economic objectives including growth and employment. The nine-member committee meets eight times a year and votes on the appropriate level of <strong>Bank Rate</strong> — the interest rate at which the Bank of England lends to commercial banks overnight. This rate ripples through the entire economy.`,

          `<strong>Independence</strong> is crucial. Before 1997, the Chancellor set interest rates, creating a temptation to keep rates low before elections (the political business cycle). Giving the Bank of England operational independence removed this temptation and anchored inflation expectations. Most advanced economies have followed this model — the ECB, the Fed, and the Bank of Japan all have varying degrees of independence.`,

          `<div class="flow-chain"><span class="pill blue">MPC assesses inflation outlook</span><span class="arrow">→</span><span class="pill blue">Sets Bank Rate</span><span class="arrow">→</span><span class="pill amber">Commercial banks adjust lending/saving rates</span><span class="arrow">→</span><span class="pill amber">Affects borrowing, spending, saving, exchange rate</span><span class="arrow">→</span><span class="pill pos">AD adjusts → inflation moves toward 2% target</span></div>`,

          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>Monetary policy's great advantage is <strong>speed and flexibility</strong>. The MPC can change rates within minutes of a decision, and markets respond immediately. Compare this with fiscal policy, where changes require legislation and take months to implement. This is why monetary policy is typically the "first responder" to economic shocks — the Bank of England slashed rates from 5% to 0.5% in just six months during the 2008–09 crisis.</p></div>`
        ]
      },
      {
        title: 'Interest Rate Transmission Mechanism',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>The <strong>transmission mechanism</strong> is the chain of cause and effect through which a change in Bank Rate affects the real economy. Understanding this chain — not just the start and end — is one of the most commonly tested topics in macroeconomics. The full mechanism has several distinct channels, and the exam rewards you for tracing each one explicitly.</p></div>`,

          `<div class="content-subhead">The Borrowing/Saving Channel</div>When the MPC <strong>cuts</strong> Bank Rate, commercial banks lower their lending rates (mortgages, business loans, credit cards) and savings rates. Lower borrowing costs encourage households to take out mortgages and spend on consumer goods, and firms to invest in new equipment and expansion. Lower savings rates reduce the reward for saving, nudging people toward spending instead. The reverse happens when rates rise — the 2022–23 rate hikes from 0.1% to 5.25% dramatically increased mortgage costs, with some homeowners seeing monthly payments double.`,

          `<div class="content-subhead">The Asset Price Channel</div>Lower interest rates tend to push up <strong>asset prices</strong> — houses, shares, bonds. For houses, lower mortgage rates increase affordability, raising demand and prices. Higher house prices create a <strong>wealth effect</strong>: homeowners feel richer and spend more confidently. The UK's QE programme after 2009 explicitly worked through this channel, pushing up bond and equity prices. The wealth effect is powerful but unequal — it benefits asset owners (typically older, wealthier households) more than renters and the young.`,

          `<div class="flow-chain"><span class="pill blue">MPC cuts Bank Rate</span><span class="arrow">→</span><span class="pill blue">Commercial rates fall</span><span class="arrow">→</span><span class="pill blue">Borrowing ↑, Saving ↓, Asset prices ↑, £ depreciates</span><span class="arrow">→</span><span class="pill amber">C ↑, I ↑, (X–M) ↑</span><span class="arrow">→</span><span class="pill pos">AD shifts right</span><span class="arrow">→</span><span class="pill amber">Output ↑, Price level ↑</span></div>`,

          `<div class="content-subhead">The Exchange Rate Channel</div>Lower UK interest rates make sterling-denominated assets less attractive to international investors (lower returns), reducing demand for sterling and causing it to <strong>depreciate</strong>. A weaker pound makes UK exports cheaper abroad and imports more expensive domestically, improving <strong>net exports (X–M)</strong> and boosting AD. When the Bank of England cut rates aggressively in 2008–09, sterling fell nearly 25%, significantly boosting export competitiveness.`,

          `<div class="content-subhead">The Confidence Channel</div>Rate cuts signal that the central bank is supporting the economy, which can <strong>boost business and consumer confidence</strong>. Conversely, rate hikes signal concern about overheating and can dampen animal spirits. This psychological channel is hard to quantify but can be powerful — the mere announcement of "whatever it takes" by ECB President Draghi in 2012 calmed markets without any actual policy change.`,

          `<div class="watch-out"><div class="watch-out-label">Common Mistake</div><p>The transmission mechanism has significant <strong>time lags</strong> — the Bank of England estimates 18–24 months for the full effect of a rate change to feed through to inflation. This means the MPC must be <strong>forward-looking</strong>, setting rates based on where inflation will be in two years, not where it is today. Students who skip links in the chain (jumping from "rates rise" to "inflation falls") lose marks — the examiner wants to see the full mechanism.</p></div>`,

          `<div class="take-away"><div class="take-away-label">Take Away</div><p>When explaining the transmission mechanism in exams, always give the <strong>full chain</strong>: Bank Rate change → commercial rate change → effect on borrowing/saving/assets/exchange rate → effect on C, I, X–M → effect on AD → effect on output and price level. Skipping links loses marks. Key limitations: when rates are near zero (the <strong>zero lower bound</strong>), there's little room to cut — hence QE. Rate changes also rely on banks <strong>passing them on</strong> to customers and on households actually <strong>responding</strong> — which depends on confidence and existing debt levels.</p></div>`
        ],
        examTip: `The transmission mechanism is one of the most commonly tested topics. When explaining it, always give the FULL chain: Bank Rate change → commercial rate change → effect on borrowing/saving/assets/exchange rate → effect on C, I, X-M → effect on AD → effect on output and price level. Students who skip links (jumping from "rates rise" to "inflation falls") lose marks because the examiner wants to see you understand the MECHANISM, not just the outcome.`
      },
      {
        title: 'Quantitative Easing (QE)',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p><strong>Quantitative easing (QE)</strong> is an unconventional monetary policy used when conventional interest rate cuts have reached their limit (the zero lower bound). The central bank <strong>creates new electronic money</strong> and uses it to buy financial assets — primarily government bonds — from banks and other financial institutions, injecting liquidity into the financial system.</p></div>`,

          `The Bank of England launched QE in March 2009, initially purchasing £75 billion in gilts. The programme expanded dramatically over the following decade, and by 2021 the Bank held over £895 billion in government bonds and corporate bonds. The US Federal Reserve's QE programme was even larger, eventually purchasing over $4.5 trillion in assets. The ECB launched its own version in 2015, buying over €2.6 trillion in bonds.`,

          `<div class="flow-chain"><span class="pill blue">Bank of England creates new money</span><span class="arrow">→</span><span class="pill blue">Buys government bonds from banks</span><span class="arrow">→</span><span class="pill amber">Bond prices ↑, yields ↓</span><span class="arrow">→</span><span class="pill amber">Banks have more reserves, lending ↑</span><span class="arrow">→</span><span class="pill pos">Asset prices ↑, borrowing costs ↓</span><span class="arrow">→</span><span class="pill pos">Spending &amp; investment ↑ → AD ↑</span></div>`,

          `QE works through several channels: by buying bonds, the Bank pushes <strong>bond prices up and yields (interest rates) down</strong>, reducing borrowing costs across the economy. Banks receiving cash from bond sales have more reserves to lend. Rising asset prices create a <strong>wealth effect</strong>. And the signal that the central bank is committed to supporting the economy boosts confidence.`,

          `<div class="content-subhead">Criticisms of QE</div>Critics raise serious concerns. QE disproportionately benefits <strong>asset owners</strong> (wealthier, older households) because it inflates property and share prices while doing little directly for those without assets — widening <strong>wealth inequality</strong>. The Bank of England itself acknowledged that QE boosted the wealth of the top 10% by far more than the bottom 10%. There are also concerns about <strong>moral hazard</strong> (markets expect central bank bailouts), <strong>asset bubbles</strong> (artificially inflated prices), and the difficulty of <strong>unwinding</strong> QE without disrupting markets.`,

          `<div class="take-away"><div class="take-away-label">Take Away</div><p>QE was born out of necessity — when rates hit zero and the economy still needed stimulus, central banks had to innovate. It probably prevented a 1930s-style depression after 2008. But it remains controversial: its distributional effects worsened inequality, it may have inflated asset bubbles, and the long-term consequences of central banks holding trillions in government debt are still unknown. For exams, present QE as <strong>effective but imperfect</strong> — and always mention the inequality critique.</p></div>`
        ]
      },
      {
        title: 'Strengths and Weaknesses of Monetary Policy',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>Monetary policy is typically the <strong>first-line tool</strong> for managing the business cycle — its speed, flexibility, and political independence make it the preferred instrument for fine-tuning aggregate demand. But it has significant limitations, particularly at the extremes.</p></div>`,

          `<strong>Strength: speed and flexibility.</strong> The MPC can change Bank Rate immediately, and financial markets respond within seconds. Compare this with fiscal policy, which requires legislative approval and takes months to implement. Rate changes are also easily reversible — if the MPC overshoots, it can adjust at the next meeting. This flexibility makes monetary policy the natural tool for responding to fast-moving economic developments.`,

          `<strong>Strength: political independence.</strong> Because the MPC operates independently of government, monetary policy is insulated from short-term political pressures. The MPC raised rates aggressively in 2022–23 despite the cost-of-living crisis and public pressure — something elected politicians might not have had the courage to do. Independence also anchors inflation expectations: if people believe the Bank will control inflation, they moderate wage demands, making the task easier (a self-fulfilling mechanism).`,

          `<strong>Weakness: time lags.</strong> Despite the speed of rate decisions, the <strong>real economy effects</strong> take 18–24 months to fully materialise. The MPC is essentially setting policy for an economy it can't yet observe. If conditions change between the decision and its full impact, the policy may prove inappropriate — too much stimulus or too much restraint.`,

          `<div class="take-away"><div class="take-away-label">Take Away</div><p><strong>Weakness: bluntness and the zero lower bound.</strong> Rate changes affect the <em>entire</em> economy — you can't target specific sectors or regions. And when rates approach zero, conventional monetary policy runs out of ammunition (the <strong>liquidity trap</strong>). QE extends the toolkit but has its own problems. Monetary policy also relies on transmission — if banks don't pass on rate cuts, or consumers are too frightened to borrow, the mechanism breaks down. This is why fiscal and monetary policy work best as <strong>complements</strong>, not substitutes.</p></div>`
        ]
      }
    ]
  },

  /* ── Block 3: Supply-Side Policies ───────────────────── */
  {
    title: 'Supply-Side Policies',
    concepts: [
      {
        title: 'What are Supply-Side Policies?',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p><strong>Supply-side policies</strong> aim to increase the economy's <strong>productive capacity</strong> — shifting the LRAS curve to the right — by improving the efficiency and quantity of factors of production. Unlike demand-side policies that boost spending, supply-side policies focus on enabling the economy to <em>produce more</em>.</p></div>`,

          `There are two broad categories. <strong>Market-based (free-market)</strong> supply-side policies work by removing barriers to efficient market operation — deregulation, tax reform, labour market flexibility, privatisation, trade liberalisation. <strong>Interventionist</strong> supply-side policies involve active government spending or direction — education and training, infrastructure, R&amp;D subsidies, healthcare, regional development.`,

          `The distinction matters politically and analytically. Market-based policies are associated with the political right (Thatcher, Reagan) and emphasise reducing the state's role. Interventionist policies are associated with the centre-left and emphasise strategic state investment. In practice, most successful economies use <strong>both</strong> — Singapore combines free trade and flexible labour markets (market-based) with massive government investment in education and infrastructure (interventionist).`,

          `<div class="flow-chain"><span class="pill blue">Supply-side policy implemented</span><span class="arrow">→</span><span class="pill blue">Factors of production improve (quality or quantity)</span><span class="arrow">→</span><span class="pill amber">Productive capacity rises</span><span class="arrow">→</span><span class="pill pos">LRAS shifts right</span><span class="arrow">→</span><span class="pill pos">Higher potential output, lower price level</span></div>`,

          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>Supply-side policies are unique because they offer the possibility of <strong>non-inflationary growth</strong> — more output without higher prices. No demand-side policy can achieve this when the economy is at capacity. But the trade-off is <strong>time</strong>: supply-side policies take years or decades to bear fruit, making them useless for addressing an immediate recession. The strongest exam answers present supply-side policies as essential for the long run but insufficient for short-run stabilisation.</p></div>`
        ]
      },
      {
        title: 'Market-Based Supply-Side Policies',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>Market-based supply-side policies aim to <strong>make markets work more efficiently</strong> by reducing government intervention, increasing competition, and strengthening incentives. The underlying philosophy: free markets, left to operate without excessive regulation, allocate resources most efficiently.</p></div>`,

          `<strong>Labour market deregulation</strong> reduces restrictions on hiring, firing, and wages to make the labour market more flexible. The UK's reforms under Thatcher (weakening trade union power via the 1980 and 1984 Employment Acts, abolishing wages councils) dramatically increased labour market flexibility. Proponents argue this reduced structural unemployment by making it easier for firms to hire; critics point to increased job insecurity, the rise of zero-hours contracts, and the erosion of worker bargaining power.`,

          `<strong>Income tax and corporation tax cuts</strong> aim to strengthen incentives to work, invest, and take entrepreneurial risks. The Laffer Curve theory suggests that beyond a certain point, lower tax rates can actually increase tax revenue by boosting economic activity. The UK's corporation tax cuts (from 28% in 2010 to 19% in 2017) were designed to attract inward investment. Ireland's 12.5% rate attracted tech giants (Apple, Google, Meta) to establish European headquarters there.`,

          `<strong>Deregulation</strong> reduces bureaucratic barriers to business activity. Simplifying planning laws, reducing red tape for start-ups, and streamlining environmental regulations can reduce costs and encourage enterprise. However, deregulation can go too far — the deregulation of the UK financial sector in the 1980s and 1990s contributed to the excessive risk-taking that caused the 2008 financial crisis. Getting the balance right is the challenge.`,

          `<strong>Privatisation</strong> transfers state-owned enterprises to the private sector, supposedly introducing the profit motive and competition that drive efficiency. The UK's privatisation programme under Thatcher (BT, British Gas, British Airways, water companies, railways) was the most ambitious in the developed world. Results were mixed: some privatisations clearly improved efficiency (BT, BA); others remain highly contested (railways, water — where private companies have been criticised for underinvestment, high prices, and sewage pollution).`,

          `<strong>Trade liberalisation</strong> — reducing tariffs and barriers to international trade — exposes domestic firms to competition, forcing them to become more efficient or exit. The EU single market gave UK firms access to 450 million consumers while subjecting them to competitive pressure from efficient European producers. Post-Brexit trade barriers have reduced this competitive stimulus — a supply-side cost of leaving the single market that many economists have highlighted.`
        ]
      },
      {
        title: 'Interventionist Supply-Side Policies',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>Interventionist supply-side policies involve <strong>active government investment</strong> to address <strong>market failures</strong> that prevent optimal private-sector outcomes. The justification: firms systematically underinvest in training (workers might leave), R&amp;D (knowledge spills over to competitors), and infrastructure (too expensive for individual firms).</p></div>`,

          `<strong>Education and training</strong> are the most widely supported interventionist policies. The UK spends over £100 billion annually on education. Specific initiatives include expanding university access, the Apprenticeship Levy (0.5% of payroll for large firms), and early years education (30 hours free childcare for working parents). The challenge: education takes years to produce results, and the link between spending and outcomes isn't automatic — <strong>Finland</strong> and <strong>South Korea</strong> outperform the UK despite different spending levels.`,

          `<strong>Infrastructure investment</strong> directly expands productive capacity by reducing transport costs and improving connectivity. Major UK projects like HS2 (now scaled back), broadband expansion, and 5G investment aim to close the gap with competitors. <strong>China's</strong> extraordinary infrastructure spending (over 8% of GDP for decades) facilitated rapid industrialisation. But infrastructure projects are expensive, take decades, and can suffer from cost overruns — HS2's budget ballooned from £33 billion to over £100 billion.`,

          `<strong>R&amp;D subsidies and industrial strategy</strong> address the positive externality of research — firms underinvest because they can't capture all benefits (knowledge spillovers). The UK offers R&amp;D tax credits worth over £7 billion annually. South Korea (Samsung, Hyundai) and Israel (the "Start-Up Nation") have used targeted industrial strategy to build world-class tech sectors. The risk: government may lack knowledge to "pick winners."`,

          `<strong>Healthcare investment</strong> improves labour productivity by keeping workers healthier and reducing absenteeism. The NHS serves as the UK's primary mechanism for workforce health. Preventive healthcare generates particularly high returns. Poor health costs the UK economy an estimated £100 billion annually.`,

          `<div class="take-away"><div class="take-away-label">Take Away</div><p><strong>Regional development policies</strong> aim to reduce geographic inequalities. The UK's regional productivity gap is among the widest in the developed world — London's output per worker is roughly double that of Wales or the North East. The "Levelling Up" agenda, enterprise zones, and devolution of powers to regional mayors aim to unlock this underused potential. The case for interventionist policies rests on <strong>market failures</strong>, but the counter-argument — <strong>government failure</strong> — is equally important for exam evaluation.</p></div>`
        ]
      },
      {
        title: 'Strengths and Weaknesses of Supply-Side Policies',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>Supply-side policies offer the tantalising promise of <strong>non-inflationary growth</strong> — more output without higher prices — but they come with significant limitations that must be honestly evaluated in any exam answer.</p></div>`,

          `<strong>Strength: non-inflationary growth.</strong> By shifting LRAS right, supply-side policies increase the economy's speed limit — allowing faster growth without inflationary penalty. More output <em>and</em> a lower price level. No demand-side policy can achieve this combination when the economy is near capacity, which is why supply-side policies are theoretically superior for long-run growth.`,

          `<strong>Strength: addressing root causes.</strong> Demand management treats symptoms (boosting spending when it's weak); supply-side policies tackle the underlying structural issues. The UK's "productivity puzzle" — poor productivity growth since 2008 — is fundamentally a supply-side problem requiring supply-side solutions. Better education, more investment, and smarter regulation address the cause, not just the symptom.`,

          `<strong>Weakness: time lags.</strong> Supply-side policies take <strong>years or decades</strong> to produce results. Investing in primary education today produces benefits only when children reach working age. Infrastructure takes 10–20 years from planning to completion. This makes supply-side policies politically unattractive and useless for dealing with an immediate recession.`,

          `<div class="take-away"><div class="take-away-label">Take Away</div><p><strong>Weakness: inequality and distributional effects.</strong> Market-based supply-side policies can worsen inequality — deregulation reduces worker security, tax cuts benefit higher earners, privatisation may raise prices for essentials. The Thatcher reforms improved efficiency but widened inequality (Gini coefficient: 0.25 in 1979 → 0.34 by 1990). <strong>Singapore</strong> and Ireland show supply-side success, but the strongest exam strategy is to argue that demand-side and supply-side policies are <em>complements, not substitutes</em>. An economy in recession needs demand stimulus NOW, but also needs supply-side reform for the long run.</p></div>`
        ],
        examTip: `When comparing supply-side policies with demand-side policies, the winning exam strategy is to argue they are <em>complements, not substitutes</em>. An economy in recession needs demand-side stimulus NOW (fiscal/monetary), but it also needs supply-side reform to raise its long-run growth potential. The best policy mix combines short-run demand management with long-run supply-side investment. This avoids the trap of arguing that one approach is universally "better" — examiners reward nuance, not dogmatism.`
      }
    ]
  },

  /* ── Block 4: Policy Conflicts and Trade-Offs ────────── */
  {
    title: 'Policy Conflicts and Trade-Offs',
    concepts: [
      {
        title: 'The Phillips Curve',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>The <strong>Phillips Curve</strong> originated from A.W. Phillips's 1958 study of UK data (1861–1957), which found a stable <strong>inverse relationship between unemployment and wage inflation</strong>. This was reinterpreted as a trade-off between unemployment and <em>price</em> inflation — giving policymakers an apparent menu of choices.</p></div>`,

          `The <strong>short-run Phillips Curve (SRPC)</strong> does show this trade-off. When unemployment is low, workers have bargaining power and demand higher wages; firms grant pay rises and pass costs on as higher prices. When unemployment is high, workers accept lower wages and inflation falls. The UK's 2022–2023 experience (historically low unemployment + high wage growth + high inflation) is consistent with SRPC logic.`,

          `<div class="flow-chain"><span class="pill pos">Low unemployment</span><span class="arrow">→</span><span class="pill blue">Workers have bargaining power</span><span class="arrow">→</span><span class="pill amber">Wages bid up</span><span class="arrow">→</span><span class="pill neg">Firms pass costs on as higher prices</span><span class="arrow">→</span><span class="pill neg">Inflation rises</span></div>`,

          `The story changed dramatically in the 1970s with <strong>stagflation</strong> — high inflation <em>and</em> high unemployment simultaneously. UK inflation hit 24% in 1975 while unemployment was rising. <strong>Milton Friedman</strong> and <strong>Edmund Phelps</strong> explained this: workers eventually adjust inflation <em>expectations</em> upward, and the short-run trade-off vanishes. Any attempt to keep unemployment permanently below the <strong>natural rate (NAIRU)</strong> requires ever-accelerating inflation.`,

          `The <strong>long-run Phillips Curve (LRPC)</strong> is therefore <strong>vertical</strong> at the natural rate of unemployment. In the long run, there is <em>no</em> trade-off. Monetary or fiscal expansion can temporarily push unemployment below NAIRU, but expectations adjust, wages rise, and unemployment drifts back. Sustained reductions in unemployment require <strong>supply-side policies</strong> that lower the natural rate itself.`,

          `The natural rate varies: <strong>Germany's</strong> NAIRU is around 3–4% (strong apprenticeship system, efficient labour markets); Spain's is perhaps 12–15% (rigid labour laws, skills mismatches); the UK's is estimated at 4–4.5%.`,

          `<div class="take-away"><div class="take-away-label">Take Away</div><p>For exams, the Phillips Curve frames policy trade-offs powerfully. When asked whether monetary expansion can reduce unemployment: the SRPC says "yes, temporarily" but the LRPC says "no, not permanently." When asked about the costs of reducing inflation, the SRPC shows the unemployment price (the "sacrifice ratio"). <strong>Always specify which Phillips Curve you're discussing</strong> — conflating the two is one of the most common and most penalised errors.</p></div>`
        ]
      },
      {
        title: 'Short-Run vs Long-Run Policy Effectiveness',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>Many policies that appear effective in the <strong>short run</strong> lose their potency — or even reverse their effects — over time. Distinguishing between short-run and long-run outcomes is what separates competent answers from outstanding ones, and examiners specifically reward this time-dimension analysis.</p></div>`,

          `<strong>Monetary policy</strong> is effective in the short run: cutting rates boosts borrowing, spending, and output with a 12–24 month lag. But in the long run, if stimulus pushes the economy beyond potential, the result is higher inflation at the same output level — money is "neutral" in the long run. The US Fed's aggressive rate cuts after the dot-com bust (2001–03) stimulated recovery but also contributed to the housing bubble that caused the <strong>2008 crisis</strong> — a short-run success storing up long-run problems.`,

          `<strong>Fiscal stimulus</strong> faces similar limitations. Government spending can fill a demand gap in the short run, but persistent deficits accumulate debt. <strong>Japan</strong> has run enormous deficits since the 1990s and now has debt exceeding 260% of GDP — leaving almost no fiscal space for future shocks.`,

          `<strong>Supply-side policies</strong> show the opposite pattern: often <em>painful</em> in the short run but powerful in the long run. The UK's <strong>Thatcher-era</strong> reforms caused severe short-run pain (unemployment peaked above 3 million in 1983) but contributed to sustained performance improvement through the 1990s and 2000s.`,

          `<div class="flow-chain"><span class="pill blue">Short run</span><span class="arrow">→</span><span class="pill pos">Monetary/fiscal stimulus effective</span><span class="arrow">→</span><span class="pill amber">But: may cause inflation, debt, bubbles over time</span></div>
<div class="flow-chain"><span class="pill blue">Long run</span><span class="arrow">→</span><span class="pill pos">Supply-side policies most effective</span><span class="arrow">→</span><span class="pill amber">But: slow, painful in short run, politically difficult</span></div>`,

          `<div class="take-away"><div class="take-away-label">Take Away</div><p>Structure your evaluation explicitly around time horizons: "In the short run, cutting rates boosts AD and reduces unemployment. In the long run, if the economy is already at potential, this simply generates inflation with no sustained reduction in unemployment (the LRPC is vertical). Therefore, a lasting reduction in unemployment requires supply-side policies that reduce the natural rate." This template — <strong>short-run effect → long-run limitation → supply-side solution</strong> — works for almost any macro policy question.</p></div>`
        ]
      },
      {
        title: 'Policy Conflicts',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>The central challenge of macroeconomic policy is that <strong>pursuing one objective often undermines another</strong>. These trade-offs intensify as the economy approaches full capacity and are the foundation of almost every macro evaluation question.</p></div>`,

          `<strong>Growth vs inflation</strong> dominates short-run policymaking. The Bank of England's 2022–2023 dilemma was textbook: the economy was slowing and households were squeezed by the cost-of-living crisis, but inflation exceeded 10%. Stimulating growth risked embedding inflation; fighting inflation risked deeper recession. The MPC prioritised inflation, raising rates to 5.25% — accepting the growth cost.`,

          `<strong>Inflation vs unemployment</strong> — each percentage point rise in UK unemployment represents roughly 300,000 people losing their livelihoods. Policymakers must weigh the <em>concentrated, visible</em> harm of job losses against the <em>diffuse, less visible</em> harm of inflation eroding everyone's purchasing power. This is fundamentally a political and moral choice, not just an economic one.`,

          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p><strong>Competitiveness vs exchange rate stability</strong> is another key conflict: a weaker currency makes exports competitive but raises import prices (increasing inflation). Sterling's post-Brexit depreciation helped UK manufacturers and tourism but raised prices for imported food, fuel, and goods. You can't have a weak currency for exports <em>and</em> a strong currency for cheap imports — use this as a concrete example when discussing policy trade-offs in essays.</p></div>`,

          `<div class="watch-out"><div class="watch-out-label">Common Mistake</div><p><strong>Short-run political objectives vs long-run stability</strong> is perhaps the deepest conflict. Governments facing elections have incentives to boost the economy now — tax cuts, spending increases — even if this stores up problems. The UK's September 2022 mini-budget (massive unfunded tax cuts triggering a sterling crash and gilt market crisis) demonstrated how short-termism can be punished even before an election. Don't treat policy conflicts as abstract theory — ground them in real examples.</p></div>`,

          `<div class="take-away"><div class="take-away-label">Take Away</div><p>The most sophisticated exam approach: argue that the <strong>severity of conflicts depends on the starting position</strong>. With a large negative output gap (deep recession), there's little conflict — expansionary policy boosts growth and cuts unemployment with minimal inflation risk. Conflicts intensify near full capacity. Stating that trade-offs are <strong>state-dependent, not absolute</strong> demonstrates the nuanced thinking that earns the highest marks.</p></div>
<div class="section-links"><span class="link">↗ 2.2 Aggregate Demand</span><span class="link">↗ 2.5 Economic Growth</span></div>`
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
    const cc = content.reduce((s, b) => s + (b.concepts?.length || 0), 0);
    const pc = content.reduce((s, b) =>
      s + (b.concepts || []).reduce((s2, c) => s2 + (c.points?.length || 0), 0), 0);
    const { error } = await supabase
      .from('section_content')
      .update({ data: content })
      .eq('section_id', id);
    if (error) console.log(`  ✗ ${id}: ${error.message}`);
    else console.log(`  ✓ ${id} — ${content.length} blocks, ${cc} concepts, ${pc} points`);
  }
  console.log('\nDone.');
}
main();
