/**
 * PACKET 25 — market-failure: quiz, practice, flashcards, common mistakes and chains.
 *
 * WHAT THE MARCH BANK GOT WRONG, and which findings about it were right.
 *
 * Q18 keyed the welfare loss as "the area between the MSC and MPC curves, up to the free market
 * quantity" — which is the TOTAL EXTERNAL COST, while Q5 in the same bank keyed the correct triangle
 * and named that very area as a distractor. A pre-test could draw both and mark opposite things right
 * (quiz-01, structure-10). Packet 0 fixed the item in place and a verifier confirmed it on 11
 * September, so quiz-01 is already closed and is not re-claimed here. What this bank does instead is
 * make the mistake unavailable: the two areas are drawn on the same axes in diagram 3, they are
 * ' + money(K.welfareLoss) + ' and ' + money(K.totalExternalCost) + ' in one market, and a
 * subsection and a mistake card are about nothing else.
 *
 * PRACTICE IS TEN ITEMS AND ALL EIGHT IAL ECONOMICS COMMAND WORDS. The March five carried:
 *   - an "Outline information failure examples" item — Outline is not an IAL command word in either
 *     subject, and `information failure` is 0 in econ_spec.txt. Deleted, not re-tariffed.
 *   - p1, "Explain two reasons why public goods would not be provided by the free market (6 marks)",
 *     whose model answer attributed free-riding to NON-RIVALRY (practice-01). It is caused by
 *     non-excludability, as the section's own body said three screens earlier. The item is rebuilt at
 *     the Explain tariff of 4, with "may not" rather than "would not" — 3b's own modal verb.
 *   - nothing at all on moral hazard, on imperfect market information, or on speculation and market
 *     bubbles: three of the six sub-topics, with no practice item between them.
 *
 * EVERY GUIDANCE IS AT LEAST TWO PARAGRAPHS AND THE FIRST GIVES NOTHING AWAY. `InlinePractice.jsx`
 * prints `guidance.split('\n')[0]` above the answer box in guided mode, which `getPracticeMode` gives
 * to every item except the first and last of a section — so a one-paragraph guidance is the whole
 * mark scheme printed over the empty box asking the student to write it. That is `practice.opening`,
 * it is new since packet 24, and it fires on 160 items across the repository; none of them is here.
 */
import { id, hash8, money, qty, valueAt, KUMBE, AMARA } from './_packet25-util.mjs';
import { B1, B2, B3, B4, B5, B6, B7, B8 } from './_packet25-content.mjs';

const K = KUMBE, A = AMARA;
const qi = (block, question, options, explanation) => ({ id: id('quiz', question), block, question, options, explanation });

/*
 * EVERY ITEM IS AUTHORED WITH ITS KEY FIRST and the key is then DEALT into a position, as packet 24
 * did. Hand-picking positions produces exactly the lumpy distribution `quiz.histogram` looks for;
 * ranking items by a hash of their own stem and taking the rank modulo four gives an even spread by
 * construction, is stable across edits, and a verifier can reproduce it from this file alone. The
 * March bank's answer positions are not the point — options are shuffled at render since F074 — but
 * a bank that is 100% one position is answerable without reading it, and the shuffle declines to run
 * on any question whose explanation names an option by letter.
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

/* ══ Quiz ═════════════════════════════════════════════════════════════════
 * The first THREE carry no block and are therefore the pre-test pool: PreTest.jsx takes the first
 * three items no block has reserved, in array order. They are first because a free student's bank is
 * sliced server-side (F086, and freeQuizPayload() since 16 Sep), so a pre-test whose pool sat at the
 * end of the array would serve that student PINNED questions instead — and because a pre-test item
 * that a chapter check-in then asks again is packet 2.4's finding.
 */
export const QUIZ = placeKeys([
  qi(null, 'Market failure occurs when:',
    ['too much or too little of a good is produced or consumed against the social optimum', 'the market stops functioning altogether, so no trade in the good takes place any more', 'the price of a good rises beyond what most people can afford to pay', 'firms in the market make losses and leave it to its competitors'],
    'The specification defines market failure by the QUANTITY: too much or too little compared with the socially optimal level of output. A market can be busy, competitive and profitable and still be failing, which is why the other three describe different problems.'),
  qi(null, 'A public good is one that is:',
    ['non-rival and non-excludable', 'provided by a government department rather than by any private firm', 'available to everybody at a low price', 'essential to everybody in the country'],
    'Both tests are about the properties of the good, not about who provides it or what it costs. A good provided by a government can be perfectly rival and excludable — a school place is both — and a cheap good is still a private good.'),
  qi(null, 'Asymmetric information means that:',
    ['one party to a transaction knows more than the other', 'neither party has complete information about the good', 'the information available is incorrect', 'information is expensive to obtain'],
    'Asymmetry is about the GAP between the two sides, not about how much either of them knows. Two equally ill-informed parties have symmetric information, which is a different situation with a different consequence.'),

  /* ── Block 1 · Why markets fail ── */
  qi(B1, 'Which of the following is NOT one of the five sources of market failure the specification lists?',
    ['a firm holding a large share of its market', 'the free-rider problem and non-provision of public goods', 'moral hazard', 'speculation and market bubbles'],
    'The five are externalities; the free-rider problem and non-provision of public goods; imperfect market information; moral hazard; and speculation and market bubbles. A firm\'s market share is a Unit 3 topic and does not appear on this list.'),
  qi(B1, 'A market in which resources are misallocated is best described as one in which:',
    ['trade continues normally and the quantity produced is wrong', 'trade has broken down completely and nothing at all is being exchanged', 'prices have risen faster than incomes', 'firms are making losses and leaving'],
    'Market failure is a misallocation, not a collapse. The market usually functions perfectly well and directs resources to the wrong uses in the wrong amounts, which is why the failure is invisible from inside the transaction.'),
  qi(B1, 'In the standard market failure story, the reason buyers and sellers reach the wrong quantity is that:',
    ['each of them responds rationally to a price that leaves something out', 'at least one of them is behaving dishonestly', 'one of them has far more bargaining power than the other and is using it', 'the government has intervened in the market'],
    'Nobody in the model behaves badly and nobody needs to. The price fails to carry a cost or a benefit, both sides act sensibly on the price they can see, and their separate rational choices add up to a quantity away from the social optimum.'),
  qi(B1, 'Which question best separates an externality from the other four sources?',
    ['Is somebody outside the transaction affected by it?', 'Is the good expensive relative to incomes?', 'Does the government provide the good?', 'Is the good being sold by more than one firm in the same market?'],
    'An externality is defined by a cost or benefit landing on a third party. The other four sources involve no third party at all: they turn on excludability, on what each side knows, on whether a risk has been covered, and on expectations of a price.'),

  /* ── Block 2 · Private, external and social ── */
  qi(B2, 'Social cost is equal to:',
    ['private cost plus external cost', 'external cost minus private cost', 'private cost minus external cost', 'the larger of private cost and external cost'],
    'Social cost is a sum and it INCLUDES private cost, which is why it is never smaller. Treating it as a separate, rival figure is the commonest error in this identity.'),
  qi(B2, 'A cement works pays ' + money(valueAt(K.mpc, K.marketQ)) + ' to make its ' + qty(K.marketQ) + 'th tonne and imposes ' + money(K.externalCost) + ' of dust and noise on its neighbours. The social cost of that tonne is:',
    [money(valueAt(K.msc, K.marketQ)), money(K.externalCost), money(valueAt(K.mpc, K.marketQ)), money(valueAt(K.mpc, K.marketQ) - K.externalCost)],
    'Private cost ' + money(valueAt(K.mpc, K.marketQ)) + ' plus external cost ' + money(K.externalCost) + ' gives a social cost of ' + money(valueAt(K.msc, K.marketQ)) + '. The external cost alone is not the social cost, and the private cost alone is what the firm sees rather than what society bears.'),
  qi(B2, 'A driver in heavy traffic delays every other driver behind them. This is an external cost of:',
    ['consumption, because it arises from using the car', 'production, because it arises from vehicles', 'production, because the road was built by somebody else', 'consumption, because the driver also suffers the delay'],
    'The test is which activity causes the effect. The car was built elsewhere and the delay comes from somebody DRIVING it, so the externality is one of consumption and it moves the marginal benefit curve.'),
  qi(B2, 'A bee-keeper\'s hives pollinate the orchards nearby. This is an external:',
    ['benefit of production', 'benefit of consumption', 'cost of production', 'cost of consumption'],
    'The orchards gain from the hives EXISTING — from the honey being produced — rather than from anybody eating the honey. So it is a benefit arising in production, which puts marginal social cost below marginal private cost and means too few hives.'),

  /* ── Block 3 · Marginal analysis and the welfare areas ── */
  qi(B3, 'In the Kumbe Cement market the welfare loss from the external cost of production is:',
    [money(K.welfareLoss) + ' a day', money(K.totalExternalCost) + ' a day', money(K.externalCostAtOptimum) + ' a day', money(K.externalCost) + ' a day'],
    'The welfare loss is the triangle between MSC and MPB from the social optimum out to the market quantity: ½ × ' + money(K.externalCost) + ' × ' + qty(K.marketQ - K.optimumQ) + ' = ' + money(K.welfareLoss) + '. ' + money(K.totalExternalCost) + ' is the TOTAL external cost over every tonne, ' + money(K.externalCostAtOptimum) + ' is that total at the optimum quantity, and ' + money(K.externalCost) + ' is the per-tonne gap rather than an area at all.'),
  qi(B3, 'The area between the MPC and MSC curves, from zero out to the market quantity, measures:',
    ['the total external cost borne by third parties', 'the welfare loss caused by over-production', 'the producer\'s total private cost', 'the gain that would follow from moving to the socially optimal quantity'],
    'That band is the external cost on EVERY unit produced, whether or not the unit was worth making. The welfare loss is a different shape in a different place: the triangle bounded by the social optimum and the market quantity, between MSC and MPB.'),
  qi(B3, 'On a diagram showing an external benefit of consumption, the social optimum is found where:',
    ['MSB crosses MSC', 'MPB crosses MPC', 'MSB crosses MPB', 'MPB crosses MSC'],
    'The optimum always uses the two SOCIAL curves, because it is the quantity at which every benefit and every cost is counted. Where the private curves cross is the MARKET position, which is the quantity the diagram is comparing the optimum against.'),
  qi(B3, 'In the Amara Skills market the area between MSB and MSC, from the market quantity out to the social optimum, is:',
    ['a welfare gain of ' + money(A.welfareGain) + ' a week that is available and not being taken', 'a welfare loss of ' + money(A.welfareGain) + ' a week caused by the market consuming far too much', 'the total external benefit of ' + money(A.totalExternalBenefit) + ' a week', 'the private benefit the buyers receive'],
    'Those courses are worth more to society than they cost and nobody has a private reason to buy them, so the triangle is a gain that is available rather than something destroyed. ½ × ' + money(A.externalBenefit) + ' × ' + qty(A.optimumQ - A.marketQ) + ' = ' + money(A.welfareGain) + ', and the specification asks for "welfare loss or gain areas" precisely because both exist.'),
  qi(B3, 'On a marginal analysis diagram, the vertical gap between two curves at one quantity is:',
    ['a per-unit amount', 'a total amount of money', 'a quantity', 'a percentage'],
    'A height is a rate: dollars per unit. Totals are areas, which is why every welfare figure in this topic is an area rather than a height, and why confusing the two turns a triangle into a rectangle.'),

  /* ── Block 4 · Externalities in five contexts ── */
  qi(B4, 'A factory discharges waste into a river used by towns downstream. The correct diagram shows:',
    ['MSC above MPC, with the market producing beyond the social optimum', 'MSB above MPB, with the market consuming below the social optimum', 'MSB below MPB, with the market consuming beyond the social optimum', 'MSC below MPC, with the market producing below the social optimum'],
    'The damage arises from making the good, so it is an external cost of production: marginal social cost lies above marginal private cost and the market produces more than the social optimum. The other three describe a consumption benefit, a consumption cost and a production benefit.'),
  qi(B4, 'Vaccination is usually analysed as an external benefit of consumption because:',
    ['the protection reaches people who did not pay for the treatment', 'the vaccine is expensive to manufacture', 'governments normally pay for it', 'the person who is vaccinated is protected from catching the disease themselves'],
    'The external benefit is what falls on people outside the transaction — those who are less likely to meet the disease because somebody else was vaccinated. The protection of the person vaccinated is the PRIVATE benefit, which is already in their decision.'),
  qi(B4, 'Which feature of environmental externalities makes them hardest to deal with?',
    ['the people bearing the cost may be distant in space or not yet born', 'the damage is larger than the value of the output the firm sells', 'the firms causing the damage are breaking the law of the country', 'the diagram needed is different from the one for other externalities'],
    'The diagram is exactly the same one. What is different is who bears the cost: people across a border, or people who do not yet exist, cannot object, cannot be compensated, and are not represented in any market.'),
  qi(B4, 'A bank takes on more risk than it can absorb. The external cost of this is best described as:',
    ['losses falling on depositors, other firms and other banks', 'the bank\'s own losses on the bad loans', 'the fall in the value of the bank to its owners', 'the higher rate of interest the bank must pay in order to borrow money'],
    'The external cost is what lands on people who took no part in the decision. The bank\'s own losses and the fall in its value to its owners are private costs, already weighed when the risk was taken.'),

  /* ── Block 5 · Public goods and the free-rider problem ── */
  qi(B5, 'A private good is:',
    ['rival and excludable', 'non-rival and non-excludable', 'rival and non-excludable', 'non-rival and excludable'],
    'Both properties together are what make a good sellable: excludability lets a seller charge, and rivalry gives a buyer a reason to pay rather than wait. The third option describes a crowded road and the fourth a subscription film — near misses, and neither is a public good.'),
  qi(B5, 'The free-rider problem arises because a public good is:',
    ['non-excludable', 'non-rival', 'expensive to provide', 'useful to everybody'],
    'Non-excludability means a person who does not pay cannot be kept from the benefit, so each individual gains by waiting for somebody else to pay. Non-rivalry means their use costs nobody else anything — which gives them no reason at all to avoid PAYING, and is why attributing free-riding to it is wrong.'),
  qi(B5, 'A crowded public road is not a public good because it is:',
    ['rival — every extra vehicle takes space from the others', 'excludable, since tolls could be charged', 'provided by a government rather than a firm', 'used by people who have paid taxes for it'],
    'Both tests have to fail for a good to be a public good. A crowded road fails the excludability test but passes the rivalry one — space taken by one vehicle is not available to another — so it is not a public good.'),
  /*
   * `quiz.hedged` fires on a hedged key among absolute distractors, and the first draft of this item
   * was exactly that shape — because the thing being TESTED was the specification's modal verb, so
   * the hedge was the answer. The rule was right about the construction even though the content was
   * right too: a student who has learnt that the cautious option is usually the key can answer it
   * without knowing anything about public goods. Rewritten to test the CLAIM rather than the verb,
   * with the wording point moved into the explanation where it is read after the answer is given.
   */
  qi(B5, 'The free-rider problem leads a private market to supply a public good:',
    ['in a smaller quantity than the social optimum', 'in exactly the quantity that people want', 'at a quantity of zero, in every case', 'at a higher price than people will pay'],
    'The free-rider argument shows under-provision. The specification\'s wording is that public goods "may not be provided by the private sector" — may not, rather than cannot: private provision does happen where one party gains enough alone, where the benefit can be bundled with something excludable, or where the group is small enough to agree to contribute.'),

  /* ── Block 6 · Imperfect market information ── */
  qi(B6, 'Two parties who both know very little about a good have information that is:',
    ['symmetric', 'asymmetric', 'complete', 'perfect'],
    'Symmetric means EQUAL, not complete. Both sides being equally badly informed is symmetric information with a large information gap, and it fails differently from asymmetry: nobody can exploit anybody, and the quantity is still wrong.'),
  qi(B6, 'In healthcare the information advantage usually lies with:',
    ['the person recommending the treatment', 'the patient receiving the treatment', 'neither side, equally', 'whoever is paying for the treatment rather than receiving it'],
    'A patient cannot judge whether a treatment is necessary or whether a cheaper one would do; the person who can is the one recommending it. That is the reverse of insurance, where the buyer knows their own risk better than the seller does.'),
  qi(B6, 'The significance of an information gap is that:',
    ['willingness to pay reflects a belief rather than a value', 'the good becomes more expensive for a firm to produce', 'the market stops trading the good altogether', 'the good has to be provided by a government instead'],
    'A demand curve is built from willingness to pay, which is supposed to reflect what the thing is worth. Through a gap it reflects what people believe it is worth, so the curve sits away from marginal social benefit and the quantity that follows is not the socially optimal one.'),
  qi(B6, 'What do education and pensions have in common as information problems?',
    ['the consequence of the choice arrives long after the choice', 'one side deliberately withholds information from the other', 'the good is non-excludable', 'the seller knows more than the buyer'],
    'In both, nobody has the advantage: the gap is between the moment of choice and the moment of consequence. That is different from healthcare and insurance, where one side genuinely knows more than the other.'),

  /* ── Block 7 · Moral hazard ── */
  qi(B7, 'Moral hazard occurs when:',
    ['behaviour changes after a risk is covered, because the cost falls elsewhere', 'a person lies to an insurer in order to obtain cover', 'one party to the transaction knows more than the other before any deal is made', 'a firm makes a loss and expects a government to pay for it'],
    'The defining feature is the timing: behaviour changes AFTER the cover is in place, and the change is unobserved so it is never priced. Dishonesty is a crime rather than a market failure, and knowing more before a deal is asymmetric information.'),
  qi(B7, 'An insurance policy carries an excess that the insured pays themselves mainly in order to:',
    ['leave enough of the cost with the insured that the reason for care survives', 'reduce the paperwork involved in small claims', 'make the policy cheaper than a competitor\'s', 'allow the insurer to refuse any small claim it happens to disagree with later'],
    'An excess works by making the cover deliberately incomplete. Leaving the first part of a loss with the insured keeps some of the cost of carelessness where it can affect behaviour, which is the market\'s own partial answer to moral hazard.'),
  qi(B7, 'Moral hazard in banking differs from moral hazard in insurance because:',
    ['the cover is an expectation that nobody bought and nobody priced', 'banks are larger than insurance companies', 'banks do not take risks deliberately', 'insurance companies cannot observe their customers'],
    'An insurer prices its cover and can change the premium when claims rise. An expected rescue has no premium to change and no contract to renegotiate, and a rescue that happens makes the next expectation better founded than it was.'),
  qi(B7, 'Which group named in the specification bears the cost of moral hazard without having taken the risk or bought the cover?',
    ['workers at a firm that has taken on too much risk', 'consumers who chose to buy the insurance cover', 'producers who decided how much risk to take', 'insurers who priced and sold the cover'],
    'Workers have no part in the decision, no cover of their own, and lose their jobs if the risk arrives. Consumers and producers are both parties to the cover, and the insurer is not one of the four groups the specification names at all.'),

  /* ── Block 8 · Speculation and market bubbles ── */
  qi(B8, 'A market bubble is best described as a situation in which:',
    ['the rise in price has become the main reason to buy', 'the price of an asset is unusually high', 'buyers have borrowed heavily to make purchases', 'a market has too few sellers in it'],
    'A price can be high for good reasons that last. What makes it a bubble is the reversal: in an ordinary market a rising price brings fewer buyers, and here it brings more, so the price moves on expectations of itself rather than on what the thing is worth.'),
  qi(B8, 'Why can a bubble not simply level off and stay where it is?',
    ['the buyers holding it up are there for the rise, and sell when it stops', 'a government always intervenes long before a price gets that far', 'the supply of the asset always increases to meet the demand', 'the asset becomes completely worthless once the rise ends'],
    'There is no resting point above the value. Buyers who came for the rise have no reason to hold once it stops, so a plateau turns into selling and the price falls rather than settling.'),
  qi(B8, 'Housing bubbles do more damage than bubbles in most other assets partly because:',
    ['they are bought with borrowed money, so a fall wipes out much of what the buyer owns', 'houses are non-rival and non-excludable, which makes them public goods', 'the supply of housing responds very quickly to a change in the price', 'nobody buying a house has any use for it other than reselling it'],
    'Borrowing is what magnifies the fall: a buyer who put down a fraction of the price loses a large share of what they own from a small movement. Supply responding SLOWLY is the second aggravating feature, which is the opposite of the third option.'),
  qi(B8, 'A share-price bubble misallocates resources while it is still inflating because:',
    ['a share price directs capital, so a wrong one sends resources to the wrong firms', 'shares cannot be sold quickly enough for anybody to leave the market', 'firms stop producing while the price of their shares is still rising', 'savers withdraw their money from pensions and hold it as cash'],
    'This is what makes shares different from housing. A firm whose shares are highly valued can raise money cheaply and expand, so a price that has come loose from value is a signal directing real capital to firms that do not merit it — before anything has burst.'),
]);

/* ══ Practice ═════════════════════════════════════════════════════════════
 * Eleven items, all eight IAL ECONOMICS command words, on the Economics ladder only: Define 2,
 * Calculate 2 or 4, Draw 4, Explain 4, Analyse 6, Examine 8, Discuss 14, Evaluate 20. No Assess and
 * no 10-mark item exist in WEC11, and no Outline exists in either subject.
 *
 * THE FIRST PARAGRAPH OF EVERY GUIDANCE IS A SCAFFOLD AND CARRIES NO ANSWER, no figure and no mark
 * allocation, because guided mode prints it above the empty answer box before the student writes.
 * The mark scheme starts at paragraph two. For the three items above 6 marks there is no point
 * allocation at all: those tariffs are levels-marked, which `practice.levels` enforces.
 */
const pr = (block, command, marks, question, guidance) => ({ id: id('practice', question), block, command, marks, question, guidance });

export const PRACTICE = [
  pr(B1, 'Define', 2, "Define the term 'market failure'. (2 marks)",
    'Two marks means two separate things to say, and the second is not a rewording of the first. The specification defines this term by a quantity rather than by a description of a market in difficulty, so decide first what the quantity is being compared against, and make sure that comparison appears in your answer.\n'
    + 'Too much or too little of a good is produced and/or consumed (1 mark), compared with the socially optimal level of output (1 mark). The second mark is the comparison: an answer that says the market produces the wrong amount without saying wrong compared with what has given one half of the definition. Descriptions of a market collapsing, of prices being unaffordable or of firms making losses are not this term.'),

  pr(B2, 'Explain', 4, 'Explain how an external cost of production causes the social cost of a good to exceed its private cost. (4 marks)',
    'An Explain of a reason needs a two-stage chain, so plan both links before you start writing. The first link is about who pays what; the second is about what that does to the relationship between two things the question names. Keep the two costs clearly separated throughout — using one word for both is what makes this answer collapse into one stage.\n'
    + 'An external cost is a cost of producing the good that falls on people outside the transaction (1 mark), such as dust and noise falling on households near a works (1 mark). The producer pays only the private cost — inputs, wages, machinery — so that cost alone is what the supply curve is built from (1 mark). Social cost is private cost plus external cost, so it exceeds private cost by the value of what falls on the third party (1 mark). An answer that says social cost is "different from" private cost has not said in which direction or by how much.'),

  pr(B3, 'Calculate', 4, 'In a market for cement, the marginal private cost is given by MPC = 10 + 0.5Q and the marginal private benefit by MPB = 60 − 0.5Q, where Q is tonnes a day. Production imposes an external cost of ' + money(K.externalCost) + ' a tonne. Calculate the market quantity, the socially optimal quantity and the welfare loss. (4 marks)',
    'Three figures are wanted and each one depends on the one before, so work down the page in stages rather than trying to reach the last of them directly. Two of the three are quantities and you find each by deciding which pair of curves meets there — and the two pairs are not the same pair. The third is an area, so once you have both quantities ask yourself what shape it is before reaching for any arithmetic. Appendix 6 defines Calculate as a calculation involving several stages and advises showing workings, and here the workings are what let each stage stand on its own.\n'
    + 'Market quantity: set MPB equal to MPC, so 60 − 0.5Q is 10 + 0.5Q, giving Q of ' + qty(K.marketQ) + ' tonnes a day (1 mark). Marginal social cost is MPC plus the external cost, so MSC is 20 + 0.5Q (1 mark). Socially optimal quantity: set MPB equal to MSC, so 60 − 0.5Q is 20 + 0.5Q, giving Q of ' + qty(K.optimumQ) + ' tonnes a day (1 mark). Welfare loss is the triangle between MSC and MPB across the ' + qty(K.marketQ - K.optimumQ) + ' tonnes between the two quantities: half of ' + money(K.externalCost) + ' times ' + qty(K.marketQ - K.optimumQ) + ', which is ' + money(K.welfareLoss) + ' a day (1 mark). Note that this is not the total external cost, which is ' + money(K.externalCost) + ' across all ' + qty(K.marketQ) + ' tonnes, or ' + money(K.totalExternalCost) + ' a day.'),

  pr(B3, 'Calculate', 2, 'In the same cement market, ' + qty(K.marketQ) + ' tonnes a day are produced and each tonne imposes an external cost of ' + money(K.externalCost) + '. Calculate the total external cost borne by third parties each day. (2 marks)',
    'This is a shorter calculation than it looks, and the risk is doing the harder one by mistake. Read carefully which quantity the question is asking you to apply the external cost to, and notice that it is asking about a cost borne rather than about a welfare effect — those are two different areas on the same diagram and only one of them is wanted here.\n'
    + 'The external cost per tonne is constant, so the total is that cost multiplied by the quantity produced: ' + money(K.externalCost) + ' times ' + qty(K.marketQ) + ' tonnes (1 mark), giving ' + money(K.totalExternalCost) + ' a day (1 mark). This is the band between MPC and MSC over every tonne made, not the welfare loss triangle, which is bounded by the social optimum and the market quantity and is ' + money(K.welfareLoss) + ' a day.'),

  pr(B3, 'Draw', 4, 'Draw a diagram, using marginal analysis, to show the welfare loss arising from an external cost of production. (4 marks)',
    'Decide the shape of the diagram before you draw a single line: which pair of curves splits apart, and which one stays single. Then build it in order — the curves, then the two positions, then the area — because the area is bounded by both positions and cannot be shaded until both are on the page. Label the vertical axis for what a marginal diagram actually measures rather than for a price, and mark both quantities on the horizontal axis.\n'
    + 'Axes labelled, with costs and benefits on the vertical axis and quantity on the horizontal (1 mark). A downward-sloping MPB curve, an upward-sloping MPC curve and an MSC curve parallel to and above MPC, all three labelled (1 mark). The market quantity marked where MPB meets MPC and the socially optimal quantity marked where MPB meets MSC, both read off to the horizontal axis (1 mark). The welfare loss shaded as the triangle between MSC and MPB, from the socially optimal quantity out to the market quantity, and labelled (1 mark). Shading from the origin instead is the commonest error: it measures the total external cost, which is a different area.'),

  pr(B4, 'Draw', 4, 'Draw a diagram, using marginal analysis, to show the effect of the external benefits arising from the consumption of education. (4 marks)',
    'This is the mirror of the production diagram and the mirror has to be complete: a different pair of curves splits, and the market ends up on the other side of the optimum. Work out which curve moves and in which direction before drawing, then mark both positions and be careful about the name you give the area between them — the specification uses two words here and only one of them fits this case.\n'
    + 'Axes labelled, with costs and benefits on the vertical axis and quantity on the horizontal (1 mark). An upward-sloping MSC curve, a downward-sloping MPB curve, and an MSB curve parallel to and above MPB, all labelled (1 mark). The market quantity marked where MPB meets MSC, and the socially optimal quantity, which is larger, marked where MSB meets MSC (1 mark). The welfare gain shaded as the triangle between MSB and MSC, from the market quantity out to the social optimum (1 mark). Drawing two cost curves answers a production question instead, and calling the triangle a welfare loss misses the distinction the specification asks for.'),

  pr(B4, 'Analyse', 6, 'Analyse the external costs arising from the consumption of car journeys in a congested city. (6 marks)',
    'An Analyse wants depth rather than breadth, so choose your ground: one or two external costs followed all the way to the quantity will do more than a list of every effect a car has. Decide first whether the externality arises from making the car or from using it, because that settles which curve moves and the whole chain hangs off it. Appendix 6 says a diagram is credited where appropriate, and here it is.\n'
    + 'The external costs are congestion — each extra vehicle delays every other one behind it — and emissions and noise falling on people beside the road (1 mark). Neither cost is borne by the driver, so neither enters the decision to travel (1 mark). The effect arises from using the car rather than from building it, so it is an external cost of consumption (1 mark), which puts marginal social benefit below marginal private benefit (1 mark). The market settles where MPB meets MSC, which is to the right of where MSB meets MSC (1 mark), so more journeys are made than the socially optimal number and a welfare loss arises across the journeys beyond the optimum (1 mark). A diagram with MSB below MPB and both quantities marked supports the chain directly.'),

  pr(B5, 'Explain', 4, 'Explain why public goods may not be provided by the private sector. (4 marks)',
    'The chain here runs from a property of the good to the behaviour it makes sensible to the revenue that results. Be careful which of the two properties of a public good you build the chain on, because only one of them gives anybody a reason not to pay — and the other one is the answer students most often give. Notice also the wording of the question, which is the specification\'s own, and keep your conclusion as strong as that wording and no stronger.\n'
    + 'A public good is non-excludable, so a person who does not pay cannot be kept from the benefit (1 mark). Each individual therefore gains by waiting for others to pay and free-riding on the result, whatever anybody else does (1 mark). If enough people reason that way, the revenue a private seller can collect falls short of what provision costs (1 mark), so the private sector provides less than the socially optimal quantity and may provide none at all (1 mark). Attributing free-riding to non-rivalry is wrong: non-rivalry means one person\'s use costs nobody else anything, which gives them no reason to avoid paying. And "may not be provided" is the claim to make, not "cannot be": a party who gains enough alone will provide it and others will then free-ride on what exists.'),

  pr(B6, 'Examine', 8, 'Examine the effects of imperfect market information on the allocation of resources in healthcare. (8 marks)',
    'The question names one context, so stay in it: a general account of asymmetric information with healthcare mentioned at the end will not be answering what was asked. Work out first which side of the transaction holds the advantage here, because it is not the same side as in insurance and the consequences run differently. Appendix 6 says an Examine needs a brief assessment as well as a chain of reasoning, so leave yourself room at the end to weigh how serious the problem is and whether it can be reduced.\n'
    + 'The chain: in healthcare the information advantage lies with the seller, because the person recommending a treatment can judge whether it is necessary and the patient cannot. A patient\'s willingness to pay is therefore built on somebody else\'s judgement rather than on their own valuation, so the demand curve no longer reflects marginal social benefit and the quantity of treatment is not the socially optimal one. This runs in both directions: treatment may be taken that would not have been chosen with full knowledge, and treatment may be avoided by a patient who cannot judge whether to trust a recommendation. Resources are therefore allocated to some treatments in excess and away from others that are needed. The brief assessment should weigh how far the gap can be closed — much of the knowledge takes years to acquire and the decision has to be made now, which is why simply providing more information changes less than it appears it should — and may note that the adviser being paid for the treatment strengthens the effect without requiring anybody to be dishonest.'),

  pr(B7, 'Discuss', 14, 'Discuss the impact of moral hazard in banking on consumers, producers, workers and governments. (14 marks)',
    'Four groups are named and the marks are there for taking each of them somewhere, so plan the four before writing and give each its own paragraph. Two of the four never chose anything, and saying so is worth more than describing them: it is the point at which this becomes a market failure rather than a private arrangement. A Discuss also asks for different viewpoints and a critical assessment, so decide in advance what your counter-argument is — there is a real one here about whether the cover is worth having at all.\n'
    + 'The mechanism first: a bank that expects not to be allowed to fail holds cover that nobody sold it and nobody priced, so the gains from taking more risk stay with the bank and its owners while part of the losses do not. That asymmetry makes taking more risk the rational choice rather than a reckless one. Consumers bear it as depositors and borrowers, losing savings when a failure arrives and paying more for credit afterwards. Producers — the banks themselves — take on risk they would not take unprotected, and the losses fall partly outside the firm. Workers are exposed to a firm carrying more risk than it can absorb and lose jobs when the risk arrives, having had no part in the decision and no cover of their own. Governments meet the cost of a rescue they were expected to fund, and the expectation the rescue confirms makes the next failure more likely, so the cost includes what it encourages. The critical assessment should recognise that cover is genuinely valuable — a banking system in which any failure spreads uncontrolled is worse than one in which it does not — so the question is not whether to have it but how much of the cost to leave with the party taking the risk. Different viewpoints: a depositor wants the cover to be certain, a competing bank wants it to be withheld from its rivals, and a government wants it to be believed in a crisis and disbelieved beforehand, which are not compatible.'),

  pr(B8, 'Evaluate', 20, 'Evaluate the view that market bubbles in housing cause more damage than bubbles in stocks and shares. (20 marks)',
    'This is a comparison and the marks follow the comparing, so do not write everything you know about one and then everything about the other. Pick the features that actually differ between the two markets and take each one through to a consequence, and keep asking damage to whom — the two markets do not hurt the same people. A judgement is required, so decide in advance what would have to be true for the view to hold and say so explicitly rather than concluding that it depends.\n'
    + 'For the view: homes are bought with borrowed money, so a fall wipes out a large share of what the buyer owns and can leave them owing more than the home is worth, unable to move; supply responds slowly, so a demand increase lands on the price for years before it lands on the quantity, letting the bubble inflate further; housing is where people live, so households cannot leave the market when the price looks wrong; and construction employs many people who lose jobs when sites stop, having taken no part in any speculation. Against the view: a share price directs capital, so a share bubble misallocates real resources while it is still inflating rather than only when it bursts, and capital stays hard to raise for good projects long after the fall stops; shares can be sold in a moment, so the fall is faster and sharper and the losses arrive before anybody can react; and most savers hold shares through pensions without ever choosing one, so the loss reaches people even further from the decision than a housing bust does. The judgement should turn on what damage is being measured and over what period — housing does more damage to households and to employment in the short run, while a share bubble does more to the allocation of capital and for longer, because the signal it distorts is the one that directs investment. A strong answer will also note that the two are not independent: both are amplified by borrowing, and a bust in either can spread to the other through the banks that lent into it.'),
];

/* ══ Flashcards ═══════════════════════════════════════════════════════════ */
const card = (front, back) => ({ id: id('flashcard', front), front, back });

export const FLASHCARDS = [
  card('What is market failure?', 'Too much or too little of a good produced and/or consumed compared with the socially optimal level of output.'),
  card('Name the five sources of market failure.', 'Externalities; the free-rider problem and non-provision of public goods; imperfect market information; moral hazard; speculation and market bubbles.'),
  card('What is social cost?', 'Private cost plus external cost — what it costs society in total to produce the good, not a separate figure from private cost.'),
  card('What is social benefit?', 'Private benefit plus external benefit — what society gains in total, including what falls on people outside the transaction.'),
  card('What decides whether an externality is one of production or consumption?', 'The activity that causes the effect: making the good, or using it. Not who suffers from it.'),
  card('Which curve moves for an external cost of production?', 'The cost curve: MSC lies above MPC, and the market produces too much.'),
  card('Which curve moves for an external benefit of consumption?', 'The benefit curve: MSB lies above MPB, and the market consumes too little.'),
  card('Where is the market position on a marginal diagram?', 'Where the two PRIVATE curves cross, because private cost and private benefit are what buyers and sellers act on.'),
  card('Where is the social optimum?', 'Where the two SOCIAL curves cross — the quantity at which every cost and every benefit is counted.'),
  card('How is a welfare loss measured?', 'The triangle between MSC and MPB, from the social optimum out to the market quantity: ½ × the per-unit gap × the difference in quantities.'),
  card('What is the difference between a welfare loss and the total external cost?', 'The loss is the triangle beyond the optimum; the total external cost is the band between MPC and MSC over every unit. In the cement market they are ' + money(K.welfareLoss) + ' and ' + money(K.totalExternalCost) + ' a day.'),
  card('When is the area between the curves a welfare GAIN?', 'When the market is BELOW the optimum, as with an external benefit of consumption: the triangle is a gain that is available and is not being taken.'),
  card('What kind of externality is congestion?', 'An external cost of consumption: it comes from driving the car, not from building it.'),
  card('What are the two tests for a private good?', 'Rival — one person\'s use leaves less for others — and excludable: a non-payer can be kept from it.'),
  card('What are the two tests for a public good?', 'Non-rival and non-excludable. BOTH have to fail for a good to qualify.'),
  card('What causes the free-rider problem?', 'Non-excludability. A non-payer cannot be kept from the benefit, so each person gains by waiting for somebody else to pay.'),
  card('Does the private sector provide zero public goods?', 'No. The specification says they MAY NOT be provided: the claim is under-provision. One party who gains enough alone will provide it, and others then free-ride.'),
  card('What is the difference between symmetric and asymmetric information?', 'Symmetric means both sides know the SAME things — equal, not necessarily complete. Asymmetric means one side knows more and can act on the difference.'),
  card('What is the significance of an information gap?', 'Willingness to pay reflects a belief rather than a value, so the demand curve sits away from marginal social benefit and the quantity is wrong.'),
  card('Which side knows more in healthcare, and which in insurance?', 'Healthcare: the seller, who can judge whether a treatment is needed. Insurance: the buyer, who knows their own risk.'),
  card('What is moral hazard?', 'A change in behaviour AFTER a risk has been covered, because the cost of the risk now falls on somebody else — and the change is unobserved, so it is never priced.'),
  card('Why does an insurance policy carry an excess?', 'To leave enough of the cost with the insured that the reason for care survives. The cover is made deliberately incomplete.'),
  card('How does moral hazard in banking differ from insurance?', 'The cover is an expectation of rescue rather than a policy: nobody bought it, no premium was charged, and a rescue makes the next expectation stronger.'),
  card('Which four groups does the specification name for moral hazard and for bubbles?', 'Consumers, producers, workers and governments — in insurance and banking, and in housing and stocks and shares.'),
  card('What is speculation?', 'Buying in the expectation of reselling higher, rather than for any use the thing has.'),
  card('What makes a rising price a bubble?', 'The rise becomes the reason to buy. In an ordinary market a rising price brings fewer buyers; in a bubble it brings more.'),
  card('Why can a bubble not level off?', 'The buyers holding it up are there for the rise, so when it stops their reason to hold goes and they sell — turning a plateau into a fall.'),
  card('Why is a housing bubble worse than most?', 'Homes are bought with borrowed money, supply responds slowly, and it is where people live — so a fall wipes out a large share of what buyers own and they cannot leave.'),
  card('How does a share bubble misallocate resources before it bursts?', 'A share price directs capital, so a price that has come loose from value sends real resources to firms that do not merit them.'),
];

/* ══ Common mistakes ══════════════════════════════════════════════════════
 * The March section had NONE — `common_mistakes` was empty on all eight tables, which is why
 * accuracy-01's internal contradiction had nothing to check it against. structure-09 judged the
 * misconception cards and called four of them filler; those four are gone and these five are the
 * errors this topic actually produces, each one attached to the leaf it breaks.
 */
const mistake = (title, looksLike, why, instead) => ({ id: id('mistake', title), title, looks_like: looksLike, why, instead });

export const MISTAKES = [
  mistake('Marking the total external cost as the welfare loss',
    'Shading the whole band between MPC and MSC, from the origin out to the market quantity, and calling it the welfare loss.',
    'That band is the external cost on EVERY unit produced, including the units that were worth making. IAL 1.3.5 · 2d asks for identification of the welfare loss area, which is the triangle bounded by the social optimum and the market quantity, between MSC and MPB. In the cement market the two are ' + money(K.welfareLoss) + ' and ' + money(K.totalExternalCost) + ' a day — ten times apart, on one diagram.',
    'Find both quantities first, then shade only between them. A cost is not a loss if the unit it buys is worth more than it costs society.'),
  mistake('Calling the positive-externality triangle a welfare loss',
    'Drawing an external benefit of consumption correctly and then labelling the area between MSB and MSC a welfare loss.',
    'Nothing is being destroyed there. Those units are worth more to society than they cost and are simply not being bought, so the area is a gain that is available and is not being taken. The specification says "welfare loss or gain areas" for exactly this reason.',
    'Ask which side of the optimum the market is on. Beyond it, the area is a loss; short of it, the area is a gain available.'),
  mistake('Attributing free-riding to non-rivalry',
    'Writing that a public good is non-rival, so people can consume it without paying, so they free-ride.',
    'Non-rivalry means one person\'s use costs nobody else anything. That gives nobody any reason to avoid PAYING. What makes free-riding possible is non-excludability: a person who does not pay cannot be kept from the benefit, so waiting is an option.',
    'Build the chain on non-excludability: cannot be kept out, so waiting is possible, so few pay, so revenue falls short.'),
  mistake('Saying private markets produce zero public goods',
    'Concluding an answer with "so the free market will provide none of it at all".',
    'IAL 1.3.5 · 3b says public goods MAY NOT be provided by the private sector. The free-rider argument shows under-provision, not zero: a party who gains enough alone will provide it, a non-excludable benefit can sometimes be bundled with an excludable one, and a small enough group can agree to contribute.',
    'Write that the private sector provides less than the socially optimal quantity, and may provide none — which is the specification\'s own claim and no weaker than the argument supports.'),
  mistake('Treating moral hazard as dishonesty, or as a choice made before the cover',
    'Explaining moral hazard as people making false claims, or as high-risk people being the ones who buy insurance.',
    'Fraud is a crime rather than a market failure, and moral hazard needs nobody to break any rule. The test is TIMING: it is behaviour that changes after cover is in place, because the cost of the risk now falls elsewhere and the change cannot be observed, so it is never priced into the premium.',
    'Say what changed, when it changed, and why the party providing the cover could not see it.'),
];

/* ══ Extras — chains and evaluation lines ═════════════════════════════════
 * topFix-01 names extras.chains[0] as carrying the same wrong welfare-loss area as Q18. The chains
 * are rewritten from the arithmetic in _packet25-util.mjs, so a figure that changes in one surface
 * and not another fails the build rather than sitting in a chain nobody re-reads.
 */
export const EXTRAS = {
  chains: [
    {
      title: 'An external cost of production, traced to the welfare loss',
      steps: [
        'Producing the good imposes a cost of ' + money(K.externalCost) + ' a ' + K.unit + ' on people outside the transaction.',
        'The producer pays only the private cost, so the supply curve is built from MPC and not from MSC.',
        'Buyers and sellers meet where MPB crosses MPC, at ' + qty(K.marketQ) + ' ' + K.units + ' and ' + money(K.marketP) + '.',
        'Counting the external cost, MPB crosses MSC at ' + qty(K.optimumQ) + ' ' + K.units + ' — the socially optimal quantity.',
        'Across the ' + qty(K.marketQ - K.optimumQ) + ' ' + K.units + ' in between, each one costs society more than it is worth to its buyer.',
      ],
      result: 'A welfare loss of ½ × ' + money(K.externalCost) + ' × ' + qty(K.marketQ - K.optimumQ) + ' = ' + money(K.welfareLoss) + ' a day — which is NOT the ' + money(K.totalExternalCost) + ' total external cost borne by the neighbours.',
    },
    {
      title: 'An external benefit of consumption, traced to the welfare gain',
      steps: [
        'Each ' + A.unit + ' is worth ' + money(A.externalBenefit) + ' more to society than to the person who buys it.',
        'Buyers weigh only their own benefit, so demand is built from MPB and not from MSB.',
        'The market settles where MPB crosses MSC, at ' + qty(A.marketQ) + ' ' + A.units + ' and ' + money(A.marketP) + '.',
        'Counting the external benefit, MSB crosses MSC at ' + qty(A.optimumQ) + ' ' + A.units + '.',
        'Across the ' + qty(A.optimumQ - A.marketQ) + ' ' + A.units + ' in between, each one is worth more to society than it costs and nobody has a private reason to buy it.',
      ],
      result: 'A welfare gain of ½ × ' + money(A.externalBenefit) + ' × ' + qty(A.optimumQ - A.marketQ) + ' = ' + money(A.welfareGain) + ' a week that is available and is not being taken.',
    },
    {
      title: 'Why a public good may be under-provided',
      steps: [
        'The good is non-excludable, so a person who does not pay cannot be kept from the benefit.',
        'Each individual is therefore better off waiting, whatever anybody else does.',
        'With few paying, the revenue a private seller can collect falls short of what provision costs.',
        'So less is provided than the quantity everybody would want provided.',
      ],
      result: 'Under-provision — and possibly none at all, which is why the specification says public goods MAY NOT be provided by the private sector.',
    },
    {
      title: 'How moral hazard raises the price of cover for people whose behaviour never changed',
      steps: [
        'Insurance moves the cost of a loss away from the person best placed to prevent it.',
        'Care weakens slightly, and the change cannot be observed by the insurer.',
        'Claims become more frequent than the premium was priced for.',
        'The insurer raises premiums to meet the claims it is actually paying.',
      ],
      result: 'Everybody the insurer cannot tell apart pays more, including the careful — an external cost inside an insurance market.',
    },
    {
      title: 'How a bubble becomes its own cause, and why it must end',
      steps: [
        'A price begins to rise for a real reason: more buyers, or less of the thing to go round.',
        'Buyers arrive because of the rise, expecting to resell higher rather than to use the thing.',
        'Their buying pushes the price up further, which appears to confirm the expectation that brought them.',
        'The price now moves on expectations of itself, with nothing anchoring it to what the thing is worth.',
        'Buying on a rise requires a further rise, so when the rise stops the reason to hold goes with it.',
      ],
      result: 'A fall rather than a plateau — and the fall overshoots below the value, because the same expectations run in reverse against people who borrowed to buy.',
    },
  ],
  evaluation: [
    {
      title: 'How serious is a market failure?',
      points: [
        'The size of the welfare area, not the size of the external cost: a large external cost on units that are worth making is not a large loss.',
        'How far the market quantity sits from the social optimum, which depends on how responsive both sides are to price.',
        'Whether the people bearing the cost can be identified and compensated, or are distant in space or not yet born.',
        'Whether the figures are knowable at all — nobody can observe the external cost of a tonne of cement, so the diagram gives a direction and a reason rather than a number.',
      ],
    },
    {
      title: 'How significant is an information gap?',
      points: [
        'How large the gap is: a gap closed by asking one question is not significant.',
        'How costly the mistake is, and whether it can be corrected once it is discovered.',
        'How long it takes to reveal itself — a pension shortfall appears once, at the end, with nothing left to learn from.',
        'Whether providing information would close it. Where the gap is between now and later rather than between two parties, more information changes less than it appears it should.',
      ],
    },
    {
      title: 'Is the cover that creates moral hazard worth having?',
      points: [
        'Sharing a ruinous risk across many people is a genuine gain, and moral hazard is the cost of that gain rather than a reason the gain is not real.',
        'The question is not whether to have cover but how much of the cost to leave with the party taking the risk — which is what an excess or partial cover does.',
        'In banking the cover was never bought or priced, so there is no premium to adjust and no contract to renegotiate.',
        'Two of the four groups the specification names never chose anything, which is what makes this a market failure rather than a private arrangement between willing parties.',
      ],
    },
  ],
};
