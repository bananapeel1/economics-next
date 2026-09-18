/**
 * PACKET 37 — national-income assessment: the quiz bank, the practice items, the flashcards, the
 * common mistakes and the extras.
 *
 * ── THE BANK IS REBUILT, NOT EDITED, AND TEN ITEMS ARE GONE ────────────────
 *
 * `topFix-01`, `quiz-03` and `structure-05` are one measurement: **10 of the live bank's 24 MCQs
 * test GDP measurement** — the income and output methods, net national income, purchasing power
 * parities, real against nominal, GDP per capita and stock against flow — and this section teaches
 * none of it. The pre-test draws three items at random from that bank, so a student could open
 * chapter one and be asked three questions about a topic the section never mentions. That is a
 * plausible contributor to the "pre-test demotivates" feedback and it is measurable in the funnel.
 *
 * `topFix-01` says to MOVE them to "2.1.1". There is no 2.1.1 in this specification. The owner is
 * **2.3.1** (`econ_spec.txt:884-910`), `measures-economic-performance`, and **packet 21 has already
 * rebuilt that section's bank from scratch**, so there is nothing to move them into. They are
 * removed, and the runner bans the whole vocabulary family so they cannot come back.
 *
 * ── THE PINS ARE DERIVED, WHICH IS `quiz-04`, `quiz-05` AND `structure-04` ─
 *
 * Those three are one defect with three faces: block 2's inline quiz was a multiplier calculation
 * two chapters before the multiplier is taught, block 3's was the second multiplier calculation,
 * block 4 — the multiplier chapter — got the easiest classification item in the bank, and quiz[2]
 * and quiz[5] were never shown at all because the resolver takes the first unused index. Hand-
 * mapping the indices, which is what `topFix-01` asks for, would fix this instance. **Tagging each
 * item with its own block and deriving the indices makes it unrepresentable**, and the runner
 * asserts every block has at least one quiz item, at least one practice item and a diagram.
 *
 * ── THE PRACTICE SET IS REPLACED, BECAUSE FIVE OF FIVE WERE DEFECTIVE ──────
 *
 * Appendix 6 (`econ_spec.txt:2696-2745`) is the whole IAL Economics taxonomy: Define 2, Calculate
 * 2 or 4, Draw 4, Explain 4, Analyse 6, Examine 8, Discuss 14, Evaluate 20. The live set has
 * "Define (4)" — wrong tariff; "Explain two reasons … (6 marks)" — wrong tariff AND 2.3.1's topic,
 * which is `practice-01`; "Assess … (10 marks)" — a command word and a tariff that do not exist
 * here; "Evaluate … GDP as a measure of economic well-being (20)" — right shape, 2.3.1's topic;
 * and "Outline … (4 marks)" — not a command word in either specification. `topFix-05` asks for the
 * Assess guidance to be CONVERTED to levels descriptors; the item is removed instead, because
 * converting it would leave a question no IAL paper can ask.
 *
 * `practice-02` is that no practice item needs a diagram or a multiplier calculation from given
 * propensities, "the two most common ways IAL Unit 2 tests this topic". Both exist here: the Draw
 * item is the AD/AS shift and the 4-mark Calculate hands over MPS, MPT and MPM and no MPC.
 */
import {
  SECTION, id, hash8, ECON, bn, prop, mult, idx, pct, round1,
} from './_packet37-util.mjs';
import { B1, B2, B3, B4, B5, B6 } from './_packet37-content.mjs';

const E = ECON;

/* ══ Quiz ════════════════════════════════════════════════════════════════ */

/** An item, authored KEY FIRST. `block` is null for the three pre-test items. */
const qi = (block, question, options, explanation) => ({
  id: id('quiz', question), block, question, options, explanation,
});

/*
 * EVERY ITEM IS AUTHORED WITH ITS KEY FIRST AND THE KEY IS THEN DEALT INTO A POSITION, by ranking
 * the items on a hash of their own stem (packet 36). The live bank carries `quiz.histogram`, which
 * is what hand-picked positions produce.
 *
 * AND NO EXPLANATION MAY NAME A POSITION. Packet 26's decision and packet 36's round-1 rejection are
 * the same defect: an explanation that says "the last figure" or "the first option" describes the
 * author's draft, not the rendered order, because the dealing moves the key. Every explanation
 * below names an option by its CONTENT, and the runner refuses any ordinal in a quiz explanation.
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
   * ALL THREE ARE ANSWERABLE FROM CHAPTER ONE, which every student reaches before anything else.
   * That is the whole of `structure-05`: a pre-test may only ask what the section will teach, and
   * the safest guarantee of that is to draw it from the chapter the student is about to read.
   */
  qi(null, 'In the circular flow of income, the money flow runs:',
    ['in the opposite direction to the real flow', 'in the same direction as the real flow', 'only from firms to households', 'only when the government is included'],
    'Every payment goes the other way to the thing it pays for: households supply factors and receive incomes, firms supply goods and receive spending. Drawing both flows the same way leaves the circuit with no return leg, and drawing only one direction is not a circular flow at all.'),
  qi(null, 'Which statement about income and wealth is correct?',
    ['Income is a flow and wealth is a stock', 'Both income and wealth are flows', 'Income is a stock and wealth is a flow', 'Both income and wealth are stocks'],
    'Income needs a period attached to mean anything and wealth needs a date, which is the whole distinction. A household can hold a large stock of accumulated assets and receive very little each month, and the reverse happens just as often.'),
  qi(null, 'National income, national output and national expenditure are:',
    ['the same figure measured at three points on one circuit', 'three separate figures that usually differ a little', 'three ways of measuring only the government sector', 'the same figure only in a closed economy'],
    'The circuit closes, so the value produced, the incomes paid to produce it and the spending that buys it are one flow counted three times. It is an identity rather than a tendency, and it holds whether or not there is trade with other countries.'),

  /* ── Block 1 · National Income ─────────────────────────────────────────── */
  qi(B1, 'Which of these belongs to the real flow rather than the money flow?',
    ['Labour supplied by a household to a firm', 'Wages paid by a firm to a household', 'A household paying for a refrigerator', 'Rent paid to the owner of a warehouse'],
    'The real flow is the things themselves moving — factors one way, goods and services the other. Anything that is a payment belongs to the money flow, whichever direction it travels in.'),
  qi(B1, 'A household earns $40,000 a year and owns assets valued at $260,000. Its wealth is:',
    ['$260,000, because wealth is what is owned on a date', '$40,000, because wealth is what is earned', '$300,000, because the two are added together', '$220,000, because income is subtracted from assets'],
    'Wealth is the value of what is owned at a point in time and income is what arrives over a period. They are measured in different dimensions, so adding them or subtracting one from the other produces a figure that means nothing.'),
  qi(B1, 'Profit is what makes national income exactly equal to national output because it is:',
    ['the residue left after the other factors have been paid', 'the only factor income that is taxed', 'added to output to make the two figures match', 'measured over a period rather than on a date'],
    'The owners receive the residue, so there is nothing left over for the two counts to differ by. If profit were a fixed charge like a wage, the equality would only hold by coincidence.'),
  qi(B1, 'An economy in which households save some of their income still has income equal to output because:',
    ['saving is income that has been earned, whether or not it is spent', 'saving is counted as a kind of output', 'saved income is added back in at the end of the year', 'the equality only holds when savings are zero'],
    'The equality is between the value produced and the incomes paid to produce it, and a dollar that is saved was paid out all the same. What saving changes is the spending leg of the circuit, which is the next chapter\'s question rather than this one.'),

  /* ── Block 2 · Injections into the Flow ────────────────────────────────── */
  qi(B2, 'Which of these is an injection into the circular flow?',
    ['A foreign buyer paying for domestically produced food', 'A household buying an imported machine', 'A household saving part of its salary', 'Income tax deducted from a wage'],
    'An injection is spending on domestic output that did not come from domestic household income, and payment from abroad is exactly that. The other three each take income out of the circuit rather than putting spending into it.'),
  qi(B2, 'A firm buys shares in another company. In the circular flow this is:',
    ['not investment, because no new capital goods were produced', 'investment, because the firm spent money', 'investment, because the shares may rise in value', 'a withdrawal, because the money left the firm'],
    'Investment in this model is spending on newly produced capital goods. Buying a share transfers ownership of something that already exists, so nothing was produced and nobody was paid to produce it.'),
  qi(B2, 'A government pays a monthly pension directly to retired households. In the circular flow this payment is:',
    ['not part of government expenditure, because it buys no output', 'part of government expenditure, because the government paid it', 'a withdrawal, because the government spent the money', 'an injection equal to twice its value, because it is spent again'],
    'Government expenditure in this model is spending on goods and services. A payment that buys no output would be counted twice if it were included here — once when it is paid and again when the household spends it.'),
  qi(B2, 'A visitor from another country pays for a week in a domestic hotel. This is:',
    ['an export, because foreign income bought domestic output', 'not an export, because nothing left the country', 'an import, because the visitor came from abroad', 'neither, because services are not counted'],
    'The test is where the output was produced and whose income paid for it, not whether anything was shipped. A hotel room sold to a foreign visitor is domestic output bought with income earned abroad.'),
  qi(B2, `${E.country} has investment of ${bn(E.I)}, government expenditure of ${bn(E.G)} and exports of ${bn(E.X)}. Total injections are:`,
    [bn(E.J), bn(E.I + E.G), bn(E.Y), bn(E.G + E.X)],
    `Injections are the three added together, which comes to ${bn(E.J)}. Leaving exports out gives ${bn(E.I + E.G)} and leaving investment out gives ${bn(E.G + E.X)}; the largest figure offered is national income itself, which is the flow the injections enter rather than the injections.`),

  /* ── Block 3 · Withdrawals and the Net Position ────────────────────────── */
  qi(B3, 'Imports are a withdrawal from the circular flow because:',
    ['the spending paid producers in another economy', 'the household did not spend the money', 'imported goods are not useful to the economy', 'the government taxes them'],
    'The household did spend it, which is what catches students out. Where it went is the point: those wages were paid in another country\'s circuit, so as far as domestic national income is concerned the dollar has gone.'),
  qi(B3, 'Taxation and government expenditure are counted as two separate arrows rather than one net figure because:',
    ['they are different sizes and are decided separately', 'taxation is always larger than government expenditure', 'only one of them affects national income', 'government expenditure is not really an injection'],
    'Netting them off would hide the comparison the model exists to make. Either can be the larger, and which one it is helps decide where national income settles.'),
  qi(B3, `An economy has injections of ${bn(240)} and withdrawals of ${bn(200)}. In the next period national income will:`,
    ['rise, because there is a net injection', 'fall, because withdrawals are positive', 'stay the same, because both are positive', 'rise by exactly the size of the injections'],
    `More is entering the circuit than leaving it, so the flow grows. It does not grow by ${bn(240)}: what matters is the gap of ${bn(40)}, and the size of the eventual rise is the multiplier's question.`),
  qi(B3, 'Savings rise by $10bn and investment rises by $10bn in the same period. National income will:',
    ['not change, because the two totals are unaffected', 'rise, because investment is an injection', 'fall, because saving is a withdrawal', 'rise by $20bn, because both arrows moved'],
    'One withdrawal and one injection have each risen by the same amount, so the gap between the two totals is exactly where it was. Only the gap moves the flow, which is why an answer that follows one arrow has not finished.'),
  qi(B3, 'Which of these describes a net withdrawal?',
    ['Total withdrawals exceed total injections', 'Imports exceed exports in a single period', 'Taxation exceeds government expenditure in a period', 'Any period in which households save some income'],
    'Net means the two totals compared, not one pair of arrows. A trade deficit or a budget surplus can each sit inside a balanced circuit if the other legs offset them.'),

  /* ── Block 4 · Equilibrium Real National Output ────────────────────────── */
  qi(B4, 'Equilibrium real national output is the level at which:',
    ['injections equal withdrawals, so there is no tendency to change', 'the economy is producing as much as it possibly can', 'unemployment has been eliminated', 'the government budget is balanced'],
    'Equilibrium is a condition with no tendency to change and nothing more. An economy producing far below its capacity, with high unemployment, satisfies it perfectly and will stay there until an injection or a withdrawal moves.'),
  qi(B4, 'The adjustment back to equilibrium works because:',
    ['withdrawals rise with income and injections do not', 'injections fall automatically when income rises', 'the government intervenes whenever the gap appears', 'prices adjust until the gap disappears'],
    'Savings, taxation and imports all grow as income grows, so a rise in income closes the gap that caused it. That is what makes the equilibrium stable rather than a level the economy happens to be passing through.'),
  qi(B4, 'On an AD/AS diagram, the axes are:',
    ['the price level on the vertical and real national output on the horizontal', 'price on the vertical and quantity on the horizontal', 'real national output on the vertical and the price level on the horizontal', 'nominal output on the vertical and time on the horizontal'],
    'The whole economy\'s output is not a quantity of any one good and the general price level is not the price of one. Labelling them as though this were a single market loses the diagram mark before anything is drawn on it.'),
  qi(B4, 'An economy reports rising real output and a falling price level. The curve that moved was:',
    ['AS, shifting right', 'AD, shifting right', 'AD, shifting left', 'AS, shifting left'],
    'Output and the price level moving in opposite directions can only be a supply shift, and more output at a lower price level is the rightward case. A demand shift moves the two the same way, in either direction.'),
  qi(B4, `${E.country}'s government raises spending and the economy moves to real output ${bn(E.Yad)} at a price level of ${idx(E.Pad)}. This shows that:`,
    ['an AD shift raises output and the price level together', 'an AD shift raises output and leaves prices unchanged', 'the AS curve must have shifted as well', 'the multiplier must be less than one'],
    `Both figures have risen from ${bn(E.Y)} and ${idx(E.P0)}, which is the signature of a demand shift meeting an upward-sloping supply curve. Nothing here requires supply to have moved, and a multiplier below one is not possible.`),

  /* ── Block 5 · The Multiplier ──────────────────────────────────────────── */
  qi(B5, 'The multiplier process comes to a finite total because:',
    ['each round is a fixed fraction of the one before it', 'the government stops the process after a set number of rounds', 'households eventually run out of money', 'the injection is repaid at the end'],
    'Part of every dollar received is saved, taxed or spent abroad, so each round is smaller than the last by the same proportion. A series that shrinks by a fixed fraction has a limit, which is why the total is a number rather than an argument.'),
  qi(B5, 'The marginal propensity to consume is the fraction of extra income that is:',
    ['spent on domestically produced goods and services', 'spent on anything at all, including imports', 'left after tax has been deducted', 'saved rather than spent'],
    'The word doing the work is "domestically". Spending that goes abroad does not create income here, so it cannot start the next round, and including it produces a multiplier that is too large.'),
  qi(B5, 'An economy has MPS 0.15, MPT 0.25 and MPM 0.10. Its multiplier is:',
    ['2', '4', '0.5', '2.5'],
    'The three withdrawal propensities add to 0.5, and the multiplier is one divided by that, which is 2. The figure 0.5 is the marginal propensity to withdraw itself rather than the multiplier, and a multiplier can never be below one.'),
  qi(B5, 'The formulae 1/(1−MPC) and 1/MPW give the same answer whenever:',
    ['the four marginal propensities add up to one', 'the economy has no government', 'MPC is measured out of disposable income', 'the multiplier is greater than two'],
    'If every extra dollar is consumed domestically, saved, taxed or imported and there is nowhere else for it to go, then MPW is exactly 1 − MPC. Measuring MPC after tax instead breaks that, and the two formulae then disagree.'),
  qi(B5, 'An economy raises exports by $200bn and its real national income rises by $800bn. Its marginal propensity to withdraw is:',
    ['0.25', '4', '0.75', '0.2'],
    'The multiplier is the rise in income over the rise in injections, which is 4, and the marginal propensity to withdraw is its reciprocal. The figure 4 is the multiplier and 0.75 would be the marginal propensity to consume.'),

  /* ── Block 6 · The Multiplier, AD and Economic Activity ────────────────── */
  qi(B6, `A government raises spending by ${bn(E.shock)} in an economy with a multiplier of ${mult(E.k)}. The AD curve shifts right by:`,
    [bn(E.deltaY), bn(E.shock), bn(E.shock * 2), bn(E.Y)],
    `The rounds of extra spending happen at every price level, so the horizontal shift is the injection multiplied: ${bn(E.shock)} times ${mult(E.k)}. Shifting by the injection alone understates the effect by ${bn(E.deltaY - E.shock)}.`),
  qi(B6, 'An AD curve shifts right in an economy that is already producing at capacity. Real output will:',
    ['not rise, and the price level will rise instead', 'rise by the full size of the shift', 'rise by half the size of the shift', 'fall, because prices have risen'],
    'A vertical supply curve means nothing more can be produced, so the extra spending has nowhere to go except into the price level. The same calculation in an economy with idle capacity would deliver the whole shift as output.'),
  qi(B6, 'Two economies have the same multiplier and receive the same injection, yet real output rises much more in one of them. The likely reason is:',
    ['one has more unused productive capacity than the other', 'one has a larger marginal propensity to consume', 'one measured its multiplier incorrectly', 'one is a closed economy'],
    'The multiplier fixes how far the demand curve moves and the supply side decides how much of that arrives as output. A different propensity to consume would mean a different multiplier, which the question has ruled out.'),
  qi(B6, 'A government raises the rate of income tax to pay for extra spending. The effect on the multiplier is that it:',
    ['falls, because the marginal propensity to tax has risen', 'rises, because government expenditure has risen', 'is unchanged, because the two effects cancel', 'falls to below one'],
    'The multiplier is one over the marginal propensity to withdraw, and a higher tax rate raises that figure. The two halves of the budget work against each other, which is why the net effect is smaller than either half taken alone.'),
  qi(B6, 'A small economy that imports most of what it consumes will have:',
    ['a small multiplier, because most of each round is spent abroad', 'a large multiplier, because imports are cheap', 'a multiplier of exactly one, because trade is balanced', 'no multiplier, because the model needs a closed economy'],
    'A high marginal propensity to import means most of each round leaves before it can create domestic income. The multiplier is still greater than one, because the first round of spending happens at home.'),
]);

/* ══ Practice ════════════════════════════════════════════════════════════ */

/*
 * NINE ITEMS: one for each of Appendix 6's eight command words, plus both Calculate tariffs,
 * because 4c is a calculation leaf and the paper sets it at 2 and at 4.
 *
 * EVERY GUIDANCE IS TWO PARAGRAPHS AND THE FIRST GIVES NOTHING AWAY. `InlinePractice.jsx` prints
 * `guidance.split('\n')[0]` above the empty answer box in guided mode, which is every item except
 * the first and last of the section, so a one-paragraph guidance shows the student the mark scheme
 * before they write. The opening carries no figure, no mark allocation and no answer.
 *
 * AND NOTHING ABOVE 6 MARKS ALLOCATES POINTS. Examine, Discuss and Evaluate are levels-marked, so
 * their mark schemes describe what each level looks like instead of listing "(1 mark)" items.
 */
const pr = (block, command, marks, question, guidance) => ({
  id: id('practice', question), block, command, marks, question, guidance,
});

export const PRACTICE = [
  pr(B1, 'Define', 2, "Define the term 'circular flow of income'. (2 marks)",
    `Two marks means two separate things to say, and the second must not be a rewording of the first. Settle who is in the model before you settle what passes between them.\nThe circular flow of income is the model of an economy in which households supply factors of production to firms and firms supply goods and services to households (1 mark), with money flowing in the opposite direction as factor incomes and consumer spending (1 mark). An answer that names only the two groups, or only "money going round", has given one of the two.`),

  pr(B1, 'Explain', 4, 'Explain why national income, national output and national expenditure are equal. (4 marks)',
    `Appendix 6 says an Explain asking for a reason needs a two-stage chain of reasoning, so plan two linked steps rather than one assertion repeated. Decide first which of the three you will start from, then follow a single unit of value round the circuit to the other two.\nKnowledge and understanding: the three are measures of the same flow taken at different points on the circuit (1 mark). Application: the value of output produced must be paid out to the factors that produced it, as wages, rent, interest and profit, so output equals income (1 mark). Analysis, first stage: that income is then spent on the output, so income equals expenditure (1 mark). Analysis, second stage: profit is the residue after the other factors are paid, which is what makes the equality exact rather than approximate (1 mark). An answer that states the equality without following the value round the circuit has knowledge and no chain.`),

  pr(B2, 'Calculate', 2, `An economy has investment of ${bn(E.I)}, government expenditure of ${bn(E.G)} and exports of ${bn(E.X)}. Calculate total injections into the circular flow. (2 marks)`,
    `Appendix 6 defines Calculate as a calculation based on given data, with workings shown. Decide which of the figures in front of you belong in the calculation before adding anything: a question of this kind is usually testing the classification as much as the arithmetic.\nInjections are investment, government expenditure and exports (1 mark for identifying all three or for showing them added). ${bn(E.I)} + ${bn(E.G)} + ${bn(E.X)} = ${bn(E.J)} (1 mark). Marks are available for the workings line even where the final figure slips, so set the addition out rather than writing the answer alone.`),

  pr(B5, 'Calculate', 4, 'An economy has a marginal propensity to save of 0.15, a marginal propensity to tax of 0.25 and a marginal propensity to import of 0.10. Government expenditure rises by $80bn. Calculate the resulting change in real national income. (4 marks)',
    `Notice which propensity you have not been given, and let that decide which of the two formulae you use. Appendix 6 asks for workings, so write the formula down before substituting anything into it, and check at the end that your multiplier is greater than one.\nStage one: MPW = MPS + MPT + MPM = 0.15 + 0.25 + 0.10 = 0.5 (1 mark). Stage two: the multiplier = 1/MPW = 1/0.5 = 2 (1 mark), and a candidate who writes the formula correctly earns this even if the arithmetic slips. Stage three: change in national income = multiplier × change in injections = 2 × $80bn (1 mark). Stage four: = $160bn (1 mark). The common error is to reach for 1/(1−MPC) with an MPC the question never gave; the three propensities here add to 0.5, so 1 − MPC is 0.5 and the two routes agree.`),

  pr(B4, 'Draw', 4, 'Draw an AD/AS diagram to show the effect on equilibrium real national output of a rise in government expenditure in an economy with spare productive capacity. (4 marks)',
    `Appendix 6 defines Draw as requiring an accurately labelled diagram. Label the axes before you draw either curve, and decide what the phrase describing the economy's productive capacity is telling you about the shape of the supply curve you should draw — it is there for a reason.\nOne mark for the axes: price level on the vertical, real national output on the horizontal. One mark for AD and AS drawn and labelled, with the supply curve shown as close to horizontal because the economy has unused productive capacity. One mark for the rightward shift of AD, labelled AD to AD₁. One mark for the new equilibrium marked, showing real national output higher with the price level little changed. A diagram that shows the shift but never marks the new crossing point has answered half of it.`),

  pr(B3, 'Analyse', 6, 'Analyse the effect of a rise in imports on a country\'s equilibrium real national output. (6 marks)',
    `Appendix 6 asks for depth rather than breadth here, and for a chain of reasoning with a diagram where one helps. One route, followed properly to a conclusion, scores better than three routes named. Decide at the start whether you are explaining the direction, the size, or both, and say so.\nKnowledge: imports are a withdrawal from the circular flow (1 mark). Application: a rise in imports means more income leaving the circuit at every level of income, so withdrawals exceed injections (1 mark). Analysis, first stage: firms sell less than they produce, cut output and pay out less income (1 mark). Analysis, second stage: the fall is larger than the initial rise in imports, because the multiplier works downwards as well as upwards, so a rise in imports of a given size reduces national income by that size times the multiplier (2 marks). Analysis, third stage: on an AD/AS diagram the demand curve shifts left by the multiplied amount, and equilibrium real national output falls (1 mark). A strong answer names the marginal propensity to import as the thing that both causes the shift and shrinks the multiplier that carries it.`),

  pr(B6, 'Examine', 8, 'Examine the significance of the size of the multiplier for a government planning to raise its spending. (8 marks)',
    `Appendix 6 says an Examine needs a chain of reasoning and a brief assessment of the arguments, so leave room at the end for a judgement rather than spending every line on the mechanism. The question is about the size of the multiplier, not about what a multiplier is, and an answer that explains the process without ever discussing magnitude has answered a different question.\nLevel 1 describes the multiplier process with little reference to size. Level 2 explains that the change in national income is the multiplier times the injection, and that the multiplier is one over the marginal propensity to withdraw, so an economy that saves, taxes and imports little gets more from the same spending. Level 3 develops that into the consequences for the plan: a government with a high multiplier needs to spend less to reach a given target, while one in a small open economy may find much of the effect leaks abroad. The brief assessment that lifts an answer to the top of the range weighs the multiplier against what it meets: the size of the multiplier fixes how far aggregate demand moves, and how much of that becomes real output rather than a higher price level depends on how close the economy is to its productive capacity. Noting that financing the spending through higher income tax raises the marginal propensity to tax, and so shrinks the very multiplier being relied on, is the strongest single point available.`),

  pr(B4, 'Discuss', 14, 'Discuss the factors that determine the equilibrium level of real national output in an open economy. (14 marks)',
    `Appendix 6 wants logical and coherent chains of reasoning, different viewpoints and a critical assessment of the evidence. Plan the structure before writing: two or three developed factors with a diagram beat a list of six named ones. Decide early which framework you are arguing in, because the two the specification gives can both answer this and mixing them halfway through costs coherence.\nLevel 1 lists factors with little development. Level 2 explains the equilibrium condition that injections equal withdrawals, and identifies the six components as the things that can move it. Level 3 develops the mechanism: any change in the net position sets off a multiplier process that continues until withdrawals have risen to match injections again, so the size of the eventual change depends on the marginal propensities as well as on the shock. Level 4 brings in the second framework, showing equilibrium where aggregate demand crosses aggregate supply and arguing that the same rightward shift in demand produces very different outcomes for real output depending on how close the economy is to its productive capacity. The critical assessment the top level needs might weigh the reliability of a multiplier estimated from past data, or note that the supply side is itself moving while demand moves, so an observed change in output cannot be attributed to demand alone. Recognising that the two frameworks are the same equilibrium seen on different axes, rather than two competing theories, is the clearest signal of understanding available in this topic.`),

  pr(B6, 'Evaluate', 20, 'Evaluate the view that increasing government expenditure is always an effective way to raise the level of economic activity. (20 marks)',
    `Appendix 6 wants multi-stage chains of reasoning, different viewpoints and informed judgements. The word to argue with is in the question, and it is not "increasing" — it is the claim that this always works. Plan a case for the view and a case against, and decide in advance what your judgement will depend on, so the conclusion follows the argument rather than being appended to it.\nLevel 1 asserts that spending raises output with little support. Level 2 explains the mechanism: government expenditure is an injection, the multiplier process carries it further than its own size, and aggregate demand shifts right by the multiplied amount. Level 3 develops both sides. For the view: the injection creates income in rounds, and in an economy producing well below its capacity almost all of the shift arrives as real output rather than as a higher price level. Against it: at or near capacity the same shift raises the price level and leaves real output where it was; in a small open economy with a high marginal propensity to import much of each round leaks abroad; and if the spending is financed by higher income tax, the marginal propensity to tax rises and the multiplier shrinks. Level 4 reaches a supported judgement. The strongest is conditional rather than absolute: the policy is effective where there is unused productive capacity and the marginal propensity to withdraw is low, and unreliable where either condition fails — which is precisely why "always" cannot be defended. A judgement that also notes the multiplier is an estimate from past data rather than a constant the economy possesses is doing the evaluation the command word asks for.`),
];

/* ══ Flashcards ══════════════════════════════════════════════════════════ */

const fc = (front, back) => ({ id: id('flashcard', front), front, back });

export const FLASHCARDS = [
  fc('What are the two flows in the circular flow of income?', 'The real flow — factors of production to firms, goods and services back to households — and the money flow, running the opposite way as factor incomes and consumer spending.'),
  fc('Why are national income, output and expenditure equal?', 'They are the same flow measured at three points on one circuit. Profit is the residue after the other factors are paid, which makes the equality exact rather than approximate.'),
  fc('Income or wealth: which is the flow?', 'Income is the flow, measured over a period. Wealth is the stock, measured on a date. Income that is not spent accumulates into wealth.'),
  fc('Define an injection.', 'Spending on domestic output that did not come from domestic household income. It enters the circuit from outside and adds to the flow.'),
  fc('Define a withdrawal.', 'Income received by households that does not return to domestic firms as spending. It leaves the circuit and subtracts from the flow.'),
  fc('Name the three injections.', 'Investment (I), government expenditure (G) and exports (X).'),
  fc('Name the three withdrawals.', 'Savings (S), taxation (T) and imports (M).'),
  fc('Is buying shares investment?', 'No. Investment is spending on newly produced capital goods. A share purchase transfers ownership of something that already exists, so nothing is produced.'),
  fc('Is a pension paid to a household part of government expenditure in this model?', 'No. G is spending on goods and services. A payment that buys no output would be counted twice — once when paid and again when the household spends it.'),
  fc('Is a hotel room sold to a foreign visitor an export?', 'Yes. The test is that domestic output was bought with income earned abroad. Nothing has to be shipped.'),
  fc('Why are imports a withdrawal when the household did spend the money?', 'Because the spending paid producers in another economy. Those wages were not paid in this circuit, so as far as domestic national income goes the dollar has left.'),
  fc('Why are taxation and government expenditure counted separately?', 'They are different sizes and are decided separately. Netting them off would hide the comparison — either can be the larger — that helps decide where national income settles.'),
  fc('What is a net injection?', 'Injections above withdrawals. More enters the circuit than leaves it, so national income grows. A net withdrawal is the reverse.'),
  fc('Two arrows move by the same amount in opposite directions. What happens to national income?', 'Nothing. Only the gap between the two totals moves the flow, so a rise in savings matched by a rise in investment leaves it where it was.'),
  fc('State the equilibrium condition for real national output.', 'Injections equal withdrawals, so there is no tendency for national income to change. On the other framework, aggregate demand crosses aggregate supply.'),
  fc('Why is that equilibrium stable?', 'All three withdrawals rise with income and injections do not, so any gap closes itself as income moves.'),
  fc('Does equilibrium mean the economy is doing well?', 'No. It means no tendency to change. An economy producing far below its capacity with high unemployment can sit in equilibrium indefinitely.'),
  fc('What goes on each axis of an AD/AS diagram?', 'The price level on the vertical axis, real national output on the horizontal. Not price and quantity: this is the whole economy, not one market.'),
  fc('Output and the price level both rise. Which curve moved?', 'AD, to the right. A demand shift moves the two in the same direction.'),
  fc('Output rises and the price level falls. Which curve moved?', 'AS, to the right. Opposite directions can only be a supply shift.'),
  fc('What is the multiplier?', 'The number of times an injection raises national income by more than itself, because the income it creates is spent again in shrinking rounds.'),
  fc('Why does the multiplier process stop?', 'Part of every dollar is saved, taxed or imported, so each round is a fixed fraction of the last. A series shrinking by a fixed fraction has a finite total.'),
  fc('Define the marginal propensity to consume.', 'The fraction of extra national income spent on domestically produced goods and services. "Domestically" is the word that matters.'),
  fc('What is MPW?', 'The marginal propensity to withdraw: MPS + MPT + MPM. The fraction of each extra dollar that does not survive into the next round.'),
  fc('Give both multiplier formulae.', '1/(1−MPC) and 1/MPW, where MPW = MPS + MPT + MPM. They agree whenever the four propensities add to one.'),
  fc('When do the two formulae disagree?', 'When MPC has been measured out of disposable income rather than national income. Check the four propensities add to one before using either.'),
  fc('How do you find the multiplier from data?', 'Divide the change in real national income by the change in injections. The answer is always greater than one, so a result below one is the division the wrong way round.'),
  fc('An injection of $40bn with a multiplier of 2.5 shifts AD right by how much?', '$100bn. The shift is the multiplied amount, not the injection, because the rounds of spending happen at every price level.'),
  fc('What decides how much of an AD shift becomes real output?', 'The AS curve it meets. Below capacity almost all of it is output; at capacity none of it is, and the whole shift becomes a higher price level.'),
  fc('Why is the multiplier not a fixed number for a country?', 'It is one over MPW, and tax rates, savings habits and the share of spending that goes abroad all move. A multiplier measured in one year is evidence about that year.'),
  fc('A government raises income tax to fund extra spending. What happens to the multiplier?', 'It falls, because the marginal propensity to tax has risen. The two halves of the budget work against each other.'),
  fc('Why does a small open economy have a small multiplier?', 'A high marginal propensity to import sends most of each round abroad before it can create domestic income.'),
];

/* ══ Common mistakes ═════════════════════════════════════════════════════ */

const mk = (title, looks_like, why, instead) => ({ id: id('mistake', title), title, looks_like, why, instead });

/*
 * SEVEN, AND TWO OF THE LIVE EIGHT ARE GONE. `structure-08` is right that "students treat the
 * circular flow as a description of reality" and "students describe the adjustment as
 * instantaneous" are filler — neither is an error anyone makes in an exam, and neither costs a
 * mark. It is also right that six of the live ones are genuine, and those six survive in the
 * rewrite. The seventh is new and is the one this section's arithmetic exists to teach.
 */
export const MISTAKES = [
  mk('Sorting injections and withdrawals by who is spending',
    '"Government spending is an injection and taxation must be one too, because the government does both."',
    'The test is direction, not identity. The same government injects when it buys output and withdraws when it takes income, in the same budget. Sorting by the actor makes taxation an injection and a household buying an imported machine an ordinary consumption item, and both are wrong.',
    'Ask one question of every item: does this dollar enter the circuit from outside, or leave it? Everything else about who did it and whether it was a good idea is irrelevant to the classification.'),

  mk('Treating saving as an injection, or investment as a withdrawal',
    '"Saving puts money into banks, which is money going into the economy."',
    'Saving is income the household did not pass to a firm, so it has left the circuit at that point. What a bank later does with it is a separate decision by a separate person, and that decision is investment — which is the injection.',
    'Keep the pair straight by who decides. Households decide to save, which removes spending; firms decide to invest, which adds it. Nothing in the model forces the two to be equal.'),

  mk('Counting a share purchase as investment',
    '"The firm invested $2m in shares, so investment has risen by $2m."',
    'Investment in the circular flow is spending on newly produced capital goods. Buying a share transfers ownership of an asset that already exists, so no output was produced and nobody was paid to produce it. The same applies to buying an existing building.',
    'Test every candidate against one question: was something new produced as a result? If not, it is a transfer of an existing asset and it does not enter the flow.'),

  mk('Reading equilibrium as the best the economy can do',
    '"National income is in equilibrium, so the economy has reached its potential."',
    'Equilibrium means only that injections equal withdrawals, so nothing is pushing the flow either way. An economy with high unemployment and idle factories satisfies that condition exactly, and will stay there until an injection or a withdrawal moves.',
    `Define equilibrium by its condition, then say separately where that level sits against what the economy could produce. In ${E.country} the equilibrium is ${bn(E.Y)}, and whether that is a good outcome is a different sentence.`),

  mk('Using 1/(1−MPC) with an MPC measured after tax',
    '"Households spend 80% of their take-home pay, so MPC is 0.8 and the multiplier is 5."',
    'The formula\'s MPC is the fraction of extra NATIONAL income spent on DOMESTIC output. An MPC taken out of disposable income has already had tax removed, and one that includes imports counts spending that creates no domestic income. Either mistake can double the multiplier.',
    'Check the four propensities add to one before using any of them. If MPC + MPS + MPT + MPM = 1, then MPW = 1 − MPC and both formulae agree; if they do not add to one, they are not all measured out of national income.'),

  mk('Shifting AD by the injection rather than by the multiplied amount',
    `"The government spent an extra ${bn(E.shock)}, so I shifted AD right by ${bn(E.shock)}."`,
    `The rounds of extra spending all happen at every price level, so the horizontal shift is the injection times the multiplier — ${bn(E.deltaY)} here. Shifting by the injection alone understates the effect by ${bn(E.deltaY - E.shock)} and will usually give the wrong new equilibrium.`,
    'Calculate the multiplier before drawing anything, label the horizontal distance with the multiplied figure, and only then read off the new crossing point.'),

  mk('Reporting the multiplied shift as the rise in real output',
    `"The multiplier is ${mult(E.k)} and spending rose ${bn(E.shock)}, so real output rises ${bn(E.deltaY)}."`,
    `That is how far the demand curve moved, not where the economy ended up. On an upward-sloping supply curve the economy slides up as it moves right, so output rises to ${bn(E.Yad)} and the price level to ${idx(E.Pad)}; at capacity, output does not rise at all and the whole shift becomes a price level of ${idx(E.Pclassical)}.`,
    'Say the shift, then say what it met. "AD shifts right by the multiplied amount; how much becomes output depends on where the economy is against its capacity" is the sentence that separates a top answer from a correct calculation.'),
];

/* ══ Extras ══════════════════════════════════════════════════════════════ */

/*
 * `ExtrasTab.jsx` maps `chain.steps`, so a chain authored with any other array key throws and takes
 * the whole tab down for a Pro student (V028, packet 28). Every chain here has `steps` and a
 * `title`, and every evaluation frame a `content` string; the validator's `extras.shape` rule
 * checks it and the runner checks it again off the built bundle.
 */
export const EXTRAS = {
  chains: [
    {
      title: 'From an injection to a new equilibrium',
      steps: [
        `The government raises spending by ${bn(E.shock)}. Injections go from ${bn(E.J)} to ${bn(E.J2)} while withdrawals are still ${bn(E.W)}: there is now a net injection.`,
        `Round one: the ${bn(E.shock)} is paid to the firms and workers who build the port, so national income has already risen by ${bn(E.ROUNDS[0])}.`,
        `Round two: those households spend ${prop(E.mpc)} of it on domestic output — ${bn(E.ROUNDS[1])} — and save, pay tax on, or import the other ${prop(E.mpw)}.`,
        `The rounds keep shrinking: ${bn(E.ROUNDS[2])}, then ${bn(E.ROUNDS[3])}, then ${bn(E.ROUNDS[4])}. Five rounds in, ${round1(E.fiveRoundShare)}% of the total has already arrived.`,
        `As income rises, all three withdrawals rise with it. By the time national income reaches ${bn(E.Y2)}, withdrawals have grown by ${bn(E.withdrawalRise)}.`,
        `That is exactly the size of the injection, so withdrawals ${bn(E.W2)} now match injections ${bn(E.J2)} and the flow stops changing.`,
      ],
      result: `${bn(E.shock)} of extra spending has produced ${bn(E.deltaY)} of extra national income, which is a multiplier of ${mult(E.k)}. And the process ended where it had to: the multiplier is not an open-ended spiral but the exact distance the economy has to travel before its withdrawals have grown by the size of the injection that started it.`,
    },
    {
      title: 'Why the same stimulus does different things in two economies',
      steps: [
        `Both economies receive the same ${bn(E.shock)} of extra government spending.`,
        `The first has MPW ${prop(E.mpw)}, so its multiplier is ${mult(E.k)} and its AD curve shifts right by ${bn(E.deltaY)}.`,
        `The second imports and taxes far more heavily. Its MPW is ${prop(E.otherMpw + 0.35)}, so its multiplier is about ${mult(round1(1 / (E.otherMpw + 0.35)))} and its AD curve shifts right by far less.`,
        'Now look at what each shift meets. The first economy is producing below its capacity, so its supply curve is close to flat and nearly all of the shift arrives as real output.',
        'The second is already producing at capacity, so its supply curve is close to vertical and its smaller shift arrives almost entirely as a higher price level.',
      ],
      result: 'Two differences compound. A larger share of each round leaking abroad makes the first push smaller, and having no room to produce more converts what is left into prices rather than output. A government comparing its own experience with another country\'s has to separate the two before drawing any conclusion at all.',
    },
    {
      title: 'Reading an exam diagram backwards',
      steps: [
        'The data says real national output rose and the general price level fell. Nothing else is given.',
        'Ask first whether the two moved the same way or opposite ways. Here they moved opposite ways.',
        'A demand shift moves them together — right and up, or left and down — so AD can be ruled out immediately.',
        'A supply shift moves them apart, and more output at a lower price level is the rightward case, so AS shifted right.',
        `Now name a cause from the right chapter: cheaper imported raw materials, a fall in tax rates on production, or better technology and productivity — all of which are 2.3.3's leaves rather than this section's.`,
      ],
      result: 'Two directions are enough to identify the curve and its direction, before any economics is discussed. It is the fastest mark in the topic and the most commonly missed, because students read the output figure, conclude demand rose, and never look at the price level at all.',
    },
    {
      title: 'The tax rise that shrinks its own stimulus',
      steps: [
        `A government wants to raise national income and plans ${bn(E.shock)} of extra spending, expecting the multiplier of ${mult(E.k)} to turn it into ${bn(E.deltaY)}.`,
        'To pay for it without borrowing, it raises the rate of income tax.',
        'A higher income tax rate raises the marginal propensity to tax, which is one of the three components of MPW.',
        'A larger MPW means a smaller multiplier, because the multiplier is one over MPW.',
        'So the spending that the higher tax is financing is now being multiplied by a smaller number than the plan assumed.',
        'And the tax rise is itself a larger withdrawal at every level of income, which pushes in the opposite direction to the spending.',
      ],
      result: 'The two halves of a balanced budget do not cancel neatly, and they do not simply add either: the financing changes the multiplier that the spending depends on. An answer that notices this is doing the evaluation an Examine or Evaluate question is asking for, rather than restating the mechanism.',
    },
  ],
  evaluation: [
    {
      title: 'How reliable is a multiplier estimate?',
      content: `The multiplier is written as a formula, which makes it look like a measurement. It is an estimate of a ratio that changes. Its value depends on three propensities, and each of them moves: tax rates change with policy, the share of extra income households save changes with confidence and with interest rates, and the share spent abroad changes with exchange rates and with what is available domestically. A multiplier of ${mult(E.k)} calculated from last year's data is evidence about last year. **The strongest use of this in an answer is conditional**: say what the multiplier implies, then say which propensity would have to move for the conclusion to fail, and how likely that is in the context the question gives you.`,
    },
    {
      title: 'Which framework should an answer use?',
      content: `Injections and withdrawals and AD/AS are not competing theories, and an answer that treats them as alternatives to be chosen between has misread the specification. They are the same equilibrium on different axes: J = W is AD = AS. The choice is about what the question needs. **Use injections and withdrawals when the question is about direction and about the multiplier**, because the six components are visible and the mechanism that stops the process is visible with them. **Use AD/AS when the question involves the price level, or when it hinges on how much of a demand change becomes real output**, because those are the things the second axis exists to show. A top answer in a 14- or 20-mark question often uses both and says explicitly that they are one model.`,
    },
  ],
};
