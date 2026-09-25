/**
 * PACKET 31 — financial-planning: quiz, practice, flashcards, common mistakes, extras.
 *
 * THE LIVE BANK IS 25 QUIZ ITEMS AND FIVE PRACTICE QUESTIONS, AND THE AUDIT NAMES FIVE OF THE
 * THIRTY AS BROKEN:
 *
 *   - `quiz-01`: `quiz[3]` offered "£500" at positions 0 and 2 with only 0 marked correct, so a
 *     student picking the right answer was marked wrong. Closed by packet 0 on 11 September and NOT
 *     re-claimed here.
 *   - `quiz-02` / `structure-02`: the Sales Forecasting block pinned `quizIndices: [1]`, a
 *     break-even calculation from a chapter the student has not reached. Every index below is
 *     DERIVED from the item's own `block` tag, so a question cannot be pinned to a chapter that does
 *     not teach it — the fix packet 20 made at the root rather than in the pin.
 *   - `quiz-03` / `quiz-04`: the length tell and the absurd distractor. `q20`'s correct option was
 *     the only long, hedged, two-sided one; `q24`'s distractors were "they are illegal for
 *     businesses to use" and "they only cover a single day". Both are answerable with no knowledge
 *     of the topic at all. `quiz.long-correct` is a BLOCK rule and fires seven times on the live
 *     bank; every distractor below is a thing a student might actually believe.
 *
 * `practice-01` TO `-04` ARE FOUR TRUE CLAIMS AND ONE PRESCRIPTION THAT CANNOT BE BUILT.
 *
 *   - `Define` is 2 marks in IAL Business (bus_spec.txt:2220), so "Define the term break-even output
 *     (4 marks)" is wrong twice: the tariff, and `break-even output` which is **0 hits** in the
 *     specification. The term is "Break-even point" (:901).
 *   - There was no `Calculate` item at all, on a topic that is four calculations. There are two now.
 *   - `Assess` at 10 is right for Unit 2 (12 is Units 3-4), and a 10- or 20-mark question does need
 *     a stimulus for its application to be possible. Both have one.
 *   - And all three of `topFix-03`, `practice-02` and `practice-03` prescribe the same remedy:
 *     replace additive points-marking with "levels descriptors (K/A/An/E)" or "Level 1-4 across
 *     Knowledge, Application, Analysis, Evaluation". That is what a MARKER does, and it is banned
 *     from student-facing prose by this programme's own `MARK_CLAIM` check — packet 20 found "is
 *     levels-marked" shipped eight times, and packet 29 met the identical clause. So the guidance
 *     for every item above six marks says what the COMMAND WORD requires, quoting Appendix 6, which
 *     the specification states and which is therefore citable. `practice.levels` is satisfied the
 *     same way: no "(n marks)" allocation appears above six marks.
 *
 * EVERY EXPLANATION NAMES ITS OPTION BY CONTENT AND NEVER BY POSITION (packet 26). Items are
 * authored key-first, `placeKeys` deals the key into a slot and F074 shuffles again at render, so
 * "the second option" describes whatever happens to land there — which in packet 26 meant six
 * explanations telling a student who got the item RIGHT why their answer was wrong.
 *
 * THE EXTRAS CHAINS EXIST FOR THE REORDER RECALLS AND NOT THE OTHER WAY ROUND. `topFix-05` asks for
 * the two non-genuine reorders to be replaced and `topFix-04` asks for reorders "from the existing
 * flows" — and `lib/learn-steps.js:10` renders a recall below the teaching on the same step, so a
 * reorder whose sequence is a flow box on that screen is a copy-from-screen task. That is the defect
 * packet 26 was rejected for and packet 27 reproduced in paraphrase. This section therefore authors
 * NO flow bodies at all and both reorders are sourced from the chains below, which live in the
 * Extras tab and never on the step.
 *
 * EVERY CHAIN CARRIES `steps` (V028). `components/ExtrasTab.jsx:62` calls `chain.steps.map()` with
 * no guard, so a chain shaped as a judgement frame throws and takes the Extras tab down for an
 * entitled student. Packet 28's third chain does exactly that and it is staged. A free student never
 * reaches it because `previewMode` slices the list to one — which is why no walkthrough has caught
 * it, and why the component fix belongs to packet 30 and not to a content packet.
 */
import {
  id, hash8, money, qty, pct, signed, round2,
  PLANT, CHANGES, CHANGE, CUT, FORECAST, CASHFLOW, BUDGET,
  FORECAST_DIFFICULTIES, BREAKEVEN_LIMITS, CASHFLOW_USES, CASHFLOW_LIMITS,
  BUDGET_PURPOSES, BUDGET_DIFFICULTIES,
} from './_packet31-util.mjs';
import { B1, B2, B3, B4, B5 } from './_packet31-content.mjs';

const P = PLANT;
const qi = (block, question, options, explanation) => ({ id: id('quiz', question), block, question, options, explanation });

/*
 * EVERY ITEM IS AUTHORED WITH ITS KEY FIRST and the key is then DEALT into a position. Hand-picking
 * positions produces exactly the lumpy distribution `quiz.histogram` looks for; ranking items by a
 * hash of their own stem and taking the rank modulo four gives an even spread that is stable across
 * builds and that nobody had to choose.
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
   * `PRETEST_HEADROOM` is three unclaimed items and `spare` takes the first three the pins have not
   * claimed, scanning from position 0 — so the pre-test's three have to be the first unpinned items
   * in the authored array. All three are answerable from chapter 1, which every student reaches
   * before anything else, so the pre-test cannot contain a question about untaught material.
   */
  qi(null, 'Sales revenue is calculated as:',
    ['selling price multiplied by sales volume', 'selling price minus variable cost per unit', 'total cost divided by output', 'sales volume minus the break-even point'],
    `Revenue is money, and it is the product of the two figures the specification names separately: the price each unit sold for and how many were sold. Price minus variable cost per unit is contribution, and total cost divided by output is average cost — both are per-unit figures, not a total.`),
  qi(null, 'For one month at a bottling plant, which of these is a fixed cost?',
    ['the insurance premium on the factory', 'the concentrate used in each case', 'the bottles and caps', 'the electricity used while the line runs'],
    `The test is whether OUTPUT moves the cost. An insurance premium agreed for the month is owed whether the line bottles nothing or runs flat out. Concentrate, packaging and the power drawn by a running line all rise case by case, so all three vary with output.`),
  qi(null, 'Average cost falls as output rises mainly because:',
    ['the fixed costs are spread over more units', 'the variable cost per unit falls as more are made', 'the selling price rises with output', 'total cost stops rising once output is high enough'],
    `Only the fixed half is being divided by a bigger number; the variable cost per unit is the same at every output, which is what makes it variable. Total cost keeps rising as long as anything is being made, and the selling price is a decision rather than a function of output.`),

  /* ── chapter 1: Sales, Revenue and Costs ──────────────────────────────── */
  qi(B1, `A plant sells ${qty(18000)} ${P.units} at ${money(6.5)} each. Its sales revenue is:`,
    [money(117000), money(108000), money(120000), money(2769.23)],
    `Revenue is ${money(6.5)} × ${qty(18000)} = ${money(117000)}. ${money(108000)} is ${qty(18000)} at the plant's usual ${money(P.price)}, and ${money(120000)} is ${qty(P.actual)} at ${money(P.price)} — both are revenue figures for a different price or a different volume.`),
  qi(B1, `Fixed costs are ${money(P.fc)} a month and variable cost is ${money(P.vcu)} a ${P.unit}. Total cost at ${qty(P.actual)} ${P.units} is:`,
    [money(P.tc(P.actual)), money(P.tvc(P.actual)), money(P.fc), money(round2(P.fc + P.vcu))],
    `Total cost is the fixed costs plus the total variable cost: ${money(P.fc)} + ${money(P.vcu)} × ${qty(P.actual)} = ${money(P.fc)} + ${money(P.tvc(P.actual))} = ${money(P.tc(P.actual))}. ${money(P.tvc(P.actual))} leaves the fixed costs out altogether, and ${money(round2(P.fc + P.vcu))} adds one case's variable cost instead of ${qty(P.actual)} cases'.`),
  qi(B1, `With the same costs, average cost at ${qty(25000)} ${P.units} is:`,
    [money(P.ac(25000)), money(P.vcu), money(P.ac(P.actual)), money(round2(P.fc / 25000))],
    `Average cost is total cost divided by output: ${money(P.tc(25000))} ÷ ${qty(25000)} = ${money(P.ac(25000))}. ${money(P.vcu)} is the variable cost per case and leaves the fixed costs out; ${money(round2(P.fc / 25000))} is the fixed cost per case and leaves the variable costs out; ${money(P.ac(P.actual))} is the average cost at ${qty(P.actual)} ${P.units}.`),
  qi(B1, `A plant cuts its price from ${money(P.price)} to ${money(CUT.price)} and sales rise from ${qty(P.actual)} to ${qty(CUT.q)} ${P.units}. Which is true?`,
    ['revenue rises and profit falls', 'revenue and profit both rise', 'revenue and profit both fall', 'revenue falls and profit rises'],
    `Revenue goes from ${money(P.tr(P.actual))} to ${money(CUT.tr)}, up ${money(CUT.revenueGain)}. Profit goes from ${money(P.profit(P.actual))} to ${money(CUT.profit)}, because the extra ${qty(CUT.q - P.actual)} ${P.units} each carried ${money(P.vcu)} of variable cost. The two sides of the calculation move opposite ways, which is why the specification names volume and revenue separately.`),
  qi(B1, 'Which of these raises sales VOLUME without changing the price?',
    ['supplying a wholesaler in a region the plant does not yet reach', 'reducing the price to match the cheapest rival', 'raising the price to signal a better product', 'offering a discount on orders above a hundred cases'],
    `Widening distribution puts the same product at the same price in front of buyers who could not get it before. Matching a rival's price and discounting large orders are both price changes, and raising the price is a price change in the other direction.`),

  /* ── chapter 2: Sales Forecasting ─────────────────────────────────────── */
  qi(B2, 'A sales forecast is best described as:',
    ['an estimate of sales volume for a future period', 'a record of what was sold in the last period', 'a target the sales team is contractually committed to', 'the output at which a firm covers all of its costs'],
    `A forecast is forward-looking and it is a volume. A record of the last period is where a forecast often starts, but it is not the forecast. The output at which all costs are covered is the break-even point, which is a different calculation on a different chapter.`),
  qi(B2, 'Which of these is a consumer trend rather than an action of a competitor?',
    ['buyers steadily moving from sweetened drinks to lower-sugar ones', 'a rival cutting its wholesale price for six months', 'a rival winning a listing with the plant\'s largest customer', 'a rival launching a single-serve pack'],
    `A consumer trend is a lasting change in what buyers WANT. The other three are all changes in what buyers are OFFERED, which is the third factor — and the specification lists them separately because they have different answers.`),
  qi(B2, 'Rising real incomes in a plant\'s region would be expected to:',
    ['raise the forecast, because a casual purchase is made more often', 'lower the forecast, because buyers trade up to other categories', 'leave the forecast unchanged, since incomes are outside the firm', 'lower the forecast, because costs rise with incomes'],
    `More to spend means a low-cost everyday item is bought more often, so the forecast rises. A factor being outside the firm's control is a reason to include it rather than a reason to ignore it, and the effect on the firm's own wage costs is a separate question from the volume it will sell.`),
  qi(B2, `A base forecast of ${qty(FORECAST.base)} ${P.units} is adjusted by ${qty(Math.abs(FORECAST.factors[0].effect))} down for consumer trends, ${qty(FORECAST.factors[1].effect)} up for economic variables and ${qty(Math.abs(FORECAST.factors[2].effect))} down for a new competitor. The revised forecast is:`,
    [qty(FORECAST.revised) + ` ${P.units}`, qty(FORECAST.base - 2000 - 3000) + ` ${P.units}`, qty(FORECAST.base - 2000 + 1200) + ` ${P.units}`, qty(FORECAST.base + 1200) + ` ${P.units}`],
    `All three adjustments apply: ${qty(FORECAST.base)} − ${qty(2000)} + ${qty(1200)} − ${qty(3000)} = ${qty(FORECAST.revised)}. Each of the other three figures leaves one factor out — the rise, the competitor, or both falls — and the first of those is the commonest error here, because the factors do not all point the same way.`),
  qi(B2, 'A plant is forecasting sales of a product it has never sold. Its central problem is that:',
    ['there are no past sales of it to reason from', 'a forecast has to be expressed as a volume', 'forecasts are prepared before the period they cover', 'the sales team rather than the finance team prepares it'],
    `No history is the difficulty the specification's own leaf points at, and it is why a launch forecast rests on judgement about a comparable product. Being expressed as a volume and being prepared in advance are simply what a forecast IS, and who prepares it matters only through the interest they have in the answer.`),

  /* ── chapter 3: Break-Even ────────────────────────────────────────────── */
  qi(B3, `Selling price is ${money(P.price)} and variable cost is ${money(P.vcu)} a ${P.unit}. Contribution per ${P.unit} is:`,
    [money(P.contribution), money(P.price), money(P.vcu), money(round2(P.price + P.vcu))],
    `Contribution is selling price minus variable cost per unit: ${money(P.price)} − ${money(P.vcu)} = ${money(P.contribution)}. It is what each case leaves towards the fixed costs once its own variable cost is covered, so it is neither the price nor the cost nor the two added together.`),
  qi(B3, `Fixed costs are ${money(P.fc)} and contribution is ${money(P.contribution)} a ${P.unit}. The break-even point is:`,
    [qty(P.bep) + ` ${P.units}`, qty(6000) + ` ${P.units}`, qty(10000) + ` ${P.units}`, money(P.trAtBep)],
    `The break-even point is fixed costs divided by contribution per unit: ${money(P.fc)} ÷ ${money(P.contribution)} = ${qty(P.bep)} ${P.units}. ${qty(6000)} divides by the selling price and ${qty(10000)} by the variable cost — neither is the part of the price available to pay the fixed costs. ${money(P.trAtBep)} is the revenue AT break-even, which is money rather than output.`),
  qi(B3, `The plant breaks even at ${qty(P.bep)} ${P.units} and currently makes ${qty(P.actual)}. Its margin of safety is:`,
    [qty(P.mos) + ` ${P.units}`, money(P.profit(P.actual)), qty(P.actual) + ` ${P.units}`, pct(round2((P.bep / P.actual) * 100))],
    `Margin of safety is output minus the break-even point, in units: ${qty(P.actual)} − ${qty(P.bep)} = ${qty(P.mos)} ${P.units}. ${money(P.profit(P.actual))} is the profit at that output, which is a money figure; ${pct(75)} is the break-even point as a share of output, which is the margin looked at from the wrong end.`),
  qi(B3, `The plant's rent goes up, adding ${money(6000)} a month to its overheads. Nothing else moves. What happens?`,
    [`rises to ${qty(CHANGE.fc.bep)} ${P.units}`, `rises to ${qty(CHANGE.vcu.bep)} ${P.units}`, `falls to ${qty(CHANGE.price.bep)} ${P.units}`, `stays at ${qty(P.bep)} ${P.units}, since contribution is unchanged`],
    `A rise in fixed costs changes the numerator: ${money(CHANGE.fc.fc)} ÷ ${money(P.contribution)} = ${qty(CHANGE.fc.bep)} ${P.units}. Contribution IS unchanged, which is exactly why the division still works — but the amount to be covered is larger, so more ${P.units} are needed. ${qty(CHANGE.vcu.bep)} is what a ${money(0.4)} rise in variable cost would give, which moves the divisor instead.`),
  qi(B3, 'On a break-even chart, the total cost line:',
    ['starts at the level of the fixed costs', 'starts at the origin, like the revenue line', 'is horizontal across every output', 'crosses the revenue line at the margin of safety'],
    `At zero output the firm still owes its fixed costs, so the total cost line begins at that height and rises by the variable cost per unit. A line from the origin would make the fixed costs vanish; the horizontal line is the FIXED cost line; and the point where the two cross is the break-even point, with the margin of safety measured along the output axis from there.`),

  /* ── chapter 4: Cash Flow ─────────────────────────────────────────────── */
  qi(B4, `A plant gives ${CASHFLOW.creditDays} days' credit. Month 1's receipts on its cash-flow forecast are:`,
    ['the previous month\'s sales, collected in month 1', 'month 1\'s sales, whether or not they have been paid for', 'month 1\'s sales plus the opening balance', 'the profit earned in month 1'],
    `A cash-flow forecast records money moving, so a sale on credit appears in the month it is PAID. Putting month 1's own sales on the receipts line is the commonest error and it shifts every closing balance after it. The opening balance is its own line, and profit does not appear on the forecast at all.`),
  qi(B4, 'How is the figure at the foot of each month\'s column worked out?',
    ['the opening balance plus net cash flow', 'receipts minus payments for that month', 'the opening balance plus receipts', 'total receipts for the whole forecast period'],
    `The closing balance is what the firm starts with plus what the month added or took away, and it becomes next month's opening balance. Receipts minus payments is the NET CASH FLOW, which is one of the two numbers that make up the closing balance rather than the balance itself.`),
  qi(B4, `Month 2 opens at ${money(CASHFLOW.rows[1].opening)}, with receipts of ${money(CASHFLOW.rows[1].receipts)} and payments of ${money(CASHFLOW.rows[1].payments)}. The closing balance is:`,
    [money(CASHFLOW.rows[1].closing), money(CASHFLOW.rows[1].net), money(round2(CASHFLOW.rows[1].receipts - CASHFLOW.rows[1].payments + Math.abs(CASHFLOW.rows[1].opening))), money(CASHFLOW.rows[2].closing)],
    `Net cash flow is ${money(CASHFLOW.rows[1].receipts)} − ${money(CASHFLOW.rows[1].payments)} = ${money(CASHFLOW.rows[1].net)}, and the closing balance is ${money(CASHFLOW.rows[1].opening)} + ${money(CASHFLOW.rows[1].net)} = ${money(CASHFLOW.rows[1].closing)}. Stopping at ${money(CASHFLOW.rows[1].net)} leaves out the balance carried in, and treating a negative opening balance as a positive one moves the answer the wrong way by twice its size.`),
  qi(B4, 'A negative closing balance on a cash-flow forecast means the firm:',
    ['will be short of cash that month unless it arranges some', 'has made a trading loss in that month', 'has sold less than its break-even point that month', 'has overestimated the fixed costs in its budget'],
    `A negative closing balance is a shortage of CASH: the money leaving that month exceeds the money arriving plus what was in hand. The month's trading can be perfectly profitable — the plant's is — because what moved was the timing of the money rather than the margin on it.`),
  qi(B4, 'Which of these is a limitation of a cash-flow forecast?',
    ['every figure on the receipts line is itself a sales forecast', 'it shows the timing of payments rather than their size', 'it cannot be prepared for more than one month at a time', 'it records only cash and not payments made by transfer'],
    `The receipts line inherits the sales forecast and therefore every difficulty of forecasting. A forecast shows timing AND size, is normally prepared for six or twelve months, and "cash" here means money moving by any route, not notes and coins.`),

  /* ── chapter 5: Budgets ──────────────────────────────────────────────── */
  qi(B5, 'Which of these is a purpose of a budget?',
    ['to allocate a fixed total between departments that both want it', 'to record what each department spent last year', 'to set a ceiling that no department may exceed for any reason', 'to replace the need for a sales forecast'],
    `When the total is fixed, giving one department more means giving another less, so the budget is where that choice gets settled. Recording last year's spending is where a historical budget STARTS; a budget is a plan for revenue as well as for costs rather than a ceiling; and its revenue line is a sales forecast, so it depends on one.`),
  qi(B5, 'The difference between a zero-based budget and one based on historical figures is that a zero-based budget:',
    ['requires every amount to be justified from the beginning', 'sets every department\'s budget to nothing', 'is prepared by the finance team rather than the department', 'is used only by firms that made a loss last year'],
    `Zero based means the STARTING POINT is zero: the department still receives a budget, but one it has argued for rather than inherited. That is why it finds spending a historical budget carries forward unexamined, and why it costs so much more time to prepare.`),
  qi(B5, `Variable costs were budgeted at ${money(BUDGET.lines[1].budget)} and came in at ${money(BUDGET.lines[1].actual)}. The variance is:`,
    [`${money(BUDGET.lines[1].variance)} adverse`, `${money(BUDGET.lines[1].variance)} favourable`, `${money(BUDGET.lines[0].variance)} adverse`, `${money(BUDGET.lines[1].actual)} adverse`],
    `The difference is ${money(BUDGET.lines[1].variance)}, and on a cost line spending above budget reduces profit, so it is adverse. ${money(BUDGET.lines[0].variance)} is the revenue variance for the same month, which is favourable — the same arithmetic reads opposite ways on a revenue line and a cost line.`),
  qi(B5, `In one month a plant's sales revenue beat its budget by ${money(BUDGET.lines[0].variance)} and its profit missed by ${money(BUDGET.profit.variance)}. The best explanation is that:`,
    ['the extra sales were made at a lower price and carried variable costs with them', 'the revenue variance must have been recorded with the wrong sign', 'fixed costs must have risen by more than the revenue variance', 'a favourable revenue variance has no effect on profit'],
    `The extra ${P.units} were sold at ${money(CUT.price)} rather than ${money(P.price)} and each one added ${money(P.vcu)} of variable cost, so ${money(BUDGET.lines[0].variance)} favourable less ${money(BUDGET.lines[1].variance)} and ${money(BUDGET.lines[2].variance)} adverse is ${money(BUDGET.profit.variance)} adverse. The fixed-cost variance was only ${money(BUDGET.lines[2].variance)}, and a revenue variance certainly affects profit — it is simply not the only line that does.`),
  qi(B5, 'Which of these is a difficulty of budgeting?',
    ['underspending is punished with a smaller allowance the following year', 'a budget is set for a whole year and never for a month', 'a budget removes the need to compare actual figures with plan', 'variances are calculated after the year has ended, too late to act'],
    `If underspending is punished with a smaller allowance, the rational thing to do at the end of the period is spend the balance — so a rule meant to control spending has produced some. Budgets are normally set monthly as well as annually, and the monthly comparison of actual against plan is the whole point of having one.`),
]);

/* ══ practice ════════════════════════════════════════════════════════════════ */
/*
 * Seven items, and every chapter is pinned — `practice-04` measured blocks 0, 1 and 4 with no
 * inline practice at all. Two `Calculate` items, because the topic is four calculations and the live
 * section had none; one `Construct`, on the cash-flow forecast, because `4a` says "Construction"
 * and `3e` says "interpretation" and the live examMatters had it backwards.
 *
 * GUIDANCE IS TWO PARAGRAPHS AND THE FIRST GIVES NOTHING AWAY, because `InlinePractice` in guided
 * mode prints `guidance.split('\n')[0]` ABOVE the answer box and hides the rest behind "See full
 * guidance" — so a one-paragraph guidance prints the workings and the answer over an empty box
 * asking the student to produce them (packet 24, from a founder walkthrough).
 */
const pr = (block, command, marks, question, guidance) => ({ id: id('practice', question), block, command, marks, question, guidance });

export const PRACTICE = [
  pr(B3, 'Define', 2, "Define the term 'margin of safety'. (2 marks)",
    'Two marks means two separate things to say and the second is not a rewording of the first. Before you write, settle what KIND of quantity this is — the commonest loss of a mark here is answering in money when the term is measured in something else.\n'
    + `The margin of safety is the difference between a firm's current or forecast output and its break-even point (1 mark), measured in units of output, and it shows how far sales could fall before the firm stopped covering its costs (1 mark). For the plant, ${qty(P.actual)} − ${qty(P.bep)} = ${qty(P.mos)} ${P.units}. An answer giving a money figure has described the profit at that output instead, which is a different quantity.`),

  pr(B1, 'Calculate', 4, `A bottling plant has fixed costs of ${money(P.fc)} a month and a variable cost of ${money(P.vcu)} a ${P.unit}. Calculate its total cost and its average cost at an output of ${qty(25000)} ${P.units}. (4 marks)`,
    'Two figures are wanted and the second is built out of the first, so do them in order and label both. Appendix 6 says a Calculate requires workings to be shown, and here the workings are where the marks are — decide which total you need before you divide anything.\n'
    + `Total variable cost is ${money(P.vcu)} × ${qty(25000)} = ${money(P.tvc(25000))} (1 mark). Total cost is ${money(P.fc)} + ${money(P.tvc(25000))} = ${money(P.tc(25000))} (1 mark). Average cost is total cost divided by output: ${money(P.tc(25000))} ÷ ${qty(25000)} (1 mark) = ${money(P.ac(25000))} a ${P.unit} (1 mark). Dividing only the fixed costs gives ${money(round2(P.fc / 25000))} and dividing only the variable costs gives ${money(P.vcu)}; both leave half the total out.`),

  pr(B2, 'Explain', 4, 'A bottling plant is launching a flavour that has never been sold in its region. Explain one difficulty it will face in forecasting sales of the new flavour. (4 marks)',
    'One difficulty, explained — not a list. Appendix 6 defines Explain as requiring a brief explanation of cause or effect supported by details or an example, so the shape is a named difficulty, the reason it arises HERE, and what it does to the forecast. Choose the difficulty that the words "never been sold in its region" are pointing at.\n'
    + `The difficulty is that there are no past sales of this flavour to reason from (1 mark), because the region has never been offered it, so the usual starting point for a forecast does not exist (1 mark). The plant must instead build the forecast from a comparable product — the same flavour in another market, or a similar flavour in this one — and a judgement about how close the comparison is (1 mark). That judgement can be wrong in either direction, so the forecast has a much wider range of error than one for an established line, and every figure built on it (the cash-flow forecast, the budget) inherits that range (1 mark). An answer that says only "the forecast may be inaccurate" has named no cause.`),

  pr(B3, 'Calculate', 4, `A bottling plant sells at ${money(P.price)} a ${P.unit} with a variable cost of ${money(P.vcu)} a ${P.unit} and fixed costs of ${money(P.fc)} a month. Calculate its break-even point, and calculate the new break-even point if the variable cost rises to ${money(CHANGE.vcu.vcu)}. (4 marks)`,
    'Two break-even points, and the second is the first done again with one figure changed. Appendix 6 requires workings, and on this question the working that matters is the line before the division — get that wrong and both answers are wrong together. Note which of the three given figures actually moves.\n'
    + `Contribution is ${money(P.price)} − ${money(P.vcu)} = ${money(P.contribution)} (1 mark), so the break-even point is ${money(P.fc)} ÷ ${money(P.contribution)} = ${qty(P.bep)} ${P.units} (1 mark). With variable cost at ${money(CHANGE.vcu.vcu)}, contribution falls to ${money(CHANGE.vcu.contribution)} (1 mark) and the break-even point becomes ${money(P.fc)} ÷ ${money(CHANGE.vcu.contribution)} = ${qty(CHANGE.vcu.bep)} ${P.units} (1 mark). The fixed costs never changed, so an answer that adjusts them has moved the wrong figure; dividing by the price rather than the contribution gives ${qty(6000)} and misses what contribution is for.`),

  pr(B4, 'Construct', 4, `A plant opens month 1 with ${money(CASHFLOW.openingBalance)}. It expects receipts of ${money(CASHFLOW.rows[0].receipts)}, ${money(CASHFLOW.rows[1].receipts)} and ${money(CASHFLOW.rows[2].receipts)} and payments of ${money(CASHFLOW.rows[0].payments)}, ${money(CASHFLOW.rows[1].payments)} and ${money(CASHFLOW.rows[2].payments)} over three months. Construct a cash-flow forecast showing net cash flow and the closing balance for each month. (4 marks)`,
    'Appendix 6 defines Construct as requiring an accurately labelled diagram, so the labels are part of what is being asked rather than decoration on top of it. Set the table out before you calculate anything: decide your five row labels and your three column headings first, and be clear which row feeds the next month.\n'
    + `Five labelled rows — opening balance, receipts, payments, net cash flow, closing balance — across three labelled months (1 mark). Net cash flow is receipts less payments each month: ${CASHFLOW.rows.map((r) => money(r.net)).join(', ')} (1 mark). Closing balance is opening plus net cash flow: ${money(CASHFLOW.openingBalance)} + ${money(CASHFLOW.rows[0].net)} = ${money(CASHFLOW.rows[0].closing)} (1 mark). Each closing balance is carried down as the next month's opening balance, giving ${CASHFLOW.rows.map((r) => money(r.closing)).join(' then ')} (1 mark). A table whose three months each open at ${money(CASHFLOW.openingBalance)} has missed the line that makes it one forecast rather than three.`),

  pr(B5, 'Assess', 10, `A bottling plant budgets historically: each line is last year's actual figure adjusted for expected changes. Its finance manager has found a service contract for equipment sold two years ago, and proposes moving the whole firm to zero-based budgeting from next year. Assess whether the plant should do so. (10 marks)`,
    'Appendix 6 defines Assess as requiring a coherent and logical chain of reasoning, well contextualised, with a balanced and wide-ranging assessment showing awareness of competing factors and leading to a supported judgement. Plan the judgement before you write the case, so the two sides you develop are the two the judgement actually turns on. The words "the whole firm" in the last sentence are doing work.\n'
    + `The case for: zero-based budgeting starts every line at nothing and requires each amount to be justified, which is the only method that tests the base a historical budget carries forward. The plant has direct evidence of the problem — a service contract on equipment it no longer owns, which has been adjusted upwards annually because nobody was ever asked what it was for. Scrutiny of that kind also changes behaviour: a manager who expects to argue for the whole figure prepares differently from one who expects to argue for the increase.\n`
    + `The case against: the cost is time, and it scales with the number of lines. Every line means a case prepared, a meeting and a decision, across every department, to arrive at figures that for stable costs will be close to last year's anyway — the rent and the insurance do not become better understood by being re-argued. There is also a risk in the transition year, when managers are learning a new process and the budget still has to be set on time.\n`
    + `The judgement most defensible on this evidence is that the plant should NOT move the whole firm at once. The problem it found is a problem of unexamined lines, not of every line, so the proportionate answer is to budget historically as a rule and zero base one area each year, starting with the one the service contract was in. That gets the scrutiny where the evidence points it and keeps the speed where the base is sound. A judgement that simply picks one method for everything has not weighed the cost of the scrutiny against the value of it.`),

  pr(B3, 'Evaluate', 20, `A bottling plant sells at ${money(P.price)} a ${P.unit}, with a variable cost of ${money(P.vcu)} and fixed costs of ${money(P.fc)} a month. It breaks even at ${qty(P.bep)} ${P.units} and currently produces ${qty(P.actual)}. Its owner discounts heavily on orders above a hundred ${P.units} and is considering a second production line. Evaluate the usefulness of break-even analysis to the owner in making that decision. (20 marks)`,
    'Appendix 6 defines Evaluate as requiring fully developed, coherent and logical chains of reasoning, a full awareness of the validity and significance of competing factors, and a perceptive conclusion that proposes a solution or recommendation. So the conclusion has to tell the owner what to DO, not only how useful the technique is. Two details in the stem are there to be used against the analysis — find them before you plan.\n'
    + `Where it is useful: break-even analysis gives the owner a figure the decision can be tested against. A second line raises fixed costs, and the analysis says immediately what that does — the break-even point rises in proportion, so the owner can ask whether the extra output can actually be sold. It also quantifies the room for error: a margin of safety of ${qty(P.mos)} ${P.units}, ${pct(P.mosPct)} of current output, is how far sales could fall before the plant stopped covering its costs, and that is precisely the question a lender will ask. And it is cheap and quick, which matters for a firm this size.\n`
    + `Where it is not: the analysis assumes ONE selling price, and this owner discounts above a hundred ${P.units}, so the revenue line is not straight and the real break-even point is to the right of ${qty(P.bep)} ${P.units} — the technique flatters the decision. It assumes costs split cleanly into fixed and variable, which holds for a month and not for the multi-year horizon a second line is bought over: across that period the rent and the equipment are choices too. It assumes everything made is sold, and a second line is precisely a bet that it will be. And it is static, while the decision is about several years.\n`
    + `Weighing them: the limitations bite hardest on exactly the decision being taken. A break-even point calculated monthly, at a single price, with output equal to sales, is a poor instrument for a multi-year investment in capacity — and the discounting means even the current figure understates the truth.\n`
    + `The recommendation follows from that. The owner should use break-even analysis, but as a SCREEN rather than as the decision: recalculate it at the average price actually achieved including discounts, and at the higher fixed costs the second line would bring, and treat the answer as the minimum the new capacity must sell. If that figure is close to or above what the market can absorb, the proposal fails on its own most optimistic test and no further work is needed. If it clears comfortably, the decision then needs the tools this analysis cannot supply — a cash-flow forecast over the period of the investment, and the sales forecast that underlies both. The most useful thing break-even analysis does here is tell the owner quickly whether the rest of the work is worth doing.`),
];

/* ══ flashcards ══════════════════════════════════════════════════════════════ */
const card = (front, back) => ({ id: id('flashcard', front), front, back });

export const FLASHCARDS = [
  card('What is the difference between sales volume and sales revenue?', `Volume is the number of units sold; revenue is what they sold for. Revenue = selling price × sales volume, so the two can move in opposite directions: ${qty(CUT.q)} ${P.units} at ${money(CUT.price)} is more volume and more revenue than ${qty(P.actual)} at ${money(P.price)}, and less profit.`),
  card('What makes a cost fixed rather than variable?', `Output. A fixed cost does not change when output changes — ${money(P.fc)} of rent and salaries at zero ${P.units} and at ${qty(25000)}. A variable cost changes directly with output: ${money(P.vcu)} a ${P.unit}. The split holds only for a stated period.`),
  card('How are total cost and average cost calculated?', `Total cost = fixed costs + total variable costs. Average cost = total cost ÷ output. At ${qty(P.actual)} ${P.units}: ${money(P.fc)} + ${money(P.tvc(P.actual))} = ${money(P.tc(P.actual))}, and ${money(P.tc(P.actual))} ÷ ${qty(P.actual)} = ${money(P.ac(P.actual))}.`),
  card('Why does average cost fall as output rises?', `The fixed cost is being divided by a bigger number. Variable cost per unit is ${money(P.vcu)} at every output; it is the ${money(P.fc)} that thins — ${money(round2(P.fc / 10000))} a ${P.unit} at ${qty(10000)} and ${money(round2(P.fc / 25000))} at ${qty(25000)}.`),
  card('Name four ways of improving sales volumes.', 'Lower the price; widen distribution so the product reaches buyers who could not get it; change the product to suit buyers who had a reason not to buy; promote it to reach people who had not considered it. Two of the four cost money before any extra unit is sold.'),
  card('Why can improving sales revenue reduce profit?', `Revenue is price × volume, so a price cut moves both. The plant's cut to ${money(CUT.price)} raised revenue by ${money(CUT.revenueGain)} and each extra ${P.unit} carried ${money(P.vcu)} of variable cost, so profit fell from ${money(P.profit(P.actual))} to ${money(CUT.profit)}.`),
  card('What is a sales forecast and what is it for?', `An estimate of sales volume for a future period. It is the first figure in financial planning: it sets the materials ordered, the output break-even is compared against, the receipts line of the cash-flow forecast and the revenue line of the budget.`),
  card('What are the three factors affecting sales forecasts?', 'Consumer trends — a lasting change in what buyers want. Economic variables — incomes, interest rates, exchange rates. Actions of competitors — their price, product, distribution or promotion. They do not all push the same way.'),
  card('Give four difficulties of sales forecasting.', FORECAST_DIFFICULTIES.map(([h, w]) => `${h}: ${w}`).join('. ') + '.'),
  card('What is contribution and how is it calculated?', `Selling price − variable cost per unit: ${money(P.price)} − ${money(P.vcu)} = ${money(P.contribution)} a ${P.unit}. It is what each unit leaves towards the fixed costs once its own variable cost is paid. It is NOT profit per unit — nothing is profit until the fixed costs are covered.`),
  card('Define the break-even point.', `The output at which total fixed costs plus total variable costs equal total revenue, so the firm makes neither a profit nor a loss. For the plant, ${qty(P.bep)} ${P.units}: revenue ${money(P.trAtBep)} against costs of ${money(P.fc)} + ${money(P.tvc(P.bep))} = ${money(P.tc(P.bep))}.`),
  card('How is the break-even point calculated from contribution?', `Fixed costs ÷ contribution per unit: ${money(P.fc)} ÷ ${money(P.contribution)} = ${qty(P.bep)} ${P.units}. The division works because each unit pays its contribution towards the fixed costs, so the question is simply how many units cover ${money(P.fc)}.`),
  card('What is the margin of safety?', `Current or forecast output minus the break-even point, in units: ${qty(P.actual)} − ${qty(P.bep)} = ${qty(P.mos)} ${P.units}, which is ${pct(P.mosPct)} of output. It says how far sales can fall before the firm stops covering its costs.`),
  card('What happens to the break-even point if fixed costs rise?', `It rises, because the numerator is larger and contribution is unchanged. ${money(CHANGE.fc.fc)} ÷ ${money(P.contribution)} = ${qty(CHANGE.fc.bep)} ${P.units}, up ${qty(CHANGE.fc.shift)}.`),
  card('What happens to the break-even point if variable cost per unit rises?', `It rises, and for a different reason: contribution falls, so the DIVISOR shrinks. At ${money(CHANGE.vcu.vcu)} a ${P.unit}, contribution is ${money(CHANGE.vcu.contribution)} and the break-even point is ${qty(CHANGE.vcu.bep)} ${P.units}.`),
  card('What happens to the break-even point if the selling price rises?', `It falls, because contribution rises. At ${money(CHANGE.price.price)} a ${P.unit}, contribution is ${money(CHANGE.price.contribution)} and the break-even point is ${qty(CHANGE.price.bep)} ${P.units} — down ${qty(Math.abs(CHANGE.price.shift))}.`),
  card('How do you read a break-even chart?', `The revenue line starts at the origin and the total cost line starts at the fixed costs, ${money(P.fc)}. They cross at the break-even point. Left of the crossing the vertical gap is a loss, right of it a profit. The margin of safety is measured along the OUTPUT axis.`),
  card('Give four limitations of break-even analysis.', BREAKEVEN_LIMITS.map(([h, w]) => `${h}: ${w}`).join('. ') + '.'),
  card('What are the five lines of a cash-flow forecast?', 'Opening balance; receipts; payments; net cash flow (receipts − payments); closing balance (opening + net cash flow). The closing balance becomes the next month\'s opening balance, which is what makes it one forecast rather than separate months.'),
  card('Why are a month\'s receipts not the same as its sales?', `Because a forecast records money moving. With ${CASHFLOW.creditDays} days' credit, month 1's receipts are the PREVIOUS month's sales — ${money(CASHFLOW.rows[0].receipts)} — while month 1's payments are for month 1's output.`),
  card('What does a negative closing balance mean?', `That the firm needs cash it will not have: an overdraft, a delayed payment or money from the owner. It is not a loss. The plant's trading is profitable in the month its balance reaches ${money(CASHFLOW.lowest.closing)}; what moved was the timing of the money.`),
  card('Give three uses and three limitations of a cash-flow forecast.', `Uses: ${CASHFLOW_USES.map(([h]) => h.toLowerCase()).join('; ')}. Limitations: ${CASHFLOW_LIMITS.map(([h]) => h.toLowerCase()).join('; ')}.`),
  card('What are the four purposes of a budget?', BUDGET_PURPOSES.map(([h, w]) => `${h} — ${w}`).join('. ') + '.'),
  card('What is the difference between a historical and a zero-based budget?', 'A historical budget starts from last period\'s actual figures and adjusts them: fast, and it carries the base forward unexamined. A zero-based budget starts every line at nothing and requires each amount to be justified: it tests the base, and it costs a great deal of time.'),
  card('What is a variance, and when is it favourable?', `The difference between a budgeted figure and the actual one. Favourable when it helps profit, adverse when it hurts it — so revenue above budget is favourable and cost above budget is adverse. Always a number AND a word.`),
  card('Why must variances be read together?', `Because they reconcile to the profit variance. The plant's month: revenue ${money(BUDGET.lines[0].variance)} favourable, variable costs ${money(BUDGET.lines[1].variance)} adverse, fixed costs ${money(BUDGET.lines[2].variance)} adverse — netting to ${money(BUDGET.profit.variance)} adverse on profit, in its best revenue month.`),
  card('Give four difficulties of budgeting.', BUDGET_DIFFICULTIES.map(([h, w]) => `${h}: ${w}`).join('. ') + '.'),
];

/* ══ common mistakes ═════════════════════════════════════════════════════════ */
/*
 * Eight entries against five chapters, deliberately weighted: two for chapter 1 (where the
 * volume/revenue and fixed/variable confusions start), two for chapter 3 (the most calculated
 * chapter in the section) and one each for the rest. The audit calls the live misconceptions "real
 * student errors rather than filler" and that is right — every one of them is kept in substance,
 * with the arithmetic from this section's own spine attached.
 */
const mistake = (title, looksLike, why, instead) => ({ id: id('mistake', title), title, looks_like: looksLike, why, instead });

export const MISTAKES = [
  mistake('Treating revenue as profit',
    `"Revenue went from ${money(P.tr(P.actual))} to ${money(CUT.tr)}, so the price cut worked."`,
    `Revenue is one side of the calculation. The extra ${qty(CUT.q - P.actual)} ${P.units} carried ${money(P.vcu)} of variable cost each, so total cost rose to ${money(CUT.tc)} and profit fell from ${money(P.profit(P.actual))} to ${money(CUT.profit)}.`,
    `Whenever revenue moves, ask what happened to total cost. A route that improves revenue is worth having; it is not automatically worth taking.`),
  mistake('Sorting costs by the size or the timing of the payment',
    `"Rent is monthly and large, so it is a fixed cost. Materials arrive weekly, so they are variable."`,
    `The test is output, not the calendar. A monthly payment that rises with output is variable, and an annual one that does not is fixed. Getting this wrong puts the wrong figure in the contribution and every break-even answer after it is wrong.`,
    `Hold output at zero and ask whether the cost still has to be paid. If it does, it is fixed for that period.`),
  mistake('Reading contribution as profit per unit',
    `"Contribution is ${money(P.contribution)} a ${P.unit} and we sold ${qty(P.actual)}, so we made ${money(round2(P.contribution * P.actual))}."`,
    `Contribution is what each ${P.unit} leaves TOWARDS the fixed costs. Until the whole ${money(P.fc)} is covered there is no profit at all. Profit at ${qty(P.actual)} ${P.units} is revenue less total cost: ${money(P.tr(P.actual))} − ${money(P.tc(P.actual))} = ${money(P.profit(P.actual))}.`,
    `Use contribution for the break-even division. For profit, take revenue and subtract total cost.`),
  mistake('Drawing the total cost line from the origin',
    `A break-even chart whose cost line and revenue line both start at zero output and zero money.`,
    `At zero output the firm still owes its fixed costs, so the cost line has to begin at ${money(P.fc)}. A line from the origin makes the fixed costs disappear and puts the crossing in the wrong place — usually much too far left.`,
    `Mark the fixed cost level on the money axis first, then start the total cost line there and give it a gradient of the variable cost per unit.`),
  mistake('Giving the margin of safety in money',
    `"The margin of safety is ${money(P.profit(P.actual))}."`,
    `That is the profit at the current output. The margin of safety is a quantity of OUTPUT: ${qty(P.actual)} − ${qty(P.bep)} = ${qty(P.mos)} ${P.units}, which is how far sales can fall before the firm is back at break-even.`,
    `Answer in units unless the question asks for the revenue or the profit at that output — and if it does, it will say so.`),
  mistake('Putting a credit sale on the receipts line in the month of the sale',
    `A cash-flow forecast whose month 1 receipts are month 1's ${qty(P.actual)} ${P.units} at ${money(P.price)}.`,
    `A forecast records when money MOVES. With ${CASHFLOW.creditDays} days' credit, month 1's receipts are the previous month's sales, ${money(CASHFLOW.rows[0].receipts)}. Getting this wrong shifts every closing balance after it, because each one is carried forward.`,
    `Read the credit terms before filling in the receipts line, and check that the last closing balance is the opening balance plus every net cash flow.`),
  mistake('Reading a negative closing balance as a loss',
    `"The forecast shows ${money(CASHFLOW.lowest.closing)} in month ${CASHFLOW.rows.indexOf(CASHFLOW.lowest) + 1}, so the plant is making a loss."`,
    `A negative closing balance is a shortage of cash. The plant's trading in that month is unremarkable; what moved was the timing of the money. The forecast's job is to show that shortfall early enough for it to be arranged rather than survived.`,
    `Say "the plant will be short of cash" and name the month and the figure. Profitability is a different calculation on different figures.`),
  mistake('Reading favourable as good and stopping there',
    `"Sales revenue was ${money(BUDGET.lines[0].variance)} favourable, so it was a good month."`,
    `It was the best revenue month and the worse profit month. The extra ${P.units} were sold at a lower price and brought their variable costs with them, so ${money(BUDGET.lines[0].variance)} favourable less ${money(BUDGET.lines[1].variance)} and ${money(BUDGET.lines[2].variance)} adverse is ${money(BUDGET.profit.variance)} adverse on profit.`,
    `Read every line and check that the variances net to the profit variance. A favourable variance on one line is a question about the others, not a verdict.`),
];

/* ══ extras ══════════════════════════════════════════════════════════════════ */
/*
 * Five chains and three evaluation frames. The first two chains are the source for the section's two
 * reorder recalls (`reorder.source` accepts a flow in the same subsection OR an extras chain, and
 * this section has no flows — see the header). Every chain carries `steps`, which is V028.
 */
export const EXTRAS = {
  chains: [
    {
      title: 'From a selling price to a margin of safety',
      steps: [
        `Take the selling price and the variable cost per ${P.unit}: ${money(P.price)} and ${money(P.vcu)}. Both are per-unit figures and nothing can be worked out without them.`,
        `Subtract to get the contribution per ${P.unit}: ${money(P.price)} − ${money(P.vcu)} = ${money(P.contribution)}. This is the part of each price that is available to pay the fixed costs.`,
        `Divide the fixed costs by the contribution: ${money(P.fc)} ÷ ${money(P.contribution)} = ${qty(P.bep)} ${P.units}. That is the break-even point, and it is an output rather than an amount of money.`,
        `Subtract the answer from current output for the margin of safety: ${qty(P.actual)} − ${qty(P.bep)} = ${qty(P.mos)} ${P.units}, or ${pct(P.mosPct)} of what the plant makes.`,
      ],
      result: `Every question in this chapter is one of those four steps or a change to one of the three figures the first step starts from. Change the price and step two changes; change the fixed costs and step three changes; change the output and only step four changes.`,
    },
    {
      title: 'From a sales forecast to an arranged overdraft',
      steps: [
        `Forecast the sales volume for each month. Nothing on the table can be filled in before the volume is estimated, and the estimate carries all four difficulties of forecasting.`,
        `Turn the sales into receipts using the credit terms. A sale becomes a receipt only when it is paid, so ${CASHFLOW.creditDays} days' credit moves each month's sales into the next month's receipts line.`,
        `Set the payments against each month's output. Payments follow what is PRODUCED, not what is collected — ${money(P.fc)} fixed plus ${money(P.vcu)} a ${P.unit}.`,
        `Carry the closing balance into the next month. Opening plus net cash flow is the closing balance, and it becomes the next opening balance; this is the step that makes three months one forecast.`,
        `Arrange finance for the month the balance turns negative. The plant's reaches ${money(CASHFLOW.lowest.closing)}, so the overdraft is arranged now rather than in the week it is needed.`,
      ],
      result: `The forecast is worth building because of the last step. ${money(Math.abs(CASHFLOW.lowest.closing))} known three months early is a negotiation; the same ${money(Math.abs(CASHFLOW.lowest.closing))} discovered in the month it happens is an emergency.`,
    },
    {
      title: 'Why a price cut can raise revenue and lower profit',
      steps: [
        `The price falls from ${money(P.price)} to ${money(CUT.price)}, so each ${P.unit} earns ${money(round2(P.price - CUT.price))} less.`,
        `Volume answers: sales rise from ${qty(P.actual)} to ${qty(CUT.q)} ${P.units}, a fifth more.`,
        `Revenue is price × volume, so the two effects net out: ${money(CUT.price)} × ${qty(CUT.q)} = ${money(CUT.tr)}, up ${money(CUT.revenueGain)} on ${money(P.tr(P.actual))}.`,
        `But every extra ${P.unit} brought ${money(P.vcu)} of variable cost with it, so total cost rose from ${money(P.tc(P.actual))} to ${money(CUT.tc)}.`,
        `Profit is revenue less total cost: ${money(CUT.tr)} − ${money(CUT.tc)} = ${money(CUT.profit)}, against ${money(P.profit(P.actual))} before.`,
      ],
      result: `Revenue up ${money(CUT.revenueGain)}, profit down ${money(CUT.profitLoss)} — and the break-even point moved too, from ${qty(P.bep)} to ${qty(CUT.bep)} ${P.units}, because contribution fell to ${money(CUT.contribution)}. One decision, three figures, and they do not all point the same way.`,
    },
    {
      title: 'Why a rise in variable cost hurts more than the same rise in fixed cost',
      steps: [
        `Fixed costs rise by ${money(6000)} a month. Contribution is untouched at ${money(P.contribution)}, so only the numerator moves: ${money(CHANGE.fc.fc)} ÷ ${money(P.contribution)} = ${qty(CHANGE.fc.bep)} ${P.units}, up ${qty(CHANGE.fc.shift)}.`,
        `Now instead let variable cost rise by ${money(0.4)} a ${P.unit}. Contribution falls to ${money(CHANGE.vcu.contribution)}, so the DIVISOR shrinks.`,
        `The break-even point becomes ${money(P.fc)} ÷ ${money(CHANGE.vcu.contribution)} = ${qty(CHANGE.vcu.bep)} ${P.units}, up ${qty(CHANGE.vcu.shift)}.`,
        `At the plant's output the second change costs more: ${money(0.4)} × ${qty(P.actual)} = ${money(round2(0.4 * P.actual))} a month against ${money(6000)}.`,
      ],
      result: `A per-unit cost is multiplied by every ${P.unit} made, so its effect grows with output while a fixed cost's does not. That is why a firm negotiating hard on one of the two should usually negotiate on the variable one — and why the same ${money(0.4)} also turns the cash-flow forecast negative in all three months.`,
    },
    {
      title: 'How one wrong forecast reaches four decisions',
      steps: [
        `The sales forecast says ${qty(FORECAST.base)} ${P.units} ${P.per}, and the three factors revise it to ${qty(FORECAST.revised)}.`,
        `Materials are ordered against the forecast, months ahead, because the concentrate ships by sea — so a forecast that is too high is cash spent on stock that will not move.`,
        `The margin of safety is measured from it: at ${qty(FORECAST.revised)} ${P.units} it is ${qty(FORECAST.mos)} rather than ${qty(P.mos)}, and the break-even point never moved.`,
        `The receipts line of the cash-flow forecast is the forecast turned into money, so a forecast wrong about the amount is usually wrong about the timing too.`,
        `The revenue line of the budget is the same figure, so every variance is measured against it.`,
      ],
      result: `A variance measured against a forecast that was wrong tells the firm about its forecasting rather than about its performance. That is why the difficulties in chapter 2 matter more than the arithmetic in it.`,
    },
  ],
  evaluation: [
    {
      title: 'How much weight should a break-even point carry in a decision?',
      content: `Four questions, and the answer to the decision depends on all of them. Is there one selling price? The analysis draws revenue as a straight line, so a firm that discounts for large orders has a real break-even point to the right of the calculated one, and the technique flatters the decision. Over what period are the costs fixed? A break-even point calculated for a month is answering a monthly question; over the life of an investment the rent and the equipment are choices too, so the fixed costs in the numerator are not fixed at all. Is everything made being sold? Output and sales are the same axis on the chart, so unsold stock is invisible — which matters most when the decision being tested is an increase in capacity. And how far from the crossing is the firm now? A margin of safety of ${pct(P.mosPct)} means the analysis is describing a comfortable firm, and small errors in it change nothing; a margin of ${pct(round2((FORECAST.mos / FORECAST.revised) * 100))}, which is where the plant's revised forecast puts it, means the same errors decide the answer. Break-even analysis is at its most useful as a screen: recalculate at the price actually achieved and the costs actually expected, and if the proposal fails its own most optimistic test, no further work is needed.`,
    },
    {
      title: 'Which financial plan answers which question?',
      content: `Three tools and they are not interchangeable, so an answer that reaches for the wrong one has lost its marks before it starts. If the question is how much must be sold to cover the costs, or what one change to price or cost does to that figure, the tool is break-even analysis and the answer is an output. If the question is whether the firm will have the money to pay what it owes, and when, the tool is the cash-flow forecast and the answer is a closing balance in a named month — and the two answers can point different ways, which is the plant's own case: a comfortable ${qty(P.mos)}-case margin of safety and a balance that reaches ${money(CASHFLOW.lowest.closing)}. If the question is whether performance matched the plan and what to do about the gap, the tool is the budget and its variances, and the answer is a set of figures that must reconcile to the profit variance before any of them means anything. All three rest on the sales forecast, so all three inherit its difficulties — which is the one thing that is true of the whole topic and the most useful sentence to have ready for a twenty-mark question.`,
    },
    {
      title: 'Is a favourable variance good news?',
      content: `Not by itself, and the plant's month is the case worth remembering. Sales revenue beat its budget by ${money(BUDGET.lines[0].variance)} — the best revenue month it had — while profit missed by ${money(BUDGET.profit.variance)}. Nothing was recorded wrongly: the extra ${P.units} were sold at ${money(CUT.price)} instead of ${money(P.price)} and each brought ${money(P.vcu)} of variable cost with it, so the favourable revenue variance and the ${money(BUDGET.lines[1].variance)} adverse cost variance are the same event seen from two lines. Three tests before calling any variance good news. Do the lines reconcile — does the favourable one less the adverse ones equal the profit variance? If not, something is missing from the table. What caused it — a variance won by discounting is a different fact from one won on volume at full price, and only the second is straightforwardly good. And was the budget itself sound: a favourable variance against a target set too low is a statement about the target. A variance is the start of a question. The answer is in the line beside it.`,
    },
  ],
};
