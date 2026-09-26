/**
 * PACKET 51 — poverty-inequality teaching content. Seven blocks in the specification's own order,
 * twenty-four subsections, one subsection to a step.
 *
 * `audit/raw/econ_spec.txt:1788-1817`. The live section was two blocks of two subsections
 * (structure-04): "Types of Poverty" (absolute/relative poverty, the Lorenz curve and Gini) and
 * "Causes and Consequences" (causes of inequality, redistribution). It never taught measures of
 * poverty, the seven causes of changes in poverty, income against wealth inequality, inequality
 * between countries, five of the six impacts of inequality, development or capitalism (topFix-01,
 * specGap-01..06, specThin-01), yet quizzed several of them (structure-03). The rebuild follows the
 * specification's own lettering:
 *
 *   1  Absolute and Relative Poverty                                   1a, 1b                  3
 *   2  Causes of Changes in Poverty: Growth, Skills, Benefits and Tax   1c-1 .. 1c-4            4
 *   3  Causes of Changes in Poverty: Structural Change, Aid and Conflict 1c-5 .. 1c-7           3
 *   4  Measuring Inequality                                            2a, 2b-1, 2b-2          3
 *   5  Causes of Inequality                                            2c (within, between)    3
 *   6  The Impact of Inequality                                        2d-1 .. 2d-6            5
 *   7  Development, Economic Change and Capitalism                     2e, 2f                  3
 *
 * Seven is the ceiling: three pre-test items plus one check-in item per chapter is FREE_QUIZ_MAX (10).
 *
 * ── THE CONFLATION topFix-02 / accuracy-02 NAMED ──────────────────────────────
 *
 * The live body said growth "may worsen relative poverty if the gains accrue disproportionately to
 * the rich" and called a rising Gini "relative inequality". Relative poverty is the share of people
 * below a line set at a fraction of the MEDIAN; the rich pulling away moves the Gini and leaves the
 * median — and so relative poverty — where it was. Chapter 1's diagram draws exactly that case from
 * the spine (Gini 0.39 → 0.49, relative poverty 30% → 30%), and every surface says the same thing.
 */
import {
  SECTION, subId, id, ECON, usd, pct, g2, POVERTY_LINE_SOURCE,
} from './_packet51-util.mjs';

const E = ECON;
const blockId = (title) => id('block', title);
const recall = (sid, spec) => ({ id: `${sid}:recall`, ...spec });

export const B1 = 'Absolute and Relative Poverty';
export const B2 = 'Causes of Changes in Poverty: Growth, Skills, Benefits and Tax';
export const B3 = 'Causes of Changes in Poverty: Structural Change, Aid and Conflict';
export const B4 = 'Measuring Inequality';
export const B5 = 'Causes of Inequality';
export const B6 = 'The Impact of Inequality';
export const B7 = 'Development, Economic Change and Capitalism';

/* ══ Block 1 — Absolute and Relative Poverty (4.3.4 · 1a, 1b) ═══════════════ */

const absoluteRelative = (() => {
  const sid = subId('absolute-relative-poverty');
  return {
    id: sid,
    title: 'Absolute and Relative Poverty',
    keyIdea: 'Absolute poverty is too little income to survive decently. Relative poverty is income far below what is typical in your own society.',
    body: [
      { type: 'paragraph', text: '**Absolute poverty** is an income too low to buy the essentials of survival: enough food, safe water, shelter and clothing. It is measured against a fixed line, so it does not depend on how anyone else lives.' },
      { type: 'paragraph', text: '**Relative poverty** is an income so far below the typical income of the society a person lives in that they cannot take part in its normal way of life. The line is set as a fraction of **median** income — the income of the person in the middle — so it moves whenever the middle moves.' },
      { type: 'paragraph', text: 'The two can move in different directions. If every income in a country rises by the same percentage, some people cross the fixed absolute line, but the gap between the poorest and the middle is unchanged in proportion, so relative poverty stays the same. And a family can escape absolute poverty and still be relatively poor.' },
      { type: 'paragraph', text: 'Relative poverty is **not** the same thing as inequality. It depends on the bottom of the distribution compared with the middle. If the richest pull further ahead while the middle and the bottom stay put, inequality rises but relative poverty does not change.' },
    ],
    realExample: { emoji: '🌏', text: 'China\'s fast growth over several decades moved a huge share of its people above the international poverty line, while the gap between its cities and its countryside widened. Absolute poverty and inequality were answering different questions.' },
    misconception: 'Students treat relative poverty as another word for inequality and write that relative poverty rose "because the rich got richer". A richer top leaves the median, and so the relative line, where it was. Say what happened to the bottom compared with the middle.',
    examMatters: 'A Define is worth 2 marks: one for the idea, one for the benchmark. For absolute poverty the benchmark is a fixed line of basic needs; for relative poverty, a fraction of median income in that society.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete each statement about the two kinds of poverty:',
      template: [
        'A family whose income cannot buy enough to eat or a roof over their heads is in ___ poverty.',
        'A family that can eat but lives far below the households around it is in ___ poverty.',
        'Its line is not fixed: it is pegged to the income found at the exact ___ of the ranked list.',
      ],
      answers: ['absolute', 'relative', 'middle'],
      hints: ['judged against a fixed line of survival needs', 'judged against the rest of that society', 'halfway along, with as many above as below'],
      distractors: ['extreme', 'top'],
    }),
  };
})();

const measuringAbsolute = (() => {
  const sid = subId('measuring-absolute-poverty');
  return {
    id: sid,
    title: 'Measuring Absolute Poverty',
    keyIdea: 'Absolute poverty is measured against a fixed poverty line: how many people fall below it, how far below they fall, and which basic needs they go without.',
    body: [
      { type: 'paragraph', text: `The World Bank's **international poverty line** is ${usd(E.absLine)} a day per person, measured at purchasing power parity (PPP) in 2021 prices, so that a dollar buys the same basket in every country (${POVERTY_LINE_SOURCE}). It replaced an earlier, lower line when new price data were published.` },
      { type: 'paragraph', text: 'A line becomes a measure in three ways:' },
      { type: 'bullets', items: [
        `**Headcount ratio**: the share of the population below the line. In ${E.country}, ${pct(E.absRate)} of its ${E.population} million people — ${E.absPeople} million — live on less than ${usd(E.absLine)} a day.`,
        `**Poverty gap**: how far below the line the poor are. ${E.country}'s poorest tenth lives on ${usd(E.base[0])} and the next on ${usd(E.base[1])}, so their shortfalls are ${usd(E.shortfalls[0])} and ${usd(E.shortfalls[1])}: an average of ${usd(E.avgShortfall)} a day, or about $${E.totalGap} million a day across everyone below the line.`,
        '**Multidimensional Poverty Index (MPI)**: counts deprivations directly — in health, schooling and living standards such as clean water and electricity — rather than income.',
      ] },
      { type: 'paragraph', text: 'The headcount alone can mislead: a policy that lifts the people just below the line out of poverty improves the headcount most while leaving the very poorest untouched. The gap shows the depth that the headcount hides.' },
    ],
    realExample: { emoji: '📋', text: 'The global Multidimensional Poverty Index is published by the United Nations Development Programme with the Oxford Poverty and Human Development Initiative. It counts a person as poor if they are deprived in enough of its indicators, such as schooling, child deaths and access to water.' },
    misconception: 'Students quote the poverty line as if it were the measure. The line is only the threshold; the measure is the share below it (the headcount) or the distance below it (the gap). Name which one a figure is.',
    examMatters: 'In a Calculate on poverty, write the formula in words before the numbers — share below the line, or shortfall below the line — and state the units: per cent of people, or dollars a day.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Work out these poverty measures for a different country:',
      template: [
        'Of its 50 million people, 8 million live on less than the international line, so its headcount ratio is ___.',
        'Two poor workers there earn $2.00 and $2.50 a day, so their average shortfall below the $3.00 line is ___ a day.',
        'A survey that records missing schooling, clean water and electricity instead of income treats poverty as ___.',
      ],
      answers: ['16%', '$0.75', 'multidimensional'],
      hints: ['people below the line as a share of everyone', 'how far each falls short of the line, averaged', 'it counts several kinds of deprivation at once'],
      distractors: ['8%', '$1.25', 'temporary'],
    }),
  };
})();

const measuringRelative = (() => {
  const sid = subId('measuring-relative-poverty');
  return {
    id: sid,
    title: 'Measuring Relative Poverty',
    keyIdea: 'Relative poverty is measured as the share of people below a line set at a fraction of median income, commonly 50% or 60%.',
    body: [
      { type: 'paragraph', text: 'Measuring relative poverty starts from the whole distribution of incomes, not from a price list of basic needs:' },
      { type: 'flow', resultType: 'neutral', steps: [
        { title: 'Rank every income', subtitle: 'Poorest to richest' },
        { title: 'Find the median', subtitle: 'The middle income' },
        { title: 'Set the line', subtitle: 'A fraction of the median' },
        { title: 'Count below it', subtitle: 'The relative headcount' },
      ] },
      { type: 'paragraph', text: `In ${E.country} the median income is ${usd(E.median)} a day. A line at ${E.relShare}% of it is ${usd(E.relLine)}, and ${pct(E.relRate)} of people fall below it — more than the ${pct(E.absRate)} below the absolute line, because the relative line is higher.` },
      { type: 'paragraph', text: 'Because the line is tied to the median, the measure reacts only to the bottom compared with the middle. Richer households at the top can gain or lose without changing it at all. That is what makes it a measure of exclusion from ordinary life in that society, rather than of how unequal incomes are overall.' },
    ],
    realExample: { emoji: '🇪🇺', text: 'The European Union\'s at-risk-of-poverty rate counts people living on less than 60% of their own country\'s median disposable income, adjusted for household size (source: Eurostat, at-risk-of-poverty rate definition).' },
    misconception: 'Students set the relative line at a fraction of the mean. It is the median: a few very high incomes lift the mean, so a mean-based line would rise when only the rich gained, which is the confusion with inequality over again.',
    examMatters: 'When a question gives a median and a percentage, the relative line is the median times that percentage. Show the step: 60% of a $10.00 median is $6.00.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the steps a statistics office follows to measure relative poverty in order, from the raw survey to the final figure:',
      correctOrder: [
        'List the survey households from the lowest income to the highest',
        'Read off the income of the household exactly halfway up that list',
        'Take the agreed percentage of that middle figure to fix the threshold',
        'Work out what share of households have incomes under the threshold',
      ],
      criterion: 'the order the measure is built in: each step needs the result of the one before',
      why: [
        'Nothing can be read off until the incomes are in order.',
        'The middle of an ordered list is the median.',
        'The relative line is defined as a fraction of the median, so it needs the median first.',
        'Only once the line exists can the households below it be counted.',
      ],
    }),
  };
})();

/* ══ Block 2 — Causes of Changes in Poverty: Growth, Skills, Benefits and Tax (1c-1 .. 1c-4) ══ */

const economicGrowth = (() => {
  const sid = subId('economic-growth');
  return {
    id: sid,
    title: 'Economic Growth',
    keyIdea: 'Growth that raises incomes at the bottom reduces absolute poverty. Whether relative poverty falls depends on who gains compared with the middle.',
    body: [
      { type: 'paragraph', text: `**Economic growth** raises average incomes, and that is the main way absolute poverty has fallen across the world: more jobs, higher wages and more tax revenue for public services. If ${E.country}'s incomes all rise by ${E.growthPct}%, the share below ${usd(E.absLine)} a day falls from ${pct(E.absRate)} to ${pct(E.evenAbs)}.` },
      { type: 'paragraph', text: `The same growth leaves relative poverty where it was. The median rises from ${usd(E.median)} to ${usd(E.evenMedian)}, the relative line rises with it to ${usd(E.evenRelLine)}, and ${pct(E.evenRel)} of people are still below it. Relative poverty falls only if the bottom gains faster than the middle.` },
      { type: 'flow', resultType: 'good', steps: [
        { title: 'Output grows', subtitle: 'More jobs and higher wages' },
        { title: 'Low incomes rise', subtitle: 'People cross the fixed line' },
        { title: 'Absolute poverty falls', subtitle: 'Relative poverty depends on shares' },
      ] },
      { type: 'paragraph', text: 'Growth does not always reach the poor. Labour-intensive growth — factories, farming, tourism — spreads jobs widely; growth from a capital-intensive mine or oil field may create few, and growth concentrated in cities can leave rural households behind.' },
    ],
    realExample: { emoji: '🇻🇳', text: 'Vietnam\'s rapid growth after its market reforms, much of it in labour-intensive manufacturing and farming, cut the share of its people in extreme poverty dramatically.' },
    misconception: 'Students write that growth reduces "poverty" without saying which kind. Evenly shared growth cuts absolute poverty and leaves relative poverty unchanged; growth that bypasses the bottom can leave both unchanged.',
    examMatters: 'In an Evaluate on growth and poverty, the judgement turns on the pattern of growth: labour-intensive growth that raises wages at the bottom reduces poverty far more than the same growth rate from a mine.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each pattern of growth to what it does to poverty:',
      pairs: [
        { left: 'Every income rises by a tenth', right: 'Fewer below the fixed line; the share under the median-based line is unchanged', why: 'The absolute line stays put while the relative line rises in step with the median.' },
        { left: 'Only the richest tenth gains', right: 'Both poverty counts stay where they were', why: 'Nobody near either line has more income, and the median has not moved.' },
        { left: 'Pay rises for the poorest, the middle stays flat', right: 'Both poverty counts fall', why: 'The poorest cross the fixed line and close in on the unchanged median.' },
        { left: 'Middle incomes rise, the poorest stand still', right: 'Absolute poverty unchanged, relative poverty rises', why: 'The median-based line climbs away from incomes that did not move.' },
      ],
    }),
  };
})();

const educationTraining = (() => {
  const sid = subId('education-training');
  return {
    id: sid,
    title: 'Education and Training',
    keyIdea: 'Education and training raise the skills and so the earnings of the poor, which lifts them out of poverty slowly but lastingly.',
    body: [
      { type: 'paragraph', text: '**Education and training** raise what a worker can produce and so what employers will pay. A farm labourer who learns to read, a school-leaver who trains as an electrician, and a mother who learns bookkeeping for her stall can each earn more.' },
      { type: 'flow', resultType: 'good', steps: [
        { title: 'Skills are gained', subtitle: 'Schooling or training' },
        { title: 'Better-paid work', subtitle: 'Higher productivity' },
        { title: 'Household income rises', subtitle: 'Above the poverty line' },
      ] },
      { type: 'paragraph', text: 'Because the poorest have the least schooling, spreading it to them narrows the gap between the bottom and the middle, so it can reduce **relative** poverty as well as absolute poverty. Educated parents also tend to keep their own children in school, so the effect carries into the next generation.' },
      { type: 'paragraph', text: 'The limits: the effect takes years to arrive; it needs jobs for the newly skilled to go to; and if only better-off families can afford secondary and university education, it can widen the gap instead.' },
    ],
    realExample: { emoji: '🎓', text: 'Bangladesh paid stipends to girls attending secondary school, which raised enrolment among poor rural families and delayed early marriage.' },
    misconception: 'Students present education as a quick fix. It is slow — a child starting school now reaches the labour market years later — and it raises incomes only if there is demand for the skills it gives.',
    examMatters: 'For an Explain on education and poverty (4 marks), build the chain: skills, productivity, wages, income against the line. Each link is a mark; "education is good for the poor" is none.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put this chain in causal order, from the training course to the household leaving poverty:',
      correctOrder: [
        'A young woman gains nursing skills on a course funded by the state',
        'Nursing is scarce, qualified work that hospitals value highly',
        'The town clinic hires her for better-paid work than her old farm job',
        'Her household income per person climbs above the poverty line',
      ],
      criterion: 'cause to effect: each step is caused by the one before it',
      why: [
        'The chain starts with the new skill.',
        'The skill raises what her work is worth to an employer.',
        'Because her work is worth more, she is paid more.',
        'The higher wage lifts the household\'s income past the line.',
      ],
    }),
  };
})();

const welfareBenefits = (() => {
  const sid = subId('welfare-benefits');
  return {
    id: sid,
    title: 'Welfare Benefits',
    keyIdea: 'Welfare benefits transfer income straight to poor households, so they cut poverty quickly — if they reach the poor and are large enough.',
    body: [
      { type: 'paragraph', text: '**Welfare benefits** are payments from the state to households: pensions, unemployment pay, child allowances and cash transfers to the poorest. They are the fastest way to change poverty, because they raise income directly rather than waiting for growth or skills.' },
      { type: 'paragraph', text: `Suppose ${E.country} pays ${usd(E.benefit)} a day to each person in its three poorest tenths. Their incomes rise to ${usd(E.withBenefit[0])}, ${usd(E.withBenefit[1])} and ${usd(E.withBenefit[2])}. The share below ${usd(E.absLine)} falls from ${pct(E.absRate)} to ${pct(E.benefitAbs)}, and — because the median has not moved — the share below the relative line falls from ${pct(E.relRate)} to ${pct(E.benefitRel)}. The cost is $${E.benefitCost} million a day.` },
      { type: 'paragraph', text: 'Cutting benefits works the other way: the poorest lose income at once and both measures can rise. That is why poverty often increases when governments cut spending in a crisis.' },
      { type: 'paragraph', text: 'Benefits work only if they reach the poor. Many poor households work informally, have no bank account or identity papers, and never appear on the government\'s lists, while benefits paid to everyone cost far more per poor person helped.' },
    ],
    realExample: { emoji: '🇧🇷', text: 'Brazil\'s Bolsa Família pays monthly cash to low-income families on condition that their children attend school and have health check-ups, and it is widely credited with reducing extreme poverty.' },
    misconception: 'Students assume a benefit that lifts a family above the absolute line must also lift it out of relative poverty. The relative line is usually higher; a small benefit can clear one and not the other.',
    examMatters: 'When a question gives a benefit and a set of incomes, recount both measures: the absolute headcount against the fixed line, and the relative headcount against a median that may or may not have moved.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'A government pays a cash benefit in a different country. Complete the working:',
      template: [
        'A widow living on $2.40 a day receives a benefit of $1.00 a day, so her income becomes ___ a day.',
        'Against a poverty line of $3.00, she is now ___ the line.',
        'The median of $8.00 is unchanged, so a relative line at 60% of it stands at ___ a day.',
      ],
      answers: ['$3.40', 'above', '$4.80'],
      hints: ['old income plus the payment', 'compare her new income with the fixed threshold', 'six tenths of the middle income'],
      distractors: ['$2.60', 'below', '$5.60'],
    }),
  };
})();

const taxStructure = (() => {
  const sid = subId('tax-structure');
  return {
    id: sid,
    title: 'Changes in Tax Structure',
    keyIdea: 'Who pays tax, and on what, changes the income left to the poor. Shifting tax onto spending tends to raise poverty; taxing the rich to pay benefits tends to cut it.',
    body: [
      { type: 'paragraph', text: 'The **tax structure** is the mix of taxes a government uses and how each falls on rich and poor. Poor households spend almost all of their income, so a tax on spending takes a larger share of their income than of a rich household\'s. A tax on high incomes, profits or property falls mainly on the better-off. (How taxes are classed as progressive, proportional or regressive is topic 4.3.5.)' },
      { type: 'bullets', items: [
        'Raising a sales tax on food, fuel and clothing while cutting the top rate of income tax shifts the burden onto the poor and can push people below the line.',
        'Raising the income level at which income tax starts leaves more with low earners.',
        `Taxing the richest to fund benefits cuts poverty twice: in ${E.country}, a tax of ${usd(E.topTax)} a day on each person in the top tenth pays for the ${usd(E.benefit)} benefit to the poorest three.`,
      ] },
      { type: 'paragraph', text: 'How far a tax change reaches the poor also depends on who actually pays it. Many poor workers earn too little, or work too informally, to pay income tax at all, so cutting income tax does little for them, while a tax on basic goods reaches every household.' },
    ],
    realExample: { emoji: '🇸🇦', text: 'Saudi Arabia introduced a value added tax and later raised its rate sharply, and set up a monthly "Citizen\'s Account" cash allowance for lower-income households to offset the higher cost of living.' },
    misconception: 'Students assume that any tax cut helps the poor. Cutting income tax helps only those who earn enough to pay it; the poorest gain nothing and may lose if the lost revenue is made up with taxes on spending.',
    examMatters: 'Name the tax and who pays it. "Higher taxes reduce poverty" earns nothing; "a higher tax on top incomes, spent on transfers to the poorest" is a chain a mark scheme can reward.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each tax change by its likely effect on the number of people in poverty — likely to raise it or likely to reduce it:',
      groups: [
        { name: 'Likely to raise poverty', items: ['A new tax on cooking oil, rice and bus fares', 'The top income tax rate is cut and a sales tax raised to replace the revenue', 'Exemptions on basic foods are removed from the sales tax'], why: 'Each moves more of the tax burden onto spending on essentials, which is most of what a poor household buys.' },
        { name: 'Likely to reduce poverty', items: ['The income level where income tax begins is raised', 'A tax on large landholdings pays for school meals', 'Luxury cars are taxed and the revenue funds cash transfers'], why: 'Each leaves more with low earners or takes from the better-off to spend on the poor.' },
      ],
    }),
  };
})();

/* ══ Block 3 — Structural Change, Aid and Conflict (1c-5 .. 1c-7) ════════════ */

const structuralChange = (() => {
  const sid = subId('structural-change');
  return {
    id: sid,
    title: 'Structural Changes in the Economy',
    keyIdea: 'Structural change shifts work between industries. It can lift people out of poverty when they move to better jobs, and push them in when their industry shrinks.',
    body: [
      { type: 'paragraph', text: '**Structural change** is a lasting shift in what an economy produces and where people work: from farming to manufacturing, from manufacturing to services, from one region to another. It is driven by new technology, trade and changing demand.' },
      { type: 'paragraph', text: 'It can reduce poverty. When farm workers move to factory jobs that pay more, household incomes rise; this is how much of East Asia\'s absolute poverty fell.' },
      { type: 'paragraph', text: `It can also increase poverty. When an industry declines, its workers often cannot move into the growing ones: their skills do not match, the new jobs are in another region, or they are older. If ${E.country}'s textile mills close and the fourth tenth drops from ${usd(E.base[3])} to informal work at ${usd(E.millIncome)} a day, the share below the absolute line rises from ${pct(E.absRate)} to ${pct(E.millsAbs)}.` },
      { type: 'flow', resultType: 'bad', steps: [
        { title: 'An industry declines', subtitle: 'Imports, automation or falling demand' },
        { title: 'Its workers lose jobs', subtitle: 'Skills fit no local vacancy' },
        { title: 'Poverty rises locally', subtitle: 'Unemployment or informal work' },
      ] },
      { type: 'paragraph', text: 'The poverty is concentrated: whole towns lose their main employer, and local shops and suppliers lose their customers too.' },
    ],
    realExample: { emoji: '⛏️', text: 'When copper prices collapsed and Zambia\'s mines cut jobs, poverty rose sharply in the Copperbelt towns that had depended on them.' },
    misconception: 'Students treat structural change as unemployment that ends when the economy recovers. It is a mismatch: the lost jobs do not come back, so poverty lasts unless workers retrain or move.',
    examMatters: 'Define the term before using it: a lasting shift in the industries an economy relies on. Then name the mechanism — mismatched skills or location — and say who is made poor.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put these events in causal order, from the closure of a coal mine to rising poverty in the town:',
      correctOrder: [
        'Cheaper imported fuel makes the town\'s coal mine unprofitable and it shuts',
        'Hundreds of miners find their digging skills are wanted by no employer nearby',
        'Shops and suppliers lose the miners\' spending and lay off staff as well',
        'More families in the town live on incomes below the poverty line',
      ],
      criterion: 'cause to effect: each event is caused by the one before it',
      why: [
        'The shift in the economy comes first: the industry is no longer viable.',
        'The closure leaves workers whose skills do not match the jobs that exist.',
        'Their lost income spreads to the businesses they bought from.',
        'With wages gone across the town, household incomes fall below the line.',
      ],
    }),
  };
})();

const aid = (() => {
  const sid = subId('aid');
  return {
    id: sid,
    title: 'Aid',
    keyIdea: 'Aid can reduce poverty directly, through transfers and services for the poor, or indirectly, through growth. Its effect depends on what it pays for and who controls it.',
    body: [
      { type: 'paragraph', text: '**Aid** is money, goods or services given by foreign governments, international organisations or charities, or lent on better-than-market terms. It changes poverty in two ways.' },
      { type: 'bullets', items: [
        `**Directly**: food, cash, clinics, vaccines and schools reach poor households now. A donor-funded transfer of ${usd(E.aidTransfer)} a day to ${E.country}'s second-poorest tenth lifts it from ${usd(E.base[1])} to ${usd(E.aided[1])}, and the share below the absolute line falls from ${pct(E.absRate)} to ${pct(E.aidAbs)}.`,
        '**Indirectly**: roads, power and irrigation raise output and create jobs, reducing poverty through growth over years.',
      ] },
      { type: 'paragraph', text: 'Aid can also fail the poor. Money can be diverted by corruption, spent on donors\' priorities rather than local needs, or tied to buying the donor\'s own goods. Food aid dumped on local markets can undercut the farmers it was meant to help. How aid works as a development strategy is topic 4.3.6.' },
    ],
    realExample: { emoji: '💉', text: 'Donor-funded vaccination and malaria bed-net programmes, such as those financed by Gavi and the Global Fund, have reduced child deaths in many of the poorest countries.' },
    misconception: 'Students treat every dollar of aid as money handed to the poor. Much of it is not: tied aid must be spent on the donor\'s own goods, a loan must be repaid, and a dam or road reaches poor households only through the jobs and output it creates.',
    examMatters: 'Distinguish the direct route from the indirect one, and weigh it by what the aid is spent on and who controls it. That is the evaluation an essay on aid and poverty needs.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each kind of aid to the way it changes poverty:',
      pairs: [
        { left: 'Monthly cash sent to the phones of poor households', right: 'Raises the income of the poor straight away', why: 'A transfer adds to household income directly.' },
        { left: 'A donor-built dam and irrigation scheme', right: 'Lifts farm output and jobs over several years', why: 'Infrastructure works indirectly, through production.' },
        { left: 'Free grain shipped in and sold cheaply in local markets', right: 'Can lower the prices local farmers receive', why: 'Extra supply pushes down what local growers earn.' },
        { left: 'A loan that must be spent on the donor\'s own machinery', right: 'Delivers less than its face value to the poor', why: 'Tied aid can cost more than buying elsewhere.' },
      ],
    }),
  };
})();

const civilWarConflict = (() => {
  const sid = subId('civil-war-conflict');
  return {
    id: sid,
    title: 'Civil Wars and Conflict',
    keyIdea: 'Conflict destroys incomes, assets and services at once, so it can push large numbers of people into absolute poverty very quickly.',
    body: [
      { type: 'paragraph', text: '**Civil wars and conflict** cause poverty through several channels at the same time:' },
      { type: 'bullets', items: [
        'Incomes collapse: farms cannot be worked, markets close and firms stop trading.',
        'Assets are destroyed: homes, livestock, tools and roads.',
        'People are displaced, losing land and work, and many flee abroad as refugees.',
        'Public services fail: clinics and schools close and spending moves to the army.',
      ] },
      { type: 'paragraph', text: `If a war cuts every income in ${E.country}'s poorer half by ${E.warFall}%, the share below the absolute line doubles, from ${pct(E.absRate)} to ${pct(E.warAbs)}.` },
      { type: 'paragraph', text: 'The effects last beyond the fighting. Children miss years of school, land mines keep fields unused, and investors stay away, so poverty stays high long after peace. Poverty can in turn feed conflict, by giving young men with no income a reason to join armed groups. How conflict constrains growth and development is topic 4.3.6.' },
    ],
    realExample: { emoji: '🕊️', text: 'Years of conflict in Yemen and South Sudan destroyed livelihoods and markets, leaving large shares of their populations dependent on food aid.' },
    misconception: 'Students assume poverty falls back to its pre-war level as soon as the fighting stops. Children who missed school earn less for the rest of their lives, and homes, tools and roads must be rebuilt, so poverty stays high long after peace.',
    examMatters: 'In an Analyse, one channel developed in linked stages beats four listed. Displacement, for example: lost land, no income, dependence on aid, children out of school.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Conflict reaches a farming family in a different country. Complete the working:',
      template: [
        'The family lived on $3.50 a day each; fighting cuts their income by a fifth, to ___ a day.',
        'Against a $3.00 poverty line, the family is now ___ the line.',
        'They flee their land and become ___ in a camp across the border.',
      ],
      answers: ['$2.80', 'below', 'refugees'],
      hints: ['take one fifth off the old income', 'compare the new income with the fixed threshold', 'people who have crossed a border to escape fighting'],
      distractors: ['$3.30', 'above', 'migrants'],
    }),
  };
})();

/* ══ Block 4 — Measuring Inequality (2a, 2b) ════════════════════════════════ */

const incomeWealth = (() => {
  const sid = subId('income-wealth-inequality');
  return {
    id: sid,
    title: 'Income Inequality and Wealth Inequality',
    keyIdea: 'Income is a flow received over time; wealth is a stock of assets owned at a point in time. Wealth is almost always far more unequal than income.',
    body: [
      { type: 'paragraph', text: '**Income** is a flow: wages, profits, rent, interest and benefits received over a period, such as a month. **Wealth** is a stock: the value of what a household owns at one moment — land, housing, savings, shares and businesses — minus its debts.' },
      { type: 'paragraph', text: '**Income inequality** is how unevenly income is shared between people; **wealth inequality** is how unevenly wealth is held. The two are linked: wealth produces income (rent, interest, dividends), and high income can be saved to build wealth.' },
      { type: 'paragraph', text: `Wealth is far more unequal. In ${E.country} the richest tenth receives ${pct(E.topShare)} of all income but owns ${pct(E.wealthTop)} of all wealth, while the poorer half receives ${pct(E.bottomHalfShare)} of income and owns just ${pct(E.wealthBottomHalf)} of wealth. Many poor households own almost nothing, and some owe more than they own.` },
      { type: 'paragraph', text: 'The difference matters for policy and for security. A household with wealth can survive losing its income for a while; one with none falls into poverty the moment its income stops.' },
    ],
    realExample: { emoji: '🏠', text: 'Across the countries that report both, the richest tenth of households hold a much larger share of wealth than of income (source: OECD Wealth Distribution Database).' },
    misconception: 'Students use "income" and "wealth" as if they were the same. A retired farmer with valuable land and little cash income is income-poor and wealthy; a young doctor with a high salary and a large loan is the reverse.',
    examMatters: 'A Define of either term needs its flow or stock nature and an example. Then say which one a figure measures, because a Gini coefficient can be calculated for either.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each item into income (a flow) or wealth (a stock):',
      groups: [
        { name: 'Income', items: ['The monthly rent a landlord collects', 'A nurse\'s weekly pay', 'Interest paid into a savings account this year', 'A pension payment received each month'], why: 'Each is received over a period of time.' },
        { name: 'Wealth', items: ['The house the landlord owns', 'Shares in a listed company', 'A farm and its livestock', 'The balance in a savings account today'], why: 'Each is an asset owned at a point in time.' },
      ],
    }),
  };
})();

const lorenzCurve = (() => {
  const sid = subId('lorenz-curve');
  return {
    id: sid,
    title: 'The Lorenz Curve',
    keyIdea: 'The Lorenz curve plots the cumulative share of income against the cumulative share of people, poorest first. The further it bows below the diagonal, the more unequal.',
    body: [
      { type: 'paragraph', text: 'The **Lorenz curve** shows the whole distribution in one line. The horizontal axis is the cumulative percentage of the population, ranked from poorest to richest; the vertical axis is the cumulative percentage of income they receive.' },
      { type: 'flow', resultType: 'neutral', steps: [
        { title: 'Rank the population', subtitle: 'Poorest first' },
        { title: 'Group into equal parts', subtitle: 'Tenths or fifths' },
        { title: 'Add up income shares', subtitle: 'Cumulatively' },
        { title: 'Plot the points', subtitle: 'And join them' },
      ] },
      { type: 'paragraph', text: `The diagonal is the **line of equality**: if everyone had the same income, the poorest 40% would have 40% of income. A real curve sags below it. In ${E.country} the poorest tenth receives ${pct(E.lorenz[0] * 100)} of income and the poorest half ${pct(E.lorenz[4] * 100)}, so its curve passes well below the diagonal.` },
      { type: 'paragraph', text: 'Comparing curves: a curve lying entirely inside another shows a more equal distribution. If two curves cross, one society is more equal at the bottom and the other at the top, and no single ranking is possible without a number such as the Gini coefficient.' },
    ],
    realExample: { emoji: '📉', text: 'South Africa\'s Lorenz curve bows further from the line of equality than almost any other country\'s, reflecting one of the highest levels of income inequality measured (source: World Bank, Poverty and Inequality Platform).' },
    misconception: 'Students swap the axes, or draw the curve above the diagonal. People go along the bottom and income up the side, and the curve can never rise above the line of equality, because the poorest x% cannot have more than x% of income.',
    examMatters: 'A Lorenz diagram earns its marks from labelled axes (cumulative % of population, cumulative % of income), a labelled line of equality, and a curve that starts at the origin and ends at the top corner.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the stages of drawing a Lorenz curve and reading a Gini coefficient from it in order, from the survey data to the final number:',
      correctOrder: [
        'Rank the whole surveyed population from the lowest income to the highest',
        'Split them into equal groups, such as fifths of everyone surveyed',
        'Add up the share of total income going to each group and all poorer ones',
        'Plot those cumulative shares against the cumulative share of people and join them',
        'Divide the area between the diagonal and the curve by the whole area under the diagonal',
      ],
      criterion: 'the order the curve and the coefficient are built in: each stage uses the result of the one before',
      why: [
        'Cumulative shares only make sense once people are in order from poorest.',
        'The ranked population is then cut into equal groups.',
        'Each point is the running total of income up to that group.',
        'Those running totals are the points the curve joins.',
        'The Gini coefficient is read from the finished curve: area A over A plus B.',
      ],
    }),
  };
})();

const giniCoefficient = (() => {
  const sid = subId('gini-coefficient');
  return {
    id: sid,
    title: 'The Gini Coefficient',
    keyIdea: 'The Gini coefficient is area A (between the diagonal and the Lorenz curve) divided by A + B (the whole area under the diagonal). 0 is perfect equality; 1 is maximum inequality.',
    body: [
      { type: 'paragraph', text: 'The **Gini coefficient** turns the Lorenz curve into one number. Call the area between the line of equality and the curve **A**, and the area below the curve **B**. Then Gini = A ÷ (A + B).' },
      { type: 'paragraph', text: 'At one extreme, the curve lies on the diagonal, A is zero, and so is the coefficient: incomes are identical. At the other, one person receives everything, B shrinks to nothing, and the coefficient reaches one. It is sometimes written as a number from 0 to 100 instead.' },
      { type: 'paragraph', text: `On a diagram with both axes running from 0 to 1, A + B is always half the square, ${g2(0.5)}. ${E.country}'s areas are A = ${E.areaA} and B = ${E.areaB}, so its Gini coefficient is ${E.areaA} ÷ ${g2(0.5)} = ${g2(E.gini)}. Its wealth Gini is ${g2(E.wealthGini)}.` },
      { type: 'paragraph', text: 'Its limits: very different distributions can share one coefficient, so it cannot say where in the distribution the inequality lies; it depends on survey data that miss the very richest; and a figure for income tells you nothing about wealth.' },
    ],
    realExample: { emoji: '🌐', text: 'Nordic countries such as Denmark and Norway have some of the lowest income Gini coefficients in the world; South Africa, Namibia and Brazil have some of the highest (source: World Bank, Poverty and Inequality Platform).' },
    misconception: 'Students read a Gini of 0.4 as "40% of people are poor". It is a ratio of two areas and says nothing about how many people are in poverty; a country can have a high Gini and little absolute poverty.',
    examMatters: 'A Calculate on the Gini coefficient is A ÷ (A + B), with the working. Read the question for which area is given: if only B is given, A is 0.5 minus B on a unit square.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete each statement about the Gini coefficient, written on its 0 to 1 scale:',
      template: [
        'If every person in a country received exactly the same income, its Gini coefficient would be ___.',
        'If a single person received all of a country\'s income, its Gini coefficient would be ___.',
        'With area A = 0.12 and area B = 0.38 on a unit square, the Gini coefficient is ___.',
      ],
      answers: ['zero', 'one', '0.24'],
      hints: ['the Lorenz curve lies on the diagonal', 'the curve hugs the bottom and right edges', 'A divided by A plus B'],
      distractors: ['0.5', '0.32', '0.76'],
    }),
  };
})();

/* ══ Block 5 — Causes of Inequality (2c) ═══════════════════════════════════ */

const incomeWithin = (() => {
  const sid = subId('income-inequality-within');
  return {
    id: sid,
    title: 'Causes of Income Inequality Within a Country',
    keyIdea: 'Income is unequal within a country because pay differs with skills and bargaining power, some people have no work, and taxes and benefits narrow the gap by different amounts.',
    body: [
      { type: 'paragraph', text: 'The main causes of **income inequality within a country**:' },
      { type: 'bullets', items: [
        '**Differences in skills and education**: workers with scarce skills are paid far more than those whose skills are common.',
        '**Unemployment and informal work**: people without regular jobs earn little or nothing.',
        '**Bargaining power**: strong trade unions, professional bodies and minimum wages raise some wages; many workers have no one bargaining for them.',
        '**Discrimination** by gender, ethnicity or caste, which holds some groups in lower-paid work.',
        '**Income from wealth**: rent, interest and profits flow to those who already own assets.',
        '**Taxes and benefits**: a system that taxes little and transfers little leaves the gap made by the market in place.',
      ] },
      { type: 'paragraph', text: 'These causes reinforce one another. A child from a poor family gets less schooling, earns less, owns nothing, and passes the same position on.' },
    ],
    realExample: { emoji: '💻', text: 'In India, the growth of information-technology services raised pay sharply for English-speaking graduates in cities such as Bengaluru, while most rural workers\' wages rose far more slowly.' },
    misconception: 'Students explain income inequality by pay differences alone and leave out people with no regular pay. Unemployment and informal work put many incomes near zero, widening the gap from below while high salaries widen it from above.',
    examMatters: 'For each cause, name the group it affects and the mechanism that widens the gap. Two developed causes beat six listed, and a cause linked to a real economy beats one left abstract.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each cause of income inequality to the way it widens the gap:',
      pairs: [
        { left: 'Few people have trained as engineers', right: 'The scarce skill commands pay far above the average', why: 'Scarcity of a skill raises what employers must pay for it.' },
        { left: 'Many adults can find only casual street work', right: 'Earnings at the bottom are low and irregular', why: 'Unemployment and informal work leave incomes low.' },
        { left: 'Women are kept out of better-paid jobs', right: 'One group is held in lower-paid work regardless of ability', why: 'Discrimination separates pay from productivity.' },
        { left: 'A family owns several rented flats', right: 'Rent adds to income without any extra work', why: 'Wealth produces income for those who already own it.' },
      ],
    }),
  };
})();

const wealthWithin = (() => {
  const sid = subId('wealth-inequality-within');
  return {
    id: sid,
    title: 'Causes of Wealth Inequality Within a Country',
    keyIdea: 'Wealth concentrates because it is inherited, because the returns on assets can grow faster than wages, and because only those with spare income can save.',
    body: [
      { type: 'paragraph', text: 'Wealth is more unequal than income for reasons that build on each other:' },
      { type: 'bullets', items: [
        '**Inheritance**: land, homes and businesses pass down families, so some start adult life with assets and most with none.',
        '**Returns on assets**: wealth earns rent, interest, dividends and rising prices. When those returns grow faster than wages, owners pull away from workers.',
        '**Saving**: only households with income to spare can save; the poor spend everything they earn.',
        '**Access to credit**: the wealthy can borrow against assets to buy more; the poor have no collateral.',
      ] },
      { type: 'paragraph', text: `The compounding is powerful. At ${E.assetReturn}% a year, an asset is worth ${E.assetMultiple} times as much after ${E.years} years; a wage rising ${E.wageGrowth}% a year is only ${E.wageMultiple} times as high.` },
      { type: 'flow', resultType: 'bad', steps: [
        { title: 'Assets are inherited', subtitle: 'A head start' },
        { title: 'Returns are reinvested', subtitle: 'The stock compounds' },
        { title: 'Owners pull away', subtitle: 'Wealth concentrates' },
      ] },
    ],
    realExample: { emoji: '🌾', text: 'Land ownership in much of Latin America remains highly concentrated, a legacy of large colonial-era estates, so rural wealth inequality there is extreme.' },
    misconception: 'Students explain wealth inequality with the same causes as income inequality. Income differences add to it, but wealth also grows by itself, through returns and inheritance, even with no difference in effort or pay.',
    examMatters: 'Keep the two apart in an answer on causes: name a cause of income inequality and a separate cause of wealth inequality, as the specification lists both.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put this chain in causal order, from a family inheriting property to the gap with a wage-earner widening:',
      correctOrder: [
        'A daughter is left her parents\' apartment block, inherited when they die',
        'Tenants\' payments give her a steady flow of money on top of her salary',
        'She reinvested that money in a second building, which also earns rent',
        'Her assets pull away from a colleague\'s pay year after year',
      ],
      criterion: 'cause to effect: each step is caused by the one before it',
      why: [
        'Inheritance gives her the asset without earning it.',
        'The asset produces income: rent.',
        'Reinvesting that income adds to the stock of assets.',
        'Compounding returns outpace wage growth, so wealth concentrates.',
      ],
    }),
  };
})();

const betweenCountries = (() => {
  const sid = subId('inequality-between-countries');
  return {
    id: sid,
    title: 'Causes of Inequality Between Countries',
    keyIdea: 'Incomes differ between countries mainly because output per worker differs, and that depends on capital, skills, technology, institutions, trade and history.',
    body: [
      { type: 'paragraph', text: 'Average incomes in the richest countries are many times those in the poorest. The causes of **inequality between countries**:' },
      { type: 'bullets', items: [
        '**Capital and infrastructure**: workers with machines, power and roads produce far more than those without.',
        '**Human capital**: schooling, skills and health raise output per worker.',
        '**Technology**: rich countries use more advanced methods and invent most new ones.',
        '**Institutions and governance**: secure property rights, honest courts and stable policy encourage investment; corruption and instability deter it.',
        '**Dependence on primary products**: exporters of crops and minerals face volatile and often weak prices for what they sell.',
        '**History**: colonial rule shaped many economies around exporting raw materials and left weak institutions.',
        '**Conflict**, which destroys capital and drives investment away.',
      ] },
      { type: 'paragraph', text: 'Globalisation cuts both ways. Countries that attracted manufacturing and grew exports have closed much of the gap; countries left exporting a single commodity have fallen further behind.' },
    ],
    realExample: { emoji: '🇰🇷', text: 'South Korea, once as poor as many African economies, invested heavily in schooling and industry and became a high-income economy, while countries that stayed dependent on primary exports fell far behind it.' },
    misconception: 'Students compare countries by their Gini coefficients. A Gini coefficient measures inequality within one country; the gap between countries is shown by comparing income per head, and a poor country can have a lower Gini than a rich one.',
    examMatters: 'In an Examine on causes between countries (8 marks), develop two causes as chains and finish with a brief judgement on which matters more for a named type of economy.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each cause of the income gap between countries to how it holds output per worker down:',
      pairs: [
        { left: 'Frequent power cuts and unpaved roads', right: 'Each worker has less capital to work with', why: 'Infrastructure is part of the capital that raises output per worker.' },
        { left: 'Judges who can be bribed to ignore contracts', right: 'Investors hold back because returns are insecure', why: 'Weak institutions deter the investment that raises productivity.' },
        { left: 'Nine-tenths of export earnings from one crop', right: 'Earnings swing with a price the country cannot control', why: 'Primary product dependence makes income volatile and planning hard.' },
        { left: 'Most adults left school at eleven', right: 'Workers cannot use more advanced methods', why: 'Low human capital limits the technology a workforce can adopt.' },
      ],
    }),
  };
})();

/* ══ Block 6 — The Impact of Inequality (2d-1 .. 2d-6) ═════════════════════ */

const enterpriseIncentives = (() => {
  const sid = subId('enterprise-incentives');
  return {
    id: sid,
    title: 'Enterprise and Incentives',
    keyIdea: 'Some inequality rewards effort, skill and risk-taking. Extreme inequality can blunt incentives and shut the poor out of enterprise altogether.',
    body: [
      { type: 'paragraph', text: '**Incentives**: the prospect of earning more is what persuades people to train, work harder, take responsibility and move to where they are needed. If everyone received the same whatever they did, those incentives would weaken.' },
      { type: 'paragraph', text: '**Enterprise**: the chance of large profits rewards entrepreneurs for the risk of starting firms, which create jobs and new products. In that sense some inequality is the price of a dynamic economy.' },
      { type: 'paragraph', text: 'Extreme inequality works the other way:' },
      { type: 'bullets', items: [
        'The poor cannot start businesses: with no savings or collateral they cannot borrow, so talent at the bottom is wasted.',
        'If the gap looks impossible to cross, working harder seems pointless, and incentives at the bottom weaken.',
        'Wealth protected by connections rather than competition rewards lobbying instead of enterprise.',
      ] },
      { type: 'paragraph', text: 'So the impact depends on the degree of inequality and on whether people can move up.' },
    ],
    realExample: { emoji: '🏦', text: 'Microfinance lenders such as Bangladesh\'s Grameen Bank were set up because the poorest would-be entrepreneurs had no collateral and were refused by ordinary banks.' },
    misconception: 'Students treat enterprise and incentives as one point. Incentives are about whether people train, work and move for higher pay; enterprise is about whether people can start firms, which needs the means to borrow as well as the reward.',
    examMatters: 'Enterprise and incentives are separate bullets in the specification. Give each its own mechanism, and weigh the positive case against the negative by the degree of inequality.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each statement by whether it shows inequality strengthening or weakening enterprise and incentives:',
      groups: [
        { name: 'Strengthens', items: ['A mechanic studies at night for the pay rise a qualification brings', 'An engineer quits a safe job to start a firm hoping for large profits', 'Doctors move to a remote region that pays a higher salary'], why: 'Each responds to the chance of earning more than others: the incentive case for some inequality.' },
        { name: 'Weakens', items: ['A gifted seamstress cannot borrow to buy her first machine', 'Young people in a slum see no route out and stop looking for work', 'A tycoon wins a monopoly licence through friends in government'], why: 'Each shows extreme inequality locking out talent, blunting effort or rewarding connections instead of enterprise.' },
      ],
    }),
  };
})();

const savingsImpact = (() => {
  const sid = subId('savings');
  return {
    id: sid,
    title: 'Savings',
    keyIdea: 'The rich save a larger share of their income than the poor, so inequality can raise total saving — but most poor households cannot save at all.',
    body: [
      { type: 'paragraph', text: 'A poor household spends almost everything on food, rent and school fees; a rich one cannot spend all it earns, so it saves a large share. Moving income from the poor to the rich therefore tends to raise **total savings**, and moving it the other way tends to lower them.' },
      { type: 'paragraph', text: 'That is one argument for tolerating inequality: savings fund the investment that raises growth. It has two weaknesses. The rich may save by buying assets abroad or property, not by funding new productive investment at home. And lower spending by the poor means less demand for firms\' output.' },
      { type: 'paragraph', text: 'At the bottom, inequality leaves households with no savings at all. With nothing put by, one illness, harvest failure or job loss pushes a family into poverty or debt to moneylenders, and it cannot save to invest in a child\'s schooling or a small business.' },
    ],
    realExample: { emoji: '💰', text: 'Household surveys across many countries find that richer households save a far larger share of their income than poorer ones, many of whom save nothing or borrow to get by.' },
    misconception: 'Students treat saving as the same thing as investment and write that more saving means more factories. Saving is income not spent; it adds to capital only if it pays for new machines or buildings at home, not if it buys existing property or goes abroad.',
    examMatters: 'For a Discuss on the impact of inequality, savings gives a clear two-sided point: more total saving, against savings sent abroad and no buffer at the bottom. Finish with what the outcome depends on.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Two households in a different country. Complete the working:',
      template: [
        'The first earns $200 a day and saves $50 of it, so it saves ___ of its income.',
        'The second earns $20 a day and saves $1 of it, so it saves ___ of its income.',
        'Moving $10 a day from the first household to the second would, on these shares, make total saving ___.',
      ],
      answers: ['25%', '5%', 'fall'],
      hints: ['saving divided by income, as a percentage', 'the same calculation for the poorer household', 'the richer household saved a larger share of each dollar'],
      distractors: ['50%', '10%', 'rise'],
    }),
  };
})();

const educationImpact = (() => {
  const sid = subId('education-inequality');
  return {
    id: sid,
    title: 'Education',
    keyIdea: 'In an unequal society poor children get less and worse schooling, so inequality is passed on to the next generation and talent is wasted.',
    body: [
      { type: 'paragraph', text: 'Inequality affects **education** through who can afford it and what it costs to stay in school:' },
      { type: 'bullets', items: [
        'Fees, uniforms, books and travel cost a poor family a large share of its income.',
        'Children from poor families are needed to work or care for siblings, so they leave early.',
        'Poor neighbourhoods have worse schools; rich families buy private schooling and tutoring.',
        'Hungry or sick children learn less, even when they attend.',
      ] },
      { type: 'paragraph', text: `In ${E.country}, ${E.schoolByFifth[0]}% of children from the poorest fifth finish secondary school, against ${E.schoolByFifth[4]}% from the richest.` },
      { type: 'paragraph', text: 'Education is also a cause of inequality, so the two feed each other: unequal incomes produce unequal schooling, which produces unequal incomes in the next generation. The economy loses the output of able children who never got the chance.' },
    ],
    realExample: { emoji: '🏫', text: 'In many sub-Saharan African countries, children from the richest fifth of households are several times more likely to complete secondary school than those from the poorest fifth (source: UNESCO, World Inequality Database on Education).' },
    misconception: 'Students treat education only as a cure for inequality. It is also one of inequality\'s effects: where schooling is bought, the rich buy more of it, and the gap is handed down.',
    examMatters: 'This is a two-way link. Say which way the question runs — inequality affecting education — and use the other direction as the consequence that makes it matter.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each barrier to the way it keeps children from poor families out of education:',
      pairs: [
        { left: 'Exam fees and uniforms at a public school', right: 'The family cannot afford the costs of attending', why: 'Direct costs take a large share of a poor household\'s income.' },
        { left: 'A twelve-year-old earns money selling water on buses', right: 'The family cannot spare the income to keep the child in class', why: 'The lost earnings of a child are a cost of schooling too.' },
        { left: 'Rich parents pay for private tutors', right: 'Children from better-off homes get ahead in exams', why: 'Spending on extra schooling widens the gap in results.' },
        { left: 'A pupil arrives at school without breakfast', right: 'The child learns less even while attending', why: 'Poor nutrition reduces what a child gets from each lesson.' },
      ],
    }),
  };
})();

const migrationImpact = (() => {
  const sid = subId('migration');
  return {
    id: sid,
    title: 'Migration',
    keyIdea: 'Inequality drives migration: from poor regions to richer cities within a country, and from poor countries to rich ones. Migration then feeds back on inequality.',
    body: [
      { type: 'paragraph', text: 'People move to where incomes are higher, so inequality is a main driver of **migration**:' },
      { type: 'bullets', items: [
        '**Within a country**: large gaps between rural and urban incomes pull people from farms to cities, often into informal work and slums.',
        '**Between countries**: large gaps between national incomes pull workers abroad, legally or illegally.',
      ] },
      { type: 'paragraph', text: 'The effects run both ways. Migrants send **remittances** home, which raise incomes in poor villages and countries and can narrow gaps. But the poorest usually cannot afford to move; those who leave are often the young and skilled — doctors, nurses, engineers — so the sending region loses the people it most needs.' },
      { type: 'paragraph', text: 'In the receiving cities and countries, migration adds workers and output, but it can hold down wages in low-paid jobs and strain housing and services.' },
    ],
    realExample: { emoji: '✈️', text: 'The Philippines has millions of citizens working abroad as nurses, sailors and domestic workers, and the money they send home is a large share of its national income (source: World Bank, remittance data).' },
    misconception: 'Students count a migrant\'s pay abroad as income of the place they left. Only the remittances sent home add to incomes there; the pay itself is earned, and mostly spent, where the migrant now works.',
    examMatters: 'Name the direction — within or between countries — and follow both sides: the pull of higher incomes, then the effect of remittances against the loss of skills.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each move by whether it is migration within a country or between countries:',
      groups: [
        { name: 'Within a country', items: ['A rice farmer leaves his village for construction work in the capital', 'A young woman moves from an inland province to a coastal factory city', 'A family leaves a drought-hit district for the outskirts of a regional town'], why: 'Each responds to income gaps between regions of the same country.' },
        { name: 'Between countries', items: ['A nurse leaves her country for a hospital job overseas', 'A labourer takes a contract on a building site in another country', 'An engineer emigrates to a richer country with his family'], why: 'Each responds to income gaps between countries and crosses a national border.' },
      ],
    }),
  };
})();

const lifeExpectancy = (() => {
  const sid = subId('life-expectancy');
  return {
    id: sid,
    title: 'Life Expectancy',
    keyIdea: 'Poorer people die younger. Inequality in income becomes inequality in health, through diet, housing, dangerous work and access to care.',
    body: [
      { type: 'paragraph', text: '**Life expectancy** is the average number of years a person can expect to live. Within almost every country it rises with income:' },
      { type: 'bullets', items: [
        'Poor households eat worse, live in crowded and unsafe housing, and more often lack clean water and sanitation.',
        'They do more dangerous and physically exhausting work.',
        'They can afford less health care, and delay treatment until illness is serious.',
        'The stress of insecurity itself is linked to worse health.',
      ] },
      { type: 'paragraph', text: `In ${E.country}, life expectancy in the poorest fifth is ${E.lifeByFifth[0]} years and in the richest ${E.lifeByFifth[4]}: a gap of ${E.lifeGap} years.` },
      { type: 'paragraph', text: 'Health then feeds back into income. Illness stops people working and eats their savings, so ill-health is both a result of poverty and a cause of it. Countries with more equal incomes and universal health care tend to have smaller gaps in life expectancy.' },
    ],
    realExample: { emoji: '⚕️', text: 'A study of the United States found a gap of about 15 years in life expectancy between the richest and poorest 1% of men (source: Chetty and others, Journal of the American Medical Association).' },
    misconception: 'Students explain the health gap only by access to doctors. Diet, housing, water, work and stress matter as much, which is why the gap persists even where health care is free.',
    examMatters: 'Life expectancy is a leaf of its own in 2d. Give the mechanism from low income to shorter lives, then the loop back from ill-health to lower income.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Health data from a different country. Complete the working:',
      template: [
        'The poorest fifth live to 58 on average and the richest fifth to 75, a gap of ___ years.',
        'Across the five groups, life expectancy ___ steadily from the poorest to the richest.',
        'An illness that stops a parent working can push the family ___ the poverty line.',
      ],
      answers: ['17', 'rises', 'below'],
      hints: ['the richer figure minus the poorer one', 'richer people tend to live longer', 'the loop from ill-health back to income'],
      distractors: ['133', 'falls', 'above'],
    }),
  };
})();

/* ══ Block 7 — Development, Economic Change and Capitalism (2e, 2f) ════════ */

const kuznetsDevelopment = (() => {
  const sid = subId('kuznets-development');
  return {
    id: sid,
    title: 'Development and Inequality: the Kuznets Hypothesis',
    keyIdea: 'The Kuznets hypothesis says inequality first rises as an economy develops, then falls. It is a hypothesis, and the evidence for it is mixed.',
    body: [
      { type: 'paragraph', text: 'Economist Simon Kuznets suggested that as income per head rises, inequality traces an inverted U — the **Kuznets curve**. The reasoning follows the structural change of development:' },
      { type: 'bullets', items: [
        '**Early**: most people work in farming on similar low incomes, so inequality is low.',
        '**Middle**: some move to industry and cities, where pay is higher; a gap opens between the modern and traditional sectors, and inequality rises.',
        '**Later**: most workers have moved, schooling spreads, wages at the bottom rise and governments build tax and benefit systems, so inequality falls.',
      ] },
      { type: 'paragraph', text: 'The evidence is mixed. Several East Asian economies grew fast with stable or falling inequality, because land reform and mass schooling spread the gains. And inequality has risen again in many high-income countries, which the simple curve does not predict. The pattern depends on policy, not only on the level of income.' },
    ],
    realExample: { emoji: '📈', text: 'Taiwan and South Korea combined rapid industrialisation with land reform and mass schooling, and did not see the sharp rise in inequality the Kuznets curve predicts for that stage.' },
    misconception: 'Students draw the Kuznets curve against time, or as a U. Income per head goes along the horizontal axis and inequality up the vertical, and the curve is an inverted U: inequality rises first, then falls.',
    examMatters: 'On the impact of development on inequality, the Kuznets curve is the argument; the counter-examples are the evaluation. Draw it with inequality (for example the Gini coefficient) against income per head.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each description into the stage of the Kuznets hypothesis it belongs to — early, middle or later:',
      groups: [
        { name: 'Early', items: ['Nearly everyone grows food on small plots for similar low returns', 'Few factories exist and towns are small'], why: 'Before industry, incomes are low and alike, so inequality is low.' },
        { name: 'Middle', items: ['Factory wages in the cities pull ahead of village incomes', 'Workers stream from farms towards the new industrial towns'], why: 'The move into a higher-paid modern sector opens a gap: inequality rises.' },
        { name: 'Later', items: ['Most of the labour force is in industry and services', 'Secondary schooling reaches nearly all children and pay at the bottom rises'], why: 'Once most have moved and skills spread, the gap narrows: inequality falls.' },
      ],
    }),
  };
})();

const economicChange = (() => {
  const sid = subId('economic-change');
  return {
    id: sid,
    title: 'Economic Change: Technology, Globalisation and Structural Shifts',
    keyIdea: 'Economic change reshapes who earns what. New technology and globalisation have raised pay for the skilled and for capital owners faster than for routine workers.',
    body: [
      { type: 'paragraph', text: 'Beyond the level of development, **economic change** alters inequality through what it rewards:' },
      { type: 'bullets', items: [
        '**Technology**: computers and automation raise the productivity and pay of skilled workers who use them, and replace routine factory and clerical jobs, widening the gap between skilled and unskilled.',
        '**Globalisation**: in rich countries, low-skilled workers compete with imports and jobs move abroad; in developing countries that gain factory jobs, workers leaving farming can see incomes rise. Firms and owners who can sell worldwide gain most.',
        '**Structural shifts** between industries and regions leave some towns thriving and others declining, adding a regional dimension to inequality.',
      ] },
      { type: 'paragraph', text: 'The effect is not fixed. Where schooling keeps up with demand for skills, and where displaced workers retrain, the rise in inequality is smaller.' },
    ],
    realExample: { emoji: '🤖', text: 'The spread of computers and automation has raised demand for highly skilled workers relative to routine manual and clerical workers in many countries, widening pay gaps between them.' },
    misconception: 'Students write that new technology lowers pay for all workers. It changes what employers want: demand rises for the skilled workers who use it and falls for routine work, so the gap widens even if average pay rises.',
    examMatters: 'Separate the channels. For each change, say who gains and who loses, then judge which matters more in the economy the question names.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each economic change to the group whose income it tends to raise most:',
      pairs: [
        { left: 'Software replaces bank clerks and typists', right: 'Graduates who design and run the new systems', why: 'Technology raises demand for the skills that complement it.' },
        { left: 'A clothing multinational opens factories in a low-wage economy', right: 'Farm workers there who take the new factory jobs', why: 'The new jobs pay more than farming did.' },
        { left: 'A firm can now sell its app to every country at once', right: 'The owners and shareholders of that firm', why: 'A worldwide market multiplies the returns to owning a successful firm.' },
      ],
    }),
  };
})();

const freeMarketCapitalism = (() => {
  const sid = subId('free-market-capitalism');
  return {
    id: sid,
    title: 'The Free Market Economy (Capitalism) and Inequality',
    keyIdea: 'A free market pays people according to what they own and what their work sells for, so it tends to produce inequality. How much depends on what the state does.',
    body: [
      { type: 'paragraph', text: 'In a **free market economy (capitalism)**, resources are privately owned and incomes are set by markets. That matters for inequality in three ways:' },
      { type: 'bullets', items: [
        '**Unequal ownership**: income comes from work and from owning capital, land and firms. Those who own assets receive profits, rent and interest on top of wages; those with nothing to sell but their labour do not.',
        '**Market rewards**: pay follows what a skill sells for, not need, so people with scarce skills earn far more and those who cannot work earn nothing.',
        '**Accumulation**: returns on wealth are reinvested and inherited, so gaps can widen over generations.',
      ] },
      { type: 'paragraph', text: `In ${E.country}, the poorer half receives ${E.assetIncome.bottomHalf}% of its income from owning assets; the richest tenth receives ${E.assetIncome.top}%.` },
      { type: 'paragraph', text: 'The same system produces the growth that has cut absolute poverty on a huge scale, and its inequality provides incentives. Market economies differ widely in inequality, because taxes, benefits, public services and minimum wages change the outcome. The significance of capitalism is that it creates inequality by its nature; how much remains is a choice.' },
    ],
    realExample: { emoji: '🏙️', text: 'Hong Kong, often ranked among the freest market economies, has one of the highest income Gini coefficients among high-income economies, while Denmark combines a market economy with high taxes and extensive public services and a low one.' },
    misconception: 'Students write that a free market creates inequality only through differences in pay. Ownership is a second source: those who hold shares, savings and property receive income without working for it, and those returns build up across generations.',
    examMatters: 'In an Evaluate on capitalism and inequality (20 marks), weigh the forces that widen gaps against growth and incentives, and reach a judgement that depends on the role of the state.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each feature of a market economy by whether it tends to widen inequality or can narrow it:',
      groups: [
        { name: 'Tends to widen', items: ['Profits on a factory go to the family that owns it', 'A rare surgical skill is paid many times a cleaner\'s wage', 'Rents from inherited land are reinvested in more land'], why: 'Each rewards ownership or scarcity, so income flows to those who already have more.' },
        { name: 'Can narrow', items: ['Growth creates millions of factory jobs for former farm workers', 'Competition from new firms cuts the profits of an established monopoly', 'Firms bid up wages when workers become scarce'], why: 'Each spreads the gains of the market more widely or erodes returns at the top.' },
      ],
    }),
  };
})();

/* ══ The block plan ══════════════════════════════════════════════════════ */

const BLOCK_PLAN = [
  {
    title: B1,
    subs: [absoluteRelative, measuringAbsolute, measuringRelative],
    takeaway: [
      'Absolute poverty: below a fixed line of basic needs.',
      'Relative poverty: below a fraction of the median, so it moves with the middle.',
      'Measures: headcount, poverty gap, and deprivation counts such as the MPI.',
    ],
  },
  {
    title: B2,
    subs: [economicGrowth, educationTraining, welfareBenefits, taxStructure],
    takeaway: [
      'Evenly shared growth cuts absolute poverty and leaves relative poverty unchanged.',
      'Education works slowly; benefits work at once if they reach the poor.',
      'Taxing spending burdens the poor; taxing the rich for transfers helps them.',
    ],
  },
  {
    title: B3,
    subs: [structuralChange, aid, civilWarConflict],
    takeaway: [
      'Structural change lifts movers and leaves declining industries poor.',
      'Aid helps directly or through growth, depending on what it pays for.',
      'Conflict destroys incomes, assets and services at once.',
    ],
  },
  {
    title: B4,
    subs: [incomeWealth, lorenzCurve, giniCoefficient],
    takeaway: [
      'Income is a flow; wealth is a stock, and far more unequal.',
      'The Lorenz curve: cumulative income against cumulative people.',
      'Gini = A ÷ (A + B): 0 is equality, 1 is maximum inequality.',
    ],
  },
  {
    title: B5,
    subs: [incomeWithin, wealthWithin, betweenCountries],
    takeaway: [
      'Within a country: skills, jobs, bargaining power, discrimination.',
      'Wealth grows by inheritance and returns faster than wages.',
      'Between countries: output per worker, institutions, trade and history.',
    ],
  },
  {
    title: B6,
    subs: [enterpriseIncentives, savingsImpact, educationImpact, migrationImpact, lifeExpectancy],
    takeaway: [
      'Some inequality rewards effort; extreme inequality locks talent out.',
      'The rich save more, but the poor are left with no buffer.',
      'Inequality shortens schooling and lives, and drives migration.',
    ],
  },
  {
    title: B7,
    subs: [kuznetsDevelopment, economicChange, freeMarketCapitalism],
    takeaway: [
      'Kuznets: inequality rises then falls with development, a hypothesis only.',
      'Technology and globalisation reward skills and ownership.',
      'Markets create inequality; how much remains depends on the state.',
    ],
  },
];

export const SUBSECTIONS = BLOCK_PLAN.flatMap((b) => b.subs);
export const BLOCKS = BLOCK_PLAN.map((b) => b.title);

export function buildContent({ diagramIds, quizIndices, practiceIndices }) {
  return BLOCK_PLAN.map((b) => ({
    id: blockId(b.title),
    title: b.title,
    sections: b.subs,
    takeaway: b.takeaway,
    diagramId: diagramIds[b.title],
    quizIndices: quizIndices[b.title],
    practiceIndices: practiceIndices[b.title],
  }));
}

export const ATTACH_SLUGS = SUBSECTIONS.map((s) => s.id.replace(`${SECTION}:sub:`, ''));

/* THE LEAF MAP, BY HAND. 21 leaves at econ_spec.txt:1792-1817. */
export const LEAF_MAP = {
  'ECON-4.3.4-1a': ['absolute-relative-poverty'],
  'ECON-4.3.4-1b': ['measuring-absolute-poverty', 'measuring-relative-poverty'],
  'ECON-4.3.4-1c-1': ['economic-growth'],
  'ECON-4.3.4-1c-2': ['education-training'],
  'ECON-4.3.4-1c-3': ['welfare-benefits'],
  'ECON-4.3.4-1c-4': ['tax-structure'],
  'ECON-4.3.4-1c-5': ['structural-change'],
  'ECON-4.3.4-1c-6': ['aid'],
  'ECON-4.3.4-1c-7': ['civil-war-conflict'],
  'ECON-4.3.4-2a': ['income-wealth-inequality'],
  'ECON-4.3.4-2b-1': ['lorenz-curve'],
  'ECON-4.3.4-2b-2': ['gini-coefficient'],
  'ECON-4.3.4-2c': ['income-inequality-within', 'wealth-inequality-within', 'inequality-between-countries'],
  'ECON-4.3.4-2d-1': ['enterprise-incentives'],
  'ECON-4.3.4-2d-2': ['enterprise-incentives'],
  'ECON-4.3.4-2d-3': ['savings'],
  'ECON-4.3.4-2d-4': ['education-inequality'],
  'ECON-4.3.4-2d-5': ['migration'],
  'ECON-4.3.4-2d-6': ['life-expectancy'],
  'ECON-4.3.4-2e': ['kuznets-development', 'economic-change'],
  'ECON-4.3.4-2f': ['free-market-capitalism'],
};

/* ══ Notes: one topic per chapter, same titles, same order ══════════════════ */

const def = (html) => ({ type: 'definition', text: html });
const mech = (html) => ({ type: 'mechanism', text: html });
const link = (html) => ({ type: 'link', text: html });

export const NOTES = [
  {
    title: B1,
    meta: '4.3.4 · 1a, 1b',
    keyIdea: 'The two kinds of poverty, the line each is measured against, and the measures built on those lines.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Absolute poverty</strong> — income too low to meet basic needs: food, water, shelter, clothing. Measured against a fixed line.'),
        def('<strong>Relative poverty</strong> — income far below the typical income of one\'s own society; the line is a fraction (often 50% or 60%) of median income.'),
        def('<strong>Headcount ratio</strong> — the share of people below a line. <strong>Poverty gap</strong> — how far below it they fall. <strong>MPI</strong> — counts deprivations directly.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`${E.country}: ${pct(E.absRate)} below the ${usd(E.absLine)} line; median ${usd(E.median)} × ${E.relShare}% = ${usd(E.relLine)}, with ${pct(E.relRate)} below it.`),
        mech(`Average shortfall of the poor: ${usd(E.avgShortfall)} a day.`),
        mech('Relative poverty compares the bottom with the middle — it is not a measure of inequality.'),
      ] },
    ],
    takeaway: [
      'Absolute line fixed; relative line moves with the median.',
      'Headcount counts; the gap measures depth.',
      'The richest pulling away does not change relative poverty.',
    ],
  },
  {
    title: B2,
    meta: '4.3.4 · 1c (growth, education and training, welfare benefits, tax structure)',
    keyIdea: 'Four causes of changes in poverty that work through incomes at the bottom compared with the fixed line and the median.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Welfare benefits</strong> — state payments to households: pensions, unemployment pay, child allowances, cash transfers.'),
        def('<strong>Tax structure</strong> — the mix of taxes and how each falls on rich and poor.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Growth of ${E.growthPct}% for all: absolute ${pct(E.absRate)} → ${pct(E.evenAbs)}; relative ${pct(E.relRate)} → ${pct(E.evenRel)}.`),
        mech(`Benefit of ${usd(E.benefit)} to the poorest three tenths: absolute → ${pct(E.benefitAbs)}, relative → ${pct(E.benefitRel)}; cost $${E.benefitCost} million a day.`),
        link('Progressive and regressive taxes, and policies to reduce poverty, are topic 4.3.5.'),
      ] },
    ],
    takeaway: [
      'Say which poverty measure a cause changes.',
      'Skills are slow and lasting; transfers are fast.',
      'Who pays a tax decides its effect on poverty.',
    ],
  },
  {
    title: B3,
    meta: '4.3.4 · 1c (structural change, aid, civil wars and conflict)',
    keyIdea: 'Three causes of changes in poverty that reshape where people work, what reaches them from abroad, and whether they can earn at all.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Structural change</strong> — a lasting shift in the industries and regions an economy relies on.'),
        def('<strong>Aid</strong> — resources given, or lent on better-than-market terms, by other countries, international bodies or charities.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Mill closures: absolute poverty ${pct(E.absRate)} → ${pct(E.millsAbs)}. Aid transfer: → ${pct(E.aidAbs)}. War: → ${pct(E.warAbs)}.`),
        mech('Conflict: lost incomes, destroyed assets, displacement, collapsed services.'),
        link('Aid as a development strategy and conflict as a constraint on growth are topic 4.3.6.'),
      ] },
    ],
    takeaway: [
      'Structural change creates winners and concentrated losers.',
      'Aid\'s effect depends on its type and who controls it.',
      'Conflict\'s effects outlast the fighting.',
    ],
  },
  {
    title: B4,
    meta: '4.3.4 · 2a, 2b',
    keyIdea: 'The difference between income and wealth, and the two measurements of inequality the specification names.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Income</strong> — a flow received over time. <strong>Wealth</strong> — a stock of assets owned at a point in time, net of debts.'),
        def('<strong>Lorenz curve</strong> — cumulative % of income against cumulative % of population, poorest first.'),
        def('<strong>Gini coefficient</strong> — A ÷ (A + B): 0 perfect equality, 1 maximum inequality.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Rank the population → group into equal parts → add up income shares → plot the points → Gini = A ÷ (A + B).'),
        mech(`${E.country}: A = ${E.areaA}, B = ${E.areaB}, Gini ${g2(E.gini)}; wealth Gini ${g2(E.wealthGini)}.`),
        mech('Curves that cross cannot be ranked by eye; the Gini gives one number but hides where the inequality lies.'),
      ] },
    ],
    takeaway: [
      'Wealth is more unequal than income.',
      'The curve never rises above the line of equality.',
      'A Gini of 0.4 is a ratio of areas, not a poverty rate.',
    ],
  },
  {
    title: B5,
    meta: '4.3.4 · 2c',
    keyIdea: 'Why income and wealth are unequal within a country, and why incomes differ between countries.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Within a country</strong> — skills and education, unemployment, bargaining power, discrimination, income from wealth, taxes and benefits.'),
        def('<strong>Between countries</strong> — capital, human capital, technology, institutions, primary product dependence, history, conflict.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Compounding: ${E.assetReturn}% for ${E.years} years multiplies an asset by ${E.assetMultiple}; ${E.wageGrowth}% multiplies a wage by ${E.wageMultiple}.`),
        mech('Output per worker is the proximate cause of the gap between countries.'),
      ] },
    ],
    takeaway: [
      'Income gaps come from the labour market and from assets.',
      'Wealth gaps compound through returns and inheritance.',
      'Country gaps come from productivity and what sets it.',
    ],
  },
  {
    title: B6,
    meta: '4.3.4 · 2d',
    keyIdea: 'The six impacts of inequality the specification lists: enterprise, incentives, savings, education, migration and life expectancy.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Remittances</strong> — money migrants send home.'),
        def('<strong>Life expectancy</strong> — the average number of years a newborn can expect to live.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Incentives and enterprise: moderate gaps reward effort and risk; extreme gaps lock the poor out of borrowing and starting firms.'),
        mech('Savings: the rich save a larger share, but savings may leave the country; the poor have no buffer.'),
        mech(`${E.country}: school completion ${E.schoolByFifth[0]}% → ${E.schoolByFifth[4]}% and life expectancy ${E.lifeByFifth[0]} → ${E.lifeByFifth[4]} years, poorest to richest fifth.`),
      ] },
    ],
    takeaway: [
      'The impact depends on how much inequality there is.',
      'Unequal schooling hands inequality on.',
      'Poorer people migrate for work and die younger.',
    ],
  },
  {
    title: B7,
    meta: '4.3.4 · 2e, 2f',
    keyIdea: 'How development and economic change affect inequality, and why a free market economy tends to produce it.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Kuznets hypothesis</strong> — inequality rises then falls as income per head rises: an inverted U.'),
        def('<strong>Free market economy (capitalism)</strong> — private ownership, with incomes set by markets.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Development: the move from farming to industry opens a gap, which narrows as schooling spreads.'),
        mech('Technology and globalisation raise the returns to skills and to owning firms.'),
        mech(`Asset income: ${E.assetIncome.bottomHalf}% of the poorer half's income against ${E.assetIncome.top}% of the richest tenth's.`),
      ] },
    ],
    takeaway: [
      'The Kuznets curve is a hypothesis with mixed evidence.',
      'Economic change rewards skills and capital.',
      'Markets create inequality; policy decides how much stays.',
    ],
  },
];
