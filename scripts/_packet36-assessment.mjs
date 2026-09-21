/**
 * PACKET 36 — managing-finance: the quiz bank, ten practice items, the flashcards, the common
 * mistakes and the extras.
 *
 * ════ THE QUIZ ════
 *
 * `topFix-04` names five defects and every one of them is answered structurally rather than by
 * hand, because a hand fix leaves the next edit free to reintroduce it.
 *
 *   - *"Q15 asks for net profit on data with no interest or tax, and Q0 calls the identical sum
 *     operating profit."* That is `quiz-01` and `accuracy-01` as well, and it is the section's
 *     central confusion rather than one question's wording. The bank is authored off
 *     `_packet36-util.mjs`, where the three profits are three functions of the same statement, so a
 *     question can only ask for a figure the ladder actually produces.
 *   - *"Dedupe Q5/Q17 and Q9/Q13."* Every stem is checked against every other at the same token
 *     Jaccard `quiz.near-dup` uses, before the validator sees the bank.
 *   - *"Replace the three Evaluate-MCQs whose correct option is given away by its length."* No stem
 *     opens with an essay command word, and the runner measures how often the key is the longest
 *     option and fails the build above chance.
 *   - *"Remap block 4 quizIndices from [3] to a business-failure item and block 3 practiceIndices
 *     away from the gearing question."* Both pins are DERIVED from each item's own `block` tag
 *     (packet 30's method), so a liquidity question cannot appear at the end of the failure chapter
 *     and an untaught question cannot appear anywhere.
 *   - *"Q19 claims raising current liabilities improves working capital."* It does not move working
 *     capital at all, and the arithmetic that shows it is in `FIRM.supplierCredit`.
 *
 * ════ THE PRACTICE ════
 *
 * `topFix-01` asks for the gearing and the ROCE/asset-turnover/dividend-yield questions to go, and
 * for four new ones. The deletions are right — `practice-01` and `practice-02` were confirmed by
 * packet 0 and the reason is `bus_spec.txt:1229-1236`, which puts gearing and ROCE in 3.3.2, Unit 3,
 * while asset turnover and dividend yield are 0 hits in the whole specification. The four new ones
 * are all below.
 *
 * **One clause of it is refused.** It asks for "a 10/12-mark Assess". This is Unit 2, and the
 * census (`bus_spec.txt:2238-2245`) carries 12 for Units 3 and 4 only: "Assess 10 [Units 1/2], 12
 * [Units 3/4]". A packet that took the finding at its word would have shipped a tariff that does
 * not exist on WBS12.
 *
 * `practice-03` is the live Assess whose guidance says "No explicit judgement mark", which steers
 * students away from the thing the command word is built around. The census wording is "leading to
 * a supported judgement", and every Assess item here says so — as a requirement of the COMMAND
 * WORD, which Appendix 6 states and which is citable, never as a claim about what a marker credits
 * (`MARK_CLAIM`, packet 17, re-affirmed by packets 29, 30 and 35).
 *
 * Guidance is two paragraphs throughout. The first is the scaffold a student sees above an empty
 * box in guided mode and it carries no figure and no allocation; the mark scheme is paragraph two
 * onward (`practice.opening`, CONTENT-GATE Layer 1b item 6).
 */
import {
  id, hash8, money, qty, pct, ratio, days, sentence,
  FIRM, PROFITS, INTERNAL_CAUSES, EXTERNAL_CAUSES,
} from './_packet36-util.mjs';
import { B1, B2, B3, B4, B5 } from './_packet36-content.mjs';

const F = FIRM;

const qi = (block, question, options, explanation) => ({ id: id('quiz', question), block, question, options, explanation });

/*
 * EVERY ITEM IS AUTHORED WITH ITS KEY FIRST and the key is then DEALT into a position. The live
 * bank's `quiz.histogram` finding is what hand-picked positions produce; ranking items by a hash of
 * their own stem and taking the rank modulo four gives an even spread that is stable across builds
 * and that nobody had to choose.
 */
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
  /* ── the pre-test pool: three items, unpinned, FIRST in the array ──────── */
  /*
   * All three are answerable from the opening chapter, which every student reaches before anything
   * else. `structure-07` is that the live quiz tests the statement of financial position and working
   * capital, neither of which the live content teaches; a pre-test drawn from chapter one cannot do
   * that, because chapter one is the first thing the student is given.
   */
  qi(null, 'Gross profit is calculated as:',
    ['revenue less cost of sales', 'revenue less all of the costs of running the business', 'revenue less cost of sales and interest', 'the profit left for the owners at the end of the year'],
    'Only what the goods sold cost to obtain comes off at this step. Taking the running costs off as well produces the operating profit, and taking interest off as well produces the profit for the year, so each of the other three describes a rung further down the ladder.'),
  qi(null, 'Which figure does the specification also call net profit?',
    ['Profit for the year', 'Operating profit', 'Gross profit', 'Revenue less cost of sales'],
    'The leaf is written as "profit for the year (net profit)", so the two names label one line: the figure left after interest. Operating profit sits one rung above it and is the same number only for a business that has borrowed nothing.'),
  qi(null, 'A statement of comprehensive income differs from a statement of financial position because it:',
    ['covers a period of trading rather than a single date', 'lists what a business owns rather than what it earns', 'is prepared only by businesses that have borrowed', 'shows cash movements rather than profit'],
    'One is a record of flows between two dates and the other is a photograph taken on one. That is why a question containing the word "during" is about the statement of comprehensive income and a question about what is held or owed is about the statement of financial position.'),

  /* ── Block 1 · Profit ─────────────────────────────────────────────────── */
  qi(B1, `A wholesaler reports revenue of ${money(F.revenue)}, cost of sales of ${money(F.costOfSales)} and other operating expenses of ${money(F.operatingExpenses)}. No interest figure is given. The largest profit that can be worked out from this is:`,
    [`an operating profit of ${money(F.operatingProfit)}`, `a profit for the year of ${money(F.operatingProfit)}`, `a gross profit of ${money(F.grossProfit)}`, `a profit for the year of ${money(F.profitForYear)}`],
    'The ladder stops where the data stops. Both subtractions the table supports can be made, and taking the other operating expenses off as well gives the operating profit; the rung below needs an interest figure, and inventing one to reach it is answering a question the data was never able to ask.'),
  qi(B1, 'Which of these belongs in cost of sales for a tile wholesaler?',
    ['The shipping paid to bring the tiles into the warehouse', 'The salary of the warehouse manager', 'The rent paid on the warehouse', 'The interest paid on the warehouse loan'],
    'Cost of sales is what the goods that were sold cost to obtain, freight included. The other three are owed whichever tiles were sold and in most years whether any were, so they sit below the gross profit line — and the interest below the operating profit line as well.'),
  qi(B1, 'Two wholesalers trade identically, but one has borrowed heavily and the other has not. They will report:',
    ['the same operating profit and different profits for the year', 'the same profit for the year and different operating profits', 'different figures on every line of the statement', 'identical statements, because interest is not a cost'],
    'Interest comes off between the two figures, so everything above it is untouched by how the business was financed. That is exactly why the operating line is the fair one for comparing firms and the line beneath it is not.'),
  qi(B1, `${F.name} pays ${money(F.interest)} of interest on a loan of ${money(F.loan)}. The rate it is paying is:`,
    [pct(F.interestRate), pct(F.gpm), '20%', '2%'],
    `The rate is the interest divided by the amount borrowed — ${money(F.interest)} over ${money(F.loan)}, which is ${pct(F.interestRate)}. Dividing the interest by revenue instead gives ${pct((F.interest / F.revenue) * 100)}, and ${pct(F.gpm)} is the gross profit margin: a rate on borrowing has the amount borrowed underneath it, not the sales.`),
  qi(B1, 'The specification\'s own statement of comprehensive income contains no line for:',
    ['tax', 'interest', 'cost of sales', 'other operating expenses'],
    'Appendix 9 runs revenue, cost of sales, gross profit, other operating expenses, operating profit, interest, profit for the year, and stops. A figure worked out after tax is a figure no data table on this paper will ask for or supply.'),

  /* ── Block 2 · Profitability ──────────────────────────────────────────── */
  qi(B2, `${F.name} has a gross profit of ${money(F.grossProfit)} on revenue of ${money(F.revenue)}. Its gross profit margin is:`,
    [pct(F.gpm), pct(F.opm), '53.8%', '65%'],
    `The margin divides the profit by the revenue and multiplies by a hundred. Dividing by cost of sales instead gives 53.8%, a number that compares with nothing because nobody else calculates it that way, and 65% is the cost of sales as a share of revenue rather than the profit.`),
  qi(B2, 'The gap between a firm\'s gross profit margin and its operating profit margin is a measure of:',
    ['what running the business costs, as a share of revenue', 'what the goods themselves cost, as a share of revenue', 'the cost of the firm\'s borrowing', 'how quickly the firm collects what it is owed'],
    'Only the other operating expenses come off between those two lines, so the distance between the margins is exactly those expenses expressed as a rate. The cost of the goods is the gap above, and the cost of borrowing is the gap below.'),
  qi(B2, `A wholesaler cuts its price by ${pct(F.priceCut)} and sells exactly as many tiles. Its operating profit:`,
    [`falls to ${money(F.competitionProfit)}, because no cost fell with the price`, `is unchanged, because the same tiles were sold`, `falls by ${pct(F.priceCut)}, in line with the price`, `falls to ${money(F.demandProfit)}, in line with the revenue lost`],
    `Revenue falls by ${money(F.revenue * F.priceCut / 100)} and both costs stay where they were, so the whole reduction lands on the profit line. A twentieth off the price has taken half the operating profit, which is why price is the most dangerous lever a business has.`),
  qi(B2, 'A firm cuts its price, sells far more, and reports a higher operating profit with a lower operating profit margin. This shows that:',
    ['profit is an amount and profitability is a rate', 'the calculation contains an error somewhere', 'the firm has become more efficient at buying', 'the extra sales were made at a loss'],
    'Revenue and cost of sales both grew, so the amount kept rose while the share of each dollar kept fell. Nothing is wrong and nothing was sold at a loss: the business is simply working harder for every dollar it now earns.'),
  qi(B2, 'Which action raises the profit amount and lowers every margin?',
    ['Cutting the price and selling considerably more', 'Dropping the product line with the smallest margin', 'Negotiating a lower price from the supplier', 'Repaying part of the loan early'],
    'Only cutting the price and selling considerably more grows revenue and cost of sales together. Dropping a weak line and buying better both widen a gap on the statement rather than lengthening it, and repaying a loan cannot touch the two trading margins at all.'),

  /* ── Block 3 · Cash and the statement of financial position ───────────── */
  qi(B3, `${F.name} earned ${money(F.profitForYear)} of profit for the year and its bank balance fell by ${money(Math.abs(F.cashMovement))}. The most likely explanation is that it:`,
    ['bought inventory and assets, and sold on credit', 'made an arithmetic error in one of the statements', 'paid the whole profit out to its owners', 'was trading at a loss for most of the year'],
    'Profit is recorded when a sale is made and cash moves when money changes hands, so a year of buying tiles, buying equipment and waiting to be paid can easily consume more cash than the trade produced. Both figures are correct and they are measuring different things.'),
  qi(B3, 'Repaying part of a bank loan has what effect on the statement of comprehensive income?',
    ['None, because repaying borrowed money is not a cost', 'It reduces the profit for the year by the amount repaid', 'It reduces the operating profit by the amount repaid', 'It reduces the gross profit by the amount repaid'],
    'Only the interest on borrowing is a cost; returning the sum borrowed simply reduces what is owed. The money certainly leaves the bank, which is the whole point of the distinction between profit and cash.'),
  qi(B3, 'Which of these is a current liability?',
    ['A supplier invoice due in six weeks', 'A bank loan repayable in four years', 'The warehouse the business trades from', 'Tiles waiting on the racks to be sold'],
    '"Current" means falling due within twelve months, so the six-week invoice qualifies and the four-year loan does not. The other two are assets rather than liabilities, and one of them is not even a current asset.'),
  qi(B3, `${F.name} has current assets of ${money(F.currentAssets)} and current liabilities of ${money(F.currentLiabilities)}. Its working capital is:`,
    [money(F.workingCapital), money(F.currentAssets), money(F.cash), money(F.profitForYear)],
    `Working capital is one subtraction: what arrives within the year less what falls due within it. It is not the current assets on their own, and it is certainly not the ${money(F.cash)} actually in the bank, most of the cushion being tiles and unpaid invoices.`),
  qi(B3, 'A business with working capital of ' + money(F.workingCapital) + ' and ' + money(F.cash) + ' in the bank:',
    ['can pay an invoice today only up to ' + money(F.cash), 'can pay an invoice today up to ' + money(F.workingCapital), 'has no liquidity problem of any kind', 'is trading at a loss'],
    'Working capital is a cushion and most of it is committed: tiles nobody has bought and invoices nobody has paid. Only one line on the statement of financial position settles a bill on the day, and it is the smallest of the three current assets here.'),

  /* ── Block 4 · Liquidity ──────────────────────────────────────────────── */
  qi(B4, `A wholesaler holds ${money(F.inventory)} of inventory, is owed ${money(F.receivables)}, has ${money(F.cash)} in the bank and owes ${money(F.currentLiabilities)} within the year. Its acid test ratio is:`,
    [ratio(F.acidTest), ratio(F.currentRatio), ratio(F.jit.acidTest), ratio(F.sellAsset.currentRatio)],
    `The acid test takes the inventory out of the top and leaves ${money(F.currentAssets - F.inventory)} against ${money(F.currentLiabilities)}. Leaving the tiles in gives the current ratio instead, which is the same arithmetic answering a much less demanding question.`),
  qi(B4, 'Inventory is excluded from the acid test ratio because it:',
    ['must be sold to somebody before it becomes money', 'is usually worth more than the statement says', 'is not owned outright until the supplier is paid', 'cannot be counted as an asset at all'],
    'Trade receivables are sales already made and cash is already money; inventory is neither. It is the one current asset with a further transaction standing between it and the bank account, which is exactly what the stricter measure is testing for.'),
  qi(B4, `A firm takes ${F.creditExtraDays} more days to pay its suppliers, holding ${money(F.creditExtra)} in the bank. Its working capital:`,
    ['does not change, because cash and trade payables rise together', `rises by ${money(F.creditExtra)}, because the cash is in the bank`, `falls by ${money(F.creditExtra)}, because more is owed`, 'rises, because the current ratio improves'],
    `Both sides of the subtraction grow by the same amount, so the answer to it is the same as before. What does change is the current ratio, which falls from ${ratio(F.currentRatio)} to ${ratio(F.supplierCredit.currentRatio)}: adding equal amounts to both sides drags every ratio towards one to one.`),
  qi(B4, `Factoring ${money(F.receivables)} of trade receivables for a ${pct(F.factorFeeRate)} fee takes the bank balance to ${money(F.factoring.cash)}. Its effect on the acid test ratio is that it:`,
    [`falls slightly, from ${ratio(F.acidTest)} to ${ratio(F.factoring.acidTest)}`, `rises sharply, because there is far more cash`, `does not move, because nothing left the business`, `rises to ${ratio(F.jit.acidTest)}, the same as cutting inventory would`],
    `Both trade receivables and cash are already counted in the measure, so one quick asset has simply become another — minus the fee, which is the only real change. It is the clearest proof in the topic that being able to pay and scoring well on a ratio are different things.`),
  qi(B4, `Cutting inventory from ${days(F.inventoryDays)} of cover to ${days(F.jitDays)} releases ${money(F.jitReleased)} of cash. The current ratio afterwards is:`,
    [`unchanged at ${ratio(F.currentRatio)}`, `higher, at ${ratio(F.sellAsset.currentRatio)}`, `higher, at ${ratio(F.jit.acidTest)}`, `lower, at ${ratio(F.supplierCredit.currentRatio)}`],
    'Tiles became cash and both are current assets, so the top of the ratio is exactly what it was and the bottom has not moved either. The acid test is the measure that responds, because it counts one of those two assets and refuses the other.'),

  /* ── Block 5 · Business failure ───────────────────────────────────────── */
  qi(B5, 'Overtrading means that a business:',
    ['grows faster than its working capital can fund', 'sells its goods below what they cost to buy', 'borrows more than its assets are worth', 'trades in more countries than it can manage'],
    'Every extra sale buys inventory and creates a receivable before any money comes back, so growth consumes cash ahead of producing it. It is the cause of failure that happens to businesses whose order books are full, which is what makes it hard to see coming.'),
  qi(B5, `If ${F.name} grew ${pct(F.overtradeGrowth)} on the same terms, the extra funding it would need before any of the growth was paid for is:`,
    [money(F.overtradeNeed), money(F.overtradeInventory), money(F.profitForYear), money(F.workingCapital)],
    `Inventory rises ${money(F.overtradeInventory)} and trade receivables ${money(F.overtradeReceivables)}, while trade payables supply ${money(F.overtradePayables)} of it. The difference has to come from somewhere, and a year that produced no spare cash is not that somewhere.`),
  qi(B5, `An importer\'s home currency falls ${pct(F.currencyFall)} against the currency its goods are priced in. The line of its statement that moves first is:`,
    ['cost of sales', 'revenue', 'other operating expenses', 'interest'],
    `The same goods now cost more to buy, so cost of sales rises from ${money(F.costOfSales)} to ${money(F.currencyCostOfSales)} and every profit beneath it falls. An exporter facing the same movement would see it arrive at the top line instead, and in the opposite direction.`),
  qi(B5, 'A rise in interest rates is unusual among the causes of business failure because it:',
    ['leaves the operating profit completely unchanged', 'affects only businesses that are already unprofitable', 'cannot be planned for in any way', 'reduces revenue rather than raising a cost'],
    `Interest is taken off between operating profit and profit for the year, so a business hit by rates is trading exactly as well as it was the week before. That is the whole reason the specification's ladder separates the two figures.`),
  qi(B5, 'Two identical wholesalers are hit by the same three-week supplier failure and only one of them closes. The difference between them is most likely:',
    ['how much cash each had when the deliveries stopped', 'which of them had the higher profit last year', 'which of them had the larger warehouse', 'which of them had the better relationship with the supplier'],
    'The shock was identical, so what separates them is the ability to keep paying while no revenue arrives. Last year\'s profit settles no invoices, and a bigger warehouse is a non-current asset that cannot be turned into money in three weeks.'),
]);

/* ══ Practice ═════════════════════════════════════════════════════════════ */
/*
 * TEN ITEMS, EVERY BUSINESS COMMAND WORD AT THE CENSUS TARIFF FOR UNIT 2, two pinned to each
 * chapter. `structure-04` is that blocks 1 and 4 of the live section have no practice at all, so
 * two of the five live items never surface in Learn Mode; deriving the pins from each item's own
 * block tag and asserting that every block has one makes that unrepresentable.
 *
 * `structure-05` asks for the two the live set is missing: a Calculate on the ratios from a supplied
 * statement, and an Assess on the causes of a failure. Both are here. The Calculate also answers
 * `specGap-07`, which only asks whether extraction from a supplied statement is expected — Unit 2's
 * own description (`bus_spec.txt:816-821`) says students must apply the Appendix 9 ratios and that
 * the ratios will not be supplied, so the statement is given and the formula is not.
 */
const pr = (block, command, marks, question, guidance) => ({ id: id('practice', question), block, command, marks, question, guidance });

/*
 * THE TWO DATA EXTRACTS ARE EXPORTED, because the runner's pin check has to be able to take them
 * OUT before it asks which chapter an item belongs to. A Calculate on the two liquidity ratios is
 * a Liquidity item whose DATA is a statement of financial position, and scoring the data made it
 * look like a Cash and Statement of Financial Position item. The task is what the pin is about.
 */
export const SFP_EXTRACT = `A tile wholesaler's statement of financial position shows: inventory ${money(F.inventory)}, trade receivables ${money(F.receivables)}, cash ${money(F.cash)}, trade payables ${money(F.payables)}, bank overdraft ${money(F.overdraft)}, other payables ${money(F.otherPayables)}, non-current assets ${money(F.nonCurrentAssets)}, bank loan repayable in five years ${money(F.loan)}.`;

export const SCI_EXTRACT = `A tile wholesaler reports, for the year: revenue ${money(F.revenue)}, cost of sales ${money(F.costOfSales)}, other operating expenses ${money(F.operatingExpenses)}, interest ${money(F.interest)}.`;

export const PRACTICE = [
  pr(B1, 'Define', 2, "Define the term 'profit for the year'. (2 marks)",
    'Two marks means two separate things to say, and the second is not a rewording of the first. Settle first which figure it is measured from, and then what has been taken off to reach it. An answer that says "the profit a business makes" has said neither.\n'
    + 'Profit for the year is the profit remaining after interest has been deducted from operating profit (1 mark), and it is the figure available to the owners of the business (1 mark). The specification also calls it net profit, and either name is acceptable. An answer that describes it as the profit after all costs, without naming interest or the line it is measured from, has given one general statement rather than two specific ones.'),

  pr(B1, 'Calculate', 4, `${SCI_EXTRACT} Calculate the wholesaler's gross profit, operating profit and profit for the year. (4 marks)`,
    'Work down the ladder in the specification\'s own order rather than reaching for the figure the question names last. Each line you produce is the starting point for the next, so setting them out in sequence is both the method and the workings. Label each figure: three unlabelled numbers cannot be told apart.\n'
    + `Gross profit = revenue − cost of sales = ${money(F.grossProfit)} (1 mark). Operating profit = gross profit − other operating expenses = ${money(F.operatingProfit)} (1 mark). Profit for the year = operating profit − interest = ${money(F.profitForYear)} (1 mark). A further mark is available for correctly labelled workings that show the three subtractions in order. An answer that reaches ${money(F.profitForYear)} with no intermediate lines has produced the right figure and shown none of the method the question asked for.`),

  pr(B2, 'Calculate', 4, `${SCI_EXTRACT} Calculate the wholesaler's gross profit margin and its operating profit margin. (4 marks)`,
    'The two profits have to exist before the two margins can, so the first part of this is the calculation you have already met. Then be careful about what goes underneath: every margin in the specification has the same figure below the line, and it is not the one you just subtracted. Give each answer as a percentage.\n'
    + `Gross profit margin = (${money(F.grossProfit)} ÷ ${money(F.revenue)}) × 100 = ${pct(F.gpm)} (2 marks: one for the correct gross profit, one for the margin). Operating profit margin = (${money(F.operatingProfit)} ÷ ${money(F.revenue)}) × 100 = ${pct(F.opm)} (2 marks, on the same basis). Dividing by cost of sales rather than revenue gives 53.8% and 15.4%; those figures compare with nothing and score no marks for the margin, although a correctly calculated profit still scores.`),

  pr(B2, 'Analyse', 6, `A tile wholesaler is pushed by a competitor into cutting its prices by ${pct(F.priceCut)}. It expects to sell exactly the same quantity of tiles as before. Analyse the likely effect on its profitability. (6 marks)`,
    'This wants one chain, followed through, not a list of everything a price cut touches. Start by settling which lines of the statement move and which do not, because that is what makes the effect larger than the percentage suggests. Then carry the consequence down to the measure the question names rather than stopping at the profit figure.\n'
    + `The chain: a price cut reduces revenue while the quantity sold is unchanged, so cost of sales is unaffected; the whole reduction therefore falls on gross profit and passes through to operating profit, which drops from ${money(F.operatingProfit)} to ${money(F.competitionProfit)}. Because revenue has also fallen, the operating profit margin falls from ${pct(F.opm)} to ${pct(F.marginOn(F.competitionProfit, F.competitionRevenue))}. The strongest answers note that a ${pct(F.priceCut)} movement in price has removed about half the operating profit, and that this is a property of price cuts generally: no cost falls alongside them. Appendix 6 defines Analyse as a brief chain of reasoning and states that it does not require evaluation, so a judgement about whether the firm should have cut its price is not what is being asked for here.`),

  pr(B3, 'Construct', 4, 'Construct a labelled diagram of the working capital cycle for a wholesaler that buys goods, sells them on credit and collects payment. (4 marks)',
    'Decide first what the four stages are and which direction the arrows run, because a cycle drawn as a list is not a cycle. Every stage needs a label in the vocabulary of the statement of financial position rather than in everyday words. Show where the money is at each point, not just what the business is doing.\n'
    + 'A correct diagram is a closed loop with four labelled stages and arrows running one way: cash, then inventory, then trade receivables, then cash again (2 marks for the four correctly named stages, 1 mark for the loop closing and the arrows running consistently). A further mark is available for annotating the stages with a duration or an amount, showing that money is tied up for the length of the cycle. Appendix 6 defines Construct as requiring an accurately labelled diagram, so an unlabelled loop, however correct its shape, cannot receive the labelling marks.'),

  pr(B3, 'Explain', 4, 'A wholesaler reports a healthy profit for the year and its bank balance falls over the same period. Explain one reason why this can happen. (4 marks)',
    'One reason, developed, beats four reasons named. Choose a mechanism where the timing of the money and the timing of the record genuinely differ, and then follow it from the transaction to the bank balance. Saying that profit and cash are different things is the claim rather than the explanation.\n'
    + 'Any one of these, developed: selling on credit records the revenue when the sale is made while the cash arrives later, so a growing business is continually owed more than it has collected (up to 4 marks); buying inventory that has not yet been sold takes cash out without any cost being recorded, because the goods are still an asset; buying a non-current asset outright removes cash and is not an expense at all; repaying borrowed money reduces what is owed and is not a cost, only the interest being one. Appendix 6 defines Explain as requiring a brief explanation of cause or effect supported by details or examples, so the marks are for following one mechanism through rather than for the number of mechanisms named.'),

  pr(B4, 'Calculate', 4, `${SFP_EXTRACT} Calculate the wholesaler's current ratio and its acid test ratio. (4 marks)`,
    'Before any arithmetic, sort the figures you have been given: some of them belong in this calculation and some are there to see whether you know they do not. The test in both cases is the same word, and it appears on both sides of each ratio. Then remember what the second measure removes and why.\n'
    + `Current assets = ${money(F.inventory)} + ${money(F.receivables)} + ${money(F.cash)} = ${money(F.currentAssets)}; current liabilities = ${money(F.payables)} + ${money(F.overdraft)} + ${money(F.otherPayables)} = ${money(F.currentLiabilities)} (1 mark for each total). Current ratio = ${money(F.currentAssets)} ÷ ${money(F.currentLiabilities)} = ${ratio(F.currentRatio)} (1 mark). Acid test = (${money(F.currentAssets)} − ${money(F.inventory)}) ÷ ${money(F.currentLiabilities)} = ${ratio(F.acidTest)} (1 mark). The non-current assets and the five-year loan belong in neither calculation; including them gives ${ratio((F.currentAssets + F.nonCurrentAssets) / (F.currentLiabilities + F.loan))} and answers a question nobody asked.`),

  pr(B4, 'Discuss', 8, 'A wholesaler with a weak bank balance is advised to negotiate an extra month of credit from its suppliers. Discuss whether this would improve its liquidity. (8 marks)',
    'The advice is partly right and partly wrong, so decide first what "improve its liquidity" would actually mean here: a better bank balance, a larger cushion, or a better ratio. Work out what happens to each of those separately, because they do not all move the same way. Then weigh what the firm gives up by owing its suppliers for longer.\n'
    + `Level 1 describes supplier credit without applying it to the firm. Level 2 builds one chain: the money held back raises the bank balance, which is the immediate problem solved. Level 3 builds the competing chain and reaches the brief assessment Appendix 6 states the command word requires — the same amount is added to trade payables, so working capital is unchanged at ${money(F.supplierCredit.workingCapital)} and the current ratio falls from ${ratio(F.currentRatio)} to ${ratio(F.supplierCredit.currentRatio)}, while the acid test rises from ${ratio(F.acidTest)} to ${ratio(F.supplierCredit.acidTest)}, because adding equal amounts to both sides drags every ratio towards one to one; and against the advice, the credit can be withdrawn at any time, the supplier may raise prices or stop prioritising the firm, and nothing in the cycle itself has been fixed, so the problem returns next month. The assessment has to say whether the advice is sound for this firm rather than list both sides.`),

  pr(B4, 'Assess', 10, 'Assess the importance of managing liquidity for a small wholesaler whose sales are growing rapidly. (10 marks)',
    'Growth is the complication here, so the answer has to explain why a business selling more can be in more danger rather than less. Work out what a growing firm needs more of before the extra money arrives, and then weigh that against the arguments on the other side — the things a business would give up by holding liquidity it does not need. The question asks how important, which means the answer has to end somewhere rather than balance forever.\n'
    + `Level 1 covers a description of liquidity or of the two ratios with no application to a growing firm. Level 2 applies it: rising sales mean more inventory and more trade receivables before any cash returns, so growth consumes working capital — at these figures, growing ${pct(F.overtradeGrowth)} would need about ${money(F.overtradeNeed)} of extra funding. Level 3 builds competing chains: against the importance of liquidity, that cash held is cash not invested, that a strong order book improves access to borrowing, and that profitability is what makes the business worth keeping alive at all. Level 4 reaches a supported judgement, which is what Appendix 6 states the command word requires — for example that liquidity management is decisive for this firm specifically because failure is an event of a single day while low profitability is a condition that can be worked on over a year, with the judgement supported by the firm's own figures rather than asserted. A conclusion that repeats the arguments without deciding between them is not a judgement.`),

  pr(B5, 'Assess', 10, `A tile wholesaler with rising revenue closes after failing to pay a supplier. ${sentence(INTERNAL_CAUSES.slice(0, 4).map((c) => c.replace(/^poor management of /, 'weak ')).join(', '))} are all suggested. Assess the likely internal causes of its failure. (10 marks)`,
    'The trap in a case like this is treating the closure as the cause. Separate what finally happened from what made it possible, and be careful with the rising revenue: it is evidence for one of the candidate causes rather than evidence against all of them. The command word asks you to weigh the candidates against each other, so you need a reason for preferring one.\n'
    + 'Level 1 names internal causes from the specification with no reference to the case. Level 2 applies them: rising revenue with a payment failure points towards growth outrunning the working capital rather than towards falling demand. Level 3 weighs the candidates against one another — overtrading and weak cash flow management are hard to separate, since the second is how the first becomes fatal, while overestimation of sales and poor inventory control would both show as goods unsold rather than as revenue rising. Level 4 reaches the supported judgement Appendix 6 states the command word requires: which cause was decisive, why the evidence in the case favours it, and what would have had to be true for one of the others to be the answer instead. Listing all six causes with a sentence each cannot reach the upper levels, because nothing has been weighed.'),

  pr(B5, 'Evaluate', 20, 'A wholesaler that nearly closed last year after a supplier stopped delivering can either improve its liquidity or improve its profitability over the next twelve months, but does not have the management time to do both. Evaluate which it should prioritise if it is to avoid business failure. (20 marks)',
    'This is a choice, so the answer has to end with one. Build both cases properly before deciding: what improving each one would actually involve, what it would cost, and how quickly it would work. Watch for the fact that some actions affect both, and for the difference between a problem that closes a business and a problem that makes it a poor business — those are not the same kind of urgency.\n'
    + 'The internal and external causes of failure are the frame for this question rather than a separate topic: overtrading, poor management of cash flow, poor inventory control and supplier problems all end at the same moment, which is an invoice falling due that cannot be paid, while exchange rates and interest rates change what the firm earns without changing whether it can pay this week.\n'
    + `Level 1 describes liquidity and profitability separately with no reference to the choice. Level 2 applies each to the firm. Level 3 develops both cases against each other: for liquidity, that a firm closes on the day it cannot pay whatever its profit, that cutting inventory towards ${days(F.jitDays)} of cover or factoring receivables releases cash quickly, and that liquidity decides whether an unforecastable shock is survived; for profitability, that liquidity fixes are largely one-off while a better margin generates cash every year afterwards, that several of the liquidity moves carry a permanent cost such as a factor's fee or the fragility of holding very little inventory, and that a business which is not profitable is not worth rescuing. Level 4 reaches the perceptive conclusion Appendix 6 states the command word requires: a recommendation that separates the two by urgency and by permanence, notices that inventory control improves both at once and is therefore the first move whichever way the answer goes, and says what would change the recommendation — which here is how close the acid test is to saying the firm may not survive the year.`),
];

/* ══ Flashcards ═══════════════════════════════════════════════════════════ */
/*
 * `structure-08` IS THREE FLASHCARDS PRINTED TWICE: cards 19-21 are exact copies of 22-24. Ids here
 * are a hash of the front, so a duplicate front would collide and the runner's id check would fail
 * the build — the defect is unrepresentable rather than deleted. `structure-07` is that the live
 * cards test the statement of financial position and working capital, neither of which the live
 * content teaches; every card below is generated from the same module the content is.
 */
const card = (front, back) => ({ id: id('flashcard', front), front, back });

export const FLASHCARDS = [
  card('What are the three profits, and what comes off at each step?', `${PROFITS.map(([k, f]) => `${k} = ${f}`).join('; ')}. Nothing else comes off, and the specification's own statement has no tax line.`),
  card('Define gross profit.', 'Revenue less cost of sales: what is left once the goods that were actually sold have been paid for. Wages, rent and marketing are not in it.'),
  card('Define operating profit.', 'Gross profit less other operating expenses. It is the whole trading operation before the cost of borrowing, which is why it is the fair line for comparing two firms.'),
  card('Define profit for the year.', 'Operating profit less interest. The specification also calls it net profit, and both names appear on data tables. It is what is left for the owners.'),
  card('What is the statement of comprehensive income?', 'The profit ladder written out as a document, covering a period of trading rather than a single date. The specification prints the older name beside it: statement of comprehensive income (profit and loss account).'),
  card('Why can a data table with no interest figure not produce a profit for the year?', 'Because interest is the only thing taken off at that step. The last figure such a table supports is the operating profit, and inventing an interest line to go further is answering a question the data could not ask.'),
  card('Give the three profitability formulae.', 'Gross profit margin = (gross profit ÷ revenue) × 100. Operating profit margin = (operating profit ÷ revenue) × 100. Profit for the year margin = (profit for the year ÷ revenue) × 100. Revenue is underneath all three.'),
  card('What does the gap between the gross and operating margins measure?', `The other operating expenses, as a share of revenue. At ${F.name} the margins are ${pct(F.gpm)} and ${pct(F.opm)}, so running the business costs ${pct(F.gpm - F.opm)} of every dollar taken.`),
  card('What does the gap between the operating and final margins measure?', `The cost of borrowing. Here it is ${pct(F.opm - F.npm)} of revenue, which is the ${money(F.interest)} of interest on a ${money(F.loan)} loan. A firm that has borrowed nothing has no gap at all.`),
  card('What are the three ways to increase profits?', 'Charge more, sell more, or spend less. A price rise reaches profit in full; extra sales bring their own costs; spending less lifts either the gross or the operating line depending on which cost was cut.'),
  card('What is the difference between profit and profitability?', `Profit is an amount and profitability is a rate. Cutting a price and selling far more can raise the first and lower the second at the same time: more dollars kept, less of each dollar kept.`),
  card('Why is profit not the same as cash?', 'Profit is recorded when a sale is made or a cost is incurred; cash moves when money changes hands, on a different day. Selling on credit, buying inventory, buying assets and repaying loans all separate the two.'),
  card('Name four things that take cash without reducing profit.', 'Buying inventory not yet sold; buying a non-current asset outright; repaying the sum borrowed on a loan; paying an invoice recorded as a cost in an earlier year. Only the interest on a loan is a cost.'),
  card('What is the statement of financial position?', 'A list of what a business owns and owes on one date. Non-current assets plus current assets, less current liabilities, less non-current liabilities, gives net assets.'),
  card('What does "current" mean on a statement of financial position?', 'Within twelve months, on both sides. Current assets become cash within a year; current liabilities fall due within a year. Every liquidity measure in this topic uses only those two totals.'),
  card('Name the current assets and the current liabilities.', `Current assets: inventory, trade receivables, cash. Current liabilities: trade payables, bank overdraft, other payables. Appendix 8 settles the vocabulary, because the paper uses International Accounting Standards terminology.`),
  card('Define working capital.', `Current assets less current liabilities. At ${F.name} that is ${money(F.currentAssets)} less ${money(F.currentLiabilities)}, or ${money(F.workingCapital)} — almost none of which can actually be spent, because most of it is tiles and unpaid invoices.`),
  card('Describe the working capital cycle.', `Cash buys inventory; inventory is sold and becomes trade receivables; trade receivables are collected and become cash. Roughly ${days(F.inventoryDays)} plus ${days(F.receivableDays)} from paying for goods to being paid for them.`),
  card('Why does a growing business need more cash rather than less?', `Because every extra sale puts money into inventory and into what customers owe before any of it comes back. Growing ${pct(F.overtradeGrowth)} at these figures would need about ${money(F.overtradeNeed)} of extra funding first.`),
  card('Give the two liquidity formulae.', `Current ratio = current assets ÷ current liabilities. Acid test ratio = (current assets − inventory) ÷ current liabilities. Appendix 9 also calls the second one the liquid capital ratio, and neither is supplied in the examination.`),
  card('Why is inventory excluded from the acid test?', `Because it still has to be sold to somebody before it becomes money. Trade receivables are sales already made and cash is already money; inventory is the one current asset with another transaction still to come.`),
  card('What does the gap between the two liquidity ratios tell you?', `How much of the firm's comfort depends on selling what it is holding. ${F.name} shows ${ratio(F.currentRatio)} and ${ratio(F.acidTest)}, and the whole difference is ${money(F.inventory)} of tiles, about ${days(F.inventoryDays)} of cover.`),
  card('Name the four ways to improve liquidity the specification gives.', 'Selling assets, extending supplier credit terms, factoring, and inventory JIT. They are four different actions with four different effects, not a ranked list.'),
  card('What does selling an underused asset do to liquidity?', `Everything improves, because something that was not a current asset became one: cash to ${money(F.sellAsset.cash)}, working capital to ${money(F.sellAsset.workingCapital)}, the ratios to ${ratio(F.sellAsset.currentRatio)} and ${ratio(F.sellAsset.acidTest)}. The cost is the capacity given up.`),
  card('What does extending supplier credit terms actually change?', `The bank balance, and not the working capital: cash and trade payables rise by the same ${money(F.creditExtra)}, so the subtraction is unchanged. The current ratio falls to ${ratio(F.supplierCredit.currentRatio)}, because adding equal amounts to both sides drags any ratio towards one to one.`),
  card('What does factoring do, and what is odd about its effect?', `A factor buys the trade receivables and pays now, less a fee. Cash goes to ${money(F.factoring.cash)}, but one quick asset has become another minus the fee, so the acid test edges DOWN to ${ratio(F.factoring.acidTest)}. Being able to pay and scoring well on a ratio are different things.`),
  card('What does inventory JIT do to the two ratios?', `Nothing to the current ratio and a great deal to the acid test: tiles become cash, both are current assets, and only one of them is counted in the stricter measure. Here it moves from ${ratio(F.acidTest)} to ${ratio(F.jit.acidTest)}. The cost is having no buffer against a late supplier.`),
  card('Name the six internal causes of business failure.', `${sentence(INTERNAL_CAUSES.join(', '))}. The first is listed first because it is how most of the others become fatal.`),
  card('Name the eight external causes of business failure.', `${EXTERNAL_CAUSES.join(', ')}. None is inside the firm's control, and what decides the outcome is how long it can keep paying while disrupted.`),
  card('Define overtrading.', `Growing faster than the working capital can fund it. Revenue rises, inventory and trade receivables rise with it, and the cash arrives after the costs. It is the cause of failure that happens to firms whose order books are full.`),
  card('Why does a price cut do more damage than a larger fall in volume?', `Because no cost falls with it. A ${pct(F.priceCut)} price cut at ${F.name} takes operating profit to ${money(F.competitionProfit)}; a ${pct(F.demandFall)} fall in volume, twice the size, leaves ${money(F.demandProfit)}, because cost of sales falls alongside the revenue.`),
  card('Which cause of failure leaves the operating profit untouched, and why?', `A rise in interest rates. Interest is taken off between operating profit and profit for the year, so a firm hit by rates is trading exactly as well as it was: ${money(F.operatingProfit)} of operating profit and ${money(F.rateProfitForYear)} instead of ${money(F.profitForYear)}.`),
  card('How does a currency movement reach an importer\'s accounts?', `Through cost of sales. A ${pct(F.currencyFall)} fall in the home currency takes it from ${money(F.costOfSales)} to ${money(F.currencyCostOfSales)} and operating profit from ${money(F.operatingProfit)} to ${money(F.currencyProfit)}. The same movement helps an exporter, at the top line.`),
  card('What is the one thing every cause of business failure ends in?', 'An invoice falling due that the business cannot pay. That is why liquidity, rather than profit, decides which of two identical firms survives the same shock.'),
];

/* ══ Common mistakes ══════════════════════════════════════════════════════ */
/*
 * `structure-11` says the live misconceptions are mostly real student errors and names one filler —
 * "students assume having a good idea is enough", attached to a subsection about why new businesses
 * fail. It is not an exam misconception and it is not carried over. The seven below are each a
 * specific wrong sentence a student writes, with the arithmetic that refutes it.
 */
const mistake = (title, looksLike, why, instead) => ({ id: id('mistake', title), title, looks_like: looksLike, why, instead });

export const MISTAKES = [
  mistake('Treating net profit and operating profit as the same figure',
    '"Net profit, also called operating profit, is revenue minus cost of sales minus expenses."',
    `The specification's ladder puts interest between them. Operating profit is before interest; profit for the year, which is the same line as net profit, is after it. The two are the same number only for a business that has borrowed nothing, and ${F.name} shows ${money(F.operatingProfit)} against ${money(F.profitForYear)}.`,
    'Fix the vocabulary once: gross, then operating, then profit for the year (net profit). When a data table gives no interest figure, the last profit it can support is the operating profit.'),

  mistake('Putting overheads into cost of sales',
    '"Cost of sales is everything the business spent to make the sales: the goods, the wages and the warehouse rent."',
    'Cost of sales is only what the goods that were sold cost to obtain. Adding the running costs produces a "gross profit" that is really an operating profit, and then the next subtraction takes the same costs off twice.',
    'Ask of each cost: would it be owed if no goods had been sold at all? If yes, it belongs below the gross profit line.'),

  mistake('Using profit and profitability as synonyms',
    '"The firm can improve profitability by growing, because bigger firms make more profit."',
    'Profit is an amount; profitability is a rate. Cutting a price and selling far more raises the first and lowers the second, because revenue and cost of sales grow together while the share of each dollar kept shrinks.',
    'Read which of the two the question asked for. If it says profitability, the answer is about a margin, and growth is as likely to lower it as to raise it.'),

  mistake('Assuming a profitable business must be accumulating money',
    '"It cannot have run out of cash, because the accounts show a profit for the year."',
    `Profit is recorded when a sale is made; cash moves when money changes hands. ${F.name} earned ${money(F.profitForYear)} and its bank balance moved by ${money(F.cashMovement)}, because inventory and trade receivables rose, a ${money(F.assetBought)} asset was bought outright and ${money(F.loanRepaid)} of loan was repaid.`,
    'Treat the two documents as answering different questions. The statement of comprehensive income says whether the trade is worth doing; the statement of financial position says whether the firm can still be trading next month.'),

  mistake('Applying a two-to-one rule to every current ratio',
    '"The current ratio is 1.4:1, which is below the ideal of 2:1, so the business is in trouble."',
    'The specification asks for calculation and interpretation, and the interpretation is about this firm. What matters is what the current assets are made of and how fast they turn into money — a wholesaler holding two months of goods needs far more cover than a shop that sells for cash the same afternoon.',
    'Quote both ratios and say what the gap between them is made of. That is a statement about the business; a comparison with a remembered number is not.'),

  mistake('Writing that longer supplier credit improves working capital',
    '"Taking an extra month to pay suppliers increases working capital, because the cash stays in the business."',
    `Cash and trade payables rise by the same amount, so the subtraction gives exactly the same answer: ${money(F.supplierCredit.workingCapital)}, unchanged. What improves is the bank balance. The current ratio actually falls, from ${ratio(F.currentRatio)} to ${ratio(F.supplierCredit.currentRatio)}, because adding equal amounts to both sides of a ratio drags it towards one to one.`,
    'Work out both sides before claiming a direction. A move that adds to current assets and current liabilities together cannot change working capital at all.'),

  mistake('Blaming an external cause and stopping there',
    '"The business failed because of the downturn in construction."',
    'Every firm in the trade faced the same conditions and some of them are still open. The external event is the trigger; what decides the outcome is the position it landed on — how much cash was held, how much was owed within the year, how much was tied up in goods.',
    'Name the external cause, then say what internal weakness made it fatal here. A question about failure is asking for the second half, and an answer that stops at the first has given the easier one.'),
];

/* ══ Extras ═══════════════════════════════════════════════════════════════ */
/*
 * THE TWO REORDERS IN THIS SECTION ARE SOURCED FROM THE FIRST TWO CHAINS. `reorder.source` requires
 * the sequence to be taught by a flow or an extras chain in the same section, and neither reorder
 * sits on a subsection that prints a flow — a recall whose answer is on the screen above it is what
 * packets 26, 27 and 29 each had to fix.
 */
export const EXTRAS = {
  chains: [
    {
      title: 'Working down a statement of comprehensive income',
      steps: [
        `Revenue is the top line and everything else is measured against it: ${money(F.revenue)}.`,
        `Cost of sales comes off first — what the goods actually sold cost to obtain, ${money(F.costOfSales)} — and what is left is the gross profit, ${money(F.grossProfit)}.`,
        `Other operating expenses come off next: salaries, rent, insurance and marketing, ${money(F.operatingExpenses)}. What is left is the operating profit, ${money(F.operatingProfit)}.`,
        `Interest comes off last, because it is about how the business was financed rather than how it traded: ${money(F.interest)}. What remains is the profit for the year, ${money(F.profitForYear)}.`,
      ],
      result: `Three profits, one statement, and each one answers a different question. The order is not a convention — each line is the starting point for the next, which is why a question asking for the operating profit cannot be answered by taking interest off as well. And notice what never appears: the specification's own statement at Appendix 9 has no tax line.`,
    },
    {
      title: 'How an external shock becomes a closure',
      steps: [
        'A supplier stops delivering for three weeks, and at this point the business has done nothing wrong.',
        `Revenue stops while rent and salaries carry on: at ${money(F.dailyRevenue)} a trading day, ${F.supplierDaysLost} days costs ${money(F.supplierRevenueLost)} of revenue while ${money(F.operatingExpenses)} of annual operating expenses keeps accruing.`,
        `The bank balance runs down and the overdraft limit is reached — which for this firm means ${money(F.cash)} of cash and a ${money(F.overdraft)} facility, decided months earlier.`,
        'An invoice falls due that the business cannot pay, and the failure is this moment rather than the shock that started it.',
      ],
      result: `Two identical firms meet the same supplier failure and only one closes, so the shock cannot be the whole explanation. What separates them is the third step, which was settled long before the supplier failed. That is why every external cause in 2.3.3 · 3b is really a question about liquidity, and why "the market turned" is the beginning of an answer rather than the whole of one.`,
    },
    {
      title: 'Turning a statement of financial position into two ratios',
      steps: [
        `Find the current assets and ignore everything else: inventory ${money(F.inventory)}, trade receivables ${money(F.receivables)}, cash ${money(F.cash)}, giving ${money(F.currentAssets)}.`,
        `Find the current liabilities the same way: trade payables ${money(F.payables)}, overdraft ${money(F.overdraft)}, other payables ${money(F.otherPayables)}, giving ${money(F.currentLiabilities)}.`,
        `Current ratio = ${money(F.currentAssets)} ÷ ${money(F.currentLiabilities)} = ${ratio(F.currentRatio)}.`,
        `Acid test = (${money(F.currentAssets)} − ${money(F.inventory)}) ÷ ${money(F.currentLiabilities)} = ${ratio(F.acidTest)}.`,
        `Then say what the gap is: ${money(F.inventory)} of tiles, about ${days(F.inventoryDays)} of cover, which is how much of the comfort depends on selling them.`,
      ],
      result: `The ${money(F.nonCurrentAssets)} of non-current assets and the ${money(F.loan)} loan appear in neither ratio, and including them gives ${ratio((F.currentAssets + F.nonCurrentAssets) / (F.currentLiabilities + F.loan))} — a figure that answers no question in this topic. Unit 2's own description says these ratios will not be supplied in the examination, so the formulae have to be reproduced as well as applied.`,
    },
    {
      title: 'What each way of improving liquidity actually moves',
      steps: [
        `Start from where the firm is: working capital ${money(F.workingCapital)}, current ratio ${ratio(F.currentRatio)}, acid test ${ratio(F.acidTest)}, cash ${money(F.cash)}.`,
        `Sell an underused asset for ${money(F.assetSale)}: everything rises — working capital ${money(F.sellAsset.workingCapital)}, ${ratio(F.sellAsset.currentRatio)}, ${ratio(F.sellAsset.acidTest)}, cash ${money(F.sellAsset.cash)} — because a non-current asset became a current one.`,
        `Take ${F.creditExtraDays} more days to pay suppliers: working capital unchanged at ${money(F.supplierCredit.workingCapital)}, current ratio DOWN to ${ratio(F.supplierCredit.currentRatio)}, acid test UP to ${ratio(F.supplierCredit.acidTest)}, cash ${money(F.supplierCredit.cash)}.`,
        `Factor the trade receivables for a ${pct(F.factorFeeRate)} fee: cash leaps to ${money(F.factoring.cash)} while the acid test edges DOWN to ${ratio(F.factoring.acidTest)}, because one quick asset became another minus ${money(F.factorFee)}.`,
        `Cut inventory to ${days(F.jitDays)} of cover: current ratio unchanged at ${ratio(F.jit.currentRatio)}, acid test up to ${ratio(F.jit.acidTest)}, cash ${money(F.jit.cash)}.`,
      ],
      result: `Four moves, four different signatures, and two lessons that no list of the four can deliver. First, adding the same amount to both sides of the working capital subtraction leaves it alone and pulls every ratio towards one to one — which is why the supplier-credit row moves the two ratios in OPPOSITE directions. Second, the move that does most for the bank balance is the one that slightly worsens the measure of liquidity. A ratio is evidence about being able to pay; it is not the same thing as being able to pay.`,
    },
  ],
  evaluation: [
    {
      title: 'Judging whether a business is in trouble, from two documents',
      content: `Four questions, in this order, because each one can settle the next. FIRST: can it pay what falls due? That is the acid test rather than the current ratio, because inventory has to find a buyer before it settles anything — ${F.name} shows ${ratio(F.currentRatio)} and ${ratio(F.acidTest)}, and the second of those says that without selling ${money(F.inventory)} of tiles it can cover ${pct(F.acidTest * 100)} of a year's obligations. SECOND: is the trade worth doing? That is the operating profit margin, ${pct(F.opm)} here, and it is the right measure because it is unaffected by how the business was financed; a firm with a poor margin and good liquidity has time to fix something, and a firm with the reverse does not. THIRD: which direction is it moving? A single year's figures cannot answer this, which is why an exam case gives two — and the movement that matters most is not the profit but the working capital cycle, because ${days(F.inventoryDays)} of inventory lengthening to ${days(F.inventoryDays + 20)} consumes cash without appearing anywhere on the statement of comprehensive income. FOURTH: what happens if something goes wrong? A ${pct(F.priceCut)} price cut halves this firm's operating profit and a ${pct(F.currencyFall)} currency movement removes ${pct(((F.operatingProfit - F.currencyProfit) / F.operatingProfit) * 100)} of it, so the margin is not only low, it is fragile. Taken together those four give a judgement with evidence behind it, and the order matters because a business that fails the first question has run out of time to pass the others.`,
    },
    {
      title: 'Liquidity or profitability: which problem is the more urgent',
      content: `The two are not the same kind of problem and most answers treat them as rivals of equal weight. Liquidity is an event: a business closes on the day an invoice falls due and the money is not there, and nothing about last year's profit changes that. Profitability is a condition: a firm with a thin margin is a poor business, and it can be a poor business for years while somebody fixes it. That asymmetry is the argument for dealing with liquidity first, and it is why every one of the fourteen causes of failure in 2.3.3 · 3 ends in the same place however it began. But it is not the whole argument, and three things push the other way. The liquidity moves are mostly once-only: ${F.name} can sell a yard for ${money(F.assetSale)} or factor ${money(F.receivables)} of receivables, and having done either it cannot do it again, whereas a margin improved is cash generated every year afterwards. Several of them carry a permanent cost — a factor's fee, or the fragility of holding ${days(F.jitDays)} of inventory in a trade whose supplier problems are a named cause of failure. And a business that is not profitable is not worth rescuing: liquidity buys time, and time is only valuable if something is being fixed with it. The resolution is not a compromise but a sequence. Fix liquidity first when the acid test says the firm may not survive the year, and fix profitability first when it says it will — and notice that one action, cutting inventory from ${days(F.inventoryDays)} of cover to ${days(F.jitDays)}, releases ${money(F.jitReleased)} of cash AND removes the storage and write-off costs that were dragging the operating margin down. Where an action does both, it is the one to take before the choice has to be made at all.`,
    },
  ],
};
