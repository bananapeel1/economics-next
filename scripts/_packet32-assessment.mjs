/**
 * PACKET 32 — aggregate-demand: 25 quiz items, 8 practice items, flashcards, mistakes and extras.
 *
 * ════ THE QUIZ ════
 *
 * `structure-02`: the live `quizIndices` are the identity mapping `[0],[1],[2],[3],[4]`, so the
 * Shifts chapter shows a multiplier calculation before the multiplier is taught and only 5 of 25
 * items are ever used inline. `structure-04`: the pre-test draws three at random from a bank that
 * includes circular-flow and paradox-of-thrift items this section never teaches, plus `quiz-02`'s
 * UK-institution item. Both are answered structurally rather than by correction: every item below
 * carries its own `block` tag, the runner DERIVES the pins from those tags, and the three items with
 * no tag are the pre-test pool and are FIRST in the array because `PreTest.jsx` slices the unreserved
 * pool at three and a free student is served only `PREVIEW_LIMITS.quiz` items.
 *
 * `quiz-01` and `accuracy-04` are the same defect: the body defined MPC as spending on domestic goods
 * and called 1/(1−MPC) equivalent to 1/MPW, and then Q21 marked 1/(1−MPC) wrong. Both close by
 * removal — the multiplier is 2.3.4 · 4 — so there is no item here about it.
 *
 * NO EXPLANATION NAMES AN OPTION BY ITS POSITION (packet 26): items are authored key-first and
 * `placeKeys` deals the key into a slot, so "the second option" describes whatever lands there.
 *
 * ════ THE PRACTICE ════
 *
 * `practice-01` and `topFix-05` between them describe the live set correctly and prescribe the wrong
 * replacement. The live five carry Define (4), Explain (6), Analyse (10) and **Outline (4)** — four
 * tariffs that do not exist in `audit/raw/tariff-census.json` — and `topFix-05` asks for "Explain
 * (4/6), Analyse (8), Assess (10/12)", of which Analyse is 6, Assess is not an Economics command word
 * at all, and 10 and 12 are not Economics tariffs. The census, built from `econ_spec.txt:2704-2747`,
 * is Define 2, Calculate 2/4, Draw 4, Explain 4, Analyse 6, Examine 8, Discuss 14, Evaluate 20.
 * Eight command words, one item each, and the runner refuses any tariff not in the census.
 *
 * `practice-01` is right that the live Analyse awards four of its marks for the Marshall-Lerner
 * condition and the J-curve. `econ_spec.txt:1740` puts both in 4.3.x, Unit 4. Neither appears here.
 *
 * GUIDANCE IS TWO PARAGRAPHS AND THE FIRST ALLOCATES NOTHING. `InlinePractice.jsx:142-158` prints
 * `guidance.split('\n')[0]` above the answer box in GUIDED mode and hides the rest, so a one-paragraph
 * mark scheme is printed above the empty box asking the student to write it. Above six marks there
 * are no point allocations at all.
 */
import { id, hash8, bn, money, pct, qty, AD, CONSUMPTION, INVESTMENT, INVESTMENT_POLICY, GOVERNMENT, NET_TRADE } from './_packet32-util.mjs';
import { B1, B2, B3, B4, B5 } from './_packet32-content.mjs';

/*
 * EVERY ITEM IS AUTHORED WITH ITS KEY NAMED BY INDEX, moved to the front, and then DEALT into a
 * position by a hash of its own stem (packets 26-30). Hand-picking positions produces exactly the
 * lumpy distribution `quiz.histogram` looks for; ranking items by a hash of their own question and
 * taking the rank modulo four gives an even spread that is stable across builds and that nobody
 * chose. It is also why no explanation may name an option by its position.
 */
const q = (block, question, options, correctIndex, explanation, lead = false) => ({
  id: id('quiz', question), block, question,
  options: [options[correctIndex], ...options.filter((_, i) => i !== correctIndex)],
  explanation, lead,
});

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
  /* ── the three pre-test items: no block tag, and FIRST in the array ────── */
  q(null, 'Aggregate demand is best described as:',
    ['the total output an economy is able to produce with its current resources', 'total planned spending on a country’s output at each price level', 'the total amount of money held by households and firms', 'the total value of goods sold in an economy last year'],
    1, 'AD is planned spending, measured at each price level and over a period. What an economy can produce is aggregate supply; a total of money held is a stock rather than a flow; and what was actually sold is an outcome, not a plan.'),
  q(null, 'In the identity AD = C + I + G + (X − M), imports are subtracted because:',
    ['imports reduce the money available to spend at home', 'imports are spending on another country’s output', 'imports are taxed and the tax is not part of demand', 'imports are counted again inside consumption'],
    1, 'AD measures demand for a country’s own output. Spending on imports is already inside C, I or G, and it buys output made elsewhere, so it is taken back out to leave demand for what this country produces.'),
  q(null, 'Which change causes a movement ALONG the aggregate demand curve rather than a shift?',
    ['a rise in the general price level', 'a cut in the rate of income tax', 'a fall in business confidence', 'a recession in a major trading partner'],
    0, 'The price level is on an axis of the diagram, so a change in it moves the economy to a different point on the same curve. A tax change, a confidence change and a foreign downturn all alter a component at every price level, which moves the curve itself.'),

  /* ── Block 1 ───────────────────────────────────────────────────────────── */
  q(B1, 'Which of the following is NOT part of aggregate demand as the specification defines it?',
    ['spending by firms on new machinery', 'spending by a government on the wages of its own staff', 'a household’s purchase of a good produced overseas', 'spending by foreign buyers on goods made in this country'],
    2, 'AD is demand for a country’s own output. Machinery is I, public-sector wages are G and foreign purchases of home output are X. A purchase of a good produced overseas adds to C and is then removed again as an import, so it contributes nothing on balance.'),
  q(B1, `An economy has C of ${bn(700)}, I of ${bn(150)}, G of ${bn(200)}, exports of ${bn(180)} and imports of ${bn(230)}. Aggregate demand is:`,
    [bn(1000), bn(1460), bn(1230), bn(1100)],
    0, `The fourth term is exports minus imports, which is ${bn(180)} − ${bn(230)} = ${bn(-50)}. Adding gives ${bn(700)} + ${bn(150)} + ${bn(200)} − ${bn(50)} = ${bn(1000)}. Adding the two trade figures instead of subtracting them gives a much larger and wrong total.`, true),
  q(B1, 'Which statement about the components of AD is correct?',
    ['investment is the largest component and the most volatile', 'consumption is the largest component and the most volatile', 'consumption is the largest component and the most stable', 'government expenditure is the largest component and the most stable'],
    2, 'Size and volatility are different properties and both have to be right. Consumption is much the largest component because households buy most of what an economy produces, and it is the steadiest because households smooth spending. Investment is the most volatile: capital spending can be postponed for a year and eating cannot.'),
  q(B1, 'The interest-rate effect behind the downward slope of the AD curve refers to:',
    ['a central bank cutting its policy rate to support demand', 'market rates falling because a lower price level reduces the demand for money', 'banks competing for savers by offering higher rates', 'governments borrowing more and pushing rates up'],
    1, 'It is a market mechanism set off by the price level, not a decision. Lower prices mean the same transactions need less money, so the demand for money falls and market rates fall with it. A central bank choosing a rate is a change at an unchanged price level, which shifts the curve instead.'),
  q(B1, 'A government announces a large increase in spending on infrastructure. On an AD diagram this is shown as:',
    ['a movement up along the existing AD curve', 'a movement down along the existing AD curve', 'a rightward shift of the AD curve', 'a steepening of the AD curve'],
    2, 'Government spending is a component, not an axis, so a change in it alters planned spending at every price level. That is a shift, and because the component has risen the new curve lies to the right of the old one.'),

  /* ── Block 2 ───────────────────────────────────────────────────────────── */
  q(B2, 'Disposable income is:',
    ['income before any tax has been deducted from it', 'income after direct taxes, including benefits received', 'income remaining after every household purchase has taken place', 'the part of income that is saved rather than being spent'],
    1, 'Disposable income is what a household actually has available to spend or save: earnings and other income, less direct taxes, plus transfers received. Income before tax is gross income, and what is left after spending is saving.'),
  q(B2, `Households owe ${bn(400)}. The interest rate rises from ${pct(4)} to ${pct(7)}. The extra annual interest bill is:`,
    [bn(12), bn(28), bn(16), bn(3)],
    0, `${pct(4)} of ${bn(400)} is ${bn(16)} and ${pct(7)} of ${bn(400)} is ${bn(28)}, so the bill rises by ${bn(12)}. The two individual bills are both plausible-looking figures, and the three percentage points on their own are not an amount of money at all.`),
  q(B2, 'Which of these is an example of the AVAILABILITY of credit changing rather than its price?',
    ['a bank raising the interest rate on personal loans', 'a bank increasing the minimum deposit it requires from buyers', 'a central bank raising its policy rate', 'a rise in the rate offered on savings accounts'],
    1, 'Availability is about whether a bank will lend and on what conditions; price is about what the borrowing costs. A larger required deposit removes borrowers without changing any rate, which is why the specification lists the two influences separately.'),
  q(B2, 'A rise in house prices increases consumption mainly because:',
    ['households earn more income from their houses', 'households feel wealthier and can borrow against the higher value', 'houses become cheaper for first-time buyers', 'construction firms take on more workers and pay out more in wages each month'],
    1, 'The wealth effect works on what households own rather than what they earn: nobody’s income rises, but owners save less of an unchanged income and can borrow on better terms. Higher prices make buying harder, not cheaper, and construction employment is a separate channel.'),
  q(B2, `An economy has disposable income of ${bn(600)} and consumption of ${bn(480)}. Its savings ratio is:`,
    [pct(20), pct(25), pct(80), pct(12)],
    0, `Saving is ${bn(600)} − ${bn(480)} = ${bn(120)}, and ${bn(120)} over ${bn(600)} is ${pct(20)}. Dividing saving by consumption instead of by income gives ${pct(25)}, and ${pct(80)} is the consumption share rather than the savings ratio.`, true),
  q(B2, 'Welfare payments raise consumption by more than an equal-sized tax cut for high earners because:',
    ['welfare payments are counted as government spending on goods', 'low-income households spend a larger share of what they receive', 'welfare payments are not taxed and tax cuts are', 'high earners are fewer in number'],
    1, 'Households with low incomes have unmet needs and little saving, so nearly all of an extra payment is spent; households with high incomes save much of a windfall. A transfer is not government spending on goods and services, so it is not part of G at all.'),

  /* ── Block 3 ───────────────────────────────────────────────────────────── */
  q(B3, `Gross investment in an economy is ${bn(140)} and depreciation is ${bn(160)}. It follows that:`,
    ['net investment is positive and the capital stock is growing', 'net investment is negative and the capital stock is shrinking', 'gross investment must have been recorded incorrectly', 'aggregate demand includes only the net figure'],
    1, `Net investment is ${bn(140)} − ${bn(160)} = ${bn(-20)}, so more capital wore out than was bought and the stock is smaller at the end of the year. The figure that enters AD is the gross one, because that is the spending that took place.`, true),
  q(B3, 'In economics, "investment" means:',
    ['buying shares and bonds in the hope of a return', 'placing money in an interest-bearing account', 'spending by firms on capital goods such as plant and equipment', 'any purchase made in the hope of reselling it later at a higher price'],
    2, 'Investment is spending that adds to the stock of capital used to produce. Buying a share transfers ownership of an asset that already exists and adds nothing to the capital stock, which is why financial purchases are not part of I.'),
  q(B3, `A project costs ${money(2000)} and is expected to earn ${money(160)} a year. It will go ahead if the interest rate is:`,
    [pct(9), pct(8), pct(7), pct(12)],
    2, `The expected rate of return is ${money(160)} over ${money(2000)}, which is ${pct(8)}. The project clears an interest rate below that figure and fails at or above it, so only the lowest of the four rates makes it worth doing.`),
  q(B3, 'A fall in business confidence reduces investment because it:',
    ['raises the interest rate firms must pay on new loans', 'lowers the expected return a project is judged against', 'increases the tax firms pay on their profits', 'reduces the amount of capital that wears out each year'],
    1, 'Every figure in a project appraisal is a forecast. A firm that lowers what it expects a machine to earn has lowered the rate of return it compares with the interest rate, so the project can fail a test it would have passed with no change in rates or taxes.'),
  q(B3, `A machine costs ${money(500)} and earns ${money(40)} a year. A subsidy of ${money(100)} raises its rate of return to:`,
    [pct(8), pct(10), pct(12.5), pct(6.7)],
    1, `The subsidy changes what the firm pays, not what the asset earns: ${money(500)} − ${money(100)} = ${money(400)}, and ${money(40)} over ${money(400)} is ${pct(10)}. Without the subsidy the return is ${pct(8)}, and a subsidy cannot alter the ${money(40)} the machine brings in.`),

  /* ── Block 4 ───────────────────────────────────────────────────────────── */
  q(B4, 'Which of these is part of government expenditure (G) in the AD identity?',
    ['unemployment benefit paid to households that are out of work', 'a state retirement pension', 'the salaries of teachers employed by the state', 'interest paid on government debt'],
    2, 'G counts government spending on goods and services. Employing a teacher buys a service and belongs in G. Benefits, pensions and debt interest are transfers: they hand money over without buying anything, and they enter demand only when the recipient spends them.', true),
  q(B4, 'Government spending rises during a downturn even when no new policy is announced because:',
    ['ministers always increase spending in difficult years', 'more households qualify for existing payments as employment falls', 'the government must spend more to keep interest rates down', 'prices are higher so the same services cost more'],
    1, 'The rules already exist, so the spending follows the economy without anybody deciding. As employment falls more households become eligible for payments and tax receipts fall at the same time, which is why this influence is the level of economic activity rather than fiscal policy.'),
  q(B4, `Government spending rises from ${bn(180)} to ${bn(210)} with every other component unchanged. Aggregate demand:`,
    [`rises by ${bn(30)} at every price level`, `rises by ${bn(30)} only at the current price level`, `falls by ${bn(30)} because taxes must rise`, 'is unchanged because G is a transfer'],
    0, `A component has risen by ${bn(30)}, so planned spending is higher at every price level and the whole curve moves right by that amount. A change confined to one price level would be a movement along the curve, which is caused only by the price level itself.`),

  /* ── Block 5 ───────────────────────────────────────────────────────────── */
  q(B5, 'A rise in real income in an economy, with everything else unchanged, will:',
    ['raise exports and leave imports unchanged', 'raise imports and leave exports unchanged', 'raise both exports and imports equally', 'leave the net trade balance unchanged'],
    1, 'Residents with more to spend buy more of everything, and part of that is produced abroad, so imports rise. Foreign buyers do not observe this economy’s income, so exports are untouched and the net trade balance falls.'),
  q(B5, 'The currency moves from 5 units per dollar to 4 units per dollar. This means:',
    ['the currency has depreciated and exports are cheaper abroad', 'the currency has appreciated and exports are dearer abroad', 'the currency has depreciated and imports are dearer at home', 'the currency is unchanged in value because the quote fell'],
    1, 'Fewer units for a dollar means each unit buys more, so the currency is worth more: one unit goes from $0.20 to $0.25. A home price therefore converts into a higher foreign price, which makes exports dearer abroad and imports cheaper at home.', true),
  q(B5, 'A country imposes tariffs on imports and its trading partners impose tariffs on its exports in response. The likely result is:',
    ['both X and M fall, and which is larger decides the balance', 'the balance improves, because imports certainly fall', 'imports rise, because home producers cannot meet the demand', 'exports rise, because home firms are now more competitive'],
    0, 'A tariff at home raises import prices and cuts M, which on its own improves the balance. A tariff abroad raises the price of this country’s exports to foreign buyers and cuts X. Both terms shrink, and which of the two falls further decides what happens to the difference — imports falling is only half of it.'),
]);

/* ══ Practice: eight command words, one item each ═════════════════════════ */

/*
 * `lead` NAMES THE ONE ITEM PER BLOCK THAT A CHECK-IN ACTUALLY SHOWS, and it exists because Verify A
 * rejected `topFix-01` over its absence. `resolvePinnedItem` (`components/learn-mode/utils.js:112`)
 * takes the FIRST unused index from a block's pin list and returns a single item, so a chapter with
 * three pinned practice items renders one and silently drops two — and the 20-mark Evaluate, which
 * `topFix-01` names explicitly, was one of the two. Eight command words over five chapters means
 * three items can only ever be reached from the Practice tab; which three is now a decision on the
 * page rather than a consequence of authoring order. The runner RUNS the resolver and asserts the
 * lead is what comes back.
 */
const p = (block, command, marks, question, guidance, lead = false) => ({ id: id('practice', question), block, command, marks, question, guidance, lead });

export const PRACTICE = [
  p(B1, 'Define', 2, 'Define the term ‘aggregate demand’. (2 marks)',
    `Two marks means two separate things to say, and the second must not be a rewording of the first. Settle first what KIND of quantity this is, because everything else follows from that choice.\nAggregate demand is the total planned spending on a country’s own output (1 mark), measured at each price level over a period of time (1 mark). An answer that says "the total demand in an economy" has restated the words of the term without giving either of them, and one that says "everything that is bought" describes an outcome rather than a plan.`),
  p(B1, 'Draw', 4, 'Draw an aggregate demand diagram to show the effect of a fall in consumer confidence. (4 marks)',
    `Decide before you draw whether confidence is on one of your axes. It is not, so this is a shift and not a movement, and the diagram has to show two curves rather than two points on one.\nAxes labelled price level and real output (1 mark); an original downward-sloping curve labelled AD₁ (1 mark); a second curve to the LEFT of it labelled AD₂ (1 mark); and the new, lower level of real output read off at an unchanged price level (1 mark). Naming the component that moved — consumption — beside the arrow costs you nothing and makes the diagram answer the question rather than illustrate the topic.`, true),
  p(B2, 'Calculate', 4, `An economy has disposable income of ${bn(900)} and a savings ratio of ${pct(18)}. Investment is ${bn(200)}, government expenditure is ${bn(250)}, exports are ${bn(300)} and imports are ${bn(360)}. Calculate aggregate demand. (4 marks)`,
    `This is three short steps rather than one long one, and each of them can be written on its own line. Work out what is saved, then what is left to be consumed, then put the identity together.\nSaving is ${pct(18)} of ${bn(900)} = ${bn(162)} (1 mark). Consumption is ${bn(900)} − ${bn(162)} = ${bn(738)} (1 mark). The net trade balance is ${bn(300)} − ${bn(360)} = ${bn(-60)} (1 mark). Aggregate demand is ${bn(738)} + ${bn(200)} + ${bn(250)} − ${bn(60)} = ${bn(1128)} (1 mark). Adding the trade figures rather than subtracting them is the error that costs the last two steps.`),
  p(B2, 'Explain', 4, 'Explain how a rise in interest rates is likely to affect consumption. (4 marks)',
    `Explain asks for a chain rather than a list, and the chain here has two links. Choose ONE of the two channels and follow it properly rather than naming both and developing neither.\nThe first link is the effect on households: a higher rate raises the interest paid on existing and new borrowing, and raises the reward for saving (1 mark), with development showing that this leaves less available to spend (1 mark). The second link takes it to the component: consumption falls (1 mark), so aggregate demand is lower at every price level and the curve shifts left (1 mark). An answer that stops at "borrowing is dearer" has given one link of two.`),
  p(B3, 'Analyse', 6, 'Analyse two factors that might cause a fall in investment in an economy. (6 marks)',
    `Two factors, and depth rather than breadth: each one needs to arrive at investment through a stated mechanism, not merely be named. Pick two that work differently from each other so the second chain is not the first one again.\nFor each factor, build the chain: identify it (1 mark), explain how it changes either the expected return or the cost of funds (1 mark), and take it to lower investment and therefore lower aggregate demand (1 mark). A rise in interest rates and a fall in business confidence make a good pair because one moves the rate the project is compared with and the other moves the return itself. Note that Appendix 6 says Analyse does not include evaluation, so a conclusion about which factor matters more is outside what this command word asks for.`, true),
  p(B4, 'Examine', 8, 'Examine the likely effects on aggregate demand of an increase in government expenditure on infrastructure. (8 marks)',
    `Examine wants a developed chain AND a brief assessment of it, so plan two parts before you write. The chain is the straightforward half; the assessment is where most answers are thin, and it does not have to be long.\nBuild the chain first: infrastructure is a purchase of goods and services rather than a transfer, so government expenditure itself rises — ${bn(AD.G)} to ${bn(AD.afterFiscal.G)}, which is ${pct(AD.changeIn(AD.afterFiscal))} added to AD — and this is fiscal policy, a deliberate budget decision rather than the automatic movement that the level of economic activity produces. A labelled diagram helps. Then assess it: whether the government can actually start projects quickly, whether political priorities would have directed the money elsewhere, whether it is funded by borrowing or by taxation that reduces household spending instead, and whether the same money spent on correcting a market failure would do more. A short, supported judgement about which of those matters most is what separates this from an Analyse.`, true),
  p(B5, 'Discuss', 14, 'Discuss the impact of a depreciation of a country’s currency on its aggregate demand. (14 marks)',
    `Discuss asks for more than one point of view and a critical look at what the evidence can actually show. Before you start, decide which components of the identity a currency movement touches, because it is more than one.\nThe main chain: a weaker currency makes exports cheaper to foreign buyers and imports dearer at home, so X tends to rise, M tends to fall and the net trade balance improves, shifting AD right. Develop it with the per-unit arithmetic rather than asserting it. Then bring in the other side: the size of the trade response depends on how much buyers actually switch, which the question gives you no way to measure, and on whether this economy's exporters have the spare capacity to fill larger orders at all. A country whose exports are mainly commodities priced in dollars will see a very different result from one exporting manufactures. Reach a conclusion that says under what conditions the effect is large.`, true),
  p(B2, 'Evaluate', 20, 'Evaluate the view that a rising savings ratio is always bad for an economy’s aggregate demand. (20 marks)',
    `The word doing the work in this question is "always", and an answer that argues only one side has not engaged with it. Plan two developed chains that point in opposite directions, and decide in advance what would make one of them dominate.\nThe first chain is the one the question expects: disposable income is either consumed or saved, so a higher savings ratio means lower consumption on an unchanged income, a smaller C and an AD curve further to the left. Support it with the arithmetic and take it through to output and employment. The second chain runs the other way: saving is the source of funds that banks lend, so a higher savings ratio can lower the cost and raise the availability of credit for firms, raising investment and therefore AD. Then judge between them, and the judgement should turn on conditions rather than preference — how far interest rates can still fall, whether firms are willing to borrow at all, and over what time period the question is being asked. A short run answer and a long run answer to this question can honestly differ.`, true),
];

/* ══ Flashcards ═══════════════════════════════════════════════════════════ */

const card = (front, back) => ({ id: id('flashcard', front), front, back });

export const FLASHCARDS = [
  card('What is aggregate demand?', 'Total planned spending on a country’s own output at each price level, over a period of time.'),
  card('Write the AD identity.', `AD = C + I + G + (X − M). Here ${bn(AD.C)} + ${bn(AD.I)} + ${bn(AD.G)} + (${bn(AD.X)} − ${bn(AD.M)}) = ${bn(AD.total)}.`),
  card('Why are imports subtracted in the identity?', 'Because spending on imports buys another country’s output. It is already inside C, I or G, so it is removed to leave demand for home output.'),
  card('Which component is the largest, and which the most volatile?', 'Consumption is much the largest and the most stable. Investment is the smallest of C, I and G and by far the most volatile.'),
  card('Why does the AD curve slope downward?', 'Three effects, all starting at the price level: the wealth effect on money already held, the interest-rate effect through the demand for money on to market rates, and the trade effect on (X − M).'),
  card('Movement along AD, or a shift?', 'Price level changed → movement along. Anything else changed → shift of the whole curve at every price level.'),
  card('What is disposable income?', 'Income after direct taxes are deducted and benefits received are added: what a household actually has to spend or save.'),
  card('Name the six influences on consumption.', CONSUMPTION.map(([k]) => k).join(', ') + '.'),
  card('How do interest rates affect consumption?', 'Twice over: they raise the cost of existing and new borrowing, and they raise the reward for saving. Both reduce spending.'),
  card('Why do welfare payments raise consumption more than an equal tax cut for high earners?', 'They reach households with unmet needs and little saving, who spend nearly all of what they receive.'),
  card('Are welfare payments part of G?', 'No. G is government spending on goods and services. A transfer buys nothing; it becomes demand only when the household spends it, and then it is C.'),
  card('What is a wealth effect?', 'A change in spending caused by a change in the value of what households own — property or shares — rather than by a change in what they earn.'),
  card('Availability of credit, or interest rates?', 'Availability is whether a bank will lend and on what conditions. Interest rates are what the lending costs. They can move in opposite directions.'),
  card('State the relationship between saving and consumption.', `Disposable income has two uses only: Yd = C + S. Saving is the residual, so a decision about one is a decision about the other.`),
  card('Define the savings ratio.', `Saving as a percentage of disposable income: ${bn(AD.S)} ÷ ${bn(AD.Yd)} = ${pct(AD.ratio)} here.`),
  card('What happens to AD if the savings ratio rises with income unchanged?', `Consumption falls and AD falls with it: at ${pct(AD.ratioUp)}, C is ${bn(AD.spentUp)} and AD is ${bn(AD.afterSaving.total)}.`),
  card('Gross investment, depreciation, net investment.', `Gross is all spending on capital goods (${bn(AD.I)}); depreciation is the capital used up (${bn(AD.depreciation)}); net is the difference (${bn(AD.netInvestment(AD.I))}) and can be negative.`),
  card('Which investment figure enters AD?', 'The gross figure, because that is the spending that took place. The net figure decides future productive capacity.'),
  card('Does buying shares count as investment?', 'No. Investment in economics is spending on capital goods. Buying a share transfers an asset that already exists and adds nothing to the capital stock.'),
  card('Name the five influences on investment.', INVESTMENT.map(([k]) => k).join(', ') + '.'),
  card('What is the test a firm applies to a project?', `The expected rate of return it KEEPS, against the interest rate. ${money(AD.project.cost)} for ${money(AD.project.yearly)} a year is ${pct(AD.project.rateOfReturn)}: it clears ${pct(AD.project.interestLow)} and fails ${pct(AD.project.interestHigh)}.`),
  card('Name the three policy tools for promoting investment.', INVESTMENT_POLICY.map(([k]) => k).join(', ') + '.'),
  card('How do subsidies and tax relief differ from a lower profit tax?', 'Subsidies and relief cut what the asset COSTS; a lower profit tax raises what the return is WORTH. Both raise the rate of return, from different sides.'),
  card('Name the four influences on government expenditure.', GOVERNMENT.map(([k]) => k).join(', ') + '.'),
  card('Which influence on G is not a decision?', `The level of economic activity. A downturn raises payments and lowers receipts because the rules already exist — G to ${bn(AD.afterDownturn.G)} here, with nothing announced.`),
  card('Name the five influences on the net trade balance.', NET_TRADE.map(([k]) => k).join(', ') + '.'),
  card('Domestic real income and foreign real income: which moves what?', 'Domestic real income moves M and leaves X alone. Foreign real income moves X and leaves M alone.'),
  card('What does a depreciation do to exports and imports?', `Exports become cheaper abroad and imports dearer at home. At ${qty(AD.fx.before)} to ${qty(AD.fx.after)} units per dollar, an export at ${qty(AD.fx.exportPrice)} units falls from ${money(AD.fx.exportCostsAbroad(AD.fx.before))} to ${money(AD.fx.exportCostsAbroad(AD.fx.after))} abroad.`),
  card('How is the size of a depreciation measured?', `By the fall in what one unit is worth, not the rise in the quote. ${qty(AD.fx.before)} to ${qty(AD.fx.after)} units per dollar is a ${pct(AD.fx.quoteRise)} rise in the quote and a ${pct(AD.fx.depreciation)} fall in the currency.`),
  card('What are non-price factors?', `${NET_TRADE[4][2].charAt(0).toUpperCase()}${NET_TRADE[4][2].slice(1)} — the only influence on trade a firm controls itself, and the slowest to build.`),
];

/* ══ Common mistakes ══════════════════════════════════════════════════════ */

const mistake = (title, looks_like, why, fix) => ({ id: id('mistake', title), title, looks_like, why, fix });

export const MISTAKES = [
  mistake(
    'Saying consumption is the most volatile component',
    'Writing that consumption is both the largest component of AD and the most volatile, because it is the biggest so it must move the most.',
    'Size and volatility are different properties of the same component. Consumption is much the largest because households buy most of what an economy produces, and it is the STEADIEST, because households smooth their spending across good years and bad. Investment is the smallest of the three positive components and by far the most volatile: a firm can buy no machines at all this year and still open tomorrow, and nobody can postpone eating.',
    'Say which property you mean. C is the largest and the most stable; I is the most volatile.',
  ),
  mistake(
    'Treating the interest-rate effect as a central bank decision',
    'Explaining the downward slope of the AD curve by saying that when prices rise, the central bank raises interest rates, so spending falls.',
    'That is a policy decision taken at an unchanged price level, which SHIFTS the AD curve rather than explaining its shape. The interest-rate effect is a market mechanism: a lower price level means the same transactions need less money, so the demand for money falls and market rates fall with it. Confusing the two puts a shift into an explanation of a movement, which is the exact distinction the chapter exists to teach.',
    'The effect behind the slope is the market rate moving because the price level moved. A central bank choosing a rate is a shift.',
  ),
  mistake(
    'Putting welfare payments into G',
    'Adding unemployment benefit, pensions and other transfers to government expenditure when calculating or describing AD.',
    'G is government spending ON GOODS AND SERVICES: the salary of a nurse the state employs, the concrete in a road. A transfer hands money to a household and buys nothing, so it is not demand at the moment it is paid. It becomes demand when the household spends it — and then it is consumption. Counting it in G as well counts the same money twice, which is why the specification lists welfare payments under influences on C.',
    'Ask what the government BOUGHT. If nothing was bought, it is a transfer and belongs in the consumption chapter.',
  ),
  mistake(
    'Writing "AD falls" when you mean "AD shifts left"',
    'Using the two phrases interchangeably, so an answer describes a leftward shift while the diagram shows a movement up the curve, or the reverse.',
    'They are different events with different causes. AD can fall because the price level rose, which is a movement along a curve that has not moved at all. AD shifts left when a component falls at every price level. Written beside a diagram showing a shift, "AD falls" describes a different event from the one drawn, and the whole of 2.3.2 · 1c is that difference.',
    'Name the cause in the same sentence. "The price level rose, so the economy moved up along AD" and "confidence fell, so AD shifted left" are both unambiguous.',
  ),
  mistake(
    'Calling a share purchase investment',
    'Writing that investment rises when households buy more shares, or that a rising stock market is an increase in I.',
    'Investment in economics is spending on CAPITAL GOODS — plant, equipment, buildings, vehicles — that adds to what the economy can produce. Buying a share transfers ownership of an asset that already exists from one person to another; the capital stock is exactly the same afterwards. Only the new capital goods count in I, and only they appear in the AD identity.',
    'Ask whether anything new was produced. If ownership merely changed hands, it is not investment.',
  ),
  mistake(
    'Reading an exchange-rate move off the quote',
    `Seeing the rate go from ${qty(AD.fx.before)} to ${qty(AD.fx.after)} units per dollar and calling it a ${pct(AD.fx.quoteRise)} fall in the currency.`,
    `The quote rose by ${pct(AD.fx.quoteRise)} and the currency fell by ${pct(AD.fx.depreciation)}, and those are different numbers because they are reciprocals of each other. One unit was worth ${money(AD.fx.valueOf(AD.fx.before))} and is now worth ${money(AD.fx.valueOf(AD.fx.after))}, which is the fall a foreign buyer actually experiences. A calculation question that asks for the size of a depreciation is asking for the second figure.`,
    'Convert to what one unit is worth before taking a percentage, and say which direction you are quoting in.',
  ),
];

/* ══ Extras ═══════════════════════════════════════════════════════════════ */
/*
 * EVERY CHAIN CARRIES `steps` (V028). `ExtrasTab.jsx:62` calls `chain.steps.map()` with no guard, so
 * a chain carrying anything else takes the whole tab down — and `previewMode` slices the list to one,
 * so a signed-out check never reaches a later chain. Judgement material goes in `evaluation` as
 * `{title, content}`, which is what it always was.
 */
export const EXTRAS = {
  chains: [
    {
      title: 'From an interest-rate rise to a smaller aggregate demand',
      steps: [
        `The central bank raises its policy rate, and market rates follow it up.`,
        `Households owing ${bn(AD.debt)} see their annual interest bill go from ${bn(AD.interestOnDebt(AD.rateLow))} to ${bn(AD.interestOnDebt(AD.rateHigh))}, so ${bn(AD.interestRise)} leaves consumption.`,
        `Firms comparing a ${pct(AD.project.rateOfReturn)} project against a higher rate find the marginal ones no longer clear it, so investment falls too.`,
        `Both C and I are smaller at every price level, so the curve shifts left rather than the economy sliding along it.`,
      ],
      result: `Nothing about the price level changed, which is why this is a shift. Two components moved, not one — and the same rate did both.`,
    },
    {
      title: 'From a depreciation to a better net trade balance',
      steps: [
        `The currency falls from ${qty(AD.fx.before)} to ${qty(AD.fx.after)} units per dollar, so one unit is worth ${money(AD.fx.valueOf(AD.fx.after))} instead of ${money(AD.fx.valueOf(AD.fx.before))}.`,
        `An export priced at ${qty(AD.fx.exportPrice)} units at home now costs a foreign buyer ${money(AD.fx.exportCostsAbroad(AD.fx.after))} rather than ${money(AD.fx.exportCostsAbroad(AD.fx.before))}, with the home price untouched.`,
        `An import priced at ${money(AD.fx.importPrice)} abroad now costs ${qty(AD.fx.importCostsAtHome(AD.fx.after))} units at home rather than ${qty(AD.fx.importCostsAtHome(AD.fx.before))}.`,
        `Foreign buyers order more and residents buy fewer imported goods, so X rises, M falls and (X − M) improves.`,
      ],
      result: `The exporter cut its foreign prices without changing its price list. How MUCH X and M respond is a Unit 4 question; for 2.3.2 the direction and the per-unit arithmetic are the answer.`,
    },
    {
      title: 'From a savings-ratio rise to two opposite effects',
      steps: [
        `Households expect harder times and decide to save ${pct(AD.ratioUp)} of disposable income rather than ${pct(AD.ratio)}.`,
        `Disposable income is unchanged at ${bn(AD.Yd)}, so saving goes to ${bn(AD.savedUp)} and consumption falls to ${bn(AD.spentUp)}.`,
        `AD falls from ${bn(AD.total)} to ${bn(AD.afterSaving.total)} — and whether output and employment follow it down depends on aggregate supply, which is the next topic.`,
        `The same saving is a larger pool of funds for banks to lend, so the cost and availability of credit for firms can improve and investment can rise.`,
      ],
      result: `One decision, two effects, pointing opposite ways — which is why "a higher savings ratio is bad for the economy" is an assertion rather than an answer.`,
    },
  ],
  evaluation: [
    {
      title: 'How much does a shift in AD actually matter?',
      content: `The identity tells you the direction and the first-round size of a change, and no more than that. Measured against the ${bn(AD.total)} total, ${bn(AD.fiscalRise)} is ${bn(AD.fiscalRise)} whichever component it comes from — the identity is a sum, and a dollar of G is a dollar of C. What differs is how LIKELY a change that size is: ${bn(AD.fiscalRise)} is ${pct((AD.fiscalRise / AD.I) * 100)} of this economy's investment and ${pct((AD.fiscalRise / AD.C) * 100)} of its consumption, so it is an ordinary year for I and an extraordinary one for C. Two other things decide whether a shift matters: how quickly the spending can actually happen, since an infrastructure programme announced today is concrete poured over several years; and what aggregate supply looks like where the new curve meets it, which is the next topic and decides whether the extra demand becomes output or prices.`,
    },
    {
      title: 'When does a policy aimed at investment work?',
      content: `All three tools in 2.3.2 · 3c work by raising the return the firm KEEPS against the interest rate it is compared with. None of them makes a bad project good — the machine still earns what it earns; what they do is move projects that were sitting just below the line over it, which is exactly why the size of the effect depends on how many were sitting there. A subsidy or tax relief reaches the specific assets a government chose; a cut in the profit tax reaches every firm with taxable profit, including those already investing and excluding those making a loss. And none of them helps where the obstacle was never the return: a firm refused credit because it has nothing to pledge is not helped by a better return on a project no bank will fund.`,
    },
  ],
};
