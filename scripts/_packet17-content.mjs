/**
 * PACKET 17 — consumer-behaviour-demand, Learn Mode content and Notes.
 *
 * Economics Unit 1 (WEC11), IAL topic 1.3.2, audit/raw/econ_spec.txt:576-655. Six blocks in the
 * specification's own order and one subsection per skill, so no step carries two ideas: eighteen
 * crowded steps become twenty-four small ones, plus six check-ins.
 *
 * Three scope decisions the specification settled before a word was written (see NEXT.md):
 *
 *   - The behavioural block STAYS but its vocabulary GOES. 1b names six reasons why consumers may not
 *     maximise utility (:583-589) and the section must teach those six. "Anchoring", "loss aversion"
 *     and "bounded rationality" appear zero times in the IAL Economics specification and are the UK
 *     GCE's words for it; the only occurrence of "behavioural" anywhere in the document is :1281,
 *     "behavioural theories: satisficing", in a firms'-objectives topic that is not this one.
 *   - "Conditions of demand" appears zero times in the specification. It is AQA vocabulary. The spec
 *     says "Factors that may cause a shift in the demand curve" (:596) and so does this section.
 *   - Elasticities are not a separate topic: price, income and cross elasticities are sub-topic 3 of
 *     1.3.2 itself, 24 of its 39 leaves. The answer to a packed section is more steps, not less
 *     content.
 *
 * Ids: the sixteen March subsections that survive keep theirs (a progress row points at them); eight
 * are new, and two — significance-of-yed and significance-of-xed — are gone, because 3j is one leaf
 * about firms, consumers and government and it now has its own chapter instead of being told twice.
 *
 * Money is in dollars throughout. No UK-only institution frames an example, no example carries a year
 * or a figure, and no sentence asserts what a paper asks or what a marker does.
 */
import { subId, SECTION, hash8, money, qAt, trAt, ped, MU, totalUtility, tripsAt, MID_P, MID_Q, MAX_TR, CHOKE_P, PED_INELASTIC, PED_ELASTIC, pctQ, pctP, INCOME_RISE, COACH_YQ, AIR_YQ, RICE_YQ, yed, AIR_FARE_RISE, COACH_XQ, COACH_FARE_FALL, HOTEL_XQ, XED_SUBSTITUTE, XED_COMPLEMENT } from './_packet17-util.mjs';

const blockId = (title) => `${SECTION}:block:${hash8(title)}`;
const recall = (sid, r) => ({ id: `${sid}:recall`, ...r });

export const B1 = 'Rational Decision Making';
export const B2 = 'The Demand Curve';
export const B3 = 'Price Elasticity of Demand';
export const B4 = 'Total Revenue and Pricing Decisions';
export const B5 = 'Income and Cross Elasticity of Demand';
export const B6 = 'The Significance of Elasticities';

/* ══ Block 1 — Rational Decision Making (1.3.2 · 1a, 1b) ═══════════════════ */

const rationalDecisionMaking = (() => {
  const sid = subId('rational-decision-making'); // March id, kept
  return {
    id: sid,
    title: 'Rational Decision Making and Economic Agents',
    keyIdea: 'Economics assumes each agent pursues one objective: consumers aim to maximise utility by making rational choices, and firms aim to maximise profits.',
    body: [
      { type: 'paragraph', text: 'An **economic agent** is anyone whose decisions shape a market: **consumers**, who buy; **firms** (producers), who sell; and the **government**, which taxes, spends and regulates. Each faces scarcity, so each must choose, and economics begins by assuming each chooses with a purpose.' },
      { type: 'paragraph', text: 'That purpose is what **the assumption of rationality in decision making** states: consumers aim to maximise utility by making rational choices, and firms aim to maximise profits. The government is assumed to act for society as a whole, and its objectives come later in the course.' },
      { type: 'bullets', items: [
        '**Rational** does not mean clever or well informed. It means an agent weighs what an extra unit is worth against what it costs, and takes it only if the benefit is at least the cost.',
        '**Utility** is the satisfaction a consumer gets from a good. It is personal and cannot be measured the way a price can.',
        '**Profit** is a firm\'s revenue minus its costs, which unlike utility can be counted.',
      ] },
      { type: 'paragraph', text: 'The assumption earns its place by making markets predictable: if buyers take the cheaper of two identical goods, a model can say what a price change does. The rest of this chapter asks what happens when they do not.' },
    ],
    realExample: { emoji: '🧭', text: 'A commuter choosing between a coach and a train is assumed to weigh fare, journey time and comfort and take whichever leaves them better off. The model does not claim they enjoy the calculation.' },
    misconception: 'Students write that rational means people always make the best decision. That overstates it: rationality is about the direction of a choice, not its success. Write instead: a rational agent aims to maximise its objective given the information it has.',
    examMatters: 'A Define (2 marks, WEC11 Appendix 6) on rationality needs both halves: the objective being maximised, and the weighing of benefit against cost. Naming the agent whose objective it is separates a full definition from half of one.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each economic agent to the objective economics assumes it pursues:',
      pairs: [
        { left: 'A consumer', right: 'Maximising utility', why: 'The satisfaction gained from what is consumed, which is what a buyer is assumed to be buying' },
        { left: 'A firm', right: 'Maximising profit', why: 'Revenue minus costs, which is the one objective a producer can count' },
        { left: 'The government', right: 'Acting for society as a whole', why: 'It is not buying for itself or selling for profit, so its objective is set on behalf of others' },
      ],
      distractors: ['Maximising the number of goods produced'],
    }),
  };
})();

const utilityAndMaximisation = (() => {
  const sid = subId('utility-and-utility-maximisation'); // March id, kept
  return {
    id: sid,
    title: 'Utility and Utility Maximisation',
    keyIdea: 'Total utility is the satisfaction from everything consumed; marginal utility is the satisfaction from one more unit, and it is marginal utility that drives a decision.',
    body: [
      { type: 'paragraph', text: '**Utility** is satisfaction. **Total utility** is the satisfaction from all units consumed so far; **marginal utility** is the addition to it from one more unit. A consumer maximising utility is not consuming as much as possible: income is limited, so the question is which unit to buy next.' },
      { type: 'subheading', text: 'One traveller, four coach trips a month' },
      { type: 'paragraph', text: `This traveller would pay ${money(MU[0])} for a first trip in the month, ${money(MU[1])} for a second, ${money(MU[2])} for a third and ${money(MU[3])} for a fourth. Those figures are the marginal utility of each trip, expressed in what they are worth to her.` },
      { type: 'bullets', items: [
        `**Marginal utility** of trips 1 to 4: ${MU.map((m) => money(m)).join(' · ')} — falling every time.`,
        `**Total utility** after 1, 2, 3 and 4 trips: ${[1, 2, 3, 4].map((n) => money(totalUtility(n))).join(' · ')} — still rising, but by less each time.`,
        '**The decision rule**: take the next trip only while its marginal utility is at least the fare.',
      ] },
      { type: 'paragraph', text: `The two move in opposite-looking ways for one reason. Total utility climbs while marginal utility is positive; what falls is each addition. At a fare of ${money(MU[1])} she takes ${tripsAt(MU[1])} trips, because the third is worth ${money(MU[2])} to her and costs more than that.` },
    ],
    realExample: { emoji: '🥤', text: 'A cold drink on a hot afternoon is worth a great deal; the second is pleasant; the third is hard to finish. Nothing about the drink changed — what changed is how much satisfaction one more adds.' },
    misconception: 'Students confuse total with marginal utility and write that utility falls as you consume more. Total utility rises while marginal utility is positive. Write instead: total utility rises at a decreasing rate, because marginal utility diminishes with each extra unit.',
    examMatters: 'An Explain (4 marks, WEC11 Appendix 6) on utility maximisation needs a comparison, not a definition: the marginal utility of the next unit against its price. Working it on the extract\'s figures turns a stated rule into an explained decision.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the distinction the whole of this chapter rests on:',
      template: [
        '___ utility is the satisfaction from everything consumed so far',
        '___ utility is the satisfaction added by one more unit',
        'A buyer takes the next unit only while its ___ is at least the price',
      ],
      answers: ['Total', 'Marginal', 'benefit'],
      hints: ['the running sum, not the addition to it', 'the word economics uses for "one more"', 'what the extra unit is worth to the buyer'],
      distractors: ['Average', 'cost'],
    }),
  };
})();

const herdingHabitInertia = (() => {
  const sid = subId('why-consumers-may-not-act-rationally'); // March id, kept
  return {
    id: sid,
    title: 'Herding, Habit and Inertia',
    keyIdea: 'The first three reasons consumers may not aim to maximise utility: they copy other people, they repeat what they did last time, and they leave things as they are.',
    body: [
      { type: 'paragraph', text: 'The specification asks for reasons why consumers may not aim to maximise utility. These are not lapses of intelligence but ordinary ways of deciding that save effort, and each makes a market behave differently from the model.' },
      { type: 'bullets', items: [
        '**The influence of other people\'s behaviour (herding)** — a buyer treats what everyone else is doing as information about what is worth doing. A queue outside a restaurant attracts a longer queue.',
        '**Habitual behaviour** — a purchase made often enough stops being decided at all. The same brand goes into the basket because it went in last week, and the cheaper alternative beside it is never compared.',
        '**Inertia** — the buyer knows a better option exists and does not move to it. Switching costs time and attention, the gain is spread over months, and the default continues.',
      ] },
      { type: 'paragraph', text: 'Habit and inertia look alike and are not. **Habit** repeats a choice without re-examining it; **inertia** declines to act on an examination already made.' },
      { type: 'paragraph', text: 'For a firm the consequence is the same either way: demand is stickier than the model predicts. A rival with a better offer does not take the market by being better, which is why marketing spends on disrupting a routine rather than explaining a product.' },
    ],
    realExample: { emoji: '📱', text: 'Mobile customers routinely stay on a tariff dearer than the one their own provider advertises to new customers. The cheaper deal is public and the switch takes minutes; most still do not make it.' },
    misconception: 'Students treat these as proof that consumers are irrational. They are reasons a consumer may not aim to maximise utility, which is narrower. Write instead: rationality predicts well in many markets, and these behaviours say where it predicts badly.',
    examMatters: 'An Examine (8 marks, WEC11 Appendix 6) wants the mechanism and a consequence. Name the reason from the specification, say what the buyer does instead of comparing, and follow it to a firm\'s pricing.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each shopper into the reason that best explains what they are doing:',
      groups: [
        { name: 'Herding', items: ['Buying the brand of headphones everyone in class has', 'Joining a long queue because it is long'], why: 'The buyer is treating other people\'s behaviour as evidence about what is worth buying' },
        { name: 'Habitual behaviour', items: ['Picking up the same cereal every week without looking', 'Ordering the usual coffee without reading the board'], why: 'The choice is repeated rather than made; no comparison happens at all' },
        { name: 'Inertia', items: ['Staying on an old phone tariff after seeing a cheaper one', 'Keeping an account after reading that a rival charges less'], why: 'The better option is known and the buyer still does not move to it' },
      ],
    }),
  };
})();

const computationStatusFraming = (() => {
  const sid = subId('computation-status-and-framing');
  return {
    id: sid,
    title: 'Computation, Status and Framing',
    keyIdea: 'The other three reasons: the sums are too hard to do, the purchase says something about the buyer, and the way an offer is presented changes the answer.',
    body: [
      { type: 'bullets', items: [
        '**Poor computational skills** — the comparison is arithmetic the buyer cannot do quickly. A price per pack against a price per hundred grams, or an interest rate on a loan, hides the better deal behind a calculation made at the shelf in seconds.',
        '**The need to feel valued** — the purchase carries a signal. A branded bag, a seat in a better section: part of what is bought is how the buyer is seen, so the cheaper identical good is not identical to them.',
        '**Framing and bias** — the same offer described differently is judged differently. "90% fat free" outsells "10% fat", and a charge feels like a loss where a discount of the same size feels like a gain.',
      ] },
      { type: 'paragraph', text: 'All three are systematic, which is what makes them economics rather than anecdote. They do not cancel out: they push one way, so a seller can design around them, and the policy response follows from the mechanism.' },
      { type: 'paragraph', text: 'Where the problem is computation, making prices comparable helps: unit pricing on a shelf edge, one standard cost figure on a loan. Where it is framing, only the wording of the offer will do.' },
    ],
    realExample: { emoji: '🏷️', text: 'Shelf labels showing a price per unit of weight exist because the pack prices beside them cannot be compared in the seconds a shopper gives them. The information was always there; the arithmetic was the barrier.' },
    misconception: 'Students write that framing works because consumers are careless. It works on people paying attention: it changes which comparison comes to mind first. Write instead: framing changes the reference point a buyer judges an offer against, not how hard they think.',
    examMatters: 'Six reasons are named in the specification, and Examine (8 marks, WEC11 Appendix 6) asks for the influence of something, not an inventory of it. Two, each followed through to what the buyer does and what it lets a firm do, beats a list: a list with no mechanism is description rather than analysis.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each shopper situation to the reason it illustrates:',
      pairs: [
        { left: 'Two packs of rice at different weights and prices', right: 'Poor computational skills', why: 'The better deal is hidden behind arithmetic the shopper cannot do at the shelf' },
        { left: 'Paying more for the version with the visible logo', right: 'The need to feel valued', why: 'Part of what is being bought is what the purchase signals about the buyer' },
        { left: 'Choosing the yoghurt labelled 90% fat free', right: 'Framing and bias', why: 'The same fact stated the other way round would be judged differently' },
      ],
      distractors: ['Habitual behaviour'],
    }),
  };
})();

/* ══ Block 2 — The Demand Curve (1.3.2 · 2a-2d) ════════════════════════════ */

const conceptOfDemand = (() => {
  const sid = subId('demand-and-the-demand-curve'); // March id, kept
  return {
    id: sid,
    title: 'The Concept of Demand',
    keyIdea: 'Demand is the quantity of a good consumers are willing and able to buy at each price in a period. Wanting it is not enough; the money must be there too.',
    body: [
      { type: 'paragraph', text: 'The **concept of demand** has two halves. Consumers must be **willing** to buy at the price, and **able** to pay it. Wanting a car you cannot afford is not demand; economists sometimes call demand backed by the ability to pay **effective demand**, which is the only kind a market responds to.' },
      { type: 'paragraph', text: 'Demand is always stated **at a price** and **over a period**. "Demand for coach tickets is 800" means nothing on its own; "800 tickets a day at a fare of $10" is a fact a firm can use.' },
      { type: 'subheading', text: 'Individual demand and market demand' },
      { type: 'paragraph', text: `**Individual demand** is one buyer's quantity at each price. **Market demand** is every buyer's added together at that same price. For Tafari Coaches the market schedule runs from ${qAt(10)} tickets a day at ${money(10)} to ${qAt(22)} at ${money(22)}: as the fare rises, the quantity demanded falls.` },
      { type: 'paragraph', text: 'Plotted with price on the vertical axis and quantity on the horizontal, that schedule is the **demand curve**, and it slopes downward from left to right. The next subsection explains why it must.' },
    ],
    realExample: { emoji: '🎟️', text: 'Concert promoters release seats in price tiers rather than at one price. Each tier is a point on the demand curve: the cheaper the seat, the larger the number of people both willing and able to take it.' },
    misconception: 'Students use demand and quantity demanded interchangeably. Demand is the whole schedule at every price; quantity demanded is one number at one price. Write instead: name the price whenever you name a quantity, and reserve "demand" for the relationship itself.',
    examMatters: 'A Define (2 marks, WEC11 Appendix 6) on demand must carry both willingness and ability, and the phrase "at a given price". Answers that give only willingness lose the half of the definition that makes demand different from a wish.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the definition the rest of this chapter depends on:',
      template: [
        'Demand is the quantity consumers are ___ and able to buy',
        'at a given ___, over a given period of time',
        'One buyer\'s schedule is individual demand; all buyers added together give ___ demand',
      ],
      answers: ['willing', 'price', 'market'],
      hints: ['the half about wanting it', 'demand is never quoted without one', 'the sum of every individual schedule'],
      distractors: ['quantity', 'total'],
    }),
  };
})();

const dmuAndTheCurve = (() => {
  const sid = subId('diminishing-marginal-utility-and-demand');
  return {
    id: sid,
    title: 'Diminishing Marginal Utility and the Shape of the Demand Curve',
    keyIdea: 'The concept of diminishing marginal utility explains the shape of the individual demand curve: each extra unit is worth less, so it is bought only at a lower price.',
    body: [
      { type: 'paragraph', text: '**Diminishing marginal utility** says that as a consumer takes more of a good in a period, the satisfaction added by each extra unit falls. Its **significance for the shape of the individual demand curve** is why the specification teaches it here.' },
      { type: 'paragraph', text: `Take the traveller from chapter 1 again. Her trips are worth ${MU.map((m) => money(m)).join(', ')} to her, in that order. What she will pay for a trip is what it is worth to her — so her willingness to pay falls as the number of trips rises.` },
      { type: 'flow', steps: [
        { title: 'Each extra unit adds less satisfaction', subtitle: `trip 2 is worth ${money(MU[1])} to her where trip 1 was worth ${money(MU[0])}` },
        { title: 'So the most she will pay for it falls', subtitle: 'willingness to pay is just marginal utility in money' },
        { title: 'She buys the extra unit only at a lower price', subtitle: `at ${money(MU[1])} she takes ${tripsAt(MU[1])} trips; at ${money(MU[2])} she takes ${tripsAt(MU[2])}` },
        { title: 'Quantity demanded rises as price falls', subtitle: 'which is a curve sloping downward from left to right' },
      ], result: 'The individual demand curve slopes down because marginal utility diminishes', resultType: 'neutral' },
      { type: 'paragraph', text: 'Add every individual curve together and the market curve slopes down for the same reason, reinforced by a second: at a lower price, people who bought nothing can now afford a first unit.' },
    ],
    realExample: { emoji: '🍕', text: 'Restaurants discount a second course and rarely a first. The second is worth less to the diner than the first, so it sells only at a lower price: the law of demand in one menu.' },
    misconception: 'Students state diminishing marginal utility and stop, as though it were a separate fact. It is the explanation of the curve. Write instead: because marginal utility diminishes, willingness to pay falls as quantity rises, which is why the demand curve slopes downward.',
    examMatters: 'A question asking why a demand curve slopes downward wants a chain, not a label: marginal utility diminishes, so willingness to pay falls, so an extra unit is bought only at a lower price.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put these links in the causal order that explains why an individual demand curve slopes downward, from the first cause to the final effect:',
      correctOrder: [
        'Each extra unit consumed adds less satisfaction than the one before',
        'The most the buyer will pay for that extra unit therefore falls',
        'She buys the extra unit only if the price has fallen to match',
        'Quantity demanded rises as price falls, so the curve slopes downward',
      ],
      why: [
        'Diminishing marginal utility is the starting assumption, not a consequence of anything here',
        'Willingness to pay is marginal utility expressed in money, so it falls with it',
        'The purchase happens only where the price is at or below what the unit is worth',
        'Collecting those purchases at every price is what draws the curve',
      ],
    }),
  };
})();

const movementsAlong = (() => {
  const sid = subId('movements-along-vs-shifts'); // March id, kept
  return {
    id: sid,
    title: 'Movements Along a Demand Curve',
    keyIdea: 'A change in the good\'s own price moves the buyer along the existing curve: an extension when price falls, a contraction when price rises.',
    body: [
      { type: 'paragraph', text: 'When the price of the good itself changes, nothing about the curve changes. The buyer simply moves to a different point on the one already drawn. That is a **movement along** the demand curve, and it has two directions with two names.' },
      { type: 'bullets', items: [
        '**Extension** — the price falls and quantity demanded rises. The movement is down the curve to the right.',
        '**Contraction** — the price rises and quantity demanded falls. The movement is up the curve to the left.',
      ] },
      { type: 'paragraph', text: `On the Tafari schedule, a fare cut from ${money(20)} to ${money(15)} takes quantity demanded from ${qAt(20)} tickets a day to ${qAt(15)}: an extension. A rise from ${money(10)} to ${money(12)} takes it from ${qAt(10)} to ${qAt(12)}: a contraction. In both cases the curve is the same curve.` },
      { type: 'paragraph', text: 'Why the movement is reliable is the previous subsection\'s answer. Marginal utility diminishes, so at a lower fare the next trip is worth taking to a buyer for whom it was not, and buyers who were priced out altogether can now afford a first one. Nothing about the curve has changed: the price has moved along it.' },
    ],
    realExample: { emoji: '⛽', text: 'When a fuel price falls at the pump, drivers make journeys they had been putting off. No new drivers appeared and nobody\'s tastes changed; the same buyers moved to a different point on the same curve.' },
    misconception: 'Students say demand rose when a price cut raised sales. A price cut cannot change demand, only quantity demanded. Write instead: a fall in the good\'s own price causes an extension in quantity demanded, a movement along the curve, not a shift of it.',
    examMatters: 'The command is usually Draw (4 marks, WEC11 Appendix 6) or Explain (4). For a movement, one curve with the old and the new point marked on it, both axes labelled and the direction named — a second curve on that diagram contradicts the answer beside it.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Decide whether each change to the coach fare causes an extension or a contraction in quantity demanded:',
      groups: [
        { name: 'Extension', items: ['The fare is cut in a January sale', 'A discount card lowers the price paid per trip', 'The operator drops the fare to fill empty seats'], why: 'Price falls, so the buyer moves down the curve to the right and quantity demanded rises' },
        { name: 'Contraction', items: ['A fuel surcharge is added to every fare', 'The fare rises in the holiday season', 'A booking fee raises the total price of a ticket'], why: 'Price rises, so the buyer moves up the curve to the left and quantity demanded falls' },
      ],
    }),
  };
})();

const shiftsOfTheCurve = (() => {
  const sid = subId('shifts-of-the-demand-curve');
  return {
    id: sid,
    title: 'Shifts of a Demand Curve',
    keyIdea: 'Anything other than the good\'s own price moves the whole curve: right when more is wanted at every price, left when less is.',
    body: [
      { type: 'paragraph', text: 'The **distinction between movements along a demand curve and shifts of a demand curve** is the one this topic tests hardest. A shift means the quantity demanded has changed **at every price**, so the old curve no longer describes the market and a new one must be drawn beside it.' },
      { type: 'flow', steps: [
        { title: 'Something other than the fare changes', subtitle: 'income, a related price, tastes, population or advertising' },
        { title: 'Buyers now want a different amount at every fare', subtitle: 'including at the fare that has not moved' },
        { title: 'The whole curve moves', subtitle: 'right for an increase in demand, left for a decrease' },
        { title: 'At the original price, quantity demanded is different', subtitle: 'which is the change the old curve could not show' },
      ], result: 'A new demand curve, D2, drawn beside the old one', resultType: 'neutral' },
      { type: 'bullets', items: [
        '**Rightward shift (an increase in demand)** — more is demanded at every price. Draw D2 to the right of D1.',
        '**Leftward shift (a decrease in demand)** — less is demanded at every price. Draw D2 to the left of D1.',
      ] },
      { type: 'paragraph', text: 'The test is one question: did the price of this good change? If yes, it is a movement; if the cause is anything else, it is a shift. The next subsection names the factors the specification expects you to use.' },
    ],
    realExample: { emoji: '☀️', text: 'A long heatwave lifts sales of cold drinks at every price on the shelf. No drink was repriced; the curve moved right, and sales would have risen even with every price frozen.' },
    misconception: 'Students draw a shift when the question describes a price change of the good itself. Only non-price factors shift a curve. Write instead: name the cause first, then decide — the good\'s own price gives a movement, anything else gives a shift.',
    examMatters: 'A Draw (4 marks, WEC11 Appendix 6) of a shift needs two curves labelled D1 and D2, both axes labelled, an arrow showing the direction, and the new quantity read off at the original price. The reading is what shows the shift did something.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put these stages in the order in which they happen when a non-price factor changes, from the initial cause to the effect you read off the diagram:',
      correctOrder: [
        'A factor other than the fare changes, such as real income',
        'Buyers want a different quantity at every possible fare',
        'The whole demand curve moves left or right to a new position',
        'At the unchanged fare, quantity demanded is read off the new curve',
      ],
      why: [
        'A shift needs a cause outside the good\'s own price, or it would be a movement',
        'That the change happens at every price is exactly what distinguishes a shift',
        'Drawing the new curve is how the change at every price is represented',
        'Reading the new quantity at the old price is what makes the shift visible',
      ],
    }),
  };
})();

const relatedGoodsAndIncome = (() => {
  const sid = subId('factors-that-shift-demand'); // March id, kept
  return {
    id: sid,
    title: 'Shift Factors: Related Goods and Real Income',
    keyIdea: 'Two of the factors that may cause a shift in the demand curve: changes in the price of substitutes or complementary goods, and changes in real income.',
    body: [
      { type: 'paragraph', text: 'The specification names five **factors that may cause a shift in the demand curve**. The first two are the commonest in data questions, because both are prices or incomes a source can quote.' },
      { type: 'subheading', text: 'Changes in the price of substitutes or complementary goods' },
      { type: 'bullets', items: [
        'A **substitute** is a good bought instead. If the air fare on the route rises, some travellers switch to the coach: demand for coach travel shifts **right**.',
        'A **complementary good** is bought alongside. If hotel rooms at the destination get cheaper, more people make the trip: demand for coach travel shifts **right** again, for the opposite reason, because the two are consumed together.',
      ] },
      { type: 'subheading', text: 'Changes in real income' },
      { type: 'paragraph', text: '**Real income** is income adjusted for prices, so it measures what the money buys. A rise in real income shifts demand **right** for most goods, but not all. For a good people buy because they cannot yet afford better, a rise in real income shifts demand **left** as they trade up.' },
      { type: 'paragraph', text: 'That split is the distinction between normal and inferior goods, which chapter 5 measures as income elasticity of demand. Here the point is that the direction of the shift depends on the good.' },
    ],
    realExample: { emoji: '🚌', text: 'Long-distance coach operators gain passengers when airlines add fuel surcharges, and lose them again when fares come back down. The coach fare never moved; the price of its closest substitute did.' },
    misconception: 'Students list price as a factor that shifts demand. The good\'s own price never shifts its own curve. Write instead: a change in the price of a substitute or a complement shifts this good\'s curve; a change in this good\'s price moves along it.',
    examMatters: 'An Explain (4 marks, WEC11 Appendix 6) on a shift wants the factor named, the direction stated and the reason joining them. "Demand rose because more people wanted it" names nothing; "the air fare rose, so travellers switched" is the same length and does the work.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each change to the direction it moves the demand curve for coach travel:',
      pairs: [
        { left: 'The air fare on the same route rises', right: 'Shifts right: a substitute got dearer', why: 'Travellers switch away from the more expensive alternative towards the coach' },
        { left: 'Hotel rooms at the destination get cheaper', right: 'Shifts right: a complement got cheaper', why: 'The whole trip costs less, so more trips are made and more tickets bought' },
        { left: 'Real incomes fall across the city', right: 'Shifts right: coach travel is inferior', why: 'Travellers trade down to the cheaper way of making the same journey' },
        { left: 'A new rail line opens at a lower fare', right: 'Shifts left: a cheaper substitute appeared', why: 'A closer and cheaper alternative takes buyers away at every coach fare' },
      ],
    }),
  };
})();

const tastesPopulationAdvertising = (() => {
  const sid = subId('tastes-population-and-advertising');
  return {
    id: sid,
    title: 'Shift Factors: Tastes, Population and Advertising',
    keyIdea: 'The other three: changes in tastes, changes in the size and age distribution of the population, and advertising.',
    body: [
      { type: 'subheading', text: 'Changes in tastes' },
      { type: 'paragraph', text: 'Fashion, health advice and habit move what people want at every price. A taste change is the hardest factor to evidence and the easiest to assert, so name what changed the taste — a study, a platform, a film — rather than saying tastes changed.' },
      { type: 'subheading', text: 'Changes in size and age distribution of the population' },
      { type: 'paragraph', text: 'Two separate things sit in this one factor. **Size**: more people means more buyers, so demand shifts right for most goods. **Age distribution**: the same total population with a different shape demands different things. An ageing population raises demand for healthcare; a young one raises demand for schooling and first homes, with no change in numbers.' },
      { type: 'subheading', text: 'Advertising' },
      { type: 'paragraph', text: 'Advertising works in two ways: it informs buyers a product exists, and it persuades them it suits them. Both shift the curve right. It also makes buyers less willing to accept a substitute, which chapter 3 revisits as branding.' },
      { type: 'paragraph', text: 'One warning applies to all five. A shift factor explains why a curve moved, never how far. The size of the response is elasticity, which the rest of this section measures.' },
    ],
    realExample: { emoji: '👶', text: 'Firms selling nappies and firms selling hearing aids read the same national statistics for opposite reasons: not the number of people, but how many are at each age.' },
    misconception: 'Students treat a growing population as the explanation for every rise in demand. Size and age distribution are different mechanisms and often point different ways. Write instead: say whether it is the number of people or the shape of the population that changed, and for which good.',
    examMatters: 'Where an extract gives an age breakdown beside a population total, the breakdown is the half that decides the direction of the shift for a particular good. Reading the shift from the age structure, and not just from the total, is what separates an answer using the source from one describing it.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each change into the shift factor it is an example of:',
      groups: [
        { name: 'Changes in tastes', items: ['A published study links a drink to better sleep', 'A film makes a destination fashionable'], why: 'What people want at every price has changed, with no change in income, price or numbers' },
        { name: 'Size and age distribution of the population', items: ['The share of the population over 65 rises', 'Net migration raises the number of households'], why: 'The buyers themselves have changed in number or in age, not in preference' },
        { name: 'Advertising', items: ['A campaign tells commuters the route exists', 'A sponsorship deal puts the name on every shirt'], why: 'The firm has spent to inform or persuade, shifting the curve right at its own expense' },
      ],
    }),
  };
})();

/* ══ Block 3 — Price Elasticity of Demand (1.3.2 · 3a, 3b, 3c, 3d, 3f) ═════ */

const whatElasticityMeasures = (() => {
  const sid = subId('what-elasticity-measures');
  return {
    id: sid,
    title: 'What Elasticity Measures',
    keyIdea: 'Elasticity measures how far quantity demanded responds to something that changed. Three of them share one form: price, income and cross-elasticities of demand.',
    body: [
      { type: 'paragraph', text: 'Chapter 2 said which way a curve moves. **Elasticity** answers the question that decides whether the move matters: by how much. It is always a **responsiveness**, and always the same shape — the percentage change in quantity demanded divided by the percentage change in whatever caused it.' },
      { type: 'paragraph', text: 'The specification names three: the **concepts of price, income and cross-elasticities of demand**. They differ only in what goes on the bottom of the fraction.' },
      { type: 'bullets', items: [
        '**Price elasticity of demand (PED)** — the cause is the good\'s own price. Answers: if we change our fare, how much volume moves?',
        '**Income elasticity of demand (YED)** — the cause is consumers\' real income. Answers: what happens to us in a boom or a downturn?',
        '**Cross elasticity of demand (XED)** — the cause is the price of another good. Answers: who are our rivals, and what is sold alongside us?',
      ] },
      { type: 'paragraph', text: 'Three things are true of all of them. They are **percentages**, so they can be compared across goods priced in different currencies. Their **sign** carries meaning, not just their size. And each is measured **holding everything else constant**, which is the assumption evaluation questions attack first.' },
    ],
    realExample: { emoji: '🧮', text: 'A streaming service raising its monthly price, a carmaker planning for a downturn and a regulator deciding whether two firms compete are asking the same question in three forms: how much does quantity move, and in response to what.' },
    misconception: 'Students treat elasticity as a property of a good, fixed for ever. It is measured at a point in time, at a particular price, over a particular period. Write instead: elasticity is a measurement of a response, so it changes with the price, the period and the buyer.',
    examMatters: 'A Calculate (4 marks, WEC11 Appendix 6) is marked on method as much as on the answer: the formula, the substitution, then the result with its sign. The sentence saying what the number means is what the next part of the question is for.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the family of three the rest of this section uses:',
      template: [
        'Every elasticity divides a ___ change in quantity demanded by the same kind of change in its cause',
        'For PED, what sits underneath the fraction is the good\'s own ___',
        'For YED it is real ___, and for XED it is what another firm charges',
      ],
      answers: ['percentage', 'price', 'income'],
      hints: ['why a value can be compared between two currencies', 'the cause PED measures the response to', 'adjusted for inflation, so it measures what the money buys'],
      distractors: ['absolute', 'quantity'],
    }),
  };
})();

const pedFormula = (() => {
  const sid = subId('ped-definition-and-formula'); // March id, kept
  const [p1, p2] = PED_INELASTIC;
  return {
    id: sid,
    title: 'Calculating Price Elasticity of Demand',
    keyIdea: 'PED is the percentage change in quantity demanded divided by the percentage change in price. It is almost always negative, because the two move in opposite directions.',
    body: [
      { type: 'paragraph', text: 'Here is how to **use the formula to calculate price elasticity of demand**. Percentages first, then the division: raw tickets and dollars give a different answer for the same change measured in different units.' },
      { type: 'subheading', text: 'Reading the two rows off the demand schedule' },
      { type: 'paragraph', text: `A paper gives the data as a **table**, and this chapter's diagram carries Tafari's schedule as one. The calculation starts by finding the two rows it needs. The fare rises from ${money(p1)} to ${money(p2)}:` },
      { type: 'bullets', items: [
        `The ${money(p1)} row shows **${qAt(p1)}** tickets a day and the ${money(p2)} row shows **${qAt(p2)}**. The ${money(p1)} row is the **original**, so both percentages are measured against it.`,
      ] },
      { type: 'flow', steps: [
        { title: 'Read both quantities off the demand schedule', subtitle: `${qAt(p1)} tickets a day at ${money(p1)}, ${qAt(p2)} at ${money(p2)}` },
        { title: 'Convert both changes into percentages of their original values', subtitle: `quantity ${pctQ(p1, p2)}%, price ${pctP(p1, p2)}%` },
        { title: 'Divide the quantity percentage by the price percentage', subtitle: `${pctQ(p1, p2)} ÷ ${pctP(p1, p2)} = ${ped(p1, p2)}` },
        { title: 'Compare the size of the answer with 1', subtitle: `${Math.abs(ped(p1, p2))} is below 1, so demand is price inelastic here` },
      ], result: `PED = ${ped(p1, p2)} at this point on the curve`, resultType: 'neutral' },
      { type: 'paragraph', text: '**Always divide by the original value**: dividing by the new quantity is the commonest way this goes wrong. Quantity goes on top because quantity is what responds.' },
      { type: 'paragraph', text: 'The sign is negative here and almost always, because a price rise cuts quantity demanded. In words it is dropped and the **absolute value** compared with 1 — the next subsection.' },
    ],
    realExample: { emoji: '🎫', text: 'Airlines re-price the same seat many times before departure and record what bookings do. What they are building is the schedule itself, one row at a time.' },
    misconception: 'Students put the changes into the formula as raw numbers. A fall of 80 tickets means nothing without the base it fell from. Write instead: convert both changes to percentages of their original values first.',
    examMatters: 'A Calculate (4 marks, WEC11 Appendix 6) is worked on the table\'s own figures. Show the formula, substitute, and sign the answer: an unsigned PED leaves the direction unstated.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put these steps in the order you would work through the PED calculation, from reading the data to stating the answer:',
      correctOrder: [
        'Read the original and new quantity demanded from the data',
        'Convert both the quantity change and the price change into percentages of their original values',
        'Divide the quantity percentage by the price percentage, keeping the sign',
        'Compare the size of the answer with 1 to say whether demand is elastic or inelastic',
      ],
      why: [
        'Nothing can be turned into a percentage until both raw values are known',
        'Both halves of the fraction must be percentages, each measured against its own original value',
        'Quantity goes on top because quantity is what is responding to the price',
        'The value is not an answer until it has been read against 1, which is the whole scale',
      ],
    }),
  };
})();

const interpretingPed = (() => {
  const sid = subId('interpreting-ped-values'); // March id, kept
  return {
    id: sid,
    title: 'Interpreting PED Values',
    keyIdea: 'Compare the absolute value of PED with 1. Above 1 the response is larger than the cause; below 1 it is smaller; the two extremes are the limits of the scale.',
    body: [
      { type: 'paragraph', text: 'Five values are named, and they sit on one scale from no response at all to an unlimited one. Compare the size of PED, ignoring the minus sign, with 1.' },
      { type: 'bullets', items: [
        '**Perfectly price inelastic demand** (PED = 0) — quantity does not move at all and the curve is vertical. A limit, approached by a medicine with no alternative.',
        '**Price inelastic demand** (between 0 and 1) — quantity moves proportionally less than price. The curve is steep.',
        '**Unitary price elastic demand** (exactly 1) — quantity moves in exactly the same proportion as price.',
        '**Price elastic demand** (above 1) — quantity moves proportionally more than price. The curve is shallow.',
        '**Perfectly price elastic demand** (infinite) — at one price buyers take any quantity and above it none, so the curve is horizontal. The limit a seller of an identical commodity faces.',
      ] },
      { type: 'paragraph', text: `On the Tafari curve, the rise from ${money(PED_INELASTIC[0])} to ${money(PED_INELASTIC[1])} gave ${ped(...PED_INELASTIC)}: price inelastic, because ${Math.abs(ped(...PED_INELASTIC))} is less than 1. Higher up the same line, ${money(PED_ELASTIC[0])} to ${money(PED_ELASTIC[1])} gives ${ped(...PED_ELASTIC)}: price elastic.` },
      { type: 'paragraph', text: 'Say all three or the number is unused: the value, the classification, and what it means for whoever is deciding. A PED with no interpretation has answered a calculation, not a question.' },
    ],
    realExample: { emoji: '💊', text: 'A patient with one prescription and no alternative buys the same quantity at any price; a shopper facing twenty near-identical cooking oils switches over a few cents.' },
    misconception: 'Students write that necessities are always inelastic. It depends on how narrowly the good is defined: water as a category is very inelastic, one brand of bottled water is not. Write instead: what makes demand inelastic is the absence of substitutes, not the importance of the good.',
    examMatters: 'An Explain (4 marks, WEC11 Appendix 6) on an elasticity value turns on the interpretation, not the arithmetic. Value, classification, consequence — and the consequence must be for the agent the question names.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each value of PED to the name the specification gives it:',
      pairs: [
        { left: 'PED = 0', right: 'Perfectly price inelastic demand', why: 'Quantity demanded does not respond at all, so the curve is vertical' },
        { left: 'PED = −0.5', right: 'Price inelastic demand', why: 'Quantity moves proportionally less than price: the size is between 0 and 1' },
        { left: 'PED = −1', right: 'Unitary price elastic demand', why: 'Quantity moves in exactly the same proportion as price' },
        { left: 'PED = −2', right: 'Price elastic demand', why: 'Quantity moves proportionally more than price: the size is above 1' },
        { left: 'PED is infinite', right: 'Perfectly price elastic demand', why: 'Any quantity sells at one price and none above it, so the curve is horizontal' },
      ],
    }),
  };
})();

const pedFactors = (() => {
  const sid = subId('factors-influencing-ped'); // March id, kept
  return {
    id: sid,
    title: 'The Factors Influencing PED',
    keyIdea: 'Five factors influence price elasticity of demand, and every one of them works by changing how easily a buyer can go elsewhere or do without.',
    body: [
      { type: 'bullets', items: [
        '**Availability of substitutes** — the more close alternatives, the easier it is to switch and the more elastic demand becomes. This is the factor the other four work through.',
        '**Branding** — a brand attaches an expectation to a name, so buyers stop treating rivals as substitutes even when the products are alike. It makes demand **less** elastic, which is what the spending buys.',
        '**Percentage of total expenditure** — a good taking a tiny share of spending is barely noticed when its price rises, so demand is inelastic. One taking a large share is compared carefully, so demand is elastic.',
        '**Addictiveness of product** — an addictive good is one the buyer cannot readily do without, so quantity moves little with price and demand is inelastic.',
        '**Durability of product** — a durable good can have its replacement postponed, so a price rise is met by keeping the old one. A perishable good cannot wait, so demand is less elastic.',
      ] },
      { type: 'paragraph', text: '**Time** runs underneath all five. In the short run buyers have few alternatives arranged; over a longer period they find substitutes and change habits, so demand becomes more elastic the longer the price change lasts.' },
      { type: 'paragraph', text: 'Naming a factor is not analysis. Join each to substitutability — why the buyer can or cannot go elsewhere — and then to what the firm can do with its price.' },
    ],
    realExample: { emoji: '🧂', text: 'Salt is inelastic for three of these reasons at once: substitutes are not wanted, it takes a trivial share of a food budget, and no meal waits until it is cheaper.' },
    misconception: 'Students list the factors without saying why each one matters, which is description rather than analysis. Write instead: state the factor, explain how it changes the buyer\'s ability to switch or postpone, and only then say what happens to elasticity.',
    examMatters: 'Two developed factors beat five named ones. Anchor each to the product in the extract: the same factor points different ways for a branded good and an unbranded one.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Decide whether each feature makes demand for a product more elastic or more inelastic:',
      groups: [
        { name: 'More elastic', items: ['Many near-identical rival products on the shelf', 'The good takes a large share of the buyer\'s income', 'The product is durable and replacement can wait'], why: 'Each one makes it easier for the buyer to switch away or postpone, so quantity responds strongly' },
        { name: 'More inelastic', items: ['A strong brand buyers ask for by name', 'The product is addictive', 'The good costs a few cents out of a weekly budget'], why: 'Each one removes an alternative or removes the reason to look for one, so quantity barely moves' },
      ],
    }),
  };
})();

const pedAlongTheLine = (() => {
  const sid = subId('ped-along-a-straight-line');
  return {
    id: sid,
    title: 'PED Along a Straight-Line Demand Curve',
    keyIdea: 'Price elasticity of demand varies along a straight line demand curve: elastic above the midpoint, unitary at it, inelastic below. The slope is constant; the elasticity is not.',
    body: [
      { type: 'paragraph', text: 'A straight demand curve has one slope all the way down, which makes it tempting to give it one elasticity. It has many. **How price elasticity of demand varies along a straight line demand curve** is required here, because elasticity compares *percentage* changes and the slope compares absolute ones.' },
      { type: 'paragraph', text: `At the top of the Tafari line the fare is high and the quantity small, so a dollar off is a small percentage of the price and wins tickets that are a large percentage of a small quantity. At the bottom the same dollar is a large percentage of a low fare and wins a small percentage of a large quantity.` },
      { type: 'bullets', items: [
        `**Above the midpoint** — fares over ${money(MID_P)}. Demand is price elastic: ${money(PED_ELASTIC[0])} to ${money(PED_ELASTIC[1])} gives ${ped(...PED_ELASTIC)}.`,
        `**At the midpoint** — a fare of ${money(MID_P)}, where quantity is ${MID_Q} tickets. Demand is unitary price elastic.`,
        `**Below the midpoint** — fares under ${money(MID_P)}. Demand is price inelastic: ${money(PED_INELASTIC[0])} to ${money(PED_INELASTIC[1])} gives ${ped(...PED_INELASTIC)}.`,
      ] },
      { type: 'paragraph', text: `The two ends are the limits: as the fare approaches ${money(CHOKE_P)} the last buyers leave and elasticity is unbounded, and as it approaches zero elasticity approaches nothing. This is why a firm cannot be told "your demand is elastic" without being told at which price.` },
    ],
    realExample: { emoji: '📉', text: 'A rail operator finds early-morning commuter seats hard to shift on price and off-peak leisure seats easy. One product, one line; what differs is where on the curve each fare sits.' },
    misconception: 'Students read a constant slope as a constant elasticity. Slope compares absolute changes; elasticity compares proportional ones, and the proportions change as you move. Write instead: on a straight-line demand curve, PED falls in size as price falls, passing through 1 at the midpoint.',
    examMatters: 'A Draw (4 marks, WEC11 Appendix 6) here needs one straight curve, the midpoint marked, and the elastic and inelastic ranges labelled above and below it. The labels are what show the ranges were understood.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete what happens to elasticity as you move down one straight demand curve:',
      template: [
        'Above the midpoint, where the price is high, demand is price ___',
        'Exactly at the midpoint, the value of PED is ___',
        'Below the midpoint, where the price is low, demand is price ___',
      ],
      answers: ['elastic', 'one', 'inelastic'],
      hints: ['quantity responds proportionally more than price does', 'the number the whole scale is compared against', 'quantity responds proportionally less than price does'],
      distractors: ['constant', 'zero'],
    }),
  };
})();

/* ══ Block 4 — Total Revenue and Pricing Decisions (1.3.2 · 3e, 3g) ════════ */

const totalRevenue = (() => {
  const sid = subId('calculating-total-revenue');
  return {
    id: sid,
    title: 'Calculating Total Revenue',
    keyIdea: 'Total revenue is price multiplied by quantity sold. Because a price change moves both numbers in opposite directions, the product can rise or fall.',
    body: [
      { type: 'paragraph', text: 'Here is **how to calculate total revenue**: multiply the price by the quantity sold at that price. It is the money coming in before any cost is taken off, so it is not profit and should never be called it.' },
      { type: 'subheading', text: 'Tafari at five fares' },
      { type: 'bullets', items: [
        `${money(10)} × ${qAt(10)} tickets = **${money(trAt(10))}** a day`,
        `${money(12)} × ${qAt(12)} tickets = **${money(trAt(12))}**`,
        `${money(MID_P)} × ${qAt(MID_P)} tickets = **${money(MAX_TR)}**`,
        `${money(20)} × ${qAt(20)} tickets = **${money(trAt(20))}**`,
        `${money(22)} × ${qAt(22)} tickets = **${money(trAt(22))}**`,
      ] },
      { type: 'paragraph', text: `Read down the column and revenue rises, peaks and falls again. It is not the fare that decides which happens: it is whether the percentage the quantity loses is smaller or larger than the percentage the price gains. That comparison is PED, which is why these two subsections belong together.` },
      { type: 'paragraph', text: `On a diagram, total revenue is the rectangle under the point on the demand curve — the price up one side and the quantity along the bottom. Moving to a different point redraws the rectangle taller and narrower, or shorter and wider, and the area can go either way.` },
    ],
    realExample: { emoji: '🧾', text: 'A stallholder who cuts a price and sells out has more revenue only if the extra units more than pay for the money given up on the units that would have sold anyway. Selling out is not the test; the takings at the end of the day are.' },
    misconception: 'Students treat revenue and profit as the same number. Revenue is price times quantity; profit is what is left after costs. Write instead: a price change alters revenue directly, and alters profit only once the cost of serving the extra units is taken off.',
    examMatters: 'A Calculate (2 marks, WEC11 Appendix 6) on total revenue is the easiest arithmetic in the topic and the easiest to lose: the answer needs its units and its period, because revenue a day and revenue a year are different figures from the same multiplication.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each Tafari fare to the total revenue it brings in per day:',
      pairs: [
        { left: `${money(12)} a ticket`, right: money(trAt(12)), why: `${qAt(12)} tickets are sold at that fare, and ${12} × ${qAt(12)} is ${money(trAt(12))}` },
        { left: `${money(MID_P)} a ticket`, right: money(MAX_TR), why: `${qAt(MID_P)} tickets at the midpoint fare, which is where revenue is at its highest` },
        { left: `${money(20)} a ticket`, right: money(trAt(20)), why: `Only ${qAt(20)} tickets sell at this fare, so the higher price does not make up the lost volume` },
        { left: `${money(22)} a ticket`, right: money(trAt(22)), why: `${qAt(22)} tickets at the dearest fare gives the smallest takings of the four` },
      ],
    }),
  };
})();

const pedAndRevenue = (() => {
  const sid = subId('ped-and-total-revenue'); // March id, kept
  return {
    id: sid,
    title: 'PED and Total Revenue',
    keyIdea: 'The relationship between price elasticity of demand and total revenue: raise price where demand is inelastic, cut it where demand is elastic.',
    body: [
      { type: 'paragraph', text: 'This is the single most useful result in the topic. **The relationship between price elasticity of demand and total revenue** turns an elasticity value into a pricing decision.' },
      { type: 'bullets', items: [
        '**Demand inelastic** (size below 1) — price and revenue move **together**. Quantity falls proportionally less than price rises, so raising the price raises revenue.',
        '**Demand elastic** (size above 1) — price and revenue move in **opposite** directions. Quantity falls proportionally more than price rises, so raising the price lowers revenue.',
        '**Demand unitary elastic** (exactly 1) — the two percentages cancel, so revenue does not change. This is where revenue is at its maximum.',
      ] },
      { type: 'paragraph', text: `The Tafari line shows all three. From ${money(PED_INELASTIC[0])} to ${money(PED_INELASTIC[1])}, where PED is ${ped(...PED_INELASTIC)}, revenue rises from ${money(trAt(PED_INELASTIC[0]))} to ${money(trAt(PED_INELASTIC[1]))}. From ${money(PED_ELASTIC[0])} to ${money(PED_ELASTIC[1])}, where PED is ${ped(...PED_ELASTIC)}, revenue falls from ${money(trAt(PED_ELASTIC[0]))} to ${money(trAt(PED_ELASTIC[1]))}. Revenue peaks at ${money(MAX_TR)} at the fare of ${money(MID_P)}, exactly where PED is 1.` },
      { type: 'paragraph', text: 'One caution before recommending a price rise: maximum revenue is not maximum profit. The fare that fills the most seats may cost more to serve than a dearer, emptier one.' },
    ],
    realExample: { emoji: '🍔', text: 'Fast-food chains run value menus and premium ranges at the same counter. The cheap items are priced where demand responds sharply and the premium ones where it does not, which is two different answers to the same question on one menu board.' },
    misconception: 'Students assume that raising a price always raises revenue. It does so only where demand is inelastic; where it is elastic the volume lost outweighs the price gained. Write instead: the direction depends on PED, so state the elasticity before predicting the revenue.',
    examMatters: 'An Analyse (6 marks, WEC11 Appendix 6) on a pricing decision is built as a chain: the PED value, the classification, the direction revenue moves, and the figure it moves to if the extract supplies the numbers. A recommendation with no elasticity in it has skipped the analysis.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each firm into the pricing move that would raise its total revenue:',
      groups: [
        { name: 'Raise the price', items: ['A toll bridge with no alternative crossing nearby', 'A brand of medicine with no close equivalent', 'A stadium\'s only food outlet during a match'], why: 'Demand is price inelastic, so quantity falls proportionally less than the price rises' },
        { name: 'Cut the price', items: ['One of thirty identical rice brands in a market', 'A budget airline on a route three rivals also fly', 'A phone case sold beside dozens like it online'], why: 'Demand is price elastic, so the extra quantity more than replaces the revenue given up per unit' },
      ],
    }),
  };
})();

/* ══ Block 5 — Income and Cross Elasticity of Demand (1.3.2 · 3b, 3h, 3i) ══ */

const yedFormula = (() => {
  const sid = subId('yed-definition-and-formula'); // March id, kept
  return {
    id: sid,
    title: 'Calculating Income Elasticity of Demand',
    keyIdea: 'YED is the percentage change in quantity demanded divided by the percentage change in real income. Its sign, not its size, is what classifies the good.',
    body: [
      { type: 'paragraph', text: 'Income elasticity of demand measures how demand responds to a change in consumers\' **real income**. The formula has the same shape as PED with income on the bottom, and it is calculated the same way: percentages first, then divide.' },
      { type: 'subheading', text: `Worked example: real incomes across the city rise ${INCOME_RISE}%` },
      { type: 'bullets', items: [
        `**Coach tickets**: quantity demanded changes by ${COACH_YQ}%. YED = ${COACH_YQ} ÷ ${INCOME_RISE} = **${yed(COACH_YQ)}**.`,
        `**Air tickets on the same route**: quantity demanded changes by +${AIR_YQ}%. YED = ${AIR_YQ} ÷ ${INCOME_RISE} = **+${yed(AIR_YQ)}**.`,
        `**Rice**: quantity demanded changes by +${RICE_YQ}%. YED = ${RICE_YQ} ÷ ${INCOME_RISE} = **+${yed(RICE_YQ)}**.`,
      ] },
      { type: 'paragraph', text: 'Three goods in one city, one income change, three different answers — and the differences are what a firm plans with. The sign comes first: **positive** means demand rose with income, **negative** means it fell. Only then does the size matter.' },
      { type: 'paragraph', text: 'Use **real** income and not money income. If wages rise ten per cent while prices rise ten per cent, nothing has happened to what people can buy, and a YED calculated on the money figure would report a response to a change that did not occur.' },
    ],
    realExample: { emoji: '🛵', text: 'When incomes in a city rise, sales of second-hand scooters and sales of new cars move in opposite directions. Both are transport, both face the same customers; what separates them is which way demand responds to having more money.' },
    misconception: 'Students report YED without its sign, as they were taught to do for PED. The sign is the answer for YED: it is what separates a normal good from an inferior one. Write instead: always state the sign of YED first, then classify the good, then give the size.',
    examMatters: 'A Calculate (4 marks, WEC11 Appendix 6) on YED expects the formula, the substitution and a signed answer. The mark for interpretation is usually in the next part, and it wants the classification of the good rather than a repetition of the number.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the formula and the rule that goes with it:',
      template: [
        'YED = percentage change in quantity demanded ÷ percentage change in ___ income',
        'A ___ value means demand rose when income rose, so the good is normal',
        'A negative value means demand ___ when income rose, so the good is inferior',
      ],
      answers: ['real', 'positive', 'fell'],
      hints: ['adjusted for prices, so it measures what the money buys', 'the sign a normal good carries', 'what happened to quantity demanded as people got richer'],
      distractors: ['money', 'rose'],
    }),
  };
})();

const interpretingYed = (() => {
  const sid = subId('interpreting-yed-values'); // March id, kept
  return {
    id: sid,
    title: 'Interpreting YED Values: Normal and Inferior Goods',
    keyIdea: 'The sign gives the distinction between normal goods and inferior goods; the size says whether a normal good is a luxury or a necessity.',
    body: [
      { type: 'paragraph', text: 'Read the sign first, then the size. The **distinction between normal goods and inferior goods** is the sign; everything else is a matter of degree.' },
      { type: 'bullets', items: [
        '**Negative YED — an inferior good.** Demand falls as income rises. Buyers move to something they could not afford before.',
        '**Positive YED between 0 and 1 — income inelastic demand, a necessity.** Demand rises with income but proportionally less: there is a limit to how much anybody needs.',
        '**Positive YED above 1 — income elastic demand, a luxury.** Demand rises proportionally more than income.',
        '**Perfectly income inelastic demand** (YED = 0) — demand does not respond to income at all.',
        '**Perfectly income elastic demand** — the limit, where any change in income produces an unlimited change in quantity demanded.',
      ] },
      { type: 'paragraph', text: `Tafari\'s three goods fall in three places: coach travel at ${yed(COACH_YQ)} is inferior, air travel at +${yed(AIR_YQ)} is a luxury, and rice at +${yed(RICE_YQ)} is a necessity. Reverse the income change and every sign reverses with it — in a downturn the inferior good is the one that grows.` },
      { type: 'paragraph', text: 'So a firm with a range across the scale is steadier than one concentrated at either end. The range does not earn more in a good year; it makes the bad years survivable.' },
    ],
    realExample: { emoji: '🏨', text: 'Hotel groups run budget and premium brands side by side and expect them to peak at different points of the cycle. Neither is a hedge alone; owning both smooths the takings.' },
    misconception: 'Students assume inferior means low quality. Inferiority is about how demand responds to income, not about how good the product is. Write instead: an inferior good is one whose demand falls as real income rises, whatever its quality — bus travel is the standing example.',
    examMatters: 'Where an extract describes a boom or a downturn, YED is what the question is testing. Classify the good, say which way demand moves, and name the decision the firm should take.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each good by what its YED value says about it:',
      groups: [
        { name: 'Inferior good (negative YED)', items: ['Long-distance coach travel', 'Instant noodles bought by the case'], why: 'Demand falls as real income rises, because buyers trade up to something else' },
        { name: 'Necessity (YED between 0 and 1)', items: ['Rice bought for the household', 'Basic household electricity'], why: 'Demand rises with income but proportionally less: there is a limit to how much is needed' },
        { name: 'Luxury (YED above 1)', items: ['Air travel on a holiday route', 'Meals in restaurants with table service'], why: 'Demand rises proportionally more than income, so it grows fast in good years and falls fast in bad ones' },
      ],
    }),
  };
})();

const xedFormula = (() => {
  const sid = subId('xed-definition-and-formula'); // March id, kept
  return {
    id: sid,
    title: 'Calculating Cross Elasticity of Demand',
    keyIdea: 'XED is the percentage change in quantity demanded of one good divided by the percentage change in the price of another. Keep the two goods the right way up.',
    body: [
      { type: 'paragraph', text: 'Cross elasticity of demand measures how the demand for good A responds to a change in the price of good B. The order matters: **A on top, B on the bottom**, and swapping them answers a different question.' },
      { type: 'flow', steps: [
        { title: 'The price of the other good, B, changes', subtitle: `the air fare on the route rises ${AIR_FARE_RISE}%` },
        { title: 'Buyers reconsider which of the two to take', subtitle: 'the coach has not changed its own fare at all' },
        { title: 'Quantity demanded of A moves at every price', subtitle: `coach tickets rise ${COACH_XQ}%` },
        { title: 'Divide A\'s percentage by B\'s to get XED', subtitle: `${COACH_XQ} ÷ ${AIR_FARE_RISE} = +${XED_SUBSTITUTE()}` },
      ], result: `XED is positive, so coach and air travel are substitutes`, resultType: 'neutral' },
      { type: 'paragraph', text: `The second case runs the other way. When Tafari cuts its own fare by ${Math.abs(COACH_FARE_FALL)}%, hotel nights at the destination rise ${HOTEL_XQ}%: XED = ${HOTEL_XQ} ÷ ${COACH_FARE_FALL} = **${XED_COMPLEMENT()}**. A negative value, because the two are bought together.` },
      { type: 'paragraph', text: 'Both figures are positive numbers divided into each other with their own signs kept. A cheaper complement and a dearer substitute both raise demand, and it is the sign of the denominator that tells the two cases apart.' },
    ],
    realExample: { emoji: '🖨️', text: 'Printer makers price the machine low and the cartridges high. The pricing only works because the two are strong complements: nobody buys the cartridge without the printer, so the cheap machine is what sells the expensive refill.' },
    misconception: 'Students put the two goods the wrong way up, or drop the sign of the price change. Write instead: quantity of the good you are studying on top, price of the other good underneath, and carry both signs through the division.',
    examMatters: 'A Calculate (4 marks, WEC11 Appendix 6) on XED is marked on the signed answer and the statement that follows it. Say which good is A and which is B before substituting: the question names the good whose demand is being measured, and the extract names both of them.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put these stages in the order in which they happen, from the change in the other good\'s price to the conclusion about the two goods:',
      correctOrder: [
        'The price of the other good, B, rises while good A\'s price is unchanged',
        'Buyers switch away from B and towards A at every price of A',
        'Quantity demanded of A rises, and the rise is expressed as a percentage',
        'Dividing A\'s percentage by B\'s gives a positive XED, so the two are substitutes',
      ],
      why: [
        'XED is measured from a change in the other good\'s price, and A\'s own price must be held still',
        'The switching is the behaviour the number is about to measure',
        'Only a percentage can go into the formula, because the goods are priced differently',
        'The sign of the result is what names the relationship, and positive means substitutes',
      ],
    }),
  };
})();

const interpretingXed = (() => {
  const sid = subId('interpreting-xed-values'); // March id, kept
  return {
    id: sid,
    title: 'Interpreting XED Values',
    keyIdea: 'The sign of XED says what the relationship is and its size says how strong it is: substitutes, complements, or unrelated goods.',
    body: [
      { type: 'paragraph', text: 'XED answers a question a firm cannot answer by looking at its own products: who is it actually competing with? Interpretation of numerical values of cross elasticity of demand shows the **degree** to which two goods are related.' },
      { type: 'bullets', items: [
        '**Positive XED — substitutes.** A dearer B sends buyers to A, and the larger the value the more directly the two compete.',
        '**Negative XED — complements.** A dearer B means less of A is bought, because the two are consumed together, and the larger the size the stronger the pairing.',
        '**XED near zero — unrelated.** A price change in B does nothing to demand for A. The two are in different markets whatever they look like on a shelf.',
      ] },
      { type: 'paragraph', text: `Size is the part most answers leave out. Coach and air travel at +${XED_SUBSTITUTE()} are substitutes but not close ones: most of the air fare rise stayed with air travel. A value of +2.5 would describe two goods a buyer treats as interchangeable, and would mean a rival\'s price change hits this firm almost one for one.` },
      { type: 'paragraph', text: `The same holds on the negative side. Coach tickets and hotel nights at ${XED_COMPLEMENT()} are linked but loosely; a printer and its own cartridges would be far stronger, which is what makes selling one below cost a workable strategy.` },
    ],
    realExample: { emoji: '🎮', text: 'A console maker watches the price of rival consoles and of the games that run on its own. One relationship is positive and one negative, and different parts of the firm manage each.' },
    misconception: 'Students read the sign and stop. A value of +0.1 and a value of +3 are both positive and mean entirely different things. Write instead: state the sign to name the relationship, then the size to say how strong it is and how much it should change a decision.',
    examMatters: 'Where a question asks about competition or bundling, XED is the measure it wants: sign, strength and consequence. The consequence should name a price, a partner or a market boundary.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each XED value to what it tells a firm about the two goods:',
      pairs: [
        { left: 'XED = +2.5', right: 'Close substitutes, competing directly', why: 'A large positive value means buyers move between the two almost one for one' },
        { left: `XED = +${XED_SUBSTITUTE()}`, right: 'Substitutes, but weakly linked', why: 'Positive, so buyers do switch, but most of the change stays with the other good' },
        { left: `XED = ${XED_COMPLEMENT()}`, right: 'Complements, bought together', why: 'Negative, so a dearer other good reduces demand for this one' },
        { left: 'XED = 0.0', right: 'Unrelated goods in separate markets', why: 'A price change in the other good leaves demand for this one where it was' },
      ],
    }),
  };
})();

/* ══ Block 6 — The Significance of Elasticities (1.3.2 · 3j) ═══════════════ */

const significanceForFirms = (() => {
  const sid = subId('using-elasticities-for-business-decisions'); // March id, kept
  return {
    id: sid,
    title: 'Significance for Firms',
    keyIdea: 'The significance of price, income and cross-elasticities of demand for firms: what to charge, what to stock for the cycle, and who to watch.',
    body: [
      { type: 'paragraph', text: 'The specification asks for the **significance of price, income and cross-elasticities of demand for firms, consumers and the government**. This subsection takes the first; each elasticity answers a different decision.' },
      { type: 'bullets', items: [
        '**PED sets the price.** Where demand is inelastic, a rise raises revenue; where it is elastic, a cut does. It also says how much can be passed on when a supplier raises a cost.',
        '**YED shapes the product range.** A firm whose goods are all income elastic grows fast and falls hard. Knowing the YED of each line is what lets it plan for a downturn.',
        '**XED identifies rivals and partners.** A high positive XED names the firm whose price changes must be answered; a strong negative one names the good worth bundling or selling alongside.',
      ] },
      { type: 'paragraph', text: 'Two limits belong in any answer recommending action on a value. Elasticities come from past data, which guides only while conditions hold; and each holds everything else constant, which no real market does. A fare rise met by a rival\'s cut will not give the revenue PED predicted.' },
      { type: 'paragraph', text: 'So an elasticity starts the decision rather than ending it. It narrows the sensible options; costs, the rival\'s response and the state of the economy decide between them.' },
    ],
    realExample: { emoji: '📊', text: 'Supermarkets price staples keenly and premium ranges much less so, because the two respond differently to the same cent. One shelf, several elasticity estimates at once.' },
    misconception: 'Students treat an elasticity as a decision rather than an input. A value tells a firm what happens to volume, not whether the move is worth making. Write instead: use the elasticity to predict the revenue change, then weigh it against costs and rivals before recommending anything.',
    examMatters: 'An Evaluate (20 marks, WEC11 Appendix 6) recommending a price change turns on the weighing, not the calculation. Make the elasticity case, then the limits — data age, ceteris paribus, the rival\'s response — then judge.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each decision by the elasticity a firm would use to make it:',
      groups: [
        { name: 'PED', items: ['Whether to raise the fare on a busy route', 'How much of a supplier\'s cost rise to pass on'], why: 'Both turn on how quantity responds to this firm\'s own price' },
        { name: 'YED', items: ['Whether to add a budget range before a downturn', 'Which product line will grow fastest as the economy grows'], why: 'Both turn on how demand responds to consumers\' real income' },
        { name: 'XED', items: ['Which rival\'s price cut must be answered', 'Which accessory to discount to sell the main product'], why: 'Both turn on how demand responds to the price of another good' },
      ],
    }),
  };
})();

const significanceForConsumers = (() => {
  const sid = subId('significance-for-consumers');
  return {
    id: sid,
    title: 'Significance for Consumers',
    keyIdea: 'For consumers, elasticity decides who carries a price rise. The less elastic your demand, the more of any increase you end up paying.',
    body: [
      { type: 'paragraph', text: 'The specification names consumers alongside firms and the government. Elasticity matters to a buyer for a reason the other two do not share: it decides how much of a price change lands on them.' },
      { type: 'bullets', items: [
        '**Inelastic demand is expensive to have.** A buyer with no substitute absorbs a price rise almost in full, because there is nowhere to go.',
        '**Elastic demand is protection.** Where alternatives exist, a buyer can move, and the threat of moving is what keeps the seller\'s price down in the first place.',
        '**Income elasticity explains a household\'s own budget.** As income rises, the share going to necessities falls and the share going to income-elastic goods rises: YED from the buyer\'s side.',
      ] },
      { type: 'paragraph', text: 'This is why consumer advice is always about substitutes: switch supplier, buy the unbranded version, compare the unit price. Each makes demand more elastic, and elastic demand is a buyer with power.' },
      { type: 'paragraph', text: 'It also explains why the reasons in chapter 1 cost money. Habit, inertia and branding all make a buyer\'s own demand less elastic, and a buyer who does not compare has given up the protection the comparison would have bought.' },
    ],
    realExample: { emoji: '🛒', text: 'Shoppers who switch between brands pay less over a year than shoppers who always reach for the same one, on an identical basket. That difference is elasticity, exercised.' },
    misconception: 'Students write about elasticity only from the firm\'s chair. The specification names consumers too, and the point is not sympathy but incidence. Write instead: the more inelastic a buyer\'s demand, the larger the share of any price rise that buyer pays.',
    examMatters: 'Where a question names consumers, an answer entirely about firms has answered a different question. Say what happens to the buyer\'s spending and to the alternatives open to them, and name which group of buyers is worst affected.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete what elasticity means from the buyer\'s side:',
      template: [
        'A buyer whose demand is ___ has no alternative, so absorbs most of a price rise',
        'A buyer with substitutes has ___ demand, and can move rather than pay',
        'Habit, inertia and branding all ___ how readily a buyer moves, so they cost money',
      ],
      answers: ['inelastic', 'elastic', 'reduce'],
      hints: ['the unresponsive kind, where quantity barely moves', 'the responsive kind, where quantity moves a lot', 'what a routine does to the willingness to switch'],
      distractors: ['unitary', 'raise'],
    }),
  };
})();

const significanceForGovernment = (() => {
  const sid = subId('using-elasticities-for-government-policy'); // March id, kept
  return {
    id: sid,
    title: 'Significance for Government',
    keyIdea: 'A government taxing a good has to choose: an inelastic good raises revenue, an elastic one changes behaviour. The same tax cannot do both well.',
    body: [
      { type: 'paragraph', text: 'For a government, PED decides what a tax on a good actually achieves, and the two things a tax might achieve pull in opposite directions.' },
      { type: 'flow', steps: [
        { title: 'A tax raises the price buyers pay', subtitle: 'by however much of it the seller passes on' },
        { title: 'PED decides how far quantity falls', subtitle: 'inelastic demand barely moves; elastic demand moves a lot' },
        { title: 'Revenue and behaviour trade off', subtitle: 'the quantity that stays is taxed, the quantity that goes is deterred' },
      ], result: 'An inelastic good is a revenue tax; an elastic good is a behaviour tax', resultType: 'neutral' },
      { type: 'bullets', items: [
        '**To raise revenue**, tax a good with inelastic demand: the quantity stays, so the receipts arrive.',
        '**To change behaviour**, the good must have elastic demand, or there must be an untaxed substitute to move to.',
        '**YED and XED matter too**: YED says which services demand will grow for as incomes rise, and XED warns where a tax pushes buyers — to an untaxed substitute, or across a border.',
      ] },
      { type: 'paragraph', text: 'The evaluation point is equity. A tax on an inelastic necessity takes a larger share of a low income than a high one, so the most reliable revenue tax falls hardest on the households least able to pay.' },
    ],
    realExample: { emoji: '🚬', text: 'Governments that tax tobacco heavily collect steady receipts and cut consumption slowly, which is what inelastic demand predicts. The same rate on a good with close substitutes would move the buyers and collect little.' },
    misconception: 'Students write that a tax on an inelastic good is unfair and stop there. Fairness is an evaluation point, not the analysis. Write instead: state what the tax achieves given the elasticity, then raise the equity effect as a limitation with the group it falls on named.',
    examMatters: 'A Discuss (14 marks, WEC11 Appendix 6) on an indirect tax wants both objectives weighed against the same elasticity. Set out revenue and behaviour change as competing aims, use the PED value to say which the tax will actually achieve, and judge it against the aim the extract states.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each policy aim to the elasticity evidence a government would need:',
      pairs: [
        { left: 'Raise steady revenue from a tax', right: 'PED is inelastic for the taxed good', why: 'Quantity barely falls, so the receipts keep arriving year after year' },
        { left: 'Cut consumption of a harmful good', right: 'PED is elastic, or a substitute exists', why: 'Behaviour only changes if buyers have somewhere to move to' },
        { left: 'Plan public services for a growing economy', right: 'YED for the service is positive and above 1', why: 'Demand for it will rise faster than incomes do as the economy grows' },
        { left: 'Decide whether two firms are in one market', right: 'XED between their products is strongly positive', why: 'A high positive value shows buyers treat the two as alternatives' },
      ],
    }),
  };
})();

/* ══ the blocks ════════════════════════════════════════════════════════════ */
/*
 * Block sizes are deliberately uneven — 4 · 6 · 5 · 2 · 4 · 3. structure-03's real complaint was not
 * the old two-per-step pairing, which packet 5 replaced with one subsection per step; it was that
 * every chapter had exactly three sections, so the rhythm was identical six times over. A chapter is
 * as long as its part of the specification, and the short fourth chapter is the one carrying the
 * result the whole topic builds to.
 */
const BLOCKS = [
  {
    title: B1,
    sections: [rationalDecisionMaking, utilityAndMaximisation, herdingHabitInertia, computationStatusFraming],
    takeaway: [
      'Consumers are assumed to maximise utility; firms are assumed to maximise profit.',
      'Total utility rises while marginal utility is positive; marginal utility falls.',
      'The six reasons: herding, habit, inertia, computation, status, framing and bias.',
      'Habit repeats a choice without comparing; inertia declines to act on one made.',
    ],
  },
  {
    title: B2,
    sections: [conceptOfDemand, dmuAndTheCurve, movementsAlong, shiftsOfTheCurve, relatedGoodsAndIncome, tastesPopulationAdvertising],
    takeaway: [
      'Demand needs willingness and ability to pay, at a stated price and period.',
      'Marginal utility diminishes, so willingness to pay falls: the curve slopes down.',
      'The good\'s own price moves you along the curve. Anything else shifts it.',
      'Five shift factors: related prices, real income, tastes, population, advertising.',
    ],
  },
  {
    title: B3,
    sections: [whatElasticityMeasures, pedFormula, interpretingPed, pedFactors, pedAlongTheLine],
    takeaway: [
      'PED = % change in quantity demanded ÷ % change in price, and it is negative.',
      'Compare the size with 1: above it elastic, below it inelastic, at it unitary.',
      'Substitutes, branding, share of spending, addictiveness, durability set PED.',
      'On a straight line, PED falls in size as price falls and is 1 at the midpoint.',
    ],
  },
  {
    title: B4,
    sections: [totalRevenue, pedAndRevenue],
    takeaway: [
      'Total revenue = price × quantity sold. It is takings, not profit.',
      'Inelastic demand: price and revenue move together. Raise the price.',
      'Elastic demand: price and revenue move apart. Cut the price.',
      'Revenue is at its maximum where PED is exactly 1.',
    ],
  },
  {
    title: B5,
    sections: [yedFormula, interpretingYed, xedFormula, interpretingXed],
    takeaway: [
      'YED = % change in quantity demanded ÷ % change in real income.',
      'Negative YED is an inferior good; positive above 1 is a luxury.',
      'XED = % change in quantity of A ÷ % change in the price of B.',
      'Positive XED means substitutes, negative means complements, zero unrelated.',
    ],
  },
  {
    title: B6,
    sections: [significanceForFirms, significanceForConsumers, significanceForGovernment],
    takeaway: [
      'Firms use PED to price, YED to plan a range, XED to name rivals.',
      'For a consumer, inelastic demand means carrying more of any price rise.',
      'A tax on an inelastic good raises revenue; on an elastic one it changes behaviour.',
      'Every value is measured from past data, with everything else held constant.',
    ],
  },
];

export const SUBSECTIONS = BLOCKS.flatMap((b) => b.sections);

export function buildContent({ diagramIds, quizIndices, practiceIndices }) {
  return BLOCKS.map((b) => ({
    id: blockId(b.title),
    title: b.title,
    sections: b.sections,
    takeaway: b.takeaway,
    ...(diagramIds[b.title] ? { diagramId: diagramIds[b.title] } : {}),
    quizIndices: quizIndices[b.title],
    practiceIndices: practiceIndices[b.title],
  }));
}

/* ══ Notes ═════════════════════════════════════════════════════════════════ */
/*
 * Six Notes topics, one per Learn Mode chapter, so `depth.notes-titles` has a title to match against
 * every one of them. Notes carry the specification's own phrasing where the coverage rule needs it
 * (packet 14's rule): `spec.uncovered` is lexical and matches whole tokens, so a leaf worded "How to
 * use formulae to calculate price, income and cross-elasticities of demand" needs the word
 * "formulae" and the plural "cross-elasticities" in one field, and the sentence must still teach.
 */
const def = (text) => ({ type: 'def', text });
const mech = (text) => ({ type: 'mech', text });
const exam = (text) => ({ type: 'imp', text, tag: 'exam' });
const link = (text) => ({ type: 'link', text });

export const NOTES = [
  {
    title: B1,
    meta: '3 concepts + 6 named reasons',
    keyIdea: 'Economics assumes each agent maximises one thing; this chapter says what that is, and the six reasons the specification gives for when consumers do not.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Economic agent</strong> — a consumer, a firm or the government: anyone whose decisions shape a market.'),
        def('<strong>The assumption of rationality in decision making</strong> — consumers aim to maximise utility by making rational choices; firms aim to maximise profits.'),
        def('<strong>Utility</strong> — the satisfaction a consumer gains from consuming a good. Personal, and not measurable the way a price is.'),
        def('<strong>Total utility</strong> — the satisfaction from everything consumed so far. <strong>Marginal utility</strong> — the satisfaction added by one more unit.'),
      ] },
      { title: 'THE SIX REASONS (1b)', items: [
        mech('<strong>The influence of other people\'s behaviour (herding)</strong> — what others are doing is treated as evidence about what is worth doing.'),
        mech('<strong>Habitual behaviour</strong> — the purchase is repeated rather than decided; no comparison is made at all.'),
        mech('<strong>Inertia</strong> — the better option is known and the buyer still does not switch to it.'),
        mech('<strong>Poor computational skills</strong> — the comparison is arithmetic the buyer cannot do at the shelf, so the better deal stays hidden.'),
        mech('<strong>The need to feel valued</strong> — part of what is bought is the signal the purchase sends, so the cheaper identical good is not identical.'),
        mech('<strong>Framing and bias</strong> — the same offer described differently is judged differently, because the reference point has changed.'),
      ] },
    ],
    takeaway: [
      'Rational means weighing marginal benefit against cost, not deciding well.',
      'Total utility rises while marginal utility is positive; it is the additions that shrink.',
      'Habit repeats without comparing; inertia declines to act on a comparison made.',
    ],
    examMatters: 'A Define (2 marks, WEC11 Appendix 6) on rationality needs the objective and the weighing. Two reasons developed beat six reasons listed.',
  },
  {
    title: B2,
    meta: '4 concepts + 5 shift factors',
    keyIdea: 'Demand is a schedule, not a number; diminishing marginal utility is why it slopes down, and only the good\'s own price moves you along it.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Demand</strong> — the quantity consumers are willing and able to buy at each price over a period. Demand backed by ability to pay is <strong>effective demand</strong>.'),
        def('<strong>Individual demand</strong> — one buyer\'s quantity at each price. <strong>Market demand</strong> — every buyer\'s added together at the same price.'),
        def('<strong>Movement along</strong> — caused by the good\'s own price. An <strong>extension</strong> when price falls, a <strong>contraction</strong> when it rises.'),
        def('<strong>Shift</strong> — caused by anything else. Right for an increase in demand, left for a decrease, and the change happens at every price.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('The concept of diminishing marginal utility and its significance for the shape of the individual demand curve: each extra unit adds less satisfaction, so willingness to pay falls, so the extra unit is bought only at a lower price.'),
        mech('Name the movement, not just the direction: a price fall gives an <strong>extension</strong> in quantity demanded and a price rise gives a <strong>contraction</strong>. Both are one curve and two points on it.'),
        mech('Factors that may cause a shift in the demand curve: changes in the price of substitutes or complementary goods; changes in real income; changes in tastes; changes in size and age distribution of the population; advertising.'),
        link('A shift factor says why the curve moved and never how far. How far is elasticity, which is the rest of this section.'),
      ] },
    ],
    takeaway: [
      'Willing AND able, at a stated price, over a stated period.',
      'Own price: movement along. Anything else: shift of the whole curve.',
      'Population size and population age are two different factors in one bullet.',
    ],
    misconception: '"Demand rose" after a price cut is wrong: a price cut cannot change demand, only quantity demanded.',
  },
  {
    title: B3,
    meta: '5 PED values + 5 factors',
    keyIdea: 'PED measures how far quantity demanded responds to the good\'s own price, and every factor that changes it works by changing how easily a buyer can go elsewhere.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Price elasticity of demand (PED)</strong> — the percentage change in quantity demanded divided by the percentage change in price. Normally negative.'),
        def('The five values: <strong>perfectly price elastic demand</strong> (infinite), <strong>price elastic demand</strong> (above 1), <strong>unitary price elastic demand</strong> (exactly 1), <strong>price inelastic demand</strong> (between 0 and 1), <strong>perfectly price inelastic demand</strong> (0).'),
        def('<strong>The factors influencing price elasticity of demand</strong>: availability of substitutes; branding; percentage of total expenditure; addictiveness of product; durability of product.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Every factor works through <strong>substitutability</strong>: it makes going elsewhere, or doing without, easier or harder.'),
        mech('<strong>Time</strong> sits underneath all five. The longer a price change lasts, the more substitutes are found, so demand becomes more elastic.'),
        mech('How price elasticity of demand varies along a straight line demand curve: elastic above the midpoint, unitary at it, inelastic below. The slope is constant and the elasticity is not, because elasticity compares proportions.'),
        exam('Value, classification, consequence. A PED reported without an interpretation has answered a calculation rather than a question.'),
      ] },
    ],
    formulas: [
      { label: 'PED', text: 'PED = (% change in quantity demanded) ÷ (% change in price)' },
      { label: 'PERCENTAGE CHANGE', text: '% change = (new value − original value) ÷ ORIGINAL value × 100' },
      { label: 'THE THREE FORMULAE', text: 'How to use formulae to calculate price, income and cross-elasticities of demand: the same fraction each time, with quantity demanded on top and the cause underneath' },
    ],
    takeaway: [
      'Percentages first, original value on the bottom, sign kept.',
      'Compare the size with 1; the sign only says which way the buyer moved.',
      'A straight line has one slope and every elasticity from zero to unbounded.',
    ],
  },
  {
    title: B4,
    meta: '1 formula, 3 cases',
    keyIdea: 'Total revenue is price times quantity, and price elasticity of demand is what decides whether raising the price raises it.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Total revenue</strong> — price multiplied by quantity sold, before any cost is deducted. Not profit.'),
        def('On a diagram, total revenue is the <strong>rectangle</strong> under the chosen point on the demand curve: price up one side, quantity along the bottom.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('The relationship between price elasticity of demand and total revenue, in three cases. <strong>Inelastic</strong>: price and total revenue move together. <strong>Elastic</strong>: they move in opposite directions. <strong>Unitary</strong>: revenue does not change, and is at its maximum.'),
        mech('Raising a price always raises revenue per unit and always lowers the number of units. Which effect is bigger is the whole of the question, and PED is the answer to it.'),
        link('Maximum revenue is not maximum profit: the cheaper, fuller option may cost more to serve than the dearer, emptier one.'),
      ] },
    ],
    formulas: [
      { label: 'TOTAL REVENUE', text: 'How to calculate total revenue: Total revenue = price × quantity sold' },
    ],
    takeaway: [
      'Inelastic: raise the price. Elastic: cut it. Unitary: revenue is at its peak.',
      'Revenue is takings; profit is what survives the costs.',
      'State the elasticity before predicting which way revenue moves.',
    ],
  },
  {
    title: B5,
    meta: '2 elasticities, 8 values',
    keyIdea: 'YED and XED have the same form as PED with a different cause underneath, and for both of them the sign is read before the size.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Income elasticity of demand (YED)</strong> — the percentage change in quantity demanded divided by the percentage change in real income.'),
        def('The values: <strong>perfectly income elastic demand</strong>, <strong>income elastic demand</strong> (above 1, a luxury), <strong>income inelastic demand</strong> (between 0 and 1, a necessity), <strong>perfectly income inelastic demand</strong> (0), and the distinction between normal goods and inferior goods, which is the sign.'),
        def('<strong>Cross elasticity of demand (XED)</strong> — the percentage change in quantity demanded of good A divided by the percentage change in the price of good B.'),
        def('Interpretation of numerical values of cross elasticity of demand shows the degree to which goods are <strong>substitutes</strong> (positive), <strong>complements</strong> (negative) or <strong>unrelated</strong> (near zero).'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Use <strong>real</strong> income, not money income: if wages and prices rise together, nothing has happened to what people can buy.'),
        mech('An <strong>inferior good</strong> is defined by its income response, not its quality. Bus travel is inferior because people leave it when they can, not because it is bad.'),
        mech('For XED, keep A on top and B underneath, and carry both signs through the division. A dearer substitute and a cheaper complement both raise demand.'),
        exam('Size, not just sign. A value of +0.1 and a value of +3 are both positive and mean entirely different things to a firm.'),
      ] },
    ],
    formulas: [
      { label: 'YED', text: 'YED = (% change in quantity demanded) ÷ (% change in real income)' },
      { label: 'XED', text: 'XED = (% change in quantity demanded of A) ÷ (% change in the price of B)' },
    ],
    takeaway: [
      'YED sign classifies the good; YED size says luxury or necessity.',
      'Negative YED is an inferior good, whatever its quality.',
      'Positive XED substitutes, negative XED complements, zero unrelated.',
    ],
  },
  {
    title: B6,
    meta: '3 audiences',
    keyIdea: 'The significance of price, income and cross-elasticities of demand for firms, consumers and the government — three different decisions from the same three numbers.',
    blocks: [
      { title: 'WHO USES WHICH', items: [
        mech('<strong>Firms</strong>: PED sets the price and how much of a cost rise can be passed on; YED shapes the range across the economic cycle; XED names the rivals to watch and the goods worth selling alongside.'),
        mech('<strong>Consumers</strong>: the less elastic your own demand, the larger the share of any price rise you pay. Substitutes are what give a buyer power, and habit, inertia and branding are what take it away.'),
        mech('<strong>The government</strong>: an indirect tax on an inelastic good raises revenue; on an elastic good it changes behaviour. The same tax cannot do both well.'),
      ] },
      { title: 'EVALUATION', items: [
        link('Every elasticity is measured from <strong>past data</strong>, and is only a guide while the conditions that produced it hold.'),
        link('Every one is measured with <strong>everything else constant</strong>, which no real market is: a rival\'s response can undo the revenue a PED calculation predicted.'),
        link('A tax on an inelastic necessity takes a larger share of a low income than a high one, so the most reliable revenue tax is also the most <strong>regressive</strong> one.'),
        exam('An Evaluate (20 marks, WEC11 Appendix 6) is judged on the weighing. Make the elasticity case, then the limits, then a supported judgement.'),
      ] },
    ],
    takeaway: [
      'Name the agent the question asks about before choosing the elasticity.',
      'An elasticity narrows the options; costs and rivals decide between them.',
      'Revenue or behaviour: an indirect tax has to choose which it is for.',
    ],
  },
];
