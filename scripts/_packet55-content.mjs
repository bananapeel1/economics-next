/**
 * PACKET 55 — global-marketing teaching content: five chapters over the specification's three items
 * (`bus_spec.txt:1424-1446`), fifteen subsections, one step each, and one recall per subsection.
 *
 * WHY FIVE CHAPTERS FOR THREE ITEMS. Item 1 ("Marketing") carries four lettered lines of different
 * kinds: a strategy (1a), three named approaches (1b), the 4Ps applied (1c) and two frameworks applied
 * (1d). `structure-08` asks for a ramp from definitions to application to frameworks to evaluation;
 * one chapter per kind gives it. Item 2 (niche markets) and item 3 (cultural/social factors) are a
 * chapter each.
 *
 *   1 Global Marketing Strategy and Approaches   1a, 1b        (topFix-01, specGap-01, structure-03)
 *   2 The Marketing Mix in Global Markets        1c            (quiz-01's product/price line taught)
 *   3 Ansoff and Porter in Global Marketing      1d            (specGap-02, specGap-03 — ONE leaf)
 *   4 Global Niche Markets                       2a, 2b, 2c    (specGap-04, specGap-05, structure-05)
 *   5 Cultural and Social Factors                3a × 4        (topFix-02, specGap-07, structure-07)
 *
 * WHAT THE LIVE SECTION TAUGHT AND WHAT HAPPENED TO IT. "Global Standardisation" and "Glocalisation"
 * are rewritten into chapter 1. "Hofstede's Cultural Dimensions" is removed and banned (0 hits in
 * the specification; `specGap-08`), with the KFC anecdote and its "high-context" claim
 * (`accuracy-01`). "Cultural Mistakes" becomes chapter 5, on the four bullets of 3a, with no
 * real-firm anecdote: every example below is either a general, checkable pattern or an invented firm,
 * because Layer 4 deletes what it cannot corroborate (the Chevrolet Nova story is the named case).
 */
import { SECTION, subId, id, FIRM, usd, usdm, units, pct } from './_packet55-util.mjs';

const F = FIRM;
const blockId = (title) => id('block', title);
const recall = (sid, spec) => ({ id: `${sid}:recall`, ...spec });
const sub = (slug, spec) => { const sid = subId(slug); return { id: sid, ...spec, recall: recall(sid, spec.recall) }; };
const p = (text) => ({ type: 'paragraph', text });
const bullets = (items) => ({ type: 'bullets', items });
const flow = (resultType, steps, result) => ({ type: 'flow', resultType, steps: steps.map(([title, subtitle]) => ({ title, subtitle })), result });

export const B1 = 'Global Marketing Strategy and Approaches';
export const B2 = 'The Marketing Mix in Global Markets';
export const B3 = 'Ansoff and Porter in Global Marketing';
export const B4 = 'Global Niche Markets';
export const B5 = 'Cultural and Social Factors';

/* ══ Chapter 1 — Global marketing strategy and approaches (4.3.3 · 1a, 1b) ═══ */

const globalStrategy = sub('global-strategy-and-glocalisation', {
  title: 'Global Marketing Strategy and Glocalisation',
  keyIdea: 'A global marketing strategy plans one marketing approach for the world market; glocalisation keeps that global core and adapts what local buyers need changed.',
  body: [
    p(`A **global marketing strategy** treats every country a firm sells in as one market. The brand, the core product and the message are planned once and used everywhere, as far as buyers allow.`),
    p(`The gain is scale. ${F.name}, a ${F.homeAdj} skincare brand sold in ${F.countries} countries, can make one advertising campaign for ${usdm(F.globalCampaign)} and run it in all of them: ${usd(F.globalPerCountry)} a country. Separate campaigns would cost ${usd(F.localCampaign)} each, ${usdm(F.localTotal)} in total. Standardising saves ${usdm(F.campaignSaving)}, and buyers see the same brand wherever they travel.`),
    p(`The risk is that buyers are not the same everywhere. A message, a pack or a product that works at home can fail where beliefs, tastes or languages differ, and then the saving is paid for in lost sales.`),
    p(`**Global localisation**, or **glocalisation**, is the answer most global brands reach: "think global, act local". The firm keeps what gives it scale and recognition, such as the name, the logo and the core formula, and changes only the parts a country's buyers would otherwise reject.`),
  ],
  realExample: { emoji: '🍜', text: 'An instant-noodle brand keeps its name, logo and cup design in every country, but sells a chicken version with no pork where many buyers avoid pork, and a hotter one where buyers prefer strong chilli.' },
  misconception: 'Students write that a global marketing strategy simply means selling in many countries. Selling in many countries is exporting; a global strategy is ONE plan for all of them. A firm in forty countries running forty unrelated campaigns does not have one.',
  examMatters: 'When a case gives the cost of one campaign against several, work out the saving from standardising, then say what could be lost if buyers in one country reject the standard message.',
  recall: {
    type: 'reorder',
    prompt: 'Put the steps in the order a firm follows to glocalise a product for a new market, from first to last.',
    criterion: 'the order of the glocalisation decision, from first to last',
    correctOrder: [
      'Research the new market\'s culture, tastes and rules',
      'Decide which parts of the mix stay global and which change',
      'Test the adapted product and message with local buyers',
      'Launch with the global brand and the local changes',
    ],
    why: [
      'Nothing can be adapted sensibly until the firm knows what differs in this market.',
      'The research tells it what must change; everything else stays standard to keep the saving.',
      'A trial with local buyers catches a wrong adaptation while it is still cheap to fix.',
      'Only a tested mix is launched, carrying the global brand with its local changes.',
    ],
  },
});

const ethnoPoly = sub('ethnocentric-and-polycentric', {
  title: 'Ethnocentric and Polycentric Approaches',
  keyIdea: 'An ethnocentric approach markets abroad the way it markets at home; a polycentric approach builds a separate marketing mix for each country.',
  body: [
    p('A firm selling abroad can take one of three **marketing approaches**, and each answers the same question: whose view of the customer shapes the marketing?'),
    p('A **domestic** or **ethnocentric** approach starts from home. The firm sells abroad the product, pack, price structure and adverts it designed for home buyers, assuming that what sells at home will sell elsewhere. It is cheap and quick, because nothing is redesigned, and head office keeps control. It works when the product meets the same need everywhere; it fails when buyers abroad differ from buyers at home.'),
    p('An **international** or **polycentric** approach starts from each country. Every market is treated as different, usually with a local team deciding the mix there, so the product, the price, the channels and the message can all differ. It gives the closest fit to local buyers, but it costs more, gives up the saving from one campaign, and can leave the brand looking different in every country.'),
    p('The two sit at opposite ends: one mix for everyone, designed at home, against a new mix for each country, designed there.'),
  ],
  realExample: { emoji: '🧃', text: 'A juice maker in Kenya first sold its home packs and adverts unchanged in two neighbouring countries. When it entered a market with a different language and diet, it handed pack design and flavours to a team based there.' },
  misconception: 'Students confuse an ethnocentric approach with a global marketing strategy, because both use one mix. The difference is where the mix comes from: ethnocentric uses the HOME mix unchanged, while a global strategy is designed for the world market from the start.',
  examMatters: 'Use the paired names the first time — "domestic/ethnocentric", "international/polycentric" — then explain the approach in terms of who decides the mix and how much of it changes.',
  recall: {
    type: 'classify',
    prompt: 'Sort each decision by the approach it shows: ethnocentric or polycentric.',
    groups: [
      { name: 'Ethnocentric', items: ['TV adverts made for viewers at home are aired abroad as they are', 'Head office issues one price list for every country', 'The home pack is exported with only the address changed'], why: 'The home market\'s mix is used abroad as it is, and the decision is taken at home.' },
      { name: 'Polycentric', items: ['A team in each country picks its own flavours', 'Each country manager sets prices for that market', 'Every country gets its own brand name and adverts'], why: 'Each country\'s mix is designed for that country, usually by people working there.' },
    ],
  },
});

const geocentric = sub('geocentric-the-mixed-approach', {
  title: 'The Mixed/Geocentric Approach',
  keyIdea: 'A geocentric approach sees the world as one market, keeps common what buyers share, and changes the rest; it is the approach behind glocalisation.',
  body: [
    p('A **mixed** or **geocentric** approach takes neither home nor each separate country as its starting point. It looks at the world market as a whole, asks what buyers everywhere have in common, and standardises that; then it changes the elements where countries genuinely differ.'),
    p(`${F.name} works this way. One brand, one core formula and one global campaign serve all ${F.countries} countries, while each country team can choose pack sizes, a fragrance or the model in an advert. Decisions are shared between head office and the country teams rather than taken wholly by either.`),
    p('Its strength is balance: most of the saving from standardising, with enough local fit to sell. Its weakness is that the line between shared and local has to be drawn and redrawn, which takes management time and causes disputes between head office and the countries.'),
    p('Choosing between the three approaches turns on how alike the firm\'s buyers are, how costly a local mistake would be, and how much the firm can spend. A product that meets the same need everywhere leans towards one mix; one that touches food, faith or language leans towards local adaptation.'),
  ],
  realExample: { emoji: '📱', text: 'A phone-case brand designs one range and one online campaign for all its markets, but lets each country choose which colours to stock and translate the product pages.' },
  misconception: 'Students treat the mixed approach as automatically right because it sounds balanced. It has its own cost, the management time spent deciding what is shared, and a firm whose buyers are alike everywhere gains little from it.',
  examMatters: 'A judgement between the approaches should name the condition that decides it, such as how alike buyers are or what a local mistake would cost, rather than choose the mixed approach as a safe middle.',
  recall: {
    type: 'fillin',
    prompt: 'Name the approach each firm is taking:',
    template: [
      'A tea brand ships its home-market tins and posters abroad with no changes: the ___ approach.',
      'A bank lets the team in every country design its own accounts, fees and adverts: the ___ approach.',
      'A trainer brand shares its logo and designs worldwide, while sizes and adverts vary by country: the ___ approach.',
    ],
    answers: ['ethnocentric', 'polycentric', 'geocentric'],
    hints: ['the home market is the reference point', 'every country is its own reference point', 'the world market as a whole is the reference point'],
    distractors: ['standardised', 'diversified'],
  },
});

/* ══ Chapter 2 — The marketing mix in global markets (4.3.3 · 1c) ═══════════ */

const product = sub('product-in-global-markets', {
  title: 'Product: Standardise or Adapt?',
  keyIdea: 'A product can travel unchanged or be adapted in its formula, size or label; the more it touches climate, law, belief or taste, the more it tends to change.',
  body: [
    p('The **marketing mix (4Ps)** — product, price, place and promotion — has to be applied to every market a firm enters, and each P can be standardised or adapted. Product comes first, because the other three are built around it.'),
    p('Some products travel unchanged: a phone charger meets the same need everywhere. Others need **adaptation** to the conditions of the market: its climate, its religious or legal rules on ingredients and labelling, its language, and how much and how often people buy.'),
    p(`${F.name}'s core moisturiser is the same in every country. In ${F.market}, where the climate is hot and dry, it sells a lighter, alcohol-free gel, labelled in ${F.market}'s own language. The brand, the logo and the core formula stay the same.`),
    p('Every adaptation costs something: a separate production run, new packaging, more stock to hold. So a firm adapts only where the standard version would lose more sales than the change costs.'),
  ],
  realExample: { emoji: '🍫', text: 'Chocolate makers selling into hot countries use recipes that soften at a higher temperature, so bars survive the journey from warehouse to shop.' },
  misconception: 'Students write that adapting the product always raises sales. It raises sales only where buyers would reject the standard version; elsewhere it adds cost for no gain, and too many versions weaken one recognisable brand.',
  examMatters: 'Name the local condition that forces the change, such as climate, law, belief, income or taste, and the P it changes. An adaptation with no reason attached is description, not application.',
  recall: {
    type: 'match',
    prompt: 'Match each product change to the local condition that calls for it.',
    pairs: [
      { left: 'A thinner lotion that dries in seconds', right: 'Heat and high humidity', why: 'Heavy creams feel greasy and slide off in hot, damp weather.' },
      { left: 'Ingredients certified as permitted by a faith', right: 'Buyers whose religion restricts what they use', why: 'For these buyers an uncertified product is not an option at all.' },
      { left: 'A pack reprinted with new wording and warnings', right: 'Another language and labelling law', why: 'The law and the reader both need the pack in the local language.' },
      { left: 'A pack a tenth of the usual size', right: 'Shoppers who buy a little at a time', why: 'Buyers with little cash to spare at once buy small amounts often.' },
    ],
  },
});

const price = sub('price-in-global-markets', {
  title: 'Price: Incomes, Pack Sizes and Local Rivals',
  keyIdea: 'Price is adapted to what buyers can pay, what local rivals charge and what it costs to reach the market; changing the pack size is how many firms reach a price.',
  body: [
    p('Price is the P most often changed, because incomes, local rivals and the cost of reaching a country all differ. One price in dollars can be a bargain in one market and a luxury in the next.'),
    p(`Where incomes are low, the obstacle is often the **price of one purchase**, not the price per ml. ${F.name}'s ${F.bottleMl} ml bottle sells at ${usd(F.bottlePrice)}, which is ${usd(F.perMlBottle)} a ml. A ${F.packMl} ml **sachet** at ${usd(F.packPrice)} is ${usd(F.perMlPack)} a ml, a third more, yet the buyer needs only a sixth of the money at the till.`),
    p('That move changes two Ps, and good answers separate them. Making the smaller pack is a **product** decision, because the size of what is sold changes. Charging a price for it is a **price** decision, because it sets what one purchase costs.'),
    p('Price is also set against local rivals — lower where cheap local brands are strong, higher where a foreign brand carries status — and it must cover the tariffs and freight that buyers at home never pay for.'),
  ],
  realExample: { emoji: '🧴', text: 'Shampoo, coffee and detergent are widely sold in single-use packs in lower-income markets, so a household can buy a few days\' supply with the cash it has that day.' },
  misconception: 'Students assume a small pack is cheaper for the buyer. It is cheaper per purchase but usually dearer per ml, so a buyer who relies on small packs pays more over a month than one who can afford the large size.',
  examMatters: 'If a case gives pack sizes and prices, work out the price per unit of each: it shows whether the adaptation made the product cheaper or only easier to afford at once.',
  recall: {
    type: 'fillin',
    prompt: 'Name the P each decision belongs to:',
    template: [
      'A coffee brand swaps its jar for a single-cup stick, changing how much is sold at once: a ___ decision.',
      'It then asks a few cents for each stick, so one purchase fits a daily budget: a ___ decision.',
    ],
    answers: ['product', 'price'],
    hints: ['what the buyer receives has changed', 'what the buyer hands over has changed'],
    distractors: ['place', 'promotion'],
  },
});

const placePromotion = sub('place-and-promotion-abroad', {
  title: 'Place and Promotion Abroad',
  keyIdea: 'Place follows how and where buyers in each country shop; promotion follows what they watch, read and believe, and what the law allows.',
  body: [
    p('**Place** is adapted to how a country shops. In one market supermarkets dominate; in another most goods are bought from small family shops, open markets, or online and delivered. A firm that uses only the channels it knows at home can leave most buyers unreached.'),
    p(`${F.name} sells mainly through pharmacies at home. In ${F.market} most skincare is bought in small shops and online, so it appoints a local distributor for the small shops and sells direct through its own website.`),
    p('**Promotion** is the P where culture matters most. The media people use differ, and so do what an advert may show, which public figures people trust, what humour works and what the law allows; some countries restrict adverts aimed at children or adverts that name a rival.'),
    p('A global campaign can keep one message and one visual style while changing the language, the people and the setting in each country: the promotional form of glocalisation.'),
  ],
  realExample: { emoji: '📺', text: 'A sports-drink brand runs one global advert idea, an athlete pushing past exhaustion, but films each country\'s version with a well-known local athlete, in the local language.' },
  misconception: 'Students treat translating an advert as adapting it. A translation changes the words; adaptation may change the images, the setting, the people and the media used, because a message that is accurate can still be unwelcome.',
  examMatters: 'Say which channel or medium the buyers in the case actually use, and why the home approach would not reach them. That turns a list of Ps into application.',
  recall: {
    type: 'classify',
    prompt: 'Sort each change into place or promotion.',
    groups: [
      { name: 'Place', items: ['Stocking corner kiosks instead of hypermarkets', 'Shipping web orders to remote villages', 'Appointing an agent who supplies rural stores'], why: 'These change where and how buyers get hold of the product.' },
      { name: 'Promotion', items: ['Hiring a local film star for the campaign', 'Moving the budget from television to a messaging app', 'Dropping a slogan that mocks a rival brand'], why: 'These change how buyers hear about the product and what they are told.' },
    ],
  },
});

/* ══ Chapter 3 — Ansoff and Porter applied to global marketing decisions (4.3.3 · 1d) ═ */

const ansoff = sub('ansoff-applied-to-global-marketing', {
  title: 'Ansoff\'s Matrix Applied to Global Decisions',
  keyIdea: 'Applied abroad, Ansoff\'s matrix sorts a firm\'s global options by whether the product and the market are new to it, and shows how risk rises as more is new.',
  body: [
    p('**Ansoff\'s matrix** (a Unit 3 theory of corporate strategy, 3.3.1) asks two questions of any growth option: is the product one the firm already sells, and is the market one it already sells in? In global marketing the market is usually a country, or a group of buyers in one.'),
    p(`${F.name}'s four options, one in each cell:`),
    bullets([
      `**Market penetration**: sell more of its existing moisturiser in the ${F.countries} countries it already serves, with more promotion.`,
      `**Market development**: take the existing moisturiser to ${F.market}, where it has never sold.`,
      `**Product development**: launch a new sun-protection range for buyers in its existing ${F.countries} countries.`,
      `**Diversification**: launch a hair-care range in ${F.market}, a new product in a new country.`,
    ]),
    p('Risk rises as more becomes new. Market development abroad adds the unknowns of a new country (culture, law, channels) to a product the firm knows works; diversification abroad adds both unknowns at once, which is why firms usually enter a country with a proven product first.'),
    p('The test for the two middle cells is which element changed. Adapting an existing product so it sells in a new country, with a new label or pack size, is still **market development**, because the country is what is new. **Product development** is a genuinely new product for buyers the firm already has.'),
  ],
  realExample: { emoji: '🗺️', text: 'A frozen-food maker entering a new region usually starts with its best-selling existing meals, which is market development, and develops new dishes for buyers there only once it knows them.' },
  misconception: 'Students call any change made for a foreign market "product development". Relabelling or resizing an existing product for a new country is market development; product development means a new product for buyers the firm already serves.',
  examMatters: 'Place the option in one cell, say which element is new, and use the cell to judge risk; then say what in the case makes that risk larger or smaller than the matrix suggests.',
  recall: {
    type: 'match',
    prompt: 'Match each of a juice brand\'s moves to its cell in Ansoff\'s matrix.',
    pairs: [
      { left: 'Extra advertising for its orange juice at home', right: 'Market penetration', why: 'Same product, same market: it is selling more of what it already sells, where it already sells.' },
      { left: 'Its orange juice exported unchanged to a new country', right: 'Market development', why: 'The juice is proven; only the country is new.' },
      { left: 'A new vitamin drink for its home-country buyers', right: 'Product development', why: 'The buyers are existing ones; only the product is new.' },
      { left: 'A bottled-water range in a country it has never supplied', right: 'Diversification', why: 'Both the product and the market are new, so both sets of unknowns arrive together.' },
    ],
  },
});

const porter = sub('porter-applied-to-global-marketing', {
  title: 'Porter\'s Matrix Applied to Global Decisions',
  keyIdea: 'Porter\'s matrix asks how a firm will win abroad, on lower cost or on difference, and whether it targets the whole global market or one part of it.',
  body: [
    p('**Porter\'s Strategic Matrix** (also 3.3.1) asks two things: does the firm\'s advantage come from lower cost or from offering something different, and does it aim at a broad market or a narrow one? Applied to global marketing, the answers shape the mix in every country.'),
    p('**Cost leadership** across the world means one standard product made at great scale and sold on price; it fits a global marketing strategy, because every local version adds cost. **Differentiation** across the world means a product buyers value for something rivals lack, such as quality, design or a trusted brand, with one consistent image and a price that covers it.'),
    p(`**Cost focus** and **differentiation focus** aim at one part of the market. Globally, that part is often a group of buyers spread across many countries. ${F.name}'s halal-certified, alcohol-free serum is differentiation focus: something distinctive, built for one group, sold wherever that group lives.`),
    p('The position limits the mix. A cost leader cannot afford many local versions; a differentiator can adapt more, but must keep what makes it distinctive the same everywhere.'),
  ],
  realExample: { emoji: '🏷️', text: 'A low-cost stationery maker sells the same pens in the same packs in dozens of countries and competes on price; a rival sells hand-bound notebooks at many times the price to collectors in the same countries.' },
  misconception: 'Students equate cost leadership with charging the lowest price. It means having the lowest cost; a global cost leader may price at the market level and earn a wider margin, cutting price only when it chooses to.',
  examMatters: 'Place the firm in one cell with evidence from the case, then say what that position means for the 4Ps abroad, especially how much local adaptation it can afford.',
  recall: {
    type: 'classify',
    prompt: 'Sort each global position by where its advantage comes from: lower cost or difference.',
    groups: [
      { name: 'Lower cost', items: ['One standard charger made in vast volumes and sold on price in fifty countries', 'The cheapest supplier of uniforms to international schools', 'An airline flying one aircraft type on every route to keep costs down'], why: 'Each wins by supplying more cheaply than rivals, broadly or to one group.' },
      { name: 'Difference', items: ['A luxury watch with the same prestige image in every country', 'Gluten-free baking mixes for coeliac buyers worldwide', 'Hand-finished guitars for professional players across the world'], why: 'Each wins because buyers value something rivals do not offer, broadly or to one group.' },
    ],
  },
});

const bothMatrices = sub('using-ansoff-and-porter-together', {
  title: 'Using Both Matrices for a Global Decision',
  keyIdea: 'Ansoff\'s matrix says where a firm grows and how risky that is; Porter\'s says how it will compete once there. A global marketing decision needs both answers.',
  body: [
    p('The two matrices answer different questions, so a global marketing decision usually needs both. Ansoff asks **where**: which products, in which countries, at what risk. Porter asks **how**: on what basis the firm will beat rivals once it is there.'),
    p(`${F.name} entering ${F.market} with its existing moisturiser is market development. How it competes there is a separate choice. Against cheap local creams it cannot win on cost when it ships from ${F.home}, so it competes on difference, with halal certification, a gel texture and a trusted brand, and prices above local rivals.`),
    p('The two answers together then shape the mix: a standard brand and core formula, an adapted pack and label, selected shops rather than every market stall, and promotion that stresses what makes the product different.'),
    p('Neither matrix makes the decision. Ansoff says nothing about how large a market is or how well the firm understands it, and Porter\'s cells blur when a firm is low-cost in one country and premium in another. They organise the argument; the evidence in the case decides it.'),
  ],
  realExample: { emoji: '🧭', text: 'A Nigerian fashion label taking its existing designs to buyers of Nigerian origin in several other countries is developing new markets, and it competes on its designs and fabrics rather than on price.' },
  misconception: 'Students use Ansoff\'s matrix to say how a firm should compete, or Porter\'s to say which country it should enter. Each answers only its own question, so using one for the other\'s job misapplies both.',
  examMatters: 'In a longer answer, use Ansoff to judge the risk of the move and Porter to judge whether the firm can win once there; the conclusion weighs the two.',
  recall: {
    type: 'classify',
    prompt: 'Sort each question by the matrix that answers it: Ansoff\'s or Porter\'s.',
    groups: [
      { name: 'Ansoff\'s matrix', items: ['Should we sell our existing range in a new country?', 'Is a new product in a new country too risky for us?', 'Should we push for more sales where we already sell?'], why: 'These are about which products in which markets, and the risk of the move.' },
      { name: 'Porter\'s matrix', items: ['Should we compete on the lowest cost or on being different?', 'Should we target every buyer or one group of them?', 'Can our quality justify charging more than local rivals?'], why: 'These are about the basis of competition and how wide the target is.' },
    ],
  },
});

/* ══ Chapter 4 — Global niche markets (4.3.3 · 2a-2c) ════════════════════════ */

const diversity = sub('cultural-diversity', {
  title: 'Cultural Diversity: Different Interests and Values',
  keyIdea: 'Cultural diversity means groups of people across the globe have different interests and values, and a group that shares them can be a market wherever it lives.',
  body: [
    p('**Cultural diversity** is the recognition that groups of people across the globe have different interests and values. A country is not one market of identical buyers: within it are groups with their own beliefs, customs and ways of spending their time.'),
    p('Two kinds of difference matter for marketing. **Values** are beliefs about what is right or important: a faith\'s rules, a commitment to protecting animals, a view of how people should dress. **Interests** are what people enjoy or spend time on: a sport, a kind of music, a hobby.'),
    p('Shared values and interests are what create global niches. A group that shares a value or an interest is often **spread across many countries**. It may be a small share of any one country and still, added together, a large number of people with the same need.'),
    p('So cultural diversity works in two directions. It is a reason to adapt the mix country by country, and it is also a reason to look for groups that cross borders and serve them in the same way everywhere.'),
  ],
  realExample: { emoji: '🎵', text: 'Fans of Korean pop music are a small part of the population in most countries, yet together they support merchandise, streaming and concert businesses worldwide.' },
  misconception: 'Students assume everyone in a country shares one culture, so a market can be described by its nationality. Within one country are groups with different values and interests, and some have more in common with people abroad than with their neighbours.',
  examMatters: 'Name the value or interest the group in the case shares, and whether it crosses borders: that tells you whether to adapt by country or to serve one group in many countries.',
  recall: {
    type: 'classify',
    prompt: 'Sort each group by what binds it together: a shared value or a shared interest.',
    groups: [
      { name: 'A shared value', items: ['Vegans who refuse anything made from animals', 'Families who eat only food prepared under religious law', 'Buyers who pay more for goods made without child labour'], why: 'What unites each group is a belief about what is right or proper.' },
      { name: 'A shared interest', items: ['Members of amateur astronomy clubs', 'Collectors of vintage wristwatches', 'People who run marathons for fun'], why: 'What unites each group is something its members enjoy doing.' },
    ],
  },
});

const nicheFeatures = sub('features-of-global-niche-markets', {
  title: 'Features of Global Niche Markets',
  keyIdea: 'A global niche is a small, specialised group of buyers with a shared need, spread across countries: small in each, worth serving in total, and often willing to pay more.',
  body: [
    p('A **niche market** is a small, clearly defined part of a larger market, with needs the mass market serves badly. A **global niche** is that kind of group spread across many countries.'),
    p('Its features:'),
    bullets([
      `**Small in each country, large in total.** ${F.name}'s halal-certified, alcohol-free serum has ${units(Math.max(...F.nicheCountries))} likely buyers in one country and ${units(Math.min(...F.nicheCountries))} in another; across five countries, ${units(F.nicheBuyers)}.`,
      '**A specialised need shared across borders**, so one product can serve the whole group with little change.',
      '**Less direct competition**, because firms serving the mass market find the group too small to target in any one country.',
      `**Higher prices and margins**: buyers who cannot easily find the product elsewhere pay more. ${F.name} charges ${usd(F.nichePrice)} against ${usd(F.massPrice)} for a mass-market serum.`,
      '**Buyers who find each other** through communities, websites and specialist shops built around the need.',
    ]),
    p('The weaknesses come from the same features. Sales are capped by the size of the group, one new rival can take a large share of it, and a firm that depends on one niche has no other market to fall back on.'),
  ],
  realExample: { emoji: '🎸', text: 'A maker of left-handed guitars sells only a few hundred instruments in any one country, but by selling online it serves left-handed players everywhere with a single range.' },
  misconception: 'Students define a niche market as simply a small market. What defines it is a specialised need shared by a distinct group; a small town is a small market, not a niche.',
  examMatters: 'Use the case\'s figures to show the niche is small in each country but viable in total, then weigh the higher price against the risk of depending on one group.',
  recall: {
    type: 'match',
    prompt: 'Match each feature of a global niche to what it means for the firm serving it.',
    pairs: [
      { left: 'Buyers are few in any one country', right: 'It must sell in many countries to reach enough of them', why: 'Only the total across borders makes the group worth serving.' },
      { left: 'Few other firms meet the need', right: 'It can charge more than a mass-market product', why: 'Buyers with few alternatives accept a higher price.' },
      { left: 'The need is the same across borders', right: 'One version can be sold almost everywhere', why: 'Little adaptation is needed when the group wants the same thing wherever it lives.' },
      { left: 'The group gathers in its own communities', right: 'It can reach buyers without mass advertising', why: 'Promotion can go straight to where the group already meets.' },
    ],
  },
});

const nicheMix = sub('adapting-the-4ps-for-a-global-niche', {
  title: 'Adapting the 4Ps to Suit a Global Niche',
  keyIdea: 'For a global niche the product usually stays the same everywhere, while price, place and promotion are set by the niche rather than by the country.',
  body: [
    p('The **marketing mix (4Ps)** for a global niche is built around the group, not the country, so its adaptation follows the group. The usual question, what changes in each country, turns into another: what does this group need wherever it lives?'),
    p(`**Product.** The specialised feature is why the niche buys, so it stays the same everywhere: ${F.name}'s serum is halal-certified and alcohol-free in all five countries. Changes are limited to what law requires, such as the label.`),
    p(`**Price.** Buyers with few alternatives accept a higher price: ${usd(F.nichePrice)} against ${usd(F.massPrice)}, ${pct(F.premiumPct)} more. It must still fit what the group can pay, so a firm may hold one price in richer markets and a lower one where incomes are lower.`),
    p('**Place.** A niche is too thin to fill every supermarket shelf, so it is reached through shops that serve that need, outlets run by the community itself, and online orders shipped across borders.'),
    p('**Promotion.** Rather than mass advertising, the firm goes where the group already gathers: its magazines and websites, community events, and recommendations from trusted members.'),
  ],
  realExample: { emoji: '🥾', text: 'A small brand of vegan hiking boots sells from one website to walkers in dozens of countries, advertises in outdoor and vegan communities, and is never stocked by a mainstream shoe shop.' },
  misconception: 'Students adapt a niche product country by country, as they would a mass-market one. Changing the feature the niche buys for removes the reason it buys; for a global niche the product is the P that should stay the same.',
  examMatters: 'For each P, say how serving the niche changes it compared with a mass-market mix, and use the case\'s figures for the price where they are given.',
  recall: {
    type: 'fillin',
    prompt: 'Complete the mix of a gluten-free bakery brand selling to coeliac buyers in ten countries:',
    template: [
      'It sells at a ___ price well above ordinary bread, which its buyers accept.',
      'It is stocked in health-food and other ___ shops, not in every supermarket.',
    ],
    answers: ['premium', 'specialist'],
    hints: ['set above the ordinary product\'s', 'shops that serve one particular need'],
    distractors: ['discount', 'wholesale', 'convenience'],
  },
});

/* ══ Chapter 5 — Cultural and social factors (4.3.3 · 3a) ════════════════════ */

const cultureTastes = sub('cultural-differences-and-tastes', {
  title: 'Cultural Differences and Different Tastes',
  keyIdea: 'Cultural differences decide what is acceptable to sell and show; different tastes and preferences decide what buyers like. Either can force a change to the mix.',
  body: [
    p('Before selling in a new country, a business has four cultural and social factors to consider: cultural differences, different tastes and preferences, language and unintended meanings, and inappropriate branding and promotion. This step takes the first two.'),
    p('**Cultural differences** are differences in beliefs, customs, religion and social rules: what may be eaten or worn, which days are holidays or fasts, who in a family makes buying decisions, what is polite or offensive to show. They decide whether a product, an ingredient or an image is acceptable at all.'),
    p(`**Different tastes and preferences** are differences in what buyers like: flavours, textures, sizes, colours and styles. They decide whether an acceptable product is wanted. Buyers in ${F.market} prefer light skincare in the heat; buyers in cooler countries may prefer rich creams.`),
    p('A cultural difference can make a product unsaleable, so it is usually a condition to meet. A difference in taste usually lowers sales rather than stopping them, so it is a choice to weigh against the cost of adapting.'),
  ],
  realExample: { emoji: '🍘', text: 'Snack makers selling across Asia commonly keep one brand but sell different flavours in each market, such as seaweed in one and chilli in another, while checking that no flavour uses an ingredient local faiths forbid.' },
  misconception: 'Students treat every cultural factor as a taste that a firm may ignore if adapting is expensive. A belief about what may be eaten or shown is not a preference, and ignoring it can make the product unsaleable.',
  examMatters: 'Separate the two: a cultural difference that forbids something is a condition to meet; a taste is a trade-off between the cost of adapting and the sales it wins.',
  recall: {
    type: 'classify',
    prompt: 'Sort each consideration into a cultural difference or a difference in tastes and preferences.',
    groups: [
      { name: 'Cultural difference', items: ['Many buyers may not use products that contain alcohol', 'Adverts may not show couples embracing in public', 'Gifts are bought for a festival the home market does not hold'], why: 'Each comes from a belief, custom or rule about what is acceptable.' },
      { name: 'Tastes and preferences', items: ['Buyers like sweeter biscuits than at home', 'Family-size packs outsell single ones', 'Spicy flavours outsell mild ones'], why: 'Each comes from what buyers like, not from what they are allowed.' },
    ],
  },
});

const language = sub('language-and-unintended-meanings', {
  title: 'Language and Unintended Meanings',
  keyIdea: 'A name, slogan or instruction can carry a meaning nobody intended once it is translated, or even when it is left untranslated and heard in a new language.',
  body: [
    p('Language is the most visible way a global brand can go wrong, and **unintended meanings** arise in three places:'),
    bullets([
      '**The brand name.** It is usually left untranslated, so its sound is heard in every language, and it can sound like a rude, silly or unlucky word.',
      '**The slogan or advert.** Idioms, puns and jokes rarely survive translation word for word, and can come out meaning something odd or offensive.',
      '**The pack and instructions.** A mistranslated dose or warning is a safety and legal problem, not only an embarrassment.',
    ]),
    p(`${F.name} found that its name, spoken in ${F.market}'s main language, sounds close to the word for "slippery". Before launching it asked people who grew up speaking that language what they heard, found most read the name as intended when it appeared beside the logo, and chose a local tagline that made the meaning clear.`),
    p('The checks cost little next to a failed launch: ask local speakers what a name or slogan suggests to them, carry the idea across rather than the literal words, and have a second translator turn the text back into the original to see whether it still says what was meant.'),
  ],
  realExample: { emoji: '🪑', text: 'A furniture brand preparing an export catalogue found that three of its product names, chosen in its home language, were slang words in the new market, and renamed them before printing.' },
  misconception: 'Students think unintended meanings arise only when a name is translated. An untranslated name is heard in the local language too, so a brand that never changes its name still has to check what it sounds like.',
  examMatters: 'Explain the consequence, not only the error: ridicule that spreads, lost trust, the cost of renaming and reprinting, or a safety risk from a mistranslated instruction.',
  recall: {
    type: 'match',
    prompt: 'Match each language problem to the check that would have caught it.',
    pairs: [
      { left: 'A brand name that sounds like slang in the new market', right: 'Trying the name out on local speakers before launch', why: 'Only people who use the language every day hear what the sound suggests.' },
      { left: 'A pun in the slogan that means nothing once translated', right: 'Rewriting the message around its idea for local buyers', why: 'Wordplay depends on one language, so the idea has to be re-expressed, not the words.' },
      { left: 'A dosage line that no longer matches the original', right: 'A second translator putting the text back into its first language', why: 'Translating it back reveals where the meaning has drifted.' },
    ],
  },
});

const branding = sub('inappropriate-branding-and-promotion', {
  title: 'Inappropriate Branding and Promotion',
  keyIdea: 'Branding and promotion become inappropriate when a colour, symbol, image or message offends local beliefs, breaks local rules, or means something unintended there.',
  body: [
    p('**Branding** is the name, logo, colours, symbols and pack design that identify a product. **Promotion** is how it is communicated: adverts, sponsorship, social media posts and offers. Either can be **inappropriate** in a new market, even after succeeding at home.'),
    p('Branding goes wrong through meaning. Colours carry different associations in different cultures, so a colour linked with celebration in one place can be linked with mourning in another; animals, hand gestures, numbers and religious symbols can also carry meanings the firm never intended.'),
    p('Promotion goes wrong through content and timing. An advert showing behaviour that is normal at home, such as how people dress or what they drink, can offend; humour can insult; a campaign timed carelessly around a religious or national occasion looks disrespectful. Some countries also ban certain kinds of advert.'),
    flow('bad', [
      ['An inappropriate pack or advert', 'it offends, or means something unintended'],
      ['Buyers feel disrespected', 'they stop buying and tell others'],
      ['The mistake spreads online', 'it is seen in every market, not only one'],
    ], 'The cost is lost sales, a weaker brand everywhere, and the cost of replacing packs and campaigns.'),
    p(`${F.name} has every pack and advert checked by its team in the country before it runs.`),
  ],
  realExample: { emoji: '🎁', text: 'A gift-wrap exporter found that one of its best-selling colours was associated with funerals in one of its markets, and withdrew that colour from the range for that country only.' },
  misconception: 'Students treat inappropriate promotion as a translation problem only. Most promotional mistakes are in the images, the behaviour shown, the humour or the timing, and would offend even if every word were translated correctly.',
  examMatters: 'Say what made the branding or promotion inappropriate in that market, the likely effect on sales and reputation, and the check the firm could have made before launch.',
  recall: {
    type: 'classify',
    prompt: 'Sort each mistake into inappropriate branding or inappropriate promotion.',
    groups: [
      { name: 'Inappropriate branding', items: ['A logo built around a symbol that is sacred in the new market', 'A pack printed in the colour worn there for grieving', 'A mascot that is an animal seen locally as unclean'], why: 'Each is part of how the product is identified: its logo, its pack or its character.' },
      { name: 'Inappropriate promotion', items: ['A television joke that mocks a local custom', 'A discount offer run on a day of national grief', 'A billboard that names a rival where that is banned'], why: 'Each is part of how the product is communicated: the advert, the offer or the poster.' },
    ],
  },
});

/* ══ The deck ═════════════════════════════════════════════════════════════ */

const BLOCK_PLAN = [
  {
    title: B1,
    subs: [globalStrategy, ethnoPoly, geocentric],
    takeaway: [
      'A global strategy is one plan for many countries; glocalisation adapts its edges.',
      'Ethnocentric uses the home mix; polycentric designs one for each country.',
      'Geocentric shares what buyers have in common and changes the rest.',
    ],
  },
  {
    title: B2,
    subs: [product, price, placePromotion],
    takeaway: [
      'Each P can be standardised or adapted; adapt only where it pays.',
      'A smaller pack is a product change that makes one purchase affordable.',
      'Place follows how buyers shop; promotion follows what they accept.',
    ],
  },
  {
    title: B3,
    subs: [ansoff, porter, bothMatrices],
    takeaway: [
      'Ansoff: which is new, the product or the country, and how risky is it?',
      'Porter: win abroad on lower cost or on difference, broadly or in a niche.',
      'Use Ansoff for where and Porter for how; the evidence decides.',
    ],
  },
  {
    title: B4,
    subs: [diversity, nicheFeatures, nicheMix],
    takeaway: [
      'Groups share values or interests across borders.',
      'A global niche is small in each country and viable in total.',
      'Keep the niche product the same; set price, place and promotion by the group.',
    ],
  },
  {
    title: B5,
    subs: [cultureTastes, language, branding],
    takeaway: [
      'A cultural difference is a condition; a taste is a trade-off.',
      'Check what a name or slogan sounds like to local speakers.',
      'Images, colours and timing can offend even when the words are right.',
    ],
  },
];

export const SUBSECTIONS = BLOCK_PLAN.flatMap((b) => b.subs);
export const BLOCKS = BLOCK_PLAN.map((b) => b.title);

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

export const ATTACH_SLUGS = SUBSECTIONS.map((s) => s.id.replace(`${SECTION}:sub:`, ''));

/*
 * THE LEAF MAP, BY HAND. 13 leaves at `bus_spec.txt:1428-1446` (15 rows in `spec-items.json`).
 * Every ledger id's corrected citation runs through this table, not through its "4.3.1"/"4.3.2".
 */
export const LEAF_MAP = {
  'BUS-4.3.3-1a': ['global-strategy-and-glocalisation'],
  'BUS-4.3.3-1b-1': ['ethnocentric-and-polycentric'],
  'BUS-4.3.3-1b-2': ['geocentric-the-mixed-approach'],
  'BUS-4.3.3-1b-3': ['ethnocentric-and-polycentric'],
  'BUS-4.3.3-1c': ['product-in-global-markets', 'price-in-global-markets', 'place-and-promotion-abroad'],
  'BUS-4.3.3-1d': ['ansoff-applied-to-global-marketing', 'porter-applied-to-global-marketing', 'using-ansoff-and-porter-together'],
  'BUS-4.3.3-2a': ['cultural-diversity'],
  'BUS-4.3.3-2b': ['features-of-global-niche-markets'],
  'BUS-4.3.3-2c': ['adapting-the-4ps-for-a-global-niche'],
  'BUS-4.3.3-3a-1': ['cultural-differences-and-tastes'],
  'BUS-4.3.3-3a-2': ['cultural-differences-and-tastes'],
  'BUS-4.3.3-3a-3': ['language-and-unintended-meanings'],
  'BUS-4.3.3-3a-4': ['inappropriate-branding-and-promotion'],
};

/* ══ Notes ════════════════════════════════════════════════════════════════ */
/*
 * ONE NOTES TOPIC PER CHAPTER, TITLED AS THE CHAPTER (`depth.notes-titles` by construction), and no
 * misconception field, so none can repeat a subsection's misconception.
 */
const def = (html) => ({ type: 'definition', text: html });
const mech = (html) => ({ type: 'mechanism', text: html });
const link = (html) => ({ type: 'link', text: html });

export const NOTES = [
  {
    title: B1,
    meta: '4.3.3 · 1a-1b',
    keyIdea: 'One plan for the world, adapted at the edges; and three approaches that differ in whose view of the buyer shapes the mix.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Global marketing strategy</strong> — one marketing approach planned for every country the firm sells in, standardised as far as buyers allow.'),
        def('<strong>Glocalisation (global localisation)</strong> — "think global, act local": a global core with local adaptations.'),
        def('<strong>Domestic/ethnocentric</strong> — the home mix sold abroad unchanged. <strong>International/polycentric</strong> — a separate mix for each country. <strong>Mixed/geocentric</strong> — shared where buyers are alike, adapted where they differ.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Scale: one campaign ${usdm(F.globalCampaign)} for ${F.countries} countries against ${F.countries} × ${usd(F.localCampaign)} = ${usdm(F.localTotal)}; saving ${usdm(F.campaignSaving)}.`),
        link('The more a product touches faith, food or language, the further it moves from one standard mix.'),
      ] },
    ],
    takeaway: ['One plan, adapted at the edges.', 'Home mix, country mix, or shared core.', 'Name what decides it.'],
  },
  {
    title: B2,
    meta: '4.3.3 · 1c',
    keyIdea: 'Each of the 4Ps can be standardised or adapted to a global market, and each adaptation has a cost.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Product adaptation</strong> — changing formula, size, ingredients or label for local climate, law, belief, language or buying habits.'),
        def('<strong>Price adaptation</strong> — setting price to local incomes, rivals and the cost of reaching the market.'),
        def('<strong>Place and promotion</strong> — the channels buyers use, and the media, images and messages they accept.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Pack size: ${F.bottleMl} ml at ${usd(F.bottlePrice)} (${usd(F.perMlBottle)} a ml) against ${F.packMl} ml at ${usd(F.packPrice)} (${usd(F.perMlPack)} a ml). The size is product; what one purchase costs is price.`),
        link('Adapt only where the standard version would lose more sales than the change costs.'),
      ] },
    ],
    takeaway: ['Standardise or adapt, P by P.', 'Size is product; one purchase is price.', 'Tie each change to a local condition.'],
  },
  {
    title: B3,
    meta: '4.3.3 · 1d',
    keyIdea: 'Ansoff\'s matrix and Porter\'s matrix, both met in Unit 3 (3.3.1), applied to where a firm grows abroad and how it competes there.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Ansoff abroad</strong> — market penetration, market development (existing product, new country), product development (new product, existing buyers), diversification (both new).'),
        def('<strong>Porter abroad</strong> — cost leadership or differentiation across the world market; cost focus or differentiation focus for one group, often a global niche.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Risk rises as more is new: diversification abroad adds an unknown product to an unknown country.'),
        mech('A cost leader cannot afford many local versions; a differentiator keeps its distinctive feature the same everywhere.'),
        link('Adapting an existing product for a new country is still market development.'),
      ] },
    ],
    takeaway: ['Ansoff: where, and how risky.', 'Porter: how to win.', 'Both, then the evidence.'],
  },
  {
    title: B4,
    meta: '4.3.3 · 2a-2c',
    keyIdea: 'Groups with shared values or interests cross borders; a global niche serves one such group everywhere with a mix built around it.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Cultural diversity</strong> — recognition that groups of people across the globe have different interests and values.'),
        def('<strong>Global niche market</strong> — a small, specialised group with a shared need, spread across many countries.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Size: ${F.nicheCountries.map((n) => units(n)).join(' + ')} = ${units(F.nicheBuyers)} buyers across five countries.`),
        mech(`Price: ${usd(F.nichePrice)} against ${usd(F.massPrice)} for a mass-market serum, a ${pct(F.premiumPct)} premium.`),
        link('Keep the feature the niche buys for; set price, place and promotion by the group.'),
      ] },
    ],
    takeaway: ['Values and interests cross borders.', 'Small in each, viable in total.', 'The product stays; the rest follows the group.'],
  },
  {
    title: B5,
    meta: '4.3.3 · 3a',
    keyIdea: 'Four considerations before selling abroad: cultural differences, different tastes and preferences, language and unintended meanings, and inappropriate branding and promotion.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Cultural differences</strong> — beliefs, customs, religion and social rules that decide what is acceptable.'),
        def('<strong>Tastes and preferences</strong> — what buyers like: flavours, textures, sizes, colours, styles.'),
        def('<strong>Unintended meaning</strong> — a name, slogan or instruction that says something unplanned in another language.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Checks: local speakers hear the name first; translate the idea, not the words; translate back to test.'),
        mech('An offensive pack or advert → buyers feel disrespected → the mistake spreads online to every market.'),
      ] },
    ],
    takeaway: ['Condition or trade-off?', 'Test names with local speakers.', 'Images and timing offend too.'],
  },
];
