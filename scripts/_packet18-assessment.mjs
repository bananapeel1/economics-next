/**
 * PACKET 18 — the-market: quiz, practice, flashcards, common mistakes, extras.
 *
 * Quiz: 25 items, every one on material the Learn Mode body now teaches, 22 reachable through a
 * block's quizIndices and exactly three left unpinned — and those three FIRST in the array, because a
 * signed-out student is sent only PREVIEW_LIMITS.quiz items and PreTest.jsx slices whatever it is
 * given (packet 16). The March bank had 25 of which the wiring reached the wrong ones: quizIndices
 * were [0],[1],[2],[3],[4] while quiz[1] was a PED-and-revenue item sitting on the demand chapter
 * (structure-02). Two March items are dropped rather than rewritten: q14 asked for price elasticity
 * of SUPPLY, which returns zero hits in the entire Business specification (quiz-02), and q18 asserted
 * that revenue was unchanged at $20,000 when its own figures gave a different number, with an
 * unfinished sentence in the explanation (topFix-03).
 *
 * Practice: IAL BUSINESS command words and their own tariffs from Appendix 6, verified against
 * audit/raw/tariff-census.json — Define 2, Calculate 4, Construct 4, Explain 4, Analyse 6, Discuss 8,
 * Assess 10 (Units 1-2), Evaluate 20. All eight appear here. The March set had Define at 4
 * (practice-04), Explain at 6, Analyse at 10 (practice-03) and an "Outline" that is not an IAL command
 * word in either subject (practice-02, and the live `practice.command` BLOCK). CONSTRUCT is the one
 * this section has never had and most needed: "requires students to draw an accurately labelled
 * diagram" is exactly requirement 3b, in a section that shipped with no diagram at all.
 *
 * Guidance above 6 marks is levels-shaped and allocates no points (`practice.levels`).
 *
 * No item anywhere in this file uses "equilibrium", "excess demand", "excess supply", "movement
 * along", "extension" or "contraction": none of them is in the Business specification, and an
 * assessment item is where off-spec vocabulary does real damage, because a student who learns the
 * wrong word here will write it in an answer.
 */
import { id, money, pc, sig, minus, pedS, qdAt, qsAt, trAt, ped, pctQ, pctP, MEET_P, MEET_Q, PEAK_P, MAX_TR, PED_INELASTIC, PED_ELASTIC, PED_UNIT, INCOME_FROM, INCOME_TO, INCOME_RISE, PRESSE_Q, WATER_Q, MIX_Q, pctOf, YED_PRESSE, YED_WATER, YED_MIX } from './_packet18-util.mjs';
import { B1, B2, B3, B4, B5 } from './_packet18-content.mjs';
import { MEET_D2, MEET_S2, D_SHIFT, S_SHIFT } from './_packet18-diagrams.mjs';

/* ── quiz ──────────────────────────────────────────────────────────────────── */
// [block, stem, options in display order, index of the correct one, explanation, keptId?]
const Q = [
  /* ══ unpinned: the pre-test, FIRST in array order ══════════════════════════
   * PreTest.jsx takes the first three items no block has reserved, in array order (F079). They sit
   * FIRST because GET /api/sections/[id] caps a free or signed-out student's quiz at
   * PREVIEW_LIMITS.quiz since F086: with the unpinned items at the END, the items a free student
   * received were all PINNED, so the pre-test asked a question a chapter check-in asked again minutes
   * later. One from demand, one from the two curves together and one from elasticity, so the three
   * sample the whole section and none is a question a block shows again.
   */
  [null, 'A rise in the price of a good, with nothing else changing, causes:',
    ['A leftward shift of the demand curve', 'A fall in the quantity demanded of that good', 'A rightward shift of the demand curve', 'A fall in supply of that good'], 1,
    'The good\'s own price moves buyers to a different row of the schedule already drawn, so the quantity demanded falls. Demand itself shifts only when something other than the good\'s own price changes.'],
  [null, 'A fall in supply, with demand unchanged, causes the price to:',
    ['Rise, and the quantity traded to rise', 'Fall, and the quantity traded to rise', 'Rise, and the quantity traded to fall', 'Fall, and the quantity traded to fall'], 2,
    'Less is available at every price, so buyers move up an unchanged demand curve to a higher price and a smaller quantity. Price and quantity moving in opposite directions is the sign that supply was the cause rather than demand.'],
  [null, 'The income elasticity of demand for a product is −0.6. This product is:',
    ['A normal good with income elastic demand', 'A normal good with income inelastic demand', 'An inferior good', 'A complementary good'], 2,
    'A negative income elasticity of demand means quantity demanded falls as income rises, which is what defines an inferior good. Both normal cases carry a positive sign, and a complementary relationship is between two goods rather than a response to income.'],

  /* ══ Block 1 — Demand ══ */
  [B1, 'Demand for a good is the quantity buyers are:',
    ['Willing and able to buy at each price', 'Willing to buy at each price', 'Able to buy at each price', 'Hoping to buy during the year'], 0,
    'Both halves are required: demand is willingness backed by the ability to pay, stated at each price. Willingness alone is a wish, and ability alone says nothing about whether the buyer wants the good.'],
  [B1, 'The price of a complementary good rises. Demand for the original good will:',
    ['Fall, because the pair is bought together', 'Rise, because buyers move across to it', 'Stay the same, because its own price is unchanged', 'Rise, because the two are unrelated'], 0,
    'A complement is bought alongside the good, so fewer of the pair are bought when either becomes dearer and demand falls at every price. Buyers moving across is what happens when a substitute becomes dearer, which is the opposite relationship.'],
  [B1, `Incomes across a region rise and Maji's retailers now want ${D_SHIFT} more cases at every price. On a diagram this is shown as:`,
    ['A move up the existing demand curve', 'A move down the existing demand curve', 'A new supply curve drawn to the right of the old one', 'A new demand curve drawn to the right of the old one'], 3,
    'A change at every price cannot be shown on the curve already drawn, so a second demand curve goes to the right of the first. Moving along the existing curve would mean the good\'s own price had changed, and incomes are not the good\'s own price.'],
  [B1, 'Which of these is a factor leading to a change in demand named in the specification?',
    ['A change in the costs of production', 'The introduction of new technology', 'A government subsidy to producers', 'Seasonality'], 3,
    'Seasonality is the seventh of the demand factors: a swing that repeats on a known cycle, such as cold drinks selling more in the hot months. Costs of production, new technology and subsidies are all factors leading to a change in supply, which is a different list.'],
  [B1, 'A firm\'s successful advertising campaign is most likely to:',
    ['Raise demand and make buyers more willing to leave for a rival', 'Raise demand and make buyers less willing to leave for a rival', 'Lower demand and make buyers less willing to leave', 'Leave demand unchanged and lower the firm\'s costs'], 1,
    'Marketing aims at two effects at once: it raises demand at every price, and it makes buyers less willing to leave when the price rises. The second is often worth more to the firm, because it widens the range of prices it can charge.'],

  /* ══ Block 2 — Supply ══ */
  [B2, 'Supply for a good is the quantity producers are:',
    ['Holding in stock at the moment', 'Willing and able to sell at each price', 'Able to produce with their current machinery', 'Planning to produce next year'], 1,
    'Supply is willingness backed by the ability to sell, stated at each price, in the same shape as the definition of demand. Stock is what exists now, and goods nobody will pay an acceptable price for are not supply.'],
  [B2, 'The price of a key raw material rises sharply. The supply curve will:',
    ['Shift left, because fewer units are worth producing', 'Shift right, because the firm needs more revenue', 'Stay still, because the firm can raise its price', 'Become vertical at the current quantity'], 0,
    'A dearer input raises the cost of producing each unit, so the dearest units stop being worth making and less is supplied at every price, which is a leftward shift. The firm may try to raise its price, but the schedule itself has already moved.'],
  [B2, 'Which of these shifts the supply curve to the right?',
    ['A new indirect tax on the good', 'A rise in wages at the factory', 'A government subsidy paid on each unit', 'A strike at a key supplier'], 2,
    'A government subsidy is a payment per unit that takes cost away, so more becomes worth supplying at every price and the curve moves right. An indirect tax, a wage rise and a strike all add to cost or remove the ability to produce, and each moves it the other way.'],
  [B2, 'An indirect tax placed on a good affects the market by:',
    ['Shifting demand left, because the good costs buyers more', 'Shifting supply left, because supplying each unit costs more', 'Shifting demand right, because the government spends the revenue', 'Shifting supply right, because producers make more to cover it'], 1,
    'The tax lands on the cost of supplying each unit, so supply shifts left. Buyers then move along a demand curve that has not changed at all, which is why the shelf price rises without demand having moved.'],

  /* ══ Block 3 — Demand and Supply Together ══ */
  [B3, `At a price of ${money(10)}, Maji's retailers want ${qdAt(10)} cases and producers offer ${qsAt(10)}. This price is:`,
    ['Above the price at which the two are equal', 'The price at which the two are equal', 'Impossible to compare without more data', 'Below the price at which the two are equal'], 3,
    `Buyers want more than producers are offering, and that gap closes as the price rises, so ${money(10)} sits below the price at which the two quantities are the same. For Maji that price is ${money(MEET_P)}, where both schedules give ${MEET_Q} cases.`],
  [B3, 'On a demand and supply diagram, an increase in demand with supply unchanged leads to:',
    ['A higher price and a higher quantity traded', 'A higher price and a lower quantity traded', 'A lower price and a higher quantity traded', 'A lower price and a lower quantity traded'], 0,
    'The demand curve moves right along an unchanged supply curve, so both the price and the quantity traded end up higher. Producers are not offering more at each price; they are responding to the higher price by moving up the supply curve they already had.'],
  [B3, 'A market shows a rising price alongside a falling quantity traded. The cause was most likely:',
    ['An increase in demand', 'A decrease in demand', 'An increase in supply', 'A decrease in supply'], 3,
    'Price and quantity moving in opposite directions is the signature of a supply change, and a rising price with less traded means supply fell. Any demand change moves the two in the same direction, so neither demand answer fits the evidence.'],
  [B3, 'When drawing a diagram to show a shift, the original curve should be:',
    ['Rubbed out, so only the new position is shown', 'Kept and labelled, with the new curve beside it', 'Redrawn with the same label as the new curve', 'Replaced with a vertical line at the old quantity'], 1,
    'A shift is only visible against where the curve used to be, so the original is kept and labelled and the new curve is drawn beside it as D₂ or S₂. One curve in a new position, with nothing to compare it against, shows a student nothing.'],
  [B3, `A drought cuts Maji's supply by ${Math.abs(S_SHIFT)} cases at every price. The price moves from ${money(MEET_P)} to ${money(MEET_S2[0])} and the quantity traded from ${MEET_Q} to:`,
    [String(MEET_D2[1]), String(qdAt(10)), String(MEET_S2[1]), String(qsAt(20))], 2,
    `The new supply curve meets the unchanged demand curve at ${money(MEET_S2[0])}, where the quantity is ${MEET_S2[1]} cases. The price rose and the quantity traded fell, which is what a decrease in supply does and what tells you demand was not the cause.`],

  /* ══ Block 4 — Price Elasticity of Demand ══ */
  [B4, 'Price elasticity of demand is calculated as:',
    ['% change in price ÷ % change in quantity demanded', '% change in quantity demanded ÷ % change in price', '% change in quantity demanded ÷ % change in income', 'Change in quantity demanded ÷ change in price'], 1,
    'Quantity demanded goes on top and price underneath, and both are percentage changes taken from the original value. Putting income underneath measures the response to income instead, and using raw changes rather than percentages gives a figure that depends on the units.'],
  [B4, `Maji raises its price from ${money(PED_INELASTIC[0])} to ${money(PED_INELASTIC[1])} and weekly sales fall from ${qdAt(PED_INELASTIC[0])} cases to ${qdAt(PED_INELASTIC[1])}. Price elasticity of demand is:`,
    [pedS(...PED_INELASTIC), pedS(...PED_ELASTIC), pedS(...PED_UNIT), '−0.2'], 0,
    `Quantity changed by ${pc(pctQ(...PED_INELASTIC))} and price by ${pc(pctP(...PED_INELASTIC))}, so dividing one by the other gives ${pedS(...PED_INELASTIC)}. The size is below 1, so demand is price inelastic over this range and the sign simply records that the two moved in opposite directions.`],
  [B4, 'Demand for a product has a price elasticity of demand of −2.5. A rise in its price will:',
    ['Lower total revenue, because quantity falls proportionately more', 'Raise total revenue, because the price is higher', 'Leave total revenue unchanged, because the effects cancel', 'Lower total revenue, because the price is higher'], 0,
    'A size above 1 means demand is price elastic, so quantity demanded falls proportionately more than the price rose and total revenue falls. The extra earned on each unit sold is outweighed by the units that are no longer sold.'],
  [B4, 'Which of these makes demand for a product more price inelastic?',
    ['Many close substitutes appear on the same shelf', 'The product takes a large share of a buyer\'s income', 'Several years pass after the price rise', 'Buyers develop strong loyalty to the brand'], 3,
    'Brand loyalty stops buyers treating rivals as real alternatives, so fewer of them leave when the price rises and demand becomes less responsive. Close substitutes, a large share of income and the passage of time all make it easier to go elsewhere, which pushes the other way.'],
  [B4, `Maji's total revenue is ${money(trAt(20))} at a price of ${money(20)} and ${money(trAt(25))} at ${money(25)}. Over this range, demand is:`,
    ['Price inelastic, because revenue fell', 'Price elastic, because revenue fell when the price rose', 'Unitary, because revenue barely moved', 'Perfectly inelastic, because some buyers stayed'], 1,
    `Revenue and price moved in opposite directions, which happens when demand is price elastic — here the value is ${pedS(...PED_ELASTIC)}. Price inelastic demand would have raised revenue alongside the price, and unitary demand would have left it at its highest, ${money(MAX_TR)}.`],

  /* ══ Block 5 — Income Elasticity of Demand ══ */
  [B5, `Incomes in Maji's region rise ${pc(INCOME_RISE)} and sales of its powdered mix fall from ${MIX_Q[0]} cases to ${MIX_Q[1]}. Income elasticity of demand is:`,
    [sig(YED_PRESSE()), sig(YED_WATER()), sig(YED_MIX()), '−4'], 2,
    `Quantity changed by ${pc(pctOf(MIX_Q))} and income by ${pc(INCOME_RISE)}, so the income elasticity of demand is ${sig(YED_MIX())}. The negative sign classifies the powdered mix as an inferior good: buyers leave it as soon as they can afford something they prefer.`],
  [B5, 'Which of these makes a product\'s income elasticity of demand sit closest to zero?',
    ['It is bought for pleasure rather than out of need', 'It is a necessity households buy whatever happens', 'It is bought only to save money', 'It is heavily advertised by its maker'], 1,
    'A necessity is bought in much the same quantity whatever incomes do, so its income elasticity of demand sits close to zero. Goods bought for pleasure swing hardest of all, and a good bought only to economise carries a negative value rather than one near zero.'],
  [B5, 'Why might a business deliberately keep an inferior good in its range?',
    ['Because inferior goods are always the most profitable', 'Because it has no competitors', 'Because its demand never changes', 'Because its sales hold up when incomes fall'], 3,
    'An inferior good sells more when incomes fall, so it steadies the firm in exactly the years its income elastic products struggle. The purpose of knowing income elasticity of demand is balance across the cycle rather than choosing one kind of product.'],
];

export const QUIZ = Q.map(([block, question, options, correctIndex, explanation, keptId]) => ({
  id: keptId || id('quiz', question), block, question, options, correctIndex, explanation,
}));

/* ── practice ──────────────────────────────────────────────────────────────── */
// [block, command, marks, question, guidance, keptId?]
const P = [
  [B1, 'Define', 2, 'Define the term \'demand\'. (2 marks)',
    'Two things, one sentence: the quantity buyers are willing AND able to buy, at a given price over a period of time. "How much people want" is not enough — it drops the ability to pay, which is the half that makes demand something a business can sell into. An example is application and belongs in a 4-mark Explain; Define carries 2 marks in IAL Business (WBS11 Appendix 6).'],
  [B1, 'Discuss', 8, 'Discuss whether marketing is the most important factor influencing demand for a soft drinks producer. (8 marks)',
    'Levels-marked: the quality of the chain from knowledge to application to analysis decides the level, not the number of points made. Knowledge: the specification names seven factors leading to a change in demand, of which marketing, advertising and branding is the only one the firm controls. Application: use the producer in the extract — its brand, its market, its rivals. Analysis: marketing shifts demand at every price and makes buyers less willing to leave when prices rise, which widens the range of prices available. Then weigh it against the factors it cannot control: a cheaper substitute, an income shock, a change in tastes towards low-sugar drinks, a season that does not arrive. A judgement that says "most important, in this market, for this reason" is what a Discuss is for.'],
  [B2, 'Explain', 4, 'Explain two factors that could cause a fall in the supply of bottled drinks. (4 marks)',
    'Two of the five the specification names — changes in the costs of production, the introduction of new technology, indirect taxes, government subsidies, external shocks — each joined to the fall by a reason. A rise in the cost of aluminium: the cost of producing each case rises, so the dearest cases stop being worth making and less is supplied at every price. A new duty on bottled drinks: the producer hands over part of what it receives, which raises the cost of supplying each unit in exactly the same way. Do not offer a fall in the price of the drinks themselves — that moves quantity supplied along the curve and answers a question about supply with the thing supply changes are contrasted with.'],
  [B3, 'Construct', 4, 'Construct a demand and supply diagram to show the effect on the market for bottled drinks of a drought that damages the fruit harvest. (4 marks)',
    `A drought is an external shock to supply, so the supply curve shifts left and demand does not move. The diagram needs: price on the vertical axis and quantity on the horizontal, both labelled with units; a downward-sloping D and an upward-sloping S₁; a second curve S₂ drawn to the LEFT of S₁; an arrow showing the direction; and dashed guides reading off the new, higher price and the new, lower quantity. Keep S₁ on the page — a shift is only visible against where the curve was. Construct requires an accurately labelled diagram (WBS11 Appendix 6), so the labels are the answer rather than decoration, and this section's chapter diagram is drawn to exactly this pattern.`],
  [B4, 'Calculate', 4, `The demand schedule in this chapter's diagram gives Maji's weekly sales at each price. Using the ${money(PED_ELASTIC[0])} and ${money(PED_ELASTIC[1])} rows — ${qdAt(PED_ELASTIC[0])} cases and ${qdAt(PED_ELASTIC[1])} cases — calculate the price elasticity of demand and state what it shows. (4 marks)`,
    `Show the formula, both percentages and the signed answer. Percentage change in quantity demanded = (${qdAt(PED_ELASTIC[1])} − ${qdAt(PED_ELASTIC[0])}) ÷ ${qdAt(PED_ELASTIC[0])} × 100 = ${minus(pctQ(...PED_ELASTIC))}%. Percentage change in price = (${PED_ELASTIC[1]} − ${PED_ELASTIC[0]}) ÷ ${PED_ELASTIC[0]} × 100 = ${pctP(...PED_ELASTIC)}%. Dividing one by the other gives ${pedS(...PED_ELASTIC)}, so demand is price elastic at this price and the rise has cost Maji revenue. Take both figures from the same two rows and measure each percentage against the row you started from; dividing by the NEW quantity is the commonest error. Workings should be given for a Calculate (WBS11 Appendix 6).`],
  [B4, 'Assess', 10, 'Assess the importance of price elasticity of demand to a business deciding whether to raise its prices. (10 marks)',
    `Levels-marked and judged on the chain, not on the number of points. Knowledge: price elasticity of demand is the percentage change in quantity demanded divided by the percentage change in price, and the size against 1 says whether a price rise raises or lowers total revenue. Application: use the firm's own figures from the extract. Analysis: if demand is price inelastic the rise brings in more, as ${money(trAt(PED_INELASTIC[0]))} becoming ${money(trAt(PED_INELASTIC[1]))} shows; if it is price elastic the rise costs revenue. Then assess what the value leaves out — it is measured from past data, it assumes nothing else changes, a rival is free to respond, elasticity itself changes as the firm moves up its own curve, and revenue is not profit. A judgement that names the condition under which the price rise is right is what raises the level. Assess carries 10 marks in Units 1 and 2 (WBS11 Appendix 6).`],
  [B5, 'Analyse', 6, `Analyse the significance of income elasticity of demand to a drinks producer whose products have values of ${sig(YED_PRESSE())}, ${sig(YED_WATER())} and ${sig(YED_MIX())}. (6 marks)`,
    `Developed reasoning rather than a list. Start from what the three values say: ${sig(YED_PRESSE())} is a normal good with income elastic demand, ${sig(YED_WATER())} is normal but income inelastic, and ${sig(YED_MIX())} is an inferior good. Then take that somewhere. A forecast of falling incomes becomes a forecast of falling pressé sales, proportionately more than incomes fall, while the powdered mix gains — so stock, shelf space and promotion move between them before the downturn rather than after it. One chain taken from a value through to a decision is worth more than three classifications stated and left.`],
  [B5, 'Evaluate', 20, 'Evaluate whether a drinks producer should concentrate its range on products with income elastic demand. (20 marks)',
    `Levels-marked and judged on the weighing. Build the case: income elastic products grow proportionately faster than incomes, so in a region with rising incomes they are where the growth is, and concentrating means a clearer brand and simpler production. Then the other side. The same elasticity works in reverse, so a downturn hits the whole range at once with nothing steadying it; an inferior good in the range sells MORE in those years; income elasticity of demand is estimated from past data with everything else assumed constant; and the value differs between groups of buyers, so one figure will not cover every region the firm sells in. Bring in what else moves demand — a change in tastes towards low-sugar drinks can overwhelm any income effect. Reach a judgement that depends on something nameable: how likely incomes are to keep rising, and how much of a downturn the firm could survive. Supporting it from the extract rather than restating both sides is what separates the top level.`],
];

export const PRACTICE = P.map(([block, command, marks, question, guidance, keptId]) => ({
  id: keptId || id('practice', question), block, command, marks, question, guidance,
}));

/* ── flashcards ────────────────────────────────────────────────────────────── */
// Cards are rewritten in place and never deleted while the concept survives, because progress rows
// point at them (the packet-13 rule). Cards carrying "extension", "contraction" or "equilibrium" are
// rewritten rather than dropped: the concept underneath each one is on the specification, and only
// the off-spec word for it goes (specGap-06, structure-09).
const card = (front, back) => ({ id: id('card', `${front}|${back}`), front, back });

export const FLASHCARDS = [
  card('What is demand?', 'The quantity buyers are <strong>willing and able</strong> to buy at each price over a period of time. Both halves are required: wanting a good you cannot afford is not demand a business can sell into.'),
  card('What is the difference between a change in quantity demanded and a change in demand?', 'A change in <strong>quantity demanded</strong> comes from the good\'s <strong>own price</strong> and is a different row of the same schedule. A change in <strong>demand</strong> comes from any other factor and replaces the schedule at <strong>every</strong> price.'),
  card('Name the seven factors leading to a change in demand.', 'Changes in the prices of <strong>substitutes and complementary goods</strong>; changes in <strong>consumer incomes</strong>; <strong>fashions, tastes and preferences</strong>; <strong>marketing, advertising and branding</strong>; <strong>demographics</strong>; <strong>external shocks</strong>; <strong>seasonality</strong>.'),
  card('How do the prices of substitutes and complements move demand?', 'A <strong>substitute</strong> is bought instead, so its price and your demand move the <strong>same</strong> way. A <strong>complement</strong> is bought alongside, so its price and your demand move in <strong>opposite</strong> directions.'),
  card('Why is demographics two effects in one factor?', '<strong>Size</strong> changes how many buyers there are, so demand shifts for most goods. <strong>Make-up</strong> changes what the same number of buyers want — an ageing population moves demand between products with no extra people at all.'),
  card('What is the difference between an external shock and seasonality?', 'A <strong>shock</strong> is sudden and unforeseen, so a business can only react to it. <strong>Seasonality</strong> repeats on a known cycle, so it appears in the plan before it appears in the sales figures. Both shift demand at every price.'),
  card('What is supply?', 'The quantity producers are <strong>willing and able</strong> to sell at each price over a period of time. The curve slopes <strong>upward</strong> because a higher price covers the cost of producing extra units.'),
  card('Name the five factors leading to a change in supply.', 'Changes in the <strong>costs of production</strong>; the introduction of <strong>new technology</strong>; <strong>indirect taxes</strong>; <strong>government subsidies</strong>; <strong>external shocks</strong>. Every one works through what a unit costs to produce.'),
  card('How do an indirect tax and a subsidy differ in their effect on supply?', 'An <strong>indirect tax</strong> adds to the cost of supplying each unit, so supply shifts <strong>left</strong>. A <strong>subsidy</strong> takes cost away, so supply shifts <strong>right</strong>. The same lever, pulled in opposite directions.'),
  card('What does the interaction of demand and supply settle?', 'One price, at which the quantity buyers want and the quantity producers offer are the <strong>same</strong>. Below it buyers compete for a quantity that is not there; above it stock goes unsold. Only there does neither side have a reason to move.'),
  card('What must be labelled on a demand and supply diagram?', 'Both <strong>axes</strong> with their units, both <strong>curves</strong> at the end of each line, and the <strong>price and quantity</strong> where they meet, read off with dashed guides. A Construct is answered by its labels.'),
  card('What happens to price and quantity when demand increases?', 'Both <strong>rise</strong>. The demand curve moves right along an unchanged supply curve, and producers respond to the higher price by moving up the supply curve they already had.'),
  card('What happens to price and quantity when supply decreases?', 'Price <strong>rises</strong> and quantity traded <strong>falls</strong> — opposite directions. That pattern runs backwards too: a rising price beside a falling quantity can only have come from the supply side.'),
  card('What is price elasticity of demand (PED)?', 'The responsiveness of quantity demanded to a change in the good\'s <strong>own price</strong>: <strong>PED = % change in quantity demanded ÷ % change in price</strong>. Normally negative, because the two move in opposite directions.'),
  card('Name the five values of price elasticity of demand.', '<strong>Perfectly price elastic</strong> (infinite); <strong>price elastic</strong> (size above 1); <strong>unitary price elastic</strong> (exactly 1); <strong>price inelastic</strong> (size between 0 and 1); <strong>perfectly price inelastic</strong> (0).'),
  card('How do you interpret a PED value?', 'Set the <strong>sign</strong> aside and compare the <strong>size</strong> with 1. Above 1, demand is price elastic and buyers are responsive. Below 1, it is price inelastic and they are not. The sign only records that price and quantity moved opposite ways.'),
  card('Name the factors influencing price elasticity of demand.', '<strong>Availability of substitutes</strong>; <strong>branding and loyalty</strong>; whether the good is a <strong>necessity</strong>; the <strong>share of income</strong> it takes; and <strong>time</strong>. Every one works by making it easier or harder to go elsewhere.'),
  card('How does time change price elasticity of demand?', 'The longer a price change lasts, the <strong>more elastic</strong> demand becomes, because buyers find and switch to substitutes they did not have at first. A firm that priced on the short-run response can be surprised by the long-run one.'),
  card('What is the relationship between PED and total revenue?', '<strong>Price inelastic</strong>: price and total revenue move <strong>together</strong>. <strong>Price elastic</strong>: they move in <strong>opposite</strong> directions. <strong>Unitary</strong>: total revenue is at its maximum.'),
  card('How do you calculate total revenue, and why is it not profit?', '<strong>Total revenue = price × quantity sold</strong>, before any cost is taken off. Profit is what survives the costs, so the price that brings in the most money is not necessarily the one that leaves the most.'),
  card('What does PED mean for a firm\'s pricing?', 'Inelastic: a price <strong>rise</strong> raises revenue, and most of a cost increase can be passed on. Elastic: a price <strong>cut</strong> does, and the firm absorbs cost increases or loses the volume.'),
  card('What is income elasticity of demand (YED)?', 'The responsiveness of quantity demanded to a change in <strong>income</strong>: <strong>YED = % change in quantity demanded ÷ % change in income</strong>. Read the <strong>sign</strong> before the size.'),
  card('What is the difference between a normal good and an inferior good?', 'A <strong>normal</strong> good has a <strong>positive</strong> YED — bought more as incomes rise. An <strong>inferior</strong> good has a <strong>negative</strong> YED — bought less, because buyers move to what they now afford. It is about the income response, not the quality.'),
  card('How do you interpret a YED value?', '<strong>Sign first</strong>: positive is normal, negative is inferior. <strong>Size second</strong>, against 1: above 1 is income elastic, between 0 and 1 is income inelastic, and 0 is perfectly income inelastic.'),
  card('Name the factors influencing income elasticity of demand.', 'Whether the good is a <strong>necessity</strong>; whether it is bought for <strong>pleasure or status</strong>; whether a <strong>preferred alternative</strong> exists; and the <strong>income of the buyers</strong> being measured — the same good can be elastic for one group and not another.'),
  card('Why does a business want both income elastic and income inelastic products?', 'Income elastic products grow fastest in good years and are the most exposed in bad ones. Income inelastic and inferior products <strong>hold the firm up</strong> in a downturn. The point of knowing YED is <strong>balance across the cycle</strong>.'),
];

/* ── common mistakes ───────────────────────────────────────────────────────── */
const mistake = (title, mistakeText, correction, examTip) => ({
  id: id('mistake', title), title, mistake: mistakeText, correction, examTip,
});

export const MISTAKES = [
  mistake('Saying Demand Rose When the Price Fell',
    'Students write "demand increased" when a price cut raised sales. A fall in the good\'s own price cannot change demand.',
    'The good\'s own price moves buyers to a different row of the schedule already drawn, so what rose is the quantity demanded. Only one of the seven other factors — a related price, incomes, tastes, marketing, demographics, a shock, the season — changes demand, because only those change the quantity wanted at every price.',
    'Name the cause before the effect. If the cause is this good\'s price, write "quantity demanded" and draw one curve; if it is anything else, write "demand" and draw two.'),
  mistake('Moving Both Curves When Only One Changed',
    'Students redraw demand and supply together whenever anything happens, so the diagram can be made to show any answer at all.',
    'Check which list the cause is on. If it is one of the seven demand factors, supply stays exactly where it is, and the rise in quantity supplied is the proof: producers moved along the curve they already had. If it is one of the five supply factors, demand does not move and buyers do the same thing in reverse.',
    'Say out loud which curve is moving and why before drawing anything. A diagram with both curves moved cannot show a clear consequence, so it cannot support the analysis that follows it.'),
  mistake('Using the Wrong Subject\'s Vocabulary',
    'Students import words from Economics — market clearing, excess demand, excess supply — into a Business answer, and lose the thread of what the question asked.',
    'This specification asks for the interaction of demand and supply, and for the causes and consequences of changes in demand and supply. Those are the words to use: the price at which the quantity wanted and the quantity offered are the same, and what happens to price and quantity when one of the curves moves.',
    'Answer in the language of the question. Describing the mechanism — buyers competing when there is not enough, sellers accepting less when stock is unsold — is always safe, and needs no borrowed term at all.'),
  mistake('Dropping the Sign, or Forgetting What It Is For',
    'Students report PED as a positive number, or report YED without its sign, treating the two elasticities the same way.',
    'PED is normally negative because price and quantity move in opposite directions, and it is the SIZE that is compared with 1. YED is the opposite case: the sign is the answer, because it is what separates a normal good from an inferior one.',
    'Write PED with its minus sign and then compare its size with 1. For YED, state the sign first, classify the good, and only then discuss the size.'),
  mistake('Calling Demand Inelastic Without Saying at What Price',
    'Students describe a firm\'s demand as elastic or inelastic as though it were a fixed property of the product.',
    `Elasticity is a measurement at a price. On Maji's own demand curve it is ${pedS(...PED_INELASTIC)} starting from ${money(PED_INELASTIC[0])}, ${pedS(...PED_UNIT)} starting from ${money(PED_UNIT[0])} and ${pedS(...PED_ELASTIC)} starting from ${money(PED_ELASTIC[0])} — one product, three answers. It changes with the time period too, because buyers find substitutes when a price change lasts.`,
    'Say at which price, and over what period, the value was measured. "Inelastic, therefore raise the price as far as you like" has a limit built into it that a good answer states.'),
  mistake('Treating Total Revenue as Profit',
    'Students recommend the revenue-maximising price as though it were the profit-maximising one.',
    `Total revenue is price times quantity, before any cost is taken off. A lower price that sells more cases brings in more revenue and also costs more to make and deliver. Maji's revenue peaks at ${money(PEAK_P)} — ${money(MAX_TR)} — and the price that leaves the most is a different question.`,
    'An Assess or an Evaluate on a price change should say that revenue is one side of the decision and the cost of the extra units is the other, then judge on both.'),
  mistake('Assuming an Inferior Good Is a Poor-Quality One',
    'Students classify a good as inferior because it looks cheap or basic, rather than from how its demand responds to income.',
    'Inferiority is a statement about the income response and nothing else: demand falls as income rises. Coach travel is inferior because people leave it when they can afford to fly, not because coaches are bad, and the same good can be inferior in one region and normal in another.',
    'Classify from the YED value in the extract, not from the product. If no value is given, say which way demand moved as incomes moved and derive the classification from that.'),
  mistake('Using a Past Elasticity as a Prediction',
    'Students calculate a PED or a YED and recommend a decision as though the value guaranteed the outcome.',
    'Every elasticity is measured from past data, with everything else held constant. Real markets do not hold still: a rival can answer a price rise with a price cut, tastes can move, and a new substitute can appear. The value narrows the sensible options rather than choosing between them.',
    'An Evaluate (20 marks, WBS11 Appendix 6) is judged on the weighing. Make the elasticity case, name the assumptions it rests on, then give a judgement that depends on which of them holds.'),
];

/* ── extras ────────────────────────────────────────────────────────────────── */
/*
 * All four March chains belonged to a different section: market research, market segmentation and
 * market size and growth are 1.3.1, not 1.3.2 (structure-04). These four are 1.3.2's own, and three
 * of them are the sources the `reorder` recalls paraphrase (`reorder.source` needs a flow or a chain
 * in the section that teaches the same sequence in the same order).
 */
export const EXTRAS = {
  chains: [
    {
      title: 'How a cost rise reaches the supply curve',
      steps: [
        'The price of a key raw material rises.',
        'The cost of producing each case goes up.',
        'Some cases are no longer worth producing at the current price.',
        'Less is supplied at every price and the curve shifts left.',
      ],
      result: 'A supply shift is a decision about the marginal unit, repeated at every price on the schedule',
    },
    {
      title: `How an increase in demand moves price and quantity`,
      steps: [
        'Incomes across the region rise.',
        `Buyers want ${D_SHIFT} more cases at every price, so demand shifts right to D₂.`,
        'D₂ meets the unchanged supply curve at a higher price.',
        `Price rises from ${money(MEET_P)} to ${money(MEET_D2[0])} and quantity from ${MEET_Q} to ${MEET_D2[1]} cases.`,
      ],
      result: 'When demand is the cause, price and quantity move in the SAME direction',
    },
    {
      title: 'How a supply shock moves price and quantity',
      steps: [
        'A drought destroys much of the region\'s fruit harvest.',
        'Producers can supply far less at every price.',
        'The supply curve shifts left while demand is unchanged.',
        `Price rises from ${money(MEET_P)} to ${money(MEET_S2[0])} and quantity falls from ${MEET_Q} to ${MEET_S2[1]} cases.`,
      ],
      result: 'When supply is the cause, price and quantity move in OPPOSITE directions — which is how a diagram names the cause',
    },
    {
      title: 'How a price change becomes a PED value',
      steps: [
        `Maji raises its price from ${money(PED_INELASTIC[0])} to ${money(PED_INELASTIC[1])}, a rise of ${pctP(...PED_INELASTIC)}%.`,
        `Weekly sales fall from ${qdAt(PED_INELASTIC[0])} cases to ${qdAt(PED_INELASTIC[1])}, a fall of ${Math.abs(pctQ(...PED_INELASTIC))}%.`,
        `Dividing the quantity percentage by the price percentage gives PED = ${pedS(...PED_INELASTIC)}.`,
        'A size below 1 means quantity moved proportionately less than price: price inelastic demand.',
      ],
      result: `Total revenue therefore rises from ${money(trAt(PED_INELASTIC[0]))} to ${money(trAt(PED_INELASTIC[1]))} a week, which is what price inelastic demand promises`,
    },
    {
      title: 'How one income rise sorts a product range',
      steps: [
        `Incomes rise from ${money(INCOME_FROM)} to ${money(INCOME_TO)}, a rise of ${pc(INCOME_RISE)}.`,
        `Sparkling pressé sales rise ${pc(pctOf(PRESSE_Q))}, giving a YED of ${sig(YED_PRESSE())} — normal, income elastic.`,
        `Still water sales rise ${pc(pctOf(WATER_Q))}, giving ${sig(YED_WATER())} — normal, income inelastic.`,
        `Powdered mix sales fall ${pc(pctOf(MIX_Q))}, giving ${sig(YED_MIX())} — an inferior good.`,
      ],
      result: 'One income change, three classifications, and a range that behaves differently in every part of the cycle',
    },
  ],
};
