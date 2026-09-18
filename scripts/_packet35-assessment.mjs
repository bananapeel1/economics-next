/**
 * PACKET 35 — entrepreneurs-leaders: the quiz bank, eight practice items, the flashcards, the
 * common mistakes this section has never had, and the extras.
 *
 * ════ THE QUIZ BANK IS WHERE FOUR OF THIS PACKET'S FINDINGS LIVE ════
 *
 * `quiz-01`: *"20 of 25 MCQs have correctIndex 1; the correct option is also the longest in 15 of 25
 * (and in all of Q19-Q24). A student can score ~80% by always picking option B."* That is a
 * measurement, and it is answered by a measurement rather than by hand-rebalancing: every item below
 * is authored KEY FIRST and the key is then DEALT into a position by `placeKeys`, which ranks items
 * by a hash of their own stem and takes the rank modulo four. The spread is even, stable across
 * builds, and nobody chose it. The runner then asserts the histogram and the longest-option rate,
 * so the defect cannot return.
 *
 * `quiz-02` and `structure-08`: *"profit satisficing is correct but never taught in content[] — only
 * in flashcards — and it is Block 1's inline quiz, so students are tested on untaught material."*
 * Satisficing now has a subsection of its own, and the runner refuses any quiz stem whose subject is
 * not taught by some subsection. The general form of the defect was two surfaces authored from
 * different lists; every surface here is generated from `_packet35-util.mjs`.
 *
 * `quiz-03`, `structure-02` and `topFix-03`: *"quizIndices are assigned sequentially 0,1,2,3 rather
 * than topic-matched, so Block 1 (motives) gets a barriers MCQ."* Every item below carries its own
 * `block` tag and the runner DERIVES `quizIndices` from it. Hand-mapping the indices — which is what
 * `topFix-03` asks for — would fix this instance and leave the next edit free to break it again.
 *
 * ════ THE PRACTICE ════
 *
 * `topFix-05` and `practice-01` ask for three things and two of them are right. **Right:** every
 * question anchored in a short case extract, which is how a WBS11 paper puts them; and p2, the
 * leadership-style Assess, retired — leadership is 1.3.4 and this section must not teach it, so it
 * must not assess it either.
 *
 * **Refused:** "tariffs 4/8/10/12/20 only" is not this unit's tariff set. The census
 * (`bus_spec.txt:2220-2251`) gives Define 2 · Calculate 4 · Construct 4 · Explain 4 · Analyse 6 ·
 * Discuss 8 · Assess 10 · Evaluate 20, with Assess at 12 only in Units 3 and 4. The finding's list
 * drops Define and Analyse and imports a Unit 3/4 tariff. All eight command words appear below
 * exactly once, at the census marks, and the runner checks each against the census rather than
 * against this comment.
 *
 * **Also refused:** "guidance expressed as level descriptors (Knowledge/Application/Analysis/
 * Evaluation)" and `practice-01`'s "Knowledge 2 / Application 2 / Analysis 3 / Evaluation 3". Those
 * are claims about what a marker credits. `examMatters` and practice guidance say what the COMMAND
 * WORD requires, because Appendix 6 states it and is citable; `MARK_CLAIM` in the runner refuses the
 * rest, and it refuses it in the guidance as well as in the teaching text.
 *
 * `specGap-08` asked whether Define is 4 marks or whether the paper uses "Explain one" at 4.
 * ANSWERED: Define is **2** (:2220) and Explain is **4** (:2227-2229). Both appear below, at those
 * marks. A hedge gets the same spec check as an assertion (packet 29).
 */
import {
  id, hash8, money, qty, pct, round2,
  FIRM, CHARACTERISTICS, BARRIERS, FINANCIAL_MOTIVES, NON_FINANCIAL_MOTIVES, OTHER_OBJECTIVES,
} from './_packet35-util.mjs';
import { B1, B2, B3, B4, B5 } from './_packet35-content.mjs';

const F = FIRM;

const qi = (block, question, options, explanation) => ({ id: id('quiz', question), block, question, options, explanation });

/*
 * EVERY ITEM IS AUTHORED WITH ITS KEY FIRST and the key is then DEALT into a position. Hand-picking
 * positions produces exactly the lumpy distribution `quiz-01` measured; ranking items by a hash of
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
   * All three are answerable from chapter 1, which every student reaches before anything else, and
   * none tests an objective, a motive or a figure the section has not yet reached. That is `quiz-02`
   * fixed at the root rather than by swapping one item: the pre-test's pool is the opening chapter,
   * so it cannot contain untaught material.
   */
  qi(null, 'An entrepreneur is best defined as somebody who:',
    ['takes the initiative to set up and run a business and bears the financial risk', 'invents a product or a process that nobody else has yet brought to a market anywhere', 'owns a business and employs other people to run it for them', 'takes decisions about how a business is run from day to day'],
    'The definition has two requirements and both are needed: the initiative to begin, and the financial risk of beginning. Nothing in it requires the idea to be new, and somebody who owns a business without taking either the initiative or the risk has met neither requirement.'),
  qi(null, 'Which of the following is the clearest difference between an entrepreneur and an intrapreneur?',
    ['The intrapreneur does not bear the financial risk personally', 'The intrapreneur is not allowed to innovate', 'The entrepreneur works alone and the intrapreneur works in a team', 'The entrepreneur needs no capital to begin'],
    'Both take the initiative; the firm carries the loss for the intrapreneur and the individual carries it for the entrepreneur. That single difference is why an intrapreneur can be given resources no individual could raise, and why a successful idea belongs to the firm rather than to them.'),
  qi(null, 'A business is said to be developing rather than growing when it:',
    ['changes what it does rather than doing more of the same', 'increases its output without hiring anybody new', 'opens a second site making the same product', 'raises its prices while keeping its costs unchanged'],
    'Developing means changing what the firm does — a new design, a different customer, a different way of selling. Doing more of the same, whether at one site or two, is growth, and a firm can develop without getting any larger at all.'),

  /* ── Block 1 · The role of an entrepreneur ────────────────────────────── */
  qi(B1, 'A relative lends a new workshop money at a fixed rate of interest. Under the specification\'s definition this person is NOT an entrepreneur because they:',
    ['took no initiative — the business would have existed without them beginning it', 'face no risk of any kind on the money they have lent', 'play no part in the day-to-day running of the business that they have lent the money to', 'will not receive any share of the profit the workshop makes'],
    'The definition needs initiative and financial risk together. A lender genuinely carries a risk, so that half is met; what is missing is that they began nothing. Working in the business daily is not part of the definition, and neither is how the return is paid.'),
  qi(B1, 'Why does the specification put testing the idea BEFORE raising the capital when a business is set up?',
    ['Money raised against an untested idea has already been committed to it', 'Lenders will not release funds until a test has been completed', 'Testing an idea is cheaper once the capital has been raised', 'The cost of the premises cannot be known until the idea is tested'],
    'Each step needs the one before it, and committing capital is the point after which the alternatives have closed. Doing it before the test means the decision has effectively been taken while the information that should decide it is still missing.'),
  qi(B1, `${F.name} owes ${money(F.fixed)} a year in fixed costs. The significance of this figure for a founder setting up is that it is owed:`,
    [`whether the workshop sells ${qty(F.profitMax.q)} chairs or none at all`, 'only once the workshop begins trading profitably', `in proportion to the number of chairs the workshop actually makes`, 'only if the founder borrowed rather than used her own savings'],
    `Fixed costs do not move with output, which is exactly what makes committing to them irreversible: the lease and the machinery are owed from the day they are signed for. A cost that moved with output would be the ${money(F.variable)} spent making each chair.`),
  qi(B1, 'Which of the following best shows that a firm has finished the job of RUNNING a business rather than just starting one?',
    ['The business continues to operate when the founder is away for a fortnight', 'The business has made a profit in each of the first two years since it opened', 'The founder has stopped working at the bench and now manages', 'The business has repaid the capital it borrowed to begin'],
    'Running is repetition, and the test is whether the firm has a system rather than an owner holding it together. Profit, promotion and repayment are all consistent with a firm that stops the moment one person does.'),
  qi(B1, 'A machinist notices that offcuts could be sold as a second product, persuades the owner and runs the new line herself. This is an example of:',
    ['intrapreneurship', 'job enlargement', 'developing a new market', 'taking on financial risk'],
    'She takes the initiative inside a firm that already exists and whose money is at stake rather than her own, which is what the specification means by innovation within a business. Her salary is paid whether the line succeeds or not.'),

  /* ── Block 2 · Risk, uncertainty and barriers ─────────────────────────── */
  qi(B2, 'A workshop finds that one chair in fifty is returned faulty. The right way to anticipate this is to:',
    ['add the cost of replacing it to what each chair costs to make', 'hold three months of fixed costs in reserve against it', 'raise the selling price until returns stop happening', 'treat it as an uncertainty, because nobody knows which chair it will be'],
    'It happens often enough to carry a figure, which makes it a risk, and a risk is anticipated by pricing it in. Holding cash is how something that carries no figure is anticipated, and not knowing which particular item is affected does not stop a proportion being known.'),
  qi(B2, 'Which of the following is an UNCERTAINTY rather than a risk for a small workshop?',
    ['Whether a competitor will open in the same town next year', 'The proportion of customers who pay a month late', 'The number of blades that will wear out this year', 'The proportion of chairs returned under guarantee'],
    'The other three have all happened often enough to carry a proportion, so each is a risk: a figure can be attached and priced into what a chair costs to make. A competitor opening is a single future event with no frequency behind it, so it is an uncertainty — there is no figure to anticipate it with, and it is held against with cash instead.'),
  qi(B2, `${F.name} keeps a quarter of its ${money(F.fixed)} fixed costs in reserve. The cost of doing so is that:`,
    [`${money(F.fixed / 4)} is not invested in anything that would raise output`, 'the price of each chair must rise to fund the reserve', 'the workshop cannot cover its fixed costs in a normal year', 'the reserve must be replaced every quarter from profit'],
    `Money in reserve earns the firm nothing while it sits there — what it buys is the ability to still be trading after a surprise. Pricing a risk in is the precaution that raises the price; holding a reserve does not.`),
  qi(B2, 'The specification names no particular barriers to entrepreneurship. The most reliable way to produce them in an exam is to:',
    ['work back from the requirements of the role and ask what obstructs each one', 'recall the four barriers that are most commonly listed in textbooks and apply them', 'describe the barriers the firm in the case study happens to face', 'list every external obstacle a new business could meet'],
    'Deriving them from the role means the list can be rebuilt rather than remembered, and it produces barriers that fit the firm in front of you. A remembered list has nothing to fall back on when the case does not match it.'),
  qi(B2, 'Which barrier to entrepreneurship rises as the founder becomes MORE employable elsewhere?',
    ['Opportunity cost', 'Access to capital', 'Lack of relevant skills', 'Uncertainty about the market'],
    'The barrier is what has to be given up to start, and a more employable person gives up more. The other three fall rather than rise as somebody becomes more capable and better known, which is why this one is so often left off the list.'),
  qi(B2, 'Borrowing to start a business lowers the capital barrier. Its effect on the other barriers is that it:',
    ['raises the risk barrier, because more is lost if the firm fails', 'lowers the skills barrier, because lenders provide advice', 'removes the opportunity cost, because no savings are given up', 'has no effect on any of the other barriers'],
    'A single remedy that works on every barrier is a sign the barriers have not been distinguished. Borrowing means the founder owes money whether or not the venture works, so what is at stake if it fails is larger than it was.'),

  /* ── Block 3 · Motives and characteristics ────────────────────────────── */
  qi(B3, 'The specification asks for the characteristics AND skills a founder needs. The distinction between the two is that a skill:',
    ['can be learned, whereas a characteristic describes how somebody is', 'is needed at the start, whereas a characteristic is needed later', 'applies to the business, whereas a characteristic applies to the person', 'is measurable, whereas a characteristic cannot be described'],
    'Half the leaf is about disposition and half about things that are acquired, which is why "lacks the skills" is a smaller obstacle than it sounds: the barriers chapter can do something about the learned half.'),
  qi(B3, 'Profit satisficing means that a founder:',
    ['takes a profit that is good enough rather than the largest available', 'aims to make the largest profit that the market will allow the business to make', 'reinvests all of the profit rather than taking any of it out', 'accepts a loss in the short run to build market share'],
    'Satisficing sets a floor rather than a maximum: something else — time, independence, the shape of the working year — is worth more to the founder than the difference. It is still a financial motive, because the test applied is still a figure.'),
  qi(B3, `A founder decides to make ${qty(F.satisficeChairsPerDay)} chairs a day instead of ${qty(F.profitMaxPerDay)}. Using ${F.demand}, this decision means she:`,
    [`sells ${qty(F.satisfice.q)} chairs at ${money(F.satisfice.price)} and earns ${money(F.satisfice.profit)}`, `sells ${qty(F.satisfice.q)} chairs at ${money(F.profitMax.price)} and earns ${money(F.profitMax.profit)}`, `sells ${qty(F.profitMax.q)} chairs at ${money(F.satisfice.price)} and earns ${money(F.salesMax.profit)}`, `sells ${qty(F.marketShare.q)} chairs at ${money(F.marketShare.price)} and earns ${money(F.marketShare.profit)}`],
    `${qty(F.satisficeChairsPerDay)} chairs across ${qty(F.workingDays)} working days is ${qty(F.satisfice.q)} a year, and the schedule says that many sell at ${money(F.satisfice.price)}. The profit is ${money(F.satisfice.profit)} — ${money(F.tradeSatisfice.profit)} below the maximum, which is what she exchanged for the shorter working year.`),
  qi(B3, 'What distinguishes an ethical stance that is genuinely a MOTIVE from one that is a marketing position?',
    ['A motive costs the firm money and is kept anyway', 'A motive is stated publicly and a marketing position is not', 'A motive applies to suppliers and a marketing position to customers', 'A motive is adopted once the firm is established'],
    'The specification lists it among the reasons people set businesses up, so the stance came before the firm. The visible test is what happens when it becomes expensive: one that is abandoned at that point was not the reason the business exists.'),
  qi(B3, 'A social entrepreneur differs from other founders mainly in:',
    ['who the trading surplus belongs to', 'whether the organisation sells anything at all', 'whether the organisation needs to cover its costs', 'whether the organisation employs anybody'],
    'A social entrepreneur runs a business: it sells, it covers its costs and it must survive. What differs is that the surplus funds the purpose rather than the founder — so earning one matters more here rather than less.'),
  qi(B3, 'Why do independence and home working as motives both tend to predict satisficing rather than profit maximisation?',
    ['Each fixes the scale of the business before the price is considered', 'Each reduces the profit the business is able to earn per unit', 'Each means the founder has no interest in money at all', 'Each is incompatible with employing other people'],
    'A founder who will not take outside money or leave the house has capped what the firm can produce, so the profit is capped with it and she takes whatever that scale allows. Neither motive implies indifference to money or rules out employing anybody.'),

  /* ── Block 4 · Business objectives ────────────────────────────────────── */
  qi(B4, `Using ${F.demand} with fixed costs of ${money(F.fixed)} and ${money(F.variable)} a chair, the range of prices at which the workshop survives is:`,
    [`${money(F.breakEvenLow)} to ${money(F.breakEvenHigh)}`, `${money(F.marketShare.price)} to ${money(F.profitMax.price)}`, `${money(F.salesMax.price)} to ${money(F.satisfice.price)}`, `any price above ${money(F.variable)}`],
    `Profit is zero at both ${money(F.breakEvenLow)} and ${money(F.breakEvenHigh)} and positive between them. Below the lower figure the margin on each chair is too thin to cover the fixed costs however many are sold; above the higher one too few sell to cover them at all.`),
  qi(B4, 'Survival is listed first among the objectives because it:',
    ['is the condition every other objective has to be pursued inside', 'is the objective of businesses that are performing badly', 'is the easiest objective for a small firm to achieve', 'must be achieved before a business is allowed to trade'],
    'A firm that does not survive pursues nothing else, so every price the firm can choose is a price at which it survives. It is a constraint on the others rather than an alternative to them, and a profitable firm is pursuing it too.'),
  qi(B4, `On this schedule, ${money(F.breakEvenHigh)} is a price customers would pay, yet the workshop earns no profit there. This shows that profit maximisation is NOT:`,
    ['charging the highest price the market will bear', 'a matter of balancing the margin against the quantity sold', 'achieved at a single identifiable price', 'compatible with selling fewer chairs than a rival'],
    `At ${money(F.breakEvenHigh)} only ${qty(F.qAt(F.breakEvenHigh))} chairs sell, which is too few to cover ${money(F.fixed)} of fixed costs. Every dollar above ${money(F.profitMax.price)} costs more in chairs lost than it gains in margin, which is why the maximum sits in the middle.`),
  qi(B4, `Why do ${money(F.salesMax.price)} and ${money(F.satisfice.price)} both earn ${money(F.salesMax.profit)} on this schedule?`,
    ['Profit is a hill, so two prices either side of the peak give the same height', 'The two prices sell the same number of chairs as each other', 'Revenue and cost both rise in exact proportion to the price', 'The fixed costs happen to be recovered in full at each of these two prices alike'],
    `One reaches ${money(F.salesMax.profit)} by selling ${qty(F.salesMax.q)} chairs cheaply and the other by selling ${qty(F.satisfice.q)} dearly, so the quantities are quite different. Falling away on both sides of a peak is what makes the curve a hill rather than a slope.`),
  qi(B4, 'The specification names the objective of pursuing the largest revenue as:',
    ['sales maximisation', 'revenue maximisation', 'turnover maximisation', 'market share'],
    'Sales maximisation is the term the specification uses. Market share is a different objective pursued at a different price — the largest output the firm can reach while still surviving — and on this schedule it earns no profit at all.'),
  qi(B4, `A workshop moves from ${money(F.profitMax.price)} to ${money(F.marketShare.price)} in order to pursue market share. The exchange it has made is:`,
    [`${qty(F.tradeShare.units)} more chairs for ${money(F.tradeShare.profit)} less profit`, `${qty(F.tradeSales.units)} more chairs for ${money(F.tradeSales.profit)} less profit`, `${money(F.tradeShare.profit)} more revenue for ${qty(F.tradeShare.units)} fewer chairs`, `${qty(F.tradeShare.units)} more chairs at no cost in profit`],
    `Output rises from ${qty(F.profitMax.q)} to ${qty(F.marketShare.q)} and profit falls from ${money(F.profitMax.profit)} to ${money(F.marketShare.profit)}, which is the entire profit given up. It is the largest of the exchanges on this schedule, and a firm accepts it only if the volume buys something later.`),
  qi(B4, `Cutting the cost of making a chair from ${money(F.variable)} to ${money(F.efficientVariable)} raises profit at the old price. It ALSO:`,
    [`lowers the profit-maximising price to ${money(F.efficient.price)}`, `raises the profit-maximising price to ${money(F.satisfice.price)}`, 'leaves the profit-maximising price exactly where it was', 'moves the workshop outside the range in which it survives'],
    `A cheaper chair is worth selling more of, so the best price falls and output rises to ${qty(F.efficient.q)}, taking profit to ${money(F.efficient.profit)}. Stopping at the ${money(F.efficiencyGain)} saved at the unchanged price answers only half of it.`),
  qi(B4, 'Cost efficiency differs from the other five objectives at 1.3.5 · 3c in that it:',
    ['does not conflict with profit', 'cannot be measured in money', 'is only available to large firms', 'requires the firm to reduce its output'],
    'Each of the others costs profit at the moment it is pursued and is chosen anyway. Producing the same output for less raises profit instead, which is why it is the first thing a firm under pressure reaches for.'),
  qi(B4, `Raising what is spent on each chair from ${money(F.variable)} to ${money(F.welfareVariable)} to pay above the going rate costs the workshop ${money(F.welfareCost)} at ${money(F.profitMax.price)}. A firm may still choose it because:`,
    ['what it buys — fewer leavers — shows up somewhere other than in wages', 'the objective raises profit in the very same year in which it is first adopted', 'employee welfare is required of every business by law', `the ${money(F.welfareCost)} is recovered by charging a higher price`],
    `The extra ${money(F.welfareVariable - F.variable)} on each of ${qty(F.profitMax.q)} chairs is ${money(F.welfareCost)}, and the specification lists employee welfare as an objective in its own right — a firm may pursue it knowing the cost. What it buys appears under recruitment rather than under wages.`),

  /*
   * CUSTOMER SATISFACTION AND SOCIAL OBJECTIVES HAD NO ITEM OF THEIR OWN, which Layer 6 found: both
   * are named bullets at bus_spec.txt:785-786, both are taught, and every surface that assessed
   * their subsection — its recall, its quiz item and its flashcard — was about employee welfare, the
   * one of the three with a figure on the spine. Two of the six "other objectives" were therefore
   * taught and never checked. This item tests the property all three share and the schedule cannot.
   */
  qi(B4, 'Customer satisfaction and social objectives are alike, and unlike cost efficiency, in that each:',
    ['costs the firm money at the moment it is pursued', 'produces a return that can be read off the schedule', 'is required of a business by law rather than chosen', 'can only be pursued once profit has been maximised'],
    'Each of them spends now — a longer guarantee, a replacement given without argument, something done for the community — and returns something later or, for a social objective, never in money at all. Cost efficiency is the one objective at 3 · c that costs nothing, because producing the same output for less raises profit instead.'),

  /* ── Block 5 · Business choices ───────────────────────────────────────── */
  qi(B5, 'The opportunity cost of a decision is:',
    ['the value of the next best alternative that was given up', 'the total amount of money spent on the option chosen', 'the sum of the values of every alternative given up', 'the difference between the revenue and the cost of the option chosen'],
    'It is the value of what was NOT chosen, and no money changes hands over it. A choice that costs nothing to make can carry a very large opportunity cost, which is precisely when the idea is worth having.'),
  qi(B5, `A founder can run her workshop for ${money(F.profitMax.profit)}, or take one of three other posts worth ${F.alternatives.map(([, v]) => money(v)).join(', ')}. The opportunity cost of running the workshop is:`,
    [money(F.opportunityCost), money(F.wrongSum), money(F.profitMax.profit), money(F.economicGain)],
    `The three alternatives are three uses of the same single year, so only one could have been taken and only one was given up — the best of them. ${money(F.wrongSum)} adds all three, ${money(F.profitMax.profit)} is what she earns, and ${money(F.economicGain)} is the gain rather than the cost.`),
  qi(B5, `Adding the three forgone alternatives together gives ${money(F.wrongSum)}. The reason this is wrong is that the alternatives:`,
    ['could not all have been taken, because there is only one year', 'are not really worth the amounts that the founder has estimated each of them at', 'include the option she actually chose', 'have to be adjusted for the risk attached to each'],
    `They are mutually exclusive: taking the salaried post is not compatible with taking the agency. The error is not a small overstatement — ${money(F.wrongSum)} makes a workshop earning ${money(F.profitMax.profit)} look like a loss when the founder is in fact ${money(F.economicGain)} better off than her best alternative.`),
  qi(B5, 'Which of the following is a TRADE-OFF rather than an opportunity cost?',
    ['Dropping the price a little in order to sell more chairs', 'Leaving a salaried post in order to start the workshop', 'Using the unit for storage instead of letting it to another firm', 'Choosing one of three job offers'],
    'A trade-off is a matter of degree — the firm chooses how much, and could have chosen a little more or a little less. The other three are whole options where one is taken and another given up, with nothing available in between.'),
  qi(B5, `Moving from ${money(F.profitMax.price)} to ${money(F.salesMax.price)} costs ${money(F.tradeSales.profit)} of profit and gains ${qty(F.tradeSales.units)} chairs. Going on to ${money(F.marketShare.price)} gains a further ${qty(F.tradeShare.units - F.tradeSales.units)} chairs and costs a further ${money(F.tradeShare.profit - F.tradeSales.profit)}. This shows that:`,
    ['the rate of exchange gets worse the further the trade-off is taken', 'the trade-off is worth making at any point on the schedule', 'revenue and profit always move in opposite directions', 'the firm should always choose the largest output it can sustain'],
    `The first ${qty(F.tradeSales.units)} chairs cost ${money(F.tradeSales.profit)} and the next ${qty(F.tradeShare.units - F.tradeSales.units)} cost ${money(F.tradeShare.profit - F.tradeSales.profit)}. A trade-off that is worth making in small amounts is not automatically worth making in large ones, which is the whole of the judgement a question on this leaf is asking for.`),
]);

/* ══ Practice ═════════════════════════════════════════════════════════════ */
/*
 * EIGHT ITEMS, ONE PER BUSINESS COMMAND WORD, at the census tariffs for UNIT 1 — and every one
 * anchored in a short case extract, which is `topFix-05`'s one clause that is right about the paper.
 * `Construct (4)` is "requires students to draw an accurately labelled diagram", and the diagram this
 * section can ask for is the profit curve: it is the only drawing in the topic whose labels are
 * settled by arithmetic rather than by taste.
 */
const pr = (block, command, marks, question, guidance) => ({ id: id('practice', question), block, command, marks, question, guidance });

const CASE = `${F.name} is ${F.what}. Its fixed costs are ${money(F.fixed)} a year and each ${F.unit} costs ${money(F.variable)} to make. Demand is ${F.demand}, where Q is chairs a year and P is the price in dollars.`;

export const PRACTICE = [
  pr(B1, 'Define', 2, "A workshop's owner describes one of her machinists as 'an intrapreneur'. Define the term 'intrapreneurship'. (2 marks)",
    'Two marks means two separate things to say, and the second is not a rewording of the first. Settle first where the behaviour happens, and then what is absent from it — because the whole meaning of the word is the contrast with entrepreneurship. An example of somebody having a good idea at work will not substitute for either half.\n'
    + 'Intrapreneurship is entrepreneurial behaviour by an employee INSIDE an existing business (1 mark) — taking the initiative to identify an opportunity and carry it through — where the FIRM rather than the individual bears the financial risk (1 mark). An answer that says "being innovative at work" has neither half: it does not say who carries the loss, which is the distinction the term exists to make.'),

  pr(B2, 'Explain', 4, `A cabinetmaker earning ${money(F.opportunityCost)} a year decides not to set up on her own, although she has the savings and the skills to do so. Explain one barrier to entrepreneurship that this suggests. (4 marks)`,
    'An Explain needs a cause and its effect supported by a detail, so choose ONE barrier and take it all the way rather than listing several. The trap is in the wording: she has the savings and the skills, so two of the four barriers have been ruled out by the question itself. Use the figure — it is there because the barrier that is left is the one it measures.\n'
    + `The barrier is opportunity cost: starting means giving up the best alternative use of her year (1 mark), which here is the ${money(F.opportunityCost)} she already earns (1 mark). The business would have to earn more than that before she is better off running it (1 mark), so the barrier rises with how employable she is — somebody earning half as much faces a lower barrier from exactly the same business (1 mark). An answer naming finance or skills has used a barrier the question has already excluded.`),

  pr(B3, 'Analyse', 6, `${CASE} The founder decides to make ${qty(F.satisficeChairsPerDay)} chairs on each of ${qty(F.workingDays)} working days rather than ${qty(F.profitMaxPerDay)}. Analyse this decision as an example of profit satisficing. (6 marks)`,
    'Analyse wants a brief chain of reasoning and, where data is given, interpretation of it — and it does not include evaluation, so do not say whether the decision is a good one. The chain has to get from the working year she chose to the profit that follows, using the schedule. Work out both prices before you start writing: the comparison is the interpretation.\n'
    + `Satisficing means taking a profit that is good enough rather than the largest available (1 mark). She chooses the WORKING YEAR first: ${qty(F.satisficeChairsPerDay)} chairs across ${qty(F.workingDays)} days is ${qty(F.satisfice.q)} chairs (1 mark), and the schedule says that many sell at ${money(F.satisfice.price)} (1 mark), earning ${money(F.satisfice.profit)} (1 mark). A maximiser would choose the PRICE first — ${money(F.profitMax.price)}, selling ${qty(F.profitMax.q)} and earning ${money(F.profitMax.profit)} (1 mark) — so she has exchanged ${money(F.tradeSatisfice.profit)} of profit for ${qty(F.tradeSatisfice.units)} chairs she does not have to make (1 mark). It remains a financial motive because the test is still a figure: ${money(F.satisfice.profit)} against the ${money(F.opportunityCost)} she could earn elsewhere.`),

  pr(B4, 'Calculate', 4, `${CASE} Calculate the price at which the workshop maximises profit, and the profit it earns there. (4 marks)`,
    'Appendix 6 says workings should be given for a Calculate, and here the workings are most of the answer: a price with no arithmetic behind it cannot be distinguished from a guess. Set out profit at several prices rather than trying to reach the answer in one step, and work out the contribution per chair first, because every line then uses it.\n'
    + `Contribution is price minus the ${money(F.variable)} it costs to make one, and profit is contribution × quantity − ${money(F.fixed)} (1 mark). At ${money(F.salesMax.price)}: Q = ${qty(F.salesMax.q)}, profit = ${money(F.salesMax.price - F.variable)} × ${qty(F.salesMax.q)} − ${money(F.fixed)} = ${money(F.salesMax.profit)}. At ${money(F.profitMax.price)}: Q = ${qty(F.profitMax.q)}, profit = ${money(F.profitMax.price - F.variable)} × ${qty(F.profitMax.q)} − ${money(F.fixed)} = ${money(F.profitMax.profit)} (1 mark). At ${money(F.satisfice.price)}: Q = ${qty(F.satisfice.q)}, profit = ${money(F.satisfice.price - F.variable)} × ${qty(F.satisfice.q)} − ${money(F.fixed)} = ${money(F.satisfice.profit)} (1 mark). Profit is highest at ${money(F.profitMax.price)}, where it is ${money(F.profitMax.profit)} (1 mark). The commonest slip is to stop at the revenue-maximising ${money(F.salesMax.price)}, which gives the largest revenue at ${money(F.salesMax.revenue)} and ${money(F.tradeSales.profit)} less profit.`),

  pr(B4, 'Construct', 4, `${CASE} Construct a diagram showing the workshop's profit at each price, labelling the range within which it survives and the price at which profit is maximised. (4 marks)`,
    'Construct requires an accurately labelled diagram, so the labels ARE the command word rather than decoration added afterwards. Work out four or five points before drawing anything, because a curve whose peak is not where the arithmetic puts it is not an accurate diagram. Put profit on the vertical axis and price on the horizontal, and draw the axes first.\n'
    + `Axes labelled profit (vertical) and price (horizontal), with a curve rising to a peak and falling away on BOTH sides (1 mark). The curve crosses zero at ${money(F.breakEvenLow)} and again at ${money(F.breakEvenHigh)} (1 mark). The survival range is marked as the span BETWEEN those two prices rather than as a point, because the firm covers its costs anywhere inside it (1 mark). The peak is marked at ${money(F.profitMax.price)} with the profit there shown as ${money(F.profitMax.profit)} (1 mark). Drawing a line that rises throughout is the commonest error, and it is the one the arithmetic settles: profit falls after ${money(F.profitMax.price)} because the chairs lost are worth more than the margin gained.`),

  pr(B4, 'Assess', 10, `${CASE} A retailer offers to take ${qty(F.marketShare.q)} chairs a year if the workshop prices at ${money(F.marketShare.price)}. Assess whether the founder should accept in order to build market share. (10 marks)`,
    'Appendix 6 defines Assess as a balanced and wide-ranging chain of reasoning leading to a supported judgement; in Units 1 and 2 it carries ten marks. The judgement is the part most answers leave out, and "it depends" is not one — say WHICH factor decides it. Plan two considerations on each side and your decision before writing, and price the decision first, because the figure is what makes the argument concrete.\n'
    + `The cost is exact and it is the whole of the profit. At ${money(F.profitMax.price)} the workshop earns ${money(F.profitMax.profit)}; at ${money(F.marketShare.price)} it sells ${qty(F.marketShare.q)} chairs and earns ${money(F.marketShare.profit)}, because ${money(F.marketShare.price)} is the bottom of the survival range. So the offer exchanges ${money(F.tradeShare.profit)} for ${qty(F.tradeShare.units)} extra chairs, and the founder's own opportunity cost of ${money(F.opportunityCost)} is no longer covered — for a year she would be worse off than taking salaried work.\n`
    + `For accepting: a single buyer taking ${qty(F.marketShare.q)} chairs removes the uncertainty of finding customers, which is the thing this size of firm can least afford to carry. Volume also makes cost efficiency reachable — the objective that conflicts with nothing — and cutting the cost of a chair from ${money(F.variable)} to ${money(F.efficientVariable)} saves ${money(F.variable - F.efficientVariable)} on every chair made, which at the ${qty(F.marketShare.q)} this offer requires is ${money((F.variable - F.efficientVariable) * F.marketShare.q)} rather than the ${money(F.efficiencyGain)} the same saving is worth at ${money(F.profitMax.price)}. That alone would turn the zero-profit year into a positive one. And a retailer who has bought once reorders, so the share may be worth more next year than this.\n`
    + `Against: the workshop has no margin left for the thing it cannot predict. A rise in timber prices, or one chair in fifty coming back, has nothing to absorb it, and the firm is at the edge of the range where it survives. It also becomes dependent on one buyer who now knows the workshop will trade at cost.\n`
    + `The factor that decides it is DURATION rather than volume. A year at ${money(F.marketShare.price)} that establishes the workshop as the retailer's supplier may be worth ${money(F.tradeShare.profit)}; an open-ended agreement at that price is a business that can never earn anything, because the buyer has no reason to offer more once the price is set. So the judgement is: accept only with an end date and a stated price for the second year, and use the volume to reach the lower cost per chair while the agreement lasts. Accepting it open-ended, at the bottom of the survival range, is the version of this that cannot recover.`),

  pr(B5, 'Discuss', 8, `A cabinetmaker can earn ${money(F.opportunityCost)} managing a larger workshop, ${money(F.alternatives[1][1])} taking a supplier's agency, or ${money(F.alternatives[2][1])} working at the bench. She instead runs her own workshop, earning ${money(F.profitMax.profit)}. Discuss whether this was the right decision. (8 marks)`,
    'Appendix 6 says a Discuss needs logical chains of reasoning in context, showing causes and effects, with a brief assessment showing an awareness of competing arguments — a brief assessment rather than a full evaluation. Identify the opportunity cost before anything else: the question lists three alternatives in order to see whether you select or add them.\n'
    + `The three alternatives are three uses of the same year, so only one was given up. The opportunity cost is the best of them, ${money(F.opportunityCost)}, and against ${money(F.profitMax.profit)} the founder is ${money(F.economicGain)} better off. Adding all three gives ${money(F.wrongSum)}, a figure larger than anything ever available to her, and it would reverse the recommendation — making a workshop that earns ${money(F.profitMax.profit)} look like a loss of ${money(F.wrongSum - F.profitMax.profit)}.\n`
    + `Against the decision: ${money(F.economicGain)} is a thin margin for the risk taken. The salaried post pays whether or not the year goes well, while ${money(F.profitMax.profit)} assumes she reaches the profit-maximising price and holds it; one bad year and the comparison reverses. She also gives up what a salary buys — a known income and somebody else carrying the uncertainty — and those do not appear in either figure.\n`
    + `On balance, the decision is right on the arithmetic and narrowly so. It depends on whether the ${money(F.economicGain)} is reliable and on what the non-financial motives are worth to her: if independence or the working year matter, the margin need not be large to justify the choice, and if they do not, ${money(F.economicGain)} is a small return for carrying the risk herself.`),

  pr(B4, 'Evaluate', 20, `${CASE} Evaluate the view that a small business should always pursue profit maximisation. (20 marks)`,
    'Evaluate requires fully developed chains of reasoning showing a range of causes and effects, and a conclusion that proposes a solution or a recommendation. "Always" is the word to argue with: a twenty-mark answer should establish when the view holds and when it does not, rather than agreeing or disagreeing throughout. Use the schedule, because it turns every claim in this question into a figure, and decide your line before you start.\n'
    + `The case FOR. Profit maximisation is the only objective on the list that is unambiguous: one price, ${money(F.profitMax.price)}, found by comparing margin against volume, giving ${qty(F.profitMax.q)} chairs and ${money(F.profitMax.profit)}. Every other objective costs something measurable against it — sales maximisation ${money(F.tradeSales.profit)}, market share the whole ${money(F.tradeShare.profit)}, employee welfare ${money(F.welfareCost)} — and a small firm has the least capacity to absorb any of them. Profit is also what makes survival possible: it is the reserve that lets a firm absorb the uncertainty it cannot price in, and a workshop at ${money(F.marketShare.price)} has nothing to absorb a rise in timber prices with. And the founder's own opportunity cost of ${money(F.opportunityCost)} has to be covered before the business is worth running at all, which is an argument for maximising rather than for any of the alternatives.\n`
    + `The case AGAINST. The specification lists eight objectives, and it lists them because firms pursue them. Survival dominates in a bad year, when a firm will take work at a price it would otherwise refuse. Market share may be worth the profit forgone if the volume buys a customer who reorders. Cost efficiency is not a rival at all and should be pursued alongside: taking the cost of a chair from ${money(F.variable)} to ${money(F.efficientVariable)} adds ${money(F.efficiencyGain)} at the same price and more once the price falls to ${money(F.efficient.price)}. And the motives chapter supplies the strongest objection: a founder whose reason for beginning was independence, home working or an ethical stance has fixed the scale before the price is considered, so satisficing at ${money(F.satisfice.price)} for ${money(F.satisfice.profit)} is not a failure to maximise but the motive being served — ${money(F.tradeSatisfice.profit)} exchanged for ${qty(F.tradeSatisfice.units)} chairs she does not have to make.\n`
    + `The judgement. The word "always" is what makes the view wrong, and the reason is that profit maximisation answers a question about PRICE while the objectives it competes with answer questions about time, risk and purpose. Two things follow. First, cost efficiency should be separated out of the argument entirely: it conflicts with nothing, so a firm that treats it as one option among several has misread the list. Second, the right objective depends on where the firm is: below the point where the founder's opportunity cost is covered, maximising is not one choice among several but the condition of the business continuing to exist; above it, the remaining profit is being exchanged for something, and the question is only whether the founder values that thing more than the money. So the recommendation is to maximise until ${money(F.opportunityCost)} is cleared, pursue cost efficiency at every price, and treat everything above that floor as a deliberate purchase of time, volume or purpose — priced, so that the founder knows what she is buying.`),
];

/* ══ Flashcards ═══════════════════════════════════════════════════════════ */
/*
 * `structure-07` is that two 'chain' cards each appeared twice — 22 cards, 20 unique fronts. The
 * runner refuses a duplicate front, and both of the duplicated cards are gone anyway: one traced a
 * chain from an opportunity and the other traced the impact of leadership styles, which this section
 * must not teach.
 */
const card = (front, back) => ({ id: id('flashcard', front), front, back });

export const FLASHCARDS = [
  card('Define an entrepreneur.', 'Somebody who takes the initiative to set up and run a business AND bears the financial risk of doing so. Both halves are required; nothing in the definition requires the idea to be new.'),
  card('What five things does the specification list under "Role of an entrepreneur"?', 'Creating and setting up a business; running and expanding or developing it; innovation within a business (intrapreneurship); barriers to entrepreneurship; and anticipating risk and uncertainty. The fourth is an obstacle to the role rather than a part of it, which is why the characteristics are read off the other four.'),
  card('Define intrapreneurship.', 'Entrepreneurial behaviour by an employee inside an existing firm: the initiative without the personal financial risk, which the firm carries. The gain belongs to the firm for the same reason.'),
  card('In what order is a business set up, and why does the order matter?', 'Identify, test, cost and raise, commit. Each step needs the one before it, and committing the capital is the point after which the alternatives have closed — so raising money before testing the idea commits it to an untested idea.'),
  card('What is the difference between growing and developing?', 'Growing is doing more of the same; developing is doing something different. A firm can develop without growing at all, and a firm doing both at once has taken two risks in one decision.'),
  card('How is a risk anticipated, and how is an uncertainty?', 'A risk carries a figure, so it is priced into the cost of the product. An uncertainty carries none, so it is held against with cash and flexibility. Anticipating an uncertainty by estimating it misunderstands the word.'),
  card('What do the two methods of anticipating cost?', `Pricing a risk in raises the variable cost, which raises the price and lowers the quantity. Holding cash leaves capital idle — three months of ${F.name}'s fixed costs is ${money(F.fixed / 4)} earning nothing. Neither is free, which is why no firm anticipates everything.`),
  card('Name the four barriers to entrepreneurship and what each obstructs.', `${BARRIERS.map(([k, , obstructs]) => `${k} (${obstructs.replace(/^Obstructs /, '').replace(/^This is /, '').replace(/\.$/, '')})`).join('; ')}. The specification names none of them, so they are derived from the role.`),
  card('Which barrier rises as the founder becomes more employable?', `Opportunity cost. Somebody who could earn ${money(F.opportunityCost)} in salaried work gives up more by starting than somebody who could earn half that, from the same business. It is the barrier that appears on no list of external obstacles.`),
  card('Why is "get a loan" a poor answer to every barrier?', 'It lowers the capital barrier and raises the risk barrier, because more is lost if the firm fails. A single remedy that works on all four is a sign the barriers have not been distinguished.'),
  card('How do you produce the characteristics an entrepreneur needs, without a list?', `Read them off the role: each requirement in sub-topic 1 implies the quality needed to meet it — ${CHARACTERISTICS.map(([k, ref]) => `${k} (${ref})`).join(', ')}.`),
  card('What is the difference between a characteristic and a skill?', 'A characteristic is a disposition — how somebody is. A skill is learned: costing, selling, organising the work. Half the leaf is about each, which is why an answer built entirely on personality answers half the question.'),
  card('Name the two financial motives for setting up a business.', `${FINANCIAL_MOTIVES.map(([k]) => k).join(' and ')}. Both are financial because the test applied is a figure; one is a maximum and the other a floor.`),
  card('Define profit satisficing.', `Taking a profit that is good enough rather than the largest available. The founder chooses the working year first and lets the profit follow: ${qty(F.satisficeChairsPerDay)} chairs a day is ${qty(F.satisfice.q)} a year at ${money(F.satisfice.price)}, earning ${money(F.satisfice.profit)} — ${money(F.tradeSatisfice.profit)} below the maximum.`),
  card('Name the four non-financial motives the specification lists.', `${NON_FINANCIAL_MOTIVES.map(([k]) => k).join(', ')}. All four are reasons a person set the business up, rather than things the firm later adopts.`),
  card('How can you tell an ethical stance is a motive rather than marketing?', 'It came first, and it costs something. The test is what happens when it becomes expensive: a stance abandoned at that point was not the reason the business exists.'),
  card('What distinguishes a social entrepreneur from any other founder?', 'Who the trading surplus belongs to. It is still a business — it sells, covers its costs and must survive — so earning a surplus matters more rather than less; what differs is that it funds the purpose.'),
  card('Why do independence and home working predict satisficing?', 'Each caps the scale of the firm before the price is considered — no outside investor, or no more room than the house holds — so the profit is capped with it and the founder takes what that scale allows.'),
  card('What is survival, expressed on a schedule?', `A RANGE of prices rather than a point. ${F.name} covers its costs anywhere from ${money(F.breakEvenLow)} to ${money(F.breakEvenHigh)}, and every other objective picks a price inside it.`),
  card('Why is profit maximisation not the same as charging the most you can?', `At ${money(F.breakEvenHigh)} only ${qty(F.qAt(F.breakEvenHigh))} chairs sell, which is too few to cover ${money(F.fixed)} of fixed costs, so the workshop earns no profit. The maximum is a balance between margin and volume and sits at ${money(F.profitMax.price)}.`),
  card('What does it mean to say profit is a hill?', `Profit falls away on BOTH sides of the peak. ${money(F.salesMax.price)} and ${money(F.satisfice.price)} both earn ${money(F.salesMax.profit)} — one by selling ${qty(F.salesMax.q)} cheaply, the other ${qty(F.satisfice.q)} dearly.`),
  card('Name the six "other objectives" at 1.3.5 · 3c.', `${OTHER_OBJECTIVES.join(', ')}. The specification's word is SALES maximisation; revenue maximisation does not appear in it.`),
  card('What is the difference between sales maximisation and market share?', `Different prices. Sales maximisation takes the largest revenue, ${money(F.salesMax.revenue)} at ${money(F.salesMax.price)}. Market share takes the largest output the firm can sustain, ${qty(F.marketShare.q)} chairs at ${money(F.marketShare.price)} — the edge of the survival range, earning ${money(F.marketShare.profit)}.`),
  card('What are the TWO effects of cost efficiency?', `Profit rises at the old price — ${money(F.efficiencyGain)} when the cost of a chair falls from ${money(F.variable)} to ${money(F.efficientVariable)} — AND the profit-maximising price falls, to ${money(F.efficient.price)}, taking output to ${qty(F.efficient.q)} and profit to ${money(F.efficient.profit)}. Most answers give only the first.`),
  card('Which objective conflicts with none of the others, and why?', `Cost efficiency. It produces the same output for less, so it raises profit instead of costing it. The other five at 3 · c each cost profit at the moment they are pursued and are chosen anyway.`),
  card('What do employee welfare, customer satisfaction and social objectives have in common?', `Each costs money now and returns something later or not at all. Paying above the going rate costs ${F.name} ${money(F.welfareCost)}, and what it buys — fewer leavers — appears under recruitment rather than under wages.`),
  card('Define opportunity cost.', 'The value of the NEXT BEST alternative given up. Not the money spent on the option chosen, and not the sum of everything forgone.'),
  card('Why can forgone alternatives not be added together?', `They are mutually exclusive — uses of the same single resource, so only one could have been taken. Adding ${F.name}'s founder's three alternatives gives ${money(F.wrongSum)} and makes a workshop earning ${money(F.profitMax.profit)} look like a loss of ${money(F.wrongSum - F.profitMax.profit)}, when she is ${money(F.economicGain)} better off than her best alternative.`),
  card('What is the difference between an opportunity cost and a trade-off?', 'An opportunity cost is a switch: whole options, one taken and one given up. A trade-off is a dial: a matter of degree, where the firm chooses how much. A firm faces trade-offs daily and an opportunity cost only when a whole alternative is offered.'),
  card('Does a trade-off exchange at a constant rate?', `No, and saying so is the judgement a question wants. The first ${qty(F.tradeSales.units)} chairs cost ${money(F.tradeSales.profit)} of profit; the next ${qty(F.tradeShare.units - F.tradeSales.units)} cost ${money(F.tradeShare.profit - F.tradeSales.profit)}. Worth making in small amounts is not worth making in large ones.`),
];

/* ══ Common mistakes — eight, where the section had none ══════════════════ */
/*
 * `structure-05` IS THE MOST USEFUL FINDING IN THE PACKET AND IT ARRIVES WITH ITS OWN ANSWER. It
 * says the live misconceptions are filler — "the biggest barrier is lack of a good idea", "the best
 * decision is one with no trade-offs", "a good manager can achieve all objectives at once" — things
 * no student writes, and it NAMES the five that are real: "anyone who runs a business is an
 * entrepreneur", "born not made", "opportunity cost = money spent", "all businesses aim to maximise
 * profit", "social enterprises are charities". All five are below.
 *
 * The fifth is rewritten as SOCIAL ENTREPRENEURS rather than social enterprises, and the change is
 * not cosmetic: a social enterprise is a FORM of business at 2.3.1 · 4b, which `planning-raising-
 * finance` owns; social entrepreneurship is a MOTIVE at 1.3.5 · 2b, which this section owns. The
 * misconception is real in both places and only one of them is ours.
 */
const mistake = (title, looksLike, why, instead) => ({ id: id('mistake', title), title, looks_like: looksLike, why, instead });

export const MISTAKES = [
  mistake('Treating anyone who runs a business as an entrepreneur',
    '"The manager of the workshop is an entrepreneur because she runs it and takes decisions every day."',
    'The definition has two requirements: taking the initiative to set the business up, and bearing the financial risk. A salaried manager takes decisions and loses nothing if the firm fails, so she meets neither. A lender meets the second and not the first.',
    'Ask two questions of the person in the case: would the business exist if they had not begun it, and whose money is lost if it fails? Both must be yes.'),
  mistake('Adding "invents something new" to the definition',
    '"She is not really an entrepreneur — she just makes chairs, and chairs already existed."',
    'This is the same error in the opposite direction, and it denies the title to most of the businesses a case study will describe. Innovation appears at 1.3.5 · 1c as one of the things entrepreneurs DO, and as something that happens inside established firms too. It is part of the role, not a test of entry to it.',
    'Apply the two requirements and nothing else. If the idea is also new, that is a further point to make about the firm, not part of the definition.'),
  mistake('Writing that entrepreneurs are born and not made',
    '"The characteristics needed are determination, vision and confidence — you either have them or you do not."',
    'The leaf is "characteristics and skills required", so half of it is about things that are learned. An answer built entirely on personality has answered half the question — and it makes the barriers chapter incoherent, because a barrier that cannot be lowered is not worth naming.',
    'Split the answer: characteristics are dispositions read off the role; skills are costing, selling and organising, and the barriers chapter says how each is acquired.'),
  mistake('Defining opportunity cost as the money spent',
    '"The opportunity cost of the machinery was the $8,000 the workshop paid for it."',
    'Opportunity cost is the value of what was NOT chosen, and no money changes hands over it. The $8,000 is simply a cost. The opportunity cost is the best thing that $8,000 could have bought instead — or, where the resource is a year of the founder\'s time, the best alternative use of that year.',
    'Ask what the next best alternative was and what it was worth. If the answer is a figure that appears in the firm\'s accounts, it is a cost rather than an opportunity cost.'),
  mistake('Adding up every alternative that was given up',
    `"She turned down three posts worth ${F.alternatives.map(([, v]) => money(v)).join(', ')}, so the opportunity cost was ${money(F.wrongSum)}."`,
    `The three are three uses of the same single year, so only one could ever have been taken and only one was given up. ${money(F.wrongSum)} is larger than anything that was ever available, and it reverses the recommendation: it makes a workshop earning ${money(F.profitMax.profit)} look like a loss of ${money(F.wrongSum - F.profitMax.profit)} when the founder is ${money(F.economicGain)} better off than her best alternative.`,
    'Ask whether the alternatives could have been held at once. If they could not, exactly one of them — the best — is the opportunity cost.'),
  mistake('Assuming every business aims to maximise profit',
    '"The workshop will charge the profit-maximising price, because that is what businesses do."',
    'The specification lists eight objectives, and it lists them because firms pursue them. A founder whose motive was independence, home working or an ethical stance has fixed the scale before the price is considered; a firm in a bad year pursues survival; one entering a market may pursue share.',
    'Read the case for the MOTIVE before deciding the objective. The motives chapter comes before the objectives chapter for this reason.'),
  mistake('Treating a social entrepreneur as running a charity',
    '"A social entrepreneur does not need to make a profit, because the aim is to help people."',
    'A social entrepreneur runs a BUSINESS: it sells something, covers its costs and must survive. What differs is who the surplus belongs to — it funds the purpose rather than the founder — so earning one matters more here rather than less. A social business that runs out of money has stopped meeting the need entirely.',
    'Say what the surplus is FOR rather than whether there is one. That is the distinction the specification is drawing.'),
  mistake('Using "revenue maximisation" for the specification\'s sales maximisation',
    '"The firm pursues revenue maximisation, selling as many units as it can."',
    `The specification's term is sales maximisation (1.3.5 · 3c), and the sentence also runs two objectives together: the largest revenue and the largest volume are different prices. Here revenue peaks at ${money(F.salesMax.price)} with ${money(F.salesMax.revenue)}, while the largest sustainable volume is ${qty(F.marketShare.q)} chairs at ${money(F.marketShare.price)}, earning ${money(F.marketShare.revenue)} of revenue and no profit.`,
    'Use the specification\'s word, and say whether you mean revenue or units — they are different objectives at different prices.'),
];

/* ══ Extras ═══════════════════════════════════════════════════════════════ */

export const EXTRAS = {
  chains: [
    {
      title: 'Working out an opportunity cost without getting it wrong',
      steps: [
        'List what the resource could have been used for. Here the resource is one year of the founder\'s time, and there are four uses of it including the one she took.',
        'Check that the alternatives are mutually exclusive. They are: she cannot manage another workshop AND take the agency, because both need the same year.',
        `Take the BEST of the alternatives forgone — ${money(F.opportunityCost)} — and only that one. The other two are not costs of anything, because they were never available once the best was ruled out.`,
        `Compare it with what the chosen option earns: ${money(F.profitMax.profit)} against ${money(F.opportunityCost)}.`,
        `State the difference, which is the answer the comparison exists to produce: ${money(F.economicGain)} better off running the workshop than doing the best other thing.`,
      ],
      result: `The procedure is short and every step of it can go wrong. Skipping step 2 produces ${money(F.wrongSum)} and reverses the recommendation; skipping step 5 produces a cost with nothing to compare it to. And step 2 is the one that decides whether the question is about opportunity cost at all: where the alternatives COULD be held at once, they are not competing for the same resource and nothing was given up.`,
    },
    {
      title: 'Why a cheaper chair is worth selling more of',
      steps: [
        `${F.name} cuts what a ${F.unit} costs to make from ${money(F.variable)} to ${money(F.efficientVariable)} by reducing waste.`,
        `At the unchanged price of ${money(F.profitMax.price)} the workshop still sells ${qty(F.profitMax.q)} chairs, so the saving is ${money(F.variable - F.efficientVariable)} on each of them: ${money(F.efficiencyGain)}, taking profit from ${money(F.profitMax.profit)} to ${money(F.efficientAtOldPrice.profit)}.`,
        `But the contribution on each chair has risen too, so the chairs given up by a high price now cost the workshop more than they did.`,
        `The balance therefore moves: the profit-maximising price falls from ${money(F.profitMax.price)} to ${money(F.efficient.price)}, and output rises from ${qty(F.profitMax.q)} to ${qty(F.efficient.q)}.`,
        `Profit at the new price is ${money(F.efficient.profit)} — ${money(F.efficient.profit - F.efficientAtOldPrice.profit)} more than leaving the price alone would have earned.`,
      ],
      result: `Two effects, and most answers give one. Cost efficiency reaches the customer as well as the accounts: some of the saving is passed on as a lower price, and the firm sells more as a result. It is also the only objective at 1.3.5 · 3c that competes with none of the others, which is why it is the first thing a firm under pressure reaches for and the last thing it should have to justify.`,
    },
    {
      title: 'How one schedule produces four different objectives',
      steps: [
        `Start with the line: ${F.demand}, fixed costs ${money(F.fixed)}, ${money(F.variable)} to make a ${F.unit}.`,
        `Find where profit is zero. It happens twice, at ${money(F.breakEvenLow)} and ${money(F.breakEvenHigh)}, and everything between them is SURVIVAL — 1.3.5 · 3a, which is a range rather than a price.`,
        `Find the peak of the profit curve: ${money(F.profitMax.price)}, selling ${qty(F.profitMax.q)} and earning ${money(F.profitMax.profit)}. That is profit maximisation, 3 · b.`,
        `Find the peak of REVENUE instead, ignoring cost: ${money(F.salesMax.price)}, ${qty(F.salesMax.q)} chairs, ${money(F.salesMax.revenue)}. Sales maximisation sits below the profit peak because extra chairs always add revenue and only add profit while the margin holds.`,
        `Take the largest output the firm can reach while surviving — the bottom of the range, ${money(F.marketShare.price)}, ${qty(F.marketShare.q)} chairs. That is market share, and the profit there is ${money(F.marketShare.profit)}.`,
      ],
      result: `Four objectives, one line, and the conflicts between them are subtractions rather than opinions: ${money(F.tradeSales.profit)} to move from profit to sales maximisation, the whole ${money(F.tradeShare.profit)} to reach the largest sustainable volume. "Objectives conflict" is a sentence; this is the size of the conflict, and the size is what an evaluation is built out of.`,
    },
    {
      title: 'What the founder gives up by working a shorter year',
      steps: [
        `The profit-maximising choice is a price: ${money(F.profitMax.price)}, which sells ${qty(F.profitMax.q)} chairs — ${qty(F.profitMaxPerDay)} on each of ${qty(F.workingDays)} working days.`,
        `The founder instead chooses the YEAR: ${qty(F.satisficeChairsPerDay)} chairs a day, so ${qty(F.satisfice.q)} in the year.`,
        `The schedule then fixes the price rather than the founder: ${qty(F.satisfice.q)} chairs sell at ${money(F.satisfice.price)}.`,
        `Profit follows from that: ${money(F.satisfice.profit)}, which is ${money(F.tradeSatisfice.profit)} below the maximum.`,
        `And the test that makes it a choice rather than a mistake: ${money(F.satisfice.profit)} still clears the ${money(F.opportunityCost)} she could have earned elsewhere.`,
      ],
      result: `Satisficing is not a smaller ambition but a different order of decision — the working year first, the profit second. Notice where ${money(F.satisfice.price)} sits: it earns the same ${money(F.satisfice.profit)} as the sales-maximising ${money(F.salesMax.price)}, on the opposite side of the peak. One firm gets there by selling ${qty(F.salesMax.q)} chairs cheaply and the other by selling ${qty(F.satisfice.q)} dearly, and their accounts look identical.`,
    },
  ],
  evaluation: [
    {
      title: 'Choosing an objective for a particular firm',
      content: `Four questions, in this order, and the reason for the order is that each one can rule the next out. FIRST: is the firm inside the range where it survives? On ${F.name}'s schedule that is ${money(F.breakEvenLow)} to ${money(F.breakEvenHigh)}, and outside it nothing else is worth discussing — survival is listed first at 1.3.5 · 3a because a firm that does not survive pursues nothing. SECOND: is the founder's own opportunity cost covered? ${money(F.opportunityCost)} is what her year is worth elsewhere, so a business earning less than that is one she should close, whatever objective it is pursuing; below that line maximising is not one choice among several but the condition of the firm continuing. THIRD: what was the MOTIVE? This is the question most answers never ask, and it decides more than the figures do. A founder whose reason for beginning was independence, home working or an ethical stance has capped the scale before the price is considered, so satisficing at ${money(F.satisfice.price)} for ${money(F.satisfice.profit)} is the motive being served rather than a failure to maximise. FOURTH: does the volume buy anything? Market share costs the whole ${money(F.tradeShare.profit)} and is justified only by what comes after it — a buyer who reorders, a reputation, a lower cost per chair — so the question is always what the share is FOR. And one objective sits outside the sequence entirely: cost efficiency conflicts with nothing, adding ${money(F.efficiencyGain)} at the same price and more once the price adjusts to ${money(F.efficient.price)}, so it should be pursued at every answer to every question above.`,
    },
    {
      title: 'Judging a founder\'s decision: what the profit figure does and does not tell you',
      content: `A profit figure answers two questions and is silent on three more, and weak answers use it for all five. It tells you whether the firm SURVIVES: anything from ${money(F.breakEvenLow)} to ${money(F.breakEvenHigh)} covers ${money(F.fixed)} of fixed costs and the ${money(F.variable)} each chair takes to make. And it tells you how the firm compares with itself at another price — ${money(F.profitMax.profit)} at the peak against ${money(F.salesMax.profit)} at ${money(F.salesMax.price)}, which is what makes a trade-off measurable. What it does NOT tell you is, first, whether the founder should be doing this at all: that needs the opportunity cost, ${money(F.opportunityCost)}, and ${money(F.profitMax.profit)} is only ${money(F.economicGain)} better than simply taking the salaried post. Second, it does not tell you which side of the hill the firm is on: ${money(F.salesMax.profit)} is earned at ${money(F.salesMax.price)} selling ${qty(F.salesMax.q)} chairs AND at ${money(F.satisfice.price)} selling ${qty(F.satisfice.q)}, so two firms with identical profits can be running opposite businesses, one at volume and one at margin, with different risks and different working years. Third, it does not tell you what was being bought with the profit that was not taken — pay above the going rate at ${money(F.welfareCost)}, a retailer's order, a shorter year — and the specification lists those as objectives precisely because firms buy them deliberately. So an answer that judges a founder from the profit line has used two of the five things it needed, and the three it left out are the ones that decide whether the number is good.`,
    },
  ],
};
