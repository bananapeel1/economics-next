import { supabase } from './_db.mjs';

/* ═══════════════════════════════════════════════════════════
 *  REFORMAT — Unit 2 Part B  (rich visual HTML)
 *  Aggregate Supply + National Income
 * ═══════════════════════════════════════════════════════════ */

const CONTENT = {

/* ───────────────────────────────────────────────────────────
 *  AGGREGATE SUPPLY  (5 blocks, 14 concepts)
 * ─────────────────────────────────────────────────────────── */
'aggregate-supply': [

  /* ── Block 0 — Short-Run Aggregate Supply (SRAS) ─────── */
  {
    title: 'Short-Run Aggregate Supply (SRAS)',
    concepts: [
      {
        title: 'Definition of AS',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p><strong>Aggregate supply (AS)</strong> is the total quantity of goods and services all firms in an economy are willing and able to produce at each price level. It is the macroeconomic counterpart of the micro supply curve — but now the vertical axis shows the <strong>general price level</strong> and the horizontal axis shows <strong>real GDP</strong>.</p></div>`,
          `Why does aggregate supply matter so much? Because it determines an economy's capacity to deliver goods and services. You can have all the demand in the world, but if aggregate supply cannot keep up the result is <strong>inflation rather than real growth</strong>. The UK demonstrated this after the 2021–22 post-COVID recovery: demand bounced back sharply while supply chains were still broken, pushing CPI inflation above 11&nbsp;%.`,
          `The critical distinction is between <strong>short-run aggregate supply (SRAS)</strong> and <strong>long-run aggregate supply (LRAS)</strong>. In the short run some input prices — especially <strong>wages</strong> — are sticky, meaning they do not adjust immediately to changes in the price level. In the long run all input prices fully adjust, giving the LRAS curve a fundamentally different shape and meaning.`,
          `<div class="watch-out"><div class="watch-out-label">Common Mistake</div><p>Students often confuse a <strong>movement along</strong> the AS curve (caused by a change in the price level) with a <strong>shift</strong> of the AS curve (caused by a change in production costs or productive capacity). Keep this distinction razor-sharp — examiners specifically look for it.</p></div>`
        ]
      },
      {
        title: 'Shape of SRAS',
        points: [
          `The <strong>SRAS curve slopes upward</strong> from left to right. The logic is straightforward: when the general price level rises but wages and other input costs have not caught up, firms find it more profitable to produce more. Every extra unit sells at a higher price while costs remain roughly the same, so <strong>profit margins widen</strong> and output expands. This gap between rising output prices and sticky input costs is the entire reason the SRAS slopes upward.`,
          `Think about what happens at a UK factory when retail prices start climbing. Wage contracts were set months ago, rent is locked in for the year, and raw-material contracts have fixed delivery prices. Higher selling prices mean <strong>higher profit per unit</strong> — a powerful incentive to ramp up production by running extra shifts, calling in part-time workers, and pushing machinery harder. This is exactly why real GDP rises along the SRAS when the price level increases.`,
          `<div class="content-subhead">Why the SRAS gets steeper near full capacity</div>`,
          `Notice how the SRAS curve gets <strong>steeper as the economy approaches full capacity</strong>. When there is lots of spare capacity — high unemployment, idle factories — firms can expand output easily with little upward pressure on costs. But as the economy nears full employment, additional output becomes increasingly difficult: firms compete for scarce workers, overtime premiums kick in, and less efficient machinery is brought into service. Each extra unit of output requires a disproportionately larger rise in the price level.`,
          `<div class="flow-chain"><span class="pill blue">Spare capacity</span><span class="arrow">→</span><span class="pill pos">Easy output expansion</span><span class="arrow">→</span><span class="pill blue">Flat SRAS</span><span class="arrow">→</span><span class="pill neg">Capacity constraints</span><span class="arrow">→</span><span class="pill amber">Steep SRAS</span></div>`
        ]
      },
      {
        title: 'Factors Causing Shifts in SRAS',
        points: [
          `<div class="content-subhead">Wage rates</div>`,
          `<strong>Changes in wage rates</strong> are one of the most important SRAS shifters. If trade unions negotiate higher wages or a government raises the <strong>national minimum wage</strong> (as the UK did by 9.7&nbsp;% in April 2024), production costs rise across the board, shifting SRAS to the left. Conversely, wage moderation — as seen in Germany's Hartz&nbsp;IV labour-market reforms in the 2000s — can shift SRAS to the right by keeping unit labour costs down.`,
          `<div class="content-subhead">Raw materials &amp; energy</div>`,
          `<strong>Raw material and energy prices</strong> have a dramatic effect on SRAS. When global oil prices quadrupled during the 1973 OPEC embargo, SRAS shifted sharply left in virtually every industrialised economy, triggering <strong>stagflation</strong>. Similarly, the surge in European natural-gas prices after Russia's 2022 invasion of Ukraine pushed SRAS left across the eurozone.`,
          `<div class="flow-chain"><span class="pill neg">Oil / energy price spike</span><span class="arrow">→</span><span class="pill neg">Higher production costs</span><span class="arrow">→</span><span class="pill amber">SRAS shifts left</span><span class="arrow">→</span><span class="pill neg">Lower output, higher prices</span></div>`,
          `<div class="content-subhead">Exchange rates, taxes &amp; subsidies</div>`,
          `<strong>Exchange rate changes</strong> affect SRAS because many firms import raw materials and components. When sterling fell roughly 10&nbsp;% after the 2016 Brexit referendum, the cost of imported inputs surged, shifting UK SRAS to the left. A currency <strong>appreciation</strong> does the opposite. Meanwhile, increases in <strong>indirect taxes</strong> (VAT, carbon taxes) shift SRAS left, while <strong>government subsidies</strong> — such as the energy-bill support schemes introduced across Europe in 2022–23 — shift it to the right.`,
          `<div class="content-subhead">Supply-chain disruptions &amp; productivity</div>`,
          `<strong>Global supply-chain disruptions</strong> have become increasingly important SRAS shifters. The COVID-19 pandemic exposed how dependent modern production is on just-in-time global supply chains. When Chinese factories shut down and container-shipping costs rose tenfold in 2021, SRAS shifted left worldwide — not because domestic costs had changed, but because critical imported inputs were unavailable or far more expensive.`,
          `<strong>Changes in productivity</strong> can also shift SRAS even in the short run. If firms adopt better management practices or minor process improvements — without fundamentally expanding capacity — they can produce more at the same cost, shifting SRAS right. The UK's persistently low productivity growth since 2008 helps explain why its SRAS has not shifted right as fast as in the US.`,
          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>When analysing an SRAS shift, identify the <strong>specific cause</strong>, explain why it raises or lowers costs, show the shift on a correctly labelled diagram, and trace through the effects on the price level and real GDP. Don't just say "costs increased so SRAS shifted left" — explain <em>which</em> costs, <em>why</em> they changed, and quantify with a real-world example.</p></div>`
        ],
        examTip: `When analysing an SRAS shift, examiners want you to identify the specific cause, explain why it raises or lowers costs, show the shift on a correctly labelled diagram, and then trace through the effects on the price level and real GDP. Don't just say "costs increased so SRAS shifted left" — explain which costs, why they changed, and quantify with a real-world example if you can.`
      }
    ]
  },

  /* ── Block 1 — Long-Run Aggregate Supply (LRAS) ─────── */
  {
    title: 'Long-Run Aggregate Supply (LRAS)',
    concepts: [
      {
        title: 'Classical (Monetarist) View',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>The <strong>classical (monetarist) LRAS curve</strong> is <strong>perfectly vertical</strong> at the economy's full-employment output level (<strong>Y<sub>f</sub></strong>). In the long run all wages and prices fully adjust, so changes in the price level leave real output unchanged. The LRAS represents the economy's <strong>productive capacity</strong> — the maximum sustainable output given current labour, capital, technology, and institutions.</p></div>`,
          `Think of the vertical LRAS as the answer to the question "how much can this economy actually produce when all its resources are fully and efficiently employed?" No amount of price-level change can push output beyond this ceiling permanently. If the price level doubles, wages double too, so firms have no extra incentive to produce more — real costs and real profits are unchanged.`,
          `This carries a powerful <strong>policy implication</strong>: any attempt to boost GDP beyond Y<sub>f</sub> through demand-side stimulus will, in the long run, only raise the price level without increasing real output. Classical economists argue that demand management is ultimately futile for growth — it just generates inflation. The only way to increase long-run output is to shift LRAS itself to the right through <strong>supply-side policies</strong>.`,
          `The concept of the <strong>natural rate of unemployment</strong> is embedded in this model. At Y<sub>f</sub> the economy is not at zero unemployment — there is always frictional and structural unemployment. Milton Friedman estimated the US natural rate at around 4–6&nbsp;%, though it varies across countries and time periods.`,
          `<div class="flow-chain"><span class="pill blue">AD rises beyond Y<sub>f</sub></span><span class="arrow">→</span><span class="pill neg">Workers demand higher wages</span><span class="arrow">→</span><span class="pill neg">Costs rise</span><span class="arrow">→</span><span class="pill amber">SRAS shifts left</span><span class="arrow">→</span><span class="pill amber">Output returns to Y<sub>f</sub> at higher price level</span></div>`,
          `The position of the vertical LRAS line can shift over time. If an economy builds more capital, improves education, develops better technology, or reforms inefficient institutions, its productive capacity grows and LRAS shifts <strong>right</strong>. China's LRAS has shifted dramatically rightward over the past 30 years due to massive capital investment, urbanisation, and technological catch-up. This rightward shift is what economists mean by <strong>long-run economic growth</strong>.`
        ]
      },
      {
        title: 'Keynesian View',
        points: [
          `The <strong>Keynesian LRAS curve</strong> looks fundamentally different — it has <strong>three distinct sections</strong> rather than being a single vertical line. This shape reflects Keynes's belief that the economy can settle into equilibrium <em>below</em> full employment for extended periods, especially during deep recessions.`,
          `<div class="content-subhead">The horizontal (flat) section</div>`,
          `This represents a <strong>deep recession</strong> with massive spare capacity. Firms can increase output by rehiring idle workers and restarting mothballed machinery without any pressure on costs. Real GDP can grow with <strong>virtually no increase in the price level</strong>. The UK during the Great Depression of the 1930s, with unemployment above 20&nbsp;%, sat squarely in this flat region.`,
          `<div class="content-subhead">The upward-sloping middle section</div>`,
          `As more resources are employed, <strong>bottlenecks</strong> appear: skilled workers become scarce in certain sectors even while unemployment persists elsewhere, popular raw materials run short, and logistics networks become congested. Output can still grow, but now it comes with <strong>rising prices</strong>. Most real-world economies operate in this intermediate zone most of the time.`,
          `<div class="content-subhead">The vertical section</div>`,
          `This represents absolute <strong>full capacity</strong> — every worker employed, every machine running. Here the Keynesian LRAS looks identical to the classical version: no more output is physically possible regardless of the price level.`,
          `<div class="flow-chain"><span class="pill pos">Deep recession (flat LRAS)</span><span class="arrow">→</span><span class="pill blue">Demand stimulus boosts output, not prices</span><span class="arrow">→</span><span class="pill amber">Bottleneck zone (upward LRAS)</span><span class="arrow">→</span><span class="pill neg">Both output &amp; prices rise</span><span class="arrow">→</span><span class="pill neg">Full capacity (vertical LRAS)</span></div>`,
          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>A top-mark answer draws <strong>both</strong> the classical and Keynesian LRAS curves, explains the assumptions behind each, and evaluates which is more useful for the specific scenario. "It depends on the state of the economy" with supporting analysis is exactly what examiners reward. During the 2008–09 crisis the Keynesian model had more practical relevance; during the 2022 inflationary spike the classical model's warnings were more pertinent.</p></div>`
        ],
        examTip: `A top-mark answer will draw both the classical and Keynesian LRAS curves, explain the assumptions behind each, and then evaluate which is more useful for the specific scenario in the question. Saying "it depends on the state of the economy" with supporting analysis is exactly what examiners reward.`
      },
      {
        title: 'Factors Shifting LRAS',
        points: [
          `<div class="content-subhead">Technology</div>`,
          `<strong>Technological progress</strong> is the single most powerful driver of LRAS shifts. New technologies allow economies to produce more output from the same inputs. South Korea's investment in semiconductor technology through Samsung transformed it from a low-income economy in the 1960s to a high-income economy today. The development of AI and automation continues to shift advanced economies' LRAS rightward.`,
          `<div class="content-subhead">Labour quantity &amp; quality</div>`,
          `<strong>Immigration</strong> increases the labour force, shifting LRAS right — the UK's labour supply expanded significantly after EU enlargement in 2004 when Polish and other Eastern European workers arrived. <strong>Education and training</strong> improve human capital, making each worker more productive. Germany's dual apprenticeship system is often cited as a model that enhances human capital effectively.`,
          `<div class="content-subhead">Capital investment &amp; natural resources</div>`,
          `<strong>Capital investment</strong> — new factories, infrastructure, equipment — expands productive capacity. China invested roughly 45&nbsp;% of its GDP in fixed capital formation during its boom years, driving extraordinary LRAS expansion. <strong>Discovery of natural resources</strong> also shifts LRAS right — Norway's North Sea oil funded the world's largest sovereign wealth fund ($1.7&nbsp;trillion by 2024).`,
          `<div class="content-subhead">Institutions, enterprise &amp; infrastructure</div>`,
          `<strong>Institutional reforms</strong> can unlock productive potential. Deregulation, labour-market flexibility, stronger property rights, and reduced corruption improve the efficiency of resource allocation. New Zealand's sweeping 1980s reforms significantly shifted its LRAS rightward. <strong>Enterprise and entrepreneurship</strong> drive innovation — the United States' deep venture-capital ecosystem has been key to LRAS expansion, particularly in tech.`,
          `<strong>Infrastructure investment</strong> is sometimes overlooked but hugely important. Better transport, faster broadband, and reliable energy supply reduce costs and improve productivity economy-wide. Japan's bullet-train network, launched in 1964, boosted productivity by enabling faster movement of workers and goods.`,
          `<div class="content-subhead">Demographics</div>`,
          `<strong>Demographic changes</strong> affect LRAS over time. An ageing population — like Japan's, where over 29&nbsp;% are now over 65 — reduces the working-age population and shifts LRAS growth potential leftward unless offset by immigration, automation, or higher participation rates. Younger, growing populations like India's provide a <strong>demographic dividend</strong> that shifts LRAS rightward.`,
          `<div class="flow-chain"><span class="pill pos">Better technology / more capital / more labour</span><span class="arrow">→</span><span class="pill pos">Higher productive capacity</span><span class="arrow">→</span><span class="pill amber">LRAS shifts right</span><span class="arrow">→</span><span class="pill pos">Long-run economic growth</span></div>`,
          `<div class="take-away"><div class="take-away-label">Take Away</div><p>LRAS shifts represent changes in the economy's <strong>potential output</strong> — its speed limit. This is fundamentally different from an SRAS shift, which reflects short-run cost changes that may reverse quickly. When an exam question asks about long-run growth, you are always talking about rightward LRAS shifts driven by technology, capital, labour, or institutions.</p></div>`
        ]
      }
    ]
  },

  /* ── Block 2 — Macroeconomic Equilibrium ─────────────── */
  {
    title: 'Macroeconomic Equilibrium',
    concepts: [
      {
        title: 'Short-Run Equilibrium',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p><strong>Short-run macroeconomic equilibrium</strong> occurs where the <strong>AD curve intersects the SRAS curve</strong>. At this point, total quantity demanded equals total quantity supplied at the prevailing price level, giving an equilibrium price level (P<sub>1</sub>) and an equilibrium real GDP (Y<sub>1</sub>).</p></div>`,
          `This short-run equilibrium does <strong>not have to be at full employment</strong>. The economy can settle where real GDP is below the full-employment level (a <strong>negative output gap</strong> or deflationary gap), meaning there are unemployed resources. Alternatively, the economy can temporarily produce above its sustainable level (a <strong>positive output gap</strong> or inflationary gap), where firms are overworking labour and running machines beyond normal capacity.`,
          `If AD shifts right — say the government launches a large infrastructure programme — the equilibrium moves to a higher price level and higher real output. The UK's "Eat Out to Help Out" scheme in August 2020 was a targeted attempt to shift AD right in the hospitality sector.`,
          `If SRAS shifts left — say energy costs spike — the economy moves to a <strong>higher price level but lower real output</strong>, the dreaded combination of stagnation and inflation. This is exactly what happened across Europe in 2022 when Russian gas supplies were curtailed.`,
          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>Always follow a four-step process: (1) identify which curve shifts and why, (2) show the shift on your diagram, (3) identify the new equilibrium, (4) state what happens to both the price level and real GDP. This structured approach separates top-mark answers from vague ones.</p></div>`
        ]
      },
      {
        title: 'Long-Run Equilibrium',
        points: [
          `<strong>Long-run macroeconomic equilibrium</strong> occurs where <strong>AD, SRAS, and LRAS all intersect</strong> at the same point. In the classical model this means the economy is producing at Y<sub>f</sub> — there is no output gap and inflation is stable. All three curves pass through the same price level and real GDP.`,
          `In this equilibrium there is <strong>no tendency for wages to change</strong>. Firms are satisfied with output levels, and workers have no reason to demand higher wages. The economy sits at the <strong>natural rate of unemployment</strong> where the only unemployment is frictional and structural.`,
          `The Keynesian perspective adds a complication: long-run equilibrium might occur on the flat or upward-sloping portion of the Keynesian LRAS, meaning the economy can be in equilibrium <em>with</em> significant spare capacity and involuntary unemployment. Keynes's famous observation — "in the long run, we are all dead" — was his point that waiting for self-correction could cause enormous human suffering.`,
          `<div class="take-away"><div class="take-away-label">Take Away</div><p>In practice most economies <strong>fluctuate around</strong> long-run equilibrium rather than sitting at it. The <strong>business cycle</strong> describes these swings — periods where actual GDP is above potential (booms) and below potential (recessions). The goal of macroeconomic policy is to keep the economy as close to long-run equilibrium as possible.</p></div>`
        ]
      }
    ]
  },

  /* ── Block 3 — AD/AS Analysis of Macroeconomic Events ── */
  {
    title: 'AD/AS Analysis of Macroeconomic Events',
    concepts: [
      {
        title: 'Demand-Pull Inflation',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p><strong>Demand-pull inflation</strong> occurs when <strong>aggregate demand increases faster than aggregate supply can respond</strong>, pulling the price level upward. Picture it as "too much money chasing too few goods." AD shifts right and the economy moves up along the SRAS curve to a higher price level and higher real output.</p></div>`,
          `The intensity depends critically on <strong>where the economy sits on the SRAS curve</strong>. With significant spare capacity (flat section of the Keynesian LRAS) an AD increase mostly boosts output with little inflation — as in the early stages of the US post-2009 recovery. Near full capacity (steep section) the same AD increase produces mostly inflation with little extra output.`,
          `<div class="flow-chain"><span class="pill blue">Loose monetary / fiscal policy</span><span class="arrow">→</span><span class="pill blue">AD shifts right</span><span class="arrow">→</span><span class="pill neg">Demand outstrips supply</span><span class="arrow">→</span><span class="pill neg">Price level rises</span><span class="arrow">→</span><span class="pill amber">Demand-pull inflation</span></div>`,
          `A vivid example: the US pumped roughly $5&nbsp;trillion in fiscal stimulus during 2020–21 while the Federal Reserve held interest rates near zero. This massive AD expansion, combined with supply constraints from COVID, generated the highest inflation in 40 years — peaking at 9.1&nbsp;% in June 2022.`,
          `Demand-pull inflation typically <strong>reduces unemployment</strong> in the short run because higher demand encourages firms to hire. This creates a short-run trade-off between inflation and unemployment captured by the <strong>Phillips curve</strong>. But classical economists warn that this trade-off is temporary — eventually wages rise to match, SRAS shifts left, and the economy returns to Y<sub>f</sub> with just a higher price level.`
        ]
      },
      {
        title: 'Cost-Push Inflation',
        points: [
          `<strong>Cost-push inflation</strong> is driven by <strong>rising production costs</strong> rather than excess demand. When input costs increase — wages, raw materials, energy, imported components — the SRAS curve shifts left, pushing the price level up while simultaneously <strong>reducing</strong> real output. Instead of "too much spending" it is "too expensive to produce."`,
          `<div class="flow-chain"><span class="pill neg">Oil / input price shock</span><span class="arrow">→</span><span class="pill neg">SRAS shifts left</span><span class="arrow">→</span><span class="pill neg">Price level rises + output falls</span><span class="arrow">→</span><span class="pill amber">Stagflation</span></div>`,
          `The most dramatic examples involve <strong>oil price shocks</strong>. When OPEC quadrupled oil prices in 1973–74 the result was <strong>stagflation</strong> — inflation and unemployment rising simultaneously. The UK experienced inflation above 25&nbsp;% in 1975 while unemployment was rising sharply. The European energy crisis of 2022 was a modern replay.`,
          `The policy dilemma is acute. Expanding AD to restore output <strong>worsens inflation</strong>. Contracting AD to fight inflation <strong>deepens the recession</strong>. The ECB faced exactly this in 2022 — energy-driven inflation suggested tightening, but recession risk suggested easing. They ultimately chose to raise rates aggressively.`,
          `<strong>Wage-price spirals</strong> can make cost-push inflation self-sustaining. Prices rise, workers demand higher wages, higher wages push up costs, causing more price rises. The UK in the 1970s experienced a devastating spiral broken only by the painful monetary tightening of the early 1980s under Thatcher.`,
          `<div class="watch-out"><div class="watch-out-label">Common Mistake</div><p>Be careful to distinguish cost-push from demand-pull. <strong>Demand-pull</strong> comes with rising output and falling unemployment (AD shifts right along SRAS). <strong>Cost-push</strong> comes with falling output and rising unemployment (SRAS shifts left along AD). If the question describes rising commodity prices, it is cost-push; if it describes booming confidence or loose monetary policy, it is demand-pull.</p></div>`
        ]
      },
      {
        title: 'Economic Growth',
        points: [
          `<strong>Long-run economic growth</strong> is shown on the AD/AS model as a rightward shift of the <strong>LRAS curve</strong>. This represents a permanent expansion of the economy's <strong>productive capacity</strong> — the speed limit shifts outward. On the diagram Y<sub>f</sub> moves to the right, meaning the economy can produce more without generating inflationary pressure.`,
          `If both LRAS and AD shift rightward together (as in a healthy, growing economy), real GDP increases while the price level remains relatively stable — <strong>non-inflationary growth</strong>. China achieved something close to this for much of the 2000s: massive supply-side expansion accompanied by growing demand, delivering GDP growth above 10&nbsp;% with relatively contained inflation.`,
          `A rightward shift of LRAS <em>without</em> a corresponding AD shift puts <strong>downward pressure on the price level</strong>. This helps explain Japan's persistent deflation in the 1990s and 2000s: supply-side capacity was adequate, but chronically weak demand meant the economy operated below potential with falling prices.`,
          `<div class="flow-chain"><span class="pill pos">Supply-side policy succeeds</span><span class="arrow">→</span><span class="pill pos">LRAS shifts right</span><span class="arrow">→</span><span class="pill pos">Higher potential output</span><span class="arrow">→</span><span class="pill amber">Non-inflationary growth (if AD keeps pace)</span></div>`,
          `When evaluating policies for long-run growth, always ask: does the policy improve technology, increase the labour force, boost capital stock, or improve institutional efficiency? If yes, it shifts LRAS right and generates genuine long-run growth. If it only stimulates demand, it may boost short-run output but will not shift LRAS — and once the economy reaches capacity the result is inflation, not growth.`
        ]
      },
      {
        title: 'Recession',
        points: [
          `A <strong>recession</strong> in the AD/AS framework is shown as a leftward shift of AD that moves the economy to a new short-run equilibrium <strong>below full-employment output</strong>. Real GDP falls, unemployment rises, and the price level may fall or rise more slowly. The gap between actual output and full-employment output is the <strong>negative output gap</strong> (deflationary gap).`,
          `The 2008–09 <strong>Global Financial Crisis</strong> provides the clearest modern example. The collapse of Lehman Brothers triggered a massive leftward AD shift: banks stopped lending, consumer confidence collapsed, business investment froze, and exports plummeted. UK GDP fell by over 6&nbsp;% from peak to trough, and unemployment rose from 5.2&nbsp;% to 8.5&nbsp;%.`,
          `<div class="flow-chain"><span class="pill neg">Financial shock / demand collapse</span><span class="arrow">→</span><span class="pill neg">AD shifts left</span><span class="arrow">→</span><span class="pill neg">Output falls below Y<sub>f</sub></span><span class="arrow">→</span><span class="pill amber">Negative output gap + rising unemployment</span></div>`,
          `The consequences extend beyond unemployment. Firms operate below capacity, reducing profitability and discouraging investment. Tax revenues fall while spending on benefits rises automatically — these <strong>automatic stabilisers</strong> partially cushion the downturn but widen the government budget deficit.`,
          `Deflationary pressure accompanies a negative output gap because firms cut prices and unemployed workers accept lower wages. If deflation becomes <strong>entrenched</strong> — as in Japan's "Lost Decade" — it can create a vicious cycle where consumers delay purchases, firms reduce investment, and the recession deepens. This is why the Bank of England responded to 2008 with aggressive rate cuts and quantitative easing.`,
          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>When answering a recession question, always quantify the output gap if possible, explain both the demand-side cause and real-world consequences (unemployment, lost output, fiscal impact), and evaluate the policy options. Top answers also discuss whether the recession is <strong>demand-led</strong> (AD shifts left — 2008 crisis) or <strong>supply-led</strong> (SRAS shifts left — 1970s oil shocks), because the appropriate policy response differs.</p></div>`
        ],
        examTip: `When answering a question about recession, always quantify the output gap if you can, explain both the demand-side cause and the real-world consequences (unemployment, lost output, fiscal impact), and evaluate the policy options. Top answers will also discuss whether the recession is demand-led (AD shifts left — the 2008 financial crisis) or supply-led (SRAS shifts left — the 1970s oil shocks), because the appropriate policy response differs.`
      }
    ]
  },

  /* ── Block 4 — Short-Run vs Long-Run Adjustment ──────── */
  {
    title: 'Short-Run vs Long-Run Adjustment',
    concepts: [
      {
        title: 'Classical Self-Correcting Mechanism',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>The <strong>classical self-correcting mechanism</strong> holds that the economy will automatically return to full-employment output (Y<sub>f</sub>) without government intervention — you just have to wait for wages and prices to adjust. If AD pushes the economy above Y<sub>f</sub>, workers demand higher wages, costs rise, SRAS shifts left, and output returns to Y<sub>f</sub> at a higher price level.</p></div>`,
          `The mechanism works in reverse for a <strong>deflationary gap</strong>. If AD falls and output drops below Y<sub>f</sub>, unemployment rises. Classical theory says the excess supply of labour causes nominal wages to fall. Lower wages reduce costs, shifting SRAS rightward, which restores output to Y<sub>f</sub> at a lower price level.`,
          `<div class="flow-chain"><span class="pill neg">AD falls → output &lt; Y<sub>f</sub></span><span class="arrow">→</span><span class="pill blue">Unemployment rises</span><span class="arrow">→</span><span class="pill pos">Wages fall</span><span class="arrow">→</span><span class="pill pos">SRAS shifts right</span><span class="arrow">→</span><span class="pill amber">Economy returns to Y<sub>f</sub></span></div>`,
          `The speed of self-correction depends on <strong>wage and price flexibility</strong>. In economies with flexible labour markets (the US, with low unionisation and at-will employment) wages adjust faster and self-correction is quicker. In economies with rigid markets (France, with strong employment protection and powerful unions) wage adjustment is slower and the economy may remain away from Y<sub>f</sub> for longer.`,
          `The policy implication is profound: if the economy self-corrects, government intervention is <strong>unnecessary and potentially harmful</strong>. Stimulus spending might push the economy above Y<sub>f</sub> temporarily, but self-correction will bring it back — leaving only a higher price level as the permanent consequence. This is the core argument of classical and monetarist economists against activist demand management.`
        ]
      },
      {
        title: 'Keynesian Critique',
        points: [
          `Keynes's fundamental objection was that <strong>wages are sticky downward</strong> in the real world. Workers fiercely resist pay cuts — it feels like a personal loss and triggers resentment. Trade unions fight them. Minimum-wage laws prevent them. Even non-unionised firms avoid cuts because it destroys morale and drives away the best workers (the <strong>efficiency wage</strong> argument). So the key mechanism of classical self-correction — falling wages during a recession — simply does not happen fast enough.`,
          `<div class="flow-chain"><span class="pill neg">AD falls</span><span class="arrow">→</span><span class="pill neg">Firms cut jobs, not wages</span><span class="arrow">→</span><span class="pill neg">Persistent unemployment</span><span class="arrow">→</span><span class="pill amber">Economy stuck below Y<sub>f</sub></span></div>`,
          `Without downward wage flexibility, a fall in AD leads to <strong>persistent unemployment</strong> rather than self-correction. Firms cut jobs instead of wages. The economy gets stuck in a low-output <strong>unemployment equilibrium</strong> with no natural tendency to recover. This was precisely Keynes's explanation for the Great Depression, where the UK and US remained depressed for a decade without self-correcting.`,
          `Even if wages <em>do</em> eventually fall, Keynes argued this might make things <strong>worse, not better</strong>. Lower wages mean lower household income, which reduces consumption, which shifts AD further left — creating a <strong>deflationary spiral</strong>. Falling wages also increase the real burden of debt (deflation makes debts harder to repay), leading to more defaults and bank failures. Japan's deflation trap of the 1990s and 2000s illustrates this danger.`,
          `Keynes also identified the <strong>liquidity trap</strong>: when interest rates are already near zero they cannot fall further, so the classical adjustment mechanism through lower interest rates breaks down entirely. Japan hit this wall in the late 1990s, and the US, UK, and eurozone all hit it after 2008.`,
          `<div class="take-away"><div class="take-away-label">Take Away</div><p>The strongest exam answers do not pick a side but <strong>evaluate both views contextually</strong>. The classical self-correcting mechanism may work for mild downturns in economies with flexible markets — the US recovered from the 2001 recession relatively quickly. But for severe financial crises with liquidity traps and debt deflation, the Keynesian critique has much more explanatory power. The 2008 crisis convinced many previously classical economists that active government intervention was necessary.</p></div>`,
          `<div class="section-links"><span class="link">↗ 2.2 Aggregate Demand</span><span class="link">↗ 2.4 National Income</span></div>`
        ]
      }
    ]
  }
],


/* ───────────────────────────────────────────────────────────
 *  NATIONAL INCOME  (4 blocks, 11 concepts)
 * ─────────────────────────────────────────────────────────── */
'national-income': [

  /* ── Block 0 — The Circular Flow of Income ───────────── */
  {
    title: 'The Circular Flow of Income',
    concepts: [
      {
        title: 'Two-Sector Model',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>The <strong>circular flow of income</strong> shows how money flows continuously between sectors of an economy. In the simplest <strong>two-sector model</strong>, households supply factors of production (labour, land, capital, enterprise) to firms and receive <strong>factor incomes</strong> (wages, rent, interest, profit) in return. Households then spend this income on firms' output, completing the loop.</p></div>`,
          `The second loop runs in the opposite direction: households use their income to buy goods and services, so <strong>consumer spending (C)</strong> flows from households to firms. Firms receive this as revenue, which they use to pay for factors of production again. Money goes round and round — income becomes spending, spending becomes revenue, revenue becomes income again.`,
          `In this simplified world with no government, no saving, and no foreign trade, there is a clean result: <strong>total income = total output = total expenditure</strong>. This three-way identity — the <strong>national income identity</strong> — holds because every pound paid to a factor of production (income) is used to buy a pound's worth of output (expenditure). It is an accounting identity, not a theory.`,
          `<div class="flow-chain"><span class="pill blue">Households supply factors</span><span class="arrow">→</span><span class="pill pos">Firms pay factor incomes</span><span class="arrow">→</span><span class="pill blue">Households spend on goods</span><span class="arrow">→</span><span class="pill pos">Firms receive revenue</span><span class="arrow">→</span><span class="pill amber">Cycle repeats</span></div>`,
          `This identity gives us <strong>three equivalent ways to measure GDP</strong>: the income approach (add up all wages, rent, interest, profit), the output approach (add up value added by every industry), and the expenditure approach (add up all spending on final goods). In theory all three give the same answer; in practice the ONS publishes a statistical discrepancy adjustment.`,
          `A key insight: <strong>one person's spending is another person's income</strong>. When you buy a coffee, your expenditure becomes revenue for the cafe, which becomes wages for the barista, who spends those wages at a supermarket, and so on. This interconnectedness means a change in spending anywhere ripples outward — an insight that becomes critical when we study the multiplier.`,
          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>Don't dismiss the two-sector model as too simple. Examiners often ask you to start with the basic model and build complexity. Show you understand the national income identity (Y&nbsp;=&nbsp;O&nbsp;=&nbsp;E) and why it must hold, then extend to the three- and four-sector models.</p></div>`
        ],
        examTip: `Don't dismiss the two-sector model as "too simple to be useful." Examiners often ask you to start with the basic model and then build complexity. Show you understand the national income identity (Y = O = E) and why it must hold, then extend to the three- and four-sector models.`
      },
      {
        title: 'Three-Sector Model',
        points: [
          `The <strong>three-sector model</strong> adds the <strong>government</strong> to the circular flow. The government <strong>withdraws</strong> money through <strong>taxation (T)</strong> and <strong>injects</strong> money back through <strong>government spending (G)</strong>. Taxation includes income tax, National Insurance, corporation tax, VAT, and every other levy; government spending includes everything from NHS funding to road construction.`,
          `<strong>Taxation</strong> is a <strong>withdrawal (leakage)</strong> because it removes spending power from the circular flow. When the UK government takes 20&nbsp;% income tax plus employee NI from your pay, that money leaves the household–firm circuit and is no longer available for consumer spending.`,
          `<strong>Government spending</strong> is an <strong>injection</strong> because it adds new spending that did not come from the household–firm circuit. When the government builds a new hospital it pays construction workers (household income) and buys materials from firms (firm revenue). In 2023–24, UK government spending was around £1.2&nbsp;trillion — roughly 45&nbsp;% of GDP.`,
          `<div class="flow-chain"><span class="pill neg">Taxation (T)</span><span class="arrow">→</span><span class="pill neg">Withdrawal from flow</span><span class="arrow">→</span><span class="pill blue">Government</span><span class="arrow">→</span><span class="pill pos">Government spending (G)</span><span class="arrow">→</span><span class="pill pos">Injection into flow</span></div>`,
          `If <strong>G &gt; T</strong> the government runs a <strong>budget deficit</strong> — the injection exceeds the withdrawal, which is expansionary. If <strong>G &lt; T</strong> there is a <strong>budget surplus</strong> — contractionary. The UK has run deficits in almost every year since 2001, meaning government has been a net injector of spending.`,
          `Not all government spending is the same. <strong>Transfer payments</strong> (benefits, pensions) redistribute income to households who then spend it. <strong>Government consumption</strong> (paying nurses, teachers) directly employs factors of production. <strong>Government investment</strong> (infrastructure) creates physical capital. Each type enters the circular flow differently and the multiplier effect varies.`,
          `The three-sector model introduces the concept of <strong>fiscal policy</strong> — the government's deliberate use of taxation and spending to influence the economy. During 2008–09, the UK cut VAT from 17.5&nbsp;% to 15&nbsp;% and increased spending to inject more into the flow. During the post-COVID recovery, the government raised taxes (including the NI hike in April 2022) to address the deficit.`
        ]
      },
      {
        title: 'Four-Sector Model',
        points: [
          `The <strong>four-sector model</strong> adds the <strong>overseas sector</strong>. Now the economy interacts with the rest of the world through <strong>exports (X)</strong> — an injection — and <strong>imports (M)</strong> — a withdrawal. This is the most realistic version of the circular flow and the one you should use in most exam answers.`,
          `<strong>Exports</strong> are an <strong>injection</strong> because foreign buyers pump new spending into the domestic economy. When Rolls-Royce sells jet engines to Emirates, money flows from overseas into the UK circular flow. In 2023 UK exports totalled roughly £870&nbsp;billion.`,
          `<strong>Imports</strong> are a <strong>withdrawal</strong> because domestic spending leaks out to pay foreign producers. When a British consumer buys a Samsung phone made in Vietnam, that money leaves the UK circular flow. The UK imports around £900&nbsp;billion annually, meaning it runs a persistent <strong>trade deficit</strong> (M&nbsp;&gt;&nbsp;X).`,
          `<div class="flow-chain"><span class="pill pos">Exports (X) — injection</span><span class="arrow">→</span><span class="pill blue">Domestic circular flow</span><span class="arrow">→</span><span class="pill neg">Imports (M) — withdrawal</span></div>`,
          `The complete model now has three withdrawals — <strong>S, T, M</strong> — and three injections — <strong>I, G, X</strong>. When total injections equal total withdrawals (<strong>I + G + X = S + T + M</strong>) the economy is in equilibrium and national income is stable. If injections exceed withdrawals, national income rises; if withdrawals exceed injections, national income falls.`,
          `<div class="watch-out"><div class="watch-out-label">Common Mistake</div><p>A common mistake is drawing circular-flow arrows the wrong way. Injections (I,&nbsp;G,&nbsp;X) flow <strong>into</strong> the circular flow, increasing national income. Withdrawals (S,&nbsp;T,&nbsp;M) flow <strong>out</strong> of it. Always label your arrows clearly and, when the question describes a change (e.g. "exports fall"), trace the impact step by step.</p></div>`
        ],
        examTip: `A common mistake is drawing the circular flow with arrows going the wrong way. Remember: injections (I, G, X) flow INTO the circular flow, increasing national income. Withdrawals (S, T, M) flow OUT of it, reducing national income. Always label your arrows clearly, and if an exam question describes a change (e.g., "exports fall"), trace the impact through the model step by step.`
      }
    ]
  },

  /* ── Block 1 — Injections and Withdrawals ────────────── */
  {
    title: 'Injections and Withdrawals',
    concepts: [
      {
        title: 'Withdrawals (Leakages)',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p><strong>Withdrawals (leakages)</strong> are any income received by households that is <em>not</em> passed on as spending to domestic firms. The three types — <strong>saving (S)</strong>, <strong>taxation (T)</strong>, and <strong>imports (M)</strong> — each drain money from the circular flow and exert contractionary pressure on national income.</p></div>`,
          `<strong>Saving (S)</strong> occurs when households do not spend all their income. The <strong>marginal propensity to save (MPS)</strong> measures the fraction of each additional pound that is saved. If MPS = 0.10, for every extra £1 earned, 10p is saved and 90p is spent. The UK household savings ratio spiked above 25&nbsp;% during COVID lockdowns and fell back below 10&nbsp;% as life normalised.`,
          `<strong>Taxation (T)</strong> withdraws income before households can spend it. The <strong>marginal propensity to tax (MPT)</strong> measures the fraction of each extra pound lost to taxes. With 20&nbsp;% income tax plus 13.25&nbsp;% employee NI, the MPT from employment income is around 0.33 for a basic-rate taxpayer. Higher tax rates mean a larger leakage and, all else equal, a smaller multiplier.`,
          `<strong>Imports (M)</strong> divert spending to overseas producers. The <strong>marginal propensity to import (MPM)</strong> measures the fraction of each extra pound spent on imports. The UK has a relatively high MPM — from food and energy to cars and electronics, a significant chunk of any spending boost leaks abroad.`,
          `<div class="flow-chain"><span class="pill blue">Extra £100 income</span><span class="arrow">→</span><span class="pill neg">£10 saved (MPS 0.10)</span><span class="arrow">→</span><span class="pill neg">£30 taxed (MPT 0.30)</span><span class="arrow">→</span><span class="pill neg">£15 imports (MPM 0.15)</span><span class="arrow">→</span><span class="pill pos">Only £45 re-spent domestically</span></div>`,
          `These three marginal propensities combine into the <strong>marginal propensity to withdraw (MPW)</strong>, which determines how much of each extra pound leaks out. The MPW is critical because it determines the size of the multiplier — the larger the MPW, the smaller the multiplier and the weaker the impact of any injection on national income.`
        ],
        formula: 'MPW = MPS + MPT + MPM'
      },
      {
        title: 'Injections',
        points: [
          `<strong>Injections</strong> are spending that enters the circular flow from <em>outside</em> the household–firm loop. The three injections — <strong>investment (I)</strong>, <strong>government spending (G)</strong>, and <strong>exports (X)</strong> — each increase total spending and exert expansionary pressure on national income.`,
          `<div class="content-subhead">Investment (I)</div>`,
          `Spending by firms on <strong>capital goods</strong> — factories, machinery, technology, buildings. Financed by borrowing or retained profits. UK business investment was approximately £230&nbsp;billion in 2023. Investment is particularly important because it affects both <em>demand</em> (spending now) and <em>supply</em> (increasing capacity for the future).`,
          `<div class="content-subhead">Government spending (G)</div>`,
          `All public expenditure on goods and services, plus transfer payments. As an injection, G does not depend on current household income — it is a <strong>policy decision</strong>. This makes it a powerful counter-cyclical tool: when private spending collapses in a recession, the government can deliberately increase G to offset the decline.`,
          `<div class="content-subhead">Exports (X)</div>`,
          `Revenue from foreign buyers. Exports depend not on domestic income but on <strong>foreign income levels, exchange rates, and competitiveness</strong>. A booming world economy tends to help UK growth; a global recession hurts it.`,
          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>A critical insight: injections and withdrawals do not have to be equal <em>individually</em>. Investment need not equal saving; G need not equal T. What matters is that <strong>total</strong> injections equal total withdrawals for equilibrium: I&nbsp;+&nbsp;G&nbsp;+&nbsp;X&nbsp;=&nbsp;S&nbsp;+&nbsp;T&nbsp;+&nbsp;M. A government running a deficit can be offset by a trade surplus or an excess of saving over investment.</p></div>`
        ]
      },
      {
        title: 'Planned vs Actual',
        points: [
          `There is an important distinction between <strong>planned (ex ante)</strong> and <strong>actual (ex post)</strong> injections and withdrawals. <strong>Actual</strong> injections always equal actual withdrawals — this is an accounting identity that holds by definition. Any unplanned changes (like unsold stock piling up) are counted as "unplanned investment," which closes the gap.`,
          `<strong>Planned</strong> injections and withdrawals may <em>not</em> be equal. The mismatch between planned injections and planned withdrawals is what drives changes in national income. This is where the action is.`,
          `<div class="flow-chain"><span class="pill pos">Planned injections &gt; planned withdrawals</span><span class="arrow">→</span><span class="pill pos">Demand unexpectedly strong</span><span class="arrow">→</span><span class="pill pos">Firms increase output</span><span class="arrow">→</span><span class="pill amber">National income rises</span></div>`,
          `If <strong>planned withdrawals exceed planned injections</strong>, demand is weaker than expected — inventories pile up, firms cut output and lay off workers, and national income <strong>falls</strong>. This describes the early months of 2008–09: investment collapsed, exports plummeted, and injections fell far below withdrawals.`,
          `The economy adjusts through changes in national income until planned injections once again equal planned withdrawals. As income rises, induced withdrawals increase (more saving, more tax, more imports), gradually closing the gap. As income falls, induced withdrawals decrease. The economy settles at the level where planned injections equal planned withdrawals.`,
          `<div class="take-away"><div class="take-away-label">Take Away</div><p>It is the <strong>gap between planned injections and planned withdrawals</strong> that creates economic momentum — expansion or contraction. The economy does not sit still when these are out of balance; it adjusts through output and employment changes until they are brought into line. Understanding this <strong>adjustment process</strong> — not just the equilibrium condition — is what earns top marks.</p></div>`
        ],
        examTip: `When examiners ask about equilibrium national income, they want you to explain the adjustment process, not just state the equilibrium condition. Describe what happens to firms' inventories, output decisions, and employment when planned injections don't equal planned withdrawals. This dynamic explanation is what separates a basic answer from a top-mark one.`
      }
    ]
  },

  /* ── Block 2 — Equilibrium National Income ───────────── */
  {
    title: 'Equilibrium National Income',
    concepts: [
      {
        title: 'Determining Equilibrium',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p><strong>Equilibrium national income</strong> is the level of real GDP at which <strong>total planned injections equal total planned withdrawals</strong>. At this point the circular flow is in balance: spending entering the economy (I,&nbsp;G,&nbsp;X) exactly matches income leaking out (S,&nbsp;T,&nbsp;M). There is no tendency for national income to rise or fall.</p></div>`,
          `Visualise this on a diagram with national income (Y) on the horizontal axis and injections / withdrawals on the vertical axis. The injections line is roughly <strong>horizontal</strong> (autonomous). The withdrawals line is <strong>upward-sloping</strong> (induced — S, T, and M all rise with income). Equilibrium is where the two lines <strong>intersect</strong>.`,
          `<div class="flow-chain"><span class="pill blue">Income below equilibrium</span><span class="arrow">→</span><span class="pill pos">Injections &gt; withdrawals</span><span class="arrow">→</span><span class="pill pos">Firms expand output</span><span class="arrow">→</span><span class="pill amber">Income rises toward equilibrium</span></div>`,
          `If the economy is to the <strong>right</strong> of equilibrium, planned withdrawals exceed planned injections. Demand is weaker than expected, inventories build up, and firms cut production. Income falls until the economy settles back at equilibrium.`,
          `An important implication: equilibrium national income is <strong>not necessarily the socially desirable level</strong>. The economy can be in equilibrium with high unemployment (a deflationary gap) or with inflationary pressure. Keynes's great insight was that equilibrium can exist below full employment — justifying government intervention to shift injections or withdrawals.`,
          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>The 2020 COVID recession illustrates this. Planned withdrawals (especially saving — the savings ratio surged) massively exceeded planned injections (investment collapsed). National income fell until the government intervened with enormous fiscal injections (the furlough scheme cost £70&nbsp;billion alone) to push injections above withdrawals and start the recovery.</p></div>`
        ],
        formula: 'Equilibrium: I + G + X = S + T + M'
      },
      {
        title: 'Effects of Changes',
        points: [
          `When an injection <strong>increases</strong> — say the government announces a £50&nbsp;billion infrastructure programme — the injections line shifts upward. At the old national income, injections exceed withdrawals. The economy expands until induced withdrawals have increased enough to match. The new equilibrium is at a <strong>higher level of national income</strong>.`,
          `When a withdrawal <strong>increases</strong> — say the government raises income tax — the withdrawals line shifts upward. At the old national income, withdrawals exceed injections. Firms face weaker demand, cut output, and lay off workers. The new equilibrium is at a <strong>lower level of national income</strong>. The UK's post-2010 austerity programme illustrates this: spending cuts and tax rises contributed to a sluggish recovery.`,
          `The change in equilibrium national income is <strong>larger than the initial change</strong> in injections or withdrawals. This is the <strong>multiplier effect</strong>. A £50&nbsp;billion injection does not just raise income by £50&nbsp;billion — the construction workers spend wages in shops, shopkeepers spend in services, and so on. The total impact is a <em>multiple</em> of the initial injection.`,
          `<div class="flow-chain"><span class="pill pos">↑ Government spending</span><span class="arrow">→</span><span class="pill pos">Injections &gt; withdrawals</span><span class="arrow">→</span><span class="pill pos">Firms expand, hire</span><span class="arrow">→</span><span class="pill pos">Income rises</span><span class="arrow">→</span><span class="pill amber">Induced W rises → new equilibrium</span></div>`,
          `<strong>Simultaneous changes</strong> can occur. If the government increases spending but finances it with equal tax rises, the effects partially offset — though not completely, due to the <strong>balanced budget multiplier</strong>. The government spends every pound of G, but households would have saved part of every pound taken in tax, so the net effect is still slightly expansionary.`,
          `<div class="take-away"><div class="take-away-label">Take Away</div><p>The <strong>composition of changes matters</strong>, not just the total. Investment adds to the capital stock and shifts LRAS right, producing both short-run and long-run growth. Transfer payments boost consumption but may not expand capacity. A rise in saving is contractionary short-run but provides funds for investment long-run — the famous <strong>paradox of thrift</strong>.</p></div>`
        ]
      }
    ]
  },

  /* ── Block 3 — The Multiplier and National Income ────── */
  {
    title: 'The Multiplier and National Income',
    concepts: [
      {
        title: 'Multiplier Concept',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>The <strong>multiplier</strong> describes how an initial change in spending (an injection) generates a <strong>larger final change in national income</strong> through successive rounds of re-spending. When the government spends £1&nbsp;billion on a railway, construction workers spend their income, shopkeepers spend theirs, and each round creates new income — producing a total effect that is a <em>multiple</em> of the original injection.</p></div>`,
          `The size depends on the <strong>marginal propensity to withdraw (MPW)</strong>. The larger the proportion of each pound that leaks out as saving, tax, or imports, the weaker the multiplier. If MPW&nbsp;=&nbsp;0.5, the multiplier is 1&nbsp;/&nbsp;0.5&nbsp;=&nbsp;2. An initial £1&nbsp;billion injection produces a £2&nbsp;billion increase in national income. If MPW&nbsp;=&nbsp;0.8, the multiplier is only 1.25.`,
          `<div class="flow-chain"><span class="pill pos">£10bn govt spending</span><span class="arrow">→</span><span class="pill pos">Round 1: £10bn income</span><span class="arrow">→</span><span class="pill neg">Leakages (MPW 0.5)</span><span class="arrow">→</span><span class="pill pos">Round 2: £5bn</span><span class="arrow">→</span><span class="pill pos">Round 3: £2.5bn</span><span class="arrow">→</span><span class="pill amber">Total: £20bn (k = 2)</span></div>`,
          `You can also express the multiplier using the <strong>marginal propensity to consume (MPC)</strong>: k&nbsp;=&nbsp;1&nbsp;/&nbsp;(1&nbsp;-&nbsp;MPC). If MPC&nbsp;=&nbsp;0.6, the multiplier is 1&nbsp;/&nbsp;0.4&nbsp;=&nbsp;2.5. The higher the domestic spending rate, the larger the multiplier.`,
          `The multiplier works in <strong>both directions</strong>. A reduction in injections produces a <strong>multiplied contraction</strong>. If firms cut investment by £5&nbsp;billion and the multiplier is 2, national income falls by £10&nbsp;billion. This is why recessions can be so severe — the 2008 financial crisis demonstrated this brutally as the initial banking shock cascaded through successive spending rounds.`,
          `<div class="watch-out"><div class="watch-out-label">Common Mistake</div><p>The multiplier does not happen instantaneously. Each round of spending takes time — the process may unfold over <strong>12–18 months</strong>. Policy makers must account for these time lags. By the time the full multiplier has worked through, economic conditions may have changed — one reason fiscal policy is sometimes called a blunt instrument.</p></div>`
        ],
        examTip: `Calculations are common in multiplier questions. Make sure you can work both ways: from the MPW to the multiplier (k = 1/MPW), and from the multiplier to the final change in income (ΔY = k × Δinjection). Also be ready to explain why the multiplier might be smaller in practice than in theory — leakages tend to be larger than simple models assume, and there may be crowding-out effects if government borrowing raises interest rates.`,
        formulas: [
          'Multiplier (k) = 1 / MPW = 1 / (MPS + MPT + MPM)',
          'Multiplier (k) = 1 / (1 - MPC)',
          'Change in Y = k x Change in injection'
        ]
      },
      {
        title: 'Factors Affecting Multiplier Size',
        points: [
          `<div class="content-subhead">Marginal propensity to save (MPS)</div>`,
          `Economies where households save a large fraction of additional income have smaller multipliers. Japan's historically high savings rate (25–30&nbsp;% in the 1980s) partly explains why fiscal stimulus there had a weaker-than-expected impact. The US, with a lower savings rate, tends to have a larger consumption-driven multiplier.`,
          `<div class="content-subhead">Marginal rate of taxation (MPT)</div>`,
          `Countries with high marginal tax rates — Scandinavian nations where marginal income tax can exceed 50&nbsp;% — have smaller multipliers because a larger chunk of each income round is captured by the government. However, this also means <strong>automatic stabilisers</strong> are stronger: during a recession, tax revenues fall sharply, partially cushioning the downturn.`,
          `<div class="content-subhead">Marginal propensity to import (MPM)</div>`,
          `Particularly important for small, open economies. Singapore, with imports exceeding 150&nbsp;% of GDP, has an extremely high MPM and therefore a very small domestic multiplier — fiscal stimulus there largely benefits Singapore's trading partners. The US retains more spending domestically and has a larger multiplier.`,
          `<div class="content-subhead">Confidence, crowding out &amp; the state of the economy</div>`,
          `<strong>Consumer and business confidence</strong> affect the multiplier in practice. If households are anxious (as during 2008) they may save more — MPS rises, reducing the multiplier. Keynes called this the <strong>paradox of thrift</strong>. <strong>Crowding out</strong> can also reduce the multiplier: if government borrowing raises interest rates, it discourages private investment and consumption.`,
          `The <strong>state of the economy</strong> matters enormously. With significant spare capacity the multiplier tends to be larger because extra spending leads to real output increases rather than price rises. Near full capacity extra demand mostly generates inflation. IMF research finds fiscal multipliers during recessions can be 1.5 to 2 times larger than during booms.`,
          `<div class="flow-chain"><span class="pill neg">High MPS + High MPT + High MPM</span><span class="arrow">→</span><span class="pill neg">Large MPW</span><span class="arrow">→</span><span class="pill amber">Small multiplier</span></div>`,
          `<strong>Time lags</strong> also matter. The multiplier unfolds over many months. If the economy's circumstances change during this period, later rounds may add to inflationary pressure rather than usefully boosting output. This is why governments prefer <strong>"shovel-ready" projects</strong> — infrastructure investments that can begin immediately, front-loading the multiplier effect when it is most needed.`
        ]
      },
      {
        title: 'Circular Flow and AD',
        points: [
          `The circular flow model and <strong>aggregate demand (AD)</strong> are two sides of the same coin. AD is simply total spending viewed from the expenditure side of the circular flow. The equation <strong>AD = C + I + G + (X - M)</strong> maps directly onto it: C is spending within the household–firm loop, I, G, and X are the three injections, and M is subtracted because it is a leakage to foreign producers.`,
          `When total injections increase, AD shifts <strong>right</strong>. The multiplier amplifies this: an initial rightward shift of £10&nbsp;billion, with k&nbsp;=&nbsp;2, produces a total shift of £20&nbsp;billion. This is how changes in the circular flow translate directly into AD/AS analysis — the two frameworks are complementary, not competing.`,
          `When total withdrawals increase, AD shifts <strong>left</strong>. The UK's 2010 austerity programme — deep spending cuts plus tax rises — shifted AD sharply left. The multiplier amplified the contractionary effect, producing a sluggish recovery that many economists attributed to the multiplied impact of fiscal consolidation.`,
          `<div class="flow-chain"><span class="pill pos">↑ Injection</span><span class="arrow">→</span><span class="pill pos">AD shifts right</span><span class="arrow">→</span><span class="pill pos">Multiplier amplifies</span><span class="arrow">→</span><span class="pill amber">Higher real GDP (if spare capacity)</span></div>`,
          `Understanding the circular flow also clarifies why recessions can be <strong>self-reinforcing</strong>. When income falls, consumption also falls, reducing the income of others. The negative multiplier amplifies the initial shock. This is why Keynes argued so strongly for government intervention: without a deliberate injection to break the cycle, the economy can spiral downward.`,
          `<div class="take-away"><div class="take-away-label">Take Away</div><p>For your exams, move fluently between the circular flow and the AD/AS diagram. Use the circular flow to explain <em>why</em> AD shifts (which injection or withdrawal changed), use the multiplier to calculate <em>how much</em> AD shifts, and use the AD/AS diagram to show the final impact on the <strong>price level and real GDP</strong>. Linking these three frameworks in your essays demonstrates the deep understanding that earns top marks.</p></div>`,
          `<div class="section-links"><span class="link">↗ 2.2 Aggregate Demand</span><span class="link">↗ 2.5 Economic Growth</span></div>`
        ],
        formula: 'AD = C + I + G + (X - M)'
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
