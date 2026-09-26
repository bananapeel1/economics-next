/**
 * PACKET 54 — assessing-competitiveness assessment: the quiz bank, the practice set, the flashcards,
 * the common mistakes and the extras.
 *
 * ── THE BANK IS AUTHORED AGAINST THE FIVE CHAPTERS ─────────────────────────
 *
 * `quiz-01` (labour turnover) and `quiz-02` (empowerment) were correct items with no teaching
 * behind them. Both are kept in substance and now sit in chapters that teach them (4 and 5); the
 * empowerment item's odd distractor "Zero-hours contracts" is replaced by Consultation, as the item
 * asks. The live q9 (ROCE 8% against borrowing at 10%, `specGap-06`) is kept in substance in
 * chapter 3, where the comparison is now taught. Every item is tagged with its chapter; the runner
 * derives `quizIndices` from the tag. Keys are written first and DEALT into a position from a hash
 * of the stem (packet 36); no explanation names an option by letter or position.
 *
 * ── THE PRACTICE SET IS THE PAPER'S OWN SHAPE ──────────────────────────────
 *
 * `DECISIONS.md` Settled, 26 Sep 2026: practice is shaped like the real paper for the topic's unit.
 * 3.3.5 is Unit 3 (WBS13): Section A is one source-based set of 4 + 4 + 8 + 12 + 12 = 40, and Sections
 * B and C are one 20-mark Evaluate essay each (`audit/raw/ial-paper-structure.json`,
 * business.units_3_4). So seven items on ONE source, `EXTRACT`.
 *
 *   - `topFix-02` proposes Calculate ROCE (4), an Analyse on a bank loan (6), an Assess on the
 *     usefulness of ratio analysis to an investor (10) and an Evaluate on employee share ownership
 *     (20). 6 and 10 are Units 1-2 tariffs (Appendix 6, `bus_spec.txt:2218-2250`). Built: Calculate
 *     ROCE (4); the loan becomes the Evaluate on a second loan (20) and the Discuss on liquidity (8);
 *     the investor Assess at 12; the share-ownership Evaluate at 20.
 *   - `practice-02`: Bowman's Strategic Clock (0 hits in the specification) is gone and banned.
 *   - `practice-03`: both 20-markers name the firm and sit on its source; every item examines the
 *     section's own content (statements, ratios, workforce measures, HR strategies).
 *   - Guidance OPENS with a scaffold and no figure, allocation or level (`practice.opening`,
 *     CONTENT-GATE step 6). Items at 4 marks carry point allocations; items above 6 carry levels
 *     descriptors naming knowledge, application, analysis and evaluation — the shape packet 47 shipped
 *     for the same paper on 26 Sep. The 26 Sep marking ruling's KAA/Evaluation strands were read from
 *     the WEC11 (Economics) sample mark scheme; no Business split is recorded anywhere in the
 *     repository, `lib/ao-spec.js` ALLOCATION is not yet corrected, and `MARK_CLAIM` bans "KAA" from
 *     student prose, so none is invented here (see built.md).
 *   - `Discuss` asks for a brief assessment and never a conclusion (V036).
 */
import { id, hash8, FIRM, usd, usdm, units, pct, ratio } from './_packet54-util.mjs';
import { B1, B2, B3, B4, B5 } from './_packet54-content.mjs';

const F = FIRM;
const { L, T, PL, PT } = F;

/* ══ Quiz ════════════════════════════════════════════════════════════════ */

/** An item, authored KEY FIRST. `block` is null for the three pre-test items. */
const qi = (block, question, options, explanation) => ({
  id: id('quiz', question), block, question, options, explanation,
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
  /* ── the pre-test pool: three, unpinned, FIRST, answerable from chapter one ── */
  qi(null, 'Which line of the statement of comprehensive income is left once cost of sales is taken off revenue?',
    ['Gross profit', 'Operating profit', 'Profit for the year', 'Total equity'],
    'Revenue less cost of sales is gross profit. Operating profit comes only after other operating expenses are also deducted, profit for the year after interest as well, and total equity belongs to the statement of financial position.'),
  qi(null, 'On a statement of financial position, net assets are always equal to:',
    ['total equity', 'current assets', 'revenue', 'capital employed'],
    'Assets minus liabilities is what belongs to the owners, which is total equity. Capital employed adds the long-term loans to that, current assets are only part of what is owned, and revenue comes from the other statement.'),
  qi(null, 'A bank deciding whether to lend to a business would look most closely at:',
    ['whether operating profit comfortably covers interest', 'how many staff the business employs', 'the number of products it sells', 'how much it spends on advertising'],
    'A lender wants to know whether it will be repaid, so it sets the profit earned before interest against the interest due. Headcount, product range and marketing spending say little about that on their own.'),

  /* ── Chapter 1: reading the statements ── */
  qi(B1, 'Revenue is $5m, cost of sales is $2m and other operating expenses are $1.5m. Operating profit is:',
    ['$1.5m', '$3m', '$3.5m', '$0.5m'],
    'Revenue less cost of sales gives gross profit of $3m; taking off the other operating expenses leaves $1.5m. Stopping at gross profit, or deducting only the operating expenses from revenue, gives the wrong line.'),
  qi(B1, 'Which of these appears on the statement of financial position rather than the statement of comprehensive income?',
    ['Inventory held at the year end', 'Cost of sales for the year', 'Interest paid on loans', 'Revenue from sales'],
    'Stock held on one day is an asset, so it belongs to the statement of financial position. The other three are flows over the whole year, recorded in the statement of comprehensive income.'),
  qi(B1, 'A supplier deciding whether to offer 60 days\' credit is most interested in:',
    ['current assets compared with current liabilities', 'the value of the firm\'s buildings', 'the size of the firm\'s share capital', 'its revenue growth over five years'],
    'A supplier is owed money within weeks, so it wants to know whether short-term assets can meet short-term debts. Property, the owners\' original investment and long-run growth matter far less for a bill due in two months.'),
  qi(B1, 'A firm\'s total assets are $50m and its total liabilities are $32m. Its total equity is:',
    ['$18m', '$82m', '$32m', '$50m'],
    'Net assets, what is owned less what is owed, always equal total equity: fifty less thirty-two. Adding the totals, or quoting either one, ignores that the owners\' stake is what remains once every debt is taken off.'),

  /* ── Chapter 2: calculating the ratios ── */
  qi(B2, 'A firm\'s gross profit margin is unchanged, but its profit for the year margin falls. The most likely cause is:',
    ['higher overheads or interest', 'dearer raw materials', 'a cut in its selling prices', 'a rise in its cost of sales'],
    'Anything that changed gross profit relative to revenue would have moved the gross margin as well. Since that margin held, the extra cost sits below gross profit, in operating expenses or interest.'),
  qi(B2, 'Revenue is $2m and gross profit is $0.7m. The gross profit margin is:',
    ['35%', '65%', '0.35%', '53.8%'],
    'Gross profit divided by revenue, times one hundred: 0.7 over 2 is 35%. The other answers come from giving the share taken by costs, leaving out the ×100, or dividing by cost of sales instead of revenue.'),
  qi(B2, 'Current assets are $700,000, including inventory of $200,000. Current liabilities are $400,000. The acid test ratio is:',
    ['1.25:1', '1.75:1', '0.5:1', '3.5:1'],
    'The acid test takes the stock out before dividing: $500,000 of liquid assets against $400,000 due. Keeping the stock in gives the current ratio instead, and dividing by the stock itself measures nothing useful.'),
  qi(B2, 'Non-current liabilities are $9m and total equity is $21m. The gearing ratio is:',
    ['30%', '42.9%', '70%', '233.3%'],
    'Capital employed is the loans plus equity, $30m, and nine of that thirty is borrowed. Dividing the loans by equity alone overstates gearing, and the other two figures turn the ratio upside down.'),
  qi(B2, 'Operating profit is $3.6m, non-current liabilities are $6m and total equity is $24m. ROCE is:',
    ['12%', '15%', '60%', '1.2%'],
    'Capital employed is $30m, so ROCE is 3.6 over 30, times one hundred. Dividing by equity alone, or by the loans alone, leaves out part of the long-term money the profit was earned on.'),

  /* ── Chapter 3: using ratios to make decisions ── */
  qi(B3, 'Which of these would reduce a company\'s gearing ratio?',
    ['Issuing new shares to repay part of a loan', 'Taking a new bank loan to buy machinery', 'Paying a larger dividend out of reserves', 'Replacing a share issue with a ten-year loan'],
    'Repaying debt with money raised from new shares cuts non-current liabilities and adds to equity, so a smaller share of capital employed is borrowed. More borrowing, or shrinking the owners\' funds, pushes gearing up.'),
  qi(B3, 'A firm\'s ROCE is 7% and it can borrow at 9%. Borrowing more to expand would most likely:',
    ['reduce the profit left for shareholders', 'raise the return to its shareholders', 'improve its acid test ratio', 'lower its gearing ratio'],
    'Each borrowed dollar costs nine cents a year and earns about seven, so the owners bear the shortfall. New borrowing also raises gearing rather than lowering it, and does nothing lasting for liquidity.'),
  qi(B3, 'A bakery chain has an acid test ratio of 0.7:1. The best reason this may not be a concern is that:',
    ['it sells for cash daily and its stock lasts only days', 'its gross profit margin beats the industry average', 'its gearing ratio is below 50%', 'its buildings have risen in value'],
    'Money arrives from customers every day, faster than bills fall due, so a low acid test is normal in food retailing. Profitability, borrowing and property values do not tell you whether this month\'s bills can be paid.'),
  qi(B3, 'A firm delays paying its suppliers until just after its year end, so its current ratio looks stronger. This is an example of:',
    ['window dressing', 'historical data', 'inflation distorting the figures', 'a change in accounting policy'],
    'Timing a payment to flatter one day\'s statement is window dressing. The figures are not out of date, rising prices play no part, and the accounting method is unchanged; only the timing moved.'),
  qi(B3, 'Why is comparing the current ratio of a supermarket with that of a house builder of limited use?',
    ['Their normal trading cycles are very different', 'Supermarkets do not publish their accounts', 'The ratio cannot be calculated for builders', 'Builders have no current liabilities'],
    'A supermarket sells stock for cash within days while a builder may wait months to sell a house and be paid, so each has a different normal level. The other claims are untrue: both publish accounts and both owe short-term debts.'),

  /* ── Chapter 4: measuring the workforce ── */
  qi(B4, 'A shop employs an average of 40 staff and 8 leave during the year. Its labour turnover is:',
    ['20%', '16%', '25%', '8%'],
    'Leavers divided by the average workforce, times one hundred: 8 out of 40. Dividing by the 32 who stayed overstates it, and quoting the number of leavers is a count, not a rate.'),
  qi(B4, 'A team of 12 cleaners cleans 1,440 rooms a week. Labour productivity is:',
    ['120 rooms per cleaner per week', '1,440 rooms per week', '12 rooms per cleaner per week', '17,280 rooms per week'],
    'Output divided by the number of workers: 1,440 rooms shared among 12 cleaners. Total output is not productivity, and multiplying the two figures has no meaning.'),
  qi(B4, 'Of 60 staff employed at the start of a year, 45 are still employed at its end. The retention rate is:',
    ['75%', '25%', '133.3%', '45%'],
    'Retention is the share of the starting staff who stayed: 45 out of 60. A quarter is the share who went, and dividing the other way round gives a figure above one hundred.'),
  qi(B4, 'Staff are due to work 20,000 days in total and 800 days are lost to absence. Absenteeism is:',
    ['4%', '0.04%', '25%', '8%'],
    'Days lost over possible days, times one hundred: 800 out of 20,000. Leaving out the ×100 or dividing the other way round gives the other figures.'),
  qi(B4, 'Labour turnover is calculated as:',
    ['staff leaving ÷ average number of staff × 100', 'staff joining ÷ average number of staff × 100', 'days lost to absence ÷ possible days × 100', 'output ÷ number of employees'],
    'Turnover measures how many people went against the size of the workforce. Counting new joiners measures recruitment, and the other two formulas are absenteeism and productivity.'),
  qi(B4, 'After a chain installs faster ovens, output per baker rises but complaints about burnt bread double. This shows that productivity figures:',
    ['measure quantity, not quality', 'cannot be calculated for bakers', 'overstate output in every case', 'depend on the exchange rate'],
    'Output per worker counts how much is made, not whether it is any good, so it can rise while customers are worse served. Bakers\' output is easily counted, and nothing here concerns currencies.'),

  /* ── Chapter 5: HR strategies ── */
  qi(B5, 'Why might an employee share ownership scheme do little to raise day-to-day effort?',
    ['one worker\'s effort barely moves the share price', 'employees receive no dividends on their shares', 'the scheme lowers the firm\'s gearing', 'shares are given only to managers'],
    'The reward depends on the whole company\'s results, so one person working harder changes it very little. Employee shareholders do receive dividends, gearing is beside the point, and schemes usually cover all staff.'),
  qi(B5, 'The main risk of raising basic pay to cut labour turnover is that:',
    ['the cost rises for staff who would have stayed anyway', 'staff start taking more days off sick', 'output per worker falls straight away', 'managers can no longer consult staff'],
    'A pay rise goes to everyone, including the many who were never going to leave, so it can cost far more than the turnover it prevents. It does not by itself raise absence, cut output or stop consultation.'),
  qi(B5, 'Which HR strategy gives employees the authority to make decisions about their own work?',
    ['Empowerment', 'Consultation', 'Financial rewards', 'Employee share ownership'],
    'Handing staff the decision itself, within agreed limits, is empowerment. Consultation asks for their views while managers still decide, and the other two change what staff receive rather than what they control.'),
  qi(B5, 'Shares that employees lose if they leave within three years are designed mainly to:',
    ['improve retention', 'reduce absenteeism', 'raise output per worker', 'lower the wage bill'],
    'The reward is kept only by staying, so its target is keeping existing staff. It does little for attendance or daily output, and it adds to employment costs rather than cutting them.'),
  qi(B5, 'Managers ask shop staff for their views on new opening hours, then make the decision themselves. This is:',
    ['consultation', 'empowerment', 'employee share ownership', 'a financial reward'],
    'Staff give views and managers keep the decision, which is consultation. Had staff chosen the hours themselves it would be empowerment; nothing here changes their pay or gives them shares.'),
]);

/* ══ Practice ════════════════════════════════════════════════════════════ */

const pr = (block, command, marks, question, guidance) => ({
  id: id('practice', question), block, command, marks, question, guidance,
});

const replace = F.HT.avg * (F.rivalPay - F.shopPay) * 12;

/*
 * THE SOURCE. One extract carries every item, so a student meets the same firm seven times. Every
 * figure the items and their schemes need is here, and the runner checks that.
 */
export const EXTRACT = `Source A. ${F.name} runs a central bakery and 24 shops in ${F.home}. Extracts from its accounts, with last year in brackets: revenue ${usdm(T.revenue)} (${usdm(L.revenue)}); cost of sales ${usdm(T.cos)} (${usdm(L.cos)}); other operating expenses ${usdm(T.opex)} (${usdm(L.opex)}); interest ${usdm(T.interest)} (${usdm(L.interest)}); non-current assets ${usdm(PT.nca)} (${usdm(PL.nca)}); current assets ${usdm(PT.ca)} (${usdm(PL.ca)}), including inventory ${usdm(PT.inventory)} (${usdm(PL.inventory)}); current liabilities ${usdm(PT.cl)} (${usdm(PL.cl)}); non-current liabilities, all bank loans at ${pct(F.borrowRate)} a year, ${usdm(PT.ncl)} (${usdm(PL.ncl)}); total equity ${usdm(PT.equity)} (${usdm(PL.equity)}). This year it built a new central bakery, financed mainly by a bank loan, and won a supermarket contract at lower prices than its shops charge. Its shops employed an average of ${F.HT.avg} staff (${F.HL.avg}), of whom ${F.HT.leavers} (${F.HL.leavers}) left during the year; replacing each leaver costs ${usd(F.replaceCost)}. Absence lost ${units(F.HT.daysLost)} of ${units(F.HT.possibleDays)} possible working days (${units(F.HL.daysLost)} of ${units(F.HL.possibleDays)}). Its ${F.bakersT.staff} bakers made ${units(F.bakersT.loaves)} loaves a month (${F.bakersL.staff} bakers, ${units(F.bakersL.loaves)}). Shop staff earn ${usd(F.shopPay)} a month; the two largest rival chains pay ${usd(F.rivalPay)}. Most leavers named pay as a reason, and many said shift rotas were changed at a day's notice without anyone asking them. The directors are considering an employee share ownership scheme costing about ${usd(F.esopCost)} a year, whose shares are lost by anyone who leaves within three years, and a second new bakery, also to be financed by a bank loan.`;

export const PRACTICE = [
  pr(B1, 'Explain', 4, `${EXTRACT} Explain one reason why the bank that lends to ${F.name} would be interested in its statement of comprehensive income. (4 marks)`,
    'Pick one thing the bank needs to know and the line of the statement that tells it. Use the source to show what that line says about this business, then finish on what it means for the bank\'s decision.\n'
    + `Knowledge: a lender needs to know whether interest and repayments will be met, which depends on the profit the business earns (1 mark). Application: operating profit this year is ${usdm(T.op)} (${usdm(T.revenue)} − ${usdm(T.cos)} − ${usdm(T.opex)}) against interest of ${usdm(T.interest)} (1 mark). Analysis: operating profit covers the interest seven and a half times, so even a large fall in profit would leave the interest payable (1 mark). Analysis: but interest has risen from ${usdm(L.interest)} and the cover has fallen from twenty-five times, so the bank would watch the trend before lending again (1 mark). An answer about the loan's security or the assets on the statement of financial position has answered about the other statement and earns only the knowledge mark.`),

  pr(B2, 'Calculate', 4, `${EXTRACT} Calculate ${F.name}'s return on capital employed (ROCE) for this year. (4 marks)`,
    'Work out capital employed from the two figures that make it up, then find the profit line that comes before interest. Show each step on its own line and give the answer as a percentage.\n'
    + `Capital employed = non-current liabilities + total equity = ${usdm(PT.ncl)} + ${usdm(PT.equity)} = ${usdm(PT.ce)} (1 mark). Operating profit = ${usdm(T.revenue)} − ${usdm(T.cos)} − ${usdm(T.opex)} = ${usdm(T.op)} (1 mark). ROCE = ${usdm(T.op)} ÷ ${usdm(PT.ce)} × 100 (1 mark) = ${pct(PT.roce)} (1 mark). Using profit for the year (${usdm(T.pfy)}) gives ${pct((T.pfy / PT.ce) * 100)} and earns only the capital employed and method marks.`),

  pr(B3, 'Discuss', 8, `${EXTRACT} Discuss the significance for ${F.name} of the fall in its acid test ratio. (8 marks)`,
    'Calculate the ratio for both years from the source, then ask what kind of business this is and how quickly its money comes in. Weigh what makes the fall worrying against what makes it normal here, and leave room for a brief assessment of how significant it is.\n'
    + `Level 1: states that liquidity has worsened, with little use of the source. Level 2: knowledge and application — the acid test fell from ${ratio(PL.acid)} ((${usdm(PL.ca)} − ${usdm(PL.inventory)}) ÷ ${usdm(PL.cl)}) to ${ratio(PT.acid)} ((${usdm(PT.ca)} − ${usdm(PT.inventory)}) ÷ ${usdm(PT.cl)}), so there are 70 cents of liquid assets for each dollar due within a year. Level 3: analysis of both sides — current liabilities have grown faster than liquid assets, and with a larger loan and a second bakery planned the firm has less room if a bill falls due early; but a bakery sells for cash every day and its stock lasts days, so money arrives faster than bills fall due, and the supermarket contract may bring steady receipts. Level 4: a brief assessment weighing these, for example that the fall matters less for a cash business than the figure suggests, but that it would become serious if the second loan-financed bakery added to short-term debts. Discuss needs this assessment; it does not need a final recommendation.`),

  pr(B3, 'Assess', 12, `${EXTRACT} Assess the usefulness of ratio analysis to a potential investor in ${F.name}. (12 marks)`,
    'Decide what an investor wants to know, and which ratios from the source answer it. Build the case for what the ratios reveal and the case for what they cannot show about this business, and decide before you write what your judgement will turn on.\n'
    + `Level 1: knowledge of ratios or of their limitations, described generally. Level 2: application — ROCE fell from ${pct(PL.roce)} to ${pct(PT.roce)} and the profit for the year margin from ${pct(L.pfym)} to ${pct(T.pfym)}, while gearing rose from ${pct(PL.gearing)} to ${pct(PT.gearing)}; an investor can see profitability falling and financial risk rising. Level 3: analysis of both sides — the ratios allow quick comparison with last year and with other bakery chains and show where to ask questions, such as the low-priced supermarket contract; but they are historical, the new bakery may lift ROCE as its profits build up, one day's statement can be window-dressed, and they say nothing about the brand, the rising staff turnover or the contract's future. Level 4: evaluation reaching a supported judgement, for example that the ratios are useful for identifying what to investigate — margins and the loan — but not sufficient to decide, because the return on the new bakery depends on plans the ratios cannot show.\n`
    + 'A strong answer, in outline: the ratios show falling profitability and rising gearing, which an investor must know; but a ROCE still well above the cost of borrowing, and a new asset not yet earning in full, mean the fall may be temporary; the ratios are useful for framing the questions, and the answer depends on the new bakery\'s plans and the staff problems they cannot measure.'),

  pr(B4, 'Assess', 12, `${EXTRACT} Assess the usefulness to ${F.name}'s managers of its labour turnover and absenteeism figures. (12 marks)`,
    'Calculate both measures for both years from the source first, then ask what they tell managers and what they hide. Test them against the other evidence in the source, and reach a judgement on how far the figures alone can guide a decision.\n'
    + `Level 1: knowledge of labour turnover or absenteeism, described generally. Level 2: application — turnover rose from ${pct(F.HL.turnover)} (${F.HL.leavers} of ${F.HL.avg}) to ${pct(F.HT.turnover)} (${F.HT.leavers} of ${F.HT.avg}), and absenteeism from ${pct(F.HL.absence)} to ${pct(F.HT.absence)} of possible days; at ${usd(F.replaceCost)} a leaver, turnover cost ${usd(F.turnoverCostT)} this year against ${usd(F.turnoverCostL)}. Level 3: analysis of both sides — the figures show a problem growing fast, put a cost on it that can be set against the cost of a remedy, and the two rising together suggest a shared cause; but they do not say why staff go or stay away, whether leavers were new or experienced, or which shops are affected, and the leavers' comments about pay and rotas supply what the figures cannot. Level 4: evaluation reaching a supported judgement, for example that the figures are useful as a warning and for costing a response, but that choosing the response needs the reasons behind them, which the source's exit comments begin to give.\n`
    + 'A strong answer, in outline: both measures doubled or nearly so, and turnover alone now costs close to half a million dollars a year, which justifies acting; but the rates cannot show why or where, so they are most useful combined with the leavers\' reasons, which point at pay and rotas.'),

  pr(B3, 'Evaluate', 20, `${EXTRACT} Evaluate whether ${F.name} should finance its second new bakery with another bank loan. (20 marks)`,
    'Start with what another loan would do to the firm\'s gearing, interest and liquidity, using the source. Compare the return the business earns with what the loan would cost, consider the alternatives, and finish with a recommendation that says what would change it.\n'
    + `Level 1: describes loans or gearing with little reference to the source. Level 2: knowledge and application — gearing is already ${pct(PT.gearing)} (${usdm(PT.ncl)} of ${usdm(PT.ce)}), up from ${pct(PL.gearing)}; ROCE is ${pct(PT.roce)} against a borrowing rate of ${pct(F.borrowRate)}; interest has risen to ${usdm(T.interest)}, covered seven and a half times; the acid test is ${ratio(PT.acid)}. Level 3: analysis of both sides — while ROCE exceeds ${pct(F.borrowRate)}, each borrowed dollar adds to shareholders' profit, and a loan keeps control with the current owners; against that, a second loan could take gearing towards 50%, make interest a larger fixed cost when margins are already falling, and leave little room if the supermarket contract were lost; new shares or retained profit would avoid that at the cost of sharing ownership or waiting. Level 4: evaluation — weighs the size of the new loan against the firm's falling margins, falling ROCE and staff problems, considers that the first bakery has not yet shown its full return, and reaches a recommendation with the conditions that would change it.\n`
    + 'A strong answer, in outline: a loan is cheaper than the return the business earns and keeps control with the owners; but gearing is already a third, margins are falling and the first bakery has not yet proved itself; recommend waiting for the first bakery\'s results, or using a mix of retained profit and a smaller loan, unless ROCE recovers and the supermarket contract is secured for several years.'),

  pr(B5, 'Evaluate', 20, `${EXTRACT} Evaluate whether ${F.name} should introduce the employee share ownership scheme to reduce labour turnover. (20 marks)`,
    'Be clear about what the scheme is meant to fix and what the source says is causing the problem. Compare its cost with the cost of the turnover it targets, weigh it against the other strategies the source points to, and finish with a recommendation that says what would change it.\n'
    + `Level 1: describes employee share ownership in general terms. Level 2: knowledge and application — turnover is ${pct(F.HT.turnover)}, ${F.HT.leavers} leavers at ${usd(F.replaceCost)} each, costing ${usd(F.turnoverCostT)} a year; the scheme would cost about ${usd(F.esopCost)} a year, and its shares are lost by anyone who leaves within three years, which targets retention. Level 3: analysis of both sides — vesting gives staff a reason to stay and ownership may build commitment; but leavers name pay and last-minute rota changes, which the scheme does not touch, shop staff on ${usd(F.shopPay)} a month may value cash now over shares later, and the scheme costs about as much as the turnover it targets, so even keeping every leaver would not repay it; closing the pay gap would cost about the same, ${usd(replace)} a year, and does answer the reason most leavers give, while consulting staff on rotas or letting shop teams set them costs little. Level 4: evaluation — judges whether the scheme addresses the causes the source gives, compares it with cheaper strategies, and reaches a recommendation with conditions.\n`
    + 'A strong answer, in outline: the scheme would reward staying, but it costs as much as the turnover and misses the two reasons leavers give; matching rivals\' pay costs about the same and at least answers pay; start with consultation or empowerment over rotas and a targeted loyalty payment, and use the share scheme later to keep experienced staff, unless the leavers turn out to be the longer-serving staff it is designed to hold.'),
];

/* ══ Flashcards ══════════════════════════════════════════════════════════ */

const fc = (front, back) => ({ id: id('flashcard', front), front, back });

export const FLASHCARDS = [
  fc('What does the statement of comprehensive income show?', 'A year of trading: revenue − cost of sales = gross profit; − other operating expenses = operating profit; − interest = profit for the year.'),
  fc('What does the statement of financial position show?', 'One day\'s snapshot: assets and liabilities, and the net assets they leave, which always equal total equity (share capital + retained profits).'),
  fc('Current or non-current?', 'Current assets turn into cash, and current liabilities are due, within a year. Non-current assets are kept, and non-current liabilities are due, after more than a year.'),
  fc('Which stakeholders read which lines?', 'Shareholders: profit for the year and its trend. Lenders: operating profit against interest. Suppliers: current assets against current liabilities. Employees: revenue and profit. Government: profit.'),
  fc('State the formula for the gross profit margin.', 'Gross profit ÷ revenue × 100.'),
  fc('State the formula for the profit for the year margin.', 'Profit for the year ÷ revenue × 100. Profit for the year is what is left after interest; it is also called net profit.'),
  fc('State the formula for the current ratio.', 'Current assets ÷ current liabilities.'),
  fc('State the formula for the acid test ratio.', '(Current assets − inventory) ÷ current liabilities. Stock is left out because it may be slow to turn into cash.'),
  fc('What is capital employed?', 'The long-term finance a business uses: non-current liabilities + total equity.'),
  fc('State the formula for the gearing ratio.', 'Non-current liabilities ÷ capital employed × 100. Above about 50% is usually described as high.'),
  fc('State the formula for ROCE.', 'Operating profit ÷ capital employed × 100.'),
  fc('Why does ROCE use operating profit?', 'Capital employed includes the lenders\' money, so the return is measured before interest is paid to them.'),
  fc('When does borrowing add to the owners\' return?', 'When the business earns more on the money (ROCE) than the loan costs in interest. Below that rate, each borrowed dollar loses money for the owners.'),
  fc('Why can an acid test below 1:1 be safe?', 'A business that sells for cash daily and holds stock only briefly, such as a bakery or supermarket, receives money faster than its bills fall due.'),
  fc('Give four limitations of ratio analysis.', 'Historical data; window dressing; different accounting choices between firms; qualitative factors left out. Also: comparing different kinds of business, and inflation.'),
  fc('What is window dressing?', 'Timing transactions so that one day\'s statement of financial position looks better, such as delaying payments to suppliers until after the year end.'),
  fc('State the formula for labour productivity.', 'Output per period ÷ number of employees.'),
  fc('State the formula for labour turnover.', 'Number of staff leaving ÷ average number of staff employed × 100.'),
  fc('How is the retention rate calculated?', 'Staff employed at the start of the period who are still employed at its end ÷ staff employed at the start × 100.'),
  fc('State the formula for absenteeism.', 'Staff days lost to absence ÷ total possible staff working days × 100.'),
  fc('What are the costs of high labour turnover?', 'Recruitment, interviews and training for each replacement, lower output and slower service while new staff learn, and the loss of experienced people.'),
  fc('Give three limitations of the HR calculations.', 'They show what, not why; averages hide differences between shops or teams; they count quantity, not quality. Also: who leaves matters, and definitions differ between firms.'),
  fc('What financial rewards can target turnover, absence and productivity?', 'Higher basic pay (turnover); attendance bonuses (absenteeism); loyalty payments after set service (retention); output bonuses (productivity); profit-related pay.'),
  fc('How does employee share ownership aim to keep staff?', 'Shares often vest only after two or three years, and anyone who leaves earlier forfeits them, so staying pays.'),
  fc('Consultation or empowerment?', 'Consultation: staff give views, managers decide. Empowerment: staff decide about their own work within agreed limits.'),
  fc('What are the limits of empowerment?', 'Staff need training, information and trust; some do not want responsibility; managers lose some control; standards can drift between branches.'),
];

/* ══ Common mistakes — the fields MistakesTab.jsx reads: title, mistake, correction, examTip ═ */

const mk = (title, mistake, correction, examTip) => ({ id: id('mistake', title), title, mistake, correction, examTip });

export const MISTAKES = [
  mk('Quoting a ratio with nothing to compare it with',
    'Calculating a ROCE of 20% and calling it "good".',
    'A ratio means something only against last year, a rival, the industry or the cost of borrowing. 20% is strong against an 8% loan and weak if rivals earn 30%.',
    'Every time you calculate a ratio, write the comparison and the decision it points to in the next sentence.'),
  mk('Using operating profit for the profit for the year margin',
    'Calculating the profit for the year margin as operating profit ÷ revenue.',
    'Operating profit ÷ revenue is the operating profit margin, a Unit 2 ratio (2.3.3). The profit for the year margin uses profit for the year, after interest has been taken off.',
    'Write the formula with its profit line named before you put numbers in.'),
  mk('Treating a current ratio below 1:1 as a crisis',
    'Writing that any business with a current ratio below 1:1 cannot pay its debts.',
    'Businesses that sell for cash daily and hold stock briefly, such as bakeries and supermarkets, often run below 1:1 safely. A builder or furniture maker could not.',
    'Say what kind of business it is and how fast its money comes in before judging its liquidity.'),
  mk('Treating high gearing as always bad',
    'Recommending that any highly geared firm repay its loans.',
    'Borrowing adds to the owners\' return while ROCE beats the interest rate, and firms with steady sales carry high gearing safely. The danger is gearing combined with sales that can fall.',
    'Set ROCE against the interest rate and ask how steady sales are before judging gearing.'),
  mk('Using profit for the year in ROCE',
    'Dividing profit for the year by capital employed.',
    'Capital employed includes the lenders\' money, so ROCE uses operating profit, earned before interest is paid to them.',
    'Check that the profit line and the capital figure cover the same providers of finance.'),
  mk('Assuming retention is 100% minus labour turnover',
    'Writing that turnover of 30% means retention of 70%.',
    'Turnover counts every leaver against the average workforce; retention follows only staff present at the start. New starters who leave quickly raise turnover without touching retention.',
    'Calculate each from its own formula, and use the gap between them to say who is leaving.'),
  mk('Recommending a pay rise for every staffing problem',
    'Answering every question on turnover or absence with "pay staff more".',
    'Pay works when pay is the cause. If staff leave over management or rotas, consultation or empowerment may work better and cost far less.',
    'Find the cause in the case first, then match the strategy to it and cost it against the problem.'),
  mk('Treating consultation and empowerment as the same thing',
    'Describing a staff survey as "empowering" employees.',
    'In consultation staff give views and managers decide; in empowerment staff make the decision themselves within agreed limits.',
    'Ask who makes the final decision in the case: that tells you which strategy it is.'),
];

/* ══ Extras ══════════════════════════════════════════════════════════════ */
/*
 * The two chains marked below are what the two reorders drill (`reorder.source` finds a sequence the
 * section teaches in an extras chain, in the same order). They sit on the Extras tab, not on the
 * recall's own step, so the recall is not answerable by scrolling up.
 */
export const EXTRAS = {
  chains: [
    {
      title: 'From revenue to profit for the year',
      steps: [
        `Start from revenue: ${usdm(T.revenue)} of sales.`,
        `Take off cost of sales (${usdm(T.cos)}) to reach gross profit of ${usdm(T.gp)}.`,
        `Take off other operating expenses (${usdm(T.opex)}) to reach operating profit of ${usdm(T.op)}.`,
        `Take off interest (${usdm(T.interest)}) to reach the profit for the year: ${usdm(T.pfy)}.`,
      ],
      result: 'Each line removes one kind of cost; the margin on each line shows where the money went.',
    },
    {
      title: 'From a large loan to financial risk',
      steps: [
        'The business signs a large loan to build a new factory.',
        'From the first month, interest is owed on the loan as a fixed cost, whatever sales do.',
        'At the year end, the statement of financial position shows higher gearing, as more of capital employed is borrowed.',
        'In the year after those accounts, a downturn cuts operating profit, but the interest does not fall.',
        'Profit may no longer cover the interest due, and the firm is at risk.',
      ],
      result: 'Gearing is a measure of this risk: the higher it is, the less a fall in profit the business can absorb.',
    },
    {
      title: 'How a consultation runs',
      steps: [
        'Managers set out a proposed change, such as a new shift rota.',
        'Staff give their views, directly or through their representatives.',
        'Weighing those views, managers make the decision.',
        'The decision and the reasons for it are explained to staff.',
      ],
      result: 'Staff influence the decision without making it; skipping the feedback stage is what makes consultation feel empty.',
    },
    {
      title: 'From high turnover to a dearer loaf',
      steps: [
        'Experienced staff leave faster than before.',
        'Their replacements must be recruited and trained, at a cost for each.',
        'New staff work more slowly while they learn, so output per worker falls.',
        'With the same pay per worker and less output, the labour cost of each loaf rises.',
      ],
      result: 'Turnover and productivity are linked: a staffing problem becomes a cost problem, and then a competitiveness problem.',
    },
  ],
  evaluation: [
    {
      title: 'Is a falling ROCE a bad sign?',
      content: `Not always. ${F.short}'s ROCE fell from ${pct(PL.roce)} to ${pct(PT.roce)} in the year its new bakery was built, because the bakery counts in full as capital employed before its profits build up. Three things decide it. THE CAUSE: a new investment not yet earning in full, or falling margins in the existing business? THE COMPARISON: still well above the ${pct(F.borrowRate)} cost of borrowing, and how does it compare with rivals? THE TREND: does it recover next year as the bakery's output grows? A falling ROCE with falling margins, as here, needs both questions answered.`,
    },
    {
      title: 'Borrow or issue shares?',
      content: 'A loan keeps control with the current owners and costs only the interest, which adds to their return while ROCE beats the interest rate. But interest is due whatever happens to sales, so borrowing is riskier for a firm that is already geared, whose margins are falling or whose sales can fall. New shares carry no fixed cost but share future profit and control. The deciding questions are how geared the firm already is, how steady its sales are, and how much the owners value control.',
    },
    {
      title: 'Which HR strategy fits the problem?',
      content: `Match the strategy to the cause. Where staff leave for better pay elsewhere, financial rewards work, but a pay rise goes to everyone, including those who would have stayed. Where they leave because they are not listened to, consultation costs little; where decisions that affect them could be theirs, empowerment goes further, provided they are trained. Employee share ownership rewards staying over years, so it suits keeping experienced staff more than stopping new starters leaving. At ${F.short}, leavers named pay and rotas; matching rivals' pay would cost about as much as the turnover itself, so a targeted reward and a say over rotas answer the causes more cheaply, and more directly than shares.`,
    },
  ],
};
