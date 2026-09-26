/**
 * PACKET 55 — global-marketing assessment: the quiz bank, the practice set, the flashcards, the
 * common mistakes and the extras.
 *
 * ── THE BANK ───────────────────────────────────────────────────────────────
 *
 * The live bank's ten items: indices 1, 3, 4, 6 and 8 tested terms no chapter taught
 * (`structure-02`, `topFix-01`). They are replaced by items on chapters that now teach those terms.
 * Index 2 (sachets keyed Price, explained as a size change) is replaced by an item that asks for
 * BOTH Ps and a chapter that teaches the product/price line (`quiz-01`, `topFix-03`); index 5 (white
 * in China) is retired as trivia; index 7's absurd distractors ("Asian consumers do not watch
 * television") go with it (`topFix-03`). Every item is tagged with the chapter that teaches it; the
 * runner derives `quizIndices` from the tag. Keys are written first and DEALT into a position from a
 * hash of the stem (packet 36): the live bank keyed 7 of 10 to one letter.
 *
 * ── THE PRACTICE SET IS THE PAPER'S OWN SHAPE ──────────────────────────────
 *
 * 4.3.3 is Unit 4 (WBS14): Section A is one source-based set of 4 + 4 + 8 + 12 + 12 = 40, and
 * Sections B and C are one 20-mark Evaluate essay each, from sources (`audit/raw/ial-paper-
 * structure.json`, business.units_3_4; DECISIONS Settled 26 Sep). So seven items on ONE source.
 * The live five were Define 4 (Define is 2), Analyse 6 (not in this paper), Assess 10 (Units 1/2),
 * Evaluate 20 and Outline 4 (not an IAL command word).
 *
 *   - `topFix-05`: "Explain one way…" at 4 marks, and the guidance separates market development
 *     (an existing product, adapted or not, in a new country) from product development (a new
 *     product for existing buyers) — the conflation in the live practice[3]. The live India /
 *     fast-food items are gone, so no item contradicts another's example.
 *   - Above 6 marks: levels descriptors naming knowledge, application, analysis and evaluation, and
 *     a short model answer in outline on the 12s and 20s. At 4 marks: point allocations.
 *   - The guidance OPENS with a scaffold and no figure, allocation or level (`practice.opening`).
 *   - `Discuss` asks for a brief assessment and never a conclusion (V036).
 */
import { id, hash8, FIRM, usd, usdm, units, pct } from './_packet55-util.mjs';
import { B1, B2, B3, B4, B5 } from './_packet55-content.mjs';

const F = FIRM;

/* ══ Quiz ════════════════════════════════════════════════════════════════ */

/** An item, authored KEY FIRST. `block` is null for the three pre-test items. */
const qi = (block, question, options, explanation) => ({
  id: id('quiz', question), block, question, options, explanation,
});

const placeKeys = (items) => {
  const rank = new Map(items.map((x, i) => [i, hash8(x.question)])
    .sort((a, b) => (a[1] < b[1] ? -1 : 1))
    .map(([i], r) => [i, r % 4]));
  return items.map((x, i) => {
    const slot = Math.min(rank.get(i), x.options.length - 1);
    return { ...x, options: [...x.options.slice(1, slot + 1), x.options[0], ...x.options.slice(slot + 1)], correctIndex: slot };
  });
};

export const QUIZ = placeKeys([
  /* ── the pre-test pool: three, unpinned, answerable from chapter one ── */
  qi(null, 'A firm keeps its brand name and logo the same in every country, but sells a different flavour where local buyers prefer it. This is:',
    ['glocalisation', 'an ethnocentric approach', 'diversification', 'cost leadership'],
    'A global core (name and logo) with a local change (the flavour) is glocalisation: think global, act local. An ethnocentric approach would change nothing, diversification is a new product in a new market, and cost leadership is a way of competing, not a way of adapting.'),
  qi(null, 'A firm sells abroad exactly the pack, price list and adverts it designed for buyers at home. Its marketing approach is:',
    ['domestic/ethnocentric', 'international/polycentric', 'mixed/geocentric', 'differentiation focus'],
    'Using the home mix unchanged abroad is the domestic, or ethnocentric, approach. A polycentric approach would design a separate mix for each country, a geocentric one would share some elements and adapt others, and differentiation focus is a position in Porter\'s matrix.'),
  qi(null, 'The main advantage of a global marketing strategy over separate plans for each country is:',
    ['the saving from planning once for many countries', 'a closer fit to each country\'s tastes', 'local teams choosing their own mix', 'no risk of offending any buyers'],
    'Planning one brand, product and campaign for every country spreads the cost of making them, which is the scale a global strategy is for. A closer local fit and local teams are the strengths of a polycentric approach, and a standard message raises the risk of offending somebody rather than removing it.'),

  /* ── Chapter 1 ── (the block's leading item is the check-in's; it is written against figures the
     chapter's diagram does not print) */
  qi(B1, 'One advertising campaign for eight countries costs $1.6m. A separate campaign for each country would cost $300,000 per country. Using the one campaign saves:',
    ['$0.8m', '$1.3m', '$1.6m', '$2.4m'],
    'Eight separate campaigns cost 8 × $300,000 = $2.4m, and the single campaign costs $1.6m, so standardising saves $0.8m. Subtracting one country\'s campaign from the global one, or quoting either total on its own, misses the comparison.'),
  qi(B1, 'Which approach gives the managers in each country the power to design their own marketing mix?',
    ['international/polycentric', 'domestic/ethnocentric', 'mixed/geocentric', 'a global marketing strategy'],
    'A polycentric approach treats every country as its own market, usually with a local team deciding the mix there. An ethnocentric approach decides at home, a geocentric one shares decisions between head office and the countries, and a global strategy plans one mix for all.'),
  qi(B1, 'A geocentric approach differs from an ethnocentric one because it:',
    ['plans for the world market, not from the home market', 'changes nothing in any country', 'lets every country design its own mix', 'sells only in the home market'],
    'Both can use one core mix, but the geocentric approach builds it from what buyers everywhere share and adapts the rest, while the ethnocentric approach exports the home mix as it is. Letting every country design its own mix is polycentric.'),
  qi(B1, 'A firm\'s standard advert shows friends drinking beer at a family meal. In a market where most buyers do not drink alcohol, the main risk of an ethnocentric approach is that the advert:',
    ['offends the buyers it is meant to win', 'costs more to make than a local one', 'loses the firm its economies of scale', 'lets local managers change the brand'],
    'An ethnocentric approach runs the home advert unchanged, so behaviour that is normal at home is shown to buyers who may find it offensive. Running the same advert is cheaper, not dearer, keeps the scale saving, and leaves decisions at head office.'),

  /* ── Chapter 2 ── */
  qi(B2, 'A detergent brand sells a 1 kg box for $4.00 and a 50 g sachet for $0.25. Per gram, the sachet is:',
    ['25% dearer', '25% cheaper', '20% dearer', 'the same price'],
    'The box costs $4.00 ÷ 1,000 g = $0.004 a gram and the sachet $0.25 ÷ 50 g = $0.005 a gram, which is 25% more. The sachet is cheaper per purchase, not per gram; 20% is the gap measured against the sachet\'s price instead of the box\'s.'),
  qi(B2, 'A shampoo brand starts selling single-use sachets alongside its full bottles, so buyers on low incomes can afford one purchase. Which two Ps has it changed?',
    ['product and price', 'place and promotion', 'price and promotion', 'product and place'],
    'The sachet is a different size of what is sold, which is a product decision, and it lets one purchase cost little, which is a price decision. Nothing in the stem changes where the shampoo is sold or how it is advertised.'),
  qi(B2, 'In a country where most goods are bought from small family-run shops, a firm used to selling through supermarkets will most need to adapt its:',
    ['place', 'price', 'product', 'promotion'],
    'Place is how the product reaches buyers, and here the channel the firm knows reaches few of them, so it needs distributors or agents who supply small shops. The other Ps may also change, but the channel is the one the situation forces.'),
  qi(B2, 'A global campaign keeps one message but is filmed in each country with local actors speaking the local language. This adapts:',
    ['promotion, keeping the global brand', 'the product to local tastes', 'place to local shopping habits', 'price to local incomes'],
    'The message and brand stay global while the people and language change, which is glocalisation applied to promotion. Nothing about the product, the channel or the price has changed.'),
  qi(B2, 'Why might a firm\'s price abroad be higher than its price at home?',
    ['tariffs and freight add to its cost there', 'buyers abroad earn more in every case', 'one global price is required by law', 'rivals abroad never cut their prices'],
    'Reaching a foreign market adds costs, such as tariffs and freight, that home buyers never pay, and the price has to cover them. Incomes abroad are not always higher, no rule fixes one global price, and local rivals often compete hard on price.'),

  /* ── Chapter 3 ── */
  qi(B3, 'A firm competing abroad on having the lowest cost is least able to afford:',
    ['many local versions of its product', 'one standard product for every country', 'very large production runs', 'a single global advertising campaign'],
    'Every local version adds design, production and stock costs, which undermines the low cost the firm competes on. A standard product, long production runs and one global campaign are how a global cost leader keeps its cost down.'),
  qi(B3, 'A drinks firm launches its existing cola, with a translated label, in a country where it has never sold. In Ansoff\'s matrix this is:',
    ['market development', 'product development', 'diversification', 'market penetration'],
    'The cola is an existing product and the country is a new market, so the move is market development. A translated label does not make it a new product; product development would be a new drink for buyers the firm already has.'),
  qi(B3, 'Compared with its other growth options in Ansoff\'s matrix, a new product sold in a new country is:',
    ['the riskiest of the four', 'less risky than market penetration', 'market development', 'product development'],
    'A new product in a new country is diversification, and it carries the unknowns of both at once, so it is the riskiest cell. Market penetration, with nothing new, is the least risky, and the two middle cells each change only one element.'),
  qi(B3, 'A brand sells a distinctive product to one group of buyers spread across many countries. In Porter\'s Strategic Matrix its position is:',
    ['differentiation focus', 'cost leadership', 'cost focus', 'differentiation'],
    'Its advantage is being different, and its target is one group rather than the whole market, which is differentiation focus. Differentiation aims at the whole market, and the cost positions win on lower cost.'),
  qi(B3, 'Which question does Porter\'s matrix answer that Ansoff\'s matrix does not?',
    ['on what basis the firm will beat rivals', 'which country the firm should enter', 'whether the product is new to the firm', 'how risky entering a new market is'],
    'Porter\'s matrix is about how a firm competes: lower cost or difference, broad or narrow. Which market to enter, whether the product is new and how risky the move is are the questions Ansoff\'s matrix sorts.'),

  /* ── Chapter 4 ── */
  qi(B4, 'A brand sells prayer mats to Muslim buyers in thirty countries. The group it serves is defined mainly by a shared:',
    ['value', 'income level', 'nationality', 'climate'],
    'The buyers are united by their faith, a belief about what is right, which is a shared value. They live in thirty countries, so nationality does not define them, and neither income nor climate is what they have in common.'),
  qi(B4, 'Which of these is a feature of a global niche market?',
    ['buyers few in each country but many in total', 'mass appeal in every country', 'low prices set against many rivals', 'a product changed for every country'],
    'A global niche is a specialised group spread thinly across countries, so it is worth serving only in total. Mass appeal is the opposite of a niche, niches usually face few direct rivals and pay a higher price, and the specialised product is kept the same.'),
  qi(B4, 'A niche brand keeps the same specialised product in every country. The main reason is that:',
    ['the specialised feature is why the niche buys', 'adapting any product is against the law', 'every country has the same tastes', 'the firm wants to be the cost leader'],
    'The niche exists because of one specialised need, so changing that feature removes the reason to buy. Tastes do differ between countries, which is why a mass-market product is adapted, and a niche brand competes on focus, not on being the lowest-cost supplier to the whole market.'),
  qi(B4, 'A niche serum sells for $36 when a mass-market serum sells for $30. The price premium is:',
    ['20%', '17%', '6%', '120%'],
    'The premium is the extra $6 as a share of the mass-market price: 6 ÷ 30 = 20%. Dividing by the niche price gives about 17%, and $6 is the gap in dollars, not a percentage.'),

  /* ── Chapter 5 ── */
  qi(B5, 'Before launch, which check would best catch a brand name that sounds like a rude word in the new market?',
    ['asking local speakers what the name suggests', 'testing the price with local buyers', 'counting the shops that could stock it', 'comparing the pack with local rivals'],
    'Only people who speak the language every day hear what the sound suggests, so asking them is the check that finds an unintended meaning. Price tests, shop counts and pack comparisons are useful, but none of them tests what the name means.'),
  qi(B5, 'A shop runs a price promotion on a day when the country is mourning a national tragedy. This is an example of:',
    ['inappropriate promotion', 'inappropriate branding', 'a difference in tastes', 'an unintended meaning'],
    'The offer is part of how the product is communicated, and its timing shows no respect for the occasion, so it is inappropriate promotion. Nothing about the name, logo or pack is wrong, and the problem is not what buyers like or what a word means.'),
  qi(B5, 'Which of these is a difference in tastes and preferences rather than a cultural difference?',
    ['buyers liking sweeter biscuits', 'a faith forbidding an ingredient', 'a rule against showing couples embracing', 'a festival the home market lacks'],
    'Liking sweeter biscuits is about what buyers enjoy, so it is a taste. A faith\'s rule, a rule about what may be shown and a festival are all beliefs or customs, which are cultural differences.'),
  qi(B5, 'Why can a brand name that is never translated still carry an unintended meaning?',
    ['its sound is heard in the local language too', 'only translated names are checked by law', 'buyers abroad never see the logo', 'translation always changes a name\'s sound'],
    'Buyers hear an untranslated name in their own language, so it can sound like a rude or unlucky word there. Whether a name is translated has nothing to do with the law, buyers do see logos, and the sound of an untranslated name is not changed at all.'),
]);

/* ══ Practice ════════════════════════════════════════════════════════════ */

const pr = (block, command, marks, question, guidance) => ({
  id: id('practice', question), block, command, marks, question, guidance,
});

/*
 * THE SOURCE. One extract carries every item, so a student meets the same firm seven times, and
 * `PracticeQuestionsTab.jsx` prints the shared opening once. Every figure the items need is here.
 */
export const EXTRACT = `Source A. ${F.name} is a ${F.homeAdj} skincare brand sold in ${F.countries} countries. It runs one advertising campaign in all of them, which cost ${usdm(F.globalCampaign)}; a separate campaign for each country would cost about ${usd(F.localCampaign)}. Its directors now plan to enter ${F.market}, a hot, dry country where most people are Muslim and speak their own language. In ${F.market} most skincare is bought in small family shops and online, and cheap local creams are popular. Spoken in ${F.market}'s language, the name ${F.name} sounds close to the word for "slippery". ${F.name} also makes a halal-certified, alcohol-free serum for Muslim buyers. It estimates the number of likely buyers in five countries at ${F.nicheCountries.map((n) => units(n)).join(', ')}. Each buyer uses ${F.bottlesEach} bottles a year at ${usd(F.nichePrice)} a bottle, against ${usd(F.massPrice)} for a mass-market serum. Its current options include taking its existing moisturiser to ${F.market}, and launching a new hair-care range there.`;

export const PRACTICE = [
  pr(B3, 'Explain', 4, `${EXTRACT} Explain one way Ansoff's matrix could help ${F.name} decide whether to enter ${F.market}. (4 marks)`,
    'Place the move in one cell of the matrix first, and check which element is new: the product, the country, or both. Then say what the cell tells the directors about the risk, compared with another option the source mentions.\n'
    + `Knowledge: Ansoff's matrix sorts growth options by whether the product and the market are existing or new, and risk rises as more is new (1 mark). Application: taking the existing moisturiser to ${F.market} is market development, because the country is new and the product is not; a new label or pack size would not make it a new product (1 mark). Analysis: so the risk lies in the unfamiliar country — small-shop channels, cheap local rivals, a name that sounds like "slippery" — rather than in a product that already sells (1 mark). Analysis: comparing it with launching hair care in ${F.market}, which is diversification with both elements new, shows the directors that the moisturiser is the lower-risk way in (1 mark). An answer that calls the adapted moisturiser "product development" has confused the cells and loses the application mark.`),

  pr(B4, 'Calculate', 4, `${EXTRACT} Calculate the annual revenue ${F.name} would earn from its serum if every likely buyer in the five countries bought it. (4 marks)`,
    'Add up the buyers before anything else, then work out how many bottles they buy in a year, and only then turn bottles into revenue. Show each step on its own line and give the answer in dollars.\n'
    + `Total buyers: ${F.nicheCountries.map((n) => units(n)).join(' + ')} = ${units(F.nicheBuyers)} (1 mark). Bottles a year: ${units(F.nicheBuyers)} × ${F.bottlesEach} = ${units(F.nicheBottles)} (1 mark). Revenue: ${units(F.nicheBottles)} × ${usd(F.nichePrice)} (1 mark) = ${usdm(F.nicheRevenue)} a year (1 mark). An answer that uses the mass-market price of ${usd(F.massPrice)}, or forgets that each buyer buys ${F.bottlesEach} bottles, has used the wrong figure for one step and keeps the marks for the others.`),

  pr(B5, 'Discuss', 8, `${EXTRACT} Discuss the cultural and social factors ${F.name} should consider before launching in ${F.market}. (8 marks)`,
    'Work through the factors the source gives evidence for rather than listing every one you know, and for each say what could go wrong for this brand. Leave room for a brief assessment of which factor matters most and why.\n'
    + `Level 1: names cultural or social factors with little use of the source. Level 2: knowledge and application — most buyers in ${F.market} are Muslim, so ingredients must be permitted (a cultural difference); the hot, dry climate suggests lighter textures (a difference in taste); the brand name sounds like "slippery" in the local language (an unintended meaning). Level 3: analysis of the consequences — an ingredient buyers may not use makes the product unsaleable, while a heavy texture only lowers sales; the name could invite ridicule that spreads online, and packs or adverts showing behaviour that is normal at home could offend. Level 4: a brief assessment of competing factors, for example that the cultural difference is a condition to meet while the name is a risk to test with local speakers, and that ${F.name}'s halal serum shows it already understands the first. Discuss needs this assessment; it does not need a final recommendation.`),

  pr(B2, 'Assess', 12, `${EXTRACT} Assess whether ${F.name} should adapt its marketing mix for ${F.market} or keep its standard global mix. (12 marks)`,
    'Take the 4Ps one at a time and ask, for each, whether the standard version would lose sales in this market. Weigh what adapting would win against what it would cost, and decide before you write what your judgement will turn on.\n'
    + `Level 1: knowledge of standardisation and adaptation, described generally. Level 2: application to ${F.market} — small family shops and online buying mean the pharmacy channel used at home will not reach buyers (place); cheap local creams mean the standard price may look high (price); a hot, dry climate and Muslim buyers point to an alcohol-free, lighter formula (product). Level 3: analysis of both sides — adapting place and product wins buyers the standard mix would miss; against that, one campaign across ${F.countries} countries cost ${usdm(F.globalCampaign)} where separate ones would cost about ${usd(F.localCampaign)} each, so every adaptation erodes the saving and the consistent brand. Level 4: evaluation reaching a supported judgement, for example that ${F.name} should keep its brand and core campaign but adapt place and product, because those are where the standard mix would fail outright, while price can compete on difference rather than match local creams.\n`
    + 'A strong answer, in outline: keeping everything standard would fail on channel and formula; adapting everything would lose the saving and the brand; so a glocal mix is justified — the same brand and campaign, adapted place and product — and the judgement depends on how far local buyers value the brand over the cheaper local creams.'),

  pr(B3, 'Assess', 12, `${EXTRACT} Assess whether ${F.name} should compete in ${F.market} on low price or on being different. (12 marks)`,
    'Use Porter\'s Strategic Matrix to frame the choice, then look in the source for what decides it: who the rivals are, what they charge, and what this brand has that they do not. Your judgement should say which position is more likely to work and what it would depend on.\n'
    + `Level 1: knowledge of Porter's Strategic Matrix, described generally. Level 2: application — competing on low price would mean matching cheap local creams made without the cost of shipping from ${F.home}; competing on difference would rest on halal certification, an alcohol-free formula and an established brand. Level 3: analysis of both sides — a low-cost position needs scale and standard products that a newcomer in ${F.market} lacks, and would force many cost-cutting compromises; differentiation lets ${F.name} price above local rivals if buyers value what is different, but only if the difference is visible and trusted, which the awkward name could undermine. Level 4: evaluation with a supported judgement, for example that differentiation is more realistic because ${F.name} cannot be the lowest-cost supplier from abroad, provided the brand is presented so that buyers see its difference rather than hear an unfortunate word.\n`
    + 'A strong answer, in outline: low price means fighting local creams on their own ground without their cost advantage; difference uses what the brand already has; so differentiation is the better position, and it depends on local buyers valuing halal certification and quality enough to pay more.'),

  pr(B1, 'Evaluate', 20, `${EXTRACT} Evaluate whether a mixed/geocentric approach is the most suitable marketing approach for ${F.name}. (20 marks)`,
    'Set out what each of the three approaches would mean for this brand in practice, using the source, before judging any of them. Then weigh the saving from one plan against the cost of getting a country wrong, and finish with a recommendation that says what would change it.\n'
    + `Level 1: describes one or more approaches with little reference to the source. Level 2: knowledge and application — an ethnocentric approach would take the home mix to ${F.market} unchanged; a polycentric one would design a new mix there, losing the benefit of one campaign that cost ${usdm(F.globalCampaign)} against about ${usd(F.localCampaign)} a country; a geocentric approach would keep the brand, formula and campaign and adapt what must change. Level 3: analysis — ${F.market} differs on channel, climate, religion and language, so an unchanged home mix risks failing outright, while a fully separate mix gives up scale across ${F.countries} countries and a consistent brand; the geocentric approach keeps most of the saving but needs head office and country teams to agree on what is shared. Level 4: evaluation — weighs these against the evidence, considers what is not in the source (the size of ${F.market}, how alike its buyers are to existing ones), and reaches a perceptive recommendation with conditions.\n`
    + `A strong answer, in outline: ethnocentric is cheapest but ignores the differences the source lists; polycentric fits ${F.market} best but throws away the saving and the single brand; geocentric keeps the global core and changes place, product and the local tagline, so it is the most suitable, unless ${F.market} proves so different, or so large, that a separate plan would pay for itself.`),

  pr(B4, 'Evaluate', 20, `${EXTRACT} Evaluate whether ${F.name} should give priority to the global niche for its serum rather than to launching its moisturiser in ${F.market}. (20 marks)`,
    'Compare the two options on the same basis: how many buyers each reaches, what it earns, what it costs to serve, and how risky it is. Use the figures in the source where you can, then bring in what the figures do not show, and finish with a recommendation and the condition that would change it.\n'
    + `Level 1: describes niche or mass markets in general terms. Level 2: knowledge and application — the serum's niche is small in each country but ${units(F.nicheBuyers)} buyers in total, worth about ${usdm(F.nicheRevenue)} a year at ${usd(F.nichePrice)} a bottle, a ${pct(F.premiumPct)} premium over mass-market serum; ${F.market} is a new country for an existing moisturiser. Level 3: analysis — the niche buys for a feature ${F.name} already has, faces few direct rivals and can be reached through its own communities, but the revenue estimate assumes every likely buyer buys, and depending on one group leaves the firm exposed if a large rival enters; ${F.market} offers a broad market but brings cheap local rivals, new channels and the name problem. Level 4: evaluation — judges which offers the better balance of return and risk for this firm, notes that the two are not exclusive, and reaches a perceptive recommendation with conditions.\n`
    + `A strong answer, in outline: the niche uses what ${F.name} already does well, at a premium price, with few rivals; ${F.market} is larger but riskier and needs more adaptation; so the niche should come first, unless the revenue estimate proves optimistic or a large rival enters it, in which case the broader market matters more.`),
];

/* ══ Flashcards ══════════════════════════════════════════════════════════ */

const fc = (front, back) => ({ id: id('flashcard', front), front, back });

export const FLASHCARDS = [
  fc('What is a global marketing strategy?', 'One marketing approach planned for every country a firm sells in, with the brand, core product and message standardised as far as buyers allow.'),
  fc('What is glocalisation?', 'Global localisation, "think global, act local": a global core (name, logo, formula) with local changes where buyers would otherwise reject the product.'),
  fc('What is the main gain from standardising the mix?', 'Scale: one product, pack and campaign are designed once and used everywhere, which costs far less than separate versions, and the brand is consistent.'),
  fc('What is the domestic/ethnocentric approach?', 'Selling abroad the mix designed for home buyers, unchanged, on the assumption that what sells at home sells everywhere.'),
  fc('What is the international/polycentric approach?', 'Treating each country as a separate market, with a mix designed for that country, usually by a local team.'),
  fc('What is the mixed/geocentric approach?', 'Treating the world as one market: standardising what buyers share and adapting what differs, with decisions shared between head office and countries.'),
  fc('Ethnocentric or global strategy: what is the difference?', 'Both can use one mix, but ethnocentric uses the HOME mix unchanged; a global strategy is designed for the world market from the start.'),
  fc('When does a product need adapting for a new market?', 'When the local climate, law, religion, language, income or buying habits would make buyers reject the standard version.'),
  fc('Is a smaller pack a product or a price decision?', 'Both. The size of what is sold is product; what one purchase costs is price. A good answer separates them.'),
  fc('Why can a single-use pack be dearer per unit?', 'It costs less per purchase but more per ml or gram, so it is easier to afford at once but not cheaper.'),
  fc('Why is place often adapted abroad?', 'Countries shop differently — supermarkets, small shops, markets, online — so the home channel can miss most buyers.'),
  fc('Why is promotion the P where culture matters most?', 'Media, trusted faces, humour, what may be shown and what the law allows all differ between countries.'),
  fc('Ansoff abroad: what is market development?', 'An existing product in a new country. Adapting its label or size does not make it a new product.'),
  fc('Ansoff abroad: what is product development?', 'A new product for buyers the firm already serves.'),
  fc('Why is diversification abroad the riskiest option?', 'Both the product and the country are new, so the firm faces the unknowns of each at once.'),
  fc('Porter abroad: what does global cost leadership need?', 'One standard product made at great scale; every local version adds cost, so adaptation is kept to a minimum.'),
  fc('Porter abroad: what is differentiation focus?', 'A distinctive product for one group of buyers, often a group spread across many countries: a global niche.'),
  fc('Which question does each matrix answer?', 'Ansoff: where to grow and how risky it is. Porter: how to compete once there. A global decision needs both.'),
  fc('What is cultural diversity?', 'Recognition that groups of people across the globe have different interests and values.'),
  fc('Values or interests: what is the difference?', 'Values are beliefs about what is right or important; interests are what people enjoy or spend time on.'),
  fc('What is a global niche market?', 'A small, specialised group of buyers with a shared need, spread across many countries.'),
  fc('What are the features of a global niche?', 'Small in each country but viable in total; a specialised shared need; few direct rivals; higher prices; buyers who gather in communities.'),
  fc('How are the 4Ps adapted for a global niche?', 'The product stays the same everywhere; price carries a premium; place uses specialist and online channels; promotion goes where the group gathers.'),
  fc('Name the four cultural and social considerations.', 'Cultural differences; different tastes and preferences; language and unintended meanings; inappropriate branding and promotion.'),
  fc('Cultural difference or taste: why does it matter which?', 'A cultural difference that forbids something is a condition to meet; a taste is a trade-off between the cost of adapting and the sales it wins.'),
  fc('How can a firm avoid unintended meanings?', 'Ask local speakers what names and slogans suggest, translate the idea rather than the words, and have a second translator translate back.'),
  fc('How can branding be inappropriate abroad?', 'A colour, symbol, animal, number or gesture in the name, logo or pack can mean something offensive or unlucky there.'),
  fc('How can promotion be inappropriate abroad?', 'Through what an advert shows, its humour, or its timing around a religious or national occasion, even if every word is correct.'),
];

/* ══ Common mistakes — the fields MistakesTab.jsx reads: title, mistake, correction, examTip ═ */

const mk = (title, mistake, correction, examTip) => ({ id: id('mistake', title), title, mistake, correction, examTip });

export const MISTAKES = [
  mk('Treating standardisation and adaptation as all or nothing',
    'Writing that a firm must either standardise its whole mix or adapt all of it.',
    'Each of the 4Ps can be decided separately. Most global brands keep the name and core product and adapt a pack, a channel or an advert: glocalisation.',
    'Go through the Ps one by one and say which should stay standard and which should change, with a reason from the case for each.'),
  mk('Mixing up the three approaches',
    'Describing a firm that exports its home adverts unchanged as "polycentric", or a firm with a separate mix in each country as "ethnocentric".',
    'Ethnocentric uses the home mix; polycentric designs one for each country; geocentric shares what buyers have in common and adapts the rest.',
    'Use the paired names (domestic/ethnocentric, international/polycentric, mixed/geocentric) and say who decides the mix.'),
  mk('Calling a smaller pack a price decision only',
    'Writing that selling single-use sachets is "a pricing strategy" and stopping there.',
    'The pack size is a product change; what one purchase costs is price. The sachet changes both, which is why it works in low-income markets.',
    'Name both Ps and explain how the product change makes the price affordable per purchase.'),
  mk('Calling an adapted product "product development"',
    'Labelling an existing product with a translated pack, sold in a new country, as product development in Ansoff\'s matrix.',
    'The product is not new; the country is. That is market development. Product development is a new product for buyers the firm already has.',
    'Ask which element is new, the product or the market, before naming the cell.'),
  mk('Defining a niche as just a small market',
    'Writing that a global niche is any small market, such as a small country.',
    'A niche is defined by a specialised need shared by a distinct group. A global niche is that group spread across countries: small in each, viable in total.',
    'Name the shared need and show, with figures if given, that the total across countries makes it worth serving.'),
  mk('Treating every cultural factor as a taste',
    'Arguing that a firm can ignore a local belief if adapting is too expensive.',
    'A belief about what may be eaten, worn or shown is a cultural difference and a condition of selling at all; only a taste is a trade-off against cost.',
    'Say which kind of difference the case shows before deciding whether the firm must adapt or may choose to.'),
  mk('Explaining a language mistake without its consequence',
    'Stating that a brand name has an unfortunate meaning, and moving on.',
    'The damage is in the consequences: ridicule that spreads online, lost trust, the cost of renaming and reprinting, or a safety risk from a mistranslated instruction.',
    'Follow the mistake to its effect on sales or reputation, then name the check that would have caught it.'),
];

/* ══ Extras ══════════════════════════════════════════════════════════════ */
/*
 * The first chain is what the chapter-1 reorder drills (`reorder.source` finds a sequence the
 * section teaches in an extras chain, in the same order). It sits on the Extras tab, not on the
 * recall's own step, so the recall is not answerable by scrolling up. Hofstede is NOT demoted into
 * a chain (topFix-02's last clause): the specification has 0 hits for him, and an extras card is
 * still teaching. See built.md.
 */
export const EXTRAS = {
  chains: [
    {
      title: 'Glocalising a product for a new market',
      steps: [
        'Research the new market\'s culture, tastes and rules.',
        'Decide which parts of the mix stay global and which change.',
        'Test the adapted product and message with local buyers.',
        'Launch with the global brand and the local changes.',
      ],
      result: 'The brand stays global; only what local buyers would reject is changed, and it is tested before it costs a launch.',
    },
    {
      title: 'How an unchanged home advert can lose a market',
      steps: [
        'A firm takes an ethnocentric approach and runs its home advert abroad.',
        'The advert shows behaviour that is normal at home but offensive there.',
        'Buyers feel the brand does not respect them and share their reaction online.',
        'Sales fall, and the firm pays for a new campaign it could have made first.',
      ],
      result: 'The saving from one campaign is real, but it is lost if one market rejects the message.',
    },
    {
      title: 'Why a global niche can be worth serving',
      steps: [
        'A group shares a specialised need, but is small in every country.',
        'Mass-market firms find it too small to target country by country.',
        'A firm serves the whole group across borders with one product.',
        'Few rivals and a loyal group support a premium price.',
      ],
      result: 'Cultural diversity creates the niche; selling across countries makes it large enough to serve.',
    },
  ],
  evaluation: [
    {
      title: 'Standardise or adapt?',
      content: `Neither is right in general. Standardising saves money — ${F.name}'s one campaign cost ${usdm(F.globalCampaign)} against about ${usdm(F.localTotal)} for separate ones — and keeps one brand. Adapting wins buyers who would reject the standard version. Three things decide it. THE PRODUCT: the more it touches food, faith, climate or language, the more it must change. THE MARKET: how different its buyers, channels and rules are from those the firm knows. THE COST: whether the extra sales cover the extra versions. The strongest conclusion says which Ps should change and which should not, and why.`,
    },
    {
      title: 'A global niche or a mass market?',
      content: `A niche offers a premium price and few rivals — ${F.name}'s serum sells at ${usd(F.nichePrice)} against ${usd(F.massPrice)} — but its size is capped by the group, and one large rival can take much of it. A mass market offers volume and scale, but more competition and lower prices. The deciding questions are whether the firm has a feature the niche values that others cannot copy, and whether the niche's total across countries is large enough to justify serving it. The two are not exclusive: many firms serve a niche with one product and the mass market with another.`,
    },
    {
      title: 'How much can the two matrices tell you?',
      content: 'Ansoff\'s matrix shows how risky a global move is by what is new, and Porter\'s matrix shows how the firm could win once there. Neither measures the size of a market, the strength of local rivals or how well the firm understands a country\'s culture, and a firm can sit in different cells in different countries. Use them to organise the argument, then let the evidence in the case decide it.',
    },
  ],
};
