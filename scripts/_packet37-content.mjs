/**
 * PACKET 37 — national-income teaching content. Six blocks in the specification's own sub-topic
 * order, twenty-three subsections, one subsection to a step.
 *
 * `audit/raw/econ_spec.txt:1056-1082`. Sub-topics 2 and 4 are split across two chapters each so no
 * chapter is twice another's length (packet 31's decision, 17 September):
 *
 *   1  National Income                            1a, 1b        3 subsections
 *   2  Injections into the Flow                   2a, 2b        4
 *   3  Withdrawals and the Net Position           2c, 2d        4
 *   4  Equilibrium Real National Output           3a, 3b        4
 *   5  The Multiplier                             4a, 4b, 4c    5
 *   6  The Multiplier, AD and Economic Activity   4d            3
 *
 * ── WHAT THE LIVE SECTION TAUGHT THAT IS NOT HERE ──────────────────────────
 *
 * `structure-01` is that the live block 1 already taught all three injections, all three
 * withdrawals and the J = W rule in full, and then block 2 taught them again as three more
 * subsections, down to the same takeaway printed at the end of both. The rebuild teaches each
 * named leaf ONCE, in the chapter the specification puts it in, which makes the duplication
 * unrepresentable rather than removed.
 *
 * `structure-02` is that `planned-vs-actual` and `adjustment-to-equilibrium` are one mechanism told
 * twice. Both are gone, and so is the vocabulary they were told in: `unplanned`, `inventories`,
 * `Keynesian cross` and `45-degree` are each **0 hits** in `econ_spec.txt`. What survives is the
 * two sentences in `equilibrium-concept` that say WHY J = W settles, because 3a asks for "the
 * concept of equilibrium level of real national output" and a concept with no mechanism is a
 * definition. The apparatus the specification names for 3a and 3b is AD/AS (`:1077`), and it is
 * `equilibrium-on-ad-as`, `shifts-in-ad` and `shifts-in-as` — which the live section has never had,
 * and which is `specGap-02`, `structure-09`, `specThin-01` and `specThin-02` together.
 *
 * ── THE ONE THING THE LIVE SECTION SAID THAT WAS WRONG, AND IS ALREADY FIXED ──
 *
 * `accuracy-01`, `topFix-02` and `quiz-02` are the transfer-payments error: the live examMatters
 * called transfer payments government spending and an injection, while the section's own quiz[13]
 * said they are excluded. **Packet 0 fixed it on 11 September and all three are confirmed**, so
 * they are not re-claimed. The rebuild must not regress it, and it carries a rule-2 trap: the
 * phrase occurs ONCE in the whole specification, at `:1829`, which is 4.3.5 · 1a. It appears here
 * only inside the misconception that corrects it, with the pointer that says whose leaf it is.
 */
import {
  SECTION, subId, id, ECON, bn, prop, mult, pct, idx,
  INJECTIONS, WITHDRAWALS, PROPENSITIES,
} from './_packet37-util.mjs';

const E = ECON;
const blockId = (title) => id('block', title);

/*
 * EVERY RECALL IS MINTED HERE so the id is a function of the subsection, never of array position —
 * the defect packet 2 spent a decision on. `shuffled` is never written: the renderer ignores it and
 * CONTENT-GATE says to delete it when you touch a reorder.
 */
const recall = (sid, spec) => ({ id: `${sid}:recall`, ...spec });

export const B1 = 'National Income';
export const B2 = 'Injections into the Flow';
export const B3 = 'Withdrawals and the Net Position';
export const B4 = 'Equilibrium Real National Output';
export const B5 = 'The Multiplier';
export const B6 = 'The Multiplier, AD and Economic Activity';

/* ══ Block 1 — National Income (2.3.4 · 1a, 1b) ══════════════════════════ */

const circularFlow = (() => {
  const sid = subId('circular-flow');
  return {
    id: sid,
    title: 'The Circular Flow of Income',
    keyIdea: 'Households and firms are joined by two flows that run in opposite directions: goods and factors one way, money the other. National income is the size of that circuit.',
    body: [
      { type: 'paragraph', text: `Sub-topic 1 opens with **the circular flow of income**. Strip an economy down to two groups — households, who own the factors of production, and firms, who use them — and everything that passes between them belongs to one of two flows.` },
      { type: 'paragraph', text: `**The real flow** is the things themselves. Households supply labour, land, capital and enterprise to firms; firms supply finished goods and services back to households. Nothing in that sentence is money.` },
      { type: 'paragraph', text: `**The money flow** runs the other way round the same circuit. Firms pay households for the factors they used — wages, rent, interest and profit — and households pay firms for the goods and services they bought. Every arrow in one flow has a matching arrow in the other, pointing the opposite way.` },
      { type: 'paragraph', text: `That is why it is drawn as a circle. The money a firm pays out as wages is the money it receives back as revenue, and the economy keeps going because the circuit closes. In ${E.country}, ${E.what}, it turns over ${bn(E.Y)} a year, and that figure is the national income.` },
    ],
    realExample: { emoji: '🔁', text: `A food-processing plant in ${E.country} pays a line worker for a month of labour; the worker pays a landlord and a grocer. The plant's wage bill and the grocer's takings are the same dollars, one circuit apart.` },
    misconception: `Students draw one arrow between households and firms and label it "money". A single arrow cannot be a circular flow: it has no return leg, so the money it carries never comes back. Both flows must be drawn, each running opposite to the other.`,
    examMatters: `Appendix 6 defines Draw as requiring an accurately labelled diagram. On a circular flow that means four arrows, not two: factors and goods on the real flow, factor incomes and consumer spending on the money flow, with each pair running in opposite directions.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each arrow in a two-sector circular flow by which of the two flows it belongs to:',
      groups: [
        { name: 'The real flow', items: ['Labour supplied by a household to a firm', 'A finished refrigerator delivered to a household'], why: 'Both are the thing itself moving, not a payment for it — the factor going one way and the product coming back.' },
        { name: 'The money flow', items: ['Wages paid by a firm to a household', 'A household paying a firm for a refrigerator', 'Rent paid to the owner of a warehouse'], why: 'Each of these is a payment, and payments are the flow that runs opposite to the things being paid for.' },
      ],
    }),
  };
})();

const incomeOutputExpenditure = (() => {
  const sid = subId('income-output-expenditure');
  return {
    id: sid,
    title: 'Income, Output and Expenditure Are One Number',
    keyIdea: 'Because the circuit closes, the value of what is produced, the incomes paid to produce it and the spending that buys it are the same figure counted at three points.',
    body: [
      { type: 'paragraph', text: `Follow one dollar. A firm produces a dollar of **output**, and pays a dollar out to households as **income** — wages, rent, interest, and profit to the owners. Households spend it, and it returns to firms as **expenditure**.` },
      { type: 'paragraph', text: `The three are not estimates that happen to be close. They are one flow measured at three points on a circle, so they are equal by construction: national income, national output and national expenditure are one number with three names.` },
      { type: 'paragraph', text: `This is what makes the model useful rather than decorative: anything raising spending raises income and output by the same amount, and anything removing spending removes both. Sub-topics 2, 3 and 4 are that one consequence, worked out carefully.` },
      { type: 'paragraph', text: `In ${E.country} the figure is ${bn(E.Y)} a year at whichever point it is measured. When a later chapter says national income rose to ${bn(E.Y2)}, output and expenditure rose to ${bn(E.Y2)} too: there is only one flow to rise.` },
      /*
       * THE FLOW IS WHAT THE SUBSECTION'S REORDER IS SOURCED FROM. `reorder.source` (Layer 1) asks
       * that a sequence a student is asked to reconstruct is one the section actually taught, in
       * that order; packet 27's decision is that satisfying it by hand is how `structure-04` gets
       * reproduced. Teaching the sequence is the way to satisfy it that also helps. Four steps,
       * because `schema.flow` takes 2 to 4 and the reorder extends it by one, which is the normal
       * relationship between a flow and the recall that tests it.
       */
      { type: 'flow', resultType: 'neutral', steps: [
        { title: 'Output is produced', subtitle: 'A firm makes a dollar of goods or services' },
        { title: 'Incomes are paid', subtitle: 'Wages, rent, interest and profit go to the households that produced it' },
        { title: 'Households spend it', subtitle: 'On goods and services produced by firms' },
        { title: 'Firms receive expenditure', subtitle: 'The dollar is back where it started' },
      ] },
    ],
    realExample: { emoji: '⚖️', text: `Everything the food plant in ${E.country} sold last year has a value; everyone who helped produce it was paid; and someone bought all of it. Three counts of the same circuit.` },
    misconception: `Students treat the equality as an approximation holding "roughly". It is an identity. Profit makes it exact: whatever is left of the value of output after every other factor is paid is income to the owners, so no residue remains for the counts to differ by.`,
    examMatters: `A question that gives income and asks about output is not asking for a conversion. It is testing whether you know they are the same figure, and saying so in one line has the mark (Appendix 6, Explain).`,
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put one dollar\'s journey round the circuit in the order the dollar actually moves in, starting where the output is made:',
      correctOrder: [
        'A firm produces a dollar of output',
        'Wages, rent, interest and profit are paid out to the households that produced it',
        'That dollar is now a dollar of household income',
        'Households spend the dollar on goods and services',
        'Firms receive it back as expenditure, and the circuit closes',
      ],
      criterion: 'each step is caused by the one before it, following a single dollar round the circuit',
      why: [
        'Production comes first: there is nothing to pay anyone for until something has been made.',
        'The factors that produced the output have to be paid, and what they are paid is the value of what they produced.',
        'A payment by a firm is a receipt by a household. The same dollar has changed its name, not its size.',
        'Spending is what households do with income, and it is the leg of the circuit that sends the dollar back.',
        'The dollar arrives where it started, which is why the three counts give one number.',
      ],
    }),
  };
})();

const incomeAndWealth = (() => {
  const sid = subId('income-and-wealth');
  return {
    id: sid,
    title: 'Income and Wealth',
    keyIdea: 'Income is a flow measured over a period; wealth is a stock measured on a date. The circular flow carries income, and wealth is what income has been turned into.',
    body: [
      { type: 'paragraph', text: `Sub-topic 1 ends with **the distinction between income and wealth**, and the distinction is one of dimension. **Income is a flow**: it has a period attached, and the figure means nothing without it. **Wealth is a stock**: it has a date attached, and it is the value of what is owned at that moment.` },
      { type: 'paragraph', text: `A household earning ${bn(E.householdIncome / 1e9)} a year is describing a rate. The same household owning a home, a car and a pension worth ${bn(E.householdWealth / 1e9)} is describing a level — about ${E.wealthYears} years of that income, accumulated.` },
      { type: 'paragraph', text: `The two are connected in one direction and only one: income that is not spent becomes wealth, and wealth can generate income in the form of rent, interest or dividends. But a large stock of wealth is not a large income, and an economy can raise its national income for years without much wealth accumulating if all of it is consumed.` },
      { type: 'paragraph', text: `Only income moves round the circular flow. Wealth is the reservoir beside the circuit, filled by what is not spent. That is worth holding onto, because the next chapter's first withdrawal is exactly the leg where income stops being income and starts being wealth.` },
    ],
    realExample: { emoji: '🏠', text: `Two households in ${E.country} earn the same each month. One has been saving for twenty years and one has not. Their incomes are identical and their wealth is not remotely.` },
    misconception: `Students use "wealthy" and "high-earning" interchangeably, and then cannot answer a question that separates them. A retired household can hold large wealth and receive a small income; a young professional can earn well and own almost nothing. The test is always the same: does the figure need a period or a date?`,
    examMatters: `A question asking for the distinction wants both halves and the dimension that separates them, not two examples. Naming income as a flow over a period and wealth as a stock at a point in time is the distinction itself (Appendix 6, Define).`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the distinction, using one word in each blank:',
      template: [
        'Income is measured over a period of time, which makes it a ___.',
        'Wealth is measured on a single date, which makes it a ___.',
        'The two are connected because income that is not spent ___ over the years.',
      ],
      answers: ['flow', 'stock', 'accumulates'],
      hints: [
        'the dimension a figure has when it needs "per year" after it',
        'the dimension a figure has when it needs "as at" in front of a date',
        'what unspent income does, year after year, to build a reservoir',
      ],
      distractors: ['profit', 'revenue', 'disappears'],
    }),
  };
})();

/* ══ Block 2 — Injections into the Flow (2.3.4 · 2a, 2b) ═════════════════ */

const injectionsWithdrawals = (() => {
  const sid = subId('injections-withdrawals');
  return {
    id: sid,
    title: 'Injections and Withdrawals',
    keyIdea: 'An injection is spending that enters the circuit from outside; a withdrawal is income that leaves it. The test is direction, not whether the spending is useful.',
    body: [
      { type: 'paragraph', text: `The two-sector circuit is closed: every dollar of income comes straight back as spending. Real economies are not, and sub-topic 2 opens with **the distinction between injections and withdrawals**.` },
      { type: 'paragraph', text: `**An injection is spending on domestic output that does not come from household income.** It enters the circuit from outside and adds to the flow. **A withdrawal is income that households receive and that does not return to domestic firms as spending.** It leaves the circuit and subtracts from the flow.` },
      { type: 'paragraph', text: `There are three of each, and the specification names them in pairs you can hold together: firms invest and households save; governments spend and governments tax; foreigners buy our exports and we buy their imports. ${INJECTIONS.map(([n, s]) => `**${n} (${s})**`).join(', ')} go in; ${WITHDRAWALS.map(([n, s]) => `**${n} (${s})**`).join(', ')} come out.` },
      { type: 'paragraph', text: `Notice what the test is not. It is not whether the spending is useful, or who does it: taxation is a withdrawal and government expenditure is an injection, and the same body does both in one budget. The only question is which way the dollar crosses the edge.` },
    ],
    realExample: { emoji: '↔️', text: `A machine bought by a ${E.country} cannery from a domestic engineering firm is an injection. The same cannery buying the machine from abroad is an import, and a withdrawal. The purchase is identical; the direction is not.` },
    misconception: `Students sort by who is spending, so anything a household does becomes a withdrawal. Sort by direction instead: a household buying a domestically made refrigerator is ordinary consumption inside the circuit, and the same household buying an imported one is a withdrawal.`,
    examMatters: `Write **withdrawal**, not "leakage". The specification uses withdrawal throughout sub-topic 2 and never uses the other word, so a mark scheme written from it contains one of them and not the other. Questions here almost always turn on a single classification, and committing to one is worth more than a fluent paragraph that does not.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each item by whether it adds spending to the circular flow, removes income from it, or stays inside it:',
      groups: [
        { name: 'Injection', items: ['A foreign buyer paying for processed food', 'A government building a port'], why: 'Each is spending on domestic output that did not come out of domestic household income, so it enters the circuit from outside.' },
        { name: 'Withdrawal', items: ['A household putting money into a savings account', 'Income tax deducted from a salary'], why: 'Each is income a household has received and has not passed back to a domestic firm, so it leaves.' },
        { name: 'Neither — it stays inside the circuit', items: ['A household buying a domestically made refrigerator', 'A firm paying its own workers'], why: 'Both of these are the ordinary household-to-firm circuit turning: money moves, but it never crosses the edge.' },
      ],
    }),
  };
})();

const investment = (() => {
  const sid = subId('investment');
  return {
    id: sid,
    title: 'Investment (I)',
    keyIdea: 'Investment is spending by firms on capital goods. It is an injection because it is spending on output that households did not pay for.',
    body: [
      { type: 'paragraph', text: `**${INJECTIONS[0][2]}** It is the first of the three injections at 2 · b, and in ${E.country} it runs at ${bn(E.I)} a year.` },
      { type: 'paragraph', text: `Why is it an injection? A firm building a new warehouse is buying the output of a construction company. That output was produced, and someone was paid to produce it, but no household spent its income to bring it about. The spending entered the circuit from the firm's own side of it.` },
      { type: 'paragraph', text: `Investment is the injection with a second effect that the others do not have. The others raise income now; investment raises income now **and** leaves behind a machine that can produce more next year. That is why a change in investment is watched more closely than a change of the same size in anything else.` },
      { type: 'paragraph', text: `What makes investment rise or fall is 2.3.2's leaf, not this one, and this section deliberately does not teach it. Here the only question is what an extra ${bn(10)} of it does to the circuit — which is the same question asked of every injection, and which sub-topic 4 answers.` },
    ],
    realExample: { emoji: '🏗️', text: `A ${E.country} cannery orders a domestically built filling line. The engineering firm hires, buys steel and pays wages, and none of that spending began as household income.` },
    misconception: `Students count a household buying shares as investment. Buying a share transfers ownership of something that already exists; no output is produced and nothing enters the circuit. Investment in this model is spending on newly produced capital goods, and if it is not new output it is not investment.`,
    examMatters: `Where a question gives you a list and asks which items are investment, the test is whether new capital goods were produced. A share purchase, a house resale and a transfer of an existing factory all fail it.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `${E.country}'s injections are investment ${bn(E.I)}, government expenditure ${bn(E.G)} and exports ${bn(E.X)}. Complete the two figures, in $bn:`,
      template: [
        'Total injections into the circular flow come to $___bn',
        'Investment is the ___ largest of the three injections',
      ],
      answers: ['200', 'second'],
      hints: [
        'add the three figures in the prompt',
        'rank the three figures and say where this one falls',
      ],
      distractors: ['150', 'largest', '240'],
    }),
  };
})();

const governmentExpenditure = (() => {
  const sid = subId('government-expenditure');
  return {
    id: sid,
    title: 'Government Expenditure (G)',
    keyIdea: 'Government expenditure is government spending on goods and services. It is an injection, and it is the one the government can change deliberately.',
    body: [
      { type: 'paragraph', text: `**${INJECTIONS[1][2]}** In ${E.country} it is ${bn(E.G)} a year, the largest of the three injections.` },
      { type: 'paragraph', text: `It is an injection for the same reason investment is. When a government pays a construction firm to build a road, output is produced and incomes are paid, and no household spent its own income to cause it. The spending crossed into the circuit from outside.` },
      { type: 'paragraph', text: `What makes G different from the other two is that somebody chooses it. Investment depends on what thousands of firms decide, and exports on what foreign buyers decide. Government expenditure is set in a budget, which is why every worked example of an injection in this topic — including this section's — uses a change in G.` },
      { type: 'paragraph', text: `**One category of government spending is not counted here.** Money the government hands to households without receiving goods or services in return is not spending on output, so it is not part of G in this model. It becomes part of the circuit only when the household that receives it spends it.` },
    ],
    realExample: { emoji: '🏥', text: `A ${E.country} ministry commissions a regional hospital. Engineers, bricklayers and equipment suppliers are all paid, and the output they produce is counted in national output.` },
    misconception: `Students count transfer payments — pensions, unemployment benefit, subsidies paid direct to households — as part of G, because the government pays them out. No output is produced in exchange, so they are not spending on goods and services and they are not an injection at the point they are paid. Counting them here would count the same dollar twice: once as the transfer, and again when the household spends it. (How government spending is divided into categories is 4.3.5 · 1a's leaf, not this one's.)`,
    examMatters: `A data question that gives total public spending and asks for the injection is testing exactly this. Take out the payments that buy no output before using the figure (Appendix 6, Calculate).`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each item of government activity to what it is in the circular flow:',
      pairs: [
        { left: 'Paying a construction firm to build a school', right: 'An injection: spending on output', why: 'Output is produced and paid for, and no household income was used to cause it.' },
        { left: 'Paying a monthly pension into a household account', right: 'Not an injection: no output is bought', why: 'Nothing is produced in exchange, so counting it here would count the dollar twice — once now and again when the household spends it.' },
        { left: 'Deducting income tax from a salary', right: 'A withdrawal: income that leaves the circuit', why: 'The household received the income and cannot pass it on to a domestic firm.' },
        { left: 'Paying the salary of a state-employed teacher', right: 'An injection: a service is produced', why: 'Teaching is output the government has bought, so it belongs with the school building rather than with the pension.' },
      ],
    }),
  };
})();

const exports = (() => {
  const sid = subId('exports');
  return {
    id: sid,
    title: 'Exports (X)',
    keyIdea: 'Exports are spending by foreign buyers on domestic output. They are an injection because the income that pays for them was earned abroad.',
    body: [
      { type: 'paragraph', text: `**${INJECTIONS[2][2]}** ${E.country} exports ${bn(E.X)} a year, mostly processed food.` },
      { type: 'paragraph', text: `The test is the same one again. A buyer in another country pays a ${E.country} cannery for a container of goods. The cannery's workers are paid, the output is counted in ${E.country}'s national output, and the income that bought it was earned in an economy whose circuit is not this one. It has entered from outside.` },
      { type: 'paragraph', text: `What matters for classification is **where the output was produced, not where the buyer is**. A tourist who flies in and spends a week here is buying domestically produced services with foreign income: that is an export, even though nothing left the country. A domestic firm selling to another domestic firm is not, even if the goods are eventually shipped abroad by the second firm — the export is counted once, at the point the foreign income arrives.` },
      { type: 'paragraph', text: `Exports are the injection a government has least control over, because they depend on demand in other countries. That is worth remembering in an evaluation: an economy that relies on exports for a large share of its injections has tied its national income to decisions made elsewhere.` },
    ],
    realExample: { emoji: '🚢', text: `A container of ${E.country} canned fruit is bought by a supermarket chain in another country. The payment arrives from outside and the cannery's wage bill is paid from it.` },
    misconception: `Students treat exports as "goods leaving the country" and so miss services. A hotel room sold to a visitor, an engineering consultancy done for a foreign client and a licence fee paid from abroad are all exports, and nothing is loaded onto a ship in any of them.`,
    examMatters: `A question about a tourism-dependent economy is an exports question. Saying so in the first line is worth more than a description of the tourist industry.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each transaction by whether it is an export of this economy:',
      groups: [
        { name: 'An export', items: ['A foreign supermarket buying canned fruit from a domestic cannery', 'A visitor from abroad paying for a week in a domestic hotel', 'An engineering consultancy billing a client in another country'], why: 'In each one, income earned abroad is paying for output produced here, which is the whole test and has nothing to do with whether anything is shipped.' },
        { name: 'Not an export', items: ['A domestic household buying an imported machine', 'A domestic cannery selling to a domestic wholesaler'], why: 'The first has the money going the other way and the second never leaves the domestic circuit at all.' },
      ],
    }),
  };
})();

/* ══ Block 3 — Withdrawals and the Net Position (2.3.4 · 2c, 2d) ═════════ */

const savings = (() => {
  const sid = subId('savings');
  return {
    id: sid,
    title: 'Savings (S)',
    keyIdea: 'Savings are income households receive and do not spend. It is a withdrawal because the income has left the circuit, not because saving is unwise.',
    body: [
      { type: 'paragraph', text: `**${WITHDRAWALS[0][2]}** In ${E.country}, households save ${bn(E.S)} out of ${bn(E.Y)} of national income.` },
      { type: 'paragraph', text: `A dollar that is saved has been earned, so it is income; it has not been passed to a firm, so it is not expenditure. It has stopped circulating, and while it is stopped the flow is smaller than it would otherwise be. That is the whole of what "withdrawal" means here.` },
      { type: 'paragraph', text: `This is the point at which income becomes wealth, which is the link back to the first chapter. Saving is the leg of the circuit where a flow turns into a stock.` },
      { type: 'paragraph', text: `Nothing in the model says saving is bad. Savings are what banks lend to firms, and firms' borrowing is what pays for the investment that is the first injection. The model separates the two deliberately: the decision to save is made by households and the decision to invest is made by firms, and there is no mechanism forcing them to match.` },
    ],
    realExample: { emoji: '🏦', text: `A ${E.country} household puts part of each month's pay into a deposit account. The money was earned in the circuit and is now sitting outside it.` },
    misconception: `Students describe saving as money "doing nothing", and then cannot explain where investment finance comes from. Saved money is usually lent on by a bank. What makes it a withdrawal is not that it is idle but that the household did not spend it on domestic output — whoever spends it next is a separate decision by a separate person.`,
    examMatters: `An answer that calls saving harmful has gone further than the model supports. The examinable point is narrower and safer: saving removes spending from the flow in this period, and whether that reduces national income depends on what injections are doing at the same time.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `In ${E.country}, national income is ${bn(E.Y)} and households save ${bn(E.S)}. Complete the two figures:`,
      template: [
        'Savings as a share of national income are ___%',
        'Savings are a ___ from the circular flow',
      ],
      answers: ['10', 'withdrawal'],
      hints: [
        'divide the smaller figure by the larger one and turn it into a percentage',
        'the specification\'s own word for income that leaves the circuit',
      ],
      distractors: ['20', '50', '100'],
    }),
  };
})();

const taxation = (() => {
  const sid = subId('taxation');
  return {
    id: sid,
    title: 'Taxation (T)',
    keyIdea: 'Taxation is income taken by the government before a household can spend it. It is a withdrawal even though the government spends most of it straight back.',
    body: [
      { type: 'paragraph', text: `**${WITHDRAWALS[1][2]}** ${E.country} collects ${bn(E.T)} a year, the largest of the three withdrawals.` },
      { type: 'paragraph', text: `The dollar was earned, so it is income; the household could not spend it, so it is not household expenditure. It has left the circuit at the point it was taken, which is what makes it a withdrawal.` },
      { type: 'paragraph', text: `And that is true even though almost all of it comes back as government expenditure. **The two are counted separately on purpose**, because they are different sizes and are decided in different ways. A government that taxes ${bn(E.T)} and spends ${bn(E.G)} has withdrawn more than it injected, and the circuit is smaller for it; the reverse is also possible, and both happen.` },
      { type: 'paragraph', text: `Counting them as one net figure would hide exactly the thing the model is for. Taxation is a withdrawal, government expenditure is an injection, and the balance between them is one of the things that decides where national income settles.` },
    ],
    realExample: { emoji: '🧾', text: `A ${E.country} salary of ten thousand arrives as eight thousand. The missing two thousand was income, and the household never had the chance to spend it.` },
    misconception: `Students cancel taxation against government expenditure and say "they net out, so ignore both". They net out only when they are equal, which is rare and is a question in its own right. Both belong on the diagram as separate arrows pointing opposite ways.`,
    examMatters: `Where a question gives tax revenue and government spending as two lines, it is asking you to compare them, not to add them. The answer is which is bigger and what that does to the flow.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `${E.country} collects ${bn(E.T)} in taxation and spends ${bn(E.G)} on goods and services. Complete the comparison, in $bn:`,
      template: [
        'The government withdraws $___bn more than it injects',
        'Acting on its own, the government therefore makes the circular flow ___',
      ],
      answers: ['10', 'smaller'],
      hints: [
        'the gap between the two figures in the prompt',
        'the direction the flow moves when more leaves than enters',
      ],
      distractors: ['190', 'larger', 'unchanged'],
    }),
  };
})();

const imports = (() => {
  const sid = subId('imports');
  return {
    id: sid,
    title: 'Imports (M)',
    keyIdea: 'Imports are spending that leaves the country to pay for foreign output. The household did spend the income; it simply did not spend it here.',
    body: [
      { type: 'paragraph', text: `**${WITHDRAWALS[2][2]}** ${E.country} imports ${bn(E.M)} a year, mostly machinery.` },
      { type: 'paragraph', text: `Imports are the withdrawal that catches students out, because the household did spend the money. The point is where it went. A dollar spent on an imported machine pays wages in another country's circuit, not in this one, so as far as domestic national income is concerned it has left.` },
      { type: 'paragraph', text: `That is why imports are subtracted rather than ignored. They are already inside the spending figures — a household's consumption includes what it buys from abroad — so if they were not taken out again, this economy's national income would include output that some other economy produced.` },
      { type: 'paragraph', text: `In ${E.country}, imports ${bn(E.M)} happen to equal exports ${bn(E.X)}, so the two cancel and the economy neither gains nor loses on trade overall. That is a convenience for the arithmetic and not a law: an economy importing more than it exports is withdrawing more than it injects on the trade legs alone.` },
    ],
    realExample: { emoji: '📦', text: `A ${E.country} cannery buys a filling line from abroad. The money is spent, the machine arrives, and the wages it paid were paid to workers in another country.` },
    misconception: `Students say imports "reduce national income because they are a cost". They reduce it because the spending went to another economy's producers. An imported machine that raises a firm's output can raise national income overall — the withdrawal is what it does on the spending leg, not the whole story.`,
    examMatters: `A question about a rise in imports wants the withdrawal and then its size. Naming the direction is one step; using the multiplier to say how much national income falls is the second, and it is where the marks separate.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each of the three withdrawals to the reason the income has left the circuit:',
      pairs: [
        { left: 'Savings', right: 'It was received and not spent at all', why: 'The household kept it, so it never reached a firm in this period.' },
        { left: 'Taxation', right: 'It was taken before the household could spend it', why: 'The income existed, but the decision to spend it was never the household\'s to make.' },
        { left: 'Imports', right: 'It was spent, but on output produced abroad', why: 'The spending happened; it just paid wages in another economy\'s circuit.' },
      ],
      distractors: ['It was never earned by anyone in the first place'],
    }),
  };
})();

const netInjectionsWithdrawals = (() => {
  const sid = subId('net-injections-withdrawals');
  return {
    id: sid,
    title: 'Net Injections and Net Withdrawals',
    keyIdea: 'What moves national income is not injections or withdrawals on their own, but the gap between the two totals.',
    body: [
      { type: 'paragraph', text: `2 · d asks for **the impact of net injections into, and net withdrawals from, the circular flow of income**, and "net" is the word carrying the requirement. Six arrows have been described; only their two totals matter.` },
      { type: 'paragraph', text: `In ${E.country}: injections ${bn(E.I)} + ${bn(E.G)} + ${bn(E.X)} = **${bn(E.J)}**. Withdrawals ${bn(E.S)} + ${bn(E.T)} + ${bn(E.M)} = **${bn(E.W)}**. The two totals are equal, so there is no net injection and no net withdrawal, and the flow is not being pushed either way.` },
      { type: 'paragraph', text: `**A net injection — injections above withdrawals — makes the circuit grow.** More is entering than leaving, so next period's incomes are larger than this period's. **A net withdrawal makes it shrink**, for the mirror reason. The size of the effect is sub-topic 4's question; the direction is this one's.` },
      { type: 'paragraph', text: `Notice that the individual arrows can all change without the total moving. A rise in savings of ${bn(10)} matched by a rise in investment of ${bn(10)} leaves ${bn(E.J)} against ${bn(E.W)} untouched. Only the gap moves the flow, which is why an answer that lists what happened to one arrow has not yet answered the question.` },
    ],
    realExample: { emoji: '🪙', text: `${E.country}'s trade legs cancel at ${bn(E.X)} each way and its government withdraws ${bn(E.T - E.G)} more than it injects, so investment at ${bn(E.I)} against savings at ${bn(E.S)} is exactly what closes the gap.` },
    misconception: `Students conclude that a rise in any injection must raise national income. It raises it only if withdrawals have not risen by as much at the same time. The model's arithmetic is about two totals, and a question that changes two arrows at once is asking whether you know that.`,
    examMatters: `A question that changes several arrows is testing the netting, not the classification. Set out both totals before and after, and the direction falls out of the comparison rather than out of intuition.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `An economy has injections of ${bn(220)} and withdrawals of ${bn(180)}. Complete the analysis, in $bn where a figure is asked for:`,
      template: [
        'There is a net injection of $___bn',
        'National income will therefore ___ in the next period',
        'If withdrawals then rose to $___bn, the flow would stop changing',
      ],
      answers: ['40', 'rise', '220'],
      hints: [
        'the gap between the two totals in the prompt',
        'the direction the circuit moves when more enters than leaves',
        'the level at which the two totals would match',
      ],
      distractors: ['400', 'fall', '180'],
    }),
  };
})();

/* ══ Block 4 — Equilibrium Real National Output (2.3.4 · 3a, 3b) ═════════ */

const equilibriumConcept = (() => {
  const sid = subId('equilibrium-concept');
  return {
    id: sid,
    title: 'The Concept of Equilibrium',
    keyIdea: 'Real national output is in equilibrium when injections equal withdrawals, because at that point nothing is pushing the flow in either direction.',
    body: [
      { type: 'paragraph', text: `3 · a asks for **the concept of equilibrium level of real national output**. An equilibrium is not a level that is good, or full, or fair. It is a level with no tendency to change, and in this model that means one thing: **J = W**.` },
      { type: 'paragraph', text: `The mechanism is worth two sentences. Suppose injections exceed withdrawals. More is being spent on output than is leaving the circuit, so firms sell more than they produced, respond by producing more, and pay out more income — and as income rises, so do savings, taxation and imports, because all three rise with income. The flow grows until withdrawals have grown enough to match, and then it stops.` },
      { type: 'paragraph', text: `That is why equilibrium is stable rather than accidental. **Withdrawals rise with income and injections do not**, so any gap closes itself: an economy above equilibrium withdraws more than it injects and shrinks back, and one below it does the reverse.` },
      { type: 'paragraph', text: `${E.country} is at ${bn(E.Y)} with ${bn(E.J)} entering and ${bn(E.W)} leaving. Nothing is pushing, so nothing moves. And notice what equilibrium does not promise: ${bn(E.Y)} may be well below what this economy could produce, and the flow will still sit there until an injection or a withdrawal changes.` },
    ],
    realExample: { emoji: '⚖️', text: `${E.country} sat at ${bn(E.Y)} for three years with unemployment high throughout. Equilibrium held because J and W matched, not because the economy was doing well.` },
    misconception: `Students read "equilibrium" as "the best the economy can do", and then cannot explain how an economy can be stuck with high unemployment. The condition is J = W and nothing more. An economy producing far below its potential can satisfy it perfectly.`,
    examMatters: `Define equilibrium by its condition, not by its consequences. An answer beginning "equilibrium is where injections equal withdrawals, so there is no tendency for national income to change" has the definition and the reason in one sentence (Appendix 6, Define).`,
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'An economy has injections above withdrawals. Put the adjustment back to equilibrium in order. The ordering principle is that each step is caused by the one before it:',
      correctOrder: [
        'Injections exceed withdrawals, so more is spent on output than leaves the circuit',
        'Firms find they are selling more than they have been producing',
        'Output is raised, and more income is paid out to do it',
        'Savings, taxation and imports all rise, because each of them rises with income',
        'Withdrawals have risen to match injections, and national income stops changing',
      ],
      criterion: 'each step is caused by the one before it, from the initial gap to the new equilibrium',
      why: [
        'This is the starting condition: a net injection is a push, and the flow is not yet balanced.',
        'Selling more than was produced is the signal firms actually observe; nobody sees the national totals.',
        'Raising output means hiring and paying, and paying is what turns extra spending into extra income.',
        'This is the step that makes the process stop: all three withdrawals depend on income, and income has just risen.',
        'The gap that started the process has closed, which is the definition of the new equilibrium.',
      ],
    }),
  };
})();

const equilibriumOnAdAs = (() => {
  const sid = subId('equilibrium-on-ad-as');
  return {
    id: sid,
    title: 'Equilibrium on AD and AS',
    keyIdea: 'The same equilibrium drawn on price-level and real-output axes: where aggregate demand crosses aggregate supply. J = W and AD = AS are two ways of saying one thing.',
    body: [
      { type: 'paragraph', text: `The injections-and-withdrawals picture shows where output settles but says nothing about prices. The specification's other apparatus does both. **Aggregate demand** is total planned spending on domestic output at each price level, and **aggregate supply** is total planned output at each price level. Equilibrium real national output is where the two curves cross.` },
      { type: 'paragraph', text: `The axes matter and are the thing most often drawn wrong. **The price level goes on the vertical axis and real national output on the horizontal axis.** Not price, not quantity of one good: the general price level, as an index, against the real output of the whole economy.` },
      { type: 'paragraph', text: `${E.country} crosses at real output ${bn(E.Y)} and a price level of ${idx(E.P0)}. That is the same ${bn(E.Y)} the J = W condition gave, because the two conditions are the same condition. Spending that enters the circuit and spending that is planned on domestic output are the same dollars counted two ways, so AD = AS whenever J = W.` },
      { type: 'paragraph', text: `What the AD/AS picture adds is the second axis. J = W can tell you output has risen; only this diagram can tell you whether the price level rose with it, and that is what the next two subsections are about.` },
    ],
    realExample: { emoji: '📉', text: `${E.country}'s statistics office reports real output of ${bn(E.Y)} and a price index of ${idx(E.P0)}. One point on a chart, and both curves pass through it.` },
    misconception: `Students label the vertical axis "price" and the horizontal axis "quantity", copying a demand-and-supply diagram for a single good. The whole economy's output is not a quantity of anything, and the general price level is not a price. Mislabelling the axes loses the diagram mark before anything is drawn on it.`,
    examMatters: `Appendix 6 defines Draw as requiring an accurately labelled diagram, and on this one the labels are the accuracy: price level on the vertical, real national output on the horizontal, both curves named, and the equilibrium marked where they cross.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the description of an AD/AS diagram, one term to a blank:',
      template: [
        'The vertical axis measures the ___ ___, as an index number.',
        'The horizontal axis measures ___ ___ ___.',
        'Equilibrium is the point where the two curves ___.',
      ],
      answers: ['price', 'level', 'real', 'national', 'output', 'cross'],
      hints: [
        'not the price of one good, but the general one',
        'the word that means "adjusted for inflation"',
        'whose it is: the economy\'s as a whole',
        'the thing being produced, not the money it sells for',
        'the general one, not a single market\'s',
        'what two lines on a diagram do at the equilibrium point',
      ],
      distractors: ['quantity', 'nominal'],
    }),
  };
})();

const shiftsInAd = (() => {
  const sid = subId('shifts-in-ad');
  return {
    id: sid,
    title: 'Causes of Change: A Shift in AD',
    keyIdea: 'A rise in any injection shifts AD to the right. Real output and the price level both rise, and how they split depends on the AS curve it meets.',
    body: [
      { type: 'paragraph', text: `3 · b asks for **the causes of changes in equilibrium real national output as a result of shifts in the AD curve**. AD shifts when planned spending on domestic output changes at every price level — which is exactly what a change in an injection or a withdrawal is.` },
      { type: 'paragraph', text: `So the list of causes is the list this section has already built. **A rise in investment, in government expenditure or in exports shifts AD right; a rise in savings, taxation or imports shifts it left.** What makes each of those rise or fall is 2.3.2's leaf and this section points at it rather than teaching it.` },
      { type: 'paragraph', text: `Take ${E.country} and raise government expenditure by ${bn(E.shock)}. AD shifts right. Along an upward-sloping short-run AS curve, the new crossing point is at real output ${bn(E.Yad)} and a price level of ${idx(E.Pad)}: **both have risen**.` },
      { type: 'paragraph', text: `That is the property to carry into an exam answer. **A shift in AD moves real output and the price level in the same direction** — right and up together, left and down together. The reason is that AS slopes upward: getting more output out of an economy costs more per unit, so more output arrives with a higher price level attached.` },
    ],
    realExample: { emoji: '📈', text: `${E.country}'s government adds ${bn(E.shock)} of port and road building. Two years later real output is ${bn(E.Yad)} and the price index has moved from ${idx(E.P0)} to ${idx(E.Pad)}.` },
    misconception: `Students shift AD right and read the new output straight off the horizontal shift, as though the price level had not moved. It did, and the economy slides up its AS curve, so the rise in real output is smaller than the shift.`,
    examMatters: `A Draw question wants the shift labelled AD to AD₁, the new crossing marked, and both values read off. A diagram showing the shift but not the new equilibrium has answered half of it (Appendix 6, Draw).`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each change by which way it shifts the AD curve:',
      groups: [
        { name: 'AD shifts right', items: ['A rise in government expenditure', 'A rise in exports', 'A rise in investment by firms'], why: 'Each of these is an injection, and more spending entering the circuit at every price level is a rightward shift.' },
        { name: 'AD shifts left', items: ['A rise in the rate of income tax', 'A rise in imports', 'A rise in household savings'], why: 'Each of these is a withdrawal, and more income leaving the circuit at every price level is a leftward shift.' },
      ],
    }),
  };
})();

const shiftsInAs = (() => {
  const sid = subId('shifts-in-as');
  return {
    id: sid,
    title: 'Causes of Change: A Shift in AS',
    keyIdea: 'A shift in AS moves real output and the price level in opposite directions. That single difference is how an exam question tells you which curve moved.',
    body: [
      { type: 'paragraph', text: `The other half of 3 · b is **a shift in the AS curve**. AS moves when the cost or capacity of producing changes rather than when spending does: cheaper imported raw materials or a change in exchange or tax rates in the short run, better technology, skills or productivity in the long run. Those causes are 2.3.3's leaves, referred to here rather than taught.` },
      { type: 'paragraph', text: `Take ${E.country} again and let the machinery it imports become cheaper. Producing anything now costs less, so AS shifts right. The new crossing point is at real output ${bn(E.Yas)} and a price level of ${idx(E.Pas)}: **output has risen and the price level has fallen**.` },
      { type: 'paragraph', text: `**That is the diagnostic.** An AD shift moves output and prices the same way; an AS shift moves them opposite ways. Given a question that reports rising output and falling prices, no other combination fits, and the curve that moved is AS.` },
      { type: 'paragraph', text: `The shape of AS also decides how much of an AD shift becomes output at all. Well below capacity, AS is close to flat and almost all of a rightward shift arrives as output; at capacity it is close to vertical and almost all arrives as a higher price level. Those shapes are 2.3.3 · 3a's Keynesian and classical curves, and the last chapter puts numbers on both.` },
    ],
    realExample: { emoji: '⚙️', text: `Imported machinery into ${E.country} falls in price. Canneries re-equip, unit costs drop, and the statistics office reports output ${bn(E.Yas)} with the price index down to ${idx(E.Pas)}.` },
    misconception: `Students treat any rise in real output as evidence that demand rose. Output and prices moving in opposite directions rules AD out entirely. Reading the two directions together, rather than output alone, is what identifies the curve.`,
    examMatters: `Where a data question reports what happened to output and to the price level, it has told you which curve moved. Say which, and why the pair of directions proves it, before analysing anything else.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each pair of observed changes to the curve that must have moved, and in which direction:',
      pairs: [
        { left: 'Real output up, price level up', right: 'AD shifted right', why: 'Only a demand shift moves the two in the same direction, and upward is the rightward case.' },
        { left: 'Real output down, price level down', right: 'AD shifted left', why: 'Same direction again, so it is demand; both falling is the leftward case.' },
        { left: 'Real output up, price level down', right: 'AS shifted right', why: 'Opposite directions can only be supply, and more output at lower cost is the rightward case.' },
        { left: 'Real output down, price level up', right: 'AS shifted left', why: 'Opposite directions again, and less output at higher cost is the leftward case.' },
      ],
    }),
  };
})();

/* ══ Block 5 — The Multiplier (2.3.4 · 4a, 4b, 4c) ═══════════════════════ */

const multiplierProcess = (() => {
  const sid = subId('multiplier-process');
  return {
    id: sid,
    title: 'The Multiplier and the Multiplier Process',
    keyIdea: 'An injection raises national income by more than itself, because the income it creates is spent again. The multiplier is how many times over.',
    body: [
      { type: 'paragraph', text: `4 · a asks for **the multiplier and the multiplier process**, and the process is where the number comes from. ${E.country}'s government spends an extra ${bn(E.shock)} on a port.` },
      { type: 'paragraph', text: `**Round one:** the ${bn(E.shock)} is paid to construction firms and their workers. National income has risen by ${bn(E.ROUNDS[0])}. **Round two:** those households spend ${prop(E.mpc)} of it on domestically produced goods — ${bn(E.ROUNDS[1])} — and that is somebody else's income. **Round three:** ${prop(E.mpc)} of that is spent again: ${bn(E.ROUNDS[2])}. Then ${bn(E.ROUNDS[3])}, then ${bn(E.ROUNDS[4])}.` },
      { type: 'paragraph', text: `Each round is smaller than the last, because part of every dollar received is saved, taxed or spent abroad and so never makes it to the next round. The rounds shrink to nothing and the total converges: ${bn(E.deltaY)} of extra national income from ${bn(E.shock)} of extra spending. The first five rounds alone have already delivered ${pct(E.fiveRoundShare)} of it.` },
      { type: 'paragraph', text: `**The multiplier is the ratio: ${bn(E.deltaY)} ÷ ${bn(E.shock)} = ${mult(E.k)}.** And the process stops exactly where the previous chapter said it would. At the new income of ${bn(E.Y2)}, withdrawals have risen by ${bn(E.withdrawalRise)} — which is the size of the injection — so ${bn(E.J2)} is entering and ${bn(E.W2)} is leaving, and the flow is in equilibrium again.` },
    ],
    realExample: { emoji: '🏗️', text: `The ${E.country} port contract is ${bn(E.shock)}. The dockyard's wage bill becomes grocery takings, the grocer's staff pay rent, and by the fifth round the sums are small enough to stop noticing.` },
    misconception: `Students describe the process as money going round "for ever", and then cannot explain why the total is finite. Each round is smaller than the one before it by a fixed fraction, and a shrinking series has a limit. The process has no end date and a very definite total.`,
    examMatters: `An answer that describes the rounds without reaching the total has described a mechanism and not answered the question. Two or three rounds are enough to show the mechanism; then use the formula and give the number.`,
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the multiplier process in order, starting with the injection. The ordering principle is that each round\'s spending creates the next round\'s income:',
      correctOrder: [
        'A government spends an extra amount on domestic output',
        'That amount becomes income for the firms and workers who produced it',
        'Those households spend part of it on domestic output and save, pay tax on, or import the rest',
        'What they spent becomes income for somebody else, and the round repeats at a smaller size',
        'The rounds shrink towards nothing and the extra income settles at a finite total',
      ],
      criterion: 'each round\'s spending creates the next round\'s income, so the order is the order the dollars actually move in',
      why: [
        'The injection is the only step that does not come from somebody\'s income, which is why the process starts here.',
        'Spending on output is income to whoever produced it. This is the step that turns the injection into national income.',
        'This is where the withdrawals happen, and it is the reason each round is smaller than the one before.',
        'Only the part that was spent domestically carries on, so the round repeats with less in it every time.',
        'A series that shrinks by a fixed fraction each time has a limit, which is why the multiplier is a finite number.',
      ],
    }),
  };
})();

const mpcMps = (() => {
  const sid = subId('mpc-mps');
  return {
    id: sid,
    title: 'Marginal Propensity to Consume and to Save',
    keyIdea: 'A marginal propensity is the fraction of one extra dollar of income that goes a particular way. MPC is what keeps the process going; MPS is one of the three things that stop it.',
    body: [
      { type: 'paragraph', text: `4 · b asks for **marginal propensities and their effects on the multiplier**. "Marginal" means out of the next dollar, not out of all the dollars: a propensity is what happens to an extra unit of income, and it is written as a decimal.` },
      { type: 'paragraph', text: `**The marginal propensity to consume (MPC)** is the fraction of extra income spent on **domestically produced** goods and services. In ${E.country} it is ${prop(E.mpc)}, which is what generated ${bn(E.ROUNDS[1])} out of the first round's ${bn(E.ROUNDS[0])}. MPC is the only propensity that keeps a dollar inside the circuit, so it alone decides how much survives into the next round.` },
      { type: 'paragraph', text: `**The marginal propensity to save (MPS)** is the fraction saved: ${prop(E.mps)} here. A dollar saved does not reach a domestic firm in this round, so it drops out of the process.` },
      { type: 'paragraph', text: `The word "domestically" in the MPC definition is doing real work and is the commonest source of a wrong multiplier. Households in ${E.country} spend more than ${prop(E.mpc)} of extra income in total — some of it goes abroad — but only ${prop(E.mpc)} of it lands on domestic output, and only that part starts the next round.` },
    ],
    realExample: { emoji: '🛒', text: `A dockworker in ${E.country} receives an extra hundred. Sixty is spent in local shops, ten goes into savings, twenty to tax and ten on an imported phone.` },
    misconception: `Students take MPC out of disposable income — what is left after tax — and then use it in the formula. The formula's MPC is out of national income, before tax. Mixing the two produces a multiplier that can be double the right one, and it is the single most common calculation error in this topic.`,
    examMatters: `Where a question gives the propensities, check they sum to one before using any of them. If they do, they are out of national income and both formulae apply; if they do not, read the question again for which base is being used.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `A household receives an extra $100 of income. It spends $55 on domestic goods, saves $15, pays $20 in tax and spends $10 on imports. Complete the propensities as decimals:`,
      template: [
        'The marginal propensity to consume is ___',
        'The marginal propensity to save is ___',
        'The four propensities together must sum to ___',
      ],
      answers: ['0.55', '0.15', '1'],
      hints: [
        'the share of the extra hundred that stayed with domestic producers',
        'the share that was neither spent nor taken',
        'every dollar goes somewhere, so there is only one possible total',
      ],
      distractors: ['0.65', '0.20', '0.75'],
    }),
  };
})();

const mptMpm = (() => {
  const sid = subId('mpt-mpm');
  return {
    id: sid,
    title: 'Marginal Propensity to Tax and to Import',
    keyIdea: 'MPT and MPM are the other two ways a dollar leaves the process. Together with MPS they are the marginal propensity to withdraw, and they are what makes a real multiplier small.',
    body: [
      { type: 'paragraph', text: `The other two propensities 4 · b names are the ones a two-sector model has no room for. **The marginal propensity to tax (MPT)** is the fraction of extra income taken in taxation — ${prop(E.mpt)} in ${E.country}. **The marginal propensity to import (MPM)** is the fraction spent on foreign output: ${prop(E.mpm)}.` },
      { type: 'paragraph', text: `MPT is the largest of ${E.country}'s three withdrawal propensities and is often the largest anywhere, because income tax is usually deducted before a household sees the money. It is also the one a government controls directly: raising the rate of income tax raises MPT, which shrinks the multiplier on every future injection, including the government's own spending.` },
      { type: 'paragraph', text: `**Add the three together and you have the marginal propensity to withdraw: MPW = MPS + MPT + MPM = ${prop(E.mps)} + ${prop(E.mpt)} + ${prop(E.mpm)} = ${prop(E.mpw)}.** That is the fraction of every extra dollar that does not survive into the next round, and it is the single number the multiplier depends on.` },
      { type: 'paragraph', text: `Which is why an open economy with a large government has a smaller multiplier than a closed one with a small government. In ${E.country}, ${pct(E.mpw * 100)} of each extra dollar leaves per round, so an injection is multiplied ${mult(E.k)} times. Halve MPW and it would be five.` },
    ],
    realExample: { emoji: '🌐', text: `Two economies receive the same ${bn(E.shock)} injection. The one that imports heavily and taxes highly sees far less of it, because more of each round leaves before the next one starts.` },
    misconception: `Students treat a high MPM as a problem only for the balance of trade. It is also what makes a stimulus weak: an economy that imports a large share of every extra dollar is sending part of its own stimulus to other countries' producers at every round.`,
    examMatters: `Where a question names four propensities and asks for the effect on the multiplier, it usually only needs three of them. Add the withdrawal propensities and the answer follows in one step.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each marginal propensity by what it does to a dollar of extra income:',
      groups: [
        { name: 'Keeps the dollar in the domestic circuit', items: ['Marginal propensity to consume'], why: 'Spending on domestic output is somebody else\'s income here, so this is the only one that survives into the next round.' },
        { name: 'Removes the dollar from the circuit', items: ['Marginal propensity to save', 'Marginal propensity to tax', 'Marginal propensity to import'], why: 'Each of these three is a withdrawal, and together they are the marginal propensity to withdraw.' },
      ],
    }),
  };
})();

const calculatingMultiplier = (() => {
  const sid = subId('calculating-multiplier');
  return {
    id: sid,
    title: 'Calculating the Multiplier',
    keyIdea: 'The specification gives two formulae and they are the same formula, because the four propensities add to one.',
    body: [
      { type: 'paragraph', text: `4 · c asks for **calculations of the multiplier using the formula 1/(1−MPC) and 1/MPW, where MPW = MPS + MPT + MPM**. Two formulae, and the first question is when to use which.` },
      { type: 'paragraph', text: `The answer is that they give the same number. Every dollar of extra income is consumed domestically, saved, taxed or imported and there is nowhere else for it to go, so MPC + MPS + MPT + MPM = 1. Rearranged, that says **MPW = 1 − MPC**, and the two formulae are the same fraction written two ways.` },
      { type: 'paragraph', text: `In ${E.country}: MPC ${prop(E.mpc)}, so 1/(1 − ${prop(E.mpc)}) = 1/${prop(1 - E.mpc)} = **${mult(E.kFromMpc)}**. And MPW = ${prop(E.mps)} + ${prop(E.mpt)} + ${prop(E.mpm)} = ${prop(E.mpw)}, so 1/${prop(E.mpw)} = **${mult(E.kFromMpw)}**. Use whichever the data gives you.` },
      { type: 'paragraph', text: `Then apply it: **change in national income = the multiplier × the change in injections.** ${mult(E.k)} × ${bn(E.shock)} = ${bn(E.deltaY)}, which takes ${E.country} from ${bn(E.Y)} to ${bn(E.Y2)}. The same step runs in reverse for a withdrawal: ${bn(E.importShock)} more spent on imports gives ${mult(E.k)} × ${bn(-E.importShock)} = ${bn(E.importDeltaY)}, and national income falls to ${bn(E.Yimport)}.` },
    ],
    realExample: { emoji: '🧮', text: `${E.country}'s finance ministry is handed MPS ${prop(E.mps)}, MPT ${prop(E.mpt)} and MPM ${prop(E.mpm)} and no MPC at all. Adding the three gives ${prop(E.mpw)}, and the multiplier follows in one division.` },
    misconception: `Students use 1/(1−MPC) with an MPC that already excludes tax and imports, and get a multiplier far too large. The check takes one line: if the four propensities you have been given do not add to one, they are not all measured out of national income, and the two formulae will not agree.`,
    examMatters: `Appendix 6 defines Calculate as a calculation based on given data, with workings shown. Write the formula, substitute the figures, then give the number — the substitution line is where the method mark sits when the arithmetic slips.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'An economy has MPS 0.15, MPT 0.25 and MPM 0.10. An extra $80bn is injected. Complete the calculation:',
      template: [
        'MPW = ___',
        'The multiplier is ___',
        'National income rises by $___bn',
      ],
      answers: ['0.5', '2', '160'],
      hints: [
        'add the three propensities the question gives you',
        'one divided by the figure above',
        'apply the multiplier to the injection in the question',
      ],
      distractors: ['0.75', '4', '40'],
    }),
  };
})();

const multiplierRatio = (() => {
  const sid = subId('multiplier-ratio');
  return {
    id: sid,
    title: 'The Multiplier as a Ratio',
    keyIdea: 'The multiplier is also a ratio measured after the fact: the change in real income over the change in injections. That direction recovers the propensities from data.',
    body: [
      { type: 'paragraph', text: `The formulae go from the propensities to the multiplier. The paper also goes the other way, and it is the direction data questions use, because a statistics office can observe incomes and injections and cannot observe a propensity.` },
      { type: 'paragraph', text: `**The multiplier is the change in real national income divided by the change in injections.** Both directions describe the same number; one predicts it and one measures it.` },
      { type: 'paragraph', text: `A different economy raises exports by ${bn(E.otherDeltaJ)} and its real national income rises by ${bn(E.otherDeltaY)}. The multiplier is ${bn(E.otherDeltaY)} ÷ ${bn(E.otherDeltaJ)} = **${mult(E.otherK)}**. From there the propensities follow: if k = 1/MPW then MPW = 1/k = **${prop(E.otherMpw)}**, and since MPW = 1 − MPC, MPC = **${prop(E.otherMpc)}**.` },
      { type: 'paragraph', text: `That is a genuinely different economy from ${E.country}, and the contrast is the point. A multiplier of ${mult(E.otherK)} against ${mult(E.k)} means less than half as much of each dollar leaks away at each round — and the two economies get very different results from identical stimulus.` },
    ],
    realExample: { emoji: '📊', text: `An economy's exports rise ${bn(E.otherDeltaJ)} and its real national income ${bn(E.otherDeltaY)}. Nobody measured a propensity; the ratio of the two observed changes gives the multiplier directly.` },
    misconception: `Students divide by the wrong figure and get the reciprocal. The multiplier is always greater than one, so a result below one is a division the wrong way round. Change in income on top; change in injections underneath.`,
    examMatters: `A data question that gives two changes and asks for the multiplier wants the division and the interpretation. Then go one step further and recover MPW: it is usually the next part of the question.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'An economy raises government expenditure by $50bn and real national income rises by $150bn. Complete the analysis:',
      template: [
        'The multiplier is ___',
        'MPW is therefore ___ (to two decimal places)',
        'And the marginal propensity to consume is ___ (to two decimal places)',
      ],
      answers: ['3', '0.33', '0.67'],
      hints: [
        'divide the rise in income by the rise in injections',
        'the reciprocal of the figure above',
        'what is left of a dollar once the withdrawals have gone',
      ],
      distractors: ['1.5', '0.50', '0.30'],
    }),
  };
})();

/* ══ Block 6 — The Multiplier, AD and Economic Activity (2.3.4 · 4d) ═════ */

const multipliedShiftOfAd = (() => {
  const sid = subId('multiplied-shift-of-ad');
  return {
    id: sid,
    title: 'The Multiplied Shift of AD',
    keyIdea: 'An injection does not shift AD by its own size. It shifts AD by the injection times the multiplier, and that is what makes the multiplier matter on a diagram.',
    body: [
      { type: 'paragraph', text: `4 · d asks for **the significance of the multiplier for shifts in AD and the level of economic activity**, and the first half of that is a fact about the diagram that is easy to draw wrong.` },
      { type: 'paragraph', text: `${E.country}'s government spends an extra ${bn(E.shock)}. **AD does not shift right by ${bn(E.shock)}. It shifts right by ${bn(E.deltaY)}** — the injection times the multiplier — because the rounds of extra spending all happen at every price level, not only at the original one.` },
      { type: 'paragraph', text: `That is the whole of the multiplier's significance for AD: it is the reason the horizontal distance between AD and AD₁ is bigger than the policy that caused it. A government that budgets ${bn(E.shock)} is moving the curve ${mult(E.k)} times as far as the budget line suggests.` },
      { type: 'paragraph', text: `And it works in both directions, which is the half students forget. A ${bn(E.importShock)} rise in imports shifts AD **left** by ${bn(Math.abs(E.importDeltaY))}, not by ${bn(E.importShock)}. The multiplier makes a withdrawal hurt more than its size, exactly as it makes an injection help more than its size.` },
    ],
    realExample: { emoji: '↔️', text: `On ${E.country}'s diagram, a ${bn(E.shock)} budget line moves the AD curve ${bn(E.deltaY)} to the right. The gap between the two figures is the multiplier, drawn.` },
    misconception: `Students shift AD right by the size of the injection. The shift is the multiplied amount, and measuring it as the injection understates the effect by a factor of the multiplier — here, by ${bn(E.deltaY - E.shock)}.`,
    examMatters: `Where a Draw question gives an injection and the propensities, it is asking for the multiplied shift. Calculate the multiplier first and label the horizontal distance with the answer (Appendix 6, Draw).`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'An economy has MPW 0.25. Its government cuts spending by $30bn. Complete the effect on the AD curve:',
      template: [
        'The multiplier is ___',
        'AD shifts to the ___',
        'The horizontal shift is $___bn',
      ],
      answers: ['4', 'left', '120'],
      hints: [
        'one divided by the propensity in the question',
        'the direction a fall in an injection moves the curve',
        'the injection multiplied, not the injection itself',
      ],
      distractors: ['right', '30', '0.25'],
    }),
  };
})();

const howMuchBecomesOutput = (() => {
  const sid = subId('how-much-becomes-output');
  return {
    id: sid,
    title: 'How Much of It Becomes Output',
    keyIdea: 'The multiplied shift is how far AD moves. How much of it arrives as real output rather than as a higher price level is decided by the AS curve it meets.',
    body: [
      { type: 'paragraph', text: `The second half of 4 · d is **the level of economic activity**, and the honest answer is that the multiplier alone does not determine it. The multiplier says how far AD moves; where output ends up depends on what AD meets.` },
      { type: 'paragraph', text: `Three cases, all from ${E.country}'s ${bn(E.deltaY)} shift. **Where the economy is producing well below capacity**, AS is close to flat, and almost the whole shift arrives as output: real output ${bn(E.Ykeynes)} with the price level still at ${idx(E.Pkeynes)}. **Where AS slopes upward**, the shift splits: output ${bn(E.Yad)} and the price level ${idx(E.Pad)}. **Where the economy is already at capacity**, AS is vertical, output cannot rise at all, and the whole shift becomes a price level of ${idx(E.Pclassical)}.` },
      { type: 'paragraph', text: `Same injection, same multiplier, same ${bn(E.deltaY)} shift — and real output rises by ${bn(E.deltaY)}, by ${bn(E.Yad - E.Y)} or by nothing at all. The two AS shapes behind the first and third cases are the Keynesian and classical curves of 2.3.3 · 3a.` },
      { type: 'paragraph', text: `**This is the evaluation point that turns a good answer into a top one.** A government told its multiplier is ${mult(E.k)} still cannot say what its spending will do to output until it knows where the economy is relative to its capacity.` },
    ],
    realExample: { emoji: '🧱', text: `The same ${bn(E.shock)} port programme in ${E.country} would deliver ${bn(E.deltaY)} of extra output in a deep downturn and almost none in a year when every construction firm is already fully booked.` },
    misconception: `Students calculate the multiplier and report the answer as the rise in real output. It is the rise in the AD curve's position, and it becomes real output only where there is capacity to produce more. In a fully stretched economy the same calculation predicts inflation.`,
    examMatters: `An Examine or Evaluate question about a stimulus is asking for this. The multiplier is the analysis; where the economy sits against its capacity is the judgement, and it is what separates the top level from the one below it.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'One rightward AD shift meets three different AS curves. Match each to what the economy gets:',
      pairs: [
        { left: 'AS close to flat, well below capacity', right: 'Almost all of the shift becomes real output', why: 'There is idle capacity, so extra demand is met by producing more rather than by charging more.' },
        { left: 'AS sloping upward', right: 'The shift splits between output and the price level', why: 'Getting more out of the economy costs more per unit, so some of the extra spending is absorbed by price.' },
        { left: 'AS vertical, at capacity', right: 'None of the shift becomes real output', why: 'Nothing more can be produced, so the whole of the extra spending arrives as a higher price level.' },
      ],
    }),
  };
})();

const sizeOfTheMultiplier = (() => {
  const sid = subId('size-of-the-multiplier');
  return {
    id: sid,
    title: 'Why the Multiplier Is Not a Fixed Number',
    keyIdea: 'The multiplier is one over the fraction of each dollar that leaves the circuit, so anything moving that fraction moves the multiplier — including the policy using it.',
    body: [
      { type: 'paragraph', text: `The multiplier looks like a constant because it is written as one. It is not. **It is ${mult(E.k)} in ${E.country} because MPW is ${prop(E.mpw)} there**, and every one of the three propensities behind that figure can move.` },
      { type: 'paragraph', text: `**A larger multiplier** comes from a smaller MPW: an economy that imports little, taxes lightly or saves little keeps more of each round. **A smaller multiplier** comes from the reverse — and one that imports most of what it consumes can be barely above one, because most of each round is spent abroad.` },
      { type: 'paragraph', text: `The consequence for policy is sharper than it first looks. A government that raises income tax to pay for extra spending has raised MPT, which has shrunk the multiplier on the very spending it is financing. The two halves of the budget work against each other, and the net effect is smaller than either half taken alone.` },
      { type: 'paragraph', text: `So the multiplier is an estimate, not a constant a country possesses. **Its size is why two governments spending the same amount get different results**, and saying so — with the propensity that differs — is what a question about the significance of the multiplier is asking for.` },
    ],
    realExample: { emoji: '🌍', text: `A small island economy importing most of its consumer goods and a large economy producing its own get very different returns from the same stimulus, because most of the island's rounds leave at the first step.` },
    misconception: `Students treat the multiplier as a fixed property of a country, quoted once and reused. It is one over MPW, and MPW moves with tax rates, savings habits and how much extra spending goes abroad. A multiplier measured in one year is evidence about that year.`,
    examMatters: `Where a question asks about the significance of the multiplier, the size is the answer and the propensities are the reason. Naming which propensity makes this economy's multiplier large or small is worth more than a general statement that multipliers vary.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each change by what it does to the size of an economy\'s multiplier:',
      groups: [
        { name: 'Makes the multiplier larger', items: ['Households save a smaller share of extra income', 'A larger share of extra spending goes to domestic producers'], why: 'Each of these lowers the fraction leaving the circuit at every round, so more survives and the total is bigger.' },
        { name: 'Makes the multiplier smaller', items: ['The rate of income tax rises', 'Households buy more of their goods from abroad', 'Households save a larger share of extra income'], why: 'Each of these raises the marginal propensity to withdraw, and the multiplier is one over that figure.' },
      ],
    }),
  };
})();

/* ══ The block plan ══════════════════════════════════════════════════════ */

const BLOCK_PLAN = [
  {
    title: B1,
    subs: [circularFlow, incomeOutputExpenditure, incomeAndWealth],
    takeaway: [
      'Two flows, running opposite ways round one circuit: things one way, money the other.',
      'Income, output and expenditure are one number counted at three points.',
      'Income is a flow over a period; wealth is a stock on a date.',
    ],
  },
  {
    title: B2,
    subs: [injectionsWithdrawals, investment, governmentExpenditure, exports],
    takeaway: [
      'An injection enters the circuit from outside; a withdrawal is income that leaves it.',
      'Investment, government expenditure and exports are the three injections.',
      'Sort by direction, never by who is doing the spending.',
      'Government spending that buys no output is not part of G.',
    ],
  },
  {
    title: B3,
    subs: [savings, taxation, imports, netInjectionsWithdrawals],
    takeaway: [
      'Savings, taxation and imports are the three withdrawals.',
      'Imports are a withdrawal because the spending paid foreign producers, not because it was wasted.',
      'Only the gap between the two totals moves national income.',
      'A net injection grows the flow; a net withdrawal shrinks it.',
    ],
  },
  {
    title: B4,
    subs: [equilibriumConcept, equilibriumOnAdAs, shiftsInAd, shiftsInAs],
    takeaway: [
      'Equilibrium is where injections equal withdrawals: no tendency to change, and no promise of good.',
      'The same point on AD/AS axes: price level vertical, real national output horizontal.',
      'An AD shift moves output and the price level the same way.',
      'An AS shift moves them opposite ways, which is how you tell which curve moved.',
    ],
  },
  {
    title: B5,
    subs: [multiplierProcess, mpcMps, mptMpm, calculatingMultiplier, multiplierRatio],
    takeaway: [
      'An injection is spent again and again, in rounds that shrink to nothing.',
      'MPC keeps a dollar in the circuit; MPS, MPT and MPM take it out.',
      'MPW = MPS + MPT + MPM = 1 − MPC, which is why both formulae give one number.',
      'Measured after the fact, the multiplier is the change in income over the change in injections.',
    ],
  },
  {
    title: B6,
    subs: [multipliedShiftOfAd, howMuchBecomesOutput, sizeOfTheMultiplier],
    takeaway: [
      'AD shifts by the injection times the multiplier, not by the injection.',
      'How much of the shift becomes output is decided by the AS curve it meets.',
      'The multiplier is one over MPW, and every propensity behind it can move.',
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
 * THE LEAF MAP, BY HAND. 19 leaves at `econ_spec.txt:1056-1082`, every one named against the
 * subsection that teaches it. `3b` is ONE oracle row and `specThin-01`/`-02` split it into an AD
 * half and an AS half; both subsections are listed against it. `4b-1` to `4b-4` are four rows and
 * two subsections, because MPC and MPS belong together and MPT and MPM belong together.
 */
export const LEAF_MAP = {
  'ECON-2.3.4-1a': ['circular-flow', 'income-output-expenditure'],
  'ECON-2.3.4-1b': ['income-and-wealth'],
  'ECON-2.3.4-2a': ['injections-withdrawals'],
  'ECON-2.3.4-2b-1': ['investment'],
  'ECON-2.3.4-2b-2': ['government-expenditure'],
  'ECON-2.3.4-2b-3': ['exports'],
  'ECON-2.3.4-2c-1': ['savings'],
  'ECON-2.3.4-2c-2': ['taxation'],
  'ECON-2.3.4-2c-3': ['imports'],
  'ECON-2.3.4-2d': ['net-injections-withdrawals'],
  'ECON-2.3.4-3a': ['equilibrium-concept', 'equilibrium-on-ad-as'],
  'ECON-2.3.4-3b': ['shifts-in-ad', 'shifts-in-as'],
  'ECON-2.3.4-4a': ['multiplier-process'],
  'ECON-2.3.4-4b-1': ['mpc-mps'],
  'ECON-2.3.4-4b-2': ['mpc-mps'],
  'ECON-2.3.4-4b-3': ['mpt-mpm'],
  'ECON-2.3.4-4b-4': ['mpt-mpm'],
  'ECON-2.3.4-4c': ['calculating-multiplier', 'multiplier-ratio'],
  'ECON-2.3.4-4d': ['multiplied-shift-of-ad', 'how-much-becomes-output', 'size-of-the-multiplier'],
};

/* ══ Notes ═══════════════════════════════════════════════════════════════ */
/*
 * ONE NOTES TOPIC PER CHAPTER, IN THE SAME ORDER, GENERATED FROM THE SAME MODULE, so the two
 * surfaces cannot diverge. `depth.notes-titles` wants every notes title taught in Learn Mode; making
 * the titles BE the block titles satisfies it by construction.
 *
 * A WARNING FOR VERIFY B: notes ship in the server-rendered page from the `data` column, so a
 * `?draft=1` walk shows these only after publication (DECISIONS, 16 September). Verify them against
 * the `draft` column, not against the page.
 */

const def = (html) => ({ type: 'definition', text: html });
const mech = (html) => ({ type: 'mechanism', text: html });
const link = (html) => ({ type: 'link', text: html });

export const NOTES = [
  {
    title: B1,
    meta: '2.3.4 · 1a, 1b',
    keyIdea: 'One circuit, two flows running opposite ways, and the difference between a flow and a stock.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Circular flow of income</strong> — the model of households and firms joined by a real flow and a money flow running in opposite directions.'),
        def('<strong>National income</strong> — the value of the flow over a period; the same figure as national output and national expenditure.'),
        def('<strong>Income</strong> — a flow, measured over a period of time.'),
        def('<strong>Wealth</strong> — a stock, measured at a point in time; what income that was not spent has accumulated into.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`${E.country}'s circuit turns over ${bn(E.Y)} a year, whichever of the three points it is measured at.`),
        mech('Real flow: factors of production one way, goods and services the other. Money flow: factor incomes one way, consumer spending the other.'),
        link('Only income moves round the circuit. Wealth is the reservoir beside it, filled by what is not spent.'),
      ] },
    ],
    takeaway: [
      'Four arrows on the diagram, not two.',
      'Income, output and expenditure are one number.',
      'A flow needs a period; a stock needs a date.',
    ],
  },
  {
    title: B2,
    meta: '2.3.4 · 2a, 2b',
    keyIdea: 'What an injection is, the three the specification names, and the one category of public spending that is not one.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Injection</strong> — spending on domestic output that did not come from domestic household income.'),
        ...INJECTIONS.map(([n, s, d]) => def(`<strong>${n} (${s})</strong> — ${d}`)),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`${E.country}: investment ${bn(E.I)} + government expenditure ${bn(E.G)} + exports ${bn(E.X)} = ${bn(E.J)}.`),
        mech('Sort by direction, not by who is spending. A government both injects and withdraws, in the same budget.'),
        link('Payments that buy no goods or services are not part of G at the point they are paid; they enter the circuit when the household spends them.'),
      ] },
    ],
    takeaway: [
      'I, G and X go in.',
      'Investment means new capital goods, not buying shares.',
      'An export is where the output was made, not where the buyer stood.',
    ],
  },
  {
    title: B3,
    meta: '2.3.4 · 2c, 2d',
    keyIdea: 'The three withdrawals, and why only the gap between the two totals moves national income.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Withdrawal</strong> — income received by households that does not return to domestic firms as spending.'),
        ...WITHDRAWALS.map(([n, s, d]) => def(`<strong>${n} (${s})</strong> — ${d}`)),
        def('<strong>Net injection</strong> — injections above withdrawals; the flow grows. <strong>Net withdrawal</strong> is the reverse.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`${E.country}: savings ${bn(E.S)} + taxation ${bn(E.T)} + imports ${bn(E.M)} = ${bn(E.W)}, which equals injections, so nothing is pushing.`),
        mech('All three withdrawals rise with income. That is what makes any gap close itself.'),
        link('Two arrows can both move and leave the totals untouched. Compare the totals, not the arrows.'),
      ] },
    ],
    takeaway: [
      'S, T and M come out.',
      'Imports are a withdrawal because the wages were paid abroad.',
      'Only the net position moves the flow.',
    ],
  },
  {
    title: B4,
    meta: '2.3.4 · 3a, 3b',
    keyIdea: 'Equilibrium as a condition rather than an achievement, and the two-axis diagram that shows what a shift does to prices as well as to output.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Equilibrium real national output</strong> — the level with no tendency to change: injections equal withdrawals, and AD crosses AS.'),
        def('<strong>Aggregate demand</strong> — total planned spending on domestic output at each price level.'),
        def('<strong>Aggregate supply</strong> — total planned output at each price level.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`${E.country} crosses at real output ${bn(E.Y)} and a price level of ${idx(E.P0)}. Axes: price level vertical, real national output horizontal.`),
        mech(`A rise in an injection shifts AD right: output ${bn(E.Yad)} and the price level ${idx(E.Pad)} — both up.`),
        mech(`Cheaper imported machinery shifts AS right: output ${bn(E.Yas)} and the price level ${idx(E.Pas)} — opposite ways.`),
        link('Given the two directions, the curve that moved is determined. Same way means AD; opposite ways means AS.'),
      ] },
    ],
    takeaway: [
      'Equilibrium is J = W, and an economy can be stuck there.',
      'Label the axes before drawing anything.',
      'Two directions identify the curve.',
    ],
  },
  {
    title: B5,
    meta: '2.3.4 · 4a, 4b, 4c',
    keyIdea: 'Where the multiplier comes from, the four propensities behind it, and why the specification\'s two formulae are one formula.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>The multiplier</strong> — the number of times an injection raises national income by more than itself.'),
        ...PROPENSITIES.map(([abbr, full, , what]) => def(`<strong>${abbr}</strong> — the ${full}: the fraction of extra national income ${what}.`)),
        def('<strong>MPW</strong> — the marginal propensity to withdraw: MPS + MPT + MPM.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`${E.country}: MPC ${prop(E.mpc)} + MPS ${prop(E.mps)} + MPT ${prop(E.mpt)} + MPM ${prop(E.mpm)} = 1.00, so MPW = ${prop(E.mpw)} = 1 − MPC.`),
        mech(`1/(1 − ${prop(E.mpc)}) = ${mult(E.kFromMpc)} and 1/${prop(E.mpw)} = ${mult(E.kFromMpw)}. The same number, twice.`),
        mech(`Rounds from ${bn(E.shock)}: ${E.ROUNDS.slice(0, 5).map((r) => bn(r)).join(' → ')} … totalling ${bn(E.deltaY)}.`),
        link(`Measured the other way: ${bn(E.otherDeltaY)} of extra income from ${bn(E.otherDeltaJ)} of extra exports is a multiplier of ${mult(E.otherK)}.`),
      ] },
    ],
    takeaway: [
      'If the four propensities do not sum to one, they are not all out of national income.',
      'Write the formula, substitute, then answer.',
      'The multiplier is always greater than one.',
    ],
  },
  {
    title: B6,
    meta: '2.3.4 · 4d',
    keyIdea: 'What the multiplier does to a diagram, what decides how much of it becomes output, and why the number is not a constant.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>The multiplied shift</strong> — the horizontal distance AD moves: the change in injections times the multiplier.'),
        def('<strong>The level of economic activity</strong> — how much of that shift arrives as real output rather than as a higher price level.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`${bn(E.shock)} of extra government spending shifts AD right by ${bn(E.deltaY)}, not by ${bn(E.shock)}.`),
        mech(`Below capacity it all becomes output (${bn(E.Ykeynes)}); on an upward-sloping AS it splits (${bn(E.Yad)} and price level ${idx(E.Pad)}); at capacity none of it does (price level ${idx(E.Pclassical)}).`),
        link(`k = 1/MPW, so a rise in the income tax rate shrinks the multiplier on the spending that tax is financing.`),
      ] },
    ],
    takeaway: [
      'Shift AD by the multiplied amount.',
      'Say where the economy sits against its capacity before predicting output.',
      'Name the propensity that makes this economy\'s multiplier what it is.',
    ],
  },
];
