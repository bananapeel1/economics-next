/**
 * PACKET 24 — price-determination: quiz, practice, flashcards, common mistakes and chains.
 *
 * WHAT THE MARCH BANK GOT WRONG, and what the audit got right about it.
 *
 * Q14 was keyed "ambiguous" for the effect of a rightward demand shift on consumer surplus (quiz-01).
 * It is not ambiguous, and the section's own teaching pointed a third way again. Derived rather than
 * argued: with the demand curve shifted right, the equilibrium moves from $10 · 600 to $12 · 800 and
 * the consumer surplus triangle grows from $3,600 to $6,400 — the area is measured against the NEW
 * demand curve, which has moved up as well as right. The item is re-keyed to "increases", and the
 * arithmetic that settles it is in _packet24-util.mjs where the runner can recheck it.
 *
 * PRACTICE IS EIGHT ITEMS, ONE PER IAL ECONOMICS COMMAND WORD. The March five carried two invalid
 * command words and a bank-level gap:
 *   - "Assess the effectiveness of the price mechanism … (10 marks)" (practice-02) is invalid twice:
 *     Assess is not an IAL ECONOMICS command word and there is no 10-mark tariff in WEC11. It becomes
 *     the Discuss (14) on the price mechanism across local, national and global markets, which is the
 *     leaf (3b) that had nothing at all.
 *   - "Outline two effects of a price floor set above the equilibrium price (4 marks)" (practice-03)
 *     is invalid and off-topic: Outline is not an IAL command word in either subject, and `price
 *     floor` is 0 in econ_spec.txt — 1.3.6 calls them "maximum and minimum (guaranteed) prices"
 *     (:809), and that is packet 26's section. Deleted rather than re-tariffed.
 *   - the UK oil-price macro essay was already withheld by packet 0 (practice-01, confirmed).
 *   - practice-04's bank-level gap is the real finding: NOTHING in the five covered indirect taxes,
 *     subsidies, incidence or the two surpluses — half the spec bullets — and there was no Calculate
 *     and no Draw, in the most diagram-heavy topic of Unit 1. There are now two Calculates' worth of
 *     arithmetic (incidence and revenue in one item), TWO Draws — one on the two surpluses and one on a
 *     subsidy, which is the clause topFix-02 names explicitly — and items on every spec bullet.
 *     The subsidy Draw is here because Verify A rejected topFix-02 on its absence: this header had
 *     claimed it shipped when the bank held one Draw, on surplus. A claim about our own work is worth
 *     no more than a claim in an audit item, and is checked the same way.
 */
import {
  id, hash8, money, pc, qty,
  P_EQ, Q_EQ, CHOKE, FOOT, CS, PS, P_LOW, P_HIGH, EXCESS_DEMAND, EXCESS_SUPPLY,
  DEMAND, SUPPLY, q, DEMAND_RISE, DEMAND_FALL, SUPPLY_RISE, SUPPLY_FALL,
  TAX, SUBSIDY, AD_VALOREM, TAXED, SUBSIDISED, AV_LOW_Q, AV_HIGH_Q, AV_GAP_LOW, AV_GAP_HIGH,
} from './_packet24-util.mjs';
import { B1, B2, B3, B4, B5, B6 } from './_packet24-content.mjs';

const qi = (block, question, options, explanation) => ({ id: id('quiz', question), block, question, options, explanation });

/*
 * EVERY ITEM BELOW IS AUTHORED WITH ITS KEY FIRST, because that is how a reader of this file checks
 * one, and the key is then moved into a position here. `quiz.histogram` is DEBT for a reason: a bank
 * whose key is always in the same place is answerable without reading the options, and the March bank
 * was 100% position A. Hand-picking 33 positions produces exactly the lumpy distribution the rule
 * looks for, so the positions are DEALT: items are ranked by a hash of their own stem and the ranks
 * are taken modulo four. That gives an even spread by construction, is stable across edits, and a
 * verifier can reproduce it from this file alone.
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
 * sliced server-side (F086, and freeQuizPayload() since 16 Sep), so a pre-test whose pool sits at the
 * end of the array would serve that student PINNED questions instead.
 */
export const QUIZ = placeKeys([
  qi(null, 'A market is in equilibrium when:',
    ['quantity demanded equals quantity supplied', 'the price is as low as buyers can make it', 'every producer is making a profit', 'the quantity traded is at its maximum'],
    'Equilibrium is defined by the two quantities being equal at a price, which is why the price then has no tendency to change. It makes no claim about profit, about fairness, or about the size of the quantity.'),
  qi(null, 'Consumer surplus is best described as:',
    ['the gap between willingness to pay and the price paid', 'the money buyers save by shopping around for a lower price', 'the profit a seller makes on each unit sold', 'the total amount buyers spend in a market'],
    'It is a measure of value received above the price handed over, summed across all buyers. Nothing is "saved", because no lower price was ever on offer, and total spending is a rectangle rather than the triangle above the price line.'),
  qi(null, 'A specific tax of ' + money(TAX) + ' a unit shifts the supply curve:',
    ['up by ' + money(TAX) + ' at every quantity', 'up by more at higher prices', 'down by ' + money(TAX) + ' at every quantity', 'to the right by ' + money(TAX) + ' worth of output'],
    'A fixed sum per unit adds the same amount to what the seller needs from the buyer at every quantity, so the shift is parallel. A gap that widens with price is the signature of an ad valorem tax instead.'),

  /* ── Block 1 · Finding the equilibrium ── */
  qi(B1, 'In a market where Qd = 1100 − 50P and Qs = 100P − 400, the equilibrium price and quantity are:',
    [money(P_EQ) + ' and ' + qty(Q_EQ), money(12) + ' and ' + qty(500), money(8) + ' and ' + qty(700), money(P_EQ) + ' and ' + qty(1100)],
    'Setting the two quantities equal gives 1100 − 50P = 100P − 400, so 1500 = 150P and P = ' + money(P_EQ) + '. Substituting back into either equation gives ' + qty(Q_EQ) + '. Both numbers are the answer, not just the price.'),
  qi(B1, 'Which statement about the equilibrium price is correct?',
    ['It is the only price neither side has a reason to move away from', 'It is the price the government judges to be fair', 'It is the price at which sellers make the most profit', 'It is the average of the highest and lowest prices anyone offered'],
    'The model claims only that nobody is left disappointed, so nobody acts to move the price. It makes no claim about fairness, about profit, or about any average of what was offered.'),
  qi(B1, 'On a demand and supply schedule, the equilibrium row is the one where:',
    ['the two quantity columns show the same number', 'the quantity demanded is at its largest', 'the price is in the middle of the range shown', 'the quantity supplied is at its largest'],
    'The test is agreement between the columns, not the size of either. The largest quantities appear at the extreme prices, where the gap between the columns is widest.'),
  qi(B1, 'An equilibrium diagram is complete only when it shows:',
    ['both curves labelled and both values read off to the axes', 'the intersection marked with a dot', 'the demand curve labelled and the price marked', 'arrows showing which way each curve slopes'],
    'The crossing locates the answer but does not state it. Appendix 6 defines Draw as constructing an accurately labelled diagram, and the labelling that matters here is the price read across and the quantity read down.'),

  /* ── Block 2 · Out of equilibrium ── */
  qi(B2, 'Buyers want ' + qty(q(DEMAND, P_LOW)) + ' cylinders and sellers offer ' + qty(q(SUPPLY, P_LOW)) + ' at a price of ' + money(P_LOW) + '. At that price there is:',
    ['excess demand of ' + qty(EXCESS_DEMAND), 'excess supply of ' + qty(EXCESS_DEMAND), 'excess demand of ' + qty(300), 'equilibrium, with ' + qty(750) + ' traded'],
    'At ' + money(P_LOW) + ' buyers want ' + qty(q(DEMAND, P_LOW)) + ' and sellers offer ' + qty(q(SUPPLY, P_LOW)) + '. The difference of ' + qty(EXCESS_DEMAND) + ' is excess demand, because the price sits below the equilibrium and the demand column is the larger one.'),
  qi(B2, 'Excess supply on a diagram is measured:',
    ['horizontally between the two curves at the stated price', 'vertically between the two curves at the stated quantity', 'as the area between the curves above the price', 'from the supply curve down to the quantity axis'],
    'The gap is a difference between two QUANTITIES, so it is read along the horizontal axis at the price in question. A vertical distance between the curves is a difference between prices, which is a different measurement entirely.'),
  qi(B2, 'Excess demand is eliminated because:',
    ['unsatisfied buyers bid the price up until the gap closes', 'the government steps in and raises the price to the equilibrium level', 'producers agree among themselves to supply more', 'buyers stop wanting the good once they cannot have it'],
    'The disappointed side acts, and the price moves because of what they do. The gap then closes from both ends at once: a higher price draws out more supply and puts some buyers off.'),
  qi(B2, 'An increase in demand, with supply unchanged, causes:',
    ['the equilibrium price and quantity to both rise', 'the price to rise and the quantity to fall', 'the price to fall and the quantity to rise', 'the supply curve to shift right as well'],
    'A demand shift moves price and quantity in the same direction. The larger quantity is a movement ALONG the unchanged supply curve, drawn out by the higher price, not a shift of supply.'),
  qi(B2, 'A market shows a lower price and a larger quantity traded than before. The most likely cause is:',
    ['an increase in supply', 'an increase in demand', 'a decrease in demand', 'a decrease in supply'],
    'Price and quantity moving in OPPOSITE directions is the signature of a supply shift, and a lower price with more traded points to supply increasing. Any demand shift would move both the same way.'),
  qi(B2, 'If demand increases and supply increases at the same time, then:',
    ['the quantity traded definitely rises and the price is uncertain', 'the price definitely rises and the quantity is uncertain', 'both the price and the quantity definitely rise', 'neither the price nor the quantity can be predicted'],
    'Both shifts push the quantity the same way, so its direction is certain whichever is larger. They push the price in opposite directions, so the price depends on the relative size of the two shifts.'),

  /* ── Block 3 · Surplus ── */
  qi(B3, 'Consumer surplus on a diagram is the area:',
    ['below the demand curve and above the price line', 'below the demand curve and above the quantity axis', 'above the supply curve and below the price line', 'between the two curves to the right of the equilibrium'],
    'It measures what buyers gained above what they paid, so it is bounded below by the price they paid and above by what they were willing to pay. The area above the supply curve is the producers\' side of the same measurement.'),
  qi(B3, 'In a market with equilibrium at ' + money(P_EQ) + ' and ' + qty(Q_EQ) + ', where the demand curve meets the price axis at ' + money(CHOKE) + ', consumer surplus is:',
    [money(CS), money(PS), money(CS + PS), money(6000)],
    'The triangle has a height of ' + money(CHOKE) + ' − ' + money(P_EQ) + ' = ' + money(CHOKE - P_EQ) + ' and a base of ' + qty(Q_EQ) + ' units, so the area is ½ × ' + (CHOKE - P_EQ) + ' × ' + qty(Q_EQ) + ' = ' + money(CS) + '. The base is the quantity traded, not the quantity the curve would reach at a zero price.'),
  qi(B3, 'Producer surplus differs from profit because producer surplus:',
    ['deducts only the minimum the seller would have accepted', 'is measured before any tax is paid', 'includes the revenue from every unit produced', 'is always larger than profit'],
    'Profit deducts every cost the firm bears; producer surplus deducts only what was needed to make the seller willing to supply that unit. The two measure different things and their totals differ.'),
  qi(B3, 'Demand increases and the equilibrium moves from ' + money(P_EQ) + ' · ' + qty(Q_EQ) + ' to ' + money(DEMAND_RISE.price) + ' · ' + qty(DEMAND_RISE.quantity) + '. Consumer surplus:',
    ['increases, because it is measured against the new demand curve', 'decreases, because buyers now pay a higher price', 'is unchanged, because the demand curve shifted parallel', 'cannot be determined without knowing the supply curve'],
    'The whole demand curve has moved up as well as right, so the area is measured from a higher boundary over a larger quantity: it rises from ' + money(CS) + ' to ' + money(DEMAND_RISE.cs) + '. Reasoning from the higher price alone assumes the old curve is still the relevant one.'),
  qi(B3, 'After a parallel increase in supply, which of these depends on the slopes of the two curves?',
    ['How the gain in surplus divides between the two sides', 'Whether the equilibrium price falls rather than rises', 'Whether the quantity traded rises rather than falls', 'Whether producer surplus rises rather than falls'],
    'A parallel shift lowers the supply curve\'s foot by the full amount of the shift and the price by less than that, so the price-to-foot gap and the quantity both rise: price, quantity and BOTH surpluses move in a known direction whatever the slopes. What the slopes decide is how far the price falls, and therefore how the gain divides — the same rule as tax incidence.'),

  /* ── Block 4 · The price mechanism ── */
  qi(B4, 'The rationing function of the price mechanism means that price:',
    ['decides which buyers get a scarce good', 'limits how much each buyer is allowed to purchase', 'ensures the good reaches those who need it most', 'prevents producers from raising output too quickly'],
    'Rationing by price excludes buyers unwilling or unable to pay it, with nobody deciding who those buyers are. It allocates by willingness AND ability to pay, which is not the same as allocating by need.'),
  qi(B4, 'A rise in the price of a good gives producers a reason to supply more. This is the:',
    ['incentive function', 'rationing function', 'signalling function', 'equilibrium function'],
    'Incentive is about the reason to change behaviour that a new price creates. Signalling is the information the price carries; rationing is about who ends up with the good once the price has settled.'),
  qi(B4, 'A price change is said to "signal" because it:',
    ['carries information about a market to people who never meet', 'is announced publicly by producers', 'tells the government when to intervene', 'is always followed by a change in output somewhere in the market'],
    'The information that coordinates a market is compressed into one number that costs nothing to read and reaches everyone at once. Whether output then changes is the incentive function, which is a separate step.'),
  qi(B4, 'Compared with a global market, a local market for the same good will usually show:',
    ['a larger price movement after a local disruption', 'a smaller price movement after a local disruption', 'no price movement at all after a local disruption', 'a price set by supply and demand worldwide'],
    'Only the sellers already present can answer a local shortage quickly, so the price has to move further before supply responds. In a global market supply can arrive from many countries, which limits how far the price moves.'),
  qi(B4, 'In a global market, an individual seller is best described as:',
    ['unable to influence the price, since worldwide supply and demand set it', 'able to set the price, because global markets are dominated by a few large sellers', 'able to charge what it likes, because buyers cannot compare', 'unaffected by conditions in other countries'],
    'With buyers and sellers in many countries, no single participant is large enough to move the price, so the decision is only whether to trade at it. That is exactly what changes as the scale of the market widens.'),

  /* ── Block 5 · Indirect taxes ── */
  qi(B5, 'An ad valorem tax differs from a specific tax because it:',
    ['opens a gap that widens as price rises, pivoting the curve', 'is paid by the buyer rather than the seller', 'shifts the supply curve down instead of up', 'applies only to goods with inelastic demand'],
    'A percentage of a higher price is more money, so the vertical distance between the curves grows as you move up them. Both kinds are handed over by the seller, and both shift supply upward.'),
  qi(B5, 'A tax of ' + money(TAX) + ' a unit moves the equilibrium from ' + money(P_EQ) + ' to ' + money(TAXED.buyer) + '. The price the seller keeps is:',
    [money(TAXED.seller), money(P_EQ), money(TAXED.buyer), money(6)],
    'The seller hands ' + money(TAX) + ' of the ' + money(TAXED.buyer) + ' to the government, leaving ' + money(TAXED.seller) + '. The gap between the two prices is always exactly the tax, which is a useful check on any answer.'),
  qi(B5, 'With a ' + money(TAX) + ' tax, buyers pay ' + money(TAXED.buyerShare) + ' more than before. The producer incidence is:',
    [money(TAXED.sellerShare), money(TAXED.buyerShare), money(TAX), money(0)],
    'The two shares must add to the tax, so if buyers bear ' + money(TAXED.buyerShare) + ' of ' + money(TAX) + ', sellers bear the remaining ' + money(TAXED.sellerShare) + '. It is read off how far the price the seller keeps has fallen.'),
  qi(B5, 'The incidence of an indirect tax falls more heavily on:',
    ['the side of the market that responds less to price', 'whichever side is legally required to pay it', 'the side of the market with more participants', 'producers, in every case, because they remit the tax'],
    'A buyer escapes a tax by buying less and a seller by supplying less; the side that finds that harder has to absorb more of the tax instead. Who remits the money to the government is a legal question, not an economic one.'),
  qi(B5, 'A tax of ' + money(TAX) + ' a unit reduces the quantity traded from ' + qty(Q_EQ) + ' to ' + qty(TAXED.quantity) + '. Government revenue is:',
    [money(TAXED.government), money(TAX * Q_EQ), money(TAXED.buyerShare * TAXED.quantity), money(TAXED.quantity)],
    'Revenue is the tax per unit times the quantity actually traded after the tax: ' + money(TAX) + ' × ' + qty(TAXED.quantity) + ' = ' + money(TAXED.government) + '. Using the pre-tax quantity gives ' + money(TAX * Q_EQ) + ' and overstates it, because the tax itself reduced how much is traded.'),

  /* ── Block 6 · Subsidies ── */
  qi(B6, 'A subsidy of ' + money(SUBSIDY) + ' a unit paid to producers shifts the supply curve:',
    ['down by ' + money(SUBSIDY) + ', because sellers need less from the buyer', 'up by ' + money(SUBSIDY) + ', because sellers receive more money', 'left, because output becomes more valuable', 'not at all, since the payment goes to producers'],
    'The supply curve records what a seller needs FROM THE BUYER at each quantity, and a subsidy reduces that by the payment per unit. The seller does receive more in total, but the curve moves down and to the right.'),
  qi(B6, 'With a ' + money(SUBSIDY) + ' subsidy, buyers pay ' + money(SUBSIDISED.buyer) + ' and sellers receive ' + money(SUBSIDISED.seller) + '. Buyers have captured:',
    [money(Math.abs(SUBSIDISED.buyerShare)) + ' of the subsidy', money(Math.abs(SUBSIDISED.sellerShare)) + ' of the subsidy', 'the whole ' + money(SUBSIDY), 'none of it, since it is paid to producers'],
    'Buyers\' share is how far the price they pay fell: ' + money(P_EQ) + ' to ' + money(SUBSIDISED.buyer) + ', so ' + money(Math.abs(SUBSIDISED.buyerShare)) + '. Sellers captured the other ' + money(Math.abs(SUBSIDISED.sellerShare)) + ', and the two shares add to the subsidy.'),
  qi(B6, 'A subsidy of ' + money(SUBSIDY) + ' a unit raises the quantity traded to ' + qty(SUBSIDISED.quantity) + '. The cost to the government is:',
    [money(SUBSIDISED.government), money(SUBSIDY * Q_EQ), money(TAXED.government), money(Math.abs(SUBSIDISED.buyerShare) * SUBSIDISED.quantity)],
    'The subsidy is paid on every unit traded after it is introduced: ' + money(SUBSIDY) + ' × ' + qty(SUBSIDISED.quantity) + ' = ' + money(SUBSIDISED.government) + '. The pre-subsidy quantity would give ' + money(SUBSIDY * Q_EQ) + ' and understate the cost, because the subsidy raised how much is traded.'),
  qi(B6, 'Why does a subsidy of ' + money(SUBSIDY) + ' a unit cost more than a tax of ' + money(TAX) + ' a unit raises?',
    ['a subsidy raises the quantity it is paid on; a tax cuts the quantity it is collected on', 'subsidies are paid to every producer in the market, including those who sell nothing at all', 'the government must also pay to administer the subsidy', 'subsidies are paid on the pre-subsidy quantity'],
    'The two policies move the quantity in opposite directions: ' + qty(SUBSIDISED.quantity) + ' units are subsidised against ' + qty(TAXED.quantity) + ' taxed, at the same rate per unit. That asymmetry is why ' + money(SUBSIDISED.government) + ' leaves the budget and only ' + money(TAXED.government) + ' comes in.'),
  qi(B6, 'A government subsidises a good to make it cheaper for buyers. The policy achieves LEAST of that aim when:',
    ['demand is highly responsive to price', 'demand is barely responsive to price', 'supply is highly responsive to price', 'the subsidy is paid directly to producers'],
    'The less responsive side captures more of a subsidy. Where demand responds strongly to price, buyers are the responsive side, so most of the payment is captured by sellers and the price to buyers falls by little.'),
]);

/* ══ Practice ═════════════════════════════════════════════════════════════
 * Eight items, one per IAL ECONOMICS command word, at the tariffs Appendix 6 states: Define 2,
 * Calculate 2 or 4, Draw 4, Explain 4, Analyse 6, Examine 8, Discuss 14, Evaluate 20. There is no
 * Assess and no Outline in this subject, and no 10-mark item at any tariff — the March bank had one
 * of each. Guidance above 6 marks allocates no points, because those tariffs are levels-marked.
 */
const pr = (block, command, marks, question, guidance) => ({ id: id('practice', question), block, command, marks, question, guidance });

export const PRACTICE = [
  pr(B1, 'Define', 2, "Define the term 'equilibrium price'. (2 marks)",
    'Two marks means two separate things to say, and the second is not a rewording of the first. Give the condition that defines the term, then give what follows from that condition being met.\n' + 'The price at which quantity demanded equals quantity supplied (1 mark), so there is no tendency for the price to change (1 mark). The second mark is the consequence, not a restatement: a definition that stops at "where the curves cross" describes the diagram rather than the concept.'),
  pr(B1, 'Explain', 4, 'Explain why a market tends to move towards its equilibrium price when the price is initially below it. (4 marks)',
    'An Explain of a reason needs a two-stage chain, so plan both links before writing. Start from what is true of the two quantities at a price below equilibrium, then name who is left disappointed by that and what they do about it — the price does not move on its own, and an answer that leaves out the people leaves out the mechanism.\n' + 'At a price below equilibrium the quantity demanded exceeds the quantity supplied (1 mark), so some buyers cannot obtain the good (1 mark). Those unsatisfied buyers bid the price up (1 mark), which extends the quantity supplied and contracts the quantity demanded until the gap closes (1 mark). An answer that describes the shortage without naming who acts on it has done half of the chain.'),
  pr(B2, 'Analyse', 6, 'Analyse the effect on the equilibrium price and quantity of rice of a poor harvest combined with rising incomes among consumers. (6 marks)',
    'Two changes, so take them one at a time and say which curve each one moves before saying anything about price. Then ask separately, for price and for quantity, whether the two shifts push the same way or against each other: one of the two will have a definite answer and the other will not, and saying which is which is the point of the question. Draw both shifts on one diagram before you write.\n' + 'Two shifts, each traced rather than named. A poor harvest shifts supply left (1 mark), raising price and reducing quantity (1 mark). Rising incomes shift demand right for a normal good (1 mark), raising price and increasing quantity (1 mark). Both push the price the SAME way, so the price definitely rises (1 mark); they push the quantity in OPPOSITE directions, so its direction depends on which shift is larger (1 mark). A diagram with both curves shifted supports the answer directly.'),
  pr(B3, 'Draw', 4, 'Draw a demand and supply diagram showing consumer surplus and producer surplus at the market equilibrium. (4 marks)',
    'Build the diagram in order and label as you go. Axes and both curves first, then the equilibrium, then the price line drawn ACROSS to the quantity traded — both areas are bounded by that line and by that quantity, so neither can be shaded correctly until both are on the page.\n' + 'Price on the vertical axis and quantity on the horizontal, both labelled, with a downward-sloping demand curve and an upward-sloping supply curve (1 mark). The equilibrium marked where they cross, with the price line drawn across to it and the quantity read off (1 mark). Consumer surplus shaded below the demand curve and above the price line (1 mark). Producer surplus shaded above the supply curve and below the price line (1 mark). Both areas must stop at the quantity traded; shading that runs past it is a different diagram.'),
  pr(B5, 'Calculate', 4, 'A specific tax of ' + money(TAX) + ' per unit raises the price buyers pay from ' + money(P_EQ) + ' to ' + money(TAXED.buyer) + ' and reduces the quantity traded from ' + qty(Q_EQ) + ' to ' + qty(TAXED.quantity) + ' units. Calculate the consumer incidence of the tax and the revenue the government collects. (4 marks)',
    'There are two prices in this market once the tax is on, and the first part of the question is about the movement in just one of them — decide which before you subtract anything. Then turn to the revenue, which is a rectangle: one side is the tax per unit and the other is a quantity, and the question gives you two quantities of which only one belongs there. Set out each stage on its own line so the workings stand up even if an arithmetic slip creeps in.\n' + 'Consumer incidence: ' + money(TAXED.buyer) + ' − ' + money(P_EQ) + ' = ' + money(TAXED.buyerShare) + ' per unit (1 mark), which is ' + pc(Math.round((TAXED.buyerShare / TAX) * 100)) + ' of the ' + money(TAX) + ' tax (1 mark). Revenue: ' + money(TAX) + ' × ' + qty(TAXED.quantity) + ' = ' + money(TAXED.government) + ' (1 mark), using the quantity traded AFTER the tax rather than the ' + qty(Q_EQ) + ' traded before it (1 mark). Appendix 6 defines Calculate as a calculation in several stages and advises showing workings, which is what allows the stages to be credited separately.'),
  pr(B6, 'Draw', 4, 'Draw a demand and supply diagram to show the effect of a specific subsidy of ' + money(SUBSIDY) + ' per unit on the price paid by consumers and the price received by producers. (4 marks)',
    'Work out what moves before drawing anything: a subsidy changes what sellers need FROM THE BUYER at each quantity, so one curve moves and the other does not. Then remember that a subsidised market has two prices rather than one and the question asks for both, so leave room on the price axis to mark them.\n' +
    'Price on the vertical axis and quantity on the horizontal, both labelled, with the original curves labelled D and S (1 mark). The supply curve shifted DOWN and to the right by the subsidy per unit, labelled separately (1 mark). The price the buyer pays and the higher price the seller receives both marked on the price axis, the vertical gap between them equal to the subsidy (1 mark). The new, higher equilibrium quantity read off to the horizontal axis (1 mark). Shifting the curve upward is the commonest error here: the curve records what sellers need from the buyer, and a subsidy reduces that.'),
  pr(B6, 'Examine', 8, 'Examine the effects of a subsidy on cooking fuel on consumers, producers and the government. (8 marks)',
    'The question names three parties, so the answer needs all three, and a subsidy diagram makes the first two almost read themselves off. Start with what the subsidy does to the supply curve, then take the two prices and the new quantity off the diagram before you say anything about who gains. Leave yourself room at the end: an Examine is not finished when the chain is.\n' + 'Appendix 6 defines Examine as requiring a chain of reasoning, diagrams where appropriate, interpretation of any data given, and a brief assessment of the arguments. The chain: the subsidy shifts supply down by the payment per unit, lowering the price buyers pay and raising what sellers receive, with the quantity traded rising. Consumers gain the fall in their price; producers gain the rise in theirs; the government pays the subsidy per unit across the larger quantity, so the cost rises with the policy\'s own success. The brief assessment should say which side captures more and why — the less responsive side does — and note the opportunity cost of the spending.'),
  pr(B4, 'Discuss', 14, 'Discuss how effectively the price mechanism allocates resources in local, national and global markets. (14 marks)',
    'Resist defining the three functions one after another. Take a single price change and follow it through all three, which is what shows they are one event rather than three. Then set the same mechanism at the three scales the question names and ask what actually differs between them — the reach of the signal and the pool of sellers who can answer it. Plan where your criticism goes before you start, because a Discuss weighs the arguments as well as making them.\n' + 'Appendix 6 defines Discuss as requiring logical and coherent chains of reasoning developed with reference to context, consideration of the validity and significance of the arguments, and a recognition of different viewpoints or a critical assessment of the evidence. The analysis should trace one change through rationing, incentive and signalling rather than defining each in turn, then set the same mechanism at the three scales: how far a signal travels, how large the pool of sellers who can answer it is, and how far a price must move before supply responds. The critical assessment has real material: a signal cannot distinguish a temporary disruption from a lasting change in demand; rationing by price allocates by ability to pay rather than by need; and the speed of response differs sharply between a local market and a global one. A judgement should say for which kind of market the mechanism works best and on what timescale.'),
  pr(B2, 'Evaluate', 20, 'Evaluate the view that changes in supply, rather than changes in demand, are the main cause of changes in the price of agricultural commodities. (20 marks)',
    'The view in the question is a comparison, so the answer has to be one: build the case for supply being the main cause, then the case against it, each as a chain rather than a list, and each applied to this kind of market rather than to markets in general. Decide early what your judgement will turn on — the time period, the scale of the market, or the relative size of the two shifts — because naming that condition is what separates an evaluated answer from a balanced one.\n' + 'Appendix 6 defines Evaluate as requiring multi-stage chains of reasoning developed with reference to context, consideration of the validity and significance of the arguments and concepts, and a recognition of different viewpoints so that informed judgements may be made. The case for the view: agricultural supply is strongly affected by weather, disease and the length of the growing season, and is hard to adjust within a season, so a supply shift moves price a long way while quantity changes little; the analysis should be developed with a diagram showing a leftward supply shift against a relatively unresponsive demand curve. The case against: demand for food changes with incomes, population and the prices of substitutes, and in some markets those shifts are the larger ones; where both curves move, the direction of the price depends on which shift dominates rather than on which curve is "the main cause". Evaluation should distinguish short-run from long-run responsiveness, note that the answer differs between a local market and a globally traded commodity, and reach a supported judgement that states the conditions under which it would change.'),
];

/* ══ Flashcards ═══════════════════════════════════════════════════════════
 * Eighteen, one per idea with a short answer. The March set carried price ceilings, price floors and
 * black markets (structure-09), which are 1.3.6 — and the specification does not use those words for
 * them in any case. They are gone; the freed slots went to the leaves that had nothing.
 */
const card = (front, back) => ({ id: id('flashcard', front), front, back });

export const FLASHCARDS = [
  card('What is equilibrium price?', 'The price at which quantity demanded equals quantity supplied, so the price has no tendency to change.'),
  card('What is equilibrium quantity?', 'The quantity bought and sold at the equilibrium price — here ' + qty(Q_EQ) + ' cylinders a day at ' + money(P_EQ) + '.'),
  card('What is excess demand?', 'The amount by which quantity demanded exceeds quantity supplied at a stated price, measured horizontally between the curves.'),
  card('What is excess supply?', 'The amount by which quantity supplied exceeds quantity demanded at a stated price, again measured horizontally.'),
  card('How is excess demand eliminated?', 'Unsatisfied buyers bid the price up, which extends the quantity supplied and contracts the quantity demanded until the gap closes.'),
  card('What does a demand shift do to price and quantity?', 'Moves them in the SAME direction: a rightward shift raises both, a leftward shift lowers both.'),
  card('What does a supply shift do to price and quantity?', 'Moves them in OPPOSITE directions: a rightward shift lowers the price and raises the quantity.'),
  card('If demand and supply both increase, what is certain?', 'The quantity traded rises. The price depends on which of the two shifts is larger.'),
  card('What is consumer surplus?', 'The difference between what buyers were willing to pay and what they paid, summed over all units — the area below demand and above the price.'),
  card('What is producer surplus?', 'The difference between what sellers received and the least they would have accepted — the area above supply and below the price.'),
  card('Why is producer surplus not the same as profit?', 'Profit deducts every cost the firm bears; producer surplus deducts only the minimum the seller needed to be willing to supply that unit.'),
  card('What happens to consumer surplus when demand increases?', 'It rises, because the area is measured against the new demand curve, which has moved up as well as right.'),
  card('Name the three functions of the price mechanism.', 'Rationing, incentive and signalling — one price movement seen from three angles, not three separate events.'),
  card('How does the price mechanism differ in a global market?', 'The mechanism is the same; the price is set by worldwide supply and demand, so a local disruption moves it far less and no single trader can influence it.'),
  card('What is the difference between a specific and an ad valorem tax?', 'A specific tax is a fixed sum per unit and shifts supply up in parallel; an ad valorem tax is a percentage of price, so the gap widens and the curve pivots.'),
  card('What is the incidence of a tax?', 'The share borne by each side, read off how far each price moved. The two shares always add to the tax per unit.'),
  card('Which side of the market bears more of a tax?', 'The side that responds less to price, because it has less room to escape the tax by trading less.'),
  card('How is government revenue from an indirect tax calculated?', 'Tax per unit × the quantity traded AFTER the tax — a rectangle on the diagram, sitting on the smaller post-tax quantity.'),
  card('What does a subsidy do to the supply curve and the two prices?', 'It shifts supply DOWN by the subsidy per unit: buyers pay ' + money(SUBSIDISED.buyer) + ', sellers receive ' + money(SUBSIDISED.seller) + ', and the quantity traded rises to ' + qty(SUBSIDISED.quantity) + '.'),
  card('How is the cost of a subsidy to the government calculated?', 'Subsidy per unit × the quantity traded AFTER the subsidy — a LARGER quantity than before, which is why a subsidy costs more than the same-sized tax raises.'),
];

/* ══ Common mistakes ══════════════════════════════════════════════════════
 * The March section had three good entries and `meta.mistakes: 0`, so none of them reached a student
 * (structure-09). All three are kept in substance; the fourth and fifth are the two errors this
 * packet's own arithmetic makes visible.
 */
const mistake = (title, looksLike, why, instead) => ({ id: id('mistake', title), title, looks_like: looksLike, why, instead });

export const MISTAKES = [
  mistake('Describing the position instead of the adjustment',
    'Writing "there is excess demand, so the price rises to equilibrium" and stopping there.',
    'IAL 1.3.4 · 1c asks for the operation of market forces, which means naming who acts and what happens to both quantities. The price does not rise by itself: unsatisfied buyers bid it up, and the gap then closes from both ends as supply extends and demand contracts.',
    'Name the disappointed side, say what they do, then trace the effect on BOTH quantities until the gap reaches zero.'),
  mistake('Measuring excess demand or supply vertically',
    'Marking the gap between the two curves as a vertical distance at one quantity.',
    'A vertical distance between the curves is a difference between PRICES. Excess demand and excess supply are differences between QUANTITIES, so they are measured horizontally along the stated price line.',
    'Draw the stated price as a horizontal line, then mark the gap along it between the supply curve and the demand curve.'),
  mistake('Shading the surplus triangles past the quantity traded',
    'Extending consumer or producer surplus out to where the curves meet the axes.',
    'Units beyond the equilibrium quantity are never bought or sold, so nobody gains anything on them. Both areas are bounded on the right by a vertical line through the quantity actually traded.',
    'Mark the equilibrium quantity first and stop both triangles there, before shading anything.'),
  mistake('Assuming a tax raises the price by the full amount of the tax',
    'Writing that a ' + money(TAX) + ' tax raises the price from ' + money(P_EQ) + ' to ' + money(P_EQ + TAX) + '.',
    'The price buyers pay rises by their share of the tax, not the whole of it — ' + money(TAXED.buyerShare) + ' here, with sellers absorbing ' + money(TAXED.sellerShare) + ' by accepting less. The full tax appears as the GAP between the two prices, never as the rise in one of them.',
    'Find the new equilibrium where the taxed supply curve meets demand, read off the price buyers pay, then subtract the tax to get what sellers keep.'),
  mistake('Using the wrong quantity for tax revenue or subsidy cost',
    'Calculating ' + money(TAX) + ' × ' + qty(Q_EQ) + ' for revenue, or ' + money(SUBSIDY) + ' × ' + qty(Q_EQ) + ' for the cost of a subsidy.',
    'A tax reduces the quantity it is collected on and a subsidy increases the quantity it is paid on. Revenue here is ' + money(TAXED.government) + ' on ' + qty(TAXED.quantity) + ' units, not ' + money(TAX * Q_EQ) + '; the subsidy costs ' + money(SUBSIDISED.government) + ' on ' + qty(SUBSIDISED.quantity) + ' units, not ' + money(SUBSIDY * Q_EQ) + '.',
    'Read the NEW quantity off the diagram before multiplying, and check the direction: a tax shrinks it, a subsidy grows it.'),
];

/* ══ Extras: chains and evaluation lines ══════════════════════════════════ */

export const EXTRAS = {
  chains: [
    {
      title: 'How excess demand removes itself',
      steps: [
        'The price sits below the equilibrium, so buyers want more than sellers offer.',
        'Unsatisfied buyers offer more in order to secure the good.',
        'The rising price extends the quantity supplied and contracts the quantity demanded.',
        'The two quantities meet, the gap reaches zero, and the price stops moving.',
      ],
      result: 'The market reaches equilibrium without anyone setting the price, because the disappointed side stops acting exactly when the disappointment ends.',
    },
    {
      title: 'A demand shift, traced to both surpluses',
      steps: [
        'Something other than price makes buyers want more at every price, so demand shifts right.',
        'The new equilibrium is where the new demand curve meets the unchanged supply curve.',
        'Price and quantity both rise — the signature of a demand shift rather than a supply one.',
        'Both surpluses are re-measured against the NEW demand curve and both are larger.',
      ],
      result: 'Consumer surplus rises from ' + money(CS) + ' to ' + money(DEMAND_RISE.cs) + ' despite the higher price, because the curve the area is measured from moved too.',
    },
    {
      title: 'One price movement, all three functions',
      steps: [
        'Demand rises and the price moves up: that movement is the signal.',
        'The higher price makes output worth supplying that was not worth supplying before: the incentive.',
        'The good goes to those willing to pay the new price: the rationing.',
      ],
      result: 'The three functions are one event described three ways, which is why a good answer traces a single change through all of them rather than defining each in turn.',
    },
    {
      title: 'Why a tax splits the way it does',
      steps: [
        'The tax drives a wedge between what the buyer pays and what the seller keeps.',
        'Each side escapes the tax the only way it can, by trading less.',
        'The side that can reduce its quantity least has least room to escape.',
        'That side absorbs the larger share of the wedge.',
      ],
      result: 'Incidence follows from responsiveness, so it can be reasoned out rather than memorised — and it explains why the split changes over a longer period.',
    },
    {
      title: 'Why a subsidy costs more than the same tax raises',
      steps: [
        'A tax shifts supply up, so the quantity traded falls to ' + qty(TAXED.quantity) + '.',
        'A subsidy of the same size shifts supply down, so the quantity rises to ' + qty(SUBSIDISED.quantity) + '.',
        'Each is charged or paid per unit on the quantity that results.',
      ],
      result: 'The same ' + money(TAX) + ' per unit raises ' + money(TAXED.government) + ' as a tax and costs ' + money(SUBSIDISED.government) + ' as a subsidy, because each policy moves the quantity it applies to in its own favour — and against the budget in the subsidy\'s case.',
    },
  ],
  evaluation: [
    {
      title: 'How far does the price mechanism allocate resources well?',
      points: [
        'It coordinates buyers and sellers who never meet, using a single number that costs nothing to read.',
        'It rations by willingness AND ability to pay, which is not the same as allocating by need.',
        'A price signal cannot distinguish a temporary disruption from a lasting change in demand, so it can draw investment into capacity that is not wanted.',
        'The wider the market, the faster supply answers a signal — which is why the same shock moves a local price far more than a global one.',
      ],
    },
    {
      title: 'Is an indirect tax a good way to raise revenue?',
      points: [
        'Revenue is largest where the tax changes behaviour least, so a tax that raises a lot is a tax that discourages little.',
        'A tax meant to discourage consumption and a tax meant to raise revenue pull in opposite directions; a policy should say which it is for.',
        'Incidence decides who actually pays, and it is not the side that remits the money.',
        'Responsiveness is usually greater over a longer period, so both the revenue and the split change as time passes.',
      ],
    },
    {
      title: 'Does a subsidy reach the people it is meant for?',
      points: [
        'Only the share captured by buyers shows up as a lower price — here ' + money(Math.abs(SUBSIDISED.buyerShare)) + ' of ' + money(SUBSIDY) + '.',
        'Where demand is highly responsive, most of a subsidy is captured by producers instead.',
        'The cost grows with the quantity, so a subsidy that succeeds becomes more expensive.',
        'A subsidised price is hard to withdraw once buyers have adjusted to it, which makes a temporary subsidy difficult to keep temporary.',
      ],
    },
  ],
};
