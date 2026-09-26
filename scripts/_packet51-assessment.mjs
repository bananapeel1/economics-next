/**
 * PACKET 51 — poverty-inequality assessment: the quiz bank, the practice set, the flashcards, the
 * common mistakes and the extras.
 *
 * ── THE BANK IS REBUILT, NOT EDITED ──────────────────────────────────────────
 *
 * The live bank was ten items. In 8 of 10 the key was the longest option (quiz-01, topFix-03);
 * quiz[3] and quiz[9] carried joke distractors, quiz[7] gave its answer away with "within a
 * country", quiz[1]'s explanation said relative poverty "exists primarily in developed countries",
 * and four items (Kuznets, between-country causes, civil war, capitalism) tested what no subsection
 * taught (structure-03). Every item below is authored KEY FIRST against a chapter that teaches it,
 * with near-miss distractors of similar length; the runner measures the length tell, the hedge tell,
 * the position histogram, near-duplicate stems and untaught terms.
 *
 * ── THE PRACTICE SET FOLLOWS THE WEC14 PAPER ─────────────────────────────────
 *
 * The live five included "Define the difference between… (4)" and an "Outline" (topFix-05): neither
 * a legal IAL Economics tariff nor command word. DECISIONS 2026-09-26 shapes practice on the unit's
 * paper: WEC14 Section B is one data question 2/4/6/8/14, Section C two 20-mark essays from three
 * (`audit/raw/ial-paper-structure.json`). The set covers every Section B tariff, Calculate at both of
 * Appendix 6's tariffs, and three 20-mark Evaluates. Guidance above 6 marks is levels only.
 */
import { id, hash8, ECON, usd, pct } from './_packet51-util.mjs';
import { B1, B2, B3, B4, B5, B6, B7 } from './_packet51-content.mjs';

const E = ECON;

/* ══ Quiz ════════════════════════════════════════════════════════════════ */

const qi = (block, question, options, explanation) => ({
  id: id('quiz', question), block, question, options, explanation,
});

/* keys dealt into a position by a hash of the stem (packet 36) */
const placeKeys = (items) => {
  const rank = new Map(items.map((x, i) => [i, hash8(x.question)])
    .sort((a, b) => (a[1] < b[1] ? -1 : 1))
    .map(([i], r) => [i, r % 4]));
  return items.map((x, i) => {
    const slot = Math.min(rank.get(i), x.options.length - 1);
    return { ...x, options: [...x.options.slice(1, slot + 1), x.options[0], ...x.options.slice(slot + 1)], correctIndex: slot };
  });
};

export const QUIZ = placeKeys([
  /* ── the pre-test pool: three unpinned items, FIRST, all answerable from chapter one ── */
  qi(null, 'Absolute poverty is best defined as an income that is:',
    ['too low to meet basic needs such as food and shelter', 'below sixty per cent of median income in that country', 'lower than the average wage paid in that country', 'too low to own any wealth such as land or savings'],
    'Absolute poverty is judged against a fixed line of survival needs, whatever others earn. A line set as a share of the median is the relative measure; owning no wealth is a different thing again.'),
  qi(null, 'A relative poverty line is usually set as a fraction of:',
    ['median income in that society', 'the cost of a basket of food', 'the international poverty line', 'the average wage of full-time workers'],
    'Relative poverty compares a household with the typical income of its own society, so the line is a share of the median. A food basket and the international line are fixed benchmarks for absolute poverty, and an average wage leaves out everyone who has no wage.'),
  qi(null, 'If every income in a country rose by 20%, relative poverty would most likely:',
    ['stay the same', 'fall sharply', 'fall slightly', 'rise sharply as well'],
    'The median rises by 20% as well, so the relative line rises with it and the same people stay below it. Absolute poverty, measured against a fixed line, would fall.'),

  /* ── Block 1 · Absolute and Relative Poverty ─────────────────────────── */
  qi(B1, 'Which measure shows how far below the poverty line the incomes of poor people fall?',
    ['the poverty gap', 'the headcount ratio', 'the Gini coefficient', 'the relative poverty line'],
    'The poverty gap measures depth: the shortfall of poor incomes below the line. The headcount only counts how many are below; the Gini coefficient measures inequality across everyone.'),
  qi(B1, 'A country has 40 million people, of whom 6 million live below the international poverty line. Its headcount ratio is:',
    ['15%', '6%', '40%', '85%'],
    'The headcount ratio is people below the line divided by the population: 6 ÷ 40 = 0.15, or 15%. Subtracting from 100 gives the share not in poverty.'),
  qi(B1, 'Median income in a country is $12.00 a day. A relative poverty line at 60% of the median is:',
    ['$7.20', '$4.80', '$12.00', '$20.00'],
    'The line is the median times the percentage: 0.6 × $12.00 = $7.20. Taking 40% gives $4.80, and dividing by 0.6 gives $20.00.'),
  qi(B1, 'The richest tenth doubles its income while every other income stays the same. Relative poverty:',
    ['is unchanged', 'rises sharply', 'falls slightly', 'rises slightly'],
    'The median belongs to the middle of the distribution and has not moved, so the relative line and the number below it are unchanged. Inequality has risen, which is a different thing.'),

  /* ── Block 2 · Growth, Skills, Benefits and Tax ──────────────────────── */
  qi(B2, 'Replacing part of the income tax paid by high earners with a higher sales tax on food is most likely to:',
    ['increase poverty, as the poor spend most income on food', 'reduce poverty, as the rich now pay more for their food', 'leave poverty unchanged, as total tax revenue is the same', 'reduce poverty, as lower income tax raises everyone\'s wages'],
    'Poor households spend almost all of their income, much of it on food, so a food tax takes a larger share of their income, while many of them paid little income tax to begin with.'),
  qi(B2, 'Economic growth is least likely to reduce absolute poverty when it comes mainly from:',
    ['a capital-intensive oil field employing few workers', 'labour-intensive clothing factories hiring widely', 'rising yields on small family farms', 'new hotel jobs for low-skilled workers'],
    'Growth reduces poverty through jobs and wages. An oil field adds a great deal of output with few jobs, so its gains reach few poor households unless the state spends the revenue on them.'),
  qi(B2, 'Why do education and training usually reduce poverty only slowly?',
    ['skills take years and need jobs that use them', 'a new skill loses its value within a few years', 'schooling raises output but not workers\' wages', 'the gains go to employers rather than to workers'],
    'A child starting school reaches the labour market years later, and a skill raises income only if employers need it. Where they do, the skill raises the pay of the worker who has it, not only the output of the firm.'),
  qi(B2, 'A cash benefit lifts the poorest tenth above the absolute poverty line but leaves it below 60% of the unchanged median. The benefit has:',
    ['reduced absolute but not relative poverty', 'reduced relative but not absolute poverty', 'reduced both kinds of poverty', 'reduced neither kind of poverty'],
    'The group has crossed the fixed line, so absolute poverty falls, but it is still under the median-based line, so relative poverty is unchanged for that group.'),

  /* ── Block 3 · Structural Change, Aid and Conflict ───────────────────── */
  qi(B3, 'Structural change in an economy is most likely to raise poverty when:',
    ['displaced workers lack skills for the growing industries', 'labour moves from farming into better-paid factory jobs', 'the service sector grows faster than manufacturing', 'new industries pay more than the ones they replace'],
    'Poverty rises when jobs disappear and the people who lose them cannot move into the industries that are growing, because their skills or location do not match. A shift that workers can follow, into jobs that pay more, raises incomes instead.'),
  qi(B3, 'Which kind of aid reduces poverty most directly?',
    ['cash transfers paid to poor households', 'a loan tied to buying the donor\'s machinery', 'grain sold cheaply in local markets', 'funding for a new international airport'],
    'A transfer raises poor households\' income at once. Tied loans deliver less than their face value, cheap grain can undercut local farmers, and an airport helps the poor only indirectly, if at all.'),
  qi(B3, 'Why does poverty often stay high for years after a civil war ends?',
    ['lost schooling and destroyed assets take years to rebuild', 'the median income rises sharply once peace returns', 'donors withdraw their aid as soon as a peace deal is signed', 'refugees who settle abroad send no money home'],
    'Children who missed school earn less for life, and homes, tools, roads and livestock must be replaced while investors stay cautious, so incomes, the median among them, recover slowly rather than sharply. Aid does not simply stop at peace, and refugees who settle abroad often send money home, which supports incomes there.'),

  /* ── Block 4 · Measuring Inequality ──────────────────────────────────── */
  qi(B4, 'Which of these is part of a household\'s wealth rather than its income?',
    ['a plot of farmland it owns', 'the wages it earns each month', 'the rent it receives each year', 'a pension it receives each week'],
    'Wealth is a stock of assets owned at a point in time, such as land. Wages, rent received and pension payments are flows of income over a period.'),
  qi(B4, 'On a Lorenz curve diagram, the horizontal axis shows the:',
    ['cumulative percentage of the population', 'cumulative percentage of income', 'average income received by each group of people', 'percentage of people below the poverty line'],
    'People go along the horizontal axis, ranked poorest to richest, and the cumulative share of income goes up the vertical axis. Swapping them is the most common drawing error.'),
  qi(B4, 'On a Lorenz diagram, the area between the curve and the line of equality is 0.15 and the area below the curve is 0.35. The Gini coefficient is:',
    ['0.30', '0.15', '0.43', '0.70'],
    'The coefficient is the area between the curve and the diagonal divided by the whole area under the diagonal: 0.15 ÷ (0.15 + 0.35) = 0.15 ÷ 0.50 = 0.30. Dividing 0.15 by 0.35 gives 0.43.'),
  qi(B4, 'A Gini coefficient of 0.45 means that:',
    ['income is less evenly shared than at a Gini of 0.30', '45% of the population lives in absolute poverty', 'the richest 45% of people receive all the income', '45% of all income goes to the poorer half'],
    'The Gini coefficient is a ratio of two areas on the Lorenz diagram, so a higher value means a more unequal distribution. It is not a count of poor people or a share of income.'),
  qi(B4, 'Two countries\' Lorenz curves cross. This means that:',
    ['neither distribution is more equal at every point', 'both countries have the same Gini coefficient', 'one of the two curves must have been drawn wrongly', 'the curve lower at the bottom must have the higher Gini'],
    'Where curves cross, one country is more equal among poorer groups and the other among richer ones, so the curves alone cannot rank them. Their Gini coefficients may still differ, in either direction.'),

  /* ── Block 5 · Causes of Inequality ──────────────────────────────────── */
  qi(B5, 'Which is most likely to explain a lasting gap in income per head between two countries?',
    ['less capital and skills per worker in the poorer one', 'higher prices of goods in the richer one', 'a larger population in the richer one', 'a lower Gini coefficient in the poorer country than the richer one'],
    'Income per head follows output per worker, which depends on the capital, skills and technology each worker has. Higher prices make a rich country\'s income go less far, which shrinks the real gap rather than explaining it, and a Gini coefficient describes a distribution; it does not cause the gap.'),
  qi(B5, 'Wealth tends to be more unequal than income mainly because:',
    ['assets are inherited and earn returns that are reinvested', 'wages are paid mainly to households that already own land', 'poorer households save a larger share of their income', 'income is taxed each year while wealth escapes tax'],
    'Inheritance gives some a head start, and returns on assets compound when reinvested, so wealth concentrates further than income does. The poor save a smaller share, not a larger one.'),
  qi(B5, 'A surgeon and a hospital cleaner earn very different wages mainly because of:',
    ['the scarcity of the skills each job needs', 'the hours each of them works in a week', 'the region of the country the hospital is in', 'the wealth each of them inherited'],
    'Few people have the training to operate, so the skill commands a high wage; many can clean. Hours and region matter far less when both work in the same hospital.'),

  /* ── Block 6 · The Impact of Inequality ──────────────────────────────── */
  qi(B6, 'Why might greater income inequality raise total saving in an economy?',
    ['richer households save a larger share of their income', 'poorer households save a larger share of their income', 'richer households borrow more than poorer ones do', 'interest rates are higher for poorer households'],
    'A rich household cannot spend all it earns and saves much of it; a poor one spends almost everything. Shifting income towards the rich therefore tends to raise total saving.'),
  qi(B6, 'Extreme inequality can weaken enterprise mainly because:',
    ['the poor cannot borrow to start businesses', 'high profits discourage new firms from entering', 'equal wages remove the reward for taking risks', 'saving rises when incomes are more unequal'],
    'With no savings or collateral, able people in poor households cannot raise money to start firms, so their talent is wasted. Equal wages describe the opposite of inequality.'),
  qi(B6, 'Skilled nurses leaving a poor country to work in richer ones is likely to:',
    ['raise remittances but reduce health care at home', 'lower remittances and improve health care at home', 'leave the sending country\'s economy unaffected', 'narrow the gap between the two countries at once'],
    'Migrants send money home, which raises incomes there, but the sending country loses the skilled workers its clinics need, so the effect on it is mixed.'),
  qi(B6, 'Within most countries, life expectancy is lower among poorer people mainly because they:',
    ['have worse diets, housing and access to health care', 'have more children on average than richer households', 'save a smaller share of their income than the rich', 'pay less income tax than richer people do'],
    'Low income means poorer food, crowded housing, less clean water, more dangerous work and less health care, all of which shorten lives. Larger families, less saving and lower income tax go with low income too, but they are not what shortens lives.'),

  /* ── Block 7 · Development, Economic Change and Capitalism ───────────── */
  qi(B7, 'Automation that replaces routine clerical jobs is most likely to:',
    ['widen the pay gap between skilled and less-skilled workers', 'narrow the pay gap between skilled and less-skilled workers', 'lower the pay of workers who design the new systems', 'reduce the returns to owning the firms that use it'],
    'Technology raises demand for the skilled workers who build and run it and cuts demand for routine work, so pay at the upper end rises relative to the rest.'),
  qi(B7, 'The Kuznets hypothesis suggests that as income per head rises, inequality:',
    ['rises and then falls', 'falls steadily throughout', 'rises steadily throughout', 'falls and then rises'],
    'Kuznets proposed an inverted U: inequality grows while workers move from farming to better-paid industry, then narrows once most have moved and schooling spreads.'),
  qi(B7, 'Which evidence most weakens the Kuznets hypothesis?',
    ['fast-growing economies whose inequality stayed low', 'rich countries with very little absolute poverty', 'poor countries where most people work in farming', 'middle-income countries whose inequality has risen'],
    'The hypothesis predicts rising inequality during industrialisation. Economies that industrialised fast without that rise, through land reform and mass schooling, contradict it.'),
  qi(B7, 'In a free market economy, a key reason incomes are unequal is that:',
    ['owners of capital and land receive profit and rent', 'wages are highest in the jobs most useful to society', 'goods are rationed by price rather than by need', 'taxes are levied only on income from work'],
    'Income comes from owning assets as well as from work, and ownership is unequal, so owners of capital and land receive profit and rent that others do not. Pay follows the demand for and supply of each skill, not how useful a job is: care work is vital, but many people can do it. Rationing by price decides who gets goods once incomes differ; it does not make incomes differ. Market economies also tax profits, rent and property, not only wages.'),
]);

/* ══ Practice ════════════════════════════════════════════════════════════ */

const pr = (block, command, marks, question, guidance) => ({
  id: id('practice', question), block, command, marks, question, guidance,
});

export const PRACTICE = [
  pr(B1, 'Define', 2, "Define the term 'relative poverty'. (2 marks)",
    `Two marks means two separate points. Say what the poor are compared with, and then how the benchmark is set — a definition that could equally describe absolute poverty earns only half.\nRelative poverty is having an income so far below the typical income of one's own society that a person cannot share its normal way of life (1 mark). It is measured against a line set as a fraction of median income, commonly 50% or 60% (1 mark). "Being poorer than the rich" does not earn the second mark: the comparison is with the median, not the top.`),

  pr(B1, 'Calculate', 2, 'In a country, median income is $8.00 a day. The relative poverty line is set at 60% of median income. Calculate the relative poverty line. (2 marks)',
    `Calculate asks for the working as well as the answer. Before any arithmetic, decide which figure the percentage is applied to, and give the answer in the units the question uses.\nRelative poverty line = 60% × median = 0.6 × $8.00 (1 mark) = $4.80 a day (1 mark). Dividing the median by 0.6, or taking 40% of it, are the usual errors.`),

  pr(B2, 'Explain', 4, 'Explain how an increase in welfare benefits paid to the poorest households could reduce relative poverty. (4 marks)',
    `An Explain wants linked stages. Start from what happens to the incomes of the poorest, then compare them with the benchmark that relative poverty is measured against, and ask whether that benchmark moves.\nKnowledge: relative poverty is income below a line set at a fraction of median income (1 mark). Application: higher benefits raise the incomes of the poorest households directly (1 mark). Analysis: if the median is unchanged, because middle incomes do not receive the benefit, the relative line does not move (1 mark). Analysis: so some households rise above the line and the share in relative poverty falls (1 mark).`),

  pr(B2, 'Evaluate', 20, 'Evaluate the view that economic growth is the most effective way to reduce absolute poverty in developing economies. (20 marks)',
    `An Evaluate wants chains of reasoning, different viewpoints and an informed judgement. Plan the strongest case for growth, then the alternatives the specification lists, and decide in advance what your judgement will turn on — the pattern of growth is the obvious place to start.\nLevel 1 describes growth or poverty with little explanation. Level 2 explains how growth raises jobs, wages and tax revenue so incomes cross the absolute line. Level 3 develops both sides with application: growth has been the main source of falling absolute poverty, but growth from capital-intensive sectors or concentrated in cities may bypass the poor, while benefits, aid, and education and training can reduce poverty more directly or more lastingly. Level 4 reaches a supported judgement: growth is necessary for large, lasting falls in absolute poverty in most developing economies, but whether it is the most effective route depends on how labour-intensive it is and on whether the revenue it raises is spent on the poor.`),

  pr(B3, 'Analyse', 6, 'Analyse how structural changes in an economy may increase absolute poverty. (6 marks)',
    `An Analyse wants depth: one route followed through several linked stages. Decide first what kind of structural change you will use, because the workers affected and the reason they cannot move depend on it.\nKnowledge: structural change is a lasting shift in the industries an economy relies on (1 mark). Application: for example, cheaper imports close a country's textile mills (1 mark). Analysis, first stage: the mill workers lose their jobs, and their skills fit no growing industry nearby (1 mark). Analysis, second stage: they move into informal work or unemployment at much lower incomes (1 mark). Analysis, third stage: shops and suppliers in the mill towns lose customers, spreading the loss of income (1 mark). Analysis, final stage: more households fall below the fixed absolute poverty line (1 mark).`),

  pr(B4, 'Calculate', 4, 'On a Lorenz curve diagram for a country, the area below the Lorenz curve is 0.32. Ten years later it has fallen to 0.27. Calculate the Gini coefficient in each year and the change between them. (4 marks)',
    `Calculate asks for workings. Write the formula for the Gini coefficient in words first, and note which area the question gives you: you need the other one before you can divide.\nArea between the curve and the line of equality = 0.50 − 0.32 = 0.18 (1 mark). Gini = 0.18 ÷ 0.50 = 0.36 (1 mark). Ten years later the area is 0.50 − 0.27 = 0.23, so Gini = 0.23 ÷ 0.50 = 0.46 (1 mark). The Gini coefficient has risen by 0.10, so inequality has increased (1 mark).`),

  pr(B5, 'Examine', 8, 'Examine two causes of inequality in income between countries. (8 marks)',
    `An Examine wants chains of reasoning and a brief assessment, so save room for a judgement. Choose two causes that work through different channels, and for each follow it through to output per worker.\nLevel 1 names causes with little explanation. Level 2 explains one cause in a chain: for example, poorer countries have less capital and infrastructure per worker, so output and wages per worker are lower. Level 3 develops two causes with application — for example, capital and skills per worker, and dependence on volatile primary exports or weak institutions that deter investment. The brief assessment that lifts an answer to the top of the range weighs which cause matters more, and for which kind of economy: a commodity exporter with honest government faces a different binding constraint from a country held back by conflict or corruption.`),

  pr(B6, 'Discuss', 14, 'Discuss the likely impact of high income inequality on enterprise and savings in an economy. (14 marks)',
    `A Discuss wants chains of reasoning, different viewpoints and a critical assessment. Treat enterprise and savings separately, give each a case for inequality and a case against, and decide what your judgement will depend on — the degree of inequality is the obvious place to start.\nLevel 1 describes inequality with little explanation. Level 2 explains one effect: the prospect of large profits rewards entrepreneurs for risk, or richer households save a larger share of income. Level 3 develops both impacts on both sides with application: inequality can reward enterprise and raise total saving, but extreme inequality leaves the poor unable to borrow to start firms, and savings by the rich may leave the country or buy existing assets rather than fund new investment, while the poor have no savings to fall back on. Level 4 reaches a supported judgement: moderate inequality may strengthen incentives and saving, but beyond some point it wastes talent at the bottom, and the outcome depends on access to credit and on where the rich put their savings.`),

  pr(B7, 'Evaluate', 20, 'Evaluate the view that a free market economy inevitably increases inequality. (20 marks)',
    `An Evaluate wants chains of reasoning, different viewpoints and an informed judgement. Decide first which features of a market economy create inequality, then what can offset them, so that the word "inevitably" is what your conclusion tests.\nLevel 1 describes capitalism or inequality with little explanation. Level 2 explains how private ownership and market-set pay lead to unequal incomes. Level 3 develops both sides with application: returns to capital, inheritance and rewards for scarce skills widen gaps, and technology and globalisation have added to them; against that, market-led growth has cut absolute poverty on a huge scale, competition erodes profits, rising demand for labour lifts wages, and market economies with strong taxes, benefits and public services have far lower inequality. Level 4 reaches a supported judgement: a free market tends to create inequality, but how much remains is not inevitable — it depends on what the state does and on access to education.`),

  pr(B7, 'Evaluate', 20, 'Evaluate the extent to which economic development reduces inequality within a country. (20 marks)',
    `An Evaluate wants chains of reasoning, different viewpoints and an informed judgement. Start from the Kuznets hypothesis, because the evaluation of this question is the evidence for and against it.\nLevel 1 describes development with little explanation. Level 2 explains the Kuznets hypothesis: inequality rises as workers move from farming to better-paid industry, then falls as most have moved and schooling spreads. Level 3 develops the evidence on both sides with application: some economies followed the curve, but several East Asian economies industrialised with stable inequality after land reform and mass schooling, and inequality has risen again in many high-income countries as technology and globalisation reward skills and capital. Level 4 reaches a supported judgement: development creates the means to reduce inequality — schooling, tax systems, better jobs — but whether it does depends on policy, not on the level of income alone.`),
];

/* ══ Flashcards ══════════════════════════════════════════════════════════ */

const fc = (front, back) => ({ id: id('flashcard', front), front, back });

export const FLASHCARDS = [
  fc('What is absolute poverty?', 'An income too low to meet basic needs — food, safe water, shelter, clothing — measured against a fixed line.'),
  fc('What is relative poverty?', 'An income far below the typical income of one\'s own society, measured against a line set as a fraction (often 50% or 60%) of median income.'),
  fc('What is the World Bank\'s international poverty line?', `${usd(E.absLine)} a day per person at 2021 purchasing power parity.`),
  fc('What is the headcount ratio?', 'The share of the population living below a poverty line.'),
  fc('What does the poverty gap measure?', 'The depth of poverty: how far below the poverty line the incomes of poor people fall.'),
  fc('What does the Multidimensional Poverty Index count?', 'Deprivations in health, schooling and living standards, such as clean water and electricity, rather than income.'),
  fc('Why is relative poverty not the same as inequality?', 'It compares the bottom with the median. If only the richest gain, inequality rises but the median and relative poverty do not change.'),
  fc('What does evenly shared growth do to absolute and relative poverty?', 'Absolute poverty falls as incomes cross the fixed line; relative poverty is unchanged because the median rises in step.'),
  fc('Why do education and training reduce poverty slowly?', 'Skills take years to build and raise income only when there are jobs that need them.'),
  fc('How do welfare benefits change poverty?', 'They raise the incomes of the poor directly, cutting poverty quickly if they reach the poor and are large enough.'),
  fc('How can a change in tax structure raise poverty?', 'Shifting tax onto spending on essentials takes a larger share of poor households\' income, since they spend almost all of it.'),
  fc('How can structural change increase poverty?', 'A declining industry leaves workers whose skills and location fit no growing industry, so they fall into unemployment or informal work.'),
  fc('Give the two routes by which aid can reduce poverty.', 'Directly, through transfers and services for the poor; indirectly, through infrastructure that raises output and jobs.'),
  fc('Name four channels through which conflict causes poverty.', 'Lost incomes, destroyed assets, displacement of people, and collapsed public services.'),
  fc('Distinguish income from wealth.', 'Income is a flow received over time; wealth is a stock of assets owned at a point in time, net of debts.'),
  fc('What does a Lorenz curve plot?', 'The cumulative percentage of income against the cumulative percentage of the population, ranked from poorest.'),
  fc('What is the line of equality?', 'The diagonal on a Lorenz diagram, showing a distribution in which everyone has the same income.'),
  fc('How is the Gini coefficient calculated?', 'The area between the line of equality and the Lorenz curve divided by the whole area under the line of equality.'),
  fc('What do Gini coefficients of 0 and 1 mean?', 'Zero: perfect equality. One: a single person receives all the income.'),
  fc('Give two limitations of the Gini coefficient.', 'Different distributions can share one value, so it hides where inequality lies; and survey data miss the very richest.'),
  fc('Give three causes of income inequality within a country.', 'Differences in skills and education, unemployment and informal work, and discrimination.'),
  fc('Why does wealth concentrate over time?', 'It is inherited, and returns on assets can grow faster than wages when reinvested.'),
  fc('Give three causes of inequality between countries.', 'Differences in capital and skills per worker, weak institutions, and dependence on primary exports.'),
  fc('How can inequality strengthen incentives?', 'The prospect of higher pay or profit rewards training, effort and risk-taking.'),
  fc('How can extreme inequality weaken enterprise?', 'The poor have no savings or collateral, so they cannot borrow to start firms, and their talent is wasted.'),
  fc('How does inequality affect total saving?', 'The rich save a larger share of income, so inequality can raise saving — though it may go abroad, and the poor are left with no buffer.'),
  fc('How does inequality affect education?', 'Poor families afford less and worse schooling, so inequality is handed on to the next generation.'),
  fc('How does inequality drive migration?', 'Income gaps pull people from poor regions to cities and from poor countries to rich ones.'),
  fc('Why is life expectancy lower among the poor?', 'Worse diets, housing, water and working conditions, and less access to health care.'),
  fc('State the Kuznets hypothesis.', 'As income per head rises, inequality first rises and then falls: an inverted U.'),
  fc('Give one piece of evidence against the Kuznets hypothesis.', 'Several East Asian economies industrialised fast without inequality rising sharply, after land reform and mass schooling.'),
  fc('Why does a free market economy tend to create inequality?', 'Incomes follow ownership of assets and the market value of skills, and returns on wealth accumulate.'),
];

/* ══ Common mistakes ═════════════════════════════════════════════════════ */

const mk = (title, looks_like, why, instead) => ({ id: id('mistake', title), title, looks_like, why, instead });

export const MISTAKES = [
  mk('Confusing relative poverty with inequality',
    '"The rich got richer, so relative poverty rose."',
    'Relative poverty compares the bottom with the median. A richer top raises inequality and leaves the median, the relative line and the number below it unchanged.',
    'Say what happened to incomes at the bottom compared with the middle. Use the Gini coefficient for inequality and the relative headcount for relative poverty.'),

  mk('Saying growth reduces "poverty" without saying which kind',
    '"Economic growth reduces poverty."',
    'Evenly shared growth reduces absolute poverty and leaves relative poverty unchanged; growth that bypasses the poor reduces neither.',
    'Name the measure — absolute or relative — and the pattern of growth that makes it fall.'),

  mk('Swapping the axes of the Lorenz curve',
    'Cumulative income along the bottom and population up the side.',
    'The Lorenz curve ranks people along the horizontal axis and shows the cumulative share of income they receive on the vertical axis.',
    'Label the horizontal axis "cumulative % of population" and the vertical axis "cumulative % of income", then draw the diagonal as the line of equality.'),

  mk('Drawing the Lorenz curve above the line of equality',
    'A curve that bows up and to the left of the diagonal.',
    'The poorest x% of people can never receive more than x% of income, so the curve always lies on or below the diagonal.',
    'Start at the origin, sag below the diagonal, and finish at the top right corner.'),

  mk('Reading the Gini coefficient as a poverty rate',
    '"A Gini of 0.4 means 40% of people are poor."',
    'The Gini coefficient is a ratio of two areas on the Lorenz diagram. It measures how unequally income is shared, not how many people are poor.',
    'Say that a higher coefficient means a more unequal distribution, and use a headcount ratio for the number in poverty.'),

  mk('Treating income and wealth as the same',
    '"Wealth inequality is when some people earn more than others."',
    'Earnings are income, a flow. Wealth is the stock of assets owned. The two are linked but can differ sharply for the same household.',
    'Define each by its flow or stock nature and give an example, then say which one a figure measures.'),

  mk('Drawing the Kuznets curve against time, or as a U',
    'A U-shaped curve with years along the horizontal axis.',
    'The hypothesis links inequality to the level of income per head, not to the passing of time, and it has inequality rising first and falling later: an inverted U.',
    'Put income per head on the horizontal axis and inequality (for example the Gini coefficient) on the vertical, and draw a hump that rises and then falls.'),
];

/* ══ Extras ══════════════════════════════════════════════════════════════ */

export const EXTRAS = {
  chains: [
    {
      title: 'Why a richer top does not change relative poverty',
      steps: [
        `${E.country}'s median income is ${usd(E.median)} a day, so the relative line is ${usd(E.relLine)} and ${pct(E.relRate)} of people are below it.`,
        `The richest two tenths gain: their incomes rise to ${usd(E.topPull[8])} and ${usd(E.topPull[9])}.`,
        `The Gini coefficient rises from ${E.gini.toFixed(2)} to ${E.topPullGini.toFixed(2)}: inequality has increased.`,
        `The median is still ${usd(E.topPullMedian)}, so the relative line has not moved.`,
        `The share below it is still ${pct(E.topPullRel)}: relative poverty is unchanged.`,
      ],
      result: 'Relative poverty compares the bottom with the middle, and inequality measures the whole spread. They can move separately, which is why a question on one should never be answered with the other.',
    },
    {
      title: 'Growth or benefits: which poverty falls?',
      steps: [
        `Today ${pct(E.absRate)} of ${E.country}'s people are below ${usd(E.absLine)} and ${pct(E.relRate)} below the relative line.`,
        `Growth of ${E.growthPct}% for everyone: absolute poverty falls to ${pct(E.evenAbs)}; relative stays ${pct(E.evenRel)}.`,
        `Instead, a ${usd(E.benefit)} benefit to the poorest three tenths: absolute falls to ${pct(E.benefitAbs)}, relative to ${pct(E.benefitRel)}.`,
        `The benefit costs $${E.benefitCost} million a day, raised by a ${usd(E.topTax)} tax on each of the richest tenth.`,
      ],
      result: 'Growth shared evenly moves the bottom up and the median up together. A targeted transfer moves only the bottom, so it can cut relative poverty as well — at a cost someone must pay.',
    },
    {
      title: 'How a civil war deepens poverty',
      steps: [
        'Fighting closes markets and stops farming, so incomes collapse.',
        'Homes, tools, livestock and roads are destroyed.',
        'Families flee, losing their land and work.',
        'Clinics and schools close as spending moves to the army.',
        `In ${E.country}, a ${E.warFall}% fall in the poorer half's incomes takes absolute poverty from ${pct(E.absRate)} to ${pct(E.warAbs)}.`,
      ],
      result: 'Conflict hits every channel of income at once, and its effects on schooling, assets and investment last long after the fighting ends.',
    },
    {
      title: 'The Kuznets hypothesis, stage by stage',
      steps: [
        'Most people farm on similar low incomes: inequality is low.',
        'Industry grows and pays more; some workers move to the towns.',
        'The gap between modern and traditional sectors widens: inequality rises.',
        'Most workers have moved, schooling spreads and pay at the bottom rises.',
        'Tax and benefit systems develop: inequality falls.',
      ],
      result: 'The curve is a hypothesis about development and inequality. Economies that combined industrialisation with land reform and mass schooling did not see the rise, and inequality has risen again in many rich countries.',
    },
  ],
  evaluation: [
    {
      title: 'Is growth enough to end poverty?',
      content: 'Growth has done more than anything else to reduce absolute poverty, but it does not reduce relative poverty unless the bottom gains faster than the middle. The pattern of growth matters more than its rate. Labour-intensive growth that raises wages at the bottom cuts poverty far more than growth from a mine or an oil field, and the tax revenue growth brings reduces poverty only if it is spent on the poor.',
    },
    {
      title: 'How much inequality is too much?',
      content: 'Some inequality rewards training, effort and enterprise. Beyond some point, it wastes talent and weakens the economy. Extreme inequality shuts the poor out of credit and schooling, shortens lives and drives out skilled workers. A strong evaluation asks how large the gap is, whether people can move up, and whether the rich earned their position by producing or by owning.',
    },
    {
      title: 'Which measure answers the question?',
      content: 'Absolute poverty, relative poverty, the poverty gap, wealth and the Gini coefficient measure different things, and data on one cannot answer a question about another. Name the measure before judging the trend. A country can cut absolute poverty while inequality rises, and a Gini coefficient for income says nothing about wealth.',
    },
  ],
};
