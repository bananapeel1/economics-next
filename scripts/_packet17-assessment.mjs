/**
 * PACKET 17 — consumer-behaviour-demand: quiz, practice, flashcards, common mistakes, extras.
 *
 * Quiz: 32 items, every one on material the Learn Mode body now teaches, 29 reachable through a
 * block's quizIndices and exactly three left unpinned — and those three FIRST in the array, because
 * a signed-out student is sent only PREVIEW_LIMITS.quiz items and PreTest.jsx slices whatever it is
 * given (packet 16). The March bank had 25 of which 8 were reachable (structure-04). One March item
 * is dropped rather than rewritten: q21 defined consumer surplus, which is not a leaf of 1.3.2 and
 * appears once in the whole Economics specification, in a competition topic.
 *
 * Practice: IAL ECONOMICS command words and their own tariffs from Appendix 6 — Define 2,
 * Calculate 2/4, Draw 4, Explain 4, Analyse 6, Examine 8, Discuss 14, Evaluate 20. There is no
 * Assess and no 10-mark tariff in this subject, so topFix-02's "Assess 10/12" is the Business ladder
 * and is not built; "Outline" does not exist in either subject and the March Outline (4) is
 * re-commanded. All five March ids are kept. Guidance above 6 marks is levels-shaped and allocates
 * no points.
 */
import { id, money, qAt, trAt, ped, MU, totalUtility, MID_P, MID_Q, MAX_TR, PED_INELASTIC, PED_ELASTIC, INCOME_RISE, COACH_YQ, AIR_YQ, RICE_YQ, yed, AIR_FARE_RISE, COACH_XQ, XED_SUBSTITUTE, XED_COMPLEMENT } from './_packet17-util.mjs';
import { B1, B2, B3, B4, B5, B6 } from './_packet17-content.mjs';

/* ── quiz ──────────────────────────────────────────────────────────────────── */
// [block, stem, options in display order, index of the correct one, explanation, keptId?]
const Q = [
  /* ══ unpinned: the pre-test, FIRST in array order ══════════════════════════
   * PreTest.jsx takes the first three items no block has reserved, in array order (F079). They sit
   * FIRST because GET /api/sections/[id] caps a free or signed-out student's quiz at
   * PREVIEW_LIMITS.quiz (2) since F086: with the unpinned items at the END, the two a free student
   * received were both PINNED, so the pre-test asked a question a chapter check-in asked again
   * minutes later. One item from the demand curve, one from PED and one from YED, so the three
   * sample the whole section and none is a question a block shows again.
   */
  [null, 'A fall in the price of a good, with nothing else changing, causes:',
    ['A rightward shift of the demand curve', 'An extension in quantity demanded along the curve', 'A leftward shift of the demand curve', 'A fall in demand at every price'], 1,
    'The good\'s own price moves the buyer along the curve that is already drawn: price falls, so quantity demanded extends. A curve shifts only when something other than the good\'s own price changes.'],
  [null, 'If demand for a product is price inelastic, a firm wishing to increase total revenue should:',
    ['Raise the price, because quantity falls proportionally less', 'Cut the price, because quantity rises proportionally more', 'Leave the price where it is, because revenue cannot change', 'Cut the price, because revenue always rises with volume'], 0,
    'Inelastic demand means quantity moves proportionally less than price, so raising the price loses fewer units than the higher price gains. Price and total revenue move together whenever the size of PED is below 1.',
    'consumer-behaviour-demand:quiz:0562be5e'],
  [null, 'The income elasticity of demand (YED) for a good is −0.6. This good is:',
    ['A luxury', 'A necessity', 'An inferior good', 'A complement'], 2,
    'A negative YED means quantity demanded falls as real income rises, which is the definition of an inferior good. Both luxuries and necessities have positive values; a complement is a relationship between two goods, which XED measures rather than YED.',
    'consumer-behaviour-demand:quiz:a81ced2c'],

  /* ══ Block 1 — Rational Decision Making ══ */
  [B1, 'Economics assumes that a firm pursues which objective?',
    ['Maximising profit', 'Maximising the number of units it produces', 'Maximising the utility of its customers', 'Maximising its share of the market'], 0,
    'The assumption of rationality in decision making gives consumers the aim of maximising utility and firms the aim of maximising profit. Output, market share and customer satisfaction may follow from pursuing profit, but they are not the objective the model assigns.'],
  [B1, 'According to the law of diminishing marginal utility, as a consumer eats more slices of pizza:',
    ['Total utility falls with each slice eaten', 'Each extra slice adds less satisfaction than the one before', 'Marginal utility rises and then falls', 'Total and marginal utility both rise together'], 1,
    'Diminishing marginal utility is about the addition each extra unit makes, and that addition falls. Total utility keeps rising while those additions are positive, so it does not fall, and it rises by a smaller amount each time rather than in step with marginal utility.',
    'consumer-behaviour-demand:quiz:546b5731'],
  [B1, `A traveller values her first, second and third trips of the month at ${money(MU[0])}, ${money(MU[1])} and ${money(MU[2])}. At a fare of ${money(MU[1])} she takes:`,
    ['One trip', 'Two trips', 'Three trips', 'Four trips'], 1,
    `She takes a trip while its marginal utility is at least the fare. The first is worth ${money(MU[0])} and the second ${money(MU[1])}, so both clear a fare of ${money(MU[1])}; the third is worth only ${money(MU[2])}, which is below it.`],
  [B1, 'A consumer keeps renewing an expensive gym membership they rarely use, knowing a cheaper option exists. This is best described as:',
    ['Herding', 'Habitual behaviour', 'Inertia', 'Poor computational skills'], 2,
    'Inertia is the reason that fits: the better option is known and the buyer still does not move to it, because switching costs attention now for a gain spread over months. Habit would mean the choice was never examined at all.',
    'consumer-behaviour-demand:quiz:a2efc186'],
  [B1, 'A shopper buys the phone brand most of their friends have bought, treating that as evidence it is worth having. This is:',
    ['Framing and bias', 'The need to feel valued', 'Poor computational skills', 'Herding'], 3,
    'Herding is the influence of other people\'s behaviour: what everyone else is doing is used as information about what is worth doing. Framing would need the same offer to be described in two ways, and the need to feel valued is about the signal a purchase sends rather than about following others.'],

  /* ══ Block 2 — The Demand Curve ══ */
  [B2, 'Demand for a good means the quantity consumers are:',
    ['Willing and able to buy at each price', 'Willing to buy at each price', 'Able to buy at each price', 'Hoping to buy over the year'], 0,
    'Both halves are needed: demand is willingness backed by the ability to pay, stated at each price. Willingness on its own is a wish, and ability on its own says nothing about whether the buyer wants the good.'],
  [B2, 'According to the law of demand, a rise in the price of a good leads to a fall in quantity demanded. This is shown on a diagram as:',
    ['A movement up along the existing demand curve', 'A shift of the demand curve to the left', 'A shift of the demand curve to the right', 'A movement of the supply curve'], 0,
    'A change in the good\'s own price moves the buyer to a different point on the curve already drawn, upward and to the left. Drawing a second curve would say that quantity demanded had changed at every price, which a price change cannot do.',
    'consumer-behaviour-demand:quiz:ed2f2ddd'],
  [B2, 'Why does an individual demand curve slope downward?',
    ['Because firms cut prices when they want to sell more', 'Because incomes rise over time', 'Because there are always substitutes available', 'Because marginal utility diminishes, so willingness to pay falls'], 3,
    'Each extra unit adds less satisfaction, so the most the buyer will pay for it falls, so the extra unit is bought only at a lower price. That chain from diminishing marginal utility to willingness to pay is what gives the curve its shape.'],
  [B2, 'Which of the following would cause a leftward shift of the demand curve for butter?',
    ['A rise in the price of butter', 'A rise in consumer incomes', 'A fall in the price of bread', 'A fall in the price of margarine'], 3,
    'Margarine is a substitute, so a cheaper margarine takes buyers away from butter at every price and shifts butter\'s curve left. Butter\'s own price would move the buyer along the curve instead, and cheaper bread is a complement, which would shift the curve the other way.',
    'consumer-behaviour-demand:quiz:e572c5fb'],
  [B2, 'A leftward shift of the demand curve for a normal good could be caused by:',
    ['A rise in real incomes', 'An advertising campaign for the good', 'A fall in real incomes', 'A rise in the price of a substitute'], 2,
    'For a normal good, demand moves in the same direction as real income, so falling real incomes shift the curve left. Rising incomes, advertising and a dearer substitute would each shift it right.',
    'consumer-behaviour-demand:quiz:bd27c703'],
  [B2, 'A country\'s population stays the same size but the share of people over 65 rises sharply. For a firm selling hearing aids this is:',
    ['A movement along its demand curve', 'A rightward shift caused by a change in tastes', 'A rightward shift caused by the age distribution of the population', 'No change, because the population has not grown'], 2,
    'The specification names changes in the size AND age distribution of the population as a shift factor, and here it is the age structure that has moved. Nobody\'s tastes changed and the total number of people is unchanged, yet more of them now want the product at every price.'],

  /* ══ Block 3 — Price Elasticity of Demand ══ */
  [B3, 'A firm finds that when it raises the price of its product by 10%, quantity demanded falls by 5%. Its PED is:',
    ['−2.0, so demand is price elastic', '−0.5, so demand is price inelastic', '−5.0, so demand is price elastic', '−0.5, so demand is price elastic'], 1,
    'PED is the percentage change in quantity demanded divided by the percentage change in price: −5 ÷ 10 = −0.5. A size below 1 means quantity moved proportionally less than price, which is price inelastic demand.',
    'consumer-behaviour-demand:quiz:28db500e'],
  [B3, 'The price elasticity of demand for a good is calculated as −0.4. This means the good has:',
    ['Price inelastic demand', 'Perfectly price inelastic demand', 'Unitary price elastic demand', 'Price elastic demand'], 0,
    'The size of −0.4 is between 0 and 1, so quantity demanded moves proportionally less than price: price inelastic demand. A value of exactly 0 would mean no response at all, and exactly 1 would mean the two percentages matched.',
    'consumer-behaviour-demand:quiz:c1327fec'],
  [B3, 'At the midpoint of a straight-line demand curve, PED is equal to:',
    ['Zero', 'Less than one in size', 'One', 'Infinity'], 2,
    'A straight line runs through every value: its size is above 1 above the midpoint and below 1 below it, passing through exactly 1 at the midpoint itself. That is also the price at which total revenue is at its maximum.',
    'consumer-behaviour-demand:quiz:ada8a4f2'],
  [B3, 'A demand curve drawn as a horizontal line shows demand that is:',
    ['Perfectly price inelastic', 'Unitary price elastic', 'Price inelastic', 'Perfectly price elastic'], 3,
    'A horizontal curve means buyers take any quantity at that one price and none above it, so the response is unlimited: perfectly price elastic demand. The vertical line is the opposite case, where quantity does not respond at all.'],
  [B3, 'Which of the following is the most likely reason for cigarettes having price inelastic demand?',
    ['They take a large share of a smoker\'s income', 'They are addictive, so buyers cannot readily do without them', 'They are heavily advertised in most countries', 'They are a durable product that can be stored'], 1,
    'Addictiveness of product is one of the five factors the specification names, and it works by removing the buyer\'s ability to do without the good. A large share of income would push the other way, towards elastic demand.',
    'consumer-behaviour-demand:quiz:1e018e71'],
  [B3, 'Which of the following would make demand for a product more price elastic?',
    ['The firm builds a brand buyers ask for by name', 'The product becomes addictive', 'The product takes a smaller share of income', 'More close substitutes become available'], 3,
    'More close substitutes make switching easier, so quantity responds more strongly to a price change. Branding, addictiveness and a tiny share of spending all work the other way, by removing the alternative or the reason to look for one.',
    'consumer-behaviour-demand:quiz:752e3762'],
  [B3, 'Which of the following best explains why demand for salt is price inelastic?',
    ['Salt is a durable product', 'Salt is heavily branded by its producers', 'Salt takes a very small share of a household\'s spending', 'Salt has many close substitutes'], 2,
    'A good taking a tiny share of spending is barely noticed when its price rises, so quantity demanded hardly moves. Close substitutes would make demand elastic instead, and salt is neither branded in the way that matters here nor bought as a durable.',
    'consumer-behaviour-demand:quiz:d1f094f1'],

  /* ══ Block 4 — Total Revenue and Pricing Decisions ══ */
  [B4, `Tafari sells ${qAt(12)} tickets a day at a fare of ${money(12)}. Its total revenue a day is:`,
    [money(trAt(12)), money(720), money(trAt(10)), money(MAX_TR)], 0,
    `Total revenue is price multiplied by quantity sold: ${money(12)} × ${qAt(12)} = ${money(trAt(12))}. The quantity on its own is not revenue, and the other figures are the takings at different fares on the same curve.`],
  [B4, 'A business finds that when it raises the price of its product by 10%, total revenue increases. This shows that demand is:',
    ['Price elastic', 'Unitary price elastic', 'Perfectly price elastic', 'Price inelastic'], 3,
    'Price and total revenue moving together is the signature of price inelastic demand: quantity fell proportionally less than the price rose. Had demand been elastic, the volume lost would have outweighed the higher price.',
    'consumer-behaviour-demand:quiz:40eaae0b'],
  [B4, 'If the PED for a good is exactly −1.0, a 5% increase in price will:',
    ['Leave total revenue unchanged', 'Raise total revenue by 5%', 'Lower total revenue by 5%', 'Lower total revenue by 10%'], 0,
    'Unitary price elastic demand means quantity falls by the same percentage as the price rises, so the two effects cancel and the takings are where they were. That point on the curve is also where total revenue is at its maximum.',
    'consumer-behaviour-demand:quiz:64bd9d02'],

  /* ══ Block 5 — Income and Cross Elasticity of Demand ══ */
  [B5, 'A product has a YED of +2.5. This means the good is:',
    ['An inferior good, bought less as income rises', 'A necessity, with income inelastic demand', 'A luxury, with income elastic demand', 'A good unrelated to income'], 2,
    'A positive value above 1 means demand rises proportionally more than income does, which is income elastic demand and describes a luxury. A value between 0 and 1 would make it a necessity, and a negative value would make it inferior.',
    'consumer-behaviour-demand:quiz:8b7c2740'],
  [B5, `Real incomes rise by ${INCOME_RISE}% and quantity demanded of a good falls by ${Math.abs(COACH_YQ)}%. Its YED is:`,
    ['+0.5', `${yed(COACH_YQ)}`, '−2.0', '+2.0'], 1,
    `YED is the percentage change in quantity demanded divided by the percentage change in real income: ${COACH_YQ} ÷ ${INCOME_RISE} = ${yed(COACH_YQ)}. Dropping the minus sign would hide the one thing the value is for, which is telling a normal good from an inferior one.`,
    'consumer-behaviour-demand:quiz:8d3a6fae'],
  [B5, `If the price of coffee rises by ${AIR_FARE_RISE + 5}% and quantity demanded of tea rises by ${COACH_XQ}%, the XED of tea with respect to coffee is:`,
    ['+0.4, so they are substitutes', '−0.4, so they are complements', '+2.5, so they are close substitutes', '+2.5, so they are complements'], 0,
    'XED is the percentage change in quantity demanded of tea divided by the percentage change in the price of coffee: 6 ÷ 15 = +0.4. A positive value means buyers moved from one good to the other, so the two are substitutes.',
    'consumer-behaviour-demand:quiz:cc4701c1'],
  [B5, 'The cross elasticity of demand between Good A and Good B is −1.8. This indicates that:',
    ['They are close substitutes', 'They are unrelated goods', 'Good A is an inferior good', 'They are strong complements'], 3,
    'A negative XED means a dearer B is met by less of A being bought, which happens when the two are consumed together, and a size of 1.8 makes the pairing a strong one. Whether a good is inferior is a question about income, which YED answers.',
    'consumer-behaviour-demand:quiz:0ebc96c5'],
  [B5, 'Which value of XED would show that two goods are unrelated?',
    ['+2.5', '+0.6', '0.0', '−0.4'], 2,
    'A value at or near zero means a price change in the other good leaves demand for this one where it was, so the two sit in separate markets. Positive values mean substitutes and negative values mean complements, at whatever strength the size gives.',
    'consumer-behaviour-demand:quiz:20ab46ce'],

  /* ══ Block 6 — The Significance of Elasticities ══ */
  [B6, 'A government imposes an indirect tax on a good with price elastic demand. Compared with taxing a good with inelastic demand, it will:',
    ['Raise more revenue and change behaviour less', 'Raise less revenue and change behaviour more', 'Raise more revenue and change behaviour more', 'Raise the same revenue with the same effect on behaviour'], 1,
    'Elastic demand means the quantity falls sharply, so there is less left to tax and more behaviour changed. The inelastic good is the reliable revenue raiser precisely because buyers keep buying it.',
    'consumer-behaviour-demand:quiz:92b694c4'],
  [B6, 'A firm wants to know which of its product lines will grow fastest as the economy grows. Which elasticity should it use?',
    ['PED', 'YED', 'XED', 'None of them, because growth is unrelated to elasticity'], 1,
    'Income elasticity of demand measures the response of quantity demanded to a change in real income, which is what growth in an economy delivers. PED is about the firm\'s own price and XED is about the price of another good.'],
  [B6, 'A household\'s demand for a good is highly price inelastic. When the price of that good rises, the household:',
    ['Switches to a substitute and pays little of the rise', 'Stops buying the good altogether', 'Sees its real income rise', 'Pays most of the rise, because it has nowhere else to go'], 3,
    'Inelastic demand means there is no close alternative, so the buyer absorbs nearly all of the increase rather than moving away from it. Having substitutes is what gives a household the option of switching and keeps the burden off it.'],
];

export const QUIZ = Q.map(([block, question, options, correctIndex, explanation, keptId]) => ({
  id: keptId || id('quiz', question), block, question, options, correctIndex, explanation,
}));

/* ── practice ──────────────────────────────────────────────────────────────── */
// IAL ECONOMICS tariffs only (econ_spec.txt:2704-2747): Define 2, Calculate 2/4, Draw 4, Explain 4,
// Analyse 6, Examine 8, Discuss 14, Evaluate 20. Every block carries at least one item, and the
// indices are authored against the RAW practice array, which is what LearnModeTab.jsx resolves pins
// against since packet 2 (structure-01).
const P = [
  [B1, 'Define', 2, 'Define the term \'utility\'. (2 marks)',
    'Two things, one sentence: utility is the satisfaction a consumer gains from consuming a good, and it is what a rational consumer is assumed to be maximising. "Usefulness" is not enough — it misses the consumer whose satisfaction it is. An example is application and belongs in a 4-mark Explain; the command here is Define, which is 2 marks in IAL Economics (WEC11 Appendix 6).'],
  [B1, 'Explain', 4, 'Explain two reasons why a consumer may not aim to maximise utility. (4 marks)',
    'Two of the six the specification names — herding, habitual behaviour, inertia, poor computational skills, the need to feel valued, framing and bias — each developed rather than listed. For each: name it, say what the buyer does instead of comparing costs and benefits, and give the consequence. Inertia, for instance: the buyer knows a cheaper tariff exists, switching costs attention now for a gain spread over months, so the default continues and the firm keeps a customer it would lose to a comparison. Naming four reasons and developing none answers a different command.'],
  [B2, 'Explain', 4, 'Explain two causes of a rightward shift in the demand curve for electric vehicles. (4 marks)',
    'Two causes from the five the specification names, each joined to the shift by a reason. A rise in real incomes: electric vehicles are a normal good, so buyers who could not previously afford one now can, and more are demanded at every price. A rise in the price of petrol vehicles: a dearer substitute sends buyers towards the alternative at every price. Do not offer a fall in the price of electric vehicles — that is a movement along the curve, and it answers a question about shifts with an example of the thing shifts are contrasted with.',
    'consumer-behaviour-demand:practice:69c1e33b'],
  [B2, 'Draw', 4, 'Draw a demand diagram to show the effect on the market for coach travel of a fall in the price of air travel on the same route. (4 marks)',
    'Air travel is a substitute, so its price fall shifts the demand curve for coach travel to the left. The diagram needs: price on the vertical axis and quantity demanded on the horizontal, both labelled; a downward-sloping D1; a second curve D2 drawn to the left of it; an arrow showing the direction; and the new, lower quantity read off at the unchanged coach fare. Reading the new quantity at the original price is what shows the shift had an effect, and a Draw is 4 marks in IAL Economics (WEC11 Appendix 6).'],
  [B3, 'Define', 2, 'Define the term \'price elasticity of demand\' (PED). (2 marks)',
    'The responsiveness of quantity demanded to a change in the price of the good itself, measured as the percentage change in quantity demanded divided by the percentage change in price. That is the whole definition. Explaining what elastic and inelastic mean is interpretation, and it belongs in the 4-mark question that follows rather than here; the phrase "greater than 1" also needs the words "in size", because PED is normally negative. Define is 2 marks in IAL Economics (WEC11 Appendix 6), not 4.',
    'consumer-behaviour-demand:practice:3b14f765'],
  [B3, 'Calculate', 4, `A coach operator raises its fare from ${money(PED_ELASTIC[0])} to ${money(PED_ELASTIC[1])}. Daily ticket sales fall from ${qAt(PED_ELASTIC[0])} to ${qAt(PED_ELASTIC[1])}. Calculate the price elasticity of demand and state what it shows. (4 marks)`,
    `Show the formula, both percentages and the signed answer. Percentage change in quantity demanded = (${qAt(PED_ELASTIC[1])} − ${qAt(PED_ELASTIC[0])}) ÷ ${qAt(PED_ELASTIC[0])} × 100 = ${Math.round(((qAt(PED_ELASTIC[1]) - qAt(PED_ELASTIC[0])) / qAt(PED_ELASTIC[0])) * 100)}%. Percentage change in price = (${PED_ELASTIC[1]} − ${PED_ELASTIC[0]}) ÷ ${PED_ELASTIC[0]} × 100 = ${Math.round(((PED_ELASTIC[1] - PED_ELASTIC[0]) / PED_ELASTIC[0]) * 100)}%. PED = ${ped(...PED_ELASTIC)}, so demand is price elastic at this fare and the operator has lost revenue by raising it. Dividing by the NEW quantity is the commonest error; workings should be given for a Calculate (WEC11 Appendix 6).`],
  [B3, 'Analyse', 6, 'Analyse two factors that influence the price elasticity of demand for a branded soft drink. (6 marks)',
    'Two of the five named factors, each taken to a consequence for the firm. Availability of substitutes: many near-identical drinks sit on the same shelf, so a price rise sends buyers to one of them and demand is elastic. Branding: the firm has attached an expectation to its name, so some buyers stop treating those drinks as substitutes at all, which pulls the other way and makes demand less elastic. A good answer says which force is stronger for this product and why, rather than naming both and leaving them side by side. Percentage of total expenditure, addictiveness and durability are the remaining three.',
    'consumer-behaviour-demand:practice:3f666102'],
  [B4, 'Calculate', 4, `A coach operator sells ${qAt(PED_INELASTIC[0])} tickets a day at ${money(PED_INELASTIC[0])} and ${qAt(PED_INELASTIC[1])} a day at ${money(PED_INELASTIC[1])}. Calculate total revenue at each fare and state which fare a revenue-maximising operator should choose. (4 marks)`,
    `Total revenue = price × quantity sold. At ${money(PED_INELASTIC[0])}: ${PED_INELASTIC[0]} × ${qAt(PED_INELASTIC[0])} = ${money(trAt(PED_INELASTIC[0]))} a day. At ${money(PED_INELASTIC[1])}: ${PED_INELASTIC[1]} × ${qAt(PED_INELASTIC[1])} = ${money(trAt(PED_INELASTIC[1]))} a day. The higher fare brings in more, which tells you demand is price inelastic over this range. Give the units and the period — revenue a day and revenue a year are different figures from the same multiplication — and remember that revenue is not profit, so a revenue-maximising fare is not automatically the one to recommend.`],
  [B5, 'Examine', 8, 'Examine the significance of income elasticity of demand for a supermarket group planning for a period of falling real incomes. (8 marks)',
    'Levels-marked: the quality of the chain from knowledge to application to analysis decides the level, not the number of points. Knowledge: YED is the percentage change in quantity demanded divided by the percentage change in real income, and its sign separates normal from inferior goods. Application: use the group\'s own ranges from the extract — premium lines with income elastic demand, own-brand basics that behave as inferior goods. Analysis: falling real incomes cut demand for the income elastic lines proportionally more than incomes fell, while demand for the inferior lines rises, so shelf space, promotion and stock should move towards the basics before the downturn arrives rather than after it. Examine expects the limits too: YED estimates come from past data, and everything else is assumed constant.',
    'consumer-behaviour-demand:practice:0cdc49a5'],
  [B6, 'Evaluate', 20, 'Evaluate whether a government should place an indirect tax on a good with price inelastic demand. (20 marks)',
    'Levels-marked and judged on the weighing. Build the case: inelastic demand means quantity barely falls when the tax raises the price, so the receipts arrive reliably year after year, and a diagram showing a steep demand curve with the tax raising the price and quantity falling only slightly supports it. Then the other side. If the aim is to change behaviour rather than to raise money, the same inelasticity is what makes the tax fail: buyers keep buying. Equity is the second counter — a tax on an inelastic necessity takes a larger share of a low income than a high one, so the most reliable revenue tax is also the most regressive. Third, XED warns where buyers may go: an untaxed substitute or an untaxed border erodes both aims. Reach a judgement that names the objective the government is pursuing, because the answer changes with it, and support it from the extract rather than restating both sides.',
    'consumer-behaviour-demand:practice:9a655728'],
];

export const PRACTICE = P.map(([block, command, marks, question, guidance, keptId]) => ({
  id: keptId || id('practice', question), block, command, marks, question, guidance,
}));

/* ── flashcards ────────────────────────────────────────────────────────────── */
// Cards are rewritten in place and never deleted while the concept survives: the ids are stable and
// progress rows point at them (the packet-13 rule). Seventeen March cards keep theirs. ONE is
// repurposed rather than dropped — `2c8dafd9` defined consumer surplus, which is not a leaf of 1.3.2
// and appears once in the entire Economics specification, in a competition topic; the id now carries
// the six reasons a consumer may not maximise utility, which this chapter does teach. Ten new cards
// cover what this packet adds: economic agents, total against marginal utility, the five PED values,
// the factors, PED along a straight line, total revenue, and the three audiences of 3j.
const kept = (cid, front, back) => ({ id: `consumer-behaviour-demand:card:${cid}`, front, back });
const card = (front, back) => ({ id: id('card', `${front}|${back}`), front, back });

export const FLASHCARDS = [
  card('Who are the three economic agents, and what does economics assume each one maximises?', '<strong>Consumers</strong> maximise <strong>utility</strong>. <strong>Firms</strong> maximise <strong>profit</strong>. The <strong>government</strong> is assumed to act for society as a whole. That is the assumption of rationality in decision making.'),
  kept('d76fa7d9', 'What is diminishing marginal utility?', 'As a consumer takes more of a good in a period, the satisfaction added by each <strong>extra</strong> unit falls. Total utility still rises while those additions are positive — it is the size of each addition that shrinks.'),
  card('What is the difference between total utility and marginal utility?', '<strong>Total utility</strong> is the satisfaction from everything consumed so far. <strong>Marginal utility</strong> is the satisfaction added by one more unit. A buyer decides on the marginal figure, never the total.'),
  kept('2c8dafd9', 'Name the six reasons the specification gives for why consumers may not aim to maximise utility.', 'The influence of other people\'s behaviour (<strong>herding</strong>); <strong>habitual behaviour</strong>; <strong>inertia</strong>; <strong>poor computational skills</strong>; the <strong>need to feel valued</strong>; and <strong>framing and bias</strong>.'),
  card('What is the difference between habitual behaviour and inertia?', '<strong>Habit</strong> repeats a choice without re-examining it — no comparison happens at all. <strong>Inertia</strong> declines to act on a comparison already made: the better option is known and the buyer still does not switch.'),
  kept('fc64e9a3', 'What is effective demand?', 'Demand backed by the <strong>ability to pay</strong>. Wanting a good you cannot afford is not demand: a market only responds to willingness that comes with the money behind it.'),
  kept('9137f2b4', 'State the law of demand.', 'As the price of a good rises, the quantity demanded of it falls, all other things being equal — and as the price falls, quantity demanded rises. It is why the demand curve slopes downward.'),
  card('Why does the individual demand curve slope downward?', 'Because <strong>marginal utility diminishes</strong>: each extra unit adds less satisfaction, so the most the buyer will pay for it falls, so the extra unit is bought only at a lower price.'),
  kept('f9ec13b7', 'What causes a movement along the demand curve?', 'A change in the good\'s <strong>own price</strong>, and nothing else. A price fall gives an <strong>extension</strong> in quantity demanded; a price rise gives a <strong>contraction</strong>. The curve itself does not move.'),
  kept('1dbb10d6', 'Name the five factors that may cause a shift in the demand curve.', 'Changes in the price of <strong>substitutes or complementary goods</strong>; changes in <strong>real income</strong>; changes in <strong>tastes</strong>; changes in <strong>size and age distribution of the population</strong>; and <strong>advertising</strong>.'),
  card('Why are the size and the age distribution of a population two different shift factors?', '<strong>Size</strong> changes how many buyers there are. <strong>Age distribution</strong> changes what the same number of buyers want: an ageing population raises demand for healthcare with no extra people at all.'),
  kept('f7eed50d', 'What is price elasticity of demand (PED)?', 'The responsiveness of quantity demanded to a change in the good\'s own price: <strong>PED = % change in quantity demanded ÷ % change in price</strong>. Normally negative, because the two move in opposite directions.'),
  card('Name the five PED values in the specification.', '<strong>Perfectly price elastic</strong> (infinite, horizontal); <strong>price elastic</strong> (size above 1); <strong>unitary price elastic</strong> (exactly 1); <strong>price inelastic</strong> (size between 0 and 1); <strong>perfectly price inelastic</strong> (0, vertical).'),
  kept('c7263e10', 'What does a PED greater than 1 in size mean?', 'Demand is <strong>price elastic</strong>: quantity demanded moves proportionally more than price. A price rise therefore <strong>lowers</strong> total revenue, and a price cut raises it.'),
  kept('ccca3da3', 'What does a PED less than 1 in size mean?', 'Demand is <strong>price inelastic</strong>: quantity demanded moves proportionally less than price. A price rise therefore <strong>raises</strong> total revenue, and a price cut lowers it.'),
  kept('4d2706c9', 'Name the five factors influencing price elasticity of demand.', '<strong>Availability of substitutes</strong>; <strong>branding</strong>; <strong>percentage of total expenditure</strong>; <strong>addictiveness of product</strong>; <strong>durability of product</strong>. Every one works by changing how easily a buyer can switch or postpone.'),
  card('How does branding change price elasticity of demand?', 'A brand attaches an expectation to a name, so buyers stop treating rivals as substitutes even when the products are alike. Demand becomes <strong>less elastic</strong>, which is what the spending on branding buys.'),
  card('How does PED vary along a straight-line demand curve?', 'Demand is <strong>price elastic above the midpoint</strong>, <strong>unitary at it</strong> and <strong>price inelastic below it</strong>. The slope is constant; elasticity is not, because elasticity compares proportions and the proportions change.'),
  card('How do you calculate total revenue?', '<strong>Total revenue = price × quantity sold.</strong> It is the money coming in before any cost is taken off, so it is not profit. Give the units and the period: revenue a day and revenue a year are different figures.'),
  kept('4efad12c', 'How does PED affect a firm\'s pricing decision?', 'Inelastic demand: <strong>raise</strong> the price, because quantity falls proportionally less than price rises. Elastic demand: <strong>cut</strong> it, because the extra quantity more than replaces the revenue given up per unit.'),
  kept('446bab00', 'What happens to total revenue when price rises and demand is price elastic?', 'It <strong>falls</strong>. Quantity demanded drops proportionally more than the price rose, so the units lost outweigh the extra earned on each unit sold. Revenue and price move in opposite directions.'),
  card('At what point on a demand curve is total revenue at its maximum?', 'Where <strong>PED = 1</strong>. Above that price demand is elastic, so cutting the price raises revenue; below it demand is inelastic, so raising the price does. At the midpoint the two effects cancel.'),
  kept('9bdbbfc0', 'What is income elasticity of demand (YED)?', 'The responsiveness of quantity demanded to a change in <strong>real income</strong>: <strong>YED = % change in quantity demanded ÷ % change in real income</strong>. Read the sign before the size.'),
  kept('f00dfbb5', 'What is a normal good?', 'A good whose demand <strong>rises</strong> as real income rises, so YED is <strong>positive</strong>. Above 1 it is income elastic — a luxury; between 0 and 1 it is income inelastic — a necessity.'),
  kept('1b1d8431', 'What is an inferior good?', 'A good whose demand <strong>falls</strong> as real income rises, so YED is <strong>negative</strong>. It is about the income response, not the quality: bus travel is inferior because people leave it when they can afford to.'),
  kept('95ed3f14', 'What does a YED greater than 1 indicate?', 'Demand is <strong>income elastic</strong>: it rises proportionally more than income does. The good is a <strong>luxury</strong>, which grows fast in good years and falls fast in bad ones.'),
  kept('22da96e9', 'What is cross elasticity of demand (XED)?', 'The responsiveness of demand for good A to a change in the price of good B: <strong>XED = % change in quantity demanded of A ÷ % change in the price of B</strong>. Keep A on top.'),
  kept('cd5ec54d', 'What is the difference between a substitute and a complement?', 'A <strong>substitute</strong> is bought instead, so XED is <strong>positive</strong>. A <strong>complement</strong> is bought alongside, so XED is <strong>negative</strong>. A value near zero means the two goods are <strong>unrelated</strong>.'),
  card('Why does the SIZE of an XED value matter, not just its sign?', '+0.1 and +3 are both positive and mean different things. A large value means buyers move between the two goods almost one for one, so a rival\'s price change must be answered; a small one means it can be watched.'),
  card('What does elasticity mean for a consumer, rather than a firm?', 'It decides <strong>who carries a price rise</strong>. A buyer with no substitute has inelastic demand and absorbs nearly all of it; a buyer with alternatives can move, and the threat of moving holds the price down.'),
  card('Why can a tax not both raise revenue and change behaviour well?', 'Revenue needs <strong>inelastic</strong> demand, so the quantity stays to be taxed. Behaviour change needs <strong>elastic</strong> demand, so buyers leave. The same good cannot be both, which is why the objective has to be named first.'),
];

/* ── common mistakes ───────────────────────────────────────────────────────── */
// The four March ids are kept and rewritten. `d6510341` was titled "Ignoring the conditions of
// demand": the phrase appears ZERO times in the IAL Economics specification — it is AQA vocabulary
// (specGap-02) — so the id now carries the straight-line error, which is a real one this topic
// produces. Every examTip here says what the COMMAND WORD requires, never what a marker does.
const mistake = (cid, title, mistakeText, correction, examTip) => ({
  id: cid ? `consumer-behaviour-demand:mistake:${cid}` : id('mistake', title), title, mistake: mistakeText, correction, examTip,
});

export const MISTAKES = [
  mistake('22514608', 'Confusing a Movement Along With a Shift',
    'Students write "demand increased" when a price fall raised sales. A fall in the good\'s own price causes a movement along the curve, not a shift of it.',
    'The good\'s own price moves the buyer along the curve already drawn: an extension when price falls, a contraction when it rises. Only a non-price factor — a related price, real income, tastes, population, advertising — moves the whole curve, because only those change quantity demanded at every price.',
    'Name the cause before you name the effect. If the cause is this good\'s price, say "quantity demanded" and draw one curve; if it is anything else, say "demand" and draw two.'),
  mistake('d1bfd973', 'Dropping the Sign, or Forgetting What It Is For',
    'Students report PED as a positive number, or report YED without its sign, treating the two elasticities the same way.',
    'PED is normally negative because price and quantity move in opposite directions, and it is the SIZE that is compared with 1. YED is the opposite case: the sign is the answer, because it is what separates a normal good from an inferior one. XED works like YED — the sign names the relationship.',
    'Write PED with its minus sign and then compare its size with 1. For YED and XED, state the sign first, classify the good or the relationship, and only then discuss the size.'),
  mistake('51fcc0d3', 'Calling a Good Inelastic Without Saying at What Price',
    'Students describe a firm\'s demand as elastic or inelastic as though it were a fixed property of the product.',
    'Elasticity is a measurement at a point. On a straight-line demand curve it is elastic above the midpoint, unitary at it and inelastic below — one curve, every value. It also changes with the time period, because buyers find substitutes when a price change lasts.',
    'Say at which price, and over what period, the value was measured. A Draw asks for the midpoint marked and the two ranges labelled, which is the same point made on a diagram.'),
  mistake('d6510341', 'Reading a Constant Slope as a Constant Elasticity',
    'Students see one straight demand curve and conclude it has one PED all the way down, because the slope does not change.',
    'Slope compares absolute changes; elasticity compares proportional ones. Near the top the price is high and the quantity small, so a dollar off is a small percentage of the price and wins a large percentage of a small quantity. Near the bottom the same dollar is a large percentage of a low fare and wins a small percentage of a large quantity.',
    'The only straight lines with one elasticity throughout are the two extremes: the vertical curve, which is perfectly price inelastic, and the horizontal one, which is perfectly price elastic.'),
  mistake(null, 'Treating Total Revenue as Profit',
    'Students recommend the revenue-maximising price as though it were the profit-maximising one.',
    'Total revenue is price times quantity, before any cost is taken off. A lower price that fills more seats brings in more revenue and also costs more to serve. Profit is what survives the costs, and the two maxima are not at the same price unless serving the extra units is free.',
    'An Evaluate on a price change should say explicitly that revenue is one side of the decision and the cost of the extra units is the other, then judge on both.'),
  mistake(null, 'Assuming an Inferior Good Is a Poor-Quality One',
    'Students classify a good as inferior because it looks cheap or basic, rather than from how its demand responds to income.',
    'Inferiority is a statement about the income response and nothing else: demand falls as real income rises. Bus travel is inferior because people leave it when they can afford a car, not because buses are bad. The same good can be inferior in one country and normal in another.',
    'Classify from the YED value in the extract, not from the product. If no value is given, say which way demand moved as incomes moved and derive the classification from that.'),
  mistake(null, 'Listing the Factors Without the Mechanism',
    'Students name substitutes, branding, share of income, addictiveness and durability and stop, as though the list were the analysis.',
    'Every one of the five works through the same thing: how easily the buyer can switch to something else or postpone the purchase. A factor named without that link has not explained anything, and the question is always about the consequence for the firm\'s price.',
    'Two developed factors beat five named ones. Take each one to substitutability, then to what the firm can therefore do with its price, then to the revenue that follows.'),
  mistake(null, 'Using a Past Elasticity as a Prediction',
    'Students calculate a PED and recommend a price rise as though the value guaranteed the outcome.',
    'Every elasticity is measured from past data, with everything else held constant. Real markets do not hold still: a rival can answer a fare rise with a fare cut, incomes can move, and a new substitute can appear. The value narrows the sensible options rather than choosing between them.',
    'An Evaluate (20 marks) is judged on the weighing. Make the elasticity case, then name the assumptions it rests on, then give a judgement that depends on which of them holds.'),
];

/* ── extras ────────────────────────────────────────────────────────────────── */
export const EXTRAS = {
  chains: [
    {
      title: 'Why a buyer stops at the quantity she stops at',
      steps: [
        `The first trip of the month is worth ${money(MU[0])} to this traveller.`,
        `Each further trip adds less satisfaction: ${money(MU[1])}, then ${money(MU[2])}, then ${money(MU[3])}.`,
        'She takes a trip while its marginal utility is at least the fare she has to pay.',
        `At a fare of ${money(MU[1])} the second trip clears it and the third does not, so she takes two.`,
      ],
      result: 'The quantity a buyer chooses is where marginal utility has fallen to the price, which is one point on her demand curve',
    },
    {
      title: 'How a rise in real income moves a whole market',
      steps: [
        'Real incomes rise across the city, so the same money buys more than it did.',
        'Buyers of a normal good are willing and able to buy more of it at every price.',
        'The whole demand curve moves to the right, because the change is not about this good\'s price.',
        'At the unchanged price, quantity demanded is read off the new curve and is higher.',
      ],
      result: 'A shift is a change at every price, which is exactly what one curve cannot show and two curves can',
    },
    {
      title: 'How a fare rise becomes a PED value',
      steps: [
        `Tafari raises the fare from ${money(PED_INELASTIC[0])} to ${money(PED_INELASTIC[1])}, a rise of ${Math.round(((PED_INELASTIC[1] - PED_INELASTIC[0]) / PED_INELASTIC[0]) * 100)}%.`,
        `Daily sales fall from ${qAt(PED_INELASTIC[0])} tickets to ${qAt(PED_INELASTIC[1])}, a fall of ${Math.abs(Math.round(((qAt(PED_INELASTIC[1]) - qAt(PED_INELASTIC[0])) / qAt(PED_INELASTIC[0])) * 100))}%.`,
        `Dividing the quantity percentage by the price percentage gives PED = ${ped(...PED_INELASTIC)}.`,
        'A size below 1 means quantity moved proportionally less than price: price inelastic demand.',
      ],
      result: `Revenue therefore rises from ${money(trAt(PED_INELASTIC[0]))} to ${money(trAt(PED_INELASTIC[1]))} a day, which is what inelastic demand promises`,
    },
    {
      title: 'Why revenue peaks in the middle of a straight-line demand curve',
      steps: [
        'Near the top of the line demand is elastic, so a price cut wins more volume than it gives up in price.',
        'Near the bottom demand is inelastic, so a price rise gains more in price than it loses in volume.',
        `Both moves point towards the middle, where PED is exactly 1 and the two percentages cancel.`,
        `At the midpoint fare of ${money(MID_P)}, ${MID_Q} tickets sell and total revenue is ${money(MAX_TR)}.`,
      ],
      result: 'Maximum total revenue sits where PED = 1, which is why the elasticity has to be known before the price is set',
    },
    {
      title: 'How a dearer air fare fills a coach',
      steps: [
        `The air fare on the route rises ${AIR_FARE_RISE}% while the coach fare does not move at all.`,
        'Travellers reconsider the two options and some switch to the coach.',
        `Quantity demanded of coach tickets rises ${COACH_XQ}% at every coach fare.`,
        `XED = ${COACH_XQ} ÷ ${AIR_FARE_RISE} = +${XED_SUBSTITUTE()}, a positive value, so the two are substitutes.`,
      ],
      result: 'A positive cross elasticity is how a firm learns who its rivals actually are, rather than who they look like',
    },
    {
      title: 'Why a tax on an inelastic good collects but does not deter',
      steps: [
        'A government places an indirect tax on a good, and sellers pass most of it into the price.',
        'Demand for the good is price inelastic, because buyers have no close substitute.',
        'Quantity demanded falls only slightly, so almost all of the original volume is still being taxed.',
        'Receipts arrive reliably while consumption barely moves.',
      ],
      result: 'The tax succeeds as revenue and fails as deterrence, and it takes a larger share of a low income than a high one',
    },
  ],
  evaluation: [
    {
      title: 'An elasticity is a measurement of the past, not a forecast',
      content: 'Every value is calculated from data already collected, with everything else assumed constant. Real markets move: a rival answers a price rise, incomes change, a new substitute appears. A firm acting on an old PED can lose the volume the calculation said it would keep. Use the value to narrow the options and say which assumption the recommendation depends on.',
    },
    {
      title: 'Whether a good is normal or inferior depends on who is buying it',
      content: 'A good can be inferior for households on high incomes and normal for households on low ones, and the same good can be inferior in one country and normal in another. YED also drifts over time, as goods that were luxuries become ordinary. A single national YED figure hides all of that, so a classification drawn from one is a starting point rather than a finding.',
    },
    {
      title: 'How the good is defined changes the answer',
      content: 'Demand for water is very price inelastic; demand for one brand of bottled water is not. Narrow the definition and the substitutes multiply, so elasticity rises. Before using a value, check what the extract counted as the good — a market share argument and a pricing argument often need different definitions of the same product.',
    },
    {
      title: 'Revenue is one side of a pricing decision',
      content: 'PED predicts what a price change does to takings, and says nothing about what it does to costs. The fare that fills the most seats may need more vehicles, more staff and more fuel than a dearer, emptier one. A recommendation built only on elasticity has answered a revenue question and left the profit question open.',
    },
  ],
};
