/**
 * PACKET 33 — globalisation: quiz, practice, flashcards, common mistakes and extras.
 *
 * ════ THE FINDING THIS FILE EXISTS FOR ════
 *
 * `structure-04` measures it: *"6 of 10 MCQs, 2-3 of 5 practice questions and 3 of 6 common_mistakes
 * cover material absent from the taught content — the pre-test/post-test comparison is therefore not
 * measuring what the section teaches."* `quiz-01`, `quiz-02` and `quiz-03` name three of the six.
 *
 * The live items were not wrong. They tested growing economies, HDI, specialisation and
 * protectionism, which are `4.3.1 · 1a`, `1d-2`, `2b` and `4` — **the specification's own
 * requirements, none of which the section taught**. So the fix is not to replace the questions. It
 * is to teach the topic, which is what `_packet33-content.mjs` does, and then to pin each item to
 * the chapter that now teaches it. Six of the ten live stems survive here in rewritten form.
 *
 * THE PINS ARE DERIVED FROM EACH ITEM'S OWN `block` TAG, never typed. `structure-03` is that the
 * blocks carry no `quizIndices` or `practiceIndices` at all, so the inline question after a block
 * could be about anything in the bank — and with protectionism untaught, frequently was. Deriving
 * the indices from the tag makes the mismatch unrepresentable rather than corrected.
 *
 * THREE ITEMS UNPINNED AND FIRST IN THE ARRAY. `PreTest.jsx` slices the unreserved pool at three and
 * a free student is served only `PREVIEW_LIMITS.quiz` items before the pins are added, so the
 * pre-test's pool has to be at the front. All three are answerable from chapter 1, which every
 * student reaches first — which is `quiz-01` fixed at the root rather than by swapping one item.
 *
 * EVERY EXPLANATION NAMES ITS OPTION BY CONTENT AND NEVER BY POSITION (packet 26). Items are
 * authored key-first, `placeKeys` deals the key into a slot and the renderer shuffles again, so "the
 * second option" describes whatever happens to land there.
 *
 * ════ THE PRACTICE ITEMS, AND TWO THINGS `topFix-04` GETS WRONG ════
 *
 * `topFix-04` asks for case-based questions with a named firm and a "levels-based mark scheme
 * (Knowledge/Application/Analysis/Evaluation)". The first half is right and is built: every item
 * above 4 marks carries a context with a named case business, which is what `practice-01` and
 * `practice-02` are about. The second half is refused twice over:
 *
 *   - **A claim about what a marker does is banned from student-facing prose** by this programme's
 *     `MARK_CLAIM` check (packet 20 found "is levels-marked" shipped eight times). Every guidance
 *     below says what the COMMAND WORD requires per Appendix 6, which is citable.
 *   - **`practice.levels` is a DEBT rule that fires when guidance above 6 marks allocates "(1
 *     mark)"**, because those tariffs are not point-scored. So Discuss, Assess and Evaluate carry no
 *     allocations at all, and Define, Calculate, Construct, Explain and Analyse do.
 *
 * AND THE TARIFF `practice-01` ASSERTS IS WRONG. It objects to a 10-mark Assess on the ground that
 * it is an Economics question — correct — but **this is Unit 4, so Assess is 12**, not 10.
 * `tariff-census.json` has `Assess [10, 12]` with `unitNote: "Units 1/2; Units 3/4"`, from
 * `bus_spec.txt:2238-2245`, and `content-validator.mjs:625` enforces it per unit. A 10-mark Assess
 * here fails on the tariff before anybody reads the question.
 *
 * EIGHT PRACTICE ITEMS, ONE PER BUSINESS COMMAND WORD. `Construct (4)` — "requires students to draw
 * an accurately labelled diagram" — belongs to the bar comparison of landed cost inside and outside
 * a bloc, which is the one thing in this topic a student can be asked to draw.
 *
 * EVERY GUIDANCE OPENS WITH A PARAGRAPH THAT GIVES NOTHING AWAY. `practice.opening` is the founder's
 * finding: guided mode prints `guidance.split("\n")[0]` ABOVE the answer box, so a one-paragraph
 * guidance prints the workings and the answer over an empty box asking the student to produce them.
 */
import {
  id, hash8, money, qty, pct, bn, mn, round2,
  ECONOMIES, LUMINA, HDI, FACTORS, PROTECTION_REASONS, BLOCS,
} from './_packet33-util.mjs';
import { B1, B2, B3, B4, B5, B6 } from './_packet33-content.mjs';

const L = LUMINA, E = ECONOMIES;

const qi = (block, question, options, explanation) => ({ id: id('quiz', question), block, question, options, explanation });

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
  /* ── the pre-test pool: three items, unpinned, FIRST in the array ──────── */
  /*
   * All three are answerable from chapter 1. `quiz-01` is that the live q0 tested growing economies
   * "which the section content never teaches" — it does now, and it is the first chapter, so the
   * pre-test's pool cannot contain untaught material by construction rather than by selection.
   */
  qi(null, 'What does GDP per capita measure?',
    [
      'The total output of an economy divided by its population',
      'The total output of an economy in a year',
      'The rate at which an economy is growing from one year to the next',
      'The average wage paid by employers across an economy in a year',
    ],
    `GDP per capita is GDP divided by the population, which turns a measure of an economy's SIZE into a measure of output a head. Total output in a year is GDP itself, before the division. The growth rate is a percentage change between two years and says nothing about level. And average wages are only part of output, which also includes profits, rents and taxes.`),

  qi(null, 'Which pair of characteristics best describes an emerging economy?',
    [
      'Middle income a head, and growing quickly',
      'Low income a head, with output mostly in farming and raw materials',
      'High income a head, with most output in services',
      'Any economy with a large total output',
    ],
    `An emerging economy has middle income a head AND is rising quickly — the label is about direction as much as level, which is what separates it from a developing economy. Low income a head with output in farming and raw materials is the developing description. High income a head with output in services is the developed one. And total output is size, not development: an economy can be large and poor a head at the same time.`),

  qi(null, 'A firm is deciding whether households in a market can afford its product. Which indicator should it read?',
    [
      'GDP per capita',
      'Total GDP',
      'The economy’s growth rate',
      'The size of the population',
    ],
    `GDP per capita approximates what one buyer has, which is the question being asked. Total GDP is the size of the whole economy and is the right figure for a product bought by organisations rather than households. A growth rate says how fast the figure is moving, not what it is. And population alone says how many buyers there might be with no indication of whether any of them can pay.`),

  /* ── Chapter 1 · Growing economies ─────────────────────────────────────── */
  qi(B1, `An economy produces ${bn(E.emerging.gdpNow)} and has ${mn(E.emerging.population)} people. What is its GDP per capita?`,
    [
      money(E.emerging.perCapitaNow),
      money(E.developed.perCapitaNow),
      money(round2(E.emerging.gdpNow)),
      money(E.developing.perCapitaNow),
    ],
    `${bn(E.emerging.gdpNow)} divided by ${mn(E.emerging.population)} people is ${money(E.emerging.perCapitaNow)} a head. ${money(E.developed.perCapitaNow)} is the developed economy's figure in this section, from a much larger output across twice the people. ${money(round2(E.emerging.gdpNow))} is the output figure with the units mishandled — billions treated as dollars. And ${money(E.developing.perCapitaNow)} belongs to the developing economy.`),

  qi(B1, `One economy's output grew ${pct(E.emerging.growth)} and another's grew ${pct(E.developed.growth)}. What follows?`,
    [
      'The first grew faster in percentage terms, which says nothing about which is richer a head',
      'The first economy must now be larger in total output than the second, because it grew faster',
      'The first economy must now have higher income a head than the second',
      'The second economy shrank over the period the figures cover',
    ],
    `A percentage change is measured against each economy's own starting point, so a faster rate is entirely compatible with being smaller and poorer — here the faster-growing economy is still ${qty(E.emergingGap)} times poorer a head. It is not now larger: ${pct(E.developed.growth)} of ${bn(E.developed.gdpThen)} is a bigger absolute rise than ${pct(E.emerging.growth)} of ${bn(E.emerging.gdpThen)}. Income a head depends on population as well as output. And a positive percentage is growth, not contraction.`),

  qi(B1, 'What does the human development index combine?',
    [
      'Income, schooling and how long people live',
      'Income a head, the rate of employment and the rate of inflation',
      'Total output, the value of exports and the level of investment',
      'Income a head and the size of the population, and nothing else',
    ],
    `HDI combines ${HDI.combines.join(', ')} into one figure ${HDI.range}. Employment and inflation are macroeconomic measures and are not part of it. Output, exports and investment describe an economy's activity rather than its people's development. And income with population is GDP per capita, which is the single measure HDI exists to supplement.`),

  qi(B1, 'Which of these is an implication of economic growth that the specification names for businesses?',
    [
      'Trade opportunities as incomes reach the level at which a product becomes affordable',
      'A guaranteed rise in the profits of every firm already selling into that market',
      'A fall in the wages a firm must pay to workers in that growing economy',
      'The automatic removal of the trade barriers around that economy',
    ],
    `Trade opportunities and employment patterns are the two implications named, and an opportunity appears when income a head crosses the level at which a particular product stops being unaffordable. Profits are not guaranteed — growth reaches products in an order, and a firm that enters before its product's turn sells nothing. Wages generally RISE as an economy grows, which erodes a low-cost plant's advantage. And barriers are the subject of a different sub-topic and are set by policy, not by growth.`),

  qi(B1, 'Why is an average income figure an incomplete guide to a market?',
    [
      'It says nothing about how income is spread across the population',
      'It is measured in local currency, so it cannot be compared between countries',
      'It is only published for developed economies, so most markets have no figure',
      'It changes too often from one year to the next to be useful',
    ],
    `An average says what there is a head and nothing about the distribution, so an economy at one figure may contain a large group at twice that and a larger one at half. Currency is a conversion problem rather than a limit on the measure. The figure is published for economies at every level of development. And it moves slowly, roughly with growth, which is not the difficulty.`),

  /* ── Chapter 2 · International trade and business growth ───────────────── */
  qi(B2, `A firm builds a unit for ${money(L.factoryCost)}, of which ${money(L.importedModule)} is a bought-in imported module. What share of its factory cost is imported?`,
    [
      pct(L.importedShare),
      pct(L.specialisationSavingPct),
      pct(45),
      pct(35),
    ],
    `${money(L.importedModule)} divided by ${money(L.factoryCost)} is ${pct(L.importedShare)}. ${pct(L.specialisationSavingPct)} is what specialising SAVED against making everything in-house, which is a different calculation on different figures. ${pct(45)} is the share done in-house — ${money(L.ownAssembly)} of ${money(L.factoryCost)} — so it is the complement rather than the answer. And ${pct(35)} is not a figure any of these numbers produce.`),

  qi(B2, 'What is the best description of foreign direct investment?',
    [
      'A firm investing in productive assets it controls in another country',
      'Any money moving across a border between two countries, for any purpose',
      'A firm buying shares in a foreign company and holding them for a return',
      'A government lending money to the government of another country',
    ],
    `The test is control of productive assets abroad — a plant built, a business acquired, or a stake large enough to run it. Money crossing a border covers trade payments and remittances as well, which are not investment. Shares held for a return give no control and can be sold at short notice, which is precisely the distinction the word "direct" is making. And lending between governments is not a firm investing at all.`),

  qi(B2, `Making every part in-house costs ${money(L.integratedCost)} a unit; buying the main module in costs ${money(L.factoryCost)}. What is the saving as a percentage?`,
    [
      pct(L.specialisationSavingPct),
      pct(25),
      pct(L.importedShare),
      pct(10),
    ],
    `${money(L.specialisationSaving)} saved on an original cost of ${money(L.integratedCost)} is ${pct(L.specialisationSavingPct)}. ${pct(25)} is what you get by dividing the saving by the NEW cost of ${money(L.factoryCost)} instead of the original, which is the commonest error in a percentage change. ${pct(L.importedShare)} is the imported share of the new cost. And ${pct(10)} is the saving in dollars read as a percentage.`),

  qi(B2, 'What is the implication of increasing specialisation that a one-sided answer leaves out?',
    [
      'Most of the remaining cost is now controlled by a supplier in another country',
      'The firm can no longer export the product it has specialised in making',
      'The firm must employ more people to manage the suppliers it now depends on',
      'Specialisation always raises unit costs once the long run is reached',
    ],
    `The saving and the exposure are the same decision seen twice: cost fell by ${pct(L.specialisationSavingPct)} and ${pct(L.importedShare)} of what remains is a bought-in module whose price and delivery the firm does not control. Exporting is unaffected and is in fact what the firm does. Specialising generally reduces the management needed, not increases it. And unit costs fall — that is why firms do it — which is exactly why the exposure is the point worth making.`),

  /* ── Chapter 3 · Factors, part one ─────────────────────────────────────── */
  qi(B3, 'Which of these is NOT among the factors the specification lists as contributing to increased globalisation?',
    [
      'The growth of trading blocs',
      'Migration within and between economies',
      'Structural change',
      'Reduced cost of transport and communication',
    ],
    `Trading blocs are a separate sub-topic of this topic rather than one of the nine factors, and an answer that lists them among the factors has merged two requirements. Migration, structural change and the falling cost of transport and communication are all on the list of nine, along with trade liberalisation and the WTO, political change, MNCs, investment flows, the growing global labour force and the impact on businesses.`),

  qi(B3, 'What does the WTO do?',
    [
      'Provides a forum for member governments to agree trade rules and settle disputes',
      'Sets the tariff rate that each of its member countries charges on imports',
      'Guarantees that all trade between its members is entirely free of barriers',
      'Lends money to member governments that are running a trade deficit',
    ],
    `Members agree rules between themselves, negotiate barriers down together, and have a process for raising a breach. Tariff rates are set by each government, not by the organisation. Membership is not free trade — members maintain tariffs, quotas and rules, which is the whole of the protectionism chapter. And lending to governments is the work of a different kind of institution entirely.`),

  qi(B3, `A unit costs ${money(L.factoryCost)} to build and ${money(L.freight)} to ship abroad. What does that ratio explain?`,
    [
      'Why production can be located far from the customer',
      'Why the firm should raise its selling price',
      'Why the firm should produce closer to its customers',
      'Why the firm should stop exporting',
    ],
    `Freight at ${pct(L.freightShare)} of the cost of making the unit means distance has almost stopped being a factor in where to produce, which is what "reduced cost of transport" means in practice. A low freight cost is not a reason to raise a price. Producing closer to the customer is what firms did when transport was expensive — this ratio is the reason they stopped. And it makes exporting more attractive, not less.`),

  qi(B3, 'What makes a firm a multinational corporation?',
    [
      'It owns and runs productive operations in more than one country',
      'It sells the products it makes at home in more than one other country',
      'It is larger than the size threshold set for it in the specification',
      'It has its shares listed on more than one national stock exchange',
    ],
    `Owning and running operations abroad is the test, which is why FDI and MNCs are two requirements describing one mechanism. Selling into many countries makes a firm an exporter, and an exporter's exposure to a tariff is completely different from a multinational's. There is no size threshold in the definition. And where a firm's shares are listed is a financing arrangement, not a description of where it produces.`),

  qi(B3, 'Why is political change treated as a factor contributing to globalisation?',
    [
      'Governments decide whether foreign firms may sell, build and own inside their borders',
      'Governments set the exchange rate between their currency and others, which decides export prices',
      'Elections make economies grow faster by raising confidence among businesses',
      'Political parties negotiate directly with multinational firms over where they invest',
    ],
    `Whether a foreign firm may trade, invest and own is a government decision that sits above every calculation a firm makes, and the direction of travel across several decades has been towards opening. Exchange rates are a separate matter and are not what this requirement is about. Elections do not themselves produce growth. And negotiation with individual firms is not what the requirement describes — the change is in the rules that apply to all of them.`),

  /* ── Chapter 4 · Factors, part two ─────────────────────────────────────── */
  qi(B4, 'What is the difference between migration and the growth of the global labour force?',
    [
      'Migration is people moving; the global labour force grows without anybody moving',
      'They are two names for the same requirement, listed twice by the specification',
      'Migration happens within a country and the growth of the labour force between countries',
      'Migration affects the wages a firm pays and the global labour force does not',
    ],
    `They are two of the nine factors and they describe different things: people relocating for work, against more of the world's people being available to work for internationally trading firms wherever they already are. The specification names migration as occurring BOTH within and between economies, so the within-or-between split is not the distinction. And both affect wages, in different occupations and directions.`),

  qi(B4, 'What does structural change describe?',
    [
      'A lasting shift in which industries an economy’s output and employment come from',
      'An increase in the total output an economy produces from one year to the next',
      'A change in the way a firm organises its own internal management structure',
      'A change in the exchange rate between an economy’s currency and others',
    ],
    `Structural change is about composition — which industries produce the output and employ the people — rather than level. An increase in total output is growth, and an economy can grow without changing structure. A firm's own organisation is a different topic in a different unit. And exchange rates move for reasons that have nothing to do with which industries an economy has.`),

  qi(B4, 'An economy that imported a product for a decade now exports it. What has happened?',
    [
      'Structural change has turned a customer into a competitor',
      'The economy has reduced its total output and now produces less than before',
      'The exporting firms that used to serve that market have grown as a result',
      'Trade barriers have been raised around the economy to protect its producers',
    ],
    `Output and employment moved into manufacturing that product, so the market that once bought it now supplies it and competes with the firms that used to serve it. Total output rose rather than fell during that shift. The firms that originally served the market lost it, which is the opposite of growing on it. And no barrier is needed for this to happen — it is what development does.`),

  qi(B4, 'Why does "is globalisation good for business?" need rephrasing before it can be answered?',
    [
      'The same forces widen a firm’s market and widen its competition, so the answer differs by firm',
      'Because globalisation has almost no effect on the majority of businesses anywhere',
      'Because the effects of globalisation on a business cannot be measured at all',
      'Because only firms that already operate as multinationals are affected by it',
    ],
    `A firm that can relocate and specialise gains, and a firm whose advantage was being the only supplier within reach loses it — from the same change. The effects are large rather than absent, and they are measurable: this section prices several of them. And national firms are affected precisely because their competitors are now multinational.`),

  /* ── Chapter 5 · Protectionism ─────────────────────────────────────────── */
  qi(B5, `A unit lands at ${money(L.landed)} and meets a tariff of ${pct(L.tariffRate)}. What does it cost after the border?`,
    [
      money(L.landedWithTariff),
      money(round2(L.factoryCost * 1.2)),
      money(round2(L.landed + L.tariffRate)),
      money(L.landed),
    ],
    `${pct(L.tariffRate)} of ${money(L.landed)} is ${money(L.tariffPerUnit)}, giving ${money(L.landedWithTariff)}. ${money(round2(L.factoryCost * 1.2))} applies the tariff to the factory cost alone, forgetting that the duty is charged on the landed value including freight. ${money(round2(L.landed + L.tariffRate))} adds the rate as if it were a sum of money. And ${money(L.landed)} is the cost before the border.`),

  qi(B5, 'What is the key difference between a tariff and an import quota?',
    [
      'A tariff taxes each unit and lets all of them in; a quota caps how many may enter',
      'A tariff applies to imported goods and an import quota applies to imported services',
      'A tariff is set by the WTO and an import quota is set by the importing government',
      'A quota raises the price of the imported unit and a tariff leaves it unchanged',
    ],
    `A tariff can be absorbed by a firm with a large enough margin, and a quota cannot be got past at any price — which is why the strategic answer to a quota is to produce inside the market. Both apply to goods. Both are set by governments; the WTO sets neither. And a tariff certainly raises the landed price, by ${money(L.tariffPerUnit)} in this section's case.`),

  qi(B5, 'A government pays domestic producers a subsidy for each unit they make. What does this do to an importing competitor?',
    [
      'Nothing to its costs, but the domestic price it competes against falls',
      'It raises the importer’s own landed cost by the amount of the subsidy paid',
      'It caps the number of units the importing firm is allowed to sell in that market',
      'It has no effect on the importer or on the price it has to compete against',
    ],
    `A subsidy is paid to the home producer, so the importer's landed cost is untouched at ${money(L.landed)} while the rival's price falls from ${money(L.rivalPrice)} to ${money(L.rivalPriceSubsidised)} — the gap closes from the other side, which is why firms watching only their own costs miss it. It adds nothing to the importer's costs and caps no volume. And it certainly affects the importer: its advantage here falls from ${money(L.gapInside)} to ${money(round2(-L.gapAfterSubsidy))}.`),

  qi(B5, 'Which reason for protectionism does the specification’s own framing support?',
    [
      'Protecting employment in a domestic industry facing cheaper imports',
      'Preventing foreign firms from investing in productive assets inside the country',
      'Increasing the exchange rate between the country\u2019s currency and its partners\u2019',
      'Raising the wages of the workers employed in the country\u2019s exporting industries',
    ],
    `Protecting jobs at a producer being undercut is one of the arguments a government makes, alongside sheltering a young industry, raising revenue and narrowing a gap between imports and exports. Restricting inward investment is a different policy with different instruments. Exchange rates are not what a tariff or a quota is aimed at. And exporters are generally harmed by protectionism rather than helped, because other governments respond.`),

  qi(B5, 'A government puts a tariff on imported components. Which domestic firm is harmed?',
    [
      'A domestic manufacturer that uses those components to build its product',
      'A domestic maker of those same components, which now faces a dearer rival',
      'A domestic firm that exports its own product to a different market entirely',
      'No domestic firm is harmed, because the tariff falls only on foreign producers',
    ],
    `Everyone downstream of a protected good pays more for it, so a domestic manufacturer buying those components has its costs raised by its own government's policy — which is why "protectionism helps domestic business" needs the question "which one". The domestic component maker is the firm the policy protects. A firm exporting elsewhere is affected indirectly at most. And the claim that no domestic firm is harmed is the misconception the question is testing.`),

  /* ── Chapter 6 · Trading blocs ─────────────────────────────────────────── */
  qi(B6, 'What is a trading bloc?',
    [
      'A group of countries that lower barriers between themselves and keep them against non-members',
      'A group of countries that have removed all of their trade barriers with every other country',
      'An international organisation that settles trade disputes between member governments',
      'A group of large firms that agree among themselves to trade only with each other',
    ],
    `Both halves are needed: barriers lowered between members and maintained against outsiders. That boundary is the mechanism, and a firm's position relative to it is what every exam question here turns on. Removing barriers with every country would be something else entirely. Dispute settlement between governments describes the WTO. And a bloc is an agreement between governments, not between firms.`),

  qi(B6, 'Which three trading blocs does the IAL Business specification name?',
    [
      'The EU and its single market, ASEAN and NAFTA',
      'The EU, the WTO and ASEAN',
      'ASEAN, NAFTA and the United Nations',
      'The EU, NAFTA and the International Monetary Fund',
    ],
    `Those three are what the requirement lists under the expansion of trading blocs. The WTO is a body of member governments that agrees trade rules — it is named in a different requirement and it is not a bloc. The United Nations and the International Monetary Fund are international organisations with entirely different purposes, and neither removes tariffs between a group of members.`),

  qi(B6, `A unit lands at ${money(L.landed)} inside a bloc against a rival at ${money(L.rivalPrice)}, and meets a ${pct(L.tariffRate)} tariff outside it. What has changed between the two cases?`,
    [
      'Only which side of the bloc’s boundary the firm is on',
      'The cost of making the unit, which rose when the tariff was applied to it',
      'The quality of the unit, which the bloc’s common rules require to be higher',
      'The rival’s own costs of production, which fell when the barrier went up',
    ],
    `The module, the assembly and the freight are identical in both cases: ${money(L.gapInside)} below the rival inside, ${money(L.gapOutside)} above it outside, purely because of where the boundary falls. The firm's own costs did not move. Nothing about the product changed. And the rival's costs are unaffected by a tariff charged on somebody else's imports.`),

  qi(B6, 'Why does a trading bloc attract investment from firms based outside it?',
    [
      'Producing inside the bloc avoids the barrier that applies at its boundary',
      'Blocs pay firms from outside to build plants inside their member countries',
      'Firms producing inside a bloc face no competition from other member states',
      'A bloc guarantees a firm producing inside it a level of sales in every member state',
    ],
    `Building inside is how a firm outside a bloc gets in, because a plant in a member country sells into all the members at the member price while exports from outside meet the barrier — which is the link between this chapter and FDI. Blocs do not themselves pay for plants. Competition inside a bloc is harder rather than absent, because every member's producers arrive on the same terms. And nothing guarantees sales; a bloc decides the terms of arrival, not the outcome.`),
]);

/* ══ Practice ═══════════════════════════════════════════════════════════ */

const pr = (block, command, marks, question, guidance, context = null) =>
  ({ id: id('practice', question), block, command, marks, question, guidance, ...(context ? { context } : {}) });

/*
 * THE CASE FIRMS ARE CASE FIRMS. `topFix-01`'s complaint is that a named real-world example went
 * stale and wrong, so the real examples in the content are KINDS of firm and the named businesses
 * live here, in the practice contexts, where an IAL Business paper puts them and where nobody is
 * being told a fact about the world.
 */
const MERIDIAN = `Meridian Components is a manufacturer in an emerging Southeast Asian economy. It buys a specialist module from a supplier abroad for ${money(L.importedModule)} and adds ${money(L.ownAssembly)} of its own assembly, giving a factory cost of ${money(L.factoryCost)} a unit. Shipping to its main export market costs ${money(L.freight)} a unit. It plans to sell ${qty(L.plannedExports)} units a year in that market, where a domestic producer sells a comparable unit at ${money(L.rivalPrice)}.`;

const HARBOUR = `Harbour Foods is a food processor in a developing economy. Its government is considering a ${pct(L.tariffRate)} tariff on imported processed food to protect three domestic processors that employ 4,000 people between them. Harbour Foods exports two-thirds of its own output and imports the packaging machinery and additives it uses.`;

const ASTRA = `Astra Appliances is an established manufacturer in a developed economy, selling into its home market and three neighbouring ones. Its board is considering building a plant in an emerging economy where income a head has risen from ${money(E.emerging.perCapitaThen)} to ${money(E.emerging.perCapitaNow)} over the period, and where wages are well below its own. The emerging economy is a member of a trading bloc covering several neighbouring markets; Astra's home country is not.`;

/*
 * THE 20-MARKER GETS A CASE, WHICH IS THE WHOLE OF `practice-02`: *"20-mark 'Evaluate the view that
 * globalisation creates more winners than losers' has context: null. Every IAL Business 20-marker is
 * case-based."* The case carries the distinction the answer turns on — a firm that owns something
 * against a firm that is currently cheap — so the evaluation has two named businesses to be about
 * rather than a proposition to agree with.
 */
const TWO_FIRMS = `Two businesses in the same emerging economy. Kesari Rubber has supplied mouldings to one European appliance manufacturer for twelve years; that customer takes 80% of its output and reviews its suppliers every three years. Solavi Foods began as a contract packer for foreign brands and has since built a brand of its own, a distribution network reaching four neighbouring markets inside the same trading bloc, and a processing method its rivals have not copied. Both grew because barriers fell and freight became cheap, and both now face competitors from outside the region with more capital.`;

export const PRACTICE = [
  pr(B1, 'Define', 2, "Define the term 'emerging economy'. (2 marks)",
    'Two marks means two separate things to say, and the second is not a rewording of the first. Before writing, settle what separates this label from the one next to it on the specification: plenty of economies have middle incomes, and not all of them are described this way. An example of a country will not substitute for either half.\n'
    + `An emerging economy is one with a middle level of income a head (1 mark) that is growing quickly, so it is moving towards developed status (1 mark). The second half is the one students leave out, and it is the whole distinction from a developing economy: here the emerging economy grew ${pct(E.emerging.growth)} against the developed economy's ${pct(E.developed.growth)}, while still standing at ${money(E.emerging.perCapitaNow)} a head against ${money(E.developed.perCapitaNow)}. An answer that says only "an economy between developing and developed" has described a position and not a direction.`),

  pr(B2, 'Calculate', 4, `Calculate Meridian Components' landed cost a unit in its export market, and the percentage of its factory cost that is imported. (4 marks)`,
    'Two calculations, and the second is a proportion rather than a total — so decide which two figures the proportion is between before you touch the arithmetic. Appendix 6 says workings should be given for a Calculate, and here the workings carry the credit: a wrong figure with visible method is worth more than a right one with none. Watch which cost the freight belongs to.\n'
    + `Factory cost is ${money(L.importedModule)} + ${money(L.ownAssembly)} = ${money(L.factoryCost)} (1 mark). Landed cost adds the freight: ${money(L.factoryCost)} + ${money(L.freight)} = ${money(L.landed)} (1 mark). The imported share is the module over the factory cost: ${money(L.importedModule)} ÷ ${money(L.factoryCost)} (1 mark) = ${pct(L.importedShare)} (1 mark). The commonest slip is to divide the module by the LANDED cost of ${money(L.landed)}, which gives ${pct(round2(L.importedModule / L.landed * 100))} — the question asks for the share of the factory cost, and freight is not part of what the firm builds with.`,
    MERIDIAN),

  pr(B6, 'Construct', 4, `Meridian Components' export market applies a ${pct(L.tariffRate)} tariff to firms outside its trading bloc and none to members. Construct a bar chart comparing Meridian's landed cost inside and outside the bloc with the domestic producer's price of ${money(L.rivalPrice)}. Label the axes and the size of the tariff. (4 marks)`,
    'Appendix 6 defines Construct as requiring an accurately labelled diagram, so the labels are the command word rather than decoration on top of it. Work out every value before drawing anything, because a chart whose bars do not match the arithmetic is not the accurate diagram the command word asks for. Decide what goes on each axis first — one of them is money a unit and the other is which case is being shown.\n'
    + `Three bars on a common vertical scale of cost a unit in dollars, with the horizontal axis labelled for the three cases (1 mark). Inside the bloc: ${money(L.landed)}. The domestic producer: ${money(L.rivalPrice)}. Outside the bloc: ${money(L.landedWithTariff)} (1 mark). The tariff is marked as the difference between the first and third bars, ${money(L.tariffPerUnit)}, which is ${pct(L.tariffRate)} of ${money(L.landed)} (1 mark). Both axes are labelled, including the unit — dollars per unit (1 mark). The error to avoid is drawing the tariff as a separate fourth bar: it is a component of the outside-the-bloc cost, and showing it as an addition to the ${money(L.landed)} bar is what makes the chart say something.`,
    MERIDIAN),

  pr(B3, 'Explain', 4, `Explain one way in which the low cost of shipping a unit has affected where Meridian Components produces. (4 marks)`,
    'An Explain needs a cause and its effect supported by detail, so decide which single route you are following and take it all the way to a decision about location. The figures are in the case and the first move is to turn two of them into a proportion — a cost stated in dollars is not yet an explanation of anything. Do that before you write.\n'
    + `Shipping a unit to the export market costs ${money(L.freight)} against a factory cost of ${money(L.factoryCost)} (1 mark), which is ${pct(L.freightShare)} of what the unit costs to make (1 mark). At that proportion the distance between the plant and the customer adds almost nothing to the price the customer pays (1 mark), so Meridian can put its plant where wages, skills and trade barriers are most favourable rather than near the people who will buy the unit (1 mark). An answer that says "cheap transport helps exporters" has given the cause and stopped short of the location decision, which is what the requirement is about.`,
    MERIDIAN),

  pr(B2, 'Analyse', 6, "Analyse the implications for Meridian Components of buying in its main module rather than making it. (6 marks)",
    'An Analyse wants depth rather than breadth, and the word "implications" is plural for a reason — but two chains taken properly beat four mentioned. Appendix 6 says Analyse includes interpretation where data is given, so convert the figures into a proportion before you use them. It also says Analyse does not include evaluation, so a recommendation about what the firm should do is a different command word.\n'
    + `Buying the module in at ${money(L.importedModule)} and assembling for ${money(L.ownAssembly)} gives a factory cost of ${money(L.factoryCost)} (1 mark), against ${money(L.integratedCost)} if the firm made every part itself — a saving of ${money(L.specialisationSaving)} a unit, or ${pct(L.specialisationSavingPct)} (1 mark). Across ${qty(L.plannedExports)} units that is ${money(round2(L.specialisationSaving * L.plannedExports))} a year, which is the difference between competing at ${money(L.landed)} landed and not competing at all (1 mark).\n`
    + `The second chain runs from the same figures: the module is ${pct(L.importedShare)} of the factory cost (1 mark), so the majority of what a unit costs to build is set by a supplier in another country (1 mark). A rise in the module's price or a delay in its arrival reaches Meridian directly, and its own efficiency cannot offset either — the line has nothing to assemble (1 mark). A chain that stops at "specialisation lowers costs" has given the conclusion without the proportion that makes it an analysis.`,
    MERIDIAN),

  pr(B5, 'Discuss', 8, "Discuss the likely effects on businesses in Harbour Foods' country of introducing the proposed tariff. (8 marks)",
    'Appendix 6 says a Discuss needs logical chains of reasoning in context showing causes and effects, with a brief assessment showing awareness of competing arguments — so weighing the competing effects in a sentence or two is required, and a full evaluation is not. The phrase to plan around is "businesses", plural: there is more than one kind of firm in this country and they are not affected the same way. Use the figures in the case rather than writing about tariffs in general.\n'
    + 'For the three domestic processors the tariff does what it was designed to do. Imported processed food becomes dearer at the border, the price gap that was taking their sales narrows or closes, and the 4,000 jobs between them are more secure in the short run. There is a second effect on the same firms that cuts the other way: a producer shielded from a cheaper competitor has less reason to reduce its own costs, so after some years the barrier may be protecting a gap it helped to create.\n'
    + 'For firms downstream the effect is the opposite. Any business buying processed food as an input — caterers, retailers, food manufacturers — pays more for it, and there are far more of those firms than there are processors. Harbour Foods itself is harmed twice: it buys imported machinery and additives, and it exports two-thirds of its output into markets whose governments may respond in kind, which would put a barrier in front of the sales it depends on.\n'
    + 'The assessment the command word asks for: the tariff concentrates a visible benefit on three firms and 4,000 identifiable jobs, and spreads a less visible cost across a much larger number of firms and their customers. Which dominates depends on how large the downstream sector is relative to the protected one, and in a country whose exporters include firms like Harbour Foods the exposure to a response abroad is the factor most likely to decide it.',
    HARBOUR),

  pr(B6, 'Assess', 12, "Assess whether Astra Appliances should build a plant in the emerging economy rather than continue exporting to the region. (12 marks)",
    'Appendix 6 defines Assess as requiring a coherent and logical chain of reasoning, well contextualised, with balanced and wide-ranging assessment of competing factors leading to a supported judgement — and in Units 3 and 4 it carries 12 marks. The judgement is the part most answers leave out, and "it depends" is not one: name the factor that decides it. Plan two factors on each side and your decision before writing, and use the case rather than general arguments about overseas investment.\n'
    + `For building: Astra's home country is outside the bloc and the emerging economy is inside it, so a plant there sells into the bloc's member markets without meeting the barrier that Astra's exports meet now. On this section's figures that is the difference between landing under a domestic rival and landing over it, on an unchanged product. Wages are well below Astra's own, so the unit cost falls as well as the landed cost. And the market itself is worth entering on its own account: income a head has risen from ${money(E.emerging.perCapitaThen)} to ${money(E.emerging.perCapitaNow)}, which is where appliances start becoming affordable to households.\n`
    + `Against: the investment is direct, so it cannot be withdrawn if the market disappoints — that is the difference between a plant and a shareholding. The wage advantage has a clock running on it, because the same growth that created the market raises wages; a plant justified on today's labour cost may not be justified on the labour cost of its tenth year. Astra would also be committing to a political settlement it does not control, and a government that permits foreign ownership today can change the terms once the plant is built and immovable.\n`
    + `The factor that decides it is WHICH of the two reasons Astra is building for. If the plant is justified by the wage gap, the case is weak: that gap is the thing growth removes, and Astra would be investing in an advantage with a known expiry. If it is justified by bloc membership — access to the member markets on member terms, which Astra can obtain no other way — the case is strong, because that advantage does not erode with growth and cannot be replicated by getting better at exporting. So the judgement is: build, but on the basis of market access rather than cost, and appraise it on the volumes it opens inside the bloc rather than on the wage saving. A plant built for the wage gap should not be built at all.`,
    ASTRA),

  pr(B4, 'Evaluate', 20, "Evaluate the view that increased globalisation has been beneficial for businesses in developing and emerging economies. Use Kesari Rubber and Solavi Foods in your answer. (20 marks)",
    'Appendix 6 defines Evaluate as requiring fully developed chains of reasoning showing a range of causes and effects, with a full awareness of the validity and significance of competing factors, leading to a perceptive conclusion that proposes a solution or recommendation. "Businesses" is plural and "developing and emerging" is two kinds of economy, so the question contains at least four positions — decide which ones you are arguing about before you start. A conclusion that does not say which firms and in which economies has not been perceptive.\n'
    + `In support. Firms in these economies gained access to markets that were closed to them by distance and by barriers. Freight at a few per cent of unit cost means a producer far from its customers can compete on the same terms as one beside them, and falling barriers turned that possibility into sales: a unit landing under a domestic rival's price wins business that no amount of local effort could previously have won. Specialisation gave the same firms a second gain — concentrating on one stage of production, buying the rest in, and reaching a cost level a fully integrated producer cannot match. And inward FDI built capacity that local capital could not have funded, bringing equipment, training and access to a parent's customers with it.\n`
    + `Against. The same openness exposed those firms to competitors with every one of those advantages and more capital. Specialising narrowly leaves a firm, and an economy, dependent on demand for one thing and on suppliers it does not control — the majority of a unit's cost can sit with a firm in another country. The cost advantage that attracted the investment erodes as the economy grows, which is the mechanism by which plants relocate again. And a firm that grew as a supplier to a multinational has a customer rather than a market, and can lose everything in one procurement decision taken somewhere else.\n`
    + `The distinction the question turns on is between firms that OWN something and firms that supply. A firm in an emerging economy that has built a brand, a distribution network or a process others cannot copy has gained durably from globalisation, because it now sells into markets that were unreachable. A firm whose advantage is that it is currently cheap has gained temporarily, because that advantage is the one growth removes and the one a buyer can move. The developing and emerging cases differ on exactly this: an emerging economy has firms in the first category, and a developing economy mostly has firms in the second.\n`
    + `So the view is true with a condition, and the condition is the recommendation. Globalisation has been beneficial for businesses in these economies where it has been used to build something transferable — capability, a brand, a position inside a trading bloc — and much weaker where it has been used to sell cost alone. For a firm the implication is to spend the period of cost advantage acquiring an advantage that outlasts it; for a government, to treat inward FDI as worth attracting for the capability it leaves behind rather than for the jobs it brings while wages stay low. Judged that way the answer is: beneficial, unevenly, and most for the firms that treated the opportunity as temporary.`,
    TWO_FIRMS),
];

/* ══ Flashcards ═════════════════════════════════════════════════════════ */

const card = (front, back) => ({ id: id('flashcard', front), front, back });

export const FLASHCARDS = [
  card('What are the characteristics of a developed economy?', 'High income a head, most output and most jobs in services, and mature markets where growth comes from taking share rather than from new buyers.'),
  card('What are the characteristics of a developing economy?', `Low income a head, with output concentrated in farming and raw materials. In this section that is ${money(E.developing.perCapitaNow)} a head, a factor of ${qty(E.perCapitaGap)} below the developed economy.`),
  card('What makes an economy "emerging" rather than "developing"?', `Middle income a head AND speed: the label describes direction as well as level. Here the emerging economy grew ${pct(E.emerging.growth)} against the developed economy's ${pct(E.developed.growth)}.`),
  card('How is GDP per capita calculated?', `GDP divided by the population. ${bn(E.emerging.gdpNow)} across ${mn(E.emerging.population)} people is ${money(E.emerging.perCapitaNow)} a head.`),
  card('Why can a large economy be a poor market?', `Total GDP is size and GDP per capita is what one buyer has. ${bn(E.developed.gdpNow)} across ${mn(E.developed.population)} people is ${money(E.developed.perCapitaNow)}; six times less output across half the people is ${money(E.emerging.perCapitaNow)}.`),
  card('What does the HDI combine, and why would a business read it?', `${HDI.combines.join(', ')}, into one figure ${HDI.range}. A business reads it because ${HDI.whyBusiness}.`),
  card('What two implications of economic growth does the specification name?', 'Trade opportunities for businesses, and employment patterns. The first appears when income a head crosses the level at which a product becomes affordable; the second changes who a firm can hire, at what wage, and what its customers do for a living.'),
  card('What is the difference between an export and an import?', `An export is produced in a country and sold to a buyer in another; an import is the reverse. Most exporting firms are importers too — here ${pct(L.importedShare)} of a unit's factory cost crosses a border inwards first.`),
  card('What does specialisation save, and what does it cost?', `Saves ${money(L.specialisationSaving)} a unit — ${money(L.integratedCost)} to make everything against ${money(L.factoryCost)} to buy the module in — which is ${pct(L.specialisationSavingPct)}. Costs control: ${pct(L.importedShare)} of the remaining cost is set by a supplier abroad.`),
  card('What is foreign direct investment?', `Investment by a firm in productive assets it CONTROLS in another country: a plant built, a business acquired, or a controlling stake. A shareholding held for a return is not FDI, because it carries no control and can be sold at short notice.`),
  card('How does FDI link to business growth?', `The investment buys capacity. ${money(L.fdi)} bought a plant able to make ${qty(L.plannedExports)} units a year, which is ${money(L.fdiPerUnit)} of investment behind every unit of annual capacity.`),
  card('How many factors contributing to increased globalisation does the specification name?', `Nine: ${FACTORS.map((f) => f.short.toLowerCase()).join(', ')}. Trading blocs are a SEPARATE sub-topic and are not one of the nine.`),
  card('What is trade liberalisation?', `Governments agreeing to lower the barriers between their economies. Priced here: the same unit is ${money(L.gapInside)} below a rival with no tariff and ${money(L.gapOutside)} above it with one at ${pct(L.tariffRate)}.`),
  card('What is the role of the WTO?', 'A body of member governments that agree rules for trade between them, negotiate barriers down together, and run a process for settling disputes. It does NOT set any country’s tariffs and does not guarantee free trade between members.'),
  card('Why is political change a factor in globalisation?', 'Governments decide whether foreign firms may sell, build, own and send profits home. Those are yes-or-no decisions that sit above every calculation a firm makes, and the direction of travel over several decades has been towards opening.'),
  card('How does the falling cost of transport drive globalisation?', `It removes distance as a factor in where to produce. Freight of ${money(L.freight)} on a ${money(L.factoryCost)} unit is ${pct(L.freightShare)} of the cost of making it, so a firm can put each stage of its work wherever that stage is done best.`),
  card('What is a multinational corporation?', 'A firm that owns and runs productive operations in more than one country. A firm that exports to forty markets from one factory is an exporter, not a multinational, and its exposure to a tariff is completely different.'),
  card('What is the difference between migration and the growth of the global labour force?', 'Migration is people moving for work, within and between economies. The global labour force grows when more of the world’s people become available to internationally trading firms, which happens without anybody moving.'),
  card('What is structural change?', 'A lasting shift in which industries an economy’s output and employment come from — composition rather than level. It is how a market that imports a product becomes a market that exports it, and a customer becomes a competitor.'),
  card('What is the impact on businesses of increased globalisation?', `Two lists from the same forces. Opens: a larger market, cheaper inputs (${money(L.specialisationSaving)} a unit here), somewhere better to produce, access to skills. Closes in: more competitors with the same advantages, dependence on suppliers (${pct(L.importedShare)} of a unit), and exposure to other governments' decisions.`),
  card('What is protectionism?', 'A government using barriers to make imported goods harder or more expensive to sell than domestic ones. The barriers the specification names are tariffs, import quotas, government legislation and domestic subsidies.'),
  card('Name four reasons governments give for protectionism.', `${PROTECTION_REASONS.map((r) => r.short.toLowerCase()).join(', ')} — each with a cost the same government pays, because a barrier raises the price for every buyer of that good including domestic firms downstream.`),
  card('How is a tariff calculated?', `As a percentage of the LANDED value, which includes freight. ${pct(L.tariffRate)} of ${money(L.landed)} is ${money(L.tariffPerUnit)}, taking the unit to ${money(L.landedWithTariff)}. Applying the rate to the factory cost alone is the commonest error.`),
  card('How does an import quota differ from a tariff?', `A tariff taxes every unit and lets them all in; a quota caps the quantity. ${qty(L.plannedExports)} planned against a cap of ${qty(L.quotaCap)} blocks ${qty(L.blockedUnits)} units — ${pct(L.blockedShare)} of the plan — and no margin buys a way past it.`),
  card('What does a domestic subsidy do to an importing competitor?', `Nothing to its costs. The importer still lands at ${money(L.landed)}; the subsidised rival's price falls from ${money(L.rivalPrice)} to ${money(L.rivalPriceSubsidised)}. The gap closes from the other side, which is why a firm watching only its own costs misses it.`),
  card('Why is a certification requirement harder on a small exporter?', `It is a FIXED cost. ${money(L.certificationCost)} a year across ${qty(L.plannedExports)} units is ${money(L.certificationPerUnit)} a unit; across a tenth of that volume it is ${money(round2(L.certificationCost / (L.plannedExports / 10)))}.`),
  card('Which three kinds of business does protectionism affect?', 'The exporter facing the barrier, which can lose a market without its costs changing. The protected domestic producer, which keeps sales and loses the pressure to improve. And the domestic firm that BUYS the protected good, whose costs rise — the position governments underweight.'),
  card('What is a trading bloc?', 'A group of countries that lower or remove barriers between themselves while each keeps barriers against non-members. That boundary is the mechanism, and a firm’s position relative to it is what the exam question turns on.'),
  card('Which three trading blocs does the specification name?', BLOCS.map((b) => `${b.name} (${b.who})`).join('; ') + '.'),
  card('What is a trading bloc worth to a business, in figures?', `A swing of ${money(round2(L.gapInside + L.gapOutside))} a unit on an unchanged product: ${money(L.landed)} landed inside the bloc, ${money(L.gapInside)} below a rival at ${money(L.rivalPrice)}; ${money(L.landedWithTariff)} outside it, ${money(L.gapOutside)} above the same rival.`),
  card('Why does a trading bloc attract FDI from firms outside it?', 'Because building inside is how a firm outside gets in. A plant in a member country sells into all the members at member terms, while exports from outside meet the barrier at the boundary.'),
];

/* ══ Common mistakes ════════════════════════════════════════════════════ */
/*
 * `structure-04` counts 3 of 6 live misconceptions as covering untaught material and `structure-09`
 * says the misconceptions are real student errors, naming the customs union against single market
 * confusion as one of them. Both are half right. The errors were real; the material was untaught,
 * which is now fixed — and the one `structure-09` praises is the Economics distinction that leaves
 * this section with the ladder. Eight below, every one about something this section teaches.
 */
const mistake = (title, looksLike, why, instead) => ({ id: id('mistake', title), title, looks_like: looksLike, why, instead });

export const MISTAKES = [
  mistake('Treating developing and emerging economies as the same thing',
    '"India and Malawi are both developing economies, so the same strategy works in each."',
    'The distinction the specification asks for is direction as well as level. A developing economy has low income a head with output in farming and raw materials; an emerging one has middle income a head and is rising quickly. A firm entering the second is betting on where it will be, and entering the first is making a different decision entirely.',
    `Give both halves: middle income a head AND growing fast. Here the emerging economy grew ${pct(E.emerging.growth)} to reach ${money(E.emerging.perCapitaNow)} a head, and the developing one grew ${pct(E.developing.growth)} to reach ${money(E.developing.perCapitaNow)}.`),

  mistake('Comparing markets on total GDP without dividing by the population',
    '"This economy produces six times as much, so it is six times the market."',
    'Total GDP is size. What a household can spend is output a head, and the two can point in opposite directions: an economy with six times the output and twice the people has three times the income a head, not six.',
    `Divide before deciding, and pick the figure that matches what you sell: total GDP for a product bought by organisations, GDP per capita for anything bought by households. ${bn(E.developed.gdpNow)} ÷ ${mn(E.developed.population)} = ${money(E.developed.perCapitaNow)}.`),

  mistake('Reading a faster growth rate as "has overtaken"',
    `"The emerging economy grew ${pct(E.emerging.growth)} and the developed one ${pct(E.developed.growth)}, so it has caught up."`,
    `A percentage change is measured against each economy's own base. ${pct(E.developed.growth)} of ${bn(E.developed.gdpThen)} is a larger absolute rise than ${pct(E.emerging.growth)} of ${bn(E.emerging.gdpThen)}, and the faster-growing economy is still ${qty(E.emergingGap)} times poorer a head.`,
    'Say both things, because both are true and the exam rewards the pair: it is growing several times faster, and it remains substantially poorer a head. An answer with only one of them is half an answer.'),

  mistake('Treating exporting and importing as things different firms do',
    '"A tariff on imports helps domestic producers."',
    `Most exporters are importers. Here ${pct(L.importedShare)} of a unit's factory cost is a bought-in module, so a tariff on components raises the cost of the firm's own exports — protection given to one industry is a tax on the industries downstream of it.`,
    'Before deciding who a barrier helps, ask who BUYS the protected good. Domestic firms that use it as an input are harmed by their own government’s policy, and there are usually more of them than there are protected producers.'),

  mistake('Giving only the gain from specialisation',
    `"Buying the module in saves ${money(L.specialisationSaving)} a unit, so the firm should specialise."`,
    `The gain and the exposure are the same decision seen twice. Cost fell by ${pct(L.specialisationSavingPct)}, and ${pct(L.importedShare)} of what remains is now decided by a supplier in another country — its price, and whether it arrives at all.`,
    'State the trade rather than the benefit: specialising exchanges cost for control. Whether it is worth doing depends on how reliable the supplier is and how easily the firm could find another.'),

  mistake('Listing the factors behind globalisation without explaining any of them',
    '"Globalisation is caused by three things: technology, trade agreements and cheaper shipping."',
    `The specification names NINE factors, and "technology" is not one of them by that name. An answer that lists three has under-answered a question about factors, and an answer that lists all nine without a mechanism has given knowledge with no chain attached.`,
    `Name the factor the specification names and follow ONE of them to an effect on a business: freight at ${pct(L.freightShare)} of unit cost is why production stopped following the customer, and that is a chain rather than a list.`),

  mistake('Saying a subsidy to domestic producers raises the importer’s costs',
    `"The subsidy makes the imported unit more expensive than the ${money(L.rivalPrice)} local one."`,
    `A subsidy is paid to the home producer. The importer's landed cost is unchanged at ${money(L.landed)}; what moves is the rival's price, from ${money(L.rivalPrice)} down to ${money(L.rivalPriceSubsidised)}. The gap closes from the other side.`,
    'Track which side of the comparison the policy touches. A tariff and a certification rule move the importer’s cost; a quota moves the volume; a subsidy moves the rival’s price and leaves the importer’s accounts looking exactly as they did.'),

  mistake('Writing that joining a trading bloc makes a firm more competitive',
    '"Membership would make our products more competitive in those markets."',
    `A bloc does not change the product, the cost or the firm. It changes the price at which the product arrives: ${money(L.landed)} inside against ${money(L.landedWithTariff)} outside, the same unit both times.`,
    `Say what actually moves: membership decides WHERE a firm’s existing competitiveness counts. And note it is not safety — a domestic subsidy of ${money(L.subsidyPerUnit)} a unit cuts a ${money(L.gapInside)} advantage to ${money(round2(-L.gapAfterSubsidy))} without the bloc changing at all.`),
];

/* ══ Extras ═════════════════════════════════════════════════════════════ */
/*
 * SIX CHAINS, ONE PER CHAPTER AND IN CHAPTER ORDER, because `extras.chains` is served to a free
 * student as a flat prefix slice (`sectionPayload` caps it) and a prefix that is chapter 1's chain
 * is at least a coherent sample. Two evaluation frames, both with `content` — V035 is thirteen
 * frames across packets 23, 24, 25 and 27 that render an empty card, and the runner refuses to stage
 * without it.
 */
export const EXTRAS = {
  chains: [
    {
      title: 'How an economy stops being a place to buy from and becomes a place to sell to',
      steps: [
        `Output a head is ${money(E.developing.perCapitaNow)}. A household buys food and little else, so a firm selling appliances has no customers there at any price.`,
        `Output grows and the composition changes: work moves out of farming into factories, and incomes rise with it.`,
        `Income a head passes the level at which a household buys its first appliance, and a market that did not exist appears in a single year.`,
        `Income a head reaches ${money(E.emerging.perCapitaNow)} and the buying shifts again — towards services, brands and things bought on a plan rather than in cash.`,
      ],
      result: `The market did not grow steadily from a firm's point of view; it arrived. That is why "is this economy growing" is the wrong question and "has it reached my product" is the right one — and why a firm entering too early funds an office for years and one entering late finds a local competitor already there.`,
    },
    {
      title: `Why one decision saved ${money(L.specialisationSaving)} a unit and handed away ${pct(L.importedShare)} of the cost`,
      steps: [
        `The firm made every part itself: ${money(L.integratedCost)} a unit, and no stage done at a volume that justified better equipment.`,
        `It stopped making the main module and bought it from a specialist at ${money(L.importedModule)}, adding ${money(L.ownAssembly)} of its own assembly.`,
        `Factory cost became ${money(L.factoryCost)} — a saving of ${money(L.specialisationSaving)}, or ${pct(L.specialisationSavingPct)}, and across ${qty(L.plannedExports)} units a year ${money(round2(L.specialisationSaving * L.plannedExports))}.`,
        `The module is now ${pct(L.importedShare)} of what a unit costs to build, and the firm cannot make it any more.`,
      ],
      result: `Both halves are consequences of the same decision, and an answer with one of them is incomplete. The firm is cheaper than it could otherwise be and more exposed than it used to be: if the module's price rises 10% its factory cost rises ${money(round2(L.importedModule * 0.1))} a unit, and if the module does not arrive its own efficiency is irrelevant that week.`,
    },
    {
      title: 'How nine factors produce one decision about where to build a plant',
      steps: [
        `Trade liberalisation and the WTO made the destination market reachable: a barrier that would have added ${money(L.tariffPerUnit)} a unit came down or was never applied inside the bloc.`,
        `Political change made the plant possible: the host government permits a foreign firm to own and run it and to send profits home.`,
        `Transport and communication made distance affordable: ${money(L.freight)} of freight on a ${money(L.factoryCost)} unit is ${pct(L.freightShare)}, and a specification can be agreed and a fault fixed at a distance for almost nothing.`,
        `Migration and the growing global labour force supplied the staff: people moved to the industrial region, and the work could have been done in several countries.`,
        `Structural change made the host economy able to do it at all: output moved into manufacturing, and firms there learned to build to an export standard.`,
      ],
      result: `Then FDI paid for it — ${money(L.fdi)} for ${qty(L.plannedExports)} units a year of capacity — and the firm became a multinational, which is the ninth factor arriving as a consequence of the other eight. Each factor is necessary and none is sufficient: remove the political permission, or put the freight back to ${money(20)} a unit, and the plant is not built.`,
    },
    {
      title: 'How a market turns into a competitor',
      steps: [
        'An economy produces raw materials and imports the finished product, so an exporter serves it and teaches it what the product should be.',
        'Growth moves output and employment into manufacturing, and the capacity to make that product appears.',
        'Local firms begin supplying the home market, without freight and at lower wages, and the exporter’s share falls.',
        'Those firms export in turn, and now compete with the exporter in third markets as well as at home.',
      ],
      result: `Nothing in the sequence requires a barrier or a subsidy: it is what structural change does. The exporter's error is usually at the first step — treating the market as a permanent customer rather than as a customer for as long as it cannot supply itself, and taking the margin instead of building something in the market that would still be there at step four.`,
    },
    {
      title: `What each of the four barriers does to the same ${money(L.landed)} unit`,
      steps: [
        `A tariff of ${pct(L.tariffRate)}: ${money(L.tariffPerUnit)} on the landed value, taking the unit to ${money(L.landedWithTariff)}. Every unit still enters; each one costs more.`,
        `An import quota at ${qty(L.quotaCap)} units: the first ${qty(L.quotaCap)} enter at the ordinary price and ${qty(L.blockedUnits)} cannot enter at any price — ${pct(L.blockedShare)} of the plan and ${money(L.blockedRevenue)} of sales.`,
        `A certification rule at ${money(L.certificationCost)} a year: ${money(L.certificationPerUnit)} a unit here, and ten times that for an exporter shipping a tenth of the volume.`,
        `A subsidy of ${money(L.subsidyPerUnit)} to the domestic producer: the importer's cost stays at ${money(L.landed)} and the rival's price falls to ${money(L.rivalPriceSubsidised)}.`,
      ],
      result: `Four barriers, one unit, and they work in four different places: on the importer's cost, on the volume, on a fixed overhead, and on somebody else's price. Which one hurts most depends on the firm — a high-margin producer fears the quota and a thin-margin one fears the tariff — and only the fourth is invisible in the importer's own accounts.`,
    },
    {
      title: 'Why a firm outside a bloc ends up building inside it',
      steps: [
        `Exporting in: the unit lands at ${money(L.landedWithTariff)} against a domestic rival at ${money(L.rivalPrice)}, so it is ${money(L.gapOutside)} too expensive and the market is closed in practice.`,
        `Cutting costs is tried first and cannot reach: the gap is ${money(L.gapOutside)} and the whole freight bill is ${money(L.freight)}, so even shipping free would not close it.`,
        `Producing inside the bloc removes the barrier rather than absorbing it: the same unit lands at ${money(L.landed)}, which is ${money(L.gapInside)} BELOW the rival.`,
        `That requires FDI — a plant, owned and run in a member country — which is how a firm outside a bloc gets inside it.`,
      ],
      result: `The bloc did not make the firm better and the firm did not become more efficient; it moved to the side of the boundary where its existing efficiency counts. That is why blocs attract investment from non-members, and why an exam answer about a bloc should be about WHERE a firm produces at least as much as about what it sells.`,
    },
  ],
  evaluation: [
    {
      title: 'Judging whether a firm should enter a growing market',
      content: `Four questions, in this order, and the order is the argument. First: has the market reached MY product? Growth reaches products in a sequence set by what a household buys with each extra unit of income, so an economy at ${money(E.emerging.perCapitaNow)} a head has arrived for some goods and not for others, and a firm that enters before its turn funds an office that sells nothing. Second: what does the second indicator say? Income a head answers affordability, and HDI answers a workforce question — ${HDI.combines.join(', ')} — so two markets at the same income a head can take very different lengths of time to reach full output. Third: which side of a barrier will I be on? This is usually the largest single number in the decision: the same unit lands at ${money(L.landed)} inside a bloc and ${money(L.landedWithTariff)} outside it, a swing of ${money(round2(L.gapInside + L.gapOutside))} that no cost programme could produce. Fourth: is the advantage I am entering on one that growth will remove? A plant justified by wages is justified by the thing that development erodes, and a plant justified by market access is not — which is why the same investment can be a good decision and a bad one depending only on the reason given for it. The frame to carry into an answer: entry decisions turn on timing, access and durability, and cost is the weakest of the four because it is the one the market itself takes away.`,
    },
    {
      title: 'Judging protectionism: three positions and which one dominates',
      content: `Every protectionism question has at least three businesses in it and weak answers see one. The EXPORTER facing the barrier loses a market without its costs changing: ${money(L.landed)} landed and ${money(L.gapInside)} under the rival becomes ${money(L.landedWithTariff)} and ${money(L.gapOutside)} over it, on an unchanged unit. The PROTECTED PRODUCER keeps sales it would have lost — the policy working as intended — and loses the pressure that would have made it cheaper, so after some years the barrier protects a gap it helped create. The DOWNSTREAM DOMESTIC FIRM buys the protected good as an input and pays more for it; there are usually far more of these than there are protected producers, and they include exporters, which is how a barrier meant to protect jobs ends up costing them. Deciding which dominates needs three things from the case and not from general argument: how large the downstream sector is relative to the protected one, whether the protected industry has a route to competitiveness or is simply expensive, and how exposed the country's own exporters are to a response abroad. Two further points belong in a full answer. The barrier's form matters as much as its existence — a tariff can be absorbed, a quota cannot, and a subsidy is invisible in the importer's accounts. And the benefit is concentrated and visible (three firms, 4,000 jobs) while the cost is spread and diffuse (a cent on every buyer), which is a reason the policy is chosen and not a reason it is right.`,
    },
  ],
};
