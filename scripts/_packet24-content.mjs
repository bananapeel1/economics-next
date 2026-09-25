/**
 * PACKET 24 — price-determination, Learn Mode content and Notes.
 *
 * Economics Unit 1 (WEC11), IAL topic 1.3.4, audit/raw/econ_spec.txt:692-716. Six blocks in the
 * specification's own order and one subsection per idea, so no step carries two: thirteen crowded
 * steps become twenty-nine small ones, plus six check-ins.
 *
 * Five scope decisions the specification settled before a word was written (see NEXT.md):
 *
 *   - ALLOCATIVE EFFICIENCY IS NOT A UNIT 1 IDEA, and structure-07 names the wrong home for it. The
 *     finding says the March "Total Welfare and Efficiency" subsection used the term "without the
 *     1.3.5 framing". It is not in 1.3.5 at all: `allocative efficiency` is econ_spec.txt:1364, topic
 *     3.3.3 · 1a — Unit 3. So it is removed rather than reframed, along with the welfare analysis it
 *     sat inside: `deadweight` is 0 in the whole Economics specification and the nearest real
 *     requirement, "identification of the welfare loss or gain areas", is 1.3.5 · 2d (:750), which
 *     packet 25 owns. What 2a and 2b actually ask for is the DISTINCTION between the two surpluses
 *     and what a shift does to them, and that is what block 3 teaches.
 *   - THE BEHAVIOURAL BLOCK IS NOT MOVED HERE, BECAUSE IT IS ALREADY WHERE IT BELONGS. structure-05,
 *     specGap-05 and topFix-04 ask for block 6 to be moved to 1.3.2 and re-keyed to the spec's list.
 *     It is already gone from live content, and 1.3.2 · 1b's six leaves — herding, habitual behaviour,
 *     inertia, poor computational skills, the need to feel valued, framing and bias — are taught in
 *     the spec's own words by packet 17 in `consumer-behaviour-demand`. Reintroducing any of it here
 *     would duplicate that section, so specGap-05's own condition ("if Block 6 is kept here") is void.
 *   - PRICE FLOORS AND CEILINGS ARE 1.3.6, AND THE SPECIFICATION DOES NOT CALL THEM THAT. practice-03
 *     is right that the price-floor item is out of scope. `price floor` and `price ceiling` are both 0
 *     in econ_spec.txt; 1.3.6 says "maximum and minimum (guaranteed) prices" (:809). The item goes and
 *     the vocabulary goes with it.
 *   - THE MARKET CLEARS, BUT IT DOES NOT "MARKET-CLEAR". `market clearing` is 0 in econ_spec.txt and
 *     `invisible hand` is 0, which is why the March "The Invisible Hand" subsection has no successor.
 *     1c's own words are "the operation of market forces to eliminate excess demand and excess supply",
 *     and that is the frame block 2 uses. Seventh instance of the packet 13/16/17/18/22/23 rule.
 *   - THE INCIDENCE RULE IS DERIVED, NOT ASSERTED. 4b and 4d are one idea seen twice, and the March
 *     section gave it one sentence ("the split depends on relative elasticities") with no diagram and
 *     no arithmetic (specGap-03). Here the split is computed from the two schedules, and the diagram
 *     puts the same tax on two different demand curves so a student can see the rule produced rather
 *     than stated.
 *
 * Money is in dollars throughout. Every figure belongs to the Sabaya cylinder market and is derived
 * in _packet24-util.mjs. Real examples name real markets and carry no year and no figure (packet 15's
 * accuracy-01 rule, after the London "rent controls" claim and the sugar-tax score this section used
 * to carry — accuracy-01 and accuracy-02).
 */
import {
  subId, SECTION, hash8, money, pc, qty, MINUS,
  P_EQ, Q_EQ, CHOKE, FOOT, CS, PS, P_LOW, P_HIGH, EXCESS_DEMAND, EXCESS_SUPPLY,
  DEMAND, SUPPLY, q, DEMAND_SHIFT, SUPPLY_SHIFT,
  DEMAND_RISE, DEMAND_FALL, SUPPLY_RISE, SUPPLY_FALL,
  TAX, SUBSIDY, AD_VALOREM, TAXED, SUBSIDISED, AV_LOW_Q, AV_HIGH_Q, AV_GAP_LOW, AV_GAP_HIGH,
} from './_packet24-util.mjs';

const blockId = (title) => `${SECTION}:block:${hash8(title)}`;
/*
 * The validator reads a why line off each match PAIR and each classify GROUP
 * (lib/content-validator.mjs:458, :478), while a reorder carries one array for the whole recall.
 * Authoring keeps the single `why` array in every case and it is distributed here, so a reason
 * cannot drift away from the item it explains — and a missing one is a length mismatch rather than
 * a silent undefined.
 */
const recall = (sid, r) => {
  const out = { id: `${sid}:recall`, ...r };
  if (r.type === 'match' && Array.isArray(r.why)) { out.pairs = r.pairs.map((x, i) => ({ ...x, why: r.why[i] })); delete out.why; }
  if (r.type === 'classify' && Array.isArray(r.why)) { out.groups = r.groups.map((x, i) => ({ ...x, why: r.why[i] })); delete out.why; }
  return out;
};

export const B1 = 'Finding the Equilibrium';
export const B2 = 'Out of Equilibrium, and Moved Out of It';
export const B3 = 'Consumer and Producer Surplus';
export const B4 = 'The Price Mechanism';
export const B5 = 'Indirect Taxes';
export const B6 = 'Subsidies';

/* ══ Block 1 — Finding the Equilibrium (1.3.4 · 1a) ════════════════════════ */

const whatEquilibriumMeans = (() => {
  const sid = subId('what-equilibrium-means');
  return {
    id: sid,
    title: 'What Equilibrium Means',
    keyIdea: 'Equilibrium is the price at which the quantity demanded and the quantity supplied are equal, so nothing is pushing the price in either direction.',
    body: [
      { type: 'paragraph', text: 'A market has two sides making separate plans. Buyers decide how much they want at each price; sellers decide how much they will offer at each price. Neither side consults the other, and for most prices the two plans do not fit.' },
      { type: 'paragraph', text: '**Equilibrium** is the price where they do fit: the quantity demanded equals the quantity supplied. Everyone who wants to buy at that price finds a seller, and everyone who wants to sell at that price finds a buyer.' },
      { type: 'paragraph', text: 'The second half matters as much as the first. Because no buyer is left unsatisfied and no seller is left holding stock, nobody has a reason to offer more or accept less: the price has **no tendency to change**.' },
      { type: 'paragraph', text: 'In the Sabaya cylinder market that price is ' + money(P_EQ) + ' a cylinder, and the quantity that changes hands there is ' + qty(Q_EQ) + ' cylinders a day. Both numbers are the answer: the **equilibrium price** and the **equilibrium quantity** come as a pair, and a question that asks for equilibrium is asking for both.' },
    ],
    realExample: { emoji: '🐟', text: 'At a wholesale fish auction the price falls through the morning until the last crate is sold. Traders are not trying to find an equilibrium price; they are each trying to buy cheaply or sell everything. The price where the crates on the floor exactly match the crates buyers will take is simply where that process stops.' },
    misconception: 'Students write that equilibrium is the price where the market is fair, or where everyone is happy. Plenty of buyers would rather pay less and plenty of sellers would rather charge more. Instead write: equilibrium is where the quantity demanded equals the quantity supplied, so the price has no tendency to change.',
    examMatters: 'A Define (2 marks, WEC11 Appendix 6) requires the meaning of a term. For equilibrium price that means the price at which quantity demanded equals quantity supplied — and the second mark is usually the consequence: there is no tendency for the price to change.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the definition this chapter opens with:',
      template: [
        'Equilibrium is the price at which quantity demanded ___ quantity supplied',
        '→ so no buyer and no ___ is left unsatisfied',
        '→ and the price has no ___ to change',
      ],
      answers: ['equals', 'seller', 'tendency'],
      hints: ['what the two quantities do to each other at this one price', 'the other side of the market from the buyer', 'the property that makes a price an equilibrium rather than just today\'s price'],
      distractors: ['exceeds', 'trader', 'reason'],
    }),
  };
})();

const readingItOffASchedule = (() => {
  const sid = subId('reading-equilibrium-off-a-schedule');
  return {
    id: sid,
    title: 'Reading It Off a Schedule',
    keyIdea: 'A demand and supply schedule sets the two quantities side by side at each price, so the equilibrium is simply the one row where they agree.',
    body: [
      { type: 'paragraph', text: 'Before the curves, the numbers. A **schedule** is a table of the two plans: one column for how much buyers want at each price, one for how much sellers will offer.' },
      { type: 'bullets', items: [
        'At ' + money(P_LOW) + ' buyers want ' + qty(q(DEMAND, P_LOW)) + ' cylinders and sellers offer ' + qty(q(SUPPLY, P_LOW)) + '.',
        'At ' + money(P_EQ) + ' buyers want ' + qty(q(DEMAND, P_EQ)) + ' and sellers offer ' + qty(q(SUPPLY, P_EQ)) + '.',
        'At ' + money(P_HIGH) + ' buyers want ' + qty(q(DEMAND, P_HIGH)) + ' and sellers offer ' + qty(q(SUPPLY, P_HIGH)) + '.',
      ] },
      { type: 'paragraph', text: 'Only one row has no gap. At ' + money(P_EQ) + ' the two columns both read ' + qty(Q_EQ) + ', so that row is the equilibrium and the other two are not. Finding it needs no algebra and no drawing: read down both columns and look for the price where they agree.' },
      { type: 'paragraph', text: 'Notice which way the gap runs at each of the other prices. Below ' + money(P_EQ) + ' the demand column is the bigger one; above it, the supply column is. The gap has a direction as well as a size, and that direction is what the next chapter is about.' },
    ],
    realExample: { emoji: '📋', text: 'An electricity market operator lines up the offers generators make to produce each hour against the volumes retailers bid to buy. The price is found exactly this way: the two stacks are set side by side, and the price at which the volumes meet is the one everybody is paid.' },
    misconception: 'Students pick the row with the largest quantity, on the assumption that more trade means a better outcome. The equilibrium row is not the biggest one; it is the only one where the two quantities are the SAME. Instead write: the equilibrium is the price at which the two columns agree.',
    examMatters: 'A Calculate (2 or 4 marks, WEC11 Appendix 6) requires a calculation in several stages from given data, and Appendix 6 advises showing workings. Given two schedules, the stages are: find the row where the quantities are equal, state the price, then state the quantity — both are needed.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each row of the Sabaya schedule by what it shows: an equilibrium, a price with buyers left over, or a price with sellers left over.',
      groups: [
        { name: 'Equilibrium', items: [money(P_EQ) + ': ' + qty(q(DEMAND, P_EQ)) + ' wanted, ' + qty(q(SUPPLY, P_EQ)) + ' offered'] },
        { name: 'Buyers left over', items: [money(P_LOW) + ': ' + qty(q(DEMAND, P_LOW)) + ' wanted, ' + qty(q(SUPPLY, P_LOW)) + ' offered', money(4) + ': ' + qty(q(DEMAND, 4)) + ' wanted, ' + qty(q(SUPPLY, 4)) + ' offered'] },
        { name: 'Sellers left over', items: [money(P_HIGH) + ': ' + qty(q(DEMAND, P_HIGH)) + ' wanted, ' + qty(q(SUPPLY, P_HIGH)) + ' offered', money(16) + ': ' + qty(q(DEMAND, 16)) + ' wanted, ' + qty(q(SUPPLY, 16)) + ' offered'] },
      ],
      why: [
        'The two quantities are equal, which is the whole test — no gap in either direction',
        'The demand column is larger, so buyers want more than sellers are offering at that price',
        'The supply column is larger, so sellers are offering more than buyers will take at that price',
      ],
    }),
  };
})();

const readingItOffADiagram = (() => {
  const sid = subId('reading-equilibrium-off-a-diagram');
  return {
    id: sid,
    title: 'Reading It Off a Diagram',
    keyIdea: 'On a diagram the equilibrium is where the two curves cross, and the answer is read off to BOTH axes: a price on the vertical and a quantity on the horizontal.',
    body: [
      { type: 'paragraph', text: 'The same two schedules drawn as curves give the same answer faster. Price goes on the vertical axis and quantity on the horizontal. The demand curve slopes down, the supply curve slopes up, and they cross once.' },
      { type: 'paragraph', text: 'That crossing is the equilibrium, because it is the single point that lies on both curves at once: it is a quantity buyers want at that price AND a quantity sellers will offer at that price.' },
      { type: 'flow', steps: [
        { title: 'Draw both curves on one pair of axes', subtitle: 'demand sloping down, supply sloping up' },
        { title: 'Mark the point where they cross', subtitle: 'the only point on both curves' },
        { title: 'Trace across to the price axis', subtitle: money(P_EQ) + ' a cylinder' },
        { title: 'Follow the line down to the quantity axis', subtitle: qty(Q_EQ) + ' cylinders a day' },
      ], result: 'Two dashed lines and two values: the equilibrium price and the equilibrium quantity', resultType: 'good' },
      { type: 'paragraph', text: 'The dashed lines are not decoration. A diagram with the crossing marked but nothing read off has identified the equilibrium without stating it, and the question asked for the values.' },
    ],
    realExample: { emoji: '🌾', text: 'Grain traders talk about the price "where the market clears" and draw exactly this diagram on a whiteboard to argue about where a harvest will leave it. The curves are estimates rather than facts, but the crossing is what everyone is arguing about.' },
    misconception: 'Students mark the intersection with a dot and stop. The dot is where the answer is, not the answer itself. Instead: draw a dashed line across to the price axis and down to the quantity axis, and label both values.',
    examMatters: 'Appendix 6 defines Draw (4 marks, WEC11) as constructing an accurately labelled diagram using quantitative skills. For an equilibrium the Draw row therefore wants both axes labelled, both curves labelled, the intersection marked, and BOTH values read off to the axes.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the four steps of drawing an equilibrium diagram into the order you would carry them out:',
      correctOrder: [
        'Draw both curves on one pair of axes',
        'Mark the point where they cross',
        'Trace across to the price axis',
        'Follow the line down to the quantity axis',
      ],
      why: [
        'Nothing can be marked until both curves are on the same axes',
        'The crossing has to be identified before anything can be read off it',
        'The price is read horizontally from the crossing to the vertical axis',
        'The quantity is read vertically from the crossing to the horizontal axis, and the answer is not complete without it',
      ],
    }),
  };
})();

const whyTheMarketSettles = (() => {
  const sid = subId('why-the-market-settles-there');
  return {
    id: sid,
    title: 'Why the Market Settles There',
    keyIdea: 'The equilibrium is not chosen by anyone: it is the only price nobody has a reason to move away from, which is why a market ends up at it.',
    body: [
      { type: 'paragraph', text: 'Nobody in the Sabaya market decides that ' + money(P_EQ) + ' is the right price. No committee sets it and no seller announces it. It is where the market ends up, and the reason is worth stating precisely.' },
      { type: 'paragraph', text: 'At any other price, somebody is left disappointed, and a disappointed buyer or seller does something about it. Buyers who cannot get a cylinder offer more. Sellers left with stock accept less. Each of those actions moves the price — and each of them stops exactly when the disappointment stops.' },
      { type: 'paragraph', text: 'So the equilibrium is the only **resting point**: not the price best for buyers, or for sellers, but the one price at which nobody has a reason to behave differently. That is a modest claim, and the only one the model supports.' },
      { type: 'paragraph', text: 'It is also why a market can sit away from equilibrium for a while. The forces pushing it back take time to work.' },
    ],
    realExample: { emoji: '🎟️', text: 'When concert tickets sell out in minutes, the official price was below the one at which tickets wanted matched tickets available. Resale sites then trade the same seats higher — the market moving towards a price the original sale did not set.' },
    misconception: 'Students say the equilibrium price is the price the market "should" be at, as though it were a target. The model makes no claim about what ought to happen. Instead write: it is the only price at which neither buyers nor sellers have a reason to change what they are doing.',
    examMatters: 'An Explain (4 marks, WEC11 Appendix 6) asks for a reason developed into a consequence through a two-stage chain. "Nobody is disappointed at the equilibrium" is the first stage; "so nobody acts to change the price, and it stays there" is the second, and an answer that stops at the first is unfinished.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each price in the Sabaya market to what it leaves behind:',
      pairs: [
        { left: money(P_LOW), right: 'buyers who cannot get a cylinder' },
        { left: money(P_EQ), right: 'nobody disappointed on either side' },
        { left: money(P_HIGH), right: 'sellers holding unsold stock' },
      ],
      distractors: ['a government setting the price directly'],
      why: [
        'Below the equilibrium the quantity offered is smaller than the quantity wanted, so some buyers go without',
        'This is the only price at which the two quantities are equal, which is what equilibrium means',
        'Above the equilibrium sellers offer more than buyers will take, so stock is left on their hands',
      ],
    }),
  };
})();

/* ══ Block 2 — Out of Equilibrium, and Moved Out of It (1.3.4 · 1b, 1c) ════ */

const excessDemand = (() => {
  const sid = subId('excess-demand');
  return {
    id: sid,
    title: 'Excess Demand',
    keyIdea: 'Below the equilibrium price buyers want more than sellers will offer, and the size of that shortfall is the excess demand.',
    body: [
      { type: 'paragraph', text: 'Take the Sabaya market to ' + money(P_LOW) + ', which is ' + money(P_EQ - P_LOW) + ' below the equilibrium. Buyers want ' + qty(q(DEMAND, P_LOW)) + ' cylinders at that price, because it is cheap. Sellers will offer only ' + qty(q(SUPPLY, P_LOW)) + ', for the same reason.' },
      { type: 'paragraph', text: '**Excess demand** is the difference: ' + qty(q(DEMAND, P_LOW)) + ' minus ' + qty(q(SUPPLY, P_LOW)) + ', which is ' + qty(EXCESS_DEMAND) + ' cylinders a day that buyers want and cannot have.' },
      { type: 'paragraph', text: 'On a diagram it is measured **horizontally**, along the price line, from the supply curve across to the demand curve. That is the reading students most often get wrong: the gap is a quantity, so it is measured on the quantity axis, not up and down between the curves.' },
      { type: 'paragraph', text: 'The further below the equilibrium the price sits, the wider the gap. Excess demand is not a fixed feature of a market; it is a measurement at a stated price, and the price has to be stated for the number to mean anything.' },
    ],
    realExample: { emoji: '⛽', text: 'When a fuel price is held below the level at which the quantity wanted matches the quantity available, queues form at filling stations. The queue is the excess demand made visible: motorists who want fuel at that price and are not getting it.' },
    misconception: 'Students measure the gap vertically, between the two curves at one quantity. That vertical distance is a difference in PRICES. Instead: excess demand is a difference in QUANTITIES, so it is measured horizontally at the stated price.',
    examMatters: 'Appendix 6 defines Draw (4 marks, WEC11) as constructing an accurately labelled diagram using quantitative skills. To show excess demand, the stated price is drawn as a horizontal line and the gap is marked along it between the two curves, with the two quantities read off to the axis.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the measurement at ' + money(P_LOW) + ' in the Sabaya market:',
      template: [
        'Buyers want ' + qty(q(DEMAND, P_LOW)) + ' and sellers offer ' + qty(q(SUPPLY, P_LOW)) + ', so excess demand is ___ cylinders',
        '→ this happens at a price ___ the equilibrium',
        '→ and on a diagram the gap is measured ___',
      ],
      answers: [qty(EXCESS_DEMAND), 'below', 'horizontally'],
      hints: ['subtract the smaller column from the larger one', 'which side of ' + money(P_EQ) + ' this price sits on', 'the direction that measures a difference in quantities rather than prices'],
      distractors: ['300', 'above', 'vertically'],
    }),
  };
})();

const excessSupply = (() => {
  const sid = subId('excess-supply');
  return {
    id: sid,
    title: 'Excess Supply',
    keyIdea: 'Above the equilibrium price sellers offer more than buyers will take, and the size of that overhang is the excess supply.',
    body: [
      { type: 'paragraph', text: 'Now take the market to ' + money(P_HIGH) + ', the same ' + money(P_HIGH - P_EQ) + ' above the equilibrium. Sellers will offer ' + qty(q(SUPPLY, P_HIGH)) + ' cylinders at that price. Buyers want only ' + qty(q(DEMAND, P_HIGH)) + '.' },
      { type: 'paragraph', text: '**Excess supply** is the difference: ' + qty(EXCESS_SUPPLY) + ' cylinders a day offered and not taken. It is measured horizontally, exactly as excess demand is, and it is the same size here because the price is the same distance from the equilibrium.' },
      { type: 'paragraph', text: 'That symmetry is worth noticing. The size of the gap depends on how far the price is from the equilibrium and on how steep the two curves are — not on which side of the equilibrium you are standing.' },
      { type: 'paragraph', text: 'The word to use for the gap depends on which curve is further right at that price. At a low price the demand curve is further right, so the gap is excess demand. At a high price the supply curve is, so it is excess supply.' },
    ],
    realExample: { emoji: '🥬', text: 'A vegetable wholesaler who prices a perishable crop too high watches it go unsold and cuts the price before the day ends. The crates still on the floor at the original price are the excess supply, and their perishability is why the cut comes quickly.' },
    misconception: 'Students call any unsold stock excess supply. A firm holding inventory in the ordinary course of business is not evidence of disequilibrium. Instead write: excess supply is the amount by which quantity supplied exceeds quantity demanded AT A STATED PRICE.',
    examMatters: 'An Explain (4 marks, WEC11 Appendix 6) requires a two-stage chain when it asks for a reason or an impact. "At a price above equilibrium the quantity supplied exceeds the quantity demanded" is the first stage; "so unsold stock accumulates and sellers cut the price" is the second.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each price in the Sabaya market into what it creates: excess demand, excess supply, or neither.',
      groups: [
        { name: 'Excess demand', items: [money(4), money(P_LOW)] },
        { name: 'Excess supply', items: [money(P_HIGH), money(16)] },
        { name: 'Neither', items: [money(P_EQ)] },
      ],
      why: [
        'Both prices are below ' + money(P_EQ) + ', so the quantity wanted exceeds the quantity offered',
        'Both prices are above ' + money(P_EQ) + ', so the quantity offered exceeds the quantity wanted',
        'At the equilibrium price the two quantities are equal, so there is no gap in either direction',
      ],
    }),
  };
})();

const marketForces = (() => {
  const sid = subId('how-market-forces-remove-the-gap');
  return {
    id: sid,
    title: 'How Market Forces Remove the Gap',
    keyIdea: 'A gap is removed by the disappointed side acting on it: unsatisfied buyers bid the price up, and sellers left with stock cut it, until the gap is gone.',
    body: [
      { type: 'paragraph', text: 'IAL 1.3.4 · 1c does not ask what excess demand IS. It asks for "the operation of market forces to eliminate" it — the process, not the snapshot. A gap does not close by itself, and naming who acts is most of the answer.' },
      { type: 'flow', steps: [
        { title: 'A price below equilibrium leaves buyers unsatisfied', subtitle: qty(EXCESS_DEMAND) + ' cylinders wanted and not available' },
        { title: 'Those buyers offer more to secure a cylinder', subtitle: 'and sellers accept the higher offers' },
        { title: 'Supply extends and demand contracts as the price rises', subtitle: 'the two quantities move towards each other' },
      ], result: 'The gap narrows and disappears at ' + money(P_EQ) + ', where nobody is left bidding', resultType: 'good' },
      { type: 'paragraph', text: 'Two things move as the price rises, and an answer that mentions only one of them is half an answer. Quantity supplied **extends** as sellers find the higher price worth supplying at. Quantity demanded **contracts** as some buyers drop out. The gap closes from both ends.' },
      { type: 'paragraph', text: 'Excess supply runs the same way in reverse: sellers cut the price, which contracts supply and extends demand until the overhang is gone. Both are movements ALONG the curves — nothing has changed except the price.' },
    ],
    realExample: { emoji: '🏷️', text: 'A clothing retailer marks down the end of a season in stages, cutting further each week until the rails clear. Nobody calculates an equilibrium price; the retailer keeps cutting while stock remains, which is the same process arriving at the same place.' },
    misconception: 'Students say the government or the seller "sets the price back to equilibrium". Nobody does the setting. Instead write: unsatisfied buyers bid the price up, or sellers with unsold stock cut it, and the price stops moving when the gap has gone.',
    examMatters: 'An Analyse (6 marks, WEC11 Appendix 6) requires a chain of reasoning, diagrams where appropriate, and it does NOT include evaluation. A chain here runs from the gap, to who acts on it, to the price movement, to the extension and contraction that close it — four links, not a description of the starting position.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the chain that removes excess demand into the order it runs, from the gap to the equilibrium:',
      correctOrder: [
        'A price below equilibrium leaves buyers unsatisfied',
        'Those buyers offer more to secure a cylinder',
        'Supply extends and demand contracts as the price rises',
        'The two quantities meet and the gap disappears',
      ],
      why: [
        'Nothing starts until somebody is disappointed, and below equilibrium it is the buyers',
        'The unsatisfied buyers are the ones who act; the price rises because they bid it up',
        'A higher price does two things at once — more is offered and less is wanted',
        'The process stops where the gap reaches zero, which is the equilibrium',
      ],
    }),
  };
})();

const shiftInDemand = (() => {
  const sid = subId('a-shift-in-demand');
  return {
    id: sid,
    title: 'A Shift in Demand',
    keyIdea: 'When something other than price changes what buyers want, the demand curve moves and the equilibrium slides along the unchanged supply curve.',
    body: [
      { type: 'paragraph', text: 'Everything so far has held both curves still. IAL 1.3.4 · 1b asks the other question: what happens to the equilibrium when a curve MOVES.' },
      { type: 'paragraph', text: 'Suppose buyers in the Sabaya market want ' + qty(DEMAND_SHIFT) + ' more cylinders at every price — incomes have risen, or a substitute fuel has become dearer. The demand curve shifts right. The supply curve has not moved at all.' },
      { type: 'paragraph', text: 'The new equilibrium is where the new demand curve meets the old supply curve: ' + money(DEMAND_RISE.price) + ' and ' + qty(DEMAND_RISE.quantity) + ' cylinders, up from ' + money(P_EQ) + ' and ' + qty(Q_EQ) + '. Price and quantity have both risen.' },
      { type: 'paragraph', text: 'It is worth being clear about why the quantity rose. Sellers did not become more willing to supply; supply is unchanged. They simply moved UP their existing curve, because the higher price made ' + qty(DEMAND_RISE.quantity - Q_EQ) + ' more cylinders worth supplying. A shift in one curve produces a movement along the other.' },
      { type: 'paragraph', text: 'A fall in demand runs the same way in reverse: the curve shifts left and the equilibrium falls to ' + money(DEMAND_FALL.price) + ' and ' + qty(DEMAND_FALL.quantity) + '. In both cases price and quantity move in the SAME direction.' },
    ],
    realExample: { emoji: '🔋', text: 'As electric vehicles spread, demand for lithium rose at every price. Mines did not change what they were willing to supply at a given price, but the higher price drew more output from the capacity that already existed — a shift in demand met by a movement along supply.' },
    misconception: 'Students write that the supply curve shifted too, because more was sold. More being sold is a movement along supply, not a shift of it. Instead write: demand shifted right, the price rose, and quantity supplied extended along the unchanged supply curve.',
    examMatters: 'Appendix 6 defines Draw (4 marks, WEC11) as constructing an accurately labelled diagram. For a demand shift that means the original curves labelled D₁ and S, the new curve labelled D₂, both equilibria marked, and all four values read off — the original ones as well as the new.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete what an increase in demand does in the Sabaya market:',
      template: [
        'The demand curve shifts ___, and supply does not move',
        '→ the equilibrium price rises to ' + money(DEMAND_RISE.price) + ' and quantity rises to ___ cylinders',
        '→ so the change in quantity is a movement ___ the supply curve',
      ],
      answers: ['right', qty(DEMAND_RISE.quantity), 'along'],
      hints: ['the direction that means more is wanted at every price', 'read it off where the new demand curve meets the unchanged supply curve', 'the word that distinguishes this from a shift of supply'],
      distractors: ['left', '600', 'of'],
    }),
  };
})();

const shiftInSupply = (() => {
  const sid = subId('a-shift-in-supply');
  return {
    id: sid,
    title: 'A Shift in Supply',
    keyIdea: 'When a supply curve moves, the equilibrium price and quantity move in OPPOSITE directions, which is what distinguishes a supply shift from a demand shift.',
    body: [
      { type: 'paragraph', text: 'Now hold demand still and move supply. Suppose sellers need ' + money(SUPPLY_SHIFT) + ' less per cylinder to be willing to supply any given quantity: a cheaper input, a better process, a lighter tax. The supply curve shifts down and to the right.' },
      { type: 'paragraph', text: 'The new equilibrium is ' + money(SUPPLY_RISE.price) + ' and ' + qty(SUPPLY_RISE.quantity) + ' cylinders. The price has FALLEN and the quantity has RISEN.' },
      { type: 'paragraph', text: 'That opposition is the signature of a supply shift, and it is the fastest way to check an answer. A demand shift moves price and quantity the same way; a supply shift moves them opposite ways. If a diagram shows both rising, the curve that moved was demand.' },
      { type: 'paragraph', text: 'A decrease in supply reverses it: the curve shifts up and left, and the equilibrium becomes ' + money(SUPPLY_FALL.price) + ' and ' + qty(SUPPLY_FALL.quantity) + ' — a higher price on a smaller quantity.' },
      { type: 'paragraph', text: 'As before, the other side responds by moving along its own curve. Buyers did not become keener; the lower price simply extended the quantity they demanded.' },
    ],
    realExample: { emoji: '☀️', text: 'As the cost of making solar panels fell, manufacturers were willing to supply far more at any given price. The panel price fell and the quantity installed rose at the same time — the opposite-direction movement that identifies a supply shift rather than a demand one.' },
    misconception: 'Students explain a price fall by saying "demand went down", whatever caused it. A demand fall would also reduce the quantity traded. Instead: check the quantity. If price fell and quantity ROSE, supply increased; if both fell, demand decreased.',
    examMatters: 'An Analyse (6 marks, WEC11 Appendix 6) requires a chain of reasoning and, where appropriate, a diagram, with any data given interpreted. Here the chain must name what moved the curve, then the direction of the shift, then the effect on the price, then the effect on the quantity — the last two in opposite directions.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each change in the Sabaya market to the pair of effects it has on the equilibrium:',
      pairs: [
        { left: 'Demand increases', right: 'price rises, quantity rises' },
        { left: 'Demand decreases', right: 'price falls, quantity falls' },
        { left: 'Supply increases', right: 'price falls, quantity rises' },
        { left: 'Supply decreases', right: 'price rises, quantity falls' },
      ],
      why: [
        'A demand shift moves both the same way, and a rightward shift raises both',
        'A leftward demand shift lowers both, again in the same direction',
        'A supply shift moves them oppositely: more is offered, so the price falls and more is traded',
        'A leftward supply shift raises the price and cuts the quantity — opposite directions again',
      ],
    }),
  };
})();

const bothCurvesShift = (() => {
  const sid = subId('when-both-curves-shift');
  return {
    id: sid,
    title: 'When Both Curves Shift',
    keyIdea: 'If demand and supply both move, one of price and quantity has a definite direction and the other depends on which shift is larger.',
    body: [
      { type: 'paragraph', text: 'IAL 1.3.4 · 1b says "shifts in demand and supply curves", and real markets often move both at once. The result is more interesting than either shift alone, and it is a place where the honest answer is "it depends".' },
      { type: 'paragraph', text: 'Suppose demand rises AND supply rises. The demand shift pushes the price up; the supply shift pushes it down. Which wins depends on which shift is bigger, so the price could rise, fall or stay where it is.' },
      { type: 'paragraph', text: 'The quantity, though, is certain. Both shifts push it up, so it rises whichever is larger.' },
      { type: 'bullets', items: [
        'Demand rises and supply rises: **quantity definitely rises**, price is uncertain.',
        'Demand rises and supply falls: **price definitely rises**, quantity is uncertain.',
        'Demand falls and supply rises: **price definitely falls**, quantity is uncertain.',
        'Demand falls and supply falls: **quantity definitely falls**, price is uncertain.',
      ] },
      { type: 'paragraph', text: 'The pattern behind the list is simple: where the two shifts push the same way, the answer is definite; where they pull against each other, it is not. Saying so, and saying what it depends on, is a better answer than guessing a direction.' },
    ],
    realExample: { emoji: '🌍', text: 'In a shipping market a surge in world trade and a wave of newly delivered vessels can arrive together. Freight volumes clearly rise; whether rates rise or fall depends on which of the two arrived in greater force.' },
    misconception: 'Students pick a direction for both price and quantity and defend it. When two shifts pull against each other, one of the two genuinely has no determinate answer. Instead: state the one that is certain, then say what the other depends on — the relative size of the two shifts.',
    examMatters: 'An Examine (8 marks, WEC11 Appendix 6) requires knowledge, understanding, application, analysis and evaluation, with a brief assessment of the arguments or evidence. A case where both curves move suits it: analyse the two shifts separately, then assess which is likely to dominate and under what conditions.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'When demand and supply both increase, sort each outcome into certain or uncertain:',
      groups: [
        { name: 'Certain', items: ['Quantity traded rises', 'More is both wanted and offered at any given price'] },
        { name: 'Uncertain', items: ['The price rises', 'The price falls', 'The price does not change'] },
      ],
      why: [
        'Both shifts push the quantity the same way, so their sizes do not matter to the direction',
        'The two shifts push the price in opposite directions, so the outcome depends on which is larger',
      ],
    }),
  };
})();

/* ══ Block 3 — Consumer and Producer Surplus (1.3.4 · 2a, 2b) ══════════════ */

const consumerSurplus = (() => {
  const sid = subId('consumer-surplus');
  return {
    id: sid,
    title: 'Consumer Surplus',
    keyIdea: 'Consumer surplus is the difference between what buyers were willing to pay and what they actually paid, added up across everyone who bought.',
    body: [
      { type: 'paragraph', text: 'A demand curve is a queue of buyers ordered by what they are willing to pay. At ' + money(P_EQ) + ' every one of them pays the same ' + money(P_EQ) + ' — including the buyer who would have paid ' + money(20) + ' rather than go without.' },
      { type: 'paragraph', text: 'That buyer gains ' + money(10) + ' of value they did not have to hand over. **Consumer surplus** is the sum of those gains across every buyer in the market.' },
      { type: 'paragraph', text: 'On a diagram it is the area **below the demand curve and above the price line**, running out to the quantity traded. Here the demand curve meets the price axis at ' + money(CHOKE) + ', so the triangle has a height of ' + money(CHOKE - P_EQ) + ' and a base of ' + qty(Q_EQ) + ' cylinders: half of ' + money(CHOKE - P_EQ) + ' times ' + qty(Q_EQ) + ', which is ' + money(CS) + ' a day.' },
      { type: 'paragraph', text: 'Note what it is not. It is not money anybody receives, and it is not a discount. It is a measure of value: what buyers got over and above what they gave up for it.' },
    ],
    realExample: { emoji: '💧', text: 'Almost everyone would pay a great deal for their first litre of drinking water rather than go without, and almost nobody has to. The gap between that willingness and the price actually charged is consumer surplus, and it is largest exactly where a good is most essential and cheapest.' },
    misconception: 'Students describe consumer surplus as the money buyers save, as if a discount had been given. Nothing was saved and no cash changed hands. Instead write: it is the difference between the maximum buyers were willing to pay and the price they did pay, summed across all buyers.',
    examMatters: 'A Define (2 marks, WEC11 Appendix 6) requires the meaning of a term. For consumer surplus, the two marks are the difference between willingness to pay and the price paid (1), and that it is summed over all units bought (1) — not a description of where it sits on a diagram.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the measurement of consumer surplus at the Sabaya equilibrium:',
      template: [
        'It is the area below the demand curve and ___ the price line',
        '→ its height is ' + money(CHOKE) + ' minus ' + money(P_EQ) + ' and its base is the quantity ___',
        '→ so its area is ___ the base times the height',
      ],
      answers: ['above', 'traded', 'half'],
      hints: ['which side of the price line the buyers\' gain sits on', 'the amount that actually changes hands, not what the curve reaches at a zero price', 'what you do to a rectangle\'s area to get the triangle inside it'],
      distractors: ['below', 'supplied', 'twice'],
    }),
  };
})();

const producerSurplus = (() => {
  const sid = subId('producer-surplus');
  return {
    id: sid,
    title: 'Producer Surplus',
    keyIdea: 'Producer surplus is the difference between what sellers actually received and the least they would have accepted, added up across everyone who sold.',
    body: [
      { type: 'paragraph', text: 'The supply curve is the same idea from the other side: a queue of sellers ordered by the least they would accept. The lowest-cost seller in the Sabaya market would supply at ' + money(FOOT) + '. Every seller receives ' + money(P_EQ) + '.' },
      { type: 'paragraph', text: '**Producer surplus** is the sum of those gaps: what each seller received, less the minimum they would have accepted.' },
      { type: 'paragraph', text: 'On a diagram it is the area **above the supply curve and below the price line**, out to the quantity traded — the mirror image of consumer surplus. The supply curve meets the price axis at ' + money(FOOT) + ', so the triangle is half of ' + money(P_EQ - FOOT) + ' times ' + qty(Q_EQ) + ', which is ' + money(PS) + ' a day.' },
      { type: 'paragraph', text: 'Producer surplus is not profit. Profit subtracts every cost a firm bears, including costs that do not vary with output. Producer surplus subtracts only what the seller needed to be paid to be willing to supply that unit, so the two measure different things and their totals differ.' },
    ],
    realExample: { emoji: '⛏️', text: 'In a mineral market every mine is paid the same world price, but a mine sitting on rich, easily reached ore would have been willing to sell for far less than one working a marginal deposit. The low-cost mine earns a much larger producer surplus on each tonne, at an identical price.' },
    misconception: 'Students treat producer surplus as another word for profit. Profit deducts all costs; producer surplus deducts only the minimum the seller needed to be willing to supply. Instead write: producer surplus is the amount received above the lowest price the seller would have accepted.',
    examMatters: 'Appendix 6 defines Draw (4 marks, WEC11) as an accurately labelled diagram. For the two surpluses that means both curves and both axes labelled, the price line drawn ACROSS to the traded quantity, and each area shaded and labelled on the correct side of that line.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each area on the equilibrium diagram to what it measures:',
      pairs: [
        { left: 'Below demand, above price', right: 'consumer surplus, ' + money(CS) },
        { left: 'Above supply, below price', right: 'producer surplus, ' + money(PS) },
        { left: 'Price times quantity', right: 'total spending by buyers' },
      ],
      distractors: ['the profit the sellers make'],
      why: [
        'Buyers gain where their willingness to pay is above what they actually paid',
        'Sellers gain where the price is above the least they would have accepted',
        'Spending is a rectangle, not a triangle: every unit bought at the same price',
      ],
    }),
  };
})();

const bothSurpluses = (() => {
  const sid = subId('the-two-triangles-together');
  return {
    id: sid,
    title: 'The Two Triangles Together',
    keyIdea: 'Both surpluses are measured from the same price line out to the same traded quantity, so they are read off one diagram in one pair of steps.',
    body: [
      { type: 'paragraph', text: 'The two areas are not separate constructions. They share an edge — the price line — and they share a right-hand boundary — the quantity actually traded. Drawing one and then the other is one job, not two.' },
      { type: 'flow', steps: [
        { title: 'Mark the equilibrium and draw the price line across to it', subtitle: money(P_EQ) + ' out to ' + qty(Q_EQ) + ' cylinders' },
        { title: 'Shade above that line up to the demand curve', subtitle: 'consumer surplus, ' + money(CS) },
        { title: 'Then work downward to the supply curve', subtitle: 'producer surplus, ' + money(PS) },
      ], result: 'Two triangles meeting along the price line, each labelled with what it measures', resultType: 'good' },
      { type: 'paragraph', text: 'Both stop at the traded quantity. Units beyond ' + qty(Q_EQ) + ' are not bought or sold, so nobody gains anything on them and the areas do not extend past that line.' },
      { type: 'paragraph', text: 'Which is the larger depends entirely on the two curves. Here consumer surplus is ' + money(CS) + ' and producer surplus ' + money(PS) + ', because the demand curve is the STEEPER of the two, so its triangle is the taller one. A market with flat demand and steep supply would give the opposite. There is no general rule that one side gains more.' },
    ],
    realExample: { emoji: '☕', text: 'At a wholesale coffee auction every lot of one grade clears at the same price. A roaster who would have paid far more still pays that price, and a grower whose costs are lowest still receives it. Both gaps exist at the same single price, and that is what the two triangles add up.' },
    misconception: 'Students extend the shading past the quantity traded, out to where the curves cross the axes. Units that are never traded generate no surplus for anyone. Instead: both triangles stop at a vertical line through the equilibrium quantity.',
    examMatters: 'An Explain (4 marks, WEC11 Appendix 6) that asks for the characteristics of a term requires knowledge, understanding and application. For the two surpluses, the application is the diagram: identify each area by the curve above or below it AND by the price line it meets.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the steps for showing both surpluses on one diagram into the order you would carry them out:',
      correctOrder: [
        'Mark the equilibrium and draw the price line across to it',
        'Shade above that line up to the demand curve',
        'Then work downward to the supply curve',
      ],
      why: [
        'Both areas are bounded by the price line, so it has to be on the page before either can be shaded',
        'Consumer surplus is the part between the price and what buyers would have paid',
        'Producer surplus is the part between the price and the least sellers would have accepted',
      ],
    }),
  };
})();

const demandShiftAndSurplus = (() => {
  const sid = subId('what-a-demand-shift-does-to-surplus');
  return {
    id: sid,
    title: 'What a Demand Shift Does to Them',
    keyIdea: 'An increase in demand raises both surpluses: buyers pay more per cylinder but buy more and value them more highly, and sellers gain on both price and volume.',
    body: [
      { type: 'paragraph', text: 'IAL 1.3.4 · 2b asks how a shift affects the two surpluses, and it has to be answered by recomputing the areas rather than guessing from the price. Take the same increase in demand: the equilibrium moves from ' + money(P_EQ) + ' and ' + qty(Q_EQ) + ' to ' + money(DEMAND_RISE.price) + ' and ' + qty(DEMAND_RISE.quantity) + '.' },
      { type: 'paragraph', text: 'Producer surplus is the easy one: the price is higher and the quantity is larger, so it rises from ' + money(PS) + ' to ' + money(DEMAND_RISE.ps) + '. Both of the things that determine it moved the right way.' },
      { type: 'paragraph', text: 'Consumer surplus looks as though it should fall, because buyers are paying ' + money(DEMAND_RISE.price - P_EQ) + ' more per cylinder. It rises, from ' + money(CS) + ' to ' + money(DEMAND_RISE.cs) + '. The reason is that the whole demand curve has moved up as well as right: these buyers value cylinders more highly than the old ones did, and they are buying ' + qty(DEMAND_RISE.quantity - Q_EQ) + ' more. The triangle is measured against the NEW demand curve, and it is bigger.' },
      { type: 'paragraph', text: 'So the question cannot be answered from the price alone. A higher price against an UNCHANGED demand curve would cut consumer surplus; when demand itself shifted, the curve the area is measured from moved too.' },
    ],
    realExample: { emoji: '📱', text: 'When a new generation of handsets arrives, buyers who would previously have paid little are willing to pay a great deal, and both the price and the number sold rise. Buyers are paying more and still getting more value than before, which is what a rightward demand shift does.' },
    misconception: 'Students reason that a higher price must mean less consumer surplus. That holds only when the demand curve has not moved. Instead: when demand shifts, redraw the curve first and measure the area against the new one — after a rightward shift, consumer surplus rises.',
    examMatters: 'An Analyse (6 marks, WEC11 Appendix 6) requires a chain of reasoning, diagrams where appropriate, and does not include evaluation. Here: name the shift, find the new equilibrium, redraw both areas against the new curve, then state the direction of each change.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete what an increase in demand does to the two surpluses:',
      template: [
        'The equilibrium moves to ' + money(DEMAND_RISE.price) + ' and ' + qty(DEMAND_RISE.quantity) + ' cylinders',
        '→ producer surplus ___ to ' + money(DEMAND_RISE.ps),
        '→ consumer surplus, measured against the ___ demand curve, does the same, reaching ' + money(DEMAND_RISE.cs),
      ],
      answers: ['rises', 'new'],
      hints: ['the direction, given both the price and the quantity went up', 'which of the two demand curves the area has to be measured from'],
      distractors: ['falls', 'old', 'original'],
    }),
  };
})();

const supplyShiftAndSurplus = (() => {
  const sid = subId('what-a-supply-shift-does-to-surplus');
  return {
    id: sid,
    title: 'What a Supply Shift Does to Them',
    keyIdea: 'An increase in supply lowers the price and raises the quantity, and here it raises both surpluses — the extra volume outweighing the lower price for sellers.',
    body: [
      { type: 'paragraph', text: 'Now the other half of 1.3.4 · 2b, with the supply increase from chapter 2: the equilibrium moves to ' + money(SUPPLY_RISE.price) + ' and ' + qty(SUPPLY_RISE.quantity) + ' cylinders.' },
      { type: 'paragraph', text: 'Consumer surplus is straightforward: buyers pay ' + money(P_EQ - SUPPLY_RISE.price) + ' less and buy ' + qty(SUPPLY_RISE.quantity - Q_EQ) + ' more, so it rises from ' + money(CS) + ' to ' + money(SUPPLY_RISE.cs) + '.' },
      { type: 'paragraph', text: 'Producer surplus is the one worth thinking about. Sellers receive a lower price, which looks bad for them — but they sell more, and the whole supply curve has moved down, so the least they would accept per cylinder has fallen too. It rises from ' + money(PS) + ' to ' + money(SUPPLY_RISE.ps) + '.' },
      { type: 'paragraph', text: 'That is not luck. The curve\'s foot fell by the full ' + money(SUPPLY_SHIFT) + ' while the price fell by only ' + money(P_EQ - SUPPLY_RISE.price) + ', so the gap between price and foot got WIDER, over a larger quantity. Both surpluses rise after a shift of this kind, whatever the slopes.' },
      { type: 'paragraph', text: 'What the slopes decide is how the gain DIVIDES. Steeper demand means the price falls further, so more of it reaches buyers; flatter demand means the price barely moves and sellers keep more. That is the incidence rule again, seen from the happy side.' },
    ],
    realExample: { emoji: '🚢', text: 'When container capacity expands faster than trade grows, freight rates fall. Shippers gain unambiguously. Whether the carriers gain depends on whether the extra volume they move is worth more to them than the rate they gave up, which is not the same answer in every cycle.' },
    misconception: 'Students assume a lower price always makes producers worse off. After a supply increase the price falls by LESS than the curve itself does, and more is sold. Instead: measure the area above the NEW supply curve and below the new price — it is larger.',
    examMatters: 'An Examine (8 marks, WEC11 Appendix 6) requires analysis and evaluation, with a brief assessment of the arguments. The analysis is that both surpluses rise; the brief assessment is about the SPLIT, which depends on how far the price falls — a claim about the slopes, not the direction.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'After a parallel increase in supply, sort each statement into the group whose direction is certain and the group that depends on the slopes of the curves.',
      groups: [
        { name: 'Certain', items: ['The price falls', 'The quantity traded rises', 'Consumer surplus rises', 'Producer surplus rises'] },
        { name: 'Depends on the slopes', items: ['How much of the gain reaches buyers', 'How far the price falls'] },
      ],
      why: [
        'A parallel shift down lowers the price by less than it lowers the curve, so both the price-to-foot gap and the quantity rise: every one of these follows whatever the slopes are',
        'The SIZE of each gain, and how it divides between the two sides, is what the steepness of the curves decides',
      ],
    }),
  };
})();

/* ══ Block 4 — The Price Mechanism (1.3.4 · 3a, 3b) ════════════════════════ */

const rationing = (() => {
  const sid = subId('the-rationing-function');
  return {
    id: sid,
    title: 'The Rationing Function',
    keyIdea: 'Price rations a scarce good by deciding who gets it: those willing to pay it do, and those who are not, do not.',
    body: [
      { type: 'paragraph', text: 'IAL 1.3.4 · 3a names three functions of the price mechanism "for allocating scarce resources". The first is **rationing**, and it is the one that answers the question: who gets the cylinders?' },
      { type: 'paragraph', text: 'There are ' + qty(Q_EQ) + ' cylinders a day and, at any lower price, more people who want one. Something has to decide which of them get one. In a market the price does it: the cylinders go to the buyers willing to pay ' + money(P_EQ) + ', and the rest go without.' },
      { type: 'paragraph', text: 'It is worth being blunt about what that means. Rationing by price is not rationing by need. A buyer who needs a cylinder badly but cannot afford ' + money(P_EQ) + ' does not get one; a buyer who wants one casually and can afford it does. The mechanism allocates by willingness AND ability to pay, and those are not the same as urgency.' },
      { type: 'paragraph', text: 'When the good becomes scarcer the price rises, and the rationing tightens: fewer buyers clear the higher bar. That is the function working, not failing.' },
    ],
    realExample: { emoji: '🅿️', text: 'City centre parking is priced by the hour rather than given out first-come. The charge is what decides who parks: drivers who value the space more than the fee take it, and the rest park further out or travel differently.' },
    misconception: 'Students describe rationing as the government limiting how much each person may buy. That is a different mechanism entirely. Instead write: the price rations by excluding buyers who are unwilling or unable to pay it, with nobody deciding who those buyers are.',
    examMatters: 'An Explain (4 marks, WEC11 Appendix 6) requires a two-stage chain when it asks for a reason or impact. "Price rises when a good is scarce" is the first stage; "so fewer buyers are willing to pay it and the limited quantity is allocated among them" is the second.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the rationing function:',
      template: [
        'There are ' + qty(Q_EQ) + ' cylinders and more buyers who want one at a lower price',
        '→ the price ___ who gets them',
        '→ it allocates by willingness and ___ to pay, not by need',
      ],
      answers: ['decides', 'ability'],
      hints: ['what the price does about the competing claims on a scarce good', 'the half of the test that money rather than desire supplies'],
      distractors: ['raises', 'willingness', 'urgency'],
    }),
  };
})();

const incentive = (() => {
  const sid = subId('the-incentive-function');
  return {
    id: sid,
    title: 'The Incentive Function',
    keyIdea: 'A higher price makes output worth producing that was not worth producing before, so price gives producers a reason to change what they do.',
    body: [
      { type: 'paragraph', text: 'The second function is **incentive**, and it works on the other side of the market. Rationing decides who gets what exists; incentive decides how much exists.' },
      { type: 'paragraph', text: 'When demand in the Sabaya market rises and the price goes from ' + money(P_EQ) + ' to ' + money(DEMAND_RISE.price) + ', supplying the ' + qty(DEMAND_RISE.quantity - Q_EQ) + 'th extra cylinder becomes worth doing when it was not before. Sellers respond, and quantity supplied extends to ' + qty(DEMAND_RISE.quantity) + '.' },
      { type: 'paragraph', text: 'It works downward too. A falling price removes the reason to produce output whose cost is above the new price, and the quantity supplied contracts. No instruction is issued either way; the price is the whole of the message.' },
      { type: 'paragraph', text: 'Incentive also operates on buyers, though the word is usually used of producers. A higher price is a reason to use less, to look for a substitute, or to go without — which is the same signal read from the other end.' },
    ],
    realExample: { emoji: '🏍️', text: 'When delivery-app fares rise at busy times, more riders switch their apps on. Nobody rosters them and nobody is obliged to work; the higher fare is the entire reason the extra supply appears exactly when it is wanted.' },
    misconception: 'Students write that a high price "encourages firms to be greedy". Greed does not vary with the price, so it explains nothing about why output changes. Instead write: a higher price makes units worth producing whose cost previously exceeded what they would fetch.',
    examMatters: 'An Analyse (6 marks, WEC11 Appendix 6) requires a chain of reasoning and does not include evaluation. For the incentive function the chain runs price rise, to some output becoming profitable that was not, to an extension of supply, to a larger quantity traded.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each price movement to the behaviour the incentive function produces:',
      pairs: [
        { left: 'Price rises to ' + money(DEMAND_RISE.price), right: 'quantity supplied extends to ' + qty(DEMAND_RISE.quantity) },
        { left: 'Price falls to ' + money(SUPPLY_RISE.price), right: 'buyers take more, at ' + qty(SUPPLY_RISE.quantity) },
        { left: 'Price stays at ' + money(P_EQ), right: 'no reason for either side to change' },
      ],
      distractors: ['the government orders more production'],
      why: [
        'The extra cylinders become worth producing only once the price covers what they cost to supply',
        'A lower price removes the reason for some buyers to go without, so the quantity demanded extends',
        'At the equilibrium nothing is pushing either side to do anything differently',
      ],
    }),
  };
})();

const signalling = (() => {
  const sid = subId('the-signalling-function');
  return {
    id: sid,
    title: 'The Signalling Function',
    keyIdea: 'A price change carries information to people who never meet: it tells both sides of the market that something has changed, without anyone reporting it.',
    body: [
      { type: 'paragraph', text: 'The third function is **signalling**. A price is a number that summarises what every buyer and seller in a market has decided, and it travels to people who know none of them.' },
      { type: 'paragraph', text: 'A seller in the Sabaya market who sees the price move from ' + money(P_EQ) + ' to ' + money(DEMAND_RISE.price) + ' learns something real: buyers want more than they did. The seller does not need to know why — incomes, weather, a substitute becoming dearer — to act correctly on it.' },
      { type: 'paragraph', text: 'That is the striking part of the mechanism. The information that coordinates the market is compressed into a single number that costs nothing to read, and it reaches everyone at once.' },
      { type: 'paragraph', text: 'A signal can mislead. A price that has risen because of a temporary disruption says the same thing as one that has risen because of a lasting change in demand, and a producer who invests in new capacity on a temporary signal has read it wrongly. The mechanism transmits information; it does not interpret it.' },
    ],
    realExample: { emoji: '🌶️', text: 'A spice price rising on world markets tells buyers thousands of kilometres from the growing region that this year has gone badly there. None of them has seen the fields, and the number carries the news faster than any report of it would.' },
    misconception: 'Students treat signalling and incentive as the same thing because both follow a price change. Signalling is the information; incentive is the reason to act on it. Instead: a price rise SIGNALS that buyers want more, and INCENTIVISES sellers to supply more.',
    examMatters: 'A Define (2 marks, WEC11 Appendix 6) requires the meaning of a term. For the signalling function the two marks are that a price change conveys information about conditions in a market (1), to buyers and sellers who have no other contact with each other (1).',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each statement about a price rise by which function it describes: signalling, incentive or rationing.',
      groups: [
        { name: 'Signalling', items: ['It tells distant sellers that buyers want more', 'It carries news of a shortage with no report written'] },
        { name: 'Incentive', items: ['It makes extra output worth producing', 'It gives sellers a reason to expand'] },
        { name: 'Rationing', items: ['It excludes buyers unwilling to pay it', 'It decides which buyers get the limited quantity'] },
      ],
      why: [
        'Signalling is about information moving, before anybody has acted on it',
        'Incentive is about the reason to change behaviour that the new price creates',
        'Rationing is about who ends up with the good once the price has settled',
      ],
    }),
  };
})();

const threeAtOnce = (() => {
  const sid = subId('the-three-functions-at-once');
  return {
    id: sid,
    title: 'The Three at Once',
    keyIdea: 'The three functions are one price movement described three ways, so a good answer traces a single change through all three rather than defining them separately.',
    body: [
      { type: 'paragraph', text: 'The three functions are not three events. They are one price movement seen from three angles, and the clearest way to show that is to follow a single change through all of them.' },
      { type: 'flow', steps: [
        { title: 'Demand rises and the price moves to ' + money(DEMAND_RISE.price), subtitle: 'the signal: buyers want more than before' },
        { title: 'The higher price makes extra output worth supplying', subtitle: 'the incentive: ' + qty(DEMAND_RISE.quantity - Q_EQ) + ' more cylinders appear' },
        { title: 'Cylinders go to those willing to pay ' + money(DEMAND_RISE.price), subtitle: 'the rationing: the rest go without' },
      ], result: 'One price movement, doing all three jobs at the same time', resultType: 'neutral' },
      { type: 'paragraph', text: 'That is also how resources move BETWEEN markets. A price rising in one market and falling in another tells producers where their effort is worth more, and gives them a reason to move it there. IAL 1.3.4 · 3a\'s phrase is "for allocating scarce resources", and that reallocation is the point of the whole mechanism.' },
      { type: 'paragraph', text: 'An answer that lists the three functions with a definition each has done the smaller half of the job. Tracing one change through all three is what shows they are connected.' },
    ],
    realExample: { emoji: '🏗️', text: 'When construction booms in a city, wages for skilled trades rise there. The wage tells workers elsewhere that they are wanted, gives them a reason to move, and decides which employers get them — the same three functions operating in a labour market.' },
    misconception: 'Students answer a question on the price mechanism by defining each function in turn and stopping. The definitions are the easy part. Instead: take one change, and show how the same price movement signals it, creates the incentive to respond and rations what results.',
    examMatters: 'A Discuss (14 marks, WEC11 Appendix 6) requires logical and coherent chains of reasoning developed with reference to context, and a recognition of different viewpoints or a critical assessment of the evidence. On the price mechanism, the chains are the three functions traced through one change; the critical assessment is where the signal is weak or slow.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put one demand increase through the three functions, in the order they operate:',
      correctOrder: [
        'Demand rises and the price moves to ' + money(DEMAND_RISE.price),
        'The higher price makes extra output worth supplying',
        'Cylinders go to those willing to pay ' + money(DEMAND_RISE.price),
      ],
      why: [
        'The price movement is the signal, and nothing else can happen until it has occurred',
        'The incentive follows the signal: the new price is what makes the extra output worth making',
        'Rationing is last because it decides who gets the quantity that now exists',
      ],
    }),
  };
})();

const marketTypes = (() => {
  const sid = subId('local-national-and-global-markets');
  return {
    id: sid,
    title: 'Local, National and Global Markets',
    keyIdea: 'The same mechanism works at every scale; what changes is how far a price signal travels and how many sellers can answer it.',
    body: [
      { type: 'paragraph', text: 'IAL 1.3.4 · 3b asks for the price mechanism "in the context of different types of markets, including local, national and global markets". The mechanism does not change between them; its reach does.' },
      { type: 'bullets', items: [
        '**Local** — buyers and sellers in one town. A price change reaches only the traders there, and the sellers who can answer it are the ones already nearby.',
        '**National** — buyers and sellers across a country. A regional shortage pulls supply from other regions, so the gap is filled from a larger pool.',
        '**Global** — buyers and sellers in many countries. Supply and demand worldwide set the price, and a single trader has no influence on it.',
      ] },
      { type: 'paragraph', text: 'The practical difference is how far a price can move before supply answers it. A local shortage can send a price a long way up, because only the sellers already there can respond quickly. The same shortage barely moves a global price, because supply can arrive from anywhere.' },
      { type: 'paragraph', text: 'One good can trade in all three at once: cooking gas has a world price for bulk cargoes and a local one for cylinders delivered to a neighbourhood.' },
    ],
    realExample: { emoji: '🚰', text: 'Bottled water sells at a world price for large shipments, a national price shaped by transport and taxes, and a much higher price at a stall on a hot afternoon. It is the same product; the scale of the market it is sold in is what separates the prices.' },
    misconception: 'Students write that a global market means one price everywhere. Transport, taxes and local conditions keep prices apart even when a world price exists. Instead write: a global market means supply and demand from many countries set the price, so a local disturbance moves it far less.',
    examMatters: 'An Examine (8 marks, WEC11 Appendix 6) requires analysis and evaluation with a brief assessment of the factors. Analyse how far a signal reaches at each scale, then assess which scale a given market actually operates at — that is usually the arguable part.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each type of market to how far a price signal reaches in it:',
      pairs: [
        { left: 'Local', right: 'only the traders in one town' },
        { left: 'National', right: 'every region of one country' },
        { left: 'Global', right: 'producers and buyers in many countries' },
      ],
      distractors: ['only the seller who changed the price'],
      why: [
        'A local market has a small pool of sellers, so a shortage can move the price a long way',
        'A national market can draw supply from other regions, which limits how far the price moves',
        'A global market is supplied from many countries, so no single buyer or seller sets the price',
      ],
    }),
  };
})();

/* ══ Block 5 — Indirect Taxes (1.3.4 · 4a, 4b) ═════════════════════════════ */

const twoKindsOfTax = (() => {
  const sid = subId('specific-and-ad-valorem-taxes');
  return {
    id: sid,
    title: 'Specific and Ad Valorem Taxes',
    keyIdea: 'A specific tax is a fixed sum per unit and shifts supply up in parallel; an ad valorem tax is a percentage of price, so the gap widens and the curve pivots.',
    body: [
      { type: 'paragraph', text: 'An **indirect tax** is charged on a transaction rather than on income, and the seller hands it over. The specification names two kinds, and it names both because they move the supply curve differently.' },
      { type: 'paragraph', text: 'A **specific tax** is a fixed sum on each unit — ' + money(TAX) + ' a cylinder here. Whatever the price, the seller needs ' + money(TAX) + ' more from the buyer to be as well off as before, so the supply curve shifts UP by ' + money(TAX) + ' at every quantity and stays parallel to the original.' },
      { type: 'paragraph', text: 'An **ad valorem tax** is a percentage of the price — ' + pc(AD_VALOREM) + ' here. A percentage of a higher price is more money, so the gap grows as you move up the curve: ' + money(AV_GAP_LOW) + ' at ' + qty(AV_LOW_Q) + ' cylinders and ' + money(AV_GAP_HIGH) + ' at ' + qty(AV_HIGH_Q) + '. The curve PIVOTS rather than shifting parallel.' },
      { type: 'paragraph', text: 'At this market\'s original price the two taxes happen to be worth the same: ' + pc(AD_VALOREM) + ' of ' + money(P_EQ) + ' is ' + money(AV_GAP_HIGH) + ', exactly the specific tax. At every other price they differ, which is the clearest possible demonstration that they are not interchangeable.' },
    ],
    realExample: { emoji: '🍾', text: 'Alcohol duties are commonly charged per litre of pure alcohol, while a sales tax is charged as a percentage of the selling price. The same bottle carries one tax that does not change when its price does, and another that does.' },
    misconception: 'Students draw an ad valorem tax as a parallel shift, exactly as for a specific tax. A percentage of a higher price is a larger sum. Instead: ask whether the tax is a sum per unit or a percentage of price — the answer decides parallel shift or pivot.',
    examMatters: 'Appendix 6 defines Draw (4 marks, WEC11) as constructing an accurately labelled diagram using quantitative skills. For a specific tax the vertical gap must be constant and equal to the tax; for an ad valorem tax it must visibly widen as price rises. Drawing both the same way loses the distinction the question is testing.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each description into the kind of indirect tax it describes: specific or ad valorem.',
      groups: [
        { name: 'Specific', items: [money(TAX) + ' on every cylinder sold', 'The supply curve shifts up in parallel', 'The gap is the same at every quantity'] },
        { name: 'Ad valorem', items: [pc(AD_VALOREM) + ' of the selling price', 'The supply curve pivots', 'The gap widens as price rises'] },
      ],
      why: [
        'A fixed sum per unit adds the same amount at every quantity, which is what makes the shift parallel',
        'A percentage of price adds more money at higher prices, which is what makes the curve pivot',
      ],
    }),
  };
})();

const whatATaxDoes = (() => {
  const sid = subId('what-a-tax-does-to-price-and-quantity');
  return {
    id: sid,
    title: 'What a Tax Does to Price and Quantity',
    keyIdea: 'A tax shifts supply up, so the price buyers pay rises, the price sellers keep falls, and the quantity traded falls — three effects from one shift.',
    body: [
      { type: 'paragraph', text: 'Put the ' + money(TAX) + ' specific tax on the Sabaya market and find the new equilibrium where the taxed supply curve meets the unchanged demand curve.' },
      { type: 'bullets', items: [
        'Buyers now pay **' + money(TAXED.buyer) + '**, up from ' + money(P_EQ) + '.',
        'Sellers now keep **' + money(TAXED.seller) + '**, down from ' + money(P_EQ) + ', after handing ' + money(TAX) + ' to the government.',
        'The quantity traded falls to **' + qty(TAXED.quantity) + '** cylinders, from ' + qty(Q_EQ) + '.',
      ] },
      { type: 'paragraph', text: 'There are now TWO prices in this market where there was one, and keeping them apart is most of the skill. The gap between them is exactly the tax: ' + money(TAXED.buyer) + ' minus ' + money(TAXED.seller) + ' is ' + money(TAX) + '.' },
      { type: 'paragraph', text: 'Notice that the price buyers pay did not rise by the full ' + money(TAX) + '. It rose by ' + money(TAXED.buyerShare) + '. Sellers absorbed the other ' + money(TAXED.sellerShare) + ' by accepting less. Why the tax splits that way is the next subsection, and it is the whole of 1.3.4 · 4b.' },
      { type: 'paragraph', text: 'The quantity falls because the tax has raised the price buyers face, and a higher price contracts the quantity demanded. That fall matters: it is why the government does not collect ' + money(TAX) + ' on all ' + qty(Q_EQ) + ' cylinders.' },
    ],
    realExample: { emoji: '🚬', text: 'When a duty on cigarettes rises, two things happen at once that a student has to keep apart: the shelf price a smoker pays and the sum the manufacturer keeps per packet move in opposite directions, and fewer packets are sold than before. Both follow from the same upward shift of the supply curve.' },
    misconception: 'Students write that a tax of ' + money(TAX) + ' raises the price by ' + money(TAX) + '. The price rises by the buyer\'s share of it, not the whole. Instead: find the new equilibrium, read off the price buyers pay, and subtract the tax to get what sellers keep.',
    examMatters: 'Appendix 6 defines Draw (4 marks, WEC11) as an accurately labelled diagram. A tax diagram is only complete with BOTH prices marked on the price axis — the one buyers pay and the one sellers keep — and the new quantity read off; the vertical gap between the two prices must equal the tax.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the effect of the ' + money(TAX) + ' tax on the Sabaya market:',
      template: [
        'Buyers pay ' + money(TAXED.buyer) + ' and sellers keep ___',
        '→ the gap between the two prices equals the ___',
        '→ and the quantity traded falls to ___ cylinders',
      ],
      answers: [money(TAXED.seller), 'tax', qty(TAXED.quantity)],
      hints: ['what is left after the government has taken its share of what the buyer paid', 'the thing that drove the two prices apart in the first place', 'read it off where the taxed supply curve meets demand'],
      distractors: [money(10), 'subsidy', '600'],
    }),
  };
})();

const incidence = (() => {
  const sid = subId('incidence-who-bears-the-tax');
  return {
    id: sid,
    title: 'Incidence: Who Bears the Tax',
    keyIdea: 'The incidence of a tax is how the burden splits between buyers and sellers, and it is measured by how far each price moved, not by who hands the money over.',
    body: [
      { type: 'paragraph', text: 'The seller sends the ' + money(TAX) + ' to the government. That fact tells you nothing about who bears it, and 1.3.4 · 4b is about who bears it.' },
      { type: 'paragraph', text: '**Incidence** is the share of the tax carried by each side, and it is read straight off the two price movements.' },
      { type: 'bullets', items: [
        'Buyers pay ' + money(TAXED.buyerShare) + ' more than before, so the **consumer incidence** is ' + money(TAXED.buyerShare) + ' of the ' + money(TAX) + '.',
        'Sellers keep ' + money(TAXED.sellerShare) + ' less than before, so the **producer incidence** is ' + money(TAXED.sellerShare) + '.',
      ] },
      { type: 'paragraph', text: 'The two shares add to the tax, and they always do: the buyer\'s price went up and the seller\'s went down, and the distance between them is the tax. That is a useful check on any answer.' },
      { type: 'paragraph', text: 'So in this market buyers bear two-thirds of the tax and sellers one-third, even though sellers do all the paperwork. The legal question — who is required to pay — and the economic question — whose income falls — have different answers, and the specification asks the economic one.' },
    ],
    realExample: { emoji: '🧾', text: 'A sales tax collected at the till is remitted by the retailer, but shoppers see the shelf price rise and retailers see their margins squeezed. The person who writes the cheque to the tax authority is simply the collector.' },
    misconception: 'Students say the incidence falls on whoever legally pays the tax. Legal liability and economic burden are different things. Instead write: incidence is how far each price moved — the buyer\'s price up, the seller\'s down — and the two together equal the tax.',
    examMatters: 'A Calculate (2 or 4 marks, WEC11 Appendix 6) requires a calculation in several stages from given data, and Appendix 6 advises showing workings. For incidence the stages are: new price minus old price for the consumer share, old price minus what the seller keeps for the producer share, and a check that the two sum to the tax.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the incidence of the ' + money(TAX) + ' tax:',
      template: [
        'The price buyers pay rose by ___, which is the consumer incidence',
        '→ the price sellers keep fell by ' + money(TAXED.sellerShare) + ', which is the producer incidence',
        '→ the two shares add to the ___, which is a check on the answer',
      ],
      answers: [money(TAXED.buyerShare), 'tax'],
      hints: ['the difference between ' + money(TAXED.buyer) + ' and the old price', 'what the wedge between the two prices is equal to'],
      distractors: [money(3), 'quantity', 'revenue'],
    }),
  };
})();

const elasticityAndSplit = (() => {
  const sid = subId('elasticity-decides-the-split');
  return {
    id: sid,
    title: 'Elasticity Decides the Split',
    keyIdea: 'The side of the market that responds less to price ends up carrying more of the tax, because it has less room to escape it.',
    body: [
      { type: 'paragraph', text: 'Buyers bore ' + money(TAXED.buyerShare) + ' of the ' + money(TAX) + ' and sellers ' + money(TAXED.sellerShare) + '. That split is not a rule to memorise: it follows from how far each side can move. A buyer escapes a tax by buying less and a seller by supplying less, and whichever finds that harder absorbs more of it.' },
      { type: 'flow', steps: [
        { title: 'A tax drives a wedge between the two prices', subtitle: money(TAX) + ' a cylinder here' },
        { title: 'Each side reduces its quantity as far as it comfortably can', subtitle: 'buyers buy less, sellers supply less' },
        { title: 'The side that responds less absorbs more of the wedge', subtitle: 'it has fewer alternatives to move to' },
      ], result: 'The less responsive side carries the larger share of the tax', resultType: 'neutral' },
      { type: 'paragraph', text: 'Two extremes make it concrete. If demand did not respond to price at all, buyers would pay the entire ' + money(TAX) + '. If it responded enormously, sellers would absorb almost all of it, since any price rise would cost them nearly every sale.' },
      { type: 'paragraph', text: 'So a tax on a good with few substitutes is mostly borne by buyers, and one on a good with many close alternatives mostly by sellers.' },
    ],
    realExample: { emoji: '⛽', text: 'Fuel duty is largely passed on to motorists, who have few short-run alternatives to driving. A tax on one brand of soft drink, where a shopper can simply pick up another bottle, is much harder to pass on and is absorbed in the seller\'s margin.' },
    misconception: 'Students say "the tax falls on the inelastic side" without saying why, and then cannot apply it. Instead reason it through: the side that can change its quantity least has least room to escape the tax, so it absorbs more of it.',
    examMatters: 'An Examine (8 marks, WEC11 Appendix 6) requires a chain of reasoning, diagrams where appropriate, and a brief assessment of the arguments. The chain runs from responsiveness, to the ability to avoid the tax, to the share borne; the assessment is that responsiveness grows over a longer period, so the split changes with it.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the reasoning behind tax incidence into the order it runs, from the tax to the split:',
      correctOrder: [
        'A tax drives a wedge between the two prices',
        'Each side reduces its quantity as far as it comfortably can',
        'The side that responds less absorbs more of the wedge',
      ],
      why: [
        'Nothing happens until the tax separates what the buyer pays from what the seller keeps',
        'Both sides try to escape the tax the only way they can, by trading less',
        'Whichever side finds that hardest has no option but to carry more of the tax',
      ],
    }),
  };
})();

const taxAndGovernment = (() => {
  const sid = subId('the-impact-on-the-government');
  return {
    id: sid,
    title: 'The Impact on the Government',
    keyIdea: 'The government collects the tax per unit times the quantity traded AFTER the tax — a rectangle on the diagram, and less than the tax times the original quantity.',
    body: [
      { type: 'paragraph', text: 'IAL 1.3.4 · 4a asks for the impact of an indirect tax on consumers, producers AND the government. The third is the one most often stated in words and never drawn.' },
      { type: 'paragraph', text: 'Revenue is the tax per unit times the quantity sold: ' + money(TAX) + ' × ' + qty(TAXED.quantity) + ' = ' + money(TAXED.government) + ' a day. On the diagram it is a rectangle, running from the price buyers pay down to the price sellers keep, and across to the quantity traded.' },
      { type: 'paragraph', text: 'The quantity in that calculation is ' + qty(TAXED.quantity) + ', not ' + qty(Q_EQ) + '. Using the original quantity would give ' + money(TAX * Q_EQ) + ' and overstate the revenue by ' + money(TAX * Q_EQ - TAXED.government) + ', because the tax itself reduced how much is traded.' },
      { type: 'paragraph', text: 'That is the tension in taxing a good: the more the tax discourages the activity, the less revenue it raises. A tax on something buyers can easily do without changes behaviour a great deal and collects little; a tax on something they cannot changes behaviour little and collects a lot.' },
      { type: 'paragraph', text: 'A government may want either outcome. Revenue and discouragement pull in opposite directions, and which one a particular tax is for is a fair thing to ask about it.' },
    ],
    realExample: { emoji: '🏛️', text: 'Finance ministries routinely forecast less revenue from a duty rise than the arithmetic on current volumes suggests, precisely because they expect volumes to fall. The gap between the two figures is this effect.' },
    misconception: 'Students calculate revenue as the tax multiplied by the quantity traded BEFORE the tax. That quantity is no longer being traded. Instead: read the new quantity off the diagram first, then multiply — the rectangle sits on the post-tax quantity.',
    examMatters: 'A Calculate (2 or 4 marks, WEC11 Appendix 6) requires a calculation in several stages and may involve the use of a prescribed diagram, with workings shown. For tax revenue the stages are: find the new equilibrium quantity from the diagram, then multiply it by the tax per unit.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each part of the tax diagram to the amount it measures:',
      pairs: [
        { left: 'The vertical gap between the two prices', right: 'the tax per unit, ' + money(TAX) },
        { left: 'The rectangle across the new quantity', right: 'government revenue, ' + money(TAXED.government) },
        { left: 'The rise in the price buyers pay', right: 'consumer incidence, ' + money(TAXED.buyerShare) },
      ],
      distractors: ['the profit sellers make on each cylinder'],
      why: [
        'The wedge between what the buyer pays and what the seller keeps is the tax itself',
        'Revenue is the tax per unit multiplied by the quantity actually traded after the tax',
        'How far the buyer\'s price moved is what the buyer bears of the tax',
      ],
    }),
  };
})();

/* ══ Block 6 — Subsidies (1.3.4 · 4c, 4d) ══════════════════════════════════ */

const whatASubsidyDoes = (() => {
  const sid = subId('what-a-subsidy-does-to-price-and-quantity');
  return {
    id: sid,
    title: 'What a Subsidy Does to Price and Quantity',
    keyIdea: 'A subsidy is a tax in reverse: supply shifts down, the buyer pays less, the seller receives more, and the quantity traded rises.',
    body: [
      { type: 'paragraph', text: 'A **subsidy** is a payment from the government to the producer on each unit supplied. It is the mirror image of a specific tax, and every result follows from that one fact.' },
      { type: 'paragraph', text: 'With ' + money(SUBSIDY) + ' a cylinder paid to sellers, a seller needs ' + money(SUBSIDY) + ' less from the buyer to be as well off as before, so the supply curve shifts DOWN by ' + money(SUBSIDY) + ' at every quantity.' },
      { type: 'bullets', items: [
        'Buyers now pay **' + money(SUBSIDISED.buyer) + '**, down from ' + money(P_EQ) + '.',
        'Sellers now receive **' + money(SUBSIDISED.seller) + '** in total — ' + money(SUBSIDISED.buyer) + ' from the buyer plus ' + money(SUBSIDY) + ' from the government.',
        'The quantity traded rises to **' + qty(SUBSIDISED.quantity) + '** cylinders, from ' + qty(Q_EQ) + '.',
      ] },
      { type: 'paragraph', text: 'As with a tax, there are two prices and the gap between them is the subsidy: ' + money(SUBSIDISED.seller) + ' minus ' + money(SUBSIDISED.buyer) + ' is ' + money(SUBSIDY) + '. The difference is which of the two is the higher one — with a tax the buyer pays more than the seller keeps, and with a subsidy the seller receives more than the buyer pays.' },
      { type: 'paragraph', text: 'And the quantity moves the other way. A tax reduces trade; a subsidy increases it. That is usually the point of paying one.' },
    ],
    realExample: { emoji: '🌾', text: 'Where fertiliser is subsidised, farmers pay less than the market would otherwise charge and suppliers receive more, with the government making up the difference. More fertiliser is used than would be without it, which is what the policy is for.' },
    misconception: 'Students shift the supply curve UP for a subsidy, reasoning that sellers are getting more money. The curve records what sellers need FROM THE BUYER, and a subsidy reduces that. Instead: shift supply down and to the right by the subsidy per unit.',
    examMatters: 'Appendix 6 defines Draw (4 marks, WEC11) as an accurately labelled diagram using quantitative skills. A subsidy diagram needs the supply curve shifted DOWN by the subsidy, both prices marked — the lower one buyers pay and the higher one sellers receive — and the new, larger quantity read off.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the effect of the ' + money(SUBSIDY) + ' subsidy on the Sabaya market:',
      template: [
        'The supply curve shifts ___ by ' + money(SUBSIDY) + ' at every quantity',
        '→ buyers pay ' + money(SUBSIDISED.buyer) + ' and sellers receive ___ in total',
        '→ and the quantity traded ___ to ' + qty(SUBSIDISED.quantity) + ' cylinders',
      ],
      answers: ['down', money(SUBSIDISED.seller), 'rises'],
      hints: ['the direction that means sellers need less from the buyer at every quantity', 'what the buyer pays plus what the government adds', 'the direction opposite to what a tax does'],
      distractors: ['up', money(8), 'falls'],
    }),
  };
})();

const subsidyIncidence = (() => {
  const sid = subId('incidence-of-a-subsidy');
  return {
    id: sid,
    title: 'Who Gains From a Subsidy',
    keyIdea: 'A subsidy is shared between buyers and sellers by the same rule as a tax: the less responsive side captures more of it.',
    body: [
      { type: 'paragraph', text: 'IAL 1.3.4 · 4d asks for the incidence of subsidies, and it is the same question as 4b with the sign reversed. The money is paid to producers; that does not mean producers keep it.' },
      { type: 'bullets', items: [
        'Buyers pay ' + money(Math.abs(SUBSIDISED.buyerShare)) + ' less than before, so they capture ' + money(Math.abs(SUBSIDISED.buyerShare)) + ' of the ' + money(SUBSIDY) + '.',
        'Sellers receive ' + money(Math.abs(SUBSIDISED.sellerShare)) + ' more than before, so they capture ' + money(Math.abs(SUBSIDISED.sellerShare)) + '.',
      ] },
      { type: 'paragraph', text: 'The two shares add to the subsidy, exactly as the two tax shares added to the tax. And the rule behind the split is the same one: the side that responds less to price captures more.' },
      { type: 'paragraph', text: 'Here buyers capture two-thirds of the subsidy and sellers one-third — the same two-to-one split as the tax, because it is the same two curves. If demand were highly responsive instead, most of the subsidy would end up with producers, because the price to buyers would barely fall.' },
      { type: 'paragraph', text: 'That matters for policy. A government subsidising a good to make it cheaper for buyers achieves less of that where demand is responsive, because more of the payment is captured by sellers instead.' },
    ],
    realExample: { emoji: '🚌', text: 'Where public transport fares are subsidised, part of the payment reaches passengers as lower fares and part is absorbed by operators through higher costs or wider margins. How much reaches passengers depends on how strongly ridership responds to the fare.' },
    misconception: 'Students say a subsidy paid to producers benefits producers. Who receives the payment and who ends up better off are different questions. Instead write: the subsidy is split between the two sides, and the less responsive side captures more of it.',
    examMatters: 'A Calculate (2 or 4 marks, WEC11 Appendix 6) requires several stages from given data with workings shown. For subsidy incidence: the fall in the price buyers pay is the consumers\' share, the rise in what sellers receive is the producers\' share, and the two must sum to the subsidy per unit.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each statement about the ' + money(SUBSIDY) + ' subsidy into true or false.',
      groups: [
        { name: 'True', items: ['Buyers capture ' + money(Math.abs(SUBSIDISED.buyerShare)) + ' of it', 'Sellers capture ' + money(Math.abs(SUBSIDISED.sellerShare)) + ' of it', 'The two shares add to ' + money(SUBSIDY)] },
        { name: 'False', items: ['Sellers keep all of it because it is paid to them', 'The price to buyers falls by the full ' + money(SUBSIDY)] },
      ],
      why: [
        'The shares are read off the two price movements, and they must add to the subsidy per unit',
        'Who receives the payment does not decide who benefits; the split depends on how each side responds to price',
      ],
    }),
  };
})();

const subsidyCost = (() => {
  const sid = subId('the-cost-to-the-government');
  return {
    id: sid,
    title: 'The Cost to the Government',
    keyIdea: 'A subsidy costs the subsidy per unit times the quantity traded after it — a larger quantity than before, which is why subsidies cost more than they first appear.',
    body: [
      { type: 'paragraph', text: 'IAL 1.3.4 · 4c asks for the impact of subsidies on consumers, producers and the government, and the government\'s side is a cost rather than a revenue.' },
      { type: 'paragraph', text: 'The arithmetic mirrors tax revenue: ' + money(SUBSIDY) + ' × ' + qty(SUBSIDISED.quantity) + ' = ' + money(SUBSIDISED.government) + ' a day. On the diagram it is a rectangle running from what sellers receive down to what buyers pay, across the quantity traded.' },
      { type: 'paragraph', text: 'But there is an asymmetry worth noticing. A tax REDUCES the quantity it is charged on, so revenue is collected on less than before. A subsidy INCREASES the quantity it is paid on, so it is paid on more than before. The same ' + money(TAX) + ' per unit raised ' + money(TAXED.government) + ' as a tax and costs ' + money(SUBSIDISED.government) + ' as a subsidy.' },
      { type: 'paragraph', text: 'Using the original quantity would understate the cost by ' + money(SUBSIDISED.government - SUBSIDY * Q_EQ) + ' — the same reading error as with tax revenue, in the other direction.' },
      { type: 'paragraph', text: 'The money comes from somewhere — taxes elsewhere, borrowing, or spending given up. That **opportunity cost** is part of the impact on the government, and an answer giving only the rectangle has given only the arithmetic.' },
    ],
    realExample: { emoji: '⛽', text: 'Fuel subsidies are among the largest items in some national budgets, and their cost rises when the world price rises, because the gap being filled grows at the same time as the quantity being consumed stays high. Governments often find the bill hardest to pay exactly when it is largest.' },
    misconception: 'Students calculate subsidy cost on the pre-subsidy quantity. The subsidy raised the quantity, and it is paid on every unit traded. Instead: read off the new, larger quantity and multiply by the subsidy per unit.',
    examMatters: 'An Analyse (6 marks, WEC11 Appendix 6) requires a chain of reasoning with any data interpreted, and does not include evaluation. For the cost of a subsidy the chain runs: the subsidy shifts supply, the quantity rises, the payment is made on that larger quantity, and the total is therefore larger than the arithmetic on the old quantity suggests.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the cost of the ' + money(SUBSIDY) + ' subsidy:',
      template: [
        'The subsidy is paid on every cylinder traded ___ it is introduced',
        '→ that is ' + qty(SUBSIDISED.quantity) + ' a day, so the cost is the payment per cylinder ___ by that figure',
        '→ and it comes to more than the same tax collected, because a subsidy ___ trade',
      ],
      answers: ['after', 'multiplied', 'raises'],
      hints: ['which side of the policy change the relevant quantity sits on', 'what you do with the payment per cylinder and the figure beside it', 'the direction a subsidy moves trade, unlike a tax'],
      distractors: ['before', 'divided', 'reduces'],
    }),
  };
})();

const weighingASubsidy = (() => {
  const sid = subId('weighing-a-subsidy');
  return {
    id: sid,
    title: 'Weighing a Subsidy',
    keyIdea: 'Whether a subsidy is worth paying depends on how much of it reaches the people it was meant for, what it costs, and what that money could have done instead.',
    body: [
      { type: 'paragraph', text: 'The diagram says what a subsidy DOES. Whether it is worth doing is a separate question, and the material for it is already on the page.' },
      { type: 'bullets', items: [
        '**How much reaches buyers.** Two-thirds of it here. Where demand is more responsive, less does, and a policy aimed at buyers delivers less than it costs.',
        '**What it costs.** ' + money(SUBSIDISED.government) + ' a day, growing as the quantity grows — a subsidy that works well gets expensive.',
        '**What the money could have done instead.** Its opportunity cost is whatever that spending would have achieved elsewhere.',
        '**Whether it can be withdrawn.** A price buyers have adjusted to is hard to raise again.',
      ] },
      { type: 'paragraph', text: 'A judgement has to say what the subsidy was FOR. If the aim is affordability, the test is how far the buyers\' price fell; if it is supporting producers, the test is how much sellers captured. Those are different numbers for the same policy, as they are here.' },

    ],
    realExample: { emoji: '🔌', text: 'Subsidies for household solar panels were meant to make installation affordable. Where installers raised their prices in response, part of the payment was captured by the trade rather than by households — the same split question, asked of a real policy.' },
    misconception: 'Students evaluate a subsidy by saying it is good because it makes things cheaper for consumers. That assumes all of it reaches them. Instead: state how much reaches buyers and how much sellers capture, then weigh the cost against what it achieves.',
    examMatters: 'An Evaluate (20 marks, WEC11 Appendix 6) requires multi-stage chains of reasoning with reference to context, consideration of the validity and significance of the arguments, and recognition of different viewpoints so that informed judgements can be made. Do the analysis first — the shift, the two prices, the cost — then judge, stating what the judgement depends on.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each question about a subsidy to the evidence that answers it:',
      pairs: [
        { left: 'Did buyers get cheaper cylinders?', right: 'the fall in the price they pay, ' + money(Math.abs(SUBSIDISED.buyerShare)) },
        { left: 'Did sellers gain?', right: 'the rise in what they receive, ' + money(Math.abs(SUBSIDISED.sellerShare)) },
        { left: 'What did it cost?', right: money(SUBSIDY) + ' times the new quantity, ' + money(SUBSIDISED.government) },
      ],
      distractors: ['the size of the original equilibrium quantity'],
      why: [
        'How far the buyers\' price fell is exactly what buyers captured of the subsidy',
        'How far the sellers\' receipt rose is exactly what sellers captured',
        'The cost is the rectangle: the payment per unit across the quantity traded after the subsidy',
      ],
    }),
  };
})();

/* ══ Assembly ══════════════════════════════════════════════════════════════ */

export const SUBSECTIONS = [
  whatEquilibriumMeans, readingItOffASchedule, readingItOffADiagram, whyTheMarketSettles,
  excessDemand, excessSupply, marketForces, shiftInDemand, shiftInSupply, bothCurvesShift,
  consumerSurplus, producerSurplus, bothSurpluses, demandShiftAndSurplus, supplyShiftAndSurplus,
  rationing, incentive, signalling, threeAtOnce, marketTypes,
  twoKindsOfTax, whatATaxDoes, incidence, elasticityAndSplit, taxAndGovernment,
  whatASubsidyDoes, subsidyIncidence, subsidyCost, weighingASubsidy,
];

const BLOCK_PLAN = [
  { title: B1, subs: [whatEquilibriumMeans, readingItOffASchedule, readingItOffADiagram, whyTheMarketSettles], takeaway: [
    'Equilibrium: quantity demanded equals quantity supplied.',
    'The answer is a pair: ' + money(P_EQ) + ' and ' + qty(Q_EQ) + ' cylinders a day.',
    'On a schedule it is the one row where the columns agree.',
    'On a diagram it is the crossing, read off to BOTH axes.',
  ] },
  { title: B2, subs: [excessDemand, excessSupply, marketForces, shiftInDemand, shiftInSupply, bothCurvesShift], takeaway: [
    'Excess demand and excess supply are measured horizontally.',
    'Unsatisfied buyers bid up; sellers with stock cut the price.',
    'A demand shift moves price and quantity the SAME way.',
    'A supply shift moves them OPPOSITE ways.',
  ] },
  { title: B3, subs: [consumerSurplus, producerSurplus, bothSurpluses, demandShiftAndSurplus, supplyShiftAndSurplus], takeaway: [
    'Consumer surplus: below demand, above the price line.',
    'Producer surplus: above supply, below the price line.',
    'Both stop at the quantity actually traded.',
    'After a shift, measure the areas against the NEW curve.',
  ] },
  { title: B4, subs: [rationing, incentive, signalling, threeAtOnce, marketTypes], takeaway: [
    'Rationing decides who gets a scarce good: those who pay.',
    'Incentive makes output worth producing that was not before.',
    'Signalling carries the information to people who never meet.',
    'Local, national and global differ in reach, not in mechanism.',
  ] },
  { title: B5, subs: [twoKindsOfTax, whatATaxDoes, incidence, elasticityAndSplit, taxAndGovernment], takeaway: [
    'Specific tax: parallel shift. Ad valorem: a pivot.',
    'Buyers pay ' + money(TAXED.buyer) + ', sellers keep ' + money(TAXED.seller) + ': the gap is the tax.',
    'Incidence falls more on the side that responds less.',
    'Revenue = tax per unit × the quantity traded AFTER the tax.',
  ] },
  { title: B6, subs: [whatASubsidyDoes, subsidyIncidence, subsidyCost, weighingASubsidy], takeaway: [
    'A subsidy shifts supply down: price falls, quantity rises.',
    'Sellers receive ' + money(SUBSIDISED.seller) + ', buyers pay ' + money(SUBSIDISED.buyer) + '.',
    'The less responsive side captures more of the subsidy.',
    'Cost = subsidy per unit × the LARGER quantity it creates.',
  ] },
];

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

/* ══ Notes ════════════════════════════════════════════════════════════════ */

const def = (html) => ({ type: 'definition', text: html });
const mech = (html) => ({ type: 'mechanism', text: html });
const link = (html) => ({ type: 'link', text: html });

export const NOTES = [
  {
    title: B1,
    meta: '1 leaf',
    keyIdea: 'Equilibrium price and quantity, and how they are determined.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Equilibrium</strong> — the price at which quantity demanded equals quantity supplied, so the price has no tendency to change.'),
        def('<strong>Equilibrium price</strong> — ' + money(P_EQ) + ' a cylinder in the Sabaya market.'),
        def('<strong>Equilibrium quantity</strong> — ' + qty(Q_EQ) + ' cylinders a day, the amount that changes hands at that price.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('On a schedule: read down both quantity columns and find the one price where they agree.'),
        mech('On a diagram: mark the crossing, then read ACROSS to the price axis and DOWN to the quantity axis.'),
        link('The equilibrium is a resting point, not a target: it is the only price at which nobody has a reason to act differently.'),
      ] },
    ],
    takeaway: [
      'Equilibrium is where the two quantities are equal.',
      'The answer is always two numbers, a price and a quantity.',
      'Nobody sets it; it is where the market stops moving.',
    ],
  },
  {
    title: B2,
    meta: '2 leaves',
    keyIdea: 'Causes of changes in the equilibrium as a result of shifts in demand and supply, and the operation of market forces to eliminate excess demand and excess supply.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Excess demand</strong> — the amount by which quantity demanded exceeds quantity supplied at a stated price: ' + qty(EXCESS_DEMAND) + ' cylinders at ' + money(P_LOW) + '.'),
        def('<strong>Excess supply</strong> — the amount by which quantity supplied exceeds quantity demanded at a stated price: ' + qty(EXCESS_SUPPLY) + ' cylinders at ' + money(P_HIGH) + '.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Excess demand: unsatisfied buyers bid the price up, supply extends and demand contracts until the gap closes.'),
        mech('Excess supply: sellers holding stock cut the price, supply contracts and demand extends until the overhang clears.'),
        mech('A demand shift moves price and quantity the same way: ' + money(DEMAND_RISE.price) + ' and ' + qty(DEMAND_RISE.quantity) + ' after an increase.'),
        mech('A supply shift moves them opposite ways: ' + money(SUPPLY_RISE.price) + ' and ' + qty(SUPPLY_RISE.quantity) + ' after an increase.'),
        link('When both curves shift, one of price and quantity is determinate and the other depends on which shift is larger.'),
      ] },
    ],
    takeaway: [
      'Both gaps are measured horizontally, at a stated price.',
      'The disappointed side is the side that moves the price.',
      'Same direction means demand moved; opposite means supply did.',
    ],
  },
  {
    title: B3,
    meta: '2 leaves',
    keyIdea: 'The distinction between consumer and producer surplus, and how changes in demand or supply might affect them.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Consumer surplus</strong> — the difference between what buyers were willing to pay and what they paid, summed over all units: ' + money(CS) + ' here.'),
        def('<strong>Producer surplus</strong> — the difference between what sellers received and the least they would have accepted: ' + money(PS) + ' here.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Consumer surplus is the area below the demand curve and above the price line, out to the quantity traded.'),
        mech('Producer surplus is the area above the supply curve and below the price line, out to the same quantity.'),
        mech('An increase in demand raises both: ' + money(DEMAND_RISE.cs) + ' and ' + money(DEMAND_RISE.ps) + '. The consumer area is measured against the NEW demand curve.'),
        mech('An increase in supply raises consumer surplus to ' + money(SUPPLY_RISE.cs) + '; what happens to producer surplus depends on the curves.'),
        link('Producer surplus is not profit: it deducts only the minimum a seller would have accepted, not every cost.'),
      ] },
    ],
    takeaway: [
      'Two triangles meeting along the price line.',
      'Both stop at the quantity actually traded.',
      'After a shift, redraw the curve before measuring the area.',
    ],
  },
  {
    title: B4,
    meta: '2 leaves',
    keyIdea: 'The rationing, incentive and signalling functions of the price mechanism for allocating scarce resources, and the mechanism in local, national and global markets.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Rationing</strong> — price decides who gets a scarce good, by willingness and ability to pay.'),
        def('<strong>Incentive</strong> — a higher price makes output worth producing that was not worth producing before.'),
        def('<strong>Signalling</strong> — a price change carries information about a market to people who never meet.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('The three are one price movement seen from three angles, not three separate events.'),
        mech('Across markets: a price rising in one and falling in another moves resources between them, which is what "allocating scarce resources" means.'),
        mech('Local, national and global markets differ in how far a signal travels and how many sellers can answer it — not in how the mechanism works.'),
        link('A signal can mislead: a temporary disruption and a lasting change in demand look identical in the price.'),
      ] },
    ],
    takeaway: [
      'Rationing: who gets it. Incentive: how much exists.',
      'Signalling: the information, before anyone acts on it.',
      'The wider the market, the less a local shock moves the price.',
    ],
  },
  {
    title: B5,
    meta: '2 leaves',
    keyIdea: 'The impact of indirect taxes on consumers, producers and the government, and the incidence of indirect taxes on consumers and producers.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Specific tax</strong> — a fixed sum per unit, ' + money(TAX) + ' here: the supply curve shifts up in parallel.'),
        def('<strong>Ad valorem tax</strong> — a percentage of the price, ' + pc(AD_VALOREM) + ' here: the gap widens with price, so the curve pivots.'),
        def('<strong>Incidence</strong> — the share of a tax borne by each side, measured by how far each price moved.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('After the ' + money(TAX) + ' tax: buyers pay ' + money(TAXED.buyer) + ', sellers keep ' + money(TAXED.seller) + ', and ' + qty(TAXED.quantity) + ' cylinders trade.'),
        mech('Incidence here is ' + money(TAXED.buyerShare) + ' on buyers and ' + money(TAXED.sellerShare) + ' on sellers; the two always add to the tax.'),
        mech('The side that responds LESS to price carries more of the tax, because it has less room to trade less.'),
        mech('Government revenue = ' + money(TAX) + ' × ' + qty(TAXED.quantity) + ' = ' + money(TAXED.government) + ', on the post-tax quantity.'),
        link('Who hands the money to the government says nothing about who bears the tax.'),
      ] },
    ],
    takeaway: [
      'Two prices after a tax; the gap between them is the tax.',
      'Incidence is read off the two price movements.',
      'Revenue sits on the smaller, post-tax quantity.',
    ],
  },
  {
    title: B6,
    meta: '2 leaves',
    keyIdea: 'The impact of subsidies on consumers, producers and the government, and the incidence of subsidies on consumers and producers.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Subsidy</strong> — a payment from the government to the producer per unit supplied, ' + money(SUBSIDY) + ' here.'),
        def('<strong>Incidence of a subsidy</strong> — how the payment is shared between buyers and sellers, by the same rule as a tax.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('The supply curve shifts DOWN by the subsidy: buyers pay ' + money(SUBSIDISED.buyer) + ', sellers receive ' + money(SUBSIDISED.seller) + ', and ' + qty(SUBSIDISED.quantity) + ' cylinders trade.'),
        mech('Buyers capture ' + money(Math.abs(SUBSIDISED.buyerShare)) + ' and sellers ' + money(Math.abs(SUBSIDISED.sellerShare)) + '; the two add to the subsidy.'),
        mech('Cost to the government = ' + money(SUBSIDY) + ' × ' + qty(SUBSIDISED.quantity) + ' = ' + money(SUBSIDISED.government) + ', on the LARGER post-subsidy quantity.'),
        link('A tax shrinks the quantity it is collected on; a subsidy grows the quantity it is paid on. That asymmetry is why the same ' + money(TAX) + ' raises ' + money(TAXED.government) + ' and costs ' + money(SUBSIDISED.government) + '.'),
      ] },
    ],
    takeaway: [
      'A subsidy is a tax with its sign reversed.',
      'The less responsive side captures more of it.',
      'It is paid on a larger quantity than existed before.',
    ],
  },
];
