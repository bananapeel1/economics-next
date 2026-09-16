/**
 * PACKET 23 — supply, Learn Mode content and Notes.
 *
 * Economics Unit 1 (WEC11), IAL topic 1.3.3, audit/raw/econ_spec.txt:656-687. Five blocks in the
 * specification's own order and one subsection per idea, so no step carries two: eight crowded
 * steps become twenty-four small ones, plus five check-ins.
 *
 * Six scope decisions the specification settled before a word was written (see NEXT.md):
 *
 *   - THE SHORT RUN / LONG RUN BLOCK IS ABOUT ELASTICITY, NOT COSTS. The March block 3 taught
 *     marginal product, the law of diminishing returns and returns to scale, and never mentioned PES
 *     (accuracy-02, structure-03). Those are Unit 3: `diminishing returns` is econ_spec.txt:1306 and
 *     `marginal product` :1316, inside the 3.3.2 costs span, and `returns to scale` is 0 in the WHOLE
 *     specification. Leaf 2d asks for "the distinction between the short run and long run in
 *     economics and its significance for price elasticity of supply", which is what block 5 teaches.
 *   - "MOMENTARY" IS NOT AN IAL WORD. topFix-02 asks for a momentary / short run / long run block.
 *     `momentary` is 0 in econ_spec.txt — and it is already live here, in this section's own second
 *     common mistake, which is where the finding picked it up. The spec's own frame is 2c-1 ("the
 *     time period") and 2d, and that is the frame used.
 *   - JOINT AND COMPETITIVE SUPPLY ARE NOT IN THE SPECIFICATION. specGap-03, topFix-05 and
 *     structure-08 ask for them, plus producer expectations and weather. All are 0 in econ_spec.txt
 *     (`joint` hits twice, both *joint ventures*, :1254 and :1957). The section does not learn them;
 *     the quiz item that tested joint supply is deleted instead. What structure-08 gets right is that
 *     block 1's takeaway dropped `natural disasters`, which IS 1c-5 and is restored as its own
 *     subsection.
 *   - EQUILIBRIUM BELONGS TO 1.3.4. specGap-04 and structure-09 ask for a demand curve on the shift
 *     diagrams so the effect on equilibrium price and quantity can be shown. That is 1.3.4 · 1b
 *     (:697-698) and `price-determination` owns it; 1.3.3 has no equilibrium leaf. Both findings are
 *     reassigned to packet 24. What is fixed HERE is the cause: the examMatters sentences that told a
 *     student a 1.3.3 answer needs an equilibrium diagram are gone.
 *   - BOTH KINDS OF INDIRECT TAX BELONG HERE. specGap-05 doubts its own numbering; 1c-3 is "indirect
 *     taxes (specific and ad valorem)" and 1c-4 is "government subsidies", so the vertical shift and
 *     the pivot are taught. The INCIDENCE — who bears the tax — is 1.3.4 · 4b and stays out.
 *   - THE UPWARD SLOPE IS EXPLAINED IN THE SPEC'S OWN WORDS. The March body explained it by
 *     "increasing marginal costs of production". `marginal cost` is econ_spec.txt:1316, Unit 3. IAL
 *     1.3.3 · 1a gives no mechanism at all, so the mechanism is taught as "costs of production"
 *     (1c-1): expanding output draws in resources that cost more per unit. Sixth instance of the
 *     packet 13/16/17/18/22 rule.
 *
 * Money is in dollars throughout. Every figure belongs to Kavira Ceramics and is derived in
 * _packet23-util.mjs. Real examples name real markets and carry no year and no figure (packet 15's
 * accuracy-01 rule, after the Saudi Arabia claim this section used to carry).
 */
import { subId, SECTION, hash8, money, pc, qty, pesStr, MINUS, P0, P1, Q0, Q_SR, Q_LR, PCT_P, PCT_Q_SR, PCT_Q_LR, PES_SR, PES_LR, SPECIFIC_TAX, AD_VALOREM, SUBSIDY, adValoremGap, SR } from './_packet23-util.mjs';

const blockId = (title) => `${SECTION}:block:${hash8(title)}`;
const recall = (sid, r) => ({ id: `${sid}:recall`, ...r });

export const B1 = 'The Supply Curve';
export const B2 = 'What Shifts Supply';
export const B3 = 'Price Elasticity of Supply';
export const B4 = 'What Determines PES';
export const B5 = 'The Short Run and the Long Run';

/* ══ Block 1 — The Supply Curve (1.3.3 · 1a, 1b) ═══════════════════════════ */

const whatSupplyMeans = (() => {
  const sid = subId('supply-and-the-supply-curve'); // March id, kept
  return {
    id: sid,
    title: 'What Supply Means',
    keyIdea: 'Supply is the quantity producers are willing and able to offer for sale at each price in a given time period — an intention at every price, not a single amount.',
    body: [
      { type: 'paragraph', text: '**Supply** is the quantity of a good that producers are **willing and able** to offer for sale at a given price in a given time period. Both halves of that phrase do work. A firm that would like to sell but has nothing to sell is not supplying; nor is a firm with a full warehouse that refuses to sell at the price on offer.' },
      { type: 'paragraph', text: 'The words **in a given time period** matter just as much. Supply is a flow — tiles a week, barrels a day, tonnes a year — not a pile sitting somewhere. Kavira Ceramics supplies ' + qty(Q0) + ' tiles a week at ' + money(P0) + ' a tile. That is a rate, and it is what "supply" names.' },
      { type: 'paragraph', text: 'The **law of supply** states that, ceteris paribus, a higher price brings a higher quantity supplied. It is a claim about direction, not about size — how MUCH more is offered is the second half of this topic.' },
    ],
    realExample: { emoji: '☕', text: 'Vietnamese robusta growers bring more of their crop to market when the world coffee price is high and hold some back when it is low. The trees are the same trees; what changes is how much of the harvest it is worth picking, processing and shipping at the price being offered.' },
    misconception: 'Students write that supply is the amount of a product that exists. That is stock, and it is a quantity sitting still. Instead write: supply is the quantity producers are willing and able to offer for sale at each price, per week or per year.',
    examMatters: 'A Define (2 marks, WEC11 Appendix 6) requires the meaning of a term. For supply that means the quantity producers are willing and able to sell, AND the two qualifiers that make it a supply rather than a stock: at a given price, in a given time period.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the definition this chapter opens with:',
      template: [
        'Supply is the quantity producers are willing and ___ to offer for sale',
        '→ measured at a given ___',
        '→ and in a given ___ period',
      ],
      answers: ['able', 'price', 'time'],
      hints: ['the half of the phrase about capability rather than intention', 'supply is read off against this, one value at a time', 'what makes supply a flow rather than a pile'],
      distractors: ['ready', 'quantity', 'market'],
    }),
  };
})();

const whyTheCurveSlopesUp = (() => {
  const sid = subId('why-the-supply-curve-slopes-upward');
  return {
    id: sid,
    title: 'Why the Supply Curve Slopes Upward',
    keyIdea: 'Expanding output draws in resources that cost more per unit, so each extra unit needs a higher price before it is worth producing — which is what gives the curve its upward slope.',
    body: [
      { type: 'paragraph', text: 'The **supply curve** puts price on the vertical axis and quantity supplied on the horizontal, and slopes up from left to right. The question worth answering is why.' },
      { type: 'paragraph', text: 'The answer is in the **costs of production**. A firm expanding output does not get the extra units on the same terms as the first ones. It pays overtime rather than ordinary hours, hires less experienced staff, runs older equipment it had left idle, buys materials from a more expensive supplier once the cheap one is exhausted.' },
      { type: 'flow', steps: ['The firm wants to produce more', 'It draws in resources that cost more per unit', 'The extra units cost more than the earlier ones'], result: 'A higher price is needed before those units are worth producing', resultType: 'neutral' },
      { type: 'paragraph', text: 'Read from the other end, the same fact is the law of supply: raise the price and units that were not worth producing become worth producing, so quantity supplied rises. Kavira works its kiln harder and pays a weekend shift to reach ' + qty(Q_SR) + ' tiles — worth doing at ' + money(P1) + ', not at ' + money(P0) + '.' },
    ],
    realExample: { emoji: '⛏️', text: 'A copper mine works its richest ore first. As it pushes output higher it moves to lower-grade ore, where the same effort yields less metal, so the cost of each additional tonne rises. Only a higher copper price makes those tonnes worth extracting.' },
    misconception: 'Students say the curve slopes up because firms are greedy for profit. Greed would apply at every price equally and explains nothing about the slope. Instead write: the extra units cost more to produce than the earlier ones, so a higher price is needed before they are worth producing.',
    examMatters: 'An Explain (4 marks, WEC11 Appendix 6) asks for a reason developed into a consequence through a two-stage chain. "Costs rise as output expands" is the first stage; "so a higher price is needed before the extra units are worth producing" is the second, and the answer is not finished without it.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the chain behind the upward slope into the order it runs, from cause to consequence:',
      correctOrder: [
        'The firm expands output beyond its cheapest units',
        'It draws in resources that cost more per unit',
        'Each additional unit costs more than the one before',
        'A higher price is needed before those units are worth producing',
      ],
      why: [
        'Nothing changes until the firm tries to go beyond the output its cheapest resources can supply',
        'Overtime, older equipment and dearer suppliers are what expansion reaches for once the cheap options are used',
        'The cost per unit rising is the consequence of drawing on those dearer resources, not a separate fact',
        'The price is the last link: it is what has to rise before the dearer units are worth making',
      ],
    }),
  };
})();

const movementsAlong = (() => {
  const sid = subId('movements-along-vs-shifts-of-supply'); // March id, kept
  return {
    id: sid,
    title: 'Movements Along the Curve',
    keyIdea: "A change in the good's OWN price moves the firm along the curve it is already on: an extension when price rises, a contraction when it falls.",
    body: [
      { type: 'paragraph', text: 'IAL 1.3.3 · 1b asks for one distinction, and it is the distinction the rest of this topic depends on. Start with the half that does NOT move the curve.' },
      { type: 'paragraph', text: "When the good's **own price** changes and nothing else does, the firm moves to a different point on the SAME curve. The relationship between price and quantity has not changed; the firm is simply reading off a different part of it." },
      { type: 'bullets', items: [
        '**Extension of supply** — price rises, quantity supplied rises, and the firm moves UP the curve.',
        '**Contraction of supply** — price falls, quantity supplied falls, and the firm moves DOWN the curve.',
      ] },
      { type: 'paragraph', text: 'Kavira at ' + money(P0) + ' supplies ' + qty(Q0) + ' tiles a week. At ' + money(P1) + ' it supplies ' + qty(Q_SR) + '. Both points are on one curve, so this is an extension of supply — not an increase in supply, which means something else entirely.' },
    ],
    realExample: { emoji: '🛢️', text: 'US shale oil producers bring idle rigs back into operation within months when the crude price rises, and stop drilling when it falls. The wells and the geology are unchanged: it is the price that decides how much of the known resource is worth pumping this quarter.' },
    misconception: 'Students write that a rise in price shifts the supply curve to the right. The curve IS the answer to "how much at each price", so a price change cannot move it. Instead write: a rise in the good\'s own price causes an extension of supply, a movement up the existing curve.',
    examMatters: 'Appendix 6 defines Draw (4 marks, WEC11) as constructing an accurately labelled diagram. A movement is drawn as two points on ONE curve with both prices and both quantities read off to the axes — not as a second curve.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each event into what it does to Kavira: a movement along the curve, or something that is not a movement.',
      groups: [
        { name: 'A movement along', why: "The good's own price has changed and nothing else has, so the firm reads off a different point on the curve it is already on", items: ['The tile price rises to ' + money(P1), 'The tile price falls to ' + money(P0), 'Buyers bid the tile price up'] },
        { name: 'Not a movement along', why: 'Something other than the tile price has changed, so the whole relationship between price and quantity moves', items: ['Clay becomes more expensive', 'A faster kiln is installed', 'A tax is imposed on each tile'] },
      ],
    }),
  };
})();

const shiftsOfCurve = (() => {
  const sid = subId('shifts-of-the-supply-curve');
  return {
    id: sid,
    title: 'Shifts of the Curve',
    keyIdea: 'A change in anything OTHER than the price moves the whole curve, so a different quantity is offered at every price — an increase in supply to the right, a decrease to the left.',
    body: [
      { type: 'paragraph', text: 'The other half of 1b. When something other than the price changes, the firm no longer offers the same quantity at any price. The whole curve moves.' },
      { type: 'bullets', items: [
        '**Increase in supply** — the curve shifts RIGHT. More is offered at every price, including the price that was already being charged.',
        '**Decrease in supply** — the curve shifts LEFT. Less is offered at every price.',
      ] },
      { type: 'paragraph', text: 'The test that settles which is which is a question about ONE price. Hold the price still and ask whether the firm now offers more or less than before. If the answer is more, supply has increased; if less, it has decreased. The direction never depends on what the price happens to be.' },
      { type: 'paragraph', text: 'The vocabulary is worth keeping straight. **Quantity supplied** changes in a movement; **supply** changes in a shift. Saying "supply rose" when a price rose is the single most common way to lose the distinction 1b is asking for.' },
    ],
    realExample: { emoji: '🌾', text: 'When a drought cuts yields across a wheat-growing region, growers offer less wheat at every price, not only at the price prevailing that day. That is a decrease in supply, and it is why a bad harvest is drawn as a leftward shift rather than as a move along the curve.' },
    misconception: 'Students describe a shift as supply "going up" or "going down", which is ambiguous on a diagram where right is more and up is dearer. Instead write: an increase in supply shifts the curve to the RIGHT, because more is offered at every price.',
    examMatters: 'An Analyse (6 marks, WEC11 Appendix 6) requires a chain of reasoning and a diagram where appropriate. The chain for a shift has three links: name the factor, say what it does to the costs of production or to capacity, then state the direction of the shift.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the rule that separates the two:',
      template: [
        "A change in the good's own price causes a movement, and what changes is quantity ___",
        '→ a change in anything else shifts the curve, and what changes is ___ itself',
        '→ the shift that offers more at every price moves the curve to the ___',
      ],
      answers: ['supplied', 'supply', 'right'],
      hints: ['the two-word term for the amount read off at one particular price', 'the term for the whole price-quantity relationship', 'the direction that means more is offered at every price'],
      distractors: ['demanded', 'left', 'price'],
    }),
  };
})();

/* ══ Block 2 — What Shifts Supply (1.3.3 · 1c-1 … 1c-5) ═══════════════════ */

const costsOfProduction = (() => {
  const sid = subId('factors-that-shift-supply'); // March id, kept
  return {
    id: sid,
    title: 'Changes in the Costs of Production',
    keyIdea: 'Higher costs of production mean less is worth producing at any given price, so the supply curve shifts left; lower costs shift it right.',
    body: [
      { type: 'paragraph', text: 'The first of the five factors the specification lists, and the one the other four mostly work through. **Costs of production** are what the firm pays for its inputs: wages, raw materials, energy, rent, transport.' },
      { type: 'paragraph', text: 'Hold the price of the good still and raise the cost of an input. Some output that was just worth producing now is not, so the firm offers less at that price — and at every other price too. The curve shifts LEFT.' },
      { type: 'flow', steps: ['The cost of an input rises', 'Producing each unit becomes less profitable at the existing price', 'Some output is no longer worth producing'], result: 'Less is offered at every price: the supply curve shifts left', resultType: 'bad' },
      { type: 'paragraph', text: 'A fall in costs runs the same chain backwards and shifts the curve right. If clay became cheaper, Kavira would offer more than ' + qty(Q0) + ' tiles at ' + money(P0) + ' — the price has not moved, the curve has.' },
    ],
    realExample: { emoji: '🏭', text: 'Cement is made in kilns that burn fuel continuously, so energy is one of its largest input costs. When fuel prices rise sharply, cement makers across a region offer less at every price, and the effect shows up wherever cement is an input — which is most construction.' },
    misconception: 'Students state the factor and stop: "costs shift supply". That names a cause without saying which way anything moves. Instead write: higher costs of production make each unit less profitable at the existing price, so less is offered at every price and the curve shifts left.',
    examMatters: 'Appendix 6 states that Explain (4 marks, WEC11) requires a two-stage chain when it asks for a reason or an impact. Naming the factor is stage zero; the two stages are what it does to profitability at the existing price, and which way the curve therefore moves.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the chain from a cost rise to a shift into the order it runs, from cause to consequence:',
      correctOrder: [
        'The cost of an input rises',
        'Each unit is less profitable at the existing price',
        'Some output is no longer worth producing',
        'Less is offered at every price, so the curve shifts left',
      ],
      why: [
        'The input price is the change that starts the chain; nothing else has moved',
        'Profitability is measured against the price the firm is already getting, which has not changed',
        'Output that was only just worth producing is what drops out first',
        'The shift is the conclusion, and it is about every price, not only the current one',
      ],
    }),
  };
})();

const newTechnology = (() => {
  const sid = subId('new-technology');
  return {
    id: sid,
    title: 'The Introduction of New Technology',
    keyIdea: 'New technology lets the same inputs produce more output, which lowers the cost of each unit and shifts the supply curve right.',
    body: [
      { type: 'paragraph', text: 'IAL 1.3.3 · 1c-2. **New technology** means a better way of turning inputs into output: a faster machine, a better process, a method that wastes less.' },
      { type: 'paragraph', text: 'It reaches supply through costs. If the same labour and materials now yield more units, the cost of each unit falls, and output that was not worth producing becomes worth producing. The curve shifts RIGHT.' },
      { type: 'paragraph', text: 'Two features of this factor are worth noticing. It is usually **permanent** — a firm that has learnt a better method does not unlearn it — and it often works **across a whole industry** rather than one firm, because methods spread. That is why a technological change shifts the market supply curve and not just one firm\'s.' },
    ],
    realExample: { emoji: '🚜', text: 'Guided tractors let a grain farm plant and spray with far less overlap, so the same fuel, seed and chemical cover more ground. Where the method spreads across a growing region, the whole region offers more grain at every price.' },
    misconception: 'Students treat new technology as raising the price of the good because it is expensive to install. The installation is a one-off cost; what matters for supply is the cost per unit afterwards. Instead write: new technology lowers the cost of each unit produced, so more is offered at every price and supply shifts right.',
    examMatters: 'An Analyse (6 marks, WEC11 Appendix 6) requires depth rather than breadth — one factor traced properly beats four listed. Technology traced through cost per unit to a rightward shift is the depth the command word asks for.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the route technology takes to the supply curve:',
      template: [
        'New technology lets the same inputs produce more ___',
        '→ so the cost of each ___ falls',
        '→ so the supply curve shifts to the ___',
      ],
      answers: ['output', 'unit', 'right'],
      hints: ['what comes out of the process rather than what goes in', 'the basis on which the cost that matters for supply is measured', 'the direction that means more is offered at every price'],
      distractors: ['profit', 'left', 'input'],
    }),
  };
})();

const specificTaxes = (() => {
  const sid = subId('indirect-taxes-specific');
  return {
    id: sid,
    title: 'Indirect Taxes: A Specific Tax',
    keyIdea: 'A specific tax is a fixed sum per unit, so it raises the price the producer needs by the same amount at every quantity — the curve shifts vertically upward and stays parallel.',
    body: [
      { type: 'paragraph', text: 'IAL 1.3.3 · 1c-3 names **indirect taxes** and then names two kinds, because the two move the curve differently. A **specific tax** is a fixed amount of money on each unit sold, whatever the unit costs.' },
      { type: 'paragraph', text: 'Suppose a tax of ' + money(SPECIFIC_TAX) + ' is placed on each tile. Kavira still needs the same amount for itself on every tile it sells, so it now needs ' + money(SPECIFIC_TAX) + ' more from the buyer — at every quantity, because the tax is the same on every unit.' },
      { type: 'paragraph', text: 'That is what makes it a **parallel shift**: the vertical gap between the old curve and the new one is ' + money(SPECIFIC_TAX) + ' everywhere. Measured the other way, it is a decrease in supply: less is offered at every price.' },
    ],
    realExample: { emoji: '⛽', text: 'Fuel duty is charged as a set amount per litre in many countries, so it adds the same sum to every litre whether the underlying oil price is high or low. The duty is the vertical distance between what the motorist pays and what the refiner receives.' },
    misconception: 'Students draw an indirect tax as a movement along the curve, because a tax makes things dearer and dearer means less is bought. The tax has changed what producers need at every quantity, not the price they face. Instead write: a specific tax shifts the supply curve vertically upward by the amount of the tax.',
    examMatters: 'Draw (4 marks, WEC11 Appendix 6) requires an accurately labelled diagram, and for a specific tax "accurate" has a measurable meaning: the two curves must be parallel, and the vertical gap must equal the tax per unit.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the description of a specific tax:',
      template: [
        'A specific tax is a fixed sum charged on each ___',
        '→ so it raises the price the producer needs by the same amount at every ___',
        '→ which makes the new curve ___ to the old one',
      ],
      answers: ['unit', 'quantity', 'parallel'],
      hints: ['what the tax is charged per, and what makes it "specific" rather than a percentage', 'the axis along which the gap stays the same size', 'the word for two lines that never converge'],
      distractors: ['price', 'steeper', 'sale'],
    }),
  };
})();

const adValoremTaxes = (() => {
  const sid = subId('indirect-taxes-ad-valorem');
  return {
    id: sid,
    title: 'Indirect Taxes: An Ad Valorem Tax',
    keyIdea: 'An ad valorem tax is a percentage of the price, so the gap it opens grows as price rises — the curve pivots rather than shifting parallel.',
    body: [
      { type: 'paragraph', text: 'The second kind named in 1c-3. An **ad valorem** tax is charged as a percentage of the price rather than as a fixed sum. A sales tax of ' + pc(AD_VALOREM) + ' is an ad valorem tax.' },
      { type: 'paragraph', text: 'The percentage is constant; the money is not. On a cheap unit, ' + pc(AD_VALOREM) + ' is a small sum. On an expensive one it is a large sum. So the vertical gap between the old curve and the new one WIDENS as you move up the diagram.' },
      { type: 'paragraph', text: 'For Kavira the gap is ' + money(adValoremGap(SR, Q0)) + ' at ' + qty(Q0) + ' tiles and ' + money(adValoremGap(SR, Q_LR)) + ' at ' + qty(Q_LR) + ' — the same tax rate, twice the money, because the price at the higher quantity is higher. The curve **pivots**: it stays anchored at the bottom and swings away at the top.' },
      { type: 'paragraph', text: 'That is the whole reason the specification names both kinds. One is a parallel shift and one is a pivot, and a diagram that draws them the same way has lost the distinction.' },
    ],
    realExample: { emoji: '🧾', text: 'Value-added and goods-and-services taxes are charged as a percentage of price, so the tax on a luxury item is many times the tax on an everyday one at the same rate. The rate is what is set; the money collected per unit follows the price.' },
    misconception: 'Students draw an ad valorem tax as a parallel shift, exactly like a specific tax. A percentage of a larger price is a larger sum, so the gap cannot be constant. Instead write: an ad valorem tax pivots the supply curve, with the vertical gap widening as price rises.',
    examMatters: 'Appendix 6 defines Explain (4 marks, WEC11) as requiring knowledge, understanding and application. Applied here, the distinction is not "one is a percentage" but what the percentage does to the diagram: the gap is proportional to price, so the curve pivots.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each kind of indirect tax to what it does to the supply curve:',
      pairs: [
        { left: 'A specific tax', right: 'A parallel shift upward', why: 'The same money is added to every unit whatever its price, so the vertical gap is the same everywhere on the curve' },
        { left: 'An ad valorem tax', right: 'A pivot, widening as price rises', why: 'A fixed percentage of a higher price is more money, so the gap grows as you move up the curve' },
        { left: 'A subsidy', right: 'A shift downward and to the right', why: 'The producer receives money per unit rather than paying it, so it needs less from the buyer at every quantity' },
      ],
      distractors: ['A movement up the existing curve'],
    }),
  };
})();

const subsidies = (() => {
  const sid = subId('government-subsidies');
  return {
    id: sid,
    title: 'Government Subsidies',
    keyIdea: 'A subsidy is a payment to the producer per unit, so it needs less from the buyer at every quantity: the curve shifts down and to the right.',
    body: [
      { type: 'paragraph', text: 'IAL 1.3.3 · 1c-4. A **subsidy** is a payment from the government to the producer, usually a set amount for each unit produced.' },
      { type: 'paragraph', text: 'It is a specific tax in reverse, and the arithmetic is the mirror image. A subsidy of ' + money(SUBSIDY) + ' a tile means Kavira receives ' + money(SUBSIDY) + ' from the government on every tile, so it needs ' + money(SUBSIDY) + ' less from the buyer to be equally well off.' },
      { type: 'paragraph', text: 'At every quantity the price the producer needs falls by ' + money(SUBSIDY) + '. The curve shifts DOWN by the subsidy, which is the same thing as shifting RIGHT: more is offered at every price. Both descriptions name one movement, and either is correct.' },
      { type: 'paragraph', text: 'Governments use subsidies where they want more of something produced than the market would otherwise supply — staple foods, renewable energy, vaccines.' },
    ],
    realExample: { emoji: '🌞', text: 'Several governments have subsidised solar module manufacturing, paying producers for output in order to expand the industry. The effect on the supply curve is the same wherever it is done: producers can accept a lower price from buyers and still cover their costs, so more is offered at every price.' },
    misconception: 'Students say a subsidy increases demand because it makes the good cheaper for buyers. A subsidy paid to producers acts on supply; a cheaper price for buyers is the result, not the mechanism. Instead write: a subsidy lowers the price producers need at every quantity, shifting supply right.',
    examMatters: 'Draw (4 marks, WEC11 Appendix 6) requires an accurately labelled diagram. A subsidy drawn accurately is a downward vertical shift equal to the subsidy per unit — the same measurement as a specific tax, in the other direction.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the effect of a subsidy:',
      template: [
        'A subsidy is a payment from the government to the ___',
        '→ so the price it needs from the buyer at every quantity ___',
        '→ and the supply curve shifts to the ___',
      ],
      answers: ['producer', 'falls', 'right'],
      hints: ['which side of the market receives the payment', 'what happens to the amount the buyer must cover', 'the direction that means more is offered at every price'],
      distractors: ['consumer', 'rises', 'left'],
    }),
  };
})();

const naturalDisasters = (() => {
  const sid = subId('natural-disasters');
  return {
    id: sid,
    title: 'Natural Disasters',
    keyIdea: 'A natural disaster destroys productive capacity, so less can be offered at any price however profitable production would be.',
    body: [
      { type: 'paragraph', text: 'IAL 1.3.3 · 1c-5, and the factor that works differently from the other four. A **natural disaster** — a flood, a drought, an earthquake, a cyclone — does not change what production costs or what it is worth. It removes the ability to produce at all.' },
      { type: 'paragraph', text: 'Crops are destroyed, factories are damaged, roads that carried output to market are cut. Less can be offered at every price, so the curve shifts LEFT — and it shifts left even if the price rises sharply, because willingness was never the constraint.' },
      { type: 'paragraph', text: 'That is the connection to the second half of this topic. A disaster hits the **able** half of "willing and able", and how far supply can recover depends on how quickly capacity can be rebuilt. The next chapters are about exactly that.' },
    ],
    realExample: { emoji: '🌊', text: 'When severe flooding covers a cotton-growing region, the crop in the ground is lost and the supply for that season falls whatever happens to the cotton price. Growers cannot respond to a higher price with cotton that no longer exists.' },
    misconception: 'Students write that a natural disaster raises costs. Some costs do rise, but the binding effect is that output has been destroyed or made impossible. Instead write: a natural disaster removes productive capacity, so less can be supplied at every price regardless of how profitable production would be.',
    examMatters: 'Appendix 6 states that Analyse (6 marks, WEC11) requires any relevant data provided to be interpreted. Where a question gives figures on crop losses or damaged capacity, the chain has to run through those figures rather than beside them.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each factor by which half of "willing and able" it acts on.',
      groups: [
        { name: 'Acts on willingness', why: 'Production is still possible; what has changed is whether it is worth doing at the price on offer', items: ['A specific tax on each unit', 'A subsidy per unit', 'A rise in the cost of materials'] },
        { name: 'Acts on ability', why: 'The capacity to produce has itself been changed, so the price on offer is not the binding constraint', items: ['A flood destroying the crop', 'An earthquake damaging the factory', 'A cyclone cutting the road to market'] },
      ],
    }),
  };
})();

/* ══ Block 3 — Price Elasticity of Supply (1.3.3 · 2a, 2b) ════════════════ */

const whatPesMeasures = (() => {
  const sid = subId('pes-definition-and-formula'); // March id, kept
  return {
    id: sid,
    title: 'What PES Measures',
    keyIdea: 'Price elasticity of supply measures how responsive quantity supplied is to a change in price: the percentage change in quantity supplied divided by the percentage change in price.',
    body: [
      { type: 'paragraph', text: 'The first half of this topic said that a higher price brings a higher quantity supplied. **Price elasticity of supply (PES)** answers the question that leaves open: how much higher?' },
      { type: 'paragraph', text: 'It is a ratio of two percentage changes:' },
      { type: 'flow', steps: ['Percentage change in quantity supplied', 'divided by percentage change in price'], result: 'PES — a number, with no units', resultType: 'neutral' },
      { type: 'paragraph', text: 'Both changes are **percentages**, which is what lets PES compare a tile market with an oil market. And because the supply curve slopes upward, price and quantity move the same way, so PES is normally **positive** — unlike price elasticity of demand, which is normally negative.' },
      { type: 'paragraph', text: 'PES is about **producers**. The mirror-image measure for buyers is price elasticity of demand, and the two are easy to confuse precisely because the formula looks the same.' },
    ],
    realExample: { emoji: '💻', text: 'Building a semiconductor fabrication plant takes years, so when world demand for chips jumps, chipmakers cannot raise output quickly however high the price goes. A low PES is what turns a demand surge into a price surge rather than an output surge.' },
    misconception: 'Students write that PES measures how much producers want to supply. Wanting is not what the number captures; it is the proportional size of the response actually made. Instead write: PES is the percentage change in quantity supplied divided by the percentage change in price.',
    examMatters: 'A Define (2 marks, WEC11 Appendix 6) gives the meaning of a term. For PES that is the responsiveness of quantity supplied to a change in price — and the formula, which is what makes "responsiveness" precise rather than vague.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the definition and the formula:',
      template: [
        'PES measures the responsiveness of quantity ___ to a change in price',
        '→ both halves of the ratio are expressed as a ___ change, which removes the units',
        '→ on an upward-sloping supply curve the value is normally ___',
      ],
      answers: ['supplied', 'percentage', 'positive'],
      hints: ['the word that makes this about producers rather than buyers', 'the kind of change both parts of the ratio use, which is what removes the units', 'the sign, given that price and quantity move the same way'],
      distractors: ['demanded', 'absolute', 'negative'],
    }),
  };
})();

const calculatingPes = (() => {
  const sid = subId('calculating-pes');
  return {
    id: sid,
    title: 'Calculating PES',
    keyIdea: 'Work out each percentage change against its own original value, then divide the quantity percentage by the price percentage.',
    body: [
      { type: 'paragraph', text: 'IAL 1.3.3 · 2b asks for calculation AND interpretation of the value. The calculation is three steps, and the first one is where it usually goes wrong.' },
      { type: 'paragraph', text: 'A percentage change is always measured against the **original** value, not the new one and not the average. Kavira\'s price rises from ' + money(P0) + ' to ' + money(P1) + ': that is a rise of ' + money(P1 - P0) + ' on ' + money(P0) + ', which is ' + pc(PCT_P()) + '. Its output rises from ' + qty(Q0) + ' to ' + qty(Q_SR) + ' tiles a week: a rise of ' + qty(Q_SR - Q0) + ' on ' + qty(Q0) + ', which is ' + pc(PCT_Q_SR()) + '.' },
      { type: 'flow', steps: ['Price ' + money(P0) + ' → ' + money(P1) + ', a rise of ' + pc(PCT_P()), 'Quantity ' + qty(Q0) + ' → ' + qty(Q_SR) + ', a rise of ' + pc(PCT_Q_SR()), pc(PCT_Q_SR()) + ' ÷ ' + pc(PCT_P()) + ' = ' + pesStr(PES_SR())], result: 'PES is ' + pesStr(PES_SR()) + ': below 1, so supply is inelastic', resultType: 'neutral' },
      { type: 'paragraph', text: 'Then interpret it. ' + pesStr(PES_SR()) + ' means the quantity moved proportionally LESS than the price did — Kavira responded, but not in step with the price. A value below 1 always means that.' },
    ],
    realExample: { emoji: '🏘️', text: 'Housing supply responds slowly to price in most large cities: land must be found, permission obtained and the building actually built, so a year of rising prices produces a much smaller percentage rise in completions. The calculation on any such market gives a value below 1.' },
    misconception: 'Students divide the change in quantity by the change in price using the raw numbers rather than the percentages, which gives a figure that depends on the units chosen. Instead write: convert each change to a percentage of its own original value first, then divide.',
    examMatters: 'Appendix 6 defines Calculate (2 or 4 marks, WEC11) as a calculation in several stages from given data, and advises showing workings. The stages are the two percentage changes and the division; writing them down is what allows a partially wrong answer to be credited for the parts that were right.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the calculation into the order it must be done, from first step to last:',
      correctOrder: [
        'Find the change in price and the change in quantity supplied',
        'Express each change as a proportion of its OWN original value',
        'Multiply each by 100 to get two percentage changes',
        'Divide the quantity percentage by the price percentage',
      ],
      why: [
        'Both raw changes are needed before anything can be expressed as a proportion',
        'The original value is the base, and choosing it correctly is what decides whether the answer is right',
        'Converting to percentages is what removes the units and makes the two comparable',
        'The division is last, and the order matters: quantity on top, price underneath',
      ],
    }),
  };
})();

const elasticAndInelastic = (() => {
  const sid = subId('interpreting-pes-values'); // March id, kept
  return {
    id: sid,
    title: 'Elastic and Inelastic Supply',
    keyIdea: 'PES above 1 is elastic supply — quantity moves proportionally more than price. PES below 1 is inelastic supply — quantity moves proportionally less.',
    body: [
      { type: 'paragraph', text: 'The number has to be turned into a sentence about the market, and the dividing line is **1**.' },
      { type: 'bullets', items: [
        '**Elastic supply, PES > 1** — quantity supplied changes by a LARGER percentage than price. Producers can respond readily.',
        '**Inelastic supply, PES < 1** — quantity supplied changes by a SMALLER percentage than price. Producers respond, but sluggishly.',
      ] },
      { type: 'paragraph', text: 'On a diagram, comparing two curves **through the same point**, the flatter one is the more elastic and the steeper one the more inelastic. Both still slope upward: elasticity is about how far the response goes, not about its direction. Slope alone is not the whole story, as the next chapter shows.' },
      { type: 'paragraph', text: 'Kavira with one kiln has PES ' + pesStr(PES_SR()) + ' — inelastic. Give it a second kiln and the same price rise brings ' + qty(Q_LR) + ' tiles instead of ' + qty(Q_SR) + ', PES ' + pesStr(PES_LR()) + ' — elastic. Same firm, same price change: the last chapter is about why.' },
    ],
    realExample: { emoji: '📱', text: 'Digital goods are close to the elastic extreme. Supplying one more copy of a piece of software costs almost nothing, so a publisher can meet a surge in demand without limit — the quantity supplied is barely constrained by anything the price has to overcome.' },
    misconception: 'Students write that inelastic supply means supply does not change at all. That is the special case where PES is exactly zero. Instead write: inelastic supply means the quantity does change, but by a smaller percentage than the price did.',
    examMatters: 'The interpretation is required by the specification content itself — 1.3.3 · 2b asks for "calculation AND interpretation of numerical values" — not by the command word. An interpretation is a sentence about this market: "supply is inelastic, so a rise in demand raises price more than output", rather than a restatement of the arithmetic.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Comparing four supply curves through the same point, put them in order of PES, from the least elastic to the most elastic:',
      correctOrder: [
        'Vertical supply curve: PES = 0',
        'Steep through that point: PES below 1',
        'Straight line through the origin: PES = 1',
        'Shallow through that point: PES above 1',
      ],
      why: [
        'Zero is the floor: quantity does not respond to price at all',
        'Below 1 means a response that is real but proportionally smaller than the price change',
        'Exactly 1 is the dividing line, where the two percentage changes match',
        'Above 1 means the quantity response outruns the price change proportionally',
      ],
    }),
  };
})();

const unitaryElastic = (() => {
  const sid = subId('unitary-elastic-supply');
  return {
    id: sid,
    title: 'Unitary Elastic Supply',
    keyIdea: 'PES of exactly 1 means quantity supplied changes by the same percentage as price — and it is drawn as any straight line through the origin, whatever its slope.',
    body: [
      { type: 'paragraph', text: 'IAL 1.3.3 · 2b-3 names the case on the dividing line. **Unitary elastic supply** is PES = 1: a ' + pc(10) + ' rise in price brings exactly a ' + pc(10) + ' rise in quantity supplied.' },
      { type: 'paragraph', text: 'It has a property worth knowing because it is counter-intuitive. Any straight supply line drawn **through the origin** has PES of exactly 1 — a steep one and a shallow one alike. Steepness is not what decides elasticity for these lines; where the line starts is.' },
      { type: 'paragraph', text: 'The reason is proportion. On a line through the origin, doubling the price doubles the quantity, because both are measured from zero together. That is what PES = 1 says.' },
      { type: 'paragraph', text: 'It follows that a straight supply line which cuts the PRICE axis is elastic along its whole length, and one which cuts the QUANTITY axis is inelastic along its whole length — which is why Kavira\'s two curves behave as they do.' },
    ],
    realExample: { emoji: '📐', text: 'Unitary elasticity is a benchmark rather than a common market. Its use is comparative: it marks the point at which a market stops amplifying price changes into larger output changes and starts damping them.' },
    misconception: 'Students say a steeper supply curve is always more inelastic than a shallower one. That holds when comparing curves at the same point, but every straight line through the origin has PES of 1 however steep it is. Instead write: for straight-line supply curves, which axis the line cuts decides elasticity, not its slope.',
    examMatters: 'Draw (4 marks, WEC11 Appendix 6) may state the type of diagram required or leave the student to decide. Asked for unitary elastic supply, the accurate answer is a straight line from the origin; a steep line that misses the origin is a different elasticity.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each straight supply line to the elasticity it has along its whole length:',
      pairs: [
        { left: 'A line drawn through the origin', right: 'Unitary elastic, PES = 1', why: 'Price and quantity are both measured from zero together, so a given percentage change in one is the same percentage change in the other' },
        { left: 'A line cutting the price axis', right: 'Elastic, PES above 1', why: 'Quantity starts from zero at a positive price, so the proportional quantity response always outruns the proportional price change' },
        { left: 'A line cutting the quantity axis', right: 'Inelastic, PES below 1', why: 'Some quantity is offered even at a price of zero, so the proportional quantity response is always the smaller of the two' },
      ],
      distractors: ['Perfectly inelastic, PES = 0'],
    }),
  };
})();

const theTwoExtremes = (() => {
  const sid = subId('perfectly-elastic-and-perfectly-inelastic');
  return {
    id: sid,
    title: 'The Two Extremes',
    keyIdea: 'Perfectly inelastic supply is vertical: quantity cannot change at all. Perfectly elastic supply is horizontal: any quantity is offered at one price, and none above it.',
    body: [
      { type: 'paragraph', text: 'IAL 1.3.3 · 2b-1 and 2b-5 are the two ends of the range, and each is drawn as a straight line along an unexpected direction.' },
      { type: 'bullets', items: [
        '**Perfectly inelastic supply, PES = 0** — a VERTICAL curve. The quantity is fixed and no price changes it. Seats at a stadium for one match, a plot of land, tickets for a concert already sold out.',
        '**Perfectly elastic supply, PES = ∞** — a HORIZONTAL curve. At one price producers will supply any quantity asked for; a fraction above it they would supply the world, and a fraction below it they supply nothing.',
      ] },
      { type: 'paragraph', text: 'Perfectly inelastic supply is the easier of the two to meet in real markets, at least over a short period: anything whose quantity is physically fixed for now behaves this way.' },
      { type: 'paragraph', text: 'Perfectly elastic supply is a model rather than a market. It describes a very small producer in a very large market — one that can sell as much as it likes at the going price and nothing at all above it.' },
    ],
    realExample: { emoji: '🎟️', text: 'A stadium has the number of seats it has. However far ticket prices rise for a final, not one more seat appears in the ground that evening, so supply for that match is vertical.' },
    misconception: 'Students draw perfectly inelastic supply as a very steep upward line and perfectly elastic as a very shallow one. Those are ordinary inelastic and elastic supply. Instead write: perfectly inelastic supply is exactly vertical and perfectly elastic supply is exactly horizontal.',
    examMatters: 'Appendix 6 defines Draw (4 marks, WEC11) as requiring an accurately labelled diagram, and here accuracy is the difference between steep and vertical. A perfectly inelastic curve that leans is a different elasticity from the one asked for.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each market into the extreme its supply is closest to over the period stated.',
      groups: [
        { name: 'Close to perfectly inelastic', why: 'The quantity is physically fixed for the period in question, so no price can bring more of it', items: ['Seats at a stadium for one match', 'Land in a city centre', 'A painting by an artist who has died'] },
        { name: 'Close to perfectly elastic', why: 'The producer is small enough in a large market to sell any quantity at the going price, and none above it', items: ['One farm selling wheat on a world market', 'One small supplier of a standard screw', 'One stallholder selling a standard grade of rice'] },
      ],
    }),
  };
})();

/* ══ Block 4 — What Determines PES (1.3.3 · 2c-1 … 2c-5) ══════════════════ */

const theTimePeriod = (() => {
  const sid = subId('the-time-period');
  return {
    id: sid,
    title: 'The Time Period',
    keyIdea: 'The more time producers have to respond to a price change, the more they can do about it — which makes time the determinant every other one runs through.',
    body: [
      { type: 'paragraph', text: 'The first of the five factors in 1.3.3 · 2c, and the one that governs the rest. **Time** decides which responses are available.' },
      { type: 'paragraph', text: 'Each response takes its own amount of time to arrange, and the period available decides which are on the table at all.' },
      { type: 'flow', steps: ['Sell stock that is already made', 'Run overtime shifts on existing machines', 'Hire and train additional staff', 'Build and commission a second factory'], result: 'The longer the period, the more of these are available — so PES measured over it is larger', resultType: 'good' },
      { type: 'paragraph', text: 'Given an hour, only the first is possible. Given a month, the second and third are. Given three years, so is the fourth — and each one is a larger response to the same price rise.' },
      { type: 'paragraph', text: 'Every other determinant in this chapter is really a statement about what can be changed within the period in question. That is why the specification returns to time in 1.3.3 · 2d, and why the last chapter of this topic is about nothing else.' },
    ],
    realExample: { emoji: '🛢️', text: 'US shale producers can restart idle rigs within months of a price rise, which is fast for oil. Conventional offshore fields take years from decision to first production. Same commodity, same price signal: the supply response differs because the time each needs differs.' },
    misconception: 'Students write that supply is inelastic in the short run and elastic in the long run as though these were two fixed settings. They are the ends of a continuum, and where a market sits depends on what it takes to change output there. Instead write: the longer the period, the more of the firm\'s constraints can be altered, so the more elastic supply becomes.',
    examMatters: 'Appendix 6 states that Analyse (6 marks, WEC11) focuses on depth rather than breadth. Where a question gives a time frame, the time frame is the analysis: the same market has different answers over a week and over a decade, and saying which applies is the point.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put these responses to a price rise in order of how long each takes to arrange, from soonest to latest:',
      correctOrder: [
        'Sell stock that is already made',
        'Run overtime shifts on existing machines',
        'Hire and train additional staff',
        'Build and commission a second factory',
      ],
      why: [
        'Finished stock needs no production decision at all, only a decision to release it',
        'Overtime uses equipment the firm already has, so it needs agreement rather than investment',
        'New staff must be found and trained before they add to output',
        'New capacity is the slowest response and the one that changes what the firm can ever produce',
      ],
    }),
  };
})();

const stockAndPerishability = (() => {
  const sid = subId('availability-of-stock-and-perishability');
  return {
    id: sid,
    title: 'Availability of Stock and Perishability',
    keyIdea: 'A firm holding stock of a good that keeps can meet a price rise immediately from the warehouse; a firm whose output perishes has no such reserve, so its supply is inelastic.',
    body: [
      { type: 'paragraph', text: 'IAL 1.3.3 · 2c-2 names this factor and, like the other four, does not explain it. It is two sides of one question: **can output be stored?**' },
      { type: 'paragraph', text: '**Availability of stock.** A firm with finished goods in a warehouse can answer a price rise the same day, without producing anything. Stock is a reserve of supply already made, and it makes supply more elastic in the short period where producing more is not yet possible.' },
      { type: 'paragraph', text: '**Perishability** is the absence of that option. A good that spoils cannot be held back for a better price, and cannot be accumulated in advance. Fresh fish, cut flowers, milk and ripe fruit must be sold close to when they are produced, whatever the price that day.' },
      { type: 'paragraph', text: 'Storage costs money even where it is possible — a warehouse, refrigeration, capital tied up in goods not yet sold — so a firm holds stock only where the benefit of being able to respond is worth that cost.' },
      { type: 'paragraph', text: 'Note the direction carefully: stock that can be held makes supply MORE elastic, and perishability makes it LESS.' },
    ],
    realExample: { emoji: '🐟', text: 'A fresh fish market must clear its catch the day it lands, so a higher price cannot bring more fish that afternoon. Frozen fish from the same waters can be held for months and released when prices are high, which makes the frozen market far more responsive than the fresh one.' },
    misconception: 'Students treat stock as the same thing as supply. Stock is a quantity held; supply is a rate offered at each price. Instead write: stock is a reserve that makes supply more responsive, because it can be released without producing anything new.',
    examMatters: 'Appendix 6 defines Explain (4 marks, WEC11) as requiring application as well as knowledge. Applied means naming what this good\'s storability actually is — whether it spoils, how long it keeps, what storing it costs — rather than reciting the factor in the abstract.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the two sides of this determinant:',
      template: [
        'A firm holding ___ of finished goods can answer a price rise without producing anything',
        '→ a good that spoils quickly is described as ___',
        '→ so perishability makes supply more ___',
      ],
      answers: ['stock', 'perishable', 'inelastic'],
      hints: ['finished output held back rather than sold, which acts as a reserve', 'the adjective the specification uses for a good that cannot be kept', 'the word for a response proportionally smaller than the price change'],
      distractors: ['capacity', 'durable', 'elastic'],
    }),
  };
})();

const mobilityOfFactors = (() => {
  const sid = subId('mobility-of-factors-of-production');
  return {
    id: sid,
    title: 'Mobility of Factors of Production',
    keyIdea: 'Supply is elastic where labour and equipment can be moved into producing this good, and inelastic where the factors needed are specialised and cannot be redeployed quickly.',
    body: [
      { type: 'paragraph', text: 'IAL 1.3.3 · 2c-3. **Mobility of factors of production** asks whether the land, labour and capital that producing more would need can actually be brought in.' },
      { type: 'paragraph', text: 'Mobility comes in two forms, and both matter here.' },
      { type: 'bullets', items: [
        '**Occupational mobility** — whether a worker or a machine can switch to a different kind of work. General skills and general-purpose equipment are occupationally mobile; a specialist is not.',
        '**Geographical mobility** — whether they can move to where the work is. Housing, family and licensing all slow this down.',
      ] },
      { type: 'paragraph', text: 'Where factors are mobile, a price rise pulls them in from elsewhere and output expands: supply is elastic. Where the work needs years of training or equipment built for one purpose, a higher price cannot conjure them, and supply is inelastic however profitable production becomes.' },
    ],
    realExample: { emoji: '🚢', text: 'A shipyard needs welders qualified for structural work, and reaching that standard takes years of training. A shipbuilding boom cannot draw in general labourers to do it, so output rises slowly even when orders and prices are strong.' },
    misconception: 'Students read mobility as being about transport — moving the finished product to market. It is about moving the FACTORS into producing it. Instead write: mobility of factors is whether the labour and capital needed can be switched into this use, occupationally or geographically.',
    examMatters: 'An Examine (8 marks, WEC11 Appendix 6) requires a chain of reasoning and a brief assessment of the factors. Assessment here means saying which constraint actually binds in the market given — specialised labour, specialised equipment, or neither.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each input by whether it can be switched quickly into producing something else.',
      groups: [
        { name: 'Mobile: supply is more elastic', why: 'The input is general enough to be redeployed into another use within the period in question', items: ['A delivery van', 'A general warehouse', 'A worker doing packing'] },
        { name: 'Immobile: supply is more inelastic', why: 'The input was made or trained for one purpose, so a higher price elsewhere cannot draw it across', items: ['A certified structural welder', 'A purpose-built tile kiln', 'An oil refinery'] },
      ],
    }),
  };
})();

const legalConstraints = (() => {
  const sid = subId('legal-constraints');
  return {
    id: sid,
    title: 'Legal Constraints',
    keyIdea: 'Where the law caps how much may be produced, output cannot rise with price however profitable it becomes: supply is inelastic by rule rather than by cost.',
    body: [
      { type: 'paragraph', text: 'IAL 1.3.3 · 2c-4, and the factor the specification names most briefly. A **legal constraint** is a rule that limits output directly, rather than making it more expensive.' },
      { type: 'paragraph', text: 'The forms it takes are worth knowing, because a question will describe one rather than name the factor:' },
      { type: 'bullets', items: [
        '**A quota** — a ceiling on the quantity that may be produced or caught, as with fishing quotas set for a season.',
        '**A licence** — permission required before producing at all, issued in limited numbers, as with taxi plates or broadcasting licences.',
        '**Planning permission** — consent required before building, which is why housing supply responds slowly to price almost everywhere.',
        '**A ban or restriction on an input** — a rule that forbids a material or a method, closing off the cheaper way of expanding output.',
      ] },
      { type: 'paragraph', text: 'What makes these different from a cost is that money cannot solve them. A firm that would gladly produce more, and could, is simply not permitted to. Supply is inelastic by rule — and because rules can be changed, this is one route by which supply becomes more elastic in the long run.' },
    ],
    realExample: { emoji: '🚕', text: 'Cities that cap the number of taxi licences hold the number of licensed cabs fixed whatever fares do. A fare rise makes each licence more valuable, but it does not put another licensed taxi on the road until the city issues one.' },
    misconception: 'Students treat regulation as just another cost that shifts supply left. A cost changes what is worth producing; a legal cap changes what is permitted, and no price overcomes it. Instead write: a legal constraint limits the quantity that may be produced, so supply cannot respond to price within that limit.',
    examMatters: 'Appendix 6 states that Analyse (6 marks, WEC11) requires relevant data provided to be interpreted. Where an extract gives a quota figure or a number of licences, that figure is the constraint the analysis has to work from.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each legal constraint to the market whose supply it makes inelastic:',
      pairs: [
        { left: 'A seasonal catch quota', right: 'Fishing', why: 'The quota caps the tonnage that may be landed, so a higher fish price cannot bring more of it ashore that season' },
        { left: 'A limited number of licences', right: 'Taxis in a city', why: 'Only licence-holders may operate, so the number of cabs is fixed until the authority issues more' },
        { left: 'Planning permission to build', right: 'Housing', why: 'Land cannot be built on until consent is granted, which is why completions respond to price slowly almost everywhere' },
      ],
      distractors: ['Software downloads'],
    }),
  };
})();

const capacity = (() => {
  const sid = subId('factors-influencing-pes'); // March id, kept
  return {
    id: sid,
    title: 'Capacity',
    keyIdea: 'A firm with spare capacity can raise output quickly and cheaply, so its supply is elastic; a firm already running flat out can only expand by adding capacity, which takes time.',
    body: [
      { type: 'paragraph', text: 'IAL 1.3.3 · 2c-5, the last of the five, and the one that decides how the other four apply right now. **Capacity** is the maximum output the firm\'s existing resources can produce. **Spare capacity** is the gap between that and what it is currently producing.' },
      { type: 'paragraph', text: 'A firm with spare capacity is the elastic case. It can raise output using equipment it already owns, so a price rise brings a large response quickly and at little extra cost.' },
      { type: 'paragraph', text: 'A firm at **full capacity** is the inelastic case. There is no more output to be had from what it has; the only way up is to add capacity, and that takes the time this chapter began with.' },
      { type: 'paragraph', text: 'That is Kavira exactly. One kiln at full stretch answered ' + pc(PCT_P()) + ' on price with ' + pc(PCT_Q_SR()) + ' on quantity — PES ' + pesStr(PES_SR()) + '. A second kiln turns the same price rise into ' + pc(PCT_Q_LR()) + ' — PES ' + pesStr(PES_LR()) + '. Nothing changed but the capacity available.' },
    ],
    realExample: { emoji: '🏨', text: 'A hotel with empty rooms can fill them at short notice when a large event comes to the city. A hotel already fully booked cannot take one more guest at any price, and building more rooms is a project of years rather than weeks.' },
    misconception: 'Students say that a large firm has elastic supply because it can produce a lot. Size is not the same as spare capacity: a very large firm running flat out is at the inelastic end. Instead write: what makes supply elastic is unused capacity, not total capacity.',
    examMatters: 'Appendix 6 defines Examine (8 marks, WEC11) as requiring a brief assessment of the factors. With five determinants available, assessment means judging which one binds in the market described rather than working through all five.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the effect of capacity on PES:',
      template: [
        'The gap between what a firm produces and what it could produce is called ___ capacity',
        '→ a firm with it can raise output quickly, so its supply is ___',
        '→ a firm at ___ capacity can only expand by adding more, which takes time',
      ],
      answers: ['spare', 'elastic', 'full'],
      hints: ['the word for capacity sitting unused', 'the word for a quantity response proportionally larger than the price change', 'the state in which no further output is possible from existing resources'],
      distractors: ['total', 'inelastic', 'fixed'],
    }),
  };
})();

/* ══ Block 5 — The Short Run and the Long Run (1.3.3 · 2d) ════════════════ */

const theShortRun = (() => {
  const sid = subId('short-run-production'); // March id, kept
  return {
    id: sid,
    title: 'What the Short Run Means',
    keyIdea: 'The short run is the period in which at least one factor of production cannot be changed, so output can only be varied within the capacity the firm already has.',
    body: [
      { type: 'paragraph', text: 'IAL 1.3.3 · 2d asks for the distinction between the short run and the long run **in economics**, and the phrase matters: these are not lengths of time. They are defined by what can be changed.' },
      { type: 'paragraph', text: 'The **short run** is the period in which at least one factor of production is fixed. The firm can vary the others — hours worked, materials ordered, staff on shift — but it cannot alter the fixed one.' },
      { type: 'paragraph', text: 'For Kavira the fixed factor is the kiln. In the short run it can buy more clay, pay a weekend shift and run the kiln harder, and that is how ' + qty(Q0) + ' tiles became ' + qty(Q_SR) + '. What it cannot do is fire tiles in a kiln it does not have.' },
      { type: 'paragraph', text: 'How LONG the short run lasts therefore differs by industry. For a market stall it may be a day. For a power station or a shipyard it may be a decade. The definition is about the constraint, not the calendar.' },
    ],
    realExample: { emoji: '🏭', text: 'A car plant can add a night shift within weeks, but the assembly line itself is fixed until a new one is built. Everything the plant can do in response to demand while that line is its ceiling is happening in the short run.' },
    misconception: 'Students define the short run as a fixed length of time, often a year. It is defined by the presence of a fixed factor, and that lasts as long as the factor takes to change. Instead write: the short run is the period in which at least one factor of production cannot be varied.',
    examMatters: 'A Define (2 marks, WEC11 Appendix 6) requires the meaning of the term. For the short run, the meaning is the fixed factor — a definition given in months or years does not state what the term actually means.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the definition of the short run:',
      template: [
        'The short run is the period in which at least one factor of production is ___',
        '→ the firm can still vary the ___ factors, such as hours worked and materials',
        '→ so output changes only within the ___ the firm already has',
      ],
      answers: ['fixed', 'variable', 'capacity'],
      hints: ['the property of the factor that defines the period', 'the term for the factors that can still be adjusted', 'the ceiling on output set by the fixed factor'],
      distractors: ['scarce', 'mobile', 'market'],
    }),
  };
})();

const theLongRun = (() => {
  const sid = subId('long-run-production-and-returns-to-scale'); // March id, kept
  return {
    id: sid,
    title: 'What the Long Run Means',
    keyIdea: 'The long run is the period in which every factor of production can be varied, so the firm can change what it is able to produce, not only how much of it.',
    body: [
      { type: 'paragraph', text: 'The other half of 2d. The **long run** is the period in which ALL factors of production can be varied. Nothing is fixed.' },
      { type: 'paragraph', text: 'That is a change in kind, not merely in degree. In the short run the firm chooses how much to produce within a capacity it has. In the long run it chooses what that capacity is: a second kiln, a second factory, a new location, a different process.' },
      { type: 'paragraph', text: 'The long run begins when the last fixed factor becomes variable. For Kavira it begins when the second kiln is commissioned, which is when ' + money(P1) + ' a tile starts bringing ' + qty(Q_LR) + ' tiles a week instead of ' + qty(Q_SR) + '.' },
      { type: 'paragraph', text: 'Firms can also LEAVE in the long run, and new firms can enter — which is the market-level version of the same freedom, and part of why market supply is more elastic over longer periods than any one firm\'s.' },
    ],
    realExample: { emoji: '⛏️', text: 'Opening a new iron ore mine takes years: surveying, permits, rail and port capacity, then construction. Once those decisions are taken the industry\'s capacity itself has changed, which is what makes them long-run decisions rather than large short-run ones.' },
    misconception: 'Students treat the long run as simply "a long time from now", so nothing has to be said about what changed. Instead write: the long run is the period in which every factor can be varied, so the firm can change its capacity rather than only its use of existing capacity.',
    examMatters: 'Appendix 6 defines Explain (4 marks, WEC11) as requiring a two-stage chain when a reason or impact is asked for. "In the long run all factors are variable" is stage one; "so the firm can add capacity and meet a price rise with a much larger output response" is stage two.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each decision by whether it is available in the short run or only in the long run.',
      groups: [
        { name: 'Available in the short run', why: 'It uses the capacity the firm already has, varying only the factors that can be changed now', items: ['Adding a weekend shift', 'Ordering more clay', 'Releasing stock from the warehouse'] },
        { name: 'Only in the long run', why: 'It changes the capacity itself, which is the factor that was fixed', items: ['Commissioning a second kiln', 'Opening a factory abroad', 'Leaving the industry entirely'] },
      ],
    }),
  };
})();

const whySupplyIsMoreElasticLongRun = (() => {
  const sid = subId('why-supply-is-more-elastic-in-the-long-run');
  return {
    id: sid,
    title: 'Why Supply Is More Elastic in the Long Run',
    keyIdea: 'Every determinant of PES loosens when the fixed factor becomes variable, so the same price rise brings a larger proportional output response.',
    body: [
      { type: 'paragraph', text: 'IAL 1.3.3 · 2d does not stop at the distinction. It asks for **its significance for price elasticity of supply**, and the significance is that each of the five determinants changes when the short run becomes the long run.' },
      { type: 'bullets', items: [
        '**Capacity** — the binding one. What was full capacity can be added to, so the ceiling on output moves.',
        '**Mobility of factors** — workers can be trained and specialised equipment can be built, so factors that could not be moved now can.',
        '**Legal constraints** — permissions can be applied for and granted, and quotas can be renegotiated.',
        '**Stock** — a firm that expects to need a reserve has time to build one.',
      ] },
      { type: 'paragraph', text: 'None of those is available on Monday when the price rises on Sunday. Each becomes available given enough time, and each one enlarges the response the firm can make. So PES rises as the period lengthens.' },
      { type: 'paragraph', text: 'It is also why the market response outlasts the firm response: over a long enough period, high prices bring NEW firms into the industry, which no single firm\'s capacity decision captures.' },
    ],
    realExample: { emoji: '🌴', text: 'An oil palm planted today yields nothing for several years. A price rise cannot bring more fruit from existing trees beyond what the harvest allows, but it does decide how much is planted — and that planting is what makes the supply response over a decade far larger than the response over a season.' },
    misconception: 'Students explain long-run elasticity only by saying firms have more time. More time matters because of what it makes possible. Instead write: given time, capacity can be added, factors can be trained or built and permissions obtained, so each constraint on the response is loosened.',
    examMatters: 'Appendix 6 states that Examine (8 marks, WEC11) requires a chain of reasoning plus a brief assessment. Assessment here is saying WHICH constraint binds in the market given and how long it would take to loosen — the answer differs between a bakery and a copper mine.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each short-run constraint to what loosens it in the long run:',
      pairs: [
        { left: 'Running at full capacity', right: 'New capacity can be built', why: 'The fixed factor becomes variable, which is precisely what defines the long run' },
        { left: 'Specialised labour cannot be found', right: 'Workers can be trained', why: 'Training takes time rather than money alone, so the constraint is a short-run one' },
        { left: 'No permission to build', right: 'Permission can be applied for', why: 'A legal constraint is a rule rather than a cost, and rules can be changed or granted over time' },
      ],
      distractors: ['The price can be raised further'],
    }),
  };
})();

const oneRiseTwoHorizons = (() => {
  const sid = subId('one-price-rise-two-time-horizons');
  return {
    id: sid,
    title: 'One Price Rise, Two Time Horizons',
    keyIdea: 'The same firm, the same price rise and the same starting output give PES ' + pesStr(PES_SR()) + ' in the short run and ' + pesStr(PES_LR()) + ' in the long run — the distinction made as arithmetic.',
    body: [
      { type: 'paragraph', text: 'Everything in this chapter comes together in one calculation done twice. Kavira\'s price rises from ' + money(P0) + ' to ' + money(P1) + ' a tile: a rise of ' + pc(PCT_P()) + ' in both cases.' },
      { type: 'flow', steps: ['Short run, one kiln: ' + qty(Q0) + ' → ' + qty(Q_SR) + ' tiles, a rise of ' + pc(PCT_Q_SR()), pc(PCT_Q_SR()) + ' ÷ ' + pc(PCT_P()) + ' = ' + pesStr(PES_SR()) + ', inelastic'], result: 'Output responded proportionally less than the price', resultType: 'bad' },
      { type: 'flow', steps: ['Long run, a second kiln: ' + qty(Q0) + ' → ' + qty(Q_LR) + ' tiles, a rise of ' + pc(PCT_Q_LR()), pc(PCT_Q_LR()) + ' ÷ ' + pc(PCT_P()) + ' = ' + pesStr(PES_LR()) + ', elastic'], result: 'Output responded proportionally more than the price', resultType: 'good' },
      { type: 'paragraph', text: 'Nothing about the price change differs between the two. Nothing about the firm differs except how much time it had, and therefore whether the kiln was still a fixed factor. That is the whole of 2d in two lines of arithmetic.' },
      { type: 'paragraph', text: 'The consequence reaches beyond this topic. A market with inelastic short-run supply meets a rise in demand mostly with price; the same market meets it mostly with output once supply has had time to respond.' },
    ],
    realExample: { emoji: '🔋', text: 'Lithium supply behaved this way through the battery boom: prices rose far more than output at first, because mines take years to open. As new capacity came on stream the output response caught up, and prices gave back much of the rise.' },
    misconception: 'Students quote PES as a property of a good, as though tiles or oil simply "have" an elasticity. The same good has different values over different periods. Instead write: PES is measured over a stated period, and the period has to be named for the value to mean anything.',
    examMatters: 'Appendix 6 defines Calculate (2 or 4 marks, WEC11) as a calculation in several stages from given data, and advises showing workings. Where data covers two periods, the same three stages are done twice and the comparison is the interpretation.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the two calculations into the order the chapter works them, from the first step to the conclusion:',
      correctOrder: [
        'Price rises ' + money(P0) + ' → ' + money(P1) + ': ' + pc(PCT_P()) + ' in both periods',
        'Short run: quantity rises ' + pc(PCT_Q_SR()) + ', so PES is ' + pesStr(PES_SR()),
        'Long run: quantity rises ' + pc(PCT_Q_LR()) + ', so PES is ' + pesStr(PES_LR()),
        'Only the time available differed, so time is what changed the elasticity',
      ],
      why: [
        'The price change is common to both, so it is established once before either calculation',
        'The short run comes first because it is the period in which the kiln is still fixed',
        'The long run is the same sum with the quantity response the second kiln allows',
        'The conclusion is the comparison: nothing else about the firm or the price was different',
      ],
    }),
  };
})();

/* ══ the five blocks ═══════════════════════════════════════════════════════ */

const BLOCKS = [
  {
    title: B1,
    sections: [whatSupplyMeans, whyTheCurveSlopesUp, movementsAlong, shiftsOfCurve],
    takeaway: [
      'Supply is what producers will offer at EACH price, per period — not a stock.',
      'The curve slopes up because expanding output draws in dearer resources.',
      "A change in the good's own price is a movement along the curve.",
      'A change in anything else shifts the whole curve: right for an increase.',
    ],
  },
  {
    title: B2,
    sections: [costsOfProduction, newTechnology, specificTaxes, adValoremTaxes, subsidies, naturalDisasters],
    takeaway: [
      'Costs of production, new technology, indirect taxes, subsidies and natural disasters.',
      'A specific tax shifts the curve up in parallel by the tax per unit.',
      'An ad valorem tax pivots it, because the gap grows with price.',
      'Always name the direction of the shift, not only the factor.',
    ],
  },
  {
    title: B3,
    sections: [whatPesMeasures, calculatingPes, elasticAndInelastic, unitaryElastic, theTwoExtremes],
    takeaway: [
      'PES = % change in quantity supplied ÷ % change in price, normally positive.',
      'Each percentage change is measured against its OWN original value.',
      'Above 1 is elastic, below 1 is inelastic, exactly 1 is unitary elastic.',
      'Perfectly inelastic is vertical; perfectly elastic is horizontal.',
    ],
  },
  {
    title: B4,
    sections: [theTimePeriod, stockAndPerishability, mobilityOfFactors, legalConstraints, capacity],
    takeaway: [
      'Time, stock and perishability, factor mobility, legal constraints, capacity.',
      'Every one of them is a question about whether the firm CAN respond.',
      'Stock makes supply more elastic; perishability makes it less.',
      'Spare capacity makes supply elastic — total size does not.',
    ],
  },
  {
    title: B5,
    sections: [theShortRun, theLongRun, whySupplyIsMoreElasticLongRun, oneRiseTwoHorizons],
    takeaway: [
      'The short run has at least one fixed factor; the long run has none.',
      'They are defined by what can be changed, never by a length of time.',
      'Every PES determinant loosens once the fixed factor becomes variable.',
      'Same firm, same ' + pc(PCT_P()) + ' price rise: PES ' + pesStr(PES_SR()) + ' then ' + pesStr(PES_LR()) + '.',
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
 * Five Notes topics, one per Learn Mode chapter, so `depth.notes-titles` has a title to match each.
 * Notes carry the specification's own phrasing where the coverage rule needs it (packet 14's rule):
 * `spec.uncovered` is lexical, so each leaf is worded here as econ_spec.txt:656-687 words it, and the
 * sentence must still teach.
 */
const def = (text) => ({ type: 'def', text });
const mech = (text) => ({ type: 'mech', text });
const exam = (text) => ({ type: 'imp', text, tag: 'exam' });
const link = (text) => ({ type: 'link', text });

export const NOTES = [
  {
    title: B1,
    meta: '2 leaves',
    keyIdea: "The concept of 'supply', and the distinction between movements along a supply curve and shifts of a supply curve.",
    blocks: [
      { title: 'DEFINITIONS', items: [
        def("<strong>Supply</strong> — the quantity of a good producers are willing and able to offer for sale at a given price in a given time period."),
        def('<strong>Law of supply</strong> — ceteris paribus, a rise in the price of a good raises the quantity supplied of it.'),
        def('<strong>Extension and contraction of supply</strong> — a movement UP or DOWN an existing curve, caused by a change in the good\'s own price.'),
        def('<strong>Increase and decrease in supply</strong> — a shift of the whole curve RIGHT or LEFT, caused by a change in anything other than the price.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('The curve slopes upward because expanding output draws in resources that cost more per unit, so a higher price is needed before the extra units are worth producing.'),
        mech('The test for a shift is a question about ONE price: hold the price still and ask whether more or less is now offered.'),
        link('Quantity supplied changes in a movement; supply changes in a shift. The vocabulary carries the distinction 1b asks for.'),
      ] },
    ],
    takeaway: [
      'Supply is a rate offered at each price, not a quantity held.',
      "Only the good's own price causes a movement along the curve.",
      'An increase in supply is a shift to the right.',
    ],
  },
  {
    title: B2,
    meta: '5 leaves',
    keyIdea: 'Factors that may cause a shift in the supply curve: changes in the costs of production, the introduction of new technology, indirect taxes (specific and ad valorem), government subsidies and natural disasters.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Costs of production</strong> — what the firm pays for its inputs: wages, materials, energy, rent and transport.'),
        def('<strong>Indirect tax</strong> — a tax on a good rather than on income, charged either as a <strong>specific</strong> sum per unit or <strong>ad valorem</strong>, as a percentage of price.'),
        def('<strong>Government subsidy</strong> — a payment to the producer per unit, which lowers the price it needs from the buyer.'),
        def('<strong>Natural disaster</strong> — a flood, drought, earthquake or storm that destroys productive capacity, so less can be supplied at any price.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('<strong>Changes in the costs of production</strong> work through profitability at the existing price: higher costs mean some output is no longer worth producing, so the curve shifts left.'),
        mech('<strong>The introduction of new technology</strong> raises output from the same inputs, lowering cost per unit and shifting the curve right.'),
        mech(`A <strong>specific</strong> tax of ${money(SPECIFIC_TAX)} shifts the curve up by ${money(SPECIFIC_TAX)} at every quantity: a PARALLEL shift. An <strong>ad valorem</strong> tax of ${pc(AD_VALOREM)} opens a gap that grows with price — ${money(adValoremGap(SR, Q0))} at ${qty(Q0)} tiles and ${money(adValoremGap(SR, Q_LR))} at ${qty(Q_LR)} — so the curve PIVOTS.`),
        exam('Draw (4 marks, WEC11 Appendix 6) requires an accurately labelled diagram, and for a tax that means the vertical gap equals the tax per unit.'),
      ] },
    ],
    takeaway: [
      'Five factors, and four of them work through costs of production.',
      'Specific tax: parallel shift. Ad valorem tax: pivot.',
      'A natural disaster removes the ability to supply, not the willingness.',
    ],
  },
  {
    title: B3,
    meta: '6 leaves',
    keyIdea: "The concept of 'price elasticity of supply', and the calculation and interpretation of numerical values: perfectly elastic supply, elastic supply, unitary elastic supply, inelastic supply and perfectly inelastic supply.",
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Price elasticity of supply (PES)</strong> — the responsiveness of quantity supplied to a change in price: the percentage change in quantity supplied divided by the percentage change in price.'),
        def('<strong>Elastic supply</strong> — PES above 1: quantity supplied changes by a larger percentage than price. <strong>Inelastic supply</strong> — PES below 1: it changes by a smaller percentage.'),
        def('<strong>Unitary elastic supply</strong> — PES exactly 1, drawn as any straight line through the origin.'),
        def('<strong>Perfectly inelastic supply</strong> — PES 0, a vertical curve. <strong>Perfectly elastic supply</strong> — PES infinite, a horizontal curve.'),
      ] },
      { title: 'CALCULATION', items: [
        mech(`Each percentage change is measured against its OWN original value. Kavira: price ${money(P0)} → ${money(P1)} is ${pc(PCT_P())}; quantity ${qty(Q0)} → ${qty(Q_SR)} is ${pc(PCT_Q_SR())}; PES = ${pc(PCT_Q_SR())} ÷ ${pc(PCT_P())} = ${pesStr(PES_SR())}.`),
        mech('PES is normally positive, because the supply curve slopes upward and price and quantity move the same way.'),
        link('For straight lines, the axis the line cuts decides elasticity: the price axis means elastic throughout, the quantity axis means inelastic throughout, the origin means exactly 1.'),
        exam('Calculate (2 or 4 marks, WEC11 Appendix 6) is a calculation in several stages from given data, and Appendix 6 advises showing workings.'),
      ] },
    ],
    takeaway: [
      'PES = % change in quantity supplied ÷ % change in price.',
      'Percentages are taken against the original value, never the new one.',
      'Vertical is PES 0; horizontal is infinite; through the origin is 1.',
    ],
  },
  {
    title: B4,
    meta: '5 leaves',
    keyIdea: 'Factors that influence price elasticity of supply: the time period, availability of stock/perishability, mobility of factors of production, legal constraints and capacity.',
    blocks: [
      { title: 'THE FIVE FACTORS', items: [
        def('<strong>The time period</strong> — the longer producers have, the more of their constraints can be altered, so the more elastic supply becomes.'),
        def('<strong>Availability of stock/perishability</strong> — stock of finished goods is a reserve that can be released without producing anything, making supply elastic; a good that spoils cannot be held, making it inelastic.'),
        def('<strong>Mobility of factors of production</strong> — whether labour and capital can be switched into this use, occupationally or geographically. Specialised factors cannot be, so supply is inelastic.'),
        def('<strong>Legal constraints</strong> — quotas, licences, planning permission or bans on an input, which cap output by rule rather than by cost, so no price overcomes them.'),
        def('<strong>Capacity</strong> — spare capacity allows a quick, cheap output response; a firm at full capacity can expand only by adding capacity.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Every one of the five is a question about whether the firm CAN respond, not whether it would like to.'),
        link('Each is also a statement about a period: all five loosen given enough time, which is why the time period governs the other four.'),
        exam('Examine (8 marks, WEC11 Appendix 6) requires a chain of reasoning and a brief assessment — which constraint binds in the market given, rather than all five listed.'),
      ] },
    ],
    takeaway: [
      'Time, stock/perishability, factor mobility, legal constraints, capacity.',
      'Spare capacity is what makes supply elastic, not firm size.',
      'A legal constraint is a rule, so money cannot solve it.',
    ],
  },
  {
    title: B5,
    meta: '1 leaf',
    keyIdea: 'The distinction between the short run and long run in economics and its significance for price elasticity of supply.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Short run</strong> — the period in which at least one factor of production is fixed, so output varies only within existing capacity.'),
        def('<strong>Long run</strong> — the period in which all factors of production are variable, so capacity itself can be changed and firms can enter or leave.'),
        def('Neither is a length of time. Both are defined by what can be changed, so the short run lasts a day for a market stall and a decade for a power station.'),
      ] },
      { title: 'SIGNIFICANCE FOR PES', items: [
        mech(`The same price rise, worked twice for the same firm: ${money(P0)} → ${money(P1)} is ${pc(PCT_P())} in both. Short run ${qty(Q0)} → ${qty(Q_SR)} tiles, ${pc(PCT_Q_SR())}, PES ${pesStr(PES_SR())} — inelastic. Long run ${qty(Q0)} → ${qty(Q_LR)}, ${pc(PCT_Q_LR())}, PES ${pesStr(PES_LR())} — elastic.`),
        mech('Every determinant loosens when the fixed factor becomes variable: capacity can be added, factors trained or built, permissions obtained, stock accumulated.'),
        link('At market level the long run also admits NEW firms, so market supply is more elastic over long periods than any one firm\'s.'),
        exam('A value quoted without its period means nothing: the same good has different values over a week and over a decade.'),
      ] },
    ],
    takeaway: [
      'Short run: at least one fixed factor. Long run: none.',
      'Defined by what can change, never by the calendar.',
      'PES rises with the period because every constraint loosens.',
    ],
  },
];
