/**
 * PACKET 26 — government-intervention: quiz, practice, flashcards, common mistakes and chains.
 *
 * WHAT THE MARCH BANK GOT WRONG, and which findings about it were right.
 *
 * TWENTY-FIVE QUIZ ITEMS PINNED SEQUENTIALLY, block n → quiz n, so six of the eight inline questions
 * were about another chapter's topic (`structure-01`, `topFix-01`): the Subsidies chapter asked about
 * a maximum price, Maximum Prices asked about a minimum price on alcohol, and so on. And Q21 tested
 * BUFFER STOCK SCHEMES, which `specGap-07` was unsure about: `buffer stock` is one hit in the whole
 * specification, at :1958, in topic 4.3.6 — Unit 4. It is deleted rather than taught to.
 *
 * PRACTICE WAS FIVE ITEMS AND THREE OF THE FIVE WERE OFF THE IAL LADDER.
 *   - "Define the term 'government failure'. (4 marks)" — Define is 2 marks in IAL Economics
 *     (econ_spec.txt:2704). Re-tariffed, as `topFix-04` asks.
 *   - "Outline two potential disadvantages of imposing a maximum price. (4 marks)" — Outline is not
 *     an IAL command word in either subject. Rebuilt as an Explain.
 *   - "Examine the effectiveness of subsidies … " kept its tariff; its guidance allocated points.
 *   - AND THE 20-MARK EVALUATE, WHICH TWO FINDINGS ASK TO BE CUT AND WHICH STAYS. `practice-01`
 *     says "20-mark essays are WEC13/WEC14 format; WEC11 Section B tops out at 14 marks" and
 *     `topFix-04` asks for it to become a 14-mark Discuss. The census gives Economics Evaluate = 20
 *     with NO unit note (:2741-2747), and PROTOCOL's paper table has WEC11 Section D as one 20-mark
 *     essay from a choice of two. The finding is wrong and obeying it would have removed the hardest
 *     item in the section. What IS wrong with that item is real and is fixed: its guidance allocated
 *     marks (2+3+2+2+2+2+2+1+2+2) where every tariff above 6 is levels-marked.
 *   - Every inline practice item appeared in the wrong chapter, which `structure-02` blames on
 *     `sortedPractice` at LearnModeTab.jsx:82 and asks to have the sort removed. The sort was fixed
 *     three packets ago: :217 reads "practiceIndices are authored against the RAW practiceData order
 *     (F013, F040, F111)", and `sortedPractice` now feeds only the no-pins fallback at :238. The
 *     defect is real, the cause is stale, and removing the sort would break the fallback for every
 *     section that still relies on it.
 *
 * EVERY GUIDANCE IS AT LEAST TWO PARAGRAPHS AND THE FIRST GIVES NOTHING AWAY. `InlinePractice.jsx`
 * prints `guidance.split('\n')[0]` above the answer box in guided mode, which `getPracticeMode` gives
 * to every item except the first and last of a section.
 */
import { id, hash8, money, qty, valueAt, meet, COAL, CLINIC, FLATS, CITY } from './_packet26-util.mjs';
import { B1, B2, B3, B4, B5, B6, B7, B8 } from './_packet26-content.mjs';

const C = COAL, L = CLINIC, F = FLATS;
const qi = (block, question, options, explanation) => ({ id: id('quiz', question), block, question, options, explanation });

/*
 * EVERY ITEM IS AUTHORED WITH ITS KEY FIRST and the key is then DEALT into a position (packets 24 and
 * 25). Ranking items by a hash of their own stem and taking the rank modulo four spreads the answer
 * positions by construction, is stable across edits, and a verifier can reproduce it from this file.
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
 * sliced server-side (F086, and freeQuizPayload() since 16 Sep), and none of the three is asked again
 * at a check-in (packet 2.4).
 */
export const QUIZ = placeKeys([
  qi(null, 'The purpose of government intervention in a market is to:',
    ['move the quantity traded towards the socially optimal level', 'reduce the price of the good so that more people can afford it', 'raise revenue that can be spent on other public services', 'prevent firms in the market from making excessive profits'],
    'The specification puts the purpose at 1a and ties it to market failure: the market produces too much or too little compared with the socially optimal level, and intervention is an attempt to change the quantity. Revenue and affordability are consequences of particular tools, not the purpose of intervening.'),
  qi(null, 'A maximum price will only change what happens in a market if it is set:',
    ['below the market equilibrium price', 'above the market equilibrium price', 'exactly at the market equilibrium price', 'below the average cost of production'],
    'A ceiling above the equilibrium is a rule nobody meets: the market was already trading below it. Only a maximum set below the clearing price stops trade happening where it otherwise would, which is what produces excess demand.'),
  qi(null, 'Government failure occurs when:',
    ['intervention results in a net welfare loss', 'a government fails to intervene in a market that is failing', 'an intervention turns out to be unpopular with voters', 'the cost of an intervention is larger than the government expected'],
    'The specification defines it at 2a as intervention that results in a NET welfare loss. The comparison is with what would have happened without the intervention, which is why an expensive but effective policy is not a failure and a cheap ineffective one may be.'),

  /* ── Block 1 · Why governments intervene ── */
  qi(B1, `In ${C.name}, the market trades ${qty(C.marketQ)} ${C.units} ${C.per} and the social optimum is ${qty(C.optimumQ)}. With an external cost of ${money(C.externalCost)} a ${C.unit}, the welfare loss is:`,
    [money(C.welfareLoss) + ' ' + C.per, money(C.revenue) + ' ' + C.per, money(C.externalCost * C.marketQ) + ' ' + C.per, money(C.externalCost) + ' ' + C.per],
    `The welfare loss is the triangle: ½ × ${money(C.externalCost)} × ${qty(C.marketQ - C.optimumQ)} = ${money(C.welfareLoss)}. ${money(C.externalCost * C.marketQ)} is the total external cost across all ${qty(C.marketQ)} ${C.units} — a rectangle, and a much larger number. ${money(C.revenue)} is the revenue a ${money(C.tax)} tax would raise. ${money(C.externalCost)} is the cost per ${C.unit}, which is a height and not an area at all.`),
  qi(B1, 'Which of the following is NOT one of the eight methods of intervention the specification lists?',
    ['a cut in the rate of income tax', 'extension of property rights', 'tradeable pollution permits', 'provision of information'],
    'The eight at 1b are indirect taxation, subsidies, maximum and minimum prices, tradeable pollution permits, extension of property rights, state provision, regulation and provision of information. A change in income tax is a tax on a person rather than on a transaction in this market, so it is not a method of intervening in it.'),
  qi(B1, 'A government wants to set a policy that fixes the quantity traded and lets the price settle. It should use:',
    ['tradeable pollution permits', 'an indirect tax on each unit sold', 'a minimum price fixed by law', 'a subsidy paid per unit'],
    'Only the permit scheme names a quantity. A tax, a subsidy and a price control all act on the price and leave the quantity to be settled by how the two sides respond, which is why a government that needs a definite total cannot use them.'),
  qi(B1, 'An intervention that moves the quantity towards the social optimum is still not worth making if:',
    ['running it costs more than the welfare it recovers', 'firms in the market object to it and lobby against it', 'it raises the price that buyers have to pay for the good', 'it does not reach the socially optimal quantity exactly'],
    'The test is net: welfare recovered against the cost of designing, administering, monitoring and enforcing the policy. A higher price to buyers is what most of these tools do on purpose, and reaching part of the way to the optimum is still an improvement if it is cheap enough.'),

  /* ── Block 2 · Indirect taxation ── */
  qi(B2, `A specific tax of ${money(C.tax)} a ${C.unit} is imposed on ${C.name}, where quantity falls to ${qty(C.taxedQ)}. Government revenue is:`,
    [money(C.revenue) + ' ' + C.per, money(C.tax * C.marketQ) + ' ' + C.per, money(C.buyerP * C.taxedQ) + ' ' + C.per, money(C.consumerIncidence * C.taxedQ) + ' ' + C.per],
    `Revenue is the tax per ${C.unit} times the quantity traded AFTER the tax: ${money(C.tax)} × ${qty(C.taxedQ)} = ${money(C.revenue)}. ${money(C.tax * C.marketQ)} uses the ${qty(C.marketQ)} ${C.units} traded BEFORE the tax, which is the commonest error here. ${money(C.buyerP * C.taxedQ)} is total spending by buyers. ${money(C.consumerIncidence * C.taxedQ)} counts only the consumers' share of the tax.`),
  qi(B2, 'An ad valorem tax differs from a specific tax because it:',
    ['pivots the supply curve, so the gap widens as the price rises', 'shifts the supply curve in parallel by the same amount at every quantity', 'is collected from the buyer at the till rather than from the seller', 'applies only to goods that generate external costs in production'],
    'An ad valorem tax is a percentage of the price, so it is a small amount on a cheap unit and a large one on an expensive one — the curve pivots away from its foot. A parallel shift is the specific tax. Both are collected from the seller and both can be used on any good.'),
  qi(B2, `After the ${money(C.tax)} tax, buyers pay ${money(C.buyerP)} and sellers keep ${money(C.sellerP)}. The producer incidence of the tax is:`,
    [money(C.producerIncidence), money(C.consumerIncidence), money(C.tax), money(C.sellerP)],
    `The producer incidence is how far the price sellers keep has FALLEN: ${money(C.marketP)} − ${money(C.sellerP)} = ${money(C.producerIncidence)}. ${money(C.consumerIncidence)} is the CONSUMER incidence, the rise in what buyers pay, and the two add to the ${money(C.tax)} tax. ${money(C.sellerP)} is the price sellers keep, not the change in it.`),
  qi(B2, 'A tax on a good whose demand barely responds to price will:',
    ['raise a lot of revenue and change the quantity very little', 'raise very little revenue and change the quantity a great deal', 'fall mostly on producers rather than on consumers', 'have no effect on the price that buyers pay'],
    'Where buyers have no close alternative they keep buying at the higher price, so the quantity barely moves and the tax is collected on almost the original number of units. That makes it an effective revenue measure and a weak behavioural one, and it also means most of the burden reaches buyers.'),

  /* ── Block 3 · Subsidies ── */
  qi(B3, `A subsidy of ${money(L.subsidy)} a ${L.unit} takes ${L.name} from ${qty(L.marketQ)} ${L.units} to ${qty(L.subsidisedQ)}. The cost to the government is:`,
    [money(L.cost) + ' ' + L.per, money(L.subsidy * L.marketQ) + ' ' + L.per, money(L.buyerP * L.subsidisedQ) + ' ' + L.per, money(L.welfareGain) + ' ' + L.per],
    `The cost is the subsidy per ${L.unit} times the quantity supplied AFTER it: ${money(L.subsidy)} × ${qty(L.subsidisedQ)} = ${money(L.cost)}. ${money(L.subsidy * L.marketQ)} uses the ${qty(L.marketQ)} ${L.units} supplied BEFORE it. ${money(L.buyerP * L.subsidisedQ)} is what buyers spend. ${money(L.welfareGain)} is the welfare gain the subsidy was aimed at, which is far smaller than what it costs to capture.`),
  qi(B3, 'A subsidy raises the quantity traded because it:',
    ['lowers the curve suppliers act on, so more is worth supplying', 'raises the demand curve, because buyers can now afford more of the good than before', 'removes the external benefit that the market had been failing to count in the price', 'forces suppliers to produce a larger quantity than they otherwise would have chosen'],
    'The payment goes to the supplier per unit supplied, so it is the supply side that moves; buyers respond by moving DOWN their unchanged demand curve. Nothing compels anybody to produce anything, and the external benefit is still external — the subsidy compensates for it rather than removing it.'),
  qi(B3, `Buyers pay ${money(L.buyerP)} after the subsidy and providers receive ${money(L.providerP)}. Compared with the market price of ${money(L.marketP)}, this means:`,
    [`buyers gain ${money(L.consumerGain)} and providers ${money(L.producerGain)}`, `buyers gain ${money(L.producerGain)} and providers ${money(L.consumerGain)}`, `buyers and providers each gain ${money(L.subsidy / 2)}`, `buyers gain the whole ${money(L.subsidy)} and providers gain nothing`],
    `The price buyers pay fell from ${money(L.marketP)} to ${money(L.buyerP)}, a gain of ${money(L.consumerGain)}; what providers receive rose from ${money(L.marketP)} to ${money(L.providerP)}, a gain of ${money(L.producerGain)}. The two add to the ${money(L.subsidy)} subsidy, and they are unequal for the same reason a tax burden is unequal.`),
  qi(B3, 'A common objection to subsidising a good is that:',
    ['much of the money pays for units that would have been bought anyway', 'it lowers the quantity traded below the socially optimal level of output', 'it raises the price that buyers have to pay for the good at the till', 'it can only be used on goods that generate external costs in production'],
    `Only ${qty(L.subsidisedQ - L.marketQ)} of the ${qty(L.subsidisedQ)} ${L.units} supplied are new; the rest of the payment lowers the price of consultations that were already happening. Lowering the quantity and raising the price to buyers are both what a TAX does. And a subsidy is used where a good carries external BENEFITS, not external costs.`),

  /* ── Block 4 · Maximum and minimum prices ── */
  qi(B4, `A maximum price of ${money(F.maxPrice)} is set in ${F.name}, where quantity demanded is ${qty(F.demanded)} and quantity supplied is ${qty(F.supplied)}. This creates:`,
    [`excess demand of ${qty(F.excessDemand)} ${F.units}`, `excess supply of ${qty(F.excessDemand)} ${F.units}`, `excess demand of ${qty(F.demanded)} ${F.units}`, 'no gap at all, because the price has been fixed'],
    `Excess demand is the difference between the two quantities at the controlled price: ${qty(F.demanded)} − ${qty(F.supplied)} = ${qty(F.excessDemand)}. An answer of ${qty(F.demanded)} is the whole quantity demanded rather than the gap; "excess supply" has the direction the wrong way round, since a maximum price leaves buyers unsatisfied; and fixing a price is precisely what stops it closing the gap.`),
  qi(B4, `In ${C.name}, a minimum price of ${money(C.minPrice)} and a tax of ${money(C.tax)} both leave buyers paying ${money(C.minPrice)}. The main difference between them is:`,
    [`under the tax the ${money(C.tax)} goes to the government, under the floor it goes to sellers`, 'the tax leaves buyers paying more than the minimum price does', 'the minimum price reduces the quantity bought and the tax does not', 'the tax produces excess supply and the minimum price does not'],
    `Both put buyers at ${money(C.minPrice)} and both leave them buying ${qty(C.minDemanded)} ${C.units}. What differs is the destination of the extra ${money(C.tax)} a ${C.unit} — ${money(C.revenue)} ${C.per} of revenue under one and nothing under the other — and that the floor also leaves ${qty(C.minExcessSupply)} ${C.units} offered and unsold.`),
  qi(B4, 'A minimum price described as a guaranteed price usually also involves:',
    ['a public agency buying whatever is not sold at that price', 'a limit on how much any one producer may sell', 'a subsidy paid to buyers so that they can afford it', 'a tax on imports of the same good'],
    'The word guaranteed is a promise as well as a floor: growers may sell at the price, and if nobody else buys at it the agency does. What it buys is the excess supply the floor creates, and storing or disposing of that is a cost of the policy.'),
  qi(B4, 'When a maximum price stops the price from rationing a good, the good is usually rationed instead by:',
    ['waiting, or by who is already known to the seller', 'the government raising the maximum price until the gap closes', 'suppliers producing more of it to meet the extra demand', 'buyers agreeing among themselves who should have it'],
    'The gap does not disappear because the price may not close it, so something else settles who is served: waiting lists, existing relationships, or payments made outside the official price. Suppliers offer LESS at the capped price, not more, which is what created the gap.'),

  /* ── Block 5 · Permits, property rights and regulation ── */
  qi(B5, `Permits are issued for ${qty(C.capQ)} ${C.units} ${C.per} in ${C.name}. Buyers bid the price to ${money(C.capBuyerP)} and the last ${C.unit} costs ${money(C.capCostP)} to produce. A permit is therefore worth:`,
    [money(C.permitPrice), money(C.capBuyerP), money(C.capCostP), money(C.revenue)],
    `A permit is worth the gap between what buyers will pay and what producing costs: ${money(C.capBuyerP)} − ${money(C.capCostP)} = ${money(C.permitPrice)}. That is the same number as a tax set at the external cost, which is why a cap at the optimum and a tax at the external cost reach the same place from opposite directions.`),
  qi(B5, 'Allowing firms to trade pollution permits with one another:',
    ['changes which firms cut emissions, but not the total cut', 'raises the total quantity of emissions above the cap', 'lets firms with more money emit as much as they want', 'removes the need for the government to set a total at all'],
    'The total is fixed by how many permits exist, so one firm emitting more requires another to emit less. What trading does is move the cuts to whoever can make them most cheaply, which is what makes the cap cheap to meet — and the government still has to choose the total.'),
  qi(B5, 'Extending property rights can correct an external cost because:',
    ['somebody gains a claim they can defend, so the cost enters a decision', 'the government can then charge a price for using the resource', 'it converts the good into a public good that nobody can be excluded from', 'it removes the external cost from the market altogether'],
    'An external cost exists because the person affected has no say. A defensible claim means whoever causes the harm must buy their agreement or answer for it, so the cost is now inside somebody\'s calculation. Nothing here makes the good non-excludable — the opposite, in fact.'),
  qi(B5, 'Compared with a tax, a cap enforced by permits requires the government to know:',
    ['the right quantity, before any permit is issued', 'the price elasticity of demand for the good in the short run', 'the profit margin earned by each firm in the market', 'nothing at all that an indirect tax does not also require'],
    'A tax names a price and can be adjusted upwards if the quantity is still too high. A cap names the quantity itself, so it has to be right at the moment it is set — which is why an uncertain optimum argues for the tax and a hard total argues for the cap.'),

  /* ── Block 6 · State provision and information ── */
  qi(B6, 'Under state provision, the quantity of the good supplied is determined by:',
    ['the budget the government allocates to it', 'where demand meets supply at the free price', 'the number of firms willing to enter the market', 'the external benefit the good generates'],
    'Taking the good out of the market means the price no longer sets the quantity; the budget does. Where free access attracts more demand than the budget supplies, something other than price has to ration it — which is the same problem a maximum price has.'),
  qi(B6, `In ${L.name}, closing an information gap moves demand from MPB to MSB. The quantity and price become:`,
    [`${qty(meet(L.msb, L.mpc))} ${L.units} at ${money(valueAt(L.mpc, meet(L.msb, L.mpc)))}`, `${qty(L.subsidisedQ)} ${L.units} at ${money(L.buyerP)}`, `${qty(L.marketQ)} ${L.units} at ${money(L.marketP)}`, `${qty(L.marketQ)} ${L.units} at ${money(L.optimumP)}`],
    `Demand shifts right and supply is unchanged, so the market moves UP the supply curve: ${qty(meet(L.msb, L.mpc))} ${L.units} at ${money(valueAt(L.mpc, meet(L.msb, L.mpc)))}. ${qty(L.subsidisedQ)} at ${money(L.buyerP)} is the SUBSIDY's outcome — the same quantity at a LOWER price, because there the supply curve moved instead. ${qty(L.marketQ)} at ${money(L.marketP)} is the market before anything changed.`),
  qi(B6, 'Provision of information reaches the social optimum without the government spending on the good itself because:',
    ['buyers who can see the benefit value the good more highly', 'the government requires suppliers to lower the prices they charge buyers', 'the information reduces the cost of producing each unit of the good', 'it removes the external benefit from the transaction altogether'],
    'The only thing that changes is what buyers know, and buyers who can see a benefit are willing to pay more for it — which is a shift in demand. Nothing about production costs changes, and no price is set by anybody.'),
  qi(B6, 'The main limitation of an information campaign as a policy is that:',
    ['it changes nothing if the gap was never a lack of knowledge', 'it costs more than a subsidy on the same good', 'it can only be used where a good has external costs', 'it lowers the price that buyers have to pay'],
    'It is the cheapest tool on the list, and it works only on the failure it addresses. If people already know and still do not act, demand does not move and the money is gone — which is why a campaign is usually one of several tools rather than the only one.'),

  /* ── Block 7 · Where governments intervene ── */
  qi(B7, 'The specification lists eight contexts for intervention. Which of these is not among them?',
    ['banking', 'commodities', 'agriculture', 'energy'],
    'The eight are health, housing, education, transport, environment, energy, agriculture and commodities. Banking appears in the previous topic as a setting for moral hazard; it is not one of the contexts for intervention that 1c names.'),
  qi(B7, 'Government intervention in the housing market differs from intervention in health or education because:',
    ['the quantity may be right and the price still out of reach', 'housing is a public good and the other two are not', 'the external benefit from housing is much larger', 'housing markets never reach an equilibrium price'],
    'Health and education are under-consumed because much of the benefit falls on other people. In housing there may be no externality at all: the complaint is that the clearing price is unaffordable, which is a distribution problem and needs a different justification.'),
  qi(B7, 'Energy is a difficult context for a government because:',
    ['external costs argue for taxing it and affordability for subsidising it', 'no method of intervention on the specification\'s list can be applied to it at all', 'energy markets generate no external costs of any kind in production or use', 'the government is always the direct supplier of energy in every economy'],
    'It is the one context where the two arguments in this topic point in opposite directions at once. Many governments tax some fuels and subsidise others in the same year, which is why energy questions reward a judgement rather than a rule.'),
  qi(B7, 'In agricultural and commodity markets, prices swing sharply mainly because:',
    ['supply cannot be adjusted quickly and demand responds little to price', 'governments intervene in these markets more often than in any others', 'the goods are non-rival and non-excludable, which makes them public goods', 'the external costs of producing them are unusually large and hard to measure'],
    'A crop is planted months before it is sold and a mine takes years to open, so supply cannot respond; demand for a staple barely moves with price either. Two steep curves mean a small change in the harvest produces a large change in the price — which is what the guaranteed price is aimed at.'),

  /* ── Block 8 · Government failure ── */
  qi(B8, `The external cost in ${C.name} is ${money(C.externalCost)} a ${C.unit} but the tax is set at ${money(C.wrongTax)}. Quantity falls to ${qty(C.wrongQ)} ${C.units}, and the welfare loss is:`,
    [money(C.wrongLoss) + ' ' + C.per + ', the same as before the tax', money(0) + ', because the quantity has fallen', money(C.revenue) + ' ' + C.per, money(C.externalCost * C.wrongQ) + ' ' + C.per],
    `The tax overshoots by as much as the free market undershot, so the triangle is the same size on the other side of the optimum: ${money(C.wrongLoss)} ${C.per}. The intervention has moved the loss rather than removed it, and it costs something to run — which is 2a's net welfare loss exactly.`),
  qi(B8, 'Government failure has five named causes. Which of these is not one of them?',
    ['the opportunity cost of the spending', 'excessive administrative costs of running the scheme', 'unintended consequences of the policy', 'lack of incentives to control costs'],
    'The five at 2b are information gaps, lack of incentives, unintended consequences, excessive administrative costs and moral hazard. Opportunity cost is a real cost of any spending and it is not on that list: a cause of government failure is a route by which the intervention ends up losing more welfare than it saves.'),
  qi(B8, 'An intervention can be a net welfare loss even when it puts the quantity exactly at the social optimum, because:',
    ['designing, administering and enforcing it costs more than it recovers', 'the social optimum is not in fact the best quantity for society as a whole', 'moving the quantity leaves at least one group in the market worse off than before', 'the government has no way of establishing what the socially optimal quantity is'],
    `The prize in ${C.name} is ${money(C.welfareLoss)} ${C.per} and that is the ceiling on what any intervention here can be worth. A scheme that costs more than that to run is a net loss however precisely it hits the target, which is why administrative cost is a number to compare rather than a line to mention.`),
  qi(B8, 'A guaranteed floor price for a crop can cause moral hazard because it:',
    ['removes the risk of the price falling, so more is planted on poorer land', 'requires the government to store whatever it has bought at the floor', 'is expensive for the government to administer and to enforce each season', 'raises the price that consumers have to pay for food in the shops'],
    'Moral hazard is protection changing behaviour, so that the thing protected against becomes more likely. The other three are real costs of the policy but none of them is a change in behaviour caused by the protection itself, which is what distinguishes this cause from simple expense.'),
]);

/* ══ Practice ═════════════════════════════════════════════════════════════
 * Eleven items, all eight IAL ECONOMICS command words, on the Economics ladder only: Define 2,
 * Calculate 2 or 4, Draw 4, Explain 4, Analyse 6, Examine 8, Discuss 14, Evaluate 20. No Assess and
 * no 10-mark item exist in WEC11, and no Outline exists in either subject — the March bank carried
 * one of each.
 *
 * THE FIRST PARAGRAPH OF EVERY GUIDANCE IS A SCAFFOLD and carries no answer, no figure and no mark
 * allocation, because guided mode prints it above the empty answer box. For the three items above
 * 6 marks there is no point allocation anywhere: those tariffs are levels-marked.
 */
const pr = (block, command, marks, question, guidance) => ({ id: id('practice', question), block, command, marks, question, guidance });

export const PRACTICE = [
  pr(B1, 'Explain', 4, 'Explain why a government might intervene in a market in which a good is produced with an external cost. (4 marks)',
    'Explaining a reason needs two stages, and the first one is not "because there is an external cost". Decide what the external cost does to the quantity the market settles at, and then what the government is trying to change about that quantity. Keep the chain to one market and take it all the way to the end.\n'
    + 'Stage one: the external cost falls on people outside the transaction, so it is not in the private cost the producer pays and therefore not in the price, and the market settles where demand meets marginal private cost rather than marginal social cost (2 marks). Stage two: that quantity is above the socially optimal level, so more is produced than is worth producing and welfare is lost across those units; intervention aims to move the traded quantity down towards the optimum (2 marks). An answer that stops at "to correct market failure" has named the aim without naming the failure or the direction.'),

  pr(B2, 'Calculate', 4, `A specific tax of ${money(C.tax)} a ${C.unit} is imposed on ${C.name}. The price buyers pay rises from ${money(C.marketP)} to ${money(C.buyerP)} and the quantity traded falls from ${qty(C.marketQ)} to ${qty(C.taxedQ)} ${C.units} ${C.per}. Calculate the consumer incidence of the tax and the revenue the government collects. (4 marks)`,
    'There are two prices in this market once the tax is on, and the first part of the question asks about the movement in only one of them, so decide which before subtracting anything. The second part is a rectangle with two sides, and the question has given you two quantities of which only one belongs in it. Set each stage on its own line.\n'
    + `Consumer incidence: ${money(C.buyerP)} − ${money(C.marketP)} = ${money(C.consumerIncidence)} a ${C.unit} (2 marks), which is the rise in the price buyers pay and not the whole ${money(C.tax)}. Revenue: ${money(C.tax)} × ${qty(C.taxedQ)} = ${money(C.revenue)} ${C.per} (2 marks), using the quantity traded AFTER the tax rather than the ${qty(C.marketQ)} traded before it. Appendix 6 defines Calculate as requiring a calculation involving several stages based on given data and advises showing workings, which is what allows the two stages to be credited separately.`),

  pr(B2, 'Draw', 4, `Draw a diagram to show the effect of a specific indirect tax of ${money(C.tax)} a ${C.unit} on a market in which production generates an external cost of ${money(C.externalCost)} a ${C.unit}. (4 marks)`,
    'Decide first how many curves this needs and what each one is called, because a diagram with the right shape and the wrong labels earns very little. Think about which curve the tax moves and which one it leaves alone, and remember that once a tax is on there are two prices to mark rather than one.\n'
    + `Axes labelled price and quantity, with demand and marginal private cost drawn and the equilibrium at ${qty(C.marketQ)} ${C.units} and ${money(C.marketP)} (1 mark). A second supply curve above the first by the amount of the tax, correctly labelled as MPC plus the tax — and since the tax equals the external cost it is the same line as MSC, which may be labelled either way (1 mark). The new quantity at ${qty(C.taxedQ)} ${C.units} marked on the horizontal axis (1 mark). Both prices marked on the vertical axis: Pc at ${money(C.buyerP)} read off demand and Pp at ${money(C.sellerP)} read off the ORIGINAL supply curve (1 mark). Appendix 6 defines Draw as requiring an accurately labelled diagram using quantitative skills.`),

  pr(B3, 'Draw', 4, `Draw a diagram to show the effect of a subsidy of ${money(L.subsidy)} a ${L.unit} on a market in which consumption generates an external benefit of ${money(L.externalBenefit)} a ${L.unit}. (4 marks)`,
    'This is the mirror of the tax diagram and the commonest error is to move the wrong curve. Work out who receives the payment before you draw anything, because that decides which curve shifts and in which direction. Two prices again, and be clear which of them the buyer pays.\n'
    + `Axes labelled, with demand — marginal private benefit — and supply drawn, and the market equilibrium at ${qty(L.marketQ)} ${L.units} and ${money(L.marketP)} (1 mark). Marginal social benefit drawn above demand by the external benefit, showing the social optimum at ${qty(L.optimumQ)} (1 mark). A second supply curve BELOW the first by the amount of the subsidy, since the payment goes to the supplier (1 mark). The new quantity at ${qty(L.subsidisedQ)}, with the price buyers pay at ${money(L.buyerP)} and the price providers receive at ${money(L.providerP)} both marked (1 mark).`),

  pr(B3, 'Define', 2, "Define the term 'subsidy'. (2 marks)",
    'Two marks means two separate things to say, and the second should not be a rewording of the first. Decide who the payment goes to and what it is paid per, because those are the two features that separate a subsidy from every other transfer a government makes.\n'
    + 'A payment made by the government to the supplier of a good (1 mark), per unit supplied, which lowers the price at which any given quantity will be brought to market (1 mark). An answer saying only "money the government gives to help people buy something" has the direction of the payment wrong and does not say it is per unit; both of those matter, because they are why a subsidy shifts supply rather than demand.'),

  pr(B4, 'Calculate', 2, `In ${F.name} the market rent is ${money(F.marketP)} a month. A maximum price of ${money(F.maxPrice)} is imposed, at which quantity demanded is ${qty(F.demanded)} ${F.units} and quantity supplied is ${qty(F.supplied)}. Calculate the excess demand created. (2 marks)`,
    'Read the question for which two numbers belong in the subtraction, and in which order. Only one of the figures given is there as context rather than as an input, so decide which before you start. State what your answer is a quantity OF, not just the number.\n'
    + `${qty(F.demanded)} − ${qty(F.supplied)} = ${qty(F.excessDemand)} (1 mark), which is excess demand of ${qty(F.excessDemand)} ${F.units} a month (1 mark). The market rent of ${money(F.marketP)} is context and does not enter the calculation. Appendix 6 defines Calculate as requiring a calculation based on given data and advises showing workings, so the subtraction is written out even where the arithmetic is short.`),

  pr(B4, 'Analyse', 6, 'Analyse the effects of a guaranteed minimum price on producers and consumers in an agricultural market. (6 marks)',
    'Appendix 6 asks for depth rather than breadth here, so take one chain properly rather than listing four effects. Decide where the floor has to sit relative to the market price for it to do anything at all, and then follow both sides of the market from there — a movement along each curve, in opposite directions.\n'
    + 'The floor is set above the level at which the market was clearing, so it binds (1 mark). Consumers move up their demand curve and buy a smaller quantity at the higher price, so consumer expenditure per unit rises while the amount bought falls (2 marks). Producers move up their supply curve and bring a larger quantity forward, so what is offered exceeds what is wanted and excess supply appears (2 marks). Producer income depends on both the higher price and the smaller quantity sold, and on whether a public agency has promised to buy what is left over — which is what turns a floor into a guaranteed price (1 mark). A chain that reaches "producers are better off" without the quantity has stopped halfway; Appendix 6 defines Analyse as requiring a chain of reasoning and depth rather than breadth.'),

  pr(B5, 'Examine', 8, 'Examine whether a government should use an indirect tax or a system of tradeable pollution permits to reduce emissions from an industry. (8 marks)',
    'Both tools can reach the same quantity, so a comparison built on which one reduces emissions will not separate them. Look instead at what each one fixes and what it leaves to be settled, and at what the government has to know before it can set either. Take two points properly and assess them rather than listing five.\n'
    + 'A tax names a price and lets the quantity settle, so it can be adjusted upwards if emissions stay too high, and it needs an estimate of the external cost rather than of the right quantity. A cap names the quantity and lets the price settle, so it delivers a definite total, and trading sends the cuts to whichever firms can make them most cheaply without the government having to identify them. Against the cap: the right total has to be known before a single permit is issued, emissions have to be measured firm by firm, and who is given the permits decides who captures their value — auctioned they raise revenue, granted they hand the same amount to existing firms. The assessment should turn on which fact this government can establish and enforce, and on whether a definite total matters more than the ability to adjust. Appendix 6 defines Examine as requiring a chain of reasoning, depth rather than breadth, and a brief assessment of the arguments.'),

  pr(B6, 'Explain', 4, 'Explain how the provision of information by a government can increase the quantity consumed of a good that generates external benefits. (4 marks)',
    'This tool does not pay for anything and does not set a price, so be careful which curve you move. Work out what changes for the buyer when the information arrives, and let the quantity follow from that rather than asserting it. Two stages again.\n'
    + 'Stage one: buyers were unaware of part of the benefit, so their willingness to pay reflected only what they knew, and demand sat below marginal social benefit; publishing the information closes that gap and buyers value the good more highly (2 marks). Stage two: demand shifts to the right and, with supply unchanged, the market moves up the supply curve to a larger quantity at a HIGHER price (2 marks). The rise in price is what distinguishes this from a subsidy, where supply moves and the price to buyers falls; an answer that has the price falling has described the wrong tool.'),

  pr(B7, 'Discuss', 14, 'Discuss whether a government facing high fuel prices should subsidise fuel or use the money in some other way. (14 marks)',
    'Energy is the context where the two arguments in this topic point in opposite directions, so a one-sided answer will not reach the top. Work out what the subsidy does to the quantity of fuel consumed and whether that is the direction the external costs argue for, then think about who the payment actually reaches and what else the same money could do. Use a specific market and keep returning to it.\n'
    + 'For the subsidy: fuel is a necessity whose price falls hardest on poorer households, demand responds little in the short run so a price rise is absorbed rather than avoided, and a subsidy acts immediately where a targeted payment takes time to set up. Against it: fuel carries external costs, so a subsidy moves consumption further from the social optimum rather than towards it and works directly against any environmental objective; the payment goes to everybody who buys fuel, including the households who need it least and who buy the most; the budget cost is large and has an opportunity cost in health, education or transport; and subsidies of this kind are notoriously hard to remove once households and firms have planned around them. Alternatives worth weighing: a payment made directly to low-income households, which reaches the same people without lowering the price of fuel at the margin, and investment in public transport, which changes what the household needs fuel for. A strong answer takes a position, supports it with a chain that reaches a quantity, and says what would have to be true for the opposite judgement to hold.'),

  pr(B8, 'Define', 2, "Define the term 'government failure'. (2 marks)",
    'The specification defines this in one line and every word in that line is doing something. Decide what is being compared with what, because a definition that leaves out the comparison has given half the term. Two marks, two separate things to say.\n'
    + 'Government intervention in a market (1 mark) that results in a net welfare loss — that is, a loss of welfare judged against what would have happened without the intervention (1 mark). The second mark is the word net: an intervention with drawbacks is not a failure, and an expensive intervention is not a failure. The comparison is the whole of it.'),

  pr(B8, 'Evaluate', 20, 'Evaluate the view that government intervention to correct market failure inevitably leads to government failure. (20 marks)',
    'The word to argue with here is "inevitably", and an answer that simply lists interventions that went wrong has not engaged with it. Decide what would have to be true for the claim to hold in every case rather than in some, and find the strongest version of the opposite view before you judge between them. Use one or two markets in depth and keep coming back to them.\n'
    + 'For the view: every tool in this topic has to be set from a number the government cannot observe directly — an external cost, an optimal quantity, a benefit per unit — so an information gap is present by construction and the policy is set from an estimate; a tax set at twice the external cost lands the quantity as far below the optimum as the free market was above it, leaving a welfare loss of the same size plus the cost of administering the tax. Add to that the machinery every intervention needs, the responses people make to the new incentives, the weaker pressure on costs where a state provider faces no rival, and the moral hazard that protection itself creates. Against the view: an estimate that is roughly right still recovers most of the welfare, and being approximately right is not failure; some tools need much less to be known than others — a maximum price needs no estimate of an external cost at all, and information provision needs only that the gap be one of knowledge; some tools are administratively cheap because they use machinery that already exists; and the comparison that defines government failure is with the market outcome, which was itself losing welfare. The judgement should distinguish between interventions that are inherently exposed to these causes and those that are not, and should say what determines which of the two a given policy is. A candidate who concludes that failure is common but not inevitable, and who says what makes it more likely, has answered the question that was asked.'),
];

/* ══ Flashcards ═══════════════════════════════════════════════════════════ */
const card = (front, back) => ({ id: id('flashcard', front), front, back });

export const FLASHCARDS = [
  card('What is the purpose of government intervention?', 'To move the quantity traded towards the socially optimal level. The reason it is not there already is market failure.'),
  card('Name the eight methods of intervention.', 'Indirect taxation (ad valorem and specific); subsidies; maximum and minimum (guaranteed) prices; tradeable pollution permits; extension of property rights; state provision; regulation; provision of information.'),
  card('Which methods set a price, and which set a quantity?', 'Taxes, subsidies and price controls set a price. Only tradeable permits set a quantity. The other four set a rule or change what is known.'),
  card('What is an indirect tax?', 'A tax on a transaction, collected from the seller, rather than on income. It lifts the curve sellers act on, so the quantity falls.'),
  card('Specific or ad valorem?', 'Specific is a fixed sum per unit and shifts supply in parallel. Ad valorem is a percentage of the price and pivots supply, so the gap widens as the price rises.'),
  card('Where do you read Pc and Pp?', 'Pc off the DEMAND curve at the new quantity; Pp off the ORIGINAL supply curve at the new quantity. The gap between them is the tax.'),
  card('How is tax revenue calculated?', `Tax per unit × the quantity traded AFTER the tax. In ${C.name}: ${money(C.tax)} × ${qty(C.taxedQ)} = ${money(C.revenue)} ${C.per}.`),
  card('What is a subsidy?', 'A payment to the supplier per unit supplied. It lowers the curve suppliers act on, so the quantity rises and buyers move down an unchanged demand curve.'),
  card('How is the cost of a subsidy calculated?', `Subsidy per unit × the quantity supplied AFTER it. In ${L.name}: ${money(L.subsidy)} × ${qty(L.subsidisedQ)} = ${money(L.cost)} ${L.per}.`),
  card('When does a maximum price bind?', `Only when set BELOW the market price. It produces excess demand: in ${F.name}, ${qty(F.demanded)} wanted against ${qty(F.supplied)} offered, a gap of ${qty(F.excessDemand)}.`),
  card('When does a minimum price bind?', `Only when set ABOVE the market price. It produces excess supply: in ${C.name} at ${money(C.minPrice)}, ${qty(C.minDemanded)} wanted against ${qty(C.minSupplied)} offered, a gap of ${qty(C.minExcessSupply)}.`),
  card('What does "guaranteed" add to a minimum price?', 'A promise to buy. Producers may sell at the floor, and if nobody else buys at it a public agency does — so the agency owns the excess supply and the cost of storing it.'),
  card('A minimum price or a tax, on the same market?', `Buyers pay the same ${money(C.minPrice)} and buy the same ${qty(C.minDemanded)} ${C.units} under both. The extra ${money(C.tax)} a ${C.unit} goes to the GOVERNMENT under the tax and to SELLERS under the floor — and the floor also leaves ${qty(C.minExcessSupply)} unsold.`),
  card('How does a tradeable permit scheme work?', 'A total quantity is decided and that many permits are issued; no firm may produce without one, so supply is vertical at the cap and buyers bid the price up to what the last unit is worth to them.'),
  card('What is a permit worth?', `The gap between what buyers pay at the cap and what the last unit costs to produce. In ${C.name}: ${money(C.capBuyerP)} − ${money(C.capCostP)} = ${money(C.permitPrice)}, which is the same as a tax set at the external cost.`),
  card('What does trading permits change?', 'WHO cuts, never how much is cut. The total is fixed by the number of permits; trading sends the cuts to whichever firms can make them most cheaply.'),
  card('What is extension of property rights?', 'Giving somebody a claim over a resource that they can defend or sell, so a cost falling outside a transaction starts falling inside one. A tradeable permit is one.'),
  card('What forms does regulation take?', 'A limit, a standard, a ban or a requirement, backed by enforcement. It can reach the same quantity as a tax, but every firm has to meet it the same way.'),
  card('What is state provision?', 'The government supplies the good itself, funded from taxation, so the quantity is set by a budget rather than by a price.'),
  card('How does provision of information work?', `It shifts DEMAND rather than supply. In ${L.name} it reaches ${qty(meet(L.msb, L.mpc))} ${L.units} at ${money(valueAt(L.mpc, meet(L.msb, L.mpc)))} — the same quantity as the subsidy, at a higher price and with nothing spent on the good.`),
  card('Name the eight contexts at 1c.', 'Health, housing, education, transport, environment, energy, agriculture and commodities.'),
  card('Why is housing different from health and education?', 'There may be no externality at all: the quantity may be right and the price simply out of reach. That is a distribution problem, not a market failure in the 1.3.5 sense.'),
  card('Why is energy the hardest context?', 'The external cost argument says tax it and the affordability argument says subsidise it. Many governments do both to different fuels in the same year.'),
  card('Why do commodity prices swing so far?', 'Supply cannot be adjusted quickly and demand for a staple barely responds to price. Two steep curves mean a small change in the harvest produces a large change in the price.'),
  card('What is government failure?', 'Intervention that results in a NET welfare loss — judged against what would have happened without the intervention, not against perfection.'),
  card('Name the five causes of government failure.', 'Information gaps; lack of incentives; unintended consequences; excessive administrative costs; moral hazard.'),
  card('Give the arithmetic case of government failure.', `An external cost of ${money(C.externalCost)} and a tax set at ${money(C.wrongTax)}: quantity falls to ${qty(C.wrongQ)} ${C.units}, ${qty(C.optimumQ - C.wrongQ)} below the optimum, and the welfare loss is ${money(C.wrongLoss)} ${C.per} — the same as before the government acted.`),
  card('Why do administrative costs matter so much?', `They cap what any intervention can be worth. The whole prize in ${C.name} is ${money(C.welfareLoss)} ${C.per}; a scheme costing more than that to run is a net loss even at exactly the right quantity.`),
];

/* ══ Common mistakes ══════════════════════════════════════════════════════ */
const mistake = (title, looksLike, why, instead) => ({ id: id('mistake', title), title, looks_like: looksLike, why, instead });

export const MISTAKES = [
  mistake(
    'Calculating revenue or cost with the wrong quantity',
    `"The tax is ${money(C.tax)} a ${C.unit} and ${qty(C.marketQ)} ${C.units} are sold, so revenue is ${money(C.tax * C.marketQ)}."`,
    `The tax is only collected on units actually traded, and the tax is what reduced that number. Revenue is ${money(C.tax)} × ${qty(C.taxedQ)} = ${money(C.revenue)}. The same trap works in reverse for a subsidy, where the quantity AFTER is the larger number.`,
    'Find the new quantity first, write it on its own line, and only then multiply.'),
  mistake(
    'Moving the wrong curve',
    '"The tax raises the price, so demand falls and the demand curve shifts left."',
    'A tax is collected from the seller and a subsidy is paid to the supplier, so both move SUPPLY. What happens on the demand side is a movement along an unchanged curve. Provision of information is the one tool in this topic that really does shift demand.',
    'Ask who receives or pays the money per unit. If it is the seller, supply moves; if it is what buyers KNOW that changed, demand moves.'),
  mistake(
    'Treating a price control as free',
    '"A maximum price makes housing affordable."',
    `It makes it cheaper for the people who get a flat and unavailable to some who previously had one. At ${money(F.maxPrice)}, ${qty(F.demanded)} ${F.units} are wanted and only ${qty(F.supplied)} are offered — fewer than the ${qty(F.marketQ)} let before the control.`,
    'Give both numbers: how much cheaper for those served, and how many are not served.'),
  mistake(
    'Saying a minimum price and a tax are the same thing',
    `"Either way buyers pay ${money(C.minPrice)}, so it makes no difference which one the government uses."`,
    `Buyers do pay the same and buy the same quantity. Everything else differs: the tax raises ${money(C.revenue)} ${C.per} that can be spent on the harm, the floor hands the same amount to sellers, and the floor leaves ${qty(C.minExcessSupply)} ${C.units} offered and unsold.`,
    'Say who receives the extra amount per unit, and whether excess supply appears.'),
  mistake(
    'Thinking permits let rich firms pollute freely',
    '"Firms that can afford it just buy permits and carry on."',
    'The total is fixed by how many permits exist, so a firm emitting more requires another to emit less. Trading changes WHO cuts, never how much is cut. The real objections to permits are about setting the total, measuring emissions, and who is given the permits in the first place.',
    'Separate the total, which the government sets, from the distribution, which trading decides.'),
  mistake(
    'Calling any disappointing policy government failure',
    '"The subsidy cost a lot and did not fix everything, so it is government failure."',
    'Failure means a NET welfare loss against what would have happened without the intervention. A policy that recovers more welfare than it costs is a success even if it is expensive, unpopular or incomplete.',
    `Name what the intervention was worth at most — in ${C.name}, ${money(C.welfareLoss)} ${C.per} — and set the cost of running it against that.`),
];

/* ══ Chains ═══════════════════════════════════════════════════════════════ */
export const EXTRAS = {
  chains: [
    {
      title: 'A tax and a permit cap, traced to the same point from opposite directions',
      steps: [
        `${C.name} trades ${qty(C.marketQ)} ${C.units} ${C.per} at ${money(C.marketP)}, against a social optimum of ${qty(C.optimumQ)}.`,
        `A tax of ${money(C.tax)} a ${C.unit} lifts the curve sellers act on to MSC, and the quantity falls to ${qty(C.taxedQ)}: buyers pay ${money(C.buyerP)}, sellers keep ${money(C.sellerP)}, the government collects ${money(C.revenue)} ${C.per}.`,
        `A cap of ${qty(C.capQ)} ${C.units} makes supply vertical, so buyers bid to ${money(C.capBuyerP)} while the last ${C.unit} still costs ${money(C.capCostP)} to make.`,
        `The gap of ${money(C.permitPrice)} is what a permit sells for — the same number the tax collected, on the same quantity, at the same price to buyers.`,
      ],
      result: `A tax names a price and lets quantity settle; a cap names a quantity and lets price settle. They meet at the same point, and the ${money(C.permitPrice)} a ${C.unit} goes to the government under one and to whoever was given the permits under the other.`,
    },
    {
      title: 'An information gap, traced to a net welfare loss',
      steps: [
        `The external cost in ${C.name} is ${money(C.externalCost)} a ${C.unit}, but nobody can read that number off a market: it has to be estimated.`,
        `The estimate comes out at ${money(C.wrongTax)} and the tax is set there, because a policy has to be set from something.`,
        `Supply shifts twice as far as it should and the quantity falls to ${qty(C.wrongQ)} ${C.units} — ${qty(C.optimumQ - C.wrongQ)} below the optimum of ${qty(C.optimumQ)}.`,
        `The triangle between demand and MSC over those ${qty(C.optimumQ - C.wrongQ)} ${C.units} is ${money(C.wrongLoss)} ${C.per}: the same loss the free market was producing, on the other side.`,
      ],
      result: `A net welfare loss, with the cost of administering the tax on top — and nobody in the story was corrupt, lazy or ill-intentioned. One number was wrong, which is why "information gaps" is the first cause the specification lists.`,
    },
    {
      title: 'Three tools on one market, traced to who ends up with the money',
      steps: [
        `A subsidy of ${money(L.subsidy)} a ${L.unit} takes ${L.name} to ${qty(L.subsidisedQ)} ${L.units}: buyers pay ${money(L.buyerP)} and the government pays ${money(L.cost)} ${L.per}.`,
        `Closing the information gap instead reaches ${qty(meet(L.msb, L.mpc))} ${L.units} — the same quantity — with buyers paying ${money(valueAt(L.mpc, meet(L.msb, L.mpc)))} and the government paying for a campaign.`,
        `State provision reaches people neither of those reaches, because it attaches no price at all, and sets the quantity from a budget instead.`,
        `Each tool asks a different question: how much can the budget bear, was the gap really knowledge, and who is excluded by any price at all?`,
      ],
      result: 'The same quantity by three routes, with the cost falling on the taxpayer, on the buyer, or on the taxpayer in a different form. Which is right depends on who the market was failing.',
    },
  ],
};
