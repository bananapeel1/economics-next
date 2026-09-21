/**
 * PACKET 39a — trade-global-economy, Learn Mode content and Notes.
 *
 * IAL Economics Unit 4 (WEC14), topic 4.3.2, `audit/raw/econ_spec.txt:1626-1699`. This packet builds
 * sub-topics 1, 2 and 3 — nineteen leaves — as FOUR blocks and TWENTY-THREE subsections, one idea
 * each, in the specification's own order. Sub-topics 4 and 5 are packet 39b's, and the live
 * "Protectionism and the WTO" block is carried forward unchanged as the fifth block until then.
 *
 * ════ FOUR BLOCKS AND TWENTY-THREE SUBSECTIONS, AGAINST TWO AND FOUR LIVE ════
 *
 * The live section is "The Case for Free Trade" and "Protectionism and the WTO": two blocks, four
 * subsections, two Learn Mode steps for a topic that carries a 20-mark essay, and half the quiz
 * bank tests material that appears nowhere in `content[]`. That is `structure-01`, `structure-02`,
 * `specGap-01` and `specGap-04` in one sentence. Specification order holds end to end here, which
 * fixes them at the root rather than patching them.
 *
 * Sub-topic 3 splits into two blocks because 3a-3b and 3c are different questions — what the terms
 * of trade ARE and what MOVES them, then what a movement DOES. The specification lists them
 * separately and a student who can calculate an index cannot necessarily say why an improvement
 * hurt. Five blocks in the staged section plus a three-question pre-test is 8 against
 * `FREE_QUIZ_MAX` 10.
 *
 * ════ EVERY RECALL APPLIES THE IDEA TO FIGURES OR A CASE THAT IS NOT ON THE STEP ════
 *
 * `trade-global-economy` has NO row in `audit/recall-census-baseline.json`, and `npm run recalls`
 * holds a section with no row to ZERO answer-recoverable recalls. So no fill-in here is the key
 * idea minus a word: each one hands the student figures the step has not printed and asks them to
 * do the division. The arithmetic spine in `_packet39-util.mjs` is what makes that possible.
 *
 * ════ NO FLOW BODY UNDER A REORDER ════
 *
 * `lib/learn-steps.js:10` renders a recall BELOW its teaching on the same step, so a reorder built
 * from a flow box on that step has its answer printed above it — packet 26's finding, and packet
 * 34's rule. Every reorder here is sourced from an extras chain, which lives in another tab, which
 * is what `reorder.source` asks for and `recall.recoverable` cannot see.
 *
 * ════ THE LADDER IS NOT HERE ════
 *
 * Trade creation, trade diversion, customs unions, common markets and monetary unions are 4.3.2 · 4
 * and they are packet 39b's. This section owns them — packets 33 and 34 each removed them from a
 * section that did not — but owning them is not the same as building them in the half of the packet
 * that stops at sub-topic 3. `LADDER_TERMS` is banned across everything this packet authors.
 */
import {
  subId, SECTION, hash8, bn, qty, pct, idx, round1,
  MERIDA, KALTO, KALTO_LATER, TRADE, SAROVA, CURRENCY, SHARES,
} from './_packet39-util.mjs';

const blockId = (title) => `${SECTION}:block:${hash8(title)}`;

/*
 * The validator reads a why line off each match PAIR and each classify GROUP
 * (`lib/content-validator.mjs:458, :478`), while a reorder carries one array for the whole recall.
 * Authoring keeps the single `why` array in every case and it is distributed here.
 */
const recall = (sid, r) => {
  const out = { id: `${sid}:recall`, ...r };
  if (r.type === 'match' && Array.isArray(r.why)) { out.pairs = r.pairs.map((x, i) => ({ ...x, why: r.why[i] })); delete out.why; }
  if (r.type === 'classify' && Array.isArray(r.why)) { out.groups = r.groups.map((x, i) => ({ ...x, why: r.why[i] })); delete out.why; }
  return out;
};

const A = MERIDA, B = KALTO, T = TRADE, S = SAROVA, C = CURRENCY, H = SHARES;

export const B1 = 'Specialisation and Comparative Advantage';
export const B2 = 'Patterns and Volume of World Trade';
export const B3 = 'The Terms of Trade, and What Moves Them';
export const B4 = 'When the Terms of Trade Change';

/* ══ Block 1 — Specialisation and comparative advantage (4.3.2 · 1) ═══════ */

const whyCountriesSpecialise = (() => {
  const sid = subId('why-countries-specialise');
  return {
    id: sid,
    title: 'Why Countries Specialise',
    keyIdea: 'A country specialises when it concentrates its resources on some goods and buys the rest. The specification asks for the benefits AND the costs of doing so.',
    body: [
      { type: 'paragraph', text: `Specialisation inside an economy is familiar: one person farms, another teaches, and neither tries to do both badly. **International** specialisation is the same idea one level up — a country puts its resources into a narrower range of goods than it consumes, and trades for the difference.` },
      { type: 'paragraph', text: `The benefits follow from concentration. Output per worker rises where resources are most productive; longer production runs bring **economies of scale**; and a wider choice reaches consumers at lower prices than a country making everything itself could manage.` },
      { type: 'paragraph', text: `The costs are the other half of the leaf and students routinely omit them. A specialised economy is **exposed**: if world demand for its one export falls, there is nothing to fall back on. Industries that cannot survive foreign competition close, and their workers are not instantly employable elsewhere. Depending on imports for food, fuel or medicine is a strategic risk as well as an economic one.` },
      { type: 'paragraph', text: `So the answer to "should a country specialise?" is never simply yes. It weighs gains that are usually measurable against risks that are usually not — and the rest of this chapter measures the gains precisely enough for that comparison to be worth making.` },
    ],
    realExample: { emoji: '🌾', text: `An economy that moves most of its farmland into one export crop earns more per hectare in a normal year, and has no second crop to sell in the year the price of the first one halves.` },
    misconception: `Students treat "the benefits and costs of specialisation" as a question about whether trade is good. It is not. It is a question about **concentration** — what a country gains by narrowing what it makes, and what it gives up in security and flexibility by doing so.`,
    examMatters: `Appendix 6 defines Examine as requiring knowledge, understanding, application and analysis — the reasoning chain, drawn out. An answer that lists three benefits and stops has not examined anything; the costs are in the specification for a reason.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: `An island economy is deciding whether to move three-quarters of its resources into fishing. Sort each consequence by which half of the leaf it belongs to:`,
      groups: [
        { name: 'A benefit of specialising', items: ['Boats run at full capacity all year instead of half of it', 'Buying freezer plant becomes worth it at the larger catch', 'Crews become faster at one job than they were at four'] },
        { name: 'A cost of specialising', items: ['A closed shipyard cannot reopen quickly when fish prices fall', 'All the wheat now has to be bought from somewhere else'] },
      ],
      why: [
        'Each is output rising from concentration — capacity used, scale reached, skill deepened. That is what the benefit side of 1a means.',
        'Each is the exposure that concentration creates: one lost industry that is slow to rebuild, and a necessity that now depends on somebody else selling it.',
      ],
    }),
  };
})();

const absoluteAndComparative = (() => {
  const sid = subId('absolute-and-comparative-advantage');
  return {
    id: sid,
    title: 'Absolute and Comparative Advantage',
    keyIdea: `Absolute advantage is how MUCH a country can make. Comparative advantage is what it GIVES UP to make it. ${A.name} out-produces ${B.name} in both goods and still gains by trading.`,
    body: [
      { type: 'paragraph', text: `A country has an **absolute advantage** in a good when it can produce more of it from the same resources than another country can. A country has a **comparative advantage** when it produces that good at a lower **opportunity cost** — when making one more unit of it costs less of the other good.` },
      { type: 'paragraph', text: `The distinction only matters because one country can be better at everything. With all its resources ${A.name} can make ${qty(A.grainMax)} grain **or** ${qty(A.clothMax)} cloth; ${B.name} can make ${qty(B.grainMax)} grain **or** ${qty(B.clothMax)} cloth. ${A.name} beats ${B.name} at both, so on absolute advantage alone it has no reason to trade at all.` },
      { type: 'paragraph', text: `Now ask what each gives up. For ${A.name}, ${qty(A.grainMax)} grain and ${qty(A.clothMax)} cloth use the same resources, so one cloth costs ${qty(A.costOfCloth)} grain. For ${B.name} one cloth costs ${qty(B.costOfCloth)} grain. Cloth is **cheaper** for ${B.name} to make, measured in the grain given up.` },
      { type: 'paragraph', text: `Turn it round for grain: one grain costs ${A.name} ${qty(A.costOfGrain)} cloth and costs ${B.name} ${qty(B.costOfGrain)} cloth. So ${T.grainSpecialist.name} has the comparative advantage in grain and ${T.clothSpecialist.name} has it in cloth — and that is true even though ${A.name} is better at both in absolute terms.` },
    ],
    realExample: { emoji: '⚖️', text: `A surgeon who types faster than any secretary still hires one, because the hour spent typing is an hour not spent operating. The absolute advantage is real and irrelevant; the opportunity cost decides.` },
    misconception: `Students say a country has a comparative advantage in a good because it is "better at making it" or because its costs are lower. Those are absolute statements. Comparative advantage is a ratio **between two goods inside one country**, and it can only be found by comparing those ratios across countries.`,
    examMatters: `Appendix 6 defines Define as knowledge and understanding only — the meaning of a term — for 2 marks. A definition of comparative advantage that does not contain the words "opportunity cost" has defined absolute advantage instead.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `Two other economies. Orvale can make 90 tonnes of steel or 45 machines. Petra can make 20 tonnes of steel or 20 machines. Work each ratio out before answering:`,
      template: [
        `One machine costs Orvale ___ tonnes of steel`,
        `One machine costs Petra ___ tonnes of steel`,
        `So the comparative advantage in machines belongs to the ___ economy`,
        `And Orvale's absolute advantage in machines is therefore ___`,
      ],
      answers: ['2', '1', 'smaller', 'irrelevant'],
      hints: ['steel forgone divided by machines gained, for the larger economy', 'the same division for the other one', 'which of the two gives up less steel per machine', 'what an absolute advantage decides once the ratios differ'],
      distractors: ['0.5', 'larger', 'decisive'],
    }),
  };
})();

const workingItOut = (() => {
  const sid = subId('working-out-who-should-specialise');
  return {
    id: sid,
    title: 'Working Out the Gain',
    keyIdea: `Specialisation is worth it when total output rises. Here it rises by ${qty(T.gain.grain)} grain with cloth unchanged — one number moves, so there is nothing to trade off.`,
    body: [
      { type: 'paragraph', text: `Start from no trade, with each country splitting its resources evenly. ${A.name} makes ${qty(A.autarky.grain)} grain and ${qty(A.autarky.cloth)} cloth; ${B.name} makes ${qty(B.autarky.grain)} and ${qty(B.autarky.cloth)}. Between them: **${qty(T.noTrade.grain)} grain and ${qty(T.noTrade.cloth)} cloth**.` },
      { type: 'paragraph', text: `Now let each move towards the good it gives up least to make. ${B.name} goes fully into cloth: ${qty(T.kaltoCloth)} cloth, no grain. ${A.name} makes the ${qty(T.meridaCloth)} cloth the world would otherwise be short of and puts everything else into grain, which is ${qty(T.meridaGrain)}. Between them: **${qty(T.withTrade.grain)} grain and ${qty(T.withTrade.cloth)} cloth**.` },
      { type: 'paragraph', text: `Cloth is **identical**. Grain is ${qty(T.gain.grain)} higher. The same resources, arranged differently, produced more — and because only one of the two numbers moved, no judgement is needed about whether the gain was worth the loss. There is no loss.` },
      { type: 'paragraph', text: `Splitting it needs a rate between the goods, and it has to sit between the two domestic costs: above ${qty(T.rateLow)} grain per cloth or ${B.name} makes its own grain, below ${qty(T.rateHigh)} or ${A.name} does. At ${qty(T.rate)}, ${B.name} ships ${qty(T.clothTraded)} cloth for ${qty(T.grainTraded)} grain. ${A.name} ends with ${qty(T.after.merida.grain)} grain and ${qty(T.after.merida.cloth)} cloth, ${B.name} with ${qty(T.after.kalto.grain)} and ${qty(T.after.kalto.cloth)}: each ${qty(T.meridaGains.grain)} grain better off, neither worse off in cloth.` },
    ],
    realExample: { emoji: '🧮', text: `Two workshops that both make frames and wheels, each doing half of both, produce fewer of one and the same of the other as when each concentrates — the gain is in the arrangement, not in working harder.` },
    misconception: `Students specialise **completely** and then report that one good went up and the other went down, which proves nothing either way. Complete specialisation here gives ${qty(A.grainMax)} grain and ${qty(B.clothMax)} cloth — more grain and **less** cloth than without trade. Holding one good constant is what makes the gain visible.`,
    examMatters: `Appendix 6 defines Calculate as a quantitative task of several stages based on given data, and advises showing workings. The stages here are output before, output after, and the difference — an answer that states the difference without the two totals has skipped the evidence.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `Two different countries. Without trade, Ardenne makes 24 tonnes of coffee and 16 of cocoa; Belmar makes 6 coffee and 24 cocoa. After specialising they make 48 coffee and 40 cocoa between them:`,
      template: [
        `Total coffee without trade is ___ tonnes`,
        `Total cocoa without trade is ___ tonnes`,
        `So the gain from specialising is ___ tonnes of coffee and ___ of cocoa`,
      ],
      answers: ['30', '40', '18', '0'],
      hints: ['add the two coffee figures', 'add the two cocoa figures', 'after minus before, for the good that moved', 'after minus before, for the good that did not'],
      distractors: ['48', '22', '8'],
    }),
  };
})();

const assumptions = (() => {
  const sid = subId('the-assumptions-behind-the-theory');
  return {
    id: sid,
    title: 'The Assumptions Behind It',
    keyIdea: 'The gain was produced by a model, and the model was told what to believe. The specification asks for the assumptions because naming them is what makes the limitations possible.',
    body: [
      { type: 'paragraph', text: `The arithmetic on the last step is arithmetic, so it cannot be wrong. What can be wrong is whether the world it describes is the world we are in. Four assumptions did the work.` },
      { type: 'bullets', items: [
        `**Costs do not change with scale.** Each extra unit of grain cost ${A.name} the same ${qty(A.costOfGrain)} cloth as the first one. That is why the ratio could be treated as a single number.`,
        `**Resources move freely between industries.** A worker leaving cloth walks into grain the same day, with no retraining and no lost output in between.`,
        `**There are no transport costs and no barriers.** The ${qty(T.clothTraded)} cloth arrives in ${A.name} at no cost, so the whole gain survives the journey.`,
        `**Only two countries and two goods exist**, and the resources inside each are fully employed.`,
      ] },
      { type: 'paragraph', text: `None of these is written down as a trick. Each is a simplification that makes the mechanism visible, and each can be relaxed one at a time — which is exactly what an evaluation question is asking you to do.` },
    ],
    realExample: { emoji: '📦', text: `Shipping a heavy, low-value good halfway round the world can cost more than the difference in production costs the trade was meant to exploit. The model says trade; the freight bill says otherwise.` },
    misconception: `Students write that the assumptions "make the theory unrealistic", as though that settled it. A model is meant to be simpler than the world. The question is whether relaxing a particular assumption **changes the conclusion**, and for some of these it does not.`,
    examMatters: `Appendix 6 defines Evaluate as requiring a judgement supported by the reasoning. Naming an assumption earns nothing on its own; saying what follows if it fails is the analysis the marks are for.`,
    recall: recall(sid, {
      type: 'match',
      prompt: `Match each thing that happens in a real economy to the assumption it breaks:`,
      pairs: [
        { left: 'Each extra tonne of ore comes from a poorer seam than the last', right: 'Constant opportunity costs' },
        { left: 'A shipyard welder cannot start work in a pharmaceutical plant', right: 'Perfect factor mobility' },
        { left: 'A refrigerated container costs more than the price gap it exploits', right: 'Zero transport costs' },
        { left: 'A third country undercuts both producers next year', right: 'Only two countries and two goods' },
      ],
      why: [
        'Rising cost per extra unit means the opportunity cost is not one number, so the ratio that decided the specialisation changes as the country specialises.',
        'The gain assumed resources released by one industry arrive in the other; when they cannot, the released resources are unemployed instead.',
        'The model let the goods move for nothing, so the whole calculated gain was available to split. Freight comes out of that gain first.',
        'Two countries and two goods is what made one pair of ratios decisive; more of either means the comparison has to be made again.',
      ],
    }),
  };
})();

const limitations = (() => {
  const sid = subId('the-limitations-of-the-theory');
  return {
    id: sid,
    title: 'The Limitations of the Theory',
    keyIdea: 'Relaxing the assumptions does not destroy the theory. It tells you where the predicted gain shrinks, where it may not appear at all, and why a country might refuse it anyway.',
    body: [
      { type: 'paragraph', text: `**Costs rise as a country specialises.** Move resources into grain and the least suitable land is used last, so the opportunity cost climbs as ${A.name} specialises. That is why countries specialise **partially** and not completely — the advantage runs out before the resources do.` },
      { type: 'paragraph', text: `**Advantage is made, not found.** A country that invests in skills, infrastructure and research changes what it is good at. A ratio measured today is not a permanent property of a country, which is the point sub-topic 2 builds on.` },
      { type: 'paragraph', text: `**The gain has to survive being moved.** Transport, insurance and delay come out of the gain before anyone shares it, and for heavy or perishable goods they can exhaust it.` },
      { type: 'paragraph', text: `**The gain is a total, not a distribution.** The ${qty(T.gain.grain)} grain was split evenly here by choice of exchange rate. A rate near one country's own cost gives almost all of it to the other. And the workers in the industry that closes bear a cost that the total does not show — which is where the political argument starts, and why sub-topic 5 exists.` },
    ],
    realExample: { emoji: '🏭', text: `An economy that has specialised in one manufactured export for a generation finds its advantage eroded by a country that deliberately built the same capability — the ratios moved because somebody moved them.` },
    misconception: `Students conclude that because the theory has limitations, free trade "does not work". The limitations say the gain is smaller, slower and less evenly shared than the model suggests. Every one of them still leaves a gain to argue about.`,
    examMatters: `Appendix 6 defines Evaluate as requiring a supported judgement, and the 20-mark items are where this material earns most. A limitation used as a counterweight — how much smaller, for whom, under what conditions — is worth more than a list of four.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `An economy gains 12 tonnes of output by specialising. Freight and insurance take 5 tonnes, and the trading partner's bargaining power secures three-quarters of what is left:`,
      template: [
        `The gain left after transport is ___ tonnes`,
        `This economy keeps ___ tonnes of it`,
        `So the theory's prediction was right about the ___ and silent about the ___`,
      ],
      answers: ['7', '1.75', 'total', 'split'],
      hints: ['subtract the freight from the gain', 'a quarter of what survived the freight', 'what the model actually calculates', 'what the exchange rate, not the model, decides'],
      distractors: ['12', '5.25', 'direction'],
    }),
  };
})();

/* ══ Block 2 — Patterns and volume of world trade (4.3.2 · 2) ═════════════ */

const whatAPatternIs = (() => {
  const sid = subId('what-a-pattern-of-trade-is');
  return {
    id: sid,
    title: 'What a Pattern of Trade Is',
    keyIdea: 'A pattern of trade is who trades what with whom, and in what proportions. The specification names five factors that change it, and this chapter takes them one at a time.',
    body: [
      { type: 'paragraph', text: `The last chapter explained why trade happens at all. This one is about its **shape**: which countries export which goods, and to whom. That shape is not fixed, and the specification is interested in the changes rather than in the snapshot.` },
      { type: 'paragraph', text: `Two measurements are worth keeping apart. **Volume** is how much is traded. **Pattern** is how it is distributed — between goods, and between partners. A country's trade can grow while its pattern shifts underneath, and the two facts answer different questions.` },
      { type: 'paragraph', text: `The five factors the specification lists are the growth of emerging economies, changes in comparative advantage, the growth of trading blocs and bilateral trading agreements, changes in relative exchange rates, and changes in protectionism between countries. Each has a subsection here.` },
      { type: 'paragraph', text: `Notice what they have in common: none is an accident. Each is either a country becoming good at something new, or a government changing the terms on which goods cross a border. Patterns of trade move because somebody changed something.` },
    ],
    realExample: { emoji: '🗺️', text: `An economy whose exports went overwhelmingly to its nearest neighbour twenty years ago, and now sends more than half of them to the other side of the world, has the same volume story and a different pattern story.` },
    misconception: `Students answer a "patterns of trade" question by describing how much world trade has grown. Growth is the volume. The pattern question asks what the composition is, and which direction it moved.`,
    examMatters: `Appendix 6 defines Analyse as requiring a reasoning chain built on knowledge, understanding and application. Naming a factor is the first link; what it does to which flow, in which direction, is the rest of it.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: `An economy's trade statistics change over a decade. Sort each fact by what it measures:`,
      groups: [
        { name: 'Volume', items: ['Total exports rose by a third', 'Imports and exports together are worth more than they were'] },
        { name: 'Pattern', items: ['Machinery overtook minerals as the largest export', 'The share going to neighbouring countries fell by half', 'Two new partners now take a fifth of all exports'] },
      ],
      why: [
        'Both are statements about how much, with no information about composition — a country could double its trade and export exactly the same mix to exactly the same partners.',
        'Each is about composition: which goods, and which partners. That is the distribution the word pattern refers to.',
      ],
    }),
  };
})();

const emergingEconomies = (() => {
  const sid = subId('emerging-economies');
  return {
    id: sid,
    title: 'The Impact of Emerging Economies',
    keyIdea: `Emerging economies are the largest single change in the pattern of world trade: ${pct(H.emergingThen)} of world exports ${H.years} years ago, ${pct(H.emergingNow)} now.`,
    body: [
      { type: 'paragraph', text: `An **emerging economy** is one growing quickly from a low starting point, industrialising, and taking a rising share of world output and trade. The specification names them first among the factors because the size of the change is not in dispute.` },
      { type: 'paragraph', text: `Put numbers on it. If emerging economies took ${pct(H.emergingThen)} of world exports ${H.years} years ago and take ${pct(H.emergingNow)} now, the advanced economies' share went from ${pct(H.advancedThen)} to ${pct(H.advancedNow)}. Shares add to ${pct(100)}: one side's gain of ${pct(H.emergingGain)} points is the other's loss of the same ${pct(H.emergingGain)}.` },
      { type: 'paragraph', text: `The effect on the pattern works through costs and capability together. Low labour costs bring labour-intensive manufacturing first; investment and education then move the same countries into goods that need skills and capital. So the flow changes twice — once when the industry arrives, again when it moves up.` },
      { type: 'paragraph', text: `And they change trade for everyone else as buyers, not only as sellers. A country of rising incomes imports more of everything, which is why the exporters of the goods it no longer makes can still find their exports to it rising.` },
    ],
    realExample: { emoji: '🏗️', text: `An economy that began by exporting clothing and now exports components for the machines that make clothing has moved along the same path twice, and changed two different countries' export mixes doing it.` },
    misconception: `Students treat a falling share as a falling amount. A share falling from ${pct(H.advancedThen)} to ${pct(H.advancedNow)} while world trade doubles leaves an advanced economy exporting **more** than before. A share is a proportion of a moving total.`,
    examMatters: `Appendix 6 defines Explain as needing knowledge, understanding and application, with a two-stage chain for a reason or an impact. "Emerging economies have grown" is a fact; the mark is for what that growth did to a particular flow.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `World exports were ${bn(800)} and are now ${bn(2000)}. One advanced economy's share fell from ${pct(15)} to ${pct(9)}:`,
      template: [
        `Its exports then were worth ___`,
        `Its exports now are worth ___`,
        `So its share fell and its exports ___`,
      ],
      answers: [bn(120), bn(180), 'rose'],
      hints: ['the old share of the old total', 'the new share of the new total', 'compare the two values, not the two shares'],
      distractors: [bn(300), bn(72), 'fell'],
    }),
  };
})();

const changesInComparativeAdvantage = (() => {
  const sid = subId('changes-in-comparative-advantage');
  return {
    id: sid,
    title: 'Changes in Comparative Advantage',
    keyIdea: `Comparative advantage is a ratio, and ratios move. Double ${B.name}'s grain productivity and its cost of cloth becomes ${qty(KALTO_LATER.costOfCloth)} grain, the same as ${A.name}'s.`,
    body: [
      { type: 'paragraph', text: `Chapter 1 measured the two countries once. Nothing in the theory says the measurement holds. Investment, education, new technology and newly discovered resources all change how much a country gives up to make something.` },
      { type: 'paragraph', text: `Work the case through. ${B.name} could make ${qty(B.grainMax)} grain or ${qty(B.clothMax)} cloth, so cloth cost it ${qty(B.costOfCloth)} grain. Suppose its grain productivity doubles: ${qty(KALTO_LATER.grainMax)} grain or the same ${qty(KALTO_LATER.clothMax)} cloth. Cloth now costs it ${qty(KALTO_LATER.costOfCloth)} grain — **exactly what it costs ${A.name}**.` },
      { type: 'paragraph', text: `When two countries have the same opportunity costs, neither has a comparative advantage in anything and there is no gain left to divide. The trade that the first chapter justified has no basis any more, and it would stop — not because of a tariff, but because the arithmetic that supported it changed.` },
      { type: 'paragraph', text: `Push the productivity further and the ratios cross: ${B.name} becomes the low-cost grain producer and the direction of trade **reverses**. This is why a pattern of trade is a moving thing, and why a country whose advantage was built can lose it to a country that builds one too.` },
    ],
    realExample: { emoji: '🔬', text: `A country that spends two decades training engineers and laying fibre changes what it gives up to produce software, and takes a share of an export market from an economy that had it uncontested.` },
    misconception: `Students think a country loses its comparative advantage by getting **worse**. It usually loses it by others getting better, or by its own success: rising wages in a country that industrialised first are what move labour-intensive production on to the next one.`,
    examMatters: `Appendix 6 defines Analyse as requiring a developed chain of reasoning. Here the chain has a numerical link in it — what moved, what that did to the ratio, and which direction the flow then took.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `Orvale can make 60 tyres or 30 pumps; Petra can make 20 tyres or 20 pumps. Petra then triples its tyre capacity to 60:`,
      template: [
        `Before the change, one pump cost Petra ___ tyres`,
        `After the change, one pump costs Petra ___ tyres`,
        `Before, the comparative advantage in pumps belonged to the ___ economy`,
        `After, it belongs to the ___ one`,
      ],
      answers: ['1', '3', 'smaller', 'larger'],
      hints: ['tyres forgone per pump, on the original figures', 'the same division on the new tyre capacity', 'which economy gave up fewer tyres per pump at the start', 'and which gives up fewer now'],
      distractors: ['2', '0.5', 'neither'],
    }),
  };
})();

const blocsAndBilateral = (() => {
  const sid = subId('trading-blocs-and-bilateral-agreements');
  return {
    id: sid,
    title: 'Trading Blocs and Bilateral Agreements',
    keyIdea: 'Agreements between countries redirect trade towards the members and away from everyone else. As a factor influencing patterns of trade, that redirection is the whole point.',
    body: [
      { type: 'paragraph', text: `A **trading bloc** is a group of countries that agree to trade with each other on easier terms than they offer outsiders. A **bilateral trading agreement** is the same idea between two countries. The specification names their growth as one of the five factors shaping patterns of trade.` },
      { type: 'paragraph', text: `The mechanism is simple enough to state precisely. Inside the agreement, barriers come down, so goods from a member become cheaper relative to goods from a non-member. Buyers switch. The **direction** of trade changes even where the total does not, which is exactly what a change in pattern means.` },
      { type: 'paragraph', text: `The size of the effect depends on who is in. An agreement between economies that already traded heavily changes little; one that includes a large market a country had been shut out of can change that country's export map within a few years.` },
      { type: 'paragraph', text: `What these agreements are, how they are ranked, and whether the switching they cause is a gain or a loss overall, are questions for the chapter on trade liberalisation. Here they are one of five reasons a pattern moves.` },
    ],
    realExample: { emoji: '🤝', text: `Two economies sign an agreement removing barriers on farm goods. Within three years each buys produce from the other that it previously bought from a cheaper supplier outside the agreement.` },
    misconception: `Students describe an agreement as "increasing trade", full stop. Some of what looks like new trade is trade **moved** from a non-member who was already supplying it. Distinguishing the two is what the later chapter is for; noticing that both happen is what this one needs.`,
    examMatters: `Appendix 6 defines Explain as a two-stage chain for a reason or an impact. The two stages here are the change in relative prices caused by the agreement, and the switch in purchases that follows.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: `Four countries sign an agreement removing barriers among themselves. Sort each outcome by whether it is a change in the pattern of trade or only in its volume:`,
      groups: [
        { name: 'A change in pattern', items: ['A member now buys its steel from another member instead of an outsider', 'An outside supplier loses a market it had held for years'] },
        { name: 'A change in volume only', items: ['Every member trades more than before, in the same proportions with the same partners', 'Total trade among the four rises in line with their incomes'] },
      ],
      why: [
        'In each case the composition of trade moved — a partner was replaced. That redirection is what makes an agreement a factor influencing patterns.',
        'Both describe the same map with bigger numbers on it: nobody was replaced and no proportion changed.',
      ],
    }),
  };
})();

const relativeExchangeRates = (() => {
  const sid = subId('relative-exchange-rates');
  return {
    id: sid,
    title: 'Changes in Relative Exchange Rates',
    keyIdea: `An exchange rate is the price of one currency in another, and it changes both prices in a trade at once. A fall of ${pct(C.fallPct)} takes an export priced ${qty(C.homePrice)} at home from ${qty(C.exportAbroadBefore)} to ${qty(C.exportAbroadAfter)} abroad.`,
    body: [
      { type: 'paragraph', text: `Nothing about how a good is made has to change for its price abroad to change. If the currency buys less foreign money, foreign buyers pay less for the same good, and domestic buyers pay more for the same import.` },
      { type: 'paragraph', text: `Work both halves. Suppose the rate falls from ${qty(C.before)} foreign units per domestic unit to ${qty(C.after)}. A good priced at ${qty(C.homePrice)} at home used to cost foreign buyers ${qty(C.exportAbroadBefore)}; now it costs ${qty(C.exportAbroadAfter)}. An import priced at ${qty(C.foreignPrice)} abroad used to cost ${qty(C.importAtHomeBefore)} at home; now it costs ${qty(C.importAtHomeAfter)}.` },
      { type: 'paragraph', text: `So exports become more competitive and imports less so, and the pattern of trade shifts towards the goods of whichever country's currency fell. The word the specification uses is **relative**, and it matters: what moves trade is one currency against another, not either one on its own.` },
      { type: 'paragraph', text: `The shift is not guaranteed to be large. It depends on how responsive buyers are to price, on how much of the import is a necessity, and on whether the change is expected to last. A movement believed to be temporary changes very little.` },
    ],
    realExample: { emoji: '💱', text: `An exporter that has not changed a price, a process or a product in five years finds its order book full in one year and thin in the next, because the currency moved in between.` },
    misconception: `Students say a weaker currency is "bad for the economy". It is bad for buyers of imports and good for sellers of exports at the same time. Which effect dominates is a question about elasticities, not a fact about the direction of the rate.`,
    examMatters: `Appendix 6 defines Calculate as a several-stage quantitative task from given data. Converting a price at two rates is two divisions, and both belong in the answer.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `A currency rises from 4.0 foreign units per domestic unit to 5.0. An export is priced 60 at home; an import is priced 400 abroad:`,
      template: [
        `The export cost foreign buyers ___ and now costs ___`,
        `The import cost ___ at home and now costs ___`,
        `So exports became ___ competitive`,
      ],
      answers: ['240', '300', '100', '80', 'less'],
      hints: ['home price times the old rate', 'home price times the new rate', 'foreign price divided by the old rate', 'foreign price divided by the new rate', 'what a higher price abroad does to demand for exports'],
      distractors: ['15', '2000', 'more'],
    }),
  };
})();

const changesInProtectionism = (() => {
  const sid = subId('changes-in-protectionism');
  return {
    id: sid,
    title: 'Changes in Protectionism',
    keyIdea: 'Protectionism is government action that makes foreign goods harder or dearer to buy. A change in it redirects trade: towards home producers, or towards a third country.',
    body: [
      { type: 'paragraph', text: `When a government raises a barrier against imports of a good, buyers face a higher price for the foreign version and some of them switch to the domestic one. When it lowers a barrier, the switch runs the other way. Either way the pattern moves, which is why the specification lists it among the five factors.` },
      { type: 'paragraph', text: `The second effect is less obvious and more interesting. A barrier aimed at one country's goods does not only send buyers home; it sends some of them to a **third** country that the barrier does not cover. A measure directed at one trading partner can hand the market to another.` },
      { type: 'paragraph', text: `Direction of travel matters for the exam. Barriers have generally fallen over the last fifty years, under agreements between countries and through the institutions that oversee them — which is one of the reasons the volume of world trade grew faster than world output over the same period.` },
      { type: 'paragraph', text: `What the tools are, why governments use them, and who gains and loses from them, are the questions the chapter on restrictions on free trade answers. Here protectionism is a lever that moves the pattern, and the point is which way.` },
    ],
    realExample: { emoji: '🚧', text: `A duty imposed on one country's steel leaves the domestic price higher, the domestic mills busier, and a previously minor exporter in a third country taking most of the imports that remain.` },
    misconception: `Students assume protection against imports means imports fall and domestic production rises, and stop. Some of the fall is real; some is a **reallocation** to suppliers the measure did not name, so total imports can fall far less than the measure's target suggests.`,
    examMatters: `Appendix 6 defines Examine as knowledge, understanding, application and analysis together. An examination of a trade barrier that never reaches the third country has examined half the effect.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: `A government puts a duty on imported tiles from one country only. Sort each result by the direction it moved the pattern of trade:`,
      groups: [
        { name: 'Trade moved home', items: ['Domestic tile makers raise output to meet orders they used to lose', 'A buyer who imported everything now sources half at home'] },
        { name: 'Trade moved to a third country', items: ['A neighbouring exporter not covered by the duty doubles its shipments', 'Imports fall by far less than the duty was expected to remove'] },
      ],
      why: [
        'Both are the intended effect: the foreign good is dearer, so buyers switch to the domestic one and home production rises.',
        'Both are the unintended one. The duty named a country, not a good, so demand moved to the nearest uncovered supplier rather than home.',
      ],
    }),
  };
})();

const changesInTradeFlows = (() => {
  const sid = subId('changes-in-trade-flows');
  return {
    id: sid,
    title: 'Changes in Trade Flows',
    keyIdea: `A flow can fall in share and rise in value, or the reverse. ${H.name}'s ore went from ${pct(H.oreThen)} of exports to ${pct(H.oreNow)} — and in money from ${bn(H.oreValueThen)} to ${bn(H.oreValueNow)}.`,
    body: [
      { type: 'paragraph', text: `The specification's second sub-topic asks for changes in trade flows **and the reasons for them**. A flow is trade between two places, or in one good: the value, the direction, and what it is made of.` },
      { type: 'paragraph', text: `Take ${H.name}. Exports have grown from ${bn(H.exportsThen)} to ${bn(H.exportsNow)}. Ore was ${pct(H.oreThen)} of them and is now ${pct(H.oreNow)}; manufactures were ${pct(H.manufacturesThen)} and are now ${pct(H.manufacturesNow)}. In value, ore has gone from ${bn(H.oreValueThen)} to ${bn(H.oreValueNow)} and manufactures from ${bn(H.manufacturesValueThen)} to ${bn(H.manufacturesValueNow)}.` },
      { type: 'paragraph', text: `So ore fell on both measures and manufactures rose on both — but they did not have to. Had exports grown faster, ore's share could have fallen with its value rising. **A share and a value are two different facts**, and a question about a flow is usually about which of them moved.` },
      { type: 'paragraph', text: `The reasons are the factors from this chapter: an advantage that was built, an exchange rate, an agreement, a barrier, a new competitor. Naming the change is description; attaching it to one of those is the analysis the marks are for.` },
    ],
    realExample: { emoji: '📊', text: `An exporter's largest customer takes a smaller share of its goods every year while buying more of them each year, because the exporter's other markets are growing faster still.` },
    misconception: `Students read a falling share as a shrinking trade. Check the total before concluding anything: here ore fell on both measures, but the same ${pct(H.oreNow)} share of a total that had doubled would have been a rise in value.`,
    examMatters: `Appendix 6 defines Calculate as several stages from given data. A share applied to a total is one stage and the comparison is another, and an answer that compares percentages to money has compared two different things.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `Another economy's exports grow from ${bn(40)} to ${bn(100)}. Coffee was ${pct(50)} of them and is now ${pct(25)}:`,
      template: [
        `Coffee exports were worth ___`,
        `Coffee exports are now worth ___`,
        `So the share ___ and the value ___`,
      ],
      answers: [bn(20), bn(25), 'halved', 'rose'],
      hints: ['half of the old total', 'a quarter of the new total', 'compare the two percentages', 'compare the two values'],
      distractors: [bn(50), bn(10), 'fell'],
    }),
  };
})();

/* ══ Block 3 — The terms of trade, and what moves them (4.3.2 · 3a, 3b) ═══ */

const whatTheTermsOfTradeMeasure = (() => {
  const sid = subId('what-the-terms-of-trade-measure');
  return {
    id: sid,
    title: 'What the Terms of Trade Measure',
    keyIdea: 'The terms of trade measure the rate at which a country exchanges its exports for imports. They are a ratio of PRICES, not of quantities, and not of the value of trade.',
    body: [
      { type: 'paragraph', text: `A country sells goods abroad and uses the proceeds to buy goods from abroad. The **terms of trade** answer one question about that arrangement: how much can a given quantity of exports buy?` },
      { type: 'paragraph', text: `The answer is a comparison of two price levels — what the country's exports fetch against what its imports cost. When export prices rise faster than import prices, each unit of exports commands more imports and the terms of trade have **improved**. When import prices rise faster, they have **deteriorated**.` },
      { type: 'paragraph', text: `Two things it is not. It is not a measure of how much a country trades: the terms of trade can improve in a year when trade collapses. And it is not a measure of whether trade is profitable — it is about relative prices only, and the next chapter shows an improvement making a country worse off.` },
      { type: 'paragraph', text: `The words matter in the exam. **Improvement** and **deterioration** describe the direction of the ratio and nothing else. Neither word is a verdict, and treating "improvement" as good news is the single commonest error in this topic.` },
    ],
    realExample: { emoji: '⚖️', text: `An economy exporting one commodity finds that a shipment which paid for a year's fuel imports last year pays for ten months of them this year. Nothing about the shipment changed; the two prices moved apart.` },
    misconception: `Students define the terms of trade as the balance between exports and imports. That is the balance of trade, which is about **values**. The terms of trade are about **prices**, and the two can move in opposite directions in the same year.`,
    examMatters: `Appendix 6 defines Define as knowledge and understanding only, for 2 marks. A definition that says "the relationship between exports and imports" is too loose to earn them; the relationship is between export **prices** and import **prices**.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: `An economy reports five figures for the year. Sort each by whether the terms of trade can be calculated from it:`,
      groups: [
        { name: 'Part of the terms of trade', items: ['The average price of goods sold abroad', 'The average price of goods bought from abroad'] },
        { name: 'Not part of it', items: ['The total value of exports', 'The number of tonnes shipped out', 'The gap between exports and imports'] },
      ],
      why: [
        'Both are price levels, and the terms of trade are one price level divided by the other.',
        'Values, volumes and the trade gap are all quantities of trade. None of them is a price, so none can go into the ratio.',
      ],
    }),
  };
})();

const calculatingTheTermsOfTrade = (() => {
  const sid = subId('calculating-the-terms-of-trade');
  return {
    id: sid,
    title: 'Calculating the Terms of Trade',
    keyIdea: `Divide the export price index by the import price index and multiply by 100. ${S.name}'s ${qty(S.now.exportPrices)} over ${qty(S.now.importPrices)} gives ${idx(S.totNow)} against a base of ${idx(S.totBase)}.`,
    body: [
      { type: 'paragraph', text: `Both prices are measured as **index numbers**: a base year is set to ${qty(100)} and every later year is expressed against it. An export price index of ${qty(120)} means export prices are a fifth higher than in the base year.` },
      { type: 'paragraph', text: `The calculation is one division. Export price index ÷ import price index × ${qty(100)}. In the base year both indices are ${qty(100)}, so the terms of trade are ${idx(S.totBase)} by construction — which is why a base year is chosen at all.` },
      { type: 'paragraph', text: `Now ${S.name}. Export prices have risen to ${qty(S.now.exportPrices)} and import prices to ${qty(S.now.importPrices)}. So the terms of trade are ${qty(S.now.exportPrices)} ÷ ${qty(S.now.importPrices)} × ${qty(100)} = **${idx(S.totNow)}**. Above ${idx(S.totBase)}, so they have improved — by about ${pct(round1(S.totNow - S.totBase))}.` },
      { type: 'paragraph', text: `Read the arithmetic carefully: **both** prices rose. The terms of trade improved because exports rose **faster**, not because imports got cheaper. A country can see every price it faces rise and still record an improvement, and that is the most common misreading of the figure.` },
    ],
    realExample: { emoji: '🧾', text: `A year in which an exporter's prices rise a fifth and its suppliers' prices rise a tenth shows up as an improvement of about nine points, even though every invoice on both sides is larger than the year before.` },
    misconception: `Students see an index above ${qty(100)} and call it "good", or see both indices rising and conclude the terms of trade cannot have improved. The level says where prices stand against the base year; the ratio says which rose faster. Only the ratio is the terms of trade.`,
    examMatters: `Appendix 6 defines Calculate as a quantitative task of several stages based on given data, and advises showing workings. Show the division and the multiplication; an answer of ${idx(S.totNow)} with nothing behind it cannot be given method marks.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `A different economy. In the base year both price indices are 100. Three years later its export price index is 96 and its import price index is 120:`,
      template: [
        `Its terms of trade are now ___`,
        `Compared with the base year they have ___`,
        `And that happened because import prices rose while export prices ___`,
      ],
      answers: ['80', 'deteriorated', 'fell'],
      hints: ['the export index over the import index, times a hundred', 'the direction, given a result below the base', 'what an index of 96 against a base of 100 means'],
      distractors: ['125', 'improved', 'rose'],
    }),
  };
})();

const relativeInflationRates = (() => {
  const sid = subId('relative-inflation-rates');
  return {
    id: sid,
    title: 'Relative Inflation Rates',
    keyIdea: 'If a country\'s prices rise faster than its partners\' prices, its export prices outrun its import prices and its terms of trade improve. The word doing the work is RELATIVE.',
    body: [
      { type: 'paragraph', text: `The first factor the specification lists is the country's inflation rate **against** everyone else's. Domestic inflation raises the price of what the country sells; foreign inflation raises the price of what it buys.` },
      { type: 'paragraph', text: `So higher inflation at home than abroad pushes the export price index up faster than the import price index, and the ratio rises. The terms of trade **improve** — which sounds wrong, because inflation is usually described as a problem, and it is precisely why this factor is worth teaching carefully.` },
      { type: 'paragraph', text: `The resolution is the point of the whole chapter: an improvement in the terms of trade is a statement about prices, not about welfare. Goods that cost more to buy sell in smaller quantities, and the next chapter does that arithmetic.` },
      { type: 'paragraph', text: `Inflation that is equal at home and abroad leaves the terms of trade **unchanged**, however high it is. Both indices rise together and the ratio between them does not move. Relative, again.` },
    ],
    realExample: { emoji: '🎈', text: `An economy with inflation at a tenth a year, trading with partners at a twentieth, records improving terms of trade year after year while its exporters complain of losing orders.` },
    misconception: `Students say inflation "makes a country less competitive, so the terms of trade worsen". Competitiveness and the terms of trade move in **opposite** directions here: dearer exports are a better exchange rate for the goods and a worse position in the market.`,
    examMatters: `Appendix 6 defines Explain as needing a two-stage chain for a reason or an impact. The stages are inflation reaching the export price index, and the ratio moving because the import index did not move as far.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `An economy's export price index rises from 100 to 105 in a year when its import price index rises from 100 to 105:`,
      template: [
        `Its terms of trade are now ___`,
        `So relative to the base year they have ___`,
        `Because what matters is inflation at home compared with inflation ___`,
      ],
      answers: ['100', 'held', 'abroad'],
      hints: ['divide the two indices and multiply by a hundred', 'what happens to a ratio when both parts move equally', 'the other half of the comparison the word relative points at'],
      distractors: ['105', 'improved', 'last year'],
    }),
  };
})();

const relativeProductivityRates = (() => {
  const sid = subId('relative-productivity-rates');
  return {
    id: sid,
    title: 'Relative Productivity Rates',
    keyIdea: 'Productivity is output per unit of input. When it rises faster at home than abroad, export costs and prices fall with it, and the terms of trade deteriorate.',
    body: [
      { type: 'paragraph', text: `**Productivity** is how much output a worker, machine or hectare produces. Rising productivity lowers the cost of each unit produced, and competition passes some of that saving into the price.` },
      { type: 'paragraph', text: `So a country whose productivity grows faster than its partners' sees its export prices rise more slowly — or fall. Its export price index lags its import price index, and its terms of trade **deteriorate**.` },
      { type: 'paragraph', text: `This is the clearest case in the specification of a deterioration that is unambiguously good news. The country is producing more efficiently, selling more cheaply, and almost certainly selling more. The ratio has fallen and the economy is stronger.` },
      { type: 'paragraph', text: `It is also why the terms of trade cannot be read on their own. The same fall in the index means one thing when it comes from rising productivity and another when it comes from a collapse in the price of the one commodity a country sells. **What moved the ratio** decides what the movement means.` },
    ],
    realExample: { emoji: '⚙️', text: `A manufacturer that halves the hours needed per unit can cut its export price and still earn more per hour worked. The country's terms of trade fall and its export earnings rise.` },
    misconception: `Students write that "deterioration is bad" without asking what caused it. A deterioration driven by productivity is a country choosing to compete on price from a position of strength; a deterioration driven by a falling export price it does not control is something else entirely.`,
    examMatters: `Appendix 6 defines Analyse as a developed chain of reasoning. Productivity to unit costs to price to the index to the ratio is four links, and a chain that starts at "productivity rose" and ends at "terms of trade fell" has skipped three of them.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: `Four economies each record a deterioration in the terms of trade. Sort them by whether the deterioration is a sign of strength or of trouble:`,
      groups: [
        { name: 'A sign of strength', items: ['Output per worker rose a tenth and export prices were cut to match', 'New machinery cut unit costs and the saving was passed on'] },
        { name: 'A sign of trouble', items: ['The world price of its single export commodity halved', 'The price of the fuel it must import doubled'] },
      ],
      why: [
        'In both the fall in the export price index was chosen, paid for by lower costs, and is very likely to be sold in larger volumes.',
        'In both the ratio moved because of a price the country does not set, and nothing about its efficiency improved with it.',
      ],
    }),
  };
})();

const relativeLabourCosts = (() => {
  const sid = subId('relative-labour-costs');
  return {
    id: sid,
    title: 'Relative Labour Costs',
    keyIdea: 'Labour costs enter export prices directly. Wages rising faster at home than abroad — beyond what productivity covers — push export prices up and the terms of trade with them.',
    body: [
      { type: 'paragraph', text: `Wages are the largest single cost in most production, so what happens to them shows up in prices. If wages in a country rise faster than in the countries it competes with, its firms face higher unit costs and its export prices rise relative to import prices. The terms of trade **improve**.` },
      { type: 'paragraph', text: `The qualification is productivity, and the specification lists the two factors next to each other for that reason. What matters for costs is the wage **per unit of output**, not the wage per hour. Wages rising a tenth alongside productivity rising a tenth leave unit costs where they were.` },
      { type: 'paragraph', text: `So the three price factors are one mechanism seen from three sides. Inflation moves the general price level, productivity moves what an hour produces, and labour costs move what an hour is paid. All three reach the terms of trade through the same door: the export price index.` },
      { type: 'paragraph', text: `And the improvement carries the same warning as before. Exports priced out of a market improve the ratio and shrink the orders — the direction of the index and the direction of the revenue can differ, which is the whole of the next chapter.` },
    ],
    realExample: { emoji: '🧵', text: `A producer whose wage bill rises a tenth while output per worker is flat has to raise prices or accept a thinner margin; the country's export price index moves either way, and its order book moves the other way.` },
    misconception: `Students compare wage rates across countries and conclude that the high-wage country must have the worse position. A high wage with high productivity can mean **lower** cost per unit than a low wage with low productivity, and it is the cost per unit that reaches the price.`,
    examMatters: `Appendix 6 defines Explain as knowledge, understanding and application with a two-stage chain. The application here is the division — the wage against what the hour produced — and an answer that compares hourly wages alone has not applied anything.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `A firm pays 20 per hour and each hour produces 4 units. Wages then rise to 24 and output per hour rises to 6:`,
      template: [
        `Labour cost per unit was ___`,
        `Labour cost per unit is now ___`,
        `So the pressure on the export price is ___`,
      ],
      answers: ['5', '4', 'downward'],
      hints: ['the wage divided by what the hour produced', 'the same division on the new pair of figures', 'the direction a lower unit cost pushes a price'],
      distractors: ['80', '6', 'upward'],
    }),
  };
})();

const theExchangeRate = (() => {
  const sid = subId('the-exchange-rate');
  return {
    id: sid,
    title: 'The Exchange Rate',
    keyIdea: `The exchange rate changes both indices at once and in opposite directions. A fall of ${pct(C.fallPct)} makes exports cheaper abroad and imports dearer at home, so the terms of trade deteriorate.`,
    body: [
      { type: 'paragraph', text: `This factor already appeared in the chapter on patterns of trade, where it redirected purchases. Here the same movement is read through the two price indices, and it is the only factor on the list that moves both of them by itself.` },
      { type: 'paragraph', text: `A currency that falls makes the country's exports cheaper measured in foreign currency — the export price index, measured that way, falls. It makes imports dearer measured in domestic currency, so the import price index rises. A smaller number over a larger one: the terms of trade **deteriorate**.` },
      { type: 'paragraph', text: `A currency that rises does the reverse, and improves them. So the direction is easy to get right if the question of **which currency the prices are measured in** is settled first; most errors in this leaf come from measuring the two sides in different currencies without noticing.` },
      { type: 'paragraph', text: `The movement need not come from trade at all. Interest rates, expectations and capital flows move exchange rates, so the terms of trade can shift because of decisions taken in financial markets by people with no interest in any of the goods concerned.` },
    ],
    realExample: { emoji: '📉', text: `A currency that falls a fifth over a summer leaves every export cheaper abroad and every import dearer at home before a single firm has changed a price list.` },
    misconception: `Students say a falling currency "makes a country better off because exports rise". Whatever it does to volumes, it makes the terms of trade **worse**: the country is getting less per unit of exports and paying more per unit of imports. Those are two separate questions and the exam asks them separately.`,
    examMatters: `Appendix 6 defines Examine as requiring analysis as well as application. Examining this factor means carrying both effects — the export index and the import index — rather than the one the question happened to mention.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `A currency rises. Measured in foreign currency, an economy's export price index goes from 100 to 112; measured at home, its import price index goes from 100 to 90:`,
      template: [
        `Its terms of trade are now about ___`,
        `So they have ___`,
        `Which is what a ___ currency does to the ratio`,
      ],
      answers: ['124.4', 'improved', 'rising'],
      hints: ['the export index over the import index, times a hundred, to one decimal', 'the direction, given a result above the base', 'the direction of the currency that produced it'],
      distractors: ['80.4', 'deteriorated', 'falling'],
    }),
  };
})();

const pricesOfImportsAndExports = (() => {
  const sid = subId('the-prices-of-imports-and-exports');
  return {
    id: sid,
    title: 'The Prices of Imports and Exports',
    keyIdea: 'The last factor is the two prices themselves, moved by world demand and supply for the goods a country happens to trade. This is where a commodity exporter is exposed.',
    body: [
      { type: 'paragraph', text: `The first four factors reach the terms of trade through a country's own costs and its currency. This one is more direct: the world price of what it sells and what it buys can move on its own, because of demand and supply in those markets.` },
      { type: 'paragraph', text: `What a country trades therefore decides how exposed it is. An economy exporting one primary commodity and importing manufactured goods has an export price set in a volatile world market and an import price set by firms with some control over theirs. Its terms of trade can swing violently on decisions taken nowhere near it.` },
      { type: 'paragraph', text: `A diversified exporter is steadier for the same reason in reverse: a fall in one export price is diluted by the others, so the index moves less. **Diversification** is the standard policy response, and it is the link back to the costs of specialisation in the first chapter.` },
      { type: 'paragraph', text: `This is also the factor that makes the terms of trade worth watching for a developing economy. A long decline in the price of what a country sells, against what it buys, means each year's exports buy fewer imports — and no amount of effort inside the country changes it.` },
    ],
    realExample: { emoji: '🛢️', text: `An economy that sells one mineral and buys machinery watches its terms of trade rise and fall with a price set by buyers on another continent, while the price of what it needs moves steadily upward.` },
    misconception: `Students treat the terms of trade as something a government controls. Four of the five factors are at least influenced by domestic policy; this one usually is not, and for a concentrated exporter it is the one that dominates.`,
    examMatters: `Appendix 6 defines Evaluate as requiring a supported judgement, and the 20-mark items on this topic often turn on exposure. The strongest judgements say **which** factor dominates for the economy in the extract, and why the others matter less.`,
    recall: recall(sid, {
      type: 'match',
      prompt: `Match each economy to the effect on its terms of trade when the world price of one primary commodity falls by half:`,
      pairs: [
        { left: 'Exports are almost entirely that commodity', right: 'A large deterioration' },
        { left: 'Exports are spread across many manufactured goods', right: 'Almost no change' },
        { left: 'Imports that commodity and exports manufactures', right: 'A clear improvement' },
        { left: 'Both exports and imports are half that commodity', right: 'Broadly offsetting' },
      ],
      why: [
        'The export price index is essentially that one price, so it falls with it and the ratio falls with the index.',
        'One price among many moves the export index very little, which is what diversification buys.',
        'The fall lands in the import price index instead, so the ratio rises: the same price movement, the other way up.',
        'Both indices fall together, so the ratio between them barely moves however large the price change is.',
      ],
    }),
  };
})();

/* ══ Block 4 — When the terms of trade change (4.3.2 · 3c) ════════════════ */

const exportRevenues = (() => {
  const sid = subId('export-revenues');
  return {
    id: sid,
    title: 'The Effect on Export Revenues',
    keyIdea: `Revenue is price times quantity, and an improvement raises one and lowers the other. ${S.name}'s prices rose ${pct(S.priceRisePct)}, its volume fell ${pct(S.volumeFallPct)}, and its export revenue index ended at ${qty(S.revenueIndex)}.`,
    body: [
      { type: 'paragraph', text: `An improvement in the terms of trade means export prices have risen relative to import prices. Higher prices mean fewer sales, and whether revenue rises or falls depends on **how many** fewer.` },
      { type: 'paragraph', text: `That is price elasticity of demand: the responsiveness of quantity to price. If demand for a country's exports is **elastic**, the fall in quantity outweighs the rise in price and revenue falls. If it is **inelastic**, the price rise dominates and revenue rises.` },
      { type: 'paragraph', text: `Put ${S.name}'s figures through it. Export prices rose ${pct(S.priceRisePct)}, and with an elasticity of ${qty(S.pedExports)} the volume falls ${pct(S.volumeFallPct)} — so the volume index is ${qty(S.volumeIndex)}. Revenue is price times quantity: ${qty(S.now.exportPrices / 100)} × ${qty(S.volumeIndex / 100)} = ${qty(S.revenueIndex / 100)}, an index of **${qty(S.revenueIndex)}**.` },
      { type: 'paragraph', text: `So the terms of trade improved to ${idx(S.totNow)} and export revenue fell by ${pct(100 - S.revenueIndex)}. Both statements are true at once, and an answer that treats the first as evidence for the second has confused a price ratio with an earnings figure.` },
    ],
    realExample: { emoji: '💸', text: `An exporter facing buyers who can switch supplier easily finds that a price rise of a fifth costs it nearly a third of its orders, and it ends the year with less money than it started.` },
    misconception: `Students write that improving terms of trade "raise export revenue because each unit earns more". Each unit does earn more. There are fewer units, and with elastic demand there are enough fewer to leave total revenue lower.`,
    examMatters: `Appendix 6 defines Calculate as a several-stage task from given data, and this is the calculation the topic is built on: the price index, the volume index, and the product of the two.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `A different exporter raises its prices a tenth. Demand for its exports has a price elasticity of 0.5, so volume falls 5%:`,
      template: [
        `Its export price index is ___`,
        `Its export volume index is ___`,
        `So its export revenue index is about ___ and revenue has ___`,
      ],
      answers: ['110', '95', '104.5', 'risen'],
      hints: ['a tenth above the base of a hundred', 'five per cent below the base', 'the two indices multiplied, over a hundred', 'compare the result with the base'],
      distractors: ['90', '105', '115'],
    }),
  };
})();

const livingStandards = (() => {
  const sid = subId('living-standards');
  return {
    id: sid,
    title: 'The Effect on Living Standards',
    keyIdea: `On this leaf an improvement genuinely helps: each unit of exports buys more imports. ${S.name}'s ${qty(S.now.exportPrices)} over ${qty(S.now.importPrices)} means one unit of exports now buys ${qty(S.importsPerExport)} units of imports.`,
    body: [
      { type: 'paragraph', text: `Living standards depend on what a country can consume, and part of what it consumes is imported. The terms of trade set how much of that a given quantity of exports pays for.` },
      { type: 'paragraph', text: `In the base year one unit of exports bought exactly one unit of imports, because both indices were ${qty(100)}. At ${qty(S.now.exportPrices)} and ${qty(S.now.importPrices)}, one unit of exports buys ${qty(S.importsPerExport)} units. **For any given volume of exports**, the country can import more, and real incomes rise with it.` },
      { type: 'paragraph', text: `The condition in bold is doing all the work, and it is the same condition the last subsection broke. If the volume of exports falls far enough, a country with a better rate of exchange on each unit still ends up importing less in total.` },
      { type: 'paragraph', text: `So the honest statement is conditional: an improvement raises the **purchasing power of exports**, and whether it raises living standards depends on what happens to the volume — which depends on elasticity. Two leaves of the same sub-topic, pulling in opposite directions, is what makes this an evaluation topic.` },
    ],
    realExample: { emoji: '🛒', text: `A household paid in a currency that buys more abroad than it did last year is better off on every imported item it buys — as long as its hours were not cut to get there.` },
    misconception: `Students say an improvement "raises living standards" without the condition, and the condition is where the marks are. The gain is per unit of exports; the total depends on how many units there still are.`,
    examMatters: `Appendix 6 defines Evaluate as requiring a supported judgement. A judgement on living standards that carries both the purchasing-power gain and the volume risk is doing what the command word asks; one that carries either alone is not.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `An economy's export price index is 150 and its import price index is 120. It exports 40 units, down from 60:`,
      template: [
        `Each unit of exports now buys ___ units of imports`,
        `Total imports it can afford are now ___ units`,
        `Against ___ units before, so total purchasing power has ___`,
      ],
      answers: ['1.25', '50', '60', 'fallen'],
      hints: ['the export index over the import index', 'that rate times the units it still exports', 'the old units at the old rate of one for one', 'compare the two totals'],
      distractors: ['0.8', '48', 'risen'],
    }),
  };
})();

const theBalanceOfTrade = (() => {
  const sid = subId('the-balance-of-trade');
  return {
    id: sid,
    title: 'The Effect on the Balance of Trade',
    keyIdea: `The balance of trade is export earnings minus import spending. ${S.name}'s improvement left ${bn(S.exportsNow)} of exports against ${bn(S.importsNow)} of imports — a deficit of ${bn(Math.abs(S.balance))} out of a better ratio.`,
    body: [
      { type: 'paragraph', text: `The **balance of trade** is the value of exports minus the value of imports. Both are values, so both depend on prices and quantities, and the terms of trade only tell you about the prices.` },
      { type: 'paragraph', text: `Follow ${S.name} through. Trade was balanced at ${bn(S.baseFlow)} each way in the base year. Export revenue fell to an index of ${qty(S.revenueIndex)}, so exports are now ${bn(S.exportsNow)}. Import prices rose to ${qty(S.now.importPrices)}, so the same quantity of imports now costs ${bn(S.importsNow)}.` },
      { type: 'paragraph', text: `The balance is ${bn(S.exportsNow)} − ${bn(S.importsNow)} = a deficit of **${bn(Math.abs(S.balance))}**. The terms of trade improved to ${idx(S.totNow)} and the balance of trade went from zero to a deficit of ${bn(Math.abs(S.balance))} — the two figures point in opposite directions, from the same price movement.` },
      { type: 'paragraph', text: `The result is not a paradox and it is not a special case. With elastic export demand it is what you should expect, and it is why a question that gives you a change in the terms of trade and asks about the trade balance is a question about elasticity in disguise.` },
    ],
    realExample: { emoji: '⚓', text: `A port records a year of higher prices on everything leaving and everything arriving, fewer outbound cargoes, the same inbound ones, and a trade gap where there was none.` },
    misconception: `Students treat an improvement in the terms of trade as an improvement in the trade balance, because both use the word improvement about the same country in the same year. One is a ratio of prices, the other a difference of values, and nothing forces them to agree.`,
    examMatters: `Appendix 6 defines Analyse as a developed chain of reasoning. The chain here is long and every link is arithmetic: price index, elasticity, volume index, revenue, import bill, balance. Dropping a link is how this question is usually lost.`,
    recall: recall(sid, {
      type: 'reorder',
      prompt: `Put the steps in the order that takes an economy from a rise in its export prices to a deficit on its balance of trade:`,
      correctOrder: [
        'Export prices rise relative to import prices',
        'Foreign buyers cut the quantity they order',
        'The fall in quantity outweighs the rise in price',
        'Earnings from exports drop below the import bill',
      ],
      why: [
        'The price movement is the starting point, and until it happens nothing else in the chain is triggered.',
        'Higher prices are met with smaller orders; how much smaller is what elasticity measures.',
        'This is the elastic case, and it is the step that decides whether the chain ends in a deficit or a surplus.',
        'Earnings below spending is what a deficit on the balance of trade is.',
      ],
    }),
  };
})();

const judgingAChange = (() => {
  const sid = subId('judging-a-change-in-the-terms-of-trade');
  return {
    id: sid,
    title: 'Judging a Change',
    keyIdea: 'An improvement is not good news and a deterioration is not bad news. What decides is WHY the ratio moved and HOW RESPONSIVE demand is — and the exam rewards saying so.',
    body: [
      { type: 'paragraph', text: `Three leaves, three answers. An improvement raises the purchasing power of each unit of exports, can lower export revenue, and can push the balance of trade into deficit. All three at once, from one price movement.` },
      { type: 'paragraph', text: `So a judgement needs two questions answered. **What moved it?** Rising productivity that cut export prices is a deterioration worth having; a collapse in the world price of a country's only export is the same number meaning something else entirely.` },
      { type: 'paragraph', text: `**How elastic is demand?** With inelastic exports, an improvement raises revenue and the purchasing power together and there is no tension at all. With elastic exports the tension is the answer, and ${S.name}'s ${qty(S.pedExports)} is what turned an improvement into a ${bn(Math.abs(S.balance))} deficit.` },
      { type: 'paragraph', text: `Add the time dimension for the strongest answers. Buyers take time to find alternative suppliers, so demand is less elastic in the short run than the long run — a price rise that looks profitable this year can cost the market next year.` },
    ],
    realExample: { emoji: '⏳', text: `An exporter raises prices, keeps its customers for a season because they have nowhere else to go, and loses a third of them the following year once a new supplier is qualified.` },
    misconception: `Students learn "improvement good, deterioration bad" as a rule and apply it to the extract in front of them. Every question on this sub-topic is built to punish that rule, which is why it is worth replacing with the two questions above.`,
    examMatters: `Appendix 6 defines Evaluate as a supported judgement, and the 20-mark items are where this chapter earns. A judgement with a condition attached — for this economy, with these buyers, over this period — outscores a confident verdict with nothing behind it.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: `Four economies each report a movement in the ratio. Sort them by whether the economy is likely to be better or worse off:`,
      groups: [
        { name: 'Likely better off', items: ['Its buyers have nowhere else to go, and it raised prices a tenth', 'New machinery cut its unit costs a fifth before it cut its price'] },
        { name: 'Likely worse off', items: ['Its wage bill outran output for five years and its order book emptied', 'Nine-tenths of what it sells is one crop, and that crop halved'] },
      ],
      why: [
        'Buyers with nowhere to go means inelastic demand, so the higher price is kept and earnings rise with it; and a price cut paid for by lower costs will be sold in larger volumes.',
        'Wages outrunning output raise the ratio by pricing the goods out of the market; and a concentrated exporter has no second product to dilute a price it does not set.',
      ],
    }),
  };
})();

/* ══ The plan ═════════════════════════════════════════════════════════════ */

const BLOCK_PLAN = [
  { title: B1, subs: [whyCountriesSpecialise, absoluteAndComparative, workingItOut, assumptions, limitations], takeaway: [
    'Specialisation has benefits AND costs, and the specification asks for both halves.',
    `Absolute advantage is how much; comparative advantage is what is given up.`,
    `Partial specialisation raises grain by ${qty(T.gain.grain)} with cloth unchanged: nothing is traded off.`,
    `The swap rate sits between ${qty(T.rateLow)} and ${qty(T.rateHigh)} grain per cloth; at ${qty(T.rate)} the gain splits evenly.`,
    'The limitations shrink the gain, slow it and skew its distribution; none of them removes it.',
  ] },
  { title: B2, subs: [whatAPatternIs, emergingEconomies, changesInComparativeAdvantage, blocsAndBilateral, relativeExchangeRates, changesInProtectionism, changesInTradeFlows], takeaway: [
    'Volume is how much; pattern is the composition. The five factors move the pattern.',
    `Emerging economies went from ${pct(H.emergingThen)} of world exports to ${pct(H.emergingNow)}, so the other share is ${pct(H.advancedNow)}.`,
    `Comparative advantage moves: at ${qty(KALTO_LATER.grainMax)} grain, ${B.name}'s costs match ${A.name}'s and trade loses its basis.`,
    `An exchange rate moves both prices: ${qty(C.exportAbroadBefore)} to ${qty(C.exportAbroadAfter)} abroad, ${qty(C.importAtHomeBefore)} to ${qty(C.importAtHomeAfter)} at home.`,
    `A share and a value are two facts: ore ${pct(H.oreThen)} to ${pct(H.oreNow)}, and ${bn(H.oreValueThen)} to ${bn(H.oreValueNow)}.`,
  ] },
  { title: B3, subs: [whatTheTermsOfTradeMeasure, calculatingTheTermsOfTrade, relativeInflationRates, relativeProductivityRates, relativeLabourCosts, theExchangeRate, pricesOfImportsAndExports], takeaway: [
    'The terms of trade are a ratio of PRICES — not of values, not of volumes.',
    `Export price index over import price index, times 100: ${qty(S.now.exportPrices)} over ${qty(S.now.importPrices)} is ${idx(S.totNow)}.`,
    'Both indices can rise and the ratio still improve; what counts is which rose faster.',
    'Inflation and labour costs push it up; productivity pushes it down; equal movements leave it alone.',
    'The exchange rate moves both indices at once; world prices move the ones nobody at home controls.',
  ] },
  { title: B4, subs: [exportRevenues, livingStandards, theBalanceOfTrade, judgingAChange], takeaway: [
    `Revenue is price times quantity: ${S.name}'s improvement left an export revenue index of ${qty(S.revenueIndex)}.`,
    `Purchasing power per unit rose to ${qty(S.importsPerExport)} units of imports for one of exports.`,
    `And the balance went from zero to a ${bn(Math.abs(S.balance))} deficit, out of the same improvement.`,
    'Elasticity decides which of those three dominates.',
    'So the judgement is always WHY it moved and HOW RESPONSIVE demand is — never the direction alone.',
  ] },
];

export const SUBSECTIONS = BLOCK_PLAN.flatMap((b) => b.subs);

/*
 * NO ATTACHED RECALLS IN THIS SECTION: every subsection carries its own, authored beside the
 * teaching it applies. The export stays so the runner's check has something to assert about.
 */
export const ATTACH_SLUGS = [];

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

/* ══ Notes ════════════════════════════════════════════════════════════════ */
/*
 * ONE NOTES TOPIC PER CHAPTER THIS PACKET BUILDS, IN THE SAME ORDER, CARRYING THE SAME FIGURES FROM
 * THE SAME MODULE, so the two surfaces cannot drift apart without the build failing.
 * `depth.notes-titles` requires every Notes title to be taught in Learn Mode, which holds by
 * construction when the titles ARE the block titles. The fifth topic is the carried-forward
 * protectionism block's, and it is left exactly as it is live until packet 39b rewrites it.
 *
 * A WARNING FOR VERIFY B: notes ship in the server-rendered page from the `data` column, so a
 * `?draft=1` walk shows these only after publication. Verify them against `draft`, not the page.
 */

const def = (html) => ({ type: 'definition', text: html });
const mech = (html) => ({ type: 'mechanism', text: html });
const link = (html) => ({ type: 'link', text: html });

export const NOTES_NEW = [
  {
    title: B1,
    meta: '4 leaves',
    keyIdea: 'Why countries specialise, how comparative advantage is worked out, and what the theory assumes to get its answer.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Specialisation</strong> — concentrating resources on a narrower range of goods than are consumed, and trading for the rest.'),
        def('<strong>Absolute advantage</strong> — producing more of a good from the same resources than another country can.'),
        def('<strong>Comparative advantage</strong> — producing a good at a lower opportunity cost than another country.'),
        def('<strong>Opportunity cost</strong> — the next best alternative given up, here measured in units of the other good.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`${A.name} can make ${qty(A.grainMax)} grain or ${qty(A.clothMax)} cloth, so cloth costs it ${qty(A.costOfCloth)} grain; ${B.name} can make ${qty(B.grainMax)} or ${qty(B.clothMax)}, so cloth costs it ${qty(B.costOfCloth)}.`),
        mech(`Partial specialisation takes world output from ${qty(T.noTrade.grain)} grain and ${qty(T.noTrade.cloth)} cloth to ${qty(T.withTrade.grain)} and ${qty(T.withTrade.cloth)} — ${qty(T.gain.grain)} more grain, cloth unchanged.`),
        mech(`Any swap rate strictly between ${qty(T.rateLow)} and ${qty(T.rateHigh)} grain per cloth leaves both better off; at ${qty(T.rate)} each gains ${qty(T.meridaGains.grain)} grain.`),
        link('The assumptions — constant costs, mobile factors, no transport costs, two countries and two goods — are what the limitations relax one at a time.'),
      ] },
    ],
  },
  {
    title: B2,
    meta: '6 leaves',
    keyIdea: 'The five factors the specification names as influencing patterns of trade, and the difference between a share and a value.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Pattern of trade</strong> — the composition of trade: which goods, with which partners, in what proportions.'),
        def('<strong>Emerging economy</strong> — an economy growing quickly from a low base and taking a rising share of world output and trade.'),
        def('<strong>Trading bloc</strong> — a group of countries trading with each other on easier terms than they offer outsiders.'),
        def('<strong>Bilateral trading agreement</strong> — the same arrangement between two countries.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Emerging economies' share of world exports went ${pct(H.emergingThen)} → ${pct(H.emergingNow)}, so the advanced share went ${pct(H.advancedThen)} → ${pct(H.advancedNow)}.`),
        mech(`Comparative advantage is a ratio and ratios move: double ${B.name}'s grain capacity to ${qty(KALTO_LATER.grainMax)} and its cost of cloth becomes ${qty(KALTO_LATER.costOfCloth)} grain, the same as ${A.name}'s.`),
        mech(`A currency fall of ${pct(C.fallPct)} takes an export from ${qty(C.exportAbroadBefore)} to ${qty(C.exportAbroadAfter)} abroad and an import from ${qty(C.importAtHomeBefore)} to ${qty(C.importAtHomeAfter)} at home.`),
        mech(`Share against value: ore ${pct(H.oreThen)} → ${pct(H.oreNow)} of exports, and ${bn(H.oreValueThen)} → ${bn(H.oreValueNow)} on exports that grew ${bn(H.exportsThen)} → ${bn(H.exportsNow)}.`),
        link('What a trading bloc IS, and whether the trade it redirects is a gain, belongs to trade liberalisation and trading blocs.'),
      ] },
    ],
  },
  {
    title: B3,
    meta: '6 leaves',
    keyIdea: 'What the terms of trade are, the one division that calculates them, and the five factors that move them.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Terms of trade</strong> — the rate at which exports exchange for imports: the export price index divided by the import price index, times 100.'),
        def('<strong>Improvement</strong> — the ratio rises: each unit of exports commands more imports. A direction, not a verdict.'),
        def('<strong>Deterioration</strong> — the ratio falls. Also a direction, and it can be a sign of strength.'),
        def('<strong>Index number</strong> — a price level expressed against a base year set to 100.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`${S.name}: ${qty(S.now.exportPrices)} ÷ ${qty(S.now.importPrices)} × 100 = ${idx(S.totNow)}, against ${idx(S.totBase)} in the base year. Both prices rose; exports rose faster.`),
        mech('Relative inflation and relative labour costs push the ratio UP; relative productivity pushes it DOWN; equal movements on both sides leave it unchanged.'),
        mech(`A falling currency lowers the export index and raises the import index at once, so it deteriorates the ratio from both sides.`),
        link('World prices for the particular goods a country trades are the factor a concentrated exporter cannot influence, which is why diversification is the standard answer.'),
      ] },
    ],
  },
  {
    title: B4,
    meta: '3 leaves',
    keyIdea: 'What a movement in the terms of trade does to export revenues, living standards and the balance of trade — and why the three can disagree.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Balance of trade</strong> — the value of exports minus the value of imports.'),
        def('<strong>Price elasticity of demand</strong> — the responsiveness of quantity demanded to a change in price.'),
        def('<strong>Purchasing power of exports</strong> — how many units of imports one unit of exports buys.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`${S.name}'s prices rose ${pct(S.priceRisePct)} and, at an elasticity of ${qty(S.pedExports)}, volume fell ${pct(S.volumeFallPct)}: a revenue index of ${qty(S.revenueIndex)}.`),
        mech(`Purchasing power per unit rose to ${qty(S.importsPerExport)} units of imports — a genuine gain, for any given volume of exports.`),
        mech(`Exports ${bn(S.exportsNow)} against imports ${bn(S.importsNow)} is a ${bn(Math.abs(S.balance))} deficit, out of an improvement to ${idx(S.totNow)}.`),
        link('Elasticity decides which of the three dominates, and demand is less elastic in the short run than in the long run.'),
      ] },
    ],
  },
];
