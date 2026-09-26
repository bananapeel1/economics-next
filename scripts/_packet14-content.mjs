/**
 * PACKET 14 — decision-making-techniques, Learn Mode content and Notes.
 *
 * Business Unit 3 (WBS13), IAL topic 3.3.3, audit/raw/bus_spec.txt:1146-1177. Five blocks in the
 * specification's own order, one subsection per teach step, one recall per subsection, a worked
 * calculation wherever the specification says "calculate". Every subsection's teaching text is held
 * under the 350-word reading budget (step.words); the runner prints the count.
 *
 * Ids: the four March subsections keep their ids (a student's progress row points at them), and the
 * new subsections are minted in the same shape. Recall ids are `<subsection id>:recall`.
 *
 * Money is in dollars throughout the section (one currency per section, CONTENT-GATE Layer 1); the
 * examples sit in the markets the IAL centres sit in. A real example that names an entity and a year or
 * a figure carries its source in parentheses (Layer 4); the others name no figure.
 */
import { subId, SECTION, hash8 } from './_packet14-util.mjs';

const blockId = (title) => `${SECTION}:block:${hash8(title)}`;
const recall = (sid, r) => ({ id: `${sid}:recall`, ...r });

/* ── Block 1 — Sales Forecasting (3.3.3.1) ─────────────────────────────────── */

const movingAverages = (() => {
  const sid = subId('moving-averages-extrapolation'); // March id, kept
  return {
    id: sid,
    title: 'Moving averages',
    keyIdea: 'A moving average replaces each figure with the mean of it and its neighbours, smoothing seasonal ups and downs so the underlying trend shows.',
    body: [
      { type: 'paragraph', text: 'A **time series** is a set of figures recorded at regular intervals, such as monthly sales. Read raw, it jumps about with the seasons and with one-off events. A **moving average** takes a fixed number of consecutive figures, finds their mean, then moves on one period and repeats, so the direction underneath shows.' },
      { type: 'subheading', text: 'A three-period moving average' },
      { type: 'bullets', items: [
        'Kopi Kita, a café chain in Kuala Lumpur, sold 40, 46, 43, 48, 54 and 50 thousand cups from January to June.',
        'February\'s average = (40 + 46 + 43) ÷ 3 = 43.0, written against the **middle** month of the three.',
        'March = (46 + 43 + 48) ÷ 3 = 45.7; April = 48.3; May = 50.7.',
        'The raw figures rise and fall; the averages climb by about 2.6 thousand a month. That steady climb is the **trend**.',
      ] },
      { type: 'paragraph', text: 'A **four-quarter** moving average smooths a whole year of seasons at once, but four values have no middle quarter to sit against. So it is **centred**: average each pair of neighbouring four-quarter averages and write the result against the quarter between them. The specification names both versions (WBS13, 3.3.3.1a).' },
    ],
    realExample: { emoji: '🛵', text: 'Ride-hailing bookings for an app such as Grab in Kuala Lumpur spike every Friday evening and whenever it rains. A seven-day moving average of daily bookings irons out those spikes, so the operations team can see whether demand is growing or just having a wet week.' },
    misconception: 'Students write the three-period average against the last of the three months. It belongs to the middle month, because it describes the level around that point; against the last month the trend appears to lag reality by a period.',
    examMatters: 'A Calculate question (4 marks, WBS13 Appendix 6) wants the method shown: the three figures added, the division by three, and the answer against the right period. Round consistently, usually to one decimal place, and state the units.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'A juice bar in Colombo sold 50, 56, 59 and 65 thousand drinks in weeks 1 to 4. Work out its three-period moving averages:',
      template: [
        'The first three-period moving average = ___ thousand drinks',
        '→ The next one, a week later = ___ thousand drinks',
        '→ The first of these averages is plotted against week ___',
      ],
      answers: ['55', '60', '2'],
      hints: ['total the opening three weeks, then divide by three', 'drop the oldest week and bring in the newest', 'the middle of the three weeks it covers'],
      distractors: ['165', '57.5', '3'],
    }),
  };
})();

const scatterAndExtrapolation = (() => {
  const sid = subId('correlation-and-forecasting-limits'); // March id, kept
  return {
    id: sid,
    title: 'Scatter graphs, the line of best fit and extrapolation',
    keyIdea: 'A scatter graph shows whether two variables move together; the line of best fit summarises the link, and extending a line beyond the data is extrapolation.',
    body: [
      { type: 'paragraph', text: 'Plot one variable against another, one dot per period: advertising spend across, sales up. Dots rising from bottom-left to top-right show a **positive correlation**; falling from top-left to bottom-right, a **negative correlation**; a shapeless cloud, **no correlation**. The **line of best fit** runs through the middle of the dots, with about as many above it as below.' },
      { type: 'paragraph', text: 'The line is the forecasting tool. Read up from a planned advertising budget to the line and across to the sales axis, and you have a forecast. Extending the line past the last dot, or a moving-average trend past the last period, is **extrapolation**: it assumes the pattern in the data will carry on.' },
      { type: 'paragraph', text: 'Correlation is not causation. Two variables can move together because a third drives both: ice-cream and air-conditioner sales both rise with hot weather. Before spending on the strength of a correlation, ask what links the two.' },
      { type: 'flow', steps: [
        'Collect past sales, period by period',
        'Smooth them with a moving average, or plot them against a driver',
        'Draw the trend line or the line of best fit',
        'Extend the line into the coming periods',
      ], result: 'A quantitative forecast, as good as the assumption that the pattern continues', resultType: 'neutral' },
    ],
    realExample: { emoji: '📼', text: 'Blockbuster\'s revenue peaked in 2004; a forecaster extrapolating the previous decade\'s growth would have missed DVD-by-mail, kiosks and streaming. The company filed for bankruptcy protection in September 2010 (source: Blockbuster Inc. annual report for 2004; Chapter 11 petition, 23 September 2010).' },
    misconception: 'Students treat a strong correlation as proof that one variable causes the other. It is evidence of a link, no more. Write: the correlation suggests a relationship; a causal mechanism and a check for third factors are needed before acting on it.',
    examMatters: 'Interpreting a scatter graph is a named WBS13 skill (3.3.3.1b): state the direction and strength of the correlation, use the line of best fit to read off a forecast, and say what extrapolating beyond the data assumes.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each pair of variables by the correlation a scatter graph of them would most likely show: positive, negative or none:',
      groups: [
        { name: 'Positive correlation', items: ['Daily temperature and bottled-water sales at a Dubai kiosk', 'Hours of rain and umbrella sales in Mumbai'], why: 'As one rises the other tends to rise, so the dots climb from bottom-left to top-right' },
        { name: 'Negative correlation', items: ['A used car\'s age and its resale price', 'The fare on a bus route and the number of passengers who ride it'], why: 'As one rises the other tends to fall, so the dots drop from top-left to bottom-right' },
        { name: 'No correlation', items: ['A market trader\'s shoe size and her weekly takings', 'The last digit of a customer\'s phone number and how much they spend'], why: 'Nothing links the two, so the dots form a shapeless cloud and no line of best fit forecasts anything' },
      ],
    }),
  };
})();

const forecastingLimits = (() => {
  const sid = subId('limitations-of-quantitative-forecasting');
  return {
    id: sid,
    title: 'Limitations of quantitative forecasting',
    keyIdea: 'Every quantitative forecast assumes the future will behave like the past; the technique cannot see a change it has no data for.',
    body: [
      { type: 'bullets', items: [
        '**Continuity is assumed.** A new competitor, a new technology or a recession breaks the pattern, and the forecast keeps extrapolating the old one.',
        '**The data can mislead.** Too few periods, a one-off event inside the series, or a correlation driven by a third factor all produce a confident, wrong line.',
        '**New products have no history.** Nothing can be extrapolated for a launch; judgement and market research must fill the gap.',
        '**The further ahead, the less reliable.** Errors compound with every extra period extrapolated.',
      ] },
      { type: 'paragraph', text: 'Quantitative methods are a starting point, not a verdict. Firms combine them with **qualitative** forecasting: sales-force estimates, expert opinion, test markets and consumer panels, which can pick up what the numbers have not yet recorded.' },
    ],
    realExample: { emoji: '✈️', text: 'Airlines planned their 2020 schedules by extrapolating a decade of steady passenger growth. Global passenger traffic then fell by about two-thirds in 2020 as pandemic travel restrictions took hold (source: IATA press release, 3 February 2021).' },
    misconception: 'Students argue that a forecast built on a large data set must be reliable. Size cannot fix the assumption of continuity: a hundred periods of steady growth say nothing about the period in which the market changes.',
    examMatters: 'For a Discuss (8 marks) or Assess (12 marks) on forecasting, the strongest evaluation is conditional: quantitative methods work in stable markets with long records, and fail when the market is new, volatile or about to change.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each limitation of quantitative forecasting to the situation that exposes it:',
      pairs: [
        { left: 'Assumes the pattern continues', right: 'A rival launches a cheaper product mid-year', why: 'The old trend was built on a market that no longer exists' },
        { left: 'Needs a run of past data', right: 'A brand-new product with no sales history', why: 'There is nothing to smooth or extend when the series is empty' },
        { left: 'Mistakes correlation for causation', right: 'Sales track a variable that a third factor really drives', why: 'Acting on the link fails because the link was never causal' },
        { left: 'Errors grow with distance', right: 'A five-year forecast made from two years of figures', why: 'Each extra period extrapolated compounds the error' },
      ],
      distractors: ['Sales that follow the same seasonal pattern every year'],
    }),
  };
})();

/* ── Block 2 — Investment Appraisal (3.3.3.2) ──────────────────────────────── */

const payback = (() => {
  const sid = subId('simple-payback');
  return {
    id: sid,
    title: 'Simple payback',
    keyIdea: 'Payback is the time an investment takes to earn back its cost from the net cash inflows it generates; the shorter, the sooner the money is safe.',
    body: [
      { type: 'paragraph', text: '**Investment appraisal** is the set of techniques for deciding whether a capital project (a machine, a store, a fleet) is worth its cost. **Simple payback** asks the plainest question: how long until the cumulative net cash inflow equals the outlay?' },
      { type: 'subheading', text: 'Worked example' },
      { type: 'bullets', items: [
        'Sunrise Bakery in Nairobi considers an oven costing $120,000, with net cash inflows of $40,000, $40,000, $50,000 and $50,000 over four years.',
        'Cumulative inflow: $40,000 after year 1, $80,000 after year 2. Still to recover: $40,000.',
        'Year 3 brings $50,000, so the remaining $40,000 arrives 40,000 ÷ 50,000 = 0.8 of the way through it.',
        'Payback = 2 + 0.8 = **2.8 years**, about two years and ten months.',
      ] },
      { type: 'paragraph', text: 'Part-year rule: **full years before recovery + amount still to recover ÷ cash inflow in the year of recovery**. Compare the result with the firm\'s target, or with the rival project: shortest wins. Payback is simple and favours liquidity, but it ignores every cash flow after the payback point and the timing of cash within it.' },
    ],
    realExample: { emoji: '🧊', text: 'Supermarkets that swap open chillers for glass-door cabinets pay a known price and save a known amount of electricity each year. Payback is the natural test: the number of years until the saved power bills have repaid the doors.' },
    misconception: 'Students use profit instead of cash flow, or stop at the year in which the cumulative total first exceeds the cost. Payback runs on net cash inflows, and the fraction of the final year matters: 2.8 years, not 3.',
    examMatters: 'A Calculate question (4 marks) is marked on the cumulative table and the part-year fraction as much as on the answer, so show them, then give the result in years and months (WBS13 Appendix 6: workings should be given).',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'A phone-repair kiosk in Karachi costs $30,000 and brings net cash inflows of $12,000, $12,000 and $20,000 in years 1 to 3. Work out its payback:',
      template: [
        'Still to recover at the end of year 2 = $___ thousand',
        '→ Fraction of year 3 needed = ___',
        '→ Payback period = ___ years',
      ],
      answers: ['6', '0.3', '2.3'],
      hints: ['the cost minus the first two years\' inflows', 'what is left, divided by that year\'s inflow', 'whole years plus the fraction'],
      distractors: ['24', '0.5', '3'],
    }),
  };
})();

const arr = (() => {
  const sid = subId('average-rate-of-return');
  return {
    id: sid,
    title: 'Average rate of return',
    keyIdea: 'ARR expresses the average annual profit from an investment as a percentage of its initial cost, so it can be set against a target rate or a savings rate.',
    body: [
      { type: 'paragraph', text: '**Average (accounting) rate of return** turns a project into a percentage. Unlike payback it uses **profit**: the total net cash inflow over the project\'s life minus the initial cost, spread over the years.' },
      { type: 'subheading', text: 'Worked example' },
      { type: 'bullets', items: [
        'The $120,000 oven brings in $180,000 over four years, so total profit = $180,000 − $120,000 = $60,000.',
        'Average annual profit = $60,000 ÷ 4 = $15,000.',
        'ARR = $15,000 ÷ $120,000 × 100 = **12.5%**.',
      ] },
      { type: 'flow', steps: [
        'Add up the net cash inflows over the whole life',
        'Subtract the initial cost to get total profit',
        'Divide by the number of years',
        'Express the average annual profit as a percentage of the initial cost',
      ], result: 'A percentage return to compare with a target rate', resultType: 'good' },
      { type: 'paragraph', text: 'Accept the project if the ARR beats the firm\'s target, or the return the money could earn elsewhere, such as bank interest; between projects, the higher ARR wins. ARR uses the whole life of the project, which payback does not, but it treats a dollar in year four exactly like a dollar in year one.' },
    ],
    realExample: { emoji: '🏦', text: 'Fixed-deposit rates at banks in Singapore or Pakistan are the benchmark a small firm reaches for: a machine returning 12% a year on average clears the bar when deposits pay 4%, and fails it when they pay 15%.' },
    misconception: 'Students divide total profit by the investment and call the answer ARR. That is the return over the whole life, not per year; divide by the number of years first, or the figure means nothing against an annual interest rate.',
    examMatters: 'State the formula, show total profit, the average and the percentage. A correct method with one arithmetic slip still earns method marks under the own figure rule (WBS13 mark schemes), so never write the answer alone.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'A printing press in Lahore costs $60,000 and brings in $132,000 of net cash inflows over its four-year life. Work out its ARR:',
      template: [
        'Total profit over the four years = $___ thousand',
        '→ Average annual profit = $___ thousand',
        '→ ARR = ___%',
      ],
      answers: ['72', '18', '30'],
      hints: ['everything the press brings in, less what it cost', 'spread that profit evenly across its life', 'the yearly figure as a share of the outlay'],
      distractors: ['120', '33'],
    }),
  };
})();

const npv = (() => {
  const sid = subId('net-present-value');
  return {
    id: sid,
    title: 'Net present value',
    keyIdea: 'NPV discounts each future cash flow to its value today and subtracts the cost; a positive result means the project earns more than the firm\'s required rate.',
    body: [
      { type: 'paragraph', text: 'A dollar next year is worth less than a dollar now, because today\'s dollar could be invested and grow. **Discounted cash flow** applies that idea: a **discount factor** for each year, at the firm\'s chosen rate, converts a future cash flow into its **present value**. The factors are given in the question.' },
      { type: 'subheading', text: 'Worked example at 10%' },
      { type: 'bullets', items: [
        'A delivery van costs $50,000 and brings net cash inflows of $20,000, $25,000 and $20,000 over three years.',
        'Present values: $20,000 × 0.909 = $18,180; $25,000 × 0.826 = $20,650; $20,000 × 0.751 = $15,020. Total $53,850.',
        'NPV = $53,850 − $50,000 = **+$3,850**: accept.',
      ] },
      { type: 'paragraph', text: '**NPV = sum of (cash flow × discount factor) − initial cost.** Positive, the project beats the discount rate; negative, reject; between projects, the highest NPV wins. NPV alone prices the timing of every cash flow, but it rests on long-range forecasts and on the choice of rate, and a higher rate can turn an accept into a reject.' },
    ],
    realExample: { emoji: '⛏️', text: 'Mining companies appraise a new mine with discounted cash flow because the outlay comes first and the returns arrive over decades; a project that looks profitable in total can show a negative NPV once cash flows twenty years out are discounted.' },
    misconception: 'Students add up the present values and stop. The total present value is not the NPV; subtracting the initial cost is the point of the calculation. A project can have $53,850 of present value and still be rejected if it cost $60,000.',
    examMatters: 'Set the working out as a table: year, cash flow, discount factor, present value, with the cost in year 0 at a factor of 1. The paper supplies the factors (WBS13, 3.3.3.2c); the skill is applying them and interpreting the sign.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'A coffee roaster in Kampala costs $20,000 and brings net cash inflows of $10,000 in year 1 and $15,000 in year 2. The discount factors at 10% are 0.909 and 0.826. Work out its NPV:',
      template: [
        'Present value of the year-1 inflow = $___ thousand',
        '→ Present value of the year-2 inflow = $___ thousand',
        '→ Net present value = $___ thousand',
      ],
      answers: ['9.09', '12.39', '1.48'],
      hints: ['that year\'s cash times its factor', 'the year-2 cash times its smaller factor', 'everything discounted, less the outlay'],
      distractors: ['21.48', '5'],
    }),
  };
})();

const comparingTechniques = (() => {
  const sid = subId('comparing-appraisal-techniques');
  return {
    id: sid,
    title: 'Interpreting and comparing the techniques',
    keyIdea: 'The three techniques answer different questions, so they can disagree; a decision weighs the figures against risk, liquidity and factors no calculation captures.',
    body: [
      { type: 'bullets', items: [
        '**Payback**: how soon is the cash back? Best for liquidity and for risky or fast-changing markets. Ignores later cash flows and timing.',
        '**ARR**: what is the average yearly return? Easy to set against a target or an interest rate. Ignores timing entirely, and uses profit, which accounting choices can shift.',
        '**NPV**: what is the project worth today? The only one that prices time. Depends on the discount rate and on cash-flow forecasts years out.',
      ] },
      { type: 'paragraph', text: 'When they disagree, ask why. A project with a slow payback but a high NPV earns late; a firm short of cash may still refuse it. A tie on ARR can hide a big difference in timing that NPV reveals. Then add what the numbers omit: the forecasts may be wrong, the capital may be needed elsewhere, and the workforce, the brand and the environment appear in none of the three.' },
    ],
    realExample: { emoji: '🛫', text: 'Airlines buying aircraft that will fly for twenty-five years cannot decide on payback alone, which would reject almost any aircraft; they lean on NPV over the whole life, then weigh fuel prices, route demand and financing that no single figure settles.' },
    misconception: 'Students pick the technique with the nicest number for the project they prefer. The techniques are not interchangeable: each answers one question, and an honest appraisal reports all three and explains any disagreement.',
    examMatters: 'A 20-mark Evaluate on an investment decision (WBS13 Section B or C) is levels-marked: calculate what the data allow, compare the methods, bring in non-financial factors, and end with a recommendation that states the criterion it rests on.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each manager\'s question into the technique that answers it: payback, ARR or NPV:',
      groups: [
        { name: 'Simple payback', items: ['A shop owner with an overdraft asks when she will have her $15,000 back', 'A lender wants to know how soon the project could repay a two-year loan'], why: 'Both ask about time until the outlay is recovered, which is a liquidity question' },
        { name: 'Average rate of return', items: ['A board wants one yearly percentage to set against its 9% hurdle', 'An owner asks whether the machine beats leaving the money in a 5% deposit'], why: 'Both want an average yearly return as a percentage, to compare with a rate' },
        { name: 'Net present value', items: ['Two projects bring in the same total, one early and one late: which is worth more?', 'A finance director asks what cash arriving in year six is worth now'], why: 'Both turn on when the cash arrives, and only discounting prices timing' },
      ],
    }),
  };
})();

/* ── Block 3 — Decision Trees (3.3.3.3) ────────────────────────────────────── */

const constructingTrees = (() => {
  const sid = subId('decision-trees'); // March id, kept
  return {
    id: sid,
    title: 'Constructing a decision tree',
    keyIdea: 'A decision tree draws a choice as branches: squares where the manager decides, circles where chance decides, with probabilities and payoffs on the ends.',
    body: [
      { type: 'paragraph', text: 'A **decision tree** maps a decision from left to right. A **decision node**, drawn as a square, is a point where the manager chooses between options. A **chance node**, drawn as a circle, is a point where the outcome is uncertain. From each chance node run branches, one per possible outcome, and the **probabilities** on them add up to 1.' },
      { type: 'bullets', items: [
        'Each outcome branch ends in a **payoff**: the expected revenue or profit if that outcome happens.',
        'Each option branch out of a decision node carries the **cost** of taking that option; costs never carry probabilities.',
        'A tree can chain: an outcome can lead to a further decision node, and the same rules apply.',
      ] },
      { type: 'paragraph', text: 'Kopi Kita must choose between launching its own bottled cold brew and licensing the recipe to a drinks firm. Launching costs $200,000 and faces high demand (0.6, payoff $500,000) or low demand (0.4, payoff $100,000). Licensing costs $20,000, with strong uptake (0.5, $250,000) or weak (0.5, $150,000). The diagram at the chapter check-in draws it.' },
    ],
    realExample: { emoji: '💊', text: 'Pharmaceutical firms draw decision trees for drug development, because each trial phase is a chance node with a known historical success rate; only about 8% of the candidates that enter human trials reach approval (source: BIO, Clinical Development Success Rates 2011–2020).' },
    misconception: 'Students put probabilities on the branches leaving a decision node. A decision is not a gamble: the manager picks one branch, so those branches carry costs. Only the branches leaving a chance node carry probabilities, and they must add up to 1.',
    examMatters: 'Construct (4 marks) means an accurately labelled diagram (WBS13 Appendix 6): squares and circles in the right places, probabilities on chance branches adding to 1, costs on option branches, payoffs at the ends. Label everything, since the marks sit on the labelled elements.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'An airline in Nairobi is deciding whether to open a route to Kigali. Sort each label into where it belongs on the tree: a branch leaving the square, a branch leaving a circle, or the end of a branch:',
      groups: [
        { name: 'Branch leaving the square', items: ['Open the Kigali route, cost $2m', 'Keep the current timetable, cost $0'], why: 'These are the options the managers choose between, so each carries its cost and no probability' },
        { name: 'Branch leaving a circle', items: ['Passenger numbers high, 0.65', 'Passenger numbers low, 0.35'], why: 'These are outcomes nobody chooses, so each carries a probability, and the pair adds up to 1' },
        { name: 'End of a branch', items: ['Revenue of $4.5m over three years', 'Revenue of $1.2m over three years'], why: 'A payoff is what the firm receives if that path happens, so it sits where the path ends' },
      ],
    }),
  };
})();

const rollingBack = (() => {
  const sid = subId('rolling-back-emv-and-net-gain');
  return {
    id: sid,
    title: 'Rolling back: expected value and net gain',
    keyIdea: 'Work the tree from right to left: expected value at each chance node, then subtract each option\'s cost and choose the highest net gain at the decision node.',
    body: [
      { type: 'paragraph', text: 'The **expected monetary value** (EMV) of a chance node is the weighted average of its payoffs: multiply each payoff by its probability and add them. It is what the branch would return on average if the situation were repeated many times.' },
      { type: 'subheading', text: 'Rolling back the cold-brew tree' },
      { type: 'bullets', items: [
        'Launch: EMV = 0.6 × $500,000 + 0.4 × $100,000 = $340,000. Net gain = $340,000 − $200,000 = $140,000.',
        'Licence: EMV = 0.5 × $250,000 + 0.5 × $150,000 = $200,000. Net gain = $200,000 − $20,000 = $180,000.',
        'At the decision node, licensing wins: $180,000 beats $140,000, even though launching has the higher EMV.',
      ] },
      { type: 'flow', steps: [
        'Start at the right-hand ends of the tree',
        'Calculate the EMV at each chance node',
        'Subtract each option\'s cost to get its net gain',
        'At the decision node, choose the highest net gain',
      ], result: 'The option with the best expected return after its cost', resultType: 'good' },
      { type: 'paragraph', text: 'Where a tree has more than one decision node, roll each back in turn; the value carried into an earlier node is the best net gain available beyond it.' },
    ],
    realExample: { emoji: '🛢️', text: 'Oil companies decide whether to drill an exploration well this way: the well is a cost on the decision branch, the chance node holds the probabilities of a dry hole, a small find and a large one, and the well is drilled only if the net gain is positive.' },
    misconception: 'Students compare EMVs and pick the biggest. The cost of the option has not been paid yet at the chance node, so the comparison is between net gains. In the cold-brew tree the higher EMV belongs to the option that loses.',
    examMatters: 'Show every product and sum. A Calculate answer with the right EMVs and the wrong final choice still carries method marks under the own figure rule (WBS13 mark schemes). State the choice in words, with the net gain figure that justifies it.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'A garment maker in Dhaka can expand (cost $50k: 0.8 chance of $150k, 0.2 chance of $40k) or outsource (cost $10k: 0.5 chance of $90k, 0.5 chance of $50k). Roll the tree back:',
      template: [
        'Expected value of expanding = $___ thousand',
        '→ Net gain of outsourcing = $___ thousand',
        '→ The net gain of the option chosen at the square = $___ thousand',
      ],
      answers: ['128', '60', '78'],
      hints: ['each payoff times its probability, added', 'its expected value less its cost', 'compare both options after their costs'],
      distractors: ['70', '95'],
    }),
  };
})();

const treeLimits = (() => {
  const sid = subId('limitations-of-decision-trees');
  return {
    id: sid,
    title: 'Limitations of decision trees',
    keyIdea: 'A decision tree is only as sound as its probabilities and payoffs, and it ignores risk attitude and anything that cannot be given a number.',
    body: [
      { type: 'bullets', items: [
        '**The probabilities are estimates.** They come from past data or judgement; a small change can reverse the decision, and a new situation has no data at all.',
        '**The payoffs are forecasts** of revenue and cost years ahead, with all the limits of quantitative forecasting.',
        '**EMV assumes risk neutrality.** An average across many repeats means little for a one-off decision; a firm that cannot survive the bad outcome may rightly refuse the higher net gain.',
        '**Qualitative factors are left out**: brand, staff, ethics, a competitor\'s response. The tree is a snapshot; conditions move on.',
      ] },
      { type: 'paragraph', text: 'Used well, a tree forces a manager to name the options, the uncertainties and their odds, and to compare them on one scale. Used badly, it lends false precision to a guess.' },
    ],
    realExample: { emoji: '🎬', text: 'A film studio deciding whether to make a sequel can put probabilities on a hit and a flop, but the payoff of a hit depends on a release date years away and on what rivals release that week; the tree organises the argument without settling it.' },
    misconception: 'Students write that decision trees are unreliable because the future is uncertain. Uncertainty is the reason to use one; the limitation is that the numbers in it are estimates. Say what could be wrong with the probabilities or payoffs in this case.',
    examMatters: 'Analyse (6 marks) asks for two limitations developed in context (WBS13 Appendix 6). Tie each to the case: which probability is a guess here, which payoff is furthest ahead, whether this firm could survive the worst branch.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each limitation of a decision tree to the case that exposes it:',
      pairs: [
        { left: 'Probabilities are estimates', right: 'A start-up copied its 0.7 chance of success from a rival\'s launch in another country', why: 'The odds were borrowed from a different situation, so the expected values built on them are guesses' },
        { left: 'EMV is a long-run average', right: 'A family firm stakes its only factory on a single expansion', why: 'One decision lands on one outcome, and the firm cannot wait for the average to come good' },
        { left: 'Payoffs are forecasts', right: 'The high-demand payoff assumes prices hold for the next five years', why: 'A payoff that far ahead is a projection, with every limit of sales forecasting' },
        { left: 'Qualitative factors are excluded', right: 'Moving production abroad wins on net gain, but the tree has no branch for staff morale', why: 'Only what can be given a number appears on the tree' },
      ],
      distractors: ['Both options have their costs written on the branches from the square'],
    }),
  };
})();

/* ── Block 4 — Critical Path Analysis (3.3.3.4) ────────────────────────────── */

const cpaNature = (() => {
  const sid = subId('critical-path-analysis'); // March id, kept
  return {
    id: sid,
    title: 'Nature and purpose of critical path analysis',
    keyIdea: 'Critical path analysis draws a project as a network of dependent activities to find the shortest time it can take and the activities that cannot slip.',
    body: [
      { type: 'paragraph', text: 'A project is a set of **activities**, each with a **duration** and **dependencies**: wiring cannot start until the strip-out is finished. **Critical path analysis** (CPA) draws them as a **network**. Each activity is an arrow; each **node** is a circle where activities start and finish, split into three: the node number on top, the **earliest start time** (EST) bottom-left, the **latest finish time** (LFT) bottom-right.' },
      { type: 'paragraph', text: 'The **critical path** is the longest route through the network from start to finish. Its length is the minimum time the whole project can take, and every activity on it has zero **float**: delay one and the project finishes late. Activities off the path have float, spare time they can absorb.' },
      { type: 'bullets', items: [
        '**Purpose**: a completion date the firm can promise; the activities to protect; the float that lets staff and equipment be moved to critical work; the timing for ordering materials just in time.',
      ] },
      { type: 'flow', steps: [
        'List activities, durations and what each depends on',
        'Draw the network of arrows and nodes',
        'Find the longest route: the critical path',
      ], result: 'The minimum project time, and the activities that cannot slip', resultType: 'good' },
    ],
    realExample: { emoji: '🚀', text: 'Critical path methods date from the late 1950s: DuPont used them to schedule chemical-plant maintenance shutdowns and the US Navy for the Polaris missile programme (sources: Kelley and Walker, "Critical-Path Planning and Scheduling", 1959; Malcolm and others, Operations Research, 1959).' },
    misconception: 'Students call the critical path the most important or the shortest route. It is the longest route, and that is exactly why it is critical: it sets the finish date. The shortest route through a network tells you nothing.',
    examMatters: 'The paper gives a network to complete and interpret (WBS13, 3.3.3.4b). Be able to say what a node\'s three numbers mean, why the longest route is the critical one, and what float lets a manager do.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Three routes run from start to finish of a shop refit in Penang: A–B–E takes 9 days, A–C–E takes 12 days and A–D–E takes 7 days. Complete:',
      template: [
        'The critical path runs A → ___ → E',
        '→ The refit cannot finish in fewer than ___ days',
        '→ Activity B can slip by up to ___ days without delaying the refit',
      ],
      answers: ['C', '12', '3'],
      hints: ['the middle activity of the route that takes longest', 'the length of that route', 'the gap between its route and the critical one'],
      distractors: ['D', '9', '5'],
    }),
  };
})();

const completingNetwork = (() => {
  const sid = subId('est-lft-and-float');
  return {
    id: sid,
    title: 'Completing the network: EST, LFT and float',
    keyIdea: 'A forward pass fills in the earliest start times, a backward pass the latest finish times, and float is the gap between them less the activity\'s duration.',
    body: [
      { type: 'bullets', items: [
        'Kopi Kita\'s fit-out: A strip out, 2 days; B wiring, 3 (after A); C plumbing, 2 (after A); D kitchen, 4 (after B); E furniture, 3 (after C); F clean, 1 (after D and E).',
        '**Forward pass**, left to right: EST = the highest of (previous EST + duration). Node 2: 2. Node 3: 5. Node 4: 4. Node 5: highest of 5 + 4 and 4 + 3 = 9. Node 6: 10.',
        '**Backward pass**, right to left: LFT = the lowest of (next LFT − duration). Node 5: 9. Node 3: 5. Node 4: 9 − 3 = 6. Node 2: lowest of 5 − 3 and 6 − 2 = 2. Node 1: 0.',
        '**Total float = LFT − duration − EST**, with the LFT at the end node and the EST at the start node. C: 6 − 2 − 2 = 2. E: 9 − 3 − 4 = 2. A, B, D, F: 0.',
      ] },
      { type: 'paragraph', text: 'Critical path: A–B–D–F, 10 days. C and E can each slip two days.' },
      { type: 'flow', steps: [
        'Forward pass: ESTs, highest at each node',
        'Backward pass: LFTs, lowest at each node',
        'Float = LFT − duration − EST',
        'Zero-float activities are the critical path',
      ], result: 'The network is complete and the critical path found', resultType: 'good' },
    ],
    realExample: { emoji: '🚢', text: 'Shipyards in South Korea sequence hull, wiring and fit-out work with network diagrams; float on the painting tasks shows which crews can move to critical hull work without delaying delivery.' },
    misconception: 'Students take the lowest figure forward or the highest backward where two arrows meet. Forward means highest, because the node waits for the slowest route; backward means lowest, because the node must finish in time for the tightest route ahead.',
    examMatters: 'Calculate (4 marks) asks for a float or a node value: show the subtraction with the three numbers named. Identify the critical path by listing its activities and its length, and check that each has zero float.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'A small network: A (3 days) runs node 1 → 2; B (5 days) node 1 → 3; C (4 days) node 2 → 3; D (2 days) node 3 → 4. Complete it:',
      template: [
        'Earliest start time at node 3 = ___',
        '→ Total float of activity B = ___ days',
        '→ The critical path is ___',
      ],
      answers: ['7', '2', 'A–C–D'],
      hints: ['the later of the two routes arriving there', 'latest finish at its end, less its duration, less its earliest start', 'the activities with no float'],
      distractors: ['5', '0', 'B–D'],
    }),
  };
})();

const cpaLimits = (() => {
  const sid = subId('limitations-of-critical-path-analysis');
  return {
    id: sid,
    title: 'Limitations of critical path analysis',
    keyIdea: 'CPA assumes the durations and dependencies are right and the resources are there; a project that breaks those assumptions has a different critical path.',
    body: [
      { type: 'bullets', items: [
        '**Durations are estimates.** A late delivery or bad weather stretches an activity, and float elsewhere can vanish so the critical path moves.',
        '**Dependencies can change** once work starts; the network must be redrawn, and large projects have hundreds of activities to redraw.',
        '**Resources are assumed available.** Two critical activities may need the same crew at the same time; the network does not say so.',
        '**It says nothing about cost or quality**, and it does not do the work: the plan needs management commitment and monitoring to hold.',
      ] },
      { type: 'paragraph', text: 'A strength sits inside each limit. Because the network is explicit, a change can be re-planned quickly, float shows where slack exists, and the critical activities are known before trouble arrives.' },
    ],
    realExample: { emoji: '🎭', text: 'The Sydney Opera House was planned to open in 1963 and opened in 1973, after design changes and construction difficulties; a network drawn in 1959 could not hold once the work itself changed (source: Sydney Opera House, "Our story", sydneyoperahouse.com).' },
    misconception: 'Students say CPA fails because projects overrun. CPA gives the minimum time under its assumptions; an overrun usually means an estimate was wrong or a resource was missing, which is an argument for updating the network, not for abandoning it.',
    examMatters: 'For a Discuss (8 marks) on CPA, weigh the limits against the purpose: the more uncertain the durations and the more shared the resources, the less the network can promise, but even then it shows which slips matter.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'A hospital wing is being built in Karachi from a completed network. Sort each event into what the network could warn the manager about in advance, or what it cannot show:',
      groups: [
        { name: 'The network warns about it', items: ['Painting can start three days late without moving the opening date', 'A late steel delivery for a zero-float activity will push back the opening', 'Electricians can leave a task with float to help on the lift installation'], why: 'Float and the critical path come straight out of the network, so these are visible before work starts' },
        { name: 'The network cannot show it', items: ['The same crane is booked for two critical tasks on one day', 'Monsoon rain doubles the time the foundations take', 'A cheaper contractor finishes on time but the wiring fails inspection'], why: 'Each breaks an assumption the network makes: resources on hand, durations as estimated, quality taken for granted' },
      ],
    }),
  };
})();

/* ── Block 5 — Contribution (3.3.3.5) ──────────────────────────────────────── */

const contributionPerUnit = (() => {
  const sid = subId('contribution-per-unit');
  return {
    id: sid,
    title: 'Contribution per unit and total contribution',
    keyIdea: 'Contribution is what each sale leaves after its variable cost; added up, it pays the fixed costs, and whatever remains is profit.',
    body: [
      { type: 'paragraph', text: '**Contribution per unit = selling price − variable cost per unit.** It is not profit: fixed costs have not yet been paid. **Total contribution = contribution per unit × units sold**, and **profit = total contribution − fixed costs**.' },
      { type: 'bullets', items: [
        'Kopi Kita sells a cold brew for $6; the coffee, milk, cup and lid cost $2.50. Contribution per unit = $3.50.',
        'At 20,000 cups a month, total contribution = $70,000. With fixed costs of $45,000 (rent, salaries), profit = $25,000.',
        'Each extra cup adds $3.50 to profit once the fixed costs are covered.',
      ] },
      { type: 'paragraph', text: 'The purpose of contribution is to separate the costs a sale causes from the costs the firm carries anyway. That is what makes it a decision tool: it shows what a product, an order or a branch really adds. In Unit 2 the same idea gave the break-even output (fixed costs ÷ contribution per unit); here the interest is in choices.' },
    ],
    realExample: { emoji: '🛩️', text: 'Budget airlines such as AirAsia price this way: once a flight is scheduled, its fuel, crew and airport charges are fixed for that flight, so nearly every dollar of an extra seat sold is contribution, which is why late seats can be sold cheaply and still be worth selling.' },
    misconception: 'Students call contribution per unit the profit per unit. Profit exists only after total contribution has covered fixed costs. A product can have a healthy contribution per unit and the firm still make a loss because volume is too low.',
    examMatters: 'A 4-mark Calculate can ask for contribution per unit, total contribution or the resulting profit; write the formula, substitute the figures and state the units. A Define (2 marks) needs the price-minus-variable-cost idea and what contribution goes towards.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'A phone-case seller in Manila charges $15 a case; each case costs $6 in materials and packaging. She sells 3,000 a month and her fixed costs are $20,000 a month. Work it through:',
      template: [
        'Contribution per case = $___',
        '→ Total contribution a month = $___ thousand',
        '→ Profit a month = $___ thousand',
      ],
      answers: ['9', '27', '7'],
      hints: ['what the buyer pays, less what each case uses up', 'per-case figure times cases sold', 'what is left once the rent and wages are paid'],
      distractors: ['45', '25'],
    }),
  };
})();

const contributionDecisions = (() => {
  const sid = subId('contribution-decisions');
  return {
    id: sid,
    title: 'Contribution as a decision-making tool',
    keyIdea: 'Whenever fixed costs will be paid whatever the firm decides, the right comparison is contribution: take the option that adds the most of it.',
    body: [
      { type: 'bullets', items: [
        '**A special order below the normal price.** Accept if the price exceeds variable cost and there is spare capacity: the order adds contribution and the fixed costs are paid already. Refuse if it displaces full-price sales or resets what regular customers expect to pay.',
        '**Which products to push.** Rank by contribution per unit, or, when a resource such as machine time is scarce, by contribution per unit of that resource.',
        '**Whether to drop a product or close a branch.** Only if its contribution is less than the fixed costs that would actually disappear with it; a product that covers its own variable costs and some fixed costs is still helping.',
        '**Make or buy.** Compare the supplier\'s price with the variable cost of making, not the full cost.',
      ] },
      { type: 'paragraph', text: 'The tool\'s limit is its assumption: fixed costs must really be fixed and capacity really spare. An order that needs overtime, a new machine or a second shift has changed the costs, and the simple comparison no longer holds.' },
    ],
    realExample: { emoji: '🏨', text: 'Hotels release unsold rooms to last-minute apps at prices well below the rack rate. A room\'s variable cost, cleaning and laundry, is small, so a cheap booking still adds contribution, provided it does not tempt full-price guests to wait for the discount.' },
    misconception: 'Students reject a special order because its price is below the average total cost per unit. Average cost includes fixed costs the firm pays anyway; the order should be judged on whether its price covers the variable cost it causes.',
    examMatters: 'An Assess (12 marks in Unit 3, WBS13 Appendix 6) on a special order is levels-marked: calculate the contribution the order adds, then weigh capacity, the effect on regular customers and whether fixed costs really stay fixed, and reach a judgement.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Decide whether each offer should be accepted or rejected on contribution grounds:',
      groups: [
        { name: 'Accept', items: ['A school orders 500 uniforms at $9 each; they cost $6 each in variable cost and the machines stand idle', 'A bus company fills empty weekday seats at $3 when each extra rider costs it $0.50', 'A supplier offers a bracket for $7 that costs $9 in variable cost to make'], why: 'Each adds contribution, or saves variable cost, without changing fixed costs or displacing other sales' },
        { name: 'Reject', items: ['A retailer offers $5 a unit for a product whose variable cost is $5.40', 'A rush order at $9 a unit needs a night shift that lifts variable cost from $6 to $10', 'An $8 price to one buyer when regular customers pay $12 and will demand the same'], why: 'Each either loses contribution or changes the costs and the sales it was meant to add to' },
      ],
    }),
  };
})();

/* ── The blocks, with their pins ───────────────────────────────────────────── */

export function buildContent({ diagramIds, quizIndices, practiceIndices }) {
  const block = (title, sections, takeaway, pins) => ({
    id: blockId(title),
    title,
    sections,
    takeaway,
    diagramId: diagramIds[title],
    quizIndices: quizIndices[title],
    practiceIndices: practiceIndices[title],
  });
  return [
    block('Sales Forecasting', [movingAverages, scatterAndExtrapolation, forecastingLimits], [
      'A moving average smooths a time series; a three-period average sits on the middle period.',
      'A four-quarter average is centred before it is used.',
      'A scatter graph shows the correlation; the line of best fit gives the forecast.',
      'Extrapolation assumes the pattern continues, and correlation is not causation.',
    ]),
    block('Investment Appraisal', [payback, arr, npv, comparingTechniques], [
      'Payback: years until cumulative net cash inflows repay the cost, with a part-year fraction.',
      'ARR = average annual profit ÷ initial cost × 100; profit, not cash flow.',
      'NPV = sum of (cash flow × discount factor) − cost; positive means accept.',
      'The three answer different questions; report all three and weigh the non-financial factors.',
    ]),
    block('Decision Trees', [constructingTrees, rollingBack, treeLimits], [
      'Squares are decisions, circles are chance; probabilities on chance branches add up to 1.',
      'Roll back from the right: EMV at chance nodes, then subtract each option\'s cost.',
      'Choose the highest net gain, not the highest EMV.',
      'Probabilities and payoffs are estimates, and the tree ignores risk attitude.',
    ]),
    block('Critical Path Analysis', [cpaNature, completingNetwork, cpaLimits], [
      'The critical path is the longest route; its length is the minimum project time.',
      'Forward pass takes the highest at a node; backward pass takes the lowest.',
      'Total float = LFT − duration − EST; critical activities have zero float.',
      'CPA assumes accurate durations and available resources.',
    ]),
    block('Contribution', [contributionPerUnit, contributionDecisions], [
      'Contribution per unit = selling price − variable cost per unit.',
      'Total contribution pays fixed costs first; the rest is profit.',
      'Accept a special order when the price beats variable cost and capacity is spare.',
      'The tool fails when fixed costs change or the order displaces full-price sales.',
    ]),
  ];
}

export const SUBSECTIONS = [movingAverages, scatterAndExtrapolation, forecastingLimits, payback, arr, npv, comparingTechniques, constructingTrees, rollingBack, treeLimits, cpaNature, completingNetwork, cpaLimits, contributionPerUnit, contributionDecisions];

/* ── Notes — the readable whole, one chapter per block ─────────────────────── */

export const NOTES = [
  {
    title: 'Quantitative Sales Forecasting',
    meta: '5 concepts',
    keyIdea: 'Past sales, smoothed and plotted, give a trend that can be extended into the future; the forecast is only as good as the assumption that the pattern will continue.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        { type: 'def', tag: 'exam', text: '<strong>Time series</strong> — figures for one variable recorded at regular intervals, such as monthly sales.' },
        { type: 'def', text: '<strong>Moving average</strong> — the mean of a fixed number of consecutive figures, recalculated one period at a time; a three-period average is written against the middle period, a four-quarter average is centred.' },
        { type: 'def', text: '<strong>Line of best fit</strong> — the straight line drawn through a scatter graph with the dots balanced above and below it.' },
        { type: 'def', text: '<strong>Extrapolation</strong> — extending a trend line or a line of best fit beyond the data to forecast future values.' },
        { type: 'def', text: '<strong>Correlation</strong> — the extent to which two variables move together: positive, negative or none. It does not show causation.' },
      ] },
      { title: 'HOW TO CALCULATE AND READ', items: [
        { type: 'mech', text: 'Three-period moving average: add three consecutive figures and divide by three; 40, 46 and 43 thousand cups give 43.0, placed against the middle period.' },
        { type: 'mech', text: 'Four-quarter moving average: average four quarters, then average each pair of neighbouring results so the figure sits against one quarter (centring).' },
        { type: 'mech', tag: 'exam', text: 'Scatter graph: plot the driver (advertising spend) across and sales up; read a forecast by going up from a planned spend to the line of best fit and across to the sales axis.' },
        { type: 'imp', text: 'Extrapolation assumes continuity. A new competitor, a new technology or a recession breaks the pattern, and the forecast keeps extending the old one.' },
        { type: 'imp', text: 'A correlation may be driven by a third factor (hot weather lifts both ice-cream and air-conditioner sales); check for a causal mechanism before spending on it.' },
        { type: 'link', text: 'Sales forecasts feed the cash-flow forecasts that payback, ARR and NPV are calculated from, so an error here flows into every investment appraisal.' },
      ] },
    ],
    formula: { label: 'THREE-PERIOD MOVING AVERAGE', text: '(figure before + this figure + figure after) ÷ 3' },
    flow: { steps: ['Collect past sales', 'Smooth with a moving average or plot against a driver', 'Draw the trend or the line of best fit', 'Extend it into future periods'], result: 'A forecast that holds while the market behaves as it did', resultType: 'good' },
    takeaway: [
      'A three-period moving average sits on the middle period; a four-quarter average is centred.',
      'The line of best fit gives the forecast; extrapolation assumes the pattern continues.',
      'Quantitative forecasts fail in new, volatile or disrupted markets; add qualitative judgement.',
    ],
    examMatters: 'Calculate (4 marks) questions want the arithmetic shown period by period and the answer against the right period. Interpretation questions want the correlation named, a forecast read off the line, and the continuity assumption stated as the limitation (WBS13, 3.3.3.1).',
    misconception: 'Students believe a forecast built from a lot of data must be reliable. Data describe the past; the forecast fails in exactly the period when the market changes, however long the series was.',
  },
  {
    title: 'Investment Appraisal',
    meta: '6 concepts',
    keyIdea: 'Payback, ARR and NPV each turn a project\'s forecast cash flows into one figure; they answer different questions, so a sound appraisal reports all three and then weighs what the numbers leave out.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        { type: 'def', tag: 'exam', text: '<strong>Investment appraisal</strong> — the techniques used to judge whether a capital project is worth its cost.' },
        { type: 'def', text: '<strong>Simple payback</strong> — the time taken for cumulative net cash inflows to equal the initial cost.' },
        { type: 'def', text: '<strong>Average (accounting) rate of return</strong> — average annual profit as a percentage of the initial investment.' },
        { type: 'def', text: '<strong>Net present value</strong> — the sum of each year\'s cash flow multiplied by its discount factor, minus the initial cost.' },
        { type: 'def', text: '<strong>Discount factor</strong> — the number, below 1 and falling each year, that converts a future cash flow into its present value at a chosen rate.' },
      ] },
      { title: 'HOW TO CALCULATE', items: [
        { type: 'mech', tag: 'exam', text: 'Payback: build the cumulative cash-flow table; part-year = full years + amount still to recover ÷ cash inflow in the year of recovery. A $120,000 oven with inflows of $40,000, $40,000, $50,000 and $50,000 pays back in 2 + 40,000 ÷ 50,000 = 2.8 years.' },
        { type: 'mech', text: 'ARR: total profit = total net cash inflows − initial cost; average annual profit = total profit ÷ years; ARR = average annual profit ÷ initial cost × 100. The oven: $60,000 ÷ 4 = $15,000; $15,000 ÷ $120,000 = 12.5%.' },
        { type: 'mech', text: 'NPV: multiply each year\'s cash flow by its discount factor, add the present values, subtract the cost. A $50,000 van with $20,000, $25,000 and $20,000 at factors 0.909, 0.826 and 0.751 has an NPV of $53,850 − $50,000 = +$3,850.' },
        { type: 'imp', text: 'Interpretation: accept a payback shorter than the target, an ARR above the target or the interest rate, an NPV above zero; between projects, the shortest payback, highest ARR or highest NPV.' },
        { type: 'imp', tag: 'exam', text: 'Limitations: payback ignores cash after the payback point and the timing within it; ARR ignores timing and uses profit; NPV depends on the discount rate and on forecasts years out. All three rest on cash-flow forecasts that may be wrong.' },
        { type: 'mech', text: 'Calculations and interpretations of the figures generated by these techniques go together: a 2.8-year payback is read against the target, a 12.5% ARR against the interest rate, and a positive NPV as value added at the chosen discount rate.' },
        { type: 'link', text: 'Non-financial factors sit outside every technique: the workforce, the brand, the environment, and whether the capital is needed elsewhere.' },
      ] },
    ],
    formulas: [
      { label: 'PAYBACK (PART-YEAR)', text: 'Full years + (amount still to recover ÷ cash inflow in the recovery year)' },
      { label: 'AVERAGE RATE OF RETURN', text: 'ARR = (average annual profit ÷ initial investment) × 100' },
      { label: 'NET PRESENT VALUE', text: 'NPV = Σ (cash flow × discount factor) − initial cost' },
    ],
    flow: { steps: ['Forecast the net cash flows', 'Apply payback, ARR and NPV', 'Compare with targets and with each other', 'Weigh the non-financial factors'], result: 'A recommendation that states the criterion it rests on', resultType: 'good' },
    takeaway: [
      'Payback measures time and liquidity; ARR measures average return; NPV measures value today.',
      'Only NPV prices the timing of cash flows; a tie on ARR can hide a big difference in timing.',
      'Every technique inherits the error in the cash-flow forecast.',
    ],
    examMatters: 'Calculate (4 marks) questions are marked on workings as well as answers, and mark schemes apply an own figure rule, so a method with one slip still scores. A 20-mark Evaluate is levels-marked and must end in a recommendation (WBS13 Appendix 6).',
    misconception: 'Students add up the present values and report the total as the NPV. The initial cost must be subtracted; the sign of the result, not the size of the total, is what decides.',
  },
  {
    title: 'Decision Trees',
    meta: '5 concepts',
    keyIdea: 'A decision tree lays out options, chance outcomes, probabilities and payoffs so that the expected value of each option can be compared after its cost.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        { type: 'def', tag: 'exam', text: '<strong>Decision tree</strong> — a diagram of a decision, drawn left to right, showing options, chance outcomes, probabilities, costs and payoffs.' },
        { type: 'def', text: '<strong>Decision node</strong> — a square: the manager chooses between the branches leaving it, each carrying the cost of that option.' },
        { type: 'def', text: '<strong>Chance node</strong> — a circle: the outcome is uncertain, and the branches leaving it carry probabilities that add up to 1.' },
        { type: 'def', text: '<strong>Expected monetary value (EMV)</strong> — the weighted average of the payoffs at a chance node: Σ (probability × payoff).' },
        { type: 'def', text: '<strong>Net gain</strong> — EMV minus the cost of the option; the figure compared at the decision node.' },
      ] },
      { title: 'HOW TO ROLL BACK', items: [
        { type: 'mech', text: 'Start at the payoffs on the right. At each chance node multiply each payoff by its probability and add: launching cold brew, 0.6 × $500,000 + 0.4 × $100,000 = $340,000.' },
        { type: 'mech', tag: 'exam', text: 'Subtract the cost on the option branch: $340,000 − $200,000 = $140,000. Licensing, with an EMV of $200,000 and a cost of $20,000, nets $180,000 and is chosen.' },
        { type: 'mech', text: 'With more than one decision node, roll each back in turn; the value carried into an earlier node is the best net gain available beyond it.' },
        { type: 'imp', text: 'Limitations: probabilities and payoffs are estimates; EMV is a long-run average that assumes risk neutrality; qualitative factors are left out; the tree is a snapshot.' },
        { type: 'mech', text: 'Calculations and interpretations of the figures generated by a tree: the EMV is an average over many repeats, the net gain is what the option is expected to add after its cost, and the choice is the option whose net gain is highest.' },
        { type: 'link', text: 'The payoffs are sales forecasts, so every limitation of quantitative forecasting sits inside the tree.' },
      ] },
    ],
    formula: { label: 'EXPECTED MONETARY VALUE', text: 'EMV = Σ (probability × payoff); net gain = EMV − cost of the option' },
    flow: { steps: ['Draw squares, circles, probabilities, costs and payoffs', 'EMV at each chance node', 'Net gain = EMV − option cost', 'Choose the highest net gain'], result: 'The best expected return after cost, with its assumptions visible', resultType: 'good' },
    takeaway: [
      'Probabilities go on chance branches only and add up to 1; costs go on option branches.',
      'Roll back from right to left; compare net gains, not EMVs.',
      'The result is an average of estimates: state what could be wrong with them.',
    ],
    examMatters: 'Construct (4 marks) wants an accurately labelled tree; Calculate (4 marks) wants every product and sum shown; Analyse (6 marks) wants two limitations tied to the case (WBS13 Appendix 6).',
    misconception: 'Students pick the option with the highest EMV. The cost of the option has not been paid at the chance node; the comparison at the decision node is between net gains, and the higher EMV can lose.',
  },
  {
    title: 'Critical Path Analysis',
    meta: '6 concepts',
    keyIdea: 'A network of dependent activities reveals the longest route, which is the shortest time the project can take, and the float that the other activities can absorb.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        { type: 'def', tag: 'exam', text: '<strong>Critical path analysis</strong> — drawing a project as a network of activities with durations and dependencies to find the minimum completion time and the activities that cannot slip.' },
        { type: 'def', text: '<strong>Node</strong> — a circle where activities start and finish, showing the node number, the earliest start time (bottom left) and the latest finish time (bottom right).' },
        { type: 'def', text: '<strong>Earliest start time (EST)</strong> — the earliest an activity leaving a node can begin; found on the forward pass, taking the highest value where routes meet.' },
        { type: 'def', text: '<strong>Latest finish time (LFT)</strong> — the latest an activity entering a node can finish without delaying the project; found on the backward pass, taking the lowest value where routes meet.' },
        { type: 'def', text: '<strong>Total float</strong> — LFT − duration − EST: the time an activity can be delayed without delaying the project.' },
        { type: 'def', text: '<strong>Critical path</strong> — the longest route through the network; its activities have zero float and its length is the minimum project time.' },
      ] },
      { title: 'HOW TO COMPLETE A NETWORK', items: [
        { type: 'mech', text: 'Forward pass, left to right: EST = previous EST + duration, highest where two routes meet. Kopi Kita\'s fit-out reaches node 5 at the higher of 5 + 4 and 4 + 3 = 9.' },
        { type: 'mech', text: 'Backward pass, right to left: LFT = next LFT − duration, lowest where two routes meet. Node 2 is the lower of 5 − 3 and 6 − 2 = 2.' },
        { type: 'mech', tag: 'exam', text: 'Float per activity: LFT at the end node − duration − EST at the start node. Plumbing: 6 − 2 − 2 = 2 days. Zero-float activities A, B, D and F form the critical path, 10 days.' },
        { type: 'imp', text: 'Purpose: a completion date to promise, the activities to protect, the float that frees resources, and the timing for just-in-time deliveries.' },
        { type: 'imp', text: 'Limitations: durations are estimates, dependencies change, resources are assumed available, cost and quality are not shown, and the plan needs monitoring to hold.' },
        { type: 'link', text: 'A delayed critical activity delays the launch date that the sales forecast and the investment appraisal assumed.' },
      ] },
    ],
    formula: { label: 'TOTAL FLOAT', text: 'Float = LFT − duration − EST' },
    flow: { steps: ['List activities, durations, dependencies', 'Forward pass for ESTs', 'Backward pass for LFTs', 'Float, then the zero-float route'], result: 'Minimum project time and the activities that cannot slip', resultType: 'good' },
    takeaway: [
      'The critical path is the longest route and sets the minimum project time.',
      'Forward pass: highest at a node. Backward pass: lowest.',
      'Float = LFT − duration − EST; critical activities have none.',
    ],
    examMatters: 'The paper gives a network to complete and interpret (WBS13, 3.3.3.4b): fill the node circles, name the critical path with its length, calculate a float with the three figures shown, and give two limitations tied to the project.',
    misconception: 'Students call the critical path the shortest or the most important route. It is the longest, which is why any delay on it delays the whole project.',
  },
  {
    title: 'Contribution',
    meta: '4 concepts',
    keyIdea: 'Contribution separates the costs a sale causes from the costs the firm pays anyway, which is what makes it the right yardstick for special orders, product mix and make-or-buy decisions.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        { type: 'def', tag: 'exam', text: '<strong>Contribution per unit</strong> — selling price − variable cost per unit; what each sale contributes towards fixed costs and then profit.' },
        { type: 'def', text: '<strong>Total contribution</strong> — contribution per unit × units sold.' },
        { type: 'def', text: '<strong>Profit</strong> — total contribution − fixed costs.' },
      ] },
      { title: 'USING CONTRIBUTION TO DECIDE', items: [
        { type: 'mech', text: 'Calculation and interpretation of contribution: Kopi Kita\'s cold brew sells for $6 with a variable cost of $2.50, so each cup contributes $3.50; 20,000 cups give $70,000, which covers $45,000 of fixed costs and leaves $25,000 profit. A higher contribution per unit means each sale does more to cover fixed costs.' },
        { type: 'mech', tag: 'exam', text: 'Special order: accept a price below the normal price if it exceeds variable cost and capacity is spare, because fixed costs are paid already; refuse if it displaces full-price sales or resets customer expectations.' },
        { type: 'mech', text: 'Product mix: push the products with the highest contribution per unit, or per unit of a scarce resource such as machine hours.' },
        { type: 'mech', text: 'Dropping a product or closing a branch: only when its contribution is less than the fixed costs that would actually disappear with it. Make or buy: compare the supplier\'s price with the variable cost of making.' },
        { type: 'imp', text: 'The tool assumes fixed costs really are fixed and capacity really is spare; overtime, a new machine or a second shift changes the costs and the answer.' },
        { type: 'link', text: 'Unit 2 used contribution to find break-even output (fixed costs ÷ contribution per unit); Unit 3 uses it to choose between options.' },
      ] },
    ],
    formulas: [
      { label: 'CONTRIBUTION PER UNIT', text: 'Selling price − variable cost per unit' },
      { label: 'PROFIT', text: 'Total contribution − fixed costs' },
    ],
    flow: { steps: ['Find the contribution the option adds', 'Check capacity is spare and fixed costs unchanged', 'Check the effect on other sales', 'Decide'], result: 'Take the option that adds the most contribution without changing the costs', resultType: 'good' },
    takeaway: [
      'Contribution per unit = price − variable cost; it is not profit.',
      'Accept a special order when price beats variable cost and capacity is spare.',
      'Judge a product by its contribution, not by average total cost.',
    ],
    examMatters: 'An Assess (12 marks in Unit 3) on a special order is levels-marked: calculate the contribution added, weigh capacity, regular customers and whether fixed costs stay fixed, and reach a judgement (WBS13 Appendix 6).',
    misconception: 'Students reject an order priced below average total cost per unit. Average cost includes fixed costs the firm pays whatever it decides; the order is judged on whether its price covers the variable cost it causes.',
  },
];
