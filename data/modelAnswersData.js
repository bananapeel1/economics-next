/* ─── Model Answers Data ─── */

export const MODEL_ANSWERS = [

  // ══════════════════════════════════════
  // ECONOMICS
  // ══════════════════════════════════════

  // ── 1.3.1 Introductory Concepts — 4 marks ──
  {
    id: 'scarcity-opportunity-cost-4',
    subject: 'economics',
    unit: 1,
    sectionNumber: '1.3.1',
    sectionTitle: 'Introductory Concepts',
    marks: 4,
    type: 'Knowledge & Application',
    commandWord: 'Explain',
    question: 'Explain what is meant by scarcity and opportunity cost.',
    markScheme: [
      { range: '1–2 marks', desc: 'Definition of scarcity (unlimited wants, limited/finite resources)' },
      { range: '3–4 marks', desc: 'Definition and application of opportunity cost (next best alternative forgone with example)' },
    ],
    peel: null,
    answerParagraphs: [
      {
        label: null,
        html: '<strong>Scarcity</strong> is the <strong>fundamental economic problem</strong> — it arises because human wants are <strong>unlimited</strong>, yet the resources available to satisfy those wants are <strong>finite</strong>. <span class="ma-ann ma-ann-blue">K</span> Because resources (land, labour, capital, enterprise) are scarce relative to wants, societies must make <strong>choices</strong> about how to allocate them. <span class="ma-ann ma-ann-blue">K</span><br><br><strong>Opportunity cost</strong> is the <strong>next best alternative forgone</strong> when a choice is made. <span class="ma-ann ma-ann-blue">K</span> For example, if the UK government chooses to spend £50bn on the HS2 rail project, the opportunity cost is the <strong>hospitals, schools, or tax cuts</strong> that money could have funded instead. <span class="ma-ann ma-ann-amber">A</span> Opportunity cost exists because of scarcity — if resources were unlimited, choosing one option would not require giving up another. <span class="ma-ann ma-ann-amber">A</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge/Definition', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
    ],
    examinerCommentary: 'Both terms must be defined precisely. Scarcity must reference the tension between unlimited wants and limited resources — not simply "things are rare." Opportunity cost must include "next best alternative forgone," not just "what you give up." The HS2 example grounds the answer in a real-world context, earning the application marks that push into the top band.',
    likelyScore: '4 / 4',
  },

  // ── 1.3.2 Consumer Behaviour & Demand — 4 marks ──
  {
    id: 'ped-firms-4',
    subject: 'economics',
    unit: 1,
    sectionNumber: '1.3.2',
    sectionTitle: 'Consumer Behaviour & Demand',
    marks: 4,
    type: 'Knowledge & Application',
    commandWord: 'Explain',
    question: 'Explain what is meant by price elasticity of demand (PED) and why it is important to a firm.',
    markScheme: [
      { range: '1–2 marks', desc: 'Definition of PED (responsiveness of quantity demanded to a change in price)' },
      { range: '3–4 marks', desc: 'Application to firm\'s decision-making (pricing strategy, revenue implications)' },
    ],
    peel: null,
    answerParagraphs: [
      {
        label: null,
        html: '<strong>Price elasticity of demand (PED)</strong> measures the <strong>responsiveness of quantity demanded</strong> to a change in price. <span class="ma-ann ma-ann-blue">K</span> It is calculated as the percentage change in quantity demanded divided by the percentage change in price. If PED > 1, demand is <strong>price elastic</strong>; if PED < 1, demand is <strong>price inelastic</strong>. <span class="ma-ann ma-ann-blue">K</span><br><br>PED is important to firms because it determines the impact of a price change on <strong>total revenue</strong>. <span class="ma-ann ma-ann-amber">A</span> For example, if a firm sells a product with inelastic demand (e.g. insulin), it can <strong>raise prices and increase revenue</strong> because the fall in quantity demanded will be proportionally smaller than the price rise. Conversely, a firm selling a product with elastic demand (e.g. a branded chocolate bar with many substitutes) would <strong>lose revenue</strong> by raising prices, as consumers would switch to alternatives. <span class="ma-ann ma-ann-amber">A</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge/Definition', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
    ],
    examinerCommentary: 'Full marks require a clear formula or verbal definition of PED <em>and</em> an explanation of why it matters to a firm — typically through its link to total revenue. Examiners reward candidates who distinguish between elastic and inelastic demand with concrete examples rather than just stating the definition.',
    likelyScore: '4 / 4',
  },

  // ── 1.3.3 Supply — 4 marks ──
  {
    id: 'pes-factors-4',
    subject: 'economics',
    unit: 1,
    sectionNumber: '1.3.3',
    sectionTitle: 'Supply',
    marks: 4,
    type: 'Knowledge & Application',
    commandWord: 'Explain',
    question: 'Explain what is meant by price elasticity of supply (PES) and identify two factors that affect it.',
    markScheme: [
      { range: '1–2 marks', desc: 'Definition of PES (responsiveness of quantity supplied to a change in price)' },
      { range: '3–4 marks', desc: 'Two factors identified and briefly developed' },
    ],
    peel: null,
    answerParagraphs: [
      {
        label: null,
        html: '<strong>Price elasticity of supply (PES)</strong> measures the <strong>responsiveness of quantity supplied</strong> to a change in price. <span class="ma-ann ma-ann-blue">K</span> It is calculated as the percentage change in quantity supplied divided by the percentage change in price. If PES > 1, supply is <strong>elastic</strong>; if PES < 1, supply is <strong>inelastic</strong>. <span class="ma-ann ma-ann-blue">K</span><br><br>One factor affecting PES is the <strong>availability of spare capacity</strong>. <span class="ma-ann ma-ann-amber">A</span> Firms with excess capacity (e.g. unused machinery or factory space) can increase output quickly in response to a price rise, making supply more elastic. Conversely, a firm operating at full capacity would struggle to expand output in the short term. <span class="ma-ann ma-ann-amber">A</span><br><br>A second factor is the <strong>time period</strong>. <span class="ma-ann ma-ann-amber">A</span> In the <strong>short run</strong>, supply tends to be inelastic because it takes time to hire additional workers, source raw materials, or build new production facilities. In the <strong>long run</strong>, firms can adjust all factors of production, making supply more elastic. <span class="ma-ann ma-ann-amber">A</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge/Definition', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
    ],
    examinerCommentary: 'Full marks require a clear definition of PES (not just "how supply changes") and two distinct, developed factors. Candidates who simply list factors without explaining <em>how</em> they affect PES will only reach 2–3 marks. The distinction between short run and long run is a reliable factor that examiners accept.',
    likelyScore: '4 / 4',
  },

  // ── 1.3.3 Supply — 8 marks ──
  {
    id: 'supply-shift-8',
    subject: 'economics',
    unit: 1,
    sectionNumber: '1.3.3',
    sectionTitle: 'Supply',
    marks: 8,
    type: 'Analysis',
    commandWord: 'Analyse',
    question: 'Analyse the effects of a fall in the cost of raw materials on a market.',
    markScheme: [
      { range: '1–2 marks', desc: 'Knowledge: definition of supply and/or factors affecting supply' },
      { range: '3–4 marks', desc: 'Application: mechanism explained (lower costs → supply shifts right)' },
      { range: '5–8 marks', desc: 'Analysis: developed chain — new equilibrium, lower price, higher quantity, impact on firms/consumers' },
    ],
    peel: {
      point: 'A fall in raw material costs shifts the supply curve to the right.',
      evidence: 'E.g. a fall in oil prices reduces production costs for plastics manufacturers.',
      explain: 'At each price level, firms can now produce more profitably → supply shifts right → new equilibrium with lower price and higher quantity.',
      link: 'Consumers benefit from lower prices, firms may see higher revenue if demand is elastic, but profit impact depends on the extent of cost savings versus the price fall.',
    },
    answerParagraphs: [
      {
        label: 'Para 1',
        html: '<strong>Supply</strong> is the quantity of a good or service that producers are willing and able to offer for sale at each price level in a given time period. <span class="ma-ann ma-ann-blue">K</span> A key <strong>non-price determinant of supply</strong> is the cost of production — when costs fall, supply increases. <span class="ma-ann ma-ann-blue">K</span>',
      },
      {
        label: 'Para 2',
        html: 'A fall in the cost of raw materials — for example, a decline in global <strong>oil prices</strong> reducing production costs for plastics manufacturers — means that at every given price, firms can produce more profitably. <span class="ma-ann ma-ann-amber">A</span> This causes the <strong>supply curve to shift rightward</strong> from S₁ to S₂. <span class="ma-ann ma-ann-purple">D</span> At the original price, there is now <strong>excess supply</strong>, which puts downward pressure on the market price. The market moves to a <strong>new equilibrium</strong> with a <strong>lower price (P₂ < P₁)</strong> and a <strong>higher quantity (Q₂ > Q₁)</strong>. <span class="ma-ann ma-ann-green">An</span>',
      },
      {
        label: 'Para 3',
        html: '<strong>Consumers benefit</strong> from the lower price and increased availability of the product, experiencing a rise in <strong>consumer surplus</strong>. <span class="ma-ann ma-ann-green">An</span> For firms, the impact on revenue depends on the <strong>price elasticity of demand (PED)</strong>. If demand is price elastic (PED > 1), the increase in quantity demanded will more than offset the price fall, and <strong>total revenue will rise</strong>. <span class="ma-ann ma-ann-green">An</span> However, if demand is inelastic, total revenue may fall despite higher sales volumes. Firms\' <strong>profit margins</strong> may still improve because the cost savings from cheaper raw materials may exceed the reduction in selling price, leaving them better off overall. <span class="ma-ann ma-ann-green">An</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
      { code: 'An', label: 'Analysis chain', color: 'green' },
      { code: 'D', label: 'Diagram ref.', color: 'purple' },
    ],
    examinerCommentary: 'This answer builds a clear chain of reasoning: lower costs → supply shifts right → new equilibrium (lower P, higher Q) → consumer surplus rises → revenue impact depends on PED. The oil price example provides concrete application. The conditional point on PED and profit margins demonstrates the analytical depth that earns top marks. A supply and demand diagram showing the rightward shift and new equilibrium would earn diagram credit.',
    likelyScore: '7–8 / 8',
  },

  // ── 1.3.4 Price Determination — 8 marks ──
  {
    id: 'maximum-price-8',
    subject: 'economics',
    unit: 1,
    sectionNumber: '1.3.4',
    sectionTitle: 'Price Determination',
    marks: 8,
    type: 'Analysis',
    commandWord: 'Analyse',
    question: 'Analyse the likely effects of a government-imposed maximum price on a market.',
    markScheme: [
      { range: '1–2 marks', desc: 'Knowledge: definition of maximum price (price ceiling set below equilibrium)' },
      { range: '3–4 marks', desc: 'Application: mechanism explained with reference to supply/demand diagram' },
      { range: '5–8 marks', desc: 'Analysis: developed chain of reasoning — shortage, rationing, black markets, welfare effects' },
    ],
    peel: {
      point: 'A maximum price set below equilibrium creates excess demand (a shortage).',
      evidence: 'E.g. rent controls in cities like New York or Berlin — rent capped below market rate.',
      explain: 'At the lower price, Qd > Qs. Landlords reduce supply (less profitable), tenants increase demand (cheaper). The gap = shortage.',
      link: 'This leads to non-price rationing (waiting lists, discrimination) and potential black markets where the good trades above the legal price.',
    },
    answerParagraphs: [
      {
        label: 'Para 1',
        html: 'A <strong>maximum price</strong> (or price ceiling) is a legally imposed upper limit on the price of a good, set <strong>below the market equilibrium</strong>. <span class="ma-ann ma-ann-blue">K</span> Governments typically impose maximum prices on essential goods to protect consumers — for example, <strong>rent controls</strong> in housing markets or caps on energy prices. <span class="ma-ann ma-ann-amber">A</span>',
      },
      {
        label: 'Para 2',
        html: 'At the maximum price (Pmax), the <strong>quantity demanded exceeds the quantity supplied</strong>, creating a <strong>shortage</strong> (excess demand). <span class="ma-ann ma-ann-green">An</span> This occurs because the artificially low price encourages more consumers to demand the good, while producers are less willing or able to supply it at the reduced price — their <strong>profit margins</strong> fall, reducing the incentive to produce. <span class="ma-ann ma-ann-green">An</span> On a supply and demand diagram, the shortage is visible as the horizontal gap between Qs and Qd at Pmax. <span class="ma-ann ma-ann-purple">D</span>',
      },
      {
        label: 'Para 3',
        html: 'The shortage leads to several <strong>secondary effects</strong>. Since the price mechanism can no longer ration the good, <strong>non-price rationing</strong> methods emerge — such as queuing, waiting lists, or seller discrimination. <span class="ma-ann ma-ann-green">An</span> A <strong>black market</strong> may also develop, where the good is traded illegally at a price above the legal maximum, often exceeding even the original equilibrium price due to restricted supply. <span class="ma-ann ma-ann-green">An</span> In the longer run, the reduced profitability discourages <strong>investment</strong> in the market — for example, landlords under rent controls may stop maintaining properties, reducing the <strong>quality of housing stock</strong> over time. <span class="ma-ann ma-ann-green">An</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
      { code: 'An', label: 'Analysis chain', color: 'green' },
      { code: 'D', label: 'Diagram ref.', color: 'purple' },
    ],
    examinerCommentary: 'This answer builds a <em>developed chain of reasoning</em>: max price below equilibrium → shortage → non-price rationing → black markets → reduced investment. The rent control example grounds the analysis. For full marks, a correctly labelled diagram showing Pmax below Pe with the shortage clearly marked would earn diagram credit. Note how the answer extends into long-run effects (reduced housing quality) — this depth distinguishes top-band responses.',
    likelyScore: '7–8 / 8',
  },

  // ── 1.3.5 Market Failure — 4 marks ──
  {
    id: 'neg-externality-4',
    subject: 'economics',
    unit: 1,
    sectionNumber: '1.3.5',
    sectionTitle: 'Market Failure',
    marks: 4,
    type: 'Knowledge & Application',
    commandWord: 'Explain',
    question: 'Explain what is meant by a negative externality and give one example.',
    markScheme: [
      { range: '1–2 marks', desc: 'Definition of negative externality (spill-over cost to third parties not reflected in price)' },
      { range: '3–4 marks', desc: 'Clear, developed example with reference to third-party cost and market over-production' },
    ],
    peel: null,
    answerParagraphs: [
      {
        label: null,
        html: 'A <strong>negative externality</strong> is a <strong>spill-over cost</strong> imposed on third parties <span class="ma-ann ma-ann-blue">K</span> who are not involved in the transaction between producer and consumer, and is therefore <strong>not reflected in the market price</strong>. <span class="ma-ann ma-ann-blue">K</span><br><br>For example, a <strong>coal-fired power station</strong> <span class="ma-ann ma-ann-green">E</span> emits carbon dioxide and sulphur dioxide as by-products of electricity production. Local residents and future generations suffer increased rates of respiratory illness and climate-related damage — costs they bear without compensation. <span class="ma-ann ma-ann-amber">A</span> Because these social costs are external to the firm\'s calculations, the market <strong>over-produces</strong> electricity relative to the socially optimal output. <span class="ma-ann ma-ann-amber">A</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge/Definition', color: 'blue' },
      { code: 'E', label: 'Example', color: 'green' },
      { code: 'A', label: 'Application', color: 'amber' },
    ],
    examinerCommentary: 'Full marks require both a precise definition (spill-over cost, third parties, not in price) <em>and</em> a developed example that identifies the specific third-party harm. Vague answers like "pollution affects people" will only reach 2 marks. Linking over-production to the divergence between private and social cost pushes into top-band application.',
    likelyScore: '4 / 4',
  },

  // ── 1.3.6 Government Intervention — 8 marks ──
  {
    id: 'indirect-tax-8',
    subject: 'economics',
    unit: 1,
    sectionNumber: '1.3.6',
    sectionTitle: 'Government Intervention',
    marks: 8,
    type: 'Analysis',
    commandWord: 'Analyse',
    question: 'Analyse how the imposition of an indirect tax on sugary drinks could reduce market failure.',
    markScheme: [
      { range: '1–2 marks', desc: 'Knowledge: definition of indirect tax and/or negative externality / demerit good' },
      { range: '3–4 marks', desc: 'Application: mechanism of tax on sugary drinks (raises price, internalises external cost)' },
      { range: '5–8 marks', desc: 'Analysis: developed chain through to reduced consumption, welfare gain, potential limitations' },
    ],
    peel: {
      point: 'An indirect tax raises the private cost of production, shifting supply left and reducing consumption.',
      evidence: 'E.g. the UK Soft Drinks Industry Levy (2018) — a two-tier tax on sugar content in drinks.',
      explain: 'The tax internalises the external cost (obesity, NHS burden) by making the market price reflect the social cost, moving output closer to the socially optimal level.',
      link: 'This reduces the welfare loss from over-consumption of demerit goods, though effectiveness depends on PED and whether firms reformulate.',
    },
    answerParagraphs: [
      {
        label: 'Para 1',
        html: 'Sugary drinks can be classified as a <strong>demerit good</strong> — a good that is over-consumed because consumers underestimate the long-term health costs and because consumption generates <strong>negative externalities</strong> (e.g. increased burden on the NHS from obesity-related illness). <span class="ma-ann ma-ann-blue">K</span> An <strong>indirect tax</strong> is a government-imposed levy on producers that raises the cost of production. <span class="ma-ann ma-ann-blue">K</span> The UK introduced the <strong>Soft Drinks Industry Levy</strong> in 2018 as an example of this approach. <span class="ma-ann ma-ann-amber">A</span>',
      },
      {
        label: 'Para 2',
        html: 'The tax <strong>shifts the supply curve leftward</strong> (from S to S+tax), raising the market price and reducing the equilibrium quantity consumed. <span class="ma-ann ma-ann-green">An</span> By increasing the private cost, the tax effectively <strong>internalises the external cost</strong> — making the market price closer to the true <strong>social cost</strong> of consumption. <span class="ma-ann ma-ann-green">An</span> This moves output from the free-market quantity (Qm) toward the <strong>socially optimal quantity (Qopt)</strong>, reducing the welfare loss (deadweight loss) caused by over-consumption. <span class="ma-ann ma-ann-purple">D</span>',
      },
      {
        label: 'Para 3',
        html: 'However, the effectiveness of the tax depends on the <strong>price elasticity of demand</strong> for sugary drinks. <span class="ma-ann ma-ann-green">An</span> If demand is price inelastic — for example, among habitual consumers or those with few perceived substitutes — the reduction in quantity consumed will be small, and the tax will primarily raise revenue rather than change behaviour. <span class="ma-ann ma-ann-green">An</span> Conversely, the UK sugar levy has been credited with encouraging manufacturers to <strong>reformulate products</strong> with less sugar, reducing consumption even without large price increases — an outcome that extends the policy\'s impact beyond the simple price mechanism. <span class="ma-ann ma-ann-amber">A</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
      { code: 'An', label: 'Analysis chain', color: 'green' },
      { code: 'D', label: 'Diagram ref.', color: 'purple' },
    ],
    examinerCommentary: 'Top marks are earned by the <em>developed chain</em>: tax → supply shifts left → price rises → quantity falls → welfare loss reduced. The conditional point on PED shows sophisticated analysis — examiners at this level want to see candidates qualify their reasoning. The UK sugar levy is an excellent real-world application. A diagram showing the tax wedge between S and S+tax, with the welfare gain shaded, would earn full diagram credit.',
    likelyScore: '7–8 / 8',
  },

  // ── 2.3.1 Measures of Economic Performance — 4 marks ──
  {
    id: 'cpi-inflation-4',
    subject: 'economics',
    unit: 2,
    sectionNumber: '2.3.1',
    sectionTitle: 'Measures of Economic Performance',
    marks: 4,
    type: 'Knowledge & Application',
    commandWord: 'Explain',
    question: 'Explain how the Consumer Price Index (CPI) is used to measure inflation.',
    markScheme: [
      { range: '1–2 marks', desc: 'Definition of CPI and/or inflation' },
      { range: '3–4 marks', desc: 'Explanation of method (basket of goods, weighted, base year comparison)' },
    ],
    peel: null,
    answerParagraphs: [
      {
        label: null,
        html: '<strong>Inflation</strong> is a <strong>sustained rise in the general price level</strong> of goods and services in an economy over time. <span class="ma-ann ma-ann-blue">K</span> The <strong>Consumer Price Index (CPI)</strong> is the main measure used to track inflation in the UK. <span class="ma-ann ma-ann-blue">K</span><br><br>CPI measures inflation by tracking the prices of a <strong>representative basket of approximately 700 goods and services</strong>, weighted according to typical <strong>household spending patterns</strong>. <span class="ma-ann ma-ann-amber">A</span> The basket is updated annually to reflect changing consumption habits — for example, streaming subscriptions have been added in recent years while DVD players have been removed. Prices are compared to a <strong>base year</strong> (index = 100). If the CPI rises from 100 to 103, this indicates an <strong>inflation rate of 3%</strong>. <span class="ma-ann ma-ann-amber">A</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge/Definition', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
    ],
    examinerCommentary: 'Full marks require both a definition of inflation (sustained rise in the general price level) and an explanation of the CPI method. Candidates should mention the basket of goods, weighting, and base year comparison. Simply stating "CPI measures prices" without explaining how earns only 1–2 marks.',
    likelyScore: '4 / 4',
  },

  // ── 2.3.1 Measures of Economic Performance — 8 marks ──
  {
    id: 'unemployment-types-8',
    subject: 'economics',
    unit: 2,
    sectionNumber: '2.3.1',
    sectionTitle: 'Measures of Economic Performance',
    marks: 8,
    type: 'Analysis',
    commandWord: 'Analyse',
    question: 'Analyse the different types of unemployment in an economy.',
    markScheme: [
      { range: '1–2 marks', desc: 'Knowledge: definition of unemployment and/or types identified' },
      { range: '3–4 marks', desc: 'Application: examples of each type with real-world context' },
      { range: '5–8 marks', desc: 'Analysis: developed reasoning on causes, consequences, and policy implications of each type' },
    ],
    peel: {
      point: 'Unemployment has different causes requiring different policy responses.',
      evidence: 'E.g. UK claimant count data shows regional variation linked to structural change in former industrial areas.',
      explain: 'Cyclical unemployment arises from demand deficiency, structural from changing industry composition, frictional from job search, and seasonal from time-dependent demand patterns.',
      link: 'Identifying the type matters because each requires different policy — demand-side stimulus for cyclical, supply-side intervention for structural.',
    },
    answerParagraphs: [
      {
        label: 'Para 1',
        html: '<strong>Unemployment</strong> occurs when individuals who are <strong>willing and able to work</strong> cannot find a job at the prevailing wage rate. <span class="ma-ann ma-ann-blue">K</span> It is measured in the UK using the <strong>ILO Labour Force Survey</strong> and the <strong>claimant count</strong>. Understanding the <em>type</em> of unemployment is essential because each has different causes and requires different policy solutions. <span class="ma-ann ma-ann-blue">K</span>',
      },
      {
        label: 'Para 2',
        html: '<strong>Cyclical (demand-deficient) unemployment</strong> occurs during economic downturns when <strong>aggregate demand falls</strong>. <span class="ma-ann ma-ann-blue">K</span> As firms experience lower sales, they reduce output and lay off workers. For example, during the 2008–09 recession, UK unemployment rose from 5.2% to 8% as consumer spending and business investment collapsed. <span class="ma-ann ma-ann-amber">A</span> This type can be addressed through <strong>demand-side policies</strong> such as cutting interest rates or increasing government spending to boost AD. <span class="ma-ann ma-ann-green">An</span><br><br><strong>Structural unemployment</strong> arises from a <strong>mismatch between workers\' skills and the skills demanded</strong> by employers, often caused by long-term changes in the structure of the economy. <span class="ma-ann ma-ann-blue">K</span> For example, the decline of coal mining and manufacturing in northern England left many workers without the skills needed for new service-sector jobs. <span class="ma-ann ma-ann-amber">A</span> Structural unemployment requires <strong>supply-side policies</strong> such as education, retraining programmes, and subsidies for geographical mobility. <span class="ma-ann ma-ann-green">An</span>',
      },
      {
        label: 'Para 3',
        html: '<strong>Frictional unemployment</strong> is short-term unemployment that occurs when workers are <strong>between jobs</strong>, searching for a role that matches their skills. <span class="ma-ann ma-ann-blue">K</span> It exists in all economies and is generally considered unavoidable — it can be reduced through better information provision, such as online job platforms, which speed up the matching process. <span class="ma-ann ma-ann-green">An</span> <strong>Seasonal unemployment</strong> occurs in industries where demand is <strong>time-dependent</strong> — for example, agricultural workers after harvest season or hospitality staff after the summer tourism period. <span class="ma-ann ma-ann-amber">A</span> The key analytical insight is that policy-makers must <strong>diagnose the type of unemployment correctly</strong> before choosing a response: expansionary fiscal or monetary policy is appropriate for cyclical unemployment but would cause <strong>inflation without reducing structural unemployment</strong>, which requires targeted supply-side reform. <span class="ma-ann ma-ann-green">An</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
      { code: 'An', label: 'Analysis chain', color: 'green' },
    ],
    examinerCommentary: 'Top-band answers go beyond listing types and develop the <em>policy implications</em> of each. The 2008–09 recession example and the decline of UK manufacturing ground the analysis in real-world context. The concluding point — that demand-side policy is ineffective against structural unemployment — shows the evaluative depth that distinguishes top candidates. Examiners reward candidates who link types of unemployment to specific, appropriate policy responses.',
    likelyScore: '7–8 / 8',
  },

  // ── 2.3.2 Aggregate Demand — 4 marks ──
  {
    id: 'ad-shift-4',
    subject: 'economics',
    unit: 2,
    sectionNumber: '2.3.2',
    sectionTitle: 'Aggregate Demand',
    marks: 4,
    type: 'Knowledge & Application',
    commandWord: 'Explain',
    question: 'Explain two factors that could cause a rightward shift of the aggregate demand (AD) curve.',
    markScheme: [
      { range: '1–2 marks', desc: 'Knowledge: definition of AD or its components (C + I + G + (X−M))' },
      { range: '3–4 marks', desc: 'Two distinct factors explained with clear link to why AD shifts right' },
    ],
    peel: null,
    answerParagraphs: [
      {
        label: null,
        html: '<strong>Aggregate demand (AD)</strong> is the total planned expenditure in an economy at a given price level, consisting of <em>AD = C + I + G + (X − M)</em>. <span class="ma-ann ma-ann-blue">K</span><br><br>First, a <strong>cut in income tax</strong> would increase households\' <strong>disposable income</strong>, leading to a rise in <strong>consumer spending (C)</strong>. <span class="ma-ann ma-ann-amber">A</span> With more income available after tax, consumers can afford to spend more on goods and services, shifting AD rightward. <span class="ma-ann ma-ann-amber">A</span><br><br>Second, a <strong>fall in the exchange rate</strong> would make exports cheaper for foreign buyers and imports more expensive for domestic consumers. <span class="ma-ann ma-ann-amber">A</span> This would increase <strong>net exports (X − M)</strong>, as export demand rises and import spending falls, shifting AD to the right. <span class="ma-ann ma-ann-amber">A</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge/Definition', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
    ],
    examinerCommentary: 'For full marks, candidates must identify <em>two distinct factors</em> and explain the mechanism by which each causes AD to shift right — not just state the factor. Linking each factor to a specific component of AD (C, I, G, or X−M) demonstrates application. Generic answers like "more spending" without explaining <em>why</em> spending rises will only score 1–2 marks.',
    likelyScore: '4 / 4',
  },

  // ── 2.3.3 Aggregate Supply — 8 marks ──
  {
    id: 'supply-side-lras-8',
    subject: 'economics',
    unit: 2,
    sectionNumber: '2.3.3',
    sectionTitle: 'Aggregate Supply',
    marks: 8,
    type: 'Analysis',
    commandWord: 'Analyse',
    question: 'Analyse the impact of supply-side policies on long-run aggregate supply (LRAS).',
    markScheme: [
      { range: '1–2 marks', desc: 'Knowledge: definition of supply-side policies and/or LRAS' },
      { range: '3–4 marks', desc: 'Application: specific examples of supply-side policies (education, deregulation, tax reform)' },
      { range: '5–8 marks', desc: 'Analysis: developed chain of reasoning from policy → productivity → LRAS shift → non-inflationary growth' },
    ],
    peel: {
      point: 'Supply-side policies increase the productive capacity of the economy, shifting LRAS rightward.',
      evidence: 'E.g. government investment in education and training increases human capital; deregulation reduces barriers to entry.',
      explain: 'Higher productivity means more output can be produced at every price level. LRAS shifts right, enabling non-inflationary growth.',
      link: 'This raises the trend rate of growth and reduces structural unemployment, though benefits take years to materialise.',
    },
    answerParagraphs: [
      {
        label: 'Para 1',
        html: '<strong>Supply-side policies</strong> are government measures designed to increase the <strong>productive potential</strong> of the economy by improving the quality and quantity of factors of production. <span class="ma-ann ma-ann-blue">K</span> <strong>Long-run aggregate supply (LRAS)</strong> represents the economy\'s maximum output at full employment of resources. <span class="ma-ann ma-ann-blue">K</span>',
      },
      {
        label: 'Para 2',
        html: 'Interventionist supply-side policies include <strong>government investment in education and training</strong>, which raises <strong>human capital</strong>. <span class="ma-ann ma-ann-amber">A</span> A more skilled workforce is more productive — each worker produces more output per hour — which increases the economy\'s <strong>productive capacity</strong>. <span class="ma-ann ma-ann-green">An</span> Similarly, <strong>investment in infrastructure</strong> (e.g. transport networks) reduces firms\' costs and improves efficiency, further expanding potential output. <span class="ma-ann ma-ann-green">An</span> On a diagram, LRAS shifts rightward from LRAS₁ to LRAS₂, enabling the economy to produce more at every price level. <span class="ma-ann ma-ann-purple">D</span>',
      },
      {
        label: 'Para 3',
        html: 'Market-based supply-side policies such as <strong>deregulation</strong> and <strong>reducing corporation tax</strong> work by increasing incentives and competition. <span class="ma-ann ma-ann-amber">A</span> Deregulation removes barriers to entry, increasing competition and driving firms to innovate and cut costs. Lower corporation tax raises post-tax profits, incentivising greater <strong>investment</strong> in capital equipment and technology. <span class="ma-ann ma-ann-green">An</span> The resulting rightward shift of LRAS enables <strong>non-inflationary economic growth</strong> — real GDP rises without upward pressure on the price level — and can reduce <strong>structural unemployment</strong> by addressing skills gaps and labour market rigidities. <span class="ma-ann ma-ann-green">An</span> However, these benefits are typically <strong>long-term</strong>, taking years to materialise, and may involve <strong>short-term costs</strong> such as government spending on education or transition periods after deregulation. <span class="ma-ann ma-ann-green">An</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
      { code: 'An', label: 'Analysis chain', color: 'green' },
      { code: 'D', label: 'Diagram ref.', color: 'purple' },
    ],
    examinerCommentary: 'This answer demonstrates the <em>developed chain of reasoning</em> examiners reward: policy → productivity/capacity increase → LRAS shifts right → non-inflationary growth + lower structural unemployment. The distinction between interventionist and market-based policies shows breadth. The qualification about time lags elevates the analysis beyond assertion. A correctly labelled LRAS diagram showing the shift would earn diagram credit.',
    likelyScore: '7–8 / 8',
  },

  // ── 2.3.4 National Income — 8 marks ──
  {
    id: 'circular-flow-8',
    subject: 'economics',
    unit: 2,
    sectionNumber: '2.3.4',
    sectionTitle: 'National Income',
    marks: 8,
    type: 'Analysis',
    commandWord: 'Analyse',
    question: 'Analyse how the circular flow of income model shows the impact of injections and withdrawals on national income.',
    markScheme: [
      { range: '1–2 marks', desc: 'Knowledge: definition of circular flow model, injections and/or withdrawals' },
      { range: '3–4 marks', desc: 'Application: identification of specific injections (I, G, X) and withdrawals (S, T, M) with examples' },
      { range: '5–8 marks', desc: 'Analysis: developed chain — when injections exceed withdrawals, national income rises via multiplier; when withdrawals exceed injections, it contracts' },
    ],
    peel: {
      point: 'The circular flow model illustrates how injections and withdrawals determine the level of national income.',
      evidence: 'E.g. government spending on the NHS adds income to the circular flow; saving by households withdraws income from it.',
      explain: 'When injections (I + G + X) exceed withdrawals (S + T + M), national income rises through the multiplier effect. When withdrawals exceed injections, national income contracts.',
      link: 'This framework helps explain why changes in government spending, investment, or trade balances cause fluctuations in GDP.',
    },
    answerParagraphs: [
      {
        label: 'Para 1',
        html: 'The <strong>circular flow of income</strong> model shows how money flows between <strong>households</strong> and <strong>firms</strong> in an economy. <span class="ma-ann ma-ann-blue">K</span> Households provide <strong>factors of production</strong> (land, labour, capital, enterprise) to firms and receive <strong>factor incomes</strong> (rent, wages, interest, profit) in return. Households then spend this income on goods and services produced by firms, completing the flow. <span class="ma-ann ma-ann-blue">K</span>',
      },
      {
        label: 'Para 2',
        html: '<strong>Injections</strong> are additions to the circular flow that increase national income. They consist of <strong>investment (I)</strong> by firms, <strong>government spending (G)</strong>, and <strong>export revenue (X)</strong>. <span class="ma-ann ma-ann-blue">K</span> For example, government spending on the <strong>NHS</strong> pays wages to doctors and nurses, adding income to the flow. <span class="ma-ann ma-ann-amber">A</span> <strong>Withdrawals</strong> (or leakages) are removals from the circular flow: <strong>saving (S)</strong>, <strong>taxation (T)</strong>, and <strong>import spending (M)</strong>. <span class="ma-ann ma-ann-blue">K</span> When households save rather than spend, that income does not flow back to firms, reducing overall economic activity. <span class="ma-ann ma-ann-green">An</span>',
      },
      {
        label: 'Para 3',
        html: 'When <strong>injections exceed withdrawals</strong> (I + G + X > S + T + M), national income <strong>rises</strong>. <span class="ma-ann ma-ann-green">An</span> This increase is amplified by the <strong>multiplier effect</strong> — an initial injection of spending generates successive rounds of income and re-spending. For example, a £1bn increase in government infrastructure spending creates jobs and wages, which are partly re-spent on goods and services, creating further income for other firms and workers. <span class="ma-ann ma-ann-amber">A</span> Conversely, when <strong>withdrawals exceed injections</strong>, national income <strong>contracts</strong> — firms receive less revenue, reduce output, and may lay off workers, leading to a negative multiplier effect. <span class="ma-ann ma-ann-green">An</span> The economy reaches <strong>equilibrium</strong> when total injections equal total withdrawals, and national income is stable. <span class="ma-ann ma-ann-green">An</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
      { code: 'An', label: 'Analysis chain', color: 'green' },
    ],
    examinerCommentary: 'This answer builds a developed chain: define model → identify injections and withdrawals → explain the multiplier mechanism → show how imbalance causes changes in national income. The NHS and infrastructure examples provide concrete application. For top marks, candidates should reference the equilibrium condition (injections = withdrawals) and the multiplier effect. A clearly labelled circular flow diagram would earn additional credit.',
    likelyScore: '7–8 / 8',
  },

  // ── 2.3.5 Economic Growth — 4 marks ──
  {
    id: 'actual-potential-growth-4',
    subject: 'economics',
    unit: 2,
    sectionNumber: '2.3.5',
    sectionTitle: 'Economic Growth',
    marks: 4,
    type: 'Knowledge & Application',
    commandWord: 'Explain',
    question: 'Explain the difference between actual and potential economic growth.',
    markScheme: [
      { range: '1–2 marks', desc: 'Definitions of actual and/or potential growth' },
      { range: '3–4 marks', desc: 'Clear distinction between the two with reference to AD/AS framework' },
    ],
    peel: null,
    answerParagraphs: [
      {
        label: null,
        html: '<strong>Actual economic growth</strong> is an increase in <strong>real GDP</strong>, measured by the percentage change in output year on year. <span class="ma-ann ma-ann-blue">K</span> It is caused by an increase in <strong>aggregate demand (AD)</strong>, which allows the economy to use existing <strong>spare capacity</strong> — for example, unemployed workers finding jobs and idle factories resuming production. <span class="ma-ann ma-ann-amber">A</span><br><br><strong>Potential economic growth</strong> is an increase in the <strong>productive capacity</strong> of the economy — the maximum output it could produce at full employment. <span class="ma-ann ma-ann-blue">K</span> This is represented by a <strong>rightward shift of the LRAS curve</strong> and is caused by supply-side improvements such as better technology, increased education and training, or investment in infrastructure. <span class="ma-ann ma-ann-amber">A</span><br><br>The key distinction is that a country can experience <strong>actual growth without potential growth</strong> (simply using up spare capacity through rising AD) or <strong>potential growth without actual growth</strong> (productive capacity expands but AD does not rise sufficiently to utilise it). <span class="ma-ann ma-ann-amber">A</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge/Definition', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
    ],
    examinerCommentary: 'Full marks require clear definitions of <em>both</em> types of growth and an explicit distinction. Linking actual growth to AD and spare capacity, and potential growth to LRAS shifts, demonstrates the AD/AS framework understanding that examiners reward. The final point — that one can exist without the other — is the analytical insight that earns top marks.',
    likelyScore: '4 / 4',
  },

  // ── 2.3.5 Economic Growth — 20 marks ──
  {
    id: 'supply-side-growth-20',
    subject: 'economics',
    unit: 2,
    sectionNumber: '2.3.5',
    sectionTitle: 'Economic Growth',
    marks: 20,
    type: 'Evaluation Essay',
    commandWord: 'Evaluate',
    question: 'Evaluate the extent to which supply-side policies are the most effective way to achieve long-term economic growth.',
    markScheme: [
      { range: 'AO1 (4 marks)', desc: 'Knowledge of supply-side policies, economic growth, and AD/LRAS framework' },
      { range: 'AO2 (4 marks)', desc: 'Application — use of relevant examples, data, or real-world context' },
      { range: 'AO3 (6 marks)', desc: 'Analysis — developed chains of reasoning for and against supply-side policies' },
      { range: 'AO4 (6 marks)', desc: 'Evaluation — weighing arguments, considering context and time horizons, justified conclusion' },
    ],
    peel: {
      point: 'Supply-side policies increase productive capacity, enabling sustainable non-inflationary growth.',
      evidence: 'E.g. investment in education (raising human capital), deregulation (increasing competition), lower corporation tax (incentivising investment).',
      explain: 'These policies shift LRAS rightward, increasing the economy\'s trend rate of growth without generating demand-pull inflation.',
      link: 'However, supply-side policies alone may be insufficient — demand must also rise to utilise expanded capacity, and benefits take years to materialise.',
    },
    answerParagraphs: [
      {
        label: 'Introduction',
        html: '<strong>Economic growth</strong> is an increase in the <strong>real GDP</strong> of an economy over time. <strong>Long-term (potential) growth</strong> requires an increase in the economy\'s <strong>productive capacity</strong>, represented by a rightward shift of LRAS. <span class="ma-ann ma-ann-blue">K</span> <strong>Supply-side policies</strong> are government measures designed to improve the quality and quantity of factors of production, thereby increasing potential output. <span class="ma-ann ma-ann-blue">K</span> This essay will evaluate whether such policies are the <em>most</em> effective route to sustained growth, or whether demand-side measures also play an essential role.',
      },
      {
        label: 'Argument 1 — Supply-Side Effectiveness',
        html: 'Supply-side policies target the <strong>root causes of long-term growth</strong> by expanding the economy\'s productive potential. <span class="ma-ann ma-ann-green">An</span> <strong>Investment in education and training</strong> raises <strong>human capital</strong>, making workers more productive — for example, government-funded apprenticeship schemes equip young people with technical skills demanded by growing industries like technology and green energy. <span class="ma-ann ma-ann-amber">A</span> <strong>Deregulation</strong> removes barriers to entry, increasing competition and incentivising firms to innovate and cut costs, which improves <strong>allocative and productive efficiency</strong>. <span class="ma-ann ma-ann-green">An</span> <strong>Reductions in corporation tax</strong> raise post-tax profits, encouraging greater <strong>capital investment</strong> in new machinery, technology, and research. <span class="ma-ann ma-ann-amber">A</span> Each of these policies shifts <strong>LRAS rightward</strong>, enabling the economy to produce more at every price level — crucially, this growth is <strong>non-inflationary</strong> because it expands capacity rather than simply increasing demand against a fixed supply. <span class="ma-ann ma-ann-green">An</span>',
      },
      {
        label: 'Counter-argument — Demand-Side Policies',
        html: 'However, <strong>Keynesian economists</strong> argue that supply-side policies alone are insufficient. <span class="ma-ann ma-ann-green">An</span> Even if productive capacity expands (LRAS shifts right), this does not guarantee actual growth — <strong>aggregate demand must also rise</strong> to utilise the new capacity. <span class="ma-ann ma-ann-green">An</span> During the <strong>2008–09 financial crisis</strong>, for example, the UK had adequate productive capacity but suffered a severe recession because AD collapsed — consumer confidence plummeted, banks restricted lending, and firms cut investment. <span class="ma-ann ma-ann-amber">A</span> In such circumstances, <strong>fiscal stimulus</strong> (increased government spending) and <strong>monetary policy</strong> (cutting interest rates) were needed to restore demand and prevent prolonged unemployment. <span class="ma-ann ma-ann-green">An</span> Supply-side improvements would have been irrelevant without sufficient demand to activate the existing capacity. <span class="ma-ann ma-ann-green">An</span>',
      },
      {
        label: 'Evaluation',
        html: 'The effectiveness of supply-side policies depends on several <strong>contextual factors</strong>. <span class="ma-ann ma-ann-green">An</span> First, the <strong>time horizon</strong> matters: supply-side policies such as education reform take <strong>years or even decades</strong> to yield results, whereas demand-side measures can stimulate growth more quickly. A government facing an imminent recession cannot rely on training programmes alone. <span class="ma-ann ma-ann-green">An</span> Second, the <strong>current state of the economy</strong> is critical — if the economy is already near full capacity with low unemployment, demand-side stimulus would simply cause inflation, and supply-side policies are the <em>only</em> way to achieve further growth. Conversely, if there is a large <strong>negative output gap</strong>, demand-side intervention is the immediate priority. <span class="ma-ann ma-ann-green">An</span> Third, the <strong>type of supply-side policy</strong> matters — market-based approaches (deregulation, tax cuts) may increase inequality or reduce public services, while interventionist approaches (education, infrastructure) require significant public expenditure and face opportunity cost constraints. <span class="ma-ann ma-ann-amber">A</span>',
      },
      {
        label: 'Conclusion',
        html: 'On balance, <strong>supply-side policies are the most effective means of achieving long-term, sustainable economic growth</strong> because they expand the economy\'s productive capacity and raise the trend rate of growth without inflationary pressure. <span class="ma-ann ma-ann-green">An</span> However, they are <strong>not sufficient on their own</strong>. In the short to medium term, demand-side management through fiscal and monetary policy is essential to ensure that the economy operates close to its potential and to manage cyclical fluctuations. The most effective approach is a <strong>coordinated policy mix</strong> — supply-side reforms to build long-term capacity, complemented by demand management to ensure that capacity is utilised. The relative emphasis depends on whether the economy faces a <strong>demand-side recession</strong> or a <strong>supply-side constraint on growth</strong>. <span class="ma-ann ma-ann-green">An</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
      { code: 'An', label: 'Analysis chain', color: 'green' },
    ],
    examinerCommentary: 'This essay reaches the top mark band through a <em>structured, balanced evaluation</em> with a conditional conclusion. The supply-side argument is well-developed with specific policy examples (education, deregulation, corporation tax). The Keynesian counter-argument using the 2008–09 crisis demonstrates strong application and analytical depth. The evaluation considers time horizon, economic context, and policy type — exactly the contextual factors examiners reward at AO4. The conclusion avoids a simplistic verdict, instead identifying the conditions under which supply-side policies are most and least effective. A relevant AD/LRAS diagram would strengthen AO3.',
    likelyScore: '18–20 / 20',
  },

  // ── 2.3.6 Macroeconomic Policies — 8 marks ──
  {
    id: 'interest-rates-inflation-8',
    subject: 'economics',
    unit: 2,
    sectionNumber: '2.3.6',
    sectionTitle: 'Macroeconomic Policies',
    marks: 8,
    type: 'Analysis',
    commandWord: 'Analyse',
    question: 'Analyse the likely impact of a cut in interest rates on the rate of inflation.',
    markScheme: [
      { range: '1–2 marks', desc: 'Knowledge: interest rates linked to borrowing costs / monetary policy' },
      { range: '3–4 marks', desc: 'Application: mechanism explained (lower rates → cheaper borrowing → C↑ / I↑)' },
      { range: '5–8 marks', desc: 'Analysis: developed chain of reasoning through AD to inflation, with diagram credit available' },
    ],
    peel: {
      point: 'Lower interest rates reduce the cost of borrowing for households and firms.',
      evidence: 'E.g. mortgage repayments fall, freeing disposable income; firms face lower investment hurdle rates.',
      explain: 'This raises Consumption (C) and Investment (I), two components of AD = C + I + G + (X−M).',
      link: 'Rising AD pushes equilibrium price level up, increasing demand-pull inflation — especially if near full capacity.',
    },
    answerParagraphs: [
      {
        label: 'Para 1',
        html: 'A cut in interest rates is a form of <strong>expansionary monetary policy</strong> <span class="ma-ann ma-ann-blue">K</span> implemented by a central bank such as the Bank of England. Lower interest rates <strong>reduce the cost of borrowing</strong> for households and firms, <span class="ma-ann ma-ann-amber">A</span> making mortgages, personal loans and corporate debt cheaper to service.',
      },
      {
        label: 'Para 2',
        html: 'As borrowing becomes cheaper, <strong>consumer spending (C) is likely to rise</strong>, since households face lower monthly mortgage repayments and therefore have greater <strong>disposable income</strong>. <span class="ma-ann ma-ann-green">An</span> Simultaneously, lower rates reduce the <strong>cost of investment (I)</strong> for firms, as the hurdle rate for profitable projects falls. Since <em>AD = C + I + G + (X − M)</em>, <span class="ma-ann ma-ann-blue">K</span> both effects shift the AD curve rightward. <span class="ma-ann ma-ann-purple">D</span>',
      },
      {
        label: 'Para 3',
        html: 'The rightward shift of AD increases the <strong>equilibrium price level</strong>, resulting in <strong>demand-pull inflation</strong>. <span class="ma-ann ma-ann-green">An</span> The magnitude of this inflationary effect depends on the <strong>degree of spare capacity</strong> in the economy — if the economy is near <strong>full employment</strong>, the AS curve becomes inelastic and the price effect is amplified. Conversely, in a deep recession with a large <strong>output gap</strong>, the rise in AD may largely increase real output rather than prices. <span class="ma-ann ma-ann-green">An</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
      { code: 'An', label: 'Analysis chain', color: 'green' },
      { code: 'D', label: 'Diagram ref.', color: 'purple' },
    ],
    examinerCommentary: 'This reaches the top analysis band by building a <em>developed chain of reasoning</em>: rate cut → borrowing costs ↓ → C and I ↑ → AD shifts right → price level rises. The conditional point on spare capacity ("depends on output gap") shows sophisticated analysis. Examiners reward candidates who qualify their chains rather than asserting them absolutely. A correctly labelled AD/AS diagram would earn additional credit.',
    likelyScore: '7–8 / 8',
  },

  // ── 2.3.6 Macroeconomic Policies — 20 marks ──
  {
    id: 'fiscal-vs-monetary-20',
    subject: 'economics',
    unit: 2,
    sectionNumber: '2.3.6',
    sectionTitle: 'Macroeconomic Policies',
    marks: 20,
    type: 'Evaluation Essay',
    commandWord: 'Evaluate',
    question: 'Evaluate the view that fiscal policy is more effective than monetary policy in reducing unemployment.',
    markScheme: [
      { range: 'AO1 (4 marks)', desc: 'Knowledge of fiscal and monetary policy instruments and their mechanisms' },
      { range: 'AO2 (4 marks)', desc: 'Application — use of relevant context, data or examples' },
      { range: 'AO3 (6 marks)', desc: 'Analysis — developed chains of reasoning for both arguments' },
      { range: 'AO4 (6 marks)', desc: 'Evaluation — weighing arguments, considering context, justified conclusion' },
    ],
    peel: {
      point: 'Fiscal policy can directly create jobs through government spending on infrastructure.',
      evidence: 'E.g. UK\'s HS2 rail project or the US stimulus under the American Recovery and Reinvestment Act.',
      explain: 'Direct spending generates multiplier effects as workers\' incomes are re-spent. Fiscal policy can also target specific depressed regions.',
      link: 'This makes fiscal policy especially effective for structural unemployment that monetary policy (economy-wide rate cuts) cannot target.',
    },
    answerParagraphs: [
      {
        label: 'Introduction',
        html: '<strong>Fiscal policy</strong> refers to government decisions on taxation and public expenditure to influence aggregate demand, while <strong>monetary policy</strong> involves the use of interest rates and money supply by a central bank to achieve macroeconomic objectives. <span class="ma-ann ma-ann-blue">K</span> Both policies aim to reduce <strong>cyclical unemployment</strong> — caused by insufficient AD — by stimulating economic activity. However, their effectiveness varies significantly depending on the <strong>type of unemployment</strong>, the <strong>state of the economic cycle</strong>, and prevailing <strong>institutional conditions</strong>. <span class="ma-ann ma-ann-green">An</span>',
      },
      {
        label: 'Argument 1 — Fiscal Effectiveness',
        html: 'A key advantage of fiscal policy is that government spending can <strong>directly create employment</strong>. <span class="ma-ann ma-ann-green">An</span> For example, large-scale infrastructure investment — such as the UK\'s HS2 rail project or post-2009 US stimulus under the American Recovery and Reinvestment Act — directly employs construction workers and generates <strong>multiplier effects</strong> as their incomes are re-spent in the economy. <span class="ma-ann ma-ann-amber">A</span> Furthermore, fiscal policy can be <strong>geographically targeted</strong>, directing spending to depressed regions with persistently high unemployment — something monetary policy, which operates economy-wide through interest rates, cannot achieve. <span class="ma-ann ma-ann-green">An</span> This is particularly valuable when unemployment is <strong>structural</strong> rather than merely cyclical, requiring investment in retraining or infrastructure rather than a generalised demand boost. <span class="ma-ann ma-ann-green">An</span>',
      },
      {
        label: 'Counter-argument — Monetary Policy',
        html: 'However, critics argue that monetary policy can be more effective in normal conditions because it avoids the problem of <strong>crowding out</strong>. <span class="ma-ann ma-ann-green">An</span> When the government borrows to fund fiscal stimulus, it increases demand for loanable funds, pushing up <strong>interest rates</strong> and discouraging private sector investment — partially offsetting the stimulus effect. <span class="ma-ann ma-ann-green">An</span> By contrast, a cut in the base rate by the central bank lowers borrowing costs <em>across the economy</em>, stimulating consumption and business investment simultaneously without requiring government to identify specific spending projects or run a deficit. <span class="ma-ann ma-ann-amber">A</span>',
      },
      {
        label: 'Evaluation',
        html: 'The relative effectiveness of each policy is <strong>highly context-dependent</strong>. During the 2008–09 financial crisis, interest rates reached the <strong>zero lower bound (ZLB)</strong> in many economies, rendering conventional monetary policy ineffective — at 0.5% base rate, further cuts produced negligible stimulative effect. In such circumstances, fiscal policy becomes the primary tool. <span class="ma-ann ma-ann-green">An</span> Moreover, if unemployment is <strong>structural</strong> — arising from skills mismatches or technological change — neither policy alone is sufficient; fiscal spending on training and education addresses root causes that a rate cut cannot. <span class="ma-ann ma-ann-green">An</span> Conversely, during a mild demand-side slowdown with rates well above zero, monetary policy may be preferable due to its <strong>greater flexibility, lower time lags</strong>, and avoidance of deficit financing. <span class="ma-ann ma-ann-green">An</span>',
      },
      {
        label: 'Conclusion',
        html: 'On balance, <strong>fiscal policy is likely more effective in reducing unemployment during severe downturns or when structural unemployment dominates</strong>, as it can directly create jobs, target specific groups, and operate independently of interest rate constraints. However, in mild cyclical downturns where monetary space exists, the <strong>speed and flexibility of monetary policy</strong> give it an edge. The most effective approach is often a <strong>coordinated policy mix</strong> — monetary policy to stabilise credit conditions and fiscal policy to generate targeted demand and address supply-side structural weaknesses. <span class="ma-ann ma-ann-green">An</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
      { code: 'An', label: 'Analysis chain', color: 'green' },
    ],
    examinerCommentary: 'This answer reaches the top mark band by delivering a <em>conditional, context-driven conclusion</em> rather than a blanket verdict. Note how the evaluation paragraph introduces the ZLB constraint and the distinction between cyclical and structural unemployment — these are the contextual triggers examiners look for at AO4. The crowding out counter-argument is particularly well-developed. For full 20 marks, a relevant AD/AS diagram with clear labelling of the unemployment gap would further strengthen AO3.',
    likelyScore: '18–20 / 20',
  },

  // ══════════════════════════════════════
  // BUSINESS
  // ══════════════════════════════════════

  // ── 1.1 Meeting Customer Needs — 4 marks ──
  {
    id: 'market-segmentation-4',
    subject: 'business',
    unit: 1,
    sectionNumber: '1.1',
    sectionTitle: 'Meeting Customer Needs',
    marks: 4,
    type: 'Knowledge & Application',
    commandWord: 'Explain',
    question: 'Explain what is meant by market segmentation and why it is useful to a business.',
    markScheme: [
      { range: '1–2 marks', desc: 'Definition of market segmentation (dividing a market into distinct groups of consumers)' },
      { range: '3–4 marks', desc: 'Application of why segmentation is useful (targeted marketing, better meeting customer needs)' },
    ],
    peel: null,
    answerParagraphs: [
      {
        label: null,
        html: '<strong>Market segmentation</strong> is the process of dividing a market into <strong>distinct groups of consumers</strong> who share similar characteristics or needs. <span class="ma-ann ma-ann-blue">K</span> Markets can be segmented by <strong>age, income, location, lifestyle, or buying behaviour</strong>. <span class="ma-ann ma-ann-blue">K</span><br><br>Segmentation is useful because it allows a business to <strong>target its marketing mix more precisely</strong> at each group, rather than adopting a one-size-fits-all approach. <span class="ma-ann ma-ann-amber">A</span> For example, a car manufacturer can design and promote different models for <strong>families</strong> (MPVs with large boot space), <strong>young professionals</strong> (sporty hatchbacks), and <strong>luxury buyers</strong> (premium saloons with high-end features). <span class="ma-ann ma-ann-amber">A</span> By tailoring products and marketing to each segment\'s specific needs, the business increases the likelihood of sales and can build stronger <strong>customer loyalty</strong>, ultimately boosting revenue and market share. <span class="ma-ann ma-ann-amber">A</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge/Definition', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
    ],
    examinerCommentary: 'Full marks require a clear definition of market segmentation and a developed explanation of why it benefits a business. Candidates should go beyond simply listing segmentation bases (age, income, etc.) and explain the <em>advantage</em> — targeted marketing leads to better customer satisfaction and higher sales. A concrete example, as shown here with the car manufacturer, earns the application marks.',
    likelyScore: '4 / 4',
  },

  // ── 1.2 The Market — 8 marks ──
  {
    id: 'market-research-8',
    subject: 'business',
    unit: 1,
    sectionNumber: '1.2',
    sectionTitle: 'The Market',
    marks: 8,
    type: 'Analysis',
    commandWord: 'Analyse',
    question: 'Analyse the benefits and limitations of primary market research for a business launching a new product.',
    markScheme: [
      { range: '1–2 marks', desc: 'Knowledge: definition of primary market research and methods' },
      { range: '3–5 marks', desc: 'Application: benefits and limitations applied to new product launch context' },
      { range: '6–8 marks', desc: 'Analysis: developed reasoning on why benefits/limitations matter for launch decisions' },
    ],
    peel: {
      point: 'Primary market research provides specific, up-to-date data tailored to the business\'s needs.',
      evidence: 'E.g. a tech start-up surveying 500 potential customers about product features before launch.',
      explain: 'The data is exclusive to the firm, directly relevant, and can target the exact demographic. However, it is expensive, time-consuming, and small samples may not be representative.',
      link: 'The business must weigh the cost and time investment of primary research against the risk of launching a product based on incomplete or outdated secondary data.',
    },
    answerParagraphs: [
      {
        label: 'Para 1',
        html: '<strong>Primary market research</strong> involves collecting <strong>original, first-hand data</strong> directly from consumers or potential customers. <span class="ma-ann ma-ann-blue">K</span> Methods include <strong>surveys, interviews, focus groups, observation, and test marketing</strong>. <span class="ma-ann ma-ann-blue">K</span> For a business launching a new product, primary research can provide crucial insights into whether the product meets a genuine market need.',
      },
      {
        label: 'Para 2',
        html: 'A key benefit is that the data is <strong>specific to the business\'s needs</strong> and <strong>up-to-date</strong>. <span class="ma-ann ma-ann-amber">A</span> Unlike secondary research (which may be outdated or too general), primary research can be designed to answer the exact questions the business needs answered — for example, a <strong>tech start-up</strong> could survey 500 potential customers to test reactions to specific product features, pricing, and design before committing to full-scale production. <span class="ma-ann ma-ann-amber">A</span> The data is also <strong>exclusive to the firm</strong>, giving it a competitive advantage — rivals cannot access the same insights. <span class="ma-ann ma-ann-green">An</span> This reduces the risk of a costly product launch failure by identifying potential issues early. <span class="ma-ann ma-ann-green">An</span>',
      },
      {
        label: 'Para 3',
        html: 'However, primary research has significant <strong>limitations</strong>. It is typically <strong>expensive and time-consuming</strong> — designing questionnaires, recruiting participants, and analysing results can take weeks or months and cost thousands of pounds. <span class="ma-ann ma-ann-amber">A</span> For a start-up with limited funds, this represents a major <strong>opportunity cost</strong>. <span class="ma-ann ma-ann-green">An</span> Furthermore, <strong>small sample sizes may not be representative</strong> of the wider market, leading to misleading conclusions. Respondents may also give <strong>socially desirable answers</strong> rather than honest opinions — for example, stating they would buy a product in a survey but not actually purchasing it once launched. <span class="ma-ann ma-ann-green">An</span> Results may also be <strong>misinterpreted</strong> if the business lacks expertise in data analysis, leading to flawed product decisions despite the investment in research. <span class="ma-ann ma-ann-green">An</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge/Definition', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
      { code: 'An', label: 'Analysis', color: 'green' },
    ],
    examinerCommentary: 'This answer balances benefits and limitations with developed reasoning rather than simple lists. The tech start-up example grounds the analysis in the new product launch context. Note how limitations are not just stated but <em>explained</em> — social desirability bias is identified and its consequence (stated purchase intent vs actual behaviour) is developed. This depth of reasoning distinguishes top-band responses from mid-band answers that merely list pros and cons.',
    likelyScore: '7 / 8',
  },

  // ── 1.3 Marketing Mix & Strategy — 4 marks ──
  {
    id: 'marketing-mix-4',
    subject: 'business',
    unit: 1,
    sectionNumber: '1.3',
    sectionTitle: 'Marketing Mix & Strategy',
    marks: 4,
    type: 'Knowledge & Application',
    commandWord: 'Explain',
    question: 'Explain two elements of the marketing mix that a new clothing brand might use to attract customers.',
    markScheme: [
      { range: '1–2 marks', desc: 'Identification of two elements of the marketing mix (product, price, place, promotion)' },
      { range: '3–4 marks', desc: 'Application to a new clothing brand with explanation of how each element attracts customers' },
    ],
    peel: null,
    answerParagraphs: [
      {
        label: null,
        html: 'The <strong>marketing mix</strong> consists of the 4Ps: <strong>Product, Price, Place, and Promotion</strong>. <span class="ma-ann ma-ann-blue">K</span><br><br>First, <strong>promotion</strong> would be critical for a new clothing brand, as it needs to build <strong>brand awareness</strong> among its target market. <span class="ma-ann ma-ann-amber">A</span> The brand could use <strong>social media marketing</strong> — such as Instagram and TikTok influencer collaborations — to reach younger demographics cost-effectively, generating interest and driving traffic to its website. <span class="ma-ann ma-ann-amber">A</span><br><br>Second, <strong>price</strong> could be used strategically through <strong>penetration pricing</strong> — setting initially low prices to attract customers and build market share. <span class="ma-ann ma-ann-blue">K</span> For a new brand competing against established rivals, competitive pricing gives consumers an incentive to <strong>trial the product</strong>, and once brand loyalty is established, prices can be gradually raised. <span class="ma-ann ma-ann-amber">A</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge/Definition', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
    ],
    examinerCommentary: 'Full marks require <em>two clearly distinct elements</em> of the marketing mix, each applied to the context of a new clothing brand. Examiners penalise generic answers that don\'t reference the business context. Note how this answer names specific promotional channels (Instagram, TikTok) and a specific pricing strategy (penetration pricing) — this level of detail earns the application marks.',
    likelyScore: '4 / 4',
  },

  // ── 1.4 Managing People — 4 marks ──
  {
    id: 'motivation-maslow-4',
    subject: 'business',
    unit: 1,
    sectionNumber: '1.4',
    sectionTitle: 'Managing People',
    marks: 4,
    type: 'Knowledge & Application',
    commandWord: 'Explain',
    question: 'Explain Maslow\'s hierarchy of needs and its relevance to employee motivation.',
    markScheme: [
      { range: '1–2 marks', desc: 'Knowledge of Maslow\'s hierarchy (five levels of needs)' },
      { range: '3–4 marks', desc: 'Application to workplace motivation (how businesses can use it)' },
    ],
    peel: null,
    answerParagraphs: [
      {
        label: null,
        html: '<strong>Maslow\'s hierarchy of needs</strong> is a motivational theory that arranges human needs into <strong>five levels</strong>: <strong>physiological</strong> (food, shelter), <strong>safety</strong> (job security), <strong>social</strong> (belonging, teamwork), <strong>esteem</strong> (recognition, status), and <strong>self-actualisation</strong> (reaching full potential). <span class="ma-ann ma-ann-blue">K</span> Maslow argued that lower-level needs must be satisfied before higher-level needs become motivating. <span class="ma-ann ma-ann-blue">K</span><br><br>For businesses, this means that simply paying a fair wage (physiological/safety) is not enough to fully motivate employees. <span class="ma-ann ma-ann-amber">A</span> Once basic needs are met, managers should focus on creating a <strong>positive team environment</strong> (social needs), offering <strong>praise and promotion opportunities</strong> (esteem), and providing <strong>challenging, meaningful work</strong> (self-actualisation) to maximise motivation and productivity. <span class="ma-ann ma-ann-amber">A</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge/Definition', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
    ],
    examinerCommentary: 'Name all five levels for full knowledge marks. The application should link at least two levels to specific workplace examples. Avoid simply describing the theory without explaining its relevance to a business.',
    likelyScore: '4 / 4',
  },

  // ── 1.4 Managing People — 8 marks ──
  {
    id: 'recruitment-approaches-8',
    subject: 'business',
    unit: 1,
    sectionNumber: '1.4',
    sectionTitle: 'Managing People',
    marks: 8,
    type: 'Analysis',
    commandWord: 'Analyse',
    question: 'Analyse the advantages of internal recruitment compared to external recruitment.',
    markScheme: [
      { range: '1–2 marks', desc: 'Knowledge of internal and external recruitment' },
      { range: '3–5 marks', desc: 'Application of advantages of internal recruitment with business context' },
      { range: '6–8 marks', desc: 'Developed analysis comparing the two approaches and their implications' },
    ],
    peel: null,
    answerParagraphs: [
      {
        label: null,
        html: '<strong>Internal recruitment</strong> involves filling a vacancy from <strong>within the existing workforce</strong> (e.g. through promotion or redeployment), while <strong>external recruitment</strong> involves hiring from <strong>outside the organisation</strong> through job advertisements, agencies, or graduate schemes. <span class="ma-ann ma-ann-blue">K</span><br><br>A key advantage of internal recruitment is that it is <strong>faster and cheaper</strong>. <span class="ma-ann ma-ann-amber">A</span> There is no need to advertise externally, screen large numbers of applicants, or conduct lengthy induction training. The internal candidate already understands the <strong>company culture, systems, and processes</strong>, meaning they can become productive more quickly. <span class="ma-ann ma-ann-green">An</span><br><br>Internal recruitment also <strong>motivates existing staff</strong>. <span class="ma-ann ma-ann-amber">A</span> When employees see that promotion opportunities exist, they are incentivised to perform well and remain loyal to the company, <strong>reducing staff turnover</strong> and associated recruitment costs. This links to Maslow\'s esteem needs — recognition through promotion fulfils employees\' desire for status and achievement. <span class="ma-ann ma-ann-green">An</span><br><br>However, internal recruitment has a <strong>narrower talent pool</strong>, meaning the business may miss out on candidates with fresh perspectives, specialist skills, or experience from other industries. <span class="ma-ann ma-ann-green">An</span> It can also create a <strong>chain reaction</strong> of vacancies — promoting one employee creates a gap in their previous role that must also be filled. <span class="ma-ann ma-ann-amber">A</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge/Definition', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
      { code: 'An', label: 'Analysis', color: 'green' },
    ],
    examinerCommentary: 'The question asks about advantages of internal recruitment, but top-band answers also briefly acknowledge drawbacks to demonstrate balanced analysis. Linking to motivational theory (Maslow) shows cross-topic understanding that examiners reward.',
    likelyScore: '7 / 8',
  },

  // ── 1.5 Entrepreneurs & Leaders — 4 marks ──
  {
    id: 'entrepreneur-role-4',
    subject: 'business',
    unit: 1,
    sectionNumber: '1.5',
    sectionTitle: 'Entrepreneurs & Leaders',
    marks: 4,
    type: 'Knowledge & Application',
    commandWord: 'Explain',
    question: 'Explain the role of an entrepreneur in a business.',
    markScheme: [
      { range: '1–2 marks', desc: 'Definition/identification of an entrepreneur' },
      { range: '3–4 marks', desc: 'Explanation of key roles (risk-taking, organising resources, innovation) with examples' },
    ],
    peel: null,
    answerParagraphs: [
      {
        label: null,
        html: 'An <strong>entrepreneur</strong> is an individual who <strong>organises the factors of production</strong> (land, labour, capital) to create a business, taking on <strong>financial risk</strong> in the hope of making a profit. <span class="ma-ann ma-ann-blue">K</span><br><br>The entrepreneur has several key roles. First, they are a <strong>risk-taker</strong> — they invest their own capital (or borrow funds) with no guarantee of return, accepting the possibility of financial loss. <span class="ma-ann ma-ann-amber">A</span> Second, they are an <strong>innovator</strong>, identifying gaps in the market or developing new products and processes. For example, an entrepreneur might spot growing demand for plant-based food and launch a vegan restaurant. <span class="ma-ann ma-ann-amber">A</span> Third, they are a <strong>decision-maker</strong> who coordinates resources, manages staff, and sets the strategic direction of the business. <span class="ma-ann ma-ann-amber">A</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge/Definition', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
    ],
    examinerCommentary: 'Define the term first, then explain at least two distinct roles with development. A concrete example (even a brief one) pushes the answer into the top band by demonstrating application.',
    likelyScore: '4 / 4',
  },

  // ── 2.1 Raising Finance — 8 marks ──
  {
    id: 'sources-finance-8',
    subject: 'business',
    unit: 2,
    sectionNumber: '2.1',
    sectionTitle: 'Raising Finance',
    marks: 8,
    type: 'Analysis',
    commandWord: 'Analyse',
    question: 'Analyse the most appropriate sources of finance for a new start-up business.',
    markScheme: [
      { range: '1–2 marks', desc: 'Knowledge of different sources of finance' },
      { range: '3–5 marks', desc: 'Application to a start-up context (limited track record, high risk)' },
      { range: '6–8 marks', desc: 'Analysis of why certain sources are more appropriate than others for a start-up' },
    ],
    peel: null,
    answerParagraphs: [
      {
        label: null,
        html: 'A <strong>start-up business</strong> typically has <strong>limited trading history</strong>, no proven revenue stream, and higher risk — all of which restrict its financing options. <span class="ma-ann ma-ann-blue">K</span><br><br><strong>Personal savings</strong> are often the most accessible source because they do not require approval from a third party and involve <strong>no interest payments or loss of ownership</strong>. <span class="ma-ann ma-ann-amber">A</span> However, the amount available is limited by the entrepreneur\'s personal wealth, which may be insufficient to cover start-up costs such as premises, equipment, and initial stock. <span class="ma-ann ma-ann-green">An</span><br><br><strong>Bank loans</strong> provide a larger lump sum, but banks may be reluctant to lend to start-ups due to the <strong>high failure rate</strong> — approximately 60% of UK start-ups fail within the first three years. <span class="ma-ann ma-ann-amber">A</span> If approved, the entrepreneur must provide <strong>collateral</strong> (personal assets as security) and make fixed monthly repayments regardless of whether the business is generating revenue, creating <strong>cash flow pressure</strong> in the early months. <span class="ma-ann ma-ann-green">An</span><br><br><strong>Venture capital or angel investment</strong> offers substantial funding and often includes <strong>business expertise and mentoring</strong>. <span class="ma-ann ma-ann-amber">A</span> However, investors typically demand an <strong>equity stake</strong>, meaning the entrepreneur loses a share of ownership and future profits. This trade-off may be worthwhile if the investor\'s contacts and experience significantly increase the business\'s chances of survival. <span class="ma-ann ma-ann-green">An</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge/Definition', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
      { code: 'An', label: 'Analysis', color: 'green' },
    ],
    examinerCommentary: 'The best answers relate each source <em>specifically</em> to the start-up context rather than discussing sources of finance generically. Explaining <em>why</em> banks are cautious (high failure rate, no track record) demonstrates the analytical depth examiners reward at the top band.',
    likelyScore: '7 / 8',
  },

  // ── 2.2 Financial Planning — 8 marks ──
  {
    id: 'break-even-8',
    subject: 'business',
    unit: 2,
    sectionNumber: '2.2',
    sectionTitle: 'Financial Planning',
    marks: 8,
    type: 'Analysis',
    commandWord: 'Analyse',
    question: 'Analyse the usefulness of break-even analysis for a start-up business.',
    markScheme: [
      { range: '1–2 marks', desc: 'Knowledge: definition of break-even (TR = TC, or contribution method)' },
      { range: '3–4 marks', desc: 'Application: how a start-up would use it (planning, loan applications, pricing)' },
      { range: '5–8 marks', desc: 'Analysis: developed evaluation of benefits and limitations for a start-up context' },
    ],
    peel: {
      point: 'Break-even analysis shows a start-up the minimum output needed to cover costs.',
      evidence: 'E.g. a new café calculating that it must sell 200 coffees per day at £3.50 to cover rent, staff and ingredients.',
      explain: 'This helps with pricing decisions and gives banks confidence when assessing loan applications, as it shows financial awareness.',
      link: 'However, break-even assumes constant costs and prices, which may not hold for a start-up facing uncertain demand and changing supplier costs.',
    },
    answerParagraphs: [
      {
        label: 'Para 1',
        html: '<strong>Break-even analysis</strong> identifies the level of output at which <strong>total revenue equals total costs</strong> (TR = TC), meaning the business makes neither a profit nor a loss. <span class="ma-ann ma-ann-blue">K</span> The break-even point can be calculated as <em>Fixed Costs ÷ Contribution per Unit</em>, where contribution = selling price − variable cost per unit. <span class="ma-ann ma-ann-blue">K</span>',
      },
      {
        label: 'Para 2',
        html: 'For a start-up, break-even analysis is useful because it provides a <strong>clear financial target</strong>. <span class="ma-ann ma-ann-green">An</span> For example, a new café could calculate that it needs to sell <strong>200 coffees per day</strong> at £3.50 to cover fixed costs (rent, equipment) and variable costs (ingredients, cups). <span class="ma-ann ma-ann-amber">A</span> This target helps the entrepreneur assess whether the business is <strong>viable</strong> before committing significant capital. It is also valuable when <strong>applying for bank loans</strong> or investor funding, as it demonstrates the founder\'s financial literacy and planning capability. <span class="ma-ann ma-ann-green">An</span>',
      },
      {
        label: 'Para 3',
        html: 'Furthermore, break-even analysis supports <strong>pricing decisions</strong> — a start-up can model different price points to see how each affects the break-even quantity, helping to choose a price that balances <strong>competitiveness with profitability</strong>. <span class="ma-ann ma-ann-green">An</span> However, break-even has significant <strong>limitations</strong> for start-ups. It assumes that <strong>all output is sold</strong>, that costs can be neatly separated into fixed and variable, and that <strong>prices remain constant</strong>. <span class="ma-ann ma-ann-green">An</span> In reality, a start-up faces highly <strong>uncertain demand</strong>, may need to offer discounts to attract early customers, and may experience changing supplier costs. The model also ignores <strong>cash flow timing</strong> — a business can break even on paper but still fail if revenues arrive after expenses are due. <span class="ma-ann ma-ann-green">An</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
      { code: 'An', label: 'Analysis chain', color: 'green' },
    ],
    examinerCommentary: 'This answer earns top marks by balancing <em>benefits and limitations</em> of break-even analysis, applied specifically to a start-up context. The café example provides concrete application. Note how the limitations are not just listed but explained — the assumption that "all output is sold" is problematic because a start-up faces "highly uncertain demand." This level of developed reasoning is what examiners look for in 8-mark analysis questions.',
    likelyScore: '7–8 / 8',
  },

  // ── 2.3 Managing Finance — 4 marks ──
  {
    id: 'liquidity-ratios-4',
    subject: 'business',
    unit: 2,
    sectionNumber: '2.3',
    sectionTitle: 'Managing Finance',
    marks: 4,
    type: 'Knowledge & Application',
    commandWord: 'Explain',
    question: 'Explain what is meant by liquidity and why it is important to a business.',
    markScheme: [
      { range: '1–2 marks', desc: 'Definition of liquidity (ability to meet short-term debts / convert assets to cash)' },
      { range: '3–4 marks', desc: 'Application showing why liquidity matters (paying suppliers, wages, avoiding insolvency)' },
    ],
    peel: null,
    answerParagraphs: [
      {
        label: null,
        html: '<strong>Liquidity</strong> refers to a business\'s ability to <strong>meet its short-term financial obligations</strong> as they fall due. <span class="ma-ann ma-ann-blue">K</span> It can also refer to how easily an asset can be <strong>converted into cash</strong> without significant loss of value — cash is the most liquid asset, while property is relatively illiquid. <span class="ma-ann ma-ann-blue">K</span><br><br>Liquidity is crucial because even a <strong>profitable business can fail</strong> if it cannot pay its bills on time. <span class="ma-ann ma-ann-amber">A</span> A business must have sufficient cash or near-cash assets to cover day-to-day expenses such as <strong>supplier invoices, wages, rent, and loan repayments</strong>. If it cannot, suppliers may refuse to deliver, staff may leave, and creditors may take legal action — potentially forcing the business into <strong>insolvency</strong>. <span class="ma-ann ma-ann-amber">A</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge/Definition', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
    ],
    examinerCommentary: 'The key distinction examiners look for is that <em>profit and liquidity are not the same thing</em>. A business can be profitable on paper but cash-poor in practice. Mentioning this explicitly earns top marks.',
    likelyScore: '4 / 4',
  },

  // ── 2.3 Managing Finance — 8 marks ──
  {
    id: 'cash-flow-management-8',
    subject: 'business',
    unit: 2,
    sectionNumber: '2.3',
    sectionTitle: 'Managing Finance',
    marks: 8,
    type: 'Analysis',
    commandWord: 'Analyse',
    question: 'Analyse how a business might improve its cash flow position.',
    markScheme: [
      { range: '1–2 marks', desc: 'Knowledge of cash flow (inflows and outflows of cash over time)' },
      { range: '3–5 marks', desc: 'Application of specific methods to improve cash flow' },
      { range: '6–8 marks', desc: 'Developed analysis of how each method works and its potential drawbacks' },
    ],
    peel: null,
    answerParagraphs: [
      {
        label: null,
        html: '<strong>Cash flow</strong> is the movement of <strong>money into and out of a business</strong> over a given period. A business improves its cash flow by <strong>increasing inflows</strong>, <strong>reducing outflows</strong>, or <strong>improving the timing</strong> of both. <span class="ma-ann ma-ann-blue">K</span><br><br>One approach is to <strong>reduce credit terms offered to customers</strong> — for example, changing from 60-day to 30-day payment terms. <span class="ma-ann ma-ann-amber">A</span> This accelerates cash inflows, but risks losing customers who prefer longer credit periods, particularly in B2B markets where extended credit is standard practice. <span class="ma-ann ma-ann-green">An</span><br><br>A business could also <strong>negotiate longer payment terms with suppliers</strong>, delaying cash outflows. <span class="ma-ann ma-ann-amber">A</span> This effectively uses the supplier as a source of free short-term finance. However, this may damage the relationship with suppliers, who might respond by <strong>increasing prices</strong> or prioritising other customers\' orders. <span class="ma-ann ma-ann-green">An</span><br><br>Another method is <strong>sale and leaseback</strong> of assets — selling owned assets (e.g. vehicles, property) and leasing them back. <span class="ma-ann ma-ann-amber">A</span> This provides an immediate cash injection but creates an ongoing <strong>lease expense</strong> that increases costs in the long run. The business also loses the asset from its balance sheet, which may affect its ability to secure future loans using those assets as collateral. <span class="ma-ann ma-ann-green">An</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge/Definition', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
      { code: 'An', label: 'Analysis', color: 'green' },
    ],
    examinerCommentary: 'Top-band analysis requires showing the <em>trade-off</em> of each method — not just stating what can be done, but examining the consequences. Three well-developed methods are better than five briefly mentioned ones.',
    likelyScore: '7 / 8',
  },

  // ── 2.4 Resource Management — 8 marks ──
  {
    id: 'lean-production-8',
    subject: 'business',
    unit: 2,
    sectionNumber: '2.4',
    sectionTitle: 'Resource Management',
    marks: 8,
    type: 'Analysis',
    commandWord: 'Analyse',
    question: 'Analyse the benefits and risks of adopting lean production methods such as just-in-time (JIT).',
    markScheme: [
      { range: '1–2 marks', desc: 'Knowledge of lean production and JIT (minimising waste, holding zero/minimal stock)' },
      { range: '3–5 marks', desc: 'Application of benefits (reduced costs, less waste) and risks (supply disruption)' },
      { range: '6–8 marks', desc: 'Developed analysis of conditions needed for success and consequences of failure' },
    ],
    peel: null,
    answerParagraphs: [
      {
        label: null,
        html: '<strong>Lean production</strong> aims to <strong>minimise waste</strong> at every stage of the production process. <strong>Just-in-time (JIT)</strong> is a key lean method where materials are delivered <strong>only when needed</strong> in the production process, eliminating the need to hold large stocks. <span class="ma-ann ma-ann-blue">K</span><br><br>A major benefit is the <strong>reduction in stockholding costs</strong> — the business saves on warehousing, insurance, and the risk of stock becoming obsolete or damaged. <span class="ma-ann ma-ann-amber">A</span> This frees up working capital that can be invested elsewhere in the business, improving <strong>cash flow and profitability</strong>. Lean methods also encourage a culture of <strong>continuous improvement (kaizen)</strong>, where employees identify and eliminate inefficiencies. <span class="ma-ann ma-ann-green">An</span><br><br>However, JIT is <strong>highly vulnerable to supply chain disruptions</strong>. <span class="ma-ann ma-ann-amber">A</span> If a supplier delivers late or a key component is unavailable, the entire production line can halt because there is <strong>no buffer stock</strong> to absorb the delay. This was demonstrated during the COVID-19 pandemic when global supply chain disruptions caused major production stoppages for manufacturers using JIT. <span class="ma-ann ma-ann-green">An</span> JIT also requires <strong>reliable, flexible suppliers</strong> who can deliver small quantities frequently, and a highly organised production schedule. These conditions are easier to achieve for large firms like Toyota (which pioneered JIT) than for small businesses with less bargaining power over suppliers. <span class="ma-ann ma-ann-green">An</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge/Definition', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
      { code: 'An', label: 'Analysis', color: 'green' },
    ],
    examinerCommentary: 'Examiners reward real-world examples (COVID-19, Toyota) and analysis of the <em>conditions</em> under which lean production works. Simply listing benefits and risks without development limits the mark to the middle band.',
    likelyScore: '7 / 8',
  },

  // ── 2.5 External Influences — 20 marks ──
  {
    id: 'interest-rate-retail-20',
    subject: 'business',
    unit: 2,
    sectionNumber: '2.5',
    sectionTitle: 'External Influences',
    marks: 20,
    type: 'Evaluation Essay',
    commandWord: 'Evaluate',
    question: 'Evaluate the impact of an increase in interest rates on a UK retail business.',
    markScheme: [
      { range: 'AO1 (4 marks)', desc: 'Knowledge of interest rates and their mechanisms (borrowing costs, saving incentive, exchange rate)' },
      { range: 'AO2 (4 marks)', desc: 'Application — use of relevant retail context, data or examples' },
      { range: 'AO3 (6 marks)', desc: 'Analysis — developed chains of reasoning for multiple impacts on the business' },
      { range: 'AO4 (6 marks)', desc: 'Evaluation — weighing impacts, considering context (type of retailer, magnitude of rise), justified conclusion' },
    ],
    peel: {
      point: 'Higher interest rates increase borrowing costs for both the business and its customers.',
      evidence: 'E.g. a UK high-street fashion retailer sees reduced consumer spending as mortgage costs rise.',
      explain: 'Consumers have less disposable income → demand for non-essential goods falls → revenue declines. The business also faces higher loan repayments on any variable-rate debt.',
      link: 'The severity depends on whether the retailer sells necessities or luxuries, and whether it is heavily leveraged.',
    },
    answerParagraphs: [
      {
        label: 'Introduction',
        html: 'An increase in <strong>interest rates</strong> — the cost of borrowing money — affects businesses through multiple channels: the cost of debt, consumer spending patterns, and the exchange rate. <span class="ma-ann ma-ann-blue">K</span> For a UK retail business, the impact depends on the <strong>type of products sold</strong>, the <strong>firm\'s financial structure</strong>, and the <strong>magnitude of the rate rise</strong>. <span class="ma-ann ma-ann-green">An</span>',
      },
      {
        label: 'Argument 1 — Reduced Consumer Demand',
        html: 'The most significant impact is likely to be a <strong>fall in consumer spending</strong>. <span class="ma-ann ma-ann-green">An</span> Higher interest rates increase <strong>mortgage repayments</strong> for homeowners on variable-rate deals, reducing their <strong>disposable income</strong>. <span class="ma-ann ma-ann-amber">A</span> Consumers also face higher costs on credit cards and personal loans, further constraining spending power. For a <strong>fashion retailer</strong> selling non-essential goods, this is particularly damaging — clothing is typically <strong>income elastic</strong>, meaning demand falls more than proportionally when disposable income drops. <span class="ma-ann ma-ann-green">An</span> The retailer may see <strong>declining footfall and revenue</strong>, potentially requiring markdowns to clear unsold stock, which would compress <strong>profit margins</strong>. <span class="ma-ann ma-ann-green">An</span>',
      },
      {
        label: 'Argument 2 — Higher Business Costs',
        html: 'The retail business itself may be directly affected if it has <strong>outstanding variable-rate loans</strong>. <span class="ma-ann ma-ann-green">An</span> Higher interest repayments increase <strong>fixed costs</strong>, raising the <strong>break-even point</strong> and reducing profitability. <span class="ma-ann ma-ann-green">An</span> A business planning to <strong>expand or invest</strong> (e.g. opening new stores, investing in e-commerce) may postpone these plans because the higher cost of borrowing reduces the <strong>expected return on investment</strong>. <span class="ma-ann ma-ann-amber">A</span> This could limit long-term competitiveness.',
      },
      {
        label: 'Evaluation',
        html: 'However, the impact is <strong>not uniformly negative</strong>. A <strong>supermarket</strong> selling everyday essentials would be less affected, as demand for food is <strong>price and income inelastic</strong> — consumers cannot easily cut back on grocery spending. <span class="ma-ann ma-ann-green">An</span> Furthermore, a <strong>luxury retailer</strong> targeting wealthy customers may be relatively insulated, as high-income earners are less sensitive to interest rate changes. <span class="ma-ann ma-ann-green">An</span> The severity also depends on the <strong>magnitude</strong> of the rate rise — a 0.25% increase has a much smaller effect than a 2% increase — and whether the rise was <strong>anticipated</strong> by consumers, in which case spending adjustments may already have been made. <span class="ma-ann ma-ann-green">An</span>',
      },
      {
        label: 'Conclusion',
        html: 'On balance, an increase in interest rates is likely to have a <strong>negative impact on most UK retail businesses</strong>, primarily through reduced consumer spending and higher borrowing costs. The impact is most severe for retailers selling <strong>non-essential, income-elastic goods</strong> and those with <strong>significant debt</strong>. However, the effect is moderated by the <strong>type of retailer, the size of the rate change, and the overall economic context</strong>. Businesses can mitigate the impact through <strong>cost control, diversification into online channels</strong>, and focusing on <strong>value propositions</strong> that appeal to more price-conscious consumers. <span class="ma-ann ma-ann-green">An</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
      { code: 'An', label: 'Analysis chain', color: 'green' },
    ],
    examinerCommentary: 'This answer reaches the top band by providing a <em>nuanced, context-sensitive evaluation</em>. Note how it distinguishes between different types of retailers (fashion vs supermarket vs luxury) — this is the contextual depth examiners reward at AO4. The evaluation considers magnitude, type of retailer, and consumer expectations. The conclusion avoids a blanket verdict by identifying the conditions under which the impact would be most and least severe. For full 20 marks, using specific data (e.g. Bank of England base rate changes) would further strengthen AO2.',
    likelyScore: '18–20 / 20',
  },
];

/* ── FAQ data for main /model-answers page SEO schema ── */
export const MODEL_ANSWERS_FAQ = [
  {
    question: 'How do you write a 20-mark essay for Edexcel IAL Economics?',
    answer: 'A 20-mark IAL Economics essay requires: a clear introduction defining key terms, two to three developed arguments with data/examples, counter-arguments with evaluation, and a justified conclusion. Use the PEEL structure (Point, Evidence, Explain, Link) for each paragraph and end with a balanced evaluative judgement.',
  },
  {
    question: 'What is the mark scheme structure for Edexcel IAL Business 8-mark questions?',
    answer: 'Edexcel IAL Business 8-mark questions award marks across Knowledge (1-2 marks), Application to context (2-3 marks), and Analysis/Explanation (3-4 marks). You must use the case study context and develop a chain of reasoning to access the higher mark bands.',
  },
  {
    question: 'What is the PEEL structure for Economics essays?',
    answer: 'PEEL stands for Point, Evidence, Explain, Link. Make a clear analytical point, support it with evidence or economic theory, explain the mechanism using chains of reasoning, then link back to the question or evaluate the point. This structure helps build the developed analysis that examiners reward.',
  },
];

/* ── Section-specific FAQ data for per-section SEO pages ── */
export const SECTION_MODEL_ANSWERS_FAQ = {
  '1.3.1': [
    { question: 'What is the economic problem of scarcity?', answer: 'Scarcity is the fundamental economic problem arising because human wants are unlimited but the resources available to satisfy them (land, labour, capital, enterprise) are finite. Because of scarcity, societies must make choices about how to allocate resources, which creates opportunity cost.' },
    { question: 'How do you define opportunity cost for Edexcel IAL Economics?', answer: 'Opportunity cost is the next best alternative forgone when a choice is made. For example, if a government spends £50bn on a rail project, the opportunity cost is the hospitals, schools, or tax cuts that money could have funded. Always specify "next best alternative" — not just "what you give up."' },
  ],
  '1.3.2': [
    { question: 'How do you answer a PED question in Edexcel IAL Economics?', answer: 'Define PED as the responsiveness of quantity demanded to a change in price. State the formula (% change in Qd ÷ % change in P), distinguish between elastic (>1) and inelastic (<1) demand, and apply to a real-world example showing how PED affects a firm\'s pricing and revenue decisions.' },
    { question: 'Why is price elasticity of demand important to businesses?', answer: 'PED determines whether raising prices increases or decreases total revenue. With inelastic demand (PED < 1), a price rise increases revenue. With elastic demand (PED > 1), a price rise decreases revenue as customers switch to substitutes. Businesses use PED to set optimal prices and forecast revenue.' },
  ],
  '1.3.3': [
    { question: 'What is price elasticity of supply (PES)?', answer: 'PES measures the responsiveness of quantity supplied to a change in price. It is calculated as % change in quantity supplied ÷ % change in price. If PES > 1, supply is elastic (responsive to price changes). If PES < 1, supply is inelastic (unresponsive). Key factors affecting PES include spare capacity, time period, availability of raw materials, and ease of storing stock.' },
    { question: 'What causes a shift in the supply curve?', answer: 'Supply shifts right (increases) when production costs fall, technology improves, subsidies are introduced, or new firms enter the market. Supply shifts left (decreases) when costs rise (e.g. raw materials, wages), indirect taxes are imposed, or regulations increase. A change in price causes a movement along the supply curve, not a shift.' },
  ],
  '1.3.4': [
    { question: 'What happens when a maximum price is set below equilibrium?', answer: 'A maximum price (price ceiling) set below the equilibrium creates excess demand — a shortage. At the lower price, quantity demanded exceeds quantity supplied. This leads to non-price rationing (queues, waiting lists), potential black markets, and reduced supply quality in the long run as producers face lower profit margins.' },
    { question: 'How do you draw a maximum price diagram for Edexcel IAL?', answer: 'Draw a standard supply and demand diagram. Mark the equilibrium price (Pe) and quantity (Qe). Draw a horizontal line below Pe labelled Pmax. At Pmax, read off Qs (on the supply curve) and Qd (on the demand curve). The horizontal distance between Qs and Qd is the shortage. Label the shortage clearly.' },
  ],
  '1.3.5': [
    { question: 'How do you explain a negative externality for Edexcel IAL Economics?', answer: 'Define a negative externality as a spill-over cost imposed on third parties not involved in the transaction. Give a specific example (e.g. factory pollution causing health problems for local residents). Explain that because external costs are not reflected in the market price, the good is over-produced relative to the socially optimal level.' },
    { question: 'What is the difference between private costs and social costs?', answer: 'Private costs are costs borne by the producer or consumer in a transaction. Social costs include private costs plus any external costs imposed on third parties. When social costs exceed private costs, a negative externality exists, and the market over-produces the good because firms only consider their private costs when making production decisions.' },
  ],
  '1.3.6': [
    { question: 'How does an indirect tax correct market failure?', answer: 'An indirect tax raises the cost of production, shifting the supply curve left. This increases the market price and reduces the quantity consumed, moving output closer to the socially optimal level. The tax internalises the external cost by making the price reflect the true social cost of the good.' },
    { question: 'What are the limitations of indirect taxes as a government intervention?', answer: 'Indirect taxes may be ineffective if demand is price inelastic, as consumption barely falls. They are regressive — low-income consumers pay a higher proportion of their income. Setting the correct tax rate is difficult due to information failure about the exact size of the externality. Taxes may also encourage black market activity.' },
  ],
  '2.3.1': [
    { question: 'How does the CPI measure inflation?', answer: 'The Consumer Price Index (CPI) measures inflation by tracking the prices of a representative basket of approximately 700 goods and services, weighted by typical household spending patterns. The basket is updated annually to reflect changing consumption habits. CPI compares current prices to a base year (index = 100) — if CPI rises from 100 to 103, the inflation rate is 3%.' },
    { question: 'What are the main types of unemployment?', answer: 'The main types are: cyclical (demand-deficient) unemployment caused by falls in aggregate demand during recessions; structural unemployment from skills mismatches due to changing industry structure; frictional unemployment from workers being between jobs; and seasonal unemployment from time-dependent demand. Each type requires different policy responses.' },
  ],
  '2.3.2': [
    { question: 'What are the components of aggregate demand?', answer: 'Aggregate demand (AD) = C + I + G + (X − M), where C is consumer spending, I is investment by firms, G is government spending, and (X − M) is net exports (exports minus imports). A change in any component shifts the AD curve.' },
    { question: 'What causes the AD curve to shift right?', answer: 'AD shifts right when total spending increases. Common causes include: lower interest rates (increases C and I), tax cuts (increases disposable income and C), increased government spending (G rises), a weaker exchange rate (boosts X, reduces M), or rising consumer confidence (increases C).' },
  ],
  '2.3.3': [
    { question: 'What is the difference between SRAS and LRAS?', answer: 'Short-run aggregate supply (SRAS) shows the total output firms are willing to supply at different price levels, given fixed input costs. Long-run aggregate supply (LRAS) represents the economy\'s maximum productive capacity at full employment. SRAS can shift due to input cost changes; LRAS shifts when the productive capacity of the economy changes (e.g. through investment, education, or technological progress).' },
    { question: 'How do supply-side policies shift LRAS?', answer: 'Supply-side policies increase the economy\'s productive potential. Education and training raise human capital and labour productivity. Deregulation increases competition and efficiency. Lower corporation tax incentivises investment in capital. Infrastructure spending reduces transport costs. All these increase potential output, shifting LRAS rightward and enabling non-inflationary growth.' },
  ],
  '2.3.4': [
    { question: 'What is the circular flow of income model?', answer: 'The circular flow of income shows how money flows between households and firms. Households provide factors of production to firms and receive factor incomes (wages, rent, interest, profit). Households spend income on goods and services. Injections (investment, government spending, exports) add to the flow; withdrawals (saving, taxation, imports) remove from it.' },
    { question: 'What happens when injections exceed withdrawals?', answer: 'When total injections (I + G + X) exceed total withdrawals (S + T + M), national income rises. This increase is amplified by the multiplier effect — each round of spending generates further income and consumption. Conversely, when withdrawals exceed injections, national income contracts. Equilibrium occurs when injections equal withdrawals.' },
  ],
  '2.3.5': [
    { question: 'What is the difference between actual and potential economic growth?', answer: 'Actual growth is an increase in real GDP, caused by rising aggregate demand using existing spare capacity. Potential growth is an increase in the economy\'s productive capacity (LRAS shifts right), caused by supply-side improvements such as better technology, education, or infrastructure. A country can have one without the other.' },
    { question: 'How do supply-side policies promote long-term economic growth?', answer: 'Supply-side policies increase productive capacity by improving factors of production. Education and training raise human capital and productivity. Deregulation increases competition and efficiency. Lower corporation tax incentivises investment. Infrastructure spending reduces costs. These shift LRAS rightward, enabling non-inflationary growth — but benefits typically take years to materialise.' },
  ],
  '2.3.6': [
    { question: 'What is the difference between fiscal and monetary policy?', answer: 'Fiscal policy involves government decisions on taxation and public spending to influence aggregate demand. It is set by the government. Monetary policy involves changes to interest rates and the money supply to achieve macroeconomic objectives. In the UK, it is set by the Bank of England\'s Monetary Policy Committee (MPC), independent of government.' },
    { question: 'When is fiscal policy more effective than monetary policy?', answer: 'Fiscal policy tends to be more effective during severe recessions when interest rates are at the zero lower bound (making further rate cuts ineffective), when unemployment is structural (requiring targeted government spending on retraining), or when monetary policy transmission is weak (e.g. banks not passing on rate cuts to borrowers).' },
  ],
  '1.1': [
    { question: 'What is market segmentation in business?', answer: 'Market segmentation is dividing a market into distinct groups of consumers who share similar characteristics or needs — for example, by age, income, location, or lifestyle. It allows businesses to target their marketing mix more precisely at each group, increasing the likelihood of meeting customer needs and boosting sales.' },
    { question: 'Why is meeting customer needs important for a business?', answer: 'Meeting customer needs is essential because it drives sales, builds customer loyalty, and generates repeat business. A business that understands what customers want can design products, set prices, and choose distribution channels that align with those needs, giving it a competitive advantage over rivals that take a less targeted approach.' },
  ],
  '1.2': [
    { question: 'What is the difference between primary and secondary market research?', answer: 'Primary research involves collecting original, first-hand data directly from consumers through methods like surveys, interviews, and focus groups. Secondary research uses existing data that has already been collected by others, such as government statistics, trade reports, and competitor websites. Primary is more specific but expensive; secondary is cheaper but may be outdated or too general.' },
    { question: 'What are the limitations of primary market research?', answer: 'Primary research is expensive and time-consuming to conduct. Small sample sizes may not be representative of the wider market. Respondents may give socially desirable answers rather than honest opinions. Results can be misinterpreted without proper data analysis expertise. For start-ups with limited budgets, the cost may be prohibitive.' },
  ],
  '1.3': [
    { question: 'What are the 4Ps of the marketing mix?', answer: 'The 4Ps are Product (design, features, quality, branding), Price (pricing strategy — penetration, skimming, competitive, cost-plus), Place (distribution channels — online, retail, wholesale), and Promotion (advertising, sales promotions, PR, social media marketing). Businesses must coordinate all four elements for an effective marketing strategy.' },
    { question: 'How should a new business use the marketing mix?', answer: 'A new business should focus on building awareness through targeted Promotion (social media, influencer marketing). Price strategy might use penetration pricing to attract initial customers. Place should prioritise online channels to minimise costs. The Product must have a clear USP to differentiate from established competitors.' },
  ],
  '1.4': [
    { question: 'What is Maslow\'s hierarchy of needs?', answer: 'Maslow\'s hierarchy arranges human needs into five levels: physiological (food, shelter), safety (job security), social (belonging, teamwork), esteem (recognition, status), and self-actualisation (reaching full potential). Lower-level needs must be satisfied before higher-level needs become motivating factors for employees.' },
    { question: 'What are the advantages of internal recruitment?', answer: 'Internal recruitment is faster and cheaper than external recruitment — no advertising or lengthy induction needed. The candidate already knows the company culture and processes. It also motivates existing staff by showing that promotion opportunities exist, improving retention and reducing turnover costs.' },
  ],
  '1.5': [
    { question: 'What is the role of an entrepreneur?', answer: 'An entrepreneur organises the factors of production (land, labour, capital) to create a business, taking on financial risk in hope of profit. Key roles include: risk-taker (investing capital with no guaranteed return), innovator (spotting market gaps and developing new products), and decision-maker (coordinating resources and setting strategic direction).' },
    { question: 'What qualities make a successful entrepreneur?', answer: 'Successful entrepreneurs typically demonstrate: willingness to take calculated risks, creativity and innovation, determination and resilience, strong communication and leadership skills, financial awareness, and the ability to spot and exploit market opportunities. They must also be adaptable and willing to learn from failure.' },
  ],
  '2.1': [
    { question: 'What are the main sources of finance for a start-up?', answer: 'Key sources include: personal savings (no interest or loss of ownership), bank loans (larger sums but require collateral and fixed repayments), venture capital/angel investors (substantial funding plus expertise but require equity stake), crowdfunding (raises awareness but uncertain outcome), and government grants (free money but competitive and restrictive).' },
    { question: 'Why might banks be reluctant to lend to start-ups?', answer: 'Start-ups have no trading history to demonstrate profitability, a high failure rate (around 60% fail within three years), limited collateral to secure the loan, and uncertain cash flows making repayment risky. Banks prefer lending to established businesses with proven revenue streams and valuable assets.' },
  ],
  '2.2': [
    { question: 'How do you calculate the break-even point?', answer: 'Break-even output = Fixed Costs ÷ Contribution per Unit, where Contribution per Unit = Selling Price − Variable Cost per Unit. For example, if fixed costs are £10,000, selling price is £25, and variable cost is £15, then contribution = £10 and break-even = 1,000 units.' },
    { question: 'What are the limitations of break-even analysis?', answer: 'Break-even analysis assumes all output is sold, costs can be neatly split into fixed and variable, prices remain constant, and there is only one product. In reality, businesses face fluctuating demand, semi-variable costs, price changes, and multiple product lines. It also ignores cash flow timing — a business can break even on paper but fail if payments are delayed.' },
  ],
  '2.3': [
    { question: 'What is liquidity and why does it matter?', answer: 'Liquidity is a business\'s ability to meet its short-term financial obligations as they fall due. It matters because even a profitable business can fail if it cannot pay suppliers, wages, or loan repayments on time. Poor liquidity can lead to insolvency, damaged supplier relationships, and loss of key staff.' },
    { question: 'How can a business improve its cash flow?', answer: 'Methods include: reducing credit terms offered to customers (faster inflows), negotiating longer payment terms with suppliers (delayed outflows), sale and leaseback of assets (immediate cash injection), destocking (reducing tied-up capital), factoring invoices (selling debts to a third party for immediate cash), and improving stock management.' },
  ],
  '2.4': [
    { question: 'What is lean production?', answer: 'Lean production aims to minimise waste at every stage of the production process. Key methods include just-in-time (JIT) delivery, kaizen (continuous improvement), cell production, and quality circles. The goal is to reduce costs, improve quality, and increase efficiency by eliminating activities that do not add value for the customer.' },
    { question: 'What are the risks of just-in-time (JIT) production?', answer: 'JIT is vulnerable to supply chain disruptions — if a supplier delivers late, the entire production line can halt because there is no buffer stock. It requires reliable, flexible suppliers and a highly organised production schedule. Small businesses may lack the bargaining power to demand frequent small deliveries from suppliers.' },
  ],
  '2.5': [
    { question: 'How do interest rates affect businesses?', answer: 'Higher interest rates increase the cost of borrowing for businesses (higher loan repayments), reduce consumer spending (higher mortgage and credit card costs reduce disposable income), strengthen the exchange rate (making exports more expensive), and increase the incentive to save rather than spend. These effects reduce demand and increase costs for most businesses.' },
    { question: 'What external factors affect business performance?', answer: 'Key external influences include: economic factors (interest rates, exchange rates, inflation, unemployment), political and legal factors (legislation, taxation, trade policy), social factors (demographic changes, consumer trends), technological change (automation, e-commerce), and competitive pressures. Businesses must monitor and adapt to these PESTLE factors.' },
  ],
};

/* ── Section metadata for hierarchical browse filter ── */
export const MODEL_ANSWERS_SECTIONS = {
  economics: {
    label: 'Economics',
    units: {
      1: {
        label: 'Unit 1: Markets in Action',
        sections: [
          { number: '1.3.1', title: 'Introductory Concepts' },
          { number: '1.3.2', title: 'Consumer Demand' },
          { number: '1.3.3', title: 'Supply' },
          { number: '1.3.4', title: 'Price Determination' },
          { number: '1.3.5', title: 'Market Failure' },
          { number: '1.3.6', title: 'Government Intervention' },
        ],
      },
      2: {
        label: 'Unit 2: Macroeconomic Performance & Policy',
        sections: [
          { number: '2.3.1', title: 'Measures of Economic Performance' },
          { number: '2.3.2', title: 'Aggregate Demand' },
          { number: '2.3.3', title: 'Aggregate Supply' },
          { number: '2.3.4', title: 'National Income' },
          { number: '2.3.5', title: 'Economic Growth' },
          { number: '2.3.6', title: 'Macroeconomic Policies' },
        ],
      },
    },
  },
  business: {
    label: 'Business',
    units: {
      1: {
        label: 'Unit 1: Marketing & People',
        sections: [
          { number: '1.1', title: 'Meeting Customer Needs' },
          { number: '1.2', title: 'The Market' },
          { number: '1.3', title: 'Marketing Mix & Strategy' },
          { number: '1.4', title: 'Managing People' },
          { number: '1.5', title: 'Entrepreneurs & Leaders' },
        ],
      },
      2: {
        label: 'Unit 2: Managing Business Activities',
        sections: [
          { number: '2.1', title: 'Raising Finance' },
          { number: '2.2', title: 'Financial Planning' },
          { number: '2.3', title: 'Managing Finance' },
          { number: '2.4', title: 'Resource Management' },
          { number: '2.5', title: 'External Influences' },
        ],
      },
    },
  },
};

/* ── Links map: section number → SEO page URL (for Practice tab) ── */
export const SECTION_MODEL_ANSWERS_LINKS = {
  // Economics
  '1.3.1': '/economics/introductory-concepts-model-answers',
  '1.3.2': '/economics/demand-model-answers',
  '1.3.3': '/economics/supply-model-answers',
  '1.3.4': '/economics/price-determination-model-answers',
  '1.3.5': '/economics/market-failure-model-answers',
  '1.3.6': '/economics/government-intervention-model-answers',
  '2.3.1': '/economics/economic-performance-model-answers',
  '2.3.2': '/economics/aggregate-demand-model-answers',
  '2.3.3': '/economics/aggregate-supply-model-answers',
  '2.3.4': '/economics/national-income-model-answers',
  '2.3.5': '/economics/economic-growth-model-answers',
  '2.3.6': '/economics/macroeconomic-policies-model-answers',
  // Business
  '1.1': '/business/meeting-customer-needs-model-answers',
  '1.2': '/business/the-market-model-answers',
  '1.3': '/business/marketing-mix-model-answers',
  '1.4': '/business/managing-people-model-answers',
  '1.5': '/business/entrepreneurs-leaders-model-answers',
  '2.1': '/business/raising-finance-model-answers',
  '2.2': '/business/financial-planning-model-answers',
  '2.3': '/business/managing-finance-model-answers',
  '2.4': '/business/resource-management-model-answers',
  '2.5': '/business/external-influences-model-answers',
};
