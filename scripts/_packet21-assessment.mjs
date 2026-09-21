/**
 * PACKET 21 — measures-economic-performance: quiz, practice, flashcards, common mistakes, extras.
 *
 * QUIZ: 43 items, every one on material the Learn Mode body now teaches, 40 reachable through a
 * block's quizIndices and exactly three left unpinned — and those three FIRST in the array, because a
 * signed-out student is sent only PREVIEW_LIMITS.quiz items and PreTest.jsx slices whatever it is
 * given (packet 16). The March bank had 25 and the wiring reached the wrong ones: quizIndices were
 * [0],[1],…,[7] in block order, so the Deflation chapter showed a question about cost-push oil and
 * the Current Account chapter showed one about measuring unemployment (structure-01, and the live
 * `pins.identity` DEBT).
 *
 * Three March items are dropped rather than rewritten, because the material under them is not in the
 * IAL specification at all:
 *   - q3 turned on whether CPIH or RPI includes mortgage interest payments. Both return ZERO
 *     occurrences in econ_spec.txt, and the explanation had the answer the wrong way round anyway
 *     (quiz-01, topFix-05). Its key, "substitution bias", is a third phrase the specification does
 *     not contain and which the content never taught.
 *   - q1 and q10 tested the GDP deflator formula, which is another zero, and which the notes never
 *     showed (structure-07).
 * Items testing HDI components go with the HDI subsection: that topic is 4.3.6, Unit 4.
 *
 * PRACTICE: IAL ECONOMICS command words and their own tariffs from Appendix 6, verified against
 * audit/raw/tariff-census.json — Define 2, Calculate 2/4, Draw 4, Explain 4, Analyse 6, Examine 8,
 * Discuss 14, Evaluate 20. All eight appear here, across ten items.
 *
 * FOUR OF THE FIVE MARCH ITEMS WERE WRONGLY TARIFFED, AND THE LEDGER ASKED FOR THE FIFTH TO BE
 * REMOVED. p0 was Define at 4 marks (practice-01; Define carries 2), p1 Explain at 6 (Explain carries
 * 4), p2 an "Assess" at 10 — a command word that does not exist in IAL Economics at any tariff — and
 * p4 an "Outline", which exists in neither subject. p3 was `Evaluate … (20 marks)`, and it is the one
 * item whose command and tariff were already right. `practice-02` asserts that "WEC12 (Unit 2) papers
 * have no 20-mark essay; the top tariff is 14 ('Discuss') with 12 'Assess'", and `topFix-04` repeats
 * the instruction to convert it. Both are refused: econ_spec.txt:379-399 and :1989-2001 both state
 * that Unit 2 Section D is ONE 20-MARK ESSAY QUESTION FROM A CHOICE OF TWO, there is no `Assess` in
 * this subject, and there is no 12-mark tariff. The item is kept.
 *
 * Guidance above 6 marks allocates no points (`practice.levels`), and no guidance anywhere says what
 * a marker does with an answer. `topFix-04` asks for the schemes to be rewritten "as levels (KAA +
 * Evaluation)"; describing marking is what `MARK_CLAIM` bans in anything a student reads, and what
 * the validator's rule actually forbids is the point tally. Guidance says what the COMMAND WORD
 * requires, which Appendix 6 states and which is therefore citable.
 *
 * Nothing in this file uses RPI, CPIH, HDI, quantitative easing, the GDP deflator, substitution bias
 * or the three measurement methods. An assessment item is where off-spec vocabulary does real damage,
 * because a student who learns the wrong word here will write it in an answer.
 */
import {
  id, money, bn, pc, rate, idx, minus, r2,
  NOMINAL, GDP_INDEX, POP, realAt, perCapitaAt, realGrowth, nominalGrowth, perCapitaGrowth,
  OIL, oilValue, OIL_VOLUME_CHANGE, OIL_VALUE_CHANGE,
  BASKET, HOUSEHOLD_BASKET, weighted, weightSum, CPI, CPI_HOUSEHOLD, INFLATION, INFLATION_HOUSEHOLD,
  CPI_SERIES, INFLATION_Y3, PPI, PPI_CHANGE, SAVINGS, SAVINGS_RATE, savingsNominal, savingsReal,
  WORKING_AGE, EMPLOYED, UNEMPLOYED, LABOUR_FORCE, INACTIVE, UNDEREMPLOYED,
  unemploymentRate, employmentRate, inactivityRate,
  MIGRATION, mLabourForce, mEmployed, mUnemployed, mUnemploymentRate,
  BOP, tradeInGoodsAndServices, currentAccount,
} from './_packet21-util.mjs';
import { B1, B2, B3, B4, B5, B6, B7, B8, B9, B10 } from './_packet21-content.mjs';
import { QUARTERS, PPP_ROWS, atMarket, atPPP, FLOOR_DEMAND, FLOOR_SUPPLY, FLOOR_GAP } from './_packet21-diagrams.mjs';

const TOTAL = BASKET.reduce((n, g) => n + weighted(g), 0);

/* ── quiz ──────────────────────────────────────────────────────────────────── */
// [block, stem, options in display order, index of the correct one, explanation]
const Q = [
  /* ══ unpinned: the pre-test, FIRST in array order ══════════════════════════
   * PreTest.jsx takes the first three items no block has reserved, in array order (F079). They sit
   * FIRST because GET /api/sections/[id] caps a free or signed-out student's quiz since F086: with
   * the unpinned items at the END, the items a free student received were all PINNED, so the pre-test
   * asked a question a chapter check-in asked again minutes later. One from growth, one from
   * inflation and one from unemployment, so the three sample the section and none is asked twice.
   */
  [null, 'Economic growth is measured as the rate of change of:',
    ['Nominal GDP', 'Real GDP', 'GDP per capita at current prices', 'The consumer price index'], 1,
    'Growth is defined on real GDP, which is measured at constant prices, so a rise means more output rather than higher prices. A measure at current prices rises whenever prices rise, and the consumer price index measures inflation rather than output.'],
  [null, 'A country\'s price index rose by 6% one year and by 2% the next. Over the second year the country experienced:',
    ['Deflation', 'Disinflation', 'A fall in the price level', 'No change in prices'], 1,
    'Prices were still rising in the second year and rising more slowly than before, which is disinflation. A fall in the price level would need the index itself to go below the year before, and it did not.'],
  [null, 'Someone working six hours a week who wants full-time work is counted by the ILO definition as:',
    ['Unemployed', 'Economically inactive', 'Employed', 'Outside the working-age population'], 2,
    'Any paid work at all makes a person employed on this definition, however few the hours. Being unemployed requires having no job, and being economically inactive requires not seeking or not being available for work.'],

  /* ══ Block 1 — Measuring National Output ══ */
  [B1, 'Gross National Income differs from Gross Domestic Product in that it measures:',
    ['Output produced inside the country\'s borders', 'Income received by the country\'s residents', 'Output valued at constant prices', 'Income after tax has been deducted'], 1,
    'GNI draws its boundary around residents and counts the income they receive wherever it was earned, while GDP draws its boundary around the territory and counts output produced inside it. Neither measure is about constant prices or about tax.'],
  [B1, `Andara's nominal GDP rose from ${bn(NOMINAL[1])} to ${bn(NOMINAL[2])} while its price index rose from ${idx(GDP_INDEX[1])} to ${idx(GDP_INDEX[2])}. Real GDP:`,
    [`Rose to ${bn(realAt(2))}`, `Fell to ${bn(realAt(2))}`, `Was unchanged at ${bn(realAt(1))}`, 'Cannot be worked out from this data'], 1,
    `Dividing the nominal figure by the price index and multiplying by 100 gives ${bn(realAt(2))}, against ${bn(realAt(1))} the year before — a fall of ${pc(realGrowth(2))}. The money figure rose because prices rose, which is exactly the situation real GDP exists to reveal.`],
  [B1, `Andara's real GDP rose ${pc(realGrowth(1))} in year 2 and its population rose from ${POP[0]}m to ${POP[1]}m. Real GDP per capita:`,
    ['Rose by about 4%', 'Fell slightly', `Was unchanged at ${money(perCapitaAt(1))}`, 'Rose by about 8%'], 2,
    `The population rose by the same percentage as output, so output per person was ${money(perCapitaAt(0))} before and ${money(perCapitaAt(1))} after. Total growth at the rate of population growth leaves living standards, measured this way, exactly where they were.`],
  [B1, `An exporter shipped ${OIL[1].barrels}m barrels at ${money(OIL[1].price)} having shipped ${OIL[0].barrels}m at ${money(OIL[0].price)}. Over the year:`,
    ['Both value and volume rose', 'Both value and volume fell', 'Volume fell and value rose', 'Volume rose and value fell'], 3,
    `Volume is the quantity shipped and it rose ${pc(OIL_VOLUME_CHANGE)}. Value is what it earned, and that fell ${pc(OIL_VALUE_CHANGE)}, from ${bn(oilValue(0))} to ${bn(oilValue(1))}, because the price fell further than the quantity rose.`],

  /* ══ Block 2 — Comparing Growth ══ */
  [B2, 'A recession is defined by the specification as:',
    ['A year in which real GDP falls', 'Two consecutive quarters of negative economic growth', 'Any quarter in which unemployment rises', 'A fall in the rate of economic growth over two or more quarters'], 1,
    'The definition counts quarters: two of them, one after the other, each with output smaller than the quarter before. A fall in the rate of growth is not negative growth at all, and an annual figure cannot show whether the quarterly condition was met.'],
  [B2, 'An economy reports growth of 3.0% one year and 1.0% the next. Over the two years its real output:',
    ['Fell in the second year and rose in the first', 'Was larger at the end than at the start', 'Was unchanged across the two years', 'Fell in both of the two years'], 1,
    'Both figures are positive, so output rose in both years and is larger at the end than at the start. Growth slowing is a smaller increase, not a decrease; only a negative rate would mean the economy produced less than before.'],
  [B2, `Berewa's average income converts to ${money(atMarket(PPP_ROWS[1]))} at the market exchange rate and ${money(atPPP(PPP_ROWS[1]))} at purchasing power parity. The difference exists because:`,
    ['The market exchange rate has been calculated incorrectly', 'Berewa\'s currency buys more at home than the market rate implies', 'A purchasing power parity always exceeds the market figure', 'Incomes in Berewa have been rising more quickly'], 1,
    'A purchasing power parity converts at what money actually buys, and prices for goods and services that cannot be traded across borders tend to be lower in lower-income countries. The market rate is a correct measure of what the currency trades for, which is a different question.'],
  [B2, `A country's quarterly real growth over a year was ${QUARTERS.map((q) => pc(q)).join(', ')}. The definition of a recession was met:`,
    ['At the end of the first quarter', 'At the end of the second quarter', 'At the end of the third quarter', 'Not at all during the year'], 2,
    `The first quarter was positive, so the run starts in the second. Two consecutive negative quarters are complete only at the end of the third, which is where the definition is satisfied; the fourth is still negative and still part of the same recession.`],

  /* ══ Block 3 — What GDP Leaves Out ══ */
  [B3, 'Work that was previously done unpaid at home and is now bought from a business will:',
    ['Leave measured GDP unchanged', 'Reduce measured GDP', 'Raise measured GDP although the work is the same', 'Raise GDP only if the business is domestically owned'], 2,
    'GDP counts output that passes through a market, so the same work counts once it is paid for and did not count before. That is a limitation of the measure rather than a real increase in what the economy produces.'],
  [B3, 'Which of these is a limitation of GDP that arises because a single total cannot show it, rather than because the output was never counted?',
    ['Unpaid care given within a family', 'How evenly income is shared between people', 'Work paid in cash and not declared', 'Natural resources used up in production'], 1,
    'Distribution is invisible in an average: the same GDP per capita can be shared evenly or very unevenly. Unpaid care and undeclared work never enter the accounts at all, and resources used up are output counted with no offsetting loss recorded.'],
  [B3, 'The relationship between real income and reported life satisfaction is best described as:',
    ['Rising at a constant rate across the whole range', 'Rising steeply at low incomes and flattening as income grows', 'Rising to a peak and then falling once incomes pass a certain level', 'Showing no relationship at any level of income'], 1,
    'The line rises throughout and flattens, so extra income adds most where there is least of it. It does not turn downward, and a relationship that flattens is not the same as no relationship.'],

  /* ══ Block 4 — Measuring Inflation ══ */
  [B4, `A basket has four groups with weights ${BASKET.map((g) => g.weight).join(', ')} and price indices ${BASKET.map((g) => idx(g.index)).join(', ')}. The consumer price index is:`,
    [idx(CPI), idx(106), idx(CPI_HOUSEHOLD), idx(TOTAL)], 0,
    `Multiplying each weight by its index and adding gives ${TOTAL.toLocaleString('en-GB')}, and dividing by the total weight of ${weightSum(BASKET)} gives ${idx(CPI)}. Dividing is what returns the figure to the scale of an index; the undivided total is not one.`],
  [B4, `A price index moved from ${idx(CPI_SERIES[1])} to ${idx(CPI_SERIES[2])}. Inflation over that year was:`,
    [pc(r2(CPI_SERIES[2] - 100)), pc(INFLATION_Y3), pc(INFLATION), '0%'], 1,
    `Inflation is the change divided by the PREVIOUS year's index: (${idx(CPI_SERIES[2])} − ${idx(CPI_SERIES[1])}) ÷ ${idx(CPI_SERIES[1])} × 100. Subtracting 100 instead gives the change since the base year, which is a different and much larger figure.`],
  [B4, `Andara's four price changes weighted to a household that spends more of its income on food give an index of ${idx(CPI_HOUSEHOLD)} rather than ${idx(CPI)}. This shows that:`,
    ['The national index has been calculated incorrectly somewhere in the weighting', 'A national index is an average that no particular household need experience', 'Food prices are the only prices that matter to an index', 'The household is spending more on food than it should'], 1,
    `Nothing about the prices changed between the two calculations; only the weights did. The national figure is a correct average over average spending, and households weighted differently from the average face something different — here ${pc(INFLATION_HOUSEHOLD)} against ${pc(INFLATION)}.`],
  [B4, 'The producer price index is watched as an indicator of future consumer price inflation because:',
    ['It is measured more accurately', 'It covers a wider range of goods', 'Costs reach firms before they reach shops', 'It is published less often'], 2,
    'A cost has to arrive at a firm before it can be passed into a price on a shelf, so the producer index moves first. It is an indicator rather than a forecast, because a firm may absorb the cost instead of passing it on.'],

  /* ══ Block 5 — Causes of Inflation and Deflation ══ */
  [B5, 'An economy shows a rising price level alongside falling real output. The cause is most likely:',
    ['Demand-pull inflation', 'Cost-push inflation', 'An increase in aggregate supply', 'A fall in aggregate demand'], 1,
    'Only a rise in the cost of producing each unit raises the price level while output falls. A rise in aggregate demand would take output up with prices, and both of the other options lower the price level rather than raising it.'],
  [B5, 'Demand-pull inflation on a diagram with the price level and real output on the axes is shown by:',
    ['Aggregate demand shifting right along an unchanged supply curve', 'Short-run aggregate supply shifting left along an unchanged demand curve', 'Both curves shifting right together', 'Aggregate demand shifting left along an unchanged supply curve'], 0,
    'Demand-pull starts with a rise in aggregate demand, so that curve moves right and the supply curve stays where it is, taking the price level and real output up together. Supply shifting left is cost-push, and demand shifting left lowers the price level instead.'],
  [B5, 'Growth in the money supply causes inflation when it:',
    ['Occurs at all', 'Exceeds the growth of real output', 'Is decided by a government rather than by banks', 'Is accompanied by falling unemployment'], 1,
    'An economy producing more needs more money to buy it, so money growing in line with output raises no prices. It is the excess over what output requires that leaves more money chasing the same quantity of goods.'],
  [B5, 'Prices are falling in an economy whose output is growing. This is caused by:',
    ['A fall in aggregate demand', 'A fall in the money supply', 'An increase in aggregate supply', 'Cost-push inflation'], 2,
    'An increase in aggregate supply lowers the price level and raises output at the same time, which is the one combination the other options cannot produce. Both a fall in aggregate demand and a fall in the money supply take output down along with prices.'],
  [B5, 'Deflation caused by falling aggregate demand tends to reinforce itself because:',
    ['Firms raise prices to protect their revenue', 'Buyers delay purchases that will be cheaper later', 'Wages rise faster than prices', 'The money supply expands automatically'], 1,
    'If prices are expected to keep falling, waiting is rewarded, and delayed spending is a further fall in aggregate demand. That is what distinguishes this case from deflation caused by rising aggregate supply, where output is rising.'],

  /* ══ Block 6 — Effects of Inflation and Deflation ══ */
  [B6, `A saver holds ${money(SAVINGS)} at ${rate(SAVINGS_RATE)} interest in a year when inflation is ${pc(INFLATION)}. Over the year the saver:`,
    ['Gains, because the balance is larger', 'Loses, because the balance buys less than before', 'Is unaffected, because interest offsets inflation', 'Gains, because interest is paid before prices rise'], 1,
    `The balance rises to ${money(savingsNominal())} and prices rise faster, so it buys what ${money(savingsReal())} bought a year earlier. A larger number of dollars that buys less is a loss, which is why the comparison has to be made in real terms.`],
  [B6, 'Unexpected inflation moves real income towards:',
    ['Savers and away from borrowers', 'Borrowers and away from savers', 'Workers and away from firms', 'Nobody, since everyone loses equally'], 1,
    'A debt fixed in money terms is repaid in money that buys less than the money borrowed, so the borrower gains exactly what the lender loses. Inflation moves real income between people rather than removing it from everyone.'],
  [B6, 'Investment tends to fall under both inflation and deflation because:',
    ['Interest rates are always high under both inflation and deflation', 'Returns become uncertain under inflation, and waiting is rewarded under deflation', 'Firms are unable to borrow to fund a project in either case', 'Governments restrict investment under both inflation and deflation, by law'], 1,
    'The two work through different mechanisms and point the same way: inflation makes future returns hard to forecast, while deflation makes postponing a project the cheaper decision. That is why the specification lists investment separately from firms.'],
  [B6, 'A country\'s inflation rate is 5% while its trading partners\' is 8%. Its international competitiveness:',
    ['Worsens, because its prices are rising', 'Improves, because its prices rise more slowly than its partners\'', 'Is unaffected, because inflation is a purely domestic matter for each country', 'Worsens, because exports always become dearer'], 1,
    'Competitiveness depends on inflation relative to trading partners, not on the rate alone. Prices at home are rising and rising more slowly than abroad, so its exports become cheaper in comparison and its current account tends to improve.'],

  /* ══ Block 7 — Measuring Employment and Unemployment ══ */
  [B7, `Andara has ${EMPLOYED}m employed, ${UNEMPLOYED}m unemployed and ${INACTIVE}m inactive from a working-age population of ${WORKING_AGE}m. The unemployment rate is:`,
    ['3.75%', rate(unemploymentRate()), rate(inactivityRate()), rate(employmentRate())], 1,
    `The unemployment rate is measured against the labour force, which is the employed plus the unemployed: ${UNEMPLOYED} ÷ ${LABOUR_FORCE} × 100. Dividing by the working-age population instead gives 3.75%, which is the commonest error in this calculation.`],
  [B7, 'A person must satisfy which conditions to be counted as unemployed on the ILO definition?',
    ['Without a job, and nothing further is required', 'Without a job and actively seeking work, but availability is not required', 'Without a job, available to start work, and actively seeking work', 'Without a job and claiming support from the government'], 2,
    'All three conditions must hold at once. Someone without a job who is not available to start, or not looking, is economically inactive rather than unemployed, and the definition makes no reference to claiming support.'],
  [B7, `${MIGRATION.workingAge}m people of working age arrive in a country over a year. ${MIGRATION.joinLabourForce}m join the labour force and ${MIGRATION.findWork}m find work. Over that year:`,
    ['Employment fell and the unemployment rate rose', 'Employment rose and the unemployment rate fell', 'Employment rose and the unemployment rate rose', 'Neither employment nor the rate changed'], 2,
    `More people are in work at the end than at the start, and the unemployment rate is higher, because the labour force grew faster than employment did — ${rate(unemploymentRate())} to ${rate(mUnemploymentRate())}. Both statements describe the same year and answer different questions.`],
  [B7, 'An unemployment rate falls over a year in which employment did not rise. The most likely explanation is that:',
    ['More of the unemployed found part-time rather than full-time work', 'Some unemployed people stopped looking and became inactive', 'The working-age population fell over the year', 'Underemployment increased among those already in work'], 1,
    'People who stop seeking work leave the labour force and are counted as economically inactive, which removes them from the numerator of the unemployment rate without putting anyone into work. Underemployment cannot change the rate at all, because the underemployed already have jobs.'],

  /* ══ Block 8 — Causes of Unemployment ══ */
  [B8, 'An economy has high unemployment and large numbers of unfilled vacancies requiring skills the unemployed do not have. This is:',
    ['Frictional unemployment', 'Seasonal unemployment', 'Demand-deficiency unemployment', 'Structural unemployment'], 3,
    'Unemployment sitting alongside vacancies that cannot be filled is a mismatch between the skills or location of workers and the jobs available, which is what structural unemployment means. A shortage of aggregate demand would not leave vacancies unfilled.'],
  [B8, 'Unemployment rises at the same time across manufacturing, retail and services with no supplier in common. This points to:',
    ['Structural unemployment', 'Demand-deficiency unemployment', 'Frictional unemployment', 'Real-wage inflexibility'], 1,
    'A cause showing up in industries with nothing in common has to be economy-wide, and a fall in aggregate demand is exactly that. A mismatch of skills would affect particular industries rather than all of them at once.'],
  [B8, 'A worker who has left one job and expects to start another within two months is experiencing:',
    ['Structural unemployment', 'Seasonal unemployment', 'Frictional unemployment', 'Demand-deficiency unemployment'], 2,
    'The gap is the time taken to match a worker to a job that already exists, which is frictional and resolves as the match is made. Structural unemployment lasts because the jobs available need something the worker does not have.'],
  [B8, `A wage floor leaves firms wanting ${FLOOR_DEMAND}m workers while ${FLOOR_SUPPLY}m are willing to work at that wage. The ${FLOOR_GAP}m difference is unemployment caused by:`,
    ['A shortage of aggregate demand across the economy', 'A mismatch between workers\' skills and the jobs that employers have available', 'The wage being held above the level that would hire everyone willing', 'Workers choosing not to accept the jobs on offer'], 2,
    'At that wage more people offer themselves than firms will hire, and the wage cannot fall to close the gap. The workers are willing to work at the going wage, which is what separates this from a choice not to take a job.'],
  [B8, 'Unemployment figures are usually published seasonally adjusted so that:',
    ['The published figures look smaller than they really are', 'A change can be read as a real change rather than the arrival of a season', 'Frictional unemployment can be excluded from the total before publication', 'Only full-time work is counted towards the published figure'], 1,
    'The regular yearly pattern is taken out, so a month-to-month movement reflects something other than the season arriving on schedule. The adjustment changes neither what is counted nor who is included.'],

  /* ══ Block 9 — Effects of Unemployment ══ */
  [B9, 'On a production possibility frontier diagram, an economy with unemployed workers is shown:',
    ['On the frontier', 'Inside the frontier', 'Beyond the frontier', 'With the frontier shifted inward'], 1,
    'The resources still exist, so what the economy could produce has not changed and the frontier stays where it is; the economy is simply producing less than it could, at a point inside it. The frontier itself moves inward only when skills and capital are lost for good.'],
  [B9, 'The effect of rising unemployment on public finances is that:',
    ['Receipts fall and spending rises', 'Receipts rise and spending falls', 'Receipts and spending both fall', 'Neither is affected until tax rates change'], 0,
    'Fewer people earning means less income tax, less spending means less tax on spending, and more households qualify for support at the same time. Both sides of the account move in the unhelpful direction without any decision being taken.'],
  [B9, 'High unemployment affects firms in that it:',
    ['Only reduces their sales', 'Only lowers their labour costs', 'Reduces their sales and lowers their labour costs', 'Has no effect until wages are renegotiated'], 2,
    'It cuts both ways: households with less income buy less, and at the same time there are more applicants for each vacancy and weaker pressure to raise wages. For most firms the lost sales outweigh the cheaper labour, which is a judgement rather than a definition.'],
  [B9, 'The lasting cost of unemployment to a worker is usually larger than the wages lost during it because:',
    ['Support payments are taxed', 'Skills decay, so earnings stay lower for years afterwards', 'Firms are required to rehire at a lower wage', 'The worker loses their place in the working-age population'], 1,
    'Skills that go unused deteriorate and a long spell weakens a worker\'s position on returning, so earnings remain below what they would have been long after the spell ends. That is why unemployment is treated as worse than the same loss of output spread evenly.'],

  /* ══ Block 10 — The Balance of Payments ══ */
  [B10, 'The current account of the balance of payments records:',
    ['Trade in goods only', 'Trade in goods and services only', 'Trade in goods, trade in services, primary income and secondary income', 'All transactions between a country and the rest of the world, of every kind'], 2,
    'The current account has four lines, of which trade is two. All transactions between a country and the rest of the world is the balance of payments as a whole, which also contains the capital and financial accounts.'],
  [B10, `A country's trade in goods balance is ${bn(BOP.goods)} and its trade in services balance is ${bn(BOP.services)}. Its trade in goods and services balance is:`,
    [bn(24), bn(tradeInGoodsAndServices()), bn(BOP.goods), bn(currentAccount())], 1,
    `The two lines are added with the sign of each kept: ${bn(BOP.goods)} + ${bn(BOP.services)} = ${bn(tradeInGoodsAndServices())}, a surplus. Adding the figures as though both were positive gives ${bn(24)}, which is where this calculation is usually lost.`],
  [B10, `A country has a trade in goods and services surplus of ${bn(tradeInGoodsAndServices())} and a current account deficit of ${bn(Math.abs(currentAccount()))}. This is possible because:`,
    ['One of the two figures must be an error', 'Primary and secondary income are also in the current account', 'The capital account is included in the current account', 'A surplus and a deficit cannot both occur'], 1,
    `The current account adds primary income of ${bn(BOP.primary)} and secondary income of ${bn(BOP.secondary)} to the trade lines, and together those outweigh the trade surplus. The capital account is a separate component of the balance of payments.`],
];

/*
 * THE ANSWER-POSITION HISTOGRAM, fixed in the data rather than left to chance. Authored as written,
 * this bank put 60% of its correct answers in position 1 and 5% in position 3 — `quiz.histogram`
 * wants no bucket above 40% and none below 10%, and the live section failed it at 4/64/32/0 over 25
 * items. Options are shuffled at render since packet 8, so this is a construction tell rather than
 * something a student sees; it is still a tell, and it is still ours.
 *
 * Each item's options are ROTATED so that the correct one lands on a target position taken from a
 * fixed eight-long pattern. Rotation keeps the options in the order they were written relative to one
 * another, so nothing an explanation refers to moves relative to anything else, and no explanation in
 * this file names a position or a letter. The pattern is balanced two-of-each and is deliberately not
 * a plain 0,1,2,3 cycle, which would be the same tell wearing a different hat.
 */
const TARGETS = [2, 0, 3, 1, 1, 3, 0, 2];
const rotate = (arr, by) => arr.map((_, i) => arr[(i - by + arr.length * 2) % arr.length]);

export const QUIZ = Q.map(([block, question, options, correctIndex, explanation], i) => {
  const target = TARGETS[i % TARGETS.length];
  const by = (target - correctIndex + options.length) % options.length;
  return {
    id: id('quiz', question), block, question,
    options: rotate(options, by), correctIndex: target, explanation,
  };
});

/* ── practice ──────────────────────────────────────────────────────────────── */
/*
 * TEN ITEMS, ONE PER BLOCK, so every chapter check-in reaches one. The March section had five, of
 * which only p1 and p4 were pinned at all, and both landed on the wrong chapter: practiceIndices [0]
 * on the Inflation block resolved to "Define GDP" (structure-03). The 6-, 10- and 20-mark items never
 * surfaced in Learn Mode at all.
 *
 * Commands and tariffs from audit/raw/tariff-census.json for ECONOMICS: Define 2, Calculate 2/4,
 * Draw 4, Explain 4, Analyse 6, Examine 8, Discuss 14, Evaluate 20. All eight appear; Calculate and
 * Explain appear twice and three times respectively, at tariffs the census allows.
 */
// [block, command, marks, question, guidance]
const P = [
  [B1, 'Define', 2, 'Define the term ‘gross domestic product’ (GDP). (2 marks)',
    'Define requires the meaning of a term (WEC12 Appendix 6), and it carries 2 marks in IAL Economics. The total value of goods and services produced inside a country over a period of time: the boundary and the period are what make it a definition rather than a description. Nothing else is required — a Define does not ask for the three distinctions between measures, for how the figure is used, or for its limitations.'],
  [B2, 'Calculate', 2, `A country’s real GDP was ${bn(realAt(1))} in year 2 and ${bn(realAt(2))} in year 3. Calculate its rate of economic growth in year 3. (2 marks)`,
    `Calculate requires a calculation from given data, and workings should be shown (WEC12 Appendix 6). The rate of economic growth is the change in real GDP divided by the earlier figure, multiplied by 100: (${bn(realAt(2))} − ${bn(realAt(1))}) ÷ ${bn(realAt(1))} × 100 = ${pc(realGrowth(2))}. Divide by the EARLIER figure, not the later one, and keep the sign: it is part of the answer, because it is what says output fell rather than rose.`],
  [B3, 'Explain', 4, 'Explain two reasons why a rise in real GDP per capita may not mean that living standards have improved. (4 marks)',
    'Explain requires knowledge and understanding applied to a context, and a two-stage chain where a reason is asked for (WEC12 Appendix 6). Two from: the average says nothing about distribution, so a rise concentrated among a few leaves most people where they were; the output may be spending that repairs damage rather than adding anything; the extra output may have been produced by working longer hours, which is a cost the figure cannot see; and output that depletes a resource counts in full with no loss recorded. Take two and join each to the living standard by a reason. Naming four limitations without joining any of them to living standards answers a different question.'],
  [B4, 'Calculate', 4, `A consumer price index is built from four groups with weights of ${BASKET.map((g) => g.weight).join(', ')} and price indices of ${BASKET.map((g) => idx(g.index)).join(', ')}. Calculate the index and the rate of inflation if the base year index was 100. (4 marks)`,
    `Calculate requires a calculation involving several stages, with workings shown (WEC12 Appendix 6). Multiply each weight by its index: ${BASKET.map((g) => `${g.weight} × ${idx(g.index)} = ${weighted(g).toLocaleString('en-GB')}`).join('; ')}. Add them: ${TOTAL.toLocaleString('en-GB')}. Divide by the total weight of ${weightSum(BASKET)}: ${idx(CPI)}. Inflation is the percentage change from the base year index of 100, so ${pc(INFLATION)}. Set the weighted total, the division and the percentage change out separately, so that a slip in one of them is visible.`],
  [B5, 'Draw', 4, 'Draw an accurately labelled aggregate demand and aggregate supply diagram to show the effect of a sharp rise in imported energy costs on the price level and real output. (4 marks)',
    'Draw requires an accurately labelled diagram, using quantitative skills (WEC12 Appendix 6), so the labels are the answer rather than decoration. Required: the price level on the vertical axis and real output on the horizontal, both labelled; a downward-sloping AD and an upward-sloping SRAS₁; a second curve SRAS₂ drawn up and to the LEFT of SRAS₁, since a cost rise means less is supplied at every price level; SRAS₁ kept on the page, because a shift is only visible against where the curve was; an arrow showing the direction; and dashed guides reading off the higher price level and the lower real output. That pairing — price level up, output down — is what identifies the cause as cost-push.'],
  [B6, 'Analyse', 6, 'Analyse how a rise in a country’s inflation rate relative to its trading partners affects its current account. (6 marks)',
    'Analyse requires a developed chain of reasoning (WEC12 Appendix 6), so the links matter more than the number of points. Prices at home rise faster than abroad; exports therefore become dearer for foreign buyers while imports become relatively cheaper at home; buyers switch, with the size of the switch depending on how easily the goods can be replaced; export earnings fall and import spending rises, so the current account moves towards deficit. Develop one chain properly rather than naming several effects. The first link is the comparison with trading partners: an answer starting from the inflation rate alone reaches a conclusion that is wrong for a country whose partners have higher inflation still.'],
  [B7, 'Examine', 8, 'Examine the relationship between the unemployment rate, the employment rate and the economic inactivity rate as measures of the labour market. (8 marks)',
    'Examine requires knowledge, understanding, application, analysis AND evaluation (WEC12 Appendix 6): an explanation with a chain of reasoning, the data given interpreted, and a brief assessment of the arguments. Set out the measurements first: the unemployment rate is measured against the labour force, the employment and inactivity rates against the whole working-age population, so the three do not sum to 100 and none can be derived from the others. Then consider what the relationship reveals. An unemployment rate falling while the employment rate is flat means people moved from unemployment into inactivity, not into work. A rising inactivity rate can hide a weakening labour market behind an improving unemployment figure. Net migration can raise employment and the unemployment rate together. Conclude on what reading all three allows that reading one does not.'],
  [B8, 'Explain', 4, 'Explain two causes of unemployment that would not be removed by a rise in aggregate demand. (4 marks)',
    'Explain requires a two-stage chain where a reason is asked for (WEC12 Appendix 6). Two from structural, frictional, seasonal and real wage inflexibility, each joined to why extra demand leaves it in place. Structural: the jobs exist already and go unfilled because workers lack the skills or live elsewhere, so more demand adds vacancies of the same kind. Real wage inflexibility: the gap is between the workers firms will hire at a wage that cannot fall and the workers willing at it, so extra demand does not close it while the floor holds. Do not offer demand deficiency — it is the one cause a rise in aggregate demand does remove, which is what the question is contrasting the others with.'],
  [B9, 'Discuss', 14, 'Discuss the costs of unemployment to an economy. (14 marks)',
    'Discuss requires an argument supported by a chain of reasoning, with different viewpoints recognised (WEC12 Appendix 6). Build the costs across the groups the specification names: consumers lose income and those still in work spend cautiously; workers suffer skills decay that lowers earnings for years after the spell; public finances lose tax receipts and pay more support at once; the economy produces at a point inside its production possibility frontier, so output that was possible is not made; and society carries health, family and regional costs that no figure records. Then recognise the other viewpoints: some unemployment is frictional and is the cost of a labour market in which people can move; firms gain cheaper and more available labour; and the size of the cost depends on the cause, on how long spells last and on whether unemployment is concentrated in particular regions. Reach a conclusion about which costs dominate for the economy in the question.'],
  [B10, 'Evaluate', 20, 'Evaluate whether a persistent current account deficit should be a matter of concern for a government. (20 marks)',
    'Evaluate requires arguments to be reviewed and weighed, with a supported judgement (WEC12 Appendix 6). The case for concern: a deficit means more is paid out to the rest of the world than comes in, it has to be financed, and if it reflects a loss of competitiveness from inflation above trading partners it will not close on its own. The case against: a deficit can reflect strong demand at home rather than weak exports; it can reflect investment in imported capital goods that raises future output; and a country whose industry is largely foreign-owned can run a trade surplus and a current account deficit at the same time, as this chapter’s figures do, which says more about ownership than about competitiveness. Weigh the two on nameable conditions: the size of the deficit relative to GDP, how long it has persisted, what is behind it, and how easily it is financed. A judgement that depends on those conditions is what this command word asks for; a judgement that a deficit is simply good or simply bad is not.'],
];

export const PRACTICE = P.map(([block, command, marks, question, guidance]) => ({
  id: id('practice', question), block, command, marks, question, guidance,
}));

/* ── flashcards ────────────────────────────────────────────────────────────── */
// Cards are rewritten in place and never deleted while the concept survives, because progress rows
// point at them (the packet-13 rule). The March cards on the three measurement methods, on RPI
// against CPI and on the components of the HDI are dropped rather than rewritten: there is no
// concept underneath them that this specification asks for.
const card = (front, back) => ({ id: id('card', `${front}|${back}`), front, back });

export const FLASHCARDS = [
  card('What is GDP?', 'The total value of goods and services produced <strong>inside a country</strong> over a period of time. A flow, not a stock: it counts what was produced, not what is owned.'),
  card('What is economic growth?', 'The <strong>rate of change of real GDP</strong>. Not the level of GDP, and not a nominal figure — a measure that rose whenever prices rose could not answer the question growth is asked.'),
  card('What is GNI and how does it differ from GDP?', '<strong>Gross National Income</strong> is income received by a country’s <strong>residents</strong>, wherever earned. GDP draws its boundary around the <strong>territory</strong>; GNI around the <strong>residents</strong>.'),
  card('What is the difference between real and nominal GDP?', '<strong>Nominal</strong> is at the prices of the year itself; <strong>real</strong> is at the prices of one fixed base year. Only real GDP measures output, because only it holds prices constant.'),
  card('Why can real GDP rise while real GDP per capita does not?', 'Because the <strong>population</strong> rose at the same rate. Growth above population growth raises output per person, growth equal to it leaves it unchanged, and growth below it lowers it.'),
  card('What is the difference between value and volume?', '<strong>Value</strong> is measured in money; <strong>volume</strong> in quantities. They can move in opposite directions — more barrels shipped for less money — so a figure in dollars cannot tell you what happened to output.'),
  card('What has to be done before two countries’ growth can be compared?', 'Convert to <strong>one currency</strong>, compare <strong>real</strong> with real, use <strong>per capita</strong> figures where the question is about people, and do not mix a growth rate with a level.'),
  card('What is a purchasing power parity?', 'The conversion rate at which a given <strong>basket of goods costs the same</strong> in two countries. It compares incomes by what they buy rather than by what the currency trades for.'),
  card('What is the difference between negative growth and a falling growth rate?', '<strong>Negative growth</strong> means real output is <strong>smaller</strong> than before. A <strong>falling rate</strong> means output is still larger than before and grew by less than it did.'),
  card('What is the definition of a recession?', '<strong>Two consecutive quarters of negative economic growth.</strong> Two, one after the other, measured quarterly, with output smaller than the quarter before.'),
  card('Name the limitations of GDP as a measure of living standards.', '<strong>Never counted</strong>: unpaid work, undeclared activity, resources used up. <strong>A total cannot show</strong>: distribution, what the spending was for, leisure.'),
  card('What are indicators of national happiness and wellbeing?', 'Measures of how life is <strong>experienced</strong> rather than what is produced: life satisfaction, life expectancy, education, leisure, reported health. Used <strong>alongside</strong> GDP, and they ask rather than count.'),
  card('What is the relationship between real incomes and subjective happiness?', '<strong>Positive and flattening.</strong> Satisfaction rises with real income everywhere and rises less and less: extra income adds most where there is least of it.'),
  card('What is the difference between inflation, deflation and disinflation?', '<strong>Inflation</strong> — a sustained rise in the general price level. <strong>Deflation</strong> — a sustained fall in it. <strong>Disinflation</strong> — a fall in the <strong>rate</strong>, with prices still rising.'),
  card('How is a consumer price index calculated?', 'Weight each group by its share of spending, <strong>multiply each weight by its price index</strong>, add the results, and <strong>divide by the total weight</strong>. Inflation is then the percentage change in that index.'),
  card('What is the commonest error in calculating inflation from an index?', 'Subtracting <strong>100</strong> in a year that is not the base year. Divide by the <strong>previous year’s index</strong>, not by 100 — the two agree only in the base year, which is why the error survives.'),
  card('What are the limitations of the CPI?', 'It is an <strong>average over one basket</strong>, so no household need experience it; the basket is <strong>fixed between reviews</strong>; <strong>quality changes</strong> are hard to price; buyers change what they buy; and it is a <strong>sample</strong>.'),
  card('What is the producer price index used for?', 'As an <strong>indicator of future trends</strong> in the rate of inflation. It measures prices at the point firms trade, and a cost reaches a firm before it reaches a shelf.'),
  card('Name the three causes of inflation.', '<strong>Demand-pull</strong> — aggregate demand rises. <strong>Cost-push</strong> — the cost of producing each unit rises. <strong>Excessive growth of the money supply</strong> — money grows faster than output.'),
  card('Name the three causes of deflation.', '<strong>Falling aggregate demand</strong>; an <strong>increase in aggregate supply</strong>; a <strong>fall in the money supply</strong>. Two lower output with prices and one raises it.'),
  card('How do you tell demand-pull from cost-push on the data?', 'By what <strong>real output</strong> did. Price level <strong>up with output up</strong> is demand-pull; price level <strong>up with output down</strong> is cost-push.'),
  card('How do you tell the two kinds of deflation apart?', 'Again by <strong>real output</strong>. Price level <strong>down with output down</strong> is falling aggregate demand; <strong>down with output up</strong> is an increase in aggregate supply.'),
  card('Name the eight groups affected by inflation and deflation.', '<strong>Consumers · the government · firms · workers · income distribution · investment · competitiveness · the current account</strong> of the balance of payments.'),
  card('Who gains and who loses from unexpected inflation?', '<strong>Borrowers gain</strong> — a fixed debt is repaid in money worth less. <strong>Savers, lenders and fixed incomes lose</strong> by the same amount. It moves real income rather than removing it.'),
  card('Why does investment fall under both inflation and deflation?', 'Under <strong>inflation</strong>, future returns become uncertain, and uncertainty discourages commitment. Under <strong>deflation</strong>, waiting is rewarded, so projects are postponed. Different reasons, same direction.'),
  card('What is the ILO definition of unemployment?', '<strong>Without a job · available to start work · actively seeking work.</strong> All three at once. Any paid work makes a person employed; not seeking or not available makes them inactive.'),
  card('What is underemployment?', 'Being <strong>in paid work</strong> and wanting more of it, or work that uses more of your skills. The underemployed are counted as <strong>employed</strong>, so underemployment moves no unemployment rate at all.'),
  card('What is each labour-market rate measured against?', '<strong>Unemployment rate</strong> — against the <strong>labour force</strong> (employed + unemployed). <strong>Employment</strong> and <strong>inactivity</strong> rates — against the <strong>working-age population</strong>. They do not sum to 100.'),
  card('Why can employment and the unemployment rate rise together?', 'Because <strong>net migration</strong> raises the labour force and employment at the same time. If the labour force grows faster than employment does, more people are in work and the rate is higher.'),
  card('Name the five causes of unemployment.', '<strong>Frictional · seasonal · structural · demand deficiency · real wage inflexibility.</strong> The first two resolve on their own; the other three do not.'),
  card('How do you identify structural unemployment from data?', 'High unemployment sitting alongside <strong>unfilled vacancies</strong> that need other skills or are in other regions. A shortage of demand would not leave vacancies unfilled.'),
  card('How do you identify demand-deficiency unemployment?', 'It appears <strong>across unrelated industries at once</strong> and moves with the economy. A cause common to industries with nothing in common has to be economy-wide.'),
  card('What is real wage inflexibility?', 'A wage held <strong>above the level at which everyone willing to work would be hired</strong>, so firms want fewer workers than are offering themselves. The most contested of the five causes.'),
  card('Name the six effects of unemployment.', '<strong>Consumers · firms · workers · public finances · resource utilisation and the PPF · society.</strong> The last two state the cost as lost output rather than lost income.'),
  card('Why does unemployment hit public finances twice?', '<strong>Less collected</strong> — income tax, taxes on spending and taxes on profits all fall. <strong>More paid out</strong> — support for the unemployed and for households on lower incomes. The gap widens with no decision taken.'),
  card('How is unemployment shown on a production possibility frontier?', 'As a point <strong>inside</strong> the frontier. The resources still exist, so the frontier has not moved; the economy is producing less than it could, and that output is not recoverable.'),
  card('What are the components of the balance of payments?', 'The <strong>current account</strong>, the <strong>capital account</strong> and the <strong>financial account</strong>. The current account is one component, not the whole.'),
  card('What is in the current account?', '<strong>Trade in goods · trade in services · primary income · secondary income.</strong> Trade is two lines of four, which is why a trade surplus and a current account deficit can coexist.'),
  card('What is the trade in goods and services balance?', 'The <strong>goods balance plus the services balance</strong>, with the sign of each kept. The two lines often point in opposite directions, and the balance is their sum.'),
  card('Is a current account deficit a bad thing?', '<strong>Not automatically.</strong> It means more was paid out than came in, which can reflect strong demand at home or investment in imported capital as easily as weak exports. What caused it is a separate question.'),
];

/* ── common mistakes ───────────────────────────────────────────────────────── */
const mistake = (title, mistakeText, correction, examTip) => ({
  id: id('mistake', title), title, mistake: mistakeText, correction, examTip,
});

export const MISTAKES = [
  mistake('Reading a Nominal Rise as Growth',
    'Students see GDP measured in dollars rise and conclude that the economy grew.',
    `A nominal figure rises whenever prices rise, whatever happened to output. Andara's year 3 is the case: nominal GDP rose ${pc(nominalGrowth(2))} and real GDP fell ${pc(realGrowth(2))}. Economic growth is defined on REAL GDP, at constant prices, precisely so that this cannot happen.`,
    'Check which figure the extract gives you. If it is in money and no price index is mentioned, say what would have to be true about prices for the conclusion to hold.'),
  mistake('Treating Total Growth as Rising Living Standards',
    'Students take a growth rate as evidence that people are better off.',
    `Total growth has to be set against population growth. Andara's real GDP rose ${pc(realGrowth(1))} in year 2 and real GDP per capita changed by ${pc(perCapitaGrowth(1))}, because the population rose at the same rate. The economy was larger and the average person was exactly where they started.`,
    'Use the per capita figure whenever the question is about living standards, and say so. If the extract gives only the total, say what the population would have to have done.'),
  mistake('Calling Falling Inflation Deflation',
    'Students describe inflation falling from 6% to 2% as deflation.',
    `Prices are still rising at 2%, so that is inflation, and the fall in the RATE is disinflation. Deflation requires the index itself to fall below the previous year. Andara's index went ${idx(CPI_SERIES[0])} → ${idx(CPI_SERIES[1])} → ${idx(CPI_SERIES[2])}: inflation both years, disinflation in the second, deflation in neither.`,
    'Look at the index, not the rate. A falling rate with a rising index is disinflation; a falling index is deflation.'),
  mistake('Subtracting 100 From an Index That Is Not the Base Year',
    'Students calculate inflation by taking 100 off whatever index they are given.',
    `That gives the change since the BASE year, not the rate over the last one. From ${idx(CPI_SERIES[1])} to ${idx(CPI_SERIES[2])} the rate is (${idx(CPI_SERIES[2])} − ${idx(CPI_SERIES[1])}) ÷ ${idx(CPI_SERIES[1])} × 100 = ${pc(INFLATION_Y3)}, not the ${pc(r2(CPI_SERIES[2] - 100))} that subtracting 100 would give.`,
    'Write down which year you are dividing by before you divide. The two methods agree only in the base year, which is why the error survives to the year where it matters.'),
  mistake('Naming a Cause of Inflation Without Using the Output Figure',
    'Students assert that inflation is demand-pull or cost-push from the price data alone.',
    'The price level rises in both cases, so the price data cannot separate them. Real output is what does: up with prices is demand-pull, down with prices is cost-push. The same test separates the two deflations — output down is falling aggregate demand, output up is an increase in aggregate supply.',
    'Quote both figures from the extract before naming the cause. A data question that gives an output figure alongside a price figure is asking for exactly that inference.'),
  mistake('Dividing the Unemployed by the Working-Age Population',
    'Students calculate an unemployment rate against the wrong denominator.',
    `The unemployment rate is measured against the LABOUR FORCE — the employed plus the unemployed. For Andara that is ${UNEMPLOYED} ÷ ${LABOUR_FORCE} = ${rate(unemploymentRate())}. Dividing by the working-age population of ${WORKING_AGE}m gives 3.75%, a different figure for a different question. The employment and inactivity rates DO use the working-age population, which is where the confusion starts.`,
    'Write the denominator down before dividing. If the three rates you have calculated add to 100, you have used the same denominator for all three and at least one is wrong.'),
  mistake('Expecting Underemployment to Raise the Unemployment Rate',
    'Students add the underemployed to the unemployed when calculating a rate.',
    `Underemployed people have paid work, so the ILO definition counts them as employed. Andara's ${UNDEREMPLOYED}m part-time workers wanting full-time work change no rate at all. That is precisely why underemployment is measured separately: the unemployment rate cannot show it.`,
    'Say that underemployment leaves the rate unchanged and that this is why it is collected as its own measure. That sentence is the point of the distinction.'),
  mistake('Drawing Unemployment as a Frontier Shifted Inward',
    'Students show unemployment by moving the production possibility frontier itself.',
    'The frontier shows what the economy COULD produce, and unemployed workers still exist, so it has not moved. Unemployment is a point INSIDE the frontier: output that is possible and is not being made. Only when skills decay and capital is scrapped for good does the frontier itself move inward.',
    'Mark the economy clearly inside the curve and label the gap. If your diagram has moved the frontier, you have drawn a loss of capacity rather than a failure to use it.'),
  mistake('Treating the Current Account as the Balance of Payments',
    'Students use the two terms as though they were interchangeable.',
    `The balance of payments has three components — current, capital and financial — and the current account is one of them, with four lines of its own. A country can run a trade in goods and services surplus of ${bn(tradeInGoodsAndServices())} and a current account deficit of ${bn(Math.abs(currentAccount()))} in the same year, as the chapter's figures do, because primary and secondary income are in the current account too.`,
    'Answer about the account the question names. If it says current account, the income lines are in scope; if it says trade balance, they are not.'),
  mistake('Concluding That a Current Account Deficit Means Weak Competitiveness',
    'Students read a deficit as evidence that a country cannot compete.',
    'A deficit means more was paid out than came in, and strong demand at home raises imports just as effectively as weak exports do. It can also reflect imported capital goods bought to raise future output, or profits paid to foreign owners of domestic industry, neither of which says anything about competitiveness.',
    'Say what the deficit means, then use the extract to say what caused it. An Evaluate on whether it matters is judged on the size, how long it has lasted and what is behind it.'),
];

/* ── extras ────────────────────────────────────────────────────────────────── */
/*
 * `reorder.source` requires a reorder's items to paraphrase a flow in the same subsection or an
 * extras chain, in the same order — a sequence the student was actually taught. Seven of this
 * section's eleven reorders sit in a subsection that carries a flow; these chains are the source for
 * the other four, and for the arithmetic a student is most likely to want to see end to end.
 */
export const EXTRAS = {
  chains: [
    {
      title: 'How a cost travels from a raw material to a shop price',
      steps: [
        'The price of a raw material rises.',
        'The producer price index records higher input prices.',
        'Firms raise the prices of the finished goods they sell on.',
        'The consumer price index records higher prices in shops.',
      ],
      result: 'The producer index leads the consumer index because a cost reaches a firm before it reaches a shelf',
    },
    {
      title: 'How structural unemployment develops',
      steps: [
        'An industry declines or its production moves elsewhere.',
        'The jobs it provided disappear and do not return.',
        'The new jobs appearing need different skills, or are in a different region.',
        'Workers stay unemployed although vacancies exist.',
      ],
      result: 'Unemployment alongside unfilled vacancies is the signature of a mismatch rather than a shortage of jobs',
    },
    {
      title: 'How net migration moves employment and the unemployment rate together',
      steps: [
        `${MIGRATION.workingAge}m people of working age arrive.`,
        `${MIGRATION.joinLabourForce}m of them look for work and join the labour force, taking it to ${mLabourForce()}m.`,
        `${MIGRATION.findWork}m of them find work within the year, taking employment to ${mEmployed()}m.`,
        `The labour force grew faster than employment, so the unemployment rate rises to ${rate(mUnemploymentRate())}.`,
      ],
      result: 'More people in work and a higher unemployment rate, both true of the same year',
    },
    {
      title: 'How a nominal rise can hide a real fall',
      steps: [
        `Prices across the economy rose, taking the index from ${idx(GDP_INDEX[1])} to ${idx(GDP_INDEX[2])}.`,
        'The same output would therefore sell for more dollars.',
        `Nominal GDP rose ${pc(nominalGrowth(2))}, to ${bn(NOMINAL[2])}.`,
        `Valued at constant prices, real GDP fell ${pc(realGrowth(2))}, to ${bn(realAt(2))}.`,
      ],
      result: 'Economic growth is defined on real GDP precisely so that a price rise cannot be read as growth',
    },
    {
      title: 'How a weighted basket becomes a rate of inflation',
      steps: [
        'Survey households to find what they spend their money on, and weight each group by its share.',
        `Multiply each weight by its price index: ${BASKET.map((g) => weighted(g).toLocaleString('en-GB')).join(', ')}.`,
        `Add them and divide by the total weight: ${TOTAL.toLocaleString('en-GB')} ÷ ${weightSum(BASKET)} = ${idx(CPI)}.`,
        `Take the percentage change from the previous year's index to get inflation of ${pc(INFLATION)}.`,
      ],
      result: `Re-weighted to a household spending more on food the same prices give ${idx(CPI_HOUSEHOLD)}, which is what "an average" means`,
    },
    {
      title: 'How a trade surplus sits inside a current account deficit',
      steps: [
        `Trade in goods is ${bn(BOP.goods)} and trade in services is ${bn(BOP.services)}.`,
        `Added with their signs, trade in goods and services is ${bn(tradeInGoodsAndServices())} — a surplus.`,
        `Primary income is ${bn(BOP.primary)} and secondary income is ${bn(BOP.secondary)}.`,
        `All four lines together give a current account of ${bn(currentAccount())} — a deficit.`,
      ],
      result: 'The income lines outweighed the trade surplus, which is why 4b and 4c are distinguished from one another',
    },
  ],
};
