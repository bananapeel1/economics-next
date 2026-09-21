/**
 * PACKET 38 — macroeconomic-objectives-policies assessment: the quiz bank, the practice items,
 * the flashcards, the common mistakes and the extras.
 *
 * ── THE PINS ARE DERIVED, WHICH IS `topFix-01`, `quiz-01`, `structure-02` AND `structure-03` ──
 *
 * Four findings, one defect. The live section's `quizIndices` are `[0] [1] [2] [3] [4]` — the
 * first five items of the bank, in order, one per block — which `pins.identity` exists to catch
 * and which produces exactly what `quiz-01` and `structure-03` report: block 0 (Objectives) is
 * given a Phillips-curve MCQ four chapters before the curve is drawn, block 2 (Monetary) gets
 * crowding out, block 3 (Supply-Side) gets monetary transmission, block 4 (Conflicts) gets QE.
 * One of five matches its chapter.
 *
 * `structure-02` is the same defect on the practice side and worse: `practiceIndices` index into
 * `sortedPractice`, which `LearnModeTab.jsx:80` sorts BY MARKS, so the indices point at whatever
 * happens to sort there. The 20-mark essay is never shown to anybody.
 *
 * `topFix-01` asks for both index sets to be written out correctly by hand. That fixes this
 * instance. **Tagging each item with its own block and DERIVING the indices makes it
 * unrepresentable**, and the runner asserts that every block has at least one quiz item, at least
 * one practice item and a diagram.
 *
 * ── THE PRACTICE SET IS REPLACED, BECAUSE FOUR OF FIVE CARRY AN IMPOSSIBLE TARIFF ──
 *
 * `audit/scripts/spec-coverage-check.mjs` on the live section, before anything changed:
 *
 *     Define 4 is not an Economics tariff      Explain 6 is not an Economics tariff
 *     Assess 10 is not an Economics tariff     Outline 4 is not an Economics tariff
 *
 * Appendix 6 (`econ_spec.txt:2700-2745`) is the whole taxonomy: Define 2 · Calculate 2 or 4 ·
 * Draw 4 · Explain 4 · Analyse 6 · Examine 8 · Discuss 14 · Evaluate 20.
 *
 * **`practice-02` asserts the opposite of this.** Its first words are "Tariff/command word match
 * IAL" about "Assess … (10 marks)", and neither the command word nor the tariff exists in IAL
 * Economics. Its other three clauses are right — the guidance is point-marked where it should be
 * levels-marked, "in the UK" is GCE framing, and no diagram is expected — and all three are fixed.
 * `topFix-05` repeats the same 10-mark error and its other four clauses are built.
 *
 * Ten items here cover all nine (command, tariff) pairs, spread so every one of the seven blocks
 * has at least one.
 *
 * ── AND NO GUIDANCE OPENS WITH ITS MARK SCHEME ────────────────────────────
 *
 * `practice.opening` and `topFix-05`: `InlinePractice.jsx` prints `guidance.split('\n')[0]` ABOVE
 * the answer box in guided mode, which is every item except the first and last of a section. A
 * one-paragraph guidance is therefore the whole scheme printed over an empty box. Every item
 * below has a first paragraph that carries no figure, no mark allocation and no answer.
 */
import { SECTION, id, hash8, ECON, bn, pct, idx, ofGdp, round1 } from './_packet38-util.mjs';
import { B1, B2, B3, B4, B5, B6, B7 } from './_packet38-content.mjs';

const E = ECON;

/* ══ Quiz ════════════════════════════════════════════════════════════════ */

/** An item, authored KEY FIRST. `block` is null for the three pre-test items. */
const qi = (block, question, options, explanation) => ({
  id: id('quiz', question), block, question, options, explanation,
});

/*
 * EVERY ITEM IS AUTHORED WITH ITS KEY FIRST AND THE KEY IS THEN DEALT INTO A POSITION, by ranking
 * the items on a hash of their own stem (packet 36). Hand-picked positions are what produce
 * `quiz.histogram`, which the live bank carries.
 *
 * AND NO EXPLANATION MAY NAME A POSITION (packet 26's decision, packet 36's round-1 rejection).
 * An explanation saying "the first option" describes the author's draft and not the rendered
 * order, because the dealing moves the key. Every explanation below names an option by its
 * CONTENT, and the runner refuses any ordinal in a quiz explanation.
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
   * That is `quiz-01` in one rule: the live bank's unpinned pool leads with a Phillips-curve item
   * and the pre-test can draw it, so a student can be asked about a curve on the opening screen
   * of a section that draws it in chapter seven.
   */
  qi(null, 'Which of these is NOT one of the macroeconomic objectives listed in this topic?',
    ['Protection of the environment', 'A balanced government budget', 'Greater income equality', 'Balance of payments equilibrium on current account'],
    'Protecting the environment appears in this topic only as something economic growth can conflict with, not as an objective in its own right. The budget, income equality and the current account are all named objectives alongside growth, inflation and unemployment.'),
  qi(null, 'An economy\'s nominal GDP rises by 4% while its price level rises by 4%. Real GDP has:',
    ['not changed', 'risen by 4%', 'risen by 8%', 'fallen by 4%'],
    'Every extra dollar of spending was a price rise rather than extra output, so the quantity of goods and services produced is the same as last year. Adding the two figures or reading the nominal rise as growth both mistake the money value of output for the output itself.'),
  qi(null, 'The objective for inflation is best described as:',
    ['low and stable', 'as close to zero as possible', 'below the rate in other economies', 'falling every year'],
    'Both halves matter: a high rate erodes savings and fixed incomes, and a rate that jumps about stops firms and households planning even when its average is modest. Aiming at zero puts an economy on the edge of falling prices, which is the harder problem to escape.'),

  /* ── Block 1 — objectives ─────────────────────────────────────────────── */
  qi(B1, 'A government collects $228bn in tax and spends $260bn. Its budget position is a:',
    ['deficit of $32bn', 'surplus of $32bn', 'deficit of $488bn', 'balanced budget'],
    'The balance is revenue minus spending, so spending above revenue leaves a gap that has to be borrowed or met by selling assets. Adding the two figures measures the size of the state rather than the gap between the flows.'),
  qi(B1, 'Which best explains why the inflation objective is not zero?',
    ['Zero is the edge of deflation, where waiting pays', 'Zero inflation cannot be measured accurately enough to target', 'Zero inflation would make a country\'s exports uncompetitive abroad', 'Zero inflation always forces the unemployment rate upwards'],
    'When prices are expected to fall, waiting becomes the rational choice for every buyer, and the spending that output depends on is postponed. A small positive rate also leaves the central bank room to move a real interest rate below zero in a downturn.'),
  qi(B1, 'A current account deficit means an economy is:',
    ['buying more from abroad than it sells, and financing the difference', 'spending more than its government collects in tax', 'growing more slowly than its trading partners', 'holding too little foreign currency in reserve'],
    'The current account records trade in goods and services along with income and transfers, so a deficit is a gap that must be met by borrowing from abroad or selling assets to foreign owners. The gap between government spending and tax revenue is a different account entirely.'),
  qi(B1, 'Unemployment falls because a large number of people stop looking for work. This is:',
    ['not progress on the objective, because they have left the measure rather than found jobs', 'full progress on the objective, because the rate has fallen', 'irrelevant, because the measure counts everyone without a job', 'a rise in unemployment once the figures are corrected'],
    'The measure counts people who are available for work and actively seeking it, so somebody who stops searching leaves the count without gaining a job. Output and incomes are exactly where they were, which is what the objective is actually about.'),
  qi(B1, 'Greater income equality is pursued partly because:',
    ['poorer households spend a larger share of each extra dollar than richer ones', 'equal incomes remove the need for taxation', 'income equality is the same objective as economic growth', 'wealthier households pay lower rates of tax everywhere'],
    'Where income is concentrated among households that save much of an extra dollar, the same national income supports less consumer spending than it would if spread wider. There is also the argument about talent: ability that never reaches training is output the economy never receives.'),
  qi(B1, 'Which figure would a government read to judge progress on the growth objective?',
    ['The change in real GDP', 'The change in nominal GDP', 'The level of government spending', 'The rate of inflation'],
    'Growth is about the quantity of goods and services produced, so the figure has to be measured at constant prices. A rise in the money value of output can be entirely a rise in prices, which is no extra output at all.'),

  /* ── Block 2 — the fiscal lever ───────────────────────────────────────── */
  qi(B2, 'Which pair correctly matches a policy to whose decision it is?',
    ['Changing income tax rates — the government', 'Setting the policy interest rate — the government', 'Buying government bonds — the finance ministry', 'Setting the inflation target — the central bank'],
    'Tax rates are the government\'s to change and nobody else can. The policy rate and asset purchases belong to the central bank, and the inflation target is normally set for the bank by the government rather than chosen by it.'),
  qi(B2, 'A deflationary fiscal policy would involve:',
    ['raising taxes or cutting government spending', 'cutting taxes and raising government spending', 'the central bank lowering its policy rate', 'increasing the money supply through asset purchases'],
    'Deflationary means reducing aggregate demand, and the two fiscal instruments are spending and taxation, so reducing demand means less of the first or more of the second. The measures that work through money and credit belong to monetary policy whichever direction they run in.'),
  qi(B2, 'Government spending raises aggregate demand by more than an equal-sized tax cut because:',
    ['spending enters demand in full, while part of a tax cut is saved', 'government spending is never taxed', 'tax cuts take longer to be announced', 'government spending has no effect on the budget balance'],
    'A dollar the state spends on output is a dollar of demand immediately. A dollar returned to households reaches demand only to the extent it is spent rather than saved, and how much that is depends on decisions the government does not control.'),
  qi(B2, 'A rightward shift of aggregate demand along an upward-sloping short-run supply curve causes:',
    ['real output and the price level both to rise', 'real output to rise and the price level to fall', 'real output to fall and the price level to rise', 'the price level to rise with no change in real output'],
    'Firms supply more only at a higher price when supply slopes up, so the extra demand is split between output and prices. Output rising while prices fall is what a rightward shift of the supply curve does, which is a different policy entirely.'),
  qi(B2, 'An economy raises government spending by $16bn and the multiplier is 2.5. Aggregate demand shifts right by:',
    ['$40bn', '$16bn', '$6.4bn', '$2.5bn'],
    'The injection is respent in successive rounds, so the shift is the injection multiplied by the multiplier. Dividing instead of multiplying, or taking the shift as the injection itself, both miss the respending the multiplier measures.'),

  /* ── Block 3 — monetary instruments ───────────────────────────────────── */
  qi(B3, 'Which is NOT one of the monetary policy instruments named in this topic?',
    ['Changing the rate of income tax', 'Changing lending criteria', 'Reserve asset requirements', 'Asset purchases to increase the money supply'],
    'Income tax is a fiscal instrument belonging to the government, not a monetary one. The four monetary instruments are interest rates, asset purchases, the rules on who may borrow, and the fraction of deposits banks must hold back.'),
  qi(B3, 'A rise in the policy interest rate affects the current account because:',
    ['it attracts foreign funds, the currency appreciates, and exports become dearer abroad', 'it directly raises the price of imported goods in foreign markets', 'it lowers the cost of importing raw materials for exporters', 'central banks set exchange rates alongside interest rates'],
    'A higher return draws capital in, which pushes the currency up and changes the foreign price of exports and the domestic price of imports. This is the fourth of the four channels a rate change travels, and in a very open economy it can be the largest.'),
  qi(B3, 'Quantitative easing is used when:',
    ['the policy rate is already near zero and cannot usefully be cut further', 'inflation is far above the target and must be reduced quickly', 'the government wishes to borrow without issuing bonds', 'commercial banks refuse to accept the policy rate'],
    'Savers can always hold cash, so an interest rate cannot be pushed far below zero. A central bank that has run out of room on the rate turns to buying assets, which raises their price and lowers the long-term rates built into them.'),
  qi(B3, 'A central bank raises the reserve requirement from 10% to 15%. A bank with $200bn of deposits can now lend:',
    ['$170bn', '$180bn', '$30bn', '$200bn'],
    'The requirement is the fraction that must be held rather than lent, so raising it from a tenth to about a seventh removes lending capacity directly. Working out the reserves themselves rather than what is left answers a different question.'),
  qi(B3, 'The main advantage of lending criteria over the interest rate as an instrument is that they:',
    ['can be aimed at one market while leaving others alone', 'work faster than any other monetary instrument', 'cost the government nothing to administer', 'cannot be avoided by borrowers or lenders'],
    'One interest rate reaches every borrower and saver, so it cannot cool a property market without also cooling business investment. A rule on mortgage deposits applies to one kind of lending only, which is the whole point of having it. Borrowing does tend to find its way around such rules, which is their weakness rather than their strength.'),

  /* ── Block 4 — the central bank and the comparison ────────────────────── */
  qi(B4, 'Central bank independence normally means the bank is independent in:',
    ['choosing the instrument, while the government sets the target', 'choosing both the target and the instrument', 'setting the target, while the government chooses the instrument', 'neither, since both are decided together'],
    'Choosing what an economy should aim at is a political decision that stays with elected decision-makers; choosing how to hit it is handed over. Independence over goals would put an unelected body in charge of the political half.'),
  qi(B4, 'The credibility argument for an independent central bank is that:',
    ['a bank that cannot be leaned on cannot be expected to inflate, so expectations stay anchored', 'independent banks employ better economists than governments', 'independence removes the lag between a rate change and its effect', 'an independent bank can set a lower inflation target'],
    'If everyone believes rates will be cut for political reasons, they build higher inflation into prices and wages in advance — which raises inflation before any rate has moved. Giving the decision away removes the temptation, so the expectation never forms. The lag is a property of the economy and is unaffected.'),
  qi(B4, 'A bank whose loans are sound but will not be repaid for years faces a rush of withdrawals. It is:',
    ['solvent but illiquid — the lender-of-last-resort case', 'insolvent, so it should be allowed to fail rather than rescued', 'solvent and liquid, so it needs no assistance of any kind', 'illiquid only if the central bank refuses to lend to it'],
    'Its assets are worth more than its debts, and the only problem is that they cannot be turned into cash quickly enough — which is exactly what a short-term loan fixes. A bank whose assets are worth less than its debts is a different problem with a different answer.'),
  qi(B4, 'Which is a weakness of monetary policy that fiscal policy does NOT share?',
    ['It cannot be directed at one region or group', 'It takes time to affect the economy', 'Its effects are uncertain', 'It can be reversed if circumstances change'],
    'One interest rate reaches every borrower and saver, whereas government spending can be concentrated on a depressed region. Both policies act with a lag and with uncertain effects, and easy reversal is monetary policy\'s advantage rather than its weakness.'),
  qi(B4, 'In a deep recession with the policy rate near zero, fiscal policy may be preferred because:',
    ['government spending enters demand without needing anyone to borrow', 'fiscal policy acts more quickly than monetary policy', 'fiscal policy has no effect on the budget balance', 'interest rates cannot be changed during a recession'],
    'Cheap credit cannot force a firm expecting no customers to invest, whereas the state buying output is demand in itself. Fiscal policy is the slower of the two and it widens the deficit, which are its costs rather than its advantages here.'),

  /* ── Block 5 — free-market supply-side ────────────────────────────────── */
  qi(B5, 'Supply-side policies differ from demand-side policies because they:',
    ['change what an economy can produce, not what is spent', 'are carried out by the central bank rather than the government', 'are used when inflation is already low and stable', 'have their whole effect within a financial year'],
    'A demand-side measure moves total spending on the capacity an economy already has; a supply-side measure moves the capacity. This is why a supply-side policy can raise output while the price level falls, which no demand-side measure can do.'),
  qi(B5, 'A training programme raises an economy\'s productive capacity. Holding spending plans fixed, this causes:',
    ['output to rise and the price level to fall', 'output and the price level both to rise', 'output to fall and the price level to rise', 'the price level to fall with no change in output'],
    'More can now be supplied at any given demand, so the economy settles at greater output and lower prices — the opposite pairing from a demand-side expansion. Drawing aggregate demand shifting instead is the commonest error on this diagram.'),
  qi(B5, 'The three targets of supply-side policy named in this topic are:',
    ['productivity, competition and incentives', 'growth, inflation and unemployment', 'spending, taxation and borrowing', 'deregulation, privatisation and taxation'],
    'The topic defines supply-side policies as designed to increase productivity, competition and incentives. The three macroeconomic objectives are what a government wants for the economy as a whole rather than what one policy targets, and deregulation and privatisation are instruments rather than what they aim at.'),
  qi(B5, 'Privatising a state monopoly without opening the market to rivals is likely to:',
    ['change who receives the profit without changing what the firm must do to earn it', 'reduce prices for consumers immediately', 'eliminate the need for any regulation', 'raise productivity by more than in a competitive market'],
    'The argument for private ownership rests on the consequences of failing to satisfy customers, and a firm with no rivals faces the same captive customers whoever owns it. This is why the record on privatisation has turned on how much competition followed.'),
  qi(B5, 'A tax change acts as a supply-side measure when it:',
    ['changes the rate paid on the next dollar earned', 'raises the total amount of revenue collected', 'is announced alongside a spending programme', 'applies only to companies rather than to households'],
    'What alters willingness to work, train or invest is the return at the margin. A change that leaves the marginal rate untouched, such as a larger tax-free allowance, puts money in pockets and so acts on demand instead.'),

  /* ── Block 6 — interventionist supply-side ────────────────────────────── */
  qi(B6, 'Government spending on technical colleges has:',
    ['a demand-side effect now and a supply-side effect years later', 'a supply-side effect only, from the moment it is announced', 'a demand-side effect only, since it is government spending', 'no effect on aggregate demand at any point'],
    'The money is spent on output the moment it is paid, which is a component of aggregate demand. The capacity effect waits for people to be trained and to reach the workforce, which is why the two effects of this measure arrive in different years.'),
  qi(B6, 'There is a case for the state funding training because:',
    ['a firm that trains a worker may lose them to a rival that did not pay', 'training has no effect on the productivity of individual firms', 'firms are not permitted to train their own workers', 'training raises aggregate demand more than any other spending'],
    'Because the benefit can walk out of the door, each firm trains less than the economy as a whole would want — which is an argument for public funding that does not apply to removing a restriction. Training raises productivity for the firm as well; the problem is that it cannot keep all of the return.'),
  qi(B6, 'An investment subsidy paid on a project the firm had already approved:',
    ['changes who paid for it rather than whether it happens', 'raises the economy\'s capacity by the size of the subsidy', 'is the most efficient form of supply-side policy', 'reduces the firm\'s incentive to invest in future'],
    'The decision was taken before the subsidy existed, so no extra investment occurs and the state has transferred money to the firm. An incentive earns its cost only where the project was marginal — close enough to the bar to be tipped over it.'),
  qi(B6, 'Regional policy raises NATIONAL output only where:',
    ['the resources it brings into use were genuinely idle', 'the assisted region is larger than the region the firm left', 'the firm receiving assistance is foreign-owned', 'the policy is funded by borrowing rather than taxation'],
    'If a firm simply moves from one part of the economy to another, the national total is unchanged and only the map has altered. Where the labour and premises used were unemployed, what they produce is genuinely added.'),
  qi(B6, 'Compared with demand-side policies, supply-side policies are generally:',
    ['slower to act and less certain in their effect', 'faster to act and more certain in their effect', 'slower to act but entirely predictable', 'faster to act but restricted to one region'],
    'Education reaches the workforce in a decade and a market opened to entrants produces nothing until somebody enters, so neither the timing nor the response can be relied on. Their compensating strength is that they can raise output without raising the price level.'),

  /* ── Block 7 — conflicts ──────────────────────────────────────────────── */
  qi(B7, 'The short-run Phillips curve shows the relationship between:',
    ['inflation and unemployment', 'inflation and economic growth', 'unemployment and the budget deficit', 'the current account and the exchange rate'],
    'The curve plots unemployment along the horizontal axis and inflation up the vertical, sloping downwards, so that a lower rate of one is associated with a higher rate of the other. It is the trade-off a demand-side policy has to choose a point on.'),
  qi(B7, 'A government accepts higher inflation in order to reduce unemployment. This trade-off:',
    ['holds in the short run, and weakens once higher inflation is expected', 'holds permanently, so unemployment can be kept low indefinitely', 'does not exist, because the two objectives never conflict', 'applies only to supply-side policies'],
    'Once workers and firms build the higher rate into wages and prices, the economy can end up with the higher inflation and the unemployment it started from. The topic names this as the SHORT-RUN curve for exactly that reason.'),
  qi(B7, 'An economy with inflation of 6% while its trading partners average 2% will tend to see:',
    ['exports fall and imports rise, widening the current account deficit', 'exports rise and imports fall, narrowing the deficit', 'no change in trade, since inflation is a domestic matter', 'the current account improve as export prices rise'],
    'Domestic goods are becoming dearer relative to foreign ones each year the gap persists, so foreign buyers switch away and domestic buyers switch towards imports. Both movements subtract from the balance, so they add rather than offset.'),
  qi(B7, 'Which route to higher output weakens the conflict with the environment?',
    ['Raising output per worker per hour through better training', 'Raising output by building more coal-fired power stations', 'Raising output by extracting and shipping more raw material', 'Raising output by lengthening the average working week'],
    'Producing more from the same inputs breaks the proportionality between growing and polluting, which is what the conflict rests on. Each of the other routes raises output by using more of exactly the inputs whose use causes the damage.'),
  qi(B7, 'Which policy raises economic growth AND narrows the income gap?',
    ['Widening access to education and training', 'Cutting the top rate of income tax', 'Reducing the rate at which welfare payments are withdrawn', 'Deregulating product and labour markets'],
    'Raising the earning power of people who had least of it adds to capacity and narrows the spread at the same time, which is why the topic calls these POSSIBLE conflicts. Cutting the top rate raises the return on extra work and concentrates the gain, and slower welfare withdrawal narrows the gap while weakening the incentive.'),
]);

/* ══ Practice ════════════════════════════════════════════════════════════ */

const pr = (block, command, marks, question, guidance) => ({
  id: id('practice', question), block, command, marks, question, guidance,
});

export const PRACTICE = [
  pr(B1, 'Define', 2, "Define the term 'balanced government budget'. (2 marks)",
    `Two marks means two separate things to say, and the second must not be a rewording of the first. Settle which two flows are being compared before you settle what the word "balanced" is doing to them.\nA balanced government budget is one in which government spending is equal to tax revenue (1 mark) over a given period, normally a financial year or the economic cycle (1 mark). An answer that says only "the government spends what it earns" has the comparison but not the period, and an answer that describes a deficit has defined the wrong term.`),

  pr(B1, 'Calculate', 2, `A government collects ${bn(E.taxRevenue)} in tax revenue and spends ${bn(E.govSpending)}. Calculate its budget balance and state whether it is a deficit or a surplus. (2 marks)`,
    `A calculation of this kind is testing the direction as much as the arithmetic, so decide which figure is subtracted from which before you write anything down. Appendix 6 allows marks for workings, so set the subtraction out as a line rather than writing a number alone.\n${bn(E.taxRevenue)} − ${bn(E.govSpending)} = ${bn(E.budgetBalance)} (1 mark for the calculation or for showing the subtraction set out). This is a deficit, because spending exceeds revenue (1 mark). An answer giving ${bn(Math.abs(E.budgetBalance))} without saying which way round it runs has done the arithmetic and left the examiner to guess the economics.`),

  pr(B2, 'Explain', 4, 'Explain how an increase in government spending affects aggregate demand. (4 marks)',
    `Appendix 6 says an Explain asking for an impact needs a two-stage chain of reasoning, so plan two linked steps rather than one assertion restated. Decide first whether the spending reaches demand directly or through somebody else's decision, because that choice is what the rest of the chain follows from.\nKnowledge and understanding: government spending is a component of aggregate demand in its own right (1 mark). Application: so a rise in it raises aggregate demand directly, without waiting on a household or firm to decide to spend (1 mark). Analysis, first stage: the households and firms paid by that spending receive income and spend part of it again (1 mark). Analysis, second stage: so aggregate demand shifts right by more than the initial rise, by the multiplier (1 mark). An answer that stops at "AD rises" has the knowledge and none of the chain.`),

  pr(B2, 'Draw', 4, `Draw an AD/AS diagram to show the effect of a ${bn(E.fiscalInjection)} increase in government spending on an economy with an upward-sloping short-run aggregate supply curve. (4 marks)`,
    `Appendix 6 defines Draw as requiring an accurately labelled diagram, which means deciding before you start which curve moves and in which direction. Label the axes first and leave room to mark both the original position and the new one, because a diagram with one equilibrium on it cannot show a change.\nAxes labelled price level (vertical) and real output (horizontal) (1 mark). AD and short-run AS drawn, intersecting at an initial equilibrium (1 mark). AD shifted RIGHT to AD₂, with the shift arrowed (1 mark). The new equilibrium marked, showing real output higher at ${bn(E.Yfiscal)} and the price level higher at ${idx(E.Pfiscal)} (1 mark). Shifting the supply curve instead, or showing output rising with no change in the price level, contradicts an upward-sloping supply curve.`),

  pr(B3, 'Analyse', 6, 'Analyse how an increase in a central bank\'s policy interest rate reduces the rate of inflation. (6 marks)',
    `Appendix 6 says Analyse focuses on depth rather than breadth and does not include evaluation, so choose ONE channel and follow it the whole way rather than naming four and developing none. Resist the temptation to judge whether the policy is a good idea; that belongs to a different command word.\nKnowledge and understanding: a higher policy rate raises the cost of borrowing and the reward for saving (1 mark). Application: households and firms facing dearer credit postpone purchases and investment projects (1 mark). Analysis, first stage: consumption and investment are components of aggregate demand, so aggregate demand shifts left (2 marks). Analysis, second stage: with demand lower against an upward-sloping supply curve, firms face less pressure to raise prices, so the rate of inflation falls (2 marks). Credit is available for developing the exchange-rate channel instead — a higher rate attracts foreign funds, the currency appreciates and import prices fall — provided it is carried through to the price level. An answer that lists all four channels in a sentence each has breadth and no chain.`),

  pr(B4, 'Examine', 8, 'Examine the case for an independent central bank setting interest rates rather than the government. (8 marks)',
    `Appendix 6 gives Examine eight marks for a chain of reasoning plus a brief assessment of the arguments, so this is not a list of advantages followed by a list of disadvantages. Decide what the strongest argument on each side actually is, and be ready to say which carries more weight and under what circumstances.\nThis is levels-marked on knowledge, application and analysis together with evaluation. A strong response develops the credibility argument as a chain: a government controlling rates has an incentive to cut them before an election; firms and workers anticipate this and build higher inflation into wages and prices; inflation is therefore higher before any rate has moved; handing the decision to a body with no electoral interest removes the incentive, so the expectation does not form. It then assesses. The case against is genuine: interest rates have distributional consequences that are political in nature, an unelected body is harder to hold to account, and monetary policy has to be coordinated with the fiscal decisions the government is still making. The assessment should note that independence in practice is over the INSTRUMENT while the target remains the government's, which answers much of the accountability objection. A response that asserts independence is better without the mechanism has not examined anything.`),

  pr(B5, 'Calculate', 4, 'A worker receives $200 a week in benefits. They are offered a job paying $250 a week. Benefits are withdrawn at 80 cents for every dollar earned, and income tax of 10% is paid on the wage. Calculate the increase in the worker\'s weekly income from taking the job, and the effective marginal deduction rate. (4 marks)',
    `Appendix 6 defines Calculate as a calculation involving several stages, so work through the deductions one at a time and keep a running figure rather than trying to reach the answer in a single line. Decide in what order the two deductions apply before you start, and show every stage: marks are available for workings even where a later figure slips.\nStage 1 — benefit withdrawn: 80% of $250 = $200, so the whole $200 benefit is withdrawn (1 mark). Stage 2 — income tax: 10% of $250 = $25, leaving a net wage of $225 (1 mark). Stage 3 — income in work is $225 against $200 out of work, an increase of $25 a week (1 mark). Stage 4 — the effective marginal deduction rate is the fraction of the $250 lost to withdrawal and tax: ($200 + $25) ÷ $250 = 90% (1 mark). A worker keeping a tenth of what they earn faces a weak incentive, which is why the RATE of withdrawal rather than the level of the payment is the lever this topic points at.`),

  pr(B6, 'Discuss', 14, 'Discuss whether interventionist supply-side policies are more effective than free-market supply-side policies in raising an economy\'s productive capacity. (14 marks)',
    `Appendix 6 asks Discuss for logical chains of reasoning, the validity of the arguments considered, and recognition of different viewpoints or a critical assessment of the evidence. It does not ask for a conclusion in the sense Evaluate does, but it does ask you to weigh rather than to catalogue. Choose two or three specific policies from each route before you start writing: "supply-side policies" as a single object cannot be judged, which is the point the question is really testing.\nThis is levels-marked across knowledge, application, analysis and evaluation; do not allocate points to individual statements. A strong response develops at least one chain on each side. For the interventionist route: investment in education and training raises output per worker per hour, and there is a specific reason the state must do it — a firm that trains a worker may lose them to a rival, so each firm trains less than the economy would want. For the free-market route: removing a licensing barrier lets new firms enter, incumbents can no longer pass costs on and survive, and cost pressure raises productivity without the state spending anything. The evaluation should turn on conditions rather than on preference. Interventionist measures must be funded, so they pull against the balanced-budget objective, and they require the state to judge correctly which industries or regions to back. Free-market measures cost little and risk nothing being done at all — a deregulated market may attract no entrant — and they tend to widen the income gap, which is another named objective. Both routes are slow and uncertain relative to demand-side policy. A response reaching a position on which route suits which circumstance, supported by its own chains, is doing what the command word asks; one that lists five policies on each side is not.`),

  pr(B7, 'Explain', 4, 'Explain why an economy with an inflation rate above that of its trading partners may develop a current account deficit. (4 marks)',
    `This is an Explain asking for a reason, which Appendix 6 says requires a two-stage chain, so the relative price gap has to come first and what it does to trade second. Be careful to keep the comparison relative throughout: it is not the level of domestic inflation that matters here but the difference between it and everyone else's.\nKnowledge and understanding: the current account records trade in goods and services (1 mark). Application: domestic prices rising faster than those of trading partners makes domestic goods dearer relative to foreign ones (1 mark). Analysis, first stage: foreign buyers switch away from the economy's exports, so export revenue falls (1 mark). Analysis, second stage: domestic buyers switch towards imports, which are now relatively cheaper, so import spending rises and the two movements together widen the deficit (1 mark). An answer that says inflation makes exports expensive without the comparison to trading partners has half the mechanism.`),

  pr(B7, 'Evaluate', 20, 'Evaluate whether a government should prioritise low inflation over low unemployment. (20 marks)',
    `Appendix 6 requires Evaluate to develop multi-stage chains of reasoning and to reach informed judgements, which means this question cannot be answered by setting out the trade-off and stopping. Decide early what your judgement depends on — the state of the economy, who bears each cost, the time horizon — because a judgement with no stated conditions is an assertion. A diagram is expected somewhere in a response of this length.\nThis is levels-marked and no statement earns a fixed number of points. A strong response establishes the trade-off with a chain and a diagram: a reflationary policy shifts aggregate demand right, output rises and firms hire, but the same shift raises the price level — the short-run Phillips curve, with unemployment on the horizontal axis and inflation on the vertical. It then develops the case for prioritising inflation: high inflation erodes savings and fixed incomes; unpredictable inflation blocks the contracts and investment decisions on which future output depends; and inflation above trading partners' rates widens a current account deficit, so one objective's failure damages another. Against that, the case for prioritising unemployment: an unemployed worker is output never produced and a household without income, the skill loss makes the damage lasting, and the cost falls on identifiable people while the cost of moderate inflation is spread thinly. The evaluation should question the premise itself. The trade-off is a SHORT-RUN one: once higher inflation is expected it is built into wages and prices, so a policy buying lower unemployment today may leave the economy with the higher inflation and the original unemployment. And it is a possible conflict rather than a certain one — supply-side measures raise capacity, which improves both objectives at once, though slowly and uncertainly. A judgement that names the circumstances under which each priority is right, supported by the chains above it, is what the command word asks for.`),
];

/* ══ Flashcards ══════════════════════════════════════════════════════════ */

const fc = (front, back) => ({ id: id('flashcard', front), front, back });

export const FLASHCARDS = [
  fc('Name the six macroeconomic objectives.', 'Economic growth; low and stable inflation; low unemployment; balance of payments equilibrium on current account; a balanced government budget; greater income equality.'),
  fc('Is protection of the environment one of the objectives?', 'No. It appears in this topic only as the thing economic growth can conflict with — one of the four possible conflicts, not one of the six objectives.'),
  fc('Define economic growth.', 'A sustained increase in real output — output measured at constant prices, so that the rise is extra goods and services rather than higher prices.'),
  fc('Why is the inflation objective low AND stable?', 'A high rate erodes savings and fixed incomes; an unpredictable rate stops firms and households planning at all, so contracts and investment are postponed.'),
  fc('Why not aim for zero inflation?', 'Zero is the edge of deflation, where waiting becomes rational for every buyer. A small positive rate also leaves room to push a real interest rate below zero in a downturn.'),
  fc('Who counts as unemployed?', 'Someone without a job who is available for work and actively seeking it. A retired person, a full-time student and someone who has stopped looking are all excluded.'),
  fc('What does current account equilibrium mean?', 'Trade in goods and services, plus income and transfers, roughly in balance over a run of years — neither a persistent deficit to be financed nor a persistent surplus.'),
  fc('How is the budget balance calculated?', 'Tax revenue minus government spending. Revenue below spending is a deficit; revenue above it is a surplus.'),
  fc('Equality or equity: which is the objective?', 'Greater income equality — the spread of outcomes. Equity is about whether the process producing them is fair, and a system can be equitable and unequal.'),
  fc('Distinguish fiscal from monetary policy.', 'Fiscal policy is the government changing its own spending or taxation. Monetary policy is the central bank changing the price or availability of money and credit. Both move aggregate demand.'),
  fc('Distinguish reflationary from deflationary policy.', 'Reflationary policy raises aggregate demand; deflationary policy lowers it. It is a direction of travel, and either fiscal or monetary policy can be run either way.'),
  fc('Does a deflationary policy cause deflation?', 'No. It reduces aggregate demand and so slows the rate at which prices rise, normally to bring inflation down to a target rather than below zero.'),
  fc('Name the two fiscal policy instruments.', 'Government spending and taxation. There are no others on the demand side.'),
  fc('Why does spending raise AD more than an equal tax cut?', 'Government spending is a component of AD and enters in full. A tax cut reaches AD only through what households and firms choose to spend rather than save.'),
  fc('What happens to output and prices when AD shifts right?', 'Both rise, along an upward-sloping short-run supply curve. The steeper the curve, the more of the shift becomes prices rather than output.'),
  fc('Name the four monetary policy instruments.', 'Interest rates; asset purchases to increase the money supply (quantitative easing); changes in lending criteria; reserve asset (liquidity) requirements.'),
  fc('Name the four channels a rate change travels.', 'Borrowing, saving, wealth through asset prices, and the exchange rate. All four push aggregate demand the same way.'),
  fc('How long does a rate change take to reach inflation?', 'Up to about two years for its full effect, which is why a central bank always sets rates against a forecast rather than against today\'s figure.'),
  fc('What is quantitative easing?', 'The central bank creating reserves and buying assets — usually government bonds — from banks. It raises asset prices, which lowers the long-term rates built into them.'),
  fc('Why is quantitative easing needed at all?', 'Because an interest rate cannot be cut far below zero: savers can hold cash instead. A bank that has run out of room on the rate needs another instrument.'),
  fc('What do lending criteria change?', 'The availability of credit rather than its price — who may borrow and how much. Unlike an interest rate, they can be aimed at one market.'),
  fc('What is a reserve asset requirement?', 'The fraction of deposits a bank must hold in liquid form rather than lend. Raising it removes lending capacity directly and makes the bank safer.'),
  fc('Name the central bank\'s four roles.', 'Implementing monetary policy; achieving an inflation target; acting as banker to the government; acting as banker to the banks — lender of last resort.'),
  fc('What is central bank independence over?', 'The instrument, not the goal. The government normally sets the inflation target and the bank chooses how to hit it.'),
  fc('Why does independence help?', 'A government controlling rates has an incentive to cut them before an election. If that is expected, higher inflation is built into wages and prices in advance. Removing the temptation stops the expectation forming.'),
  fc('When does the lender of last resort lend?', 'To a bank that is solvent but illiquid — assets worth more than debts, but not saleable quickly. A bank that is genuinely insolvent is a different problem.'),
  fc('Give two strengths of fiscal policy.', 'It enters demand directly even when confidence is low, and it can be aimed at a region, a group or a sector. Spending on infrastructure or training also raises capacity.'),
  fc('Give two weaknesses of monetary policy.', 'It cannot be aimed — one rate reaches everyone — and it has a floor near zero. It also acts with a long lag, and cannot force anyone to borrow.'),
  fc('What are the three targets of supply-side policy?', 'Productivity, competition and incentives.'),
  fc('What happens when long-run supply shifts right?', 'Output rises and the price level falls — the opposite pairing from a demand-side expansion, and the reason supply-side policy is the route to growth without inflation.'),
  fc('Name the five free-market supply-side policies.', 'Deregulation of product and labour markets; privatisation; reduction in taxation; changing the levels of welfare payments; cutting the costs of bureaucracy for firms.'),
  fc('Name the five interventionist supply-side policies.', 'Investment in education, training and skills; incentives to encourage investment through tax incentives or subsidies; infrastructure investment; finance for business start-ups; regional policy.'),
  fc('What do deregulation and privatisation both depend on?', 'Competition following. A state monopoly sold as a private monopoly has changed who receives the profit, not what the firm must do to earn it.'),
  fc('When does a tax cut act on the supply side?', 'When it changes the MARGINAL rate — what is kept out of the next dollar earned. A change that leaves the marginal rate alone acts on demand instead.'),
  fc('Why might the state fund training rather than firms?', 'A firm that trains a worker may lose them to a rival that did not pay for it, so every firm trains less than the economy as a whole would want.'),
  fc('When is an investment incentive well aimed?', 'When the project was marginal — close enough to the bar to be tipped over it. An incentive paid on an investment already decided changes who paid, not what happens.'),
  fc('When does regional policy raise national output?', 'Only where the labour and premises it brings into use were genuinely idle. If a firm simply relocates within the same economy, the national total is unchanged.'),
  fc('Name the four possible conflicts between objectives.', 'Inflation and unemployment (the short-run Phillips curve); growth and protection of the environment; inflation and current account equilibrium; growth and income equality.'),
  fc('What did Phillips\' original curve actually plot?', 'WAGE inflation against unemployment — the rate at which money wages rose. The curve asked for today uses price inflation; wages are a firm\'s cost, so wage rises feed through into prices.'),
  fc('What does the short-run Phillips curve show?', 'Unemployment on the horizontal axis and inflation on the vertical, sloping down: lower unemployment is associated with higher inflation in the short run.'),
  fc('Why is the Phillips trade-off not permanent?', 'Once higher inflation is expected, workers and firms build it into wages and prices, so the economy can end with the higher inflation and the unemployment it started with.'),
  fc('Why can growth conflict with the environment?', 'More output generally means more energy burned and more material extracted. The link runs through resource use per unit of output, which rising productivity can weaken.'),
  fc('Why does inflation above trading partners widen a deficit?', 'Domestic goods become dearer relative to foreign ones, so exports fall and imports rise. Both movements subtract from the current account, so they add rather than offset.'),
  fc('Name one policy that helps growth AND equality.', 'Widening access to education and training: it raises capacity and raises the earning power of those who had least of it, so both objectives move the same way.'),
];

/* ══ Common mistakes ═════════════════════════════════════════════════════ */

/*
 * EIGHT, FROM FOUR. `structure-07` is that four of the live misconceptions are exam-technique
 * notes — "students list without judgement", "students describe only one channel" — rather than
 * conceptual errors. A note about how to answer belongs in `examMatters`; a mistake is a belief
 * about the economics that is wrong. Every one below is the second kind.
 */
const mk = (title, looks_like, why, instead) => ({ id: id('mistake', title), title, looks_like, why, instead });

export const MISTAKES = [
  mk('Treating zero inflation as the objective',
    '"The aim is stable prices, so the best outcome is inflation of 0%."',
    'Zero is the boundary of deflation, and falling prices make waiting the rational choice for every buyer — which removes the spending output depends on. A small positive rate also leaves the central bank room to push a real interest rate below zero when it needs to.',
    'State the objective as the specification does: low AND stable. Then you can explain why a rate of about 2% is chosen rather than a rate of nothing.'),

  mk('Reading a budget deficit as bad management',
    '"The deficit is 4% of GDP, so the government has failed on this objective."',
    'A deficit is a gap between two flows in one year and says nothing about why. Borrowing to build infrastructure that raises future output is a different proposition from borrowing to meet running costs, because the first generates the revenue that repays it.',
    'Say what the borrowing is for and over what period. The objective is balance over the cycle, which is why one year\'s figure settles nothing.'),

  mk('Saying "the government cut interest rates"',
    '"To boost demand the government lowered interest rates to 2%."',
    'In most economies the government does not set the interest rate; an independent central bank does, and the separation is the whole of one specification bullet. Writing it this way loses the distinction between fiscal and monetary policy on the first line.',
    'Keep the hands separate: the government spends and taxes, the central bank sets rates and buys assets. The government sets the target the bank aims at, and nothing more.'),

  mk('Treating deflationary policy as causing deflation',
    '"They would never use deflationary policy — falling prices are dangerous."',
    'A deflationary policy reduces aggregate demand, which slows the RATE at which prices rise. It is normally used to bring inflation down TO a target, not below zero. Deflation is an outcome and a deflationary policy is a direction of travel.',
    'Use the pair as directions: reflationary raises AD, deflationary lowers it. Then say which instrument is being used, because either policy can run either way.'),

  mk('Shifting AD for a supply-side policy',
    '"Training raises capacity, so AD shifts right and output rises."',
    'A supply-side policy moves what an economy CAN produce, which is the long-run supply curve. Shifting AD gives a higher price level, which contradicts the answer being written above the diagram — a supply-side measure raises output while the price level falls.',
    'Ask which curve the measure acts on before drawing anything. If the measure changes spending on existing capacity it is AD; if it changes the capacity it is long-run supply.'),

  mk('Assuming crowding out always happens',
    '"The government borrowed, so private investment must have been displaced."',
    'Crowding out depends on whether the economy has idle resources. Where savings are ample and firms are not trying to borrow, government borrowing need not raise the cost of funds at all. The argument is strongest near capacity and weakest in a slump.',
    'State the condition. "Crowding out is likely if the economy is near capacity, because…" earns the evaluation mark that "crowding out will occur" does not.'),

  mk('Believing lower rates must raise investment',
    '"Rates fell, so investment will rise."',
    'A rate cut makes borrowing cheaper; it cannot make a firm want customers it does not expect. In a deep enough downturn, firms decline to invest at any rate on offer, which is the case where fiscal policy is clearly the better instrument.',
    'Follow the chain to the decision, not to the price: cheaper credit changes whether a project CLEARS the bar, and the return on the project depends on expected demand.'),

  mk('Treating the Phillips trade-off as permanent',
    '"Accept 5% inflation and unemployment can be held at 4% indefinitely."',
    'The curve describes the SHORT RUN. Once the higher inflation is expected, workers and firms build it into wages and prices, and the economy can end up with the higher inflation and the unemployment it started with. A policy that buys a lower rate today does not buy it for ever.',
    'Name the curve as short-run every time you use it, and make the temporary nature of the trade-off the evaluation point rather than a footnote.'),
];

/* ══ Extras ══════════════════════════════════════════════════════════════ */

export const EXTRAS = {
  chains: [
    {
      title: 'A fiscal expansion, from the decision to the new equilibrium',
      steps: [
        `The government raises spending by ${bn(E.fiscalInjection)}. Government spending is a component of aggregate demand, so this is new demand for output immediately.`,
        `The firms and households paid by that spending spend part of it again, so aggregate demand shifts right by more than the injection — ${bn(E.adShift)} at a multiplier of ${E.fiscalMultiplier}, which topic 2.3.4 derives.`,
        `The shifted AD meets an upward-sloping short-run supply curve, so firms supply more only at a higher price.`,
        `The economy settles at real output ${bn(E.Yfiscal)} and a price level of ${idx(E.Pfiscal)}.`,
        `Only ${bn(E.Yfiscal - E.gdp)} of the ${bn(E.adShift)} shift arrived as output; the rest went into prices.`,
      ],
      result: `Output and the price level moved the SAME way, which is the signature of a demand-side policy. The steeper the supply curve where the new demand lands, the more of any such measure turns into inflation rather than output.`,
    },
    {
      title: 'A rise in the policy rate, along all four channels',
      steps: [
        `The central bank raises its policy rate from ${pct(E.policyRate)}. Commercial banks reprice their lending and saving off it within days.`,
        `Borrowing: mortgages and business loans cost more, so house purchases and investment projects are shelved.`,
        `Saving: the reward for postponing consumption rises, so some spending is deferred.`,
        `Wealth: higher rates make future income streams worth less today, so bond and share prices fall and the households holding them cut back.`,
        `The exchange rate: the higher return attracts foreign funds, the currency appreciates, exports become dearer abroad and imports cheaper at home.`,
        `All four reduce aggregate demand, and the full effect on inflation arrives over up to about two years.`,
      ],
      result: `Four channels, one direction — which is why the instrument is powerful. The fourth is also why a rate decision aimed at inflation moves the current account too, and that is the third of the four conflicts.`,
    },
    {
      title: 'A supply-side policy, and why its signs are the other way round',
      steps: [
        `A policy raises what the economy can produce — by ${bn(E.lrasShift)} of capacity.`,
        `The curve that moves is the LONG-RUN supply curve, which is vertical: it records capacity, not the response to a price.`,
        `Aggregate demand is unchanged, so the same demand now meets a greater capacity.`,
        `Real output rises to ${bn(E.Ysupply)} and the price level falls to ${idx(E.Psupply)}.`,
      ],
      result: `Output up and prices DOWN — opposite directions, where a demand-side expansion moves both the same way. It is the only route to growth that does not cost inflation, and it is also the slowest and least certain.`,
    },
    {
      /*
       * THIS CHAIN EXISTS FOR `reorder.source`, AND IT IS IN EXTRAS ON PURPOSE. The rule asks that
       * a sequence a student is asked to reconstruct is one the section actually taught, in that
       * order. Teaching it as a flow INSIDE `startup-finance-regional-policy` would satisfy it and
       * immediately trip `recall.recoverable`, which is scoped to the subsection — the tension
       * packet 2.7's handoff names. An extras chain is in the section and not on the step, which
       * is the resolution that satisfies both.
       */
      title: 'Regional policy, and whether the nation gains',
      steps: [
        `Tax relief is offered to firms locating in a region with 14% unemployment, which makes that region cheaper than it was for a firm choosing a site.`,
        `A manufacturer compares sites and opens a plant there rather than in the capital. This is the location decision the relief was bought to change.`,
        `The plant needs workers, and in a region at 14% unemployment they are available without being taken from another employer.`,
        `National output rises, because the labour now producing was not producing anything before.`,
      ],
      result: `The last step is the one that makes it a national gain rather than a transfer. Where the region's workers and premises were NOT idle, the firm has moved rather than been created, the national total is unchanged and only the map has altered.`,
    },
    {
      title: 'One policy, two objectives, opposite directions',
      steps: [
        `A government cuts the highest marginal rate of income tax, aiming at the incentive to work and invest.`,
        `High earners keep more of each additional dollar, and some work longer hours or fund more investment.`,
        `Capacity and output rise: progress on the growth objective.`,
        `The same households now receive a larger share of total income, so the spread of incomes widens.`,
      ],
      result: `One measure has moved growth and income equality in opposite directions. This is why the specification calls them POSSIBLE conflicts — and why naming the specific policy, rather than judging "supply-side policy" as a whole, is what a good answer does.`,
    },
  ],
  evaluation: [
    {
      title: 'It depends on where the economy is',
      content: 'The same demand-side measure does almost opposite things in a slump and at capacity. Near capacity a rightward AD shift is mostly inflation, crowding out is at its most likely, and the case for tightening is strong. With spare capacity the same shift is mostly output, borrowing need not raise the cost of funds, and the case reverses. Any judgement on a demand-side policy that does not say where the economy is standing has answered a question nobody asked.',
    },
    {
      title: 'Speed against power',
      content: 'Monetary policy decides in an afternoon and can be reversed next quarter; fiscal policy needs a budget and a vote and is hard to stop once begun. But monetary policy cannot be aimed, has a floor near zero, and cannot make anyone borrow, while government spending is demand whether or not anybody is feeling confident. The honest comparison is not which is better but which is better HERE — and in a deep downturn with rates already near zero, the slower instrument is the one that works.',
    },
    {
      title: 'Supply-side measures are not one thing',
      content: 'Free-market and interventionist routes share only their target. One costs the budget almost nothing and tends to widen the income gap; the other does not widen it and must be paid for, so it pulls against the balanced-budget objective, and it requires the state to pick correctly. A question naming "supply-side policies" is usually testing whether you separate the two before judging either.',
    },
    {
      title: 'Conflicts are possible, not certain',
      content: 'The specification\'s word is POSSIBLE, and it is doing work. Growth and the environment conflict through resource use per unit of output, which productivity growth weakens. Growth and equality conflict for a tax cut at the top and not for wider access to education. Every one of the four conflicts can be softened by choosing a different instrument, which is why the strongest evaluation names the policy rather than treating the objectives as fixed opposites.',
    },
  ],
};
