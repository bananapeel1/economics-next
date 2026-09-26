/**
 * PACKET 52 — role-state-macroeconomy teaching content. Seven blocks in the specification's own
 * order, thirty-five subsections, one subsection to a step.
 *
 * `audit/raw/econ_spec.txt:1824-1893`. The live section was two blocks of two subsections: "Market
 * Failure and the State" (public goods and external benefits — 1.3.5's content, topFix-01,
 * accuracy-01) and "Macroeconomic Policy" (a three-paragraph policy overview and an income
 * redistribution subsection that headlined universal basic income — structure-05, structure-06).
 * Almost everything the quiz, practice, diagrams and extras tested was never taught (structure-01).
 * The rebuild follows the specification's own numbering, so the Learn tab, the Notes tab and every
 * diagram share one map of the topic, and the ramp is the spec's: what the state spends, what it
 * taxes, what it borrows, then what it does with all three (structure-04):
 *
 *   1  Public Expenditure                              1a, 1b-1..3             4 subsections
 *   2  Public Spending as a Share of GDP               1c-1..3                 3
 *   3  Taxes: Types, Incentives and Revenue            2a, 2b, 2c-1..3         5
 *   4  Tax Changes and the Macroeconomy                2c-4..7                 4
 *   5  Fiscal Deficits and the National Debt          3a-1..4, 3b, 3c-1..3    7
 *   6  Macroeconomic Policies in Use                   4a (tools, 1..4), 4b    6
 *   7  TNCs and the Limits of Policy                   4c-1..3, 4d, 4e         6
 *
 * Seven is the ceiling, not a choice: the pre-test takes three unpinned items and each chapter's
 * check-in one more, and `FREE_QUIZ_MAX` is 10 (`lib/preview-limits.js:62`).
 */
import {
  SECTION, subId, id, ECON, bn, pct, money, mnd,
} from './_packet52-util.mjs';

const E = ECON;
const blockId = (title) => id('block', title);

/*
 * EVERY RECALL IS MINTED HERE so the id is a function of the subsection, never of array position.
 * `shuffled` is never written: the renderer ignores it and CONTENT-GATE says to delete it.
 */
const recall = (sid, spec) => ({ id: `${sid}:recall`, ...spec });

export const B1 = 'Public Expenditure';
export const B2 = 'Public Spending as a Share of GDP';
export const B3 = 'Taxes: Types, Incentives and Revenue';
export const B4 = 'Tax Changes and the Macroeconomy';
export const B5 = 'Fiscal Deficits and the National Debt';
export const B6 = 'Macroeconomic Policies in Use';
export const B7 = 'TNCs and the Limits of Policy';

/* ══ Block 1 — Public Expenditure (4.3.5 · 1a, 1b) ══════════════════════════ */

const typesOfSpending = (() => {
  const sid = subId('types-of-public-expenditure');
  return {
    id: sid,
    title: 'Capital Expenditure, Current Expenditure and Transfer Payments',
    keyIdea: 'Public expenditure splits three ways: capital spending buys assets that last, current spending runs services now, and transfer payments move income without buying output.',
    body: [
      { type: 'paragraph', text: '**Public expenditure** is spending by central and local government and the organisations they fund. It is divided three ways, and the division matters because each type does something different to the economy.' },
      { type: 'bullets', items: [
        '**Capital expenditure** buys assets that will be used for years: a new motorway, a school building, a hospital scanner, a port. It adds to the economy\'s stock of capital.',
        '**Current expenditure** pays for goods and services used up within the year: the salaries of teachers, nurses and police, medicines, fuel for army vehicles, the running costs of ministries.',
        '**Transfer payments** move money from taxpayers to individuals without the government buying any output in return: state pensions, unemployment benefits, child grants and student grants.',
      ] },
      { type: 'paragraph', text: `In ${E.country}, an economy with a GDP of ${bn(E.gdp)}, the government spends ${bn(E.capital)} on capital projects, ${bn(E.current)} on current spending and ${bn(E.transfer)} on transfers: ${bn(E.spending)} in all, or ${pct(E.spendingShare)} of GDP.` },
      { type: 'paragraph', text: 'Transfers are counted in public expenditure but are not part of government spending on goods and services in aggregate demand, because nothing is produced in exchange. The pensioner who receives the money does the spending.' },
    ],
    realExample: { emoji: '🏗️', text: 'Indonesia\'s new toll roads and ports are capital spending; the salaries of its teachers are current spending; and its cash payments to poor households are transfers.' },
    misconception: 'Students count a pension as government spending on goods and services. It is a transfer: the government buys nothing, so it enters aggregate demand only when the pensioner spends it.',
    examMatters: 'A Define of transfer payments earns its 2 marks (Appendix 6) for a payment from government to individuals and for the fact that no good or service is received in return. Give an example as well.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each item of government spending into capital expenditure, current expenditure or a transfer payment:',
      groups: [
        { name: 'Capital expenditure', items: ['Building a new metro line through the capital', 'Buying ambulances for a regional health service'], why: 'Each buys an asset the state will go on using for years.' },
        { name: 'Current expenditure', items: ['Paying this month\'s wages of prison officers', 'Buying vaccines for this winter\'s clinics'], why: 'Each pays for something used up within the year to run a service.' },
        { name: 'Transfer payment', items: ['A monthly allowance to a widow with two children', 'Out-of-work support paid to a laid-off factory hand'], why: 'Each moves income to a person with no good or service received in return.' },
      ],
    }),
  };
})();

const changingIncomes = (() => {
  const sid = subId('changing-incomes');
  return {
    id: sid,
    title: 'Why Public Spending Changes: Changing Incomes',
    keyIdea: 'As an economy grows richer, people demand more health care and education than before, and much of it is provided by the state, so public spending tends to rise as incomes rise.',
    body: [
      { type: 'paragraph', text: 'The size and pattern of public expenditure differ between countries and change over time. The specification names three reasons, in an international context. The first is **changing incomes**.' },
      { type: 'paragraph', text: 'When national income rises, demand for health care, higher education, pensions and good infrastructure tends to rise faster than income itself: these are goods people want more of as they become better off. Where the state provides them, public spending rises too, often as a share of GDP. A rising tax base also makes that spending affordable.' },
      { type: 'paragraph', text: 'Incomes that fall change spending in the other direction and in the short run. In a recession, more people claim unemployment and income support, so transfer payments rise just as tax revenue falls. Over the long run, low-income economies tend to spend a smaller share of GDP through the state because they raise less tax; high-income economies usually spend a larger share.' },
      { type: 'flow', resultType: 'neutral', steps: [
        { title: 'National income rises', subtitle: 'Households are better off' },
        { title: 'Demand for health and education grows faster', subtitle: 'Much of it is publicly provided' },
        { title: 'Public spending rises', subtitle: 'Often as a share of GDP' },
      ] },
    ],
    realExample: { emoji: '📈', text: 'As China\'s incomes rose, its government expanded health insurance to almost the whole population and increased spending on universities, shifting public spending towards services that richer households expect.' },
    misconception: 'Students assume that a richer country needs less public spending because people can pay for themselves. The pattern across countries runs the other way: richer economies usually spend a larger share of GDP through the state.',
    examMatters: 'The command word decides how far to take this. An Explain (4 marks, Appendix 6) wants the link from rising income to rising demand for publicly provided services and then to spending, applied to a named economy.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each change in incomes to the effect it has on public spending:',
      pairs: [
        { left: 'Decades of rising income per head', right: 'More is spent on hospitals and universities', why: 'Demand for health and higher education grows faster than income, and the state provides much of it.' },
        { left: 'A sudden recession with rising joblessness', right: 'Benefit payments climb while tax receipts drop', why: 'Falling incomes raise claims for support, so transfers rise in the short run.' },
        { left: 'A poor economy with a small formal sector', right: 'The state spends a low share of national output', why: 'A small tax base limits how much the government can spend.' },
      ],
      distractors: ['Private schools replace every state school'],
    }),
  };
})();

const changingAges = (() => {
  const sid = subId('changing-age-distributions');
  return {
    id: sid,
    title: 'Why Public Spending Changes: Changing Age Distributions',
    keyIdea: 'An ageing population shifts public spending towards pensions and health care; a young population needs schools and maternity care. Both change the size and pattern of spending.',
    body: [
      { type: 'paragraph', text: 'The second reason is **changing age distributions**: the share of the population in each age group. Different age groups need different public services, so as the age distribution shifts, so does the pattern of spending.' },
      { type: 'bullets', items: [
        '**An ageing population** — falling birth rates and longer lives raise the share of people over 65. They draw state pensions, which are transfers, and use far more health care. Spending on pensions and health rises, and fewer people of working age pay the taxes that fund it.',
        '**A young population** — high birth rates raise the share of children. Spending on schools, teachers and maternity and child health rises, and pensions are a small item.',
      ] },
      { type: 'paragraph', text: 'An economy moving from young to old sees both effects in turn: school places are closed or merged while pension and hospital budgets grow. Because pensions are paid for decades, a government that promises them today commits spending far into the future.' },
    ],
    realExample: { emoji: '👵', text: 'Japan, where more than a quarter of people are over 65, spends heavily on pensions and health care. Nigeria, where over 40% are under 15, faces its biggest spending pressure in schools.' },
    misconception: 'Students write that an ageing population raises spending "on everything". It shifts the pattern: pensions and health rise, while spending on schools may fall as there are fewer children.',
    examMatters: 'An Analyse (6 marks, Appendix 6) on ageing wants the chain followed through: more retirees, more pension and health spending, a smaller share of taxpayers, and so either higher taxes, borrowing or cuts elsewhere.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each spending pressure by the kind of population that creates it: ageing or young:',
      groups: [
        { name: 'Ageing population', items: ['More hip replacements and dementia care in public hospitals', 'The state pension bill doubles over twenty years', 'Fewer workers pay tax for each person drawing a pension'], why: 'Each follows from a rising share of people over 65, who draw pensions and use more health care.' },
        { name: 'Young population', items: ['Thousands more primary school places are needed every year', 'Clinics add midwives and childhood vaccination rounds', 'Universities must grow to take the coming wave of school leavers'], why: 'Each follows from a large share of children and young people, who need education and child health services.' },
      ],
    }),
  };
})();

const changingExpectations = (() => {
  const sid = subId('changing-expectations');
  return {
    id: sid,
    title: 'Why Public Spending Changes: Changing Expectations',
    keyIdea: 'What citizens expect the state to provide changes over time, and when they come to expect better services or more protection, public spending rises to meet it.',
    body: [
      { type: 'paragraph', text: 'The third reason is **changing expectations**: what people believe the government should provide, and to what standard. Expectations change with education, with information about how other countries live, with democratic pressure and after crises.' },
      { type: 'bullets', items: [
        '**Higher standards** — citizens who once accepted long hospital waits or crowded classrooms come to expect shorter waits, newer treatments and smaller classes, and newer treatments cost more.',
        '**Wider coverage** — services once provided only in cities are expected in rural areas too: roads, electricity, broadband and clinics.',
        '**More protection** — after a pandemic, a flood or a financial crisis, people expect the state to support incomes and businesses, and a support scheme introduced in an emergency is hard to withdraw.',
      ] },
      { type: 'paragraph', text: 'Expectations can also fall or be reset: a government can persuade voters to accept less, or pass a service to the private sector. But across most economies the long-run direction has been upwards, which is one reason public spending has grown faster than GDP.' },
    ],
    realExample: { emoji: '🏥', text: 'Thailand\'s universal health coverage scheme extended free basic care to people who had never been insured, and once it existed, voters expected it to stay and to improve.' },
    misconception: 'Students treat rising expectations as the same thing as rising incomes. They often move together, but expectations can rise without income, as when a disaster or an election changes what people believe the state owes them.',
    examMatters: 'The specification names three reasons for changes in public spending. In a data question, identify which one the extract describes before explaining it, and use its own words: changing incomes, changing age distributions or changing expectations.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Name the specification\'s reason for each change in public spending:',
      template: [
        'After a deadly flood, voters insist the state fund river defences in every province: ___.',
        'The birth rate halves and pension claims soar within a generation: ___.',
        'GDP per head triples and households want far more spent on universities: ___.',
      ],
      answers: ['changing expectations', 'changing age distributions', 'changing incomes'],
      hints: ['what people now believe the government owes them', 'the mix of young and old in the population', 'how well off households have become'],
      distractors: ['crowding out', 'transfer payments'],
    }),
  };
})();

/* ══ Block 2 — Public Spending as a Share of GDP (4.3.5 · 1c) ═══════════════ */

const productivityGrowth = (() => {
  const sid = subId('spending-productivity-growth');
  return {
    id: sid,
    title: 'Public Spending, Productivity and Growth',
    keyIdea: 'Public spending on infrastructure, education and health can raise productivity and long-run growth, but spending that is wasteful or funded by damaging taxes can slow it.',
    body: [
      { type: 'paragraph', text: 'Countries spend very different shares of GDP through the state. The first thing that difference may affect is **productivity and growth**.' },
      { type: 'paragraph', text: '**How a higher share can raise growth.** Capital spending on roads, ports, power and broadband cuts firms\' costs. Spending on schools and universities raises the skills of the workforce, and spending on health keeps workers fit and at work. All of these raise output per worker and shift long-run aggregate supply to the right.' },
      { type: 'paragraph', text: '**How a higher share can slow growth.** State-run services face no competition and may be run inefficiently. A large state must be paid for with high taxes, which can weaken incentives to work and invest, or with borrowing, which can crowd out private investment. And spending that goes on subsidies to failing firms, or on current spending rather than capital, adds little to future capacity.' },
      { type: 'paragraph', text: 'So the evidence depends less on the size of the share than on what it buys and how well it is managed. Countries with large states and high productivity exist, and so do countries where heavy public spending coincided with slow growth.' },
    ],
    realExample: { emoji: '🚄', text: 'South Korea\'s heavy public investment in education and transport during its rapid growth is often credited with raising productivity; by contrast, spending that props up loss-making state firms tends to add little.' },
    misconception: 'Students write that "more public spending always boosts growth". Only spending that adds to capacity, such as infrastructure and skills, raises productivity; spending on subsidies or waste may not, and its funding has costs.',
    examMatters: 'An Examine (8 marks, Appendix 6) on the size of the state wants a chain in each direction and a brief assessment. The strongest assessment names what the spending buys and how it is financed.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each item by its likely effect on long-run productivity: raises it or adds little to it:',
      groups: [
        { name: 'Likely to raise productivity', items: ['Laying fibre broadband to every industrial estate', 'Training thousands of new engineering teachers', 'A malaria programme that cuts days off work'], why: 'Each adds to the economy\'s capital, skills or healthy labour, so output per worker rises.' },
        { name: 'Likely to add little', items: ['Paying a loss-making state airline to keep flying empty routes', 'Hiring clerks to process forms that could be filed online', 'A one-off cash bonus to every civil servant'], why: 'Each keeps resources in low-value uses or is used up now, so future capacity barely changes.' },
      ],
    }),
  };
})();

const crowdingOut = (() => {
  const sid = subId('crowding-out');
  return {
    id: sid,
    title: 'Crowding Out',
    keyIdea: 'Crowding out is when higher public spending displaces private spending, chiefly because government borrowing bids up interest rates and private investment falls.',
    body: [
      { type: 'paragraph', text: '**Crowding out** is the reduction in private sector spending caused by an increase in public spending. The main route runs through interest rates. When the government borrows to spend, it competes with firms and households for the funds that savers lend. That competition pushes up interest rates, and projects that were worth doing at the old rate are no longer worth doing at the new one.' },
      { type: 'paragraph', text: `In ${E.country}, the government borrows ${bn(E.stimulus)} for extra spending. Interest rates rise from ${pct(E.rateBefore)} to ${pct(E.rateAfter)}, and firms postpone ${bn(E.investmentLost)} of investment. Spending in the economy rises by only ${bn(E.netAddition)}: ${pct(E.crowdedShare)} of the stimulus has been crowded out.` },
      { type: 'paragraph', text: 'Crowding out can also be **resource** crowding out: if the economy is at full capacity, the workers and materials the state uses are taken from private firms. Crowding out is most likely when the economy is near full employment and interest rates are already high. It is least likely in a deep recession, when there is spare capacity and savings lie idle, which is why its size is always an evaluation point.' },
    ],
    realExample: { emoji: '🏦', text: 'Economists in several emerging economies, including Pakistan, have argued that heavy government borrowing from domestic banks leaves less credit for private firms, which then invest less.' },
    misconception: 'Students treat crowding out as certain and total. It is partial in most cases and close to zero in a deep recession with idle savings, so an increase in public spending usually still raises total spending.',
    examMatters: 'An Explain (4 marks, Appendix 6) of crowding out needs the linked stages: the government borrows, interest rates rise, private investment falls, and so the rise in total spending is smaller than the rise in public spending.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the crowding-out process in order, from the decision to borrow to its effect on total spending:',
      correctOrder: [
        'The treasury sells more bonds to pay for a new hospital programme',
        'Competition for savers\' funds drives the cost of borrowing higher',
        'A textile firm shelves its plan for a new factory',
        'Total spending rises by less than the extra hospital spending',
      ],
      criterion: 'cause to effect: each step is caused by the one before it',
      why: [
        'Crowding out starts with the government borrowing to fund its spending.',
        'Its demand for loans competes with private borrowers, so interest rates rise.',
        'At the higher rate, some private investment is no longer worth doing.',
        'Lost private spending offsets part of the public spending.',
      ],
    }),
  };
})();

const spendingTaxLevels = (() => {
  const sid = subId('spending-and-tax-levels');
  return {
    id: sid,
    title: 'Public Spending and Levels of Taxation',
    keyIdea: 'A state that spends a larger share of GDP must, over time, raise a larger share in tax, because borrowing can fill only part of the gap and only for so long.',
    body: [
      { type: 'paragraph', text: 'The third significance of the share of public spending in GDP is for **levels of taxation**. Spending has to be paid for. In any one year a government can borrow the difference between spending and revenue, but a gap that persists adds to the national debt and to the interest paid on it. Over time, a country that spends a high share of GDP must tax a high share of GDP.' },
      { type: 'paragraph', text: 'That link matters for three reasons. High taxes may weaken incentives to work, save and invest, and may push activity into the untaxed informal sector. Taxes on mobile firms and skilled workers may drive them abroad. And the choice of which taxes to raise changes who pays: a larger state funded by a sales tax falls more heavily on the poor than one funded by a progressive income tax.' },
      { type: 'paragraph', text: `In ${E.country}, spending of ${pct(E.spendingShare)} of GDP against tax revenue of ${bn(E.revenue)} leaves a gap of ${bn(E.deficit)} a year, which is borrowed. To close it without cutting spending, taxes would have to rise by ${bn(E.deficit)}.` },
    ],
    realExample: { emoji: '🌏', text: 'Governments in France and Denmark spend around half of national income and collect taxes to match; Singapore\'s government spends far less, around a fifth, and its tax burden is correspondingly low.' },
    misconception: 'Students assume a government can spend more and keep taxes low by borrowing indefinitely. Borrowing postpones the tax: the debt and its interest must be paid from future revenue.',
    examMatters: 'When a question gives public spending as a share of GDP, link it to the tax share needed to fund it, then to incentives and to who pays. That chain turns a figure into analysis.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each way of paying for a larger state to its main drawback:',
      pairs: [
        { left: 'Raising the top rate of income tax', right: 'Skilled professionals may work less or move abroad', why: 'A higher marginal rate cuts the reward for extra work and for staying.' },
        { left: 'Raising the rate of sales tax', right: 'Low-income families lose the largest share of their income', why: 'The poor spend more of their income, so a sales tax takes more of it.' },
        { left: 'Borrowing the difference every year', right: 'Debt interest takes a growing slice of future revenue', why: 'Persistent deficits add to the debt, and interest on it must be paid later.' },
      ],
      distractors: ['Every private firm must close'],
    }),
  };
})();

/* ══ Block 3 — Taxes: Types, Incentives and Revenue (4.3.5 · 2a, 2b, 2c-1..3) ═ */

const directIndirect = (() => {
  const sid = subId('direct-and-indirect-taxes');
  return {
    id: sid,
    title: 'Direct and Indirect Taxes',
    keyIdea: 'A direct tax is levied on income or wealth and paid by the person who owes it; an indirect tax is levied on spending and passed on through the price of what is bought.',
    body: [
      { type: 'paragraph', text: 'A **direct tax** is a tax on income or wealth, paid directly to the government by the person or firm it falls on. Examples: personal income tax, corporation tax on company profits, taxes on capital gains, property taxes and inheritance taxes.' },
      { type: 'paragraph', text: 'An **indirect tax** is a tax on spending. It is collected from sellers, who pass some or all of it on to buyers in the price. Examples: value added tax (VAT) or a goods and services tax (GST), general sales taxes, excise duties on fuel, alcohol and tobacco, and customs duties on imports.' },
      { type: 'paragraph', text: 'The mix of the two differs between countries. Many developing and emerging economies rely heavily on indirect taxes, because they are easier to collect when many people work in the informal sector and never file an income tax return. High-income economies raise more through income tax and social contributions.' },
    ],
    realExample: { emoji: '🧾', text: 'Hong Kong has no general sales tax and relies on salaries tax, profits tax and property-related revenue. Singapore levies a goods and services tax alongside its income tax, and Malaysia a sales and service tax.' },
    misconception: 'Students call corporation tax an indirect tax because a firm pays it. It is direct: it is levied on the firm\'s own profit. An indirect tax is levied on a transaction and passed on in the price.',
    examMatters: 'The specification asks for the distinction AND examples, so give one of each and say what each is levied on: income or wealth for a direct tax, spending for an indirect tax.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each tax into direct or indirect:',
      groups: [
        { name: 'Direct tax', items: ['A levy on the profit a bank earns in the year', 'A charge on the value of a family\'s land and buildings', 'A deduction from a nurse\'s monthly salary'], why: 'Each is levied on income or wealth and paid by the person or firm who owes it.' },
        { name: 'Indirect tax', items: ['A duty added to every litre of petrol at the pump', 'A charge on the sale of a new mobile phone', 'A levy on a shipment of imported cars'], why: 'Each is levied on a purchase and reaches the buyer through the price.' },
      ],
    }),
  };
})();

const taxStructures = (() => {
  const sid = subId('progressive-proportional-regressive');
  const [y1, y2, y3] = E.incomes;
  return {
    id: sid,
    title: 'Progressive, Proportional and Regressive Taxes',
    keyIdea: 'Whether a tax is progressive, proportional or regressive depends on how the share of income it takes changes as income rises: up, the same, or down.',
    body: [
      { type: 'paragraph', text: 'The test is the **average rate of tax**: tax paid as a percentage of income. A **progressive** tax takes a rising share as income rises. A **proportional** tax takes the same share at every income. A **regressive** tax takes a falling share as income rises, even if richer people pay more in dollars.' },
      { type: 'paragraph', text: `${E.country}'s income tax is progressive: nothing on the first $5,000, 10% on income from $5,000 to $25,000 and 30% above $25,000. A household earning ${money(y1)} pays ${money(E.progTax[0])}, an average rate of ${pct(E.progAvg[0])}. One earning ${money(y2)} pays ${money(E.progTax[1])}, ${pct(E.progAvg[1])}. One earning ${money(y3)} pays ${money(E.progTax[2])}, ${pct(E.progAvg[2])}. The **marginal rate**, the rate on the last dollar earned, is 30% for the richest, above its average rate.` },
      { type: 'paragraph', text: `A flat ${pct(E.flat)} tax on all income would be proportional. ${E.country}'s ${pct(E.salesRate)} sales tax is regressive: poorer households spend ${pct(E.spendShare[0])} of their income and richer ones ${pct(E.spendShare[2])}, so the sales tax takes ${pct(E.salesAvg[0])} of the lowest income and ${pct(E.salesAvg[2])} of the highest.` },
    ],
    realExample: { emoji: '📊', text: 'Most countries tax income progressively. Several, including Georgia and Kazakhstan, have used a single flat rate of income tax, which is proportional above any tax-free allowance.' },
    misconception: 'Students call a sales tax proportional because everyone pays the same rate on each purchase. Measured against income, which is the test, it is regressive: the poor spend a larger share of what they earn.',
    examMatters: 'Always judge the structure by the share of INCOME taken, not by the dollars paid or the rate on each purchase. A richer household paying more dollars can still face a regressive tax.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Name the structure of each tax from what it takes from three households on $20,000, $60,000 and $150,000:',
      template: [
        'It takes 12%, 12% and 12% of their incomes: ___.',
        'It takes 2%, 14% and 27% of their incomes: ___.',
        'It takes $1,600, $2,400 and $3,000, which is 8%, 4% and 2% of income: ___.',
      ],
      answers: ['proportional', 'progressive', 'regressive'],
      hints: ['the share of income never changes', 'the share climbs with income', 'the share shrinks though the dollars grow'],
      distractors: ['marginal', 'indirect'],
    }),
  };
})();

const incentivesToWork = (() => {
  const sid = subId('incentives-to-work');
  return {
    id: sid,
    title: 'Tax Changes and Incentives to Work',
    keyIdea: 'A higher marginal rate of income tax cuts the reward for extra work, which may reduce hours, effort or participation; but some people work more to keep their income up.',
    body: [
      { type: 'paragraph', text: `The first effect of changing tax rates the specification names is on **incentives to work**. What matters is the **marginal** rate: the share of an extra dollar earned that is taken in tax. When ${E.country}'s top rate rises from ${pct(E.mrBefore)} to ${pct(E.mrAfter)}, a worker who earns an extra ${money(E.extraEarned)} keeps ${money(E.keptAfter)} instead of ${money(E.keptBefore)}.` },
      { type: 'paragraph', text: 'That lower reward can reduce the supply of labour in several ways: fewer overtime hours, less effort towards promotion, a second earner deciding not to take a job, early retirement, or skilled workers moving abroad. It can also push work into the informal economy, where it goes untaxed.' },
      { type: 'paragraph', text: 'But the effect is not certain. Some workers have a target income, for a mortgage or school fees, and work MORE when a tax rise cuts their take-home pay. Many cannot choose their hours at all. The evidence suggests that second earners and high earners respond most, while most full-time workers change their hours little.' },
      { type: 'paragraph', text: 'Indirect taxes matter too. A rise in VAT raises prices, so each hour worked buys less, which also weakens the reward for work, though more gently.' },
    ],
    realExample: { emoji: '👩‍💼', text: 'Sweden introduced an in-work tax credit and the Netherlands gives working parents a tax credit, partly because studies found that second earners and low earners change how much they work more than most when tax rates change.' },
    misconception: 'Students write that a tax rise "makes everyone work less". It lowers the reward for extra work, but people with a target income may work more to protect it, so the overall effect is an empirical question.',
    examMatters: 'Name the marginal rate, not the average rate, when you analyse incentives: it is the tax on the next hour worked that shapes the choice about working it.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each response to a rise in the marginal rate of income tax: works less or works more:',
      groups: [
        { name: 'Works less', items: ['A surgeon turns down weekend clinics', 'A parent decides a part-time job no longer pays after childcare', 'An engineer accepts an offer in a lower-tax country'], why: 'Each reacts to the lower reward for extra work by supplying less of it at home.' },
        { name: 'Works more', items: ['A taxi driver adds shifts to keep up the car loan payments', 'A shop owner stays open later to protect the family\'s income'], why: 'Each has an income target, and a lower take-home pay per hour means more hours are needed to reach it.' },
      ],
    }),
  };
})();

const lafferCurve = (() => {
  const sid = subId('laffer-curve');
  return {
    id: sid,
    title: 'Tax Revenues: Laffer Curve Analysis',
    keyIdea: 'The Laffer curve shows tax revenue rising with the tax rate up to a peak and falling beyond it, because very high rates shrink the tax base.',
    body: [
      { type: 'paragraph', text: 'At a tax rate of 0% the government collects nothing. At 100% it also collects close to nothing, because nobody has a reason to earn taxable income. In between, revenue rises and then falls. The **Laffer curve** plots tax revenue against the tax rate and has a peak: the revenue-maximising rate.' },
      { type: 'paragraph', text: `Revenue is the rate times the **tax base**, the amount of income or spending that is taxed. Below the peak, a higher rate raises revenue because the base shrinks only a little. Above it, a higher rate shrinks the base so much, through less work, more avoidance and evasion, and activity moving abroad, that revenue falls. In ${E.country}'s example the curve peaks at ${pct(E.lafferPeak)}, where revenue is ${bn(E.lafferMax)}.` },
      { type: 'paragraph', text: 'The policy argument follows: if a rate is above the peak, cutting it raises revenue. The difficulty is that nobody knows where the peak is. It differs between taxes and countries, it moves over time, and most estimates place it well above the rates most economies actually charge. A tax cut below the peak loses revenue, whatever its other merits.' },
    ],
    realExample: { emoji: '📉', text: 'When Russia replaced its progressive income tax with a flat 13% rate, revenue rose, but studies found that better collection and compliance, more than extra work, explained most of the increase.' },
    misconception: 'Students write that the Laffer curve proves tax cuts pay for themselves. It says so only above the revenue-maximising rate, and where that rate lies is unknown; below it, a cut reduces revenue.',
    examMatters: 'Draw the curve with the tax rate on the horizontal axis and revenue on the vertical, marking 0%, 100% and the peak. The evaluation is always where the economy sits relative to the peak, and how anyone could know.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'A different government\'s revenue curve peaks at a rate of 40%. Complete each prediction:',
      template: [
        'It cuts the rate from 25% to 20%, so its revenue will ___.',
        'It cuts the rate from 70% to 60%, so its revenue will ___.',
        'At a rate of 40%, a further small increase in the rate would leave revenue ___.',
      ],
      answers: ['fall', 'rise', 'lower'],
      hints: ['below the peak, the base barely grows when the rate is cut', 'above the peak, a cut lets the base recover by more', 'at the top of the curve, any move is downhill'],
      distractors: ['double', 'stay at zero'],
    }),
  };
})();

const incomeDistribution = (() => {
  const sid = subId('tax-income-distribution');
  const [y1, , y3] = E.incomes;
  return {
    id: sid,
    title: 'Tax Changes and Income Distribution',
    keyIdea: 'Raising progressive taxes narrows the gap between high and low incomes after tax; raising regressive taxes such as a sales tax widens it.',
    body: [
      { type: 'paragraph', text: 'Taxes change **income distribution**: how evenly disposable income is shared. Which way a tax change moves it depends on the structure of the tax being changed.' },
      { type: 'bullets', items: [
        '**Raising a progressive direct tax**, such as the top rate of income tax, takes more from higher incomes, so post-tax incomes become more equal. Cutting it does the reverse.',
        '**Raising a regressive indirect tax** takes a larger share of lower incomes, so the distribution becomes less equal. Cutting it, or exempting food and medicine, helps the poor most.',
        '**Raising the tax-free allowance** removes tax from the lowest earners altogether, a larger gain for them as a share of income than for the rich.',
      ] },
      { type: 'paragraph', text: `In ${E.country}, raising the sales tax from ${pct(E.salesRate)} to ${pct(E.salesRateHigh)} costs the household on ${money(y1)} an extra ${money(E.salesExtra[0])}, which is ${pct(E.salesExtraShare[0])} of its income, and the household on ${money(y3)} an extra ${money(E.salesExtra[2])}, only ${pct(E.salesExtraShare[2])} of its income.` },
      { type: 'paragraph', text: 'Taxes are only half of redistribution: what the revenue is spent on matters too. A regressive tax that funds free schooling for poor children can still narrow inequality overall. How inequality is measured is topic 4.3.4.' },
    ],
    realExample: { emoji: '⚖️', text: 'South Africa exempts basic foods such as maize meal and brown bread from VAT, a choice justified on the grounds that poorer households spend a far larger share of their income on them.' },
    misconception: 'Students conclude that indirect taxes cannot reduce inequality. On their own they tend to widen it, but exemptions for necessities and the spending they fund can make the overall effect progressive.',
    examMatters: 'State the structure of the tax first, then the direction of the effect on the gap between post-tax incomes. The evaluation is what the revenue is spent on and what exemptions exist.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each tax change by its likely effect on income distribution: narrows the gap or widens it:',
      groups: [
        { name: 'Narrows the gap', items: ['Raising the income tax rate on earnings above $200,000', 'Lifting the tax-free allowance so cleaners and farm workers pay nothing', 'Removing sales tax from rice, flour and cooking oil'], why: 'Each takes relatively more from high incomes or relatively less from low ones.' },
        { name: 'Widens the gap', items: ['Raising the rate of VAT on all goods', 'Halving the tax on the highest salaries', 'Replacing income tax with a single flat charge per adult'], why: 'Each takes a larger share of low incomes or a smaller share of high ones.' },
      ],
    }),
  };
})();

/* ══ Block 4 — Tax Changes and the Macroeconomy (4.3.5 · 2c-4..7) ══════════════ */

const outputEmployment = (() => {
  const sid = subId('tax-output-employment');
  return {
    id: sid,
    title: 'Tax Changes, Real Output and Employment',
    keyIdea: 'A tax cut raises disposable income or profits, so aggregate demand rises and, where there is spare capacity, real output and employment rise with it.',
    body: [
      { type: 'paragraph', text: 'A change in tax rates affects **real output and employment** mainly through aggregate demand. A cut in income tax leaves households with more disposable income, and most of it is spent. A cut in corporation tax leaves firms with more post-tax profit to invest. Either way, aggregate demand shifts to the right, and firms hire more workers to produce the extra output.' },
      { type: 'flow', resultType: 'good', steps: [
        { title: 'Income tax is cut', subtitle: 'Take-home pay rises' },
        { title: 'Households spend more', subtitle: 'AD shifts right' },
        { title: 'Firms raise production', subtitle: 'Real output grows' },
        { title: 'Employers hire more workers', subtitle: 'Unemployment falls' },
      ] },
      { type: 'paragraph', text: 'How far output rises depends on spare capacity. In a recession, the extra demand is met with more output and jobs. Near full capacity, it mostly raises prices instead. Some of the extra income is saved or spent on imports, which weakens the effect, and the size of the knock-on rounds of spending is the multiplier, topic 2.3.4.' },
      { type: 'paragraph', text: 'Tax cuts can also work on the supply side: lower marginal rates may raise the supply of labour and investment, shifting long-run aggregate supply. A rise in taxes works the other way on both counts.' },
    ],
    realExample: { emoji: '🏭', text: 'India cut its corporation tax rate sharply to revive slowing investment, with the stated aim of creating jobs in manufacturing.' },
    misconception: 'Students assume a tax cut always creates jobs. With little spare capacity the extra demand raises prices more than output; and if households fear future tax rises, they may save the cut rather than spend it.',
    examMatters: 'On an AD/AS diagram, show a tax cut as a rightward shift of AD and read off both real output and the price level. The evaluation is how much spare capacity there is.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the effects of an income tax cut in causal order, from the budget decision to the labour market:',
      correctOrder: [
        'The finance minister lowers the basic rate of income tax',
        'Households find more money in their pay packets each month',
        'Shops and restaurants take more orders, so AD shifts right',
        'Firms run extra shifts and real output grows',
        'Employers take on staff, so unemployment falls',
      ],
      criterion: 'cause to effect: each step is caused by the one before it',
      why: [
        'The chain starts with the change in the tax rate.',
        'A lower rate means higher disposable income.',
        'Higher disposable income raises consumption, a component of AD.',
        'Firms raise production to meet the extra demand.',
        'Producing more needs more workers, so employment rises.',
      ],
    }),
  };
})();

const priceLevel = (() => {
  const sid = subId('tax-price-level');
  return {
    id: sid,
    title: 'Tax Changes and the Price Level',
    keyIdea: 'A rise in indirect taxes raises the price level directly, as a cost passed on to buyers; a cut in direct taxes can raise it indirectly, through extra demand.',
    body: [
      { type: 'paragraph', text: 'Taxes affect **the price level** through both sides of the economy.' },
      { type: 'bullets', items: [
        '**Indirect taxes raise costs.** A rise in VAT or excise duty is added to prices at the till. For the whole economy it is a rise in costs of production, so short-run aggregate supply shifts to the left: the price level rises and real output falls. This is cost-push inflation, though it is a one-off jump in the level rather than a continuing rise, unless it sets off demands for higher wages.',
        '**Direct tax cuts raise demand.** More disposable income shifts aggregate demand to the right. Near full capacity, this is demand-pull pressure on the price level.',
        '**Tax rises work the other way.** Higher income tax reduces demand and eases inflation; a cut in fuel duty lowers costs and prices.',
      ] },
      { type: 'paragraph', text: 'Governments sometimes use this directly: cutting fuel or food taxes to hold down prices when inflation is high, though the cost is lost revenue.' },
    ],
    realExample: { emoji: '⛽', text: 'When Japan raised its consumption tax, measured inflation jumped in the month the new rate took effect and then fell back a year later, as the one-off rise dropped out of the annual comparison.' },
    misconception: 'Students write that an indirect tax rise "causes inflation" as if it continues. It raises the price level once; inflation continues only if it triggers a wage-price spiral.',
    examMatters: 'Draw the indirect tax rise as a leftward shift of SRAS, not of AD, and label the higher price level and lower real output. Confusing the two shifts is the most common diagram error here.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each tax change by its likely effect on the price level: pushes it up or eases it:',
      groups: [
        { name: 'Pushes the price level up', items: ['Excise duty on diesel rises by a fifth', 'A new sales tax is added to restaurant meals', 'Income tax is cut when the economy is already at full capacity'], why: 'Each either adds to costs passed on in prices or adds demand where output cannot rise.' },
        { name: 'Eases the price level', items: ['VAT on electricity is suspended for a winter', 'Income tax rises and households cut back their spending', 'Import duty on wheat is removed'], why: 'Each either lowers costs passed on in prices or reduces demand.' },
      ],
    }),
  };
})();

const tradeBalance = (() => {
  const sid = subId('tax-trade-balance');
  return {
    id: sid,
    title: 'Tax Changes and the Trade Balance',
    keyIdea: 'A cut in income tax raises spending, some of it on imports, so the trade balance tends to worsen; a tax rise does the reverse. Taxes on costs also change export competitiveness.',
    body: [
      { type: 'paragraph', text: 'The **trade balance** is exports minus imports of goods and services. Tax changes move it in two ways.' },
      { type: 'paragraph', text: `**Through incomes and imports.** A cut in income tax raises disposable income, and part of each extra dollar is spent on imports. The share spent on imports is the marginal propensity to import. If ${E.country} cuts income tax by ${bn(E.taxCut)} and its marginal propensity to import is ${E.mpm}, imports rise by about ${bn(E.importsUp)}, and the trade balance worsens by that amount unless exports rise too. A tax rise has the opposite effect, which is why governments facing a large trade deficit sometimes raise taxes to cut spending on imports.` },
      { type: 'paragraph', text: '**Through costs and prices.** Taxes on firms\' costs, such as payroll taxes or duties on fuel and inputs, raise the price of exports and make them less competitive abroad. Cutting them helps exporters. Indirect taxes such as VAT are usually charged on imports and refunded on exports, so they change the trade balance mainly through demand, not through export prices.' },
    ],
    realExample: { emoji: '🚢', text: 'Sri Lanka, short of foreign currency to pay for imports, raised its VAT rate and restricted imports of vehicles and luxury goods to reduce spending on imports.' },
    misconception: 'Students write that a tax cut improves the trade balance because firms become more competitive. An income tax cut mostly raises spending, including on imports, so it usually worsens the trade balance.',
    examMatters: 'Name the channel. An income tax change works through disposable income and imports; a tax on costs works through export prices. Say which the question describes before explaining the effect.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Work through a tax cut in a different economy, with a marginal propensity to import of 0.25:',
      template: [
        'Income tax is cut by $20bn, so imports rise by about ___.',
        'Foreign demand for its goods is unchanged, so its exports minus imports ___.',
        'To shrink a trade deficit instead, it could raise income tax, which would ___ the amount households buy from abroad.',
      ],
      answers: ['$5bn', 'falls', 'reduce'],
      hints: ['the tax cut times the share spent abroad', 'purchases from abroad grew and sales abroad did not', 'less disposable income means less buying of foreign goods'],
      distractors: ['$80bn', 'rises', 'double'],
    }),
  };
})();

const fdiFlows = (() => {
  const sid = subId('tax-fdi-flows');
  return {
    id: sid,
    title: 'Tax Changes and FDI Flows',
    keyIdea: 'A lower corporation tax rate raises the post-tax return on investing in a country, so it tends to attract inward FDI; a higher rate can drive it elsewhere.',
    body: [
      { type: 'paragraph', text: '**Foreign direct investment (FDI)** is investment by a firm in productive assets it controls in another country: a factory, a mine, a data centre. A transnational corporation (TNC) choosing where to invest compares the return after tax in each possible location, so tax rates affect **FDI flows**.' },
      { type: 'paragraph', text: `Suppose a TNC can invest ${mnd(E.fdiProject)} in ${E.country} and earn ${mnd(E.fdiProfit)} a year before tax. At a corporation tax rate of ${pct(E.corpBefore)} it keeps ${pct(E.fdiReturnBefore)} a year on its investment. If the rate is cut to ${pct(E.corpAfter)}, it keeps ${pct(E.fdiReturnAfter)}, and projects that were marginal become worth doing. Tax holidays for new investors, and lower taxes in special economic zones, work the same way.` },
      { type: 'paragraph', text: 'But tax is one factor among many. TNCs also weigh market size, wages and skills, infrastructure, political stability and the rule of law. A low tax rate does not attract investment to an economy without roads or reliable power, and a tax cut costs revenue on all the investment that would have come anyway. When many countries cut rates to compete, none gains much.' },
    ],
    realExample: { emoji: '🏗️', text: 'Ireland\'s low corporation tax rate has helped attract the European headquarters of many US technology and pharmaceutical firms; Vietnam has offered tax holidays to draw electronics factories.' },
    misconception: 'Students treat a low tax rate as enough to attract FDI. TNCs invest for markets, skills and stability first; tax matters most between locations that are already similar on those.',
    examMatters: 'Work out a return after tax when a question gives the figures, and then weigh tax against the other location factors. That weighing is the evaluation.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each tax measure to its likely effect on FDI flows:',
      pairs: [
        { left: 'A ten-year exemption from profit tax for new car plants', right: 'Assembly firms from abroad choose this country for their next factory', why: 'A tax holiday raises the post-tax return on a new plant.' },
        { left: 'A sharp rise in the corporation tax rate', right: 'A foreign bank moves its regional office to a neighbour', why: 'A lower post-tax return makes other locations more attractive.' },
        { left: 'Every nearby country cuts its rate to the same level', right: 'None of them gains much extra investment', why: 'When rates are equal, tax no longer distinguishes one location from another.' },
      ],
      distractors: ['Domestic households stop saving'],
    }),
  };
})();

/* ══ Block 5 — Fiscal Deficits and the National Debt (4.3.5 · 3a, 3b, 3c) ══════ */

const deficitsSurpluses = (() => {
  const sid = subId('fiscal-deficits-and-surpluses');
  return {
    id: sid,
    title: 'Fiscal Deficits and Fiscal Surpluses',
    keyIdea: 'A fiscal deficit is when government spending exceeds tax revenue in a year and the difference is borrowed; a fiscal surplus is when revenue exceeds spending.',
    body: [
      { type: 'paragraph', text: 'The government\'s budget compares its spending with its revenue, mostly taxes, over one year. There are three possible outcomes:' },
      { type: 'bullets', items: [
        '**A fiscal deficit**: public expenditure is greater than revenue. The gap must be borrowed, usually by selling government bonds.',
        '**A fiscal surplus**: revenue is greater than public expenditure. The extra can be used to repay debt or saved.',
        '**A balanced budget**: the two are equal.',
      ] },
      { type: 'paragraph', text: `${E.country} spends ${bn(E.spending)} and raises ${bn(E.revenue)}, so it runs a fiscal deficit of ${bn(E.deficit)}. Deficits are usually compared as a percentage of GDP, so that economies of different sizes can be compared: ${bn(E.deficit)} of a ${bn(E.gdp)} GDP is ${pct(E.deficitShare)}.` },
      { type: 'paragraph', text: 'Most governments run deficits in most years. Surpluses are more common in economies with large revenues from oil or other commodities, and in some with strict budget rules. A deficit is not a sign of failure in itself: borrowing to build infrastructure, or to support incomes in a recession, can be sensible.' },
    ],
    realExample: { emoji: '🛢️', text: 'Norway usually runs a fiscal surplus, largely from oil revenues, and saves it in its sovereign wealth fund; most other high-income economies run deficits in most years.' },
    misconception: 'Students write that a fiscal deficit means the government is spending too much. It means spending exceeds revenue in that year, which can be caused by falling revenue in a recession as much as by high spending.',
    examMatters: 'Define both terms against ONE year, and use percentages of GDP when comparing countries or years. A deficit figure in dollars alone says little about its size.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the budget figures for a different government, with a GDP of $500bn:',
      template: [
        'It spends $210bn and raises $190bn in revenue, so its budget shows a ___ of $20bn.',
        'As a share of GDP, that gap is ___.',
        'Next year revenue reaches $215bn while spending stays at $210bn, which is a ___.',
      ],
      answers: ['fiscal deficit', '4%', 'fiscal surplus'],
      hints: ['spending is greater than revenue', 'the gap divided by GDP, times a hundred', 'revenue is greater than spending'],
      distractors: ['national debt', '10%', 'balanced budget'],
    }),
  };
})();

const deficitDebt = (() => {
  const sid = subId('fiscal-deficit-and-national-debt');
  return {
    id: sid,
    title: 'A Fiscal Deficit and the National Debt',
    keyIdea: 'A fiscal deficit is a flow over one year; the national debt is the stock of all past borrowing still owed. Each year\'s deficit adds to the debt.',
    body: [
      { type: 'paragraph', text: 'The **fiscal deficit** is a **flow**: the amount borrowed in one year. The **national debt** is a **stock**: the total the government owes at a moment in time, built up from all the deficits of the past minus any surpluses used to repay it.' },
      { type: 'paragraph', text: `${E.country}'s national debt is ${bn(E.debt)}, ${pct(E.debtShare)} of GDP. This year's deficit of ${bn(E.deficit)} is borrowed on top, so next year the debt is ${bn(E.debtNext)}. A year later the government runs a surplus of ${bn(E.surplus)} and uses it to repay debt, which falls to ${bn(E.debtAfterSurplus)}.` },
      { type: 'paragraph', text: 'Two consequences are often confused. First, a **falling deficit does not mean a falling debt**: as long as there is any deficit, the debt is still rising, only more slowly. The debt falls in dollars only when the budget is in surplus. Second, the debt as a **share of GDP** can fall even while the debt rises, if GDP grows faster than the debt does.' },
    ],
    realExample: { emoji: '🇯🇵', text: 'Japan has run fiscal deficits almost every year for three decades, which is why its national debt is more than twice the size of its GDP, the highest ratio among major economies.' },
    misconception: 'Students write that cutting the deficit reduces the national debt. It reduces how fast the debt grows; only a surplus reduces the debt itself.',
    examMatters: 'Use "flow" and "stock" when you distinguish the two, and add the link: the deficit is what adds to the debt each year. That pairing is what a 4-mark Explain looks for.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the distinction, using a different government that owes $300bn at the start of the year:',
      template: [
        'Its $25bn shortfall of revenue this year is a ___ measure of borrowing.',
        'The $300bn it owes is a ___ built up from past borrowing.',
        'After this year\'s shortfall is borrowed, it owes ___.',
        'For what it owes to fall in dollars, it must run a ___.',
      ],
      answers: ['flow', 'stock', '$325bn', 'surplus'],
      hints: ['measured over a period of time', 'measured at a moment in time', 'the old total plus this year\'s borrowing', 'revenue must exceed spending'],
      distractors: ['$275bn', 'balance', 'recession'],
    }),
  };
})();

const stabilisers = (() => {
  const sid = subId('automatic-stabilisers-and-discretionary-policy');
  return {
    id: sid,
    title: 'Automatic Stabilisers and Discretionary Fiscal Policy',
    keyIdea: 'Automatic stabilisers are tax and spending changes that happen without any decision as the economy moves; discretionary policy is a deliberate decision to change them.',
    body: [
      { type: 'paragraph', text: '**Automatic stabilisers** are parts of the tax and benefit system that change without any government decision when the economy changes, and in doing so dampen the swing. In a recession, incomes and profits fall, so income tax, corporation tax and VAT receipts fall; at the same time, more people claim unemployment and income support. Households\' disposable incomes fall by less than their earnings, so spending falls by less. In a boom the process reverses: receipts rise faster than incomes and benefit claims fall, which cools demand.' },
      { type: 'paragraph', text: `In ${E.country}'s recession, tax receipts fall by ${bn(E.recessionRevenueFall)} and benefit spending rises by ${bn(E.recessionTransferRise)}: the deficit widens by ${bn(E.stabiliserSwing)} without anyone deciding it. Progressive taxes make the stabilisers stronger, because tax falls faster than income.` },
      { type: 'paragraph', text: '**Discretionary fiscal policy** is a deliberate decision to change tax rates or public spending: a stimulus package, a new infrastructure programme, a cut in VAT. It can be larger and targeted, but it takes time to decide, legislate and deliver, and may arrive after the recession has passed.' },
    ],
    realExample: { emoji: '🛡️', text: 'Economies with large tax and benefit systems, such as Germany and the Nordic countries, have strong automatic stabilisers; economies where few people pay income tax or receive benefits, as in much of South Asia, have weak ones.' },
    misconception: 'Students describe a stimulus package announced in a recession as an automatic stabiliser. It is discretionary: someone decided it. Only changes that happen without a decision count as automatic.',
    examMatters: 'The distinction is the decision. Name one automatic example (falling tax receipts, rising benefit claims) and one discretionary one (a new spending programme) and say which needed a policy choice.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each change during a recession by whether it happens automatically or needs a government decision:',
      groups: [
        { name: 'Automatic stabiliser', items: ['Corporation tax paid falls as company profits shrink', 'More newly jobless workers start drawing unemployment support', 'Sales tax receipts drop as shoppers cut back'], why: 'Each follows from the existing tax and benefit rules as incomes and jobs fall; nobody has to decide it.' },
        { name: 'Discretionary policy', items: ['The government brings forward a new port and railway programme', 'The sales tax rate is cut for twelve months to revive spending', 'Parliament votes to raise the weekly unemployment benefit'], why: 'Each needs a deliberate government decision to change a tax rate or a spending plan.' },
      ],
    }),
  };
})();

const structuralCyclical = (() => {
  const sid = subId('structural-and-cyclical-deficits');
  return {
    id: sid,
    title: 'Structural and Cyclical Fiscal Deficits',
    keyIdea: 'The cyclical deficit is the part caused by the economic cycle, and it disappears in recovery; the structural deficit would remain even at full capacity.',
    body: [
      { type: 'paragraph', text: 'A fiscal deficit has two parts. The **cyclical deficit** is the part caused by the economic cycle: in a downturn, tax receipts fall and benefit spending rises through the automatic stabilisers. As the economy recovers, this part shrinks by itself. The **structural deficit** is the part that would remain even if the economy were producing at full capacity: spending commitments are simply larger than the revenue the tax system raises in a normal year.' },
      { type: 'paragraph', text: `At full capacity ${E.country} would run a deficit of ${bn(E.structural)}, ${pct(E.structuralShare)} of GDP: that is its structural deficit. In a recession the stabilisers add ${bn(E.cyclical)}, so the actual deficit is ${bn(E.recessionDeficit)}, ${pct(E.recessionDeficitShare)} of GDP, of which ${pct(E.cyclicalShare)} is cyclical.` },
      { type: 'paragraph', text: 'The distinction decides the policy response. A cyclical deficit needs no action: growth will close it. A structural deficit will not close by waiting, and needs a decision to raise taxes or cut spending. The difficulty is that the split has to be estimated, because nobody can observe full-capacity output directly, and estimates are often revised.' },
    ],
    realExample: { emoji: '📐', text: 'The IMF publishes estimates of structural deficits for its member countries, and these are often revised by one or two percentage points of GDP as estimates of each economy\'s capacity change.' },
    misconception: 'Students treat any large deficit as structural. In a deep recession most of a deficit may be cyclical and will shrink as the economy recovers, so a large deficit alone does not show a structural problem.',
    examMatters: 'Link each kind of deficit to its cause and its cure: cyclical to the cycle and recovery, structural to spending and tax commitments and a policy decision. Say that the split is an estimate.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each cause of a government\'s deficit into the structural or the cyclical part:',
      groups: [
        { name: 'Structural', items: ['A permanent rise in the state pension paid from general taxes', 'Tax rates cut in a boom with no spending cuts to match', 'A new free-meals scheme for every school with no new revenue'], why: 'Each widens the gap between spending and revenue even at full capacity.' },
        { name: 'Cyclical', items: ['Corporation tax receipts slump as profits fall in a downturn', 'Unemployment benefit claims double during a recession', 'VAT receipts drop as shoppers cut back in a slump'], why: 'Each is caused by the downturn and reverses as the economy recovers.' },
      ],
    }),
  };
})();

const deficitFactors = (() => {
  const sid = subId('factors-influencing-deficits-and-debt');
  return {
    id: sid,
    title: 'Factors Influencing the Size of Fiscal Deficits and National Debts',
    keyIdea: 'Deficits and debts grow with recessions, spending commitments, tax cuts, interest costs and emergencies, and shrink with growth, inflation and surpluses.',
    body: [
      { type: 'paragraph', text: 'The factors that influence the size of fiscal deficits and national debts can be grouped:' },
      { type: 'bullets', items: [
        '**The economic cycle** — recessions widen deficits through the automatic stabilisers; booms narrow them.',
        '**Policy decisions** — spending programmes, tax cuts and subsidies, such as fuel subsidies, widen the gap unless matched.',
        '**Demography** — an ageing population raises pension and health spending and narrows the tax base.',
        '**Interest rates** — the higher the interest rate on the debt, the more is paid each year in debt interest, which is part of spending.',
        '**Shocks and emergencies** — wars, pandemics, natural disasters and banking crises can add years of borrowing at once, especially if the state rescues banks.',
        '**The exchange rate** — debt owed in foreign currency grows when the home currency falls.',
      ] },
      { type: 'paragraph', text: 'The **debt as a share of GDP** also depends on growth and inflation. Faster nominal GDP growth makes an unchanged debt a smaller share of the economy, which is how several countries reduced very high debt ratios without ever repaying much of the debt itself.' },
    ],
    realExample: { emoji: '🌪️', text: 'Several Caribbean economies, including Dominica, saw their national debts jump after hurricanes destroyed infrastructure that had to be rebuilt with borrowed money.' },
    misconception: 'Students list only government overspending as a cause of deficits. Falling revenue in a recession, rising interest rates, a falling currency and disasters can all widen a deficit with no new spending decision at all.',
    examMatters: 'When an extract describes a rising deficit, classify its cause: cyclical, a policy choice, interest costs or a shock. That classification is what lets you judge whether it will persist.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each event to the way it changes a government\'s deficit or debt:',
      pairs: [
        { left: 'The central bank lifts interest rates sharply', right: 'Each year more revenue goes on paying lenders', why: 'Higher rates raise the cost of servicing the debt, which is part of spending.' },
        { left: 'The home currency loses a third of its value', right: 'Loans owed in dollars grow in local-currency terms', why: 'Foreign-currency debt costs more home currency to repay when the currency falls.' },
        { left: 'A cyclone flattens bridges and ports', right: 'Rebuilding adds years of borrowing at once', why: 'Emergency reconstruction is spending with no matching revenue.' },
        { left: 'Nominal GDP grows by 10% a year for a decade', right: 'The debt shrinks as a share of national output', why: 'Faster growth in GDP than in debt lowers the debt ratio.' },
      ],
    }),
  };
})();

const interestServicing = (() => {
  const sid = subId('interest-rates-and-debt-servicing');
  return {
    id: sid,
    title: 'Deficits, Debt, Interest Rates and Debt Servicing',
    keyIdea: 'Large deficits can push up interest rates, and a large debt must be serviced: the interest paid on it uses revenue that could fund services or tax cuts.',
    body: [
      { type: 'paragraph', text: 'The specification names three ways the size of deficits and debts matters. The first two are linked.' },
      { type: 'paragraph', text: '**Impact on interest rates.** A government with a large deficit must sell a large volume of bonds each year. To find buyers, it may have to offer higher interest rates, especially if lenders start to doubt it will be repaid. Higher government borrowing costs tend to raise interest rates across the economy, on mortgages and business loans too, which can crowd out private investment.' },
      { type: 'paragraph', text: `**Debt servicing** is paying the interest on the national debt, and repaying or refinancing it as bonds mature. ${E.country}'s debt of ${bn(E.debt)} at an average rate of ${pct(E.rate)} costs ${bn(E.interest)} a year in interest, ${pct(E.interestOfRevenue)} of its tax revenue. If the average rate rose to ${pct(E.rateHigh)}, interest would cost ${bn(E.interestHigh)}, ${pct(E.interestHighOfRevenue)} of revenue.` },
      { type: 'paragraph', text: 'Every dollar spent on interest is a dollar not spent on schools or hospitals. When interest takes a large share of revenue, a government can find itself borrowing to pay interest, and the debt grows on its own. Debt owed in foreign currency adds exchange-rate risk: it must be serviced from export earnings.' },
    ],
    realExample: { emoji: '💸', text: 'Pakistan and Egypt have both spent more than a third of government revenue on interest payments in some recent years, leaving far less for development spending.' },
    misconception: 'Students treat the size of the debt as the problem in itself. What matters is the cost of servicing it relative to revenue and GDP, which depends on interest rates, growth and who holds the debt.',
    examMatters: 'Put a figure on debt servicing when you can: interest as a share of revenue or of GDP. It turns an assertion that debt is "high" into analysis a marker can credit.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Work out the cost of servicing another government\'s debt:',
      template: [
        'A different government owes $500bn, and lenders charge it 4% a year on average. Its annual interest bill is ___.',
        'Its tax revenue is $160bn, so interest takes ___ of revenue.',
        'If lenders demand higher interest rates on new bonds, that share will ___.',
      ],
      answers: ['$20bn', '12.5%', 'rise'],
      hints: ['the debt times the interest rate', 'the interest bill divided by revenue', 'more of the same revenue goes to lenders'],
      distractors: ['$125bn', '40%', 'fall'],
    }),
  };
})();

const intergenerational = (() => {
  const sid = subId('intergenerational-equity');
  return {
    id: sid,
    title: 'Deficits, Debt and Intergenerational Equity',
    keyIdea: 'Borrowing today passes the cost of servicing and repaying debt to future taxpayers, which is fair when they also benefit and unfair when they do not.',
    body: [
      { type: 'paragraph', text: 'The third significance is **intergenerational equity**: fairness between generations. Borrowing lets today\'s voters enjoy spending without paying the full tax for it. The debt is serviced and repaid by future taxpayers, including people too young to vote now or not yet born.' },
      { type: 'paragraph', text: 'Whether that is unfair depends on **what the borrowing pays for**. If it funds capital spending that lasts, such as a railway, a port or better schools, future generations share the benefits and it is reasonable that they share the cost. If it funds current spending that is used up now, such as higher public sector pay or subsidies on fuel, today\'s generation takes the benefit and leaves the bill.' },
      { type: 'paragraph', text: 'Other things matter too. An ageing population raises pension spending that future workers must fund. Borrowing to prevent a deep recession may protect the future too, if it avoids lasting unemployment and lost investment. And debt that is held at home is repaid to domestic lenders, so part of the burden is a transfer within the future generation rather than a loss to it.' },
    ],
    realExample: { emoji: '🚇', text: 'Governments that borrow to build metro systems, such as those in Delhi and Jakarta, argue that riders for decades ahead benefit and so should share the cost through future taxes.' },
    misconception: 'Students say all government borrowing is unfair to future generations. Borrowing for assets that last spreads the cost across those who benefit, which many economists regard as fair.',
    examMatters: 'Tie intergenerational equity to capital versus current spending, from 1a. That link is the judgement a 14 or 20 mark answer needs, instead of a bare assertion that debt is a burden.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each borrowing-funded item by its effect on intergenerational equity: shares cost with those who benefit, or shifts cost to future taxpayers:',
      groups: [
        { name: 'Shares cost with those who benefit', items: ['A high-speed rail line that will run for sixty years', 'Flood barriers that protect a city for generations', 'New university buildings for the coming decades of students'], why: 'Each is capital spending whose benefits last, so future taxpayers who repay also gain.' },
        { name: 'Shifts cost to future taxpayers', items: ['A one-year cut in fuel prices ahead of an election', 'Higher pay for current civil servants', 'A cash bonus paid to every pensioner this year'], why: 'Each is used up now, so today\'s generation benefits and a later one repays.' },
      ],
    }),
  };
})();

/* ══ Block 6 — Macroeconomic Policies in Use (4.3.5 · 4a, 4b) ═══════════════════ */

const toolkit = (() => {
  const sid = subId('the-five-policy-tools');
  return {
    id: sid,
    title: 'The Five Policy Tools',
    keyIdea: 'Governments have five tools: fiscal policy, monetary policy, exchange-rate policy, supply-side policies and direct controls. Each works through a different channel.',
    body: [
      { type: 'paragraph', text: 'The specification asks how governments use five kinds of policy to reach four aims. The instruments of fiscal and monetary policy, and the list of supply-side policies, are set out in topic 2.3.6; here the question is how they are used together.' },
      { type: 'bullets', items: [
        '**Fiscal policy** — changes in public spending and taxation, affecting aggregate demand and, through incentives and investment, aggregate supply.',
        '**Monetary policy** — changes in interest rates and the money supply by the central bank, affecting borrowing, spending and the exchange rate.',
        '**Exchange-rate policy** — influencing the value of the currency, by setting interest rates or by the central bank buying and selling currency from its reserves. How exchange rate systems work is topic 4.3.3.',
        '**Supply-side policies** — measures to raise productivity, competition and incentives: education and training, infrastructure, deregulation, privatisation.',
        '**Direct controls** — rules that set outcomes directly instead of working through prices: price caps, wage controls, limits on imports or exports, and controls on money moving in and out of the country.',
      ] },
      { type: 'paragraph', text: 'Most aims are pursued with several tools at once, and a tool that helps one aim can harm another: higher interest rates that curb inflation also raise the cost of servicing the national debt.' },
    ],
    realExample: { emoji: '🧰', text: 'Singapore\'s central bank uses the exchange rate, rather than an interest rate, as its main monetary tool, letting the Singapore dollar rise when it wants to hold down imported inflation.' },
    misconception: 'Students treat direct controls as a kind of fiscal policy. Fiscal policy works through spending and taxes, which change incentives; a direct control sets a price, a quantity or a flow by rule.',
    examMatters: 'Name the tool and its channel before its effect. "Monetary policy reduces inflation" earns less than "a higher policy rate raises borrowing costs, so consumption and investment fall".',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each measure to the policy tool it belongs to:',
      pairs: [
        { left: 'The central bank sells dollars from its reserves to prop up the currency', right: 'Exchange-rate policy', why: 'Buying the home currency with reserves is aimed at its value.' },
        { left: 'A legal ceiling on the price of bread and cooking gas', right: 'Direct controls', why: 'The outcome is set by rule, not through prices or incentives.' },
        { left: 'A budget that raises spending on rural clinics', right: 'Fiscal policy', why: 'It is a change in public expenditure.' },
        { left: 'A national apprenticeship scheme for school leavers', right: 'Supply-side policies', why: 'It raises skills and so productivity.' },
        { left: 'The policy interest rate is raised by two points', right: 'Monetary policy', why: 'Interest rates are the central bank\'s instrument.' },
      ],
    }),
  };
})();

const reducingDeficits = (() => {
  const sid = subId('reducing-fiscal-deficits-and-debt');
  return {
    id: sid,
    title: 'Using Policy to Reduce Fiscal Deficits and National Debts',
    keyIdea: 'Governments cut deficits by raising taxes or cutting spending, helped by growth, low interest rates and supply-side reform; the risk is that cuts shrink the economy and revenue.',
    body: [
      { type: 'paragraph', text: 'To **reduce fiscal deficits and national debts**, a government can use all five tools.' },
      { type: 'bullets', items: [
        '**Fiscal policy** — raise taxes, cut spending or both. Cutting subsidies and current spending is usually preferred to cutting capital spending, which supports future growth.',
        '**Monetary policy** — low interest rates reduce the cost of servicing the debt and support the growth that raises revenue.',
        '**Supply-side policies** — faster long-run growth raises tax revenue and makes the debt a smaller share of GDP.',
        '**Exchange-rate policy** — a lower currency can boost exports and growth, but raises the burden of any debt owed in foreign currency.',
        '**Direct controls** — rules that cap an outcome instead of changing the budget, such as legal limits on how much state-owned firms may borrow.',
      ] },
      { type: 'paragraph', text: 'The central risk is that fiscal tightening reduces aggregate demand. If output falls, tax receipts fall and benefit spending rises through the automatic stabilisers, so the deficit shrinks by less than planned and the debt ratio can even rise. That is why the timing and composition of cuts matter as much as their size.' },
    ],
    realExample: { emoji: '📉', text: 'Sri Lanka, under an IMF programme after defaulting on its foreign debt, raised income tax and VAT rates to shrink its deficit. Jamaica, also under IMF programmes, ran large surpluses before interest for over a decade and roughly halved its debt ratio.' },
    misconception: 'Students assume that a spending cut of $10bn reduces the deficit by $10bn. Lower spending reduces output and income, so tax revenue falls and benefit claims rise, offsetting part of the saving.',
    examMatters: 'An Evaluate (20 marks, Appendix 6) on reducing a deficit needs the trade-off: fiscal tightening may cut growth, and growth is itself one of the ways deficits shrink. Weigh tax rises against spending cuts, and timing against size.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each measure to reduce a deficit by the tool it uses: fiscal policy or another tool:',
      groups: [
        { name: 'Fiscal policy', items: ['Phasing out subsidies on petrol and diesel', 'Raising the rate of goods and services tax', 'Postponing new ministry buildings'], why: 'Each changes a tax or a line of public spending in the budget directly.' },
        { name: 'Another tool', items: ['The central bank holds interest rates low to cut debt costs', 'Letting the currency fall so exports become cheaper and growth picks up', 'Reforms that let new firms enter the telecoms market'], why: 'Each works through interest rates, the exchange rate or the supply side, without changing a tax or a spending line in the budget.' },
      ],
    }),
  };
})();

const controllingInflation = (() => {
  const sid = subId('controlling-inflation');
  return {
    id: sid,
    title: 'Using Policy to Control the Rate of Inflation',
    keyIdea: 'Inflation is usually fought with higher interest rates, helped by tighter fiscal policy, a stronger currency, supply-side reform and, sometimes, direct price controls.',
    body: [
      { type: 'paragraph', text: 'To **control the rate of inflation**, the main tool in most economies is monetary policy: an independent central bank raises interest rates, borrowing costs rise, and consumption and investment fall, so demand-pull pressure eases. The other tools support it:' },
      { type: 'bullets', items: [
        '**Fiscal policy** — tax rises or spending cuts reduce aggregate demand directly.',
        '**Exchange-rate policy** — a stronger currency makes imports cheaper and lowers the cost of imported fuel and food.',
        '**Supply-side policies** — higher productivity lets output grow without prices rising, though only over years.',
        '**Direct controls** — price caps on fuel or staple foods, or bans on exporting foods, hold prices down directly, but can cause shortages and cost the state money in subsidies.',
      ] },
      { type: 'paragraph', text: 'The right mix depends on the cause. Demand-pull inflation responds to higher interest rates and fiscal tightening. Cost-push inflation from a rise in world oil prices is harder: squeezing demand cuts inflation only by cutting output and jobs, which is why some governments reach for temporary controls or tax cuts on fuel.' },
    ],
    realExample: { emoji: '🇧🇷', text: 'Brazil\'s central bank raised its policy rate by more than ten percentage points when inflation reached double digits, and began cutting only once inflation had fallen back towards its target.' },
    misconception: 'Students write that the government raises interest rates. In most economies the central bank does, independently, to meet an inflation target; the government sets the target and the fiscal stance.',
    examMatters: 'Identify the cause of the inflation in the extract first. Higher interest rates suit demand-pull; for cost-push from imported energy, weigh the loss of output against the fall in inflation.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each anti-inflation measure to the channel it works through:',
      pairs: [
        { left: 'The central bank raises its lending rate', right: 'Dearer loans cut consumer and business borrowing', why: 'Higher interest rates reduce spending that is financed by credit.' },
        { left: 'The currency is allowed to rise', right: 'Imported fuel and food cost less at home', why: 'A stronger currency lowers the home price of imports.' },
        { left: 'A cap is placed on the price of cooking gas', right: 'The price is held down by law', why: 'A direct control sets the price rather than changing demand or supply.' },
        { left: 'Income tax rises and public spending is trimmed', right: 'Households and the state spend less', why: 'Fiscal tightening reduces aggregate demand.' },
      ],
    }),
  };
})();

const externalShocks = (() => {
  const sid = subId('responding-to-external-shocks');
  return {
    id: sid,
    title: 'Using Policy to Respond to External Shocks in the Global Economy',
    keyIdea: 'An external shock starts outside the economy. Governments cushion demand shocks with fiscal and monetary stimulus and may use the exchange rate or controls on capital.',
    body: [
      { type: 'paragraph', text: 'An **external shock** is an event outside a country\'s control that changes its economy: a global recession, a jump in world oil or food prices, a pandemic, a financial crisis abroad, or a sudden flight of foreign capital. Open, trade-dependent economies are the most exposed.' },
      { type: 'bullets', items: [
        '**A fall in world demand** — exports fall, so fiscal and monetary stimulus can replace lost demand; letting the currency fall makes exports cheaper.',
        '**A rise in import prices** — a supply shock: costs rise and SRAS shifts left, so there is higher inflation AND lower output at once. Policy must choose which to fight; targeted subsidies or tax cuts on fuel can soften the blow to the poorest.',
        '**A sudden outflow of capital** — the currency plunges and interest rates spike. The central bank may sell reserves to support the currency, raise interest rates, or impose temporary controls on money leaving the country.',
      ] },
      { type: 'paragraph', text: 'Countries that built fiscal space and foreign-currency reserves in good years can respond more strongly. A country already carrying a large deficit and debt may be forced to tighten policy just when the shock hits.' },
    ],
    realExample: { emoji: '🧱', text: 'Malaysia imposed temporary controls on capital leaving the country during the Asian financial crisis, a move widely criticised at the time; Iceland did the same after its banks collapsed.' },
    misconception: 'Students treat every external shock as a fall in demand. A rise in world oil prices is a supply shock: it raises inflation and cuts output together, so stimulating demand makes inflation worse.',
    examMatters: 'Classify the shock as demand-side or supply-side before recommending a response. The same stimulus that suits a global recession would add to inflation after an oil price jump.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each external shock by where it hits first: aggregate demand or aggregate supply:',
      groups: [
        { name: 'Hits aggregate demand', items: ['A recession in the main export market halves orders for garments', 'Tourists stay away after a pandemic abroad', 'Remittances from workers in the Gulf fall sharply'], why: 'Each reduces spending on the country\'s output or the incomes spent at home.' },
        { name: 'Hits aggregate supply', items: ['World crude oil prices double', 'A drought abroad sends imported wheat prices soaring', 'A war closes a key shipping route and raises freight costs'], why: 'Each raises firms\' costs of production, shifting SRAS to the left.' },
      ],
    }),
  };
})();

const povertyInequality = (() => {
  const sid = subId('reducing-poverty-and-inequality');
  return {
    id: sid,
    title: 'Using Policy to Reduce Poverty and Inequality',
    keyIdea: 'Poverty and inequality are tackled with progressive taxes, transfers, spending on education and health, and policies that create jobs, each with its own trade-offs.',
    body: [
      { type: 'paragraph', text: 'To **reduce poverty and inequality**, fiscal policy does most of the work, with supply-side policy acting over the long run. How poverty and inequality are measured is topic 4.3.4.' },
      { type: 'bullets', items: [
        '**Progressive taxes** take a larger share from higher incomes, narrowing the gap after tax.',
        '**Transfer payments** — pensions, unemployment support, child grants and cash transfers to poor households — raise the incomes of the poorest directly.',
        '**Spending on education, health and infrastructure** in poor regions raises the human capital and future earning power of the poor, a supply-side effect that works over years.',
        '**Monetary policy** — keeping inflation low protects the poor, who hold cash and have little bargaining power over wages.',
        '**Direct controls** — caps on the prices of staple foods or energy lower the cost of living for the poor, but can cause shortages.',
      ] },
      { type: 'paragraph', text: 'Each has a trade-off. High taxes may weaken incentives; generous benefits withdrawn as income rises can discourage work; transfers must be targeted, or much of the money reaches people who are not poor. Growth that creates jobs is usually the largest single cause of falling poverty.' },
    ],
    realExample: { emoji: '🇧🇷', text: 'Brazil\'s Bolsa Família pays poor families a monthly transfer on condition that their children attend school and have health check-ups, combining a transfer today with human capital for the future.' },
    misconception: 'Students write that taxing the rich reduces poverty. It narrows inequality, but poverty falls only if the revenue reaches the poor, through transfers or services, or if growth creates jobs for them.',
    examMatters: 'Keep poverty and inequality apart. A policy can reduce poverty while inequality rises, if everyone gains but the rich gain more; say which of the two the question asks about.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each anti-poverty measure by the policy tool it uses: fiscal policy or supply-side policy:',
      groups: [
        { name: 'Fiscal policy', items: ['A monthly cash grant to every child in a low-income family', 'A higher income tax rate on top earners', 'A pension for older people with no other income'], why: 'Each changes taxes or transfers, moving income now.' },
        { name: 'Supply-side policy', items: ['Free vocational training for young people in poor districts', 'New rural roads that let farmers reach city markets', 'Scholarships for girls to finish secondary school'], why: 'Each raises the future earning power or productivity of the poor.' },
      ],
    }),
  };
})();

const financialCrisis = (() => {
  const sid = subId('global-financial-crisis-2008');
  return {
    id: sid,
    title: 'Demand-Side Policies and the Global Financial Crisis of 2008',
    keyIdea: 'In the global financial crisis of 2008, governments and central banks used demand-side policy on a huge scale: fiscal stimulus, near-zero interest rates and money creation.',
    body: [
      { type: 'paragraph', text: 'The **global financial crisis of 2008** began with losses on US housing loans that spread through banks worldwide. Banks stopped lending to each other and to firms, asset prices collapsed, and world trade and output fell sharply. Aggregate demand fell in almost every economy at once, so governments turned to **demand-side policies** in response.' },
      { type: 'bullets', items: [
        '**Fiscal policy** — stimulus packages of extra public spending and tax cuts, on top of automatic stabilisers. The US passed a large recovery act; China launched one of the largest programmes of all, mostly spending on railways, roads and housing.',
        '**Monetary policy** — central banks cut interest rates close to zero and bought government bonds to increase the money supply, known as quantitative easing, an instrument explained in topic 2.3.6. Some, including the European Central Bank, later set rates below zero.',
        '**Coordination** — the G20 economies acted together, so that one country\'s stimulus was not simply lost to imports.',
      ] },
      { type: 'paragraph', text: 'The policies are widely credited with preventing a repeat of the Great Depression. Their costs followed: national debts rose sharply, several euro-area governments later faced debt crises and cuts, and years of very low rates raised asset prices, which widened wealth inequality.' },
    ],
    realExample: { emoji: '🏦', text: 'China\'s stimulus, largely delivered through local governments and state banks, kept its growth high while exports collapsed, but left a legacy of local government debt that it is still managing.' },
    misconception: 'Students describe the response as monetary policy alone. Fiscal stimulus was used on a large scale as well, and deficits also widened automatically as tax receipts fell.',
    examMatters: 'The specification names the 2008 crisis explicitly, so be ready to apply it: name one fiscal and one monetary response, explain how each supported aggregate demand, and weigh the later cost in debt.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the events of 2008 and the response in chronological order, from the first losses to the later cost:',
      correctOrder: [
        'Losses on American mortgage loans spread through banks across the world',
        'Banks stop lending, and spending and world trade collapse',
        'Governments pass stimulus packages and central banks cut rates towards zero',
        'Output stabilises, but national debts are left far higher',
      ],
      criterion: 'chronological: from the first losses to the later cost',
      why: [
        'The crisis began with losses on housing loans in the US.',
        'Damaged banks cut lending, which cut spending and trade.',
        'Policy responded to the collapse in demand.',
        'Stimulus supported output but was paid for with borrowing.',
      ],
    }),
  };
})();

/* ══ Block 7 — TNCs and the Limits of Policy (4.3.5 · 4c, 4d, 4e) ══════════════ */

const taxAvoidance = (() => {
  const sid = subId('controlling-tncs-tax-avoidance');
  return {
    id: sid,
    title: 'Measures to Control TNCs: Reducing Tax Avoidance',
    keyIdea: 'TNCs can legally cut their tax bills by booking profits where taxes are lowest; governments respond with minimum taxes, reporting rules and closing loopholes.',
    body: [
      { type: 'paragraph', text: '**Tax avoidance** is legally arranging affairs to pay less tax. It differs from tax evasion, which is illegal non-payment. A **transnational corporation (TNC)** has subsidiaries in many countries, so it can arrange for its profits to be recorded in countries with low tax rates, even if the sales and production happen elsewhere. Common routes are charging royalties for brands and patents held in low-tax countries, lending between subsidiaries so that interest payments move profit, and transfer pricing.' },
      { type: 'paragraph', text: 'Governments have responded with several **measures to reduce tax avoidance**:' },
      { type: 'bullets', items: [
        '**A global minimum tax** — around 140 countries agreed through the OECD that the largest TNCs should pay at least 15% on their profits in each country, reducing the gain from booking profits in tax havens.',
        '**Country-by-country reporting** — TNCs must tell tax authorities how much profit, tax and employment they have in each country.',
        '**Closing loopholes** — limits on interest deductions, and taxes on digital services where users are located.',
      ] },
      { type: 'paragraph', text: 'Tax avoidance matters most to developing economies, which rely more on corporation tax than rich ones and lose a larger share of their revenue to it.' },
    ],
    realExample: { emoji: '🌐', text: 'Ireland raised its rate for the largest multinationals to 15% to comply with the OECD minimum, while keeping its long-standing lower rate for smaller firms.' },
    misconception: 'Students call TNC tax avoidance illegal. Most of it is legal, which is why the response is new rules and international agreements rather than prosecution.',
    examMatters: 'Distinguish avoidance (legal) from evasion (illegal) in one sentence, then name a measure and the route it closes. The evaluation is always whether enough countries join it.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each measure against tax avoidance to the route it is designed to close:',
      pairs: [
        { left: 'A floor of 15% on large firms\' profits in every country', right: 'Booking profits in a territory that charges almost nothing', why: 'A minimum rate removes most of the gain from a zero-tax location.' },
        { left: 'Publishing profits, tax and staff numbers country by country', right: 'Large profits recorded where a firm has hardly any workers', why: 'The mismatch between profits and real activity becomes visible to tax authorities.' },
        { left: 'A cap on interest a subsidiary may deduct from its taxable profit', right: 'Loans between branches of one firm that shift profit abroad', why: 'Limiting deductions stops internal interest payments from draining the tax base.' },
      ],
      distractors: ['A rise in the rate of VAT on food'],
    }),
  };
})();

const transferPricing = (() => {
  const sid = subId('regulation-of-transfer-pricing');
  return {
    id: sid,
    title: 'Measures to Control TNCs: Regulating Transfer Pricing',
    keyIdea: 'A transfer price is what one part of a TNC charges another. Set artificially, it moves profit to low-tax countries; regulators insist it match an arm\'s-length market price.',
    body: [
      { type: 'paragraph', text: 'A **transfer price** is the price one subsidiary of a TNC charges another subsidiary of the same TNC for goods, services, loans or the use of a brand. Because both sides belong to the same firm, it can set the price wherever it likes. Setting it so that profit is recorded in a low-tax country is **transfer pricing** used for tax avoidance.' },
      { type: 'paragraph', text: `A TNC mines copper in Country H, where profit is taxed at ${pct(E.taxH)}, at a cost of ${mnd(E.tpCost)}, and sells it through its own trading arm in Country L, taxed at ${pct(E.taxL)}, which sells it on for ${mnd(E.tpWorld)}. If the trading arm pays the market price, the whole profit is in H and tax is ${mnd(E.taxArms)}. If the TNC sets a transfer price of ${mnd(E.rigged)}, most of the profit appears in L and total tax falls to ${mnd(E.taxRigged)}; Country H loses ${mnd(E.taxLostH)}.` },
      { type: 'paragraph', text: '**The regulation of transfer pricing** rests on the **arm\'s-length principle**: the price between two parts of a TNC must be the price two independent firms would agree. Tax authorities can compare transfer prices with world market prices, demand documentation, agree prices in advance with a firm, and reassess tax where the price was not at arm\'s length. For commodities with a quoted world price, this is easier than for brands and patents, which have no market price.' },
    ],
    realExample: { emoji: '⛏️', text: 'Zambia\'s tax authority has challenged mining companies over copper sold to related trading companies abroad at prices below those on world markets, and has raised tax assessments as a result.' },
    misconception: 'Students treat any trade between subsidiaries as tax avoidance. Firms must trade internally; the problem is a transfer price set away from the market price to move profit.',
    examMatters: 'Work a transfer-pricing example in figures when the data allow: profit and tax in each country at the market price and at the transfer price. It shows exactly what the regulation protects.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each price charged between two parts of the same TNC by how a tax authority applying the arm\'s-length principle would treat it:',
      groups: [
        { name: 'Accepted: at arm\'s length', items: ['A mine invoices its sister sales company for copper at the day\'s quoted metal price', 'A loan between two subsidiaries at the interest rate a bank would charge', 'Engine parts sold to a sister plant at the price charged to outside buyers'], why: 'Each price is what two independent firms would agree, so profit is recorded where the work is done.' },
        { name: 'Challenged: not at arm\'s length', items: ['Ore sold to its own trading arm at half the world price', 'A management fee charged to the mine at three times what an outside consultant charges', 'A loan from a low-tax subsidiary at triple the market interest rate'], why: 'Each price is set away from the market price, which can shift profit to where tax is low.' },
      ],
    }),
  };
})();

const limitsTncs = (() => {
  const sid = subId('limits-to-controlling-tncs');
  return {
    id: sid,
    title: 'Limits to Government Ability to Control TNCs',
    keyIdea: 'TNCs are mobile, powerful and well advised, so one government acting alone can do only so much: they can move, lobby or out-resource a tax authority.',
    body: [
      { type: 'paragraph', text: 'The specification also asks for the **limits to government ability to control TNCs**. The main ones:' },
      { type: 'bullets', items: [
        '**Mobility** — a TNC can move production, profits or headquarters to another country. A government that taxes or regulates harshly may lose the investment and jobs altogether, so governments compete to attract TNCs rather than control them.',
        '**Information** — the TNC knows its own costs and internal prices; the tax authority must reconstruct them. Brands, patents and services have no market price to check against.',
        '**Resources** — the largest TNCs have revenues larger than the GDP of many countries, and can employ more accountants and lawyers than a developing country\'s entire tax authority.',
        '**Jurisdiction** — a government can tax and regulate only within its own borders. Without international agreement, profit moved abroad is out of reach.',
        '**Political influence** — TNCs lobby governments and can threaten to withdraw.',
      ] },
      { type: 'paragraph', text: 'International cooperation, such as the OECD minimum tax and information sharing between tax authorities, eases some of these limits. It depends on enough countries joining, and on low-tax countries accepting it.' },
    ],
    realExample: { emoji: '🏛️', text: 'Several African tax authorities have sought outside support to audit multinational mining companies, whose accounts and internal pricing are more complex than their own staff can check alone.' },
    misconception: 'Students write that governments cannot control TNCs at all. They can and do, through tax rules, regulation and agreements; the limits are about how far one country can go alone.',
    examMatters: 'An Evaluate (20 marks, Appendix 6) on controlling TNCs needs the measures and their limits weighed, not listed. The strongest judgement explains why international cooperation changes the answer.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each point by which limit on controlling TNCs it shows: mobility or information:',
      groups: [
        { name: 'Mobility', items: ['A chip maker says it will build its next plant elsewhere if taxes rise', 'A bank shifts its regional headquarters after new rules are announced', 'A clothing firm moves its orders to factories in a neighbouring country'], why: 'Each shows the firm can move activity away from a government that acts against it.' },
        { name: 'Information', items: ['The tax office cannot tell what a licence to use a logo is really worth', 'Auditors must rely on the firm\'s own figures for its internal costs', 'No world price exists for software sold between two branches'], why: 'Each shows the government lacks the facts it needs to check what the firm reports.' },
      ],
    }),
  };
})();

const policyImpact = (() => {
  const sid = subId('impact-of-policy-changes');
  return {
    id: sid,
    title: 'The Impact of Policy Changes on Local, National and Global Economies',
    keyIdea: 'One policy change works at three levels: on particular towns and regions, on the national economy, and, for large economies, on the rest of the world.',
    body: [
      { type: 'paragraph', text: 'The specification asks for **the impact of policy changes** on local economies, national economies and the global economy. The same decision can look very different at each level.' },
      { type: 'bullets', items: [
        '**Local economies** — a policy can hit particular regions hardest. Removing a fuel subsidy raises transport costs most in rural areas far from markets; closing a state-owned plant devastates the town it employs; a new port transforms the coast it serves.',
        '**National economies** — the effect on aggregate demand, output, inflation, the fiscal deficit and the balance of payments.',
        '**The global economy** — policies in large economies spill across borders. When the US Federal Reserve raises interest rates, capital flows out of emerging economies, their currencies fall and their borrowing costs rise. A large economy\'s stimulus or recession changes its trading partners\' exports.',
      ] },
      { type: 'paragraph', text: 'The levels can pull in opposite directions: a policy that is good for the national budget may be painful for particular regions, and one that suits a large economy may export problems to smaller ones.' },
    ],
    realExample: { emoji: '⛽', text: 'When Nigeria removed its petrol subsidy, fares and food prices rose sharply in cities and rural areas alike, while the national budget saved money that had gone on the subsidy.' },
    misconception: 'Students assess a policy only at national level. An answer that also says which regions lose, and how other countries are affected, shows the fuller judgement the specification asks for.',
    examMatters: 'When a question says "the impact of policy changes", organise your answer by the three levels in the specification: local, national and global. Each is a place for a separate chain of reasoning.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each effect of a policy change by the level of economy it describes: local, national or global:',
      groups: [
        { name: 'Local', items: ['A fishing town loses its cannery when a state subsidy ends', 'Farm incomes in one province rise after a new highway opens'], why: 'Each falls on a particular town or region.' },
        { name: 'National', items: ['The country\'s inflation rate climbs by two points', 'The fiscal deficit narrows by 1% of GDP'], why: 'Each is a change in a whole-economy measure.' },
        { name: 'Global', items: ['Currencies across Asia weaken after US rates rise', 'Exporters in other countries win more orders after a large economy\'s stimulus'], why: 'Each crosses borders to affect other economies.' },
      ],
    }),
  };
})();

const informationUncertainty = (() => {
  const sid = subId('inaccurate-information-risks-uncertainties');
  return {
    id: sid,
    title: 'Problems for Policymakers: Inaccurate Information, Risks and Uncertainties',
    keyIdea: 'Policymakers act on data that are late and often revised, and on predictions of effects that are uncertain, so well-intended policy can be wrongly sized or wrongly timed.',
    body: [
      { type: 'paragraph', text: 'The specification names three **problems facing policymakers when applying policies**. The first two are about knowledge.' },
      { type: 'paragraph', text: '**Inaccurate information.** Economic data arrive late and are revised. The first estimate of GDP growth may be changed months later; unemployment and inflation are measured by surveys with errors; the informal economy is largely missing from official figures. A central bank may raise rates to cool an economy that the later, corrected data show was already slowing.' },
      { type: 'paragraph', text: '**Risks and uncertainties.** Even with good data, the effects of a policy are uncertain:' },
      { type: 'bullets', items: [
        '**Time lags** — a change in interest rates can take a year or more to affect inflation, so policy must act on forecasts.',
        '**Uncertain size of effects** — how much households spend from a tax cut depends on their confidence, which nobody can measure in advance.',
        '**Expectations** — if people expect a tax cut to be reversed, they may save it.',
        '**Unintended consequences** — a price cap can cause shortages; a tax rise can drive activity into the informal sector.',
      ] },
    ],
    realExample: { emoji: '📊', text: 'When Nigeria revised the way it measures GDP to include newer industries such as telecoms and film, the size of its economy was raised by almost 90% overnight, changing every ratio based on it.' },
    misconception: 'Students blame poor policy on bad intentions or weak governments. Even well-run central banks and treasuries act on data that turn out to be wrong and on effects they cannot measure in advance.',
    examMatters: 'In a 20-mark evaluation, the problems facing policymakers are the evaluation: say which data were uncertain, how long the lag might be, and what could make the effect larger or smaller than intended.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each problem by the specification\'s category: inaccurate information or risks and uncertainties:',
      groups: [
        { name: 'Inaccurate information', items: ['Last quarter\'s growth figure is revised from 3% to 1%', 'Half of all workers are in unregistered jobs the surveys miss', 'Price data for rural areas are collected only once a year'], why: 'Each is about the figures policymakers rely on being wrong, late or incomplete.' },
        { name: 'Risks and uncertainties', items: ['Nobody knows whether households will spend or save a tax rebate', 'A rate rise may not reach inflation for eighteen months', 'A price cap on rice may cause farmers to grow less of it'], why: 'Each is about how a policy will work, even when the data are sound.' },
      ],
    }),
  };
})();

const shocksBeyondControl = (() => {
  const sid = subId('inability-to-control-external-shocks');
  return {
    id: sid,
    title: 'Problems for Policymakers: Inability to Control External Shocks',
    keyIdea: 'A government cannot control world oil prices, foreign recessions, pandemics or wars, so a policy can be blown off course by events it had no way to prevent.',
    body: [
      { type: 'paragraph', text: 'The third problem is the **inability to control external shocks**. Policy is planned on assumptions about the world economy, and those assumptions can be overturned: world commodity prices swing, trading partners fall into recession, pandemics, wars and natural disasters strike, and investors withdraw capital from whole regions at once.' },
      { type: 'paragraph', text: 'A government can prepare, but it cannot prevent. It can build foreign-currency reserves, keep its debt low enough to borrow in a crisis, diversify its exports, and use automatic stabilisers. When the shock comes, though, it must respond to events it did not choose, and a policy designed for one situation, such as a plan to cut the deficit, may have to be abandoned.' },
      { type: 'paragraph', text: 'Small, open economies are the most exposed. An economy where exports are a large share of GDP, which imports most of its fuel and food, or which relies on one commodity or on tourism, feels a shock abroad as a large shock at home.' },
    ],
    realExample: { emoji: '🌍', text: 'When a war in Europe sent world wheat and fuel prices soaring, importers such as Egypt, Pakistan and Sri Lanka saw inflation jump and their foreign-currency reserves drain, whatever their own policies had been.' },
    misconception: 'Students treat a policy that failed after an external shock as a bad policy. It may have been sound on the information available; the shock is a reason for failure the government could not control.',
    examMatters: 'When an extract mentions events abroad, use them as evaluation: the policy\'s success depended on conditions the government could not control, and name one way it could have prepared.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Name what each government did to prepare for shocks it could not control:',
      template: [
        'It kept export earnings in the central bank as ___ to sell in a crisis.',
        'It kept its borrowing low so that it could run a larger ___ when a recession struck.',
        'It developed tourism and manufacturing so it no longer relied on one ___.',
      ],
      answers: ['reserves', 'fiscal deficit', 'commodity'],
      hints: ['assets a central bank can sell to support its currency', 'the gap between spending and revenue in a year', 'a single raw material sold abroad'],
      distractors: ['subsidy', 'surplus', 'transfer price'],
    }),
  };
})();

/* ══ The block plan ══════════════════════════════════════════════════════ */

const BLOCK_PLAN = [
  {
    title: B1,
    subs: [typesOfSpending, changingIncomes, changingAges, changingExpectations],
    takeaway: [
      'Capital buys lasting assets; current runs services; transfers move income.',
      'Rising incomes raise demand for publicly provided services.',
      'Ageing shifts spending to pensions and health; expectations keep rising.',
    ],
  },
  {
    title: B2,
    subs: [productivityGrowth, crowdingOut, spendingTaxLevels],
    takeaway: [
      'Spending on infrastructure and skills can raise productivity.',
      'Crowding out: state borrowing raises interest rates and cuts investment.',
      'A larger state needs higher taxes, sooner or later.',
    ],
  },
  {
    title: B3,
    subs: [directIndirect, taxStructures, incentivesToWork, lafferCurve, incomeDistribution],
    takeaway: [
      'Direct taxes fall on income and wealth; indirect taxes on spending.',
      'Judge a tax by the share of income it takes as income rises.',
      'Above the Laffer peak a cut raises revenue; below it, it loses revenue.',
    ],
  },
  {
    title: B4,
    subs: [outputEmployment, priceLevel, tradeBalance, fdiFlows],
    takeaway: [
      'Tax cuts raise AD, output and jobs where there is spare capacity.',
      'Indirect tax rises lift the price level once, through costs.',
      'Income tax cuts pull in imports; lower company tax draws FDI.',
    ],
  },
  {
    title: B5,
    subs: [deficitsSurpluses, deficitDebt, stabilisers, structuralCyclical, deficitFactors, interestServicing, intergenerational],
    takeaway: [
      'A deficit is a yearly flow; the national debt is the stock it adds to.',
      'Automatic stabilisers need no decision; the cyclical deficit fades.',
      'Debt matters through interest rates, servicing and future taxpayers.',
    ],
  },
  {
    title: B6,
    subs: [toolkit, reducingDeficits, controllingInflation, externalShocks, povertyInequality, financialCrisis],
    takeaway: [
      'Five tools: fiscal, monetary, exchange-rate, supply-side, direct controls.',
      'Each aim needs a mix of tools, and each tool has side effects.',
      'In the 2008 crisis, fiscal stimulus and near-zero rates propped up demand.',
    ],
  },
  {
    title: B7,
    subs: [taxAvoidance, transferPricing, limitsTncs, policyImpact, informationUncertainty, shocksBeyondControl],
    takeaway: [
      'TNC tax avoidance is fought with minimum taxes and reporting rules.',
      'Transfer prices must match an arm\'s-length market price.',
      'Bad data, uncertain effects and shocks limit every policy.',
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

/*
 * THE LEAF MAP, BY HAND. 38 leaves at `econ_spec.txt:1824-1893`, each named against the subsection
 * that teaches it. The nine `requirement` rows group bullets and are not leaves; the runner re-reads
 * the oracle and asserts both counts.
 */
export const LEAF_MAP = {
  'ECON-4.3.5-1a': ['types-of-public-expenditure'],
  'ECON-4.3.5-1b-1': ['changing-incomes'],
  'ECON-4.3.5-1b-2': ['changing-age-distributions'],
  'ECON-4.3.5-1b-3': ['changing-expectations'],
  'ECON-4.3.5-1c-1': ['spending-productivity-growth'],
  'ECON-4.3.5-1c-2': ['crowding-out'],
  'ECON-4.3.5-1c-3': ['spending-and-tax-levels'],
  'ECON-4.3.5-2a': ['direct-and-indirect-taxes'],
  'ECON-4.3.5-2b': ['progressive-proportional-regressive'],
  'ECON-4.3.5-2c-1': ['incentives-to-work'],
  'ECON-4.3.5-2c-2': ['laffer-curve'],
  'ECON-4.3.5-2c-3': ['tax-income-distribution'],
  'ECON-4.3.5-2c-4': ['tax-output-employment'],
  'ECON-4.3.5-2c-5': ['tax-price-level'],
  'ECON-4.3.5-2c-6': ['tax-trade-balance'],
  'ECON-4.3.5-2c-7': ['tax-fdi-flows'],
  'ECON-4.3.5-3a-1': ['fiscal-deficits-and-surpluses'],
  'ECON-4.3.5-3a-2': ['automatic-stabilisers-and-discretionary-policy'],
  'ECON-4.3.5-3a-3': ['fiscal-deficit-and-national-debt'],
  'ECON-4.3.5-3a-4': ['structural-and-cyclical-deficits'],
  'ECON-4.3.5-3b': ['factors-influencing-deficits-and-debt'],
  'ECON-4.3.5-3c-1': ['interest-rates-and-debt-servicing'],
  'ECON-4.3.5-3c-2': ['interest-rates-and-debt-servicing'],
  'ECON-4.3.5-3c-3': ['intergenerational-equity'],
  'ECON-4.3.5-4a-1': ['reducing-fiscal-deficits-and-debt'],
  'ECON-4.3.5-4a-2': ['controlling-inflation'],
  'ECON-4.3.5-4a-3': ['responding-to-external-shocks'],
  'ECON-4.3.5-4a-4': ['reducing-poverty-and-inequality'],
  'ECON-4.3.5-4b': ['global-financial-crisis-2008'],
  'ECON-4.3.5-4c-1': ['controlling-tncs-tax-avoidance'],
  'ECON-4.3.5-4c-2': ['regulation-of-transfer-pricing'],
  'ECON-4.3.5-4c-3': ['limits-to-controlling-tncs'],
  'ECON-4.3.5-4d-1': ['impact-of-policy-changes'],
  'ECON-4.3.5-4d-2': ['impact-of-policy-changes'],
  'ECON-4.3.5-4d-3': ['impact-of-policy-changes'],
  'ECON-4.3.5-4e-1': ['inaccurate-information-risks-uncertainties'],
  'ECON-4.3.5-4e-2': ['inaccurate-information-risks-uncertainties'],
  'ECON-4.3.5-4e-3': ['inability-to-control-external-shocks'],
};

/* ══ Notes ═══════════════════════════════════════════════════════════════ */
/*
 * ONE NOTES TOPIC PER CHAPTER, SAME TITLES, SAME ORDER — structure-08's "notes mirror the off-spec
 * content" cannot recur, and `depth.notes-titles` cannot fire. Notes ship from the `data` column,
 * so a `?draft=1` walk shows these only after publication (DECISIONS, 16 September).
 */

const def = (html) => ({ type: 'definition', text: html });
const mech = (html) => ({ type: 'mechanism', text: html });
const link = (html) => ({ type: 'link', text: html });

export const NOTES = [
  {
    title: B1,
    meta: '4.3.5 · 1a, 1b',
    keyIdea: 'The three kinds of public expenditure, and the three reasons the specification gives for its changing size and pattern across countries.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Capital expenditure</strong> — public spending on assets that last: roads, schools, hospitals, ports.'),
        def('<strong>Current expenditure</strong> — public spending on goods and services used up within the year: salaries, medicines, running costs.'),
        def('<strong>Transfer payments</strong> — payments to individuals with no good or service received in return: pensions, benefits, grants.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`${E.country}: capital ${bn(E.capital)} + current ${bn(E.current)} + transfers ${bn(E.transfer)} = ${bn(E.spending)}, ${pct(E.spendingShare)} of GDP.`),
        mech('Changing incomes: richer economies demand more health and education, much of it publicly provided.'),
        mech('Changing age distributions: ageing raises pensions and health; a young population needs schools. Changing expectations: citizens come to expect more and better services.'),
      ] },
    ],
    takeaway: [
      'Transfers are public expenditure but not spending on output.',
      'Incomes, age distributions and expectations change the pattern.',
      'Ageing shifts spending rather than raising all of it.',
    ],
  },
  {
    title: B2,
    meta: '4.3.5 · 1c',
    keyIdea: 'Why the share of GDP spent by the state matters: for productivity and growth, for crowding out, and for the levels of taxation needed to pay for it.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Crowding out</strong> — a fall in private spending caused by a rise in public spending, chiefly through higher interest rates on borrowing.'),
        def('<strong>Public expenditure as a proportion of GDP</strong> — public spending divided by GDP, the usual measure of the size of the state.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Borrow ${bn(E.stimulus)} → rates ${pct(E.rateBefore)} → ${pct(E.rateAfter)} → investment −${bn(E.investmentLost)} → net addition ${bn(E.netAddition)}.`),
        mech('Infrastructure, education and health raise output per worker; subsidies to failing firms rarely do.'),
        link('A larger state needs a larger tax share: see the effects of tax changes in 2c.'),
      ] },
    ],
    takeaway: [
      'What spending buys matters more than its share of GDP.',
      'Crowding out is largest near full capacity with high rates.',
      'Borrowing postpones taxation; it does not replace it.',
    ],
  },
  {
    title: B3,
    meta: '4.3.5 · 2a, 2b, 2c (incentives, Laffer, distribution)',
    keyIdea: 'Direct and indirect taxes, the three tax structures, and how changes in tax rates affect incentives to work, tax revenue and the distribution of income.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Direct tax</strong> — on income or wealth (income tax, corporation tax). <strong>Indirect tax</strong> — on spending (VAT or GST, excise duties).'),
        def('<strong>Progressive / proportional / regressive</strong> — the share of income taken rises / stays the same / falls as income rises.'),
        def('<strong>Laffer curve</strong> — tax revenue against the tax rate: rising to a peak, then falling as the tax base shrinks.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`${E.country}'s income tax: average rates ${pct(E.progAvg[0])}, ${pct(E.progAvg[1])}, ${pct(E.progAvg[2])} at incomes of ${money(E.incomes[0])}, ${money(E.incomes[1])}, ${money(E.incomes[2])}.`),
        mech(`A ${pct(E.salesRate)} sales tax takes ${pct(E.salesAvg[0])}, ${pct(E.salesAvg[1])} and ${pct(E.salesAvg[2])} of the same incomes: regressive.`),
        mech(`Marginal rate ${pct(E.mrBefore)} → ${pct(E.mrAfter)}: an extra ${money(E.extraEarned)} earns ${money(E.keptAfter)} instead of ${money(E.keptBefore)}.`),
      ] },
    ],
    takeaway: [
      'Judge a tax structure by the share of income, not the dollars.',
      'Nobody knows where the Laffer peak lies.',
      'Progressive taxes narrow the income gap; sales taxes widen it.',
    ],
  },
  {
    title: B4,
    meta: '4.3.5 · 2c (output and employment, price level, trade balance, FDI)',
    keyIdea: 'How changes in direct and indirect tax rates affect real output and employment, the price level, the trade balance and flows of foreign direct investment.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Marginal propensity to import</strong> — the share of an extra dollar of income spent on imports.'),
        def('<strong>FDI</strong> — investment by a firm in productive assets it controls in another country.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Income tax cut → disposable income up → consumption up → AD right → output and jobs up (with spare capacity).'),
        mech('Indirect tax rise → costs up → SRAS left → price level up, output down.'),
        mech(`Tax cut ${bn(E.taxCut)} × MPM ${E.mpm} = imports up ${bn(E.importsUp)}. Corporation tax ${pct(E.corpBefore)} → ${pct(E.corpAfter)}: return ${pct(E.fdiReturnBefore)} → ${pct(E.fdiReturnAfter)}.`),
      ] },
    ],
    takeaway: [
      'Spare capacity decides whether a tax cut raises output or prices.',
      'Draw an indirect tax rise as an SRAS shift, not an AD shift.',
      'Tax is one factor in FDI location among many.',
    ],
  },
  {
    title: B5,
    meta: '4.3.5 · 3a, 3b, 3c',
    keyIdea: 'Deficits and surpluses, deficits and the debt, automatic and discretionary policy, structural and cyclical deficits, what drives them and why their size matters.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Fiscal deficit / surplus</strong> — public spending above / below revenue in one year.'),
        def('<strong>National debt</strong> — the stock of government borrowing still owed: past deficits minus surpluses.'),
        def('<strong>Automatic stabilisers</strong> — tax and benefit changes that happen without a decision. <strong>Discretionary policy</strong> — deliberate changes.'),
        def('<strong>Cyclical deficit</strong> — the part caused by the cycle. <strong>Structural deficit</strong> — the part left at full capacity.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Debt ${bn(E.debt)} + deficit ${bn(E.deficit)} = ${bn(E.debtNext)}; a surplus of ${bn(E.surplus)} → ${bn(E.debtAfterSurplus)}.`),
        mech(`Recession: tax −${bn(E.recessionRevenueFall)}, benefits +${bn(E.recessionTransferRise)} → deficit ${bn(E.recessionDeficit)} = structural ${bn(E.structural)} + cyclical ${bn(E.cyclical)}.`),
        mech(`Debt interest ${bn(E.debt)} × ${pct(E.rate)} = ${bn(E.interest)}, ${pct(E.interestOfRevenue)} of revenue.`),
      ] },
    ],
    takeaway: [
      'Only a surplus reduces the debt in dollars.',
      'Cyclical deficits fade with recovery; structural ones need a decision.',
      'Borrowing for lasting assets is fairer to future taxpayers.',
    ],
  },
  {
    title: B6,
    meta: '4.3.5 · 4a, 4b',
    keyIdea: 'How the five policy tools are used to reduce deficits and debt, control inflation, respond to external shocks and reduce poverty and inequality, and the response to the 2008 crisis.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Exchange-rate policy</strong> — influencing the currency\'s value through interest rates or reserves.'),
        def('<strong>Direct controls</strong> — rules that set prices, wages, trade or capital flows directly.'),
        def('<strong>External shock</strong> — an event outside the economy that changes it: a global recession, a price jump, a pandemic.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Deficits: tax up / spending down, helped by low rates and growth; risk: output falls and revenue with it.'),
        mech('Inflation: higher rates, fiscal tightening, a stronger currency, controls; match the tool to the cause.'),
        link('Fiscal and monetary instruments are topic 2.3.6; exchange rate systems are 4.3.3; poverty measures are 4.3.4.'),
      ] },
    ],
    takeaway: [
      'Name the tool and its channel before its effect.',
      'A supply shock cannot be fixed by demand stimulus alone.',
      'The response to the 2008 crisis worked but left national debts much higher.',
    ],
  },
  {
    title: B7,
    meta: '4.3.5 · 4c, 4d, 4e',
    keyIdea: 'Measures to control TNCs and their limits, the impact of policy at local, national and global level, and the problems policymakers face.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Tax avoidance</strong> — legally arranging affairs to pay less tax. <strong>Tax evasion</strong> — illegal non-payment.'),
        def('<strong>Transfer price</strong> — the price one part of a TNC charges another; regulated by the arm\'s-length principle.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Copper at cost ${mnd(E.tpCost)}, sold at ${mnd(E.tpWorld)}: tax ${mnd(E.taxArms)} at arm's length, ${mnd(E.taxRigged)} at a transfer price of ${mnd(E.rigged)}.`),
        mech('Limits: mobility, information, resources, jurisdiction, lobbying.'),
        mech('Problems: inaccurate information, risks and uncertainties, inability to control external shocks.'),
      ] },
    ],
    takeaway: [
      'International agreement is what makes TNC controls bite.',
      'Judge a policy at local, national and global level.',
      'Policy acts on revised data and uncertain effects.',
    ],
  },
];
