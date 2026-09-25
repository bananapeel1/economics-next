/**
 * PACKET 36 — managing-finance content: five blocks, twenty-four subsections, one per step.
 *
 * `audit/raw/bus_spec.txt:921-958`. The block order is the specification's own three sub-topics,
 * with Profit split in two and Liquidity split in two, so that no chapter is twice the size of
 * another: Profit · Profitability · Cash and the Statement of Financial Position · Liquidity ·
 * Business Failure.
 *
 * WHAT `structure-03` ASKED FOR AND WHAT IT GETS. The finding is that the live blocks 1
 * ("Understanding Profit") and 2 ("Income Statement") overlap, because the net-profit subsection
 * already walks the statement top to bottom and block 2 then re-teaches it. Its proposed split is
 * exactly the first two blocks here: calculations and the statement of comprehensive income, then
 * the margins and the ways to improve them. `structure-10` says the live step pairing and the
 * difficulty ramp are already sensible and asks for no action; the ramp is kept — calculate, then
 * interpret, then cash, then liquidity, then failure — and the pairing complaint cannot arise
 * because one subsection is one step here (packets 16 and 17).
 *
 * `structure-07` IS FIXED BY GENERATION RATHER THAN BY ADDING PARAGRAPHS. The finding is that the
 * quiz and the flashcards test the statement of financial position, current assets and liabilities
 * and working capital, none of which `content[]` teaches — two surfaces authored from different
 * lists. Every surface in this packet is generated from `_packet36-util.mjs`, and the runner fails
 * the build if a quiz item tests a term no subsection teaches, so the defect is unrepresentable
 * rather than corrected.
 *
 * `structure-09` IS A CONTRADICTION AND IT IS RESOLVED BY ARITHMETIC. The live Liquidity block
 * offers selling underused assets in its body and forbids it in its takeaway and misconception.
 * `2b`'s own bullet at :939 names "assets" first among the ways to improve liquidity, so the
 * takeaway was refusing what the specification requires. Selling an underused asset is taught here,
 * with the figure it raises and the capacity it costs — and the four ways are separated by what
 * each does to working capital, to the two ratios and to the bank balance rather than by whether
 * the author approves of them.
 *
 * THE RECALLS. `structure-12` and `topFix-02` are one systemic defect: all seven live fill-ins hint
 * with the first three letters of the answer, so the widget tests spelling completion. Every recall
 * below is rebuilt. The rules the runner enforces are the packet-7 contract plus the two this
 * programme has had to learn — no hint that is a prefix of its answer, and no recall answerable by
 * scrolling up, which is why most fill-ins here ask for a figure the student has to work out from
 * the statements rather than a word lifted out of the paragraph above.
 */
import {
  SECTION, subId, money, qty, pct, ratio, days,
  FIRM, PROFITS, LIQUIDITY_MOVES, INTERNAL_CAUSES, EXTERNAL_CAUSES,
} from './_packet36-util.mjs';

const F = FIRM;

const recall = (sid, r) => {
  const out = { id: `${sid}:recall`, ...r };
  if (r.type === 'match' && Array.isArray(r.why)) { out.pairs = r.pairs.map((x, i) => ({ ...x, why: r.why[i] })); delete out.why; }
  if (r.type === 'classify' && Array.isArray(r.why)) { out.groups = r.groups.map((x, i) => ({ ...x, why: r.why[i] })); delete out.why; }
  return out;
};

const blockId = (title) => `${SECTION}:block:${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;

export const B1 = 'Profit';
export const B2 = 'Profitability';
export const B3 = 'Cash and the Statement of Financial Position';
export const B4 = 'Liquidity';
export const B5 = 'Business Failure';

/* ══ Block 1 — Profit (2.3.3 · 1a, 1c) ═══════════════════════════════════ */

const profitLadder = (() => {
  const sid = subId('the-three-profits');
  return {
    id: sid,
    title: 'The Three Profits',
    keyIdea: 'A business does not have one profit figure. It has three, and each one is what is left after a different set of costs has been taken off.',
    body: [
      { type: 'paragraph', text: `Sub-topic 1 of 2.3.3 opens by asking for the calculation of three things: **gross profit**, **operating profit** and **profit for the year (net profit)**. They are not three ways of saying the same thing. They are three points on one ladder, and each step down takes off a different kind of cost.` },
      { type: 'paragraph', text: `Appendix 9 prints the ladder: ${PROFITS.map(([k, f]) => `**${k}** = ${f}`).join('; ')}. Nothing else comes off. There is no tax line in the specification's own statement.` },
      { type: 'paragraph', text: `At ${F.name}, ${F.what}, a year of trading produces ${money(F.grossProfit)}, then ${money(F.operatingProfit)}, then ${money(F.profitForYear)}. Three numbers, one business, one year — and a question that says "profit" without saying which is a question that cannot be answered.` },
      { type: 'paragraph', text: `Why three? Each one answers a different question. Gross profit asks whether the goods are bought and sold well; operating profit asks whether the whole trading operation works; profit for the year asks what is left for the owners once the lenders have been paid.` },
    ],
    realExample: { emoji: '🧱', text: `Two tile wholesalers can report the same ${money(F.profitForYear)} while one buys far better and the other borrows far less. The ladder is what tells them apart.` },
    misconception: `Students treat "profit" as a single number and pick whichever line is nearest in the data table. A question asking for operating profit wants the figure before interest, and an answer that has taken interest off has answered a different question with the right arithmetic.`,
    examMatters: `Appendix 6 defines Calculate as requiring students to perform a calculation based on given data, with workings given. Setting the three lines out in the specification's order is the workings, and it shows which of the three the question asked for.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `A wholesaler reports revenue of $900,000, cost of sales of $560,000, other operating expenses of $250,000 and interest of $24,000. Work down the ladder, in thousands of dollars:`,
      template: [
        `Revenue less cost of sales gives a gross profit of $___ thousand`,
        `Taking the other operating expenses off that leaves an operating profit of $___ thousand`,
        `And taking the interest off that leaves, for the year, $___ thousand`,
      ],
      answers: ['340', '90', '66'],
      hints: ['one subtraction from the top line', 'the second subtraction, before anything is paid to a lender', 'the last step on the ladder, and the one the owners keep'],
      distractors: ['650', '316'],
    }),
  };
})();

const grossProfit = (() => {
  const sid = subId('gross-profit');
  return {
    id: sid,
    title: 'Gross Profit',
    keyIdea: 'Gross profit is revenue less the cost of the goods themselves. It measures buying and pricing, and nothing else.',
    body: [
      { type: 'paragraph', text: `**Gross profit = revenue − cost of sales.** Cost of sales is what the goods that were actually sold cost the business to obtain. Everything else a business spends belongs on the line below, however necessary it is.` },
      { type: 'paragraph', text: `${F.name} sold ${money(F.revenue)} of tiles that had cost ${money(F.costOfSales)} to buy in. Gross profit is ${money(F.grossProfit)}. That is the money available to pay for everything else the business does, and it is the ceiling on every figure below it.` },
      { type: 'paragraph', text: `Because only two figures go into it, gross profit can move for only two reasons: what the business charges, or what the goods cost. A gross profit that has fallen while revenue held up means the goods got dearer; a gross profit that has fallen with revenue means fewer were sold.` },
      { type: 'paragraph', text: `That is what makes it a diagnostic line rather than a headline. It is the first place to look when a business is earning less, because it separates a buying problem from a spending problem before any of the other costs are considered.` },
    ],
    realExample: { emoji: '📦', text: `An importer whose supplier raises prices by a tenth sees gross profit fall even though it sells exactly as many tiles at exactly the same price. Nothing about the way it runs its office changed.` },
    misconception: `Students put wages and rent into cost of sales because they are costs. Cost of sales is only what the goods sold cost to obtain. Putting the office wages in produces a gross profit that is really an operating profit, and then the next line double-counts.`,
    examMatters: `A data table gives revenue and cost of sales as separate lines precisely so that this subtraction can be made. Appendix 6 defines Calculate as requiring a calculation based on given data, so the two figures it hands you are the two it expects to see used.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'A tile wholesaler lists its costs for the year. Sort each one by whether it belongs in cost of sales or below the gross profit line:',
      groups: [
        { name: 'Cost of sales', items: ['Invoices from the factory for goods that left the warehouse', 'Freight charged on those goods before they arrived'] },
        { name: 'Below gross profit', items: ['A sales manager\'s salary', 'Insurance on the premises', 'A campaign to win new builders'] },
      ],
      why: [
        'Both are what the goods that were sold cost to obtain, which is the whole definition of cost of sales.',
        'Each of these is owed whichever goods were sold, and in most years whether any were sold at all, so it belongs with the other operating expenses on the line below.',
      ],
    }),
  };
})();

const operatingProfit = (() => {
  const sid = subId('operating-profit');
  return {
    id: sid,
    title: 'Operating Profit',
    keyIdea: 'Operating profit is gross profit less the other operating expenses. It is what the trading operation earns before the cost of borrowing.',
    body: [
      { type: 'paragraph', text: `**Operating profit = gross profit − other operating expenses.** The other operating expenses are the costs of running the business rather than of buying the goods: salaries, rent, insurance, marketing, the electricity in the warehouse.` },
      { type: 'paragraph', text: `${F.name} has ${money(F.grossProfit)} of gross profit and ${money(F.operatingExpenses)} of other operating expenses, so operating profit is ${money(F.operatingProfit)}. More than two thirds of the gross profit is consumed before the line is reached.` },
      { type: 'paragraph', text: `This is the line that says whether the business works. It takes in everything the firm decides — what it charges, what it pays for goods, how many people it employs, what it spends on getting customers — and it stops short of how the business was financed. Two firms doing exactly the same trade have the same operating profit whether one borrowed heavily and the other did not.` },
      { type: 'paragraph', text: `That is why it is the line to compare across businesses. The figure below it mixes the quality of the trade with the size of the loan, and a firm can look worse than a rival purely for having borrowed.` },
    ],
    realExample: { emoji: '🏭', text: `Two wholesalers buying and selling identically report the same operating profit. One then pays ${money(F.interest)} of interest and the other pays none, and their final lines differ by exactly that.` },
    misconception: `Students call this figure net profit, because it is the profit after "all the costs" they can see. Interest has not been taken off yet. The specification's own ladder puts interest between operating profit and profit for the year, and the two are different numbers whenever a business has borrowed anything.`,
    examMatters: `Where a data table gives no interest figure, the last profit it can support is operating profit. Appendix 6 defines Calculate as a calculation based on given data: a profit for the year cannot be produced from data that contains no interest.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `A rival wholesaler reports revenue of $1,500,000, cost of sales of $1,000,000, other operating expenses of $350,000 and interest of $30,000. Work down its ladder, in thousands of dollars:`,
      template: [
        'Its gross profit is $___ thousand',
        'Its operating profit is $___ thousand',
        'And what is left for its owners is $___ thousand',
      ],
      answers: ['500', '150', '120'],
      hints: ['the first subtraction on the ladder', 'the second subtraction on the ladder', 'take the cost of borrowing off the figure above'],
      distractors: ['1150', '470'],
    }),
  };
})();

const profitForTheYear = (() => {
  const sid = subId('profit-for-the-year');
  return {
    id: sid,
    title: 'Profit for the Year',
    keyIdea: 'Profit for the year is operating profit less interest. It is the specification\'s name for what most textbooks call net profit.',
    body: [
      { type: 'paragraph', text: `**Profit for the year = operating profit − interest.** The specification writes it as "profit for the year (net profit)" at 2.3.3 · 1a, and Appendix 9 uses the same pair of names. Both appear on data tables, and they are the same line.` },
      { type: 'paragraph', text: `${F.name} has ${money(F.operatingProfit)} of operating profit and pays ${money(F.interest)} of interest on a loan of ${money(F.loan)}, which is ${pct(F.interestRate)}. Profit for the year is ${money(F.profitForYear)}.` },
      { type: 'paragraph', text: `Interest is the only thing that comes off at this step, and it is fixed by decisions made in the past: how much was borrowed, on what terms. Nothing the business does this week changes it. That is exactly why it sits below operating profit rather than inside the expenses — it measures the financing, not the trading.` },
      { type: 'paragraph', text: `The line matters because it is what is actually left for the owners: to reinvest, or to take out. A business can trade well and keep very little of it, which is what a large interest line means and what the failure chapter returns to.` },
    ],
    realExample: { emoji: '🧾', text: `A firm that borrowed ${money(F.loan)} to buy its warehouse hands ${money(F.interest)} a year to its lender before its owners see anything. Over five years that is ${money(F.interest * 5)}.` },
    misconception: `Students see three names — net profit, profit for the year, operating profit — and pair the wrong two. Operating profit is before interest; profit for the year and net profit are the same figure, after it. Treating net profit and operating profit as one line merges two rungs of the ladder, and the two are only equal for a business that has borrowed nothing.`,
    examMatters: `The label a data table uses is the specification's, so a question may say "profit for the year" where a textbook says net profit. Appendix 6 defines Calculate as working from given data: match the label on the table to the rung, not to the word you revised from.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each figure from a data table to the line of the statement it belongs on:',
      pairs: [
        { left: 'Revenue less cost of sales', right: 'Gross profit' },
        { left: 'The figure before the cost of borrowing is taken off', right: 'Operating profit' },
        { left: 'The figure the specification also calls net profit', right: 'Profit for the year' },
        { left: 'Salaries, rent and marketing added together', right: 'Other operating expenses' },
      ],
      why: [
        'Only the goods themselves come off at this step, which is what makes it the buying-and-pricing line.',
        'Interest is the next step down, so the rung above it is the trading operation on its own.',
        'The specification writes the leaf as "profit for the year (net profit)", so the two names label one line.',
        'These are the costs of running the business rather than of obtaining the goods, so they sit between the first two profits.',
      ],
      distractors: ['Cost of sales'],
    }),
  };
})();

const statementOfComprehensiveIncome = (() => {
  const sid = subId('statement-of-comprehensive-income');
  return {
    id: sid,
    title: 'The Statement of Comprehensive Income',
    keyIdea: 'The statement of comprehensive income is the ladder written out as a document. It covers a period of trading, not a moment in time.',
    body: [
      { type: 'paragraph', text: `2.3.3 · 1c names the document: the **statement of comprehensive income (profit and loss account)**. It is the ladder set out in order, and every figure a profit question needs is on it. Appendix 8 of the specification says the assessments use International Accounting Standards terminology, so this is the name that appears on the paper.` },
      { type: 'paragraph', text: `The order is fixed and it is the order of the calculation: revenue, then cost of sales, then gross profit, then other operating expenses, then operating profit, then interest, then profit for the year. Reading down it is doing the arithmetic.` },
      { type: 'paragraph', text: `The most important thing about it is the word missing from its name: it covers a **period**. ${F.name}'s statement says what happened across a whole year of trading. It is a record of flows — money earned and costs incurred between one date and another — not a photograph of what the business owns.` },
      { type: 'paragraph', text: `That distinction decides which document a question is about. Anything with the word "during" in it is this statement. Anything asking what the business holds or owes is the other one, which the next chapter reaches.` },
    ],
    realExample: { emoji: '📄', text: `A data table headed "for the year ended 31 March" is this statement. One headed "as at 31 March" is not, and the two are never interchangeable however similar the figures look.` },
    misconception: `Students read the statement as a snapshot and conclude that the profit figure is money sitting somewhere. It is a flow across a period. There is no account anywhere holding ${money(F.profitForYear)}, and the chapter on cash explains where it went.`,
    examMatters: `Appendix 6 defines Explain as requiring a brief explanation of cause or effect supported by details or examples. A question about a movement in one line wants the cause and its effect on the line below, which is what reading the statement in order gives you.`,
    /*
     * NOT A REORDER, ALTHOUGH THE LADDER IS A SEQUENCE. `learn-steps.js` renders the recall under
     * the teaching on the same step, and this step's whole job is to print the order — so a reorder
     * of the four lines would have its answer on screen above it (packets 26, 27, 29). The ordering
     * is tested in the quiz and the practice instead; what the widget tests here is the thing the
     * subsection actually adds, which is which of the two documents a question is about.
     */
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Decide which document each question is answered from, by sorting them into these two groups:',
      groups: [
        { name: 'Statement of comprehensive income', items: ['How much did the firm earn from selling during the year?', 'What was spent on salaries over the twelve months?', 'How much interest was paid across the year?'] },
        { name: 'The other document', items: ['How much is sitting in the bank account today?', 'What is owed to suppliers as things stand?'] },
      ],
      why: [
        'Each of these measures something that happened across a period, which is exactly what this document records and why its heading names a stretch of time.',
        'Each of these is a quantity held or owed at one moment, so it belongs on the document taken on a single date — the one the next chapter reaches.',
      ],
    }),
  };
})();

/* ══ Block 2 — Profitability (2.3.3 · 1b, 1c) ════════════════════════════ */

const grossProfitMargin = (() => {
  const sid = subId('gross-profit-margin');
  return {
    id: sid,
    title: 'Gross Profit Margin',
    keyIdea: 'A margin turns a profit into a rate: how much of every dollar of revenue survives to that line. It is what lets two different-sized firms be compared.',
    body: [
      { type: 'paragraph', text: `2.3.3 · 1c asks for **measuring profitability**, and profitability is not profit. Profit is an amount; profitability is a rate. The specification wants the calculation of three of them — the gross profit margin, the operating profit margin, and the profit for the year (net profit) margin. **Gross profit margin = (gross profit ÷ revenue) × 100.**` },
      { type: 'paragraph', text: `${F.name} has ${money(F.grossProfit)} of gross profit on ${money(F.revenue)} of revenue, so its gross profit margin is ${pct(F.gpm)}. Of every dollar a builder pays, ${pct(F.gpm)} is left once the tiles have been paid for.` },
      { type: 'paragraph', text: `The point of the rate is comparison. A firm ten times the size has ten times the gross profit, and that says nothing about whether it trades better. The margin strips the size out, so it can be set against last year, against a rival, or against the trade.` },
      { type: 'paragraph', text: `Because only revenue and cost of sales go into it, a moving gross profit margin has a short list of causes: prices charged, prices paid, or a change in what is being sold. Appendix 9 prints the formula, and Unit 2's own description says these ratios are not supplied in the examination.` },
    ],
    realExample: { emoji: '📐', text: `A wholesaler moving from plain tiles to patterned ones can hold revenue flat and still see its gross profit margin rise, because the patterned tiles carry more margin each.` },
    misconception: `Students report the margin as a fraction of profit rather than of revenue, or divide by cost of sales. Every margin in Appendix 9 has revenue underneath it. Dividing by anything else produces a number that cannot be compared with anybody's.`,
    examMatters: `Appendix 6 defines Calculate as a calculation based on given data with workings given, and Unit 2's description says the ratios are not supplied. Write the formula, substitute, then give the percentage: the substitution is the working that shows which figures were used.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `A rival wholesaler reports revenue of $800,000 and cost of sales of $560,000. Work out where it stands against ${F.name}'s ${pct(F.gpm)}:`,
      template: [
        'Its gross profit, in thousands of dollars, is $___ thousand',
        'Its gross profit margin is ___',
        `Against ${F.name} it is therefore ___ profitable at this line`,
      ],
      answers: ['240', '30%', 'less'],
      hints: ['the top subtraction, before any percentage is taken', 'divide that by the revenue and multiply by a hundred', 'compare the two percentages and say which way it goes'],
      distractors: ['560', '70%', 'more'],
    }),
  };
})();

const operatingProfitMargin = (() => {
  const sid = subId('operating-profit-margin');
  return {
    id: sid,
    title: 'Operating Profit Margin',
    keyIdea: 'Operating profit margin measures the whole trading operation as a rate. It is the one margin that is not affected by how the business was financed.',
    body: [
      { type: 'paragraph', text: `**Operating profit margin = (operating profit ÷ revenue) × 100.** It is named in the specification alongside the other two, at 2.3.3 · 1c, and printed in Appendix 9 with them.` },
      { type: 'paragraph', text: `${F.name} keeps ${money(F.operatingProfit)} of its ${money(F.revenue)} of revenue as operating profit, so the margin is ${pct(F.opm)}. Against a gross profit margin of ${pct(F.gpm)}, the gap of ${pct(F.gpm - F.opm)} is exactly what running the business costs, expressed as a rate.` },
      { type: 'paragraph', text: `That gap is the reason this margin is worth having separately. A business can have an excellent gross profit margin and a poor operating profit margin, and the diagnosis is completely different: the first says the buying and pricing work, the second says the overheads have eaten the result.` },
      { type: 'paragraph', text: `It is also the fairest of the three for comparing firms, because interest has not been taken off yet. A heavily borrowed business and a debt-free one doing identical trade report the same operating profit margin and different profit for the year margins.` },
      { type: 'paragraph', text: `The sensitivity is worth seeing. A ${pct(F.priceCut)} cut in price with the same tiles sold takes revenue to ${money(F.competitionRevenue)}, leaves cost of sales untouched, and drops operating profit to ${money(F.competitionProfit)} — half of it, from a five per cent move.` },
    ],
    realExample: { emoji: '📉', text: `A wholesaler that discounts by a twentieth to hold a customer has given away half of its operating profit, because nothing it pays out fell with the price.` },
    misconception: `Students treat the three margins as three difficulty levels of the same measurement and quote whichever they calculated. They answer different questions. If a question is about cost control, the gross and operating margins together are the answer, and the third one is noise.`,
    examMatters: `Appendix 6 defines Analyse as requiring a brief chain of reasoning applied to given data. A chain that moves from a change in price to the operating profit margin, and then to what the firm can still afford, is the shape this command word asks for.`,
    recall: recall(sid, {
      type: 'fillin',
      /*
       * SPLIT THE REVENUE DOLLAR rather than restate the gross profit margin. The first draft of
       * this recall opened with the line "Its gross profit margin is ___" answering "30%" — which
       * is character for character the second line of the PREVIOUS step's recall, with the same
       * answer and with "30%" sitting in this step's word bank. That is `structure-02` reappearing
       * one step to the left of where the item found it: a blank a student answers for free because
       * they answered it thirty seconds ago. The three shares sum to the whole dollar, so the
       * arithmetic checks itself and none of the three answers occurs in the neighbouring banks.
       */
      prompt: 'A rival wholesaler reports revenue of $1,500,000, cost of sales of $900,000 and other operating expenses of $480,000. Split its revenue dollar three ways:',
      template: [
        'Cost of sales takes ___ of every dollar of revenue',
        'Other operating expenses take ___ of every dollar of revenue',
        'Its operating profit margin is therefore ___',
      ],
      answers: ['60%', '32%', '8%'],
      hints: ['divide the cost of sales by the revenue and multiply by a hundred', 'the same arithmetic on the cost of running the business', 'whatever is left of the dollar once the other two shares have been taken'],
      distractors: ['40%', '12%'],
    }),
  };
})();

const netProfitMargin = (() => {
  const sid = subId('profit-for-the-year-margin');
  return {
    id: sid,
    title: 'Profit for the Year Margin',
    keyIdea: 'The profit for the year margin is what survives everything, including the lenders. It is the only margin that reflects how the business was financed.',
    body: [
      { type: 'paragraph', text: `**Profit for the year (net profit) margin = (profit for the year ÷ revenue) × 100.** Appendix 9 gives both names for it, because both appear on data tables.` },
      { type: 'paragraph', text: `${F.name} keeps ${money(F.profitForYear)} of ${money(F.revenue)}, so the margin is ${pct(F.npm)}. Every dollar a builder spends leaves ${pct(F.npm)} with the owners once the tiles, the running costs and the lender have all been paid.` },
      { type: 'paragraph', text: `The distance from the operating margin to this one is the financing. Here it is ${pct(F.opm - F.npm)} of revenue, and it is entirely the ${money(F.interest)} of interest. A firm with no borrowing has no gap at all.` },
      { type: 'paragraph', text: `So the three margins read as a diagnosis from the top down. The first gap is what the goods cost; the second is what running the business costs; the third is what borrowing costs. A student who can say which gap widened has said something a single profit figure cannot.` },
    ],
    realExample: { emoji: '🔍', text: `Two firms both report a ${pct(F.npm)} final margin. One has a ${pct(F.gpm)} gross margin and heavy overheads; the other buys badly and spends almost nothing. They need opposite remedies.` },
    misconception: `Students read a low final margin as a badly run business. It can equally be a well-run business with a large loan. The operating profit margin is what separates the two, which is why the specification asks for all three rather than for the last one.`,
    examMatters: `Appendix 6 defines Analyse as a brief chain of reasoning, explanation or justification applied to given data. Quoting all three margins is not a chain; naming which gap moved, and why that cause produces that effect, is.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'A wholesaler\'s three margins are all lower than last year. Decide which gap each explanation widened, by sorting them into the two groups:',
      groups: [
        { name: 'Widens the gap below gross profit', items: ['The firm hired two more sales staff', 'The warehouse rent went up', 'The firm trebled what it spends on advertising'] },
        { name: 'Widens the gap below operating profit', items: ['The firm took out a second loan', 'The rate on the existing loan rose'] },
      ],
      why: [
        'Each of these is an other operating expense, so it sits between gross profit and operating profit and both of the lower margins fall while the gross margin does not move.',
        'Only interest comes off between operating profit and profit for the year, so these leave the gross and operating margins untouched and move the last one alone.',
      ],
    }),
  };
})();

const waysToIncreaseProfits = (() => {
  const sid = subId('ways-to-increase-profits');
  return {
    id: sid,
    title: 'Ways to Increase Profits',
    keyIdea: 'There are only three levers on a profit figure: charge more, sell more, or spend less. Everything a business does is one of them.',
    body: [
      { type: 'paragraph', text: `2.3.3 · 1b is a leaf of one line — **ways to increase profits** — and the reason it is short is that the list is short. Profit is revenue minus costs, so there are three places to push.` },
      { type: 'bullets', items: [
        `**Raise the price.** Revenue rises with nothing else moving, so the whole rise reaches operating profit — unless customers leave, and then it does not.`,
        `**Sell more.** Revenue and cost of sales both rise; what reaches profit is the difference on each extra sale, not the extra revenue.`,
        `**Spend less.** Either on the goods, which lifts gross profit, or on running the business, which lifts operating profit only.`,
      ] },
      { type: 'paragraph', text: `The levers are not equally safe. Raising a price is the only one whose effect on profit is the whole amount, and the only one that can lose the customer entirely. Selling more is the slowest, because most of the extra revenue leaves again as the cost of the extra goods.` },
      { type: 'paragraph', text: `At ${F.name}, a ${pct(F.priceCut)} price rise with the same tiles sold would add ${money(F.revenue * F.priceCut / 100)} of operating profit — a rise of half. Selling ${pct(F.priceCut)} more at the same price adds ${money((F.revenue - F.costOfSales) * F.priceCut / 100)}, because the extra tiles must be bought first.` },
    ],
    realExample: { emoji: '⚖️', text: `A wholesaler choosing between a small price rise and a large sales push is choosing between the fastest lever and the safest one, and the arithmetic says how much that safety costs.` },
    misconception: `Students propose "increase sales" for every profit question and stop there. Extra sales bring their own costs with them. The figure that reaches profit is what is left on each extra sale, and a business selling below that line increases its losses by selling more.`,
    examMatters: `Appendix 6 defines Explain as requiring a brief explanation of cause or effect supported by details or examples. One lever, its effect on one line of the statement, and the condition it depends on is a complete answer; three levers listed is not.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'A rival with revenue of $1,000,000, cost of sales of $600,000 and operating expenses of $300,000 weighs a 10% price rise against selling 10% more at the same price. Work both out, in thousands of dollars:',
      template: [
        'The price rise adds $___ thousand to its operating profit',
        'Selling a tenth more adds $___ thousand',
        'The gap between the two is the cost of the extra goods, which a price rise never has to ___',
      ],
      answers: ['100', '40', 'buy'],
      hints: ['a tenth of the top line, with no cost attached to it', 'a tenth of the gap between the top two lines', 'the verb for what a wholesaler does before it can sell anything'],
      distractors: ['1000', '60', 'store'],
    }),
  };
})();

const waysToImproveProfitability = (() => {
  const sid = subId('ways-to-improve-profitability');
  return {
    id: sid,
    title: 'Ways to Improve Profitability',
    keyIdea: 'Improving profitability means raising the rate, not the amount. An action can raise profit and lower profitability at the same time.',
    body: [
      { type: 'paragraph', text: `The specification asks for **ways to increase profits** at 1b and **ways to improve profitability** at 1c, as two separate things. They are separate because one is an amount and the other is a rate, and an action can move them in opposite directions.` },
      { type: 'paragraph', text: `Take ${F.name} cutting its price by a tenth and finding that half as many tiles again go out of the door. Revenue rises to $2,700,000, cost of sales rises to $1,950,000, and with operating expenses unchanged the operating profit becomes $250,000 — up from ${money(F.operatingProfit)}. The operating profit margin, meanwhile, falls from ${pct(F.opm)} to 9.3%.` },
      { type: 'paragraph', text: `More profit, less profitability. The business is working harder for each dollar it earns, and it now has more money tied up in tiles and in what builders owe it. Whether that is an improvement depends on something the profit figure does not contain.` },
      { type: 'paragraph', text: `The ways that raise the rate are the ones that change the shape of the business rather than its size: buying better, dropping the lines that carry the least margin, cutting an overhead that does not shrink the trade. Each of them widens a gap on the statement rather than lengthening it.` },
    ],
    realExample: { emoji: '🎯', text: `Dropping the cheapest tile line can cut revenue and raise every margin at once, because the line that left was the one carrying the least on each sale.` },
    misconception: `Students use "profit" and "profitability" as synonyms, so a question asking about profitability gets an answer about growing the business. Growth usually raises profit and can easily lower profitability, and an answer that cannot tell them apart has not noticed the question.`,
    examMatters: `Appendix 6 defines Assess as requiring a balanced and wide-ranging chain of reasoning about competing factors, leading to a supported judgement. A question that offers growth as the remedy is asking you to weigh the amount against the rate and then say which matters here.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each action to what it does to the profit amount and to the profitability rate:',
      pairs: [
        { left: 'Cut the price by a tenth and sell half as many again', right: 'Profit up, margin down' },
        { left: 'Drop the tile line that carries the least on each sale', right: 'Profit down, margin up' },
        { left: 'Negotiate a better price from the factory', right: 'Both up' },
        { left: 'Take on a second loan to buy a bigger warehouse', right: 'Operating margin unchanged, last margin down' },
      ],
      why: [
        'Revenue and cost of sales both rise, so the amount grows while the share of each dollar kept falls.',
        'Revenue falls, but the line removed was dragging the average down, so what is left keeps more of every dollar.',
        'Cost of sales falls with revenue unchanged, which lifts the gross profit and every margin beneath it.',
        'Interest sits below operating profit, so borrowing cannot touch the trading margins and reduces only the final one.',
      ],
    }),
  };
})();

/* ══ Block 3 — Cash and the Statement of Financial Position (2.3.3 · 2a, 2b, 2c) ═ */

const profitIsNotCash = (() => {
  const sid = subId('profit-is-not-cash');
  return {
    id: sid,
    title: 'Profit Is Not Cash',
    keyIdea: 'Profit is what a year of trading earned. Cash is what is in the bank. A business can earn a large profit and end the year with less money.',
    body: [
      { type: 'paragraph', text: `2.3.3 · 2a is one line — the **distinction between profit and cash** — and it is the idea the rest of the topic rests on. Profit is recorded when a sale is made and a cost is incurred. Cash moves when money actually changes hands, and the two happen on different days.` },
      { type: 'paragraph', text: `${F.name} made ${money(F.profitForYear)} of profit for the year. Its bank balance went from ${money(F.openingCash)} to ${money(F.cash)}: down ${money(Math.abs(F.cashMovement))}. Nothing is wrong with either figure.` },
      { type: 'bullets', items: [
        `**It sold on credit.** What builders owe rose by ${money(F.receivableRise)}: those sales are in the profit and the money is not in the bank.`,
        `**It bought tiles it has not sold.** Inventory rose by ${money(F.inventoryRise)}. Cash left; no cost is recorded, because the tiles are still on the racks.`,
        `**It bought a forklift and racking outright**, ${money(F.assetBought)}. A non-current asset is not an expense.`,
        `**It repaid ${money(F.loanRepaid)} of its loan.** Repaying what was borrowed is not a cost — only the interest is.`,
        `**It took longer to pay its own suppliers**, holding ${money(F.payableRise)} back without changing the profit.`,
      ] },
      { type: 'paragraph', text: `Add them to the profit and the bank balance comes out exactly: ${money(F.profitForYear)} less ${money(F.inventoryRise)} less ${money(F.receivableRise)} plus ${money(F.payableRise)} less ${money(F.assetBought)} less ${money(F.loanRepaid)} is ${money(F.cashMovement)}.` },
    ],
    realExample: { emoji: '🏦', text: `A wholesaler whose builders all pay a month late is lending them a month of its own revenue, every month, for as long as it trades.` },
    misconception: `Students assume a profitable business must be accumulating money, so a profitable firm that runs out of cash looks like a contradiction. It is neither, and it is the ordinary way growing businesses fail: the profit is real and it is sitting in goods and in what customers owe.`,
    examMatters: `Appendix 6 defines Explain as requiring a brief explanation of cause or effect supported by details or examples. "Profit is not cash" is the claim, not the explanation; naming one mechanism and following it to the bank balance is what the command word asks for.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Six things happened at a wholesaler this year. Decide for each whether it changed the profit, the cash, or both, by sorting them into these groups:',
      groups: [
        { name: 'Cash only', items: ['Repaid part of the bank loan', 'Paid cash for a second delivery vehicle', 'Settled a supplier invoice from last year'] },
        { name: 'Profit only', items: ['Delivered an order to a builder on thirty days\' credit'] },
        { name: 'Both', items: ['Served a builder who paid at the counter', 'Paid this month\'s premises rent'] },
      ],
      why: [
        'Repaying borrowed money, buying an asset and settling an old invoice all move money without recording anything new on the statement of comprehensive income.',
        'The sale is recorded when it is made, so the profit rises the moment the tiles leave; the money arrives a month later.',
        'When the money moves at the same time as the sale or the cost is recorded, both figures change together — which is the case students wrongly assume is universal.',
      ],
    }),
  };
})();

const statementOfFinancialPosition = (() => {
  const sid = subId('statement-of-financial-position');
  return {
    id: sid,
    title: 'The Statement of Financial Position',
    keyIdea: 'The statement of financial position lists what a business owns and owes on one date. It is a photograph, not a film.',
    body: [
      { type: 'paragraph', text: `2.3.3 · 2b names the second document: the **statement of financial position (balance sheet)**. Where the statement of comprehensive income covers a period, this one is taken on a single date, and it lists what the business holds and what it owes on that date.` },
      { type: 'paragraph', text: `Appendix 9 sets out the order: **non-current assets** plus **current assets**, less **current liabilities**, less **non-current liabilities**, gives net assets. The split that matters for this topic is the word "current", which means within twelve months.` },
      { type: 'bullets', items: [
        `**Current assets** — what will become cash within a year: ${F.name} holds ${money(F.inventory)} of inventory, ${money(F.receivables)} of trade receivables and ${money(F.cash)} of cash. Total ${money(F.currentAssets)}.`,
        `**Current liabilities** — what must be paid within a year: ${money(F.payables)} of trade payables, a ${money(F.overdraft)} overdraft and ${money(F.otherPayables)} of other payables. Total ${money(F.currentLiabilities)}.`,
        `**Non-current** — the ${money(F.nonCurrentAssets)} warehouse and vehicles, against the ${money(F.loan)} bank loan. Neither falls due this year.`,
      ] },
      { type: 'paragraph', text: `Every liquidity question in this topic is answered from those two totals, so the skill being tested is extraction: find the current assets, find the current liabilities, and ignore everything with "non-current" in front of it. Appendix 8 also settles the vocabulary — inventory rather than stock, trade receivables rather than debtors, trade payables rather than creditors.` },
    ],
    realExample: { emoji: '📸', text: `A warehouse full of tiles on the last day of the year is a current asset worth ${money(F.inventory)}. The same warehouse building is a non-current asset, and no liquidity question touches it.` },
    misconception: `Students add every asset together and compare it with every liability, which makes almost any business look comfortable. The whole point of the current split is timing: what arrives within a year against what falls due within a year. A warehouse cannot pay next month's invoices.`,
    examMatters: `Unit 2's description says students must apply the ratios in Appendix 9 and that those ratios will not be supplied in the examination. So the statement is given and the formula is not: the extraction and the formula both have to come from the student.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'A wholesaler\'s statement of financial position lists these six items. Sort each one into the group it belongs in:',
      groups: [
        { name: 'Current assets', items: ['Goods waiting on the racks to be sold', 'Money builders owe for deliveries made last month', 'The balance in the bank account'] },
        { name: 'Current liabilities', items: ['An invoice from the factory due in six weeks', 'The overdraft the bank can call in'] },
        { name: 'Neither', items: ['The building the firm trades from'] },
      ],
      why: [
        'Each will turn into cash within twelve months, which is the whole test for the current side of the assets.',
        'Each must be settled within twelve months, which is the same test applied to what the business owes.',
        'The building is a non-current asset: it is worth a great deal and it cannot be turned into money in time to pay anybody this month.',
      ],
    }),
  };
})();

const workingCapital = (() => {
  const sid = subId('working-capital');
  return {
    id: sid,
    title: 'Working Capital',
    keyIdea: 'Working capital is current assets less current liabilities: the money a business has to run on, after what it owes this year is set aside.',
    body: [
      { type: 'paragraph', text: `2.3.3 · 2c asks for **working capital and its management**. **Working capital = current assets − current liabilities.** At ${F.name} that is ${money(F.currentAssets)} less ${money(F.currentLiabilities)}, which is ${money(F.workingCapital)}.` },
      { type: 'paragraph', text: `It is a cushion measured in dollars: the amount by which what comes in this year exceeds what goes out. A business with negative working capital owes more within the year than it can expect to receive, and has to find the difference somewhere.` },
      { type: 'paragraph', text: `Managing it means moving money around the cycle faster. Cash buys inventory; inventory is sold and becomes trade receivables; trade receivables are collected and become cash again. The longer a stage takes, the more money is tied up in it.` },
      { type: 'flow', steps: [
        { title: 'Cash buys inventory', subtitle: `${money(F.inventory)} sits on the racks for about ${days(F.inventoryDays)}` },
        { title: 'Inventory is sold on credit', subtitle: `and becomes ${money(F.receivables)} of trade receivables` },
        { title: 'Builders pay, about ' + days(F.receivableDays) + ' later', subtitle: 'and the money is cash again, ready to buy more' },
      ], result: `Around ${days(F.inventoryDays + F.receivableDays)} from paying for a tile to being paid for it`, resultType: 'neutral' },
      { type: 'paragraph', text: `That last figure is the one to act on. ${F.name} pays its own suppliers in about ${days(F.payableDays)}, so it funds the gap between that and the ${days(F.inventoryDays + F.receivableDays)} out of its own pocket, every cycle, for as long as it trades.` },
    ],
    realExample: { emoji: '🔄', text: `A wholesaler that holds tiles for two months and waits another month to be paid has three months of trading money locked in the cycle at all times.` },
    misconception: `Students describe working capital as spare money the business could spend. It is committed: most of it is tiles nobody has bought yet and invoices nobody has paid yet. A firm with ${money(F.workingCapital)} of working capital and ${money(F.cash)} in the bank cannot spend ${money(F.workingCapital)}.`,
    examMatters: `Appendix 6 defines Analyse as requiring a brief chain of reasoning. A chain about working capital runs through the cycle — a stage lengthens, money is tied up in it, less cash is available — rather than stopping at the subtraction.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `${F.name} holds ${money(F.inventory)} of inventory against a cost of sales of ${money(F.costOfSales)}, and is owed ${money(F.receivables)} against revenue of ${money(F.revenue)}. Work the cycle out:`,
      template: [
        `Its inventory lasts about ___`,
        `Its builders take about ___ to pay`,
        `So money is tied up in the cycle for roughly ___ before it comes back`,
      ],
      answers: [days(F.inventoryDays), days(F.receivableDays), days(F.inventoryDays + F.receivableDays)],
      hints: ['divide the inventory by the cost of sales and multiply by a year', 'the same idea, but against the top line rather than the cost line', 'the two stages of the cycle added together'],
      distractors: [days(F.payableDays), days(F.inventoryDays - F.receivableDays)],
    }),
  };
})();

const importanceOfCash = (() => {
  const sid = subId('the-importance-of-cash');
  return {
    id: sid,
    title: 'The Importance of Cash',
    keyIdea: 'A business closes when it cannot pay what is due, not when it stops being profitable. Cash is the only thing that settles a bill.',
    body: [
      { type: 'paragraph', text: `The specification ends 2c with four words — **the importance of cash** — and they are the reason the whole of sub-topic 2 exists. A supplier, a landlord and a lender can all be paid in exactly one thing, and it is not profit.` },
      { type: 'paragraph', text: `${F.name} has ${money(F.cash)} in the bank, an overdraft of ${money(F.overdraft)} the bank may call in, and ${money(F.currentLiabilities)} falling due within the year. Its profit for the year was ${money(F.profitForYear)}. If the invoices arrive before the builders pay, none of that profit is available to meet them.` },
      { type: 'paragraph', text: `This is why the two documents are read together and never separately. The statement of comprehensive income says whether the trade is worth doing; the statement of financial position says whether the business can still be trading next month. A business needs both answers to be yes, and only one of them is optional in the short run.` },
      { type: 'paragraph', text: `The practical consequence is that a growing business needs more cash, not less. Every extra sale puts money into tiles and into what builders owe before it comes back, so growth consumes the cushion it is supposed to build.` },
    ],
    realExample: { emoji: '⏰', text: `A firm with a full order book can still be closed by a single supplier who wants paying this week and will not wait for the builders to settle next month.` },
    misconception: `Students judge a business by its final profit line and treat cash as an accounting detail. The order is the other way round: a business that cannot pay stops, whatever its profit was, and the profit of a business that has stopped is of no use to anybody.`,
    examMatters: `Appendix 6 defines Assess as requiring a balanced chain of reasoning about competing factors that leads to a supported judgement. A judgement about whether a firm is in trouble needs both documents, and the supporting evidence for it is a figure from each.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `${F.name}'s suppliers want paying now and its builders are not due to pay for three more weeks. Complete what the firm can actually reach:`,
      template: [
        'Of its three current assets, only ___ settles an invoice on the day',
        'The largest of the three, at three fifths of their total, is the ___',
        'And the profit for the year sits on the other ___ entirely',
      ],
      answers: ['cash', 'inventory', 'document'],
      hints: ['the one that is already money rather than a promise of it', 'the one that still has to find a buyer before it becomes money', 'the word for the kind of thing a statement of comprehensive income is'],
      distractors: ['trade receivables', 'working capital'],
    }),
  };
})();

/* ══ Block 4 — Liquidity (2.3.3 · 2b) ════════════════════════════════════ */

const currentRatio = (() => {
  const sid = subId('the-current-ratio');
  return {
    id: sid,
    title: 'The Current Ratio',
    keyIdea: 'The current ratio compares what will arrive within the year with what falls due within it. Below one, the arithmetic does not work.',
    body: [
      { type: 'paragraph', text: `2.3.3 · 2b asks for **measuring liquidity**, and the first of the two measures is the **current ratio = current assets ÷ current liabilities**. It expresses working capital as a ratio instead of an amount, so businesses of different sizes can be compared.` },
      { type: 'paragraph', text: `${F.name} has ${money(F.currentAssets)} of current assets against ${money(F.currentLiabilities)} of current liabilities, so its current ratio is ${ratio(F.currentRatio)}. For every dollar falling due within the year, ${money(F.currentRatio)} is expected to arrive.` },
      { type: 'paragraph', text: `Above one means the year's obligations are covered on paper. Below one means they are not, and the business is relying on something that is not on the statement — new borrowing, an owner's injection, or a sale it has not made yet.` },
      { type: 'paragraph', text: `What counts as comfortable depends entirely on how fast the current assets actually move. A wholesaler holding tiles for ${days(F.inventoryDays)} needs a higher ratio than a shop that sells for cash the same afternoon, because most of its current assets are a long way from being money.` },
    ],
    realExample: { emoji: '⚖️', text: `A ratio of ${ratio(F.currentRatio)} at a firm holding two months of tiles is a different proposition from ${ratio(F.currentRatio)} at a firm holding two days of them.` },
    misconception: `Students learn that a current ratio should be about two to one and apply it to every business they meet. The specification asks for the calculation and the interpretation, and the interpretation is about this firm: what its current assets are made of, and how quickly they turn into money.`,
    examMatters: `Unit 2's description says the Appendix 9 ratios will not be supplied in the examination, so the formula has to be reproduced. Appendix 6 defines Calculate as a calculation from given data with workings shown, and the substitution is the working.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'A rival wholesaler holds $300,000 of inventory, is owed $90,000, has $30,000 in the bank and owes $300,000 within the year. Work out where it stands, in thousands of dollars:',
      template: [
        'Its current assets total $___ thousand',
        'Its current ratio is therefore ___',
        `Against ${F.name}'s ${ratio(F.currentRatio)}, that is ___ cover for the year ahead`,
      ],
      answers: ['420', '1.40:1', 'thinner'],
      hints: ['add the three things that become money within the year', 'divide that total by what falls due within the year', 'compare the two ratios and describe the rival\'s position'],
      distractors: ['390', '1.00:1', 'stronger'],
    }),
  };
})();

const acidTestRatio = (() => {
  const sid = subId('the-acid-test-ratio');
  return {
    id: sid,
    title: 'The Acid Test Ratio',
    keyIdea: 'The acid test takes inventory out of the current assets, because inventory has to be sold before it can pay anybody.',
    body: [
      { type: 'paragraph', text: `The second measure at 2b is the **acid test ratio = (current assets − inventory) ÷ current liabilities**. Appendix 9 also calls it the liquid capital ratio, and the single change from the current ratio is the one that matters: the inventory comes out.` },
      { type: 'paragraph', text: `It comes out because it is the only current asset that still has to be sold to somebody before it is money. Trade receivables are already sales; cash is already money; inventory is a hope.` },
      { type: 'paragraph', text: `${F.name} has ${money(F.currentAssets)} of current assets, of which ${money(F.inventory)} is tiles. Take them out and ${money(F.currentAssets - F.inventory)} is left against ${money(F.currentLiabilities)} of current liabilities: an acid test of ${ratio(F.acidTest)}.` },
      { type: 'paragraph', text: `Set the two ratios side by side and they say opposite things. ${ratio(F.currentRatio)} looks safe; ${ratio(F.acidTest)} says that without selling the tiles the firm can cover only ${pct(F.acidTest * 100)} of what falls due this year. The gap between them is a measure of how much of the comfort depends on selling inventory, and for a wholesaler it is most of it.` },
    ],
    realExample: { emoji: '🧊', text: `A wholesaler asked to settle ${money(F.currentLiabilities)} tomorrow can reach ${money(F.currentAssets - F.inventory)} of it. The remaining ${money(F.inventory)} is on the racks and needs a buyer first.` },
    misconception: `Students treat the acid test as a stricter version of the same measurement and quote whichever is higher. The gap between the two is the finding. A firm whose ratios are far apart is one whose liquidity depends on selling what it is holding, and that is the thing worth saying about it.`,
    examMatters: `Appendix 6 defines Analyse as requiring a brief chain of reasoning applied to given data. Two ratios and the gap between them is data; the chain is what the gap is made of, which here is ${days(F.inventoryDays)} of tiles.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `Using ${F.name}'s figures — ${money(F.currentAssets)} of current assets including ${money(F.inventory)} of inventory, and ${money(F.currentLiabilities)} of current liabilities — work both measures out:`,
      template: [
        'The current ratio is ___',
        'The acid test ratio is ___',
        `The difference between them is entirely the ___ on the racks`,
      ],
      answers: [ratio(F.currentRatio), ratio(F.acidTest), 'inventory'],
      hints: ['divide one total by the other, with nothing removed', 'do it again with the tiles taken out of the top', 'the one current asset the second measure refuses to count'],
      distractors: [ratio(F.jit.acidTest), 'trade receivables'],
    }),
  };
})();

const improvingLiquidityAssets = (() => {
  const sid = subId('improving-liquidity-assets-and-supplier-credit');
  return {
    id: sid,
    title: 'Selling Assets and Extending Supplier Credit',
    keyIdea: 'The first two ways of improving liquidity do very different things: one adds money to the business, the other only delays money leaving it.',
    body: [
      { type: 'paragraph', text: `2.3.3 · 2b names four **ways to improve liquidity, including assets, supplier credit terms, factoring, inventory JIT**. The first two are here and the other two are next. Each has to be judged on what it does to the bank balance, to working capital and to both ratios, because the four answers are not the same.` },
      { type: 'paragraph', text: `**Selling an underused asset.** ${F.name} sells a delivery yard it barely uses for ${money(F.assetSale)}. Cash rises to ${money(F.sellAsset.cash)}, working capital to ${money(F.sellAsset.workingCapital)}, the current ratio to ${ratio(F.sellAsset.currentRatio)} and the acid test to ${ratio(F.sellAsset.acidTest)}: everything improves, because something that was not a current asset became one.` },
      { type: 'paragraph', text: `The cost is capacity. An asset sold is gone, and if it turns out to have been needed it must be rented back or replaced at a worse price. That is a real argument against it, and not an argument that it never works.` },
      { type: 'paragraph', text: `**Extending supplier credit terms.** Taking ${F.creditExtraDays} more days to pay holds ${money(F.creditExtra)} in the bank — and adds the same ${money(F.creditExtra)} to trade payables. Working capital is unchanged at ${money(F.supplierCredit.workingCapital)}. The current ratio falls to ${ratio(F.supplierCredit.currentRatio)} and the acid test rises to ${ratio(F.supplierCredit.acidTest)}: adding the same amount to both sides drags every ratio towards one to one.` },
    ],
    realExample: { emoji: '🤝', text: `A supplier who agrees to ${F.creditExtraDays} more days has lent the wholesaler ${money(F.creditExtra)} without calling it a loan — and can withdraw the offer at any time.` },
    misconception: `Students write that taking longer to pay suppliers improves working capital. It does not move it: cash and the payable rise by the same amount, so the subtraction gives the same answer. What improves is the bank balance.`,
    examMatters: `Appendix 6 defines Discuss as requiring logical chains of reasoning in context showing causes and effects, with a brief assessment. Each of these four ways has a cost as well as an effect, and the assessment is which cost this particular firm can bear.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `${F.name} takes ${F.creditExtraDays} more days to pay its suppliers. Work out what actually moves:`,
      template: [
        'Current assets and current liabilities both rise, by ___ amount',
        'Working capital therefore changes by ___',
        `And the current ratio moves from ${ratio(F.currentRatio)} to ___`,
      ],
      answers: ['the same', 'nothing', ratio(F.supplierCredit.currentRatio)],
      hints: ['the money held back is money still owed, so one figure does both jobs', 'subtract two totals that both grew by an equal amount', 'divide the new current assets by the new current liabilities'],
      distractors: ['twice the', 'a third of'],
    }),
  };
})();

const improvingLiquidityFactoring = (() => {
  const sid = subId('improving-liquidity-factoring-and-inventory-jit');
  return {
    id: sid,
    title: 'Factoring and Inventory JIT',
    keyIdea: 'Factoring sells what customers owe for cash today. Inventory JIT stops money sitting on the racks. Both raise cash; only one raises the acid test.',
    body: [
      { type: 'paragraph', text: `**Factoring.** A factor buys the trade receivables and pays now, keeping a fee. ${F.name} sells its ${money(F.receivables)} of receivables for a ${pct(F.factorFeeRate)} fee of ${money(F.factorFee)}, so ${money(F.receivables - F.factorFee)} arrives and the bank balance goes from ${money(F.cash)} to ${money(F.factoring.cash)}.` },
      { type: 'paragraph', text: `Look at what it does to the ratios, though. One quick asset has become another, minus the fee, so working capital falls by exactly the ${money(F.factorFee)} and the acid test edges down from ${ratio(F.acidTest)} to ${ratio(F.factoring.acidTest)}. Factoring is the move that rescues the bank balance while very slightly worsening the measure of liquidity — which is the clearest proof in the topic that a ratio is not the same thing as being able to pay.` },
      { type: 'paragraph', text: `**Inventory JIT.** Ordering tiles so they arrive as they are needed cuts inventory from ${days(F.inventoryDays)} of cover to ${days(F.jitDays)}, releasing ${money(F.jitReleased)} of cash. Current assets do not change — tiles became cash — so working capital and the current ratio stay exactly where they were, while the acid test jumps from ${ratio(F.acidTest)} to ${ratio(F.jit.acidTest)}.` },
      { type: 'paragraph', text: `Its cost is fragility. A business holding ${days(F.jitDays)} of tiles has no buffer against a supplier who is late, which is one of the external causes of failure the next chapter reaches.` },
    ],
    realExample: { emoji: '🚚', text: `Two wholesalers both raise about ${money(F.jitReleased)} of cash. The one that factored still holds its tiles; the one on JIT has nothing on the racks if a ship is delayed.` },
    misconception: `Students rank the four ways from best to worst. They do different jobs: one adds an asset, one delays a payment, one converts a receivable, one releases inventory. The right question is which measure this firm needs to move, and what it can afford to give up to move it.`,
    examMatters: `Appendix 6 defines Evaluate as requiring fully developed chains of reasoning and a full awareness of competing factors, leading to a perceptive conclusion proposing a recommendation. Four options with four different costs is what that command word is built for.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each way of improving liquidity to what it does to the acid test ratio:',
      pairs: [
        { left: 'Selling an underused delivery yard', right: `Rises to ${ratio(F.sellAsset.acidTest)}` },
        { left: 'Factoring the trade receivables', right: `Slips to ${ratio(F.factoring.acidTest)}` },
        { left: 'Cutting inventory to ' + days(F.jitDays) + ' of cover', right: `Jumps to ${ratio(F.jit.acidTest)}` },
        { left: 'Taking ' + F.creditExtraDays + ' more days to pay suppliers', right: `Edges up to ${ratio(F.supplierCredit.acidTest)}` },
      ],
      why: [
        'A non-current asset turns into cash, so the top of the ratio grows while the bottom does not move at all.',
        'One quick asset is exchanged for another and the factor keeps a fee, so the top falls by exactly that fee.',
        'Tiles are not counted in this ratio and cash is, so releasing inventory moves money from the part that is ignored to the part that counts.',
        'Cash and payables rise together, and adding the same amount to both sides pulls a ratio below one upwards towards one to one.',
      ],
    }),
  };
})();

/* ══ Block 5 — Business Failure (2.3.3 · 3a, 3b) ═════════════════════════ */

const internalCashFlow = (() => {
  const sid = subId('internal-causes-cash-flow-and-overtrading');
  return {
    id: sid,
    title: 'Poor Cash Flow Management and Overtrading',
    keyIdea: 'Most failures are not caused by losses. They are caused by running out of money while still trading profitably.',
    body: [
      { type: 'paragraph', text: `2.3.3 · 3a lists six **internal causes of business failure**, and the specification puts **poor management of cash flow** first. It is first because it is the mechanism most of the others end in: whatever goes wrong, the business closes on the day it cannot pay.` },
      { type: 'paragraph', text: `Poor management of cash flow is not the same as making a loss. It is letting money go out faster than it comes in — paying suppliers before customers pay, buying assets outright that could have been paid for over time, holding tiles for ${days(F.inventoryDays)} when builders pay in ${days(F.receivableDays)}.` },
      { type: 'paragraph', text: `**Overtrading** is the version of this that happens to successful businesses, and the specification names it separately. A firm grows faster than its working capital can support: every extra sale buys inventory and creates a receivable before any money comes back.` },
      { type: 'paragraph', text: `If ${F.name} grew by ${pct(F.overtradeGrowth)}, inventory would rise by ${money(F.overtradeInventory)} and trade receivables by ${money(F.overtradeReceivables)}, while trade payables would only rise by ${money(F.overtradePayables)}. That is ${money(F.overtradeNeed)} of extra money needed, from a business with ${money(F.cash)} in the bank whose trading produced no spare cash at all this year.` },
    ],
    realExample: { emoji: '📈', text: `A wholesaler that wins a large contract and cannot fund the tiles for it has been destroyed by good news, which is precisely what makes overtrading hard to see coming.` },
    misconception: `Students treat growth as the answer to a cash problem. Growth consumes cash before it produces any: it is the fastest way to turn a tight position into an impossible one, and a firm should fund the growth before it accepts the order.`,
    examMatters: `Appendix 6 defines Assess as a balanced and wide-ranging chain of reasoning about competing factors leading to a supported judgement. A case with rising revenue and falling cash is asking which of the two is the more reliable signal, and the judgement has to say why.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'A rival holding $200,000 of inventory, owed $100,000 and owing suppliers $120,000 is offered enough work to double its trade. Everything scales with it. Work out what the growth costs, in thousands of dollars:',
      template: [
        'More money tied up in inventory and trade receivables: $___ thousand',
        'Less needed straight away, because trade payables also rise: $___ thousand',
        'So the funding the growth needs before any of it is paid for is $___ thousand',
      ],
      answers: ['300', '120', '180'],
      hints: ['double each of the two current assets that grow with the trade, and take the increase', 'the same again on what the firm owes its suppliers', 'the first figure less the second'],
      distractors: ['420', '80'],
    }),
  };
})();

const internalInventory = (() => {
  const sid = subId('internal-causes-overestimation-and-inventory');
  return {
    id: sid,
    title: 'Overestimation of Sales and Poor Inventory Control',
    keyIdea: 'Buying for sales that never happen turns cash into tiles. Both of these causes are the same mistake at different points in the cycle.',
    body: [
      { type: 'paragraph', text: `**Overestimation of sales** is the second internal cause at 3a. A business forecasts more than it will sell and commits to it: it buys the goods, takes the space, hires the people. The cash goes out on the strength of the forecast and the revenue does not arrive.` },
      { type: 'paragraph', text: `If ${F.name} bought in for ${pct(F.overestimate)} more trade than it achieved, ${money(F.overstock)} of extra tiles would be sitting on the racks — more than twice its entire working capital of ${money(F.workingCapital)}. Tiles go out of fashion, so if a quarter of that never sells, ${money(F.writeOff)} is written off, which is ${pct((F.writeOff / F.operatingProfit) * 100)} of the year's operating profit.` },
      { type: 'paragraph', text: `**Poor inventory control** is the fourth cause, and the same damage without a bad forecast. Holding too much means cash in tiles rather than the bank, storage to pay for and breakages to absorb. Holding too little means turning builders away to a rival who had the tiles.` },
      { type: 'paragraph', text: `${F.name} holds ${days(F.inventoryDays)} of cover; getting that to ${days(F.jitDays)} would release ${money(F.jitReleased)}. That is inventory JIT from the liquidity chapter seen from the other end: good inventory control and improving liquidity are one action with two names.` },
    ],
    realExample: { emoji: '🏷️', text: `A pattern that stops selling is worth what somebody will pay for it, which is usually a fraction of what it cost. Until it is sold, it is counted as an asset at full value.` },
    misconception: `Students treat unsold inventory as harmless because it is still an asset on the statement. It is an asset that is not earning anything, that cost cash the business no longer has, and that may be worth far less than its stated value the moment anyone tries to sell it.`,
    examMatters: `Appendix 6 defines Explain as requiring a brief explanation of cause or effect supported by details or examples. One cause, its route through the working capital cycle, and its effect on the bank balance is the chain the marks are for.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'A rival with a cost of sales of $800,000 buys in for half as much trade again as it achieves, and a fifth of the excess never sells. Work out the damage, in thousands of dollars:',
      template: [
        'Goods left over at the end of the year: $___ thousand',
        'Written off when a fifth of them never sell: $___ thousand',
        'The rest is not a loss, but it is cash the firm cannot ___',
      ],
      answers: ['400', '80', 'reach'],
      hints: ['half again on what the goods actually sold cost', 'a fifth of the figure above', 'the verb for what you cannot do with money that is sitting in goods'],
      distractors: ['1200', '160'],
    }),
  };
})();

const internalMarketingQuality = (() => {
  const sid = subId('internal-causes-marketing-and-quality');
  return {
    id: sid,
    title: 'Poor Marketing and Poor Quality',
    keyIdea: 'Poor marketing costs a business customers it never hears about. Poor quality costs it the ones it already has, and costs it twice.',
    body: [
      { type: 'paragraph', text: `The last two internal causes at 3a are **poor marketing** and **poor quality**. Both act on the top of the statement, and they act differently enough to be worth separating.` },
      { type: 'paragraph', text: `**Poor marketing** means customers who would have bought do not know the business exists, or no longer think of it. Revenue falls while the costs of running the business do not. If ${F.name} lost ${pct(F.marketingFall)} of its volume this way, operating profit would fall from ${money(F.operatingProfit)} to ${money(F.marketingProfit)}, because the ${money(F.operatingExpenses)} of operating expenses carries on regardless.` },
      { type: 'paragraph', text: `**Poor quality** costs twice over. The immediate cost is replacing what was wrong: if ${pct(F.returnRate)} of tiles arrive broken and are replaced free, cost of sales rises by ${money(F.qualityExtraCost)} and operating profit falls to ${money(F.qualityProfit)} — a fall of ${pct(((F.operatingProfit - F.qualityProfit) / F.operatingProfit) * 100)} from a ${pct(F.returnRate)} breakage rate.` },
      { type: 'paragraph', text: `The second cost is the one that closes businesses. A builder who has had a bad delivery does not order again and tells other builders, so the quality problem becomes a marketing problem a year later — and by then no amount of advertising fixes it, because what customers heard was true.` },
    ],
    realExample: { emoji: '🧩', text: `A wholesaler with a ${pct(F.returnRate)} breakage rate loses ${money(F.qualityExtraCost)} in replacements, and loses the builders who now specify a different supplier in every quotation.` },
    misconception: `Students treat marketing and quality as soft causes next to the financial ones. Both land on the statement as hard numbers, and quality is the more dangerous because its full cost arrives long after the problem was fixed.`,
    examMatters: `Appendix 6 defines Analyse as requiring a brief chain of reasoning applied to given data. A chain that runs from a breakage rate through cost of sales to operating profit uses the data; naming the cause and asserting the business suffers does not.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Six causes of failure are listed. Decide which line of the statement of comprehensive income each one hits first, by sorting them into these groups:',
      groups: [
        { name: 'Hits revenue first', items: ['Customers stop hearing from the firm', 'Goods were bought in for orders that never came'] },
        { name: 'Hits cost of sales first', items: ['Deliveries reach the builder cracked and are sent again', 'Patterns nobody wanted are written down at the year end'] },
        { name: 'Hits neither, but empties the bank', items: ['Trade doubles faster than the money to fund it', 'Suppliers are settled long before customers pay'] },
      ],
      why: [
        'Both are failures to sell what the firm expected to sell, so the top line falls while every cost below it carries on.',
        'Replacing what was wrong and writing down what will not sell both raise what the goods sold have cost, which is the second line down.',
        'Neither changes a single line of the statement of comprehensive income: the trade is profitable and the money is tied up in the cycle instead of in the bank.',
      ],
    }),
  };
})();

const externalMarket = (() => {
  const sid = subId('external-causes-market-competition-and-the-economy');
  return {
    id: sid,
    title: 'Market Conditions, Competition and the Economy',
    keyIdea: 'External causes are not the firm\'s fault and are still its problem. The first three all arrive as a fall in what it can sell or charge.',
    body: [
      { type: 'paragraph', text: `3b lists eight **external causes of business failure**, beginning with **market conditions**, **competition** and **economic** conditions. None of them is inside the firm's control, and each of them reaches the statement through the top line.` },
      { type: 'paragraph', text: `**Market conditions.** Demand for the product itself changes: builders stop building, or tastes move. A ${pct(F.demandFall)} fall in volume takes ${F.name}'s operating profit from ${money(F.operatingProfit)} to ${money(F.demandProfit)}, because the ${money(F.operatingExpenses)} of operating expenses does not fall with the trade.` },
      { type: 'paragraph', text: `**Competition.** A rival takes customers, or forces the price down. This one is the sharpest: a ${pct(F.priceCut)} price cut with exactly the same tiles sold leaves cost of sales untouched and takes operating profit to ${money(F.competitionProfit)} — half of it. Price cuts fall straight through to the profit line, which is why a price war closes businesses faster than a downturn.` },
      { type: 'paragraph', text: `**Economic** conditions are the general background: incomes, employment and confidence across the whole economy rather than in one trade. They matter here because they move several things at once, and because a business cannot wait them out without cash.` },
    ],
    realExample: { emoji: '🏗️', text: `A wholesaler can survive builders ordering a tenth less. Matching a rival's price cut of a twentieth on every tile costs it the same amount again, and it has not lost a single customer.` },
    misconception: `Students treat external causes as an excuse, and write that a firm failed "because of the recession" as though nothing else were relevant. Every firm in the trade faced the same conditions and some of them are still open. The question is always what made this one unable to absorb it.`,
    examMatters: `Appendix 6 defines Assess as requiring a balanced and wide-ranging chain of reasoning about competing factors, leading to a supported judgement. Assessing a failure means weighing an external cause against the internal position it landed on.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'A rival with revenue of $1,000,000, cost of sales of $600,000 and operating expenses of $300,000 meets two shocks. Work both out, in thousands of dollars:',
      template: [
        'A 10% fall in the volume it sells leaves an operating profit of $___ thousand',
        'A 5% cut in its price, with volumes unchanged, leaves $___ thousand',
        'The smaller-sounding shock is therefore the ___ one',
      ],
      answers: ['60', '50', 'worse'],
      hints: ['revenue and cost of sales both fall by a tenth; the operating expenses do not', 'revenue alone falls, by a twentieth, with both costs unchanged', 'compare the two figures and describe the price cut'],
      distractors: ['100', '95'],
    }),
  };
})();

const externalRates = (() => {
  const sid = subId('external-causes-exchange-rates-and-interest-rates');
  return {
    id: sid,
    title: 'Exchange Rates and Interest Rates',
    keyIdea: 'A currency movement hits an importer at the cost of sales. An interest rate rise is the one cause that leaves operating profit untouched.',
    body: [
      { type: 'paragraph', text: `The next two external causes at 3b are **exchange rates** and **interest rates**. They are grouped here because they arrive from the same direction and land on completely different lines.` },
      { type: 'paragraph', text: `**Exchange rates.** ${F.name} buys its tiles abroad. If the home currency falls ${pct(F.currencyFall)} against the currency the tiles are priced in, they cost ${pct(F.currencyFall)} more: cost of sales rises to ${money(F.currencyCostOfSales)} and operating profit falls from ${money(F.operatingProfit)} to ${money(F.currencyProfit)}, which is ${pct(((F.operatingProfit - F.currencyProfit) / F.operatingProfit) * 100)} of it gone.` },
      { type: 'paragraph', text: `The same movement helps an exporter, which is why the effect has to be worked out for the firm in front of you rather than recalled.` },
      { type: 'paragraph', text: `**Interest rates.** ${F.name} owes ${money(F.loan)} at ${pct(F.interestRate)}. A rise of ${F.rateRise} percentage points takes the interest to ${money(F.rateInterest)} and the profit for the year from ${money(F.profitForYear)} to ${money(F.rateProfitForYear)} — while the operating profit does not move at all, because interest comes off below it.` },
      { type: 'paragraph', text: `That is the whole reason the ladder has three rungs. A business hit by rates trades exactly as well as it did the week before, and only one of its three profit figures says so.` },
    ],
    realExample: { emoji: '💱', text: `An importer and an exporter in the same street read the same currency news and one of them is in trouble. Which one depends on which side of the statement the foreign currency sits on.` },
    misconception: `Students learn "a weaker currency helps exporters" and apply it to every firm. For an importer it is the opposite, and for a business that imports its goods and sells them at home the entire effect lands on cost of sales with nothing offsetting it.`,
    examMatters: `Appendix 6 defines Calculate as a calculation based on given data with workings given. A currency question is a percentage on one line of the statement, so the working is the line it lands on as much as the arithmetic.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Four shocks hit the importer. Decide for each which profit figures move, by sorting them into these groups:',
      groups: [
        { name: 'Moves operating profit', items: ['The local currency weakens against the one the goods are priced in', 'A competitor forces a price cut', 'The landlord raises the rent on the premises'] },
        { name: 'Leaves operating profit unchanged', items: ['The rate on the bank loan rises', 'The firm takes out a second loan'] },
      ],
      why: [
        'Each of these changes revenue or a cost above the operating profit line, so that figure and the one below it both move.',
        'Interest is the only thing taken off between operating profit and profit for the year, so anything about borrowing leaves the trading figures exactly where they were.',
      ],
    }),
  };
})();

const externalRegulation = (() => {
  const sid = subId('external-causes-regulation-suppliers-and-natural-phenomena');
  return {
    id: sid,
    title: 'Regulation, Supplier Problems and Natural Phenomena',
    keyIdea: 'The last three external causes arrive without warning, and a business survives them out of its cash rather than out of its profit.',
    body: [
      { type: 'paragraph', text: `3b ends with **government regulations**, **supplier problems** and **natural phenomena**. None can be forecast from the trade itself, and what decides the outcome is the same in all three: how long the business can keep paying while it is disrupted.` },
      { type: 'paragraph', text: `**Government regulations.** A new rule can close a product line overnight. If a building standard changed and a quarter of ${F.name}'s inventory no longer met it, ${money(F.regulationScrap)} would be scrapped — against a bank balance of ${money(F.cash)}.` },
      { type: 'paragraph', text: `**Supplier problems.** A factory that stops delivering stops the wholesaler too. ${F.name} sells about ${money(F.dailyRevenue)} on each of ${qty(F.tradingDays)} trading days, so ${F.supplierDaysLost} days without tiles costs ${money(F.supplierRevenueLost)} of revenue and takes operating profit to ${money(F.supplierProfit)}, every expense carrying on.` },
      { type: 'paragraph', text: `**Natural phenomena.** A flood, a storm or an earthquake closes premises and destroys what is in them. The ${money(F.inventory)} on the racks is at risk in a single night, and insurance pays later rather than now.` },
      { type: 'paragraph', text: `So the last three make the same argument as the first: what a business needs against an external shock is liquidity. Profit is what it earns when things go normally, and none of these three is normal.` },
    ],
    realExample: { emoji: '🌊', text: `Two identical wholesalers are flooded on the same night. The one that had cut its inventory and held cash reopens; the one with ${money(F.inventory)} of tiles on the floor and ${money(F.cash)} in the bank does not.` },
    misconception: `Students write that a firm hit by a disaster or a new rule "could not have done anything about it". It could not have prevented the event; it could have been able to survive it. That is what the liquidity chapter was for.`,
    examMatters: `Appendix 6 defines Evaluate as requiring fully developed chains of reasoning and a full awareness of competing factors leading to a perceptive conclusion that proposes a recommendation. A failure case usually has an external trigger and an internal reason it was fatal, and a conclusion has to say which was decisive.`,
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the stages of a business failure in causal order, from the first event to the closure:',
      correctOrder: [
        'A supplier stops delivering for three weeks',
        'Revenue stops while rent and salaries carry on',
        'The bank balance runs down and the overdraft limit is reached',
        'An invoice falls due that the business cannot pay',
      ],
      why: [
        'The external shock comes first and the business has done nothing wrong at this point.',
        'Its costs are not suspended because its sales are, so the gap between money in and money out opens immediately.',
        'The cushion absorbs the gap for as long as it lasts, and how long that is was decided months earlier by how much cash the firm held.',
        'Failure is this moment and not the shock that started it, which is why a liquid business survives the same event.',
      ],
    }),
  };
})();

/* ══ The block plan ═══════════════════════════════════════════════════════ */

const BLOCK_PLAN = [
  {
    title: B1,
    subs: [profitLadder, grossProfit, operatingProfit, profitForTheYear, statementOfComprehensiveIncome],
    takeaway: [
      'Three profits, not one: gross, operating, and profit for the year.',
      'Gross takes off the goods; operating takes off the running costs; the last takes off interest.',
      'Profit for the year and net profit are the same line. Operating profit is not.',
      'The statement of comprehensive income covers a period, not a date.',
    ],
  },
  {
    title: B2,
    subs: [grossProfitMargin, operatingProfitMargin, netProfitMargin, waysToIncreaseProfits, waysToImproveProfitability],
    takeaway: [
      'A margin is a profit over revenue, times a hundred. Every one of the three.',
      'The gaps between the three margins say what the goods, the overheads and the loan cost.',
      'Three levers on profit: charge more, sell more, spend less.',
      'Profit is an amount and profitability is a rate. One can rise as the other falls.',
    ],
  },
  {
    title: B3,
    subs: [profitIsNotCash, statementOfFinancialPosition, workingCapital, importanceOfCash],
    takeaway: [
      'Profit is earned over a period; cash is what is in the bank on the day.',
      'The statement of financial position is one date: what is owned and what is owed.',
      '"Current" means within twelve months, on both sides.',
      'Working capital is current assets less current liabilities, and it is committed money.',
    ],
  },
  {
    title: B4,
    subs: [currentRatio, acidTestRatio, improvingLiquidityAssets, improvingLiquidityFactoring],
    takeaway: [
      'Current ratio is current assets over current liabilities. Acid test drops the inventory.',
      'The gap between the two measures how much comfort depends on selling inventory.',
      'The four ways the specification names do four different things.',
      'Longer supplier credit leaves working capital unchanged and drags ratios towards one to one.',
    ],
  },
  {
    title: B5,
    subs: [internalCashFlow, internalInventory, internalMarketingQuality, externalMarket, externalRates, externalRegulation],
    takeaway: [
      'Six internal causes and eight external ones, and all of them end in the same place.',
      'A business closes when it cannot pay, not when it stops being profitable.',
      'Interest rates are the only cause that leaves operating profit untouched.',
      'Growth consumes cash before it produces any, which is overtrading.',
    ],
  },
];

export const SUBSECTIONS = BLOCK_PLAN.flatMap((b) => b.subs);

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

/* ══ Notes ════════════════════════════════════════════════════════════════ */
/*
 * ONE NOTES TOPIC PER CHAPTER, IN THE SAME ORDER, GENERATED FROM THE SAME MODULE. `structure-07` is
 * that the notes, the flashcards and the quiz covered things `content[]` did not; making the titles
 * BE the block titles and the figures BE the module's figures means the two surfaces cannot diverge
 * again.
 *
 * A WARNING FOR VERIFY B: notes ship in the server-rendered page from the `data` column, so a
 * `?draft=1` walk shows these notes only after publication (DECISIONS, 16 September). Verify them
 * against the `draft` column, not against the page.
 */

const def = (html) => ({ type: 'definition', text: html });
const mech = (html) => ({ type: 'mechanism', text: html });
const link = (html) => ({ type: 'link', text: html });

export const NOTES = [
  {
    title: B1,
    meta: '2.3.3 · 1a, 1c',
    keyIdea: 'Three profits on one ladder, the costs that come off at each step, and the document that sets them out.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Gross profit</strong> — revenue less cost of sales. Only the goods sold come off.'),
        def('<strong>Operating profit</strong> — gross profit less other operating expenses. Before interest.'),
        def('<strong>Profit for the year (net profit)</strong> — operating profit less interest. What the owners keep.'),
        def('<strong>Statement of comprehensive income</strong> — the ladder as a document, covering a period of trading.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`${F.name}: revenue ${money(F.revenue)} → gross ${money(F.grossProfit)} → operating ${money(F.operatingProfit)} → profit for the year ${money(F.profitForYear)}.`),
        mech('There is no tax line in the specification\'s own statement (Appendix 9), so nothing is worked out after tax.'),
        link('A data table with no interest figure can support an operating profit and cannot support a profit for the year.'),
      ] },
    ],
    takeaway: [
      'Ask which profit before calculating anything.',
      'Cost of sales is the goods, not the office.',
      'Net profit and profit for the year are one line.',
    ],
  },
  {
    title: B2,
    meta: '2.3.3 · 1b, 1c',
    keyIdea: 'Three margins, the gap each one measures, and why an action can raise profit while lowering profitability.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Gross profit margin</strong> — (gross profit ÷ revenue) × 100. Buying and pricing.'),
        def('<strong>Operating profit margin</strong> — (operating profit ÷ revenue) × 100. The whole trading operation, before financing.'),
        def('<strong>Profit for the year margin</strong> — (profit for the year ÷ revenue) × 100. After the lenders.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`${F.name}: ${pct(F.gpm)}, then ${pct(F.opm)}, then ${pct(F.npm)}. The first gap is the overheads; the second is the ${money(F.interest)} of interest.`),
        mech(`A ${pct(F.priceCut)} price cut with volumes unchanged takes operating profit from ${money(F.operatingProfit)} to ${money(F.competitionProfit)}: price changes fall straight through.`),
        link('Cutting a price and selling much more can raise the profit and lower every margin. Profit is an amount; profitability is a rate.'),
      ] },
    ],
    takeaway: [
      'Every margin has revenue underneath it.',
      'Say which gap moved, not which margin is lowest.',
      'Growth usually raises profit and lowers profitability.',
    ],
  },
  {
    title: B3,
    meta: '2.3.3 · 2a, 2b, 2c',
    keyIdea: 'Why a profitable year can end with less money, what the second document holds, and what working capital actually is.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Statement of financial position</strong> — what is owned and owed on one date.'),
        def('<strong>Current assets</strong> — inventory, trade receivables and cash: money within twelve months.'),
        def('<strong>Current liabilities</strong> — trade payables, overdraft and other payables: owed within twelve months.'),
        def('<strong>Working capital</strong> — current assets less current liabilities.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`${money(F.profitForYear)} of profit and a cash movement of ${money(F.cashMovement)}: inventory up ${money(F.inventoryRise)}, receivables up ${money(F.receivableRise)}, payables up ${money(F.payableRise)}, a ${money(F.assetBought)} asset bought and ${money(F.loanRepaid)} of loan repaid.`),
        mech(`The cycle: cash buys inventory (${days(F.inventoryDays)}), inventory becomes trade receivables (${days(F.receivableDays)}), receivables become cash.`),
        link(`Working capital of ${money(F.workingCapital)} against ${money(F.cash)} in the bank: the cushion is real and almost none of it is spendable.`),
      ] },
    ],
    takeaway: [
      'A sale on credit is profit today and cash next month.',
      'Repaying a loan costs cash and is not an expense.',
      'Growth consumes working capital before it produces any.',
    ],
  },
  {
    title: B4,
    meta: '2.3.3 · 2b',
    keyIdea: 'Two ratios, the gap between them, and what each of the four ways of improving liquidity actually moves.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Current ratio</strong> — current assets ÷ current liabilities.'),
        def('<strong>Acid test ratio</strong> — (current assets − inventory) ÷ current liabilities. Appendix 9 also calls it the liquid capital ratio.'),
        def(`<strong>Factoring</strong> — selling trade receivables to a factor for cash now, less a fee.`),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`${F.name}: ${ratio(F.currentRatio)} and ${ratio(F.acidTest)}. The whole gap is ${money(F.inventory)} of tiles, about ${days(F.inventoryDays)} of cover.`),
        mech(`Sell an asset: everything improves. Extend supplier credit: working capital unchanged, ratios dragged towards 1:1. Factoring: cash to ${money(F.factoring.cash)}, acid test down to ${ratio(F.factoring.acidTest)}. Inventory JIT: acid test to ${ratio(F.jit.acidTest)}, current ratio unchanged.`),
        link('Adding the same amount to current assets and current liabilities leaves working capital alone and moves every ratio towards one to one.'),
      ] },
    ],
    takeaway: [
      'Interpret a ratio against what the current assets are made of.',
      'Longer supplier credit does not improve working capital.',
      'Factoring raises the cash and lowers the acid test.',
    ],
  },
  {
    title: B5,
    meta: '2.3.3 · 3a, 3b',
    keyIdea: 'Six internal causes and eight external ones, each priced on the line of the statement it lands on.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def(`<strong>Internal causes</strong> — ${INTERNAL_CAUSES.join(', ')}.`),
        def(`<strong>External causes</strong> — ${EXTERNAL_CAUSES.join(', ')}.`),
        def('<strong>Overtrading</strong> — growing faster than the working capital can fund.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Competition, a ${pct(F.priceCut)} price cut: operating profit ${money(F.competitionProfit)}. Exchange rates, a ${pct(F.currencyFall)} fall for an importer: ${money(F.currencyProfit)}. Market conditions, ${pct(F.demandFall)} less volume: ${money(F.demandProfit)}.`),
        mech(`Interest rates, ${F.rateRise} points on ${money(F.loan)}: operating profit unchanged, profit for the year ${money(F.rateProfitForYear)}.`),
        mech(`Growing ${pct(F.overtradeGrowth)} needs ${money(F.overtradeNeed)} of extra funding before any of it is paid for.`),
        link('Every cause ends at the same place: an invoice falls due and the money is not there.'),
      ] },
    ],
    takeaway: [
      'Name the line of the statement the cause lands on.',
      'A price cut costs more than a bigger fall in volume.',
      'The shock is the trigger; the liquidity decides the outcome.',
    ],
  },
];
