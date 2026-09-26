/**
 * PACKET 54 — assessing-competitiveness teaching content: five chapters over the specification's three
 * sub-topics (`bus_spec.txt:1218-1248`), eighteen subsections, one step each, one recall each.
 *
 * WHAT THE LIVE SECTION TEACHES AND WHY IT IS REPLACED. One chapter, "Financial Ratios", two
 * subsections (profitability ratios; liquidity and gearing). Packet 13 removed the second chapter
 * (VRIO and core competencies, 0 hits in the specification) on 14 Sep and left the section "thin and
 * honest". What 3.3.5 does contain was never written: the two financial statements and who reads them
 * (1a, 1b), the acid test, interpreting ratios for decisions and their limitations (2a-2c), and the
 * whole of sub-topic 3 — the four workforce measures, their limitations and the four HR strategies.
 *
 * THE CHAPTERS FOLLOW THE SPECIFICATION'S OWN ORDER: statements (1) · calculate (2a) · interpret and
 * limit (2b, 2c) · workforce measures and their limits (3a, 3b) · HR strategies (3c).
 *
 * FORMULAE ARE TAUGHT ONCE AND RECALLED ONE STEP LATER. A fill-in on a formula placed under the
 * paragraph that prints it is answerable by scrolling up (`recall.recoverable`), so each formula
 * fill-in `topFix-05` asks for sits on the NEXT step, whose body does not restate it: margins at the
 * liquidity step, the acid test at the gearing step, capital employed and gearing at the ROCE step,
 * ROCE at the interpreting step, productivity at the turnover step, turnover at the absenteeism step.
 */
import { SECTION, subId, id, FIRM, usd, usdm, units, pct, ratio } from './_packet54-util.mjs';

const F = FIRM;
const { L, T, PL, PT } = F;
const blockId = (title) => id('block', title);
const recall = (sid, spec) => ({ id: `${sid}:recall`, ...spec });
const sub = (slug, spec) => { const sid = subId(slug); return { id: sid, ...spec, recall: recall(sid, spec.recall) }; };
const p = (text) => ({ type: 'paragraph', text });
const bullets = (items) => ({ type: 'bullets', items });

export const B1 = 'Reading the Financial Statements';
export const B2 = 'Calculating the Ratios';
export const B3 = 'Using Ratios to Make Decisions';
export const B4 = 'Measuring the Workforce';
export const B5 = 'HR Strategies for Productivity and Retention';

/* ══ Chapter 1 — Reading the financial statements (3.3.5 · 1a-1b) ══════════ */

const soci = sub('statement-of-comprehensive-income', {
  title: 'The Statement of Comprehensive Income',
  keyIdea: 'The statement of comprehensive income shows a year of trading: revenue, and the costs taken from it step by step, down to the profit for the year.',
  body: [
    p(`The **statement of comprehensive income** (the profit and loss account) records a business's trading over one year. Its key information is a cascade: each line takes one kind of cost away from the line above.`),
    bullets([
      '**Revenue** — the value of everything sold.',
      '**Cost of sales** — the direct cost of what was sold. Revenue minus cost of sales is **gross profit**.',
      '**Other operating expenses** — running costs such as rent, marketing and office salaries. Gross profit minus these is **operating profit**.',
      '**Interest** — the cost of the firm\'s borrowing. Operating profit minus interest is the **profit for the year**.',
    ]),
    p(`${F.name}, a ${F.home} bakery chain, sold ${usdm(T.revenue)} of bread and cakes this year. Cost of sales was ${usdm(T.cos)}, leaving gross profit of ${usdm(T.gp)}. After ${usdm(T.opex)} of other operating expenses, operating profit was ${usdm(T.op)}; after ${usdm(T.interest)} of interest, the profit for the year was ${usdm(T.pfy)}.`),
    p(`Reading the statement means comparing lines, not quoting them. Revenue rose by a quarter, from ${usdm(L.revenue)}, but the profit for the year rose only from ${usdm(L.pfy)}: costs grew faster than sales, and interest quadrupled.`),
  ],
  realExample: { emoji: '🥐', text: 'A Nairobi café chain reports higher revenue every year, yet its profit for the year stays flat: the rent on its outlets, an operating expense, climbs as fast as its sales.' },
  misconception: 'Students treat revenue and profit as the same thing, or read a rise in revenue as a rise in profit. Revenue is what customers paid; profit is what is left after costs. A firm can sell more and keep less.',
  examMatters: 'Name the line you are using — gross profit, operating profit or profit for the year — and say which costs have already been taken off it. Using the wrong profit line changes every ratio built on it.',
  recall: {
    type: 'classify',
    prompt: 'Sort each cost by the line of the statement of comprehensive income it belongs to: cost of sales, other operating expenses or interest.',
    groups: [
      { name: 'Cost of sales', items: ['Flour, butter and sugar used in the loaves sold', 'Pay for the bakers who made the goods sold'], why: 'They are the direct cost of making what was sold, so they rise and fall with the goods sold.' },
      { name: 'Other operating expenses', items: ['Monthly charge for the high-street premises', 'Advertising on buses and social media'], why: 'They are the cost of running the business, not of making each item, and are taken off gross profit.' },
      { name: 'Interest', items: ['The charge on the bank loan for the new bakery', 'The charge on money borrowed to buy delivery vans'], why: 'They are the cost of borrowing, taken off operating profit to reach the profit for the year.' },
    ],
  },
});

const sofp = sub('statement-of-financial-position', {
  title: 'The Statement of Financial Position',
  keyIdea: 'The statement of financial position is a snapshot of one day: what the business owns, what it owes, and the owners\' money that funds the difference.',
  body: [
    p('The **statement of financial position** (the balance sheet) shows the business on the last day of its financial year. Its key information comes in parts that always balance.'),
    bullets([
      '**Non-current assets** — kept for more than a year: ovens, vans, a bakery building.',
      '**Current assets** — turned into cash within a year: inventory, receivables (money customers owe) and cash.',
      '**Current liabilities** — owed within a year, such as bills from suppliers. **Non-current liabilities** — owed after more than a year, such as long-term bank loans.',
      '**Total equity** — the owners\' money: share capital plus retained profits.',
    ]),
    p(`Assets minus liabilities gives **net assets**, and net assets always equal total equity. At the end of this year ${F.short} had non-current assets of ${usdm(PT.nca)} and current assets of ${usdm(PT.ca)}, against current liabilities of ${usdm(PT.cl)} and bank loans of ${usdm(PT.ncl)} due in later years: net assets of ${usdm(PT.netAssets)}, matched by total equity of ${usdm(PT.equity)}.`),
    p(`A year earlier its non-current assets were ${usdm(PL.nca)} and its long-term loans ${usdm(PL.ncl)}. The ${usdm(PT.nca - PL.nca)} rise is a new central bakery, and the ${usdm(PT.ncl - PL.ncl)} of new borrowing shows that most of it was paid for with a loan.`),
  ],
  realExample: { emoji: '🧾', text: 'A Penang electronics distributor holds most of its assets as stock and money owed by customers. On the last day of its year it was owed more by customers than it owed its own suppliers.' },
  misconception: 'Students read the statement of financial position as a record of the whole year. It is a snapshot of one day, so a large payment made the day before, or held back until the day after, changes what it shows.',
  examMatters: 'When a case gives a statement of financial position, say what a change in a line means for the business — a larger loan means more interest to pay — rather than only reporting that the figure went up.',
  recall: {
    type: 'classify',
    prompt: 'Sort each item into current assets, current liabilities or non-current liabilities.',
    groups: [
      { name: 'Current assets', items: ['Bags of flour in the storeroom', 'Money in the shop tills at closing time'], why: 'Both will be used or spent within the year: inventory and cash.' },
      { name: 'Current liabilities', items: ['A flour supplier\'s invoice due in thirty days', 'An overdraft the bank can call in at any time'], why: 'Both must be paid within the year.' },
      { name: 'Non-current liabilities', items: ['A loan repayable in six years', 'A mortgage on the central bakery over fifteen years'], why: 'Both are owed, but not due for more than a year.' },
    ],
  },
});

const stakeholders = sub('stakeholder-interest-in-the-statements', {
  title: 'Stakeholder Interest in the Statements',
  keyIdea: 'Each stakeholder reads the same two statements for a different reason, so each looks first at the lines that answer its own question.',
  body: [
    p('**Stakeholder interest** in the financial statements depends on what each group wants from the business.'),
    bullets([
      '**Shareholders** and would-be investors read profit for the year and its trend: it decides dividends and the value of their shares.',
      '**Lenders** such as banks read operating profit against interest, and the assets a loan could be secured on: can the business keep paying?',
      '**Suppliers** read current assets against current liabilities before giving credit: will they be paid on time?',
      '**Employees** read revenue and profit for job security and room for a pay rise.',
      '**Managers** read both statements to judge their own decisions and plan the next ones.',
      '**Government** reads profit, which its tax is charged on.',
    ]),
    p(`${F.short}'s bank lent more this year, so it will watch whether operating profit of ${usdm(T.op)} keeps covering interest of ${usdm(T.interest)} comfortably. It does, seven and a half times, against twenty-five times a year earlier. Its flour suppliers care more that current liabilities have risen to ${usdm(PT.cl)}.`),
  ],
  realExample: { emoji: '🏦', text: 'Before extending a loan to a Dubai catering firm, a bank asks for two years of statements and checks how many times operating profit covers interest, not how fast revenue grew.' },
  misconception: 'Students write that "stakeholders" want profit. Groups want different things from the same figures: a supplier cares about being paid next month, a shareholder about profit over years, and an employee may care more about job security than either.',
  examMatters: 'Name the stakeholder, the statement and line it would read, and the decision it is making. "The bank would compare operating profit with interest before lending again" is stronger than "stakeholders are interested in the accounts".',
  recall: {
    type: 'match',
    prompt: 'Match each stakeholder to the question it reads the statements to answer.',
    pairs: [
      { left: 'A bank deciding on a second loan', right: 'Can earnings carry the cost of the debt?', why: 'A lender\'s risk is not being repaid, so it sets what the firm earns against what the debt costs.' },
      { left: 'A flour mill offering sixty days\' credit', right: 'Will the bills due soon be settled on time?', why: 'A supplier is owed money within weeks, so it looks at short-term assets against short-term debts.' },
      { left: 'A family that owns a fifth of the shares', right: 'Is profit growing enough to raise dividends?', why: 'Owners are paid out of profit, and its trend decides what their shares are worth.' },
      { left: 'Shop staff negotiating their wages', right: 'Can the business afford more pay and keep every job?', why: 'Employees\' pay and security depend on revenue and profit holding up.' },
    ],
    distractors: ['How much tax is due on the year\'s profit?'],
  },
});

/* ══ Chapter 2 — Calculating the ratios (3.3.5 · 2a) ═══════════════════════ */

const margins = sub('gross-profit-and-profit-for-the-year-margins', {
  title: 'Profitability: Gross Profit and Profit for the Year Margins',
  keyIdea: 'A margin turns a profit figure into a share of revenue, so firms of different sizes, and one firm in different years, can be compared fairly.',
  body: [
    p('Profit in dollars grows with the size of a business. **Profitability** ratios divide a profit figure by revenue to show how many cents of each dollar of sales are kept.'),
    bullets([
      '**Gross profit margin** = gross profit ÷ revenue × 100',
      '**Profit for the year margin** (net profit margin) = profit for the year ÷ revenue × 100',
    ]),
    p(`${F.short}'s gross profit margin fell from ${pct(L.gpm)} (${usdm(L.gp)} ÷ ${usdm(L.revenue)}) to ${pct(T.gpm)} (${usdm(T.gp)} ÷ ${usdm(T.revenue)}). Each dollar of bread now carries more direct cost: flour prices rose, and a supermarket contract was won at lower prices.`),
    p(`Its profit for the year margin fell from ${pct(L.pfym)} to ${pct(T.pfym)}, less than the gross margin, because operating expenses grew more slowly than sales, although interest took a bigger share.`),
    p('The gap between the two margins shows where money goes after production. A gross margin that falls points at buying, making or pricing; a profit for the year margin that falls further points at overheads or interest.'),
  ],
  realExample: { emoji: '🧋', text: 'A Singapore bubble-tea chain keeps a gross margin near 70% because its ingredients are cheap, yet its profit for the year margin is thin: prime outlets and staff absorb most of the difference.' },
  misconception: `Students think a rise in profit in dollars means the business became more profitable. ${F.short}'s profit for the year rose, yet each dollar of sales kept less of it: profit grew while profitability fell.`,
  examMatters: 'Show the working, give the result to one decimal place, and then say what caused the change using the case. A margin quoted without a reason tells a manager nothing.',
  recall: {
    type: 'classify',
    prompt: 'Sort each change by the margins it lowers: both margins, or the profit for the year margin only.',
    groups: [
      { name: 'Both margins', items: ['Flour costs more per loaf', 'A promotion cuts the price of every cake', 'Bakers on the production line get a pay rise'], why: 'Each changes gross profit, and whatever changes gross profit carries down to the profit for the year.' },
      { name: 'Profit for the year margin only', items: ['The landlord raises the charge for each shop', 'A new advertising campaign', 'The bank raises the interest rate on the loan'], why: 'Each is an operating expense or interest, taken off below gross profit, so the gross margin is untouched.' },
    ],
  },
});

const liquidity = sub('liquidity-current-and-acid-test-ratios', {
  title: 'Liquidity: the Current and Acid Test Ratios',
  keyIdea: 'Liquidity ratios ask whether short-term assets can pay the bills falling due within a year; the acid test asks it without counting stock.',
  body: [
    p('A business can be profitable and still fail if it cannot pay what it owes this month. **Liquidity** ratios compare what will turn into cash within a year with what must be paid within a year.'),
    bullets([
      '**Current ratio** = current assets ÷ current liabilities',
      '**Acid test ratio** = (current assets − inventory) ÷ current liabilities',
    ]),
    p('The acid test leaves out inventory because stock may be slow to sell, or sell only at a discount, when cash is needed quickly.'),
    p(`${F.short}'s current ratio fell from ${ratio(PL.current)} to ${ratio(PT.current)}, and its acid test from ${ratio(PL.acid)} to ${ratio(PT.acid)}: without its stock, it has 70 cents of liquid assets for each dollar due within a year.`),
    p('Whether that is a problem depends on the business. A bakery sells for cash every day and its stock lasts days, so money keeps arriving before bills fall due; many food retailers run an acid test below 1:1 safely. A furniture maker that waits months to sell its stock and be paid could not.'),
  ],
  realExample: { emoji: '🛒', text: 'A Lagos supermarket group runs a current ratio below 1:1 for years without trouble: shoppers pay at the till, while its suppliers wait sixty days to be paid.' },
  misconception: 'Students treat a higher current ratio as always better. A ratio far above what the business needs can mean cash sitting idle or unsold stock piling up — money that could be earning a return elsewhere.',
  examMatters: 'Say what the figure means for this business before calling it good or bad: compare it with last year and with the kind of business it is, and say whether bills can be met as they fall due.',
  recall: {
    type: 'fillin',
    prompt: 'Complete the two profitability facts from the step before:',
    template: [
      'Gross profit is what remains after ___ is taken off the value of goods sold.',
      'The profit for the year margin divides the profit for the year by ___.',
    ],
    answers: ['cost of sales', 'revenue'],
    hints: ['the direct cost of making what was sold', 'the top line of the statement'],
    distractors: ['capital employed', 'interest'],
  },
});

const gearing = sub('gearing-ratio', {
  title: 'The Gearing Ratio',
  keyIdea: 'Gearing measures the share of a business\'s long-term finance that is borrowed; the higher it is, the more of its profit is promised to lenders first.',
  body: [
    p('**Capital employed** is the long-term finance a business uses: non-current liabilities plus total equity. The **gearing ratio** shows how much of it is borrowed.'),
    bullets(['**Gearing ratio** = non-current liabilities ÷ capital employed × 100']),
    p(`${F.short} borrowed to build its central bakery. Its long-term loans rose from ${usdm(PL.ncl)} to ${usdm(PT.ncl)} and total equity from ${usdm(PL.equity)} to ${usdm(PT.equity)}, so capital employed rose from ${usdm(PL.ce)} to ${usdm(PT.ce)} and gearing from ${pct(PL.gearing)} to ${pct(PT.gearing)}.`),
    p('Borrowed money has to be serviced whatever happens to sales: interest is due every year and the loan must be repaid. Shareholders are paid only from what is left. So a highly geared business carries more **financial risk**; gearing above about 50% is usually described as high.'),
    p('Low gearing is not automatically better. A firm that never borrows may grow more slowly than it could, and its owners must put in all the money themselves.'),
  ],
  realExample: { emoji: '🏗️', text: 'A Kuala Lumpur property developer funds most of each project with bank loans, so a year of slow sales leaves it paying the same interest out of far less revenue.' },
  misconception: 'Students treat high gearing as always bad. Borrowing is cheap finance when the business earns more on the money than it costs, and a firm with steady sales, such as a utility, can carry high gearing safely. The danger is sales that can fall.',
  examMatters: 'Connect gearing to the case: what the loan was for, what interest rates are doing, and how steady the firm\'s sales are. The same gearing ratio is more worrying when rates are rising or sales are uncertain.',
  recall: {
    type: 'fillin',
    prompt: 'Complete the two liquidity facts from the step before:',
    template: [
      'The acid test ratio does not count ___ among the short-term holdings.',
      'A current ratio below 1:1 means the bills due within a year are larger than ___.',
    ],
    answers: ['inventory', 'current assets'],
    hints: ['stock that may be slow to sell', 'what the business holds that turns into cash within a year'],
    distractors: ['cash', 'receivables', 'retained profits'],
  },
});

const roce = sub('return-on-capital-employed', {
  title: 'Return on Capital Employed (ROCE)',
  keyIdea: 'ROCE measures the operating profit earned on all the long-term money invested in a business, so it can be compared with what that money could earn elsewhere.',
  body: [
    p('**Return on capital employed (ROCE)** links the two statements: operating profit from the statement of comprehensive income, capital employed from the statement of financial position.'),
    bullets(['**ROCE** = operating profit ÷ capital employed × 100']),
    p('Operating profit is used, not profit for the year, because capital employed includes the lenders\' money as well as the owners\'. The return is measured before either group is paid.'),
    p(`${F.short}'s ROCE fell from ${pct(PL.roce)} (${usdm(L.op)} ÷ ${usdm(PL.ce)}) to ${pct(PT.roce)} (${usdm(T.op)} ÷ ${usdm(PT.ce)}). Operating profit rose by ${usdm(T.op - L.op)}, but the money tied up in the business rose by ${usdm(PT.ce - PL.ce)}: the new bakery has not yet earned as much per dollar as the rest of the business.`),
    p('A falling ROCE after a large investment is common. The new asset counts in full from the day it is bought, while the profit it brings builds up over later years.'),
  ],
  realExample: { emoji: '🚚', text: 'A Karachi logistics firm buys a fleet of new trucks. Its ROCE drops in the year of purchase, then climbs as the trucks win contracts over the following three years.' },
  misconception: 'Students divide profit for the year by capital employed. Capital employed includes lenders\' money, so the profit set against it must be the one earned before those lenders are paid: operating profit.',
  examMatters: 'Say what the ROCE is compared with — last year, a rival, or the interest rate on borrowing. A ROCE on its own says little about whether an investment was worth making.',
  recall: {
    type: 'fillin',
    prompt: 'Complete the two facts about long-term finance from the step before:',
    template: [
      'Adding total equity to ___ gives the long-term finance a business uses.',
      'The gearing ratio divides long-term loans by ___.',
    ],
    answers: ['non-current liabilities', 'capital employed'],
    hints: ['debts not due for more than a year', 'the owners\' money and the lenders\' money together'],
    distractors: ['current liabilities', 'revenue'],
  },
});

/* ══ Chapter 3 — Using ratios to make decisions (3.3.5 · 2b-2c) ═══════════ */

const interpretProfit = sub('interpreting-roce-and-margins', {
  title: 'Interpreting ROCE and Margins to Make Business Decisions',
  keyIdea: 'A ratio becomes useful when it is compared: with last year, with rivals, and with what the money could cost or earn elsewhere. The comparison points to a decision.',
  body: [
    p('Ratios assess competitiveness because they show whether a business turns its sales and its capital into profit as well as its rivals do. To **interpret ratios to make business decisions**, compare each one with something that gives it meaning:'),
    bullets([
      '**Over time** — is the business improving or getting worse?',
      '**Against rivals or the industry average** — is it doing better than firms facing the same conditions?',
      '**Against the cost of money** — does the return beat what the finance costs, or what the owners could earn by putting their money elsewhere?',
    ]),
    p(`That third comparison decides whether borrowing to invest makes sense. ${F.short} pays ${pct(F.borrowRate)} on its loans. With a ROCE of ${pct(PT.roce)}, each dollar borrowed and invested earns about 20 cents of operating profit and costs 8 cents in interest, so the owners keep the difference. If ROCE fell below ${pct(F.borrowRate)}, every borrowed dollar would cost more than it earned, and more borrowing would cut the profit left for shareholders.`),
    p(`The margins point to different decisions. ${F.short}'s gross margin fell because of flour prices and a low-priced contract, so its managers might renegotiate flour supplies or review the contract's price before cutting costs in the shops.`),
  ],
  realExample: { emoji: '🏨', text: 'A Bangkok hotel group earning a ROCE of 6% while its loans cost 9% decides to sell two hotels and repay debt rather than build a third.' },
  misconception: 'Students treat any positive ROCE as proof an investment is worthwhile. A 5% return is poor if the money could earn 6% on deposit, or was borrowed at 8%. The return has to beat the alternatives.',
  examMatters: 'End an interpretation with the decision it supports: borrow or not, which costs to cut, which price to change. A ratio that is calculated and described but never used for a decision stops halfway.',
  recall: {
    type: 'fillin',
    prompt: 'Complete the ROCE formula from the last chapter, then apply it:',
    template: [
      'ROCE divides ___ by capital employed.',
      'Borrowing at 15% to invest where ROCE is 12% ___ the profit left for shareholders.',
    ],
    answers: ['operating profit', 'reduces'],
    hints: ['the profit before interest is paid to lenders', 'the effect when a dollar costs more than it earns'],
    distractors: ['profit for the year', 'raises', 'revenue'],
  },
});

const interpretRisk = sub('interpreting-liquidity-and-gearing', {
  title: 'Interpreting Liquidity and Gearing to Make Business Decisions',
  keyIdea: 'Liquidity says whether the business can pay this year\'s bills; gearing says how much risk its financing carries. Together they shape how the next investment is paid for.',
  body: [
    p('Liquidity and gearing answer different questions, and each points to different decisions.'),
    bullets([
      '**Weak liquidity** — manage working capital: collect money from customers sooner, hold less stock, agree longer credit with suppliers, or turn a short-term debt into a long-term one.',
      '**High gearing** — pay for the next project with new shares or retained profit rather than another loan, repay debt, or sell assets the business does not need.',
      '**Low gearing, and a ROCE above the interest rate** — borrowing to expand is likely to add to the owners\' return.',
    ]),
    p(`${F.short} now has gearing of ${pct(PT.gearing)} and an acid test of ${ratio(PT.acid)}. Neither is alarming for a bakery with daily cash sales and loans costing less than its ROCE. But a second loan-financed bakery would first add interest owed to the bank every month; then, at the year end, the statement of financial position would show gearing pushed higher; and if sales fell in the year after that, the interest would still be owed. Issuing new shares would keep gearing down, at the cost of sharing future profit with more owners.`),
  ],
  realExample: { emoji: '✈️', text: 'A regional airline with gearing near 70% sees fuel prices jump. Its payments to lenders cannot be cut, so it raises money by selling two aircraft and leasing them back rather than borrowing again.' },
  misconception: 'Students recommend "borrowing more" or "issuing shares" without checking the other ratios. The right source of finance depends on how geared the firm already is, how steady its sales are, and whether its return beats what a loan would cost.',
  examMatters: 'Use two ratios together. A firm with high gearing and weak liquidity has a sharper problem than either figure shows alone, and a recommendation should say which it fixes first.',
  recall: {
    type: 'reorder',
    prompt: 'Put these stages in the order they happen, from signing the loan to the danger it creates.',
    criterion: 'the order in time, from the loan to the risk',
    correctOrder: [
      'The business signs a large loan to build a new factory',
      'From month one, a fixed interest charge must be paid',
      'Year-end accounts reveal a higher gearing ratio',
      'In the year after those accounts, a downturn cuts its operating profit',
      'Profit may no longer cover the interest due',
    ],
    why: [
      'The decision comes first: new borrowing adds to non-current liabilities.',
      'Interest is charged from the start of the loan and is owed whatever sales do.',
      'Gearing is read off the year-end snapshot, where more of capital employed is now borrowed.',
      'Sales fall in the year after those accounts, but the interest does not fall with them.',
      'The fixed charge now takes most or all of a smaller profit, which is the financial risk gearing measures.',
    ],
  },
});

const ratioLimits = sub('limitations-of-ratio-analysis', {
  title: 'The Limitations of Ratio Analysis',
  keyIdea: 'Ratios describe the past in numbers the business prepared itself, so they show that something has changed but rarely why, and never what the numbers leave out.',
  body: [
    p('The **limitations of ratio analysis** are what a careful reader states alongside every ratio:'),
    bullets([
      '**Historical data** — the statements describe a year that has ended, and conditions may already have changed.',
      '**Window dressing** — a business can make one day\'s statement of financial position look better, for example by delaying payments until after the year end or selling assets just before it.',
      '**Different accounting choices** — firms value inventory and spread the cost of assets in different ways, so comparisons between firms may not be like with like.',
      '**Different businesses** — a ratio that is normal for a bakery may be dangerous for a builder, so comparisons need firms of a similar type.',
      '**What numbers leave out** — the quality of the product, the brand, staff morale, the skill of managers, and what competitors are about to do.',
      '**Inflation** — rising prices can make revenue and profit grow in dollars while the business sells no more.',
    ]),
    p(`${F.short}'s ROCE fell after it built its bakery. The ratio alone cannot say whether that was a mistake or an investment that will pay off over the next ten years; the plan behind it can.`),
  ],
  realExample: { emoji: '🔍', text: 'A Jakarta retailer\'s current ratio looks strong on its reporting date because it held back every payment it could in the final fortnight. A month later, with the bills settled, the ratio is well below its published figure.' },
  misconception: 'Students write that ratios "prove" a business is doing well or badly. They are evidence to be questioned: they show what changed, while the cause and the future have to come from elsewhere in the case.',
  examMatters: 'When asked how useful ratios are, apply the limitations to the case in front of you — which figure could be window-dressed, what the ratios cannot see — rather than listing every limitation you know.',
  recall: {
    type: 'classify',
    prompt: 'Sort each problem by the limitation it shows: out-of-date figures, figures the business can shape, or what the numbers leave out.',
    groups: [
      { name: 'Out-of-date figures', items: ['A ratio from twelve months ago used to judge a firm after a fire', 'Last year\'s margins used to set prices after flour costs doubled'], why: 'The statements describe a period that has ended, so later changes are missing.' },
      { name: 'Figures the business can shape', items: ['Paying no suppliers in the week before the reporting date', 'Choosing a longer life for ovens so that yearly costs look smaller'], why: 'The business chose the timing or the accounting method, which moves the ratio without changing the business.' },
      { name: 'What the numbers leave out', items: ['A loyal customer base built over thirty years', 'A head baker about to leave for a rival'], why: 'Neither appears in either statement, yet both affect how competitive the business will be.' },
    ],
  },
});

/* ══ Chapter 4 — Measuring the workforce (3.3.5 · 3a-3b) ═════════════════ */

const productivity = sub('labour-productivity', {
  title: 'Labour Productivity',
  keyIdea: 'Labour productivity measures output per worker over a period. Higher productivity spreads each wage over more output, lowering the labour cost of every unit.',
  body: [
    bullets(['**Labour productivity** = output per period ÷ number of employees']),
    p('It is calculated for a period — a week, a month, a year — and for a group whose output can be counted: loaves baked, calls answered, rooms cleaned.'),
    p(`${F.short}'s central bakery made ${units(F.bakersL.loaves)} loaves a month with ${F.bakersL.staff} bakers last year: ${units(F.prodL)} each. This year ${F.bakersT.staff} bakers made ${units(F.bakersT.loaves)}: ${units(F.prodT)} each. Output rose, but productivity fell by about 6%.`),
    p('Interpreting it means asking why. New bakers still learning, old ovens beside new ones, or flour arriving short on some days would each lower output per worker. The decision depends on the cause: training, new equipment, or better planning.'),
    p('Productivity matters for competitiveness because wages are paid per worker, not per loaf. If each baker earns the same and makes fewer loaves, the labour cost of every loaf rises.'),
  ],
  realExample: { emoji: '☎️', text: 'A Manila call centre measures calls resolved per agent per shift. When it doubled its agents in one month, calls per agent fell for six weeks while the new staff learned the systems.' },
  misconception: 'Students confuse productivity with total output. A firm that hires more staff can produce more in total while each worker produces less; productivity is output per worker, not output overall.',
  examMatters: 'Give the figure with its unit — loaves per baker per month — and compare it with an earlier period or a similar business before saying what it shows.',
  recall: {
    type: 'classify',
    prompt: 'Sort each change by its likely effect on output per baker: raises labour productivity or lowers it.',
    groups: [
      { name: 'Raises it', items: ['Faster ovens bake more trays in each shift', 'The same number of loaves made by a smaller team', 'Better scheduling ends waiting for dough to prove'], why: 'Each lets the same workers produce more, or fewer workers produce the same.' },
      { name: 'Lowers it', items: ['Twenty new starters still being trained', 'A mixer breaks down for a week', 'Deliveries of ingredients come late on several days'], why: 'Each cuts output without cutting the number of workers.' },
    ],
  },
});

const turnover = sub('labour-turnover-and-retention', {
  title: 'Labour Turnover and Retention',
  keyIdea: 'Labour turnover compares the staff who leave with the average workforce; retention asks how many of those there at the start of a year are still there at its end.',
  body: [
    bullets([
      '**Labour turnover** = number of staff leaving ÷ average number of staff employed × 100',
      '**Retention rate** = staff employed at the start of the period who are still employed at its end ÷ staff employed at the start × 100',
    ]),
    p('The two are not mirror images. Turnover counts every leaver, including new starters who went within weeks; retention follows only the people who were already there. A firm can lose many new recruits and still keep its experienced staff.'),
    p(`In ${F.short}'s shops, ${F.HL.leavers} of an average ${F.HL.avg} staff left last year: turnover of ${pct(F.HL.turnover)}. This year ${F.HT.leavers} of ${F.HT.avg} left: ${pct(F.HT.turnover)}. Of the ${F.HT.start} staff employed at the start of this year, ${F.HT.stayed} were still there at the end, a retention rate of ${pct(F.HT.retention)}, down from ${pct(F.HL.retention)}.`),
    p(`Each leaver costs ${usd(F.replaceCost)} to replace in advertising, interviews and training, so turnover cost about ${usd(F.turnoverCostT)} this year against ${usd(F.turnoverCostL)} the year before, before counting slower service while new staff learn. Some turnover helps: it brings in new ideas and lets poor performers go.`),
  ],
  realExample: { emoji: '🍔', text: 'A fast-food chain in Riyadh finds that most of its leavers quit within their first three months. It pairs each new starter with an experienced worker, and within a year far fewer quit early.' },
  misconception: 'Students assume retention is simply 100% minus labour turnover. The two use different groups of staff — all leavers against the average workforce, or only those present at the start — so they can move apart.',
  examMatters: 'Put a cost on turnover where the case allows — leavers × the cost of replacing one — and weigh it against what it would cost to keep staff. The comparison is what turns a percentage into a decision.',
  recall: {
    type: 'fillin',
    prompt: 'Complete the two productivity facts from the step before:',
    template: [
      'Labour productivity divides ___ by the number of employees.',
      'If staff numbers rise faster than the loaves they make, labour productivity ___.',
    ],
    answers: ['output', 'falls'],
    hints: ['what the workers produce in the period', 'the direction when each worker produces less'],
    distractors: ['revenue', 'rises', 'wages'],
  },
});

const absenteeism = sub('absenteeism', {
  title: 'Absenteeism',
  keyIdea: 'Absenteeism measures the share of possible working days lost because staff were absent. A rising rate adds cost and is often a sign of deeper problems at work.',
  body: [
    bullets(['**Absenteeism** = number of staff days lost to absence ÷ total possible staff working days × 100']),
    p(`Possible working days are the number of staff multiplied by the days each is due to work. In ${F.short}'s shops, ${F.HT.avg} staff each due to work ${F.daysPerWorker} days give ${units(F.HT.possibleDays)} possible days. ${units(F.HT.daysLost)} were lost to absence: a rate of ${pct(F.HT.absence)}, up from ${pct(F.HL.absence)} (${units(F.HL.daysLost)} of ${units(F.HL.possibleDays)}).`),
    p('Absence costs twice. The absent worker may still be paid, and someone else must cover the shift, often on overtime, or the shop runs short-staffed and queues grow. Frequent short absences are also an early warning: they tend to rise with low morale, poor management or stressful shift patterns, the same causes that later push people to quit.'),
    p('The decision depends on the pattern. Absence concentrated in one shop points to its manager; absence on particular days points to rotas; long absences may be genuine illness that needs support rather than pressure.'),
  ],
  realExample: { emoji: '🏥', text: 'A private hospital in Doha finds that absence among night-shift nurses is double the day-shift rate. It changes the rota so no one works more than three nights in a row, and absence falls.' },
  misconception: 'Students treat every absence as a discipline problem. Much absence is genuine illness, and penalising it can make staff come to work sick or quit altogether; the rate shows how much time is lost, not why.',
  examMatters: 'Link absenteeism to cost and to the other measures in the case. A rise alongside rising turnover suggests one cause behind both, and a strategy aimed at that cause.',
  recall: {
    type: 'fillin',
    prompt: 'Complete the two labour turnover facts from the step before:',
    template: [
      'Labour turnover divides the number of ___ in a period by the average number of staff employed.',
      'A shop with an average of 40 staff, 10 of whom go during the year, has labour turnover of ___.',
    ],
    answers: ['leavers', '25%'],
    hints: ['the staff who went during the period', 'ten out of forty, as a percentage'],
    distractors: ['absences', '20%', '40%'],
  },
});

const hrLimits = sub('limitations-of-these-calculations', {
  title: 'The Limitations of These Calculations',
  keyIdea: 'Workforce measures show how much output, staff and time a business has gained or lost, but not why, and each can hide the detail that matters for a decision.',
  body: [
    p('Labour productivity, labour turnover, retention and absenteeism share the **limitations of these calculations**:'),
    bullets([
      '**They show what, not why** — a turnover rate does not say whether staff left for pay, for a bad manager or to study.',
      '**Averages hide differences** — one badly run shop can push up a chain\'s absence rate while every other shop is fine.',
      '**Quantity is not quality** — more loaves per baker is no gain if more are burnt; a call centre that answers calls faster may solve fewer problems.',
      '**Who leaves matters** — losing the weakest performer and losing the best baker count the same in a turnover rate.',
      '**Some output is hard to count** — a manager\'s or a designer\'s productivity has no simple unit.',
      '**Definitions differ** — firms count leavers, absence or staff numbers in different ways, so comparing with other businesses can mislead.',
    ]),
    p(`So ${F.short}'s managers would read the figures beside other evidence: exit interviews with leavers, staff surveys, and the pattern by shop and shift.`),
  ],
  realExample: { emoji: '💻', text: 'A software firm in Bengaluru reports falling labour turnover. Exit interviews show the problem it hides: the staff still going are its most skilled engineers, hired away by rivals.' },
  misconception: 'Students treat a lower labour turnover rate as always good news. Very low turnover can mean no new ideas and no room to promote, and a fall means little if the few who still go are the best staff.',
  examMatters: 'When a question asks how useful the data are, pair each figure with what it cannot show in this case, and name the extra evidence — exit interviews, surveys, shop-by-shop figures — that would fill the gap.',
  recall: {
    type: 'classify',
    prompt: 'Sort each problem by the limitation it shows: an average hides detail, quantity is not quality, or who leaves matters.',
    groups: [
      { name: 'An average hides detail', items: ['Nine shops with almost no absence and one with a great deal', 'One chain-wide productivity figure mixing new and old bakeries'], why: 'One figure for the whole business blends very different parts of it.' },
      { name: 'Quantity is not quality', items: ['More cakes per baker, but more returned by customers', 'Calls answered sooner, but more customers ringing back'], why: 'The measure counts output, not whether it was any good.' },
      { name: 'Who leaves matters', items: ['Turnover falls while the top two bakers resign', 'Turnover rises as weak performers are let go'], why: 'A turnover rate counts heads, not the value of the people behind them.' },
    ],
  },
});

/* ══ Chapter 5 — HR strategies (3.3.5 · 3c) ═════════════════════════════════ */

const rewards = sub('financial-rewards', {
  title: 'Financial Rewards',
  keyIdea: 'Financial rewards pay staff more, or pay them for results, attendance or loyalty. They act quickly, but the cost rises with every worker and the effect can fade.',
  body: [
    p('**Financial rewards** are the most direct human resource strategy: change what people are paid, or what they are paid for.'),
    bullets([
      '**Higher basic pay** — matching or beating rivals removes one reason to leave, reducing labour turnover.',
      '**Bonuses tied to output** — a payment for each unit above a target, or a team bonus, links pay to productivity.',
      '**Attendance and loyalty payments** — a bonus for a full month\'s attendance targets absenteeism; a payment after a set length of service targets retention.',
      '**Profit-related pay** — a share of profit gives staff a stake in results.',
    ]),
    p(`${F.short} pays shop staff ${usd(F.shopPay)} a month; its two largest rivals pay ${usd(F.rivalPay)}. Closing the gap for ${F.HT.avg} staff would cost about ${usd(F.HT.avg * (F.rivalPay - F.shopPay) * 12)} a year, the same as the ${usd(F.turnoverCostT)} that turnover now costs. No pay rise keeps every leaver, so fewer leavers alone cannot repay it. The case for it rests on what else it brings, such as experienced staff who serve customers better; a smaller reward aimed at the staff most likely to leave costs less.`),
    p('The limits: pay rises are hard to reverse, an output bonus can reward speed over quality, and money does little if people are going because of how they are managed.'),
  ],
  realExample: { emoji: '🧺', text: 'A laundry chain in Cairo pays each team a monthly bonus if it hits its target with no complaints. Output per worker rises, and the no-complaints condition stops quality being traded for speed.' },
  misconception: 'Students assume paying more always solves turnover and absence. If staff quit because of poor managers or unpredictable shifts, a pay rise raises costs without removing the cause; pay works best when pay is the reason.',
  examMatters: 'Cost the reward where you can and set it against the cost of the problem it targets. A reward that costs more than the turnover it prevents needs another justification, such as better service.',
  recall: {
    type: 'match',
    prompt: 'Match each financial reward to the problem it targets most directly.',
    pairs: [
      { left: 'A payment for every tray baked above the shift target', right: 'Low output per worker', why: 'It pays for extra output, so it aims at productivity.' },
      { left: 'A bonus for a month with no days off sick', right: 'Days lost to absence', why: 'It rewards attendance, so it aims at absenteeism.' },
      { left: 'A cash award after two years of service', right: 'Experienced staff drifting away', why: 'It is paid only for staying, so it aims at retention.' },
      { left: 'Basic pay raised to the level rival chains offer', right: 'Staff quitting for better-paid jobs', why: 'It removes the pay gap that pulls staff to rivals, so it aims at turnover.' },
    ],
  },
});

const esop = sub('employee-share-ownership', {
  title: 'Employee Share Ownership',
  keyIdea: 'Employee share ownership gives or sells staff shares in the business, so they gain when it does well. Shares that vest only after years of service also reward staying.',
  body: [
    p('In an **employee share ownership** scheme, staff receive shares free, as part of a bonus, or buy them at a discount. As owners, they receive dividends and gain if the share price rises.'),
    p('The aim is to make employees think like owners: if the business does well, so do they, which can lift effort, co-operation and productivity. Schemes often make shares **vest** only after a set period — two or three years — and anyone who quits earlier forfeits them, which gives staff a strong reason to stay.'),
    p(`${F.short}'s directors are considering a scheme costing about ${usd(F.esopCost)} a year, close to the ${usd(F.turnoverCostT)} that labour turnover cost this year. Even if no one left, that saving would not cover it, so the scheme must also be worth something the turnover figure leaves out, such as keeping the most experienced staff.`),
    p('The limits. Each worker\'s shares are a small part of the whole, so one person\'s effort barely moves the share price and the link between effort and reward is weak. Share prices can fall for reasons staff do not control. Issuing new shares dilutes existing owners, and in a family company, giving shares to staff means sharing control.'),
  ],
  realExample: { emoji: '🛠️', text: 'A Singapore engineering firm gives every employee shares that vest after three years. Resignations fall sharply in the second and third years of service, then return to normal once the shares are theirs.' },
  misconception: 'Students assume share ownership makes every employee work harder. The reward depends on the whole company\'s results, so it mainly builds loyalty and long-term commitment rather than day-to-day effort.',
  examMatters: 'Say what the scheme is for in this case — keeping staff, or raising effort — and whether its design (vesting, size of award) fits that aim. Weigh it against simpler rewards that act faster.',
  recall: {
    type: 'fillin',
    prompt: 'Complete the two facts about employee share ownership:',
    template: [
      'Shares that are forfeited by anyone who leaves within three years are designed mainly to raise ___.',
      'Issuing new shares to staff shrinks the slice of profit that goes to each existing ___.',
    ],
    answers: ['retention', 'shareholder'],
    hints: ['keeping the people already employed', 'someone who already owns part of the company'],
    distractors: ['productivity', 'supplier', 'absenteeism'],
  },
});

const consultation = sub('consultation-strategies', {
  title: 'Consultation Strategies',
  keyIdea: 'Consultation means asking staff for their views before a decision is made. Managers still decide, but decisions improve and staff feel heard.',
  body: [
    p('**Consultation strategies** give employees a voice before managers decide: staff meetings, suggestion schemes, surveys, and elected staff representatives or committees that meet managers regularly.'),
    p('It works on several measures at once. Staff who are asked about changes that affect them — new rotas, new equipment, new targets — are more likely to accept them, so fewer quit in frustration and fewer take days off when morale is low. The people doing the work often know where time is wasted, so their suggestions can raise productivity.'),
    p(`${F.short}'s leavers were asked why they went. Most mentioned pay, but many said that shift rotas were changed at a day's notice without anyone asking them. Consulting shop staff before rotas are set costs little compared with a pay rise.`),
    p('The limits. Consultation is slower than simply deciding. It raises expectations, and staff who are asked and then ignored may be more frustrated than if they had never been asked. Managers keep the final decision, so staff gain influence, not control.'),
  ],
  realExample: { emoji: '🧵', text: 'A Colombo garment factory sets up a monthly committee of elected machinists and managers. Its first change, moving breaks out of the hottest hour, costs nothing, and afternoon absence falls.' },
  misconception: 'Students treat consultation and empowerment as the same thing. In consultation employees are asked for opinions and the choice stays with management; in empowerment employees themselves choose, within agreed limits.',
  examMatters: 'Say who decides and how often staff are consulted in the case. Consultation that is regular and acted on is a strategy; a single survey is not.',
  recall: {
    type: 'reorder',
    prompt: 'Put the stages of a consultation in the order it runs, from the managers\' proposal to staff hearing the outcome.',
    criterion: 'the order a consultation runs',
    correctOrder: [
      'Managers set out a proposed change to the shift rota',
      'Staff give their views through their representatives',
      'Weighing those views, managers make the decision',
      'The decision and the reasons for it are explained to staff',
    ],
    why: [
      'Consultation starts from a proposal, before anything is decided.',
      'Views can only be given once there is a proposal to respond to.',
      'The decision comes after the views, and it is still the managers\' to make.',
      'Feedback closes the loop: staff see how their views were used, which keeps them taking part.',
    ],
  },
});

const empowerment = sub('empowerment-strategies', {
  title: 'Empowerment Strategies',
  keyIdea: 'Empowerment gives staff the authority to make decisions about their own work within agreed limits, so problems are solved where they happen.',
  body: [
    p('**Empowerment strategies** go further than consultation: employees are given the authority to decide, not only to advise. A shop team might set its own rota, decide how to handle a complaint, or reorder stock without waiting for a manager.'),
    p('Empowered staff can act at once, so customers are served faster and managers are freed for other work. Control over one\'s own work motivates many people, which can raise productivity and make them less likely to quit or to take unnecessary days off.'),
    p(`${F.short} could let each shop's team agree its own rota within the hours the shop must be staffed — the very decision its leavers complained about.`),
    p('The limits. Empowerment needs training and trust: staff given decisions without the skills or information to make them may make costly mistakes. Some employees do not want the responsibility. Managers must accept losing some control, and in a large chain, standards can drift between shops.'),
  ],
  realExample: { emoji: '🛎️', text: 'A hotel in Mauritius lets front-desk staff spend up to a set amount to put right any guest complaint without asking a manager. Complaints are settled faster, and staff say they feel trusted.' },
  misconception: 'Students think empowerment means managers stop managing. Managers still set the limits of each decision and provide targets, training and support; what changes is who makes the decision within those limits.',
  examMatters: 'Judge empowerment against the workforce in the case: its skills, experience and turnover. It suits settled, trained teams better than a workforce where most staff are new.',
  recall: {
    type: 'classify',
    prompt: 'Sort each change by the strategy it uses: consultation (staff advise, managers decide) or empowerment (staff decide).',
    groups: [
      { name: 'Consultation', items: ['Shop staff are surveyed before new opening hours are chosen', 'Bakers\' representatives comment on the plan for a new oven line', 'A suggestion box that managers review every month'], why: 'Staff give views, but managers keep the decision.' },
      { name: 'Empowerment', items: ['Counter staff draw up next week\'s working timetable themselves', 'Counter staff may refund an unhappy customer on the spot', 'Bakers choose the order in which to bake the day\'s batches'], why: 'Staff make the decision themselves, within limits managers have set.' },
    ],
  },
});

/* ══ The deck ═════════════════════════════════════════════════════════════ */

const BLOCK_PLAN = [
  {
    title: B1,
    subs: [soci, sofp, stakeholders],
    takeaway: [
      'Revenue minus each kind of cost, in turn, gives the three profit lines.',
      'The balance sheet is one day, and net assets equal total equity.',
      'Each stakeholder reads the lines that answer its own question.',
    ],
  },
  {
    title: B2,
    subs: [margins, liquidity, gearing, roce],
    takeaway: [
      'Margins show how many cents of each dollar of sales are kept as profit.',
      'The acid test asks the liquidity question without counting stock.',
      'Gearing and ROCE both divide by capital employed: debt plus equity.',
    ],
  },
  {
    title: B3,
    subs: [interpretProfit, interpretRisk, ratioLimits],
    takeaway: [
      'Compare every ratio with last year, with rivals, and with the cost of money.',
      'Borrowing adds to the owners\' return only while ROCE beats the interest rate.',
      'Ratios show what changed, not why, and leave out much that matters.',
    ],
  },
  {
    title: B4,
    subs: [productivity, turnover, absenteeism, hrLimits],
    takeaway: [
      'Productivity is output per worker, not output in total.',
      'Put a cost on turnover and absence before choosing a response.',
      'The figures show how much, not why: add exit interviews and surveys.',
    ],
  },
  {
    title: B5,
    subs: [rewards, esop, consultation, empowerment],
    takeaway: [
      'Match the strategy to the cause, not only to the measure that moved.',
      'Money acts fast but costs more with every worker.',
      'Consultation gives staff a voice; empowerment gives them the decision.',
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
 * THE LEAF MAP, BY HAND. 18 leaves at `bus_spec.txt:1222-1248` (23 rows in `spec-items.json`).
 * Every ledger id's corrected citation runs through this table rather than through its "3.5.x".
 */
export const LEAF_MAP = {
  'BUS-3.3.5-1a-1': ['statement-of-comprehensive-income'],
  'BUS-3.3.5-1a-2': ['stakeholder-interest-in-the-statements'],
  'BUS-3.3.5-1b-1': ['statement-of-financial-position'],
  'BUS-3.3.5-1b-2': ['stakeholder-interest-in-the-statements'],
  'BUS-3.3.5-2a-1': ['gross-profit-and-profit-for-the-year-margins'],
  'BUS-3.3.5-2a-2': ['liquidity-current-and-acid-test-ratios'],
  'BUS-3.3.5-2a-3': ['gearing-ratio'],
  'BUS-3.3.5-2a-4': ['return-on-capital-employed'],
  'BUS-3.3.5-2b': ['interpreting-roce-and-margins', 'interpreting-liquidity-and-gearing'],
  'BUS-3.3.5-2c': ['limitations-of-ratio-analysis'],
  'BUS-3.3.5-3a-1': ['labour-productivity'],
  'BUS-3.3.5-3a-2': ['labour-turnover-and-retention'],
  'BUS-3.3.5-3a-3': ['absenteeism'],
  'BUS-3.3.5-3b': ['limitations-of-these-calculations'],
  'BUS-3.3.5-3c-1': ['financial-rewards'],
  'BUS-3.3.5-3c-2': ['employee-share-ownership'],
  'BUS-3.3.5-3c-3': ['consultation-strategies'],
  'BUS-3.3.5-3c-4': ['empowerment-strategies'],
};

/* ══ Notes ════════════════════════════════════════════════════════════════ */
/*
 * ONE NOTES TOPIC PER CHAPTER, TITLED AS THE CHAPTER (`depth.notes-titles` by construction). No
 * misconception field, so none can repeat a subsection's.
 */
const def = (html) => ({ type: 'definition', text: html });
const mech = (html) => ({ type: 'mechanism', text: html });
const link = (html) => ({ type: 'link', text: html });

export const NOTES = [
  {
    title: B1,
    meta: '3.3.5 · 1a-1b',
    keyIdea: 'Two statements: a year of trading down to the profit for the year, and one day\'s snapshot of what is owned, owed and owned by the owners.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Statement of comprehensive income</strong> — revenue − cost of sales = gross profit; − other operating expenses = operating profit; − interest = profit for the year.'),
        def('<strong>Statement of financial position</strong> — non-current assets + current assets − current liabilities − non-current liabilities = net assets = total equity (share capital + retained profits).'),
        def('<strong>Stakeholder interest</strong> — shareholders read profit and its trend; lenders, operating profit against interest; suppliers, current assets against current liabilities; employees, revenue and profit; government, profit.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`${F.short}: revenue ${usdm(L.revenue)} → ${usdm(T.revenue)}; profit for the year ${usdm(L.pfy)} → ${usdm(T.pfy)}; interest ${usdm(L.interest)} → ${usdm(T.interest)}.`),
        mech(`Non-current assets ${usdm(PL.nca)} → ${usdm(PT.nca)}, loans ${usdm(PL.ncl)} → ${usdm(PT.ncl)}: the bakery was mostly borrowed for.`),
        link('Compare lines and years; a single figure quoted alone says little.'),
      ] },
    ],
    takeaway: ['Three profit lines, three kinds of cost.', 'Net assets equal total equity.', 'Each reader, its own lines.'],
  },
  {
    title: B2,
    meta: '3.3.5 · 2a',
    keyIdea: 'Six calculations from the two statements: two margins, two liquidity ratios, gearing and ROCE.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Gross profit margin</strong> = gross profit ÷ revenue × 100. <strong>Profit for the year margin</strong> = profit for the year ÷ revenue × 100.'),
        def('<strong>Current ratio</strong> = current assets ÷ current liabilities. <strong>Acid test</strong> = (current assets − inventory) ÷ current liabilities.'),
        def('<strong>Capital employed</strong> = non-current liabilities + total equity. <strong>Gearing</strong> = non-current liabilities ÷ capital employed × 100.'),
        def('<strong>ROCE</strong> = operating profit ÷ capital employed × 100.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`${F.short}: gross margin ${pct(L.gpm)} → ${pct(T.gpm)}; profit for the year margin ${pct(L.pfym)} → ${pct(T.pfym)}.`),
        mech(`Current ${ratio(PL.current)} → ${ratio(PT.current)}; acid test ${ratio(PL.acid)} → ${ratio(PT.acid)}; gearing ${pct(PL.gearing)} → ${pct(PT.gearing)}; ROCE ${pct(PL.roce)} → ${pct(PT.roce)}.`),
        link('ROCE uses operating profit because capital employed includes the lenders\' money.'),
      ] },
    ],
    takeaway: ['Margins: profit ÷ revenue.', 'Acid test: leave out inventory.', 'Gearing and ROCE: ÷ capital employed.'],
  },
  {
    title: B3,
    meta: '3.3.5 · 2b-2c',
    keyIdea: 'Compare each ratio over time, with rivals and with the cost of money, act on what the comparison shows, and state what the ratios cannot see.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Interpreting ratios</strong> — comparing a ratio with last year, with rivals or the industry, and with the cost of finance, to support a decision.'),
        def('<strong>Window dressing</strong> — timing transactions so one day\'s statement of financial position looks better than the business really is.'),
        def('<strong>Limitations of ratio analysis</strong> — historical data; window dressing; different accounting choices; different kinds of business; qualitative factors left out; inflation.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`ROCE ${pct(PT.roce)} against borrowing at ${pct(F.borrowRate)}: each borrowed dollar earns about 20 cents and costs 8.`),
        mech('Weak liquidity → manage working capital. High gearing → shares or retained profit, not another loan.'),
        link('A falling ROCE after a large investment may be timing, not failure.'),
      ] },
    ],
    takeaway: ['Compare, then decide.', 'ROCE against the interest rate.', 'What changed, not why.'],
  },
  {
    title: B4,
    meta: '3.3.5 · 3a-3b',
    keyIdea: 'Four workforce measures, each calculated and interpreted for a decision, and the limits of what they can show.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Labour productivity</strong> = output per period ÷ number of employees.'),
        def('<strong>Labour turnover</strong> = staff leaving ÷ average number of staff × 100. <strong>Retention</strong> = staff there at the start and still there at the end ÷ staff at the start × 100.'),
        def('<strong>Absenteeism</strong> = staff days lost to absence ÷ total possible staff working days × 100.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`${F.short}: ${units(F.prodL)} → ${units(F.prodT)} loaves per baker a month; turnover ${pct(F.HL.turnover)} → ${pct(F.HT.turnover)}; retention ${pct(F.HL.retention)} → ${pct(F.HT.retention)}; absenteeism ${pct(F.HL.absence)} → ${pct(F.HT.absence)}.`),
        mech(`Turnover cost: leavers × ${usd(F.replaceCost)} = ${usd(F.turnoverCostL)} → ${usd(F.turnoverCostT)}.`),
        link('Limitations: what not why; averages hide detail; quantity not quality; who leaves matters; definitions differ.'),
      ] },
    ],
    takeaway: ['Per worker, per period.', 'Cost it before choosing.', 'Add the evidence the figures miss.'],
  },
  {
    title: B5,
    meta: '3.3.5 · 3c',
    keyIdea: 'Four strategies to raise productivity and retention and cut turnover and absenteeism: financial rewards, employee share ownership, consultation and empowerment.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Financial rewards</strong> — higher basic pay, output bonuses, attendance and loyalty payments, profit-related pay.'),
        def('<strong>Employee share ownership</strong> — shares given or sold to staff, often vesting only after years of service.'),
        def('<strong>Consultation</strong> — staff give views before managers decide. <strong>Empowerment</strong> — staff make decisions about their own work within agreed limits.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Pay gap: ${usd(F.shopPay)} against ${usd(F.rivalPay)} a month; closing it costs ${usd(F.HT.avg * (F.rivalPay - F.shopPay) * 12)} a year, the same as the ${usd(F.turnoverCostT)} turnover costs, so fewer leavers alone cannot repay it.`),
        mech('Vesting shares reward staying; one worker\'s effort barely moves the share price.'),
        link('Leavers\' complaints about rotas point to consultation or empowerment before more pay.'),
      ] },
    ],
    takeaway: ['Match strategy to cause.', 'Cost it against the problem.', 'Voice or decision.'],
  },
];
