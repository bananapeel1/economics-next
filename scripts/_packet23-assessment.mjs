/**
 * PACKET 23 — supply: quiz, practice, flashcards, common mistakes and chains.
 *
 * WHAT THE MARCH BANK GOT WRONG, and what the audit got wrong about it.
 *
 * Three items were teaching another topic's content or marking a wrong answer:
 *   - producer surplus is IAL 1.3.4 · 2a (econ_spec.txt:703-706), so `price-determination` owns it;
 *   - joint supply is 0 in the whole Economics specification — `joint` hits twice, both *joint
 *     ventures* — so it is not a Unit 1 idea at all, which is why specGap-03's request to TEACH it is
 *     refuted and the item testing it is deleted instead;
 *   - the profit-maximising item asserted "P = MC is the supply condition", which is Unit 3 (:1316)
 *     and whose marked answer is wrong as stated for a firm in the short run.
 * All three are gone.
 *
 * THE THREE DUPLICATE PAIRS THE AUDIT NAMED DO NOT EXIST. topFix-05 and structure-06 name Q1/Q10,
 * Q4/Q16 and Q6/Q12. Checked by token overlap over question AND options, those pairs share nothing
 * but the word "supply": they test shift-versus-movement, perfectly inelastic supply and the PES
 * determinants. The genuine near-duplicates were Q9/Q12 (a subsidy shifts supply right, asked twice)
 * and Q13/Q19 (a technology or productivity gain shifts supply right, asked twice). Those are the
 * two that were merged, and the freed slots went to the leaves with no item at all.
 *
 * Q16 SURVIVES UNCHANGED, because specGap-01 was half wrong about it. The finding says no quiz item
 * calculates PES from raw prices and quantities; Q16 does exactly that and is correct. A student
 * never saw it because block pins were sequential (structure-01), which is a wiring defect, not a
 * missing item.
 *
 * PRACTICE IS EIGHT ITEMS, ONE PER IAL ECONOMICS COMMAND WORD. The March five carried two invalid
 * command words and two wrong tariffs: "Define … (4 marks)" when Define is 2 (practice-01),
 * "Assess … (10 marks)" when Economics has NEITHER Assess NOR a 10-mark item, "Outline … (4 marks)"
 * when Outline is not an IAL command word in either subject, and "Explain … (6 marks)" when Explain
 * is 4. `Draw` (4) — "construct an accurately labelled diagram" — had never been used anywhere in
 * this programme, and leaves 1b, 1c and 2b are asking for it.
 */
import { id, money, pc, qty, pesStr, P0, P1, Q0, Q_SR, Q_LR, PCT_P, PCT_Q_SR, PCT_Q_LR, PES_SR, PES_LR, SPECIFIC_TAX, AD_VALOREM, SUBSIDY } from './_packet23-util.mjs';
import { B1, B2, B3, B4, B5 } from './_packet23-content.mjs';

const q = (block, question, options, correctIndex, explanation) => ({ id: id('quiz', question), block, question, options, correctIndex, explanation });

/* ══ Quiz ═════════════════════════════════════════════════════════════════
 * The first THREE carry no block and are therefore the pre-test pool: PreTest.jsx takes the first
 * three items no block has reserved, in array order. They go first because a free student's bank is
 * sliced server-side, so a pre-test pool sitting at the end of the array would serve that student
 * pinned questions instead. A fourth unpinned item would reach no surface at all.
 */
/*
 * quiz.histogram. A hand-authored bank drifts toward the middle positions: the March bank did, and
 * the first draft of this one put 15 of 26 answers at position B and none at D. Re-authoring 26
 * items by eye to fix a distribution is the wrong instrument — it changes the items to fix the
 * container. Instead each item's options are rotated by an offset derived from its own stem. That
 * is deterministic, so the bank is identical on every run and a block's pinned indices stay stable;
 * and it is blind to which option is correct, so it cannot introduce a pattern of its own.
 *
 * Items whose options are an ordered numeric sequence are left alone: scrambling 0.5 / 0.75 / 1.33 /
 * 2.0 out of order would make the item harder to read without making the bank fairer.
 */
const NUMERIC = /^[$]?[\d.]/;
const rotate = (item) => {
  if (item.options.some((o) => NUMERIC.test(o))) return item;
  const off = [...item.question].reduce((n, ch) => (n * 31 + ch.charCodeAt(0)) % 4, 3);
  if (!off) return item;
  const options = item.options.map((_, i) => item.options[(i + off) % 4]);
  return { ...item, options, correctIndex: (item.correctIndex - off + 4) % 4 };
};

export const QUIZ = [
  // ── the pre-test: one item from each half of the topic, plus the distinction it turns on
  q(null, 'Supply is best defined as:',
    ['The total amount of a good that exists in a market',
      'The quantity producers are willing and able to sell at each price',
      'The amount of a good that producers have in their warehouses',
      'The quantity of a good that buyers wish to purchase'],
    1,
    'Supply is an intention measured at every price and over a period — a rate, not a quantity sitting still. The stock in a warehouse is what a firm holds; supply is what it will offer, and at what price.'),
  q(null, 'The price of a good rises, with nothing else changing. This causes:',
    ['A shift of the supply curve to the right',
      'A shift of the supply curve to the left',
      'An extension of supply along the existing curve',
      'No change in either supply or quantity supplied'],
    2,
    "The curve already answers the question \"how much at each price\", so the good's own price cannot move it. The firm reads off a different point on the same curve, which is an extension of supply."),
  q(null, 'A price elasticity of supply of 0.4 tells you that:',
    ['Quantity supplied falls when price rises',
      'Quantity supplied does not respond to price at all',
      'Quantity supplied changes by less, proportionally, than price',
      'Quantity supplied changes by more, proportionally, than price'],
    2,
    'A value between 0 and 1 is inelastic supply: the quantity does respond, but by a smaller percentage than the price changed. Only a value of exactly 0 would mean no response at all.'),

  // ── block 1 · the supply curve (1a, 1b)
  q(B1, 'The supply curve slopes upward because:',
    ['Producers always prefer to charge higher prices',
      'Expanding output draws in resources that cost more per unit',
      'Buyers are willing to pay more when supply is scarce',
      'Government sets a minimum price for most goods'],
    1,
    'Expansion reaches for overtime, older equipment and dearer suppliers once the cheap options are used, so each additional unit costs more than the one before. A higher price is what makes those units worth producing.'),
  q(B1, 'Which of these would shift the supply curve for wheat to the left?',
    ['A fall in the price of wheat',
      'A prolonged drought reducing crop yields',
      'An increase in demand for wheat-based products',
      'A subsidy paid to wheat farmers'],
    1,
    "A drought reduces what growers can offer at every price, which is a leftward shift. A fall in wheat's own price is a movement along the curve, a demand change acts on the other curve, and a subsidy shifts supply right."),
  q(B1, 'A contraction of supply is shown on a diagram as:',
    ['The whole curve moving to the left',
      'The whole curve moving to the right',
      'A movement down along the existing curve',
      'The curve becoming steeper at every price'],
    2,
    "A contraction is caused by a fall in the good's own price, so the firm moves down the curve it is already on. A leftward shift of the whole curve is a decrease in supply, which is a different event with a different cause."),
  q(B1, 'Which phrase correctly describes a rightward shift of the supply curve?',
    ['An extension of supply', 'An increase in quantity supplied', 'An increase in supply', 'A contraction of supply'],
    2,
    'Supply changes in a shift; quantity supplied changes in a movement. An increase in supply means more is offered at every price, which is drawn as the whole curve moving right.'),

  // ── block 2 · what shifts supply (1c-1 … 1c-5)
  q(B2, `A specific tax of ${money(SPECIFIC_TAX)} per unit is imposed on a good. The supply curve will:`,
    ['Become vertical at the taxed quantity',
      `Shift upward by ${money(SPECIFIC_TAX)} at every quantity, staying parallel`,
      'Pivot, with a wider gap at higher prices',
      'Stay where it is until the market price changes'],
    1,
    `A specific tax is the same sum on every unit, so the producer needs exactly ${money(SPECIFIC_TAX)} more from the buyer whatever the quantity. The vertical gap between the curves is constant, which is what makes the shift parallel.`),
  q(B2, `An ad valorem tax of ${pc(AD_VALOREM)} differs from a specific tax because:`,
    ['It is paid by consumers rather than producers',
      'It shifts the demand curve instead of the supply curve',
      'The gap it opens grows as price rises, so the curve pivots',
      'It applies only to goods sold above a threshold price'],
    2,
    `A fixed percentage of a higher price is more money, so the vertical gap widens as you move up the curve. That pivot is the whole reason the specification names both kinds of indirect tax rather than one.`),
  q(B2, `A government pays producers a subsidy of ${money(SUBSIDY)} per unit. The supply curve will:`,
    ['Shift left, because the market has been distorted',
      'Become vertical at the subsidised quantity',
      `Shift down by ${money(SUBSIDY)}, which is the same as shifting right`,
      'Stay where it is until producers raise their prices'],
    2,
    `The producer receives ${money(SUBSIDY)} from the government on every unit, so it needs ${money(SUBSIDY)} less from the buyer at every quantity. Shifting down by the subsidy and shifting right are two descriptions of one movement.`),
  q(B2, 'A technological improvement in car manufacturing would:',
    ['Shift the supply curve for cars to the left',
      'Shift the supply curve for cars to the right',
      'Cause a movement along the supply curve for cars',
      'Leave the supply of cars unchanged in the long run'],
    1,
    'Better technology gets more output from the same inputs, so the cost of each unit falls and output that was not worth producing becomes worth producing. More is offered at every price, which is a rightward shift.'),
  q(B2, 'An increase in wages in the clothing industry, ceteris paribus, would:',
    ['Increase the supply of clothing',
      'Decrease the supply of clothing',
      'Cause an extension of supply of clothing',
      'Increase the demand for clothing'],
    1,
    'Wages are a cost of production, so a rise makes each garment less profitable at the price already being charged. Some output stops being worth producing and less is offered at every price: supply decreases.'),
  q(B2, 'A flood destroys much of a cotton crop before harvest. Supply falls because:',
    ['Growers are unwilling to sell at the market price',
      'The cost of growing cotton has risen sharply',
      'The output itself no longer exists to be sold',
      'Buyers have reduced their orders for cotton'],
    2,
    'A natural disaster acts on the "able" half of willing and able. However high the price goes, growers cannot offer cotton that has been destroyed, which is why the shift happens regardless of price.'),

  // ── block 3 · price elasticity of supply (2a, 2b)
  q(B3, 'Price rises from $10 to $12 and quantity supplied rises from 200 to 230 units. PES is:',
    ['0.5, inelastic', '0.75, inelastic', '1.33, elastic', '2.0, elastic'],
    1,
    'Quantity supplied rises 30 on 200, which is 15%. Price rises 2 on 10, which is 20%. PES is 15 divided by 20, or 0.75. Because that is below 1, supply is price inelastic over this range: the quantity responds proportionally less than the price.'),
  q(B3, `Kavira's price rises from ${money(P0)} to ${money(P1)} and output from ${qty(Q0)} to ${qty(Q_SR)} tiles a week. PES is:`,
    [`${pesStr(0.25)}, inelastic`, `${pesStr(PES_SR())}, inelastic`, `${pesStr(1.67)}, elastic`, `${pesStr(PES_LR())}, elastic`],
    1,
    `Quantity rises ${qty(Q_SR - Q0)} on ${qty(Q0)}, which is ${pc(PCT_Q_SR())}. Price rises ${money(P1 - P0)} on ${money(P0)}, which is ${pc(PCT_P())}. PES is ${pc(PCT_Q_SR())} divided by ${pc(PCT_P())}, or ${pesStr(PES_SR())} — below 1, so supply is inelastic.`),
  q(B3, 'When calculating PES, each percentage change must be measured against:',
    ['The average of the old and new values',
      'The original value, before the change',
      'The new value, after the change',
      'The largest of the two values'],
    1,
    'A percentage change is the change divided by the value it started from. Using the new value or the average gives a different answer, and using the raw changes instead of percentages gives a figure that depends on the units chosen.'),
  q(B3, 'A supply curve drawn as a straight line through the origin has:',
    ['PES of exactly 1, whatever its slope',
      'PES below 1 if it is steep and above 1 if it is shallow',
      'PES of 0, because it starts at zero',
      'A PES that cannot be determined without figures'],
    0,
    'On a line through the origin, price and quantity are measured from zero together, so doubling one doubles the other. That is unitary elasticity, and it holds for a steep line and a shallow line alike.'),
  q(B3, 'Which of these is most likely to have a perfectly inelastic supply curve?',
    ['Manufactured toys from a factory with spare capacity',
      'Seats at a stadium for one particular match',
      'Bread produced by large-scale bakeries',
      'Digital downloads of music files'],
    1,
    'The ground has the seats it has, and no ticket price puts another one in it that evening. That fixed quantity is drawn as a vertical supply curve, which is PES of zero.'),
  q(B3, 'Perfectly elastic supply is drawn as:',
    ['A vertical line at the fixed quantity',
      'A horizontal line at the going price',
      'A steep line sloping upward',
      'A shallow line through the origin'],
    1,
    'At the going price the producer will supply any quantity asked for; a fraction above it there is unlimited supply, and a fraction below it there is none. That is a horizontal curve, and it describes a small producer in a very large market.'),

  // ── block 4 · what determines PES (2c-1 … 2c-5)
  q(B4, 'Which of these would make the supply of a good more price elastic?',
    ['The product has a production cycle of several years',
      'Factors of production are highly specialised',
      'The firm has spare capacity and holds finished stock',
      'A licence limits how many firms may produce it'],
    2,
    'Spare capacity means output can rise without new investment, and stock can be released without producing anything. The other three are constraints on whether the firm CAN respond, which is what makes supply inelastic.'),
  q(B4, 'The supply of fresh cut flowers is price inelastic mainly because:',
    ['Flower growers are unwilling to expand production',
      'The output perishes and cannot be stored for a better price',
      'Flowers are sold only through specialist retailers',
      'Growers face high transport costs to reach the market'],
    1,
    'A good that spoils cannot be held back or accumulated in advance, so there is no reserve to release when the price rises. Storability is the determinant here: the same flowers dried or frozen would be far more responsive.'),
  q(B4, 'A city caps the number of taxi licences it issues. The supply of taxi journeys is then:',
    ['Elastic, because drivers can work longer hours',
      'Inelastic, because no price brings more licensed cabs',
      'Perfectly elastic at the regulated fare',
      'Unaffected, since licences do not change costs'],
    1,
    'A legal constraint caps the quantity by rule rather than by cost, so money cannot overcome it. A higher fare makes each licence more valuable but puts no additional licensed taxi on the road until the city issues one.'),
  q(B4, 'Supply is inelastic when factors of production are immobile because:',
    ['The finished product is expensive to transport to market',
      'The labour and equipment needed cannot be switched into this use',
      'Producers are contractually tied to their existing buyers',
      'The firm cannot find buyers willing to pay a higher price'],
    1,
    'Mobility is about moving factors INTO producing the good, not moving the product out. Where the work needs years of training or purpose-built equipment, a higher price cannot conjure them and output rises slowly.'),

  // ── block 5 · the short run and the long run (2d)
  q(B5, 'In economics, the short run is defined as the period in which:',
    ['Output cannot be changed at all',
      'At least one factor of production is fixed',
      'Prices are held constant by the market',
      'A firm has been trading for less than one year'],
    1,
    'The short run is defined by a constraint, not a calendar. It lasts as long as the fixed factor takes to change, which may be a day for a market stall and a decade for a power station.'),
  q(B5, 'Supply is more price elastic in the long run than in the short run because:',
    ['Producers become more willing to sell over time',
      'Prices rise further the longer a shortage lasts',
      'Capacity can be added and factors trained or built',
      'Consumers adjust their buying habits over time'],
    2,
    'Every determinant loosens once the fixed factor becomes variable: capacity can be expanded, workers trained, permissions obtained and stock accumulated. Each one that loosens enlarges the output response the same price rise can produce.'),
  q(B5, `Given more time, Kavira's response to the same ${pc(PCT_P())} price rise changes from ${pc(PCT_Q_SR())} to ${pc(PCT_Q_LR())} on quantity. PES therefore moves from:`,
    [`${pesStr(PES_SR())} to ${pesStr(PES_LR())}: inelastic to elastic`,
      `${pesStr(PES_LR())} to ${pesStr(PES_SR())}: elastic to inelastic`,
      `${pesStr(PES_SR())} to ${pesStr(1)}: inelastic to unitary`,
      `${pesStr(PES_SR())} to ${pesStr(PES_SR())}: it is unchanged`],
    0,
    `The price change is the same in both periods, so only the quantity response differs: ${pc(PCT_Q_SR())} ÷ ${pc(PCT_P())} is ${pesStr(PES_SR())}, and ${pc(PCT_Q_LR())} ÷ ${pc(PCT_P())} is ${pesStr(PES_LR())}. The second kiln is the only thing that changed.`),
].map(rotate);

/* ══ Practice ═════════════════════════════════════════════════════════════
 * One item per IAL Economics command word, checked against audit/raw/tariff-census.json: Define 2,
 * Calculate 2 or 4, Draw 4, Explain 4, Analyse 6, Examine 8, Discuss 14, Evaluate 20. There is no
 * Assess and no 10-mark item in Economics, which is what made the March "Assess … (10 marks)"
 * invalid twice over.
 *
 * Guidance for the four items at 6 marks or below allocates points, because at those tariffs the
 * mark scheme is the artefact. Above 6 it does not: `practice.levels` is a DEBT rule for exactly
 * that, and topFix-05's prescribed replacement — "KAA and Evaluation levels" — is UK GCE mark-scheme
 * vocabulary that appears 0 times in the IAL specification, so the guidance is written to the
 * command word's own Appendix 6 description instead.
 */
const p = (block, command, marks, question, guidance) => ({ id: id('practice', question), block, command, marks, question, guidance });

export const PRACTICE = [
  p(B1, 'Define', 2, "Define the term 'supply'. (2 marks)",
    'The quantity of a good that producers are willing and able to offer for sale (1 mark), at a given price in a given time period (1 mark). Both qualifiers are needed: without them the definition describes a stock rather than a rate.'),
  p(B1, 'Draw', 4, 'Draw a supply curve and show an extension of supply following a rise in price. (4 marks)',
    'Price on the vertical axis and quantity supplied on the horizontal, both labelled (1 mark). An upward-sloping curve labelled S (1 mark). Two points marked ON that single curve, at a lower and a higher price (1 mark). Both prices and both quantities read off to the axes with dashed lines (1 mark). A second curve would show a shift, which is not what was asked for.'),
  p(B2, 'Explain', 4, `Explain how the imposition of a specific tax of ${money(SPECIFIC_TAX)} per unit affects the supply curve for a good. (4 marks)`,
    `The producer must receive the same amount for itself on each unit, so it needs ${money(SPECIFIC_TAX)} more from the buyer (1 mark) on every unit sold (1 mark). The vertical gap between the old and new curves is therefore the same at every quantity (1 mark), so the curve shifts upward and remains parallel to the original (1 mark).`),
  p(B2, 'Analyse', 6, 'Analyse two factors that could cause the supply curve for cement to shift to the left. (6 marks)',
    'Two factors, each traced in a chain rather than named (1 mark each for identification). Rising energy costs: kilns burn fuel continuously, so a fuel price rise raises the cost of each tonne (1 mark), making some output unprofitable at the existing price and shifting supply left (1 mark). A natural disaster damaging plant: capacity is destroyed, so less can be produced at any price (1 mark), shifting supply left regardless of profitability (1 mark).'),
  p(B3, 'Calculate', 4, `The price of a good rises from ${money(P0)} to ${money(P1)}. Quantity supplied rises from ${qty(Q0)} to ${qty(Q_SR)} units a week. Calculate the price elasticity of supply and interpret the value. (4 marks)`,
    `Percentage change in quantity supplied: ${qty(Q_SR - Q0)} ÷ ${qty(Q0)} × 100 = ${pc(PCT_Q_SR())} (1 mark). Percentage change in price: ${money(P1 - P0)} ÷ ${money(P0)} × 100 = ${pc(PCT_P())} (1 mark). PES = ${pc(PCT_Q_SR())} ÷ ${pc(PCT_P())} = ${pesStr(PES_SR())} (1 mark). Interpretation: the value is below 1, so supply is price inelastic — quantity supplied changed by proportionally less than price (1 mark). Appendix 6 advises showing workings, which is what allows the percentage stages to be credited even if the final division goes wrong.`),
  p(B4, 'Examine', 8, 'Examine the factors that influence the price elasticity of supply of fresh cut flowers. (8 marks)',
    'Appendix 6 defines Examine as requiring a chain of reasoning, diagrams where appropriate, interpretation of any data given, and a brief assessment of the factors. The chain should run through the determinants that actually bind in this market rather than all five: perishability, because the output cannot be stored or accumulated in advance; the time period, because growing takes a season whatever the price does; and capacity, because glasshouse space is fixed within that season. Factor mobility is the weaker case here and saying so is part of the assessment. The brief assessment should conclude which constraint binds most tightly and over what period, since the answer differs between a week and three years.'),
  p(B5, 'Discuss', 14, 'Discuss the significance of the distinction between the short run and the long run for the price elasticity of supply of a mineral such as lithium. (14 marks)',
    'Appendix 6 requires knowledge, understanding, application, analysis and evaluation, with logical and coherent chains of reasoning developed with reference to context, and a recognition of different viewpoints or a critical assessment of the evidence. The analysis should establish the distinction as one about fixed factors rather than calendar time, then trace it: within the short run mine capacity is fixed, so a demand surge is met mostly by price rather than output; in the long run new mines can be opened and processing built, so the response is largely in output. A diagram contrasting an inelastic and an elastic supply curve supports this directly. Evaluation should weigh how long the long run actually is in this industry, note that the lag depends on permitting and finance as much as on engineering, and consider that expectations of a long-run response can change behaviour before any new capacity exists.'),
  p(B5, 'Evaluate', 20, 'Evaluate the view that price elasticity of supply is the most important factor determining how far the price of rice rises when demand increases in a developing economy. (20 marks)',
    'Appendix 6 requires knowledge, understanding, application, analysis and evaluation at this tariff. The case for the view: where supply is inelastic — a fixed growing season, limited arable land, little stock held — an increase in demand is absorbed largely by price rather than output, and the more inelastic supply is, the larger that price movement. This should be argued through the determinants rather than asserted, and applied to rice specifically. The case against: the size of the demand increase itself matters, as does whether the country can import, whether government holds buffer stocks, and how long the period considered is, since supply is far more elastic over several seasons than over one. A judgement is required rather than a balanced list: candidates should reach a supported conclusion about which factor dominates and state the conditions under which their answer would change. Where the extract gives a specific country, the judgement should be about that market rather than about rice in general.'),
];

/* ══ Flashcards ═══════════════════════════════════════════════════════════
 * Eighteen, one per idea that has a short answer. The March set carried "What is joint supply?" and
 * "What is producer surplus?" — one off-specification entirely and one belonging to 1.3.4. Packet 19
 * found three flashcards that were exact duplicates with a `-2` id suffix and no ledger item named
 * it, so the runner now checks id uniqueness across every surface.
 */
const card = (front, back) => ({ id: id('flashcard', front), front, back });

export const FLASHCARDS = [
  card('What is supply?', 'The quantity of a good producers are willing and able to offer for sale at a given price in a given time period.'),
  card('State the law of supply.', 'Ceteris paribus, a rise in the price of a good raises the quantity supplied of it.'),
  card('Why does the supply curve slope upward?', 'Expanding output draws in resources that cost more per unit, so a higher price is needed before the extra units are worth producing.'),
  card('What causes a movement along the supply curve?', "A change in the good's own price, and nothing else. It is called an extension when price rises and a contraction when price falls."),
  card('What causes a shift of the supply curve?', 'A change in anything other than the price: costs of production, new technology, indirect taxes, subsidies or natural disasters.'),
  card('Name the five factors that shift supply.', 'Changes in the costs of production, the introduction of new technology, indirect taxes (specific and ad valorem), government subsidies, and natural disasters.'),
  card('What is a specific tax and what does it do to the curve?', 'A fixed sum charged on each unit. It shifts the supply curve vertically upward by the amount of the tax, keeping it parallel to the original.'),
  card('What is an ad valorem tax and what does it do to the curve?', 'A tax charged as a percentage of price. Because the money grows with the price, the curve pivots: the vertical gap widens as price rises.'),
  card('How does a subsidy affect the supply curve?', 'The producer receives a payment per unit, so it needs less from the buyer at every quantity. The curve shifts down by the subsidy, which is the same as shifting right.'),
  card('What is price elasticity of supply?', 'The responsiveness of quantity supplied to a change in price: the percentage change in quantity supplied divided by the percentage change in price.'),
  card('How is PES calculated?', 'Divide each change by its own original value and multiply by 100, then divide the quantity percentage by the price percentage.'),
  card('What do PES values above and below 1 mean?', 'Above 1 is elastic supply: quantity changes by a larger percentage than price. Below 1 is inelastic: it changes by a smaller percentage.'),
  card('What is unitary elastic supply and how is it drawn?', 'PES of exactly 1, where quantity changes by the same percentage as price. It is any straight line through the origin, whatever its slope.'),
  card('How are the two extremes of PES drawn?', 'Perfectly inelastic supply is a vertical curve, PES 0. Perfectly elastic supply is a horizontal curve, PES infinite.'),
  card('Name the five factors that influence PES.', 'The time period, availability of stock and perishability, mobility of factors of production, legal constraints, and capacity.'),
  card('How do stock and perishability affect PES?', 'Stock is a reserve that can be released without producing anything, making supply more elastic. A good that perishes has no such reserve, making supply inelastic.'),
  card('What is the difference between the short run and the long run?', 'In the short run at least one factor of production is fixed. In the long run all factors are variable. Both are defined by what can change, not by a length of time.'),
  card('Why is supply more elastic in the long run?', 'Capacity can be added, factors trained or built, permissions obtained and stock accumulated — so every constraint on the response loosens and PES rises.'),
];

/* ══ Common mistakes ══════════════════════════════════════════════════════
 * The March set was mostly sound (structure-07), with two problems: one entry was exam technique
 * rather than a conceptual misconception, and one entry taught "in the momentary period, supply is
 * perfectly inelastic" — `momentary` is 0 in econ_spec.txt, and it is where topFix-02 picked the
 * word up. Two of the three below are rewritten from the March originals; the third replaces the
 * diminishing-returns entry, which went with the Unit 3 block.
 */
const mistake = (title, wrong, right, tip) => ({ id: id('mistake', title), title, mistake: wrong, correction: right, examTip: tip });

export const MISTAKES = [
  mistake('Confusing a movement along the curve with a shift of it',
    'Writing that a rise in the price of a good "increases supply", or drawing a second curve when only the price has changed.',
    "The curve is the answer to \"how much at each price\", so the good's own price cannot move it. A price change is an extension or contraction along the existing curve; only a non-price factor shifts the curve itself.",
    'Say "quantity supplied rose" for a price change, and "supply rose" only when something other than the price has changed.'),
  mistake('Drawing an ad valorem tax as a parallel shift',
    'Shifting the supply curve up by a constant amount for a percentage tax, exactly as for a specific tax.',
    'A percentage of a higher price is more money, so the vertical gap widens as price rises and the curve pivots. Only a specific tax, a fixed sum per unit, gives a parallel shift.',
    'Before drawing, ask whether the tax is a sum per unit or a percentage of price. The answer decides parallel shift or pivot, and that is the distinction 1.3.3 · 1c-3 is testing.'),
  mistake('Treating the short run and long run as fixed lengths of time',
    'Defining the short run as a year, or the long run as "several years", and leaving it there.',
    'Both are defined by what can be varied: the short run has at least one fixed factor, the long run has none. That makes the short run a day for a market stall and a decade for a power station.',
    'Name the fixed factor. An answer that says which factor is fixed and why it takes that long to change has defined the term; one that gives a number has not.'),
];

/* ══ Chains and evaluation ════════════════════════════════════════════════ */

export const EXTRAS = {
  chains: [
    {
      title: 'A rise in input costs decreases supply',
      steps: [
        'The price of an input such as energy, materials or labour rises.',
        'Each unit becomes less profitable at the price the firm is already charging.',
        'Output that was only just worth producing is no longer worth producing.',
        'Less is offered at every price, so the supply curve shifts to the left.',
      ],
      result: 'A decrease in supply: the whole curve moves left, and the price has not changed at any point in the chain.',
    },
    {
      title: 'An indirect tax shifts the curve, and which tax decides how',
      steps: [
        'A tax is imposed on each unit sold, so the producer must receive more from the buyer to be equally well off.',
        `If it is a specific tax, the extra needed is the same sum at every quantity — ${money(SPECIFIC_TAX)} a unit here.`,
        `If it is an ad valorem tax, the extra needed is ${pc(AD_VALOREM)} of the price, which is more money at higher prices.`,
        'The first gives a parallel upward shift; the second gives a pivot that widens as price rises.',
      ],
      result: 'Both are decreases in supply, but only one of them is drawn as a parallel shift.',
    },
    {
      title: "Reading a supply curve's elasticity from its shape",
      steps: [
        'A vertical supply curve: quantity cannot change at all, so PES is 0.',
        'A straight line cutting the QUANTITY axis: some is offered even at a price of zero, so PES is below 1 along its whole length.',
        'A straight line through the ORIGIN: price and quantity are measured from zero together, so PES is exactly 1 whatever the slope.',
        'A straight line cutting the PRICE axis: quantity starts from zero at a positive price, so PES is above 1 along its whole length.',
      ],
      result: 'For a straight line it is the axis the line cuts that decides elasticity, not how steep it looks — with vertical and horizontal as the two extremes.',
    },
    {
      title: 'Why the same price rise gives two different values of PES',
      steps: [
        `The price rises from ${money(P0)} to ${money(P1)}, a rise of ${pc(PCT_P())}, in both periods.`,
        `In the short run the kiln is fixed, so output rises only to ${qty(Q_SR)} tiles: ${pc(PCT_Q_SR())}, and PES is ${pesStr(PES_SR())}.`,
        `In the long run a second kiln can be built, so output reaches ${qty(Q_LR)} tiles: ${pc(PCT_Q_LR())}, and PES is ${pesStr(PES_LR())}.`,
        'Nothing about the price change or the firm differed except the time available to respond.',
      ],
      result: `Supply that is inelastic at ${pesStr(PES_SR())} in the short run is elastic at ${pesStr(PES_LR())} in the long run, which is the significance 1.3.3 · 2d asks for.`,
    },
  ],
  evaluation: [
    {
      point: 'How inelastic supply really is depends on the period being considered',
      detail: 'A PES value quoted without its period means very little, because the same market gives different answers over a week, a season and a decade. Where a question gives a time frame, the time frame is doing most of the analytical work.',
    },
    {
      point: 'The determinants rarely bind equally, so naming all five is weaker than judging one',
      detail: 'In a fresh produce market perishability dominates; in a licensed trade the legal cap dominates; in heavy industry capacity and factor mobility dominate. Identifying which constraint actually binds is the judgement the higher tariffs ask for.',
    },
    {
      point: 'Supply-side constraints can be loosened by policy, not only by time',
      detail: 'Legal constraints are rules rather than costs, so planning reform, licence expansion or quota changes can raise PES without waiting for capacity to be built. That makes the short run partly a policy choice rather than a fact of the industry.',
    },
    {
      point: 'A firm-level answer and a market-level answer are not the same',
      detail: 'Over long periods, high prices bring new firms into an industry, so market supply is more elastic than the supply of any single firm. An answer framed entirely around one producer\'s capacity misses that channel.',
    },
  ],
};
