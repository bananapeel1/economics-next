/**
 * PACKET 39a — trade-global-economy: the quiz bank, practice items, flashcards, misconceptions and
 * extras this packet authors, plus the live ids it CARRIES FORWARD for the protectionism block.
 *
 * ════ WHAT THIS MODULE DOES NOT CONTAIN ════
 *
 * The carried items are named by id and never retyped. Packet 39a rebuilds sub-topics 1-3; the live
 * "Protectionism and the WTO" block stays exactly as students see it today until packet 39b
 * rewrites it, so its quiz items, practice items, flashcards, diagrams and misconceptions are
 * selected out of the live bundle by the runner. Retyping them would be a silent rewrite of content
 * this packet has not verified.
 *
 * ════ WHAT IS REMOVED, AND WHY EACH REMOVAL IS A FINDING ════
 *
 *   - `quiz:cbbc46fa` asks when a depreciation improves the trade balance — the Marshall-Lerner
 *     condition, which is `econ_spec.txt` 4.3.3 · 2f and belongs to `balance-payments-exchange-rates`.
 *     `topFix-01` says to move it and this is the move. **Owed to packet 40.**
 *   - `quiz:beca776e` assesses the Prebisch-Singer hypothesis. `Prebisch-Singer` is 0 hits in both
 *     specification documents. The declining-terms-of-trade idea it carries is taught under 3c,
 *     where the specification puts it, without the name.
 *   - `quiz:9f64a059`, `quiz:2f4d56cd`, `quiz:46a392d1` test the types of bloc, trade diversion and
 *     the benefits of membership. Nothing in this staged section teaches any of them, which is
 *     exactly what `quiz-02` and `quiz-03` report. They stay OPEN for 39b, which closes them by
 *     teaching the material and re-authoring the items; shipping them pinned to a block that does
 *     not teach them would have been the defect the findings describe, with a pin on top.
 *   - `practice:f297c506` is `Assess … (10 marks)`. IAL Economics has no Assess and no 10-mark item
 *     (`tariff-census.json`), and its subject is a customs union. Two reasons, either sufficient.
 *   - `mistake:aafcbcbb` goes with the same boundary.
 *
 * The four bloc FLASHCARDS and the ladder DIAGRAM do not, and that is a reversal made after the
 * first run: `spec.uncovered` fired on ECON-4.3.2-4c-6 the moment the ladder diagram left. Assessed
 * and untaught is the defect; reference material in its own tab is not.
 *
 * ════ THE BANK-LEVEL LENGTH GUARD ════
 *
 * Packet 33 found its first draft keying the strictly longest option in 83% of items against a 25%
 * baseline. The runner carries packet 21's bank-level guard at 35% and A/Bs it against a rigged
 * bank; these items were written with the key deliberately not the longest wherever the economics
 * allowed it.
 */
import { id, qty, pct, bn, idx, MERIDA, KALTO, KALTO_LATER, TRADE, SAROVA, CURRENCY, SHARES } from './_packet39-util.mjs';
import { B1, B2, B3, B4 } from './_packet39-content.mjs';

const A = MERIDA, B = KALTO, T = TRADE, S = SAROVA, C = CURRENCY, H = SHARES;

/** The carried block, named once. The runner reads this, never a string literal. */
export const CARRIED_BLOCK = 'Protectionism and the WTO';

/**
 * Live ids this packet keeps, in the order they should appear. Everything live and not listed here
 * is removed, and the runner asserts that each of these resolved to a live item.
 */
export const CARRIED = {
  quiz: [
    'trade-global-economy:quiz:99a75345',   // a tariff's welfare loss
    'trade-global-economy:quiz:6d58badf',   // the infant industry argument
    'trade-global-economy:quiz:42d4848e',   // the WTO's most-favoured-nation principle
    'trade-global-economy:quiz:df70854b',   // a quota against a tariff
    'trade-global-economy:quiz:0266d003',   // a non-tariff barrier
  ],
  practice: [
    'trade-global-economy:practice:e3345b30', // Explain two effects of a tariff
    'trade-global-economy:practice:09d7629f', // Evaluate free trade against protectionism
  ],
  diagrams: [
    'trade-global-economy:diagram:2ed3a5c6',  // the effect of a tariff
    'trade-global-economy:diagram:37257b86',  // the effect of a quota
    'trade-global-economy:diagram:93bba7cd',  // the ladder — unpinned, and the only cover for 4c-6
  ],
  mistakes: ['trade-global-economy:mistake:896fb614'],
  /*
   * THE BLOC FLASHCARDS AND THE LADDER DIAGRAM ARE KEPT, and that is a reversal. The first pass
   * removed them with the bloc quiz items, and `spec.uncovered` then fired on ECON-4.3.2-4c-6
   * ("movement of factors of production"), which the ladder diagram was the only thing covering.
   * The defect `quiz-02` and `quiz-03` report is that bloc material is assessed and NOT TAUGHT —
   * not that reference material for it exists. A quiz item pinned to a block that does not teach
   * it is the defect; a flashcard and a diagram in their own tabs are not, and removing them would
   * have regressed the section's spec coverage for no finding at all. They stay until 39b rewrites
   * them properly.
   */
  flashcards: [
    'trade-global-economy:card:75bb91ff', 'trade-global-economy:card:5c41afb0',
    'trade-global-economy:card:a551427e', 'trade-global-economy:card:38cfc034',
    'trade-global-economy:card:f3b00a11', 'trade-global-economy:card:9911051c',
    'trade-global-economy:card:1e30a477', 'trade-global-economy:card:bfadca91',
    'trade-global-economy:card:ad6fc9e0', 'trade-global-economy:card:757b2a72',
    'trade-global-economy:card:f68c9c5d', 'trade-global-economy:card:83f18d1b',
    'trade-global-economy:card:9765fc26', 'trade-global-economy:card:b3a29e6a',
  ],
  notes: ['Protectionism', 'The WTO and Trade Liberalisation'],
  /** Replaced by an authored item that keeps the same id, so it is neither carried nor absent. */
  rebuiltInPlace: ['trade-global-economy:mistake:8ccfa3f6'],
  /** Removed, with the reason, so the runner can assert each one is gone from the staged bundle. */
  removed: {
    'trade-global-economy:quiz:cbbc46fa': 'Marshall-Lerner is 4.3.3 · 2f — owed to packet 40',
    'trade-global-economy:quiz:beca776e': 'Prebisch-Singer is 0 hits in both specifications',
    'trade-global-economy:quiz:9f64a059': 'bloc types are 4.3.2 · 4b — packet 39b',
    'trade-global-economy:quiz:2f4d56cd': 'trade diversion is 4.3.2 · 4c — packet 39b',
    'trade-global-economy:quiz:46a392d1': 'benefits of membership are 4.3.2 · 4c — packet 39b',
    'trade-global-economy:practice:f297c506': 'Assess and 10 marks do not exist in IAL Economics',
    'trade-global-economy:mistake:aafcbcbb': 'trade creation and diversion are 4.3.2 · 4c',
    'trade-global-economy:diagram:5866621c': 'replaced: the live one shows an ambiguous gain (topFix-03)',
    'trade-global-economy:diagram:8de1ab9d': 'replaced by the calculation and the revenue charts',
    /*
     * REBUILT, not dropped: each of these is replaced by an item in this module covering the same
     * leaf against the section's arithmetic spine. They are listed here because the runner refuses
     * any live id that is neither carried nor named — which is how the first pass caught eleven
     * items leaving the section with no record of why.
     */
    'trade-global-economy:quiz:9eb895dc': 'rebuilt: comparative advantage, against this section\'s figures',
    'trade-global-economy:quiz:4b6e785a': 'rebuilt: the terms-of-trade calculation, now taught before it is tested',
    'trade-global-economy:quiz:ddc2e111': 'rebuilt: an improvement with falling revenue, now the 3c teaching point',
    'trade-global-economy:quiz:41d3c1c7': 'rebuilt: what follows from absolute advantage in every good',
    'trade-global-economy:practice:a9f1d212': 'rebuilt: Define comparative advantage, at the census tariff of 2 rather than 4',
    'trade-global-economy:practice:899b5425': 'rebuilt: Outline is not a command word — the item becomes Explain (4)',
    /*
     * NOT listed: mistake:8ccfa3f6 is rebuilt IN PLACE. An id is the hash of its title, and this
     * packet's rewrite of "Confusing absolute and comparative advantage" keeps the title, so it
     * keeps the id — the content is replaced and the student's reference to it is not broken. The
     * `rebuiltInPlace` list below is what tells the two cases apart.
     */
    'trade-global-economy:card:9d01beaa': 'rebuilt: comparative advantage',
    'trade-global-economy:card:0705291e': 'rebuilt: absolute advantage',
    'trade-global-economy:card:0613159a': 'rebuilt: the terms of trade, with the formula',
    'trade-global-economy:card:4cd18cc6': 'rebuilt: the limitations of the theory',
  },
};

const q = (block, question, options, correctIndex, explanation) => ({
  id: id('quiz', question), block, question, options, correctIndex, explanation,
});

/* ══ Quiz ═════════════════════════════════════════════════════════════════ */
/*
 * THE FIRST THREE CARRY NO BLOCK, so they are the pre-test pool. All three are drawn from material
 * this packet TEACHES — which does not close `structure-06` (the bank as a whole still contains the
 * carried protectionism items) but does mean the pre-test cannot open on something untaught.
 */
export const QUIZ = [
  q(null,
    'A country can produce more of every good than its trading partner, using the same resources. What follows?',
    [
      'It has an absolute advantage in every good, so trade gains it nothing',
      'It has a comparative advantage in every good, so it should make everything',
      'It gains from trade wherever the two countries\' opportunity costs differ',
      'It gains from trade only where the partner subsidises its own exports',
    ], 2,
    'Absolute advantage in everything rules nothing out. What decides is whether the two countries give up different amounts of one good to make the other. If the opportunity-cost ratios differ, each has a comparative advantage in one good and both gain. Comparative advantage in every good is impossible: the ratios are reciprocals.'),
  q(null,
    'Which pair of price indices shows a country whose terms of trade have DETERIORATED?',
    [
      'Export prices 130, import prices 125',
      'Export prices 104, import prices 104',
      'Export prices 98, import prices 92',
      'Export prices 95, import prices 118',
    ], 3,
    'A deterioration means the ratio has fallen below the base of 100, which needs import prices ahead of export prices: 95 ÷ 118 × 100 = 80.5. The first and third both have exports ahead, and the second leaves the ratio at exactly 100 however high both prices go.'),
  q(null,
    'Which of these is a change in the PATTERN of trade rather than in its volume?',
    [
      'Exports and imports both grow by a fifth over the same period',
      'Machinery replaces minerals as the largest export',
      'Total world trade reaches the highest level ever recorded',
      'A country trades considerably more than it did last year',
    ], 1,
    'Pattern is composition — which goods, and which partners. The other three are statements about how much, and a country can double its trade while exporting exactly the same mix to exactly the same places.'),

  /* ── B1 · Specialisation and comparative advantage ── */
  q(B1,
    `${A.name} can make ${qty(A.grainMax)} grain or ${qty(A.clothMax)} cloth. ${B.name} can make ${qty(B.grainMax)} grain or ${qty(B.clothMax)} cloth. Who has the comparative advantage in cloth?`,
    [
      `${A.name}, because it can make more cloth`,
      `${A.name}, because it is more productive in both goods`,
      'Neither, because the ratios of the two goods are the same in both',
      `${B.name}, because one cloth costs it ${qty(B.costOfCloth)} grain against ${qty(A.costOfCloth)}`,
    ], 3,
    `Cloth costs ${A.name} ${qty(A.costOfCloth)} grain and costs ${B.name} ${qty(B.costOfCloth)}. The lower opportunity cost is ${B.name}'s, so the comparative advantage in cloth is ${B.name}'s — even though ${A.name} can make more of both goods.`),
  q(B1,
    'Which statement about the gain from specialisation is correct?',
    [
      'It requires each country to make one good and nothing else at all',
      'It requires one of the two countries to hold an absolute advantage',
      'It is measured by comparing total output before and after',
      'It is shared equally between the two countries whatever they agree',
    ], 2,
    `A gain is a comparison of totals: here ${qty(T.noTrade.grain)} grain and ${qty(T.noTrade.cloth)} cloth become ${qty(T.withTrade.grain)} and ${qty(T.withTrade.cloth)}. Complete specialisation is not required and often produces less of one good; absolute advantage decides nothing; and the split depends on the rate at which the goods are exchanged.`),
  q(B1,
    'Two countries trade grain for cloth. Cloth costs one of them 2 grain to make and the other 1 grain. Which exchange rate leaves both better off?',
    ['0.8 grain per cloth', '2.4 grain per cloth', 'Any rate at all, provided both countries agree to it', '1.5 grain per cloth'], 3,
    `The rate has to sit strictly between the two domestic costs. Below ${qty(T.rateLow)} the low-cost producer would rather keep making its own; above ${qty(T.rateHigh)} the other would. ${qty(T.rate)} is inside the range, so both gain.`),
  q(B1,
    'Which of these is a LIMITATION of the theory of comparative advantage rather than an assumption of it?',
    [
      'Resources move freely between industries at no cost and no delay',
      'There are two countries and two goods, and nothing else exists',
      'Transport costs can exhaust the predicted gain',
      'Opportunity costs stay constant however far specialisation goes',
    ], 2,
    'The other three are assumptions the model makes to get its result. Transport costs exhausting the gain is what happens when one of those assumptions is relaxed, which is what a limitation is.'),

  /* ── B2 · Patterns and volume of world trade ── */
  q(B2,
    `Emerging economies' share of world exports rose from ${pct(H.emergingThen)} to ${pct(H.emergingNow)}. What happened to the advanced economies' share?`,
    [`It fell to ${pct(H.advancedNow)}`, `It fell to ${pct(H.emergingThen)}`, 'It stayed the same', 'It cannot be determined'], 0,
    `Shares sum to 100%, so a rise of ${pct(H.emergingGain)} points on one side is a fall of ${pct(H.emergingGain)} on the other: ${pct(H.advancedThen)} to ${pct(H.advancedNow)}. A falling share is not the same as falling exports, because the world total moved too.`),
  q(B2,
    `${B.name} doubles its grain capacity to ${qty(KALTO_LATER.grainMax)}, leaving cloth at ${qty(KALTO_LATER.clothMax)}. What happens to trade with ${A.name}?`,
    [
      `${B.name} now has a comparative advantage in both goods`,
      'Trade continues between them at the same exchange rate as before',
      `${A.name} gains a comparative advantage in cloth`,
      'The basis for trade between them disappears',
    ], 3,
    `Cloth now costs ${B.name} ${qty(KALTO_LATER.costOfCloth)} grain, which is exactly what it costs ${A.name}. Identical opportunity costs mean neither country has a comparative advantage in anything, so there is no gain left to divide. A country cannot have a comparative advantage in both goods; the ratios are reciprocals.`),
  q(B2,
    `A currency falls from ${qty(C.before)} foreign units per domestic unit to ${qty(C.after)}. A good priced ${qty(C.homePrice)} at home now sells abroad for:`,
    [qty(C.exportAbroadAfter), qty(C.exportAbroadBefore), qty(C.importAtHomeAfter), qty(62.5)], 0,
    `${qty(C.homePrice)} × ${qty(C.after)} = ${qty(C.exportAbroadAfter)}, down from ${qty(C.homePrice)} × ${qty(C.before)} = ${qty(C.exportAbroadBefore)}. Exports become cheaper abroad when the currency falls, which is why the pattern of trade shifts towards them.`),
  q(B2,
    'A government puts a duty on tiles imported from ONE country. Which outcome is the one students most often miss?',
    [
      'Domestic tile makers raise their output',
      'The domestic price of tiles rises',
      'An exporter in a third country takes the business',
      'Imports of tiles from that country fall',
    ], 2,
    'The first, second and fourth are the intended effects and are usually stated. Because the measure named a country rather than a good, much of the demand moves to the nearest supplier the duty does not cover rather than home — so total imports fall by less than the measure suggests.'),
  q(B2,
    `An economy's exports grow from ${bn(H.exportsThen)} to ${bn(H.exportsNow)}. Ore falls from ${pct(H.oreThen)} of them to ${pct(H.oreNow)}. What happened to the VALUE of ore exports?`,
    [`It fell to ${bn(H.oreValueNow)}`, `It rose to ${bn(H.oreValueNow)}`, `It fell to ${bn(H.manufacturesValueThen)}`, 'It cannot be worked out'], 0,
    `${pct(H.oreThen)} of ${bn(H.exportsThen)} is ${bn(H.oreValueThen)}; ${pct(H.oreNow)} of ${bn(H.exportsNow)} is ${bn(H.oreValueNow)}. Here both the share and the value fell — but they need not: a smaller share of a much larger total can be worth more.`),

  /* ── B3 · The terms of trade, and what moves them ── */
  q(B3,
    'The terms of trade are best described as:',
    [
      'The difference between export and import values',
      'The ratio of export prices to import prices',
      'The volume of exports divided by the volume of imports',
      'The balance of trade expressed as an index',
    ], 1,
    'They are a ratio of two PRICE indices. The difference between export and import values is the balance of trade, which is a different figure that can move the other way in the same year.'),
  q(B3,
    `${S.name}'s export price index is ${qty(S.now.exportPrices)} and its import price index is ${qty(S.now.importPrices)}. Its terms of trade are:`,
    [idx(S.totNow), '91.7', '130.0', '10.0'], 0,
    `${qty(S.now.exportPrices)} ÷ ${qty(S.now.importPrices)} × 100 = ${idx(S.totNow)}, an improvement on the base of ${idx(S.totBase)}. Note that BOTH prices rose: the ratio improved because exports rose faster, not because imports got cheaper.`),
  q(B3,
    "A country's inflation rate is higher than its trading partners'. Its terms of trade:",
    ['Deteriorate, because the country has become less competitive abroad', 'Are unchanged, because inflation affects both indices equally', 'Cannot be predicted from this information alone', 'Improve, because export prices rise faster'], 3,
    'Domestic inflation raises the export price index faster than foreign inflation raises the import price index, so the ratio rises. Competitiveness falls at the same time — the two move in opposite directions, which is why an improvement is a direction and not a verdict.'),
  q(B3,
    'Which cause of a DETERIORATION in the terms of trade is a sign of economic strength?',
    [
      'The world price of the single export commodity collapsed',
      'Rising productivity allowed export prices to be cut',
      'The price of essential imported fuel doubled',
      'The currency fell after capital left the country',
    ], 1,
    'All four lower the ratio. Only the second does it by lowering costs, which almost certainly means larger volumes and higher earnings. What moved the ratio decides what the movement means.'),
  q(B3,
    'A currency rises sharply. What happens to the two price indices behind the terms of trade?',
    [
      'The export index falls and the import index rises',
      'Both indices rise together, so the ratio between them is unchanged',
      'Neither index moves until firms decide to change their prices',
      'The export index rises and the import index falls',
    ], 3,
    'Measured in foreign currency, a stronger currency makes exports dearer; measured at home, it makes imports cheaper. A larger number over a smaller one, so the terms of trade improve — before any firm has changed a price list.'),

  /* ── B4 · When the terms of trade change ── */
  q(B4,
    `${S.name}'s export prices rose ${pct(S.priceRisePct)} and volume fell ${pct(S.volumeFallPct)}. Its export revenue index is:`,
    [qty(S.revenueIndex), qty(90), qty(110), qty(S.volumeIndex)], 0,
    `Revenue is price times quantity: ${qty(S.now.exportPrices / 100)} × ${qty(S.volumeIndex / 100)} = ${qty(S.revenueIndex / 100)}, an index of ${qty(S.revenueIndex)}. The terms of trade improved to ${idx(S.totNow)} and revenue fell by ${pct(100 - S.revenueIndex)} — both are true.`),
  q(B4,
    'An improvement in the terms of trade RAISES export revenue when demand for exports is:',
    ['Elastic', 'Unitary', 'Perfectly elastic', 'Inelastic'], 3,
    'With inelastic demand the quantity falls by proportionally less than the price rose, so revenue rises. With elastic demand the quantity effect wins and revenue falls. Unitary leaves revenue unchanged, and perfectly elastic means no sales at all at the higher price.'),
  q(B4,
    `${S.name}'s terms of trade improved to ${idx(S.totNow)} and its trade moved from balance to a deficit of ${bn(Math.abs(S.balance))}. This is:`,
    [
      'A contradiction, so one of the figures must be wrong',
      'Only possible if import volumes also rose',
      'What elastic export demand produces',
      'Evidence that the terms of trade were miscalculated',
    ], 2,
    `Export earnings fell to ${bn(S.exportsNow)} because volume fell more than price rose, while the same quantity of imports cost ${bn(S.importsNow)} at the higher import prices. A price ratio and a difference of values are not required to agree.`),
  q(B4,
    'Which is the strongest basis for judging a change in the terms of trade?',
    [
      'Whether the index rose or fell',
      'Whether the change was large',
      'What caused it, and how responsive demand is',
      'Whether the balance of trade moved with it',
    ], 2,
    'Direction alone is the rule the exam is built to punish: a deterioration from rising productivity is good news and an improvement from an over-strong currency is not. Cause and elasticity are what decide, and a judgement carrying both is what Evaluate asks for.'),
];

/* ══ Practice ═════════════════════════════════════════════════════════════ */
/*
 * Every tariff below is the `tariff-census.json` figure for its command word in IAL Economics:
 * Define 2, Calculate 2 or 4, Explain 4, Analyse 6, Examine 8, Discuss 14, Evaluate 20. There is
 * no Assess and no 10-mark item, which is what `topFix-05` and `practice-01` each got half right.
 */
const p = (block, command, marks, question, guidance) => ({
  id: id('practice', question), block, command, marks, question, guidance,
});

export const PRACTICE = [
  p(B1, 'Define', 2, "Define the term 'comparative advantage'. (2 marks)",
    'Two marks, so two things have to be in the sentence. Appendix 6 defines Define as knowledge and understanding only: no example, no development, no diagram. Write the definition, then check it against the trap below.\n\nThe ability to produce a good at a lower opportunity cost than another country (1 mark). Opportunity cost is the amount of the other good given up to produce it (1 mark). A definition resting on producing MORE has defined absolute advantage and earns nothing.'),
  p(B3, 'Calculate', 4, "A country's export price index rises from 100 to 126 while its import price index rises from 100 to 105. Calculate its terms of trade and state whether they have improved or deteriorated. (4 marks)",
    'Four marks for a calculation in stages, so set the formula down first and work through it on the page. Appendix 6 advises showing workings, and an unsupported final figure cannot be given method marks. The last mark is for the word the question asks for, not the number.\n\nTerms of trade = export price index ÷ import price index × 100 (1 mark). 126 ÷ 105 = 1.2 (1 mark). × 100 = 120.0 (1 mark). Above the base of 100, so the terms of trade have improved (1 mark). Note that both indices rose: exports simply rose faster.'),
  p(B3, 'Explain', 4, "Explain two factors that may cause a deterioration in a country's terms of trade. (4 marks)",
    'Two factors, two marks each, and the marks are in the chain rather than the naming. Appendix 6 defines Explain as requiring a two-stage chain for a reason or an impact: the factor, then how it reaches one of the two price indices, then what that does to the ratio. Pick from the five the specification lists.\n\nAvailable: a rise in relative productivity that lowers export prices; a fall in the exchange rate, which lowers the export index and raises the import index at once; relative labour costs rising more slowly than abroad; relative inflation below trading partners\'; or a fall in the world price of the goods exported.'),
  p(B2, 'Analyse', 6, 'Analyse two factors that may change the pattern of trade between countries. (6 marks)',
    'Two factors, three marks each, and each has to reach a named flow — which goods, moving in which direction, between whom. Appendix 6 defines Analyse as a developed chain of reasoning, so a list of the specification\'s five factors is not an answer however complete the list is.\n\nAvailable: the growth of emerging economies; changes in comparative advantage, which can remove a basis for trade entirely when opportunity costs converge; the growth of trading blocs and bilateral agreements, which redirect purchases towards members; changes in relative exchange rates; changes in protectionism, which can send trade home OR to an uncovered third country.'),
  p(B4, 'Examine', 8, 'Examine the impact of an improvement in a country\'s terms of trade on its export revenues and its balance of trade. (8 marks)',
    'Eight marks, and the question names two things to examine — take them in turn rather than together. Appendix 6 requires analysis as well as application, so each one needs the mechanism and then a number from the extract applied to it. The second effect is the one most answers never reach.\n\nThe mechanism first: an improvement means export prices rose relative to import prices, so each unit of exports earns more and buys more imports. Then the volume response, which is where the marks are: with elastic export demand, quantity falls proportionally more than price rose and export revenue falls. Apply it — a 20% price rise with an elasticity of 1.5 gives a 30% volume fall and a revenue index of 84. The balance of trade can then move into deficit even though the ratio improved, because import spending rose while export earnings fell.'),
  p(B1, 'Evaluate', 20, 'Evaluate the view that specialisation and free trade always raise a country\'s living standards. (20 marks)',
    'Twenty marks, and the word doing the work in the question is ALWAYS. Build both sides, then make the judgement conditional: on the terms of trade this economy faces, on how diversified it is, and on whether displaced resources can move. A confident verdict with no conditions attached is what this question is designed to separate out.\n\nIn support: total output rises where countries specialise by comparative advantage; economies of scale lower unit costs; consumers gain lower prices and wider choice; the purchasing power of a unit of exports can rise. Against: the gain depends on the exchange rate that splits it, and a rate near one country\'s own opportunity cost gives it almost nothing; transport costs and rising costs of production erode the predicted gain; specialisation concentrates risk, so a fall in one export price can be severe; and workers in industries that close bear a cost the national total conceals.'),
];

/* ══ Flashcards ═══════════════════════════════════════════════════════════ */

const card = (front, back) => ({ id: id('card', front), front, back });

export const FLASHCARDS = [
  card('What is specialisation in an international context?', 'Concentrating a country\'s resources on a <strong>narrower range of goods</strong> than it consumes, and trading for the rest.'),
  card('What is absolute advantage?', 'Producing <strong>more</strong> of a good from the same resources than another country can. It decides nothing on its own.'),
  card('What is comparative advantage?', 'Producing a good at a <strong>lower opportunity cost</strong> than another country. A country can have an absolute advantage in everything and a comparative advantage in only some things.'),
  card(`How is opportunity cost worked out from a production table?`, `Divide one maximum by the other. ${A.name} can make ${qty(A.grainMax)} grain or ${qty(A.clothMax)} cloth, so one cloth costs <strong>${qty(A.costOfCloth)} grain</strong>.`),
  card('Why does partial specialisation show the gain more clearly than complete specialisation?', `Because one good can be held constant. Here cloth stays at ${qty(T.withTrade.cloth)} and grain rises from ${qty(T.noTrade.grain)} to ${qty(T.withTrade.grain)} — <strong>a gain with nothing given up</strong>.`),
  card('What limits the exchange rate between two traded goods?', `It must lie strictly between the two countries\' own opportunity costs — here between ${qty(T.rateLow)} and ${qty(T.rateHigh)} grain per cloth — or one of them refuses to trade.`),
  card('What are the four assumptions behind comparative advantage?', 'Constant opportunity costs; perfect factor mobility; no transport costs or barriers; two countries and two goods, fully employed.'),
  card('What are the main limitations of the theory?', 'Costs rise as a country specialises; advantage can be created and lost; transport costs eat the gain; and the theory predicts the <strong>total</strong> gain, not how it is split or who bears the adjustment.'),
  card('What is a pattern of trade?', 'The <strong>composition</strong> of trade — which goods, with which partners, in what proportions. Distinct from volume, which is how much.'),
  card('What five factors influence patterns of trade?', 'Emerging economies; changes in comparative advantage; growth in trading blocs and bilateral trading agreements; changes in relative exchange rates; changes in protectionism.'),
  card('What is an emerging economy?', 'An economy growing quickly from a low base, industrialising, and taking a rising share of world output and trade.'),
  card('Why can a country\'s export share fall while its exports rise?', 'Because a share is a proportion of a moving total. On a world total that has doubled, a smaller share can still be worth more.'),
  card('How does a falling currency change trade prices?', `Exports become cheaper abroad (${qty(C.exportAbroadBefore)} → ${qty(C.exportAbroadAfter)}) and imports dearer at home (${qty(C.importAtHomeBefore)} → ${qty(C.importAtHomeAfter)}).`),
  card('What are the terms of trade?', 'The rate at which exports exchange for imports: the <strong>export price index ÷ import price index × 100</strong>. A ratio of prices, not of values or volumes.'),
  card('How are the terms of trade calculated?', `Divide the export price index by the import price index and multiply by 100. ${qty(S.now.exportPrices)} ÷ ${qty(S.now.importPrices)} × 100 = <strong>${idx(S.totNow)}</strong>.`),
  card('What does an IMPROVEMENT in the terms of trade mean?', 'The ratio has <strong>risen</strong>: each unit of exports commands more imports. It is a direction, not a verdict — it can coincide with falling revenue.'),
  card('What five factors influence the terms of trade?', 'Relative inflation rates; relative productivity rates; relative labour costs; the exchange rate; and the prices of imports and exports.'),
  card('Why does higher domestic inflation IMPROVE the terms of trade?', 'It pushes the export price index up faster than the import price index, so the ratio rises — while competitiveness falls at the same time.'),
  card('Why can a deterioration be a sign of strength?', 'If rising <strong>productivity</strong> cut unit costs and export prices, the country sells more cheaply from a stronger position and is likely to sell more.'),
  card('What decides whether an improvement raises export revenue?', `The <strong>price elasticity of demand</strong> for exports. Elastic demand means revenue falls; inelastic means it rises. At ${qty(S.pedExports)}, ${S.name}'s revenue index fell to ${qty(S.revenueIndex)}.`),
  card('What is the balance of trade?', 'The <strong>value</strong> of exports minus the value of imports. It can worsen in the same year the terms of trade improve.'),
  card('How should a change in the terms of trade be judged?', 'By asking <strong>what caused it</strong> and <strong>how responsive demand is</strong> — never by the direction of the index alone.'),
];

/* ══ Misconceptions ═══════════════════════════════════════════════════════ */

const mistake = (title, wrong, correction, examTip) => ({ id: id('mistake', title), title, mistake: wrong, correction, examTip });

export const MISTAKES = [
  mistake('Confusing absolute and comparative advantage',
    'Students say a country has a comparative advantage because it can produce more of a good, or produce it more cheaply.',
    `Those are absolute statements. Comparative advantage is a ratio inside one country — what it gives up of the other good — compared across countries. ${A.name} can make more of both goods and still has a comparative advantage in only one.`,
    'Always compute both opportunity costs before writing anything. One division per country per good, and the lower figure decides.'),
  mistake('Specialising completely and calling the result a gain',
    'Students move every resource into the good each country is best at, find more of one good and less of the other, and call it a gain.',
    `Complete specialisation here gives ${qty(A.grainMax)} grain and ${qty(B.clothMax)} cloth against ${qty(T.noTrade.grain)} and ${qty(T.noTrade.cloth)} without trade — more grain and LESS cloth. Specialise partially so one good is held constant, and the gain is unambiguous.`,
    'Hold one good at its no-trade level and put the rest into the other. If both goods moved, you have shown a trade-off and not a gain.'),
  mistake('Reading a falling share as a falling value',
    'Students see an export share drop and conclude that the country is exporting less.',
    `A share is a proportion of a moving total. An advanced economy going from ${pct(H.advancedThen)} to ${pct(H.advancedNow)} of a world total that has grown can be exporting considerably more than before.`,
    'Whenever a question gives you a share, look for the total. If the total is not given, say what the share does and do not claim anything about the value.'),
  mistake('Treating an improvement in the terms of trade as good news',
    'Students read "improvement" as a verdict and write that the economy is better off.',
    `An improvement raises the purchasing power of each unit of exports and can cut export revenue and push the balance of trade into deficit at the same time. ${S.name}'s improvement to ${idx(S.totNow)} came with a revenue index of ${qty(S.revenueIndex)} and a deficit of ${bn(Math.abs(S.balance))}.`,
    'Two questions every time: what moved the ratio, and how elastic is demand for exports? An answer carrying both is doing what Evaluate asks.'),
  mistake('Confusing the terms of trade with the balance of trade',
    'Students use the two interchangeably, because both use the word improvement about the same country in the same year.',
    'The terms of trade are a ratio of PRICE indices. The balance of trade is the difference between the VALUE of exports and the value of imports. Nothing forces them to move together, and in the elastic case they move apart.',
    'If the question gives you price indices, it is about the terms of trade. If it gives you values or an elasticity, the balance of trade is in play.'),
];

/* ══ Extras ═══════════════════════════════════════════════════════════════ */
/*
 * The chain below is the SOURCE for the reorder in `the-balance-of-trade`. `reorder.source` asks
 * that a reorder paraphrase a flow or extras chain in the same SECTION; extras live in another tab,
 * so the sequence is taught without the answer being printed on the step the recall is asked on.
 */
export const EXTRAS_NEW = {
  chains: [
    { title: 'From an export price rise to a trade deficit', steps: [
      'Export prices rise relative to import prices, so the terms of trade improve.',
      'Foreign buyers respond to the higher price by cutting the quantity they order.',
      `Demand is elastic, so the fall in quantity outweighs the rise in price: at an elasticity of ${qty(S.pedExports)}, a ${pct(S.priceRisePct)} rise costs ${pct(S.volumeFallPct)} of the volume.`,
      `Export earnings fall to an index of ${qty(S.revenueIndex)} while the import bill rises with import prices.`,
      `Earnings drop below spending: ${bn(S.exportsNow)} against ${bn(S.importsNow)}, a deficit of ${bn(Math.abs(S.balance))}.`,
    ] },
    { title: 'From different opportunity costs to a shared gain', steps: [
      `Each country divides one output maximum by the other to find what a good costs it: cloth costs ${A.name} ${qty(A.costOfCloth)} grain and ${B.name} ${qty(B.costOfCloth)}.`,
      'The country giving up less of the other good has the comparative advantage and moves resources towards that good.',
      `Specialisation is partial, so one good is held constant: cloth stays at ${qty(T.withTrade.cloth)} and grain rises to ${qty(T.withTrade.grain)}.`,
      `The goods are exchanged at a rate between the two domestic costs — ${qty(T.rate)} grain per cloth.`,
      `Each country ends with ${qty(T.meridaGains.grain)} more grain and no less cloth than it had alone.`,
    ] },
    { title: 'How a productivity gain removes a reason to trade', steps: [
      `${B.name}'s grain capacity doubles to ${qty(KALTO_LATER.grainMax)}, leaving cloth at ${qty(KALTO_LATER.clothMax)}.`,
      `Its opportunity cost of cloth falls to ${qty(KALTO_LATER.costOfCloth)} grain.`,
      `That is exactly ${A.name}'s cost, so neither country gives up less than the other for either good.`,
      'With identical opportunity costs there is no comparative advantage and no gain left to divide, so the trade has no basis.',
    ] },
  ],
  evaluation: [
    { title: 'An improvement in the terms of trade is not necessarily good news',
      content: `Each unit of exports buys more imports, which raises the purchasing power of a given export volume — ${S.name}'s rose to ${qty(S.importsPerExport)} units of imports for one of exports. But the higher price is met with smaller orders. With a price elasticity of demand of ${qty(S.pedExports)}, a ${pct(S.priceRisePct)} price rise costs ${pct(S.volumeFallPct)} of the volume, leaving an export revenue index of ${qty(S.revenueIndex)} and a trade deficit of ${bn(Math.abs(S.balance))}. The judgement turns on elasticity and on what caused the movement: an improvement produced by rising domestic inflation is a different proposition from one produced by strong world demand for what the country sells.` },
    { title: 'Comparative advantage is a weaker guide to policy than it looks',
      content: `The theory predicts a gain of ${qty(T.gain.grain)} units of output and says nothing about who gets it. The split depends entirely on the exchange rate between the goods, and any rate between ${qty(T.rateLow)} and ${qty(T.rateHigh)} is consistent with the theory — including rates that leave one country with almost nothing. Transport costs come out of the gain before it is shared; rising costs of production mean the advantage runs out before the resources do; and the workers in the industry that closes bear an adjustment cost the national total conceals. None of this removes the gain, but a policy argument that cites the theory without them has cited half of it.` },
    { title: 'A pattern of trade is not a fixed feature of a country',
      content: `Comparative advantage is a ratio, and ratios move: a country that doubles its productivity in one good can find its opportunity costs converging with its trading partner's, at which point the basis for the trade between them disappears entirely. Emerging economies moving from ${pct(H.emergingThen)} to ${pct(H.emergingNow)} of world exports did not find an advantage; investment, education and infrastructure built one. The policy implication is that a country can act on its pattern of trade rather than only respond to it — and that a country resting on an advantage it once had is the one most exposed.` },
  ],
};
