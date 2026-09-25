/**
 * PACKET 18 — the-market, Learn Mode content and Notes.
 *
 * Business Unit 1 (WBS11), IAL topic 1.3.2 The market, audit/raw/bus_spec.txt:551-595. Five blocks in
 * the specification's own order — demand, supply, the two together, PED, YED — and one subsection per
 * idea, so no step carries two: eleven crowded steps become twenty-six small ones, plus five check-ins.
 *
 * Six scope decisions the specification settled before a word was written (see the packet 18 spec in
 * NEXT.md, where each is set against the line that settles it):
 *
 *   - "EQUILIBRIUM" IS NOT IN THE BUSINESS SPECIFICATION. Zero occurrences in bus_spec.txt, against
 *     twelve in econ_spec.txt. The specification's words for sub-topic 3 are "The interaction of
 *     demand and supply" and "the causes and consequences of changes in demand and supply", and those
 *     are the words this section teaches with. The standard term is named once, as an aside, in
 *     interactionOfDemandAndSupply, and it is never assessed, never in a quiz option, never in a
 *     recall answer and never in a flashcard. Economics 1.3.4 owns price determination; this is
 *     Business, and a sentence carried across from consumer-behaviour-demand would import its
 *     vocabulary along with its sense.
 *   - "EXCESS DEMAND" AND "EXCESS SUPPLY" GO WITH IT. Zero occurrences each. The audit asked for the
 *     shortage-side flow (specGap-03 clause c, quoting a UK GCE requirement 1.2.3(c) that has no IAL
 *     counterpart — IAL 1.3.2·3 has only a and b). What 3a and 3b do ask for is what happens to price
 *     and quantity when demand or supply changes, which blocks 3's four subsections teach and two
 *     diagrams draw.
 *   - "MOVEMENT ALONG", "EXTENSION" AND "CONTRACTION" GO TOO. Zero, zero, and twice in a different
 *     sense ("extension strategies" belongs to the product life cycle, 1.3.3). specGap-06 rested on
 *     what a GCE mark scheme credits, which is not a claim this section may make. The distinction the
 *     specification does want — a change in price against a change in one of the seven other factors —
 *     is taught in changeInPriceVersusChangeInDemand without either word.
 *   - PRICE SKIMMING AND PENETRATION PRICING BELONG TO 1.3.3. bus_spec.txt:649-650, inside Marketing
 *     mix and strategy. 4d is "the significance of price elasticity of demand to businesses in terms
 *     of implications for pricing", and pedAndPricingDecisions teaches that implication in 1.3.2's own
 *     words rather than borrowing the next section's named strategies.
 *   - PRICE ELASTICITY OF SUPPLY IS NOT HERE. Zero occurrences. The twenty-four leaves are the seven
 *     demand factors, the five supply factors, the interaction, the diagrams, PED a-e and YED a-e.
 *   - YED HAS FIVE LEAVES, NOT FOUR. specGap-05 numbered them from the UK GCE and never mentioned 5b,
 *     "Normal and inferior goods", which has its own subsection here.
 *
 * Ids: the eight March subsections that survive keep theirs, because a progress row points at them.
 *
 * Money is in dollars throughout. No UK-only institution frames an example; of eleven real examples
 * the March section put seven in the UK (structure-10), and none of these is. No example carries a
 * year or a figure, and no sentence asserts what a paper asks or what a marker does.
 */
import { subId, SECTION, hash8, money, pc, sig, minus, pedS, qdAt, qsAt, trAt, ped, pctQ, pctP, MEET_P, MEET_Q, PEAK_P, PEAK_Q, MAX_TR, CHOKE_P, PRICES, PED_INELASTIC, PED_ELASTIC, PED_UNIT, INCOME_FROM, INCOME_TO, INCOME_RISE, PRESSE_Q, WATER_Q, MIX_Q, pctOf, YED_PRESSE, YED_WATER, YED_MIX } from './_packet18-util.mjs';

const blockId = (title) => `${SECTION}:block:${hash8(title)}`;
const recall = (sid, r) => ({ id: `${sid}:recall`, ...r });

export const B1 = 'Demand';
export const B2 = 'Supply';
export const B3 = 'Demand and Supply Together';
export const B4 = 'Price Elasticity of Demand';
export const B5 = 'Income Elasticity of Demand';

/* ══ Block 1 — Demand (1.3.2 · 1a, seven factors) ══════════════════════════ */

const whatIsDemand = (() => {
  const sid = subId('what-is-demand'); // March id, kept
  return {
    id: sid,
    title: 'What Demand Means',
    keyIdea: 'Demand is the quantity buyers are willing and able to buy at each price over a period, so it is a whole schedule of prices and quantities, not one number.',
    body: [
      { type: 'paragraph', text: '**Demand** is the quantity of a good that buyers are willing **and able** to buy at each price over a period of time. Both halves matter: wanting a product without the money to pay for it is not demand a business can sell into.' },
      { type: 'paragraph', text: 'Because the quantity is different at every price, demand is a **schedule** rather than a single figure. Plot it and you get the **demand curve**, which slopes downward: the lower the price, the more buyers take.' },
      { type: 'subheading', text: 'Maji, a bottled-drinks maker' },
      { type: 'paragraph', text: `Maji sells cases of its drinks to retailers. At ${money(10)} a case retailers would take ${qdAt(10)} cases a week; at ${money(20)} they would take ${qdAt(20)}; at ${money(25)}, only ${qdAt(25)}. Nothing about the drink changed between those rows — only the price, and therefore the quantity demanded.` },
      { type: 'bullets', items: [
        `**Quantity demanded** is one row of the schedule: ${qdAt(PEAK_P)} cases at ${money(PEAK_P)}.`,
        '**Demand** is the whole schedule — the amount buyers would take at *every* price.',
        'A business that knows only today\'s sales knows one row. Knowing the schedule is what lets it price.',
      ] },
    ],
    realExample: { emoji: '🥤', text: 'A supermarket that cuts the price of its own-label cola sells more of it that week. The drink is unchanged and shoppers are unchanged; the quantity demanded moved because the price did.' },
    misconception: 'Students write that demand is "how much people want". Wanting is not enough — demand counts only what buyers are both willing and able to pay for. Write instead: the quantity buyers are willing and able to buy at a given price.',
    examMatters: 'A Define (2 marks, WBS11 Appendix 6) requires you to define the term. For demand that means both conditions — willing and able — and a price or period attached. One condition is half a definition.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the definition this whole chapter is built on:',
      template: [
        'Demand is the quantity buyers are ___ and able to buy',
        'measured at each ___ over a period of time',
        'so demand is a whole ___, not a single figure',
      ],
      answers: ['willing', 'price', 'schedule'],
      hints: ['the wanting half of the pair', 'what changes as you move down the curve', 'the word for a table of every row at once'],
      distractors: ['quantity', 'hoping'],
    }),
  };
})();

const changeInPriceVersusChangeInDemand = (() => {
  const sid = subId('change-in-price-versus-change-in-demand');
  return {
    id: sid,
    title: 'A Change in Price and a Change in Demand',
    keyIdea: 'The good\'s own price moves you between rows of the same schedule; any of the seven other factors replaces the schedule with a different one.',
    body: [
      { type: 'paragraph', text: 'Two different things are often called "demand rising", and a business that confuses them will misread its own market.' },
      { type: 'bullets', items: [
        '**The good\'s own price changes.** The schedule is unchanged; you simply read a different row of it. Buyers take more because it got cheaper, not because anything about them changed.',
        '**One of the seven other factors changes.** Buyers now want a different quantity **at every price**, including the price that has not moved. The old schedule is wrong and a new one replaces it.',
      ] },
      { type: 'paragraph', text: `The second is what the specification means by **factors leading to a change in demand**, and there are seven of them. Each one is a reason buyers would take a different quantity at ${money(MEET_P)}, or at ${money(10)}, or at any other price you name.` },
      { type: 'paragraph', text: 'The test is simple. Ask whether the good\'s own price changed. If it did, the quantity demanded moved and demand did not. If it did not, demand itself has changed.' },
    ],
    realExample: { emoji: '☀️', text: 'A heatwave and a half-price offer both sell more cold drinks. Only the offer is a price change; the heatwave would have sold more at any price on the list, which is a different thing entirely.' },
    misconception: 'Students write "demand rose" after a price cut. A price cut cannot change demand — it moves you along the schedule you already had. Write instead: quantity demanded rose because the price fell.',
    examMatters: 'An Explain (4 marks, WBS11 Appendix 6) requires a brief explanation of cause or effect supported by detail. Naming which of the two changes happened, and why, is the detail that separates cause from restatement.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each change into whether it moves the quantity demanded along the existing schedule, or changes demand itself:',
      groups: [
        { name: 'Quantity demanded moves', why: 'The good\'s own price changed, so you read a different row of the same schedule', items: [
          'Maji cuts its list price from $20 to $15 a case',
          'Maji runs a two-for-one offer, halving the price per case',
        ] },
        { name: 'Demand itself changes', why: 'Something other than the good\'s own price changed, so buyers want a different quantity at every price', items: [
          'A rival drink becomes much cheaper',
          'Average incomes across the region rise',
          'A long hot summer arrives',
          'Maji runs its first advertising campaign',
        ] },
      ],
    }),
  };
})();

const substitutesAndComplements = (() => {
  const sid = subId('prices-of-substitutes-and-complements');
  return {
    id: sid,
    title: 'Prices of Substitutes and Complementary Goods',
    keyIdea: 'A substitute is bought instead, so its price moves demand the same way; a complement is bought alongside, so its price moves demand the opposite way.',
    body: [
      { type: 'paragraph', text: 'The first factor the specification lists is **changes in the prices of substitutes and complementary goods**. Both are other products, and the direction of the effect depends on which kind they are.' },
      { type: 'bullets', items: [
        '**A substitute** is bought *instead of* the good. If a rival cola becomes dearer, some buyers move across, and demand for Maji rises at every price. A cheaper rival does the reverse.',
        '**A complement** is bought *alongside* the good. If cinema tickets become dearer, fewer people go, and demand for the drinks sold there falls — even though the drinks themselves did not change price.',
      ] },
      { type: 'paragraph', text: 'The rule to carry is that a substitute\'s price and your demand move **in the same direction**, and a complement\'s price and your demand move in **opposite directions**. Naming which kind the other product is settles the direction before any diagram is drawn.' },
      { type: 'paragraph', text: 'For a business this is the factor it can watch most cheaply: a rival\'s price is published, and a change in it is a change in your own market that you did not cause.' },
    ],
    realExample: { emoji: '🎮', text: 'Console games are complements to the console. When a console\'s price falls and more are sold, demand for games on it rises at the prices games were already selling for.' },
    misconception: 'Students treat every related good as a substitute. Ask what the buyer does with both: instead of, or alongside? Printer ink is not a substitute for a printer, and its demand follows printer sales upward, not downward.',
    examMatters: 'An Explain (4 marks, WBS11 Appendix 6) needs the direction *and* the reason for it. "Demand rises because the rival is dearer" is a cause; "demand rises" alone is the effect restated.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each change in another product\'s price to what it does to demand for Maji\'s drinks:',
      pairs: [
        { left: 'A rival cola becomes more expensive', right: 'Demand for Maji rises', why: 'A substitute is bought instead, so buyers move across when it becomes dearer' },
        { left: 'A rival cola is discounted heavily', right: 'Demand for Maji falls', why: 'The same substitution runs the other way when the rival becomes the cheaper option' },
        { left: 'Cinema tickets become more expensive', right: 'Demand for drinks sold in cinemas falls', why: 'A complement is bought alongside, so fewer of the pair are bought when either becomes dearer' },
        { left: 'A supplier of an unrelated good raises prices', right: 'Demand for Maji is unchanged', why: 'A good that is neither bought instead nor alongside has no route to this market' },
      ],
      distractors: ['Demand for Maji becomes perfectly flat'],
    }),
  };
})();

const consumerIncomes = (() => {
  const sid = subId('changes-in-consumer-incomes');
  return {
    id: sid,
    title: 'Changes in Consumer Incomes',
    keyIdea: 'A rise in incomes raises demand for most goods at every price, but for a few it lowers demand, because buyers leave them as soon as they can afford to.',
    body: [
      { type: 'paragraph', text: 'When **consumer incomes** rise, buyers can afford more at any given price, so demand for most goods rises at every price. When incomes fall, it drops back.' },
      { type: 'paragraph', text: 'Not everything moves that way. A small group of goods is bought *more* when incomes are low and abandoned when they rise, because buyers only ever chose them to save money. A cheap powdered drink mix loses customers to bottled drinks when wages rise.' },
      { type: 'bullets', items: [
        'Most goods: incomes up, demand up at every price.',
        'A few goods: incomes up, demand **down** at every price, because buyers trade up to something they preferred all along.',
        'How far demand moves for a given income change is a separate question, and it has its own measure later in this section.',
      ] },
      { type: 'paragraph', text: 'For a business selling a range, this factor decides which products to push when the region is doing well and which to keep for when it is not.' },
    ],
    realExample: { emoji: '✈️', text: 'Budget airlines fill seats when money is tight and lose some of those passengers to full-service carriers when incomes rise. The seat is the same; what changed is what buyers can now afford instead.' },
    misconception: 'Students assume a rise in incomes always raises demand. For goods bought only to economise it does the opposite. Write instead: incomes rose, so buyers moved to the product they preferred and demand for the cheaper one fell.',
    examMatters: 'An Explain (4 marks, WBS11 Appendix 6) is supported by an example. Saying which kind of good the business sells turns a general rule into an explanation of this firm\'s demand.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the effect of an income change on demand:',
      template: [
        'For most goods, a rise in incomes shifts demand to the ___',
        'and the change happens at ___ price, not just the current one',
        'For a few goods bought only to save money, a rise in incomes makes demand ___',
      ],
      answers: ['right', 'every', 'fall'],
      hints: ['the direction an increase in demand is drawn', 'the word that makes this a shift rather than a move along', 'what happens when buyers trade up and leave'],
      distractors: ['left', 'rise'],
    }),
  };
})();

const fashionsTastesPreferences = (() => {
  const sid = subId('fashions-tastes-and-preferences');
  return {
    id: sid,
    title: 'Fashions, Tastes and Preferences',
    keyIdea: 'What buyers want changes on its own, and when it does the whole schedule moves without any price, income or rival having changed at all.',
    body: [
      { type: 'paragraph', text: 'The specification lists **fashions, tastes and preferences** as a factor in its own right. Buyers simply come to want more or less of something, and demand shifts at every price.' },
      { type: 'paragraph', text: 'These changes usually come from outside the market: health advice, a change in what people eat, a product becoming associated with a group buyers want to belong to. None of them is caused by the business, and none is caused by price.' },
      { type: 'bullets', items: [
        'Health concerns about sugar move demand away from sweetened drinks and towards water, at every price on both lists.',
        'A cuisine becoming popular in a region raises demand for its ingredients, again at every price.',
        'Tastes can move slowly and then suddenly, which is what makes this the hardest factor for a business to plan around.',
      ] },
      { type: 'paragraph', text: 'It is worth separating this from the next factor. A change in tastes happens *to* a business; advertising is a business trying to cause one.' },
    ],
    realExample: { emoji: '🌱', text: 'Plant-based milks moved from a specialist product to a supermarket staple as preferences changed. Dairy prices did not have to move for demand to shift between the two.' },
    misconception: 'Students use "tastes" as a catch-all for anything they cannot classify. If the cause is a rival\'s price, an income change or an advert, it belongs under that factor. Tastes is what remains when buyers\' own wants have changed.',
    examMatters: 'An Analyse (6 marks, WBS11 Appendix 6) requires a chain of reasoning. Naming the factor is the first link, not the answer: the chain runs from the change, through demand at every price, to what the business sees.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each cause of a demand shift into tastes and preferences, or one of the other named factors:',
      groups: [
        { name: 'Fashions, tastes and preferences', why: 'Buyers\' own wants changed, with no price, income or campaign behind it', items: [
          'Health advice turns buyers away from sugary drinks',
          'A regional cuisine becomes popular and its ingredients sell more',
        ] },
        { name: 'A different named factor', why: 'The cause is a rival\'s price, an income change or the firm\'s own marketing, each of which the specification lists separately', items: [
          'A rival launches a cheaper version',
          'Wages rise across the region',
          'The firm sponsors a national sports team',
        ] },
      ],
    }),
  };
})();

const marketingAdvertisingBranding = (() => {
  const sid = subId('marketing-advertising-and-branding');
  return {
    id: sid,
    title: 'Marketing, Advertising and Branding',
    keyIdea: 'Marketing is the one demand factor a business controls: it aims to raise demand at every price, and to make buyers less willing to leave for a cheaper rival.',
    body: [
      { type: 'paragraph', text: 'The specification\'s fourth factor is **marketing, advertising and branding** — the only one on the list a business decides for itself. The others happen to it.' },
      { type: 'paragraph', text: 'Successful marketing does two things at once, and a strong answer separates them:' },
      { type: 'bullets', items: [
        '**It shifts demand.** More buyers want the product at every price, so the whole schedule moves right.',
        '**It changes how buyers respond to price.** A brand buyers feel attached to loses fewer of them when it raises its price. That second effect has its own measure later in this section, and it is often worth more to the firm than the first.',
      ] },
      { type: 'paragraph', text: 'Branding is the part that lasts. An advertising campaign shifts demand while it runs; a brand that buyers trust keeps the schedule in its new position after the campaign stops, which is why firms spend on both.' },
      { type: 'paragraph', text: 'It is not free and it is not certain. Marketing is a cost before it is a benefit, and a campaign that does not land leaves the schedule where it was.' },
    ],
    realExample: { emoji: '👟', text: 'Sports brands pay to put their logo on teams and athletes. The shoe is not improved by the sponsorship; what is bought alongside it is an association, and buyers pay for that.' },
    misconception: 'Students write that advertising "increases sales", which mixes up the two effects. Say which one: more buyers at every price is a shift, and buyers staying when the price rises is a change in how they respond to price.',
    examMatters: 'An Assess (10 marks, WBS11 Appendix 6) requires a judgement on the importance of something. For marketing, weigh the shift it buys against its cost and the chance it does not work.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the two effects a business hopes its marketing will have:',
      template: [
        'It aims to move the whole demand schedule to the ___',
        'so that more is bought at ___ price on the list',
        'and it aims to make buyers less ___ to move to a cheaper rival',
      ],
      answers: ['right', 'every', 'willing'],
      hints: ['where an increase in demand is drawn', 'the word that makes this a shift', 'the first half of the definition of demand'],
      distractors: ['left', 'able'],
    }),
  };
})();

const demographics = (() => {
  const sid = subId('demographics');
  return {
    id: sid,
    title: 'Demographics',
    keyIdea: 'Demographics are the size and make-up of the population, and both matter: more buyers raise demand, and a different mix of buyers changes what is demanded.',
    body: [
      { type: 'paragraph', text: '**Demographics** describe the population a business sells to — how many people there are, how old they are, where they live and how households are made up. The specification names it as one factor, but it works in two distinct ways and an answer that gives only one is incomplete.' },
      { type: 'bullets', items: [
        '**Size.** More people in a region means more buyers at every price, so demand shifts right for most goods sold there.',
        '**Make-up.** The same number of people with a different age profile demands different things. An ageing population buys more of some goods and less of others without the total changing at all.',
      ] },
      { type: 'paragraph', text: 'Migration into a city, a falling birth rate, households becoming smaller — each changes the schedule a business faces without any price moving. These changes are slow, which makes them the easiest factor to plan for and the easiest to ignore until a competitor has planned for it first.' },
    ],
    realExample: { emoji: '🏙️', text: 'Rapid urban growth across many economies has raised demand for small, single-serve packaging, because more households are one or two people rather than five.' },
    misconception: 'Students treat demographics as population size only. A change in the *mix* shifts demand for particular goods even when the total population is flat. Write instead: the number of buyers, or the type of buyer, or both.',
    examMatters: 'An Analyse (6 marks, WBS11 Appendix 6) requires a chain. Say which demographic change, which group of buyers it creates or removes, and which of the firm\'s products their demand lands on.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each demographic change to the effect on demand it best explains:',
      pairs: [
        { left: 'Net migration into a city', right: 'More buyers at every price', why: 'The size of the population rose, so the whole schedule moves right for goods sold there' },
        { left: 'The population ages while its total stays flat', right: 'Demand moves between products, not upward', why: 'The make-up changed rather than the number, so some goods gain what others lose' },
        { left: 'Households become smaller on average', right: 'Demand shifts towards smaller pack sizes', why: 'The unit a household buys changes with the number of people it feeds' },
      ],
      distractors: ['Demand becomes impossible to measure'],
    }),
  };
})();

const externalShocksAndSeasonality = (() => {
  const sid = subId('external-shocks-and-seasonality');
  return {
    id: sid,
    title: 'External Shocks and Seasonality',
    keyIdea: 'External shocks are sudden and unplanned; seasonality is a swing the business already knows is coming. Both move demand at every price, and only one can be planned for.',
    body: [
      { type: 'paragraph', text: 'The last two factors on the specification\'s list are **external shocks** and **seasonality**. They look similar on a diagram and are opposites in the boardroom.' },
      { type: 'subheading', text: 'External shocks' },
      { type: 'paragraph', text: 'An **external shock** is an event outside the market that changes demand suddenly and was not planned for: a natural disaster, a political crisis, a public health emergency, a sharp change in another country\'s economy. Demand moves at every price and no one in the business caused it.' },
      { type: 'subheading', text: 'Seasonality' },
      { type: 'paragraph', text: '**Seasonality** is a swing in demand that repeats on a known cycle — warm months, festivals, school terms, harvests. Maji sells far more cases in the hot season than the cool one at exactly the same price, every year.' },
      { type: 'bullets', items: [
        'A shock is unforeseen, so a business can only react: hold stock, spread risk, keep cash.',
        'A season is foreseen, so it can be planned: build stock before the peak, staff up, price for the quiet months.',
        'Both are shifts of the whole schedule, because neither is a change in the good\'s own price.',
      ] },
    ],
    realExample: { emoji: '🎆', text: 'Fireworks sellers take most of their orders in a few weeks around national celebrations. The product is available all year at the same price and almost nobody buys it in the quiet months.' },
    misconception: 'Students call every demand change a shock. A shock is unforeseen; a seasonal swing is on the calendar. Calling an annual peak a shock suggests a business could not have prepared for it, which is the opposite of the truth.',
    examMatters: 'An Assess (10 marks, WBS11 Appendix 6) asks for a judgement on importance. Seasonality and shocks are judged differently precisely because one is predictable, and saying so is the judgement.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each event into an external shock or a seasonal swing, by whether the business could have known it was coming:',
      groups: [
        { name: 'External shock', why: 'Unforeseen and outside the market, so the business can react but could not have planned for this occasion', items: [
          'A flood closes the region\'s main road for a month',
          'A neighbouring country\'s currency collapses',
          'A public health emergency closes restaurants',
        ] },
        { name: 'Seasonality', why: 'A swing that repeats on a known cycle, so it appears in the plan before it appears in the sales figures', items: [
          'Cold-drink sales rise every hot season',
          'Orders peak in the weeks before a national festival',
          'Sales fall each year when schools are on holiday',
        ] },
      ],
    }),
  };
})();

/* ══ Block 2 — Supply (1.3.2 · 2a, five factors) ═══════════════════════════ */

const whatIsSupply = (() => {
  const sid = subId('what-is-supply'); // March id, kept
  return {
    id: sid,
    title: 'What Supply Means',
    keyIdea: 'Supply is the quantity producers are willing and able to sell at each price over a period, and it rises with price because a higher price covers the cost of producing more.',
    body: [
      { type: 'paragraph', text: '**Supply** is the quantity of a good that producers are willing and able to offer for sale at each price over a period of time. It is the seller\'s side of the same market, and like demand it is a schedule rather than a number.' },
      { type: 'paragraph', text: 'The **supply curve** slopes upward. A higher price makes selling more worthwhile, and it also covers the higher cost of squeezing out extra output — overtime, a second shift, a more expensive supplier.' },
      { type: 'subheading', text: 'Maji\'s supply schedule' },
      { type: 'paragraph', text: `At ${money(10)} a case Maji is willing to supply ${qsAt(10)} cases a week; at ${money(16)}, ${qsAt(16)}; at ${money(20)}, ${qsAt(20)}. The rising line is the same fact from three angles: more money per case makes more cases worth making.` },
      { type: 'bullets', items: [
        '**Quantity supplied** is one row of the schedule.',
        '**Supply** is the whole schedule — what producers would offer at every price.',
        'Exactly as with demand, a change in the good\'s own price moves you along the schedule; anything else replaces it.',
      ] },
    ],
    realExample: { emoji: '🚜', text: 'When coffee prices rise, growers bring older and less productive land back into use. The extra beans cost more to produce, which is exactly why they only appear when the price is high enough to cover it.' },
    misconception: 'Students say supply is "how much a firm has in stock". Stock is what exists now; supply is what producers would be willing to sell at each price. A warehouse full of goods at a price nobody will accept is not supply.',
    examMatters: 'A Define (2 marks, WBS11 Appendix 6) on supply needs willing and able, and a price. Dropping "at each price" leaves a definition that could describe production instead.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the definition of supply and the reason for its slope:',
      template: [
        'Supply is the quantity producers are willing and ___ to sell',
        'at each ___ over a period of time',
        'The curve slopes ___ because a higher figure covers the cost of making more',
      ],
      answers: ['able', 'price', 'upward'],
      hints: ['the half of the pair that is about capability, not desire', 'what is on the vertical axis', 'the opposite direction to the demand curve'],
      distractors: ['willing', 'downward'],
    }),
  };
})();

const costsOfProduction = (() => {
  const sid = subId('changes-in-the-costs-of-production');
  return {
    id: sid,
    title: 'Changes in the Costs of Production',
    keyIdea: 'Costs are the largest influence on supply: when producing each case becomes dearer, less is worth supplying at every price, and the whole schedule moves left.',
    body: [
      { type: 'paragraph', text: 'The first factor the specification lists for supply is **changes in the costs of production** — wages, raw materials, energy, transport, rent, borrowing.' },
      { type: 'paragraph', text: 'The logic runs through what is left over. A producer supplies a case while the price covers the cost of making it. If that cost rises and the price does not, some cases stop being worth making, so less is supplied **at every price** and the schedule moves left. Falling costs do the reverse.' },
      { type: 'bullets', items: [
        'A rise in the price of sugar or aluminium raises Maji\'s cost per case directly.',
        'A rise in fuel prices raises it indirectly, through delivery.',
        'Either way the effect on the diagram is the same: supply shifts, and it shifts at every price.',
      ] },
      { type: 'paragraph', text: 'For a business this is the factor most worth hedging. A firm cannot choose the world price of its inputs, but it can fix some of them in advance by contract.' },
    ],
    realExample: { emoji: '⚡', text: 'Energy-intensive producers such as glass and aluminium makers cut output when electricity prices rise sharply. The furnaces still work; the cases they would fill stop being worth filling.' },
    misconception: 'Students say a cost rise "reduces supply to nothing" or that the firm "just raises its price". It can try, but the schedule itself has moved: less is offered at every price, including the one it was charging.',
    examMatters: 'An Analyse (6 marks, WBS11 Appendix 6) requires the chain. Cost per unit up, margin per unit down, some units no longer worth producing, supply lower at every price — four links, not one.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put these links in the causal order that runs from a cost rise to the supply curve moving, from the first cause to the final effect:',
      correctOrder: [
        'A key raw material becomes more expensive',
        'The cost of producing each case goes up',
        'Some cases are no longer worth producing at the current price',
        'Less is supplied at every price and the curve shifts left',
      ],
      why: [
        'The input price is the outside change that starts the chain; nothing here caused it',
        'A dearer input feeds straight into what each unit costs to make',
        'A producer supplies a unit only while the price covers its cost, so the dearest units drop out first',
        'Collecting that decision at every price is what moves the whole schedule',
      ],
    }),
  };
})();

const newTechnology = (() => {
  const sid = subId('introduction-of-new-technology');
  return {
    id: sid,
    title: 'The Introduction of New Technology',
    keyIdea: 'New technology lowers the cost of producing each unit, so more becomes worth supplying at every price and the supply curve shifts right.',
    body: [
      { type: 'paragraph', text: 'The **introduction of new technology** works on supply through cost, and it usually works in one direction: down. A faster bottling line, a better yeast, software that plans deliveries — each lets the same output be produced with fewer inputs.' },
      { type: 'bullets', items: [
        'Cost per case falls, so cases that were not worth producing now are, and supply shifts right at every price.',
        'Output per worker rises, which is the same effect described from the other side.',
        'Waste falls, which lowers cost without any new machine at all.',
      ] },
      { type: 'paragraph', text: 'Two qualifications a good answer carries. The technology has to be paid for first, so the shift comes after an outlay that may take years to recover. And it rarely stays exclusive: once rivals adopt it too, supply shifts right across the whole market and the price buyers pay tends to follow it down.' },
    ],
    realExample: { emoji: '🔆', text: 'Solar panels became dramatically cheaper to manufacture as production methods improved, and far more were supplied at prices that would once have made them uneconomic.' },
    misconception: 'Students write that technology "increases demand" for the product. It does not touch what buyers want; it changes what producers can afford to offer. It shifts supply, and any price fall that follows is a consequence of that.',
    examMatters: 'An Explain (4 marks, WBS11 Appendix 6) needs cause, effect and support. The support here is the cost per unit: naming what falls is what makes the supply shift an explanation rather than an assertion.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each change at Maji to the effect it has on the supply schedule:',
      pairs: [
        { left: 'A faster bottling line is installed', right: 'Supply shifts right', why: 'Cost per case falls, so cases that were not worth making now are, at every price' },
        { left: 'The price of aluminium rises sharply', right: 'Supply shifts left', why: 'Cost per case rises, so the dearest cases stop being worth producing' },
        { left: 'Maji lowers its own list price', right: 'Quantity supplied moves along the curve', why: 'The good\'s own price changed, so this is a different row of the same schedule' },
      ],
      distractors: ['The supply curve slopes downward'],
    }),
  };
})();

const indirectTaxesAndSubsidies = (() => {
  const sid = subId('indirect-taxes-and-government-subsidies');
  return {
    id: sid,
    title: 'Indirect Taxes and Government Subsidies',
    keyIdea: 'An indirect tax adds to the cost of supplying each unit and shifts supply left; a subsidy takes cost away and shifts it right — one lever, pulled both ways.',
    body: [
      { type: 'paragraph', text: 'The specification lists **indirect taxes** and **government subsidies** as two separate supply factors. They are worth learning together because the mechanism is identical and only the sign changes.' },
      { type: 'bullets', items: [
        '**An indirect tax** is a tax on a good rather than on income — a sales tax, or a duty on a specific product. The producer has to hand over part of what it receives, so the cost of supplying each unit rises and supply shifts **left**.',
        '**A subsidy** is a government payment to producers for each unit made. It works the other way: cost per unit falls and supply shifts **right**.',
      ] },
      { type: 'paragraph', text: 'Governments use both deliberately. A tax on a product is usually intended to reduce how much of it is produced and sold, or to raise revenue from it. A subsidy is usually intended to make something cheaper and more widely available than the market alone would make it.' },
      { type: 'paragraph', text: 'How much of an indirect tax ends up in the price buyers pay is not fixed. It depends on how buyers respond to a price change, which is what the second half of this section measures.' },
    ],
    realExample: { emoji: '🔋', text: 'Several governments subsidise electric-vehicle production and tax fuel. Both are supply levers aimed at the same goal from opposite ends.' },
    misconception: 'Students say a tax "shifts demand left because things cost more". The tax lands on the producer\'s costs, so it shifts supply. Buyers then move along their unchanged demand curve to a new row of it.',
    examMatters: 'An Assess (10 marks, WBS11 Appendix 6) requires a judgement. For an indirect tax that means weighing what it raises against how much output actually falls, which depends on how buyers respond.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each government action by the direction in which it shifts the supply curve:',
      groups: [
        { name: 'Shifts supply left', why: 'It adds to the cost of supplying each unit, so less is worth supplying at every price', items: [
          'A duty is placed on every case of sugary drinks',
          'A sales tax on bottled goods is raised',
        ] },
        { name: 'Shifts supply right', why: 'It takes cost away from each unit, so more is worth supplying at every price', items: [
          'Producers are paid for each unit of recycled packaging used',
          'A grant covers part of the cost of new machinery',
          'Import duties on raw materials are removed',
        ] },
      ],
    }),
  };
})();

const externalShocksSupply = (() => {
  const sid = subId('external-shocks-to-supply');
  return {
    id: sid,
    title: 'External Shocks to Supply',
    keyIdea: 'An external shock hits the ability to produce rather than the willingness to buy, and because it is unforeseen the supply curve moves before any business can respond.',
    body: [
      { type: 'paragraph', text: 'The last factor on the supply list is **external shocks** — the same word the demand list uses, working on the other side of the market.' },
      { type: 'paragraph', text: 'A supply shock damages the ability to produce or to deliver: a drought that ruins a harvest, a strike that stops a port, a conflict that closes a shipping route, a fire at a component plant that half an industry buys from. Supply falls at every price, and it falls without warning.' },
      { type: 'bullets', items: [
        'Shocks can move supply either way, though the damaging direction is more common. An unusually good harvest is a positive supply shock.',
        'The effect is often concentrated: one plant, one route or one crop can matter to a whole market.',
        'Because it is unforeseen, a business manages a shock before it happens — several suppliers rather than one, stock held against disruption — or not at all.',
      ] },
      { type: 'paragraph', text: 'This is where the two halves of the section meet. A supply shock changes the price buyers face, and how much they cut back when it does is the question the rest of this section answers.' },
    ],
    realExample: { emoji: '🚢', text: 'When a single container route is blocked, firms far from the blockage find components unavailable at any price they were planning to pay. Nothing about their own production changed.' },
    misconception: 'Students treat a supply shock as a price rise. The price rise is the consequence: the shock is the loss of the ability to produce or deliver, and the price moves because of it.',
    examMatters: 'An Analyse (6 marks, WBS11 Appendix 6) requires linked reasoning. Shock, supply lower at every price, buyers moving along an unchanged demand curve, price and quantity where the two now meet.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put these stages in the order in which they happen after a supply shock, from the event itself to what the business finally sees:',
      correctOrder: [
        'A drought destroys much of the region\'s fruit harvest',
        'Producers can supply far less at every price',
        'The supply curve shifts left while demand is unchanged',
        'Buyers move up their demand curve to a higher price and a smaller quantity',
      ],
      why: [
        'The event is outside the market and starts the chain; nothing in the market caused it',
        'A lost harvest removes the ability to produce, whatever the price on offer',
        'That loss at every price is what a leftward shift of the curve means',
        'Demand did not change, so buyers simply end up at a different point on the curve they already had',
      ],
    }),
  };
})();

/* ══ Block 3 — Demand and Supply Together (1.3.2 · 3a, 3b) ═════════════════ */

const interactionOfDemandAndSupply = (() => {
  const sid = subId('equilibrium-price-and-quantity'); // March id, kept
  return {
    id: sid,
    title: 'The Interaction of Demand and Supply',
    keyIdea: 'Put both schedules on one diagram and one price stands out: the price at which the quantity buyers want and the quantity producers offer are exactly the same.',
    body: [
      { type: 'paragraph', text: 'Demand and supply are two answers to the same question — how much at each price — so they belong on one diagram, with price up the side and quantity along the bottom.' },
      { type: 'subheading', text: 'Maji\'s two schedules together' },
      { type: 'paragraph', text: `At ${money(12)} buyers would take ${qdAt(12)} cases a week and producers would offer ${qsAt(12)}: buyers want far more than is available. At ${money(20)} buyers would take ${qdAt(20)} and producers would offer ${qsAt(20)}: now there is more on offer than anyone wants. Between those two prices the gap closes, and at **${money(MEET_P)}** the two are the same number — **${MEET_Q} cases a week**.` },
      { type: 'paragraph', text: `That price does not stay put by accident. Below ${money(MEET_P)}, buyers compete for a quantity that is not there and sellers find they can ask more. Above it, cases sit unsold and sellers accept less. Only at ${money(MEET_P)} does neither side have a reason to move, which is what **the interaction of demand and supply** means.` },
      { type: 'paragraph', text: `You will meet the standard term for that price — *equilibrium* — in textbooks and in Economics. This specification asks instead for the interaction of demand and supply, and for the causes and consequences of changes in it.` },
    ],
    realExample: { emoji: '🎟️', text: 'A concert that sells out in minutes was priced below the level that would have matched tickets to buyers; one with rows of empty seats was priced above it. The resale market is buyers and sellers finding the price the box office missed.' },
    misconception: 'Students write that the price is "set where the curves cross" as if someone chose it. Nobody sets it. It is where the pressure from both sides stops, because at any other price one side is still moving.',
    examMatters: 'A Construct (4 marks, WBS11 Appendix 6) requires an accurately labelled diagram. Both axes named, both curves labelled, and the price and quantity marked where they meet — a diagram missing its labels has not answered a Construct.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: `Complete the reading of Maji's market at ${money(MEET_P)}:`,
      template: [
        `At ${money(12)} buyers want ___ cases and producers offer only ${qsAt(12)}`,
        `At ${money(20)} producers offer ${qsAt(20)} cases and buyers want only ___`,
        `The two are equal at a price of ${money(MEET_P)}, where the quantity is ___ cases`,
      ],
      answers: [String(qdAt(12)), String(qdAt(20)), String(MEET_Q)],
      hints: ['read the demand schedule at the lower price', 'read the demand schedule at the higher price', 'the quantity both schedules give at the same price'],
      distractors: [String(qdAt(10)), String(PEAK_Q)],
    }),
  };
})();

const drawingDemandAndSupplyDiagrams = (() => {
  const sid = subId('drawing-demand-and-supply-diagrams');
  return {
    id: sid,
    title: 'Drawing a Demand and Supply Diagram',
    keyIdea: 'The specification asks you to draw these diagrams, and the marks are in the labelling: both axes, both curves, and the price and quantity where they meet.',
    body: [
      { type: 'paragraph', text: 'The specification asks for **the drawing and interpretation of demand and supply diagrams**. Drawing one is a skill with a fixed order, and doing it in that order stops the common mistakes.' },
      { type: 'flow', steps: [
        { title: 'Draw and label both axes', subtitle: 'price on the vertical, quantity on the horizontal, each with its unit' },
        { title: 'Draw demand sloping down and supply sloping up', subtitle: 'label them D and S at the end of each line, not in the middle' },
        { title: 'Mark where the two lines meet', subtitle: 'drop a dashed line to each axis from that point' },
        { title: 'Label the price and quantity you have just marked', subtitle: `for Maji, ${money(MEET_P)} on the price axis and ${MEET_Q} on the quantity axis` },
      ], result: 'A diagram that can be read by someone who was not told what it shows', resultType: 'good' },
      { type: 'paragraph', text: 'When a change is being shown, the new curve goes on the same diagram beside the old one and is labelled D₂ or S₂, with an arrow showing which way it moved. The original stays: a shift is only visible against where the curve used to be.' },
    ],
    realExample: { emoji: '📐', text: 'A diagram with unlabelled axes could be describing any market at all. The labels are what turn a pair of lines into a statement about a particular good.' },
    misconception: 'Students rub out the original curve when drawing a shift. Keep it. The whole point of the diagram is the comparison, and a single curve in a new position shows nothing at all.',
    examMatters: 'A Construct (4 marks, WBS11 Appendix 6) requires an accurately labelled diagram, and may state which type is wanted or leave you to choose. Label both axes, both curves and both values before adding anything else.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the steps of drawing a demand and supply diagram into the order given above, from the first thing on the page to the last:',
      correctOrder: [
        'Draw and label both axes with their units',
        'Add a downward-sloping demand curve and an upward-sloping supply curve',
        'Mark the point where the two curves meet',
        'Label the price and the quantity at that point',
      ],
      why: [
        'Nothing else can be placed accurately until the scales exist',
        'The curves need axes to sit on, and each is labelled as it is drawn',
        'The point can only be found once both curves are on the page',
        'The values are read off the axes, so they come after the point that defines them',
      ],
    }),
  };
})();

const changeInDemandOnADiagram = (() => {
  const sid = subId('a-change-in-demand-on-a-diagram');
  return {
    id: sid,
    title: 'Showing a Change in Demand',
    keyIdea: 'When demand rises, the demand curve moves right along an unchanged supply curve, and both the price and the quantity traded end up higher.',
    body: [
      { type: 'paragraph', text: 'The specification wants these diagrams used to show **the causes and consequences of changes in demand and supply**. Start with demand, and work in a fixed order: name the cause, move the right curve, read both consequences.' },
      { type: 'flow', steps: [
        { title: 'Name the cause', subtitle: 'one of the seven demand factors — say incomes rise across the region' },
        { title: 'Move the demand curve, not the supply curve', subtitle: 'right to D₂ for an increase, because buyers want more at every price' },
        { title: 'Read the new meeting point', subtitle: 'where D₂ crosses the unchanged supply curve S' },
        { title: 'State both consequences', subtitle: 'the price is higher and the quantity traded is higher' },
      ], result: 'An increase in demand raises both the price and the quantity traded', resultType: 'good' },
      { type: 'paragraph', text: 'The quantity supplied rises even though supply did not change. That is the part students most often miss: producers are not offering more at each price, they are responding to a higher price by moving up the supply curve they already had.' },
      { type: 'paragraph', text: 'A fall in demand runs the same way in reverse: the curve moves left, and both the price and the quantity traded fall.' },
    ],
    realExample: { emoji: '🏠', text: 'When more people move into a city faster than homes are built, rents rise and more properties are let. Nothing made landlords willing to offer more at the old rent; the higher rent did.' },
    misconception: 'Students move both curves when only demand has changed. If the cause is on the demand list, supply stays exactly where it is — and the rise in quantity supplied is the proof that it did.',
    examMatters: 'An Analyse (6 marks, WBS11 Appendix 6) requires a developed chain. Cause, which curve moves and why, the new meeting point, then *both* consequences: a chain that stops at the price has answered half.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put these stages in the order in which they happen when incomes rise, from the cause to the two consequences you read off the diagram:',
      correctOrder: [
        'Incomes across the region rise',
        'Buyers want more cases at every price, so demand shifts right to D₂',
        'D₂ meets the unchanged supply curve at a higher price',
        'Both the price and the quantity traded end up higher',
      ],
      why: [
        'The income change is the outside cause and nothing in the market produced it',
        'A factor other than the good\'s own price moves the whole schedule, and incomes are one of the seven',
        'Supply has not moved, so the new point is found on the curve that was already there',
        'Reading both axes at the new point is what makes this a consequence rather than a redrawing',
      ],
    }),
  };
})();

const changeInSupplyOnADiagram = (() => {
  const sid = subId('a-change-in-supply-on-a-diagram');
  return {
    id: sid,
    title: 'Showing a Change in Supply',
    keyIdea: 'When supply falls, the supply curve moves left along an unchanged demand curve, and the price rises while the quantity traded falls — the two move in opposite directions.',
    body: [
      { type: 'paragraph', text: 'A change in supply is drawn the same way and read differently, and the difference is the single most useful thing in this chapter.' },
      { type: 'flow', steps: [
        { title: 'Name the cause', subtitle: 'one of the five supply factors — say a raw material becomes much dearer' },
        { title: 'Move the supply curve, not the demand curve', subtitle: 'left to S₂ for a decrease, because less is worth supplying at every price' },
        { title: 'Read the new meeting point', subtitle: 'where S₂ crosses the unchanged demand curve D' },
        { title: 'State both consequences', subtitle: 'the price is higher and the quantity traded is lower' },
      ], result: 'A decrease in supply raises the price and lowers the quantity traded', resultType: 'bad' },
      { type: 'paragraph', text: 'Compare that with the demand case. When demand rose, price and quantity moved **together**; when supply falls, they move **in opposite directions**. That is how a diagram tells you which curve moved, and it works backwards too: given a price rise and a fall in quantity, the cause was on the supply side.' },
      { type: 'paragraph', text: 'An increase in supply reverses it again — the curve moves right, the price falls and the quantity traded rises.' },
    ],
    realExample: { emoji: '🌾', text: 'A poor wheat harvest raises bread prices and reduces the amount sold. Buyers did not want bread any less; there was simply less of it to go round at any price.' },
    misconception: 'Students say a supply fall means "people buy less because they want less". Demand has not moved at all. Buyers are on exactly the same curve, at a higher price and therefore a smaller quantity.',
    examMatters: 'An Analyse (6 marks, WBS11 Appendix 6) is judged on the links. Naming which curve moved, and using the opposite directions of price and quantity as the evidence for it, is the link that most answers leave out.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each change in the market to what happens to the price and the quantity traded:',
      pairs: [
        { left: 'Demand increases', right: 'Price up, quantity up', why: 'Buyers want more at every price and producers move up the supply curve to meet them' },
        { left: 'Demand decreases', right: 'Price down, quantity down', why: 'The same movement in reverse along an unchanged supply curve' },
        { left: 'Supply decreases', right: 'Price up, quantity down', why: 'Less is available at every price, so buyers move up an unchanged demand curve' },
        { left: 'Supply increases', right: 'Price down, quantity up', why: 'More is available at every price, so buyers move down an unchanged demand curve' },
      ],
      distractors: ['Price unchanged, quantity unchanged'],
    }),
  };
})();

/* ══ Block 4 — Price Elasticity of Demand (1.3.2 · 4a-4e) ══════════════════ */

const calculatingPed = (() => {
  const sid = subId('calculating-ped'); // March id, kept
  return {
    id: sid,
    title: 'Calculating Price Elasticity of Demand',
    keyIdea: 'PED is the percentage change in quantity demanded divided by the percentage change in price, and both percentages are taken from the original value.',
    body: [
      { type: 'paragraph', text: 'The demand curve says quantity falls when price rises. **Price elasticity of demand (PED)** says by how much, as one number.' },
      { type: 'bullets', items: [
        '**PED = percentage change in quantity demanded ÷ percentage change in price**',
        '**Percentage change = (new value − original value) ÷ original value × 100**',
      ] },
      { type: 'subheading', text: `Maji raises its price from ${money(PED_INELASTIC[0])} to ${money(PED_INELASTIC[1])}` },
      { type: 'flow', steps: [
        { title: 'Read both quantities off the demand schedule', subtitle: `${qdAt(PED_INELASTIC[0])} cases at ${money(PED_INELASTIC[0])}, ${qdAt(PED_INELASTIC[1])} at ${money(PED_INELASTIC[1])}` },
        { title: 'Turn each change into a percentage of its original value', subtitle: `quantity ${pc(pctQ(...PED_INELASTIC))}, price ${pc(pctP(...PED_INELASTIC))}` },
        { title: 'Divide the quantity percentage by the price percentage', subtitle: `${minus(pctQ(...PED_INELASTIC))} ÷ ${pctP(...PED_INELASTIC)} = ${pedS(...PED_INELASTIC)}` },
        { title: 'Keep the sign and state the value', subtitle: `PED = ${pedS(...PED_INELASTIC)}` },
      ], result: `PED = ${pedS(...PED_INELASTIC)}`, resultType: 'neutral' },
      { type: 'paragraph', text: `PED is normally negative, because price and quantity demanded move in opposite directions. Keep the minus sign in the working; it is evidence the calculation was done rather than guessed.` },
    ],
    realExample: { emoji: '🧮', text: 'A firm comparing two years of its own price and sales data is doing exactly this calculation. The arithmetic is the easy part; deciding whether anything else changed in between is the hard part.' },
    misconception: 'Students divide by the new value instead of the original one, or divide price by quantity. Quantity goes on top and the original value goes on the bottom of every percentage.',
    examMatters: 'A Calculate (4 marks, WBS11 Appendix 6) requires the calculation to be based on given data, with workings shown. Both percentages written out earn the working; the final value alone is one number with nothing behind it.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the steps of a PED calculation into the order given above, from reading the data to stating the value:',
      correctOrder: [
        'Read the quantity demanded at each of the two prices',
        'Turn each change into a percentage of its original value',
        'Divide the quantity percentage by the price percentage',
        'State the value with its sign',
      ],
      why: [
        'Nothing can be calculated until both rows of the schedule have been read off',
        'The formula is built from percentages, so raw changes have to be converted first',
        'Quantity is the numerator and price the denominator, never the other way round',
        'The sign is part of the answer, because it says the two moved in opposite directions',
      ],
    }),
  };
})();

const interpretingPedValues = (() => {
  const sid = subId('interpreting-ped-values');
  return {
    id: sid,
    title: 'Interpreting the Numerical Values of PED',
    keyIdea: 'Ignore the minus sign and compare the size with 1: above 1 demand is price elastic, below 1 it is price inelastic, and exactly 1 is unitary.',
    body: [
      { type: 'paragraph', text: 'A PED value on its own has not answered anything. The **interpretation** is the comparison of its size with 1, setting the sign aside.' },
      { type: 'bullets', items: [
        '**Price elastic demand** — bigger than 1 ignoring the sign. Quantity moves proportionately more than price. Buyers are responsive.',
        '**Unitary price elastic demand** — exactly 1. Quantity moves in exactly the same proportion as price.',
        '**Price inelastic demand** — between 0 and 1 ignoring the sign. Quantity moves proportionately less than price. Buyers are unresponsive.',
        '**Perfectly price inelastic demand** — 0. Quantity does not move at all.',
        '**Perfectly price elastic demand** — infinite. Any price rise at all takes quantity demanded to nothing.',
      ] },
      { type: 'subheading', text: 'Maji at three starting prices' },
      { type: 'paragraph', text: `From ${money(PED_INELASTIC[0])} PED is **${pedS(...PED_INELASTIC)}**, which is inelastic. From ${money(PED_UNIT[0])} it is **${pedS(...PED_UNIT)}**, which is unitary. From ${money(PED_ELASTIC[0])} it is **${pedS(...PED_ELASTIC)}**, which is elastic. Same product, same demand curve, three different answers — because elasticity compares proportions, and a dollar is a much larger proportion of ${money(PED_INELASTIC[0])} than of ${money(PED_ELASTIC[0])}.` },
      { type: 'paragraph', text: 'So a firm cannot ask "is our demand elastic?" without saying at which price. The answer changes as it moves up its own demand curve.' },
    ],
    realExample: { emoji: '💊', text: 'A medicine with no alternative has demand that barely moves with price. A particular brand of biscuit on a shelf of twenty others has demand that moves a great deal.' },
    misconception: 'Students say a negative PED means demand is inelastic. The sign and the size are different facts: almost every PED is negative, and only the size answers the question.',
    examMatters: 'An Explain (4 marks, WBS11 Appendix 6) needs the value, its classification and what it means for this firm. A value with no classification has done the arithmetic and stopped short of the answer.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each PED value by what it says about how buyers respond to a price change:',
      groups: [
        { name: 'Price elastic', why: 'Bigger than 1 ignoring the sign: quantity moves proportionately more than price', items: ['−2.0', '−3.5'] },
        { name: 'Price inelastic', why: 'Between 0 and 1 ignoring the sign: quantity moves proportionately less than price', items: ['−0.5', '−0.2'] },
        { name: 'Unitary price elastic', why: 'Exactly 1: quantity moves in the same proportion as price', items: ['−1.0'] },
      ],
    }),
  };
})();

const factorsInfluencingPed = (() => {
  const sid = subId('factors-affecting-ped'); // March id, kept
  return {
    id: sid,
    title: 'The Factors Influencing PED',
    keyIdea: 'Every factor behind PED works the same way: it makes going elsewhere, or going without, either easier or harder for the buyer.',
    body: [
      { type: 'paragraph', text: 'The specification asks for **the factors influencing price elasticity of demand**. There are several, and they are much easier to remember once you see that they are all one idea: how easily can this buyer escape the price rise?' },
      { type: 'bullets', items: [
        '**Availability of substitutes** — the main one. Many close alternatives make demand elastic; none makes it inelastic.',
        '**Branding and loyalty** — a strong brand makes the alternatives feel less like alternatives, so demand becomes more inelastic. This is what marketing is buying.',
        '**Whether the good is a necessity** — something a buyer cannot do without has inelastic demand, whatever the price.',
        '**The share of income the good takes** — a price rise on something cheap is barely noticed; the same percentage on a large purchase is worth acting on.',
        '**Time** — the longer a price change lasts, the more substitutes buyers find, so demand becomes more elastic as time passes.',
      ] },
      { type: 'paragraph', text: 'Time sits underneath all the others: a buyer with no alternative today may have found one within a year, and a business that priced on a short-run response can be surprised by the long-run one.' },
    ],
    realExample: { emoji: '⛽', text: 'When fuel prices rise, most drivers cannot change much in a week. Over several years some change what they drive or where they live, and the same price rise produces a much larger fall in quantity.' },
    misconception: 'Students treat "it is a necessity" as settling the answer: people must eat, so demand for food is inelastic. That is true of the category and false of any one seller in it — a buyer who must eat can still switch brands freely, so demand for ONE producer\'s bread is far more elastic than demand for bread. Say which of the two you mean.',
    examMatters: 'An Analyse (6 marks, WBS11 Appendix 6) requires developed reasoning. Two factors taken through to what they mean for this firm\'s pricing is worth more than five named and left.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each factor to the effect it has on how responsive buyers are to a price change:',
      pairs: [
        { left: 'Many close substitutes are available', right: 'Demand is more price elastic', why: 'Escaping the price rise is easy, so a small rise sends buyers elsewhere' },
        { left: 'The brand has strong customer loyalty', right: 'Demand is more price inelastic', why: 'The alternatives stop functioning as alternatives, so fewer buyers leave' },
        { left: 'The good takes a tiny share of income', right: 'The price rise is not worth reacting to', why: 'The sum involved is too small to be worth the trouble of finding an alternative' },
        { left: 'Several years pass after the price rise', right: 'Demand becomes more price elastic over time', why: 'Time lets buyers find and switch to alternatives they did not have at first' },
      ],
      distractors: ['Demand becomes perfectly inelastic at all prices'],
    }),
  };
})();

const pedAndTotalRevenue = (() => {
  const sid = subId('ped-and-revenue'); // March id, kept
  return {
    id: sid,
    title: 'PED and Total Revenue',
    keyIdea: 'Total revenue is price times quantity, and PED decides which of the two wins: raising the price raises revenue only when demand is price inelastic.',
    body: [
      { type: 'paragraph', text: '**Total revenue** is the price multiplied by the quantity sold, before any cost is taken off. Raising a price always increases the takings per case and always reduces the number of cases. Which effect is larger is exactly what PED measures.' },
      { type: 'subheading', text: 'Maji\'s revenue at four prices' },
      { type: 'bullets', items: [
        `${money(10)} × ${qdAt(10)} cases = **${money(trAt(10))}**`,
        `${money(12)} × ${qdAt(12)} cases = **${money(trAt(12))}** — the price rose, PED was ${pedS(...PED_INELASTIC)}, and revenue rose with it`,
        `${money(20)} × ${qdAt(20)} cases = **${money(trAt(20))}**`,
        `${money(25)} × ${qdAt(25)} cases = **${money(trAt(25))}** — the price rose, PED was ${pedS(...PED_ELASTIC)}, and revenue fell`,
      ] },
      { type: 'paragraph', text: `The pattern holds in every market. Where demand is **price inelastic**, price and total revenue move **together**. Where it is **price elastic**, they move in **opposite directions**. Where PED is exactly ${pedS(...PED_UNIT)} — for Maji, at ${money(PEAK_P)} — revenue is at its highest, ${money(MAX_TR)}, and a move in either direction lowers it.` },
      { type: 'paragraph', text: 'One warning that a judgement needs: maximum revenue is not maximum profit. Selling more cases costs more to make and deliver, so the price that brings in the most money is not necessarily the price that leaves the most.' },
    ],
    realExample: { emoji: '🎫', text: 'A transport operator that raises fares on a route with no alternative takes more money from fewer journeys. The same rise on a route with three competitors takes less money than before.' },
    misconception: 'Students treat revenue and profit as the same thing. Revenue is what comes in; profit is what is left after costs. A price that maximises one can easily miss the other.',
    examMatters: 'An Assess (10 marks, WBS11 Appendix 6) requires a judgement on importance. State the PED, then the revenue consequence, then what it leaves out — costs, rivals, and whether the value still holds.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the relationship between PED and total revenue:',
      template: [
        'If demand is price inelastic, a dearer case makes total revenue ___',
        'If demand is price elastic, a dearer case makes total revenue ___',
        'Total revenue is at its highest where PED is exactly ___ in size',
      ],
      answers: ['rise', 'fall', 'one'],
      hints: ['few buyers leave, so the extra per case wins', 'so many buyers leave that the extra per case is outweighed', 'the value that separates the two cases above'],
      distractors: ['stay the same', 'zero'],
    }),
  };
})();

const pedAndPricingDecisions = (() => {
  const sid = subId('ped-and-pricing-decisions');
  return {
    id: sid,
    title: 'What PED Means for Pricing',
    keyIdea: 'PED tells a business which way to move its price to raise revenue, how much of a cost rise it can pass on, and how much a discount will actually cost it.',
    body: [
      { type: 'paragraph', text: 'The specification asks for **the significance of price elasticity of demand to businesses in terms of implications for pricing**. This is the point of the whole chapter: a number the firm can act on.' },
      { type: 'bullets', items: [
        '**Which way to move the price.** Inelastic demand means a rise brings in more; elastic demand means a cut does. A firm that guesses wrong loses revenue in the direction it thought was safe.',
        '**How much of a cost rise can be passed on.** When demand is inelastic, most of a tax or a raw-material rise can go into the price and few buyers leave. When it is elastic, the firm absorbs most of it or loses the volume.',
        '**What a discount really costs.** A price cut only pays for itself if enough extra cases are sold, and PED is the estimate of "enough" before the decision rather than after it.',
        '**Where to spend on marketing.** Making demand less elastic is worth money in its own right, because it widens the range of prices the firm can charge.',
      ] },
      { type: 'paragraph', text: 'The limits matter as much as the number. PED is measured from past data, it assumes nothing else changes, and a rival free to respond can undo the revenue the calculation predicted.' },
    ],
    realExample: { emoji: '📱', text: 'Firms selling a product with few close alternatives raise prices with little loss of volume. Firms selling one of many similar products discount instead, and compete on what is not the price.' },
    misconception: 'Students conclude "demand is inelastic, so raise the price as much as possible". Elasticity changes as you move up the curve: a large enough rise turns inelastic demand elastic and the revenue gain into a loss.',
    examMatters: 'An Evaluate (20 marks, WBS11 Appendix 6) is judged on the weighing. Make the pricing case from the PED value, then set against it the costs, the rivals and the age of the data, then reach a supported judgement.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each pricing decision by whether it suits a business facing price elastic or price inelastic demand:',
      groups: [
        { name: 'Suits price elastic demand', why: 'Buyers leave readily, so volume is where the revenue is and price rises are expensive', items: [
          'Cut the price to win volume from rivals',
          'Absorb most of a cost increase rather than pass it on',
        ] },
        { name: 'Suits price inelastic demand', why: 'Few buyers leave, so the extra per unit outweighs the units lost', items: [
          'Raise the price to increase total revenue',
          'Pass most of a new indirect tax into the shelf price',
          'Resist discounting, because a price cut would not win back enough volume',
        ] },
      ],
    }),
  };
})();

/* ══ Block 5 — Income Elasticity of Demand (1.3.2 · 5a-5e) ═════════════════ */

const calculatingYed = (() => {
  const sid = subId('calculating-yed'); // March id, kept
  return {
    id: sid,
    title: 'Calculating Income Elasticity of Demand',
    keyIdea: 'YED is the percentage change in quantity demanded divided by the percentage change in income — the same fraction as PED with a different cause underneath.',
    body: [
      { type: 'paragraph', text: '**Income elasticity of demand (YED)** measures how far demand responds to a change in buyers\' incomes rather than to the good\'s own price.' },
      { type: 'bullets', items: [
        '**YED = percentage change in quantity demanded ÷ percentage change in income**',
        'The top of the fraction is the same as in PED. Only what is underneath has changed.',
      ] },
      { type: 'subheading', text: `Incomes across Maji's region rise from ${money(INCOME_FROM)} to ${money(INCOME_TO)}` },
      { type: 'flow', steps: [
        { title: 'Work out the percentage change in income', subtitle: `${money(INCOME_TO)} − ${money(INCOME_FROM)} = ${money(INCOME_TO - INCOME_FROM)}, which is ${pc(INCOME_RISE)} of the original` },
        { title: 'Work out the percentage change in the quantity demanded', subtitle: `sparkling pressé: ${PRESSE_Q[0]} cases → ${PRESSE_Q[1]}, which is ${pc(pctOf(PRESSE_Q))}` },
        { title: 'Divide the quantity percentage by the income percentage', subtitle: `${pctOf(PRESSE_Q)} ÷ ${INCOME_RISE} = ${YED_PRESSE()}` },
        { title: 'State the value with its sign', subtitle: `YED = ${sig(YED_PRESSE())}` },
      ], result: `YED = ${sig(YED_PRESSE())}`, resultType: 'neutral' },
      { type: 'paragraph', text: 'Unlike PED, the sign here is not almost always the same, and that is what makes it useful: it is the first thing you read, and it classifies the good before the size says anything at all.' },
    ],
    realExample: { emoji: '📈', text: 'A firm comparing sales across regions with different average incomes is estimating YED, whether or not it calls it that.' },
    misconception: 'Students put income on top of the fraction. Quantity demanded is always the numerator in every elasticity; what changes between them is the cause underneath.',
    examMatters: 'A Calculate (4 marks, WBS11 Appendix 6) requires workings. Both percentages written out show the method; a bare value cannot be credited for one.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the income elasticity calculation for the sparkling pressé:',
      template: [
        `Income rises by ___ per cent`,
        `Quantity demanded rises from ${PRESSE_Q[0]} to ${PRESSE_Q[1]} cases, which is ___ per cent`,
        `Dividing one by the other gives a YED of ___`,
      ],
      answers: [String(INCOME_RISE), String(pctOf(PRESSE_Q)), sig(YED_PRESSE())],
      hints: ['the change in income as a share of where it started', 'the change in cases as a share of where it started', 'the quantity percentage divided by the income percentage'],
      distractors: [String(INCOME_TO - INCOME_FROM), '−0.5'],
    }),
  };
})();

const normalAndInferiorGoods = (() => {
  const sid = subId('normal-and-inferior-goods');
  return {
    id: sid,
    title: 'Normal and Inferior Goods',
    keyIdea: 'The sign of YED classifies the good: positive means normal, bought more as incomes rise; negative means inferior, bought less as incomes rise.',
    body: [
      { type: 'paragraph', text: 'The specification names this distinction on its own, because it is the first thing a YED value tells a business, and it is read from the sign alone.' },
      { type: 'bullets', items: [
        '**A normal good** has a **positive** YED. Incomes rise and buyers take more of it. Most goods are normal.',
        '**An inferior good** has a **negative** YED. Incomes rise and buyers take **less** of it, because they move to something they preferred all along and could not previously afford.',
      ] },
      { type: 'paragraph', text: `Maji sells both. When incomes in the region rose by ${pc(INCOME_RISE)}, sales of the sparkling pressé rose from ${PRESSE_Q[0]} to ${PRESSE_Q[1]} cases — a normal good. Sales of the powdered drink mix fell from ${MIX_Q[0]} to ${MIX_Q[1]} — an inferior good, with a YED of ${sig(YED_MIX())}.` },
      { type: 'paragraph', text: '"Inferior" is a statement about the income response, not about quality. The mix is not badly made. It is inferior because buyers leave it when they can afford to, and that is the only thing the word means here.' },
    ],
    realExample: { emoji: '🚌', text: 'Long-distance coach travel loses passengers to air and rail as incomes rise. The coaches did not get worse; the alternatives came within reach.' },
    misconception: 'Students call a good inferior because it is cheap or low quality. Neither is the test. The test is what happens to the quantity demanded when incomes rise, and some cheap goods are perfectly normal.',
    examMatters: 'A Define (2 marks, WBS11 Appendix 6) on an inferior good needs the income direction, not a judgement about quality: demand falls as income rises.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each of Maji\'s products into normal or inferior, using the sign of its YED:',
      groups: [
        { name: 'Normal good', why: 'YED is positive: buyers take more of it as incomes rise', items: [
          `Sparkling pressé, YED ${sig(YED_PRESSE())}`,
          `Still bottled water, YED ${sig(YED_WATER())}`,
          'A premium chilled juice, YED +1.4',
        ] },
        { name: 'Inferior good', why: 'YED is negative: buyers take less of it as incomes rise, moving to what they now afford', items: [
          `Powdered drink mix, YED ${sig(YED_MIX())}`,
          'A value-brand cordial, YED −0.8',
        ] },
      ],
    }),
  };
})();

const interpretingYedValues = (() => {
  const sid = subId('interpreting-yed-values');
  return {
    id: sid,
    title: 'Interpreting the Numerical Values of YED',
    keyIdea: 'Read the sign first to classify the good, then the size against 1 to say whether demand is income elastic or income inelastic.',
    body: [
      { type: 'paragraph', text: 'A YED value carries two pieces of information and they are read in order: the **sign**, then the **size**.' },
      { type: 'bullets', items: [
        '**Income elastic demand** — bigger than 1 ignoring the sign. Demand moves proportionately more than income.',
        '**Income inelastic demand** — between 0 and 1 ignoring the sign. Demand moves proportionately less than income.',
        '**Perfectly income inelastic demand** — 0. Income changes and demand does not move at all.',
      ] },
      { type: 'subheading', text: 'Maji\'s three products' },
      { type: 'bullets', items: [
        `**Sparkling pressé, ${sig(YED_PRESSE())}** — positive and above 1: a normal good with income elastic demand. Sales swing more than incomes do, in both directions.`,
        `**Still water, ${sig(YED_WATER())}** — positive and below 1: a normal good with income inelastic demand. Sales rise a little when incomes rise and hold up when they fall.`,
        `**Powdered mix, ${sig(YED_MIX())}** — negative: an inferior good. Sales move the opposite way to incomes.`,
      ] },
      { type: 'paragraph', text: 'The two readings answer different questions. The sign says which way sales move with the economy; the size says how violently.' },
    ],
    realExample: { emoji: '💎', text: 'Luxury goods sell far more in good years and far less in bad ones. Basic foods barely move either way. Both are normal goods, and the difference between them is the size, not the sign.' },
    misconception: 'Students read the size and forget the sign, or the reverse. A value of −2 and a value of +2 are both large and mean opposite things for a business planning its range.',
    examMatters: 'An Explain (4 marks, WBS11 Appendix 6) needs both readings and a consequence. Sign, size, and what it means for this firm is a complete answer; any two of the three is not.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each YED value to the classification it gives the good:',
      pairs: [
        { left: sig(YED_PRESSE()), right: 'Normal and income elastic', why: 'Positive, so demand rises with income, and above 1, so it rises proportionately more' },
        { left: sig(YED_WATER()), right: 'Normal and income inelastic', why: 'Positive, so demand rises with income, but below 1, so it rises proportionately less' },
        { left: sig(YED_MIX()), right: 'Inferior', why: 'Negative, so demand falls as income rises, whatever the size of the value' },
        { left: '0', right: 'Perfectly income inelastic', why: 'Demand does not respond to an income change at all' },
      ],
      distractors: ['Perfectly price elastic'],
    }),
  };
})();

const factorsInfluencingYed = (() => {
  const sid = subId('factors-influencing-yed');
  return {
    id: sid,
    title: 'The Factors Influencing YED',
    keyIdea: 'What a good is for decides its YED: necessities stay near zero, goods bought for pleasure or status swing hardest, and cheap substitutes for them go negative.',
    body: [
      { type: 'paragraph', text: 'The specification asks for **the factors influencing income elasticity of demand**. They come down to what part the good plays in a buyer\'s life.' },
      { type: 'bullets', items: [
        '**Whether the good is a necessity.** Something a household must have is bought in much the same quantity whatever incomes do, so YED sits close to zero.',
        '**Whether it is bought for pleasure or status.** Goods buyers choose when they have spare money swing hardest with income, giving the largest positive values.',
        '**Whether a preferred alternative exists.** A good bought only to economise goes negative as soon as buyers can afford what they would rather have.',
        '**The income of the buyers being measured.** The same good can be income elastic among lower-income households, for whom it is still a stretch, and barely responsive among higher-income ones who already buy it.',
      ] },
      { type: 'paragraph', text: 'That last point is why a business selling in several regions cannot assume one YED covers all of them. The product is identical; the buyers are not.' },
    ],
    realExample: { emoji: '🍽️', text: 'Eating out is one of the first things households add when incomes rise and one of the first they cut when incomes fall. Staple groceries do neither.' },
    misconception: 'Students treat YED as a fixed property of a product. It depends on who is being asked: the same good can be a stretch for one group of buyers and routine for another.',
    examMatters: 'An Analyse (6 marks, WBS11 Appendix 6) requires linked reasoning. Name the factor, say what it does to the sign or the size, and land it on this firm\'s product.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete what each kind of good does when incomes rise:',
      template: [
        'A necessity has a YED close to ___',
        'A good bought for pleasure or status has a large ___ YED',
        'A good bought only to economise has a ___ YED',
      ],
      answers: ['zero', 'positive', 'negative'],
      hints: ['the value that means demand did not move', 'the sign every normal good carries', 'the sign that classifies a good as inferior'],
      distractors: ['one', 'unitary'],
    }),
  };
})();

const yedAndBusinessDecisions = (() => {
  const sid = subId('significance-of-yed'); // March id, kept
  return {
    id: sid,
    title: 'What YED Means for a Business',
    keyIdea: 'YED tells a business which of its products will swing with the economy, so it can spread its range across the cycle instead of betting the whole firm on one direction.',
    body: [
      { type: 'paragraph', text: 'The specification asks for **the significance of income elasticity of demand to businesses**. Where PED is about the price a firm sets, YED is about the economy it cannot set at all.' },
      { type: 'bullets', items: [
        '**Planning the range.** A firm selling only income elastic goods does very well in good years and is badly exposed in bad ones. Holding some income inelastic products, or an inferior one, steadies it.',
        '**Forecasting.** Once YED is known, a forecast of incomes becomes a forecast of sales. A value of ' + sig(YED_PRESSE()) + ' turns a 3% fall in incomes into a 6% fall in cases.',
        '**Deciding where to sell.** A rising-income region is an opportunity for an income elastic product and a warning for an inferior one.',
        '**Timing investment.** Adding capacity for an income elastic product just as incomes turn is how firms end up with plant they cannot fill.',
      ] },
      { type: 'paragraph', text: 'The same limits apply as to PED. YED is measured from past data, it assumes nothing else moved at the same time, and a change in tastes can overwhelm it entirely.' },
    ],
    realExample: { emoji: '🏨', text: 'Hotel groups that operate both budget and luxury brands are spreading income elasticity deliberately: the two halves of the business do well in different years.' },
    misconception: 'Students conclude that a business should drop its inferior goods. In a downturn those are the products holding the firm up. The purpose of knowing YED is balance across the cycle, not choosing a side.',
    examMatters: 'An Evaluate (20 marks, WBS11 Appendix 6) is judged on the weighing. Argue the range decision from the YED values, then weigh the limits of the data and what else could move demand, then judge.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each business decision by whether it suits a product with income elastic or income inelastic demand:',
      groups: [
        { name: 'Suits income elastic demand', why: 'Sales swing more than incomes, so the product is expanded in good years and exposed in bad ones', items: [
          'Expand fastest in regions where incomes are rising quickly',
          'Hold back on new capacity when a downturn is forecast',
        ] },
        { name: 'Suits income inelastic demand', why: 'Sales barely move with incomes, so the product is what steadies the firm across the cycle', items: [
          'Rely on it for steady volume through a downturn',
          'Keep it in the range even when the economy is growing',
        ] },
      ],
    }),
  };
})();

/* ══ Blocks ════════════════════════════════════════════════════════════════ */

const BLOCKS = [
  {
    title: B1,
    sections: [whatIsDemand, changeInPriceVersusChangeInDemand, substitutesAndComplements, consumerIncomes, fashionsTastesPreferences, marketingAdvertisingBranding, demographics, externalShocksAndSeasonality],
    takeaway: [
      'Demand is willing AND able, at each price, over a period.',
      'The good\'s own price moves quantity demanded; the seven factors move demand.',
      'Substitutes move demand the same way; complements move it the opposite way.',
      'A shock is unforeseen; a season is on the calendar and can be planned for.',
    ],
  },
  {
    title: B2,
    sections: [whatIsSupply, costsOfProduction, newTechnology, indirectTaxesAndSubsidies, externalShocksSupply],
    takeaway: [
      'Supply slopes up because a higher price covers the cost of making more.',
      'Costs up, supply left. Technology in, supply right.',
      'An indirect tax and a subsidy are one lever pulled in opposite directions.',
      'A supply shock removes the ability to produce, not the willingness to buy.',
    ],
  },
  {
    title: B3,
    sections: [interactionOfDemandAndSupply, drawingDemandAndSupplyDiagrams, changeInDemandOnADiagram, changeInSupplyOnADiagram],
    takeaway: [
      'One price makes the quantity wanted and the quantity offered the same.',
      'Label both axes, both curves, and the price and quantity where they meet.',
      'Demand change: price and quantity move together.',
      'Supply change: price and quantity move in opposite directions.',
    ],
  },
  {
    title: B4,
    sections: [calculatingPed, interpretingPedValues, factorsInfluencingPed, pedAndTotalRevenue, pedAndPricingDecisions],
    takeaway: [
      'PED = % change in quantity demanded ÷ % change in price.',
      'Ignore the sign, compare the size with 1.',
      'Inelastic: raise the price. Elastic: cut it.',
      'Every factor behind PED is about how easily a buyer can go elsewhere.',
    ],
  },
  {
    title: B5,
    sections: [calculatingYed, normalAndInferiorGoods, interpretingYedValues, factorsInfluencingYed, yedAndBusinessDecisions],
    takeaway: [
      'YED = % change in quantity demanded ÷ % change in income.',
      'Sign first: positive is normal, negative is inferior.',
      'Then size: above 1 is income elastic, below 1 income inelastic.',
      'Inferior means buyers leave as incomes rise, not that the good is poor.',
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
 * Five Notes topics, one per Learn Mode chapter, so `depth.notes-titles` has a title to match against
 * every one of them. Notes carry the specification's own phrasing where the coverage rule needs it
 * (packet 14's rule): `spec.uncovered` is lexical and matches whole tokens, so a leaf worded "The
 * drawing and interpretation of demand and supply diagrams to show the causes and consequences of
 * changes in demand and supply" needs those words together in one field, and the sentence must still
 * teach. None of them carries "equilibrium", which the Business specification never uses.
 */
const def = (text) => ({ type: 'def', text });
const mech = (text) => ({ type: 'mech', text });
const exam = (text) => ({ type: 'imp', text, tag: 'exam' });
const link = (text) => ({ type: 'link', text });

export const NOTES = [
  {
    title: B1,
    meta: '2 concepts + 7 named factors',
    keyIdea: 'Demand is a schedule of prices and quantities, and the specification names seven factors leading to a change in demand — none of them the good\'s own price.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Demand</strong> — the quantity buyers are willing and able to buy at each price over a period of time. Both halves are required.'),
        def('<strong>Quantity demanded</strong> — one row of that schedule, at one stated price.'),
        def('<strong>A change in quantity demanded</strong> comes from the good\'s own price, and is a different point on the same schedule. <strong>A change in demand</strong> comes from anything else, and replaces the schedule at every price.'),
      ] },
      { title: 'THE SEVEN FACTORS (1a)', items: [
        mech('<strong>Changes in the prices of substitutes and complementary goods</strong> — a substitute\'s price moves demand the same way; a complement\'s price moves it the opposite way.'),
        mech('<strong>Changes in consumer incomes</strong> — up for most goods, down for the few bought only to economise.'),
        mech('<strong>Fashions, tastes and preferences</strong> — what buyers want changes on its own, from outside the market.'),
        mech('<strong>Marketing, advertising and branding</strong> — the only factor the business controls; it shifts demand and makes buyers less willing to leave.'),
        mech('<strong>Demographics</strong> — both the size of the population and its make-up, which are two effects in one bullet.'),
        mech('<strong>External shocks</strong> — sudden, unforeseen, from outside the market.'),
        mech('<strong>Seasonality</strong> — a swing that repeats on a known cycle, so it can be planned for.'),
      ] },
    ],
    takeaway: [
      'Willing AND able, at a stated price, over a stated period.',
      'Own price: a different row. Any other factor: a different schedule.',
      'Demographics is two factors in one: how many buyers, and which buyers.',
    ],
    misconception: '"Demand rose" after a price cut is wrong: a price cut moves quantity demanded, not demand.',
  },
  {
    title: B2,
    meta: '2 concepts + 5 named factors',
    keyIdea: 'Supply is the seller\'s schedule and slopes upward, and every factor leading to a change in supply works by changing what a unit costs to produce.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Supply</strong> — the quantity producers are willing and able to sell at each price over a period of time.'),
        def('<strong>Quantity supplied</strong> — one row of that schedule. The good\'s own price moves you between rows; everything else replaces the schedule.'),
      ] },
      { title: 'THE FIVE FACTORS (2a)', items: [
        mech('<strong>Changes in the costs of production</strong> — wages, materials, energy, transport. Costs up, supply left, because the dearest units stop being worth making.'),
        mech('<strong>Introduction of new technology</strong> — cost per unit down, supply right. It has to be paid for first and rarely stays exclusive.'),
        mech('<strong>Indirect taxes</strong> — a tax on the good adds to the cost of supplying each unit, so supply shifts left.'),
        mech('<strong>Government subsidies</strong> — a payment per unit takes cost away, so supply shifts right. The same lever as a tax, pulled the other way.'),
        mech('<strong>External shocks</strong> — drought, strike, blocked route, fire at a supplier. The ability to produce is lost, at every price.'),
        link('How much of an indirect tax reaches the shelf price depends on how buyers respond to a price change, which is what PED measures.'),
      ] },
    ],
    takeaway: [
      'Supply slopes up because extra output costs more to produce.',
      'Every supply factor works through the cost of one more unit.',
      'Tax shifts supply left; subsidy shifts it right.',
    ],
  },
  {
    title: B3,
    meta: '1 interaction, 2 diagrams',
    keyIdea: 'The interaction of demand and supply settles one price, and the drawing and interpretation of demand and supply diagrams is how the causes and consequences of changes in demand and supply are shown.',
    blocks: [
      { title: 'THE INTERACTION (3a)', items: [
        def('<strong>The interaction of demand and supply</strong> — at one price the quantity buyers want and the quantity producers offer are the same, and neither side has a reason to move.'),
        mech('Below that price buyers compete for a quantity that is not there and sellers can ask more. Above it, stock goes unsold and sellers accept less.'),
        link('Textbooks and the Economics course call that price the <em>equilibrium</em>. This specification asks for the interaction of demand and supply, and that is the wording used here.'),
      ] },
      { title: 'THE DIAGRAMS (3b)', items: [
        mech('The drawing and interpretation of demand and supply diagrams to show the causes and consequences of changes in demand and supply: label both axes, both curves, and the price and quantity where they meet.'),
        mech('Keep the original curve when drawing a shift, label the new one D₂ or S₂, and arrow the direction. A shift is only visible against where the curve used to be.'),
        mech('<strong>Demand changes</strong>: price and quantity move <strong>together</strong>. Up for an increase, down for a decrease.'),
        mech('<strong>Supply changes</strong>: price and quantity move in <strong>opposite directions</strong>. A fall in supply raises price and lowers quantity.'),
        exam('Those two patterns run backwards as well: a price rise beside a fall in quantity can only have come from the supply side.'),
      ] },
    ],
    takeaway: [
      'One price makes the quantity wanted and the quantity offered equal.',
      'Demand moves: price and quantity go the same way.',
      'Supply moves: price and quantity go opposite ways.',
      'A Construct is marked on its labels, so label before you explain.',
    ],
  },
  {
    title: B4,
    meta: '2 formulas, 5 values, 5 factors',
    keyIdea: 'PED measures how far quantity demanded responds to the good\'s own price, and it is what decides whether a price rise raises total revenue.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Price elasticity of demand (PED)</strong> — the percentage change in quantity demanded divided by the percentage change in price. Normally negative.'),
        def('The values: <strong>perfectly price elastic</strong> (infinite), <strong>price elastic</strong> (above 1), <strong>unitary price elastic</strong> (exactly 1), <strong>price inelastic</strong> (between 0 and 1), <strong>perfectly price inelastic</strong> (0).'),
        def('<strong>Total revenue</strong> — price multiplied by quantity sold, before any cost is deducted. Not profit.'),
      ] },
      { title: 'THE FACTORS (4c)', items: [
        mech('The factors influencing price elasticity of demand: availability of substitutes, branding and loyalty, whether the good is a necessity, the share of income it takes, and time.'),
        mech('Every one works through how easily a buyer can go elsewhere or go without. Time sits underneath them all.'),
      ] },
      { title: 'REVENUE AND PRICING (4d, 4e)', items: [
        mech('<strong>Price inelastic</strong>: price and total revenue move together. <strong>Price elastic</strong>: they move in opposite directions. <strong>Unitary</strong>: revenue is at its maximum.'),
        mech('The significance of price elasticity of demand to businesses in terms of implications for pricing: which way to move the price, how much of a cost rise can be passed on, and what a discount actually costs.'),
        link('Elasticity changes as you move along the curve, so "inelastic, therefore raise the price" has a limit built into it.'),
        exam('Maximum revenue is not maximum profit: more units sold cost more to make and deliver.'),
      ] },
    ],
    formulas: [
      { label: 'PED', text: 'PED = (% change in quantity demanded) ÷ (% change in price)' },
      { label: 'PERCENTAGE CHANGE', text: '% change = (new value − original value) ÷ ORIGINAL value × 100' },
      { label: 'TOTAL REVENUE', text: 'Total revenue = price × quantity sold' },
    ],
    takeaway: [
      'Percentages first, original value underneath, sign kept.',
      'Size against 1 classifies it; the sign only says they moved opposite ways.',
      'Inelastic: price and revenue together. Elastic: opposite ways.',
    ],
  },
  {
    title: B5,
    meta: '1 formula, 2 classifications',
    keyIdea: 'YED has the same form as PED with income underneath, and its sign classifies the good before its size says anything about how far demand moves.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Income elasticity of demand (YED)</strong> — the percentage change in quantity demanded divided by the percentage change in income.'),
        def('<strong>Normal and inferior goods</strong>: a normal good has a positive YED and is bought more as incomes rise; an inferior good has a negative YED and is bought less.'),
        def('The values: <strong>income elastic</strong> (above 1), <strong>income inelastic</strong> (between 0 and 1), <strong>perfectly income inelastic</strong> (0).'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('The factors influencing income elasticity of demand: whether the good is a necessity, whether it is bought for pleasure or status, whether a preferred alternative exists, and the income of the buyers being measured.'),
        mech('"Inferior" describes the income response and not the quality. Buyers leave the good when they can afford what they would rather have.'),
        mech('The significance of income elasticity of demand to businesses: planning a range across the economic cycle, turning an income forecast into a sales forecast, and choosing where to expand.'),
        link('The same product can have different YED values among different groups of buyers, so one figure will not cover every region.'),
        exam('Sign first, then size. A value of −2 and a value of +2 are both large and mean opposite things.'),
      ] },
    ],
    formulas: [
      { label: 'YED', text: 'YED = (% change in quantity demanded) ÷ (% change in income)' },
    ],
    takeaway: [
      'Positive YED is a normal good; negative is an inferior good.',
      'Above 1 income elastic, below 1 income inelastic.',
      'A firm holds both, so the range survives good years and bad.',
    ],
  },
];
