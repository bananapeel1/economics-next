/**
 * Model Answers Expansion — 42 new answers to bring total from 28 to 70.
 * Covers Economics Units 1–4 and Business Units 1–2 gaps.
 * Each answer matches the exact schema in modelAnswersData.js.
 */

export const EXPANSION_ANSWERS = [

  // ══════════════════════════════════════════════════════════════
  // ECONOMICS UNIT 1 — GAPS: 8m and 20m answers
  // ══════════════════════════════════════════════════════════════

  // ── 1.3.1 Introductory Concepts — 8 marks ──
  {
    id: 'ppf-economic-growth-8',
    subject: 'economics',
    unit: 1,
    sectionNumber: '1.3.1',
    sectionTitle: 'Introductory Concepts',
    marks: 8,
    type: 'Analysis',
    commandWord: 'Analyse',
    question: 'Analyse how a production possibility frontier (PPF) diagram can be used to illustrate economic growth.',
    markScheme: [
      { range: '1–2 marks', desc: 'Knowledge: definition of PPF and/or economic growth' },
      { range: '3–4 marks', desc: 'Application: outward shift represents increased productive capacity' },
      { range: '5–8 marks', desc: 'Analysis: causes of shift (investment, technology, education), distinction between actual and potential growth, movement to vs shift of PPF' },
    ],
    peel: {
      point: 'Economic growth can be shown as a movement toward the PPF or an outward shift of the entire curve.',
      evidence: 'E.g. China\'s massive infrastructure investment in the 2000s expanded productive capacity.',
      explain: 'A movement from inside the PPF represents actual growth (using spare capacity). An outward shift represents potential growth — the economy can now produce more of both goods.',
      link: 'This distinction helps explain why some growth is inflationary (near the PPF) and some is sustainable (shifting the PPF).',
    },
    answerParagraphs: [
      {
        label: 'Para 1',
        html: 'A <strong>production possibility frontier (PPF)</strong> shows the <strong>maximum output combinations</strong> of two goods an economy can produce when all resources are used efficiently. <span class="ma-ann ma-ann-blue">K</span> <strong>Economic growth</strong> is a sustained increase in real GDP — the total output of goods and services in an economy. <span class="ma-ann ma-ann-blue">K</span>',
      },
      {
        label: 'Para 2',
        html: 'On a PPF diagram, <strong>actual economic growth</strong> can be illustrated as a movement from a point <strong>inside the PPF toward the frontier</strong>. This occurs when an economy uses previously unemployed or underused resources — for example, when a recession ends and workers return to employment. <span class="ma-ann ma-ann-green">An</span> This type of growth does not require an increase in productive capacity; it simply means existing resources are being used more efficiently. <span class="ma-ann ma-ann-green">An</span>',
      },
      {
        label: 'Para 3',
        html: '<strong>Potential economic growth</strong> is shown as an <strong>outward shift of the entire PPF</strong>. <span class="ma-ann ma-ann-green">An</span> This occurs when the economy\'s productive capacity increases — through investment in capital, technological innovation, improved education, or discovery of new resources. For example, China\'s sustained investment in infrastructure and manufacturing capacity throughout the 2000s shifted its PPF outward dramatically. <span class="ma-ann ma-ann-amber">A</span> An outward shift means the economy can now produce <strong>more of both goods</strong> than before — representing a genuine increase in the economy\'s potential output. <span class="ma-ann ma-ann-green">An</span>',
      },
      {
        label: 'Para 4',
        html: 'The PPF also illustrates why growth involves <strong>trade-offs and opportunity cost</strong>. If an economy chooses to produce more capital goods today (sacrificing consumer goods), the PPF shifts outward more in the future — illustrating the <strong>trade-off between current consumption and future growth</strong>. <span class="ma-ann ma-ann-green">An</span> This helps explain why economies that invest heavily (high savings ratio) tend to grow faster in the long run. <span class="ma-ann ma-ann-green">An</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
      { code: 'An', label: 'Analysis chain', color: 'green' },
    ],
    examinerCommentary: 'Strong answer that clearly distinguishes between actual growth (movement toward PPF) and potential growth (outward shift). The China example provides concrete application. The final paragraph on the trade-off between capital and consumer goods shows sophisticated understanding. A labelled diagram showing both types of growth would secure full marks.',
    likelyScore: '7–8 / 8',
  },

  // ── 1.3.2 Consumer Behaviour & Demand — 8 marks ──
  {
    id: 'yed-business-strategy-8',
    subject: 'economics',
    unit: 1,
    sectionNumber: '1.3.2',
    sectionTitle: 'Consumer Behaviour & Demand',
    marks: 8,
    type: 'Analysis',
    commandWord: 'Analyse',
    question: 'Analyse how knowledge of income elasticity of demand (YED) might be useful to a business.',
    markScheme: [
      { range: '1–2 marks', desc: 'Knowledge: definition of YED, normal vs inferior goods' },
      { range: '3–4 marks', desc: 'Application: relevant examples of products with different YED values' },
      { range: '5–8 marks', desc: 'Analysis: how YED informs pricing, product range, marketing, and investment decisions during economic cycles' },
    ],
    peel: {
      point: 'YED helps firms predict how demand for their products will change as the economy grows or enters recession.',
      evidence: 'E.g. luxury car brands like BMW face elastic YED; budget supermarkets like Aldi have negative YED.',
      explain: 'During a boom, firms with high YED products see demand surge. During recession, they face sharp falls — so they may diversify into lower-YED products to stabilise revenue.',
      link: 'Understanding YED allows firms to make informed decisions about product mix, pricing strategy, and risk management across the business cycle.',
    },
    answerParagraphs: [
      {
        label: 'Para 1',
        html: '<strong>Income elasticity of demand (YED)</strong> measures the <strong>responsiveness of demand to a change in income</strong>, calculated as the percentage change in quantity demanded divided by the percentage change in income. <span class="ma-ann ma-ann-blue">K</span> A positive YED indicates a <strong>normal good</strong> (demand rises with income), while a negative YED indicates an <strong>inferior good</strong> (demand falls as income rises). <span class="ma-ann ma-ann-blue">K</span>',
      },
      {
        label: 'Para 2',
        html: 'Knowledge of YED is valuable for <strong>forecasting demand during the business cycle</strong>. <span class="ma-ann ma-ann-green">An</span> A firm selling luxury goods with a YED significantly greater than 1 — such as <strong>BMW</strong> or high-end fashion brands — can expect demand to rise sharply during a boom but fall steeply in a recession. <span class="ma-ann ma-ann-amber">A</span> Conversely, budget retailers like <strong>Aldi</strong> have products with negative YED — their demand actually increases during recessions as consumers trade down from premium brands. <span class="ma-ann ma-ann-amber">A</span>',
      },
      {
        label: 'Para 3',
        html: 'This information helps businesses plan their <strong>product portfolio and investment strategy</strong>. A company operating in a high-YED market might diversify into lower-YED product lines to reduce vulnerability to economic downturns. <span class="ma-ann ma-ann-green">An</span> It also informs <strong>marketing budgets</strong> — during periods of rising GDP, firms with luxury products should increase advertising spend to capture the surge in demand, while during downturns they should shift focus to value messaging. <span class="ma-ann ma-ann-green">An</span> Additionally, YED data helps with <strong>long-term capacity planning</strong> — a firm in a rapidly growing economy should invest in expanding production if its products have high positive YED, as demand will grow faster than income. <span class="ma-ann ma-ann-green">An</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
      { code: 'An', label: 'Analysis chain', color: 'green' },
    ],
    examinerCommentary: 'This answer goes beyond simply defining YED to show how it practically informs business decisions — forecasting, product portfolio, marketing, and capacity planning. The BMW/Aldi contrast provides strong application. To reach top marks, consider adding how YED interacts with PED in pricing decisions.',
    likelyScore: '7–8 / 8',
  },

  // ── 1.3.4 Price Determination — 4 marks ──
  {
    id: 'equilibrium-price-4',
    subject: 'economics',
    unit: 1,
    sectionNumber: '1.3.4',
    sectionTitle: 'Price Determination',
    marks: 4,
    type: 'Knowledge & Application',
    commandWord: 'Explain',
    question: 'Explain what is meant by equilibrium price and how it is determined in a market.',
    markScheme: [
      { range: '1–2 marks', desc: 'Definition of equilibrium (where Qd = Qs, no tendency for change)' },
      { range: '3–4 marks', desc: 'Application: how excess demand/supply adjusts price back to equilibrium' },
    ],
    peel: null,
    answerParagraphs: [
      {
        label: null,
        html: 'The <strong>equilibrium price</strong> is the price at which the <strong>quantity demanded equals the quantity supplied</strong> — the market clears with no excess supply or demand. <span class="ma-ann ma-ann-blue">K</span> At this price, there is no tendency for the price to change because neither buyers nor sellers have an incentive to alter their behaviour. <span class="ma-ann ma-ann-blue">K</span><br><br>If the price is <strong>above equilibrium</strong>, there is excess supply — producers cannot sell all their output, so they reduce prices. <span class="ma-ann ma-ann-amber">A</span> If the price is <strong>below equilibrium</strong>, there is excess demand — consumers compete for limited goods, bidding the price up. <span class="ma-ann ma-ann-amber">A</span> In both cases, the price mechanism automatically adjusts the market toward equilibrium.',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge/Definition', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
    ],
    examinerCommentary: 'Clear and precise. The definition correctly identifies Qd = Qs and the concept of no tendency to change. The explanation of adjustment from above and below equilibrium demonstrates understanding of the price mechanism in action.',
    likelyScore: '4 / 4',
  },

  // ── 1.3.5 Market Failure — 8 marks ──
  {
    id: 'negative-externality-tax-8',
    subject: 'economics',
    unit: 1,
    sectionNumber: '1.3.5',
    sectionTitle: 'Market Failure',
    marks: 8,
    type: 'Analysis',
    commandWord: 'Analyse',
    question: 'Analyse how a negative externality of production leads to market failure.',
    markScheme: [
      { range: '1–2 marks', desc: 'Knowledge: definition of negative externality, social cost > private cost' },
      { range: '3–4 marks', desc: 'Application: named example (e.g. factory pollution)' },
      { range: '5–8 marks', desc: 'Analysis: welfare loss diagram, overproduction, price too low, third-party harm' },
    ],
    peel: {
      point: 'A negative externality causes the market to overproduce because the price does not reflect the full social cost.',
      evidence: 'E.g. a steel factory discharging pollutants into a river — harming fisheries downstream.',
      explain: 'The producer only considers private costs (raw materials, wages). The external cost (pollution damage) is not included in the price, so the market price is too low and output too high relative to the social optimum.',
      link: 'This misallocation of resources creates a deadweight welfare loss — society would be better off producing less.',
    },
    answerParagraphs: [
      {
        label: 'Para 1',
        html: 'A <strong>negative externality of production</strong> occurs when the production of a good imposes <strong>costs on third parties</strong> who are not involved in the transaction. <span class="ma-ann ma-ann-blue">K</span> In this case, the <strong>marginal social cost (MSC) exceeds the marginal private cost (MPC)</strong> — the gap between them represents the external cost. <span class="ma-ann ma-ann-blue">K</span>',
      },
      {
        label: 'Para 2',
        html: 'For example, a <strong>steel factory</strong> discharging chemical waste into a nearby river imposes costs on downstream fisheries, local residents, and the environment. <span class="ma-ann ma-ann-amber">A</span> The factory only considers its <strong>private costs</strong> (raw materials, energy, wages) when deciding how much to produce. It does not pay for the pollution damage — this external cost falls on third parties. <span class="ma-ann ma-ann-green">An</span>',
      },
      {
        label: 'Para 3',
        html: 'Because the market price reflects only <strong>private costs, not social costs</strong>, the price is <strong>too low</strong> and output is <strong>too high</strong> relative to the socially optimal level. <span class="ma-ann ma-ann-green">An</span> On a diagram, the free market produces at Q₁ (where MPC = MPB) but the social optimum is at Q* (where MSC = MSB). The area between Q* and Q₁, bounded by MSC and MSB, represents the <strong>deadweight welfare loss</strong> — the excess cost to society from overproduction. <span class="ma-ann ma-ann-purple">D</span> <span class="ma-ann ma-ann-green">An</span>',
      },
      {
        label: 'Para 4',
        html: 'This is a clear case of <strong>market failure</strong> because the price mechanism sends the wrong signal — it tells producers to produce more than is socially desirable. <span class="ma-ann ma-ann-green">An</span> Resources are misallocated because the market does not account for the full cost of production. Government intervention (e.g. a Pigouvian tax equal to the external cost) could internalise the externality and move output toward the social optimum. <span class="ma-ann ma-ann-green">An</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
      { code: 'An', label: 'Analysis chain', color: 'green' },
      { code: 'D', label: 'Diagram ref.', color: 'purple' },
    ],
    examinerCommentary: 'Excellent chain of reasoning: external cost → MSC > MPC → price too low → overproduction → welfare loss. The steel factory example provides strong application. The diagram reference is essential for top marks. The mention of a Pigouvian tax shows evaluative awareness without being asked to evaluate.',
    likelyScore: '7–8 / 8',
  },

  // ── 1.3.5 Market Failure — 20 marks ──
  {
    id: 'market-failure-government-intervention-20',
    subject: 'economics',
    unit: 1,
    sectionNumber: '1.3.5',
    sectionTitle: 'Market Failure',
    marks: 20,
    type: 'Evaluation Essay',
    commandWord: 'Evaluate',
    question: 'Evaluate the view that government intervention is always necessary to correct market failure.',
    markScheme: [
      { range: 'AO1 (4 marks)', desc: 'Knowledge of market failure types and government intervention methods' },
      { range: 'AO2 (4 marks)', desc: 'Application — relevant examples of market failure and intervention' },
      { range: 'AO3 (6 marks)', desc: 'Analysis — chains of reasoning for and against intervention' },
      { range: 'AO4 (6 marks)', desc: 'Evaluation — government failure, Coase theorem, context-dependent judgement' },
    ],
    peel: {
      point: 'Government intervention can correct externalities, provide public goods, and address information failure.',
      evidence: 'E.g. the UK\'s sugar tax reduced sugary drink consumption by 34% within two years.',
      explain: 'Intervention internalises external costs (taxes), funds provision of public goods (taxation), and corrects information asymmetry (regulation, labelling).',
      link: 'However, intervention is not always necessary or effective — private solutions (Coase theorem) may work, and government failure can make outcomes worse.',
    },
    answerParagraphs: [
      {
        label: 'Introduction',
        html: '<strong>Market failure</strong> occurs when the free market leads to a <strong>misallocation of resources</strong> — producing too much (negative externalities), too little (positive externalities, merit goods), or none at all (public goods). <span class="ma-ann ma-ann-blue">K</span> The question is whether government intervention is <strong>always</strong> required to correct these failures, or whether alternative mechanisms — including private bargaining and market-based solutions — can sometimes achieve efficient outcomes without state action. <span class="ma-ann ma-ann-green">An</span>',
      },
      {
        label: 'Argument 1 — Intervention is necessary',
        html: 'In many cases, government intervention is essential because the market <strong>cannot self-correct</strong>. <span class="ma-ann ma-ann-green">An</span> <strong>Public goods</strong> such as street lighting and national defence are non-excludable and non-rivalrous — the free rider problem means no private firm can profitably supply them. Only the state can fund provision through taxation. <span class="ma-ann ma-ann-blue">K</span> Similarly, <strong>negative externalities</strong> require intervention because firms have no incentive to account for external costs. The UK\'s <strong>sugar tax</strong> (Soft Drinks Industry Levy), introduced in 2018, successfully reduced sugary drink consumption by 34% and incentivised manufacturers to reformulate products. <span class="ma-ann ma-ann-amber">A</span> Without this intervention, the overconsumption of sugar — and its associated NHS costs — would have continued uncorrected. <span class="ma-ann ma-ann-green">An</span>',
      },
      {
        label: 'Argument 2 — Intervention is not always necessary',
        html: 'However, government intervention is <strong>not always required</strong>. The <strong>Coase theorem</strong> suggests that if property rights are well-defined and transaction costs are low, private parties can negotiate an efficient outcome without government involvement. <span class="ma-ann ma-ann-blue">K</span> For example, if a factory pollutes a farmer\'s land and the farmer has clear legal ownership, they can negotiate compensation or a reduction in pollution — reaching the socially optimal output through bargaining. <span class="ma-ann ma-ann-amber">A</span> In practice, however, transaction costs are often high and property rights unclear, limiting the applicability of this approach. <span class="ma-ann ma-ann-green">An</span>',
      },
      {
        label: 'Evaluation — Government failure',
        html: 'Even when intervention is attempted, it can lead to <strong>government failure</strong> — where the intervention makes the allocation of resources <strong>worse rather than better</strong>. <span class="ma-ann ma-ann-blue">K</span> Governments face <strong>information failure</strong> — they may not know the exact size of an external cost, leading them to set taxes too high or too low. <span class="ma-ann ma-ann-green">An</span> <strong>Regulatory capture</strong> means regulators may serve industry interests rather than the public. <span class="ma-ann ma-ann-green">An</span> <strong>Unintended consequences</strong> are common — for example, minimum pricing on alcohol may harm low-income moderate drinkers without significantly reducing problem drinking. <span class="ma-ann ma-ann-amber">A</span> The cost of intervention itself (bureaucracy, enforcement, compliance) may exceed the welfare gain from correcting the failure. <span class="ma-ann ma-ann-green">An</span>',
      },
      {
        label: 'Conclusion',
        html: 'On balance, government intervention is <strong>often necessary but not always effective or desirable</strong>. For pure public goods and large-scale externalities where private solutions are impractical, intervention is essential. <span class="ma-ann ma-ann-green">An</span> However, the form and extent of intervention matters — well-designed market-based instruments (tradable permits, targeted taxes) tend to outperform heavy-handed regulation. The key judgement is whether the <strong>costs of government failure</strong> are likely to be greater or less than the costs of <strong>market failure</strong> left uncorrected. Where transaction costs are low and property rights clear, private solutions should be tried first. <span class="ma-ann ma-ann-green">An</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
      { code: 'An', label: 'Analysis chain', color: 'green' },
    ],
    examinerCommentary: 'This answer earns top marks through its <em>conditional, nuanced conclusion</em> — not simply "yes" or "no" but "it depends on the type of failure and the quality of intervention." The sugar tax and Coase theorem examples provide strong AO2 application. The government failure section with information failure, regulatory capture, and unintended consequences demonstrates sophisticated AO4 evaluation. The final sentence — comparing costs of government failure with costs of market failure — is exactly the evaluative framework examiners reward.',
    likelyScore: '18–20 / 20',
  },

  // ── 1.3.6 Government Intervention — 4 marks ──
  {
    id: 'indirect-tax-definition-4',
    subject: 'economics',
    unit: 1,
    sectionNumber: '1.3.6',
    sectionTitle: 'Government Intervention',
    marks: 4,
    type: 'Knowledge & Application',
    commandWord: 'Explain',
    question: 'Explain how an indirect tax can be used to correct a negative externality.',
    markScheme: [
      { range: '1–2 marks', desc: 'Knowledge: definition of indirect tax and/or negative externality' },
      { range: '3–4 marks', desc: 'Application: tax internalises external cost, raises private cost to social cost level' },
    ],
    peel: null,
    answerParagraphs: [
      {
        label: null,
        html: 'An <strong>indirect tax</strong> is a tax levied on the sale of goods or services, paid by producers but often passed on to consumers through higher prices. <span class="ma-ann ma-ann-blue">K</span> A <strong>negative externality</strong> occurs when production or consumption imposes costs on third parties — meaning the social cost exceeds the private cost. <span class="ma-ann ma-ann-blue">K</span><br><br>A government can set an indirect tax <strong>equal to the external cost</strong> per unit. This forces producers to <strong>internalise the externality</strong> — their private cost now includes the external cost, raising the supply curve to align with the marginal social cost. <span class="ma-ann ma-ann-amber">A</span> Output falls from the free market level to the socially optimal level, and the welfare loss is eliminated. For example, the UK\'s <strong>landfill tax</strong> raises the cost of sending waste to landfill, encouraging recycling and reducing environmental damage. <span class="ma-ann ma-ann-amber">A</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge/Definition', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
    ],
    examinerCommentary: 'Precise definitions followed by clear mechanism (tax = external cost, internalise, output falls to social optimum). The landfill tax example provides concrete application. Avoid saying "the government taxes the externality" — instead say "the tax equals the external cost per unit."',
    likelyScore: '4 / 4',
  },

  // ══════════════════════════════════════════════════════════════
  // ECONOMICS UNIT 2 — GAPS
  // ══════════════════════════════════════════════════════════════

  // ── 2.3.1 Measures of Economic Performance — 4 marks (additional) ──
  {
    id: 'cpi-limitations-4',
    subject: 'economics',
    unit: 2,
    sectionNumber: '2.3.1',
    sectionTitle: 'Measures of Economic Performance',
    marks: 4,
    type: 'Knowledge & Application',
    commandWord: 'Explain',
    question: 'Explain two limitations of using CPI as a measure of inflation.',
    markScheme: [
      { range: '1–2 marks', desc: 'One limitation identified and explained' },
      { range: '3–4 marks', desc: 'Second limitation identified and explained with development' },
    ],
    peel: null,
    answerParagraphs: [
      {
        label: null,
        html: 'First, the CPI uses a <strong>fixed basket of goods</strong> that may not reflect individual spending patterns. <span class="ma-ann ma-ann-blue">K</span> A pensioner who spends heavily on heating will experience a different inflation rate than a student spending on rent and transport. The CPI gives an <strong>average</strong> that may not match any household\'s actual experience. <span class="ma-ann ma-ann-amber">A</span><br><br>Second, the CPI is <strong>slow to include new products</strong> and may not capture <strong>quality improvements</strong>. <span class="ma-ann ma-ann-blue">K</span> If a smartphone costs the same as last year but has significantly better features, the true cost per unit of quality has fallen — but the CPI records no change. This means CPI may <strong>overstate inflation</strong> by ignoring quality-adjusted price falls. <span class="ma-ann ma-ann-amber">A</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
    ],
    examinerCommentary: 'Two distinct limitations, each with development. The basket composition and quality adjustment points are the two most commonly rewarded answers. Avoid vague limitations like "it is inaccurate" — always explain why.',
    likelyScore: '4 / 4',
  },

  // ── 2.3.2 Aggregate Demand — 8 marks ──
  {
    id: 'interest-rates-ad-8',
    subject: 'economics',
    unit: 2,
    sectionNumber: '2.3.2',
    sectionTitle: 'Aggregate Demand',
    marks: 8,
    type: 'Analysis',
    commandWord: 'Analyse',
    question: 'Analyse how a reduction in interest rates might increase aggregate demand.',
    markScheme: [
      { range: '1–2 marks', desc: 'Knowledge: definition of AD and/or interest rates, AD = C + I + G + (X–M)' },
      { range: '3–4 marks', desc: 'Application: transmission mechanism through consumption, investment, exchange rate' },
      { range: '5–8 marks', desc: 'Analysis: developed chains showing how each component of AD is affected' },
    ],
    peel: {
      point: 'Lower interest rates reduce the cost of borrowing and the incentive to save, boosting consumption and investment.',
      evidence: 'E.g. the Bank of England cut rates to 0.1% during COVID-19 to support spending.',
      explain: 'Cheaper mortgages increase disposable income → more consumer spending. Lower borrowing costs make investment projects more profitable → more business investment. A weaker pound boosts net exports.',
      link: 'Through these channels, lower rates increase multiple components of AD, shifting the curve right.',
    },
    answerParagraphs: [
      {
        label: 'Para 1',
        html: '<strong>Aggregate demand (AD)</strong> is the total demand for goods and services at a given price level, comprising <strong>C + I + G + (X – M)</strong>. <span class="ma-ann ma-ann-blue">K</span> <strong>Interest rates</strong> represent the cost of borrowing and the reward for saving. A reduction in the base rate by the central bank transmits through several channels to increase AD. <span class="ma-ann ma-ann-blue">K</span>',
      },
      {
        label: 'Para 2',
        html: 'First, lower rates reduce <strong>mortgage and loan repayments</strong>, increasing households\' disposable income. <span class="ma-ann ma-ann-green">An</span> With more money available, <strong>consumer spending (C)</strong> rises. The incentive to save also falls — the opportunity cost of spending decreases — so consumers are more likely to spend rather than save. <span class="ma-ann ma-ann-green">An</span> For example, when the Bank of England cut rates to <strong>0.1% during COVID-19</strong>, it aimed to support household spending during the downturn. <span class="ma-ann ma-ann-amber">A</span>',
      },
      {
        label: 'Para 3',
        html: 'Second, lower borrowing costs make <strong>investment projects more profitable</strong>. Firms compare the expected rate of return on investment with the interest rate — when the rate falls, more projects become viable. <span class="ma-ann ma-ann-green">An</span> <strong>Business investment (I)</strong> increases in new machinery, technology, and expansion. This effect is amplified by the <strong>accelerator</strong> — rising output encourages even more investment. <span class="ma-ann ma-ann-green">An</span>',
      },
      {
        label: 'Para 4',
        html: 'Third, lower interest rates tend to cause the <strong>exchange rate to depreciate</strong> — hot money flows out seeking higher returns abroad. <span class="ma-ann ma-ann-green">An</span> A weaker pound makes exports <strong>cheaper</strong> for foreign buyers and imports <strong>more expensive</strong> for domestic consumers, improving <strong>net exports (X – M)</strong>. <span class="ma-ann ma-ann-green">An</span> Through these three channels — higher consumption, higher investment, and improved net exports — the AD curve shifts to the right. <span class="ma-ann ma-ann-green">An</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
      { code: 'An', label: 'Analysis chain', color: 'green' },
    ],
    examinerCommentary: 'Excellent multi-channel analysis. Three distinct transmission mechanisms (consumption, investment, exchange rate → net exports) are each developed with a clear chain. The COVID-19 rate cut provides topical application. For full marks, note that the effectiveness depends on confidence levels — if consumers and firms are pessimistic, rate cuts may be "pushing on a string."',
    likelyScore: '7–8 / 8',
  },

  // ── 2.3.3 Aggregate Supply — 4 marks ──
  {
    id: 'sras-shift-4',
    subject: 'economics',
    unit: 2,
    sectionNumber: '2.3.3',
    sectionTitle: 'Aggregate Supply',
    marks: 4,
    type: 'Knowledge & Application',
    commandWord: 'Explain',
    question: 'Explain what might cause the short-run aggregate supply (SRAS) curve to shift to the left.',
    markScheme: [
      { range: '1–2 marks', desc: 'Knowledge: SRAS and cost-push factors' },
      { range: '3–4 marks', desc: 'Application: named examples of cost increases causing leftward shift' },
    ],
    peel: null,
    answerParagraphs: [
      {
        label: null,
        html: 'The <strong>short-run aggregate supply (SRAS)</strong> curve shows the total output firms are willing to supply when some costs (e.g. wages) are fixed. <span class="ma-ann ma-ann-blue">K</span> SRAS shifts left when <strong>production costs rise</strong> across the economy — at every price level, firms supply less because it is less profitable. <span class="ma-ann ma-ann-blue">K</span><br><br>For example, a sharp rise in <strong>oil prices</strong> increases energy and transport costs for firms across all sectors, reducing SRAS. <span class="ma-ann ma-ann-amber">A</span> Similarly, a <strong>weaker exchange rate</strong> increases the cost of imported raw materials, or a rise in the <strong>national minimum wage</strong> increases labour costs. <span class="ma-ann ma-ann-amber">A</span> In each case, higher costs shift SRAS left, causing cost-push inflation and potentially stagflation.',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
    ],
    examinerCommentary: 'Clear definition followed by three concrete examples (oil prices, exchange rate, minimum wage). Each example is linked to the mechanism. Mentioning stagflation shows awareness of the consequences.',
    likelyScore: '4 / 4',
  },

  // ── 2.3.4 National Income — 8 marks ──
  {
    id: 'multiplier-effect-8',
    subject: 'economics',
    unit: 2,
    sectionNumber: '2.3.4',
    sectionTitle: 'National Income',
    marks: 8,
    type: 'Analysis',
    commandWord: 'Analyse',
    question: 'Analyse how the multiplier effect works and why the multiplier may be smaller than expected.',
    markScheme: [
      { range: '1–2 marks', desc: 'Knowledge: definition of multiplier, formula (1/(1-MPC))' },
      { range: '3–4 marks', desc: 'Application: numerical example or real-world context' },
      { range: '5–8 marks', desc: 'Analysis: rounds of spending, leakages reducing the multiplier, reasons for smaller-than-expected effect' },
    ],
    peel: {
      point: 'An initial injection of spending creates successive rounds of income and expenditure, magnifying the impact on GDP.',
      evidence: 'E.g. the UK government\'s £400bn COVID support packages aimed to stimulate the economy via the multiplier.',
      explain: 'Each round of spending generates income, but leakages (savings, taxes, imports) remove money from the circular flow, so each round is smaller than the last.',
      link: 'The size of the multiplier depends on the marginal propensity to consume — in an open economy with high taxes and import spending, the multiplier is much smaller.',
    },
    answerParagraphs: [
      {
        label: 'Para 1',
        html: 'The <strong>multiplier effect</strong> describes how an initial change in spending leads to a <strong>larger final change in national income</strong>. <span class="ma-ann ma-ann-blue">K</span> The multiplier is calculated as <strong>1 / (1 – MPC)</strong>, where MPC is the marginal propensity to consume. If MPC = 0.8, the multiplier is 5 — an initial £1bn injection leads to a £5bn increase in GDP. <span class="ma-ann ma-ann-blue">K</span>',
      },
      {
        label: 'Para 2',
        html: 'The mechanism works through <strong>successive rounds of spending</strong>. When the government invests £1bn in infrastructure, construction workers receive income. <span class="ma-ann ma-ann-amber">A</span> If their MPC is 0.8, they spend £800m — which becomes income for retailers, suppliers, and service providers. Those recipients then spend 80% of their new income (£640m), and so on. <span class="ma-ann ma-ann-green">An</span> Each round generates new income, creating a <strong>cumulative increase</strong> far larger than the initial injection. <span class="ma-ann ma-ann-green">An</span>',
      },
      {
        label: 'Para 3',
        html: 'However, the multiplier is often <strong>smaller than theory suggests</strong> because of <strong>leakages</strong> from the circular flow. <span class="ma-ann ma-ann-green">An</span> In each round, income leaks out through <strong>savings</strong> (reducing re-spending), <strong>taxation</strong> (government takes a share), and <strong>imports</strong> (spending on foreign goods does not generate domestic income). <span class="ma-ann ma-ann-green">An</span> In an open economy like the UK — with high income tax, high import penetration, and a modest savings rate — the multiplier may be closer to <strong>1.3–1.5</strong> rather than the theoretical 5. <span class="ma-ann ma-ann-amber">A</span> Additionally, if the economy is near <strong>full capacity</strong>, extra spending may cause inflation rather than increasing real output, further reducing the effective multiplier. <span class="ma-ann ma-ann-green">An</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
      { code: 'An', label: 'Analysis chain', color: 'green' },
    ],
    examinerCommentary: 'Strong answer that explains both the mechanism and its limitations. The numerical walkthrough (£1bn → £800m → £640m) makes the chain concrete. The distinction between theoretical and practical multiplier values (5 vs 1.3–1.5) is exactly what earns top marks. The point about inflation at full capacity shows evaluative awareness.',
    likelyScore: '7–8 / 8',
  },

  // ── 2.3.2 Aggregate Demand — 20 marks ──
  {
    id: 'consumer-spending-growth-20',
    subject: 'economics',
    unit: 2,
    sectionNumber: '2.3.2',
    sectionTitle: 'Aggregate Demand',
    marks: 20,
    type: 'Evaluation Essay',
    commandWord: 'Evaluate',
    question: 'Evaluate the view that consumer spending is the most important determinant of economic growth.',
    markScheme: [
      { range: 'AO1 (4 marks)', desc: 'Knowledge of AD components, consumer spending determinants, growth types' },
      { range: 'AO2 (4 marks)', desc: 'Application — UK/global data on consumption share of GDP' },
      { range: 'AO3 (6 marks)', desc: 'Analysis — how C drives short-run growth, multiplier effect, comparison with I, G, (X-M)' },
      { range: 'AO4 (6 marks)', desc: 'Evaluation — short-run vs long-run, supply-side factors, balanced judgement' },
    ],
    peel: {
      point: 'Consumer spending typically accounts for 60–65% of GDP, making it the largest component of AD.',
      evidence: 'In the UK, household spending represents approximately 63% of GDP.',
      explain: 'When consumer confidence rises, the multiplier effect amplifies spending into higher GDP growth. Conversely, a fall in confidence can trigger a recession.',
      link: 'However, consumption-driven growth is demand-side only. Long-run sustainable growth requires investment in productive capacity — which depends on I, not C.',
    },
    answerParagraphs: [
      {
        label: 'Introduction',
        html: '<strong>Consumer spending (C)</strong> is typically the largest component of aggregate demand, accounting for approximately <strong>63% of UK GDP</strong>. <span class="ma-ann ma-ann-amber">A</span> <strong>Economic growth</strong> can be driven in the short run by increases in AD and in the long run by improvements in productive capacity. The question is whether consumption — though the largest AD component — is truly the <strong>most important</strong> driver of growth, or whether other factors are more significant. <span class="ma-ann ma-ann-green">An</span>',
      },
      {
        label: 'Argument 1 — Consumer spending drives short-run growth',
        html: 'In the short run, consumer spending is arguably the <strong>most powerful driver of growth</strong> because of its sheer size. <span class="ma-ann ma-ann-green">An</span> When consumer confidence rises — due to wage growth, low unemployment, or rising house prices — the <strong>multiplier effect</strong> amplifies the increase in spending across the economy. <span class="ma-ann ma-ann-blue">K</span> The UK\'s post-COVID recovery in 2021 was largely driven by a <strong>surge in consumer spending</strong> as households released savings accumulated during lockdowns. <span class="ma-ann ma-ann-amber">A</span> Conversely, a collapse in consumer confidence — as during the 2008 financial crisis — can single-handedly trigger a recession, regardless of government or investment spending. <span class="ma-ann ma-ann-green">An</span>',
      },
      {
        label: 'Counter-argument — Investment and supply-side factors',
        html: 'However, long-run <strong>sustainable growth</strong> depends more on <strong>investment (I)</strong> and supply-side improvements than on consumption. <span class="ma-ann ma-ann-green">An</span> Investment in capital, technology, and infrastructure shifts the <strong>LRAS curve right</strong>, increasing the economy\'s productive capacity without causing inflation. <span class="ma-ann ma-ann-blue">K</span> China\'s extraordinary growth from 1990 to 2020 was driven by massive <strong>capital investment</strong> (often 40–45% of GDP), not consumption. <span class="ma-ann ma-ann-amber">A</span> Furthermore, consumption-led growth can be <strong>unsustainable</strong> if financed by debt — the UK\'s pre-2008 growth was partly fuelled by rising household debt, which proved fragile. <span class="ma-ann ma-ann-green">An</span>',
      },
      {
        label: 'Evaluation',
        html: 'The relative importance of consumer spending depends on the <strong>time horizon and stage of the business cycle</strong>. <span class="ma-ann ma-ann-green">An</span> In a recession with a negative output gap, stimulating consumer spending is the fastest way to restore growth — the Keynesian argument for demand management. <span class="ma-ann ma-ann-green">An</span> However, at or near full employment, further increases in C simply cause <strong>demand-pull inflation</strong> without increasing real output. <span class="ma-ann ma-ann-green">An</span> In developing economies, the binding constraint is often <strong>capital formation</strong>, not demand — investment in education, infrastructure, and technology matters more than consumption. <span class="ma-ann ma-ann-green">An</span> Net exports also matter — export-led growth strategies (South Korea, Germany) suggest that <strong>(X – M)</strong> can be a more important growth driver than domestic consumption in certain contexts. <span class="ma-ann ma-ann-amber">A</span>',
      },
      {
        label: 'Conclusion',
        html: 'On balance, consumer spending is the <strong>most important short-run determinant</strong> of economic growth due to its size and multiplier effects. However, it is <strong>not the most important for long-run, sustainable growth</strong>, which depends on investment, human capital, and technological progress. The most effective growth strategy combines demand-side support (maintaining consumer confidence and spending) with supply-side investment in productive capacity. <span class="ma-ann ma-ann-green">An</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
      { code: 'An', label: 'Analysis chain', color: 'green' },
    ],
    examinerCommentary: 'Top-band answer. The 63% GDP figure provides immediate authority. The short-run vs long-run distinction is the key evaluative framework. China\'s investment-led growth and UK\'s debt-fuelled growth are strong contrasting applications. The conclusion avoids a simple yes/no — instead distinguishing by time horizon, which is exactly what examiners reward at AO4.',
    likelyScore: '18–20 / 20',
  },

  // ── 2.3.5 Economic Growth — 8 marks ──
  {
    id: 'costs-benefits-growth-8',
    subject: 'economics',
    unit: 2,
    sectionNumber: '2.3.5',
    sectionTitle: 'Economic Growth',
    marks: 8,
    type: 'Analysis',
    commandWord: 'Analyse',
    question: 'Analyse the potential costs of rapid economic growth.',
    markScheme: [
      { range: '1–2 marks', desc: 'Knowledge: definition of economic growth' },
      { range: '3–4 marks', desc: 'Application: named examples of costs (environmental, inequality)' },
      { range: '5–8 marks', desc: 'Analysis: chains linking growth to inflation, environmental damage, inequality, and sustainability concerns' },
    ],
    peel: {
      point: 'Rapid growth can cause inflation, environmental degradation, and increased inequality.',
      evidence: 'E.g. China\'s rapid industrialisation caused severe air pollution in cities like Beijing.',
      explain: 'If AD grows faster than productive capacity, demand-pull inflation results. Growth concentrated in certain sectors/regions widens inequality.',
      link: 'These costs mean that maximising growth is not always desirable — the quality and sustainability of growth matters as much as its speed.',
    },
    answerParagraphs: [
      {
        label: 'Para 1',
        html: '<strong>Economic growth</strong> is a sustained increase in real GDP. While generally desirable, <strong>rapid growth can generate significant costs</strong> that reduce or offset the benefits. <span class="ma-ann ma-ann-blue">K</span>',
      },
      {
        label: 'Para 2',
        html: 'First, if aggregate demand grows <strong>faster than productive capacity</strong>, the economy overheats — causing <strong>demand-pull inflation</strong>. <span class="ma-ann ma-ann-green">An</span> Rising prices erode purchasing power, create uncertainty for businesses, and may require contractionary policy that subsequently causes recession. <span class="ma-ann ma-ann-green">An</span> This was visible in the UK during 2021–22, when the post-COVID demand surge contributed to inflation exceeding 10%. <span class="ma-ann ma-ann-amber">A</span>',
      },
      {
        label: 'Para 3',
        html: 'Second, rapid growth often causes <strong>environmental degradation</strong>. Increased production generates pollution, resource depletion, and carbon emissions. <span class="ma-ann ma-ann-green">An</span> China\'s rapid industrialisation from the 1990s onwards caused <strong>severe air pollution</strong> in cities like Beijing and significant water contamination — imposing health costs estimated at 3–6% of GDP. <span class="ma-ann ma-ann-amber">A</span> These environmental costs reduce long-run welfare and may threaten the sustainability of future growth. <span class="ma-ann ma-ann-green">An</span>',
      },
      {
        label: 'Para 4',
        html: 'Third, growth may <strong>increase inequality</strong> if the gains are unevenly distributed. <span class="ma-ann ma-ann-green">An</span> In many countries, growth has disproportionately benefited skilled workers, capital owners, and urban populations — while low-skilled workers, rural communities, and the elderly may see little improvement. <span class="ma-ann ma-ann-green">An</span> Rising inequality can create social tensions, reduce social mobility, and even undermine future growth if large sections of the population cannot participate in the economy productively. <span class="ma-ann ma-ann-green">An</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
      { code: 'An', label: 'Analysis chain', color: 'green' },
    ],
    examinerCommentary: 'Three distinct costs, each with a developed analytical chain. The UK inflation and China pollution examples provide strong application. The final point on inequality undermining future growth shows sophisticated thinking. A diagram showing an AD/AS shift with inflationary gap would strengthen the answer further.',
    likelyScore: '7–8 / 8',
  },

  // ══════════════════════════════════════════════════════════════
  // ECONOMICS UNIT 3 — ALL NEW (no existing answers)
  // ══════════════════════════════════════════════════════════════

  // ── 3.3.1 Types and Sizes of Businesses — 4 marks ──
  {
    id: 'economies-scale-4',
    subject: 'economics',
    unit: 3,
    sectionNumber: '3.3.1',
    sectionTitle: 'Types and Sizes of Businesses',
    marks: 4,
    type: 'Knowledge & Application',
    commandWord: 'Explain',
    question: 'Explain what is meant by economies of scale and give an example.',
    markScheme: [
      { range: '1–2 marks', desc: 'Definition: average costs fall as output increases' },
      { range: '3–4 marks', desc: 'Application: named type of economy of scale with example' },
    ],
    peel: null,
    answerParagraphs: [
      {
        label: null,
        html: '<strong>Economies of scale</strong> are the <strong>cost advantages that firms gain as output increases</strong> — average (unit) costs fall as the scale of production rises. <span class="ma-ann ma-ann-blue">K</span> They arise because fixed costs are spread over a larger output and firms can exploit efficiencies unavailable to smaller producers. <span class="ma-ann ma-ann-blue">K</span><br><br>For example, <strong>purchasing economies</strong> allow large firms like Tesco to negotiate bulk discounts from suppliers — buying 10 million units at a lower price per unit than a small corner shop. <span class="ma-ann ma-ann-amber">A</span> <strong>Technical economies</strong> enable large car manufacturers like Toyota to invest in robotic assembly lines that reduce labour costs per vehicle — an investment that would be uneconomical for a small producer. <span class="ma-ann ma-ann-amber">A</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge/Definition', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
    ],
    examinerCommentary: 'Clear definition that correctly identifies falling average costs (not just falling costs). Two named types with real-world firm examples. Avoid saying "the firm saves money" — instead say "average costs fall" or "unit costs decrease."',
    likelyScore: '4 / 4',
  },

  // ── 3.3.2 Revenue, Costs and Profits — 8 marks ──
  {
    id: 'profit-maximisation-mc-mr-8',
    subject: 'economics',
    unit: 3,
    sectionNumber: '3.3.2',
    sectionTitle: 'Revenue, Costs and Profits',
    marks: 8,
    type: 'Analysis',
    commandWord: 'Analyse',
    question: 'Analyse why a profit-maximising firm produces where MC = MR.',
    markScheme: [
      { range: '1–2 marks', desc: 'Knowledge: definitions of MC, MR, profit maximisation' },
      { range: '3–4 marks', desc: 'Application: what happens when MC < MR and MC > MR' },
      { range: '5–8 marks', desc: 'Analysis: logical chain explaining why MC = MR is optimal' },
    ],
    peel: {
      point: 'MC = MR is the output where the additional revenue from one more unit exactly equals the additional cost — producing more or less would reduce profit.',
      evidence: 'Any firm — from a coffee shop to Amazon — implicitly applies this rule when deciding production levels.',
      explain: 'If MC < MR, producing one more unit adds more to revenue than cost → profit rises. If MC > MR, the extra unit costs more than it earns → profit falls. Only at MC = MR is profit maximised.',
      link: 'This is the universal profit-maximising rule that applies across all market structures.',
    },
    answerParagraphs: [
      {
        label: 'Para 1',
        html: '<strong>Marginal cost (MC)</strong> is the additional cost of producing one more unit, while <strong>marginal revenue (MR)</strong> is the additional revenue from selling one more unit. <span class="ma-ann ma-ann-blue">K</span> <strong>Profit maximisation</strong> is the output where the difference between total revenue and total cost is greatest. <span class="ma-ann ma-ann-blue">K</span>',
      },
      {
        label: 'Para 2',
        html: 'If a firm is producing at an output where <strong>MC < MR</strong>, the additional unit adds <strong>more to revenue than to cost</strong> — so profit increases if the firm produces more. <span class="ma-ann ma-ann-green">An</span> The firm should therefore expand output. Conversely, if <strong>MC > MR</strong>, the last unit produced costs more than it earns — the firm is <strong>losing money on that unit</strong> and should reduce output. <span class="ma-ann ma-ann-green">An</span>',
      },
      {
        label: 'Para 3',
        html: 'The only output level where the firm has <strong>no incentive to change</strong> is where <strong>MC = MR</strong>. <span class="ma-ann ma-ann-green">An</span> At this point, the last unit produced adds exactly as much to revenue as it costs — any further expansion would reduce profit, and any contraction would leave potential profit uncaptured. <span class="ma-ann ma-ann-green">An</span> This rule applies across <strong>all market structures</strong>: a perfectly competitive firm, a monopolist, or an oligopolist all maximise profit where MC = MR — the difference is only in the shape of their revenue curves. <span class="ma-ann ma-ann-green">An</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge', color: 'blue' },
      { code: 'An', label: 'Analysis chain', color: 'green' },
    ],
    examinerCommentary: 'Clear logical chain: MC < MR → expand, MC > MR → contract, MC = MR → optimal. The point about this applying across all market structures shows wider understanding. A diagram showing MC intersecting MR with shaded profit area would strengthen the answer.',
    likelyScore: '7–8 / 8',
  },

  // ── 3.3.3 Market Structures — 20 marks ──
  {
    id: 'monopoly-efficiency-20',
    subject: 'economics',
    unit: 3,
    sectionNumber: '3.3.3',
    sectionTitle: 'Market Structures & Contestability',
    marks: 20,
    type: 'Evaluation Essay',
    commandWord: 'Evaluate',
    question: 'Evaluate whether monopoly is always against the public interest.',
    markScheme: [
      { range: 'AO1 (4 marks)', desc: 'Knowledge of monopoly characteristics, efficiency types, contestability' },
      { range: 'AO2 (4 marks)', desc: 'Application — named monopoly examples, data on prices/innovation' },
      { range: 'AO3 (6 marks)', desc: 'Analysis — arguments for and against monopoly, efficiency analysis' },
      { range: 'AO4 (6 marks)', desc: 'Evaluation — depends on regulation, contestability, type of monopoly' },
    ],
    peel: {
      point: 'Monopoly can harm consumers through higher prices and allocative inefficiency, but may benefit them through economies of scale and innovation.',
      evidence: 'E.g. Google dominates search but provides a free, constantly improving service.',
      explain: 'Supernormal profit can fund R&D (dynamic efficiency). Economies of scale can lower average costs below what smaller firms could achieve. Natural monopolies may be the most efficient structure.',
      link: 'Whether monopoly is harmful depends on the source of monopoly power, the degree of contestability, and the effectiveness of regulation.',
    },
    answerParagraphs: [
      {
        label: 'Introduction',
        html: 'A <strong>monopoly</strong> exists where a single firm dominates a market, typically defined as having over 25% market share in UK competition law. <span class="ma-ann ma-ann-blue">K</span> The conventional view is that monopoly leads to <strong>higher prices, lower output, and inefficiency</strong> compared to competitive markets. However, this view is incomplete — monopoly can also deliver benefits that competitive markets cannot. <span class="ma-ann ma-ann-green">An</span>',
      },
      {
        label: 'Argument 1 — Monopoly harms the public interest',
        html: 'Monopolies are <strong>allocatively inefficient</strong> — they produce where MC < P, meaning consumers pay more than the marginal cost of production and output is below the social optimum. <span class="ma-ann ma-ann-blue">K</span> They may also be <strong>productively inefficient</strong> — without competitive pressure, there is little incentive to minimise costs (<strong>X-inefficiency</strong>). <span class="ma-ann ma-ann-green">An</span> Monopolists can also restrict output to maintain high prices, creating a <strong>deadweight welfare loss</strong> — lost consumer and producer surplus that benefits nobody. <span class="ma-ann ma-ann-green">An</span> For example, concerns about <strong>energy companies</strong> charging excessive prices during the 2022 energy crisis led to calls for windfall taxes — evidence that monopoly power can harm consumers when demand is inelastic. <span class="ma-ann ma-ann-amber">A</span>',
      },
      {
        label: 'Counter-argument — Monopoly can benefit consumers',
        html: 'However, monopoly can serve the public interest in several ways. <strong>Supernormal profits fund innovation</strong> — Schumpeter argued that only firms with market power have the resources and incentive for large-scale R&D. <span class="ma-ann ma-ann-blue">K</span> <strong>Google</strong> reinvests billions into AI, search improvements, and free services (Maps, Gmail, YouTube), delivering enormous consumer value despite its 90%+ search market share. <span class="ma-ann ma-ann-amber">A</span> <strong>Economies of scale</strong> in natural monopolies (water, rail networks) mean a single firm produces at lower average cost than multiple competing firms could — duplication would waste resources. <span class="ma-ann ma-ann-green">An</span> In these cases, monopoly is the <strong>most efficient market structure</strong>, provided it is properly regulated. <span class="ma-ann ma-ann-green">An</span>',
      },
      {
        label: 'Evaluation',
        html: 'Whether monopoly harms the public interest depends on several factors. <strong>Contestability</strong> matters — if barriers to entry are low, even a monopolist must keep prices competitive to deter entrants. <span class="ma-ann ma-ann-green">An</span> <strong>Regulation</strong> matters — price caps (RPI – X) and quality standards can constrain the worst excesses of monopoly while preserving scale benefits. <span class="ma-ann ma-ann-blue">K</span> The <strong>source of monopoly power</strong> matters — a monopoly earned through continuous innovation (Apple, Google) is very different from one maintained through anti-competitive practices or regulatory capture. <span class="ma-ann ma-ann-green">An</span> <strong>Dynamic efficiency</strong> must be weighed against static inefficiency — a firm that is allocatively inefficient today but invests heavily in R&D may deliver greater welfare over time. <span class="ma-ann ma-ann-green">An</span>',
      },
      {
        label: 'Conclusion',
        html: 'Monopoly is <strong>not always against the public interest</strong>. While the standard model predicts higher prices and allocative inefficiency, the reality depends on contestability, regulation, and whether the firm reinvests profits in innovation. <strong>Natural monopolies and innovation-driven monopolies</strong> can benefit consumers more than fragmented competition. The key policy question is not whether to eliminate monopoly but how to <strong>regulate it effectively</strong> — ensuring firms pass on efficiency gains to consumers while maintaining incentives for investment and innovation. <span class="ma-ann ma-ann-green">An</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
      { code: 'An', label: 'Analysis chain', color: 'green' },
    ],
    examinerCommentary: 'Top-band answer with excellent structure. The Schumpeterian argument for dynamic efficiency is well-developed. Google and energy companies provide contrasting applications. The evaluation correctly identifies contestability, regulation, and source of power as the key determinants. The conclusion avoids a binary answer — instead framing the issue as "how to regulate" rather than "whether to allow." For full marks, include a monopoly diagram showing deadweight loss and reference the CMA.',
    likelyScore: '18–20 / 20',
  },

  // ── 3.3.4 Labour Markets — 4 marks ──
  {
    id: 'derived-demand-labour-4',
    subject: 'economics',
    unit: 3,
    sectionNumber: '3.3.4',
    sectionTitle: 'Labour Markets',
    marks: 4,
    type: 'Knowledge & Application',
    commandWord: 'Explain',
    question: 'Explain what is meant by the derived demand for labour.',
    markScheme: [
      { range: '1–2 marks', desc: 'Definition: labour demanded because of demand for the product it produces' },
      { range: '3–4 marks', desc: 'Application: example showing link between product demand and labour demand' },
    ],
    peel: null,
    answerParagraphs: [
      {
        label: null,
        html: '<strong>Derived demand</strong> means that labour is not demanded for its own sake but because it is <strong>needed to produce goods and services that consumers want</strong>. <span class="ma-ann ma-ann-blue">K</span> The demand for workers depends on the demand for the product they make — if product demand rises, firms need more workers to increase output. <span class="ma-ann ma-ann-blue">K</span><br><br>For example, if demand for electric vehicles increases, car manufacturers like <strong>Tesla</strong> will hire more production workers, engineers, and battery technicians — the demand for these workers is <strong>derived from</strong> consumer demand for EVs. <span class="ma-ann ma-ann-amber">A</span> Conversely, falling demand for print newspapers has reduced the derived demand for journalists and printers in that industry. <span class="ma-ann ma-ann-amber">A</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge/Definition', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
    ],
    examinerCommentary: 'Clear definition that correctly links labour demand to product demand. Two contrasting examples (Tesla EVs rising, print newspapers falling) show understanding in both directions. Avoid saying "firms need workers" without explaining why — always link back to product demand.',
    likelyScore: '4 / 4',
  },

  // ── 3.3.4 Labour Markets — 8 marks ──
  {
    id: 'monopsony-wages-8',
    subject: 'economics',
    unit: 3,
    sectionNumber: '3.3.4',
    sectionTitle: 'Labour Markets',
    marks: 8,
    type: 'Analysis',
    commandWord: 'Analyse',
    question: 'Analyse how a monopsony employer might lead to lower wages and employment.',
    markScheme: [
      { range: '1–2 marks', desc: 'Knowledge: definition of monopsony' },
      { range: '3–4 marks', desc: 'Application: named example (e.g. NHS)' },
      { range: '5–8 marks', desc: 'Analysis: MCL > wage, employs where MCL = MRP, pays lower wage from supply curve' },
    ],
    peel: {
      point: 'A monopsony faces an upward-sloping supply curve, meaning the marginal cost of labour exceeds the wage.',
      evidence: 'E.g. the NHS is the dominant employer of nurses in the UK.',
      explain: 'To hire one more worker, the monopsonist must raise wages for all workers → MCL > W. It employs where MCL = MRP but pays the lower wage on the supply curve.',
      link: 'This results in both lower wages and fewer workers employed compared to a competitive labour market.',
    },
    answerParagraphs: [
      {
        label: 'Para 1',
        html: 'A <strong>monopsony</strong> is a labour market with a <strong>single or dominant employer</strong>. Unlike a competitive market where firms are wage-takers, a monopsonist has <strong>wage-setting power</strong>. <span class="ma-ann ma-ann-blue">K</span> The <strong>NHS</strong> is often cited as a monopsony employer of nurses in the UK — in many regions, the NHS is the only realistic employer for qualified nursing staff. <span class="ma-ann ma-ann-amber">A</span>',
      },
      {
        label: 'Para 2',
        html: 'The monopsonist faces an <strong>upward-sloping labour supply curve</strong> — to attract more workers, it must offer higher wages. <span class="ma-ann ma-ann-green">An</span> Crucially, when it raises the wage for the new worker, it must also raise wages for <strong>all existing workers</strong>. This means the <strong>marginal cost of labour (MCL) is higher than the wage</strong> — the cost of hiring one more worker includes both their wage and the wage increase for everyone already employed. <span class="ma-ann ma-ann-green">An</span>',
      },
      {
        label: 'Para 3',
        html: 'The profit-maximising monopsonist employs workers up to the point where <strong>MCL = MRP</strong> (marginal revenue product). <span class="ma-ann ma-ann-green">An</span> However, it then pays the <strong>wage on the supply curve</strong> — which is lower than MRP. <span class="ma-ann ma-ann-purple">D</span> The result is that both the <strong>wage and employment level are lower</strong> than they would be in a competitive labour market, where the wage equals MRP. <span class="ma-ann ma-ann-green">An</span> Workers are paid less than the value of their contribution, and the monopsonist captures the difference as additional profit. <span class="ma-ann ma-ann-green">An</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
      { code: 'An', label: 'Analysis chain', color: 'green' },
      { code: 'D', label: 'Diagram ref.', color: 'purple' },
    ],
    examinerCommentary: 'Strong answer with the key insight: MCL > W because raising one worker\'s wage raises all workers\' wages. The NHS example is apt. The mechanism is clearly explained — employs at MCL = MRP but pays from supply curve. A monopsony labour market diagram is essential for top marks.',
    likelyScore: '7–8 / 8',
  },

  // ── 3.3.5 Government Intervention — 4 marks ──
  {
    id: 'privatisation-definition-4',
    subject: 'economics',
    unit: 3,
    sectionNumber: '3.3.5',
    sectionTitle: 'Government Intervention',
    marks: 4,
    type: 'Knowledge & Application',
    commandWord: 'Explain',
    question: 'Explain what is meant by privatisation and give one potential benefit.',
    markScheme: [
      { range: '1–2 marks', desc: 'Definition: transfer of ownership from public to private sector' },
      { range: '3–4 marks', desc: 'Application: benefit explained with example' },
    ],
    peel: null,
    answerParagraphs: [
      {
        label: null,
        html: '<strong>Privatisation</strong> is the transfer of ownership of a business or industry from the <strong>public sector (government) to the private sector</strong>. <span class="ma-ann ma-ann-blue">K</span> It means the firm is no longer state-owned but is instead owned by private shareholders who can buy and sell shares on the stock market. <span class="ma-ann ma-ann-blue">K</span><br><br>A potential benefit is <strong>improved efficiency</strong>. Private firms are driven by the <strong>profit motive</strong>, giving them an incentive to cut costs and increase productivity. <span class="ma-ann ma-ann-amber">A</span> For example, the privatisation of <strong>British Telecom (BT)</strong> in 1984 led to significant investment in network infrastructure and technological innovation that may not have occurred under slower-moving state ownership. <span class="ma-ann ma-ann-amber">A</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge/Definition', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
    ],
    examinerCommentary: 'Clear definition with correct emphasis on ownership transfer from public to private sector. The BT example provides concrete application. Linking the profit motive to efficiency is the key mechanism.',
    likelyScore: '4 / 4',
  },

  // ══════════════════════════════════════════════════════════════
  // ECONOMICS UNIT 4 — ALL NEW
  // ══════════════════════════════════════════════════════════════

  // ── 4.3.1 Causes and Effects of Globalisation — 4 marks ──
  {
    id: 'globalisation-definition-4',
    subject: 'economics',
    unit: 4,
    sectionNumber: '4.3.1',
    sectionTitle: 'Causes and Effects of Globalisation',
    marks: 4,
    type: 'Knowledge & Application',
    commandWord: 'Explain',
    question: 'Explain two causes of globalisation.',
    markScheme: [
      { range: '1–2 marks', desc: 'First cause identified and explained' },
      { range: '3–4 marks', desc: 'Second cause identified and explained with development' },
    ],
    peel: null,
    answerParagraphs: [
      {
        label: null,
        html: 'First, <strong>trade liberalisation</strong> — the reduction of tariffs and trade barriers through organisations like the WTO and regional trade agreements — has made it cheaper and easier for goods to cross borders. <span class="ma-ann ma-ann-blue">K</span> Average global tariff rates fell from over 20% in the 1980s to under 5% by 2020, dramatically increasing the volume of international trade. <span class="ma-ann ma-ann-amber">A</span><br><br>Second, <strong>technological advances</strong> — particularly the internet, containerisation, and cheaper air transport — have reduced the cost and time of moving goods, services, and information across borders. <span class="ma-ann ma-ann-blue">K</span> Containerisation alone reduced shipping costs by over 90%, making it viable for firms to source components globally and sell to international markets. <span class="ma-ann ma-ann-amber">A</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
    ],
    examinerCommentary: 'Two distinct causes, each with development and data/context. Trade liberalisation and technology are the two most commonly cited causes and provide a strong answer. Avoid listing causes without explanation — always show the mechanism.',
    likelyScore: '4 / 4',
  },

  // ── 4.3.1 Causes and Effects of Globalisation — 8 marks ──
  {
    id: 'mnc-host-country-8',
    subject: 'economics',
    unit: 4,
    sectionNumber: '4.3.1',
    sectionTitle: 'Causes and Effects of Globalisation',
    marks: 8,
    type: 'Analysis',
    commandWord: 'Analyse',
    question: 'Analyse the potential costs and benefits of a multinational corporation (MNC) setting up operations in a developing country.',
    markScheme: [
      { range: '1–2 marks', desc: 'Knowledge: definition of MNC, FDI' },
      { range: '3–4 marks', desc: 'Application: named MNC/country example' },
      { range: '5–8 marks', desc: 'Analysis: chains linking FDI to jobs, technology transfer, but also profit repatriation and exploitation' },
    ],
    peel: {
      point: 'MNCs bring capital, jobs, and technology but may also exploit cheap labour and repatriate profits.',
      evidence: 'E.g. Nike\'s operations in Vietnam — created 300,000+ jobs but faced criticism over working conditions.',
      explain: 'FDI creates direct and indirect employment, raises tax revenue, and transfers technology. But profits leave the country, jobs may be low-skill, and local firms may be crowded out.',
      link: 'The net impact depends on the host country\'s regulatory framework and bargaining power.',
    },
    answerParagraphs: [
      {
        label: 'Para 1',
        html: 'A <strong>multinational corporation (MNC)</strong> is a firm that operates production or service facilities in more than one country. <span class="ma-ann ma-ann-blue">K</span> When an MNC sets up in a developing country, it brings <strong>foreign direct investment (FDI)</strong> — capital that flows into the host economy. <span class="ma-ann ma-ann-blue">K</span>',
      },
      {
        label: 'Para 2',
        html: 'The benefits can be significant. MNCs create <strong>direct employment</strong> — for example, <strong>Nike</strong> employs over 300,000 workers in Vietnam alone. <span class="ma-ann ma-ann-amber">A</span> They also create <strong>indirect jobs</strong> through local supply chains and spending by their workforce. <span class="ma-ann ma-ann-green">An</span> FDI brings <strong>technology transfer</strong> — local workers gain skills and knowledge that can spread to domestic firms. Tax revenue from MNC operations helps fund public services and infrastructure. <span class="ma-ann ma-ann-green">An</span>',
      },
      {
        label: 'Para 3',
        html: 'However, MNCs may also impose <strong>costs on the host country</strong>. <strong>Profit repatriation</strong> means much of the income generated leaves the country and flows back to shareholders in the MNC\'s home country — reducing the benefit to the local economy. <span class="ma-ann ma-ann-green">An</span> MNCs may exploit <strong>weak labour regulations</strong>, paying low wages and offering poor working conditions — Nike faced sustained criticism over factory conditions in Vietnam. <span class="ma-ann ma-ann-amber">A</span> They may also <strong>crowd out local firms</strong> that cannot compete with the MNC\'s scale and resources, reducing domestic entrepreneurship and creating dependency on foreign investment. <span class="ma-ann ma-ann-green">An</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
      { code: 'An', label: 'Analysis chain', color: 'green' },
    ],
    examinerCommentary: 'Balanced analysis with benefits and costs each developed with clear chains. Nike/Vietnam provides strong application throughout. The profit repatriation, crowding out, and labour exploitation points are the three most commonly rewarded cost arguments. For top marks, note that the net impact depends on the regulatory framework — well-governed countries capture more of the benefits.',
    likelyScore: '7–8 / 8',
  },

  // ── 4.3.2 Trade and the Global Economy — 20 marks ──
  {
    id: 'free-trade-protectionism-20',
    subject: 'economics',
    unit: 4,
    sectionNumber: '4.3.2',
    sectionTitle: 'Trade and the Global Economy',
    marks: 20,
    type: 'Evaluation Essay',
    commandWord: 'Evaluate',
    question: 'Evaluate the arguments for and against free trade.',
    markScheme: [
      { range: 'AO1 (4 marks)', desc: 'Knowledge of comparative advantage, free trade, protectionism' },
      { range: 'AO2 (4 marks)', desc: 'Application — real-world trade examples, data' },
      { range: 'AO3 (6 marks)', desc: 'Analysis — efficiency gains vs infant industry protection, terms of trade' },
      { range: 'AO4 (6 marks)', desc: 'Evaluation — depends on development stage, industry, global vs national welfare' },
    ],
    peel: {
      point: 'Free trade allows specialisation according to comparative advantage, increasing global output and consumer choice.',
      evidence: 'E.g. EU single market trade increased member GDP by an estimated 8–9% over 50 years.',
      explain: 'Countries produce what they are relatively best at and trade for the rest. Consumers benefit from lower prices and greater variety. Competition drives innovation.',
      link: 'However, free trade creates winners and losers within countries — and developing countries may need temporary protection to build competitive industries.',
    },
    answerParagraphs: [
      {
        label: 'Introduction',
        html: '<strong>Free trade</strong> is the exchange of goods and services across borders without government-imposed barriers such as tariffs, quotas, or regulations. <span class="ma-ann ma-ann-blue">K</span> The case for free trade is built on the theory of <strong>comparative advantage</strong> — that countries should specialise in producing goods with the lowest opportunity cost, then trade. <span class="ma-ann ma-ann-blue">K</span> However, the extent to which free trade benefits all participants is contested. <span class="ma-ann ma-ann-green">An</span>',
      },
      {
        label: 'Argument 1 — For free trade',
        html: 'Free trade delivers substantial benefits. <strong>Specialisation</strong> according to comparative advantage increases total global output — more goods are produced from the same resources. <span class="ma-ann ma-ann-green">An</span> Consumers benefit from <strong>lower prices</strong> (access to cheapest global producers), <strong>greater variety</strong>, and <strong>higher quality</strong> driven by international competition. <span class="ma-ann ma-ann-green">An</span> The EU single market has increased member states\' GDP by an estimated <strong>8–9%</strong> over 50 years through deeper trade integration. <span class="ma-ann ma-ann-amber">A</span> Competition from abroad forces domestic firms to innovate and improve productivity, benefiting the economy in the long run. <span class="ma-ann ma-ann-green">An</span>',
      },
      {
        label: 'Argument 2 — Against free trade',
        html: 'However, free trade can harm certain groups and industries. <strong>Developing countries</strong> may suffer if forced to compete with established industries in developed economies before they have achieved economies of scale — the <strong>infant industry argument</strong> suggests temporary protection is needed to allow new industries to grow. <span class="ma-ann ma-ann-blue">K</span> <strong>South Korea\'s</strong> industrial policy in the 1960s–80s protected its steel and automobile industries until they could compete globally — without this protection, Samsung and Hyundai may never have developed. <span class="ma-ann ma-ann-amber">A</span> Free trade can also cause <strong>structural unemployment</strong> in developed countries as manufacturing shifts to lower-cost locations — the decline of steel and textile industries in the UK and US Midwest illustrates this. <span class="ma-ann ma-ann-green">An</span>',
      },
      {
        label: 'Evaluation',
        html: 'The desirability of free trade depends on <strong>context</strong>. For established economies with competitive industries, free trade is overwhelmingly beneficial — it drives down costs and spurs innovation. <span class="ma-ann ma-ann-green">An</span> For developing countries, <strong>selective, temporary protection</strong> may be justified for infant industries, but must be time-limited to avoid creating permanently inefficient firms dependent on protection. <span class="ma-ann ma-ann-green">An</span> The <strong>distributional effects</strong> within countries are critical — even when free trade increases total welfare, the gains are unevenly shared, and without compensation for losers (retraining, social safety nets), political opposition to trade can grow, as seen with <strong>Brexit</strong> and US trade protectionism under recent administrations. <span class="ma-ann ma-ann-amber">A</span> Furthermore, reliance on global supply chains creates <strong>vulnerability</strong> — as COVID-19 demonstrated when shortages of medical supplies and semiconductors exposed the risks of over-dependence on foreign production. <span class="ma-ann ma-ann-amber">A</span>',
      },
      {
        label: 'Conclusion',
        html: 'On balance, free trade is <strong>beneficial for the global economy as a whole</strong>, but not unconditionally so for every country or group. The strongest case for protection is temporary infant industry support in developing economies. The strongest case against protection is that it raises consumer prices and shelters inefficiency. The optimal approach is <strong>managed liberalisation</strong> — pursuing free trade while maintaining social safety nets for displaced workers and allowing strategic protection in narrowly defined circumstances. <span class="ma-ann ma-ann-green">An</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
      { code: 'An', label: 'Analysis chain', color: 'green' },
    ],
    examinerCommentary: 'Excellent answer. The EU GDP estimate and South Korea industrial policy examples provide authoritative application. The evaluation section is outstanding — considering distributional effects, Brexit backlash, and COVID supply chain vulnerability shows exactly the contextual depth examiners reward. The "managed liberalisation" conclusion avoids simplistic yes/no and proposes a nuanced policy position.',
    likelyScore: '18–20 / 20',
  },

  // ── 4.3.3 Balance of Payments — 4 marks ──
  {
    id: 'current-account-deficit-4',
    subject: 'economics',
    unit: 4,
    sectionNumber: '4.3.3',
    sectionTitle: 'Balance of Payments & Exchange Rates',
    marks: 4,
    type: 'Knowledge & Application',
    commandWord: 'Explain',
    question: 'Explain what is meant by a current account deficit and give one possible cause.',
    markScheme: [
      { range: '1–2 marks', desc: 'Definition: imports exceed exports on the current account' },
      { range: '3–4 marks', desc: 'Application: one cause explained (e.g. strong currency, high consumer demand)' },
    ],
    peel: null,
    answerParagraphs: [
      {
        label: null,
        html: 'A <strong>current account deficit</strong> occurs when the value of <strong>imports of goods and services exceeds the value of exports</strong>, plus net primary and secondary income flows are negative overall. <span class="ma-ann ma-ann-blue">K</span> It means the country is spending more on foreign goods and services than it earns from selling to other countries. <span class="ma-ann ma-ann-blue">K</span><br><br>One possible cause is a <strong>strong (overvalued) exchange rate</strong>. When the pound is strong, UK exports become more expensive for foreign buyers (reducing export demand) while imports become cheaper for UK consumers (increasing import spending). <span class="ma-ann ma-ann-amber">A</span> This combination of falling exports and rising imports widens the current account deficit. <span class="ma-ann ma-ann-amber">A</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge/Definition', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
    ],
    examinerCommentary: 'Precise definition covering all current account components. The exchange rate mechanism is clearly developed — strong pound → expensive exports + cheap imports → deficit widens. Avoid saying "the country imports too much" — instead explain the mechanism driving the imbalance.',
    likelyScore: '4 / 4',
  },

  // ── 4.3.4 Poverty and Inequality — 8 marks ──
  {
    id: 'gini-lorenz-inequality-8',
    subject: 'economics',
    unit: 4,
    sectionNumber: '4.3.4',
    sectionTitle: 'Poverty and Inequality',
    marks: 8,
    type: 'Analysis',
    commandWord: 'Analyse',
    question: 'Analyse how the Lorenz curve and Gini coefficient are used to measure income inequality.',
    markScheme: [
      { range: '1–2 marks', desc: 'Knowledge: definition of Lorenz curve and Gini coefficient' },
      { range: '3–4 marks', desc: 'Application: how the diagram works with example countries' },
      { range: '5–8 marks', desc: 'Analysis: interpretation, limitations, comparison between countries' },
    ],
    peel: {
      point: 'The Lorenz curve shows cumulative income shares; the Gini coefficient summarises the gap between perfect equality and reality.',
      evidence: 'E.g. South Africa has a Gini of ~0.63 (very unequal) vs Sweden at ~0.27 (relatively equal).',
      explain: 'The further the Lorenz curve bows from the 45° line, the greater the inequality. The Gini = area between the line and curve / total area under the line.',
      link: 'Both tools are useful for comparing inequality between countries and tracking changes over time, though they have limitations.',
    },
    answerParagraphs: [
      {
        label: 'Para 1',
        html: 'The <strong>Lorenz curve</strong> is a graphical representation of income distribution. The horizontal axis shows the <strong>cumulative percentage of the population</strong> (from poorest to richest), and the vertical axis shows the <strong>cumulative percentage of income</strong> received. <span class="ma-ann ma-ann-blue">K</span> A <strong>45-degree line</strong> represents perfect equality — where each percentile of the population receives the same share of income. The further the Lorenz curve bows below this line, the <strong>greater the inequality</strong>. <span class="ma-ann ma-ann-blue">K</span>',
      },
      {
        label: 'Para 2',
        html: 'The <strong>Gini coefficient</strong> quantifies this inequality as a single number between <strong>0 and 1</strong>. It is calculated as the <strong>area between the 45° line and the Lorenz curve, divided by the total area under the 45° line</strong>. <span class="ma-ann ma-ann-blue">K</span> A Gini of 0 = perfect equality; a Gini of 1 = one person has all income. <strong>South Africa</strong> has a Gini of approximately 0.63, reflecting extreme inequality, while <strong>Sweden</strong> has a Gini of approximately 0.27, indicating relatively equal income distribution. <span class="ma-ann ma-ann-amber">A</span>',
      },
      {
        label: 'Para 3',
        html: 'These tools are valuable for <strong>comparing inequality between countries</strong> and tracking how distribution changes over time within a country. <span class="ma-ann ma-ann-green">An</span> However, they have limitations. The Gini coefficient does not show <strong>where in the distribution</strong> inequality occurs — two countries can have the same Gini but very different patterns of inequality (e.g. one with a large middle class vs one with extremes). <span class="ma-ann ma-ann-green">An</span> Both measures also only capture <strong>income inequality</strong>, not wealth inequality, which is typically far more concentrated. <span class="ma-ann ma-ann-green">An</span> They also rely on <strong>accurate data</strong> — in countries with large informal economies, official income data may understate true inequality. <span class="ma-ann ma-ann-green">An</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
      { code: 'An', label: 'Analysis chain', color: 'green' },
    ],
    examinerCommentary: 'Excellent explanation with correct technical detail. The South Africa vs Sweden comparison provides immediate context. Three limitations are identified, each with development. For top marks, a hand-drawn Lorenz curve diagram would be highly effective.',
    likelyScore: '7–8 / 8',
  },

  // ── 4.3.6 Growth and Development — 4 marks ──
  {
    id: 'barriers-development-4',
    subject: 'economics',
    unit: 4,
    sectionNumber: '4.3.6',
    sectionTitle: 'Growth and Development',
    marks: 4,
    type: 'Knowledge & Application',
    commandWord: 'Explain',
    question: 'Explain two barriers to economic development in developing countries.',
    markScheme: [
      { range: '1–2 marks', desc: 'First barrier identified and explained' },
      { range: '3–4 marks', desc: 'Second barrier identified and explained with development' },
    ],
    peel: null,
    answerParagraphs: [
      {
        label: null,
        html: 'First, <strong>corruption and weak governance</strong> divert resources away from productive use. <span class="ma-ann ma-ann-blue">K</span> When government officials embezzle aid money or demand bribes, investment in infrastructure, education, and healthcare is reduced. This discourages foreign investment and prevents the efficient allocation of resources needed for development. <span class="ma-ann ma-ann-amber">A</span><br><br>Second, <strong>primary product dependency</strong> makes countries vulnerable to volatile commodity prices. <span class="ma-ann ma-ann-blue">K</span> Countries like <strong>Nigeria</strong>, which relies heavily on oil exports, experience boom-and-bust cycles — when oil prices fall, government revenue collapses and development spending is cut. <span class="ma-ann ma-ann-amber">A</span> Reliance on a narrow export base also means the country fails to develop diversified manufacturing and services sectors needed for sustained development.',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
    ],
    examinerCommentary: 'Two distinct barriers with clear mechanisms. Corruption links to misallocation of resources and deterrence of FDI. Primary product dependency links to price volatility and lack of diversification. Nigeria provides concrete application.',
    likelyScore: '4 / 4',
  },

  // ── 4.3.6 Growth and Development — 8 marks ──
  {
    id: 'aid-vs-trade-development-8',
    subject: 'economics',
    unit: 4,
    sectionNumber: '4.3.6',
    sectionTitle: 'Growth and Development',
    marks: 8,
    type: 'Analysis',
    commandWord: 'Analyse',
    question: 'Analyse the view that trade is more effective than aid in promoting economic development.',
    markScheme: [
      { range: '1–2 marks', desc: 'Knowledge: definitions of aid and trade in context of development' },
      { range: '3–4 marks', desc: 'Application: named country examples' },
      { range: '5–8 marks', desc: 'Analysis: mechanisms through which trade and aid promote development, limitations of each' },
    ],
    peel: {
      point: 'Trade provides sustainable income and incentivises productivity growth, while aid can create dependency.',
      evidence: 'E.g. Vietnam\'s export-led growth lifted millions out of poverty; some aid-dependent African economies have not seen comparable gains.',
      explain: 'Trade integrates countries into global supply chains, attracts FDI, builds human capital, and generates tax revenue sustainably. Aid fills short-term gaps but may distort local markets and reduce incentives for reform.',
      link: 'The most effective approach combines market access for developing country exports with targeted aid for infrastructure and institutions.',
    },
    answerParagraphs: [
      {
        label: 'Para 1',
        html: '<strong>Foreign aid</strong> is financial or technical assistance from developed to developing countries, while <strong>trade</strong> involves developing countries exporting goods and services to earn income. <span class="ma-ann ma-ann-blue">K</span> Both aim to promote development, but through different mechanisms. <span class="ma-ann ma-ann-blue">K</span>',
      },
      {
        label: 'Para 2',
        html: 'Trade can be more effective because it provides <strong>sustainable, self-generating income</strong> rather than dependence on external donors. <span class="ma-ann ma-ann-green">An</span> <strong>Vietnam\'s</strong> integration into global supply chains since the 1990s — exporting textiles, electronics, and agricultural products — has lifted over 40 million people out of poverty and generated tax revenue that funds domestic infrastructure. <span class="ma-ann ma-ann-amber">A</span> Trade also incentivises <strong>productivity improvements</strong> — firms must become competitive to sell internationally, driving efficiency gains across the economy. <span class="ma-ann ma-ann-green">An</span>',
      },
      {
        label: 'Para 3',
        html: 'However, trade alone has limitations. Developing countries often face <strong>barriers to market access</strong> — developed countries\' tariffs, quotas, and subsidies (e.g. EU agricultural subsidies) can make it difficult for developing country exports to compete. <span class="ma-ann ma-ann-green">An</span> Aid is essential in specific contexts — <strong>emergency humanitarian aid</strong> saves lives during crises, and <strong>infrastructure aid</strong> (roads, ports, power) builds the foundation that makes trade possible in the first place. <span class="ma-ann ma-ann-green">An</span> Without basic infrastructure, a country cannot export competitively regardless of trade opportunities. The challenge with aid is <strong>dependency and corruption</strong> — long-term aid flows can reduce the incentive for governments to reform and may be captured by elites. <span class="ma-ann ma-ann-green">An</span>',
      },
    ],
    annotationLegend: [
      { code: 'K', label: 'Knowledge', color: 'blue' },
      { code: 'A', label: 'Application', color: 'amber' },
      { code: 'An', label: 'Analysis chain', color: 'green' },
    ],
    examinerCommentary: 'Balanced analysis that recognises trade\'s sustainability advantage while acknowledging aid\'s role in building foundations. Vietnam is an excellent application example. The point about developed country trade barriers is crucial — it shows that the issue is not just "trade vs aid" but whether developing countries actually have fair access to trade. For evaluative depth, note that the answer is context-dependent: landlocked, conflict-affected countries may need aid more than trade liberalisation.',
    likelyScore: '7–8 / 8',
  },

];
