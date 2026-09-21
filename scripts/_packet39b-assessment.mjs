/**
 * PACKET 39b — trade-global-economy: the quiz bank, practice, flashcards, misconceptions and extras
 * for sub-topics 4 and 5, plus the inversion of 39a's carry list.
 *
 * ════ THE CARRY LIST INVERTS ════
 *
 * 39a rebuilt sub-topics 1-3 and carried the protectionism block and its items forward BY ID. Those
 * exact ids are what 39b now rewrites, and everything 39a authored is what 39b carries. So this
 * module does not list what to keep: it imports 39a's `CARRIED` and treats it as the REPLACE list,
 * which makes the two halves incapable of disagreeing about the boundary.
 *
 * ════ WHAT IS REMOVED AND WHY ════
 *
 *   - The five carried quiz items, two practice items, fourteen flashcards, one misconception and
 *     three diagrams are all REBUILT here against this packet's arithmetic spine.
 *   - `practice:e3345b30` is `Explain … (6 marks)` and the census gives Explain **4**. It has been
 *     the last practice item a student meets since 39a pinned it to chapter 5, and three separate
 *     instruments flagged it: Verify A, `BLOCK practice.tariff` in the baseline, and
 *     `npm run spec-coverage -- --staged` through `lib/ial-marking.js`.
 *   - The bloc quiz items 39a deleted (`9f64a059`, `2f4d56cd`, `46a392d1`) are re-authored here,
 *     which is what `quiz-02` and `quiz-03` have been open for since they were written.
 *
 * ════ THE THREE REORDERS ARE SOURCED FROM EXTRAS CHAINS ════
 *
 * A reorder whose answer is printed in order on its own step is answerable by scrolling up, and
 * this section is held to ZERO of those. Each of the three reorders is taught in order by a chain
 * in the Extras tab instead, and the runner asserts the pairing rather than trusting it.
 */
import {
  id, qty, pct, money, units,
  TARIFF, QUOTA, SUBSIDY, BLOC, SCALE, FRICTION, LADDER,
} from './_packet39b-util.mjs';
import { CARRIED as CARRIED_BY_39A } from './_packet39-assessment.mjs';
import { B5, B6, B7, B8, B9, B10 } from './_packet39b-content.mjs';

const T = TARIFF, Q = QUOTA, S = SUBSIDY, B = BLOC;

/** Everything 39a carried is everything 39b replaces. Nothing here is written down twice. */
export const REPLACES = {
  quiz: CARRIED_BY_39A.quiz,
  practice: CARRIED_BY_39A.practice,
  diagrams: CARRIED_BY_39A.diagrams,
  mistakes: CARRIED_BY_39A.mistakes,
  flashcards: CARRIED_BY_39A.flashcards,
  notes: CARRIED_BY_39A.notes,
  block: 'Protectionism and the WTO',
  /*
   * EXTRAS ARE SWEPT BY TITLE, AND VERIFY A REJECTED THE PACKET FOR NOT DOING IT.
   *
   * `REPLACES` covered quiz, practice, diagrams, mistakes, flashcards, notes and the block; the
   * runner filtered extras only by the off-spec vocabulary. So the live chain
   * "Trading blocs create trade creation and diversion" came through byte-identical, defining
   * diversion as something "the common external tariff shifts" — which is the exact framing
   * `causes-effects-globalisation-topFix-03` says to replace with the preferential-tariff-removal
   * account, and which `content[6] > trade-diversion` now teaches correctly. The section taught the
   * leaf two contradictory ways at once, and the Extras tab had the wrong one.
   *
   * The last two are 39a's leftovers rather than this packet's: live entries that duplicate what 39a
   * authored. Removing them alters no content either half wrote.
   */
  extras: [
    'Trading blocs create trade creation and diversion',
    'Tariffs create welfare loss and reduce welfare',
    'Trading blocs may undermine global free trade',
    'Infant industry protection may be justified in some cases',
    'Comparative advantage shows gains from trade',
    'Comparative advantage has limitations as a guide to policy',
  ],
  why: {
    'trade-global-economy:practice:e3345b30': 'Explain carries 4 marks in IAL Economics, not 6 — rebuilt at the census tariff',
    'trade-global-economy:practice:09d7629f': 'rebuilt as an Evaluate on joining a customs union, which is the 4c question',
    'trade-global-economy:diagram:2ed3a5c6': 'rebuilt on the 400-unit frame with the four welfare areas labelled (accuracy-01)',
    'trade-global-economy:diagram:37257b86': 'rebuilt on the same axes as the tariff, so the two can be compared',
    'trade-global-economy:diagram:93bba7cd': 'rebuilt as the four rungs the specification lists, with what each one adds',
  },
};

/*
 * THE ANSWER-POSITION HISTOGRAM IS FIXED BY CONSTRUCTION, NOT BY HAND.
 *
 * Written naturally, this bank keyed index 1 in 17 of 25 items — 68%, against a 40% guard — because
 * the plausible-but-wrong option reads best first and the correct one second. Packet 33 hit the
 * same thing from the other direction with option length. Correcting it by hand invites it back the
 * moment an item is added, so `q` records the author's key and `balanced()` ROTATES each item's
 * options so that the keys cycle 0,1,2,3 down the bank.
 *
 * Rotation is safe here because no explanation in this module refers to an option by position — the
 * runner asserts that separately, and rotation preserves the relative order of the options anyway.
 */
const authored = [];
const q = (block, question, options, correctIndex, explanation) => {
  const item = { id: id('quiz', question), block, question, options, correctIndex, explanation };
  authored.push(item);
  return item;
};

/** Rotate `options` left by `k`, carrying the key with it. */
function rotateTo(item, target) {
  const n = item.options.length;
  const k = ((item.correctIndex - target) % n + n) % n;
  const options = [...item.options.slice(k), ...item.options.slice(0, k)];
  return { ...item, options, correctIndex: target };
}

const balanced = (items) => items.map((it, i) => rotateTo(it, i % 4));

/* ══ Quiz ═════════════════════════════════════════════════════════════════ */
/*
 * THE FIRST TWO CARRY NO BLOCK, AND THEY DO NOT REACH THE PRE-TEST. `pickPretestQuestions` takes
 * the first unreserved items in stable order, and 39a's three come first in the array, so these two
 * are Quiz-tab material. An earlier version of this comment claimed they join the pre-test pool,
 * which Verify A checked and found false. They stay unpinned because both are on material this half
 * teaches and neither belongs to a single chapter.
 */
const QUIZ_AUTHORED = [
  q(null,
    'A country has bound its tariff on cement at 20% and currently charges 6%. Which move breaches the binding?',
    ['Raising the rate to 12%', 'Raising the rate to 20%', 'Cutting the rate to 0%', 'Raising the rate to 24%'], 3,
    'A binding is a ceiling, not a fixed rate. Anything up to 20% is permitted and so is anything below it; only a rate above the bound 20% breaks the agreement.'),
  q(null,
    'Which is the defining difference between a free-trade area and a customs union?',
    [
      'A customs union removes tariffs between its members and a free-trade area does not',
      'A free-trade area allows workers to move between members and a customs union does not',
      'A customs union applies one agreed tariff to imports from outside',
      'A free-trade area requires members to share a single currency',
    ], 2,
    'Both remove internal tariffs. Only the customs union adds a common external tariff, which is also why a free-trade area needs rules of origin and a customs union does not.'),

  q(B5, 'Under most-favoured nation, a member that cuts its tariff on one member\'s sugar must:',
    ['Cut it for every other member as well', 'Raise it for every other member to compensate', 'Apply the cut only to that one member', 'Seek approval before the cut takes effect'], 0,
    'Most-favoured nation is a rule against having favourites: a concession given to any member is owed to all of them. It is the reason a bilateral tariff cut inside the WTO system cannot stay bilateral.'),
  q(B5, 'A country binds its tariffs at zero and then applies a sales tax only to imported cars. Which rule does this breach?',
    ['Most-favoured nation', 'National treatment', 'The rules of origin', 'The common external tariff'], 1,
    'The discrimination happens after the border and compares an import with a domestic good, which is what national treatment governs. Most-favoured nation is about discriminating between outside members, not between foreign and domestic.'),
  q(B5, 'Why is a trading bloc a problem for the WTO\'s first principle?',
    [
      'It raises tariffs on its own members above their bound rates',
      'It gives members a tariff that non-members do not get',
      'It prevents members from using the dispute settlement process',
      'It requires members to leave the WTO when they join it',
    ], 1,
    'A bloc works by charging members less than non-members, and most-favoured nation says a concession to any member goes to all. The bloc is a breach by construction, permitted only as a carved-out exception.'),

  q(B6, 'A free-trade area needs rules of origin because:',
    [
      'Members apply different tariffs to imports from outside',
      'Members have already agreed a single common external tariff',
      'Workers and capital may move freely between the members',
      'Members use different currencies for their internal trade',
    ], 0,
    'With different external tariffs, an outside exporter would ship everything through the member charging least and move it on duty-free. Rules of origin test where the good was actually made. A common external tariff removes the incentive, which is why a customs union does not need them.'),
  q(B6, 'Which freedom first appears at the common market rung?',
    ['Goods crossing internal borders without paying a tariff', 'A single agreed external tariff applied to outsiders', 'Labour and capital crossing internal borders freely', 'A single shared currency and one interest rate'], 2,
    'Free movement of the factors of production is what defines a common market. The rungs below move goods; this one moves labour and capital as well.'),
  q(B6, 'The specification lists economic and monetary union as:',
    ['Two separate levels of integration', 'One level of integration', 'A synonym for a customs union', 'A type of free-trade area'], 1,
    'Leaf 4b-4 reads "economic and monetary unions" as a single item. Treating economic union as a further rung above monetary union invents a level this specification does not have.'),
  q(B6, 'Which policy instrument does a member give up on joining a customs union that it keeps in a free-trade area?',
    ['Its own rates of income tax and corporation tax', 'Its own external trade policy', 'Its own national currency and exchange rate', 'Its own interest rate and monetary policy'], 1,
    'The common external tariff is agreed collectively, so a member can no longer set its own rate on outsiders or sign its own trade deals. Currency and interest rates go two rungs further up; income tax is not a trade instrument.'),

  q(B7, `A good costs ${money(B.sources.home)} at home, ${money(B.sources.partner)} in a partner and ${money(B.sources.outside)} outside, with a ${pct(B.creation.before.tariffPct)} tariff on all imports. Before joining a bloc with the partner, who supplies the market?`,
    ['The partner', 'The outside producer', 'The home producer', 'Home and partner equally'], 2,
    `At ${pct(B.creation.before.tariffPct)} the partner lands at ${money(B.creation.before.prices.partner)} and the outsider at ${money(B.creation.before.prices.outside)}, both above the home producer's ${money(B.sources.home)}. The tariff is high enough to shut out both foreign sources.`),
  q(B7, `With the same costs but a ${pct(B.diversion.before.tariffPct)} tariff, joining the bloc moves supply from the outsider to the partner. What happens?`,
    [
      `The price paid rises and the country gains`,
      `The price paid falls by ${money(B.diversion.priceFall)} and the country's real cost rises by ${money(B.diversion.realLoss)}`,
      `Both the price and the real cost fall`,
      `The price is unchanged and only the tariff revenue moves`,
    ], 1,
    `The buyer pays ${money(B.diversion.after.pricePaid)} instead of ${money(B.diversion.before.pricePaid)}, so the price falls. But the ${money(B.diversion.before.pricePaid - B.sources.outside)} of tariff in the old price was collected by the country itself, so the resources given up rise from ${money(B.sources.outside)} to ${money(B.sources.partner)}. A cheaper price and a poorer country.`),
  q(B7, 'Which of these describes trade creation rather than a rise in trade volume?',
    [
      'Any increase in the total volume of trade after a bloc is formed',
      'A shift in production from a higher-cost to a lower-cost source',
      'A shift in purchasing from an outside supplier to a member supplier',
      'The tariff revenue a government gives up when it removes a tariff',
    ], 1,
    'The test is the cost of the resources given up, not the volume of trade or the identity of the supplier. A shift to a member supplier that is dearer than the outsider is diversion, and trade rises in both cases.'),
  q(B7, `A firm making ${units(SCALE.homeOnly.output)} units at ${money(SCALE.homeOnly.unitCost)} each moves to ${units(SCALE.blocWide.output)} at ${money(SCALE.blocWide.unitCost)} inside a bloc. The fall in average cost is:`,
    [`${pct(10)}`, `${pct(SCALE.fallPct)}`, `${pct(25)}`, `${pct(40)}`], 1,
    `${money(SCALE.homeOnly.unitCost)} to ${money(SCALE.blocWide.unitCost)} is a fall of ${money(SCALE.fall)}, and ${money(SCALE.fall)} as a share of ${money(SCALE.homeOnly.unitCost)} is ${pct(SCALE.fallPct)}. The output rose ${qty(SCALE.timesLarger)} times over, which is what spread the fixed costs.`),
  q(B7, 'Which transaction cost does a free-trade area ADD rather than remove?',
    ['Currency conversion on internal sales', 'Proving where a good was made', 'The tariff on imports from members', 'Exchange-rate risk on an internal contract'], 1,
    'Rules of origin are the running cost of keeping different external tariffs. The other three are removed further up the ladder — conversion and exchange-rate risk at monetary union, the internal tariff at the first rung.'),

  q(B8, 'The strongest objection to the infant industry argument is that:',
    [
      'New industries can never achieve economies of scale at all',
      'Protection removes the pressure to cut costs, and rarely ends',
      'Consumers in developing countries do not benefit from cheap imports',
      'The WTO prohibits every form of protection for a new industry',
    ], 1,
    'The argument is conditional rather than wrong. It works where there are genuine scale economies to reach AND a credible end point; the usual failure is that the protection outlives the case for it because nothing required it to stop.'),
  q(B8, 'A tariff on steel is introduced to protect steelmaking jobs. The effect most often left out of the argument is:',
    ['The tariff revenue the government collects at the border', 'Employment falling in the firms that buy steel', 'The rise in output at domestic steel producers', 'The fall in the quantity of steel imported'], 1,
    'The gain is concentrated in one industry and countable; the loss is spread across every firm using steel as an input and is not reported as a closure. Retaliation against exporters is the second uncounted loss.'),
  q(B8, 'Dumping is defined as selling exports:',
    [
      'At any price lower than domestic competitors are able to match',
      'Below the cost of production or below the home-market price',
      'In greater volumes than the importing market is able to absorb',
      'Without paying the tariff the importing country has set',
    ], 1,
    'The definition is about the exporter\'s own cost or its own home price. A foreign producer that simply makes the good more cheaply is not dumping however far it undercuts, which is what makes anti-dumping duties so easy to misuse.'),
  q(B8, 'Using a tariff to correct a current-account deficit tends to fail because:',
    [
      'Tariffs cannot be applied to imported services',
      'Retaliation reduces exports, reopening the deficit on the other side',
      'The WTO requires any tariff revenue to be returned',
      'Import spending is unaffected by price'
    ], 1,
    'The deficit usually reflects domestic demand running ahead of domestic supply, which a tariff does not change. Partners retaliate, export earnings fall, and the deficit reappears through the export side of the account.'),

  q(B9, `With a world price of ${money(T.worldPrice)}, a ${money(T.tariff)} tariff takes domestic supply from ${units(T.atWorld.supply)} to ${units(T.atProtected.supply)} and demand from ${units(T.atWorld.demand)} to ${units(T.atProtected.demand)}. Imports become:`,
    [units(T.importsAfter), units(60), units(T.importsBefore), units(20)], 0,
    `${units(T.atProtected.demand)} demanded less ${units(T.atProtected.supply)} supplied at home is ${units(T.importsAfter)}, down from ${units(T.importsBefore)}. Imports fall for two reasons at once: more home production AND less total consumption.`),
  q(B9, `A quota set at ${units(Q.limit)} units produces the same price as the ${money(T.tariff)} tariff. The difference between them is:`,
    [
      'The quota causes a larger welfare loss than the tariff does',
      `The ${money(Q.rent)} becomes rent rather than revenue`,
      'The quota raises the domestic price by more than the tariff',
      'The quota leaves domestic producers worse off than the tariff',
    ], 1,
    `Price, consumer loss and welfare loss all match. Only the middle rectangle changes hands differently — and if the licences go to foreign exporters, that ${money(Q.rent)} leaves the country entirely.`),
  q(B9, `A subsidy of ${money(S.perUnit)} per unit costs the government ${money(S.cost)} and gains producers ${money(S.producerGain)}. Its welfare loss is ${money(S.deadweight)} against the tariff's ${money(T.deadweight)} because:`,
    [
      'The subsidy is paid from taxation rather than collected at the border',
      'Consumers still face the world price, so consumption is not distorted',
      'The subsidy raises domestic output by less than the tariff does',
      'Government spending is not counted as a welfare loss',
    ], 1,
    `Domestic output rises to ${units(S.domesticAfter)} under both, so the production distortion is identical. The tariff also pushes demand down from ${units(T.atWorld.demand)} to ${units(T.atProtected.demand)}, and that second triangle is the extra loss a subsidy avoids.`),
  q(B9, 'Which is the strongest reason non-tariff barriers are harder to discipline than tariffs?',
    [
      'They are applied at the border rather than behind it',
      'A legitimate regulation and a disguised barrier can look identical',
      'They raise no revenue for the importing government',
      'They are not covered by any WTO principle',
    ], 1,
    'A bound tariff is a published number a partner can point at. A safety standard is a legitimate policy that happens to exclude, and telling the two apart is the hard part. National treatment is the rule they are tested against, so they are covered.'),

  q(B10, `Consumers lose ${money(T.consumerLoss)} from the tariff, producers gain ${money(T.a)} and the government raises ${money(T.c)}. The net welfare loss exists because:`,
    [
      `${money(T.a)} is smaller than ${money(T.consumerLoss)}`,
      `${money(T.consumerLoss)} exceeds ${money(T.a)} plus ${money(T.c)}`,
      `The government revenue is not returned to consumers`,
      `Domestic producers are less efficient than foreign ones`,
    ], 1,
    `${money(T.a)} + ${money(T.c)} is ${money(T.a + T.c)}, and consumers lost ${money(T.consumerLoss)} — so ${money(T.deadweight)} went to nobody. Saying producer gain is smaller than consumer loss is true of every tariff ever levied and identifies nothing.`),
  q(B10, 'In the tariff diagram, which areas represent the welfare loss?',
    ['a and c', 'a and b', 'b and d', 'c and d'], 2,
    'Area a is transferred to producers and area c to the government, so both stay inside the country. Areas b and d are received by nobody: b is the resource waste of higher-cost home production, d is the value of the consumption given up.'),
  q(B10, 'A tariff on basic foodstuffs is described as regressive because:',
    [
      'It raises more revenue from richer households',
      'It takes a larger share of a smaller income',
      'It protects industries that employ lower-paid workers',
      'It applies a higher rate to cheaper goods',
    ], 1,
    'The rate is the same for everyone, which is exactly why it is regressive: spending on necessities is a larger share of a small income, so the same percentage takes proportionally more from a poorer household.'),
];

export const QUIZ = balanced(QUIZ_AUTHORED);

/* ══ Practice ═════════════════════════════════════════════════════════════ */

const p = (block, command, marks, question, guidance) => ({
  id: id('practice', question), block, command, marks, question, guidance,
});

export const PRACTICE = [
  p(B7, 'Define', 2, 'Define trade diversion. (2 marks)',
    'Two marks, so two things have to be in the sentence, and Appendix 6 defines Define as knowledge and understanding only — no example and no diagram. Write it, then test it against the trap below.\n\nA shift in the source of imports from a lower-cost producer outside the bloc to a higher-cost producer inside it (1 mark), caused by the removal of the tariff on members rather than by any change in costs (1 mark). A definition resting on "buying more from members" has described the volume of trade and not its cost, and earns nothing.'),
  p(B6, 'Explain', 4, 'Explain the difference between a free-trade area and a customs union. (4 marks)',
    'Four marks and two institutions, so the structure is a feature and its consequence for each. Appendix 6 defines Explain as needing a two-stage chain: name the difference, then say what follows from it.\n\nBoth remove tariffs between members (1 mark). A customs union adds a common external tariff so that all members charge the same rate on imports from outside (1 mark). In a free-trade area members keep different external tariffs (1 mark), so rules of origin are needed to stop imports entering through the lowest-tariff member and moving on duty-free (1 mark).'),
  p(B9, 'Explain', 4, 'Explain two effects of imposing a tariff on an imported good. (4 marks)',
    'Two effects, two marks each, and the marks are in the consequence rather than the naming. Appendix 6 makes Draw the command word that requires a diagram, so this can be answered in prose — a clear price-and-quantity chain earns full marks without one.\n\nAvailable: the domestic price rises by the tariff, so domestic producers expand output along the supply curve and gain producer surplus; consumers face the higher price, so quantity demanded contracts and consumer surplus falls; imports fall from both directions at once; the government collects the tariff on the imports that still arrive, which is self-limiting because a more effective tariff raises less.'),
  p(B7, 'Analyse', 6, 'Analyse two costs to a country of joining a trading bloc. (6 marks)',
    'Two costs, three marks each, and each needs a developed chain rather than a label. Appendix 6 defines Analyse as a developed line of reasoning, so naming trade diversion and stopping is half an answer.\n\nAvailable: trade diversion, where supply moves from a cheaper outsider to a dearer member and the resources given up rise even though the price paid falls; the loss of an independent external trade policy at the customs union rung; the loss of monetary independence at the monetary union rung, so a member in recession cannot cut its own rate or let its currency fall; and the uneven effect of factor movement, where the member losing workers keeps the cost of training them.'),
  p(B10, 'Examine', 8, 'Examine the impact of a tariff on consumers, producers and the government. (8 marks)',
    'Eight marks and three named groups, so take them in turn and give each one a mechanism and a figure. Appendix 6 requires analysis as well as application, so an answer that describes the three without quantifying any of them is working below the command word.\n\nConsumers lose the whole price rise on what they still buy plus the value of what they stop buying. Producers gain on existing output as well as new output, which is why the first part is the larger and the less deserved. The government collects the tariff only on imports that still arrive, so its revenue falls as the protection becomes more effective — and a quota in place of the tariff would raise nothing at all. The distributional point is worth making: the producer gain is concentrated and the consumer loss is spread.'),
  p(B5, 'Explain', 4, 'Explain two ways in which the WTO supports trade liberalisation. (4 marks)',
    'Two ways, two marks each, and each needs the mechanism rather than the name. Appendix 6 defines Explain as needing a two-stage chain: say what the WTO does, then say what that makes possible.\n\nAvailable: bindings, which are ceilings a member agreed not to exceed, so a negotiated cut cannot quietly be reversed; most-favoured nation, which spreads a concession given to one member to all of them and so multiplies the effect of any single negotiation; national treatment, which stops a member undoing a tariff cut with an internal tax; and dispute settlement, which makes all three enforceable by authorising retaliation against a member that loses and does not comply.'),
  p(B8, 'Analyse', 6, 'Analyse two reasons why a government might restrict free trade. (6 marks)',
    'Two reasons, three marks each, and the marks are in the developed chain rather than the naming. Appendix 6 defines Analyse as a developed line of reasoning, so a list of the specification\'s six reasons is not an answer however complete it is.\n\nAvailable: infant industries, where protection buys time to reach competitive scale and the weakness is the missing end point; domestic employment, where the jobs saved are visible and the jobs lost in the industries buying the protected good are not; national security, which is an insurance argument rather than a cost one; preventing dumping, where the definition is selling below own cost or below the home price; correcting a current-account deficit, which retaliation tends to undo; and raising revenue, which is an administrative argument that matters most where other taxes are hard to collect.'),
  p(B7, 'Evaluate', 20, 'Evaluate whether a country should join a customs union. (20 marks)',
    'Twenty marks, and the judgement has to be conditional on something measurable rather than asserted. Build both sides, then say what the answer depends on: the relative size of creation and diversion, how different the common external tariff is from the one the country has now, and how much of its trade is already with the members.\n\nFor: trade creation moves production to lower-cost members and releases resources; a larger market brings economies of scale; transaction costs and rules of origin fall away; negotiating as a bloc carries more weight than negotiating alone. Against: trade diversion can raise the real cost of imports behind a falling price; the common external tariff removes an independent trade policy and may be higher than the member\'s own; the gains accrue unevenly between members and between regions within one. The strongest answers note that creation and diversion happen simultaneously and that the net effect is an empirical question, not a theoretical one.'),
];

/* ══ Flashcards, misconceptions, extras ═══════════════════════════════════ */

const card = (front, back) => ({ id: id('card', front), front, back });

export const FLASHCARDS = [
  card('Trade liberalisation', 'The removal of barriers to trade between countries — tariffs, quotas and non-tariff barriers.'),
  card('A bound tariff', 'The maximum rate a WTO member has agreed it may charge. It may charge less; charging more breaks the agreement.'),
  card('Most-favoured nation', 'A concession given to any WTO member must be given to all of them. A rule against having favourites, not a privilege.'),
  card('National treatment', 'Once an import has cleared the border it must be taxed and regulated no worse than an equivalent domestic good.'),
  card('Free-trade area', 'Members remove tariffs on each other and each keeps its own external tariff. Needs rules of origin.'),
  card('Customs union', 'A free-trade area plus a common external tariff, so an import pays the same rate whichever member it enters through.'),
  card('Common market', 'A customs union plus free movement of the factors of production: labour and capital cross internal borders freely.'),
  card('Economic and monetary union', 'A common market plus a shared currency, a single monetary policy and common rules on members\' public finances.'),
  card('Rules of origin', 'The test of where a good was actually made, used in a free-trade area to stop imports routing through the lowest-tariff member.'),
  card('Common external tariff', 'One rate charged on imports from outside, agreed by all members of a customs union.'),
  card('Trade creation', `Production shifts from a higher-cost source to a lower-cost one, so fewer resources are given up: ${money(B.sources.home)} to ${money(B.sources.partner)} in this section's example.`),
  card('Trade diversion', `Supply shifts from the cheapest producer to a dearer member because of the preference. The price can fall ${money(B.diversion.priceFall)} while the real cost rises ${money(B.diversion.realLoss)}.`),
  card('Transaction costs', 'What a trade costs on top of the good: currency conversion, customs clearance, proving origin, exchange-rate risk.'),
  card('Tariff', `A tax on an imported good. In this section a ${money(T.tariff)} tariff takes the price from ${money(T.worldPrice)} to ${money(T.protectedPrice)} and imports from ${units(T.importsBefore)} to ${units(T.importsAfter)}.`),
  card('Quota', `A cap on the quantity imported. Same price and same welfare loss as an equivalent tariff; the ${money(Q.rent)} becomes rent rather than revenue.`),
  card('Quota rent', 'The gap between the world price and the domestic price on the units allowed in, received by whoever holds the import licence.'),
  card('Non-tariff barrier', 'A restriction that is neither a tax nor a quantity cap: standards, licensing, inspections, paperwork.'),
  card('Subsidy to domestic producers', `A payment per unit produced. Consumers keep the world price, so the loss is ${money(S.deadweight)} against the tariff's ${money(T.deadweight)}.`),
  card('Welfare loss', `The part of the consumer loss received by nobody: areas b and d, ${money(T.b)} each in this section's tariff.`),
  card('Dumping', 'Selling exports below the cost of production or below the price charged in the producer\'s own market.'),
  card('Infant industry argument', 'Protect a new industry until it reaches competitive scale. Conditional on genuine scale economies and a credible end point.'),
  card('Geriatric industry argument', 'Protect a declining industry so it shrinks slowly enough for workers and regions to adjust.'),
];

const mistake = (title, body) => ({ id: id('mistake', title), title, ...body });

export const MISTAKES = [
  mistake('Thinking trade diversion is good because the price falls', {
    mistake: 'The buyer pays less after joining, so students score trade diversion as a benefit.',
    correction: `The test is the resources the country gives up, not the price on the shelf. The tariff inside the old price was money the country paid itself. Real cost rises from ${money(B.sources.outside)} to ${money(B.sources.partner)} while the price falls ${money(B.diversion.priceFall)}.`,
    examTip: 'Work the real cost of each source separately from the price paid. If the two move in opposite directions, that is the diversion case and the marks are for saying so.',
  }),
  mistake('Saying the welfare loss is because producers gain less than consumers lose', {
    mistake: 'Producer gain is always smaller than consumer loss under a tariff, so this explains nothing.',
    correction: `The loss exists because consumers lose ${money(T.consumerLoss)} and producers plus the government between them receive only ${money(T.a + T.c)}. The missing ${money(T.deadweight)} is areas b and d, which nobody receives.`,
    examTip: 'Name the two triangles. An answer that identifies b as wasted resources and d as forgone consumption has located the loss rather than asserted it.',
  }),
  mistake('Treating a customs union as "free trade"', {
    mistake: 'A customs union means free trade inside and a single agreed wall outside.',
    correction: 'The common external tariff can be higher than the tariff a member charged before it joined, so joining can make that member MORE protected against the rest of the world, not less.',
    examTip: 'For an Evaluate on joining, compare the common external tariff with the member\'s existing rate. That comparison is what decides whether diversion is likely.',
  }),
  mistake('Assuming a subsidy costs the country more than a tariff', {
    mistake: 'The government pays out under a subsidy and takes in under a tariff, so the subsidy looks more expensive.',
    correction: `The government's cash position is not the country's welfare. A subsidy leaves consumers at the world price, so it distorts production only: ${money(S.deadweight)} against the tariff's ${money(T.deadweight)}.`,
    examTip: 'If asked which tool does least damage for a given amount of protection, say the subsidy and give the reason: no consumption distortion.',
  }),
  mistake('Believing the WTO can force a country to open its market', {
    mistake: 'The WTO has no power to set any member\'s tariffs.',
    correction: 'Every reduction is one the member negotiated and wrote down as a binding. The WTO enforces the promise; it does not make the policy.',
    examTip: 'An answer saying "the WTO makes countries trade freely" loses the mark. "The WTO enforces commitments members made to each other" earns it.',
  }),
];

/*
 * EXTRAS. The three chains below are the SOURCE for the three reorders, which is why each step
 * shares its vocabulary with the recall it teaches. The runner asserts the pairing.
 */
export const EXTRAS_NEW = {
  chains: [
    { title: 'Climbing the four rungs', steps: [
      'Members remove tariffs on each other and each keeps its own external tariff',
      'Members agree a single external tariff on imports from outside the bloc',
      'Labour and capital become free to move between the members',
      'One currency and one monetary policy replace the national ones',
    ] },
    { title: 'Why a tariff shrinks imports from both sides', steps: [
      'A tax is added to the price of the imported good',
      'Domestic producers expand output along their supply curve',
      'Buyers cut back the quantity they demand at the higher price',
      'Imports are squeezed from both sides and fall',
    ] },
    { title: 'Why a tariff fails to fix a deficit', steps: [
      'A government raises tariffs to cut spending on imports',
      'Import spending falls and the deficit narrows at first',
      'Trading partners raise their own tariffs in response',
      'Export earnings fall and the deficit reopens',
    ] },
  ],
  evaluation: [
    { title: 'Is a trading bloc a step towards free trade or away from it?',
      content: 'Towards: barriers between members genuinely fall, and a bloc can negotiate with outsiders from a stronger position than any member alone. Away: the whole mechanism is discrimination, which is what most-favoured nation forbids, and diversion can raise a member\'s real costs. The honest answer depends on whether creation exceeds diversion, which is an empirical question about the specific bloc.' },
    { title: 'Which tool should a government choose to protect an industry?',
      content: `For a given amount of protection the subsidy destroys least — ${money(S.deadweight)} against the tariff's ${money(T.deadweight)} — because consumers never face a distorted price. But it has to be voted for and appears in the budget, while a tariff hides its cost in prices and raises ${money(T.c)} instead of spending it. Quotas are worst of the three where licences go to foreign exporters, because the ${money(Q.rent)} then leaves the country.` },
    { title: 'When is protecting an industry defensible?',
      content: 'The conditions matter more than the verdict. Infant industry protection works where there are genuine scale economies to reach and a credible, dated end point. National security protection is an insurance argument, so the test is whether a stockpile or diversified suppliers would buy the same cover more cheaply. Anti-dumping duties are defensible in principle and are the most misused instrument in practice.' },
  ],
};

/** Notes topics for the Notes tab, replacing the two 39a carried. */
export const NOTES_NEW = [
  { title: 'The WTO and Trade Liberalisation', content: `The WTO enforces promises its members made to each other. A **binding** is a ceiling a member agreed not to exceed. **Most-favoured nation** requires a concession given to one member to be given to all; **national treatment** requires an import to be treated no worse than a domestic good once it is inside. **Dispute settlement** makes both enforceable, though its appeal stage has been inactive since members stopped agreeing appointments. Multilateral rounds stalled because consensus among a large and unlike membership became unreachable, which is why bilateral deals and regional blocs grew.` },
  { title: 'Types of Trading Bloc', content: LADDER.map(([name, adds], i) => `**${i + 1}. ${name.replace(/^./, (ch) => ch.toUpperCase())}** — ${adds}`).join('\n\n') + `\n\nEconomic and monetary union is ONE rung in this specification, not two. Each rung removes a restriction and a policy instrument at the same time.` },
  { title: 'Trade Creation and Trade Diversion', content: `**Trade creation** shifts production from a higher-cost source to a lower-cost one: home ${money(B.sources.home)} to partner ${money(B.sources.partner)}, a real saving of ${money(B.creation.realSaving)}. **Trade diversion** shifts supply from the cheapest producer to a dearer member because the member pays no tariff: the price paid falls from ${money(B.diversion.before.pricePaid)} to ${money(B.diversion.after.pricePaid)} while the resources given up rise from ${money(B.sources.outside)} to ${money(B.sources.partner)}. Tariff paid to your own government is a transfer, not a resource cost — that is the whole trap.` },
  { title: 'Protectionism', content: `**Reasons** (5a): infant and geriatric industries, domestic industries and employment, national security, preventing dumping, correcting a current-account deficit, and raising revenue. **Tools** (5b): tariffs, quotas, non-tariff barriers, subsidies to domestic producers.\n\nA ${money(T.tariff)} tariff on a ${money(T.worldPrice)} world price: consumers lose ${money(T.consumerLoss)}, producers gain ${money(T.a)} (area a), the government raises ${money(T.c)} (area c), and ${money(T.deadweight)} is welfare loss (areas b and d, ${money(T.b)} each). A quota at ${units(Q.limit)} gives the same price and turns the ${money(Q.rent)} into rent. A ${money(S.perUnit)} subsidy leaves consumers at the world price, so it loses only ${money(S.deadweight)}.` },
  { title: 'Who Protection Lands On', content: `**Consumers** carry the whole price rise. **Producers** gain on existing output as well as new output, which is why protection is reliably lobbied for. **Governments** raise revenue from a tariff, nothing from a quota, and spend on a subsidy. **Living standards** fall through price, choice and the quality competition would have forced. **Equality** worsens where the protected good is a necessity, because a tariff takes a larger share of a smaller income — and rich-country protection falls hardest on the agricultural and textile exports poorer countries most depend on.` },
];
